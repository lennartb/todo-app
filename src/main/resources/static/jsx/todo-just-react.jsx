var todoServiceBase = '/todo';

// -------------------------------
// NewItem
// -------------------------------
var NewItem = React.createClass({
  render: function () {
    return (
        <form onSubmit={this.props.onSubmitNewItem}>
          <input
              type="text"
              placeholder="Ny sak att göra"
              value={this.props.newWhatTodo}
              onChange={this.props.onNewTodoChange}/>
        </form>
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
    $.post(
        todoServiceBase + '/add',
        {what: this.state.newWhatTodo},
        this.componentDidMount.bind(this));
    this.setState({newWhatTodo: ''});
  },

  handleCheckboxChange: function (item) {
    if (item.done) {
      return;
    }
    $.post(
        todoServiceBase + '/complete',
        {id: item.id},
        this.componentDidMount.bind(this));
  },

  render: function () {
    var rows = [];

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
        <div>
          <NewItem
              newWhatTodo={this.state.newWhatTodo}
              onSubmitNewItem={this.handleSubmitNewItem}
              onNewTodoChange={this.handleNewTodoChange}/>

          <div>&nbsp;</div>

          <div>
            <table>
              <tbody>
              {rows}
              </tbody>
            </table>
          </div>
        </div>
    );

  }
});

// -------------------------------
ReactDOM.render(
    <TodoList />,
    document.getElementById('reactStuffGoesHere')
);
