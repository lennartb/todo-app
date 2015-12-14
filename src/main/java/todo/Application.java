package todo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application implements CommandLineRunner {

  @Autowired
  private TodoItemRepository repository;

  public static void main(String[] args) {
    SpringApplication.run(Application.class, args);
  }

  @Override
  public void run(String... args) throws Exception {
    if(inDevelopmentMode()) {
      insertDummyData();
      printRepositoryContents();
    }
  }

  private boolean inDevelopmentMode() {
    return "true".equals(System.getProperty("development.mode"));
  }

  private void insertDummyData() {
    repository.deleteAll();
    repository.insert(new TodoItem("En enkel REST-tjänst"));
    repository.insert(new TodoItem("En tjänst som kan lista att göra punkter"));
    repository.insert(new TodoItem("Och som kan lägga till nya punkter"));
    repository.insert(new TodoItem("Man ska också kunna tala om att en sak är gjord"));
  }

  private void printRepositoryContents() {
    System.out.println("TodoItem found with findAll():");
    System.out.println("-------------------------------");
    for (TodoItem item : repository.findAll()) {
      System.out.println(item);
    }
  }
}
