//В этом уроке мы разберем чем отличается scope: true от scope: false в директиве и как изменения в скоупе директивы отражаются на контроллере.


//Создадим контроллер booksCtrl и внутри директиву book
// <div ng-controller = 'booksCtrl'>
    // <book></book>
// </div>

//опишем их

// app.controller('booksCtrl', function($scope){
           // console.log('$scope Ctrl', $scope);
// });
// app.directive('book', function(){ 
    // return {      
        // link : function(scope, element, attrs){
            // console.log('scope directive', scope);
        // }
    // };
// });

// посмотрим в браузер и увидим что в консоли $scope и scope одинаковые 
// потому что они ссылаются на один объект

//теперь поставим в директиву scope : true,
//в controller создадим переменную $scope.name = 'Harry'
// и теперь посмотрим на $scope и scope в консоли.

// в результате в scope мы теперь не увидим Harry
// Но если мы внимательно посмотрим на proto в scope То там имя Harry мы обнаружим!!!
// Как это получается?
// Когда мы используем scope : true у нас создается new scope от $scope 
//controller и дочерним он является по прототипному наследованию Это значит что 
//через свойство proto мы можем получить доступ к родительскому scope
//Давайте посмотрим и выведем  в контроллере переменную name
//This is ctrl name: {{name}}
// а в директиве выведем console.log(scope.name);
// теперь если мы в шаблоне напишем template : "<div>My name is {{name}} <input type='text' ng-model='name'></div>",
// и посмотрим что получается 

// This is ctrl name: Harry
//My name is Harry  инпут Harry

//при изменении в инпут Harry меняется и то что выводится в шаблоне директивы а то что находится в контроллере 
//This is ctrl name: Harry эта строка не меняется.

//Почему это происходит?
// Потому что мы находимся в совершенно другом scope и так как это дочерний scope мы имеем доступ к этой переменной и другим объявленным переменным через прототипное наследование
// Но если же мы попробуем её поменять то изменится она только в дочернем scope
// Это очень удобно делать для того чтобы получать доступ к переменным контроллера но при этом из вложенной директивы мы не можем менять значения контроллера на прямую ... Это удобно и безопасно!!!
//Из-за этого мы будем иметь намного меньше багов описав таким способом директиву, когда мы объявляем какую-либо переменную


var app = angular.module('app', []);



app.controller('booksCtrl', function($scope){
           console.log('$scope Ctrl', $scope);
             $scope.name = 'Harry';
});





app.directive('book', function(){
    
    return {
        scope : true,
       template : "<div>My name is {{name}} <input type='text'ng-model='name'></div>",
        link : function(scope, element, attrs){
            console.log('scope directive', scope);
            console.log(scope.name);

        }
    };
    
 
});












