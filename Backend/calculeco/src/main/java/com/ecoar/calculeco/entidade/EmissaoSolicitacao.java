package com.ecoar.calculeco.entidade;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmissaoSolicitacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "cartao_fisico_id", nullable = false)
    private CartaoFisico cartaoFisico;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "cartao_digital_id", nullable = false)
    private CartaoDigital cartaoDigital;

    @Column(nullable = false)
    private double custoTotalFisico;

    @Column(nullable = false)
    private double custoTotalDigital;

    @CreationTimestamp
    private LocalDateTime dataSolicitacao;
}
