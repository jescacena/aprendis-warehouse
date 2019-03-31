var expect = require('expect');

var TodoAPI = require('TodoAPI');

describe('TodoAPI' , () => {

  beforeEach(() => {
    localStorage.removeItem('todos');
  });

  it('it should exist', () => {
    expect(TodoAPI).toExist();
  });

  describe('setTodos', ()=> {


    it('should set valid todos array', ()=> {
      var todos = [{
        id:23,
        text:'ddsffdfs',
        completed:false
      }];

      TodoAPI.setTodos(todos);

      var actualTodos = JSON.parse(localStorage.getItem('todos'));

      //We dont use toBe because we have different objects
      expect(actualTodos).toEqual(todos);
    });

    it('should set invalid todos array', ()=> {
      var todos = {};
      TodoAPI.setTodos(todos);

      var actualTodos = JSON.parse(localStorage.getItem('todos'));

      //We dont use toBe because we have different objects
      expect(actualTodos).toBe(null);
    });

  });

  describe('getTodos', ()=> {
    it('should return empty array for bad local storage data', () => {
      var actualTodos = TodoAPI.getTodos();
      expect(actualTodos).toEqual([]);
    });

    it('should return todos pn valid array in local storage', ()=> {

      var todos = [{
        id:23,
        text:'ddsffdfs',
        completed:false
      }];

      localStorage.setItem('todos', JSON.stringify(todos));

      var actualTodos = TodoAPI.getTodos();

      expect(actualTodos).toEqual(todos);

    });

  });

  describe('filterTodos', () => {
    var todos = [{
      id:1,
      text:'black',
      completed:true
    },{
      id:2,
      text:'black eyes',
      completed:false
    },{
      id:3,
      text:'nice',
      completed:true
    }];

    it('should return all items if showCompleted is true', ()=> {
      var filterTodos = TodoAPI.filterTodos(todos,true,'');
      expect(filterTodos.length).toBe(3);
    });
    it('should return only non completed if showCompleted is false', ()=> {
      var filterTodos = TodoAPI.filterTodos(todos,false,'');
      expect(filterTodos.length).toBe(1);
    });

    it('should sort by completed status', () => {
      var filterTodos = TodoAPI.filterTodos(todos,true,'');
      expect(filterTodos[0].completed).toBe(false);
    });

    it('should return only matches on search', () => {
      var filterTodos = TodoAPI.filterTodos(todos,true,'black');
      expect(filterTodos.length).toBe(2);
    });
  });

});
