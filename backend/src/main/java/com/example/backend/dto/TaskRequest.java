package com.example.backend.dto;

import lombok.Data;

@Data
public class TaskRequest {
    private String title;
    private String description;
}
