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
@AllArgsConstructor
@NoArgsConstructor
public class CartaoDigital extends MetodoPagamento {

    @Enumerated(EnumType.STRING)
    private TipoPagamento tipoPagamento;

    public CartaoDigital(int quantidadeCartoes, int quantidadeTransacoes, TipoPagamento tipoPagamento) {
        super(quantidadeCartoes, quantidadeTransacoes);
        this.tipoPagamento = tipoPagamento;
    }
}
