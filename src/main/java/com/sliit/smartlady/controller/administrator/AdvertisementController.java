package com.sliit.smartlady.controller.administrator;

import com.sliit.smartlady.model.Advertisement;
import com.sliit.smartlady.service.AdvertisementDAO;

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
public class AdvertisementController {

	@Autowired
	AdvertisementDAO advDAO;
	
	//----------------------------Get All Articles----------------------------------
	@RequestMapping(value = "/advertisements/", method = RequestMethod.GET)
	public ResponseEntity<List<Advertisement>> listAllArticles(){
		List<Advertisement> articles = advDAO.getAllAdvertisements();
		 if(articles.isEmpty()){
	            return new ResponseEntity<List<Advertisement>>(HttpStatus.NO_CONTENT);
	        }
	        return new ResponseEntity<List<Advertisement>>(articles, HttpStatus.OK);
	}
			
			
	//--------------------Update a status of an article------------------------------
	@RequestMapping(value = "/advertisements/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Advertisement> updateStatus(@PathVariable("id") int id) {
        System.out.println("Updating advertisement " + id);
         
        Advertisement currentAdvertisement = advDAO.findByID(id);
         
        if (currentAdvertisement==null) {
            System.out.println("Advertisement with id " + id + " not found");
            return new ResponseEntity<Advertisement>(HttpStatus.NOT_FOUND);
        }
          
        advDAO.updateApproval(currentAdvertisement);
        return new ResponseEntity<Advertisement>(currentAdvertisement, HttpStatus.OK);
    }	
}
