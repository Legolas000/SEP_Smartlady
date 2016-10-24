package com.sliit.smartlady.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class IndexController {

	  @RequestMapping(value = "/" , method = RequestMethod.GET)
	public String getIndexPage() {
		return "ReaderIndex";
	}






}