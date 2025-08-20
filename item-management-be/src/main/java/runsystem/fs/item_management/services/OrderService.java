package runsystem.fs.item_management.services;

import runsystem.fs.item_management.entities.Order;

public interface OrderService {
    Order placeOrder(int userId, String address);
}
