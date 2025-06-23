package in.sp.main.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import in.sp.main.model.TodoItem;

public interface TodoItemRepository extends JpaRepository<TodoItem ,Long>{
	

}
