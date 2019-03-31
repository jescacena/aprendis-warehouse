var expect = require('expect');
var React  = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jQuery');

var Controls = require('Controls');

describe('Controls' , () => {
  it('should exist', () => {
    expect(Controls).toExist();
  });

  describe('render', ()=> {
    it('should render pause when started', () => {
      var dummyFunction = ()=>{};
      var controls = TestUtils.renderIntoDocument(<Controls countdownStatus="started" onStatusChange={dummyFunction}/>);

      var $el = $(ReactDOM.findDOMNode(controls));

      var $pauseButton = $el.find('button:contains(Pause)');

      expect($pauseButton.length).toBe(1);
    });

    it('should render start when paused', () => {
      var dummyFunction = ()=>{};

      var controls = TestUtils.renderIntoDocument(<Controls countdownStatus="paused" onStatusChange={dummyFunction}/>);

      var $el = $(ReactDOM.findDOMNode(controls));

      var $startButton = $el.find('button:contains(Start)');

      expect($startButton.length).toBe(1);
    });

  });
});
