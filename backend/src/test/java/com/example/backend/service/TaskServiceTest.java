package com.example.backend.service;

import com.example.backend.dto.TaskRequest;
import com.example.backend.model.Task;
import com.example.backend.repository.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("TaskService Unit Tests")
class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskService taskService;

    private Task testTask;

    @BeforeEach
    void setUp() {
        this.testTask = Task.builder()
                .id(123L)
                .title("Test Task")
                .description("Test description for test task")
                .completed(false)
                .createdAt(new Date())
                .build();
    }

    @Test
    @DisplayName("Should return all the tasks")
    void shouldGetAllTasksSuccessfully() {
        when(taskRepository.findAll()).thenReturn(List.of(testTask));

        List<Task> tasks = taskService.getAllTasks();

        assertNotNull(tasks);
        assertEquals(1, tasks.size());
        assertEquals("Test Task", tasks.get(0).getTitle());
        verify(taskRepository, times(1)).findAll();
    }

    @Test
    @DisplayName("Should return top 5 most recent tasks")
    void shouldGetRecentIncompleteTasksSuccessfully() {
        when(taskRepository.findTop5ByCompletedFalseOrderByIdDesc()).thenReturn(List.of(testTask));

        List<Task> tasks = taskService.getRecentIncompleteTasks();

        assertNotNull(tasks);
        assertFalse(tasks.get(0).getCompleted());
        verify(taskRepository, times(1)).findTop5ByCompletedFalseOrderByIdDesc();
    }

    @Test
    @DisplayName("Should return task by ID if found")
    void shouldGetTaskByIdSuccessfully() {
        when(taskRepository.findById(123L)).thenReturn(Optional.of(testTask));

        Optional<Task> found = taskService.getTaskById(123L);

        assertTrue(found.isPresent());
        assertEquals("Test Task", found.get().getTitle());
        verify(taskRepository, times(1)).findById(123L);
    }

    @Test
    @DisplayName("Should create task successfully and set completed=false")
    void shouldCreateTaskSuccessfully() {
        when(taskRepository.save(any(Task.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Task newTask = Task.builder()
                        .title("New Task")
                        .description("New task description")
                        .build();

        Task result = taskService.createTask(newTask);

        assertNotNull(result);
        assertEquals("New Task", result.getTitle());
        assertFalse(result.getCompleted());
        verify(taskRepository, times(1)).save(any(Task.class));
    }

    @Test
    @DisplayName("Should update the completed to true when a task exists")
    void shouldSuccessfullyMarkAsCompleted() {
        final Long taskId = 123L;

        when(taskRepository.findById(taskId)).thenReturn(Optional.of(testTask));
        when(taskRepository.save(any(Task.class))).thenReturn(testTask);

        Task result = taskService.markAsCompleted(taskId);

        assertTrue(result.getCompleted());
        verify(taskRepository, times(1)).findById(taskId);
        verify(taskRepository).save(any(Task.class));
    }
}