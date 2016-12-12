package com.sliit.smartlady.controller.administrator;

import com.sliit.smartlady.model.administrator.User;
import com.sliit.smartlady.service.administrator.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AdminLoginController {

	@Autowired
    UserDAO userDAO;
	 //---------------------------- Verify the login authentication ----------------------------------
    @RequestMapping(value = "admin/login", method = RequestMethod.POST)
    public ResponseEntity<User> loginAuth(@RequestBody User user){
        List<User> users = userDAO.getAllUsers();
        for(User u : users){
            System.out.println("Full name : "+u.getFullname());
        }
        User userDto = userDAO.findByEmailPassword(user.getEmail(),user.getPassword());
        if(userDto == null){
        	System.out.println("This user does not exist");
            return new ResponseEntity<User>(HttpStatus.UNAUTHORIZED);
            
        }
        return new ResponseEntity<User>(userDto, HttpStatus.OK);
    }
}
