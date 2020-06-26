var $ = require('jquery');
module.exports = {

  filterTodos: function(todos,showCompleted,searchText) {

    var filteredTodos;

    //Filter by searchText
    if(searchText && searchText.length > 0) {
      filteredTodos = todos.filter((todo)=> {
        return todo.text.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
      });
    } else {
      filteredTodos = todos;
    }

    //Filter by showCompleted
    filteredTodos = filteredTodos.filter((todo)=> {
      return !todo.completed || showCompleted;
    });

    //Sort todos with non-completed first
    filteredTodos.sort((a,b) => {
      if(!a.completed && b.completed) {
        return -1;
      } else if(a.completed && !b.completed) {
        return 1;
      } else {
        return 0;
      }
    });

    return filteredTodos;

  }
};
