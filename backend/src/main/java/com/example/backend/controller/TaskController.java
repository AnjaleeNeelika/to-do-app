package com.example.backend.controller;

import com.example.backend.dto.TaskRequest;
import com.example.backend.model.Task;
import com.example.backend.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    // GET ALL TASKS
    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks() {
        return ResponseEntity.ok(taskService.getAllTasks());
    }

    // GET MOST RECENT INCOMPLETE TASKS
    @GetMapping("/recent-tasks")
    public ResponseEntity<List<Task>> getRecentIncompleteTasks() {
        return ResponseEntity.ok(taskService.getRecentIncompleteTasks());
    }

    // CREATE A NEW TASK
    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody TaskRequest request) {
        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setCompleted(false);

        Task newTask = taskService.createTask(task);

        return new ResponseEntity<>(newTask, HttpStatus.CREATED);
    }

    // MARK A TASK AS COMPLETED
    @PatchMapping("/{id}/complete")
    public ResponseEntity<Task> markAsCompleted(@PathVariable Long id) {
        Task updatedTask = taskService.markAsCompleted(id);
        return new ResponseEntity<>(updatedTask, HttpStatus.OK);
    }
}
