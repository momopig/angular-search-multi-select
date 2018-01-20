(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular"));
	else if(typeof define === 'function' && define.amd)
		define(["angular"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("angular")) : factory(root["angular"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	
	var angular = __webpack_require__(1);
	var searchMultiSelect = angular.module('searchMultiSelect', []);
	__webpack_require__(2)(searchMultiSelect);
	module.exports = {
	    searchMultiSelect: searchMultiSelect
	};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Created by Jamter on 17/4/14.
	 */
	__webpack_require__(3);
	module.exports = function (mod) {
	    __webpack_require__(9)(mod);
	    mod.directive('searchMultiSelect', ['$log',function ($log) {
	        return {
	            restrict: 'EA',
	            scope: {
	                selectOptionsConfig: '='
	            },
	            template: __webpack_require__(10),
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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(4);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/index.js?sourceMap!./index.less", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/index.js?sourceMap!./index.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports
	
	
	// module
	exports.push([module.id, "/* reset START */\nul {\n  list-style: none;\n}\n* {\n  padding: 0;\n  margin: 0;\n}\n.text-ellipsis {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n/* reset END */\n/*\n@import (reference) \"cmb-colors.less\";\n*/\n.cmb-checkbox {\n  position: relative;\n}\n.cmb-checkbox > label:before {\n  content: '';\n  position: absolute;\n  display: inline-block;\n  visibility: visible;\n  width: 14px;\n  height: 14px;\n  top: 3px;\n  left: 0px;\n  background: url(" + __webpack_require__(6) + ") no-repeat;\n  background-size: cover;\n}\n.cmb-checkbox > input[type=\"checkbox\"],\n.cmb-checkbox > input[type=\"radio\"] {\n  vertical-align: middle;\n  visibility: hidden;\n  width: 1.2em;\n  height: 1.2em;\n}\n.cmb-checkbox > input[type=checkbox]:checked + label:before,\n.cmb-checkbox > input[type=radio]:checked + label:before {\n  background: url(" + __webpack_require__(7) + ") no-repeat;\n  background-size: cover;\n}\n.search-multi-select-area {\n  position: relative;\n  display: inline-block;\n  width: 100%;\n}\n.search-multi-select-area #searchInput:focus {\n  border-color: #66afe9;\n  outline: 0;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);\n}\n.search-multi-select-area .no-data-tips {\n  position: absolute;\n  z-index: 999;\n  top: 100%;\n  background: #fff;\n  width: 100%;\n  text-align: center;\n  height: 28px;\n  line-height: 28px;\n  margin-top: 4px;\n  border: 1px solid #dedede;\n}\n.search-multi-select-area .input-box {\n  height: 35px;\n}\n.search-multi-select-area .input-box .type-name-box {\n  position: relative;\n  float: left;\n  width: 100px;\n  height: 21px;\n  line-height: 21px;\n  background: #eee;\n  border-radius: 5px;\n  margin: 4px 8px 0 0;\n  text-align: left;\n  padding-left: 8px;\n  cursor: pointer;\n}\n.search-multi-select-area .input-box .type-name-box .type-name-text {\n  display: inline-block;\n  width: 80%;\n}\n.search-multi-select-area .input-box .type-name-box .close-btn {\n  position: absolute;\n  right: 4px;\n}\n.search-multi-select-area .input-box .cover-father {\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n.search-multi-select-area .input-box .reset-form-control {\n  width: 100px;\n  float: left;\n  min-height: 0;\n  height: 21px;\n  line-height: 21px;\n  margin-top: 4px;\n  border: none;\n  outline: none;\n}\n.search-multi-select-area .has-selected-type {\n  height: auto;\n}\n.search-multi-select-area .type-select-panel {\n  position: absolute;\n  top: 100%;\n  z-index: 99;\n  background: #fff;\n  width: 100%;\n  max-height: 200px;\n  border: 1px solid #E3E3E4;\n  -webkit-border-radius: 2px;\n  -moz-border-radius: 2px;\n  border-radius: 2px;\n  overflow: auto;\n}\n.search-multi-select-area .type-select-panel .select-block .cmb-checkbox {\n  display: inline-block;\n  cursor: pointer;\n  width: 100%;\n  height: 26px;\n  line-height: 26px;\n  padding-left: 10px;\n  text-align: left;\n}\n.search-multi-select-area .type-select-panel .select-block .cmb-checkbox:hover {\n  background: #FAFAFA;\n}\n.search-multi-select-area .type-select-panel .select-block .cmb-checkbox input[type=\"checkbox\"] {\n  position: absolute;\n  z-index: 9999;\n  left: .8rem;\n  display: inline-block;\n  vertical-align: middle;\n  visibility: visible;\n  opacity: 0;\n  width: 1.2em;\n  height: 1.2em;\n}\n.search-multi-select-area .type-select-panel .select-block .cmb-checkbox label {\n  position: relative;\n  float: none;\n  padding-left: 1.6rem;\n  display: inline-block;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  line-height: normal;\n  -moz-text-overflow: ellipsis;\n  -o-text-overflow: ellipsis;\n  width: auto;\n  height: 26px;\n  line-height: 26px;\n}\n.search-multi-select-area .type-select-panel .select-block .cmb-checkbox label:before {\n  top: 50%;\n  margin-top: -7px;\n}\n.search-multi-select-area .type-select-panel .select-block .leaf-cmb-checkbox {\n  width: 100%;\n  margin-left: 25px;\n}\n.search-multi-select-area .create-export-task-body {\n  margin-top: 8px;\n}\n.search-multi-select-area .create-export-task-footer {\n  padding-top: 10px;\n}\n.search-multi-select-area .create-export-task-input {\n  width: 256px;\n}\n.search-multi-select-area .create-export-task-input > .right-part {\n  width: 100%;\n  margin-bottom: 0 !important;\n}\n.search-multi-select-area .import-type-field {\n  position: relative;\n  min-height: 35px;\n  margin-bottom: 47px !important;\n}\n.search-multi-select-area .import-type-field .selection {\n  background: #fff;\n}\n.search-multi-select-area .import-time-field {\n  height: 14px;\n  line-height: 14px;\n}\n.search-multi-select-area .import-time-field > label {\n  line-height: 14px !important;\n}\n.search-multi-select-area .import-time-field .right-part .radio-inline {\n  position: relative;\n  color: #999;\n}\n.search-multi-select-area .import-time-field .right-part input[type=\"radio\"] {\n  position: absolute;\n  top: 50%;\n  margin-top: -7.5px;\n  width: auto;\n  display: inline-block;\n  height: auto;\n  min-height: auto;\n  margin-right: 8px;\n}\n.search-multi-select-area .fa {\n  position: relative;\n}\n.search-multi-select-area .fa:before {\n  position: absolute;\n  right: 10px;\n  top: 10px;\n  color: #BDBDBD;\n}\n.search-multi-select-area .reset-fa:before {\n  top: 0;\n  right: 8px;\n}\n.search-multi-select-area .search-ret {\n  border-top: 1px solid #F6F6F6;\n  padding-top: 20px;\n  margin-top: 20px;\n  text-align: center;\n}\n.search-multi-select-area .search-ret strong {\n  color: #666;\n  font-weight: normal;\n}\n.search-multi-select-area .search-ret span {\n  color: #999;\n  font-size: 12px;\n}\n", ""]);
	
	// exports


/***/ }),
/* 5 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjE0cHgiIGhlaWdodD0iMTRweCIgdmlld0JveD0iMCAwIDE0IDE0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCBCZXRhIDM5LjEgKDMxNzIxKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5SZWN0YW5nbGUgMTMgQ29weTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoIEJldGEuPC9kZXNjPgogICAgPGRlZnM+CiAgICAgICAgPHJlY3QgaWQ9InBhdGgtMSIgeD0iMCIgeT0iMCIgd2lkdGg9IjE0IiBoZWlnaHQ9IjE0IiByeD0iMSI+PC9yZWN0PgogICAgICAgIDxtYXNrIGlkPSJtYXNrLTIiIG1hc2tDb250ZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBtYXNrVW5pdHM9Im9iamVjdEJvdW5kaW5nQm94IiB4PSIwIiB5PSIwIiB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIGZpbGw9IndoaXRlIj4KICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPSIjcGF0aC0xIj48L3VzZT4KICAgICAgICA8L21hc2s+CiAgICA8L2RlZnM+CiAgICA8ZyBpZD0i5YWz5rOo5LyB5LiaIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iMyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTcyNy4wMDAwMDAsIC0zODQuMDAwMDAwKSIgc3Ryb2tlPSIjQkRCREJEIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9IiNGRkZGRkYiPgogICAgICAgICAgICA8ZyBpZD0iR3JvdXAtMTMtQ29weS0xMCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTI1LjAwMDAwMCwgMjgxLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMyLjAwMDAwMCwgMTAzLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cC03IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNzAuMDAwMDAwLCAwLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICA8dXNlIGlkPSJSZWN0YW5nbGUtMTMtQ29weSIgbWFzaz0idXJsKCNtYXNrLTIpIiB4bGluazpocmVmPSIjcGF0aC0xIj48L3VzZT4KICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg=="

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjE0cHgiIGhlaWdodD0iMTRweCIgdmlld0JveD0iMCAwIDE0IDE0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCBCZXRhIDM5LjEgKDMxNzIxKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5Hcm91cCA5PC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2ggQmV0YS48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0i5YWz5rOo5LyB5LiaIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iMyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTU1Ny4wMDAwMDAsIC0zODQuMDAwMDAwKSI+CiAgICAgICAgICAgIDxnIGlkPSJHcm91cC0xMy1Db3B5LTEwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1MjUuMDAwMDAwLCAyODEuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAtNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzIuMDAwMDAwLCAxMDMuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTQiPgogICAgICAgICAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAtOSI+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMCwxLjAwNjg0NTQ3IEMwLDAuNDUwNzgwMDczIDAuNDQ5OTQ4NzU4LDAgMS4wMDY4NDU0NywwIEwxMi45OTMxNTQ1LDAgQzEzLjU0OTIxOTksMCAxNCwwLjQ0OTk0ODc1OCAxNCwxLjAwNjg0NTQ3IEwxNCwxMi45OTMxNTQ1IEMxNCwxMy41NDkyMTk5IDEzLjU1MDA1MTIsMTQgMTIuOTkzMTU0NSwxNCBMMS4wMDY4NDU0NywxNCBDMC40NTA3ODAwNzMsMTQgMCwxMy41NTAwNTEyIDAsMTIuOTkzMTU0NSBMMCwxLjAwNjg0NTQ3IFoiIGlkPSJSZWN0YW5nbGUtMTMiIGZpbGw9IiNEMTAwMDAiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJSZWN0YW5nbGUtNCIgZmlsbD0iI0ZGRkZGRiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNy4yNDI2NDEsIDYuMjQyNjQxKSByb3RhdGUoLTMxNS4wMDAwMDApIHRyYW5zbGF0ZSgtNy4yNDI2NDEsIC02LjI0MjY0MSkgIiBwb2ludHM9IjUuMjQyNjQwNjkgOS4yNDI2NDA2OSA4LjI0MjY0MDY5IDkuMjQyNjQwNjkgOC4yNDI2NDA2OSAyLjI0MjY0MDY5IDkuMjQyNjQwNjkgMi4yNDI2NDA2OSA5LjI0MjY0MDY5IDkuMjQyNjQwNjkgOS4yNDI2NDA2OSAxMC4yNDI2NDA3IDUuMjQyNjQwNjkgMTAuMjQyNjQwNyI+PC9wb2x5Z29uPgogICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4="

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }),
/* 9 */
/***/ (function(module, exports) {

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


/***/ }),
/* 10 */
/***/ (function(module, exports) {

	module.exports = "<!--<div ng-click=\"test()\">test</div>-->\n<div class=\"selection  search-multi-select-area\">\n        <div class=\"input-box clearfix form-control\" ng-class=\"{'has-selected-type':selectOptionsConfig.selectedOptionsArr.length != 0}\">\n            <span class=\"type-name-box \" ng-repeat=\"typeItem in selectOptionsConfig.selectedOptionsArr\"  ng-click=\"delSelectedOption(typeItem);$event.stopPropagation()\" ng-style=\"{width: selectOptionsConfig.perWidth + 'px', marginRight: isLineLastSelectOption($index)? (selectOptionsConfig.hGap + 'px'): '0px'}\"><span class=\"type-name-text text-ellipsis\" title=\"{{::typeItem.name}}\">{{::typeItem.name}}</span><span class=\"close-btn\">x</span></span>\n            <input id=\"searchInput\" ng-class=\"selectOptionsConfig.selectedOptionsArr.length === 0?'form-control cover-father':'reset-form-control'\" ng-style=\"{width: currLineHasNoSelectOptions($index)?'100%':selectOptionsConfig.inputWidth + 'px'}\" placeholder=\"{{selectOptionsConfig.selectedOptionsArr.length === 0? selectOptionsConfig.placeholder: ''}}\" ng-model=\"viewSettings.searchOptionName\" ng-focus=\"viewSettings.showMenu = true\" ng-change=\"searchOptions(viewSettings.searchOptionName)\"/>\n        </div>\n        <ul class=\"type-select-panel\" ng-show=\"viewSettings.showMenu && viewSettings.searchOptionName === ''\">\n            <li class=\"select-block\" ng-repeat=\"v in selectOptionsConfig.tree\">\n                <div class=\"cmb-checkbox\" ng-class=\"{'fa reset-fa': (v.nodeType === 'dir'), 'fa-angle-up': showList && v.nodeType === 'dir', 'fa-angle-down': !showList && v.nodeType === 'dir'}\" ng-click=\"showList =  !showList;\">\n                    <input id=\"{{v.name}}\" type=\"checkbox\" ng-model=\"v.isChecked\" ng-change=\"updateConfigObj(v)\" ng-click=\"$event.stopPropagation()\">\n                    <label ng-bind=\"v.name\" ></label>\n                </div>\n                <ul class=\"leaf-node-list\" ng-show=\"showList\">\n                    <li class=\"cmb-checkbox leaf-cmb-checkbox clearfix\"  ng-repeat=\"item in v.sub\" >\n                        <input  type=\"checkbox\" ng-model=\"item.isChecked\" ng-change=\"updateConfigObj(item)\">\n                        <label  ng-bind=\"item.name\" ></label>\n                    </li>\n                </ul>\n            </li>\n        </ul>\n        <ul class=\"type-select-panel\" ng-show=\"viewSettings.showMenu &&(viewSettings.searchOptionName != '') && (tree_search_result.length !== 0)\">\n            <li class=\"select-block\" ng-repeat=\"item in tree_search_result\" >\n                <div class=\"cmb-checkbox\">\n                        <input  type=\"checkbox\" ng-model=\"item.isChecked\" ng-change=\"updateConfigObj(item)\">\n                        <label  ng-bind=\"item.name\" ></label>\n                </div>\n            </li>\n        </ul>\n        <div class=\"no-data-tips\" ng-show=\"viewSettings.showMenu &&viewSettings.searchOptionName != ''&& (tree_search_result.length === 0)\"> 无匹配数据</div>\n</div>\n";

/***/ })
/******/ ])
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAwYTU1MGFmZTY0Nzc0ODliNGI2OCIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImFuZ3VsYXJcIiIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9pbmRleC5sZXNzPzQyYmYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvaW5kZXgubGVzcyIsIndlYnBhY2s6Ly8vLi9+L2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL2ltYWdlcy9jaGVja2JveC11bmNoZWNrZWQuc3ZnIiwid2VicGFjazovLy8uL3NyYy9jb3JlL2ltYWdlcy9jaGVja2JveC1jaGVja2VkLnN2ZyIsIndlYnBhY2s6Ly8vLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvZmlsdGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL2luZGV4Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNOQSxnRDs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYTtBQUNiOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCQUFvQixTQUFTO0FBQzdCLGtCQUFpQixRQUFRO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQSxnRUFBK0QsT0FBTztBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCO0FBQ3JCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWdFLE9BQU87QUFDdkU7QUFDQTtBQUNBLHNCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUEyQixTQUFTO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxzQkFBcUI7O0FBRXJCLG9IQUFtSDtBQUNuSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBNkI7O0FBRTdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBeUI7QUFDekIsd0hBQXVIOztBQUV2SDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCOztBQUVyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUF5Qjs7QUFFekI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0VBQW1FLE9BQU87QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0EsZ0VBQStELE9BQU87QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQjtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7OztBQUlBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUF5QjtBQUN6Qjs7QUFFQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBOztBQUVBLG1GQUFrRjtBQUNsRjtBQUNBOztBQUVBO0FBQ0EsZ0dBQStGO0FBQy9GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBNkI7QUFDN0I7QUFDQSxzQkFBcUI7O0FBRXJCLDJFQUEwRTtBQUMxRTtBQUNBO0FBQ0E7QUFDQSxtR0FBa0csbUJBQW1CO0FBQ3JIO0FBQ0E7QUFDQTs7QUFFQSx1SEFBc0g7QUFDdEg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFpQztBQUNqQztBQUNBLDZGQUE0RixtQkFBbUI7QUFDL0c7QUFDQTtBQUNBOztBQUVBLG1JQUFrSTtBQUNsSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCO0FBQ3JCO0FBQ0Esa0JBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQjtBQUNyQixrQkFBaUI7O0FBRWpCLGNBQWE7QUFDYjtBQUNBLE1BQUs7QUFDTDs7Ozs7OztBQ3BYQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFpRjtBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBLGlDQUFnQyxVQUFVLEVBQUU7QUFDNUMsRTs7Ozs7O0FDcEJBO0FBQ0E7OztBQUdBO0FBQ0Esa0RBQWlELHFCQUFxQixHQUFHLEtBQUssZUFBZSxjQUFjLEdBQUcsa0JBQWtCLHFCQUFxQix3QkFBd0IsNEJBQTRCLEdBQUcsK0RBQStELHFCQUFxQix1QkFBdUIsR0FBRyxnQ0FBZ0MsZ0JBQWdCLHVCQUF1QiwwQkFBMEIsd0JBQXdCLGdCQUFnQixpQkFBaUIsYUFBYSxjQUFjLDhEQUFrRiwyQkFBMkIsR0FBRyxvRkFBb0YsMkJBQTJCLHVCQUF1QixpQkFBaUIsa0JBQWtCLEdBQUcsMEhBQTBILDhEQUFnRiwyQkFBMkIsR0FBRyw2QkFBNkIsdUJBQXVCLDBCQUEwQixnQkFBZ0IsR0FBRyxnREFBZ0QsMEJBQTBCLGVBQWUsdUZBQXVGLEdBQUcsMkNBQTJDLHVCQUF1QixpQkFBaUIsY0FBYyxxQkFBcUIsZ0JBQWdCLHVCQUF1QixpQkFBaUIsc0JBQXNCLG9CQUFvQiw4QkFBOEIsR0FBRyx3Q0FBd0MsaUJBQWlCLEdBQUcsdURBQXVELHVCQUF1QixnQkFBZ0IsaUJBQWlCLGlCQUFpQixzQkFBc0IscUJBQXFCLHVCQUF1Qix3QkFBd0IscUJBQXFCLHNCQUFzQixvQkFBb0IsR0FBRyx1RUFBdUUsMEJBQTBCLGVBQWUsR0FBRyxrRUFBa0UsdUJBQXVCLGVBQWUsR0FBRyxzREFBc0QsdUJBQXVCLFdBQVcsWUFBWSxHQUFHLDREQUE0RCxpQkFBaUIsZ0JBQWdCLGtCQUFrQixpQkFBaUIsc0JBQXNCLG9CQUFvQixpQkFBaUIsa0JBQWtCLEdBQUcsZ0RBQWdELGlCQUFpQixHQUFHLGdEQUFnRCx1QkFBdUIsY0FBYyxnQkFBZ0IscUJBQXFCLGdCQUFnQixzQkFBc0IsOEJBQThCLCtCQUErQiw0QkFBNEIsdUJBQXVCLG1CQUFtQixHQUFHLDRFQUE0RSwwQkFBMEIsb0JBQW9CLGdCQUFnQixpQkFBaUIsc0JBQXNCLHVCQUF1QixxQkFBcUIsR0FBRyxrRkFBa0Ysd0JBQXdCLEdBQUcscUdBQXFHLHVCQUF1QixrQkFBa0IsZ0JBQWdCLDBCQUEwQiwyQkFBMkIsd0JBQXdCLGVBQWUsaUJBQWlCLGtCQUFrQixHQUFHLGtGQUFrRix1QkFBdUIsZ0JBQWdCLHlCQUF5QiwwQkFBMEIsNEJBQTRCLHdCQUF3QixxQkFBcUIsd0JBQXdCLGlDQUFpQywrQkFBK0IsZ0JBQWdCLGlCQUFpQixzQkFBc0IsR0FBRyx5RkFBeUYsYUFBYSxxQkFBcUIsR0FBRyxpRkFBaUYsZ0JBQWdCLHNCQUFzQixHQUFHLHNEQUFzRCxvQkFBb0IsR0FBRyx3REFBd0Qsc0JBQXNCLEdBQUcsdURBQXVELGlCQUFpQixHQUFHLHFFQUFxRSxnQkFBZ0IsZ0NBQWdDLEdBQUcsZ0RBQWdELHVCQUF1QixxQkFBcUIsbUNBQW1DLEdBQUcsMkRBQTJELHFCQUFxQixHQUFHLGdEQUFnRCxpQkFBaUIsc0JBQXNCLEdBQUcsd0RBQXdELGlDQUFpQyxHQUFHLDBFQUEwRSx1QkFBdUIsZ0JBQWdCLEdBQUcsa0ZBQWtGLHVCQUF1QixhQUFhLHVCQUF1QixnQkFBZ0IsMEJBQTBCLGlCQUFpQixxQkFBcUIsc0JBQXNCLEdBQUcsaUNBQWlDLHVCQUF1QixHQUFHLHdDQUF3Qyx1QkFBdUIsZ0JBQWdCLGNBQWMsbUJBQW1CLEdBQUcsOENBQThDLFdBQVcsZUFBZSxHQUFHLHlDQUF5QyxrQ0FBa0Msc0JBQXNCLHFCQUFxQix1QkFBdUIsR0FBRyxnREFBZ0QsZ0JBQWdCLHdCQUF3QixHQUFHLDhDQUE4QyxnQkFBZ0Isb0JBQW9CLEdBQUc7O0FBRWxsTDs7Ozs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQixpQkFBaUI7QUFDakM7QUFDQTtBQUNBLHlDQUF3QyxnQkFBZ0I7QUFDeEQsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQixpQkFBaUI7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFZLG9CQUFvQjtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNqREEsc0NBQXFDLHd0RDs7Ozs7O0FDQXJDLHNDQUFxQyxnaUU7Ozs7OztBQ0FyQztBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFnQixtQkFBbUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCLHNCQUFzQjtBQUN0QztBQUNBO0FBQ0EsbUJBQWtCLDJCQUEyQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZSxtQkFBbUI7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUIsMkJBQTJCO0FBQzVDO0FBQ0E7QUFDQSxTQUFRLHVCQUF1QjtBQUMvQjtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0Esa0JBQWlCLHVCQUF1QjtBQUN4QztBQUNBO0FBQ0EsNEJBQTJCO0FBQzNCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZSxpQkFBaUI7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWM7QUFDZDtBQUNBLGlDQUFnQyxzQkFBc0I7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdEQUF1RDtBQUN2RDs7QUFFQSw4QkFBNkIsbUJBQW1COztBQUVoRDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNyUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7Ozs7Ozs7QUNuQkEsdUxBQXNMLHVFQUF1RSx5SkFBeUosdUNBQXVDLGtJQUFrSSwwREFBMEQsaUJBQWlCLEtBQUssaUJBQWlCLHNOQUFzTix1RkFBdUYsbUJBQW1CLDBGQUEwRix1YUFBdWEsMklBQTJJLG9DQUFvQyx1Q0FBdUMsUUFBUSxnekMiLCJmaWxlIjoiYW5ndWxhci1zZWFyY2gtbXVsdGktc2VsZWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiYW5ndWxhclwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJhbmd1bGFyXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBmYWN0b3J5KHJlcXVpcmUoXCJhbmd1bGFyXCIpKSA6IGZhY3Rvcnkocm9vdFtcImFuZ3VsYXJcIl0pO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX18pIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMGE1NTBhZmU2NDc3NDg5YjRiNjgiLCJcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIHNlYXJjaE11bHRpU2VsZWN0ID0gYW5ndWxhci5tb2R1bGUoJ3NlYXJjaE11bHRpU2VsZWN0JywgW10pO1xucmVxdWlyZSgnLi9jb3JlL2luZGV4LmpzJykoc2VhcmNoTXVsdGlTZWxlY3QpO1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgc2VhcmNoTXVsdGlTZWxlY3Q6IHNlYXJjaE11bHRpU2VsZWN0XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYXBwLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX187XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJhbmd1bGFyXCJcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IEphbXRlciBvbiAxNy80LzE0LlxuICovXG5yZXF1aXJlKCcuL2luZGV4Lmxlc3MnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG1vZCkge1xuICAgIHJlcXVpcmUoJy4vZmlsdGVyLmpzJykobW9kKTtcbiAgICBtb2QuZGlyZWN0aXZlKCdzZWFyY2hNdWx0aVNlbGVjdCcsIFsnJGxvZycsZnVuY3Rpb24gKCRsb2cpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRUEnLFxuICAgICAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgICAgICBzZWxlY3RPcHRpb25zQ29uZmlnOiAnPSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9pbmRleC5odG1sJyksXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbigkc2NvcGUsIGVsZW1lbnQpe1xuICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLndpZHRoID0gJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcud2lkdGggfHwgJCgnLmlucHV0LWJveCcpLndpZHRoKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NvbnRlbnRXaWR0aDonICsgJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcud2lkdGgpO1xuICAgICAgICAgICAgICAgIHZhciBzZWxlY3RPcHRpb25fdG90YWxXaWR0aCA9ICRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLndpZHRoIC0gJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcuaEdhcCAqICgkc2NvcGUuc2VsZWN0T3B0aW9uc0NvbmZpZy5wZXJOdW0gLSAxKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2VsZWN0T3B0aW9uX3RvdGFsV2lkdGg6JyArIHNlbGVjdE9wdGlvbl90b3RhbFdpZHRoKTtcblxuICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLnBlcldpZHRoID0gc2VsZWN0T3B0aW9uX3RvdGFsV2lkdGggLyAkc2NvcGUuc2VsZWN0T3B0aW9uc0NvbmZpZy5wZXJOdW07XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3BlcldpZHRoOicgKyAkc2NvcGUuc2VsZWN0T3B0aW9uc0NvbmZpZy5wZXJXaWR0aCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcuaW5wdXRXaWR0aCA9ICRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLndpZHRoIC0gKCRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLnBlcldpZHRoICsgJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcuaEdhcCkgKiAoJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcuc2VsZWN0ZWRPcHRpb25zQXJyLmxlbmd0aCAlICRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLnBlck51bSk7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcuaW5wdXRXaWR0aCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29udHJvbGxlcjogWyckc2NvcGUnLCBmdW5jdGlvbigkc2NvcGUpIHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IFNVQl9QUk9QRVJUWV9UWVBFX0VSUk9SX1RJUFMgPSAn6YWN572u5a+56LGh5pyJ6K+vLOW9k+WJjWRpcuiKgueCueayoeaciXN1YuWtl+autSzmiJbogIVzdWLlrZfmrrXnmoTnsbvlnovkuI3mmK/mlbDnu4QnO1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlLmlzTGluZUxhc3RTZWxlY3RPcHRpb24gPSBmdW5jdGlvbigkaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgkaW5kZXggKyAxKSAlICRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLnBlck51bSAhPT0gIDA7XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICRzY29wZS5jdXJyTGluZUhhc05vU2VsZWN0T3B0aW9ucyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKCRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLnNlbGVjdGVkT3B0aW9uc0Fyci5sZW5ndGggJSAkc2NvcGUuc2VsZWN0T3B0aW9uc0NvbmZpZy5wZXJOdW0gPT09IDApO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAvKipcbiAgICAgKiAgQGRlc2Mg6I635Y+W6KKr6YCJ5Litb3B0aW9uc+eahGtleeWxnuaAp+eahHZhbHVlXG4gICAgICogIEBwYXJhbSBrZXkgeyBTdHJpbmcgfSDlsZ7mgKflkI3vvIzpu5jorqTlgLzkuLonbmFtZSdcbiAgICAgKiAgQHJldHVybiB7IEFycmF5IH0g6L+U5Zue5LiA5Liq5pWw57uE77yMaXRlbeS4uuiiq+mAieS4rW9wdGlvbnPnmoRrZXnlsZ7mgKfnmoR2YWx1ZVxuICAgICAqICovXG4gICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcuZ2V0VmFsc0J5S2V5ID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdmFscyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBrZXkgPSBrZXkgfHwgJ25hbWUnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWUuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5ub2RlVHlwZSA9PT0gJ2xlYWYnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uaXNDaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHMucHVzaChpdGVtW2tleV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbS5ub2RlVHlwZSA9PT0gJ2RpcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZighYW5ndWxhci5pc0FycmF5KGl0ZW0uc3ViKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcih2YXIgaSA9IDAsIGwgPSBpdGVtLnN1Yi5sZW5ndGg7IGkgPCBsOyBpKyspe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5zdWJbaV0uaXNDaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxzLnB1c2goaXRlbS5zdWJbaV1ba2V5XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFscztcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgaWYgKCFhbmd1bGFyLmlzQXJyYXkoJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcuc2VsZWN0ZWRPcHRpb25zQXJyKSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0T3B0aW9uc0NvbmZpZy5zZWxlY3RlZE9wdGlvbnNBcnIgPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLmhHYXAgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0T3B0aW9uc0NvbmZpZy5oR2FwID0gODtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLnBlck51bSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLnBlck51bSA9IDQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgJHNjb3BlLnZpZXdTZXR0aW5ncyA9IHtcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoT3B0aW9uTmFtZSA6ICcnLFxuICAgICAgICAgICAgICAgICAgICBzaG93TWVudTogZmFsc2VcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICRzY29wZS50cmVlX3NlYXJjaF9yZXN1bHQgPSAgJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcudHJlZTtcblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEBkZXNjIOagueaNruebruW9leiKgueCueeahGNoZWNrYm946YCJ5Lit54q25oCBKOWFqOmAieWSjOmdnuWFqOmAiSksIOe7n+S4gOiuvue9ruebruW9leiKgueCueeahOaJgOacieWtkOiKgueCueeahOmAieS4reeKtuaAgVxuICAgICAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgICAgICogKi9cbiAgICAgICAgICAgICAgICB2YXIgc2V0TGVhZk5vZGVTdGF0dXMgPSBmdW5jdGlvbihvcHRpb25PYmope1xuICAgICAgICAgICAgICAgICAgICBpZiAoYW5ndWxhci5pc0FycmF5KG9wdGlvbk9iai5zdWIpICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBpID0gMCwgbCA9IG9wdGlvbk9iai5zdWIubGVuZ3RoOyBpIDwgbDsgaSsrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25PYmouc3ViW2ldLmlzQ2hlY2tlZCA9IG9wdGlvbk9iai5pc0NoZWNrZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+WPr+iDveacieivr+eahG9wdGlvbumhuTonICArIEpTT04uc3RyaW5naWZ5KG9wdGlvbk9iaikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFNVQl9QUk9QRVJUWV9UWVBFX0VSUk9SX1RJUFMpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgICAgICogQGRlc2Mg5b2Tb3B0aW9u5YiX6KGo5LitLOafkOS4qm9wdGlvbueahOmAieS4reeKtuaAgeWPkeeUn+WPmOWMluaXtizlkIzmraXmm7TmlrDlhbbkuIrkuIvmuLjnmoRvcHRpb25cbiAgICAgICAgICAgICAgICAgKlxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7IE9iamVjdCB9IOiiq+eCueWHu+S4lOeKtuaAgeabtOaUueeahG9wdGlvbumAiemhuVxuICAgICAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgICAgICogQHJldHVybiDmsqHmnInov5Tlm57lgLws55u05o6l5pu05pawc2VsZWN0T3B0aW9uc0NvbmZpZyh0cmVl44CBc2VsZWN0ZWRPcHRpb25BcnIpXG4gICAgICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAgICAgKiAqL1xuICAgICAgICAgICAgICAgICRzY29wZS51cGRhdGVUcmVlT2JqID0gZnVuY3Rpb24ob3B0aW9uT2JqKXtcbiAgICAgICAgICAgICAgICAgICAgaWYob3B0aW9uT2JqLm5vZGVUeXBlID09PSAnZGlyJyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihvcHRpb25PYmouaXNDaGVja2VkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYW5ndWxhci5pc0FycmF5KG9wdGlvbk9iai5zdWIpICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25PYmouc2VsZWN0ZWROdW1fUExVR0lOX0FTTVMgPSBvcHRpb25PYmouc3ViLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5Y+v6IO95pyJ6K+v55qEb3B0aW9u6aG5OicgICsgSlNPTi5zdHJpbmdpZnkob3B0aW9uT2JqKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihTVUJfUFJPUEVSVFlfVFlQRV9FUlJPUl9USVBTKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZigkc2NvcGUuc2VsZWN0T3B0aW9uc0NvbmZpZy5oYXNBbGxPcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcudHJlZVtvcHRpb25PYmoucGFyZW50SW5kZXhfUExVR0lOX0FTTVNdLnNlbGVjdGVkTnVtX1BMVUdJTl9BU01TKys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLnRyZWVbb3B0aW9uT2JqLnBhcmVudEluZGV4X1BMVUdJTl9BU01TXS5zZWxlY3RlZE51bV9QTFVHSU5fQVNNUyA9PT0gJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcudHJlZS5sZW5ndGggLSAxKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLnRyZWVbb3B0aW9uT2JqLnBhcmVudEluZGV4X1BMVUdJTl9BU01TXS5pc0NoZWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uT2JqLnNlbGVjdGVkTnVtX1BMVUdJTl9BU01TID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZigkc2NvcGUuc2VsZWN0T3B0aW9uc0NvbmZpZy5oYXNBbGxPcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcudHJlZVtvcHRpb25PYmoucGFyZW50SW5kZXhfUExVR0lOX0FTTVNdLnNlbGVjdGVkTnVtX1BMVUdJTl9BU01TLS07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLnRyZWVbb3B0aW9uT2JqLnBhcmVudEluZGV4X1BMVUdJTl9BU01TXS5pc0NoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNldExlYWZOb2RlU3RhdHVzKG9wdGlvbk9iaik7XG5cbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYob3B0aW9uT2JqLm5vZGVUeXBlID09PSAnbGVhZicpe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwYXJlbnRJbmRleF9QTFVHSU5fQVNNU+S4unVuZGVmaW5lZCzor7TmmI7lvZPliY1vcHRpb27mmK8y57qnb3B0aW9uLCDkuJTmsqHmnIlhbGwgb3B0aW9u6YCJ6aG5LCDml6DniLbml6DlrZAs5LiN5L+u5pS55ZCM5q2l5pu05paw54i25ZKM5a2QO2FsbCBvcHRpb27mmK8x57qnb3B0aW9uLCBkaXLlkoxkaXLlkIznuqfnmoRvcHRpb27mmK8y57qnb3B0aW9uLCBkaXLkuIvnmoRsZWFmIG9wdGlvbuaYrzPnuqdvcHRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25PYmoucGFyZW50SW5kZXhfUExVR0lOX0FTTVMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG9wdGlvbk9iai5pc0NoZWNrZWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLnRyZWVbb3B0aW9uT2JqLnBhcmVudEluZGV4X1BMVUdJTl9BU01TXS5zZWxlY3RlZE51bV9QTFVHSU5fQVNNUysrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLnRyZWVbb3B0aW9uT2JqLnBhcmVudEluZGV4X1BMVUdJTl9BU01TXS5ub2RlVHlwZSA9PT0gJ2FsbCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLnRyZWVbb3B0aW9uT2JqLnBhcmVudEluZGV4X1BMVUdJTl9BU01TXS5zZWxlY3RlZE51bV9QTFVHSU5fQVNNUyA9PT0gKCRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLnRyZWUubGVuZ3RoIC0xKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcudHJlZVtvcHRpb25PYmoucGFyZW50SW5kZXhfUExVR0lOX0FTTVNdLmlzQ2hlY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWtkOiKgueCueWFqOmDqOiiq+mAieS4reaXtiznm67lvZXoioLngrnnmoRjaGVja2JveOWImeS4unRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcudHJlZVtvcHRpb25PYmoucGFyZW50SW5kZXhfUExVR0lOX0FTTVNdLnNlbGVjdGVkTnVtX1BMVUdJTl9BU01TID09PSAkc2NvcGUuc2VsZWN0T3B0aW9uc0NvbmZpZy50cmVlW29wdGlvbk9iai5wYXJlbnRJbmRleF9QTFVHSU5fQVNNU10uc3ViLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0T3B0aW9uc0NvbmZpZy50cmVlW29wdGlvbk9iai5wYXJlbnRJbmRleF9QTFVHSU5fQVNNU10uaXNDaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLmhhc0FsbE9wdGlvbil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcudHJlZVskc2NvcGUuc2VsZWN0T3B0aW9uc0NvbmZpZy5hbGxPcHRpb25JbmRleF0uc2VsZWN0ZWROdW1fUExVR0lOX0FTTVMrKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcudHJlZVskc2NvcGUuc2VsZWN0T3B0aW9uc0NvbmZpZy5hbGxPcHRpb25JbmRleF0uc2VsZWN0ZWROdW1fUExVR0lOX0FTTVMgPT09ICgkc2NvcGUuc2VsZWN0T3B0aW9uc0NvbmZpZy50cmVlLmxlbmd0aCAtMSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcudHJlZVskc2NvcGUuc2VsZWN0T3B0aW9uc0NvbmZpZy5hbGxPcHRpb25JbmRleF0uaXNDaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZigkc2NvcGUuc2VsZWN0T3B0aW9uc0NvbmZpZy50cmVlW29wdGlvbk9iai5wYXJlbnRJbmRleF9QTFVHSU5fQVNNU10ubm9kZVR5cGUgPT09ICdkaXInKSB7ICAgIC8vIOWmguaenOeItuiKgueCueaYr2RpciBvcHRpb25cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDlpoLmnpzniLboioLngrkoZGly6IqC54K5KeWcqOayoeacieabtOaUueeKtuaAgeWJjSzmmK/pgInkuK3nmoQs6YKj5LmI5pS55Li65LiN6YCJ5Lit5LmL5ZCOLOi/mOmcgOimgeS/ruaUuWFsbCBvcHRpb24s6L+Z6YeM5YWI5o+Q5YmN5L+u5pS5YWxsIG9wdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZigkc2NvcGUuc2VsZWN0T3B0aW9uc0NvbmZpZy50cmVlW29wdGlvbk9iai5wYXJlbnRJbmRleF9QTFVHSU5fQVNNU10uaXNDaGVja2VkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLnRyZWVbJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcuYWxsT3B0aW9uSW5kZXhdLnNlbGVjdGVkTnVtX1BMVUdJTl9BU01TLS07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0T3B0aW9uc0NvbmZpZy50cmVlWyRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLmFsbE9wdGlvbkluZGV4XS5pc0NoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLnRyZWVbb3B0aW9uT2JqLnBhcmVudEluZGV4X1BMVUdJTl9BU01TXS5pc0NoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0T3B0aW9uc0NvbmZpZy50cmVlW29wdGlvbk9iai5wYXJlbnRJbmRleF9QTFVHSU5fQVNNU10uc2VsZWN0ZWROdW1fUExVR0lOX0FTTVMtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYob3B0aW9uT2JqLm5vZGVUeXBlID09PSAnYWxsJyl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOeCueWHu+S6huS4gOasoWFsbCBvcHRpb24sIOWPr+eQhuino+S4uueCueWHu+S6huaJgOaciTLnuqdvcHRpb24s6YCa6L+H5pu05pawMue6p29wdGlvbuadpeabtOaWsGFsbCBvcHRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLnRyZWUuZm9yRWFjaChmdW5jdGlvbihpdGVtLCBpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGl0ZW0ubm9kZVR5cGUgPT09ICdhbGwnKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmlzQ2hlY2tlZCA9IG9wdGlvbk9iai5pc0NoZWNrZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnVwZGF0ZVRyZWVPYmooaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEBkZXNjIOW/hemhu+etieWIsHRyZWXmm7TmlrDlrozkuYvlkI4s5omN6LCD55SoXG4gICAgICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAgICAgKlxuICAgICAgICAgICAgICAgICAqICovXG4gICAgICAgICAgICAgICAgJHNjb3BlLnVwZGF0ZVNlbGVjdGVkQXJyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzZWxlY3RlZE9wdGlvbnNBcnIgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbGVjdGVkVHlwZTtcbiAgICAgICAgICAgICAgICAgICAgaWYoJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcuaGFzQWxsT3B0aW9uICYmICRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLnRyZWVbJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcuYWxsT3B0aW9uSW5kZXhdLmlzQ2hlY2tlZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFR5cGUgPSAkc2NvcGUuc2VsZWN0T3B0aW9uc0NvbmZpZy50cmVlWyRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLmFsbE9wdGlvbkluZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkT3B0aW9uc0Fyci5wdXNoKHNlbGVjdGVkVHlwZSk7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcudHJlZS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaXRlbS5pc0NoZWNrZWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFR5cGUgPSBpdGVtO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZE9wdGlvbnNBcnIucHVzaChzZWxlY3RlZFR5cGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGl0ZW0ubm9kZVR5cGUgPT09ICdkaXInICYmIGl0ZW0uc3ViKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcih2YXIgaSA9IDAsIGwgPSBpdGVtLnN1Yi5sZW5ndGg7IGkgPCBsOyBpKyspe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaXRlbS5zdWJbaV0uaXNDaGVja2VkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFR5cGUgPSBpdGVtLnN1YltpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZE9wdGlvbnNBcnIucHVzaChzZWxlY3RlZFR5cGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gJCgnI3NlYXJjaElucHV0JykuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUoJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcuc2VsZWN0ZWRPcHRpb25zQXJyLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcuc2VsZWN0ZWRPcHRpb25zQXJyLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkT3B0aW9uc0Fyci5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pe1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcuc2VsZWN0ZWRPcHRpb25zQXJyLnB1c2goaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAkc2NvcGUudXBkYXRlSW5wdXRXaWR0aCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLmlucHV0V2lkdGggPSAkc2NvcGUuc2VsZWN0T3B0aW9uc0NvbmZpZy53aWR0aCAtICgkc2NvcGUuc2VsZWN0T3B0aW9uc0NvbmZpZy5wZXJXaWR0aCArICRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLmhHYXApICogKCRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLnNlbGVjdGVkT3B0aW9uc0Fyci5sZW5ndGggJSAkc2NvcGUuc2VsZWN0T3B0aW9uc0NvbmZpZy5wZXJOdW0pO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAkc2NvcGUudXBkYXRlQ29uZmlnT2JqID0gZnVuY3Rpb24ob3B0aW9uT2JqKXtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnVwZGF0ZVRyZWVPYmoob3B0aW9uT2JqKTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnVwZGF0ZVNlbGVjdGVkQXJyKCk7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS51cGRhdGVJbnB1dFdpZHRoKCk7XG5cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlLnNlYXJjaE9wdGlvbnMgPSBmdW5jdGlvbihvcHRpb25OYW1lKXtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS50cmVlX3NlYXJjaF9yZXN1bHQgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmKG9wdGlvbk5hbWUgPT09ICcnIHx8IG9wdGlvbk5hbWUgPT09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUudHJlZV9zZWFyY2hfcmVzdWx0ID0gJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcudHJlZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0T3B0aW9uc0NvbmZpZy50cmVlLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0ubm9kZVR5cGUgPT09ICdsZWFmJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGl0ZW0ubmFtZS5pbmRleE9mKG9wdGlvbk5hbWUpICE9IC0xKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnRyZWVfc2VhcmNoX3Jlc3VsdC5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbS5ub2RlVHlwZSA9PT0gJ2RpcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZighYW5ndWxhci5pc0FycmF5KGl0ZW0uc3ViKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcih2YXIgaSA9IDAsIGwgPSBpdGVtLnN1Yi5sZW5ndGg7IGkgPCBsOyBpKyspe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihpdGVtLnN1YltpXS5uYW1lLmluZGV4T2Yob3B0aW9uTmFtZSkgIT0gLTEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnRyZWVfc2VhcmNoX3Jlc3VsdC5wdXNoKGl0ZW0uc3ViW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBAZGVzYyDnlKjkuo7liKDpmaTmlbDmja7nsbvlnovovpPlhaXln5/kuK3pgInkuK3nmoTlrZfmrrUo5q+P5Liq5a2X5q615a+55bqU5LiA5Liq5Yig6Zmk5oyJ6ZKuKSzlrZfmrrXliIbkuLrkuInnsbs65YWo6YOo5pWw5o2uKGFsbCnjgIHnm67lvZXoioLngrkoZGlyKeWSjOWPtuWtkOiKgueCuShsZWFmKVxuICAgICAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgICAgICogKi9cbiAgICAgICAgICAgICAgICAkc2NvcGUuZGVsU2VsZWN0ZWRPcHRpb24gPSBmdW5jdGlvbih0eXBlSXRlbSl7XG4gICAgICAgICAgICAgICAgICAgIHR5cGVJdGVtLmlzQ2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnVwZGF0ZUNvbmZpZ09iaih0eXBlSXRlbSk7XG4gICAgICAgICAgICAgICAgfTtcblxuXG5cbiAgICAgICAgICAgICAgICAvLyDliJ3lp4vljJZzZWxlY3RPcHRpb25zQ29uZmlnLOS4uuaJgOacieiKgueCueWinuWKoGluZGV4X1BMVUdJTl9BU01T44CBcGFyZW50SW5kZXhfUExVR0lOX0FTTVMsIGlzQ2hlY2tlZCzlhbbkuK1pbmRleF9QTFVHSU5fQVNNU+S4uuW9k+WJjeiKgueCueWcqOaVsOe7hOeahGluZGV4X1BMVUdJTl9BU01TLHBhcmVudEluZGV4X1BMVUdJTl9BU01T5Li654i26IqC54K55Zyo5pWw57uE5Lit55qEaW5kZXhcbiAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0T3B0aW9uc0NvbmZpZy50cmVlLmZvckVhY2goZnVuY3Rpb24ob3V0ZXJJdGVtLCBvdXRlckluZGV4KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgb3V0ZXJJdGVtLmluZGV4X1BMVUdJTl9BU01TID0gb3V0ZXJJbmRleDtcbiAgICAgICAgICAgICAgICAgICAgb3V0ZXJJdGVtLmlzQ2hlY2tlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIOS7hW5vZGVUeXBl5Li6J2FsbCfpnIDopoHnlKjmiLfoh6rlt7Horr7lrprvvIzlhbblroPnlLHliJ3lp4vljJbnqIvluo/nlJ/miJBcbiAgICAgICAgICAgICAgICAgICAgaWYgKG91dGVySXRlbS5ub2RlVHlwZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYW5ndWxhci5pc0FycmF5KG91dGVySXRlbS5zdWIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0ZXJJdGVtLm5vZGVUeXBlID0gJ2Rpcic7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dGVySXRlbS5ub2RlVHlwZSA9ICdsZWFmJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZihvdXRlckl0ZW0ubm9kZVR5cGUgIT09ICdsZWFmJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3V0ZXJJdGVtLnNlbGVjdGVkTnVtX1BMVUdJTl9BU01TID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyDljIXmi6xub2RlVHlwZeS4uidkaXIn5ZKMJ2xlYWYn55qE5oOF5Ya1XG4gICAgICAgICAgICAgICAgICAgIGlmICgkc2NvcGUuc2VsZWN0T3B0aW9uc0NvbmZpZy5oYXNBbGxPcHRpb24gJiYgb3V0ZXJJdGVtLm5vZGVUeXBlICE9PSAnYWxsJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3V0ZXJJdGVtLnBhcmVudEluZGV4X1BMVUdJTl9BU01TID0gJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcuYWxsT3B0aW9uSW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG91dGVySXRlbS5ub2RlVHlwZSA9PT0gJ2RpcicgJiYgYW5ndWxhci5pc0FycmF5KG91dGVySXRlbS5zdWIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRlckl0ZW0uc3ViLmZvckVhY2goZnVuY3Rpb24oaW5uZXJJdGVtLCBpbm5lckluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXJJdGVtLm5vZGVUeXBlID0gJ2xlYWYnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlubmVySXRlbS5wYXJlbnRJbmRleF9QTFVHSU5fQVNNUyA9IG91dGVySW5kZXg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXJJdGVtLmluZGV4X1BMVUdJTl9BU01TID0gaW5uZXJJbmRleDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbm5lckl0ZW0uaXNDaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnRlc3QgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0T3B0aW9uc0NvbmZpZy5zZWxlY3RlZE9wdGlvbnNBcnIgPSBbXTtcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgLy8g6Kem5Y+Rd2F0Y2hlcueahGNhc2XmnIk6IDEuIHNlbGVjdE9wdGlvbnNDb25maWcuc2VsZWN0ZWRPcHRpb25zQXJy5Yid5aeL5YyW5pe2OyAyLiBzZWxlY3RPcHRpb25zQ29uZmlnLnNlbGVjdGVkT3B0aW9uc0FycumAmui/h+WcqOaPkuS7tuWklumDqOiiq+S/ruaUueW8leeUqOaXtijorazlpoLmj5Lku7bnlKjkuo7nvJbovpHnmoTmlbDmja7lm57mmL7ml7YpO1xuICAgICAgICAgICAgICAgICRzY29wZS4kd2F0Y2goJ3NlbGVjdE9wdGlvbnNDb25maWcuc2VsZWN0ZWRPcHRpb25zQXJyJywgZnVuY3Rpb24obmV3VmFsLCBvbGRWYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NlbGVjdGVkT3B0aW9uc0FyciBpcyBjaGFuZ2VkJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLyrmiafooYxpZuWGhemDqOeahOS7o+eggeeahGNhc2XmnIk6XG4gICAgICAgICAgICAgICAgICAgICAxLiBzZWxlY3RPcHRpb25zQ29uZmlnLnNlbGVjdGVkT3B0aW9uc0FycuWIneWni+WMluaXtu+8jOeUqOS6jua4hemZpOS5i+WJjeeahOe8k+WtmOaVsOaNrijmlbDnu4Tplb/luqbkuLowLCDkuZ/lj6/og73kuI3kuLowKTsqL1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0T3B0aW9uc0NvbmZpZy50cmVlLmZvckVhY2goZnVuY3Rpb24ob3V0ZXJJdGVtLCBvdXRlckluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRlckl0ZW0uaXNDaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3V0ZXJJdGVtLm5vZGVUeXBlID09PSAnZGlyJyAmJiBhbmd1bGFyLmlzQXJyYXkob3V0ZXJJdGVtLnN1YikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRlckl0ZW0uc3ViLmZvckVhY2goZnVuY3Rpb24oaW5uZXJJdGVtLCBpbm5lckluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlubmVySXRlbS5pc0NoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8g5qOA5p+l5Yid5aeL5YyW6YWN572u55qEc2VsZWN0ZWRPcHRpb25zQXJyLCDph4zpnaLnmoTlhYPntKDmmK/lkKbmnaXoh6rpgInmi6nliJfooagsIOWmguaenOS4jeaYr+WImeaKpemUmTsg5aaC5p6c5pivLOWImeabv+aNouS4uuagvOW8j+WMluWQjueahHRyZWUgaXRlbVxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0T3B0aW9uc0NvbmZpZy5zZWxlY3RlZE9wdGlvbnNBcnIuZm9yRWFjaChmdW5jdGlvbihpdGVtLCBpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlzTWF0Y2ggPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dGVyOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcih2YXIgb3V0ZXJfaSA9IDAsIG91dGVyX2wgPSAkc2NvcGUuc2VsZWN0T3B0aW9uc0NvbmZpZy50cmVlLmxlbmd0aDsgb3V0ZXJfaSA8IG91dGVyX2w7IG91dGVyX2krKyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvdXRlckl0ZW0gPSAgJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcudHJlZVtvdXRlcl9pXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaXRlbS5uYW1lID09PSBvdXRlckl0ZW0ubmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0ZXJJdGVtLmlzQ2hlY2tlZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOabtOaWsHRyZWVPYmosIOiAjOS4jeaYr3VwZGF0ZUNvbmZpZ09iauOAguWboOS4unVwZGF0ZUNvbmZpZ09i5Lya5YWI5pu05pawdHJlZU9iaizlho3mm7TmlrBzZWxlY3RlZE9wdGlvbkFycjvkvYbmmK/ov5nph4xzZWxlY3RlZE9wdGlvbkFycuW3suWIneWni+WMllxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnVwZGF0ZVRyZWVPYmoob3V0ZXJJdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdtYXRjaCBpdGVtOicgKyBKU09OLnN0cmluZ2lmeShvdXRlckl0ZW0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLnNlbGVjdGVkT3B0aW9uc0FycltpbmRleF0gPSBvdXRlckl0ZW07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc01hdGNoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG91dGVySXRlbS5ub2RlVHlwZSA9PT0gJ2RpcicgJiYgYW5ndWxhci5pc0FycmF5KG91dGVySXRlbS5zdWIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBpbm5lcl9pID0gMCwgaW5uZXJfbCA9IG91dGVySXRlbS5zdWIubGVuZ3RoOyBpbm5lcl9pIDwgaW5uZXJfbDsgaW5uZXJfaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbm5lckl0ZW0gPSBvdXRlckl0ZW0uc3ViW2lubmVyX2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihpdGVtLm5hbWUgPT09IGlubmVySXRlbS5uYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbm5lckl0ZW0uaXNDaGVja2VkID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5pu05pawdHJlZU9iaiwg6ICM5LiN5pivdXBkYXRlQ29uZmlnT2Jq44CC5Zug5Li6dXBkYXRlQ29uZmlnT2LkvJrlhYjmm7TmlrB0cmVlT2JqLOWGjeabtOaWsHNlbGVjdGVkT3B0aW9uQXJyO+S9huaYr+i/memHjHNlbGVjdGVkT3B0aW9uQXJy5bey5Yid5aeL5YyWXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUudXBkYXRlVHJlZU9iaihpbm5lckl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ21hdGNoIGl0ZW06JyArIEpTT04uc3RyaW5naWZ5KGlubmVySXRlbSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcuc2VsZWN0ZWRPcHRpb25zQXJyW2luZGV4XSA9IGlubmVySXRlbTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzTWF0Y2ggPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWsgb3V0ZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZighaXNNYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignc2VsZWN0ZWRPcHRpb25zQXJy5Lit55qE6KKr6YCJ5Lit6aG5LCDlubbmsqHmnInljIXlkKvlnKjpgInkuK3liJfooajkuK0nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zbGUubG9nKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnVwZGF0ZUlucHV0V2lkdGgoKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICQoZG9jdW1lbnQpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghJCh0YXJnZXQpLmlzKCcuc2VhcmNoLW11bHRpLXNlbGVjdC1hcmVhJykgJiYgISQodGFyZ2V0KS5wYXJlbnRzKCkuaXMoJy5zZWFyY2gtbXVsdGktc2VsZWN0LWFyZWEnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS52aWV3U2V0dGluZ3Muc2hvd01lbnUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9XVxuICAgICAgICB9O1xuICAgIH1dKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvcmUvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy9sZXNzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi9pbmRleC5sZXNzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCB7fSk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy9sZXNzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi9pbmRleC5sZXNzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvbGVzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4vaW5kZXgubGVzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29yZS9pbmRleC5sZXNzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi8qIHJlc2V0IFNUQVJUICovXFxudWwge1xcbiAgbGlzdC1zdHlsZTogbm9uZTtcXG59XFxuKiB7XFxuICBwYWRkaW5nOiAwO1xcbiAgbWFyZ2luOiAwO1xcbn1cXG4udGV4dC1lbGxpcHNpcyB7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xcbn1cXG4vKiByZXNldCBFTkQgKi9cXG4vKlxcbkBpbXBvcnQgKHJlZmVyZW5jZSkgXFxcImNtYi1jb2xvcnMubGVzc1xcXCI7XFxuKi9cXG4uY21iLWNoZWNrYm94IHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuLmNtYi1jaGVja2JveCA+IGxhYmVsOmJlZm9yZSB7XFxuICBjb250ZW50OiAnJztcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHZpc2liaWxpdHk6IHZpc2libGU7XFxuICB3aWR0aDogMTRweDtcXG4gIGhlaWdodDogMTRweDtcXG4gIHRvcDogM3B4O1xcbiAgbGVmdDogMHB4O1xcbiAgYmFja2dyb3VuZDogdXJsKFwiICsgcmVxdWlyZShcIi4vaW1hZ2VzL2NoZWNrYm94LXVuY2hlY2tlZC5zdmdcIikgKyBcIikgbm8tcmVwZWF0O1xcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcXG59XFxuLmNtYi1jaGVja2JveCA+IGlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl0sXFxuLmNtYi1jaGVja2JveCA+IGlucHV0W3R5cGU9XFxcInJhZGlvXFxcIl0ge1xcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcXG4gIHdpZHRoOiAxLjJlbTtcXG4gIGhlaWdodDogMS4yZW07XFxufVxcbi5jbWItY2hlY2tib3ggPiBpbnB1dFt0eXBlPWNoZWNrYm94XTpjaGVja2VkICsgbGFiZWw6YmVmb3JlLFxcbi5jbWItY2hlY2tib3ggPiBpbnB1dFt0eXBlPXJhZGlvXTpjaGVja2VkICsgbGFiZWw6YmVmb3JlIHtcXG4gIGJhY2tncm91bmQ6IHVybChcIiArIHJlcXVpcmUoXCIuL2ltYWdlcy9jaGVja2JveC1jaGVja2VkLnN2Z1wiKSArIFwiKSBuby1yZXBlYXQ7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbn1cXG4uc2VhcmNoLW11bHRpLXNlbGVjdC1hcmVhIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG4uc2VhcmNoLW11bHRpLXNlbGVjdC1hcmVhICNzZWFyY2hJbnB1dDpmb2N1cyB7XFxuICBib3JkZXItY29sb3I6ICM2NmFmZTk7XFxuICBvdXRsaW5lOiAwO1xcbiAgYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMXB4IHJnYmEoMCwgMCwgMCwgMC4wNzUpLCAwIDAgOHB4IHJnYmEoMTAyLCAxNzUsIDIzMywgMC42KTtcXG59XFxuLnNlYXJjaC1tdWx0aS1zZWxlY3QtYXJlYSAubm8tZGF0YS10aXBzIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHotaW5kZXg6IDk5OTtcXG4gIHRvcDogMTAwJTtcXG4gIGJhY2tncm91bmQ6ICNmZmY7XFxuICB3aWR0aDogMTAwJTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGhlaWdodDogMjhweDtcXG4gIGxpbmUtaGVpZ2h0OiAyOHB4O1xcbiAgbWFyZ2luLXRvcDogNHB4O1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2RlZGVkZTtcXG59XFxuLnNlYXJjaC1tdWx0aS1zZWxlY3QtYXJlYSAuaW5wdXQtYm94IHtcXG4gIGhlaWdodDogMzVweDtcXG59XFxuLnNlYXJjaC1tdWx0aS1zZWxlY3QtYXJlYSAuaW5wdXQtYm94IC50eXBlLW5hbWUtYm94IHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgd2lkdGg6IDEwMHB4O1xcbiAgaGVpZ2h0OiAyMXB4O1xcbiAgbGluZS1oZWlnaHQ6IDIxcHg7XFxuICBiYWNrZ3JvdW5kOiAjZWVlO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgbWFyZ2luOiA0cHggOHB4IDAgMDtcXG4gIHRleHQtYWxpZ246IGxlZnQ7XFxuICBwYWRkaW5nLWxlZnQ6IDhweDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuLnNlYXJjaC1tdWx0aS1zZWxlY3QtYXJlYSAuaW5wdXQtYm94IC50eXBlLW5hbWUtYm94IC50eXBlLW5hbWUtdGV4dCB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB3aWR0aDogODAlO1xcbn1cXG4uc2VhcmNoLW11bHRpLXNlbGVjdC1hcmVhIC5pbnB1dC1ib3ggLnR5cGUtbmFtZS1ib3ggLmNsb3NlLWJ0biB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICByaWdodDogNHB4O1xcbn1cXG4uc2VhcmNoLW11bHRpLXNlbGVjdC1hcmVhIC5pbnB1dC1ib3ggLmNvdmVyLWZhdGhlciB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbn1cXG4uc2VhcmNoLW11bHRpLXNlbGVjdC1hcmVhIC5pbnB1dC1ib3ggLnJlc2V0LWZvcm0tY29udHJvbCB7XFxuICB3aWR0aDogMTAwcHg7XFxuICBmbG9hdDogbGVmdDtcXG4gIG1pbi1oZWlnaHQ6IDA7XFxuICBoZWlnaHQ6IDIxcHg7XFxuICBsaW5lLWhlaWdodDogMjFweDtcXG4gIG1hcmdpbi10b3A6IDRweDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIG91dGxpbmU6IG5vbmU7XFxufVxcbi5zZWFyY2gtbXVsdGktc2VsZWN0LWFyZWEgLmhhcy1zZWxlY3RlZC10eXBlIHtcXG4gIGhlaWdodDogYXV0bztcXG59XFxuLnNlYXJjaC1tdWx0aS1zZWxlY3QtYXJlYSAudHlwZS1zZWxlY3QtcGFuZWwge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAxMDAlO1xcbiAgei1pbmRleDogOTk7XFxuICBiYWNrZ3JvdW5kOiAjZmZmO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBtYXgtaGVpZ2h0OiAyMDBweDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNFM0UzRTQ7XFxuICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDJweDtcXG4gIC1tb3otYm9yZGVyLXJhZGl1czogMnB4O1xcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xcbiAgb3ZlcmZsb3c6IGF1dG87XFxufVxcbi5zZWFyY2gtbXVsdGktc2VsZWN0LWFyZWEgLnR5cGUtc2VsZWN0LXBhbmVsIC5zZWxlY3QtYmxvY2sgLmNtYi1jaGVja2JveCB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMjZweDtcXG4gIGxpbmUtaGVpZ2h0OiAyNnB4O1xcbiAgcGFkZGluZy1sZWZ0OiAxMHB4O1xcbiAgdGV4dC1hbGlnbjogbGVmdDtcXG59XFxuLnNlYXJjaC1tdWx0aS1zZWxlY3QtYXJlYSAudHlwZS1zZWxlY3QtcGFuZWwgLnNlbGVjdC1ibG9jayAuY21iLWNoZWNrYm94OmhvdmVyIHtcXG4gIGJhY2tncm91bmQ6ICNGQUZBRkE7XFxufVxcbi5zZWFyY2gtbXVsdGktc2VsZWN0LWFyZWEgLnR5cGUtc2VsZWN0LXBhbmVsIC5zZWxlY3QtYmxvY2sgLmNtYi1jaGVja2JveCBpbnB1dFt0eXBlPVxcXCJjaGVja2JveFxcXCJdIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHotaW5kZXg6IDk5OTk7XFxuICBsZWZ0OiAuOHJlbTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxuICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xcbiAgb3BhY2l0eTogMDtcXG4gIHdpZHRoOiAxLjJlbTtcXG4gIGhlaWdodDogMS4yZW07XFxufVxcbi5zZWFyY2gtbXVsdGktc2VsZWN0LWFyZWEgLnR5cGUtc2VsZWN0LXBhbmVsIC5zZWxlY3QtYmxvY2sgLmNtYi1jaGVja2JveCBsYWJlbCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBmbG9hdDogbm9uZTtcXG4gIHBhZGRpbmctbGVmdDogMS42cmVtO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XFxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIGxpbmUtaGVpZ2h0OiBub3JtYWw7XFxuICAtbW96LXRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xcbiAgLW8tdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XFxuICB3aWR0aDogYXV0bztcXG4gIGhlaWdodDogMjZweDtcXG4gIGxpbmUtaGVpZ2h0OiAyNnB4O1xcbn1cXG4uc2VhcmNoLW11bHRpLXNlbGVjdC1hcmVhIC50eXBlLXNlbGVjdC1wYW5lbCAuc2VsZWN0LWJsb2NrIC5jbWItY2hlY2tib3ggbGFiZWw6YmVmb3JlIHtcXG4gIHRvcDogNTAlO1xcbiAgbWFyZ2luLXRvcDogLTdweDtcXG59XFxuLnNlYXJjaC1tdWx0aS1zZWxlY3QtYXJlYSAudHlwZS1zZWxlY3QtcGFuZWwgLnNlbGVjdC1ibG9jayAubGVhZi1jbWItY2hlY2tib3gge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBtYXJnaW4tbGVmdDogMjVweDtcXG59XFxuLnNlYXJjaC1tdWx0aS1zZWxlY3QtYXJlYSAuY3JlYXRlLWV4cG9ydC10YXNrLWJvZHkge1xcbiAgbWFyZ2luLXRvcDogOHB4O1xcbn1cXG4uc2VhcmNoLW11bHRpLXNlbGVjdC1hcmVhIC5jcmVhdGUtZXhwb3J0LXRhc2stZm9vdGVyIHtcXG4gIHBhZGRpbmctdG9wOiAxMHB4O1xcbn1cXG4uc2VhcmNoLW11bHRpLXNlbGVjdC1hcmVhIC5jcmVhdGUtZXhwb3J0LXRhc2staW5wdXQge1xcbiAgd2lkdGg6IDI1NnB4O1xcbn1cXG4uc2VhcmNoLW11bHRpLXNlbGVjdC1hcmVhIC5jcmVhdGUtZXhwb3J0LXRhc2staW5wdXQgPiAucmlnaHQtcGFydCB7XFxuICB3aWR0aDogMTAwJTtcXG4gIG1hcmdpbi1ib3R0b206IDAgIWltcG9ydGFudDtcXG59XFxuLnNlYXJjaC1tdWx0aS1zZWxlY3QtYXJlYSAuaW1wb3J0LXR5cGUtZmllbGQge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgbWluLWhlaWdodDogMzVweDtcXG4gIG1hcmdpbi1ib3R0b206IDQ3cHggIWltcG9ydGFudDtcXG59XFxuLnNlYXJjaC1tdWx0aS1zZWxlY3QtYXJlYSAuaW1wb3J0LXR5cGUtZmllbGQgLnNlbGVjdGlvbiB7XFxuICBiYWNrZ3JvdW5kOiAjZmZmO1xcbn1cXG4uc2VhcmNoLW11bHRpLXNlbGVjdC1hcmVhIC5pbXBvcnQtdGltZS1maWVsZCB7XFxuICBoZWlnaHQ6IDE0cHg7XFxuICBsaW5lLWhlaWdodDogMTRweDtcXG59XFxuLnNlYXJjaC1tdWx0aS1zZWxlY3QtYXJlYSAuaW1wb3J0LXRpbWUtZmllbGQgPiBsYWJlbCB7XFxuICBsaW5lLWhlaWdodDogMTRweCAhaW1wb3J0YW50O1xcbn1cXG4uc2VhcmNoLW11bHRpLXNlbGVjdC1hcmVhIC5pbXBvcnQtdGltZS1maWVsZCAucmlnaHQtcGFydCAucmFkaW8taW5saW5lIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGNvbG9yOiAjOTk5O1xcbn1cXG4uc2VhcmNoLW11bHRpLXNlbGVjdC1hcmVhIC5pbXBvcnQtdGltZS1maWVsZCAucmlnaHQtcGFydCBpbnB1dFt0eXBlPVxcXCJyYWRpb1xcXCJdIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogNTAlO1xcbiAgbWFyZ2luLXRvcDogLTcuNXB4O1xcbiAgd2lkdGg6IGF1dG87XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBoZWlnaHQ6IGF1dG87XFxuICBtaW4taGVpZ2h0OiBhdXRvO1xcbiAgbWFyZ2luLXJpZ2h0OiA4cHg7XFxufVxcbi5zZWFyY2gtbXVsdGktc2VsZWN0LWFyZWEgLmZhIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuLnNlYXJjaC1tdWx0aS1zZWxlY3QtYXJlYSAuZmE6YmVmb3JlIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHJpZ2h0OiAxMHB4O1xcbiAgdG9wOiAxMHB4O1xcbiAgY29sb3I6ICNCREJEQkQ7XFxufVxcbi5zZWFyY2gtbXVsdGktc2VsZWN0LWFyZWEgLnJlc2V0LWZhOmJlZm9yZSB7XFxuICB0b3A6IDA7XFxuICByaWdodDogOHB4O1xcbn1cXG4uc2VhcmNoLW11bHRpLXNlbGVjdC1hcmVhIC5zZWFyY2gtcmV0IHtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjRjZGNkY2O1xcbiAgcGFkZGluZy10b3A6IDIwcHg7XFxuICBtYXJnaW4tdG9wOiAyMHB4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG4uc2VhcmNoLW11bHRpLXNlbGVjdC1hcmVhIC5zZWFyY2gtcmV0IHN0cm9uZyB7XFxuICBjb2xvcjogIzY2NjtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxufVxcbi5zZWFyY2gtbXVsdGktc2VsZWN0LWFyZWEgLnNlYXJjaC1yZXQgc3BhbiB7XFxuICBjb2xvcjogIzk5OTtcXG4gIGZvbnQtc2l6ZTogMTJweDtcXG59XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2Nzcy1sb2FkZXIhLi9+L2xlc3MtbG9hZGVyP3NvdXJjZU1hcCEuL3NyYy9jb3JlL2luZGV4Lmxlc3Ncbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cclxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXHJcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xyXG5cdFx0dmFyIHJlc3VsdCA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSB0aGlzW2ldO1xyXG5cdFx0XHRpZihpdGVtWzJdKSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBpdGVtWzFdICsgXCJ9XCIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW1bMV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oXCJcIik7XHJcblx0fTtcclxuXHJcblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcclxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XHJcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcclxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xyXG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XHJcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcclxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XHJcblx0XHR9XHJcblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcclxuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxyXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xyXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxyXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxyXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xyXG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcclxuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xyXG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQRDk0Yld3Z2RtVnljMmx2YmowaU1TNHdJaUJsYm1OdlpHbHVaejBpVlZSR0xUZ2lJSE4wWVc1a1lXeHZibVU5SW01dklqOCtDanh6ZG1jZ2QybGtkR2c5SWpFMGNIZ2lJR2hsYVdkb2REMGlNVFJ3ZUNJZ2RtbGxkMEp2ZUQwaU1DQXdJREUwSURFMElpQjJaWEp6YVc5dVBTSXhMakVpSUhodGJHNXpQU0pvZEhSd09pOHZkM2QzTG5jekxtOXlaeTh5TURBd0wzTjJaeUlnZUcxc2JuTTZlR3hwYm1zOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6RTVPVGt2ZUd4cGJtc2lQZ29nSUNBZ1BDRXRMU0JIWlc1bGNtRjBiM0k2SUZOclpYUmphQ0JDWlhSaElETTVMakVnS0RNeE56SXhLU0F0SUdoMGRIQTZMeTkzZDNjdVltOW9aVzFwWVc1amIyUnBibWN1WTI5dEwzTnJaWFJqYUNBdExUNEtJQ0FnSUR4MGFYUnNaVDVTWldOMFlXNW5iR1VnTVRNZ1EyOXdlVHd2ZEdsMGJHVStDaUFnSUNBOFpHVnpZejVEY21WaGRHVmtJSGRwZEdnZ1UydGxkR05vSUVKbGRHRXVQQzlrWlhOalBnb2dJQ0FnUEdSbFpuTStDaUFnSUNBZ0lDQWdQSEpsWTNRZ2FXUTlJbkJoZEdndE1TSWdlRDBpTUNJZ2VUMGlNQ0lnZDJsa2RHZzlJakUwSWlCb1pXbG5hSFE5SWpFMElpQnllRDBpTVNJK1BDOXlaV04wUGdvZ0lDQWdJQ0FnSUR4dFlYTnJJR2xrUFNKdFlYTnJMVElpSUcxaGMydERiMjUwWlc1MFZXNXBkSE05SW5WelpYSlRjR0ZqWlU5dVZYTmxJaUJ0WVhOclZXNXBkSE05SW05aWFtVmpkRUp2ZFc1a2FXNW5RbTk0SWlCNFBTSXdJaUI1UFNJd0lpQjNhV1IwYUQwaU1UUWlJR2hsYVdkb2REMGlNVFFpSUdacGJHdzlJbmRvYVhSbElqNEtJQ0FnSUNBZ0lDQWdJQ0FnUEhWelpTQjRiR2x1YXpwb2NtVm1QU0lqY0dGMGFDMHhJajQ4TDNWelpUNEtJQ0FnSUNBZ0lDQThMMjFoYzJzK0NpQWdJQ0E4TDJSbFpuTStDaUFnSUNBOFp5QnBaRDBpNVlXejVyT281THlCNUxpYUlpQnpkSEp2YTJVOUltNXZibVVpSUhOMGNtOXJaUzEzYVdSMGFEMGlNU0lnWm1sc2JEMGlibTl1WlNJZ1ptbHNiQzF5ZFd4bFBTSmxkbVZ1YjJSa0lqNEtJQ0FnSUNBZ0lDQThaeUJwWkQwaU15SWdkSEpoYm5ObWIzSnRQU0owY21GdWMyeGhkR1VvTFRjeU55NHdNREF3TURBc0lDMHpPRFF1TURBd01EQXdLU0lnYzNSeWIydGxQU0lqUWtSQ1JFSkVJaUJ6ZEhKdmEyVXRkMmxrZEdnOUlqSWlJR1pwYkd3OUlpTkdSa1pHUmtZaVBnb2dJQ0FnSUNBZ0lDQWdJQ0E4WnlCcFpEMGlSM0p2ZFhBdE1UTXRRMjl3ZVMweE1DSWdkSEpoYm5ObWIzSnRQU0owY21GdWMyeGhkR1VvTlRJMUxqQXdNREF3TUN3Z01qZ3hMakF3TURBd01Da2lQZ29nSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdQR2NnYVdROUlrZHliM1Z3TFRVaUlIUnlZVzV6Wm05eWJUMGlkSEpoYm5Oc1lYUmxLRE15TGpBd01EQXdNQ3dnTVRBekxqQXdNREF3TUNraVBnb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRHhuSUdsa1BTSkhjbTkxY0MwM0lpQjBjbUZ1YzJadmNtMDlJblJ5WVc1emJHRjBaU2d4TnpBdU1EQXdNREF3TENBd0xqQXdNREF3TUNraVBnb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBOGRYTmxJR2xrUFNKU1pXTjBZVzVuYkdVdE1UTXRRMjl3ZVNJZ2JXRnphejBpZFhKc0tDTnRZWE5yTFRJcElpQjRiR2x1YXpwb2NtVm1QU0lqY0dGMGFDMHhJajQ4TDNWelpUNEtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0E4TDJjK0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBOEwyYytDaUFnSUNBZ0lDQWdJQ0FnSUR3dlp6NEtJQ0FnSUNBZ0lDQThMMmMrQ2lBZ0lDQThMMmMrQ2p3dmMzWm5QZz09XCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb3JlL2ltYWdlcy9jaGVja2JveC11bmNoZWNrZWQuc3ZnXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBEOTRiV3dnZG1WeWMybHZiajBpTVM0d0lpQmxibU52WkdsdVp6MGlWVlJHTFRnaUlITjBZVzVrWVd4dmJtVTlJbTV2SWo4K0NqeHpkbWNnZDJsa2RHZzlJakUwY0hnaUlHaGxhV2RvZEQwaU1UUndlQ0lnZG1sbGQwSnZlRDBpTUNBd0lERTBJREUwSWlCMlpYSnphVzl1UFNJeExqRWlJSGh0Ykc1elBTSm9kSFJ3T2k4dmQzZDNMbmN6TG05eVp5OHlNREF3TDNOMlp5SWdlRzFzYm5NNmVHeHBibXM5SW1oMGRIQTZMeTkzZDNjdWR6TXViM0puTHpFNU9Ua3ZlR3hwYm1zaVBnb2dJQ0FnUENFdExTQkhaVzVsY21GMGIzSTZJRk5yWlhSamFDQkNaWFJoSURNNUxqRWdLRE14TnpJeEtTQXRJR2gwZEhBNkx5OTNkM2N1WW05b1pXMXBZVzVqYjJScGJtY3VZMjl0TDNOclpYUmphQ0F0TFQ0S0lDQWdJRHgwYVhSc1pUNUhjbTkxY0NBNVBDOTBhWFJzWlQ0S0lDQWdJRHhrWlhOalBrTnlaV0YwWldRZ2QybDBhQ0JUYTJWMFkyZ2dRbVYwWVM0OEwyUmxjMk0rQ2lBZ0lDQThaR1ZtY3o0OEwyUmxabk0rQ2lBZ0lDQThaeUJwWkQwaTVZV3o1ck9vNUx5QjVMaWFJaUJ6ZEhKdmEyVTlJbTV2Ym1VaUlITjBjbTlyWlMxM2FXUjBhRDBpTVNJZ1ptbHNiRDBpYm05dVpTSWdabWxzYkMxeWRXeGxQU0psZG1WdWIyUmtJajRLSUNBZ0lDQWdJQ0E4WnlCcFpEMGlNeUlnZEhKaGJuTm1iM0p0UFNKMGNtRnVjMnhoZEdVb0xUVTFOeTR3TURBd01EQXNJQzB6T0RRdU1EQXdNREF3S1NJK0NpQWdJQ0FnSUNBZ0lDQWdJRHhuSUdsa1BTSkhjbTkxY0MweE15MURiM0I1TFRFd0lpQjBjbUZ1YzJadmNtMDlJblJ5WVc1emJHRjBaU2cxTWpVdU1EQXdNREF3TENBeU9ERXVNREF3TURBd0tTSStDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQThaeUJwWkQwaVIzSnZkWEF0TlNJZ2RISmhibk5tYjNKdFBTSjBjbUZ1YzJ4aGRHVW9Nekl1TURBd01EQXdMQ0F4TURNdU1EQXdNREF3S1NJK0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdQR2NnYVdROUlrZHliM1Z3TFRRaVBnb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBOFp5QnBaRDBpUjNKdmRYQXRPU0krQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBOGNHRjBhQ0JrUFNKTk1Dd3hMakF3TmpnME5UUTNJRU13TERBdU5EVXdOemd3TURjeklEQXVORFE1T1RRNE56VTRMREFnTVM0d01EWTRORFUwTnl3d0lFd3hNaTQ1T1RNeE5UUTFMREFnUXpFekxqVTBPVEl4T1Rrc01DQXhOQ3d3TGpRME9UazBPRGMxT0NBeE5Dd3hMakF3TmpnME5UUTNJRXd4TkN3eE1pNDVPVE14TlRRMUlFTXhOQ3d4TXk0MU5Ea3lNVGs1SURFekxqVTFNREExTVRJc01UUWdNVEl1T1Rrek1UVTBOU3d4TkNCTU1TNHdNRFk0TkRVME55d3hOQ0JETUM0ME5UQTNPREF3TnpNc01UUWdNQ3d4TXk0MU5UQXdOVEV5SURBc01USXVPVGt6TVRVME5TQk1NQ3d4TGpBd05qZzBOVFEzSUZvaUlHbGtQU0pTWldOMFlXNW5iR1V0TVRNaUlHWnBiR3c5SWlORU1UQXdNREFpUGp3dmNHRjBhRDRLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUR4d2IyeDVaMjl1SUdsa1BTSlNaV04wWVc1bmJHVXROQ0lnWm1sc2JEMGlJMFpHUmtaR1JpSWdkSEpoYm5ObWIzSnRQU0owY21GdWMyeGhkR1VvTnk0eU5ESTJOREVzSURZdU1qUXlOalF4S1NCeWIzUmhkR1VvTFRNeE5TNHdNREF3TURBcElIUnlZVzV6YkdGMFpTZ3ROeTR5TkRJMk5ERXNJQzAyTGpJME1qWTBNU2tnSWlCd2IybHVkSE05SWpVdU1qUXlOalF3TmprZ09TNHlOREkyTkRBMk9TQTRMakkwTWpZME1EWTVJRGt1TWpReU5qUXdOamtnT0M0eU5ESTJOREEyT1NBeUxqSTBNalkwTURZNUlEa3VNalF5TmpRd05qa2dNaTR5TkRJMk5EQTJPU0E1TGpJME1qWTBNRFk1SURrdU1qUXlOalF3TmprZ09TNHlOREkyTkRBMk9TQXhNQzR5TkRJMk5EQTNJRFV1TWpReU5qUXdOamtnTVRBdU1qUXlOalF3TnlJK1BDOXdiMng1WjI5dVBnb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBOEwyYytDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnUEM5blBnb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1BDOW5QZ29nSUNBZ0lDQWdJQ0FnSUNBOEwyYytDaUFnSUNBZ0lDQWdQQzluUGdvZ0lDQWdQQzluUGdvOEwzTjJaejQ9XCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb3JlL2ltYWdlcy9jaGVja2JveC1jaGVja2VkLnN2Z1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xudmFyIHN0eWxlc0luRG9tID0ge30sXG5cdG1lbW9pemUgPSBmdW5jdGlvbihmbikge1xuXHRcdHZhciBtZW1vO1xuXHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAodHlwZW9mIG1lbW8gPT09IFwidW5kZWZpbmVkXCIpIG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdFx0cmV0dXJuIG1lbW87XG5cdFx0fTtcblx0fSxcblx0aXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIC9tc2llIFs2LTldXFxiLy50ZXN0KHNlbGYubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKTtcblx0fSksXG5cdGdldEhlYWRFbGVtZW50ID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xuXHR9KSxcblx0c2luZ2xldG9uRWxlbWVudCA9IG51bGwsXG5cdHNpbmdsZXRvbkNvdW50ZXIgPSAwLFxuXHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcblx0aWYodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XG5cdFx0aWYodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XG5cdH1cblxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2Vcblx0aWYgKHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiA9PT0gXCJ1bmRlZmluZWRcIikgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIDxoZWFkPi5cblx0aWYgKHR5cGVvZiBvcHRpb25zLmluc2VydEF0ID09PSBcInVuZGVmaW5lZFwiKSBvcHRpb25zLmluc2VydEF0ID0gXCJib3R0b21cIjtcblxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QpO1xuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xuXHRcdH1cblx0XHRpZihuZXdMaXN0KSB7XG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QpO1xuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcblx0XHR9XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xuXHRcdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspXG5cdFx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oKTtcblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucykge1xuXHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cdFx0aWYoZG9tU3R5bGUpIHtcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcblx0XHRcdH1cblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyhsaXN0KSB7XG5cdHZhciBzdHlsZXMgPSBbXTtcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xuXHRmb3IodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcblx0XHR2YXIgaWQgPSBpdGVtWzBdO1xuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKVxuXHRcdFx0c3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcblx0XHRlbHNlXG5cdFx0XHRuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XG5cdH1cblx0cmV0dXJuIHN0eWxlcztcbn1cblxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlRWxlbWVudCkge1xuXHR2YXIgaGVhZCA9IGdldEhlYWRFbGVtZW50KCk7XG5cdHZhciBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCA9IHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wW3N0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xuXHRpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ0b3BcIikge1xuXHRcdGlmKCFsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCkge1xuXHRcdFx0aGVhZC5pbnNlcnRCZWZvcmUoc3R5bGVFbGVtZW50LCBoZWFkLmZpcnN0Q2hpbGQpO1xuXHRcdH0gZWxzZSBpZihsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xuXHRcdFx0aGVhZC5pbnNlcnRCZWZvcmUoc3R5bGVFbGVtZW50LCBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcblx0XHR9XG5cdFx0c3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AucHVzaChzdHlsZUVsZW1lbnQpO1xuXHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwiYm90dG9tXCIpIHtcblx0XHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcuIE11c3QgYmUgJ3RvcCcgb3IgJ2JvdHRvbScuXCIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcblx0c3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcblx0dmFyIGlkeCA9IHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLmluZGV4T2Yoc3R5bGVFbGVtZW50KTtcblx0aWYoaWR4ID49IDApIHtcblx0XHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcblx0fVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuXHR2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuXHRzdHlsZUVsZW1lbnQudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlRWxlbWVudCk7XG5cdHJldHVybiBzdHlsZUVsZW1lbnQ7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpIHtcblx0dmFyIGxpbmtFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG5cdGxpbmtFbGVtZW50LnJlbCA9IFwic3R5bGVzaGVldFwiO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgbGlua0VsZW1lbnQpO1xuXHRyZXR1cm4gbGlua0VsZW1lbnQ7XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlKG9iaiwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGVFbGVtZW50LCB1cGRhdGUsIHJlbW92ZTtcblxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcblx0XHRzdHlsZUVsZW1lbnQgPSBzaW5nbGV0b25FbGVtZW50IHx8IChzaW5nbGV0b25FbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCBmYWxzZSk7XG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgdHJ1ZSk7XG5cdH0gZWxzZSBpZihvYmouc291cmNlTWFwICYmXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdHN0eWxlRWxlbWVudCA9IGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZUVsZW1lbnQpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG5cdFx0XHRpZihzdHlsZUVsZW1lbnQuaHJlZilcblx0XHRcdFx0VVJMLnJldm9rZU9iamVjdFVSTChzdHlsZUVsZW1lbnQuaHJlZik7XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRzdHlsZUVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcblx0XHR9O1xuXHR9XG5cblx0dXBkYXRlKG9iaik7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlKG5ld09iaikge1xuXHRcdGlmKG5ld09iaikge1xuXHRcdFx0aWYobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwKVxuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR1cGRhdGUob2JqID0gbmV3T2JqKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVtb3ZlKCk7XG5cdFx0fVxuXHR9O1xufVxuXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgdGV4dFN0b3JlID0gW107XG5cblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG5cdH07XG59KSgpO1xuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnKHN0eWxlRWxlbWVudCwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcblxuXHRpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGVFbGVtZW50LmNoaWxkTm9kZXM7XG5cdFx0aWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuXHRcdFx0c3R5bGVFbGVtZW50Lmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChjc3NOb2RlKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyhzdHlsZUVsZW1lbnQsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xuXG5cdGlmKG1lZGlhKSB7XG5cdFx0c3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxuXHR9XG5cblx0aWYoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuXHR9IGVsc2Uge1xuXHRcdHdoaWxlKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG5cdFx0XHRzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuXHRcdH1cblx0XHRzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlTGluayhsaW5rRWxlbWVudCwgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuXHRpZihzb3VyY2VNYXApIHtcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxuXHRcdGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgXCIgKi9cIjtcblx0fVxuXG5cdHZhciBibG9iID0gbmV3IEJsb2IoW2Nzc10sIHsgdHlwZTogXCJ0ZXh0L2Nzc1wiIH0pO1xuXG5cdHZhciBvbGRTcmMgPSBsaW5rRWxlbWVudC5ocmVmO1xuXG5cdGxpbmtFbGVtZW50LmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXG5cdGlmKG9sZFNyYylcblx0XHRVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIENyZWF0ZWQgYnkgSmFtdGVyIG9uIDE3LzQvMTQuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG1vZCkge1xuICAgIC8qKlxuICAgICAqIEBkZXNjIOeUqOS6juWIpOaWreS4gOS4quWvueixoeaYr+WQpuaYr+epuuWvueixoXt9LCDmmK/liJnov5Tlm550cnVlXG4gICAgICpcbiAgICAgKiAqL1xuICAgIG1vZC5maWx0ZXIoJ2lzRW1wdHlPYmplY3QnLCBbZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYmFyO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgZm9yIChiYXIgaW4gb2JqKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShiYXIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICB9XSk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb3JlL2ZpbHRlci5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPCEtLTxkaXYgbmctY2xpY2s9XFxcInRlc3QoKVxcXCI+dGVzdDwvZGl2Pi0tPlxcbjxkaXYgY2xhc3M9XFxcInNlbGVjdGlvbiAgc2VhcmNoLW11bHRpLXNlbGVjdC1hcmVhXFxcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImlucHV0LWJveCBjbGVhcmZpeCBmb3JtLWNvbnRyb2xcXFwiIG5nLWNsYXNzPVxcXCJ7J2hhcy1zZWxlY3RlZC10eXBlJzpzZWxlY3RPcHRpb25zQ29uZmlnLnNlbGVjdGVkT3B0aW9uc0Fyci5sZW5ndGggIT0gMH1cXFwiPlxcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJ0eXBlLW5hbWUtYm94IFxcXCIgbmctcmVwZWF0PVxcXCJ0eXBlSXRlbSBpbiBzZWxlY3RPcHRpb25zQ29uZmlnLnNlbGVjdGVkT3B0aW9uc0FyclxcXCIgIG5nLWNsaWNrPVxcXCJkZWxTZWxlY3RlZE9wdGlvbih0eXBlSXRlbSk7JGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXFxcIiBuZy1zdHlsZT1cXFwie3dpZHRoOiBzZWxlY3RPcHRpb25zQ29uZmlnLnBlcldpZHRoICsgJ3B4JywgbWFyZ2luUmlnaHQ6IGlzTGluZUxhc3RTZWxlY3RPcHRpb24oJGluZGV4KT8gKHNlbGVjdE9wdGlvbnNDb25maWcuaEdhcCArICdweCcpOiAnMHB4J31cXFwiPjxzcGFuIGNsYXNzPVxcXCJ0eXBlLW5hbWUtdGV4dCB0ZXh0LWVsbGlwc2lzXFxcIiB0aXRsZT1cXFwie3s6OnR5cGVJdGVtLm5hbWV9fVxcXCI+e3s6OnR5cGVJdGVtLm5hbWV9fTwvc3Bhbj48c3BhbiBjbGFzcz1cXFwiY2xvc2UtYnRuXFxcIj54PC9zcGFuPjwvc3Bhbj5cXG4gICAgICAgICAgICA8aW5wdXQgaWQ9XFxcInNlYXJjaElucHV0XFxcIiBuZy1jbGFzcz1cXFwic2VsZWN0T3B0aW9uc0NvbmZpZy5zZWxlY3RlZE9wdGlvbnNBcnIubGVuZ3RoID09PSAwPydmb3JtLWNvbnRyb2wgY292ZXItZmF0aGVyJzoncmVzZXQtZm9ybS1jb250cm9sJ1xcXCIgbmctc3R5bGU9XFxcInt3aWR0aDogY3VyckxpbmVIYXNOb1NlbGVjdE9wdGlvbnMoJGluZGV4KT8nMTAwJSc6c2VsZWN0T3B0aW9uc0NvbmZpZy5pbnB1dFdpZHRoICsgJ3B4J31cXFwiIHBsYWNlaG9sZGVyPVxcXCJ7e3NlbGVjdE9wdGlvbnNDb25maWcuc2VsZWN0ZWRPcHRpb25zQXJyLmxlbmd0aCA9PT0gMD8gc2VsZWN0T3B0aW9uc0NvbmZpZy5wbGFjZWhvbGRlcjogJyd9fVxcXCIgbmctbW9kZWw9XFxcInZpZXdTZXR0aW5ncy5zZWFyY2hPcHRpb25OYW1lXFxcIiBuZy1mb2N1cz1cXFwidmlld1NldHRpbmdzLnNob3dNZW51ID0gdHJ1ZVxcXCIgbmctY2hhbmdlPVxcXCJzZWFyY2hPcHRpb25zKHZpZXdTZXR0aW5ncy5zZWFyY2hPcHRpb25OYW1lKVxcXCIvPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8dWwgY2xhc3M9XFxcInR5cGUtc2VsZWN0LXBhbmVsXFxcIiBuZy1zaG93PVxcXCJ2aWV3U2V0dGluZ3Muc2hvd01lbnUgJiYgdmlld1NldHRpbmdzLnNlYXJjaE9wdGlvbk5hbWUgPT09ICcnXFxcIj5cXG4gICAgICAgICAgICA8bGkgY2xhc3M9XFxcInNlbGVjdC1ibG9ja1xcXCIgbmctcmVwZWF0PVxcXCJ2IGluIHNlbGVjdE9wdGlvbnNDb25maWcudHJlZVxcXCI+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNtYi1jaGVja2JveFxcXCIgbmctY2xhc3M9XFxcInsnZmEgcmVzZXQtZmEnOiAodi5ub2RlVHlwZSA9PT0gJ2RpcicpLCAnZmEtYW5nbGUtdXAnOiBzaG93TGlzdCAmJiB2Lm5vZGVUeXBlID09PSAnZGlyJywgJ2ZhLWFuZ2xlLWRvd24nOiAhc2hvd0xpc3QgJiYgdi5ub2RlVHlwZSA9PT0gJ2Rpcid9XFxcIiBuZy1jbGljaz1cXFwic2hvd0xpc3QgPSAgIXNob3dMaXN0O1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XFxcInt7di5uYW1lfX1cXFwiIHR5cGU9XFxcImNoZWNrYm94XFxcIiBuZy1tb2RlbD1cXFwidi5pc0NoZWNrZWRcXFwiIG5nLWNoYW5nZT1cXFwidXBkYXRlQ29uZmlnT2JqKHYpXFxcIiBuZy1jbGljaz1cXFwiJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBuZy1iaW5kPVxcXCJ2Lm5hbWVcXFwiID48L2xhYmVsPlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzPVxcXCJsZWFmLW5vZGUtbGlzdFxcXCIgbmctc2hvdz1cXFwic2hvd0xpc3RcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVxcXCJjbWItY2hlY2tib3ggbGVhZi1jbWItY2hlY2tib3ggY2xlYXJmaXhcXFwiICBuZy1yZXBlYXQ9XFxcIml0ZW0gaW4gdi5zdWJcXFwiID5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgIHR5cGU9XFxcImNoZWNrYm94XFxcIiBuZy1tb2RlbD1cXFwiaXRlbS5pc0NoZWNrZWRcXFwiIG5nLWNoYW5nZT1cXFwidXBkYXRlQ29uZmlnT2JqKGl0ZW0pXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgIG5nLWJpbmQ9XFxcIml0ZW0ubmFtZVxcXCIgPjwvbGFiZWw+XFxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxcbiAgICAgICAgICAgICAgICA8L3VsPlxcbiAgICAgICAgICAgIDwvbGk+XFxuICAgICAgICA8L3VsPlxcbiAgICAgICAgPHVsIGNsYXNzPVxcXCJ0eXBlLXNlbGVjdC1wYW5lbFxcXCIgbmctc2hvdz1cXFwidmlld1NldHRpbmdzLnNob3dNZW51ICYmKHZpZXdTZXR0aW5ncy5zZWFyY2hPcHRpb25OYW1lICE9ICcnKSAmJiAodHJlZV9zZWFyY2hfcmVzdWx0Lmxlbmd0aCAhPT0gMClcXFwiPlxcbiAgICAgICAgICAgIDxsaSBjbGFzcz1cXFwic2VsZWN0LWJsb2NrXFxcIiBuZy1yZXBlYXQ9XFxcIml0ZW0gaW4gdHJlZV9zZWFyY2hfcmVzdWx0XFxcIiA+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNtYi1jaGVja2JveFxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0ICB0eXBlPVxcXCJjaGVja2JveFxcXCIgbmctbW9kZWw9XFxcIml0ZW0uaXNDaGVja2VkXFxcIiBuZy1jaGFuZ2U9XFxcInVwZGF0ZUNvbmZpZ09iaihpdGVtKVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsICBuZy1iaW5kPVxcXCJpdGVtLm5hbWVcXFwiID48L2xhYmVsPlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8L2xpPlxcbiAgICAgICAgPC91bD5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIm5vLWRhdGEtdGlwc1xcXCIgbmctc2hvdz1cXFwidmlld1NldHRpbmdzLnNob3dNZW51ICYmdmlld1NldHRpbmdzLnNlYXJjaE9wdGlvbk5hbWUgIT0gJycmJiAodHJlZV9zZWFyY2hfcmVzdWx0Lmxlbmd0aCA9PT0gMClcXFwiPiDml6DljLnphY3mlbDmja48L2Rpdj5cXG48L2Rpdj5cXG5cIjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb3JlL2luZGV4Lmh0bWxcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=