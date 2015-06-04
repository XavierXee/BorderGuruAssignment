(function(){

	var menuEntries = {
		companyName : 'view orders from a company ',
		customerAdress : 'view orders to a customer adress ',
		orderId : 'view particular order ',
	} ;

	var resultEntries = {
		companyName : 'Orders from ',
		customerAdress : 'Orders to ',
		orderId : 'Order : ',
	} ;

	var routesEntries = {
		companyName : {
			'getlist' : '/companylist',
			'getOrders' : '/bycompany',
		},
		customerAdress : {
			'getlist' : '/customeradresslist',
			'getOrders' : '/bycustomeradress',
		},
		orderId : {
			'getlist' : '/orders',
			'getOrders' : '/order',
		}
	} ;

	var app = angular.module('OrdersViewer', [])
		.service('dbReq', function() {
            var req = {};
            req.getOrders = function(property, value) {
    			if(property && value && value != "" && value !== null){
	            	$.get(routesEntries[property].getOrders+'?'+property+'='+value, 
	            		function(orders){
		            		angular.element($('#orders')).scope().orders.showOrders(orders, property, value) ;
		            		if(property == "orderId"){
	            				angular.element($('#order')).scope().order.setOrder(orders) ;
	            			}
		            	}) ;

	            	if(property == "orderId"){
	            		angular.element($('#order')).scope().order.enableDelete() ;
	            	} else {
	            		angular.element($('#order')).scope().order.disableDelete() ;
	            	}
    			}
            } ;
            req.loadOrderedItemsList = function() {
            	$.get('/ordereditems', 
        			function(itemsList){
        				var noEmpty = [] ;
        				_.each(itemsList, function(item){
        					if(item.name != ''){
        						noEmpty.push(item) ;
        					}
        				}) ;
        				var sorted = _.sortBy(noEmpty, 'count');
            			angular.element($('#iconsMenu')).scope().subm.showItemsList(sorted.reverse()) ;
            		}) ;
            } ;
            req.loadSample = function(){
            	$.post('/loadsample', function(reponse){
    				angular.element($('#iconsMenu')).scope().subm.updateReqReturn(reponse) ;
            	}) ;
            } ;
            req.removeOrder = function(property, value) {
            	$.post('/orders?'+property+'='+value, function(response){
    				angular.element($('#order')).scope().order.clearOrder(response) ;
    				angular.element($('#orders')).scope().orders.clearOrders(response) ;
    				angular.element($('#main')).scope().main.update("orderId", "") ;
            	}) ;
            } ;
            return req;
        })
		.service('menu', function() {
            var menu = {};
            menu.build = function(paramName, paramValue) {
            	angular.element($('#order')).scope().order.disableDelete() ;
            	angular.element($('#main')).scope().main.update(paramName, paramValue)
            	angular.element($('#orders')).scope().orders.hideOrders()
            } ;
            menu.valuesOptions = function(paramName, paramValue) {
            	$.get(routesEntries[paramName].getlist, function(valueList){
            		angular.element($('#paramValue')).scope().paramValue.changeValueList(paramName, valueList)
            	}) ;
            } ;
            menu.updateParamNameTitle = function(paramName) {
				angular.element($('#paramName')).scope().paramName.changeTitle(paramName)
            } ;
            menu.updateParamValueTitle = function(paramValue) {
				angular.element($('#paramValue')).scope().paramValue.changeTitle(paramValue)
            } ;
            menu.viewOrder = function(order) {
				angular.element($('#order')).scope().order.show(order)
            } ;
            menu.hideOrder = function() {
				angular.element($('#order')).scope().order.hide()
            } ;
            return menu;
        })
		.controller('MainController', 
			[
				'$scope', 
				'$element', 
				'dbReq', 
				'menu',
					function($scope, $element, dbReq, menu) {
						var self = this ; 
						self.paramName = "" ; 
						self.paramValue = "" ;
						this.go = function() { 
							dbReq.getOrders(self.paramName, self.paramValue) ; 
						} ;
						this.update = function(paramName, paramValue) { 
							self.paramName = paramName ;
							self.paramValue = paramValue ;
							menu.valuesOptions(paramName) ;
						} ;
						this.getParamName = function(){
							return self.paramName ;
						} ;
					}
			]
		) 
		.controller('OrdersReqParamName', 
			[
				'$scope', 
				'$element', 
				'menu', 
				function($scope, $element, menu) {
					var self = this ;
					this.titleText = "" ;
					this.buildParamName = function(paramName) {
						menu.build(paramName, "") ;
					} ;
					this.changeTitle = function(paramName) {
						self.titleText = menuEntries[paramName] ;
						$scope.$apply() ;
					} ;
				}
			]
		) 
		.controller('OrdersReqParamValue', 
			[
				'$scope', 
				'$element', 
				'menu', 
				function($scope, $element, menu) {
					var self = this ;
					self.titleText = ""
					self.valueList = [] ;
					this.buildParamValue = function(paramValue) {
						setTimeout(function(){ 
							self.titleText = paramValue.name + " " ;
							$scope.$apply() ;
						}, 200);
						var paramName = angular.element($('#main')).scope().main.getParamName()
						menu.build(paramName, paramValue.name)
						menu.updateParamValueTitle(paramValue.name) ;
					} ;
					this.changeValueList = function(paramName, valueList) {
						self.titleText = ""
						self.valueList = valueList ;
						$scope.$apply() ;
						menu.updateParamNameTitle(paramName) ;
					} ;
					this.changeTitle = function(paramValueName) {
						self.titleText = menuEntries[paramValueName] ;
					} ;
					this.clearValueList = function() {
						self.valueList = [] ;
					} ;
					this.deleteOrderCallback = function() {
						self.titleText = "" ;
					} ;
				}
			]
		) 
		.controller('OrdersController',
			[
				'$scope', 
				'dbReq', 
				'menu', 
				function($scope, dbReq, menu) {
					var self = this ;
					this.titleText = ""
					this.ordersList = [] ;
					this.showOrders = function(orders, property, value){
						self.ordersList = orders
						self.titleText = resultEntries[property]+value
						$scope.$apply() ;
					}
					this.hideOrders = function(){
						self.ordersList = [] ;
						self.titleText = "" ;
					}
					this.viewOrder = function(order){
						menu.viewOrder(order)
					}
					this.hideOrder = function(){
						menu.hideOrder()
					}
					this.clearOrders = function(response){
						self.titleText = response ;
						self.ordersList = [] ;
						setTimeout(function(){
							self.titleText = "" ;
							$scope.$apply() ;
						}, 3000)
					}
				}
			]
		) 
		.controller('OrderController',
			[
				'$scope', 
				'dbReq', 
				'menu',
				function($scope, dbReq, menu) {
					var self = this ;
					this.titleText = ""
					this.order = {} ;
					this.orderCopy = {} ;
					this.deleteOrder = false ;
					this.show = function(order){
						setTimeout(function(){
							self.order = order ;
							$scope.$apply() ;
						}, 100)
					}
					this.hide = function(){
						self.order = {} ;
					}
					this.enableDelete = function(){
						self.deleteOrder = true ;
					}
					this.disableDelete = function(){
						self.deleteOrder = false ;
					}
					this.triggerDeleteOrder = function(){
						dbReq.removeOrder("orderId", self.orderCopy[0].orderId) ;
					}
					this.clearOrder = function(res){
						self.order = {} ;
						self.disableDelete() ;
						setTimeout(function(){
							$scope.$apply() ;
						}, 200) ;
					}
					this.setOrder = function(orders){
						self.orderCopy = orders
					}
				}
			]
		) 
		.controller('subMenu',
			[
				'$scope', 
				'dbReq', 
				function($scope, dbReq) {
					var self = this ;
					this.itemsList = [] ;
					this.databaseForm = {} ;
					this.reqReturn = "- - -" ;
					this.showOrderedItemList = false ;
					this.showDatabaseForm = false ;
					this.loadItemsList = function(){
						if(self.showOrderedItemList == true){
							self.showOrderedItemList = false
						} else {
							dbReq.loadOrderedItemsList() ;
						}
					}
					this.loadDataBaseForm = function(){
						if(self.showDatabaseForm == true){
							self.showDatabaseForm = false
						} else {
							self.showDatabaseForm = true ;
							self.showOrderedItemList = false ;
							self.databaseForm = {
								orderId : "orderId",
								companyName : "companyName",
								customerAdress : "customerAdress",
								orderedItem : "orderedItem",
							} ;
						}
						setTimeout(function(){
							$scope.$apply()
						}, 200) ;
					}
					this.showItemsList = function(itemsList){
						self.showDatabaseForm = false ;
						self.showOrderedItemList = true ;
						self.itemsList = itemsList ;
						$scope.$apply()
					}
					this.enableDelete = function(){
						self.deleteOrder = true ;
					}
					this.disableDelete = function(){
						self.deleteOrder = false ;
					}
					this.loadSampleData = function(){
						dbReq.loadSample()
					}
					this.updateReqReturn = function(res){
						self.reqReturn = res ;
						$scope.$apply()
						setTimeout(function(){
							self.reqReturn = "- - -" ;
							$scope.$apply()
						}, 3000)
					}
				}
			]
		) 

})();
