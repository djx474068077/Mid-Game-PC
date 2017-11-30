var jsonkey = {
	"left" : {
		"pwidth" : "-265px",
		"pheight" : "-13px"
	},
	"up" : {
		"pwidth" : "-381px",
		"pheight" : "-13px"
	},
	"right" : {
		"pwidth" : "-439px",
		"pheight" : "-13px"
	},
	"down" : {
		"pwidth" : "-323px",
		"pheight" : "-13px"
	},
	"left-on" : {
		"pwidth" : "-265px",
		"pheight" : "-87px"
	},
	"up-on" : {
		"pwidth" : "-381px",
		"pheight" : "-87px"
	},
	"right-on" : {
		"pwidth" : "-439px",
		"pheight" : "-87px"
	},
	"down-on" : {
		"pwidth" : "-323px",
		"pheight" : "-87px"
	}
}
//构造函数
function Direction(i){
	this.dom = null;
	if(i===0){
		this.posiwidth = jsonkey["left"]["pwidth"];
		this.posiheight = jsonkey["left"]["pheight"];
		this.classname = "btn-left";
	}else if(i===1){
		this.posiwidth = jsonkey["right"]["pwidth"];
		this.posiheight = jsonkey["right"]["pheight"];
		this.classname = "btn-right";
	}else if(i===2){
		this.posiwidth = jsonkey["up"]["pwidth"];
		this.posiheight = jsonkey["up"]["pheight"];
		this.classname = "btn-up";
	}else if(i===3){
		this.posiwidth = jsonkey["down"]["pwidth"];
		this.posiheight = jsonkey["down"]["pheight"];
		this.classname = "btn-down";
	}
}
//原型方法，左右分开
Direction.prototype.leftInit = function(){
	this.dom = document.createElement("li");
	this.dom.className = this.classname;
	document.getElementById('box-left').appendChild(this.dom);
}
Direction.prototype.rightInit = function(){
	this.dom = document.createElement("li");
	this.dom.className = this.classname;
	document.getElementById('box-right').appendChild(this.dom);
}


//1.初始化一个二维数组[[],[],[],[]],放入随机数1234
//2、搭建一个方向按键类，init创建，bingo成功



var allkey = [];		//随机二维数组，存放key数据
var oBoxLeft;			//左边的key的box
var oBoxRight;			//右边的key的box
var oBingLeft;			//左边的月饼数组
var oBingRight;			//右边的月饼数组
var stepLeft = 0;		//左边的人做到第几轮
var stepRight = 0;		//右边的人做到第几轮
var smallstepLeft = 0;		//左边的人做到每轮的第几步
var smallstepRight = 0;		//右边的人做到每轮的第几步

//获取页面音效，加以控制
var oMediaBg;
var oMediaBingo; 
var oMediaWin;
var isAudioON = 1;		//声音信号量

window.onload = function(){
	//页面加载完成，获取页面元素
	oMediaBg = document.getElementById("audio-bg");
	oMediaBingo = document.getElementById("audio-bingo");
	oMediaWin = document.getElementById('audio-win');
	
	//获取左右两边的ul
	oBoxLeft = document.getElementById("box-left");
	oBoxRight = document.getElementById('box-right');
	
	//获取左右两边的月饼数组
	oBingLeft = document.querySelectorAll(".yuebing-left .yuebing");
	oBingRight = document.querySelectorAll(".yuebing-right .yuebing");
	
	//给allkey随机赋值
	for(var i=0;i<7;i++){
		var partkey = [];
		for(var j=0;j<7;j++){
			partkey.push(parseInt(Math.random()*4));
		}
		allkey.push(partkey);
	}
	var startBtn = document.getElementsByClassName('trigger')[0];
	startBtn.addEventListener("click",start);
	
	//下一个游戏事件
	document.getElementById('next-btn').onclick = function(){
		location.href = "national.html";
	}
	//返回首页事件
	document.getElementById('back-btn').onclick = function(){
		location.href = "index.html";
	}
	//声音按键事件
	document.getElementById('audio-btn').onclick = function(){
	if(isAudioON === 1){
		isAudioON = 0;
		oMediaBg.pause();
		oMediaBingo.pause();
		oMediaWin.pause();
		this.src = "img/audio-off.png";
	}else{
		isAudioON = 1;
		oMediaBg.play();
		this.src = "img/audio-on.png";
	}
}

};

//开始游戏
function start(){
	
	oMediaBg.play();
	document.getElementById('back-white').style.display = "none";

	appendKeyLeft(stepLeft);
	appendKeyRight(stepRight);

	smallstepLeft = 0;
	smallstepRight = 0;
	document.onkeydown = function(e){
		e = e || window.e;
		if (e && e.preventDefault) {//如果是FF下执行这个  
	       e.preventDefault();  
	   }else{  
	       window.event.returnValue = false;//如果是IE下执行这个  
	   }  
		switch(e.keyCode){
			//A键
			case 65:
				isLeftBingo(0);
				break;
			//D键
			case 68:
				isLeftBingo(1);
				break;
			//W键
			case 87:
				isLeftBingo(2);
				break;
			//S键
			case 83:
				isLeftBingo(3);
				break;
			//←键
			case 37:
				isRightBingo(0);
				break;
			//→键
			case 39:
				isRightBingo(1);
				break;
			//↑键
			case 38:
				isRightBingo(2);
				break;
			//↓键
			case 40:
				isRightBingo(3);
				break;
			
		}
	}
	
}

//更新左边数据
function appendKeyLeft(n){
	oBoxLeft.innerHTML = "";
	$("#box-left").css("width","10px");
	for(var i = 0;i < 7;i++){
		var key = allkey[n][i];
		var btn = new Direction(key);
		btn.leftInit();
	}
	$('#box-left').animate({
		"width" : "505px",
	},400,"linear");
}
//更右边数据
function appendKeyRight(n){
	oBoxRight.innerHTML = "";
	$("#box-right").css("width","10px");
	for(var j = 0;j < 7;j++){
		var key = allkey[n][j];
		var btn = new Direction(key);
		btn.rightInit();
	}
	$('#box-right').animate({
		"width" : "505px",
	},400,"linear");
}

//判断是否成功
function isLeftBingo(k){
	//获取左右两边的ul
	oBoxLeft = document.getElementById("box-left");
//	oBoxRight = document.getElementById('box-right').childNodes;
	if(k === allkey[stepLeft][smallstepLeft]){
		if(k===0){
			oBoxLeft.childNodes[smallstepLeft].className = "btn-left-on";
		}else if(k===1){
			oBoxLeft.childNodes[smallstepLeft].className = "btn-right-on";
		}else if(k===2){
			oBoxLeft.childNodes[smallstepLeft].className = "btn-up-on";
		}else if(k===3){
			oBoxLeft.childNodes[smallstepLeft].className = "btn-down-on";
		}
	}else{
		smallstepLeft = -1;
		appendKeyLeft(stepLeft);
	}
	smallstepLeft ++ ;
	//一轮结束，stepRight+1，smallstepRight置0，吃月饼，充值append方法
	if(smallstepLeft >= 7){
		stepLeft ++;
		smallstepLeft = 0;
		
		//调用bingo音效
		if(isAudioON===1){			
			oMediaBingo.play();
		}
		//调用扔月饼方法
		yuePushLeft();
		//调用小人欢呼方法
		hooooLeft();
		
		//游戏结束
		if(stepLeft >= 7){
			winner(1);
			//调用胜利音效
			if(isAudioON===1){				
				oMediaWin.play();
			}
		}
		
		//刷新下一轮按键
		appendKeyLeft(stepLeft);
	}
	
}
function isRightBingo(k){
	//获取左右两边的ul
	oBoxRight = document.getElementById("box-right");
//	oBoxRight = document.getElementById('box-right').childNodes;
	if(k === allkey[stepRight][smallstepRight]){
		if(k===0){
			oBoxRight.childNodes[smallstepRight].className = "btn-left-on";
		}else if(k===1){
			oBoxRight.childNodes[smallstepRight].className = "btn-right-on";
		}else if(k===2){
			oBoxRight.childNodes[smallstepRight].className = "btn-up-on";
		}else if(k===3){
			oBoxRight.childNodes[smallstepRight].className = "btn-down-on";
		}
	}else{
		smallstepRight = -1;
		appendKeyRight(stepRight);
	}
	smallstepRight ++ ;
	//一轮结束，stepRight+1，smallstepRight置0，吃月饼，充值append方法
	if(smallstepRight >= 7){
		stepRight ++;
		smallstepRight = 0;
		
		//调用bingo音效
		if(isAudioON===1){			
			oMediaBingo.play();
		}
		//调用扔月饼方法
		yuePushRight();
		//调用小人欢呼方法
		hooooRight();
		
		
		//游戏结束
		if(stepRight >= 7){
			winner(2);
			//调用胜利音效
			if(isAudioON===1){
				oMediaWin.play();				
			}
		}
		//刷新下一轮按键
		appendKeyRight(stepRight);
	}
	
}

//扔左边月饼
function yuePushLeft(){
	var leftYuebings = document.getElementById("yuebing-left").lastElementChild;
	
	$(leftYuebings).animate({
		width : "0px",
		height : "0px",
		top : "-30px",
		left : "-60px",
	},500,"linear",function(){
		leftYuebings.parentNode.removeChild(leftYuebings);
	});
}
//扔右边月饼
function yuePushRight(){
	var rightYuebings = document.getElementById("yuebing-right").lastElementChild;
	
	$(rightYuebings).animate({
		width : "0px",
		height : "0px",
		top : "-40px",
		left : "400px",
	},500,"linear",function(){
		rightYuebings.parentNode.removeChild(rightYuebings);
	});
}
//左边小人欢呼
function hooooLeft(){
	$("#hoooo-left").animate({"left" : "0px"},400,function(){
		setTimeout(function(){			
			$("#hoooo-left").animate({"left": "-180px"},400);
		},500);
	});
}
//右边小人欢呼
function hooooRight(){
	$("#hoooo-right").animate({"right" : "0px"},400,function(){
		setTimeout(function(){			
			$("#hoooo-right").animate({"right": "-180px"},400);
		},500);
	});
}
//胜利者！
function winner(i){
	var winLeft = 0;		//胜利奖牌的水平位置
	var winWidth ;			//窗口宽度
	if (window.innerWidth)
		winWidth = window.innerWidth;
	else if ((document.body) && (document.body.clientWidth))
		winWidth = document.body.clientWidth;
	if(i === 1){
		//左边胜利
		winLeft = 10;
	}else{
		//右边胜利
		winLeft = parseInt(winWidth) - 310;
	}
	
	$("#winner").animate({
			"width":"300px",
			"height":"300px",
			"left" : "900px",
			"top" : "200px",
		},400,function(){
			$("#winner").animate({
				"width" : "150px",
				"height": "150px",
				"left" : "200px",
				"top" : "500px"
			},400,function(){
				$("#winner").animate({
				"width" : "800px",
				"height": "800px",
				"left" : "200px",
				"top" : "0px"
				},400,function(){
					$("#winner").animate({
						"width" : "300px",
						"height" : "300px",
						"left" : winLeft + "px",
						"top" : "150px"
					},400);
				});
			});
		});
	document.onkeydown = "";
}


