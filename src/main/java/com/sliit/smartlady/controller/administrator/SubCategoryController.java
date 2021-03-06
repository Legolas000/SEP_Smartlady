package com.sliit.smartlady.controller.administrator;

import com.sliit.smartlady.model.administrator.Category;
import com.sliit.smartlady.model.administrator.SubCategory;
import com.sliit.smartlady.service.administrator.SubCategoryDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RestController
public class SubCategoryController {

	@Autowired
	SubCategoryDAO subCatDAO;
	
		//----------------------------Get All SubCategories----------------------------------
		@RequestMapping(value = "admin/subcategories/", method = RequestMethod.GET)
		public ResponseEntity<List<SubCategory>> listAllSubCategories(){
			List<SubCategory> subcategories = subCatDAO.getAllSubCategories();
			 if(subcategories.isEmpty()){
		            return new ResponseEntity<List<SubCategory>>(HttpStatus.NO_CONTENT);
		        }
		        return new ResponseEntity<List<SubCategory>>(subcategories, HttpStatus.OK);
		}
		
		//----------------------------Get All SubCategories----------------------------------
		@RequestMapping(value = "admin/subcategories/sub/{id}", method = RequestMethod.GET)
		public ResponseEntity<List<SubCategory>> listFilteredSubCategories(@PathVariable("id") int id){
			List<SubCategory> subcategories = subCatDAO.getFilteredSubCategories(id);
			 if(subcategories.isEmpty()){
		            return new ResponseEntity<List<SubCategory>>(HttpStatus.NO_CONTENT);
		        }
		        return new ResponseEntity<List<SubCategory>>(subcategories, HttpStatus.OK);
		}
		
		//----------------------------Get All existing Categories----------------------------------
		@RequestMapping(value = "admin/subcategories/exist/", method = RequestMethod.GET)
		public ResponseEntity<List<Category>> getExistCats(){
			List<Category> categories = subCatDAO.getExistCategories();
			 if(categories.isEmpty()){
		            return new ResponseEntity<List<Category>>(HttpStatus.NO_CONTENT);
		        }
		        return new ResponseEntity<List<Category>>(categories, HttpStatus.OK);
		}
		
		//---------------------------Get specific subcategory--------------------------------
		@RequestMapping(value = "admin/subcategories/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	    public ResponseEntity<SubCategory> getUser(@PathVariable("id") int id) {
	        System.out.println("Fetching SubCategory with id " + id);
	        SubCategory subcategory = subCatDAO.findByID(id);
	        if (subcategory == null) {
	            System.out.println("SubCategory with id " + id + " not found");
	            return new ResponseEntity<SubCategory>(HttpStatus.NOT_FOUND);
	        }
	        return new ResponseEntity<SubCategory>(subcategory, HttpStatus.OK);
	    }
		
		
		//-----------------------Create new sub category----------------------------------------
		@RequestMapping(value = "admin/subcategories/", method = RequestMethod.POST)
	    public ResponseEntity<Void> createSubCategory(@RequestBody SubCategory subcategory, UriComponentsBuilder ucBuilder) {
	        System.out.println("Creating SubCategory:- " + subcategory.getsubCatName());
	 
	        //Check logic for updating existing entries.
	        if (subCatDAO.isSubCategoryExist(subcategory)) {
	            System.out.println("A Sub-Category with name " + subcategory.getsubCatName() + " already exist");
	            return new ResponseEntity<Void>(HttpStatus.CONFLICT);
	        }
	        
	        subCatDAO.SaveOrUpdate(subcategory);
	 
	        HttpHeaders headers = new HttpHeaders();
	        headers.setLocation(ucBuilder.path("/subcategories/{id}").buildAndExpand(subcategory.getID()).toUri());
	        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
	    }

		//--------------------Update a sub category----------------------------------------------
		@RequestMapping(value = "admin/subcategories/{id}", method = RequestMethod.PUT)
	    public ResponseEntity<SubCategory> updateSubCategory(@PathVariable("id") int id, @RequestBody SubCategory subcategory) {
	        System.out.println("Updating User " + id);
	         
	        SubCategory currentSubCategory = subCatDAO.findByID(id);
	         
	        if (currentSubCategory==null) {
	            System.out.println("SubCategory with id " + id + " not found");
	            return new ResponseEntity<SubCategory>(HttpStatus.NOT_FOUND);
	        }
	 
	        currentSubCategory.setsubCatName(subcategory.getsubCatName());
	        currentSubCategory.setsubCatDescription(subcategory.getsubCatDescription());
	         
	        subCatDAO.SaveOrUpdate(currentSubCategory);
	        return new ResponseEntity<SubCategory>(currentSubCategory, HttpStatus.OK);
	    }	

		//--------------------Delete a sub category----------------------------------------------
		@RequestMapping(value = "admin/subcategories/{id}", method = RequestMethod.DELETE)
	    public ResponseEntity<SubCategory> deleteSubCategory(@PathVariable("id") int id) {
	        System.out.println("Fetching & Deleting SubCategory with id " + id);
	 
	        SubCategory subcategory = subCatDAO.findByID(id);
	        if (subcategory == null) {
	            System.out.println("Unable to delete. Sub Category with id " + id + " not found");
	            return new ResponseEntity<SubCategory>(HttpStatus.NOT_FOUND);
	        }
	 
	        subCatDAO.delete(id);
	        return new ResponseEntity<SubCategory>(HttpStatus.NO_CONTENT);
	    }
}
