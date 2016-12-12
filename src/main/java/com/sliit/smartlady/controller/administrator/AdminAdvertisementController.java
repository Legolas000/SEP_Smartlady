package com.sliit.smartlady.controller.administrator;

import com.sliit.smartlady.model.administrator.Advertisement;
import com.sliit.smartlady.service.administrator.AdvertisementDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AdminAdvertisementController {

	@Autowired
	AdvertisementDAO advDAO;
	
	//----------------------------Get All Advertisements----------------------------------
	@RequestMapping(value = "admin/advertisements/", method = RequestMethod.GET)
	public ResponseEntity<List<Advertisement>> listAllAdvertisements(){
		List<Advertisement> articles = advDAO.getAllAdvertisements();
		 if(articles.isEmpty()){
	            return new ResponseEntity<List<Advertisement>>(HttpStatus.NO_CONTENT);
	        }
	        return new ResponseEntity<List<Advertisement>>(articles, HttpStatus.OK);
	}
	
	
	//----------------------------Get filtered advertisements----------------------------------
	@RequestMapping(value = "admin/advertisements/{status}", method = RequestMethod.GET)	//1-approved , 0- Not-Yet approved
	public ResponseEntity<List<Advertisement>> listFilteredAdvertisements(@PathVariable("status") int status){
		List<Advertisement> articles = advDAO.getFilteredAllAdvertisements(status);
		 if(articles.isEmpty()){
	            return new ResponseEntity<List<Advertisement>>(HttpStatus.NO_CONTENT);
	        }
	        return new ResponseEntity<List<Advertisement>>(articles, HttpStatus.OK);
	}
			
			
	//--------------------Update a status of an article------------------------------
	@RequestMapping(value = "admin/advertisements/appr/{id}", method = RequestMethod.DELETE)
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
	
	//--------------------Reject a status of an article------------------------------
	@RequestMapping(value = "admin/advertisements/rej/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Advertisement> rejectStatus(@PathVariable("id") int id) {
        System.out.println("Updating advertisement " + id);
         
        Advertisement currentAdvertisement = advDAO.findByID(id);
         
        if (currentAdvertisement==null) {
            System.out.println("Advertisement with id " + id + " not found");
            return new ResponseEntity<Advertisement>(HttpStatus.NOT_FOUND);
        }
          
        advDAO.rejectApproval(currentAdvertisement);
        return new ResponseEntity<Advertisement>(currentAdvertisement, HttpStatus.OK);
    }	
}
