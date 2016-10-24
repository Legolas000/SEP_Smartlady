package com.sliit.smartlady.controller;

import com.fasterxml.jackson.databind.util.JSONPObject;
import com.sliit.smartlady.model.User;
import com.sliit.smartlady.service.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Fazeel on 10/18/2016.
 */
@RestController
public class GuestRegisterController {
    @Autowired
    UserDAO userDAO;

    //---------------------------- Verify the login authentication ----------------------------------
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<String> doRegister(@RequestBody User user){
        String message = "";
        if(!userDAO.isUserExist(user)){
            userDAO.saveUserRegistration(user);
            System.out.println("1.isUserExist false");
        }
        else {
            return new ResponseEntity<String>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<String>(HttpStatus.NO_CONTENT);
    }
}
