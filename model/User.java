package com.app.woofer.model;

import javax.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int id;

    private String username;
    private String password;
    private String name;
    private String email;
    private String dob;
    @Column(length = 10)
    private String phone;
}