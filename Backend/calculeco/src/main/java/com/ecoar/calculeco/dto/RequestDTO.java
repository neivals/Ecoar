package com.ecoar.calculeco.dto;

import com.ecoar.calculeco.entidade.enums.Periodo;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import jakarta.validation.constraints.NotNull;
import java.util.Map;

@Data
public class RequestDTO {

    @NotNull(message = "O período é obrigatório")
    private Periodo periodo;

    @NotBlank(message = "O endereço é obrigatório")
    private String endereco;

    @NotNull(message = "Os recursos selecionados são obrigatórios")
    private Map<String, Boolean> recursos;
}