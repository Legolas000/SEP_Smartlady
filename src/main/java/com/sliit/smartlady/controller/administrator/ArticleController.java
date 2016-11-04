package com.sliit.smartlady.controller.administrator;

import com.sliit.smartlady.model.Article;
import com.sliit.smartlady.model.Category;
import com.sliit.smartlady.service.ArticleDAO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RestController
public class ArticleController {

	@Autowired
	ArticleDAO artDAO;
	
	//----------------------------Get All Articles----------------------------------
	@RequestMapping(value = "/articles/", method = RequestMethod.GET)
	public ResponseEntity<List<Article>> listAllArticles(){
		List<Article> articles = artDAO.getAllArticles();
		 if(articles.isEmpty()){
	            return new ResponseEntity<List<Article>>(HttpStatus.NO_CONTENT);
	        }
	        return new ResponseEntity<List<Article>>(articles, HttpStatus.OK);
	}
		
		
	//--------------------Update a status of an article------------------------------
	@RequestMapping(value = "/articles/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Article> updateStatus(@PathVariable("id") int id) {
        System.out.println("Updating article " + id);
         
        Article currentArticle = artDAO.findByID(id);
         
        if (currentArticle==null) {
            System.out.println("Article with id " + id + " not found");
            return new ResponseEntity<Article>(HttpStatus.NOT_FOUND);
        }
          
        artDAO.updateStatus(currentArticle);
        return new ResponseEntity<Article>(currentArticle, HttpStatus.OK);
    }	
}
