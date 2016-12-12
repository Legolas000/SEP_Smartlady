package com.sliit.smartlady.service.administrator;

import com.sliit.smartlady.model.administrator.ADPayment;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public class ADPaymentDAOImpl implements ADPaymentDAO {

	private JdbcTemplate jdbcTemplate;
	
	public ADPaymentDAOImpl(DataSource datasource) {
		jdbcTemplate = new JdbcTemplate(datasource);
	}

	@Override
	public void SaveOrUpdate(ADPayment adpayment) {
		if(adpayment.getID()>0)
		{
			String sql = "UPDATE adpayments SET paymentPlans = ?, pagePlacements = ?, amount = ? "+
						" WHERE id = ?";
			jdbcTemplate.update(sql, adpayment.getpaymentPlans(), adpayment.getpagePlacements(), adpayment.getAmount(), adpayment.getID());
		}
		else
		{
			String sql = "INSERT INTO adpayments(paymentPlans,pagePlacements,amount) VALUES(?, ?, ?)";
			jdbcTemplate.update(sql, adpayment.getpaymentPlans(), adpayment.getpagePlacements(), adpayment.getAmount());
		}
	}

	@Override
	public void delete(int ID) {
		// TODO Auto-generated method stub
		String sql = "DELETE FROM adpayments WHERE ID = ?";
		jdbcTemplate.update(sql, ID);
	}

	@Override
	public ADPayment findByID(int ID) {
		String sql = "SELECT * FROM adpayments WHERE id = " + ID;

		 return jdbcTemplate.query(sql, new ResultSetExtractor<ADPayment>() {
			 
		        @Override
		        public ADPayment extractData(ResultSet rs) throws SQLException,
		                DataAccessException {
		            if (rs.next()) {
		            	ADPayment adpayment = new ADPayment();
		            	
		            	adpayment.setID(rs.getInt("id"));
		            	adpayment.setpaymentPlans(rs.getString("paymentPlans"));
		            	adpayment.setpagePlacements(rs.getString("pagePlacements"));
		            	adpayment.setAmount(rs.getFloat("amount"));
		                return adpayment;
		            }
		            return null;
		        }
		    });
	}

	@Override
	public List<ADPayment> getAllADPayments() {
		String sql = "SELECT * FROM adpayments";
		List<ADPayment> listADPayment = jdbcTemplate.query(sql,  new RowMapper<ADPayment>() {
			
			@Override
			public ADPayment mapRow(ResultSet rs, int rowNum) throws SQLException {
				
				ADPayment lADPayment = new ADPayment();
				
				lADPayment.setID(rs.getInt("id"));
				lADPayment.setpaymentPlans(rs.getString("paymentPlans"));
				lADPayment.setpagePlacements(rs.getString("pagePlacements"));
				lADPayment.setAmount(rs.getFloat("amount"));
                return lADPayment;
			}
		});
		
		return listADPayment;
	}

	@Override
	public boolean isADPaymentExist(ADPayment adpayment) {
		return findByID(adpayment.getID()) != null;
	}

}
