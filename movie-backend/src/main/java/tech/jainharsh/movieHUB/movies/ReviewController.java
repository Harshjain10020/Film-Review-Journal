package tech.jainharsh.movieHUB.movies;

import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin; // New import

@RestController
@RequestMapping("/api/v1/reviews")
@CrossOrigin(origins = "http://localhost:5173") // New annotation
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping // This maps to the base path /api/v1/reviews
    public ResponseEntity<Review> createReview(@RequestBody Map<String, String> payload) {
        // The service method call and return statement are correct
        return new ResponseEntity<>(reviewService.createReview(payload.get("reviewBody"), payload.get("imdbId")), HttpStatus.CREATED);
    }
}
