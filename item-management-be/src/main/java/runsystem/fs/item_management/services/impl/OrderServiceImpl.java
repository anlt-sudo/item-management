package runsystem.fs.item_management.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import runsystem.fs.item_management.entities.*;
import runsystem.fs.item_management.repositories.*;
import runsystem.fs.item_management.services.OrderService;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderDetailRepository orderDetailRepository;
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private CartDetailRepository cartDetailRepository;
    @Autowired
    private UserRepository userRepository; 

    @Override
    @Transactional
    public Order placeOrder(int userId) {
        // Lấy cart
        Cart cart = cartRepository.findByUser_Id(userId).orElse(null);
        if (cart == null) throw new RuntimeException("Cart not found");
        List<CartItem> cartItems = cartDetailRepository.findByCart_Id(cart.getId());
        if (cartItems.isEmpty()) throw new RuntimeException("Cart is empty");

        // Lấy user
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        // Tạo order
        Order order = new Order();
        order.setUser(user); // Gán user cho order
        order.setCreateDate(LocalDateTime.now());
        order.setOrderDetails(new ArrayList<>());
        double total = 0;

        for (CartItem cartItem : cartItems) {
            OrderDetail detail = new OrderDetail();
            detail.setOrder(order);
            detail.setProduct(cartItem.getProduct());
            detail.setQuantity(cartItem.getQuantity());
            order.getOrderDetails().add(detail);
            total += cartItem.getProduct().getPrice() * cartItem.getQuantity();
        }
        order.setTotal(total);
        Order savedOrder = orderRepository.save(order);
        orderDetailRepository.saveAll(order.getOrderDetails());

        // Xóa cart
        cartDetailRepository.deleteAll(cartItems);
        cartRepository.delete(cart);

        return savedOrder;
    }
}
