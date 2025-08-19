package runsystem.fs.item_management.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import runsystem.fs.item_management.entities.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, String> {
    // Additional query methods can be defined here if needed
    
}
