package runsystem.fs.item_management.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "cart_items")
public class CartItem {
    @EmbeddedId
    private CartDetailPK id;
    @OneToOne
    @JoinColumn(name = "product_id")
    @MapsId("productId")
    private Product product;
    private int quantity;

    @ManyToOne
    @JoinColumn(name = "cart_id")
    @MapsId("cartId")
    @JsonIgnore
    private Cart cart;
}
