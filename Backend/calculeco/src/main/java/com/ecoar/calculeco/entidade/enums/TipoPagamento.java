package com.ecoar.calculeco.entidade.enums;

import lombok.Getter;

@Getter
public enum TipoPagamento {
    NFC(10),
    PIX(10),
    WALLET(10),
    QRCODE(10);

    private final double emissaoPorTransacao;

    TipoPagamento(double transacao) {
        this.emissaoPorTransacao = transacao;
    }
}
