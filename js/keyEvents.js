var keysDown=[];
function addEvent(event){
    var pos=keysDown.indexOf(event.keyCode);
    if (pos==-1){
        keysDown.push(event.keyCode);
    }
}
function removeEvent(event){
    var pos=keysDown.indexOf(event.keyCode);
    if (pos>=0){
        keysDown.splice(pos,1)
    }
}

document.addEventListener("keydown", addEvent);
document.addEventListener("keyup", removeEvent);


function absorbEvent_(event) {
    var e = event || window.event;
    e.preventDefault && e.preventDefault();
    e.stopPropagation && e.stopPropagation();
    e.cancelBubble = true;
    e.returnValue = false;
    return false;
}

function preventLongPressMenu(node) {
    node.ontouchstart = absorbEvent_;
    node.ontouchmove = absorbEvent_;
    node.ontouchend = absorbEvent_;
    node.ontouchcancel = absorbEvent_;
}

