package runsystem.fs.item_management.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import runsystem.fs.item_management.entities.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, String>{
    List<Product> findByNameContainingIgnoreCase(String name);
}
