var React = require('react');
var Clock = require('Clock');
var TimerControls = require('TimerControls');

var Timer = React.createClass({
  getInitialState : function() {
    return {
      count:0,
      timerStatus: 'stopped'
    };
  },
  componentDidUpdate: function(prevProps , prevState) {
    if(this.state.timerStatus !== prevState.timerStatus) {
      switch(this.state.timerStatus) {
        case 'started':
          this.startTimer();
          break;
        case 'stopped':
          this.setState({count:0});
        case 'paused':
          clearInterval(this.timer);
          this.timer = undefined;
          break;

      }

    }

  },
  // componentWillUpdate: function(nextProps , nextState) {
  // },
  //
  // componentDidMount: function() {
  //     console.log('componentDidMount');
  // },
  // componentWillMount: function() {
  //     console.log('componentWillMount');
  // },
  componentWillUnmount: function() {
      // console.log('componentWillUnmount');
      clearInterval(this.timer);
      this.timer = undefined;
  },

  startTimer: function() {
    this.timer = setInterval(() => {
      var newCount = this.state.count + 1;
      this.setState({
        count: newCount
      });
    },1000);

  },

  handleStatusChange: function(newStatus) {
    this.setState({
      timerStatus:newStatus
    });
  },
  render: function() {
    var {count, timerStatus} = this.state;
    return (
      <div>
        <h1 className="page-title">Timer App</h1>
        <Clock totalSeconds={count}/>
        <TimerControls timerStatus={timerStatus} onStatusChange={this.handleStatusChange}/>
      </div>
    );
  }
});

module.exports = Timer;
