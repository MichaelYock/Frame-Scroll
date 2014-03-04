fbf = {}

fbf.FRAMES_PER_SECOND = 25
fbf.PLAYER_ID = "movie_player"

fbf.prevFrame = function() {
    // Based on YouTube enhancer userscript, http://userscripts.org/scripts/show/33042.
    player = document.getElementById(fbf.PLAYER_ID)
    player.pauseVideo()
    player.seekBy(-1 * (1/fbf.FRAMES_PER_SECOND))
}

fbf.nextFrame = function() {
    // Based on YouTube enhancer userscript, http://userscripts.org/scripts/show/33042.
    player = document.getElementById(fbf.PLAYER_ID)
    player.pauseVideo()
    player.seekBy(1 * (1/fbf.FRAMES_PER_SECOND))
}

fbf.injectControls = function() {
    /*
    Injects extra player controls into the page.
    */
    var controls = document.createElement('controls_html');
    // Really basic controls to get started.
    controls.innerHTML = "<div class='ytb-button' tabindex='6000'><a href=\"javascript: fbf.prevFrame()\" style=\"color: red\">prev</a>"
        + "/"
        + "<a href=\"javascript: fbf.nextFrame()\" style=\"color: red\">next</a></div>"
    var player_bar = document.getElementsByClassName("html5-player-chrome");
    var html5player = player_bar[0];
    html5player.appendChild(controls)
}

fbf.injectControls()
