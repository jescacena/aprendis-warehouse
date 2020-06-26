var expect = require('expect');
var df = require('deep-freeze-strict');
var reducers = require('reducers');

describe('reducers', ()=>{
  describe('searchTextReducer',()=>{

    it('should set searchText',()=>{
      var action = {
        type:'SET_SEARCH_TEXT',
        searchText: 'dog'
      };

      var res = reducers.searchTextReducer(df(''),df(action));

      expect(res).toEqual(action.searchText);
    });
  });

  describe('showToggleReducer',()=>{
    it('should toggle showCompleted',()=>{
      var action = {
        type:'TOGGLE_SHOW_COMPLETED'
      };

      var res = reducers.showCompletedReducer(df(true),df(action));

      expect(res).toEqual(false);
    });
  });

  describe('todosReducer',()=>{
    it('should add todo',()=>{
      var action = {
        type:'ADD_TODO',
        text:'running'
      };

      var res = reducers.todosReducer(df([]),df(action));

      expect(res[0].text).toEqual(action.text);
    });
    it('should add todos',()=>{
      var action = {
        type:'ADD_TODOS',
        todos:[{
          id:1,
          text:'fffdd',
          completed: false,
          completedAt:undefined,
          createdAt:333
        }]
      };

      var res = reducers.todosReducer(df([]),df(action));

      expect(res.length).toEqual(1);
      expect(res[0].id).toEqual(1);
    });

    it('should toggle todo',()=>{

      var todos = [
        {
          id:1,
          completed:false
        }
      ];
      var action = {
        type:'TOGGLE_TODO',
        id:1
      };

      var res = reducers.todosReducer(df(todos),df(action));

      expect(res[0].completed).toEqual(!todos[0].completed);
    });

  });

});
