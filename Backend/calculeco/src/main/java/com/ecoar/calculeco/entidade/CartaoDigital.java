package com.ecoar.calculeco.entidade;

import com.ecoar.calculeco.entidade.enums.TipoPagamento;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@DiscriminatorValue("DIGITAL")
@Getter
@Setter
@NoArgsConstructor
public class CartaoDigital extends Cartao {

    @Enumerated(EnumType.STRING)
    private TipoPagamento tipoPagamento;

    public CartaoDigital( TipoPagamento tipoPagamento) {
        this.tipoPagamento = tipoPagamento;
    }
}
