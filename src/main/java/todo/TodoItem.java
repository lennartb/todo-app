package todo;

public class TodoItem {
    private final long id;
    private boolean done;
    private final String what;

    public TodoItem(long id, String what) {
        this.id = id;
        this.done = false;
        this.what = what;
    }

    public long getId() {
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

}
