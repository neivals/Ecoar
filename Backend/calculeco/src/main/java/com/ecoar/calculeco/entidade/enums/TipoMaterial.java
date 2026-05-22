package com.ecoar.calculeco.entidade.enums;

import lombok.Getter;

@Getter
public enum TipoMaterial {
    PVC(0.15);
    //PVCRECICLADO(0.138),
    //METAL(0.18);

    private final double emissaoNaProducao;

    TipoMaterial(double producao) {
        this.emissaoNaProducao = producao;
    }
}
