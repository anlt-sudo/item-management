package runsystem.fs.item_management.services;

import java.util.List;

import runsystem.fs.item_management.entities.CartItem;

public interface CartItemService {
    List<CartItem> getCartItemsByCartId(String cartId);

    CartItem addCartItem(CartItem cartItem);

    void deleteCartItem(CartItem cartItem);

    CartItem updateCartItem(CartItem cartItem);
}
