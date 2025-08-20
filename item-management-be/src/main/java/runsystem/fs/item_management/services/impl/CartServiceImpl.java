package runsystem.fs.item_management.services.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import runsystem.fs.item_management.entities.Cart;
import runsystem.fs.item_management.entities.CartDetailPK;
import runsystem.fs.item_management.entities.CartItem;
import runsystem.fs.item_management.entities.User;
import runsystem.fs.item_management.repositories.CartRepository;
import runsystem.fs.item_management.repositories.CartDetailRepository;
import runsystem.fs.item_management.services.CartService;
import runsystem.fs.item_management.dtos.CartAddItemResponseDto;
import runsystem.fs.item_management.dtos.CartItemUpdationRequest;

@Service
public class CartServiceImpl implements CartService {
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private CartDetailRepository cartDetailRepository;

    @Override
    public Cart getCartByUser(int userId) {
        return cartRepository.findByUser_Id(userId).orElse(null);
    }

    @Override
    public CartAddItemResponseDto addItemToCart(int userId, CartItem item) {
        Cart cart = cartRepository.findByUser_Id(userId).orElse(null);
        if (cart == null) {
            cart = new Cart();
            cart.setUser(new User());
            cart.getUser().setId(userId);
            cart = cartRepository.save(cart);
        }
        CartDetailPK pk = new CartDetailPK(cart.getId(), item.getProduct().getId());
        item.setId(pk);
        item.setCart(cart);
        Optional<CartItem> existing = cartDetailRepository.findById(pk);
        CartItem addedItem;
        if (existing.isPresent()) {
            CartItem existItem = existing.get();
            existItem.setQuantity(existItem.getQuantity() + item.getQuantity());
            addedItem = cartDetailRepository.save(existItem);
        } else {
            addedItem = cartDetailRepository.save(item);
        }
        Cart updatedCart = cartRepository.findById(cart.getId()).orElse(null);
        return new CartAddItemResponseDto(updatedCart, addedItem);
    }

    @Override
    public Cart updateItemInCart(int userId, CartItemUpdationRequest item) {
        Cart cart = cartRepository.findByUser_Id(userId).orElse(null);
        if (cart == null) return null;
        CartDetailPK pk = new CartDetailPK(item.getCartId(), item.getProductId());
        java.util.Optional<CartItem> existing = cartDetailRepository.findById(pk);
        if (existing.isPresent()) {
            CartItem existItem = existing.get();
            existItem.setQuantity(item.getQuantity());
            cartDetailRepository.save(existItem);
        }
        return cartRepository.findById(cart.getId()).orElse(null);
    }

    @Override
    public void removeItemFromCart(int userId, String productId) {
        Cart cart = cartRepository.findByUser_Id(userId).orElse(null);
        if (cart == null) return;
        runsystem.fs.item_management.entities.CartDetailPK pk = new runsystem.fs.item_management.entities.CartDetailPK(cart.getId(), productId);
        cartDetailRepository.deleteById(pk);
    }

    @Override
    public void clearCart(int userId) {
        Cart cart = cartRepository.findByUser_Id(userId).orElse(null);
        if (cart == null) return;
        java.util.List<CartItem> items = cartDetailRepository.findByCart_Id(cart.getId());
        cartDetailRepository.deleteAll(items);
    }
}
