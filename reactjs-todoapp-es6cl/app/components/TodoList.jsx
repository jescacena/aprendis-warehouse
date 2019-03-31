var React = require('react');
import Todo from 'Todo';
var {connect} = require('react-redux');
var TodoAPI = require('TodoAPI');

export class TodoList extends React.Component {

  render () {
    var {todos, showCompleted , searchText} = this.props;

    var renderTodos = () => {
      var renderedTodos = TodoAPI.filterTodos(todos, showCompleted , searchText).map((todo)=> {
        return (
          <Todo key={todo.id} {...todo}/>
        );
      });
      if(renderedTodos.length > 0) {
        return renderedTodos;
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
};

export default connect(
  (state) => {
    return state;
  }
)(TodoList);
