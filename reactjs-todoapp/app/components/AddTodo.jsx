var React = require('react');

var AddTodo = React.createClass({

  onSubmit: function(e) {
    e.preventDefault();
    var {onAddTodo} = this.props;
    var todoText = this.refs.newTodo.value;
    if(todoText.length > 0) {
      onAddTodo(todoText);
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

module.exports = AddTodo;
