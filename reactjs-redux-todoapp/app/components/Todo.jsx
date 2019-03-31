var React = require('react');
var moment = require('moment');
var {connect} = require('react-redux');
var actions = require('actions');



export var Todo = React.createClass({

  render: function() {
    var {text, id, completed, createdAt,completedAt, dispatch} = this.props;
    var todoClassName = completed ? 'todo todo-completed' : 'todo';
    var renderCreatedDate = () => {
        var message = 'Created ';
        var timestamp = createdAt;

        return message + moment.unix(timestamp).format('MMM Do YYYY @ h:mm a');
    };
    var renderCompletedDate = () => {
      if(completed) {
        var message = 'Completed ';
        var timestamp = completedAt;
        return message + moment.unix(timestamp).format('MMM Do YYYY @ h:mm a');
      } else {
        return '';
      }
    };
    return (
      <div className={todoClassName} onClick={() => {
          dispatch(actions.toggleTodo(id));
        }}>
        <div>
          <p><input type="checkbox" checked={completed}></input>&nbsp;{text}</p>
        </div>

        <div>
          <p className="todo__subtext">{renderCreatedDate()}</p>
          <p className="todo__subtext">{renderCompletedDate()}</p>
        </div>

      </div>
    );
  }
});

export default connect()(Todo);
