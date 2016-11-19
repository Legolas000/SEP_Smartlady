package com.sliit.smartlady.service;

import com.sliit.smartlady.model.Article;
import com.sliit.smartlady.model.Reades;

import java.util.List;

public interface ArticleDAO {

        /* ===================================== Nibras ====================================== */

        /*Created by Nibras*/
        public void createNewArticle(String title, String category, String articleBody, String imgPath);

        /*Created by Nibras*/
        public List<Article> getArticlesByWriterId(int writerId);

        /*Created by Nibras*/
        public List<Article> getFilterArticles(int writerId,int status);

        /* --------------------------------------------------------------------------------------------- */
        /* ===================================== Fazeel Mohamed ====================================== */

        /*Created by Fazeel*/
        public List<Article> getAllArticles(); //Get all unapproved articles

        /*Created by Fazeel*/
        public Article findByID(int artID);

        public void deleteArticle(int articleId);

        /*Created by Fazeel*/
        public void updateStatus(Article article);

        /*Created by Fazeel*/
        public void updateStatuses(Article[] article);//Multiple article updates

        /*Created by Fazeel*/
        public List<Article> getSortedFeaturedArticle();

        /*Created by Fazeel*/
        public List<Article> getSortedArticleByDate();

        /*Created by Fazeel*/
        public List<Article> getTopRatedArticles();

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

        /*Created by Fazeel*/
        void updateReaderRating(Reades reades);

        /*Created by Fazeel*/
        void updateReaderLikes(Reades reades);

        /*Created by Fazeel*/
        void updateAverageReaderRating(Reades reades);

        /*Created by Fazeel*/
        void updateReaderLikeCountsInArticle(Reades reades);

        /*Created by Fazeel*/
        Reades getReaderByReaderIDAndArticleID(int articleID, int readerID);

        /*Created by Fazeel*/
        List<Article> getArticleByCategoryID(int categoryID);

        /* --------------------------------------------------------------------------------------------- */



}
