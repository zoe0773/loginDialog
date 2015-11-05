//获取多个class为同一值的元素
function getByClass(clsName, parent) {
	//获取父元素对象 如果传入parent这个父元素对象，让parent参数作为父元素的id传进来
	var oParent = parent ? document.getElementById(parent) : document,
		eles;
	var elements = oParent.getElementsByTagName('*'); //获取所有class值相同的元素	eles = [];
	eles = [];
	for (var i = 0; i < elements.length; i++) { //遍历数组
		if (elements[i].className == clsName) { //判断数组元素的class值是否与传入的class值相同
			eles.push(elements[i]); //将class值相同的元素放到eles数组里
		}
	}
	return eles; //返回一个class值相同的元素的数组
}

window.onload = drag;

function drag() {
	//获取class值为"log_i"，且其父元素的id为"logindialog"的元素。
	var oTitle = getByClass("log_i", "logindialog")[0],
		oClose = document.getElementById("close"),
		loginState = document.getElementById("loginState"), //获取在线状态的元素对象
		stateList = document.getElementById("log_state"), //获取状态列表
		lis = stateList.getElementsByTagName("li"), //获取全部的li元素对象
		stateText = document.getElementById("stateText"), //获取状态文本元素对象
		stateshow = document.getElementById("gr");
	//添加mousedown事件处理程--拖拽
	EventUtil.addHandler(oTitle, "mousedown", fnDown);
	//关闭登陆面板
	oClose.onclick = function() {
		document.getElementById("logindialog").style.display = 'none';
	};
	//切换状态
	loginState.onclick = function(event) {
		event = EventUtil.getEvent(event);
		EventUtil.stopPropagation(event);
		stateList.style.display = "block"; //显示状态列表
	};
	//鼠标滑过状态列表的时
	for (var i = 0; i < lis.length; i++) {
		lis[i].onmouseover = function() {
			this.style.backgroundColor = "#567";
		};
		lis[i].onmouseout = function() {
			this.style.backgroundColor = "#fff";
		};
		//选中某个li元素，在线选择状态的内容和icon 变成 选中的li的icon和内容
		lis[i].onclick = function(event) {
			var id = this.id;
			event = EventUtil.getEvent(event);
			EventUtil.stopPropagation(event);
			stateList.style.display = "none"; //隐藏列表
			stateText.innerHTML = getByClass("h4txt", id)[0].innerHTML;
			stateshow.className = "";
			stateshow.className = "state_show " + id;
		};
	}
	document.onclick = function() {
		stateList.style.display = "none"; //在空白处单击鼠标时列表隐藏
	};
}

//mousedown的事件处理程序函数
function fnDown(event) {
	event = EventUtil.getEvent(event); //获取event事件对象
	var oDrag = document.getElementById("logindialog"), //获取面板元素对象
		disX = event.clientX - oDrag.offsetLeft, //获取光标按下时，光标位置到面板左侧的水平距离
		disY = event.clientY - oDrag.offsetTop; //获取光标按下时，光标位置和面板顶端的垂直距离
	//鼠标移动时
	document.onmousemove = function(event) {
		event = EventUtil.getEvent(event);
		fnMove(event, disX, disY);
	};
	//鼠标释放时
	document.onmouseup = function(event) {
		document.onmousemove = null;
		document.onmouseup = null;
	};
}
//实现鼠标跟随
function fnMove(event, posX, posY) {
	var oDrag = document.getElementById("logindialog");
		l = event.clientX - posX, //面板距离视口左侧的水平距离
		t = event.clientY - posY, //面板距离视口顶端的垂直距离
		winW = document.documentElement.clientWidth || document.body.clientWidth, //窗口的宽度
		winH = document.documentElement.clientHeight || document.body.clientHeight, //窗口的高度
		maxH = winH - oDrag.offsetHeight, //面板可移动的最大高度
		maxW = winW - oDrag.offsetWidth - 10; //面板可移动的最大宽度
	//防止溢出视口
	if (l < 0) {
		l = 0; //左
	} else if (l > maxW) { //大于maxW时面板超出浏览器视口
		l = maxW; //右 
	}
	if (t < 0) {
		t = 10; //上 关闭按钮溢出10px;
	} else if (t > maxH) {
		t = maxH; //下
	}

	oDrag.style.left = l + "px"; //面板距离视口左侧的距离
	oDrag.style.top = t + "px"; //面板距离视口顶端的距离
}