package com.sliit.smartlady.service.administrator;

import com.sliit.smartlady.model.administrator.Article;
import com.sliit.smartlady.model.administrator.User;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public class ArticleDAOImpl implements ArticleDAO{

	private JdbcTemplate jdbcTemplate;
	
	public ArticleDAOImpl(DataSource datasource)
	{
		jdbcTemplate = new JdbcTemplate(datasource);
	}

	@Override
	public List<Article> getAllArticles() {
		String sql = "SELECT * FROM articles ar,user us WHERE status = '0' AND us.id = ar.writerID";
		List<Article> listArticle = jdbcTemplate.query(sql,  new RowMapper<Article>() {
			
			@Override
			public Article mapRow(ResultSet rs, int rowNum) throws SQLException {
				
				Article lArticle = new Article();
				User insWriter = new User();
				
				insWriter.setFullname(rs.getString("fullname"));
				insWriter.setEmail(rs.getString("email"));
				insWriter.setAddress(rs.getString("address"));
				insWriter.setUserdescription(rs.getString("userdescription"));
				
				
				lArticle.setID((rs.getInt("id")));
				lArticle.setTitle(rs.getString("title"));
				lArticle.setDescription(rs.getString("description"));
				lArticle.setStatus(rs.getString("status"));
				lArticle.setWriter(insWriter);
				
				
				return lArticle;
			}
		});
		
		return listArticle;
	}
	
	@Override
	public List<Article> getFilteredArticles(int status)
	{
		String sql = "SELECT * FROM articles ar,user us WHERE us.id = ar.writerID AND status = " + status;
		List<Article> listArticle = jdbcTemplate.query(sql,  new RowMapper<Article>() {
			
			@Override
			public Article mapRow(ResultSet rs, int rowNum) throws SQLException {
				
				Article lArticle = new Article();
				User insWriter = new User();
				
				insWriter.setFullname(rs.getString("fullname"));
				insWriter.setEmail(rs.getString("email"));
				insWriter.setAddress(rs.getString("address"));
				insWriter.setUserdescription(rs.getString("userdescription"));
				
				lArticle.setID((rs.getInt("id")));
				lArticle.setTitle(rs.getString("title"));
				lArticle.setDescription(rs.getString("description"));
				lArticle.setStatus(rs.getString("status"));
				lArticle.setWriter(insWriter);
				
				return lArticle;
			}
		});
		
		return listArticle;
	}

	@Override
	public Article findByID(int artID) {
		
		String sql = "SELECT * FROM articles WHERE status = '0' and id = " + artID;

		 return jdbcTemplate.query(sql, new ResultSetExtractor<Article>() {
			 
		        @Override
		        public Article extractData(ResultSet rs) throws SQLException,
		                DataAccessException {
		            if (rs.next()) {
		            	Article article = new Article();
		            	article.setID(rs.getInt("id"));
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
		String sql = "UPDATE articles SET status = '1' "+
				" WHERE id = ?";
		jdbcTemplate.update(sql, article.getID());
	}
	
	@Override
	public void rejectStatus(Article article) {
		String sql = "UPDATE articles SET status = '2' "+
				" WHERE id = ?";
		jdbcTemplate.update(sql, article.getID());
	}

	@Override
	public void updateStatuses(Article[] article) {
		// TODO Auto-generated method stub
		
	}

}
