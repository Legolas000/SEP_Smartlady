package com.sliit.smartlady.service;

import com.sliit.smartlady.model.Article;

import java.util.List;

public interface ArticleDAO {

	public List<Article> getAllArticles(); //Get all unapproved articles
	
	public Article findByID(int artID);
	
	public void updateStatus(Article article);
	
	public void updateStatuses(Article[] article);//Multiple article updates
}
