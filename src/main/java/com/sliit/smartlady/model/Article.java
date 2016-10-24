package com.sliit.smartlady.model;

import java.util.Comparator;

public class Article{

	private int id;
	private String title;
	private String description;
	private String publishedDate;
	private String coverImagePath;
	private boolean isFeatured;
	private double overallRating;
	private int totalLikes;
	private int totalViews;
	private int categoryID;
	private Category category;
	private int writerID;
	private User userAsWriter;
	private int status;
	private String statsCountWithDate;
	private String writerName;
	private String categoryName;



	public Article(int id, String title, String description, String publishedDate, String coverImagePath,
				   boolean isFeatured, double overallRating, int totalLikes, int totalViews, int categoryID,
				   int writerID, int status) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.publishedDate = publishedDate;
		this.coverImagePath = coverImagePath;
		this.isFeatured = isFeatured;
		this.overallRating = overallRating;
		this.totalLikes = totalLikes;
		this.totalViews = totalViews;
		this.categoryID = categoryID;

		this.writerID = writerID;

		this.status = status;


	}

	public int getTotalLikes() {
		return totalLikes;
	}

	public void setTotalLikes(int totalLikes) {
		this.totalLikes = totalLikes;
	}

	public int getTotalViews() {
		return totalViews;
	}

	public void setTotalViews(int totalViews) {
		this.totalViews = totalViews;
	}


	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public Article() {
		this.id = 0;
	}
	
	public Boolean findByID(int articleID)
	{
		return articleID == this.id;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
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

	public String getCoverImagePath() {
		return coverImagePath;
	}

	public void setCoverImagePath(String coverImagePath) {
		this.coverImagePath = coverImagePath;
	}

	public boolean isFeatured() {
		return isFeatured;
	}

	public void setFeatured(boolean featured) {
		isFeatured = featured;
	}

	public double getOverallRating() {
		return overallRating;
	}

	public void setOverallRating(double overallRating) {
		this.overallRating = overallRating;
	}

	public int getCategoryID() {
		return categoryID;
	}

	public void setCategoryID(int categoryID) {
		this.categoryID = categoryID;
	}

	public int getWriterID() {
		return writerID;
	}

	public void setWriterID(int writerID) {
		this.writerID = writerID;
	}

	public String getStatsCountWithDate() {
		return statsCountWithDate;
	}

	public void setStatsCountWithDate(String  statsCountWithDate) {
		this.statsCountWithDate = statsCountWithDate;
	}

	public String getWriterName() {
		return writerName;
	}

	public void setWriterName(String writerName) {
		this.writerName = writerName;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public User getUserAsWriter() {
		return userAsWriter;
	}

	public void setUserAsWriter(User userAsWriter) {
		this.userAsWriter = userAsWriter;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;

		Article article = (Article) o;

		if (id != article.id) return false;
		if (isFeatured != article.isFeatured) return false;
		if (Double.compare(article.overallRating, overallRating) != 0) return false;
		if (categoryID != article.categoryID) return false;
		if (writerID != article.writerID) return false;
		if (title != null ? !title.equals(article.title) : article.title != null) return false;
		if (description != null ? !description.equals(article.description) : article.description != null) return false;
		if (publishedDate != null ? !publishedDate.equals(article.publishedDate) : article.publishedDate != null)
			return false;
		if (coverImagePath != null ? !coverImagePath.equals(article.coverImagePath) : article.coverImagePath != null) return false;
		return status != 0 ? status == article.status : article.status == 0;

	}

	@Override
	public int hashCode() {
		int result;
		long temp;
		result = id;
		result = 31 * result + (title != null ? title.hashCode() : 0);
		result = 31 * result + (description != null ? description.hashCode() : 0);
		result = 31 * result + (publishedDate != null ? publishedDate.hashCode() : 0);
		result = 31 * result + (coverImagePath != null ? coverImagePath.hashCode() : 0);
		result = 31 * result + (isFeatured ? 1 : 0);
		temp = Double.doubleToLongBits(overallRating);
		result = 31 * result + (int) (temp ^ (temp >>> 32));
		result = 31 * result + categoryID;
		result = 31 * result + writerID;
		return result;
	}

	@Override
	public String toString() {
		return "Article{" +
				"id=" + id +
				", title='" + title + '\'' +
				", description='" + description + '\'' +
				", publishedDate='" + publishedDate + '\'' +
				", coverImagePath='" + coverImagePath + '\'' +
				", isFeatured=" + isFeatured +
				", overallRating=" + overallRating +
				", categoryID=" + categoryID +
				", writerID=" + writerID +
				", status='" + status + '\'' +
				'}';
	}

	/* Comparator for sorting the list by Stats Count */
	public static Comparator<Article> ArticleStatsCountWithDate = new Comparator<Article>() {

		public int compare(Article article1, Article article2) {

			String statsCountWithDate1 = article1.getStatsCountWithDate();
			String statsCountWithDate2 = article2.getStatsCountWithDate();

	   		/*For descending order*/
			return statsCountWithDate2.compareTo(statsCountWithDate1);
		}
	};

	/* Comparator for sorting the list by Published Date */
	public static Comparator<Article> ArticlePublishedDate = new Comparator<Article>() {

		public int compare(Article article1, Article article2) {
			String publishedDate1 = article1.getPublishedDate();
			String publishedDate2 = article2.getPublishedDate();
			/* For ascending order */
			return publishedDate1.compareTo(publishedDate2);
		}
	};

	/* Comparator for sorting the list by Published Date in descending order */
	public static Comparator<Article> ArticlePublishedDateDESC = new Comparator<Article>() {

		public int compare(Article article1, Article article2) {
			String publishedDate1 = article1.getPublishedDate();
			String publishedDate2 = article2.getPublishedDate();
	   		/*For descending order*/
			return publishedDate2.compareTo(publishedDate1);
		}
	};

	/* Comparator for sorting the list by Total View */
	/*public static Comparator<Article> ArticleTotalView = new Comparator<Article>() {

		public int compare(Article article1, Article article2) {

			int totalViews1 = article1.getTotalViews();
			int totalViews2 = article2.getTotalViews();

	   *//*For ascending order*//*
			//return totalViews1-totalViews2;

	   *//*For descending order*//*
			return totalViews2-totalViews1;
		}
	};*/

}
