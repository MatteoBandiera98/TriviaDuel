package com.Capstone.TriviaDuel.Controller;

import com.Capstone.TriviaDuel.Model.Question;
import com.Capstone.TriviaDuel.Service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    // Endpoint per ottenere una domanda casuale in base all'argomento
    @GetMapping("/random")
    public ResponseEntity<Question> getRandomQuestion(@RequestParam String category) {
        try {
            Question question = questionService.getRandomQuestionByCategory(category);
            return ResponseEntity.ok(question);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint per ottenere tutte le categorie
    @GetMapping("/categories")
    public ResponseEntity<List<String>> getAllCategories() {
        List<String> categories = questionService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    // Endpoint per creare una nuova domanda
    @PostMapping("/create")
    public ResponseEntity<Question> createQuestion(@RequestBody Question question) {
        try {
            Question createdQuestion = questionService.createQuestion(question);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdQuestion);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
