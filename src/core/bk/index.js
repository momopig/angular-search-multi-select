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
                selectOptionsTree: '='
            //     $scope.selectOptionsTree = {
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
            // }
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
                /**
                 * @desc 根据目录节点的checkbox选中状态(全选和非全选), 统一设置目录节点的所有子节点的选中状态
                 *
                 * */
                var setSubTypes = function(destTypeName){
                    for(var i = 0, l = $scope.selectOptionsTree[destTypeName].sub.length; i < l; i++){
                        $scope.selectOptionsTree[destTypeName].sub[i].isChecked = $scope.selectOptionsTree[destTypeName].isChecked;
                    };
                };
                /**
                 * @desc 根据目录节点的checkbox选中状态(全选和非全选), 设置目录节点的子节点选中的个数(selectedNum)
                 * @param clickType string 用于区分点击的节点是目录节点,还是叶子节点
                 * @param destTypeName string 目录节点名称
                 *
                 * */
                $scope.setSelectLength = function(clickType, destTypeName, isChecked){
                    if(clickType === 'dest'){
                        if(isChecked){
                            $scope.selectOptionsTree[destTypeName].selectedNum = $scope.selectOptionsTree[destTypeName].sub.length;
                            $scope.selectOptionsTree['全部数据'].selectedNum++;
                            if($scope.selectOptionsTree['全部数据'].selectedNum === Object.keys($scope.selectOptionsTree).length - 1){
                                $scope.selectOptionsTree['全部数据'].isChecked = true;
                            }
                        }else{
                            $scope.selectOptionsTree[destTypeName].selectedNum = 0;
                            $scope.selectOptionsTree['全部数据'].selectedNum--;
                            $scope.selectOptionsTree['全部数据'].isChecked = false;
                        }
                        setSubTypes(destTypeName);
                    }else if(clickType === 'leaf'){
                        if(isChecked){
                            $scope.selectOptionsTree[destTypeName].selectedNum++;
                            //子节点全部被选中时,目录节点的checkbox则为true
                            if($scope.selectOptionsTree[destTypeName].selectedNum === $scope.selectOptionsTree[destTypeName].sub.length){
                                $scope.selectOptionsTree[destTypeName].isChecked = true;
                            }
                        }else{
                            $scope.selectOptionsTree[destTypeName].selectedNum--;
                            //有一个子节点不选中时,目录节点的checkbox则为false
                            $scope.selectOptionsTree[destTypeName].isChecked = false;

                            $scope.selectOptionsTree['全部数据'].selectedNum--;
                            $scope.selectOptionsTree['全部数据'].isChecked = false;
                        }
                    }else if(clickType === 'all'){
                        for(var key in $scope.selectOptionsTree){
                            if(key === '全部数据'){
                                continue;
                            }
                            $scope.selectOptionsTree[key].isChecked = isChecked;
                            $scope.setSelectLength('dest', key, isChecked);
                        }
                    }

                };
                $scope.selectOptionsTree_search_result =  $scope.selectOptionsTree;
                $scope.searchDataType = function(dataTypeName){
                    $scope.selectOptionsTree_search_result = {};
                    if(dataTypeName === '' || dataTypeName === undefined){
                        $scope.selectOptionsTree_search_result = $scope.selectOptionsTree;
                        return;
                    }
                    for(var key in $scope.selectOptionsTree){

                        for(var i = 0, l = $scope.selectOptionsTree[key].sub.length; i < l; i++){
                            if($scope.selectOptionsTree[key].sub[i].type.indexOf(dataTypeName) != -1){
                                if(!$scope.selectOptionsTree_search_result[key]){
                                    $scope.selectOptionsTree_search_result[key] = {
                                        sub : []
                                    };
                                }
                                $scope.selectOptionsTree_search_result[key].sub.push($scope.selectOptionsTree[key].sub[i]);
                            }
                        }
                        /*                                if(key.indexOf(dataTypeName) != -1){
                         $scope.selectOptionsTree_search_result[key] = $scope.selectOptionsTree[key];
                         continue;
                         }else{
                         for(var i = 0, l = $scope.selectOptionsTree[key].sub.length; i < l; i++){
                         if($scope.selectOptionsTree[key].sub[i].type.indexOf(dataTypeName) != -1){
                         $scope.selectOptionsTree_search_result[key] = $scope.selectOptionsTree[key];
                         }
                         }
                         }*/
                    }

                };
                var getAllTypes = function(){


                };

                /**
                 * @desc
                 *@param selectNodeType object 例子为{"裁判文书":true,"法院公告":false,"开庭公告":false,"审判流程":true}
                 * */
                var getDataTypesString = function(){
                    var array = [];
                    for(var key in $scope.selectOptionsTree){
                        if(key === '全部数据'){
                            continue;
                        }
                        for(var i = 0, l = $scope.selectOptionsTree[key].sub.length; i < l; i++){
                            var leafTypeItem = $scope.selectOptionsTree[key].sub[i];
                            if(leafTypeItem.isChecked){
                                array.push(leafTypeItem.type);
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
                 * @desc 用于删除数据类型输入域中选中的字段(每个字段对应一个删除按钮),字段分为三类:全部数据(all)、目录节点(dest)和叶子节点(leaf)
                 *
                 * */
                $scope.delSelectedType = function(typeItem){
                    if(typeItem.nodeType === 'all'){
                        $scope.setSelectLength('all', '全部数据', false );
                    }else if(typeItem.nodeType === 'dest'){
                        var subTypesArr = $scope.selectOptionsTree[typeItem.type].sub;
                        for(var i = 0, l = subTypesArr.length; i < l; i++){
                            subTypesArr[i].isChecked = false;
                            $scope.selectOptionsTree[typeItem.type].selectedNum--;
                            $scope.selectOptionsTree[typeItem.type].isChecked = false;
                        }
                    }else{
                        var subTypesArr = $scope.selectOptionsTree[typeItem.parentType].sub;
                        //找到则修改
                        for(var i = 0, l = subTypesArr.length; i < l; i++){
                            if(subTypesArr[i].type === typeItem.type){
                                subTypesArr[i].isChecked = false;
                                $scope.selectOptionsTree[typeItem.parentType].selectedNum--;
                                $scope.selectOptionsTree[typeItem.parentType].isChecked = false;
                                break;
                            }
                        }
                    }

                };

                $scope.choose = function(name) {
                    $scope.selectNodeType[name] = !$scope.selectNodeType[name];
                };
                $scope.$watch('selectOptionsTree', function(newVal, oldVal){
                    $scope.choosedArr = [];
                    var selectedType;
                    if($scope.selectOptionsTree['全部数据'].isChecked === true){
                        selectedType = {type: '全部数据', nodeType: 'all'};
                        $scope.choosedArr.push(selectedType);
                    }else{
                        for(var key in $scope.selectOptionsTree){
                            if($scope.selectOptionsTree[key].isChecked){
                                selectedType = {type: key, nodeType: 'dest'};
                                $scope.choosedArr.push(selectedType);
                                continue;
                            }
                            for(var i = 0, l = $scope.selectOptionsTree[key].sub.length; i < l; i++){
                                if($scope.selectOptionsTree[key].sub[i].isChecked){
                                    selectedType = {type: $scope.selectOptionsTree[key].sub[i].type, parentType: key, nodeType: 'leaf'};
                                    $scope.choosedArr.push(selectedType);
                                }
                            }
                        }
                    }

                    $scope.choosed = getDataTypesString();
                    if(newVal !== oldVal){
                        $('#searchDataType').focus();
                    }
                }, true);

            }]
        };
    }]);
}
