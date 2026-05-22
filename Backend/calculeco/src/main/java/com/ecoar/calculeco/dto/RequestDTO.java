package com.ecoar.calculeco.dto;

import com.ecoar.calculeco.entidade.enums.Periodo;
import com.ecoar.calculeco.entidade.enums.TipoTransporte;
import lombok.Data;
import jakarta.validation.constraints.NotNull;

@Data
public class RequestDTO {

    @NotNull(message = "O transporte é obrigatório")
    private TipoTransporte transporte;

    @NotNull(message = "O período é obrigatório")
    private Periodo periodo;
}
