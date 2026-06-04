package com.ecoar.calculeco.entidade;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class Arvore {

    private final int massaSeca = 1500;
    private final int idade = 100;
    private final double porcentagemCarbono = 47.5;
    private final double CO2ParaCarbono = 3.67;

    public double calcularAbsorcaoDeCO2PorMes() {
        double carbono = massaSeca * (porcentagemCarbono / 100);
        double CO2AbsorvidoTotal = carbono * CO2ParaCarbono;
        double CO2AbsorvidoPorMes = (CO2AbsorvidoTotal / idade) / 12;
        return CO2AbsorvidoPorMes;
    }
}
