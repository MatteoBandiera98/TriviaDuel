package com.Capstone.TriviaDuel.Controller;




import com.Capstone.TriviaDuel.Model.Player;
import com.Capstone.TriviaDuel.Service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/players")
public class PlayerController {

    @Autowired
    private PlayerService playerService;

    // Classe per rappresentare il corpo della richiesta
    public static class ScoreUpdateRequest {
        private int score;

        public int getScore() {
            return score;
        }

        public void setScore(int score) {
            this.score = score;
        }
    }

    // Endpoint per aggiornare il punteggio del giocatore
    @PutMapping("/{id}/score")
    public ResponseEntity<?> updatePlayerScore(@PathVariable Long id, @RequestBody ScoreUpdateRequest request) {
        try {
            playerService.updatePlayerScore(id, request.getScore());
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Errore durante l'aggiornamento del punteggio");
        }
    }
}


