package com.ecoar.calculeco.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResultadoEmissaoDTO {

    private double emissaoTotalFisico;
    private double emissaoTotalDigital;
    private double diferencaEmissao;
    private List<Double> emissaoFisicoPorMes = new ArrayList<>();
    private List<Double> emissaoDigitalPorMes = new ArrayList<>();
    private String coordenadas;
}
