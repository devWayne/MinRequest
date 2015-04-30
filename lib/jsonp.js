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
