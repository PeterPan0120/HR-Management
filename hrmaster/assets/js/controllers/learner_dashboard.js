app.controller('learnerController', ['$scope', 'hrmAPIservice', '$rootScope', 'cookie', function ($scope, hrmAPIservice, $rootScope, cookie) {
    var userData = cookie.checkLoggedIn();
    cookie.getPermissions();
    $scope.txt = '';

    console.log("AAAAAAAAAAAAAAAA");
    console.log($rootScope.perms);
}
]);