package com.Capstone.TriviaDuel.Service;




import com.Capstone.TriviaDuel.Model.Question;
import com.Capstone.TriviaDuel.Repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class QuestionService {
    @Autowired
    private QuestionRepository questionRepository;


    // Metodo per ottenere una domanda casuale in base all'argomento
    public Question getRandomQuestionByCategory(String category) {
        List<Question> questions = questionRepository.findByCategory(category);
        if (questions.isEmpty()) {
            return null;
        }
        Random random = new Random();
        return questions.get(random.nextInt(questions.size()));
    }
    // Metodo per ottenere tutte le categorie
    public List<String> getAllCategories() {
        return questionRepository.findAll()
                .stream()
                .map(Question::getCategory)
                .distinct()
                .collect(Collectors.toList());
    }

    // Metodo per creare una nuova domanda
    public Question createQuestion(Question question) {
        return questionRepository.save(question);
    }
}

