package com.app.woofer.repository;

import com.app.woofer.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    //Basic getters using desired field as parameter, find is a keyword of JPA for SQL translation
    public List<User> findUsersByName(String name);
    public List<User> findUsersByPassword(String password);
    public User findUserByUsername(String username);
}
