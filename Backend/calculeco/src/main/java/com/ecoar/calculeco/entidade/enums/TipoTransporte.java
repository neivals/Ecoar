package com.ecoar.calculeco.entidade.enums;

import lombok.Getter;

@Getter
public enum TipoTransporte {
    AVIAO(2.446),
    CAMINHAO(0.529);

    private final double emissaoPorKm;

    TipoTransporte(double emissao) {
        this.emissaoPorKm = emissao;
    }
}
