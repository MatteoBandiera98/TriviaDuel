package com.Capstone.TriviaDuel.Repository;


import com.Capstone.TriviaDuel.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    public Optional<User> findOneByEmail(String email);

}
