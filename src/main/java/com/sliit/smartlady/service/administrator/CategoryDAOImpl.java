package com.sliit.smartlady.service.administrator;

import com.sliit.smartlady.model.administrator.Category;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public class CategoryDAOImpl implements CategoryDAO{

	private JdbcTemplate jdbcTemplate;
	
	public CategoryDAOImpl(DataSource datasource)
	{
		jdbcTemplate = new JdbcTemplate(datasource);
	}

	@Override
	public void SaveOrUpdate(Category category) {
		// TODO Auto-generated method stub
		int status = 0;
		if(category.getID()>0)
		{
			String sql = "UPDATE categories SET catName = ?, catDescription = ? "+
						" WHERE id = ?";
			status = jdbcTemplate.update(sql, category.getcatName(), category.getcatDescription(), category.getID());
		}
		else
		{
			String sql = "INSERT INTO categories(catName,catDescription) VALUES(?, ?)";
			status = jdbcTemplate.update(sql, category.getcatName(), category.getcatDescription());
		}		
	}

	@Override
	public void delete(int id) {
		String sql = "DELETE FROM categories WHERE id = ?";
		jdbcTemplate.update(sql, id);
	}
	

	@Override
	public Category findByID(int id) {
		
		String sql = "SELECT * FROM categories WHERE id = " + id;

		 return jdbcTemplate.query(sql, new ResultSetExtractor<Category>() {
			 
		        @Override
		        public Category extractData(ResultSet rs) throws SQLException,
		                DataAccessException {
		            if (rs.next()) {
		            	Category category = new Category();
		            	category.setID(rs.getInt("id"));
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
		
		String sql = "SELECT * FROM categories WHERE catName = '" + catName + "'";

		 return jdbcTemplate.query(sql, new ResultSetExtractor<Category>() {
			 
		        @Override
		        public Category extractData(ResultSet rs) throws SQLException,
		                DataAccessException {
		            if (rs.next()) {
		            	Category category = new Category();
		            	category.setID(rs.getInt("id"));
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
				
				lCategory.setID((rs.getInt("id")));
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