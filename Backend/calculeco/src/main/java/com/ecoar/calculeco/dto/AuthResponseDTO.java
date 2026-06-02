package com.ecoar.calculeco.dto;

public record AuthResponseDTO(
        String token,
        String email
) {}