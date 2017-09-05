/**
 * Created by Yang on 2017/9/5.
 */
exports.install = function (Vue, options) {
    Vue.prototype.hasPermission = function (userRoles, routeRoles){
        for(let routeRole in routeRoles){
            let isFind = false;
            for(let userRole in userRoles){
                if(userRole === routeRole){
                    isFind = true;
                }
            }
            if(!isFind){
                // 没找到要求的权限
                return false;
            }
        }
        return true;
    };
};
