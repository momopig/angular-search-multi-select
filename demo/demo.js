var demo = angular.module('searchMultiSelectDemo', ['searchMultiSelect']);
demo.controller("DemoController", ['$scope', '$timeout', function ($scope, $timeout) {
    // $scope.selectOptionsTree = {
    //     "全部数据":{sub:[],isChecked: false, selectedNum: 0},
    //     "工商数据":{sub: [{type:"工商基本信息", isChecked: false},{type:"工商股东信息", isChecked: false},{type:"工商主要人员", isChecked: false},{type:"工商分支机构", isChecked: false}, {type:"工商信息变更", isChecked: false}], isChecked: false, selectedNum: 0},
    //     "法律涉诉信息":{sub: [{type:"裁判文书", isChecked: false},{type:"法院公告", isChecked: false},{type:"开庭公告", isChecked: false},{type:"审判流程", isChecked: false}, {type:"失信被执行人信息", isChecked: false}, {type:"执行信息", isChecked: false}], isChecked: false, selectedNum: 0},
    //     "行政处罚数据":{sub: [{type:"行政处罚", isChecked: false},{type:"欠税信息", isChecked: false},{type:"网贷黑名单", isChecked: false}], isChecked: false, selectedNum: 0},
    //     "舆情类数据":{sub: [{type:"新闻", isChecked: false}],  isChecked: false, selectedNum: 0},
    //     "企业发展信息":{sub: [{type:"专利信息", isChecked: false}], isChecked: false, selectedNum: 0},
    //     "上市公司信息":{sub: [{type:"上市公司基本信息",isChecked: false},{type:"上市公告信息", isChecked: false},{type:"上市公司财报", isChecked: false},{type:"上市公司财报-利润表", isChecked: false},{type:"上市公司财报-资产负债表", isChecked: false}, {type:"上市公司财报-现金流量表", isChecked: false}, {type:"上市公司财报-公司综合能力指标", isChecked: false}], isChecked: false, selectedNum: 0},
    //     "招投标信息":{sub: [{type:"招标信息", isChecked: false},{type:"中标信息", isChecked: false}, {type:"PPP项目库", isChecked: false}], isChecked: false, selectedNum: 0},
    //     "投资基金信息":{sub: [{type:"并购事件", isChecked: false},{type:"融资事件", isChecked: false},{type:"投资事件", isChecked: false},{type:"上市事件", isChecked: false}, {type:"退出事件", isChecked: false}, {type:"投资机构", isChecked: false},  {type:"投资基金", isChecked: false},{type:"因果树-公司信息", isChecked: false}], isChecked: false, selectedNum: 0},
    //     "地产营销信息":{sub: [{type:"吉屋网房价", isChecked: false},{type:"土地项目转让", isChecked: false},{type:"土地招拍挂", isChecked: false},{type:"小区信息-安居客", isChecked: false}, {type:"小区信息-链家", isChecked: false}, {type:"在售房源-安居客", isChecked: false},  {type:"在售房源-链家", isChecked: false}], isChecked: false, selectedNum: 0}
    // };

    $scope.selectOptionsConfig = {
        hasAllOption:true,
        allOptionIndex: 0,
        tree:[
            {name: "全部数据", nodeType: 'all',  sub:[], isChecked: false, selectedNum: 0},
        {
            name: "工商数据",
            nodeType: 'dir',
            sub: [{nodeType: 'leaf', name: "工商基本信息", isChecked: false}, {nodeType: 'leaf', name: "工商股东信息", isChecked: false}],
            isChecked: false,
            selectedNum: 0
        },
            {
                name: "生活",
                nodeType: 'leaf',
                isChecked: false,
                selectedNum: 0
            }
            ]
    };
}])
