package com.app.woofer.controller;

import com.app.woofer.model.Post;
import com.app.woofer.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5500") //angular running on port 5500
@RestController
public class PostController {

    @Autowired
    PostService postService;

    @PostMapping("/post")
    public Post addPost(@RequestBody Post post){
        return postService.addPost(post);
    }

    @PutMapping("/post")
    public Post putPost(@RequestBody Post post){
        return postService.putPost(post);
    }

    @DeleteMapping("/post")
    public void remPost(@RequestBody Post post){
        postService.remPost(post);
    }

    @DeleteMapping("/post/{id}")
    public void remPost(@PathVariable int id){
        postService.remPost(id);
    }

    @GetMapping("/post/{id}")
    public Post getPost(@RequestBody int id){
        return postService.getPost(id);
    }

    @GetMapping("/posts/user/{id}")
    public List<Post> getPostsByUser(@RequestBody int id){
        return postService.getByUserID(id);
    }

    @GetMapping("/posts")
    public List<Post> GetAllPosts(){
        return postService.getAll();
    }
}
