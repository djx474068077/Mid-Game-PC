
var isAudioON = 1;
window.onload = function(){
	document.getElementById('nation-btn').onclick = function(){
//		changeNext();
//		setTimeout(function(){			
			location.href = "national.html";			
//		},2000);
		
	}
	document.getElementById('autumn-btn').onclick = function(){
//		changeNext();
//		setTimeout(function(){	
			location.href = "mid-autumn.html";
//		},2000);
	}	
	var oMedia = document.getElementsByTagName('audio')[0];
	oMedia.volume = 0.6;
	//声音按键事件
	document.getElementById('audio-btn').onclick = function(){
		console.log(isAudioON);
		if(isAudioON === 1){
			isAudioON = 0;
			oMedia.pause();
			this.src = "img/audio-off.png";
		}else{
			isAudioON = 1;
			oMedia.play();
			this.src = "img/audio-on.png";
		}
	}
}

function changeNext(){
	var width = $(window).width();
	var height = $(window).height();
	console.log(width,height);
	$("#fix-one").animate({
		"left" : -150+'%',
		"top" : -150+"%",
	},800);
	$("#fix-two").animate({
		"left" : -150+"%",
		"top" : 50+"%",
	},800);
	$("#fix-three").animate({
		"left" : 50+"%",
		"top" : 50+"%",
	},800);
	$("#fix-four").animate({
		"left" : 50+"%",
		"top" : -150+"%",
	},800);
}
