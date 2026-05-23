package com.ecoar.calculeco.entidade.enums;

import lombok.Getter;

@Getter
public enum Periodo {
    SEISMESES(6),
    UMANO(12),
    TRESANOS(36),
    CINCOANOS(60);

    private final int periodoEmMeses;

    Periodo(int periodoEmMeses) {
        this.periodoEmMeses = periodoEmMeses;
    }

    public boolean incluirDescarte() {
        if (this.getPeriodoEmMeses() >= 36) {
            return true;
        } else {
            return false;
        }
    }
}
