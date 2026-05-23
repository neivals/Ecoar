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
        int meses = dto.getPeriodo().getPeriodoEmMeses();
        double emissaoProducao = (cartaoFisico.getMaterial().getEmissaoNaProducao() * cartaoFisico.getQuantidadeCartoesPorMes() * meses);
        double emissaoTransacao = (cartaoFisico.getTipoPagamento().getEmissaoPorTransacao() * cartaoFisico.getQuantidadeTransacoesPorMes() * meses);
        double emissaoTransporte = (cartaoFisico.getTransporte().getEmissaoPorKm() * meses);
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

    private void calcularEmissoesPorMes(RequestDTO dto, CartaoFisico cartaoFisico, CartaoDigital cartaoDigital, List<Double> emissoesPorMesFisico, List<Double> emissoesPorMesDigital) {
        int meses = dto.getPeriodo().getPeriodoEmMeses();
        double emissaoNaProducaoFisico = cartaoFisico.getMaterial().getEmissaoNaProducao() * cartaoFisico.getQuantidadeCartoesPorMes();
        double emissaoNaTransacaoFisico = cartaoFisico.getTipoPagamento().getEmissaoPorTransacao() * cartaoFisico.getQuantidadeTransacoesPorMes();
        double emissaoNoTransporteFisico = cartaoFisico.getTransporte().getEmissaoPorKm();
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

    public Optional<ResultadoEmissaoDTO> buscarPorID(Long id) {
        return repo.findById(id).map(request -> new ResultadoEmissaoDTO(
                request.getEmissaoTotalFisico(), request.getEmissaoTotalDigital(), request.getDiferencaEmissao(),
                request.getEmissaoFisicoPorMes(), request.getEmissaoDigitalPorMes()));
    }
}
