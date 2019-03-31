var expect = require('expect');
var React  = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jQuery');

var CountDownForm = require('CountDownForm');

describe('CountDownForm' , () => {
  it('it should exist', () => {
    expect(CountDownForm).toExist();
  });

  it('should call onSetCountdown if valid seconds entered', () => {
    var spy = expect.createSpy();
    var countDownForm = TestUtils.renderIntoDocument(<CountDownForm onSetCountdown={spy}/>);

    var $el = $(ReactDOM.findDOMNode(countDownForm));

    countDownForm.refs.seconds.value = "109";

    TestUtils.Simulate.submit($el.find('form')[0]);

    expect(spy).toHaveBeenCalledWith(109);
  });
  it('should not call onSetCountdown if invalid seconds entered', () => {
    var spy = expect.createSpy();
    var countDownForm = TestUtils.renderIntoDocument(<CountDownForm onSetCountdown={spy}/>);

    var $el = $(ReactDOM.findDOMNode(countDownForm));

    countDownForm.refs.seconds.value = "2w";

    TestUtils.Simulate.submit($el.find('form')[0]);

    expect(spy).toNotHaveBeenCalled();
  });
});
