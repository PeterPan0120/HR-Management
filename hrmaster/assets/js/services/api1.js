app
    .service("hrmAPIservice", function ($http, cookie) {
        var hrmAPI = {};
        return hrmAPI.doLogin = function (usr, pw) {
            return $http({
                method: "POST",
                data: {
                    username: usr,
                    password: pw
                },
                url: "auth/login"
            })
        },
        hrmAPI.send = function (param) {
            return cookie.resetCookie(),
            $http({method: "GET", data: {}, url: param})
        },
        hrmAPI.forgotPassword = function (email) {
            return $http({
                method: "POST",
                data: {
                    email: email
                },
                url: "auth/forgotpassword"
            })
        },
        hrmAPI.resetPassword = function (u, p) {
            return $http({
                method: "POST",
                data: {
                    username: u,
                    password: p
                },
                url: "auth/resetpassword"
            })
        },
        hrmAPI.getEmailFromHash = function (hash) {
            return $http({
                method: "POST",
                data: {
                    hash: hash
                },
                url: "auth/getemailfromhash"
            })
        },
        hrmAPI.getPermissionData = function () {
            return cookie.resetCookie(),
            $http({method: "POST", data: {}, url: "auth/getpermissiondata"})
        },
        hrmAPI.savePermissions = function (role, modules) {
            return cookie.resetCookie(),
            $http({
                method: "POST",
                data: {
                    role: role,
                    modules: modules
                },
                url: "auth/savepermissions"
            })
        },
        hrmAPI.getPermissions = function (role) {
            return cookie.resetCookie(),
            $http({
                method: "GET",
                data: {},
                url: "auth/getpermissions/" + role
            })
        },
        hrmAPI.getRoles = function () {
            return cookie.resetCookie(),
            $http({
                method: "POST",
                data: {
                    action: "getRoles"
                },
                url: "assets/php/ajax.php"
            })
        },
        hrmAPI.getEmployeeData = function (userData) {
            return cookie.resetCookie(),
            $http({
                method: "POST",
                data: {
                    currUser: userData
                },
                url: "employee/getdata"
            })
        },
        hrmAPI.getUserData = function (userData, isAdmin) {
            return cookie.resetCookie(),
            isAdmin = angular.isDefined(isAdmin)
                ? isAdmin
                : 0,
            $http({
                method: "POST",
                data: {
                    currUser: userData,
                    admin: isAdmin
                },
                url: "user/getdata"
            })
        },

        hrmAPI.getUsers = function (userData, isAdmin) {
            return cookie.resetCookie(),
            isAdmin = angular.isDefined(isAdmin)
                ? isAdmin
                : 0,
            $http({
                method: "POST",
                data: {
                    currUser: userData,
                    admin: isAdmin
                },
                url: "user/getlist"
            })
        },

        hrmAPI.getUserGlobalData = function () {
            return cookie.resetCookie(),
            $http({method: "POST", url: "user/getglobaldata"})
        },
        hrmAPI.getUserById = function (user_id) {
            return cookie.resetCookie(),
            $http({
                method: "POST",
                data: {
                    user_id: user_id
                },
                url: "user/getuser"
            })
        },

        hrmAPI.getCoursesByUser = function (userId) {
            return cookie.resetCookie(),
            $http({
                method: "POST",
                data: {
                    userId: userId
                },
                url: "course/getcoursesbyuser"
            })
        },

        hrmAPI.searchUser = function (keyword, userData, usertype) {
            return cookie.resetCookie(),
            $http({
                method: "POST",
                data: {
                    keyword: keyword,
                    userData: userData,
                    usertype: usertype
                },
                url: "user/search"
            })
        },

        hrmAPI.searchEmployee = function (keyword, userData) {
            return cookie.resetCookie(),
            $http({
                method: "POST",
                data: {
                    keyword: keyword,
                    userData: userData
                },
                url: "employee/search"
            })
        },

        hrmAPI.searchEmployeeUser = function (keyword, userData) {
            return cookie.resetCookie(),
            $http({
                method: "POST",
                data: {
                    keyword: keyword,
                    userData: userData
                },
                url: "employeeuser/search"
            })
        },

        hrmAPI.searchData = function (keyword, type, id) {
            if (typeof id === 'undefined') {
                id = 0;
            }
            return cookie.resetCookie(),
            $http({
                method: "POST",
                data: {
                    keyword: keyword,
                    type: type,
                    account_id: id
                },
                url: "data/search"
            })
        },

        hrmAPI.saveEmployee = function (emp, empwork, userData) {
            return cookie.resetCookie(),
            $http({
                method: "POST",
                data: {
                    action: "saveEmployee",
                    emp: emp,
                    empwork: empwork,
                    currUser: userData
                },
                url: "employee/save"
            })
        },
        hrmAPI.delete = function (detail, userData, type) {
            return cookie.resetCookie(),
            $http({
                method: "POST",
                data: {
                    typeDetail: detail,
                    currUser: userData,
                    type: type
                },
                url: "delete"
            })
        },
        hrmAPI.get = function (id, type) {
            return cookie.resetCookie(),
            $http({
                method: "GET",
                data: {},
                url: "get/" + type + "/" + id
            })
        },
        hrmAPI.getUserLoginDetail = function (id, type) {
            return cookie.resetCookie(),
            $http({
                method: "GET",
                data: {},
                url: "user/getlogindetail/" + id
            })
        },
        hrmAPI.saveUser = function (user, userData, newaccount) {
            return cookie.resetCookie(),
            $http({
                method: "POST",
                data: {
                    user: user,
                    userData: userData,
                    newaccount: newaccount
                },
                url: "user/save"
            })
        },
        hrmAPI.saveChildUser = function (user, userData, newaccount) {
            return cookie.resetCookie(),
            $http({
                method: "POST",
                data: {
                    user: user,
                    userData: userData
                },
                url: "user/save_child_user"
            })
        },

        hrmAPI.updateUser = function (user, userData) {
            return cookie.resetCookie(),
            $http({
                method: "POST",
                data: {
                    user: user,
                    userData: userData
                },
                url: "user/update"
            })
        },
        hrmAPI.getUserData = function () {
            return cookie.resetCookie(),
            $http({method: "POST", data: {}, url: "user/getdata"})
        },

        hrmAPI.getEmployeeList = function (user_id, usertype) {
            return cookie.resetCookie(),
            $http({
                method: "POST",
                data: {
                    user_id: user_id,
                    usertype: usertype
                },
                url: "user/get_employee_list"
            })
        },
        hrmAPI.releaseLock = function (userId) {
            return cookie.resetCookie(),
            $http({
                method: "POST",
                data: {
                    userId: userId
                },
                url: "user/releaselock"
            })
        },
        hrmAPI.activateEmployee = function (employeeId, status) {
            return cookie.resetCookie(),
            $http({
                method: "POST",
                data: {
                    action: "activateEmployee",
                    employeeId: employeeId,
                    status: status
                },
                url: "assets/php/ajax.php"
            })
        },

        hrmAPI.activateUser = function (userId, status) {
            return cookie.resetCookie(),
            $http({
                method: "POST",
                data: {
                    userId: userId,
                    status: status
                },
                url: "user/activateuser"
            })
        },
        hrmAPI.activateCourse = function (courseId, status) {
            return cookie.resetCookie(),
            $http({
                method: "POST",
                data: {
                    courseId: courseId,
                    status: status
                },
                url: "course/activatecourse"
            })
        },
        hrmAPI.getCourseData = function (user_id) {
            return cookie.resetCookie(),
            $http({
                method: "POST",
                data: {
                    user_id: user_id
                },
                url: "course/getdata"
            })
        },
        hrmAPI.getCourse = function (course_id, userData) {
            return cookie.resetCookie(),
            $http({
                method: "POST",
                data: {
                    currUser: userData,
                    course_id: course_id
                },
                url: "course/getCourseSingle"
            })
        },
        hrmAPI.getCourseById = function (course_id, employee_id) {
            return cookie.resetCookie(),
            $http({
                method: "POST",
                data: {
                    currUser: 'userData',
                    course_id: course_id,
                    employee_id: employee_id
                },
                url: "course/getCourse"
            })
        },
        hrmAPI.getCourseCategory = function () {
            return cookie.resetCookie(),
            $http({
                method: "POST",
                data: {
                    currUser: 'userData'
                },
                url: "course/getCate"
            })
        },
        hrmAPI.saveCourse = function (courseData, userData) { // update course
            return cookie.resetCookie(),
            $http({
                method: "POST",
                data: {
                    courseData: courseData,
                    currUser: userData
                },
                url: "course/saveCourse"
            })
        },
        hrmAPI.addCourse = function (courseAddData) { // add course
            return cookie.resetCookie(),
            $http({
                method: "POST",
                data: {
                    courseData: courseAddData
                },
                url: "course/addCourse"
            })
        },
        hrmAPI.delCourse = function (course_id, user_id) {
            return cookie.resetCookie(),
            $http({
                method: "POST",
                data: {
                    course_id: course_id,
                    user_id: user_id
                },
                url: "course/delCourse"
            })
        },
        hrmAPI.searchCourse = function (keyword) {
            return cookie.resetCookie(),
            $http({
                method: "POST",
                data: {
                    keyword: keyword
                },
                url: "course/searchCourse"
            })
        },
        hrmAPI.allocCourse = function (allocCourseData) {
            return cookie.resetCookie(),
            $http({
                method: "POST",
                data: {
                    allocCourseData: allocCourseData
                },
                url: "course/allocCourse"
            })
        },
        hrmAPI.getAllocCourseData = function (user_id) {
            return cookie.resetCookie(),
            $http({
                method: "POST",
                data: {
                    user_id: user_id
                },
                url: "course/getAllocCourses"
            })
        },
        hrmAPI.delAllocCourse = function (alloc_course_id, user_id) {
            return cookie.resetCookie(),
            $http({
                method: "POST",
                data: {
                    alloc_course_id: alloc_course_id,
                    user_id: user_id
                },
                url: "course/delAllocCourse"
            })
        },
        hrmAPI.getAllocCourseById = function (alloc_course_id) {
            return cookie.resetCookie(),
            $http({
                method: "POST",
                data: {
                    alloc_course_id: alloc_course_id
                },
                url: "course/getAllocCourseById"
            })
        },
        hrmAPI.updateAllocCourse = function (allocCourseData) {
            return cookie.resetCookie(),
            $http({
                method: "POST",
                data: {
                    allocCourseData: allocCourseData
                },
                url: "course/updateAllocCourse"
            })
        },

        hrmAPI.removeMedia = function (type, qid) {
            return cookie.resetCookie(),
            $http({
                method: "POST",
                data: {
                    type: type,
                    questionId: qid
                },
                url: "media/remove"
            })

        },

        hrmAPI.getHSData = function (userData) {
            return cookie.resetCookie(),
            $http({
                method: "POST",
                data: {
                    user: userData
                },
                url: "hs/getdata"
            })
        },

        hrmAPI.saveHS = function (hs, userData) {
            return cookie.resetCookie(),
            $http({
                method: "POST",
                data: {
                    hs: hs,
                    user: userData
                },
                url: "hs/savehs"
            })
        },

        hrmAPI.getSiteData = function (userData, account_id) {
            return cookie.resetCookie(),
            $http({
                method: "POST",
                data: {
                    user: userData,
                    account_id: account_id
                },
                url: "get/sitedata"
            })
        },

        hrmAPI.saveData = function (obj, userData) {
            return cookie.resetCookie(),
            $http({
                method: "POST",
                data: {
                    user: userData,
                    sitedata: obj
                },
                url: "site/savedata"
            })
        },

        hrmAPI.submitAnswer = function (courseId, employeeId, questionId, answerId) {
            return cookie.resetCookie(),
            $http({
                method: "POST",
                data: {
                    course_id: courseId,
                    employee_id: employeeId,
                    question_id: questionId,
                    answer_id: answerId
                },
                url: "course/submitanswer"
            })
        },

        hrmAPI.getARData = function (userData) {
            return cookie.resetCookie(),
            $http({
                method: "POST",
                data: {
                    user: userData
                },
                url: "assetregister/getdata"
            })
        },

        hrmAPI.saveAR = function (ar, userData) {
            return cookie.resetCookie(),
            $http({
                method: "POST",
                data: {
                    ar: ar,
                    user: userData
                },
                url: "assetregister/save"
            })
        },

        hrmAPI.startCourse = function (courseId, employeeId) {
            return cookie.resetCookie(),
            $http({
                method: "POST",
                data: {
                    course_id: courseId,
                    employee_id: employeeId
                },
                url: "course/start"
            })
        },

        hrmAPI
    })
