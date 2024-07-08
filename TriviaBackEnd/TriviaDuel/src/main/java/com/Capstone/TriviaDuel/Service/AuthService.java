package com.Capstone.TriviaDuel.Service;

import com.Capstone.TriviaDuel.Dto.UserLoginDto;
import com.Capstone.TriviaDuel.Exceptions.UnauthorizedException;
import com.Capstone.TriviaDuel.Model.User;
import com.Capstone.TriviaDuel.Security.JwtTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {
    @Autowired
    private UserService userService;

    @Autowired
    PasswordEncoder bcrypt;

    @Autowired
    private JwtTool jwtTool;

    public Map<String, Object> authenticateUserAndCreateToken(UserLoginDto userLoginDto) {
        System.out.println(userLoginDto);
        User user = userService.getUserByEmail(userLoginDto.getEmail());
        if (bcrypt.matches(userLoginDto.getPassword(), user.getPassword())) {
            String token = jwtTool.createToken(user);

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("user", user);

            return response;
        } else {
            throw new UnauthorizedException("Error in authorization, relogin!");
        }
    }
}
