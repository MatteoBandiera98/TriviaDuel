package com.Capstone.TriviaDuel.Service;




import com.Capstone.TriviaDuel.Model.Player;
import com.Capstone.TriviaDuel.Repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlayerService {
    @Autowired
    private PlayerRepository playerRepository;

    public Player savePlayer(Player player) {
        return playerRepository.save(player);
    }

    public Player getPlayer(Long id) {
        return playerRepository.findById(id).orElse(null);
    }
    public void updatePlayerScore(Long playerId, int score) {
        Player player = playerRepository.findById(playerId).orElse(null);
        if (player != null) {
            player.setScore(score);
            playerRepository.save(player);
        }
    }
}
