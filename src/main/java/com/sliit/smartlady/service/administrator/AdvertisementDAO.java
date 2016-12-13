package com.sliit.smartlady.service.administrator;

import com.sliit.smartlady.model.administrator.Advertisement;

import java.util.List;

public interface AdvertisementDAO {

	public List<Advertisement> getAllAdvertisements();
	
	public List<Advertisement> getFilteredAllAdvertisements(int status);
	
	public Advertisement findByID(int advID);
	
	public void updateApproval(Advertisement advertisement);
	
	public void rejectApproval(Advertisement advertisement);
	
	public void updateApprovals(Advertisement[] advertisements);//Multiple blog approvals
}
