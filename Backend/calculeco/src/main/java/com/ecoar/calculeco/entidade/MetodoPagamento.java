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
@AllArgsConstructor
@NoArgsConstructor
public class MetodoPagamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private int quantidadeCartoes;

    @Column(nullable = false)
    private int quantidadeTransacoes;
}
