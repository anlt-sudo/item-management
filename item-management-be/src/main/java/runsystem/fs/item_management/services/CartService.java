package runsystem.fs.item_management.services;

import runsystem.fs.item_management.entities.Cart;
import runsystem.fs.item_management.entities.CartItem;

import runsystem.fs.item_management.dtos.CartAddItemResponseDto;

public interface CartService {
    Cart getCartByUser(int userId);
    CartAddItemResponseDto addItemToCart(int userId, CartItem item);
    Cart updateItemInCart(int userId, CartItem item);
    void removeItemFromCart(int userId, String productId);
    void clearCart(int userId);
}
