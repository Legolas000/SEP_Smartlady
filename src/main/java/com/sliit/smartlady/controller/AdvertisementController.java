package com.sliit.smartlady.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sliit.smartlady.model.Advertisement;
import com.sliit.smartlady.model.fileUpload;
import com.sliit.smartlady.service.AdvertisementDAO;
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
	
	//----------------------------Get All Advertise----------------------------------
	@RequestMapping(value = "/advertisements/", method = RequestMethod.GET)
	public ResponseEntity<List<Advertisement>> listAllArticles(){
		List<Advertisement> advertise = advDAO.getAllAdvertisements();
		 if(advertise.isEmpty()){
	            return new ResponseEntity<List<Advertisement>>(HttpStatus.NO_CONTENT);
	        }
	        return new ResponseEntity<List<Advertisement>>(advertise, HttpStatus.OK);
	}
			
			
	//--------------------Update a status of an article------------------------------
	@RequestMapping(value = "/advertisements/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Advertisement> updateStatus(@PathVariable("id") int id) {

        Advertisement currentAdvertisement = advDAO.findByID(id);
         
        if (currentAdvertisement==null) {
            System.out.println("Advertisement with id " + id + " not found");
            return new ResponseEntity<Advertisement>(HttpStatus.NOT_FOUND);
        }
          
        advDAO.updateApproval(currentAdvertisement);
        return new ResponseEntity<Advertisement>(currentAdvertisement, HttpStatus.OK);
    }

    //--------------------Create New Advertise----------------------------------
	@RequestMapping(value = "/assignadvertise/advertise/", method = RequestMethod.POST)
	public ResponseEntity<String> createAdvertise(@RequestBody Advertisement advertisement) {
		advDAO.SaveOrUpdate(advertisement);
		String mesg = "test creating";
		return new ResponseEntity<String>(mesg, HttpStatus.OK);
	}

    @RequestMapping(value = "/upload", method = RequestMethod.GET)
    public String crunchifyDisplayForm() {

        return "uploadfile";
    }

	@RequestMapping(value = "/savefiles", method = RequestMethod.POST)
	public String crunchifySave(
			@ModelAttribute("uploadForm") fileUpload uploadForm,
			Model map) throws IllegalStateException, IOException {
			    System.out.println("Upload funtion is calling");
		String saveDirectory = "c:/crunchify/";
        System.out.println(" saving folder is calling ");

		List<MultipartFile> crunchifyFiles = uploadForm.getFiles();
        System.out.println(" file is :  " + crunchifyFiles);
		List<String> fileNames = new ArrayList<String>();

		if (null != crunchifyFiles && crunchifyFiles.size() > 0) {
            System.out.println("for loop calling");

            for (MultipartFile multipartFile : crunchifyFiles) {

				String fileName = multipartFile.getOriginalFilename();
				if (!"".equalsIgnoreCase(fileName)) {
					// Handle file content - multipartFile.getInputStream()
					multipartFile
							.transferTo(new File(saveDirectory + fileName));
					fileNames.add(fileName);
				}
			}
		}

		map.addAttribute("files", fileNames);
		return "uploadfilesuccess";
        //return new ResponseEntity<String>(HttpStatus.OK);
	}


	@RequestMapping(value = "/user/saveUserDataAndFile", method = RequestMethod.POST)
	@ResponseBody
	public Object saveUserDataAndFile(@RequestParam(value = "file") MultipartFile file, HttpServletRequest request) {

		ObjectMapper mapper = new ObjectMapper();

		String rootDirectory = "F:\\testUpload\\";
		System.out.println("Root Directory "+rootDirectory);
		try {
			file.transferTo(new File(rootDirectory  + file.getOriginalFilename()));
		} catch (IllegalStateException e) {

			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return null;

	}


}