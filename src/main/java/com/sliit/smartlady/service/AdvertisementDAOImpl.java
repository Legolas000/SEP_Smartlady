package com.sliit.smartlady.service;

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

import java.io.File;

public class AdvertisementDAOImpl implements AdvertisementDAO{

	private JdbcTemplate jdbcTemplate;

	public AdvertisementDAOImpl(DataSource datasource)
	{
		jdbcTemplate = new JdbcTemplate(datasource);
	}

	@Override
	public void SaveOrUpdate(Advertisement advertisement) {
		// TODO Auto-generated method stub

        /*if(category.getID()>0)
        {
            String sql = "UPDATE categories SET catName = ?, catDescription = ? "+
                    " WHERE catID = ?";
            jdbcTemplate.update(sql, category.getcatName(), category.getcatDescription(), category.getID());
        }
        else*/

        /*public String uploadFile(
        	@FormDataParam("file")InputStream uploadInputStream,
			@FormDataParam("file") FormDataContentDisposition fileDetail)\{

		}*/

		System.out.println("save method in implementation "+advertisement.getDescription());
		String sql = "INSERT INTO advertisements(id, description, publishedDate, expiryDate, url, payment, status)" + "VALUES (?, ?, ?, ?, ?, ?, ?)";
		jdbcTemplate.update(sql, advertisement.getId(), advertisement.getDescription(), advertisement.getPublishedDate(), advertisement.getExpiryDate(), advertisement.getUrl(), advertisement.getPayment(), advertisement.getStatus());
		System.out.println("save method in implementation bottom "+advertisement);

	}



	@Override
	public List<Advertisement> getAllAdvertisements() {
		String sql = "SELECT * FROM advertisements";
		List<Advertisement> listAdvertisement = jdbcTemplate.query(sql,  new RowMapper<Advertisement>() {

			@Override
			public Advertisement mapRow(ResultSet rs, int rowNum) throws SQLException {

				Advertisement lAdvertisement = new Advertisement();

				lAdvertisement.setId((rs.getInt("id")));
				lAdvertisement.setDescription(rs.getString("description"));
				lAdvertisement.setPublishedDate(rs.getString("publishedDate"));
				lAdvertisement.setExpiryDate(rs.getString("expiryDate"));
				lAdvertisement.setPayment(rs.getFloat("payment"));
				lAdvertisement.setUrl(rs.getString("url"));
				lAdvertisement.setStatus(rs.getString("status"));

				return lAdvertisement;
			}
		});

		return listAdvertisement;
	}

	@Override
	public Advertisement findByID(int advID) {
		/*String sql = "SELECT * FROM advertisements WHERE advID = " + advID;

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
				}*//*
				return null;
			}
		});*/
		return null;
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

}
