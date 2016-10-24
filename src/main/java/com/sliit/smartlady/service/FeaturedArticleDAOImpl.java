package com.sliit.smartlady.service;

import com.sliit.smartlady.model.Article;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by Fazeel on 9/30/2016.
 */
public class FeaturedArticleDAOImpl implements FeaturedArticleDAO {

    private ArticleDAO articleDAO;
    private JdbcTemplate jdbcTemplate;

    public FeaturedArticleDAOImpl(){
        this.articleDAO = new ArticleDAOImpl();
    }

    public FeaturedArticleDAOImpl(DataSource datasource)
    {
        this.jdbcTemplate = new JdbcTemplate(datasource);
        this.articleDAO = new ArticleDAOImpl();
    }

    /*Started Fazeel Mohamed's method implementation*/

    @Override
    public List<Article> getSortedFeaturedArticle(List<Article> articleList) {

        List<Article> tempArticleList1 = new ArrayList<>();
        List<Article> tempArticleList2 = new ArrayList<>();
        List<Article> tempArticleList3 = new ArrayList<>();
        // get All articles From DataBase
        //List<Article> articleList = this.articleDAO.getAllArticles();

        for(Article article : articleList){

            if(article.getTotalViews() == 0){
                tempArticleList3.add(article);
            }else if(article.getTotalViews() != 0 && (article.getTotalLikes() == 0 || article.getOverallRating() == 0.0)){
                tempArticleList2.add(article);
            }else if(article.getTotalViews() != 0 && (article.getTotalLikes() != 0 || article.getOverallRating() != 0.0)){
                tempArticleList1.add(article);
            }
        }

        List<Article> articleList1_SortByEquation = this.sortByEquation(tempArticleList1);
        List<Article> articleList2_SortByTotalView = this.sortByTotalView(tempArticleList2);
        List<Article> articleList3_SortByPublishTime = this.sortByPublishTime(tempArticleList3);

        //add sorted articleList2 article to articleList1
        for(Article article : articleList2_SortByTotalView){
            articleList1_SortByEquation.add(article);
        }

        //add sorted articleList3 article to articleList1
        for(Article article : articleList3_SortByPublishTime){
            articleList1_SortByEquation.add(article);
        }

        return articleList1_SortByEquation;
    }

    @Override
    public List<Article> getSortedArticleByDate(List<Article> articleList) {
        return this.sortByPublishTimeDESC(articleList);
    }

    private List<Article> sortByEquation(List<Article> articleList){
        String statsCountWithDate = "";
        for(Article article : articleList){
            statsCountWithDate = this.callEquationStatsCountWithPublishedDate(article);
            article.setStatsCountWithDate(statsCountWithDate);
        }
        Collections.sort(articleList, Article.ArticleStatsCountWithDate);
        return articleList;
    }

    private List<Article> sortByTotalView(List<Article> articleList){
        String totalViewAndDate = "";
        for(Article article : articleList){
            totalViewAndDate = this.getTotalViewAndPublishedDate(article);
            article.setStatsCountWithDate(totalViewAndDate);
        }
        Collections.sort(articleList, Article.ArticleStatsCountWithDate);
        return articleList;
    }

    private List<Article> sortByPublishTime(List<Article> articleList){
        Collections.sort(articleList, Article.ArticlePublishedDate);
        return articleList;
    }

    private List<Article> sortByPublishTimeDESC(List<Article> articleList){
        Collections.sort(articleList, Article.ArticlePublishedDateDESC);
        return articleList;
    }

    private String callEquationStatsCountWithPublishedDate(Article article){
        double statsCount = (article.getOverallRating()*10)+
                article.getTotalLikes()+
                (article.getTotalLikes()*1.0*100/article.getTotalViews());

        return article.getPublishedDate()+""+ statsCount;
    }

    private String getTotalViewAndPublishedDate(Article article){
        double toatalViews = article.getTotalViews()*1.0/100;

        return article.getPublishedDate()+""+ toatalViews;
    }

	/* Ended Fazeel Mohamed's method implementation*/

}
