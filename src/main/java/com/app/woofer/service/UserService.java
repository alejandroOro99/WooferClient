package com.app.woofer.service;

import com.app.woofer.model.User;

import java.util.List;

public interface UserService {
    //Basic CRUD methods
    User addUser(User user);
    User updateUser(User user);
    void removeUser(int id);
    List<User> getUsersByName(String firstName);
    User getUserByUsername(String username);
    List<User> getUsersByPassword(String password);
    User getUserById(int id);
    User getUserByEmail(String email);
    boolean login(User user);
}

