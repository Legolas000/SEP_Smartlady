package com.sliit.smartlady.service.administrator;

import com.sliit.smartlady.model.administrator.Category;
import com.sliit.smartlady.model.administrator.SubCategory;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public class SubCategoryDAOImpl implements SubCategoryDAO {

	private JdbcTemplate jdbcTemplate;
	
	public SubCategoryDAOImpl(DataSource datasource) 
	{
		jdbcTemplate = new JdbcTemplate(datasource);
	}

	@Override
	public void SaveOrUpdate(SubCategory subCategory) {
		// TODO Auto-generated method stub
		
		if(subCategory.getID()>0)
		{
			String sql = "UPDATE subcategories SET subCatName = ?, subCatDescription = ? "+
						" WHERE subCatID = ?";
			jdbcTemplate.update(sql, subCategory.getsubCatName(), subCategory.getsubCatDescription(), subCategory.getID());
		}
		else
		{
			String sql = "INSERT INTO subcategories(subCatName,subCatDescription,catID) VALUES(?, ?, ?)";
			jdbcTemplate.update(sql, subCategory.getsubCatName(), subCategory.getsubCatDescription(), subCategory.getcatID());
			System.out.println("Inside inside loop");
		}
	}

	@Override
	public void delete(int subCatID) {
		String sql = "DELETE FROM subcategories WHERE subCatID = ?";
		jdbcTemplate.update(sql, subCatID);
	}

	@Override
	public SubCategory findByID(int subCatID) {
		
		String sql = "SELECT * FROM subcategories WHERE subCatID = " + subCatID;

		 return jdbcTemplate.query(sql, new ResultSetExtractor<SubCategory>() {
			 
		        @Override
		        public SubCategory extractData(ResultSet rs) throws SQLException,
		                DataAccessException {
		            if (rs.next()) {
		            	SubCategory subCategory = new SubCategory();
		            	subCategory.setID(rs.getInt("subCatID"));
		            	subCategory.setsubCatName(rs.getString("subCatName"));
		            	subCategory.setsubCatDescription(rs.getString("subCatDescription"));
		            	subCategory.setcatID(rs.getInt("catID"));
		            	return subCategory;
		            }
		            return null;
		        }
		    });
	}

	@Override
	public SubCategory findByName(String subCatName) {
		
		String sql = "SELECT * FROM subcategories WHERE subCatName = '" + subCatName + "'";

		 return jdbcTemplate.query(sql, new ResultSetExtractor<SubCategory>() {
			 
		        @Override
		        public SubCategory extractData(ResultSet rs) throws SQLException,
		                DataAccessException {
		            if (rs.next()) {
		            	SubCategory subCategory = new SubCategory();
		            	subCategory.setID(rs.getInt("subCatID"));
		            	subCategory.setsubCatName(rs.getString("subCatName"));
		            	subCategory.setsubCatDescription(rs.getString("subCatDescription"));
		            	subCategory.setcatID(rs.getInt("catID"));
		            	
		            	return subCategory;
		            }
		            return null;
		        }
		    });
	}

	@Override
	public List<SubCategory> getAllSubCategories() {
		String sql = "SELECT * FROM subcategories s,categories c WHERE s.catID = c.CatID";
		List<SubCategory> listSubCategory = jdbcTemplate.query(sql,  new RowMapper<SubCategory>() {
			
			@Override
			public SubCategory mapRow(ResultSet rs, int rowNum) throws SQLException {
				
				SubCategory lSubCategory = new SubCategory();
				Category insCat = new Category();
				
				insCat.setID(rs.getInt("catID"));
				insCat.setcatName(rs.getString("catName"));
				insCat.setcatDescription(rs.getString("catDescription"));
				
				lSubCategory.setID(rs.getInt("subCatID"));
				lSubCategory.setsubCatName(rs.getString("subCatName"));
				lSubCategory.setsubCatDescription(rs.getString("subCatDescription"));
				lSubCategory.setcatID(rs.getInt("catID"));
				lSubCategory.setCategory(insCat);
				
				return lSubCategory;
			}
		});
		
		return listSubCategory;
	}

	@Override
	public List<SubCategory> getFilteredSubCategories(int catID) {
		String sql = "SELECT * FROM subcategories sc, categories c WHERE sc.catID = c.catID AND c.catID = " + catID;
		List<SubCategory> listSubCategory = jdbcTemplate.query(sql,  new RowMapper<SubCategory>() {
			
			@Override
			public SubCategory mapRow(ResultSet rs, int rowNum) throws SQLException {
				
				SubCategory lSubCategory = new SubCategory();
				Category insCat = new Category();
				
				insCat.setID(rs.getInt("catID"));
				insCat.setcatName(rs.getString("catName"));
				insCat.setcatDescription(rs.getString("catDescription"));
				
				lSubCategory.setID(rs.getInt("subCatID"));
				lSubCategory.setsubCatName(rs.getString("subCatName"));
				lSubCategory.setsubCatDescription(rs.getString("subCatDescription"));
				lSubCategory.setcatID(rs.getInt("catID"));
				lSubCategory.setCategory(insCat);
				
				return lSubCategory;
			}
		});
		
		return listSubCategory;
	}

	@Override
	public boolean isSubCategoryExist(SubCategory subCategory)
	{
		return findByName(subCategory.getsubCatName()) != null;
	}

	@Override
	public List<Category> getExistCategories() {
		String sql = "SELECT * FROM categories WHERE catID IN (SELECT catID FROM subcategories)";
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

}
