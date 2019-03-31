var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var TodoApp = require('TodoApp');

describe('TodoApp' , () => {
  it('it should exist', () => {
    expect(TodoApp).toExist();
  });

  it('should add todo to the todos state on handleAddTodo', () => {
    var todoText = 'test text';
    var todoApp = TestUtils.renderIntoDocument(<TodoApp/>);

    todoApp.setState({
      todos: []
    });

    todoApp.handleAddTodo(todoText);

    expect(todoApp.state.todos[0].text).toBe(todoText);

    //Expect createdAt to be a number
    expect(todoApp.state.todos[0].createdAt).toBeA('number');
  });

  it('should toggle completed when handleToggle called', ()=> {
    var todoApp = TestUtils.renderIntoDocument(<TodoApp/>);

    todoApp.setState({
      todos: [ {
        id:1,
        text:'ddfdfd',
        completed:false,
        createdAt:0,
        completedAt: undefined
      }]
    });

    todoApp.handleToggle(1);

    expect(todoApp.state.todos[0].completed).toBe(true);

    //Expect completedAt to be a number
    expect(todoApp.state.todos[0].completedAt).toBeA('number');


  });
  it('should remove completedAt when completed is checked off', ()=> {
    var todoApp = TestUtils.renderIntoDocument(<TodoApp/>);

    todoApp.setState({
      todos: [ {
        id:1,
        text:'ddfdfd',
        completed:true,
        createdAt:0,
        completedAt: 0
      }]
    });

    todoApp.handleToggle(1);

    expect(todoApp.state.todos[0].completed).toBe(false);

    //Expect completedAt to be a number
    expect(todoApp.state.todos[0].completedAt).toBeA('undefined');


  });

  //Test that when toggle from true to false , completedAt get remove
});
