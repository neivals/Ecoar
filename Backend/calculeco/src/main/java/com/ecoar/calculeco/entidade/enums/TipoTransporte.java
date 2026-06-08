package com.ecoar.calculeco.entidade.enums;

import lombok.Getter;

@Getter
public enum TipoTransporte {
    CAMINHAO(0.529);
    //AVIAO(2.446);

    private final double emissaoPorKm;

    TipoTransporte(double emissao) {
        this.emissaoPorKm = emissao;
    }
}
