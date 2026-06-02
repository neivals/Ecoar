package com.ecoar.calculeco.service;

import com.ecoar.calculeco.dto.AuthResponseDTO;
import com.ecoar.calculeco.dto.CadastroDTO;
import com.ecoar.calculeco.dto.LoginDTO;
import com.ecoar.calculeco.entidade.Usuario;
import com.ecoar.calculeco.repository.UsuarioRepository;
import com.ecoar.calculeco.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponseDTO cadastrar(CadastroDTO dto) {
        if (!dto.senha().equals(dto.confirmarSenha())) {
            throw new IllegalArgumentException("As senhas não coincidem.");
        }
        if (usuarioRepository.existsByEmail(dto.email())) {
            throw new IllegalArgumentException("Email já cadastrado.");
        }

        Usuario usuario = Usuario.builder()
                .email(dto.email())
                .senha(passwordEncoder.encode(dto.senha()))
                .build();

        usuarioRepository.save(usuario);

        String token = jwtService.gerarToken(usuario);
        return new AuthResponseDTO(token, usuario.getEmail());
    }

    public AuthResponseDTO login(LoginDTO dto) {
        // Lança exceção se credenciais inválidas
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(dto.email(), dto.senha())
        );

        Usuario usuario = usuarioRepository.findByEmail(dto.email())
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado."));

        String token = jwtService.gerarToken(usuario);
        return new AuthResponseDTO(token, usuario.getEmail());
    }
}