var EventUtil = {
	//添加事件处理程序
	addHandler: function(element, type, handler){
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		}else if(element.attachEvent){
			element.attachEvent('on'+type, handler);
		}else{
			element['on' + type] = handler;
		}
	},
	//跨浏览器获取event对象
	getEvent: function(event){
		return event ? event : window.event;
	},
	//获取事件目标
	getTarget: function(event){
		return event.target || event.srcElement;
	},
	//取消事件的默认行为
	preventDefault: function(event){
		if (event.preventDefault) {
			event.preventDefault(); //dom
		} else{
			event.returnValue = false;  //ie
		};
	},
	//删除事件处理程序
	removeHandler: function(element, type, handler){
		if( element.removeEventListener ){
			element.removeEventListener(type, handler, false);
		} else if(elment.detachEvent){
			element.detachEvent('on' +type, handler);			
		}else{
			element['on'+type] = null;
		}
	},
	//阻止事件冒泡
	stopPropagation: function(event){
		if (event.stopPropagation) {
			event.stopPropagation();
		} else{
			event.cancelBubble = true;
		}
	},
	//获取相关元素信息--IE8之前不支持getRelatedTarget属性
	getRelatedTarget:function(event){
		if (event.getRelatedTarget) {
			return event.getRelatedTarget;//只对mouseover和mouseout事件才包含值
		} else if(event.toElement){ 
			return event.toElement;//mouseout事件触发时IE的toElement属性中保存着相关元素
		}else if(event.fromElement){
			return event.fromElement;//mouseover事件触发时，IE的fromElement属性保存了相关元素
		}else{
			return null; //对于其它事件，这个属性的值是null
		}
	},
	//获取鼠标按钮
	//DOM的button属性 0：主鼠标按钮 1：中间的鼠标按钮（滚轮） 2：次鼠标按钮
	getButton: function(event){
		if (document.implementation.hasFeature("MouseEvents","2.0")) {
			return event.button; //dom
		} else{
			switch(event.button){
				case 0:
				case 1:
				case 3:
				case 5:
				case 7:
					return 0;
				case 2:
				case 6:
					return 2;
				case 4:
					return 1;
			}
		}
	}
}