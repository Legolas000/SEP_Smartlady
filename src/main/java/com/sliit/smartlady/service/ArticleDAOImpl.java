package com.sliit.smartlady.service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;

import com.sliit.smartlady.model.Article;

public class ArticleDAOImpl implements ArticleDAO{

	private JdbcTemplate jdbcTemplate;
	
	public ArticleDAOImpl(DataSource datasource)
	{
		jdbcTemplate = new JdbcTemplate(datasource);
	}

	@Override
	public List<Article> getAllArticles() {
		String sql = "SELECT * FROM articles WHERE status = 'Pending' ";
		List<Article> listArticle = jdbcTemplate.query(sql,  new RowMapper<Article>() {
			
			@Override
			public Article mapRow(ResultSet rs, int rowNum) throws SQLException {
				
				Article lArticle = new Article();
				
				lArticle.setID((rs.getInt("artID")));
				lArticle.setTitle(rs.getString("title"));
				lArticle.setDescription(rs.getString("description"));
				lArticle.setStatus(rs.getString("status"));
				
				return lArticle;
			}
		});
		
		return listArticle;
	}

	@Override
	public Article findByID(int artID) {
		
		String sql = "SELECT * FROM articles WHERE artID = " + artID;

		 return jdbcTemplate.query(sql, new ResultSetExtractor<Article>() {
			 
		        @Override
		        public Article extractData(ResultSet rs) throws SQLException,
		                DataAccessException {
		            if (rs.next()) {
		            	Article article = new Article();
		            	article.setID(rs.getInt("artID"));
		            	article.setTitle(rs.getString("title"));
		            	article.setDescription(rs.getString("description"));
		            	article.setStatus(rs.getString("status"));
		            	
		                return article;
		            }
		            return null;
		        }
		    });
	}
	
	@Override
	public void updateStatus(Article article) {
		String sql = "UPDATE articles SET status = 'Approved' "+
				" WHERE artID = ?";
		jdbcTemplate.update(sql, article.getID());
	}

	@Override
	public void updateStatuses(Article[] article) {
		// TODO Auto-generated method stub
		
	}

}
