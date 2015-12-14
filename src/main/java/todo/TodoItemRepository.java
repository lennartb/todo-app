package todo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

@Service
public interface TodoItemRepository extends MongoRepository<TodoItem, String> {}
