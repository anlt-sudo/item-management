package runsystem.fs.item_management.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import runsystem.fs.item_management.services.UploadService;
import runsystem.fs.item_management.dtos.ProductCreateDto;
import runsystem.fs.item_management.entities.Product;
import runsystem.fs.item_management.services.ProductService;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    private ProductService productService;

    @Autowired
    private UploadService uploadService;

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable String id) {
        return productService.getProductById(id);
    }


    @PostMapping(value = "", consumes = {"multipart/form-data"})
    @PreAuthorize("hasRole('ADMIN')")
    public Product createProduct(
            @ModelAttribute ProductCreateDto productCreateDto 
            ) {
        Product product = new Product();
        product.setName(productCreateDto.getName());
        product.setDescription(productCreateDto.getDescription());
        product.setPrice(productCreateDto.getPrice());
        MultipartFile image = productCreateDto.getImage();
        if (image != null && !image.isEmpty()) {
            String imageUrl = uploadService.uploadImage(image);
            product.setImageUrl(imageUrl);
        }
        return productService.createProduct(product);
    }

    @PutMapping(value = "/{id}", consumes = {"multipart/form-data"})
    @PreAuthorize("hasRole('ADMIN')")
    public Product updateProduct(
            @PathVariable String id,
            @ModelAttribute ProductCreateDto productCreateDto 
            ) {
        Product product = new Product();
        product.setId(id);
        product.setName(productCreateDto.getName());
        product.setDescription(productCreateDto.getDescription());
        product.setPrice(productCreateDto.getPrice());
        MultipartFile image = productCreateDto.getImage();
        if (image != null && !image.isEmpty()) {
            String imageUrl = uploadService.uploadImage(image);
            product.setImageUrl(imageUrl);
        }
        return productService.updateProduct(id, product);
    }


    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteProduct(@PathVariable String id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/search")
    public List<Product> searchProducts(@RequestParam String productName) {
        // Implement search logic here, e.g., using a repository method
        return productService.searchProducts(productName);
    }
}
