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
	                }
	
	                $scope.currLineHasNoSelectOptions = function() {
	                    return ($scope.selectOptionsConfig.selectedOptionsArr.length % $scope.selectOptionsConfig.perNum === 0);
	                }
	
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
	                    if(outerItem.nodeType !== 'leaf') {
	                        outerItem.selectedNum_PLUGIN_ASMS = 0;
	                    }
	                    // 包括nodeType为'dir'和'leaf'的情况
	                    if ($scope.selectOptionsConfig.hasAllOption && outerItem.nodeType !== 'all') {
	                        outerItem.parentIndex_PLUGIN_ASMS = $scope.selectOptionsConfig.allOptionIndex;
	                    }
	                    if (outerItem.nodeType === 'dir' && angular.isArray(outerItem.sub)) {
	                        outerItem.sub.forEach(function(innerItem, innerIndex) {
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
	                     1. selectOptionsConfig.selectedOptionsArr初始化时(数组长度为0, 也可能不为0);*/
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA3YWE0YjM3ZGZlMGM5ZGVlYzA4MiIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImFuZ3VsYXJcIiIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9pbmRleC5sZXNzPzQyYmYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvaW5kZXgubGVzcyIsIndlYnBhY2s6Ly8vLi9+L2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL2ltYWdlcy9jaGVja2JveC11bmNoZWNrZWQuc3ZnIiwid2VicGFjazovLy8uL3NyYy9jb3JlL2ltYWdlcy9jaGVja2JveC1jaGVja2VkLnN2ZyIsIndlYnBhY2s6Ly8vLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvZmlsdGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL2luZGV4Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNOQSxnRDs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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LEtBQUssaUJBQWlCLHNOQUFzTix1RkFBdUYsbUJBQW1CLDBGQUEwRix1YUFBdWEsMklBQTJJLG9DQUFvQyx1Q0FBdUMsUUFBUSxnekMiLCJmaWxlIjoiYW5ndWxhci1zZWFyY2gtbXVsdGktc2VsZWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiYW5ndWxhclwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJhbmd1bGFyXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBmYWN0b3J5KHJlcXVpcmUoXCJhbmd1bGFyXCIpKSA6IGZhY3Rvcnkocm9vdFtcImFuZ3VsYXJcIl0pO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX18pIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgN2FhNGIzN2RmZTBjOWRlZWMwODIiLCJcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIHNlYXJjaE11bHRpU2VsZWN0ID0gYW5ndWxhci5tb2R1bGUoJ3NlYXJjaE11bHRpU2VsZWN0JywgW10pO1xucmVxdWlyZSgnLi9jb3JlL2luZGV4LmpzJykoc2VhcmNoTXVsdGlTZWxlY3QpO1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgc2VhcmNoTXVsdGlTZWxlY3Q6IHNlYXJjaE11bHRpU2VsZWN0XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYXBwLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX187XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJhbmd1bGFyXCJcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IEphbXRlciBvbiAxNy80LzE0LlxuICovXG5yZXF1aXJlKCcuL2luZGV4Lmxlc3MnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG1vZCkge1xuICAgIHJlcXVpcmUoJy4vZmlsdGVyLmpzJykobW9kKTtcbiAgICBtb2QuZGlyZWN0aXZlKCdzZWFyY2hNdWx0aVNlbGVjdCcsIFsnJGxvZycsZnVuY3Rpb24gKCRsb2cpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRUEnLFxuICAgICAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgICAgICBzZWxlY3RPcHRpb25zQ29uZmlnOiAnPSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9pbmRleC5odG1sJyksXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbigkc2NvcGUsIGVsZW1lbnQpe1xuICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLndpZHRoID0gJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcud2lkdGggfHwgJCgnLmlucHV0LWJveCcpLndpZHRoKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NvbnRlbnRXaWR0aDonICsgJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcud2lkdGgpO1xuICAgICAgICAgICAgICAgIHZhciBzZWxlY3RPcHRpb25fdG90YWxXaWR0aCA9ICRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLndpZHRoIC0gJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcuaEdhcCAqICgkc2NvcGUuc2VsZWN0T3B0aW9uc0NvbmZpZy5wZXJOdW0gLSAxKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2VsZWN0T3B0aW9uX3RvdGFsV2lkdGg6JyArIHNlbGVjdE9wdGlvbl90b3RhbFdpZHRoKTtcblxuICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLnBlcldpZHRoID0gc2VsZWN0T3B0aW9uX3RvdGFsV2lkdGggLyAkc2NvcGUuc2VsZWN0T3B0aW9uc0NvbmZpZy5wZXJOdW07XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3BlcldpZHRoOicgKyAkc2NvcGUuc2VsZWN0T3B0aW9uc0NvbmZpZy5wZXJXaWR0aCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcuaW5wdXRXaWR0aCA9ICRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLndpZHRoIC0gKCRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLnBlcldpZHRoICsgJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcuaEdhcCkgKiAoJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcuc2VsZWN0ZWRPcHRpb25zQXJyLmxlbmd0aCAlICRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLnBlck51bSk7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcuaW5wdXRXaWR0aCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29udHJvbGxlcjogWyckc2NvcGUnLCBmdW5jdGlvbigkc2NvcGUpIHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IFNVQl9QUk9QRVJUWV9UWVBFX0VSUk9SX1RJUFMgPSAn6YWN572u5a+56LGh5pyJ6K+vLOW9k+WJjWRpcuiKgueCueayoeaciXN1YuWtl+autSzmiJbogIVzdWLlrZfmrrXnmoTnsbvlnovkuI3mmK/mlbDnu4QnO1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlLmlzTGluZUxhc3RTZWxlY3RPcHRpb24gPSBmdW5jdGlvbigkaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgkaW5kZXggKyAxKSAlICRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLnBlck51bSAhPT0gIDA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgJHNjb3BlLmN1cnJMaW5lSGFzTm9TZWxlY3RPcHRpb25zID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcuc2VsZWN0ZWRPcHRpb25zQXJyLmxlbmd0aCAlICRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLnBlck51bSA9PT0gMCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCFhbmd1bGFyLmlzQXJyYXkoJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcuc2VsZWN0ZWRPcHRpb25zQXJyKSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0T3B0aW9uc0NvbmZpZy5zZWxlY3RlZE9wdGlvbnNBcnIgPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLmhHYXAgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0T3B0aW9uc0NvbmZpZy5oR2FwID0gODtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLnBlck51bSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLnBlck51bSA9IDQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgJHNjb3BlLnZpZXdTZXR0aW5ncyA9IHtcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoT3B0aW9uTmFtZSA6ICcnLFxuICAgICAgICAgICAgICAgICAgICBzaG93TWVudTogZmFsc2VcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICRzY29wZS50cmVlX3NlYXJjaF9yZXN1bHQgPSAgJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcudHJlZTtcblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEBkZXNjIOagueaNruebruW9leiKgueCueeahGNoZWNrYm946YCJ5Lit54q25oCBKOWFqOmAieWSjOmdnuWFqOmAiSksIOe7n+S4gOiuvue9ruebruW9leiKgueCueeahOaJgOacieWtkOiKgueCueeahOmAieS4reeKtuaAgVxuICAgICAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgICAgICogKi9cbiAgICAgICAgICAgICAgICB2YXIgc2V0TGVhZk5vZGVTdGF0dXMgPSBmdW5jdGlvbihvcHRpb25PYmope1xuICAgICAgICAgICAgICAgICAgICBpZiAoYW5ndWxhci5pc0FycmF5KG9wdGlvbk9iai5zdWIpICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBpID0gMCwgbCA9IG9wdGlvbk9iai5zdWIubGVuZ3RoOyBpIDwgbDsgaSsrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25PYmouc3ViW2ldLmlzQ2hlY2tlZCA9IG9wdGlvbk9iai5pc0NoZWNrZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+WPr+iDveacieivr+eahG9wdGlvbumhuTonICArIEpTT04uc3RyaW5naWZ5KG9wdGlvbk9iaikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFNVQl9QUk9QRVJUWV9UWVBFX0VSUk9SX1RJUFMpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgICAgICogQGRlc2Mg5b2Tb3B0aW9u5YiX6KGo5LitLOafkOS4qm9wdGlvbueahOmAieS4reeKtuaAgeWPkeeUn+WPmOWMluaXtizlkIzmraXmm7TmlrDlhbbkuIrkuIvmuLjnmoRvcHRpb25cbiAgICAgICAgICAgICAgICAgKlxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7IE9iamVjdCB9IOiiq+eCueWHu+S4lOeKtuaAgeabtOaUueeahG9wdGlvbumAiemhuVxuICAgICAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgICAgICogQHJldHVybiDmsqHmnInov5Tlm57lgLws55u05o6l5pu05pawc2VsZWN0T3B0aW9uc0NvbmZpZyh0cmVl44CBc2VsZWN0ZWRPcHRpb25BcnIpXG4gICAgICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAgICAgKiAqL1xuICAgICAgICAgICAgICAgICRzY29wZS51cGRhdGVUcmVlT2JqID0gZnVuY3Rpb24ob3B0aW9uT2JqKXtcblxuICAgICAgICAgICAgICAgICAgICBpZihvcHRpb25PYmoubm9kZVR5cGUgPT09ICdkaXInKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYob3B0aW9uT2JqLmlzQ2hlY2tlZCl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYW5ndWxhci5pc0FycmF5KG9wdGlvbk9iai5zdWIpICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25PYmouc2VsZWN0ZWROdW1fUExVR0lOX0FTTVMgPSBvcHRpb25PYmouc3ViLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5Y+v6IO95pyJ6K+v55qEb3B0aW9u6aG5OicgICsgSlNPTi5zdHJpbmdpZnkob3B0aW9uT2JqKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihTVUJfUFJPUEVSVFlfVFlQRV9FUlJPUl9USVBTKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZigkc2NvcGUuc2VsZWN0T3B0aW9uc0NvbmZpZy5oYXNBbGxPcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcudHJlZVtvcHRpb25PYmoucGFyZW50SW5kZXhfUExVR0lOX0FTTVNdLnNlbGVjdGVkTnVtX1BMVUdJTl9BU01TKys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLnRyZWVbb3B0aW9uT2JqLnBhcmVudEluZGV4X1BMVUdJTl9BU01TXS5zZWxlY3RlZE51bV9QTFVHSU5fQVNNUyA9PT0gJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcudHJlZS5sZW5ndGggLSAxKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLnRyZWVbb3B0aW9uT2JqLnBhcmVudEluZGV4X1BMVUdJTl9BU01TXS5pc0NoZWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uT2JqLnNlbGVjdGVkTnVtX1BMVUdJTl9BU01TID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZigkc2NvcGUuc2VsZWN0T3B0aW9uc0NvbmZpZy5oYXNBbGxPcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcudHJlZVtvcHRpb25PYmoucGFyZW50SW5kZXhfUExVR0lOX0FTTVNdLnNlbGVjdGVkTnVtX1BMVUdJTl9BU01TLS07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLnRyZWVbb3B0aW9uT2JqLnBhcmVudEluZGV4X1BMVUdJTl9BU01TXS5pc0NoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNldExlYWZOb2RlU3RhdHVzKG9wdGlvbk9iaik7XG5cbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYob3B0aW9uT2JqLm5vZGVUeXBlID09PSAnbGVhZicpe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwYXJlbnRJbmRleF9QTFVHSU5fQVNNU+S4unVuZGVmaW5lZCzor7TmmI7lvZPliY1vcHRpb27mmK8y57qnb3B0aW9uLCDkuJTmsqHmnIlhbGwgb3B0aW9u6YCJ6aG5LCDml6DniLbml6DlrZAs5LiN5L+u5pS55ZCM5q2l5pu05paw54i25ZKM5a2QO2FsbCBvcHRpb27mmK8x57qnb3B0aW9uLCBkaXLlkoxkaXLlkIznuqfnmoRvcHRpb27mmK8y57qnb3B0aW9uLCBkaXLkuIvnmoRsZWFmIG9wdGlvbuaYrzPnuqdvcHRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25PYmoucGFyZW50SW5kZXhfUExVR0lOX0FTTVMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG9wdGlvbk9iai5pc0NoZWNrZWQpe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcudHJlZVtvcHRpb25PYmoucGFyZW50SW5kZXhfUExVR0lOX0FTTVNdLnNlbGVjdGVkTnVtX1BMVUdJTl9BU01TKys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcudHJlZVtvcHRpb25PYmoucGFyZW50SW5kZXhfUExVR0lOX0FTTVNdLm5vZGVUeXBlID09PSAnYWxsJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcudHJlZVtvcHRpb25PYmoucGFyZW50SW5kZXhfUExVR0lOX0FTTVNdLnNlbGVjdGVkTnVtX1BMVUdJTl9BU01TID09PSAoJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcudHJlZS5sZW5ndGggLTEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0T3B0aW9uc0NvbmZpZy50cmVlW29wdGlvbk9iai5wYXJlbnRJbmRleF9QTFVHSU5fQVNNU10uaXNDaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5a2Q6IqC54K55YWo6YOo6KKr6YCJ5Lit5pe2LOebruW9leiKgueCueeahGNoZWNrYm945YiZ5Li6dHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZigkc2NvcGUuc2VsZWN0T3B0aW9uc0NvbmZpZy50cmVlW29wdGlvbk9iai5wYXJlbnRJbmRleF9QTFVHSU5fQVNNU10uc2VsZWN0ZWROdW1fUExVR0lOX0FTTVMgPT09ICRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLnRyZWVbb3B0aW9uT2JqLnBhcmVudEluZGV4X1BMVUdJTl9BU01TXS5zdWIubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLnRyZWVbb3B0aW9uT2JqLnBhcmVudEluZGV4X1BMVUdJTl9BU01TXS5pc0NoZWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcuaGFzQWxsT3B0aW9uKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0T3B0aW9uc0NvbmZpZy50cmVlWyRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLmFsbE9wdGlvbkluZGV4XS5zZWxlY3RlZE51bV9QTFVHSU5fQVNNUysrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkc2NvcGUuc2VsZWN0T3B0aW9uc0NvbmZpZy50cmVlWyRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLmFsbE9wdGlvbkluZGV4XS5zZWxlY3RlZE51bV9QTFVHSU5fQVNNUyA9PT0gKCRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLnRyZWUubGVuZ3RoIC0xKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0T3B0aW9uc0NvbmZpZy50cmVlWyRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLmFsbE9wdGlvbkluZGV4XS5pc0NoZWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLnRyZWVbb3B0aW9uT2JqLnBhcmVudEluZGV4X1BMVUdJTl9BU01TXS5ub2RlVHlwZSA9PT0gJ2RpcicpIHsgICAgLy8g5aaC5p6c54i26IqC54K55pivZGlyIG9wdGlvblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWmguaenOeItuiKgueCuShkaXLoioLngrkp5Zyo5rKh5pyJ5pu05pS554q25oCB5YmNLOaYr+mAieS4reeahCzpgqPkuYjmlLnkuLrkuI3pgInkuK3kuYvlkI4s6L+Y6ZyA6KaB5L+u5pS5YWxsIG9wdGlvbizov5nph4zlhYjmj5DliY3kv67mlLlhbGwgb3B0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLnRyZWVbb3B0aW9uT2JqLnBhcmVudEluZGV4X1BMVUdJTl9BU01TXS5pc0NoZWNrZWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcudHJlZVskc2NvcGUuc2VsZWN0T3B0aW9uc0NvbmZpZy5hbGxPcHRpb25JbmRleF0uc2VsZWN0ZWROdW1fUExVR0lOX0FTTVMtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLnRyZWVbJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcuYWxsT3B0aW9uSW5kZXhdLmlzQ2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcudHJlZVtvcHRpb25PYmoucGFyZW50SW5kZXhfUExVR0lOX0FTTVNdLmlzQ2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLnRyZWVbb3B0aW9uT2JqLnBhcmVudEluZGV4X1BMVUdJTl9BU01TXS5zZWxlY3RlZE51bV9QTFVHSU5fQVNNUy0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihvcHRpb25PYmoubm9kZVR5cGUgPT09ICdhbGwnKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g54K55Ye75LqG5LiA5qyhYWxsIG9wdGlvbiwg5Y+v55CG6Kej5Li654K55Ye75LqG5omA5pyJMue6p29wdGlvbizpgJrov4fmm7TmlrAy57qnb3B0aW9u5p2l5pu05pawYWxsIG9wdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcudHJlZS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaXRlbS5ub2RlVHlwZSA9PT0gJ2FsbCcpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uaXNDaGVja2VkID0gb3B0aW9uT2JqLmlzQ2hlY2tlZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUudXBkYXRlVHJlZU9iaihpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogQGRlc2Mg5b+F6aG7562J5YiwdHJlZeabtOaWsOWujOS5i+WQjizmiY3osIPnlKhcbiAgICAgICAgICAgICAgICAgKlxuICAgICAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgICAgICogKi9cbiAgICAgICAgICAgICAgICAkc2NvcGUudXBkYXRlU2VsZWN0ZWRBcnIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbGVjdGVkT3B0aW9uc0FyciA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2VsZWN0ZWRUeXBlO1xuICAgICAgICAgICAgICAgICAgICBpZigkc2NvcGUuc2VsZWN0T3B0aW9uc0NvbmZpZy5oYXNBbGxPcHRpb24gJiYgJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcudHJlZVskc2NvcGUuc2VsZWN0T3B0aW9uc0NvbmZpZy5hbGxPcHRpb25JbmRleF0uaXNDaGVja2VkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkVHlwZSA9ICRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLnRyZWVbJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcuYWxsT3B0aW9uSW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRPcHRpb25zQXJyLnB1c2goc2VsZWN0ZWRUeXBlKTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0T3B0aW9uc0NvbmZpZy50cmVlLmZvckVhY2goZnVuY3Rpb24oaXRlbSwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihpdGVtLmlzQ2hlY2tlZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkVHlwZSA9IGl0ZW07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkT3B0aW9uc0Fyci5wdXNoKHNlbGVjdGVkVHlwZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaXRlbS5ub2RlVHlwZSA9PT0gJ2RpcicgJiYgaXRlbS5zdWIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBpID0gMCwgbCA9IGl0ZW0uc3ViLmxlbmd0aDsgaSA8IGw7IGkrKyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihpdGVtLnN1YltpXS5pc0NoZWNrZWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkVHlwZSA9IGl0ZW0uc3ViW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkT3B0aW9uc0Fyci5wdXNoKHNlbGVjdGVkVHlwZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyAkKCcjc2VhcmNoSW5wdXQnKS5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSgkc2NvcGUuc2VsZWN0T3B0aW9uc0NvbmZpZy5zZWxlY3RlZE9wdGlvbnNBcnIubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0T3B0aW9uc0NvbmZpZy5zZWxlY3RlZE9wdGlvbnNBcnIucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRPcHRpb25zQXJyLmZvckVhY2goZnVuY3Rpb24oaXRlbSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0T3B0aW9uc0NvbmZpZy5zZWxlY3RlZE9wdGlvbnNBcnIucHVzaChpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICRzY29wZS51cGRhdGVJbnB1dFdpZHRoID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcuaW5wdXRXaWR0aCA9ICRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLndpZHRoIC0gKCRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLnBlcldpZHRoICsgJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcuaEdhcCkgKiAoJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcuc2VsZWN0ZWRPcHRpb25zQXJyLmxlbmd0aCAlICRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLnBlck51bSk7XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICRzY29wZS51cGRhdGVDb25maWdPYmogPSBmdW5jdGlvbihvcHRpb25PYmope1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUudXBkYXRlVHJlZU9iaihvcHRpb25PYmopO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUudXBkYXRlU2VsZWN0ZWRBcnIoKTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnVwZGF0ZUlucHV0V2lkdGgoKTtcblxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAkc2NvcGUuc2VhcmNoT3B0aW9ucyA9IGZ1bmN0aW9uKG9wdGlvbk5hbWUpe1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnRyZWVfc2VhcmNoX3Jlc3VsdCA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYob3B0aW9uTmFtZSA9PT0gJycgfHwgb3B0aW9uTmFtZSA9PT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS50cmVlX3NlYXJjaF9yZXN1bHQgPSAkc2NvcGUuc2VsZWN0T3B0aW9uc0NvbmZpZy50cmVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLnRyZWUuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5ub2RlVHlwZSA9PT0gJ2xlYWYnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaXRlbS5uYW1lLmluZGV4T2Yob3B0aW9uTmFtZSkgIT0gLTEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUudHJlZV9zZWFyY2hfcmVzdWx0LnB1c2goaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtLm5vZGVUeXBlID09PSAnZGlyJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFhbmd1bGFyLmlzQXJyYXkoaXRlbS5zdWIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBpID0gMCwgbCA9IGl0ZW0uc3ViLmxlbmd0aDsgaSA8IGw7IGkrKyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGl0ZW0uc3ViW2ldLm5hbWUuaW5kZXhPZihvcHRpb25OYW1lKSAhPSAtMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUudHJlZV9zZWFyY2hfcmVzdWx0LnB1c2goaXRlbS5zdWJbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEBkZXNjIOeUqOS6juWIoOmZpOaVsOaNruexu+Wei+i+k+WFpeWfn+S4remAieS4reeahOWtl+autSjmr4/kuKrlrZfmrrXlr7nlupTkuIDkuKrliKDpmaTmjInpkq4pLOWtl+auteWIhuS4uuS4ieexuzrlhajpg6jmlbDmja4oYWxsKeOAgeebruW9leiKgueCuShkaXIp5ZKM5Y+25a2Q6IqC54K5KGxlYWYpXG4gICAgICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAgICAgKiAqL1xuICAgICAgICAgICAgICAgICRzY29wZS5kZWxTZWxlY3RlZE9wdGlvbiA9IGZ1bmN0aW9uKHR5cGVJdGVtKXtcbiAgICAgICAgICAgICAgICAgICAgdHlwZUl0ZW0uaXNDaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUudXBkYXRlQ29uZmlnT2JqKHR5cGVJdGVtKTtcbiAgICAgICAgICAgICAgICB9O1xuXG5cblxuICAgICAgICAgICAgICAgIC8vIOWIneWni+WMlnNlbGVjdE9wdGlvbnNDb25maWcs5Li65omA5pyJ6IqC54K55aKe5YqgaW5kZXhfUExVR0lOX0FTTVPjgIFwYXJlbnRJbmRleF9QTFVHSU5fQVNNUywgaXNDaGVja2VkLOWFtuS4rWluZGV4X1BMVUdJTl9BU01T5Li65b2T5YmN6IqC54K55Zyo5pWw57uE55qEaW5kZXhfUExVR0lOX0FTTVMscGFyZW50SW5kZXhfUExVR0lOX0FTTVPkuLrniLboioLngrnlnKjmlbDnu4TkuK3nmoRpbmRleFxuICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLnRyZWUuZm9yRWFjaChmdW5jdGlvbihvdXRlckl0ZW0sIG91dGVySW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgb3V0ZXJJdGVtLmluZGV4X1BMVUdJTl9BU01TID0gb3V0ZXJJbmRleDtcbiAgICAgICAgICAgICAgICAgICAgb3V0ZXJJdGVtLmlzQ2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBpZihvdXRlckl0ZW0ubm9kZVR5cGUgIT09ICdsZWFmJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3V0ZXJJdGVtLnNlbGVjdGVkTnVtX1BMVUdJTl9BU01TID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyDljIXmi6xub2RlVHlwZeS4uidkaXIn5ZKMJ2xlYWYn55qE5oOF5Ya1XG4gICAgICAgICAgICAgICAgICAgIGlmICgkc2NvcGUuc2VsZWN0T3B0aW9uc0NvbmZpZy5oYXNBbGxPcHRpb24gJiYgb3V0ZXJJdGVtLm5vZGVUeXBlICE9PSAnYWxsJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3V0ZXJJdGVtLnBhcmVudEluZGV4X1BMVUdJTl9BU01TID0gJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcuYWxsT3B0aW9uSW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG91dGVySXRlbS5ub2RlVHlwZSA9PT0gJ2RpcicgJiYgYW5ndWxhci5pc0FycmF5KG91dGVySXRlbS5zdWIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRlckl0ZW0uc3ViLmZvckVhY2goZnVuY3Rpb24oaW5uZXJJdGVtLCBpbm5lckluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXJJdGVtLnBhcmVudEluZGV4X1BMVUdJTl9BU01TID0gb3V0ZXJJbmRleDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbm5lckl0ZW0uaW5kZXhfUExVR0lOX0FTTVMgPSBpbm5lckluZGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlubmVySXRlbS5pc0NoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAkc2NvcGUudGVzdCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLnNlbGVjdGVkT3B0aW9uc0FyciA9IFtdO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAvLyDop6blj5F3YXRjaGVy55qEY2FzZeaciTogMS4gc2VsZWN0T3B0aW9uc0NvbmZpZy5zZWxlY3RlZE9wdGlvbnNBcnLliJ3lp4vljJbml7Y7IDIuIHNlbGVjdE9wdGlvbnNDb25maWcuc2VsZWN0ZWRPcHRpb25zQXJy6YCa6L+H5Zyo5o+S5Lu25aSW6YOo6KKr5L+u5pS55byV55So5pe2KOitrOWmguaPkuS7tueUqOS6jue8lui+keeahOaVsOaNruWbnuaYvuaXtik7XG4gICAgICAgICAgICAgICAgJHNjb3BlLiR3YXRjaCgnc2VsZWN0T3B0aW9uc0NvbmZpZy5zZWxlY3RlZE9wdGlvbnNBcnInLCBmdW5jdGlvbihuZXdWYWwsIG9sZFZhbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2VsZWN0ZWRPcHRpb25zQXJyIGlzIGNoYW5nZWQnKTtcblxuICAgICAgICAgICAgICAgICAgICAvKuaJp+ihjGlm5YaF6YOo55qE5Luj56CB55qEY2FzZeaciTpcbiAgICAgICAgICAgICAgICAgICAgIDEuIHNlbGVjdE9wdGlvbnNDb25maWcuc2VsZWN0ZWRPcHRpb25zQXJy5Yid5aeL5YyW5pe2KOaVsOe7hOmVv+W6puS4ujAsIOS5n+WPr+iDveS4jeS4ujApOyovXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLnRyZWUuZm9yRWFjaChmdW5jdGlvbihvdXRlckl0ZW0sIG91dGVySW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dGVySXRlbS5pc0NoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvdXRlckl0ZW0ubm9kZVR5cGUgPT09ICdkaXInICYmIGFuZ3VsYXIuaXNBcnJheShvdXRlckl0ZW0uc3ViKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dGVySXRlbS5zdWIuZm9yRWFjaChmdW5jdGlvbihpbm5lckl0ZW0sIGlubmVySW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXJJdGVtLmlzQ2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyDmo4Dmn6XliJ3lp4vljJbphY3nva7nmoRzZWxlY3RlZE9wdGlvbnNBcnIsIOmHjOmdoueahOWFg+e0oOaYr+WQpuadpeiHqumAieaLqeWIl+ihqCwg5aaC5p6c5LiN5piv5YiZ5oql6ZSZOyDlpoLmnpzmmK8s5YiZ5pu/5o2i5Li65qC85byP5YyW5ZCO55qEdHJlZSBpdGVtXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLnNlbGVjdGVkT3B0aW9uc0Fyci5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXNNYXRjaCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3V0ZXI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBvdXRlcl9pID0gMCwgb3V0ZXJfbCA9ICRzY29wZS5zZWxlY3RPcHRpb25zQ29uZmlnLnRyZWUubGVuZ3RoOyBvdXRlcl9pIDwgb3V0ZXJfbDsgb3V0ZXJfaSsrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG91dGVySXRlbSA9ICAkc2NvcGUuc2VsZWN0T3B0aW9uc0NvbmZpZy50cmVlW291dGVyX2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihpdGVtLm5hbWUgPT09IG91dGVySXRlbS5uYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRlckl0ZW0uaXNDaGVja2VkID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5pu05pawdHJlZU9iaiwg6ICM5LiN5pivdXBkYXRlQ29uZmlnT2Jq44CC5Zug5Li6dXBkYXRlQ29uZmlnT2LkvJrlhYjmm7TmlrB0cmVlT2JqLOWGjeabtOaWsHNlbGVjdGVkT3B0aW9uQXJyO+S9huaYr+i/memHjHNlbGVjdGVkT3B0aW9uQXJy5bey5Yid5aeL5YyWXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUudXBkYXRlVHJlZU9iaihvdXRlckl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ21hdGNoIGl0ZW06JyArIEpTT04uc3RyaW5naWZ5KG91dGVySXRlbSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdE9wdGlvbnNDb25maWcuc2VsZWN0ZWRPcHRpb25zQXJyW2luZGV4XSA9IG91dGVySXRlbTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzTWF0Y2ggPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3V0ZXJJdGVtLm5vZGVUeXBlID09PSAnZGlyJyAmJiBhbmd1bGFyLmlzQXJyYXkob3V0ZXJJdGVtLnN1YikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGlubmVyX2kgPSAwLCBpbm5lcl9sID0gb3V0ZXJJdGVtLnN1Yi5sZW5ndGg7IGlubmVyX2kgPCBpbm5lcl9sOyBpbm5lcl9pKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlubmVySXRlbSA9IG91dGVySXRlbS5zdWJbaW5uZXJfaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGl0ZW0ubmFtZSA9PT0gaW5uZXJJdGVtLm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlubmVySXRlbS5pc0NoZWNrZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDmm7TmlrB0cmVlT2JqLCDogIzkuI3mmK91cGRhdGVDb25maWdPYmrjgILlm6DkuLp1cGRhdGVDb25maWdPYuS8muWFiOabtOaWsHRyZWVPYmos5YaN5pu05pawc2VsZWN0ZWRPcHRpb25BcnI75L2G5piv6L+Z6YeMc2VsZWN0ZWRPcHRpb25BcnLlt7LliJ3lp4vljJZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS51cGRhdGVUcmVlT2JqKGlubmVySXRlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbWF0Y2ggaXRlbTonICsgSlNPTi5zdHJpbmdpZnkoaW5uZXJJdGVtKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0T3B0aW9uc0NvbmZpZy5zZWxlY3RlZE9wdGlvbnNBcnJbaW5kZXhdID0gaW5uZXJJdGVtO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNNYXRjaCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhayBvdXRlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFpc01hdGNoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdzZWxlY3RlZE9wdGlvbnNBcnLkuK3nmoTooqvpgInkuK3pobksIOW5tuayoeacieWMheWQq+WcqOmAieS4reWIl+ihqOS4rScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNsZS5sb2coaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUudXBkYXRlSW5wdXRXaWR0aCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgJChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEkKHRhcmdldCkuaXMoJy5zZWFyY2gtbXVsdGktc2VsZWN0LWFyZWEnKSAmJiAhJCh0YXJnZXQpLnBhcmVudHMoKS5pcygnLnNlYXJjaC1tdWx0aS1zZWxlY3QtYXJlYScpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnZpZXdTZXR0aW5ncy5zaG93TWVudSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1dXG4gICAgICAgIH07XG4gICAgfV0pO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29yZS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL2xlc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuL2luZGV4Lmxlc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIHt9KTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL2xlc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuL2luZGV4Lmxlc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy9sZXNzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi9pbmRleC5sZXNzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb3JlL2luZGV4Lmxlc3Ncbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLyogcmVzZXQgU1RBUlQgKi9cXG51bCB7XFxuICBsaXN0LXN0eWxlOiBub25lO1xcbn1cXG4qIHtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7XFxufVxcbi50ZXh0LWVsbGlwc2lzIHtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XFxufVxcbi8qIHJlc2V0IEVORCAqL1xcbi8qXFxuQGltcG9ydCAocmVmZXJlbmNlKSBcXFwiY21iLWNvbG9ycy5sZXNzXFxcIjtcXG4qL1xcbi5jbWItY2hlY2tib3gge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG4uY21iLWNoZWNrYm94ID4gbGFiZWw6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6ICcnO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgdmlzaWJpbGl0eTogdmlzaWJsZTtcXG4gIHdpZHRoOiAxNHB4O1xcbiAgaGVpZ2h0OiAxNHB4O1xcbiAgdG9wOiAzcHg7XFxuICBsZWZ0OiAwcHg7XFxuICBiYWNrZ3JvdW5kOiB1cmwoXCIgKyByZXF1aXJlKFwiLi9pbWFnZXMvY2hlY2tib3gtdW5jaGVja2VkLnN2Z1wiKSArIFwiKSBuby1yZXBlYXQ7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbn1cXG4uY21iLWNoZWNrYm94ID4gaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXSxcXG4uY21iLWNoZWNrYm94ID4gaW5wdXRbdHlwZT1cXFwicmFkaW9cXFwiXSB7XFxuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbiAgd2lkdGg6IDEuMmVtO1xcbiAgaGVpZ2h0OiAxLjJlbTtcXG59XFxuLmNtYi1jaGVja2JveCA+IGlucHV0W3R5cGU9Y2hlY2tib3hdOmNoZWNrZWQgKyBsYWJlbDpiZWZvcmUsXFxuLmNtYi1jaGVja2JveCA+IGlucHV0W3R5cGU9cmFkaW9dOmNoZWNrZWQgKyBsYWJlbDpiZWZvcmUge1xcbiAgYmFja2dyb3VuZDogdXJsKFwiICsgcmVxdWlyZShcIi4vaW1hZ2VzL2NoZWNrYm94LWNoZWNrZWQuc3ZnXCIpICsgXCIpIG5vLXJlcGVhdDtcXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxufVxcbi5zZWFyY2gtbXVsdGktc2VsZWN0LWFyZWEge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgd2lkdGg6IDEwMCU7XFxufVxcbi5zZWFyY2gtbXVsdGktc2VsZWN0LWFyZWEgI3NlYXJjaElucHV0OmZvY3VzIHtcXG4gIGJvcmRlci1jb2xvcjogIzY2YWZlOTtcXG4gIG91dGxpbmU6IDA7XFxuICBib3gtc2hhZG93OiBpbnNldCAwIDFweCAxcHggcmdiYSgwLCAwLCAwLCAwLjA3NSksIDAgMCA4cHggcmdiYSgxMDIsIDE3NSwgMjMzLCAwLjYpO1xcbn1cXG4uc2VhcmNoLW11bHRpLXNlbGVjdC1hcmVhIC5uby1kYXRhLXRpcHMge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgei1pbmRleDogOTk5O1xcbiAgdG9wOiAxMDAlO1xcbiAgYmFja2dyb3VuZDogI2ZmZjtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgaGVpZ2h0OiAyOHB4O1xcbiAgbGluZS1oZWlnaHQ6IDI4cHg7XFxuICBtYXJnaW4tdG9wOiA0cHg7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjZGVkZWRlO1xcbn1cXG4uc2VhcmNoLW11bHRpLXNlbGVjdC1hcmVhIC5pbnB1dC1ib3gge1xcbiAgaGVpZ2h0OiAzNXB4O1xcbn1cXG4uc2VhcmNoLW11bHRpLXNlbGVjdC1hcmVhIC5pbnB1dC1ib3ggLnR5cGUtbmFtZS1ib3gge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICB3aWR0aDogMTAwcHg7XFxuICBoZWlnaHQ6IDIxcHg7XFxuICBsaW5lLWhlaWdodDogMjFweDtcXG4gIGJhY2tncm91bmQ6ICNlZWU7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBtYXJnaW46IDRweCA4cHggMCAwO1xcbiAgdGV4dC1hbGlnbjogbGVmdDtcXG4gIHBhZGRpbmctbGVmdDogOHB4O1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG4uc2VhcmNoLW11bHRpLXNlbGVjdC1hcmVhIC5pbnB1dC1ib3ggLnR5cGUtbmFtZS1ib3ggLnR5cGUtbmFtZS10ZXh0IHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHdpZHRoOiA4MCU7XFxufVxcbi5zZWFyY2gtbXVsdGktc2VsZWN0LWFyZWEgLmlucHV0LWJveCAudHlwZS1uYW1lLWJveCAuY2xvc2UtYnRuIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHJpZ2h0OiA0cHg7XFxufVxcbi5zZWFyY2gtbXVsdGktc2VsZWN0LWFyZWEgLmlucHV0LWJveCAuY292ZXItZmF0aGVyIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxufVxcbi5zZWFyY2gtbXVsdGktc2VsZWN0LWFyZWEgLmlucHV0LWJveCAucmVzZXQtZm9ybS1jb250cm9sIHtcXG4gIHdpZHRoOiAxMDBweDtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgbWluLWhlaWdodDogMDtcXG4gIGhlaWdodDogMjFweDtcXG4gIGxpbmUtaGVpZ2h0OiAyMXB4O1xcbiAgbWFyZ2luLXRvcDogNHB4O1xcbiAgYm9yZGVyOiBub25lO1xcbiAgb3V0bGluZTogbm9uZTtcXG59XFxuLnNlYXJjaC1tdWx0aS1zZWxlY3QtYXJlYSAuaGFzLXNlbGVjdGVkLXR5cGUge1xcbiAgaGVpZ2h0OiBhdXRvO1xcbn1cXG4uc2VhcmNoLW11bHRpLXNlbGVjdC1hcmVhIC50eXBlLXNlbGVjdC1wYW5lbCB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDEwMCU7XFxuICB6LWluZGV4OiA5OTtcXG4gIGJhY2tncm91bmQ6ICNmZmY7XFxuICB3aWR0aDogMTAwJTtcXG4gIG1heC1oZWlnaHQ6IDIwMHB4O1xcbiAgYm9yZGVyOiAxcHggc29saWQgI0UzRTNFNDtcXG4gIC13ZWJraXQtYm9yZGVyLXJhZGl1czogMnB4O1xcbiAgLW1vei1ib3JkZXItcmFkaXVzOiAycHg7XFxuICBib3JkZXItcmFkaXVzOiAycHg7XFxuICBvdmVyZmxvdzogYXV0bztcXG59XFxuLnNlYXJjaC1tdWx0aS1zZWxlY3QtYXJlYSAudHlwZS1zZWxlY3QtcGFuZWwgLnNlbGVjdC1ibG9jayAuY21iLWNoZWNrYm94IHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAyNnB4O1xcbiAgbGluZS1oZWlnaHQ6IDI2cHg7XFxuICBwYWRkaW5nLWxlZnQ6IDEwcHg7XFxuICB0ZXh0LWFsaWduOiBsZWZ0O1xcbn1cXG4uc2VhcmNoLW11bHRpLXNlbGVjdC1hcmVhIC50eXBlLXNlbGVjdC1wYW5lbCAuc2VsZWN0LWJsb2NrIC5jbWItY2hlY2tib3g6aG92ZXIge1xcbiAgYmFja2dyb3VuZDogI0ZBRkFGQTtcXG59XFxuLnNlYXJjaC1tdWx0aS1zZWxlY3QtYXJlYSAudHlwZS1zZWxlY3QtcGFuZWwgLnNlbGVjdC1ibG9jayAuY21iLWNoZWNrYm94IGlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl0ge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgei1pbmRleDogOTk5OTtcXG4gIGxlZnQ6IC44cmVtO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG4gIHZpc2liaWxpdHk6IHZpc2libGU7XFxuICBvcGFjaXR5OiAwO1xcbiAgd2lkdGg6IDEuMmVtO1xcbiAgaGVpZ2h0OiAxLjJlbTtcXG59XFxuLnNlYXJjaC1tdWx0aS1zZWxlY3QtYXJlYSAudHlwZS1zZWxlY3QtcGFuZWwgLnNlbGVjdC1ibG9jayAuY21iLWNoZWNrYm94IGxhYmVsIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGZsb2F0OiBub25lO1xcbiAgcGFkZGluZy1sZWZ0OiAxLjZyZW07XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgbGluZS1oZWlnaHQ6IG5vcm1hbDtcXG4gIC1tb3otdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XFxuICAtby10ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcXG4gIHdpZHRoOiBhdXRvO1xcbiAgaGVpZ2h0OiAyNnB4O1xcbiAgbGluZS1oZWlnaHQ6IDI2cHg7XFxufVxcbi5zZWFyY2gtbXVsdGktc2VsZWN0LWFyZWEgLnR5cGUtc2VsZWN0LXBhbmVsIC5zZWxlY3QtYmxvY2sgLmNtYi1jaGVja2JveCBsYWJlbDpiZWZvcmUge1xcbiAgdG9wOiA1MCU7XFxuICBtYXJnaW4tdG9wOiAtN3B4O1xcbn1cXG4uc2VhcmNoLW11bHRpLXNlbGVjdC1hcmVhIC50eXBlLXNlbGVjdC1wYW5lbCAuc2VsZWN0LWJsb2NrIC5sZWFmLWNtYi1jaGVja2JveCB7XFxuICB3aWR0aDogMTAwJTtcXG4gIG1hcmdpbi1sZWZ0OiAyNXB4O1xcbn1cXG4uc2VhcmNoLW11bHRpLXNlbGVjdC1hcmVhIC5jcmVhdGUtZXhwb3J0LXRhc2stYm9keSB7XFxuICBtYXJnaW4tdG9wOiA4cHg7XFxufVxcbi5zZWFyY2gtbXVsdGktc2VsZWN0LWFyZWEgLmNyZWF0ZS1leHBvcnQtdGFzay1mb290ZXIge1xcbiAgcGFkZGluZy10b3A6IDEwcHg7XFxufVxcbi5zZWFyY2gtbXVsdGktc2VsZWN0LWFyZWEgLmNyZWF0ZS1leHBvcnQtdGFzay1pbnB1dCB7XFxuICB3aWR0aDogMjU2cHg7XFxufVxcbi5zZWFyY2gtbXVsdGktc2VsZWN0LWFyZWEgLmNyZWF0ZS1leHBvcnQtdGFzay1pbnB1dCA+IC5yaWdodC1wYXJ0IHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgbWFyZ2luLWJvdHRvbTogMCAhaW1wb3J0YW50O1xcbn1cXG4uc2VhcmNoLW11bHRpLXNlbGVjdC1hcmVhIC5pbXBvcnQtdHlwZS1maWVsZCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBtaW4taGVpZ2h0OiAzNXB4O1xcbiAgbWFyZ2luLWJvdHRvbTogNDdweCAhaW1wb3J0YW50O1xcbn1cXG4uc2VhcmNoLW11bHRpLXNlbGVjdC1hcmVhIC5pbXBvcnQtdHlwZS1maWVsZCAuc2VsZWN0aW9uIHtcXG4gIGJhY2tncm91bmQ6ICNmZmY7XFxufVxcbi5zZWFyY2gtbXVsdGktc2VsZWN0LWFyZWEgLmltcG9ydC10aW1lLWZpZWxkIHtcXG4gIGhlaWdodDogMTRweDtcXG4gIGxpbmUtaGVpZ2h0OiAxNHB4O1xcbn1cXG4uc2VhcmNoLW11bHRpLXNlbGVjdC1hcmVhIC5pbXBvcnQtdGltZS1maWVsZCA+IGxhYmVsIHtcXG4gIGxpbmUtaGVpZ2h0OiAxNHB4ICFpbXBvcnRhbnQ7XFxufVxcbi5zZWFyY2gtbXVsdGktc2VsZWN0LWFyZWEgLmltcG9ydC10aW1lLWZpZWxkIC5yaWdodC1wYXJ0IC5yYWRpby1pbmxpbmUge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgY29sb3I6ICM5OTk7XFxufVxcbi5zZWFyY2gtbXVsdGktc2VsZWN0LWFyZWEgLmltcG9ydC10aW1lLWZpZWxkIC5yaWdodC1wYXJ0IGlucHV0W3R5cGU9XFxcInJhZGlvXFxcIl0ge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiA1MCU7XFxuICBtYXJnaW4tdG9wOiAtNy41cHg7XFxuICB3aWR0aDogYXV0bztcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGhlaWdodDogYXV0bztcXG4gIG1pbi1oZWlnaHQ6IGF1dG87XFxuICBtYXJnaW4tcmlnaHQ6IDhweDtcXG59XFxuLnNlYXJjaC1tdWx0aS1zZWxlY3QtYXJlYSAuZmEge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG4uc2VhcmNoLW11bHRpLXNlbGVjdC1hcmVhIC5mYTpiZWZvcmUge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgcmlnaHQ6IDEwcHg7XFxuICB0b3A6IDEwcHg7XFxuICBjb2xvcjogI0JEQkRCRDtcXG59XFxuLnNlYXJjaC1tdWx0aS1zZWxlY3QtYXJlYSAucmVzZXQtZmE6YmVmb3JlIHtcXG4gIHRvcDogMDtcXG4gIHJpZ2h0OiA4cHg7XFxufVxcbi5zZWFyY2gtbXVsdGktc2VsZWN0LWFyZWEgLnNlYXJjaC1yZXQge1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNGNkY2RjY7XFxuICBwYWRkaW5nLXRvcDogMjBweDtcXG4gIG1hcmdpbi10b3A6IDIwcHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcbi5zZWFyY2gtbXVsdGktc2VsZWN0LWFyZWEgLnNlYXJjaC1yZXQgc3Ryb25nIHtcXG4gIGNvbG9yOiAjNjY2O1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG59XFxuLnNlYXJjaC1tdWx0aS1zZWxlY3QtYXJlYSAuc2VhcmNoLXJldCBzcGFuIHtcXG4gIGNvbG9yOiAjOTk5O1xcbiAgZm9udC1zaXplOiAxMnB4O1xcbn1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY3NzLWxvYWRlciEuL34vbGVzcy1sb2FkZXI/c291cmNlTWFwIS4vc3JjL2NvcmUvaW5kZXgubGVzc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKlxyXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxyXG4qL1xyXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG5cdHZhciBsaXN0ID0gW107XHJcblxyXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcclxuXHRsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XHJcblx0XHR2YXIgcmVzdWx0ID0gW107XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IHRoaXNbaV07XHJcblx0XHRcdGlmKGl0ZW1bMl0pIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGl0ZW1bMV0gKyBcIn1cIik7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goaXRlbVsxXSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiByZXN1bHQuam9pbihcIlwiKTtcclxuXHR9O1xyXG5cclxuXHQvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxyXG5cdGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcclxuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxyXG5cdFx0XHRtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XHJcblx0XHR2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGlkID0gdGhpc1tpXVswXTtcclxuXHRcdFx0aWYodHlwZW9mIGlkID09PSBcIm51bWJlclwiKVxyXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcclxuXHRcdH1cclxuXHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xyXG5cdFx0XHQvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXHJcblx0XHRcdC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXHJcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXHJcblx0XHRcdC8vICBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXHJcblx0XHRcdGlmKHR5cGVvZiBpdGVtWzBdICE9PSBcIm51bWJlclwiIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XHJcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xyXG5cdFx0XHRcdFx0aXRlbVsyXSA9IG1lZGlhUXVlcnk7XHJcblx0XHRcdFx0fSBlbHNlIGlmKG1lZGlhUXVlcnkpIHtcclxuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxuXHRyZXR1cm4gbGlzdDtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBEOTRiV3dnZG1WeWMybHZiajBpTVM0d0lpQmxibU52WkdsdVp6MGlWVlJHTFRnaUlITjBZVzVrWVd4dmJtVTlJbTV2SWo4K0NqeHpkbWNnZDJsa2RHZzlJakUwY0hnaUlHaGxhV2RvZEQwaU1UUndlQ0lnZG1sbGQwSnZlRDBpTUNBd0lERTBJREUwSWlCMlpYSnphVzl1UFNJeExqRWlJSGh0Ykc1elBTSm9kSFJ3T2k4dmQzZDNMbmN6TG05eVp5OHlNREF3TDNOMlp5SWdlRzFzYm5NNmVHeHBibXM5SW1oMGRIQTZMeTkzZDNjdWR6TXViM0puTHpFNU9Ua3ZlR3hwYm1zaVBnb2dJQ0FnUENFdExTQkhaVzVsY21GMGIzSTZJRk5yWlhSamFDQkNaWFJoSURNNUxqRWdLRE14TnpJeEtTQXRJR2gwZEhBNkx5OTNkM2N1WW05b1pXMXBZVzVqYjJScGJtY3VZMjl0TDNOclpYUmphQ0F0TFQ0S0lDQWdJRHgwYVhSc1pUNVNaV04wWVc1bmJHVWdNVE1nUTI5d2VUd3ZkR2wwYkdVK0NpQWdJQ0E4WkdWell6NURjbVZoZEdWa0lIZHBkR2dnVTJ0bGRHTm9JRUpsZEdFdVBDOWtaWE5qUGdvZ0lDQWdQR1JsWm5NK0NpQWdJQ0FnSUNBZ1BISmxZM1FnYVdROUluQmhkR2d0TVNJZ2VEMGlNQ0lnZVQwaU1DSWdkMmxrZEdnOUlqRTBJaUJvWldsbmFIUTlJakUwSWlCeWVEMGlNU0krUEM5eVpXTjBQZ29nSUNBZ0lDQWdJRHh0WVhOcklHbGtQU0p0WVhOckxUSWlJRzFoYzJ0RGIyNTBaVzUwVlc1cGRITTlJblZ6WlhKVGNHRmpaVTl1VlhObElpQnRZWE5yVlc1cGRITTlJbTlpYW1WamRFSnZkVzVrYVc1blFtOTRJaUI0UFNJd0lpQjVQU0l3SWlCM2FXUjBhRDBpTVRRaUlHaGxhV2RvZEQwaU1UUWlJR1pwYkd3OUluZG9hWFJsSWo0S0lDQWdJQ0FnSUNBZ0lDQWdQSFZ6WlNCNGJHbHVhenBvY21WbVBTSWpjR0YwYUMweElqNDhMM1Z6WlQ0S0lDQWdJQ0FnSUNBOEwyMWhjMnMrQ2lBZ0lDQThMMlJsWm5NK0NpQWdJQ0E4WnlCcFpEMGk1WVd6NXJPbzVMeUI1TGlhSWlCemRISnZhMlU5SW01dmJtVWlJSE4wY205clpTMTNhV1IwYUQwaU1TSWdabWxzYkQwaWJtOXVaU0lnWm1sc2JDMXlkV3hsUFNKbGRtVnViMlJrSWo0S0lDQWdJQ0FnSUNBOFp5QnBaRDBpTXlJZ2RISmhibk5tYjNKdFBTSjBjbUZ1YzJ4aGRHVW9MVGN5Tnk0d01EQXdNREFzSUMwek9EUXVNREF3TURBd0tTSWdjM1J5YjJ0bFBTSWpRa1JDUkVKRUlpQnpkSEp2YTJVdGQybGtkR2c5SWpJaUlHWnBiR3c5SWlOR1JrWkdSa1lpUGdvZ0lDQWdJQ0FnSUNBZ0lDQThaeUJwWkQwaVIzSnZkWEF0TVRNdFEyOXdlUzB4TUNJZ2RISmhibk5tYjNKdFBTSjBjbUZ1YzJ4aGRHVW9OVEkxTGpBd01EQXdNQ3dnTWpneExqQXdNREF3TUNraVBnb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1BHY2dhV1E5SWtkeWIzVndMVFVpSUhSeVlXNXpabTl5YlQwaWRISmhibk5zWVhSbEtETXlMakF3TURBd01Dd2dNVEF6TGpBd01EQXdNQ2tpUGdvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lEeG5JR2xrUFNKSGNtOTFjQzAzSWlCMGNtRnVjMlp2Y20wOUluUnlZVzV6YkdGMFpTZ3hOekF1TURBd01EQXdMQ0F3TGpBd01EQXdNQ2tpUGdvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0E4ZFhObElHbGtQU0pTWldOMFlXNW5iR1V0TVRNdFEyOXdlU0lnYldGemF6MGlkWEpzS0NOdFlYTnJMVElwSWlCNGJHbHVhenBvY21WbVBTSWpjR0YwYUMweElqNDhMM1Z6WlQ0S0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQThMMmMrQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0E4TDJjK0NpQWdJQ0FnSUNBZ0lDQWdJRHd2Wno0S0lDQWdJQ0FnSUNBOEwyYytDaUFnSUNBOEwyYytDand2YzNablBnPT1cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvcmUvaW1hZ2VzL2NoZWNrYm94LXVuY2hlY2tlZC5zdmdcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEQ5NGJXd2dkbVZ5YzJsdmJqMGlNUzR3SWlCbGJtTnZaR2x1WnowaVZWUkdMVGdpSUhOMFlXNWtZV3h2Ym1VOUltNXZJajgrQ2p4emRtY2dkMmxrZEdnOUlqRTBjSGdpSUdobGFXZG9kRDBpTVRSd2VDSWdkbWxsZDBKdmVEMGlNQ0F3SURFMElERTBJaUIyWlhKemFXOXVQU0l4TGpFaUlIaHRiRzV6UFNKb2RIUndPaTh2ZDNkM0xuY3pMbTl5Wnk4eU1EQXdMM04yWnlJZ2VHMXNibk02ZUd4cGJtczlJbWgwZEhBNkx5OTNkM2N1ZHpNdWIzSm5MekU1T1RrdmVHeHBibXNpUGdvZ0lDQWdQQ0V0TFNCSFpXNWxjbUYwYjNJNklGTnJaWFJqYUNCQ1pYUmhJRE01TGpFZ0tETXhOekl4S1NBdElHaDBkSEE2THk5M2QzY3VZbTlvWlcxcFlXNWpiMlJwYm1jdVkyOXRMM05yWlhSamFDQXRMVDRLSUNBZ0lEeDBhWFJzWlQ1SGNtOTFjQ0E1UEM5MGFYUnNaVDRLSUNBZ0lEeGtaWE5qUGtOeVpXRjBaV1FnZDJsMGFDQlRhMlYwWTJnZ1FtVjBZUzQ4TDJSbGMyTStDaUFnSUNBOFpHVm1jejQ4TDJSbFpuTStDaUFnSUNBOFp5QnBaRDBpNVlXejVyT281THlCNUxpYUlpQnpkSEp2YTJVOUltNXZibVVpSUhOMGNtOXJaUzEzYVdSMGFEMGlNU0lnWm1sc2JEMGlibTl1WlNJZ1ptbHNiQzF5ZFd4bFBTSmxkbVZ1YjJSa0lqNEtJQ0FnSUNBZ0lDQThaeUJwWkQwaU15SWdkSEpoYm5ObWIzSnRQU0owY21GdWMyeGhkR1VvTFRVMU55NHdNREF3TURBc0lDMHpPRFF1TURBd01EQXdLU0krQ2lBZ0lDQWdJQ0FnSUNBZ0lEeG5JR2xrUFNKSGNtOTFjQzB4TXkxRGIzQjVMVEV3SWlCMGNtRnVjMlp2Y20wOUluUnlZVzV6YkdGMFpTZzFNalV1TURBd01EQXdMQ0F5T0RFdU1EQXdNREF3S1NJK0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBOFp5QnBaRDBpUjNKdmRYQXROU0lnZEhKaGJuTm1iM0p0UFNKMGNtRnVjMnhoZEdVb016SXVNREF3TURBd0xDQXhNRE11TURBd01EQXdLU0krQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1BHY2dhV1E5SWtkeWIzVndMVFFpUGdvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0E4WnlCcFpEMGlSM0p2ZFhBdE9TSStDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0E4Y0dGMGFDQmtQU0pOTUN3eExqQXdOamcwTlRRM0lFTXdMREF1TkRVd056Z3dNRGN6SURBdU5EUTVPVFE0TnpVNExEQWdNUzR3TURZNE5EVTBOeXd3SUV3eE1pNDVPVE14TlRRMUxEQWdRekV6TGpVME9USXhPVGtzTUNBeE5Dd3dMalEwT1RrME9EYzFPQ0F4TkN3eExqQXdOamcwTlRRM0lFd3hOQ3d4TWk0NU9UTXhOVFExSUVNeE5Dd3hNeTQxTkRreU1UazVJREV6TGpVMU1EQTFNVElzTVRRZ01USXVPVGt6TVRVME5Td3hOQ0JNTVM0d01EWTRORFUwTnl3eE5DQkRNQzQwTlRBM09EQXdOek1zTVRRZ01Dd3hNeTQxTlRBd05URXlJREFzTVRJdU9Ua3pNVFUwTlNCTU1Dd3hMakF3TmpnME5UUTNJRm9pSUdsa1BTSlNaV04wWVc1bmJHVXRNVE1pSUdacGJHdzlJaU5FTVRBd01EQWlQand2Y0dGMGFENEtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRHh3YjJ4NVoyOXVJR2xrUFNKU1pXTjBZVzVuYkdVdE5DSWdabWxzYkQwaUkwWkdSa1pHUmlJZ2RISmhibk5tYjNKdFBTSjBjbUZ1YzJ4aGRHVW9OeTR5TkRJMk5ERXNJRFl1TWpReU5qUXhLU0J5YjNSaGRHVW9MVE14TlM0d01EQXdNREFwSUhSeVlXNXpiR0YwWlNndE55NHlOREkyTkRFc0lDMDJMakkwTWpZME1Ta2dJaUJ3YjJsdWRITTlJalV1TWpReU5qUXdOamtnT1M0eU5ESTJOREEyT1NBNExqSTBNalkwTURZNUlEa3VNalF5TmpRd05qa2dPQzR5TkRJMk5EQTJPU0F5TGpJME1qWTBNRFk1SURrdU1qUXlOalF3TmprZ01pNHlOREkyTkRBMk9TQTVMakkwTWpZME1EWTVJRGt1TWpReU5qUXdOamtnT1M0eU5ESTJOREEyT1NBeE1DNHlOREkyTkRBM0lEVXVNalF5TmpRd05qa2dNVEF1TWpReU5qUXdOeUkrUEM5d2IyeDVaMjl1UGdvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0E4TDJjK0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdQQzluUGdvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnUEM5blBnb2dJQ0FnSUNBZ0lDQWdJQ0E4TDJjK0NpQWdJQ0FnSUNBZ1BDOW5QZ29nSUNBZ1BDOW5QZ284TDNOMlp6ND1cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvcmUvaW1hZ2VzL2NoZWNrYm94LWNoZWNrZWQuc3ZnXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG52YXIgc3R5bGVzSW5Eb20gPSB7fSxcblx0bWVtb2l6ZSA9IGZ1bmN0aW9uKGZuKSB7XG5cdFx0dmFyIG1lbW87XG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0XHRyZXR1cm4gbWVtbztcblx0XHR9O1xuXHR9LFxuXHRpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gL21zaWUgWzYtOV1cXGIvLnRlc3Qoc2VsZi5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpO1xuXHR9KSxcblx0Z2V0SGVhZEVsZW1lbnQgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XG5cdH0pLFxuXHRzaW5nbGV0b25FbGVtZW50ID0gbnVsbCxcblx0c2luZ2xldG9uQ291bnRlciA9IDAsXG5cdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wID0gW107XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCwgb3B0aW9ucykge1xuXHRpZih0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcblx0XHRpZih0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcblx0fVxuXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXHRpZiAodHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uID09PSBcInVuZGVmaW5lZFwiKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgPGhlYWQ+LlxuXHRpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidW5kZWZpbmVkXCIpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xuXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCk7XG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XG5cdFx0fVxuXHRcdGlmKG5ld0xpc3QpIHtcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCk7XG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xuXHRcdH1cblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XG5cdFx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKylcblx0XHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXSgpO1xuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKSB7XG5cdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblx0XHRpZihkb21TdHlsZSkge1xuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xuXHRcdFx0fVxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzKGxpc3QpIHtcblx0dmFyIHN0eWxlcyA9IFtdO1xuXHR2YXIgbmV3U3R5bGVzID0ge307XG5cdGZvcih2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xuXHRcdHZhciBpZCA9IGl0ZW1bMF07XG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcblx0XHR2YXIgc291cmNlTWFwID0gaXRlbVszXTtcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pXG5cdFx0XHRzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xuXHRcdGVsc2Vcblx0XHRcdG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcblx0fVxuXHRyZXR1cm4gc3R5bGVzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGVFbGVtZW50KSB7XG5cdHZhciBoZWFkID0gZ2V0SGVhZEVsZW1lbnQoKTtcblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3Bbc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AubGVuZ3RoIC0gMV07XG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XG5cdFx0aWYoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XG5cdFx0XHRoZWFkLmluc2VydEJlZm9yZShzdHlsZUVsZW1lbnQsIGhlYWQuZmlyc3RDaGlsZCk7XG5cdFx0fSBlbHNlIGlmKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XG5cdFx0XHRoZWFkLmluc2VydEJlZm9yZShzdHlsZUVsZW1lbnQsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xuXHRcdH1cblx0XHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlRWxlbWVudCk7XG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xuXHRcdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgJ2luc2VydEF0Jy4gTXVzdCBiZSAndG9wJyBvciAnYm90dG9tJy5cIik7XG5cdH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuXHRzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xuXHR2YXIgaWR4ID0gc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZUVsZW1lbnQpO1xuXHRpZihpZHggPj0gMCkge1xuXHRcdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLnNwbGljZShpZHgsIDEpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSB7XG5cdHZhciBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG5cdHN0eWxlRWxlbWVudC50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGVFbGVtZW50KTtcblx0cmV0dXJuIHN0eWxlRWxlbWVudDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucykge1xuXHR2YXIgbGlua0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblx0bGlua0VsZW1lbnQucmVsID0gXCJzdHlsZXNoZWV0XCI7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rRWxlbWVudCk7XG5cdHJldHVybiBsaW5rRWxlbWVudDtcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUob2JqLCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZUVsZW1lbnQsIHVwZGF0ZSwgcmVtb3ZlO1xuXG5cdGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xuXHRcdHN0eWxlRWxlbWVudCA9IHNpbmdsZXRvbkVsZW1lbnQgfHwgKHNpbmdsZXRvbkVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIGZhbHNlKTtcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCB0cnVlKTtcblx0fSBlbHNlIGlmKG9iai5zb3VyY2VNYXAgJiZcblx0XHR0eXBlb2YgVVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0c3R5bGVFbGVtZW50ID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcblx0XHRcdGlmKHN0eWxlRWxlbWVudC5ocmVmKVxuXHRcdFx0XHRVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlRWxlbWVudC5ocmVmKTtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdHN0eWxlRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbigpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuXHRcdH07XG5cdH1cblxuXHR1cGRhdGUob2JqKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUobmV3T2JqKSB7XG5cdFx0aWYobmV3T2JqKSB7XG5cdFx0XHRpZihuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXApXG5cdFx0XHRcdHJldHVybjtcblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZW1vdmUoKTtcblx0XHR9XG5cdH07XG59XG5cbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcblx0fTtcbn0pKCk7XG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcoc3R5bGVFbGVtZW50LCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xuXG5cdGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZUVsZW1lbnQuY2hpbGROb2Rlcztcblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG5cdFx0XHRzdHlsZUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGNzc05vZGUpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnKHN0eWxlRWxlbWVudCwgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XG5cblx0aWYobWVkaWEpIHtcblx0XHRzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXG5cdH1cblxuXHRpZihzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG5cdH0gZWxzZSB7XG5cdFx0d2hpbGUoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcblx0XHRcdHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG5cdFx0fVxuXHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVMaW5rKGxpbmtFbGVtZW50LCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG5cdGlmKHNvdXJjZU1hcCkge1xuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xuXHR9XG5cblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XG5cblx0dmFyIG9sZFNyYyA9IGxpbmtFbGVtZW50LmhyZWY7XG5cblx0bGlua0VsZW1lbnQuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cblx0aWYob2xkU3JjKVxuXHRcdFVSTC5yZXZva2VPYmplY3RVUkwob2xkU3JjKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQ3JlYXRlZCBieSBKYW10ZXIgb24gMTcvNC8xNC5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobW9kKSB7XG4gICAgLyoqXG4gICAgICogQGRlc2Mg55So5LqO5Yik5pat5LiA5Liq5a+56LGh5piv5ZCm5piv56m65a+56LGhe30sIOaYr+WImei/lOWbnnRydWVcbiAgICAgKlxuICAgICAqICovXG4gICAgbW9kLmZpbHRlcignaXNFbXB0eU9iamVjdCcsIFtmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBiYXI7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICBmb3IgKGJhciBpbiBvYmopIHtcbiAgICAgICAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGJhcikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgIH1dKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvcmUvZmlsdGVyLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gXCI8IS0tPGRpdiBuZy1jbGljaz1cXFwidGVzdCgpXFxcIj50ZXN0PC9kaXY+LS0+XFxuPGRpdiBjbGFzcz1cXFwic2VsZWN0aW9uICBzZWFyY2gtbXVsdGktc2VsZWN0LWFyZWFcXFwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiaW5wdXQtYm94IGNsZWFyZml4IGZvcm0tY29udHJvbFxcXCIgbmctY2xhc3M9XFxcInsnaGFzLXNlbGVjdGVkLXR5cGUnOnNlbGVjdE9wdGlvbnNDb25maWcuc2VsZWN0ZWRPcHRpb25zQXJyLmxlbmd0aCAhPSAwfVxcXCI+XFxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcInR5cGUtbmFtZS1ib3ggXFxcIiBuZy1yZXBlYXQ9XFxcInR5cGVJdGVtIGluIHNlbGVjdE9wdGlvbnNDb25maWcuc2VsZWN0ZWRPcHRpb25zQXJyXFxcIiAgbmctY2xpY2s9XFxcImRlbFNlbGVjdGVkT3B0aW9uKHR5cGVJdGVtKTskZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcXFwiIG5nLXN0eWxlPVxcXCJ7d2lkdGg6IHNlbGVjdE9wdGlvbnNDb25maWcucGVyV2lkdGggKyAncHgnLCBtYXJnaW5SaWdodDogaXNMaW5lTGFzdFNlbGVjdE9wdGlvbigkaW5kZXgpPyAoc2VsZWN0T3B0aW9uc0NvbmZpZy5oR2FwICsgJ3B4Jyk6ICcwcHgnfVxcXCI+PHNwYW4gY2xhc3M9XFxcInR5cGUtbmFtZS10ZXh0IHRleHQtZWxsaXBzaXNcXFwiIHRpdGxlPVxcXCJ7ezo6dHlwZUl0ZW0ubmFtZX19XFxcIj57ezo6dHlwZUl0ZW0ubmFtZX19PC9zcGFuPjxzcGFuIGNsYXNzPVxcXCJjbG9zZS1idG5cXFwiPng8L3NwYW4+PC9zcGFuPlxcbiAgICAgICAgICAgIDxpbnB1dCBpZD1cXFwic2VhcmNoSW5wdXRcXFwiIG5nLWNsYXNzPVxcXCJzZWxlY3RPcHRpb25zQ29uZmlnLnNlbGVjdGVkT3B0aW9uc0Fyci5sZW5ndGggPT09IDA/J2Zvcm0tY29udHJvbCBjb3Zlci1mYXRoZXInOidyZXNldC1mb3JtLWNvbnRyb2wnXFxcIiBuZy1zdHlsZT1cXFwie3dpZHRoOiBjdXJyTGluZUhhc05vU2VsZWN0T3B0aW9ucygkaW5kZXgpPycxMDAlJzpzZWxlY3RPcHRpb25zQ29uZmlnLmlucHV0V2lkdGggKyAncHgnfVxcXCIgcGxhY2Vob2xkZXI9XFxcInt7c2VsZWN0T3B0aW9uc0NvbmZpZy5zZWxlY3RlZE9wdGlvbnNBcnIubGVuZ3RoID09PSAwPyBzZWxlY3RPcHRpb25zQ29uZmlnLnBsYWNlaG9sZGVyOiAnJ319XFxcIiBuZy1tb2RlbD1cXFwidmlld1NldHRpbmdzLnNlYXJjaE9wdGlvbk5hbWVcXFwiIG5nLWZvY3VzPVxcXCJ2aWV3U2V0dGluZ3Muc2hvd01lbnUgPSB0cnVlXFxcIiBuZy1jaGFuZ2U9XFxcInNlYXJjaE9wdGlvbnModmlld1NldHRpbmdzLnNlYXJjaE9wdGlvbk5hbWUpXFxcIi8+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDx1bCBjbGFzcz1cXFwidHlwZS1zZWxlY3QtcGFuZWxcXFwiIG5nLXNob3c9XFxcInZpZXdTZXR0aW5ncy5zaG93TWVudSAmJiB2aWV3U2V0dGluZ3Muc2VhcmNoT3B0aW9uTmFtZSA9PT0gJydcXFwiPlxcbiAgICAgICAgICAgIDxsaSBjbGFzcz1cXFwic2VsZWN0LWJsb2NrXFxcIiBuZy1yZXBlYXQ9XFxcInYgaW4gc2VsZWN0T3B0aW9uc0NvbmZpZy50cmVlXFxcIj5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY21iLWNoZWNrYm94XFxcIiBuZy1jbGFzcz1cXFwieydmYSByZXNldC1mYSc6ICh2Lm5vZGVUeXBlID09PSAnZGlyJyksICdmYS1hbmdsZS11cCc6IHNob3dMaXN0ICYmIHYubm9kZVR5cGUgPT09ICdkaXInLCAnZmEtYW5nbGUtZG93bic6ICFzaG93TGlzdCAmJiB2Lm5vZGVUeXBlID09PSAnZGlyJ31cXFwiIG5nLWNsaWNrPVxcXCJzaG93TGlzdCA9ICAhc2hvd0xpc3Q7XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cXFwie3t2Lm5hbWV9fVxcXCIgdHlwZT1cXFwiY2hlY2tib3hcXFwiIG5nLW1vZGVsPVxcXCJ2LmlzQ2hlY2tlZFxcXCIgbmctY2hhbmdlPVxcXCJ1cGRhdGVDb25maWdPYmoodilcXFwiIG5nLWNsaWNrPVxcXCIkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIG5nLWJpbmQ9XFxcInYubmFtZVxcXCIgPjwvbGFiZWw+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XFxcImxlYWYtbm9kZS1saXN0XFxcIiBuZy1zaG93PVxcXCJzaG93TGlzdFxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XFxcImNtYi1jaGVja2JveCBsZWFmLWNtYi1jaGVja2JveCBjbGVhcmZpeFxcXCIgIG5nLXJlcGVhdD1cXFwiaXRlbSBpbiB2LnN1YlxcXCIgPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCAgdHlwZT1cXFwiY2hlY2tib3hcXFwiIG5nLW1vZGVsPVxcXCJpdGVtLmlzQ2hlY2tlZFxcXCIgbmctY2hhbmdlPVxcXCJ1cGRhdGVDb25maWdPYmooaXRlbSlcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCAgbmctYmluZD1cXFwiaXRlbS5uYW1lXFxcIiA+PC9sYWJlbD5cXG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XFxuICAgICAgICAgICAgICAgIDwvdWw+XFxuICAgICAgICAgICAgPC9saT5cXG4gICAgICAgIDwvdWw+XFxuICAgICAgICA8dWwgY2xhc3M9XFxcInR5cGUtc2VsZWN0LXBhbmVsXFxcIiBuZy1zaG93PVxcXCJ2aWV3U2V0dGluZ3Muc2hvd01lbnUgJiYodmlld1NldHRpbmdzLnNlYXJjaE9wdGlvbk5hbWUgIT0gJycpICYmICh0cmVlX3NlYXJjaF9yZXN1bHQubGVuZ3RoICE9PSAwKVxcXCI+XFxuICAgICAgICAgICAgPGxpIGNsYXNzPVxcXCJzZWxlY3QtYmxvY2tcXFwiIG5nLXJlcGVhdD1cXFwiaXRlbSBpbiB0cmVlX3NlYXJjaF9yZXN1bHRcXFwiID5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY21iLWNoZWNrYm94XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgIHR5cGU9XFxcImNoZWNrYm94XFxcIiBuZy1tb2RlbD1cXFwiaXRlbS5pc0NoZWNrZWRcXFwiIG5nLWNoYW5nZT1cXFwidXBkYXRlQ29uZmlnT2JqKGl0ZW0pXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgIG5nLWJpbmQ9XFxcIml0ZW0ubmFtZVxcXCIgPjwvbGFiZWw+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDwvbGk+XFxuICAgICAgICA8L3VsPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwibm8tZGF0YS10aXBzXFxcIiBuZy1zaG93PVxcXCJ2aWV3U2V0dGluZ3Muc2hvd01lbnUgJiZ2aWV3U2V0dGluZ3Muc2VhcmNoT3B0aW9uTmFtZSAhPSAnJyYmICh0cmVlX3NlYXJjaF9yZXN1bHQubGVuZ3RoID09PSAwKVxcXCI+IOaXoOWMuemFjeaVsOaNrjwvZGl2PlxcbjwvZGl2PlxcblwiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvcmUvaW5kZXguaHRtbFxuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==