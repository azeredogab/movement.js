(function($, window, document) {

	'use strict'; 
	
	//opções default do plugin
	var defaults = {
		
		start: 0, 
		end: 0, 
		
		callback: false,
		
		callbackInside: {}, 
		callbackOutside: {}, 

		syleIn: {}, 
		styleOut: {} 
		
	}

	function Movement(element, options) {

		options = options || {}; 
		
		this.s = $.extend({}, defaults, options);
		
		//javascript element		
		this.el = document.querySelector(element.selector); 
		
		//jquery element
		this.$el = element; 

		//initial style of the element
        this._initialStyle = window.getComputedStyle(this.el, null); 
        
        this._state = {}; 
        this._state.current =  -1; 
        
        //initialize plugin
        this.init(); 
    
        //execute the scroll listner
        this.scroll(); 
	}

	Movement.prototype.init = function() {
		var _this = this; 
		_this.move(); 
	}

	Movement.prototype.scroll = function(){
		var _this = this; 
		document.addEventListener("scroll", function(){
 			_this.move(); 
 		}); 
	}

	Movement.prototype.move = function() {

		var _this = this; 

		var _screenPositionStart = window.pageYOffset; 
        var _screenPositionEnd = window.pageYOffset + window.innerHeight; 

        var _insertOrChangeProperties = function (el, object) {
        	for (var propName in object) {
               el.style[propName] = object[propName]; 
            }
            return; 
        }

        if (_screenPositionStart < _this.s.start) {
            if (_this._state.current !== 0) {
                _this._state.current = 0; 
                _this.el.style = _this._initialStyle; 
            }
        }

        if (_screenPositionStart > _this.s.start && _screenPositionEnd < _this.s.end) {
            if (_this._state.current !== 1) {
                _this._state.current = 1; 
           
                if (_this.s.callback)
                	_this.s.callbackInside(_this.el); 
                else 
                	_insertOrChangeProperties(_this.el, _this.s.styleIn); 

            }
        }

        if (_screenPositionStart > _this.s.start && _screenPositionEnd > _this.s.end) {
            if (_this._state.current !== 2) {
                _this._state.current = 2; 
 
                if (_this.s.callback)
                	_this.s.callbackOutside(_this.el); 
                else 
                	_insertOrChangeProperties(_this.el, _this.s.styleOut); 

            }
        }
	}


	$.fn.movement = function(options) {
		return new Movement(this, options); 
	}

})(jQuery, window, document);
