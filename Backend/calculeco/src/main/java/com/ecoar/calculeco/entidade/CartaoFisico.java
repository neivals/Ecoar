package com.ecoar.calculeco.entidade;

public class CartaoFisico {

    private TipoMaterial tipoMaterial;

    public CartaoFisico(TipoMaterial tipoMaterial) {
        this.tipoMaterial = tipoMaterial;
    }

    public void setTipoMaterial(TipoMaterial tipoMaterial) {
        this.tipoMaterial = tipoMaterial;
    }

    public TipoMaterial getTipoMaterial() {
        return this.tipoMaterial;
    }
}
