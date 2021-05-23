package com.app.woofer.model;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "comments")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "userid", referencedColumnName = "id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "postid", referencedColumnName = "id")
    private Post post;

    private int postId;
    private int userId;
    private Instant timestamp;
    private String body;
}