/**
 * Created by Yang on 2017/9/5.
 */
exports.install = function (Vue, options) {
    Vue.prototype.hasPermission = function (userRoles, routeRoles){
        for(let i = 0; i < routeRoles.length; i++){
            let routeRole = routeRoles[i];
            let isFind = false;
            for(let j = 0; j < userRoles.length; j++){
                let userRole = userRoles[j];
                if(userRole === routeRole){
                    isFind = true;
                }
            }
            if(!isFind){
                // 没找到要求的权限
                console.log("false");
                return false;
            }
        }
        console.log("true");
        return true;
    };
};
