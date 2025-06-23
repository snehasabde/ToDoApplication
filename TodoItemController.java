package in.sp.main.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.sp.main.Repositories.TodoItemRepository;
import in.sp.main.model.TodoItem;

@RestController
@RequestMapping("/api/todo")
@CrossOrigin(origins = "*")
public class TodoItemController {
    
    @Autowired
    private TodoItemRepository todoRepository;
    
    @GetMapping("/task")
    public List<TodoItem> getAllTodoItems() {
        return todoRepository.findAll();
    }
    
    @PostMapping("/create")
    public TodoItem createTodoItem(@RequestBody TodoItem todoItem) {
        return todoRepository.save(todoItem);
    }
    
    @PutMapping("/{id}")
    public TodoItem updateTodoItem(@PathVariable Long id, @RequestBody TodoItem todoItem) {
        TodoItem existingTodoItem = todoRepository.findById(id).orElseThrow();
        existingTodoItem.setTitle(todoItem.getTitle());
        existingTodoItem.setCompleted(todoItem.isCompleted());
        return todoRepository.save(existingTodoItem);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodoItem(@PathVariable Long id) {
        if (todoRepository.existsById(id)) {
            todoRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}


