package com.example.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.AllArgsConstructor;

import com.example.demo.model.User;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin("*")
@AllArgsConstructor
public class UserController {
    private UserService userService;

    @GetMapping("/person")
    public List<User> getLeave() {
        return userService.getAllUsers();
    }

    //add
    @PostMapping("/person")
    public User addUser(@RequestBody User user) {
        return userService.save(user);
    }

    @GetMapping("/person/{id}")
    public User addLeave(@PathVariable int id) {
        return userService.getUserById(id).orElseThrow(() -> new EntityNotFoundException("Requested leave not found"));
    }
    //update
    @PutMapping("/person/{id}")
    public ResponseEntity<?> addUser(@RequestBody User userPara, @PathVariable int id) {
        if (userService.existById(id)) {
            User user = userService.getUserById(id).orElseThrow(() -> new EntityNotFoundException("Requested leave not found"));
            user.setFirstName(userPara.getFirstName());
            user.setLastName(userPara.getLastName());
            user.setNIC(userPara.getNIC());
            user.setDate(userPara.getDate());
            user.setType(userPara.getType());
            user.setAddress(userPara.getAddress());

            userService.save(user);
            return ResponseEntity.ok().body(user);

        } else {

            HashMap<String, String> message = new HashMap<>();

            message.put("message", id + "leave not found or matched");

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
        }
    }

    @DeleteMapping("/person/{id}")
    public ResponseEntity<?> deleteLeave(@PathVariable int id) {
        if (userService.existById(id)) {

            userService.delete(id);

            HashMap<String, String> message = new HashMap<>();

            message.put("message", id + " User removed");

            return ResponseEntity.status(HttpStatus.OK).body(message);

        } else {

            HashMap<String, String> message = new HashMap<>();

            message.put("message", id + "User not found or matched");

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
        }
    }


}







