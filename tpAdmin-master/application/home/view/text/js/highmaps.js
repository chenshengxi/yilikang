/*
 Highmaps JS v5.0.10 (2017-03-31)
 
 (c) 2011-2016 Torstein Honsi
 
 License: www.highcharts.com/license
*/
(function (J, a) {
    "object" === typeof module && module.exports ? module.exports = J.document ? a(J) : a : J.Highcharts = a(J)
})("undefined" !== typeof window ? window : this, function (J) {
    J = function () {
        var a = window,
            z = a.document,
            F = a.navigator && a.navigator.userAgent || "",
            D = z && z.createElementNS && !! z.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
            B = /(edge|msie|trident)/i.test(F) && !window.opera,
            f = !D,
            h = /Firefox/.test(F),
            t = h && 4 > parseInt(F.split("Firefox/")[1], 10);
        return a.Highcharts ? a.Highcharts.error(16, !0) : {
            product: "Highmaps",
            version: "5.0.10",
            deg2rad: 2 * Math.PI / 360,
            doc: z,
            hasBidiBug: t,
            hasTouch: z && void 0 !== z.documentElement.ontouchstart,
            isMS: B,
            isWebKit: /AppleWebKit/.test(F),
            isFirefox: h,
            isTouchDevice: /(Mobile|Android|Windows Phone)/.test(F),
            SVG_NS: "http://www.w3.org/2000/svg",
            chartCount: 0,
            seriesTypes: {},
            symbolSizes: {},
            svg: D,
            vml: f,
            win: a,
            charts: [],
            marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"],
            noop: function () {}
        }
    }();
    (function (a) {
        var z = [],
            F = a.charts,
            D = a.doc,
            B = a.win;
        a.error = function (f, h) {
            f = a.isNumber(f) ? "Highcharts error #" +
                f + ": www.highcharts.com/errors/" + f : f;
            if (h) throw Error(f);
            B.console && console.log(f)
        };
        a.Fx = function (a, h, t) {
            this.options = h;
            this.elem = a;
            this.prop = t
        };
        a.Fx.prototype = {
            dSetter: function () {
                var a = this.paths[0],
                    h = this.paths[1],
                    t = [],
                    r = this.now,
                    m = a.length,
                    d;
                if (1 === r) t = this.toD;
                else if (m === h.length && 1 > r) for (; m--;) d = parseFloat(a[m]), t[m] = isNaN(d) ? a[m] : r *
                            parseFloat(h[m] - d) + d;
                else t = h;
                this.elem.attr("d", t, null, !0)
            },
            update: function () {
                var a = this.elem,
                    h = this.prop,
                    t = this.now,
                    r = this.options.step;
                if (this[h + "Setter"]) this[h +
                        "Setter"]();
                else a.attr ? a.element && a.attr(h, t, null, !0) : a.style[h] = t + this.unit;
                r && r.call(a, t, this)
            },
            run: function (a, h, t) {
                var f = this,
                    m = function (a) {
                        return m.stopped ? !1 : f.step(a)
                    }, d;
                this.startTime = +new Date;
                this.start = a;
                this.end = h;
                this.unit = t;
                this.now = this.start;
                this.pos = 0;
                m.elem = this.elem;
                m.prop = this.prop;
                m() && 1 === z.push(m) && (m.timerId = setInterval(function () {
                    for (d = 0; d < z.length; d++) z[d]() || z.splice(d--, 1);
                    z.length || clearInterval(m.timerId)
                }, 13))
            },
            step: function (a) {
                var f = +new Date,
                    t, r = this.options;
                t = this.elem;
                var m = r.complete,
                    d = r.duration,
                    g = r.curAnim,
                    n;
                if (t.attr && !t.element) t = !1;
                else if (a || f >= d + this.startTime) {
                    this.now = this.end;
                    this.pos = 1;
                    this.update();
                    a = g[this.prop] = !0;
                    for (n in g)!0 !== g[n] && (a = !1);
                    a && m && m.call(t);
                    t = !1
                } else this.pos = r.easing((f - this.startTime) / d), this.now = this.start + (this.end - this.start) *
                        this.pos, this.update(), t = !0;
                return t
            },
            initPath: function (f, h, t) {
                function r(a) {
                    var b, e;
                    for (c = a.length; c--;) b = "M" === a[c] || "L" === a[c], e = /[a-zA-Z]/.test(a[c + 3]), b && e &&
                            a.splice(c + 1, 0, a[c + 1], a[c + 2], a[c + 1], a[c +
                            2])
                }
                function m(a, e) {
                    for (; a.length < l;) {
                        a[0] = e[l - a.length];
                        var q = a.slice(0, b);
                        [].splice.apply(a, [0, 0].concat(q));
                        E && (q = a.slice(a.length - b), [].splice.apply(a, [a.length, 0].concat(q)), c--)
                    }
                    a[0] = "M"
                }
                function d(a, c) {
                    for (var q = (l - a.length) / b; 0 < q && q--;) e = a.slice().splice(a.length / u - b, b * u), e[0] =
                            c[l - b - q * b], w && (e[b - 6] = e[b - 2], e[b - 5] = e[b - 1]), [].splice.apply(a, [a.length /
                                u, 0].concat(e)), E && q--
                }
                h = h || "";
                var g, n = f.startX,
                    y = f.endX,
                    w = -1 < h.indexOf("C"),
                    b = w ? 7 : 3,
                    l, e, c;
                h = h.split(" ");
                t = t.slice();
                var E = f.isArea,
                    u = E ? 2 : 1,
                    q;
                w && (r(h), r(t));
                if (n && y) {
                    for (c = 0; c < n.length; c++) if (n[c] === y[0]) {
                            g = c;
                            break
                        } else if (n[0] === y[y.length - n.length + c]) {
                        g = c;
                        q = !0;
                        break
                    }
                    void 0 === g && (h = [])
                }
                h.length && a.isNumber(g) && (l = t.length + g * u * b, q ? (m(h, t), d(t, h)) : (m(t, h), d(h, t)));
                return [h, t]
            }
        };
        a.extend = function (a, h) {
            var f;
            a || (a = {});
            for (f in h) a[f] = h[f];
            return a
        };
        a.merge = function () {
            var f, h = arguments,
                t, r = {}, m = function (d, g) {
                    var n, f;
                    "object" !== typeof d && (d = {});
                    for (f in g) g.hasOwnProperty(f) && (n = g[f], a.isObject(n, !0) && "renderTo" !== f && "number" !==
                            typeof n.nodeType ?
                            d[f] = m(d[f] || {}, n) : d[f] = g[f]);
                    return d
                };
            !0 === h[0] && (r = h[1], h = Array.prototype.slice.call(h, 2));
            t = h.length;
            for (f = 0; f < t; f++) r = m(r, h[f]);
            return r
        };
        a.pInt = function (a, h) {
            return parseInt(a, h || 10)
        };
        a.isString = function (a) {
            return "string" === typeof a
        };
        a.isArray = function (a) {
            a = Object.prototype.toString.call(a);
            return "[object Array]" === a || "[object Array Iterator]" === a
        };
        a.isObject = function (f, h) {
            return f && "object" === typeof f && (!h || !a.isArray(f))
        };
        a.isNumber = function (a) {
            return "number" === typeof a && !isNaN(a)
        };
        a.erase = function (a, h) {
            for (var f = a.length; f--;) if (a[f] === h) {
                    a.splice(f, 1);
                    break
                }
        };
        a.defined = function (a) {
            return void 0 !== a && null !== a
        };
        a.attr = function (f, h, t) {
            var r, m;
            if (a.isString(h)) a.defined(t) ? f.setAttribute(h, t) : f && f.getAttribute && (m = f.getAttribute(h));
            else if (a.defined(h) && a.isObject(h)) for (r in h) f.setAttribute(r, h[r]);
            return m
        };
        a.splat = function (f) {
            return a.isArray(f) ? f : [f]
        };
        a.syncTimeout = function (a, h, t) {
            if (h) return setTimeout(a, h, t);
            a.call(0, t)
        };
        a.pick = function () {
            var a = arguments,
                h, t, r = a.length;
            for (h =
                0; h < r; h++) if (t = a[h], void 0 !== t && null !== t) return t
        };
        a.css = function (f, h) {
            a.isMS && !a.svg && h && void 0 !== h.opacity && (h.filter = "alpha(opacity\x3d" + 100 * h.opacity + ")");
            a.extend(f.style, h)
        };
        a.createElement = function (f, h, t, r, m) {
            f = D.createElement(f);
            var d = a.css;
            h && a.extend(f, h);
            m && d(f, {
                padding: 0,
                border: "none",
                margin: 0
            });
            t && d(f, t);
            r && r.appendChild(f);
            return f
        };
        a.extendClass = function (f, h) {
            var t = function () {};
            t.prototype = new f;
            a.extend(t.prototype, h);
            return t
        };
        a.pad = function (a, h, t) {
            return Array((h || 2) + 1 - String(a).length).join(t ||
                0) + a
        };
        a.relativeLength = function (a, h) {
            return /%$/.test(a) ? h * parseFloat(a) / 100 : parseFloat(a)
        };
        a.wrap = function (a, h, t) {
            var f = a[h];
            a[h] = function () {
                var a = Array.prototype.slice.call(arguments),
                    d = arguments,
                    g = this;
                g.proceed = function () {
                    f.apply(g, arguments.length ? arguments : d)
                };
                a.unshift(f);
                a = t.apply(this, a);
                g.proceed = null;
                return a
            }
        };
        a.getTZOffset = function (f) {
            var h = a.Date;
            return 6E4 * (h.hcGetTimezoneOffset && h.hcGetTimezoneOffset(f) || h.hcTimezoneOffset || 0)
        };
        a.dateFormat = function (f, h, t) {
            if (!a.defined(h) || isNaN(h)) return a.defaultOptions.lang.invalidDate ||
                    "";
            f = a.pick(f, "%Y-%m-%d %H:%M:%S");
            var r = a.Date,
                m = new r(h - a.getTZOffset(h)),
                d, g = m[r.hcGetHours](),
                n = m[r.hcGetDay](),
                y = m[r.hcGetDate](),
                w = m[r.hcGetMonth](),
                b = m[r.hcGetFullYear](),
                l = a.defaultOptions.lang,
                e = l.weekdays,
                c = l.shortWeekdays,
                E = a.pad,
                r = a.extend({
                    a: c ? c[n] : e[n].substr(0, 3),
                    A: e[n],
                    d: E(y),
                    e: E(y, 2, " "),
                    w: n,
                    b: l.shortMonths[w],
                    B: l.months[w],
                    m: E(w + 1),
                    y: b.toString().substr(2, 2),
                    Y: b,
                    H: E(g),
                    k: g,
                    I: E(g % 12 || 12),
                    l: g % 12 || 12,
                    M: E(m[r.hcGetMinutes]()),
                    p: 12 > g ? "AM" : "PM",
                    P: 12 > g ? "am" : "pm",
                    S: E(m.getSeconds()),
                    L: E(Math.round(h %
                        1E3), 3)
                }, a.dateFormats);
            for (d in r) for (; - 1 !== f.indexOf("%" + d);) f = f.replace("%" + d, "function" === typeof r[d] ? r[d](h) :
                        r[d]);
            return t ? f.substr(0, 1).toUpperCase() + f.substr(1) : f
        };
        a.formatSingle = function (f, h) {
            var t = /\.([0-9])/,
                r = a.defaultOptions.lang;
            /f$/.test(f) ? (t = (t = f.match(t)) ? t[1] : -1, null !== h && (h = a.numberFormat(h, t, r.decimalPoint, -
                1 < f.indexOf(",") ? r.thousandsSep : ""))) : h = a.dateFormat(f, h);
            return h
        };
        a.format = function (f, h) {
            for (var t = "{", r = !1, m, d, g, n, y = [], w; f;) {
                t = f.indexOf(t);
                if (-1 === t) break;
                m = f.slice(0,
                    t);
                if (r) {
                    m = m.split(":");
                    d = m.shift().split(".");
                    n = d.length;
                    w = h;
                    for (g = 0; g < n; g++) w = w[d[g]];
                    m.length && (w = a.formatSingle(m.join(":"), w));
                    y.push(w)
                } else y.push(m);
                f = f.slice(t + 1);
                t = (r = !r) ? "}" : "{"
            }
            y.push(f);
            return y.join("")
        };
        a.getMagnitude = function (a) {
            return Math.pow(10, Math.floor(Math.log(a) / Math.LN10))
        };
        a.normalizeTickInterval = function (f, h, t, r, m) {
            var d, g = f;
            t = a.pick(t, 1);
            d = f / t;
            h || (h = m ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === r && (1 === t ? h = a.grep(
                h, function (a) {
                return 0 === a % 1
            }) : .1 >= t && (h = [1 / t])));
            for (r = 0; r < h.length && !(g = h[r], m && g * t >= f || !m && d <= (h[r] + (h[r + 1] || h[r])) / 2); r++);
            return g = a.correctFloat(g * t, -Math.round(Math.log(.001) / Math.LN10))
        };
        a.stableSort = function (a, h) {
            var f = a.length,
                r, m;
            for (m = 0; m < f; m++) a[m].safeI = m;
            a.sort(function (a, g) {
                r = h(a, g);
                return 0 === r ? a.safeI - g.safeI : r
            });
            for (m = 0; m < f; m++) delete a[m].safeI
        };
        a.arrayMin = function (a) {
            for (var h = a.length, f = a[0]; h--;) a[h] < f && (f = a[h]);
            return f
        };
        a.arrayMax = function (a) {
            for (var h = a.length, f = a[0]; h--;) a[h] > f && (f = a[h]);
            return f
        };
        a.destroyObjectProperties = function (a, h) {
            for (var f in a) a[f] && a[f] !== h && a[f].destroy && a[f].destroy(), delete a[f]
        };
        a.discardElement = function (f) {
            var h = a.garbageBin;
            h || (h = a.createElement("div"));
            f && h.appendChild(f);
            h.innerHTML = ""
        };
        a.correctFloat = function (a, h) {
            return parseFloat(a.toPrecision(h || 14))
        };
        a.setAnimation = function (f, h) {
            h.renderer.globalAnimation = a.pick(f, h.options.chart.animation, !0)
        };
        a.animObject = function (f) {
            return a.isObject(f) ? a.merge(f) : {
                duration: f ? 500 : 0
            }
        };
        a.timeUnits = {
            millisecond: 1,
            second: 1E3,
            minute: 6E4,
            hour: 36E5,
            day: 864E5,
            week: 6048E5,
            month: 24192E5,
            year: 314496E5
        };
        a.numberFormat = function (f, h, t, r) {
            f = +f || 0;
            h = +h;
            var m = a.defaultOptions.lang,
                d = (f.toString().split(".")[1] || "").length,
                g, n; - 1 === h ? h = Math.min(d, 20) : a.isNumber(h) || (h = 2);
            n = (Math.abs(f) + Math.pow(10, -Math.max(h, d) - 1)).toFixed(h);
            d = String(a.pInt(n));
            g = 3 < d.length ? d.length % 3 : 0;
            t = a.pick(t, m.decimalPoint);
            r = a.pick(r, m.thousandsSep);
            f = (0 > f ? "-" : "") + (g ? d.substr(0, g) + r : "");
            f += d.substr(g).replace(/(\d{3})(?=\d)/g, "$1" + r);
            h && (f += t + n.slice(-h));
            return f
        };
        Math.easeInOutSine = function (a) {
            return -.5 * (Math.cos(Math.PI * a) - 1)
        };
        a.getStyle = function (f, h) {
            return "width" === h ? Math.min(f.offsetWidth, f.scrollWidth) - a.getStyle(f, "padding-left") - a.getStyle(
                f, "padding-right") : "height" === h ? Math.min(f.offsetHeight, f.scrollHeight) - a.getStyle(f,
                "padding-top") - a.getStyle(f, "padding-bottom") : (f = B.getComputedStyle(f, void 0)) && a.pInt(f.getPropertyValue(
                h))
        };
        a.inArray = function (a, h) {
            return h.indexOf ? h.indexOf(a) : [].indexOf.call(h, a)
        };
        a.grep = function (a, h) {
            return [].filter.call(a, h)
        };
        a.find = function (a,
            h) {
            return [].find.call(a, h)
        };
        a.map = function (a, h) {
            for (var f = [], r = 0, m = a.length; r < m; r++) f[r] = h.call(a[r], a[r], r, a);
            return f
        };
        a.offset = function (a) {
            var h = D.documentElement;
            a = a.getBoundingClientRect();
            return {
                top: a.top + (B.pageYOffset || h.scrollTop) - (h.clientTop || 0),
                left: a.left + (B.pageXOffset || h.scrollLeft) - (h.clientLeft || 0)
            }
        };
        a.stop = function (a, h) {
            for (var f = z.length; f--;) z[f].elem !== a || h && h !== z[f].prop || (z[f].stopped = !0)
        };
        a.each = function (a, h, t) {
            return Array.prototype.forEach.call(a, h, t)
        };
        a.addEvent = function (f,
            h, t) {
            function r(a) {
                a.target = a.srcElement || B;
                t.call(f, a)
            }
            var m = f.hcEvents = f.hcEvents || {};
            f.addEventListener ? f.addEventListener(h, t, !1) : f.attachEvent && (f.hcEventsIE || (f.hcEventsIE = {}),
                f.hcEventsIE[t.toString()] = r, f.attachEvent("on" + h, r));
            m[h] || (m[h] = []);
            m[h].push(t);
            return function () {
                a.removeEvent(f, h, t)
            }
        };
        a.removeEvent = function (f, h, t) {
            function r(a, g) {
                f.removeEventListener ? f.removeEventListener(a, g, !1) : f.attachEvent && (g = f.hcEventsIE[g.toString()],
                    f.detachEvent("on" + a, g))
            }
            function m() {
                var a, d;
                if (f.nodeName) for (d in h ?
                        (a = {}, a[h] = !0) : a = g, a) if (g[d]) for (a = g[d].length; a--;) r(d, g[d][a])
            }
            var d, g = f.hcEvents,
                n;
            g && (h ? (d = g[h] || [], t ? (n = a.inArray(t, d), -1 < n && (d.splice(n, 1), g[h] = d), r(h, t)) : (m(),
                g[h] = [])) : (m(), f.hcEvents = {}))
        };
        a.fireEvent = function (f, h, t, r) {
            var m;
            m = f.hcEvents;
            var d, g;
            t = t || {};
            if (D.createEvent && (f.dispatchEvent || f.fireEvent)) m = D.createEvent("Events"), m.initEvent(h, !0, !0),
                    a.extend(m, t), f.dispatchEvent ? f.dispatchEvent(m) : f.fireEvent(h, m);
            else if (m) for (m = m[h] || [], d = m.length, t.target || a.extend(t, {
                    preventDefault: function () {
                        t.defaultPrevented = !0
                    },
                    target: f,
                    type: h
                }), h = 0; h < d; h++)(g = m[h]) && !1 === g.call(f, t) && t.preventDefault();
            r && !t.defaultPrevented && r(t)
        };
        a.animate = function (f, h, t) {
            var r, m = "",
                d, g, n;
            a.isObject(t) || (r = arguments, t = {
                duration: r[2],
                easing: r[3],
                complete: r[4]
            });
            a.isNumber(t.duration) || (t.duration = 400);
            t.easing = "function" === typeof t.easing ? t.easing : Math[t.easing] || Math.easeInOutSine;
            t.curAnim = a.merge(h);
            for (n in h) a.stop(f, n), g = new a.Fx(f, t, n), d = null, "d" === n ? (g.paths = g.initPath(f, f.d, h.d),
                    g.toD = h.d, r = 0, d = 1) : f.attr ? r = f.attr(n) : (r = parseFloat(a.getStyle(f,
                    n)) || 0, "opacity" !== n && (m = "px")), d || (d = h[n]), d && d.match && d.match("px") && (d = d.replace(
                    /px/g, "")), g.run(r, d, m)
        };
        a.seriesType = function (f, h, t, r, m) {
            var d = a.getOptions(),
                g = a.seriesTypes;
            d.plotOptions[f] = a.merge(d.plotOptions[h], t);
            g[f] = a.extendClass(g[h] || function () {}, r);
            g[f].prototype.type = f;
            m && (g[f].prototype.pointClass = a.extendClass(a.Point, m));
            return g[f]
        };
        a.uniqueKey = function () {
            var a = Math.random().toString(36).substring(2, 9),
                h = 0;
            return function () {
                return "highcharts-" + a + "-" + h++
            }
        }();
        B.jQuery && (B.jQuery.fn.highcharts = function () {
            var f = [].slice.call(arguments);
            if (this[0]) return f[0] ? (new(a[a.isString(f[0]) ? f.shift() : "Chart"])(this[0], f[0], f[1]), this) : F[
                    a.attr(this[0], "data-highcharts-chart")]
        });
        D && !D.defaultView && (a.getStyle = function (f, h) {
            var t = {
                width: "clientWidth",
                height: "clientHeight"
            }[h];
            if (f.style[h]) return a.pInt(f.style[h]);
            "opacity" === h && (h = "filter");
            if (t) return f.style.zoom = 1, Math.max(f[t] - 2 * a.getStyle(f, "padding"), 0);
            f = f.currentStyle[h.replace(/\-(\w)/g, function (a, m) {
                return m.toUpperCase()
            })];
            "filter" ===
                h && (f = f.replace(/alpha\(opacity=([0-9]+)\)/, function (a, m) {
                return m / 100
            }));
            return "" === f ? 1 : a.pInt(f)
        });
        Array.prototype.forEach || (a.each = function (a, h, t) {
            for (var f = 0, m = a.length; f < m; f++) if (!1 === h.call(t, a[f], f, a)) return f
        });
        Array.prototype.indexOf || (a.inArray = function (a, h) {
            var f, r = 0;
            if (h) for (f = h.length; r < f; r++) if (h[r] === a) return r;
            return -1
        });
        Array.prototype.filter || (a.grep = function (a, h) {
            for (var f = [], r = 0, m = a.length; r < m; r++) h(a[r], r) && f.push(a[r]);
            return f
        });
        Array.prototype.find || (a.find = function (a, h) {
            var f,
                r = a.length;
            for (f = 0; f < r; f++) if (h(a[f], f)) return a[f]
        })
    })(J);
    (function (a) {
        var z = a.each,
            F = a.isNumber,
            D = a.map,
            B = a.merge,
            f = a.pInt;
        a.Color = function (h) {
            if (!(this instanceof a.Color)) return new a.Color(h);
            this.init(h)
        };
        a.Color.prototype = {
            parsers: [{
                    regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                    parse: function (a) {
                        return [f(a[1]), f(a[2]), f(a[3]), parseFloat(a[4], 10)]
                    }
                }, {
                    regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
                    parse: function (a) {
                        return [f(a[1]),
                            f(a[2]), f(a[3]), 1]
                    }
                }],
            names: {
                white: "#ffffff",
                black: "#000000"
            },
            init: function (h) {
                var f, r, m, d;
                if ((this.input = h = this.names[h && h.toLowerCase ? h.toLowerCase() : ""] || h) && h.stops) this.stops =
                        D(h.stops, function (g) {
                        return new a.Color(g[1])
                    });
                else if (h && "#" === h[0] && (f = h.length, h = parseInt(h.substr(1), 16), 7 === f ? r = [(h &
                        16711680) >> 16, (h & 65280) >> 8, h & 255, 1] : 4 === f && (r = [(h & 3840) >> 4 | (h & 3840) >>
                        8, (h & 240) >> 4 | h & 240, (h & 15) << 4 | h & 15, 1])), !r) for (m = this.parsers.length; m-- && !
                        r;) d = this.parsers[m], (f = d.regex.exec(h)) && (r = d.parse(f));
                this.rgba = r || []
            },
            get: function (a) {
                var h = this.input,
                    f = this.rgba,
                    m;
                this.stops ? (m = B(h), m.stops = [].concat(m.stops), z(this.stops, function (d, g) {
                    m.stops[g] = [m.stops[g][0], d.get(a)]
                })) : m = f && F(f[0]) ? "rgb" === a || !a && 1 === f[3] ? "rgb(" + f[0] + "," + f[1] + "," + f[2] +
                    ")" : "a" === a ? f[3] : "rgba(" + f.join(",") + ")" : h;
                return m
            },
            brighten: function (a) {
                var h, r = this.rgba;
                if (this.stops) z(this.stops, function (m) {
                        m.brighten(a)
                    });
                else if (F(a) && 0 !== a) for (h = 0; 3 > h; h++) r[h] += f(255 * a), 0 > r[h] && (r[h] = 0), 255 < r[h] &&
                            (r[h] = 255);
                return this
            },
            setOpacity: function (a) {
                this.rgba[3] =
                    a;
                return this
            }
        };
        a.color = function (f) {
            return new a.Color(f)
        }
    })(J);
    (function (a) {
        function z() {
            var m = a.defaultOptions.global,
                d = r.moment;
            if (m.timezone) {
                if (d) return function (a) {
                        return -d.tz(a, m.timezone).utcOffset()
                };
                a.error(25)
            }
            return m.useUTC && m.getTimezoneOffset
        }
        function F() {
            var m = a.defaultOptions.global,
                d, g = m.useUTC,
                n = g ? "getUTC" : "get",
                h = g ? "setUTC" : "set";
            a.Date = d = m.Date || r.Date;
            d.hcTimezoneOffset = g && m.timezoneOffset;
            d.hcGetTimezoneOffset = z();
            d.hcMakeTime = function (a, b, l, e, c, n) {
                var u;
                g ? (u = d.UTC.apply(0,
                    arguments), u += f(u)) : u = (new d(a, b, t(l, 1), t(e, 0), t(c, 0), t(n, 0))).getTime();
                return u
            };
            B("Minutes Hours Day Date Month FullYear".split(" "), function (a) {
                d["hcGet" + a] = n + a
            });
            B("Milliseconds Seconds Minutes Hours Date Month FullYear".split(" "), function (a) {
                d["hcSet" + a] = h + a
            })
        }
        var D = a.color,
            B = a.each,
            f = a.getTZOffset,
            h = a.merge,
            t = a.pick,
            r = a.win;
        a.defaultOptions = {
            colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
            symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
            lang: {
                loading: "Loading...",
                months: "January February March April May June July August September October November December".split(
                    " "),
                shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                decimalPoint: ".",
                numericSymbols: "kMGTPE".split(""),
                resetZoom: "Reset zoom",
                resetZoomTitle: "Reset zoom level 1:1",
                thousandsSep: " "
            },
            global: {
                useUTC: !0,
                VMLRadialGradientURL: "http://code.highcharts.com/5.0.10/gfx/vml-radial-gradient.png"
            },
            chart: {
                borderRadius: 0,
                defaultSeriesType: "line",
                ignoreHiddenSeries: !0,
                spacing: [10, 10, 15, 10],
                resetZoomButton: {
                    theme: {
                        zIndex: 20
                    },
                    position: {
                        align: "right",
                        x: -10,
                        y: 10
                    }
                },
                width: null,
                height: null,
                borderColor: "#335cad",
                backgroundColor: "#ffffff",
                plotBorderColor: "#cccccc"
            },
            title: {
                text: "Chart title",
                align: "center",
                margin: 15,
                widthAdjust: -44
            },
            subtitle: {
                text: "",
                align: "center",
                widthAdjust: -44
            },
            plotOptions: {},
            labels: {
                style: {
                    position: "absolute",
                    color: "#333333"
                }
            },
            legend: {
                enabled: !0,
                align: "center",
                layout: "horizontal",
                labelFormatter: function () {
                    return this.name
                },
                borderColor: "#999999",
                borderRadius: 0,
                navigation: {
                    activeColor: "#003399",
                    inactiveColor: "#cccccc"
                },
                itemStyle: {
                    color: "#333333",
                    fontSize: "12px",
                    fontWeight: "bold"
                },
                itemHoverStyle: {
                    color: "#000000"
                },
                itemHiddenStyle: {
                    color: "#cccccc"
                },
                shadow: !1,
                itemCheckboxStyle: {
                    position: "absolute",
                    width: "13px",
                    height: "13px"
                },
                squareSymbol: !0,
                symbolPadding: 5,
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                title: {
                    style: {
                        fontWeight: "bold"
                    }
                }
            },
            loading: {
                labelStyle: {
                    fontWeight: "bold",
                    position: "relative",
                    top: "45%"
                },
                style: {
                    position: "absolute",
                    backgroundColor: "#ffffff",
                    opacity: .5,
                    textAlign: "center"
                }
            },
            tooltip: {
                enabled: !0,
                animation: a.svg,
                borderRadius: 3,
                dateTimeLabelFormats: {
                    millisecond: "%A, %b %e, %H:%M:%S.%L",
                    second: "%A, %b %e, %H:%M:%S",
                    minute: "%A, %b %e, %H:%M",
                    hour: "%A, %b %e, %H:%M",
                    day: "%A, %b %e, %Y",
                    week: "Week from %A, %b %e, %Y",
                    month: "%B %Y",
                    year: "%Y"
                },
                footerFormat: "",
                padding: 8,
                snap: a.isTouchDevice ? 25 : 10,
                backgroundColor: D("#f7f7f7").setOpacity(.85).get(),
                borderWidth: 1,
                headerFormat: '\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',
                pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e',
                shadow: !0,
                style: {
                    color: "#333333",
                    cursor: "default",
                    fontSize: "12px",
                    pointerEvents: "none",
                    whiteSpace: "nowrap"
                }
            },
            credits: {
                enabled: !0,
                href: "http://www.highcharts.com",
                position: {
                    align: "right",
                    x: -10,
                    verticalAlign: "bottom",
                    y: -5
                },
                style: {
                    cursor: "pointer",
                    color: "#999999",
                    fontSize: "9px"
                },
                text: "Highcharts.com"
            }
        };
        a.setOptions = function (m) {
            a.defaultOptions = h(!0, a.defaultOptions, m);
            F();
            return a.defaultOptions
        };
        a.getOptions = function () {
            return a.defaultOptions
        };
        a.defaultPlotOptions = a.defaultOptions.plotOptions;
        F()
    })(J);
    (function (a) {
        var z, F, D = a.addEvent,
            B = a.animate,
            f = a.attr,
            h = a.charts,
            t = a.color,
            r = a.css,
            m = a.createElement,
            d = a.defined,
            g = a.deg2rad,
            n = a.destroyObjectProperties,
            y = a.doc,
            w = a.each,
            b = a.extend,
            l = a.erase,
            e = a.grep,
            c = a.hasTouch,
            E = a.inArray,
            u = a.isArray,
            q = a.isFirefox,
            x = a.isMS,
            A = a.isObject,
            H = a.isString,
            k = a.isWebKit,
            G = a.merge,
            I = a.noop,
            L = a.pick,
            K = a.pInt,
            p = a.removeEvent,
            C = a.stop,
            M = a.svg,
            N = a.SVG_NS,
            Q = a.symbolSizes,
            O = a.win;
        z = a.SVGElement = function () {
            return this
        };
        z.prototype = {
            opacity: 1,
            SVG_NS: N,
            textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline"
                .split(" "),
            init: function (a, b) {
                this.element = "span" === b ? m(b) : y.createElementNS(this.SVG_NS, b);
                this.renderer = a
            },
            animate: function (v, b, p) {
                b = a.animObject(L(b, this.renderer.globalAnimation, !0));
                0 !== b.duration ? (p && (b.complete = p), B(this, v, b)) : (this.attr(v, null, p), b.step &&
                    b.step.call(this));
                return this
            },
            colorGradient: function (v, b, p) {
                var e = this.renderer,
                    c, q, k, C, x, l, P, g, A, n, m, f = [],
                    h;
                v.radialGradient ? q = "radialGradient" : v.linearGradient && (q = "linearGradient");
                if (q) {
                    k = v[q];
                    x = e.gradients;
                    P = v.stops;
                    n = p.radialReference;
                    u(k) && (v[q] = k = {
                        x1: k[0],
                        y1: k[1],
                        x2: k[2],
                        y2: k[3],
                        gradientUnits: "userSpaceOnUse"
                    });
                    "radialGradient" === q && n && !d(k.gradientUnits) && (C = k, k = G(k, e.getRadialAttr(n, C), {
                        gradientUnits: "userSpaceOnUse"
                    }));
                    for (m in k) "id" !== m && f.push(m, k[m]);
                    for (m in P) f.push(P[m]);
                    f = f.join(",");
                    x[f] ? n = x[f].attr("id") : (k.id = n = a.uniqueKey(), x[f] = l = e.createElement(q).attr(k).add(e
                        .defs), l.radAttr = C, l.stops = [], w(P, function (v) {
                        0 === v[1].indexOf("rgba") ? (c = a.color(v[1]), g = c.get("rgb"), A = c.get("a")) : (g = v[1],
                            A = 1);
                        v = e.createElement("stop").attr({
                            offset: v[0],
                            "stop-color": g,
                            "stop-opacity": A
                        }).add(l);
                        l.stops.push(v)
                    }));
                    h = "url(" + e.url + "#" + n + ")";
                    p.setAttribute(b, h);
                    p.gradient = f;
                    v.toString = function () {
                        return h
                    }
                }
            },
            applyTextOutline: function (v) {
                var b = this.element,
                    p, e, c, q, k; - 1 !== v.indexOf("contrast") && (v = v.replace(/contrast/g,
                    this.renderer.getContrast(b.style.fill)));
                v = v.split(" ");
                e = v[v.length - 1];
                if ((c = v[0]) && "none" !== c && a.svg) {
                    this.fakeTS = !0;
                    v = [].slice.call(b.getElementsByTagName("tspan"));
                    this.ySetter = this.xSetter;
                    c = c.replace(/(^[\d\.]+)(.*?)$/g, function (a, v, b) {
                        return 2 * v + b
                    });
                    for (k = v.length; k--;) p = v[k], "highcharts-text-outline" === p.getAttribute("class") && l(v, b.removeChild(
                            p));
                    q = b.firstChild;
                    w(v, function (a, v) {
                        0 === v && (a.setAttribute("x", b.getAttribute("x")), v = b.getAttribute("y"), a.setAttribute(
                            "y", v || 0), null === v && b.setAttribute("y",
                            0));
                        a = a.cloneNode(1);
                        f(a, {
                            "class": "highcharts-text-outline",
                            fill: e,
                            stroke: e,
                            "stroke-width": c,
                            "stroke-linejoin": "round"
                        });
                        b.insertBefore(a, q)
                    })
                }
            },
            attr: function (a, b, p, e) {
                var v, c = this.element,
                    q, k = this,
                    x;
                "string" === typeof a && void 0 !== b && (v = a, a = {}, a[v] = b);
                if ("string" === typeof a) k = (this[a + "Getter"] || this._defaultGetter).call(this, a, c);
                else {
                    for (v in a) b = a[v], x = !1, e || C(this, v), this.symbolName &&
                            /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)$/.test(v) && (q || (this.symbolAttr(
                            a), q = !0), x = !0), !this.rotation ||
                            "x" !== v && "y" !== v || (this.doTransform = !0), x || (x = this[v + "Setter"] || this._defaultSetter,
                            x.call(this, b, v, c), this.shadows &&
                            /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(v) && this.updateShadows(v, b, x));
                    this.doTransform && (this.updateTransform(), this.doTransform = !1)
                }
                p && p();
                return k
            },
            updateShadows: function (a, b, p) {
                for (var v = this.shadows, e = v.length; e--;) p.call(v[e], "height" === a ? Math.max(b - (v[e].cutHeight ||
                        0), 0) : "d" === a ? this.d : b, a, v[e])
            },
            addClass: function (a, b) {
                var v = this.attr("class") || ""; - 1 === v.indexOf(a) &&
                    (b || (a = (v + (v ? " " : "") + a).replace("  ", " ")), this.attr("class", a));
                return this
            },
            hasClass: function (a) {
                return -1 !== f(this.element, "class").indexOf(a)
            },
            removeClass: function (a) {
                f(this.element, "class", (f(this.element, "class") || "").replace(a, ""));
                return this
            },
            symbolAttr: function (a) {
                var v = this;
                w("x y r start end width height innerR anchorX anchorY".split(" "), function (b) {
                    v[b] = L(a[b], v[b])
                });
                v.attr({
                    d: v.renderer.symbols[v.symbolName](v.x, v.y, v.width, v.height, v)
                })
            },
            clip: function (a) {
                return this.attr("clip-path",
                    a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none")
            },
            crisp: function (a, b) {
                var v, p = {}, e;
                b = b || a.strokeWidth || 0;
                e = Math.round(b) % 2 / 2;
                a.x = Math.floor(a.x || this.x || 0) + e;
                a.y = Math.floor(a.y || this.y || 0) + e;
                a.width = Math.floor((a.width || this.width || 0) - 2 * e);
                a.height = Math.floor((a.height || this.height || 0) - 2 * e);
                d(a.strokeWidth) && (a.strokeWidth = b);
                for (v in a) this[v] !== a[v] && (this[v] = p[v] = a[v]);
                return p
            },
            css: function (a) {
                var v = this.styles,
                    p = {}, e = this.element,
                    c, q = "",
                    k = !v,
                    C = ["textOutline", "textOverflow", "width"];
                a && a.color &&
                    (a.fill = a.color);
                if (v) for (c in a) a[c] !== v[c] && (p[c] = a[c], k = !0);
                if (k) {
                    v && (a = b(v, p));
                    v = this.textWidth = a && a.width && "auto" !== a.width && "text" === e.nodeName.toLowerCase() && K(
                        a.width);
                    this.styles = a;
                    v && !M && this.renderer.forExport && delete a.width;
                    if (x && !M) r(this.element, a);
                    else {
                        v = function (a, v) {
                            return "-" + v.toLowerCase()
                        };
                        for (c in a) - 1 === E(c, C) && (q += c.replace(/([A-Z])/g, v) + ":" + a[c] + ";");
                        q && f(e, "style", q)
                    }
                    this.added && ("text" === this.element.nodeName && this.renderer.buildText(this), a && a.textOutline &&
                        this.applyTextOutline(a.textOutline))
                }
                return this
            },
            strokeWidth: function () {
                return this["stroke-width"] || 0
            },
            on: function (a, b) {
                var v = this,
                    p = v.element;
                c && "click" === a ? (p.ontouchstart = function (a) {
                    v.touchEventFired = Date.now();
                    a.preventDefault();
                    b.call(p, a)
                }, p.onclick = function (a) {
                    (-1 === O.navigator.userAgent.indexOf("Android") || 1100 < Date.now() - (v.touchEventFired || 0)) &&
                        b.call(p, a)
                }) : p["on" + a] = b;
                return this
            },
            setRadialReference: function (a) {
                var v = this.renderer.gradients[this.element.gradient];
                this.element.radialReference = a;
                v && v.radAttr && v.animate(this.renderer.getRadialAttr(a,
                    v.radAttr));
                return this
            },
            translate: function (a, b) {
                return this.attr({
                    translateX: a,
                    translateY: b
                })
            },
            invert: function (a) {
                this.inverted = a;
                this.updateTransform();
                return this
            },
            updateTransform: function () {
                var a = this.translateX || 0,
                    b = this.translateY || 0,
                    p = this.scaleX,
                    e = this.scaleY,
                    c = this.inverted,
                    q = this.rotation,
                    k = this.element;
                c && (a += this.width, b += this.height);
                a = ["translate(" + a + "," + b + ")"];
                c ? a.push("rotate(90) scale(-1,1)") : q && a.push("rotate(" + q + " " + (k.getAttribute("x") || 0) +
                    " " + (k.getAttribute("y") || 0) + ")");
                (d(p) ||
                    d(e)) && a.push("scale(" + L(p, 1) + " " + L(e, 1) + ")");
                a.length && k.setAttribute("transform", a.join(" "))
            },
            toFront: function () {
                var a = this.element;
                a.parentNode.appendChild(a);
                return this
            },
            align: function (a, b, p) {
                var v, e, c, q, k = {};
                e = this.renderer;
                c = e.alignedObjects;
                var C, x;
                if (a) {
                    if (this.alignOptions = a, this.alignByTranslate = b, !p || H(p)) this.alignTo = v = p ||
                            "renderer", l(c, this), c.push(this), p = null
                } else a = this.alignOptions, b = this.alignByTranslate, v = this.alignTo;
                p = L(p, e[v], e);
                v = a.align;
                e = a.verticalAlign;
                c = (p.x || 0) + (a.x ||
                    0);
                q = (p.y || 0) + (a.y || 0);
                "right" === v ? C = 1 : "center" === v && (C = 2);
                C && (c += (p.width - (a.width || 0)) / C);
                k[b ? "translateX" : "x"] = Math.round(c);
                "bottom" === e ? x = 1 : "middle" === e && (x = 2);
                x && (q += (p.height - (a.height || 0)) / x);
                k[b ? "translateY" : "y"] = Math.round(q);
                this[this.placed ? "animate" : "attr"](k);
                this.placed = !0;
                this.alignAttr = k;
                return this
            },
            getBBox: function (a, p) {
                var v, e = this.renderer,
                    c, q = this.element,
                    k = this.styles,
                    C, x = this.textStr,
                    l, G = e.cache,
                    d = e.cacheKeys,
                    A;
                p = L(p, this.rotation);
                c = p * g;
                C = k && k.fontSize;
                void 0 !== x && (A = x.toString(), -1 === A.indexOf("\x3c") && (A = A.replace(/[0-9]/g, "0")), A += ["",
                        p || 0, C, k && k.width, k && k.textOverflow].join());
                A && !a && (v = G[A]);
                if (!v) {
                    if (q.namespaceURI === this.SVG_NS || e.forExport) {
                        try {
                            (l = this.fakeTS && function (a) {
                                w(q.querySelectorAll(".highcharts-text-outline"), function (v) {
                                    v.style.display = a
                                })
                            }) && l("none"), v = q.getBBox ? b({}, q.getBBox()) : {
                                width: q.offsetWidth,
                                height: q.offsetHeight
                            }, l && l("")
                        } catch (V) {}
                        if (!v || 0 > v.width) v = {
                                width: 0,
                                height: 0
                        }
                    } else v = this.htmlGetBBox();
                    e.isSVG && (a = v.width, e = v.height, k && "11px" === k.fontSize &&
                        17 === Math.round(e) && (v.height = e = 14), p && (v.width = Math.abs(e * Math.sin(c)) + Math.abs(
                        a * Math.cos(c)), v.height = Math.abs(e * Math.cos(c)) + Math.abs(a * Math.sin(c))));
                    if (A && 0 < v.height) {
                        for (; 250 < d.length;) delete G[d.shift()];
                        G[A] || d.push(A);
                        G[A] = v
                    }
                }
                return v
            },
            show: function (a) {
                return this.attr({
                    visibility: a ? "inherit" : "visible"
                })
            },
            hide: function () {
                return this.attr({
                    visibility: "hidden"
                })
            },
            fadeOut: function (a) {
                var v = this;
                v.animate({
                    opacity: 0
                }, {
                    duration: a || 150,
                    complete: function () {
                        v.attr({
                            y: -9999
                        })
                    }
                })
            },
            add: function (a) {
                var v =
                    this.renderer,
                    b = this.element,
                    p;
                a && (this.parentGroup = a);
                this.parentInverted = a && a.inverted;
                void 0 !== this.textStr && v.buildText(this);
                this.added = !0;
                if (!a || a.handleZ || this.zIndex) p = this.zIndexSetter();
                p || (a ? a.element : v.box).appendChild(b);
                if (this.onAdd) this.onAdd();
                return this
            },
            safeRemoveChild: function (a) {
                var v = a.parentNode;
                v && v.removeChild(a)
            },
            destroy: function () {
                var a = this,
                    b = a.element || {}, p = a.renderer.isSVG && "SPAN" === b.nodeName && a.parentGroup,
                    e, c;
                b.onclick = b.onmouseout = b.onmouseover = b.onmousemove = b.point =
                    null;
                C(a);
                a.clipPath && (w(a.element.ownerSVGElement.querySelectorAll("[clip-path]"), function (v) {
                    -1 < v.getAttribute("clip-path").indexOf(a.clipPath.element.id) && v.removeAttribute("clip-path")
                }), a.clipPath = a.clipPath.destroy());
                if (a.stops) {
                    for (c = 0; c < a.stops.length; c++) a.stops[c] = a.stops[c].destroy();
                    a.stops = null
                }
                a.safeRemoveChild(b);
                for (a.destroyShadows(); p && p.div && 0 === p.div.childNodes.length;) b = p.parentGroup, a.safeRemoveChild(
                        p.div), delete p.div, p = b;
                a.alignTo && l(a.renderer.alignedObjects, a);
                for (e in a) delete a[e];
                return null
            },
            shadow: function (a, b, p) {
                var v = [],
                    e, c, q = this.element,
                    k, C, x, l;
                if (!a) this.destroyShadows();
                else if (!this.shadows) {
                    C = L(a.width, 3);
                    x = (a.opacity || .15) / C;
                    l = this.parentInverted ? "(-1,-1)" : "(" + L(a.offsetX, 1) + ", " + L(a.offsetY, 1) + ")";
                    for (e = 1; e <= C; e++) c = q.cloneNode(0), k = 2 * C + 1 - 2 * e, f(c, {
                            isShadow: "true",
                            stroke: a.color || "#000000",
                            "stroke-opacity": x * e,
                            "stroke-width": k,
                            transform: "translate" + l,
                            fill: "none"
                        }), p && (f(c, "height", Math.max(f(c, "height") - k, 0)), c.cutHeight = k), b ? b.element.appendChild(
                            c) : q.parentNode.insertBefore(c,
                            q), v.push(c);
                    this.shadows = v
                }
                return this
            },
            destroyShadows: function () {
                w(this.shadows || [], function (a) {
                    this.safeRemoveChild(a)
                }, this);
                this.shadows = void 0
            },
            xGetter: function (a) {
                "circle" === this.element.nodeName && ("x" === a ? a = "cx" : "y" === a && (a = "cy"));
                return this._defaultGetter(a)
            },
            _defaultGetter: function (a) {
                a = L(this[a], this.element ? this.element.getAttribute(a) : null, 0);
                /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));
                return a
            },
            dSetter: function (a, b, p) {
                a && a.join && (a = a.join(" "));
                /(NaN| {2}|^$)/.test(a) && (a = "M 0 0");
                p.setAttribute(b,
                    a);
                this[b] = a
            },
            dashstyleSetter: function (a) {
                var b, v = this["stroke-width"];
                "inherit" === v && (v = 1);
                if (a = a && a.toLowerCase()) {
                    a = a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace(
                        "shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g,
                        "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
                    for (b = a.length; b--;) a[b] = K(a[b]) * v;
                    a = a.join(",").replace(/NaN/g, "none");
                    this.element.setAttribute("stroke-dasharray", a)
                }
            },
            alignSetter: function (a) {
                this.element.setAttribute("text-anchor", {
                    left: "start",
                    center: "middle",
                    right: "end"
                }[a])
            },
            opacitySetter: function (a, b, p) {
                this[b] = a;
                p.setAttribute(b, a)
            },
            titleSetter: function (a) {
                var b = this.element.getElementsByTagName("title")[0];
                b || (b = y.createElementNS(this.SVG_NS, "title"), this.element.appendChild(b));
                b.firstChild && b.removeChild(b.firstChild);
                b.appendChild(y.createTextNode(String(L(a), "").replace(/<[^>]*>/g, "")))
            },
            textSetter: function (a) {
                a !== this.textStr && (delete this.bBox, this.textStr = a, this.added && this.renderer.buildText(this))
            },
            fillSetter: function (a,
                b, p) {
                "string" === typeof a ? p.setAttribute(b, a) : a && this.colorGradient(a, b, p)
            },
            visibilitySetter: function (a, b, p) {
                "inherit" === a ? p.removeAttribute(b) : p.setAttribute(b, a)
            },
            zIndexSetter: function (a, b) {
                var v = this.renderer,
                    p = this.parentGroup,
                    e = (p || v).element || v.box,
                    c, q = this.element,
                    k;
                c = this.added;
                var C;
                d(a) && (q.zIndex = a, a = +a, this[b] === a && (c = !1), this[b] = a);
                if (c) {
                    (a = this.zIndex) && p && (p.handleZ = !0);
                    b = e.childNodes;
                    for (C = 0; C < b.length && !k; C++) p = b[C], c = p.zIndex, p !== q && (K(c) > a || !d(a) && d(c) ||
                            0 > a && !d(c) && e !== v.box) && (e.insertBefore(q,
                            p), k = !0);
                    k || e.appendChild(q)
                }
                return k
            },
            _defaultSetter: function (a, b, p) {
                p.setAttribute(b, a)
            }
        };
        z.prototype.yGetter = z.prototype.xGetter;
        z.prototype.translateXSetter = z.prototype.translateYSetter = z.prototype.rotationSetter = z.prototype.verticalAlignSetter =
            z.prototype.scaleXSetter = z.prototype.scaleYSetter = function (a, b) {
            this[b] = a;
            this.doTransform = !0
        };
        z.prototype["stroke-widthSetter"] = z.prototype.strokeSetter = function (a, b, p) {
            this[b] = a;
            this.stroke && this["stroke-width"] ? (z.prototype.fillSetter.call(this, this.stroke,
                "stroke", p), p.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) :
                "stroke-width" === b && 0 === a && this.hasStroke && (p.removeAttribute("stroke"), this.hasStroke = !1)
        };
        F = a.SVGRenderer = function () {
            this.init.apply(this, arguments)
        };
        F.prototype = {
            Element: z,
            SVG_NS: N,
            init: function (a, b, p, e, c, C) {
                var v;
                e = this.createElement("svg").attr({
                    version: "1.1",
                    "class": "highcharts-root"
                }).css(this.getStyle(e));
                v = e.element;
                a.appendChild(v); - 1 === a.innerHTML.indexOf("xmlns") && f(v, "xmlns", this.SVG_NS);
                this.isSVG = !0;
                this.box = v;
                this.boxWrapper = e;
                this.alignedObjects = [];
                this.url = (q || k) && y.getElementsByTagName("base").length ? O.location.href.replace(/#.*?$/, "").replace(
                    /<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";
                this.createElement("desc").add().element.appendChild(y.createTextNode("Created with Highmaps 5.0.10"));
                this.defs = this.createElement("defs").add();
                this.allowHTML = C;
                this.forExport = c;
                this.gradients = {};
                this.cache = {};
                this.cacheKeys = [];
                this.imgCount = 0;
                this.setSize(b, p, !1);
                var x;
                q && a.getBoundingClientRect &&
                    (b = function () {
                    r(a, {
                        left: 0,
                        top: 0
                    });
                    x = a.getBoundingClientRect();
                    r(a, {
                        left: Math.ceil(x.left) - x.left + "px",
                        top: Math.ceil(x.top) - x.top + "px"
                    })
                }, b(), this.unSubPixelFix = D(O, "resize", b))
            },
            getStyle: function (a) {
                return this.style = b({
                    fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                    fontSize: "12px"
                }, a)
            },
            setStyle: function (a) {
                this.boxWrapper.css(this.getStyle(a))
            },
            isHidden: function () {
                return !this.boxWrapper.getBBox().width
            },
            destroy: function () {
                var a = this.defs;
                this.box = null;
                this.boxWrapper =
                    this.boxWrapper.destroy();
                n(this.gradients || {});
                this.gradients = null;
                a && (this.defs = a.destroy());
                this.unSubPixelFix && this.unSubPixelFix();
                return this.alignedObjects = null
            },
            createElement: function (a) {
                var b = new this.Element;
                b.init(this, a);
                return b
            },
            draw: I,
            getRadialAttr: function (a, b) {
                return {
                    cx: a[0] - a[2] / 2 + b.cx * a[2],
                    cy: a[1] - a[2] / 2 + b.cy * a[2],
                    r: b.r * a[2]
                }
            },
            getSpanWidth: function (a, b) {
                var p = a.getBBox(!0).width;
                !M && this.forExport && (p = this.measureSpanWidth(b.firstChild.data, a.styles));
                return p
            },
            applyEllipsis: function (a,
                b, p, e) {
                var v = this.getSpanWidth(a, b),
                    c = v > e,
                    v = p,
                    q, k = 0,
                    C = p.length,
                    x = function (a) {
                        b.removeChild(b.firstChild);
                        a && b.appendChild(y.createTextNode(a))
                    };
                if (c) {
                    for (; k <= C;) q = Math.ceil((k + C) / 2), v = p.substring(0, q) + "\u2026", x(v), v = this.getSpanWidth(
                            a, b), k === C ? k = C + 1 : v > e ? C = q - 1 : k = q;
                    0 === C && x("")
                }
                return c
            },
            buildText: function (a) {
                var b = a.element,
                    p = this,
                    v = p.forExport,
                    c = L(a.textStr, "").toString(),
                    q = -1 !== c.indexOf("\x3c"),
                    k = b.childNodes,
                    C, x, l, G, g = f(b, "x"),
                    d = a.styles,
                    A = a.textWidth,
                    u = d && d.lineHeight,
                    n = d && d.textOutline,
                    m = d &&
                        "ellipsis" === d.textOverflow,
                    h = d && "nowrap" === d.whiteSpace,
                    E = d && d.fontSize,
                    H, I, t = k.length,
                    d = A && !a.added && this.box,
                    Q = function (a) {
                        var v;
                        v = /(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize : E || p.style.fontSize || 12;
                        return u ? K(u) : p.fontMetrics(v, a.getAttribute("style") ? a : b).h
                    };
                H = [c, m, h, u, n, E, A].join();
                if (H !== a.textCache) {
                    for (a.textCache = H; t--;) b.removeChild(k[t]);
                    q || n || m || A || -1 !== c.indexOf(" ") ? (C = /<.*class="([^"]+)".*>/, x =
                        /<.*style="([^"]+)".*>/, l = /<.*href="(http[^"]+)".*>/, d && d.appendChild(b), c = q ? c.replace(
                        /<(b|strong)>/g,
                        '\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g,
                        '\x3cspan style\x3d"font-style:italic"\x3e').replace(/<a/g, "\x3cspan").replace(
                        /<\/(b|strong|i|em|a)>/g, "\x3c/span\x3e").split(/<br.*?>/g) : [c], c = e(c, function (a) {
                        return "" !== a
                    }), w(c, function (c, e) {
                        var q, k = 0;
                        c = c.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||\x3cspan").replace(/<\/span>/g,
                            "\x3c/span\x3e|||");
                        q = c.split("|||");
                        w(q, function (c) {
                            if ("" !== c || 1 === q.length) {
                                var d = {}, n = y.createElementNS(p.SVG_NS, "tspan"),
                                    u, w;
                                C.test(c) && (u = c.match(C)[1],
                                    f(n, "class", u));
                                x.test(c) && (w = c.match(x)[1].replace(/(;| |^)color([ :])/, "$1fill$2"), f(n, "style",
                                    w));
                                l.test(c) && !v && (f(n, "onclick", 'location.href\x3d"' + c.match(l)[1] + '"'), r(n, {
                                    cursor: "pointer"
                                }));
                                c = (c.replace(/<(.|\n)*?>/g, "") || " ").replace(/</g, "\x3c").replace(/>/g,
                                    "\x3e");
                                if (" " !== c) {
                                    n.appendChild(y.createTextNode(c));
                                    k ? d.dx = 0 : e && null !== g && (d.x = g);
                                    f(n, d);
                                    b.appendChild(n);
                                    !k && I && (!M && v && r(n, {
                                        display: "block"
                                    }), f(n, "dy", Q(n)));
                                    if (A) {
                                        d = c.replace(/([^\^])-/g, "$1- ").split(" ");
                                        u = 1 < q.length || e ||
                                            1 < d.length && !h;
                                        var E = [],
                                            H, P = Q(n),
                                            L = a.rotation;
                                        for (m && (G = p.applyEllipsis(a, n, c, A)); !m && u && (d.length || E.length);)
                                            a.rotation = 0, H = p.getSpanWidth(a, n), c = H > A, void 0 === G && (G = c),
                                                c && 1 !== d.length ? (n.removeChild(n.firstChild), E.unshift(d.pop())) :
                                                (d = E, E = [], d.length && !h && (n = y.createElementNS(N, "tspan"), f(
                                                n, {
                                                dy: P,
                                                x: g
                                            }), w && f(n, "style", w), b.appendChild(n)), H > A && (A = H)), d.length &&
                                                n.appendChild(y.createTextNode(d.join(" ").replace(/- /g, "-")));
                                        a.rotation = L
                                    }
                                    k++
                                }
                            }
                        });
                        I = I || b.childNodes.length
                    }), G && a.attr("title", a.textStr),
                        d && d.removeChild(b), n && a.applyTextOutline && a.applyTextOutline(n)) : b.appendChild(y.createTextNode(
                        c.replace(/</g, "\x3c").replace(/>/g, "\x3e")))
                }
            },
            getContrast: function (a) {
                a = t(a).rgba;
                return 510 < a[0] + a[1] + a[2] ? "#000000" : "#FFFFFF"
            },
            button: function (a, p, c, e, q, k, C, l, d) {
                var v = this.label(a, p, c, d, null, null, null, null, "button"),
                    g = 0;
                v.attr(G({
                    padding: 8,
                    r: 2
                }, q));
                var n, A, u, m;
                q = G({
                    fill: "#f7f7f7",
                    stroke: "#cccccc",
                    "stroke-width": 1,
                    style: {
                        color: "#333333",
                        cursor: "pointer",
                        fontWeight: "normal"
                    }
                }, q);
                n = q.style;
                delete q.style;
                k = G(q, {
                    fill: "#e6e6e6"
                }, k);
                A = k.style;
                delete k.style;
                C = G(q, {
                    fill: "#e6ebf5",
                    style: {
                        color: "#000000",
                        fontWeight: "bold"
                    }
                }, C);
                u = C.style;
                delete C.style;
                l = G(q, {
                    style: {
                        color: "#cccccc"
                    }
                }, l);
                m = l.style;
                delete l.style;
                D(v.element, x ? "mouseover" : "mouseenter", function () {
                    3 !== g && v.setState(1)
                });
                D(v.element, x ? "mouseout" : "mouseleave", function () {
                    3 !== g && v.setState(g)
                });
                v.setState = function (a) {
                    1 !== a && (v.state = g = a);
                    v.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + [
                            "normal", "hover",
                        "pressed", "disabled"][a || 0]);
                    v.attr([q, k, C, l][a || 0]).css([n, A, u, m][a || 0])
                };
                v.attr(q).css(b({
                    cursor: "default"
                }, n));
                return v.on("click", function (a) {
                    3 !== g && e.call(v, a)
                })
            },
            crispLine: function (a, b) {
                a[1] === a[4] && (a[1] = a[4] = Math.round(a[1]) - b % 2 / 2);
                a[2] === a[5] && (a[2] = a[5] = Math.round(a[2]) + b % 2 / 2);
                return a
            },
            path: function (a) {
                var p = {
                    fill: "none"
                };
                u(a) ? p.d = a : A(a) && b(p, a);
                return this.createElement("path").attr(p)
            },
            circle: function (a, b, p) {
                a = A(a) ? a : {
                    x: a,
                    y: b,
                    r: p
                };
                b = this.createElement("circle");
                b.xSetter = b.ySetter = function (a,
                    b, p) {
                    p.setAttribute("c" + b, a)
                };
                return b.attr(a)
            },
            arc: function (a, b, p, c, e, q) {
                A(a) ? (c = a, b = c.y, p = c.r, a = c.x) : c = {
                    innerR: c,
                    start: e,
                    end: q
                };
                a = this.symbol("arc", a, b, p, p, c);
                a.r = p;
                return a
            },
            rect: function (a, b, p, c, e, q) {
                e = A(a) ? a.r : e;
                var v = this.createElement("rect");
                a = A(a) ? a : void 0 === a ? {} : {
                    x: a,
                    y: b,
                    width: Math.max(p, 0),
                    height: Math.max(c, 0)
                };
                void 0 !== q && (a.strokeWidth = q, a = v.crisp(a));
                a.fill = "none";
                e && (a.r = e);
                v.rSetter = function (a, b, p) {
                    f(p, {
                        rx: a,
                        ry: a
                    })
                };
                return v.attr(a)
            },
            setSize: function (a, b, p) {
                var c = this.alignedObjects,
                    e = c.length;
                this.width = a;
                this.height = b;
                for (this.boxWrapper.animate({
                    width: a,
                    height: b
                }, {
                    step: function () {
                        this.attr({
                            viewBox: "0 0 " + this.attr("width") + " " + this.attr("height")
                        })
                    },
                    duration: L(p, !0) ? void 0 : 0
                }); e--;) c[e].align()
            },
            g: function (a) {
                var b = this.createElement("g");
                return a ? b.attr({
                    "class": "highcharts-" + a
                }) : b
            },
            image: function (a, p, c, e, q) {
                var v = {
                    preserveAspectRatio: "none"
                };
                1 < arguments.length && b(v, {
                    x: p,
                    y: c,
                    width: e,
                    height: q
                });
                v = this.createElement("image").attr(v);
                v.element.setAttributeNS ? v.element.setAttributeNS("http://www.w3.org/1999/xlink",
                    "href", a) : v.element.setAttribute("hc-svg-href", a);
                return v
            },
            symbol: function (a, p, c, e, q, k) {
                var v = this,
                    C, x = this.symbols[a],
                    l = d(p) && x && this.symbols[a](Math.round(p), Math.round(c), e, q, k),
                    g = /^url\((.*?)\)$/,
                    G, n;
                x ? (C = this.path(l), C.attr("fill", "none"), b(C, {
                    symbolName: a,
                    x: p,
                    y: c,
                    width: e,
                    height: q
                }), k && b(C, k)) : g.test(a) && (G = a.match(g)[1], C = this.image(G), C.imgwidth = L(Q[G] && Q[G].width,
                    k && k.width), C.imgheight = L(Q[G] && Q[G].height, k && k.height), n = function () {
                    C.attr({
                        width: C.width,
                        height: C.height
                    })
                }, w(["width", "height"], function (a) {
                    C[a + "Setter"] = function (a, b) {
                        var p = {}, c = this["img" + b],
                            e = "width" === b ? "translateX" : "translateY";
                        this[b] = a;
                        d(c) && (this.element && this.element.setAttribute(b, c), this.alignByTranslate || (p[e] = ((
                            this[b] || 0) - c) / 2, this.attr(p)))
                    }
                }), d(p) && C.attr({
                    x: p,
                    y: c
                }), C.isImg = !0, d(C.imgwidth) && d(C.imgheight) ? n() : (C.attr({
                    width: 0,
                    height: 0
                }), m("img", {
                    onload: function () {
                        var a = h[v.chartIndex];
                        0 === this.width && (r(this, {
                            position: "absolute",
                            top: "-999em"
                        }), y.body.appendChild(this));
                        Q[G] = {
                            width: this.width,
                            height: this.height
                        };
                        C.imgwidth = this.width;
                        C.imgheight = this.height;
                        C.element && n();
                        this.parentNode && this.parentNode.removeChild(this);
                        v.imgCount--;
                        if (!v.imgCount && a && a.onload) a.onload()
                    },
                    src: G
                }), this.imgCount++));
                return C
            },
            symbols: {
                circle: function (a, b, p, c) {
                    return this.arc(a + p / 2, b + c / 2, p / 2, c / 2, {
                        start: 0,
                        end: 2 * Math.PI,
                        open: !1
                    })
                },
                square: function (a, b, p, c) {
                    return ["M", a, b, "L", a + p, b, a + p, b + c, a, b + c, "Z"]
                },
                triangle: function (a, b, p, c) {
                    return ["M", a + p / 2, b, "L", a + p, b + c, a, b + c, "Z"]
                },
                "triangle-down": function (a, b, p, c) {
                    return ["M", a, b, "L", a + p,
                        b, a + p / 2, b + c, "Z"]
                },
                diamond: function (a, b, p, c) {
                    return ["M", a + p / 2, b, "L", a + p, b + c / 2, a + p / 2, b + c, a, b + c / 2, "Z"]
                },
                arc: function (a, b, p, c, e) {
                    var q = e.start,
                        k = e.r || p,
                        v = e.r || c || p,
                        C = e.end - .001;
                    p = e.innerR;
                    c = e.open;
                    var x = Math.cos(q),
                        l = Math.sin(q),
                        G = Math.cos(C),
                        C = Math.sin(C);
                    e = e.end - q < Math.PI ? 0 : 1;
                    k = ["M", a + k * x, b + v * l, "A", k, v, 0, e, 1, a + k * G, b + v * C];
                    d(p) && k.push(c ? "M" : "L", a + p * G, b + p * C, "A", p, p, 0, e, 0, a + p * x, b + p * l);
                    k.push(c ? "" : "Z");
                    return k
                },
                callout: function (a, b, p, c, e) {
                    var q = Math.min(e && e.r || 0, p, c),
                        k = q + 6,
                        C = e && e.anchorX;
                    e = e && e.anchorY;
                    var v;
                    v = ["M", a + q, b, "L", a + p - q, b, "C", a + p, b, a + p, b, a + p, b + q, "L", a + p, b + c - q,
                            "C", a + p, b + c, a + p, b + c, a + p - q, b + c, "L", a + q, b + c, "C", a, b + c, a, b +
                            c, a, b + c - q, "L", a, b + q, "C", a, b, a, b, a + q, b];
                    C && C > p ? e > b + k && e < b + c - k ? v.splice(13, 3, "L", a + p, e - 6, a + p + 6, e, a + p, e +
                        6, a + p, b + c - q) : v.splice(13, 3, "L", a + p, c / 2, C, e, a + p, c / 2, a + p, b + c - q) :
                        C && 0 > C ? e > b + k && e < b + c - k ? v.splice(33, 3, "L", a, e + 6, a - 6, e, a, e - 6, a,
                        b + q) : v.splice(33, 3, "L", a, c / 2, C, e, a, c / 2, a, b + q) : e && e > c && C > a + k &&
                        C < a + p - k ? v.splice(23, 3, "L", C + 6, b + c, C, b + c + 6, C - 6, b + c, a + q, b + c) :
                        e && 0 > e && C > a + k && C < a + p - k && v.splice(3,
                        3, "L", C - 6, b, C, b - 6, C + 6, b, p - q, b);
                    return v
                }
            },
            clipRect: function (b, p, c, e) {
                var q = a.uniqueKey(),
                    k = this.createElement("clipPath").attr({
                        id: q
                    }).add(this.defs);
                b = this.rect(b, p, c, e, 0).add(k);
                b.id = q;
                b.clipPath = k;
                b.count = 0;
                return b
            },
            text: function (a, b, p, c) {
                var e = !M && this.forExport,
                    q = {};
                if (c && (this.allowHTML || !this.forExport)) return this.html(a, b, p);
                q.x = Math.round(b || 0);
                p && (q.y = Math.round(p));
                if (a || 0 === a) q.text = a;
                a = this.createElement("text").attr(q);
                e && a.css({
                    position: "absolute"
                });
                c || (a.xSetter = function (a, b, p) {
                    var c =
                        p.getElementsByTagName("tspan"),
                        e, q = p.getAttribute(b),
                        k;
                    for (k = 0; k < c.length; k++) e = c[k], e.getAttribute(b) === q && e.setAttribute(b, a);
                    p.setAttribute(b, a)
                });
                return a
            },
            fontMetrics: function (a, b) {
                a = a || b && b.style && b.style.fontSize || this.style && this.style.fontSize;
                a = /px/.test(a) ? K(a) : /em/.test(a) ? parseFloat(a) * (b ? this.fontMetrics(null, b.parentNode).f :
                    16) : 12;
                b = 24 > a ? a + 3 : Math.round(1.2 * a);
                return {
                    h: b,
                    b: Math.round(.8 * b),
                    f: a
                }
            },
            rotCorr: function (a, b, p) {
                var c = a;
                b && p && (c = Math.max(c * Math.cos(b * g), 4));
                return {
                    x: -a / 3 * Math.sin(b *
                        g),
                    y: c
                }
            },
            label: function (c, e, q, k, C, x, l, g, n) {
                var v = this,
                    A = v.g("button" !== n && "label"),
                    u = A.text = v.text("", 0, 0, l).attr({
                        zIndex: 1
                    }),
                    m, f, h = 0,
                    E = 3,
                    H = 0,
                    y, I, M, N, r, L = {}, K, t, Q = /^url\((.*?)\)$/.test(k),
                    P = Q,
                    R, S, O, U;
                n && A.addClass("highcharts-" + n);
                P = Q;
                R = function () {
                    return (K || 0) % 2 / 2
                };
                S = function () {
                    var a = u.element.style,
                        p = {};
                    f = (void 0 === y || void 0 === I || r) && d(u.textStr) && u.getBBox();
                    A.width = (y || f.width || 0) + 2 * E + H;
                    A.height = (I || f.height || 0) + 2 * E;
                    t = E + v.fontMetrics(a && a.fontSize, u).b;
                    P && (m || (A.box = m = v.symbols[k] || Q ? v.symbol(k) :
                        v.rect(), m.addClass(("button" === n ? "" : "highcharts-label-box") + (n ? " highcharts-" + n +
                        "-box" : "")), m.add(A), a = R(), p.x = a, p.y = (g ? -t : 0) + a), p.width = Math.round(A.width),
                        p.height = Math.round(A.height), m.attr(b(p, L)), L = {})
                };
                O = function () {
                    var a = H + E,
                        b;
                    b = g ? 0 : t;
                    d(y) && f && ("center" === r || "right" === r) && (a += {
                        center: .5,
                        right: 1
                    }[r] * (y - f.width));
                    if (a !== u.x || b !== u.y) u.attr("x", a), void 0 !== b && u.attr("y", b);
                    u.x = a;
                    u.y = b
                };
                U = function (a, b) {
                    m ? m.attr(a, b) : L[a] = b
                };
                A.onAdd = function () {
                    u.add(A);
                    A.attr({
                        text: c || 0 === c ? c : "",
                        x: e,
                        y: q
                    });
                    m && d(C) &&
                        A.attr({
                        anchorX: C,
                        anchorY: x
                    })
                };
                A.widthSetter = function (b) {
                    y = a.isNumber(b) ? b : null
                };
                A.heightSetter = function (a) {
                    I = a
                };
                A["text-alignSetter"] = function (a) {
                    r = a
                };
                A.paddingSetter = function (a) {
                    d(a) && a !== E && (E = A.padding = a, O())
                };
                A.paddingLeftSetter = function (a) {
                    d(a) && a !== H && (H = a, O())
                };
                A.alignSetter = function (a) {
                    a = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[a];
                    a !== h && (h = a, f && A.attr({
                        x: M
                    }))
                };
                A.textSetter = function (a) {
                    void 0 !== a && u.textSetter(a);
                    S();
                    O()
                };
                A["stroke-widthSetter"] = function (a, b) {
                    a && (P = !0);
                    K = this["stroke-width"] = a;
                    U(b, a)
                };
                A.strokeSetter = A.fillSetter = A.rSetter = function (a, b) {
                    "fill" === b && a && (P = !0);
                    U(b, a)
                };
                A.anchorXSetter = function (a, b) {
                    C = a;
                    U(b, Math.round(a) - R() - M)
                };
                A.anchorYSetter = function (a, b) {
                    x = a;
                    U(b, a - N)
                };
                A.xSetter = function (a) {
                    A.x = a;
                    h && (a -= h * ((y || f.width) + 2 * E));
                    M = Math.round(a);
                    A.attr("translateX", M)
                };
                A.ySetter = function (a) {
                    N = A.y = Math.round(a);
                    A.attr("translateY", N)
                };
                var B = A.css;
                return b(A, {
                    css: function (a) {
                        if (a) {
                            var b = {};
                            a = G(a);
                            w(A.textProps, function (p) {
                                void 0 !== a[p] && (b[p] = a[p], delete a[p])
                            });
                            u.css(b)
                        }
                        return B.call(A,
                            a)
                    },
                    getBBox: function () {
                        return {
                            width: f.width + 2 * E,
                            height: f.height + 2 * E,
                            x: f.x - E,
                            y: f.y - E
                        }
                    },
                    shadow: function (a) {
                        a && (S(), m && m.shadow(a));
                        return A
                    },
                    destroy: function () {
                        p(A.element, "mouseenter");
                        p(A.element, "mouseleave");
                        u && (u = u.destroy());
                        m && (m = m.destroy());
                        z.prototype.destroy.call(A);
                        A = v = S = O = U = null
                    }
                })
            }
        };
        a.Renderer = F
    })(J);
    (function (a) {
        var z = a.attr,
            F = a.createElement,
            D = a.css,
            B = a.defined,
            f = a.each,
            h = a.extend,
            t = a.isFirefox,
            r = a.isMS,
            m = a.isWebKit,
            d = a.pInt,
            g = a.SVGRenderer,
            n = a.win,
            y = a.wrap;
        h(a.SVGElement.prototype, {
            htmlCss: function (a) {
                var b = this.element;
                if (b = a && "SPAN" === b.tagName && a.width) delete a.width, this.textWidth = b, this.updateTransform();
                a && "ellipsis" === a.textOverflow && (a.whiteSpace = "nowrap", a.overflow = "hidden");
                this.styles = h(this.styles, a);
                D(this.element, a);
                return this
            },
            htmlGetBBox: function () {
                var a = this.element;
                "text" === a.nodeName && (a.style.position = "absolute");
                return {
                    x: a.offsetLeft,
                    y: a.offsetTop,
                    width: a.offsetWidth,
                    height: a.offsetHeight
                }
            },
            htmlUpdateTransform: function () {
                if (this.added) {
                    var a = this.renderer,
                        b = this.element,
                        l = this.translateX || 0,
                        e = this.translateY || 0,
                        c = this.x || 0,
                        g = this.y || 0,
                        n = this.textAlign || "left",
                        q = {
                            left: 0,
                            center: .5,
                            right: 1
                        }[n],
                        x = this.styles;
                    D(b, {
                        marginLeft: l,
                        marginTop: e
                    });
                    this.shadows && f(this.shadows, function (a) {
                        D(a, {
                            marginLeft: l + 1,
                            marginTop: e + 1
                        })
                    });
                    this.inverted && f(b.childNodes, function (c) {
                        a.invertChild(c, b)
                    });
                    if ("SPAN" === b.tagName) {
                        var A = this.rotation,
                            h = d(this.textWidth),
                            k = x && x.whiteSpace,
                            G = [A, n, b.innerHTML, this.textWidth, this.textAlign].join();
                        G !== this.cTT && (x = a.fontMetrics(b.style.fontSize).b,
                            B(A) && this.setSpanRotation(A, q, x), D(b, {
                            width: "",
                            whiteSpace: k || "nowrap"
                        }), b.offsetWidth > h && /[ \-]/.test(b.textContent || b.innerText) && D(b, {
                            width: h + "px",
                            display: "block",
                            whiteSpace: k || "normal"
                        }), this.getSpanCorrection(b.offsetWidth, x, q, A, n));
                        D(b, {
                            left: c + (this.xCorr || 0) + "px",
                            top: g + (this.yCorr || 0) + "px"
                        });
                        m && (x = b.offsetHeight);
                        this.cTT = G
                    }
                } else this.alignOnAdd = !0
            },
            setSpanRotation: function (a, b, l) {
                var e = {}, c = r ? "-ms-transform" : m ? "-webkit-transform" : t ? "MozTransform" : n.opera ?
                        "-o-transform" : "";
                e[c] = e.transform =
                    "rotate(" + a + "deg)";
                e[c + (t ? "Origin" : "-origin")] = e.transformOrigin = 100 * b + "% " + l + "px";
                D(this.element, e)
            },
            getSpanCorrection: function (a, b, l) {
                this.xCorr = -a * l;
                this.yCorr = -b
            }
        });
        h(g.prototype, {
            html: function (a, b, l) {
                var e = this.createElement("span"),
                    c = e.element,
                    d = e.renderer,
                    g = d.isSVG,
                    q = function (a, b) {
                        f(["opacity", "visibility"], function (c) {
                            y(a, c + "Setter", function (a, c, e, q) {
                                a.call(this, c, e, q);
                                b[e] = c
                            })
                        })
                    };
                e.textSetter = function (a) {
                    a !== c.innerHTML && delete this.bBox;
                    c.innerHTML = this.textStr = a;
                    e.htmlUpdateTransform()
                };
                g && q(e, e.element.style);
                e.xSetter = e.ySetter = e.alignSetter = e.rotationSetter = function (a, b) {
                    "align" === b && (b = "textAlign");
                    e[b] = a;
                    e.htmlUpdateTransform()
                };
                e.attr({
                    text: a,
                    x: Math.round(b),
                    y: Math.round(l)
                }).css({
                    fontFamily: this.style.fontFamily,
                    fontSize: this.style.fontSize,
                    position: "absolute"
                });
                c.style.whiteSpace = "nowrap";
                e.css = e.htmlCss;
                g && (e.add = function (a) {
                    var b, x = d.box.parentNode,
                        k = [];
                    if (this.parentGroup = a) {
                        if (b = a.div, !b) {
                            for (; a;) k.push(a), a = a.parentGroup;
                            f(k.reverse(), function (a) {
                                var c, l = z(a.element,
                                        "class");
                                l && (l = {
                                    className: l
                                });
                                b = a.div = a.div || F("div", l, {
                                    position: "absolute",
                                    left: (a.translateX || 0) + "px",
                                    top: (a.translateY || 0) + "px",
                                    display: a.display,
                                    opacity: a.opacity,
                                    pointerEvents: a.styles && a.styles.pointerEvents
                                }, b || x);
                                c = b.style;
                                h(a, {
                                    on: function () {
                                        e.on.apply({
                                            element: k[0].div
                                        }, arguments);
                                        return a
                                    },
                                    translateXSetter: function (b, p) {
                                        c.left = b + "px";
                                        a[p] = b;
                                        a.doTransform = !0
                                    },
                                    translateYSetter: function (b, p) {
                                        c.top = b + "px";
                                        a[p] = b;
                                        a.doTransform = !0
                                    }
                                });
                                q(a, c)
                            })
                        }
                    } else b = x;
                    b.appendChild(c);
                    e.added = !0;
                    e.alignOnAdd &&
                        e.htmlUpdateTransform();
                    return e
                });
                return e
            }
        })
    })(J);
    (function (a) {
        var z, F, D = a.createElement,
            B = a.css,
            f = a.defined,
            h = a.deg2rad,
            t = a.discardElement,
            r = a.doc,
            m = a.each,
            d = a.erase,
            g = a.extend;
        z = a.extendClass;
        var n = a.isArray,
            y = a.isNumber,
            w = a.isObject,
            b = a.merge;
        F = a.noop;
        var l = a.pick,
            e = a.pInt,
            c = a.SVGElement,
            E = a.SVGRenderer,
            u = a.win;
        a.svg || (F = {
            docMode8: r && 8 === r.documentMode,
            init: function (a, b) {
                var c = ["\x3c", b, ' filled\x3d"f" stroked\x3d"f"'],
                    e = ["position: ", "absolute", ";"],
                    q = "div" === b;
                ("shape" === b || q) && e.push("left:0;top:0;width:1px;height:1px;");
                e.push("visibility: ", q ? "hidden" : "visible");
                c.push(' style\x3d"', e.join(""), '"/\x3e');
                b && (c = q || "span" === b || "img" === b ? c.join("") : a.prepVML(c), this.element = D(c));
                this.renderer = a
            },
            add: function (a) {
                var b = this.renderer,
                    c = this.element,
                    e = b.box,
                    q = a && a.inverted,
                    e = a ? a.element || a : e;
                a && (this.parentGroup = a);
                q && b.invertChild(c, e);
                e.appendChild(c);
                this.added = !0;
                this.alignOnAdd && !this.deferUpdateTransform && this.updateTransform();
                if (this.onAdd) this.onAdd();
                this.className && this.attr("class", this.className);
                return this
            },
            updateTransform: c.prototype.htmlUpdateTransform,
            setSpanRotation: function () {
                var a = this.rotation,
                    b = Math.cos(a * h),
                    c = Math.sin(a * h);
                B(this.element, {
                    filter: a ? ["progid:DXImageTransform.Microsoft.Matrix(M11\x3d", b, ", M12\x3d", -c, ", M21\x3d", c,
                            ", M22\x3d", b, ", sizingMethod\x3d'auto expand')"].join("") : "none"
                })
            },
            getSpanCorrection: function (a, b, c, e, k) {
                var q = e ? Math.cos(e * h) : 1,
                    x = e ? Math.sin(e * h) : 0,
                    d = l(this.elemHeight, this.element.offsetHeight),
                    g;
                this.xCorr = 0 > q && -a;
                this.yCorr = 0 > x && -d;
                g = 0 > q * x;
                this.xCorr += x * b * (g ? 1 -
                    c : c);
                this.yCorr -= q * b * (e ? g ? c : 1 - c : 1);
                k && "left" !== k && (this.xCorr -= a * c * (0 > q ? -1 : 1), e && (this.yCorr -= d * c * (0 > x ? -1 :
                    1)), B(this.element, {
                    textAlign: k
                }))
            },
            pathToVML: function (a) {
                for (var b = a.length, c = []; b--;) y(a[b]) ? c[b] = Math.round(10 * a[b]) - 5 : "Z" === a[b] ? c[b] =
                        "x" : (c[b] = a[b], !a.isArc || "wa" !== a[b] && "at" !== a[b] || (c[b + 5] === c[b + 7] && (c[
                        b + 7] += a[b + 7] > a[b + 5] ? 1 : -1), c[b + 6] === c[b + 8] && (c[b + 8] += a[b + 8] > a[b +
                        6] ? 1 : -1)));
                return c.join(" ") || "x"
            },
            clip: function (a) {
                var b = this,
                    c;
                a ? (c = a.members, d(c, b), c.push(b), b.destroyClip = function () {
                    d(c,
                        b)
                }, a = a.getCSS(b)) : (b.destroyClip && b.destroyClip(), a = {
                    clip: b.docMode8 ? "inherit" : "rect(auto)"
                });
                return b.css(a)
            },
            css: c.prototype.htmlCss,
            safeRemoveChild: function (a) {
                a.parentNode && t(a)
            },
            destroy: function () {
                this.destroyClip && this.destroyClip();
                return c.prototype.destroy.apply(this)
            },
            on: function (a, b) {
                this.element["on" + a] = function () {
                    var a = u.event;
                    a.target = a.srcElement;
                    b(a)
                };
                return this
            },
            cutOffPath: function (a, b) {
                var c;
                a = a.split(/[ ,]/);
                c = a.length;
                if (9 === c || 11 === c) a[c - 4] = a[c - 2] = e(a[c - 2]) - 10 * b;
                return a.join(" ")
            },
            shadow: function (a, b, c) {
                var q = [],
                    k, d = this.element,
                    g = this.renderer,
                    x, n = d.style,
                    p, C = d.path,
                    u, A, m, f;
                C && "string" !== typeof C.value && (C = "x");
                A = C;
                if (a) {
                    m = l(a.width, 3);
                    f = (a.opacity || .15) / m;
                    for (k = 1; 3 >= k; k++) u = 2 * m + 1 - 2 * k, c && (A = this.cutOffPath(C.value, u + .5)), p = [
                                '\x3cshape isShadow\x3d"true" strokeweight\x3d"', u, '" filled\x3d"false" path\x3d"', A,
                                '" coordsize\x3d"10 10" style\x3d"', d.style.cssText, '" /\x3e'], x = D(g.prepVML(p),
                            null, {
                            left: e(n.left) + l(a.offsetX, 1),
                            top: e(n.top) + l(a.offsetY, 1)
                        }), c && (x.cutOff = u + 1), p = ['\x3cstroke color\x3d"',
                            a.color || "#000000", '" opacity\x3d"', f * k, '"/\x3e'], D(g.prepVML(p), null, null, x), b ?
                            b.element.appendChild(x) : d.parentNode.insertBefore(x, d), q.push(x);
                    this.shadows = q
                }
                return this
            },
            updateShadows: F,
            setAttr: function (a, b) {
                this.docMode8 ? this.element[a] = b : this.element.setAttribute(a, b)
            },
            classSetter: function (a) {
                (this.added ? this.element : this).className = a
            },
            dashstyleSetter: function (a, b, c) {
                (c.getElementsByTagName("stroke")[0] || D(this.renderer.prepVML(["\x3cstroke/\x3e"]), null, null, c))[b] =
                    a || "solid";
                this[b] = a
            },
            dSetter: function (a,
                b, c) {
                var e = this.shadows;
                a = a || [];
                this.d = a.join && a.join(" ");
                c.path = a = this.pathToVML(a);
                if (e) for (c = e.length; c--;) e[c].path = e[c].cutOff ? this.cutOffPath(a, e[c].cutOff) : a;
                this.setAttr(b, a)
            },
            fillSetter: function (a, b, c) {
                var e = c.nodeName;
                "SPAN" === e ? c.style.color = a : "IMG" !== e && (c.filled = "none" !== a, this.setAttr("fillcolor",
                    this.renderer.color(a, c, b, this)))
            },
            "fill-opacitySetter": function (a, b, c) {
                D(this.renderer.prepVML(["\x3c", b.split("-")[0], ' opacity\x3d"', a, '"/\x3e']), null, null, c)
            },
            opacitySetter: F,
            rotationSetter: function (a,
                b, c) {
                c = c.style;
                this[b] = c[b] = a;
                c.left = -Math.round(Math.sin(a * h) + 1) + "px";
                c.top = Math.round(Math.cos(a * h)) + "px"
            },
            strokeSetter: function (a, b, c) {
                this.setAttr("strokecolor", this.renderer.color(a, c, b, this))
            },
            "stroke-widthSetter": function (a, b, c) {
                c.stroked = !! a;
                this[b] = a;
                y(a) && (a += "px");
                this.setAttr("strokeweight", a)
            },
            titleSetter: function (a, b) {
                this.setAttr(b, a)
            },
            visibilitySetter: function (a, b, c) {
                "inherit" === a && (a = "visible");
                this.shadows && m(this.shadows, function (c) {
                    c.style[b] = a
                });
                "DIV" === c.nodeName && (a = "hidden" ===
                    a ? "-999em" : 0, this.docMode8 || (c.style[b] = a ? "visible" : "hidden"), b = "top");
                c.style[b] = a
            },
            xSetter: function (a, b, c) {
                this[b] = a;
                "x" === b ? b = "left" : "y" === b && (b = "top");
                this.updateClipping ? (this[b] = a, this.updateClipping()) : c.style[b] = a
            },
            zIndexSetter: function (a, b, c) {
                c.style[b] = a
            }
        }, F["stroke-opacitySetter"] = F["fill-opacitySetter"], a.VMLElement = F = z(c, F), F.prototype.ySetter = F.prototype
            .widthSetter = F.prototype.heightSetter = F.prototype.xSetter, F = {
            Element: F,
            isIE8: -1 < u.navigator.userAgent.indexOf("MSIE 8.0"),
            init: function (a,
                b, c) {
                var e, k;
                this.alignedObjects = [];
                e = this.createElement("div").css({
                    position: "relative"
                });
                k = e.element;
                a.appendChild(e.element);
                this.isVML = !0;
                this.box = k;
                this.boxWrapper = e;
                this.gradients = {};
                this.cache = {};
                this.cacheKeys = [];
                this.imgCount = 0;
                this.setSize(b, c, !1);
                if (!r.namespaces.hcv) {
                    r.namespaces.add("hcv", "urn:schemas-microsoft-com:vml");
                    try {
                        r.createStyleSheet().cssText =
                            "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
                    } catch (G) {
                        r.styleSheets[0].cssText +=
                            "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
                    }
                }
            },
            isHidden: function () {
                return !this.box.offsetWidth
            },
            clipRect: function (a, b, c, e) {
                var k = this.createElement(),
                    q = w(a);
                return g(k, {
                    members: [],
                    count: 0,
                    left: (q ? a.x : a) + 1,
                    top: (q ? a.y : b) + 1,
                    width: (q ? a.width : c) - 1,
                    height: (q ? a.height : e) - 1,
                    getCSS: function (a) {
                        var b = a.element,
                            c = b.nodeName,
                            p = a.inverted,
                            e = this.top - ("shape" === c ? b.offsetTop : 0),
                            k = this.left,
                            b = k + this.width,
                            q = e + this.height,
                            e = {
                                clip: "rect(" + Math.round(p ?
                                    k : e) + "px," + Math.round(p ? q : b) + "px," + Math.round(p ? b : q) + "px," + Math
                                    .round(p ? e : k) + "px)"
                            };
                        !p && a.docMode8 && "DIV" === c && g(e, {
                            width: b + "px",
                            height: q + "px"
                        });
                        return e
                    },
                    updateClipping: function () {
                        m(k.members, function (a) {
                            a.element && a.css(k.getCSS(a))
                        })
                    }
                })
            },
            color: function (b, c, e, l) {
                var k = this,
                    q, d = /^rgba/,
                    g, n, p = "none";
                b && b.linearGradient ? n = "gradient" : b && b.radialGradient && (n = "pattern");
                if (n) {
                    var C, u, x = b.linearGradient || b.radialGradient,
                        f, h, v, A, E, y = "";
                    b = b.stops;
                    var w, H = [],
                        r = function () {
                            g = ['\x3cfill colors\x3d"' + H.join(",") +
                                '" opacity\x3d"', v, '" o:opacity2\x3d"', h, '" type\x3d"', n, '" ', y,
                                    'focus\x3d"100%" method\x3d"any" /\x3e'];
                            D(k.prepVML(g), null, null, c)
                        };
                    f = b[0];
                    w = b[b.length - 1];
                    0 < f[0] && b.unshift([0, f[1]]);
                    1 > w[0] && b.push([1, w[1]]);
                    m(b, function (b, c) {
                        d.test(b[1]) ? (q = a.color(b[1]), C = q.get("rgb"), u = q.get("a")) : (C = b[1], u = 1);
                        H.push(100 * b[0] + "% " + C);
                        c ? (v = u, A = C) : (h = u, E = C)
                    });
                    if ("fill" === e) if ("gradient" === n) e = x.x1 || x[0] || 0, b = x.y1 || x[1] || 0, f = x.x2 || x[
                                2] || 0, x = x.y2 || x[3] || 0, y = 'angle\x3d"' + (90 - 180 * Math.atan((x - b) / (f -
                                e)) / Math.PI) + '"',
                    r();
                    else {
                        var p = x.r,
                            t = 2 * p,
                            B = 2 * p,
                            z = x.cx,
                            F = x.cy,
                            J = c.radialReference,
                            T, p = function () {
                                J && (T = l.getBBox(), z += (J[0] - T.x) / T.width - .5, F += (J[1] - T.y) / T.height -
                                    .5, t *= J[2] / T.width, B *= J[2] / T.height);
                                y = 'src\x3d"' + a.getOptions().global.VMLRadialGradientURL + '" size\x3d"' + t + "," +
                                    B + '" origin\x3d"0.5,0.5" position\x3d"' + z + "," + F + '" color2\x3d"' + E +
                                    '" ';
                                r()
                            };
                        l.added ? p() : l.onAdd = p;
                        p = A
                    } else p = C
                } else d.test(b) && "IMG" !== c.tagName ? (q = a.color(b), l[e + "-opacitySetter"](q.get("a"), e, c), p =
                        q.get("rgb")) : (p = c.getElementsByTagName(e),
                        p.length && (p[0].opacity = 1, p[0].type = "solid"), p = b);
                return p
            },
            prepVML: function (a) {
                var b = this.isIE8;
                a = a.join("");
                b ? (a = a.replace("/\x3e", ' xmlns\x3d"urn:schemas-microsoft-com:vml" /\x3e'), a = -1 === a.indexOf(
                    'style\x3d"') ? a.replace("/\x3e",
                    ' style\x3d"display:inline-block;behavior:url(#default#VML);" /\x3e') : a.replace('style\x3d"',
                    'style\x3d"display:inline-block;behavior:url(#default#VML);')) : a = a.replace("\x3c", "\x3chcv:");
                return a
            },
            text: E.prototype.html,
            path: function (a) {
                var b = {
                    coordsize: "10 10"
                };
                n(a) ? b.d =
                    a : w(a) && g(b, a);
                return this.createElement("shape").attr(b)
            },
            circle: function (a, b, c) {
                var e = this.symbol("circle");
                w(a) && (c = a.r, b = a.y, a = a.x);
                e.isCircle = !0;
                e.r = c;
                return e.attr({
                    x: a,
                    y: b
                })
            },
            g: function (a) {
                var b;
                a && (b = {
                    className: "highcharts-" + a,
                    "class": "highcharts-" + a
                });
                return this.createElement("div").attr(b)
            },
            image: function (a, b, c, e, k) {
                var l = this.createElement("img").attr({
                    src: a
                });
                1 < arguments.length && l.attr({
                    x: b,
                    y: c,
                    width: e,
                    height: k
                });
                return l
            },
            createElement: function (a) {
                return "rect" === a ? this.symbol(a) : E.prototype.createElement.call(this,
                    a)
            },
            invertChild: function (a, b) {
                var c = this;
                b = b.style;
                var l = "IMG" === a.tagName && a.style;
                B(a, {
                    flip: "x",
                    left: e(b.width) - (l ? e(l.top) : 1),
                    top: e(b.height) - (l ? e(l.left) : 1),
                    rotation: -90
                });
                m(a.childNodes, function (b) {
                    c.invertChild(b, a)
                })
            },
            symbols: {
                arc: function (a, b, c, e, k) {
                    var l = k.start,
                        q = k.end,
                        d = k.r || c || e;
                    c = k.innerR;
                    e = Math.cos(l);
                    var g = Math.sin(l),
                        p = Math.cos(q),
                        C = Math.sin(q);
                    if (0 === q - l) return ["x"];
                    l = ["wa", a - d, b - d, a + d, b + d, a + d * e, b + d * g, a + d * p, b + d * C];
                    k.open && !c && l.push("e", "M", a, b);
                    l.push("at", a - c, b - c, a + c, b + c, a + c * p,
                        b + c * C, a + c * e, b + c * g, "x", "e");
                    l.isArc = !0;
                    return l
                },
                circle: function (a, b, c, e, k) {
                    k && f(k.r) && (c = e = 2 * k.r);
                    k && k.isCircle && (a -= c / 2, b -= e / 2);
                    return ["wa", a, b, a + c, b + e, a + c, b + e / 2, a + c, b + e / 2, "e"]
                },
                rect: function (a, b, c, e, k) {
                    return E.prototype.symbols[f(k) && k.r ? "callout" : "square"].call(0, a, b, c, e, k)
                }
            }
        }, a.VMLRenderer = z = function () {
            this.init.apply(this, arguments)
        }, z.prototype = b(E.prototype, F), a.Renderer = z);
        E.prototype.measureSpanWidth = function (a, b) {
            var c = r.createElement("span");
            a = r.createTextNode(a);
            c.appendChild(a);
            B(c,
                b);
            this.box.appendChild(c);
            b = c.offsetWidth;
            t(c);
            return b
        }
    })(J);
    (function (a) {
        var z = a.correctFloat,
            F = a.defined,
            D = a.destroyObjectProperties,
            B = a.isNumber,
            f = a.merge,
            h = a.pick,
            t = a.deg2rad;
        a.Tick = function (a, m, d, g) {
            this.axis = a;
            this.pos = m;
            this.type = d || "";
            this.isNew = !0;
            d || g || this.addLabel()
        };
        a.Tick.prototype = {
            addLabel: function () {
                var a = this.axis,
                    m = a.options,
                    d = a.chart,
                    g = a.categories,
                    n = a.names,
                    y = this.pos,
                    w = m.labels,
                    b = a.tickPositions,
                    l = y === b[0],
                    e = y === b[b.length - 1],
                    n = g ? h(g[y], n[y], y) : y,
                    g = this.label,
                    b = b.info,
                    c;
                a.isDatetimeAxis &&
                    b && (c = m.dateTimeLabelFormats[b.higherRanks[y] || b.unitName]);
                this.isFirst = l;
                this.isLast = e;
                m = a.labelFormatter.call({
                    axis: a,
                    chart: d,
                    isFirst: l,
                    isLast: e,
                    dateTimeLabelFormat: c,
                    value: a.isLog ? z(a.lin2log(n)) : n
                });
                F(g) ? g && g.attr({
                    text: m
                }) : (this.labelLength = (this.label = g = F(m) && w.enabled ? d.renderer.text(m, 0, 0, w.useHTML).css(
                    f(w.style)).add(a.labelGroup) : null) && g.getBBox().width, this.rotation = 0)
            },
            getLabelSize: function () {
                return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
            },
            handleOverflow: function (a) {
                var m =
                    this.axis,
                    d = a.x,
                    g = m.chart.chartWidth,
                    n = m.chart.spacing,
                    f = h(m.labelLeft, Math.min(m.pos, n[3])),
                    n = h(m.labelRight, Math.max(m.pos + m.len, g - n[1])),
                    w = this.label,
                    b = this.rotation,
                    l = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[m.labelAlign],
                    e = w.getBBox().width,
                    c = m.getSlotWidth(),
                    E = c,
                    u = 1,
                    q, x = {};
                if (b) 0 > b && d - l * e < f ? q = Math.round(d / Math.cos(b * t) - f) : 0 < b && d + l * e > n && (q =
                        Math.round((g - d) / Math.cos(b * t)));
                else if (g = d + (1 - l) * e, d - l * e < f ? E = a.x + E * (1 - l) - f : g > n && (E = n - a.x + E * l,
                    u = -1), E = Math.min(c, E), E < c && "center" === m.labelAlign && (a.x += u * (c - E - l * (c -
                    Math.min(e,
                    E)))), e > E || m.autoRotation && (w.styles || {}).width) q = E;
                q && (x.width = q, (m.options.labels.style || {}).textOverflow || (x.textOverflow = "ellipsis"), w.css(
                    x))
            },
            getPosition: function (a, m, d, g) {
                var n = this.axis,
                    f = n.chart,
                    h = g && f.oldChartHeight || f.chartHeight;
                return {
                    x: a ? n.translate(m + d, null, null, g) + n.transB : n.left + n.offset + (n.opposite ? (g && f.oldChartWidth ||
                        f.chartWidth) - n.right - n.left : 0),
                    y: a ? h - n.bottom + n.offset - (n.opposite ? n.height : 0) : h - n.translate(m + d, null, null, g) - n
                        .transB
                }
            },
            getLabelPosition: function (a, m, d, g, n, f, h,
                b) {
                var l = this.axis,
                    e = l.transA,
                    c = l.reversed,
                    E = l.staggerLines,
                    u = l.tickRotCorr || {
                        x: 0,
                        y: 0
                    }, q = n.y;
                F(q) || (q = 0 === l.side ? d.rotation ? -8 : -d.getBBox().height : 2 === l.side ? u.y + 8 : Math.cos(d
                    .rotation * t) * (u.y - d.getBBox(!1, 0).height / 2));
                a = a + n.x + u.x - (f && g ? f * e * (c ? -1 : 1) : 0);
                m = m + q - (f && !g ? f * e * (c ? 1 : -1) : 0);
                E && (d = h / (b || 1) % E, l.opposite && (d = E - d - 1), m += l.labelOffset / E * d);
                return {
                    x: a,
                    y: Math.round(m)
                }
            },
            getMarkPath: function (a, m, d, g, n, f) {
                return f.crispLine(["M", a, m, "L", a + (n ? 0 : -d), m + (n ? d : 0)], g)
            },
            renderGridLine: function (a, m, d) {
                var g =
                    this.axis,
                    n = g.options,
                    f = this.gridLine,
                    h = {}, b = this.pos,
                    l = this.type,
                    e = g.tickmarkOffset,
                    c = g.chart.renderer,
                    E = l ? l + "Grid" : "grid",
                    u = n[E + "LineWidth"],
                    q = n[E + "LineColor"],
                    n = n[E + "LineDashStyle"];
                f || (h.stroke = q, h["stroke-width"] = u, n && (h.dashstyle = n), l || (h.zIndex = 1), a && (h.opacity =
                    0), this.gridLine = f = c.path().attr(h).addClass("highcharts-" + (l ? l + "-" : "") + "grid-line")
                    .add(g.gridGroup));
                if (!a && f && (a = g.getPlotLinePath(b + e, f.strokeWidth() * d, a, !0))) f[this.isNew ? "attr" :
                        "animate"]({
                        d: a,
                        opacity: m
                    })
            },
            renderMark: function (a,
                f, d) {
                var g = this.axis,
                    n = g.options,
                    m = g.chart.renderer,
                    w = this.type,
                    b = w ? w + "Tick" : "tick",
                    l = g.tickSize(b),
                    e = this.mark,
                    c = !e,
                    E = a.x;
                a = a.y;
                var u = h(n[b + "Width"], !w && g.isXAxis ? 1 : 0),
                    n = n[b + "Color"];
                l && (g.opposite && (l[0] = -l[0]), c && (this.mark = e = m.path().addClass("highcharts-" + (w ? w +
                    "-" : "") + "tick").add(g.axisGroup), e.attr({
                    stroke: n,
                    "stroke-width": u
                })), e[c ? "attr" : "animate"]({
                    d: this.getMarkPath(E, a, l[0], e.strokeWidth() * d, g.horiz, m),
                    opacity: f
                }))
            },
            renderLabel: function (a, f, d, g) {
                var n = this.axis,
                    m = n.horiz,
                    w = n.options,
                    b = this.label,
                    l = w.labels,
                    e = l.step,
                    c = n.tickmarkOffset,
                    E = !0,
                    u = a.x;
                a = a.y;
                b && B(u) && (b.xy = a = this.getLabelPosition(u, a, b, m, l, c, g, e), this.isFirst && !this.isLast && !
                    h(w.showFirstLabel, 1) || this.isLast && !this.isFirst && !h(w.showLastLabel, 1) ? E = !1 : !m || n
                    .isRadial || l.step || l.rotation || f || 0 === d || this.handleOverflow(a), e && g % e && (E = !1),
                    E && B(a.y) ? (a.opacity = d, b[this.isNew ? "attr" : "animate"](a)) : b.attr("y", -9999), this.isNew = !
                    1)
            },
            render: function (a, f, d) {
                var g = this.axis,
                    n = g.horiz,
                    m = this.getPosition(n, this.pos, g.tickmarkOffset, f),
                    w = m.x,
                    b =
                        m.y,
                    g = n && w === g.pos + g.len || !n && b === g.pos ? -1 : 1;
                d = h(d, 1);
                this.isActive = !0;
                this.renderGridLine(f, d, g);
                this.renderMark(m, d, g);
                this.renderLabel(m, f, d, a)
            },
            destroy: function () {
                D(this, this.axis)
            }
        }
    })(J);
    (function (a) {
        var z = a.arrayMax,
            F = a.arrayMin,
            D = a.defined,
            B = a.destroyObjectProperties,
            f = a.each,
            h = a.erase,
            t = a.merge,
            r = a.pick;
        a.PlotLineOrBand = function (a, d) {
            this.axis = a;
            d && (this.options = d, this.id = d.id)
        };
        a.PlotLineOrBand.prototype = {
            render: function () {
                var a = this,
                    d = a.axis,
                    g = d.horiz,
                    n = a.options,
                    f = n.label,
                    h = a.label,
                    b = n.to,
                    l = n.from,
                    e = n.value,
                    c = D(l) && D(b),
                    E = D(e),
                    u = a.svgElem,
                    q = !u,
                    x = [],
                    A, H = n.color,
                    k = r(n.zIndex, 0),
                    G = n.events,
                    x = {
                        "class": "highcharts-plot-" + (c ? "band " : "line ") + (n.className || "")
                    }, I = {}, L = d.chart.renderer,
                    K = c ? "bands" : "lines",
                    p = d.log2lin;
                d.isLog && (l = p(l), b = p(b), e = p(e));
                E ? (x = {
                    stroke: H,
                    "stroke-width": n.width
                }, n.dashStyle && (x.dashstyle = n.dashStyle)) : c && (H && (x.fill = H), n.borderWidth && (x.stroke =
                    n.borderColor, x["stroke-width"] = n.borderWidth));
                I.zIndex = k;
                K += "-" + k;
                (H = d.plotLinesAndBandsGroups[K]) || (d.plotLinesAndBandsGroups[K] =
                    H = L.g("plot-" + K).attr(I).add());
                q && (a.svgElem = u = L.path().attr(x).add(H));
                if (E) x = d.getPlotLinePath(e, u.strokeWidth());
                else if (c) x = d.getPlotBandPath(l, b, n);
                else return; if (q && x && x.length) {
                    if (u.attr({
                        d: x
                    }), G) for (A in n = function (b) {
                            u.on(b, function (c) {
                                G[b].apply(a, [c])
                            })
                        }, G) n(A)
                } else u && (x ? (u.show(), u.animate({
                        d: x
                    })) : (u.hide(), h && (a.label = h = h.destroy())));
                f && D(f.text) && x && x.length && 0 < d.width && 0 < d.height && !x.flat ? (f = t({
                    align: g && c && "center",
                    x: g ? !c && 4 : 10,
                    verticalAlign: !g && c && "middle",
                    y: g ? c ? 16 : 10 : c ? 6 : -4,
                    rotation: g && !c && 90
                }, f), this.renderLabel(f, x, c, k)) : h && h.hide();
                return a
            },
            renderLabel: function (a, d, g, n) {
                var f = this.label,
                    h = this.axis.chart.renderer;
                f || (f = {
                    align: a.textAlign || a.align,
                    rotation: a.rotation,
                    "class": "highcharts-plot-" + (g ? "band" : "line") + "-label " + (a.className || "")
                }, f.zIndex = n, this.label = f = h.text(a.text, 0, 0, a.useHTML).attr(f).add(), f.css(a.style));
                n = [d[1], d[4], g ? d[6] : d[1]];
                d = [d[2], d[5], g ? d[7] : d[2]];
                g = F(n);
                h = F(d);
                f.align(a, !1, {
                    x: g,
                    y: h,
                    width: z(n) - g,
                    height: z(d) - h
                });
                f.show()
            },
            destroy: function () {
                h(this.axis.plotLinesAndBands,
                    this);
                delete this.axis;
                B(this)
            }
        };
        a.AxisPlotLineOrBandExtension = {
            getPlotBandPath: function (a, d) {
                var g = this.getPlotLinePath(d, null, null, !0),
                    n = this.getPlotLinePath(a, null, null, !0),
                    f = this.horiz,
                    h = 1;
                a = a < this.min && d < this.min || a > this.max && d > this.max;
                n && g ? (a && (n.flat = n.toString() === g.toString(), h = 0), n.push(f && g[4] === n[4] ? g[4] + h :
                    g[4], f || g[5] !== n[5] ? g[5] : g[5] + h, f && g[1] === n[1] ? g[1] + h : g[1], f || g[2] !== n[2] ?
                    g[2] : g[2] + h)) : n = null;
                return n
            },
            addPlotBand: function (a) {
                return this.addPlotBandOrLine(a, "plotBands")
            },
            addPlotLine: function (a) {
                return this.addPlotBandOrLine(a,
                    "plotLines")
            },
            addPlotBandOrLine: function (f, d) {
                var g = (new a.PlotLineOrBand(this, f)).render(),
                    n = this.userOptions;
                g && (d && (n[d] = n[d] || [], n[d].push(f)), this.plotLinesAndBands.push(g));
                return g
            },
            removePlotBandOrLine: function (a) {
                for (var d = this.plotLinesAndBands, g = this.options, n = this.userOptions, m = d.length; m--;) d[m].id ===
                        a && d[m].destroy();
                f([g.plotLines || [], n.plotLines || [], g.plotBands || [], n.plotBands || []], function (d) {
                    for (m = d.length; m--;) d[m].id === a && h(d, d[m])
                })
            }
        }
    })(J);
    (function (a) {
        var z = a.addEvent,
            F = a.animObject,
            D = a.arrayMax,
            B = a.arrayMin,
            f = a.AxisPlotLineOrBandExtension,
            h = a.color,
            t = a.correctFloat,
            r = a.defaultOptions,
            m = a.defined,
            d = a.deg2rad,
            g = a.destroyObjectProperties,
            n = a.each,
            y = a.extend,
            w = a.fireEvent,
            b = a.format,
            l = a.getMagnitude,
            e = a.grep,
            c = a.inArray,
            E = a.isArray,
            u = a.isNumber,
            q = a.isString,
            x = a.merge,
            A = a.normalizeTickInterval,
            H = a.pick,
            k = a.PlotLineOrBand,
            G = a.removeEvent,
            I = a.splat,
            L = a.syncTimeout,
            K = a.Tick;
        a.Axis = function () {
            this.init.apply(this, arguments)
        };
        a.Axis.prototype = {
            defaultOptions: {
                dateTimeLabelFormats: {
                    millisecond: "%H:%M:%S.%L",
                    second: "%H:%M:%S",
                    minute: "%H:%M",
                    hour: "%H:%M",
                    day: "%e. %b",
                    week: "%e. %b",
                    month: "%b '%y",
                    year: "%Y"
                },
                endOnTick: !1,
                labels: {
                    enabled: !0,
                    style: {
                        color: "#666666",
                        cursor: "default",
                        fontSize: "11px"
                    },
                    x: 0
                },
                minPadding: .01,
                maxPadding: .01,
                minorTickLength: 2,
                minorTickPosition: "outside",
                startOfWeek: 1,
                startOnTick: !1,
                tickLength: 10,
                tickmarkPlacement: "between",
                tickPixelInterval: 100,
                tickPosition: "outside",
                title: {
                    align: "middle",
                    style: {
                        color: "#666666"
                    }
                },
                type: "linear",
                minorGridLineColor: "#f2f2f2",
                minorGridLineWidth: 1,
                minorTickColor: "#999999",
                lineColor: "#ccd6eb",
                lineWidth: 1,
                gridLineColor: "#e6e6e6",
                tickColor: "#ccd6eb"
            },
            defaultYAxisOptions: {
                endOnTick: !0,
                tickPixelInterval: 72,
                showLastLabel: !0,
                labels: {
                    x: -8
                },
                maxPadding: .05,
                minPadding: .05,
                startOnTick: !0,
                title: {
                    rotation: 270,
                    text: "Values"
                },
                stackLabels: {
                    enabled: !1,
                    formatter: function () {
                        return a.numberFormat(this.total, -1)
                    },
                    style: {
                        fontSize: "11px",
                        fontWeight: "bold",
                        color: "#000000",
                        textOutline: "1px contrast"
                    }
                },
                gridLineWidth: 1,
                lineWidth: 0
            },
            defaultLeftAxisOptions: {
                labels: {
                    x: -15
                },
                title: {
                    rotation: 270
                }
            },
            defaultRightAxisOptions: {
                labels: {
                    x: 15
                },
                title: {
                    rotation: 90
                }
            },
            defaultBottomAxisOptions: {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                title: {
                    rotation: 0
                }
            },
            defaultTopAxisOptions: {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                title: {
                    rotation: 0
                }
            },
            init: function (a, b) {
                var p = b.isX;
                this.chart = a;
                this.horiz = a.inverted ? !p : p;
                this.isXAxis = p;
                this.coll = this.coll || (p ? "xAxis" : "yAxis");
                this.opposite = b.opposite;
                this.side = b.side || (this.horiz ? this.opposite ? 0 : 2 : this.opposite ? 1 : 3);
                this.setOptions(b);
                var e = this.options,
                    k = e.type;
                this.labelFormatter = e.labels.formatter ||
                    this.defaultLabelFormatter;
                this.userOptions = b;
                this.minPixelPadding = 0;
                this.reversed = e.reversed;
                this.visible = !1 !== e.visible;
                this.zoomEnabled = !1 !== e.zoomEnabled;
                this.hasNames = "category" === k || !0 === e.categories;
                this.categories = e.categories || this.hasNames;
                this.names = this.names || [];
                this.plotLinesAndBandsGroups = {};
                this.isLog = "logarithmic" === k;
                this.isDatetimeAxis = "datetime" === k;
                this.positiveValuesOnly = this.isLog && !this.allowNegativeLog;
                this.isLinked = m(e.linkedTo);
                this.ticks = {};
                this.labelEdge = [];
                this.minorTicks = {};
                this.plotLinesAndBands = [];
                this.alternateBands = {};
                this.len = 0;
                this.minRange = this.userMinRange = e.minRange || e.maxZoom;
                this.range = e.range;
                this.offset = e.offset || 0;
                this.stacks = {};
                this.oldStacks = {};
                this.stacksTouched = 0;
                this.min = this.max = null;
                this.crosshair = H(e.crosshair, I(a.options.tooltip.crosshairs)[p ? 0 : 1], !1);
                var C;
                b = this.options.events; - 1 === c(this, a.axes) && (p ? a.axes.splice(a.xAxis.length, 0, this) : a.axes
                    .push(this), a[this.coll].push(this));
                this.series = this.series || [];
                a.inverted && p && void 0 === this.reversed &&
                    (this.reversed = !0);
                this.removePlotLine = this.removePlotBand = this.removePlotBandOrLine;
                for (C in b) z(this, C, b[C]);
                this.lin2log = e.linearToLogConverter || this.lin2log;
                this.isLog && (this.val2lin = this.log2lin, this.lin2val = this.lin2log)
            },
            setOptions: function (a) {
                this.options = x(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions, [this.defaultTopAxisOptions,
                        this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side],
                    x(r[this.coll], a))
            },
            defaultLabelFormatter: function () {
                var c =
                    this.axis,
                    e = this.value,
                    k = c.categories,
                    l = this.dateTimeLabelFormat,
                    d = r.lang,
                    q = d.numericSymbols,
                    d = d.numericSymbolMagnitude || 1E3,
                    v = q && q.length,
                    g, n = c.options.labels.format,
                    c = c.isLog ? Math.abs(e) : c.tickInterval;
                if (n) g = b(n, this);
                else if (k) g = e;
                else if (l) g = a.dateFormat(l, e);
                else if (v && 1E3 <= c) for (; v-- && void 0 === g;) k = Math.pow(d, v + 1), c >= k && 0 === 10 * e % k &&
                            null !== q[v] && 0 !== e && (g = a.numberFormat(e / k, -1) + q[v]);
                void 0 === g && (g = 1E4 <= Math.abs(e) ? a.numberFormat(e, -1) : a.numberFormat(e, -1, void 0, ""));
                return g
            },
            getSeriesExtremes: function () {
                var a =
                    this,
                    b = a.chart;
                a.hasVisibleSeries = !1;
                a.dataMin = a.dataMax = a.threshold = null;
                a.softThreshold = !a.isXAxis;
                a.buildStacks && a.buildStacks();
                n(a.series, function (c) {
                    if (c.visible || !b.options.chart.ignoreHiddenSeries) {
                        var p = c.options,
                            k = p.threshold,
                            C;
                        a.hasVisibleSeries = !0;
                        a.positiveValuesOnly && 0 >= k && (k = null);
                        if (a.isXAxis) p = c.xData, p.length && (c = B(p), u(c) || c instanceof Date || (p = e(p, function (
                                a) {
                                return u(a)
                            }), c = B(p)), a.dataMin = Math.min(H(a.dataMin, p[0]), c), a.dataMax = Math.max(H(a.dataMax,
                                p[0]), D(p)));
                        else if (c.getExtremes(),
                            C = c.dataMax, c = c.dataMin, m(c) && m(C) && (a.dataMin = Math.min(H(a.dataMin, c), c), a.dataMax =
                            Math.max(H(a.dataMax, C), C)), m(k) && (a.threshold = k), !p.softThreshold || a.positiveValuesOnly)
                            a.softThreshold = !1
                    }
                })
            },
            translate: function (a, b, c, e, k, l) {
                var p = this.linkedParent || this,
                    C = 1,
                    d = 0,
                    q = e ? p.oldTransA : p.transA;
                e = e ? p.oldMin : p.min;
                var g = p.minPixelPadding;
                k = (p.isOrdinal || p.isBroken || p.isLog && k) && p.lin2val;
                q || (q = p.transA);
                c && (C *= -1, d = p.len);
                p.reversed && (C *= -1, d -= C * (p.sector || p.len));
                b ? (a = (a * C + d - g) / q + e, k && (a = p.lin2val(a))) :
                    (k && (a = p.val2lin(a)), a = C * (a - e) * q + d + C * g + (u(l) ? q * l : 0));
                return a
            },
            toPixels: function (a, b) {
                return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 : this.pos)
            },
            toValue: function (a, b) {
                return this.translate(a - (b ? 0 : this.pos), !0, !this.horiz, null, !0)
            },
            getPlotLinePath: function (a, b, c, e, k) {
                var p = this.chart,
                    C = this.left,
                    l = this.top,
                    d, q, g = c && p.oldChartHeight || p.chartHeight,
                    n = c && p.oldChartWidth || p.chartWidth,
                    f;
                d = this.transB;
                var h = function (a, b, c) {
                    if (a < b || a > c) e ? a = Math.min(Math.max(b, a), c) : f = !0;
                    return a
                };
                k = H(k, this.translate(a,
                    null, null, c));
                a = c = Math.round(k + d);
                d = q = Math.round(g - k - d);
                u(k) ? this.horiz ? (d = l, q = g - this.bottom, a = c = h(a, C, C + this.width)) : (a = C, c = n -
                    this.right, d = q = h(d, l, l + this.height)) : f = !0;
                return f && !e ? null : p.renderer.crispLine(["M", a, d, "L", c, q], b || 1)
            },
            getLinearTickPositions: function (a, b, c) {
                var e, p = t(Math.floor(b / a) * a);
                c = t(Math.ceil(c / a) * a);
                var k = [];
                if (this.single) return [b];
                for (b = p; b <= c;) {
                    k.push(b);
                    b = t(b + a);
                    if (b === e) break;
                    e = b
                }
                return k
            },
            getMinorTickPositions: function () {
                var a = this,
                    b = a.options,
                    c = a.tickPositions,
                    e = a.minorTickInterval,
                    k = [],
                    l = a.pointRangePadding || 0,
                    d = a.min - l,
                    l = a.max + l,
                    q = l - d;
                if (q && q / e < a.len / 3) if (a.isLog) n(this.paddedTicks, function (b, c, p) {
                            c && k.push.apply(k, a.getLogTickPositions(e, p[c - 1], p[c], !0))
                        });
                    else if (a.isDatetimeAxis && "auto" === b.minorTickInterval) k = k.concat(a.getTimeTicks(a.normalizeTimeTickInterval(
                        e), d, l, b.startOfWeek));
                else for (b = d + (c[0] - d) % e; b <= l && b !== k[0]; b += e) k.push(b);
                0 !== k.length && a.trimTicks(k);
                return k
            },
            adjustForMinRange: function () {
                var a = this.options,
                    b = this.min,
                    c = this.max,
                    e, k = this.dataMax - this.dataMin >=
                        this.minRange,
                    l, d, q, g, f, u;
                this.isXAxis && void 0 === this.minRange && !this.isLog && (m(a.min) || m(a.max) ? this.minRange = null :
                    (n(this.series, function (a) {
                    g = a.xData;
                    for (d = f = a.xIncrement ? 1 : g.length - 1; 0 < d; d--) if (q = g[d] - g[d - 1], void 0 === l ||
                            q < l) l = q
                }), this.minRange = Math.min(5 * l, this.dataMax - this.dataMin)));
                c - b < this.minRange && (u = this.minRange, e = (u - c + b) / 2, e = [b - e, H(a.min, b - e)], k && (e[
                    2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin), b = D(e), c = [b + u, H(a.max, b + u)],
                    k && (c[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax),
                    c = B(c), c - b < u && (e[0] = c - u, e[1] = H(a.min, c - u), b = D(e)));
                this.min = b;
                this.max = c
            },
            getClosest: function () {
                var a;
                this.categories ? a = 1 : n(this.series, function (b) {
                    var c = b.closestPointRange,
                        e = b.visible || !b.chart.options.chart.ignoreHiddenSeries;
                    !b.noSharedTooltip && m(c) && e && (a = m(a) ? Math.min(a, c) : c)
                });
                return a
            },
            nameToX: function (a) {
                var b = E(this.categories),
                    e = b ? this.categories : this.names,
                    p = a.options.x,
                    k;
                a.series.requireSorting = !1;
                m(p) || (p = !1 === this.options.uniqueNames ? a.series.autoIncrement() : c(a.name, e)); - 1 === p ? b ||
                    (k = e.length) : k = p;
                void 0 !== k && (this.names[k] = a.name);
                return k
            },
            updateNames: function () {
                var a = this;
                0 < this.names.length && (this.names.length = 0, this.minRange = void 0, n(this.series || [], function (
                    b) {
                    b.xIncrement = null;
                    if (!b.points || b.isDirtyData) b.processData(), b.generatePoints();
                    n(b.points, function (c, e) {
                        var p;
                        c.options && (p = a.nameToX(c), void 0 !== p && p !== c.x && (c.x = p, b.xData[e] = p))
                    })
                }))
            },
            setAxisTranslation: function (a) {
                var b = this,
                    c = b.max - b.min,
                    e = b.axisPointRange || 0,
                    p, k = 0,
                    l = 0,
                    d = b.linkedParent,
                    g = !! b.categories,
                    f =
                        b.transA,
                    u = b.isXAxis;
                if (u || g || e) p = b.getClosest(), d ? (k = d.minPointOffset, l = d.pointRangePadding) : n(b.series, function (
                        a) {
                        var c = g ? 1 : u ? H(a.options.pointRange, p, 0) : b.axisPointRange || 0;
                        a = a.options.pointPlacement;
                        e = Math.max(e, c);
                        b.single || (k = Math.max(k, q(a) ? 0 : c / 2), l = Math.max(l, "on" === a ? 0 : c))
                    }), d = b.ordinalSlope && p ? b.ordinalSlope / p : 1, b.minPointOffset = k *= d, b.pointRangePadding =
                        l *= d, b.pointRange = Math.min(e, c), u && (b.closestPointRange = p);
                a && (b.oldTransA = f);
                b.translationSlope = b.transA = f = b.options.staticScale || b.len /
                    (c + l || 1);
                b.transB = b.horiz ? b.left : b.bottom;
                b.minPixelPadding = f * k
            },
            minFromRange: function () {
                return this.max - this.range
            },
            setTickInterval: function (b) {
                var c = this,
                    e = c.chart,
                    p = c.options,
                    k = c.isLog,
                    d = c.log2lin,
                    q = c.isDatetimeAxis,
                    g = c.isXAxis,
                    f = c.isLinked,
                    h = p.maxPadding,
                    G = p.minPadding,
                    x = p.tickInterval,
                    E = p.tickPixelInterval,
                    y = c.categories,
                    I = c.threshold,
                    L = c.softThreshold,
                    K, r, B, z;
                q || y || f || this.getTickAmount();
                B = H(c.userMin, p.min);
                z = H(c.userMax, p.max);
                f ? (c.linkedParent = e[c.coll][p.linkedTo], e = c.linkedParent.getExtremes(),
                    c.min = H(e.min, e.dataMin), c.max = H(e.max, e.dataMax), p.type !== c.linkedParent.options.type &&
                    a.error(11, 1)) : (!L && m(I) && (c.dataMin >= I ? (K = I, G = 0) : c.dataMax <= I && (r = I, h = 0)),
                    c.min = H(B, K, c.dataMin), c.max = H(z, r, c.dataMax));
                k && (c.positiveValuesOnly && !b && 0 >= Math.min(c.min, H(c.dataMin, c.min)) && a.error(10, 1), c.min =
                    t(d(c.min), 15), c.max = t(d(c.max), 15));
                c.range && m(c.max) && (c.userMin = c.min = B = Math.max(c.min, c.minFromRange()), c.userMax = z = c.max,
                    c.range = null);
                w(c, "foundExtremes");
                c.beforePadding && c.beforePadding();
                c.adjustForMinRange();
                !(y || c.axisPointRange || c.usePercentage || f) && m(c.min) && m(c.max) && (d = c.max - c.min) && (!m(
                    B) && G && (c.min -= d * G), !m(z) && h && (c.max += d * h));
                u(p.softMin) && (c.min = Math.min(c.min, p.softMin));
                u(p.softMax) && (c.max = Math.max(c.max, p.softMax));
                u(p.floor) && (c.min = Math.max(c.min, p.floor));
                u(p.ceiling) && (c.max = Math.min(c.max, p.ceiling));
                L && m(c.dataMin) && (I = I || 0, !m(B) && c.min < I && c.dataMin >= I ? c.min = I : !m(z) && c.max > I &&
                    c.dataMax <= I && (c.max = I));
                c.tickInterval = c.min === c.max || void 0 === c.min || void 0 === c.max ? 1 : f && !x && E === c.linkedParent
                    .options.tickPixelInterval ?
                    x = c.linkedParent.tickInterval : H(x, this.tickAmount ? (c.max - c.min) / Math.max(this.tickAmount -
                    1, 1) : void 0, y ? 1 : (c.max - c.min) * E / Math.max(c.len, E));
                g && !b && n(c.series, function (a) {
                    a.processData(c.min !== c.oldMin || c.max !== c.oldMax)
                });
                c.setAxisTranslation(!0);
                c.beforeSetTickPositions && c.beforeSetTickPositions();
                c.postProcessTickInterval && (c.tickInterval = c.postProcessTickInterval(c.tickInterval));
                c.pointRange && !x && (c.tickInterval = Math.max(c.pointRange, c.tickInterval));
                b = H(p.minTickInterval, c.isDatetimeAxis && c.closestPointRange);
                !x && c.tickInterval < b && (c.tickInterval = b);
                q || k || x || (c.tickInterval = A(c.tickInterval, null, l(c.tickInterval), H(p.allowDecimals, !(.5 < c
                    .tickInterval && 5 > c.tickInterval && 1E3 < c.max && 9999 > c.max)), !! this.tickAmount));
                this.tickAmount || (c.tickInterval = c.unsquish());
                this.setTickPositions()
            },
            setTickPositions: function () {
                var a = this.options,
                    b, c = a.tickPositions,
                    e = a.tickPositioner,
                    k = a.startOnTick,
                    l = a.endOnTick;
                this.tickmarkOffset = this.categories && "between" === a.tickmarkPlacement && 1 === this.tickInterval ?
                    .5 : 0;
                this.minorTickInterval =
                    "auto" === a.minorTickInterval && this.tickInterval ? this.tickInterval / 5 : a.minorTickInterval;
                this.single = this.min === this.max && m(this.min) && !this.tickAmount && !1 !== a.allowDecimals;
                this.tickPositions = b = c && c.slice();
                !b && (b = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, a.units),
                    this.min, this.max, a.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ?
                    this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval,
                    this.min, this.max), b.length > this.len && (b = [b[0], b.pop()]), this.tickPositions = b, e && (e =
                    e.apply(this, [this.min, this.max]))) && (this.tickPositions = b = e);
                this.paddedTicks = b.slice(0);
                this.trimTicks(b, k, l);
                this.isLinked || (this.single && (this.min -= .5, this.max += .5), c || e || this.adjustTickAmount())
            },
            trimTicks: function (a, b, c) {
                var e = a[0],
                    p = a[a.length - 1],
                    k = this.minPointOffset || 0;
                if (!this.isLinked) {
                    if (b && -Infinity !== e) this.min = e;
                    else for (; this.min - k > a[0];) a.shift(); if (c) this.max = p;
                    else for (; this.max + k < a[a.length - 1];) a.pop();
                    0 === a.length && m(e) && a.push((p + e) / 2)
                }
            },
            alignToOthers: function () {
                var a = {}, b, c = this.options;
                !1 === this.chart.options.chart.alignTicks || !1 === c.alignTicks || this.isLog || n(this.chart[this.coll], function (
                    c) {
                    var e = c.options,
                        e = [c.horiz ? e.left : e.top, e.width, e.height, e.pane].join();
                    c.series.length && (a[e] ? b = !0 : a[e] = 1)
                });
                return b
            },
            getTickAmount: function () {
                var a = this.options,
                    b = a.tickAmount,
                    c = a.tickPixelInterval;
                !m(a.tickInterval) && this.len < c && !this.isRadial && !this.isLog && a.startOnTick && a.endOnTick &&
                    (b = 2);
                !b && this.alignToOthers() &&
                    (b = Math.ceil(this.len / c) + 1);
                4 > b && (this.finalTickAmt = b, b = 5);
                this.tickAmount = b
            },
            adjustTickAmount: function () {
                var a = this.tickInterval,
                    b = this.tickPositions,
                    c = this.tickAmount,
                    e = this.finalTickAmt,
                    k = b && b.length;
                if (k < c) {
                    for (; b.length < c;) b.push(t(b[b.length - 1] + a));
                    this.transA *= (k - 1) / (c - 1);
                    this.max = b[b.length - 1]
                } else k > c && (this.tickInterval *= 2, this.setTickPositions()); if (m(e)) {
                    for (a = c = b.length; a--;)(3 === e && 1 === a % 2 || 2 >= e && 0 < a && a < c - 1) && b.splice(a,
                            1);
                    this.finalTickAmt = void 0
                }
            },
            setScale: function () {
                var a, b;
                this.oldMin =
                    this.min;
                this.oldMax = this.max;
                this.oldAxisLength = this.len;
                this.setAxisSize();
                b = this.len !== this.oldAxisLength;
                n(this.series, function (b) {
                    if (b.isDirtyData || b.isDirty || b.xAxis.isDirty) a = !0
                });
                b || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !==
                    this.oldUserMax || this.alignToOthers() ? (this.resetStacks && this.resetStacks(), this.forceRedraw = !
                    1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax =
                    this.userMax, this.isDirty || (this.isDirty =
                    b || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks()
            },
            setExtremes: function (a, b, c, e, k) {
                var p = this,
                    l = p.chart;
                c = H(c, !0);
                n(p.series, function (a) {
                    delete a.kdTree
                });
                k = y(k, {
                    min: a,
                    max: b
                });
                w(p, "setExtremes", k, function () {
                    p.userMin = a;
                    p.userMax = b;
                    p.eventArgs = k;
                    c && l.redraw(e)
                })
            },
            zoom: function (a, b) {
                var c = this.dataMin,
                    e = this.dataMax,
                    p = this.options,
                    k = Math.min(c, H(p.min, c)),
                    p = Math.max(e, H(p.max, e));
                if (a !== this.min || b !== this.max) this.allowZoomOutside || (m(c) && (a < k && (a = k), a > p && (a =
                        p)),
                        m(e) && (b < k && (b = k), b > p && (b = p))), this.displayBtn = void 0 !== a || void 0 !== b,
                        this.setExtremes(a, b, !1, void 0, {
                        trigger: "zoom"
                    });
                return !0
            },
            setAxisSize: function () {
                var a = this.chart,
                    b = this.options,
                    c = b.offsets || [0, 0, 0, 0],
                    e = this.horiz,
                    k = H(b.width, a.plotWidth - c[3] + c[1]),
                    l = H(b.height, a.plotHeight - c[0] + c[2]),
                    d = H(b.top, a.plotTop + c[0]),
                    b = H(b.left, a.plotLeft + c[3]),
                    c = /%$/;
                c.test(l) && (l = Math.round(parseFloat(l) / 100 * a.plotHeight));
                c.test(d) && (d = Math.round(parseFloat(d) / 100 * a.plotHeight + a.plotTop));
                this.left = b;
                this.top = d;
                this.width = k;
                this.height = l;
                this.bottom = a.chartHeight - l - d;
                this.right = a.chartWidth - k - b;
                this.len = Math.max(e ? k : l, 0);
                this.pos = e ? b : d
            },
            getExtremes: function () {
                var a = this.isLog,
                    b = this.lin2log;
                return {
                    min: a ? t(b(this.min)) : this.min,
                    max: a ? t(b(this.max)) : this.max,
                    dataMin: this.dataMin,
                    dataMax: this.dataMax,
                    userMin: this.userMin,
                    userMax: this.userMax
                }
            },
            getThreshold: function (a) {
                var b = this.isLog,
                    c = this.lin2log,
                    e = b ? c(this.min) : this.min,
                    b = b ? c(this.max) : this.max;
                null === a ? a = e : e > a ? a = e : b < a && (a = b);
                return this.translate(a, 0,
                    1, 0, 1)
            },
            autoLabelAlign: function (a) {
                a = (H(a, 0) - 90 * this.side + 720) % 360;
                return 15 < a && 165 > a ? "right" : 195 < a && 345 > a ? "left" : "center"
            },
            tickSize: function (a) {
                var b = this.options,
                    c = b[a + "Length"],
                    e = H(b[a + "Width"], "tick" === a && this.isXAxis ? 1 : 0);
                if (e && c) return "inside" === b[a + "Position"] && (c = -c), [c, e]
            },
            labelMetrics: function () {
                return this.chart.renderer.fontMetrics(this.options.labels.style && this.options.labels.style.fontSize,
                    this.ticks[0] && this.ticks[0].label)
            },
            unsquish: function () {
                var a = this.options.labels,
                    b = this.horiz,
                    c = this.tickInterval,
                    e = c,
                    k = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / c),
                    l, q = a.rotation,
                    g = this.labelMetrics(),
                    f, u = Number.MAX_VALUE,
                    h, G = function (a) {
                        a /= k || 1;
                        a = 1 < a ? Math.ceil(a) : 1;
                        return a * c
                    };
                b ? (h = !a.staggerLines && !a.step && (m(q) ? [q] : k < H(a.autoRotationLimit, 80) && a.autoRotation)) &&
                    n(h, function (a) {
                    var b;
                    if (a === q || a && -90 <= a && 90 >= a) f = G(Math.abs(g.h / Math.sin(d * a))), b = f + Math.abs(a /
                            360), b < u && (u = b, l = a, e = f)
                }) : a.step || (e = G(g.h));
                this.autoRotation = h;
                this.labelRotation = H(l, q);
                return e
            },
            getSlotWidth: function () {
                var a =
                    this.chart,
                    b = this.horiz,
                    c = this.options.labels,
                    e = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1),
                    k = a.margin[3];
                return b && 2 > (c.step || 0) && !c.rotation && (this.staggerLines || 1) * this.len / e || !b && (k &&
                    k - a.spacing[3] || .33 * a.chartWidth)
            },
            renderUnsquish: function () {
                var a = this.chart,
                    b = a.renderer,
                    c = this.tickPositions,
                    e = this.ticks,
                    k = this.options.labels,
                    l = this.horiz,
                    d = this.getSlotWidth(),
                    g = Math.max(1, Math.round(d - 2 * (k.padding || 5))),
                    f = {}, u = this.labelMetrics(),
                    h = k.style && k.style.textOverflow,
                    G, m = 0,
                    E, A;
                q(k.rotation) ||
                    (f.rotation = k.rotation || 0);
                n(c, function (a) {
                    (a = e[a]) && a.labelLength > m && (m = a.labelLength)
                });
                this.maxLabelLength = m;
                if (this.autoRotation) m > g && m > u.h ? f.rotation = this.labelRotation : this.labelRotation = 0;
                else if (d && (G = {
                    width: g + "px"
                }, !h)) for (G.textOverflow = "clip", E = c.length; !l && E--;) if (A = c[E], g = e[A].label) g.styles &&
                                "ellipsis" === g.styles.textOverflow ? g.css({
                                textOverflow: "clip"
                            }) : e[A].labelLength > d && g.css({
                                width: d + "px"
                            }), g.getBBox().height > this.len / c.length - (u.h - u.f) && (g.specCss = {
                                textOverflow: "ellipsis"
                            });
                f.rotation &&
                    (G = {
                    width: (m > .5 * a.chartHeight ? .33 * a.chartHeight : a.chartHeight) + "px"
                }, h || (G.textOverflow = "ellipsis"));
                if (this.labelAlign = k.align || this.autoLabelAlign(this.labelRotation)) f.align = this.labelAlign;
                n(c, function (a) {
                    var b = (a = e[a]) && a.label;
                    b && (b.attr(f), G && b.css(x(G, b.specCss)), delete b.specCss, a.rotation = f.rotation)
                });
                this.tickRotCorr = b.rotCorr(u.b, this.labelRotation || 0, 0 !== this.side)
            },
            hasData: function () {
                return this.hasVisibleSeries || m(this.min) && m(this.max) && !! this.tickPositions
            },
            addTitle: function (a) {
                var b =
                    this.chart.renderer,
                    c = this.horiz,
                    e = this.opposite,
                    k = this.options.title,
                    p;
                this.axisTitle || ((p = k.textAlign) || (p = (c ? {
                    low: "left",
                    middle: "center",
                    high: "right"
                } : {
                    low: e ? "right" : "left",
                    middle: "center",
                    high: e ? "left" : "right"
                })[k.align]), this.axisTitle = b.text(k.text, 0, 0, k.useHTML).attr({
                    zIndex: 7,
                    rotation: k.rotation || 0,
                    align: p
                }).addClass("highcharts-axis-title").css(k.style).add(this.axisGroup), this.axisTitle.isNew = !0);
                this.axisTitle[a ? "show" : "hide"](!0)
            },
            generateTick: function (a) {
                var b = this.ticks;
                b[a] ? b[a].addLabel() :
                    b[a] = new K(this, a)
            },
            getOffset: function () {
                var a = this,
                    b = a.chart,
                    c = b.renderer,
                    e = a.options,
                    k = a.tickPositions,
                    l = a.ticks,
                    d = a.horiz,
                    g = a.side,
                    q = b.inverted ? [1, 0, 3, 2][g] : g,
                    f, u, h = 0,
                    G, x = 0,
                    E = e.title,
                    A = e.labels,
                    w = 0,
                    I = b.axisOffset,
                    b = b.clipOffset,
                    y = [-1, 1, 1, -1][g],
                    L, K = e.className,
                    r = a.axisParent,
                    t = this.tickSize("tick");
                f = a.hasData();
                a.showAxis = u = f || H(e.showEmpty, !0);
                a.staggerLines = a.horiz && A.staggerLines;
                a.axisGroup || (a.gridGroup = c.g("grid").attr({
                    zIndex: e.gridZIndex || 1
                }).addClass("highcharts-" + this.coll.toLowerCase() +
                    "-grid " + (K || "")).add(r), a.axisGroup = c.g("axis").attr({
                    zIndex: e.zIndex || 2
                }).addClass("highcharts-" + this.coll.toLowerCase() + " " + (K || "")).add(r), a.labelGroup = c.g(
                    "axis-labels").attr({
                    zIndex: A.zIndex || 7
                }).addClass("highcharts-" + a.coll.toLowerCase() + "-labels " + (K || "")).add(r));
                if (f || a.isLinked) n(k, function (b, c) {
                        a.generateTick(b, c)
                    }), a.renderUnsquish(), !1 === A.reserveSpace || 0 !== g && 2 !== g && {
                        1: "left",
                        3: "right"
                }[g] !== a.labelAlign && "center" !== a.labelAlign || n(k, function (a) {
                    w = Math.max(l[a].getLabelSize(), w)
                }),
                a.staggerLines && (w *= a.staggerLines, a.labelOffset = w * (a.opposite ? -1 : 1));
                else for (L in l) l[L].destroy(), delete l[L];
                E && E.text && !1 !== E.enabled && (a.addTitle(u), u && (h = a.axisTitle.getBBox()[d ? "height" :
                    "width"], G = E.offset, x = m(G) ? 0 : H(E.margin, d ? 5 : 10)));
                a.renderLine();
                a.offset = y * H(e.offset, I[g]);
                a.tickRotCorr = a.tickRotCorr || {
                    x: 0,
                    y: 0
                };
                c = 0 === g ? -a.labelMetrics().h : 2 === g ? a.tickRotCorr.y : 0;
                x = Math.abs(w) + x;
                w && (x = x - c + y * (d ? H(A.y, a.tickRotCorr.y + 8 * y) : A.x));
                a.axisTitleMargin = H(G, x);
                I[g] = Math.max(I[g], a.axisTitleMargin +
                    h + y * a.offset, x, f && k.length && t ? t[0] + y * a.offset : 0);
                e = e.offset ? 0 : 2 * Math.floor(a.axisLine.strokeWidth() / 2);
                b[q] = Math.max(b[q], e)
            },
            getLinePath: function (a) {
                var b = this.chart,
                    c = this.opposite,
                    e = this.offset,
                    k = this.horiz,
                    p = this.left + (c ? this.width : 0) + e,
                    e = b.chartHeight - this.bottom - (c ? this.height : 0) + e;
                c && (a *= -1);
                return b.renderer.crispLine(["M", k ? this.left : p, k ? e : this.top, "L", k ? b.chartWidth - this.right :
                        p, k ? e : b.chartHeight - this.bottom], a)
            },
            renderLine: function () {
                this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup),
                    this.axisLine.attr({
                    stroke: this.options.lineColor,
                    "stroke-width": this.options.lineWidth,
                    zIndex: 7
                }))
            },
            getTitlePosition: function () {
                var a = this.horiz,
                    b = this.left,
                    c = this.top,
                    e = this.len,
                    k = this.options.title,
                    l = a ? b : c,
                    d = this.opposite,
                    g = this.offset,
                    q = k.x || 0,
                    f = k.y || 0,
                    n = this.chart.renderer.fontMetrics(k.style && k.style.fontSize, this.axisTitle).f,
                    e = {
                        low: l + (a ? 0 : e),
                        middle: l + e / 2,
                        high: l + (a ? e : 0)
                    }[k.align],
                    b = (a ? c + this.height : b) + (a ? 1 : -1) * (d ? -1 : 1) * this.axisTitleMargin + (2 === this.side ?
                        n : 0);
                return {
                    x: a ? e + q : b + (d ? this.width :
                        0) + g + q,
                    y: a ? b + f - (d ? this.height : 0) + g : e + f
                }
            },
            renderMinorTick: function (a) {
                var b = this.chart.hasRendered && u(this.oldMin),
                    c = this.minorTicks;
                c[a] || (c[a] = new K(this, a, "minor"));
                b && c[a].isNew && c[a].render(null, !0);
                c[a].render(null, !1, 1)
            },
            renderTick: function (a, b) {
                var c = this.isLinked,
                    e = this.ticks,
                    k = this.chart.hasRendered && u(this.oldMin);
                if (!c || a >= this.min && a <= this.max) e[a] || (e[a] = new K(this, a)), k && e[a].isNew && e[a].render(
                        b, !0, .1), e[a].render(b)
            },
            render: function () {
                var a = this,
                    b = a.chart,
                    c = a.options,
                    e = a.isLog,
                    l = a.lin2log,
                    d = a.isLinked,
                    g = a.tickPositions,
                    q = a.axisTitle,
                    f = a.ticks,
                    u = a.minorTicks,
                    h = a.alternateBands,
                    G = c.stackLabels,
                    x = c.alternateGridColor,
                    m = a.tickmarkOffset,
                    E = a.axisLine,
                    A = a.showAxis,
                    w = F(b.renderer.globalAnimation),
                    I, y;
                a.labelEdge.length = 0;
                a.overlap = !1;
                n([f, u, h], function (a) {
                    for (var b in a) a[b].isActive = !1
                });
                if (a.hasData() || d) a.minorTickInterval && !a.categories && n(a.getMinorTickPositions(), function (b) {
                        a.renderMinorTick(b)
                    }), g.length && (n(g, function (b, c) {
                        a.renderTick(b, c)
                    }), m && (0 === a.min || a.single) && (f[-1] || (f[-1] =
                        new K(a, -1, null, !0)), f[-1].render(-1))), x && n(g, function (c, p) {
                        y = void 0 !== g[p + 1] ? g[p + 1] + m : a.max - m;
                        0 === p % 2 && c < a.max && y <= a.max + (b.polar ? -m : m) && (h[c] || (h[c] = new k(a)), I =
                            c + m, h[c].options = {
                            from: e ? l(I) : I,
                            to: e ? l(y) : y,
                            color: x
                        }, h[c].render(), h[c].isActive = !0)
                    }), a._addedPlotLB || (n((c.plotLines || []).concat(c.plotBands || []), function (b) {
                        a.addPlotBandOrLine(b)
                    }), a._addedPlotLB = !0);
                n([f, u, h], function (a) {
                    var c, e, k = [],
                        l = w.duration;
                    for (c in a) a[c].isActive || (a[c].render(c, !1, 0), a[c].isActive = !1, k.push(c));
                    L(function () {
                        for (e =
                            k.length; e--;) a[k[e]] && !a[k[e]].isActive && (a[k[e]].destroy(), delete a[k[e]])
                    }, a !== h && b.hasRendered && l ? l : 0)
                });
                E && (E[E.isPlaced ? "animate" : "attr"]({
                    d: this.getLinePath(E.strokeWidth())
                }), E.isPlaced = !0, E[A ? "show" : "hide"](!0));
                q && A && (q[q.isNew ? "attr" : "animate"](a.getTitlePosition()), q.isNew = !1);
                G && G.enabled && a.renderStackTotals();
                a.isDirty = !1
            },
            redraw: function () {
                this.visible && (this.render(), n(this.plotLinesAndBands, function (a) {
                    a.render()
                }));
                n(this.series, function (a) {
                    a.isDirty = !0
                })
            },
            keepProps: "extKey hcEvents names series userMax userMin".split(" "),
            destroy: function (a) {
                var b = this,
                    e = b.stacks,
                    k, l = b.plotLinesAndBands,
                    p, d;
                a || G(b);
                for (k in e) g(e[k]), e[k] = null;
                n([b.ticks, b.minorTicks, b.alternateBands], function (a) {
                    g(a)
                });
                if (l) for (a = l.length; a--;) l[a].destroy();
                n("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "), function (a) {
                    b[a] && (b[a] = b[a].destroy())
                });
                for (p in b.plotLinesAndBandsGroups) b.plotLinesAndBandsGroups[p] = b.plotLinesAndBandsGroups[p].destroy();
                for (d in b) b.hasOwnProperty(d) && -1 === c(d, b.keepProps) && delete b[d]
            },
            drawCrosshair: function (a, b) {
                var c, e = this.crosshair,
                    k = H(e.snap, !0),
                    l, d = this.cross;
                a || (a = this.cross && this.cross.e);
                this.crosshair && !1 !== (m(b) || !k) ? (k ? m(b) && (l = this.isXAxis ? b.plotX : this.len - b.plotY) :
                    l = a && (this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos), m(l) && (c = this.getPlotLinePath(
                    b && (this.isXAxis ? b.x : H(b.stackY, b.y)), null, null, null, l) || null), m(c) ? (b = this.categories && !
                    this.isRadial, d || (this.cross = d = this.chart.renderer.path().addClass(
                    "highcharts-crosshair highcharts-crosshair-" + (b ? "category " :
                    "thin ") + e.className).attr({
                    zIndex: H(e.zIndex, 2)
                }).add(), d.attr({
                    stroke: e.color || (b ? h("#ccd6eb").setOpacity(.25).get() : "#cccccc"),
                    "stroke-width": H(e.width, 1)
                }), e.dashStyle && d.attr({
                    dashstyle: e.dashStyle
                })), d.show().attr({
                    d: c
                }), b && !e.width && d.attr({
                    "stroke-width": this.transA
                }), this.cross.e = a) : this.hideCrosshair()) : this.hideCrosshair()
            },
            hideCrosshair: function () {
                this.cross && this.cross.hide()
            }
        };
        y(a.Axis.prototype, f)
    })(J);
    (function (a) {
        var z = a.Axis,
            F = a.getMagnitude,
            D = a.map,
            B = a.normalizeTickInterval,
            f = a.pick;
        z.prototype.getLogTickPositions = function (a, t, r, m) {
            var d = this.options,
                g = this.len,
                n = this.lin2log,
                h = this.log2lin,
                w = [];
            m || (this._minorAutoInterval = null);
            if (.5 <= a) a = Math.round(a), w = this.getLinearTickPositions(a, t, r);
            else if (.08 <= a) for (var g = Math.floor(t), b, l, e, c, E, d = .3 < a ? [1, 2, 4] : .15 < a ? [1, 2, 4,
                            6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; g < r + 1 && !E; g++) for (l = d.length, b = 0; b < l && !
                        E; b++) e = h(n(g) * d[b]), e > t && (!m || c <= r) && void 0 !== c && w.push(c), c > r && (E = !
                            0), c = e;
            else t = n(t), r = n(r), a = d[m ? "minorTickInterval" : "tickInterval"], a = f("auto" ===
                    a ? null : a, this._minorAutoInterval, d.tickPixelInterval / (m ? 5 : 1) * (r - t) / ((m ? g / this
                    .tickPositions.length : g) || 1)), a = B(a, null, F(a)), w = D(this.getLinearTickPositions(a, t, r),
                    h), m || (this._minorAutoInterval = a / 5);
            m || (this.tickInterval = a);
            return w
        };
        z.prototype.log2lin = function (a) {
            return Math.log(a) / Math.LN10
        };
        z.prototype.lin2log = function (a) {
            return Math.pow(10, a)
        }
    })(J);
    (function (a) {
        var z = a.dateFormat,
            F = a.each,
            D = a.extend,
            B = a.format,
            f = a.isNumber,
            h = a.map,
            t = a.merge,
            r = a.pick,
            m = a.splat,
            d = a.syncTimeout,
            g = a.timeUnits;
        a.Tooltip = function () {
            this.init.apply(this, arguments)
        };
        a.Tooltip.prototype = {
            init: function (a, d) {
                this.chart = a;
                this.options = d;
                this.crosshairs = [];
                this.now = {
                    x: 0,
                    y: 0
                };
                this.isHidden = !0;
                this.split = d.split && !a.inverted;
                this.shared = d.shared || this.split
            },
            cleanSplit: function (a) {
                F(this.chart.series, function (d) {
                    var g = d && d.tt;
                    g && (!g.isActive || a ? d.tt = g.destroy() : g.isActive = !1)
                })
            },
            getLabel: function () {
                var a = this.chart.renderer,
                    d = this.options;
                this.label || (this.split ? this.label = a.g("tooltip") : (this.label = a.label("", 0, 0, d.shape ||
                    "callout", null, null, d.useHTML, null, "tooltip").attr({
                    padding: d.padding,
                    r: d.borderRadius
                }), this.label.attr({
                    fill: d.backgroundColor,
                    "stroke-width": d.borderWidth
                }).css(d.style).shadow(d.shadow)), this.label.attr({
                    zIndex: 8
                }).add());
                return this.label
            },
            update: function (a) {
                this.destroy();
                this.init(this.chart, t(!0, this.options, a))
            },
            destroy: function () {
                this.label && (this.label = this.label.destroy());
                this.split && this.tt && (this.cleanSplit(this.chart, !0), this.tt = this.tt.destroy());
                clearTimeout(this.hideTimer);
                clearTimeout(this.tooltipTimeout)
            },
            move: function (a, d, g, b) {
                var l = this,
                    e = l.now,
                    c = !1 !== l.options.animation && !l.isHidden && (1 < Math.abs(a - e.x) || 1 < Math.abs(d - e.y)),
                    f = l.followPointer || 1 < l.len;
                D(e, {
                    x: c ? (2 * e.x + a) / 3 : a,
                    y: c ? (e.y + d) / 2 : d,
                    anchorX: f ? void 0 : c ? (2 * e.anchorX + g) / 3 : g,
                    anchorY: f ? void 0 : c ? (e.anchorY + b) / 2 : b
                });
                l.getLabel().attr(e);
                c && (clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function () {
                    l && l.move(a, d, g, b)
                }, 32))
            },
            hide: function (a) {
                var g = this;
                clearTimeout(this.hideTimer);
                a = r(a, this.options.hideDelay, 500);
                this.isHidden || (this.hideTimer =
                    d(function () {
                    g.getLabel()[a ? "fadeOut" : "hide"]();
                    g.isHidden = !0
                }, a))
            },
            getAnchor: function (a, d) {
                var g, b = this.chart,
                    l = b.inverted,
                    e = b.plotTop,
                    c = b.plotLeft,
                    f = 0,
                    u = 0,
                    q, n;
                a = m(a);
                g = a[0].tooltipPos;
                this.followPointer && d && (void 0 === d.chartX && (d = b.pointer.normalize(d)), g = [d.chartX - b.plotLeft,
                        d.chartY - e]);
                g || (F(a, function (a) {
                    q = a.series.yAxis;
                    n = a.series.xAxis;
                    f += a.plotX + (!l && n ? n.left - c : 0);
                    u += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!l && q ? q.top - e : 0)
                }), f /= a.length, u /= a.length, g = [l ? b.plotWidth - u : f, this.shared &&
                    !l && 1 < a.length && d ? d.chartY - e : l ? b.plotHeight - f : u]);
                return h(g, Math.round)
            },
            getPosition: function (a, d, g) {
                var b = this.chart,
                    l = this.distance,
                    e = {}, c = g.h || 0,
                    f, u = ["y", b.chartHeight, d, g.plotY + b.plotTop, b.plotTop, b.plotTop + b.plotHeight],
                    q = ["x", b.chartWidth, a, g.plotX + b.plotLeft, b.plotLeft, b.plotLeft + b.plotWidth],
                    n = !this.followPointer && r(g.ttBelow, !b.inverted === !! g.negative),
                    h = function (a, b, k, d, g, q) {
                        var p = k < d - l,
                            f = d + l + k < b,
                            u = d - l - k;
                        d += l;
                        if (n && f) e[a] = d;
                        else if (!n && p) e[a] = u;
                        else if (p) e[a] = Math.min(q - k, 0 > u - c ? u : u - c);
                        else if (f) e[a] = Math.max(g, d + c + k > b ? d : d + c);
                        else return !1
                    }, m = function (a, b, c, k) {
                        var d;
                        k < l || k > b - l ? d = !1 : e[a] = k < c / 2 ? 1 : k > b - c / 2 ? b - c - 2 : k - c / 2;
                        return d
                    }, k = function (a) {
                        var b = u;
                        u = q;
                        q = b;
                        f = a
                    }, G = function () {
                        !1 !== h.apply(0, u) ? !1 !== m.apply(0, q) || f || (k(!0), G()) : f ? e.x = e.y = 0 : (k(!0),
                            G())
                    };
                (b.inverted || 1 < this.len) && k();
                G();
                return e
            },
            defaultFormatter: function (a) {
                var d = this.points || m(this),
                    g;
                g = [a.tooltipFooterHeaderFormatter(d[0])];
                g = g.concat(a.bodyFormatter(d));
                g.push(a.tooltipFooterHeaderFormatter(d[0], !0));
                return g
            },
            refresh: function (a,
                d) {
                var g, b = this.options,
                    l, e = a,
                    c, f = {}, u = [];
                g = b.formatter || this.defaultFormatter;
                var f = this.shared,
                    q;
                clearTimeout(this.hideTimer);
                this.followPointer = m(e)[0].series.tooltipOptions.followPointer;
                c = this.getAnchor(e, d);
                d = c[0];
                l = c[1];
                !f || e.series && e.series.noSharedTooltip ? f = e.getLabelConfig() : (F(e, function (a) {
                    a.setState("hover");
                    u.push(a.getLabelConfig())
                }), f = {
                    x: e[0].category,
                    y: e[0].y
                }, f.points = u, e = e[0]);
                this.len = u.length;
                f = g.call(f, this);
                q = e.series;
                this.distance = r(q.tooltipOptions.distance, 16);
                !1 === f ? this.hide() :
                    (g = this.getLabel(), this.isHidden && g.attr({
                    opacity: 1
                }).show(), this.split ? this.renderSplit(f, a) : (g.attr({
                    text: f && f.join ? f.join("") : f
                }), g.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + r(e.colorIndex, q.colorIndex)),
                    g.attr({
                    stroke: b.borderColor || e.color || q.color || "#666666"
                }), this.updatePosition({
                    plotX: d,
                    plotY: l,
                    negative: e.negative,
                    ttBelow: e.ttBelow,
                    h: c[2] || 0
                })), this.isHidden = !1)
            },
            renderSplit: function (d, g) {
                var f = this,
                    b = [],
                    l = this.chart,
                    e = l.renderer,
                    c = !0,
                    n = this.options,
                    u, q = this.getLabel();
                F(d.slice(0, g.length + 1), function (a, d) {
                    d = g[d - 1] || {
                        isHeader: !0,
                        plotX: g[0].plotX
                    };
                    var h = d.series || f,
                        k = h.tt,
                        G = d.series || {}, m = "highcharts-color-" + r(d.colorIndex, G.colorIndex, "none");
                    k || (h.tt = k = e.label(null, null, null, "callout").addClass("highcharts-tooltip-box " + m).attr({
                        padding: n.padding,
                        r: n.borderRadius,
                        fill: n.backgroundColor,
                        stroke: d.color || G.color || "#333333",
                        "stroke-width": n.borderWidth
                    }).add(q));
                    k.isActive = !0;
                    k.attr({
                        text: a
                    });
                    k.css(n.style);
                    a = k.getBBox();
                    G = a.width + k.strokeWidth();
                    d.isHeader ? (u = a.height,
                        G = Math.max(0, Math.min(d.plotX + l.plotLeft - G / 2, l.chartWidth - G))) : G = d.plotX + l.plotLeft -
                        r(n.distance, 16) - G;
                    0 > G && (c = !1);
                    a = (d.series && d.series.yAxis && d.series.yAxis.pos) + (d.plotY || 0);
                    a -= l.plotTop;
                    b.push({
                        target: d.isHeader ? l.plotHeight + u : a,
                        rank: d.isHeader ? 1 : 0,
                        size: h.tt.getBBox().height + 1,
                        point: d,
                        x: G,
                        tt: k
                    })
                });
                this.cleanSplit();
                a.distribute(b, l.plotHeight + u);
                F(b, function (a) {
                    var b = a.point,
                        e = b.series;
                    a.tt.attr({
                        visibility: void 0 === a.pos ? "hidden" : "inherit",
                        x: c || b.isHeader ? a.x : b.plotX + l.plotLeft + r(n.distance,
                            16),
                        y: a.pos + l.plotTop,
                        anchorX: b.isHeader ? b.plotX + l.plotLeft : b.plotX + e.xAxis.pos,
                        anchorY: b.isHeader ? a.pos + l.plotTop - 15 : b.plotY + e.yAxis.pos
                    })
                })
            },
            updatePosition: function (a) {
                var d = this.chart,
                    g = this.getLabel(),
                    g = (this.options.positioner || this.getPosition).call(this, g.width, g.height, a);
                this.move(Math.round(g.x), Math.round(g.y || 0), a.plotX + d.plotLeft, a.plotY + d.plotTop)
            },
            getDateFormat: function (a, d, f, b) {
                var l = z("%m-%d %H:%M:%S.%L", d),
                    e, c, n = {
                        millisecond: 15,
                        second: 12,
                        minute: 9,
                        hour: 6,
                        day: 3
                    }, u = "millisecond";
                for (c in g) {
                    if (a ===
                        g.week && +z("%w", d) === f && "00:00:00.000" === l.substr(6)) {
                        c = "week";
                        break
                    }
                    if (g[c] > a) {
                        c = u;
                        break
                    }
                    if (n[c] && l.substr(n[c]) !== "01-01 00:00:00.000".substr(n[c])) break;
                    "week" !== c && (u = c)
                }
                c && (e = b[c]);
                return e
            },
            getXDateFormat: function (a, d, g) {
                d = d.dateTimeLabelFormats;
                var b = g && g.closestPointRange;
                return (b ? this.getDateFormat(b, a.x, g.options.startOfWeek, d) : d.day) || d.year
            },
            tooltipFooterHeaderFormatter: function (a, d) {
                var g = d ? "footer" : "header";
                d = a.series;
                var b = d.tooltipOptions,
                    l = b.xDateFormat,
                    e = d.xAxis,
                    c = e && "datetime" ===
                        e.options.type && f(a.key),
                    g = b[g + "Format"];
                c && !l && (l = this.getXDateFormat(a, b, e));
                c && l && (g = g.replace("{point.key}", "{point.key:" + l + "}"));
                return B(g, {
                    point: a,
                    series: d
                })
            },
            bodyFormatter: function (a) {
                return h(a, function (a) {
                    var d = a.series.tooltipOptions;
                    return (d.pointFormatter || a.point.tooltipFormatter).call(a.point, d.pointFormat)
                })
            }
        }
    })(J);
    (function (a) {
        var z = a.addEvent,
            F = a.attr,
            D = a.charts,
            B = a.color,
            f = a.css,
            h = a.defined,
            t = a.doc,
            r = a.each,
            m = a.extend,
            d = a.fireEvent,
            g = a.offset,
            n = a.pick,
            y = a.removeEvent,
            w = a.splat,
            b = a.Tooltip,
            l = a.win;
        a.Pointer = function (a, b) {
            this.init(a, b)
        };
        a.Pointer.prototype = {
            init: function (a, c) {
                this.options = c;
                this.chart = a;
                this.runChartClick = c.chart.events && !! c.chart.events.click;
                this.pinchDown = [];
                this.lastValidTouch = {};
                b && c.tooltip.enabled && (a.tooltip = new b(a, c.tooltip), this.followTouchMove = n(c.tooltip.followTouchMove, !
                    0));
                this.setDOMEvents()
            },
            zoomOption: function (a) {
                var b = this.chart,
                    e = b.options.chart,
                    d = e.zoomType || "",
                    b = b.inverted;
                /touch/.test(a.type) && (d = n(e.pinchType, d));
                this.zoomX = a = /x/.test(d);
                this.zoomY = d = /y/.test(d);
                this.zoomHor = a && !b || d && b;
                this.zoomVert = d && !b || a && b;
                this.hasZoom = a || d
            },
            normalize: function (a, b) {
                var c, e;
                a = a || l.event;
                a.target || (a.target = a.srcElement);
                e = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] : a;
                b || (this.chartPosition = b = g(this.chart.container));
                void 0 === e.pageX ? (c = Math.max(a.x, a.clientX - b.left), b = a.y) : (c = e.pageX - b.left, b = e.pageY -
                    b.top);
                return m(a, {
                    chartX: Math.round(c),
                    chartY: Math.round(b)
                })
            },
            getCoordinates: function (a) {
                var b = {
                    xAxis: [],
                    yAxis: []
                };
                r(this.chart.axes, function (c) {
                    b[c.isXAxis ? "xAxis" : "yAxis"].push({
                        axis: c,
                        value: c.toValue(a[c.horiz ? "chartX" : "chartY"])
                    })
                });
                return b
            },
            getKDPoints: function (a, b, d) {
                var c = [],
                    e, l, g;
                r(a, function (a) {
                    e = a.noSharedTooltip && b;
                    l = !b && a.directTouch;
                    a.visible && !l && n(a.options.enableMouseTracking, !0) && (g = a.searchPoint(d, !e && 0 > a.options
                        .findNearestPointBy.indexOf("y"))) && g.series && c.push(g)
                });
                c.sort(function (a, c) {
                    var e = a.distX - c.distX,
                        k = a.dist - c.dist,
                        d = (c.series.group && c.series.group.zIndex) - (a.series.group && a.series.group.zIndex);
                    return 0 !== e && b ? e : 0 !== k ? k : 0 !== d ? d : a.series.index > c.series.index ? -1 : 1
                });
                if (b && c[0] && !c[0].series.noSharedTooltip) for (a = c.length; a--;)(c[a].x !== c[0].x || c[a].series
                            .noSharedTooltip) && c.splice(a, 1);
                return c
            },
            getPointFromEvent: function (a) {
                a = a.target;
                for (var b; a && !b;) b = a.point, a = a.parentNode;
                return b
            },
            getHoverData: function (b, c, d, l, g, f) {
                var e = b,
                    q = c,
                    k;
                l ? g ? (k = [], r(d, function (a) {
                    var b = a.noSharedTooltip && g,
                        c = !g && a.directTouch;
                    a.visible && !b && !c && n(a.options.enableMouseTracking, !0) && (a = a.searchKDTree({
                        clientX: e.clientX,
                        plotY: e.plotY
                    }, !b && 1 === a.kdDimensions)) && a.series && k.push(a)
                }), 0 === k.length && (k = [e])) : k = [e] : q && !q.stickyTracking ? (g || (d = [q]), k = this.getKDPoints(
                    d, g, f), e = a.find(k, function (a) {
                    return a.series === q
                })) : (b = a.grep(d, function (a) {
                    return a.stickyTracking
                }), k = this.getKDPoints(b, g, f), q = (e = k[0]) && e.series, g && (k = this.getKDPoints(d, g, f)));
                k.sort(function (a, b) {
                    return a.series.index - b.series.index
                });
                return {
                    hoverPoint: e,
                    hoverSeries: q,
                    hoverPoints: k
                }
            },
            runPointActions: function (b, c) {
                var e = this.chart,
                    d = e.tooltip,
                    l = d ? d.shared : !1,
                    g = c || e.hoverPoint,
                    f = g && g.series || e.hoverSeries;
                c = this.getHoverData(g, f, e.series, !! c || !l && f && f.directTouch, l, b);
                var h, k, g = c.hoverPoint;
                h = (f = c.hoverSeries) && f.tooltipOptions.followPointer;
                k = (l = l && g && !g.series.noSharedTooltip) ? c.hoverPoints : g ? [g] : [];
                if (g && (g !== e.hoverPoint || d && d.isHidden)) {
                    r(e.hoverPoints || [], function (b) {
                        -1 === a.inArray(b, k) && b.setState()
                    });
                    r(k || [], function (a) {
                        a.setState("hover")
                    });
                    if (e.hoverSeries !== f) f.onMouseOver();
                    f && !f.directTouch && (e.hoverPoint && e.hoverPoint.firePointEvent("mouseOut"),
                        g.firePointEvent("mouseOver"));
                    e.hoverPoints = k;
                    e.hoverPoint = g;
                    d && d.refresh(l ? k : g, b)
                } else h && d && !d.isHidden && (g = d.getAnchor([{}], b), d.updatePosition({
                        plotX: g[0],
                        plotY: g[1]
                    }));
                this.unDocMouseMove || (this.unDocMouseMove = z(t, "mousemove", function (b) {
                    var c = D[a.hoverChartIndex];
                    if (c) c.pointer.onDocumentMouseMove(b)
                }));
                r(e.axes, function (a) {
                    n(a.crosshair.snap, !0) ? r(k, function (c) {
                        c.series[a.coll] === a && a.drawCrosshair(b, c)
                    }) : a.drawCrosshair(b)
                })
            },
            reset: function (a, b) {
                var c = this.chart,
                    e = c.hoverSeries,
                    d = c.hoverPoint,
                    g = c.hoverPoints,
                    l = c.tooltip,
                    f = l && l.shared ? g : d;
                a && f && r(w(f), function (b) {
                    b.series.isCartesian && void 0 === b.plotX && (a = !1)
                });
                if (a) l && f && (l.refresh(f), d && (d.setState(d.state, !0), r(c.axes, function (a) {
                        a.crosshair && a.drawCrosshair(null, d)
                    })));
                else {
                    if (d) d.onMouseOut();
                    g && r(g, function (a) {
                        a.setState()
                    });
                    if (e) e.onMouseOut();
                    l && l.hide(b);
                    this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
                    r(c.axes, function (a) {
                        a.hideCrosshair()
                    });
                    this.hoverX = c.hoverPoints = c.hoverPoint = null
                }
            },
            scaleGroups: function (a,
                b) {
                var c = this.chart,
                    e;
                r(c.series, function (d) {
                    e = a || d.getPlotBox();
                    d.xAxis && d.xAxis.zoomEnabled && d.group && (d.group.attr(e), d.markerGroup && (d.markerGroup.attr(
                        e), d.markerGroup.clip(b ? c.clipRect : null)), d.dataLabelsGroup && d.dataLabelsGroup.attr(e))
                });
                c.clipRect.attr(b || c.clipBox)
            },
            dragStart: function (a) {
                var b = this.chart;
                b.mouseIsDown = a.type;
                b.cancelClick = !1;
                b.mouseDownX = this.mouseDownX = a.chartX;
                b.mouseDownY = this.mouseDownY = a.chartY
            },
            drag: function (a) {
                var b = this.chart,
                    e = b.options.chart,
                    d = a.chartX,
                    g = a.chartY,
                    l = this.zoomHor,
                    f = this.zoomVert,
                    n = b.plotLeft,
                    k = b.plotTop,
                    h = b.plotWidth,
                    m = b.plotHeight,
                    w, r = this.selectionMarker,
                    p = this.mouseDownX,
                    t = this.mouseDownY,
                    y = e.panKey && a[e.panKey + "Key"];
                r && r.touch || (d < n ? d = n : d > n + h && (d = n + h), g < k ? g = k : g > k + m && (g = k + m),
                    this.hasDragged = Math.sqrt(Math.pow(p - d, 2) + Math.pow(t - g, 2)), 10 < this.hasDragged && (w =
                    b.isInsidePlot(p - n, t - k), b.hasCartesianSeries && (this.zoomX || this.zoomY) && w && !y && !r &&
                    (this.selectionMarker = r = b.renderer.rect(n, k, l ? 1 : h, f ? 1 : m, 0).attr({
                    fill: e.selectionMarkerFill || B("#335cad").setOpacity(.25).get(),
                    "class": "highcharts-selection-marker",
                    zIndex: 7
                }).add()), r && l && (d -= p, r.attr({
                    width: Math.abs(d),
                    x: (0 < d ? 0 : d) + p
                })), r && f && (d = g - t, r.attr({
                    height: Math.abs(d),
                    y: (0 < d ? 0 : d) + t
                })), w && !r && e.panning && b.pan(a, e.panning)))
            },
            drop: function (a) {
                var b = this,
                    e = this.chart,
                    g = this.hasPinched;
                if (this.selectionMarker) {
                    var l = {
                        originalEvent: a,
                        xAxis: [],
                        yAxis: []
                    }, n = this.selectionMarker,
                        A = n.attr ? n.attr("x") : n.x,
                        w = n.attr ? n.attr("y") : n.y,
                        k = n.attr ? n.attr("width") : n.width,
                        G = n.attr ? n.attr("height") : n.height,
                        I;
                    if (this.hasDragged || g) r(e.axes, function (c) {
                            if (c.zoomEnabled && h(c.min) && (g || b[{
                                xAxis: "zoomX",
                                yAxis: "zoomY"
                            }[c.coll]])) {
                                var e = c.horiz,
                                    d = "touchend" === a.type ? c.minPixelPadding : 0,
                                    f = c.toValue((e ? A : w) + d),
                                    e = c.toValue((e ? A + k : w + G) - d);
                                l[c.coll].push({
                                    axis: c,
                                    min: Math.min(f, e),
                                    max: Math.max(f, e)
                                });
                                I = !0
                            }
                        }), I && d(e, "selection", l, function (a) {
                            e.zoom(m(a, g ? {
                                animation: !1
                            } : null))
                        });
                    this.selectionMarker = this.selectionMarker.destroy();
                    g && this.scaleGroups()
                }
                e && (f(e.container, {
                    cursor: e._cursor
                }), e.cancelClick = 10 < this.hasDragged, e.mouseIsDown = this.hasDragged =
                    this.hasPinched = !1, this.pinchDown = [])
            },
            onContainerMouseDown: function (a) {
                a = this.normalize(a);
                this.zoomOption(a);
                a.preventDefault && a.preventDefault();
                this.dragStart(a)
            },
            onDocumentMouseUp: function (b) {
                D[a.hoverChartIndex] && D[a.hoverChartIndex].pointer.drop(b)
            },
            onDocumentMouseMove: function (a) {
                var b = this.chart,
                    e = this.chartPosition;
                a = this.normalize(a, e);
                !e || this.inClass(a.target, "highcharts-tracker") || b.isInsidePlot(a.chartX - b.plotLeft, a.chartY -
                    b.plotTop) || this.reset()
            },
            onContainerMouseLeave: function (b) {
                var c =
                    D[a.hoverChartIndex];
                c && (b.relatedTarget || b.toElement) && (c.pointer.reset(), c.pointer.chartPosition = null)
            },
            onContainerMouseMove: function (b) {
                var c = this.chart;
                h(a.hoverChartIndex) && D[a.hoverChartIndex] && D[a.hoverChartIndex].mouseIsDown || (a.hoverChartIndex =
                    c.index);
                b = this.normalize(b);
                b.returnValue = !1;
                "mousedown" === c.mouseIsDown && this.drag(b);
                !this.inClass(b.target, "highcharts-tracker") && !c.isInsidePlot(b.chartX - c.plotLeft, b.chartY - c.plotTop) ||
                    c.openMenu || this.runPointActions(b)
            },
            inClass: function (a, b) {
                for (var c; a;) {
                    if (c =
                        F(a, "class")) {
                        if (-1 !== c.indexOf(b)) return !0;
                        if (-1 !== c.indexOf("highcharts-container")) return !1
                    }
                    a = a.parentNode
                }
            },
            onTrackerMouseOut: function (a) {
                var b = this.chart.hoverSeries;
                a = a.relatedTarget || a.toElement;
                if (!(!b || !a || b.stickyTracking || this.inClass(a, "highcharts-tooltip") || this.inClass(a,
                    "highcharts-series-" + b.index) && this.inClass(a, "highcharts-tracker"))) b.onMouseOut()
            },
            onContainerClick: function (a) {
                var b = this.chart,
                    e = b.hoverPoint,
                    g = b.plotLeft,
                    l = b.plotTop;
                a = this.normalize(a);
                b.cancelClick || (e && this.inClass(a.target,
                    "highcharts-tracker") ? (d(e.series, "click", m(a, {
                    point: e
                })), b.hoverPoint && e.firePointEvent("click", a)) : (m(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX -
                    g, a.chartY - l) && d(b, "click", a)))
            },
            setDOMEvents: function () {
                var b = this,
                    c = b.chart.container;
                c.onmousedown = function (a) {
                    b.onContainerMouseDown(a)
                };
                c.onmousemove = function (a) {
                    b.onContainerMouseMove(a)
                };
                c.onclick = function (a) {
                    b.onContainerClick(a)
                };
                z(c, "mouseleave", b.onContainerMouseLeave);
                1 === a.chartCount && z(t, "mouseup", b.onDocumentMouseUp);
                a.hasTouch && (c.ontouchstart = function (a) {
                    b.onContainerTouchStart(a)
                }, c.ontouchmove = function (a) {
                    b.onContainerTouchMove(a)
                }, 1 === a.chartCount && z(t, "touchend", b.onDocumentTouchEnd))
            },
            destroy: function () {
                var b;
                this.unDocMouseMove && this.unDocMouseMove();
                y(this.chart.container, "mouseleave", this.onContainerMouseLeave);
                a.chartCount || (y(t, "mouseup", this.onDocumentMouseUp), y(t, "touchend", this.onDocumentTouchEnd));
                clearInterval(this.tooltipTimeout);
                for (b in this) this[b] = null
            }
        }
    })(J);
    (function (a) {
        var z = a.charts,
            F = a.each,
            D = a.extend,
            B = a.map,
            f = a.noop,
            h = a.pick;
        D(a.Pointer.prototype, {
            pinchTranslate: function (a, f, h, d, g, n) {
                this.zoomHor && this.pinchTranslateDirection(!0, a, f, h, d, g, n);
                this.zoomVert && this.pinchTranslateDirection(!1, a, f, h, d, g, n)
            },
            pinchTranslateDirection: function (a, f, h, d, g, n, y, w) {
                var b = this.chart,
                    l = a ? "x" : "y",
                    e = a ? "X" : "Y",
                    c = "chart" + e,
                    m = a ? "width" : "height",
                    u = b["plot" + (a ? "Left" : "Top")],
                    q, x, A = w || 1,
                    r = b.inverted,
                    k = b.bounds[a ? "h" : "v"],
                    G = 1 === f.length,
                    I = f[0][c],
                    t = h[0][c],
                    K = !G && f[1][c],
                    p = !G && h[1][c],
                    C;
                h = function () {
                    !G && 20 < Math.abs(I - K) && (A = w ||
                        Math.abs(t - p) / Math.abs(I - K));
                    x = (u - t) / A + I;
                    q = b["plot" + (a ? "Width" : "Height")] / A
                };
                h();
                f = x;
                f < k.min ? (f = k.min, C = !0) : f + q > k.max && (f = k.max - q, C = !0);
                C ? (t -= .8 * (t - y[l][0]), G || (p -= .8 * (p - y[l][1])), h()) : y[l] = [t, p];
                r || (n[l] = x - u, n[m] = q);
                n = r ? 1 / A : A;
                g[m] = q;
                g[l] = f;
                d[r ? a ? "scaleY" : "scaleX" : "scale" + e] = A;
                d["translate" + e] = n * u + (t - n * I)
            },
            pinch: function (a) {
                var r = this,
                    m = r.chart,
                    d = r.pinchDown,
                    g = a.touches,
                    n = g.length,
                    t = r.lastValidTouch,
                    w = r.hasZoom,
                    b = r.selectionMarker,
                    l = {}, e = 1 === n && (r.inClass(a.target, "highcharts-tracker") && m.runTrackerClick ||
                        r.runChartClick),
                    c = {};
                1 < n && (r.initiated = !0);
                w && r.initiated && !e && a.preventDefault();
                B(g, function (a) {
                    return r.normalize(a)
                });
                "touchstart" === a.type ? (F(g, function (a, b) {
                    d[b] = {
                        chartX: a.chartX,
                        chartY: a.chartY
                    }
                }), t.x = [d[0].chartX, d[1] && d[1].chartX], t.y = [d[0].chartY, d[1] && d[1].chartY], F(m.axes, function (
                    a) {
                    if (a.zoomEnabled) {
                        var b = m.bounds[a.horiz ? "h" : "v"],
                            c = a.minPixelPadding,
                            e = a.toPixels(h(a.options.min, a.dataMin)),
                            d = a.toPixels(h(a.options.max, a.dataMax)),
                            g = Math.max(e, d);
                        b.min = Math.min(a.pos, Math.min(e, d) -
                            c);
                        b.max = Math.max(a.pos + a.len, g + c)
                    }
                }), r.res = !0) : r.followTouchMove && 1 === n ? this.runPointActions(r.normalize(a)) : d.length && (b ||
                    (r.selectionMarker = b = D({
                    destroy: f,
                    touch: !0
                }, m.plotBox)), r.pinchTranslate(d, g, l, b, c, t), r.hasPinched = w, r.scaleGroups(l, c), r.res && (r.res = !
                    1, this.reset(!1, 0)))
            },
            touch: function (f, r) {
                var m = this.chart,
                    d, g;
                if (m.index !== a.hoverChartIndex) this.onContainerMouseLeave({
                        relatedTarget: !0
                    });
                a.hoverChartIndex = m.index;
                1 === f.touches.length ? (f = this.normalize(f), (g = m.isInsidePlot(f.chartX - m.plotLeft,
                    f.chartY - m.plotTop)) && !m.openMenu ? (r && this.runPointActions(f), "touchmove" === f.type && (r =
                    this.pinchDown, d = r[0] ? 4 <= Math.sqrt(Math.pow(r[0].chartX - f.chartX, 2) + Math.pow(r[0].chartY -
                    f.chartY, 2)) : !1), h(d, !0) && this.pinch(f)) : r && this.reset()) : 2 === f.touches.length &&
                    this.pinch(f)
            },
            onContainerTouchStart: function (a) {
                this.zoomOption(a);
                this.touch(a, !0)
            },
            onContainerTouchMove: function (a) {
                this.touch(a)
            },
            onDocumentTouchEnd: function (f) {
                z[a.hoverChartIndex] && z[a.hoverChartIndex].pointer.drop(f)
            }
        })
    })(J);
    (function (a) {
        var z =
            a.addEvent,
            F = a.charts,
            D = a.css,
            B = a.doc,
            f = a.extend,
            h = a.noop,
            t = a.Pointer,
            r = a.removeEvent,
            m = a.win,
            d = a.wrap;
        if (m.PointerEvent || m.MSPointerEvent) {
            var g = {}, n = !! m.PointerEvent,
                y = function () {
                    var a, d = [];
                    d.item = function (a) {
                        return this[a]
                    };
                    for (a in g) g.hasOwnProperty(a) && d.push({
                            pageX: g[a].pageX,
                            pageY: g[a].pageY,
                            target: g[a].target
                        });
                    return d
                }, w = function (b, d, e, c) {
                    "touch" !== b.pointerType && b.pointerType !== b.MSPOINTER_TYPE_TOUCH || !F[a.hoverChartIndex] || (
                        c(b), c = F[a.hoverChartIndex].pointer, c[d]({
                        type: e,
                        target: b.currentTarget,
                        preventDefault: h,
                        touches: y()
                    }))
                };
            f(t.prototype, {
                onContainerPointerDown: function (a) {
                    w(a, "onContainerTouchStart", "touchstart", function (a) {
                        g[a.pointerId] = {
                            pageX: a.pageX,
                            pageY: a.pageY,
                            target: a.currentTarget
                        }
                    })
                },
                onContainerPointerMove: function (a) {
                    w(a, "onContainerTouchMove", "touchmove", function (a) {
                        g[a.pointerId] = {
                            pageX: a.pageX,
                            pageY: a.pageY
                        };
                        g[a.pointerId].target || (g[a.pointerId].target = a.currentTarget)
                    })
                },
                onDocumentPointerUp: function (a) {
                    w(a, "onDocumentTouchEnd", "touchend", function (a) {
                        delete g[a.pointerId]
                    })
                },
                batchMSEvents: function (a) {
                    a(this.chart.container, n ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
                    a(this.chart.container, n ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
                    a(B, n ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
                }
            });
            d(t.prototype, "init", function (a, d, e) {
                a.call(this, d, e);
                this.hasZoom && D(d.container, {
                    "-ms-touch-action": "none",
                    "touch-action": "none"
                })
            });
            d(t.prototype, "setDOMEvents", function (a) {
                a.apply(this);
                (this.hasZoom || this.followTouchMove) && this.batchMSEvents(z)
            });
            d(t.prototype, "destroy", function (a) {
                this.batchMSEvents(r);
                a.call(this)
            })
        }
    })(J);
    (function (a) {
        var z, F = a.addEvent,
            D = a.css,
            B = a.discardElement,
            f = a.defined,
            h = a.each,
            t = a.isFirefox,
            r = a.marginNames,
            m = a.merge,
            d = a.pick,
            g = a.setAnimation,
            n = a.stableSort,
            y = a.win,
            w = a.wrap;
        z = a.Legend = function (a, d) {
            this.init(a, d)
        };
        z.prototype = {
            init: function (a, d) {
                this.chart = a;
                this.setOptions(d);
                d.enabled && (this.render(), F(this.chart, "endResize", function () {
                    this.legend.positionCheckboxes()
                }))
            },
            setOptions: function (a) {
                var b = d(a.padding,
                    8);
                this.options = a;
                this.itemStyle = a.itemStyle;
                this.itemHiddenStyle = m(this.itemStyle, a.itemHiddenStyle);
                this.itemMarginTop = a.itemMarginTop || 0;
                this.padding = b;
                this.initialItemY = b - 5;
                this.itemHeight = this.maxItemWidth = 0;
                this.symbolWidth = d(a.symbolWidth, 16);
                this.pages = []
            },
            update: function (a, g) {
                var b = this.chart;
                this.setOptions(m(!0, this.options, a));
                this.destroy();
                b.isDirtyLegend = b.isDirtyBox = !0;
                d(g, !0) && b.redraw()
            },
            colorizeItem: function (a, d) {
                a.legendGroup[d ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
                var b = this.options,
                    c = a.legendItem,
                    g = a.legendLine,
                    l = a.legendSymbol,
                    f = this.itemHiddenStyle.color,
                    b = d ? b.itemStyle.color : f,
                    n = d ? a.color || f : f,
                    h = a.options && a.options.marker,
                    m = {
                        fill: n
                    }, k;
                c && c.css({
                    fill: b,
                    color: b
                });
                g && g.attr({
                    stroke: n
                });
                if (l) {
                    if (h && l.isMarker && (m = a.pointAttribs(), !d)) for (k in m) m[k] = f;
                    l.attr(m)
                }
            },
            positionItem: function (a) {
                var b = this.options,
                    e = b.symbolPadding,
                    b = !b.rtl,
                    c = a._legendItemPos,
                    d = c[0],
                    c = c[1],
                    g = a.checkbox;
                (a = a.legendGroup) && a.element && a.translate(b ? d : this.legendWidth - d - 2 * e - 4, c);
                g && (g.x =
                    d, g.y = c)
            },
            destroyItem: function (a) {
                var b = a.checkbox;
                h(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function (b) {
                    a[b] && (a[b] = a[b].destroy())
                });
                b && B(a.checkbox)
            },
            destroy: function () {
                function a(a) {
                    this[a] && (this[a] = this[a].destroy())
                }
                h(this.getAllItems(), function (b) {
                    h(["legendItem", "legendGroup"], a, b)
                });
                h("clipRect up down pager nav box title group".split(" "), a, this);
                this.display = null
            },
            positionCheckboxes: function (a) {
                var b = this.group && this.group.alignAttr,
                    e, c = this.clipHeight || this.legendHeight,
                    d = this.titleHeight;
                b && (e = b.translateY, h(this.allItems, function (g) {
                    var f = g.checkbox,
                        l;
                    f && (l = e + d + f.y + (a || 0) + 3, D(f, {
                        left: b.translateX + g.checkboxOffset + f.x - 20 + "px",
                        top: l + "px",
                        display: l > e - 6 && l < e + c - 6 ? "" : "none"
                    }))
                }))
            },
            renderTitle: function () {
                var a = this.padding,
                    d = this.options.title,
                    e = 0;
                d.text && (this.title || (this.title = this.chart.renderer.label(d.text, a - 3, a - 4, null, null, null,
                    null, null, "legend-title").attr({
                    zIndex: 1
                }).css(d.style).add(this.group)), a = this.title.getBBox(), e = a.height, this.offsetWidth = a.width,
                    this.contentGroup.attr({
                    translateY: e
                }));
                this.titleHeight = e
            },
            setText: function (b) {
                var d = this.options;
                b.legendItem.attr({
                    text: d.labelFormat ? a.format(d.labelFormat, b) : d.labelFormatter.call(b)
                })
            },
            renderItem: function (a) {
                var b = this.chart,
                    e = b.renderer,
                    c = this.options,
                    g = "horizontal" === c.layout,
                    f = this.symbolWidth,
                    q = c.symbolPadding,
                    n = this.itemStyle,
                    h = this.itemHiddenStyle,
                    w = this.padding,
                    k = g ? d(c.itemDistance, 20) : 0,
                    G = !c.rtl,
                    I = c.width,
                    r = c.itemMarginBottom || 0,
                    K = this.itemMarginTop,
                    p = a.legendItem,
                    y = !a.series,
                    t = !y && a.series.drawLegendSymbol ? a.series : a,
                    B = t.options,
                    B = this.createCheckboxForItem && B && B.showCheckbox,
                    z = c.useHTML,
                    D = a.options.className;
                p || (a.legendGroup = e.g("legend-item").addClass("highcharts-" + t.type + "-series highcharts-color-" +
                    a.colorIndex + (D ? " " + D : "") + (y ? " highcharts-series-" + a.index : "")).attr({
                    zIndex: 1
                }).add(this.scrollGroup), a.legendItem = p = e.text("", G ? f + q : -q, this.baseline || 0, z).css(m(a.visible ?
                    n : h)).attr({
                    align: G ? "left" : "right",
                    zIndex: 2
                }).add(a.legendGroup), this.baseline || (n = n.fontSize, this.fontMetrics = e.fontMetrics(n, p), this.baseline =
                    this.fontMetrics.f +
                    3 + K, p.attr("y", this.baseline)), this.symbolHeight = c.symbolHeight || this.fontMetrics.f, t.drawLegendSymbol(
                    this, a), this.setItemEvents && this.setItemEvents(a, p, z), B && this.createCheckboxForItem(a));
                this.colorizeItem(a, a.visible);
                this.setText(a);
                e = p.getBBox();
                f = a.checkboxOffset = c.itemWidth || a.legendItemWidth || f + q + e.width + k + (B ? 20 : 0);
                this.itemHeight = q = Math.round(a.legendItemHeight || e.height || this.symbolHeight);
                g && this.itemX - w + f > (I || b.spacingBox.width - 2 * w - c.x) && (this.itemX = w, this.itemY += K +
                    this.lastLineHeight +
                    r, this.lastLineHeight = 0);
                this.maxItemWidth = Math.max(this.maxItemWidth, f);
                this.lastItemY = K + this.itemY + r;
                this.lastLineHeight = Math.max(q, this.lastLineHeight);
                a._legendItemPos = [this.itemX, this.itemY];
                g ? this.itemX += f : (this.itemY += K + q + r, this.lastLineHeight = q);
                this.offsetWidth = I || Math.max((g ? this.itemX - w - k : f) + w, this.offsetWidth)
            },
            getAllItems: function () {
                var a = [];
                h(this.chart.series, function (b) {
                    var e = b && b.options;
                    b && d(e.showInLegend, f(e.linkedTo) ? !1 : void 0, !0) && (a = a.concat(b.legendItems || ("point" ===
                        e.legendType ?
                        b.data : b)))
                });
                return a
            },
            adjustMargins: function (a, g) {
                var b = this.chart,
                    c = this.options,
                    l = c.align.charAt(0) + c.verticalAlign.charAt(0) + c.layout.charAt(0);
                c.floating || h([/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/], function (e, q) {
                    e.test(l) && !f(a[q]) && (b[r[q]] = Math.max(b[r[q]], b.legend[(q + 1) % 2 ? "legendHeight" :
                        "legendWidth"] + [1, -1, -1, 1][q] * c[q % 2 ? "x" : "y"] + d(c.margin, 12) + g[q]))
                })
            },
            render: function () {
                var a = this,
                    d = a.chart,
                    e = d.renderer,
                    c = a.group,
                    g, f, q, x, w = a.box,
                    r = a.options,
                    k = a.padding;
                a.itemX = k;
                a.itemY =
                    a.initialItemY;
                a.offsetWidth = 0;
                a.lastItemY = 0;
                c || (a.group = c = e.g("legend").attr({
                    zIndex: 7
                }).add(), a.contentGroup = e.g().attr({
                    zIndex: 1
                }).add(c), a.scrollGroup = e.g().add(a.contentGroup));
                a.renderTitle();
                g = a.getAllItems();
                n(g, function (a, b) {
                    return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0)
                });
                r.reversed && g.reverse();
                a.allItems = g;
                a.display = f = !! g.length;
                a.lastLineHeight = 0;
                h(g, function (b) {
                    a.renderItem(b)
                });
                q = (r.width || a.offsetWidth) + k;
                x = a.lastItemY + a.lastLineHeight + a.titleHeight;
                x = a.handleOverflow(x);
                x += k;
                w || (a.box = w = e.rect().addClass("highcharts-legend-box").attr({
                    r: r.borderRadius
                }).add(c), w.isNew = !0);
                w.attr({
                    stroke: r.borderColor,
                    "stroke-width": r.borderWidth || 0,
                    fill: r.backgroundColor || "none"
                }).shadow(r.shadow);
                0 < q && 0 < x && (w[w.isNew ? "attr" : "animate"](w.crisp({
                    x: 0,
                    y: 0,
                    width: q,
                    height: x
                }, w.strokeWidth())), w.isNew = !1);
                w[f ? "show" : "hide"]();
                a.legendWidth = q;
                a.legendHeight = x;
                h(g, function (b) {
                    a.positionItem(b)
                });
                f && c.align(m(r, {
                    width: q,
                    height: x
                }), !0, "spacingBox");
                d.isResizing || this.positionCheckboxes()
            },
            handleOverflow: function (a) {
                var b = this,
                    e = this.chart,
                    c = e.renderer,
                    g = this.options,
                    f = g.y,
                    q = this.padding,
                    e = e.spacingBox.height + ("top" === g.verticalAlign ? -f : f) - q,
                    f = g.maxHeight,
                    n, m = this.clipRect,
                    w = g.navigation,
                    k = d(w.animation, !0),
                    G = w.arrowSize || 12,
                    I = this.nav,
                    r = this.pages,
                    y, p = this.allItems,
                    t = function (a) {
                        a ? m.attr({
                            height: a
                        }) : m && (b.clipRect = m.destroy(), b.contentGroup.clip());
                        b.contentGroup.div && (b.contentGroup.div.style.clip = a ? "rect(" + q + "px,9999px," + (q + a) +
                            "px,0)" : "auto")
                    };
                "horizontal" !== g.layout || "middle" ===
                    g.verticalAlign || g.floating || (e /= 2);
                f && (e = Math.min(e, f));
                r.length = 0;
                a > e && !1 !== w.enabled ? (this.clipHeight = n = Math.max(e - 20 - this.titleHeight - q, 0), this.currentPage =
                    d(this.currentPage, 1), this.fullHeight = a, h(p, function (a, b) {
                    var c = a._legendItemPos[1];
                    a = Math.round(a.legendItem.getBBox().height);
                    var e = r.length;
                    if (!e || c - r[e - 1] > n && (y || c) !== r[e - 1]) r.push(y || c), e++;
                    b === p.length - 1 && c + a - r[e - 1] > n && r.push(c);
                    c !== y && (y = c)
                }), m || (m = b.clipRect = c.clipRect(0, q, 9999, 0), b.contentGroup.clip(m)), t(n), I || (this.nav = I =
                    c.g().attr({
                    zIndex: 1
                }).add(this.group),
                    this.up = c.symbol("triangle", 0, 0, G, G).on("click", function () {
                    b.scroll(-1, k)
                }).add(I), this.pager = c.text("", 15, 10).addClass("highcharts-legend-navigation").css(w.style).add(I),
                    this.down = c.symbol("triangle-down", 0, 0, G, G).on("click", function () {
                    b.scroll(1, k)
                }).add(I)), b.scroll(0), a = e) : I && (t(), this.nav = I.destroy(), this.scrollGroup.attr({
                    translateY: 1
                }), this.clipHeight = 0);
                return a
            },
            scroll: function (a, d) {
                var b = this.pages,
                    c = b.length;
                a = this.currentPage + a;
                var f = this.clipHeight,
                    l = this.options.navigation,
                    q = this.pager,
                    n = this.padding;
                a > c && (a = c);
                0 < a && (void 0 !== d && g(d, this.chart), this.nav.attr({
                    translateX: n,
                    translateY: f + this.padding + 7 + this.titleHeight,
                    visibility: "visible"
                }), this.up.attr({
                    "class": 1 === a ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                }), q.attr({
                    text: a + "/" + c
                }), this.down.attr({
                    x: 18 + this.pager.getBBox().width,
                    "class": a === c ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                }), this.up.attr({
                    fill: 1 === a ? l.inactiveColor : l.activeColor
                }).css({
                    cursor: 1 === a ? "default" : "pointer"
                }), this.down.attr({
                    fill: a === c ? l.inactiveColor : l.activeColor
                }).css({
                    cursor: a === c ? "default" : "pointer"
                }), d = -b[a - 1] + this.initialItemY, this.scrollGroup.animate({
                    translateY: d
                }), this.currentPage = a, this.positionCheckboxes(d))
            }
        };
        a.LegendSymbolMixin = {
            drawRectangle: function (a, g) {
                var b = a.symbolHeight,
                    c = a.options.squareSymbol;
                g.legendSymbol = this.chart.renderer.rect(c ? (a.symbolWidth - b) / 2 : 0, a.baseline - b + 1, c ? b :
                    a.symbolWidth, b, d(a.options.symbolRadius, b / 2)).addClass("highcharts-point").attr({
                    zIndex: 3
                }).add(g.legendGroup)
            },
            drawLineMarker: function (a) {
                var b =
                    this.options,
                    e = b.marker,
                    c = a.symbolWidth,
                    g = a.symbolHeight,
                    f = g / 2,
                    n = this.chart.renderer,
                    h = this.legendGroup;
                a = a.baseline - Math.round(.3 * a.fontMetrics.b);
                var w;
                w = {
                    "stroke-width": b.lineWidth || 0
                };
                b.dashStyle && (w.dashstyle = b.dashStyle);
                this.legendLine = n.path(["M", 0, a, "L", c, a]).addClass("highcharts-graph").attr(w).add(h);
                e && !1 !== e.enabled && (b = Math.min(d(e.radius, f), f), 0 === this.symbol.indexOf("url") && (e = m(e, {
                    width: g,
                    height: g
                }), b = 0), this.legendSymbol = e = n.symbol(this.symbol, c / 2 - b, a - b, 2 * b, 2 * b, e).addClass(
                    "highcharts-point").add(h),
                    e.isMarker = !0)
            }
        };
        (/Trident\/7\.0/.test(y.navigator.userAgent) || t) && w(z.prototype, "positionItem", function (a, d) {
            var b = this,
                c = function () {
                    d._legendItemPos && a.call(b, d)
                };
            c();
            setTimeout(c)
        })
    })(J);
    (function (a) {
        var z = a.addEvent,
            F = a.animate,
            D = a.animObject,
            B = a.attr,
            f = a.doc,
            h = a.Axis,
            t = a.createElement,
            r = a.defaultOptions,
            m = a.discardElement,
            d = a.charts,
            g = a.css,
            n = a.defined,
            y = a.each,
            w = a.extend,
            b = a.find,
            l = a.fireEvent,
            e = a.getStyle,
            c = a.grep,
            E = a.isNumber,
            u = a.isObject,
            q = a.isString,
            x = a.Legend,
            A = a.marginNames,
            H = a.merge,
            k = a.Pointer,
            G = a.pick,
            I = a.pInt,
            L = a.removeEvent,
            K = a.seriesTypes,
            p = a.splat,
            C = a.svg,
            M = a.syncTimeout,
            N = a.win,
            Q = a.Renderer,
            O = a.Chart = function () {
                this.getArgs.apply(this, arguments)
            };
        a.chart = function (a, b, c) {
            return new O(a, b, c)
        };
        O.prototype = {
            callbacks: [],
            getArgs: function () {
                var a = [].slice.call(arguments);
                if (q(a[0]) || a[0].nodeName) this.renderTo = a.shift();
                this.init(a[0], a[1])
            },
            init: function (b, c) {
                var e, k = b.series;
                b.series = null;
                e = H(r, b);
                e.series = b.series = k;
                this.userOptions = b;
                b = e.chart;
                k = b.events;
                this.margin = [];
                this.spacing = [];
                this.bounds = {
                    h: {},
                    v: {}
                };
                this.callback = c;
                this.isResizing = 0;
                this.options = e;
                this.axes = [];
                this.series = [];
                this.hasCartesianSeries = b.showAxes;
                var g;
                this.index = d.length;
                d.push(this);
                a.chartCount++;
                if (k) for (g in k) z(this, g, k[g]);
                this.xAxis = [];
                this.yAxis = [];
                this.pointCount = this.colorCounter = this.symbolCounter = 0;
                this.firstRender()
            },
            initSeries: function (b) {
                var c = this.options.chart;
                (c = K[b.type || c.type || c.defaultSeriesType]) || a.error(17, !0);
                c = new c;
                c.init(this, b);
                return c
            },
            orderSeries: function (a) {
                var b =
                    this.series;
                for (a = a || 0; a < b.length; a++) b[a] && (b[a].index = a, b[a].name = b[a].name || "Series " + (b[a]
                        .index + 1))
            },
            isInsidePlot: function (a, b, c) {
                var e = c ? b : a;
                a = c ? a : b;
                return 0 <= e && e <= this.plotWidth && 0 <= a && a <= this.plotHeight
            },
            redraw: function (b) {
                var c = this.axes,
                    e = this.series,
                    d = this.pointer,
                    k = this.legend,
                    g = this.isDirtyLegend,
                    f, p, n = this.hasCartesianSeries,
                    q = this.isDirtyBox,
                    h, m = this.renderer,
                    v = m.isHidden(),
                    G = [];
                this.setResponsive && this.setResponsive(!1);
                a.setAnimation(b, this);
                v && this.cloneRenderTo();
                this.layOutTitles();
                for (b = e.length; b--;) if (h = e[b], h.options.stacking && (f = !0, h.isDirty)) {
                        p = !0;
                        break
                    }
                if (p) for (b = e.length; b--;) h = e[b], h.options.stacking && (h.isDirty = !0);
                y(e, function (a) {
                    a.isDirty && "point" === a.options.legendType && (a.updateTotals && a.updateTotals(), g = !0);
                    a.isDirtyData && l(a, "updatedData")
                });
                g && k.options.enabled && (k.render(), this.isDirtyLegend = !1);
                f && this.getStacks();
                n && y(c, function (a) {
                    a.updateNames();
                    a.setScale()
                });
                this.getMargins();
                n && (y(c, function (a) {
                    a.isDirty && (q = !0)
                }), y(c, function (a) {
                    var b = a.min + "," + a.max;
                    a.extKey !== b && (a.extKey = b, G.push(function () {
                        l(a, "afterSetExtremes", w(a.eventArgs, a.getExtremes()));
                        delete a.eventArgs
                    }));
                    (q || f) && a.redraw()
                }));
                q && this.drawChartBox();
                l(this, "predraw");
                y(e, function (a) {
                    (q || a.isDirty) && a.visible && a.redraw();
                    a.isDirtyData = !1
                });
                d && d.reset(!0);
                m.draw();
                l(this, "redraw");
                l(this, "render");
                v && this.cloneRenderTo(!0);
                y(G, function (a) {
                    a.call()
                })
            },
            get: function (a) {
                function c(b) {
                    return b.id === a || b.options && b.options.id === a
                }
                var e, d = this.series,
                    k;
                e = b(this.axes, c) || b(this.series, c);
                for (k = 0; !e && k < d.length; k++) e = b(d[k].points || [], c);
                return e
            },
            getAxes: function () {
                var a = this,
                    b = this.options,
                    c = b.xAxis = p(b.xAxis || {}),
                    b = b.yAxis = p(b.yAxis || {});
                y(c, function (a, b) {
                    a.index = b;
                    a.isX = !0
                });
                y(b, function (a, b) {
                    a.index = b
                });
                c = c.concat(b);
                y(c, function (b) {
                    new h(a, b)
                })
            },
            getSelectedPoints: function () {
                var a = [];
                y(this.series, function (b) {
                    a = a.concat(c(b.points || [], function (a) {
                        return a.selected
                    }))
                });
                return a
            },
            getSelectedSeries: function () {
                return c(this.series, function (a) {
                    return a.selected
                })
            },
            setTitle: function (a,
                b, c) {
                var e = this,
                    d = e.options,
                    k;
                k = d.title = H({
                    style: {
                        color: "#333333",
                        fontSize: d.isStock ? "16px" : "18px"
                    }
                }, d.title, a);
                d = d.subtitle = H({
                    style: {
                        color: "#666666"
                    }
                }, d.subtitle, b);
                y([["title", a, k], ["subtitle", b, d]], function (a, b) {
                    var c = a[0],
                        d = e[c],
                        k = a[1];
                    a = a[2];
                    d && k && (e[c] = d = d.destroy());
                    a && a.text && !d && (e[c] = e.renderer.text(a.text, 0, 0, a.useHTML).attr({
                        align: a.align,
                        "class": "highcharts-" + c,
                        zIndex: a.zIndex || 4
                    }).add(), e[c].update = function (a) {
                        e.setTitle(!b && a, b && a)
                    }, e[c].css(a.style))
                });
                e.layOutTitles(c)
            },
            layOutTitles: function (a) {
                var b =
                    0,
                    c, e = this.renderer,
                    d = this.spacingBox;
                y(["title", "subtitle"], function (a) {
                    var c = this[a],
                        k = this.options[a],
                        g;
                    c && (g = k.style.fontSize, g = e.fontMetrics(g, c).b, c.css({
                        width: (k.width || d.width + k.widthAdjust) + "px"
                    }).align(w({
                        y: b + g + ("title" === a ? -3 : 2)
                    }, k), !1, "spacingBox"), k.floating || k.verticalAlign || (b = Math.ceil(b + c.getBBox(k.useHTML).height)))
                }, this);
                c = this.titleOffset !== b;
                this.titleOffset = b;
                !this.isDirtyBox && c && (this.isDirtyBox = c, this.hasRendered && G(a, !0) && this.isDirtyBox && this.redraw())
            },
            getChartSize: function () {
                var b =
                    this.options.chart,
                    c = b.width,
                    b = b.height,
                    d = this.renderToClone || this.renderTo;
                n(c) || (this.containerWidth = e(d, "width"));
                n(b) || (this.containerHeight = e(d, "height"));
                this.chartWidth = Math.max(0, c || this.containerWidth || 600);
                this.chartHeight = Math.max(0, a.relativeLength(b, this.chartWidth) || this.containerHeight || 400)
            },
            cloneRenderTo: function (a) {
                var b = this.renderToClone,
                    c = this.container;
                if (a) {
                    if (b) {
                        for (; b.childNodes.length;) this.renderTo.appendChild(b.firstChild);
                        m(b);
                        delete this.renderToClone
                    }
                } else c && c.parentNode ===
                        this.renderTo && this.renderTo.removeChild(c), this.renderToClone = b = this.renderTo.cloneNode(
                        0), g(b, {
                        position: "absolute",
                        top: "-9999px",
                        display: "block"
                    }), b.style.setProperty && b.style.setProperty("display", "block", "important"), f.body.appendChild(
                        b), c && b.appendChild(c)
            },
            setClassName: function (a) {
                this.container.className = "highcharts-container " + (a || "")
            },
            getContainer: function () {
                var b, c = this.options,
                    e = c.chart,
                    k, g;
                b = this.renderTo;
                var p = a.uniqueKey(),
                    l;
                b || (this.renderTo = b = e.renderTo);
                q(b) && (this.renderTo = b = f.getElementById(b));
                b || a.error(13, !0);
                k = I(B(b, "data-highcharts-chart"));
                E(k) && d[k] && d[k].hasRendered && d[k].destroy();
                B(b, "data-highcharts-chart", this.index);
                b.innerHTML = "";
                e.skipClone || b.offsetWidth || this.cloneRenderTo();
                this.getChartSize();
                k = this.chartWidth;
                g = this.chartHeight;
                l = w({
                    position: "relative",
                    overflow: "hidden",
                    width: k + "px",
                    height: g + "px",
                    textAlign: "left",
                    lineHeight: "normal",
                    zIndex: 0,
                    "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
                }, e.style);
                this.container = b = t("div", {
                    id: p
                }, l, this.renderToClone || b);
                this._cursor = b.style.cursor;
                this.renderer = new(a[e.renderer] || Q)(b, k, g, null, e.forExport, c.exporting && c.exporting.allowHTML);
                this.setClassName(e.className);
                this.renderer.setStyle(e.style);
                this.renderer.chartIndex = this.index
            },
            getMargins: function (a) {
                var b = this.spacing,
                    c = this.margin,
                    e = this.titleOffset;
                this.resetMargins();
                e && !n(c[0]) && (this.plotTop = Math.max(this.plotTop, e + this.options.title.margin + b[0]));
                this.legend.display && this.legend.adjustMargins(c, b);
                this.extraMargin && (this[this.extraMargin.type] = (this[this.extraMargin.type] ||
                    0) + this.extraMargin.value);
                this.extraTopMargin && (this.plotTop += this.extraTopMargin);
                a || this.getAxisMargins()
            },
            getAxisMargins: function () {
                var a = this,
                    b = a.axisOffset = [0, 0, 0, 0],
                    c = a.margin;
                a.hasCartesianSeries && y(a.axes, function (a) {
                    a.visible && a.getOffset()
                });
                y(A, function (e, d) {
                    n(c[d]) || (a[e] += b[d])
                });
                a.setChartSize()
            },
            reflow: function (a) {
                var b = this,
                    c = b.options.chart,
                    d = b.renderTo,
                    k = n(c.width),
                    g = c.width || e(d, "width"),
                    c = c.height || e(d, "height"),
                    d = a ? a.target : N;
                if (!k && !b.isPrinting && g && c && (d === N || d === f)) {
                    if (g !==
                        b.containerWidth || c !== b.containerHeight) clearTimeout(b.reflowTimeout), b.reflowTimeout = M(function () {
                            b.container && b.setSize(void 0, void 0, !1)
                        }, a ? 100 : 0);
                    b.containerWidth = g;
                    b.containerHeight = c
                }
            },
            initReflow: function () {
                var a = this,
                    b;
                b = z(N, "resize", function (b) {
                    a.reflow(b)
                });
                z(a, "destroy", b)
            },
            setSize: function (b, c, e) {
                var d = this,
                    k = d.renderer;
                d.isResizing += 1;
                a.setAnimation(e, d);
                d.oldChartHeight = d.chartHeight;
                d.oldChartWidth = d.chartWidth;
                void 0 !== b && (d.options.chart.width = b);
                void 0 !== c && (d.options.chart.height =
                    c);
                d.getChartSize();
                b = k.globalAnimation;
                (b ? F : g)(d.container, {
                    width: d.chartWidth + "px",
                    height: d.chartHeight + "px"
                }, b);
                d.setChartSize(!0);
                k.setSize(d.chartWidth, d.chartHeight, e);
                y(d.axes, function (a) {
                    a.isDirty = !0;
                    a.setScale()
                });
                d.isDirtyLegend = !0;
                d.isDirtyBox = !0;
                d.layOutTitles();
                d.getMargins();
                d.redraw(e);
                d.oldChartHeight = null;
                l(d, "resize");
                M(function () {
                    d && l(d, "endResize", null, function () {
                        --d.isResizing
                    })
                }, D(b).duration)
            },
            setChartSize: function (a) {
                var b = this.inverted,
                    c = this.renderer,
                    e = this.chartWidth,
                    d =
                        this.chartHeight,
                    k = this.options.chart,
                    g = this.spacing,
                    f = this.clipOffset,
                    p, l, n, q;
                this.plotLeft = p = Math.round(this.plotLeft);
                this.plotTop = l = Math.round(this.plotTop);
                this.plotWidth = n = Math.max(0, Math.round(e - p - this.marginRight));
                this.plotHeight = q = Math.max(0, Math.round(d - l - this.marginBottom));
                this.plotSizeX = b ? q : n;
                this.plotSizeY = b ? n : q;
                this.plotBorderWidth = k.plotBorderWidth || 0;
                this.spacingBox = c.spacingBox = {
                    x: g[3],
                    y: g[0],
                    width: e - g[3] - g[1],
                    height: d - g[0] - g[2]
                };
                this.plotBox = c.plotBox = {
                    x: p,
                    y: l,
                    width: n,
                    height: q
                };
                e = 2 * Math.floor(this.plotBorderWidth / 2);
                b = Math.ceil(Math.max(e, f[3]) / 2);
                c = Math.ceil(Math.max(e, f[0]) / 2);
                this.clipBox = {
                    x: b,
                    y: c,
                    width: Math.floor(this.plotSizeX - Math.max(e, f[1]) / 2 - b),
                    height: Math.max(0, Math.floor(this.plotSizeY - Math.max(e, f[2]) / 2 - c))
                };
                a || y(this.axes, function (a) {
                    a.setAxisSize();
                    a.setAxisTranslation()
                })
            },
            resetMargins: function () {
                var a = this,
                    b = a.options.chart;
                y(["margin", "spacing"], function (c) {
                    var e = b[c],
                        d = u(e) ? e : [e, e, e, e];
                    y(["Top", "Right", "Bottom", "Left"], function (e, k) {
                        a[c][k] = G(b[c + e], d[k])
                    })
                });
                y(A, function (b, c) {
                    a[b] = G(a.margin[c], a.spacing[c])
                });
                a.axisOffset = [0, 0, 0, 0];
                a.clipOffset = [0, 0, 0, 0]
            },
            drawChartBox: function () {
                var a = this.options.chart,
                    b = this.renderer,
                    c = this.chartWidth,
                    e = this.chartHeight,
                    d = this.chartBackground,
                    k = this.plotBackground,
                    g = this.plotBorder,
                    f, p = this.plotBGImage,
                    l = a.backgroundColor,
                    n = a.plotBackgroundColor,
                    q = a.plotBackgroundImage,
                    h, m = this.plotLeft,
                    G = this.plotTop,
                    u = this.plotWidth,
                    x = this.plotHeight,
                    w = this.plotBox,
                    I = this.clipRect,
                    r = this.clipBox,
                    A = "animate";
                d || (this.chartBackground =
                    d = b.rect().addClass("highcharts-background").add(), A = "attr");
                f = a.borderWidth || 0;
                h = f + (a.shadow ? 8 : 0);
                l = {
                    fill: l || "none"
                };
                if (f || d["stroke-width"]) l.stroke = a.borderColor, l["stroke-width"] = f;
                d.attr(l).shadow(a.shadow);
                d[A]({
                    x: h / 2,
                    y: h / 2,
                    width: c - h - f % 2,
                    height: e - h - f % 2,
                    r: a.borderRadius
                });
                A = "animate";
                k || (A = "attr", this.plotBackground = k = b.rect().addClass("highcharts-plot-background").add());
                k[A](w);
                k.attr({
                    fill: n || "none"
                }).shadow(a.plotShadow);
                q && (p ? p.animate(w) : this.plotBGImage = b.image(q, m, G, u, x).add());
                I ? I.animate({
                    width: r.width,
                    height: r.height
                }) : this.clipRect = b.clipRect(r);
                A = "animate";
                g || (A = "attr", this.plotBorder = g = b.rect().addClass("highcharts-plot-border").attr({
                    zIndex: 1
                }).add());
                g.attr({
                    stroke: a.plotBorderColor,
                    "stroke-width": a.plotBorderWidth || 0,
                    fill: "none"
                });
                g[A](g.crisp({
                    x: m,
                    y: G,
                    width: u,
                    height: x
                }, -g.strokeWidth()));
                this.isDirtyBox = !1
            },
            propFromSeries: function () {
                var a = this,
                    b = a.options.chart,
                    c, e = a.options.series,
                    d, k;
                y(["inverted", "angular", "polar"], function (g) {
                    c = K[b.type || b.defaultSeriesType];
                    k = b[g] || c && c.prototype[g];
                    for (d = e && e.length; !k && d--;)(c = K[e[d].type]) && c.prototype[g] && (k = !0);
                    a[g] = k
                })
            },
            linkSeries: function () {
                var a = this,
                    b = a.series;
                y(b, function (a) {
                    a.linkedSeries.length = 0
                });
                y(b, function (b) {
                    var c = b.options.linkedTo;
                    q(c) && (c = ":previous" === c ? a.series[b.index - 1] : a.get(c)) && c.linkedParent !== b && (c.linkedSeries
                        .push(b), b.linkedParent = c, b.visible = G(b.options.visible, c.options.visible, b.visible))
                })
            },
            renderSeries: function () {
                y(this.series, function (a) {
                    a.translate();
                    a.render()
                })
            },
            renderLabels: function () {
                var a = this,
                    b = a.options.labels;
                b.items && y(b.items, function (c) {
                    var e = w(b.style, c.style),
                        d = I(e.left) + a.plotLeft,
                        k = I(e.top) + a.plotTop + 12;
                    delete e.left;
                    delete e.top;
                    a.renderer.text(c.html, d, k).attr({
                        zIndex: 2
                    }).css(e).add()
                })
            },
            render: function () {
                var a = this.axes,
                    b = this.renderer,
                    c = this.options,
                    e, d, k;
                this.setTitle();
                this.legend = new x(this, c.legend);
                this.getStacks && this.getStacks();
                this.getMargins(!0);
                this.setChartSize();
                c = this.plotWidth;
                e = this.plotHeight -= 21;
                y(a, function (a) {
                    a.setScale()
                });
                this.getAxisMargins();
                d = 1.1 < c / this.plotWidth;
                k =
                    1.05 < e / this.plotHeight;
                if (d || k) y(a, function (a) {
                        (a.horiz && d || !a.horiz && k) && a.setTickInterval(!0)
                    }), this.getMargins();
                this.drawChartBox();
                this.hasCartesianSeries && y(a, function (a) {
                    a.visible && a.render()
                });
                this.seriesGroup || (this.seriesGroup = b.g("series-group").attr({
                    zIndex: 3
                }).add());
                this.renderSeries();
                this.renderLabels();
                this.addCredits();
                this.setResponsive && this.setResponsive();
                this.hasRendered = !0
            },
            addCredits: function (a) {
                var b = this;
                a = H(!0, this.options.credits, a);
                a.enabled && !this.credits && (this.credits =
                    this.renderer.text(a.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on(
                    "click", function () {
                    a.href && (N.location.href = a.href)
                }).attr({
                    align: a.position.align,
                    zIndex: 8
                }).css(a.style).add().align(a.position), this.credits.update = function (a) {
                    b.credits = b.credits.destroy();
                    b.addCredits(a)
                })
            },
            destroy: function () {
                var b = this,
                    c = b.axes,
                    e = b.series,
                    k = b.container,
                    g, f = k && k.parentNode;
                l(b, "destroy");
                d[b.index] = void 0;
                a.chartCount--;
                b.renderTo.removeAttribute("data-highcharts-chart");
                L(b);
                for (g = c.length; g--;) c[g] =
                        c[g].destroy();
                this.scroller && this.scroller.destroy && this.scroller.destroy();
                for (g = e.length; g--;) e[g] = e[g].destroy();
                y(
                    "title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer"
                    .split(" "), function (a) {
                    var c = b[a];
                    c && c.destroy && (b[a] = c.destroy())
                });
                k && (k.innerHTML = "", L(k), f && m(k));
                for (g in b) delete b[g]
            },
            isReadyToRender: function () {
                var a = this;
                return C || N != N.top || "complete" === f.readyState ? !0 : (f.attachEvent("onreadystatechange", function () {
                    f.detachEvent("onreadystatechange", a.firstRender);
                    "complete" === f.readyState && a.firstRender()
                }), !1)
            },
            firstRender: function () {
                var a = this,
                    b = a.options;
                if (a.isReadyToRender()) {
                    a.getContainer();
                    l(a, "init");
                    a.resetMargins();
                    a.setChartSize();
                    a.propFromSeries();
                    a.getAxes();
                    y(b.series || [], function (b) {
                        a.initSeries(b)
                    });
                    a.linkSeries();
                    l(a, "beforeRender");
                    k && (a.pointer = new k(a, b));
                    a.render();
                    if (!a.renderer.imgCount && a.onload) a.onload();
                    a.cloneRenderTo(!0)
                }
            },
            onload: function () {
                y([this.callback].concat(this.callbacks), function (a) {
                    a && void 0 !== this.index && a.apply(this, [this])
                }, this);
                l(this, "load");
                l(this, "render");
                n(this.index) && !1 !== this.options.chart.reflow && this.initReflow();
                this.onload = null
            }
        }
    })(J);
    (function (a) {
        var z, F = a.each,
            D = a.extend,
            B = a.erase,
            f = a.fireEvent,
            h = a.format,
            t = a.isArray,
            r = a.isNumber,
            m = a.pick,
            d = a.removeEvent;
        z = a.Point = function () {};
        z.prototype = {
            init: function (a, d, f) {
                this.series = a;
                this.color = a.color;
                this.applyOptions(d, f);
                a.options.colorByPoint ? (d = a.options.colors || a.chart.options.colors, this.color = this.color ||
                    d[a.colorCounter], d = d.length, f = a.colorCounter, a.colorCounter++, a.colorCounter === d && (a.colorCounter =
                    0)) : f = a.colorIndex;
                this.colorIndex = m(this.colorIndex, f);
                a.chart.pointCount++;
                return this
            },
            applyOptions: function (a, d) {
                var g = this.series,
                    f = g.options.pointValKey || g.pointValKey;
                a = z.prototype.optionsToObject.call(this, a);
                D(this, a);
                this.options = this.options ? D(this.options, a) : a;
                a.group && delete this.group;
                f && (this.y = this[f]);
                this.isNull = m(this.isValid && !this.isValid(), null === this.x || !r(this.y, !0));
                this.selected &&
                    (this.state = "select");
                "name" in this && void 0 === d && g.xAxis && g.xAxis.hasNames && (this.x = g.xAxis.nameToX(this));
                void 0 === this.x && g && (this.x = void 0 === d ? g.autoIncrement(this) : d);
                return this
            },
            optionsToObject: function (a) {
                var d = {}, g = this.series,
                    f = g.options.keys,
                    b = f || g.pointArrayMap || ["y"],
                    l = b.length,
                    e = 0,
                    c = 0;
                if (r(a) || null === a) d[b[0]] = a;
                else if (t(a)) for (!f && a.length > l && (g = typeof a[0], "string" === g ? d.name = a[0] : "number" ===
                        g && (d.x = a[0]), e++); c < l;) f && void 0 === a[e] || (d[b[c]] = a[e]), e++, c++;
                else "object" === typeof a &&
                        (d = a, a.dataLabels && (g._hasPointLabels = !0), a.marker && (g._hasPointMarkers = !0));
                return d
            },
            getClassName: function () {
                return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ?
                    " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + (void 0 !== this.colorIndex ?
                    " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className :
                    "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative",
                    "") : "")
            },
            getZone: function () {
                var a =
                    this.series,
                    d = a.zones,
                    a = a.zoneAxis || "y",
                    f = 0,
                    h;
                for (h = d[f]; this[a] >= h.value;) h = d[++f];
                h && h.color && !this.options.color && (this.color = h.color);
                return h
            },
            destroy: function () {
                var a = this.series.chart,
                    f = a.hoverPoints,
                    h;
                a.pointCount--;
                f && (this.setState(), B(f, this), f.length || (a.hoverPoints = null));
                if (this === a.hoverPoint) this.onMouseOut();
                if (this.graphic || this.dataLabel) d(this), this.destroyElements();
                this.legendItem && a.legend.destroyItem(this);
                for (h in this) this[h] = null
            },
            destroyElements: function () {
                for (var a = ["graphic",
                    "dataLabel", "dataLabelUpper", "connector", "shadowGroup"], d, f = 6; f--;) d = a[f], this[d] && (
                        this[d] = this[d].destroy())
            },
            getLabelConfig: function () {
                return {
                    x: this.category,
                    y: this.y,
                    color: this.color,
                    colorIndex: this.colorIndex,
                    key: this.name || this.category,
                    series: this.series,
                    point: this,
                    percentage: this.percentage,
                    total: this.total || this.stackTotal
                }
            },
            tooltipFormatter: function (a) {
                var d = this.series,
                    g = d.tooltipOptions,
                    f = m(g.valueDecimals, ""),
                    b = g.valuePrefix || "",
                    l = g.valueSuffix || "";
                F(d.pointArrayMap || ["y"], function (e) {
                    e =
                        "{point." + e;
                    if (b || l) a = a.replace(e + "}", b + e + "}" + l);
                    a = a.replace(e + "}", e + ":,." + f + "f}")
                });
                return h(a, {
                    point: this,
                    series: this.series
                })
            },
            firePointEvent: function (a, d, h) {
                var g = this,
                    b = this.series.options;
                (b.point.events[a] || g.options && g.options.events && g.options.events[a]) && this.importEvents();
                "click" === a && b.allowPointSelect && (h = function (a) {
                    g.select && g.select(null, a.ctrlKey || a.metaKey || a.shiftKey)
                });
                f(this, a, d, h)
            },
            visible: !0
        }
    })(J);
    (function (a) {
        var z = a.addEvent,
            F = a.animObject,
            D = a.arrayMax,
            B = a.arrayMin,
            f = a.correctFloat,
            h = a.Date,
            t = a.defaultOptions,
            r = a.defaultPlotOptions,
            m = a.defined,
            d = a.each,
            g = a.erase,
            n = a.extend,
            y = a.fireEvent,
            w = a.grep,
            b = a.isArray,
            l = a.isNumber,
            e = a.isString,
            c = a.merge,
            E = a.pick,
            u = a.removeEvent,
            q = a.splat,
            x = a.SVGElement,
            A = a.syncTimeout,
            H = a.win;
        a.Series = a.seriesType("line", null, {
            lineWidth: 2,
            allowPointSelect: !1,
            showCheckbox: !1,
            animation: {
                duration: 1E3
            },
            events: {},
            marker: {
                lineWidth: 0,
                lineColor: "#ffffff",
                radius: 4,
                states: {
                    hover: {
                        animation: {
                            duration: 50
                        },
                        enabled: !0,
                        radiusPlus: 2,
                        lineWidthPlus: 1
                    },
                    select: {
                        fillColor: "#cccccc",
                        lineColor: "#000000",
                        lineWidth: 2
                    }
                }
            },
            point: {
                events: {}
            },
            dataLabels: {
                align: "center",
                formatter: function () {
                    return null === this.y ? "" : a.numberFormat(this.y, -1)
                },
                style: {
                    fontSize: "11px",
                    fontWeight: "bold",
                    color: "contrast",
                    textOutline: "1px contrast"
                },
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                padding: 5
            },
            cropThreshold: 300,
            pointRange: 0,
            softThreshold: !0,
            states: {
                hover: {
                    animation: {
                        duration: 50
                    },
                    lineWidthPlus: 1,
                    marker: {},
                    halo: {
                        size: 10,
                        opacity: .25
                    }
                },
                select: {
                    marker: {}
                }
            },
            stickyTracking: !0,
            turboThreshold: 1E3,
            findNearestPointBy: "x"
        }, {
            isCartesian: !0,
            pointClass: a.Point,
            sorted: !0,
            requireSorting: !0,
            directTouch: !1,
            axisTypes: ["xAxis", "yAxis"],
            colorCounter: 0,
            parallelArrays: ["x", "y"],
            coll: "series",
            init: function (a, b) {
                var c = this,
                    e, k, g = a.series,
                    f;
                c.chart = a;
                c.options = b = c.setOptions(b);
                c.linkedSeries = [];
                c.bindAxes();
                n(c, {
                    name: b.name,
                    state: "",
                    visible: !1 !== b.visible,
                    selected: !0 === b.selected
                });
                k = b.events;
                for (e in k) z(c, e, k[e]);
                if (k && k.click || b.point && b.point.events && b.point.events.click || b.allowPointSelect) a.runTrackerClick = !
                        0;
                c.getColor();
                c.getSymbol();
                d(c.parallelArrays, function (a) {
                    c[a + "Data"] = []
                });
                c.setData(b.data, !1);
                c.isCartesian && (a.hasCartesianSeries = !0);
                g.length && (f = g[g.length - 1]);
                c._i = E(f && f._i, -1) + 1;
                a.orderSeries(this.insert(g))
            },
            insert: function (a) {
                var b = this.options.index,
                    c;
                if (l(b)) {
                    for (c = a.length; c--;) if (b >= E(a[c].options.index, a[c]._i)) {
                            a.splice(c + 1, 0, this);
                            break
                        } - 1 === c && a.unshift(this);
                    c += 1
                } else a.push(this);
                return E(c, a.length - 1)
            },
            bindAxes: function () {
                var b = this,
                    c = b.options,
                    e = b.chart,
                    g;
                d(b.axisTypes || [], function (k) {
                    d(e[k], function (a) {
                        g = a.options;
                        if (c[k] === g.index || void 0 !== c[k] && c[k] === g.id || void 0 === c[k] && 0 === g.index) b
                                .insert(a.series), b[k] = a, a.isDirty = !0
                    });
                    b[k] || b.optionalAxis === k || a.error(18, !0)
                })
            },
            updateParallelArrays: function (a, b) {
                var c = a.series,
                    e = arguments,
                    k = l(b) ? function (e) {
                        var d = "y" === e && c.toYData ? c.toYData(a) : a[e];
                        c[e + "Data"][b] = d
                    } : function (a) {
                        Array.prototype[b].apply(c[a + "Data"], Array.prototype.slice.call(e, 2))
                    };
                d(c.parallelArrays, k)
            },
            autoIncrement: function () {
                var a = this.options,
                    b = this.xIncrement,
                    c, e = a.pointIntervalUnit,
                    b = E(b, a.pointStart, 0);
                this.pointInterval = c = E(this.pointInterval, a.pointInterval, 1);
                e && (a = new h(b), "day" === e ? a = +a[h.hcSetDate](a[h.hcGetDate]() + c) : "month" === e ? a = +a[h.hcSetMonth](
                    a[h.hcGetMonth]() + c) : "year" === e && (a = +a[h.hcSetFullYear](a[h.hcGetFullYear]() + c)), c = a -
                    b);
                this.xIncrement = b + c;
                return b
            },
            setOptions: function (a) {
                var b = this.chart,
                    e = b.options.plotOptions,
                    b = b.userOptions || {}, d = b.plotOptions || {}, k = e[this.type];
                this.userOptions = a;
                e = c(k, e.series, a);
                this.tooltipOptions = c(t.tooltip, t.plotOptions[this.type].tooltip,
                    b.tooltip, d.series && d.series.tooltip, d[this.type] && d[this.type].tooltip, a.tooltip);
                this.stickyTracking = E(a.stickyTracking, d[this.type] && d[this.type].stickyTracking, d.series && d.series
                    .stickyTracking, this.tooltipOptions.shared && !this.noSharedTooltip ? !0 : e.stickyTracking);
                null === k.marker && delete e.marker;
                this.zoneAxis = e.zoneAxis;
                a = this.zones = (e.zones || []).slice();
                !e.negativeColor && !e.negativeFillColor || e.zones || a.push({
                    value: e[this.zoneAxis + "Threshold"] || e.threshold || 0,
                    className: "highcharts-negative",
                    color: e.negativeColor,
                    fillColor: e.negativeFillColor
                });
                a.length && m(a[a.length - 1].value) && a.push({
                    color: this.color,
                    fillColor: this.fillColor
                });
                return e
            },
            getCyclic: function (a, b, c) {
                var e, d = this.chart,
                    k = this.userOptions,
                    g = a + "Index",
                    f = a + "Counter",
                    l = c ? c.length : E(d.options.chart[a + "Count"], d[a + "Count"]);
                b || (e = E(k[g], k["_" + g]), m(e) || (d.series.length || (d[f] = 0), k["_" + g] = e = d[f] % l, d[f] +=
                    1), c && (b = c[e]));
                void 0 !== e && (this[g] = e);
                this[a] = b
            },
            getColor: function () {
                this.options.colorByPoint ? this.options.color = null : this.getCyclic("color",
                    this.options.color || r[this.type].color, this.chart.options.colors)
            },
            getSymbol: function () {
                this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols)
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawLineMarker,
            setData: function (c, g, f, q) {
                var k = this,
                    p = k.points,
                    h = p && p.length || 0,
                    n, m = k.options,
                    u = k.chart,
                    G = null,
                    x = k.xAxis,
                    r = m.turboThreshold,
                    w = this.xData,
                    A = this.yData,
                    t = (n = k.pointArrayMap) && n.length;
                c = c || [];
                n = c.length;
                g = E(g, !0);
                if (!1 !== q && n && h === n && !k.cropped && !k.hasGroupedData && k.visible) d(c, function (a,
                        b) {
                        p[b].update && a !== m.data[b] && p[b].update(a, !1, null, !1)
                    });
                else {
                    k.xIncrement = null;
                    k.colorCounter = 0;
                    d(this.parallelArrays, function (a) {
                        k[a + "Data"].length = 0
                    });
                    if (r && n > r) {
                        for (f = 0; null === G && f < n;) G = c[f], f++;
                        if (l(G)) for (f = 0; f < n; f++) w[f] = this.autoIncrement(), A[f] = c[f];
                        else if (b(G)) if (t) for (f = 0; f < n; f++) G = c[f], w[f] = G[0], A[f] = G.slice(1, t + 1);
                            else for (f = 0; f < n; f++) G = c[f], w[f] = G[0], A[f] = G[1];
                            else a.error(12)
                    } else for (f = 0; f < n; f++) void 0 !== c[f] && (G = {
                                series: k
                            }, k.pointClass.prototype.applyOptions.apply(G, [c[f]]), k.updateParallelArrays(G,
                                f));
                    e(A[0]) && a.error(14, !0);
                    k.data = [];
                    k.options.data = k.userOptions.data = c;
                    for (f = h; f--;) p[f] && p[f].destroy && p[f].destroy();
                    x && (x.minRange = x.userMinRange);
                    k.isDirty = u.isDirtyBox = !0;
                    k.isDirtyData = !! p;
                    f = !1
                }
                "point" === m.legendType && (this.processData(), this.generatePoints());
                g && u.redraw(f)
            },
            processData: function (b) {
                var c = this.xData,
                    e = this.yData,
                    d = c.length,
                    k;
                k = 0;
                var g, f, l = this.xAxis,
                    q, h = this.options;
                q = h.cropThreshold;
                var n = this.getExtremesFromAll || h.getExtremesFromAll,
                    m = this.isCartesian,
                    h = l && l.val2lin,
                    u = l &&
                        l.isLog,
                    x, r;
                if (m && !this.isDirty && !l.isDirty && !this.yAxis.isDirty && !b) return !1;
                l && (b = l.getExtremes(), x = b.min, r = b.max);
                if (m && this.sorted && !n && (!q || d > q || this.forceCrop)) if (c[d - 1] < x || c[0] > r) c = [], e = [];
                    else if (c[0] < x || c[d - 1] > r) k = this.cropData(this.xData, this.yData, x, r), c = k.xData, e =
                        k.yData, k = k.start, g = !0;
                for (q = c.length || 1; --q;) d = u ? h(c[q]) - h(c[q - 1]) : c[q] - c[q - 1], 0 < d && (void 0 === f ||
                        d < f) ? f = d : 0 > d && this.requireSorting && a.error(15);
                this.cropped = g;
                this.cropStart = k;
                this.processedXData = c;
                this.processedYData = e;
                this.closestPointRange =
                    f
            },
            cropData: function (a, b, c, e) {
                var d = a.length,
                    k = 0,
                    g = d,
                    f = E(this.cropShoulder, 1),
                    l;
                for (l = 0; l < d; l++) if (a[l] >= c) {
                        k = Math.max(0, l - f);
                        break
                    }
                for (c = l; c < d; c++) if (a[c] > e) {
                        g = c + f;
                        break
                    }
                return {
                    xData: a.slice(k, g),
                    yData: b.slice(k, g),
                    start: k,
                    end: g
                }
            },
            generatePoints: function () {
                var a = this.options.data,
                    b = this.data,
                    c, e = this.processedXData,
                    d = this.processedYData,
                    g = this.pointClass,
                    f = e.length,
                    l = this.cropStart || 0,
                    h, n = this.hasGroupedData,
                    m, u = [],
                    x;
                b || n || (b = [], b.length = a.length, b = this.data = b);
                for (x = 0; x < f; x++) h = l + x, n ? (m = (new g).init(this, [e[x]].concat(q(d[x]))), m.dataGroup =
                        this.groupMap[x]) : (m = b[h]) || void 0 === a[h] || (b[h] = m = (new g).init(this, a[h], e[x])),
                        m && (m.index = h, u[x] = m);
                if (b && (f !== (c = b.length) || n)) for (x = 0; x < c; x++) x !== l || n || (x += f), b[x] && (b[x].destroyElements(),
                            b[x].plotX = void 0);
                this.data = b;
                this.points = u
            },
            getExtremes: function (a) {
                var c = this.yAxis,
                    e = this.processedXData,
                    d, k = [],
                    g = 0;
                d = this.xAxis.getExtremes();
                var f = d.min,
                    q = d.max,
                    h, n, m, u;
                a = a || this.stackedYData || this.processedYData || [];
                d = a.length;
                for (u = 0; u < d; u++) if (n = e[u], m = a[u], h = (l(m, !0) || b(m)) && (!c.positiveValuesOnly || m.length ||
                        0 < m), n = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (e[u] ||
                        n) >= f && (e[u] || n) <= q, h && n) if (h = m.length) for (; h--;) null !== m[h] && (k[g++] =
                                    m[h]);
                        else k[g++] = m;
                this.dataMin = B(k);
                this.dataMax = D(k)
            },
            translate: function () {
                this.processedXData || this.processData();
                this.generatePoints();
                var a = this.options,
                    b = a.stacking,
                    c = this.xAxis,
                    e = c.categories,
                    d = this.yAxis,
                    g = this.points,
                    h = g.length,
                    q = !! this.modifyValue,
                    n = a.pointPlacement,
                    u = "between" === n || l(n),
                    x = a.threshold,
                    r = a.startFromThreshold ? x : 0,
                    w, A, t, y, H = Number.MAX_VALUE;
                "between" === n && (n = .5);
                l(n) && (n *= E(a.pointRange || c.pointRange));
                for (a = 0; a < h; a++) {
                    var B = g[a],
                        z = B.x,
                        D = B.y;
                    A = B.low;
                    var F = b && d.stacks[(this.negStacks && D < (r ? 0 : x) ? "-" : "") + this.stackKey],
                        J;
                    d.positiveValuesOnly && null !== D && 0 >= D && (B.isNull = !0);
                    B.plotX = w = f(Math.min(Math.max(-1E5, c.translate(z, 0, 0, 0, 1, n, "flags" === this.type)), 1E5));
                    b && this.visible && !B.isNull && F && F[z] && (y = this.getStackIndicator(y, z, this.index), J = F[
                        z], D = J.points[y.key], A = D[0], D =
                        D[1], A === r && y.key === F[z].base && (A = E(x, d.min)), d.positiveValuesOnly && 0 >= A && (A =
                        null), B.total = B.stackTotal = J.total, B.percentage = J.total && B.y / J.total * 100, B.stackY =
                        D, J.setOffset(this.pointXOffset || 0, this.barW || 0));
                    B.yBottom = m(A) ? d.translate(A, 0, 1, 0, 1) : null;
                    q && (D = this.modifyValue(D, B));
                    B.plotY = A = "number" === typeof D && Infinity !== D ? Math.min(Math.max(-1E5, d.translate(D, 0, 1,
                        0, 1)), 1E5) : void 0;
                    B.isInside = void 0 !== A && 0 <= A && A <= d.len && 0 <= w && w <= c.len;
                    B.clientX = u ? f(c.translate(z, 0, 0, 0, 1, n)) : w;
                    B.negative = B.y < (x || 0);
                    B.category = e && void 0 !== e[B.x] ? e[B.x] : B.x;
                    B.isNull || (void 0 !== t && (H = Math.min(H, Math.abs(w - t))), t = w);
                    B.zone = this.zones.length && B.getZone()
                }
                this.closestPointRangePx = H
            },
            getValidPoints: function (a, b) {
                var c = this.chart;
                return w(a || this.points || [], function (a) {
                    return b && !c.isInsidePlot(a.plotX, a.plotY, c.inverted) ? !1 : !a.isNull
                })
            },
            setClip: function (a) {
                var b = this.chart,
                    c = this.options,
                    e = b.renderer,
                    d = b.inverted,
                    k = this.clipBox,
                    g = k || b.clipBox,
                    f = this.sharedClipKey || ["_sharedClip", a && a.duration, a && a.easing, g.height,
                        c.xAxis, c.yAxis].join(),
                    l = b[f],
                    h = b[f + "m"];
                l || (a && (g.width = 0, b[f + "m"] = h = e.clipRect(-99, d ? -b.plotLeft : -b.plotTop, 99, d ? b.chartWidth :
                    b.chartHeight)), b[f] = l = e.clipRect(g), l.count = {
                    length: 0
                });
                a && !l.count[this.index] && (l.count[this.index] = !0, l.count.length += 1);
                !1 !== c.clip && (this.group.clip(a || k ? l : b.clipRect), this.markerGroup.clip(h), this.sharedClipKey =
                    f);
                a || (l.count[this.index] && (delete l.count[this.index], --l.count.length), 0 === l.count.length && f &&
                    b[f] && (k || (b[f] = b[f].destroy()), b[f + "m"] && (b[f + "m"] = b[f + "m"].destroy())))
            },
            animate: function (a) {
                var b = this.chart,
                    c = F(this.options.animation),
                    e;
                a ? this.setClip(c) : (e = this.sharedClipKey, (a = b[e]) && a.animate({
                    width: b.plotSizeX
                }, c), b[e + "m"] && b[e + "m"].animate({
                    width: b.plotSizeX + 99
                }, c), this.animate = null)
            },
            afterAnimate: function () {
                this.setClip();
                y(this, "afterAnimate")
            },
            drawPoints: function () {
                var a = this.points,
                    b = this.chart,
                    c, e, d, g, f = this.options.marker,
                    h, q, n, m, u = this.markerGroup,
                    x = E(f.enabled, this.xAxis.isRadial ? !0 : null, this.closestPointRangePx >= 2 * f.radius);
                if (!1 !== f.enabled || this._hasPointMarkers) for (e =
                        0; e < a.length; e++) d = a[e], c = d.plotY, g = d.graphic, h = d.marker || {}, q = !! d.marker,
                            n = x && void 0 === h.enabled || h.enabled, m = d.isInside, n && l(c) && null !== d.y ? (c =
                            E(h.symbol, this.symbol), d.hasImage = 0 === c.indexOf("url"), n = this.markerAttribs(d, d.selected &&
                            "select"), g ? g[m ? "show" : "hide"](!0).animate(n) : m && (0 < n.width || d.hasImage) &&
                            (d.graphic = g = b.renderer.symbol(c, n.x, n.y, n.width, n.height, q ? h : f).add(u)), g &&
                            g.attr(this.pointAttribs(d, d.selected && "select")), g && g.addClass(d.getClassName(), !0)) :
                            g && (d.graphic = g.destroy())
            },
            markerAttribs: function (a,
                b) {
                var c = this.options.marker,
                    e = a.marker || {}, d = E(e.radius, c.radius);
                b && (c = c.states[b], b = e.states && e.states[b], d = E(b && b.radius, c && c.radius, d + (c && c.radiusPlus ||
                    0)));
                a.hasImage && (d = 0);
                a = {
                    x: Math.floor(a.plotX) - d,
                    y: a.plotY - d
                };
                d && (a.width = a.height = 2 * d);
                return a
            },
            pointAttribs: function (a, b) {
                var c = this.options.marker,
                    e = a && a.options,
                    d = e && e.marker || {}, g = this.color,
                    k = e && e.color,
                    f = a && a.color,
                    e = E(d.lineWidth, c.lineWidth);
                a = a && a.zone && a.zone.color;
                g = k || a || f || g;
                a = d.fillColor || c.fillColor || g;
                g = d.lineColor || c.lineColor ||
                    g;
                b && (c = c.states[b], b = d.states && d.states[b] || {}, e = E(b.lineWidth, c.lineWidth, e + E(b.lineWidthPlus,
                    c.lineWidthPlus, 0)), a = b.fillColor || c.fillColor || a, g = b.lineColor || c.lineColor || g);
                return {
                    stroke: g,
                    "stroke-width": e,
                    fill: a
                }
            },
            destroy: function () {
                var a = this,
                    b = a.chart,
                    c = /AppleWebKit\/533/.test(H.navigator.userAgent),
                    e, f = a.data || [],
                    l, h, q;
                y(a, "destroy");
                u(a);
                d(a.axisTypes || [], function (b) {
                    (q = a[b]) && q.series && (g(q.series, a), q.isDirty = q.forceRedraw = !0)
                });
                a.legendItem && a.chart.legend.destroyItem(a);
                for (e = f.length; e--;)(l =
                        f[e]) && l.destroy && l.destroy();
                a.points = null;
                clearTimeout(a.animationTimeout);
                for (h in a) a[h] instanceof x && !a[h].survive && (e = c && "group" === h ? "hide" : "destroy", a[h][e]());
                b.hoverSeries === a && (b.hoverSeries = null);
                g(b.series, a);
                b.orderSeries();
                for (h in a) delete a[h]
            },
            getGraphPath: function (a, b, c) {
                var e = this,
                    g = e.options,
                    f = g.step,
                    k, l = [],
                    h = [],
                    q;
                a = a || e.points;
                (k = a.reversed) && a.reverse();
                (f = {
                    right: 1,
                    center: 2
                }[f] || f && 3) && k && (f = 4 - f);
                !g.connectNulls || b || c || (a = this.getValidPoints(a));
                d(a, function (d, k) {
                    var n = d.plotX,
                        p = d.plotY,
                        u = a[k - 1];
                    (d.leftCliff || u && u.rightCliff) && !c && (q = !0);
                    d.isNull && !m(b) && 0 < k ? q = !g.connectNulls : d.isNull && !b ? q = !0 : (0 === k || q ? k = [
                            "M", d.plotX, d.plotY] : e.getPointSpline ? k = e.getPointSpline(a, d, k) : f ? (k = 1 ===
                        f ? ["L", u.plotX, p] : 2 === f ? ["L", (u.plotX + n) / 2, u.plotY, "L", (u.plotX + n) / 2, p] : [
                            "L", n, u.plotY], k.push("L", n, p)) : k = ["L", n, p], h.push(d.x), f && h.push(d.x), l.push
                        .apply(l, k), q = !1)
                });
                l.xMap = h;
                return e.graphPath = l
            },
            drawGraph: function () {
                var a = this,
                    b = this.options,
                    c = (this.gappedPath || this.getGraphPath).call(this),
                    e = [["graph", "highcharts-graph", b.lineColor || this.color, b.dashStyle]];
                d(this.zones, function (c, d) {
                    e.push(["zone-graph-" + d, "highcharts-graph highcharts-zone-graph-" + d + " " + (c.className || ""),
                            c.color || a.color, c.dashStyle || b.dashStyle])
                });
                d(e, function (e, d) {
                    var g = e[0],
                        f = a[g];
                    f ? (f.endX = c.xMap, f.animate({
                        d: c
                    })) : c.length && (a[g] = a.chart.renderer.path(c).addClass(e[1]).attr({
                        zIndex: 1
                    }).add(a.group), f = {
                        stroke: e[2],
                        "stroke-width": b.lineWidth,
                        fill: a.fillGraph && a.color || "none"
                    }, e[3] ? f.dashstyle = e[3] : "square" !== b.linecap &&
                        (f["stroke-linecap"] = f["stroke-linejoin"] = "round"), f = a[g].attr(f).shadow(2 > d && b.shadow));
                    f && (f.startX = c.xMap, f.isArea = c.isArea)
                })
            },
            applyZones: function () {
                var a = this,
                    b = this.chart,
                    c = b.renderer,
                    e = this.zones,
                    g, f, l = this.clips || [],
                    h, q = this.graph,
                    n = this.area,
                    m = Math.max(b.chartWidth, b.chartHeight),
                    u = this[(this.zoneAxis || "y") + "Axis"],
                    x, r, w = b.inverted,
                    A, t, y, H, B = !1;
                e.length && (q || n) && u && void 0 !== u.min && (r = u.reversed, A = u.horiz, q && q.hide(), n && n.hide(),
                    x = u.getExtremes(), d(e, function (e, d) {
                    g = r ? A ? b.plotWidth : 0 : A ? 0 :
                        u.toPixels(x.min);
                    g = Math.min(Math.max(E(f, g), 0), m);
                    f = Math.min(Math.max(Math.round(u.toPixels(E(e.value, x.max), !0)), 0), m);
                    B && (g = f = u.toPixels(x.max));
                    t = Math.abs(g - f);
                    y = Math.min(g, f);
                    H = Math.max(g, f);
                    u.isXAxis ? (h = {
                        x: w ? H : y,
                        y: 0,
                        width: t,
                        height: m
                    }, A || (h.x = b.plotHeight - h.x)) : (h = {
                        x: 0,
                        y: w ? H : y,
                        width: m,
                        height: t
                    }, A && (h.y = b.plotWidth - h.y));
                    w && c.isVML && (h = u.isXAxis ? {
                        x: 0,
                        y: r ? y : H,
                        height: h.width,
                        width: b.chartWidth
                    } : {
                        x: h.y - b.plotLeft - b.spacingBox.x,
                        y: 0,
                        width: h.height,
                        height: b.chartHeight
                    });
                    l[d] ? l[d].animate(h) : (l[d] =
                        c.clipRect(h), q && a["zone-graph-" + d].clip(l[d]), n && a["zone-area-" + d].clip(l[d]));
                    B = e.value > x.max
                }), this.clips = l)
            },
            invertGroups: function (a) {
                function b() {
                    d(["group", "markerGroup"], function (b) {
                        c[b] && (e.renderer.isVML && c[b].attr({
                            width: c.yAxis.len,
                            height: c.xAxis.len
                        }), c[b].width = c.yAxis.len, c[b].height = c.xAxis.len, c[b].invert(a))
                    })
                }
                var c = this,
                    e = c.chart,
                    g;
                c.xAxis && (g = z(e, "resize", b), z(c, "destroy", g), b(a), c.invertGroups = b)
            },
            plotGroup: function (a, b, c, e, d) {
                var g = this[a],
                    f = !g;
                f && (this[a] = g = this.chart.renderer.g(b).attr({
                    zIndex: e ||
                        .1
                }).add(d), g.addClass("highcharts-series-" + this.index + " highcharts-" + this.type +
                    "-series highcharts-color-" + this.colorIndex + " " + (this.options.className || "")));
                g.attr({
                    visibility: c
                })[f ? "attr" : "animate"](this.getPlotBox());
                return g
            },
            getPlotBox: function () {
                var a = this.chart,
                    b = this.xAxis,
                    c = this.yAxis;
                a.inverted && (b = c, c = this.xAxis);
                return {
                    translateX: b ? b.left : a.plotLeft,
                    translateY: c ? c.top : a.plotTop,
                    scaleX: 1,
                    scaleY: 1
                }
            },
            render: function () {
                var a = this,
                    b = a.chart,
                    c, e = a.options,
                    d = !! a.animate && b.renderer.isSVG && F(e.animation).duration,
                    g = a.visible ? "inherit" : "hidden",
                    f = e.zIndex,
                    l = a.hasRendered,
                    h = b.seriesGroup,
                    q = b.inverted;
                c = a.plotGroup("group", "series", g, f, h);
                a.markerGroup = a.plotGroup("markerGroup", "markers", g, f, h);
                d && a.animate(!0);
                c.inverted = a.isCartesian ? q : !1;
                a.drawGraph && (a.drawGraph(), a.applyZones());
                a.drawDataLabels && a.drawDataLabels();
                a.visible && a.drawPoints();
                a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();
                a.invertGroups(q);
                !1 === e.clip || a.sharedClipKey || l || c.clip(b.clipRect);
                d && a.animate();
                l || (a.animationTimeout =
                    A(function () {
                    a.afterAnimate()
                }, d));
                a.isDirty = !1;
                a.hasRendered = !0
            },
            redraw: function () {
                var a = this.chart,
                    b = this.isDirty || this.isDirtyData,
                    c = this.group,
                    e = this.xAxis,
                    d = this.yAxis;
                c && (a.inverted && c.attr({
                    width: a.plotWidth,
                    height: a.plotHeight
                }), c.animate({
                    translateX: E(e && e.left, a.plotLeft),
                    translateY: E(d && d.top, a.plotTop)
                }));
                this.translate();
                this.render();
                b && delete this.kdTree
            },
            kdAxisArray: ["clientX", "plotY"],
            searchPoint: function (a, b) {
                var c = this.xAxis,
                    e = this.yAxis,
                    d = this.chart.inverted;
                return this.searchKDTree({
                    clientX: d ? c.len - a.chartY + c.pos : a.chartX - c.pos,
                    plotY: d ? e.len - a.chartX + e.pos : a.chartY - e.pos
                }, b)
            },
            buildKDTree: function () {
                function a(c, e, d) {
                    var g, f;
                    if (f = c && c.length) return g = b.kdAxisArray[e % d], c.sort(function (a, b) {
                            return a[g] - b[g]
                        }), f = Math.floor(f / 2), {
                            point: c[f],
                            left: a(c.slice(0, f), e + 1, d),
                            right: a(c.slice(f + 1), e + 1, d)
                    }
                }
                this.buildingKdTree = !0;
                var b = this,
                    c = -1 < b.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                delete b.kdTree;
                A(function () {
                    b.kdTree = a(b.getValidPoints(null, !b.directTouch), c, c);
                    b.buildingKdTree = !1
                }, b.options.kdNow ?
                    0 : 1)
            },
            searchKDTree: function (a, b) {
                function c(a, b, k, l) {
                    var h = b.point,
                        q = e.kdAxisArray[k % l],
                        n, p, u = h;
                    p = m(a[d]) && m(h[d]) ? Math.pow(a[d] - h[d], 2) : null;
                    n = m(a[g]) && m(h[g]) ? Math.pow(a[g] - h[g], 2) : null;
                    n = (p || 0) + (n || 0);
                    h.dist = m(n) ? Math.sqrt(n) : Number.MAX_VALUE;
                    h.distX = m(p) ? Math.sqrt(p) : Number.MAX_VALUE;
                    q = a[q] - h[q];
                    n = 0 > q ? "left" : "right";
                    p = 0 > q ? "right" : "left";
                    b[n] && (n = c(a, b[n], k + 1, l), u = n[f] < u[f] ? n : h);
                    b[p] && Math.sqrt(q * q) < u[f] && (a = c(a, b[p], k + 1, l), u = a[f] < u[f] ? a : u);
                    return u
                }
                var e = this,
                    d = this.kdAxisArray[0],
                    g = this.kdAxisArray[1],
                    f = b ? "distX" : "dist";
                b = -1 < e.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                this.kdTree || this.buildingKdTree || this.buildKDTree();
                if (this.kdTree) return c(a, this.kdTree, b, b)
            }
        })
    })(J);
    (function (a) {
        var z = a.addEvent,
            F = a.animate,
            D = a.Axis,
            B = a.createElement,
            f = a.css,
            h = a.defined,
            t = a.each,
            r = a.erase,
            m = a.extend,
            d = a.fireEvent,
            g = a.inArray,
            n = a.isNumber,
            y = a.isObject,
            w = a.merge,
            b = a.pick,
            l = a.Point,
            e = a.Series,
            c = a.seriesTypes,
            E = a.setAnimation,
            u = a.splat;
        m(a.Chart.prototype, {
            addSeries: function (a, c, e) {
                var g, f = this;
                a && (c = b(c, !0),
                    d(f, "addSeries", {
                    options: a
                }, function () {
                    g = f.initSeries(a);
                    f.isDirtyLegend = !0;
                    f.linkSeries();
                    c && f.redraw(e)
                }));
                return g
            },
            addAxis: function (a, c, e, d) {
                var g = c ? "xAxis" : "yAxis",
                    f = this.options;
                a = w(a, {
                    index: this[g].length,
                    isX: c
                });
                new D(this, a);
                f[g] = u(f[g] || {});
                f[g].push(a);
                b(e, !0) && this.redraw(d)
            },
            showLoading: function (a) {
                var b = this,
                    c = b.options,
                    e = b.loadingDiv,
                    d = c.loading,
                    g = function () {
                        e && f(e, {
                            left: b.plotLeft + "px",
                            top: b.plotTop + "px",
                            width: b.plotWidth + "px",
                            height: b.plotHeight + "px"
                        })
                    };
                e || (b.loadingDiv = e = B("div", {
                    className: "highcharts-loading highcharts-loading-hidden"
                }, null, b.container), b.loadingSpan = B("span", {
                    className: "highcharts-loading-inner"
                }, null, e), z(b, "redraw", g));
                e.className = "highcharts-loading";
                b.loadingSpan.innerHTML = a || c.lang.loading;
                f(e, m(d.style, {
                    zIndex: 10
                }));
                f(b.loadingSpan, d.labelStyle);
                b.loadingShown || (f(e, {
                    opacity: 0,
                    display: ""
                }), F(e, {
                    opacity: d.style.opacity || .5
                }, {
                    duration: d.showDuration || 0
                }));
                b.loadingShown = !0;
                g()
            },
            hideLoading: function () {
                var a = this.options,
                    b = this.loadingDiv;
                b && (b.className =
                    "highcharts-loading highcharts-loading-hidden", F(b, {
                    opacity: 0
                }, {
                    duration: a.loading.hideDuration || 100,
                    complete: function () {
                        f(b, {
                            display: "none"
                        })
                    }
                }));
                this.loadingShown = !1
            },
            propsRequireDirtyBox: "backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow"
                .split(" "),
            propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions"
                .split(" "),
            update: function (a, c) {
                var e, d = {
                        credits: "addCredits",
                        title: "setTitle",
                        subtitle: "setSubtitle"
                    }, f = a.chart,
                    l, q;
                if (f) {
                    w(!0, this.options.chart, f);
                    "className" in f && this.setClassName(f.className);
                    if ("inverted" in f || "polar" in f) this.propFromSeries(), l = !0;
                    "alignTicks" in f && (l = !0);
                    for (e in f) f.hasOwnProperty(e) && (-1 !== g("chart." + e, this.propsRequireUpdateSeries) && (q = !
                            0), -1 !== g(e, this.propsRequireDirtyBox) && (this.isDirtyBox = !0));
                    "style" in f && this.renderer.setStyle(f.style)
                }
                for (e in a) {
                    if (this[e] && "function" ===
                        typeof this[e].update) this[e].update(a[e], !1);
                    else if ("function" === typeof this[d[e]]) this[d[e]](a[e]);
                    "chart" !== e && -1 !== g(e, this.propsRequireUpdateSeries) && (q = !0)
                }
                a.colors && (this.options.colors = a.colors);
                a.plotOptions && w(!0, this.options.plotOptions, a.plotOptions);
                t(["xAxis", "yAxis", "series", "colorAxis", "pane"], function (b) {
                    a[b] && t(u(a[b]), function (a, c) {
                        (c = h(a.id) && this.get(a.id) || this[b][c]) && c.coll === b && c.update(a, !1)
                    }, this)
                }, this);
                l && t(this.axes, function (a) {
                    a.update({}, !1)
                });
                q && t(this.series, function (a) {
                    a.update({}, !1)
                });
                a.loading && w(!0, this.options.loading, a.loading);
                e = f && f.width;
                f = f && f.height;
                n(e) && e !== this.chartWidth || n(f) && f !== this.chartHeight ? this.setSize(e, f) : b(c, !0) && this
                    .redraw()
            },
            setSubtitle: function (a) {
                this.setTitle(void 0, a)
            }
        });
        m(l.prototype, {
            update: function (a, c, e, d) {
                function g() {
                    f.applyOptions(a);
                    null === f.y && h && (f.graphic = h.destroy());
                    y(a, !0) && (h && h.element && a && a.marker && a.marker.symbol && (f.graphic = h.destroy()), a &&
                        a.dataLabels && f.dataLabel && (f.dataLabel = f.dataLabel.destroy()));
                    n = f.index;
                    l.updateParallelArrays(f,
                        n);
                    m.data[n] = y(m.data[n], !0) || y(a, !0) ? f.options : a;
                    l.isDirty = l.isDirtyData = !0;
                    !l.fixedBox && l.hasCartesianSeries && (q.isDirtyBox = !0);
                    "point" === m.legendType && (q.isDirtyLegend = !0);
                    c && q.redraw(e)
                }
                var f = this,
                    l = f.series,
                    h = f.graphic,
                    n, q = l.chart,
                    m = l.options;
                c = b(c, !0);
                !1 === d ? g() : f.firePointEvent("update", {
                    options: a
                }, g)
            },
            remove: function (a, b) {
                this.series.removePoint(g(this, this.series.data), a, b)
            }
        });
        m(e.prototype, {
            addPoint: function (a, c, e, d) {
                var f = this.options,
                    g = this.data,
                    l = this.chart,
                    h = this.xAxis,
                    h = h && h.hasNames &&
                        h.names,
                    n = f.data,
                    q, m, u = this.xData,
                    x, r;
                c = b(c, !0);
                q = {
                    series: this
                };
                this.pointClass.prototype.applyOptions.apply(q, [a]);
                r = q.x;
                x = u.length;
                if (this.requireSorting && r < u[x - 1]) for (m = !0; x && u[x - 1] > r;) x--;
                this.updateParallelArrays(q, "splice", x, 0, 0);
                this.updateParallelArrays(q, x);
                h && q.name && (h[r] = q.name);
                n.splice(x, 0, a);
                m && (this.data.splice(x, 0, null), this.processData());
                "point" === f.legendType && this.generatePoints();
                e && (g[0] && g[0].remove ? g[0].remove(!1) : (g.shift(), this.updateParallelArrays(q, "shift"), n.shift()));
                this.isDirtyData = this.isDirty = !0;
                c && l.redraw(d)
            },
            removePoint: function (a, c, e) {
                var d = this,
                    f = d.data,
                    g = f[a],
                    l = d.points,
                    h = d.chart,
                    n = function () {
                        l && l.length === f.length && l.splice(a, 1);
                        f.splice(a, 1);
                        d.options.data.splice(a, 1);
                        d.updateParallelArrays(g || {
                            series: d
                        }, "splice", a, 1);
                        g && g.destroy();
                        d.isDirty = !0;
                        d.isDirtyData = !0;
                        c && h.redraw()
                    };
                E(e, h);
                c = b(c, !0);
                g ? g.firePointEvent("remove", null, n) : n()
            },
            remove: function (a, c, e) {
                function f() {
                    g.destroy();
                    l.isDirtyLegend = l.isDirtyBox = !0;
                    l.linkSeries();
                    b(a, !0) && l.redraw(c)
                }
                var g = this,
                    l = g.chart;
                !1 !== e ? d(g, "remove", null, f) : f()
            },
            update: function (a, e) {
                var d = this,
                    f = this.chart,
                    g = this.userOptions,
                    l = this.oldType || this.type,
                    h = a.type || g.type || f.options.chart.type,
                    n = c[l].prototype,
                    q = ["group", "markerGroup", "dataLabelsGroup"],
                    p;
                if (h && h !== l || void 0 !== a.zIndex) q.length = 0;
                t(q, function (a) {
                    q[a] = d[a];
                    delete d[a]
                });
                a = w(g, {
                    animation: !1,
                    index: this.index,
                    pointStart: this.xData[0]
                }, {
                    data: this.options.data
                }, a);
                this.remove(!1, null, !1);
                for (p in n) this[p] = void 0;
                m(this, c[h || l].prototype);
                t(q, function (a) {
                    d[a] =
                        q[a]
                });
                this.init(f, a);
                this.oldType = l;
                f.linkSeries();
                b(e, !0) && f.redraw(!1)
            }
        });
        m(D.prototype, {
            update: function (a, c) {
                var e = this.chart;
                a = e.options[this.coll][this.options.index] = w(this.userOptions, a);
                this.destroy(!0);
                this.init(e, m(a, {
                    events: void 0
                }));
                e.isDirtyBox = !0;
                b(c, !0) && e.redraw()
            },
            remove: function (a) {
                for (var c = this.chart, e = this.coll, d = this.series, f = d.length; f--;) d[f] && d[f].remove(!1);
                r(c.axes, this);
                r(c[e], this);
                c.options[e].splice(this.options.index, 1);
                t(c[e], function (a, b) {
                    a.options.index = b
                });
                this.destroy();
                c.isDirtyBox = !0;
                b(a, !0) && c.redraw()
            },
            setTitle: function (a, b) {
                this.update({
                    title: a
                }, b)
            },
            setCategories: function (a, b) {
                this.update({
                    categories: a
                }, b)
            }
        })
    })(J);
    (function (a) {
        var z = a.animObject,
            F = a.color,
            D = a.each,
            B = a.extend,
            f = a.isNumber,
            h = a.merge,
            t = a.pick,
            r = a.Series,
            m = a.seriesType,
            d = a.svg;
        m("column", "line", {
            borderRadius: 0,
            crisp: !0,
            groupPadding: .2,
            marker: null,
            pointPadding: .1,
            minPointLength: 0,
            cropThreshold: 50,
            pointRange: null,
            states: {
                hover: {
                    halo: !1,
                    brightness: .1,
                    shadow: !1
                },
                select: {
                    color: "#cccccc",
                    borderColor: "#000000",
                    shadow: !1
                }
            },
            dataLabels: {
                align: null,
                verticalAlign: null,
                y: null
            },
            softThreshold: !1,
            startFromThreshold: !0,
            stickyTracking: !1,
            tooltip: {
                distance: 6
            },
            threshold: 0,
            borderColor: "#ffffff"
        }, {
            cropShoulder: 0,
            directTouch: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            negStacks: !0,
            init: function () {
                r.prototype.init.apply(this, arguments);
                var a = this,
                    d = a.chart;
                d.hasRendered && D(d.series, function (d) {
                    d.type === a.type && (d.isDirty = !0)
                })
            },
            getColumnMetrics: function () {
                var a = this,
                    d = a.options,
                    f = a.xAxis,
                    h = a.yAxis,
                    b = f.reversed,
                    l, e = {},
                    c = 0;
                !1 === d.grouping ? c = 1 : D(a.chart.series, function (b) {
                    var d = b.options,
                        f = b.yAxis,
                        g;
                    b.type === a.type && b.visible && h.len === f.len && h.pos === f.pos && (d.stacking ? (l = b.stackKey,
                        void 0 === e[l] && (e[l] = c++), g = e[l]) : !1 !== d.grouping && (g = c++), b.columnIndex = g)
                });
                var m = Math.min(Math.abs(f.transA) * (f.ordinalSlope || d.pointRange || f.closestPointRange || f.tickInterval ||
                    1), f.len),
                    u = m * d.groupPadding,
                    q = (m - 2 * u) / (c || 1),
                    d = Math.min(d.maxPointWidth || f.len, t(d.pointWidth, q * (1 - 2 * d.pointPadding)));
                a.columnMetrics = {
                    width: d,
                    offset: (q - d) / 2 + (u + ((a.columnIndex || 0) + (b ? 1 : 0)) * q - m / 2) * (b ? -1 : 1)
                };
                return a.columnMetrics
            },
            crispCol: function (a, d, f, h) {
                var b = this.chart,
                    g = this.borderWidth,
                    e = -(g % 2 ? .5 : 0),
                    g = g % 2 ? .5 : 1;
                b.inverted && b.renderer.isVML && (g += 1);
                this.options.crisp && (f = Math.round(a + f) + e, a = Math.round(a) + e, f -= a);
                h = Math.round(d + h) + g;
                e = .5 >= Math.abs(d) && .5 < h;
                d = Math.round(d) + g;
                h -= d;
                e && h && (--d, h += 1);
                return {
                    x: a,
                    y: d,
                    width: f,
                    height: h
                }
            },
            translate: function () {
                var a = this,
                    d = a.chart,
                    f = a.options,
                    h = a.dense = 2 > a.closestPointRange * a.xAxis.transA,
                    h = a.borderWidth = t(f.borderWidth,
                        h ? 0 : 1),
                    b = a.yAxis,
                    l = a.translatedThreshold = b.getThreshold(f.threshold),
                    e = t(f.minPointLength, 5),
                    c = a.getColumnMetrics(),
                    m = c.width,
                    u = a.barW = Math.max(m, 1 + 2 * h),
                    q = a.pointXOffset = c.offset;
                d.inverted && (l -= .5);
                f.pointPadding && (u = Math.ceil(u));
                r.prototype.translate.apply(a);
                D(a.points, function (c) {
                    var f = t(c.yBottom, l),
                        g = 999 + Math.abs(f),
                        g = Math.min(Math.max(-g, c.plotY), b.len + g),
                        k = c.plotX + q,
                        h = u,
                        n = Math.min(g, f),
                        r, x = Math.max(g, f) - n;
                    Math.abs(x) < e && e && (x = e, r = !b.reversed && !c.negative || b.reversed && c.negative, n =
                        Math.abs(n -
                        l) > e ? f - e : l - (r ? e : 0));
                    c.barX = k;
                    c.pointWidth = m;
                    c.tooltipPos = d.inverted ? [b.len + b.pos - d.plotLeft - g, a.xAxis.len - k - h / 2, x] : [k + h /
                            2, g + b.pos - d.plotTop, x];
                    c.shapeType = "rect";
                    c.shapeArgs = a.crispCol.apply(a, c.isNull ? [c.plotX, b.len / 2, 0, 0] : [k, n, h, x])
                })
            },
            getSymbol: a.noop,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            drawGraph: function () {
                this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
            },
            pointAttribs: function (a, d) {
                var f = this.options,
                    g, b = this.pointAttrToOptions || {};
                g = b.stroke || "borderColor";
                var l = b["stroke-width"] || "borderWidth",
                    e = a && a.color || this.color,
                    c = a[g] || f[g] || this.color || e,
                    n = a[l] || f[l] || this[l] || 0,
                    b = f.dashStyle;
                a && this.zones.length && (e = (e = a.getZone()) && e.color || a.options.color || this.color);
                d && (a = h(f.states[d], a.options.states && a.options.states[d] || {}), d = a.brightness, e = a.color ||
                    void 0 !== d && F(e).brighten(a.brightness).get() || e, c = a[g] || c, n = a[l] || n, b = a.dashStyle ||
                    b);
                g = {
                    fill: e,
                    stroke: c,
                    "stroke-width": n
                };
                f.borderRadius && (g.r = f.borderRadius);
                b && (g.dashstyle = b);
                return g
            },
            drawPoints: function () {
                var a =
                    this,
                    d = this.chart,
                    m = a.options,
                    r = d.renderer,
                    b = m.animationLimit || 250,
                    l;
                D(a.points, function (e) {
                    var c = e.graphic;
                    if (f(e.plotY) && null !== e.y) {
                        l = e.shapeArgs;
                        if (c) c[d.pointCount < b ? "animate" : "attr"](h(l));
                        else e.graphic = c = r[e.shapeType](l).add(e.group || a.group);
                        c.attr(a.pointAttribs(e, e.selected && "select")).shadow(m.shadow, null, m.stacking && !m.borderRadius);
                        c.addClass(e.getClassName(), !0)
                    } else c && (e.graphic = c.destroy())
                })
            },
            animate: function (a) {
                var f = this,
                    g = this.yAxis,
                    h = f.options,
                    b = this.chart.inverted,
                    l = {};
                d &&
                    (a ? (l.scaleY = .001, a = Math.min(g.pos + g.len, Math.max(g.pos, g.toPixels(h.threshold))), b ? l
                    .translateX = a - g.len : l.translateY = a, f.group.attr(l)) : (l[b ? "translateX" : "translateY"] =
                    g.pos, f.group.animate(l, B(z(f.options.animation), {
                    step: function (a, b) {
                        f.group.attr({
                            scaleY: Math.max(.001, b.pos)
                        })
                    }
                })), f.animate = null))
            },
            remove: function () {
                var a = this,
                    d = a.chart;
                d.hasRendered && D(d.series, function (d) {
                    d.type === a.type && (d.isDirty = !0)
                });
                r.prototype.remove.apply(a, arguments)
            }
        })
    })(J);
    (function (a) {
        var z = a.Series;
        a = a.seriesType;
        a("scatter", "line", {
            lineWidth: 0,
            findNearestPointBy: "xy",
            marker: {
                enabled: !0
            },
            tooltip: {
                headerFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 0.85em"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',
                pointFormat: "x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"
            }
        }, {
            sorted: !1,
            requireSorting: !1,
            noSharedTooltip: !0,
            trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
            takeOrdinalPosition: !1,
            drawGraph: function () {
                this.options.lineWidth &&
                    z.prototype.drawGraph.call(this)
            }
        })
    })(J);
    (function (a) {
        var z = a.addEvent,
            F = a.arrayMax,
            D = a.defined,
            B = a.each,
            f = a.extend,
            h = a.format,
            t = a.map,
            r = a.merge,
            m = a.noop,
            d = a.pick,
            g = a.relativeLength,
            n = a.Series,
            y = a.seriesTypes,
            w = a.stableSort;
        a.distribute = function (a, d) {
            function b(a, b) {
                return a.target - b.target
            }
            var c, f = !0,
                g = a,
                l = [],
                h;
            h = 0;
            for (c = a.length; c--;) h += a[c].size;
            if (h > d) {
                w(a, function (a, b) {
                    return (b.rank || 0) - (a.rank || 0)
                });
                for (h = c = 0; h <= d;) h += a[c].size, c++;
                l = a.splice(c - 1, a.length)
            }
            w(a, b);
            for (a = t(a, function (a) {
                return {
                    size: a.size,
                    targets: [a.target]
                }
            }); f;) {
                for (c = a.length; c--;) f = a[c], h = (Math.min.apply(0, f.targets) + Math.max.apply(0, f.targets)) /
                        2, f.pos = Math.min(Math.max(0, h - f.size / 2), d - f.size);
                c = a.length;
                for (f = !1; c--;) 0 < c && a[c - 1].pos + a[c - 1].size > a[c].pos && (a[c - 1].size += a[c].size, a[c -
                        1].targets = a[c - 1].targets.concat(a[c].targets), a[c - 1].pos + a[c - 1].size > d && (a[c -
                        1].pos = d - a[c - 1].size), a.splice(c, 1), f = !0)
            }
            c = 0;
            B(a, function (a) {
                var b = 0;
                B(a.targets, function () {
                    g[c].pos = a.pos + b;
                    b += g[c].size;
                    c++
                })
            });
            g.push.apply(g, l);
            w(g, b)
        };
        n.prototype.drawDataLabels = function () {
            var a = this,
                f = a.options,
                e = f.dataLabels,
                c = a.points,
                g, n, q = a.hasRendered || 0,
                m, w, t = d(e.defer, !0),
                k = a.chart.renderer;
            if (e.enabled || a._hasPointLabels) a.dlProcessOptions && a.dlProcessOptions(e), w = a.plotGroup(
                    "dataLabelsGroup", "data-labels", t && !q ? "hidden" : "visible", e.zIndex || 6), t && (w.attr({
                    opacity: +q
                }), q || z(a, "afterAnimate", function () {
                    a.visible && w.show(!0);
                    w[f.animation ? "animate" : "attr"]({
                        opacity: 1
                    }, {
                        duration: 200
                    })
                })), n = e, B(c, function (b) {
                    var c, l = b.dataLabel,
                        q, p, u, x = b.connector,
                        t = !l,
                        A;
                    g = b.dlOptions ||
                        b.options && b.options.dataLabels;
                    if (c = d(g && g.enabled, n.enabled) && null !== b.y) for (p in e = r(n, g), q = b.getLabelConfig(),
                            m = e.format ? h(e.format, q) : e.formatter.call(q, e), A = e.style, u = e.rotation, A.color =
                            d(e.color, A.color, a.color, "#000000"), "contrast" === A.color && (b.contrastColor = k.getContrast(
                            b.color || a.color), A.color = e.inside || 0 > e.distance || f.stacking ? b.contrastColor :
                            "#000000"), f.cursor && (A.cursor = f.cursor), q = {
                            fill: e.backgroundColor,
                            stroke: e.borderColor,
                            "stroke-width": e.borderWidth,
                            r: e.borderRadius || 0,
                            rotation: u,
                            padding: e.padding,
                            zIndex: 1
                        }, q) void 0 === q[p] && delete q[p];
                    !l || c && D(m) ? c && D(m) && (l ? q.text = m : (l = b.dataLabel = k[u ? "text" : "label"](m, 0, -
                        9999, e.shape, null, null, e.useHTML, null, "data-label"), l.addClass(
                        "highcharts-data-label-color-" + b.colorIndex + " " + (e.className || "") + (e.useHTML ?
                        "highcharts-tracker" : ""))), l.attr(q), l.css(A).shadow(e.shadow), l.added || l.add(w), a.alignDataLabel(
                        b, l, e, null, t)) : (b.dataLabel = l.destroy(), x && (b.connector = x.destroy()))
                })
        };
        n.prototype.alignDataLabel = function (a, g, e, c, h) {
            var b = this.chart,
                l = b.inverted,
                n = d(a.plotX, -9999),
                m = d(a.plotY, -9999),
                r = g.getBBox(),
                k, w = e.rotation,
                t = e.align,
                E = this.visible && (a.series.forceDL || b.isInsidePlot(n, Math.round(m), l) || c && b.isInsidePlot(n,
                    l ? c.x + 1 : c.y + c.height - 1, l)),
                y = "justify" === d(e.overflow, "justify");
            E && (k = e.style.fontSize, k = b.renderer.fontMetrics(k, g).b, c = f({
                x: l ? b.plotWidth - m : n,
                y: Math.round(l ? b.plotHeight - n : m),
                width: 0,
                height: 0
            }, c), f(e, {
                width: r.width,
                height: r.height
            }), w ? (y = !1, l = b.renderer.rotCorr(k, w), l = {
                x: c.x + e.x + c.width / 2 + l.x,
                y: c.y + e.y + {
                    top: 0,
                    middle: .5,
                    bottom: 1
                }[e.verticalAlign] * c.height
            }, g[h ? "attr" : "animate"](l).attr({
                align: t
            }), n = (w + 720) % 360, n = 180 < n && 360 > n, "left" === t ? l.y -= n ? r.height : 0 : "center" === t ?
                (l.x -= r.width / 2, l.y -= r.height / 2) : "right" === t && (l.x -= r.width, l.y -= n ? 0 : r.height)) :
                (g.align(e, null, c), l = g.alignAttr), y ? a.isLabelJustified = this.justifyDataLabel(g, e, l, r, c, h) :
                d(e.crop, !0) && (E = b.isInsidePlot(l.x, l.y) && b.isInsidePlot(l.x + r.width, l.y + r.height)), e.shape && !
                w && g.attr({
                anchorX: a.plotX,
                anchorY: a.plotY
            }));
            E || (g.attr({
                y: -9999
            }), g.placed = !1)
        };
        n.prototype.justifyDataLabel = function (a, d, e, c, f, g) {
            var b = this.chart,
                l = d.align,
                h = d.verticalAlign,
                n, k, m = a.box ? 0 : a.padding || 0;
            n = e.x + m;
            0 > n && ("right" === l ? d.align = "left" : d.x = -n, k = !0);
            n = e.x + c.width - m;
            n > b.plotWidth && ("left" === l ? d.align = "right" : d.x = b.plotWidth - n, k = !0);
            n = e.y + m;
            0 > n && ("bottom" === h ? d.verticalAlign = "top" : d.y = -n, k = !0);
            n = e.y + c.height - m;
            n > b.plotHeight && ("top" === h ? d.verticalAlign = "bottom" : d.y = b.plotHeight - n, k = !0);
            k && (a.placed = !g, a.align(d, null, f));
            return k
        };
        y.pie && (y.pie.prototype.drawDataLabels = function () {
            var b = this,
                f = b.data,
                e, c = b.chart,
                g = b.options.dataLabels,
                h = d(g.connectorPadding, 10),
                m = d(g.connectorWidth, 1),
                r = c.plotWidth,
                w = c.plotHeight,
                y, k = g.distance,
                G = b.center,
                z = G[2] / 2,
                D = G[1],
                K = 0 < k,
                p, C, M, N, J = [[], []],
                O, v, P, S, R = [0, 0, 0, 0];
            b.visible && (g.enabled || b._hasPointLabels) && (B(f, function (a) {
                a.dataLabel && a.visible && a.dataLabel.shortened && (a.dataLabel.attr({
                    width: "auto"
                }).css({
                    width: "auto",
                    textOverflow: "clip"
                }), a.dataLabel.shortened = !1)
            }), n.prototype.drawDataLabels.apply(b), B(f, function (a) {
                a.dataLabel && a.visible && (J[a.half].push(a),
                    a.dataLabel._pos = null)
            }), B(J, function (d, f) {
                var l, n, m = d.length,
                    q, u, x;
                if (m) for (b.sortByAngle(d, f - .5), 0 < k && (l = Math.max(0, D - z - k), n = Math.min(D + z + k, c.plotHeight),
                        q = t(d, function (a) {
                        if (a.dataLabel) return x = a.dataLabel.getBBox().height || 21, {
                                target: a.labelPos[1] - l + x / 2,
                                size: x,
                                rank: a.y
                        }
                    }), a.distribute(q, n + x - l)), S = 0; S < m; S++) e = d[S], M = e.labelPos, p = e.dataLabel, P = !
                            1 === e.visible ? "hidden" : "inherit", u = M[1], q ? void 0 === q[S].pos ? P = "hidden" :
                            (N = q[S].size, v = l + q[S].pos) : v = u, O = g.justify ? G[0] + (f ? -1 : 1) * (z + k) :
                            b.getX(v < l + 2 || v > n -
                            2 ? u : v, f), p._attr = {
                            visibility: P,
                            align: M[6]
                }, p._pos = {
                    x: O + g.x + ({
                        left: h,
                        right: -h
                    }[M[6]] || 0),
                    y: v + g.y - 10
                }, M.x = O, M.y = v, null === b.options.size && (C = p.getBBox().width, u = null, O - C < h ? (u = Math
                    .round(C - O + h), R[3] = Math.max(u, R[3])) : O + C > r - h && (u = Math.round(O + C - r + h), R[1] =
                    Math.max(u, R[1])), 0 > v - N / 2 ? R[0] = Math.max(Math.round(-v + N / 2), R[0]) : v + N / 2 > w &&
                    (R[2] = Math.max(Math.round(v + N / 2 - w), R[2])), p.sideOverflow = u)
            }), 0 === F(R) || this.verifyDataLabelOverflow(R)) && (this.placeDataLabels(), K && m && B(this.points, function (
                a) {
                var e;
                y = a.connector;
                if ((p = a.dataLabel) && p._pos && a.visible) {
                    P = p._attr.visibility;
                    if (e = !y) a.connector = y = c.renderer.path().addClass(
                            "highcharts-data-label-connector highcharts-color-" + a.colorIndex).add(b.dataLabelsGroup),
                            y.attr({
                            "stroke-width": m,
                            stroke: g.connectorColor || a.color || "#666666"
                        });
                    y[e ? "attr" : "animate"]({
                        d: b.connectorPath(a.labelPos)
                    });
                    y.attr("visibility", P)
                } else y && (a.connector = y.destroy())
            }))
        }, y.pie.prototype.connectorPath = function (a) {
            var b = a.x,
                e = a.y;
            return d(this.options.dataLabels.softConnector, !0) ? ["M", b +
                ("left" === a[6] ? 5 : -5), e, "C", b, e, 2 * a[2] - a[4], 2 * a[3] - a[5], a[2], a[3], "L", a[4], a[5]] : [
                    "M", b + ("left" === a[6] ? 5 : -5), e, "L", a[2], a[3], "L", a[4], a[5]]
        }, y.pie.prototype.placeDataLabels = function () {
            B(this.points, function (a) {
                var b = a.dataLabel;
                b && a.visible && ((a = b._pos) ? (b.sideOverflow && (b._attr.width = b.getBBox().width - b.sideOverflow,
                    b.css({
                    width: b._attr.width + "px",
                    textOverflow: "ellipsis"
                }), b.shortened = !0), b.attr(b._attr), b[b.moved ? "animate" : "attr"](a), b.moved = !0) : b && b.attr({
                    y: -9999
                }))
            }, this)
        }, y.pie.prototype.alignDataLabel =
            m, y.pie.prototype.verifyDataLabelOverflow = function (a) {
            var b = this.center,
                e = this.options,
                c = e.center,
                d = e.minSize || 80,
                f, h;
            null !== c[0] ? f = Math.max(b[2] - Math.max(a[1], a[3]), d) : (f = Math.max(b[2] - a[1] - a[3], d), b[0] +=
                (a[3] - a[1]) / 2);
            null !== c[1] ? f = Math.max(Math.min(f, b[2] - Math.max(a[0], a[2])), d) : (f = Math.max(Math.min(f, b[2] -
                a[0] - a[2]), d), b[1] += (a[0] - a[2]) / 2);
            f < b[2] ? (b[2] = f, b[3] = Math.min(g(e.innerSize || 0, f), f), this.translate(b), this.drawDataLabels &&
                this.drawDataLabels()) : h = !0;
            return h
        });
        y.column && (y.column.prototype.alignDataLabel = function (a, f, e, c, g) {
            var b = this.chart.inverted,
                h = a.series,
                l = a.dlBox || a.shapeArgs,
                m = d(a.below, a.plotY > d(this.translatedThreshold, h.yAxis.len)),
                w = d(e.inside, !! this.options.stacking);
            l && (c = r(l), 0 > c.y && (c.height += c.y, c.y = 0), l = c.y + c.height - h.yAxis.len, 0 < l && (c.height -=
                l), b && (c = {
                x: h.yAxis.len - c.y - c.height,
                y: h.xAxis.len - c.x - c.width,
                width: c.height,
                height: c.width
            }), w || (b ? (c.x += m ? 0 : c.width, c.width = 0) : (c.y += m ? c.height : 0, c.height = 0)));
            e.align = d(e.align, !b || w ? "center" : m ? "right" : "left");
            e.verticalAlign = d(e.verticalAlign,
                b || w ? "middle" : m ? "top" : "bottom");
            n.prototype.alignDataLabel.call(this, a, f, e, c, g);
            a.isLabelJustified && a.contrastColor && a.dataLabel.css({
                color: a.contrastColor
            })
        })
    })(J);
    (function (a) {
        var z = a.Chart,
            F = a.each,
            D = a.pick,
            B = a.addEvent;
        z.prototype.callbacks.push(function (a) {
            function f() {
                var f = [];
                F(a.series || [], function (a) {
                    var h = a.options.dataLabels,
                        d = a.dataLabelCollections || ["dataLabel"];
                    (h.enabled || a._hasPointLabels) && !h.allowOverlap && a.visible && F(d, function (d) {
                        F(a.points, function (a) {
                            a[d] && (a[d].labelrank = D(a.labelrank,
                                a.shapeArgs && a.shapeArgs.height), f.push(a[d]))
                        })
                    })
                });
                a.hideOverlappingLabels(f)
            }
            f();
            B(a, "redraw", f)
        });
        z.prototype.hideOverlappingLabels = function (a) {
            var f = a.length,
                t, r, m, d, g, n, y, w, b, l = function (a, b, d, f, g, h, l, n) {
                    return !(g > a + d || g + l < a || h > b + f || h + n < b)
                };
            for (r = 0; r < f; r++) if (t = a[r]) t.oldOpacity = t.opacity, t.newOpacity = 1;
            a.sort(function (a, b) {
                return (b.labelrank || 0) - (a.labelrank || 0)
            });
            for (r = 0; r < f; r++) for (m = a[r], t = r + 1; t < f; ++t) if (d = a[t], m && d && m !== d && m.placed &&
                        d.placed && 0 !== m.newOpacity && 0 !== d.newOpacity && (g = m.alignAttr,
                        n = d.alignAttr, y = m.parentGroup, w = d.parentGroup, b = 2 * (m.box ? 0 : m.padding), g = l(g
                        .x + y.translateX, g.y + y.translateY, m.width - b, m.height - b, n.x + w.translateX, n.y + w.translateY,
                        d.width - b, d.height - b)))(m.labelrank < d.labelrank ? m : d).newOpacity = 0;
            F(a, function (a) {
                var b, d;
                a && (d = a.newOpacity, a.oldOpacity !== d && a.placed && (d ? a.show(!0) : b = function () {
                    a.hide()
                }, a.alignAttr.opacity = d, a[a.isOld ? "animate" : "attr"](a.alignAttr, null, b)), a.isOld = !0)
            })
        }
    })(J);
    (function (a) {
        var z = a.addEvent,
            F = a.Chart,
            D = a.createElement,
            B = a.css,
            f = a.defaultOptions,
            h = a.defaultPlotOptions,
            t = a.each,
            r = a.extend,
            m = a.fireEvent,
            d = a.hasTouch,
            g = a.inArray,
            n = a.isObject,
            y = a.Legend,
            w = a.merge,
            b = a.pick,
            l = a.Point,
            e = a.Series,
            c = a.seriesTypes,
            E = a.svg;
        a = a.TrackerMixin = {
            drawTrackerPoint: function () {
                var a = this,
                    b = a.chart.pointer,
                    c = function (a) {
                        var c = b.getPointFromEvent(a);
                        if (void 0 !== c) c.onMouseOver(a)
                    };
                t(a.points, function (a) {
                    a.graphic && (a.graphic.element.point = a);
                    a.dataLabel && (a.dataLabel.div ? a.dataLabel.div.point = a : a.dataLabel.element.point = a)
                });
                a._hasTracking || (t(a.trackerGroups, function (e) {
                    if (a[e]) {
                        a[e].addClass("highcharts-tracker").on("mouseover", c).on("mouseout", function (a) {
                            b.onTrackerMouseOut(a)
                        });
                        if (d) a[e].on("touchstart", c);
                        a.options.cursor && a[e].css(B).css({
                            cursor: a.options.cursor
                        })
                    }
                }), a._hasTracking = !0)
            },
            drawTrackerGraph: function () {
                var a = this,
                    b = a.options,
                    c = b.trackByArea,
                    e = [].concat(c ? a.areaPath : a.graphPath),
                    f = e.length,
                    g = a.chart,
                    h = g.pointer,
                    l = g.renderer,
                    n = g.options.tooltip.snap,
                    m = a.tracker,
                    p, r = function () {
                        if (g.hoverSeries !== a) a.onMouseOver()
                    }, w = "rgba(192,192,192," +
                        (E ? .0001 : .002) + ")";
                if (f && !c) for (p = f + 1; p--;) "M" === e[p] && e.splice(p + 1, 0, e[p + 1] - n, e[p + 2], "L"), (p &&
                            "M" === e[p] || p === f) && e.splice(p, 0, "L", e[p - 2] + n, e[p - 1]);
                m ? m.attr({
                    d: e
                }) : a.graph && (a.tracker = l.path(e).attr({
                    "stroke-linejoin": "round",
                    visibility: a.visible ? "visible" : "hidden",
                    stroke: w,
                    fill: c ? w : "none",
                    "stroke-width": a.graph.strokeWidth() + (c ? 0 : 2 * n),
                    zIndex: 2
                }).add(a.group), t([a.tracker, a.markerGroup], function (a) {
                    a.addClass("highcharts-tracker").on("mouseover", r).on("mouseout", function (a) {
                        h.onTrackerMouseOut(a)
                    });
                    b.cursor && a.css({
                        cursor: b.cursor
                    });
                    if (d) a.on("touchstart", r)
                }))
            }
        };
        c.column && (c.column.prototype.drawTracker = a.drawTrackerPoint);
        c.pie && (c.pie.prototype.drawTracker = a.drawTrackerPoint);
        c.scatter && (c.scatter.prototype.drawTracker = a.drawTrackerPoint);
        r(y.prototype, {
            setItemEvents: function (a, b, c) {
                var d = this,
                    e = d.chart.renderer.boxWrapper,
                    f = "highcharts-legend-" + (a.series ? "point" : "series") + "-active";
                (c ? b : a.legendGroup).on("mouseover", function () {
                    a.setState("hover");
                    e.addClass(f);
                    b.css(d.options.itemHoverStyle)
                }).on("mouseout", function () {
                    b.css(a.visible ? d.itemStyle : d.itemHiddenStyle);
                    e.removeClass(f);
                    a.setState()
                }).on("click", function (b) {
                    var c = function () {
                        a.setVisible && a.setVisible()
                    };
                    b = {
                        browserEvent: b
                    };
                    a.firePointEvent ? a.firePointEvent("legendItemClick", b, c) : m(a, "legendItemClick", b, c)
                })
            },
            createCheckboxForItem: function (a) {
                a.checkbox = D("input", {
                    type: "checkbox",
                    checked: a.selected,
                    defaultChecked: a.selected
                }, this.options.itemCheckboxStyle, this.chart.container);
                z(a.checkbox, "click", function (b) {
                    m(a.series || a, "checkboxClick", {
                        checked: b.target.checked,
                        item: a
                    }, function () {
                        a.select()
                    })
                })
            }
        });
        f.legend.itemStyle.cursor = "pointer";
        r(F.prototype, {
            showResetZoom: function () {
                var a = this,
                    b = f.lang,
                    c = a.options.chart.resetZoomButton,
                    d = c.theme,
                    e = d.states,
                    g = "chart" === c.relativeTo ? null : "plotBox";
                this.resetZoomButton = a.renderer.button(b.resetZoom, null, null, function () {
                    a.zoomOut()
                }, d, e && e.hover).attr({
                    align: c.position.align,
                    title: b.resetZoomTitle
                }).addClass("highcharts-reset-zoom").add().align(c.position, !1, g)
            },
            zoomOut: function () {
                var a = this;
                m(a, "selection", {
                    resetSelection: !0
                }, function () {
                    a.zoom()
                })
            },
            zoom: function (a) {
                var c, d = this.pointer,
                    e = !1,
                    f;
                !a || a.resetSelection ? t(this.axes, function (a) {
                    c = a.zoom()
                }) : t(a.xAxis.concat(a.yAxis), function (a) {
                    var b = a.axis;
                    d[b.isXAxis ? "zoomX" : "zoomY"] && (c = b.zoom(a.min, a.max), b.displayBtn && (e = !0))
                });
                f = this.resetZoomButton;
                e && !f ? this.showResetZoom() : !e && n(f) && (this.resetZoomButton = f.destroy());
                c && this.redraw(b(this.options.chart.animation, a && a.animation, 100 > this.pointCount))
            },
            pan: function (a, b) {
                var c = this,
                    d = c.hoverPoints,
                    e;
                d && t(d, function (a) {
                    a.setState()
                });
                t("xy" === b ? [1, 0] : [1], function (b) {
                    b = c[b ? "xAxis" : "yAxis"][0];
                    var d = b.horiz,
                        f = a[d ? "chartX" : "chartY"],
                        d = d ? "mouseDownX" : "mouseDownY",
                        g = c[d],
                        h = (b.pointRange || 0) / 2,
                        l = b.getExtremes(),
                        k = b.toValue(g - f, !0) + h,
                        h = b.toValue(g + b.len - f, !0) - h,
                        n = h < k,
                        g = n ? h : k,
                        k = n ? k : h,
                        n = b.toValue(b.toPixels(l.min) - b.minPixelPadding),
                        h = b.toValue(b.toPixels(l.max) + b.minPixelPadding),
                        n = Math.min(l.dataMin, n) - g,
                        l = k - Math.max(l.dataMax, h);
                    b.series.length && 0 > n && 0 > l && (b.setExtremes(g, k, !1, !1, {
                        trigger: "pan"
                    }), e = !0);
                    c[d] = f
                });
                e && c.redraw(!1);
                B(c.container, {
                    cursor: "move"
                })
            }
        });
        r(l.prototype, {
            select: function (a, c) {
                var d = this,
                    e = d.series,
                    f = e.chart;
                a = b(a, !d.selected);
                d.firePointEvent(a ? "select" : "unselect", {
                    accumulate: c
                }, function () {
                    d.selected = d.options.selected = a;
                    e.options.data[g(d, e.data)] = d.options;
                    d.setState(a && "select");
                    c || t(f.getSelectedPoints(), function (a) {
                        a.selected && a !== d && (a.selected = a.options.selected = !1, e.options.data[g(a, e.data)] =
                            a.options, a.setState(""), a.firePointEvent("unselect"))
                    })
                })
            },
            onMouseOver: function (a) {
                var b = this.series.chart.pointer;
                this.firePointEvent("mouseOver");
                b.runPointActions(a, this)
            },
            onMouseOut: function () {
                var a = this.series.chart;
                this.firePointEvent("mouseOut");
                t(a.hoverPoints || [], function (a) {
                    a.setState()
                });
                a.hoverPoints = a.hoverPoint = null
            },
            importEvents: function () {
                if (!this.hasImportedEvents) {
                    var a = w(this.series.options.point, this.options).events,
                        b;
                    this.events = a;
                    for (b in a) z(this, b, a[b]);
                    this.hasImportedEvents = !0
                }
            },
            setState: function (a, c) {
                var d = Math.floor(this.plotX),
                    e = this.plotY,
                    f = this.series,
                    g = f.options.states[a] || {}, l =
                        h[f.type].marker && f.options.marker,
                    n = l && !1 === l.enabled,
                    m = l && l.states && l.states[a] || {}, q = !1 === m.enabled,
                    p = f.stateMarkerGraphic,
                    w = this.marker || {}, u = f.chart,
                    t = f.halo,
                    y, E = l && f.markerAttribs;
                a = a || "";
                if (!(a === this.state && !c || this.selected && "select" !== a || !1 === g.enabled || a && (q || n && !
                    1 === m.enabled) || a && w.states && w.states[a] && !1 === w.states[a].enabled)) {
                    E && (y = f.markerAttribs(this, a));
                    if (this.graphic) this.state && this.graphic.removeClass("highcharts-point-" + this.state), a &&
                            this.graphic.addClass("highcharts-point-" +
                            a), this.graphic.attr(f.pointAttribs(this, a)), y && this.graphic.animate(y, b(u.options.chart
                            .animation, m.animation, l.animation)), p && p.hide();
                    else {
                        if (a && m) {
                            l = w.symbol || f.symbol;
                            p && p.currentSymbol !== l && (p = p.destroy());
                            if (p) p[c ? "animate" : "attr"]({
                                    x: y.x,
                                    y: y.y
                                });
                            else l && (f.stateMarkerGraphic = p = u.renderer.symbol(l, y.x, y.y, y.width, y.height).add(
                                    f.markerGroup), p.currentSymbol = l);
                            p && p.attr(f.pointAttribs(this, a))
                        }
                        p && (p[a && u.isInsidePlot(d, e, u.inverted) ? "show" : "hide"](), p.element.point = this)
                    }(d = g.halo) && d.size ?
                        (t || (f.halo = t = u.renderer.path().add(E ? f.markerGroup : f.group)), t[c ? "animate" :
                        "attr"]({
                        d: this.haloPath(d.size)
                    }), t.attr({
                        "class": "highcharts-halo highcharts-color-" + b(this.colorIndex, f.colorIndex)
                    }), t.point = this, t.attr(r({
                        fill: this.color || f.color,
                        "fill-opacity": d.opacity,
                        zIndex: -1
                    }, d.attributes))) : t && t.point && t.point.haloPath && t.animate({
                        d: t.point.haloPath(0)
                    });
                    this.state = a
                }
            },
            haloPath: function (a) {
                return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - a, this.plotY - a, 2 * a, 2 *
                    a)
            }
        });
        r(e.prototype, {
            onMouseOver: function () {
                var a = this.chart,
                    b = a.hoverSeries;
                if (b && b !== this) b.onMouseOut();
                this.options.events.mouseOver && m(this, "mouseOver");
                this.setState("hover");
                a.hoverSeries = this
            },
            onMouseOut: function () {
                var a = this.options,
                    b = this.chart,
                    c = b.tooltip,
                    d = b.hoverPoint;
                b.hoverSeries = null;
                if (d) d.onMouseOut();
                this && a.events.mouseOut && m(this, "mouseOut");
                !c || this.stickyTracking || c.shared && !this.noSharedTooltip || c.hide();
                this.setState()
            },
            setState: function (a) {
                var c = this,
                    d = c.options,
                    e = c.graph,
                    f = d.states,
                    g = d.lineWidth,
                    d = 0;
                a = a || "";
                if (c.state !== a && (t([c.group, c.markerGroup, c.dataLabelsGroup], function (b) {
                    b && (c.state && b.removeClass("highcharts-series-" + c.state), a && b.addClass(
                        "highcharts-series-" + a))
                }), c.state = a, !f[a] || !1 !== f[a].enabled) && (a && (g = f[a].lineWidth || g + (f[a].lineWidthPlus ||
                    0)), e && !e.dashstyle)) for (g = {
                        "stroke-width": g
                    }, e.animate(g, b(c.chart.options.chart.animation, f[a] && f[a].animation)); c["zone-graph-" + d];)
                        c["zone-graph-" + d].attr(g), d += 1
            },
            setVisible: function (a, b) {
                var c = this,
                    d = c.chart,
                    e = c.legendItem,
                    f, g = d.options.chart.ignoreHiddenSeries,
                    l = c.visible;
                f = (c.visible = a = c.options.visible = c.userOptions.visible = void 0 === a ? !l : a) ? "show" :
                    "hide";
                t(["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"], function (a) {
                    if (c[a]) c[a][f]()
                });
                if (d.hoverSeries === c || (d.hoverPoint && d.hoverPoint.series) === c) c.onMouseOut();
                e && d.legend.colorizeItem(c, a);
                c.isDirty = !0;
                c.options.stacking && t(d.series, function (a) {
                    a.options.stacking && a.visible && (a.isDirty = !0)
                });
                t(c.linkedSeries, function (b) {
                    b.setVisible(a, !1)
                });
                g && (d.isDirtyBox = !0);
                !1 !== b && d.redraw();
                m(c, f)
            },
            show: function () {
                this.setVisible(!0)
            },
            hide: function () {
                this.setVisible(!1)
            },
            select: function (a) {
                this.selected = a = void 0 === a ? !this.selected : a;
                this.checkbox && (this.checkbox.checked = a);
                m(this, a ? "select" : "unselect")
            },
            drawTracker: a.drawTrackerGraph
        })
    })(J);
    (function (a) {
        var z = a.Chart,
            F = a.each,
            D = a.inArray,
            B = a.isArray,
            f = a.isObject,
            h = a.pick,
            t = a.splat;
        z.prototype.setResponsive = function (f) {
            var h = this.options.responsive,
                d = [],
                g = this.currentResponsive;
            h && h.rules && F(h.rules, function (g) {
                void 0 === g._id && (g._id = a.uniqueKey());
                this.matchResponsiveRule(g, d,
                    f)
            }, this);
            var n = a.merge.apply(0, a.map(d, function (d) {
                return a.find(h.rules, function (a) {
                    return a._id === d
                }).chartOptions
            })),
                d = d.toString() || void 0;
            d !== (g && g.ruleIds) && (g && this.update(g.undoOptions, f), d ? (this.currentResponsive = {
                ruleIds: d,
                mergedOptions: n,
                undoOptions: this.currentOptions(n)
            }, this.update(n, f)) : this.currentResponsive = void 0)
        };
        z.prototype.matchResponsiveRule = function (a, f) {
            var d = a.condition;
            (d.callback || function () {
                return this.chartWidth <= h(d.maxWidth, Number.MAX_VALUE) && this.chartHeight <= h(d.maxHeight,
                    Number.MAX_VALUE) && this.chartWidth >= h(d.minWidth, 0) && this.chartHeight >= h(d.minHeight, 0)
            }).call(this) && f.push(a._id)
        };
        z.prototype.currentOptions = function (a) {
            function h(a, d, m, r) {
                var b, g;
                for (b in a) if (!r && -1 < D(b, ["series", "xAxis", "yAxis"])) for (a[b] = t(a[b]), m[b] = [], g = 0; g <
                            a[b].length; g++) d[b][g] && (m[b][g] = {}, h(a[b][g], d[b][g], m[b][g], r + 1));
                    else f(a[b]) ? (m[b] = B(a[b]) ? [] : {}, h(a[b], d[b] || {}, m[b], r + 1)) : m[b] = d[b] || null
            }
            var d = {};
            h(a, this.options, d, 0);
            return d
        }
    })(J);
    (function (a) {
        var z = a.Axis,
            F = a.each,
            D = a.pick;
        a = a.wrap;
        a(z.prototype, "getSeriesExtremes", function (a) {
            var f = this.isXAxis,
                h, t, r = [],
                m;
            f && F(this.series, function (a, f) {
                a.useMapGeometry && (r[f] = a.xData, a.xData = [])
            });
            a.call(this);
            f && (h = D(this.dataMin, Number.MAX_VALUE), t = D(this.dataMax, -Number.MAX_VALUE), F(this.series, function (
                a, f) {
                a.useMapGeometry && (h = Math.min(h, D(a.minX, h)), t = Math.max(t, D(a.maxX, h)), a.xData = r[f], m = !
                    0)
            }), m && (this.dataMin = h, this.dataMax = t))
        });
        a(z.prototype, "setAxisTranslation", function (a) {
            var f = this.chart,
                h = f.plotWidth / f.plotHeight,
                f =
                    f.xAxis[0],
                t;
            a.call(this);
            "yAxis" === this.coll && void 0 !== f.transA && F(this.series, function (a) {
                a.preserveAspectRatio && (t = !0)
            });
            if (t && (this.transA = f.transA = Math.min(this.transA, f.transA), a = h / ((f.max - f.min) / (this.max -
                this.min)), a = 1 > a ? this : f, h = (a.max - a.min) * a.transA, a.pixelPadding = a.len - h, a.minPixelPadding =
                a.pixelPadding / 2, h = a.fixTo)) {
                h = h[1] - a.toValue(h[0], !0);
                h *= a.transA;
                if (Math.abs(h) > a.minPixelPadding || a.min === a.dataMin && a.max === a.dataMax) h = 0;
                a.minPixelPadding -= h
            }
        });
        a(z.prototype, "render", function (a) {
            a.call(this);
            this.fixTo = null
        })
    })(J);
    (function (a) {
        var z = a.Axis,
            F = a.Chart,
            D = a.color,
            B, f = a.each,
            h = a.extend,
            t = a.isNumber,
            r = a.Legend,
            m = a.LegendSymbolMixin,
            d = a.noop,
            g = a.merge,
            n = a.pick,
            y = a.wrap;
        B = a.ColorAxis = function () {
            this.init.apply(this, arguments)
        };
        h(B.prototype, z.prototype);
        h(B.prototype, {
            defaultColorAxisOptions: {
                lineWidth: 0,
                minPadding: 0,
                maxPadding: 0,
                gridLineWidth: 1,
                tickPixelInterval: 72,
                startOnTick: !0,
                endOnTick: !0,
                offset: 0,
                marker: {
                    animation: {
                        duration: 50
                    },
                    width: .01,
                    color: "#999999"
                },
                labels: {
                    overflow: "justify",
                    rotation: 0
                },
                minColor: "#e6ebf5",
                maxColor: "#003399",
                tickLength: 5,
                showInLegend: !0
            },
            keepProps: ["legendGroup", "legendItemHeight", "legendItemWidth", "legendItem", "legendSymbol"].concat(z.prototype
                .keepProps),
            init: function (a, b) {
                var d = "vertical" !== a.options.legend.layout,
                    e;
                this.coll = "colorAxis";
                e = g(this.defaultColorAxisOptions, {
                    side: d ? 2 : 1,
                    reversed: !d
                }, b, {
                    opposite: !d,
                    showEmpty: !1,
                    title: null
                });
                z.prototype.init.call(this, a, e);
                b.dataClasses && this.initDataClasses(b);
                this.initStops(b);
                this.horiz = d;
                this.zoomEnabled = !1;
                this.defaultLegendLength =
                    200
            },
            tweenColors: function (a, b, d) {
                var e;
                b.rgba.length && a.rgba.length ? (a = a.rgba, b = b.rgba, e = 1 !== b[3] || 1 !== a[3], a = (e ?
                    "rgba(" : "rgb(") + Math.round(b[0] + (a[0] - b[0]) * (1 - d)) + "," + Math.round(b[1] + (a[1] - b[
                    1]) * (1 - d)) + "," + Math.round(b[2] + (a[2] - b[2]) * (1 - d)) + (e ? "," + (b[3] + (a[3] - b[3]) *
                    (1 - d)) : "") + ")") : a = b.input || "none";
                return a
            },
            initDataClasses: function (a) {
                var b = this,
                    d = this.chart,
                    e, c = 0,
                    h = d.options.chart.colorCount,
                    n = this.options,
                    m = a.dataClasses.length;
                this.dataClasses = e = [];
                this.legendItems = [];
                f(a.dataClasses, function (a,
                    f) {
                    a = g(a);
                    e.push(a);
                    a.color || ("category" === n.dataClassColor ? (f = d.options.colors, h = f.length, a.color = f[c],
                        a.colorIndex = c, c++, c === h && (c = 0)) : a.color = b.tweenColors(D(n.minColor), D(n.maxColor),
                        2 > m ? .5 : f / (m - 1)))
                })
            },
            initStops: function (a) {
                this.stops = a.stops || [[0, this.options.minColor], [1, this.options.maxColor]];
                f(this.stops, function (a) {
                    a.color = D(a[1])
                })
            },
            setOptions: function (a) {
                z.prototype.setOptions.call(this, a);
                this.options.crosshair = this.options.marker
            },
            setAxisSize: function () {
                var a = this.legendSymbol,
                    b = this.chart,
                    d = b.options.legend || {}, e, c;
                a ? (this.left = d = a.attr("x"), this.top = e = a.attr("y"), this.width = c = a.attr("width"), this.height =
                    a = a.attr("height"), this.right = b.chartWidth - d - c, this.bottom = b.chartHeight - e - a, this.len =
                    this.horiz ? c : a, this.pos = this.horiz ? d : e) : this.len = (this.horiz ? d.symbolWidth : d.symbolHeight) ||
                    this.defaultLegendLength
            },
            toColor: function (a, b) {
                var d = this.stops,
                    e, c, f = this.dataClasses,
                    g, h;
                if (f) for (h = f.length; h--;) {
                        if (g = f[h], e = g.from, d = g.to, (void 0 === e || a >= e) && (void 0 === d || a <= d)) {
                            c = g.color;
                            b && (b.dataClass =
                                h, b.colorIndex = g.colorIndex);
                            break
                        }
                } else {
                    this.isLog && (a = this.val2lin(a));
                    a = 1 - (this.max - a) / (this.max - this.min || 1);
                    for (h = d.length; h-- && !(a > d[h][0]););
                    e = d[h] || d[h + 1];
                    d = d[h + 1] || e;
                    a = 1 - (d[0] - a) / (d[0] - e[0] || 1);
                    c = this.tweenColors(e.color, d.color, a)
                }
                return c
            },
            getOffset: function () {
                var a = this.legendGroup,
                    b = this.chart.axisOffset[this.side];
                a && (this.axisParent = a, z.prototype.getOffset.call(this), this.added || (this.added = !0, this.labelLeft =
                    0, this.labelRight = this.width), this.chart.axisOffset[this.side] = b)
            },
            setLegendColor: function () {
                var a,
                    b = this.options,
                    d = this.reversed;
                a = d ? 1 : 0;
                d = d ? 0 : 1;
                a = this.horiz ? [a, 0, d, 0] : [0, d, 0, a];
                this.legendColor = {
                    linearGradient: {
                        x1: a[0],
                        y1: a[1],
                        x2: a[2],
                        y2: a[3]
                    },
                    stops: b.stops || [[0, b.minColor], [1, b.maxColor]]
                }
            },
            drawLegendSymbol: function (a, b) {
                var d = a.padding,
                    e = a.options,
                    c = this.horiz,
                    f = n(e.symbolWidth, c ? this.defaultLegendLength : 12),
                    g = n(e.symbolHeight, c ? 12 : this.defaultLegendLength),
                    h = n(e.labelPadding, c ? 16 : 30),
                    e = n(e.itemDistance, 10);
                this.setLegendColor();
                b.legendSymbol = this.chart.renderer.rect(0, a.baseline - 11, f, g).attr({
                    zIndex: 1
                }).add(b.legendGroup);
                this.legendItemWidth = f + d + (c ? e : h);
                this.legendItemHeight = g + d + (c ? h : 0)
            },
            setState: d,
            visible: !0,
            setVisible: d,
            getSeriesExtremes: function () {
                var a = this.series,
                    b = a.length;
                this.dataMin = Infinity;
                for (this.dataMax = -Infinity; b--;) void 0 !== a[b].valueMin && (this.dataMin = Math.min(this.dataMin,
                        a[b].valueMin), this.dataMax = Math.max(this.dataMax, a[b].valueMax))
            },
            drawCrosshair: function (a, b) {
                var d = b && b.plotX,
                    e = b && b.plotY,
                    c, f = this.pos,
                    g = this.len;
                b && (c = this.toPixels(b[b.series.colorKey]), c < f ? c = f - 2 : c > f + g && (c = f + g + 2), b.plotX =
                    c, b.plotY = this.len - c, z.prototype.drawCrosshair.call(this, a, b), b.plotX = d, b.plotY = e,
                    this.cross && (this.cross.addClass("highcharts-coloraxis-marker").add(this.legendGroup), this.cross
                    .attr({
                    fill: this.crosshair.color
                })))
            },
            getPlotLinePath: function (a, b, d, e, c) {
                return t(c) ? this.horiz ? ["M", c - 4, this.top - 6, "L", c + 4, this.top - 6, c, this.top, "Z"] : [
                        "M", this.left, c, "L", this.left - 6, c + 6, this.left - 6, c - 6, "Z"] : z.prototype.getPlotLinePath
                    .call(this, a, b, d, e)
            },
            update: function (a, b) {
                var d = this.chart,
                    e = d.legend;
                f(this.series, function (a) {
                    a.isDirtyData = !0
                });
                a.dataClasses && e.allItems && (f(e.allItems, function (a) {
                    a.isDataClass && a.legendGroup.destroy()
                }), d.isDirtyLegend = !0);
                d.options[this.coll] = g(this.userOptions, a);
                z.prototype.update.call(this, a, b);
                this.legendItem && (this.setLegendColor(), e.colorizeItem(this, !0))
            },
            getDataClassLegendSymbols: function () {
                var g = this,
                    b = this.chart,
                    l = this.legendItems,
                    e = b.options.legend,
                    c = e.valueDecimals,
                    n = e.valueSuffix || "",
                    r;
                l.length || f(this.dataClasses, function (e, t) {
                    var q = !0,
                        u = e.from,
                        k = e.to;
                    r = "";
                    void 0 === u ? r = "\x3c " : void 0 ===
                        k && (r = "\x3e ");
                    void 0 !== u && (r += a.numberFormat(u, c) + n);
                    void 0 !== u && void 0 !== k && (r += " - ");
                    void 0 !== k && (r += a.numberFormat(k, c) + n);
                    l.push(h({
                        chart: b,
                        name: r,
                        options: {},
                        drawLegendSymbol: m.drawRectangle,
                        visible: !0,
                        setState: d,
                        isDataClass: !0,
                        setVisible: function () {
                            q = this.visible = !q;
                            f(g.series, function (a) {
                                f(a.points, function (a) {
                                    a.dataClass === t && a.setVisible(q)
                                })
                            });
                            b.legend.colorizeItem(this, q)
                        }
                    }, e))
                });
                return l
            },
            name: ""
        });
        f(["fill", "stroke"], function (d) {
            a.Fx.prototype[d + "Setter"] = function () {
                this.elem.attr(d,
                    B.prototype.tweenColors(D(this.start), D(this.end), this.pos), null, !0)
            }
        });
        y(F.prototype, "getAxes", function (a) {
            var b = this.options.colorAxis;
            a.call(this);
            this.colorAxis = [];
            b && new B(this, b)
        });
        y(r.prototype, "getAllItems", function (a) {
            var b = [],
                d = this.chart.colorAxis[0];
            d && d.options && (d.options.showInLegend && (d.options.dataClasses ? b = b.concat(d.getDataClassLegendSymbols()) :
                b.push(d)), f(d.series, function (a) {
                a.options.showInLegend = !1
            }));
            return b.concat(a.call(this))
        });
        y(r.prototype, "colorizeItem", function (a,
            b, d) {
            a.call(this, b, d);
            d && b.legendColor && b.legendSymbol.attr({
                fill: b.legendColor
            })
        })
    })(J);
    (function (a) {
        var z = a.defined,
            F = a.each,
            D = a.noop,
            B = a.seriesTypes;
        a.colorPointMixin = {
            isValid: function () {
                return null !== this.value
            },
            setVisible: function (a) {
                var f = this,
                    t = a ? "show" : "hide";
                F(["graphic", "dataLabel"], function (a) {
                    if (f[a]) f[a][t]()
                })
            },
            setState: function (f) {
                a.Point.prototype.setState.call(this, f);
                this.graphic && this.graphic.attr({
                    zIndex: "hover" === f ? 1 : 0
                })
            }
        };
        a.colorSeriesMixin = {
            pointArrayMap: ["value"],
            axisTypes: ["xAxis",
                "yAxis", "colorAxis"],
            optionalAxis: "colorAxis",
            trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
            getSymbol: D,
            parallelArrays: ["x", "y", "value"],
            colorKey: "value",
            pointAttribs: B.column.prototype.pointAttribs,
            translateColors: function () {
                var a = this,
                    h = this.options.nullColor,
                    t = this.colorAxis,
                    r = this.colorKey;
                F(this.data, function (f) {
                    var d = f[r];
                    if (d = f.options.color || (f.isNull ? h : t && void 0 !== d ? t.toColor(d, f) : f.color || a.color))
                        f.color = d
                })
            },
            colorAttribs: function (a) {
                var f = {};
                z(a.color) && (f[this.colorProp || "fill"] =
                    a.color);
                return f
            }
        }
    })(J);
    (function (a) {
        function z(a) {
            a && (a.preventDefault && a.preventDefault(), a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
        }
        function F(a) {
            this.init(a)
        }
        var D = a.addEvent,
            B = a.Chart,
            f = a.doc,
            h = a.each,
            t = a.extend,
            r = a.merge,
            m = a.pick;
        a = a.wrap;
        F.prototype.init = function (a) {
            this.chart = a;
            a.mapNavButtons = []
        };
        F.prototype.update = function (a) {
            var d = this.chart,
                f = d.options.mapNavigation,
                h, w, b, l, e, c = function (a) {
                    this.handler.call(d, a);
                    z(a)
                }, E = d.mapNavButtons;
            a && (f = d.options.mapNavigation = r(d.options.mapNavigation,
                a));
            for (; E.length;) E.pop().destroy();
            if (m(f.enableButtons, f.enabled) && !d.renderer.forExport) for (h in a = f.buttons, a) a.hasOwnProperty(h) &&
                        (b = r(f.buttonOptions, a[h]), w = b.theme, w.style = r(b.theme.style, b.style), e = (l = w.states) &&
                        l.hover, l = l && l.select, w = d.renderer.button(b.text, 0, 0, c, w, e, l, 0, "zoomIn" === h ?
                        "topbutton" : "bottombutton").addClass("highcharts-map-navigation").attr({
                        width: b.width,
                        height: b.height,
                        title: d.options.lang[h],
                        padding: b.padding,
                        zIndex: 5
                    }).add(), w.handler = b.onclick, w.align(t(b, {
                        width: w.width,
                        height: 2 * w.height
                    }), null, b.alignTo), D(w.element, "dblclick", z), E.push(w));
            this.updateEvents(f)
        };
        F.prototype.updateEvents = function (a) {
            var d = this.chart;
            m(a.enableDoubleClickZoom, a.enabled) || a.enableDoubleClickZoomTo ? this.unbindDblClick = this.unbindDblClick ||
                D(d.container, "dblclick", function (a) {
                d.pointer.onContainerDblClick(a)
            }) : this.unbindDblClick && (this.unbindDblClick = this.unbindDblClick());
            m(a.enableMouseWheelZoom, a.enabled) ? this.unbindMouseWheel = this.unbindMouseWheel || D(d.container, void 0 ===
                f.onmousewheel ?
                "DOMMouseScroll" : "mousewheel", function (a) {
                d.pointer.onContainerMouseWheel(a);
                z(a);
                return !1
            }) : this.unbindMouseWheel && (this.unbindMouseWheel = this.unbindMouseWheel())
        };
        t(B.prototype, {
            fitToBox: function (a, f) {
                h([["x", "width"], ["y", "height"]], function (d) {
                    var g = d[0];
                    d = d[1];
                    a[g] + a[d] > f[g] + f[d] && (a[d] > f[d] ? (a[d] = f[d], a[g] = f[g]) : a[g] = f[g] + f[d] - a[d]);
                    a[d] > f[d] && (a[d] = f[d]);
                    a[g] < f[g] && (a[g] = f[g])
                });
                return a
            },
            mapZoom: function (a, f, h, r, t) {
                var b = this.xAxis[0],
                    d = b.max - b.min,
                    e = m(f, b.min + d / 2),
                    c = d * a,
                    d = this.yAxis[0],
                    g =
                        d.max - d.min,
                    n = m(h, d.min + g / 2),
                    g = g * a,
                    e = this.fitToBox({
                        x: e - c * (r ? (r - b.pos) / b.len : .5),
                        y: n - g * (t ? (t - d.pos) / d.len : .5),
                        width: c,
                        height: g
                    }, {
                        x: b.dataMin,
                        y: d.dataMin,
                        width: b.dataMax - b.dataMin,
                        height: d.dataMax - d.dataMin
                    }),
                    c = e.x <= b.dataMin && e.width >= b.dataMax - b.dataMin && e.y <= d.dataMin && e.height >= d.dataMax -
                        d.dataMin;
                r && (b.fixTo = [r - b.pos, f]);
                t && (d.fixTo = [t - d.pos, h]);
                void 0 === a || c ? (b.setExtremes(void 0, void 0, !1), d.setExtremes(void 0, void 0, !1)) : (b.setExtremes(
                    e.x, e.x + e.width, !1), d.setExtremes(e.y, e.y + e.height, !1));
                this.redraw()
            }
        });
        a(B.prototype, "render", function (a) {
            this.mapNavigation = new F(this);
            this.mapNavigation.update();
            a.call(this)
        })
    })(J);
    (function (a) {
        var z = a.extend,
            F = a.pick,
            D = a.Pointer;
        a = a.wrap;
        z(D.prototype, {
            onContainerDblClick: function (a) {
                var f = this.chart;
                a = this.normalize(a);
                f.options.mapNavigation.enableDoubleClickZoomTo ? f.pointer.inClass(a.target, "highcharts-tracker") &&
                    f.hoverPoint && f.hoverPoint.zoomTo() : f.isInsidePlot(a.chartX - f.plotLeft, a.chartY - f.plotTop) &&
                    f.mapZoom(.5, f.xAxis[0].toValue(a.chartX),
                    f.yAxis[0].toValue(a.chartY), a.chartX, a.chartY)
            },
            onContainerMouseWheel: function (a) {
                var f = this.chart,
                    h;
                a = this.normalize(a);
                h = a.detail || -(a.wheelDelta / 120);
                f.isInsidePlot(a.chartX - f.plotLeft, a.chartY - f.plotTop) && f.mapZoom(Math.pow(f.options.mapNavigation
                    .mouseWheelSensitivity, h), f.xAxis[0].toValue(a.chartX), f.yAxis[0].toValue(a.chartY), a.chartX, a
                    .chartY)
            }
        });
        a(D.prototype, "zoomOption", function (a) {
            var f = this.chart.options.mapNavigation;
            F(f.enableTouchZoom, f.enabled) && (this.chart.options.chart.pinchType =
                "xy");
            a.apply(this, [].slice.call(arguments, 1))
        });
        a(D.prototype, "pinchTranslate", function (a, f, h, t, r, m, d) {
            a.call(this, f, h, t, r, m, d);
            "map" === this.chart.options.chart.type && this.hasZoom && (a = t.scaleX > t.scaleY, this.pinchTranslateDirection(!
                a, f, h, t, r, m, d, a ? t.scaleX : t.scaleY))
        })
    })(J);
    (function (a) {
        var z = a.color,
            F = a.ColorAxis,
            D = a.colorPointMixin,
            B = a.each,
            f = a.extend,
            h = a.isNumber,
            t = a.map,
            r = a.merge,
            m = a.noop,
            d = a.pick,
            g = a.isArray,
            n = a.Point,
            y = a.Series,
            w = a.seriesType,
            b = a.seriesTypes,
            l = a.splat,
            e = void 0 !== a.doc.documentElement.style.vectorEffect;
        w("map", "scatter", {
            allAreas: !0,
            animation: !1,
            nullColor: "#f7f7f7",
            borderColor: "#cccccc",
            borderWidth: 1,
            marker: null,
            stickyTracking: !1,
            joinBy: "hc-key",
            dataLabels: {
                formatter: function () {
                    return this.point.value
                },
                inside: !0,
                verticalAlign: "middle",
                crop: !1,
                overflow: !1,
                padding: 0
            },
            turboThreshold: 0,
            tooltip: {
                followPointer: !0,
                pointFormat: "{point.name}: {point.value}\x3cbr/\x3e"
            },
            states: {
                normal: {
                    animation: !0
                },
                hover: {
                    brightness: .2,
                    halo: null
                },
                select: {
                    color: "#cccccc"
                }
            }
        }, r(a.colorSeriesMixin, {
            type: "map",
            supportsDrilldown: !0,
            getExtremesFromAll: !0,
            useMapGeometry: !0,
            forceDL: !0,
            searchPoint: m,
            directTouch: !0,
            preserveAspectRatio: !0,
            pointArrayMap: ["value"],
            getBox: function (b) {
                var c = Number.MAX_VALUE,
                    e = -c,
                    f = c,
                    g = -c,
                    l = c,
                    n = c,
                    k = this.xAxis,
                    m = this.yAxis,
                    r;
                B(b || [], function (b) {
                    if (b.path) {
                        "string" === typeof b.path && (b.path = a.splitPath(b.path));
                        var k = b.path || [],
                            m = k.length,
                            q = !1,
                            t = -c,
                            u = c,
                            w = -c,
                            x = c,
                            v = b.properties;
                        if (!b._foundBox) {
                            for (; m--;) h(k[m]) && (q ? (t = Math.max(t, k[m]), u = Math.min(u, k[m])) : (w = Math.max(
                                    w, k[m]), x = Math.min(x, k[m])), q = !q);
                            b._midX =
                                u + (t - u) * (b.middleX || v && v["hc-middle-x"] || .5);
                            b._midY = x + (w - x) * (b.middleY || v && v["hc-middle-y"] || .5);
                            b._maxX = t;
                            b._minX = u;
                            b._maxY = w;
                            b._minY = x;
                            b.labelrank = d(b.labelrank, (t - u) * (w - x));
                            b._foundBox = !0
                        }
                        e = Math.max(e, b._maxX);
                        f = Math.min(f, b._minX);
                        g = Math.max(g, b._maxY);
                        l = Math.min(l, b._minY);
                        n = Math.min(b._maxX - b._minX, b._maxY - b._minY, n);
                        r = !0
                    }
                });
                r && (this.minY = Math.min(l, d(this.minY, c)), this.maxY = Math.max(g, d(this.maxY, -c)), this.minX =
                    Math.min(f, d(this.minX, c)), this.maxX = Math.max(e, d(this.maxX, -c)), k && void 0 === k.options.minRange &&
                    (k.minRange = Math.min(5 * n, (this.maxX - this.minX) / 5, k.minRange || c)), m && void 0 === m.options
                    .minRange && (m.minRange = Math.min(5 * n, (this.maxY - this.minY) / 5, m.minRange || c)))
            },
            getExtremes: function () {
                y.prototype.getExtremes.call(this, this.valueData);
                this.chart.hasRendered && this.isDirtyData && this.getBox(this.options.data);
                this.valueMin = this.dataMin;
                this.valueMax = this.dataMax;
                this.dataMin = this.minY;
                this.dataMax = this.maxY
            },
            translatePath: function (a) {
                var b = !1,
                    c = this.xAxis,
                    d = this.yAxis,
                    e = c.min,
                    f = c.transA,
                    c = c.minPixelPadding,
                    g = d.min,
                    k = d.transA,
                    d = d.minPixelPadding,
                    l, m = [];
                if (a) for (l = a.length; l--;) h(a[l]) ? (m[l] = b ? (a[l] - e) * f + c : (a[l] - g) * k + d, b = !b) :
                            m[l] = a[l];
                return m
            },
            setData: function (b, d, e, f) {
                var c = this.options,
                    m = this.chart.options.chart,
                    n = m && m.map,
                    k = c.mapData,
                    q = c.joinBy,
                    u = null === q,
                    w = c.keys || this.pointArrayMap,
                    E = [],
                    p = {}, C, z = this.chart.mapTransforms;
                !k && n && (k = "string" === typeof n ? a.maps[n] : n);
                u && (q = "_i");
                q = this.joinBy = l(q);
                q[1] || (q[1] = q[0]);
                b && B(b, function (a, d) {
                    var e = 0;
                    if (h(a)) b[d] = {
                            value: a
                    };
                    else if (g(a)) {
                        b[d] = {};
                        !c.keys && a.length >
                            w.length && "string" === typeof a[0] && (b[d]["hc-key"] = a[0], ++e);
                        for (var f = 0; f < w.length; ++f, ++e) w[f] && (b[d][w[f]] = a[e])
                    }
                    u && (b[d]._i = d)
                });
                this.getBox(b);
                if (this.chart.mapTransforms = z = m && m.mapTransforms || k && k["hc-transform"] || z) for (C in z) z.hasOwnProperty(
                            C) && C.rotation && (C.cosAngle = Math.cos(C.rotation), C.sinAngle = Math.sin(C.rotation));
                if (k) {
                    "FeatureCollection" === k.type && (this.mapTitle = k.title, k = a.geojson(k, this.type, this));
                    this.mapData = k;
                    this.mapMap = {};
                    for (C = 0; C < k.length; C++) m = k[C], n = m.properties, m._i =
                            C, q[0] && n && n[q[0]] && (m[q[0]] = n[q[0]]), p[m[q[0]]] = m;
                    this.mapMap = p;
                    b && q[1] && B(b, function (a) {
                        p[a[q[1]]] && E.push(p[a[q[1]]])
                    });
                    c.allAreas ? (this.getBox(k), b = b || [], q[1] && B(b, function (a) {
                        E.push(a[q[1]])
                    }), E = "|" + t(E, function (a) {
                        return a && a[q[0]]
                    }).join("|") + "|", B(k, function (a) {
                        q[0] && -1 !== E.indexOf("|" + a[q[0]] + "|") || (b.push(r(a, {
                            value: null
                        })), f = !1)
                    })) : this.getBox(E)
                }
                y.prototype.setData.call(this, b, d, e, f)
            },
            drawGraph: m,
            drawDataLabels: m,
            doFullTranslate: function () {
                return this.isDirtyData || this.chart.isResizing ||
                    this.chart.renderer.isVML || !this.baseTrans
            },
            translate: function () {
                var a = this,
                    b = a.xAxis,
                    d = a.yAxis,
                    e = a.doFullTranslate();
                a.generatePoints();
                B(a.data, function (c) {
                    c.plotX = b.toPixels(c._midX, !0);
                    c.plotY = d.toPixels(c._midY, !0);
                    e && (c.shapeType = "path", c.shapeArgs = {
                        d: a.translatePath(c.path)
                    })
                });
                a.translateColors()
            },
            pointAttribs: function (a, d) {
                d = b.column.prototype.pointAttribs.call(this, a, d);
                a.isFading && delete d.fill;
                e ? d["vector-effect"] = "non-scaling-stroke" : d["stroke-width"] = "inherit";
                return d
            },
            drawPoints: function () {
                var a =
                    this,
                    d = a.xAxis,
                    f = a.yAxis,
                    g = a.group,
                    h = a.chart,
                    l = h.renderer,
                    m, k, n, r, t = this.baseTrans,
                    w, p, y, z, D;
                a.transformGroup || (a.transformGroup = l.g().attr({
                    scaleX: 1,
                    scaleY: 1
                }).add(g), a.transformGroup.survive = !0);
                a.doFullTranslate() ? (h.hasRendered && B(a.points, function (b) {
                    b.shapeArgs && (b.shapeArgs.fill = a.pointAttribs(b, b.state).fill)
                }), a.group = a.transformGroup, b.column.prototype.drawPoints.apply(a), a.group = g, B(a.points, function (
                    a) {
                    a.graphic && (a.name && a.graphic.addClass("highcharts-name-" + a.name.replace(/ /g, "-").toLowerCase()),
                        a.properties && a.properties["hc-key"] && a.graphic.addClass("highcharts-key-" + a.properties[
                        "hc-key"].toLowerCase()))
                }), this.baseTrans = {
                    originX: d.min - d.minPixelPadding / d.transA,
                    originY: f.min - f.minPixelPadding / f.transA + (f.reversed ? 0 : f.len / f.transA),
                    transAX: d.transA,
                    transAY: f.transA
                }, this.transformGroup.animate({
                    translateX: 0,
                    translateY: 0,
                    scaleX: 1,
                    scaleY: 1
                })) : (m = d.transA / t.transAX, k = f.transA / t.transAY, n = d.toPixels(t.originX, !0), r = f.toPixels(
                    t.originY, !0), .99 < m && 1.01 > m && .99 < k && 1.01 > k && (k = m = 1, n = Math.round(n),
                    r = Math.round(r)), w = this.transformGroup, h.renderer.globalAnimation ? (p = w.attr("translateX"),
                    y = w.attr("translateY"), z = w.attr("scaleX"), D = w.attr("scaleY"), w.attr({
                    animator: 0
                }).animate({
                    animator: 1
                }, {
                    step: function (a, b) {
                        w.attr({
                            translateX: p + (n - p) * b.pos,
                            translateY: y + (r - y) * b.pos,
                            scaleX: z + (m - z) * b.pos,
                            scaleY: D + (k - D) * b.pos
                        })
                    }
                })) : w.attr({
                    translateX: n,
                    translateY: r,
                    scaleX: m,
                    scaleY: k
                }));
                e || a.group.element.setAttribute("stroke-width", a.options[a.pointAttrToOptions && a.pointAttrToOptions[
                    "stroke-width"] || "borderWidth"] /
                    (m || 1));
                this.drawMapDataLabels()
            },
            drawMapDataLabels: function () {
                y.prototype.drawDataLabels.call(this);
                this.dataLabelsGroup && this.dataLabelsGroup.clip(this.chart.clipRect)
            },
            render: function () {
                var a = this,
                    b = y.prototype.render;
                a.chart.renderer.isVML && 3E3 < a.data.length ? setTimeout(function () {
                    b.call(a)
                }) : b.call(a)
            },
            animate: function (a) {
                var b = this.options.animation,
                    c = this.group,
                    d = this.xAxis,
                    e = this.yAxis,
                    f = d.pos,
                    g = e.pos;
                this.chart.renderer.isSVG && (!0 === b && (b = {
                    duration: 1E3
                }), a ? c.attr({
                    translateX: f + d.len / 2,
                    translateY: g + e.len / 2,
                    scaleX: .001,
                    scaleY: .001
                }) : (c.animate({
                    translateX: f,
                    translateY: g,
                    scaleX: 1,
                    scaleY: 1
                }, b), this.animate = null))
            },
            animateDrilldown: function (a) {
                var b = this.chart.plotBox,
                    c = this.chart.drilldownLevels[this.chart.drilldownLevels.length - 1],
                    d = c.bBox,
                    e = this.chart.options.drilldown.animation;
                a || (a = Math.min(d.width / b.width, d.height / b.height), c.shapeArgs = {
                    scaleX: a,
                    scaleY: a,
                    translateX: d.x,
                    translateY: d.y
                }, B(this.points, function (a) {
                    a.graphic && a.graphic.attr(c.shapeArgs).animate({
                        scaleX: 1,
                        scaleY: 1,
                        translateX: 0,
                        translateY: 0
                    }, e)
                }), this.animate = null)
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            animateDrillupFrom: function (a) {
                b.column.prototype.animateDrillupFrom.call(this, a)
            },
            animateDrillupTo: function (a) {
                b.column.prototype.animateDrillupTo.call(this, a)
            }
        }), f({
            applyOptions: function (a, b) {
                a = n.prototype.applyOptions.call(this, a, b);
                b = this.series;
                var c = b.joinBy;
                b.mapData && ((c = void 0 !== a[c[1]] && b.mapMap[a[c[1]]]) ? (b.xyFromShape && (a.x = c._midX, a.y = c
                    ._midY), f(a, c)) : a.value = a.value || null);
                return a
            },
            onMouseOver: function (a) {
                clearTimeout(this.colorInterval);
                if (null !== this.value) n.prototype.onMouseOver.call(this, a);
                else this.series.onMouseOut(a)
            },
            onMouseOut: function () {
                var a = this,
                    b = +new Date,
                    d = z(this.series.pointAttribs(a).fill),
                    e = z(this.series.pointAttribs(a, "hover").fill),
                    f = a.series.options.states.normal.animation,
                    g = f && (f.duration || 500);
                g && 4 === d.rgba.length && 4 === e.rgba.length && "select" !== a.state && (clearTimeout(a.colorInterval),
                    a.colorInterval = setInterval(function () {
                    var c = (new Date - b) / g,
                        f = a.graphic;
                    1 < c && (c = 1);
                    f && f.attr("fill", F.prototype.tweenColors.call(0,
                        e, d, c));
                    1 <= c && clearTimeout(a.colorInterval)
                }, 13), a.isFading = !0);
                n.prototype.onMouseOut.call(a);
                a.isFading = null
            },
            zoomTo: function () {
                var a = this.series;
                a.xAxis.setExtremes(this._minX, this._maxX, !1);
                a.yAxis.setExtremes(this._minY, this._maxY, !1);
                a.chart.redraw()
            }
        }, D))
    })(J);
    (function (a) {
        var z = a.seriesType,
            F = a.seriesTypes;
        z("mapline", "map", {
            lineWidth: 1,
            fillColor: "none"
        }, {
            type: "mapline",
            colorProp: "stroke",
            pointAttrToOptions: {
                stroke: "color",
                "stroke-width": "lineWidth"
            },
            pointAttribs: function (a, z) {
                a = F.map.prototype.pointAttribs.call(this,
                    a, z);
                a.fill = this.options.fillColor;
                return a
            },
            drawLegendSymbol: F.line.prototype.drawLegendSymbol
        })
    })(J);
    (function (a) {
        var z = a.merge,
            F = a.Point;
        a = a.seriesType;
        a("mappoint", "scatter", {
            dataLabels: {
                enabled: !0,
                formatter: function () {
                    return this.point.name
                },
                crop: !1,
                defer: !1,
                overflow: !1,
                style: {
                    color: "#000000"
                }
            }
        }, {
            type: "mappoint",
            forceDL: !0
        }, {
            applyOptions: function (a, B) {
                a = void 0 !== a.lat && void 0 !== a.lon ? z(a, this.series.chart.fromLatLonToPoint(a)) : a;
                return F.prototype.applyOptions.call(this, a, B)
            }
        })
    })(J);
    (function (a) {
        var z =
            a.arrayMax,
            F = a.arrayMin,
            D = a.Axis,
            B = a.color,
            f = a.each,
            h = a.isNumber,
            t = a.noop,
            r = a.pick,
            m = a.pInt,
            d = a.Point,
            g = a.Series,
            n = a.seriesType,
            y = a.seriesTypes;
        n("bubble", "scatter", {
            dataLabels: {
                formatter: function () {
                    return this.point.z
                },
                inside: !0,
                verticalAlign: "middle"
            },
            marker: {
                lineColor: null,
                lineWidth: 1,
                radius: null,
                states: {
                    hover: {
                        radiusPlus: 0
                    }
                },
                symbol: "circle"
            },
            minSize: 8,
            maxSize: "20%",
            softThreshold: !1,
            states: {
                hover: {
                    halo: {
                        size: 5
                    }
                }
            },
            tooltip: {
                pointFormat: "({point.x}, {point.y}), Size: {point.z}"
            },
            turboThreshold: 0,
            zThreshold: 0,
            zoneAxis: "z"
        }, {
            pointArrayMap: ["y", "z"],
            parallelArrays: ["x", "y", "z"],
            trackerGroups: ["markerGroup", "dataLabelsGroup"],
            bubblePadding: !0,
            zoneAxis: "z",
            directTouch: !0,
            pointAttribs: function (a, b) {
                var d = r(this.options.marker.fillOpacity, .5);
                a = g.prototype.pointAttribs.call(this, a, b);
                1 !== d && (a.fill = B(a.fill).setOpacity(d).get("rgba"));
                return a
            },
            getRadii: function (a, b, d, e) {
                var c, f, g, h = this.zData,
                    l = [],
                    m = this.options,
                    n = "width" !== m.sizeBy,
                    k = m.zThreshold,
                    r = b - a;
                f = 0;
                for (c = h.length; f < c; f++) g = h[f], m.sizeByAbsoluteValue &&
                        null !== g && (g = Math.abs(g - k), b = Math.max(b - k, Math.abs(a - k)), a = 0), null === g ?
                        g = null : g < a ? g = d / 2 - 1 : (g = 0 < r ? (g - a) / r : .5, n && 0 <= g && (g = Math.sqrt(
                        g)), g = Math.ceil(d + g * (e - d)) / 2), l.push(g);
                this.radii = l
            },
            animate: function (a) {
                var b = this.options.animation;
                a || (f(this.points, function (a) {
                    var d = a.graphic,
                        c;
                    d && d.width && (c = {
                        x: d.x,
                        y: d.y,
                        width: d.width,
                        height: d.height
                    }, d.attr({
                        x: a.plotX,
                        y: a.plotY,
                        width: 1,
                        height: 1
                    }), d.animate(c, b))
                }), this.animate = null)
            },
            translate: function () {
                var d, b = this.data,
                    f, e, c = this.radii;
                y.scatter.prototype.translate.call(this);
                for (d = b.length; d--;) f = b[d], e = c ? c[d] : 0, h(e) && e >= this.minPxSize / 2 ? (f.marker = a.extend(
                        f.marker, {
                        radius: e,
                        width: 2 * e,
                        height: 2 * e
                    }), f.dlBox = {
                        x: f.plotX - e,
                        y: f.plotY - e,
                        width: 2 * e,
                        height: 2 * e
                    }) : f.shapeArgs = f.plotY = f.dlBox = void 0
            },
            alignDataLabel: y.column.prototype.alignDataLabel,
            buildKDTree: t,
            applyZones: t
        }, {
            haloPath: function (a) {
                return d.prototype.haloPath.call(this, 0 === a ? 0 : (this.marker ? this.marker.radius || 0 : 0) + a)
            },
            ttBelow: !1
        });
        D.prototype.beforePadding = function () {
            var a = this,
                b = this.len,
                d = this.chart,
                e = 0,
                c = b,
                g = this.isXAxis,
                n = g ? "xData" : "yData",
                q = this.min,
                t = {}, y = Math.min(d.plotWidth, d.plotHeight),
                B = Number.MAX_VALUE,
                k = -Number.MAX_VALUE,
                D = this.max - q,
                I = b / D,
                J = [];
            f(this.series, function (b) {
                var c = b.options;
                !b.bubblePadding || !b.visible && d.options.chart.ignoreHiddenSeries || (a.allowZoomOutside = !0, J.push(
                    b), g && (f(["minSize", "maxSize"], function (a) {
                    var b = c[a],
                        d = /%$/.test(b),
                        b = m(b);
                    t[a] = d ? y * b / 100 : b
                }), b.minPxSize = t.minSize, b.maxPxSize = Math.max(t.maxSize, t.minSize), b = b.zData, b.length && (B =
                    r(c.zMin, Math.min(B, Math.max(F(b), !1 === c.displayNegative ?
                    c.zThreshold : -Number.MAX_VALUE))), k = r(c.zMax, Math.max(k, z(b))))))
            });
            f(J, function (b) {
                var d = b[n],
                    f = d.length,
                    m;
                g && b.getRadii(B, k, b.minPxSize, b.maxPxSize);
                if (0 < D) for (; f--;) h(d[f]) && a.dataMin <= d[f] && d[f] <= a.dataMax && (m = b.radii[f], e = Math.min((
                            d[f] - q) * I - m, e), c = Math.max((d[f] - q) * I + m, c))
            });
            J.length && 0 < D && !this.isLog && (c -= b, I *= (b + e - c) / b, f([["min", "userMin", e], ["max",
                        "userMax", c]], function (b) {
                void 0 === r(a.options[b[0]], a[b[1]]) && (a[b[0]] += b[2] / I)
            }))
        }
    })(J);
    (function (a) {
        var z = a.merge,
            F = a.Point,
            D = a.seriesType,
            B = a.seriesTypes;
        B.bubble && D("mapbubble", "bubble", {
            animationLimit: 500,
            tooltip: {
                pointFormat: "{point.name}: {point.z}"
            }
        }, {
            xyFromShape: !0,
            type: "mapbubble",
            pointArrayMap: ["z"],
            getMapData: B.map.prototype.getMapData,
            getBox: B.map.prototype.getBox,
            setData: B.map.prototype.setData
        }, {
            applyOptions: function (a, h) {
                return a && void 0 !== a.lat && void 0 !== a.lon ? F.prototype.applyOptions.call(this, z(a, this.series
                    .chart.fromLatLonToPoint(a)), h) : B.map.prototype.pointClass.prototype.applyOptions.call(this, a,
                    h)
            },
            ttBelow: !1
        })
    })(J);
    (function (a) {
        var z = a.colorPointMixin,
            F = a.each,
            D = a.merge,
            B = a.noop,
            f = a.pick,
            h = a.Series,
            t = a.seriesType,
            r = a.seriesTypes;
        t("heatmap", "scatter", {
            animation: !1,
            borderWidth: 0,
            nullColor: "#f7f7f7",
            dataLabels: {
                formatter: function () {
                    return this.point.value
                },
                inside: !0,
                verticalAlign: "middle",
                crop: !1,
                overflow: !1,
                padding: 0
            },
            marker: null,
            pointRange: null,
            tooltip: {
                pointFormat: "{point.x}, {point.y}: {point.value}\x3cbr/\x3e"
            },
            states: {
                normal: {
                    animation: !0
                },
                hover: {
                    halo: !1,
                    brightness: .2
                }
            }
        }, D(a.colorSeriesMixin, {
            pointArrayMap: ["y",
                "value"],
            hasPointSpecificOptions: !0,
            supportsDrilldown: !0,
            getExtremesFromAll: !0,
            directTouch: !0,
            init: function () {
                var a;
                r.scatter.prototype.init.apply(this, arguments);
                a = this.options;
                a.pointRange = f(a.pointRange, a.colsize || 1);
                this.yAxis.axisPointRange = a.rowsize || 1
            },
            translate: function () {
                var a = this.options,
                    d = this.xAxis,
                    f = this.yAxis,
                    h = function (a, d, b) {
                        return Math.min(Math.max(d, a), b)
                    };
                this.generatePoints();
                F(this.points, function (g) {
                    var m = (a.colsize || 1) / 2,
                        b = (a.rowsize || 1) / 2,
                        l = h(Math.round(d.len - d.translate(g.x -
                            m, 0, 1, 0, 1)), -d.len, 2 * d.len),
                        m = h(Math.round(d.len - d.translate(g.x + m, 0, 1, 0, 1)), -d.len, 2 * d.len),
                        e = h(Math.round(f.translate(g.y - b, 0, 1, 0, 1)), -f.len, 2 * f.len),
                        b = h(Math.round(f.translate(g.y + b, 0, 1, 0, 1)), -f.len, 2 * f.len);
                    g.plotX = g.clientX = (l + m) / 2;
                    g.plotY = (e + b) / 2;
                    g.shapeType = "rect";
                    g.shapeArgs = {
                        x: Math.min(l, m),
                        y: Math.min(e, b),
                        width: Math.abs(m - l),
                        height: Math.abs(b - e)
                    }
                });
                this.translateColors()
            },
            drawPoints: function () {
                r.column.prototype.drawPoints.call(this);
                F(this.points, function (a) {
                    a.graphic.attr(this.colorAttribs(a))
                },
                    this)
            },
            animate: B,
            getBox: B,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            alignDataLabel: r.column.prototype.alignDataLabel,
            getExtremes: function () {
                h.prototype.getExtremes.call(this, this.valueData);
                this.valueMin = this.dataMin;
                this.valueMax = this.dataMax;
                h.prototype.getExtremes.call(this)
            }
        }), z)
    })(J);
    (function (a) {
        function z(a, d) {
            var f, h, m, r = !1,
                b = a.x,
                l = a.y;
            a = 0;
            for (f = d.length - 1; a < d.length; f = a++) h = d[a][1] > l, m = d[f][1] > l, h !== m && b < (d[f][0] - d[
                    a][0]) * (l - d[a][1]) / (d[f][1] - d[a][1]) + d[a][0] && (r = !r);
            return r
        }
        var F =
            a.Chart,
            D = a.each,
            B = a.extend,
            f = a.format,
            h = a.merge,
            t = a.win,
            r = a.wrap;
        F.prototype.transformFromLatLon = function (f, d) {
            if (void 0 === t.proj4) return a.error(21), {
                    x: 0,
                    y: null
            };
            f = t.proj4(d.crs, [f.lon, f.lat]);
            var g = d.cosAngle || d.rotation && Math.cos(d.rotation),
                h = d.sinAngle || d.rotation && Math.sin(d.rotation);
            f = d.rotation ? [f[0] * g + f[1] * h, -f[0] * h + f[1] * g] : f;
            return {
                x: ((f[0] - (d.xoffset || 0)) * (d.scale || 1) + (d.xpan || 0)) * (d.jsonres || 1) + (d.jsonmarginX ||
                    0),
                y: (((d.yoffset || 0) - f[1]) * (d.scale || 1) + (d.ypan || 0)) * (d.jsonres || 1) - (d.jsonmarginY ||
                    0)
            }
        };
        F.prototype.transformToLatLon = function (f, d) {
            if (void 0 === t.proj4) a.error(21);
            else {
                f = {
                    x: ((f.x - (d.jsonmarginX || 0)) / (d.jsonres || 1) - (d.xpan || 0)) / (d.scale || 1) + (d.xoffset ||
                        0),
                    y: ((-f.y - (d.jsonmarginY || 0)) / (d.jsonres || 1) + (d.ypan || 0)) / (d.scale || 1) + (d.yoffset ||
                        0)
                };
                var g = d.cosAngle || d.rotation && Math.cos(d.rotation),
                    h = d.sinAngle || d.rotation && Math.sin(d.rotation);
                d = t.proj4(d.crs, "WGS84", d.rotation ? {
                    x: f.x * g + f.y * -h,
                    y: f.x * h + f.y * g
                } : f);
                return {
                    lat: d.y,
                    lon: d.x
                }
            }
        };
        F.prototype.fromPointToLatLon = function (f) {
            var d = this.mapTransforms,
                g;
            if (d) {
                for (g in d) if (d.hasOwnProperty(g) && d[g].hitZone && z({
                        x: f.x,
                        y: -f.y
                    }, d[g].hitZone.coordinates[0])) return this.transformToLatLon(f, d[g]);
                return this.transformToLatLon(f, d["default"])
            }
            a.error(22)
        };
        F.prototype.fromLatLonToPoint = function (f) {
            var d = this.mapTransforms,
                g, h;
            if (!d) return a.error(22), {
                    x: 0,
                    y: null
            };
            for (g in d) if (d.hasOwnProperty(g) && d[g].hitZone && (h = this.transformFromLatLon(f, d[g]), z({
                    x: h.x,
                    y: -h.y
                }, d[g].hitZone.coordinates[0]))) return h;
            return this.transformFromLatLon(f, d["default"])
        };
        a.geojson = function (a, d, g) {
            var h = [],
                m = [],
                r = function (a) {
                    var b, d = a.length;
                    m.push("M");
                    for (b = 0; b < d; b++) 1 === b && m.push("L"), m.push(a[b][0], -a[b][1])
                };
            d = d || "map";
            D(a.features, function (a) {
                var b = a.geometry,
                    e = b.type,
                    b = b.coordinates;
                a = a.properties;
                var c;
                m = [];
                "map" === d || "mapbubble" === d ? ("Polygon" === e ? (D(b, r), m.push("Z")) : "MultiPolygon" === e &&
                    (D(b, function (a) {
                    D(a, r)
                }), m.push("Z")), m.length && (c = {
                    path: m
                })) : "mapline" === d ? ("LineString" === e ? r(b) : "MultiLineString" === e && D(b, r), m.length && (c = {
                    path: m
                })) : "mappoint" === d && "Point" ===
                    e && (c = {
                    x: b[0],
                    y: -b[1]
                });
                c && h.push(B(c, {
                    name: a.name || a.NAME,
                    properties: a
                }))
            });
            g && a.copyrightShort && (g.chart.mapCredits = f(g.chart.options.credits.mapText, {
                geojson: a
            }), g.chart.mapCreditsFull = f(g.chart.options.credits.mapTextFull, {
                geojson: a
            }));
            return h
        };
        r(F.prototype, "addCredits", function (a, d) {
            d = h(!0, this.options.credits, d);
            this.mapCredits && (d.href = null);
            a.call(this, d);
            this.credits && this.mapCreditsFull && this.credits.attr({
                title: this.mapCreditsFull
            })
        })
    })(J);
    (function (a) {
        function z(a, d, f, h, b, l, e, c) {
            return ["M",
                a + b, d, "L", a + f - l, d, "C", a + f - l / 2, d, a + f, d + l / 2, a + f, d + l, "L", a + f, d + h -
                e, "C", a + f, d + h - e / 2, a + f - e / 2, d + h, a + f - e, d + h, "L", a + c, d + h, "C", a + c / 2,
                d + h, a, d + h - c / 2, a, d + h - c, "L", a, d + b, "C", a, d + b / 2, a + b / 2, d, a + b, d, "Z"]
        }
        var F = a.Chart,
            D = a.defaultOptions,
            B = a.each,
            f = a.extend,
            h = a.merge,
            t = a.pick,
            r = a.Renderer,
            m = a.SVGRenderer,
            d = a.VMLRenderer;
        f(D.lang, {
            zoomIn: "Zoom in",
            zoomOut: "Zoom out"
        });
        D.mapNavigation = {
            buttonOptions: {
                alignTo: "plotBox",
                align: "left",
                verticalAlign: "top",
                x: 0,
                width: 18,
                height: 18,
                padding: 5,
                style: {
                    fontSize: "15px",
                    fontWeight: "bold"
                },
                theme: {
                    "stroke-width": 1,
                    "text-align": "center"
                }
            },
            buttons: {
                zoomIn: {
                    onclick: function () {
                        this.mapZoom(.5)
                    },
                    text: "+",
                    y: 0
                },
                zoomOut: {
                    onclick: function () {
                        this.mapZoom(2)
                    },
                    text: "-",
                    y: 28
                }
            },
            mouseWheelSensitivity: 1.1
        };
        a.splitPath = function (a) {
            var d;
            a = a.replace(/([A-Za-z])/g, " $1 ");
            a = a.replace(/^\s*/, "").replace(/\s*$/, "");
            a = a.split(/[ ,]+/);
            for (d = 0; d < a.length; d++) /[a-zA-Z]/.test(a[d]) || (a[d] = parseFloat(a[d]));
            return a
        };
        a.maps = {};
        m.prototype.symbols.topbutton = function (a, d, f, h, b) {
            return z(a - 1, d - 1, f, h, b.r, b.r, 0, 0)
        };
        m.prototype.symbols.bottombutton = function (a, d, f, h, b) {
            return z(a - 1, d - 1, f, h, 0, 0, b.r, b.r)
        };
        r === d && B(["topbutton", "bottombutton"], function (a) {
            d.prototype.symbols[a] = m.prototype.symbols[a]
        });
        a.Map = a.mapChart = function (d, f, m) {
            var g = "string" === typeof d || d.nodeName,
                b = arguments[g ? 1 : 0],
                l = {
                    endOnTick: !1,
                    visible: !1,
                    minPadding: 0,
                    maxPadding: 0,
                    startOnTick: !1
                }, e, c = a.getOptions().credits;
            e = b.series;
            b.series = null;
            b = h({
                chart: {
                    panning: "xy",
                    type: "map"
                },
                credits: {
                    mapText: t(c.mapText,
                        ' \u00a9 \x3ca href\x3d"{geojson.copyrightUrl}"\x3e{geojson.copyrightShort}\x3c/a\x3e'),
                    mapTextFull: t(c.mapTextFull, "{geojson.copyright}")
                },
                tooltip: {
                    followTouchMove: !1
                },
                xAxis: l,
                yAxis: h(l, {
                    reversed: !0
                })
            }, b, {
                chart: {
                    inverted: !1,
                    alignTicks: !1
                }
            });
            b.series = e;
            return g ? new F(d, b, m) : new F(b, f)
        }
    })(J);
    return J
    });