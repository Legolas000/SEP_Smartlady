package com.sliit.smartlady.service.administrator;

import com.sliit.smartlady.model.administrator.Category;
import com.sliit.smartlady.model.administrator.SubCategory;

import java.util.List;

public interface SubCategoryDAO {

public void SaveOrUpdate(SubCategory subCategory);
	
	public void delete(int subCatID);
	
	public SubCategory findByID(int subCatID);
	
	public SubCategory findByName(String subCatName);
	
	public List<SubCategory> getAllSubCategories();
	
	public List<SubCategory> getFilteredSubCategories(int catID);
	
	public boolean isSubCategoryExist(SubCategory subCategory);
	
	public List<Category> getExistCategories();
}
