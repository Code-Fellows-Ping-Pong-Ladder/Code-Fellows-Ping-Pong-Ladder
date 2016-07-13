module.exports = function(app) {
  app.factory('playerServices', ['$http', function($http) {
    var obj = {};

    // obj.getPlayer = function(playerID) {
    //   console.log(playerID);
    //   return {
    //     username: 'vic',
    //     wins: 3,
    //     losses: 4
    //   };
    // };

    obj.getPlayer = function(id) {
      $http.get('http://localhost:3000/users/' + id)
      .then((res) => {
        console.log('res.data', res.data.user);
        var player = res.data.user;
        return player;
      });
    };

    return obj;
  }]);
};
