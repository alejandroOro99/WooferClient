package com.app.woofer.repository;

import com.app.woofer.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    //Basic getters using desired field as parameter, find is a keyword of JPA for SQL translation
    List<User> findUsersByName(String name);
    List<User> findUsersByPassword(String password);
    User findUserByUsername(String username);
    User findUserByEmail(String email);
}
