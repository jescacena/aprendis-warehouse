var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var {AddTodo} = require('AddTodo');

import * as actions from 'actions';

describe('AddTodo' , () => {
  it('it should exist', () => {
    expect(AddTodo).toExist();
  });

  it('should dispatch ADD_TODO when valid todo text', () => {
    var todo = {
        id:1,
        text:'this is from testing',
        completed: false,
        completedAt:undefined,
        createdAt:333
    };

    var action = actions.startAddTodo(todo.text);
    var spy = expect.createSpy();
    var addTodo = TestUtils.renderIntoDocument(<AddTodo dispatch={spy}/>);

    var $el = $(ReactDOM.findDOMNode(addTodo));
    addTodo.refs.newTodo.value = "El tio trompeta";

    TestUtils.Simulate.submit($el.find('form')[0]);

    expect(spy).toHaveBeenCalledWith(action);
  });
  it('should not dispatch ADD_TODO on invalid todo text', () => {
    var spy = expect.createSpy();
    var addTodo = TestUtils.renderIntoDocument(<AddTodo dispatch={spy}/>);

    var $el = $(ReactDOM.findDOMNode(addTodo));
    addTodo.refs.newTodo.value = "";

    TestUtils.Simulate.submit($el.find('form')[0]);

    expect(spy).toNotHaveBeenCalled();
  });
});
