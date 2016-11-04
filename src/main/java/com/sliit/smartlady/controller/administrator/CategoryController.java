package com.sliit.smartlady.controller.administrator;

import com.sliit.smartlady.model.Category;
import com.sliit.smartlady.service.CategoryDAO;

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
public class CategoryController {

	@Autowired
	CategoryDAO catDAO;
	
	//----------------------------Get All Categories----------------------------------
	@RequestMapping(value = "/categories/", method = RequestMethod.GET)
	public ResponseEntity<List<Category>> listAllCategories(){
		List<Category> categories = catDAO.getAllCategories();
		 if(categories.isEmpty()){
	            return new ResponseEntity<List<Category>>(HttpStatus.NO_CONTENT);
	        }
	        return new ResponseEntity<List<Category>>(categories, HttpStatus.OK);
	}
	
	//---------------------------Get specific category--------------------------------
	@RequestMapping(value = "/categories/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Category> getUser(@PathVariable("id") int id) {
        System.out.println("Fetching Category with id " + id);
        Category category = catDAO.findByID(id);
        if (category == null) {
            System.out.println("Category with id " + id + " not found");
            return new ResponseEntity<Category>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Category>(category, HttpStatus.OK);
    }
	
	
	//-----------------------Create new category----------------------------------------
	@RequestMapping(value = "/categories/", method = RequestMethod.POST)
    public ResponseEntity<Void> createCategory(@RequestBody Category category, UriComponentsBuilder ucBuilder) {
        System.out.println("Creating Category:- " + category.getcatName());
 
        //Check logic for updating existing entries.
//        if (catDAO.isCategoryExist(category)) {
//            System.out.println("A Category with name " + category.getcatName() + " already exist");
//            return new ResponseEntity<Void>(HttpStatus.CONFLICT);
//        }
        
        catDAO.SaveOrUpdate(category);
 
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(ucBuilder.path("/category/{id}").buildAndExpand(category.getID()).toUri());
        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
    }

	//--------------------Update a category----------------------------------------------
	@RequestMapping(value = "/categories/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Category> updateCategory(@PathVariable("id") int id, @RequestBody Category category) {
        System.out.println("Updating Category " + id);
         
        Category currentCategory = catDAO.findByID(id);
         
        if (currentCategory==null) {
            System.out.println("Category with id " + id + " not found");
            return new ResponseEntity<Category>(HttpStatus.NOT_FOUND);
        }
 
        currentCategory.setcatName(category.getcatName());
        currentCategory.setcatDescription(category.getcatDescription());
         
        catDAO.SaveOrUpdate(currentCategory);
        return new ResponseEntity<Category>(currentCategory, HttpStatus.OK);
    }	

	//--------------------Delete a category----------------------------------------------
	@RequestMapping(value = "/categories/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Category> deleteCategory(@PathVariable("id") int id) {
        System.out.println("Fetching & Deleting Category with id " + id);
 
        Category category = catDAO.findByID(id);
        if (category == null) {
            System.out.println("Unable to delete. ADPayment with id " + id + " not found");
            return new ResponseEntity<Category>(HttpStatus.NOT_FOUND);
        }
 
        catDAO.delete(id);
        return new ResponseEntity<Category>(HttpStatus.NO_CONTENT);
    }
}
