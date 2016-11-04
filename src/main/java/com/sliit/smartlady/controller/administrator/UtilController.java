package com.sliit.smartlady.controller.administrator;

import java.util.List;

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

import com.sliit.smartlady.model.Article;
import com.sliit.smartlady.util.SendMail;

@RestController
public class UtilController {

	//----------------------------Send subscription mails----------------------------------
		@RequestMapping(value = "/sendmail/", method = RequestMethod.GET)
		public ResponseEntity<String> sendMailTLS(){
			SendMail sm = new SendMail();
			if(sm.SendTLSMail()){
		        return new ResponseEntity<String>("The subscription mail has been successfully sent",HttpStatus.OK);
	        }else{
		        return new ResponseEntity<String>("There has been an error. Please try again after some time",HttpStatus.SERVICE_UNAVAILABLE);
	        }
		}
		
}
