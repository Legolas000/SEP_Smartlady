package com.sliit.smartlady.model;

public class ADPayment {

	private int id;
	private String paymentPlans;
	private String pagePlacements;
	private float amount;
	
	public ADPayment() {
		// TODO Auto-generated constructor stub
		this.amount = 0;
	}
	
	public ADPayment(int id, String pplans, String pplacements, float amount)
	{
		this.id = id;
		this.paymentPlans = pplans;
		this.pagePlacements = pplacements;
		this.amount = amount;
	}
	
	public Boolean findByID(int id)
	{
		return id == this.id;
	}
	
	public int getID()
	{
		return this.id;
	}
	
	public void setID(int id)
	{
		this.id = id;
	}
	
	public String getpaymentPlans()
	{
		return this.paymentPlans;
	}
	
	public void setpaymentPlans(String pplans)
	{
		this.paymentPlans = pplans;
	}
	
	public String getpagePlacements()
	{
		return this.pagePlacements;
	}
	
	public void setpagePlacements(String pplacements)
	{
		this.pagePlacements = pplacements;
	}
	
	public float getAmount()
	{
		return this.amount;
	}
	
	public void setAmount(float amount)
	{
		this.amount = amount;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (!(obj instanceof ADPayment))
			return false;
		ADPayment other = (ADPayment) obj;
		if (id != other.id)
			return false;
		return true;
	}
}
