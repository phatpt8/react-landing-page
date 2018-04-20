export default function animate() {
  function a() {
      this.originX = 0,
      this.originY = 0,
      this.currentX = 0,
      this.currentY = 0,
      this.rotation = 0,
      this.force = 0,
      this.z = 0,
      this.moveX = 0,
      this.moveY = 0,
      this.moveRotation = 0,
      this.videoX = 0,
      this.videoY = 0
  }
  function b() {
      if (l = document.getElementById("source"),
      l && l.getContext) {
          k = l.getContext("2d");
          var a = document.getElementById("output");
          m = a.getContext("2d"),
          c()
      }
  }
  function c() {
      var a = new Image;
      a.onload = function() {
          a.onload = null,
          k.drawImage(a, 0, 0),
          e(),
          window.requestAnimationFrame(d),
          document.getElementById("output").onmousedown = function(a) {
              f(a, this)
          }
      }
      ,
      a.src = n
  }
  function d() {
      m.clearRect(t.x, t.y, t.width, t.height);
      for (var a = 0; a < v.length; a++) {
          var b = v[a];
          if (b.force > 1e-4)
              b.moveX *= b.force,
              b.moveY *= b.force,
              b.moveRotation *= b.force,
              b.currentX += b.moveX,
              b.currentY += b.moveY,
              b.rotation += b.moveRotation,
              b.rotation %= 360,
              b.force *= .81,
              (b.currentX <= 0 || b.currentX >= t.width) && (b.moveX *= -1),
              (b.currentY <= 0 || b.currentY >= t.height) && (b.moveY *= -1);
          else if (0 != b.rotation || b.currentX != b.originX || b.currentY != b.originY) {
              var c = .2 * (b.originX - b.currentX)
                , e = .2 * (b.originY - b.currentY)
                , f = .2 * (0 - b.rotation);
              Math.abs(c) < .5 ? b.currentX = b.originX : b.currentX += c,
              Math.abs(e) < .5 ? b.currentY = b.originY : b.currentY += e,
              Math.abs(f) < .5 ? b.rotation = 0 : b.rotation += f
          } else
              b.force = 0;
          m.save(),
          m.translate(b.currentX, b.currentY),
          m.rotate(b.rotation * u),
          m.drawImage(l, b.videoX, b.videoY, o, p, -q, -r, o, p),
          m.restore()
      }
      window.requestAnimationFrame(d)
  }
  function e() {
      for (var b = q + (t.width - s.width) / 2, c = r + (t.height - s.height) / 2, d = 0; d < s.height; ) {
          for (var e = 0; e < s.width; ) {
              var f = new a;
              f.videoX = e,
              f.videoY = d,
              f.originX = b + e,
              f.originY = c + d,
              f.currentX = f.originX,
              f.currentY = f.originY,
              v.push(f),
              e += o
          }
          d += p
      }
  }
  function f(a, b) {
      var c = 0
        , d = 0
        , e = a || window.event;
      e.pageX || e.pageY ? (c = e.pageX,
      d = e.pageY) : (e.clientX || e.clientY) && (c = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
      d = e.clientY + document.body.scrollTop + document.documentElement.scrollTop);
      var f = c - h(b)
        , j = d - g(b);
      i(f, j)
  }
  function g(a) {
      var b = a.offsetTop;
      return null != a.offsetParent && (b += g(a.offsetParent)),
      b
  }
  function h(a) {
      var b = a.offsetLeft;
      return null != a.offsetParent && (b += h(a.offsetParent)),
      b
  }
  function i(a, b) {
      for (var c = 0; c < v.length; c++) {
          var e = v[c]
            , f = e.currentX - a
            , g = e.currentY - b
            , h = Math.sqrt(f * f + g * g)
            , i = 220 + 30 * Math.random()
            , k = i - h
            , l = 3 * (k / i);
          if (l > e.force) {
              e.force = l;
              var m = Math.atan2(g, f);
              e.moveX = Math.cos(m),
              e.moveY = Math.sin(m),
              e.moveRotation = .5 - Math.random()
          }
      }
      v.sort(j),
      d()
  }
  function j(a, b) {
      return a.force - b.force
  }
  !function() {
      for (var a = 0, b = ["ms", "moz", "webkit", "o"], c = 0; c < b.length && !window.requestAnimationFrame; ++c)
          window.requestAnimationFrame = window[b[c] + "RequestAnimationFrame"],
          window.cancelAnimationFrame = window[b[c] + "CancelAnimationFrame"] || window[b[c] + "CancelRequestAnimationFrame"];
      window.requestAnimationFrame || (window.requestAnimationFrame = function(b) {
          var c = (new Date).getTime()
            , d = Math.max(0, 16 - (c - a))
            , e = window.setTimeout(function() {
              b(c + d)
          }, d);
          return a = c + d,
          e
      }
      ),
      window.cancelAnimationFrame || (window.cancelAnimationFrame = function(a) {
          clearTimeout(a)
      }
      )
  }();
  var k, l, m, n = document.getElementById("sourceimg").src, o = 21, p = 15, q = 10.5, r = 7.5, s = {
      x: 0,
      y: 0,
      width: 510,
      height: 340
  }, t = {
      x: 0,
      y: 0,
      width: 700,
      height: 500
  }, u = Math.PI / 180, v = [];
  b()
};
