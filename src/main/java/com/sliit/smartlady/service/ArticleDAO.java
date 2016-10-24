package com.sliit.smartlady.service;

import com.sliit.smartlady.model.Article;

import java.util.List;

public interface ArticleDAO {

	public List<Article> getAllArticles(); //Get all unapproved articles
	
	public Article findByID(int artID);
	
	public void updateStatus(Article article);
	
	public void updateStatuses(Article[] article);//Multiple article updates

	public List<Article> getSortedFeaturedArticle();

	public List<Article> getSortedArticleByDate();

	public Article getArticleWithWriter(Article article);

	public Article getArticleWithCategory(Article article);

	public List<Article> getAllArticlesWithOtherEntities(List<Article> articles);

	public Article getArticleWithOtherEntities(Article articles);



}
