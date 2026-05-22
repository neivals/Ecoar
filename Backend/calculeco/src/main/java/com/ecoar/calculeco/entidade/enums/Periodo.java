package com.ecoar.calculeco.entidade.enums;

import lombok.Getter;

@Getter
public enum Periodo {
    SEISMESES(6),
    UMANO(12),
    TRESANOS(24),
    CINCOANOS(60);

    private final int periodoEmMeses;

    Periodo(int periodoEmMeses) {
        this.periodoEmMeses = periodoEmMeses;
    }
}
