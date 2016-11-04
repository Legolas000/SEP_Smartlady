package com.sliit.smartlady.model;

public class Category {

	private int catID;
	private String catName;
	private String catDescription;
	
	public Category(){
		this.catID = 0;
	}
	
	public Category(int catID, String catName, String catDescription)
	{
		this.catID = catID;
		this.catName = catName;
		this.catDescription = catDescription;
	}
	
	public Boolean findByID(int catID)
	{
		return catID == this.catID;
	}
	
	public int getID()
	{
		return catID;
	}
	
	public void setID(int catID)
	{
		this.catID = catID;
	}
	
	public String getcatName()
	{
		return catName;
	}
	
	public void setcatName(String catName)
	{
		this.catName = catName;
	}
	
	public String getcatDescription()
	{
		return catDescription;
	}
	
	public void setcatDescription(String catDescription)
	{
		this.catDescription = catDescription;
	}
	
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (!(obj instanceof Category))
			return false;
		Category other = (Category) obj;
		if (catID != other.catID)
			return false;
		return true;
	}
	
	@Override
	public String toString() {
		return "Category [catID=" + catID + ", catName=" + catName + ", catDescription=" + catDescription + "]";
	}
}
