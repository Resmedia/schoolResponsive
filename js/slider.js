!function (t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.SlimSlider = e() : t.SlimSlider = e()
}(this, function () {
    return function (t) {
        function e(n) {
            if (i[n]) return i[n].exports;
            var r = i[n] = {i: n, l: !1, exports: {}};
            return t[n].call(r.exports, r, r.exports, e), r.l = !0, r.exports
        }

        var i = {};
        return e.m = t, e.c = i, e.i = function (t) {
            return t
        }, e.d = function (t, i, n) {
            e.o(t, i) || Object.defineProperty(t, i, {configurable: !1, enumerable: !0, get: n})
        }, e.n = function (t) {
            var i = t && t.__esModule ? function () {
                return t.default
            } : function () {
                return t
            };
            return e.d(i, "a", i), i
        }, e.o = function (t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }, e.p = "", e(e.s = 4)
    }([function (t, e, i) {
        "use strict";

        function n(t) {
            return t && t.__esModule ? t : {default: t}
        }

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        Object.defineProperty(e, "__esModule", {value: !0});
        var s = Object.assign || function (t) {
            for (var e = 1; e < arguments.length; e++) {
                var i = arguments[e];
                for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (t[n] = i[n])
            }
            return t
        }, o = function () {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }

            return function (e, i, n) {
                return i && t(e.prototype, i), n && t(e, n), e
            }
        }(), a = i(3), u = n(a), c = i(2), h = (n(c), i(1)), l = {
            timing: 400,
            childsClassName: ".slim-slide",
            dir: "ltr",
            threshold: 10,
            showButtons: !1,
            infinite: !1,
            showPointers: !0
        }, p = function () {
            function t(e) {
                var i = this;
                if (r(this, t), this.handleSwipe = function (t) {
                    var e = t.deltaY / i.width * 100 > -20;
                    i.panEnabled && e ? (i.translate(i.pos + t.deltaX), t.isFinal ? "panleft" == t.type ? i.slideTo(i.current - i.operator) : "panright" == t.type ? i.slideTo(i.current + i.operator) : i.slideTo(i.current) : "panend" != t.type && "pancancel" != t.type || i.slideTo(i.current)) : i.slideTo(i.current)
                }, this.options = Object.assign({}, l, e), !this.options.selector) throw new Error("option missing: Providing a selector is a must to initialize the slider!");
                this.init()
            }

            return o(t, [{
                key: "setPan", value: function (t) {
                    this.panEnabled = t, this.initGesture()
                }
            }, {
                key: "initGesture", value: function () {
                    this.sliderManager && (this.sliderManager.destroy(), this.sliderManager = null);
                    var t = this.panEnabled ? {touchAction: "pan-y"} : {touchAction: "none"};
                    this.sliderManager = new u.default.Manager(this.slider, s({}, t, {recognizers: [[u.default.Pan, {direction: u.default.DIRECTION_ALL}]]})), this.sliderManager.on("panstart panmove panend pancancel panleft panright panup pandown", this.handleSwipe)
                }
            }, {
                key: "init", value: function () {
                    this.timeout, this.panEnabled = !0, this.timing = this.options.timing, this.threshold = this.options.threshold, this.current = 0, this.pos = 0, this.operator = "rtl" === this.options.dir ? 1 : -1, this.slider = document.querySelector(this.options.selector), this.slides = this.slider.querySelectorAll(this.options.childsClassName), this.slideCount = this.slides.length, this.width = this.slides[0].offsetWidth, this.initDom(), this.options.showPointers && this.createPagination(), this.options.showButtons && this.createButtons(), this.initGesture(), this.registerListeners(), (0, h.dispatchEvent)(this.slider, "after.slim.init", {current: this.current})
                }
            }, {
                key: "initDom", value: function () {
                    this.slides[0].classList.add("active"), this.slider.parentNode.style.direction = this.options.dir, this.slides.forEach(function (t, e) {
                        t.dataset.item = e
                    })
                }
            }, {
                key: "createPagination", value: function () {
                    var t = this;
                    this.carouselPagination = (0, h.create)("div", {class: "carousel-pagination"}), this.slides.forEach(function (e, i) {
                        //var n = (0, h.create)("div", {class: "carousel-pagination-pointer", id: "pointer_" + i});
                       // t.carouselPagination.appendChild(n)
                    }), this.slider.parentNode.parentNode.appendChild(this.carouselPagination)
                }
            }, {
                key: "createButtons", value: function () {
                    this.nextButton = (0, h.create)("a", {class: "next carousel-arrow"}), this.prevButton = (0, h.create)("a", {class: "prev carousel-arrow"}), this.carouselPagination && (this.carouselPagination.appendChild(this.nextButton), this.carouselPagination.appendChild(this.prevButton))
                }
            }, /*{
                key: "updatePagination", value: function () {
                    var t = this.slider.querySelector(".active").dataset.item,
                        e = document.querySelector("#pointer_" + t),
                        i = document.querySelector(".carousel-pagination-pointer.active");
                    i && i.classList.remove("active"), e && e.classList.add("active")
                }
            }, */{
                key: "registerListeners", value: function () {
                    var t = this;
                    (0, h.addEvent)(this.nextButton, "click", function (e) {
                        t.slideTo(t.current - t.operator)
                    }), (0, h.addEvent)(this.prevButton, "click", function (e) {
                        t.slideTo(t.current + t.operator)
                    }), /*(0, h.addEvent)(this.slider, "after.slim.init", function (e) {
                        t.updatePagination()
                    }), (0, h.addEvent)(this.slider, "after.slim.slide", function (e) {
                        t.updatePagination()
                    }),*/ window.addEventListener("resize", function (e) {
                        clearTimeout(t.resized), t.resized = setTimeout(function (e) {
                            t.init(), t.slideTo(0)
                        }, 500)
                    })
                }
            }, {
                key: "translate", value: function (t) {
                    var e = this;
                    (0, h.requestAnimationFrame)(function (i) {
                        e.slider.style.transform = "translateX(" + t + "px)"
                    })
                }
            }, {
                key: "slideTo", value: function (t) {
                    var e = this, i = this.options.infinite ? 0 : this.slideCount - 1;
                    this.current = t < 0 ? 0 : t > this.slideCount - 1 ? i : t, this.pos = this.operator * this.current * this.width;
                    var n = document.querySelector(this.options.childsClassName + ".active");
                    this.slider.classList.add("is-animating"), n && n.classList.remove("active"), this.slides[this.current].classList.add("active"), this.timeout && clearTimeout(this.timeout), this.timeout = setTimeout(function (t) {
                        e.slider.classList.remove("is-animating"), (0, h.dispatchEvent)(e.slider, "after.slim.slide", {current: e.current})
                    }, this.timing), this.translate(this.pos)
                }
            }]), t
        }();
        e.default = p, t.exports = e.default
    }, function (t, e, i) {
        "use strict";

        function n(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, i = document.createElement(t);
            try {
                Object.keys(e).forEach(function (t) {
                    i.setAttribute(t, e[t])
                })
            } catch (t) {
                console.error(t)
            }
            return i
        }

        function r(t, e, i) {
            t && t.addEventListener(e, i)
        }

        function s(t, e, i) {
            var n = new CustomEvent(e, {bubbles: !0, cancelable: !0, details: i});
            t.dispatchEvent(n)
        }

        Object.defineProperty(e, "__esModule", {value: !0}), e.create = n, e.addEvent = r, e.dispatchEvent = s;
        e.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame
    }, function (t, e, i) {
        function n() {
            try {
                var t = new r("cat", {detail: {foo: "bar"}});
                return "cat" === t.type && "bar" === t.detail.foo
            } catch (t) {
            }
            return !1
        }

        var r = i.i({}).CustomEvent;
        t.exports = n() ? r : "undefined" != typeof document && "function" == typeof document.createEvent ? function (t, e) {
            var i = document.createEvent("CustomEvent");
            return e ? i.initCustomEvent(t, e.bubbles, e.cancelable, e.detail) : i.initCustomEvent(t, !1, !1, void 0), i
        } : function (t, e) {
            var i = document.createEventObject();
            return i.type = t, e ? (i.bubbles = Boolean(e.bubbles), i.cancelable = Boolean(e.cancelable), i.detail = e.detail) : (i.bubbles = !1, i.cancelable = !1, i.detail = void 0), i
        }
    }, function (t, e, i) {
        var n;/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
        !function (r, s, o, a) {
            "use strict";

            function u(t, e, i) {
                return setTimeout(d(t, i), e)
            }

            function c(t, e, i) {
                return !!Array.isArray(t) && (h(t, i[e], i), !0)
            }

            function h(t, e, i) {
                var n;
                if (t) if (t.forEach) t.forEach(e, i); else if (t.length !== a) for (n = 0; n < t.length;) e.call(i, t[n], n, t), n++; else for (n in t) t.hasOwnProperty(n) && e.call(i, t[n], n, t)
            }

            function l(t, e, i) {
                var n = "DEPRECATED METHOD: " + e + "\n" + i + " AT \n";
                return function () {
                    var e = new Error("get-stack-trace"),
                        i = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace",
                        s = r.console && (r.console.warn || r.console.log);
                    return s && s.call(r.console, n, i), t.apply(this, arguments)
                }
            }

            function p(t, e, i) {
                var n, r = e.prototype;
                n = t.prototype = Object.create(r), n.constructor = t, n._super = r, i && vt(n, i)
            }

            function d(t, e) {
                return function () {
                    return t.apply(e, arguments)
                }
            }

            function f(t, e) {
                return typeof t == yt ? t.apply(e ? e[0] || a : a, e) : t
            }

            function v(t, e) {
                return t === a ? e : t
            }

            function m(t, e, i) {
                h(E(e), function (e) {
                    t.addEventListener(e, i, !1)
                })
            }

            function g(t, e, i) {
                h(E(e), function (e) {
                    t.removeEventListener(e, i, !1)
                })
            }

            function y(t, e) {
                for (; t;) {
                    if (t == e) return !0;
                    t = t.parentNode
                }
                return !1
            }

            function T(t, e) {
                return t.indexOf(e) > -1
            }

            function E(t) {
                return t.trim().split(/\s+/g)
            }

            function b(t, e, i) {
                if (t.indexOf && !i) return t.indexOf(e);
                for (var n = 0; n < t.length;) {
                    if (i && t[n][i] == e || !i && t[n] === e) return n;
                    n++
                }
                return -1
            }

            function w(t) {
                return Array.prototype.slice.call(t, 0)
            }

            function P(t, e, i) {
                for (var n = [], r = [], s = 0; s < t.length;) {
                    var o = e ? t[s][e] : t[s];
                    b(r, o) < 0 && n.push(t[s]), r[s] = o, s++
                }
                return i && (n = e ? n.sort(function (t, i) {
                    return t[e] > i[e]
                }) : n.sort()), n
            }

            function C(t, e) {
                for (var i, n, r = e[0].toUpperCase() + e.slice(1), s = 0; s < mt.length;) {
                    if (i = mt[s], n = i ? i + r : e, n in t) return n;
                    s++
                }
                return a
            }

            function A() {
                return Ct++
            }

            function S(t) {
                var e = t.ownerDocument || t;
                return e.defaultView || e.parentWindow || r
            }

            function _(t, e) {
                var i = this;
                this.manager = t, this.callback = e, this.element = t.element, this.target = t.options.inputTarget, this.domHandler = function (e) {
                    f(t.options.enable, [t]) && i.handler(e)
                }, this.init()
            }

            function x(t) {
                var e, i = t.options.inputClass;
                return new (e = i ? i : _t ? j : xt ? H : St ? V : Y)(t, I)
            }

            function I(t, e, i) {
                var n = i.pointers.length, r = i.changedPointers.length, s = e & Rt && n - r === 0,
                    o = e & (kt | qt) && n - r === 0;
                i.isFirst = !!s, i.isFinal = !!o, s && (t.session = {}), i.eventType = e, O(t, i), t.emit("hammer.input", i), t.recognize(i), t.session.prevInput = i
            }

            function O(t, e) {
                var i = t.session, n = e.pointers, r = n.length;
                i.firstInput || (i.firstInput = z(e)), r > 1 && !i.firstMultiple ? i.firstMultiple = z(e) : 1 === r && (i.firstMultiple = !1);
                var s = i.firstInput, o = i.firstMultiple, a = o ? o.center : s.center, u = e.center = R(n);
                e.timeStamp = bt(), e.deltaTime = e.timeStamp - s.timeStamp, e.angle = F(a, u), e.distance = q(a, u), D(i, e), e.offsetDirection = k(e.deltaX, e.deltaY);
                var c = N(e.deltaTime, e.deltaX, e.deltaY);
                e.overallVelocityX = c.x, e.overallVelocityY = c.y, e.overallVelocity = Et(c.x) > Et(c.y) ? c.x : c.y, e.scale = o ? X(o.pointers, n) : 1, e.rotation = o ? L(o.pointers, n) : 0, e.maxPointers = i.prevInput ? e.pointers.length > i.prevInput.maxPointers ? e.pointers.length : i.prevInput.maxPointers : e.pointers.length, M(i, e);
                var h = t.element;
                y(e.srcEvent.target, h) && (h = e.srcEvent.target), e.target = h
            }

            function D(t, e) {
                var i = e.center, n = t.offsetDelta || {}, r = t.prevDelta || {}, s = t.prevInput || {};
                e.eventType !== Rt && s.eventType !== kt || (r = t.prevDelta = {
                    x: s.deltaX || 0,
                    y: s.deltaY || 0
                }, n = t.offsetDelta = {x: i.x, y: i.y}), e.deltaX = r.x + (i.x - n.x), e.deltaY = r.y + (i.y - n.y)
            }

            function M(t, e) {
                var i, n, r, s, o = t.lastInterval || e, u = e.timeStamp - o.timeStamp;
                if (e.eventType != qt && (u > zt || o.velocity === a)) {
                    var c = e.deltaX - o.deltaX, h = e.deltaY - o.deltaY, l = N(u, c, h);
                    n = l.x, r = l.y, i = Et(l.x) > Et(l.y) ? l.x : l.y, s = k(c, h), t.lastInterval = e
                } else i = o.velocity, n = o.velocityX, r = o.velocityY, s = o.direction;
                e.velocity = i, e.velocityX = n, e.velocityY = r, e.direction = s
            }

            function z(t) {
                for (var e = [], i = 0; i < t.pointers.length;) e[i] = {
                    clientX: Tt(t.pointers[i].clientX),
                    clientY: Tt(t.pointers[i].clientY)
                }, i++;
                return {timeStamp: bt(), pointers: e, center: R(e), deltaX: t.deltaX, deltaY: t.deltaY}
            }

            function R(t) {
                var e = t.length;
                if (1 === e) return {x: Tt(t[0].clientX), y: Tt(t[0].clientY)};
                for (var i = 0, n = 0, r = 0; r < e;) i += t[r].clientX, n += t[r].clientY, r++;
                return {x: Tt(i / e), y: Tt(n / e)}
            }

            function N(t, e, i) {
                return {x: e / t || 0, y: i / t || 0}
            }

            function k(t, e) {
                return t === e ? Ft : Et(t) >= Et(e) ? t < 0 ? Lt : Xt : e < 0 ? Yt : jt
            }

            function q(t, e, i) {
                i || (i = Ut);
                var n = e[i[0]] - t[i[0]], r = e[i[1]] - t[i[1]];
                return Math.sqrt(n * n + r * r)
            }

            function F(t, e, i) {
                i || (i = Ut);
                var n = e[i[0]] - t[i[0]], r = e[i[1]] - t[i[1]];
                return 180 * Math.atan2(r, n) / Math.PI
            }

            function L(t, e) {
                return F(e[1], e[0], Vt) + F(t[1], t[0], Vt)
            }

            function X(t, e) {
                return q(e[0], e[1], Vt) / q(t[0], t[1], Vt)
            }

            function Y() {
                this.evEl = Zt, this.evWin = $t, this.pressed = !1, _.apply(this, arguments)
            }

            function j() {
                this.evEl = Qt, this.evWin = te, _.apply(this, arguments), this.store = this.manager.session.pointerEvents = []
            }

            function W() {
                this.evTarget = ie, this.evWin = ne, this.started = !1, _.apply(this, arguments)
            }

            function B(t, e) {
                var i = w(t.touches), n = w(t.changedTouches);
                return e & (kt | qt) && (i = P(i.concat(n), "identifier", !0)), [i, n]
            }

            function H() {
                this.evTarget = se, this.targetIds = {}, _.apply(this, arguments)
            }

            function U(t, e) {
                var i = w(t.touches), n = this.targetIds;
                if (e & (Rt | Nt) && 1 === i.length) return n[i[0].identifier] = !0, [i, i];
                var r, s, o = w(t.changedTouches), a = [], u = this.target;
                if (s = i.filter(function (t) {
                    return y(t.target, u)
                }), e === Rt) for (r = 0; r < s.length;) n[s[r].identifier] = !0, r++;
                for (r = 0; r < o.length;) n[o[r].identifier] && a.push(o[r]), e & (kt | qt) && delete n[o[r].identifier], r++;
                return a.length ? [P(s.concat(a), "identifier", !0), a] : void 0
            }

            function V() {
                _.apply(this, arguments);
                var t = d(this.handler, this);
                this.touch = new H(this.manager, t), this.mouse = new Y(this.manager, t), this.primaryTouch = null, this.lastTouches = []
            }

            function G(t, e) {
                t & Rt ? (this.primaryTouch = e.changedPointers[0].identifier, Z.call(this, e)) : t & (kt | qt) && Z.call(this, e)
            }

            function Z(t) {
                var e = t.changedPointers[0];
                if (e.identifier === this.primaryTouch) {
                    var i = {x: e.clientX, y: e.clientY};
                    this.lastTouches.push(i);
                    var n = this.lastTouches, r = function () {
                        var t = n.indexOf(i);
                        t > -1 && n.splice(t, 1)
                    };
                    setTimeout(r, oe)
                }
            }

            function $(t) {
                for (var e = t.srcEvent.clientX, i = t.srcEvent.clientY, n = 0; n < this.lastTouches.length; n++) {
                    var r = this.lastTouches[n], s = Math.abs(e - r.x), o = Math.abs(i - r.y);
                    if (s <= ae && o <= ae) return !0
                }
                return !1
            }

            function J(t, e) {
                this.manager = t, this.set(e)
            }

            function K(t) {
                if (T(t, de)) return de;
                var e = T(t, fe), i = T(t, ve);
                return e && i ? de : e || i ? e ? fe : ve : T(t, pe) ? pe : le
            }

            function Q() {
                if (!ce) return !1;
                var t = {}, e = r.CSS && r.CSS.supports;
                return ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function (i) {
                    t[i] = !e || r.CSS.supports("touch-action", i)
                }), t
            }

            function tt(t) {
                this.options = vt({}, this.defaults, t || {}), this.id = A(), this.manager = null, this.options.enable = v(this.options.enable, !0), this.state = ge, this.simultaneous = {}, this.requireFail = []
            }

            function et(t) {
                return t & we ? "cancel" : t & Ee ? "end" : t & Te ? "move" : t & ye ? "start" : ""
            }

            function it(t) {
                return t == jt ? "down" : t == Yt ? "up" : t == Lt ? "left" : t == Xt ? "right" : ""
            }

            function nt(t, e) {
                var i = e.manager;
                return i ? i.get(t) : t
            }

            function rt() {
                tt.apply(this, arguments)
            }

            function st() {
                rt.apply(this, arguments), this.pX = null, this.pY = null
            }

            function ot() {
                rt.apply(this, arguments)
            }

            function at() {
                tt.apply(this, arguments), this._timer = null, this._input = null
            }

            function ut() {
                rt.apply(this, arguments)
            }

            function ct() {
                rt.apply(this, arguments)
            }

            function ht() {
                tt.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0
            }

            function lt(t, e) {
                return e = e || {}, e.recognizers = v(e.recognizers, lt.defaults.preset), new pt(t, e)
            }

            function pt(t, e) {
                this.options = vt({}, lt.defaults, e || {}), this.options.inputTarget = this.options.inputTarget || t, this.handlers = {}, this.session = {}, this.recognizers = [], this.oldCssProps = {}, this.element = t, this.input = x(this), this.touchAction = new J(this, this.options.touchAction), dt(this, !0), h(this.options.recognizers, function (t) {
                    var e = this.add(new t[0](t[1]));
                    t[2] && e.recognizeWith(t[2]), t[3] && e.requireFailure(t[3])
                }, this)
            }

            function dt(t, e) {
                var i = t.element;
                if (i.style) {
                    var n;
                    h(t.options.cssProps, function (r, s) {
                        n = C(i.style, s), e ? (t.oldCssProps[n] = i.style[n], i.style[n] = r) : i.style[n] = t.oldCssProps[n] || ""
                    }), e || (t.oldCssProps = {})
                }
            }

            function ft(t, e) {
                var i = s.createEvent("Event");
                i.initEvent(t, !0, !0), i.gesture = e, e.target.dispatchEvent(i)
            }

            var vt, mt = ["", "webkit", "Moz", "MS", "ms", "o"], gt = s.createElement("div"), yt = "function",
                Tt = Math.round, Et = Math.abs, bt = Date.now;
            vt = "function" != typeof Object.assign ? function (t) {
                if (t === a || null === t) throw new TypeError("Cannot convert undefined or null to object");
                for (var e = Object(t), i = 1; i < arguments.length; i++) {
                    var n = arguments[i];
                    if (n !== a && null !== n) for (var r in n) n.hasOwnProperty(r) && (e[r] = n[r])
                }
                return e
            } : Object.assign;
            var wt = l(function (t, e, i) {
                    for (var n = Object.keys(e), r = 0; r < n.length;) (!i || i && t[n[r]] === a) && (t[n[r]] = e[n[r]]), r++;
                    return t
                }, "extend", "Use `assign`."), Pt = l(function (t, e) {
                    return wt(t, e, !0)
                }, "merge", "Use `assign`."), Ct = 1, At = /mobile|tablet|ip(ad|hone|od)|android/i,
                St = "ontouchstart" in r, _t = C(r, "PointerEvent") !== a, xt = St && At.test(navigator.userAgent),
                It = "touch", Ot = "pen", Dt = "mouse", Mt = "kinect", zt = 25, Rt = 1, Nt = 2, kt = 4, qt = 8, Ft = 1,
                Lt = 2, Xt = 4, Yt = 8, jt = 16, Wt = Lt | Xt, Bt = Yt | jt, Ht = Wt | Bt, Ut = ["x", "y"],
                Vt = ["clientX", "clientY"];
            _.prototype = {
                handler: function () {
                }, init: function () {
                    this.evEl && m(this.element, this.evEl, this.domHandler), this.evTarget && m(this.target, this.evTarget, this.domHandler), this.evWin && m(S(this.element), this.evWin, this.domHandler)
                }, destroy: function () {
                    this.evEl && g(this.element, this.evEl, this.domHandler), this.evTarget && g(this.target, this.evTarget, this.domHandler), this.evWin && g(S(this.element), this.evWin, this.domHandler)
                }
            };
            var Gt = {mousedown: Rt, mousemove: Nt, mouseup: kt}, Zt = "mousedown", $t = "mousemove mouseup";
            p(Y, _, {
                handler: function (t) {
                    var e = Gt[t.type];
                    e & Rt && 0 === t.button && (this.pressed = !0), e & Nt && 1 !== t.which && (e = kt), this.pressed && (e & kt && (this.pressed = !1), this.callback(this.manager, e, {
                        pointers: [t],
                        changedPointers: [t],
                        pointerType: Dt,
                        srcEvent: t
                    }))
                }
            });
            var Jt = {pointerdown: Rt, pointermove: Nt, pointerup: kt, pointercancel: qt, pointerout: qt},
                Kt = {2: It, 3: Ot, 4: Dt, 5: Mt}, Qt = "pointerdown", te = "pointermove pointerup pointercancel";
            r.MSPointerEvent && !r.PointerEvent && (Qt = "MSPointerDown", te = "MSPointerMove MSPointerUp MSPointerCancel"), p(j, _, {
                handler: function (t) {
                    var e = this.store, i = !1, n = t.type.toLowerCase().replace("ms", ""), r = Jt[n],
                        s = Kt[t.pointerType] || t.pointerType, o = s == It, a = b(e, t.pointerId, "pointerId");
                    r & Rt && (0 === t.button || o) ? a < 0 && (e.push(t), a = e.length - 1) : r & (kt | qt) && (i = !0), a < 0 || (e[a] = t, this.callback(this.manager, r, {
                        pointers: e,
                        changedPointers: [t],
                        pointerType: s,
                        srcEvent: t
                    }), i && e.splice(a, 1))
                }
            });
            var ee = {touchstart: Rt, touchmove: Nt, touchend: kt, touchcancel: qt}, ie = "touchstart",
                ne = "touchstart touchmove touchend touchcancel";
            p(W, _, {
                handler: function (t) {
                    var e = ee[t.type];
                    if (e === Rt && (this.started = !0), this.started) {
                        var i = B.call(this, t, e);
                        e & (kt | qt) && i[0].length - i[1].length === 0 && (this.started = !1), this.callback(this.manager, e, {
                            pointers: i[0],
                            changedPointers: i[1],
                            pointerType: It,
                            srcEvent: t
                        })
                    }
                }
            });
            var re = {touchstart: Rt, touchmove: Nt, touchend: kt, touchcancel: qt},
                se = "touchstart touchmove touchend touchcancel";
            p(H, _, {
                handler: function (t) {
                    var e = re[t.type], i = U.call(this, t, e);
                    i && this.callback(this.manager, e, {
                        pointers: i[0],
                        changedPointers: i[1],
                        pointerType: It,
                        srcEvent: t
                    })
                }
            });
            var oe = 2500, ae = 25;
            p(V, _, {
                handler: function (t, e, i) {
                    var n = i.pointerType == It, r = i.pointerType == Dt;
                    if (!(r && i.sourceCapabilities && i.sourceCapabilities.firesTouchEvents)) {
                        if (n) G.call(this, e, i); else if (r && $.call(this, i)) return;
                        this.callback(t, e, i)
                    }
                }, destroy: function () {
                    this.touch.destroy(), this.mouse.destroy()
                }
            });
            var ue = C(gt.style, "touchAction"), ce = ue !== a, he = "compute", le = "auto", pe = "manipulation",
                de = "none", fe = "pan-x", ve = "pan-y", me = Q();
            J.prototype = {
                set: function (t) {
                    t == he && (t = this.compute()), ce && this.manager.element.style && me[t] && (this.manager.element.style[ue] = t), this.actions = t.toLowerCase().trim()
                }, update: function () {
                    this.set(this.manager.options.touchAction)
                }, compute: function () {
                    var t = [];
                    return h(this.manager.recognizers, function (e) {
                        f(e.options.enable, [e]) && (t = t.concat(e.getTouchAction()))
                    }), K(t.join(" "))
                }, preventDefaults: function (t) {
                    var e = t.srcEvent, i = t.offsetDirection;
                    if (this.manager.session.prevented) return void e.preventDefault();
                    var n = this.actions, r = T(n, de) && !me[de], s = T(n, ve) && !me[ve], o = T(n, fe) && !me[fe];
                    if (r) {
                        var a = 1 === t.pointers.length, u = t.distance < 2, c = t.deltaTime < 250;
                        if (a && u && c) return
                    }
                    return o && s ? void 0 : r || s && i & Wt || o && i & Bt ? this.preventSrc(e) : void 0
                }, preventSrc: function (t) {
                    this.manager.session.prevented = !0, t.preventDefault()
                }
            };
            var ge = 1, ye = 2, Te = 4, Ee = 8, be = Ee, we = 16, Pe = 32;
            tt.prototype = {
                defaults: {}, set: function (t) {
                    return vt(this.options, t), this.manager && this.manager.touchAction.update(), this
                }, recognizeWith: function (t) {
                    if (c(t, "recognizeWith", this)) return this;
                    var e = this.simultaneous;
                    return t = nt(t, this), e[t.id] || (e[t.id] = t, t.recognizeWith(this)), this
                }, dropRecognizeWith: function (t) {
                    return c(t, "dropRecognizeWith", this) ? this : (t = nt(t, this), delete this.simultaneous[t.id], this)
                }, requireFailure: function (t) {
                    if (c(t, "requireFailure", this)) return this;
                    var e = this.requireFail;
                    return t = nt(t, this), b(e, t) === -1 && (e.push(t), t.requireFailure(this)), this
                }, dropRequireFailure: function (t) {
                    if (c(t, "dropRequireFailure", this)) return this;
                    t = nt(t, this);
                    var e = b(this.requireFail, t);
                    return e > -1 && this.requireFail.splice(e, 1), this
                }, hasRequireFailures: function () {
                    return this.requireFail.length > 0
                }, canRecognizeWith: function (t) {
                    return !!this.simultaneous[t.id]
                }, emit: function (t) {
                    function e(e) {
                        i.manager.emit(e, t)
                    }

                    var i = this, n = this.state;
                    n < Ee && e(i.options.event + et(n)), e(i.options.event), t.additionalEvent && e(t.additionalEvent), n >= Ee && e(i.options.event + et(n))
                }, tryEmit: function (t) {
                    return this.canEmit() ? this.emit(t) : void (this.state = Pe)
                }, canEmit: function () {
                    for (var t = 0; t < this.requireFail.length;) {
                        if (!(this.requireFail[t].state & (Pe | ge))) return !1;
                        t++
                    }
                    return !0
                }, recognize: function (t) {
                    var e = vt({}, t);
                    return f(this.options.enable, [this, e]) ? (this.state & (be | we | Pe) && (this.state = ge), this.state = this.process(e), void (this.state & (ye | Te | Ee | we) && this.tryEmit(e))) : (this.reset(), void (this.state = Pe))
                }, process: function (t) {
                }, getTouchAction: function () {
                }, reset: function () {
                }
            }, p(rt, tt, {
                defaults: {pointers: 1}, attrTest: function (t) {
                    var e = this.options.pointers;
                    return 0 === e || t.pointers.length === e
                }, process: function (t) {
                    var e = this.state, i = t.eventType, n = e & (ye | Te), r = this.attrTest(t);
                    return n && (i & qt || !r) ? e | we : n || r ? i & kt ? e | Ee : e & ye ? e | Te : ye : Pe
                }
            }), p(st, rt, {
                defaults: {event: "pan", threshold: 10, pointers: 1, direction: Ht},
                getTouchAction: function () {
                    var t = this.options.direction, e = [];
                    return t & Wt && e.push(ve), t & Bt && e.push(fe), e
                },
                directionTest: function (t) {
                    var e = this.options, i = !0, n = t.distance, r = t.direction, s = t.deltaX, o = t.deltaY;
                    return r & e.direction || (e.direction & Wt ? (r = 0 === s ? Ft : s < 0 ? Lt : Xt, i = s != this.pX, n = Math.abs(t.deltaX)) : (r = 0 === o ? Ft : o < 0 ? Yt : jt, i = o != this.pY, n = Math.abs(t.deltaY))), t.direction = r, i && n > e.threshold && r & e.direction
                },
                attrTest: function (t) {
                    return rt.prototype.attrTest.call(this, t) && (this.state & ye || !(this.state & ye) && this.directionTest(t))
                },
                emit: function (t) {
                    this.pX = t.deltaX, this.pY = t.deltaY;
                    var e = it(t.direction);
                    e && (t.additionalEvent = this.options.event + e), this._super.emit.call(this, t)
                }
            }), p(ot, rt, {
                defaults: {event: "pinch", threshold: 0, pointers: 2}, getTouchAction: function () {
                    return [de]
                }, attrTest: function (t) {
                    return this._super.attrTest.call(this, t) && (Math.abs(t.scale - 1) > this.options.threshold || this.state & ye)
                }, emit: function (t) {
                    if (1 !== t.scale) {
                        var e = t.scale < 1 ? "in" : "out";
                        t.additionalEvent = this.options.event + e
                    }
                    this._super.emit.call(this, t)
                }
            }), p(at, tt, {
                defaults: {event: "press", pointers: 1, time: 251, threshold: 9},
                getTouchAction: function () {
                    return [le]
                },
                process: function (t) {
                    var e = this.options, i = t.pointers.length === e.pointers, n = t.distance < e.threshold,
                        r = t.deltaTime > e.time;
                    if (this._input = t, !n || !i || t.eventType & (kt | qt) && !r) this.reset(); else if (t.eventType & Rt) this.reset(), this._timer = u(function () {
                        this.state = be, this.tryEmit()
                    }, e.time, this); else if (t.eventType & kt) return be;
                    return Pe
                },
                reset: function () {
                    clearTimeout(this._timer)
                },
                emit: function (t) {
                    this.state === be && (t && t.eventType & kt ? this.manager.emit(this.options.event + "up", t) : (this._input.timeStamp = bt(), this.manager.emit(this.options.event, this._input)))
                }
            }), p(ut, rt, {
                defaults: {event: "rotate", threshold: 0, pointers: 2}, getTouchAction: function () {
                    return [de]
                }, attrTest: function (t) {
                    return this._super.attrTest.call(this, t) && (Math.abs(t.rotation) > this.options.threshold || this.state & ye)
                }
            }), p(ct, rt, {
                defaults: {event: "swipe", threshold: 10, velocity: .3, direction: Wt | Bt, pointers: 1},
                getTouchAction: function () {
                    return st.prototype.getTouchAction.call(this)
                },
                attrTest: function (t) {
                    var e, i = this.options.direction;
                    return i & (Wt | Bt) ? e = t.overallVelocity : i & Wt ? e = t.overallVelocityX : i & Bt && (e = t.overallVelocityY), this._super.attrTest.call(this, t) && i & t.offsetDirection && t.distance > this.options.threshold && t.maxPointers == this.options.pointers && Et(e) > this.options.velocity && t.eventType & kt
                },
                emit: function (t) {
                    var e = it(t.offsetDirection);
                    e && this.manager.emit(this.options.event + e, t), this.manager.emit(this.options.event, t)
                }
            }), p(ht, tt, {
                defaults: {
                    event: "tap",
                    pointers: 1,
                    taps: 1,
                    interval: 300,
                    time: 250,
                    threshold: 9,
                    posThreshold: 10
                }, getTouchAction: function () {
                    return [pe]
                }, process: function (t) {
                    var e = this.options, i = t.pointers.length === e.pointers, n = t.distance < e.threshold,
                        r = t.deltaTime < e.time;
                    if (this.reset(), t.eventType & Rt && 0 === this.count) return this.failTimeout();
                    if (n && r && i) {
                        if (t.eventType != kt) return this.failTimeout();
                        var s = !this.pTime || t.timeStamp - this.pTime < e.interval,
                            o = !this.pCenter || q(this.pCenter, t.center) < e.posThreshold;
                        this.pTime = t.timeStamp, this.pCenter = t.center, o && s ? this.count += 1 : this.count = 1, this._input = t;
                        var a = this.count % e.taps;
                        if (0 === a) return this.hasRequireFailures() ? (this._timer = u(function () {
                            this.state = be, this.tryEmit()
                        }, e.interval, this), ye) : be
                    }
                    return Pe
                }, failTimeout: function () {
                    return this._timer = u(function () {
                        this.state = Pe
                    }, this.options.interval, this), Pe
                }, reset: function () {
                    clearTimeout(this._timer)
                }, emit: function () {
                    this.state == be && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input))
                }
            }), lt.VERSION = "2.0.7", lt.defaults = {
                domEvents: !1,
                touchAction: he,
                enable: !0,
                inputTarget: null,
                inputClass: null,
                preset: [[ut, {enable: !1}], [ot, {enable: !1}, ["rotate"]], [ct, {direction: Wt}], [st, {direction: Wt}, ["swipe"]], [ht], [ht, {
                    event: "doubletap",
                    taps: 2
                }, ["tap"]], [at]],
                cssProps: {
                    userSelect: "none",
                    touchSelect: "none",
                    touchCallout: "none",
                    contentZooming: "none",
                    userDrag: "none",
                    tapHighlightColor: "rgba(0,0,0,0)"
                }
            };
            var Ce = 1, Ae = 2;
            pt.prototype = {
                set: function (t) {
                    return vt(this.options, t), t.touchAction && this.touchAction.update(), t.inputTarget && (this.input.destroy(), this.input.target = t.inputTarget, this.input.init()), this
                }, stop: function (t) {
                    this.session.stopped = t ? Ae : Ce
                }, recognize: function (t) {
                    var e = this.session;
                    if (!e.stopped) {
                        this.touchAction.preventDefaults(t);
                        var i, n = this.recognizers, r = e.curRecognizer;
                        (!r || r && r.state & be) && (r = e.curRecognizer = null);
                        for (var s = 0; s < n.length;) i = n[s], e.stopped === Ae || r && i != r && !i.canRecognizeWith(r) ? i.reset() : i.recognize(t), !r && i.state & (ye | Te | Ee) && (r = e.curRecognizer = i), s++
                    }
                }, get: function (t) {
                    if (t instanceof tt) return t;
                    for (var e = this.recognizers, i = 0; i < e.length; i++) if (e[i].options.event == t) return e[i];
                    return null
                }, add: function (t) {
                    if (c(t, "add", this)) return this;
                    var e = this.get(t.options.event);
                    return e && this.remove(e), this.recognizers.push(t), t.manager = this, this.touchAction.update(), t
                }, remove: function (t) {
                    if (c(t, "remove", this)) return this;
                    if (t = this.get(t)) {
                        var e = this.recognizers, i = b(e, t);
                        i !== -1 && (e.splice(i, 1), this.touchAction.update())
                    }
                    return this
                }, on: function (t, e) {
                    if (t !== a && e !== a) {
                        var i = this.handlers;
                        return h(E(t), function (t) {
                            i[t] = i[t] || [], i[t].push(e)
                        }), this
                    }
                }, off: function (t, e) {
                    if (t !== a) {
                        var i = this.handlers;
                        return h(E(t), function (t) {
                            e ? i[t] && i[t].splice(b(i[t], e), 1) : delete i[t]
                        }), this
                    }
                }, emit: function (t, e) {
                    this.options.domEvents && ft(t, e);
                    var i = this.handlers[t] && this.handlers[t].slice();
                    if (i && i.length) {
                        e.type = t, e.preventDefault = function () {
                            e.srcEvent.preventDefault()
                        };
                        for (var n = 0; n < i.length;) i[n](e), n++
                    }
                }, destroy: function () {
                    this.element && dt(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null
                }
            }, vt(lt, {
                INPUT_START: Rt,
                INPUT_MOVE: Nt,
                INPUT_END: kt,
                INPUT_CANCEL: qt,
                STATE_POSSIBLE: ge,
                STATE_BEGAN: ye,
                STATE_CHANGED: Te,
                STATE_ENDED: Ee,
                STATE_RECOGNIZED: be,
                STATE_CANCELLED: we,
                STATE_FAILED: Pe,
                DIRECTION_NONE: Ft,
                DIRECTION_LEFT: Lt,
                DIRECTION_RIGHT: Xt,
                DIRECTION_UP: Yt,
                DIRECTION_DOWN: jt,
                DIRECTION_HORIZONTAL: Wt,
                DIRECTION_VERTICAL: Bt,
                DIRECTION_ALL: Ht,
                Manager: pt,
                Input: _,
                TouchAction: J,
                TouchInput: H,
                MouseInput: Y,
                PointerEventInput: j,
                TouchMouseInput: V,
                SingleTouchInput: W,
                Recognizer: tt,
                AttrRecognizer: rt,
                Tap: ht,
                Pan: st,
                Swipe: ct,
                Pinch: ot,
                Rotate: ut,
                Press: at,
                on: m,
                off: g,
                each: h,
                merge: Pt,
                extend: wt,
                assign: vt,
                inherit: p,
                bindFn: d,
                prefixed: C
            });
            var Se = "undefined" != typeof r ? r : "undefined" != typeof self ? self : {};
            Se.Hammer = lt, n = function () {
                return lt
            }.call(e, i, e, t), !(n !== a && (t.exports = n))
        }(window, document, "Hammer")
    }, function (t, e, i) {
        t.exports = i(0)
    }])
});
//# sourceMappingURL=build.js.map