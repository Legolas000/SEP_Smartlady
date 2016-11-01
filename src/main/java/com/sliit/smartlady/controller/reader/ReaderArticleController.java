package com.sliit.smartlady.controller.reader;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.sliit.smartlady.model.Article;
import com.sliit.smartlady.model.Reades;
import com.sliit.smartlady.service.ArticleDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ReaderArticleController {

	@Autowired
	ArticleDAO articleDAO;
	/*@Autowired
	FeaturedArticleDAO featuredArticleDAO;*/
	
	//----------------------------Get All Articles----------------------------------
	@RequestMapping(value = "/readarticles/", method = RequestMethod.GET)
	public ResponseEntity<List<Article>> listAllArticles(){
		List<Article> articles = articleDAO.getAllArticles();

		 if(articles.isEmpty()){
	            return new ResponseEntity<List<Article>>(HttpStatus.NO_CONTENT);
	        }
	        return new ResponseEntity<List<Article>>(articles, HttpStatus.OK);
	}

	//----------------------------Get Featured Articles----------------------------------
	@RequestMapping(value = "/featuredarticle/", method = RequestMethod.GET)
	public ResponseEntity<String> getFeaturedArticles(){
        try{
		List<Article> articles = articleDAO.getSortedFeaturedArticle();
        List<Article> articlesWithOtherEntities = articleDAO.getAllArticlesWithOtherEntities(articles);

            ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
            String jsonStringArticles= ow.writeValueAsString(articlesWithOtherEntities);

            if(articles.isEmpty()){
                return new ResponseEntity<String>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<String>(jsonStringArticles, HttpStatus.OK);

        }catch (Exception ex){

        }
        return null;

	}

	//---------------------------- Get All Articles By Date ----------------------------------
	@RequestMapping(value = "/allarticles/", method = RequestMethod.GET)
	public ResponseEntity<String> getSortedArticlesByDate(){
        try {
            List<Article> articles = articleDAO.getSortedArticleByDate();
            List<Article> articlesWithOtherEntities = articleDAO.getAllArticlesWithOtherEntities(articles);

            ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
            String jsonStringArticles = ow.writeValueAsString(articlesWithOtherEntities);

            if (articles.isEmpty()) {
                return new ResponseEntity<String>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<String>(jsonStringArticles, HttpStatus.OK);
        }catch (Exception ex){

        }
        return null;
	}
		
		
	//--------------------Update a status of an article------------------------------
	@RequestMapping(value = "/readarticles/{id}/{readerID}", method = RequestMethod.GET)
    public ResponseEntity<Article> getArticleById(@PathVariable("id") int id,@PathVariable("readerID") int readerID) {

        Article currentArticle = articleDAO.findByID(id);
        //Article currentArticleWithOtherEntities = articleDAO.getArticleWithOtherEntities(currentArticle);
        articleDAO.saveReader(currentArticle.getId(),readerID);

		if (currentArticle==null) {
            return new ResponseEntity<Article>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<Article>(currentArticle, HttpStatus.OK);
    }

    @RequestMapping(value = "/rating", method = RequestMethod.POST)
    public ResponseEntity<Void> updateReads(@RequestBody Reades reades) {
        articleDAO.updateReaderRating(reades);
        articleDAO.updateAverageReaderRating(reades);
        String message = "Successfully Updated";

        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);

    }


    @RequestMapping(value = "/reades/{articleId}/{userID}", method = RequestMethod.GET)
    public ResponseEntity<Reades> getReadesDetails(@PathVariable("articleId") int articleId,
                                                   @PathVariable("userID") int userID) {

        Reades readesDetails = articleDAO.getReaderByReaderIDAndArticleID(articleId,userID);


        if (readesDetails==null) {
            return new ResponseEntity<Reades>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<Reades>(readesDetails, HttpStatus.OK);
    }



}
