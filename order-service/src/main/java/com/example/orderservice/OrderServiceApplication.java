package com.example.orderservice;

import com.example.orderservice.entities.Order;
import com.example.orderservice.entities.ProductItem;
import com.example.orderservice.entities.enums.OrderState;
import com.example.orderservice.model.Product;
import com.example.orderservice.repositories.OrderRepository;
import com.example.orderservice.repositories.ProductItemRepository;
import com.example.orderservice.restClients.InventoryRestClient;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;
import java.util.List;

@SpringBootApplication
@EnableFeignClients
public class OrderServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(OrderServiceApplication.class, args);
    }
    @Bean
    CommandLineRunner start(
            InventoryRestClient inventoryRestClient,
            OrderRepository orderRepository,
            ProductItemRepository productItemRepository
    ) {
        return args -> {
            /*List<Product> products = inventoryRestClient.getAllProducts();
            products.forEach(product->{
                System.out.println("Product Id: "+product.getId());
                System.out.println("Product name: "+product.getName());
                System.out.println("Product Price: "+product.getPrice());
                System.out.println("Product Quantity: "+product.getQuantity());

            });*/
            List<String> allProducts = List.of("Computer_ID", "Printer_ID", "Smartphone_ID", "Tablet_ID");

            for (int i = 0; i < 10; i++) {
                Order savedOrder = orderRepository.save(
                        Order.builder()
                                .date(LocalDate.now())
                                .state(Math.random() > 0.5 ? OrderState.CONFIRMED : OrderState.CANCELLED)
                                .build()
                );

                allProducts.forEach(product -> {
                    productItemRepository.save(
                            ProductItem.builder()
                                    .productId(product)
                                    .price(Math.random() * 500)
                                    .quantity((int) (1 + Math.random() * 100))
                                    .order(savedOrder)
                                    .build()
                    );
                });
            }
        };
    }
}
