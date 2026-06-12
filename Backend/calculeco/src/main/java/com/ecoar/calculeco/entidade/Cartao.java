package com.ecoar.calculeco.entidade;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Inheritance (strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "tipo_cartao")
@Getter
@Setter
@NoArgsConstructor
public class Cartao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private final int quantidadeCartoesPorMes = 10000;

    @Column(nullable = false)
    private final int quantidadeTransacoesPorMes = 250000;

    //Em KWh
    @Column(nullable = false)
    private final double energiaPorTransacao = 0.00148;
}
