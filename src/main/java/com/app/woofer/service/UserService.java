package com.app.woofer.service;

import com.app.woofer.model.User;

import java.util.List;

public interface UserService {
    //Basic CRUD methods
    public User addUser(User user);
    public User updateUser(User user);
    public void removeUser(User user);
    public List<User> getUsersByName(String firstName);
    public User getUserByUsername(String username);
    public List<User> getUsersByPassword(String password);
    public User getUserById(int id);
}

