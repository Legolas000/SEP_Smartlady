package com.sliit.smartlady.service.administrator;

import com.sliit.smartlady.model.administrator.Category;

import java.util.List;

public interface CategoryDAO {
	
	public void SaveOrUpdate(Category category);
	
	public void delete(int catID);
	
	public Category findByID(int catID);
	
	public Category findByName(String catName);
	
	public List<Category> getAllCategories();
	
	public boolean isCategoryExist(Category category);
	
}
