app.controller("trainingcourselistController", ["$scope", "$rootScope", "cookie", "hrmAPIservice", '$location', function($scope, $rootScope, cookie, hrmAPIservice, $location) {
   
    var userData = cookie.checkLoggedIn();
    cookie.getPermissions();
    
    $scope.isAllowed = false;
    var perm = cookie.getCookie("permissions");
    if (perm['18'] == null || perm['18']==undefined)      $scope.isAllowed = false;
    else {
        if (perm['18'].r == '1') $scope.isAllowed = true;
        else                     $scope.isAllowed = false;
    }
    if(!$scope.isAllowed){
        cookie.deleteCookie('user');
        cookie.deleteCookie('permissions');
        $rootScope.isLoggedin = 0;
        $location.path('/');
    }
    
    $scope.pageTitle = "Training Courses";
    $scope.courses = [];
    $scope.showModal = false;


    hrmAPIservice.getCoursesByUser(userData.id).then(function(response) {
        console.log(response.data);
       $scope.gridOptionsComplex.data = response.data;
    });

    $scope.gridOptionsComplex = {
      enableFiltering: true,
      showGridFooter: false,
      showColumnFooter: false,
      onRegisterApi: function onRegisterApi(registeredApi) {
          gridApi = registeredApi;
      },
      columnDefs: [
        { name: 'id', visible: false },
        { name: 'course', width: '30%', enableCellEdit: false },
        { name: 'CourseStatus', width: '20%', cellClass: 'center', enableCellEdit: false, 
            cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex) { 
                if (grid.getCellValue(row,col) == 'Pending') {
                    return 'center pending';
                } else if (grid.getCellValue(row,col) == 'Overdue') {
                    return 'center expired';
                } else {
                    return 'center completed';
                }
            },
            cellTemplate : '<div ng-hide="row.entity.CourseStatus !== \'Pending\'"><a href="javascript:void(0);" ng-click="grid.appScope.gotoCourse(row.entity,1)"><span class="blue">{{ grid.getCellValue(row, col) }}</span></a></div>\n\
                            <div ng-hide="row.entity.CourseStatus !== \'Completed\'"><a href="javascript:void(0);" ng-click="grid.appScope.gotoCourse(row.entity,1)"><span class="green">{{ grid.getCellValue(row, col) }}</span></a></div>\n\
                            <div ng-hide="row.entity.CourseStatus !== \'Overdue\'"><a href="javascript:void(0);" ng-click="grid.appScope.gotoCourse(row.entity,1)"><span class="red">{{ grid.getCellValue(row, col) }}</span></a></div>\n\
                            <div ng-hide="row.entity.CourseStatus !== \'Incomplete\'"><a href="javascript:void(0);" ng-click="grid.appScope.gotoCourse(row.entity,1)"><span class="yellow">{{ grid.getCellValue(row, col) }}</span></a></div>'
        },
        { name: 'DateStarted', width: '20%', enableFiltering: true, cellClass: 'center', enableCellEdit: false },
        { name: 'DateCompleted', width: '20%', cellClass: 'center', enableCellEdit: false },
        { name: 'TimeLeft', width: '10%', enableCellEdit: false,  enableFiltering: true,
            cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex) {
                if (grid.getCellValue(row,col) < 0) {
                    return 'center expired';
                } else {
                    return 'center';
                }
            }
        }
      ]
    };
    $scope.gotoCourse = function(courseObj) {
        if (courseObj.CourseStatus == 'Completed') { // || courseObj.CourseStatus == 'Overdue') {
            return;
        }                
        $location.path('/docourse/' + courseObj.course_id + '/' + courseObj.employee_id);
    }
}]);