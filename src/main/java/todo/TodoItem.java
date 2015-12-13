package todo;

import org.springframework.data.annotation.Id;

public class TodoItem {

  @Id private String id;
  private boolean done = false;
  private String what;

  public TodoItem(String what) {
    this.done = false;
    this.what = what;
  }

  public String getId() {
    return id;
  }

  public boolean isDone() {
    return done;
  }

  public String getWhat() {
    return what;
  }

  public void complete() {
    this.done = true;
  }

  @Override
  public String toString() {
    return "TodoItem{" +
        "done=" + done +
        ", id='" + id + '\'' +
        ", what='" + what + '\'' +
        '}';
  }
}
