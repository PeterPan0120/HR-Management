app.controller('employeeController', [
    '$scope',
    '$rootScope',
    'cookie',
    'uiGridConstants',
    'hrmAPIservice',
    function ($scope, $rootScope, cookie, uiGridConstants, hrmAPIservice) {
        
        var userData = cookie.checkLoggedIn();
        cookie.getPermissions();

        $scope.pageTitle = "Employees Details";
        $scope.formEnabled = 0;
        $scope.employees = {};
        $scope.emp = {};
        $scope.empwork = {};
        $scope.ew = {};

        $scope.gridOptionsComplex = {
            enableFiltering: true,
            showGridFooter: false,
            showColumnFooter: false,
            onRegisterApi: function onRegisterApi(registeredApi) {
                gridApi = registeredApi;
            },
            columnDefs: [
                {
                    name: 'id',
                    visible: false
                }, {
                    name: 'name',
                    width: '20%'
                }, {
                    name: 'telephone',
                    width: '10%',
                    cellClass: 'center'
                }, {
                    name: 'email',
                    width: '15%',
                    enableFiltering: true,
                    cellClass: 'center'
                }, {
                    name: 'StateName',
                    width: '15%',
                    cellClass: 'center'
                }, {
                    name: 'gender',
                    filter: {
                        term: ''
                    },
                    width: '10%',
                    enableCellEdit: false,
                    cellClass: function (grid, row, col, rowRenderIndex, colRenderIndex) {
                        if (grid.getCellValue(row, col) === 'Male') {
                            return 'center blue';
                        } else if (grid.getCellValue(row, col) === 'Female') {
                            return 'center green';
                        }
                    }
                }, {
                    name: 'status',
                    width: '20%',
                    enableFiltering: false,
                    cellClass: 'center',
                    cellTemplate: '<button class="btn btn-sm" ng-class="{\'btn-success\': row.entity.active == 1, ' +
                            '\'btn-default\': row.entity.active == 0 }" style="margin-right: 0; border-top-ri' +
                            'ght-radius: 0; border-bottom-right-radius: 0; " ng-click="grid.appScope.activate' +
                            'Employee(row.entity,1)">Active</button><button class="btn btn-sm btn-default" ng' +
                            '-class="{\'btn-success\': row.entity.active == 0, \'btn-default\': row.entity.ac' +
                            'tive == 1 }" ng-click="grid.appScope.activateEmployee(row.entity,0)" style="bord' +
                            'er-top-left-radius: 0; border-bottom-left-radius: 0;">Inactive</button></a>'
                }, {
                    name: 'action',
                    enableFiltering: false,
                    width: '10%',
                    cellClass: 'center',
                    cellTemplate: '<div class="ui-grid-cell-contents"><i class="fa fa-edit fa-2x" ng-click="grid.ap' +
                            'pScope.editEmployee(row.entity)"></i><i class="fa fa-trash-o fa-2x text-danger" ' +
                            'ng-click="grid.appScope.deleteEmployee(row.entity)"></i></div>'
                }
            ]
        };

        $scope.deleteEmployee = function (empDetail) {
            var answer = confirm("Delete employee " + empDetail.firstname + ' ' + empDetail.lastname + '? Are you sure?');
            if (answer) {
                hrmAPIservice
                    .delete(empDetail, userData, 'employee')
                    .then(function (response) {
                        $scope.gridOptionsComplex.data = response.data.employees;
                    });
            }
        }

        $scope.selectSite = function () {
            console.log('selectSite', $scope.site_location);
            $scope.empwork.site_location = $scope.site_location.value;
        }

        $scope.querySearch = function (query) {
            if (query != null && query.length > 0) {
                return $scope
                    .allsites
                    .filter((location) => {
                        return location
                            .display
                            .toLowerCase()
                            .indexOf(query.toLowerCase()) > -1;
                    });
            }
        }

        $scope.newEmployee = function () {
            $scope.showMessage = 0;
            $scope
                .empform
                .$setPristine();
            $scope.emp = {};
            $scope.empwork = {};
            $scope.emp.id = 0;
            $scope.emp.account_id = userData.account_id;
            $scope.emp.added_by = userData.id;
            $scope.emp.update_by = 0;
            $scope.formEnabled = 1;
        }

        $scope.clearForm = function () {
            alert("");
            $scope.emp = {};
            $scope.empwork = {};
            $scope.site_location = '';
            $scope.formEnabled = 0;
        }

        var setDate = function (date) {
            if (typeof date === 'undefined' || date === null) {
                return new Date();
            }

            var a = date.split('-');
            var d = new Date(a[0], a[1] - 1, a[2]);

            return d;
        }

        $scope.editEmployee = function (empDetail) {
            $scope.showMessage = 0;
            hrmAPIservice
                .get(empDetail.id, 'employee')
                .then(function (response) {
                    $scope.emp = response.data.emp;
                    $scope.emp.dob = setDate($scope.emp.dob);
                    $scope.emp.visaexpiry = setDate($scope.emp.visaexpiry);

                    $scope.empwork = response.data.empwork;
                    $scope.empwork.start_date = setDate($scope.empwork.start_date);
                    if($scope.empwork.end_date === null){
                        $scope.empwork.end_date = null;    
                    }else {
                        $scope.empwork.end_date = setDate($scope.empwork.end_date);
                    }
                    
                    $scope.site_location = {
                        value: response.data.empwork.site_location,
                        display: response.data.empwork.site_location_name
                    };

                    $scope.formEnabled = 1;
                    $scope.emp.update_by = userData.id;
                });
        };

        $scope.activateEmployee = function (row, status) {
            hrmAPIservice
                .activateEmployee(row.id, status)
                .then(function (response) {
                    hrmAPIservice
                        .getEmployeeData(userData)
                        .then(function (response) {
                            $scope.gridOptionsComplex.data = response.data.employees;
                        });
                });
        }

        hrmAPIservice
            .getEmployeeData(userData)
            .then(function (response) {
                $scope.gridOptionsComplex.data = response.data.employees;
                $scope.countryList = response.data.countries;
                $scope.stateList = response.data.states;
                $scope.personList = response.data.persontype;

                $scope.positionList = response.data.positions;
                $scope.levelList = response.data.levels;
                $scope.departmentList = response.data.departments;
                $scope.siteLocationList = response.data.sitelocation;
                $scope.emptypeList = response.data.emptype;

                $scope.allsites = $scope
                    .siteLocationList
                    .map(function (site) {
                        return {value: site.id, display: site.display_text};
                    });

            });

        $scope.saveEmployee = function () {
            console.log($scope.emp);
            console.log($scope.empwork);
            console.log($scope.site_location);
            $scope.empwork.site_location = $scope.site_location.value;

            var cloned_emp = Object.assign({}, $scope.emp);
            var cloned_empwork = Object.assign({}, $scope.empwork);

            cloned_emp.dob = $scope.localTimeToUtc(cloned_emp.dob);
            cloned_emp.visaexpiry = $scope.localTimeToUtc(cloned_emp.visaexpiry);

            cloned_empwork.start_date = $scope.localTimeToUtc(cloned_empwork.start_date);
            cloned_empwork.end_date = $scope.localTimeToUtc(cloned_empwork.end_date);

            delete cloned_empwork.workdate_added;

            console.log(cloned_emp);
            console.log(cloned_empwork);

            hrmAPIservice
                .saveEmployee(cloned_emp, cloned_empwork, userData)
                .then(function (response) {
                    console.log(response);
                    $scope.gridOptionsComplex.data = response.data.employees;

                    $scope.success = 1;
                    $scope.showMessage = 1;
                    $scope.userMessage = "Employee details have been saved successfully!";

                    $scope.emp = {};
                    $scope.empwork = {};
                    $scope.formEnabled = 0;
                    $scope.site_location = '';
                });
        }

        $scope.localTimeToUtc = function (localTime) {
            if(!localTime){
                return null;
            }
            var now_utc = Date.UTC(localTime.getFullYear(), localTime.getMonth(), localTime.getDate(), 0, 0, 0);
            return new Date(now_utc);
        }

        // hrmAPIservice.get(1, 'employee').then(function(response) { $scope.formEnabled
        // = 1;  $scope.emp = response.data.employee; });

    }
]);
