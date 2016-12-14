package com.sliit.smartlady.service.administrator;

import com.sliit.smartlady.model.administrator.Article;
import com.sliit.smartlady.model.administrator.User;
import com.sliit.smartlady.util.administrator.SendMail;
import org.jsoup.Jsoup;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public class UserDAOImpl implements UserDAO {

	private JdbcTemplate jdbcTemplate;

    public UserDAOImpl(DataSource datasource)
    {
        jdbcTemplate = new JdbcTemplate(datasource);
        
    }
    
    @Override
    public List<User> getAllUsers() {

        String sql = "SELECT * FROM user";
        List<User> listUsers = jdbcTemplate.query(sql, new RowMapper<User>() {

            @Override
            public User mapRow(ResultSet rs, int rowNum) throws SQLException {

                User user = new User();

                user.setId(rs.getInt("id"));
                user.setFullname(rs.getString("fullname"));
                user.setEmail(rs.getString("email"));
                user.setUserdescription(rs.getString("userdescription"));
                user.setUserrole(rs.getInt("userrole"));
                user.setPassword(rs.getString("password"));
                user.setAddress(rs.getString("address"));
                user.setImagePath(rs.getString("imagePath"));

                return user;
            }
        });

        return listUsers;
    }
    
    @Override
    public List<User> getSpecUsers(String type)
    {
    	String sql = "SELECT * FROM user WHERE userrole = " + type;
        List<User> listUsers = jdbcTemplate.query(sql, new RowMapper<User>() {

            @Override
            public User mapRow(ResultSet rs, int rowNum) throws SQLException {

                User user = new User();

                user.setId(rs.getInt("id"));
                user.setFullname(rs.getString("fullname"));
                user.setEmail(rs.getString("email"));
                user.setUserdescription(rs.getString("userdescription"));
                user.setUserrole(rs.getInt("userrole"));
                user.setPassword(rs.getString("password"));
                user.setAddress(rs.getString("address"));
                user.setImagePath(rs.getString("imagePath"));

                return user;
            }
        });

        return listUsers;
    }

    @Override
    public User findByEmailPassword(String email, String password) {
        String sql1 = "SELECT * FROM user WHERE email = '" + email +"' AND password = '"+ password+"'" ;

        return jdbcTemplate.query(sql1, new ResultSetExtractor<User>() {

            @Override
            public User extractData(ResultSet rs) throws SQLException,
                    DataAccessException {
                if (rs.next()) {
                    User userDto = new User();

                    userDto.setId(rs.getInt("id"));
                    userDto.setFullname(rs.getString("fullname"));
                    userDto.setEmail(rs.getString("email"));
                    userDto.setUserdescription(rs.getString("userdescription"));
                    userDto.setPassword(rs.getString("password"));
                    userDto.setUserrole(rs.getInt("userrole"));
                    userDto.setImagePath(rs.getString("imagePath"));
                    userDto.setAddress(rs.getString("address"));

                    return userDto;
                }
                return null;
            }
        });
    }

    @Override
    public User findByID(int id) {

        if(id != 0){

            String sql = "SELECT * FROM user WHERE id = " + id ;

            return jdbcTemplate.query(sql, new ResultSetExtractor<User>() {

                @Override
                public User extractData(ResultSet rs) throws SQLException,
                        DataAccessException {
                    if (rs.next()) {
                        User userDto = new User();

                        userDto.setId(rs.getInt("id"));
                        userDto.setFullname(rs.getString("fullname"));
                        userDto.setEmail(rs.getString("email"));
                        userDto.setUserdescription(rs.getString("userdescription"));
                        userDto.setPassword(rs.getString("password"));
                        userDto.setUserrole(rs.getInt("userrole"));
                        userDto.setAddress(rs.getString("address"));
                        userDto.setImagePath(rs.getString("imagePath"));

                        return userDto;
                    }
                    return null;
                }
            });
        }

        return null;
    }

    @Override
    public void saveUserRegistration(User user) {

        try{
            String sql = "INSERT INTO user(fullname,email, userdescription, address, password, userrole) " +
            //String sql = "INSERT INTO user(fullname,email,password, userrole) " +
                    "VALUES (?,?,?,?,?,?)";
            jdbcTemplate.update(sql,
                    user.getFullname(),
                    user.getEmail(),
                    user.getUserdescription(),
                    user.getAddress(),
                    user.getPassword(),
                    user.getUserrole()
            );
        }catch (Exception ex){
            System.out.println("Exception : "+ ex);
        }
    }

    @Override
    public User findByEmail(String email) {
        List<User> users = this.getAllUsers();
        for(User user : users){
            if(user.getEmail().equalsIgnoreCase(email)){
                return user;
            }
        }
        return null;
    }

    @Override
    public boolean isUserExist(User user) {
        return this.findByEmail(user.getEmail())!=null;
    }

	@Override
	public void SaveOrUpdate(User user) {
		// TODO Auto-generated method stub
		if(isUserExist(user))
		{
			String sql = "UPDATE user SET fullname = ?, email = ?, userdescription = ?, address = ?, password = ?, imagePath = ?, userrole = ?"+
						" WHERE id = ?";
			jdbcTemplate.update(sql,user.getFullname(),user.getEmail(), user.getUserdescription(), user.getAddress(), user.getPassword(), user.getImagePath(), user.getUserrole(), user.getId());
		}
		else
		{
			String sql = "INSERT INTO user(fullname,email,userdescription,address,password, userrole) VALUES(?, ?, ?, ?, ?, ?)";
			jdbcTemplate.update(sql, user.getFullname(), user.getEmail(), user.getUserdescription(), user.getAddress(), user.getPassword(), user.getUserrole());
		}
	}
	
	//get last data inserted ID in DAOimpl file
	@Override
	public User getMaxId() {
	        String sql = "SELECT MAX(id) FROM user";
	        return jdbcTemplate.query(sql, new ResultSetExtractor<User>() {

	            //@Override
	            public User extractData(ResultSet rs) throws SQLException,
	                    DataAccessException {
	                if (rs.next()) {
	                    User user = new User();
	                    user.setId(rs.getInt(1));
	                    return user;
	                }
	                return null;
	            }

	        });

    }
	@Override
	public void SaveImage(String imagePath)
	{ 
		User usr =  getMaxId();
		System.out.println("THE MAX ID IS : " + usr.getId());
        String imPath = "/static/AdminFiles/images/profile/US_01.png";
		int advID = usr.getId();
        String sql = "UPDATE user SET imagePath = ?" + " WHERE id = ?";
        jdbcTemplate.update(sql, imPath , advID);
		
	}

	@Override
	public void delete(int userID) {
		// TODO Auto-generated method stub
		String sql = "DELETE FROM user WHERE id = ?";
		jdbcTemplate.update(sql, userID);
	}
	
	@Override
	public boolean sendSubsMail()
	{
		SendMail sm = new SendMail();
		
        //Get list 
		String sql = "SELECT * FROM articles ar WHERE ar.publishedDate BETWEEN (SELECT CURDATE() + INTERVAL -1 DAY) AND CURDATE()";
        List<Article> listArticles = jdbcTemplate.query(sql, new RowMapper<Article>() {

            @Override
            public Article mapRow(ResultSet rs, int rowNum) throws SQLException {

            	Article art = new Article();
                art.setID(rs.getInt("id"));
                art.setTitle(rs.getString("title"));
                art.setDescription(rs.getString("description"));
                art.setCatID(rs.getInt("categoryId"));
                art.setcoverImagePath(rs.getString("coverImagePath"));
                return art;
            }
        });
        
        if(!listArticles.isEmpty()){
			//Get user subscriptions;
			//SELECT usr.userID, GROUP_CONCAT(DISTINCT usr.subCatID SEPARATOR ', ') ssubCatID, ut.email 
			//FROM usrsubscriptions usr, user ut
			//WHERE usr.userID = ut.id
			//GROUP BY usr.userID
	        String sql1 = "SELECT usr.userID, GROUP_CONCAT(DISTINCT usr.catID SEPARATOR ', ') cateID, ut.email FROM usrsubscriptions usr, user ut WHERE usr.userID = ut.id GROUP BY usr.userID";
	        List<UsrSubs> listUSRSubs = jdbcTemplate.query(sql1, new RowMapper<UsrSubs>() {
	
	            @Override
	            public UsrSubs mapRow(ResultSet rs, int rowNum) throws SQLException {
	
	            	UsrSubs usr = new UsrSubs();
	                usr.setUSID(rs.getInt("userID"));
	                usr.setSCID(rs.getString("cateID"));
	                usr.setEmail(rs.getString("email"));
	                return usr;
	            }
	        });
	        
	        //Email saving;
	        String email;
	        String content;
	        boolean stats = false;
	        
	        for(UsrSubs usr : listUSRSubs)
	        { 	
	        	String temp;
	        	email = usr.getEmail();
	        	content = "";
	        	for(Article ar : listArticles)
	    		{
	        		System.out.println("This is a test for availability :- "+ (usr.getSCID().contains((ar.getCatID() + ""))));
	        		if(usr.getSCID().contains((ar.getCatID() + "")))
	        		{
	        			temp =  ar.getDescription();
	        			//Get images sent-->+"<img src="+ar.getcoverImagePath().substring(1)+"\" alt="+ar.getTitle()+"\" style=\"width:304px;height:228px;\"> 
	        			content += "<h1>"+ar.getTitle()+"</h1><br/> <br/>"+ Jsoup.parse(temp).text().substring(0,100) +"....." + "<br/><br/>";
	                }
	        		System.out.println("This is the content" + content);
	    		}
	        	//if one fails all fails.
	        	stats = sm.SendTLSMail(email, content);
	        	System.out.println("Send Mail status"+ stats);
	        }
	       
	        return stats;
        }
        else
        	return false;
	}
	//Internal User Subscription Class;
	static class UsrSubs{
		int userID;
		String subCatID;
		String email;
		public UsrSubs()
		{}
		public void setUSID(int usrid)
		{
			this.userID = usrid;
		}
		public int getUSID()
		{
			return this.userID;
		}
		public void setSCID(String subCatID)
		{
			this.subCatID = subCatID;
		}
		public String getSCID()
		{
			return subCatID;
		}
		
		public String getEmail()
		{
			return this.email;
		}
		public void setEmail(String email)
		{
			this.email = email;
		}
		
		public String[] divUsID()
		{
			String[] parts = this.subCatID.split(",");
			return parts;
		}
		
	}

}
