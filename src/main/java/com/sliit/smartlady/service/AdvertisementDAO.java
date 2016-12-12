package com.sliit.smartlady.service;

import com.sliit.smartlady.model.Advertisement;

import java.util.List;

public interface AdvertisementDAO {

	public int SaveOrUpdate(Advertisement advertisement);

	public List<Advertisement> getAllAdvertisements();

	public Advertisement findByID(int advID);

	public void updateApproval(Advertisement advertisement);

	public void updateApprovals(Advertisement[] advertisements);//Multiple blog approvals

	public void saveImage(String filepath);

	public List<Advertisement> getAllAdvertisementsOrderByPrice();

	public List<Advertisement> getAllAdvertisementsByCategoryIDOrderByPrice(int  categoryID);

}
