package com.unicesc.TEDS.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serializable;

@NoArgsConstructor
@Data
@Entity(name = "animes")
public class Anime implements Serializable {

    @Id
    private String id;
    private String title;
    private String status;
    private Integer score;

}
