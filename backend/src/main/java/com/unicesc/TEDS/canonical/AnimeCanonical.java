package com.unicesc.TEDS.canonical;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AnimeCanonical {

    private String title;
    private String status;
    private Integer score;

}
