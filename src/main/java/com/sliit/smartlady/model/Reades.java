package com.sliit.smartlady.model;

/**
 * Created by Fazeel on 10/15/2016.
 */
public class Reades {
    private int readerID;
    private int articleID;
    private boolean isLike;
    private boolean isViewed;
    private double rate;
    private User userAsReader;
    private Article article;

    public int getReaderID() {
        return readerID;
    }

    public void setReaderID(int readerID) {
        this.readerID = readerID;
    }

    public int getArticleID() {
        return articleID;
    }

    public void setArticleID(int articleID) {
        this.articleID = articleID;
    }



    public boolean isLike() {
        return isLike;
    }

    public void setLike(boolean like) {
        isLike = like;
    }

    public boolean isViewed() {
        return isViewed;
    }

    public void setViewed(boolean viewed) {
        isViewed = viewed;
    }

    public double getRate() {
        return rate;
    }

    public void setRate(double rate) {
        this.rate = rate;
    }

    public User getUserAsReader() {
        return userAsReader;
    }

    public void setUserAsReader(User userAsReader) {
        this.userAsReader = userAsReader;
    }

    public Article getArticle() {
        return article;
    }

    public void setArticle(Article article) {
        this.article = article;
    }

    @Override
    public String toString() {
        return "Reades{" +
                "readerID=" + readerID +
                ", articleID=" + articleID +
                ", isLike=" + isLike +
                ", isViewed=" + isViewed +
                ", rate=" + rate +
                ", userAsReader=" + userAsReader +
                ", article=" + article +
                '}';
    }
}
