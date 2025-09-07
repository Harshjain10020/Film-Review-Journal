package tech.jainharsh.movieHUB.movies;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;
    
    @Autowired // Add this to correctly inject the MongoTemplate
    private MongoTemplate mongoTemplate;

    public Review createReview(String reviewBody, String imdbId) { // Corrected method name
        Review review = reviewRepository.insert(new Review(reviewBody));
        
        // Corrected Criteria to use the field name as a string literal
        mongoTemplate.update(Movie.class)
            .matching(Criteria.where("imdbId").is(imdbId)) 
            .apply(new Update().push("reviewIds", review))
            .first();
            
        return review;
    }
}