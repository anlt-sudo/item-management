package runsystem.fs.item_management.configurations;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import runsystem.fs.item_management.entities.Role;
import runsystem.fs.item_management.entities.User;
import runsystem.fs.item_management.repositories.UserRepository;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner{
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Kiểm tra xem admin đã tồn tại chưa
        if (userRepository.findByEmail("admin@example.com").isEmpty()) {
            User adminUser = User.builder()
                .name("Administrator")
                .email("admin@example.com")
                .password(passwordEncoder.encode("admin123"))
                .role(Role.ADMIN)
                .build();
            
            userRepository.save(adminUser);
            log.info("Admin user created successfully!");
            log.info("Email: admin@example.com");
            log.info("Password: admin123");
        } else {
            log.info("Admin user already exists!");
        }
    }
    
}
