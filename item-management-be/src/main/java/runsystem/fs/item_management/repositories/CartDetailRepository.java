package runsystem.fs.item_management.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import runsystem.fs.item_management.entities.CartDetailPK;
import runsystem.fs.item_management.entities.CartItem;

@Repository
public interface CartDetailRepository extends JpaRepository<CartItem, CartDetailPK> {
    
    @Query("SELECT c FROM CartItem c WHERE c.cart.id = ?1")
    List<CartItem> findByCart_Id(String cartId);
    
}
