package com.ecoar.calculeco.entidade.enums;

import lombok.Getter;

@Getter
public enum TipoDescarte {
    ATERRO(0.001265),
    INCINERACAO(0.01365),
    RECICLAGEM(0.00215);

    private final double emissaoPorCartao;

    TipoDescarte(double emissaoPorCartao) {
        this.emissaoPorCartao = emissaoPorCartao;
    }
}
