package runsystem.fs.item_management.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItemUpdationRequest {
    private String cartId;
    private String productId;
    private int quantity;
}
