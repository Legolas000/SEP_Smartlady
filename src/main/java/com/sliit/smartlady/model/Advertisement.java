package com.sliit.smartlady.model;

public class Advertisement {

	private int id;
	private String imagePath;
	private String description;
	private String publishedDate;
	private String expiryDate;
	private String url;
	private String status;
	private String place;
	private float payment;
	private int categoryID;
	private int userID;
	private Category category;

	public String getUserImage() {
		return userImage;
	}

	public void setUserImage(String userImage) {
		this.userImage = userImage;
	}

	private String userImage;
	//private User user;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getPublishedDate() {
		return publishedDate;
	}

	public void setPublishedDate(String publishedDate) {
		this.publishedDate = publishedDate;
	}

	public String getExpiryDate() {
		return expiryDate;
	}

	public void setExpiryDate(String expiryDate) {
		this.expiryDate = expiryDate;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public float getPayment() {
		return payment;
	}

	public void setPayment(float payment) {
		this.payment = payment;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public int getCategoryID() {
		return categoryID;
	}

	public void setCategoryID(int categoryID) {
		this.categoryID = categoryID;
	}

	public int getUserID() {
		return userID;
	}

	public void setUserID(int userID) {
		this.userID = userID;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public String getPlace() {
		return place;
	}

	public void setPlace(String place) {
		this.place = place;
	}

	@Override
	public String toString() {
		return "Advertisement{" +
				"id=" + id +
				", imagePath='" + imagePath + '\'' +
				", description='" + description + '\'' +
				", publishedDate='" + publishedDate + '\'' +
				", expiryDate='" + expiryDate + '\'' +
				", url='" + url + '\'' +
				", payment=" + payment +
				", status='" + status + '\'' +
				", categoryID=" + categoryID +
				", userID=" + userID +
				", category=" + category +
				'}';
	}
}
