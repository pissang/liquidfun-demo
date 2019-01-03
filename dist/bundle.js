/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../emsdk/node/8.9.1_64bit/lib/node_modules/webpack/node_modules/path-browserify/index.js":
/*!************************************************************************************************!*\
  !*** ../emsdk/node/8.9.1_64bit/lib/node_modules/webpack/node_modules/path-browserify/index.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../process/browser.js */ "../emsdk/node/8.9.1_64bit/lib/node_modules/webpack/node_modules/process/browser.js")))

/***/ }),

/***/ "../emsdk/node/8.9.1_64bit/lib/node_modules/webpack/node_modules/process/browser.js":
/*!******************************************************************************************!*\
  !*** ../emsdk/node/8.9.1_64bit/lib/node_modules/webpack/node_modules/process/browser.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./lib/liquidfun.js":
/*!**************************!*\
  !*** ./lib/liquidfun.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, __dirname) {var key,Module=void 0!==window.Module?window.Module:{},moduleOverrides={};for(key in Module)Module.hasOwnProperty(key)&&(moduleOverrides[key]=Module[key]);Module.arguments=[],Module.thisProgram="./this.program",Module.quit=function(e,t){throw t},Module.preRun=[];var ENVIRONMENT_IS_WEB=!(Module.postRun=[]),ENVIRONMENT_IS_WORKER=!1,ENVIRONMENT_IS_NODE=!1,ENVIRONMENT_IS_SHELL=!1;ENVIRONMENT_IS_WEB="object"==typeof window,ENVIRONMENT_IS_WORKER="function"==typeof importScripts,ENVIRONMENT_IS_NODE="object"==typeof process&&"function"=="function"&&!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_WORKER,ENVIRONMENT_IS_SHELL=!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_NODE&&!ENVIRONMENT_IS_WORKER;var nodeFS,nodePath,scriptDirectory="";function locateFile(e){return Module.locateFile?Module.locateFile(e,scriptDirectory):scriptDirectory+e}ENVIRONMENT_IS_NODE?(scriptDirectory=__dirname+"/",Module.read=function(e,t){var o;return nodeFS||(nodeFS=__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'fs'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))),nodePath||(nodePath=__webpack_require__(/*! path */ "../emsdk/node/8.9.1_64bit/lib/node_modules/webpack/node_modules/path-browserify/index.js")),e=nodePath.normalize(e),o=nodeFS.readFileSync(e),t?o:o.toString()},Module.readBinary=function(e){var t=Module.read(e,!0);return t.buffer||(t=new Uint8Array(t)),assert(t.buffer),t},1<process.argv.length&&(Module.thisProgram=process.argv[1].replace(/\\/g,"/")),Module.arguments=process.argv.slice(2), true&&(module.exports=Module),process.on("uncaughtException",function(e){if(!(e instanceof ExitStatus))throw e}),process.on("unhandledRejection",abort),Module.quit=function(e){process.exit(e)},Module.inspect=function(){return"[Emscripten Module object]"}):ENVIRONMENT_IS_SHELL?("undefined"!=typeof read&&(Module.read=function(e){return read(e)}),Module.readBinary=function(e){var t;return"function"==typeof readbuffer?new Uint8Array(readbuffer(e)):(assert("object"==typeof(t=read(e,"binary"))),t)},"undefined"!=typeof scriptArgs?Module.arguments=scriptArgs:"undefined"!=typeof arguments&&(Module.arguments=arguments),"function"==typeof quit&&(Module.quit=function(e){quit(e)})):(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)&&(ENVIRONMENT_IS_WORKER?scriptDirectory=self.location.href:document.currentScript&&(scriptDirectory=document.currentScript.src),scriptDirectory=0!==scriptDirectory.indexOf("blob:")?scriptDirectory.substr(0,scriptDirectory.lastIndexOf("/")+1):"",Module.read=function(e){var t=new XMLHttpRequest;return t.open("GET",e,!1),t.send(null),t.responseText},ENVIRONMENT_IS_WORKER&&(Module.readBinary=function(e){var t=new XMLHttpRequest;return t.open("GET",e,!1),t.responseType="arraybuffer",t.send(null),new Uint8Array(t.response)}),Module.readAsync=function(e,t,o){var r=new XMLHttpRequest;r.open("GET",e,!0),r.responseType="arraybuffer",r.onload=function(){200==r.status||0==r.status&&r.response?t(r.response):o()},r.onerror=o,r.send(null)},Module.setWindowTitle=function(e){document.title=e});var out=Module.print||("undefined"!=typeof console?console.log.bind(console):"undefined"!=typeof print?print:null),err=Module.printErr||("undefined"!=typeof printErr?printErr:"undefined"!=typeof console&&console.warn.bind(console)||out);for(key in moduleOverrides)moduleOverrides.hasOwnProperty(key)&&(Module[key]=moduleOverrides[key]);moduleOverrides=void 0;var STACK_ALIGN=16;function staticAlloc(e){var t=STATICTOP;return STATICTOP=STATICTOP+e+15&-16,t}function dynamicAlloc(e){var t=HEAP32[DYNAMICTOP_PTR>>2],o=t+e+15&-16;if((HEAP32[DYNAMICTOP_PTR>>2]=o,TOTAL_MEMORY<=o)&&!enlargeMemory())return HEAP32[DYNAMICTOP_PTR>>2]=t,0;return t}function alignMemory(e,t){return t||(t=STACK_ALIGN),e=Math.ceil(e/t)*t}function getNativeTypeSize(e){switch(e){case"i1":case"i8":return 1;case"i16":return 2;case"i32":return 4;case"i64":return 8;case"float":return 4;case"double":return 8;default:if("*"===e[e.length-1])return 4;if("i"!==e[0])return 0;var t=parseInt(e.substr(1));return assert(t%8==0),t/8}}function warnOnce(e){warnOnce.shown||(warnOnce.shown={}),warnOnce.shown[e]||(warnOnce.shown[e]=1,err(e))}var asm2wasmImports={"f64-rem":function(e,t){return e%t},debugger:function(){}},jsCallStartIndex=1,functionPointers=new Array(0),funcWrappers={};function dynCall(e,t,o){return o&&o.length?Module["dynCall_"+e].apply(null,[t].concat(o)):Module["dynCall_"+e].call(null,t)}var tempRet0=0,setTempRet0=function(e){tempRet0=e},getTempRet0=function(){return tempRet0},GLOBAL_BASE=1024,ABORT=!1,EXITSTATUS=0;function assert(e,t){e||abort("Assertion failed: "+t)}function getCFunc(e){var t=Module["_"+e];return assert(t,"Cannot call unknown function "+e+", make sure it is exported"),t}var JSfuncs={stackSave:function(){stackSave()},stackRestore:function(){stackRestore()},arrayToC:function(e){var t=stackAlloc(e.length);return writeArrayToMemory(e,t),t},stringToC:function(e){var t=0;if(null!=e&&0!==e){var o=1+(e.length<<2);stringToUTF8(e,t=stackAlloc(o),o)}return t}},toC={string:JSfuncs.stringToC,array:JSfuncs.arrayToC};function ccall(e,t,o,r,i){var n=getCFunc(e),l=[],a=0;if(r)for(var u=0;u<r.length;u++){var s=toC[o[u]];l[u]=s?(0===a&&(a=stackSave()),s(r[u])):r[u]}var _,c=n.apply(null,l);return _=c,c="string"===t?Pointer_stringify(_):"boolean"===t?Boolean(_):_,0!==a&&stackRestore(a),c}function setValue(e,t,o,r){switch("*"===(o=o||"i8").charAt(o.length-1)&&(o="i32"),o){case"i1":case"i8":HEAP8[e>>0]=t;break;case"i16":HEAP16[e>>1]=t;break;case"i32":HEAP32[e>>2]=t;break;case"i64":tempI64=[t>>>0,(tempDouble=t,1<=+Math_abs(tempDouble)?0<tempDouble?(0|Math_min(+Math_floor(tempDouble/4294967296),4294967295))>>>0:~~+Math_ceil((tempDouble-+(~~tempDouble>>>0))/4294967296)>>>0:0)],HEAP32[e>>2]=tempI64[0],HEAP32[e+4>>2]=tempI64[1];break;case"float":HEAPF32[e>>2]=t;break;case"double":HEAPF64[e>>3]=t;break;default:abort("invalid type for setValue: "+o)}}var ALLOC_STATIC=2,ALLOC_NONE=4;function Pointer_stringify(e,t){if(0===t||!e)return"";for(var o,r=0,i=0;r|=o=HEAPU8[e+i>>0],(0!=o||t)&&(i++,!t||i!=t););t||(t=i);var n="";if(r<128){for(var l;0<t;)l=String.fromCharCode.apply(String,HEAPU8.subarray(e,e+Math.min(t,1024))),n=n?n+l:l,e+=1024,t-=1024;return n}return UTF8ToString(e)}var UTF8Decoder="undefined"!=typeof TextDecoder?new TextDecoder("utf8"):void 0;function UTF8ArrayToString(e,t){for(var o=t;e[o];)++o;if(16<o-t&&e.subarray&&UTF8Decoder)return UTF8Decoder.decode(e.subarray(t,o));for(var r,i,n,l,a,u="";;){if(!(r=e[t++]))return u;if(128&r)if(i=63&e[t++],192!=(224&r))if(n=63&e[t++],(r=224==(240&r)?(15&r)<<12|i<<6|n:(l=63&e[t++],240==(248&r)?(7&r)<<18|i<<12|n<<6|l:(a=63&e[t++],248==(252&r)?(3&r)<<24|i<<18|n<<12|l<<6|a:(1&r)<<30|i<<24|n<<18|l<<12|a<<6|63&e[t++])))<65536)u+=String.fromCharCode(r);else{var s=r-65536;u+=String.fromCharCode(55296|s>>10,56320|1023&s)}else u+=String.fromCharCode((31&r)<<6|i);else u+=String.fromCharCode(r)}}function UTF8ToString(e){return UTF8ArrayToString(HEAPU8,e)}function stringToUTF8Array(e,t,o,r){if(!(0<r))return 0;for(var i=o,n=o+r-1,l=0;l<e.length;++l){var a=e.charCodeAt(l);if(55296<=a&&a<=57343)a=65536+((1023&a)<<10)|1023&e.charCodeAt(++l);if(a<=127){if(n<=o)break;t[o++]=a}else if(a<=2047){if(n<=o+1)break;t[o++]=192|a>>6,t[o++]=128|63&a}else if(a<=65535){if(n<=o+2)break;t[o++]=224|a>>12,t[o++]=128|a>>6&63,t[o++]=128|63&a}else if(a<=2097151){if(n<=o+3)break;t[o++]=240|a>>18,t[o++]=128|a>>12&63,t[o++]=128|a>>6&63,t[o++]=128|63&a}else if(a<=67108863){if(n<=o+4)break;t[o++]=248|a>>24,t[o++]=128|a>>18&63,t[o++]=128|a>>12&63,t[o++]=128|a>>6&63,t[o++]=128|63&a}else{if(n<=o+5)break;t[o++]=252|a>>30,t[o++]=128|a>>24&63,t[o++]=128|a>>18&63,t[o++]=128|a>>12&63,t[o++]=128|a>>6&63,t[o++]=128|63&a}}return t[o]=0,o-i}function stringToUTF8(e,t,o){return stringToUTF8Array(e,HEAPU8,t,o)}function lengthBytesUTF8(e){for(var t=0,o=0;o<e.length;++o){var r=e.charCodeAt(o);55296<=r&&r<=57343&&(r=65536+((1023&r)<<10)|1023&e.charCodeAt(++o)),r<=127?++t:t+=r<=2047?2:r<=65535?3:r<=2097151?4:r<=67108863?5:6}return t}var UTF16Decoder="undefined"!=typeof TextDecoder?new TextDecoder("utf-16le"):void 0;function demangle(e){return e}function demangleAll(e){return e.replace(/__Z[\w\d_]+/g,function(e){var t=demangle(e);return e===t?e:t+" ["+e+"]"})}function jsStackTrace(){var t=new Error;if(!t.stack){try{throw new Error(0)}catch(e){t=e}if(!t.stack)return"(no stack trace available)"}return t.stack.toString()}var buffer,HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64,STATIC_BASE,STATICTOP,staticSealed,STACK_BASE,STACKTOP,STACK_MAX,DYNAMIC_BASE,DYNAMICTOP_PTR,WASM_PAGE_SIZE=65536,ASMJS_PAGE_SIZE=16777216;function alignUp(e,t){return 0<e%t&&(e+=t-e%t),e}function updateGlobalBuffer(e){Module.buffer=buffer=e}function updateGlobalBufferViews(){Module.HEAP8=HEAP8=new Int8Array(buffer),Module.HEAP16=HEAP16=new Int16Array(buffer),Module.HEAP32=HEAP32=new Int32Array(buffer),Module.HEAPU8=HEAPU8=new Uint8Array(buffer),Module.HEAPU16=HEAPU16=new Uint16Array(buffer),Module.HEAPU32=HEAPU32=new Uint32Array(buffer),Module.HEAPF32=HEAPF32=new Float32Array(buffer),Module.HEAPF64=HEAPF64=new Float64Array(buffer)}function abortOnCannotGrowMemory(){abort("Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value "+TOTAL_MEMORY+", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ")}function enlargeMemory(){abortOnCannotGrowMemory()}STATIC_BASE=STATICTOP=STACK_BASE=STACKTOP=STACK_MAX=DYNAMIC_BASE=DYNAMICTOP_PTR=0,staticSealed=!1;var TOTAL_STACK=Module.TOTAL_STACK||5242880,TOTAL_MEMORY=Module.TOTAL_MEMORY||33554432;function getTotalMemory(){return TOTAL_MEMORY}function callRuntimeCallbacks(e){for(;0<e.length;){var t=e.shift();if("function"!=typeof t){var o=t.func;"number"==typeof o?void 0===t.arg?Module.dynCall_v(o):Module.dynCall_vi(o,t.arg):o(void 0===t.arg?null:t.arg)}else t()}}TOTAL_MEMORY<TOTAL_STACK&&err("TOTAL_MEMORY should be larger than TOTAL_STACK, was "+TOTAL_MEMORY+"! (TOTAL_STACK="+TOTAL_STACK+")"),Module.buffer?buffer=Module.buffer:(buffer="object"==typeof WebAssembly&&"function"==typeof WebAssembly.Memory?(Module.wasmMemory=new WebAssembly.Memory({initial:TOTAL_MEMORY/WASM_PAGE_SIZE,maximum:TOTAL_MEMORY/WASM_PAGE_SIZE}),Module.wasmMemory.buffer):new ArrayBuffer(TOTAL_MEMORY),Module.buffer=buffer),updateGlobalBufferViews();var __ATPRERUN__=[],__ATINIT__=[],__ATMAIN__=[],__ATEXIT__=[],__ATPOSTRUN__=[],runtimeInitialized=!1,runtimeExited=!1;function preRun(){if(Module.preRun)for("function"==typeof Module.preRun&&(Module.preRun=[Module.preRun]);Module.preRun.length;)addOnPreRun(Module.preRun.shift());callRuntimeCallbacks(__ATPRERUN__)}function ensureInitRuntime(){runtimeInitialized||(runtimeInitialized=!0,callRuntimeCallbacks(__ATINIT__))}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function exitRuntime(){callRuntimeCallbacks(__ATEXIT__),runtimeExited=!0}function postRun(){if(Module.postRun)for("function"==typeof Module.postRun&&(Module.postRun=[Module.postRun]);Module.postRun.length;)addOnPostRun(Module.postRun.shift());callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(e){__ATPRERUN__.unshift(e)}function addOnPostRun(e){__ATPOSTRUN__.unshift(e)}function writeArrayToMemory(e,t){HEAP8.set(e,t)}function writeAsciiToMemory(e,t,o){for(var r=0;r<e.length;++r)HEAP8[t++>>0]=e.charCodeAt(r);o||(HEAP8[t>>0]=0)}var Math_abs=Math.abs,Math_ceil=Math.ceil,Math_floor=Math.floor,Math_min=Math.min,runDependencies=0,runDependencyWatcher=null,dependenciesFulfilled=null;function addRunDependency(e){runDependencies++,Module.monitorRunDependencies&&Module.monitorRunDependencies(runDependencies)}function removeRunDependency(e){if(runDependencies--,Module.monitorRunDependencies&&Module.monitorRunDependencies(runDependencies),0==runDependencies&&(null!==runDependencyWatcher&&(clearInterval(runDependencyWatcher),runDependencyWatcher=null),dependenciesFulfilled)){var t=dependenciesFulfilled;dependenciesFulfilled=null,t()}}Module.preloadedImages={},Module.preloadedAudios={};var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(e){return String.prototype.startsWith?e.startsWith(dataURIPrefix):0===e.indexOf(dataURIPrefix)}function integrateWasmJS(){var e="lf_core.wast",l="lf_core.wasm",t="lf_core.temp.asm.js";isDataURI(e)||(e=locateFile(e)),isDataURI(l)||(l=locateFile(l)),isDataURI(t)||(t=locateFile(t));var a={global:null,env:null,asm2wasm:asm2wasmImports,parent:Module},u=null;function s(){try{if(Module.wasmBinary)return new Uint8Array(Module.wasmBinary);if(Module.readBinary)return Module.readBinary(l);throw"both async and sync fetching of the wasm failed"}catch(e){abort(e)}}function _(e,t,o){if("object"!=typeof WebAssembly)return err("no native wasm support detected"),!1;if(!(Module.wasmMemory instanceof WebAssembly.Memory))return err("no native wasm Memory in use"),!1;function r(e,t){(u=e.exports).memory&&function(e){var t=Module.buffer;e.byteLength<t.byteLength&&err("the new buffer in mergeMemory is smaller than the previous one. in native wasm, we should grow memory here");var o=new Int8Array(t);new Int8Array(e).set(o),updateGlobalBuffer(e),updateGlobalBufferViews()}(u.memory),Module.asm=u,Module.usingWasm=!0,removeRunDependency("wasm-instantiate")}if(t.memory=Module.wasmMemory,a.global={NaN:NaN,Infinity:1/0},a["global.Math"]=Math,a.env=t,addRunDependency("wasm-instantiate"),Module.instantiateWasm)try{return Module.instantiateWasm(a,r)}catch(e){return err("Module.instantiateWasm callback failed with error: "+e),!1}function i(e){r(e.instance,e.module)}function n(e){(Module.wasmBinary||!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_WORKER||"function"!=typeof fetch?new Promise(function(e,t){e(s())}):fetch(l,{credentials:"same-origin"}).then(function(e){if(!e.ok)throw"failed to load wasm binary file at '"+l+"'";return e.arrayBuffer()}).catch(function(){return s()})).then(function(e){return WebAssembly.instantiate(e,a)}).then(e,function(e){err("failed to asynchronously prepare wasm: "+e),abort(e)})}return Module.wasmBinary||"function"!=typeof WebAssembly.instantiateStreaming||isDataURI(l)||"function"!=typeof fetch?n(i):WebAssembly.instantiateStreaming(fetch(l,{credentials:"same-origin"}),a).then(i,function(e){err("wasm streaming compile failed: "+e),err("falling back to ArrayBuffer instantiation"),n(i)}),{}}Module.asmPreload=Module.asm;var o=Module.reallocBuffer;Module.reallocBuffer=function(e){return"asmjs"===r?o(e):function(e){e=alignUp(e,Module.usingWasm?WASM_PAGE_SIZE:ASMJS_PAGE_SIZE);var t=Module.buffer.byteLength;if(Module.usingWasm)try{return-1!==Module.wasmMemory.grow((e-t)/65536)?Module.buffer=Module.wasmMemory.buffer:null}catch(e){return null}}(e)};var r="";Module.asm=function(e,t,o){if(!t.table){var r=Module.wasmTableSize;void 0===r&&(r=1024);var i=Module.wasmMaxTableSize;"object"==typeof WebAssembly&&"function"==typeof WebAssembly.Table?t.table=void 0!==i?new WebAssembly.Table({initial:r,maximum:i,element:"anyfunc"}):new WebAssembly.Table({initial:r,element:"anyfunc"}):t.table=new Array(r),Module.wasmTable=t.table}var n;return t.__memory_base||(t.__memory_base=Module.STATIC_BASE),t.__table_base||(t.__table_base=0),assert(n=_(0,t),"no binaryen method succeeded."),n}}integrateWasmJS(),STATICTOP=(STATIC_BASE=GLOBAL_BASE)+11232,__ATINIT__.push();var STATIC_BUMP=11232;Module.STATIC_BASE=STATIC_BASE,Module.STATIC_BUMP=STATIC_BUMP;var tempDoublePtr=STATICTOP;function __ZSt18uncaught_exceptionv(){return!!__ZSt18uncaught_exceptionv.uncaught_exception}STATICTOP+=16;var EXCEPTIONS={last:0,caught:[],infos:{},deAdjust:function(e){if(!e||EXCEPTIONS.infos[e])return e;for(var t in EXCEPTIONS.infos)for(var o=+t,r=EXCEPTIONS.infos[o].adjusted,i=r.length,n=0;n<i;n++)if(r[n]===e)return o;return e},addRef:function(e){e&&EXCEPTIONS.infos[e].refcount++},decRef:function(e){if(e){var t=EXCEPTIONS.infos[e];assert(0<t.refcount),t.refcount--,0!==t.refcount||t.rethrown||(t.destructor&&Module.dynCall_vi(t.destructor,e),delete EXCEPTIONS.infos[e],___cxa_free_exception(e))}},clearRef:function(e){e&&(EXCEPTIONS.infos[e].refcount=0)}};function ___cxa_begin_catch(e){var t=EXCEPTIONS.infos[e];return t&&!t.caught&&(t.caught=!0,__ZSt18uncaught_exceptionv.uncaught_exception--),t&&(t.rethrown=!1),EXCEPTIONS.caught.push(e),EXCEPTIONS.addRef(EXCEPTIONS.deAdjust(e)),e}function ___cxa_pure_virtual(){throw ABORT=!0,"Pure virtual function called!"}function ___resumeException(e){throw EXCEPTIONS.last||(EXCEPTIONS.last=e),e+" - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch."}function ___cxa_find_matching_catch(){var e=EXCEPTIONS.last;if(!e)return 0|(setTempRet0(0),0);var t=EXCEPTIONS.infos[e],o=t.type;if(!o)return 0|(setTempRet0(0),e);var r=Array.prototype.slice.call(arguments);Module.___cxa_is_pointer_type(o);___cxa_find_matching_catch.buffer||(___cxa_find_matching_catch.buffer=_malloc(4)),HEAP32[___cxa_find_matching_catch.buffer>>2]=e,e=___cxa_find_matching_catch.buffer;for(var i=0;i<r.length;i++)if(r[i]&&Module.___cxa_can_catch(r[i],o,e))return e=HEAP32[e>>2],t.adjusted.push(e),0|(setTempRet0(r[i]),e);return e=HEAP32[e>>2],0|(setTempRet0(o),e)}function ___gxx_personality_v0(){}var SYSCALLS={buffers:[null,[],[]],printChar:function(e,t){var o=SYSCALLS.buffers[e];assert(o),0===t||10===t?((1===e?out:err)(UTF8ArrayToString(o,0)),o.length=0):o.push(t)},varargs:0,get:function(e){return SYSCALLS.varargs+=4,HEAP32[SYSCALLS.varargs-4>>2]},getStr:function(){return Pointer_stringify(SYSCALLS.get())},get64:function(){var e=SYSCALLS.get(),t=SYSCALLS.get();return assert(0<=e?0===t:-1===t),e},getZero:function(){assert(0===SYSCALLS.get())}};function ___syscall140(e,t){SYSCALLS.varargs=t;try{var o=SYSCALLS.getStreamFromFD(),r=(SYSCALLS.get(),SYSCALLS.get()),i=SYSCALLS.get(),n=SYSCALLS.get(),l=r;return FS.llseek(o,l,n),HEAP32[i>>2]=o.position,o.getdents&&0===l&&0===n&&(o.getdents=null),0}catch(e){return"undefined"!=typeof FS&&e instanceof FS.ErrnoError||abort(e),-e.errno}}function flush_NO_FILESYSTEM(){var e=Module._fflush;e&&e(0);var t=SYSCALLS.buffers;t[1].length&&SYSCALLS.printChar(1,10),t[2].length&&SYSCALLS.printChar(2,10)}function ___syscall146(e,t){SYSCALLS.varargs=t;try{for(var o=SYSCALLS.get(),r=SYSCALLS.get(),i=SYSCALLS.get(),n=0,l=0;l<i;l++){for(var a=HEAP32[r+8*l>>2],u=HEAP32[r+(8*l+4)>>2],s=0;s<u;s++)SYSCALLS.printChar(o,HEAPU8[a+s]);n+=u}return n}catch(e){return"undefined"!=typeof FS&&e instanceof FS.ErrnoError||abort(e),-e.errno}}function ___syscall6(e,t){SYSCALLS.varargs=t;try{var o=SYSCALLS.getStreamFromFD();return FS.close(o),0}catch(e){return"undefined"!=typeof FS&&e instanceof FS.ErrnoError||abort(e),-e.errno}}function _abort(){Module.abort()}function _b2WorldBeginContactBody(e){b2World.BeginContactBody(e)}function _b2WorldEndContactBody(e){b2World.EndContactBody(e)}function _b2WorldPostSolve(e,t){b2World.PostSolve(e,t)}function _b2WorldPreSolve(e,t){b2World.PreSolve(e,t)}function _b2WorldQueryAABB(e){return b2World.QueryAABB(e)}function _b2WorldRayCastCallback(e,t,o,r,i,n){return b2World.RayCast(e,t,o,r,i,n)}function _llvm_trap(){abort("trap!")}function _emscripten_memcpy_big(e,t,o){return HEAPU8.set(HEAPU8.subarray(t,t+o),e),e}var PTHREAD_SPECIFIC={};function _pthread_getspecific(e){return PTHREAD_SPECIFIC[e]||0}var PTHREAD_SPECIFIC_NEXT_KEY=1,ERRNO_CODES={EPERM:1,ENOENT:2,ESRCH:3,EINTR:4,EIO:5,ENXIO:6,E2BIG:7,ENOEXEC:8,EBADF:9,ECHILD:10,EAGAIN:11,EWOULDBLOCK:11,ENOMEM:12,EACCES:13,EFAULT:14,ENOTBLK:15,EBUSY:16,EEXIST:17,EXDEV:18,ENODEV:19,ENOTDIR:20,EISDIR:21,EINVAL:22,ENFILE:23,EMFILE:24,ENOTTY:25,ETXTBSY:26,EFBIG:27,ENOSPC:28,ESPIPE:29,EROFS:30,EMLINK:31,EPIPE:32,EDOM:33,ERANGE:34,ENOMSG:42,EIDRM:43,ECHRNG:44,EL2NSYNC:45,EL3HLT:46,EL3RST:47,ELNRNG:48,EUNATCH:49,ENOCSI:50,EL2HLT:51,EDEADLK:35,ENOLCK:37,EBADE:52,EBADR:53,EXFULL:54,ENOANO:55,EBADRQC:56,EBADSLT:57,EDEADLOCK:35,EBFONT:59,ENOSTR:60,ENODATA:61,ETIME:62,ENOSR:63,ENONET:64,ENOPKG:65,EREMOTE:66,ENOLINK:67,EADV:68,ESRMNT:69,ECOMM:70,EPROTO:71,EMULTIHOP:72,EDOTDOT:73,EBADMSG:74,ENOTUNIQ:76,EBADFD:77,EREMCHG:78,ELIBACC:79,ELIBBAD:80,ELIBSCN:81,ELIBMAX:82,ELIBEXEC:83,ENOSYS:38,ENOTEMPTY:39,ENAMETOOLONG:36,ELOOP:40,EOPNOTSUPP:95,EPFNOSUPPORT:96,ECONNRESET:104,ENOBUFS:105,EAFNOSUPPORT:97,EPROTOTYPE:91,ENOTSOCK:88,ENOPROTOOPT:92,ESHUTDOWN:108,ECONNREFUSED:111,EADDRINUSE:98,ECONNABORTED:103,ENETUNREACH:101,ENETDOWN:100,ETIMEDOUT:110,EHOSTDOWN:112,EHOSTUNREACH:113,EINPROGRESS:115,EALREADY:114,EDESTADDRREQ:89,EMSGSIZE:90,EPROTONOSUPPORT:93,ESOCKTNOSUPPORT:94,EADDRNOTAVAIL:99,ENETRESET:102,EISCONN:106,ENOTCONN:107,ETOOMANYREFS:109,EUSERS:87,EDQUOT:122,ESTALE:116,ENOTSUP:95,ENOMEDIUM:123,EILSEQ:84,EOVERFLOW:75,ECANCELED:125,ENOTRECOVERABLE:131,EOWNERDEAD:130,ESTRPIPE:86};function _pthread_key_create(e,t){return 0==e?ERRNO_CODES.EINVAL:(HEAP32[e>>2]=PTHREAD_SPECIFIC_NEXT_KEY,PTHREAD_SPECIFIC[PTHREAD_SPECIFIC_NEXT_KEY]=0,PTHREAD_SPECIFIC_NEXT_KEY++,0)}function _pthread_once(e,t){_pthread_once.seen||(_pthread_once.seen={}),e in _pthread_once.seen||(Module.dynCall_v(t),_pthread_once.seen[e]=1)}function _pthread_setspecific(e,t){return e in PTHREAD_SPECIFIC?(PTHREAD_SPECIFIC[e]=t,0):ERRNO_CODES.EINVAL}function ___setErrNo(e){return Module.___errno_location&&(HEAP32[Module.___errno_location()>>2]=e),e}DYNAMICTOP_PTR=staticAlloc(4),DYNAMIC_BASE=alignMemory(STACK_MAX=(STACK_BASE=STACKTOP=alignMemory(STATICTOP))+TOTAL_STACK),HEAP32[DYNAMICTOP_PTR>>2]=DYNAMIC_BASE;var ASSERTIONS=!(staticSealed=!0);Module.wasmTableSize=380,Module.wasmMaxTableSize=380,Module.asmGlobalArg={},Module.asmLibraryArg={abort:abort,assert:assert,enlargeMemory:enlargeMemory,getTotalMemory:getTotalMemory,setTempRet0:setTempRet0,getTempRet0:getTempRet0,abortOnCannotGrowMemory:abortOnCannotGrowMemory,__ZSt18uncaught_exceptionv:__ZSt18uncaught_exceptionv,___cxa_begin_catch:___cxa_begin_catch,___cxa_find_matching_catch:___cxa_find_matching_catch,___cxa_pure_virtual:___cxa_pure_virtual,___gxx_personality_v0:___gxx_personality_v0,___resumeException:___resumeException,___setErrNo:___setErrNo,___syscall140:___syscall140,___syscall146:___syscall146,___syscall6:___syscall6,_abort:_abort,_b2WorldBeginContactBody:_b2WorldBeginContactBody,_b2WorldEndContactBody:_b2WorldEndContactBody,_b2WorldPostSolve:_b2WorldPostSolve,_b2WorldPreSolve:_b2WorldPreSolve,_b2WorldQueryAABB:_b2WorldQueryAABB,_b2WorldRayCastCallback:_b2WorldRayCastCallback,_emscripten_memcpy_big:_emscripten_memcpy_big,_llvm_trap:_llvm_trap,_pthread_getspecific:_pthread_getspecific,_pthread_key_create:_pthread_key_create,_pthread_once:_pthread_once,_pthread_setspecific:_pthread_setspecific,flush_NO_FILESYSTEM:flush_NO_FILESYSTEM,DYNAMICTOP_PTR:DYNAMICTOP_PTR,tempDoublePtr:tempDoublePtr,STACKTOP:STACKTOP,STACK_MAX:STACK_MAX};var asm=Module.asm(Module.asmGlobalArg,Module.asmLibraryArg,buffer);Module.asm=asm;var initialStackTop,___cxa_can_catch=Module.___cxa_can_catch=function(){return Module.asm.___cxa_can_catch.apply(null,arguments)},___cxa_is_pointer_type=Module.___cxa_is_pointer_type=function(){return Module.asm.___cxa_is_pointer_type.apply(null,arguments)},___errno_location=Module.___errno_location=function(){return Module.asm.___errno_location.apply(null,arguments)},_b2Body_ApplyAngularImpulse=Module._b2Body_ApplyAngularImpulse=function(){return Module.asm._b2Body_ApplyAngularImpulse.apply(null,arguments)},_b2Body_ApplyForce=Module._b2Body_ApplyForce=function(){return Module.asm._b2Body_ApplyForce.apply(null,arguments)},_b2Body_ApplyForceToCenter=Module._b2Body_ApplyForceToCenter=function(){return Module.asm._b2Body_ApplyForceToCenter.apply(null,arguments)},_b2Body_ApplyLinearImpulse=Module._b2Body_ApplyLinearImpulse=function(){return Module.asm._b2Body_ApplyLinearImpulse.apply(null,arguments)},_b2Body_ApplyTorque=Module._b2Body_ApplyTorque=function(){return Module.asm._b2Body_ApplyTorque.apply(null,arguments)},_b2Body_DestroyFixture=Module._b2Body_DestroyFixture=function(){return Module.asm._b2Body_DestroyFixture.apply(null,arguments)},_b2Body_GetAngle=Module._b2Body_GetAngle=function(){return Module.asm._b2Body_GetAngle.apply(null,arguments)},_b2Body_GetAngularVelocity=Module._b2Body_GetAngularVelocity=function(){return Module.asm._b2Body_GetAngularVelocity.apply(null,arguments)},_b2Body_GetGravityScale=Module._b2Body_GetGravityScale=function(){return Module.asm._b2Body_GetGravityScale.apply(null,arguments)},_b2Body_GetInertia=Module._b2Body_GetInertia=function(){return Module.asm._b2Body_GetInertia.apply(null,arguments)},_b2Body_GetLinearVelocity=Module._b2Body_GetLinearVelocity=function(){return Module.asm._b2Body_GetLinearVelocity.apply(null,arguments)},_b2Body_GetLocalPoint=Module._b2Body_GetLocalPoint=function(){return Module.asm._b2Body_GetLocalPoint.apply(null,arguments)},_b2Body_GetLocalVector=Module._b2Body_GetLocalVector=function(){return Module.asm._b2Body_GetLocalVector.apply(null,arguments)},_b2Body_GetMass=Module._b2Body_GetMass=function(){return Module.asm._b2Body_GetMass.apply(null,arguments)},_b2Body_GetPosition=Module._b2Body_GetPosition=function(){return Module.asm._b2Body_GetPosition.apply(null,arguments)},_b2Body_GetTransform=Module._b2Body_GetTransform=function(){return Module.asm._b2Body_GetTransform.apply(null,arguments)},_b2Body_GetType=Module._b2Body_GetType=function(){return Module.asm._b2Body_GetType.apply(null,arguments)},_b2Body_GetWorldCenter=Module._b2Body_GetWorldCenter=function(){return Module.asm._b2Body_GetWorldCenter.apply(null,arguments)},_b2Body_GetWorldPoint=Module._b2Body_GetWorldPoint=function(){return Module.asm._b2Body_GetWorldPoint.apply(null,arguments)},_b2Body_GetWorldVector=Module._b2Body_GetWorldVector=function(){return Module.asm._b2Body_GetWorldVector.apply(null,arguments)},_b2Body_SetAngularVelocity=Module._b2Body_SetAngularVelocity=function(){return Module.asm._b2Body_SetAngularVelocity.apply(null,arguments)},_b2Body_SetAwake=Module._b2Body_SetAwake=function(){return Module.asm._b2Body_SetAwake.apply(null,arguments)},_b2Body_SetFixedRotation=Module._b2Body_SetFixedRotation=function(){return Module.asm._b2Body_SetFixedRotation.apply(null,arguments)},_b2Body_SetGravityScale=Module._b2Body_SetGravityScale=function(){return Module.asm._b2Body_SetGravityScale.apply(null,arguments)},_b2Body_SetLinearVelocity=Module._b2Body_SetLinearVelocity=function(){return Module.asm._b2Body_SetLinearVelocity.apply(null,arguments)},_b2Body_SetMassData=Module._b2Body_SetMassData=function(){return Module.asm._b2Body_SetMassData.apply(null,arguments)},_b2Body_SetTransform=Module._b2Body_SetTransform=function(){return Module.asm._b2Body_SetTransform.apply(null,arguments)},_b2Body_SetType=Module._b2Body_SetType=function(){return Module.asm._b2Body_SetType.apply(null,arguments)},_b2ChainShape_CreateFixture=Module._b2ChainShape_CreateFixture=function(){return Module.asm._b2ChainShape_CreateFixture.apply(null,arguments)},_b2CircleShape_CreateFixture=Module._b2CircleShape_CreateFixture=function(){return Module.asm._b2CircleShape_CreateFixture.apply(null,arguments)},_b2CircleShape_CreateParticleGroup=Module._b2CircleShape_CreateParticleGroup=function(){return Module.asm._b2CircleShape_CreateParticleGroup.apply(null,arguments)},_b2CircleShape_DestroyParticlesInShape=Module._b2CircleShape_DestroyParticlesInShape=function(){return Module.asm._b2CircleShape_DestroyParticlesInShape.apply(null,arguments)},_b2Contact_GetManifold=Module._b2Contact_GetManifold=function(){return Module.asm._b2Contact_GetManifold.apply(null,arguments)},_b2Contact_GetWorldManifold=Module._b2Contact_GetWorldManifold=function(){return Module.asm._b2Contact_GetWorldManifold.apply(null,arguments)},_b2DistanceJointDef_Create=Module._b2DistanceJointDef_Create=function(){return Module.asm._b2DistanceJointDef_Create.apply(null,arguments)},_b2DistanceJointDef_InitializeAndCreate=Module._b2DistanceJointDef_InitializeAndCreate=function(){return Module.asm._b2DistanceJointDef_InitializeAndCreate.apply(null,arguments)},_b2EdgeShape_CreateFixture=Module._b2EdgeShape_CreateFixture=function(){return Module.asm._b2EdgeShape_CreateFixture.apply(null,arguments)},_b2Fixture_Refilter=Module._b2Fixture_Refilter=function(){return Module.asm._b2Fixture_Refilter.apply(null,arguments)},_b2Fixture_TestPoint=Module._b2Fixture_TestPoint=function(){return Module.asm._b2Fixture_TestPoint.apply(null,arguments)},_b2FrictionJointDef_Create=Module._b2FrictionJointDef_Create=function(){return Module.asm._b2FrictionJointDef_Create.apply(null,arguments)},_b2FrictionJointDef_InitializeAndCreate=Module._b2FrictionJointDef_InitializeAndCreate=function(){return Module.asm._b2FrictionJointDef_InitializeAndCreate.apply(null,arguments)},_b2GearJointDef_Create=Module._b2GearJointDef_Create=function(){return Module.asm._b2GearJointDef_Create.apply(null,arguments)},_b2GearJoint_GetRatio=Module._b2GearJoint_GetRatio=function(){return Module.asm._b2GearJoint_GetRatio.apply(null,arguments)},_b2Joint_GetBodyA=Module._b2Joint_GetBodyA=function(){return Module.asm._b2Joint_GetBodyA.apply(null,arguments)},_b2Joint_GetBodyB=Module._b2Joint_GetBodyB=function(){return Module.asm._b2Joint_GetBodyB.apply(null,arguments)},_b2Manifold_GetPointCount=Module._b2Manifold_GetPointCount=function(){return Module.asm._b2Manifold_GetPointCount.apply(null,arguments)},_b2MotorJointDef_Create=Module._b2MotorJointDef_Create=function(){return Module.asm._b2MotorJointDef_Create.apply(null,arguments)},_b2MotorJointDef_InitializeAndCreate=Module._b2MotorJointDef_InitializeAndCreate=function(){return Module.asm._b2MotorJointDef_InitializeAndCreate.apply(null,arguments)},_b2MotorJoint_SetAngularOffset=Module._b2MotorJoint_SetAngularOffset=function(){return Module.asm._b2MotorJoint_SetAngularOffset.apply(null,arguments)},_b2MotorJoint_SetLinearOffset=Module._b2MotorJoint_SetLinearOffset=function(){return Module.asm._b2MotorJoint_SetLinearOffset.apply(null,arguments)},_b2MouseJointDef_Create=Module._b2MouseJointDef_Create=function(){return Module.asm._b2MouseJointDef_Create.apply(null,arguments)},_b2MouseJoint_SetTarget=Module._b2MouseJoint_SetTarget=function(){return Module.asm._b2MouseJoint_SetTarget.apply(null,arguments)},_b2ParticleGroup_ApplyForce=Module._b2ParticleGroup_ApplyForce=function(){return Module.asm._b2ParticleGroup_ApplyForce.apply(null,arguments)},_b2ParticleGroup_ApplyLinearImpulse=Module._b2ParticleGroup_ApplyLinearImpulse=function(){return Module.asm._b2ParticleGroup_ApplyLinearImpulse.apply(null,arguments)},_b2ParticleGroup_DestroyParticles=Module._b2ParticleGroup_DestroyParticles=function(){return Module.asm._b2ParticleGroup_DestroyParticles.apply(null,arguments)},_b2ParticleGroup_GetBufferIndex=Module._b2ParticleGroup_GetBufferIndex=function(){return Module.asm._b2ParticleGroup_GetBufferIndex.apply(null,arguments)},_b2ParticleGroup_GetParticleCount=Module._b2ParticleGroup_GetParticleCount=function(){return Module.asm._b2ParticleGroup_GetParticleCount.apply(null,arguments)},_b2ParticleSystem_CreateParticle=Module._b2ParticleSystem_CreateParticle=function(){return Module.asm._b2ParticleSystem_CreateParticle.apply(null,arguments)},_b2ParticleSystem_GetColorBuffer=Module._b2ParticleSystem_GetColorBuffer=function(){return Module.asm._b2ParticleSystem_GetColorBuffer.apply(null,arguments)},_b2ParticleSystem_GetParticleCount=Module._b2ParticleSystem_GetParticleCount=function(){return Module.asm._b2ParticleSystem_GetParticleCount.apply(null,arguments)},_b2ParticleSystem_GetParticleLifetime=Module._b2ParticleSystem_GetParticleLifetime=function(){return Module.asm._b2ParticleSystem_GetParticleLifetime.apply(null,arguments)},_b2ParticleSystem_GetPositionBuffer=Module._b2ParticleSystem_GetPositionBuffer=function(){return Module.asm._b2ParticleSystem_GetPositionBuffer.apply(null,arguments)},_b2ParticleSystem_GetVelocityBuffer=Module._b2ParticleSystem_GetVelocityBuffer=function(){return Module.asm._b2ParticleSystem_GetVelocityBuffer.apply(null,arguments)},_b2ParticleSystem_SetDamping=Module._b2ParticleSystem_SetDamping=function(){return Module.asm._b2ParticleSystem_SetDamping.apply(null,arguments)},_b2ParticleSystem_SetDensity=Module._b2ParticleSystem_SetDensity=function(){return Module.asm._b2ParticleSystem_SetDensity.apply(null,arguments)},_b2ParticleSystem_SetGravityScale=Module._b2ParticleSystem_SetGravityScale=function(){return Module.asm._b2ParticleSystem_SetGravityScale.apply(null,arguments)},_b2ParticleSystem_SetMaxParticleCount=Module._b2ParticleSystem_SetMaxParticleCount=function(){return Module.asm._b2ParticleSystem_SetMaxParticleCount.apply(null,arguments)},_b2ParticleSystem_SetParticleLifetime=Module._b2ParticleSystem_SetParticleLifetime=function(){return Module.asm._b2ParticleSystem_SetParticleLifetime.apply(null,arguments)},_b2ParticleSystem_SetRadius=Module._b2ParticleSystem_SetRadius=function(){return Module.asm._b2ParticleSystem_SetRadius.apply(null,arguments)},_b2PolygonShape_CreateFixture_3=Module._b2PolygonShape_CreateFixture_3=function(){return Module.asm._b2PolygonShape_CreateFixture_3.apply(null,arguments)},_b2PolygonShape_CreateFixture_4=Module._b2PolygonShape_CreateFixture_4=function(){return Module.asm._b2PolygonShape_CreateFixture_4.apply(null,arguments)},_b2PolygonShape_CreateFixture_5=Module._b2PolygonShape_CreateFixture_5=function(){return Module.asm._b2PolygonShape_CreateFixture_5.apply(null,arguments)},_b2PolygonShape_CreateFixture_6=Module._b2PolygonShape_CreateFixture_6=function(){return Module.asm._b2PolygonShape_CreateFixture_6.apply(null,arguments)},_b2PolygonShape_CreateFixture_7=Module._b2PolygonShape_CreateFixture_7=function(){return Module.asm._b2PolygonShape_CreateFixture_7.apply(null,arguments)},_b2PolygonShape_CreateFixture_8=Module._b2PolygonShape_CreateFixture_8=function(){return Module.asm._b2PolygonShape_CreateFixture_8.apply(null,arguments)},_b2PolygonShape_CreateParticleGroup_4=Module._b2PolygonShape_CreateParticleGroup_4=function(){return Module.asm._b2PolygonShape_CreateParticleGroup_4.apply(null,arguments)},_b2PolygonShape_DestroyParticlesInShape_4=Module._b2PolygonShape_DestroyParticlesInShape_4=function(){return Module.asm._b2PolygonShape_DestroyParticlesInShape_4.apply(null,arguments)},_b2PrismaticJointDef_Create=Module._b2PrismaticJointDef_Create=function(){return Module.asm._b2PrismaticJointDef_Create.apply(null,arguments)},_b2PrismaticJointDef_InitializeAndCreate=Module._b2PrismaticJointDef_InitializeAndCreate=function(){return Module.asm._b2PrismaticJointDef_InitializeAndCreate.apply(null,arguments)},_b2PrismaticJoint_EnableLimit=Module._b2PrismaticJoint_EnableLimit=function(){return Module.asm._b2PrismaticJoint_EnableLimit.apply(null,arguments)},_b2PrismaticJoint_EnableMotor=Module._b2PrismaticJoint_EnableMotor=function(){return Module.asm._b2PrismaticJoint_EnableMotor.apply(null,arguments)},_b2PrismaticJoint_GetJointTranslation=Module._b2PrismaticJoint_GetJointTranslation=function(){return Module.asm._b2PrismaticJoint_GetJointTranslation.apply(null,arguments)},_b2PrismaticJoint_GetMotorForce=Module._b2PrismaticJoint_GetMotorForce=function(){return Module.asm._b2PrismaticJoint_GetMotorForce.apply(null,arguments)},_b2PrismaticJoint_GetMotorSpeed=Module._b2PrismaticJoint_GetMotorSpeed=function(){return Module.asm._b2PrismaticJoint_GetMotorSpeed.apply(null,arguments)},_b2PrismaticJoint_IsLimitEnabled=Module._b2PrismaticJoint_IsLimitEnabled=function(){return Module.asm._b2PrismaticJoint_IsLimitEnabled.apply(null,arguments)},_b2PrismaticJoint_IsMotorEnabled=Module._b2PrismaticJoint_IsMotorEnabled=function(){return Module.asm._b2PrismaticJoint_IsMotorEnabled.apply(null,arguments)},_b2PrismaticJoint_SetMotorSpeed=Module._b2PrismaticJoint_SetMotorSpeed=function(){return Module.asm._b2PrismaticJoint_SetMotorSpeed.apply(null,arguments)},_b2PulleyJointDef_Create=Module._b2PulleyJointDef_Create=function(){return Module.asm._b2PulleyJointDef_Create.apply(null,arguments)},_b2PulleyJointDef_InitializeAndCreate=Module._b2PulleyJointDef_InitializeAndCreate=function(){return Module.asm._b2PulleyJointDef_InitializeAndCreate.apply(null,arguments)},_b2RevoluteJointDef_Create=Module._b2RevoluteJointDef_Create=function(){return Module.asm._b2RevoluteJointDef_Create.apply(null,arguments)},_b2RevoluteJointDef_InitializeAndCreate=Module._b2RevoluteJointDef_InitializeAndCreate=function(){return Module.asm._b2RevoluteJointDef_InitializeAndCreate.apply(null,arguments)},_b2RevoluteJoint_EnableLimit=Module._b2RevoluteJoint_EnableLimit=function(){return Module.asm._b2RevoluteJoint_EnableLimit.apply(null,arguments)},_b2RevoluteJoint_EnableMotor=Module._b2RevoluteJoint_EnableMotor=function(){return Module.asm._b2RevoluteJoint_EnableMotor.apply(null,arguments)},_b2RevoluteJoint_GetJointAngle=Module._b2RevoluteJoint_GetJointAngle=function(){return Module.asm._b2RevoluteJoint_GetJointAngle.apply(null,arguments)},_b2RevoluteJoint_IsLimitEnabled=Module._b2RevoluteJoint_IsLimitEnabled=function(){return Module.asm._b2RevoluteJoint_IsLimitEnabled.apply(null,arguments)},_b2RevoluteJoint_IsMotorEnabled=Module._b2RevoluteJoint_IsMotorEnabled=function(){return Module.asm._b2RevoluteJoint_IsMotorEnabled.apply(null,arguments)},_b2RevoluteJoint_SetMotorSpeed=Module._b2RevoluteJoint_SetMotorSpeed=function(){return Module.asm._b2RevoluteJoint_SetMotorSpeed.apply(null,arguments)},_b2RopeJointDef_Create=Module._b2RopeJointDef_Create=function(){return Module.asm._b2RopeJointDef_Create.apply(null,arguments)},_b2WeldJointDef_Create=Module._b2WeldJointDef_Create=function(){return Module.asm._b2WeldJointDef_Create.apply(null,arguments)},_b2WeldJointDef_InitializeAndCreate=Module._b2WeldJointDef_InitializeAndCreate=function(){return Module.asm._b2WeldJointDef_InitializeAndCreate.apply(null,arguments)},_b2WheelJointDef_Create=Module._b2WheelJointDef_Create=function(){return Module.asm._b2WheelJointDef_Create.apply(null,arguments)},_b2WheelJointDef_InitializeAndCreate=Module._b2WheelJointDef_InitializeAndCreate=function(){return Module.asm._b2WheelJointDef_InitializeAndCreate.apply(null,arguments)},_b2WheelJoint_SetMotorSpeed=Module._b2WheelJoint_SetMotorSpeed=function(){return Module.asm._b2WheelJoint_SetMotorSpeed.apply(null,arguments)},_b2WheelJoint_SetSpringFrequencyHz=Module._b2WheelJoint_SetSpringFrequencyHz=function(){return Module.asm._b2WheelJoint_SetSpringFrequencyHz.apply(null,arguments)},_b2World_Create=Module._b2World_Create=function(){return Module.asm._b2World_Create.apply(null,arguments)},_b2World_CreateBody=Module._b2World_CreateBody=function(){return Module.asm._b2World_CreateBody.apply(null,arguments)},_b2World_CreateParticleSystem=Module._b2World_CreateParticleSystem=function(){return Module.asm._b2World_CreateParticleSystem.apply(null,arguments)},_b2World_Delete=Module._b2World_Delete=function(){return Module.asm._b2World_Delete.apply(null,arguments)},_b2World_DestroyBody=Module._b2World_DestroyBody=function(){return Module.asm._b2World_DestroyBody.apply(null,arguments)},_b2World_DestroyJoint=Module._b2World_DestroyJoint=function(){return Module.asm._b2World_DestroyJoint.apply(null,arguments)},_b2World_DestroyParticleSystem=Module._b2World_DestroyParticleSystem=function(){return Module.asm._b2World_DestroyParticleSystem.apply(null,arguments)},_b2World_QueryAABB=Module._b2World_QueryAABB=function(){return Module.asm._b2World_QueryAABB.apply(null,arguments)},_b2World_RayCast=Module._b2World_RayCast=function(){return Module.asm._b2World_RayCast.apply(null,arguments)},_b2World_SetContactListener=Module._b2World_SetContactListener=function(){return Module.asm._b2World_SetContactListener.apply(null,arguments)},_b2World_SetGravity=Module._b2World_SetGravity=function(){return Module.asm._b2World_SetGravity.apply(null,arguments)},_b2World_Step=Module._b2World_Step=function(){return Module.asm._b2World_Step.apply(null,arguments)},_free=Module._free=function(){return Module.asm._free.apply(null,arguments)},_llvm_bswap_i32=Module._llvm_bswap_i32=function(){return Module.asm._llvm_bswap_i32.apply(null,arguments)},_malloc=Module._malloc=function(){return Module.asm._malloc.apply(null,arguments)},_memcpy=Module._memcpy=function(){return Module.asm._memcpy.apply(null,arguments)},_memmove=Module._memmove=function(){return Module.asm._memmove.apply(null,arguments)},_memset=Module._memset=function(){return Module.asm._memset.apply(null,arguments)},_sbrk=Module._sbrk=function(){return Module.asm._sbrk.apply(null,arguments)},establishStackSpace=Module.establishStackSpace=function(){return Module.asm.establishStackSpace.apply(null,arguments)},setThrew=Module.setThrew=function(){return Module.asm.setThrew.apply(null,arguments)},stackAlloc=Module.stackAlloc=function(){return Module.asm.stackAlloc.apply(null,arguments)},stackRestore=Module.stackRestore=function(){return Module.asm.stackRestore.apply(null,arguments)},stackSave=Module.stackSave=function(){return Module.asm.stackSave.apply(null,arguments)},dynCall_fif=Module.dynCall_fif=function(){return Module.asm.dynCall_fif.apply(null,arguments)},dynCall_fiiiif=Module.dynCall_fiiiif=function(){return Module.asm.dynCall_fiiiif.apply(null,arguments)},dynCall_fiiiiif=Module.dynCall_fiiiiif=function(){return Module.asm.dynCall_fiiiiif.apply(null,arguments)},dynCall_ii=Module.dynCall_ii=function(){return Module.asm.dynCall_ii.apply(null,arguments)},dynCall_iii=Module.dynCall_iii=function(){return Module.asm.dynCall_iii.apply(null,arguments)},dynCall_iiii=Module.dynCall_iiii=function(){return Module.asm.dynCall_iiii.apply(null,arguments)},dynCall_iiiii=Module.dynCall_iiiii=function(){return Module.asm.dynCall_iiiii.apply(null,arguments)},dynCall_iiiiii=Module.dynCall_iiiiii=function(){return Module.asm.dynCall_iiiiii.apply(null,arguments)},dynCall_v=Module.dynCall_v=function(){return Module.asm.dynCall_v.apply(null,arguments)},dynCall_vi=Module.dynCall_vi=function(){return Module.asm.dynCall_vi.apply(null,arguments)},dynCall_vii=Module.dynCall_vii=function(){return Module.asm.dynCall_vii.apply(null,arguments)},dynCall_viif=Module.dynCall_viif=function(){return Module.asm.dynCall_viif.apply(null,arguments)},dynCall_viii=Module.dynCall_viii=function(){return Module.asm.dynCall_viii.apply(null,arguments)},dynCall_viiii=Module.dynCall_viiii=function(){return Module.asm.dynCall_viiii.apply(null,arguments)},dynCall_viiiii=Module.dynCall_viiiii=function(){return Module.asm.dynCall_viiiii.apply(null,arguments)},dynCall_viiiiii=Module.dynCall_viiiiii=function(){return Module.asm.dynCall_viiiiii.apply(null,arguments)};function ExitStatus(e){this.name="ExitStatus",this.message="Program terminated with exit("+e+")",this.status=e}function run(e){function t(){Module.calledRun||(Module.calledRun=!0,ABORT||(ensureInitRuntime(),preMain(),Module.onRuntimeInitialized&&Module.onRuntimeInitialized(),postRun()))}e=e||Module.arguments,0<runDependencies||(preRun(),0<runDependencies||Module.calledRun||(Module.setStatus?(Module.setStatus("Running..."),setTimeout(function(){setTimeout(function(){Module.setStatus("")},1),t()},1)):t()))}function abort(e){throw Module.onAbort&&Module.onAbort(e),e=void 0!==e?(out(e),err(e),JSON.stringify(e)):"",ABORT=!0,EXITSTATUS=1,"abort("+e+"). Build with -s ASSERTIONS=1 for more info."}if(Module.asm=asm,ExitStatus.prototype=new Error,ExitStatus.prototype.constructor=ExitStatus,dependenciesFulfilled=function e(){Module.calledRun||run(),Module.calledRun||(dependenciesFulfilled=e)},Module.run=run,Module.abort=abort,Module.preInit)for("function"==typeof Module.preInit&&(Module.preInit=[Module.preInit]);0<Module.preInit.length;)Module.preInit.pop()();Module.noExitRuntime=!0,run();var Offsets={b2Body:{type:0,islandIndex:8,xf:12,xf0:28,sweep:44,linearVelocity:80,angularVelocity:88,force:92,torque:100,world:104,prev:108,next:112,fixtureList:116,fixtureCount:120,jointList:124,contactList:128,mass:132,invMass:136,I:140,invI:144,linearDamping:148,angularDamping:152,gravityScale:156,sleepTime:160,userData:164},b2Contact:{flags:4,prev:8,next:12,nodeA:16,nodeB:32,fixtureA:48,fixtureB:52,indexA:56,indexB:60,manifold:64,toiCount:128,toi:132,friction:136,restitution:140,tangentSpeed:144},b2Fixture:{density:0,next:4,body:8,shape:12,friction:16,restitution:20,proxies:24,proxyCount:28,filter:32,filterCategoryBits:32,filterMaskBits:34,filterGroupIndex:36,isSensor:38,userData:40},b2ParticleGroup:{system:0,firstIndex:4,lastIndex:8,groupFlags:12,strength:16,prev:20,next:24,timestamp:28,mass:32,inertia:36,center:40,linearVelocity:48,angularVelocity:56,transform:60,userData:76},b2WorldManifold:{normal:0,points:8,separations:24},b2World:{bodyList:102960}},FLT_EPSILON=1.1920929e-7;function b2Max(e,t){return new b2Vec2(Math.max(e.x,t.x),Math.max(e.y,t.y))}function b2Min(e,t){return new b2Vec2(Math.min(e.x,t.x),Math.min(e.y,t.y))}function b2Clamp(e,t,o){return b2Max(t,b2Min(e,o))}function b2Vec2(e,t){void 0===e&&(e=0),void 0===t&&(t=0),this.x=e,this.y=t}function b2Rot(e){void 0===e&&(e=0),this.s=Math.sin(e),this.c=Math.cos(e)}function b2Transform(e,t){void 0===e&&(e=new b2Vec2),void 0===t&&(t=new b2Rot),this.p=e,this.q=t}function b2AABB(){this.lowerBound=new b2Vec2,this.upperBound=new b2Vec2}b2Vec2.Add=function(e,t,o){e.x=t.x+o.x,e.y=t.y+o.y},b2Vec2.CrossScalar=function(e,t,o){e.x=-o*t.y,e.y=o*t.x},b2Vec2.Cross=function(e,t){return e.x*t.y-e.y*t.x},b2Vec2.MulScalar=function(e,t,o){e.x=t.x*o,e.y=t.y*o},b2Vec2.Mul=function(e,t,o){var r=t.p,i=t.q.c,n=t.q.s,l=o.x,a=o.y;e.x=i*l-n*a+r.x,e.y=n*l+i*a+r.y},b2Vec2.Normalize=function(e,t){var o=t.Length();if(o<FLT_EPSILON)return e.x=0,void(e.y=0);var r=1/o;e.x=t.x*r,e.y=t.y*r},b2Vec2.Sub=function(e,t,o){e.x=t.x-o.x,e.y=t.y-o.y},b2Vec2.prototype.Clone=function(){return new b2Vec2(this.x,this.y)},b2Vec2.prototype.Set=function(e,t){this.x=e,this.y=t},b2Vec2.prototype.Length=function(){var e=this.x,t=this.y;return Math.sqrt(e*e+t*t)},b2Vec2.prototype.LengthSquared=function(){var e=this.x,t=this.y;return e*e+t*t},b2Rot.prototype.Set=function(e){this.s=Math.sin(e),this.c=Math.cos(e)},b2Rot.prototype.SetIdentity=function(){this.s=0,this.c=1},b2Rot.prototype.GetXAxis=function(){return new b2Vec2(this.c,this.s)},b2Transform.prototype.FromFloat64Array=function(e){var t=this.p,o=this.q;t.x=e[0],t.y=e[1],o.s=e[2],o.c=e[3]},b2Transform.prototype.SetIdentity=function(){this.p.Set(0,0),this.q.SetIdentity()},b2AABB.prototype.GetCenter=function(){var e=new b2Vec2;b2Vec2.Add(e,this.lowerBound,this.upperBound),b2Vec2.MulScalar(e,e,.5)};var b2Manifold_GetPointCount=Module._b2Manifold_GetPointCount;function b2Manifold(e){this.ptr=e}b2Manifold.prototype.GetPointCount=function(){return b2Manifold_GetPointCount(this.ptr)};var b2WorldManifold_points_offset=Offsets.b2WorldManifold.points;function b2WorldManifold(e){this.buffer=new DataView(Module.HEAPU8.buffer,e),this.ptr=e}b2WorldManifold.prototype.GetPoint=function(e){var t=new b2Vec2;return t.x=this.buffer.getFloat32(8*e+b2WorldManifold_points_offset,!0),t.y=this.buffer.getFloat32(8*e+4+b2WorldManifold_points_offset,!0),t};var b2EdgeShape_CreateFixture=Module._b2EdgeShape_CreateFixture;function b2EdgeShape(){this.hasVertex0=!1,this.hasVertex3=!1,this.vertex0=new b2Vec2,this.vertex1=new b2Vec2,this.vertex2=new b2Vec2,this.vertex3=new b2Vec2,this.type=b2Shape_Type_e_edge}b2EdgeShape.prototype.Set=function(e,t){this.vertex1=e,this.vertex2=t,this.hasVertex0=!1,this.hasVertex3=!1},b2EdgeShape.prototype._CreateFixture=function(e,t){return b2EdgeShape_CreateFixture(e.ptr,t.density,t.friction,t.isSensor,t.restitution,t.userData,t.filter.categoryBits,t.filter.groupIndex,t.filter.maskBits,this.hasVertex0,this.hasVertex3,this.vertex0.x,this.vertex0.y,this.vertex1.x,this.vertex1.y,this.vertex2.x,this.vertex2.y,this.vertex3.x,this.vertex3.y)};var b2PolygonShape_CreateFixture_3=Module._b2PolygonShape_CreateFixture_3,b2PolygonShape_CreateFixture_4=Module._b2PolygonShape_CreateFixture_4,b2PolygonShape_CreateFixture_5=Module._b2PolygonShape_CreateFixture_5,b2PolygonShape_CreateFixture_6=Module._b2PolygonShape_CreateFixture_6,b2PolygonShape_CreateFixture_7=Module._b2PolygonShape_CreateFixture_7,b2PolygonShape_CreateFixture_8=Module._b2PolygonShape_CreateFixture_8,b2PolygonShape_CreateParticleGroup_4=Module._b2PolygonShape_CreateParticleGroup_4,b2PolygonShape_DestroyParticlesInShape_4=Module._b2PolygonShape_DestroyParticlesInShape_4;function b2PolygonShape(){this.position=new b2Vec2,this.vertices=[],this.type=b2Shape_Type_e_polygon}b2PolygonShape.prototype.SetAsBoxXY=function(e,t){this.vertices[0]=new b2Vec2(-e,-t),this.vertices[1]=new b2Vec2(e,-t),this.vertices[2]=new b2Vec2(e,t),this.vertices[3]=new b2Vec2(-e,t)},b2PolygonShape.prototype.SetAsBoxXYCenterAngle=function(e,t,o,r){this.vertices[0]=new b2Vec2(-e,-t),this.vertices[1]=new b2Vec2(e,-t),this.vertices[2]=new b2Vec2(e,t),this.vertices[3]=new b2Vec2(-e,t);var i=new b2Transform;i.p=o,i.q.Set(r);for(var n=0;n<4;n++)b2Vec2.Mul(this.vertices[n],i,this.vertices[n])},b2PolygonShape.prototype._CreateFixture=function(e,t){var o=this.vertices;switch(o.length){case 3:var r=o[0],i=o[1],n=o[2];return b2PolygonShape_CreateFixture_3(e.ptr,t.density,t.friction,t.isSensor,t.restitution,t.userData,t.filter.categoryBits,t.filter.groupIndex,t.filter.maskBits,r.x,r.y,i.x,i.y,n.x,n.y);case 4:r=o[0],i=o[1],n=o[2];var l=o[3];return b2PolygonShape_CreateFixture_4(e.ptr,t.density,t.friction,t.isSensor,t.restitution,t.userData,t.filter.categoryBits,t.filter.groupIndex,t.filter.maskBits,r.x,r.y,i.x,i.y,n.x,n.y,l.x,l.y);case 5:r=o[0],i=o[1],n=o[2],l=o[3];var a=o[4];return b2PolygonShape_CreateFixture_5(e.ptr,t.density,t.friction,t.isSensor,t.restitution,t.userData,t.filter.categoryBits,t.filter.groupIndex,t.filter.maskBits,r.x,r.y,i.x,i.y,n.x,n.y,l.x,l.y,a.x,a.y);case 6:r=o[0],i=o[1],n=o[2],l=o[3],a=o[4];var u=o[5];return b2PolygonShape_CreateFixture_6(e.ptr,t.density,t.friction,t.isSensor,t.restitution,t.userData,t.filter.categoryBits,t.filter.groupIndex,t.filter.maskBits,r.x,r.y,i.x,i.y,n.x,n.y,l.x,l.y,a.x,a.y,u.x,u.y);case 7:r=o[0],i=o[1],n=o[2],l=o[3],a=o[4],u=o[5];var s=o[6];return b2PolygonShape_CreateFixture_7(e.ptr,t.density,t.friction,t.isSensor,t.restitution,t.userData,t.filter.categoryBits,t.filter.groupIndex,t.filter.maskBits,r.x,r.y,i.x,i.y,n.x,n.y,l.x,l.y,a.x,a.y,u.x,u.y,s.x,s.y);case 8:r=o[0],i=o[1],n=o[2],l=o[3],a=o[4],u=o[5],s=o[6];var _=o[7];return b2PolygonShape_CreateFixture_8(e.ptr,t.density,t.friction,t.isSensor,t.restitution,t.userData,t.filter.categoryBits,t.filter.groupIndex,t.filter.maskBits,r.x,r.y,i.x,i.y,n.x,n.y,l.x,l.y,a.x,a.y,u.x,u.y,s.x,s.y,s.x,_.y)}},b2PolygonShape.prototype._CreateParticleGroup=function(e,t){var o=this.vertices;switch(o.length){case 3:break;case 4:return b2PolygonShape_CreateParticleGroup_4(e.ptr,t.angle,t.angularVelocity,t.color.r,t.color.g,t.color.b,t.color.a,t.flags,t.group.ptr,t.groupFlags,t.lifetime,t.linearVelocity.x,t.linearVelocity.y,t.position.x,t.position.y,t.positionData,t.particleCount,t.strength,t.stride,t.userData,o[0].x,o[0].y,o[1].x,o[1].y,o[2].x,o[2].y,o[3].x,o[3].y)}},b2PolygonShape.prototype._DestroyParticlesInShape=function(e,t){var o=this.vertices;switch(o.length){case 3:break;case 4:return b2PolygonShape_DestroyParticlesInShape_4(e.ptr,o[0].x,o[0].y,o[1].x,o[1].y,o[2].x,o[2].y,o[3].x,o[3].y,t.p.x,t.p.y,t.q.s,t.q.c)}},b2PolygonShape.prototype.Validate=function(){for(var e=0,t=this.vertices.length;e<t;++e){var o=e,r=e<t-1?o+1:0,i=this.vertices[o],n=this.vertices[r],l=new b2Vec2;b2Vec2.Sub(l,n,i);for(var a=0;a<t;++a)if(a!=o&&a!=r){var u=new b2Vec2;if(b2Vec2.Sub(u,this.vertices[a],i),b2Vec2.Cross(l,u)<0)return!1}}return!0};var b2Shape_Type_e_circle=0,b2Shape_Type_e_edge=1,b2Shape_Type_e_polygon=2,b2Shape_Type_e_chain=3,b2Shape_Type_e_typeCount=4,b2_linearSlop=.005,b2_polygonRadius=2*b2_linearSlop,b2_maxPolygonVertices=8;function b2MassData(e,t,o){this.mass=e,this.center=t,this.I=o}var b2ChainShape_CreateFixture=Module._b2ChainShape_CreateFixture;function b2ChainShape(){this.radius=b2_polygonRadius,this.vertices=[],this.type=b2Shape_Type_e_chain}b2ChainShape.prototype.CreateLoop=function(){this.vertices.push(this.vertices[0])},b2ChainShape.prototype._CreateFixture=function(e,t){for(var o=this.vertices,r=2*o.length,i=new Float32Array(r),n=0,l=0;n<r;n+=2,l++)i[n]=o[l].x,i[n+1]=o[l].y;var a=i.length*i.BYTES_PER_ELEMENT,u=Module._malloc(a),s=new Uint8Array(Module.HEAPU8.buffer,u,a);s.set(new Uint8Array(i.buffer));var _=b2ChainShape_CreateFixture(e.ptr,t.density,t.friction,t.isSensor,t.restitution,t.userData,t.filter.categoryBits,t.filter.groupIndex,t.filter.maskBits,s.byteOffset,i.length);return Module._free(s.byteOffset),_};var b2CircleShape_CreateFixture=Module._b2CircleShape_CreateFixture,b2CircleShape_CreateParticleGroup=Module._b2CircleShape_CreateParticleGroup,b2CircleShape_DestroyParticlesInShape=Module._b2CircleShape_DestroyParticlesInShape;function b2CircleShape(){this.position=new b2Vec2,this.radius=0,this.type=b2Shape_Type_e_circle}b2CircleShape.prototype._CreateFixture=function(e,t){return b2CircleShape_CreateFixture(e.ptr,t.density,t.friction,t.isSensor,t.restitution,t.userData,t.filter.categoryBits,t.filter.groupIndex,t.filter.maskBits,this.position.x,this.position.y,this.radius)},b2CircleShape.prototype._CreateParticleGroup=function(e,t){return b2CircleShape_CreateParticleGroup(e.ptr,t.angle,t.angularVelocity,t.color.r,t.color.g,t.color.b,t.color.a,t.flags,t.group.ptr,t.groupFlags,t.lifetime,t.linearVelocity.x,t.linearVelocity.y,t.position.x,t.position.y,t.positionData,t.particleCount,t.strength,t.stride,t.userData,this.position.x,this.position.y,this.radius)},b2CircleShape.prototype._DestroyParticlesInShape=function(e,t){return b2CircleShape_DestroyParticlesInShape(e.ptr,this.position.x,this.position.y,this.radius,t.p.x,t.p.y,t.q.s,t.q.c)};var b2Body_ApplyAngularImpulse=Module._b2Body_ApplyAngularImpulse,b2Body_ApplyLinearImpulse=Module._b2Body_ApplyLinearImpulse,b2Body_ApplyForce=Module._b2Body_ApplyForce,b2Body_ApplyForceToCenter=Module._b2Body_ApplyForceToCenter,b2Body_ApplyTorque=Module._b2Body_ApplyTorque,b2Body_DestroyFixture=Module._b2Body_DestroyFixture,b2Body_GetAngle=Module._b2Body_GetAngle,b2Body_GetAngularVelocity=Module._b2Body_GetAngularVelocity,b2Body_GetInertia=Module._b2Body_GetInertia,b2Body_GetLinearVelocity=Module._b2Body_GetLinearVelocity,b2Body_GetLocalPoint=Module._b2Body_GetLocalPoint,b2Body_GetLocalVector=Module._b2Body_GetLocalVector,b2Body_GetMass=Module._b2Body_GetMass,b2Body_GetPosition=Module._b2Body_GetPosition,b2Body_GetTransform=Module._b2Body_GetTransform,b2Body_GetType=Module._b2Body_GetType,b2Body_GetWorldCenter=Module._b2Body_GetWorldCenter,b2Body_GetWorldPoint=Module._b2Body_GetWorldPoint,b2Body_GetWorldVector=Module._b2Body_GetWorldVector,b2Body_SetAngularVelocity=Module._b2Body_SetAngularVelocity,b2Body_SetAwake=Module._b2Body_SetAwake,b2Body_SetFixedRotation=Module._b2Body_SetFixedRotation,b2Body_SetLinearVelocity=Module._b2Body_SetLinearVelocity,b2Body_SetMassData=Module._b2Body_SetMassData,b2Body_SetTransform=Module._b2Body_SetTransform,b2Body_SetType=Module._b2Body_SetType,b2Body_SetGravityScale=Module._b2Body_SetGravityScale,b2Body_GetGravityScale=Module._b2Body_GetGravityScale,b2Body_xf_offset=Offsets.b2Body.xf,b2Body_userData_offset=Offsets.b2Body.userData;function b2Body(e){this.buffer=new DataView(Module.HEAPU8.buffer,e),this.ptr=e,this.fixtures=[]}b2Body.prototype.ApplyAngularImpulse=function(e,t){b2Body_ApplyAngularImpulse(this.ptr,e,t)},b2Body.prototype.ApplyLinearImpulse=function(e,t,o){b2Body_ApplyLinearImpulse(this.ptr,e.x,e.y,t.x,t.y,o)},b2Body.prototype.ApplyForce=function(e,t,o){b2Body_ApplyForce(this.ptr,e.x,e.y,t.x,t.y,o)},b2Body.prototype.ApplyForceToCenter=function(e,t){b2Body_ApplyForceToCenter(this.ptr,e.x,e.y,t)},b2Body.prototype.ApplyTorque=function(e,t){b2Body_ApplyTorque(this.ptr,e,t)},b2Body.prototype.CreateFixtureFromDef=function(e){var t=new b2Fixture;return t.FromFixtureDef(e),t._SetPtr(e.shape._CreateFixture(this,e)),t.body=this,b2World._Push(t,this.fixtures),(world.fixturesLookup[t.ptr]=t).SetFilterData(e.filter),t},b2Body.prototype.CreateFixtureFromShape=function(e,t){var o=new b2FixtureDef;return o.shape=e,o.density=t,this.CreateFixtureFromDef(o)},b2Body.prototype.DestroyFixture=function(e){b2Body_DestroyFixture(this.ptr,e.ptr),b2World._RemoveItem(e,this.fixtures)},b2Body.prototype.GetAngle=function(){return b2Body_GetAngle(this.ptr)},b2Body.prototype.GetAngularVelocity=function(){return b2Body_GetAngularVelocity(this.ptr)},b2Body.prototype.GetInertia=function(){return b2Body_GetInertia(this.ptr)},b2Body.prototype.GetMass=function(){return b2Body_GetMass(this.ptr)},b2Body.prototype.GetLinearVelocity=function(){b2Body_GetLinearVelocity(this.ptr,_vec2Buf.byteOffset);var e=new Float32Array(_vec2Buf.buffer,_vec2Buf.byteOffset,_vec2Buf.length);return new b2Vec2(e[0],e[1])},b2Body.prototype.GetLocalPoint=function(e){b2Body_GetLocalPoint(this.ptr,e.x,e.y,_vec2Buf.byteOffset);var t=new Float32Array(_vec2Buf.buffer,_vec2Buf.byteOffset,_vec2Buf.length);return new b2Vec2(t[0],t[1])},b2Body.prototype.GetLocalVector=function(e){b2Body_GetLocalVector(this.ptr,e.x,e.y,_vec2Buf.byteOffset);var t=new Float32Array(_vec2Buf.buffer,_vec2Buf.byteOffset,_vec2Buf.length);return new b2Vec2(t[0],t[1])},b2Body.prototype.GetPosition=function(){b2Body_GetPosition(this.ptr,_vec2Buf.byteOffset);var e=new Float32Array(_vec2Buf.buffer,_vec2Buf.byteOffset,_vec2Buf.length);return new b2Vec2(e[0],e[1])},b2Body.prototype.GetTransform=function(){var e=new b2Transform;return e.p.x=this.buffer.getFloat32(b2Body_xf_offset,!0),e.p.y=this.buffer.getFloat32(b2Body_xf_offset+4,!0),e.q.s=this.buffer.getFloat32(b2Body_xf_offset+8,!0),e.q.c=this.buffer.getFloat32(b2Body_xf_offset+12,!0),e},b2Body.prototype.GetType=function(){return b2Body_GetType(this.ptr)},b2Body.prototype.GetUserData=function(){return this.buffer.getUint32(b2Body_userData_offset,!0)},b2Body.prototype.GetWorldCenter=function(){b2Body_GetWorldCenter(this.ptr,_vec2Buf.byteOffset);var e=new Float32Array(_vec2Buf.buffer,_vec2Buf.byteOffset,_vec2Buf.length);return new b2Vec2(e[0],e[1])},b2Body.prototype.GetWorldPoint=function(e){b2Body_GetWorldPoint(this.ptr,e.x,e.y,_vec2Buf.byteOffset);var t=new Float32Array(_vec2Buf.buffer,_vec2Buf.byteOffset,_vec2Buf.length);return new b2Vec2(t[0],t[1])},b2Body.prototype.GetWorldVector=function(e){b2Body_GetWorldVector(this.ptr,e.x,e.y,_vec2Buf.byteOffset);var t=new Float32Array(_vec2Buf.buffer,_vec2Buf.byteOffset,_vec2Buf.length);return new b2Vec2(t[0],t[1])},b2Body.prototype.SetAngularVelocity=function(e){b2Body_SetAngularVelocity(this.ptr,e)},b2Body.prototype.SetAwake=function(e){b2Body_SetAwake(this.ptr,e)},b2Body.prototype.SetFixedRotation=function(e){b2Body_SetFixedRotation(this.ptr,e)},b2Body.prototype.SetLinearVelocity=function(e){b2Body_SetLinearVelocity(this.ptr,e.x,e.y)},b2Body.prototype.SetMassData=function(e){b2Body_SetMassData(this.ptr,e.mass,e.center.x,e.center.y,e.I)},b2Body.prototype.SetTransform=function(e,t){b2Body_SetTransform(this.ptr,e.x,e.y,t)},b2Body.prototype.SetType=function(e){b2Body_SetType(this.ptr,e)},b2Body.prototype.SetGravityScale=function(e){b2Body_SetGravityScale(this.ptr,e)},b2Body.prototype.GetGravityScale=function(){return b2Body_GetGravityScale(this.ptr)};var b2_staticBody=0,b2_kinematicBody=1,b2_dynamicBody=2;function b2BodyDef(){this.active=!0,this.allowSleep=!0,this.angle=0,this.angularVelocity=0,this.angularDamping=0,this.awake=!0,this.bullet=!1,this.fixedRotation=!1,this.gravityScale=1,this.linearDamping=0,this.linearVelocity=new b2Vec2,this.position=new b2Vec2,this.type=b2_staticBody,this.userData=null}b2World.BeginContactBody=function(e){if(void 0!==world.listener.BeginContactBody){var t=new b2Contact(e);world.listener.BeginContactBody(t)}},b2World.EndContactBody=function(e){if(void 0!==world.listener.EndContactBody){var t=new b2Contact(e);world.listener.EndContactBody(t)}},b2World.PreSolve=function(e,t){void 0!==world.listener.PreSolve&&world.listener.PreSolve(new b2Contact(e),new b2Manifold(t))},b2World.PostSolve=function(e,t){void 0!==world.listener.PostSolve&&world.listener.PostSolve(new b2Contact(e),new b2ContactImpulse(t))},b2World.QueryAABB=function(e){return world.queryAABBCallback.ReportFixture(world.fixturesLookup[e])},b2World.RayCast=function(e,t,o,r,i,n){return world.rayCastCallback.ReportFixture(world.fixturesLookup[e],new b2Vec2(t,o),new b2Vec2(r,i),n)};var b2World_Create=Module._b2World_Create,b2World_CreateBody=Module._b2World_CreateBody,b2World_CreateParticleSystem=Module._b2World_CreateParticleSystem,b2World_DestroyBody=Module._b2World_DestroyBody,b2World_DestroyJoint=Module._b2World_DestroyJoint,b2World_DestroyParticleSystem=Module._b2World_DestroyParticleSystem,b2World_QueryAABB=Module._b2World_QueryAABB,b2World_RayCast=Module._b2World_RayCast,b2World_SetContactListener=Module._b2World_SetContactListener,b2World_SetGravity=Module._b2World_SetGravity,b2World_Step=Module._b2World_Step,_transBuf=null,_vec2Buf=null;function b2World(e){this.bodies=[],this.bodiesLookup={},this.fixturesLookup={},this.joints=[],this.listener=null,this.particleSystems=[],this.ptr=b2World_Create(e.x,e.y),this.queryAABBCallback=null,this.rayCastCallback=null,this.buffer=new DataView(Module.HEAPU8.buffer,this.ptr);var t=4*Float32Array.BYTES_PER_ELEMENT,o=Module._malloc(t);_transBuf=new Uint8Array(Module.HEAPU8.buffer,o,t),t=2*Float32Array.BYTES_PER_ELEMENT,o=Module._malloc(t),_vec2Buf=new Uint8Array(Module.HEAPU8.buffer,o,t)}b2World._Push=function(e,t){e.lindex=t.length,t.push(e)},b2World._RemoveItem=function(e,t){var o=t.length,r=e.lindex;1<o&&(t[r]=t[o-1],t[r].lindex=r),t.pop()},b2World.prototype.CreateBody=function(e){var t=new b2Body(b2World_CreateBody(this.ptr,e.active,e.allowSleep,e.angle,e.angularVelocity,e.angularDamping,e.awake,e.bullet,e.fixedRotation,e.gravityScale,e.linearDamping,e.linearVelocity.x,e.linearVelocity.y,e.position.x,e.position.y,e.type,e.userData));return b2World._Push(t,this.bodies),this.bodiesLookup[t.ptr]=t},b2World.prototype.CreateJoint=function(e){var t=e.Create(this);return b2World._Push(t,this.joints),t},b2World.prototype.CreateParticleSystem=function(e){var t=new b2ParticleSystem(b2World_CreateParticleSystem(this.ptr,e.colorMixingStrength,e.dampingStrength,e.destroyByAge,e.ejectionStrength,e.elasticStrength,e.lifetimeGranularity,e.powderStrength,e.pressureStrength,e.radius,e.repulsiveStrength,e.springStrength,e.staticPressureIterations,e.staticPressureRelaxation,e.staticPressureStrength,e.surfaceTensionNormalStrength,e.surfaceTensionPressureStrength,e.viscousStrength));return b2World._Push(t,this.particleSystems),t.dampingStrength=e.dampingStrength,t.radius=e.radius,t},b2World.prototype.DestroyBody=function(e){b2World_DestroyBody(this.ptr,e.ptr),b2World._RemoveItem(e,this.bodies)},b2World.prototype.DestroyJoint=function(e){b2World_DestroyJoint(this.ptr,e.ptr),b2World._RemoveItem(e,this.joints)},b2World.prototype.DestroyParticleSystem=function(e){b2World_DestroyParticleSystem(this.ptr,e.ptr),b2World._RemoveItem(e,this.particleSystems)},b2World.prototype.QueryAABB=function(e,t){this.queryAABBCallback=e,b2World_QueryAABB(this.ptr,t.lowerBound.x,t.lowerBound.y,t.upperBound.x,t.upperBound.y)},b2World.prototype.RayCast=function(e,t,o){this.rayCastCallback=e,b2World_RayCast(this.ptr,t.x,t.y,o.x,o.y)},b2World.prototype.SetContactListener=function(e){this.listener=e,b2World_SetContactListener(this.ptr)},b2World.prototype.SetGravity=function(e){b2World_SetGravity(this.ptr,e.x,e.y)},b2World.prototype.Step=function(e,t,o){b2World_Step(this.ptr,e,t,o)};var b2WheelJoint_SetMotorSpeed=Module._b2WheelJoint_SetMotorSpeed,b2WheelJoint_SetSpringFrequencyHz=Module._b2WheelJoint_SetSpringFrequencyHz;function b2WheelJoint(e){this.next=null,this.ptr=null}b2WheelJoint.prototype.SetMotorSpeed=function(e){b2WheelJoint_SetMotorSpeed(this.ptr,e)},b2WheelJoint.prototype.SetSpringFrequencyHz=function(e){b2WheelJoint_SetSpringFrequencyHz(this.ptr,e)};var b2WheelJointDef_Create=Module._b2WheelJointDef_Create,b2WheelJointDef_InitializeAndCreate=Module._b2WheelJointDef_InitializeAndCreate;function b2WheelJointDef(){this.bodyA=null,this.bodyB=null,this.collideConnected=!1,this.dampingRatio=.7,this.enableMotor=!1,this.frequencyHz=2,this.localAnchorA=new b2Vec2,this.localAnchorB=new b2Vec2,this.localAxisA=new b2Vec2(1,0),this.maxMotorTorque=0,this.motorSpeed=0}b2WheelJointDef.prototype.Create=function(e){var t=new b2WheelJoint(this);return t.ptr=b2WheelJointDef_Create(e.ptr,this.bodyA.ptr,this.bodyB.ptr,this.collideConnected,this.dampingRatio,this.enableMotor,this.frequencyHz,this.localAnchorA.x,this.localAnchorA.y,this.localAnchorB.x,this.localAnchorB.y,this.localAxisA.x,this.localAxisA.y,this.maxMotorTorque,this.motorSpeed),t},b2WheelJointDef.prototype.InitializeAndCreate=function(e,t,o,r){this.bodyA=e,this.bodyB=t;var i=new b2WheelJoint(this);return i.ptr=b2WheelJointDef_InitializeAndCreate(world.ptr,this.bodyA.ptr,this.bodyB.ptr,o.x,o.y,r.x,r.y,this.collideConnected,this.dampingRatio,this.enableMotor,this.frequencyHz,this.maxMotorTorque,this.motorSpeed),b2World._Push(i,world.joints),i};var b2WeldJointDef_Create=Module._b2WeldJointDef_Create,b2WeldJointDef_InitializeAndCreate=Module._b2WeldJointDef_InitializeAndCreate;function b2WeldJointDef(){this.bodyA=null,this.bodyB=null,this.collideConnected=!1,this.dampingRatio=0,this.frequencyHz=0,this.localAnchorA=new b2Vec2,this.localAnchorB=new b2Vec2,this.referenceAngle=0}function b2WeldJoint(e){this.bodyA=e.bodyA,this.bodyB=e.bodyB,this.next=null,this.ptr=null}b2WeldJointDef.prototype.Create=function(e){var t=new b2WeldJoint(this);return t.ptr=b2WeldJointDef_Create(e.ptr,this.bodyA.ptr,this.bodyB.ptr,this.collideConnected,this.dampingRatio,this.frequencyHz,this.localAnchorA.x,this.localAnchorA.y,this.localAnchorB.x,this.localAnchorB.y,this.referenceAngle),t},b2WeldJointDef.prototype.InitializeAndCreate=function(e,t,o){this.bodyA=e,this.bodyB=t;var r=new b2WeldJoint(this);return r.ptr=b2WeldJointDef_InitializeAndCreate(world.ptr,this.bodyA.ptr,this.bodyB.ptr,o.x,o.y,this.collideConnected,this.dampingRatio,this.frequencyHz),b2World._Push(r,world.joints),r};var b2GearJoint_GetRatio=Module._b2GearJoint_GetRatio;function b2GearJoint(e){this.ptr=null,this.next=null}b2GearJoint.prototype.GetRatio=function(){return b2GearJoint_GetRatio(this.ptr)};var b2GearJointDef_Create=Module._b2GearJointDef_Create;function b2GearJointDef(){this.bodyA=null,this.bodyB=null,this.collideConnected=!1,this.joint1=null,this.joint2=null,this.ratio=0}b2GearJointDef.prototype.Create=function(e){var t=new b2GearJoint(this);return t.ptr=b2GearJointDef_Create(e.ptr,this.bodyA.ptr,this.bodyB.ptr,this.collideConnected,this.joint1.ptr,this.joint2.ptr,this.ratio),t};var e_unknownJoint=0,e_revoluteJoint=1,e_prismaticJoint=2,e_distanceJoint=3,e_pulleyJoint=4,e_mouseJoint=5,e_gearJoint=6,e_wheelJoint=7,e_weldJoint=8,e_frictionJoint=9,e_ropeJoint=10,e_motorJoint=11,b2Joint_GetBodyA=Module._b2Joint_GetBodyA,b2Joint_GetBodyB=Module._b2Joint_GetBodyB;function b2Joint(){}b2Joint.prototype.GetBodyA=function(){return world.bodiesLookup[b2Joint_GetBodyA(this.ptr)]},b2Joint.prototype.GetBodyB=function(){return world.bodiesLookup[b2Joint_GetBodyB(this.ptr)]};var b2FrictionJointDef_Create=Module._b2FrictionJointDef_Create,b2FrictionJointDef_InitializeAndCreate=Module._b2FrictionJointDef_InitializeAndCreate;function b2FrictionJointDef(){this.bodyA=null,this.bodyB=null,this.collideConnected=!1,this.localAnchorA=new b2Vec2,this.localAnchorB=new b2Vec2,this.maxForce=0,this.maxTorque=0,this.userData=null}function b2FrictionJoint(e){this.bodyA=e.bodyA,this.bodyB=e.bodyB,this.ptr=null,this.next=null}b2FrictionJointDef.prototype.Create=function(e){var t=new b2FrictionJoint(this);return t.ptr=b2FrictionJointDef_Create(e.ptr,this.bodyA.ptr,this.bodyB.ptr,this.collideConnected,this.localAnchorA.x,this.localAnchorA.y,this.localAnchorB.x,this.localAnchorB.y,this.maxForce,this.maxTorque),t},b2FrictionJointDef.prototype.InitializeAndCreate=function(e,t,o){this.bodyA=e,this.bodyB=t;var r=new b2FrictionJoint(this);return r.ptr=b2FrictionJointDef_InitializeAndCreate(world.ptr,this.bodyA.ptr,this.bodyB.ptr,o.x,o.y,this.collideConnected,this.maxForce,this.maxTorque),b2World._Push(r,world.joints),r};var b2RevoluteJoint_EnableLimit=Module._b2RevoluteJoint_EnableLimit,b2RevoluteJoint_EnableMotor=Module._b2RevoluteJoint_EnableMotor,b2RevoluteJoint_GetJointAngle=Module._b2RevoluteJoint_GetJointAngle,b2RevoluteJoint_IsLimitEnabled=Module._b2RevoluteJoint_IsLimitEnabled,b2RevoluteJoint_IsMotorEnabled=Module._b2RevoluteJoint_IsMotorEnabled,b2RevoluteJoint_SetMotorSpeed=Module._b2RevoluteJoint_SetMotorSpeed;function b2RevoluteJoint(e){this.collideConnected=e.collideConnected,this.enableLimit=e.enableLimit,this.enableMotor=e.enableMotor,this.lowerAngle=e.lowerAngle,this.maxMotorTorque=e.maxMotorTorque,this.motorSpeed=e.motorSpeed,this.next=null,this.ptr=null,this.upperAngle=e.upperAngle,this.userData=e.userData}b2RevoluteJoint.prototype=new b2Joint,b2RevoluteJoint.prototype.EnableLimit=function(e){b2RevoluteJoint_EnableLimit(this.ptr,e)},b2RevoluteJoint.prototype.EnableMotor=function(e){b2RevoluteJoint_EnableMotor(this.ptr,e)},b2RevoluteJoint.prototype.GetJointAngle=function(e){return b2RevoluteJoint_GetJointAngle(this.ptr)},b2RevoluteJoint.prototype.IsLimitEnabled=function(){return b2RevoluteJoint_IsLimitEnabled(this.ptr)},b2RevoluteJoint.prototype.IsMotorEnabled=function(){return b2RevoluteJoint_IsMotorEnabled(this.ptr)},b2RevoluteJoint.prototype.SetMotorSpeed=function(e){b2RevoluteJoint_SetMotorSpeed(this.ptr,e),this.motorSpeed=e};var b2RevoluteJointDef_Create=Module._b2RevoluteJointDef_Create,b2RevoluteJointDef_InitializeAndCreate=Module._b2RevoluteJointDef_InitializeAndCreate;function b2RevoluteJointDef(){this.collideConnected=!1,this.enableLimit=!1,this.enableMotor=!1,this.localAnchorA=new b2Vec2,this.localAnchorB=new b2Vec2,this.lowerAngle=0,this.maxMotorTorque=0,this.motorSpeed=0,this.referenceAngle=0,this.upperAngle=0,this.userData=null}b2RevoluteJointDef.prototype.Create=function(e){var t=new b2RevoluteJoint(this);return t.ptr=b2RevoluteJointDef_Create(e.ptr,this.bodyA.ptr,this.bodyB.ptr,this.collideConnected,this.enableLimit,this.enableMotor,this.lowerAngle,this.localAnchorA.x,this.localAnchorA.y,this.localAnchorB.x,this.localAnchorB.y,this.maxMotorTorque,this.motorSpeed,this.referenceAngle,this.upperAngle),t},b2RevoluteJointDef.prototype.InitializeAndCreate=function(e,t,o){this.bodyA=e,this.bodyB=t;var r=new b2RevoluteJoint(this);return r.ptr=b2RevoluteJointDef_InitializeAndCreate(world.ptr,e.ptr,t.ptr,o.x,o.y,this.collideConnected,this.enableLimit,this.enableMotor,this.lowerAngle,this.maxMotorTorque,this.motorSpeed,this.upperAngle),b2World._Push(r,world.joints),r};var b2MotorJoint_SetAngularOffset=Module._b2MotorJoint_SetAngularOffset,b2MotorJoint_SetLinearOffset=Module._b2MotorJoint_SetLinearOffset;function b2MotorJoint(e){this.bodyA=e.bodyA,this.bodyB=e.bodyB,this.ptr=null,this.next=null}b2MotorJoint.prototype.SetAngularOffset=function(e){b2MotorJoint_SetAngularOffset(this.ptr,e)},b2MotorJoint.prototype.SetLinearOffset=function(e){b2MotorJoint_SetLinearOffset(this.ptr,e.x,e.y)};var b2MotorJointDef_Create=Module._b2MotorJointDef_Create,b2MotorJointDef_InitializeAndCreate=Module._b2MotorJointDef_InitializeAndCreate;function b2MotorJointDef(){this.bodyA=null,this.bodyB=null,this.collideConnected=!1,this.angularOffset=0,this.correctionFactor=.3,this.linearOffset=new b2Vec2,this.maxForce=0,this.maxTorque=0}function b2PulleyJoint(e){this.ptr=null,this.next=null}b2MotorJointDef.prototype.Create=function(e){var t=new b2MotorJoint(this);return t.ptr=b2MotorJointDef_Create(e.ptr,this.bodyA.ptr,this.bodyB.ptr,this.collideConnected,this.angularOffset,this.correctionFactor,this.linearOffset.x,this.linearOffset.y,this.maxForce,this.maxTorque),t},b2MotorJointDef.prototype.InitializeAndCreate=function(e,t){this.bodyA=e,this.bodyB=t;var o=new b2MotorJoint(this);return o.ptr=b2MotorJointDef_InitializeAndCreate(world.ptr,this.bodyA.ptr,this.bodyB.ptr,this.collideConnected,this.correctionFactor,this.maxForce,this.maxTorque),b2World._Push(o,world.joints),o};var b2PulleyJointDef_Create=Module._b2PulleyJointDef_Create,b2PulleyJointDef_InitializeAndCreate=Module._b2PulleyJointDef_InitializeAndCreate;function b2PulleyJointDef(){this.bodyA=null,this.bodyB=null,this.collideConnected=!0,this.groundAnchorA=new b2Vec2,this.groundAnchorB=new b2Vec2,this.localAnchorA=new b2Vec2,this.localAnchorB=new b2Vec2,this.lengthA=0,this.lengthB=0,this.ratio=1}function b2DistanceJoint(e){this.bodyA=e.bodyA,this.bodyB=e.bodyB,this.ptr=null,this.next=null}b2PulleyJointDef.prototype.Create=function(e){var t=new b2PulleyJoint(this);return t.ptr=b2PulleyJointDef_Create(e.ptr,this.bodyA.ptr,this.bodyB.ptr,this.collideConnected,this.groundAnchorA.x,this.groundAnchorA.y,this.groundAnchorB.x,this.groundAnchorB.y,this.lengthA,this.lengthB,this.localAnchorA.x,this.localAnchorA.y,this.localAnchorB.x,this.localAnchorB.y,this.ratio),t},b2PulleyJointDef.prototype.InitializeAndCreate=function(e,t,o,r,i,n,l){this.bodyA=e,this.bodyB=t;var a=new b2PulleyJoint(this);return a.ptr=b2PulleyJointDef_InitializeAndCreate(world.ptr,this.bodyA.ptr,this.bodyB.ptr,i.x,i.y,n.x,n.y,o.x,o.y,r.x,r.y,l,this.collideConnected),b2World._Push(a,world.joints),a};var b2DistanceJointDef_Create=Module._b2DistanceJointDef_Create,b2DistanceJointDef_InitializeAndCreate=Module._b2DistanceJointDef_InitializeAndCreate;function b2DistanceJointDef(){this.bodyA=null,this.bodyB=null,this.collideConnected=!1,this.dampingRatio=0,this.length=1,this.localAnchorA=new b2Vec2,this.localAnchorB=new b2Vec2,this.frequencyHz=0}b2DistanceJointDef.prototype.Create=function(e){var t=new b2DistanceJoint(this);return t.ptr=b2DistanceJointDef_Create(e.ptr,this.bodyA.ptr,this.bodyB.ptr,this.collideConnected,this.dampingRatio,this.frequencyHz,this.length,this.localAnchorA.x,this.localAnchorA.y,this.localAnchorB.x,this.localAnchorB.y),t},b2DistanceJointDef.prototype.InitializeAndCreate=function(e,t,o,r){this.bodyA=e,this.bodyB=t;var i=new b2DistanceJoint(this);return i.ptr=b2DistanceJointDef_InitializeAndCreate(world.ptr,this.bodyA.ptr,this.bodyB.ptr,o.x,o.y,r.x,r.y,this.collideConnected,this.dampingRatio,this.frequencyHz),b2World._Push(i,world.joints),i};var b2PrismaticJoint_EnableLimit=Module._b2PrismaticJoint_EnableLimit,b2PrismaticJoint_EnableMotor=Module._b2PrismaticJoint_EnableMotor,b2PrismaticJoint_GetJointTranslation=Module._b2PrismaticJoint_GetJointTranslation,b2PrismaticJoint_GetMotorSpeed=Module._b2PrismaticJoint_GetMotorSpeed,b2PrismaticJoint_GetMotorForce=Module._b2PrismaticJoint_GetMotorForce,b2PrismaticJoint_IsLimitEnabled=Module._b2PrismaticJoint_IsLimitEnabled,b2PrismaticJoint_IsMotorEnabled=Module._b2PrismaticJoint_IsMotorEnabled,b2PrismaticJoint_SetMotorSpeed=Module._b2PrismaticJoint_SetMotorSpeed;function b2PrismaticJoint(e){this.ptr=null,this.next=null}b2PrismaticJoint.prototype=new b2Joint,b2PrismaticJoint.prototype.EnableLimit=function(e){return b2PrismaticJoint_EnableLimit(this.ptr,e)},b2PrismaticJoint.prototype.EnableMotor=function(e){return b2PrismaticJoint_EnableMotor(this.ptr,e)},b2PrismaticJoint.prototype.GetJointTranslation=function(){return b2PrismaticJoint_GetJointTranslation(this.ptr)},b2PrismaticJoint.prototype.GetMotorSpeed=function(){return b2PrismaticJoint_GetMotorSpeed(this.ptr)},b2PrismaticJoint.prototype.GetMotorForce=function(e){return b2PrismaticJoint_GetMotorForce(this.ptr,e)},b2PrismaticJoint.prototype.IsLimitEnabled=function(){return b2PrismaticJoint_IsLimitEnabled(this.ptr)},b2PrismaticJoint.prototype.IsMotorEnabled=function(){return b2PrismaticJoint_IsMotorEnabled(this.ptr)},b2PrismaticJoint.prototype.GetMotorEnabled=function(){return b2PrismaticJoint_IsMotorEnabled(this.ptr)},b2PrismaticJoint.prototype.SetMotorSpeed=function(e){return b2PrismaticJoint_SetMotorSpeed(this.ptr,e)};var b2PrismaticJointDef_Create=Module._b2PrismaticJointDef_Create,b2PrismaticJointDef_InitializeAndCreate=Module._b2PrismaticJointDef_InitializeAndCreate;function b2PrismaticJointDef(){this.bodyA=null,this.bodyB=null,this.collideConnected=!1,this.enableLimit=!1,this.enableMotor=!1,this.localAnchorA=new b2Vec2,this.localAnchorB=new b2Vec2,this.localAxisA=new b2Vec2(1,0),this.lowerTranslation=0,this.maxMotorForce=0,this.motorSpeed=0,this.referenceAngle=0,this.upperTranslation=0}function b2RopeJoint(e){this.next=null,this.ptr=null}b2PrismaticJointDef.prototype.Create=function(e){var t=new b2PrismaticJoint(this);return t.ptr=b2PrismaticJointDef_Create(e.ptr,this.bodyA.ptr,this.bodyB.ptr,this.collideConnected,this.enableLimit,this.enableMotor,this.localAnchorA.x,this.localAnchorA.y,this.localAnchorB.x,this.localAnchorB.y,this.localAxisA.x,this.localAxisA.y,this.lowerTranslation,this.maxMotorForce,this.motorSpeed,this.referenceAngle,this.upperTranslation),t},b2PrismaticJointDef.prototype.InitializeAndCreate=function(e,t,o,r){this.bodyA=e,this.bodyB=t;var i=new b2PrismaticJoint(this);return i.ptr=b2PrismaticJointDef_InitializeAndCreate(world.ptr,this.bodyA.ptr,this.bodyB.ptr,o.x,o.y,r.x,r.y,this.collideConnected,this.enableLimit,this.enableMotor,this.lowerTranslation,this.maxMotorForce,this.motorSpeed,this.upperTranslation),b2World._Push(i,world.joints),i};var b2RopeJointDef_Create=Module._b2RopeJointDef_Create;function b2RopeJointDef(){this.bodyA=null,this.bodyB=null,this.collideConnected=!1,this.localAnchorA=new b2Vec2,this.localAnchorB=new b2Vec2,this.maxLength=0}b2RopeJointDef.prototype.Create=function(e){var t=new b2RopeJoint(this);return t.ptr=b2RopeJointDef_Create(e.ptr,this.bodyA.ptr,this.bodyB.ptr,this.collideConnected,this.localAnchorA.x,this.localAnchorA.y,this.localAnchorB.x,this.localAnchorB.y,this.maxLength),t};var b2MouseJoint_SetTarget=Module._b2MouseJoint_SetTarget;function b2MouseJoint(e){this.ptr=null,this.next=null}b2MouseJoint.prototype.SetTarget=function(e){b2MouseJoint_SetTarget(this.ptr,e.x,e.y)};var b2MouseJointDef_Create=Module._b2MouseJointDef_Create;function b2MouseJointDef(){this.bodyA=null,this.bodyB=null,this.collideConnected=!1,this.dampingRatio=.7,this.frequencyHz=5,this.maxForce=0,this.target=new b2Vec2}b2MouseJointDef.prototype.Create=function(e){var t=new b2MouseJoint(this);return t.ptr=b2MouseJointDef_Create(e.ptr,this.bodyA.ptr,this.bodyB.ptr,this.collideConnected,this.dampingRatio,this.frequencyHz,this.maxForce,this.target.x,this.target.y),t};var b2Contact_flags_offset=Offsets.b2Contact.flags,b2Contact_fixtureA_offset=Offsets.b2Contact.fixtureA,b2Contact_fixtureB_offset=Offsets.b2Contact.fixtureB,b2Contact_tangentSpeed_offset=Offsets.b2Contact.tangentSpeed,e_enabledFlag=4,b2Contact_GetManifold=Module._b2Contact_GetManifold,b2Contact_GetWorldManifold=Module._b2Contact_GetWorldManifold;function b2Contact(e){this.buffer=new DataView(Module.HEAPU8.buffer,e),this.ptr=e}function b2Filter(){this.categoryBits=1,this.maskBits=65535,this.groupIndex=0}b2Contact.prototype.GetFixtureA=function(){var e=this.buffer.getUint32(b2Contact_fixtureA_offset,!0);return world.fixturesLookup[e]},b2Contact.prototype.GetFixtureB=function(){var e=this.buffer.getUint32(b2Contact_fixtureB_offset,!0);return world.fixturesLookup[e]},b2Contact.prototype.GetManifold=function(){return new b2Manifold(b2Contact_GetManifold(this.ptr))},b2Contact.prototype.GetWorldManifold=function(){return new b2WorldManifold(b2Contact_GetWorldManifold(this.ptr))},b2Contact.prototype.SetTangentSpeed=function(e){this.buffer.setFloat32(b2Contact_tangentSpeed_offset,e,!0)},b2Contact.prototype.SetEnabled=function(e){var t=this.buffer.getUint32(b2Contact_flags_offset,!0);e?t|=e_enabledFlag:t&=~e_enabledFlag,this.buffer.setUint32(b2Contact_flags_offset,t,!0)},b2Contact.prototype.IsEnabled=function(){return this.buffer.getUint32(b2Contact_flags_offset,!0)&e_enabledFlag};var b2Fixture_isSensor_offset=Offsets.b2Fixture.isSensor,b2Fixture_userData_offset=Offsets.b2Fixture.userData,b2Fixture_filter_categoryBits_offset=Offsets.b2Fixture.filterCategoryBits,b2Fixture_filter_maskBits_offset=Offsets.b2Fixture.filterMaskBits,b2Fixture_filter_groupIndex_offset=Offsets.b2Fixture.filterGroupIndex;function b2Fixture(){this.body=null,this.buffer=null,this.ptr=null,this.shape=null}var b2Fixture_TestPoint=Module._b2Fixture_TestPoint,b2Fixture_Refilter=Module._b2Fixture_Refilter;function b2FixtureDef(){this.density=0,this.friction=.2,this.isSensor=!1,this.restitution=0,this.shape=null,this.userData=null,this.filter=new b2Filter}function b2ContactImpulse(e){this.ptr=e,this.buffer=new DataView(Module.HEAPU8.buffer,e)}function b2ParticleSystemDef(){this.colorMixingStrength=.5,this.dampingStrength=1,this.destroyByAge=!0,this.ejectionStrength=.5,this.elasticStrength=.25,this.lifetimeGranularity=1/60,this.powderStrength=.5,this.pressureStrength=.05,this.radius=1,this.repulsiveStrength=1,this.springStrength=.25,this.staticPressureIterations=8,this.staticPressureRelaxation=.2,this.staticPressureStrength=.2,this.surfaceTensionNormalStrength=.2,this.surfaceTensionPressureStrength=.2,this.viscousStrength=.25}b2Fixture.prototype._SetPtr=function(e){this.ptr=e,this.buffer=new DataView(Module.HEAPU8.buffer,e)},b2Fixture.prototype.FromFixtureDef=function(e){this.density=e.density,this.friction=e.friction,this.isSensor=e.isSensor,this.restitution=e.restitution,this.shape=e.shape,this.userData=e.userData,this.vertices=[]},b2Fixture.prototype.GetUserData=function(){return this.buffer.getUint32(b2Fixture_userData_offset,!0)},b2Fixture.prototype.SetFilterData=function(e){this.buffer.setUint16(b2Fixture_filter_categoryBits_offset,e.categoryBits,!0),this.buffer.setUint16(b2Fixture_filter_maskBits_offset,e.maskBits,!0),this.buffer.setUint16(b2Fixture_filter_groupIndex_offset,e.groupIndex,!0),this.Refilter()},b2Fixture.prototype.SetSensor=function(e){this.buffer.setUint32(b2Fixture_isSensor_offset,e,!0)},b2Fixture.prototype.Refilter=function(){b2Fixture_Refilter(this.ptr)},b2Fixture.prototype.TestPoint=function(e){return b2Fixture_TestPoint(this.ptr,e.x,e.y)},b2ContactImpulse.prototype.GetNormalImpulse=function(e){return this.buffer.getFloat32(4*e,!0)},b2ContactImpulse.prototype.GetTangentImpulse=function(e){return this.buffer.getFloat32(4*e+8,!0)},b2ContactImpulse.prototype.GetCount=function(e){console.log(this.buffer.getInt32(16,!0))};var b2ParticleSystem_CreateParticle=Module._b2ParticleSystem_CreateParticle,b2ParticleSystem_GetColorBuffer=Module._b2ParticleSystem_GetColorBuffer,b2ParticleSystem_GetParticleCount=Module._b2ParticleSystem_GetParticleCount,b2ParticleSystem_GetParticleLifetime=Module._b2ParticleSystem_GetParticleLifetime,b2ParticleSystem_GetPositionBuffer=Module._b2ParticleSystem_GetPositionBuffer,b2ParticleSystem_GetVelocityBuffer=Module._b2ParticleSystem_GetVelocityBuffer,b2ParticleSystem_SetDamping=Module._b2ParticleSystem_SetDamping,b2ParticleSystem_SetDensity=Module._b2ParticleSystem_SetDensity,b2ParticleSystem_SetGravityScale=Module._b2ParticleSystem_SetGravityScale,b2ParticleSystem_SetMaxParticleCount=Module._b2ParticleSystem_SetMaxParticleCount,b2ParticleSystem_SetParticleLifetime=Module._b2ParticleSystem_SetParticleLifetime,b2ParticleSystem_SetRadius=Module._b2ParticleSystem_SetRadius;function b2ParticleSystem(e){this.dampingStrength=1,this.density=1,this.ptr=e,this.particleGroups=[],this.radius=1,this.gravityScale=1}b2ParticleSystem.prototype.CreateParticle=function(e){return b2ParticleSystem_CreateParticle(this.ptr,e.color.r,e.color.g,e.color.b,e.color.a,e.flags,e.group,e.lifetime,e.position.x,e.position.y,e.userData,e.velocity.x,e.velocity.y)},b2ParticleSystem.prototype.CreateParticleGroup=function(e){var t=new b2ParticleGroup(e.shape._CreateParticleGroup(this,e));return this.particleGroups.push(t),t},b2ParticleSystem.prototype.DestroyParticlesInShape=function(e,t){return e._DestroyParticlesInShape(this,t)},b2ParticleSystem.prototype.GetColorBuffer=function(){var e=4*b2ParticleSystem_GetParticleCount(this.ptr),t=b2ParticleSystem_GetColorBuffer(this.ptr);return new Uint8Array(Module.HEAPU8.buffer,t,e)},b2ParticleSystem.prototype.GetParticleLifetime=function(e){return b2ParticleSystem_GetParticleLifetime(this.ptr,e)},b2ParticleSystem.prototype.GetParticleCount=function(){return b2ParticleSystem_GetParticleCount(this.ptr)},b2ParticleSystem.prototype.GetPositionBuffer=function(){var e=2*b2ParticleSystem_GetParticleCount(this.ptr),t=b2ParticleSystem_GetPositionBuffer(this.ptr);return new Float32Array(Module.HEAPU8.buffer,t,e)},b2ParticleSystem.prototype.GetVelocityBuffer=function(){var e=2*b2ParticleSystem_GetParticleCount(this.ptr),t=b2ParticleSystem_GetVelocityBuffer(this.ptr);return new Float32Array(Module.HEAPU8.buffer,t,e)},b2ParticleSystem.prototype.SetDamping=function(e){this.dampingStrength=e,b2ParticleSystem_SetDamping(this.ptr,e)},b2ParticleSystem.prototype.SetDensity=function(e){this.density=e,b2ParticleSystem_SetDensity(this.ptr,e)},b2ParticleSystem.prototype.SetGravityScale=function(e){this.gravityScale=e,b2ParticleSystem_SetGravityScale(this.ptr,e)},b2ParticleSystem.prototype.SetMaxParticleCount=function(e){b2ParticleSystem_SetMaxParticleCount(this.ptr,e)},b2ParticleSystem.prototype.SetParticleLifetime=function(e,t){b2ParticleSystem_SetParticleLifetime(this.ptr,e,t)},b2ParticleSystem.prototype.SetRadius=function(e){this.radius=e,b2ParticleSystem_SetRadius(this.ptr,e)};var b2_solidParticleGroup=1,b2_rigidParticleGroup=2,b2_particleGroupCanBeEmpty=4,b2_particleGroupWillBeDestroyed=8,b2_particleGroupNeedsUpdateDepth=16,b2_particleGroupInternalMask=b2_particleGroupWillBeDestroyed|b2_particleGroupNeedsUpdateDepth,b2ParticleGroup_ApplyForce=Module._b2ParticleGroup_ApplyForce,b2ParticleGroup_ApplyLinearImpulse=Module._b2ParticleGroup_ApplyLinearImpulse,b2ParticleGroup_DestroyParticles=Module._b2ParticleGroup_DestroyParticles,b2ParticleGroup_GetBufferIndex=Module._b2ParticleGroup_GetBufferIndex,b2ParticleGroup_GetParticleCount=Module._b2ParticleGroup_GetParticleCount,b2ParticleGroup_groupFlags_offset=Offsets.b2ParticleGroup.groupFlags;function b2ParticleGroup(e){this.buffer=new DataView(Module.HEAPU8.buffer,e),this.ptr=e}function b2ParticleGroupDef(){this.angle=0,this.angularVelocity=0,this.color=new b2ParticleColor(0,0,0,0),this.flags=0,this.group=new b2ParticleGroup(null),this.groupFlags=0,this.lifetime=0,this.linearVelocity=new b2Vec2,this.position=new b2Vec2,this.positionData=null,this.particleCount=0,this.shape=null,this.strength=1,this.stride=0,this.userData=null}b2ParticleGroup.prototype.ApplyForce=function(e){b2ParticleGroup_ApplyForce(this.ptr,e.x,e.y)},b2ParticleGroup.prototype.ApplyLinearImpulse=function(e){b2ParticleGroup_ApplyLinearImpulse(this.ptr,e.x,e.y)},b2ParticleGroup.prototype.DestroyParticles=function(e){b2ParticleGroup_DestroyParticles(this.ptr,e)},b2ParticleGroup.prototype.GetBufferIndex=function(){return b2ParticleGroup_GetBufferIndex(this.ptr)},b2ParticleGroup.prototype.GetGroupFlags=function(){return this.buffer.getUint32(b2ParticleGroup_groupFlags_offset,!0)},b2ParticleGroup.prototype.GetParticleCount=function(){return b2ParticleGroup_GetParticleCount(this.ptr)},b2ParticleGroup.prototype.SetGroupFlags=function(e){this.buffer.setUint32(b2ParticleGroup_groupFlags_offset,e,!0)};var b2_waterParticle=0,b2_zombieParticle=2,b2_wallParticle=4,b2_springParticle=8,b2_elasticParticle=16,b2_viscousParticle=32,b2_powderParticle=64,b2_tensileParticle=128,b2_colorMixingParticle=256,b2_destructionListenerParticle=512,b2_barrierParticle=1024,b2_staticPressureParticle=2048,b2_reactiveParticle=4096,b2_repulsiveParticle=8192,b2_fixtureContactListenerParticle=16384,b2_particleContactListenerParticle=32768,b2_fixtureContactFilterParticle=65536,b2_particleContactFilterParticle=1<<17;function b2ParticleColor(e,t,o,r){void 0===e&&(e=0),void 0===t&&(t=0),void 0===o&&(o=0),void 0===r&&(r=0),this.r=e,this.g=t,this.b=o,this.a=r}function b2ParticleDef(){this.color=new b2Vec2,this.flags=0,this.group=0,this.lifetime=0,this.position=new b2Vec2,this.userData=0,this.velocity=new b2Vec2}b2ParticleColor.prototype.Set=function(e,t,o,r){this.r=e,this.g=t,this.b=o,this.a=r};


module.exports = {
    Max: b2Max,
    Min: b2Min,
    Clamp: b2Clamp,
    Vec2: b2Vec2,
    Rot: b2Rot,
    Transform: b2Transform,
    AABB: b2AABB,
    Manifold_GetPointCount: b2Manifold_GetPointCount,
    Manifold: b2Manifold,
    WorldManifold_points_offset: b2WorldManifold_points_offset,
    WorldManifold: b2WorldManifold,
    EdgeShape_CreateFixture: b2EdgeShape_CreateFixture,
    EdgeShape: b2EdgeShape,
    PolygonShape_CreateFixture_3: b2PolygonShape_CreateFixture_3,
    PolygonShape_CreateFixture_4: b2PolygonShape_CreateFixture_4,
    PolygonShape_CreateFixture_5: b2PolygonShape_CreateFixture_5,
    PolygonShape_CreateFixture_6: b2PolygonShape_CreateFixture_6,
    PolygonShape_CreateFixture_7: b2PolygonShape_CreateFixture_7,
    PolygonShape_CreateFixture_8: b2PolygonShape_CreateFixture_8,
    PolygonShape_CreateParticleGroup_4: b2PolygonShape_CreateParticleGroup_4,
    PolygonShape_DestroyParticlesInShape_4: b2PolygonShape_DestroyParticlesInShape_4,
    PolygonShape: b2PolygonShape,
    Shape_Type_e_circle: b2Shape_Type_e_circle,
    Shape_Type_e_edge: b2Shape_Type_e_edge,
    Shape_Type_e_polygon: b2Shape_Type_e_polygon,
    Shape_Type_e_chain: b2Shape_Type_e_chain,
    Shape_Type_e_typeCount: b2Shape_Type_e_typeCount,
    _linearSlop: b2_linearSlop,
    _polygonRadius: b2_polygonRadius,
    _maxPolygonVertices: b2_maxPolygonVertices,
    MassData: b2MassData,
    ChainShape_CreateFixture: b2ChainShape_CreateFixture,
    ChainShape: b2ChainShape,
    CircleShape_CreateFixture: b2CircleShape_CreateFixture,
    CircleShape_CreateParticleGroup: b2CircleShape_CreateParticleGroup,
    CircleShape_DestroyParticlesInShape: b2CircleShape_DestroyParticlesInShape,
    CircleShape: b2CircleShape,
    Body_ApplyAngularImpulse: b2Body_ApplyAngularImpulse,
    Body_ApplyForce: b2Body_ApplyForce,
    Body_ApplyForceToCenter: b2Body_ApplyForceToCenter,
    Body_ApplyTorque: b2Body_ApplyTorque,
    Body_DestroyFixture: b2Body_DestroyFixture,
    Body_GetAngle: b2Body_GetAngle,
    Body_GetAngularVelocity: b2Body_GetAngularVelocity,
    Body_GetInertia: b2Body_GetInertia,
    Body_GetLinearVelocity: b2Body_GetLinearVelocity,
    Body_GetLocalPoint: b2Body_GetLocalPoint,
    Body_GetLocalVector: b2Body_GetLocalVector,
    Body_GetMass: b2Body_GetMass,
    Body_GetPosition: b2Body_GetPosition,
    Body_GetTransform: b2Body_GetTransform,
    Body_GetType: b2Body_GetType,
    Body_GetWorldCenter: b2Body_GetWorldCenter,
    Body_GetWorldPoint: b2Body_GetWorldPoint,
    Body_GetWorldVector: b2Body_GetWorldVector,
    Body_SetAngularVelocity: b2Body_SetAngularVelocity,
    Body_SetAwake: b2Body_SetAwake,
    Body_SetLinearVelocity: b2Body_SetLinearVelocity,
    Body_SetMassData: b2Body_SetMassData,
    Body_SetTransform: b2Body_SetTransform,
    Body_SetType: b2Body_SetType,
    Body_xf_offset: b2Body_xf_offset,
    Body_userData_offset: b2Body_userData_offset,
    Body: b2Body,
    _staticBody: b2_staticBody,
    _kinematicBody: b2_kinematicBody,
    _dynamicBody: b2_dynamicBody,
    BodyDef: b2BodyDef,
    World_Create: b2World_Create,
    World_CreateBody: b2World_CreateBody,
    World_CreateParticleSystem: b2World_CreateParticleSystem,
    World_DestroyBody: b2World_DestroyBody,
    World_DestroyJoint: b2World_DestroyJoint,
    World_DestroyParticleSystem: b2World_DestroyParticleSystem,
    World_QueryAABB: b2World_QueryAABB,
    World_RayCast: b2World_RayCast,
    World_SetContactListener: b2World_SetContactListener,
    World_SetGravity: b2World_SetGravity,
    World_Step: b2World_Step,
    World: b2World,
    WheelJoint_SetMotorSpeed: b2WheelJoint_SetMotorSpeed,
    WheelJoint_SetSpringFrequencyHz: b2WheelJoint_SetSpringFrequencyHz,
    WheelJoint: b2WheelJoint,
    WheelJointDef_Create: b2WheelJointDef_Create,
    WheelJointDef_InitializeAndCreate: b2WheelJointDef_InitializeAndCreate,
    WheelJointDef: b2WheelJointDef,
    WeldJointDef_Create: b2WeldJointDef_Create,
    WeldJointDef_InitializeAndCreate: b2WeldJointDef_InitializeAndCreate,
    WeldJointDef: b2WeldJointDef,
    WeldJoint: b2WeldJoint,
    GearJoint_GetRatio: b2GearJoint_GetRatio,
    GearJoint: b2GearJoint,
    GearJointDef_Create: b2GearJointDef_Create,
    GearJointDef: b2GearJointDef,
    Joint_GetBodyA: b2Joint_GetBodyA,
    Joint_GetBodyB: b2Joint_GetBodyB,
    Joint: b2Joint,
    FrictionJointDef_Create: b2FrictionJointDef_Create,
    FrictionJointDef_InitializeAndCreate: b2FrictionJointDef_InitializeAndCreate,
    FrictionJointDef: b2FrictionJointDef,
    FrictionJoint: b2FrictionJoint,
    RevoluteJoint_EnableLimit: b2RevoluteJoint_EnableLimit,
    RevoluteJoint_EnableMotor: b2RevoluteJoint_EnableMotor,
    RevoluteJoint_GetJointAngle: b2RevoluteJoint_GetJointAngle,
    RevoluteJoint_IsLimitEnabled: b2RevoluteJoint_IsLimitEnabled,
    RevoluteJoint_IsMotorEnabled: b2RevoluteJoint_IsMotorEnabled,
    RevoluteJoint_SetMotorSpeed: b2RevoluteJoint_SetMotorSpeed,
    RevoluteJoint: b2RevoluteJoint,
    RevoluteJointDef_Create: b2RevoluteJointDef_Create,
    RevoluteJointDef_InitializeAndCreate: b2RevoluteJointDef_InitializeAndCreate,
    RevoluteJointDef: b2RevoluteJointDef,
    MotorJoint_SetAngularOffset: b2MotorJoint_SetAngularOffset,
    MotorJoint_SetLinearOffset: b2MotorJoint_SetLinearOffset,
    MotorJoint: b2MotorJoint,
    MotorJointDef_Create: b2MotorJointDef_Create,
    MotorJointDef_InitializeAndCreate: b2MotorJointDef_InitializeAndCreate,
    MotorJointDef: b2MotorJointDef,
    PulleyJoint: b2PulleyJoint,
    PulleyJointDef_Create: b2PulleyJointDef_Create,
    PulleyJointDef_InitializeAndCreate: b2PulleyJointDef_InitializeAndCreate,
    PulleyJointDef: b2PulleyJointDef,
    DistanceJoint: b2DistanceJoint,
    DistanceJointDef_Create: b2DistanceJointDef_Create,
    DistanceJointDef_InitializeAndCreate: b2DistanceJointDef_InitializeAndCreate,
    DistanceJointDef: b2DistanceJointDef,
    PrismaticJoint_EnableLimit: b2PrismaticJoint_EnableLimit,
    PrismaticJoint_EnableMotor: b2PrismaticJoint_EnableMotor,
    PrismaticJoint_GetJointTranslation: b2PrismaticJoint_GetJointTranslation,
    PrismaticJoint_GetMotorSpeed: b2PrismaticJoint_GetMotorSpeed,
    PrismaticJoint_GetMotorForce: b2PrismaticJoint_GetMotorForce,
    PrismaticJoint_IsLimitEnabled: b2PrismaticJoint_IsLimitEnabled,
    PrismaticJoint_IsMotorEnabled: b2PrismaticJoint_IsMotorEnabled,
    PrismaticJoint_SetMotorSpeed: b2PrismaticJoint_SetMotorSpeed,
    PrismaticJoint: b2PrismaticJoint,
    PrismaticJointDef_Create: b2PrismaticJointDef_Create,
    PrismaticJointDef_InitializeAndCreate: b2PrismaticJointDef_InitializeAndCreate,
    PrismaticJointDef: b2PrismaticJointDef,
    RopeJoint: b2RopeJoint,
    RopeJointDef_Create: b2RopeJointDef_Create,
    RopeJointDef: b2RopeJointDef,
    MouseJoint_SetTarget: b2MouseJoint_SetTarget,
    MouseJoint: b2MouseJoint,
    MouseJointDef_Create: b2MouseJointDef_Create,
    MouseJointDef: b2MouseJointDef,
    Contact_fixtureA_offset: b2Contact_fixtureA_offset,
    Contact_fixtureB_offset: b2Contact_fixtureB_offset,
    Contact_tangentSpeed_offset: b2Contact_tangentSpeed_offset,
    Contact_GetManifold: b2Contact_GetManifold,
    Contact_GetWorldManifold: b2Contact_GetWorldManifold,
    Contact: b2Contact,
    Filter: b2Filter,
    Fixture_isSensor_offset: b2Fixture_isSensor_offset,
    Fixture_userData_offset: b2Fixture_userData_offset,
    Fixture: b2Fixture,
    Fixture_TestPoint: b2Fixture_TestPoint,
    FixtureDef: b2FixtureDef,
    ContactImpulse: b2ContactImpulse,
    ParticleSystemDef: b2ParticleSystemDef,
    ParticleSystem_CreateParticle: b2ParticleSystem_CreateParticle,
    ParticleSystem_GetColorBuffer: b2ParticleSystem_GetColorBuffer,
    ParticleSystem_GetParticleCount: b2ParticleSystem_GetParticleCount,
    ParticleSystem_GetPositionBuffer: b2ParticleSystem_GetPositionBuffer,
    ParticleSystem_GetVelocityBuffer: b2ParticleSystem_GetVelocityBuffer,
    ParticleSystem_SetDamping: b2ParticleSystem_SetDamping,
    ParticleSystem_SetDensity: b2ParticleSystem_SetDensity,
    ParticleSystem_SetRadius: b2ParticleSystem_SetRadius,
    ParticleSystem: b2ParticleSystem,
    _solidParticleGroup: b2_solidParticleGroup,
    _rigidParticleGroup: b2_rigidParticleGroup,
    _particleGroupCanBeEmpty: b2_particleGroupCanBeEmpty,
    _particleGroupWillBeDestroyed: b2_particleGroupWillBeDestroyed,
    _particleGroupNeedsUpdateDepth: b2_particleGroupNeedsUpdateDepth,
    _particleGroupInternalMask: b2_particleGroupInternalMask,
    ParticleGroup_ApplyForce: b2ParticleGroup_ApplyForce,
    ParticleGroup_ApplyLinearImpulse: b2ParticleGroup_ApplyLinearImpulse,
    ParticleGroup_DestroyParticles: b2ParticleGroup_DestroyParticles,
    ParticleGroup_GetBufferIndex: b2ParticleGroup_GetBufferIndex,
    ParticleGroup_GetParticleCount: b2ParticleGroup_GetParticleCount,
    ParticleGroup_groupFlags_offset: b2ParticleGroup_groupFlags_offset,
    ParticleGroup: b2ParticleGroup,
    ParticleGroupDef: b2ParticleGroupDef,
    _waterParticle: b2_waterParticle,
    _zombieParticle: b2_zombieParticle,
    _wallParticle: b2_wallParticle,
    _springParticle: b2_springParticle,
    _elasticParticle: b2_elasticParticle,
    _viscousParticle: b2_viscousParticle,
    _powderParticle: b2_powderParticle,
    _tensileParticle: b2_tensileParticle,
    _colorMixingParticle: b2_colorMixingParticle,
    _destructionListenerParticle: b2_destructionListenerParticle,
    _barrierParticle: b2_barrierParticle,
    _staticPressureParticle: b2_staticPressureParticle,
    _reactiveParticle: b2_reactiveParticle,
    _repulsiveParticle: b2_repulsiveParticle,
    _fixtureContactListenerParticle: b2_fixtureContactListenerParticle,
    _particleContactListenerParticle: b2_particleContactListenerParticle,
    _fixtureContactFilterParticle: b2_fixtureContactFilterParticle,
    _particleContactFilterParticle: b2_particleContactFilterParticle,
    ParticleColor: b2ParticleColor,
    ParticleDef: b2ParticleDef
  }
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../emsdk/node/8.9.1_64bit/lib/node_modules/webpack/node_modules/process/browser.js */ "../emsdk/node/8.9.1_64bit/lib/node_modules/webpack/node_modules/process/browser.js"), "/"))

/***/ }),

/***/ "./src/glutil.js":
/*!***********************!*\
  !*** ./src/glutil.js ***!
  \***********************/
/*! exports provided: createProgram */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createProgram", function() { return createProgram; });
function createProgram(gl, vsCode, fsCode) {
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader, vsCode);
    gl.shaderSource(fragmentShader, fsCode);

    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    [vertexShader, fragmentShader].forEach(shader => {
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.log('Shader error:', gl.getShaderInfoLog(shader));
            return null;
        }
    });

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.log('Program link error');
    }
    return program;
}

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const {
    createProgram
} = __webpack_require__(/*! ./glutil */ "./src/glutil.js");

const particleVsCode = `
attribute vec2 position;

uniform vec2 viewport;
uniform bool isPoint;

void main() {
    if (isPoint) {
        gl_PointSize = 2.0;
    }
    vec2 p = (position / viewport - 0.5) * 2.0;
    p.y = -p.y;
    gl_Position = vec4(p, 0.0, 1.0);
}
`;
const particleFsCode = `
precision highp float;
void main() {
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}
`;

const isSwan = typeof swan !== 'undefined';
if (typeof window === 'undefined' && typeof swanGlobal !== 'undefined') {
    swanGlobal.window = swanGlobal;
    window.document = {};
}

let urlOpts = {};
let canvas = null;
let width = 0;
let height = 0;
let stats = null;
if (!isSwan) {
    stats = new Stats();
    document.body.appendChild(stats.dom);
    
    canvas = document.createElement('canvas');
    const mainDiv = document.querySelector('#main');
    mainDiv.appendChild(canvas);
    width = mainDiv.clientWidth;
    height = mainDiv.clientHeight;
    
    canvas.width = width;
    canvas.height = height;

    const searchStr = location.search.slice(1);
    const searchItems = searchStr.split('&');
    searchItems.forEach(item => {
        const arr = item.split('=');
        const key = arr[0];
        const val = arr[1] || true;
        urlOpts[key] = val;
    });
}
else {
    canvas = swan.createCanvas();
    width = canvas.width;
    height = canvas.height;
}


let draw;
if (urlOpts.renderer === 'canvas') {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff';
    ctx.strokeStyle = '#fff';

    draw = function (position) {
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        for (let i = 0; i < position.length;) {
            const x = position[i++];
            const y = position[i++];

            ctx.rect(x, y, 3, 3);
            // ctx.fillRect(x, y, 3, 3);
        }
        ctx.fill();

        for (let i = 0; i < bodies.length; i++) {
            const body = bodies[i];
            for (let k = 0; k < body.fixtures.length; k++) {
                const shape = body.fixtures[k].shape;
                const vertices = shape.vertices;
                const len = vertices.length;

                ctx.beginPath();
                ctx.moveTo(vertices[len - 1].x, vertices[len - 1].y)
                for (let m = 0; m < len; m++) {
                    const p = vertices[m];
                    ctx.lineTo(p.x, p.y);
                }
                ctx.stroke();
            }
        }
    };
}
else {
    const gl = canvas.getContext('webgl');

    const posBuffer = gl.createBuffer();

    const program = createProgram(gl, particleVsCode, particleFsCode);

    gl.useProgram(program);
    const posLoc = gl.getAttribLocation(program, 'position');
    const isPointLoc = gl.getUniformLocation(program, 'isPoint');
    gl.uniform2f(gl.getUniformLocation(program, 'viewport'), width, height);

    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
    gl.bufferData(gl.ARRAY_BUFFER, 3e5, gl.DYNAMIC_DRAW);


    const lineData = new Float32Array(1e4);
    draw = function (position) {
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.viewport(0, 0, width, height);

        gl.bufferSubData(gl.ARRAY_BUFFER, 0, position);
        gl.uniform1i(isPointLoc, 1);
        gl.drawArrays(gl.POINTS, 0, position.length / 2);

        let lineVertexCount = 0;
        for (let i = 0; i < bodies.length; i++) {
            const body = bodies[i];
            for (let k = 0; k < body.fixtures.length; k++) {
                const shape = body.fixtures[k].shape;
                const vertices = shape.vertices;
                const len = vertices.length;
                if (len < 2) {
                    continue;
                }
                for (let m = 0; m < len; m++) {
                    const p = vertices[m];
                    const p2 = vertices[(m + 1) % len];
                    lineData[lineVertexCount * 2] = p.x;
                    lineData[lineVertexCount * 2 + 1] = p.y;
                    lineData[lineVertexCount * 2 + 2] = p2.x;
                    lineData[lineVertexCount * 2 + 3] = p2.y;

                    lineVertexCount += 2;
                }
            }
        }
        gl.bufferSubData(gl.ARRAY_BUFFER, position.length * 4, lineData);
        gl.uniform1i(isPointLoc, 0);
        gl.drawArrays(gl.LINES, position.length / 2, lineVertexCount);
    };
}

const bodies = [];
// https://beta.observablehq.com/@mbostock/liquidfun
function initPhysics() {
    const world = window.world = new b2.World(new b2.Vec2(0, 1000));
    const bd = new b2.BodyDef();
    const borderWidth = 2;
    bd.type = b2._staticBody;
    bd.allowSleep = false;
    // 4 Borders
    const body = world.CreateBody(bd);
    const p1 = new b2.PolygonShape();
    const cx = width / 2;
    const cy = height / 2;
    p1.SetAsBoxXYCenterAngle(borderWidth / 2, height / 2, new b2.Vec2(width, cy), 0);
    body.CreateFixtureFromShape(p1, 0);
    const p2 = new b2.PolygonShape();
    p2.SetAsBoxXYCenterAngle(borderWidth / 2, height / 2, new b2.Vec2(0, cy), 0);
    body.CreateFixtureFromShape(p2, 0);
    const p3 = new b2.PolygonShape();
    p3.SetAsBoxXYCenterAngle(width / 2, borderWidth / 2, new b2.Vec2(cx, height), 0);
    body.CreateFixtureFromShape(p3, 0);
    const p4 = new b2.PolygonShape();
    p4.SetAsBoxXYCenterAngle(width / 2, borderWidth / 2, new b2.Vec2(cx, 0), 0);
    body.CreateFixtureFromShape(p4, 0);

    const psd = new b2.ParticleSystemDef();
    psd.radius = 1.5;
    psd.dampingStrength = 0.2;
    const particleSystem = world.CreateParticleSystem(psd);
    const box = new b2.PolygonShape();
    box.SetAsBoxXYCenterAngle(150, 150, new b2.Vec2(cx, 150), 0);
    const particleGroupDef = new b2.ParticleGroupDef();
    particleGroupDef.shape = box;
    particleSystem.CreateParticleGroup(particleGroupDef);

    const barrierBd = new b2.BodyDef();
    barrierBd.type = b2._staticBody;
    const barrierBody = world.CreateBody(barrierBd);
    for (let i = 0; i < 15; i++) {
        const shape = new b2.PolygonShape();
        shape.SetAsBoxXYCenterAngle(
            Math.random() * width / 5 + Math.random() * width / 5, 2,
            new b2.Vec2(Math.random() * width / 2 + 100, i * height / 20 + 100),
            0
        );
        barrierBody.CreateFixtureFromShape(shape, 0);
    }
    bodies.push(barrierBody);

    return {world};
}


function init() {

    const {world} = initPhysics();

    function frame() {
        stats && stats.begin();
    
        world.Step(0.01, 5, 3);
    
        const position = world.particleSystems[0].GetPositionBuffer();
        draw(position);
    
        stats && stats.end();
        requestAnimationFrame(frame);
    }
    
    frame();
    
    function clamp(val, min, max) {
        return Math.min(Math.max(val, min), max);
    }
    // https://github.com/liabru/matter-js/blob/master/examples/gyro.js
    function updateGravity(event) {
        const orientation = typeof window.orientation !== 'undefined' ? window.orientation : 0;
        let x;
        let y;
        if (orientation === 0) {
            x = clamp(event.gamma, -90, 90) / 90;
            y = clamp(event.beta, -90, 90) / 90;
        }
        else if (orientation === 180) {
            x = clamp(event.gamma, -90, 90) / 90;
            y = clamp(-event.beta, -90, 90) / 90;
        }
        else if (orientation === 90) {
            x = clamp(event.beta, -90, 90) / 90;
            y = clamp(-event.gamma, -90, 90) / 90;
        }
        else if (orientation === -90) {
            x = clamp(-event.beta, -90, 90) / 90;
            y = clamp(event.gamma, -90, 90) / 90;
        }
    
        const scale = 1000 / Math.sqrt(x * x + y * y);
    
        world.SetGravity(new b2.Vec2(x * scale, y * scale));
    };
    
    function addSphere(e) {
        const pos = e.touches ? e.touches[0]: e;
        const x = pos.clientX;
        const y = pos.clientY;
    
    }
    
    if (!isSwan) {
        window.addEventListener('deviceorientation', updateGravity);
        window.addEventListener('click', addSphere);
    }
}

console.time('Initialize webassembly');
window.Module = {
    postRun() {
        console.timeEnd('Initialize webassembly');
        init();
    }
};

if (isSwan) {
    window.Module.wasmBinary = swan.getFileSystemManager().readFileSync('lib/lf_core.wasm');
}

var b2 = __webpack_require__(/*! ../lib/liquidfun */ "./lib/liquidfun.js");
// init();

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map