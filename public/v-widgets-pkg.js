var JSON;
JSON || (JSON = {}), function () {
  "use strict";
  function f(e) {
    return e < 10 ? "0" + e : e
  }

  function quote(e) {
    return escapable.lastIndex = 0, escapable.test(e) ? '"' + e.replace(escapable, function (e) {
      var t = meta[e];
      return typeof t == "string" ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
    }) + '"' : '"' + e + '"'
  }

  function str(e, t) {
    var n, r, i, s, o = gap, u, a = t[e];
    a && typeof a == "object" && typeof a.toJSON == "function" && (a = a.toJSON(e)), typeof rep == "function" && (a = rep.call(t, e, a));
    switch (typeof a) {
      case"string":
        return quote(a);
      case"number":
        return isFinite(a) ? String(a) : "null";
      case"boolean":
      case"null":
        return String(a);
      case"object":
        if (!a)return"null";
        gap += indent, u = [];
        if (Object.prototype.toString.apply(a) === "[object Array]") {
          s = a.length;
          for (n = 0; n < s; n += 1)u[n] = str(n, a) || "null";
          return i = u.length === 0 ? "[]" : gap ? "[\n" + gap + u.join(",\n" + gap) + "\n" + o + "]" : "[" + u.join(",") + "]", gap = o, i
        }
        if (rep && typeof rep == "object") {
          s = rep.length;
          for (n = 0; n < s; n += 1)typeof rep[n] == "string" && (r = rep[n], i = str(r, a), i && u.push(quote(r) + (gap ? ": " : ":") + i))
        } else for (r in a)Object.prototype.hasOwnProperty.call(a, r) && (i = str(r, a), i && u.push(quote(r) + (gap ? ": " : ":") + i));
        return i = u.length === 0 ? "{}" : gap ? "{\n" + gap + u.join(",\n" + gap) + "\n" + o + "}" : "{" + u.join(",") + "}", gap = o, i
    }
  }

  typeof Date.prototype.toJSON != "function" && (Date.prototype.toJSON = function (e) {
    return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
  }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (e) {
    return this.valueOf()
  });
  var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {"\b": "\\b", "	": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\"}, rep;
  typeof JSON.stringify != "function" && (JSON.stringify = function (e, t, n) {
    var r;
    gap = "", indent = "";
    if (typeof n == "number")for (r = 0; r < n; r += 1)indent += " "; else typeof n == "string" && (indent = n);
    rep = t;
    if (!t || typeof t == "function" || typeof t == "object" && typeof t.length == "number")return str("", {"": e});
    throw new Error("JSON.stringify")
  }), typeof JSON.parse != "function" && (JSON.parse = function (text, reviver) {
    function walk(e, t) {
      var n, r, i = e[t];
      if (i && typeof i == "object")for (n in i)Object.prototype.hasOwnProperty.call(i, n) && (r = walk(i, n), r !== undefined ? i[n] = r : delete i[n]);
      return reviver.call(e, t, i)
    }

    var j;
    text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function (e) {
      return"\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
    }));
    if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))return j = eval("(" + text + ")"), typeof reviver == "function" ? walk({"": j}, "") : j;
    throw new SyntaxError("JSON.parse")
  })
}();
var UPay = {CLASSES: {}, copy: function (e, t, n, r) {
  for (var i in t)if (n || typeof e[i] == "undefined")e[i] = r ? r(t[i]) : t[i];
  return e
}, create: function (e, t) {
  var n = window.UPay, r = e ? e.split(".") : [], i = r.length;
  for (var s = 0; s < i; s++) {
    var o = r[s], u = n[o];
    u || (u = t && s + 1 == i ? t : {}, n[o] = u), n = u
  }
  return n
}, provide: function (e, t, n) {
  return UPay.copy(typeof e == "string" ? UPay.create(e) : e, t, n)
}, guid: function () {
  return"f" + (Math.random() * (1 << 30)).toString(16).replace(".", "")
}, log: function (e) {
  UPay._logging && window.console && window.console.log(e)
}, $: function (e) {
  return document.getElementById(e)
}, _: function () {
  return!0
}, init: function (e) {
  UPay._protocol = UPay.Config.Common.permanentResourceProtocol === "relative" ? document.location.protocol + "//" : UPay.Config.Common.permanentResourceProtocol + "://", UPay.PM.init({allowableDomains: [UPay._protocol + UPay.Config.Common.permanentResourceHost]}), UPay.Event.subscribe("widget.init.render", function (e) {
    UPay.Api.init({xdPath: e.xdPath})
  }), UPay.Event.subscribe("widget.render", function () {
    UPay.Beacon.record(UPay._settings.apikey)
  }), window.orientation != undefined && this.Dom.observe(window, "orientationchange", function (e) {
    UPay.Event.fire("orientation:change", window.orientation)
  })
}, version: "1.94", ie: function () {
  var e = -1;
  if (navigator.appName == "Microsoft Internet Explorer") {
    var t = navigator.userAgent, n = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
    n.exec(t) != null && (e = parseFloat(RegExp.$1))
  }
  return e
}()};
UPay.AdvancedConfiguration = function (e, t) {
  if (e) {
    var n = {};
    for (var r in e)if (e.hasOwnProperty(r))if (typeof e[r] == "object") {
      n[r.toLowerCase()] = {};
      for (var i in e[r])n[r.toLowerCase()][i.toLowerCase()] = e[r][i]
    } else n[r.toLowerCase()] = e[r];
    this.opts = n
  } else this.opts = this.createDefault(UPay.Config.Common.namespace);
  t && UPay.copy(this.opts, t.opts)
}, UPay.AdvancedConfiguration.prototype = {get: function (e) {
  return this.opts[e.toLowerCase()]
}, createDefault: function (e) {
  return{}
}}, UPay.JSON = {stringify: function (e) {
  return window.Prototype && Object.toJSON ? Object.toJSON(e) : JSON.stringify(e)
}, parse: function (e) {
  return JSON.parse(e)
}, flatten: function (e) {
  var t = {};
  for (var n in e)if (e.hasOwnProperty(n)) {
    var r = e[n];
    if (null === r || undefined === r)continue;
    typeof r == "string" ? t[n] = r : t[n] = UPay.JSON.stringify(r)
  }
  return t
}}, UPay.PM = {_handlers: [], _allowableDomains: [], _idCounter: 1, init: function (e) {
  window.addEventListener ? window.addEventListener("message", UPay.PM._dispatch, !1) : window.attachEvent && window.attachEvent("onmessage", UPay.PM._dispatch), UPay.PM._allowableDomains = e.allowableDomains
}, _getHandlerKey: function (e) {
  return e.replace(".", "_")
}, _addHandler: function (e, t) {
  this._handlers[this._getHandlerKey(e)] = function (e) {
    t(JSON.parse(e))
  }
}, _getHandler: function (e) {
  var t = this._handlers || [];
  return t[this._getHandlerKey(e)]
}, _processIframe: function (e) {
  var t = this._guid(), n = UPay._protocol + UPay.Config.Common.permanentResourceHost + "/pm-receiver.html";
  n += "?name=" + e.name;
  var r = document.getElementById("pmMessageFrame");
  r || (r = document.createElement("div"), r.id = "pmMessageFrame", r.style.cssText = "position:absolute;top:-1000px;", document.body.appendChild(r));
  var i = encodeURIComponent("App.PM._handlers." + this._getHandlerKey(e.type) + "-" + JSON.stringify(e.data)), s = /MSIE (6|7|8)/.test(navigator.userAgent) ? document.createElement('<iframe name="' + i + '">') : document.createElement("iframe");
  s.name = i, s.src = n, s.id = t;
  var o = function () {
    UPay.PM.removeIframe(t)
  };
  window.addEventListener ? s.addEventListener("load", o, !1) : window.attachEvent && s.attachEvent("onload", o), r.appendChild(s)
}, removeIframe: function (e) {
  var t = document.getElementById("pmMessageFrame");
  t.removeChild(document.getElementById(e))
}, send: function (e) {
  if (!e.target) {
    console.log("postmessage target window required");
    return
  }
  if (!e.type) {
    console.log("postmessage type required");
    return
  }
  var t = {};
  t.type = e.type, t.data = e.data, t.name = e.name;
  var n = e.target;
  if (window.postMessage && n) {
    var r = UPay._protocol + UPay.Config.Common.permanentResourceHost;
    n.postMessage(this._getHandlerKey(t.type) + "-" + JSON.stringify(t.data), r)
  } else this._processIframe(t)
}, bind: function (e, t) {
  this._getHandler(e) || this._addHandler(e, t)
}, unbind: function (e, t) {
  delete this._handlers[this._getHandlerKey(e)]
}, _dispatch: function (e) {
  var t = !1;
  for (var n = 0; n < UPay.PM._allowableDomains.length; n++)if (e.origin === UPay.PM._allowableDomains[n]) {
    t = !0;
    break
  }
  if (t) {
    var r = e.data.indexOf("-"), i = e.data.substr(0, r), s = e.data.substr(r + 1), o = UPay.PM._getHandler(i) || [];
    try {
      o(s)
    } catch (u) {
      return
    }
  }
}, _guid: function () {
  var e = "f" + this._idCounter;
  return this._idCounter++, e
}}, UPay.Object = {bind: function () {
  var e = Array.prototype.slice.call(arguments), t = e.shift(), n = e.shift();
  return function () {
    return t.apply(n, e.concat(Array.prototype.slice.call(arguments)))
  }
}, Class: function (e, t, n) {
  if (UPay.CLASSES[e])return UPay.CLASSES[e];
  var r = t || function () {
  };
  return r.prototype = n, r.prototype.bind = function (e) {
    return UPay.Object.bind(e, this)
  }, r.prototype.constructor = r, UPay.create(e, r), UPay.CLASSES[e] = r, r
}, subclass: function (e, t, n, r) {
  if (UPay.CLASSES[e])return UPay.CLASSES[e];
  var i = UPay.create(t);
  return UPay.copy(r, i.prototype), r._base = i, r._callBase = function (e) {
    var t = Array.prototype.slice.call(arguments, 1);
    return i.prototype[e].apply(this, t)
  }, UPay.Object.Class(e, n ? n : function () {
    i.apply && i.apply(this, arguments)
  }, r)
}, pick: function (e) {
  var t = {}, n = Array.prototype, r = n.concat.apply(n, n.slice.call(arguments, 1));
  return UPay.Array.forEach(r, function (n) {
    n in e && (t[n] = e[n])
  }), t
}}, UPay.Array = {find: function (e, t) {
  for (var n = 0, r = e.length; n < r; n++)if (t(e[n]))return e[n]
}, indexOf: function (e, t) {
  if (e.indexOf)return e.indexOf(t);
  var n = e.length;
  if (n)for (var r = 0; r < n; r++)if (e[r] === t)return r;
  return-1
}, merge: function (e, t) {
  for (var n = 0; n < t.length; n++)UPay.Array.indexOf(e, t[n]) < 0 && e.push(t[n]);
  return e
}, filter: function (e, t) {
  var n = [];
  for (var r = 0; r < e.length; r++)t(e[r]) && n.push(e[r]);
  return n
}, keys: function (e, t) {
  var n = [];
  for (var r in e)(t || e.hasOwnProperty(r)) && n.push(r);
  return n
}, map: function (e, t) {
  var n = [];
  for (var r = 0; r < e.length; r++)n.push(t(e[r]));
  return n
}, forEach: function (e, t, n) {
  if (!e)return;
  if (Object.prototype.toString.apply(e) !== "[object Array]" && (e instanceof Function || typeof e.length != "number"))for (var s in e)(n || e.hasOwnProperty(s)) && t(e[s], s, e); else if (e.forEach)e.forEach(t); else for (var r = 0, i = e.length; r < i; r++)t(e[r], r, e)
}}, UPay.Browser = {getBrowserType: function () {
  if (!UPay.Browser._browserType) {
    var e = window.navigator.userAgent.toLowerCase(), t = ["msie", "firefox", "safari", "gecko"], n = ["ie", "mozilla", "safari", "mozilla"];
    for (var r = 0; r < t.length; r++)if (e.indexOf(t[r]) >= 0) {
      UPay.Browser._browserType = n[r];
      break
    }
  }
  return UPay.Browser._browserType
}, supported: function () {
  return!/msie|MSIE 6/.test(navigator.userAgent)
}, showUnsupportedMessage: function (e, t) {
  var n = UPay.JST["browser/default/unsupported"]({paths: {firefox: "//" + UPay.Config.Common.permanentResourceHost + "/img/browsers/firefox.png", chrome: "//" + UPay.Config.Common.permanentResourceHost + "/img/browsers/chrome.png", safari: "//" + UPay.Config.Common.permanentResourceHost + "/img/browsers/safari.png", ie: "//" + UPay.Config.Common.permanentResourceHost + "/img/browsers/ie.png"}, theme: e, logoUrl: t}), r = document.createElement("div");
  return r.id = "upay_unsupported", r.innerHTML = n, document.body.appendChild(r), !0
}, closeUnsupportedMessage: function () {
  var e = document.getElementById("upay_unsupported");
  return e && e.parentNode && e.parentNode.removeChild(e), !0
}, getAndroidTabletViewport: function () {
  var e = document.documentElement && document.compatMode == "CSS1Compat" ? document.documentElement : document.body, t = window.innerWidth > window.innerHeight ? !0 : !1, n = window.innerWidth, r = window.innerHeight;
  this.isPhone() ? (n = self.innerWidth ? self.innerWidth : e.clientWidth, r = self.innerHeight ? self.innerHeight : e.clientHeight) : window.devicePixelRatio > 1.5 && (n = Math.max(window.innerWidth, window.outerWidth, e.clientWidth), r = Math.max(window.innerHeight, window.outerHeight, e.clientHeight));
  if (t && n < r || !t && n > r) {
    var i = n;
    n = r, r = i
  }
  return{scrollTop: e.scrollTop || document.body.scrollTop, scrollLeft: e.scrollLeft, width: n, height: r}
}, getViewportInfo: function () {
  var e = document.documentElement && document.compatMode == "CSS1Compat" ? document.documentElement : document.body;
  return this.isAndroidDevice() ? this.getAndroidTabletViewport() : {scrollTop: e.scrollTop || document.body.scrollTop, scrollLeft: e.scrollLeft, width: self.innerWidth ? self.innerWidth : e.clientWidth, height: self.innerHeight ? self.innerHeight : e.clientHeight}
}, isTouchDevice: function () {
  if (typeof this._isTouchDevice == "undefined") {
    var e = navigator.userAgent.toLowerCase(), t = ["iphone", "ipod", "android", "webos", "ipad"];
    for (var n = 0; n < t.length; n++)if (e.indexOf(t[n]) >= 0) {
      this._deviceName = t[n], this._isTouchDevice = !0;
      break
    }
  }
  return this._isTouchDevice
}, isAndroidDevice: function () {
  return this._deviceName === "android" ? !0 : !1
}, isTablet: function () {
  return typeof this._isTablet == "undefined" && (this._isTablet = this.isTouchDevice() && document.documentElement.clientWidth > 640), this._isTablet
}, isPhone: function () {
  return typeof this._isPhone == "undefined" && (this._isPhone = this._isTouchDevice && !this.isTablet()), this._isPhone
}, getDisplayType: function () {
  var e;
  return UPay.Browser.isTouchDevice() ? UPay.Browser.isTablet() ? e = "tablet" : e = "phone" : e = "desktop", e
}, getDocumentSize: function () {
  var e = 0, t = 0, n = document;
  return e = Math.max(Math.max(n.body.scrollWidth, n.documentElement.scrollWidth), Math.max(n.body.offsetWidth, n.documentElement.offsetWidth), Math.max(n.body.clientWidth, n.documentElement.clientWidth)), t = Math.max(Math.max(n.body.scrollHeight, n.documentElement.scrollHeight), Math.max(n.body.offsetHeight, n.documentElement.offsetHeight), Math.max(n.body.clientHeight, n.documentElement.clientHeight)), {width: e, height: t}
}}, UPay.EventProvider = {subscribers: function () {
  return this._subscribersMap || (this._subscribersMap = {}), this._subscribersMap
}, subscribe: function (e, t) {
  var n = this.subscribers();
  n[e] ? n[e].push(t) : n[e] = [t]
}, unsubscribe: function (e, t) {
  var n = this.subscribers()[e];
  if (n)for (var r = 0; r < n.length; r++)n[r] == t && (n[r] = null)
}, monitor: function (e, t) {
  if (!t()) {
    var n = this, r = function () {
      t.apply(t, arguments) && n.unsubscribe(e, r)
    };
    this.subscribe(e, r)
  }
}, clear: function (e) {
  delete this.subscribers()[e]
}, fire: function () {
  var e = Array.prototype.slice.call(arguments), t = e.shift(), n = this.subscribers()[t];
  if (n)for (var r = 0; r < n.length; r++)n[r] && n[r].apply(this, e)
}}, UPay.Event = UPay.copy({}, UPay.EventProvider), UPay.Callback = {fire: function (e, t, n) {
  try {
    e && e(t, n)
  } catch (r) {
    UPay.log("Error executing: " + e)
  }
}}, UPay.Dom = {insertBeforeHTML: function (e, t) {
  var n = document.createElement("div");
  n.innerHTML = t, e.parentNode.insertBefore(n.childNodes[0], e)
}, observe: function (e, t, n) {
  e ? e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent("on" + t, n) : UPay.log("Cannot observe on this element")
}, preventDefault: function (e) {
  e.preventDefault ? e.preventDefault() : e.returnValue = !1
}, containsCss: function (e, t) {
  var n = " " + e.className + " ";
  return n.indexOf(" " + t + " ") >= 0
}, addCss: function (e, t) {
  UPay.Dom.containsCss(e, t) || (e.className = e.className + " " + t)
}, removeCss: function (e, t) {
  UPay.Dom.containsCss(e, t) && (e.className = e.className.replace(t, ""), UPay.Dom.removeCss(e, t))
}, getStyle: function (e, t) {
  var n = !1, r = e.style;
  if (t == "opacity")return r.opacity ? r.opacity * 100 : r.MozOpacity ? r.MozOpacity * 100 : r.KhtmlOpacity ? r.KhtmlOpacity * 100 : r.filters ? r.filters.alpha.opacity : 0;
  if (e.currentStyle)UPay.Array.forEach(t.match(/\-([a-z])/g), function (e) {
    t = t.replace(e, e.substr(1, 1).toUpperCase())
  }), n = e.currentStyle[t]; else {
    UPay.Array.forEach(t.match(/[A-Z]/g), function (e) {
      t = t.replace(e, "-" + e.toLowerCase())
    });
    if (window.getComputedStyle) {
      n = document.defaultView.getComputedStyle(e, null).getPropertyValue(t);
      if (t == "background-position-y" || t == "background-position-x")if (n == "top" || n == "left")n = "0px"
    }
  }
  return n
}, getOffsetRect: function (e) {
  var t = e.getBoundingClientRect(), n = document.body, r = document.documentElement, i = window.pageYOffset || r.scrollTop || n.scrollTop, s = window.pageXOffset || r.scrollLeft || n.scrollLeft, o = r.clientTop || n.clientTop || 0, u = r.clientLeft || n.clientLeft || 0, a = t.top + i - o, f = t.left + s - u;
  return{top: Math.round(a), left: Math.round(f)}
}, findPos: function (e) {
  var t = curtop = 0;
  if (e.offsetParent)do t += e.offsetLeft, curtop += e.offsetTop; while (e = e.offsetParent);
  return{left: t, top: curtop}
}, setStyle: function (e, t, n) {
  var r = e.style;
  t == "opacity" ? (n >= 100 && (n = 99.999), n < 0 && (n = 0), r.opacity = n / 100, r.MozOpacity = n / 100, r.KhtmlOpacity = n / 100, r.filters && (r.filters.alpha.opacity = n)) : r[t] = n
}, addScript: function (e) {
  var t = document.createElement("script");
  return t.type = "text/javascript", t.src = e, document.getElementsByTagName("HEAD")[0].appendChild(t)
}, addCssRules: function (e, t) {
  UPay.Dom._cssRules || (UPay.Dom._cssRules = {});
  var n = !0;
  UPay.Array.forEach(t, function (e) {
    e in UPay.Dom._cssRules || (n = !1, UPay.Dom._cssRules[e] = !0)
  });
  if (n)return;
  if (UPay.Browser.getBrowserType() != "ie") {
    var r = document.createElement("style");
    r.type = "text/css", r.textContent = e, document.getElementsByTagName("HEAD")[0].appendChild(r)
  } else try {
    document.createStyleSheet().cssText = e
  } catch (i) {
    document.styleSheets[0] && (document.styleSheets[0].cssText += e)
  }
}, ready: function (e) {
  UPay.Dom._isReady ? e() : UPay.Event.subscribe("dom.ready", e)
}}, function () {
  function domReady() {
    UPay.Dom._isReady = !0, UPay.Event.fire("dom.ready"), UPay.Event.clear("dom.ready")
  }

  if (UPay.Dom._isReady || document.readyState == "complete")return domReady();
  document.addEventListener ? document.addEventListener("DOMContentLoaded", domReady, !1) : document.attachEvent && document.attachEvent("onreadystatechange", domReady), UPay.Browser.getBrowserType() == "ie" && window === top && function () {
    try {
      document.documentElement.doScroll("left")
    } catch (e) {
      setTimeout(arguments.callee, 0);
      return
    }
    domReady()
  }();
  var oldonload = window.onload;
  window.onload = function () {
    domReady(), oldonload && (typeof oldonload == "string" ? eval(oldonload) : oldonload())
  }
}(), UPay.QS = {encode: function (e, t, n) {
  t = t === undefined ? "&" : t, n = n === !1 ? function (e) {
    return e
  } : encodeURIComponent;
  var r = [];
  for (var i in e)e[i] !== null && typeof e[i] != "undefined" && r.push(n(i) + "=" + n(e[i]));
  return r.sort(), r.join(t)
}, decode: function (e) {
  var t = decodeURIComponent, n = {}, r = e.split("&"), i, s;
  for (i = 0; i < r.length; i++)s = r[i].split("=", 2), s && s[0] && (n[t(s[0])] = t(s[1]));
  return n
}}, UPay.Template = {apply: function (e, t) {
  return e.replace(/#\{(.+?)\}/g, function (e, n) {
    return typeof t[n] == "undefined" ? "" : t[n]
  })
}, templateSettings: {evaluate: /<%([\s\S]+?)%>/g, interpolate: /<%=([\s\S]+?)%>/g}, parse: function (e, t) {
  var n = this.templateSettings, r = "var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('" + e.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(n.interpolate,function (e, t) {
    return"'," + t.replace(/\\'/g, "'") + ",'"
  }).replace(n.evaluate || null,function (e, t) {
    return"');" + t.replace(/\\'/g, "'").replace(/[\r\n\t]/g, " ") + "__p.push('"
  }).replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/\t/g, "\\t") + "');}return __p.join('');", i = new Function("obj", r);
  return t ? i(t) : i
}, h: function (e) {
  if (e)return(new String(e)).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}}, UPay.Config = {Common: {assetHost: "sandbox-static.v.me", usingCDN: "true", permanentResourceHost: "sandbox-static.v.me", permanentResourceProtocol: "https", temporaryResourceHost: "sandbox-static.v.me", namespace: "v"}, Wallet: {proxyPath: "/wallet/proxy.html", xdPath: "/upay-xd.html", apiBase: "https://sandbox-web.v.me", getBalancePath: "/wallet/api/getBalance.json", debitPath: "/wallet/api/debitWallet.json", checkStatusPath: "/wallet/api/getStatus.json", getCallIdPath: "/wallet/api/getCallId.json", getWalletTransactionPath: "/wallet/api/getWalletTrans.json", confirmCancelIntentPath: "/wallet/api/cancel.json", paylistPath: "/controller/api/config/getpaylist.json", checkStatusTimeOut: 6e4, checkStatusInterval: 2e3}, Payment: {pagePath: "/html/payment/v.html"}, Profile: {apiBase: "https://sandbox-web.v.me", getInitDataPath: "/lookup/getInitializationData.json"}, Beacon: {apiBase: "https://sandbox-web.v.me", recordPath: "/controller/api/config/ct.json", flowPath: "/controller/api/config/it.json"}}, UPay.AC = {init: function (e) {
  this._configs = e
}, get: function (e, t) {
  return typeof this._configs[e] != "undefined" ? this._configs[e] : t
}, extend: function (e) {
  UPay.copy(this._configs, e, !0)
}}, UPay.Token = {getUserToken: function (e, t) {
  return UPay._settings.userToken ? UPay._settings.userToken.split(":").length == 3 ? "u:" + UPay._settings.userToken : "u:" + UPay._settings.apikey + ":" + UPay._settings.userToken : "u:" + (e || UPay._settings.apikey) + ":" + (t || UPay._settings.token)
}, getContextToken: function (e, t) {
  return"e:" + e + ":" + t
}, getSecurityToken: function (e) {
  if (e)return"s:" + e
}}, UPay.Currency = {_symbols: {USD: "$", JPY: "¥", EUR: "€"}, _htmlSafeSymbols: {USD: "&#36;", JPY: "&#165;", EUR: "&#8364;"}, isReal: function (e) {
  return e == undefined ? !1 : e.length == 3 || !!this._symbols[e]
}, getSymbol: function (e) {
  return this._symbols[e] || "$"
}, getHtmlSafeSymbol: function (e) {
  return this._htmlSafeSymbols[e] || "&#36;"
}}, UPay.Localization = {_locale: "en_US", _language: "en", _region: "US", _dictionary: {Buy: {ja: "購入", zh: "购买", nl: "aankopen", fr: "accepter", de: "einkaufen", it: "Compra", pt: "adquirir", ro: "Cumpără", ru: "Купить", es: "comprar", th: "ซื้อ", tr: "Satın Al"}, "Buy More Points": {ja: "ポイントの購入", zh: "購買更多的積分", nl: "Koop Meer Punten", fr: "Acheter plus de points", de: "Mehr kaufen Punkte", it: "Acquista altri punti", pt: "Comprar mais pontos", ro: "Cumpăra mai multe puncte", ru: "Купить больше очков", es: "Compre más puntos", th: "ซื้อ", tr: "Daha fazla puan al"}, "Recent Transactions": {ja: "決済履歴", zh: "最近交易", nl: "Recente transacties", fr: "Transactions récentes", de: "Aktuelle Transaktionen", it: "Transazioni recenti", pt: "Transações recentes", ro: "Tranzacţii recente", ru: "Недавние транзакции", es: "Transacciones recientes", th: "ธุรกรรมที่ผ่านมา", tr: "Yakın tarihteki Para Transferleri"}, Subscribe: {ja: "登録", zh: "订阅", nl: "abonneren", fr: "Abonnez-vous", de: "zeichnen", it: "abbonarsi", pt: "subscrever", ro: "subscrie", ru: "подписываться", es: "suscribir", th: "สมัครสมาชิก", tr: "imzalamak"}, Redeem: {ja: "償還する", zh: "赎回", nl: "verlossen", fr: "racheter", de: "einlösen", it: "riscattare", pt: "resgatar", ro: "răscumpăra", ru: "выкупать", es: "redimir", th: "ไถ่ถอน", tr: "kurtarmak"}, Billing: {ja: "請求", zh: "帐单", nl: "Billing", fr: "facturation", de: "Billing", it: "fatturazione", pt: "faturamento", ro: "de facturare", ru: "Платежная", es: "facturación", th: "การเรียกเก็บเงิน", tr: "Fatura"}, "Learn More": {fr: "En savoir plus"}, "Checkout With": {fr: "Payez avec"}, "Pay With": {fr: "Payez avec"}, Close: {fr: "Fermer"}, "V.me is currently down at this time. We should be up and running shortly. We apologize for any inconvenience.": {fr: "V.me est actuellement indisponible.  Nous devrions être de retour très prochainement. Toutes nos excuses pour le désagrément causé"}}, setLocale: function (e) {
  var t = e.replace("-", "_"), n, r = UPay.AC.get("app.setting.supportedLocales");
  if (r) {
    var i = !1;
    for (var s in r)if (r[s].toLowerCase() === t.toLowerCase()) {
      i = !0;
      break
    }
    i || (t = "en_US")
  }
  t.indexOf("_") != -1 ? n = t.split("_") : t.length == 2 ? n = [t.toLowerCase()] : alert("Unsupported locale format"), this._language = n[0].toLowerCase(), this._locale = this._language, n.length > 1 && (this._region = n[1].toUpperCase(), this._locale = this._locale + "_" + this._region)
}, getLanguage: function () {
  return this._language
}, getLocale: function () {
  return this._locale
}, t: function (e) {
  return this._dictionary[e] && this._dictionary[e][this._locale] || this._dictionary[e] && this._dictionary[e][this._language] || e
}}, UPay.XD = {_callbackPrefix: "UPay.XD", _getUrlLimit: 2e3, _scbs: {}, _ecbs: {}, _xdPath: null, _idCounter: 1, init: function (e) {
  this._allowableDomains = e.allowableDomains, this._xdPath = e.xdPath;
  var t = this, n = function (e) {
    var n, r = !1;
    for (n = 0; n < t._allowableDomains.length; n++)if (e.origin === t._allowableDomains[n]) {
      r = !0;
      break
    }
    if (r) {
      var i = e.data.indexOf("-"), s = e.data.substr(0, i).split("."), o = e.data.substr(i + 1), u = window;
      for (n = 0; n < s.length; n++)u = u[s[n]];
      u && u(o)
    }
  };
  typeof window.addEventListener != "undefined" ? window.addEventListener("message", n, !1) : typeof window.attachEvent != "undefined" && window.attachEvent("onmessage", n)
}, request: function (e) {
  var t = {}, n;
  for (n in e.params)typeof e.params[n] != "undefined" && (t[n] = e.params[n]);
  !e.method || e.method.toUpperCase() == "GET" ? this._jsonp(e.url, t, e.success, e.error) : this._iframe(e.url, t, e.success, e.error)
}, _processJsonp: function (e, t, n, r) {
  n && n(r), e.parentNode.removeChild(e), this._cleanUpCB(t)
}, _cleanUpCB: function (e) {
  delete this._scbs[e], delete this._ecbs[e]
}, _prepUrl: function (e, t) {
  return e + (e.indexOf("?") == -1 ? "?" : "&") + this._encode_params(t)
}, _jsonp: function (e, t, n, r) {
  var i = this._guid(), s = this._prepUrl(e, t);
  s = this._prepUrl(s, {_transport: "jsonp", _scb: this._callbackPrefix + "._scbs." + i, _ecb: this._callbackPrefix + "._ecbs." + i});
  if (s.length > this._getUrlLimit)this._iframe(e, t, callback); else {
    var o = document.createElement("script");
    o.async = !0;
    var u = this;
    this._scbs[i] = function (e) {
      u._processJsonp(o, i, n, e)
    }, this._ecbs[i] = function (e) {
      u._processJsonp(o, i, r, e)
    }, o.src = s, document.getElementsByTagName("head")[0].appendChild(o)
  }
}, _processIframe: function (e, t, n, r, i, s) {
  r && r(JSON.parse(i)), t.src = "about:blank", window.setTimeout(function () {
    var n = t.parentNode;
    n.removeChild(t), n.parentNode.removeChild(n), s && delete e
  }, 1e3), this._cleanUpCB(n)
}, _iframe: function (e, t, n, r) {
  var i, s, o = this._guid(), u, a = "ActiveXObject"in window && typeof window.postMessage == "undefined";
  a ? (i = new ActiveXObject("htmlfile"), i.open(), i.write("<html><body><iframe id='iframe' name='" + o + "' src='javascript:false' style='position:absolute;top:-1000px;'></iframe></body></html>"), i.close(), s = i.getElementById("iframe"), i.parentWindow.UPay = window.UPay) : (i = document, u = i.createElement("div"), i.body.appendChild(u), u.innerHTML = '<iframe name="' + o + '" src="javascript:false" style="position:absolute; top:-1000px"></iframe>', s = u.firstChild);
  var f = this._guid(), l = this;
  this._scbs[f] = function (e) {
    l._processIframe(i, s, f, n, e, a)
  }, this._ecbs[f] = function (e) {
    l._processIframe(i, s, f, r, e, a)
  };
  var c = i.createElement("form"), h = document.location.protocol + "//" + window.location.host + (this._xdPath ? this._xdPath : window.location.pathname + window.location.search + (window.location.search ? "&" : "?") + "xdId=" + f);
  c.action = this._prepUrl(e, {_scb: this._callbackPrefix + "._scbs." + f, _ecb: this._callbackPrefix + "._ecbs." + f, _xdUrl: h, _transport: "jsonp"}), c.target = o, c.method = "POST", i.body.appendChild(c), this._addFormData(i, c, t), c.submit(), c.parentNode.removeChild(c)
}, _addFormData: function (e, t, n) {
  for (var r in n) {
    var i = e.createElement("input");
    i.name = r, i.value = n[r], t.appendChild(i)
  }
}, _encode_params: function (e, t, n) {
  t = t === undefined ? "&" : t, n = n === !1 ? function (e) {
    return e
  } : encodeURIComponent;
  var r = [];
  for (var i in e)e[i] !== null && typeof i != "undefined" && r.push(n(i) + "=" + n(e[i]));
  return r.join(t)
}, _guid: function () {
  var e = "f" + this._idCounter;
  return this._idCounter++, e
}}, UPay.Service = {TopUp: function (e, t) {
  this.callbacks = t, this.params = e
}, Balance: function (e, t) {
  this.params = e, this.callbacks = t
}, updateBalance: function (e) {
  UPay.Api.getBalance({currency: e}, function (t) {
    UPay.Event.fire("updateBalance", t.data)
  })
}, Subscribe: function (e, t) {
  this.params = e, this.callbacks = t
}, Redeem: function (e, t) {
  this.params = e, this.callbacks = t
}, PayList: function (e, t) {
  this.params = e, this.callbacks = t
}}, UPay.Service.PayList.prototype = {start: function () {
  var e = this;
  UPay.Api.getPayList(e.params, function (t) {
    t.status == 200 && e.callbacks.success(t)
  })
}}, UPay.Service.Balance.prototype = {start: function () {
  var e = this;
  UPay.Api.getBalance(e.params, function (t) {
    t.status.code == "OKAY" ? e.callbacks.success(t) : t.status.code == "ERROR" && e.callbacks.error(t)
  })
}}, UPay.Service.TopUp.prototype = {start: function () {
  var e = this, t = UPay.FlowId.generateId(e.params.apikey, "topup"), n = UPay.CorId.generateId(t);
  UPay.Api.getCallId({corId: n}, function (r) {
    if (r.status.code == "OKAY") {
      var i = {callId: r.callId, callNo: "1", apikey: e.params.apikey, flowId: t, corId: n, currency: e.params.currency, stoken: UPay.Token.getSecurityToken(e.params.securityToken), success: function (t) {
        UPay.Service.updateBalance(e.params.currency), e.callbacks.success && e.callbacks.success(t)
      }, cancel: function () {
        e.callbacks.cancel && e.callbacks.cancel()
      }};
      e.callbacks.ready && e.callbacks.ready(i)
    }
  })
}}, UPay.Service.Subscribe.prototype = {start: function () {
  var e = this, t = UPay.FlowId.generateId(this.params.apikey, "subscribe"), n = {apikey: e.params.apikey, currency: e.params.currency, planId: e.params.planId, productId: e.params.productId, flowId: t, corId: UPay.CorId.generateId(t), stoken: UPay.Token.getSecurityToken(e.params.securityToken), success: function (t) {
    e.callbacks.success && e.callbacks.success(t)
  }, cancel: function () {
    e.callbacks.cancel && e.callbacks.cancel()
  }, pending: function () {
    e.callbacks.pending && e.callbacks.pending()
  }, suspended: function () {
    e.callbacks.suspended && e.callbacks.suspended()
  }};
  e.callbacks.ready && e.callbacks.ready(n)
}}, UPay.Service.Redeem.prototype = {start: function () {
  var e = this, t = UPay.FlowId.generateId(this.params.apikey, "redeem"), n = {apikey: e.params.apikey, flowId: t, corId: UPay.CorId.generateId(t), success: function (t) {
    e.callbacks && e.callbacks.success(t)
  }, cancel: function () {
    e.callbacks.cancel && e.callbacks.cancel()
  }};
  e.callbacks.ready && e.callbacks.ready(n)
}}, UPay.Api = {init: function (e) {
  UPay.XD.init({allowableDomains: [UPay.Config.Wallet.apiBase], xdPath: e.xdPath});
  var t = this;
  UPay.PM.bind("proxyApi.start", function (e) {
    t[e.apiName](e.params, function (t) {
      var n = UPay.$(e.frameId);
      n && UPay.PM.send({name: n.name, target: n.contentWindow, type: "proxyApi.done", data: {callbackId: e.callbackId, data: t}, url: n.src})
    }, e.opts)
  })
}, _resourceParams: ["apikey", "userid"], _preparePathAndParams: function (e, t, n) {
  var r = n || {}, i = {userid: r.userid || UPay._settings.userid}, s = {};
  if (n && n.enc || UPay._settings.advancedConfiguration.get("enc")) {
    var o = n && n.enc ? n.enc : UPay._settings.advancedConfiguration.get("enc");
    for (var u in o) {
      var a = "enc." + u;
      o[u] && typeof o[u] == "string" && (i[a] = o[u])
    }
  }
  for (var f in t)UPay.Array.indexOf(this._resourceParams, f) != -1 ? i[f] = t[f] : f != "token" && f != "securityToken" && f != "flowId" && f != "corId" && (s[f.toLowerCase()] = t[f]);
  var l = UPay.QS.encode(i);
  l += "&token=" + (r.userToken || UPay.Token.getUserToken()), t.securityToken && (l += "&token=" + UPay.Token.getSecurityToken(t.securityToken)), t.apikey && t.token && (l += "&token=" + UPay.Token.getContextToken(t.apikey, t.token)), t.flowId && (l += "&__flw=" + t.flowId), t.corId && (l += "&__crl=" + t.corId), UPay._settings.country && (l += "&country=" + UPay._settings.country), UPay.Localization.getLocale() && (l += "&locale=" + UPay.Localization.getLocale());
  if (r.pickParams) {
    var c = this.parseCustomParams(s);
    c && (r.pickParams = [].concat(r.pickParams), r.pickParams = r.pickParams.concat(c)), s = UPay.Object.pick.apply(null, [s, r.pickParams])
  }
  return{path: e + "?" + l, params: s}
}, getBalance: function (e, t, n) {
  var r = this._preparePathAndParams(UPay.Config.Wallet.getBalancePath, e, n);
  UPay.XD.request({method: "GET", url: UPay.Config.Wallet.apiBase + r.path, params: r.params, success: function (e) {
    t({status: {code: "OKAY"}, data: {amount: e.balance[0].amount, currency: e.balance[0].currency, symbol: e.balance[0].symbol}})
  }, error: function (e) {
    t({status: {code: "ERROR"}})
  }})
}, debitWallet: function (e, t, n) {
  n = n || {}, n.pickParams = ["productid", "currency", "description", "activity", "amount", "merchtrans"];
  var r = this._preparePathAndParams(UPay.Config.Wallet.debitPath, e, n);
  UPay.XD.request({method: "POST", url: UPay.Config.Wallet.apiBase + r.path, params: r.params, success: function (e) {
    var n = {code: e.state}, r = e;
    t({status: n, data: r})
  }, error: function (e) {
    "INSUFFICIENT_BALANCE" == e.code ? t({status: {code: "INSUFFICIENT"}, data: {transaction: {symbol: e.symbol, amount: e.amount, currency: e.currency}, callId: e.callid, callNo: e.callno}}) : "FORBIDDEN" == e.code && t({status: {code: "FORBIDDEN"}, data: {transaction: {symbol: e.symbol, amount: e.amount, currency: e.currency, errorCode: "FORBIDDEN_COUNTRY"}, callId: e.callid, callNo: e.callno}})
  }})
}, parseCustomParams: function (e) {
  var t = UPay.Array.keys(e), n = UPay.Array.filter(t, function (e) {
    if (e.substr(0, 6) === "custom")return e
  });
  return n
}, checkStatus: function (e, t, n) {
  var r = this._preparePathAndParams(UPay.Config.Wallet.checkStatusPath, UPay.copy({details: !0}, e), n);
  UPay.XD.request({method: "GET", url: UPay.Config.Wallet.apiBase + r.path, params: r.params, success: function (e) {
    var n = {code: e.state}, r = e;
    t({status: n, data: r})
  }, error: function (e) {
    "INSUFFICIENT" == e.code ? t({status: {code: "INSUFFICIENT"}}) : "NOT_FOUND" == e.code && t({status: {code: "NOT_FOUND"}})
  }})
}, getCallId: function (e, t, n) {
  var r = this._preparePathAndParams(UPay.Config.Wallet.getCallIdPath, e, n);
  UPay.XD.request({method: "GET", url: UPay.Config.Wallet.apiBase + r.path, params: r.params, success: function (e) {
    t({status: {code: "OKAY"}, callId: e.tag})
  }, error: function (e) {
    t({status: {code: "ERROR"}})
  }})
}, confirmCancelIntent: function (e, t, n) {
  var r = this._preparePathAndParams(UPay.Config.Wallet.confirmCancelIntentPath, e, n);
  UPay.XD.request({method: "GET", url: UPay.Config.Wallet.apiBase + r.path, params: r.params, success: function (e) {
    t({status: {code: "SUCCESS"}, data: {transaction: {amount: e.amount, currency: e.currency, name: e.name, shortName: e.shortName, description: e.description}}})
  }, error: function (e) {
  }})
}, getProfile: function (e, t, n) {
  var r = this._preparePathAndParams(UPay.Config.Profile.getInitDataPath, {}, n);
  UPay.XD.request({method: "GET", url: UPay.Config.Profile.apiBase + r.path, params: r.params, success: function (e) {
    t({status: {code: "SUCCESS"}, data: {country: e.country}})
  }, error: function (e) {
  }})
}, getPayList: function (e, t, n) {
  var r = this._preparePathAndParams(UPay.Config.Wallet.paylistPath, e, n);
  UPay.XD.request({method: "GET", url: UPay.Config.Wallet.apiBase + r.path, params: r.params, success: function (e) {
    t(e)
  }, error: function (e) {
    t({status: {code: "ERROR"}})
  }})
}}, UPay.Content = {_root: null, _hiddenRoot: null, _callbacks: {}, append: function (e, t) {
  t || (UPay.Content._root ? t = UPay.Content._root : (UPay.Content._root = t = UPay.$("v-root"), t ? t.className += " upay_reset" : (UPay.log('The "v-root" div has not been created.'), UPay.Content._root = t = document.createElement("div"), t.id = "v-root", document.body.appendChild(t))));
  if (typeof e == "string") {
    var n = document.createElement("div");
    return t.appendChild(n).innerHTML = e, n
  }
  return t.appendChild(e)
}, appendHidden: function (e) {
  if (!UPay.Content._hiddenRoot) {
    var t = document.createElement("div"), n = t.style;
    n.position = "absolute", n.top = "-10000px", n.width = n.height = 0, UPay.Content._hiddenRoot = UPay.Content.append(t)
  }
  return UPay.Content.append(e, UPay.Content._hiddenRoot)
}, insertIframe: function (e) {
  e.id = e.id || UPay.guid(), e.name = e.name || UPay.guid();
  var t = UPay.guid(), n = !1, r = !1;
  UPay.Content._callbacks[t] = function () {
    n && !r && (r = !0, e.onload && e.onload(e.root.firstChild))
  };
  if (document.attachEvent) {
    var i = '<iframe id="' + e.id + '"' + ' name="' + e.name + '"' + (e.className ? ' class="' + e.className + '"'
      : "") + ' style="border:none;' + (e.width ? "width:" + e.width + "px;" : "") + (e.height ? "height:" + e.height + "px;" : "") + '"' + ' src="' + e.url + '"' + ' frameborder="0"' + " title=" + e.title + ' scrolling="no"' + ' allowtransparency="true"' + ' onload="UPay.Content._callbacks.' + t + '()"' + "></iframe>";
    e.root.innerHTML = '<iframe src="javascript:false" frameborder="0" scrolling="no" style="height:1px"></iframe>', n = !0, e.root.innerHTML = i
  } else {
    var s = document.createElement("iframe");
    s.id = e.id, s.name = e.name, s.onload = UPay.Content._callbacks[t], s.frameBorder = "no", s.scrolling = "no", s.style.border = "none", s.style.overflow = "hidden", s.title = e.title, e.className && (s.className = e.className), e.height && (s.style.height = e.height + "px"), e.width && (s.style.width = e.width + "px"), e.root.appendChild(s), n = !0, s.src = e.url
  }
}, postTarget: function (e) {
  var t = document.createElement("form");
  t.action = e.url, t.target = e.target, t.method = "POST", UPay.Content.appendHidden(t), UPay.Array.forEach(e.params, function (e, n) {
    if (e !== null && e !== undefined) {
      var r = document.createElement("input");
      r.name = n, r.value = e, t.appendChild(r)
    }
  }), t.submit(), t.parentNode.removeChild(t)
}}, UPay.Dialog = {_loaderEl: null, _stack: [], _active: null, _modal: null, _findRoot: function (e) {
  while (e) {
    if (UPay.Dom.containsCss(e, "upay_dialog"))return e;
    e = e.parentNode
  }
}, _showLoader: function (e, t) {
  UPay.Dialog._loaderEl || (UPay.Dialog._loaderEl = UPay.Dialog._findRoot(UPay.Dialog.create({content: '<div class="upay_dialog_loader"><a id="upay_dialog_loader_close"></a></div>'})));
  var n = UPay.$("upay_dialog_loader_close");
  e ? (UPay.Dom.removeCss(n, "upay_hidden"), n.onclick = function () {
    UPay.Dialog._hideLoader(), e()
  }) : (UPay.Dom.addCss(n, "upay_hidden"), n.onclick = null), t && t.width && (this._loaderEl.style.width = t.width + "px"), UPay.Dialog._makeActive(UPay.Dialog._loaderEl)
}, _makeModal: function () {
  this._modal = document.createElement("div"), this._modal.id = "upay-modal", UPay.Content.append(this._modal)
}, _showModal: function () {
  this._modal ? this._modal.style.display = "block" : this._makeModal(), this._modal.style.height = UPay.Browser.getDocumentSize().height + "px"
}, _hideModal: function () {
  this._modal && (this._modal.style.display = "none")
}, _hideLoader: function () {
  UPay.Dialog._loaderEl && UPay.Dialog._loaderEl == UPay.Dialog._active && (UPay.Dialog._loaderEl.style.top = "-10000px")
}, _getSuggestedWidth: function () {
  var e = document.location.href.match(/upay\.width=(\d+)/);
  if (e)return e[1];
  var t = UPay.Browser.getViewportInfo(), n = UPay.Browser.isTablet() ? 540 : 620;
  return UPay.Browser.isTablet() ? n = 540 : n = Math.min(t.width - 0, UPay.AC.get("iframe.width", 620)), n
}, _getSuggestedHeight: function () {
  return UPay.Browser.isPhone() ? (window.scrollTo(0, 0), window.innerHeight) : 100
}, _makeActive: function (e) {
  UPay.Dialog._lowerActive(), UPay.Dialog._doCenter(e), UPay.Dialog._active = e
}, _doCenter: function (e) {
  var t = {width: parseInt(e.offsetWidth, 10), height: parseInt(e.offsetHeight, 10)}, n = UPay.Browser.getViewportInfo(), r = n.scrollLeft + (n.width - t.width) / 2, i = n.scrollTop + (n.height - t.height) / 2.5;
  e.style.left = (r > 0 ? r : 0) + "px", UPay.Browser.isPhone() ? (e.style.top = "0px", e.style.left = "0px", e.style.width = n.width + "px", e.style.offsetHeight = n.height + "px", window.scrollTo(0, 0)) : (e.style.top = (i > 0 ? i : 0) + "px", e.style.left = (r > 0 ? r : 0) + "px")
}, center: function (e) {
  var t = UPay.Dialog._findRoot(e);
  UPay.Dialog._doCenter(t)
}, doHide: function (e) {
  var t = UPay.Dialog._findRoot(e);
  t.style.top = "-5000px"
}, _lowerActive: function () {
  if (!UPay.Dialog._active)return;
  UPay.Dialog._active.style.top = "-10000px", UPay.Dialog._active = null
}, _removeStacked: function (e) {
  UPay.Dialog._stack = UPay.Array.filter(UPay.Dialog._stack, function (t) {
    return t != e
  })
}, create: function (e) {
  e = e || {}, e.modal && this._showModal(), e.loader && UPay.Dialog._showLoader(e.onClose, {width: e.width});
  var t = document.createElement("div"), n = document.createElement("div"), r = "upay_dialog";
  if (e.closeIcon && e.onClose) {
    var i = document.createElement("a");
    i.className = "upay_dialog_close_icon", i.onclick = e.onClose, t.appendChild(i)
  }
  return UPay.Browser.getBrowserType() == "ie" ? (r += " upay_dialog_legacy", UPay.Array.forEach(["vert_left", "vert_right", "horiz_top", "horiz_bottom", "top_left", "top_right", "bottom_left", "bottom_right"], function (e) {
    var n = document.createElement("span");
    n.className = "upay_dialog_" + e, t.appendChild(n)
  })) : r += " upay_dialog_advanced", e.content && UPay.Content.append(e.content, n), t.className = r, n.className = "upay_dialog_content", t.appendChild(n), UPay.Content.append(t), e.visible && UPay.Dialog.show(t), n
}, show: function (e) {
  e = UPay.Dialog._findRoot(e), e && e != UPay.Dialog._active && (UPay.Dialog._removeStacked(e), UPay.Dialog._hideLoader(), UPay.Dialog._makeActive(e), UPay.Dialog._stack.push(e))
}, remove: function (e) {
  e = UPay.Dialog._findRoot(e);
  if (e) {
    var t = UPay.Dialog._active == e;
    UPay.Dialog._removeStacked(e), t && (UPay.Dialog._stack.length > 0 ? UPay.Dialog.show(UPay.Dialog._stack.pop()) : (UPay.Dialog._lowerActive(), this._hideModal())), window.setTimeout(function () {
      e.parentNode.removeChild(e)
    }, 3e3)
  }
}}, UPay.MessageHandlers = {_handlers: [], add: function (e, t) {
  this._handlers.push({type: e, fn: t})
}, get: function (e) {
  var t = this._handlers || [];
  for (var n = 0; n < t.length; n++)if (t[n] && t[n].type == e)return t[n].fn
}, fire: function (e, t) {
  this.get(e)(t)
}}, UPay.Messenger = {_iframeQueue: [], _processIframeQueue: function () {
  if (this._iframeQueue.length > 0 && this._iframeQueue.length == 1) {
    var e = this._iframeQueue[0], t = UPay._protocol + UPay.Config.Common.permanentResourceHost + "/receiver.html", n = t + "?" + encodeURIComponent(JSON.stringify(e)), r = document.getElementById("messageFrame");
    r || (r = document.createElement("iframe"), r.id = "messageFrame", r.style.cssText = "position:absolute;top:-1000px;", r.src = "javascript:false", UPay.Dom.observe(r, "load", UPay.Messenger._processNextIframe), document.body.appendChild(r)), r.src = n
  }
}, _processNextIframe: function () {
  UPay.Messenger._iframeQueue.shift(), UPay.Messenger._processIframeQueue()
}, resize: function (e) {
  this._post("height", e)
}, setTitle: function (e) {
  this._post("title", e)
}, setNextText: function (e) {
  this._post("setText", {next: e})
}, showInlineFooter: function (e, t) {
  this._post("showInlineFooter", {link: e, country: t})
}, setBackText: function (e, t) {
  var n = {back: e};
  t && t.style && (n.style = t.style, n.show = t.show), this._post("setText", n)
}, resume: function (e) {
  this._post("resume", e)
}, stop: function (e) {
  this._post("stop", e)
}, setParam: function (e, t) {
  this._post("param", {name: e, value: t})
}, setParams: function (e) {
  this._post("params", e)
}, fireEvent: function (e, t) {
  this._post(e, t)
}, _post: function (e, t) {
  var n = {};
  n.type = "iframeMessage:" + e, n.data = t || {}, window.postMessage ? parent.postMessage(JSON.stringify(n), "*") : (this._iframeQueue.push(n), this._processIframeQueue())
}, bind: function (e, t) {
  this._initPostMessage(), UPay.MessageHandlers.add(e, t)
}, _initPostMessage: function () {
  if (this._inited == undefined) {
    this._inited = !0;
    var e = this, t = function (t) {
      var n = t || window.event;
      t.data && t.data.indexOf("iframeMessage") > -1 && e.processMessage(t.data, t)
    };
    window.addEventListener ? window.addEventListener("message", t, !1) : window.attachEvent && window.attachEvent("onmessage", t)
  }
}, processMessage: function (e) {
  var t = JSON.parse(e), n = t.type && t.type.split(":").length == 2 ? t.type.split(":")[1] : undefined, r = t.data;
  n && UPay.MessageHandlers.get(n) && UPay.MessageHandlers.fire(n, r)
}}, UPay._settings = {}, UPay.LocalStorage = {set: function (e, t) {
  try {
    return localStorage.setItem(e, t), !0
  } catch (n) {
  }
  return!1
}, get: function (e) {
  try {
    return localStorage.getItem(e)
  } catch (t) {
  }
  return!1
}, remove: function (e) {
  try {
    return localStorage.removeItem(e), !0
  } catch (t) {
  }
  return!1
}, isAvailable: function () {
  if (typeof this._isAvailable == "undefined")if (typeof window.localStorage == "undefined")this._isAvailable = !1; else {
    var e = "__test", t = (new Date).getTime().toString();
    this.set(e, t);
    var n = this.get(e);
    this.remove(e), this._isAvailable = t == n
  }
  return this._isAvailable
}}, UPay.Beacon = {record: function (e) {
  var t = UPay.Config.Beacon.apiBase + UPay.Config.Beacon.recordPath + "?apikey=" + e;
  if (UPay.LocalStorage.isAvailable()) {
    var n = UPay.LocalStorage.get("__clt");
    n && (t += "&__clt=" + n)
  }
  UPay.AC.get("widgets.buy.checkServerStatus") && this.serverStatusCheck(), UPay.XD.request({url: t, method: "POST", success: function (e) {
    UPay._clientId = e.clientid, UPay._cookieEnabled = e.cookieEnabled, UPay.LocalStorage.isAvailable() && (UPay.LocalStorage.set("__clt", UPay._clientId), UPay.LocalStorage.set("__ce", UPay._cookieEnabled.toString())), UPay._serverIsUp = !0
  }})
}, serverStatusCheck: function () {
  var e = UPay.AC.get("widgets.buy.checkServerStatus");
  e && setTimeout(function () {
    UPay._serverIsUp || (UPay._serverDown = !0, UPay.Event.fire("serverDown", !0))
  }, e)
}}, UPay.FlowId = {generateId: function (e, t) {
  var n = (new Date).getTime();
  return UPay.XD.request({url: UPay.Config.Beacon.apiBase + UPay.Config.Beacon.flowPath + "?apikey=" + e + "&__flw=" + n, method: "POST", params: {flow: t}}), n
}}, UPay.CorId = {generateId: function (e) {
  var t = UPay._clientId, n = UPay._cookieEnabled, r;
  return UPay.LocalStorage.isAvailable() && typeof t == "undefined" && typeof n == "undefined" && (t = UPay.LocalStorage.get("__clt"), n = UPay.LocalStorage.get("__ce") === "true"), t ? (r = t + "." + e + "_WDGT", n === !1 && (r = "SOLO_" + r)) : (r = Math.floor(Math.random() * 1e19) + "." + (new Date).getTime() + "." + e + "_WDGT", UPay.LocalStorage.isAvailable() ? r = "EARLY_" + r : r = "ANON_" + r), r
}}, UPay.UI = {_active: {}}, UPay.UI.Base = function (e) {
  this.id = UPay.guid(), this.baseUrl = this.getStaticPageUrl(UPay._protocol, UPay.Config.Common.permanentResourceHost, UPay.Config.Payment.pagePath, UPay.Config.Common.usingCDN, UPay.version), this.size = {width: UPay.Dialog._getSuggestedWidth(), height: UPay.Dialog._getSuggestedHeight()}, this.callback = e.callback, this.flow = e.flow
}, UPay.UI.Base.prototype = UPay.copy({prepareCall: function (e) {
  var t = {};
  return t.id = e.id, t.url = e.baseUrl, e.params && (t.url += "#" + UPay.QS.encode(e.params) + "&parentUrl=" + encodeURIComponent(window.location.href.split("#")[0]), /[&#]+upd=1/.test(window.location.href) && (t.url += "&upd=1")), t.size = e.size, t
}, process: function (e) {
  e.className = "UPay_UI_Dialog", e.root = UPay.Dialog.create({loader: !0, modal: !0, width: e.size.width}), UPay.Dom.addCss(e.root, "upay_dialog_iframe"), this._insertIframe(e), UPay.UI._active[e.id] = e.root.firstChild, this.node = e.root.firstChild, this.bindListener(e.id), this._attachOrientationChange()
}, resize: function (e, t) {
  var n = parseInt(e, 10), r = parseInt(t, 10);
  r && (UPay.Browser.isPhone() && window.innerHeight > r ? this.node.style.height = window.innerHeight + "px" : r !== parseInt(this.node.style.height, 10) && (this.node.style.height = r + "px")), n && (this.node.style.width = n + "px")
}, _attachOrientationChange: function () {
  var e = this;
  UPay.Browser.isAndroidDevice() ? this._orientationChangeHandler = function () {
    UPay.Dialog.doHide(e.node), window.setTimeout(function () {
      var t = UPay.Browser.isPhone() ? window : e.node.contentWindow;
      e.node.style.width = UPay.Dialog._getSuggestedWidth() + "px", e.node.style.height = (UPay.Browser.isPhone() ? t.innerHeight : e.node.style.height) + "px", UPay.PM.send({name: e.id, target: e.node.contentWindow, type: "orientation:change", data: {orientation: window.orientation, width: e.node.style.width, height: e.node.style.height}, url: e.node.src}), UPay.Dialog.center(e.node)
    }, 500)
  } : this._orientationChangeHandler = function () {
    e.node.style.width = UPay.Dialog._getSuggestedWidth() + "px", UPay.Dialog.center(e.node);
    var t = UPay.Browser.isPhone() ? window : e.node.contentWindow;
    UPay.PM.send({name: e.id, target: e.node.contentWindow, type: "orientation:change", data: {orientation: window.orientation, width: t.innerWidth, height: t.innerHeight}, url: e.node.src})
  }, UPay.Event.subscribe("orientation:change", this._orientationChangeHandler)
}, _detachOrientationChange: function () {
  UPay.Event.unsubscribe("orientation:change", this._orientationChangeHandler)
}, _insertIframe: function (e) {
  UPay.Content.insertIframe({id: e.id, name: e.id, url: e.url, root: e.root, className: e.className, title: UPay.Localization.t("Payment Modal Banner & Footer (please ignore – system will place focus here when needed, press escape to close)"), width: e.size.width, height: e.size.height, onload: function (e) {
  }})
}, bindListener: function (e) {
  var t = this;
  UPay.PM.bind(e, function (e) {
    e.event == "resizeFrame" ? (t.resize(e.data.width, e.data.height), UPay.Dialog.show(t.node)) : e.event == "setUserid" ? UPay._settings.userid = e.data : e.event == "setUserToken" ? UPay._settings.userToken = e.data : e.event == "setEncUserid" ? UPay._settings.advancedConfiguration.get("enc") ? UPay._settings.advancedConfiguration.get("enc").userid = e.data : UPay._settings.advancedConfiguration = new UPay.AdvancedConfiguration({enc: {userid: e.data}}, UPay._settings.advancedConfiguration) : e.callbackId ? t.fire(e.event, e.data, function (n) {
      UPay.PM.send({name: t.node.name, target: t.node.contentWindow, type: "message.done", data: {callbackId: e.callbackId, data: n}, url: t.node.src})
    }) : t.fire(e.event, e.data)
  })
}, close: function () {
  this._detachOrientationChange(), UPay.Dialog.remove(this.node), UPay.PM.unbind(this.id), delete this.node
}, open: function (e) {
  var t = this.buildWizardParams(e.params), n = this.baseUrl + "#" + UPay.QS.encode(t) + "&parentUrl=" + encodeURIComponent(window.location.href.split("#")[0]), r = UPay.Dialog.create({loader: !0, modal: !0, width: this.size.width});
  UPay.Dom.addCss(r, "upay_dialog_iframe");
  var i = this;
  UPay.Content.insertIframe({id: this.id, name: this.id, url: n, root: r, className: "UPay_UI_Dialog", title: UPay.Localization.t("Payment Modal Banner & Footer (please ignore – system will place focus here when needed, press escape to close)"), width: this.size.width, height: this.size.height, onload: function (e) {
    i.node = e
  }}), this.node = r.firstChild;
  if (!UPay.Browser.isTouchDevice())try {
    document.getElementById(this.node.id).focus()
  } catch (s) {
  }
  this._attachOrientationChange(), this.bindListener(this.id)
}, buildWizardParams: function (e) {
  return UPay.copy({openerId: this.id, locale: UPay.Localization.getLocale(), display: UPay.Browser.getDisplayType(), country: UPay._settings.country || "US", utoken: UPay.Token.getUserToken(), userid: UPay._settings.userid, payProfile: UPay._settings.payProfile, adapter: "lightbox", flow: this.flow, collectShipping: this.collectShipping, namespace: UPay.Config.Common.namespace, cssUrl: UPay._settings.cssUrl, upd: /[&#]+upd=1/.test(window.location.href) ? "1" : null}, e, !0)
}, getStaticPageUrl: function (e, t, n, r, i) {
  var s = e;
  return r && r != "false" ? s = s + t + "/v/" + i + n : s = s + t + n + "?v=" + i, /[&#]+upd=1/.test(window.location.href) && (s = s.replace("/" + UPay.Config.Common.namespace + ".html", "/" + UPay.Config.Common.namespace + ".d.html")), s
}}, UPay.EventProvider), UPay.Object.subclass("UI.Payment", "UI.Base", function (e) {
  this.baseUrl = this.getStaticPageUrl(UPay._protocol, UPay.Config.Common.permanentResourceHost, UPay.Config.Payment.pagePath, UPay.Config.Common.usingCDN, UPay.version), this.size = {width: UPay.Dialog._getSuggestedWidth(), height: 100}, this.id = UPay.guid(), this.callId = e.callId, this.callNo = e.callNo, this.activity = e.activity, this.currentCallNo = e.callNo, this.apikey = e.apikey, this.etoken = e.etoken, this.amount = e.amount, this.productId = e.productId, this.currentBalance = e.currentBalance, this.originalAmount = e.originalAmount, this.currency = e.currency, this.flow = e.flow, this.flowId = e.flowId, this.corId = e.corId, this.successCallback = e.success, this.pendingCallback = e.pending, this.cancelCallback = e.cancel, this.theme = e.theme, this.logoUrl = e.logoUrl, this.logoText = e.logoText, this.payCode = e.payCode, this.showMethodLink = e.showMethodLink, this.productDesc = e.productDesc, this.productImage = e.productImage, this.vcBundleId = e.vcBundleId, this.applyUpoints = e.applyUpoints, this.symbol = e.symbol, this.completeUrl = e.completeUrl, this.completeXdUrl = e.completeXdUrl, this.merchTrans = e.merchTrans, this.email = e.email, this.stoken = e.stoken, this.payListSize = e.payListSize, this.applyUpoints = e.applyUpoints, this.disableCountryDropDown = e.disableCountryDropDown, this.tax = e.tax, this.payProfile = e.payProfile, this.collectBillingAddress = e.collectBillingAddress, this.opts = e, this.errorCode = e.errorCode, "item" == this.flow && this.incrementCurrentCallNo()
}, {incrementCurrentCallNo: function () {
  this.currentCallNo = (parseInt(this.currentCallNo) + 1).toString()
}, makePaymentParams: function () {
  this.params = {openerId: this.id, flowId: this.flowId, corId: this.corId, country: UPay._settings.country, utoken: UPay.Token.getUserToken(), userid: UPay._settings.userid, stoken: this.stoken, etoken: this.etoken, productId: this.productId, payProfile: UPay._settings.payProfile, adapter: "lightbox", theme: this.theme, display: UPay.Browser.getDisplayType(), locale: UPay.Localization.getLocale(), apikey: this.apikey, callId: this.callId, callNo: this.currentCallNo, activity: this.activity, logoUrl: this.logoUrl, logoText: this.logoText, payCode: this.payCode, showMethodLink: this.showMethodLink, productDesc: this.productDesc, productImage: this.productImage, completeUrl: this.completeUrl, completeXdUrl: this.completeXdUrl, authUrl: this.opts.authUrl, authXdUrl: this.opts.authXdUrl, authBypass: this.opts.authBypass, disclaimerUrl: this.opts.disclaimerUrl, disclaimerXdUrl: this.opts.disclaimerXdUrl, envName: this.opts.envName, useMerchantCurrency: this.opts.useMerchantCurrency, merchTrans: this.merchTrans, email: this.email, namespace: UPay.Config.Common.namespace, cssUrl: UPay._settings.cssUrl, xdPath: UPay._settings.xdPath, payListSize: this.payListSize, collectBillingAddress: this.collectBillingAddress, up: this.applyUpoints, disableCountryDropDown: this.disableCountryDropDown, errorCode: this.errorCode}, this.upBalance && (this.params.upBalance = this.upBalance), this.vcBundleId && (this.params.vcBundleId = this.vcBundleId), UPay.Currency.isReal(this.currency) ? (this.params.amount = this.amount, this.params.currency = this.currency, this.params.symbol = this.symbol || UPay.Currency.getSymbol(this.currency)) : (this.params.virtualAmount = this.amount, this.params.virtualCurrency = this.currency), this.flow && (this.params.flow = this.flow), this.currentBalance && (this.params.currentBalance = this.currentBalance), this.originalAmount && (this.params.originalAmount = this.originalAmount), UPay.outcome && (this.params.outcome = UPay.outcome), this.tax && (this.params.taxAmount = this.tax.amount, this.params.taxCurrency = this.tax.currency, this.params.taxType = this.tax.type), this.params.payProfile = this.payProfile
}, canUseUPoints: function () {
  return this.applyUpoints && "item" == this.flow && UPay.Currency.isReal(this.currency) && UPay._settings.userid
}, onReadyHandler: function () {
  var e = this;
  e.makePaymentParams();
  var t = e.prepareCall({id: e.id, baseUrl: e.baseUrl, size: e.size, params: e.params});
  e.process(t)
}, start: function () {
  if (UPay._settings.country)this.onReadyHandler(); else {
    var e = this;
    setTimeout(function () {
      e.start()
    }, 10)
  }
}, bindListener: function (e) {
  var t = this;
  UPay.PM.bind(e, function (n) {
    var r = UPay.UI._active[e];
    if (!r)return;
    if (n.event == "resizeFrame")n.data.height && (r.style.height = parseInt(n.data.height, 10) + "px"), n.data.width && (r.style.width = n.data.width + "px"), UPay.Dialog.show(r); else if (n.event === "partialPayment" || n.event === "cancelPayment" || n.event === "debit.success" || n.event === "debit.pending" || n.event === "topup.success") {
      t._detachOrientationChange(), UPay.Dialog.remove(r), UPay.PM.unbind(e), delete UPay.UI._active[e];
      switch (n.event) {
        case"partialPayment":
          t.cancelCallback({callId: t._callId});
          break;
        case"cancelPayment":
          t.cancelCallback({callId: t._callId});
          break;
        case"debit.success":
        case"topup.success":
          t.successCallback(t.successData);
          break;
        case"debit.pending":
          t.pendingCallback()
      }
    } else if (n.event === "setCallId")t._callId = payload.data; else if (n.event == "setUserid")UPay._settings.userid = n.data; else if (n.event == "setUserToken")UPay._settings.userToken = n.data; else if (n.event == "setEncUserid")UPay._settings.advancedConfiguration.get("enc") ? UPay._settings.advancedConfiguration.get("enc").userid = n.data : UPay._settings.advancedConfiguration = new UPay.AdvancedConfiguration({enc: {userid: n.data}}, UPay._settings.advancedConfiguration); else if (n.event == "paymentSubmitted") {
      var i = (new Date).getTime();
      (function s() {
        setTimeout(function () {
          var r = (new Date).getTime() - i > UPay.Config.Wallet.checkStatusTimeOut;
          UPay.Api.checkStatus({apikey: t.apikey, callId: n.data.callId, callNo: n.data.callNo}, function (i) {
            i.status.code != "NOT_FOUND" && "PENDING" !== i.status.code || !!r ? i.status.code == "TIMEOUT" || r ? UPay.PM.send({name: e, target: UPay.UI._active[e].contentWindow, type: "walletMessage", data: {event: "creditTimeout"}, url: UPay.UI._active[e].src}) : i.status.code == "PROCESSED" && ("item" == t.flow ? UPay.Api.checkStatus({apikey: t.apikey, callId: n.data.callId, callNo: t.callNo}, function (n) {
              n.status.code == "PROCESSED" ? (UPay.PM.send({name: e, target: UPay.UI._active[e].contentWindow, type: "walletMessage", data: {event: "debitSuccess", data: {transaction: i.data.transaction, credit: i.data.credit}}, url: UPay.UI._active[e].src}), t.successData = n) : n.status.code == "INSUFFICIENT" && (UPay.Service.updateBalance(t.currency), UPay.PM.send({name: e, target: UPay.UI._active[e].contentWindow, type: "walletMessage", data: {event: "creditInsufficient", data: {need: n.data.transaction, transaction: i.data.transaction, credit: i.data.credit}}, url: UPay.UI._active[e].src}))
            }) : (UPay.PM.send({name: e, target: UPay.UI._active[e].contentWindow, type: "walletMessage", data: {event: "creditSuccess", data: {transaction: i.data.transaction, credit: i.data.credit}}, url: UPay.UI._active[e].src}), t.successData = i)) : s()
          })
        }, UPay.Config.Wallet.checkStatusInterval)
      })()
    }
  })
}}), UPay.Object.subclass("UI.Payment_02", "UI.Base", function (e) {
  this._base(e), this.collectShipping = e.collectShipping, this.etoken = e.etoken, this.successCallback = e.success, this.pendingCallback = e.pending, this.cancelCallback = e.cancel
}, {}), UPay.Object.subclass("UI.Subscribe", "UI.Payment", function (e) {
  this.baseUrl = this.getStaticPageUrl(UPay._protocol, UPay.Config.Common.permanentResourceHost, UPay.Config.Payment.pagePath, UPay.Config.Common.usingCDN, UPay.version), this.size = {width: UPay.Dialog._getSuggestedWidth(), height: 100}, this.id = UPay.guid(), this.opts = e, this.successCallback = e.success, this.cancelCallback = e.cancel, this.pendingCallback = e.pending, this.suspendedCallback = e.suspended
}, {makePaymentParams: function () {
  this.params = {openerId: this.id, country: UPay._settings.country, utoken: UPay.Token.getUserToken(), stoken: this.opts.stoken, userid: UPay._settings.userid, payProfile: this.opts.paymentProfile, adapter: "lightbox", theme: this.opts.theme, display: UPay.Browser.getDisplayType(), locale: UPay.Localization.getLocale(), apikey: this.opts.apikey, flow: this.opts.flow, flowId: this.opts.flowId, corId: this.opts.corId, gift: this.opts.gift, email: this.opts.email, productId: this.opts.productId, planId: this.opts.planId, paymentId: this.opts.paymentId, currency: this.opts.currency, useMerchantCurrency: this.opts.useMerchantCurrency, activity: this.opts.activity, merchTrans: this.opts.merchTrans, logoUrl: this.opts.logoUrl, completeUrl: this.opts.completeUrl, completeXdUrl: this.opts.completeXdUrl, authUrl: this.opts.authUrl, authXdUrl: this.opts.authXdUrl, authBypass: this.opts.authBypass, disclaimerUrl: this.opts.disclaimerUrl, disclaimerXdUrl: this.opts.disclaimerXdUrl, envName: this.opts.envName, productDesc: this.opts.productDesc, productImage: this.opts.productImage, upBalance: this.upBalance, namespace: UPay.Config.Common.namespace, custom: this.opts.custom, cssUrl: UPay._settings.cssUrl, xdPath: UPay._settings.xdPath, payListSize: this.opts.payListSize, disableCountryDropDown: this.opts.disableCountryDropDown}, UPay._settings.advancedConfiguration.get("enc") && (this.params.enc = JSON.stringify(UPay._settings.advancedConfiguration.get("enc")))
}, canUseUPoints: function () {
  return this.opts.applyUpoints && UPay._settings.userid
}, bindListener: function (e) {
  var t = this;
  UPay.PM.bind(e, function (n) {
    var r = UPay.UI._active[e];
    if (!r)return;
    if (n.event == "resizeFrame")n.data.height && (r.style.height = parseInt(n.data.height, 10) + "px"), n.data.width && (r.style.width = n.data.width + "px"), UPay.Dialog.show(r); else if (n.event == "partialPayment" || n.event == "paymentCompleted" || n.event == "profileCompleted" || n.event == "debit.pending" || n.event == "giftPurchaseSuccess" || n.event == "giftCodePending" || n.event == "subscriptionSuspended" || n.event == "subscriptionSuccess") {
      UPay.Dialog.remove(r), UPay.PM.unbind(e), delete UPay.UI._active[e];
      switch (n.event) {
        case"partialPayment":
          UPay.Api.confirmCancelIntent({apikey: t.apikey, callId: n.data.callId}, function () {
          }), t.cancelCallback();
          break;
        case"giftPurchaseSuccess":
          t.successCallback({event: "giftPurchase.success", data: {productId: t.successData.data.productId, paymentType: n.data.paymentTypes}});
          break;
        case"paymentCompleted":
          t.successCallback({event: "payment.success", data: {productId: t.successData.data.productId, paymentType: n.data.paymentTypes}});
          break;
        case"subscriptionSuccess":
          t.successCallback({event: "subscribe.success", data: {productId: n.data.productId, paymentType: n.data.paymentTypes}});
          break;
        case"debit.pending":
        case"giftCodePending":
        case"profileCompleted":
          t.pendingCallback();
          break;
        case"subscriptionSuspended":
          t.suspendedCallback()
      }
    } else if (n.event == "closeWindow" || n.event == "cancelPayment")UPay.Dialog.remove(r), UPay.PM.unbind(e), delete UPay.UI._active[e], t.cancelCallback(); else if (n.event == "setUserid")UPay._settings.userid = n.data; else if (n.event == "setUserToken")UPay._settings.userToken = n.data; else if (n.event == "setEncUserid")UPay._settings.advancedConfiguration.get("enc") ? UPay._settings.advancedConfiguration.get("enc").userid = n.data : UPay._settings.advancedConfiguration = new UPay.AdvancedConfiguration({enc: {userid: n.data}}, UPay._settings.advancedConfiguration); else if (n.event == "paymentSubmitted") {
      var i = (new Date).getTime();
      (function s() {
        setTimeout(function () {
          var r = (new Date).getTime() - i > UPay.Config.Wallet.checkStatusTimeOut, o = {};
          UPay._settings.advancedConfiguration.get("enc") && (o.enc = UPay._settings.advancedConfiguration.get("enc")), UPay.Api.checkStatus({apikey: t.opts.apikey, callId: n.data.callId, callNo: n.data.callNo}, function (i) {
            i.status.code != "NOT_FOUND" && "PENDING" !== i.status.code || !!r ? i.status.code == "TIMEOUT" || r ? UPay.PM.send({name: e, target: UPay.UI._active[e].contentWindow, type: "walletMessage", data: {event: "subscribe.creditTimeout"}, url: UPay.UI._active[e].src}) : i.status.code == "PROCESSED" && "subscribe" == t.opts.flow && UPay.Api.checkStatus({apikey: t.opts.apikey, callId: n.data.callId, callNo: 1}, function (n) {
              n.status.code == "PROCESSED" ? (UPay.PM.send({name: e, target: UPay.UI._active[e].contentWindow, type: "walletMessage", data: {event: "subscribe.debitSuccess", data: {transaction: i.data.transaction}}, url: UPay.UI._active[e].src}), t.successData = n) : n.status.code == "INSUFFICIENT" && (UPay.Service.updateBalance(t.currency), UPay.PM.send({name: e, target: UPay.UI._active[e].contentWindow, type: "walletMessage", data: {event: "creditInsufficient", data: {need: n.data.transaction, transaction: i.data.transaction, credit: i.data.credit}}, url: UPay.UI._active[e].src}))
            }) : s()
          }, o)
        }, UPay.Config.Wallet.checkStatusInterval)
      })()
    }
  })
}}), UPay.Object.subclass("UI.Redeem", "UI.Subscribe", null, {makePaymentParams: function () {
  this.params = {openerId: this.id, country: UPay._settings.country, utoken: UPay.Token.getUserToken(), userid: UPay._settings.userid, adapter: "lightbox", theme: this.opts.theme, display: UPay.Browser.getDisplayType(), locale: UPay.Localization.getLocale(), apikey: this.opts.apikey, flow: this.opts.flow, flowId: this.opts.flowId, corId: this.opts.corId, productDesc: this.opts.productDesc, productImage: this.opts.productImage, logoUrl: this.opts.logoUrl, completeUrl: this.opts.completeUrl, completeXdUrl: this.opts.completeXdUrl, authUrl: this.opts.authUrl, authXdUrl: this.opts.authXdUrl, authBypass: this.opts.authBypass, envName: this.opts.envName, namespace: UPay.Config.Common.namespace, custom: this.opts.custom, email: this.opts.email, cssUrl: UPay._settings.cssUrl, xdPath: UPay._settings.xdPath}, UPay._settings.advancedConfiguration.get("enc") && (this.params.enc = JSON.stringify(UPay._settings.advancedConfiguration.get("enc")))
}, bindListener: function (e) {
  var t = this;
  UPay.PM.bind(e, function (n) {
    var r = UPay.UI._active[e];
    if (!r)return;
    n.event == "resizeFrame" ? (n.data.height && (r.style.height = parseInt(n.data.height, 10) + "px"), n.data.width && (r.style.width = n.data.width + "px"), UPay.Dialog.show(r)) : n.event == "redeemCompleted" ? (UPay.Dialog.remove(r), UPay.PM.unbind(e), delete UPay.UI._active[e], t.successCallback()) : n.event == "closeWindow" || n.event == "cancelPayment" ? (UPay.Dialog.remove(r), UPay.PM.unbind(e), delete UPay.UI._active[e], t.cancelCallback()) : n.event == "setUserid" ? UPay._settings.userid = n.data : n.event == "setUserToken" ? UPay._settings.userToken = n.data : n.event == "setEncUserid" && (UPay._settings.advancedConfiguration.get("enc") ? UPay._settings.advancedConfiguration.get("enc").userid = n.data : UPay._settings.advancedConfiguration = new UPay.AdvancedConfiguration({enc: {userid: n.data}}, UPay._settings.advancedConfiguration))
  })
}}), UPay.Object.subclass("UI.Transaction", "UI.Base", function (e) {
  this.apikey = e.apikey, this.userid = e.userid, this.token = e.token, this.theme = e.theme, this.size = {width: UPay.Dialog._getSuggestedWidth(), height: 100}, this.id = UPay.guid()
}, {start: function () {
  var e = this.prepareCall({id: this.id, baseUrl: UPay.Config.Transaction.pageUrl, params: {walletApiBase: UPay.Config.Wallet.apiBase, walletTransactionPath: UPay.Config.Wallet.getWalletTransactionPath, walletProxyPath: UPay.Config.Wallet.proxyPath, userid: this.userid, token: this.token, apikey: this.apikey, openerId: this.id, theme: this.theme, display: UPay.Browser.getDisplayType(), locale: UPay.Localization.getLocale(), cssUrl: UPay._settings.cssUrl}, size: this.size});
  this.process(e)
}, bindListener: function (e) {
  var t = this;
  UPay.PM.bind(e, function (t) {
    var n = UPay.UI._active[e];
    if (!n)return;
    t.event == "resizeFrame" ? (t.data.height && (n.style.height = t.data.height + "px"), t.data.width && (n.style.width = t.data.width + "px"), UPay.Dialog.show(n)) : t.event == "closeWindow" && (UPay.Dialog.remove(n), UPay.PM.unbind(e), delete UPay.UI._active[e])
  })
}}), UPay.Object.subclass("UI.Billing", "UI.Base", null, {}), UPay.Service.Billing = function (e, t) {
  this.params = e, this.callbacks = t;
  var n = this;
  this.ui = new UPay.UI.Billing({flow: "billing"}), this.ui.subscribe("cancelPayment", function () {
    n.ui.close(), n.callbacks && n.callbacks.cancel && n.callbacks.cancel()
  }), this.ui.subscribe("paymentProfile.success", function () {
    n.ui.close(), n.callbacks && n.callbacks.success && n.callbacks.success()
  })
}, UPay.Service.Billing.prototype = {start: function () {
  var e = UPay.FlowId.generateId(this.params.apikey, "billing"), t = {logoUrl: this.params.logoUrl, productDesc: this.params.productDesc, productImage: this.params.productImage, productId: this.params.productId, apikey: this.params.apikey, theme: this.params.theme, authUrl: this.params.authUrl, authXdUrl: this.params.authXdUrl, authBypass: this.params.authBypass, flow: "billing", flowId: e, corId: UPay.CorId.generateId(e)};
  UPay._settings.advancedConfiguration.get("enc") && (t.enc = JSON.stringify(UPay._settings.advancedConfiguration.get("enc"))), this.ui.open({params: t})
}}, UPay.Service.Buy = function (e, t) {
  this.params = e, this.callbacks = t, this.shippingAddressMethod = e.shippingAddressMethod, this.shippingMethodsMethod = e.shippingMethodsMethod, this.beforeSummaryMethod = e.beforeSummaryMethod, this.collectShipping = e.collectShipping, this.collectBillingAddress = e.collectBillingAddress, this.process = e.process, this.total = e.total, this.ui = new UPay.UI.Payment_02({});
  var n = this;
  this.collectShipping === !0 && (this.ui.subscribe("calculateShipping", function (e) {
    n.calculateTax(e)
  }), this.ui.subscribe("getShippingAddress", function (e, t) {
    n.getShippingAddress(t)
  }), this.ui.subscribe("getShippingMethods", function (e, t) {
    n.getShippingMethods(e, t)
  })), this.ui.subscribe("getBeforeSummary", function (e, t) {
    n.getBeforeSummary(e, t)
  }), this.ui.subscribe("cancelPayment", function () {
    n.ui.close(), n.callbacks.ready && n.callbacks.ready(), n.callbacks.eventListener && UPay.Callback.fire(n.callbacks.eventListener, "purchase.cancel")
  }), this.ui.subscribe("purchase.init", function (e) {
    n.callbacks.eventListener && UPay.Callback.fire(n.callbacks.eventListener, "purchase.init", e)
  }), this.ui.subscribe("purchase.success", function (e) {
    n.callbacks.eventListener && UPay.Callback.fire(n.callbacks.eventListener, "purchase.success", e), n.ui.close(), n.callbacks.ready && n.callbacks.ready()
  }), this.ui.subscribe("purchase.pending", function (e) {
    n.callbacks.eventListener && UPay.Callback.fire(n.callbacks.eventListener, "purchase.pending", e), n.ui.close(), n.callbacks.ready && n.callbacks.ready()
  }), this.ui.subscribe("purchase.error", function (e) {
    n.callbacks.eventListener && UPay.Callback.fire(n.callbacks.eventListener, "purchase.error", e), n.callbacks.ready && n.callbacks.ready()
  })
}, UPay.Service.Buy.prototype = {start: function () {
  var e = this;
  if (this.process === "validate") {
    var t = UPay.FlowId.generateId(this.params.apikey, "purchase.validate"), n = {apikey: e.params.apikey, etoken: UPay.Token.getContextToken(e.params.apikey, e.params.token), stoken: UPay.Token.getSecurityToken(e.params.securityToken), currency: e.params.currency, payCode: e.params.payCode, showMethodLink: e.params.showMethodLink, process: e.params.process, symbol: "$", amount: e.params.amount, total: e.params.total, flow: "purchase.validate", collectShipping: this.collectShipping, collectBillingAddress: this.collectBillingAddress, currentBalance: 0, activity: e.params.activity, productId: e.params.productId, productDesc: e.params.productDesc, logoUrl: e.params.logoUrl, logoText: e.params.logoText, theme: e.params.theme, merchTrans: e.params.merchTrans, payListSize: e.params.payListSize, completeUrl: e.params.completeUrl, completeXdUrl: e.params.completeXdUrl, authUrl: e.params.authUrl, authXdUrl: e.params.authXdUrl, authBypass: e.params.authBypass, custom: e.params.custom, hasBeforeSummary: typeof this.beforeSummaryMethod == "function" ? !0 : !1, flowId: t, corId: UPay.CorId.generateId(t), payProfile: e.params.payProfile, merchantId: e.params.merchantId, applicationId: e.params.applicationId};
    e.ui.open({params: n})
  } else {
    var t = UPay.FlowId.generateId(e
      .params.apikey, "debit.item"), r = UPay.CorId.generateId(t);
    if (UPay._settings.userid && (UPay._settings.token || UPay._settings.userToken))UPay.Api.debitWallet(UPay.copy({flowId: t, corId: r}, e.params), function (n) {
      var i = n.data.callId;
      e._callId = i, e.callbacks.init && e.callbacks.init({callId: i});
      if (n.status.code == "FORBIDDEN") {
        var s = {callId: i, callNo: 1, apikey: e.params.apikey, etoken: e.params.token, stoken: UPay.Token.getSecurityToken(e.params.securityToken), amount: n.data.transaction.amount, originalAmount: e.params.currency && UPay.Currency.isReal(e.params.currency) ? n.data.transaction.amount : e.params.amount, currency: e.params.currency, symbol: n.data.transaction.symbol, flow: "item", currentBalance: e.params.amount - n.data.transaction.amount, activity: e.params.activity, merchTrans: n.data.merchTrans, flowId: t, corId: r, country: e.params.country, errorCode: "FORBIDDEN_COUNTRY", cancel: function () {
          e.callbacks.cancel && e.callbacks.cancel({apikey: e.params.apikey, callId: i})
        }};
        e.callbacks.forbidden && e.callbacks.forbidden(s)
      } else if (n.status.code == "PROCESSED")e.callbacks.success && e.callbacks.success(n), UPay.Service.updateBalance(e.params.currency); else if (n.status.code == "INSUFFICIENT") {
        var s = {callId: i, callNo: 1, apikey: e.params.apikey, etoken: e.params.token, stoken: UPay.Token.getSecurityToken(e.params.securityToken), amount: n.data.transaction.amount, originalAmount: e.params.currency && UPay.Currency.isReal(e.params.currency) ? n.data.transaction.amount : e.params.amount, currency: e.params.currency, symbol: n.data.transaction.symbol, flow: "item", collectShipping: !1, collectBillingAddress: e.collectBillingAddress, showMethodLink: e.params.showMethodLink, currentBalance: e.params.amount - n.data.transaction.amount, activity: e.params.activity, merchTrans: n.data.merchTrans, flowId: t, corId: r, success: function (t) {
          e.callbacks.success && e.callbacks.success(t)
        }, pending: function () {
          e.callbacks.pending && e.callbacks.pending()
        }, cancel: function () {
          e.callbacks.cancel && e.callbacks.cancel({apikey: e.params.apikey, callId: i})
        }};
        n.data.tax && (s.tax = n.data.tax), e.callbacks.inSufficient && e.callbacks.inSufficient(s)
      } else e.callbacks.error(n)
    }); else {
      var i = {callNo: 1, apikey: e.params.apikey, etoken: UPay.Token.getContextToken(e.params.apikey, e.params.token), stoken: UPay.Token.getSecurityToken(e.params.securityToken), originalAmount: e.params.amount, currency: e.params.currency, flow: "item", productId: e.params.productId, collectShipping: !1, collectBillingAddress: e.collectBillingAddress, activity: e.params.activity, merchTrans: e.params.merchTrans, showMethodLink: e.params.showMethodLink, flowId: t, corId: r, success: function (t) {
        e.callbacks.success && e.callbacks.success(t)
      }, pending: function () {
        e.callbacks.pending && e.callbacks.pending()
      }, cancel: function (t) {
        e.callbacks.cancel && e.callbacks.cancel({apikey: e.params.apikey, callId: t.callId})
      }};
      e.callbacks.unauthenticated && e.callbacks.unauthenticated(i)
    }
  }
}, getShippingMethods: function (e, t) {
  var n = this.shippingMethodsMethod(e.locator);
  t({data: n})
}, getShippingAddress: function (e) {
  typeof this.shippingAddressMethod == "function" ? e({data: this.shippingAddressMethod()}) : e({data: null})
}, getBeforeSummary: function (e, t) {
  this.beforeSummaryMethod(e, t)
}, cancel: function () {
  this._callId && (UPay.Api.confirmCancelIntent({apikey: this.params.apikey, callId: this._callId}, function () {
  }), UPay.Callback.fire(this.params.callback, "debit.cancel"))
}}, UPay.Widget = {_instances: {}, getById: function (e) {
  return this._instances[e]
}, _tagInfos: [
  {localName: "wallet", className: "UPay.Widget.Tag.Init"},
  {localName: "init", className: "UPay.Widget.Tag.Init"},
  {localName: "balance", className: "UPay.Widget.Tag.Balance"},
  {localName: "buy", className: "UPay.Widget.Tag.Buy"},
  {localName: "paylist", className: "UPay.Widget.Tag.Paylist"},
  {localName: "topup", className: "UPay.Widget.Tag.Topup"},
  {localName: "subscribe", className: "UPay.Widget.Tag.Subscribe"},
  {localName: "redeem", className: "UPay.Widget.Tag.Redeem"},
  {localName: "billing", className: "UPay.Widget.Tag.Billing"}
], _renderTimeout: 3e4, parse: function (e, t) {
  e = e || document.body;
  var n = 1, r = function () {
    n--, n === 0 && (t && t(), UPay.Event.fire("widget.render"))
  };
  UPay.Array.forEach(UPay.Widget._tagInfos, function (t) {
    t.xmlns || (t.xmlns = UPay.Config.Common.namespace);
    var i = UPay.Widget._getDomElements(e, t.xmlns, t.localName);
    for (var s = 0; s < i.length; s++)n++, UPay.Widget._processElement(i[s], t, r)
  }), window.setTimeout(function () {
    n > 0 && UPay.log(n + " Widget tags failed to render in " + UPay.Widget._renderTimeout + "ms.")
  }, UPay.Widget._renderTimeout), r()
}, registerTag: function (e) {
  UPay.Widget._tagInfos.push(e)
}, _processElement: function (dom, tagInfo, cb) {
  var element = dom._element;
  if (element)element.subscribe("render", cb), element.process(); else {
    var processor = function () {
      var fn = eval(tagInfo.className), getBoolAttr = function (e) {
        var e = dom.getAttribute(e);
        return e && UPay.Array.indexOf(["true", "1", "yes", "on"], e.toLowerCase()) > -1
      }, isLogin = !1, showFaces = !0, renderInIframe = !1;
      tagInfo.className === "UPay.Widget.LoginButton" && (renderInIframe = getBoolAttr("render-in-iframe"), showFaces = getBoolAttr("show-faces"), isLogin = renderInIframe || showFaces, isLogin && (fn = UPay.Widget.Login)), element = dom._element = new fn(dom);
      if (isLogin) {
        var extraParams = {show_faces: showFaces}, perms = dom.getAttribute("perms");
        perms && (extraParams.perms = perms), element.setExtraParams(extraParams)
      }
      var elementId = element.getAttribute("id");
      elementId && (UPay.Widget._instances[elementId] = element), element.subscribe("render", cb), element.process()
    };
    UPay.CLASSES[tagInfo.className.substr(5)] ? processor() : UPay.log("Tag " + tagInfo.className + " was not found.")
  }
}, _getDomElements: function (e, t, n) {
  var r = t + ":" + n;
  switch (UPay.Browser.getBrowserType()) {
    case"mozilla":
      return e.getElementsByTagNameNS(document.body.namespaceURI, r);
    case"ie":
      try {
        var i = document.namespaces;
        if (i && i[t]) {
          var s = e.getElementsByTagName(n);
          if (s.length)return s
        }
      } catch (o) {
      }
      return e.getElementsByTagName(r);
    default:
      return e.getElementsByTagName(r)
  }
}}, function () {
  try {
    var e = UPay.Config.Common.namespace;
    if (document.namespaces && !document.namespaces.item[e]) {
      document.namespaces.add(e, "urn:schemas-ultimatepay-com:" + e, "#default#" + e.toUpperCase());
      var t = ["buy", "balance", "wallet", "init", "subscribe", "redeem", "billing"], n = document.createStyleSheet();
      for (var r = 0; r < t.length; r++)document.createElement(e + ":" + t[r]), n.addRule(e + "\\:" + t[r], "behavior:url(#default#" + e.toUpperCase() + ")"), document.createElement(e + ":" + t[r])
    }
  } catch (i) {
    UPay.log("couldn't add namespace")
  }
}(), UPay.Widget.Tag = {Renderer: {}}, UPay.Widget.Tag.Renderer.Empty = function (e, t, n, r) {
  UPay.Dom.observe(UPay.$(n.domId), "click", function (e) {
    return UPay.Dom.preventDefault(e), r.onClick(), !1
  })
}, UPay.Widget.Tag.Renderer.Empty.prototype = {update: function (e, t) {
}}, UPay.Widget.Tag.Base = function (e) {
  this.dom = e, this.isBusy = !1
}, UPay.Widget.Tag.Base.prototype = UPay.copy({getAttribute: function (e, t, n) {
  var r = this.dom.getAttribute(e) || this.dom.getAttribute(e.replace(/-/g, "_")) || this.dom.getAttribute(e.replace(/-/g, ""));
  return r ? n ? n(r) : r : t
}, getCustomAttributes: function () {
  var e = this.dom.attributes, t = {}, n;
  for (var r = 0; r < e.length; r++)n = e.item(r), n.name.indexOf("custom.") === 0 && (t[n.name] = n.value);
  return t
}, getCustomQS: function () {
  var e = this.getCustomAttributes(), t = {}, n;
  for (n in e)t[n.substr(7)] = e[n];
  return UPay.QS.encode(t)
}, _getBoolAttribute: function (e, t) {
  return this.getAttribute(e, t, function (e) {
    return e = e.toLowerCase(), e == "true" || e == "1" || e == "yes" || e == "on"
  })
}, _getPxAttribute: function (e, t) {
  return this.getAttribute(e, t, function (e) {
    var n = parseInt(e.replace("px", ""), 10);
    return isNaN(n) ? t : n
  })
}, _getAttributeFromList: function (e, t, n) {
  return this.getAttribute(e, t, function (e) {
    return e = e.toLowerCase(), UPay.Array.indexOf(n, e) > -1 ? e : t
  })
}, isValid: function () {
  for (var e = this.dom; e; e = e.parentNode)if (e == document.body)return!0
}, _doReady: function (e) {
  this.isBusy = !1, this.renderer.update("ready", e)
}, _doBusy: function (e) {
  this.isBusy = !0, this.renderer.update("busy", e)
}, clear: function () {
  this.dom.innerHTML = ""
}, getRendererClass: function (name, renderersMap, domId) {
  var className;
  if (domId && UPay.$(domId))return UPay.Widget.Tag.Renderer.Empty;
  renderersMap[name] ? className = renderersMap[name] : className = renderersMap["default"];
  try {
    var klass = eval(className);
    if (klass && typeof klass == "function")return klass;
    throw"Invalid render class: " + className
  } catch (err) {
    throw"Invalid render class: " + className
  }
}, _getApiKey: function () {
  return this.getAttribute("apikey", UPay._appConfig_apiKey || UPay._settings.apikey)
}, _getFunction: function (e, t) {
  return this.getAttribute(e, t, this._evalFunction)
}, _getCallback: function () {
  return this._evalFunction(this.getAttribute("callback", UPay._settings.callback))
}, _evalFunction: function (name) {
  if (name)try {
    return eval(name)
  } catch (e) {
    UPay.log("Bad function: " + name)
  }
}, _getTheme: function () {
  var e = this.getAttribute("theme", UPay._settings.theme || UPay.AC.get("default.theme", "default"));
  return e.indexOf(":") === 0 && (e = "default" + e), {widget: e.split(":")[0], payment: e, subscribe: e, redeem: e, wizard: e}
}, _getAdvancedConfiguration: function () {
  var configName = this.getAttribute("advanced") || this.getAttribute("advanced-configuration");
  if (configName)try {
    return eval(configName)
  } catch (e) {
    UPay.log("Bad advanced configuration: " + configName)
  }
}}, UPay.EventProvider), UPay.Object.subclass("Widget.Tag.Init", "Widget.Tag.Base", null, {process: function () {
  UPay._settings.apikey = this.getAttribute("apikey"), UPay._settings.userid = this.getAttribute("user-id"), UPay._settings.token = this.getAttribute("token"), UPay._settings.userToken = this.getAttribute("user-token"), UPay._settings.securityToken = this.getAttribute("security-token"), UPay._settings.callback = this.getAttribute("callback"), UPay._settings.theme = this.getAttribute("theme"), UPay._settings.logoUrl = this.getAttribute("logo-url"), UPay._settings.logoText = this.getAttribute("logo-text"), UPay._settings.payCode = this.getAttribute("method"), UPay._settings.country = this.getAttribute("country"), UPay._settings.payProfile = this.getAttribute("pay-profile"), UPay._settings.email = this.getAttribute("email"), UPay._settings.payListSize = this.getAttribute("pay-list-size"), UPay._settings.cssUrl = this.getAttribute("css-url"), UPay._settings.currency = this.getAttribute("currency"), UPay._settings.amount = this.getAttribute("amount"), UPay._settings.total = this.getAttribute("total"), UPay._settings.process = this.getAttribute("process"), UPay._settings.collectShipping = this._getBoolAttribute("collect-shipping"), UPay._settings.collectBillingAddress = this._getBoolAttribute("collect-billing-address", !0), UPay._settings.merchTrans = this.getAttribute("merch-trans"), UPay._settings.merchantId = this.getAttribute("merchant-id"), UPay._settings.applicationId = this.getAttribute("application-id"), UPay._settings.productId = this.getAttribute("product-id"), UPay._settings.productDesc = this.getAttribute("product-desc"), UPay._settings.productImage = this.getAttribute("product-image"), UPay._settings.envName = this.getAttribute("env"), UPay._settings.beforeSummaryMethod = this._getFunction("before-summary");
  var e = this.getAttribute("locale") || navigator.language || navigator.userLanguage || navigator.systemLanguage || "en_US";
  UPay.Localization.setLocale(e), UPay._settings.advancedConfiguration = new UPay.AdvancedConfiguration(this._getAdvancedConfiguration()), UPay._settings.country || UPay.Api.getProfile({apikey: UPay._settings.apikey, userid: UPay._settings.userid}, function (e) {
    e.status.code == "SUCCESS" && (UPay._settings.country = e.data.country)
  }), UPay._settings.xdPath = this.getAttribute("xd-path"), UPay.Event.fire("widget.init.render", {xdPath: UPay._settings.xdPath}), this.fire("render")
}}), UPay.Object.subclass("Widget.Tag.Buy", "Widget.Tag.Base", null, {process: function () {
  UPay.Event.subscribe("serverDown", UPay.Object.bind(this.serverDown, this)), this.parser();
  var e = this.getRendererClass(this.getAttribute("renderer", "default"), UPay.Widget.Tag.Buy._renderersMap, this.opts.domId), t = this;
  this.renderer = new e(this.dom, "ready", {theme: this.opts.theme.widget, buttonStyle: this.opts.buttonStyle, linkStyle: this.opts.linkStyle, label: this.opts.label, currency: this.opts.currency, symbol: UPay.Currency.isReal(this.opts.currency) ? UPay.Currency.getSymbol(this.opts.currency) : null, amount: this.opts.amount, domId: this.opts.domId}, {onClick: function (e) {
    if (UPay._serverDown) {
      var n = UPay.Template.apply(UPay.AC.get("widget.buy.link.serverDown"), {language: UPay.Localization.getLanguage() || "en"}), r = {type: "client", template: "buy/serverDown", e: e, height: 150, dockToParent: !1};
      t._tooltipOpener(r)
    } else t.start()
  }, onClickLearnMoreLink: function (e) {
    var n = UPay.Template.apply(UPay.AC.get("widget.buy.link.learnMore"), {language: UPay.Localization.getLanguage() || "en"}), r = {type: "iframe", url: n, e: e, dockToParent: !0};
    t._tooltipOpener(r)
  }}), this.fire("render")
}, serverDown: function () {
  var e = document.getElementById("v-root");
  e && e.parentNode && e.parentNode.removeChild(e)
}, parser: function () {
  this.opts = {};
  var e = this.getAttribute("dom-id"), t = this.getAttribute("amount", UPay._settings.amount), n = this.getAttribute("currency", UPay._settings.currency), r = this.getAttribute("token", UPay._settings.token), i = this.getAttribute("security-token", UPay._settings.securityToken), s = this.getAttribute("product-id", UPay._settings.productId), o = this.getAttribute("product-desc") || this.getAttribute("product-description") || UPay._settings.productDesc, u = this.getAttribute("product-image", UPay._settings.productImage);
  this.callback = this._getCallback();
  var a = this.getAttribute("activity", ""), f = this._getTheme();
  this.autoPayment = this._getBoolAttribute("auto-payment", !0);
  var l = this.getAttribute("env", UPay._settings.envName), c = this.getAttribute("logo-url", UPay._settings.logoUrl), h = this.getAttribute("logo-text", UPay._settings.logoText), p = this.getAttribute("method", UPay._settings.payCode), d = this.getAttribute("view", "modal"), v = this.getAttribute("merch-trans", UPay._settings.merchTrans), m = this.getAttribute("button-style", "checkout"), g;
  m.indexOf("-link-") > -1 && (g = m.substr(m.indexOf("-link-") + 6), m = m.substr(0, m.indexOf("-link-")));
  var y = this._getBoolAttribute("collect-shipping", UPay._settings.collectShipping || UPay.AC.get("widgets.tag.attribute.collectShipping.default")), b = this._getBoolAttribute("collect-billing-address", UPay._settings.collectBillingAddress), w = this.getAttribute("process", UPay._settings.process || UPay.AC.get("widgets.tag.attribute.process.default")), E = this.getAttribute("total", UPay._settings.total), S = this.getAttribute("label", UPay.Localization.t("Buy")), x = this._getBoolAttribute("apply-upoints", !0), T = this.getAttribute("email", UPay._settings.email), N = this.getAttribute("pay-list-size", UPay._settings.payListSize), C = this.getAttribute("pay-profile", UPay._settings.payProfile || UPay.AC.get("widgets.tag.attribute.payProfile.default", ""));
  this.advancedConfiguration = new UPay.AdvancedConfiguration(this._getAdvancedConfiguration(), UPay._settings.advancedConfiguration), this.paymentUIParams = {applyUpoints: x, theme: f.payment, productImage: u, productDesc: o, logoUrl: c, logoText: h, email: T, payCode: p, showMethodLink: p ? !1 : !0, completeUrl: this.advancedConfiguration.get("completeUrl"), completeXdUrl: this.advancedConfiguration.get("completeXdUrl"), disableCountryDropDown: this.advancedConfiguration.get("disableCountryDropDown"), useMerchantCurrency: this.advancedConfiguration.get("useMerchantCurrency"), authUrl: this.advancedConfiguration.get("authUrl"), authXdUrl: this.advancedConfiguration.get("authXdUrl"), authBypass: this.advancedConfiguration.get("authBypass"), disclaimerUrl: this.advancedConfiguration.get("disclaimerUrl"), disclaimerXdUrl: this.advancedConfiguration.get("disclaimerXdUrl"), envName: l, payListSize: N, payProfile: C, view: d}, this.buyParams = {apikey: this._getApiKey(), collectShipping: y, collectBillingAddress: b, process: w, token: r, productId: s, description: o, productDesc: o, amount: t, total: E, currency: n, activity: a, logoUrl: c, logoText: h, merchTrans: v, payCode: p, showMethodLink: p ? !1 : !0, view: d, theme: f.wizard, buttonStyle: m, payListSize: N, securityToken: i, completeUrl: this.advancedConfiguration.get("completeUrl"), completeXdUrl: this.advancedConfiguration.get("completeXdUrl"), authUrl: this.advancedConfiguration.get("authUrl"), authXdUrl: this.advancedConfiguration.get("authXdUrl"), authBypass: this.advancedConfiguration.get("authBypass"), custom: this.getCustomQS(), payProfile: C, merchantId: this.getAttribute("merchant-id", UPay._settings.merchantId), applicationId: this.getAttribute("site-id", UPay._settings.applicationId), callback: this.callback}, this.opts = {theme: f, domId: e, amount: t, currency: n, buttonStyle: m, linkStyle: g, label: S}, UPay.copy(this.buyParams, this.getCustomAttributes())
}, start: function () {
  if (this.buyParams.view !== "inline") {
    if (this.isBusy)return;
    this._doBusy()
  }
  if (!UPay.Browser.supported()) {
    var e = UPay.AC.get("default.theme", "default"), t = this.getAttribute("logo-url", UPay._settings.logoUrl) || UPay.AC.get("layout.header.logo.default", "");
    UPay.Browser.showUnsupportedMessage(e, t);
    return
  }
  var n = this._getFunction("before-trigger"), r = this, i = function (e) {
    e && (UPay.Array.forEach(e, function (e, t) {
      r.setParam(t, e)
    }), r._doStart())
  };
  typeof n == "function" ? n({productId: this.getAttribute("product-id"), amount: this.getAttribute("amount"), currency: this.getAttribute("currency"), merchTrans: this.getAttribute("merch-trans")}, i) : this._doStart()
}, setParam: function (e, t) {
  var n = e.replace(/(\-[a-z])/g, function (e) {
    return e.toUpperCase().replace("-", "")
  });
  this.buyParams[n] = t
}, _doStart: function () {
  if (this.buyParams.collectShipping) {
    typeof this._getFunction("shippingaddress") == "function" && (this.buyParams.shippingAddressMethod = this._getFunction("shippingaddress")), typeof this._getFunction("shippingmethods") == "function" && (this.buyParams.shippingMethodsMethod = this._getFunction("shippingmethods"));
    var e = this._getFunction("before-summary", UPay._settings.beforeSummaryMethod);
    typeof e == "function" && (this.buyParams.beforeSummaryMethod = e);
    if (typeof this._getFunction("subtotal") == "function") {
      var t = this._getFunction("subtotal");
      this.buyParams.amount = t()
    }
  }
  var n = this;
  this.buyService = new UPay.Service.Buy(this.buyParams, {inSufficient: function (e) {
    if (n.autoPayment) {
      UPay.Callback.fire(n.callback, "payment.init");
      if (n.paymentUIParams.view === "inline")var t = new UPay.UI.InlinePayment(UPay.copy(n.paymentUIParams, e, !0)); else var t = new UPay.UI.Payment(UPay.copy(n.paymentUIParams, e, !0));
      t.start()
    } else UPay.Callback.fire(n.callback, "debit.fail", {status: {code: "INSUFFICIENT_BALANCE", message: "User does not have enough balance"}}), UPay.Api.confirmCancelIntent({apikey: e.apikey, callId: e.callId}, function () {
    }), n._doReady()
  }, forbidden: function (e) {
    UPay.Callback.fire(n.callback, "payment.init");
    if (n.paymentUIParams.view === "inline")var t = new UPay.UI.InlinePayment(UPay.copy(n.paymentUIParams, e, !0)); else var t = new UPay.UI.Payment(UPay.copy(n.paymentUIParams, e, !0));
    t.start()
  }, unauthenticated: function (e) {
    UPay.Callback.fire(n.callback, "payment.init");
    if (n.paymentUIParams.view === "inline")var t = new UPay.UI.InlinePayment(UPay.copy(n.paymentUIParams, e, !0)); else var t = new UPay.UI.Payment(UPay.copy(n.paymentUIParams, e, !0));
    t.start()
  }, success: function (e) {
    UPay.Callback.fire(n.callback, "debit.success", e.data), n._doReady()
  }, pending: function () {
    UPay.Callback.fire(n.callback, "debit.pending"), n._doReady()
  }, init: function (e) {
    UPay.Callback.fire(n.callback, "debit.init", {callId: e.callId, userid: UPay._settings.userid, token: UPay.Token.getUserToken()})
  }, cancel: function (e) {
    n.buyService.cancel(), n._doReady()
  }, ready: function () {
    n._doReady()
  }, eventListener: this.callback}), this.buyService.start(), this._closeDialog()
}, _tooltipOpener: function (e) {
  var t = e.e, n = this._findOrientation(t, e);
  this._closeTooltip();
  var r = document.getElementsByTagName("body")[0], i = document.createElement("div");
  i.setAttribute("id", "upay-learn-more-container"), i.style.width = n.container.width + "px", i.style.height = n.container.height + "px", i.style.top = n.container.top + "px", i.style.left = n.container.left + "px", r.appendChild(i);
  var s = document.createElement("div");
  s.setAttribute("className", "upay-lightbox-header-close"), s.setAttribute("class", "upay-lightbox-header-close"), i.appendChild(s);
  var o = document.createElement("a");
  o.setAttribute("id", "upay-close-link"), o.setAttribute("href", "#"), o.setAttribute("alt", UPay.Localization.t("Close")), o.setAttribute("tabindex", "1"), o.setAttribute("role", "button"), s.appendChild(o);
  var u = document.createElement("div");
  u.setAttribute("id", "upay-close-button"), u.setAttribute("className", "upay-button"), u.setAttribute("class", "upay-button"), o.appendChild(u);
  var a;
  if (e.type === "iframe")a = this._iframeOpener(e, n); else var a = this._buildToolTipMarkup(e);
  i.appendChild(a);
  var f = document.createElement("div");
  f.setAttribute("id", "upay-tip-pointer"), f.setAttribute("className", "upay-tip-pointer upay-" + n.tipPointer.style), f.setAttribute("class", "upay-tip-pointer upay-" + n.tipPointer.style), f.style.top = n.tipPointer.top + "px", f.style.left = n.tipPointer.left + "px", r.appendChild(f);
  if (UPay.Browser.getBrowserType() !== "ie") {
    var l = document.getElementById("upay-learn-more");
    l.focus(), l.addEventListener("blur", function () {
      document.getElementById("upay-close-link").focus()
    }), document.addEventListener("focus", function () {
      document.getElementById("upay-close-link").focus()
    })
  }
  var c = UPay.$("upay-close-link"), h = this;
  c && UPay.Dom.observe(c, "click", function (e) {
    return UPay.Dom.preventDefault(e), h._closeTooltip(), !1
  })
}, _buildToolTipMarkup: function (e) {
  var t = document.createElement("div");
  return t.innerHTML = UPay.JST[e.template](), t.id = "upay-learn-more", t.setAttribute("tabindex", 1), t.setAttribute("role", "dialog"), t
}, _iframeOpener: function (e, t) {
  var n = e.e, r = e.url, i = document.createElement("iframe");
  return i.setAttribute("id", "upay-learn-more"), i.setAttribute("src", r), i.setAttribute("scrolling", "no"), i.setAttribute("frameborder", "0"), i.setAttribute("tabindex", "1"), i.style.width = t.iframe.width + "px", i.style.height = t.iframe.height + "px", i
}, _findOrientation: function (e, t) {
  var n = 320, r = "left", i = n, s = t.height || 400, o = window.outerWidth, u = window.outerHeight, a;
  t.dockToParent ? a = e.currentTarget ? e.currentTarget.parentNode : e.srcElement.parentNode : a = e.currentTarget ? e.currentTarget : e.srcElement;
  var f = UPay.Dom.getOffsetRect(a), l = f.top - s + a.offsetHeight + 16, c = f.left + a.offsetWidth + 16, h = f.top, p = f.left + a.offsetWidth;
  if (o < c + n) {
    i = o - 20, o > n && (i = n), r = "top", h = f.top + a.offsetHeight, p = f.left + a.offsetWidth - 42, l = f.top + a.offsetHeight + 16;
    var d = p - n;
    d > 0 ? c = p - n + 42 : c = 5
  }
  l < 0 && (l = 5), u < s && (l = u - 20, u > s && (l = s), r = "top", h = f.top, p = f.left + a.offsetWidth - 42, l = f.top - s + a.offsetHeight + 16);
  var v = {container: {top: l, left: c, width: i, height: s}, tipPointer: {style: r, top: h + 4, left: p + 4}, iframe: {width: i - 20, height: s - 40}};
  return v
}, _closeTooltip: function () {
  var e = document.getElementById("upay-learn-more-container");
  if (e) {
    if (UPay.Browser.getBrowserType() !== "ie") {
      var t = document.getElementById("upay-learn-more");
      t.removeEventListener("blur", function () {
        document.getElementById("upay-close-link").focus()
      }), document.removeEventListener("focus", function () {
        document.getElementById("upay-close-link").focus()
      })
    }
    var n = document.getElementById("upay-close-button");
    n.parentNode.removeChild(n);
    var r = document.getElementById("upay-close-link");
    r.parentNode.removeChild(r);
    var i = document.getElementById("upay-tip-pointer");
    i.parentNode.removeChild(i);
    var s = document.getElementById("upay-learn-more-container").childNodes, o = s.length - 1;
    while (o > 0)s[o].parentNode.removeChild(s[o]), o--;
    e.parentNode.removeChild(e)
  }
}, _closeDialog: function () {
  this.buyParams.view === "inline" && UPay.Event.fire("iframe:cleanup")
}}), UPay.Widget.Tag.Buy._renderersMap = {"default": "UPay.Widget.Tag.Buy.Renderer"}, UPay.Widget.Tag.Buy.Renderer = function (e, t, n, r) {
  this.dom = e, this.state = t, this.data = n, this.handler = r, this.elementId = UPay.guid(), this._render(n), this._bindListeners()
}, UPay.Widget.Tag.Buy.Renderer.prototype = {_render: function (e) {
  var t;
  UPay.Config.Common.namespace == "v" ? this.data.buttonStyle.indexOf("custom") >= 0 ? t = "buy/v/ready.custom" : t = "buy/v/ready" : t = "buy/default/ready";
  var n = UPay.JST[t]({currency: this.data.currency, buttonStyle: this.data.buttonStyle, linkStyle: this.data.linkStyle, symbol: this.data.symbol, elementId: this.elementId, theme: this.data.theme, amount: e.amount, label: this.data.label});
  UPay.Dom.insertBeforeHTML(this.dom, n)
}, _bindListeners: function () {
  var e = UPay.$("upay-" + this.elementId), t = this;
  UPay.Dom.observe(e, "click", function (e) {
    return UPay.Dom.preventDefault(e), t.handler.onClick(e), !1
  });
  var n = UPay.$("upay-learn-link-" + this.elementId);
  n && UPay.Dom.observe(n, "click", function (e) {
    return UPay.Dom.preventDefault(e), t.handler.onClickLearnMoreLink && t.handler.onClickLearnMoreLink(e), !1
  })
}, update: function (e, t) {
  "busy" == e ? this._showBusy() : "ready" == e && this._showReady()
}, _showBusy: function () {
  UPay.Config.Common.namespace != "v" && (UPay.Dom.addCss(UPay.$("upay-" + this.elementId + "-buy-btn"), "upay-invisible"), UPay.Dom.removeCss(UPay.$("upay-" + this.elementId + "-buy-loading"), "upay-invisible"))
}, _showReady: function () {
  UPay.Config.Common.namespace != "v" && (UPay.Dom.removeCss(UPay.$("upay-" + this.elementId + "-buy-btn"), "upay-invisible"), UPay.Dom.addCss(UPay.$("upay-" + this.elementId + "-buy-loading"), "upay-invisible"))
}}, UPay.Object.subclass("Widget.Tag.Paylist", "Widget.Tag.Buy", null, {process: function () {
  this.parser();
  var e = this.getAttribute("count") ? this.getAttribute("count") : 3, t = this.getAttribute("orientation") ? this.getAttribute("orientation") : "vertical", n = this.getRendererClass(this.getAttribute("renderer", "default"), UPay.Widget.Tag.Paylist._renderersMap, this.opts.domId);
  this.buyParams.count = e, this.buyParams.orientation = t;
  var r = this, i = new UPay.Service.PayList({apikey: this._getApiKey()}, {success: function (e) {
    r.renderer.update("ready", e)
  }});
  i.start(), this.renderer = new n(this.dom, "ready", {theme: this.opts.theme.widget, currency: this.opts.currency, symbol: UPay.Currency.isReal(this.opts.currency) ? UPay.Currency.getSymbol(this.opts.currency) : null, amount: this.opts.amount, domId: this.opts.domId, orientation: t, count: e}, {onClick: function (e) {
    r.resetPayCode(e)
  }, onToggleMoreAndLess: function (e, t) {
    r._closeDialog(), r.toggleMoreAndLess(e, t)
  }}), this.fire("render")
}, resetPayCode: function (e) {
  var t, n = e.target ? e.target.id : e.srcElement.id, r = n.split("_"), t = r[3], i = 4;
  while (i < r.length)t += "_" + r[i], i++;
  this.buyParams.payCode = t, this.buyParams.showMethodLink = t ? !1 : !0, this.paymentUIParams.payCode = t, this.paymentUIParams.showMethodLink = t ? !1 : !0, this.start()
}, toggleMoreAndLess: function (e, t) {
  UPay.$(t.showmore).style.display == "none" ? (UPay.$(t.showmore).style.display = "block", UPay.$(t.showless).style.display = "none", UPay.$(t.secondary).style.display = "none") : (UPay.$(t.showmore).style.display = "none", UPay.$(t.showless).style.display = "block", UPay.$(t.secondary).style.display = "block")
}}), UPay.Widget.Tag.Paylist._renderersMap = {"default": "UPay.Widget.Tag.Paylist.Renderer"}, UPay.Widget.Tag.Paylist.Renderer = function (e, t, n, r) {
  this.dom = e, this.state = t, this.data = n, this.handler = r, this.elementId = UPay.guid(), this.paylist = null
}, UPay.Widget.Tag.Paylist.Renderer.prototype = {_render: function (e) {
  var t, n, r = 0;
  if (this.paylist && this.data.count) {
    r == 0 && (t = [], n = []);
    while (r < this.paylist.length)r < parseInt(this.data.count) ? t.push({id: this.paylist[r].paymentLabel, name: this.paylist[r].name, logo: this.paylist[r].logoUrl.tiny, orientation: this.data.orientation}) : n.push({id: this.paylist[r].paymentLabel, name: this.paylist[r].name, logo: this.paylist[r].logoUrl.tiny, orientation: this.data.orientation}), r++
  }
  var i = UPay.JST["paylist/default/ready"]({orientation: this.data.orientation, firstList: t, secondList: n, currency: this.data.currency, symbol: this.data.symbol, elementId: this.elementId, theme: this.data.theme, amount: e.amount, label: this.data.label});
  UPay.Dom.insertBeforeHTML(this.dom, i)
}, _onClickEntry: function (e) {
  return UPay.Dom.preventDefault(e), this.handler.onClick(e), !1
}, _onToggleMoreAndLess: function (e) {
  UPay.Dom.preventDefault(e);
  var t = "upay_" + this.elementId + "_ul_secondary", n = "upay_" + this.elementId + "_div_more", r = "upay_" + this.elementId + "_div_less";
  return this.handler.onToggleMoreAndLess(e, {secondary: t, showmore: n, showless: r}), !1
}, _bindListeners: function () {
  var e = this, t = UPay.$("upay_" + this.elementId + "_ul_primary");
  UPay.Dom.observe(t, "click", function (t) {
    e._onClickEntry(t)
  });
  var n = UPay.$("upay_" + this.elementId + "_ul_secondary");
  UPay.Dom.observe(n, "click", function (t) {
    e._onClickEntry(t)
  });
  var r = UPay.$("upay_" + this.elementId + "_div_more");
  UPay.Dom.observe(r, "click", function (t) {
    e._onToggleMoreAndLess(t)
  });
  var i = UPay.$("upay_" + this.elementId + "_div_less");
  UPay.Dom.observe(i, "click", function (t) {
    e._onToggleMoreAndLess(t)
  })
}, update: function (e, t) {
  "ready" == e && this.paylist == null && t.payList && (this.paylist = t.payList, this._render(this.data), this._bindListeners())
}}, UPay.Object.subclass("Widget.Tag.Topup", "Widget.Tag.Base", null, {process: function () {
  var e = this, t = this.getAttribute("dom-id"), n = this.getRendererClass(this.getAttribute("renderer", "default"), UPay.Widget.Tag.Topup._renderersMap, t), r = this.getAttribute("currency"), i = this._getCallback(), s = this._getTheme(), o = this.getAttribute("label", UPay.Localization.t("Buy More Points")), u = this.getAttribute("logo-url", UPay._settings.logoUrl), a = this.getAttribute("method", UPay._settings.payCode), f = this.getAttribute("vc-bundle-id"), l = this.getAttribute("email", UPay._settings.email), c = e._getApiKey(), h = this.getAttribute("pay-list-size", UPay._settings.payListSize), p = this.getAttribute("security-token", UPay._settings.securityToken);
  this.advancedConfiguration = new UPay.AdvancedConfiguration(this._getAdvancedConfiguration(), UPay._settings.advancedConfiguration), this._params = {currency: r, apikey: c, callback: i, vcBundleId: f, theme: s.payment, logoUrl: u, payCode: a, email: l, flow: "topup", payListSize: h, securityToken: p, authUrl: this.advancedConfiguration.get("authUrl"), authXdUrl: this.advancedConfiguration.get("authXdUrl"), authBypass: this.advancedConfiguration.get("authBypass")}, this.renderer = new n(this.dom, "ready", {theme: s.widget, text: o, domId: t}, {onClick: function () {
    e.start()
  }}), this.fire("render")
}, start: function () {
  var e = this._getFunction("before-trigger"), t = this, n = function (e) {
    e && (UPay.Array.forEach(e, function (e, n) {
      t.setParam(n, e)
    }), t._doStart())
  };
  typeof e == "function" ? e({}, n) : this._doStart()
}, _doStart: function () {
  if (!UPay.Browser.supported()) {
    var e = UPay.AC.get("default.theme", "default"), t = this.getAttribute("logo-url", UPay._settings.logoUrl) || UPay.AC.get("layout.header.logo.default", "");
    UPay.Browser.showUnsupportedMessage(e, t);
    return
  }
  var n = this, r = new UPay.Service.TopUp({currency: this._params.currency, apikey: n._params.apikey, securityToken: n._params.securityToken}, {ready: function (e) {
    UPay.Callback.fire(n._params.callback, "payment.init");
    var t = new UPay.UI.Payment(UPay.copy({vcBundleId: n._params.vcBundleId, theme: n._params.theme, logoUrl: n._params.logoUrl, payCode: n._params.payCode, email: n._params.email, flow: n._params.flow, payListSize: n._params.payListSize, authUrl: n._params.authUrl, authXdUrl: n._params.authXdUrl, authBypass: n._params.authBypass}, e));
    t.start()
  }, success: function (e) {
    UPay.Callback.fire(n._params.callback, "topup.success", e.data)
  }, cancel: function () {
    UPay.Callback.fire(n._params.callback, "topup.cancel")
  }});
  UPay.Callback.fire(n._params.callback, "topup.init"), r.start()
}, setParam: function (e, t) {
  var n = e.replace(/(\-[a-z])/g, function (e) {
    return e.toUpperCase().replace("-", "")
  });
  this._params[n] = t
}}), UPay.Widget.Tag.Topup._renderersMap = {"default": "UPay.Widget.Tag.Topup.Renderer"}, UPay.Widget.Tag.Topup.Renderer = function (e, t, n, r) {
  this.dom = e, this.state = t, this.data = n, this.handler = r, this.elementId = UPay.guid(), this._render(), this._bindListeners()
}, UPay.Widget.Tag.Topup.Renderer.prototype = {_render: function () {
  var e = UPay.JST["topup/default/ready"]({elementId: this.elementId, theme: this.data.theme, text: this.data.text});
  UPay.Dom.insertBeforeHTML(this.dom, e)
}, _bindListeners: function () {
  var e = this;
  UPay.Dom.observe(UPay.$("upay_" + this.elementId + "_topup"), "click", function () {
    e.handler.onClick && e.handler.onClick()
  })
}}, UPay.Object.subclass("Widget.Tag.Balance", "Widget.Tag.Topup", null, {process: function () {
  var e = this, t = this.getRendererClass(this.getAttribute("theme", "default"), UPay.Widget.Tag.Balance._renderersMap), n = this.getAttribute("currency"), r = this._getCallback(), i = this._getTheme(), s = this._getBoolAttribute("show-history", !1), o = this.getAttribute("logo-url", UPay._settings.logoUrl), u = this.getAttribute("method", UPay._settings.payCode), a = this.getAttribute("email", UPay._settings.email), f = this.getAttribute("vc-bundle-id"), l = e._getApiKey(), c = this.getAttribute("pay-list-size", UPay._settings.payListSize);
  this.advancedConfiguration = new UPay.AdvancedConfiguration(this._getAdvancedConfiguration(), UPay._settings.advancedConfiguration), this._params = {currency: n, apikey: l, callback: r, vcBundleId: f, theme: i.payment, logoUrl: o, payCode: u, email: a, payListSize: c, authUrl: this.advancedConfiguration.get("authUrl"), authXdUrl: this.advancedConfiguration.get("authXdUrl"), authBypass: this.advancedConfiguration.get("authBypass")}, this.renderer = new t(this.dom, "loading", {theme: i.widget, showTransactions: s}, {onTopUp: function () {
    e.start()
  }, onTransactionHistory: function () {
    var e = new UPay.UI.Transaction({apikey: UPay._settings.apikey, token: UPay._settings.token, userid: UPay._settings.userid, theme: i.payment});
    e.start()
  }});
  var h = new UPay.Service.Balance({currency: n, apikey: this._getApiKey()}, {success: function (t) {
    e.renderer.update("ready", t.data)
  }});
  UPay.Event.subscribe("updateBalance", function (t) {
    n == t.currency && e.renderer.update("newBalance"
      , t)
  }), h.start(), this.fire("render")
}}), UPay.Widget.Tag.Balance._renderersMap = {"default": "UPay.Widget.Tag.Balance.Renderer"}, UPay.Widget.Tag.Balance.Renderer = function (e, t, n, r) {
  this.templates = {loading: '<div id="upay_#{elementId}_loading" class="upay_balance_amount_loader"></div>'}, this.dom = e, this.state = t, this.data = n, this.handler = r, this.elementId = UPay.guid(), this._render(), this._bindListeners()
}, UPay.Widget.Tag.Balance.Renderer.prototype = {_render: function () {
  var e = UPay.Template.apply(this.templates.loading, {elementId: this.elementId, theme: this.data.theme});
  UPay.Dom.insertBeforeHTML(this.dom, e)
}, _bindListeners: function () {
}, update: function (e, t) {
  e == "ready" ? this._showReady(t) : e == "newBalance" && this._showNewBalance(t)
}, _showReady: function (e) {
  this._hideLoading(), UPay.Dom.insertBeforeHTML(this.dom, UPay.JST["balance/default/ready"]({elementId: this.elementId, theme: this.data.theme, showTransactions: this.data.showTransactions, amount: e.amount, currency: e.currency, symbol: e.symbol ? UPay.Currency.getHtmlSafeSymbol(e.currency) : null}));
  var t = this;
  UPay.Dom.observe(UPay.$("upay_" + this.elementId + "_balance"), "click", function (e) {
    UPay.Dom.preventDefault(e);
    var n = UPay.$("upay_" + t.elementId + "_balance_menu");
    n && (UPay.Dom.containsCss(n, "upay_invisible") ? UPay.Dom.removeCss(n, "upay_invisible") : UPay.Dom.addCss(n, "upay_invisible"))
  }), UPay.Dom.observe(UPay.$("upay_" + this.elementId + "_more"), "click", function () {
    var e = UPay.$("upay_" + t.elementId + "_balance_menu");
    e && UPay.Dom.addCss(e, "upay_invisible"), t.handler.onTopUp && t.handler.onTopUp()
  }), this.data.showTransactions && UPay.Dom.observe(UPay.$("upay_" + this.elementId + "_transaction"), "click", function () {
    var e = UPay.$("upay_" + t.elementId + "_balance_menu");
    e && UPay.Dom.addCss(e, "upay_invisible"), t.handler.onTransactionHistory && t.handler.onTransactionHistory()
  })
}, _showNewBalance: function (e) {
  UPay.$("upay_" + this.elementId + "_balance_amount").innerHTML = e.symbol ? UPay.Currency.getHtmlSafeSymbol(e.currency) + e.amount : e.amount
}, _showLoading: function (e) {
  this.dom.innerHTML = UPay.Template.apply(this.templates.loading, {elementId: this.elementId})
}, _hideLoading: function () {
  var e = UPay.$("upay_" + this.elementId + "_loading");
  e.parentNode.removeChild(e)
}}, UPay.Object.subclass("Widget.Tag.Subscribe", "Widget.Tag.Base", null, {process: function () {
  var e = this.getAttribute("dom-id"), t = this.getRendererClass(this.getAttribute("renderer", "default"), UPay.Widget.Tag.Subscribe._renderersMap, e), n = this.getAttribute("product-id"), r = this.getAttribute("product-desc") || this.getAttribute("product-description"), i = this.getAttribute("product-image"), s = this.getAttribute("plan-id"), o = this.getAttribute("currency", UPay._settings.currency), u = this._getTheme();
  this.callback = this._getCallback();
  var a = this._getApiKey(), f = this.getAttribute("method", UPay._settings.payCode), l = this.getAttribute("logo-url", UPay._settings.logoUrl), c = "", h = this.getAttribute("merch-trans"), p = this.getAttribute("type", "buy"), d = this._getBoolAttribute("gift", !1), v = this.getAttribute("label", UPay.Localization.t("Subscribe")), m = this._getBoolAttribute("apply-upoints", !0), g = this.getAttribute("email", UPay._settings.email), y = this.getAttribute("pay-list-size", UPay._settings.payListSize), b = this.getAttribute("pay-profile", UPay._settings.payProfile || UPay.AC.get("widgets.tag.attribute.payProfile.default", "")), w = this.getAttribute("security-token", UPay._settings.securityToken), E = this.getAttribute("env", UPay._settings.envName);
  this.advancedConfiguration = new UPay.AdvancedConfiguration(this._getAdvancedConfiguration(), UPay._settings.advancedConfiguration), this.subscribeParams = {theme: u.subscribe, envName: E, authUrl: this.advancedConfiguration.get("authUrl"), authXdUrl: this.advancedConfiguration.get("authXdUrl"), authBypass: this.advancedConfiguration.get("authBypass"), disclaimerUrl: this.advancedConfiguration.get("disclaimerUrl"), disclaimerXdUrl: this.advancedConfiguration.get("disclaimerXdUrl"), disableCountryDropDown: this.advancedConfiguration.get("disableCountryDropDown"), useMerchantCurrency: this.advancedConfiguration.get("useMerchantCurrency"), logoUrl: l, flow: "subscribe", apikey: a, productId: n, planId: s, payCode: f, currency: o, activity: c, merchTrans: h, gift: d, productDesc: r, productImage: i, applyUpoints: m, email: g, custom: this.getCustomQS(), payListSize: y, securityToken: w, payProfile: b};
  var S = this;
  this.renderer = new t(this.dom, "ready", {theme: u.widget, domId: e, label: v}, {onClick: function () {
    S._clickHandler()
  }}), this.fire("render")
}, _clickHandler: function () {
  if (!UPay.Browser.supported()) {
    var e = UPay.AC.get("default.theme", "default"), t = this.getAttribute("logo-url", UPay._settings.logoUrl) || UPay.AC.get("layout.header.logo.default", "");
    UPay.Browser.showUnsupportedMessage(e, t);
    return
  }
  this.start()
}, setParam: function (e, t) {
  var n = e.replace(/(\-[a-z])/g, function (e) {
    return e.toUpperCase().replace("-", "")
  });
  this.subscribeParams[n] = t
}, start: function () {
  if (this.isBusy)return;
  this._doBusy();
  if (!UPay.Browser.supported()) {
    var e = UPay.AC.get("default.theme", "default"), t = this.getAttribute("logo-url", UPay._settings.logoUrl) || UPay.AC.get("layout.header.logo.default", "");
    UPay.Browser.showUnsupportedMessage(e, t);
    return
  }
  var n = this;
  this.subscribeService = new UPay.Service.Subscribe(this.subscribeParams, {ready: function (e) {
    UPay.Callback.fire(n.callback, "subscribe.ready");
    var t = new UPay.UI.Subscribe(UPay.copy(n.subscribeParams, e, !0));
    t.start()
  }, success: function (e) {
    UPay.Callback.fire(n.callback, e.event || "subscribe.success", e.data), n._doReady()
  }, cancel: function () {
    UPay.Callback.fire(n.callback, "subscribe.cancel"), n._doReady()
  }, pending: function () {
    UPay.Callback.fire(n.callback, "subscribe.pending"), n._doReady()
  }, suspended: function () {
    UPay.Callback.fire(n.callback, "subscribe.suspended"), n._doReady()
  }}), this.subscribeService.start()
}}), UPay.Widget.Tag.Subscribe._renderersMap = {"default": "UPay.Widget.Tag.Subscribe.Renderer"}, UPay.Widget.Tag.Subscribe.Renderer = function (e, t, n, r) {
  this.dom = e, this.state = t, this.data = n, this.handler = r, this.elementId = UPay.guid(), this._render(n), this._bindListeners()
}, UPay.Widget.Tag.Subscribe.Renderer.prototype = {_render: function (e) {
  var t = UPay.JST["subscribe/default/ready"]({elementId: this.elementId, theme: this.data.theme, label: this.data.label});
  UPay.Dom.insertBeforeHTML(this.dom, t)
}, _bindListeners: function () {
  var e = UPay.$("upay_" + this.elementId), t = this;
  UPay.Dom.observe(e, "click", function (e) {
    return UPay.Dom.preventDefault(e), t.handler.onClick(), !1
  })
}, update: function (e, t) {
  "busy" == e ? this._showBusy() : "ready" == e && this._showReady()
}, _showBusy: function () {
  UPay.Dom.addCss(UPay.$("upay_" + this.elementId + "_subscribe_btn"), "upay_invisible"), UPay.Dom.removeCss(UPay.$("upay_" + this.elementId + "_subscribe_loading"), "upay_invisible")
}, _showReady: function () {
  UPay.Dom.removeCss(UPay.$("upay_" + this.elementId + "_subscribe_btn"), "upay_invisible"), UPay.Dom.addCss(UPay.$("upay_" + this.elementId + "_subscribe_loading"), "upay_invisible")
}}, UPay.Object.subclass("Widget.Tag.Redeem", "Widget.Tag.Subscribe", null, {process: function () {
  var e = this.getAttribute("dom-id"), t = this.getRendererClass(this.getAttribute("renderer", "default"), UPay.Widget.Tag.Redeem._renderersMap, e), n = this._getTheme(), r = this._getApiKey();
  this.callback = this._getCallback();
  var i = this.getAttribute("product-desc") || this.getAttribute("product-description"), s = this.getAttribute("product-image"), o = this.getAttribute("label", UPay.Localization.t("Redeem")), u = this.getAttribute("logo-url", UPay._settings.logoUrl), a = this.getAttribute("email"), f = this.getAttribute("env", UPay._settings.envName);
  this.advancedConfiguration = new UPay.AdvancedConfiguration(this._getAdvancedConfiguration(), UPay._settings.advancedConfiguration), this.redeemParams = {theme: n.redeem, envName: f, authUrl: this.advancedConfiguration.get("authUrl"), authXdUrl: this.advancedConfiguration.get("authXdUrl"), authBypass: this.advancedConfiguration.get("authBypass"), apikey: r, flow: "redeem", productDesc: i, productImage: s, logoUrl: u, custom: this.getCustomQS(), email: a}, UPay.copy(this.redeemParams, this.getCustomAttributes());
  var l = this;
  this.renderer = new t(this.dom, "ready", {theme: n.widget, domId: e, label: o}, {onClick: function () {
    l._clickHandler()
  }}), this.fire("render")
}, start: function () {
  if (this.isBusy)return;
  this._doBusy();
  if (!UPay.Browser.supported()) {
    var e = UPay.AC.get("default.theme", "default"), t = this.getAttribute("logo-url", UPay._settings.logoUrl) || UPay.AC.get("layout.header.logo.default", "");
    UPay.Browser.showUnsupportedMessage(e, t);
    return
  }
  var n = this;
  this.redeemService = new UPay.Service.Redeem(this.redeemParams, {ready: function (e) {
    UPay.Callback.fire(n.callback, "redeem.ready");
    var t = new UPay.UI.Redeem(UPay.copy(n.redeemParams, e, !0));
    t.start()
  }, success: function () {
    UPay.Callback.fire(n.callback, "redeem.success"), n._doReady()
  }, cancel: function () {
    UPay.Callback.fire(n.callback, "redeem.cancel"), n._doReady()
  }}), this.redeemService.start()
}}), UPay.Widget.Tag.Redeem._renderersMap = {"default": "UPay.Widget.Tag.Redeem.Renderer"}, UPay.Object.subclass("Widget.Tag.Redeem.Renderer", "Widget.Tag.Subscribe.Renderer", null, {_render: function (e) {
  var t = UPay.JST["redeem/default/ready"]({elementId: this.elementId, theme: this.data.theme, label: this.data.label});
  UPay.Dom.insertBeforeHTML(this.dom, t)
}, _showBusy: function () {
  UPay.Dom.addCss(UPay.$("upay_" + this.elementId + "_redeem_btn"), "upay_invisible"), UPay.Dom.removeCss(UPay.$("upay_" + this.elementId + "_redeem_loading"), "upay_invisible")
}, _showReady: function () {
  UPay.Dom.removeCss(UPay.$("upay_" + this.elementId + "_redeem_btn"), "upay_invisible"), UPay.Dom.addCss(UPay.$("upay_" + this.elementId + "_redeem_loading"), "upay_invisible")
}}), UPay.Object.subclass("Widget.Tag.Billing", "Widget.Tag.Base", null, {process: function () {
  var e = this.getAttribute("dom-id"), t = this.getRendererClass(this.getAttribute("renderer", "default"), UPay.Widget.Tag.Billing._renderersMap, e), n = this.getAttribute("label", UPay.Localization.t("Billing")), r = this._getTheme(), i = this.getAttribute("logo-url", UPay._settings.logoUrl), s = this.getAttribute("product-id"), o = this.getAttribute("product-desc"), u = this.getAttribute("product-image"), a = this.getAttribute("apikey");
  this.advancedConfiguration = new UPay.AdvancedConfiguration(this._getAdvancedConfiguration(), UPay._settings.advancedConfiguration);
  var f = this;
  this.renderer = new t(this.dom, "ready", {theme: r.widget, label: n, domId: e}, {onClick: function () {
    f.service = new UPay.Service.Billing({authUrl: f.advancedConfiguration.get("authUrl"), authXdUrl: f.advancedConfiguration.get("authXdUrl"), authBypass: f.advancedConfiguration.get("authBypass"), theme: r.wizard, logoUrl: i, productDesc: o, productImage: u, productId: s, apikey: a}), f._clickHandler()
  }}), this.fire("render")
}, _clickHandler: function () {
  this.service.start()
}}), UPay.Widget.Tag.Billing._renderersMap = {"default": "UPay.Widget.Tag.Billing.Renderer"}, UPay.Widget.Tag.Billing.Renderer = function (e, t, n, r) {
  this.dom = e, this.state = t, this.data = n, this.handler = r, this.elementId = UPay.guid(), this._render(n), this._bindListeners()
}, UPay.Widget.Tag.Billing.Renderer.prototype = {_render: function (e) {
  var t = UPay.JST["billing/default/ready"]({elementId: this.elementId, theme: this.data.theme, label: this.data.label});
  UPay.Dom.insertBeforeHTML(this.dom, t)
}, _bindListeners: function () {
  var e = UPay.$("upay_" + this.elementId), t = this;
  UPay.Dom.observe(e, "click", function (e) {
    return UPay.Dom.preventDefault(e), t.handler.onClick(), !1
  })
}, update: function (e, t) {
  "busy" == e ? this._showBusy() : "ready" == e && this._showReady()
}, _showBusy: function () {
  UPay.Dom.addCss(UPay.$("upay_" + this.elementId + "_billing_btn"), "upay_invisible"), UPay.Dom.removeCss(UPay.$("upay_" + this.elementId + "_billing_loading"), "upay_invisible")
}, _showReady: function () {
  UPay.Dom.removeCss(UPay.$("upay_" + this.elementId + "_billing_btn"), "upay_invisible"), UPay.Dom.addCss(UPay.$("upay_" + this.elementId + "_billing_loading"), "upay_invisible")
}}, UPay.AC.init({"widgets.tag.attribute.process.default": "sale", "widgets.tag.attribute.collectShipping.default": !1}), UPay.AC.extend({"iframe.width": 626, "default.theme": "vme", "layout.footer.links.home": "https://sandbox.www.v.me", "layout.footer.links.terms": "https://sandbox.www.v.me/pages/terms", "layout.footer.links.privacy": "https://sandbox.www.v.me/pages/privacy", "layout.footer.links.help": "https://sandbox.www.v.me/help", "layout.footer.links.secure": "https://v.me", "widget.buy.link.learnMore": "https://sandbox-sapi.v.me/html/v/#{language}/learnmore.html", "widget.buy.link.serverDown": "https://sandbox-sapi.v.me/html/v/#{language}/serverDown.html", "app.setting.supportedLocales": ["en", "en_AU", "en_CA", "en_US", "fr", "fr_CA"], "widgets.tag.attribute.payProfile.default": "disable", "widgets.buy.checkServerStatus": 1e4}), function () {
  setTimeout(function () {
    window.initPlaySpanWallet && window.initPlaySpanWallet(), window.initUPay && window.initUPay(), UPay.init()
  }, 0);
  var e = function () {
    var e = document.getElementsByTagName("body")[0], t = 0;
    return e && UPay.Array.forEach(UPay.Widget._tagInfos, function (n) {
      n.xmlns || (n.xmlns = UPay.Config.Common.namespace);
      var r = UPay.Widget._getDomElements(e, n.xmlns, n.localName);
      t += r.length
    }), t
  }, t = function () {
    var n = e();
    n > 1 ? UPay.Widget.parse() : document.readyState != "complete" && setTimeout(t, 25)
  };
  setTimeout(t, 0)
}(), function () {
  UPay.JST = UPay.JST || {}, UPay.JST["balance/default/ready"] = UPay.Template.parse('<div id="upay_<%= elementId %>_ready" class="upay_reset upay_balance_container upay_theme_<%= theme %>">\n    <div class="upay_balance_amount_container">\n        <div id="upay_<%= elementId %>_balance" class="upay_balance_amount">\n            <% if (!symbol){ %>\n                <img width="20px" height="20px" src="//sandbox-static.v.me/img/common/currency/tiny/<%= currency %>.png" alt=""/>\n            <% } %>\n            <div id="upay_<%= elementId %>_balance_amount"><%= symbol %><%= amount %></div>\n        </div>\n    </div>\n    <ul id="upay_<%= elementId %>_balance_menu" class="upay_balance_menu upay_invisible">\n        <li<%= !showTransactions ? \' style="border-bottom:none;"\' : \'\'%>><button class="upay_balance_menu_btn" id="upay_<%= elementId %>_more"><%= UPay.Localization.t(\'Buy More Points\') %></button></li>\n        <% if (showTransactions) { %>\n            <li style="border-bottom:none;"><button class="upay_balance_menu_btn" id="upay_<%= elementId %>_transaction"><%= UPay.Localization.t(\'Recent Transactions\') %></button></li>\n        <% } %>\n    </ul>\n</div>'), UPay.JST["billing/default/ready"] = UPay.Template.parse('<div id="upay_<%= elementId %>" class="upay_billing_container upay_theme_<%= theme %>">\n    <div class="upay_billing_btn">\n        <div id="upay_<%= elementId %>_billing_btn"><%= label %></div>\n        <div id="upay_<%= elementId %>_billing_loading" class="upay_billing_loading upay_invisible"></div>\n    </div>\n</div>'), UPay.JST["browser/default/unsupported"] = UPay.Template.parse('<div id="mainContainer" class="upay_unsupport_<%=theme%>">\n<div class="upay-modal-container">\n  <div id="layout-standard"> <!-- the standard layout. we can potentially have more than one layout -->\n    <div class="upay-modal-background">\n      <div class="upay-header"> <!-- hold the merchant logo + text + close button. static between screen -->\n\n        <% if (logoUrl) { %>\n        <div class="upay-header-logo">\n          <img src="<%= UPay.Template.h(logoUrl) %>" alt="" border="0"/>\n        </div>\n        <% } %>\n\n        <div class="lightbox_header_close">\n          <a id="close-link" onclick="UPay.Browser.closeUnsupportedMessage()"><div class="txt" id="close-window-text"><%= UPay.Localization.t("Close") %></div><div class="button"></div></a>\n        </div>\n      </div>\n      <div class="upay-body"> <!-- the main changing changing content -->\n        <div id="product-row" class="upay-body-item">\n          <div id="product-desc" class="upay-body-item-description"><%= UPay.Localization.t("Your browser is not supported") %></div>\n        </div>\n        <!-- production description and total cost -->\n        <div id="label-row" class="upay-body-label">\n          <div id="message-container" class="message-info" style="display: block;">\n            <span class="message-content" id="main-message"><%= UPay.Localization.t("Please upgrade your browser or choose from the supported browsers below.") %></span>\n          </div>\n        </div>\n        <!-- instruction message + breadcrumb -->\n        <div class="upay-body-container">\n          <div class="lightbox_body_payment_row">\n            <div id="content-row" class="lightbox_body_content_row">\n              <a class="browsertype" href="http://www.getfirefox.com" target="_blank"><img src="<%= paths.firefox %>" alt="Firefox" border="0" /></a>\n              <a class="browsertype" href="http://www.apple.com/safari/" target="_blank"><img src="<%= paths.safari %>" alt="Safari" border="0" /></a>\n              <a class="browsertype" href="http://www.google.com/chrome" target="_blank"><img src="<%= paths.chrome %>" alt="Chrome" border="0" /></a>\n              <a class="browsertype" href="http://windows.microsoft.com/en-US/internet-explorer/products/ie/home" target="_blank"><img src="<%= paths.ie %>" alt="Internet Explorer" border="0" /></a>\n            </div>\n          </div>\n        </div>\n        <!-- the gut of the content -->\n        <div id="navigation-row" class="upay-body-navigation lightbox_body_navigation_btn"></div>\n        <!-- navigation bar. this holds the change payment method/back link + continue/cancel button -->\n      </div>\n    </div>\n    <div class="upay-footer">\n      <!-- holds the power by UltimatePay + change country + change currency + help. static between screen. -->\n      <div class="upay-footer-info">\n        <a href="<%= UPay.AC.get(\'layout.footer.links.home\') %>" target="_blank" style="text-decoration:none;"><div class="powered_by">&nbsp;</div></a>\n      </div>\n      <div class="upay-footer-navigation">\n        <ul>\n          <li class="terms">\n            <a href="<%= UPay.AC.get(\'layout.footer.links.terms\') %>" target="_blank"><%= UPay.Localization.t("Terms of Service") %></a>\n          </li>\n          <li class="privacy">\n            <a href="<%= UPay.AC.get(\'layout.footer.links.privacy\') %>" target="_blank"><%= UPay.Localization.t("Privacy Policy") %></a>\n          </li>\n          <% if (UPay.AC.get("layout.footer.links.help")) { %>\n          <li class="help" style="border-right: 0 none;">\n            <a href="<%= UPay.AC.get(\'layout.footer.links.help\') %>" target="_blank"><%= UPay.Localization.t("Help") %></a>\n          </li>\n          <% } %>\n          <% if (UPay.AC.get("layout.footer.links.secure")) { %>\n          <li class="secure">\n            <%= UPay.AC.get("layout.footer.links.secure") %>\n          </li>\n          <% } %>\n        </ul>\n      </div>\n    </div>\n  </div>\n</div>\n</div>\n\n\n\n'), UPay.JST["buy/serverDown"] = UPay.Template.parse('<div class="upay-tooltip-content">\n    <h1 class="upay-tooltip-header"><span>V.me by Visa</span></h1>\n    <hr />\n    <p class="upay-tooltip-list">\n        <%= UPay.Localization.t(\'V.me is currently down at this time. We should be up and running shortly. We apologize for any inconvenience.\')%>\n    <p>\n</div>'), UPay.JST["buy/v/ready.custom"] = UPay.Template.parse('<div class="upay-vme-custom-checkout-btn-container<% if (linkStyle) { %> upay-vme-learn-more-link-<%= linkStyle %><% } %>">\n	<button id="upay-<%= elementId %>" class="upay-vme-custom-checkout-btn">\n		<table>\n			<tr>\n				<td class="upay-vme-custom-checkout-btn-ribbon"></td>\n				<td class="upay-vme-custom-checkout-btn-text"><%= UPay.Localization.t((buttonStyle.indexOf(\'checkout\') != -1) ? \'Checkout With\' : \'Pay With\')%></td>\n				<td class="upay-vme-custom-checkout-btn-mark">V.me by Visa</td>\n			</tr>\n		</table>\n	</button>\n<% if (linkStyle) { %>\n    <div class="upay-vme-link-container-<%= linkStyle %>">\n        <a id="upay-learn-link-<%= elementId%>" href="javascript:void(0)" class="upay-buy-learn-link"><%= UPay.Localization.t("Learn More")%></a>\n    </div>\n<% } %>\n</div>'), UPay.JST["buy/v/ready"] = UPay.Template.parse('<div class="upay-buy-outer-container<% if (linkStyle) { %> link-<%= linkStyle %><% } %>">\n  <button id="upay-<%= elementId %>" class="upay-buy-container-image-only upay-vme-<%= buttonStyle %> upay-theme-<%= theme %>" aria-label="<%= UPay.Localization.t("Checkout with V.me by Visa") %>"></button>\n  <% if (linkStyle) { %>\n  <div class="upay-vme-link-container-<%= linkStyle %>">\n    <a id="upay-learn-link-<%= elementId%>" href="javascript:void(0)" class="upay-buy-learn-link"><%= UPay.Localization.t("Learn More")%></a>\n  </div>\n  <% } %>\n</div>\n'), UPay.JST["dummy/dummy/dummy"] = UPay.Template.parse(""), UPay.JST["paylist/default/_entry"] = UPay.Template.parse('<li id="upay_<%= elementId%>_li_<%= id%>">\n  <span class="upay-paylist-logo"><img id="upay_<%= elementId%>_img_<%= id %>" src="<%= logo %>" alt="0"/></span>\n  <% if (orientation == \'vertical\') { %>\n    <span id="upay_<%= elementId%>_desc_<%= id %>" class="upay-paylist-desc"><%= name %></span>\n  <% } %>\n</li>\n'), UPay.JST["paylist/default/ready"] = UPay.Template.parse('<div id="upay_paylist_<%= elementId %>" class="upay-paylist-container upay-theme-<%= theme %> <%=orientation%>">\n  <div class="upay-paylist-header"><%= UPay.Localization.t(\'Choose a payment option\') %></div>\n  <ul id="upay_<%= elementId%>_ul_primary" class="upay-paylist-primary">\n    <% UPay.Array.forEach(firstList, function(payment){ %>\n      <%= UPay.JST[\'paylist/default/_entry\']({id: payment.id, name: payment.name, logo: payment.logo, elementId: elementId, orientation: payment.orientation}) %>\n    <% }); %>\n  </ul>\n  <% if (secondList.length > 0) { %>\n    <ul id="upay_<%= elementId%>_ul_secondary" class="upay-paylist-secondary" style="display:none">\n      <% UPay.Array.forEach(secondList, function(payment){ %>\n        <%= UPay.JST[\'paylist/default/_entry\']({id: payment.id, name: payment.name, logo: payment.logo, elementId: elementId, orientation: payment.orientation}) %>\n      <% }); %>\n    </ul>\n    <div id="upay_<%= elementId%>_div_more" class="upay-paylist-more"><%= UPay.Localization.t(\'More payment options\') %></div>\n    <div id="upay_<%= elementId%>_div_less" class="upay-paylist-more" style=\'display:none\'><%= UPay.Localization.t(\'Less payment options\') %></div>\n  <% } %>\n</div>\n'), UPay.JST["redeem/default/ready"] = UPay.Template.parse('<div id="upay_<%= elementId %>" class="upay_redeem_container upay_theme_<%= theme %>">\n    <div class="upay_redeem_btn">\n        <div id="upay_<%= elementId %>_redeem_btn"><%= label %></div>\n        <div id="upay_<%= elementId %>_redeem_loading" class="upay_redeem_loading upay_invisible"></div>\n    </div>\n</div>\n'), UPay.JST["subscribe/default/ready"] = UPay.Template.parse('<div id="upay_<%= elementId %>" class="upay_subscribe_container upay_theme_<%= theme %>">\n    <div class="upay_subscribe_btn">\n        <div id="upay_<%= elementId %>_subscribe_btn"><%= label %></div>\n        <div id="upay_<%= elementId %>_subscribe_loading" class="upay_subscribe_loading upay_invisible"></div>\n    </div>\n</div>\n'), UPay.JST["topup/default/ready"] = UPay.Template.parse('<div id="upay_<%= elementId %>_ready" class="upay_reset upay_topup_container upay_theme_<%= theme %>">\n    <div class="upay_topup_btn">\n        <div id="upay_<%= elementId %>_topup" class="upay_clickable"><%= text %></div>\n    </div>\n</div>')
}(), UPay.Dom.addCssRules(".upay_dialog{position:absolute;top:-10000px;z-index:999999}.upay_dialog_advanced{background:transparent;border:none}.upay_dialog_content{background:transparent;color:#333333}.upay_dialog_close_icon{cursor:pointer;display:block;height:16px;position:absolute;right:19px;top:18px;width:14px;top:10px\\9;right:7px\\9}.upay_dialog_loader{border:1px solid #ddd;height:100px;background:#fff url(//sandbox-static.v.me/s/img/widget/loader.4889784689c1b8109f97a0eecf9265f4.gif) no-repeat center center;background-size:24px 17px}.upay_dialog_iframe{line-height:0}\n\n.upay_hidden{position:absolute;top:-10000px;z-index:10001}.upay_reset{background:none;border-spacing:0;border:0px;color:#000;cursor:auto;direction:ltr;font-family:arial, sans-serif;font-size:16px;font-style:normal;font-variant:normal;font-weight:normal;letter-spacing:normal;line-height:1;margin:0;overflow:visible;padding:0;text-align:left;text-decoration:none;text-indent:0;text-shadow:none;text-transform:none;visibility:visible;white-space:normal;word-spacing:normal}.upay_reset li{list-style:none}.upay_link img{border:none}.upay_invisible{visibility:hidden}.upay-invisible{visibility:hidden}#upay-modal{display:block;position:absolute;height:100%;width:100%;top:0;left:0;background-color:#000;-moz-opacity:0.1;opacity:0.1;filter:alpha(opacity=0.1);z-index:999998}\n\n.upay_balance_container.upay_theme_blue-grade{-moz-user-select:none;-webkit-user-select:none;font-size:1.1em;color:#fff;text-transform:uppercase;display:inline-block;background:transparent;background:-moz-linear-gradient(center top, #40a5db, #005c9d);background:-webkit-gradient(linear, left top, left bottom, from(#40a5db), to(#005c9d));background-color:#40a5db;border-radius:15px;-moz-border-radius:15px;-webkit-border-radius:15px;border-radius:15px;border:1px #505050 solid;padding:0;cursor:pointer}.upay_balance_container.upay_theme_blue-grade .upay_balance_amount{padding:5px 36px 5px 5px;display:block;background:url(//sandbox-static.v.me/s/img/widget/blue-grade/button/balance_arrow.aa18710dc7a6fae5f0f11a5cb3604acb.png) no-repeat right center}.upay_balance_container.upay_theme_blue-grade .upay_balance_amount img{float:left}.upay_balance_container.upay_theme_blue-grade .upay_balance_amount div{display:inline-block;padding:1px 0 1px 2px}.upay_balance_container.upay_theme_blue-grade .upay_balance_amount_container{display:block;float:left;color:#fff}\n\n.upay_billing_container.upay_theme_blue-grade{-moz-user-select:none;-webkit-user-select:none;font-size:0.85em;color:#fff;text-transform:uppercase;display:inline-block;background:transparent;background:-moz-linear-gradient(center top, #40a5db, #005c9d);background:-webkit-gradient(linear, left top, left bottom, from(#40a5db), to(#005c9d));background-color:#40a5db;border-radius:15px;-moz-border-radius:15px;-webkit-border-radius:15px;border-radius:15px;border:1px #245caa solid;padding:6px 12px;cursor:pointer}.upay_billing_container.upay_theme_blue-grade .upay_billing_btn{position:relative;display:block;float:left;font-weight:bold;text-align:center;border-left:none;padding:0}.upay_billing_container.upay_theme_blue-grade .upay_billing_btn a{color:#fff;text-decoration:none;font-weight:bold}.upay_billing_container.upay_theme_blue-grade .upay_billing_loading{width:100%;height:100%;position:absolute;top:0px;left:0px;background:url(//sandbox-static.v.me/s/img/widget/loader.4889784689c1b8109f97a0eecf9265f4.gif) no-repeat center center}\n\n.upay-buy-widget.upay-theme-blue-grade{-moz-user-select:none;-webkit-user-select:none;font-size:0.85em;font-weight:bold;color:#fff;text-transform:uppercase;display:inline-block;background:transparent;background:-moz-linear-gradient(center top, #40a5db, #005c9d);background:-webkit-gradient(linear, left top, left bottom, from(#40a5db), to(#005c9d));background-color:#40a5db;border-radius:15px;-moz-border-radius:15px;-webkit-border-radius:15px;border-radius:15px;border:1px #505050 solid;padding:0;margin:0;cursor:pointer;position:relative}.upay-buy-widget.upay-theme-blue-grade .upay-buy-label{display:inline-block;padding:5px}.upay-buy-widget.upay-theme-blue-grade .upay-image-currency{vertical-align:middle;margin-top:-3px}.upay-buy-widget.upay-theme-blue-grade .upay-buy-loading{width:45%;height:100%;position:absolute;top:0px;right:0px;display:inline-block;background:url(//sandbox-static.v.me/s/img/widget/loader.4889784689c1b8109f97a0eecf9265f4.gif) no-repeat center center}.upay-buy-widget.upay-theme-blue-grade .upay-buy-amount{padding:5px;border-right:1px #505050 solid;display:inline-block;margin-right:-4px}\n\n.upay-paylist-container.upay-theme-blue-grade{color:#000;font-family:\"Helvetica Neue\",\"Helvetica\",arial;font-size:0.85em;background:transparent}.upay-paylist-container.upay-theme-blue-grade a,.upay-paylist-container.upay-theme-blue-grade a:hover{color:#0077a4;text-decoration:none}.upay-paylist-container.upay-theme-blue-grade .upay-paylist-header,.upay-paylist-container.upay-theme-blue-grade .upay-paylist-more{padding:12px 5px;margin:0}.upay-paylist-container.upay-theme-blue-grade .upay-paylist-more{color:#0077a4;text-decoration:none;cursor:pointer;cursor:hand;display:inline-block}.upay-paylist-container.upay-theme-blue-grade .upay-paylist-primary,.upay-paylist-container.upay-theme-blue-grade .upay-paylist-secondary{padding:0;margin:0;list-style-type:none}.upay-paylist-container.upay-theme-blue-grade .upay-paylist-primary li,.upay-paylist-container.upay-theme-blue-grade .upay-paylist-secondary li{color:#fff;background:#40a5db;background:-moz-linear-gradient(top, #40a5db 0%, #005c9d 100%);background:-webkit-gradient(linear, left top, left bottom, color-stop(0%, #40a5db), color-stop(100%, #005c9d));background:-webkit-linear-gradient(top, #40a5db 0%, #005c9d 100%);background:-o-linear-gradient(top, #40a5db 0%, #005c9d 100%);background:-ms-linear-gradient(top, #40a5db 0%, #005c9d 100%);background:linear-gradient(to bottom, #40a5db 0%, #005c9d 100%);border:1px solid #cbcbcb;border-radius:0;-webkit-border-radius:0;-moz-border-radius:0;padding:7px 20px;margin:0;-webkit-box-shadow:inset 0px 0px 6px 2px #40a5db;box-shadow:inset 0px 0px 6px 2px #40a5db;cursor:pointer;cursor:hand}.upay-paylist-container.upay-theme-blue-grade .upay-paylist-primary li:hover,.upay-paylist-container.upay-theme-blue-grade .upay-paylist-secondary li:hover{color:#ccc}.upay-paylist-container.upay-theme-blue-grade .upay-paylist-logo{display:inline}.upay-paylist-container.upay-theme-blue-grade .upay-paylist-logo img{vertical-align:middle}.upay-paylist-container.upay-theme-blue-grade .upay-paylist-desc{display:inline;padding:0 0 0 5px;margin:0;vertical-align:middle}.upay-paylist-container.upay-theme-blue-grade.vertical .upay-paylist-primary li,.upay-paylist-container.upay-theme-blue-grade.vertical .upay-paylist-secondary li{border-right:none;border-left:none;border-top:none}.upay-paylist-container.upay-theme-blue-grade.vertical .upay-paylist-primary li:first-child{border-top:1px solid #cbcbcb}.upay-paylist-container.upay-theme-blue-grade.horizontal{width:99%;padding-bottom:40px;display:inline-block;position:relative}.upay-paylist-container.upay-theme-blue-grade.horizontal .upay-paylist-primary li,.upay-paylist-container.upay-theme-blue-grade.horizontal .upay-paylist-secondary li{border-radius:4px;-webkit-border-radius:4px;-moz-border-radius:4px;display:inline-block;margin:5px;float:left}.upay-paylist-container.upay-theme-blue-grade.horizontal .upay-paylist-more{position:absolute;bottom:0;left:0}.upay-paylist-container.upay-theme-blue-grade .upay-paylist-primary li,.upay-paylist-container.upay-theme-blue-grade .upay-paylist-secondary li{filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#40a5db', endColorstr='#005c9d',GradientType=0 )}\n\n.upay_redeem_container.upay_theme_blue-grade{-moz-user-select:none;-webkit-user-select:none;font-size:0.85em;color:#fff;text-transform:uppercase;display:inline-block;background:transparent;background:-moz-linear-gradient(center top, #40a5db, #005c9d);background:-webkit-gradient(linear, left top, left bottom, from(#40a5db), to(#005c9d));background-color:#40a5db;border-radius:15px;-moz-border-radius:15px;-webkit-border-radius:15px;border-radius:15px;border:1px #245caa solid;padding:6px 12px;cursor:pointer}.upay_redeem_container.upay_theme_blue-grade .upay_redeem_btn{position:relative;display:block;float:left;font-weight:bold;text-align:center;border-left:none;padding:0}.upay_redeem_container.upay_theme_blue-grade .upay_redeem_btn a{color:#fff;text-decoration:none;font-weight:bold}.upay_redeem_container.upay_theme_blue-grade .upay_redeem_loading{width:100%;height:100%;position:absolute;top:0px;left:0px;background:url(//sandbox-static.v.me/s/img/widget/loader.4889784689c1b8109f97a0eecf9265f4.gif) no-repeat center center}\n\n.upay_subscribe_container.upay_theme_blue-grade{-moz-user-select:none;-webkit-user-select:none;font-size:0.85em;color:#fff;text-transform:uppercase;display:inline-block;background:transparent;background:-moz-linear-gradient(center top, #40a5db, #005c9d);background:-webkit-gradient(linear, left top, left bottom, from(#40a5db), to(#005c9d));background-color:#40a5db;border-radius:15px;-moz-border-radius:15px;-webkit-border-radius:15px;border-radius:15px;border:1px #245caa solid;padding:6px 12px;cursor:pointer}.upay_subscribe_container.upay_theme_blue-grade .upay_subscribe_btn{position:relative;display:block;float:left;font-weight:bold;text-align:center;border-left:none;padding:0}.upay_subscribe_container.upay_theme_blue-grade .upay_subscribe_btn a{color:#fff;text-decoration:none;font-weight:bold}.upay_subscribe_container.upay_theme_blue-grade .upay_subscribe_loading{width:100%;height:100%;position:absolute;top:0px;left:0px;background:url(//sandbox-static.v.me/s/img/widget/loader.4889784689c1b8109f97a0eecf9265f4.gif) no-repeat center center}\n\n.upay_topup_container.upay_theme_blue-grade{-moz-user-select:none;-webkit-user-select:none;font-size:0.85em;color:#fff;text-transform:uppercase;display:inline-block;background:transparent;background:-moz-linear-gradient(center top, #40a5db, #005c9d);background:-webkit-gradient(linear, left top, left bottom, from(#40a5db), to(#005c9d));background-color:#40a5db;border-radius:15px;-moz-border-radius:15px;-webkit-border-radius:15px;border-radius:15px;border:1px #505050 solid;padding:6px 12px;cursor:pointer}.upay_topup_container.upay_theme_blue-grade .upay_topup_btn{position:relative;display:block;float:left;font-weight:bold;text-align:center;border-left:none;padding:0}.upay_topup_container.upay_theme_blue-grade .upay_topup_btn a{color:#fff;text-decoration:none;font-weight:bold}\n\n.upay_balance_container.upay_theme_dark-gray{-moz-user-select:none;-webkit-user-select:none;font-size:1.1em;color:#fff;text-transform:uppercase;display:inline-block;background:#282828;background:-moz-linear-gradient(center top, none, none);background:-webkit-gradient(linear, left top, left bottom, from(none), to(none));background-color:none;border-radius:15px;-moz-border-radius:15px;-webkit-border-radius:15px;border-radius:15px;border:1px #000 solid;padding:0;cursor:pointer}.upay_balance_container.upay_theme_dark-gray .upay_balance_amount{padding:5px 36px 5px 5px;display:block;background:url(//sandbox-static.v.me/s/img/widget/dark-gray/button/balance_arrow.e5986217d03b781bb0f3a25491c53e33.png) no-repeat right center}.upay_balance_container.upay_theme_dark-gray .upay_balance_amount img{float:left}.upay_balance_container.upay_theme_dark-gray .upay_balance_amount div{display:inline-block;padding:1px 0 1px 2px}.upay_balance_container.upay_theme_dark-gray .upay_balance_amount_container{display:block;float:left;color:#fff}\n\n.upay_billing_container.upay_theme_dark-gray{-moz-user-select:none;-webkit-user-select:none;font-size:0.85em;color:#fff;text-transform:uppercase;display:inline-block;background:#282828;background:-moz-linear-gradient(center top, none, none);background:-webkit-gradient(linear, left top, left bottom, from(none), to(none));background-color:none;border-radius:15px;-moz-border-radius:15px;-webkit-border-radius:15px;border-radius:15px;border:1px #000 solid;padding:6px 12px;cursor:pointer}.upay_billing_container.upay_theme_dark-gray .upay_billing_btn{position:relative;display:block;float:left;font-weight:bold;text-align:center;border-left:none;padding:0}.upay_billing_container.upay_theme_dark-gray .upay_billing_btn a{color:#fff;text-decoration:none;font-weight:bold}.upay_billing_container.upay_theme_dark-gray .upay_billing_loading{width:100%;height:100%;position:absolute;top:0px;left:0px;background:url(//sandbox-static.v.me/s/img/widget/loader.4889784689c1b8109f97a0eecf9265f4.gif) no-repeat center center}\n\n.upay-buy-widget.upay-theme-dark-gray{-moz-user-select:none;-webkit-user-select:none;font-size:0.85em;font-weight:bold;color:#fff;text-transform:uppercase;display:inline-block;background:#282828;background:-moz-linear-gradient(center top, none, none);background:-webkit-gradient(linear, left top, left bottom, from(none), to(none));background-color:none;border-radius:15px;-moz-border-radius:15px;-webkit-border-radius:15px;border-radius:15px;border:1px #000 solid;padding:0;margin:0;cursor:pointer;position:relative}.upay-buy-widget.upay-theme-dark-gray .upay-buy-label{display:inline-block;padding:5px}.upay-buy-widget.upay-theme-dark-gray .upay-image-currency{vertical-align:middle;margin-top:-3px}.upay-buy-widget.upay-theme-dark-gray .upay-buy-loading{width:45%;height:100%;position:absolute;top:0px;right:0px;display:inline-block;background:url(//sandbox-static.v.me/s/img/widget/loader.4889784689c1b8109f97a0eecf9265f4.gif) no-repeat center center}.upay-buy-widget.upay-theme-dark-gray .upay-buy-amount{padding:5px;border-right:1px #505050 solid;display:inline-block;margin-right:-4px}\n\n.upay-paylist-container.upay-theme-dark-gray{color:#000;font-family:\"Helvetica Neue\",\"Helvetica\",arial;font-size:0.85em;background:transparent}.upay-paylist-container.upay-theme-dark-gray a,.upay-paylist-container.upay-theme-dark-gray a:hover{color:#0077a4;text-decoration:none}.upay-paylist-container.upay-theme-dark-gray .upay-paylist-header,.upay-paylist-container.upay-theme-dark-gray .upay-paylist-more{padding:12px 5px;margin:0}.upay-paylist-container.upay-theme-dark-gray .upay-paylist-more{color:#0077a4;text-decoration:none;cursor:pointer;cursor:hand;display:inline-block}.upay-paylist-container.upay-theme-dark-gray .upay-paylist-primary,.upay-paylist-container.upay-theme-dark-gray .upay-paylist-secondary{padding:0;margin:0;list-style-type:none}.upay-paylist-container.upay-theme-dark-gray .upay-paylist-primary li,.upay-paylist-container.upay-theme-dark-gray .upay-paylist-secondary li{color:#fff;background:#282828;background:-moz-linear-gradient(top, #282828 0%, #282828 100%);background:-webkit-gradient(linear, left top, left bottom, color-stop(0%, #282828), color-stop(100%, #282828));background:-webkit-linear-gradient(top, #282828 0%, #282828 100%);background:-o-linear-gradient(top, #282828 0%, #282828 100%);background:-ms-linear-gradient(top, #282828 0%, #282828 100%);background:linear-gradient(to bottom, #282828 0%, #282828 100%);border:1px solid #cbcbcb;border-radius:0;-webkit-border-radius:0;-moz-border-radius:0;padding:7px 20px;margin:0;-webkit-box-shadow:inset 0px 0px 6px 2px #282828;box-shadow:inset 0px 0px 6px 2px #282828;cursor:pointer;cursor:hand}.upay-paylist-container.upay-theme-dark-gray .upay-paylist-primary li:hover,.upay-paylist-container.upay-theme-dark-gray .upay-paylist-secondary li:hover{color:#ccc}.upay-paylist-container.upay-theme-dark-gray .upay-paylist-logo{display:inline}.upay-paylist-container.upay-theme-dark-gray .upay-paylist-logo img{vertical-align:middle}.upay-paylist-container.upay-theme-dark-gray .upay-paylist-desc{display:inline;padding:0 0 0 5px;margin:0;vertical-align:middle}.upay-paylist-container.upay-theme-dark-gray.vertical .upay-paylist-primary li,.upay-paylist-container.upay-theme-dark-gray.vertical .upay-paylist-secondary li{border-right:none;border-left:none;border-top:none}.upay-paylist-container.upay-theme-dark-gray.vertical .upay-paylist-primary li:first-child{border-top:1px solid #cbcbcb}.upay-paylist-container.upay-theme-dark-gray.horizontal{width:99%;padding-bottom:40px;display:inline-block;position:relative}.upay-paylist-container.upay-theme-dark-gray.horizontal .upay-paylist-primary li,.upay-paylist-container.upay-theme-dark-gray.horizontal .upay-paylist-secondary li{border-radius:4px;-webkit-border-radius:4px;-moz-border-radius:4px;display:inline-block;margin:5px;float:left}.upay-paylist-container.upay-theme-dark-gray.horizontal .upay-paylist-more{position:absolute;bottom:0;left:0}.upay-paylist-container.upay-theme-dark-gray .upay-paylist-primary li,.upay-paylist-container.upay-theme-dark-gray .upay-paylist-secondary li{filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#282828', endColorstr='#282828',GradientType=0 )}\n\n.upay_redeem_container.upay_theme_dark-gray{-moz-user-select:none;-webkit-user-select:none;font-size:0.85em;color:#fff;text-transform:uppercase;display:inline-block;background:#282828;background:-moz-linear-gradient(center top, none, none);background:-webkit-gradient(linear, left top, left bottom, from(none), to(none));background-color:none;border-radius:15px;-moz-border-radius:15px;-webkit-border-radius:15px;border-radius:15px;border:1px #000 solid;padding:6px 12px;cursor:pointer}.upay_redeem_container.upay_theme_dark-gray .upay_redeem_btn{position:relative;display:block;float:left;font-weight:bold;text-align:center;border-left:none;padding:0}.upay_redeem_container.upay_theme_dark-gray .upay_redeem_btn a{color:#fff;text-decoration:none;font-weight:bold}.upay_redeem_container.upay_theme_dark-gray .upay_redeem_loading{width:100%;height:100%;position:absolute;top:0px;left:0px;background:url(//sandbox-static.v.me/s/img/widget/loader.4889784689c1b8109f97a0eecf9265f4.gif) no-repeat center center}\n\n.upay_subscribe_container.upay_theme_dark-gray{-moz-user-select:none;-webkit-user-select:none;font-size:0.85em;color:#fff;text-transform:uppercase;display:inline-block;background:#282828;background:-moz-linear-gradient(center top, none, none);background:-webkit-gradient(linear, left top, left bottom, from(none), to(none));background-color:none;border-radius:15px;-moz-border-radius:15px;-webkit-border-radius:15px;border-radius:15px;border:1px #000 solid;padding:6px 12px;cursor:pointer}.upay_subscribe_container.upay_theme_dark-gray .upay_subscribe_btn{position:relative;display:block;float:left;font-weight:bold;text-align:center;border-left:none;padding:0}.upay_subscribe_container.upay_theme_dark-gray .upay_subscribe_btn a{color:#fff;text-decoration:none;font-weight:bold}.upay_subscribe_container.upay_theme_dark-gray .upay_subscribe_loading{width:100%;height:100%;position:absolute;top:0px;left:0px;background:url(//sandbox-static.v.me/s/img/widget/loader.4889784689c1b8109f97a0eecf9265f4.gif) no-repeat center center}\n\n.upay_topup_container.upay_theme_dark-gray{-moz-user-select:none;-webkit-user-select:none;font-size:0.85em;color:#fff;text-transform:uppercase;display:inline-block;background:#282828;background:-moz-linear-gradient(center top, none, none);background:-webkit-gradient(linear, left top, left bottom, from(none), to(none));background-color:none;border-radius:15px;-moz-border-radius:15px;-webkit-border-radius:15px;border-radius:15px;border:1px #000 solid;padding:6px 12px;cursor:pointer}.upay_topup_container.upay_theme_dark-gray .upay_topup_btn{position:relative;display:block;float:left;font-weight:bold;text-align:center;border-left:none;padding:0}.upay_topup_container.upay_theme_dark-gray .upay_topup_btn a{color:#fff;text-decoration:none;font-weight:bold}\n\n.upay_balance_container{-moz-user-select:none;-webkit-user-select:none;font-size:1.1em;color:#000;text-transform:uppercase;display:inline-block;background:transparent;background:-moz-linear-gradient(center top, #fff, #f5f5f5);background:-webkit-gradient(linear, left top, left bottom, from(#fff), to(#f5f5f5));background-color:#fff;border-radius:15px;-moz-border-radius:15px;-webkit-border-radius:15px;border-radius:15px;border:1px #ddd solid;padding:0;cursor:pointer}.upay_balance_amount{padding:5px 36px 5px 5px;display:block;background:url(//sandbox-static.v.me/s/img/widget/default/button/balance_arrow.5dd7eb06edb4d7c1e2de55c3ed866649.png) no-repeat right center}.upay_balance_amount img{float:left}.upay_balance_amount div{display:inline-block;padding:1px 0 1px 2px}.upay_balance_amount_loader{width:16px;height:11px;background:url(//sandbox-static.v.me/s/img/widget/loader.4889784689c1b8109f97a0eecf9265f4.gif) no-repeat}.upay_balance_amount_container{display:block;float:left;color:#000}.upay_balance_btn{display:block;float:left;text-align:center;background:url(//sandbox-static.v.me/s/img/widget/default/sprite/balance.a36db9ed7a968121744561bf7a0ccdaf.png) repeat-x 0px -182px;-moz-border-radius:4px;border-radius:4px;padding:4px 8px;height:100%}.upay_balance_menu{position:absolute;z-index:1;background-color:#f5f5f5;border:1px #b7b7b7 solid;-moz-border-radius:4px;border-radius:4px;right:0;width:11em;padding:1px;margin-top:28px}.upay_balance_menu li{text-align:left;padding:2px;border-bottom:1px #e5e5e5 solid}button.upay_balance_menu_btn{width:100%;text-align:left;cursor:pointer;background-color:transparent;border:1px #f5f5f5 solid;font-size:1em;padding:6px 4px}button.upay_balance_menu_btn:hover{border:1px #fa7805 solid;-moz-border-radius:4px;border-radius:4px;background:url(//sandbox-static.v.me/s/img/widget/default/sprite/balance.a36db9ed7a968121744561bf7a0ccdaf.png) repeat-x 0px -330px}button.disabled{background-color:transparent;border:1px #f5f5f5 solid;font-size:1em;padding:6px 4px;color:#999}button.disabled:hover{background-image:none;border:1px #f5f5f5 solid}\n\n.upay_billing_container{-moz-user-select:none;-webkit-user-select:none;font-size:0.8em;color:#000;text-transform:uppercase;display:inline-block;background:transparent;background:-moz-linear-gradient(center top, #fff, #f5f5f5);background:-webkit-gradient(linear, left top, left bottom, from(#fff), to(#f5f5f5));background-color:#fff;border-radius:15px;-moz-border-radius:15px;-webkit-border-radius:15px;border-radius:15px;border:1px #ddd solid;padding:6px 12px;cursor:pointer}.upay_billing_btn{position:relative;display:block;float:left;font-weight:bold;text-align:center;border-left:none;padding:0}.upay_billing_btn a{color:#000;text-decoration:none;font-weight:bold}.upay_billing_loading{width:100%;height:100%;position:absolute;top:0px;left:0px;background:url(//sandbox-static.v.me/s/img/widget/loader.4889784689c1b8109f97a0eecf9265f4.gif) no-repeat center center}\n\n.upay-buy-widget.upay-theme-default{-moz-user-select:none;-webkit-user-select:none;font-size:0.85em;font-weight:bold;color:#000;text-transform:uppercase;display:inline-block;background:transparent;background:-moz-linear-gradient(center top, #fff, #f5f5f5);background:-webkit-gradient(linear, left top, left bottom, from(#fff), to(#f5f5f5));background-color:#fff;border-radius:15px;-moz-border-radius:15px;-webkit-border-radius:15px;border-radius:15px;border:1px #ddd solid;padding:0;margin:0;cursor:pointer;position:relative}.upay-buy-widget.upay-theme-default .upay-buy-label{display:inline-block;padding:5px}.upay-buy-widget.upay-theme-default .upay-image-currency{vertical-align:middle;margin-top:-3px}.upay-buy-widget.upay-theme-default .upay-buy-loading{width:45%;height:100%;position:absolute;top:0px;right:0px;display:inline-block;background:url(//sandbox-static.v.me/s/img/widget/loader.4889784689c1b8109f97a0eecf9265f4.gif) no-repeat center center}.upay-buy-widget.upay-theme-default .upay-buy-amount{padding:5px;border-right:1px #e9e9e9 solid;display:inline-block;margin-right:-4px}\n\n.upay-paylist-container.upay-theme-default{color:#000;font-family:\"Helvetica Neue\",\"Helvetica\",arial;font-size:0.85em;background:transparent}.upay-paylist-container.upay-theme-default a,.upay-paylist-container.upay-theme-default a:hover{color:#0077a4;text-decoration:none}.upay-paylist-container.upay-theme-default .upay-paylist-header,.upay-paylist-container.upay-theme-default .upay-paylist-more{padding:12px 5px;margin:0}.upay-paylist-container.upay-theme-default .upay-paylist-more{color:#0077a4;text-decoration:none;cursor:pointer;cursor:hand;display:inline-block}.upay-paylist-container.upay-theme-default .upay-paylist-primary,.upay-paylist-container.upay-theme-default .upay-paylist-secondary{padding:0;margin:0;list-style-type:none}.upay-paylist-container.upay-theme-default .upay-paylist-primary li,.upay-paylist-container.upay-theme-default .upay-paylist-secondary li{color:#969696;background:#fff;background:-moz-linear-gradient(top, #fff 0%, #f7f7f7 100%);background:-webkit-gradient(linear, left top, left bottom, color-stop(0%, #fff), color-stop(100%, #f7f7f7));background:-webkit-linear-gradient(top, #fff 0%, #f7f7f7 100%);background:-o-linear-gradient(top, #fff 0%, #f7f7f7 100%);background:-ms-linear-gradient(top, #fff 0%, #f7f7f7 100%);background:linear-gradient(to bottom, #fff 0%, #f7f7f7 100%);border:1px solid #cbcbcb;border-radius:0;-webkit-border-radius:0;-moz-border-radius:0;padding:7px 20px;margin:0;-webkit-box-shadow:inset 0px 0px 6px 2px #fff;box-shadow:inset 0px 0px 6px 2px #fff;cursor:pointer;cursor:hand}.upay-paylist-container.upay-theme-default .upay-paylist-primary li:hover,.upay-paylist-container.upay-theme-default .upay-paylist-secondary li:hover{color:#4b4b4b}.upay-paylist-container.upay-theme-default .upay-paylist-logo{display:inline}.upay-paylist-container.upay-theme-default .upay-paylist-logo img{vertical-align:middle}.upay-paylist-container.upay-theme-default .upay-paylist-desc{display:inline;padding:0 0 0 5px;margin:0;vertical-align:middle}.upay-paylist-container.upay-theme-default.vertical .upay-paylist-primary li,.upay-paylist-container.upay-theme-default.vertical .upay-paylist-secondary li{border-right:none;border-left:none;border-top:none}.upay-paylist-container.upay-theme-default.vertical .upay-paylist-primary li:first-child{border-top:1px solid #cbcbcb}.upay-paylist-container.upay-theme-default.horizontal{width:99%;padding-bottom:40px;display:inline-block;position:relative}.upay-paylist-container.upay-theme-default.horizontal .upay-paylist-primary li,.upay-paylist-container.upay-theme-default.horizontal .upay-paylist-secondary li{border-radius:4px;-webkit-border-radius:4px;-moz-border-radius:4px;display:inline-block;margin:5px;float:left}.upay-paylist-container.upay-theme-default.horizontal .upay-paylist-more{position:absolute;bottom:0;left:0}.upay-paylist-container.upay-theme-default .upay-paylist-primary li,.upay-paylist-container.upay-theme-default .upay-paylist-secondary li{filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffff', endColorstr='#f7f7f7',GradientType=0 )}\n\n.upay_redeem_container{-moz-user-select:none;-webkit-user-select:none;font-size:0.8em;color:#000;text-transform:uppercase;display:inline-block;background:transparent;background:-moz-linear-gradient(center top, #fff, #f5f5f5);background:-webkit-gradient(linear, left top, left bottom, from(#fff), to(#f5f5f5));background-color:#fff;border-radius:15px;-moz-border-radius:15px;-webkit-border-radius:15px;border-radius:15px;border:1px #ddd solid;padding:6px 12px;cursor:pointer}.upay_redeem_btn{position:relative;display:block;float:left;font-weight:bold;text-align:center;border-left:none;padding:0}.upay_redeem_btn a{color:#000;text-decoration:none;font-weight:bold}.upay_redeem_loading{width:100%;height:100%;position:absolute;top:0px;left:0px;background:url(//sandbox-static.v.me/s/img/widget/loader.4889784689c1b8109f97a0eecf9265f4.gif) no-repeat center center}\n\n.upay_subscribe_container{-moz-user-select:none;-webkit-user-select:none;font-size:0.8em;color:#000;text-transform:uppercase;display:inline-block;background:transparent;background:-moz-linear-gradient(center top, #fff, #f5f5f5);background:-webkit-gradient(linear, left top, left bottom, from(#fff), to(#f5f5f5));background-color:#fff;border-radius:15px;-moz-border-radius:15px;-webkit-border-radius:15px;border-radius:15px;border:1px #ddd solid;padding:6px 12px;cursor:pointer}.upay_subscribe_btn{position:relative;display:block;float:left;font-weight:bold;text-align:center;border-left:none;padding:0}.upay_subscribe_btn a{color:#000;text-decoration:none;font-weight:bold}.upay_subscribe_loading{width:100%;height:100%;position:absolute;top:0px;left:0px;background:url(//sandbox-static.v.me/s/img/widget/loader.4889784689c1b8109f97a0eecf9265f4.gif) no-repeat center center}\n\n.upay_topup_container{-moz-user-select:none;-webkit-user-select:none;font-size:0.85em;color:#000;text-transform:uppercase;display:inline-block;background:transparent;background:-moz-linear-gradient(center top, #fff, #f5f5f5);background:-webkit-gradient(linear, left top, left bottom, from(#fff), to(#f5f5f5));background-color:#fff;border-radius:15px;-moz-border-radius:15px;-webkit-border-radius:15px;border-radius:15px;border:1px #ddd solid;padding:6px 12px;cursor:pointer}.upay_topup_btn{position:relative;display:block;float:left;font-weight:bold;text-align:center;border-left:none;padding:0}.upay_topup_btn a{color:#000;text-decoration:none;font-weight:bold}\n\n#upay_unsupported{position:absolute;width:600px;left:50%;margin-left:-300px;top:100px;background-color:white;z-index:10}#upay_unsupported a{color:#1191e2;text-decoration:none}#upay_unsupported a:hover{color:#1191e2;text-decoration:none}#upay_unsupported .upay-modal-container{background:#525252;color:#222;zoom:1;padding:10px}#upay_unsupported .upay-modal-background{background:#fff}#upay_unsupported .upay-header{height:36px;padding:5px}#upay_unsupported .upay-header-logo{float:left;position:relative}#upay_unsupported .upay-header-logo img{height:36px}#upay_unsupported .upay-header-button{float:right;position:relative;padding:5px}#upay_unsupported .upay-header-close-window-text{display:none}#upay_unsupported .upay-header-close-button{width:25px;height:25px;background:url(https://static.ultimatepay.com/img/payment/default/icon_close.png) no-repeat left center}#upay_unsupported .upay-body{border-top:1px solid #ddd}#upay_unsupported .upay-body-item{background:transparent;border-bottom:1px solid #ddd;position:relative;overflow:hidden}#upay_unsupported .upay-body-item span{display:block;position:relative}#upay_unsupported .upay-body-item-description{font-size:1em;font-weight:bold;height:20px;padding:15px 10px}#upay_unsupported .upay-body-item-description img{padding:2px 5px;float:left}#upay_unsupported .upay-body-item-description .product-desc{line-height:15px;padding-bottom:5px;padding-top:10px}#upay_unsupported .upay-body-item-description .product-sub-desc{font-size:0.75em;font-weight:normal;line-height:6px;margin-left:5px}#upay_unsupported .upay-body-item-price{height:56px;display:inline-block;zoom:1;*display:inline;padding:0;float:right;margin-left:5px}#upay_unsupported .upay-body-item-price .amount{display:inline-block}#upay_unsupported .upay-body-label{border-top:1px solid #fff;clear:both}#upay_unsupported .upay-body-label .message-image{float:left;margin-top:5px;padding-right:6px}#upay_unsupported .upay-body-label .message-content{display:block;float:left;height:27px;padding-top:10px}#upay_unsupported .upay-body-label .message-info{color:#222;background:#eee;padding:0 10px;font-size:.7em;height:37px}#upay_unsupported .upay-body-label .message-prompt{color:#222;background:#fffae6;padding:0 10px;font-size:.7em;font-weight:bold;height:37px}#upay_unsupported .upay-body-label .message-error{color:#c40001;background:#fffae6;padding:6px 12px;font-size:.7em;font-weight:bold;height:auto}#upay_unsupported .expand-list-container{margin-top:20px}#upay_unsupported .titleLogo{padding:5px 5px 0 0;float:left}#upay_unsupported .upay-body-container{text-align:center;padding:30px 0}#upay_unsupported .upay-body-navigation{background:#eee;border-top:1px solid #ddd;padding:3px 4px 5px 0;height:35px}#upay_unsupported .upay-body-navigation a{font-size:.7em;font-weight:bold;margin-left:8px;padding:6px 8px 6px 8px}#upay_unsupported .back_link{float:left;margin-top:3px}#upay_unsupported .lightbox_body_navigation_btn{text-align:right}#upay_unsupported .upay-footer{color:#999;font-size:.62em;padding:4px 0 1px 0;position:relative;background:transparent;height:10px}#upay_unsupported .upay-footer-info{position:relative;display:block;float:left}#upay_unsupported .powered_by{width:106px;height:14px;display:block;background-image:url(https://static.ultimatepay.com/img/payment/default/pb_gray.png)}#upay_unsupported .lightbox_copyright{color:#fff;padding:2px;display:inline-block;vertical-align:top}#upay_unsupported .lightbox_copyright a{color:#fff;text-decoration:none;font-weight:bold}#upay_unsupported .upay-footer-navigation{position:absolute;right:4px;top:8px}#upay_unsupported .upay-footer-navigation ul{padding:0;margin:0}#upay_unsupported .upay-footer-navigation li{padding:0 3px;display:inline-block;border-right:1px #fff solid;line-height:8px;zoom:1;*display:inline}#upay_unsupported .upay-footer-navigation li.help{border:none;padding-right:0}#upay_unsupported .upay-footer-navigation a{color:#fff;text-decoration:none}\n\n.upay_balance_container.upay_theme_green{-moz-user-select:none;-webkit-user-select:none;font-size:1.1em;color:#000;text-transform:uppercase;display:inline-block;background:transparent;background:-moz-linear-gradient(center top, #f5f5f5, #fff);background:-webkit-gradient(linear, left top, left bottom, from(#f5f5f5), to(#fff));background-color:#f5f5f5;border-radius:15px;-moz-border-radius:15px;-webkit-border-radius:15px;border-radius:15px;border:1px #ddd solid;padding:0;cursor:pointer}.upay_balance_container.upay_theme_green .upay_balance_amount{padding:5px 36px 5px 5px;display:block;background:url(//sandbox-static.v.me/s/img/widget/green/button/balance_arrow.5dd7eb06edb4d7c1e2de55c3ed866649.png) no-repeat right center}.upay_balance_container.upay_theme_green .upay_balance_amount img{float:left}.upay_balance_container.upay_theme_green .upay_balance_amount div{display:inline-block;padding:1px 0 1px 2px}.upay_balance_container.upay_theme_green .upay_balance_amount_container{display:block;float:left;color:#000}\n\n.upay_billing_container.upay_theme_green{-moz-user-select:none;-webkit-user-select:none;font-size:0.85em;color:#000;text-transform:uppercase;display:inline-block;background:transparent;background:-moz-linear-gradient(center top, #f5f5f5, #fff);background:-webkit-gradient(linear, left top, left bottom, from(#f5f5f5), to(#fff));background-color:#f5f5f5;border-radius:15px;-moz-border-radius:15px;-webkit-border-radius:15px;border-radius:15px;border:1px #ddd solid;padding:6px 12px;cursor:pointer}.upay_billing_container.upay_theme_green .upay_billing_btn{position:relative;display:block;float:left;font-weight:bold;text-align:center;border-left:none;padding:0}.upay_billing_container.upay_theme_green .upay_billing_btn a{color:#000;text-decoration:none;font-weight:bold}.upay_billing_container.upay_theme_green .upay_billing_loading{width:100%;height:100%;position:absolute;top:0px;left:0px;background:url(//sandbox-static.v.me/s/img/widget/loader.4889784689c1b8109f97a0eecf9265f4.gif) no-repeat center center}\n\n.upay-buy-widget.upay-theme-green{-moz-user-select:none;-webkit-user-select:none;font-size:0.85em;font-weight:bold;color:#000;text-transform:uppercase;display:inline-block;background:transparent;background:-moz-linear-gradient(center top, #f5f5f5, #fff);background:-webkit-gradient(linear, left top, left bottom, from(#f5f5f5), to(#fff));background-color:#f5f5f5;border-radius:15px;-moz-border-radius:15px;-webkit-border-radius:15px;border-radius:15px;border:1px #ddd solid;padding:0;margin:0;cursor:pointer;position:relative}.upay-buy-widget.upay-theme-green .upay-buy-label{display:inline-block;padding:5px}.upay-buy-widget.upay-theme-green .upay-image-currency{vertical-align:middle;margin-top:-3px}.upay-buy-widget.upay-theme-green .upay-buy-loading{width:45%;height:100%;position:absolute;top:0px;right:0px;display:inline-block;background:url(//sandbox-static.v.me/s/img/widget/loader.4889784689c1b8109f97a0eecf9265f4.gif) no-repeat center center}.upay-buy-widget.upay-theme-green .upay-buy-amount{padding:5px;border-right:1px #e9e9e9 solid;display:inline-block;margin-right:-4px}\n\n.upay-paylist-container.upay-theme-green{color:#000;font-family:\"Helvetica Neue\",\"Helvetica\",arial;font-size:0.85em;background:transparent}.upay-paylist-container.upay-theme-green a,.upay-paylist-container.upay-theme-green a:hover{color:#0077a4;text-decoration:none}.upay-paylist-container.upay-theme-green .upay-paylist-header,.upay-paylist-container.upay-theme-green .upay-paylist-more{padding:12px 5px;margin:0}.upay-paylist-container.upay-theme-green .upay-paylist-more{color:#0077a4;text-decoration:none;cursor:pointer;cursor:hand;display:inline-block}.upay-paylist-container.upay-theme-green .upay-paylist-primary,.upay-paylist-container.upay-theme-green .upay-paylist-secondary{padding:0;margin:0;list-style-type:none}.upay-paylist-container.upay-theme-green .upay-paylist-primary li,.upay-paylist-container.upay-theme-green .upay-paylist-secondary li{color:#969696;background:#f5f5f5;background:-moz-linear-gradient(top, #f5f5f5 0%, #fff 100%);background:-webkit-gradient(linear, left top, left bottom, color-stop(0%, #f5f5f5), color-stop(100%, #fff));background:-webkit-linear-gradient(top, #f5f5f5 0%, #fff 100%);background:-o-linear-gradient(top, #f5f5f5 0%, #fff 100%);background:-ms-linear-gradient(top, #f5f5f5 0%, #fff 100%);background:linear-gradient(to bottom, #f5f5f5 0%, #fff 100%);border:1px solid #cbcbcb;border-radius:0;-webkit-border-radius:0;-moz-border-radius:0;padding:7px 20px;margin:0;-webkit-box-shadow:inset 0px 0px 6px 2px #fff;box-shadow:inset 0px 0px 6px 2px #fff;cursor:pointer;cursor:hand}.upay-paylist-container.upay-theme-green .upay-paylist-primary li:hover,.upay-paylist-container.upay-theme-green .upay-paylist-secondary li:hover{color:#4b4b4b}.upay-paylist-container.upay-theme-green .upay-paylist-logo{display:inline}.upay-paylist-container.upay-theme-green .upay-paylist-logo img{vertical-align:middle}.upay-paylist-container.upay-theme-green .upay-paylist-desc{display:inline;padding:0 0 0 5px;margin:0;vertical-align:middle}.upay-paylist-container.upay-theme-green.vertical .upay-paylist-primary li,.upay-paylist-container.upay-theme-green.vertical .upay-paylist-secondary li{border-right:none;border-left:none;border-top:none}.upay-paylist-container.upay-theme-green.vertical .upay-paylist-primary li:first-child{border-top:1px solid #cbcbcb}.upay-paylist-container.upay-theme-green.horizontal{width:99%;padding-bottom:40px;display:inline-block;position:relative}.upay-paylist-container.upay-theme-green.horizontal .upay-paylist-primary li,.upay-paylist-container.upay-theme-green.horizontal .upay-paylist-secondary li{border-radius:4px;-webkit-border-radius:4px;-moz-border-radius:4px;display:inline-block;margin:5px;float:left}.upay-paylist-container.upay-theme-green.horizontal .upay-paylist-more{position:absolute;bottom:0;left:0}.upay-paylist-container.upay-theme-green .upay-paylist-primary li,.upay-paylist-container.upay-theme-green .upay-paylist-secondary li{filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#f5f5f5', endColorstr='#ffffff',GradientType=0 )}\n\n.upay_redeem_container.upay_theme_green{-moz-user-select:none;-webkit-user-select:none;font-size:0.85em;color:#000;text-transform:uppercase;display:inline-block;background:transparent;background:-moz-linear-gradient(center top, #f5f5f5, #fff);background:-webkit-gradient(linear, left top, left bottom, from(#f5f5f5), to(#fff));background-color:#f5f5f5;border-radius:15px;-moz-border-radius:15px;-webkit-border-radius:15px;border-radius:15px;border:1px #ddd solid;padding:6px 12px;cursor:pointer}.upay_redeem_container.upay_theme_green .upay_redeem_btn{position:relative;display:block;float:left;font-weight:bold;text-align:center;border-left:none;padding:0}.upay_redeem_container.upay_theme_green .upay_redeem_btn a{color:#000;text-decoration:none;font-weight:bold}.upay_redeem_container.upay_theme_green .upay_redeem_loading{width:100%;height:100%;position:absolute;top:0px;left:0px;background:url(//sandbox-static.v.me/s/img/widget/loader.4889784689c1b8109f97a0eecf9265f4.gif) no-repeat center center}\n\n.upay_subscribe_container.upay_theme_green{-moz-user-select:none;-webkit-user-select:none;font-size:0.85em;color:#000;text-transform:uppercase;display:inline-block;background:transparent;background:-moz-linear-gradient(center top, #f5f5f5, #fff);background:-webkit-gradient(linear, left top, left bottom, from(#f5f5f5), to(#fff));background-color:#f5f5f5;border-radius:15px;-moz-border-radius:15px;-webkit-border-radius:15px;border-radius:15px;border:1px #ddd solid;padding:6px 12px;cursor:pointer}.upay_subscribe_container.upay_theme_green .upay_subscribe_btn{position:relative;display:block;float:left;font-weight:bold;text-align:center;border-left:none;padding:0}.upay_subscribe_container.upay_theme_green .upay_subscribe_btn a{color:#000;text-decoration:none;font-weight:bold}.upay_subscribe_container.upay_theme_green .upay_subscribe_loading{width:100%;height:100%;position:absolute;top:0px;left:0px;background:url(//sandbox-static.v.me/s/img/widget/loader.4889784689c1b8109f97a0eecf9265f4.gif) no-repeat center center}\n\n.upay_topup_container.upay_theme_green{-moz-user-select:none;-webkit-user-select:none;font-size:0.85em;color:#000;text-transform:uppercase;display:inline-block;background:transparent;background:-moz-linear-gradient(center top, #f5f5f5, #fff);background:-webkit-gradient(linear, left top, left bottom, from(#f5f5f5), to(#fff));background-color:#f5f5f5;border-radius:15px;-moz-border-radius:15px;-webkit-border-radius:15px;border-radius:15px;border:1px #ddd solid;padding:6px 12px;cursor:pointer}.upay_topup_container.upay_theme_green .upay_topup_btn{position:relative;display:block;float:left;font-weight:bold;text-align:center;border-left:none;padding:0}.upay_topup_container.upay_theme_green .upay_topup_btn a{color:#000;text-decoration:none;font-weight:bold}\n\n.upay_balance_container.upay_theme_light-blue{-moz-user-select:none;-webkit-user-select:none;font-size:1.1em;color:#000;text-transform:uppercase;display:inline-block;background:#deeeff;background:-moz-linear-gradient(center top, none, none);background:-webkit-gradient(linear, left top, left bottom, from(none), to(none));background-color:none;border-radius:15px;-moz-border-radius:15px;-webkit-border-radius:15px;border-radius:15px;border:1px #ddd solid;padding:0;cursor:pointer}.upay_balance_container.upay_theme_light-blue .upay_balance_amount{padding:5px 36px 5px 5px;display:block;background:url(//sandbox-static.v.me/s/img/widget/light-blue/button/balance_arrow.65f05c10d179d5b22dac5995e00b643b.png) no-repeat right center}.upay_balance_container.upay_theme_light-blue .upay_balance_amount img{float:left}.upay_balance_container.upay_theme_light-blue .upay_balance_amount div{display:inline-block;padding:1px 0 1px 2px}.upay_balance_container.upay_theme_light-blue .upay_balance_amount_container{display:block;float:left;color:#000}\n\n.upay_billing_container.upay_theme_light-blue{-moz-user-select:none;-webkit-user-select:none;font-size:0.85em;color:#000;text-transform:uppercase;display:inline-block;background:#deeeff;background:-moz-linear-gradient(center top, none, none);background:-webkit-gradient(linear, left top, left bottom, from(none), to(none));background-color:none;border-radius:15px;-moz-border-radius:15px;-webkit-border-radius:15px;border-radius:15px;border:1px #ddd solid;padding:6px 12px;cursor:pointer}.upay_billing_container.upay_theme_light-blue .upay_billing_btn{position:relative;display:block;float:left;font-weight:bold;text-align:center;border-left:none;padding:0}.upay_billing_container.upay_theme_light-blue .upay_billing_btn a{color:#000;text-decoration:none;font-weight:bold}.upay_billing_container.upay_theme_light-blue .upay_billing_loading{width:100%;height:100%;position:absolute;top:0px;left:0px;background:url(//sandbox-static.v.me/s/img/widget/loader.4889784689c1b8109f97a0eecf9265f4.gif) no-repeat center center}\n\n.upay-buy-widget.upay-theme-light-blue{-moz-user-select:none;-webkit-user-select:none;font-size:0.85em;font-weight:bold;color:#000;text-transform:uppercase;display:inline-block;background:#deeeff;background:-moz-linear-gradient(center top, none, none);background:-webkit-gradient(linear, left top, left bottom, from(none), to(none));background-color:none;border-radius:15px;-moz-border-radius:15px;-webkit-border-radius:15px;border-radius:15px;border:1px #ddd solid;padding:0;margin:0;cursor:pointer;position:relative}.upay-buy-widget.upay-theme-light-blue .upay-buy-label{display:inline-block;padding:5px}.upay-buy-widget.upay-theme-light-blue .upay-image-currency{vertical-align:middle;margin-top:-3px}.upay-buy-widget.upay-theme-light-blue .upay-buy-loading{width:45%;height:100%;position:absolute;top:0px;right:0px;display:inline-block;background:url(//sandbox-static.v.me/s/img/widget/loader.4889784689c1b8109f97a0eecf9265f4.gif) no-repeat center center}.upay-buy-widget.upay-theme-light-blue .upay-buy-amount{padding:5px;border-right:1px #fff solid;display:inline-block;margin-right:-4px}\n\n.upay-paylist-container.upay-theme-light-blue{color:#000;font-family:\"Helvetica Neue\",\"Helvetica\",arial;font-size:0.85em;background:transparent}.upay-paylist-container.upay-theme-light-blue a,.upay-paylist-container.upay-theme-light-blue a:hover{color:#0077a4;text-decoration:none}.upay-paylist-container.upay-theme-light-blue .upay-paylist-header,.upay-paylist-container.upay-theme-light-blue .upay-paylist-more{padding:12px 5px;margin:0}.upay-paylist-container.upay-theme-light-blue .upay-paylist-more{color:#0077a4;text-decoration:none;cursor:pointer;cursor:hand;display:inline-block}.upay-paylist-container.upay-theme-light-blue .upay-paylist-primary,.upay-paylist-container.upay-theme-light-blue .upay-paylist-secondary{padding:0;margin:0;list-style-type:none}.upay-paylist-container.upay-theme-light-blue .upay-paylist-primary li,.upay-paylist-container.upay-theme-light-blue .upay-paylist-secondary li{color:#969696;background:#deeeff;background:-moz-linear-gradient(top, #deeeff 0%, #deeeff 100%);background:-webkit-gradient(linear, left top, left bottom, color-stop(0%, #deeeff), color-stop(100%, #deeeff));background:-webkit-linear-gradient(top, #deeeff 0%, #deeeff 100%);background:-o-linear-gradient(top, #deeeff 0%, #deeeff 100%);background:-ms-linear-gradient(top, #deeeff 0%, #deeeff 100%);background:linear-gradient(to bottom, #deeeff 0%, #deeeff 100%);border:1px solid #cbcbcb;border-radius:0;-webkit-border-radius:0;-moz-border-radius:0;padding:7px 20px;margin:0;-webkit-box-shadow:inset 0px 0px 6px 2px #deeeff;box-shadow:inset 0px 0px 6px 2px #deeeff;cursor:pointer;cursor:hand}.upay-paylist-container.upay-theme-light-blue .upay-paylist-primary li:hover,.upay-paylist-container.upay-theme-light-blue .upay-paylist-secondary li:hover{color:#4b4b4b}.upay-paylist-container.upay-theme-light-blue .upay-paylist-logo{display:inline}.upay-paylist-container.upay-theme-light-blue .upay-paylist-logo img{vertical-align:middle}.upay-paylist-container.upay-theme-light-blue .upay-paylist-desc{display:inline;padding:0 0 0 5px;margin:0;vertical-align:middle}.upay-paylist-container.upay-theme-light-blue.vertical .upay-paylist-primary li,.upay-paylist-container.upay-theme-light-blue.vertical .upay-paylist-secondary li{border-right:none;border-left:none;border-top:none}.upay-paylist-container.upay-theme-light-blue.vertical .upay-paylist-primary li:first-child{border-top:1px solid #cbcbcb}.upay-paylist-container.upay-theme-light-blue.horizontal{width:99%;padding-bottom:40px;display:inline-block;position:relative}.upay-paylist-container.upay-theme-light-blue.horizontal .upay-paylist-primary li,.upay-paylist-container.upay-theme-light-blue.horizontal .upay-paylist-secondary li{border-radius:4px;-webkit-border-radius:4px;-moz-border-radius:4px;display:inline-block;margin:5px;float:left}.upay-paylist-container.upay-theme-light-blue.horizontal .upay-paylist-more{position:absolute;bottom:0;left:0}.upay-paylist-container.upay-theme-light-blue .upay-paylist-primary li,.upay-paylist-container.upay-theme-light-blue .upay-paylist-secondary li{filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#deeeff', endColorstr='#deeeff',GradientType=0 )}\n\n.upay_redeem_container.upay_theme_light-blue{-moz-user-select:none;-webkit-user-select:none;font-size:0.85em;color:#000;text-transform:uppercase;display:inline-block;background:#deeeff;background:-moz-linear-gradient(center top, none, none);background:-webkit-gradient(linear, left top, left bottom, from(none), to(none));background-color:none;border-radius:15px;-moz-border-radius:15px;-webkit-border-radius:15px;border-radius:15px;border:1px #ddd solid;padding:6px 12px;cursor:pointer}.upay_redeem_container.upay_theme_light-blue .upay_redeem_btn{position:relative;display:block;float:left;font-weight:bold;text-align:center;border-left:none;padding:0}.upay_redeem_container.upay_theme_light-blue .upay_redeem_btn a{color:#000;text-decoration:none;font-weight:bold}.upay_redeem_container.upay_theme_light-blue .upay_redeem_loading{width:100%;height:100%;position:absolute;top:0px;left:0px;background:url(//sandbox-static.v.me/s/img/widget/loader.4889784689c1b8109f97a0eecf9265f4.gif) no-repeat center center}\n\n.upay_subscribe_container.upay_theme_light-blue{-moz-user-select:none;-webkit-user-select:none;font-size:0.85em;color:#000;text-transform:uppercase;display:inline-block;background:#deeeff;background:-moz-linear-gradient(center top, none, none);background:-webkit-gradient(linear, left top, left bottom, from(none), to(none));background-color:none;border-radius:15px;-moz-border-radius:15px;-webkit-border-radius:15px;border-radius:15px;border:1px #ddd solid;padding:6px 12px;cursor:pointer}.upay_subscribe_container.upay_theme_light-blue .upay_subscribe_btn{position:relative;display:block;float:left;font-weight:bold;text-align:center;border-left:none;padding:0}.upay_subscribe_container.upay_theme_light-blue .upay_subscribe_btn a{color:#000;text-decoration:none;font-weight:bold}.upay_subscribe_container.upay_theme_light-blue .upay_subscribe_loading{width:100%;height:100%;position:absolute;top:0px;left:0px;background:url(//sandbox-static.v.me/s/img/widget/loader.4889784689c1b8109f97a0eecf9265f4.gif) no-repeat center center}\n\n.upay_topup_container.upay_theme_light-blue{-moz-user-select:none;-webkit-user-select:none;font-size:0.85em;color:#000;text-transform:uppercase;display:inline-block;background:#deeeff;background:-moz-linear-gradient(center top, none, none);background:-webkit-gradient(linear, left top, left bottom, from(none), to(none));background-color:none;border-radius:15px;-moz-border-radius:15px;-webkit-border-radius:15px;border-radius:15px;border:1px #ddd solid;padding:6px 12px;cursor:pointer}.upay_topup_container.upay_theme_light-blue .upay_topup_btn{position:relative;display:block;float:left;font-weight:bold;text-align:center;border-left:none;padding:0}.upay_topup_container.upay_theme_light-blue .upay_topup_btn a{color:#000;text-decoration:none;font-weight:bold}\n\n.upay_balance_container.upay_theme_light-gray{-moz-user-select:none;-webkit-user-select:none;font-size:1.1em;color:#000;text-transform:uppercase;display:inline-block;background:#eee;background:-moz-linear-gradient(center top, none, none);background:-webkit-gradient(linear, left top, left bottom, from(none), to(none));background-color:none;border-radius:15px;-moz-border-radius:15px;-webkit-border-radius:15px;border-radius:15px;border:1px #ddd solid;padding:0;cursor:pointer}.upay_balance_container.upay_theme_light-gray .upay_balance_amount{padding:5px 36px 5px 5px;display:block;background:url(//sandbox-static.v.me/s/img/widget/light-gray/button/balance_arrow.65f05c10d179d5b22dac5995e00b643b.png) no-repeat right center}.upay_balance_container.upay_theme_light-gray .upay_balance_amount img{float:left}.upay_balance_container.upay_theme_light-gray .upay_balance_amount div{display:inline-block;padding:1px 0 1px 2px}.upay_balance_container.upay_theme_light-gray .upay_balance_amount_container{display:block;float:left;color:#000}\n\n.upay_billing_container.upay_theme_light-gray{-moz-user-select:none;-webkit-user-select:none;font-size:0.85em;color:#000;text-transform:uppercase;display:inline-block;background:#eee;background:-moz-linear-gradient(center top, none, none);background:-webkit-gradient(linear, left top, left bottom, from(none), to(none));background-color:none;border-radius:15px;-moz-border-radius:15px;-webkit-border-radius:15px;border-radius:15px;border:1px #ddd solid;padding:6px 12px;cursor:pointer}.upay_billing_container.upay_theme_light-gray .upay_billing_btn{position:relative;display:block;float:left;font-weight:bold;text-align:center;border-left:none;padding:0}.upay_billing_container.upay_theme_light-gray .upay_billing_btn a{color:#000;text-decoration:none;font-weight:bold}.upay_billing_container.upay_theme_light-gray .upay_billing_loading{width:100%;height:100%;position:absolute;top:0px;left:0px;background:url(//sandbox-static.v.me/s/img/widget/loader.4889784689c1b8109f97a0eecf9265f4.gif) no-repeat center center}\n\n.upay-buy-widget.upay-theme-light-gray{-moz-user-select:none;-webkit-user-select:none;font-size:0.85em;font-weight:bold;color:#000;text-transform:uppercase;display:inline-block;background:#eee;background:-moz-linear-gradient(center top, none, none);background:-webkit-gradient(linear, left top, left bottom, from(none), to(none));background-color:none;border-radius:15px;-moz-border-radius:15px;-webkit-border-radius:15px;border-radius:15px;border:1px #ddd solid;padding:0;margin:0;cursor:pointer;position:relative}.upay-buy-widget.upay-theme-light-gray .upay-buy-label{display:inline-block;padding:5px}.upay-buy-widget.upay-theme-light-gray .upay-image-currency{vertical-align:middle;margin-top:-3px}.upay-buy-widget.upay-theme-light-gray .upay-buy-loading{width:45%;height:100%;position:absolute;top:0px;right:0px;display:inline-block;background:url(//sandbox-static.v.me/s/img/widget/loader.4889784689c1b8109f97a0eecf9265f4.gif) no-repeat center center}.upay-buy-widget.upay-theme-light-gray .upay-buy-amount{padding:5px;border-right:1px #fff solid;display:inline-block;margin-right:-4px}\n\n.upay-paylist-container.upay-theme-light-gray{color:#000;font-family:\"Helvetica Neue\",\"Helvetica\",arial;font-size:0.85em;background:transparent}.upay-paylist-container.upay-theme-light-gray a,.upay-paylist-container.upay-theme-light-gray a:hover{color:#0077a4;text-decoration:none}.upay-paylist-container.upay-theme-light-gray .upay-paylist-header,.upay-paylist-container.upay-theme-light-gray .upay-paylist-more{padding:12px 5px;margin:0}.upay-paylist-container.upay-theme-light-gray .upay-paylist-more{color:#0077a4;text-decoration:none;cursor:pointer;cursor:hand;display:inline-block}.upay-paylist-container.upay-theme-light-gray .upay-paylist-primary,.upay-paylist-container.upay-theme-light-gray .upay-paylist-secondary{padding:0;margin:0;list-style-type:none}.upay-paylist-container.upay-theme-light-gray .upay-paylist-primary li,.upay-paylist-container.upay-theme-light-gray .upay-paylist-secondary li{color:#969696;background:#eee;background:-moz-linear-gradient(top, #eee 0%, #eee 100%);background:-webkit-gradient(linear, left top, left bottom, color-stop(0%, #eee), color-stop(100%, #eee));background:-webkit-linear-gradient(top, #eee 0%, #eee 100%);background:-o-linear-gradient(top, #eee 0%, #eee 100%);background:-ms-linear-gradient(top, #eee 0%, #eee 100%);background:linear-gradient(to bottom, #eee 0%, #eee 100%);border:1px solid #cbcbcb;border-radius:0;-webkit-border-radius:0;-moz-border-radius:0;padding:7px 20px;margin:0;-webkit-box-shadow:inset 0px 0px 6px 2px #eee;box-shadow:inset 0px 0px 6px 2px #eee;cursor:pointer;cursor:hand}.upay-paylist-container.upay-theme-light-gray .upay-paylist-primary li:hover,.upay-paylist-container.upay-theme-light-gray .upay-paylist-secondary li:hover{color:#4b4b4b}.upay-paylist-container.upay-theme-light-gray .upay-paylist-logo{display:inline}.upay-paylist-container.upay-theme-light-gray .upay-paylist-logo img{vertical-align:middle}.upay-paylist-container.upay-theme-light-gray .upay-paylist-desc{display:inline;padding:0 0 0 5px;margin:0;vertical-align:middle}.upay-paylist-container.upay-theme-light-gray.vertical .upay-paylist-primary li,.upay-paylist-container.upay-theme-light-gray.vertical .upay-paylist-secondary li{border-right:none;border-left:none;border-top:none}.upay-paylist-container.upay-theme-light-gray.vertical .upay-paylist-primary li:first-child{border-top:1px solid #cbcbcb}.upay-paylist-container.upay-theme-light-gray.horizontal{width:99%;padding-bottom:40px;display:inline-block;position:relative}.upay-paylist-container.upay-theme-light-gray.horizontal .upay-paylist-primary li,.upay-paylist-container.upay-theme-light-gray.horizontal .upay-paylist-secondary li{border-radius:4px;-webkit-border-radius:4px;-moz-border-radius:4px;display:inline-block;margin:5px;float:left}.upay-paylist-container.upay-theme-light-gray.horizontal .upay-paylist-more{position:absolute;bottom:0;left:0}.upay-paylist-container.upay-theme-light-gray .upay-paylist-primary li,.upay-paylist-container.upay-theme-light-gray .upay-paylist-secondary li{filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#eeeeee', endColorstr='#eeeeee',GradientType=0 )}\n\n.upay_redeem_container.upay_theme_light-gray{-moz-user-select:none;-webkit-user-select:none;font-size:0.85em;color:#000;text-transform:uppercase;display:inline-block;background:#eee;background:-moz-linear-gradient(center top, none, none);background:-webkit-gradient(linear, left top, left bottom, from(none), to(none));background-color:none;border-radius:15px;-moz-border-radius:15px;-webkit-border-radius:15px;border-radius:15px;border:1px #ddd solid;padding:6px 12px;cursor:pointer}.upay_redeem_container.upay_theme_light-gray .upay_redeem_btn{position:relative;display:block;float:left;font-weight:bold;text-align:center;border-left:none;padding:0}.upay_redeem_container.upay_theme_light-gray .upay_redeem_btn a{color:#000;text-decoration:none;font-weight:bold}.upay_redeem_container.upay_theme_light-gray .upay_redeem_loading{width:100%;height:100%;position:absolute;top:0px;left:0px;background:url(//sandbox-static.v.me/s/img/widget/loader.4889784689c1b8109f97a0eecf9265f4.gif) no-repeat center center}\n\n.upay_subscribe_container.upay_theme_light-gray{-moz-user-select:none;-webkit-user-select:none;font-size:0.85em;color:#000;text-transform:uppercase;display:inline-block;background:#eee;background:-moz-linear-gradient(center top, none, none);background:-webkit-gradient(linear, left top, left bottom, from(none), to(none));background-color:none;border-radius:15px;-moz-border-radius:15px;-webkit-border-radius:15px;border-radius:15px;border:1px #ddd solid;padding:6px 12px;cursor:pointer}.upay_subscribe_container.upay_theme_light-gray .upay_subscribe_btn{position:relative;display:block;float:left;font-weight:bold;text-align:center;border-left:none;padding:0}.upay_subscribe_container.upay_theme_light-gray .upay_subscribe_btn a{color:#000;text-decoration:none;font-weight:bold}.upay_subscribe_container.upay_theme_light-gray .upay_subscribe_loading{width:100%;height:100%;position:absolute;top:0px;left:0px;background:url(//sandbox-static.v.me/s/img/widget/loader.4889784689c1b8109f97a0eecf9265f4.gif) no-repeat center center}\n\n.upay_topup_container.upay_theme_light-gray{-moz-user-select:none;-webkit-user-select:none;font-size:0.85em;color:#000;text-transform:uppercase;display:inline-block;background:#eee;background:-moz-linear-gradient(center top, none, none);background:-webkit-gradient(linear, left top, left bottom, from(none), to(none));background-color:none;border-radius:15px;-moz-border-radius:15px;-webkit-border-radius:15px;border-radius:15px;border:1px #ddd solid;padding:6px 12px;cursor:pointer}.upay_topup_container.upay_theme_light-gray .upay_topup_btn{position:relative;display:block;float:left;font-weight:bold;text-align:center;border-left:none;padding:0}.upay_topup_container.upay_theme_light-gray .upay_topup_btn a{color:#000;text-decoration:none;font-weight:bold}\n\n.upay_balance_container.upay_theme_vme{-moz-user-select:none;-webkit-user-select:none;font-size:1.1em;color:#fff;text-transform:uppercase;display:inline-block;background:transparent;background:-moz-linear-gradient(center top, #004dc3, #04a);background:-webkit-gradient(linear, left top, left bottom, from(#004dc3), to(#04a));background-color:#004dc3;border-radius:15px;-moz-border-radius:15px;-webkit-border-radius:15px;border-radius:15px;border:1px #69f solid;padding:0;cursor:pointer}.upay_balance_container.upay_theme_vme .upay_balance_amount{padding:5px 36px 5px 5px;display:block;background:url(//sandbox-static.v.me/s/img/widget/vme/button/balance_arrow.e5986217d03b781bb0f3a25491c53e33.png) no-repeat right center}.upay_balance_container.upay_theme_vme .upay_balance_amount img{float:left}.upay_balance_container.upay_theme_vme .upay_balance_amount div{display:inline-block;padding:1px 0 1px 2px}.upay_balance_container.upay_theme_vme .upay_balance_amount_container{display:block;float:left;color:#fff}\n\n.upay_billing_container.upay_theme_vme{-moz-user-select:none;-webkit-user-select:none;font-size:0.85em;color:#fff;text-transform:uppercase;display:inline-block;background:#3469b9;background:-moz-linear-gradient(center top, #004dc3, #04a);background:-webkit-gradient(linear, left top, left bottom, from(#004dc3), to(#04a));background-color:#004dc3;border-radius:15px;-moz-border-radius:15px;-webkit-border-radius:15px;border-radius:15px;border:1px #69f solid;padding:6px 12px;cursor:pointer}.upay_billing_container.upay_theme_vme .upay_billing_btn{position:relative;display:block;float:left;font-weight:bold;text-align:center;border-left:none;padding:0}.upay_billing_container.upay_theme_vme .upay_billing_btn a{color:#fff;text-decoration:none;font-weight:bold}.upay_billing_container.upay_theme_vme .upay_billing_loading{width:100%;height:100%;position:absolute;top:0px;left:0px;background:url(//sandbox-static.v.me/s/img/widget/loader.4889784689c1b8109f97a0eecf9265f4.gif) no-repeat center center}\n\n.upay-tooltip-content{width:290px;margin:10px;padding:0;font-family:arial}.upay-tooltip-header{background:url(//sandbox-static.v.me/images/v/logo.png?v=1.94) no-repeat scroll left top transparent;width:126px;height:33px;margin:0;padding:0}.upay-tooltip-header span{position:absolute;text-indent:-9999px}.upay-tooltip-title{color:#000;font:bold 9pt arial;padding-top:15px}.upay-tooltip-list{color:#666;padding:0}.upay-tooltip-list li{margin:10px;padding:0;font-size:0.7em}#upay-learn-more:focus{outline:0}.upay-buy-widget.upay-theme-vme{-moz-user-select:none;-webkit-user-select:none;font-size:0.85em;font-weight:bold;color:#fff;text-transform:uppercase;display:inline-block;background:transparent !important;background:-moz-linear-gradient(center top, transparent !important, transparent !important);background:-webkit-gradient(linear, left top, left bottom, from(transparent !important), to(transparent !important));background-color:transparent !important;border-radius:15px;-moz-border-radius:15px;-webkit-border-radius:15px;border-radius:15px;border:1px #ddd solid;padding:0;margin:0;cursor:pointer;position:relative}.upay-buy-widget.upay-theme-vme .upay-buy-label{display:inline-block;padding:5px}.upay-buy-widget.upay-theme-vme .upay-image-currency{vertical-align:middle;margin-top:-3px}.upay-buy-widget.upay-theme-vme .upay-buy-loading{width:45%;height:100%;position:absolute;top:0px;right:0px;display:inline-block;background:url(//sandbox-static.v.me/s/img/widget/loader.4889784689c1b8109f97a0eecf9265f4.gif) no-repeat center center}.upay-buy-widget.upay-theme-vme .upay-buy-amount{padding:5px;border-right:none;display:inline-block;margin-right:-4px}.upay-buy-outer-container{width:151px}.upay-buy-container-image-only{-moz-user-select:none;-webkit-user-select:none;display:inline-block;cursor:pointer;width:151px;height:39px;border:0;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;padding:0;margin:0}.link-1{width:240px}.link-0{width:151px}.upay-vme-link-container-1{float:right;margin:10px 0 5px 15px}.upay-vme-link-container-0{clear:both;text-align:right}.upay-buy-learn-link{font:bold 8.5pt arial;text-decoration:none;color:#0044AA}.upay-buy-learn-link:hover{text-decoration:underline}.upay-buy-container-image-only.upay-vme-checkout{background:url(//sandbox-static.v.me/s/img/widget/vme/button/checkout_with.2327d420889b91cff5c9a33f4234b3eb.png) no-repeat top left !important}.upay-buy-container-image-only.upay-vme-payment{background:url(//sandbox-static.v.me/s/img/widget/vme/button/pay_with.386a8813f984b7fb26a13237c7948ee7.png) no-repeat top left !important}#upay-learn-more-container{position:absolute;background:#FFFFFF;border:1px solid #FFCC33;box-shadow:2px 2px 3px #DDDDDD;padding:0px;margin-left:0}#upay-learn-more-container #upay-learn-more{padding:0px;margin:5px;border:0px}#upay-tip-pointer,.upay-tip-pointer{position:absolute}.upay-left{background:url(//sandbox-static.v.me/s/img/common/vme/notch-left.56c1d9bbcc23f2f79520de69ee00abe2.png) no-repeat scroll left center transparent;height:20px;width:14px}.upay-top{background:url(//sandbox-static.v.me/s/img/common/vme/notch-top.1d8f2eaf35e0acbba69dd3b329002255.png) no-repeat scroll left center transparent;height:14px;width:20px}.upay-lightbox-header-close{float:right;position:relative;padding:5px 5px 0px 5px}.upay-lightbox-header-close .upay-txt{display:none}.upay-lightbox-header-close .upay-button{width:15px;height:15px;background:url(//sandbox-static.v.me/s/img/common/vme/icon_close.fe81ed0936baad1df4b14467f2736a07.gif) no-repeat left center}.upay-vme-custom-checkout-btn-container{display:inline-block;max-width:500px;min-width:234px;position:relative;width:100%}button.upay-vme-custom-checkout-btn::-moz-focus-inner{border:0;padding:0;margin:0}.upay-vme-custom-checkout-btn{background:transparent;border:none;border-image-width:0 0;cursor:pointer;display:table;font-family:helvetica, arial, sans-serif;height:34px;margin:0;padding:0;width:100%}.upay-vme-custom-checkout-btn table{border:0;border-collapse:collapse;border-spacing:0;border-image-width:0 0;height:34px;padding:0;margin:0;width:100%}.upay-vme-custom-checkout-btn table .upay-vme-custom-checkout-btn-ribbon{background:url(//sandbox-static.v.me/s/img/widget/vme/button/checkout_button_sprite.4f59a942af9487b925e8e711f167d492.png) no-repeat 0 -84px;border-spacing:0;border-image-width:0 0;padding:0;margin:0;width:7px;height:34px}.upay-vme-custom-checkout-btn table .upay-vme-custom-checkout-btn-text{background:url(//sandbox-static.v.me/s/img/widget/vme/button/checkout_button_sprite.4f59a942af9487b925e8e711f167d492.png) repeat-x 0 0;border-spacing:0;border-image-width:0 0;color:white;font-size:11px;line-height:34px;padding:0;margin:0;text-shadow:0 -1px 0 navy;text-transform:uppercase}.upay-vme-custom-checkout-btn table .upay-vme-custom-checkout-btn-mark{background:url(//sandbox-static.v.me/s/img/widget/vme/button/checkout_button_sprite.4f59a942af9487b925e8e711f167d492.png) no-repeat 0 -168px;height:34px;border-spacing:0;border-image-width:0 0;font-size:11px;line-height:34px;padding:0;margin:0;text-indent:-9999px;width:116px}.upay-vme-learn-more-link-1 .upay-vme-custom-checkout-btn{padding-right:72px}.upay-vme-learn-more-link-1 .upay-vme-link-container-1{position:absolute;height:34px;top:0;right:0}\n\n.upay_redeem_container.upay_theme_vme{-moz-user-select:none;-webkit-user-select:none;font-size:0.85em;color:#fff;text-transform:uppercase;display:inline-block;background:#3469b9;background:-moz-linear-gradient(center top, #004dc3, #04a);background:-webkit-gradient(linear, left top, left bottom, from(#004dc3), to(#04a));background-color:#004dc3;border-radius:15px;-moz-border-radius:15px;-webkit-border-radius:15px;border-radius:15px;border:1px #69f solid;padding:6px 12px;cursor:pointer}.upay_redeem_container.upay_theme_vme .upay_redeem_btn{position:relative;display:block;float:left;font-weight:bold;text-align:center;border-left:none;padding:0}.upay_redeem_container.upay_theme_vme .upay_redeem_btn a{color:#fff;text-decoration:none;font-weight:bold}.upay_redeem_container.upay_theme_vme .upay_redeem_loading{width:100%;height:100%;position:absolute;top:0px;left:0px;background:url(//sandbox-static.v.me/s/img/widget/loader.4889784689c1b8109f97a0eecf9265f4.gif) no-repeat center center}\n\n.upay_subscribe_container.upay_theme_vme{-moz-user-select:none;-webkit-user-select:none;font-size:0.85em;color:#fff;text-transform:uppercase;display:inline-block;background:#3469b9;background:-moz-linear-gradient(center top, #004dc3, #04a);background:-webkit-gradient(linear, left top, left bottom, from(#004dc3), to(#04a));background-color:#004dc3;border-radius:15px;-moz-border-radius:15px;-webkit-border-radius:15px;border-radius:15px;border:1px #69f solid;padding:6px 12px;cursor:pointer}.upay_subscribe_container.upay_theme_vme .upay_subscribe_btn{position:relative;display:block;float:left;font-weight:bold;text-align:center;border-left:none;padding:0}.upay_subscribe_container.upay_theme_vme .upay_subscribe_btn a{color:#fff;text-decoration:none;font-weight:bold}.upay_subscribe_container.upay_theme_vme .upay_subscribe_loading{width:100%;height:100%;position:absolute;top:0px;left:0px;background:url(//sandbox-static.v.me/s/img/widget/loader.4889784689c1b8109f97a0eecf9265f4.gif) no-repeat center center}\n\n.upay_topup_container.upay_theme_vme{-moz-user-select:none;-webkit-user-select:none;font-size:0.85em;color:#fff;text-transform:uppercase;display:inline-block;background:transparent;background:-moz-linear-gradient(center top, #004dc3, #04a);background:-webkit-gradient(linear, left top, left bottom, from(#004dc3), to(#04a));background-color:#004dc3;border-radius:15px;-moz-border-radius:15px;-webkit-border-radius:15px;border-radius:15px;border:1px #69f solid;padding:6px 12px;cursor:pointer}.upay_topup_container.upay_theme_vme .upay_topup_btn{position:relative;display:block;float:left;font-weight:bold;text-align:center;border-left:none;padding:0}.upay_topup_container.upay_theme_vme .upay_topup_btn a{color:#fff;text-decoration:none;font-weight:bold}\n\n#upay_unsupported{position:absolute;width:600px;left:50%;margin-left:-300px;top:100px;background-color:white;z-index:10}#upay_unsupported a{color:#04a;text-decoration:none}#upay_unsupported a:hover{color:#04a;text-decoration:none}#upay_unsupported .upay-modal-container{background:#525252;color:#222;zoom:1;padding:10px}#upay_unsupported .upay-modal-background{background:#fff}#upay_unsupported .upay-header{height:36px;padding:5px}#upay_unsupported .upay-header-logo{float:left;position:relative}#upay_unsupported .upay-header-logo img{height:36px}#upay_unsupported .upay-header-button{float:right;position:relative;padding:5px}#upay_unsupported .upay-header-close-window-text{display:none}#upay_unsupported .upay-header-close-button{width:25px;height:25px;background:url(https://static.ultimatepay.com/img/payment/default/icon_close.png) no-repeat left center}#upay_unsupported .upay-body{border-top:1px solid #ddd}#upay_unsupported .upay-body-item{background:transparent;border-bottom:1px solid #ddd;position:relative;overflow:hidden}#upay_unsupported .upay-body-item span{display:block;position:relative}#upay_unsupported .upay-body-item-description{font-size:1em;font-weight:bold;height:20px;padding:15px 10px}#upay_unsupported .upay-body-item-description img{padding:2px 5px;float:left}#upay_unsupported .upay-body-item-description .product-desc{line-height:15px;padding-bottom:5px;padding-top:10px}#upay_unsupported .upay-body-item-description .product-sub-desc{font-size:0.75em;font-weight:normal;line-height:6px;margin-left:5px}#upay_unsupported .upay-body-item-price{height:56px;display:inline-block;zoom:1;*display:inline;padding:0;float:right;margin-left:5px}#upay_unsupported .upay-body-item-price .amount{display:inline-block}#upay_unsupported .upay-body-label{border-top:1px solid #fff;clear:both}#upay_unsupported .upay-body-label .message-image{float:left;margin-top:5px;padding-right:6px}#upay_unsupported .upay-body-label .message-content{display:block;float:left;height:27px;padding-top:10px}#upay_unsupported .upay-body-label .message-info{color:#222;background:#eee;padding:0 10px;font-size:.7em;height:37px}#upay_unsupported .upay-body-label .message-prompt{color:#222;background:#fffae6;padding:0 10px;font-size:.7em;font-weight:bold;height:37px}#upay_unsupported .upay-body-label .message-error{color:#c40001;background:#fffae6;padding:6px 12px;font-size:.7em;font-weight:bold;height:auto}#upay_unsupported .expand-list-container{margin-top:20px}#upay_unsupported .titleLogo{padding:5px 5px 0 0;float:left}#upay_unsupported .upay-body-container{text-align:center;padding:30px 0}#upay_unsupported .upay-body-navigation{background:#eee;border-top:1px solid #ddd;padding:3px 4px 5px 0;height:35px}#upay_unsupported .upay-body-navigation a{font-size:.7em;font-weight:bold;margin-left:8px;padding:6px 8px 6px 8px}#upay_unsupported .back_link{float:left;margin-top:3px}#upay_unsupported .lightbox_body_navigation_btn{text-align:right}#upay_unsupported .upay-footer{color:#999;font-size:.62em;padding:4px 0 1px 0;position:relative;background:transparent;height:10px}#upay_unsupported .upay-footer-info{position:relative;display:block;float:left}#upay_unsupported .powered_by{width:106px;height:14px;display:block;background-image:url(https://static.ultimatepay.com/img/payment/default/pb_gray.png)}#upay_unsupported .lightbox_copyright{color:#fff;padding:2px;display:inline-block;vertical-align:top}#upay_unsupported .lightbox_copyright a{color:#fff;text-decoration:none;font-weight:bold}#upay_unsupported .upay-footer-navigation{position:absolute;right:4px;top:8px}#upay_unsupported .upay-footer-navigation ul{padding:0;margin:0}#upay_unsupported .upay-footer-navigation li{padding:0 3px;display:inline-block;border-right:1px #fff solid;line-height:8px;zoom:1;*display:inline}#upay_unsupported .upay-footer-navigation li.help{border:none;padding-right:0}#upay_unsupported .upay-footer-navigation a{color:#fff;text-decoration:none}#mainContainer.upay_unsupport_vme #layout-standard{background:#fff;padding:10px 10px 0 10px;border-radius:6px;-moz-border-radius:6px;-webkit-border-radius:6px}#mainContainer.upay_unsupport_vme .upay-modal-container{background:#006ab9}#mainContainer.upay_unsupport_vme .upay-modal-background{border:1px #d9d9d9 solid;border-radius:6px;-moz-border-radius:6px;-webkit-border-radius:6px;box-shadow:0 0 8px #ccc;-moz-box-shadow:0 0 8px #ccc;-webkit-box-shadow:0 0 8px #ccc;padding:0 24px}#mainContainer.upay_unsupport_vme .upay-header{padding:10px 0 5px 0;height:60px}#mainContainer.upay_unsupport_vme .upay-body{border-top:0 none}#mainContainer.upay_unsupport_vme .titleLogo{float:none}#mainContainer.upay_unsupport_vme .upay-body-container{padding:10px 0 0 0}#mainContainer.upay_unsupport_vme .upay-body-item{border-bottom:none}#mainContainer.upay_unsupport_vme .upay-body-item .upay-body-item-description{padding:4px 0}#mainContainer.upay_unsupport_vme .upay-body-label{border-top:0 none}#mainContainer.upay_unsupport_vme .upay-body-label .message-info{background:transparent;height:35px;padding:0;color:#6d6f71}#mainContainer.upay_unsupport_vme .upay-body-label .message-content{padding:0}#mainContainer.upay_unsupport_vme .upay-body-navigation{background:transparent;padding:25px 0;border-top:0 none}#mainContainer.upay_unsupport_vme .upay-header-button{margin-right:-15px;padding:2px}#mainContainer.upay_unsupport_vme .upay-header-close-button{width:10px;height:10px;background:url(https://static.v.me/img/payment/vme/icon_close.png) no-repeat left center}#mainContainer.upay_unsupport_vme .upay-footer{height:33px;padding:20px 0 7px 0}#mainContainer.upay_unsupport_vme .powered_by{width:136px;height:36px;background-repeat:no-repeat;background-image:url(https://static.v.me/img/payment/vme/logo.png)}#mainContainer.upay_unsupport_vme .upay-footer-navigation{right:0;top:38px}#mainContainer.upay_unsupport_vme .upay-footer-navigation li{border-right:1px #0044aa solid;padding:0px 6px}#mainContainer.upay_unsupport_vme .upay-footer-navigation li.privacy,#mainContainer.upay_unsupport_vme .upay-footer-navigation li.terms{padding-top:3px;padding-bottom:3px}#mainContainer.upay_unsupport_vme .upay-footer-navigation li.help{padding-right:18px;padding-top:3px;padding-bottom:3px}#mainContainer.upay_unsupport_vme .upay-footer-navigation li.secure{background:url(https://static.v.me/img/payment/vme/lock.png) no-repeat top left;padding:3px 0 3px 13px;color:#999;border:none}#mainContainer.upay_unsupport_vme .upay-footer-navigation a{color:#0044aa;text-decoration:none}#mainContainer.upay_unsupport_vme .upay-footer-navigation a:hover{color:#ffa000}\n"
  , ["pkg"]);