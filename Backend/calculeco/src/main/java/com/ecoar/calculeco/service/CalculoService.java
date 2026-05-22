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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CalculoService {

    @Autowired
    private EmissaoSolicitacaoRepository repo;

    @Transactional
    public ResultadoEmissaoDTO calcular(RequestDTO dto) {

        CartaoFisico cartaoFisico = new CartaoFisico(1000, 15000, TipoPagamento.FISICO, TipoMaterial.PVC, dto.getTransporte());
        CartaoDigital cartaoDigital = new CartaoDigital(1000, 15000, TipoPagamento.DIGITAL);

        double totalFisico = calcularFisico(dto, cartaoFisico);
        double totalDigital = calcularDigital(dto, cartaoDigital);
        double diferenca = totalFisico - totalDigital;
        List<Double> emissaoFisicoPorMes = new ArrayList<>();
        List<Double> emissaoDigitalPorMes = new ArrayList<>();
        calcularEmissoesPorMes(dto, cartaoFisico, cartaoDigital, emissaoFisicoPorMes, emissaoDigitalPorMes);

        EmissaoSolicitacao request = EmissaoSolicitacao.builder()
                .cartaoFisico(cartaoFisico)
                .cartaoDigital(cartaoDigital)
                .periodo(dto.getPeriodo())
                .emissaoTotalFisico(totalFisico)
                .emissaoTotalDigital(totalDigital)
                .diferencaEmissao(diferenca)
                .emissaoFisicoPorMes(emissaoFisicoPorMes)
                .emissaoDigitalPorMes(emissaoDigitalPorMes)
                .build();

        repo.save(request);

        return new ResultadoEmissaoDTO(request.getEmissaoTotalFisico(), request.getEmissaoTotalDigital(), request.getDiferencaEmissao(),
                request.getEmissaoFisicoPorMes(), request.getEmissaoDigitalPorMes());
    }

    private double calcularFisico(RequestDTO dto, CartaoFisico cartaoFisico) {
        double meses = dto.getPeriodo().getPeriodoEmMeses();
        double emissaoTotal = (cartaoFisico.getMaterial().getEmissaoNaProducao() * cartaoFisico.getQuantidadeCartoesPorMes() * meses) +
                (cartaoFisico.getTipoPagamento().getEmissaoPorTransacao() * cartaoFisico.getQuantidadeTransacoesPorMes() * meses) +
                (cartaoFisico.getTransporte().getEmissaoPorKm() * meses);
        return emissaoTotal;
    }

    private double calcularDigital(RequestDTO dto, CartaoDigital cartaoDigital) {
        double meses = dto.getPeriodo().getPeriodoEmMeses();
        double emissaoTotal = (cartaoDigital.getQuantidadeTransacoesPorMes() * cartaoDigital.getTipoPagamento().getEmissaoPorTransacao() * meses);
        return emissaoTotal;
    }

    private void calcularEmissoesPorMes(RequestDTO dto, CartaoFisico cartaoFisico, CartaoDigital cartaoDigital, List<Double> emissoesPorMesFisico, List<Double> emissoesPorMesDigital) {
        double meses = dto.getPeriodo().getPeriodoEmMeses();
        double emissaoNaProducaoFisico = cartaoFisico.getMaterial().getEmissaoNaProducao() * cartaoFisico.getQuantidadeCartoesPorMes();
        double emissaoNaTransacaoFisico = cartaoFisico.getTipoPagamento().getEmissaoPorTransacao() * cartaoFisico.getQuantidadeTransacoesPorMes();
        double emissaoNoTransporteFisico = cartaoFisico.getTransporte().getEmissaoPorKm();

        double emissaoNaTransicaoDigital = cartaoDigital.getQuantidadeTransacoesPorMes() * cartaoDigital.getTipoPagamento().getEmissaoPorTransacao();

        for (int i = 0; i < meses + 1; i++) {
            double emissaoFisico = (emissaoNaProducaoFisico * i) + (emissaoNaTransacaoFisico * i) + (emissaoNoTransporteFisico * i);
            emissoesPorMesFisico.add(emissaoFisico);

            double emissaoDigital = (emissaoNaTransicaoDigital * i);
            emissoesPorMesDigital.add(emissaoDigital);
            if (meses == 60) {
                i += 2;
            } else if (meses == 24) {
                i += 1;
            }
        }
    }

    public Optional<ResultadoEmissaoDTO> buscarPorID(Long id) {
        return repo.findById(id).map(request -> new ResultadoEmissaoDTO(
                request.getEmissaoTotalFisico(), request.getEmissaoTotalDigital(), request.getDiferencaEmissao(),
                request.getEmissaoFisicoPorMes(), request.getEmissaoDigitalPorMes()));
    }
}
