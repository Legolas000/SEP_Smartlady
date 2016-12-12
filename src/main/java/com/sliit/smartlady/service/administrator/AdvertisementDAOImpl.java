package com.sliit.smartlady.service.administrator;

import com.sliit.smartlady.model.administrator.Advertisement;
import com.sliit.smartlady.model.administrator.User;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public class AdvertisementDAOImpl implements AdvertisementDAO {

	private JdbcTemplate jdbcTemplate;
	
	public AdvertisementDAOImpl(DataSource datasource)
	{
		jdbcTemplate = new JdbcTemplate(datasource);
	}

	@Override
	public List<Advertisement> getAllAdvertisements() {
		String sql = "SELECT *,ad.id advID,us.id usrID FROM advertisements ad, user us WHERE status = '0' AND us.id = ad.userID";
		List<Advertisement> listAdvertisement = jdbcTemplate.query(sql,  new RowMapper<Advertisement>() {
			
			@Override
			public Advertisement mapRow(ResultSet rs, int rowNum) throws SQLException {
				
				Advertisement lAdvertisement = new Advertisement();
				User insAdvert = new User();
				
				insAdvert.setFullname(rs.getString("fullname"));
				insAdvert.setEmail(rs.getString("email"));
				insAdvert.setAddress(rs.getString("address"));
				insAdvert.setUserdescription(rs.getString("userdescription"));
				
				lAdvertisement.setID((rs.getInt("advID")));
				lAdvertisement.setDescription(rs.getString("description"));
				lAdvertisement.setPublishedDate(rs.getString("publishedDate"));
				lAdvertisement.setExpiryDate(rs.getString("expiryDate"));
				lAdvertisement.setPayment(rs.getFloat("payment"));
				lAdvertisement.setURL(rs.getString("url"));
				lAdvertisement.setStatus(rs.getString("status"));
				lAdvertisement.setUser(insAdvert);
				
				
				
				return lAdvertisement;
			}
		});
		
		return listAdvertisement;
	}
	
	@Override
	public List<Advertisement> getFilteredAllAdvertisements(int status)
	{
		String sql = "SELECT *,ad.id advID,us.id usrID FROM advertisements ad, user us WHERE us.id = ad.userID AND  status = " + status;
		List<Advertisement> listAdvertisement = jdbcTemplate.query(sql,  new RowMapper<Advertisement>() {
			
			@Override
			public Advertisement mapRow(ResultSet rs, int rowNum) throws SQLException {
				
				Advertisement lAdvertisement = new Advertisement();
				User insAdvert = new User();

				insAdvert.setFullname(rs.getString("fullname"));
				insAdvert.setEmail(rs.getString("email"));
				insAdvert.setAddress(rs.getString("address"));
				insAdvert.setUserdescription(rs.getString("userdescription"));

				lAdvertisement.setID((rs.getInt("advID")));
				lAdvertisement.setDescription(rs.getString("description"));
				lAdvertisement.setPublishedDate(rs.getString("publishedDate"));
				lAdvertisement.setExpiryDate(rs.getString("expiryDate"));
				lAdvertisement.setPayment(rs.getFloat("payment"));
				lAdvertisement.setURL(rs.getString("url"));
				lAdvertisement.setStatus(rs.getString("status"));
				lAdvertisement.setUser(insAdvert);
				
				return lAdvertisement;
			}
		});
		
		return listAdvertisement;
	}

	@Override
	public Advertisement findByID(int advID) {
		String sql = "SELECT * FROM advertisements WHERE advID = " + advID;

		 return jdbcTemplate.query(sql, new ResultSetExtractor<Advertisement>() {
			 
		        @Override
		        public Advertisement extractData(ResultSet rs) throws SQLException,
		                DataAccessException {
		            if (rs.next()) {
		            	Advertisement advertisement = new Advertisement();
		            	advertisement.setID((rs.getInt("advID")));
		            	advertisement.setDescription(rs.getString("description"));
		            	advertisement.setPublishedDate(rs.getString("published_date"));
		            	advertisement.setExpiryDate(rs.getString("expiry_date"));
		            	advertisement.setPayment(rs.getFloat("payment"));
		            	advertisement.setURL(rs.getString("url"));
		            	advertisement.setStatus(rs.getString("status"));
		            	
		                return advertisement;
		            }
		            return null;
		        }
		    });
	}

	@Override
	public void updateApproval(Advertisement advertisement) {
		String sql = "UPDATE advertisements SET status = '1' "+
				" WHERE advID = ?";
		jdbcTemplate.update(sql, advertisement.getID());
	}
	
	@Override
	public void rejectApproval(Advertisement advertisement) {
		String sql = "UPDATE advertisements SET status = '2' "+
				" WHERE advID = ?";
		jdbcTemplate.update(sql, advertisement.getID());
	}

	@Override
	public void updateApprovals(Advertisement[] advertisements) {
		// TODO Auto-generated method stub
		
	}

}
