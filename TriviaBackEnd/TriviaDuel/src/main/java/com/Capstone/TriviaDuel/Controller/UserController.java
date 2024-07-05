package com.Capstone.TriviaDuel.Controller;


import com.Capstone.TriviaDuel.Dto.UserDto;
import com.Capstone.TriviaDuel.Exceptions.BadRequestException;
import com.Capstone.TriviaDuel.Model.User;
import com.Capstone.TriviaDuel.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

//    @PostMapping("/users")
//    @ResponseStatus(HttpStatus.CREATED)
//    public UserDto saveUser(@RequestBody @Validated UserDto user, BindingResult bindingResult) {
//        if(bindingResult.hasErrors()){
//            throw new BadRequestException(bindingResult.getAllErrors().stream()
//                    .map(objectError -> objectError.getDefaultMessage())
//                    .reduce("", (s, s2) -> s + s2));
//        }
//        userService.saveUser(user);
//        return user;
//    }

    @GetMapping("/users")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public Page<User> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "15") int size,
            @RequestParam(defaultValue = "userId") String sortBy) {
        return userService.getAllUsers(page, size, sortBy);
    }

    @GetMapping("/users/{userId}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public User getUserById(@PathVariable int userId) {
        return userService.getUserById(userId);
    }

    @PutMapping(path = "/users/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAuthority('ADMIN')")
    public @ResponseBody String updateUser(@PathVariable int userId, @RequestBody @Validated UserDto user, BindingResult bindingResult) {
        if(bindingResult.hasErrors()){
            throw new BadRequestException(bindingResult.getAllErrors().stream()
                    .map(objectError -> objectError.getDefaultMessage())
                    .reduce("", (s, s2) -> s + s2));
        }
        return userService.updateUser(userId, user);
    }

    @DeleteMapping("/users/{userId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public String deleteUser(@PathVariable int userId) {
        return userService.deleteUser(userId);
    }

    @PatchMapping("/users/{userId}")
    public String PATCHEmployeeAvatar(@RequestPart MultipartFile avatar, @PathVariable int userId) throws IOException {
        return userService.PATCHUserAvatar(userId, avatar);
    }
}