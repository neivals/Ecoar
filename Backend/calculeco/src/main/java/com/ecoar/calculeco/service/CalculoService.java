package com.ecoar.calculeco.service;

import com.ecoar.calculeco.dto.RequestDTO;
import com.ecoar.calculeco.dto.ResultadoEmissaoDTO;
import com.ecoar.calculeco.entidade.CartaoDigital;
import com.ecoar.calculeco.entidade.CartaoFisico;
import com.ecoar.calculeco.entidade.EmissaoSolicitacao;
import com.ecoar.calculeco.entidade.enums.TipoMaterial;
import com.ecoar.calculeco.entidade.enums.TipoPagamento;
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

    private static final double LAT_ORIGEM_FIXA = -8.05428;
    private static final double LNG_ORIGEM_FIXA = -34.8813;

    @Value("${opencage.key}")
    private String apiKey;

    @Autowired
    private EmissaoSolicitacaoRepository repo;

    @Transactional
    public ResultadoEmissaoDTO calcular(RequestDTO dto) {

        CartaoFisico cartaoFisico = new CartaoFisico(1000, 15000, TipoPagamento.FISICO, TipoMaterial.PVC, dto.getTransporte());
        CartaoDigital cartaoDigital = new CartaoDigital(1000, 15000, TipoPagamento.DIGITAL);

        String coordenadasObtidas = buscarCoordenadas(dto.getEndereco());
        //em Km
        double distanciaKm = calcularDistanciaPelasCoordenadas(coordenadasObtidas);
        //em Kg
        double totalFisico = calcularFisico(dto, cartaoFisico, distanciaKm);
        double totalDigital = calcularDigital(dto, cartaoDigital);
        double diferenca = totalFisico - totalDigital;
        List<Double> emissaoFisicoPorMes = new ArrayList<>();
        List<Double> emissaoDigitalPorMes = new ArrayList<>();
        calcularEmissoesPorMes(dto, cartaoFisico, cartaoDigital, emissaoFisicoPorMes, emissaoDigitalPorMes, distanciaKm);

        //em KWh
        double energiaTotal = calcularEnergia(dto, cartaoDigital);
        //em Litros
        double aguaTotal = calcularAgua(dto, cartaoFisico);
        //em Kg
        double plasticoTotal = calcularPlastico(dto, cartaoFisico);
        //em "gastos"
        double gastoTotalFisico = totalFisico + energiaTotal + aguaTotal + plasticoTotal;
        double gastoTotalDigital = totalDigital + energiaTotal;

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
                .gastoTotalFisico(gastoTotalFisico)
                .gastoTotalDigital(gastoTotalDigital)
                .build();

        repo.save(request);

        return new ResultadoEmissaoDTO(request.getEmissaoTotalFisico(), request.getEmissaoTotalDigital(), request.getDiferencaEmissao(),
                request.getEmissaoFisicoPorMes(), request.getEmissaoDigitalPorMes(), request.getCoordenadas(), request.getEnergiaTotal(),
                request.getAguaTotal(), request.getPlasticoTotal(), request.getGastoTotalFisico(), request.getGastoTotalDigital());
    }

    private double calcularFisico(RequestDTO dto, CartaoFisico cartaoFisico, double distanciaKm) {
        int meses = dto.getPeriodo().getPeriodoEmMeses();
        double emissaoProducao = (cartaoFisico.getMaterial().getEmissaoNaProducao() * cartaoFisico.getQuantidadeCartoesPorMes() * meses);
        double emissaoTransacao = (cartaoFisico.getTipoPagamento().getEmissaoPorTransacao() * cartaoFisico.getQuantidadeTransacoesPorMes() * meses);
        double emissaoTransporte = (distanciaKm * cartaoFisico.getTransporte().getEmissaoPorKm() * meses);
        double emissaoDecarte = 0;
        if (dto.getPeriodo().incluirDescarte()) {
            int mesesDescarte = meses - 36;
            emissaoDecarte = cartaoFisico.emissaoDescarteMediaPorMes() * mesesDescarte;
        }
        return emissaoProducao + emissaoTransacao + emissaoTransporte + emissaoDecarte;
    }

    private double calcularDigital(RequestDTO dto, CartaoDigital cartaoDigital) {
        int meses = dto.getPeriodo().getPeriodoEmMeses();
        return (cartaoDigital.getQuantidadeTransacoesPorMes() * cartaoDigital.getTipoPagamento().getEmissaoPorTransacao() * meses);
    }

    private void calcularEmissoesPorMes(RequestDTO dto, CartaoFisico cartaoFisico, CartaoDigital cartaoDigital, List<Double> emissoesPorMesFisico, List<Double> emissoesPorMesDigital, double distanciaKm) {
        int meses = dto.getPeriodo().getPeriodoEmMeses();
        double emissaoNaProducaoFisico = cartaoFisico.getMaterial().getEmissaoNaProducao() * cartaoFisico.getQuantidadeCartoesPorMes();
        double emissaoNaTransacaoFisico = cartaoFisico.getTipoPagamento().getEmissaoPorTransacao() * cartaoFisico.getQuantidadeTransacoesPorMes();
        double emissaoNoTransporteFisico = distanciaKm * cartaoFisico.getTransporte().getEmissaoPorKm();
        double emissaoDecarteFisico = 0;
        if (dto.getPeriodo().incluirDescarte()) {
            emissaoDecarteFisico = cartaoFisico.emissaoDescarteMediaPorMes();
        }

        double emissaoNaTransicaoDigital = cartaoDigital.getQuantidadeTransacoesPorMes() * cartaoDigital.getTipoPagamento().getEmissaoPorTransacao();

        int pulo = 1;
        if (meses >= 36) {
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
        return 1;
    }

    private double calcularPlastico(RequestDTO dto, CartaoFisico cartaoFisico) {
        double plasticoNoMes = cartaoFisico.getMaterial().getQuiloNaProducao() * cartaoFisico.getQuantidadeCartoesPorMes();
        return plasticoNoMes * dto.getPeriodo().getPeriodoEmMeses();
    }

    public Optional<ResultadoEmissaoDTO> buscarPorID(Long id) {
        return repo.findById(id).map(request -> new ResultadoEmissaoDTO(
                request.getEmissaoTotalFisico(), request.getEmissaoTotalDigital(), request.getDiferencaEmissao(),
                request.getEmissaoFisicoPorMes(), request.getEmissaoDigitalPorMes(), request.getCoordenadas(),
                request.getEnergiaTotal(), request.getAguaTotal(), request.getPlasticoTotal(), request.getGastoTotalFisico(),
                request.getGastoTotalDigital()));
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
