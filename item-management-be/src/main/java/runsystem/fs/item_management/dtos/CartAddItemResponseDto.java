package runsystem.fs.item_management.dtos;

import lombok.Data;
import runsystem.fs.item_management.entities.Cart;
import runsystem.fs.item_management.entities.CartItem;

@Data
public class CartAddItemResponseDto {
    private Cart cart;
    private CartItem addedItem;
    public CartAddItemResponseDto(Cart cart, CartItem addedItem) {
        this.cart = cart;
        this.addedItem = addedItem;
    }
}
