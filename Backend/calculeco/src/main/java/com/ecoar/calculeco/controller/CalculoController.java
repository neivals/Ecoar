package com.ecoar.calculeco.controller;

import com.ecoar.calculeco.dto.RequestDTO;
import com.ecoar.calculeco.dto.ResultadoEmissaoDTO;
import com.ecoar.calculeco.service.CalculoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/calcular")
@CrossOrigin(origins = "*")
public class CalculoController {

    @Autowired
    private CalculoService calculoService;

    @Value("${opencage.key}")
    private String apiKey;

    @PostMapping("/emissao")
    public ResponseEntity<ResultadoEmissaoDTO> calcular(@Valid @RequestBody RequestDTO dto) {
        ResultadoEmissaoDTO resultado = calculoService.calcular(dto);
        return ResponseEntity.ok(resultado);
    }

    @GetMapping("/emissao/{id}")
    public ResponseEntity<ResultadoEmissaoDTO> buscarPorID(@PathVariable Long id) {
        return calculoService.buscarPorID(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/geocode")
    public ResponseEntity<String> geocode(@RequestParam String endereco) {

        try {

            String url =
                    "https://api.opencagedata.com/geocode/v1/json?q="
                            + endereco.replace(" ", "%20")
                            + "&key="
                            + apiKey;

            RestTemplate restTemplate = new RestTemplate();

            String response = restTemplate.getForObject(url, String.class);

            ObjectMapper mapper = new ObjectMapper();

            JsonNode root = mapper.readTree(response);

            JsonNode geometry =
                    root.get("results")
                            .get(0)
                            .get("geometry");

            double lat = geometry.get("lat").asDouble();
            double lng = geometry.get("lng").asDouble();

            return ResponseEntity.ok(
                    "Latitude: " + lat + " Longitude: " + lng
            );

        } catch (Exception e) {

            return ResponseEntity.badRequest().body(
                    "Erro: " + e.getMessage()
            );
        }
    }
}