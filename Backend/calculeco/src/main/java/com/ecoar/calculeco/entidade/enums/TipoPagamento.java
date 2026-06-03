package com.ecoar.calculeco.entidade.enums;

import lombok.Getter;

@Getter
public enum TipoPagamento {
    FISICO(0.00045),
    DIGITAL(0.00045);

    private final double emissaoPorTransacao;

    TipoPagamento(double transacao) {
        this.emissaoPorTransacao = transacao;
    }
}
