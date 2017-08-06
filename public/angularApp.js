var app = angular.module('nitkNews', ['ui.router'])


app.config(['$stateProvider','$urlRouterProvider',

        function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: '/home.html',
            controller: 'MainCtrl'

        });
        
        $stateProvider.state('news', {
        url: '/news',
            views: {

                // the main template will be placed here (relatively named)
                '': { templateUrl: 'content.html' },

                // the child views will be defined here (absolutely named)
                'columnOne@news': { templateUrl: '/news.html',
                    controller: 'MainCtrl' },

                // for column two, we'll define a separate controller
                'columnTwo@news': {templateUrl: '/newsform.html',
                    controller: 'MainCtrl'
                }
            }
        });
        
        $stateProvider.state('posts', {
        url: '/posts/{id}',
        templateUrl: '/posts.html',
        controller: 'PostsCtrl'
        });

    $urlRouterProvider.otherwise('home');
    }]);

app.factory('posts', [function(){
    
    var o= { 
    posts:[
    {title: 'post 1', upvotes: 55, comments: [
                  {author: 'Joe', body: 'Cool post!', upvotes: 0},
                  {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
    ]},
    {title: 'post 2', upvotes: 2},
    {title: 'post 3', upvotes: 15},
    {title: 'post 4', upvotes: 99},
    {title: 'post 5', upvotes: 4}
    ] };
    
    return o;

}])

app.controller('MainCtrl', [
    '$scope', 'posts',
    function($scope, posts){
        $scope.posts = posts.posts;
        $scope.addPost= function(){
            if(!$scope.title || $scope.title === '') { return; }
            $scope.posts.push({
                title: $scope.title, 
                link: $scope.link, 
                upvotes: '0',
                comments: [
                    {author: 'Joe', body: 'Cool post!', upvotes: 0},
                    {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
                    ]
                });
      
        $scope.title=''; $scope.link='';
        }
        $scope.incrementUpvotes= function(post){
        post.upvotes++;
        
    }
   
    }]);

app.controller('PostsCtrl', [
    '$scope', '$stateParams', 'posts',
    function($scope, $stateParams, posts){
    $scope.post = posts.posts[$stateParams.id];
    $scope.addComment = function(){
    if($scope.body === '') { return; }
    $scope.post.comments.push({
        body: $scope.body,
        author: 'user',
        upvotes: 0
        });
    $scope.body = '';
    };

    }]);

