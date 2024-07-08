package com.Capstone.TriviaDuel.Config;

import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        Map<String, String> config = new HashMap<>();
        config.put("cloud_name", "dswtizigi");
        config.put("api_key", "994171861937225");
        config.put("api_secret", "18akG-ySSNUZka_DR0yRCuVz8Zo");
        return new Cloudinary(config);
    }
}
