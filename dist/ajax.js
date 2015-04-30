(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ajax= require('./lib/ajax');


module.exports=ajax;

window.ajax=ajax;

},{"./lib/ajax":2}],2:[function(require,module,exports){
var jsonp = require('./jsonp');

function createXHR() {
    var xhr = false;
    try {
        xhr = new ActiveXObject("Msxml2.XMLHTTP"); //ie msxml3.0+
    } catch (e1) {
        try {
            xhr = new ActiveXObject("Microsoft.XMLHTTP"); //ie msxml 2.6
        } catch (e2) {
            xhr = false;
        }
    }
    if (!xhr && typeof XMLHttpRequest != 'undefined') { //firefox opera 8.0 safari
        xhr = new XMLHttpRequest();
    }
    return xhr;
};

function ajax(option) {
    option.type = (option.type || 'GET').toUpperCase();
    if (option.dataType == 'jsonp') {
        jsonp(option);
	return;
    }
    var xhr = createXHR();
    xhr.open(option.type, option.url, true);
    xhr.setRequestHeader("Content-Type", option.contentType || "application/x-www-form-urlencoded");
    if (option.type === 'POST') {
        xhr.send(option.data || null);
    } else {
        xhr.send(null);
    }
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            option.success && typeof(option.success) == 'function' && option.success(xhr.responseText)
        }
    }
};


module.exports = ajax;

},{"./jsonp":3}],3:[function(require,module,exports){
var count=0;

function jsonp(option) {

    if (!option.url) return;

    var jsonp = opts.jsonp || 'callback';

    var timeout = option.timeout ? option.timeout : 60000;
	
    setTimeout(function(){
    	 cleanup();
	 if (option.success) option.success(new Error('Timeout'));
    });

    function cleanup() {
        if (script.parentNode)  document.getElementsByTagName('body')[0].removeChild(script);
        window[id] = function(){};
        if (timer) clearTimeout(timer);
    }


    var url = location.href;    var id='jsonp'+(count++);

    url += (url.indexOf('?') ? '&' : '?') + jsonp + '=' + encodeURIComponent(id);
    url = url.replace('?&', '?');

    // create script
    script = document.createElement('script');
    script.src = url;
    document.getElementsByTagName('body')[0].appendChild(script);

    window[id]=function(data){
    	cleanup();
	if(option.success)option.success(data);
    }
}

module.exports = jsonp;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImluZGV4LmpzIiwibGliL2FqYXguanMiLCJsaWIvanNvbnAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIGFqYXg9IHJlcXVpcmUoJy4vbGliL2FqYXgnKTtcblxuXG5tb2R1bGUuZXhwb3J0cz1hamF4O1xuXG53aW5kb3cuYWpheD1hamF4O1xuIiwidmFyIGpzb25wID0gcmVxdWlyZSgnLi9qc29ucCcpO1xuXG5mdW5jdGlvbiBjcmVhdGVYSFIoKSB7XG4gICAgdmFyIHhociA9IGZhbHNlO1xuICAgIHRyeSB7XG4gICAgICAgIHhociA9IG5ldyBBY3RpdmVYT2JqZWN0KFwiTXN4bWwyLlhNTEhUVFBcIik7IC8vaWUgbXN4bWwzLjArXG4gICAgfSBjYXRjaCAoZTEpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHhociA9IG5ldyBBY3RpdmVYT2JqZWN0KFwiTWljcm9zb2Z0LlhNTEhUVFBcIik7IC8vaWUgbXN4bWwgMi42XG4gICAgICAgIH0gY2F0Y2ggKGUyKSB7XG4gICAgICAgICAgICB4aHIgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXhociAmJiB0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT0gJ3VuZGVmaW5lZCcpIHsgLy9maXJlZm94IG9wZXJhIDguMCBzYWZhcmlcbiAgICAgICAgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgfVxuICAgIHJldHVybiB4aHI7XG59O1xuXG5mdW5jdGlvbiBhamF4KG9wdGlvbikge1xuICAgIG9wdGlvbi50eXBlID0gKG9wdGlvbi50eXBlIHx8ICdHRVQnKS50b1VwcGVyQ2FzZSgpO1xuICAgIGlmIChvcHRpb24uZGF0YVR5cGUgPT0gJ2pzb25wJykge1xuICAgICAgICBqc29ucChvcHRpb24pO1xuXHRyZXR1cm47XG4gICAgfVxuICAgIHZhciB4aHIgPSBjcmVhdGVYSFIoKTtcbiAgICB4aHIub3BlbihvcHRpb24udHlwZSwgb3B0aW9uLnVybCwgdHJ1ZSk7XG4gICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgb3B0aW9uLmNvbnRlbnRUeXBlIHx8IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIpO1xuICAgIGlmIChvcHRpb24udHlwZSA9PT0gJ1BPU1QnKSB7XG4gICAgICAgIHhoci5zZW5kKG9wdGlvbi5kYXRhIHx8IG51bGwpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHhoci5zZW5kKG51bGwpO1xuICAgIH1cbiAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCAmJiB4aHIuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgIG9wdGlvbi5zdWNjZXNzICYmIHR5cGVvZihvcHRpb24uc3VjY2VzcykgPT0gJ2Z1bmN0aW9uJyAmJiBvcHRpb24uc3VjY2Vzcyh4aHIucmVzcG9uc2VUZXh0KVxuICAgICAgICB9XG4gICAgfVxufTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IGFqYXg7XG4iLCJ2YXIgY291bnQ9MDtcblxuZnVuY3Rpb24ganNvbnAob3B0aW9uKSB7XG5cbiAgICBpZiAoIW9wdGlvbi51cmwpIHJldHVybjtcblxuICAgIHZhciBqc29ucCA9IG9wdHMuanNvbnAgfHwgJ2NhbGxiYWNrJztcblxuICAgIHZhciB0aW1lb3V0ID0gb3B0aW9uLnRpbWVvdXQgPyBvcHRpb24udGltZW91dCA6IDYwMDAwO1xuXHRcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgXHQgY2xlYW51cCgpO1xuXHQgaWYgKG9wdGlvbi5zdWNjZXNzKSBvcHRpb24uc3VjY2VzcyhuZXcgRXJyb3IoJ1RpbWVvdXQnKSk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBjbGVhbnVwKCkge1xuICAgICAgICBpZiAoc2NyaXB0LnBhcmVudE5vZGUpICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG4gICAgICAgIHdpbmRvd1tpZF0gPSBmdW5jdGlvbigpe307XG4gICAgICAgIGlmICh0aW1lcikgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICB9XG5cblxuICAgIHZhciB1cmwgPSBsb2NhdGlvbi5ocmVmOyAgICB2YXIgaWQ9J2pzb25wJysoY291bnQrKyk7XG5cbiAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPyAnJicgOiAnPycpICsganNvbnAgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQoaWQpO1xuICAgIHVybCA9IHVybC5yZXBsYWNlKCc/JicsICc/Jyk7XG5cbiAgICAvLyBjcmVhdGUgc2NyaXB0XG4gICAgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgc2NyaXB0LnNyYyA9IHVybDtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdLmFwcGVuZENoaWxkKHNjcmlwdCk7XG5cbiAgICB3aW5kb3dbaWRdPWZ1bmN0aW9uKGRhdGEpe1xuICAgIFx0Y2xlYW51cCgpO1xuXHRpZihvcHRpb24uc3VjY2VzcylvcHRpb24uc3VjY2VzcyhkYXRhKTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ganNvbnA7XG4iXX0=
