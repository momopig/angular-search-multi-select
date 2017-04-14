/**
 * Created by Jamter on 17/4/14.
 */
module.exports = function (mod) {
    /**
     * @desc 用于判断一个对象是否是空对象{}, 是则返回true
     *
     * */
    mod.filter('isEmptyObject', [function () {
        var bar;
        return function (obj) {
            for (bar in obj) {
                if (obj.hasOwnProperty(bar)) {
                    return false;
                }
            }
            return true;
        };
    }]);
}
