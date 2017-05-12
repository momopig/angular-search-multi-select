var demo = angular.module('searchMultiSelectDemo', ['searchMultiSelect']);
demo.controller("DemoController", ['$scope', '$timeout', function ($scope, $timeout) {
    $scope.selectOptionsConfig = {
        hasAllOption:true,
        allOptionIndex: 0,
        selectedOptionsArr: [
            {
                name: "生活1",
                nodeType: 'leaf'},
            {
                name: "工商股东信息",
                nodeType: 'leaf'}
        ],
        // perNum: 4,   // 每行显示的被选中项个数
        // hGap: 12, // 被选中项的水平间距, 默认为8
        placeholder: '请输入您要查找的选项',
        tree:[
            {name: "全部数据", nodeType: 'all',  sub:[], isChecked: false},
        {
            name: "工商数据",
            nodeType:    'dir',
            sub: [{nodeType: 'leaf', name: "工商基本信息", isChecked: false}, {nodeType: 'leaf', name: "工商股东信息", isChecked: false}],
            isChecked: false
        },
            {
                name: "生活1",
                nodeType: 'leaf',
                isChecked: false
            },
            {
                name: "生活2",
                nodeType: 'leaf',
                isChecked: false
            },
            {
                name: "生活3",
                nodeType: 'leaf',
                isChecked: false
            }
            ]
    };
    // $scope.selectOptionsConfig = {
    //     hasAllOption:false,
    //     selectedOptionsArr: [],
    //     tree:[
    //             {
    //                 name: "工商数据3",
    //                 nodeType: 'dir',
    //                 sub: [{nodeType: 'leaf', name: "工商基本信息", isChecked: false}, {nodeType: 'leaf', name: "工商股东信息", isChecked: false}],
    //                 isChecked: false,
    //                 selectedNum: 0
    //             },
    //         {
    //             name: "工商数据1",
    //             nodeType: 'leaf',
    //             isChecked: false,
    //             selectedNum: 0
    //         },
    //         {
    //             name: "工商数据2",
    //             nodeType: 'leaf',
    //             isChecked: false,
    //             selectedNum: 0
    //         },
    //         {
    //             name: "生活3",
    //             nodeType: 'leaf',
    //             isChecked: false,
    //             selectedNum: 0
    //         }
    //     ]
    // };
}])
