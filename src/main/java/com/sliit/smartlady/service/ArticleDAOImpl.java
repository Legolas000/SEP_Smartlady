package com.sliit.smartlady.service;

import com.sliit.smartlady.model.Article;
import com.sliit.smartlady.model.User;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

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
		String sql = "SELECT * FROM articles WHERE status = 'Pending' ";
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

	@Override
	public Article findByID(int articleID) {
		System.out.println("findByID.articleID : " + articleID);
		String sql = "SELECT * FROM articles WHERE id = " + articleID;

		 return jdbcTemplate.query(sql, new ResultSetExtractor<Article>() {
			 
		        @Override
		        public Article extractData(ResultSet rs) throws SQLException,
		                DataAccessException {
		            if (rs.next()) {
		            	Article article = new Article();

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

						return article;
		            }
		            return null;
		        }
		    });
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
		Article tempArticleForW;
		Article tempArticleForC;
		for(Article article : articles){
			//tempArticleForW = new Article();
			tempArticleForW = this.getArticleWithWriter(article);
			tempArticlesForWriter.add(tempArticleForW);
		}


		for(Article article : tempArticlesForWriter){
			//tempArticleForC = new Article();
			tempArticleForC = this.getArticleWithCategory(article);
			tempArticlesForCategory.add(tempArticleForC);

		}

		return  tempArticlesForCategory;
	}

	@Override
	public Article getArticleWithOtherEntities(Article article) {

		article = this.getArticleWithWriter(article);
		article = this.getArticleWithCategory(article);

		System.out.println("1.1 Writer Name : " + article.getUserAsWriter().getFullname());
		System.out.println("1.2 Categoty Name : " + article.getCategory().getCatName());

		return  article;
	}
}
