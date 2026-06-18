package com.ecoar.calculeco.service;

import com.ecoar.calculeco.dto.RequestDTO;
import com.ecoar.calculeco.dto.ResultadoEmissaoDTO;
import com.ecoar.calculeco.entidade.Arvore;
import com.ecoar.calculeco.entidade.CartaoDigital;
import com.ecoar.calculeco.entidade.CartaoFisico;
import com.ecoar.calculeco.entidade.EmissaoSolicitacao;
import com.ecoar.calculeco.entidade.enums.TipoMaterial;
import com.ecoar.calculeco.entidade.enums.TipoPagamento;
import com.ecoar.calculeco.entidade.enums.TipoTransporte;
import com.ecoar.calculeco.repository.EmissaoSolicitacaoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CalculoService {

    // Latitude e longitude da fábrica 2
    private static final double LAT_ORIGEM_FIXA = -23.674328839140124;
    private static final double LNG_ORIGEM_FIXA = -46.5874538578481;

    @Value("${opencage.key}")
    private String apiKey;

    @Autowired
    private EmissaoSolicitacaoRepository repo;

    @Transactional
    public ResultadoEmissaoDTO calcular(RequestDTO dto) {

        CartaoFisico cartaoFisico = new CartaoFisico(TipoPagamento.FISICO, TipoMaterial.PVC, TipoTransporte.CAMINHAO);
        CartaoDigital cartaoDigital = new CartaoDigital(TipoPagamento.DIGITAL);
        Arvore arvore = new Arvore();

        String coordenadasObtidas = buscarCoordenadas(dto.getEndereco());

        double distanciaKm = calcularDistanciaPelasCoordenadas(coordenadasObtidas);


        List<Double> emissaoFisicoPorMes = new ArrayList<>();
        List<Double> emissaoDigitalPorMes = new ArrayList<>();


        calcularEmissoesPorMes(dto, cartaoFisico, cartaoDigital, emissaoFisicoPorMes, emissaoDigitalPorMes, distanciaKm, isRecursoAtivo(dto, "co2"));

        double totalFisico = emissaoFisicoPorMes.getLast();
        double totalDigital = emissaoDigitalPorMes.getLast();
        double diferenca = totalFisico - totalDigital;


        double energiaTotal = isRecursoAtivo(dto, "energia") ? calcularEnergia(dto, cartaoDigital) : 0.0;

        double aguaTotal = isRecursoAtivo(dto, "agua") ? calcularAgua(dto, cartaoFisico) : 0.0;

        double plasticoTotal = isRecursoAtivo(dto, "materiais") ? calcularPlastico(dto, cartaoFisico) : 0.0;

        int arvoresSalvas = calcularArvores(dto, diferenca, arvore);

        EmissaoSolicitacao request = EmissaoSolicitacao.builder()
                .cartaoFisico(cartaoFisico)
                .cartaoDigital(cartaoDigital)
                .periodo(dto.getPeriodo())
                .emissaoTotalFisico(totalFisico)
                .emissaoTotalDigital(totalDigital)
                .diferencaEmissao(diferenca)
                .emissaoFisicoPorMes(emissaoFisicoPorMes)
                .emissaoDigitalPorMes(emissaoDigitalPorMes)
                .coordenadas(coordenadasObtidas)
                .energiaTotal(energiaTotal)
                .aguaTotal(aguaTotal)
                .plasticoTotal(plasticoTotal)
                .arvoresSalvas(arvoresSalvas)
                .build();

        repo.save(request);

        return new ResultadoEmissaoDTO(request.getEmissaoTotalFisico(), request.getEmissaoTotalDigital(), request.getDiferencaEmissao(),
                request.getEmissaoFisicoPorMes(), request.getEmissaoDigitalPorMes(), request.getCoordenadas(), request.getEnergiaTotal(),
                request.getAguaTotal(), request.getPlasticoTotal(), request.getArvoresSalvas());
    }

    private void calcularEmissoesPorMes(RequestDTO dto, CartaoFisico cartaoFisico, CartaoDigital cartaoDigital, List<Double> emissoesPorMesFisico, List<Double> emissoesPorMesDigital, double distanciaKm, boolean co2Ativo) {
        int meses = dto.getPeriodo().getPeriodoEmMeses();

        double emissaoNaProducaoFisico = 0.0;
        double emissaoNaTransacaoFisico = 0.0;
        double emissaoNoTransporteFisico = 0.0;
        double emissaoDecarteFisico = 0.0;
        double emissaoNaTransicaoDigital = 0.0;

        if (co2Ativo) {
            emissaoNaProducaoFisico = cartaoFisico.getMaterial().getEmissaoNaProducao() * cartaoFisico.getQuantidadeCartoesPorMes();
            emissaoNaTransacaoFisico = cartaoFisico.getTipoPagamento().getEmissaoPorTransacao() * cartaoFisico.getQuantidadeTransacoesPorMes();
            emissaoNoTransporteFisico = distanciaKm * cartaoFisico.getTransporte().getEmissaoPorKm();
            if (dto.getPeriodo().incluirDescarte()) {
                emissaoDecarteFisico = cartaoFisico.emissaoDescarteMediaPorMes();
            }
            emissaoNaTransicaoDigital = cartaoDigital.getQuantidadeTransacoesPorMes() * cartaoDigital.getTipoPagamento().getEmissaoPorTransacao();
        }

        int pulo = 1;
        if (meses == 60) {
            pulo = 5;
        } else if (meses >= 36) {
            pulo = 3;
        }

        for (int i = 0; i < meses + 1; i += pulo) {
            double emissaoFisico = (emissaoNaProducaoFisico * i) + (emissaoNaTransacaoFisico * i) + (emissaoNoTransporteFisico * i);
            if (i > 36) {
                int mesesDescarte = i - 36;
                emissaoFisico += (emissaoDecarteFisico * mesesDescarte);
            }
            emissoesPorMesFisico.add((double)Math.round(emissaoFisico * 1000.0) / 1000.0);

            double emissaoDigital = (emissaoNaTransicaoDigital * i);
            emissoesPorMesDigital.add(emissaoDigital);
        }
    }

    private double calcularDistanciaPelasCoordenadas(String coordenadasString) {
        if (coordenadasString == null || coordenadasString.startsWith("Erro")) {
            return 0.0;
        }

        try {
            String[] partes = coordenadasString.split(" ");
            double latDestino = Double.parseDouble(partes[1]);
            double lngDestino = Double.parseDouble(partes[3]);

            final int R = 6371;
            double latDistance = Math.toRadians(latDestino - LAT_ORIGEM_FIXA);
            double lonDistance = Math.toRadians(lngDestino - LNG_ORIGEM_FIXA);

            double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                    + Math.cos(Math.toRadians(LAT_ORIGEM_FIXA)) * Math.cos(Math.toRadians(latDestino))
                    * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);

            double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c;

        } catch (Exception e) {
            return 0.0;
        }
    }

    private double calcularEnergia(RequestDTO dto, CartaoDigital cartaoDigital) {
        double energiaNoMes = cartaoDigital.getEnergiaPorTransacao() * cartaoDigital.getQuantidadeTransacoesPorMes();
        return energiaNoMes * dto.getPeriodo().getPeriodoEmMeses();
    }

    private double calcularAgua(RequestDTO dto, CartaoFisico cartaoFisico) {
        double aguaNoMes = cartaoFisico.getAguaPorCartao() * cartaoFisico.getQuantidadeCartoesPorMes();
        double aguaTotal = aguaNoMes * dto.getPeriodo().getPeriodoEmMeses();
        return (double)Math.round(aguaTotal * 1000.0) / 1000.0;
    }

    private double calcularPlastico(RequestDTO dto, CartaoFisico cartaoFisico) {
        double plasticoNoMes = cartaoFisico.getMaterial().getQuiloNaProducao() * cartaoFisico.getQuantidadeCartoesPorMes();
        return plasticoNoMes * dto.getPeriodo().getPeriodoEmMeses();
    }

    private int calcularArvores(RequestDTO dto, double diferenca, Arvore arvore) {
        double CO2AbsorvidoPorMes = arvore.calcularAbsorcaoDeCO2PorMes();
        double diferencaPorMes = diferenca / dto.getPeriodo().getPeriodoEmMeses();
        if (CO2AbsorvidoPorMes == 0 || dto.getPeriodo().getPeriodoEmMeses() == 0) {
            return 0;
        }
        return (int) (diferencaPorMes / CO2AbsorvidoPorMes);
    }

    private boolean isRecursoAtivo(RequestDTO dto, String chave) {
        return dto.getRecursos() != null && dto.getRecursos().getOrDefault(chave, false);
    }

    public Optional<ResultadoEmissaoDTO> buscarPorID(Long id) {
        return repo.findById(id).map(request -> new ResultadoEmissaoDTO(
                request.getEmissaoTotalFisico(), request.getEmissaoTotalDigital(), request.getDiferencaEmissao(),
                request.getEmissaoFisicoPorMes(), request.getEmissaoDigitalPorMes(), request.getCoordenadas(),
                request.getEnergiaTotal(), request.getAguaTotal(), request.getPlasticoTotal(), request.getArvoresSalvas()));
    }

    public String buscarCoordenadas(String endereco) {

        try {

            String url =
                    "https://api.opencagedata.com/geocode/v1/json?q="
                            + endereco.replace(" ", "%20")
                            + "&key="
                            + apiKey;

            RestTemplate restTemplate = new RestTemplate();

            String response = restTemplate.getForObject(url, String.class);

            ObjectMapper mapper = new ObjectMapper();

            JsonNode root = mapper.readTree(response);

            JsonNode geometry =
                    root.get("results")
                            .get(0)
                            .get("geometry");

            double lat = geometry.get("lat").asDouble();
            double lng = geometry.get("lng").asDouble();

            return "Latitude: " + lat + " Longitude: " + lng;

        } catch (Exception e) {

            return "Erro: " + e.getMessage();
        }
    }
}