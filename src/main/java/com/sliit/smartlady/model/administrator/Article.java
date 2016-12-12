package com.sliit.smartlady.model.administrator;

public class Article {

	private int artID;
	private String title;
	private String description;
	private String 	publishedDate;
	private String image;
	private String Category;
	private String User;
	private String status;
	private String coverImagePath;
	private int subCatID;
	private User writer;
	
	public Article() {
		this.artID = 0;
	}
	
	public Article(int artID, String title, String description, String publishedDate
			,String image, String Category, String User, String status){
		
		this.artID = artID;
		this.title = title;
		this.description = description;
		this.publishedDate = publishedDate;
		this.image = image;
		this.Category = Category;
		this.User = User;
		this.status = status;
	}
	
	public Boolean findByID(int artID)
	{
		return artID == this.artID;
	}
	
	public int getID()
	{
		return artID;
	}
	
	public void setID(int artID)
	{
		this.artID = artID;
	}
	
	public String getTitle()
	{
		return title;
	}
	
	public void setTitle(String title)
	{
		this.title = title;
	}
	
	public String getDescription()
	{
		return description;
	}
	
	public void setDescription(String description)
	{
		this.description = description;
	}
	
	public String getStatus()
	{
		return status;
	}
	
	public void setStatus(String status)
	{
		this.status = status;
	}
	
	public int getSubCatID()
	{
		return this.subCatID;
	}
	
	public void setSubCatID(int subCatID)
	{
		this.subCatID = subCatID;
	}
	
	public String getcoverImagePath()
	{
		return this.coverImagePath;
	}
	
	public void setcoverImagePath(String coverImagePath)
	{
		this.coverImagePath = coverImagePath;
	}
	
	public User getWriter()
	{
		return this.writer;
	}
	
	public void setWriter(User writer)
	{
		this.writer = writer;
	}
	
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (!(obj instanceof Article))
			return false;
		Article other = (Article) obj;
		if (artID != other.artID)
			return false;
		return true;
	}
	
	@Override
	public String toString() {
		return "Article [artID=" + artID + ", Title=" + title + ", catDescription=" + description + ", Status= "+ status + "]";
	}
	
}
