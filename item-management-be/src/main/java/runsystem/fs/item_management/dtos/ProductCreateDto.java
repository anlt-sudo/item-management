package runsystem.fs.item_management.dtos;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class ProductCreateDto {
    private String name;
    private String description;
    private Double price;
    private MultipartFile image;
}
