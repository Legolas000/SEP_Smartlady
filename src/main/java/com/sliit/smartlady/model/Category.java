package com.sliit.smartlady.model;

public class Category {

	private int id;
	private String catName;
	private String catDescription;
	private int noOfHits;
	
	public Category(){
		this.id = 0;
	}
	
	public Category(int catID, String catName, String catDescription)
	{
		this.id = catID;
		this.catName = catName;
		this.catDescription = catDescription;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCatName() {
		return catName;
	}

	public void setCatName(String catName) {
		this.catName = catName;
	}

	public String getCatDescription() {
		return catDescription;
	}

	public void setCatDescription(String catDescription) {
		this.catDescription = catDescription;
	}

	public int getNoOfHits() {
		return noOfHits;
	}

	public void setNoOfHits(int noOfHits) {
		this.noOfHits = noOfHits;
	}
}
