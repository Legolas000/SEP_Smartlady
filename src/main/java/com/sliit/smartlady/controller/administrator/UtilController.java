package com.sliit.smartlady.controller.administrator;

import com.sliit.smartlady.service.administrator.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class UtilController {
	@Autowired
	UserDAO userDAO;

	//----------------------------Send subscription mails----------------------------------
//	@RequestMapping(value = "/sendmail/", method = RequestMethod.GET)
//	public ResponseEntity<String> sendMailTLS(){
//		SendMail sm = new SendMail();
//		if(sm.SendTLSMail()){
//	        return new ResponseEntity<String>("The subscription mail has been successfully sent",HttpStatus.OK);
//        }else{
//	        return new ResponseEntity<String>("There has been an error. Please try again after some time",HttpStatus.SERVICE_UNAVAILABLE);
//        }
//	}
		
	//----------------------------Send subscription mails----------------------------------
	@RequestMapping(value = "admin/smail/", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Map> sendSubsMail(){
		Map<String,String> result = new HashMap<String,String>();
		
		 if(userDAO.sendSubsMail()){
			 result.put("result", "The subscription mail has been successfully sent");
			 return new ResponseEntity<Map>(result,HttpStatus.OK);
	        }
		 result.put("result", "There has been an error. Please try again after some time. Reasons for Error:- \n1)No articles available\n2)An error occured while connecting to the db");
		 return new ResponseEntity<Map>(result,HttpStatus.SERVICE_UNAVAILABLE);
	}
		
}
