package todo;

import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public class TodoItem {
  @Id private String id;
  private boolean done = false;
  private final String what;

  public void complete() {
    this.done = true;
  }
}
