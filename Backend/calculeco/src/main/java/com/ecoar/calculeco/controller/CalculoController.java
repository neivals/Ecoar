package com.ecoar.calculeco.controller;

import com.ecoar.calculeco.dto.RequestDTO;
import com.ecoar.calculeco.dto.ResultadoEmissaoDTO;
import com.ecoar.calculeco.service.CalculoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/calcular")
@CrossOrigin(origins = "*")
public class CalculoController {

    @Autowired
    private CalculoService calculoService;

    @PostMapping("/emissao")
    public ResponseEntity<ResultadoEmissaoDTO> calcular(@Valid @RequestBody RequestDTO dto) {
        ResultadoEmissaoDTO resultado = calculoService.calcular(dto);
        return ResponseEntity.ok(resultado);
    }

    @GetMapping("/emissao/{id}")
    public ResponseEntity<ResultadoEmissaoDTO> buscarPorID(@PathVariable Long id) {
        return calculoService.buscarPorID(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
}
