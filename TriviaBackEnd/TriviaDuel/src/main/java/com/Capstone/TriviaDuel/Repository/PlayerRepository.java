package com.Capstone.TriviaDuel.Repository;




import com.Capstone.TriviaDuel.Model.Player;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerRepository extends JpaRepository<Player, Long> {
}
