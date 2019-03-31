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
        todo: {
          id:1,
          text:'fffdd',
          completed: false,
          completedAt:undefined,
          createdAt:333
        }
      };

      var res = reducers.todosReducer(df([]),df(action));

      expect(res[0].text).toEqual(action.todo.text);
    });

    it('should remove todos',()=>{
      var action = {
        type:'REMOVE_TODOS'
      };
      var tesTodos = [{
        id:1,
        text:'fffdd',
        completed: false,
        completedAt:undefined,
        createdAt:333
      }];

      var res = reducers.todosReducer(df(tesTodos),df(action));

      expect(res.length).toEqual(0);

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

    it('should update todo',()=>{

      var todos = [
        {
          id:1,
          completed:false
        }
      ];
      var action = {
        type:'UPDATE_TODO',
        id:1,
        updates: {
          completed: true
        }

      };

      var res = reducers.todosReducer(df(todos),df(action));

      expect(res[0].completed).toEqual(!todos[0].completed);
    });

  });

  describe('authReducer' , ()=> {
    it('should set uid on login action', () => {
      const action={
        type:'LOGIN',
        uid:1
      };
      var res = reducers.authReducer(df({}) , df(action));

      expect(res).toInclude({
        uid:1
      });

    });

    it('should unset uid on logout', () => {
      const action={
        type:'LOGOUT'
      };
      const auth = {
        uid:1
      }
      var res = reducers.authReducer(df(auth) , df(action));

      expect(res).toEqual({});

    });
  });

});
