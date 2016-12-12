package com.sliit.smartlady.controller.writer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sliit.smartlady.model.Article;
import com.sliit.smartlady.model.Category;
import com.sliit.smartlady.model.Comments;
import com.sliit.smartlady.service.ArticleDAO;
import com.sliit.smartlady.service.CategoryDAO;

import com.sliit.smartlady.service.CommentsDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;

import java.io.File;
import java.io.IOException;
import java.util.List;


/**
 * Created by Nibras on 11-Oct-16.
 */

@RestController
public class WriterController extends HttpServlet{

    @Autowired
    CategoryDAO categoryDAO;

    @Autowired
    ArticleDAO articleDAO;

    @Autowired
    CommentsDAO commentsDAO;

    //fetch all categories
    @RequestMapping(value = "/categories/", method = RequestMethod.GET)
    public ResponseEntity<List<Category>> listAllCetogories(){
        List<Category> category = categoryDAO.getAllCategories();
        if(category.isEmpty()){
            return new ResponseEntity<List<Category>>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<List<Category>>(category, HttpStatus.OK);
    }

     //create new article
    @RequestMapping(value = "/createArticle/", method = RequestMethod.POST)
    public ResponseEntity<Void> createNewArticle(@RequestBody Article article){

        articleDAO.createNewArticle(article);
        return new ResponseEntity<Void>(HttpStatus.OK);

    }

    @RequestMapping(value = "/uploadImage/", method = RequestMethod.POST)
    @ResponseBody
    public Object saveUserDataAndFile(@RequestParam(value = "file") MultipartFile file, HttpServletRequest request) {
        ObjectMapper mapper = new ObjectMapper();

        String uploadDirectory = "E:\\01.SLIIT\\3rd Year\\2nd Semester\\SEP II\\Project\\uploadFile";   //"F:\\testUpload\\";

        String rootDirectory = "/static/images/";
        try {
            file.transferTo(new File(uploadDirectory  + file.getOriginalFilename()));
        } catch (IllegalStateException e) {

            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        String fname = file.getOriginalFilename();
        String fullFileName = rootDirectory+fname;
        System.out.println("File name is :  " + fullFileName);
        articleDAO.uploadImage(fullFileName);
        return null;
    }




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
        List<Article> articles = articleDAO.getFilterArticles(writerId,status);
        if(articles.isEmpty()){
            return new ResponseEntity<List<Article>>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<List<Article>>(articles, HttpStatus.OK);
    }

    //delete an article
    @RequestMapping(value = "/deleteArticle/{articleId}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> deleteArticle(@PathVariable("articleId") int articleId){
        articleDAO.deleteArticle(articleId);
        System.out.println("Article id "+articleId+" deleted success");
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    //fetchAllComments
    @RequestMapping(value = "/getCommentsWriter/{articleId}", method = RequestMethod.GET)
    public ResponseEntity<List<Comments>>getAllCommentsbyArticle(@PathVariable("articleId") int articleId){
        List<Comments> comments = commentsDAO.getAllCommentsByArticle(articleId);
        if(comments.isEmpty()){
            return new ResponseEntity<List<Comments>>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<List<Comments>>(comments, HttpStatus.OK);
    }

    //fetchArticleById
    @RequestMapping(value = "/fetchArticleById/{articleId}", method = RequestMethod.GET)
    public ResponseEntity<Article>fetchArticleById(@PathVariable("articleId") int articleId){
        Article article = articleDAO.findByID(articleId);
        if(article.getId() == articleId){
            return new ResponseEntity<Article>(article, HttpStatus.OK);
        }else{
            return new ResponseEntity<Article>(article, HttpStatus.NO_CONTENT);
        }
    }



}
