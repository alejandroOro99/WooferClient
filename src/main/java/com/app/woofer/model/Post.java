package com.app.woofer.model;

import com.app.woofer.model.User;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "posts")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int id;

    @ManyToOne
    @JoinColumn(name = "userID", referencedColumnName = "id")
    private User user;

    private Instant timestamp;
    @Column(insertable = false, updatable = false)
    private int userID; //delete this?
    private String body;
}
