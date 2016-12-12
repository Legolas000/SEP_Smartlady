package com.sliit.smartlady.controller.administrator;

import com.sliit.smartlady.model.administrator.ADPayment;
import com.sliit.smartlady.service.administrator.ADPaymentDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RestController
public class ADPaymentController {

	@Autowired
	ADPaymentDAO adpDAO;
	
	//----------------------------Get All ADPayments----------------------------------
	@RequestMapping(value = "admin/adpayments/", method = RequestMethod.GET)
	public ResponseEntity<List<ADPayment>> listAllArticles(){
		List<ADPayment> adpayments = adpDAO.getAllADPayments();
		 if(adpayments.isEmpty()){
	            return new ResponseEntity<List<ADPayment>>(HttpStatus.NO_CONTENT);
	        }
	        return new ResponseEntity<List<ADPayment>>(adpayments, HttpStatus.OK);
	}
		
		
	//---------------------------Get specific ADPayment--------------------------------
	@RequestMapping(value = "admin/adpayments/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ADPayment> getADPayment(@PathVariable("id") int id) {
        System.out.println("Fetching ADPayment with id " + id);
        ADPayment adpayment = adpDAO.findByID(id);
        if (adpayment == null) {
            System.out.println("ADPayment with id " + id + " not found");
            return new ResponseEntity<ADPayment>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<ADPayment>(adpayment, HttpStatus.OK);
    }
	
	
	//-----------------------Create new ADPayment----------------------------------------
		@RequestMapping(value = "admin/adpayments/", method = RequestMethod.POST)
	    public ResponseEntity<Void> createADPayment(@RequestBody ADPayment adpayment, UriComponentsBuilder ucBuilder) {
	        System.out.println("Creating ADPayment:- " + adpayment.getpaymentPlans());
	 
	        //Check logic for updating existing entries.
//	        if (catDAO.isCategoryExist(category)) {
//	            System.out.println("A Category with name " + category.getcatName() + " already exist");
//	            return new ResponseEntity<Void>(HttpStatus.CONFLICT);
//	        }
	        
	        adpDAO.SaveOrUpdate(adpayment);
	 
	        HttpHeaders headers = new HttpHeaders();
	        headers.setLocation(ucBuilder.path("admin/adpayment/{id}").buildAndExpand(adpayment.getID()).toUri());
	        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
	    }
		
	//--------------------Update a category----------------------------------------------
	@RequestMapping(value = "admin/adpayments/{id}", method = RequestMethod.PUT)
    public ResponseEntity<ADPayment> updateADPayment(@PathVariable("id") int id, @RequestBody ADPayment adpayment) {
        System.out.println("Updating ADPayment " + id);
         
        ADPayment currentADPayment = adpDAO.findByID(id);
         
        if (currentADPayment==null) {
            System.out.println("ADPayment with id " + id + " not found");
            return new ResponseEntity<ADPayment>(HttpStatus.NOT_FOUND);
        }
        
        currentADPayment.setID(adpayment.getID());
        currentADPayment.setpagePlacements(adpayment.getpagePlacements());
        currentADPayment.setpaymentPlans(adpayment.getpaymentPlans());
        currentADPayment.setAmount(adpayment.getAmount());
         
        adpDAO.SaveOrUpdate(currentADPayment);
        return new ResponseEntity<ADPayment>(currentADPayment, HttpStatus.OK);
    }	
	
	//--------------------Delete a category----------------------------------------------
	@RequestMapping(value = "admin/adpayments/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<ADPayment> deleteADPayment(@PathVariable("id") int id) {
        System.out.println("Fetching & Deleting ADPayment with id " + id);
 
        ADPayment adpayment = adpDAO.findByID(id);
        if (adpayment == null) {
            System.out.println("Unable to delete. ADPayment with id " + id + " not found");
            return new ResponseEntity<ADPayment>(HttpStatus.NOT_FOUND);
        }
 
        adpDAO.delete(id);
        return new ResponseEntity<ADPayment>(HttpStatus.NO_CONTENT);
    }
}
