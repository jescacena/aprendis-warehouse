var React = require('react');
var Todo = require('Todo');

var TodoList = React.createClass({

  render: function() {
    var {todos} = this.props;

    var renderTodos = () => {
      if(todos.length > 0) {
        return todos.map((todo)=> {
          return (
            <Todo key={todo.id} {...todo} onToggle={this.props.onToggle}/>
          );
        });
      } else {
        return (
          <p className="container__message">Nothing To Do</p>
        )
      }
    };

    return (
      <div>
        {renderTodos()}
      </div>
    );
  }
});

module.exports = TodoList;
