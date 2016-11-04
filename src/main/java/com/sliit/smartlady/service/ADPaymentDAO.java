package com.sliit.smartlady.service;

import java.util.List;

import com.sliit.smartlady.model.ADPayment;

public interface ADPaymentDAO {

	public void SaveOrUpdate(ADPayment adpayment);
	
	public void delete(int ID);
	
	public ADPayment findByID(int ID);
	
	public List<ADPayment> getAllADPayments();
	
	public boolean isADPaymentExist(ADPayment adpayment);
}
