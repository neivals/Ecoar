package com.ecoar.calculeco.repository;

import com.ecoar.calculeco.entidade.EmissaoSolicitacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmissaoSolicitacaoRepository extends JpaRepository<EmissaoSolicitacao, Long> {

    List<EmissaoSolicitacao> findAllByOrderByDataSolicitacao();
}
