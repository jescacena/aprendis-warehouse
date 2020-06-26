var expect = require('expect');
var React  = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jQuery');

var CountDown = require('CountDown');

describe('Countdown', () => {
  it('should exist', () => {
    expect(CountDown).toExist();
  });

  describe('handleSetCountdown', () => {
    it('should set status to started and countdown', (done)=> {
      var countdown = TestUtils.renderIntoDocument(<CountDown/>);

      countdown.handleSetCountdown(10);

      expect(countdown.state.count).toBe(10);
      expect(countdown.state.countdownStatus).toBe('started');

      setTimeout(()=> {
        expect(countdown.state.count).toBe(9);
        done();
      }, 1001);
    });
    it('should not set a negative countdown', (done)=> {
      var countdown = TestUtils.renderIntoDocument(<CountDown/>);

      countdown.handleSetCountdown(1);

      setTimeout(()=> {
        expect(countdown.state.count).toBe(0);
        done();
      }, 3001);
    });

    it('should stop countdown when stopped status', (done) => {
      var countdown = TestUtils.renderIntoDocument(<CountDown/>);
      countdown.handleSetCountdown(3);

      countdown.handleStatusChange('stopped');

      setTimeout(()=>{
        expect(countdown.state.count).toBe(0);
        expect(countdown.state.countdownStatus).toBe('stopped');
        done();
      },1001);
    });

  });
});
