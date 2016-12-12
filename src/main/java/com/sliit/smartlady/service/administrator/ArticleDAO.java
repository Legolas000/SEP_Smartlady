package com.sliit.smartlady.service.administrator;

import com.sliit.smartlady.model.administrator.Article;

import java.util.List;

public interface ArticleDAO {

	public List<Article> getAllArticles(); //Get all unapproved articles
	
	public List<Article> getFilteredArticles(int status);
	
	public Article findByID(int artID);
	
	public void updateStatus(Article article);
	
	public void rejectStatus(Article article);
	
	public void updateStatuses(Article[] article);//Multiple article updates
}
