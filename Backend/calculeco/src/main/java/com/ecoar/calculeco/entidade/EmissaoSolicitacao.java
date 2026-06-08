package com.ecoar.calculeco.entidade;

import com.ecoar.calculeco.entidade.enums.Periodo;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;

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
    private Periodo periodo;

    //Em Kg
    @Column(nullable = false)
    private double emissaoTotalFisico;

    //Em Kg
    @Column(nullable = false)
    private double emissaoTotalDigital;

    //Em Kg
    @Column(nullable = false)
    private double diferencaEmissao;

    private String coordenadas;

    @CreationTimestamp
    private LocalDateTime dataSolicitacao;

    private List<Double> emissaoFisicoPorMes;

    private List<Double> emissaoDigitalPorMes;

    //Em KWh
    @Column(nullable = false)
    private double energiaTotal;

    //Em litros
    @Column(nullable = false)
    private double aguaTotal;

    //Em Kg
    @Column(nullable = false)
    private double plasticoTotal;

    @Column(nullable = false)
    private int arvoresSalvas;
}
