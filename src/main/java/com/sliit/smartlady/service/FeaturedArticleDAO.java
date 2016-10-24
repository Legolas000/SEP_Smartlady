package com.sliit.smartlady.service;

import com.sliit.smartlady.model.Article;

import java.util.List;

/**
 * Created by Fazeel on 9/30/2016.
 */
public interface FeaturedArticleDAO {
    public List<Article> getSortedFeaturedArticle(List<Article> articleList);

    public List<Article> getSortedArticleByDate(List<Article> articleList);
}
