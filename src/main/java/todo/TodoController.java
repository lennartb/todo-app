package todo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@RequestMapping("/todo")
public class TodoController {

  @Autowired
  private TodoItemRepository repository;

  public TodoController() {}

  @RequestMapping(value = "/list", method = RequestMethod.GET)
  public Collection<TodoItem> list() {
    return repository.findAll();
  }

  @RequestMapping(value = "/get/{id}", method = RequestMethod.GET)
  public TodoItem get(@PathVariable("id") String id) {
    return repository.findOne(id);
  }

  @RequestMapping(value = "/add", method = RequestMethod.POST)
  public void add(@RequestParam("what") String what) {
    repository.insert(new TodoItem(what));
  }

  @RequestMapping(value = "/complete", method = RequestMethod.POST)
  public void complete(@RequestParam("id") String id) {
    TodoItem item = repository.findOne(id);
    item.complete();
    repository.save(item);
  }
}
