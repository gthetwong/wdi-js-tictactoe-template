var tictac = tictac || {};

tictac.gameApp = angular.module("gameApp", []);


tictac.gameApp.controller('ticTacCtrl', ['$scope', function($scope){


$scope.status_indicators = $('#teams li');   // status bar container

$scope.tiles = [];                         // all the "tiles"

$scope.players = [                         // player data
    {
      name:      'Ernie',
      marker:    'X',
      img_url:   'img/ernie.jpg'
      // indicator: $(status_indicators[0])
    },
    {
      name:      'Bert',
      marker:    'O',
      img_url:   'img/bert.jpg'
      // indicator: $(status_indicators[1])
    }
  ];

$scope.initialize = function(){

$scope.turns  = 0;                         // elapsed turns

  //### There are eight winning combos, the first two are supplied.
  //### What are the other six? Add 'em.
$scope.win_combos = [
    [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]
  ];

$scope.tiles = [
  {id: 0,
  team: ""},
  {id: 1,
  team: ""},
  {id: 2,
  team: ""},
  {id: 3,
  team: ""},
  {id: 4,
  team: ""},
  {id: 5,
  team: ""},
  {id: 6,
  team: ""},
  {id: 7,
  team: ""},
  {id: 8,
  team: ""},
  ];

};

$scope.active_player = function(){

  if ($scope.turns % 2 === 1){
    $scope.current_player= $scope.players[0];
  } else {
    $scope.current_player= $scope.players[1];
  }

};

$scope.mark_sqr = function(id){
  $scope.active_player();
  // console.log($scope.current_player.marker);
  if ($scope.tiles[id].team===""){
    $scope.tiles[id].team = $scope.current_player.marker;
    $scope.turns ++;

  } else {
    console.log("space taken");
  }
  $scope.track_tiles();
  $scope.is_win();
  if ($scope.status==="win"){
    console.log("current_player is winner");
  }
};

$scope.track_tiles = function(){
  var marked_x = _.where($scope.tiles, {team:"X"});
  var marked_o = _.where($scope.tiles, {team:"O"});
  $scope.marked_x = [];
  $scope.marked_o = [];
  _.each(marked_x, function(tile){
    $scope.marked_x.push(tile.id);
    console.log($scope.marked_x);
  });

  _.each(marked_o, function(tile){
    $scope.marked_o.push(tile.id);
    console.log($scope.marked_o);
  });

};




$scope.is_win = function(){

_.each($scope.win_combos, function(line){
      if(_.contains( $scope.marked_x, line[0]) && _.contains($scope.marked_x, line[1]) && _.contains($scope.marked_x, line[2]) ) {
        $scope.status = "win";
      }
});

_.each($scope.win_combos, function(line){
      if(_.contains( $scope.marked_o, line[0]) && _.contains($scope.marked_o, line[1]) && _.contains($scope.marked_o, line[2]) ) {
        $scope.status = "win";
      }
});

};

$scope.initialize();


}]);