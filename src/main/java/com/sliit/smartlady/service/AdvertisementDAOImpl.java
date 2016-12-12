package com.sliit.smartlady.service;

import com.sliit.smartlady.model.AdPayment;
import com.sliit.smartlady.model.Advertisement;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;

import javax.sql.DataSource;
import java.io.InputStream;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.sql.Statement;
//import java.sql.queryForInt;

import java.io.File;

public class AdvertisementDAOImpl implements AdvertisementDAO{

	private JdbcTemplate jdbcTemplate;

	public AdvertisementDAOImpl(DataSource datasource)
	{
		jdbcTemplate = new JdbcTemplate(datasource);
	}

	@Override
	public int SaveOrUpdate(Advertisement advertisement) {
		// TODO Auto-generated method stub

		if(advertisement.getId()>0)
		{
			String sql = "UPDATE advertisements SET url = ?, description = ?, expiryDate = ?, place = ?, payment = ?"+
					" WHERE id = ?";
			jdbcTemplate.update(sql, advertisement.getUrl(), advertisement.getDescription(), advertisement.getExpiryDate(), advertisement.getPlace(), advertisement.getPayment(), advertisement.getId());
			return 0;
		}
		else {
			String sql = "INSERT INTO advertisements(id, description, publishedDate, expiryDate, url, payment, status, place, categoryID)" + "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
			jdbcTemplate.update(sql, advertisement.getId(), advertisement.getDescription(), advertisement.getPublishedDate(), advertisement.getExpiryDate(), advertisement.getUrl(), advertisement.getPayment(), advertisement.getStatus(), advertisement.getPlace(), advertisement.getCategoryID()); //,Statement.RETURN_GENERATED_KEYS);

			int a = 0;
			return a;
		}
	}

	@Override
	public List<Advertisement> getAllAdvertisements() {
		String sql = "SELECT * FROM advertisements";
		List<Advertisement> listAdvertisement = jdbcTemplate.query(sql,  new RowMapper<Advertisement>() {

			@Override
			public Advertisement mapRow(ResultSet rs, int rowNum) throws SQLException {

				Advertisement lAdvertisement = new Advertisement();

				lAdvertisement.setId((rs.getInt("id")));
				lAdvertisement.setImagePath(rs.getString("imagePath"));
				lAdvertisement.setDescription(rs.getString("description"));
				lAdvertisement.setPublishedDate(rs.getString("publishedDate"));
				lAdvertisement.setExpiryDate(rs.getString("expiryDate"));
				lAdvertisement.setPayment(rs.getFloat("payment"));
				lAdvertisement.setUrl(rs.getString("url"));
				lAdvertisement.setStatus(rs.getInt("status"));

				return lAdvertisement;
			}
		});

		return listAdvertisement;
	}

	@Override
	public Advertisement findByID(int advID) {
		String sql = "SELECT * FROM advertisements WHERE id = " + advID;

		return jdbcTemplate.query(sql, new ResultSetExtractor<Advertisement>() {

			@Override
			public Advertisement extractData(ResultSet rs) throws SQLException,
					DataAccessException {
				if (rs.next()) {
					Advertisement advertisement = new Advertisement();
					advertisement.setId(rs.getInt("id"));
					advertisement.setImagePath(rs.getString("imagePath"));
					advertisement.setDescription(rs.getString("description"));
					advertisement.setPublishedDate(rs.getString("publishedDate"));
					advertisement.setExpiryDate(rs.getString("expiryDate"));
					advertisement.setPayment(rs.getFloat("payment"));
					advertisement.setUrl(rs.getString("url"));
					advertisement.setStatus(rs.getInt("status"));
					advertisement.setPlace(rs.getString("place"));

					return advertisement;
				}
				return null;
			}
		});
	}

	@Override
	public void updateApproval(Advertisement advertisement) {
		/*String sql = "UPDATE advertisements SET status = 'Approved' "+
				" WHERE advID = ?";
		jdbcTemplate.update(sql, advertisement.getID());*/
	}

	@Override
	public void updateApprovals(Advertisement[] advertisements) {
		// TODO Auto-generated method stub

	}

	private Advertisement getMaxId() {
		String sql = "SELECT MAX(id) FROM advertisements";
		return jdbcTemplate.query(sql, new ResultSetExtractor<Advertisement>() {

			//@Override
			public Advertisement extractData(ResultSet rs) throws SQLException,
					DataAccessException {
				if (rs.next()) {
					Advertisement advertisement = new Advertisement();
					advertisement.setId(rs.getInt(1));
					return advertisement;
				}
				return null;
			}

		});

	}

	@Override
	public void saveImage(String filepath) {
		Advertisement advs =  getMaxId();
		int advID = advs.getId();
		String sql = "UPDATE advertisements SET imagePath = ?" + " WHERE id = ?";
		jdbcTemplate.update(sql, filepath , advID);
	}

	@Override
	public List<Advertisement> getAllAdvertisementsOrderByPrice() {
		String sql = "SELECT * FROM advertisements WHERE status = 'Y' ORDER BY payment DESC ";
		List<Advertisement> listAdvertisement = jdbcTemplate.query(sql,  new RowMapper<Advertisement>() {

			@Override
			public Advertisement mapRow(ResultSet rs, int rowNum) throws SQLException {

				Advertisement lAdvertisement = new Advertisement();

				lAdvertisement.setId((rs.getInt("id")));
				lAdvertisement.setImagePath(rs.getString("imagePath"));
				lAdvertisement.setDescription(rs.getString("description"));
				lAdvertisement.setPublishedDate(rs.getString("publishedDate"));
				lAdvertisement.setExpiryDate(rs.getString("expiryDate"));
				lAdvertisement.setUrl(rs.getString("url"));
				lAdvertisement.setPayment(rs.getFloat("payment"));
				lAdvertisement.setPlace(rs.getString("place"));
				lAdvertisement.setStatus(rs.getInt("status"));
				lAdvertisement.setCategoryID(rs.getInt("categoryID"));

				return lAdvertisement;
			}
		});

		return listAdvertisement;
	}

	@Override
	public List<Advertisement> getAllAdvertisementsByCategoryIDOrderByPrice(int categoryID) {
		String sql = "SELECT * FROM advertisements WHERE status = 'Y' AND " +
				"categoryID = "+ categoryID +"  ORDER BY payment DESC ";
		List<Advertisement> listAdvertisement = jdbcTemplate.query(sql,  new RowMapper<Advertisement>() {

			@Override
			public Advertisement mapRow(ResultSet rs, int rowNum) throws SQLException {

				Advertisement lAdvertisement = new Advertisement();

				lAdvertisement.setId((rs.getInt("id")));
				lAdvertisement.setImagePath(rs.getString("imagePath"));
				lAdvertisement.setDescription(rs.getString("description"));
				lAdvertisement.setPublishedDate(rs.getString("publishedDate"));
				lAdvertisement.setExpiryDate(rs.getString("expiryDate"));
				lAdvertisement.setUrl(rs.getString("url"));
				lAdvertisement.setPlace(rs.getString("place"));
				lAdvertisement.setPayment(rs.getFloat("payment"));
				lAdvertisement.setStatus(rs.getInt("status"));
				lAdvertisement.setCategoryID(rs.getInt("categoryID"));

				return lAdvertisement;
			}
		});

		return listAdvertisement;
	}
}
