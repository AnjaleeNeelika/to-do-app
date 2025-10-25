package com.example.backend.repository;

import com.example.backend.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    // Get top 5 not completed tasks
    List<Task> findTop5TasksByCompletedFalseOrderByIdDesc();
}
