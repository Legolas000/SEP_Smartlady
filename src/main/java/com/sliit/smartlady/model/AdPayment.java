package com.sliit.smartlady.model;

/**
 * Created by USER on 11/14/2016.
 */
public class AdPayment {

    private int id;
    private String paymentPlans;
    private String pagePlacements;
    private float amount;

    public AdPayment(){
        this.id = 0;
    }

    public AdPayment(int id, String paymentPlans, String pagePlacements, float amount)
    {
        this.id = id;
        this.paymentPlans = paymentPlans;
        this.pagePlacements = pagePlacements;
        this.amount = amount;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPaymentPlans() {
        return paymentPlans;
    }

    public void setPaymentPlans(String paymentPlans) {
        this.paymentPlans = paymentPlans;
    }

    public String getPagePlacements() {
        return pagePlacements;
    }

    public void setPagePlacements(String pagePlacements) {
        this.pagePlacements = pagePlacements;
    }

    public float getAmount() {
        return amount;
    }

    public void setAmount(float amount) {
        this.amount = amount;
    }

}
