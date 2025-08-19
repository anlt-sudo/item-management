package runsystem.fs.item_management.services;

import runsystem.fs.item_management.entities.Product;
import java.util.List;

public interface ProductService {
    List<Product> getAllProducts();
    Product getProductById(String id);
    Product createProduct(Product product);
    Product updateProduct(String id, Product product);
    void deleteProduct(String id);
}
