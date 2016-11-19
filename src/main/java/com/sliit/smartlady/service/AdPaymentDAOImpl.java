package com.sliit.smartlady.service;

import com.sliit.smartlady.model.AdPayment;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

/**
 * Created by USER on 11/14/2016.
 */
public class AdPaymentDAOImpl implements AdPaymentDAO{

    private JdbcTemplate jdbcTemplate;

    public AdPaymentDAOImpl(DataSource datasource)
    {
        jdbcTemplate = new JdbcTemplate(datasource);
    }

    @Override
    public List<AdPayment> getAllPayments() {
        String sql = "SELECT * FROM adpayments";
        List<AdPayment> listAdPayment = jdbcTemplate.query(sql,  new RowMapper<AdPayment>() {

            @Override
            public AdPayment mapRow(ResultSet rs, int rowNum) throws SQLException {
                //System.out.println("Get payment methd calling");

                AdPayment lAdPayment = new AdPayment();

                //System.out.println("paymentPlans is : " +rs.getString("paymentPlans"));

                lAdPayment.setId((rs.getInt("id")));
                lAdPayment.setPaymentPlans(rs.getString("paymentPlans"));
                lAdPayment.setPagePlacements(rs.getString("pagePlacements"));
                lAdPayment.setAmount(rs.getFloat("amount"));

                return lAdPayment;
            }
        });

        return listAdPayment;
    }

}
