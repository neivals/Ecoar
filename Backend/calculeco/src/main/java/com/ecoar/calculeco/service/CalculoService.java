package com.ecoar.calculeco.service;

import com.ecoar.calculeco.dto.RequestDTO;
import com.ecoar.calculeco.dto.ResultadoEmissaoDTO;
import com.ecoar.calculeco.entidade.CartaoDigital;
import com.ecoar.calculeco.entidade.CartaoFisico;
import com.ecoar.calculeco.entidade.EmissaoSolicitacao;
import com.ecoar.calculeco.repository.EmissaoSolicitacaoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CalculoService {

    @Autowired
    private EmissaoSolicitacaoRepository repo;

    @Transactional
    public ResultadoEmissaoDTO calcular(RequestDTO dto) {

        CartaoFisico cartaoFisico = new CartaoFisico(dto.getQuantidadeCartoes(), dto.getQuantidadeTransacoes(),
                dto.getMaterial(), dto.getTransporte());
        CartaoDigital cartaoDigital = new CartaoDigital(dto.getQuantidadeCartoes(), dto.getQuantidadeTransacoes(),
                dto.getTipoPagamento());

        double totalFisico = calcularFisico(dto);
        double totalDigital = calcularDigital(dto);

        EmissaoSolicitacao request = EmissaoSolicitacao.builder()
                .cartaoFisico(cartaoFisico)
                .cartaoDigital(cartaoDigital)
                .custoTotalFisico(totalFisico)
                .custoTotalDigital(totalDigital)
                .build();

        repo.save(request);

        return new ResultadoEmissaoDTO(request.getCustoTotalFisico(), request.getCustoTotalDigital());
    }

    private double calcularFisico(RequestDTO dto) {
        double emissaoTotal = (dto.getMaterial().getEmissaoNaProducao() +
                dto.getTransporte().getEmissaoPorKm())
                * dto.getQuantidadeCartoes();
        return emissaoTotal;
    }

    private double calcularDigital(RequestDTO dto) {
        double emissaoTotal = (dto.getTipoPagamento().getEmissaoPorTransacao() *
                dto.getQuantidadeTransacoes()) * dto.getQuantidadeCartoes();
        return emissaoTotal;
    }

    public Optional<ResultadoEmissaoDTO> buscarPorID(Long id) {
        return repo.findById(id).map(request -> new ResultadoEmissaoDTO(
                request.getCustoTotalFisico(), request.getCustoTotalDigital()));
    }
}
