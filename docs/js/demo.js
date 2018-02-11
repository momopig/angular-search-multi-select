    var demo = angular.module('searchMultiSelectDemo', ['searchMultiSelect']);

    demo.controller("DemoController", ['$scope', function ($scope) {

        $scope.currentPro = {name: 'j', age: 12};
        var obj = angular.extend($scope.currentPro, {name: 'test'});
        console.log('test:' + ($scope.currentPro === obj));


        $scope.selectOptionsConfig = {
            hasAllOption:true,
            allOptionIndex: 0, // the index in tree array
            selectedOptionsArr: [{name: "生活3"}, {name: "工商股东信息"}],
            // perNum: 4,   // 每行显示的被选中项个数
            // hGap: 12, // 被选中项的水平间距, 默认为8
            placeholder: '请输入您要查找的选项',
            tree:[
                // 仅 all checkbox需要用户设置nodeType属性，dir checkbox和leaf checkbox不需要
                {name: "全部数据", nodeType: 'all'},
                // 如果配置了数据类型为Array的sub属性，则认为是dir checkbox, 程序会将nodeType默认设为'dir'
                {name: "工商数据", sub: [{name: "工商基本信息"}, {name: "工商股东信息"}]},
                // 如果不配置sub属性，则认为是leaf checkbox, 程序会将nodeType默认设为'leaf'
                {name: "生活1"},
                {name: "生活2"},
                {name: "生活3"},
                {name: "生活4"},
                {name: "生活5"}
            ]
        };
    }]);
