package com.ecoar.calculeco.entidade.enums;

import lombok.Getter;

@Getter
public enum TipoMaterial {
    PVC(150),
    PVCRECICLADO(150),
    METAL(150);

    private final double emissaoNaProducao;

    TipoMaterial(double producao) {
        this.emissaoNaProducao = producao;
    }
}
