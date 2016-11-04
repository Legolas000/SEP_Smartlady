package com.sliit.smartlady.service;

import com.sliit.smartlady.model.Article;
import com.sliit.smartlady.model.Reades;

import java.util.List;

public interface ArticleDAO {
        /*Created by Fazeel*/
        public List<Article> getAllArticles(); //Get all unapproved articles

        public List<Article> getArticlesByWriterId(int writerId);

        public List<Article> getFilterArticles(int writerId,int status);

        /*Created by Fazeel*/
        public Article findByID(int artID);

        public void deleteArticle(int articleId);

        public void updateStatus(Article article);

        public void updateStatuses(Article[] article);//Multiple article updates

        /*Created by Fazeel*/
        public List<Article> getSortedFeaturedArticle();

        /*Created by Fazeel*/
        public List<Article> getSortedArticleByDate();

        /*Created by Fazeel*/
        public Article getArticleWithWriter(Article article);

        /*Created by Fazeel*/
        public Article getArticleWithCategory(Article article);

        /*Created by Fazeel*/
        public List<Article> getAllArticlesWithOtherEntities(List<Article> articles);

        /*Created by Fazeel*/
        public Article getArticleWithOtherEntities(Article articles);

        /*Created by Fazeel*/
        void saveReader(int articleID, int readerID);

        void updateReaderRating(Reades reades);

        void updateReaderLikes(Reades reades);

        void updateAverageReaderRating(Reades reades);

        void updateReaderLikeCountsInArticle(Reades reades);

        Reades getReaderByReaderIDAndArticleID(int articleID, int readerID);



}
