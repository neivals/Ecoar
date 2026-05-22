package com.ecoar.calculeco.entidade.enums;

import lombok.Getter;

@Getter
public enum TipoPagamento {
    FISICO(0.05),
    DIGITAL(0.01);

    private final double emissaoPorTransacao;

    TipoPagamento(double transacao) {
        this.emissaoPorTransacao = transacao;
    }
}
