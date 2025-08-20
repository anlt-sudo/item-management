package runsystem.fs.item_management.dtos;

import lombok.Data;

@Data
public class OrderDetailDto {
    private String productId;
    private String productName;
    private int quantity;
    private double price;
}
