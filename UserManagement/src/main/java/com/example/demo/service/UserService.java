package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

//import example.sam.datatransferobject.CountType;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<User> getAllUsers(){
        return userRepository.findAll();
    };

    @Transactional
    public User save(User user) {
        return userRepository.saveAndFlush(user);
    }

    @Transactional(readOnly = true)
    public boolean existById(int id) {
        return userRepository.existsById(id);

    }

    @Transactional(readOnly = true)
    public Optional<User> getUserById(int id) {
        // TODO Auto-generated method stub
        return userRepository.findById(id);
    }


    public void delete(int id) {
        // TODO Auto-generated method stub
        userRepository.deleteById(id);

    }



}




