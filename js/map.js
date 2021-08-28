document.getElementById("map1").onmouseover = function () { mouseOver("img/wawa2.png") };
document.getElementById("map2").onmouseover = function () { mouseOver("img/wawa3.png") };
document.getElementById("map3").onmouseover = function () { mouseOver("img/wawa4.png") };
document.getElementById("map4").onmouseover = function () { mouseOver("img/wawa5.png") };
document.getElementById("map5").onmouseover = function () { mouseOver("img/wawa6.png") };

document.getElementById("map1").onmouseout = function () { mouseOut() };
document.getElementById("map2").onmouseout = function () { mouseOut() };
document.getElementById("map3").onmouseout = function () { mouseOut() };
document.getElementById("map4").onmouseout = function () { mouseOut() };
document.getElementById("map5").onmouseout = function () { mouseOut() };

function mouseOver(source) {
          document.getElementById("wawa").src = source;
}

function mouseOut() {
    document.getElementById("wawa").src = "img/wawa1.png"
}