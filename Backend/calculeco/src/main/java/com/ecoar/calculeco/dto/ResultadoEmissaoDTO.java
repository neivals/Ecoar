package com.ecoar.calculeco.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResultadoEmissaoDTO {

    private double emissaoTotalFisico;
    private double emissaoTotalDigital;
}
