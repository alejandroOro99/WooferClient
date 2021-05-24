package com.app.woofer.service;

import com.app.woofer.model.Post;
import com.app.woofer.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostServiceImp implements PostService{

    @Autowired
    PostRepository postRepository;

    @Override
    public Post addPost(Post post) {
        return postRepository.save(post);
    }

    @Override
    public Post putPost(Post post) {
        return postRepository.save(post);
    }

    @Override
    public void remPost(Post post) {
        postRepository.delete(post);
    }

    @Override
    public void remPost(int id) {
        postRepository.deleteById(id);
    }

    @Override
    public Post getPost(int id) {
        return postRepository.findById(id).orElse(null);
    }

    @Override
    public List<Post> getByUserID(int id) {
        return postRepository.findByUserID(id);
    }

    @Override
    public List<Post> getAll() {
        return postRepository.findAll();
    }
}
