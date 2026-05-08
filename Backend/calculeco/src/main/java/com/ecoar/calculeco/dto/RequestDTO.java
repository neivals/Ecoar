package com.ecoar.calculeco.dto;

import com.ecoar.calculeco.entidade.enums.TipoMaterial;
import com.ecoar.calculeco.entidade.enums.TipoPagamento;
import com.ecoar.calculeco.entidade.enums.TipoTransporte;
import lombok.Data;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;

@Data
public class RequestDTO {

    @NotNull(message = "O material é obrigatório")
    private TipoMaterial material;

    @NotNull(message = "O transporte é obrigatório")
    private TipoTransporte transporte;

    @NotNull(message = "O tipo de pagamento é obrigatório")
    private TipoPagamento tipoPagamento;

    @NotNull
    @Min(value = 1, message = "É preciso de no mínimo um cartão para calcular")
    private int quantidadeCartoes;

    @NotNull
    @Min(value = 1, message = "É preciso de no mínimo uma transação para calcular")
    private int quantidadeTransacoes;
}
