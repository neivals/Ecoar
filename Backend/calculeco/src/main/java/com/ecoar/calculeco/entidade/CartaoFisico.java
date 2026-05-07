package com.ecoar.calculeco.entidade;

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
    private TipoMaterial tipoMaterial;

    @Enumerated(EnumType.STRING)
    private TipoTransporte transporte;
}
