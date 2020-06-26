var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

export var AddTodo = React.createClass({

  onSubmit: function(e) {
    e.preventDefault();
    var {dispatch} = this.props;
    var {onAddTodo} = this.props;
    var todoText = this.refs.newTodo.value;
    if(todoText.length > 0) {
      this.refs.newTodo.value = '';
      dispatch(actions.startAddTodo(todoText));
    } else {
      this.refs.newTodo.focus();
    }
  },

  render: function() {
    return (
      <div className="container__footer">
        <form onSubmit={this.onSubmit}>
          <input type="text" ref="newTodo" placeholder="What do you need to do?"/>
          <button type="submit" className="button expanded">Add</button>
        </form>
      </div>
    );
  }
});

export default connect()(AddTodo);
