package com.sliit.smartlady.service;

import com.sliit.smartlady.model.Advertisement;

import java.util.List;

public interface AdvertisementDAO {

	public void SaveOrUpdate(Advertisement advertisement);

	public List<Advertisement> getAllAdvertisements();

	public Advertisement findByID(int advID);

	public void updateApproval(Advertisement advertisement);

	public void updateApprovals(Advertisement[] advertisements);//Multiple blog approvals
}
