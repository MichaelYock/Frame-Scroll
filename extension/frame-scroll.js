fs = {};

fs.FRAMES_PER_SECOND = 24;
fs.PLAYER_ID = "movie_player";
fs.button = document.getElementById("frame-button")
fs.frameScrollOn = false;

fs.prevFrame = function() {
    // Based on YouTube enhancer userscript, http://userscripts.org/scripts/show/33042.
    player = document.getElementById(fs.PLAYER_ID);
    player.pauseVideo();
    player.seekBy(-1 * (1/fs.FRAMES_PER_SECOND));
}

fs.nextFrame = function() {
    // Based on YouTube enhancer userscript, http://userscripts.org/scripts/show/33042.
    player = document.getElementById(fs.PLAYER_ID);
    player.pauseVideo();
    player.seekBy(1 * (1/fs.FRAMES_PER_SECOND));
}


//Scroll Frames
fs.frameScroll = function() {
	if(fs.frameScrollOn){
		fs.frameScrollOn = false;
		document.getElementsByTagName('body')[0].className = document.getElementsByTagName('body')[0].className.replace( /(?:^|\s)no-scroll(?!\S)/g , '' );
		document.getElementById("frame-button").src = "http://www.iconsdb.com/icons/preview/gray/film-s.png";
	}else if(!fs.frameScrollOn){
		fs.frameScrollOn = true;
		document.getElementsByTagName('body')[0].className += ' no-scroll';
		document.getElementById("frame-button").src = "http://www.iconsdb.com/icons/preview/red/film-s.png";
	}
}		

fs.scrollFunc = function(e){
        var direct=0;
    e=e || window.event;

    if(e.wheelDelta && fs.frameScrollOn){
        fs.userMouse(e.wheelDelta);
    }else if(e.detail){
        fs.userMouse(e.wheelDelta);
    }
    }
    if(document.addEventListener && fs.frameScrollOn){
    document.addEventListener('DOMMouseScroll',fs.scrollFunc,false);
}

document.onmousewheel = fs.scrollFunc;

fs.userMouse = function(flage){
    if(flage == 3){
        fs.nextFrame();
    }else if(flage == -3){
        fs.prevFrame();
	}else if(flage == 120){
        fs.nextFrame();
    }else if(flage == -120){
        fs.prevFrame();
    }
}	


// Inject Controls
fs.injectControls = function() {
    var controls = document.createElement('controls_html');
    controls.innerHTML = "<div class='ytb-button' style=\"float:right; color: #939393;\"><a href=\"javascript: fs.prevFrame()\" style=\"color: #939393; margin-left:5px; text-decoration:none;\">< </a>"
        + "<img id='frame-button' src='http://www.iconsdb.com/icons/preview/gray/film-s.png' style='width:15px; height:12.5px; margin-top:7px; cursor:pointer;'>" /*temporary src link*/
        + "<a href=\"javascript: fs.nextFrame()\" style=\"color: #939393; margin-right:5px; text-decoration:none;\"> ></a></div>"
    var html5player = document.getElementsByClassName("html5-player-chrome")[0];
    html5player.appendChild(controls);
    document.getElementById("frame-button").addEventListener( 'click' , fs.frameScroll );
    
    //Create no-scroll class
    var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = '.no-scroll {height: 100%; overflow: hidden;}';
	document.getElementsByTagName('head')[0].appendChild(style);
}

fs.injectControls();
