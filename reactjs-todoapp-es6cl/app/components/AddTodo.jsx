var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

export class AddTodo extends React.Component {
  onSubmit (e) {
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
  }

  render () {
    return (
      <div className="container__footer">
        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="text" ref="newTodo" placeholder="What do you need to do?"/>
          <button type="submit" className="button expanded">Add</button>
        </form>
      </div>
    );
  }
};

export default connect()(AddTodo);
