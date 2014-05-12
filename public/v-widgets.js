(function () {
  if (!window.name || window.name.indexOf("UPay.XD") != 0 && window.name.indexOf("UPay.PM") != 0) {
    var o = /[&#]+upd=1/.test(window.location.href), u = "/v/1.94/js/1/v-widgets.pkg.js", a = window.location.href.match(/[&#]+upv=([^&]+)/);
    a && a.length == 2 && (u = "/v-" + a[1] + u);
    var f = "sandbox-static.v.me", l = window.location.href.match(/[&#]+uph=([^&]+)/);
    l && l.length == 2 && /\.ultimatepay\.com$/.test(l[1]) && (f = l[1]), o && (u = u.replace("pkg.", "d."));
    var c = document.createElement("script");
    c.async = !0, c.src = document.location.protocol + "//" + f + u, document.getElementsByTagName("head")[0].appendChild(c), (new Image).src = "//sandbox-static.v.me/s/img/widget/vme/button/pay_with.386a8813f984b7fb26a13237c7948ee7.png", (new Image).src = "//sandbox-static.v.me/s/img/widget/vme/button/checkout_with.2327d420889b91cff5c9a33f4234b3eb.png"
  } else {
    var e = decodeURIComponent(window.name), t = e.indexOf("-"), n = e.substr(0, t).split("."), r = e.substr(t + 1), i = window.parent.parent, s;
    for (s = 0; s < n.length; s++)i = i[n[s]];
    i && i(r)
  }
})();