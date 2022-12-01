package com.unicesc.TEDS.controller;

import com.unicesc.TEDS.canonical.UserCanonical;
import com.unicesc.TEDS.domain.User;
import com.unicesc.TEDS.service.UserService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User save(@RequestBody UserCanonical canonical) {
        User user = new User();
        BeanUtils.copyProperties(canonical, user);
        userService.save(user);

        return user;
    }

    @GetMapping
    public List<User> findAll() {
        return userService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity findById(@PathVariable String id) {
        Optional<User> optional = userService.findById(id);

        return optional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity merge(@PathVariable String id, @RequestBody UserCanonical canonical) {
        Optional<User> optional = userService.findById(id);

        if (optional.isEmpty()) {
            Map<String, Object> body = new HashMap<>();
            body.put("message", "ID [" + id + "] não encotrado!");

            return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
        }

        User user = optional.get();
        user.setPassword(canonical.getPassword());
        user.setRole(canonical.getRole());

        return new ResponseEntity<>(userService.merge(user), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable String id) {
        userService.delete(id);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
