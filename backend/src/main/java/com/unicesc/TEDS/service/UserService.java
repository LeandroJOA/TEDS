package com.unicesc.TEDS.service;

import com.unicesc.TEDS.domain.User;
import com.unicesc.TEDS.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User save(User user) {
        user.setId(UUID.randomUUID().toString());

        return userRepository.save(user);
    }

    public List<User> findAll() {
        List<User> users = new ArrayList<>();
        userRepository.findAll().iterator().forEachRemaining(users::add);

        return users;
    }

    public Optional<User> findById(String id) {
        return userRepository.findById(id);
    }

    public User merge(User user) {
        return userRepository.save(user);
    }

    public void delete(String id) {
        userRepository.deleteById(id);
    }

}
