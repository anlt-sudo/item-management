package runsystem.fs.item_management.configurations;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Cấu hình OpenAPI (Swagger UI) cho ứng dụng.
 * Class này định nghĩa các thông tin chung của API và cấu hình
 * xác thực JWT để có thể test các endpoint được bảo vệ.
 */
@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        // Tên của Security Scheme, sẽ được sử dụng để tham chiếu
        final String securitySchemeName = "Bearer Authentication";

        // 1. Định nghĩa thông tin chung cho API (tiêu đề, phiên bản, mô tả)
        Info apiInfo = new Info()
                .title("Item Management API")
                .version("1.0.0")
                .description("Tài liệu API cho ứng dụng Quản lý Sản phẩm. Giao diện này cho phép bạn tương tác trực tiếp với các API.");

        // 2. Cấu hình Security Scheme cho JWT Bearer Token
        // Đây là phần quan trọng nhất để nút "Authorize" hoạt động
        SecurityScheme securityScheme = new SecurityScheme()
                .name(securitySchemeName)
                .type(SecurityScheme.Type.HTTP)
                .scheme("bearer")
                .bearerFormat("JWT")
                .description("Nhập JWT token của bạn vào đây để xác thực.");

        // 3. Áp dụng Security Scheme này cho tất cả các API trên toàn hệ thống
        SecurityRequirement securityRequirement = new SecurityRequirement().addList(securitySchemeName);

        // 4. Tạo và trả về đối tượng OpenAPI đã được cấu hình hoàn chỉnh
        return new OpenAPI()
                .info(apiInfo)
                .addSecurityItem(securityRequirement)
                .components(new Components().addSecuritySchemes(securitySchemeName, securityScheme));
    }
}