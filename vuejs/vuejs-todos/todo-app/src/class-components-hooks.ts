// class-component-hooks.js
import Component from 'vue-class-component';

// Register the router hooks with their names
Component.registerHooks([
  'beforeCreate',
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate' // for vue-router 2.2+
]);
