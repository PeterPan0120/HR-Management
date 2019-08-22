app.controller("TrainDashboardController", ["$scope", "$rootScope", "cookie", "hrmAPIservice", "$location", "$routeParams",  function($scope, $rootScope, cookie, hrmAPIservice, $location, $routeParams) {
    var userData = cookie.checkLoggedIn(), courseCategory = [];
    cookie.getPermissions();
    
    $scope.isAllowed = false;
    var perm = cookie.getCookie("permissions");
    if (perm['28'] == null || perm['28']==undefined)      $scope.isAllowed = false;
    else {
        if (perm['28'].r == '1') $scope.isAllowed = true;
        else                     $scope.isAllowed = false;
    }
    if(!$scope.isAllowed){
        cookie.deleteCookie('user');
        cookie.deleteCookie('permissions');
        $rootScope.isLoggedin = 0;
        $location.path('/');
    }
    
    console.log(userData);
    var showMode = 0;
    var locationMode = 0;
    //console.log(userData);

    $scope.pageTitle = "Dashboard";
    $scope.alloc_courses = [];
    $scope.showModal = false;
    $scope.showMode = 0;
    $scope.locationMode = 0;
    if(!angular.isDefined($rootScope.perms.TrainDashboard)){
        $scope.training_read = 0;
        $scope.training_write = 0;
        $scope.training_delete = 0;
    }else{
        $scope.training_read = ($rootScope.perms.TrainDashboard.read > 0) ? true : false; //tranning permission
        $scope.training_write = ($rootScope.perms.TrainDashboard.write > 0) ? true : false; //tranning permission
        $scope.training_delete = ($rootScope.perms.TrainDashboard.delete > 0) ? true : false; //tranning permission
        console.log($scope);
    }
    //console.log($scope);
    // Sort function.
    $scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    };
    
    $scope.showActiveData = function(){
        $scope.showMode = 0;
        showMode = $scope.showMode;
        hrmAPIservice.getAllocCourseData(userData, showMode, locationMode).then(function(response) {
            console.log(response.data);
            //console.log('Get Alloc Course Data: ', response.data.alloc_courses);
            //var alloc_courses = response.data.alloc_courses;
            $scope.gridOptionsComplex.data = response.data.alloc_courses;
            //filterAllocCourseData(alloc_courses);
        });
    }
    
    $scope.showAllData = function(){
        $scope.showMode = 1;
        showMode = $scope.showMode;
        hrmAPIservice.getAllocCourseData(userData, showMode, locationMode).then(function(response) {
            console.log(response.data);
            //console.log('Get Alloc Course Data: ', response.data.alloc_courses);
            //var alloc_courses = response.data.alloc_courses;
            $scope.gridOptionsComplex.data = response.data.alloc_courses;
            //filterAllocCourseData(alloc_courses);
        });
    }
    
    $scope.showYourLocationData = function(){
        $scope.locationMode = 0;
        locationMode = $scope.locationMode;
        hrmAPIservice.getAllocCourseData(userData, showMode, locationMode).then(function(response) {
            console.log(response.data);
            //console.log('Get Alloc Course Data: ', response.data.alloc_courses);
            //var alloc_courses = response.data.alloc_courses;
            $scope.gridOptionsComplex.data = response.data.alloc_courses;
            //filterAllocCourseData(alloc_courses);
        });
    }
    
    $scope.showAllLocationsData = function(){
        $scope.locationMode = 1;
        locationMode = $scope.locationMode;
        hrmAPIservice.getAllocCourseData(userData, showMode, locationMode).then(function(response) {
            console.log(response.data);
            //console.log('Get Alloc Course Data: ', response.data.alloc_courses);
            //var alloc_courses = response.data.alloc_courses;
            $scope.gridOptionsComplex.data = response.data.alloc_courses;
            //filterAllocCourseData(alloc_courses);
        });
    }
    
    hrmAPIservice.getAllocCourseData(userData, showMode, locationMode).then(function(response) {
        console.log(response.data);
        //console.log('Get Alloc Course Data: ', response.data.alloc_courses);
        //var alloc_courses = response.data.alloc_courses;
        $scope.gridOptionsComplex.data = response.data.alloc_courses;
        //filterAllocCourseData(alloc_courses);
    });
     
    $scope.gridOptionsComplex = {
        enableFiltering: true,
        showGridFooter: true,
        showColumnFooter: false,
        onRegisterApi: function onRegisterApi(registeredApi) {
            gridApi = registeredApi;
        },
        columnDefs: [
          { name: 'id', visible: false },
          { name: 'PersonName', width: '15%', enableCellEdit: false, displayName: 'Person Name' },
          { name: 'course_name', width: '30%', enableFiltering: true, cellClass: 'center', enableCellEdit: false, displayName: 'Course Name' },
          { name: 'SiteLocation', width: '15%', enableFiltering: true, cellClass: 'center', enableCellEdit: false, displayName: 'Site Location' },
          { name: 'AllocDate', width: '10%', enableFiltering: true, cellClass: 'center', enableCellEdit: false, displayName: 'Date Allocated' },
          { name: 'course_status', width: '10%', enableFiltering: true, cellClass: 'center', displayName: 'Status', headerCellClass: 'center', enableCellEdit: false,
              cellTemplate: '<div ng-hide="row.entity.course_status !== \'Pending\'"><span class="blue">Pending</span></div>\n\
                             <div ng-hide="row.entity.course_status != \'Completed\'"><span class="green">Completed</span></div>\n\
                             <div ng-hide="row.entity.course_status != \'Overdue\'"><span class="red">Overdue</span></div>\n\
                             <div ng-hide="row.entity.course_status != \'Incomplete\'"><span class="brownyellow">Incomplete</span></div>'                
            },
          { name: 'TimeLeft', width: '10%', enableFiltering: false, cellClass: 'center', headerCellClass: 'center', enableCellEdit: false, displayName: 'Days Remaining' },
          { name: 'action', enableFiltering: false, width: '10%',  cellClass: 'center', enableSorting: false,headerCellClass: 'center', enableCellEdit: false,
              cellTemplate: '<div class="ui-grid-cell-contents"><i class="fa fa-edit fa-2x" ng-click="grid.appScope.editAllocCourse(row.entity)" ng-if="grid.appScope.training_write"></i>&nbsp;&nbsp;<i class="fa fa-trash-o fa-2x text-danger" ng-click="grid.appScope.removeAllocCourse(row.entity)" ng-if="grid.appScope.training_delete"></i></div>'
          }
        ]
    };    

    function filterAllocCourseData(alloc_courses) {
        var courses = [];
        console.log(alloc_courses);
        for(var i = 0; i < alloc_courses.length; i++) {
            var item = alloc_courses[i];
            var status = item.status;

            //Completed.
            if(status == 1) {
                item["course_status"] = "Completed";
                item["status_class"] = "green";
                var completed_date = new Date(item["completed_date"]);
                var day = completed_date.getDate()
                var month = completed_date.getMonth() + 1
                var year = completed_date.getFullYear()
                var completed_string = day + "/" + month + "/" + year;

                item["days_remain"] = completed_string;
            }
            else if(status == 0) {
                var alloc_date = item["alloc_date"];
                var expire_hours = item["expire_hours"];

                var date1 = new Date(alloc_date);
                var date1 = dateAdd(date1, expire_hours, 'hours');
                var date2 = new Date();

                var timeDiff = date1.getTime() - date2.getTime();
                var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

                item["days_remain"] = diffDays;

                if(diffDays >= 0) {
                    item["course_status"] = "Pending";
                    item["status_class"] = "blue";
                }
                else {
                    item["course_status"] = "Overdue";
                    item["status_class"] = "red";
                }

            }

            courses[i] = item;
        }
        $scope.alloc_courses = courses;
    }

    $scope.allocCourse = function() {
        console.log("allocCourse");
        location.href = "#/alloc_course";
    }

    function dateAdd(original, increment, unit) {

        // Return undefiend if first argument isn't a Date object
        if (!(original instanceof Date)) {
            return(undefined);
        }

        switch(unit) {
            case 'seconds':
                // Add number of secodns to current date (ms*1000)
                var newDate = new Date(original);
                newDate.setTime(original.getTime() + (increment*1000));
                return newDate;
                break;
            case 'minutes':
                // Add number of minutes to current date (ms*1000*60)
                var newDate = new Date(original);
                newDate.setTime(original.getTime() + (increment*1000*60));
                return newDate;
                break;
            case 'hours':
                // Add number of hours to current date (ms*1000*60*60)
                var newDate = new Date(original);
                newDate.setTime(original.getTime() + (increment*1000*60*60));
                return newDate;
                break;
            case 'days':
                // Add number of days to current date
                var newDate = new Date(original);
                newDate.setDate(original.getDate() + increment);
                return newDate;
                break;
            case 'weeks':
                // Add number of weeks to current date
                var newDate = new Date(original);
                newDate.setDate(original.getDate() + (increment*7));
                return newDate;
                break;
            case 'months':
                // Get current date
                var oldDate = original.getDate();

                // Increment months (handles year rollover)
                var newDate = new Date(original);
                newDate.setMonth(original.getMonth() + increment);

                // If new day and old day aren't equal, set new day to last day of last month
                // (handles edge case when adding month to Jan 31st for example. Now goes to Feb 28th)
                if (newDate.getDate() != oldDate) {
                    newDate.setDate(0);
                }

                // Handle leap years
                // If old date was Feb 29 (leap year) and new year isn't leap year, set new date to Feb 28
                if (original.getDate() == 29 && !isLeapYear(newDate.getFullYear())) {
                    newDate.setMonth(1);
                    newDate.setDate(28);
                }

                return newDate;
                break;
            case 'years':
                // Increment years
                var newDate = new Date(original);
                newDate.setFullYear(original.getFullYear() + increment);

                // Handle leap years
                // If old date was Feb 29 (leap year) and new year isn't leap year, set new date to Feb 28
                if (original.getDate() == 29 && !isLeapYear(newDate.getFullYear())) {
                    newDate.setMonth(1);
                    newDate.setDate(28);
                }

                return newDate;
                break;
            // Defaults to milliseconds
            default:
                var newDate = new Date(original);
                newDate.setTime(original.getTime() + increment);
                return newDate;
        }
    };

    function isLeapYear(year) {
        return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
    }

    // Remove Course.
    $scope.removeAllocCourse = function(course) {
        $scope.showModal = true;
        selectedCourse = course;
    };

    $scope.remove = function() {
        $scope.showModal = false;
        if(selectedCourse != null) {
            hrmAPIservice.delAllocCourse(selectedCourse.id, userData.id).then(function(response) {
                var alloc_courses = response.data.alloc_courses;
                filterAllocCourseData(alloc_courses);
            });
        }
    };

    $scope.cancel = function() {
        $scope.showModal = false;
    };

    $scope.editAllocCourse = function(course) {
        location.href = "#/edit_alloc_course/" + course.id;
    };

}]);

