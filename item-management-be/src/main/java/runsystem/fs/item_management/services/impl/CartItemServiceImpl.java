package runsystem.fs.item_management.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import runsystem.fs.item_management.entities.CartItem;
import runsystem.fs.item_management.repositories.CartDetailRepository;
import runsystem.fs.item_management.services.CartItemService;

@Service
public class CartItemServiceImpl implements CartItemService{
    @Autowired
    private CartDetailRepository cartDetailRepository;

    @Override
    public List<CartItem> getCartItemsByCartId(String cartId){
        return cartDetailRepository.findByCart_Id(cartId);
    };

    @Override
    public CartItem addCartItem(CartItem cartItem) {
        return cartDetailRepository.save(cartItem);
    }

    @Override
    public void deleteCartItem(CartItem cartItem) {
        cartDetailRepository.delete(cartItem);
    }

    @Override
    public CartItem updateCartItem(CartItem cartItem) {
        return cartDetailRepository.save(cartItem);
    }


}
