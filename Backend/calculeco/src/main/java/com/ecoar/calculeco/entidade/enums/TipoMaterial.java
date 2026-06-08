package com.ecoar.calculeco.entidade.enums;

import lombok.Getter;

@Getter
public enum TipoMaterial {
    PVC(0.15, 0.005);
    //PVCRECICLADO(0.138),
    //METAL(0.18);

    private final double emissaoNaProducao;
    private final double quiloNaProducao;

    TipoMaterial(double emissao, double quilo) {
        this.emissaoNaProducao = emissao;
        this.quiloNaProducao = quilo;
    }
}
