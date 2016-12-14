package com.sliit.smartlady.controller.administrator;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sliit.smartlady.model.administrator.User;
import com.sliit.smartlady.service.administrator.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
public class UserController {
	
	@Autowired
    UserDAO userDAO;
	ServletContext context;

	//----------------------------Get All Users----------------------------------
	@RequestMapping(value = "admin/users/", method = RequestMethod.GET)
	public ResponseEntity<List<User>> listAllUsers(){
		List<User> users = userDAO.getAllUsers();
		 if(users.isEmpty()){
	            return new ResponseEntity<List<User>>(HttpStatus.NO_CONTENT);
	        }
	        return new ResponseEntity<List<User>>(users, HttpStatus.OK);
	}
	
	//----------------------------Get Specific Users----------------------------------
	@RequestMapping(value = "admin/users/{type}", method = RequestMethod.GET , produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<User>> listSpecUsers(@PathVariable("type") String type){
		List<User> users = userDAO.getSpecUsers(type);
		 if(users.isEmpty()){
	            return new ResponseEntity<List<User>>(HttpStatus.NO_CONTENT);
	        }
	        return new ResponseEntity<List<User>>(users, HttpStatus.OK);
	}
	
	//-----------------------Create new users----------------------------------------
		@RequestMapping(value = "admin/users/", method = RequestMethod.POST)
	    public ResponseEntity<Void> createUser(@RequestBody User user, UriComponentsBuilder ucBuilder) {
	        System.out.println("Creating User:- " + user.getFullname());
	 
	        //Check logic for updating existing entries.
//	        if (catDAO.isCategoryExist(category)) {
//	            System.out.println("A Category with name " + category.getcatName() + " already exist");
//	            return new ResponseEntity<Void>(HttpStatus.CONFLICT);
//	        }
	        
	        userDAO.SaveOrUpdate(user);
	 
	        HttpHeaders headers = new HttpHeaders();
	        headers.setLocation(ucBuilder.path("/user/{id}").buildAndExpand(user.getId()).toUri());
	        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
	    }
	//--------------------Update a User----------------------------------------------
	@RequestMapping(value = "admin/users/{id}", method = RequestMethod.PUT)
    public ResponseEntity<User> updateUser(@PathVariable("id") int id, @RequestBody User user) {
        System.out.println("Updating User " + id);
         
        User currentUser = userDAO.findByID(id);
         
        if (currentUser==null) {
            System.out.println("User with id " + id + " not found");
            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
        }
 	        
        currentUser.setAddress(user.getAddress());
        currentUser.setEmail(user.getEmail());
        currentUser.setFullname(user.getFullname());
        currentUser.setId(user.getId());
        currentUser.setImagePath(user.getImagePath());
        currentUser.setPassword(user.getPassword());
        currentUser.setUserdescription(user.getUserdescription());
        currentUser.setUserrole(3);	//Set user to administrator by default.
        
        userDAO.SaveOrUpdate(currentUser);
        return new ResponseEntity<User>(currentUser, HttpStatus.OK);
    }
		
	//--------------------Delete a User. For administrator Users.----------------
	@RequestMapping(value = "admin/users/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<User> deleteUser(@PathVariable("id") int id) {
        System.out.println("Fetching & Deleting User with id " + id);
 
        User user = userDAO.findByID(id);
        if (user == null) {
            System.out.println("Unable to delete. User with id " + id + " not found");
            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
        }
 
        userDAO.delete(id);
        return new ResponseEntity<User>(HttpStatus.NO_CONTENT);
    }
	
	//--------------------Save image for the user.----------------
	@RequestMapping(value = "im/users/saveUserDataAndFile", method = RequestMethod.POST)
	@ResponseBody
	public Object saveUserDataAndFile(@RequestParam(value = "file") MultipartFile file, HttpServletRequest request) {
		ObjectMapper mapper = new ObjectMapper();

		//String uploadPath = context.getRealPath("");


		String uploadDirectory =  "E:\\Images\\";   //"F:\\testUpload\\";
		String rootDirectory =  "/static/AdminFiles/images/";
		System.out.println("Root Directory "+rootDirectory);
		try {
			file.transferTo(new File(uploadDirectory  + file.getOriginalFilename()));
		} catch (IllegalStateException e) {

			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		String fname = file.getOriginalFilename();
		String fullFileName = uploadDirectory+fname;
		System.out.println("File name is :  " + fullFileName);
		userDAO.SaveImage(fullFileName);
		//advDAO.saveImage(fullFileName);
		return null;
	}
	
}
