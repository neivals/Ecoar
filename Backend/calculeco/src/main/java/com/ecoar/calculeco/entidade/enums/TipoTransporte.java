package com.ecoar.calculeco.entidade.enums;

import lombok.Getter;

@Getter
public enum TipoTransporte {
    AVIAO(1000),
    CAMINHAO(1000);

    private final double emissaoPorKm;

    TipoTransporte(double emissao) {
        this.emissaoPorKm = emissao;
    }
}
