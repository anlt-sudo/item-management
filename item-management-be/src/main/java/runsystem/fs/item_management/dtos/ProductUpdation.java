package runsystem.fs.item_management.dtos;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ProductUpdation {
    private String id;
    private String name;
    private String description;
    private double price;
    private MultipartFile image;
}
