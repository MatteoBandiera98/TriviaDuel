package com.Capstone.TriviaDuel.Model;



import jakarta.persistence.*;
import lombok.AllArgsConstructor;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private int position;
    private int score;

    @OneToOne
    private User user_id;



    public void setScore(int score) {
        this.score = score;
    }

    // Getters e setters per gli altri campi
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }

    public int getScore() {
        return score;
    }

    public void setUser(User user_id) {
        this.user_id = user_id;
    }

    public User getUser() {
        return user_id;
    }

}

