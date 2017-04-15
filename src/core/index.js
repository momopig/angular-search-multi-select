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
            },
            template: require('./index.html'),
            controller: ['$scope', function($scope) {

                const SUB_PROPERTY_TYPE_ERROR_TIPS = '配置对象有误,当前dir节点没有sub字段,或者sub字段的类型不是数组';
                $scope.selectOptionsConfig.selectedOptionsArr = [];
                $scope.viewSettings = {
                    searchOptionName : '',
                    showMenu: false
                };
                $scope.tree_search_result =  $scope.selectOptionsConfig.tree;

                /**
                 * @desc 根据目录节点的checkbox选中状态(全选和非全选), 统一设置目录节点的所有子节点的选中状态
                 *
                 * */
                var setLeafNodeStatus = function(optionObj){
                    if (angular.isArray(optionObj.sub) ) {
                        for(var i = 0, l = optionObj.sub.length; i < l; i++){
                            optionObj.sub[i].isChecked = optionObj.isChecked;
                        };
                    } else {
                        console.log('可能有误的option项:'  + JSON.stringify(optionObj));
                        throw new Error(SUB_PROPERTY_TYPE_ERROR_TIPS);
                    }

                };
                /**
                 *
                 * @desc 当option列表中,某个option的选中状态发生变化时,同步更新其上下游的option
                 *
                 * @param { Object } 被点击且状态更改的option选项
                 *
                 * @return 没有返回值,直接更新selectOptionsConfig(tree、selectedOptionArr)
                 *
                 * */
                $scope.updateTreeObj = function(optionObj){
                    if(optionObj.nodeType === 'dir'){

                        if(optionObj.isChecked){

                            if (angular.isArray(optionObj.sub) ) {
                                optionObj.selectedNum = optionObj.sub.length;
                            } else {
                                console.log('可能有误的option项:'  + JSON.stringify(optionObj));
                                throw new Error(SUB_PROPERTY_TYPE_ERROR_TIPS);
                            }

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

                        setLeafNodeStatus(optionObj);

                    }else if(optionObj.nodeType === 'leaf'){

                        //parentIndex为undefined,说明当前option是2级option, 且没有all option选项, 无父无子,不修改同步更新父和子;all option是1级option, dir和dir同级的option是2级option, dir下的leaf option是3级option
                        if (optionObj.parentIndex === undefined) {
                            return;
                        }
                        if(optionObj.isChecked){

                            $scope.selectOptionsConfig.tree[optionObj.parentIndex].selectedNum++;
                            if($scope.selectOptionsConfig.tree[optionObj.parentIndex].nodeType === 'all') {
                                if ($scope.selectOptionsConfig.tree[optionObj.parentIndex].selectedNum === ($scope.selectOptionsConfig.tree.length -1)) {
                                    $scope.selectOptionsConfig.tree[optionObj.parentIndex].isChecked = true;
                                }
                            } else {

                                //子节点全部被选中时,目录节点的checkbox则为true
                                if($scope.selectOptionsConfig.tree[optionObj.parentIndex].selectedNum === $scope.selectOptionsConfig.tree[optionObj.parentIndex].sub.length){
                                    $scope.selectOptionsConfig.tree[optionObj.parentIndex].isChecked = true;
                                    if($scope.selectOptionsConfig.hasAllOption){
                                        $scope.selectOptionsConfig.tree[$scope.selectOptionsConfig.allOptionIndex].selectedNum++;
                                        if ($scope.selectOptionsConfig.tree[$scope.selectOptionsConfig.allOptionIndex].selectedNum === ($scope.selectOptionsConfig.tree.length -1)) {
                                            $scope.selectOptionsConfig.tree[$scope.selectOptionsConfig.allOptionIndex].isChecked = true;
                                        }
                                    }
                                }
                            }
                        }else{
                            if($scope.selectOptionsConfig.tree[optionObj.parentIndex].nodeType === 'dir') {    //如果父节点是dir option

                                //如果父节点(dir节点)在没有更改状态前,是选中的,那么改为不选中之后,还需要修改all option,这里先提前修改all option
                                if($scope.selectOptionsConfig.tree[optionObj.parentIndex].isChecked){
                                    $scope.selectOptionsConfig.tree[$scope.selectOptionsConfig.allOptionIndex].selectedNum--;
                                    $scope.selectOptionsConfig.tree[$scope.selectOptionsConfig.allOptionIndex].isChecked = false;
                                }
                            }

                            $scope.selectOptionsConfig.tree[optionObj.parentIndex].isChecked = false;
                            $scope.selectOptionsConfig.tree[optionObj.parentIndex].selectedNum--;
                        }
                    }else if(optionObj.nodeType === 'all'){

                        //点击了一次all option, 可理解为点击了所有2级option,通过更新2级option来更新all option
                        $scope.selectOptionsConfig.tree.forEach(function(item, index) {
                            if(item.nodeType === 'all'){
                                return;
                            }
                            item.isChecked = optionObj.isChecked;
                            $scope.updateTreeObj(item);
                        });

                    }
                };

                $scope.searchOptions = function(optionName){
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
                            if(!angular.isArray(item.sub)) {
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
                
                /**
                 * @desc 用于删除数据类型输入域中选中的字段(每个字段对应一个删除按钮),字段分为三类:全部数据(all)、目录节点(dir)和叶子节点(leaf)
                 *
                 * */
                $scope.delSelectedOption = function(typeItem){
                    typeItem.isChecked = false;
                    $scope.updateTreeObj(typeItem);
                };

                // 当前watch函数,主要用于监听option列表的变化;当发生变化时,同步更新被选中列表(slectedOptionsArr)
                $scope.$watch('selectOptionsConfig.tree', function(newVal, oldVal){
                    $scope.selectOptionsConfig.selectedOptionsArr = [];
                    var selectedType;
                    if($scope.selectOptionsConfig.hasAllOption && $scope.selectOptionsConfig.tree[$scope.selectOptionsConfig.allOptionIndex].isChecked){
                        selectedType = $scope.selectOptionsConfig.tree[$scope.selectOptionsConfig.allOptionIndex];
                        $scope.selectOptionsConfig.selectedOptionsArr.push(selectedType);
                    }else{
                        $scope.selectOptionsConfig.tree.forEach(function(item, index) {
                            if(item.isChecked){
                                selectedType = item;
                                $scope.selectOptionsConfig.selectedOptionsArr.push(selectedType);
                                return;
                            }
                            if(item.nodeType === 'dir' && item.sub) {
                                for(var i = 0, l = item.sub.length; i < l; i++){
                                    if(item.sub[i].isChecked){
                                        selectedType = item.sub[i];
                                        $scope.selectOptionsConfig.selectedOptionsArr.push(selectedType);
                                    }
                                }
                            }
                        });
                    }
                    if(newVal !== oldVal){
                        $('#searchInput').focus();
                    }
                }, true);

                // 初始化selectOptionsConfig,为所有节点增加index和parentIndex,其中index为当前节点在数组的index,parentIndex为父节点在数组中的index
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

                $(function() {
                    $(document).click(function(e) {
                        var target = e.target;
                        if (!$(target).is('.search-multi-select-area') && !$(target).parents().is('.search-multi-select-area')) {
                            $scope.viewSettings.showMenu = false;
                            $scope.$apply();
                        }
                    });
                });

            }]
        };
    }]);
}
