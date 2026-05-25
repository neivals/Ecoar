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

    @Column(nullable = false)
    private double emissaoTotalFisico;

    @Column(nullable = false)
    private double emissaoTotalDigital;

    @Column(nullable = false)
    private double diferencaEmissao;

    private String coordenadas;

    @CreationTimestamp
    private LocalDateTime dataSolicitacao;

    @ElementCollection
    @CollectionTable(name = "emissoes_cartao_fisico", joinColumns = @JoinColumn(name = "id"))
    @Column(name = "emissao", nullable = false)
    private List<Double> emissaoFisicoPorMes;

    @ElementCollection
    @CollectionTable(name = "emissoes_cartao_digital", joinColumns = @JoinColumn(name = "id"))
    @Column(name = "emissao", nullable = false)
    private List<Double> emissaoDigitalPorMes;
}
