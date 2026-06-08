package com.ecoar.calculeco.entidade;

import com.ecoar.calculeco.entidade.enums.TipoDescarte;
import com.ecoar.calculeco.entidade.enums.TipoMaterial;
import com.ecoar.calculeco.entidade.enums.TipoPagamento;
import com.ecoar.calculeco.entidade.enums.TipoTransporte;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@DiscriminatorValue("FISICO")
@Getter
@Setter
@NoArgsConstructor
public class CartaoFisico extends Cartao {

    @Enumerated(EnumType.STRING)
    private TipoPagamento tipoPagamento;

    @Enumerated(EnumType.STRING)
    private TipoMaterial material;

    @Enumerated(EnumType.STRING)
    private TipoTransporte transporte;

    //Em Litros
    @Column(nullable = false)
    private final double aguaPorCartao = 0.09615;

    public CartaoFisico(TipoPagamento tipoPagamento, TipoMaterial material, TipoTransporte transporte) {
        this.tipoPagamento = tipoPagamento;
        this.material = material;
        this.transporte = transporte;
    }

    public double emissaoDescarteMediaPorMes() {
        double aterro = (super.getQuantidadeCartoesPorMes() * TipoDescarte.ATERRO.getEmissaoPorCartao()) * 0.7;
        double incineracao = (super.getQuantidadeCartoesPorMes() * TipoDescarte.INCINERACAO.getEmissaoPorCartao()) * 0.2;
        double reciclagem = (super.getQuantidadeCartoesPorMes() * TipoDescarte.RECICLAGEM.getEmissaoPorCartao()) * 0.1;
        return aterro + incineracao + reciclagem;
    }
}
