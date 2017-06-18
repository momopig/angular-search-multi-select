## Install
npm install --save angular-search-multi-select
## Usage
### case 1: used as a lib (in html)
#### index.html

	<html ng-app="demo">
		<body>
		<div class="main" ng-controller="DemoController">
    		<search-multi-select select-options-config="selectOptionsConfig" ></search-multi-select>
		</div>
		<script type="text/javascript" src="js/angular-search-multi-select.js"><script>
		<script type="text/javascript" src="demo.js"></script>
	</body>
	</html>
#### demo.js
<pre>
    var demo = angular.module('searchMultiSelectDemo', ['searchMultiSelect']);
    demo.controller("DemoController", ['$scope', function ($scope) {
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
                {name: "生活3"}
            ]
        };
    }]);

</pre>
### case 2: used as a node module (in webpack entry.js)
<pre>
	require('angular');
	require('angular-search-multi-select');
	var demo = angular.module('searchMultiSelectDemo', ['searchMultiSelect']);
	module.exports = demo;
</pre>
## method
### getValsByKey(key)
指令会为配置对象增加一个getValsByKey(key)方法，用于获取被选中options的key属性的value，最后以一个数组返回，方法定义如下：
<pre>
    /**
     *  @desc 获取被选中options的key属性的value
     *  @param key { String } 属性名，默认值为'name'
     *  @return { Array } 返回一个数组，item为被选中options的key属性的value
     * */
    $scope.selectOptionsConfig.getValsByKey = function (key) {
		......
	}
</pre>
