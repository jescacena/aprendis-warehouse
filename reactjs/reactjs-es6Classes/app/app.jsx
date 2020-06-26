var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

import ComponentOne from './components/Component1';
import ComponentTwo from './components/Component2';

// Load foundation
$(document).foundation();

// App css
require('style!css!sass!applicationStyles')

ReactDOM.render(
  <div>
    <ComponentOne count={123}/>
    <ComponentTwo count={88}/>
  </div>,
  document.getElementById('app')
);
