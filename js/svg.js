var select = function(root, selector) {
    return Array.prototype.slice.call(root.querySelectorAll(selector));
};

var loadContent = function(url, callback, error) {
    var req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.onreadystatechange = function (aEvt) {
        if (req.readyState == 4) {
            if(req.status == 200){
                callback(req.responseText)
            }
            else if (error){
                error('Error loading '+url)
            }
        }
    };
    req.send(null); 
};

var loadSvg = function(url, callback) {
    loadContent(url, function(raw){
        callback((new window.DOMParser()).parseFromString(raw, 'image/svg+xml'))
    });
};


