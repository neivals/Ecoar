package com.ecoar.calculeco.entidade.enums;

import lombok.Getter;

@Getter
public enum TipoPagamento {
    FISICO(0.0025),
    DIGITAL(0.0008);

    private final double emissaoPorTransacao;

    TipoPagamento(double transacao) {
        this.emissaoPorTransacao = transacao;
    }
}
