package com.sliit.smartlady.model;

public class Advertisement {

	private int advID;
	private String image;
	private String description;
	private String published_date;
	private String expiry_date;
	private String url;
	private String status;
	private float payment;
	
	public Advertisement() {
		this.advID = 0;
	}
	
	public Advertisement(int advID, String image, String description, String published_date
			, String expiry_date, String url, float payment){
	
		this.advID = advID;
		this.image = image;
		this.description = description;
		this.published_date = published_date;
		this.expiry_date = expiry_date;
		this.url = url;
		this.payment = payment;
	}
	
	public Boolean findByID(int advID)
	{
		return advID == this.advID;
	}
	
	public int getID()
	{
		return advID;
	}
	
	public void setID(int advID)
	{
		this.advID = advID;
	}
	
	public String getDescription()
	{
		return description;
	}
	
	public void setDescription(String description)
	{
		this.description = description;
	}
	
	public String getPublishedDate()
	{
		return published_date;
	}
	
	public void setPublishedDate(String published_date)
	{
		this.published_date = published_date;
	}
	
	public String getExpiryDate()
	{
		return expiry_date;
	}
	
	public void setExpiryDate(String expiry_date)
	{
		this.expiry_date = expiry_date;
	}

	public String getURL()
	{
		return url;
	}
	
	public void setURL(String url)
	{
		this.url = url;
	}
	
	public float getPayment()
	{
		return payment;
	}
	
	public void setPayment(float payment)
	{
		this.payment = payment;
	}
	
	public void setStatus(String status)
	{
		this.status = status;
	}
	
	public String getStatus()
	{
		return status;
	}
	
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (!(obj instanceof Advertisement))
			return false;
		Advertisement other = (Advertisement) obj;
		if (advID != other.advID)
			return false;
		return true;
	}
	
	@Override
	public String toString() {
		return "Advertisement [advID=" + advID + ", published_date=" + published_date + ", Description=" + description + ", URL= "+ url + "]";
	}
}
