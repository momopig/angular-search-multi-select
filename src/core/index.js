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
            link: function($scope, element){
                $scope.selectOptionsConfig.width = $scope.selectOptionsConfig.width || $('.input-box').width();
                console.log('contentWidth:' + $scope.selectOptionsConfig.width);
                var selectOption_totalWidth = $scope.selectOptionsConfig.width - $scope.selectOptionsConfig.hGap * ($scope.selectOptionsConfig.perNum - 1);
                console.log('selectOption_totalWidth:' + selectOption_totalWidth);

                $scope.selectOptionsConfig.perWidth = selectOption_totalWidth / $scope.selectOptionsConfig.perNum;
                console.log('perWidth:' + $scope.selectOptionsConfig.perWidth);
                
                // $scope.selectOptionsConfig.inputWidth = $scope.selectOptionsConfig.width - ($scope.selectOptionsConfig.perWidth + $scope.selectOptionsConfig.hGap) * ($scope.selectOptionsConfig.selectedOptionsArr.length % $scope.selectOptionsConfig.perNum);
                // console.log($scope.selectOptionsConfig.inputWidth);
            },
            controller: ['$scope', function($scope) {

                const SUB_PROPERTY_TYPE_ERROR_TIPS = '配置对象有误,当前dir节点没有sub字段,或者sub字段的类型不是数组';

                $scope.isLineLastSelectOption = function($index) {
                    return ($index + 1) % $scope.selectOptionsConfig.perNum !==  0;
                };

                $scope.currLineHasNoSelectOptions = function() {
                    return ($scope.selectOptionsConfig.selectedOptionsArr.length % $scope.selectOptionsConfig.perNum === 0);
                };

    /**
     *  @desc 获取被选中options的key属性的value
     *  @param key { String } 属性名，默认值为'name'
     *  @return { Array } 返回一个数组，item为被选中options的key属性的value
     * */
                $scope.selectOptionsConfig.getValsByKey = function (key) {
                    var vals = [];
                    key = key || 'name';
                    this.tree.forEach(function(item) {
                        if (item.nodeType === 'leaf') {
                            if (item.isChecked) {
                                vals.push(item[key]);
                            }
                        } else if (item.nodeType === 'dir') {
                            if(!angular.isArray(item.sub)) {
                                return;
                            }
                            for(var i = 0, l = item.sub.length; i < l; i++){
                                if (item.sub[i].isChecked) {
                                    vals.push(item.sub[i][key]);
                                }
                            }
                        }
                    });
                    return vals;
                };

                if (!angular.isArray($scope.selectOptionsConfig.selectedOptionsArr)) {
                    $scope.selectOptionsConfig.selectedOptionsArr = [];
                }
                if ($scope.selectOptionsConfig.hGap === undefined) {
                    $scope.selectOptionsConfig.hGap = 8;
                }
                if ($scope.selectOptionsConfig.perNum === undefined) {
                    $scope.selectOptionsConfig.perNum = 4;
                }

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
                                optionObj.selectedNum_PLUGIN_ASMS = optionObj.sub.length;
                            } else {
                                console.log('可能有误的option项:'  + JSON.stringify(optionObj));
                                throw new Error(SUB_PROPERTY_TYPE_ERROR_TIPS);
                            }

                            if($scope.selectOptionsConfig.hasAllOption) {
                                $scope.selectOptionsConfig.tree[optionObj.parentIndex_PLUGIN_ASMS].selectedNum_PLUGIN_ASMS++;
                                if($scope.selectOptionsConfig.tree[optionObj.parentIndex_PLUGIN_ASMS].selectedNum_PLUGIN_ASMS === $scope.selectOptionsConfig.tree.length - 1){
                                    $scope.selectOptionsConfig.tree[optionObj.parentIndex_PLUGIN_ASMS].isChecked = true;
                                }
                            }
                        }else{
                            optionObj.selectedNum_PLUGIN_ASMS = 0;
                            if($scope.selectOptionsConfig.hasAllOption) {
                                $scope.selectOptionsConfig.tree[optionObj.parentIndex_PLUGIN_ASMS].selectedNum_PLUGIN_ASMS--;
                                $scope.selectOptionsConfig.tree[optionObj.parentIndex_PLUGIN_ASMS].isChecked = false;
                            }
                        }

                        setLeafNodeStatus(optionObj);

                    }else if(optionObj.nodeType === 'leaf'){

                        // parentIndex_PLUGIN_ASMS为undefined,说明当前option是2级option, 且没有all option选项, 无父无子,不修改同步更新父和子;all option是1级option, dir和dir同级的option是2级option, dir下的leaf option是3级option
                        if (optionObj.parentIndex_PLUGIN_ASMS === undefined) {
                            return;
                        }
                        if(optionObj.isChecked){
                            $scope.selectOptionsConfig.tree[optionObj.parentIndex_PLUGIN_ASMS].selectedNum_PLUGIN_ASMS++;
                            if($scope.selectOptionsConfig.tree[optionObj.parentIndex_PLUGIN_ASMS].nodeType === 'all') {
                                if ($scope.selectOptionsConfig.tree[optionObj.parentIndex_PLUGIN_ASMS].selectedNum_PLUGIN_ASMS === ($scope.selectOptionsConfig.tree.length -1)) {
                                    $scope.selectOptionsConfig.tree[optionObj.parentIndex_PLUGIN_ASMS].isChecked = true;
                                }
                            } else {

                                // 子节点全部被选中时,目录节点的checkbox则为true
                                if($scope.selectOptionsConfig.tree[optionObj.parentIndex_PLUGIN_ASMS].selectedNum_PLUGIN_ASMS === $scope.selectOptionsConfig.tree[optionObj.parentIndex_PLUGIN_ASMS].sub.length){
                                    $scope.selectOptionsConfig.tree[optionObj.parentIndex_PLUGIN_ASMS].isChecked = true;
                                    if($scope.selectOptionsConfig.hasAllOption){
                                        $scope.selectOptionsConfig.tree[$scope.selectOptionsConfig.allOptionIndex].selectedNum_PLUGIN_ASMS++;
                                        if ($scope.selectOptionsConfig.tree[$scope.selectOptionsConfig.allOptionIndex].selectedNum_PLUGIN_ASMS === ($scope.selectOptionsConfig.tree.length -1)) {
                                            $scope.selectOptionsConfig.tree[$scope.selectOptionsConfig.allOptionIndex].isChecked = true;
                                        }
                                    }
                                }
                            }
                        }else{
                            if($scope.selectOptionsConfig.tree[optionObj.parentIndex_PLUGIN_ASMS].nodeType === 'dir') {    // 如果父节点是dir option

                                // 如果父节点(dir节点)在没有更改状态前,是选中的,那么改为不选中之后,还需要修改all option,这里先提前修改all option
                                if($scope.selectOptionsConfig.tree[optionObj.parentIndex_PLUGIN_ASMS].isChecked){
                                    $scope.selectOptionsConfig.tree[$scope.selectOptionsConfig.allOptionIndex].selectedNum_PLUGIN_ASMS--;
                                    $scope.selectOptionsConfig.tree[$scope.selectOptionsConfig.allOptionIndex].isChecked = false;
                                }
                            }

                            $scope.selectOptionsConfig.tree[optionObj.parentIndex_PLUGIN_ASMS].isChecked = false;
                            $scope.selectOptionsConfig.tree[optionObj.parentIndex_PLUGIN_ASMS].selectedNum_PLUGIN_ASMS--;
                        }
                    }else if(optionObj.nodeType === 'all'){

                        // 点击了一次all option, 可理解为点击了所有2级option,通过更新2级option来更新all option
                        $scope.selectOptionsConfig.tree.forEach(function(item, index) {
                            if(item.nodeType === 'all'){
                                return;
                            }
                            item.isChecked = optionObj.isChecked;
                            $scope.updateTreeObj(item);
                        });

                    }
                };

                /**
                 * @desc 必须等到tree更新完之后,才调用
                 *
                 *
                 * */
                $scope.updateSelectedArr = function() {
                    var selectedOptionsArr = [];
                    var selectedType;
                    if($scope.selectOptionsConfig.hasAllOption && $scope.selectOptionsConfig.tree[$scope.selectOptionsConfig.allOptionIndex].isChecked){
                        selectedType = $scope.selectOptionsConfig.tree[$scope.selectOptionsConfig.allOptionIndex];
                        selectedOptionsArr.push(selectedType);
                    }else{
                        $scope.selectOptionsConfig.tree.forEach(function(item, index) {
                            if(item.isChecked){
                                selectedType = item;
                                selectedOptionsArr.push(selectedType);
                                return;
                            }
                            if(item.nodeType === 'dir' && item.sub) {
                                for(var i = 0, l = item.sub.length; i < l; i++){
                                    if(item.sub[i].isChecked){
                                        selectedType = item.sub[i];
                                        selectedOptionsArr.push(selectedType);
                                    }
                                }
                            }
                        });
                    }
                    // $('#searchInput').focus();
                    while($scope.selectOptionsConfig.selectedOptionsArr.length !== 0) {
                        $scope.selectOptionsConfig.selectedOptionsArr.pop();
                    }
                    selectedOptionsArr.forEach(function(item){
                        $scope.selectOptionsConfig.selectedOptionsArr.push(item);
                    });
                };

                $scope.updateInputWidth = function(){
                    $scope.selectOptionsConfig.inputWidth = $scope.selectOptionsConfig.width - ($scope.selectOptionsConfig.perWidth + $scope.selectOptionsConfig.hGap) * ($scope.selectOptionsConfig.selectedOptionsArr.length % $scope.selectOptionsConfig.perNum);
                };

                $scope.updateConfigObj = function(optionObj){
                    $scope.updateTreeObj(optionObj);
                    $scope.updateSelectedArr();
                    $scope.updateInputWidth();

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
                    
                    $scope.updateConfigObj(typeItem);
                };



                // 初始化selectOptionsConfig,为所有节点增加index_PLUGIN_ASMS、parentIndex_PLUGIN_ASMS, isChecked,其中index_PLUGIN_ASMS为当前节点在数组的index_PLUGIN_ASMS,parentIndex_PLUGIN_ASMS为父节点在数组中的index
                $scope.selectOptionsConfig.tree.forEach(function(outerItem, outerIndex) {

                    outerItem.index_PLUGIN_ASMS = outerIndex;
                    outerItem.isChecked = false;

                    // 仅nodeType为'all'需要用户自己设定，其它由初始化程序生成
                    if (outerItem.nodeType === undefined) {
                        if (angular.isArray(outerItem.sub)) {
                            outerItem.nodeType = 'dir';
                        } else {
                            outerItem.nodeType = 'leaf';
                        }
                    }
                    if(outerItem.nodeType !== 'leaf') {
                        outerItem.selectedNum_PLUGIN_ASMS = 0;
                    }
                    // 包括nodeType为'dir'和'leaf'的情况
                    if ($scope.selectOptionsConfig.hasAllOption && outerItem.nodeType !== 'all') {
                        outerItem.parentIndex_PLUGIN_ASMS = $scope.selectOptionsConfig.allOptionIndex;
                    }
                    if (outerItem.nodeType === 'dir' && angular.isArray(outerItem.sub)) {
                        outerItem.sub.forEach(function(innerItem, innerIndex) {
                            innerItem.nodeType = 'leaf';
                            innerItem.parentIndex_PLUGIN_ASMS = outerIndex;
                            innerItem.index_PLUGIN_ASMS = innerIndex;
                            innerItem.isChecked = false;
                        });
                    }

                });
                $scope.test = function(){
                    $scope.selectOptionsConfig.selectedOptionsArr = [];
                };

                // 触发watcher的case有: 1. selectOptionsConfig.selectedOptionsArr初始化时; 2. selectOptionsConfig.selectedOptionsArr通过在插件外部被修改引用时(譬如插件用于编辑的数据回显时);
                $scope.$watch('selectOptionsConfig.selectedOptionsArr', function(newVal, oldVal) {
                    console.log('selectedOptionsArr is changed');

                    /*执行if内部的代码的case有:
                     1. selectOptionsConfig.selectedOptionsArr初始化时，用于清除之前的缓存数据(数组长度为0, 也可能不为0);*/
                    $scope.selectOptionsConfig.tree.forEach(function(outerItem, outerIndex) {
                        outerItem.isChecked = false;
                        if (outerItem.nodeType === 'dir' && angular.isArray(outerItem.sub)) {
                            outerItem.sub.forEach(function(innerItem, innerIndex) {
                                innerItem.isChecked = false;
                            });
                        }
                    });

                    // 检查初始化配置的selectedOptionsArr, 里面的元素是否来自选择列表, 如果不是则报错; 如果是,则替换为格式化后的tree item
                    $scope.selectOptionsConfig.selectedOptionsArr.forEach(function(item, index) {
                        var isMatch = false;
                        outer:
                            for(var outer_i = 0, outer_l = $scope.selectOptionsConfig.tree.length; outer_i < outer_l; outer_i++){
                                var outerItem =  $scope.selectOptionsConfig.tree[outer_i];
                                if(item.name === outerItem.name) {
                                    outerItem.isChecked = true;

                                    // 更新treeObj, 而不是updateConfigObj。因为updateConfigOb会先更新treeObj,再更新selectedOptionArr;但是这里selectedOptionArr已初始化
                                    $scope.updateTreeObj(outerItem);
                                    console.log('match item:' + JSON.stringify(outerItem));
                                    $scope.selectOptionsConfig.selectedOptionsArr[index] = outerItem;
                                    isMatch = true;
                                    break;
                                } else {
                                    if (outerItem.nodeType === 'dir' && angular.isArray(outerItem.sub)) {
                                        for(var inner_i = 0, inner_l = outerItem.sub.length; inner_i < inner_l; inner_i++) {
                                            var innerItem = outerItem.sub[inner_i];
                                            if(item.name === innerItem.name) {
                                                innerItem.isChecked = true;

                                                // 更新treeObj, 而不是updateConfigObj。因为updateConfigOb会先更新treeObj,再更新selectedOptionArr;但是这里selectedOptionArr已初始化
                                                $scope.updateTreeObj(innerItem);
                                                console.log('match item:' + JSON.stringify(innerItem));
                                                $scope.selectOptionsConfig.selectedOptionsArr[index] = innerItem;
                                                isMatch = true;
                                                break outer;
                                            }
                                        }
                                    }
                                }
                            }
                        if(!isMatch) {
                            throw new Error('selectedOptionsArr中的被选中项, 并没有包含在选中列表中');
                            consle.log(item);
                        }
                    });
                    $scope.updateInputWidth();
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
