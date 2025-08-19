package runsystem.fs.item_management.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import runsystem.fs.item_management.entities.Order;
import runsystem.fs.item_management.entities.User;
import runsystem.fs.item_management.services.OrderService;
import runsystem.fs.item_management.repositories.OrderRepository;
import runsystem.fs.item_management.services.UserService;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
	@Autowired
	private OrderService orderService;
	@Autowired
	private OrderRepository orderRepository;
	@Autowired
	private UserService userService;

	// Đặt hàng (user)
	@PostMapping("/place")
	@PreAuthorize("hasAnyRole('USER', 'ADMIN')")
	public ResponseEntity<Order> placeOrder(Authentication authentication) {
		User user = getUser(authentication);
		if (user == null) return ResponseEntity.badRequest().build();
		Order order = orderService.placeOrder(user.getId());
		return ResponseEntity.ok(order);
	}

	// Xem tất cả đơn hàng (admin)
	@GetMapping
	@PreAuthorize("hasRole('ADMIN')")
	public List<Order> getAllOrders() {
		return orderRepository.findAll();
	}

	// Xem đơn hàng của user hiện tại
	@GetMapping("/my")
	@PreAuthorize("hasAnyRole('USER', 'ADMIN')")
	public List<Order> getMyOrders(Authentication authentication) {
		User user = getUser(authentication);
        if (user == null) return java.util.Collections.emptyList();
        return orderRepository.findAll().stream()
            .filter(o -> o.getUser() != null && o.getUser().getId() == user.getId())
            .toList();
	}

	// Xem chi tiết đơn hàng (cả user và admin)
	@GetMapping("/{id}")
	@PreAuthorize("hasAnyRole('USER', 'ADMIN')")
	public ResponseEntity<Order> getOrderDetail(@PathVariable String id) {
		return orderRepository.findById(id)
			.map(ResponseEntity::ok)
			.orElse(ResponseEntity.notFound().build());
	}

	// Cập nhật đơn hàng (admin)
	@PutMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Order> updateOrder(@PathVariable String id, @RequestBody Order order) {
		if (!orderRepository.existsById(id)) return ResponseEntity.notFound().build();
		order.setId(id);
		Order updated = orderRepository.save(order);
		return ResponseEntity.ok(updated);
	}

	private User getUser(Authentication authentication) {
		if (authentication == null) return null;
		String email = authentication.getName();
		return userService.getByEmail(email).orElse(null);
	}
}
