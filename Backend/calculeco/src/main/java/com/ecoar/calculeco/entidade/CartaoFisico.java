package com.ecoar.calculeco.entidade;

import com.ecoar.calculeco.entidade.enums.TipoMaterial;
import com.ecoar.calculeco.entidade.enums.TipoPagamento;
import com.ecoar.calculeco.entidade.enums.TipoTransporte;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@DiscriminatorValue("FISICO")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CartaoFisico extends MetodoPagamento {

    @Enumerated(EnumType.STRING)
    private TipoPagamento tipoPagamento;

    @Enumerated(EnumType.STRING)
    private TipoMaterial material;

    @Enumerated(EnumType.STRING)
    private TipoTransporte transporte;

    public CartaoFisico(int quantidadeCartoesPorMes, int quantidadeTransacoesPorMes, TipoPagamento tipoPagamento, TipoMaterial material, TipoTransporte transporte) {
        super(quantidadeCartoesPorMes, quantidadeTransacoesPorMes);
        this.tipoPagamento = tipoPagamento;
        this.material = material;
        this.transporte = transporte;
    }
}
