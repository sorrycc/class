/*! class-0.0.4 2014-01-29 19:26:39 */
define("crossjs/class/0.0.4/singleton",["$","./super","crossjs/util/0.0.1/util"],function(a){"use strict";var b=a("$"),c=a("./super"),d=function(){var a,d,e,f,g=arguments,h={};switch(g.length){case 2:"function"==typeof g[0]&&(e=g[0]),b.isPlainObject(g[1])&&(d=g[1]);break;case 1:"function"==typeof g[0]?e=g[0]:b.isPlainObject(g[0])&&(d=g[0])}return a=function(){if(f)return f;f=this;var c=Array.prototype.slice.call(arguments,0),d=function(a,b,e){b&&b.hasOwnProperty(e)&&(d(a,b.constructor.uber,e),b[e].apply(a,c))};d(this,a.uber,"__construct"),a.prototype.hasOwnProperty("__construct")&&"function"==typeof this.__construct&&this.__construct.apply(this,c),b.each(h,b.proxy(function(a,b){b.apply(this,c)},this))},a.addPlugins=function(c){return b.extend(h,c),a},"function"!=typeof e?e=c:b.isPlainObject(e.uber)&&e.uber.hasSuper||c.inherit(e,c),c.inherit(a,e),b.isPlainObject(d)&&b.extend(a.prototype,d),a};return d});