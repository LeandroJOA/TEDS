package com.unicesc.TEDS.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serializable;

@NoArgsConstructor
@Data
@Entity(name = "users")
public class User implements Serializable {

    @Id
    private String id;
    private String username;
    private String password;
    private String role;

}
