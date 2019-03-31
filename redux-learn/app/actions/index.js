var axios = require('axios');

//Map reducers and action generators
export var startLocationFetch = () => {
  return {
    type:'START_LOCATION_FETCH'
  }
};

export var completeLocationFetch = (url) => {
  return {
    type:'COMPLETE_LOCATION_FETCH',
    url
  }
};

export var fetchLocation = () => {

  return (dispatch, getState) => {
      dispatch(startLocationFetch());

      axios.get('http://ipinfo.io').then(function(res) {
        var loc = res.data.loc;
        var baseUrl = 'http://maps.google.com/maps?q=';
        dispatch(completeLocationFetch(baseUrl + loc));
      });

  };
};
// export var fetchLocation = () => {
//   store.dispatch(startLocationFetch());
//
//   axios.get('http://ipinfo.io').then(function(res) {
//     var loc = res.data.loc;
//     var baseUrl = 'http://maps.google.com/maps?q=';
//     store.dispatch(completeLocationFetch(baseUrl + loc));
//   });
// };

export var changeName = (name) => {

  return {
    type: 'CHANGE_NAME',
    name
  }

};


export var addHobby = (hobby) => {
  return {
    type: 'ADD_HOBBY',
    hobby
  }
};
export var removeHobby = (id) => {
  return {
    type: 'REMOVE_HOBBY',
    id
  }
};
