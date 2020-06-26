var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var AddTodo = require('AddTodo');

describe('AddTodo' , () => {
  it('it should exist', () => {
    expect(AddTodo).toExist();
  });

  it('should call onAddTodo on valid data', () => {
    var spy = expect.createSpy();
    var addTodo = TestUtils.renderIntoDocument(<AddTodo onAddTodo={spy}/>);

    var $el = $(ReactDOM.findDOMNode(addTodo));
    addTodo.refs.newTodo.value = "El tio trompeta";

    TestUtils.Simulate.submit($el.find('form')[0]);

    expect(spy).toHaveBeenCalledWith('El tio trompeta');
  });
  it('should not call onAddTodo on invalid data', () => {
    var spy = expect.createSpy();
    var addTodo = TestUtils.renderIntoDocument(<AddTodo onAddTodo={spy}/>);

    var $el = $(ReactDOM.findDOMNode(addTodo));
    addTodo.refs.newTodo.value = "";

    TestUtils.Simulate.submit($el.find('form')[0]);

    expect(spy).toNotHaveBeenCalled();
  });
});
