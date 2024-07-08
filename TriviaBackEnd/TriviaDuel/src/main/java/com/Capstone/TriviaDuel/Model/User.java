package com.Capstone.TriviaDuel.Model;




import com.Capstone.TriviaDuel.Enums.Role;
import jakarta.persistence.*;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


import java.util.Collection;
import java.util.List;



@Table (name = "users")
@NoArgsConstructor
@Setter
@Getter
@Entity
public class User implements UserDetails {

    @Id
    @GeneratedValue
    private int userId;
    private String username;
    @Column (unique = true)
    private String email;
    private String password;
    private String name;
    private String surname;
    private String avatar;
    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToOne(mappedBy = "user_id")
    public Player player;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return "";
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


}

