package com.sliit.smartlady.service.administrator;

import com.sliit.smartlady.model.administrator.User;

import java.util.List;

public interface UserDAO {
	public List<User> getAllUsers();
    public User findByEmailPassword(String email, String password);
    public User findByID(int id);
    public User findByEmail(String email);
    public void saveUserRegistration(User user);
    public boolean isUserExist(User user);
    public List<User> getSpecUsers(String type);
    
    public void SaveOrUpdate(User user);
    public void delete(int userID);
    public User getMaxId();
    public void SaveImage(String imagePath);
    
    public boolean sendSubsMail();
    
//    public void sendSubsMail();
}
