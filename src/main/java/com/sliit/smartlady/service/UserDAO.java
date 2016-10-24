package com.sliit.smartlady.service;

import com.sliit.smartlady.model.User;

import java.util.List;

/**
 * Created by Fazeel on 10/15/2016.
 */
public interface UserDAO {
    public List<User> getAllUsers();
    public  User findByEmailPassword(String email, String password);
    public User findByID(int id);
    public User findByEmail(String email);
    public void saveUserRegistration(User user);
    public boolean isUserExist(User user);
}
