var todoServiceBase = 'http://localhost:8080/todo';

// -------------------------------
// NewItem
// -------------------------------
var NewItem = React.createClass({
  render: function () {
    return (
        <tr>
          <td>
            <p>Ny:</p>
          </td>
          <td>
            <form onSubmit={this.props.onSubmitNewItem}>
              <input
                  type="text"
                  bsSize="large"
                  value={this.props.newWhatTodo}
                  onChange={this.props.onNewTodoChange}/>
            </form>
          </td>
        </tr>
    );
  }
});

// -------------------------------
// TodoItem
// -------------------------------
var TodoItem = React.createClass({
  render: function () {
    return (
        <tr>
          <td>
            <input
                type="checkbox"
                bsSize="large"
                checked={this.props.item.done}
                label={this.props.item.what}
                onChange={this.props.onCheckboxChange.bind(null, this.props.item)}/>
          </td>
          <td>
            <p>{this.props.item.what}</p>
          </td>
        </tr>
    );
  }
});

// -------------------------------
// TodoList
// -------------------------------
var TodoList = React.createClass({
  getInitialState: function () {
    return {
      todoList: [],
      newWhatTodo: ''
    };
  },

  // Anropas både av React och nedan
  componentDidMount: function () {
    $.get(todoServiceBase + '/list', function (result) {
      var list = result;
      if (this.isMounted()) {
        this.setState({
          todoList: list
        });
      }
    }.bind(this));
  },

  handleNewTodoChange: function (event) {
    this.setState({newWhatTodo: event.target.value});
  },

  handleSubmitNewItem: function (event) {
    event.preventDefault();
    $.post(todoServiceBase + '/add', {what: this.state.newWhatTodo});
    this.componentDidMount();
    this.setState({newWhatTodo: ''});
  },

  handleCheckboxChange: function (item) {
    if (item.done) {
      return;
    }
    $.post(todoServiceBase + '/complete', {id: item.id});
    this.componentDidMount();
  },

  render: function () {
    var rows = [];
    rows.push(
        <NewItem key={-1}
                 newWhatTodo={this.state.newWhatTodo}
                 onSubmitNewItem={this.handleSubmitNewItem}
                 onNewTodoChange={this.handleNewTodoChange}/>
    );

    var l = this.state.todoList;

    for (var i = 0; i < l.length; i++) {
      rows.push(
          <TodoItem
              key={l[i].id}
              item={l[i]}
              onCheckboxChange={this.handleCheckboxChange}/>
      );
    }

    return (
        <table>
          <tbody>
          {rows}
          </tbody>
        </table>
    );

  }
});

// -------------------------------
ReactDOM.render(
    <TodoList />,
    document.getElementById('container')
);