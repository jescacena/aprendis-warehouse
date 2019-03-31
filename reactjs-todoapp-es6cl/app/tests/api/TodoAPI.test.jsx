var expect = require('expect');

var TodoAPI = require('TodoAPI');

describe('TodoAPI' , () => {

  beforeEach(() => {
    localStorage.removeItem('todos');
  });

  it('it should exist', () => {
    expect(TodoAPI).toExist();
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

    it('should search todos when search text is uppercase', () => {
      var filterTodos = TodoAPI.filterTodos(todos,true,'nice');
      expect(filterTodos.length).toBe(1);
    });
  });

});
