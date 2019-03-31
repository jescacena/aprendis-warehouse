var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');
var {Provider} = require('react-redux');


import {configure} from 'configureStore';
import ConnectedTodoList , {TodoList} from 'TodoList';
import ConnectedTodo , {Todo} from 'Todo';

describe('TodoList' , () => {
  it('it should exist', () => {
    expect(TodoList).toExist();
  });

  it('should render one Todo component for each Todo item', ()=> {
    var todos  = [{
        id:1,
        text:'Do something',
        completed: false,
        completedAt: undefined,
        createdAt: 50
      },
      {
        id:2,
        text:'Check email',
        completed: false,
        completedAt: undefined,
        createdAt: 50
      }
    ];

    var store = configure({
      todos
    });

    var provider  = TestUtils.renderIntoDocument(
      <Provider store={store}>
        <ConnectedTodoList/>
      </Provider>
    );

    var todoList = TestUtils.scryRenderedComponentsWithType(provider, ConnectedTodoList)[0];

    var todosComponents = TestUtils.scryRenderedComponentsWithType(todoList,ConnectedTodo);

    expect(todosComponents.length).toBe(todos.length);
  });

  it('should render empty messages if no todos', ()=> {
    var todos = [];
    var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos}/>);

    var $el = $(ReactDOM.findDOMNode(todoList));

    expect($el.find('.container__message').length).toBe(1);


  });
});
