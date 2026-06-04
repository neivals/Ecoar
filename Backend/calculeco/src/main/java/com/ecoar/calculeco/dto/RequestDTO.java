package com.ecoar.calculeco.dto;

import com.ecoar.calculeco.entidade.enums.Periodo;
import com.ecoar.calculeco.entidade.enums.TipoTransporte;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import jakarta.validation.constraints.NotNull;

@Data
public class RequestDTO {

    @NotNull(message = "O período é obrigatório")
    private Periodo periodo;

    @NotBlank(message = "O endereço é obrigatório")
    private String endereco;
}
