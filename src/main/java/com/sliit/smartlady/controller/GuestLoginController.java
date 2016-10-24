package com.sliit.smartlady.controller;

import com.sliit.smartlady.model.Article;
import com.sliit.smartlady.model.User;
import com.sliit.smartlady.service.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by Fazeel on 10/15/2016.
 */
@RestController
public class GuestLoginController {
    @Autowired
    UserDAO userDAO;

    //---------------------------- Verify the login authentication ----------------------------------
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<User> loginAuth(@RequestBody User user){
        System.out.println("User's email : " + user.getEmail());
        List<User> users = userDAO.getAllUsers();
        for(User u : users){
            System.out.println("Full name : "+u.getFullname());
        }
        User userDto = userDAO.findByEmailPassword(user.getEmail(),user.getPassword());
        System.out.println("getFullname : "+userDto.getFullname());
        if(userDto == null){
            return new ResponseEntity<User>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<User>(userDto, HttpStatus.OK);
    }

}
