package runsystem.fs.item_management.controllers;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import runsystem.fs.item_management.entities.Role;
import runsystem.fs.item_management.entities.User;
import runsystem.fs.item_management.security.JwtService;
import runsystem.fs.item_management.services.UserService;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User request) {
        request.setPassword(passwordEncoder.encode(request.getPassword()));
        request.setRole(Role.USER);
        User saved = userService.createUser(request);
        String token = jwtService.generateToken(Map.of("uid", saved.getId()), saved.getEmail());
        return ResponseEntity.ok(Map.of("token", token));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String email = request.getOrDefault("email", "");
        String password = request.getOrDefault("password", "");
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(email, password)
        );
        String token = jwtService.generateToken(Map.of(), email);
        return ResponseEntity.ok(Map.of("token", token));
    }
}


