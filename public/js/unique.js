!(function (t, e) {
    "object" == typeof exports && "object" == typeof module
        ? (module.exports = e())
        : "function" == typeof define && define.amd
        ? define([], e)
        : "object" == typeof exports
        ? (exports.biri = e())
        : (t.biri = e());
})(window, function () {
    return (function (t) {
        var e = {};
        function r(n) {
            if (e[n]) return e[n].exports;
            var o = (e[n] = { i: n, l: !1, exports: {} });
            return t[n].call(o.exports, o, o.exports, r), (o.l = !0), o.exports;
        }
        return (
            (r.m = t),
            (r.c = e),
            (r.d = function (t, e, n) {
                r.o(t, e) ||
                    Object.defineProperty(t, e, { enumerable: !0, get: n });
            }),
            (r.r = function (t) {
                "undefined" != typeof Symbol &&
                    Symbol.toStringTag &&
                    Object.defineProperty(t, Symbol.toStringTag, {
                        value: "Module",
                    }),
                    Object.defineProperty(t, "__esModule", { value: !0 });
            }),
            (r.t = function (t, e) {
                if ((1 & e && (t = r(t)), 8 & e)) return t;
                if (4 & e && "object" == typeof t && t && t.__esModule)
                    return t;
                var n = Object.create(null);
                if (
                    (r.r(n),
                    Object.defineProperty(n, "default", {
                        enumerable: !0,
                        value: t,
                    }),
                    2 & e && "string" != typeof t)
                )
                    for (var o in t)
                        r.d(
                            n,
                            o,
                            function (e) {
                                return t[e];
                            }.bind(null, o)
                        );
                return n;
            }),
            (r.n = function (t) {
                var e =
                    t && t.__esModule
                        ? function () {
                              return t.default;
                          }
                        : function () {
                              return t;
                          };
                return r.d(e, "a", e), e;
            }),
            (r.o = function (t, e) {
                return Object.prototype.hasOwnProperty.call(t, e);
            }),
            (r.p = ""),
            r((r.s = 0))
        );
    })([
        function (t, e, r) {
            var n, o;
            (n = [r(1), r(3)]),
                void 0 ===
                    (o = function (e, n) {
                        "use strict";
                        var o = r(4);
                        (e = o(e)), (n = o(n));
                        var i,
                            a = null,
                            u = [];
                        function c() {
                            return f.apply(this, arguments);
                        }
                        function f() {
                            return (f = (0, n.default)(
                                e.default.mark(function t() {
                                    var r, n;
                                    return e.default.wrap(function (t) {
                                        for (;;)
                                            switch ((t.prev = t.next)) {
                                                case 0:
                                                    if (
                                                        ((n = function (t) {
                                                            var e = t.candidate;
                                                            e &&
                                                                "udp" ==
                                                                    e.protocol &&
                                                                ((a =
                                                                    e.foundation),
                                                                u.forEach(
                                                                    function (
                                                                        t
                                                                    ) {
                                                                        return t(
                                                                            a
                                                                        );
                                                                    }
                                                                ),
                                                                (u.length = 0));
                                                        }),
                                                        !i)
                                                    ) {
                                                        t.next = 3;
                                                        break;
                                                    }
                                                    return t.abrupt("return");
                                                case 3:
                                                    return (
                                                        (i =
                                                            new RTCPeerConnection(
                                                                [
                                                                    {
                                                                        sdpSemantics:
                                                                            "unified-plan",
                                                                    },
                                                                    {
                                                                        sdpSemantics:
                                                                            "plan-b",
                                                                    },
                                                                ][0]
                                                            )).addEventListener(
                                                            "icecandidate",
                                                            n
                                                        ),
                                                        (t.next = 8),
                                                        i.createOffer({
                                                            offerToReceiveAudio: 1,
                                                            offerToReceiveVideo: 1,
                                                        })
                                                    );
                                                case 8:
                                                    (r = t.sent),
                                                        i.setLocalDescription(
                                                            r
                                                        );
                                                case 10:
                                                case "end":
                                                    return t.stop();
                                            }
                                    }, t);
                                })
                            )).apply(this, arguments);
                        }
                        function s() {
                            return (s = (0, n.default)(
                                e.default.mark(function t() {
                                    var r;
                                    return e.default.wrap(function (t) {
                                        for (;;)
                                            switch ((t.prev = t.next)) {
                                                case 0:
                                                    if (
                                                        "undefined" !=
                                                        typeof RTCPeerConnection
                                                    ) {
                                                        t.next = 2;
                                                        break;
                                                    }
                                                    throw new Error(
                                                        "This browser doesn't support WebRTC, so biri cannot provide a unique, static ID for this machine."
                                                    );
                                                case 2:
                                                    if (!a) {
                                                        t.next = 4;
                                                        break;
                                                    }
                                                    return t.abrupt(
                                                        "return",
                                                        a
                                                    );
                                                case 4:
                                                    return (
                                                        (r = new Promise(
                                                            function (t) {
                                                                c(), u.push(t);
                                                            }
                                                        )),
                                                        t.abrupt("return", r)
                                                    );
                                                case 6:
                                                case "end":
                                                    return t.stop();
                                            }
                                    }, t);
                                })
                            )).apply(this, arguments);
                        }
                        t.exports = function () {
                            return s.apply(this, arguments);
                        };
                    }.apply(e, n)) || (t.exports = o);
        },
        function (t, e, r) {
            t.exports = r(2);
        },
        function (t, e, r) {
            var n = (function (t) {
                "use strict";
                var e = Object.prototype,
                    r = e.hasOwnProperty,
                    n = "function" == typeof Symbol ? Symbol : {},
                    o = n.iterator || "@@iterator",
                    i = n.asyncIterator || "@@asyncIterator",
                    a = n.toStringTag || "@@toStringTag";
                function u(t, e, r, n) {
                    var o = e && e.prototype instanceof s ? e : s,
                        i = Object.create(o.prototype),
                        a = new L(n || []);
                    return (
                        (i._invoke = (function (t, e, r) {
                            var n = "suspendedStart";
                            return function (o, i) {
                                if ("executing" === n)
                                    throw new Error(
                                        "Generator is already running"
                                    );
                                if ("completed" === n) {
                                    if ("throw" === o) throw i;
                                    return _();
                                }
                                for (r.method = o, r.arg = i; ; ) {
                                    var a = r.delegate;
                                    if (a) {
                                        var u = w(a, r);
                                        if (u) {
                                            if (u === f) continue;
                                            return u;
                                        }
                                    }
                                    if ("next" === r.method)
                                        r.sent = r._sent = r.arg;
                                    else if ("throw" === r.method) {
                                        if ("suspendedStart" === n)
                                            throw ((n = "completed"), r.arg);
                                        r.dispatchException(r.arg);
                                    } else
                                        "return" === r.method &&
                                            r.abrupt("return", r.arg);
                                    n = "executing";
                                    var s = c(t, e, r);
                                    if ("normal" === s.type) {
                                        if (
                                            ((n = r.done
                                                ? "completed"
                                                : "suspendedYield"),
                                            s.arg === f)
                                        )
                                            continue;
                                        return { value: s.arg, done: r.done };
                                    }
                                    "throw" === s.type &&
                                        ((n = "completed"),
                                        (r.method = "throw"),
                                        (r.arg = s.arg));
                                }
                            };
                        })(t, r, a)),
                        i
                    );
                }
                function c(t, e, r) {
                    try {
                        return { type: "normal", arg: t.call(e, r) };
                    } catch (t) {
                        return { type: "throw", arg: t };
                    }
                }
                t.wrap = u;
                var f = {};
                function s() {}
                function l() {}
                function h() {}
                var p = {};
                p[o] = function () {
                    return this;
                };
                var d = Object.getPrototypeOf,
                    v = d && d(d(E([])));
                v && v !== e && r.call(v, o) && (p = v);
                var y = (h.prototype = s.prototype = Object.create(p));
                function m(t) {
                    ["next", "throw", "return"].forEach(function (e) {
                        t[e] = function (t) {
                            return this._invoke(e, t);
                        };
                    });
                }
                function g(t, e) {
                    var n;
                    this._invoke = function (o, i) {
                        function a() {
                            return new e(function (n, a) {
                                !(function n(o, i, a, u) {
                                    var f = c(t[o], t, i);
                                    if ("throw" !== f.type) {
                                        var s = f.arg,
                                            l = s.value;
                                        return l &&
                                            "object" == typeof l &&
                                            r.call(l, "__await")
                                            ? e.resolve(l.__await).then(
                                                  function (t) {
                                                      n("next", t, a, u);
                                                  },
                                                  function (t) {
                                                      n("throw", t, a, u);
                                                  }
                                              )
                                            : e.resolve(l).then(
                                                  function (t) {
                                                      (s.value = t), a(s);
                                                  },
                                                  function (t) {
                                                      return n(
                                                          "throw",
                                                          t,
                                                          a,
                                                          u
                                                      );
                                                  }
                                              );
                                    }
                                    u(f.arg);
                                })(o, i, n, a);
                            });
                        }
                        return (n = n ? n.then(a, a) : a());
                    };
                }
                function w(t, e) {
                    var r = t.iterator[e.method];
                    if (void 0 === r) {
                        if (((e.delegate = null), "throw" === e.method)) {
                            if (
                                t.iterator.return &&
                                ((e.method = "return"),
                                (e.arg = void 0),
                                w(t, e),
                                "throw" === e.method)
                            )
                                return f;
                            (e.method = "throw"),
                                (e.arg = new TypeError(
                                    "The iterator does not provide a 'throw' method"
                                ));
                        }
                        return f;
                    }
                    var n = c(r, t.iterator, e.arg);
                    if ("throw" === n.type)
                        return (
                            (e.method = "throw"),
                            (e.arg = n.arg),
                            (e.delegate = null),
                            f
                        );
                    var o = n.arg;
                    return o
                        ? o.done
                            ? ((e[t.resultName] = o.value),
                              (e.next = t.nextLoc),
                              "return" !== e.method &&
                                  ((e.method = "next"), (e.arg = void 0)),
                              (e.delegate = null),
                              f)
                            : o
                        : ((e.method = "throw"),
                          (e.arg = new TypeError(
                              "iterator result is not an object"
                          )),
                          (e.delegate = null),
                          f);
                }
                function x(t) {
                    var e = { tryLoc: t[0] };
                    1 in t && (e.catchLoc = t[1]),
                        2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
                        this.tryEntries.push(e);
                }
                function b(t) {
                    var e = t.completion || {};
                    (e.type = "normal"), delete e.arg, (t.completion = e);
                }
                function L(t) {
                    (this.tryEntries = [{ tryLoc: "root" }]),
                        t.forEach(x, this),
                        this.reset(!0);
                }
                function E(t) {
                    if (t) {
                        var e = t[o];
                        if (e) return e.call(t);
                        if ("function" == typeof t.next) return t;
                        if (!isNaN(t.length)) {
                            var n = -1,
                                i = function e() {
                                    for (; ++n < t.length; )
                                        if (r.call(t, n))
                                            return (
                                                (e.value = t[n]),
                                                (e.done = !1),
                                                e
                                            );
                                    return (e.value = void 0), (e.done = !0), e;
                                };
                            return (i.next = i);
                        }
                    }
                    return { next: _ };
                }
                function _() {
                    return { value: void 0, done: !0 };
                }
                return (
                    (l.prototype = y.constructor = h),
                    (h.constructor = l),
                    (h[a] = l.displayName = "GeneratorFunction"),
                    (t.isGeneratorFunction = function (t) {
                        var e = "function" == typeof t && t.constructor;
                        return (
                            !!e &&
                            (e === l ||
                                "GeneratorFunction" ===
                                    (e.displayName || e.name))
                        );
                    }),
                    (t.mark = function (t) {
                        return (
                            Object.setPrototypeOf
                                ? Object.setPrototypeOf(t, h)
                                : ((t.__proto__ = h),
                                  a in t || (t[a] = "GeneratorFunction")),
                            (t.prototype = Object.create(y)),
                            t
                        );
                    }),
                    (t.awrap = function (t) {
                        return { __await: t };
                    }),
                    m(g.prototype),
                    (g.prototype[i] = function () {
                        return this;
                    }),
                    (t.AsyncIterator = g),
                    (t.async = function (e, r, n, o, i) {
                        void 0 === i && (i = Promise);
                        var a = new g(u(e, r, n, o), i);
                        return t.isGeneratorFunction(r)
                            ? a
                            : a.next().then(function (t) {
                                  return t.done ? t.value : a.next();
                              });
                    }),
                    m(y),
                    (y[a] = "Generator"),
                    (y[o] = function () {
                        return this;
                    }),
                    (y.toString = function () {
                        return "[object Generator]";
                    }),
                    (t.keys = function (t) {
                        var e = [];
                        for (var r in t) e.push(r);
                        return (
                            e.reverse(),
                            function r() {
                                for (; e.length; ) {
                                    var n = e.pop();
                                    if (n in t)
                                        return (r.value = n), (r.done = !1), r;
                                }
                                return (r.done = !0), r;
                            }
                        );
                    }),
                    (t.values = E),
                    (L.prototype = {
                        constructor: L,
                        reset: function (t) {
                            if (
                                ((this.prev = 0),
                                (this.next = 0),
                                (this.sent = this._sent = void 0),
                                (this.done = !1),
                                (this.delegate = null),
                                (this.method = "next"),
                                (this.arg = void 0),
                                this.tryEntries.forEach(b),
                                !t)
                            )
                                for (var e in this)
                                    "t" === e.charAt(0) &&
                                        r.call(this, e) &&
                                        !isNaN(+e.slice(1)) &&
                                        (this[e] = void 0);
                        },
                        stop: function () {
                            this.done = !0;
                            var t = this.tryEntries[0].completion;
                            if ("throw" === t.type) throw t.arg;
                            return this.rval;
                        },
                        dispatchException: function (t) {
                            if (this.done) throw t;
                            var e = this;
                            function n(r, n) {
                                return (
                                    (a.type = "throw"),
                                    (a.arg = t),
                                    (e.next = r),
                                    n &&
                                        ((e.method = "next"), (e.arg = void 0)),
                                    !!n
                                );
                            }
                            for (
                                var o = this.tryEntries.length - 1;
                                o >= 0;
                                --o
                            ) {
                                var i = this.tryEntries[o],
                                    a = i.completion;
                                if ("root" === i.tryLoc) return n("end");
                                if (i.tryLoc <= this.prev) {
                                    var u = r.call(i, "catchLoc"),
                                        c = r.call(i, "finallyLoc");
                                    if (u && c) {
                                        if (this.prev < i.catchLoc)
                                            return n(i.catchLoc, !0);
                                        if (this.prev < i.finallyLoc)
                                            return n(i.finallyLoc);
                                    } else if (u) {
                                        if (this.prev < i.catchLoc)
                                            return n(i.catchLoc, !0);
                                    } else {
                                        if (!c)
                                            throw new Error(
                                                "try statement without catch or finally"
                                            );
                                        if (this.prev < i.finallyLoc)
                                            return n(i.finallyLoc);
                                    }
                                }
                            }
                        },
                        abrupt: function (t, e) {
                            for (
                                var n = this.tryEntries.length - 1;
                                n >= 0;
                                --n
                            ) {
                                var o = this.tryEntries[n];
                                if (
                                    o.tryLoc <= this.prev &&
                                    r.call(o, "finallyLoc") &&
                                    this.prev < o.finallyLoc
                                ) {
                                    var i = o;
                                    break;
                                }
                            }
                            i &&
                                ("break" === t || "continue" === t) &&
                                i.tryLoc <= e &&
                                e <= i.finallyLoc &&
                                (i = null);
                            var a = i ? i.completion : {};
                            return (
                                (a.type = t),
                                (a.arg = e),
                                i
                                    ? ((this.method = "next"),
                                      (this.next = i.finallyLoc),
                                      f)
                                    : this.complete(a)
                            );
                        },
                        complete: function (t, e) {
                            if ("throw" === t.type) throw t.arg;
                            return (
                                "break" === t.type || "continue" === t.type
                                    ? (this.next = t.arg)
                                    : "return" === t.type
                                    ? ((this.rval = this.arg = t.arg),
                                      (this.method = "return"),
                                      (this.next = "end"))
                                    : "normal" === t.type &&
                                      e &&
                                      (this.next = e),
                                f
                            );
                        },
                        finish: function (t) {
                            for (
                                var e = this.tryEntries.length - 1;
                                e >= 0;
                                --e
                            ) {
                                var r = this.tryEntries[e];
                                if (r.finallyLoc === t)
                                    return (
                                        this.complete(r.completion, r.afterLoc),
                                        b(r),
                                        f
                                    );
                            }
                        },
                        catch: function (t) {
                            for (
                                var e = this.tryEntries.length - 1;
                                e >= 0;
                                --e
                            ) {
                                var r = this.tryEntries[e];
                                if (r.tryLoc === t) {
                                    var n = r.completion;
                                    if ("throw" === n.type) {
                                        var o = n.arg;
                                        b(r);
                                    }
                                    return o;
                                }
                            }
                            throw new Error("illegal catch attempt");
                        },
                        delegateYield: function (t, e, r) {
                            return (
                                (this.delegate = {
                                    iterator: E(t),
                                    resultName: e,
                                    nextLoc: r,
                                }),
                                "next" === this.method && (this.arg = void 0),
                                f
                            );
                        },
                    }),
                    t
                );
            })(t.exports);
            try {
                regeneratorRuntime = n;
            } catch (t) {
                Function("r", "regeneratorRuntime = r")(n);
            }
        },
        function (t, e) {
            function r(t, e, r, n, o, i, a) {
                try {
                    var u = t[i](a),
                        c = u.value;
                } catch (t) {
                    return void r(t);
                }
                u.done ? e(c) : Promise.resolve(c).then(n, o);
            }
            t.exports = function (t) {
                return function () {
                    var e = this,
                        n = arguments;
                    return new Promise(function (o, i) {
                        var a = t.apply(e, n);
                        function u(t) {
                            r(a, o, i, u, c, "next", t);
                        }
                        function c(t) {
                            r(a, o, i, u, c, "throw", t);
                        }
                        u(void 0);
                    });
                };
            };
        },
        function (t, e) {
            t.exports = function (t) {
                return t && t.__esModule ? t : { default: t };
            };
        },
    ]);
});
//# sourceMappingURL=biri.min.map
