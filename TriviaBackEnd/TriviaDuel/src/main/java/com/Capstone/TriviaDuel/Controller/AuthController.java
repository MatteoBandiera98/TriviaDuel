package com.Capstone.TriviaDuel.Controller;

import com.Capstone.TriviaDuel.Dto.UserDto;
import com.Capstone.TriviaDuel.Dto.UserLoginDto;
import com.Capstone.TriviaDuel.Exceptions.BadRequestException;
import com.Capstone.TriviaDuel.Service.AuthService;
import com.Capstone.TriviaDuel.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;

    @PostMapping("/auth/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserDto register(@RequestBody @Validated UserDto user, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new BadRequestException(bindingResult.getAllErrors().stream()
                    .map(objectError -> objectError.getDefaultMessage())
                    .reduce("", (s, s2) -> s + s2));
        }
        userService.saveUser(user);
        return user;
    }

    @PostMapping("/auth/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody @Validated UserLoginDto userLoginDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new BadRequestException(bindingResult.getAllErrors().stream()
                    .map(objectError -> objectError.getDefaultMessage())
                    .reduce("", (s, s2) -> s + s2));
        }
        Map<String, Object> response = authService.authenticateUserAndCreateToken(userLoginDto);
        return ResponseEntity.ok(response);
    }
}
