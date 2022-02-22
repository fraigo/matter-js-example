var select = function(root, selector) {
    return Array.prototype.slice.call(root.querySelectorAll(selector));
};

var loadSvg = function(url, callback) {
    return fetch(url)
        .then(function(response) { 
            return response.text(); 
        })
        .then(function(raw) { 
            callback((new window.DOMParser()).parseFromString(raw, 'image/svg+xml')) 
        });
};


