package com.sliit.smartlady.controller.writer;

import com.sliit.smartlady.model.Article;
import com.sliit.smartlady.model.Category;
import com.sliit.smartlady.service.ArticleDAO;
import com.sliit.smartlady.service.CategoryDAO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServlet;

import java.util.List;


/**
 * Created by Nibras on 11-Oct-16.
 */

@RestController
public class WriterController extends HttpServlet{

   // public String UPLOAD_DIRECTORY = "C:/Users/mohamed/Desktop/uploadFile";

    @Autowired
    CategoryDAO categoryDAO;

    @Autowired
    ArticleDAO articleDAO;

    //fetch all categories
    @RequestMapping(value = "/categories/", method = RequestMethod.GET)
    public ResponseEntity<List<Category>> listAllCetogories(){
        List<Category> category = categoryDAO.getAllCategories();
        if(category.isEmpty()){
            return new ResponseEntity<List<Category>>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<List<Category>>(category, HttpStatus.OK);
    }

    //create Article
   /* @RequestMapping(value = "/createArticle/", method = RequestMethod.POST)
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public ResponseEntity<Void> createNewArticle(@FormDataParam("file") InputStream uploadedInputStream
                                                 *//*,@FormDataParam("file") FormDataContentDisposition fileDetails*//*){

        System.out.println("came to java");
       // System.out.println(article.getTitle());

        String imageUploadLocation = "C:/Users/mohamed/Desktop/uploadFile/abc.jpg";
        Boolean status = articleDAO.createArticle(uploadedInputStream,imageUploadLocation);
        if(status){
            return new ResponseEntity<Void>(HttpStatus.OK);
        }else{
            return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
        }

    }*/

    //fetch all articles
    @RequestMapping(value = "/getAllArticles/{writerId}", method = RequestMethod.GET)
    public ResponseEntity<List<Article>>getAllArticles(@PathVariable("writerId") int writerId){
        List<Article> articles = articleDAO.getArticlesByWriterId(writerId);
        if(articles.isEmpty()){
            return new ResponseEntity<List<Article>>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<List<Article>>(articles, HttpStatus.OK);
    }

    //fetch filter articles
    @RequestMapping(value = "/filterArticles/{writerId}/{status}", method = RequestMethod.GET)
    public ResponseEntity<List<Article>>getFilterArticles(@PathVariable("writerId") int writerId, @PathVariable("status") int status){
        System.out.println("filter articles called");
        List<Article> articles = articleDAO.getFilterArticles(writerId,status);
        if(articles.isEmpty()){
            return new ResponseEntity<List<Article>>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<List<Article>>(articles, HttpStatus.OK);
    }




}
