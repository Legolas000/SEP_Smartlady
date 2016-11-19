package com.sliit.smartlady.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sliit.smartlady.model.AdPayment;
import com.sliit.smartlady.model.Advertisement;
import com.sliit.smartlady.model.Category;
import com.sliit.smartlady.model.fileUpload;
import com.sliit.smartlady.service.AdPaymentDAO;
import com.sliit.smartlady.service.AdvertisementDAO;
import com.sliit.smartlady.service.CategoryDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
public class AdvertisementController {

	@Autowired
    AdvertisementDAO advDAO;
	@Autowired
	CategoryDAO catDAO;
    @Autowired
    AdPaymentDAO adpayDAO;

	//----------------------------Get All Advertise----------------------------------
	@RequestMapping(value = "/advertisements/", method = RequestMethod.GET)
	public ResponseEntity<List<Advertisement>> listAllAdvertises(){
		List<Advertisement> advertise = advDAO.getAllAdvertisements();
		 if(advertise.isEmpty()){
	            return new ResponseEntity<List<Advertisement>>(HttpStatus.NO_CONTENT);
	        }
	        return new ResponseEntity<List<Advertisement>>(advertise, HttpStatus.OK);
	}

	//--------------------Fetch a selected advertise by id------------------------------
	@RequestMapping(value = "/getSelectedAdvertise/{id}", method = RequestMethod.GET)
	public ResponseEntity<Advertisement> getSelectedAdvertise(@PathVariable("id") int id) {
		Advertisement currentAdvertisement = advDAO.findByID(id);
		if (currentAdvertisement==null) {
			return new ResponseEntity<Advertisement>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Advertisement>(currentAdvertisement, HttpStatus.OK);
	}

	//--------------------Update a status of an advertise------------------------------
	@RequestMapping(value = "/advertisements/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Advertisement> updateStatus(@PathVariable("id") int id) {
		Advertisement currentAdvertisement = advDAO.findByID(id);
		if (currentAdvertisement==null) {
			return new ResponseEntity<Advertisement>(HttpStatus.NOT_FOUND);
		}
		advDAO.updateApproval(currentAdvertisement);
		return new ResponseEntity<Advertisement>(currentAdvertisement, HttpStatus.OK);
	}

    //--------------------Create New Advertise----------------------------------
	@RequestMapping(value = "/assignadvertise/advertise/", method = RequestMethod.POST)
	public ResponseEntity<String> createAdvertise(@RequestBody Advertisement advertisement) {
		advDAO.SaveOrUpdate(advertisement);
		return new ResponseEntity<String>(HttpStatus.OK);
	}

	//--------------------Update New Advertise------------------------------------------------
	@RequestMapping(value = "/updateAdvertise", method = RequestMethod.PUT)
	public ResponseEntity<Advertisement> updateAdvertisement(@RequestBody Advertisement advertise) {
		if (advertise==null) {
			return new ResponseEntity<Advertisement>(HttpStatus.NOT_FOUND);
		}
		advDAO.SaveOrUpdate(advertise);
		return new ResponseEntity<Advertisement>(advertise, HttpStatus.OK);
	}

	/*@RequestMapping(value = "/assignadvertise/advertise/", method = RequestMethod.POST)
	public ResponseEntity<String> createAdvertise(@RequestParam(value = "file") MultipartFile file, @RequestBody Advertisement advertisement) {
		System.out.println("create advrts calling in java!");

		String uploadDirectory = "C:\\Users\\USER\\Desktop\\GIT Local Repo\\sepii\\SEP_Smartlady\\src\\main\\webapp\\static\\js\\template\\advertiser-template\\advertises\\";   //"F:\\testUpload\\";
		String rootDirectory = "/static/js/template/advertiser-template/advertises/";
		System.out.println("Root Directory "+rootDirectory);

		//MultipartFile file1 = advertisement.getImagePath();
		try {
			file.transferTo(new File(uploadDirectory  + file.getOriginalFilename()));
		} catch (IllegalStateException e) {

			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		String fname = file.getOriginalFilename();
		String fullFileName = rootDirectory+fname;
		System.out.println("File name is :  " + fullFileName);

		advertisement.setImagePath(fullFileName);
		//advDAO.saveImage(fullFileNam);
		advDAO.SaveOrUpdate(advertisement);
		String mesg = "test creating";
		return new ResponseEntity<String>(HttpStatus.OK);


	}*/

	@RequestMapping(value = "/user/saveUserDataAndFile", method = RequestMethod.POST)
	@ResponseBody
	public Object saveUserDataAndFile(@RequestParam(value = "file") MultipartFile file, HttpServletRequest request) {
		ObjectMapper mapper = new ObjectMapper();

		String uploadDirectory = "C:\\Users\\USER\\Desktop\\GIT Local Repo\\sepii\\SEP_Smartlady\\src\\main\\webapp\\static\\js\\template\\advertiser-template\\advertises\\";   //"F:\\testUpload\\";
		String rootDirectory = "/static/js/template/advertiser-template/advertises/";
		System.out.println("Root Directory "+rootDirectory);
		try {
			file.transferTo(new File(uploadDirectory  + file.getOriginalFilename()));
		} catch (IllegalStateException e) {

			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		String fname = file.getOriginalFilename();
		String fullFileName = rootDirectory+fname;
		System.out.println("File name is :  " + fullFileName);
		advDAO.saveImage(fullFileName);
		return null;
	}
	//fetch all Categories
	/*@RequestMapping(value = "/categories/", method = RequestMethod.GET)
	public ResponseEntity<List<Category>> listAllCategories(){
		System.out.println("GET category method is calling in java");
		List<Category> category = catDAO.getAllCategories();
		System.out.println("data is : " + category);
		if(category.isEmpty()){
			return new ResponseEntity<List<Category>>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Category>>(category, HttpStatus.OK);
	}*/

    @RequestMapping(value = "/getPayments/", method = RequestMethod.GET)
    public ResponseEntity<List<AdPayment>> listAllPayments(){
        List<AdPayment> payment = adpayDAO.getAllPayments();
        if(payment.isEmpty()){
            return new ResponseEntity<List<AdPayment>>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<List<AdPayment>>(payment, HttpStatus.OK);
    }

}
