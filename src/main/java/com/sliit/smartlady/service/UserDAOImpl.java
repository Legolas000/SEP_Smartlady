package com.sliit.smartlady.service;

import com.sliit.smartlady.model.User;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

/**
 * Created by Fazeel on 10/15/2016.
 */
public class UserDAOImpl implements UserDAO {
    private JdbcTemplate jdbcTemplate;

    public UserDAOImpl(){

    }
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
}
