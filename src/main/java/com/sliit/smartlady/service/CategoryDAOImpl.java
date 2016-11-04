package com.sliit.smartlady.service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;

import com.sliit.smartlady.model.Category;

public class CategoryDAOImpl implements CategoryDAO{

	private JdbcTemplate jdbcTemplate;
	
	public CategoryDAOImpl(DataSource datasource)
	{
		jdbcTemplate = new JdbcTemplate(datasource);
	}

	@Override
	public void SaveOrUpdate(Category category) {
		// TODO Auto-generated method stub
		
		if(category.getID()>0)
		{
			String sql = "UPDATE categories SET catName = ?, catDescription = ? "+
						" WHERE catID = ?";
			jdbcTemplate.update(sql, category.getcatName(), category.getcatDescription(), category.getID());
		}
		else
		{
			String sql = "INSERT INTO categories(catName,catDescription) VALUES(?, ?)";
			jdbcTemplate.update(sql, category.getcatName(), category.getcatDescription());
		}
		
	}

	@Override
	public void delete(int catID) {
		String sql = "DELETE FROM categories WHERE catID = ?";
		jdbcTemplate.update(sql, catID);
	}
	

	@Override
	public Category findByID(int catID) {
		
		String sql = "SELECT * FROM categories WHERE catID = " + catID;

		 return jdbcTemplate.query(sql, new ResultSetExtractor<Category>() {
			 
		        @Override
		        public Category extractData(ResultSet rs) throws SQLException,
		                DataAccessException {
		            if (rs.next()) {
		            	Category category = new Category();
		            	category.setID(rs.getInt("catID"));
		                category.setcatName(rs.getString("catName"));
		                category.setcatDescription(rs.getString("catDescription"));
		                return category;
		            }
		            return null;
		        }
		    });
	}
	
	@Override
	public Category findByName(String catName) {
		
		String sql = "SELECT * FROM categories WHERE catName = " + catName;

		 return jdbcTemplate.query(sql, new ResultSetExtractor<Category>() {
			 
		        @Override
		        public Category extractData(ResultSet rs) throws SQLException,
		                DataAccessException {
		            if (rs.next()) {
		            	Category category = new Category();
		            	category.setID(rs.getInt("catID"));
		                category.setcatName(rs.getString("catName"));
		                category.setcatDescription(rs.getString("catDescription"));
		                
		                System.out.println(category.getcatName());
		                
		                return category;
		            }
		            return null;
		        }
		    });
	}

	@Override
	public List<Category> getAllCategories() {
		String sql = "SELECT * FROM categories";
		List<Category> listCategory = jdbcTemplate.query(sql,  new RowMapper<Category>() {
			
			@Override
			public Category mapRow(ResultSet rs, int rowNum) throws SQLException {
				
				Category lCategory = new Category();
				
				lCategory.setID((rs.getInt("catID")));
				lCategory.setcatName(rs.getString("catName"));
				lCategory.setcatDescription(rs.getString("catDescription"));
				
				return lCategory;
			}
		});
		
		return listCategory;
	}	
	
	@Override
	public boolean isCategoryExist(Category category)
	{
		return findByName(category.getcatName()) != null;
	}
}