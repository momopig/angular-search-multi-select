/**
 * Created by Jamter on 17/4/14.
 */
require('./index.less');

module.exports = function (mod) {
    require('./filter.js')(mod);
    mod.directive('searchMultiSelect', ['$log',function ($log) {
        return {
            restrict: 'EA',
            scope: {
                selectOptionsConfig: '='
            //     $scope.selectOptionsConfig.tree = {
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
            },
            template: require('./index.html'),
            controller: ['$scope', function($scope) {
                $scope.selectNodeType = {};
                //{'法律涉诉信息'}
                $scope.selectDestType = {};
                $scope.choosed = '';
                $scope.choosedArr = [];

                $scope.dataTypes = [];
                $scope.viewSettings = {
                    searchDataTypeName : '',
                    showMenu: false
                };
                $scope.tree_search_result =  $scope.selectOptionsConfig.tree;

                /**
                 * @desc 根据目录节点的checkbox选中状态(全选和非全选), 统一设置目录节点的所有子节点的选中状态
                 *
                 * */
                var setSubTypes = function(optionObj){
                    for(var i = 0, l = optionObj.sub.length; i < l; i++){
                        optionObj.sub[i].isChecked = optionObj.isChecked;
                    };
                };
                /**
                 * @desc 根据目录节点的checkbox选中状态(全选和非全选), 设置目录节点的子节点选中的个数(selectedNum)
                 * @param nodeType string 用于区分点击的节点是目录节点,还是叶子节点
                 * @param dirTypeName string 目录节点名称
                 *
                 * */
                $scope.setSelectLength = function(optionObj){
                    if(optionObj.nodeType === 'dir'){
                        if(optionObj.isChecked){
                            optionObj.selectedNum = optionObj.sub.length;
                            if($scope.selectOptionsConfig.hasAllOption) {
                                $scope.selectOptionsConfig.tree[optionObj.parentIndex].selectedNum++;
                                if($scope.selectOptionsConfig.tree[optionObj.parentIndex].selectedNum === $scope.selectOptionsConfig.tree.length - 1){
                                    $scope.selectOptionsConfig.tree[optionObj.parentIndex].isChecked = true;
                                }
                            }
                        }else{
                            optionObj.selectedNum = 0;
                            if($scope.selectOptionsConfig.hasAllOption) {
                                $scope.selectOptionsConfig.tree[optionObj.parentIndex].selectedNum--;
                                $scope.selectOptionsConfig.tree[optionObj.parentIndex].isChecked = false;
                            }
                        }
                        setSubTypes(optionObj);
                    }else if(optionObj.nodeType === 'leaf'){
                        if(optionObj.isChecked){
                            $scope.selectOptionsConfig.tree[optionObj.parentIndex].selectedNum++;
                            //子节点全部被选中时,目录节点的checkbox则为true
                            if($scope.selectOptionsConfig.tree[optionObj.parentIndex].selectedNum === $scope.selectOptionsConfig.tree[optionObj.parentIndex].sub.length){
                                $scope.selectOptionsConfig.tree[optionObj.parentIndex].isChecked = true;
                            }
                        }else{
                            $scope.selectOptionsConfig.tree[optionObj.parentIndex].selectedNum--;
                            //有一个子节点不选中时,目录节点的checkbox则为false
                            $scope.selectOptionsConfig.tree[optionObj.parentIndex].isChecked = false;
                            $scope.selectOptionsConfig.tree[$scope.selectOptionsConfig.allOptionIndex].isChecked = false;
                        }
                    }else if(optionObj.nodeType === 'all'){
                        $scope.selectOptionsConfig.tree.forEach(function(item, index) {
                            if(item.nodeType === 'all'){
                                return;
                            }
                            item.isChecked = optionObj.isChecked;
                            //此时$index为$scope.selectOptionsConfig.allOptionIndex
                            $scope.setSelectLength(item);
                        });

                    }
                };
                $scope.searchDataType = function(optionName){
                    $scope.tree_search_result = [];
                    if(optionName === '' || optionName === undefined){
                        $scope.tree_search_result = $scope.selectOptionsConfig.tree;
                        return;
                    }
                    $scope.selectOptionsConfig.tree.forEach(function(item) {
                        if (item.nodeType === 'leaf') {
                            if(item.name.indexOf(optionName) != -1){
                                $scope.tree_search_result.push(item);
                            }
                        } else if (item.nodeType === 'dir') {
                            if(!Array.isArray(item.sub)) {
                                return;
                            }
                            for(var i = 0, l = item.sub.length; i < l; i++){
                                if(item.sub[i].name.indexOf(optionName) != -1){
                                    $scope.tree_search_result.push(item.sub[i]);
                                }
                            }
                        }

                    });
 
                };
                var getAllTypes = function(){

                };

                /**
                 * @desc
                 *@param selectNodeType object 例子为{"裁判文书":true,"法院公告":false,"开庭公告":false,"审判流程":true}
                 * */
                var getDataTypesString = function(){
                    var array = [];
                    for(var key in $scope.selectOptionsConfig.tree){
                        if(key === '全部数据'){
                            continue;
                        }
                        for(var i = 0, l = $scope.selectOptionsConfig.tree[key].sub.length; i < l; i++){
                            var leafTypeItem = $scope.selectOptionsConfig.tree[key].sub[i];
                            if(leafTypeItem.isChecked){
                                array.push(leafTypeItem.name);
                            }
                        }
                    }
                    return array.join(',');
                };
                $scope.closeDataTypePanel = function($event){
                    var target = $event.target;
                    if($(target).parents('.type-select-panel').length === 0 && $(target).parents('.input-box').length === 0){
                        $scope.viewSettings.showMenu = false;
                    }
                }
                /**
                 * @desc 用于删除数据类型输入域中选中的字段(每个字段对应一个删除按钮),字段分为三类:全部数据(all)、目录节点(dir)和叶子节点(leaf)
                 *
                 * */
                $scope.delSelectedType = function(typeItem){
                    typeItem.isChecked = false;
                    $scope.setSelectLength(typeItem);
                    //  var subTypesArr = typeItem.sub;
                    //
                    // if(typeItem.nodeType === 'all'){
                    //     $scope.setSelectLength('all', '全部数据', false );
                    // }else if(typeItem.nodeType === 'dir'){
                    //     typeItem.isChecked = false;
                    //     typeItem.selectedNum = 0;
                    //     for(var i = 0, l = subTypesArr.length; i < l; i++){
                    //         subTypesArr[i].isChecked = false;
                    //     }
                    // }else{
                    //     typeItem.isChecked = false;
                    // }
                };

                $scope.choose = function(name) {
                    $scope.selectNodeType[name] = !$scope.selectNodeType[name];
                };
                $scope.$watch('selectOptionsConfig.tree', function(newVal, oldVal){
                    $scope.choosedArr = [];
                    var selectedType;
                    if($scope.selectOptionsConfig.tree[$scope.selectOptionsConfig.allOptionIndex].isChecked){
                        selectedType = $scope.selectOptionsConfig.tree[$scope.selectOptionsConfig.allOptionIndex];
                        $scope.choosedArr.push(selectedType);
                    }else{
                        $scope.selectOptionsConfig.tree.forEach(function(item, index) {
                            if(item.isChecked){
                                selectedType = item;
                                $scope.choosedArr.push(selectedType);
                                return;
                            }
                            if(item.nodeType === 'dir' && item.sub) {
                                for(var i = 0, l = item.sub.length; i < l; i++){
                                    if(item.sub[i].isChecked){
                                        selectedType = item.sub[i];
                                        $scope.choosedArr.push(selectedType);
                                    }
                                }
                            }
                        });
                    }

                    // $scope.choosed = getDataTypesString();
                    if(newVal !== oldVal){
                        $('#searchDataType').focus();
                    }
                }, true);

                $scope.selectOptionsConfig.tree.forEach(function(outerItem, outerIndex) {

                    outerItem.index = outerIndex;
                    // 包括nodeType为'dir'和'leaf'的情况
                    if ($scope.selectOptionsConfig.hasAllOption && outerItem.nodeType !== 'all') {
                        outerItem.parentIndex = $scope.selectOptionsConfig.allOptionIndex;
                    }
                    if (outerItem.nodeType === 'dir' && angular.isArray(outerItem.sub)) {
                        outerItem.sub.forEach(function(innerItem, innerIndex) {
                            innerItem.parentIndex = outerIndex;
                            innerItem.index = innerIndex;
                        });
                    }

                });

            }]
        };
    }]);
}
