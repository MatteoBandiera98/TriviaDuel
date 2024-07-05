package com.Capstone.TriviaDuel.Dto;


import jakarta.validation.constraints.Email;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Data
public class UserLoginDto {
    @Email
    private String email;
    private String password;
}