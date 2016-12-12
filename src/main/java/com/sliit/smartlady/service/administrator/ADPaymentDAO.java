package com.sliit.smartlady.service.administrator;

import com.sliit.smartlady.model.administrator.ADPayment;

import java.util.List;

public interface ADPaymentDAO {

	public void SaveOrUpdate(ADPayment adpayment);
	
	public void delete(int ID);
	
	public ADPayment findByID(int ID);
	
	public List<ADPayment> getAllADPayments();
	
	public boolean isADPaymentExist(ADPayment adpayment);
}
