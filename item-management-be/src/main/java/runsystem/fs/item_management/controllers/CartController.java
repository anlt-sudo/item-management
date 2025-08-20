package runsystem.fs.item_management.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import runsystem.fs.item_management.dtos.CartAddItemResponseDto;
import runsystem.fs.item_management.dtos.CartItemAddDto;
import runsystem.fs.item_management.dtos.CartItemUpdationRequest;
import runsystem.fs.item_management.entities.Cart;
import runsystem.fs.item_management.entities.CartItem;
import runsystem.fs.item_management.entities.User;
import runsystem.fs.item_management.services.CartItemService;
import runsystem.fs.item_management.services.CartService;
import runsystem.fs.item_management.services.ProductService;
import runsystem.fs.item_management.services.UserService;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    @Autowired
    private CartService cartService;

    @Autowired
    private CartItemService cartItemService;

    @Autowired
    private UserService userService;

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<CartItem> getCart(Authentication authentication) {
        User user = getUser(authentication);
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        int userId = user.getId();
        Cart cart = cartService.getCartByUser(userId);

        if(cart == null){
            return new ArrayList<CartItem>();
        }

        return cartItemService.getCartItemsByCartId(cart.getId());
    }

    @PostMapping("/add")
    public CartAddItemResponseDto addItem(@RequestBody CartItemAddDto dto, Authentication authentication) {
        User user = getUser(authentication);
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        int userId = user.getId();
        CartItem item = new CartItem();
        item.setProduct(productService.getProductById(dto.getProductId()));
        item.setQuantity(dto.getQuantity());
        return cartService.addItemToCart(userId, item);
    }

    @PutMapping("/update")
    public Cart updateItem(@RequestBody CartItemUpdationRequest item, Authentication authentication) {
        User user = getUser(authentication);
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        int userId = user.getId();
        return cartService.updateItemInCart(userId, item);
    }

    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<?> removeItem(@PathVariable String productId, Authentication authentication) {
        User user = getUser(authentication);
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        int userId = user.getId();
        cartService.removeItemFromCart(userId, productId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/clear")
    public ResponseEntity<?> clearCart(Authentication authentication) {
        User user = getUser(authentication);
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        int userId = user.getId();
        cartService.clearCart(userId);
        return ResponseEntity.ok().build();
    }


    private User getUser(Authentication authentication) {
        return userService.getByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
