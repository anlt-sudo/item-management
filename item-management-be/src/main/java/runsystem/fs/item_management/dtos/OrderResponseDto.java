package runsystem.fs.item_management.dtos;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderResponseDto {
    private String id;
    private double total;
    private LocalDateTime createDate;
    private String address;
    private List<OrderDetailDto> orderDetails;
}
