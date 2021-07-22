(window.webpackJsonp = window.webpackJsonp || []).push([[0], {
    0: function (e, t, o) {
        e.exports = o("kpGR")
    }, "3UD+": function (e) {
        e.exports = function (e) {
            if (!e.webpackPolyfill) {
                var t = Object.create(e);
                t.children || (t.children = []), Object.defineProperty(t, "loaded", {
                    enumerable: !0, get: function () {
                        return t.l
                    }
                }), Object.defineProperty(t, "id", {
                    enumerable: !0, get: function () {
                        return t.i
                    }
                }), Object.defineProperty(t, "exports", {enumerable: !0}), t.webpackPolyfill = 1
            }
            return t
        }
    }, "9odl": function (e) {
        e.exports = "#define GLSLIFY 1\nvarying vec2 vUv;\n\nuniform float time;\nuniform vec3 fogColor;\nuniform float fogNear;\nuniform float fogFar;\nuniform sampler2D texture;\nuniform float opacity;\nuniform vec3 gradientColor;\nuniform float progress;\n\nvoid main() {\n\n\tvec2 uv = vUv;\n\t// vec4 color = texture2D( texture, vUv );\n\n\tvec4 origColor = texture2D(texture, vUv);\n    float grayscaleValue = dot(origColor.rgb, vec3(0.299, 0.587, 0.114));\n\n\t// remove green\n\t// if ( origColor.r < 0.4 && origColor.b < 0.4 && origColor.g > 0.4 ) {\n\t// \torigColor.a = 0.;\n\t// }\n\n\t// if ( origColor.r < 0.9 && origColor.b < 0.9 && origColor.g > 0.9 ) {\n\t// \torigColor.a = 0.;\n\t// }\n\n\tvec4 gradientImage = mix(vec4( gradientColor, 1.0), vec4(1.0, 1.0, 1.0, 1.0), grayscaleValue);\n\n\t// if ( gradientImage.b < 0.9 ) discard;\n\n\t// gl_FragColor = origColor * opacity;\n\tgl_FragColor = mix( vec4( gradientImage.rgb, 0. ), mix( gradientImage, origColor, progress ), opacity );\n\n\t#ifdef USE_FOG\n\t\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\t\tfloat depth = gl_FragDepthEXT / gl_FragCoord.w;\n\t\t#else\n\t\t\tfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n\t\t#endif\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n\t\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n\t#endif\n\n}"
    }, Li5z: function (e) {
        e.exports = "#define GLSLIFY 1\nvarying vec2 vUv;\n\nuniform float time;\n\nvoid main () {\n\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1 );\n\n}"
    }, P3Nu: function (e, t) {
        var o, i, n = Math.abs, a = function (e) {
            var t = {
                addEvent: function (e, t, o, i) {
                    e.addEventListener ? e.addEventListener(t, o, !1) : e.attachEvent && (e["e" + t + o] = o, e[t + o] = function () {
                        e["e" + t + o](window.event, i)
                    }, e.attachEvent("on" + t, e[t + o]))
                }, removeEvent: function (e, t, o) {
                    e.removeEventListener ? e.removeEventListener(t, o) : e.attachEvent && e.detachEvent(t)
                }, input: "", pattern: "38384040373937396665", keydownHandler: function (o, e) {
                    if (e && (t = e), t.input += o ? o.keyCode : event.keyCode, t.input.length > t.pattern.length && (t.input = t.input.substr(t.input.length - t.pattern.length)), t.input === t.pattern) return t.code(t._currentLink), t.input = "", o.preventDefault(), !1
                }, load: function (e) {
                    this._currentLink = e, this.addEvent(document, "keydown", this.keydownHandler, this), this.iphone.load(e)
                }, unload: function () {
                    this.removeEvent(document, "keydown", this.keydownHandler), this.iphone.unload()
                }, code: function (e) {
                    window.location = e
                }, iphone: {
                    start_x: 0,
                    start_y: 0,
                    stop_x: 0,
                    stop_y: 0,
                    tap: !1,
                    capture: !1,
                    orig_keys: "",
                    keys: ["UP", "UP", "DOWN", "DOWN", "LEFT", "RIGHT", "LEFT", "RIGHT", "TAP", "TAP"],
                    input: [],
                    code: function (e) {
                        t.code(e)
                    },
                    touchmoveHandler: function (o) {
                        if (1 === o.touches.length && !0 === t.iphone.capture) {
                            var e = o.touches[0];
                            t.iphone.stop_x = e.pageX, t.iphone.stop_y = e.pageY, t.iphone.tap = !1, t.iphone.capture = !1, t.iphone.check_direction()
                        }
                    },
                    touchendHandler: function () {
                        if (t.iphone.input.push(t.iphone.check_direction()), t.iphone.input.length > t.iphone.keys.length && t.iphone.input.shift(), t.iphone.input.length === t.iphone.keys.length) {
                            for (var e = !0, o = 0; o < t.iphone.keys.length; o++) t.iphone.input[o] !== t.iphone.keys[o] && (e = !1);
                            e && t.iphone.code(t._currentLink)
                        }
                    },
                    touchstartHandler: function (o) {
                        t.iphone.start_x = o.changedTouches[0].pageX, t.iphone.start_y = o.changedTouches[0].pageY, t.iphone.tap = !0, t.iphone.capture = !0
                    },
                    load: function () {
                        this.orig_keys = this.keys, t.addEvent(document, "touchmove", this.touchmoveHandler), t.addEvent(document, "touchend", this.touchendHandler, !1), t.addEvent(document, "touchstart", this.touchstartHandler)
                    },
                    unload: function () {
                        t.removeEvent(document, "touchmove", this.touchmoveHandler), t.removeEvent(document, "touchend", this.touchendHandler), t.removeEvent(document, "touchstart", this.touchstartHandler)
                    },
                    check_direction: function () {
                        return x_magnitude = n(this.start_x - this.stop_x), y_magnitude = n(this.start_y - this.stop_y), x = 0 > this.start_x - this.stop_x ? "RIGHT" : "LEFT", y = 0 > this.start_y - this.stop_y ? "DOWN" : "UP", result = x_magnitude > y_magnitude ? x : y, result = !0 === this.tap ? "TAP" : result, result
                    }
                }
            };
            return "string" == typeof e && t.load(e), "function" == typeof e && (t.code = e, t.load()), t
        };
        "undefined" == typeof e.exports ? (o = [], i = function () {
            return a
        }.apply(t, o), !(void 0 !== i && (e.exports = i))) : e.exports = a
    }, WQPq: function () {
    }, kpGR: function (e, t, o) {
        "use strict";

        function i(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function n(e, t) {
            for (var o, n = 0; n < t.length; n++) o = t[n], o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
        }

        function a(e, t, o) {
            return t && n(e.prototype, t), o && n(e, o), e
        }

        function r(e) {
            return r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }, r(e)
        }

        function s(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function l(e, t) {
            for (var o, n = 0; n < t.length; n++) o = t[n], o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
        }

        function c(e, t, o) {
            return t && l(e.prototype, t), o && l(e, o), e
        }

        function p(e, t) {
            return t && ("object" === r(t) || "function" == typeof t) ? t : g(e)
        }

        function m(e) {
            return m = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            }, m(e)
        }

        function d(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), t && u(e, t)
        }

        function u(e, t) {
            return u = Object.setPrototypeOf || function (e, t) {
                return e.__proto__ = t, e
            }, u(e, t)
        }

        function g(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }

        function h(e) {
            return h = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }, h(e)
        }

        function f(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function b(e, t) {
            for (var o, n = 0; n < t.length; n++) o = t[n], o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
        }

        function v(e, t, o) {
            return t && b(e.prototype, t), o && b(e, o), e
        }

        function k(e, t) {
            return t && ("object" === h(t) || "function" == typeof t) ? t : _(e)
        }

        function w(e) {
            return w = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            }, w(e)
        }

        function C(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), t && E(e, t)
        }

        function E(e, t) {
            return E = Object.setPrototypeOf || function (e, t) {
                return e.__proto__ = t, e
            }, E(e, t)
        }

        function _(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }

        function S(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function T(e, t) {
            for (var o, n = 0; n < t.length; n++) o = t[n], o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
        }

        function M(e, t, o) {
            return t && T(e.prototype, t), o && T(e, o), e
        }

        var P = Math.PI, z = Math.floor, O = Math.max, j = Math.abs;
        o.r(t);
        var L = o("WQPq"), I = o("IT9u"), D = o("E3/K"), W = o("cuij"), F = o("BR65"), A = o("+8Os"), B = o("D10d"),
            H = o("LxkE"), U = o("3+m9"), Y = o("TnI4"), G = o("qdxW"), X = o("AIox"), R = o("/V9W"), N = o("brnI"),
            V = o("Ncdj"), q = o("XPv6"), J = o("z/o8");

        class K {
            constructor(e, t) {
                t = Object.assign({}, K.defaults, t), this.element = e, this.opts = t, this.touchStartX = null, this.touchStartY = null, this.touchEndX = null, this.touchEndY = null, this.velocityX = null, this.velocityY = null, this.longPressTimer = null, this.doubleTapWaiting = !1, this.handlers = {
                    panstart: [],
                    panmove: [],
                    panend: [],
                    swipeleft: [],
                    swiperight: [],
                    swipeup: [],
                    swipedown: [],
                    tap: [],
                    doubletap: [],
                    longpress: []
                }, this._onTouchStart = this.onTouchStart.bind(this), this._onTouchMove = this.onTouchMove.bind(this), this._onTouchEnd = this.onTouchEnd.bind(this), this.element.addEventListener("touchstart", this._onTouchStart, Q), this.element.addEventListener("touchmove", this._onTouchMove, Q), this.element.addEventListener("touchend", this._onTouchEnd, Q), this.opts.mouseSupport && !("ontouchstart" in window) && (this.element.addEventListener("mousedown", this._onTouchStart, Q), document.addEventListener("mousemove", this._onTouchMove, Q), document.addEventListener("mouseup", this._onTouchEnd, Q))
            }

            destroy() {
                this.element.removeEventListener("touchstart", this._onTouchStart), this.element.removeEventListener("touchmove", this._onTouchMove), this.element.removeEventListener("touchend", this._onTouchEnd), this.element.removeEventListener("mousedown", this._onTouchStart), document.removeEventListener("mousemove", this._onTouchMove), document.removeEventListener("mouseup", this._onTouchEnd), clearTimeout(this.longPressTimer), clearTimeout(this.doubleTapTimer)
            }

            on(e, t) {
                if (this.handlers[e]) return this.handlers[e].push(t), {type: e, fn: t, cancel: () => this.off(e, t)}
            }

            off(e, t) {
                if (this.handlers[e]) {
                    const o = this.handlers[e].indexOf(t);
                    -1 !== o && this.handlers[e].splice(o, 1)
                }
            }

            fire(e, t) {
                for (let o = 0; o < this.handlers[e].length; o++) this.handlers[e][o](t)
            }

            onTouchStart(e) {
                this.thresholdX = this.opts.threshold("x", this), this.thresholdY = this.opts.threshold("y", this), this.disregardVelocityThresholdX = this.opts.disregardVelocityThreshold("x", this), this.disregardVelocityThresholdY = this.opts.disregardVelocityThreshold("y", this), this.touchStartX = "mousedown" === e.type ? e.screenX : e.changedTouches[0].screenX, this.touchStartY = "mousedown" === e.type ? e.screenY : e.changedTouches[0].screenY, this.touchMoveX = null, this.touchMoveY = null, this.touchEndX = null, this.touchEndY = null, this.longPressTimer = setTimeout(() => this.fire("longpress", e), this.opts.longPressTime), this.fire("panstart", e)
            }

            onTouchMove(e) {
                if ("mousemove" !== e.type || this.touchStartX && null === this.touchEndX) {
                    const t = ("mousemove" === e.type ? e.screenX : e.changedTouches[0].screenX) - this.touchStartX;
                    this.velocityX = t - this.touchMoveX, this.touchMoveX = t;
                    const o = ("mousemove" === e.type ? e.screenY : e.changedTouches[0].screenY) - this.touchStartY;
                    this.velocityY = o - this.touchMoveY, this.touchMoveY = o;
                    const i = j(this.touchMoveX), n = j(this.touchMoveY);
                    this.swipingHorizontal = i > this.thresholdX, this.swipingVertical = n > this.thresholdY, this.swipingDirection = i > n ? this.swipingHorizontal ? "horizontal" : "pre-horizontal" : this.swipingVertical ? "vertical" : "pre-vertical", O(i, n) > this.opts.pressThreshold && clearTimeout(this.longPressTimer), this.fire("panmove", e)
                }
            }

            onTouchEnd(e) {
                if ("mouseup" !== e.type || this.touchStartX && null === this.touchEndX) {
                    this.touchEndX = "mouseup" === e.type ? e.screenX : e.changedTouches[0].screenX, this.touchEndY = "mouseup" === e.type ? e.screenY : e.changedTouches[0].screenY, this.fire("panend", e), clearTimeout(this.longPressTimer);
                    const t = this.touchEndX - this.touchStartX, o = j(t), i = this.touchEndY - this.touchStartY,
                        n = j(i);
                    o > this.thresholdX || n > this.thresholdY ? (this.swipedHorizontal = this.opts.diagonalSwipes ? j(t / i) <= this.opts.diagonalLimit : o >= n && o > this.thresholdX, this.swipedVertical = this.opts.diagonalSwipes ? j(i / t) <= this.opts.diagonalLimit : n > o && n > this.thresholdY, this.swipedHorizontal && (0 > t ? (this.velocityX < -this.opts.velocityThreshold || t < -this.disregardVelocityThresholdX) && this.fire("swipeleft", e) : (this.velocityX > this.opts.velocityThreshold || t > this.disregardVelocityThresholdX) && this.fire("swiperight", e)), this.swipedVertical && (0 > i ? (this.velocityY < -this.opts.velocityThreshold || i < -this.disregardVelocityThresholdY) && this.fire("swipeup", e) : (this.velocityY > this.opts.velocityThreshold || i > this.disregardVelocityThresholdY) && this.fire("swipedown", e))) : o < this.opts.pressThreshold && n < this.opts.pressThreshold && (this.doubleTapWaiting ? (this.doubleTapWaiting = !1, clearTimeout(this.doubleTapTimer), this.fire("doubletap", e)) : (this.doubleTapWaiting = !0, this.doubleTapTimer = setTimeout(() => this.doubleTapWaiting = !1, this.opts.doubleTapTime), this.fire("tap", e)))
                }
            }
        }

        K.defaults = {
            threshold: (e) => O(25, z(.15 * ("x" === e ? window.innerWidth || document.body.clientWidth : window.innerHeight || document.body.clientHeight))),
            velocityThreshold: 10,
            disregardVelocityThreshold: (e, t) => z(.5 * ("x" === e ? t.element.clientWidth : t.element.clientHeight)),
            pressThreshold: 8,
            diagonalSwipes: !1,
            diagonalLimit: Math.tan(45 * 1.5 / 180 * P),
            longPressTime: 500,
            doubleTapTime: 300,
            mouseSupport: !0
        };
        let Q = !1;
        try {
            window.addEventListener("test", null, Object.defineProperty({}, "passive", {
                get: function () {
                    Q = {passive: !0}
                }
            }))
        } catch (e) {
        }
        var Z = o("xC2a"), $ = o("EpSA"), ee = o("e/Nn"), te = o("6deg"), oe = function (e, t) {
            var o = e.length, i = 0;
            return Promise.all(e.map(function (e) {
                return e.then(function () {
                    i++, t(i, o)
                }).catch(function (e) {
                    console.log(e)
                }), e
            }))
        }, ie = function () {
            function e(t) {
                i(this, e), this.isMobile = t, this.assets = {
                    textures: {},
                    fonts: {}
                }, this.assetList = {}, this.renderer = null, this.progressEl = document.querySelector(".progress-percent"), this.progressBar = document.querySelector(".progress-circle .line"), this.videosToLoad = 0
            }

            return a(e, [{
                key: "load", value: function (e, t) {
                    var o = this;
                    this.assetList = e, this.renderer = t;
                    var n = [], a = new Z.a;
                    a.crossOrigin = "";
                    var r = !0, s = function (e) {
                        o.assetList[e].forEach(function (t) {
                            if (~t.indexOf(".mp4")) {
                                var i = document.createElement("video");
                                i.style = "position:absolute;height:0", i.muted = !0, i.autoplay = !1, i.loop = !0, i.crossOrigin = "anonymous", i.setAttribute("muted", !0), i.setAttribute("webkit-playsinline", !0), i.setAttribute("playsinline", !0), i.preload = "metadata", i.src = "assets/".concat(e, "/").concat(t), document.body.appendChild(i), i.load(), n.push(new Promise(function (n) {
                                    o.videoPromise(i, e, t, n)
                                }))
                            } else n.push(new Promise(function (i) {
                                a.load("assets/".concat(e, "/").concat(t), function (n) {
                                    return o.createImageTexture(n, e, t, i)
                                })
                            }))
                        })
                    };
                    for (var l in this.assetList) s(l);
                    for (var c = new $.a, p = ["fonts/schnyder.json", "fonts/schnyder-outline.json", "fonts/suisse.json"], m = function (e) {
                        n.push(new Promise(function (t) {
                            return c.load(p[e], function (e) {
                                o.assets.fonts[e.data.familyName] = e, t()
                            })
                        }))
                    }, d = 0; d < p.length; d++) m(d);
                    return new Promise(function (e) {
                        oe(n, o.up.bind(o)).then(function () {
                            e(o.assets)
                        })
                    })
                }
            }, {
                key: "up", value: function (e, t) {
                    var o = Math.round(100 * (e / t));
                    this.progressEl.innerHTML = o + "%", this.progressBar.style.strokeDashoffset = 252.363 - 252.363 * (e / t)
                }
            }, {
                key: "videoPromise", value: function (e, t, o, i, n) {
                    var a = this;
                    n && e.load(), this.isMobile ? (e.onloadeddata = function () {
                        e.onerror = null, a.createVideoTexture(e, t, o, i)
                    }, e.onerror = function () {
                        e.onloadeddata = null, a.videoPromise(e, t, o, i, !0)
                    }) : e.oncanplaythrough = function () {
                        return a.createVideoTexture(e, t, o, i)
                    }
                }
            }, {
                key: "createImageTexture", value: function (e, t, o, i) {
                    var n = this;
                    if (i) e.size = new Y.a(e.image.width / 2.5, e.image.height / 2.5), e.needsUp = !0, this.renderer.setTexture2D(e, 0), e.name = "".concat(t, "/").concat(o), e.mediaType = "image", e.anisotropy = this.renderer.capabilities.getMaxAnisotropy(), this.assets.textures[t] || (this.assets.textures[t] = {}), this.assets.textures[t][o] = e, i(e); else {
                        var a = new Z.a().load("assets/".concat(t, "/").concat(o), function (e) {
                            e.size = new Y.a(e.image.width / 2.5, e.image.height / 2.5), e.needsUp = !0, n.renderer.setTexture2D(e, 0)
                        });
                        a.size = new Y.a(10, 10), a.name = "".concat(t, "/").concat(o), a.mediaType = "image", a.anisotropy = this.renderer.capabilities.getMaxAnisotropy(), this.assets.textures[t] || (this.assets.textures[t] = {}), this.assets.textures[t][o] = a
                    }
                }
            }, {
                key: "createVideoTexture", value: function (e, t, o, i) {
                    var n = new ee.a(e);
                    n.minFilter = n.magFilter = te.M, n.name = "".concat(t, "/").concat(o), n.mediaType = "video", n.anisotropy = this.renderer.capabilities.getMaxAnisotropy(), i ? (n.size = new Y.a(n.image.videoWidth / 2, n.image.videoHeight / 2), this.renderer.setTexture2D(n, 0), this.isMobile ? (e.src = "", e.load(), e.onloadeddata = null) : e.oncanplaythrough = null, i(n)) : (n.size = new Y.a(1, 1), e.oncanplaythrough = function () {
                        n.size = new Y.a(n.image.videoWidth / 2, n.image.videoHeight / 2), n.needsUp = !0, e.oncanplaythrough = null
                    }), this.assets.textures[t] || (this.assets.textures[t] = {}), this.assets.textures[t][o] = n
                }
            }]), e
        }(), ne = o("dt5g"), ae = o("9odl"), re = o.n(ae), se = o("Li5z"), le = o.n(se), ce = function (e) {
            function t() {
                var e, o = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {
                    timeline: timeline,
                    texture: texture,
                    data: data,
                    month: month,
                    itemIndex: itemIndex,
                    itemIndexTotal: itemIndexTotal
                };
                return s(this, t), e = p(this, m(t).call(this)), Object.assign(g(g(e)), o), e.create(), e
            }

            return d(t, e), c(t, [{
                key: "create", value: function () {
                    var e = this;
                    this.uniforms = {
                        time: {type: "f", value: 1},
                        fogColor: {type: "c", value: this.timeline.scene.fog.color},
                        fogNear: {type: "f", value: this.timeline.scene.fog.near},
                        fogFar: {type: "f", value: this.timeline.scene.fog.far},
                        texture: {type: "t", value: this.texture},
                        opacity: {type: "f", value: 1},
                        progress: {type: "f", value: 0},
                        gradientColor: {type: "vec3", value: new W.a(1786584)}
                    }, this.geometry = new q.b(1, 1), this.material = new ne.a({
                        uniforms: this.uniforms,
                        fragmentShader: re.a,
                        vertexShader: le.a,
                        fog: !0,
                        transparent: !0
                    }), this.mesh = new V.a(this.geometry, this.material), this.mesh.scale.set(this.texture.size.x, this.texture.size.y, 1), this.texture.onUp = function () {
                        e.mesh.scale.x !== e.texture.size.x && e.mesh.scale.y !== e.texture.size.y && (e.mesh.scale.set(e.texture.size.x, e.texture.size.y, 1), e.texture.onUp = null)
                    };
                    var t = this.itemIndexTotal % 4, o = new Y.a;
                    0 == t && o.set(-350, 350), 1 == t && o.set(350, 350), 2 == t && o.set(350, -350), 3 == t && o.set(-350, -350), this.align = t, this.position.set(o.x, o.y, -300 * this.itemIndex - 200), this.origPos = new Y.a(o.x, o.y), this.add(this.mesh), this.addCaption(this.caption), this.timeline.itemMeshes.push(this.mesh), "video" === this.texture.mediaType && this.timeline.videoItems.push(this.mesh)
                }
            }, {
                key: "addCaption", value: function () {
                    if (("" !== this.data.caption || "" !== this.data.link) && "" !== this.data.caption) {
                        var e = new N.a(this.data.caption, {
                            font: this.timeline.assets.fonts["Schnyder L"],
                            size: 18,
                            height: 0,
                            curveSegments: 4
                        }).center();
                        this.caption = new V.a(e, this.timeline.captionTextMat), this.caption.position.set(0, -this.mesh.scale.y / 2 - 50, 0), this.caption.visible = !1, this.add(this.caption)
                    }
                }
            }]), t
        }(G.a), pe = o("x3HC"), me = o.n(pe), de = function (e) {
            function t() {
                var e, o = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {
                    timeline: timeline,
                    section: section
                };
                return f(this, t), e = k(this, w(t).call(this)), Object.assign(_(_(e)), o), "intro" === e.section ? e.createIntroSection() : "end" === e.section ? e.createEndSection() : "contact" === e.section ? e.createContactSection() : e.create(), e
            }

            return C(t, e), v(t, [{
                key: "create", value: function () {
                    var e = new N.a(this.timeline.months[this.section].name, {
                        font: this.timeline.assets.fonts["Schnyder L"],
                        size: 200,
                        height: 0,
                        curveSegments: 10
                    }).center(), t = new V.a(e, this.timeline.textMat);
                    t.position.set(this.timeline.months[this.section].offset || 0, 0, 0), this.add(t)
                }
            }, {
                key: "createIntroSection", value: function () {
                    var e = new N.a("China-US Year Review ", {
                        font: this.timeline.assets.fonts["SuisseIntl-Bold"],
                        size: 60,
                        height: 0,
                        curveSegments: 4
                    }).center(), t = new V.a(e, this.timeline.textMat);
                    this.add(t);
                    var o = new N.a("2020", {
                        font: this.timeline.assets.fonts["Schnyder_Edit Outline"],
                        size: 640,
                        height: 0,
                        curveSegments: 15
                    }).center(), i = new V.a(o, this.timeline.textOutlineMat);
                    i.position.set(0, 0, -500), this.add(i);
                    var n = new X.a({map: this.timeline.assets.textures.intro["img.png"], transparent: !0}),
                        a = new q.b(1, 1), r = new V.a(a, n);
                    r.scale.set(800, 800, 1), r.position.set(0, 0, -250), this.add(r), this.addIntroBadge()
                }
            }, {
                key: "addIntroBadge", value: function () {
                    this.badge = new G.a;
                    var e = new Z.a().load("images/circle.png");
                    e.magFilter = e.minFilter = te.M;
                    var t = new X.a({map: e, transparent: !0}), o = new q.b(1, 1);
                    this.circle = new V.a(o, t), this.circle.scale.set(200, 200, 1), this.badge.add(this.circle);
                    var i = new N.a("Begin!", {
                        font: this.timeline.assets.fonts["Schnyder L"],
                        size: 26,
                        height: 0,
                        curveSegments: 6
                    });
                    i.center();
                    var n = new V.a(i, this.timeline.textMat);
                    n.position.set(0, 0, 1), this.badge.add(n), this.badge.position.set(0, 0, 50), this.badge.position.y = 600 > this.timeline.c.size.w ? -this.timeline.c.size.h + 90 : -this.timeline.c.size.h / 2 + 90, 600 > this.timeline.c.size.w && this.badge.scale.set(1.5, 1.5, 1), this.add(this.badge)
                }
            }, {
                key: "createEndSection", value: function () {
                    var e = new N.a("Thanks for watching!", {
                        font: this.timeline.assets.fonts["SuisseIntl-Bold"],
                        size: 60,
                        height: 0,
                        curveSegments: 4
                    }).center(), t = new V.a(e, this.timeline.textMat);
                    this.add(t);
                    var o = new N.a("END", {
                        font: this.timeline.assets.fonts["Schnyder_Edit Outline"],
                        size: 580,
                        height: 0,
                        curveSegments: 15
                    }).center(), i = new V.a(o, this.timeline.textOutlineMat);
                    i.position.set(0, 0, -300), this.add(i);
                    var n = new q.b(1, 1), a = new ne.a({
                        uniforms: {
                            fogColor: {type: "c", value: this.timeline.scene.fog.color},
                            fogNear: {type: "f", value: this.timeline.scene.fog.near},
                            fogFar: {type: "f", value: this.timeline.scene.fog.far},
                            texture: {type: "t", value: this.timeline.assets.textures.end["wave.mp4"]}
                        }, fragmentShader: me.a, vertexShader: le.a, fog: !0, transparent: !0
                    }), r = new V.a(n, a);
                    r.scale.set(700, 700, 1), r.position.set(0, 0, -200), this.timeline.videoItems.push(r), this.add(r), this.addWhooshButton()
                }
            }, {
                key: "addWhooshButton", value: function () {
                    this.whoosh = new G.a;
                    var e = new Z.a().load("images/circle.png");
                    e.magFilter = e.minFilter = te.M;
                    var t = new X.a({map: e, transparent: !0, depthWrite: !1}), o = new q.b(1, 1);
                    this.circle = new V.a(o, t), this.circle.scale.set(200, 200, 1), this.whoosh.add(this.circle);
                    var i = new Z.a().load("images/arrowdown.png");
                    i.anisotropy = this.timeline.renderer.capabilities.getMaxAnisotropy(), i.magFilter = i.minFilter = te.M;
                    var n = new X.a({map: i, transparent: !0, side: te.v, depthWrite: !1}), a = new q.b(1, 1);
                    this.arrow = new V.a(a, n), this.arrow.scale.set(90, 90, 1), this.arrow.position.z = 20, this.whoosh.add(this.arrow), this.whoosh.position.set(0, -450, 50), 600 > this.timeline.c.size.w && this.whoosh.scale.set(1.5, 1.5, 1), this.add(this.whoosh)
                }
            },
                {
                key: "createContactSection", value: function () {
                    this.position.set(0, 2e3 / this.timeline.scene.scale.y, 0), this.visible = !1;
                    var e = new N.a("SAY HELLO", {
                        font: this.timeline.assets.fonts["SuisseIntl-Bold"],
                        size: 10,
                        height: 0,
                        curveSegments: 4
                    }).center(), t = new V.a(e, this.timeline.textMat);
                    t.position.set(0, 60, 0), this.add(t);
                    var o = new N.a("Let\u2019s make 2019 just as memorable with more", {
                        font: this.timeline.assets.fonts["Schnyder L"],
                        size: 30,
                        height: 0,
                        curveSegments: 6
                    }).center(), i = new V.a(o, this.timeline.contactTextMat);
                    i.position.set(0, 0, 0), this.add(i);
                    var n = new N.a("amazing talent and exciting new projects.", {
                        font: this.timeline.assets.fonts["Schnyder L"],
                        size: 30,
                        height: 0,
                        curveSegments: 6
                    }).center(), a = new V.a(n, this.timeline.contactTextMat);
                    a.position.set(0, -45, 0), this.add(a);
                    var r = new N.a("hello@craftedbygc.com", {
                        font: this.timeline.assets.fonts["Schnyder L"],
                        size: 36,
                        height: 0,
                        curveSegments: 6
                    }).center(), s = new V.a(r, this.timeline.textMat);
                    s.position.set(0, -140, 0), this.add(s);
                    var l = new V.a(new q.a(467, 1), this.timeline.linkUnderlineMat);
                    l.position.set(0, -172, 0), this.add(l), this.linkBox = new V.a(new q.a(490, 60), new X.a({
                        alphaTest: 0,
                        visible: !1
                    })), this.linkBox.position.set(0, -140, 1), this.linkBox.onClick = function () {
                        window.open("mailto:hello@craftedbygc.com", "_blank")
                    }, this.add(this.linkBox)
                }
            }
            ]), t
        }(G.a), ue = o("P3Nu"), ge = o.n(ue), he = {
            intro: {textColor: '#1e4a91', outlineTextColor: '#1e4a91', bgColor: "#f3eadb", tintColor:'#1e4a91' },
            jan: {name: "JANUARY", textColor: 16240510, bgColor: '#323d4f', tintColor: '#323d4f'},
            feb: {name: "FEBRUARY",textColor: 16259846, bgColor: 15921906, tintColor: 10658466, contactColor: 2039583, offset: -80},
            mar: {name: "MARCH", textColor: 1786584, bgColor: 15913161, tintColor: 1786584, contactColor: 1648473},
            apr: {name: "APRIL", textColor: 16230672, bgColor: 5347496, tintColor: 3961988, offset: 35},
            may: {name: "MAY", textColor: '#566187', bgColor: '#bdaecf', tintColor: '#90485c'},
            jun: {name: "JUNE", textColor: 16175858, bgColor: 2646612, tintColor: 3694933},
            jul: {name: "JULY", textColor: 13270640, bgColor: 4344933, tintColor: 4476003},
            aug: {name: "AUGUST", textColor: 1469473, bgColor: '#e49f74', tintColor: 1469473, contactColor: 7626057},
            sep: {name: "SEPTEMBER", textColor: 5969235, bgColor: 16629650, tintColor: 5969235},
            oct: {name: "OCTOBER", textColor: 3618862, bgColor: 16424448, tintColor: 3618864},
            nov: {name: "NOVEMBER", textColor: 12342, bgColor: 2656148, tintColor: 4621970},
            dec: {name: "DECEMBER", textColor: '#1d2c39', bgColor: '#587c66', tintColor: '#587c66' },
            end: {textColor: '#597364', outlineTextColor: '#dccdcd', bgColor: '#dccdcd', tintColor: '#dccdcd'}
        }, fe = {
            jan: ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png', '10.png', '11.png', '12.png', '13.png', '14.png', '15.png'],
            feb: ['16.png', '17.png', '18.png', '19.png', '20.png', '21.png', '22.png', '23.png'],
            mar: ['24.png', '25.png'],
            apr: ['26.png', '27.png','28.png'],
            may: ['29.png', '30.png', '31.png', '32.png', '33.png', '34.png', '35.png', '36.png', '37.png'],
            jun: ['39.png', '40.png', '42.png', '43.png', '44.png', '45.png', '46.png'],
            jul: ['47.png', '48.png', '49.png', '50.png', '51.png', '52.png', '53.png', '54.png', '55.png', '56.png', '57.png', '58.png', '59.png', '60.png', '61.png', '62.png', '63.png', '64.png', '65.png'],
            aug: ['66.png', '67.png', '68.png', '69.png', '70.png', '71.png', '72.png', '73.png', '74.png', '75.png', '76.png', '77.png'],
            sep: ['80.png', '81.png', '82.png', '83.png', '84.png', '86.png', '87.png'],
            oct: ['91.png', '92.png', '93.png', '94.png', '95.png'],
            nov: ['96.png', '98.png', '99.png', '100.png'],
            dec: ['101.png', '102.png', '103.png', '104.png', '105.png', '106.png', '107.png']
        }, be = {
                jan:  {'1.png': {caption: 'Impossible Dumplings and Beyond Buns: Will China Buy Fake Meat?', date:  '2020-01-07 00:00:00' , 'category': 'society ', source: 'nytimes', link: 'https://www.nytimes.com/2020/01/07/business/fake-pork-china.html', Emotion: -0.916666667, img_id: '1.png', Month: 'jan '}, '2.png': {caption: 'Chinese auto glass manufacturer to invest on new equipment, add more jobs in US plant', '':  '2020-01-08 00:00:00' , 'category': 'politics', source: 'chinadaily', link: 'https://www.chinadaily.com.cn/a/202012/03/WS5fc8222ba31024ad0ba996d7.html', Emotion: 0.842424242, img_id: '2.png', Month: 'jan '}, '3.png': {caption: 'Chinese Roast Pork on Garlic Bread: What More Could You Want?', '':  '2020-01-15 00:00:00' , 'category': 'society ', source: 'nytimes', link: 'https://www.nytimes.com/2020/01/15/magazine/chinese-roast-pork-garlic-bread-recipe.html', Emotion: 0.85, img_id: '3.png', Month: 'jan '}, '4.png': {caption: 'Trump Gets His Trade Deal, China Gets the Win', '':  '2020-01-15 00:00:00' , 'category': 'business  ', source: 'nytimes', link: 'https://www.nytimes.com/2020/01/15/opinion/china-trade-deal-trump.html', Emotion: 0.96, img_id: '4.png', Month: 'jan '}, '5.png': {caption: 'A Maine Paper Mill¡¯s Unexpected Savior: China', '':  '2020-01-15 00:00:00' , 'category': 'business  ', source: 'nytimes', link: 'https://www.nytimes.com/2020/01/15/us/maine-mill-china.html', Emotion: 0.82, img_id: '5.png', Month: 'jan '}, '6.png': {caption: 'Trump Signs China Trade Deal, Putting Economic Conflict on Pause', '':  '2020-01-15 00:00:00' , 'category': 'politics  ', source: 'nytimes', link: 'https://www.nytimes.com/2020/01/15/business/economy/china-trade-deal.html', Emotion: 0.84, img_id: '6.png', Month: 'jan '}, '7.png': {caption: 'China¡¯s Improving Economic Data Masks Deeper Problems', '':  '2020-01-16 00:00:00' , 'category': 'business ', source: 'nytimes', link: 'https://www.nytimes.com/2020/01/16/business/economy/china-economy-gdp.html', Emotion: 0.84, img_id: '7.png', Month: 'jan '}, '8.png': {caption: 'Marco Rubio: Investing in China Is Not a Good Deal', '':  '2020-01-17 00:00:00' , 'category': 'society ', source: 'nytimes', link: 'https://www.nytimes.com/2020/01/17/opinion/sunday/Marco-Rubio-China-trade-deal.html', Emotion: -0.87, img_id: '8.png', Month: 'jan '}, '9.png': {caption: 'China Poised to Buy More From U.S., at the Expense of U.S. Allies', '':  '2020-01-23 00:00:00' , 'category': 'business ', source: 'nytimes', link: 'https://www.nytimes.com/2020/01/23/business/economy/china-us-trade-deal-allies.html', Emotion: 0.9, img_id: '9.png', Month: 'jan '}, '10.png': {caption: 'China firmly opposes US defaming China-LatAm cooperation: spokesperson', '':  '2020-01-23 00:00:00' , 'category': 'politics', source: 'chinadaily', link: 'https://www.chinadaily.com.cn/a/202004/22/WS5e9fb75ca3105d50a3d1802f.html', Emotion: -0.84, img_id: '10.png', Month: 'jan '}, '11.png': {caption: 'U.S. Cracks Down on Counterfeits in a Warning Shot to China', date:  '2020-01-24 00:00:00' , 'category': 'business ', source: 'nytimes', link: 'https://www.nytimes.com/2020/01/24/us/politics/us-cracks-down-on-counterfeits-in-a-warning-shot-to-china.html', Emotion: -0.8311111109999999, img_id: '11.png', Month: 'jan '}, '12.png': {caption: '10 Injured and Community Center Damaged in Chinatown Fire', date:  '2020-01-24 00:00:00' , 'category': 'society ', source: 'nytimes', link: 'https://www.nytimes.com/2020/01/24/nyregion/chinatown-fire.html', Emotion: -0.82, img_id: '12.png', Month: 'jan '}, '13.png': {caption: 'In Coronavirus, a ¡®Battle¡¯ That Could Humble China¡¯s Strongman', date:  '2020-01-26 00:00:00' , 'category': 'covid-19', source: 'nytimes', link: 'https://www.nytimes.com/2020/01/26/world/asia/china-coronavirus-xi-jinping.html', Emotion: -0.84, img_id: '13.png', Month: 'jan '}, '14.png': {caption: 'Chinese Officials Race to Contain Anger Over Virus', date:  '2020-01-27 00:00:00' , 'category': 'covid-19', source: 'nytimes', link: 'https://www.nytimes.com/2020/01/27/world/asia/china-coronavirus-social-media.html', Emotion: -0.87, img_id: '14.png', Month: 'jan '}, '15.png': {caption: 'Coronavirus Anger Boils Over in China and Doctors Plead for Supplies', date:  '2020-01-30 00:00:00' , 'category': 'covid-19', source: 'nytimes', link: 'https://www.nytimes.com/2020/01/30/world/asia/china-coronavirus-epidemic.html', Emotion: -0.94, img_id: '15.png', Month: 'jan'}} , feb:  {'16.png': {caption: 'As China Clamps Down on Negative News, Quarantines on Land and Sea', date:  '2020-02-05 00:00:00' , 'category': 'covid-19', source: 'nytimes', link: 'https://www.nytimes.com/2020/02/05/world/asia/coronavirus-china.html', Emotion: -0.845555556, img_id: '16.png', Month: 'feb '}, '17.png': {caption: 'China¡¯s Dominance of 5G Networks Puts U.S. Economic Future at Stake, Barr Warns', date:  '2020-02-06 00:00:00' , 'category': ' tech', source: 'nytimes', link: 'https://www.nytimes.com/2020/02/06/us/politics/barr-5g.html', Emotion: 0.82, img_id: '17.png', Month: 'feb '}, '18.png': {caption: 'China Clamps Down on Coronavirus Coverage as Cases Surge', date:  '2020-02-06 00:00:00' , 'category': 'covid-19', source: 'nytimes', link: 'https://www.nytimes.com/2020/02/05/world/asia/china-coronavirus-censorship.html', Emotion: -0.8311111109999999, img_id: '18.png', Month: 'feb '}, '19.png': {caption: 'A Grim Landmark as Official Death Toll in China Tops 1,000', date:  '2020-02-10 00:00:00' , 'category': 'covid-19', source: 'nytimes', link: 'https://www.nytimes.com/2020/02/10/world/asia/coronavirus-china.html', Emotion: -1.0, img_id: '19.png', Month: 'feb '}, '20.png': {caption: 'Coronavirus Forces Foreign Students in China to Choose: Stay or Go', date:  '2020-02-12 00:00:00' , 'category': 'covid-19', source: 'nytimes', link: 'https://www.nytimes.com/2020/02/12/world/asia/china-coronavirus-students.html', Emotion: -0.825, img_id: '20.png', Month: 'feb '}, '21.png': {caption: 'China Expels 3 Wall Street Journal Reporters as Media Relations Sour', date:  '2020-02-19 00:00:00' , 'category': 'politics', source: 'nytimes', link: 'https://www.nytimes.com/2020/02/19/business/media/china-wall-street-journal.html', Emotion: -0.83, img_id: '21.png', Month: 'feb '}, '22.png': {caption: 'US vicious attacks against China at security meeting prove futile', date:  '2020-02-21 00:00:00' , 'category': 'politics', source: 'chinadaily', link: 'https://global.chinadaily.com.cn/a/202012/09/WS5fd040f0a31024ad0ba9acc4.html', Emotion: -1.0, img_id: '22.png', Month: 'feb '}, '23.png': {caption: 'US interference in WIPO election ugly: Editorial', date:  '2020-02-27 00:00:00' , 'category': 'politics', source: 'chinadaily', link: 'https://www.chinadaily.com.cn/a/202009/07/WS5f556ebba310675eafc57cad.html', Emotion: -0.94, img_id: '23.png', Month: 'feb'}} , mar:  {'24.png': {caption: 'China Stopped Its Economy to Tackle Coronavirus. Now the World Suffers.', date:  '2020-03-02 00:00:00' , 'category': 'covid-19', source: 'nytimes', link: 'https://www.nytimes.com/2020/03/02/business/economy/china-coronavirus-economy.html', Emotion: -0.92, img_id: '24.png', Month: 'mar '}, '25.png': {caption: 'US attack on Chinese media a bad joke', date:  '2020-03-14 00:00:00' , 'category': 'politics', source: 'chinadaily', link: 'https://www.chinadaily.com.cn/a/202003/06/WS5e61ea9ea31012821727cf40.html', Emotion: -0.87, img_id: '25.png', Month: 'mar'}} , apr:  {'26.png': {caption: 'Envoy: China-US mutual support needed right now', date:  '2020-04-07 00:00:00' , 'category': 'covid-19', source: 'chinadaily', link: 'https://www.chinadaily.com.cn/a/202007/26/WS5f1fc05ca31083481725c934.html', Emotion: 0.857142857, img_id: '26.png', Month: 'apr '}, '27.png': {caption: 'China¡¯s Coronavirus Battle Is Waning. Its Propaganda Fight Is Not.', date:  '2020-04-08 00:00:00' , 'category': 'covid-19', source: 'nytimes', link: 'https://www.nytimes.com/2020/04/08/world/asia/coronavirus-china-narrative.html', Emotion: -0.82, img_id: '27.png', Month: 'apr '}, '28.png': {caption: 'With Selective Coronavirus Coverage, China Builds a Culture of Hate', date:  '2020-04-22 00:00:00' , 'category': 'covid-19', source: 'nytimes', link: 'https://www.nytimes.com/2020/04/22/business/china-coronavirus-propaganda.html', Emotion: -0.96, img_id: '28.png', Month: 'apr'}} , may:  {'29.png': {caption: 'Some Trump Officials Take Harder Actions on China During Pandemic', date:  '2020-05-01 00:00:00' , 'category': 'covid-19', source: 'nytimes', link: 'https://www.nytimes.com/2020/05/01/us/politics/coronavirus-china-trump.html', Emotion: -0.82, img_id: '29.png', Month: 'may '}, '30.png': {caption: 'US stocks rise in early trading', date:  '2020-05-05 00:00:00' , 'category': 'business ', source: 'chinadaily', link: 'https://global.chinadaily.com.cn/a/202007/10/WS5f07a8b1a31083481725870c.html', Emotion: 0.82, img_id: '30.png', Month: 'may '}, '31.png': {caption: 'China-US discussion on trade called positive sign', date:  '2020-05-09 00:00:00' , 'category': 'business ', source: 'chinadaily', link: 'https://global.chinadaily.com.cn/a/202005/19/WS5ec37555a310a8b241156c15.html', Emotion: 0.845454545, img_id: '31.png', Month: 'may '}, '32.png': {caption: "US politicians' accusations against China show sick and twisted mind", date:  '2020-05-12 00:00:00' , 'category': 'politics', source: 'chinadaily', link: 'https://www.chinadaily.com.cn/a/202008/17/WS5f3a1619a310834817260c5c.html', Emotion: -0.921428571, img_id: '32.png', Month: 'may '}, '33.png': {caption: 'U.S. and China Trade Coronavirus Accusations, Sparking Fears of a New Cold War', date:  '2020-05-15 00:00:00' , 'category': 'covid-19', source: 'nytimes', link: 'https://www.nytimes.com/2020/05/15/world/coronavirus-news.html', Emotion: -0.846363636, img_id: '33.png', Month: 'may '}, '34.png': {caption: 'Experts urge US to put end to blame game', date:  '2020-05-18 00:00:00' , 'category': 'politics', source: 'chinadaily', link: 'https://www.chinadaily.com.cn/a/202006/28/WS5ef80641a310834817255899.html', Emotion: -0.88, img_id: '34.png', Month: 'may '}, '35.png': {caption: 'As Coronavirus Keeps the West at Bay, China Moves to Tame Hong Kong', date:  '2020-05-22 00:00:00' , 'category': 'politics', source: 'nytimes', link: 'https://www.nytimes.com/2020/05/22/business/china-hong-kong-national-security.html', Emotion: -0.843333333, img_id: '35.png', Month: 'may '}, '36.png': {caption: 'Light still shines for improved China-US ties', date:  '2020-05-22 00:00:00' , 'category': 'politics', source: 'chinadaily', link: 'https://www.chinadaily.com.cn/a/202007/22/WS5f17f229a31083481725b5da.html', Emotion: 0.88, img_id: '36.png', Month: 'may '}, '37.png': {caption: 'US entrepreneur tastes success in Sichuan', date:  '2020-05-24 00:00:00' , 'category': 'business ', source: 'chinadaily', link: 'https://epaper.chinadaily.com.cn/a/202003/30/WS5e813c21a310a2fabb7a3468.html', Emotion: 0.86, img_id: '37.png', Month: 'may '}, '38.png': {caption: "Pandemic unlikely to 'bring jobs back' to US, as Trump promised", date:  '2020-05-29 00:00:00' , 'category': 'society', source: 'chinadaily', link: 'https://epaper.chinadaily.com.cn/a/202008/25/WS5f4463f2a31003221e3643a3.html', Emotion: -0.85, img_id: '38.png', Month: 'may'}} , jun:  {'39.png': {caption: 'Protests in the US are taking a dangerous turn', date:  '2020-06-01 00:00:00' , 'category': 'society', source: 'chinadaily', link: 'https://global.chinadaily.com.cn/a/202004/09/WS5e8e974da310e232631a4fd0.html', Emotion: -0.92, img_id: '39.png', Month: 'jun '}, '40.png': {caption: '¡®We Need Help¡¯: Coronavirus Fuels Racism Against Black Americans in China', date:  '2020-06-02 00:00:00' , 'category': 'covid-19', source: 'nytimes', link: 'https://www.nytimes.com/2020/06/02/us/politics/african-americans-china-coronavirus.html', Emotion: -0.833333333, img_id: '40.png', Month: 'jun '}, '41.png': {caption: "US' poor record on freedom exposes its hypocrisy of criticism", date:  '2020-06-05 00:00:00' , 'category': 'politics', source: 'chinadaily', link: 'https://www.chinadaily.com.cn/a/202001/03/WS5e0ea543a310cf3e35582444.html', Emotion: -0.88, img_id: '41.png', Month: 'jun '}, '42.png': {caption: 'U.S. Designates Four More Chinese News Organizations as Foreign Missions', date:  '2020-06-22 00:00:00' , 'category': 'politics', source: 'nytimes', link: 'https://www.nytimes.com/2020/06/22/us/politics/us-china-news-organizations.html', Emotion: 0.825, img_id: '42.png', Month: 'jun '}, '43.png': {caption: 'Stocks Rise After Trump Reaffirms China Trade Deal: Live Updates', date:  '2020-06-23 00:00:00' , 'category': 'business', source: 'nytimes', link: 'https://www.nytimes.com/2020/06/23/business/stock-market-today-coronavirus.html', Emotion: 0.827272727, img_id: '43.png', Month: 'jun '}, '44.png': {caption: 'China¡¯s Military Provokes Its Neighbors, but the Message Is for the United States', date:  '2020-06-26 00:00:00' , 'category': 'military', source: 'nytimes', link: 'https://www.nytimes.com/2020/06/26/international-home/china-military-india-taiwan.html', Emotion: -0.82, img_id: '44.png', Month: 'jun '}, '45.png': {caption: "US attempts to escape 'shutdown economy' with flawed, unequal policy", date:  '2020-06-30 00:00:00' , 'category': 'business ', source: 'chinadaily', link: 'https://www.chinadaily.com.cn/a/202006/23/WS5ef13f5ba310834817254ba1.html', Emotion: -0.9, img_id: '45.png', Month: 'jun '}, '46.png': {caption: 'A New Superpower Competition Between Beijing and Washington: China¡¯s Nuclear Buildup', date:  '2020-06-30 00:00:00' , 'category': 'politics', source: 'nytimes', link: 'https://www.nytimes.com/2020/06/30/us/politics/trump-russia-china-nuclear.html', Emotion: 0.827272727, img_id: '46.png', Month: 'jun'}} , jul:  {'47.png': {caption: 'With Beijing¡¯s Military Nearby, U.S. Sends 2 Aircraft Carriers to South China Sea', date:  '2020-07-04 00:00:00' , 'category': 'military', source: 'nytimes', link: 'https://www.nytimes.com/2020/07/04/us/politics/south-china-sea-aircraft-carrier.html', Emotion: -0.82, img_id: '47.png', Month: 'jul '}, '48.png': {caption: "HKSAR gov't firmly rejects US consul-general's remarks on national security law: spokesman", date:  '2020-07-07 00:00:00' , 'category': 'politics', source: 'chinadaily', link: 'https://www.chinadaily.com.cn/a/202008/13/WS5f34b638a310834817260183.html', Emotion: -0.84, img_id: '48.png', Month: 'jul '}, '49.png': {caption: 'US university leaders slam Trump policy on foreign students', date:  '2020-07-09 00:00:00' , 'category': 'politics', source: 'chinadaily', link: 'https://global.chinadaily.com.cn/a/202008/27/WS5f47a5cea310675eafc55f2d.html', Emotion: -0.825, img_id: '49.png', Month: 'jul '}, '50.png': {caption: "Serious Discrimination Against and Cruel Treatment of Immigrants Fully Expose Hypocrisy of 'US-Style Human Rights'", date:  '2020-07-10 00:00:00' , 'category': 'society', source: 'chinadaily', link: 'https://www.chinadaily.com.cn/a/202011/26/WS5fbf965ba31024ad0ba96b7b.html', Emotion: -0.8888888890000001, img_id: '50.png', Month: 'jul '}, '51.png': {caption: 'Caught in ¡®Ideological Spiral,¡¯ U.S. and China Drift Toward Cold War', date:  '2020-07-14 00:00:00' , 'category': 'politics', source: 'nytimes', link: 'https://www.nytimes.com/2020/07/14/world/asia/cold-war-china-us.html', Emotion: -0.92, img_id: '51.png', Month: 'jul '}, '52.png': {caption: 'Kicked Out of China, and Other Real-Life Costs of a Geopolitical Meltdown', date:  '2020-07-16 00:00:00' , 'category': 'society', source: 'nytimes', link: 'https://www.nytimes.com/2020/07/16/opinion/sunday/china-us-cold-war.html', Emotion: -0.825, img_id: '52.png', Month: 'jul '}, '53.png': {caption: "US clings to 'Cold War mentality' against China, geopolitical scholar says", date:  '2020-07-17 00:00:00' , 'category': 'politics', source: 'chinadaily', link: 'https://www.chinadaily.com.cn/a/202010/19/WS5f8d90ada31024ad0ba7fa2a.html', Emotion: -0.92, img_id: '53.png', Month: 'jul '}, '54.png': {caption: 'Pompeo Praises Britain for Getting Tough on China', date:  '2020-07-21 00:00:00' , 'category': 'politics', source: 'nytimes', link: 'https://www.nytimes.com/2020/07/21/world/europe/mike-pompeo-boris-johnson-china.html', Emotion: -0.877777778, img_id: '54.png', Month: 'jul '}, '55.png': {caption: 'How the Cold War Between China and U.S. Is Intensifying', date:  '2020-07-22 00:00:00' , 'category': 'society', source: 'nytimes', link: 'https://www.nytimes.com/2020/07/22/world/asia/us-china-cold-war.html', Emotion: -0.92, img_id: '55.png', Month: 'jul '}, '56.png': {caption: 'Accuse, Evict, Repeat: Why Punishing China and Russia for Cyberattacks Fails', date:  '2020-07-22 00:00:00' , 'category': 'culture', source: 'nytimes', link: 'https://www.nytimes.com/2020/07/22/us/politics/china-russia-trump-cyberattacks.html', Emotion: -0.9, img_id: '56.png', Month: 'jul '}, '57.png': {caption: "China's countermeasure an alert for US to stop 'cold war'", date:  '2020-07-24 00:00:00' , 'category': 'politics', source: 'chinadaily', link: 'https://global.chinadaily.com.cn/a/202004/01/WS5e84060aa310128217283992.html', Emotion: -0.92, img_id: '57.png', Month: 'jul '}, '58.png': {caption: 'U.S. Warns Russia, China and Iran Are Trying to Interfere in the Election. Democrats Say It¡¯s Far Worse.', date:  '2020-07-24 00:00:00' , 'category': 'politics', source: 'nytimes', link: 'https://www.nytimes.com/2020/07/24/us/politics/election-interference-russia-china-iran.html', Emotion: -0.83, img_id: '58.png', Month: 'jul '}, '59.png': {caption: 'La Caridad 78, a Beloved Chinese-Cuban Restaurant, Closes', date:  '2020-07-24 00:00:00' , 'category': 'business', source: 'nytimes', link: 'https://www.nytimes.com/2020/07/24/dining/la-caridad-78-closes.html', Emotion: 0.94, img_id: '59.png', Month: 'jul '}, '60.png': {caption: 'As the World Gets Tougher on China, Japan Tries to Thread a Needle', date:  '2020-07-25 00:00:00' , 'category': 'politics', source: 'nytimes', link: 'https://www.nytimes.com/2020/07/25/world/asia/japan-china-xi.html', Emotion: -0.82, img_id: '60.png', Month: 'jul '}, '61.png': {caption: 'What Would a Cold War With China Look Like?', date:  '2020-07-28 00:00:00' , 'category': 'politics', source: 'nytimes', link: 'https://www.nytimes.com/2020/07/28/opinion/trump-china.html', Emotion: -0.92, img_id: '61.png', Month: 'jul '}, '62.png': {caption: "Wang Yi: China will respond firmly to US acts of 'hegemony'", date:  '2020-07-29 00:00:00' , 'category': 'politics', source: 'chinadaily', link: 'https://www.chinadaily.com.cn/a/202005/09/WS5eb5de69a310a8b24115459c.html', Emotion: -0.84, img_id: '62.png', Month: 'jul '}, '63.png': {caption: 'US failed to spot influx of cases from Europe', date:  '2020-07-30 00:00:00' , 'category': 'covid-19', source: 'chinadaily', link: 'https://global.chinadaily.com.cn/a/202002/27/WS5e57ad11a31012821727add8.html', Emotion: -0.9, img_id: '63.png', Month: 'jul '}, '64.png': {caption: "HKSAR must brace itself for 'new Cold War' waged by US", date:  '2020-07-30 00:00:00' , 'category': 'politics', source: 'chinadaily', link: 'https://global.chinadaily.com.cn/a/202002/27/WS5e577f4da31012821727ad66.html', Emotion: -0.846363636, img_id: '64.png', Month: 'jul '}, '65.png': {caption: 'China Tries Its Favorite Economic Cure: More Construction', date:  '2020-07-30 00:00:00' , 'category': 'business', source: 'nytimes', link: 'https://www.nytimes.com/2020/07/30/business/china-economy-infrastructure.html', Emotion: 0.855, img_id: '65.png', Month: 'jul'}} , aug:  {'66.png': {caption: 'How TikTok¡¯s Owner Tried, and Failed, to Cross the U.S.-China Divide', date:  '2020-08-03 00:00:00' , 'category': 'business', source: 'nytimes', link: 'https://www.nytimes.com/2020/08/03/technology/tiktok-bytedance-us-china.html', Emotion: -0.85, img_id: '66.png', Month: 'aug '}, '67.png': {caption: 'Cabal in the Oval Office selfishly holds hostage overall US interests: China Daily editorial', date:  '2020-08-04 00:00:00' , 'category': 'politics', source: 'chinadaily', link: 'https://www.chinadaily.com.cn/a/202001/04/WS5e104bdca310cf3e3558279d.html', Emotion: -0.833333333, img_id: '67.png', Month: 'aug '}, '68.png': {caption: 'Trump Targets WeChat and TikTok, in Sharp Escalation With China', date:  '2020-08-07 00:00:00' , 'category': 'politics', source: 'nytimes', link: 'https://www.nytimes.com/2020/08/06/technology/trump-wechat-tiktok-china.html', Emotion: -0.825, img_id: '68.png', Month: 'aug '}, '69.png': {caption: 'Guokui, a Filled Chinese Flatbread, Comes to Manhattan', date:  '2020-08-11 00:00:00' , 'category': 'culture', source: 'nytimes', link: 'https://www.nytimes.com/2020/08/11/dining/nyc-restaurant-news.html', Emotion: 0.84, img_id: '69.png', Month: 'aug '}, '70.png': {caption: 'US-China rivalry may be on painful, bumpy road: FT', date:  '2020-08-14 00:00:00' , 'category': 'politics', source: 'chinadaily', link: 'https://www.chinadaily.com.cn/a/202007/02/WS5efc485ba310834817256886.html', Emotion: -0.94, img_id: '70.png', Month: 'aug '}, '71.png': {caption: 'Frailty drives US tech cold war agenda', date:  '2020-08-14 00:00:00' , 'category': 'tech', source: 'chinadaily', link: 'https://global.chinadaily.com.cn/a/202010/23/WS5f929c59a31024ad0ba809ac.html', Emotion: -0.92, img_id: '71.png', Month: 'aug '}, '72.png': {caption: "China's rebounding economy a vital refuge for US firms", date:  '2020-08-14 00:00:00' , 'category': 'business ', source: 'chinadaily', link: 'https://www.chinadaily.com.cn/a/202007/02/WS5efd3441a310834817256a5a.html', Emotion: 0.82, img_id: '72.png', Month: 'aug '}, '73.png': {caption: 'As Relations With U.S. Sink, China Tones Down ¡®Hotheaded¡¯ Nationalism', date:  '2020-08-15 00:00:00' , 'category': 'politics', source: 'nytimes', link: 'https://www.nytimes.com/2020/08/15/world/asia/china-us-nationalism.html', Emotion: -0.8311111109999999, img_id: '73.png', Month: 'aug '}, '74.png': {caption: 'Do Chinese students and employees come to the US to steal intellectual property?', date:  '2020-08-26 00:00:00' , 'category': 'culture', source: 'chinadaily', link: 'https://www.chinadaily.com.cn/a/202003/24/WS5e795c30a3101282172816d4.html', Emotion: 0.83, img_id: '74.png', Month: 'aug '}, '75.png': {caption: 'US playing dirty tricks again in the South China Sea: China Daily editorial', date:  '2020-08-27 00:00:00' , 'category': 'military', source: 'chinadaily', link: 'https://www.chinadaily.com.cn/a/202002/27/WS5e56ae86a31012821727a94d.html', Emotion: -0.86, img_id: '75.png', Month: 'aug '}, '76.png': {caption: "Clean network' proposed by US a dirty scheme", date:  '2020-08-27 00:00:00' , 'category': 'politics', source: 'chinadaily', link: 'https://epaper.chinadaily.com.cn/a/202005/26/WS5ecc4dd3a3102640f4a63764.html', Emotion: -0.823333333, img_id: '76.png', Month: 'aug '}, '77.png': {caption: 'US playing dirty tricks again in the South China Sea', date:  '2020-08-28 00:00:00' , 'category': 'military', source: 'chinadaily', link: 'https://www.chinadaily.com.cn/a/202008/19/WS5f3c6b10a310834817261274.html', Emotion: -0.92, img_id: '77.png', Month: 'aug '}, '78.png': {caption: 'With a Wary Eye on China, Taiwan Moves to Revamp Its Military', date:  '2020-08-30 00:00:00' , 'category': 'military', source: 'nytimes', link: 'https://www.nytimes.com/2020/08/30/world/asia/taiwan-china-military.html', Emotion: -0.86, img_id: '78.png', Month: 'aug'}} , sep:  {'79.png': {caption: 'In Louisiana, Love for a Chinese Restaurant and Its Magnetic Owner', date:  '2020-09-04 00:00:00' , 'category': 'society', source: 'nytimes', link: 'https://www.nytimes.com/2020/09/04/dining/lucky-palace-bossier-city-louisiana-restaurant.html', Emotion: 0.85, img_id: '79.png', Month: 'sep '}, '80.png': {caption: 'Predicted virus numbers in US reflect its predictable governance: China Daily editorial', date:  '2020-09-06 00:00:00' , 'category': 'covid-19', source: 'chinadaily', link: 'https://global.chinadaily.com.cn/a/202008/18/WS5f3bf51ea3108348172611fb.html', Emotion: -0.82, img_id: '80.png', Month: 'sep '}, '81.png': {caption: 'Predicted virus numbers in US reflect its predictable governance', date:  '2020-09-07 00:00:00' , 'category': 'covid-19', source: 'chinadaily', link: 'https://global.chinadaily.com.cn/a/202008/17/WS5f3a349aa310834817260cdc.html', Emotion: -0.84, img_id: '81.png', Month: 'sep '}, '82.png': {caption: 'Strong foundations buttress Sino-US ties, expert says', date:  '2020-09-08 00:00:00' , 'category': 'politics', source: 'chinadaily', link: 'https://www.chinadaily.com.cn/a/202004/01/WS5e83d2f0a31012821728372f.html', Emotion: 0.8866666670000001, img_id: '82.png', Month: 'sep '}, '83.png': {caption: 'TikTok ban shows US desperate to maintain hegemony', date:  '2020-09-09 00:00:00' , 'category': 'politics', source: 'chinadaily', link: 'https://www.chinadaily.com.cn/a/202004/16/WS5e984c36a3105d50a3d16c47.html', Emotion: -0.92, img_id: '83.png', Month: 'sep '}, '84.png': {caption: 'US to pay heavy price for tech bullying', date:  '2020-09-16 00:00:00' , 'category': 'tech', source: 'chinadaily', link: 'https://www.chinadaily.com.cn/a/202001/08/WS5e154922a310cf3e35583331.html', Emotion: -0.84, img_id: '84.png', Month: 'sep '}, '85.png': {caption: 'U.S. Pushes Large Arms Sale to Taiwan, Including Jet Missiles That Can Hit China', date:  '2020-09-17 00:00:00' , 'category': 'society', source: 'nytimes', link: 'https://www.nytimes.com/2020/09/17/us/politics/us-arms-sale-taiwan-china.html', Emotion: 0.8428571429999999, img_id: '85.png', Month: 'sep '}, '86.png': {caption: 'After Trump¡¯s TikTok Ban, China Readies Blacklist of Foreign Companies', date:  '2020-09-19 00:00:00' , 'category': 'society', source: 'nytimes', link: 'https://www.nytimes.com/2020/09/19/technology/china-tiktok-wechat-blacklist.html', Emotion: -0.825, img_id: '86.png', Month: 'sep '}, '87.png': {caption: 'TikTok Deal Exposes a Security Gap, and a Missing China Strategy', date:  '2020-09-21 00:00:00' , 'category': 'business', source: 'nytimes', link: 'https://www.nytimes.com/2020/09/20/us/politics/tiktok-trump-national-security.html', Emotion: -0.84, img_id: '87.png', Month: 'sep '}, '88.png': {caption: 'As China Ages, a Push to Add Elevators Offers a New Kind of Economic Relief', date:  '2020-09-23 00:00:00' , 'category': 'politics', source: 'nytimes', link: 'https://www.nytimes.com/2020/09/23/business/china-economy-elevators-aging.html', Emotion: 0.851818182, img_id: '88.png', Month: 'sep '}, '89.png': {caption: 'China Gives Unproven Covid-19 Vaccines to Thousands, With Risks Unknown', date:  '2020-09-26 00:00:00' , 'category': 'military', source: 'nytimes', link: 'https://www.nytimes.com/2020/09/26/business/china-coronavirus-vaccine.html', Emotion: -0.82, img_id: '89.png', Month: 'sep '}, '90.png': {caption: 'Japan Is Paying Firms to Make Things at Home. But China¡¯s Pull Is Still Strong.', date:  '2020-09-26 00:00:00' , 'category': 'politics', source: 'nytimes', link: 'https://www.nytimes.com/2020/09/26/business/japan-onshoring.html', Emotion: 0.8866666670000001, img_id: '90.png', Month: 'sep'}} , oct:  {'91.png': {caption: 'US cannot fulfill its dirty goals by portraying China as a threat', date:  '2020-10-09 00:00:00' , 'category': 'politics', source: 'chinadaily', link: 'https://www.chinadaily.com.cn/a/202008/07/WS5f2ca790a31083481725ec8b.html', Emotion: -0.92, img_id: '91.png', Month: 'oct '}, '92.png': {caption: 'When the U.S. and China Fight, It Is the Environment That Suffers', date:  '2020-10-12 00:00:00' , 'category': 'politics', source: 'nytimes', link: 'https://www.nytimes.com/2020/10/12/opinion/china-us-environment.html', Emotion: -0.92, img_id: '92.png', Month: 'oct '}, '93.png': {caption: 'Jimmy Kimmel Tackles Trump¡¯s Secret Chinese Bank Account', date:  '2020-10-22 00:00:00' , 'category': 'Covid-19', source: 'nytimes', link: 'https://www.nytimes.com/2020/10/22/arts/television/late-night-jimmy-kimmel-trump-china-bank-account.html', Emotion: -0.84, img_id: '93.png', Month: 'oct '}, '94.png': {caption: 'US fails to fulfill climate obligations, disturbs global progress: report', date:  '2020-10-23 00:00:00' , 'category': 'politics', source: 'chinadaily', link: 'https://global.chinadaily.com.cn/a/202002/01/WS5e34b2a2a310128217273eda.html', Emotion: -0.85, img_id: '94.png', Month: 'oct '}, '95.png': {caption: 'As China Clamps Down, Activists Flee Hong Kong for Refuge in the West', date:  '2020-10-24 00:00:00' , 'category': 'politics', source: 'nytimes', link: 'https://www.nytimes.com/2020/10/24/world/asia/hong-kong-asylum-seekers.html', Emotion: -0.8311111109999999, img_id: '95.png', Month: 'oct'}} , nov:  {'96.png': {caption: 'Why US will fail in decoupling bid', date:  '2020-11-07 00:00:00' , 'category': 'business ', source: 'chinadaily', link: 'https://global.chinadaily.com.cn/a/202012/07/WS5fcd6d4aa31024ad0ba9a06e.html', Emotion: -0.9, img_id: '96.png', Month: 'nov '}, '97.png': {caption: 'China is the latest foreign country to recognize Biden as president-elect.', date:  '2020-11-13 00:00:00' , 'category': 'Covid-19', source: 'nytimes', link: 'https://www.nytimes.com/2020/11/13/us/china-is-the-latest-foreign-country-to-recognize-biden-as-president-elect.html', Emotion: 0.8375, img_id: '97.png', Month: 'nov '}, '98.png': {caption: 'US foreign policy: Failed agenda has been built on a broken base', date:  '2020-11-17 00:00:00' , 'category': 'politics', source: 'chinadaily', link: 'https://www.chinadaily.com.cn/a/202009/08/WS5f56f515a310675eafc58364.html', Emotion: -0.89125, img_id: '98.png', Month: 'nov '}, '99.png': {caption: 'Acting tough on China will get US nowhere', date:  '2020-11-20 00:00:00' , 'category': 'politics', source: 'chinadaily', link: 'https://www.chinadaily.com.cn/a/202008/07/WS5f2c4f7ba31083481725ebb2.html', Emotion: -0.838888889, img_id: '99.png', Month: 'nov '}, '100.png': {caption: 'Experts: World will prosper from good China-US ties', date:  '2020-11-26 00:00:00' , 'category': 'politics', source: 'chinadaily', link: 'https://www.chinadaily.com.cn/a/202008/06/WS5f2bf446a31083481725eb51.html', Emotion: 0.94, img_id: '100.png', Month: 'nov'}} , dec:  {'101.png': {caption: 'China Poised to Be First to Distribute Virus Vaccine in Latin America, U.S. Official Says', date:  '2020-12-02 00:00:00' , 'category': 'covid-19', source: 'nytimes', link: 'https://www.nytimes.com/2020/12/02/us/politics/coronavirus-southern-command-china-latin-america.html', Emotion: 0.85, img_id: '101.png', Month: 'dec '}, '102.png': {caption: 'Cold War mindset a threat to Sino-US ties', date:  '2020-12-04 00:00:00' , 'category': 'politics', source: 'chinadaily', link: 'https://epaper.chinadaily.com.cn/a/202007/29/WS5f20c768a3107831ec753d5b.html', Emotion: -0.92, img_id: '102.png', Month: 'dec '}, '103.png': {caption: 'Why is the US so afraid of Chinese communists visiting the country?', date:  '2020-12-04 00:00:00' , 'category': 'politics', source: 'chinadaily', link: 'https://www.chinadaily.com.cn/a/202007/29/WS5f207beca31083481725ca81.html', Emotion: -0.86, img_id: '103.png', Month: 'dec '}, '104.png': {caption: 'Right choices vital to calm Sino-US ties', date:  '2020-12-05 00:00:00' , 'category': 'politics', source: 'chinadaily', link: 'https://epaper.chinadaily.com.cn/a/202007/29/WS5f20d144a3107831ec753dae.html', Emotion: 0.845714286, img_id: '104.png', Month: 'dec '}, '105.png': {caption: 'Freeing Meng Wanzhou is in best interests of US, China and Canada', date:  '2020-12-09 00:00:00' , 'category': 'politics', source: 'chinadaily', link: 'https://www.chinadaily.com.cn/a/202001/20/WS5e2514c2a310128217272322.html', Emotion: 1.0, img_id: '105.png', Month: 'dec '}, '106.png': {caption: 'Chinese Embassy retweets Trump¡¯s false claims of election fraud, then backtracks.', date:  '2020-12-10 00:00:00' , 'category': 'politics', source: 'nytimes', link: 'https://www.nytimes.com/2020/12/10/us/chinese-embassy-retweets-trumps-false-claims-of-election-fraud-then-backtracks.html', Emotion: -0.84, img_id: '106.png', Month: 'dec '}, '107.png': {caption: 'Healthy China-US competition urged', date:  '2020-12-16 00:00:00' , 'category': 'politics', source: 'chinadaily', link: 'https://www.chinadaily.com.cn/a/202004/16/WS5e97b818a3105d50a3d1693c.html', Emotion: 0.9, img_id: '107.png', Month: 'dec'} }
            },
            ve = function () {
            function e() {
                S(this, e), this.setConfig(), this.init(), window.assets ? (console.log("cached assets"), this.assets = window.assets, this.createTimeline()) : (this.loadAssets(), console.log("reload assets"))
            }

            var t = Math.atan;
            return M(e, [{
                key: "setConfig", value: function () {
                    this.dom = {
                        cursor: document.querySelector(".cursor"),
                        compass: document.querySelector(".compass"),
                        compassSvg: document.querySelector(".compass svg"),
                        mainSvgs: document.querySelectorAll("main :not(.compass) svg"),
                        cursorSvgs: document.querySelectorAll(".cursor svg")
                    }, this.c = {
                        dpr: 2 <= window.devicePixelRatio ? 2 : 1,
                        startTime: Date.now(),
                        size: {w: window.innerWidth, h: window.innerHeight},
                        scrollPos: 0,
                        scrolling: !1,
                        allowScrolling: !0,
                        autoMoveSpeed: 0,
                        isMobile: this.isMobile(),
                        holdingMouseDown: !1,
                        touchEnabled: "ontouchstart" in window
                    }, this.c.globalScale = Math.min(1, this.c.size.w / 1400), this.c.touchEnabled ? document.documentElement.classList.add("touch-enabled") : document.documentElement.classList.add("enable-cursor"), this.assetList = fe, this.assetList.intro = ["img.png"], this.assetList.end = ["wave.mp4"], this.assetData = be, this.timelineEntered = !1, this.activeMonth = "intro", this.months = he, this.monthPositions = {}, this.remainingMonths = [], this.enableLoader = !0, this.gyroEnabled = !1, this.orientation = {
                        gamma: 0,
                        beta: 0
                    }, this.easterEgg = this.easterEgg.bind(this), new ge.a(this.easterEgg), this.easterEggEnabled = !1, this.enableLoader || (document.querySelector(".loading").style.display = "none")
                }
            }, {
                key: "isMobile", value: function () {
                    var e = navigator.userAgent || navigator.vendor || window.opera;
                    return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(e) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0, 4))
                }
            }, {
                key: "loadAssets", value: function () {
                    var e = this, t = new ie(this.c.isMobile);
                    this.enableLoader ? setTimeout(function () {
                        t.load(e.assetList, e.renderer).then(function (t) {
                            e.assets = t, console.log("ASSETS LOADED"), e.createTimeline()
                        })
                    }, 2e3) : t.load(this.assetList, this.renderer).then(function (t) {
                        e.assets = t, console.log("ASSETS LOADED"), e.createTimeline()
                    })
                }
            }, {
                key: "init", value: function () {
                    var e = this;
                    this.renderer = new I.a({
                        antialias: !0,
                        alpha: !0
                    }), this.renderer.setPixelRatio(this.c.dpr), this.renderer.setSize(this.c.size.w, this.c.size.h), document.body.appendChild(this.renderer.domElement), this.preventPullToRefresh(), this.scene = new D.a, this.scene.background = new W.a(11454403), this.scene.fog = new F.a(11454403, 1400, 2e3), this.scene.scale.set(this.c.globalScale, this.c.globalScale, 1);
                    var o = 800, i = 180 * (2 * t(this.c.size.h / 2 / o)) / P;
                    this.camera = new A.a(i, this.c.size.w / this.c.size.h, 1, 2e3), this.camera.position.set(0, this.enableLoader ? 2e3 : 0, o), this.raycaster = new B.a, this.raycaster.near = this.camera.near, this.raycaster.far = this.camera.far, this.intersects = [], this.linkIntersect = [], this.whooshIntersects = [], this.frustum = new H.a, this.cameraViewProjectionMatrix = new U.a, this.mouse = new Y.a, this.mousePerspective = new Y.a, window.addEventListener("devicemotion", function (t) {
                        (t.rotationRate.alpha || t.rotationRate.beta || t.rotationRate.gamma) && (e.gyroEnabled = !0)
                    })
                }
            }, {
                key: "createTimeline", value: function () {
                    var e = this;
                    this.timeline = new G.a, this.scene.add(this.timeline), this.textMat = new X.a({
                        color: '#1e4a91',
                        transparent: !0
                    }), this.captionTextMat = new X.a({
                        color: '#1e4a91',
                        transparent: !0,
                        opacity: 0,
                        visible: !1
                    }), this.linkUnderlineMat = new X.a({
                        color: '#1e4a91',
                        transparent: !0,
                        opacity: 0,
                        visible: !1
                    }), this.textOutlineMat = new X.a({
                        color: '#1e4a91',
                        transparent: !0
                    }), this.contactTextMat = new X.a({color: '#1e4a91'}), this.sections = {}, this.items = {}, this.itemMeshes = [], this.videoItems = [];
                    var t = 0, o = 0, i = function (i) {
                        if (e.sections[i] = new de({timeline: timeline, section: i}), "intro" !== i && "end" !== i) {
                            var n, a = 0;
                            e.assetList[i].forEach(function (o) {
                                n = "".concat(i, "/").concat(o), e.items[n] = new ce({
                                    timeline: e,
                                    texture: e.assets.textures[i][o],
                                    data: e.assetData[i][o],
                                    month: i,
                                    itemIndex: a,
                                    itemIndexTotal: t
                                }), e.sections[i].add(e.items[n]), a++, t++
                            })
                        }
                        var r = new R.a().setFromObject(e.sections[i]);
                        e.sections[i].position.z = o, e.monthPositions[i] = o + 1100;
                        var s = 800;
                        "intro" === i && (s = 1700), "dec" === i && (s = 1800), o += r.min.z - s, e.timeline.add(e.sections[i]), "end" === i && (e.stopScrollPos = e.sections[i].position.z)
                    };
                    for (var n in this.months) i(n);
                    this.videoCount = this.videoItems.length, this.contactSection = new de({
                        timeline: timeline,
                        section: "contact"
                    }), this.contactSection.visible = !1, this.scene.add(this.contactSection), this.linkGroup = new G.a;
                    var a = new N.a("Details", {
                        font: this.assets.fonts["SuisseIntl-Bold"],
                        size: 6,
                        height: 0,
                        curveSegments: 4
                    }).center();
                    this.link = new V.a(a, this.captionTextMat), this.linkUnderline = new V.a(new q.a(45, 1), this.linkUnderlineMat), this.linkUnderline.position.set(0, -10, 0), this.linkBox = new V.a(new q.a(70, 20), new X.a({
                        alphaTest: 0,
                        visible: !1
                    })), this.linkGroup.visible = !1, this.linkGroup.add(this.link), this.linkGroup.add(this.linkUnderline), this.linkGroup.add(this.linkBox), this.scene.add(this.linkGroup), console.log("RENDER"), this.animate(), this.initCursorListeners(), this.initListeners(), document.body.classList.add("ready")
                }
            }, {
                key: "moveToStart", value: function () {
                    var e = this;
                    J.a.to(this.camera.position, 2, {y: 0, ease: "Expo.easeInOut"}), J.a.to(".loading", 2, {
                        y: "-100%",
                        ease: "Expo.easeInOut",
                        onComplete: function () {
                            document.querySelector(".loading").style.display = "none", e.timelineEntered = !0
                        }
                    }), J.a.to([".say-hello", ".logo", ".social"], 2, {
                        y: 0,
                        delay: 1,
                        ease: "Expo.easeInOut"
                    }), J.a.to([".left", ".right"], 2, {
                        x: 0,
                        delay: 1,
                        ease: "Expo.easeInOut"
                    }), this.gyroEnabled && J.a.to(this.dom.compass, 2, {y: 0, delay: 1, ease: "Expo.easeInOut"})
                }
            }, {
                key: "openItem", value: function (e) {
                    var t = this;
                    if (this.itemAnimating = !0, this.itemOpen = e, this.origTimelinePos = this.timeline.position.z, this.c.allowScrolling = !1, this.c.isMobile) {
                        var o = e.mesh.material.uniforms.texture.value;
                        "video" === o.mediaType && (o.image.src = "assets/" + o.name, o.image.play())
                    }
                    var i = this.sections[this.activeMonth].position.z;
                    e.month !== this.activeMonth && (i = this.sections[this.remainingMonths[this.remainingMonths.length - 2]].position.z), J.a.to(e.position, 1.5, {
                        x: 0,
                        y: 0,
                        ease: "Expo.easeInOut",
                        onComplete: function () {
                            t.itemAnimating = !1, t.dom.cursor.dataset.cursor = "cross"
                        }
                    }), J.a.to(e.uniforms.progress, 1.5, {
                        value: 1,
                        ease: "Expo.easeInOut"
                    }), J.a.to(this.timeline.position, 1.5, {
                        z: -(i - -e.position.z) + (.5 > this.c.globalScale ? 450 : 300),
                        ease: "Expo.easeInOut"
                    }), J.a.to(this.textMat, 1, {
                        opacity: 0, ease: "Expo.easeInOut", onComplete: function () {
                            t.textMat.visible = !1
                        }
                    }), J.a.to(this.captionTextMat, 2, {
                        opacity: 1,
                        ease: "Expo.easeInOut",
                        delay: .3,
                        onStart: function () {
                            t.captionTextMat.visible = !0
                        }
                    }), J.a.to(this.linkUnderlineMat, 2, {
                        opacity: .4,
                        ease: "Expo.easeInOut",
                        delay: .3,
                        onStart: function () {
                            t.linkUnderlineMat.visible = !0
                        }
                    }), e.caption && J.a.fromTo(e.caption.position, 2, {z: -100}, {
                        z: 0,
                        delay: .2,
                        ease: "Expo.easeInOut",
                        onStart: function () {
                            e.caption.visible = !0
                        }
                    }), e.data.link && (this.linkBox.onClick = function () {
                        window.open(e.data.link, "_blank")
                    }, this.linkGroup.position.y = e.caption ? e.caption.position.y - 40 : -e.mesh.scale.y / 2 - 50, J.a.fromTo(this.linkGroup.position, 2, {z: 0}, {
                        z: .5 > this.c.globalScale ? 450 : 300,
                        delay: .3,
                        ease: "Expo.easeInOut",
                        onStart: function () {
                            t.linkGroup.visible = !0
                        }
                    }));
                    var n = new Y.a;
                    for (var a in this.items) 0 === this.items[a].align && n.set(-700, 700), 1 === this.items[a].align && n.set(700, 700), 2 === this.items[a].align && n.set(700, -700), 3 === this.items[a].align && n.set(-700, -700), this.items[a] === e || (J.a.to(this.items[a].material.uniforms.opacity, 1.3, {
                        value: 0,
                        ease: "Expo.easeInOut"
                    }), J.a.to(this.items[a].position, 1.3, {x: n.x, y: n.y, ease: "Expo.easeInOut"}))
                }
            }, {
                key: "closeItem", value: function () {
                    var e = this;
                    if (!this.itemAnimating && this.itemOpen) {
                        if (this.itemAnimating = !0, this.dom.cursor.dataset.cursor = "pointer", this.c.isMobile) {
                            var t = this.itemOpen.mesh.material.uniforms.texture.value;
                            "video" === t.mediaType && (t.image.pause(), t.image.src = "", t.image.load())
                        }
                        for (var o in J.a.to(this.itemOpen.position, 1.5, {
                            x: this.itemOpen.origPos.x,
                            y: this.itemOpen.origPos.y,
                            ease: "Expo.easeInOut"
                        }), J.a.to(this.timeline.position, 1.5, {
                            z: this.origTimelinePos,
                            ease: "Expo.easeInOut",
                            onComplete: function () {
                                e.c.allowScrolling = !0, e.itemOpen = !1, e.itemAnimating = !1
                            }
                        }), J.a.to(this.itemOpen.uniforms.progress, 1.5, {
                            value: 0,
                            ease: "Expo.easeInOut"
                        }), J.a.to(this.textMat, 1.5, {
                            opacity: 1, ease: "Expo.easeInOut", onStart: function () {
                                e.textMat.visible = !0
                            }
                        }), J.a.to([this.captionTextMat, this.linkUnderlineMat], .4, {
                            opacity: 0,
                            ease: "Expo.easeInOut",
                            onComplete: function () {
                                e.captionTextMat.visible = !1, e.linkUnderlineMat.visible = !1, e.itemOpen.caption && (e.itemOpen.caption.visible = !1), e.linkGroup.visible = !1
                            }
                        }), this.items) this.items[o].active || (J.a.to(this.items[o].material.uniforms.opacity, 1.5, {
                            value: 1,
                            ease: "Expo.easeInOut"
                        }), J.a.to(this.items[o].position, 1.5, {
                            x: this.items[o].origPos.x,
                            y: this.items[o].origPos.y,
                            ease: "Expo.easeInOut"
                        }))
                    }
                }
            }, {
                key: "openContact", value: function (t) {
                    var e = this;
                    return t.preventDefault(), this.contactSection.isOpen ? this.closeContact() : void (this.dom.cursor.dataset.cursor = "cross", this.contactSection.visible = !0, this.contactSection.isOpen = !0, this.c.allowScrolling = !1, this.linkUnderlineMat.visible = !0, this.linkUnderlineMat.opacity = .3, J.a.to(this.camera.position, 2, {
                        y: this.contactSection.position.y * this.scene.scale.y,
                        ease: "Expo.easeInOut",
                        onComplete: function () {
                            e.timeline.visible = !1
                        }
                    }))
                }
            }, {
                key: "closeContact", value: function () {
                    var e = this;
                    this.timeline.visible = !0, this.contactSection.isOpen = !1, J.a.to(this.camera.position, 2, {
                        y: 0,
                        ease: "Expo.easeInOut",
                        onComplete: function () {
                            e.contactSection.visible = !1, e.c.allowScrolling = !0, e.linkUnderlineMat.visible = !1, e.linkUnderlineMat.opacity = 0
                        }
                    })
                }
            }, {
                key: "scroll", value: function (t) {
                    var e = function (t) {
                        return t.detail && t.wheelDelta ? t.wheelDelta / t.detail / 40 * (0 < t.detail ? 1 : -1) : t.deltaY ? -t.deltaY / 60 : t.wheelDelta / 120
                    }(t);
                    this.c.scrollPos += 60 * -e, this.c.scrolling = !0
                }
            }, {
                key: "mouseDown", value: function (t) {
                    var e = this;
                    t.preventDefault(), t.stopPropagation(), this.easterEggEnabled || (this.c.holdingMouseDown = !0, this.contactSection.isOpen ? 0 < this.linkIntersect.length ? this.linkIntersect[0].object.onClick && this.linkIntersect[0].object.onClick() : this.closeContact() : this.itemOpen ? 0 < this.linkIntersect.length ? this.linkIntersect[0].object.onClick && this.linkIntersect[0].object.onClick() : this.closeItem() : 0 < this.intersects.length ? (this.openItem(this.intersects[0].object.parent), this.dom.cursor.dataset.cursor = "cross") : this.hoveringWhoosh ? (this.c.scrolling = !0, J.a.to(this.c, 4, {
                        scrollPos: 0,
                        ease: "Expo.easeInOut",
                        onUpdate: function () {
                            e.c.scrolling = !0
                        }
                    })) : (this.dom.cursor.dataset.cursor = "move", J.a.to(this.c, .5, {delay: .7, autoMoveSpeed: 20})))
                }
            }, {
                key: "mouseUp", value: function () {
                    this.itemOpen || (this.dom.cursor.dataset.cursor = "pointer"), this.c.holdingMouseDown = !1, J.a.killTweensOf(this.c, {autoMoveSpeed: !0}), this.c.autoMoveSpeed = 0
                }
            }, {
                key: "mouseMove", value: function (t) {
                    this.mousePerspective.x = t.clientX / window.innerWidth - .5, this.mousePerspective.y = t.clientY / window.innerHeight - .5, this.updatingPerspective = !0, this.c.touchEnabled || J.a.to(".cursor", 1.5, {
                        x: t.clientX,
                        y: t.clientY,
                        ease: "Power4.easeOut"
                    }), !this.renderer || t.target !== this.renderer.domElement || this.easterEggEnabled || (this.mouse.x = 2 * (t.clientX / this.renderer.domElement.clientWidth) - 1, this.mouse.y = 2 * -(t.clientY / this.renderer.domElement.clientHeight) + 1, this.raycaster.setFromCamera(this.mouse, this.camera), !this.contactSection.isOpen && !this.itemOpen && !this.c.holdingMouseDown && ("end" === this.activeMonth ? (this.intersects = [], this.whooshIntersects = this.raycaster.intersectObjects(this.sections.end.whoosh.children), 0 < this.whooshIntersects.length ? (this.dom.cursor.dataset.cursor = "none", this.hoveringWhoosh = !0, this.sections.end.arrowTween.timeScale(2)) : this.hoveringWhoosh && (this.dom.cursor.dataset.cursor = "pointer", this.hoveringWhoosh = !1, this.sections.end.arrowTween.timeScale(1))) : (this.intersects = this.raycaster.intersectObjects(this.itemMeshes), 0 < this.intersects.length ? this.dom.cursor.dataset.cursor = "eye" : "pointer" !== this.dom.cursor.dataset.cursor && (this.dom.cursor.dataset.cursor = "pointer"))), !this.contactSection.isOpen && this.itemOpen && this.itemOpen.data.link && (this.linkIntersect = this.raycaster.intersectObject(this.linkBox), 0 < this.linkIntersect.length ? this.dom.cursor.dataset.cursor = "eye" : "cross" !== this.dom.cursor.dataset.cursor && (this.dom.cursor.dataset.cursor = "cross")), this.contactSection.isOpen && (this.linkIntersect = this.raycaster.intersectObject(this.contactSection.linkBox), 0 < this.linkIntersect.length ? this.dom.cursor.dataset.cursor = "eye" : "cross" !== this.dom.cursor.dataset.cursor && (this.dom.cursor.dataset.cursor = "cross")))
                }
            }, {
                key: "updatePerspective", value: function () {
                    J.a.to(this.camera.rotation, 4, {
                        x: .5 * -this.mousePerspective.y,
                        y: .5 * -this.mousePerspective.x,
                        ease: "Power4.easeOut"
                    }), "end" === this.activeMonth && J.a.to(this.sections.end.arrow.rotation, 4, {
                        x: -1.5 + .2 * this.mousePerspective.y,
                        y: .8 * this.mousePerspective.x,
                        ease: "Power4.easeOut"
                    }), this.updatingPerspective = !1
                }
            }, {
                key: "updateOrientation", value: function (t) {
                    this.orientation.gamma = t.gamma ? t.gamma : 0, this.orientation.beta = t.beta ? t.beta : 0, this.initialOrientation || (this.initialOrientation = {
                        gamma: this.orientation.gamma,
                        beta: this.orientation.beta
                    }), J.a.to(this.camera.rotation, 2, {
                        x: this.orientation.beta ? (this.orientation.beta - this.initialOrientation.beta) * (P / 300) : 0,
                        y: this.orientation.gamma ? (this.orientation.gamma - this.initialOrientation.gamma) * (P / 300) : 0,
                        ease: "Power4.easeOut"
                    })
                }
            }, {
                key: "resetOrientation", value: function () {
                    this.initialOrientation = {gamma: this.orientation.gamma, beta: this.orientation.beta}
                }
            }, {
                key: "changeColours", value: function () {

                    var color = {'1.png': '#3f51b5', '2.png': '#aa2e25', '3.png': '#3f51b5', '4.png': '#3f51b5', '5.png': '#3f51b5', '6.png': '#3f51b5', '7.png': '#3f51b5', '8.png': '#3f51b5', '9.png': '#3f51b5', '10.png': '#aa2e25', '11.png': '#3f51b5', '12.png': '#3f51b5', '13.png': '#3f51b5', '14.png': '#3f51b5', '15.png': '#3f51b5', '16.png': '#3f51b5', '17.png': '#3f51b5', '18.png': '#3f51b5', '19.png': '#3f51b5', '20.png': '#3f51b5', '21.png': '#3f51b5', '22.png': '#aa2e25', '23.png': '#aa2e25', '24.png': '#3f51b5', '25.png': '#aa2e25', '26.png': '#aa2e25', '27.png': '#3f51b5', '28.png': '#3f51b5', '29.png': '#3f51b5', '30.png': '#aa2e25', '31.png': '#aa2e25', '32.png': '#aa2e25', '33.png': '#3f51b5', '34.png': '#aa2e25', '35.png': '#3f51b5', '36.png': '#aa2e25', '37.png': '#aa2e25', '38.png': '#aa2e25', '39.png': '#aa2e25', '40.png': '#3f51b5', '41.png': '#aa2e25', '42.png': '#3f51b5', '43.png': '#3f51b5', '44.png': '#3f51b5', '45.png': '#aa2e25', '46.png': '#3f51b5', '47.png': '#3f51b5', '48.png': '#aa2e25', '49.png': '#aa2e25', '50.png': '#aa2e25', '51.png': '#3f51b5', '52.png': '#3f51b5', '53.png': '#aa2e25', '54.png': '#3f51b5', '55.png': '#3f51b5', '56.png': '#3f51b5', '57.png': '#aa2e25', '58.png': '#3f51b5', '59.png': '#3f51b5', '60.png': '#3f51b5', '61.png': '#3f51b5', '62.png': '#aa2e25', '63.png': '#aa2e25', '64.png': '#aa2e25', '65.png': '#3f51b5', '66.png': '#3f51b5', '67.png': '#aa2e25', '68.png': '#3f51b5', '69.png': '#3f51b5', '70.png': '#aa2e25', '71.png': '#aa2e25', '72.png': '#aa2e25', '73.png': '#3f51b5', '74.png': '#aa2e25', '75.png': '#aa2e25', '76.png': '#aa2e25', '77.png': '#aa2e25', '78.png': '#3f51b5', '79.png': '#3f51b5', '80.png': '#aa2e25', '81.png': '#aa2e25', '82.png': '#aa2e25', '83.png': '#aa2e25', '84.png': '#aa2e25', '85.png': '#3f51b5', '86.png': '#3f51b5', '87.png': '#3f51b5', '88.png': '#3f51b5', '89.png': '#3f51b5', '90.png': '#3f51b5', '91.png': '#aa2e25', '92.png': '#3f51b5', '93.png': '#3f51b5', '94.png': '#aa2e25', '95.png': '#3f51b5', '96.png': '#aa2e25', '97.png': '#3f51b5', '98.png': '#aa2e25', '99.png': '#aa2e25', '100.png': '#aa2e25', '101.png': '#3f51b5', '102.png': '#aa2e25', '103.png': '#aa2e25', '104.png': '#aa2e25', '105.png': '#aa2e25', '106.png': '#3f51b5', '107.png': '#aa2e25'}

                    var e = this, t = !!(0 < arguments.length && void 0 !== arguments[0]) && arguments[0];
                    if (this.remainingMonths = Object.keys(this.monthPositions).filter(function (t) {
                        return e.timeline.position.z > -e.monthPositions[t]
                    }), t || this.remainingMonths[this.remainingMonths.length - 1] && this.activeMonth !== this.remainingMonths[this.remainingMonths.length - 1]) {
                        this.activeMonth = t ? t : this.remainingMonths[this.remainingMonths.length - 1];
                        var o, i = new W.a(this.months[this.activeMonth].bgColor),
                            n = new W.a(this.months[this.activeMonth].textColor),
                            // a = new W.a(this.months[this.activeMonth].tintColor);
                            a = new W.a(this.months[this.activeMonth].tintColor);
                        for (var r in J.a.to([this.scene.fog.color, this.scene.background], 1, {
                            r: i.r,
                            g: i.g,
                            b: i.b,
                            ease: "Power4.easeOut"
                        }), J.a.to(this.textMat.color, 1, {
                            r: n.r,
                            g: n.g,
                            b: n.b,
                            ease: "Power4.easeOut"
                        }), J.a.set([this.captionTextMat.color, this.linkUnderlineMat.color], {
                            r: n.r,
                            g: n.g,
                            b: n.b
                        }), this.items) J.a.to(this.items[r].uniforms.gradientColor.value, 1, {
                            r: a.r,
                            g: a.g,
                            b: a.b,
                            ease: "Power4.easeOut"
                        });
                        if (this.months[this.activeMonth].outlineTextColor) {
                            var s = new W.a(this.months[this.activeMonth].outlineTextColor);
                            o = s.getHexString(), J.a.to([this.textOutlineMat.color], 1, {
                                r: s.r,
                                g: s.g,
                                b: s.b,
                                ease: "Power4.easeOut"
                            })
                        } else o = n.getHexString();
                        this.months[this.activeMonth].contactColor ? this.contactTextMat.color.set(this.months[this.activeMonth].contactColor) : this.contactTextMat.color.set(16777215), J.a.to(this.dom.mainSvgs, 1, {
                            fill: "#".concat(o),
                            ease: "Power4.easeOut"
                        }), J.a.to([this.dom.cursorSvgs, this.dom.compassSvg], 1, {
                            stroke: "#".concat(o),
                            ease: "Power4.easeOut"
                        }), J.a.to(".say-hello .underline", 1, {
                            borderBottomColor: "#".concat(o),
                            ease: "Power4.easeOut"
                        }), document.querySelector("meta[name=theme-color]").setAttribute("content", "#" + i.getHexString()), "end" !== this.activeMonth || this.sections.end.arrowTween ? this.sections.end.arrowTween && (this.sections.end.arrowTween = !1) : this.sections.end.arrowTween = J.a.to(this.sections.end.arrow.position, 1, {
                            z: 0,
                            repeat: -1,
                            yoyo: !0,
                            ease: "Power2.easeInOut"
                        })
                    }
                }
            }, {
                key: "handleVideos", value: function () {
                    this.camera.updateMatrixWorld(), this.camera.matrixWorldInverse.getInverse(this.camera.matrixWorld), this.cameraViewProjectionMatrix.multiplyMatrices(this.camera.projectionMatrix, this.camera.matrixWorldInverse), this.frustum.setFromMatrix(this.cameraViewProjectionMatrix);
                    for (var e = 0; e < this.videoCount; e++) {
                        if (this.frustum.intersectsObject(this.videoItems[e]) && this.videoItems[e].material.uniforms.texture.value.image.paused) {
                            this.videoItems[e].material.uniforms.texture.value.image.play();
                            continue
                        }
                        this.frustum.intersectsObject(this.videoItems[e]) || this.videoItems[e].material.uniforms.texture.value.image.paused || this.videoItems[e].material.uniforms.texture.value.image.pause()
                    }
                }
            }, {
                key: "animate", value: function () {
                    if (this.animationId = requestAnimationFrame(this.animate.bind(this)), !this.c.touchEnabled && this.updatingPerspective && (this.updatePerspective(), this.updatingPerspective = !1), 0 < this.c.autoMoveSpeed && (this.c.scrolling = !0, this.c.scrollPos += this.c.autoMoveSpeed), this.c.allowScrolling && this.c.scrolling) {
                        0 >= this.c.scrollPos && (this.c.scrollPos = 0), this.c.scrollPos >= -this.stopScrollPos && (this.c.scrollPos = -this.stopScrollPos);
                        var e = (this.c.scrollPos - this.timeline.position.z) / 12;
                        this.timeline.position.z += e, !this.c.isMobile && 8 > j(e) && this.handleVideos(), this.easterEggEnabled || this.changeColours(), 700 > this.timeline.position.z && J.a.set(this.sections.intro.circle.rotation, {z: "+=" + .005 * e}), this.c.scrolling = !!(.1 < j(e))
                    }
                    this.hoveringWhoosh && (this.sections.end.circle.rotation.z += .005), this.renderer.render(this.scene, this.camera)
                }
            }, {
                key: "resize", value: function () {
                    this.c.size = {
                        w: window.innerWidth,
                        h: window.innerHeight
                    }, this.camera.fov = 180 * (2 * t(this.c.size.h / 2 / this.camera.position.z)) / P, this.camera.aspect = this.c.size.w / this.c.size.h, this.camera.updateProjectionMatrix(), this.renderer.setSize(this.c.size.w, this.c.size.h)
                }
            }, {
                key: "eyeCursorElEnter", value: function () {
                    this.dom.cursor.dataset.cursor = "eye"
                }
            }, {
                key: "eyeCursorElLeave", value: function () {
                    this.dom.cursor.dataset.cursor = "pointer"
                }
            }, {
                key: "initListeners", value: function () {
                    var e = this;
                    this.resize = this.resize.bind(this), this.scroll = this.scroll.bind(this), this.mouseDown = this.mouseDown.bind(this), this.mouseUp = this.mouseUp.bind(this), this.openContact = this.openContact.bind(this), this.moveToStart = this.moveToStart.bind(this), window.addEventListener("resize", this.resize, !1), this.renderer.domElement.addEventListener("mousedown", this.mouseDown, !1), this.renderer.domElement.addEventListener("mouseup", this.mouseUp, !1), this.renderer.domElement.addEventListener("wheel", this.scroll, !1), this.gyroEnabled && (this.updateOrientation = this.updateOrientation.bind(this), this.resetOrientation = this.resetOrientation.bind(this), window.addEventListener("deviceorientation", this.updateOrientation), this.dom.compass.addEventListener("click", this.resetOrientation, !1)), document.querySelector(".say-hello").addEventListener("click", this.openContact, !1), this.enableLoader && document.querySelector(".enter").addEventListener("click", this.moveToStart, !1), this.gesture = new K(this.renderer.domElement, {mouseSupport: !1}), this.gesture.on("panmove", function () {
                        e.c.scrollPos += 6 * -e.gesture.velocityY, e.c.scrolling = !0
                    }), this.gesture.on("panend", function () {
                        return e.c.autoMoveSpeed = 0
                    }), this.gesture.on("longpress", function () {
                        return e.c.autoMoveSpeed = 10
                    }), this.c.touchEnabled || (this.dom.cursor.dataset.cursor = "pointer")
                }
            }, {
                key: "initCursorListeners", value: function () {
                    this.eyeCursorElEnter = this.eyeCursorElEnter.bind(this), this.eyeCursorElLeave = this.eyeCursorElLeave.bind(this), this.mouseMove = this.mouseMove.bind(this), window.addEventListener("mousemove", this.mouseMove, !1);
                    for (var e = document.querySelectorAll(".cursor-eye"), t = 0; t < e.length; t++) e[t].addEventListener("mouseenter", this.eyeCursorElEnter, !1), e[t].addEventListener("mouseleave", this.eyeCursorElLeave, !1)
                }
            }, {
                key: "preventPullToRefresh", value: function () {
                    var t = !1;
                    this.renderer.domElement.addEventListener("touchstart", function (o) {
                        if (1 === o.touches.length) {
                            var e = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
                            t = 0 === e
                        }
                    }), this.renderer.domElement.addEventListener("touchmove", function (o) {
                        t && (t = !1, o.preventDefault())
                    })
                }
            }, {
                key: "easterEgg", value: function () {
                    if (this.timelineEntered) {
                        console.log("CHEATER!"), this.easterEggEnabled = !0, J.a.to(this.timeline.rotation, 2, {
                            z: 360 * P / 180,
                            ease: "Power4.easeInOut"
                        }), this.discoColours();
                        for (var e = 0; e < this.itemMeshes.length - 1; e++) J.a.to(this.itemMeshes[e].rotation, 2, {
                            z: 360 * P / 180,
                            ease: "Linear.easeNone",
                            repeat: -1
                        });
                        for (var t in J.a.to(this.sections.intro.children[2].rotation, 2, {
                            z: 360 * P / 180,
                            ease: "Linear.easeNone",
                            repeat: -1
                        }), this.sections) J.a.to(this.sections[t].children[0].position, 1, {
                            z: 150,
                            repeat: -1,
                            yoyo: !0,
                            ease: "Linear.easeNone"
                        })
                    }
                }
            }, {
                key: "discoColours", value: function () {
                    var e = this, t = function (t) {
                        J.a.to(e.items[t].uniforms.gradientColor.value, 1, {
                            r: .9882352941,
                            g: .2941176471,
                            b: .05882352941,
                            ease: "Power4.easeOut",
                            onComplete: function () {
                                J.a.to(e.items[t].uniforms.gradientColor.value, 1, {
                                    r: .9882352941,
                                    g: .05882352941,
                                    b: .7529411765,
                                    ease: "Power4.easeOut",
                                    onComplete: function () {
                                        J.a.to(e.items[t].uniforms.gradientColor.value, 1, {
                                            r: .05882352941,
                                            g: .7529411765,
                                            b: .9882352941,
                                            ease: "Power4.easeOut",
                                            onComplete: function () {
                                                J.a.to(e.items[t].uniforms.gradientColor.value, 1, {
                                                    r: .05882352941,
                                                    g: .9882352941,
                                                    b: .2941176471,
                                                    ease: "Power4.easeOut"
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    };
                    for (var o in this.items) t(o);
                    J.a.to(this.textMat.color, 1, {
                        r: .9882352941,
                        g: .2941176471,
                        b: .05882352941,
                        ease: "Power4.easeOut",
                        onComplete: function () {
                            J.a.to(e.textMat.color, 1, {
                                r: .9882352941,
                                g: .05882352941,
                                b: .7529411765,
                                ease: "Power4.easeOut",
                                onComplete: function () {
                                    J.a.to(e.textMat.color, 1, {
                                        r: .05882352941,
                                        g: .7529411765,
                                        b: .9882352941,
                                        ease: "Power4.easeOut",
                                        onComplete: function () {
                                            J.a.to(e.textMat.color, 1, {
                                                r: .05882352941,
                                                g: .9882352941,
                                                b: .2941176471,
                                                ease: "Power4.easeOut"
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    }), J.a.to([this.scene.fog.color, this.scene.background], 1, {
                        r: .05882352941,
                        g: .9882352941,
                        b: .2941176471,
                        ease: "Power4.easeOut",
                        onComplete: function () {
                            J.a.to([e.scene.fog.color, e.scene.background], 1, {
                                r: .05882352941,
                                g: .7529411765,
                                b: .9882352941,
                                ease: "Power4.easeOut",
                                onComplete: function () {
                                    J.a.to([e.scene.fog.color, e.scene.background], 1, {
                                        r: .9882352941,
                                        g: .05882352941,
                                        b: .7529411765,
                                        ease: "Power4.easeOut",
                                        onComplete: function () {
                                            J.a.to([e.scene.fog.color, e.scene.background], 1, {
                                                r: .9882352941,
                                                g: .2941176471,
                                                b: .05882352941,
                                                ease: "Power4.easeOut",
                                                onComplete: function () {
                                                    e.discoColours()
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            }]), e
        }();
        e.hot.accept(), e.hot.dispose(function () {
            window.assets = ye.assets, ye.renderer.domElement.removeEventListener("wheel", ye.scroll), removeEventListener("resize", ye.resize), ye.renderer.domElement.removeEventListener("mousedown", ye.mouseDown), ye.renderer.domElement.removeEventListener("mouseup", ye.mouseUp), removeEventListener("mousemove", ye.mouseMove), document.querySelector("canvas").remove(), ye.renderer.forceContextLoss(), ye.renderer.context = null, ye.renderer.domElement = null, ye.renderer = null, cancelAnimationFrame(ye.animationId), ye.gesture.destroy()
        });
        var ye = new ve;
        window.timeline = ye
    }, x3HC: function (e) {
        e.exports = "#define GLSLIFY 1\nvarying vec2 vUv;\n\nuniform float time;\nuniform vec3 fogColor;\nuniform float fogNear;\nuniform float fogFar;\nuniform sampler2D texture;\n\nvoid main() {\n\n\tvec2 uv = vUv;\n\t// vec4 color = texture2D( texture, vUv );\n\n\tvec4 origColor = texture2D(texture, vUv);\n\n\t// remove green\n\tif ( origColor.r < 0.4 && origColor.b < 0.4 && origColor.g > 0.4 ) {\n\t\torigColor.a = 0.;\n\t}\n\n\tif ( origColor.r < 0.9 && origColor.b < 0.9 && origColor.g > 0.9 ) {\n\t\torigColor.a = 0.;\n\t}\n\n\t// vec4 gradientImage = mix(vec4( gradientColor, 1.0), vec4(1.0, 1.0, 1.0, 1.0), grayscaleValue);\n\n\t// if ( gradientImage.b < 0.9 ) discard;\n\n\t// gl_FragColor = origColor * opacity;\n\tgl_FragColor = origColor;\n\n\t#ifdef USE_FOG\n\t\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\t\tfloat depth = gl_FragDepthEXT / gl_FragCoord.w;\n\t\t#else\n\t\t\tfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n\t\t#endif\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n\t\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n\t#endif\n\n}"
    }, yLpj: function (e) {
        var t = function () {
            return this
        }();
        try {
            t = t || new Function("return this")()
        } catch (o) {
            "object" == typeof window && (t = window)
        }
        e.exports = t
    }
}, [[0, 3, 2, 1]]]);