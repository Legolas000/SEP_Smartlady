package com.sliit.smartlady.controller.reader;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.sliit.smartlady.model.*;
import com.sliit.smartlady.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class ReaderArticleController {

	@Autowired
	ArticleDAO articleDAO;
	@Autowired
    CommentsDAO commentsDAO;
    @Autowired
    UserDAO userDAO;
    @Autowired
    CategoryDAO categoryDAO;
    @Autowired
    AdvertisementDAO advertisementDAO;


	
        //----------------------------Get All Articles----------------------------------
        @RequestMapping(value = "/readarticles/", method = RequestMethod.GET)
        public ResponseEntity<List<Article>> listAllArticles(){
            List<Article> articles = articleDAO.getAllArticles();
            //Article currentArticleWithOtherEntities = articleDAO.getArticleWithOtherEntities(articles);

             if(articles.isEmpty()){
                    return new ResponseEntity<List<Article>>(HttpStatus.NO_CONTENT);
                }
                return new ResponseEntity<List<Article>>(articles, HttpStatus.OK);
        }

        //----------------------------Get All Categories----------------------------------
        @RequestMapping(value = "/allCategories", method = RequestMethod.GET)
        public ResponseEntity<List<Category>> getAllCategories(){
            List<Category> categories = categoryDAO.getAllCategories();

             if(categories.isEmpty()){
                    return new ResponseEntity<List<Category>>(HttpStatus.NO_CONTENT);
                }
                return new ResponseEntity<List<Category>>(categories, HttpStatus.OK);
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

    //---------------------------- Get All top Rated Articles ----------------------------------
    @RequestMapping(value = "/topRatedArticles", method = RequestMethod.GET)
    public ResponseEntity<String> getTopRatedArticles(){
        try {
            List<Article> articles = articleDAO.getTopRatedArticles();
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

        //---------------------------- Get All Articles By CategoryID ----------------------------------
        @RequestMapping(value = "/categoryidforarticle/{categoryID}", method = RequestMethod.GET)
        public ResponseEntity<String> getArticlesByCategoryID(@PathVariable("categoryID") int categoryID){
            try {
                List<Article> articles = articleDAO.getArticleByCategoryID(categoryID);
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
            Article currentArticleWithOtherEntities = articleDAO.getArticleWithOtherEntities(currentArticle);
            articleDAO.saveReader(currentArticle.getId(),readerID);

            if (currentArticle==null) {
                return new ResponseEntity<Article>(HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<Article>(currentArticleWithOtherEntities, HttpStatus.OK);
        }

        @RequestMapping(value = "/rating", method = RequestMethod.POST)
        public ResponseEntity<Void> updateReads(@RequestBody Reades reades) {
            articleDAO.updateReaderRating(reades);
            articleDAO.updateAverageReaderRating(reades);
            String message = "Successfully Updated";

            return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);

        }

        @RequestMapping(value = "/dolike/{likeStatus}", method = RequestMethod.POST)
        public ResponseEntity<Void> updateLike(@PathVariable("likeStatus") Boolean likeStatus,@RequestBody Reades reades) {
            reades.setLike(likeStatus);
            articleDAO.updateReaderLikes(reades);
            articleDAO.updateReaderLikeCountsInArticle(reades);
            String message = "Successfully Updated";

            return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);

        }


        @RequestMapping(value = "/reades/{articleId}/{userID}", method = RequestMethod.GET)
        public ResponseEntity<Reades> getReadesDetails(@PathVariable("articleId") int articleId,
                                                       @PathVariable("userID") int userID) {

            Reades readesDetails = articleDAO.getReaderByReaderIDAndArticleID(articleId,userID);
            System.out.println("isLike : "+readesDetails.isLike());

            if (readesDetails==null) {
                return new ResponseEntity<Reades>(HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<Reades>(readesDetails, HttpStatus.OK);
        }

        @RequestMapping(value = "/getComments/{articleId}", method = RequestMethod.GET)
        public ResponseEntity<String> getReaderComments(@PathVariable("articleId") int articleId) {

            try{

                List<Comments> tempListOfComments = new ArrayList<>();
                List<Comments> listOfComments = commentsDAO.getReaderCommentsByArticleID(articleId);

                for(Comments comments : listOfComments){
                    User user = userDAO.findByID(comments.getUserID());
                    comments.setUser(user);
                    tempListOfComments.add(comments);
                }

                ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
                String jsonListOfComments= ow.writeValueAsString(tempListOfComments);

                if (tempListOfComments==null) {
                    return new ResponseEntity<String >(HttpStatus.NOT_FOUND);
                }

                return new ResponseEntity<String>(jsonListOfComments, HttpStatus.OK);

            }catch (Exception e){

            }

            return  null;
        }


    @RequestMapping(value = "/getAllComments", method = RequestMethod.GET)
    public ResponseEntity<String> getAllReaderComments() {

        try{

            List<Comments> tempListOfAllComments = new ArrayList<>();
            List<Comments> listOfComments = commentsDAO.getAllCommentsOrderByDateTime();

            for(Comments comments : listOfComments){
                User user = userDAO.findByID(comments.getUserID());
                comments.setUser(user);
                tempListOfAllComments.add(comments);
            }

            ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
            String jsonListOfALLComments= ow.writeValueAsString(tempListOfAllComments);

            if (tempListOfAllComments==null) {
                return new ResponseEntity<String >(HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<String>(jsonListOfALLComments, HttpStatus.OK);

        }catch (Exception e){

        }

        return  null;
    }

    @RequestMapping(value = "/comment", method = RequestMethod.POST)
    public ResponseEntity<String> doReaderComment(@RequestBody Comments comments){

         commentsDAO.saveUserComments(comments);

        return new ResponseEntity<String>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value = "/advertisementsorderbyprice", method = RequestMethod.GET)
    public ResponseEntity<List<Advertisement>> getAllAdvertisementsOrderByPrice(){

        List<Advertisement> advertisements = advertisementDAO.getAllAdvertisementsOrderByPrice();

        if (advertisements==null) {
            return new ResponseEntity<List<Advertisement> >(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<List<Advertisement>>(advertisements, HttpStatus.OK);
    }

    /*@RequestMapping(value = "/advertisementsorderbyprice/{categoryID}", method = RequestMethod.GET)
    public ResponseEntity<List<Advertisement>> getAllAdvertisementsOrderByPriceAndByCategryID(){

        List<Advertisement> advertisements = advertisementDAO.getAllAdvertisementsOrderByPrice();

        if (advertisements==null) {
            return new ResponseEntity<List<Advertisement> >(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<List<Advertisement>>(advertisements, HttpStatus.OK);
    }*/

    @RequestMapping(value = "/advertisementsByCategoryOrderByPrice/{categoryID}", method = RequestMethod.GET)
    public ResponseEntity<List<Advertisement>> getAllAdvertisementsByCategoryIDOrderByPrice(@PathVariable int categoryID){

        List<Advertisement> advertisements = advertisementDAO.getAllAdvertisementsByCategoryIDOrderByPrice(categoryID);

        if (advertisements==null) {
            return new ResponseEntity<List<Advertisement> >(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<List<Advertisement>>(advertisements, HttpStatus.OK);
    }



}
