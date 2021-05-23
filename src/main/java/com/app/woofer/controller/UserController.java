package com.app.woofer.controller;

import com.app.woofer.model.User;
import com.app.woofer.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5500") //angular running on port 5500
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    //GET requests
    @GetMapping("/user/username/{username}")
    public User getUserByUsername(@PathVariable String username) {
        return userService.getUserByUsername(username);
    }

    @GetMapping("/user/password/{password}")
    public List<User> getUsersByPassword(@PathVariable String password) {
        return userService.getUsersByPassword(password);
    }

    @GetMapping("/user/name/{name}")
    public List<User> getUsersByName(@PathVariable String name) {
        return userService.getUsersByName(name);
    }

    @GetMapping("/user/{id}")
    public User getUserById(@PathVariable int id) {
        return userService.getUserById(id);
    }

    //POST requests
    @PostMapping("/user/add")
    public User addUser(@RequestBody User user) {
        return userService.addUser(user);
    }

    //DELETE requests
    @DeleteMapping("/user/delete")
    public void removeUser(@RequestBody User user) {
        userService.removeUser(user);
    }



}
