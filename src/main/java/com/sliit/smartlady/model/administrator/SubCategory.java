package com.sliit.smartlady.model.administrator;

public class SubCategory {

	private int subCatID;
	private String subCatName;
	private String subCatDescription;
	private int catID;
	private Category category;
	
	public SubCategory(){
		this.subCatID = 0;
		this.catID = 0;
	}
	
	public SubCategory(int subCatID, String subCatName, String subCatDescription,int catID, Category category)
	{
		this.subCatID = subCatID;
		this.subCatName = subCatName;
		this.subCatDescription = subCatDescription;
		this.catID = catID;
		this.category = category;
	}
	
	public Boolean findByID(int subCatID)
	{
		return subCatID == this.subCatID;
	}
	
	public int getID()
	{
		return subCatID;
	}
	
	public void setID(int subCatID)
	{
		this.subCatID = subCatID;
	}
	
	public String getsubCatName()
	{
		return subCatName;
	}
	
	public void setsubCatName(String subCatName)
	{
		this.subCatName = subCatName;
	}
	
	public String getsubCatDescription()
	{
		return subCatDescription;
	}
	
	public void setsubCatDescription(String subCatDescription)
	{
		this.subCatDescription = subCatDescription;
	}
	
	public void setcatID(int catID)
	{
		this.catID = catID;
	}
	
	public int getcatID()
	{
		return catID;
	}
	
	public void setCategory(Category category)
	{
		this.category = category;
	}
	
	public Category getCategory()
	{
		return category;
	}
	
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (!(obj instanceof SubCategory))
			return false;
		SubCategory other = (SubCategory) obj;
		if (subCatID != other.subCatID)
			return false;
		return true;
	}
	
	@Override
	public String toString() {
		return "Category [subCatID=" + subCatID + ", subCatName=" + subCatName + ", subCatDescription=" + subCatDescription + "]";
	}

}
