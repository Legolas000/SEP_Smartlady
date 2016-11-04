package com.sliit.smartlady.service;

import java.util.List;

import com.sliit.smartlady.model.SubCategory;

public interface SubCategoryDAO {

public void SaveOrUpdate(SubCategory subCategory);
	
	public void delete(int subCatID);
	
	public SubCategory findByID(int subCatID);
	
	public SubCategory findByName(String subCatName);
	
	public List<SubCategory> getAllCategories();
	
	public List<SubCategory> getFilteredSubCategories(int catID);
	
	public boolean isCategoryExist(SubCategory subCategory);
}
