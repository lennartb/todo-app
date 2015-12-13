package todo;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:8000")
@RequestMapping("/todo")
public class TodoController {
    private final AtomicLong idGenerator = new AtomicLong();
    private final Map<Long, TodoItem> todoList = new LinkedHashMap<>();

    public TodoController() {
        this.add("En enkel REST-tjänst");
        this.add("En tjänst som kan lista att göra punkter");
        this.add("Och som kan lägga till nya punkter");
        this.add("Man ska också kunna tala om att en sak är gjord");
    }

    @RequestMapping(value="/list", method=RequestMethod.GET)
    public Collection<TodoItem> list() {
        return todoList.values();
    }

    @RequestMapping(value="/get/{id}", method=RequestMethod.GET)
    public TodoItem get(@PathVariable("id") Long id) {
        return todoList.get(id);
    }

    @RequestMapping(value="/add", method=RequestMethod.POST)
    public void add(@RequestParam("what") String what) {
        Long id = idGenerator.incrementAndGet();
        todoList.put(id, new TodoItem(id, what));
    }

    @RequestMapping(value="/complete", method=RequestMethod.POST)
    public void complete(@RequestParam("id") Long id) {
        todoList.get(id).complete();
    }
}
