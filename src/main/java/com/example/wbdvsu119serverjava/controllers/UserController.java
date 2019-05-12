package com.example.wbdvsu119serverjava.controllers;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.wbdvsu119serverjava.models.User;

@RestController
public class UserController {

    List<User> users = new ArrayList<>();

    User alice = new User(1, "alice", "alice", "Alice", "Wonderland", "Faculty", "01-01-1990");
    User bob = new User(2, "bob", "bob", "Bob", "The builder", "Student" , "01-05-1985");
    User charlier = new User(3, "charlier", "charlier", "Charlier", "Brown", "Admin", "06-10-1980");

    @GetMapping("/users")
    public List<User> findAllUsers() {
        users.add(alice);
        users.add(bob);
        users.add(charlier);
        return users;
    }

    @PostMapping("/users")
    public List<User> createUser(User user) {
        users.add(user);
        return users;
    }

    @GetMapping("/user/{userId}")
    public User findUserById(@PathVariable("userId") Integer id) {
        for(User user: users) {
            if(id == user.getId().intValue())
                return user;
        }
        return null;
    }

    @DeleteMapping("/delete/user/{userId}")
    public List<User> deleteUser(@PathVariable("userId") Integer id) {
//        for(User user: users) {
//            if(id == user.getId().intValue())
//                users.remove(user);
//        }

        for(Iterator<User> u = users.iterator(); u.hasNext();) {
            User user = u.next();

            if(id == user.getId().intValue())
                u.remove();
        }

        return users;
    }
}