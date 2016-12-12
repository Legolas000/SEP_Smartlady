package com.sliit.smartlady.service;

import com.sliit.smartlady.model.Article;
import com.sliit.smartlady.model.Category;
import com.sliit.smartlady.model.Reades;
import com.sliit.smartlady.model.User;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

public class ArticleDAOImpl implements ArticleDAO {

        private JdbcTemplate jdbcTemplate;
        private FeaturedArticleDAO featuredArticleDAO;
        private UserDAO userDAO;
        private CategoryDAO categoryDAO;


        public ArticleDAOImpl(){

        }
        public ArticleDAOImpl(DataSource datasource)
        {
            jdbcTemplate = new JdbcTemplate(datasource);
            featuredArticleDAO = new FeaturedArticleDAOImpl();
            userDAO = new UserDAOImpl(datasource);
            categoryDAO = new CategoryDAOImpl(datasource);

        }

        @Override
        public List<Article> getAllArticles() {
            String sql = "SELECT * FROM articles WHERE status = 1 ";
            List<Article> listArticle = jdbcTemplate.query(sql, new RowMapper<Article>() {

                @Override
                public Article mapRow(ResultSet rs, int rowNum) throws SQLException {

                    Article lArticle = new Article();

                    lArticle.setId(rs.getInt("id"));
                    lArticle.setTitle(rs.getString("title"));
                    lArticle.setDescription(rs.getString("description"));
                    lArticle.setPublishedDate(rs.getString ("publishedDate"));
                    lArticle.setOverallRating(rs.getDouble("overallRating"));
                    lArticle.setFeatured(rs.getBoolean("isFeatured"));
                    lArticle.setTotalLikes(rs.getInt("totalLikes"));
                    lArticle.setTotalViews(rs.getInt("totalViews"));
                    lArticle.setCoverImagePath(rs.getString ("coverImagePath"));
                    lArticle.setStatus(rs.getInt("status"));
                    lArticle.setWriterID(rs.getInt ("writerId"));
                    lArticle.setCategoryID(rs.getInt("categoryId"));

                    return lArticle;
                }
            });

            return listArticle;
        }

    @Override
    public List<Article> getTopRatedArticles() {
        String sql = "SELECT * FROM articles  ORDER BY overallRating DESC ";
        List<Article> listArticle = jdbcTemplate.query(sql, new RowMapper<Article>() {

            @Override
            public Article mapRow(ResultSet rs, int rowNum) throws SQLException {

                Article lArticle = new Article();

                lArticle.setId(rs.getInt("id"));
                lArticle.setDescription(rs.getString("description"));
                lArticle.setTitle(rs.getString("title"));
                lArticle.setPublishedDate(rs.getString ("publishedDate"));
                lArticle.setOverallRating(rs.getDouble("overallRating"));
                lArticle.setFeatured(rs.getBoolean("isFeatured"));
                lArticle.setTotalLikes(rs.getInt("totalLikes"));
                lArticle.setTotalViews(rs.getInt("totalViews"));
                lArticle.setCoverImagePath(rs.getString ("coverImagePath"));
                lArticle.setStatus(rs.getInt("status"));
                lArticle.setWriterID(rs.getInt ("writerId"));
                lArticle.setCategoryID(rs.getInt("categoryId"));

                return lArticle;
            }
        });

        return listArticle;
    }


    @Override
    public void createNewArticle(Article article) {

       // Category c = getCategoryId(article);
        Category c = categoryDAO.findByName(article.getCategoryName());

        //get current date
        DateFormat df = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Date dateobj = new Date();
        String today = df.format(dateobj);
        System.out.println(df.format(dateobj));

        String sql = "INSERT INTO articles(title,description,publishedDate,isFeatured,overallRating,totalLikes,totalViews,link,coverImagePath,status,writerId,categoryId) " + "VALUES(?,?,?,?,?,?,?,?,?,?,?,?)";
        int a = jdbcTemplate.update(sql,article.getTitle(),article.getDescription(),today,0,0.0,0,0,0,"",0,article.getWriterID(),c.getId());
        System.out.println("Article data inserted");
    }

    private Article getMaxId() {
        String sql = "SELECT MAX(id) FROM articles";
        return jdbcTemplate.query(sql, new ResultSetExtractor<Article>() {

            //@Override
            public Article extractData(ResultSet rs) throws SQLException,DataAccessException {
                if (rs.next()) {
                    Article article = new Article();
                    article.setId(rs.getInt(1));
                    return article;
                }
                return null;
            }
        });
    }

    @Override
    public void uploadImage(String filePath){
        Article a = getMaxId();
        int articleID = a.getId();
        String sql = "UPDATE articles SET coverImagePath = ?" + " WHERE id = ?";
        jdbcTemplate.update(sql, filePath , articleID);
    }

    @Override
        public List<Article> getArticlesByWriterId(int writerId) {
            String sql = "SELECT * FROM articles WHERE writerId = "+writerId;
            List<Article> listArticle = jdbcTemplate.query(sql, new RowMapper<Article>() {

                @Override
                public Article mapRow(ResultSet rs, int rowNum) throws SQLException {

                    Article lArticle = new Article();

                    lArticle.setId(rs.getInt("id"));
                    lArticle.setTitle(rs.getString("title"));
                    lArticle.setDescription(rs.getString("description"));
                    lArticle.setPublishedDate(rs.getString ("publishedDate"));
                    lArticle.setFeatured(rs.getBoolean("isFeatured"));
                    lArticle.setOverallRating(rs.getDouble("overallRating"));
                    lArticle.setCoverImagePath(rs.getString ("coverImagePath"));
                    lArticle.setTotalLikes(rs.getInt("totalLikes"));
                    lArticle.setTotalViews(rs.getInt("totalViews"));
                    lArticle.setStatus(rs.getInt("status"));
                    lArticle.setWriterID(rs.getInt ("writerId"));
                    lArticle.setCategoryID(rs.getInt("categoryId"));

                    return lArticle;
                }
            });

            return listArticle;
        }

        @Override
        public List<Article> getFilterArticles(int writerId, int status) {

            String sql = "SELECT * FROM articles WHERE status = " + status + " AND writerId = " + writerId;
            List<Article> listArticle = jdbcTemplate.query(sql, new RowMapper<Article>() {

                @Override
                public Article mapRow(ResultSet rs, int rowNum){

                    try{
                        Article lArticle = new Article();

                        lArticle.setId(rs.getInt("id"));
                        lArticle.setTitle(rs.getString("title"));
                        lArticle.setDescription(rs.getString("description"));
                        lArticle.setPublishedDate(rs.getString ("publishedDate"));
                        lArticle.setFeatured(rs.getBoolean("isFeatured"));
                        lArticle.setOverallRating(rs.getDouble("overallRating"));
                        lArticle.setTotalLikes(rs.getInt("totalLikes"));
                        lArticle.setTotalViews(rs.getInt("totalViews"));
                        lArticle.setCoverImagePath(rs.getString ("coverImagePath"));
                        lArticle.setStatus(rs.getInt("status"));
                        lArticle.setCategoryID(rs.getInt("categoryId"));
                        lArticle.setWriterID(rs.getInt ("writerId"));


                        return lArticle;


                    }catch (SQLException s){
                        System.out.println("exception => "+s);
                        return null;
                    }

                }
            });

            //System.out.println(listArticle);

            return listArticle;
        }

    @Override
    public List<Article> getArticleByCategoryID(int categoryID) {
        String sql = "SELECT * FROM articles WHERE categoryId = "+ categoryID;
        List<Article> listArticle = jdbcTemplate.query(sql, new RowMapper<Article>() {

            @Override
            public Article mapRow(ResultSet rs, int rowNum) throws SQLException {

                Article lArticle = new Article();

                lArticle.setId(rs.getInt("id"));
                lArticle.setDescription(rs.getString("description"));
                lArticle.setTitle(rs.getString("title"));
                lArticle.setPublishedDate(rs.getString ("publishedDate"));
                lArticle.setOverallRating(rs.getDouble("overallRating"));
                lArticle.setStatus(rs.getInt("status"));
                lArticle.setFeatured(rs.getBoolean("isFeatured"));
                lArticle.setTotalLikes(rs.getInt("totalLikes"));
                lArticle.setTotalViews(rs.getInt("totalViews"));
                lArticle.setCoverImagePath(rs.getString ("coverImagePath"));
                lArticle.setWriterID(rs.getInt ("writerId"));
                lArticle.setCategoryID(rs.getInt("categoryId"));

                return lArticle;
            }
        });

        return listArticle;
    }

        @Override
        public Article getArticleWithWriter(Article article) {
            //article.setWriterName(userDAO.findByID(article.getWriterID()).getFullname());
            article.setUserAsWriter(userDAO.findByID(article.getWriterID()));
            return article;
        }

        @Override
        public Article getArticleWithCategory(Article article) {
            //article.setCategoryName(categoryDAO.findByID(article.getCategoryID()).getCatName());
            article.setCategory(categoryDAO.findByID(article.getCategoryID()));
            return article;
        }

        private int totalComentsForArticle(int articleID){
            String sql = "SELECT COUNT(articleID) FROM comments WHERE  articleID = "+articleID +" GROUP BY  articleID";

            return (int) jdbcTemplate.query(sql, new ResultSetExtractor() {

                @Override
                public Object extractData(ResultSet rs) throws SQLException,
                        DataAccessException {
                    if (rs.next()) {
                        return rs.getInt(1);
                    }
                    return 0;
                }
            });

        }

        @Override
        public Article findByID(int articleID) {
            String sql = "SELECT * FROM articles WHERE id = " + articleID;

             return jdbcTemplate.query(sql, new ResultSetExtractor<Article>() {

                    @Override
                    public Article extractData(ResultSet rs) throws SQLException,
                            DataAccessException {
                        if (rs.next()) {
                            Article article = new Article();
                            Category category = new Category();

                            article.setId(rs.getInt("id"));
                            article.setTitle(rs.getString("title"));
                            article.setDescription(rs.getString("description"));
                            article.setPublishedDate(rs.getString ("publishedDate"));
                            article.setFeatured(rs.getBoolean("isFeatured"));
                            article.setOverallRating(rs.getDouble("overallRating"));
                            article.setTotalLikes(rs.getInt("totalLikes"));
                            article.setTotalViews(rs.getInt("totalViews"));
                            article.setStatus(rs.getInt("status"));
                            article.setCoverImagePath(rs.getString ("coverImagePath"));
                            article.setWriterID(rs.getInt ("writerId"));
                            article.setCategoryID(rs.getInt("categoryId"));

                            //get the category name and push it to article object
                            category = categoryDAO.findByID(rs.getInt("categoryId"));
                            article.setCategoryName(category.getCatName());

                            return article;
                        }
                        return null;
                    }
                });
        }

        @Override
        public void deleteArticle(int articleId) {
            String sql = "DELETE FROM articles WHERE id = ?";
            jdbcTemplate.update(sql,articleId);
        }

        @Override
        public List<Article> getSortedFeaturedArticle() {

            List<Article> articleList = this.getAllArticles();
            List<Article> featuredArticle = this.featuredArticleDAO.getSortedFeaturedArticle(articleList);
            //List<Article> featuredArticleWithOtherEntities = this.getAllArticlesWithOtherEntities(featuredArticle);
            return  featuredArticle;
        }

        @Override
        public List<Article> getSortedArticleByDate() {
            List<Article> articleList = this.getAllArticles();
            List<Article> sortedArticleListByDate = this.featuredArticleDAO.getSortedArticleByDate(articleList);
            return sortedArticleListByDate;
        }

        @Override
        public void updateStatus(Article article) {
            String sql = "UPDATE articles SET status = 'Approved' "+
                    " WHERE id = ?";
            jdbcTemplate.update(sql, article.getId());
        }

        @Override
        public void updateStatuses(Article[] article) {
            // TODO Auto-generated method stub

        }

        @Override
        public List<Article> getAllArticlesWithOtherEntities(List<Article> articles){
            List<Article> tempArticlesForWriter = new ArrayList<Article>();
            List<Article> tempArticlesForCategory = new ArrayList<Article>();
            List<Article> tempArticlesForComment = new ArrayList<Article>();
            Article tempArticleForWriter;
            Article tempArticleForCategory;
            Article tempArticleForComment;
            for(Article article : articles){
                //tempArticleForW = new Article();
                tempArticleForWriter = this.getArticleWithWriter(article);
                tempArticlesForWriter.add(tempArticleForWriter);
            }

            for(Article article : tempArticlesForWriter){
                //tempArticleForCategory = new Article();
                tempArticleForCategory = this.getArticleWithCategory(article);
                tempArticlesForCategory.add(tempArticleForCategory);
            }

            for(Article article : tempArticlesForCategory){
                //tempArticleForComment = new Article();
                article.setNoOfComments(this.totalComentsForArticle(article.getId()));
                tempArticlesForComment.add(article);
            }

            return  tempArticlesForComment;
        }

        @Override
        public Article getArticleWithOtherEntities(Article article) {
            Article tempArticleWithWriter;
            Article tempArticleWithCategory;
            tempArticleWithWriter = this.getArticleWithWriter(article);
            tempArticleWithCategory = this.getArticleWithCategory(tempArticleWithWriter);


            return  tempArticleWithCategory;
        }

        @Override
        public Reades getReaderByReaderIDAndArticleID(int articleID, int readerID){


            String sql = "SELECT * FROM reades WHERE readerID = " + readerID + " AND articleID = "+articleID;

            return jdbcTemplate.query(sql, new ResultSetExtractor<Reades>() {

                @Override
                public Reades extractData(ResultSet rs) throws SQLException,
                        DataAccessException {
                    if (rs.next()) {
                        Reades reades = new Reades();

                        reades.setReaderID(rs.getInt("readerID"));
                        reades.setArticleID(rs.getInt("articleID"));
                        reades.setLike(rs.getBoolean("isLike"));
                        reades.setViewed(rs.getBoolean("isViewed"));
                        reades.setRate(rs.getFloat("rate"));

                        return reades;
                    }
                    return null;
                }
            });
        }


        /*Created by Fazeel*/
        @Override
        public void saveReader(int articleID, int readerID) {

            if(getReaderByReaderIDAndArticleID(articleID,readerID) == null){
                String sql = "INSERT INTO reades(readerID, articleID, isLike, isViewed, rate) " +
                        "VALUES (?,?,?,?,?)";
                jdbcTemplate.update(sql, readerID, articleID,0,1,0);
            }

        }

        @Override
        public void updateReaderRating(Reades reades) {
            if(getReaderByReaderIDAndArticleID(reades.getArticleID(),reades.getReaderID()) != null){
                String sql = "UPDATE reades SET rate = ? "+
                        " WHERE articleID = ? AND readerID = ?";
                jdbcTemplate.update(sql, reades.getRate(),reades.getArticleID(),reades.getReaderID());

            }
        }

        @Override
        public void updateReaderLikes(Reades reades) {
            if(getReaderByReaderIDAndArticleID(reades.getArticleID(),reades.getReaderID()) != null){
                String sql = "UPDATE reades SET isLike = ? "+
                        " WHERE articleID = ? AND readerID = ?";
                jdbcTemplate.update(sql, reades.isLike(),reades.getArticleID(),reades.getReaderID());

            }
        }

        @Override
        public void updateAverageReaderRating(Reades reades) {
            if(getReaderByReaderIDAndArticleID(reades.getArticleID(),reades.getReaderID()) != null){
                int totalRating = 0;
                int totalUsers = 0;
                double averageRating = 0.0;
                totalRating = this.getTotalRatingForArticleByGroup(reades.getArticleID());
                totalUsers = this.getTotalUsersForArticleByGroup(reades.getArticleID());
                averageRating = totalRating*1.0/totalUsers;


                String sql = "UPDATE articles SET overallRating = "+ averageRating +
                        " WHERE id = " + reades.getArticleID();
                jdbcTemplate.update(sql);

            }
        }

        private int getTotalRatingForArticleByGroup(int articleID){
            String sql = "SELECT sum(rate) FROM reades WHERE  articleID = "+articleID +" GROUP BY  articleID";


            return (int) jdbcTemplate.query(sql, new ResultSetExtractor() {

                @Override
                public Object extractData(ResultSet rs) throws SQLException,
                        DataAccessException {
                    if (rs.next()) {
                        return rs.getInt(1);
                    }
                    return null;
                }
            });
        }

        private int getTotalUsersForArticleByGroup(int articleID){
            String sql = "SELECT COUNT(articleID) FROM reades WHERE  articleID = "+articleID +" GROUP BY  articleID";

            return (int) jdbcTemplate.query(sql, new ResultSetExtractor() {

                @Override
                public Object extractData(ResultSet rs) throws SQLException,
                        DataAccessException {
                    if (rs.next()) {
                        return rs.getInt(1);
                    }
                    return null;
                }
            });
        }

        @Override
        public void updateReaderLikeCountsInArticle(Reades reades) {
            if(getReaderByReaderIDAndArticleID(reades.getArticleID(),reades.getReaderID()) != null){
                int totalLikes = 0;
                totalLikes = this.getTotalLikesForArticle(reades.getArticleID());

                if(reades.isLike()){
                    totalLikes += 1;
                }else{
                    totalLikes -= 1;
                }

                String sql = "UPDATE articles SET totalLikes = "+ totalLikes +
                        " WHERE id = " + reades.getArticleID();
                jdbcTemplate.update(sql);

            }
        }

        private int getTotalLikesForArticle(int articleID)
        {
            String sql = "SELECT totalLikes FROM articles WHERE  id = "+articleID;

            return (int) jdbcTemplate.query(sql, new ResultSetExtractor() {

                @Override
                public Object extractData(ResultSet rs) throws SQLException,
                        DataAccessException {
                    if (rs.next()) {
                        return rs.getInt(1);
                    }
                    return null;
                }
            });
        }
}
