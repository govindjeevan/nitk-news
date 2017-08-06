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
            templateUrl: '/news.html',
            controller: 'MainCtrl'

        });
        
        $stateProvider.state('posts', {
        url: '/posts/{id}',
        templateUrl: '/posts.html',
        controller: 'PostsCtrl'
        });

    $urlRouterProvider.otherwise('home');
    }]);


app.controller('MainCtrl', [
    '$scope', '$http',
    function($scope, $http){

        $scope.getPosts = function () {
            console.log("getting");
            $http({
                url: '/api/posts',
                method: "GET"
            }).then(function (response) {
                console.log(response);
                $scope.posts = response.data;

            });
   
    }; $scope.getPosts();

        $scope.getPost=function (title) {
            console.log("getting");
            $http({
                url: '/api/post/' + title,
                method: 'GET'
            }).then(function (response) {
                console.log(response);
                $scope.selectedPost = response.data;
                $scope.selectedPost.selected = true;
            });
            
        };

        $scope.newPost = function () {
            $http({
                url: '/api/posts',
                method: "POST",
                data: {
                    title: $scope.newTitle,
                    content: $scope.newContent,
                    author: $scope.newAuthor,
                    upvotes: "0"

                }
            }).then(function (response) {
                console.log("sending");
                console.log(response);
                $scope.newTitle = '';
                $scope.newContent = '';
                $scope.newAuthor = '';
                $scope.getPosts();
            });

        }; $scope.getPosts();


        $scope.incrementPostUpvotes = function () {
            $scope.selectedPost.upvotes++;
            $http({
                url: '/api/post/' + $scope.selectedPost.title,
                method: "POST",
                data: $scope.selectedPost
            }).then(function (response) {
                $scope.selectedPost.selected = true;
                $scope.getPosts();

            });
        };


        $scope.addComment = function(){
            if($scope.newBody === '') { return; }
            console.log("sending");
            $scope.selectedPost.comments.push({
                body: $scope.newBody,
                author: $scope.newUser
            });
            $http({
                url: '/api/post/' + $scope.selectedPost.title,
                method: 'post',
                data: $scope.selectedPost
            }).then(function (response) {
                console.log("sendinwgasds");
                console.log(response);
                $scope.newBody='';
                 $scope.newUser='';

            });

        };




    }
        ]);

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

