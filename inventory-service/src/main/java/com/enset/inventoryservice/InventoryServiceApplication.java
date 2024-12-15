package com.enset.inventoryservice;

import com.enset.inventoryservice.entities.Product;
import com.enset.inventoryservice.repositories.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.stream.Stream;

@SpringBootApplication
public class InventoryServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(InventoryServiceApplication.class, args);
    }
    @Bean
    CommandLineRunner commandLineRunner(ProductRepository productRepository){
        return args -> {
            Stream.of("Computer", "Printer", "Smartphone", "Tablet").forEach(name -> {
                productRepository.save(Product.builder().id(name+"_ID").name(name).price(Math.random()*3000).quantity((int)(Math.random()*10)).build());
            });
            productRepository.findAll().forEach(System.out::println);
        };

    }
}
