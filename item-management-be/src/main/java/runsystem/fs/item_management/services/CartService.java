package runsystem.fs.item_management.services;

import runsystem.fs.item_management.entities.Cart;
import runsystem.fs.item_management.entities.CartItem;

import runsystem.fs.item_management.dtos.CartAddItemResponseDto;
import runsystem.fs.item_management.dtos.CartItemUpdationRequest;

public interface CartService {
    Cart getCartByUser(int userId);
    CartAddItemResponseDto addItemToCart(int userId, CartItem item);
    Cart updateItemInCart(int userId, CartItemUpdationRequest item);
    void removeItemFromCart(int userId, String productId);
    void clearCart(int userId);
}
