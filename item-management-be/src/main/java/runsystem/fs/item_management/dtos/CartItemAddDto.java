package runsystem.fs.item_management.dtos;

import lombok.Data;

@Data
public class CartItemAddDto {
    private String productId;
    private int quantity;
}
