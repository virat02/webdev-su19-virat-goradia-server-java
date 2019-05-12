package com.example.wbdvsu119serverjava.controllers;

import java.util.Arrays;
import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.wbdvsu119serverjava.models.User;

@RestController
public class UserController {
    private User[] users = {
            new User(1, "alice", "alice", "Alice", "Wonderland", "Faculty", "01-01-1990"),
            new User(2, "bob", "bob", "Bob", "The builder", "Student" , "01-05-1985"),
            new User(3, "charlier", "charlier", "Charlier", "Brown", "Admin", "06-10-1980")
    };

    private List<User> userArrayList = Arrays.asList(users);

    @GetMapping("/users")
    public User[] findAllUsers() {
        return users;
    }

    @DeleteMapping("/users/{userId}")
    public User[] deleteUser(@PathVariable("userId") int userId) {
        User u = null;
        for(User user:userArrayList) {
            if(user.getId() == userId) {
                u = user;
            }
        }
        userArrayList.remove(u);
        return users;
    }
}