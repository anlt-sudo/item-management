package runsystem.fs.item_management.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import runsystem.fs.item_management.dtos.OrderDto;
import runsystem.fs.item_management.dtos.OrderResponseDto;
import runsystem.fs.item_management.dtos.OrderDetailDto;
import runsystem.fs.item_management.entities.Order;
import runsystem.fs.item_management.entities.User;
import runsystem.fs.item_management.repositories.OrderRepository;
import runsystem.fs.item_management.services.OrderService;
import runsystem.fs.item_management.services.UserService;

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
	public ResponseEntity<OrderResponseDto> placeOrder(Authentication authentication, @RequestBody OrderDto orderDto) {
		User user = getUser(authentication);
		if (user == null) return ResponseEntity.badRequest().build();
		Order order = orderService.placeOrder(user.getId(), orderDto.getAddress());
		return ResponseEntity.ok(toOrderResponseDto(order));
	}

	// Xem tất cả đơn hàng (admin)
	@GetMapping
	@PreAuthorize("hasRole('ADMIN')")
	public List<OrderResponseDto> getAllOrders() {
		return orderRepository.findAll().stream().map(this::toOrderResponseDto).toList();
	}

	// Xem đơn hàng của user hiện tại
	@GetMapping("/my")
	@PreAuthorize("hasAnyRole('USER', 'ADMIN')")
	public List<OrderResponseDto> getMyOrders(Authentication authentication) {
		User user = getUser(authentication);
		if (user == null) return java.util.Collections.emptyList();
		return orderRepository.findAll().stream()
			.filter(o -> o.getUser() != null && o.getUser().getId() == user.getId())
			.map(this::toOrderResponseDto)
			.toList();
	}

	// Xem chi tiết đơn hàng (cả user và admin)
	@GetMapping("/{id}")
	@PreAuthorize("hasAnyRole('USER', 'ADMIN')")
	public ResponseEntity<OrderResponseDto> getOrderDetail(@PathVariable String id) {
		return orderRepository.findById(id)
			.map(order -> ResponseEntity.ok(toOrderResponseDto(order)))
			.orElse(ResponseEntity.notFound().build());
	}
	private OrderResponseDto toOrderResponseDto(Order order) {
		OrderResponseDto dto = new OrderResponseDto();
		dto.setId(order.getId());
		dto.setTotal(order.getTotal());
		dto.setCreateDate(order.getCreateDate());
		dto.setAddress(order.getAddress());
		if (order.getOrderDetails() != null) {
			List<OrderDetailDto> details = order.getOrderDetails().stream().map(detail -> {
				OrderDetailDto d = new OrderDetailDto();
				d.setProductId(detail.getProduct() != null ? detail.getProduct().getId() : null);
				d.setProductName(detail.getProduct() != null ? detail.getProduct().getName() : null);
				d.setQuantity(detail.getQuantity());
				d.setPrice(detail.getProduct() != null ? detail.getProduct().getPrice() : 0);
				return d;
			}).toList();
			dto.setOrderDetails(details);
		}
		return dto;
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
