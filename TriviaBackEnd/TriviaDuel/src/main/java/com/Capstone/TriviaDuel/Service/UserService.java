package com.Capstone.TriviaDuel.Service;

import com.Capstone.TriviaDuel.Dto.UserDto;
import com.Capstone.TriviaDuel.Enums.Role;
import com.Capstone.TriviaDuel.Exceptions.UserNotFoundException;
import com.Capstone.TriviaDuel.Model.User;
import com.Capstone.TriviaDuel.Repository.UserRepository;
import com.cloudinary.Cloudinary;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;
import java.util.Optional;


@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private Cloudinary cloudinary;

    public User saveUser(UserDto userDto) {
        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setName(userDto.getName());
        user.setSurname(userDto.getSurname());
        user.setAvatar(userDto.getAvatar());
        user.setRole(Role.USER);

//        sendRegistrationMail(user);

        userRepository.save(user);
        System.out.println("User with id " + user.getUserId() + " correctly saved!");
        return user;
    }

    public Page<User> getAllUsers(int page, int size, String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        return userRepository.findAll(pageable);
    }

    public User getUserById(int id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id " + id));
    }

    public User getUserByEmail(String email) {
        Optional<User> userOptional = userRepository.findOneByEmail(email);
        if (userOptional.isPresent()) {
        return userOptional.get();
        }
else {
     throw new UserNotFoundException("User not found with email " + email + "not found");
        }

    }


    public String updateUser(int id, UserDto userDto) {
        User user = getUserById(id);
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());
        user.setName(userDto.getName());
        user.setSurname(userDto.getSurname());
        user.setAvatar(userDto.getAvatar());

        userRepository.save(user);

        return "User with id " + user.getUserId() + " correctly updated!";
    }

    public String deleteUser(int id) {
        User user = getUserById(id);
        userRepository.deleteById(id);
        return "User with id=" + id + " correctly deleted!";
    }

    public String PATCHUserAvatar(int userId, MultipartFile photo) throws IOException {
        User user = getUserById(userId);

        if (user != null) {
            String url = (String) cloudinary.uploader().upload(photo.getBytes(), Collections.emptyMap()).get("url");

            user.setAvatar(url);
            userRepository.save(user);
            return "User with id=" + userId + " updated successfully with the sent photo.";
        } else {
            throw new UserNotFoundException("User with id=" + userId + " not found.");
        }
    }

    private void sendRegistrationMail(User user) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("Rest Service Registration");
        message.setText("Congratulations, " + user.getName() + " " + user.getSurname() + "! Successful registration to this rest service");

        javaMailSender.send(message);
    }
}

