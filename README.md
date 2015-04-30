#MinRequest

> minimalist JavaScript library for Ajax,with a jQuery-compatible API

## Usage

For broswer:   

```html
<script type="text/javascript" src="dist/ajax.min.js"></script>
<script>
	ajax(option);
</script>
```

For CommonJS Module:   

```javascript
var Ajax=require('min-req');

ajax(option);
```

##API

###ajax(option)

- `opts` (`Object`)
  - `type` (`String`)(defaults to `GET`)
  - `url` (`String`) 
  - `data` (`Object`) ajax parameters
  - `dataType` (`String`) when ajax is a jsonp request,dataType should set as `jsonp`
  - `jsonp` only used when dataType is `jsonp` (defaults to `callback`)
  - `timeout` (`Number`) how long after a timeout error is emitted. (defaults to `60000`)
  - `success` (`Function`) name of the callback functions when ajax success
