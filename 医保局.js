var fff;
var po;
var SM2;
var l={
    "appCode": "T98HPCGN5ZVVQBS8LZQNOAEXVI9GYHKQ",
    "version": "1.0.0",
    "appSecret": "NMVFVILMKT13GEMD3BKPKCTBOQBPZR2P",
    "publicKey": "BEKaw3Qtc31LG/hTPHFPlriKuAn/nzTWl8LiRxLw4iQiSUIyuglptFxNkdCiNXcXvkqTH79Rh/A2sEFU6hjeK3k=",
    "privateKey": "AJxKNdmspMaPGj+onJNoQ0cgWk2E3CYFWKBJhpcJrAtC",
    "publicKeyType": "base64",
    "privateKeyType": "base64"
};
var e_;
var SM4;

!function(e) {
    var n={};
    var i = {
        app: 0};
    var r = {
        app: 0
    };
    function o(t) {
        if (n[t])
            return n[t].exports;
        var i = n[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(i.exports, i, i.exports, o),
            i.l = !0,
            i.exports
    }
    o.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }),
            Object.defineProperty(e, "__esModule", {
                value: !0
            })
    }
    o.d = function(e, t, n) {
        o.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: n
        })
    }
    o.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    o.n = function(e) {
        var t = e && e.__esModule ? function() {
                    return e.default
                }
                : function() {
                    return e
                }
        ;
        return o.d(t, "a", t),
            t
    }
    fff=o;
    SM2=o("4d09");
    e_=o("b639");
    SM4=o('e04e')
}(
    {
        "4d09": function(e, t, n) {
            "use strict";
            n.r(t),
                n.d(t, "doEncrypt", (function() {
                        return m
                    }
                )),
                n.d(t, "doDecrypt", (function() {
                        return v
                    }
                )),
                n.d(t, "doSignature", (function() {
                        return g
                    }
                )),
                n.d(t, "doVerifySignature", (function() {
                        return b
                    }
                )),
                n.d(t, "doSm3Hash", (function() {
                        return y
                    }
                )),
                n.d(t, "getPublicKeyFromPrivateKey", (function() {
                        return A
                    }
                )),
                n.d(t, "getPoint", (function() {
                        return w
                    }
                ))
                // n("6b54");
            var i = n("f33e").BigInteger
                // , r = n("53ea")
                // , o = r.encodeDer
                // , a = r.decodeDer
                , s = n("4d2d").SM3Digest
                , l = n("c747").SM2Cipher
                , c = n("b381")
                , u = c.generateEcparam()
                , h = u.G
                , d = u.curve
                , f = u.n
                , p = 0;
            function m(e, t) {
                var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1
                    , i = new l;
                e = c.hexToArray(c.parseUtf8StringToHex(e)),
                t.length > 128 && (t = t.substr(t.length - 128));
                var r = t.substr(0, 64)
                    , o = t.substr(64);
                t = i.createPoint(r, o);
                var a = i.initEncipher(t);
                i.encryptBlock(e);
                var s = c.arrayToHex(e)
                    , u = new Array(32);
                return i.doFinal(u),
                    u = c.arrayToHex(u),
                    n === p ? a + s + u : a + u + s
            }
            function v(e, t) {
                var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1
                    , r = new l;
                t = new i(t,16);
                var o = e.substr(0, 64)
                    , a = e.substr(0 + o.length, 64)
                    , s = o.length + a.length
                    , u = e.substr(s, 64)
                    , h = e.substr(s + 64);
                n === p && (u = e.substr(e.length - 64),
                    h = e.substr(s, e.length - s - 64));
                var d = c.hexToArray(h)
                    , f = r.createPoint(o, a);
                r.initDecipher(t, f),
                    r.decryptBlock(d);
                var m = new Array(32);
                return r.doFinal(m),
                    c.arrayToHex(m) === u ? c.arrayToUtf8(d) : ""
            }
            function g(e, t) {
                var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}
                    , r = n.pointPool
                    , a = n.der
                    , s = n.hash
                    , l = n.publicKey
                    , u = "string" == typeof e ? c.parseUtf8StringToHex(e) : c.parseArrayBufferToHex(e);
                s && (u = y(u, l = l || A(t)));
                var h = new i(t,16)
                    , d = new i(u,16)
                    , p = null
                    , m = null
                    , v = null;
                do {
                    do {
                        var g = void 0;
                        p = (g = r && r.length ? r.pop() : w()).k,
                            m = d.add(g.x1).mod(f)
                    } while (m.equals(i.ZERO) || m.add(p).equals(f));
                    v = h.add(i.ONE).modInverse(f).multiply(p.subtract(m.multiply(h))).mod(f)
                } while (v.equals(i.ZERO));
                return a ? o(m, v) : c.leftPad(m.toString(16), 64) + c.leftPad(v.toString(16), 64)
            }
            function b(e, t, n) {
                var r, o, s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}, l = s.der, u = s.hash, p = "string" == typeof e ? c.parseUtf8StringToHex(e) : c.parseArrayBufferToHex(e);
                if (u && (p = y(p, n)),
                    l) {
                    var m = a(t);
                    r = m.r,
                        o = m.s
                } else
                    r = new i(t.substring(0, 64),16),
                        o = new i(t.substring(64),16);
                var v = d.decodePointHex(n)
                    , g = new i(p,16)
                    , b = r.add(o).mod(f);
                if (b.equals(i.ZERO))
                    return !1;
                var A = h.multiply(o).add(v.multiply(b))
                    , w = g.add(A.getX().toBigInteger()).mod(f);
                return r.equals(w)
            }
            function y(e, t) {
                var n = new s
                    , i = (new s).getZ(h, t.substr(2, 128))
                    , r = c.hexToArray(c.arrayToHex(i).toString())
                    , o = e
                    , a = c.hexToArray(o)
                    , l = new Array(n.getDigestSize());
                return n.blockUpdate(r, 0, r.length),
                    n.blockUpdate(a, 0, a.length),
                    n.doFinal(l, 0),
                    c.arrayToHex(l).toString()
            }
            function A(e) {
                var t = h.multiply(new i(e,16));
                return "04" + c.leftPad(t.getX().toBigInteger().toString(16), 64) + c.leftPad(t.getY().toBigInteger().toString(16), 64)
            }
            function w() {
                var e = c.generateKeyPairHex()
                    , t = d.decodePointHex(e.publicKey);
                return e.k = new i(e.privateKey,16),
                    e.x1 = t.getX().toBigInteger(),
                    e
            }
            t.default = {
                generateKeyPairHex: c.generateKeyPairHex,
                doEncrypt: m,
                doDecrypt: v,
                doSignature: g,
                doVerifySignature: b,
                getPoint: w
            }
        },
        "53ea": function(e, t, n) {
            "use strict";
            n.r(t);
            var i = n("7618");
            function r(e, t) {
                return !t || "object" !== Object(i.a)(t) && "function" != typeof t ? function(e) {
                    if (void 0 === e)
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return e
                }(e) : t
            }
            var o = n("061b")
                , a = n.n(o)
                , s = n("4d16")
                , l = n.n(s);
            function c(e) {
                return (c = l.a ? a.a : function(e) {
                        return e.__proto__ || a()(e)
                    }
                )(e)
            }
            var u = n("4aa6")
                , h = n.n(u);
            function d(e, t) {
                return (d = l.a || function(e, t) {
                        return e.__proto__ = t,
                            e
                    }
                )(e, t)
            }
            function f(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Super expression must either be null or a function");
                e.prototype = h()(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && d(e, t)
            }
            var p = n("d225")
                , m = n("b0b4")
                , v = (n("a481"),
                n("4917"),
                n("6b54"),
                n("f33e").BigInteger)
                , g = function() {
                function e() {
                    Object(p.a)(this, e),
                        this.isModified = !0,
                        this.hTLV = null,
                        this.hT = "00",
                        this.hL = "00",
                        this.hV = ""
                }
                return Object(m.a)(e, [{
                    key: "getLengthHexFromValue",
                    value: function() {
                        var e = this.hV.length / 2
                            , t = e.toString(16);
                        return t.length % 2 == 1 && (t = "0" + t),
                            e < 128 ? t : (128 + t.length / 2).toString(16) + t
                    }
                }, {
                    key: "getEncodedHex",
                    value: function() {
                        return (null == this.hTLV || this.isModified) && (this.hV = this.getFreshValueHex(),
                            this.hL = this.getLengthHexFromValue(),
                            this.hTLV = this.hT + this.hL + this.hV,
                            this.isModified = !1),
                            this.hTLV
                    }
                }, {
                    key: "getFreshValueHex",
                    value: function() {
                        return ""
                    }
                }]),
                    e
            }()
                , b = function(e) {
                function t(e) {
                    var n;
                    return Object(p.a)(this, t),
                        (n = r(this, c(t).call(this))).hT = "02",
                    e && e.bigint && (n.hTLV = null,
                        n.isModified = !0,
                        n.hV = function(e) {
                            var t = e.toString(16);
                            if ("-" !== t.substr(0, 1))
                                t.length % 2 == 1 ? t = "0" + t : t.match(/^[0-7]/) || (t = "00" + t);
                            else {
                                var n = t.substr(1).length;
                                n % 2 == 1 ? n += 1 : t.match(/^[0-7]/) || (n += 2);
                                for (var i = "", r = 0; r < n; r++)
                                    i += "f";
                                t = new v(i,16).xor(e).add(v.ONE).toString(16).replace(/^-/, "")
                            }
                            return t
                        }(e.bigint)),
                        n
                }
                return f(t, g),
                    Object(m.a)(t, [{
                        key: "getFreshValueHex",
                        value: function() {
                            return this.hV
                        }
                    }]),
                    t
            }()
                , y = function(e) {
                function t(e) {
                    var n;
                    return Object(p.a)(this, t),
                        (n = r(this, c(t).call(this))).hT = "30",
                        n.asn1Array = [],
                    e && e.array && (n.asn1Array = e.array),
                        n
                }
                return f(t, g),
                    Object(m.a)(t, [{
                        key: "getFreshValueHex",
                        value: function() {
                            for (var e = "", t = 0; t < this.asn1Array.length; t++)
                                e += this.asn1Array[t].getEncodedHex();
                            return this.hV = e,
                                this.hV
                        }
                    }]),
                    t
            }();
            function A(e, t) {
                if ("8" !== e.substring(t + 2, t + 3))
                    return 1;
                var n = parseInt(e.substring(t + 3, t + 4), 10);
                return 0 === n ? -1 : n > 0 && n < 10 ? n + 1 : -2
            }
            function w(e, t) {
                var n = function(e, t) {
                    var n = A(e, t);
                    return n < 1 ? "" : e.substring(t + 2, t + 2 + 2 * n)
                }(e, t);
                return "" === n ? -1 : (parseInt(n.substring(0, 1), 10) < 8 ? new v(n,16) : new v(n.substring(2),16)).intValue()
            }
            function x(e, t) {
                var n = A(e, t);
                return n < 0 ? n : t + 2 * (n + 1)
            }
            function C(e, t) {
                var n = x(e, t)
                    , i = w(e, t);
                return e.substring(n, n + 2 * i)
            }
            function _(e, t) {
                return x(e, t) + 2 * w(e, t)
            }
            t.default = {
                encodeDer: function(e, t) {
                    var n = new b({
                        bigint: e
                    })
                        , i = new b({
                        bigint: t
                    });
                    return new y({
                        array: [n, i]
                    }).getEncodedHex()
                },
                decodeDer: function(e) {
                    var t = function(e, t) {
                        var n = []
                            , i = x(e, t);
                        n.push(i);
                        for (var r = w(e, t), o = i, a = 0; ; ) {
                            var s = _(e, o);
                            if (null == s || s - i >= 2 * r)
                                break;
                            if (a >= 200)
                                break;
                            n.push(s),
                                o = s,
                                a++
                        }
                        return n
                    }(e, 0)
                        , n = t[0]
                        , i = t[1]
                        , r = C(e, n)
                        , o = C(e, i);
                    return {
                        r: new v(r,16),
                        s: new v(o,16)
                    }
                }
            }
        },
        "4d2d": function(e, t, n) {
            "use strict";
            n.r(t),
                n.d(t, "SM3Digest", (function() {
                        return c
                    }
                ))
                // n("ac6a"),
                // n("456d");
            var i = n("d225")
                , r = n("b0b4")
                // , o = (n("6b54"),
                // n("c5f6"),
                // n("f33e").BigInteger)
                ,o = n("f33e").BigInteger
                , a = n("b381")
                , s = function(e, t, n, i, r) {
                for (var o = 0; o < r; o++)
                    n[i + o] = e[t + o]
            }
                , l = {
                minValue: -2147483648,
                maxValue: 2147483647,
                parse: function(e) {
                    if (e < this.minValue) {
                        for (var t = Number(-e).toString(2), n = t.substr(t.length - 31, 31), i = "", r = 0; r < n.length; r++)
                            i += "0" === n.substr(r, 1) ? "1" : "0";
                        return parseInt(i, 2) + 1
                    }
                    if (e > this.maxValue) {
                        for (var o = Number(e).toString(2), a = o.substr(o.length - 31, 31), s = "", l = 0; l < a.length; l++)
                            s += "0" === a.substr(l, 1) ? "1" : "0";
                        return -(parseInt(s, 2) + 1)
                    }
                    return e
                },
                parseByte: function(e) {
                    if (e < 0) {
                        for (var t = Number(-e).toString(2), n = t.substr(t.length - 8, 8), i = "", r = 0; r < n.length; r++)
                            i += "0" === n.substr(r, 1) ? "1" : "0";
                        return (parseInt(i, 2) + 1) % 256
                    }
                    if (e > 255) {
                        var o = Number(e).toString(2);
                        return parseInt(o.substr(o.length - 8, 8), 2)
                    }
                    return e
                }
            }
                , c = function() {
                function e() {
                    Object(i.a)(this, e),
                        this.xBuf = [],
                        this.xBufOff = 0,
                        this.byteCount = 0,
                        this.DIGEST_LENGTH = 32,
                        this.v0 = [1937774191, 1226093241, 388252375, 3666478592, 2842636476, 372324522, 3817729613, 2969243214],
                        this.v0 = [1937774191, 1226093241, 388252375, -628488704, -1452330820, 372324522, -477237683, -1325724082],
                        this.v = new Array(8),
                        this.v_ = new Array(8),
                        this.X0 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        this.X = new Array(68),
                        this.xOff = 0,
                        this.T_00_15 = 2043430169,
                        this.T_16_63 = 2055708042,
                        arguments.length > 0 ? this.initDigest(arguments.length <= 0 ? void 0 : arguments[0]) : this.init()
                }
                return Object(r.a)(e, [{
                    key: "init",
                    value: function() {
                        this.xBuf = new Array(4),
                            this.reset()
                    }
                }, {
                    key: "initDigest",
                    value: function(e) {
                        this.xBuf = [].concat(e.xBuf),
                            this.xBufOff = e.xBufOff,
                            this.byteCount = e.byteCount,
                            s(e.X, 0, this.X, 0, e.X.length),
                            this.xOff = e.xOff,
                            s(e.v, 0, this.v, 0, e.v.length)
                    }
                }, {
                    key: "getDigestSize",
                    value: function() {
                        return this.DIGEST_LENGTH
                    }
                }, {
                    key: "reset",
                    value: function() {
                        this.byteCount = 0,
                            this.xBufOff = 0;
                        for (var e = Object.keys(this.xBuf), t = 0, n = e.length; t < n; t++)
                            this.xBuf[e[t]] = null;
                        s(this.v0, 0, this.v, 0, this.v0.length),
                            this.xOff = 0,
                            s(this.X0, 0, this.X, 0, this.X0.length)
                    }
                }, {
                    key: "processBlock",
                    value: function() {
                        var e, t = this.X, n = new Array(64);
                        for (e = 16; e < 68; e++)
                            t[e] = this.p1(t[e - 16] ^ t[e - 9] ^ this.rotate(t[e - 3], 15)) ^ this.rotate(t[e - 13], 7) ^ t[e - 6];
                        for (e = 0; e < 64; e++)
                            n[e] = t[e] ^ t[e + 4];
                        var i, r, o, a, c, u = this.v, h = this.v_;
                        for (s(u, 0, h, 0, this.v0.length),
                                 e = 0; e < 16; e++)
                            c = this.rotate(h[0], 12),
                                i = l.parse(l.parse(c + h[4]) + this.rotate(this.T_00_15, e)),
                                r = (i = this.rotate(i, 7)) ^ c,
                                o = l.parse(l.parse(this.ff_00_15(h[0], h[1], h[2]) + h[3]) + r) + n[e],
                                a = l.parse(l.parse(this.gg_00_15(h[4], h[5], h[6]) + h[7]) + i) + t[e],
                                h[3] = h[2],
                                h[2] = this.rotate(h[1], 9),
                                h[1] = h[0],
                                h[0] = o,
                                h[7] = h[6],
                                h[6] = this.rotate(h[5], 19),
                                h[5] = h[4],
                                h[4] = this.p0(a);
                        for (e = 16; e < 64; e++)
                            c = this.rotate(h[0], 12),
                                i = l.parse(l.parse(c + h[4]) + this.rotate(this.T_16_63, e)),
                                r = (i = this.rotate(i, 7)) ^ c,
                                o = l.parse(l.parse(this.ff_16_63(h[0], h[1], h[2]) + h[3]) + r) + n[e],
                                a = l.parse(l.parse(this.gg_16_63(h[4], h[5], h[6]) + h[7]) + i) + t[e],
                                h[3] = h[2],
                                h[2] = this.rotate(h[1], 9),
                                h[1] = h[0],
                                h[0] = o,
                                h[7] = h[6],
                                h[6] = this.rotate(h[5], 19),
                                h[5] = h[4],
                                h[4] = this.p0(a);
                        for (e = 0; e < 8; e++)
                            u[e] ^= l.parse(h[e]);
                        this.xOff = 0,
                            s(this.X0, 0, this.X, 0, this.X0.length)
                    }
                }, {
                    key: "processWord",
                    value: function(e, t) {
                        var n = e[t] << 24;
                        n |= (255 & e[++t]) << 16,
                            n |= (255 & e[++t]) << 8,
                            n |= 255 & e[++t],
                            this.X[this.xOff] = n,
                        16 == ++this.xOff && this.processBlock()
                    }
                }, {
                    key: "processLength",
                    value: function(e) {
                        this.xOff > 14 && this.processBlock(),
                            this.X[14] = this.urShiftLong(e, 32),
                            this.X[15] = 4294967295 & e
                    }
                }, {
                    key: "intToBigEndian",
                    value: function(e, t, n) {
                        t[n] = 255 & l.parseByte(this.urShift(e, 24)),
                            t[++n] = 255 & l.parseByte(this.urShift(e, 16)),
                            t[++n] = 255 & l.parseByte(this.urShift(e, 8)),
                            t[++n] = 255 & l.parseByte(e)
                    }
                }, {
                    key: "doFinal",
                    value: function(e, t) {
                        this.finish();
                        for (var n = 0; n < 8; n++)
                            this.intToBigEndian(this.v[n], e, t + 4 * n);
                        return this.reset(),
                            this.DIGEST_LENGTH
                    }
                }, {
                    key: "update",
                    value: function(e) {
                        this.xBuf[this.xBufOff++] = e,
                        this.xBufOff === this.xBuf.length && (this.processWord(this.xBuf, 0),
                            this.xBufOff = 0),
                            this.byteCount++
                    }
                }, {
                    key: "blockUpdate",
                    value: function(e, t, n) {
                        for (; 0 !== this.xBufOff && n > 0; )
                            this.update(e[t]),
                                t++,
                                n--;
                        for (; n > this.xBuf.length; )
                            this.processWord(e, t),
                                t += this.xBuf.length,
                                n -= this.xBuf.length,
                                this.byteCount += this.xBuf.length;
                        for (; n > 0; )
                            this.update(e[t]),
                                t++,
                                n--
                    }
                }, {
                    key: "finish",
                    value: function() {
                        var e = this.byteCount << 3;
                        for (this.update(128); 0 !== this.xBufOff; )
                            this.update(0);
                        this.processLength(e),
                            this.processBlock()
                    }
                }, {
                    key: "rotate",
                    value: function(e, t) {
                        return e << t | this.urShift(e, 32 - t)
                    }
                }, {
                    key: "p0",
                    value: function(e) {
                        return e ^ this.rotate(e, 9) ^ this.rotate(e, 17)
                    }
                }, {
                    key: "p1",
                    value: function(e) {
                        return e ^ this.rotate(e, 15) ^ this.rotate(e, 23)
                    }
                }, {
                    key: "ff_00_15",
                    value: function(e, t, n) {
                        return e ^ t ^ n
                    }
                }, {
                    key: "ff_16_63",
                    value: function(e, t, n) {
                        return e & t | e & n | t & n
                    }
                }, {
                    key: "gg_00_15",
                    value: function(e, t, n) {
                        return e ^ t ^ n
                    }
                }, {
                    key: "gg_16_63",
                    value: function(e, t, n) {
                        return e & t | ~e & n
                    }
                }, {
                    key: "urShift",
                    value: function(e, t) {
                        return (e > l.maxValue || e < l.minValue) && (e = l.parse(e)),
                        e >>> t
                    }
                }, {
                    key: "urShiftLong",
                    value: function(e, t) {
                        var n, i = new o;
                        if (i.fromInt(e),
                        i.signum() >= 0)
                            n = i.shiftRight(t).intValue();
                        else {
                            var r = new o;
                            r.fromInt(2);
                            var a = ~t
                                , s = "";
                            if (a < 0) {
                                for (var l = 64 + a, c = 0; c < l; c++)
                                    s += "0";
                                var u = new o;
                                u.fromInt(e >> t);
                                var h = new o("10" + s,2);
                                s = h.toRadix(10),
                                    n = h.add(u).toRadix(10)
                            } else
                                n = (e >> t) + (s = r.shiftLeft(~t).intValue())
                        }
                        return n
                    }
                }, {
                    key: "getZ",
                    value: function(e, t) {
                        var n = a.parseUtf8StringToHex("1234567812345678")
                            , i = 4 * n.length;
                        this.update(i >> 8 & 255),
                            this.update(255 & i);
                        var r = a.hexToArray(n);
                        this.blockUpdate(r, 0, r.length);
                        var o = a.hexToArray(e.curve.a.toBigInteger().toRadix(16))
                            , s = a.hexToArray(e.curve.b.toBigInteger().toRadix(16))
                            , l = a.hexToArray(e.getX().toBigInteger().toRadix(16))
                            , c = a.hexToArray(e.getY().toBigInteger().toRadix(16))
                            , u = a.hexToArray(t.substr(0, 64))
                            , h = a.hexToArray(t.substr(64, 64));
                        this.blockUpdate(o, 0, o.length),
                            this.blockUpdate(s, 0, s.length),
                            this.blockUpdate(l, 0, l.length),
                            this.blockUpdate(c, 0, c.length),
                            this.blockUpdate(u, 0, u.length),
                            this.blockUpdate(h, 0, h.length);
                        var d = new Array(this.getDigestSize());
                        return this.doFinal(d, 0),
                            d
                    }
                }]),
                    e
            }()
        },
        c747: function(e, t, n) {
            "use strict";
            n.r(t),
                n.d(t, "SM2Cipher", (function() {
                        return l
                    }
                ));
            var i = n("d225")
                , r = n("b0b4")
                , o = n("f33e").BigInteger
                , a = n("4d2d").SM3Digest
                , s = n("b381")
                , l = function() {
                function e() {
                    Object(i.a)(this, e),
                        this.ct = 1,
                        this.p2 = null,
                        this.sm3keybase = null,
                        this.sm3c3 = null,
                        this.key = new Array(32),
                        this.keyOff = 0
                }
                return Object(r.a)(e, [{
                    key: "reset",
                    value: function() {
                        this.sm3keybase = new a,
                            this.sm3c3 = new a;
                        var e = s.hexToArray(this.p2.getX().toBigInteger().toRadix(16))
                            , t = s.hexToArray(this.p2.getY().toBigInteger().toRadix(16));
                        this.sm3keybase.blockUpdate(e, 0, e.length),
                            this.sm3c3.blockUpdate(e, 0, e.length),
                            this.sm3keybase.blockUpdate(t, 0, t.length),
                            this.ct = 1,
                            this.nextKey()
                    }
                }, {
                    key: "nextKey",
                    value: function() {
                        var e = new a(this.sm3keybase);
                        e.update(this.ct >> 24 & 255),
                            e.update(this.ct >> 16 & 255),
                            e.update(this.ct >> 8 & 255),
                            e.update(255 & this.ct),
                            e.doFinal(this.key, 0),
                            this.keyOff = 0,
                            this.ct++
                    }
                }, {
                    key: "initEncipher",
                    value: function(e) {
                        var t = s.generateKeyPairHex()
                            , n = new o(t.privateKey,16)
                            , i = t.publicKey;
                        return this.p2 = e.multiply(n),
                            this.reset(),
                        i.length > 128 && (i = i.substr(i.length - 128)),
                            i
                    }
                }, {
                    key: "encryptBlock",
                    value: function(e) {
                        this.sm3c3.blockUpdate(e, 0, e.length);
                        for (var t = 0; t < e.length; t++)
                            this.keyOff === this.key.length && this.nextKey(),
                                e[t] ^= 255 & this.key[this.keyOff++]
                    }
                }, {
                    key: "initDecipher",
                    value: function(e, t) {
                        this.p2 = t.multiply(e),
                            this.reset()
                    }
                }, {
                    key: "decryptBlock",
                    value: function(e) {
                        for (var t = 0; t < e.length; t++)
                            this.keyOff === this.key.length && this.nextKey(),
                                e[t] ^= 255 & this.key[this.keyOff++];
                        this.sm3c3.blockUpdate(e, 0, e.length)
                    }
                }, {
                    key: "doFinal",
                    value: function(e) {
                        var t = s.hexToArray(this.p2.getY().toBigInteger().toRadix(16));
                        this.sm3c3.blockUpdate(t, 0, t.length),
                            this.sm3c3.doFinal(e, 0),
                            this.reset()
                    }
                }, {
                    key: "createPoint",
                    value: function(e, t) {
                        var n = "04" + e + t;
                        return s.getGlobalCurve().decodePointHex(n)
                    }
                }]),
                    e
            }()
        },
        b0b4: function(e, t, n) {
            "use strict";
            n.d(t, "a", (function() {
                    return a
                }
            ));
            var i = n("85f2")
                , r = n.n(i);
            function o(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1,
                        i.configurable = !0,
                    "value"in i && (i.writable = !0),
                        r()(e, i.key, i)
                }
            }
            function a(e, t, n) {
                return t && o(e.prototype, t),
                n && o(e, n),
                    e
            }
        },
        "85f2": function(e, t, n) {
            e.exports = n("454f")
        },
        "454f": function(e, t, n) {
            n("46a7");
            var i = n("584a").Object;
            e.exports = function(e, t, n) {
                return i.defineProperty(e, t, n)
            }
        },
        "46a7": function(e, t, n) {
            var i = n("63b6");
            i(i.S + i.F * !n("8e60"), "Object", {
                defineProperty: n("d9f6").f
            })
        },
        "63b6": function(e, t, n) {
            var i = n("e53d")
                , r = n("584a")
                , o = n("d864")
                , a = n("35e8")
                , s = n("07e3")
                , l = function(e, t, n) {
                var c, u, h, d = e & l.F, f = e & l.G, p = e & l.S, m = e & l.P, v = e & l.B, g = e & l.W, b = f ? r : r[t] || (r[t] = {}), y = b.prototype, A = f ? i : p ? i[t] : (i[t] || {}).prototype;
                for (c in f && (n = t),
                    n)
                    (u = !d && A && void 0 !== A[c]) && s(b, c) || (h = u ? A[c] : n[c],
                        b[c] = f && "function" != typeof A[c] ? n[c] : v && u ? o(h, i) : g && A[c] == h ? function(e) {
                            var t = function(t, n, i) {
                                if (this instanceof e) {
                                    switch (arguments.length) {
                                        case 0:
                                            return new e;
                                        case 1:
                                            return new e(t);
                                        case 2:
                                            return new e(t,n)
                                    }
                                    return new e(t,n,i)
                                }
                                return e.apply(this, arguments)
                            };
                            return t.prototype = e.prototype,
                                t
                        }(h) : m && "function" == typeof h ? o(Function.call, h) : h,
                    m && ((b.virtual || (b.virtual = {}))[c] = h,
                    e & l.R && y && !y[c] && a(y, c, h)))
            };
            l.F = 1,
                l.G = 2,
                l.S = 4,
                l.P = 8,
                l.B = 16,
                l.W = 32,
                l.U = 64,
                l.R = 128,
                e.exports = l
        },
        "07e3": function(e, t) {
            var n = {}.hasOwnProperty;
            e.exports = function(e, t) {
                return n.call(e, t)
            }
        },
        "35e8": function(e, t, n) {
            var i = n("d9f6")
                , r = n("aebd");
            e.exports = n("8e60") ? function(e, t, n) {
                    return i.f(e, t, r(1, n))
                }
                : function(e, t, n) {
                    return e[t] = n,
                        e
                }
        },
        aebd: function(e, t) {
            e.exports = function(e, t) {
                return {
                    enumerable: !(1 & e),
                    configurable: !(2 & e),
                    writable: !(4 & e),
                    value: t
                }
            }
        },
        d9f6: function(e, t, n) {
            var i = n("e4ae")
                , r = n("794b")
                , o = n("1bc3")
                , a = Object.defineProperty;
            t.f = n("8e60") ? Object.defineProperty : function(e, t, n) {
                if (i(e),
                    t = o(t, !0),
                    i(n),
                    r)
                    try {
                        return a(e, t, n)
                    } catch (e) {}
                if ("get"in n || "set"in n)
                    throw TypeError("Accessors not supported!");
                return "value"in n && (e[t] = n.value),
                    e
            }
        },
        "1bc3": function(e, t, n) {
            var i = n("f772");
            e.exports = function(e, t) {
                if (!i(e))
                    return e;
                var n, r;
                if (t && "function" == typeof (n = e.toString) && !i(r = n.call(e)))
                    return r;
                if ("function" == typeof (n = e.valueOf) && !i(r = n.call(e)))
                    return r;
                if (!t && "function" == typeof (n = e.toString) && !i(r = n.call(e)))
                    return r;
                throw TypeError("Can't convert object to primitive value")
            }
        },
        "794b": function(e, t, n) {
            e.exports = !n("8e60") && !n("294c")((function() {
                    return 7 != Object.defineProperty(n("1ec9")("div"), "a", {
                        get: function() {
                            return 7
                        }
                    }).a
                }
            ))
        },
        "8e60": function(e, t, n) {
            e.exports = !n("294c")((function() {
                    return 7 != Object.defineProperty({}, "a", {
                        get: function() {
                            return 7
                        }
                    }).a
                }
            ))
        },
        "294c": function(e, t) {
            e.exports = function(e) {
                try {
                    return !!e()
                } catch (e) {
                    return !0
                }
            }
        },
        e4ae: function(e, t, n) {
            var i = n("f772");
            e.exports = function(e) {
                if (!i(e))
                    throw TypeError(e + " is not an object!");
                return e
            }
        },
        f772: function(e, t) {
            e.exports = function(e) {
                return "object" == typeof e ? null !== e : "function" == typeof e
            }
        },
        d864: function(e, t, n) {
            var i = n("79aa");
            e.exports = function(e, t, n) {
                if (i(e),
                void 0 === t)
                    return e;
                switch (n) {
                    case 1:
                        return function(n) {
                            return e.call(t, n)
                        }
                            ;
                    case 2:
                        return function(n, i) {
                            return e.call(t, n, i)
                        }
                            ;
                    case 3:
                        return function(n, i, r) {
                            return e.call(t, n, i, r)
                        }
                }
                return function() {
                    return e.apply(t, arguments)
                }
            }
        },
        "79aa": function(e, t) {
            e.exports = function(e) {
                if ("function" != typeof e)
                    throw TypeError(e + " is not a function!");
                return e
            }
        },
        "584a": function(e, t) {
            var n = e.exports = {
                version: "2.6.11"
            };
            "number" == typeof __e && (__e = n)
        },
        e53d: function(e, t) {
            var n = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
            "number" == typeof __g && (__g = n)
        },
        d225: function(e, t, n) {
            "use strict";
            function i(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            n.d(t, "a", (function() {
                    return i
                }
            ))
        },
        b381: function(e, t, n) {
            "use strict";
            n.r(t),
                n.d(t, "getGlobalCurve", (function() {
                        return g
                    }
                )),
                n.d(t, "generateEcparam", (function() {
                        return b
                    }
                )),
                n.d(t, "generateKeyPairHex", (function() {
                        return y
                    }
                )),
                n.d(t, "parseUtf8StringToHex", (function() {
                        return A
                    }
                )),
                n.d(t, "parseArrayBufferToHex", (function() {
                        return w
                    }
                )),
                n.d(t, "leftPad", (function() {
                        return x
                    }
                )),
                n.d(t, "arrayToHex", (function() {
                        return C
                    }
                )),
                n.d(t, "arrayToUtf8", (function() {
                        return _
                    }
                )),
                n.d(t, "hexToArray", (function() {
                        return k
                    }
                ))
                // n("34ef"),
                // n("6b54");
            var i = n("d225")
                , r = n("b0b4")
                , o = n("f33e").BigInteger
                , a = new o("3")
                , s = function() {
                function e(t, n) {
                    Object(i.a)(this, e),
                        this.x = n,
                        this.q = t
                }
                return Object(r.a)(e, [{
                    key: "equals",
                    value: function(e) {
                        return e === this || this.q.equals(e.q) && this.x.equals(e.x)
                    }
                }, {
                    key: "toBigInteger",
                    value: function() {
                        return this.x
                    }
                }, {
                    key: "negate",
                    value: function() {
                        return new e(this.q,this.x.negate().mod(this.q))
                    }
                }, {
                    key: "add",
                    value: function(t) {
                        return new e(this.q,this.x.add(t.toBigInteger()).mod(this.q))
                    }
                }, {
                    key: "subtract",
                    value: function(t) {
                        return new e(this.q,this.x.subtract(t.toBigInteger()).mod(this.q))
                    }
                }, {
                    key: "multiply",
                    value: function(t) {
                        return new e(this.q,this.x.multiply(t.toBigInteger()).mod(this.q))
                    }
                }, {
                    key: "divide",
                    value: function(t) {
                        return new e(this.q,this.x.multiply(t.toBigInteger().modInverse(this.q)).mod(this.q))
                    }
                }, {
                    key: "square",
                    value: function() {
                        return new e(this.q,this.x.square().mod(this.q))
                    }
                }]),
                    e
            }()
                , l = function() {
                function e(t, n, r, a) {
                    Object(i.a)(this, e),
                        this.curve = t,
                        this.x = n,
                        this.y = r,
                        this.z = null == a ? o.ONE : a,
                        this.zinv = null
                }
                return Object(r.a)(e, [{
                    key: "getX",
                    value: function() {
                        return null === this.zinv && (this.zinv = this.z.modInverse(this.curve.q)),
                            this.curve.fromBigInteger(this.x.toBigInteger().multiply(this.zinv).mod(this.curve.q))
                    }
                }, {
                    key: "getY",
                    value: function() {
                        return null === this.zinv && (this.zinv = this.z.modInverse(this.curve.q)),
                            this.curve.fromBigInteger(this.y.toBigInteger().multiply(this.zinv).mod(this.curve.q))
                    }
                }, {
                    key: "equals",
                    value: function(e) {
                        return e === this || (this.isInfinity() ? e.isInfinity() : e.isInfinity() ? this.isInfinity() : !!e.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(e.z)).mod(this.curve.q).equals(o.ZERO) && e.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(e.z)).mod(this.curve.q).equals(o.ZERO))
                    }
                }, {
                    key: "isInfinity",
                    value: function() {
                        return null === this.x && null === this.y || this.z.equals(o.ZERO) && !this.y.toBigInteger().equals(o.ZERO)
                    }
                }, {
                    key: "negate",
                    value: function() {
                        return new e(this.curve,this.x,this.y.negate(),this.z)
                    }
                }, {
                    key: "add",
                    value: function(t) {
                        if (this.isInfinity())
                            return t;
                        if (t.isInfinity())
                            return this;
                        var n = this.x.toBigInteger()
                            , i = this.y.toBigInteger()
                            , r = this.z
                            , a = t.x.toBigInteger()
                            , s = t.y.toBigInteger()
                            , l = t.z
                            , c = this.curve.q
                            , u = n.multiply(l).mod(c)
                            , h = a.multiply(r).mod(c)
                            , d = u.subtract(h)
                            , f = i.multiply(l).mod(c)
                            , p = s.multiply(r).mod(c)
                            , m = f.subtract(p);
                        if (o.ZERO.equals(d))
                            return o.ZERO.equals(m) ? this.twice() : this.curve.infinity;
                        var v = u.add(h)
                            , g = r.multiply(l).mod(c)
                            , b = d.square().mod(c)
                            , y = d.multiply(b).mod(c)
                            , A = g.multiply(m.square()).subtract(v.multiply(b)).mod(c)
                            , w = d.multiply(A).mod(c)
                            , x = m.multiply(b.multiply(u).subtract(A)).subtract(f.multiply(y)).mod(c)
                            , C = y.multiply(g).mod(c);
                        return new e(this.curve,this.curve.fromBigInteger(w),this.curve.fromBigInteger(x),C)
                    }
                }, {
                    key: "twice",
                    value: function() {
                        if (this.isInfinity())
                            return this;
                        if (!this.y.toBigInteger().signum())
                            return this.curve.infinity;
                        var t = this.x.toBigInteger()
                            , n = this.y.toBigInteger()
                            , i = this.z
                            , r = this.curve.q
                            , o = this.curve.a.toBigInteger()
                            , s = t.square().multiply(a).add(o.multiply(i.square())).mod(r)
                            , l = n.shiftLeft(1).multiply(i).mod(r)
                            , c = n.square().mod(r)
                            , u = c.multiply(t).multiply(i).mod(r)
                            , h = l.square().mod(r)
                            , d = s.square().subtract(u.shiftLeft(3)).mod(r)
                            , f = l.multiply(d).mod(r)
                            , p = s.multiply(u.shiftLeft(2).subtract(d)).subtract(h.shiftLeft(1).multiply(c)).mod(r)
                            , m = l.multiply(h).mod(r);
                        return new e(this.curve,this.curve.fromBigInteger(f),this.curve.fromBigInteger(p),m)
                    }
                }, {
                    key: "multiply",
                    value: function(e) {
                        if (this.isInfinity())
                            return this;
                        if (!e.signum())
                            return this.curve.infinity;
                        for (var t = e.multiply(a), n = this.negate(), i = this, r = t.bitLength() - 2; r > 0; r--) {
                            i = i.twice();
                            var o = t.testBit(r);
                            o !== e.testBit(r) && (i = i.add(o ? this : n))
                        }
                        return i
                    }
                }]),
                    e
            }()
                , c = function() {
                function e(t, n, r) {
                    Object(i.a)(this, e),
                        this.q = t,
                        this.a = this.fromBigInteger(n),
                        this.b = this.fromBigInteger(r),
                        this.infinity = new l(this,null,null)
                }
                return Object(r.a)(e, [{
                    key: "equals",
                    value: function(e) {
                        return e === this || this.q.equals(e.q) && this.a.equals(e.a) && this.b.equals(e.b)
                    }
                }, {
                    key: "fromBigInteger",
                    value: function(e) {
                        return new s(this.q,e)
                    }
                }, {
                    key: "decodePointHex",
                    value: function(e) {
                        switch (parseInt(e.substr(0, 2), 16)) {
                            case 0:
                                return this.infinity;
                            case 2:
                            case 3:
                                return null;
                            case 4:
                            case 6:
                            case 7:
                                var t = (e.length - 2) / 2
                                    , n = e.substr(2, t)
                                    , i = e.substr(t + 2, t);
                                return new l(this,this.fromBigInteger(new o(n,16)),this.fromBigInteger(new o(i,16)));
                            default:
                                return null
                        }
                    }
                }]),
                    e
            }()
                , u = n("f33e")
                , h = u.BigInteger
                , d = new (0,
                u.SecureRandom)
                , f = b()
                , p = f.curve
                , m = f.G
                , v = f.n;
            function g() {
                return p
            }
            function b() {
                var e = new h("FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00000000FFFFFFFFFFFFFFFF",16)
                    , t = new h("FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00000000FFFFFFFFFFFFFFFC",16)
                    , n = new h("28E9FA9E9D9F5E344D5A9E4BCF6509A7F39789F515AB8F92DDBCBD414D940E93",16)
                    , i = new c(e,t,n);
                return {
                    curve: i,
                    G: i.decodePointHex("0432C4AE2C1F1981195F9904466A39C9948FE30BBFF2660BE1715A4589334C74C7BC3736A2F4F6779C59BDCEE36B692153D0A9877CC62A474002DF32E52139F0A0"),
                    n: new h("FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFF7203DF6B21C6052B53BBF40939D54123",16)
                }
            }
            function y() {
                var e = new h(v.bitLength(),d).mod(v.subtract(h.ONE)).add(h.ONE)
                    , t = x(e.toString(16), 64)
                    , n = m.multiply(e);
                return {
                    privateKey: t,
                    publicKey: "04" + x(n.getX().toBigInteger().toString(16), 64) + x(n.getY().toBigInteger().toString(16), 64)
                }
            }
            function A(e) {
                for (var t = (e = unescape(encodeURIComponent(e))).length, n = [], i = 0; i < t; i++)
                    n[i >>> 2] |= (255 & e.charCodeAt(i)) << 24 - i % 4 * 8;
                for (var r = [], o = 0; o < t; o++) {
                    var a = n[o >>> 2] >>> 24 - o % 4 * 8 & 255;
                    r.push((a >>> 4).toString(16)),
                        r.push((15 & a).toString(16))
                }
                return r.join("")
            }
            function w(e) {
                return Array.prototype.map.call(new Uint8Array(e), (function(e) {
                        return ("00" + e.toString(16)).slice(-2)
                    }
                )).join("")
            }
            function x(e, t) {
                return e.length >= t ? e : new Array(t - e.length + 1).join("0") + e
            }
            function C(e) {
                for (var t = [], n = 0, i = 0; i < 2 * e.length; i += 2)
                    t[i >>> 3] |= parseInt(e[n], 10) << 24 - i % 8 * 4,
                        n++;
                for (var r = [], o = 0; o < e.length; o++) {
                    var a = t[o >>> 2] >>> 24 - o % 4 * 8 & 255;
                    r.push((a >>> 4).toString(16)),
                        r.push((15 & a).toString(16))
                }
                return r.join("")
            }
            function _(e) {
                for (var t = [], n = 0, i = 0; i < 2 * e.length; i += 2)
                    t[i >>> 3] |= parseInt(e[n], 10) << 24 - i % 8 * 4,
                        n++;
                try {
                    for (var r = [], o = 0; o < e.length; o++) {
                        var a = t[o >>> 2] >>> 24 - o % 4 * 8 & 255;
                        r.push(String.fromCharCode(a))
                    }
                    return decodeURIComponent(escape(r.join("")))
                } catch (e) {
                    throw new Error("Malformed UTF-8 data")
                }
            }
            function k(e) {
                var t = []
                    , n = e.length;
                n % 2 != 0 && (e = x(e, n + 1)),
                    n = e.length;
                for (var i = 0; i < n; i += 2)
                    t.push(parseInt(e.substr(i, 2), 16));
                return t
            }
            t.default = {
                getGlobalCurve: g,
                generateEcparam: b,
                generateKeyPairHex: y,
                parseUtf8StringToHex: A,
                parseArrayBufferToHex: w,
                leftPad: x,
                arrayToHex: C,
                arrayToUtf8: _,
                hexToArray: k
            }
        },
        f33e: function(e, t, n) {
            (function() {
                    var t;
                    function n(e, t, n) {
                        null != e && ("number" == typeof e ? this.fromNumber(e, t, n) : null == t && "string" != typeof e ? this.fromString(e, 256) : this.fromString(e, t))
                    }
                    function i() {
                        return new n(null)
                    }
                    var r = "undefined" != typeof navigator;
                    r && "Microsoft Internet Explorer" == navigator.appName ? (n.prototype.am = function(e, t, n, i, r, o) {
                        for (var a = 32767 & t, s = t >> 15; --o >= 0; ) {
                            var l = 32767 & this[e]
                                , c = this[e++] >> 15
                                , u = s * l + c * a;
                            r = ((l = a * l + ((32767 & u) << 15) + n[i] + (1073741823 & r)) >>> 30) + (u >>> 15) + s * c + (r >>> 30),
                                n[i++] = 1073741823 & l
                        }
                        return r
                    }
                        ,
                        t = 30) : r && "Netscape" != navigator.appName ? (n.prototype.am = function(e, t, n, i, r, o) {
                        for (; --o >= 0; ) {
                            var a = t * this[e++] + n[i] + r;
                            r = Math.floor(a / 67108864),
                                n[i++] = 67108863 & a
                        }
                        return r
                    }
                        ,
                        t = 26) : (n.prototype.am = function(e, t, n, i, r, o) {
                        for (var a = 16383 & t, s = t >> 14; --o >= 0; ) {
                            var l = 16383 & this[e]
                                , c = this[e++] >> 14
                                , u = s * l + c * a;
                            r = ((l = a * l + ((16383 & u) << 14) + n[i] + r) >> 28) + (u >> 14) + s * c,
                                n[i++] = 268435455 & l
                        }
                        return r
                    }
                        ,
                        t = 28),
                        n.prototype.DB = t,
                        n.prototype.DM = (1 << t) - 1,
                        n.prototype.DV = 1 << t,
                        n.prototype.FV = Math.pow(2, 52),
                        n.prototype.F1 = 52 - t,
                        n.prototype.F2 = 2 * t - 52;
                    var o, a, s = "0123456789abcdefghijklmnopqrstuvwxyz", l = new Array;
                    for (o = "0".charCodeAt(0),
                             a = 0; a <= 9; ++a)
                        l[o++] = a;
                    for (o = "a".charCodeAt(0),
                             a = 10; a < 36; ++a)
                        l[o++] = a;
                    for (o = "A".charCodeAt(0),
                             a = 10; a < 36; ++a)
                        l[o++] = a;
                    function c(e) {
                        return s.charAt(e)
                    }
                    function u(e, t) {
                        var n = l[e.charCodeAt(t)];
                        return null == n ? -1 : n
                    }
                    function h(e) {
                        var t = i();
                        return t.fromInt(e),
                            t
                    }
                    function d(e) {
                        var t, n = 1;
                        return 0 != (t = e >>> 16) && (e = t,
                            n += 16),
                        0 != (t = e >> 8) && (e = t,
                            n += 8),
                        0 != (t = e >> 4) && (e = t,
                            n += 4),
                        0 != (t = e >> 2) && (e = t,
                            n += 2),
                        0 != (t = e >> 1) && (e = t,
                            n += 1),
                            n
                    }
                    function f(e) {
                        this.m = e
                    }
                    function p(e) {
                        this.m = e,
                            this.mp = e.invDigit(),
                            this.mpl = 32767 & this.mp,
                            this.mph = this.mp >> 15,
                            this.um = (1 << e.DB - 15) - 1,
                            this.mt2 = 2 * e.t
                    }
                    function m(e, t) {
                        return e & t
                    }
                    function v(e, t) {
                        return e | t
                    }
                    function g(e, t) {
                        return e ^ t
                    }
                    function b(e, t) {
                        return e & ~t
                    }
                    function y(e) {
                        if (0 == e)
                            return -1;
                        var t = 0;
                        return 0 == (65535 & e) && (e >>= 16,
                            t += 16),
                        0 == (255 & e) && (e >>= 8,
                            t += 8),
                        0 == (15 & e) && (e >>= 4,
                            t += 4),
                        0 == (3 & e) && (e >>= 2,
                            t += 2),
                        0 == (1 & e) && ++t,
                            t
                    }
                    function A(e) {
                        for (var t = 0; 0 != e; )
                            e &= e - 1,
                                ++t;
                        return t
                    }
                    function w() {}
                    function x(e) {
                        return e
                    }
                    function C(e) {
                        this.r2 = i(),
                            this.q3 = i(),
                            n.ONE.dlShiftTo(2 * e.t, this.r2),
                            this.mu = this.r2.divide(e),
                            this.m = e
                    }
                    f.prototype.convert = function(e) {
                        return e.s < 0 || e.compareTo(this.m) >= 0 ? e.mod(this.m) : e
                    }
                        ,
                        f.prototype.revert = function(e) {
                            return e
                        }
                        ,
                        f.prototype.reduce = function(e) {
                            e.divRemTo(this.m, null, e)
                        }
                        ,
                        f.prototype.mulTo = function(e, t, n) {
                            e.multiplyTo(t, n),
                                this.reduce(n)
                        }
                        ,
                        f.prototype.sqrTo = function(e, t) {
                            e.squareTo(t),
                                this.reduce(t)
                        }
                        ,
                        p.prototype.convert = function(e) {
                            var t = i();
                            return e.abs().dlShiftTo(this.m.t, t),
                                t.divRemTo(this.m, null, t),
                            e.s < 0 && t.compareTo(n.ZERO) > 0 && this.m.subTo(t, t),
                                t
                        }
                        ,
                        p.prototype.revert = function(e) {
                            var t = i();
                            return e.copyTo(t),
                                this.reduce(t),
                                t
                        }
                        ,
                        p.prototype.reduce = function(e) {
                            for (; e.t <= this.mt2; )
                                e[e.t++] = 0;
                            for (var t = 0; t < this.m.t; ++t) {
                                var n = 32767 & e[t]
                                    , i = n * this.mpl + ((n * this.mph + (e[t] >> 15) * this.mpl & this.um) << 15) & e.DM;
                                for (e[n = t + this.m.t] += this.m.am(0, i, e, t, 0, this.m.t); e[n] >= e.DV; )
                                    e[n] -= e.DV,
                                        e[++n]++
                            }
                            e.clamp(),
                                e.drShiftTo(this.m.t, e),
                            e.compareTo(this.m) >= 0 && e.subTo(this.m, e)
                        }
                        ,
                        p.prototype.mulTo = function(e, t, n) {
                            e.multiplyTo(t, n),
                                this.reduce(n)
                        }
                        ,
                        p.prototype.sqrTo = function(e, t) {
                            e.squareTo(t),
                                this.reduce(t)
                        }
                        ,
                        n.prototype.copyTo = function(e) {
                            for (var t = this.t - 1; t >= 0; --t)
                                e[t] = this[t];
                            e.t = this.t,
                                e.s = this.s
                        }
                        ,
                        n.prototype.fromInt = function(e) {
                            this.t = 1,
                                this.s = e < 0 ? -1 : 0,
                                e > 0 ? this[0] = e : e < -1 ? this[0] = e + this.DV : this.t = 0
                        }
                        ,
                        n.prototype.fromString = function(e, t) {
                            var i;
                            if (16 == t)
                                i = 4;
                            else if (8 == t)
                                i = 3;
                            else if (256 == t)
                                i = 8;
                            else if (2 == t)
                                i = 1;
                            else if (32 == t)
                                i = 5;
                            else {
                                if (4 != t)
                                    return void this.fromRadix(e, t);
                                i = 2
                            }
                            this.t = 0,
                                this.s = 0;
                            for (var r = e.length, o = !1, a = 0; --r >= 0; ) {
                                var s = 8 == i ? 255 & e[r] : u(e, r);
                                s < 0 ? "-" == e.charAt(r) && (o = !0) : (o = !1,
                                    0 == a ? this[this.t++] = s : a + i > this.DB ? (this[this.t - 1] |= (s & (1 << this.DB - a) - 1) << a,
                                        this[this.t++] = s >> this.DB - a) : this[this.t - 1] |= s << a,
                                (a += i) >= this.DB && (a -= this.DB))
                            }
                            8 == i && 0 != (128 & e[0]) && (this.s = -1,
                            a > 0 && (this[this.t - 1] |= (1 << this.DB - a) - 1 << a)),
                                this.clamp(),
                            o && n.ZERO.subTo(this, this)
                        }
                        ,
                        n.prototype.clamp = function() {
                            for (var e = this.s & this.DM; this.t > 0 && this[this.t - 1] == e; )
                                --this.t
                        }
                        ,
                        n.prototype.dlShiftTo = function(e, t) {
                            var n;
                            for (n = this.t - 1; n >= 0; --n)
                                t[n + e] = this[n];
                            for (n = e - 1; n >= 0; --n)
                                t[n] = 0;
                            t.t = this.t + e,
                                t.s = this.s
                        }
                        ,
                        n.prototype.drShiftTo = function(e, t) {
                            for (var n = e; n < this.t; ++n)
                                t[n - e] = this[n];
                            t.t = Math.max(this.t - e, 0),
                                t.s = this.s
                        }
                        ,
                        n.prototype.lShiftTo = function(e, t) {
                            var n, i = e % this.DB, r = this.DB - i, o = (1 << r) - 1, a = Math.floor(e / this.DB), s = this.s << i & this.DM;
                            for (n = this.t - 1; n >= 0; --n)
                                t[n + a + 1] = this[n] >> r | s,
                                    s = (this[n] & o) << i;
                            for (n = a - 1; n >= 0; --n)
                                t[n] = 0;
                            t[a] = s,
                                t.t = this.t + a + 1,
                                t.s = this.s,
                                t.clamp()
                        }
                        ,
                        n.prototype.rShiftTo = function(e, t) {
                            t.s = this.s;
                            var n = Math.floor(e / this.DB);
                            if (n >= this.t)
                                t.t = 0;
                            else {
                                var i = e % this.DB
                                    , r = this.DB - i
                                    , o = (1 << i) - 1;
                                t[0] = this[n] >> i;
                                for (var a = n + 1; a < this.t; ++a)
                                    t[a - n - 1] |= (this[a] & o) << r,
                                        t[a - n] = this[a] >> i;
                                i > 0 && (t[this.t - n - 1] |= (this.s & o) << r),
                                    t.t = this.t - n,
                                    t.clamp()
                            }
                        }
                        ,
                        n.prototype.subTo = function(e, t) {
                            for (var n = 0, i = 0, r = Math.min(e.t, this.t); n < r; )
                                i += this[n] - e[n],
                                    t[n++] = i & this.DM,
                                    i >>= this.DB;
                            if (e.t < this.t) {
                                for (i -= e.s; n < this.t; )
                                    i += this[n],
                                        t[n++] = i & this.DM,
                                        i >>= this.DB;
                                i += this.s
                            } else {
                                for (i += this.s; n < e.t; )
                                    i -= e[n],
                                        t[n++] = i & this.DM,
                                        i >>= this.DB;
                                i -= e.s
                            }
                            t.s = i < 0 ? -1 : 0,
                                i < -1 ? t[n++] = this.DV + i : i > 0 && (t[n++] = i),
                                t.t = n,
                                t.clamp()
                        }
                        ,
                        n.prototype.multiplyTo = function(e, t) {
                            var i = this.abs()
                                , r = e.abs()
                                , o = i.t;
                            for (t.t = o + r.t; --o >= 0; )
                                t[o] = 0;
                            for (o = 0; o < r.t; ++o)
                                t[o + i.t] = i.am(0, r[o], t, o, 0, i.t);
                            t.s = 0,
                                t.clamp(),
                            this.s != e.s && n.ZERO.subTo(t, t)
                        }
                        ,
                        n.prototype.squareTo = function(e) {
                            for (var t = this.abs(), n = e.t = 2 * t.t; --n >= 0; )
                                e[n] = 0;
                            for (n = 0; n < t.t - 1; ++n) {
                                var i = t.am(n, t[n], e, 2 * n, 0, 1);
                                (e[n + t.t] += t.am(n + 1, 2 * t[n], e, 2 * n + 1, i, t.t - n - 1)) >= t.DV && (e[n + t.t] -= t.DV,
                                    e[n + t.t + 1] = 1)
                            }
                            e.t > 0 && (e[e.t - 1] += t.am(n, t[n], e, 2 * n, 0, 1)),
                                e.s = 0,
                                e.clamp()
                        }
                        ,
                        n.prototype.divRemTo = function(e, t, r) {
                            var o = e.abs();
                            if (!(o.t <= 0)) {
                                var a = this.abs();
                                if (a.t < o.t)
                                    return null != t && t.fromInt(0),
                                        void (null != r && this.copyTo(r));
                                null == r && (r = i());
                                var s = i()
                                    , l = this.s
                                    , c = e.s
                                    , u = this.DB - d(o[o.t - 1]);
                                u > 0 ? (o.lShiftTo(u, s),
                                    a.lShiftTo(u, r)) : (o.copyTo(s),
                                    a.copyTo(r));
                                var h = s.t
                                    , f = s[h - 1];
                                if (0 != f) {
                                    var p = f * (1 << this.F1) + (h > 1 ? s[h - 2] >> this.F2 : 0)
                                        , m = this.FV / p
                                        , v = (1 << this.F1) / p
                                        , g = 1 << this.F2
                                        , b = r.t
                                        , y = b - h
                                        , A = null == t ? i() : t;
                                    for (s.dlShiftTo(y, A),
                                         r.compareTo(A) >= 0 && (r[r.t++] = 1,
                                             r.subTo(A, r)),
                                             n.ONE.dlShiftTo(h, A),
                                             A.subTo(s, s); s.t < h; )
                                        s[s.t++] = 0;
                                    for (; --y >= 0; ) {
                                        var w = r[--b] == f ? this.DM : Math.floor(r[b] * m + (r[b - 1] + g) * v);
                                        if ((r[b] += s.am(0, w, r, y, 0, h)) < w)
                                            for (s.dlShiftTo(y, A),
                                                     r.subTo(A, r); r[b] < --w; )
                                                r.subTo(A, r)
                                    }
                                    null != t && (r.drShiftTo(h, t),
                                    l != c && n.ZERO.subTo(t, t)),
                                        r.t = h,
                                        r.clamp(),
                                    u > 0 && r.rShiftTo(u, r),
                                    l < 0 && n.ZERO.subTo(r, r)
                                }
                            }
                        }
                        ,
                        n.prototype.invDigit = function() {
                            if (this.t < 1)
                                return 0;
                            var e = this[0];
                            if (0 == (1 & e))
                                return 0;
                            var t = 3 & e;
                            return (t = (t = (t = (t = t * (2 - (15 & e) * t) & 15) * (2 - (255 & e) * t) & 255) * (2 - ((65535 & e) * t & 65535)) & 65535) * (2 - e * t % this.DV) % this.DV) > 0 ? this.DV - t : -t
                        }
                        ,
                        n.prototype.isEven = function() {
                            return 0 == (this.t > 0 ? 1 & this[0] : this.s)
                        }
                        ,
                        n.prototype.exp = function(e, t) {
                            if (e > 4294967295 || e < 1)
                                return n.ONE;
                            var r = i()
                                , o = i()
                                , a = t.convert(this)
                                , s = d(e) - 1;
                            for (a.copyTo(r); --s >= 0; )
                                if (t.sqrTo(r, o),
                                (e & 1 << s) > 0)
                                    t.mulTo(o, a, r);
                                else {
                                    var l = r;
                                    r = o,
                                        o = l
                                }
                            return t.revert(r)
                        }
                        ,
                        n.prototype.toString = function(e) {
                            if (this.s < 0)
                                return "-" + this.negate().toString(e);
                            var t;
                            if (16 == e)
                                t = 4;
                            else if (8 == e)
                                t = 3;
                            else if (2 == e)
                                t = 1;
                            else if (32 == e)
                                t = 5;
                            else {
                                if (4 != e)
                                    return this.toRadix(e);
                                t = 2
                            }
                            var n, i = (1 << t) - 1, r = !1, o = "", a = this.t, s = this.DB - a * this.DB % t;
                            if (a-- > 0)
                                for (s < this.DB && (n = this[a] >> s) > 0 && (r = !0,
                                    o = c(n)); a >= 0; )
                                    s < t ? (n = (this[a] & (1 << s) - 1) << t - s,
                                        n |= this[--a] >> (s += this.DB - t)) : (n = this[a] >> (s -= t) & i,
                                    s <= 0 && (s += this.DB,
                                        --a)),
                                    n > 0 && (r = !0),
                                    r && (o += c(n));
                            return r ? o : "0"
                        }
                        ,
                        n.prototype.negate = function() {
                            var e = i();
                            return n.ZERO.subTo(this, e),
                                e
                        }
                        ,
                        n.prototype.abs = function() {
                            return this.s < 0 ? this.negate() : this
                        }
                        ,
                        n.prototype.compareTo = function(e) {
                            var t = this.s - e.s;
                            if (0 != t)
                                return t;
                            var n = this.t;
                            if (0 != (t = n - e.t))
                                return this.s < 0 ? -t : t;
                            for (; --n >= 0; )
                                if (0 != (t = this[n] - e[n]))
                                    return t;
                            return 0
                        }
                        ,
                        n.prototype.bitLength = function() {
                            return this.t <= 0 ? 0 : this.DB * (this.t - 1) + d(this[this.t - 1] ^ this.s & this.DM)
                        }
                        ,
                        n.prototype.mod = function(e) {
                            var t = i();
                            return this.abs().divRemTo(e, null, t),
                            this.s < 0 && t.compareTo(n.ZERO) > 0 && e.subTo(t, t),
                                t
                        }
                        ,
                        n.prototype.modPowInt = function(e, t) {
                            var n;
                            return n = e < 256 || t.isEven() ? new f(t) : new p(t),
                                this.exp(e, n)
                        }
                        ,
                        n.ZERO = h(0),
                        n.ONE = h(1),
                        w.prototype.convert = x,
                        w.prototype.revert = x,
                        w.prototype.mulTo = function(e, t, n) {
                            e.multiplyTo(t, n)
                        }
                        ,
                        w.prototype.sqrTo = function(e, t) {
                            e.squareTo(t)
                        }
                        ,
                        C.prototype.convert = function(e) {
                            if (e.s < 0 || e.t > 2 * this.m.t)
                                return e.mod(this.m);
                            if (e.compareTo(this.m) < 0)
                                return e;
                            var t = i();
                            return e.copyTo(t),
                                this.reduce(t),
                                t
                        }
                        ,
                        C.prototype.revert = function(e) {
                            return e
                        }
                        ,
                        C.prototype.reduce = function(e) {
                            for (e.drShiftTo(this.m.t - 1, this.r2),
                                 e.t > this.m.t + 1 && (e.t = this.m.t + 1,
                                     e.clamp()),
                                     this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3),
                                     this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); e.compareTo(this.r2) < 0; )
                                e.dAddOffset(1, this.m.t + 1);
                            for (e.subTo(this.r2, e); e.compareTo(this.m) >= 0; )
                                e.subTo(this.m, e)
                        }
                        ,
                        C.prototype.mulTo = function(e, t, n) {
                            e.multiplyTo(t, n),
                                this.reduce(n)
                        }
                        ,
                        C.prototype.sqrTo = function(e, t) {
                            e.squareTo(t),
                                this.reduce(t)
                        }
                    ;
                    var _, k, S, O = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997], E = (1 << 26) / O[O.length - 1];
                    function D() {
                        var e;
                        e = (new Date).getTime(),
                            k[S++] ^= 255 & e,
                            k[S++] ^= e >> 8 & 255,
                            k[S++] ^= e >> 16 & 255,
                            k[S++] ^= e >> 24 & 255,
                        S >= F && (S -= F)
                    }
                    if (n.prototype.chunkSize = function(e) {
                        return Math.floor(Math.LN2 * this.DB / Math.log(e))
                    }
                        ,
                        n.prototype.toRadix = function(e) {
                            if (null == e && (e = 10),
                            0 == this.signum() || e < 2 || e > 36)
                                return "0";
                            var t = this.chunkSize(e)
                                , n = Math.pow(e, t)
                                , r = h(n)
                                , o = i()
                                , a = i()
                                , s = "";
                            for (this.divRemTo(r, o, a); o.signum() > 0; )
                                s = (n + a.intValue()).toString(e).substr(1) + s,
                                    o.divRemTo(r, o, a);
                            return a.intValue().toString(e) + s
                        }
                        ,
                        n.prototype.fromRadix = function(e, t) {
                            this.fromInt(0),
                            null == t && (t = 10);
                            for (var i = this.chunkSize(t), r = Math.pow(t, i), o = !1, a = 0, s = 0, l = 0; l < e.length; ++l) {
                                var c = u(e, l);
                                c < 0 ? "-" == e.charAt(l) && 0 == this.signum() && (o = !0) : (s = t * s + c,
                                ++a >= i && (this.dMultiply(r),
                                    this.dAddOffset(s, 0),
                                    a = 0,
                                    s = 0))
                            }
                            a > 0 && (this.dMultiply(Math.pow(t, a)),
                                this.dAddOffset(s, 0)),
                            o && n.ZERO.subTo(this, this)
                        }
                        ,
                        n.prototype.fromNumber = function(e, t, i) {
                            if ("number" == typeof t)
                                if (e < 2)
                                    this.fromInt(1);
                                else
                                    for (this.fromNumber(e, i),
                                         this.testBit(e - 1) || this.bitwiseTo(n.ONE.shiftLeft(e - 1), v, this),
                                         this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(t); )
                                        this.dAddOffset(2, 0),
                                        this.bitLength() > e && this.subTo(n.ONE.shiftLeft(e - 1), this);
                            else {
                                var r = new Array
                                    , o = 7 & e;
                                r.length = 1 + (e >> 3),
                                    t.nextBytes(r),
                                    o > 0 ? r[0] &= (1 << o) - 1 : r[0] = 0,
                                    this.fromString(r, 256)
                            }
                        }
                        ,
                        n.prototype.bitwiseTo = function(e, t, n) {
                            var i, r, o = Math.min(e.t, this.t);
                            for (i = 0; i < o; ++i)
                                n[i] = t(this[i], e[i]);
                            if (e.t < this.t) {
                                for (r = e.s & this.DM,
                                         i = o; i < this.t; ++i)
                                    n[i] = t(this[i], r);
                                n.t = this.t
                            } else {
                                for (r = this.s & this.DM,
                                         i = o; i < e.t; ++i)
                                    n[i] = t(r, e[i]);
                                n.t = e.t
                            }
                            n.s = t(this.s, e.s),
                                n.clamp()
                        }
                        ,
                        n.prototype.changeBit = function(e, t) {
                            var i = n.ONE.shiftLeft(e);
                            return this.bitwiseTo(i, t, i),
                                i
                        }
                        ,
                        n.prototype.addTo = function(e, t) {
                            for (var n = 0, i = 0, r = Math.min(e.t, this.t); n < r; )
                                i += this[n] + e[n],
                                    t[n++] = i & this.DM,
                                    i >>= this.DB;
                            if (e.t < this.t) {
                                for (i += e.s; n < this.t; )
                                    i += this[n],
                                        t[n++] = i & this.DM,
                                        i >>= this.DB;
                                i += this.s
                            } else {
                                for (i += this.s; n < e.t; )
                                    i += e[n],
                                        t[n++] = i & this.DM,
                                        i >>= this.DB;
                                i += e.s
                            }
                            t.s = i < 0 ? -1 : 0,
                                i > 0 ? t[n++] = i : i < -1 && (t[n++] = this.DV + i),
                                t.t = n,
                                t.clamp()
                        }
                        ,
                        n.prototype.dMultiply = function(e) {
                            this[this.t] = this.am(0, e - 1, this, 0, 0, this.t),
                                ++this.t,
                                this.clamp()
                        }
                        ,
                        n.prototype.dAddOffset = function(e, t) {
                            if (0 != e) {
                                for (; this.t <= t; )
                                    this[this.t++] = 0;
                                for (this[t] += e; this[t] >= this.DV; )
                                    this[t] -= this.DV,
                                    ++t >= this.t && (this[this.t++] = 0),
                                        ++this[t]
                            }
                        }
                        ,
                        n.prototype.multiplyLowerTo = function(e, t, n) {
                            var i, r = Math.min(this.t + e.t, t);
                            for (n.s = 0,
                                     n.t = r; r > 0; )
                                n[--r] = 0;
                            for (i = n.t - this.t; r < i; ++r)
                                n[r + this.t] = this.am(0, e[r], n, r, 0, this.t);
                            for (i = Math.min(e.t, t); r < i; ++r)
                                this.am(0, e[r], n, r, 0, t - r);
                            n.clamp()
                        }
                        ,
                        n.prototype.multiplyUpperTo = function(e, t, n) {
                            --t;
                            var i = n.t = this.t + e.t - t;
                            for (n.s = 0; --i >= 0; )
                                n[i] = 0;
                            for (i = Math.max(t - this.t, 0); i < e.t; ++i)
                                n[this.t + i - t] = this.am(t - i, e[i], n, 0, 0, this.t + i - t);
                            n.clamp(),
                                n.drShiftTo(1, n)
                        }
                        ,
                        n.prototype.modInt = function(e) {
                            if (e <= 0)
                                return 0;
                            var t = this.DV % e
                                , n = this.s < 0 ? e - 1 : 0;
                            if (this.t > 0)
                                if (0 == t)
                                    n = this[0] % e;
                                else
                                    for (var i = this.t - 1; i >= 0; --i)
                                        n = (t * n + this[i]) % e;
                            return n
                        }
                        ,
                        n.prototype.millerRabin = function(e) {
                            var t = this.subtract(n.ONE)
                                , r = t.getLowestSetBit();
                            if (r <= 0)
                                return !1;
                            var o = t.shiftRight(r);
                            (e = e + 1 >> 1) > O.length && (e = O.length);
                            for (var a = i(), s = 0; s < e; ++s) {
                                a.fromInt(O[Math.floor(Math.random() * O.length)]);
                                var l = a.modPow(o, this);
                                if (0 != l.compareTo(n.ONE) && 0 != l.compareTo(t)) {
                                    for (var c = 1; c++ < r && 0 != l.compareTo(t); )
                                        if (0 == (l = l.modPowInt(2, this)).compareTo(n.ONE))
                                            return !1;
                                    if (0 != l.compareTo(t))
                                        return !1
                                }
                            }
                            return !0
                        }
                        ,
                        n.prototype.clone = function() {
                            var e = i();
                            return this.copyTo(e),
                                e
                        }
                        ,
                        n.prototype.intValue = function() {
                            if (this.s < 0) {
                                if (1 == this.t)
                                    return this[0] - this.DV;
                                if (0 == this.t)
                                    return -1
                            } else {
                                if (1 == this.t)
                                    return this[0];
                                if (0 == this.t)
                                    return 0
                            }
                            return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0]
                        }
                        ,
                        n.prototype.byteValue = function() {
                            return 0 == this.t ? this.s : this[0] << 24 >> 24
                        }
                        ,
                        n.prototype.shortValue = function() {
                            return 0 == this.t ? this.s : this[0] << 16 >> 16
                        }
                        ,
                        n.prototype.signum = function() {
                            return this.s < 0 ? -1 : this.t <= 0 || 1 == this.t && this[0] <= 0 ? 0 : 1
                        }
                        ,
                        n.prototype.toByteArray = function() {
                            var e = this.t
                                , t = new Array;
                            t[0] = this.s;
                            var n, i = this.DB - e * this.DB % 8, r = 0;
                            if (e-- > 0)
                                for (i < this.DB && (n = this[e] >> i) != (this.s & this.DM) >> i && (t[r++] = n | this.s << this.DB - i); e >= 0; )
                                    i < 8 ? (n = (this[e] & (1 << i) - 1) << 8 - i,
                                        n |= this[--e] >> (i += this.DB - 8)) : (n = this[e] >> (i -= 8) & 255,
                                    i <= 0 && (i += this.DB,
                                        --e)),
                                    0 != (128 & n) && (n |= -256),
                                    0 == r && (128 & this.s) != (128 & n) && ++r,
                                    (r > 0 || n != this.s) && (t[r++] = n);
                            return t
                        }
                        ,
                        n.prototype.equals = function(e) {
                            return 0 == this.compareTo(e)
                        }
                        ,
                        n.prototype.min = function(e) {
                            return this.compareTo(e) < 0 ? this : e
                        }
                        ,
                        n.prototype.max = function(e) {
                            return this.compareTo(e) > 0 ? this : e
                        }
                        ,
                        n.prototype.and = function(e) {
                            var t = i();
                            return this.bitwiseTo(e, m, t),
                                t
                        }
                        ,
                        n.prototype.or = function(e) {
                            var t = i();
                            return this.bitwiseTo(e, v, t),
                                t
                        }
                        ,
                        n.prototype.xor = function(e) {
                            var t = i();
                            return this.bitwiseTo(e, g, t),
                                t
                        }
                        ,
                        n.prototype.andNot = function(e) {
                            var t = i();
                            return this.bitwiseTo(e, b, t),
                                t
                        }
                        ,
                        n.prototype.not = function() {
                            for (var e = i(), t = 0; t < this.t; ++t)
                                e[t] = this.DM & ~this[t];
                            return e.t = this.t,
                                e.s = ~this.s,
                                e
                        }
                        ,
                        n.prototype.shiftLeft = function(e) {
                            var t = i();
                            return e < 0 ? this.rShiftTo(-e, t) : this.lShiftTo(e, t),
                                t
                        }
                        ,
                        n.prototype.shiftRight = function(e) {
                            var t = i();
                            return e < 0 ? this.lShiftTo(-e, t) : this.rShiftTo(e, t),
                                t
                        }
                        ,
                        n.prototype.getLowestSetBit = function() {
                            for (var e = 0; e < this.t; ++e)
                                if (0 != this[e])
                                    return e * this.DB + y(this[e]);
                            return this.s < 0 ? this.t * this.DB : -1
                        }
                        ,
                        n.prototype.bitCount = function() {
                            for (var e = 0, t = this.s & this.DM, n = 0; n < this.t; ++n)
                                e += A(this[n] ^ t);
                            return e
                        }
                        ,
                        n.prototype.testBit = function(e) {
                            var t = Math.floor(e / this.DB);
                            return t >= this.t ? 0 != this.s : 0 != (this[t] & 1 << e % this.DB)
                        }
                        ,
                        n.prototype.setBit = function(e) {
                            return this.changeBit(e, v)
                        }
                        ,
                        n.prototype.clearBit = function(e) {
                            return this.changeBit(e, b)
                        }
                        ,
                        n.prototype.flipBit = function(e) {
                            return this.changeBit(e, g)
                        }
                        ,
                        n.prototype.add = function(e) {
                            var t = i();
                            return this.addTo(e, t),
                                t
                        }
                        ,
                        n.prototype.subtract = function(e) {
                            var t = i();
                            return this.subTo(e, t),
                                t
                        }
                        ,
                        n.prototype.multiply = function(e) {
                            var t = i();
                            return this.multiplyTo(e, t),
                                t
                        }
                        ,
                        n.prototype.divide = function(e) {
                            var t = i();
                            return this.divRemTo(e, t, null),
                                t
                        }
                        ,
                        n.prototype.remainder = function(e) {
                            var t = i();
                            return this.divRemTo(e, null, t),
                                t
                        }
                        ,
                        n.prototype.divideAndRemainder = function(e) {
                            var t = i()
                                , n = i();
                            return this.divRemTo(e, t, n),
                                new Array(t,n)
                        }
                        ,
                        n.prototype.modPow = function(e, t) {
                            var n, r, o = e.bitLength(), a = h(1);
                            if (o <= 0)
                                return a;
                            n = o < 18 ? 1 : o < 48 ? 3 : o < 144 ? 4 : o < 768 ? 5 : 6,
                                r = o < 8 ? new f(t) : t.isEven() ? new C(t) : new p(t);
                            var s = new Array
                                , l = 3
                                , c = n - 1
                                , u = (1 << n) - 1;
                            if (s[1] = r.convert(this),
                            n > 1) {
                                var m = i();
                                for (r.sqrTo(s[1], m); l <= u; )
                                    s[l] = i(),
                                        r.mulTo(m, s[l - 2], s[l]),
                                        l += 2
                            }
                            var v, g, b = e.t - 1, y = !0, A = i();
                            for (o = d(e[b]) - 1; b >= 0; ) {
                                for (o >= c ? v = e[b] >> o - c & u : (v = (e[b] & (1 << o + 1) - 1) << c - o,
                                b > 0 && (v |= e[b - 1] >> this.DB + o - c)),
                                         l = n; 0 == (1 & v); )
                                    v >>= 1,
                                        --l;
                                if ((o -= l) < 0 && (o += this.DB,
                                    --b),
                                    y)
                                    s[v].copyTo(a),
                                        y = !1;
                                else {
                                    for (; l > 1; )
                                        r.sqrTo(a, A),
                                            r.sqrTo(A, a),
                                            l -= 2;
                                    l > 0 ? r.sqrTo(a, A) : (g = a,
                                        a = A,
                                        A = g),
                                        r.mulTo(A, s[v], a)
                                }
                                for (; b >= 0 && 0 == (e[b] & 1 << o); )
                                    r.sqrTo(a, A),
                                        g = a,
                                        a = A,
                                        A = g,
                                    --o < 0 && (o = this.DB - 1,
                                        --b)
                            }
                            return r.revert(a)
                        }
                        ,
                        n.prototype.modInverse = function(e) {
                            var t = e.isEven();
                            if (this.isEven() && t || 0 == e.signum())
                                return n.ZERO;
                            for (var i = e.clone(), r = this.clone(), o = h(1), a = h(0), s = h(0), l = h(1); 0 != i.signum(); ) {
                                for (; i.isEven(); )
                                    i.rShiftTo(1, i),
                                        t ? (o.isEven() && a.isEven() || (o.addTo(this, o),
                                            a.subTo(e, a)),
                                            o.rShiftTo(1, o)) : a.isEven() || a.subTo(e, a),
                                        a.rShiftTo(1, a);
                                for (; r.isEven(); )
                                    r.rShiftTo(1, r),
                                        t ? (s.isEven() && l.isEven() || (s.addTo(this, s),
                                            l.subTo(e, l)),
                                            s.rShiftTo(1, s)) : l.isEven() || l.subTo(e, l),
                                        l.rShiftTo(1, l);
                                i.compareTo(r) >= 0 ? (i.subTo(r, i),
                                t && o.subTo(s, o),
                                    a.subTo(l, a)) : (r.subTo(i, r),
                                t && s.subTo(o, s),
                                    l.subTo(a, l))
                            }
                            return 0 != r.compareTo(n.ONE) ? n.ZERO : l.compareTo(e) >= 0 ? l.subtract(e) : l.signum() < 0 ? (l.addTo(e, l),
                                l.signum() < 0 ? l.add(e) : l) : l
                        }
                        ,
                        n.prototype.pow = function(e) {
                            return this.exp(e, new w)
                        }
                        ,
                        n.prototype.gcd = function(e) {
                            var t = this.s < 0 ? this.negate() : this.clone()
                                , n = e.s < 0 ? e.negate() : e.clone();
                            if (t.compareTo(n) < 0) {
                                var i = t;
                                t = n,
                                    n = i
                            }
                            var r = t.getLowestSetBit()
                                , o = n.getLowestSetBit();
                            if (o < 0)
                                return t;
                            for (r < o && (o = r),
                                 o > 0 && (t.rShiftTo(o, t),
                                     n.rShiftTo(o, n)); t.signum() > 0; )
                                (r = t.getLowestSetBit()) > 0 && t.rShiftTo(r, t),
                                (r = n.getLowestSetBit()) > 0 && n.rShiftTo(r, n),
                                    t.compareTo(n) >= 0 ? (t.subTo(n, t),
                                        t.rShiftTo(1, t)) : (n.subTo(t, n),
                                        n.rShiftTo(1, n));
                            return o > 0 && n.lShiftTo(o, n),
                                n
                        }
                        ,
                        n.prototype.isProbablePrime = function(e) {
                            var t, n = this.abs();
                            if (1 == n.t && n[0] <= O[O.length - 1]) {
                                for (t = 0; t < O.length; ++t)
                                    if (n[0] == O[t])
                                        return !0;
                                return !1
                            }
                            if (n.isEven())
                                return !1;
                            for (t = 1; t < O.length; ) {
                                for (var i = O[t], r = t + 1; r < O.length && i < E; )
                                    i *= O[r++];
                                for (i = n.modInt(i); t < r; )
                                    if (i % O[t++] == 0)
                                        return !1
                            }
                            return n.millerRabin(e)
                        }
                        ,
                        n.prototype.square = function() {
                            var e = i();
                            return this.squareTo(e),
                                e
                        }
                        ,
                        n.prototype.Barrett = C,
                    null == k) {
                        var T;
                        if (k = new Array,
                            S = 0,
                        "undefined" != typeof window && window.crypto)
                            if (window.crypto.getRandomValues) {
                                var P = new Uint8Array(32);
                                for (window.crypto.getRandomValues(P),
                                         T = 0; T < 32; ++T)
                                    k[S++] = P[T]
                            } else if ("Netscape" == navigator.appName && navigator.appVersion < "5") {
                                var I = window.crypto.random(32);
                                for (T = 0; T < I.length; ++T)
                                    k[S++] = 255 & I.charCodeAt(T)
                            }
                        for (; S < F; )
                            T = Math.floor(65536 * Math.random()),
                                k[S++] = T >>> 8,
                                k[S++] = 255 & T;
                        S = 0,
                            D()
                    }
                    function M() {
                        if (null == _) {
                            for (D(),
                                     (_ = new N).init(k),
                                     S = 0; S < k.length; ++S)
                                k[S] = 0;
                            S = 0
                        }
                        return _.next()
                    }
                    function j() {}
                    function N() {
                        this.i = 0,
                            this.j = 0,
                            this.S = new Array
                    }
                    j.prototype.nextBytes = function(e) {
                        var t;
                        for (t = 0; t < e.length; ++t)
                            e[t] = M()
                    }
                        ,
                        N.prototype.init = function(e) {
                            var t, n, i;
                            for (t = 0; t < 256; ++t)
                                this.S[t] = t;
                            for (n = 0,
                                     t = 0; t < 256; ++t)
                                n = n + this.S[t] + e[t % e.length] & 255,
                                    i = this.S[t],
                                    this.S[t] = this.S[n],
                                    this.S[n] = i;
                            this.i = 0,
                                this.j = 0
                        }
                        ,
                        N.prototype.next = function() {
                            var e;
                            return this.i = this.i + 1 & 255,
                                this.j = this.j + this.S[this.i] & 255,
                                e = this.S[this.i],
                                this.S[this.i] = this.S[this.j],
                                this.S[this.j] = e,
                                this.S[e + this.S[this.i] & 255]
                        }
                    ;
                    var F = 256;
                    n.SecureRandom = j,
                        n.BigInteger = n,
                        e.exports = n
                }
            ).call(this)
        },
        "6c27": function(module, exports, __webpack_require__) {

            (function(process, global) {
                    var __WEBPACK_AMD_DEFINE_RESULT__;
                    /**
                     * [js-sha256]{@link https://github.com/emn178/js-sha256}
                     *
                     * @version 0.9.0
                     * @author Chen, Yi-Cyuan [emn178@gmail.com]
                     * @copyright Chen, Yi-Cyuan 2014-2017
                     * @license MIT
                     */
                    !function() {
                        "use strict";
                        var ERROR = "input is invalid type"
                            , WINDOW = "object" == typeof window
                            , root = WINDOW ? window : {};
                        root.JS_SHA256_NO_WINDOW && (WINDOW = !1);
                        var WEB_WORKER = !WINDOW && "object" == typeof self
                            , NODE_JS = !root.JS_SHA256_NO_NODE_JS && "object" == typeof process && process.versions && process.versions.node;
                        NODE_JS ? root = global : WEB_WORKER && (root = self);
                        var COMMON_JS = !root.JS_SHA256_NO_COMMON_JS && "object" == typeof module && module.exports
                            , AMD = __webpack_require__("3c35")
                            , ARRAY_BUFFER = !root.JS_SHA256_NO_ARRAY_BUFFER && "undefined" != typeof ArrayBuffer
                            , HEX_CHARS = "0123456789abcdef".split("")
                            , EXTRA = [-2147483648, 8388608, 32768, 128]
                            , SHIFT = [24, 16, 8, 0]
                            , K = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]
                            , OUTPUT_TYPES = ["hex", "array", "digest", "arrayBuffer"]
                            , blocks = [];
                        !root.JS_SHA256_NO_NODE_JS && Array.isArray || (Array.isArray = function(e) {
                                return "[object Array]" === Object.prototype.toString.call(e)
                            }
                        ),
                        !ARRAY_BUFFER || !root.JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW && ArrayBuffer.isView || (ArrayBuffer.isView = function(e) {
                                return "object" == typeof e && e.buffer && e.buffer.constructor === ArrayBuffer
                            }
                        );
                        var createOutputMethod = function(e, t) {
                            return function(n) {
                                return new Sha256(t,!0).update(n)[e]()
                            }
                        }
                            , createMethod = function(e) {
                            var t = createOutputMethod("hex", e);
                            NODE_JS && (t = nodeWrap(t, e)),
                                t.create = function() {
                                    return new Sha256(e)
                                }
                                ,
                                t.update = function(e) {
                                    return t.create().update(e)
                                }
                            ;
                            for (var n = 0; n < OUTPUT_TYPES.length; ++n) {
                                var i = OUTPUT_TYPES[n];
                                t[i] = createOutputMethod(i, e)
                            }
                            return t
                        }
                            , nodeWrap = function(method, is224) {
                            var crypto = eval("require('crypto')")
                                , Buffer = eval("require('buffer').Buffer")
                                , algorithm = is224 ? "sha224" : "sha256"
                                , nodeMethod = function(e) {
                                if ("string" == typeof e)
                                    return crypto.createHash(algorithm).update(e, "utf8").digest("hex");
                                if (null == e)
                                    throw new Error(ERROR);
                                return e.constructor === ArrayBuffer && (e = new Uint8Array(e)),
                                    Array.isArray(e) || ArrayBuffer.isView(e) || e.constructor === Buffer ? crypto.createHash(algorithm).update(new Buffer(e)).digest("hex") : method(e)
                            };
                            return nodeMethod
                        }
                            , createHmacOutputMethod = function(e, t) {
                            return function(n, i) {
                                return new HmacSha256(n,t,!0).update(i)[e]()
                            }
                        }
                            , createHmacMethod = function(e) {
                            var t = createHmacOutputMethod("hex", e);
                            t.create = function(t) {
                                return new HmacSha256(t,e)
                            }
                                ,
                                t.update = function(e, n) {
                                    return t.create(e).update(n)
                                }
                            ;
                            for (var n = 0; n < OUTPUT_TYPES.length; ++n) {
                                var i = OUTPUT_TYPES[n];
                                t[i] = createHmacOutputMethod(i, e)
                            }
                            return t
                        };
                        function Sha256(e, t) {
                            t ? (blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0,
                                this.blocks = blocks) : this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                e ? (this.h0 = 3238371032,
                                    this.h1 = 914150663,
                                    this.h2 = 812702999,
                                    this.h3 = 4144912697,
                                    this.h4 = 4290775857,
                                    this.h5 = 1750603025,
                                    this.h6 = 1694076839,
                                    this.h7 = 3204075428) : (this.h0 = 1779033703,
                                    this.h1 = 3144134277,
                                    this.h2 = 1013904242,
                                    this.h3 = 2773480762,
                                    this.h4 = 1359893119,
                                    this.h5 = 2600822924,
                                    this.h6 = 528734635,
                                    this.h7 = 1541459225),
                                this.block = this.start = this.bytes = this.hBytes = 0,
                                this.finalized = this.hashed = !1,
                                this.first = !0,
                                this.is224 = e
                        }
                        function HmacSha256(e, t, n) {
                            var i, r = typeof e;
                            if ("string" === r) {
                                var o, a = [], s = e.length, l = 0;
                                for (i = 0; i < s; ++i)
                                    (o = e.charCodeAt(i)) < 128 ? a[l++] = o : o < 2048 ? (a[l++] = 192 | o >> 6,
                                        a[l++] = 128 | 63 & o) : o < 55296 || o >= 57344 ? (a[l++] = 224 | o >> 12,
                                        a[l++] = 128 | o >> 6 & 63,
                                        a[l++] = 128 | 63 & o) : (o = 65536 + ((1023 & o) << 10 | 1023 & e.charCodeAt(++i)),
                                        a[l++] = 240 | o >> 18,
                                        a[l++] = 128 | o >> 12 & 63,
                                        a[l++] = 128 | o >> 6 & 63,
                                        a[l++] = 128 | 63 & o);
                                e = a
                            } else {
                                if ("object" !== r)
                                    throw new Error(ERROR);
                                if (null === e)
                                    throw new Error(ERROR);
                                if (ARRAY_BUFFER && e.constructor === ArrayBuffer)
                                    e = new Uint8Array(e);
                                else if (!(Array.isArray(e) || ARRAY_BUFFER && ArrayBuffer.isView(e)))
                                    throw new Error(ERROR)
                            }
                            e.length > 64 && (e = new Sha256(t,!0).update(e).array());
                            var c = []
                                , u = [];
                            for (i = 0; i < 64; ++i) {
                                var h = e[i] || 0;
                                c[i] = 92 ^ h,
                                    u[i] = 54 ^ h
                            }
                            Sha256.call(this, t, n),
                                this.update(u),
                                this.oKeyPad = c,
                                this.inner = !0,
                                this.sharedMemory = n
                        }
                        Sha256.prototype.update = function(e) {
                            if (!this.finalized) {
                                var t, n = typeof e;
                                if ("string" !== n) {
                                    if ("object" !== n)
                                        throw new Error(ERROR);
                                    if (null === e)
                                        throw new Error(ERROR);
                                    if (ARRAY_BUFFER && e.constructor === ArrayBuffer)
                                        e = new Uint8Array(e);
                                    else if (!(Array.isArray(e) || ARRAY_BUFFER && ArrayBuffer.isView(e)))
                                        throw new Error(ERROR);
                                    t = !0
                                }
                                for (var i, r, o = 0, a = e.length, s = this.blocks; o < a; ) {
                                    if (this.hashed && (this.hashed = !1,
                                        s[0] = this.block,
                                        s[16] = s[1] = s[2] = s[3] = s[4] = s[5] = s[6] = s[7] = s[8] = s[9] = s[10] = s[11] = s[12] = s[13] = s[14] = s[15] = 0),
                                        t)
                                        for (r = this.start; o < a && r < 64; ++o)
                                            s[r >> 2] |= e[o] << SHIFT[3 & r++];
                                    else
                                        for (r = this.start; o < a && r < 64; ++o)
                                            (i = e.charCodeAt(o)) < 128 ? s[r >> 2] |= i << SHIFT[3 & r++] : i < 2048 ? (s[r >> 2] |= (192 | i >> 6) << SHIFT[3 & r++],
                                                s[r >> 2] |= (128 | 63 & i) << SHIFT[3 & r++]) : i < 55296 || i >= 57344 ? (s[r >> 2] |= (224 | i >> 12) << SHIFT[3 & r++],
                                                s[r >> 2] |= (128 | i >> 6 & 63) << SHIFT[3 & r++],
                                                s[r >> 2] |= (128 | 63 & i) << SHIFT[3 & r++]) : (i = 65536 + ((1023 & i) << 10 | 1023 & e.charCodeAt(++o)),
                                                s[r >> 2] |= (240 | i >> 18) << SHIFT[3 & r++],
                                                s[r >> 2] |= (128 | i >> 12 & 63) << SHIFT[3 & r++],
                                                s[r >> 2] |= (128 | i >> 6 & 63) << SHIFT[3 & r++],
                                                s[r >> 2] |= (128 | 63 & i) << SHIFT[3 & r++]);
                                    this.lastByteIndex = r,
                                        this.bytes += r - this.start,
                                        r >= 64 ? (this.block = s[16],
                                            this.start = r - 64,
                                            this.hash(),
                                            this.hashed = !0) : this.start = r
                                }
                                return this.bytes > 4294967295 && (this.hBytes += this.bytes / 4294967296 << 0,
                                    this.bytes = this.bytes % 4294967296),
                                    this
                            }
                        }
                            ,
                            Sha256.prototype.finalize = function() {
                                if (!this.finalized) {
                                    this.finalized = !0;
                                    var e = this.blocks
                                        , t = this.lastByteIndex;
                                    e[16] = this.block,
                                        e[t >> 2] |= EXTRA[3 & t],
                                        this.block = e[16],
                                    t >= 56 && (this.hashed || this.hash(),
                                        e[0] = this.block,
                                        e[16] = e[1] = e[2] = e[3] = e[4] = e[5] = e[6] = e[7] = e[8] = e[9] = e[10] = e[11] = e[12] = e[13] = e[14] = e[15] = 0),
                                        e[14] = this.hBytes << 3 | this.bytes >>> 29,
                                        e[15] = this.bytes << 3,
                                        this.hash()
                                }
                            }
                            ,
                            Sha256.prototype.hash = function() {
                                var e, t, n, i, r, o, a, s, l, c = this.h0, u = this.h1, h = this.h2, d = this.h3, f = this.h4, p = this.h5, m = this.h6, v = this.h7, g = this.blocks;
                                for (e = 16; e < 64; ++e)
                                    t = ((r = g[e - 15]) >>> 7 | r << 25) ^ (r >>> 18 | r << 14) ^ r >>> 3,
                                        n = ((r = g[e - 2]) >>> 17 | r << 15) ^ (r >>> 19 | r << 13) ^ r >>> 10,
                                        g[e] = g[e - 16] + t + g[e - 7] + n << 0;
                                for (l = u & h,
                                         e = 0; e < 64; e += 4)
                                    this.first ? (this.is224 ? (o = 300032,
                                        v = (r = g[0] - 1413257819) - 150054599 << 0,
                                        d = r + 24177077 << 0) : (o = 704751109,
                                        v = (r = g[0] - 210244248) - 1521486534 << 0,
                                        d = r + 143694565 << 0),
                                        this.first = !1) : (t = (c >>> 2 | c << 30) ^ (c >>> 13 | c << 19) ^ (c >>> 22 | c << 10),
                                        i = (o = c & u) ^ c & h ^ l,
                                        v = d + (r = v + (n = (f >>> 6 | f << 26) ^ (f >>> 11 | f << 21) ^ (f >>> 25 | f << 7)) + (f & p ^ ~f & m) + K[e] + g[e]) << 0,
                                        d = r + (t + i) << 0),
                                        t = (d >>> 2 | d << 30) ^ (d >>> 13 | d << 19) ^ (d >>> 22 | d << 10),
                                        i = (a = d & c) ^ d & u ^ o,
                                        m = h + (r = m + (n = (v >>> 6 | v << 26) ^ (v >>> 11 | v << 21) ^ (v >>> 25 | v << 7)) + (v & f ^ ~v & p) + K[e + 1] + g[e + 1]) << 0,
                                        t = ((h = r + (t + i) << 0) >>> 2 | h << 30) ^ (h >>> 13 | h << 19) ^ (h >>> 22 | h << 10),
                                        i = (s = h & d) ^ h & c ^ a,
                                        p = u + (r = p + (n = (m >>> 6 | m << 26) ^ (m >>> 11 | m << 21) ^ (m >>> 25 | m << 7)) + (m & v ^ ~m & f) + K[e + 2] + g[e + 2]) << 0,
                                        t = ((u = r + (t + i) << 0) >>> 2 | u << 30) ^ (u >>> 13 | u << 19) ^ (u >>> 22 | u << 10),
                                        i = (l = u & h) ^ u & d ^ s,
                                        f = c + (r = f + (n = (p >>> 6 | p << 26) ^ (p >>> 11 | p << 21) ^ (p >>> 25 | p << 7)) + (p & m ^ ~p & v) + K[e + 3] + g[e + 3]) << 0,
                                        c = r + (t + i) << 0;
                                this.h0 = this.h0 + c << 0,
                                    this.h1 = this.h1 + u << 0,
                                    this.h2 = this.h2 + h << 0,
                                    this.h3 = this.h3 + d << 0,
                                    this.h4 = this.h4 + f << 0,
                                    this.h5 = this.h5 + p << 0,
                                    this.h6 = this.h6 + m << 0,
                                    this.h7 = this.h7 + v << 0
                            }
                            ,
                            Sha256.prototype.hex = function() {
                                this.finalize();
                                var e = this.h0
                                    , t = this.h1
                                    , n = this.h2
                                    , i = this.h3
                                    , r = this.h4
                                    , o = this.h5
                                    , a = this.h6
                                    , s = this.h7
                                    , l = HEX_CHARS[e >> 28 & 15] + HEX_CHARS[e >> 24 & 15] + HEX_CHARS[e >> 20 & 15] + HEX_CHARS[e >> 16 & 15] + HEX_CHARS[e >> 12 & 15] + HEX_CHARS[e >> 8 & 15] + HEX_CHARS[e >> 4 & 15] + HEX_CHARS[15 & e] + HEX_CHARS[t >> 28 & 15] + HEX_CHARS[t >> 24 & 15] + HEX_CHARS[t >> 20 & 15] + HEX_CHARS[t >> 16 & 15] + HEX_CHARS[t >> 12 & 15] + HEX_CHARS[t >> 8 & 15] + HEX_CHARS[t >> 4 & 15] + HEX_CHARS[15 & t] + HEX_CHARS[n >> 28 & 15] + HEX_CHARS[n >> 24 & 15] + HEX_CHARS[n >> 20 & 15] + HEX_CHARS[n >> 16 & 15] + HEX_CHARS[n >> 12 & 15] + HEX_CHARS[n >> 8 & 15] + HEX_CHARS[n >> 4 & 15] + HEX_CHARS[15 & n] + HEX_CHARS[i >> 28 & 15] + HEX_CHARS[i >> 24 & 15] + HEX_CHARS[i >> 20 & 15] + HEX_CHARS[i >> 16 & 15] + HEX_CHARS[i >> 12 & 15] + HEX_CHARS[i >> 8 & 15] + HEX_CHARS[i >> 4 & 15] + HEX_CHARS[15 & i] + HEX_CHARS[r >> 28 & 15] + HEX_CHARS[r >> 24 & 15] + HEX_CHARS[r >> 20 & 15] + HEX_CHARS[r >> 16 & 15] + HEX_CHARS[r >> 12 & 15] + HEX_CHARS[r >> 8 & 15] + HEX_CHARS[r >> 4 & 15] + HEX_CHARS[15 & r] + HEX_CHARS[o >> 28 & 15] + HEX_CHARS[o >> 24 & 15] + HEX_CHARS[o >> 20 & 15] + HEX_CHARS[o >> 16 & 15] + HEX_CHARS[o >> 12 & 15] + HEX_CHARS[o >> 8 & 15] + HEX_CHARS[o >> 4 & 15] + HEX_CHARS[15 & o] + HEX_CHARS[a >> 28 & 15] + HEX_CHARS[a >> 24 & 15] + HEX_CHARS[a >> 20 & 15] + HEX_CHARS[a >> 16 & 15] + HEX_CHARS[a >> 12 & 15] + HEX_CHARS[a >> 8 & 15] + HEX_CHARS[a >> 4 & 15] + HEX_CHARS[15 & a];
                                return this.is224 || (l += HEX_CHARS[s >> 28 & 15] + HEX_CHARS[s >> 24 & 15] + HEX_CHARS[s >> 20 & 15] + HEX_CHARS[s >> 16 & 15] + HEX_CHARS[s >> 12 & 15] + HEX_CHARS[s >> 8 & 15] + HEX_CHARS[s >> 4 & 15] + HEX_CHARS[15 & s]),
                                    l
                            }
                            ,
                            Sha256.prototype.toString = Sha256.prototype.hex,
                            Sha256.prototype.digest = function() {
                                this.finalize();
                                var e = this.h0
                                    , t = this.h1
                                    , n = this.h2
                                    , i = this.h3
                                    , r = this.h4
                                    , o = this.h5
                                    , a = this.h6
                                    , s = this.h7
                                    , l = [e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, 255 & e, t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, 255 & t, n >> 24 & 255, n >> 16 & 255, n >> 8 & 255, 255 & n, i >> 24 & 255, i >> 16 & 255, i >> 8 & 255, 255 & i, r >> 24 & 255, r >> 16 & 255, r >> 8 & 255, 255 & r, o >> 24 & 255, o >> 16 & 255, o >> 8 & 255, 255 & o, a >> 24 & 255, a >> 16 & 255, a >> 8 & 255, 255 & a];
                                return this.is224 || l.push(s >> 24 & 255, s >> 16 & 255, s >> 8 & 255, 255 & s),
                                    l
                            }
                            ,
                            Sha256.prototype.array = Sha256.prototype.digest,
                            Sha256.prototype.arrayBuffer = function() {
                                this.finalize();
                                var e = new ArrayBuffer(this.is224 ? 28 : 32)
                                    , t = new DataView(e);
                                return t.setUint32(0, this.h0),
                                    t.setUint32(4, this.h1),
                                    t.setUint32(8, this.h2),
                                    t.setUint32(12, this.h3),
                                    t.setUint32(16, this.h4),
                                    t.setUint32(20, this.h5),
                                    t.setUint32(24, this.h6),
                                this.is224 || t.setUint32(28, this.h7),
                                    e
                            }
                            ,
                            HmacSha256.prototype = new Sha256,
                            HmacSha256.prototype.finalize = function() {
                                if (Sha256.prototype.finalize.call(this),
                                    this.inner) {
                                    this.inner = !1;
                                    var e = this.array();
                                    Sha256.call(this, this.is224, this.sharedMemory),
                                        this.update(this.oKeyPad),
                                        this.update(e),
                                        Sha256.prototype.finalize.call(this)
                                }
                            }
                        ;
                        var exports = createMethod();
                        exports.sha256 = exports,
                            exports.sha224 = createMethod(!0),
                            exports.sha256.hmac = createHmacMethod(),
                            exports.sha224.hmac = createHmacMethod(!0),
                            COMMON_JS ? module.exports = exports : (root.sha256 = exports.sha256,
                                root.sha224 = exports.sha224,
                            AMD && (__WEBPACK_AMD_DEFINE_RESULT__ = function() {
                                return exports
                            }
                                .call(exports, __webpack_require__, exports, module),
                            void 0 === __WEBPACK_AMD_DEFINE_RESULT__ || (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)))
                    }()
                }
            ).call(this, __webpack_require__("f28c"), __webpack_require__("c8ba"))
        },
        "3c35": function(e, t) {
            (function(t) {
                    e.exports = t
                }
            ).call(this, {})
        },
        c8ba: function(e, t) {
            var n;
            n = function() {
                return this
            }();
            try {
                n = n || new Function("return this")()
            } catch (e) {
                "object" == typeof window && (n = window)
            }
            e.exports = n
        },
        f28c: function(e, t) {
            var n, i, r = e.exports = {};
            function o() {
                throw new Error("setTimeout has not been defined")
            }
            function a() {
                throw new Error("clearTimeout has not been defined")
            }
            function s(e) {
                if (n === setTimeout)
                    return setTimeout(e, 0);
                if ((n === o || !n) && setTimeout)
                    return n = setTimeout,
                        setTimeout(e, 0);
                try {
                    return n(e, 0)
                } catch (t) {
                    try {
                        return n.call(null, e, 0)
                    } catch (t) {
                        return n.call(this, e, 0)
                    }
                }
            }
            !function() {
                try {
                    n = "function" == typeof setTimeout ? setTimeout : o
                } catch (e) {
                    n = o
                }
                try {
                    i = "function" == typeof clearTimeout ? clearTimeout : a
                } catch (e) {
                    i = a
                }
            }();
            var l, c = [], u = !1, h = -1;
            function d() {
                u && l && (u = !1,
                    l.length ? c = l.concat(c) : h = -1,
                c.length && f())
            }
            function f() {
                if (!u) {
                    var e = s(d);
                    u = !0;
                    for (var t = c.length; t; ) {
                        for (l = c,
                                 c = []; ++h < t; )
                            l && l[h].run();
                        h = -1,
                            t = c.length
                    }
                    l = null,
                        u = !1,
                        function(e) {
                            if (i === clearTimeout)
                                return clearTimeout(e);
                            if ((i === a || !i) && clearTimeout)
                                return i = clearTimeout,
                                    clearTimeout(e);
                            try {
                                i(e)
                            } catch (t) {
                                try {
                                    return i.call(null, e)
                                } catch (t) {
                                    return i.call(this, e)
                                }
                            }
                        }(e)
                }
            }
            function p(e, t) {
                this.fun = e,
                    this.array = t
            }
            function m() {}
            r.nextTick = function(e) {
                var t = new Array(arguments.length - 1);
                if (arguments.length > 1)
                    for (var n = 1; n < arguments.length; n++)
                        t[n - 1] = arguments[n];
                c.push(new p(e,t)),
                1 !== c.length || u || s(f)
            }
                ,
                p.prototype.run = function() {
                    this.fun.apply(null, this.array)
                }
                ,
                r.title = "browser",
                r.browser = !0,
                r.env = {},
                r.argv = [],
                r.version = "",
                r.versions = {},
                r.on = m,
                r.addListener = m,
                r.once = m,
                r.off = m,
                r.removeListener = m,
                r.removeAllListeners = m,
                r.emit = m,
                r.prependListener = m,
                r.prependOnceListener = m,
                r.listeners = function(e) {
                    return []
                }
                ,
                r.binding = function(e) {
                    throw new Error("process.binding is not supported")
                }
                ,
                r.cwd = function() {
                    return "/"
                }
                ,
                r.chdir = function(e) {
                    throw new Error("process.chdir is not supported")
                }
                ,
                r.umask = function() {
                    return 0
                }
        },
        b639: function(e, t, n) {
            "use strict";
            (function(e) {
                    var i = n("1fb5")
                        , r = n("9152")
                        , o = n("e3db");
                    function a() {
                        return l.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
                    }
                    function s(e, t) {
                        if (a() < t)
                            throw new RangeError("Invalid typed array length");
                        return l.TYPED_ARRAY_SUPPORT ? (e = new Uint8Array(t)).__proto__ = l.prototype : (null === e && (e = new l(t)),
                            e.length = t),
                            e
                    }
                    function l(e, t, n) {
                        if (!(l.TYPED_ARRAY_SUPPORT || this instanceof l))
                            return new l(e,t,n);
                        if ("number" == typeof e) {
                            if ("string" == typeof t)
                                throw new Error("If encoding is specified then the first argument must be a string");
                            return h(this, e)
                        }
                        return c(this, e, t, n)
                    }
                    function c(e, t, n, i) {
                        if ("number" == typeof t)
                            throw new TypeError('"value" argument must not be a number');
                        return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer ? function(e, t, n, i) {
                            if (t.byteLength,
                            n < 0 || t.byteLength < n)
                                throw new RangeError("'offset' is out of bounds");
                            if (t.byteLength < n + (i || 0))
                                throw new RangeError("'length' is out of bounds");
                            return t = void 0 === n && void 0 === i ? new Uint8Array(t) : void 0 === i ? new Uint8Array(t,n) : new Uint8Array(t,n,i),
                                l.TYPED_ARRAY_SUPPORT ? (e = t).__proto__ = l.prototype : e = d(e, t),
                                e
                        }(e, t, n, i) : "string" == typeof t ? function(e, t, n) {
                            if ("string" == typeof n && "" !== n || (n = "utf8"),
                                !l.isEncoding(n))
                                throw new TypeError('"encoding" must be a valid string encoding');
                            var i = 0 | p(t, n)
                                , r = (e = s(e, i)).write(t, n);
                            return r !== i && (e = e.slice(0, r)),
                                e
                        }(e, t, n) : function(e, t) {
                            if (l.isBuffer(t)) {
                                var n = 0 | f(t.length);
                                return 0 === (e = s(e, n)).length || t.copy(e, 0, 0, n),
                                    e
                            }
                            if (t) {
                                if ("undefined" != typeof ArrayBuffer && t.buffer instanceof ArrayBuffer || "length"in t)
                                    return "number" != typeof t.length || (i = t.length) != i ? s(e, 0) : d(e, t);
                                if ("Buffer" === t.type && o(t.data))
                                    return d(e, t.data)
                            }
                            var i;
                            throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
                        }(e, t)
                    }
                    function u(e) {
                        if ("number" != typeof e)
                            throw new TypeError('"size" argument must be a number');
                        if (e < 0)
                            throw new RangeError('"size" argument must not be negative')
                    }
                    function h(e, t) {
                        if (u(t),
                            e = s(e, t < 0 ? 0 : 0 | f(t)),
                            !l.TYPED_ARRAY_SUPPORT)
                            for (var n = 0; n < t; ++n)
                                e[n] = 0;
                        return e
                    }
                    function d(e, t) {
                        var n = t.length < 0 ? 0 : 0 | f(t.length);
                        e = s(e, n);
                        for (var i = 0; i < n; i += 1)
                            e[i] = 255 & t[i];
                        return e
                    }
                    function f(e) {
                        if (e >= a())
                            throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + a().toString(16) + " bytes");
                        return 0 | e
                    }
                    function p(e, t) {
                        if (l.isBuffer(e))
                            return e.length;
                        if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(e) || e instanceof ArrayBuffer))
                            return e.byteLength;
                        "string" != typeof e && (e = "" + e);
                        var n = e.length;
                        if (0 === n)
                            return 0;
                        for (var i = !1; ; )
                            switch (t) {
                                case "ascii":
                                case "latin1":
                                case "binary":
                                    return n;
                                case "utf8":
                                case "utf-8":
                                case void 0:
                                    return V(e).length;
                                case "ucs2":
                                case "ucs-2":
                                case "utf16le":
                                case "utf-16le":
                                    return 2 * n;
                                case "hex":
                                    return n >>> 1;
                                case "base64":
                                    return H(e).length;
                                default:
                                    if (i)
                                        return V(e).length;
                                    t = ("" + t).toLowerCase(),
                                        i = !0
                            }
                    }
                    function m(e, t, n) {
                        var i = e[t];
                        e[t] = e[n],
                            e[n] = i
                    }
                    function v(e, t, n, i, r) {
                        if (0 === e.length)
                            return -1;
                        if ("string" == typeof n ? (i = n,
                            n = 0) : n > 2147483647 ? n = 2147483647 : n < -2147483648 && (n = -2147483648),
                            n = +n,
                        isNaN(n) && (n = r ? 0 : e.length - 1),
                        n < 0 && (n = e.length + n),
                        n >= e.length) {
                            if (r)
                                return -1;
                            n = e.length - 1
                        } else if (n < 0) {
                            if (!r)
                                return -1;
                            n = 0
                        }
                        if ("string" == typeof t && (t = l.from(t, i)),
                            l.isBuffer(t))
                            return 0 === t.length ? -1 : g(e, t, n, i, r);
                        if ("number" == typeof t)
                            return t &= 255,
                                l.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? r ? Uint8Array.prototype.indexOf.call(e, t, n) : Uint8Array.prototype.lastIndexOf.call(e, t, n) : g(e, [t], n, i, r);
                        throw new TypeError("val must be string, number or Buffer")
                    }
                    function g(e, t, n, i, r) {
                        var o, a = 1, s = e.length, l = t.length;
                        if (void 0 !== i && ("ucs2" === (i = String(i).toLowerCase()) || "ucs-2" === i || "utf16le" === i || "utf-16le" === i)) {
                            if (e.length < 2 || t.length < 2)
                                return -1;
                            a = 2,
                                s /= 2,
                                l /= 2,
                                n /= 2
                        }
                        function c(e, t) {
                            return 1 === a ? e[t] : e.readUInt16BE(t * a)
                        }
                        if (r) {
                            var u = -1;
                            for (o = n; o < s; o++)
                                if (c(e, o) === c(t, -1 === u ? 0 : o - u)) {
                                    if (-1 === u && (u = o),
                                    o - u + 1 === l)
                                        return u * a
                                } else
                                    -1 !== u && (o -= o - u),
                                        u = -1
                        } else
                            for (n + l > s && (n = s - l),
                                     o = n; o >= 0; o--) {
                                for (var h = !0, d = 0; d < l; d++)
                                    if (c(e, o + d) !== c(t, d)) {
                                        h = !1;
                                        break
                                    }
                                if (h)
                                    return o
                            }
                        return -1
                    }
                    function b(e, t, n, i) {
                        n = Number(n) || 0;
                        var r = e.length - n;
                        i ? (i = Number(i)) > r && (i = r) : i = r;
                        var o = t.length;
                        if (o % 2 != 0)
                            throw new TypeError("Invalid hex string");
                        i > o / 2 && (i = o / 2);
                        for (var a = 0; a < i; ++a) {
                            var s = parseInt(t.substr(2 * a, 2), 16);
                            if (isNaN(s))
                                return a;
                            e[n + a] = s
                        }
                        return a
                    }
                    function y(e, t, n, i) {
                        return z(V(t, e.length - n), e, n, i)
                    }
                    function A(e, t, n, i) {
                        return z(function(e) {
                            for (var t = [], n = 0; n < e.length; ++n)
                                t.push(255 & e.charCodeAt(n));
                            return t
                        }(t), e, n, i)
                    }
                    function w(e, t, n, i) {
                        return A(e, t, n, i)
                    }
                    function x(e, t, n, i) {
                        return z(H(t), e, n, i)
                    }
                    function C(e, t, n, i) {
                        return z(function(e, t) {
                            for (var n, i, r, o = [], a = 0; a < e.length && !((t -= 2) < 0); ++a)
                                n = e.charCodeAt(a),
                                    i = n >> 8,
                                    r = n % 256,
                                    o.push(r),
                                    o.push(i);
                            return o
                        }(t, e.length - n), e, n, i)
                    }
                    function _(e, t, n) {
                        return 0 === t && n === e.length ? i.fromByteArray(e) : i.fromByteArray(e.slice(t, n))
                    }
                    function k(e, t, n) {
                        n = Math.min(e.length, n);
                        for (var i = [], r = t; r < n; ) {
                            var o, a, s, l, c = e[r], u = null, h = c > 239 ? 4 : c > 223 ? 3 : c > 191 ? 2 : 1;
                            if (r + h <= n)
                                switch (h) {
                                    case 1:
                                        c < 128 && (u = c);
                                        break;
                                    case 2:
                                        128 == (192 & (o = e[r + 1])) && (l = (31 & c) << 6 | 63 & o) > 127 && (u = l);
                                        break;
                                    case 3:
                                        o = e[r + 1],
                                            a = e[r + 2],
                                        128 == (192 & o) && 128 == (192 & a) && (l = (15 & c) << 12 | (63 & o) << 6 | 63 & a) > 2047 && (l < 55296 || l > 57343) && (u = l);
                                        break;
                                    case 4:
                                        o = e[r + 1],
                                            a = e[r + 2],
                                            s = e[r + 3],
                                        128 == (192 & o) && 128 == (192 & a) && 128 == (192 & s) && (l = (15 & c) << 18 | (63 & o) << 12 | (63 & a) << 6 | 63 & s) > 65535 && l < 1114112 && (u = l)
                                }
                            null === u ? (u = 65533,
                                h = 1) : u > 65535 && (u -= 65536,
                                i.push(u >>> 10 & 1023 | 55296),
                                u = 56320 | 1023 & u),
                                i.push(u),
                                r += h
                        }
                        return function(e) {
                            var t = e.length;
                            if (t <= S)
                                return String.fromCharCode.apply(String, e);
                            for (var n = "", i = 0; i < t; )
                                n += String.fromCharCode.apply(String, e.slice(i, i += S));
                            return n
                        }(i)
                    }
                    t.Buffer = l,
                        t.SlowBuffer = function(e) {
                            return +e != e && (e = 0),
                                l.alloc(+e)
                        }
                        ,
                        t.INSPECT_MAX_BYTES = 50,
                        l.TYPED_ARRAY_SUPPORT = void 0 !== e.TYPED_ARRAY_SUPPORT ? e.TYPED_ARRAY_SUPPORT : function() {
                            try {
                                var e = new Uint8Array(1);
                                return e.__proto__ = {
                                    __proto__: Uint8Array.prototype,
                                    foo: function() {
                                        return 42
                                    }
                                },
                                42 === e.foo() && "function" == typeof e.subarray && 0 === e.subarray(1, 1).byteLength
                            } catch (e) {
                                return !1
                            }
                        }(),
                        t.kMaxLength = a(),
                        l.poolSize = 8192,
                        l._augment = function(e) {
                            return e.__proto__ = l.prototype,
                                e
                        }
                        ,
                        l.from = function(e, t, n) {
                            return c(null, e, t, n)
                        }
                        ,
                    l.TYPED_ARRAY_SUPPORT && (l.prototype.__proto__ = Uint8Array.prototype,
                        l.__proto__ = Uint8Array,
                    "undefined" != typeof Symbol && Symbol.species && l[Symbol.species] === l && Object.defineProperty(l, Symbol.species, {
                        value: null,
                        configurable: !0
                    })),
                        l.alloc = function(e, t, n) {
                            return function(e, t, n, i) {
                                return u(t),
                                    t <= 0 ? s(e, t) : void 0 !== n ? "string" == typeof i ? s(e, t).fill(n, i) : s(e, t).fill(n) : s(e, t)
                            }(null, e, t, n)
                        }
                        ,
                        l.allocUnsafe = function(e) {
                            return h(null, e)
                        }
                        ,
                        l.allocUnsafeSlow = function(e) {
                            return h(null, e)
                        }
                        ,
                        l.isBuffer = function(e) {
                            return !(null == e || !e._isBuffer)
                        }
                        ,
                        l.compare = function(e, t) {
                            if (!l.isBuffer(e) || !l.isBuffer(t))
                                throw new TypeError("Arguments must be Buffers");
                            if (e === t)
                                return 0;
                            for (var n = e.length, i = t.length, r = 0, o = Math.min(n, i); r < o; ++r)
                                if (e[r] !== t[r]) {
                                    n = e[r],
                                        i = t[r];
                                    break
                                }
                            return n < i ? -1 : i < n ? 1 : 0
                        }
                        ,
                        l.isEncoding = function(e) {
                            switch (String(e).toLowerCase()) {
                                case "hex":
                                case "utf8":
                                case "utf-8":
                                case "ascii":
                                case "latin1":
                                case "binary":
                                case "base64":
                                case "ucs2":
                                case "ucs-2":
                                case "utf16le":
                                case "utf-16le":
                                    return !0;
                                default:
                                    return !1
                            }
                        }
                        ,
                        l.concat = function(e, t) {
                            if (!o(e))
                                throw new TypeError('"list" argument must be an Array of Buffers');
                            if (0 === e.length)
                                return l.alloc(0);
                            var n;
                            if (void 0 === t)
                                for (t = 0,
                                         n = 0; n < e.length; ++n)
                                    t += e[n].length;
                            var i = l.allocUnsafe(t)
                                , r = 0;
                            for (n = 0; n < e.length; ++n) {
                                var a = e[n];
                                if (!l.isBuffer(a))
                                    throw new TypeError('"list" argument must be an Array of Buffers');
                                a.copy(i, r),
                                    r += a.length
                            }
                            return i
                        }
                        ,
                        l.byteLength = p,
                        l.prototype._isBuffer = !0,
                        l.prototype.swap16 = function() {
                            var e = this.length;
                            if (e % 2 != 0)
                                throw new RangeError("Buffer size must be a multiple of 16-bits");
                            for (var t = 0; t < e; t += 2)
                                m(this, t, t + 1);
                            return this
                        }
                        ,
                        l.prototype.swap32 = function() {
                            var e = this.length;
                            if (e % 4 != 0)
                                throw new RangeError("Buffer size must be a multiple of 32-bits");
                            for (var t = 0; t < e; t += 4)
                                m(this, t, t + 3),
                                    m(this, t + 1, t + 2);
                            return this
                        }
                        ,
                        l.prototype.swap64 = function() {
                            var e = this.length;
                            if (e % 8 != 0)
                                throw new RangeError("Buffer size must be a multiple of 64-bits");
                            for (var t = 0; t < e; t += 8)
                                m(this, t, t + 7),
                                    m(this, t + 1, t + 6),
                                    m(this, t + 2, t + 5),
                                    m(this, t + 3, t + 4);
                            return this
                        }
                        ,
                        l.prototype.toString = function() {
                            var e = 0 | this.length;
                            return 0 === e ? "" : 0 === arguments.length ? k(this, 0, e) : function(e, t, n) {
                                var i = !1;
                                if ((void 0 === t || t < 0) && (t = 0),
                                t > this.length)
                                    return "";
                                if ((void 0 === n || n > this.length) && (n = this.length),
                                n <= 0)
                                    return "";
                                if ((n >>>= 0) <= (t >>>= 0))
                                    return "";
                                for (e || (e = "utf8"); ; )
                                    switch (e) {
                                        case "hex":
                                            return D(this, t, n);
                                        case "utf8":
                                        case "utf-8":
                                            return k(this, t, n);
                                        case "ascii":
                                            return O(this, t, n);
                                        case "latin1":
                                        case "binary":
                                            return E(this, t, n);
                                        case "base64":
                                            return _(this, t, n);
                                        case "ucs2":
                                        case "ucs-2":
                                        case "utf16le":
                                        case "utf-16le":
                                            return T(this, t, n);
                                        default:
                                            if (i)
                                                throw new TypeError("Unknown encoding: " + e);
                                            e = (e + "").toLowerCase(),
                                                i = !0
                                    }
                            }
                                .apply(this, arguments)
                        }
                        ,
                        l.prototype.equals = function(e) {
                            if (!l.isBuffer(e))
                                throw new TypeError("Argument must be a Buffer");
                            return this === e || 0 === l.compare(this, e)
                        }
                        ,
                        l.prototype.inspect = function() {
                            var e = ""
                                , n = t.INSPECT_MAX_BYTES;
                            return this.length > 0 && (e = this.toString("hex", 0, n).match(/.{2}/g).join(" "),
                            this.length > n && (e += " ... ")),
                            "<Buffer " + e + ">"
                        }
                        ,
                        l.prototype.compare = function(e, t, n, i, r) {
                            if (!l.isBuffer(e))
                                throw new TypeError("Argument must be a Buffer");
                            if (void 0 === t && (t = 0),
                            void 0 === n && (n = e ? e.length : 0),
                            void 0 === i && (i = 0),
                            void 0 === r && (r = this.length),
                            t < 0 || n > e.length || i < 0 || r > this.length)
                                throw new RangeError("out of range index");
                            if (i >= r && t >= n)
                                return 0;
                            if (i >= r)
                                return -1;
                            if (t >= n)
                                return 1;
                            if (t >>>= 0,
                                n >>>= 0,
                                i >>>= 0,
                                r >>>= 0,
                            this === e)
                                return 0;
                            for (var o = r - i, a = n - t, s = Math.min(o, a), c = this.slice(i, r), u = e.slice(t, n), h = 0; h < s; ++h)
                                if (c[h] !== u[h]) {
                                    o = c[h],
                                        a = u[h];
                                    break
                                }
                            return o < a ? -1 : a < o ? 1 : 0
                        }
                        ,
                        l.prototype.includes = function(e, t, n) {
                            return -1 !== this.indexOf(e, t, n)
                        }
                        ,
                        l.prototype.indexOf = function(e, t, n) {
                            return v(this, e, t, n, !0)
                        }
                        ,
                        l.prototype.lastIndexOf = function(e, t, n) {
                            return v(this, e, t, n, !1)
                        }
                        ,
                        l.prototype.write = function(e, t, n, i) {
                            if (void 0 === t)
                                i = "utf8",
                                    n = this.length,
                                    t = 0;
                            else if (void 0 === n && "string" == typeof t)
                                i = t,
                                    n = this.length,
                                    t = 0;
                            else {
                                if (!isFinite(t))
                                    throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                                t |= 0,
                                    isFinite(n) ? (n |= 0,
                                    void 0 === i && (i = "utf8")) : (i = n,
                                        n = void 0)
                            }
                            var r = this.length - t;
                            if ((void 0 === n || n > r) && (n = r),
                            e.length > 0 && (n < 0 || t < 0) || t > this.length)
                                throw new RangeError("Attempt to write outside buffer bounds");
                            i || (i = "utf8");
                            for (var o = !1; ; )
                                switch (i) {
                                    case "hex":
                                        return b(this, e, t, n);
                                    case "utf8":
                                    case "utf-8":
                                        return y(this, e, t, n);
                                    case "ascii":
                                        return A(this, e, t, n);
                                    case "latin1":
                                    case "binary":
                                        return w(this, e, t, n);
                                    case "base64":
                                        return x(this, e, t, n);
                                    case "ucs2":
                                    case "ucs-2":
                                    case "utf16le":
                                    case "utf-16le":
                                        return C(this, e, t, n);
                                    default:
                                        if (o)
                                            throw new TypeError("Unknown encoding: " + i);
                                        i = ("" + i).toLowerCase(),
                                            o = !0
                                }
                        }
                        ,
                        l.prototype.toJSON = function() {
                            return {
                                type: "Buffer",
                                data: Array.prototype.slice.call(this._arr || this, 0)
                            }
                        }
                    ;
                    var S = 4096;
                    function O(e, t, n) {
                        var i = "";
                        n = Math.min(e.length, n);
                        for (var r = t; r < n; ++r)
                            i += String.fromCharCode(127 & e[r]);
                        return i
                    }
                    function E(e, t, n) {
                        var i = "";
                        n = Math.min(e.length, n);
                        for (var r = t; r < n; ++r)
                            i += String.fromCharCode(e[r]);
                        return i
                    }
                    function D(e, t, n) {
                        var i = e.length;
                        (!t || t < 0) && (t = 0),
                        (!n || n < 0 || n > i) && (n = i);
                        for (var r = "", o = t; o < n; ++o)
                            r += R(e[o]);
                        return r
                    }
                    function T(e, t, n) {
                        for (var i = e.slice(t, n), r = "", o = 0; o < i.length; o += 2)
                            r += String.fromCharCode(i[o] + 256 * i[o + 1]);
                        return r
                    }
                    function P(e, t, n) {
                        if (e % 1 != 0 || e < 0)
                            throw new RangeError("offset is not uint");
                        if (e + t > n)
                            throw new RangeError("Trying to access beyond buffer length")
                    }
                    function I(e, t, n, i, r, o) {
                        if (!l.isBuffer(e))
                            throw new TypeError('"buffer" argument must be a Buffer instance');
                        if (t > r || t < o)
                            throw new RangeError('"value" argument is out of bounds');
                        if (n + i > e.length)
                            throw new RangeError("Index out of range")
                    }
                    function M(e, t, n, i) {
                        t < 0 && (t = 65535 + t + 1);
                        for (var r = 0, o = Math.min(e.length - n, 2); r < o; ++r)
                            e[n + r] = (t & 255 << 8 * (i ? r : 1 - r)) >>> 8 * (i ? r : 1 - r)
                    }
                    function j(e, t, n, i) {
                        t < 0 && (t = 4294967295 + t + 1);
                        for (var r = 0, o = Math.min(e.length - n, 4); r < o; ++r)
                            e[n + r] = t >>> 8 * (i ? r : 3 - r) & 255
                    }
                    function N(e, t, n, i, r, o) {
                        if (n + i > e.length)
                            throw new RangeError("Index out of range");
                        if (n < 0)
                            throw new RangeError("Index out of range")
                    }
                    function F(e, t, n, i, o) {
                        return o || N(e, 0, n, 4),
                            r.write(e, t, n, i, 23, 4),
                        n + 4
                    }
                    function L(e, t, n, i, o) {
                        return o || N(e, 0, n, 8),
                            r.write(e, t, n, i, 52, 8),
                        n + 8
                    }
                    l.prototype.slice = function(e, t) {
                        var n, i = this.length;
                        if (e = ~~e,
                            t = void 0 === t ? i : ~~t,
                            e < 0 ? (e += i) < 0 && (e = 0) : e > i && (e = i),
                            t < 0 ? (t += i) < 0 && (t = 0) : t > i && (t = i),
                        t < e && (t = e),
                            l.TYPED_ARRAY_SUPPORT)
                            (n = this.subarray(e, t)).__proto__ = l.prototype;
                        else {
                            var r = t - e;
                            n = new l(r,void 0);
                            for (var o = 0; o < r; ++o)
                                n[o] = this[o + e]
                        }
                        return n
                    }
                        ,
                        l.prototype.readUIntLE = function(e, t, n) {
                            e |= 0,
                                t |= 0,
                            n || P(e, t, this.length);
                            for (var i = this[e], r = 1, o = 0; ++o < t && (r *= 256); )
                                i += this[e + o] * r;
                            return i
                        }
                        ,
                        l.prototype.readUIntBE = function(e, t, n) {
                            e |= 0,
                                t |= 0,
                            n || P(e, t, this.length);
                            for (var i = this[e + --t], r = 1; t > 0 && (r *= 256); )
                                i += this[e + --t] * r;
                            return i
                        }
                        ,
                        l.prototype.readUInt8 = function(e, t) {
                            return t || P(e, 1, this.length),
                                this[e]
                        }
                        ,
                        l.prototype.readUInt16LE = function(e, t) {
                            return t || P(e, 2, this.length),
                            this[e] | this[e + 1] << 8
                        }
                        ,
                        l.prototype.readUInt16BE = function(e, t) {
                            return t || P(e, 2, this.length),
                            this[e] << 8 | this[e + 1]
                        }
                        ,
                        l.prototype.readUInt32LE = function(e, t) {
                            return t || P(e, 4, this.length),
                            (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
                        }
                        ,
                        l.prototype.readUInt32BE = function(e, t) {
                            return t || P(e, 4, this.length),
                            16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
                        }
                        ,
                        l.prototype.readIntLE = function(e, t, n) {
                            e |= 0,
                                t |= 0,
                            n || P(e, t, this.length);
                            for (var i = this[e], r = 1, o = 0; ++o < t && (r *= 256); )
                                i += this[e + o] * r;
                            return i >= (r *= 128) && (i -= Math.pow(2, 8 * t)),
                                i
                        }
                        ,
                        l.prototype.readIntBE = function(e, t, n) {
                            e |= 0,
                                t |= 0,
                            n || P(e, t, this.length);
                            for (var i = t, r = 1, o = this[e + --i]; i > 0 && (r *= 256); )
                                o += this[e + --i] * r;
                            return o >= (r *= 128) && (o -= Math.pow(2, 8 * t)),
                                o
                        }
                        ,
                        l.prototype.readInt8 = function(e, t) {
                            return t || P(e, 1, this.length),
                                128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
                        }
                        ,
                        l.prototype.readInt16LE = function(e, t) {
                            t || P(e, 2, this.length);
                            var n = this[e] | this[e + 1] << 8;
                            return 32768 & n ? 4294901760 | n : n
                        }
                        ,
                        l.prototype.readInt16BE = function(e, t) {
                            t || P(e, 2, this.length);
                            var n = this[e + 1] | this[e] << 8;
                            return 32768 & n ? 4294901760 | n : n
                        }
                        ,
                        l.prototype.readInt32LE = function(e, t) {
                            return t || P(e, 4, this.length),
                            this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
                        }
                        ,
                        l.prototype.readInt32BE = function(e, t) {
                            return t || P(e, 4, this.length),
                            this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
                        }
                        ,
                        l.prototype.readFloatLE = function(e, t) {
                            return t || P(e, 4, this.length),
                                r.read(this, e, !0, 23, 4)
                        }
                        ,
                        l.prototype.readFloatBE = function(e, t) {
                            return t || P(e, 4, this.length),
                                r.read(this, e, !1, 23, 4)
                        }
                        ,
                        l.prototype.readDoubleLE = function(e, t) {
                            return t || P(e, 8, this.length),
                                r.read(this, e, !0, 52, 8)
                        }
                        ,
                        l.prototype.readDoubleBE = function(e, t) {
                            return t || P(e, 8, this.length),
                                r.read(this, e, !1, 52, 8)
                        }
                        ,
                        l.prototype.writeUIntLE = function(e, t, n, i) {
                            e = +e,
                                t |= 0,
                                n |= 0,
                            i || I(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);
                            var r = 1
                                , o = 0;
                            for (this[t] = 255 & e; ++o < n && (r *= 256); )
                                this[t + o] = e / r & 255;
                            return t + n
                        }
                        ,
                        l.prototype.writeUIntBE = function(e, t, n, i) {
                            e = +e,
                                t |= 0,
                                n |= 0,
                            i || I(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);
                            var r = n - 1
                                , o = 1;
                            for (this[t + r] = 255 & e; --r >= 0 && (o *= 256); )
                                this[t + r] = e / o & 255;
                            return t + n
                        }
                        ,
                        l.prototype.writeUInt8 = function(e, t, n) {
                            return e = +e,
                                t |= 0,
                            n || I(this, e, t, 1, 255, 0),
                            l.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
                                this[t] = 255 & e,
                            t + 1
                        }
                        ,
                        l.prototype.writeUInt16LE = function(e, t, n) {
                            return e = +e,
                                t |= 0,
                            n || I(this, e, t, 2, 65535, 0),
                                l.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e,
                                    this[t + 1] = e >>> 8) : M(this, e, t, !0),
                            t + 2
                        }
                        ,
                        l.prototype.writeUInt16BE = function(e, t, n) {
                            return e = +e,
                                t |= 0,
                            n || I(this, e, t, 2, 65535, 0),
                                l.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8,
                                    this[t + 1] = 255 & e) : M(this, e, t, !1),
                            t + 2
                        }
                        ,
                        l.prototype.writeUInt32LE = function(e, t, n) {
                            return e = +e,
                                t |= 0,
                            n || I(this, e, t, 4, 4294967295, 0),
                                l.TYPED_ARRAY_SUPPORT ? (this[t + 3] = e >>> 24,
                                    this[t + 2] = e >>> 16,
                                    this[t + 1] = e >>> 8,
                                    this[t] = 255 & e) : j(this, e, t, !0),
                            t + 4
                        }
                        ,
                        l.prototype.writeUInt32BE = function(e, t, n) {
                            return e = +e,
                                t |= 0,
                            n || I(this, e, t, 4, 4294967295, 0),
                                l.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24,
                                    this[t + 1] = e >>> 16,
                                    this[t + 2] = e >>> 8,
                                    this[t + 3] = 255 & e) : j(this, e, t, !1),
                            t + 4
                        }
                        ,
                        l.prototype.writeIntLE = function(e, t, n, i) {
                            if (e = +e,
                                t |= 0,
                                !i) {
                                var r = Math.pow(2, 8 * n - 1);
                                I(this, e, t, n, r - 1, -r)
                            }
                            var o = 0
                                , a = 1
                                , s = 0;
                            for (this[t] = 255 & e; ++o < n && (a *= 256); )
                                e < 0 && 0 === s && 0 !== this[t + o - 1] && (s = 1),
                                    this[t + o] = (e / a >> 0) - s & 255;
                            return t + n
                        }
                        ,
                        l.prototype.writeIntBE = function(e, t, n, i) {
                            if (e = +e,
                                t |= 0,
                                !i) {
                                var r = Math.pow(2, 8 * n - 1);
                                I(this, e, t, n, r - 1, -r)
                            }
                            var o = n - 1
                                , a = 1
                                , s = 0;
                            for (this[t + o] = 255 & e; --o >= 0 && (a *= 256); )
                                e < 0 && 0 === s && 0 !== this[t + o + 1] && (s = 1),
                                    this[t + o] = (e / a >> 0) - s & 255;
                            return t + n
                        }
                        ,
                        l.prototype.writeInt8 = function(e, t, n) {
                            return e = +e,
                                t |= 0,
                            n || I(this, e, t, 1, 127, -128),
                            l.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
                            e < 0 && (e = 255 + e + 1),
                                this[t] = 255 & e,
                            t + 1
                        }
                        ,
                        l.prototype.writeInt16LE = function(e, t, n) {
                            return e = +e,
                                t |= 0,
                            n || I(this, e, t, 2, 32767, -32768),
                                l.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e,
                                    this[t + 1] = e >>> 8) : M(this, e, t, !0),
                            t + 2
                        }
                        ,
                        l.prototype.writeInt16BE = function(e, t, n) {
                            return e = +e,
                                t |= 0,
                            n || I(this, e, t, 2, 32767, -32768),
                                l.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8,
                                    this[t + 1] = 255 & e) : M(this, e, t, !1),
                            t + 2
                        }
                        ,
                        l.prototype.writeInt32LE = function(e, t, n) {
                            return e = +e,
                                t |= 0,
                            n || I(this, e, t, 4, 2147483647, -2147483648),
                                l.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e,
                                    this[t + 1] = e >>> 8,
                                    this[t + 2] = e >>> 16,
                                    this[t + 3] = e >>> 24) : j(this, e, t, !0),
                            t + 4
                        }
                        ,
                        l.prototype.writeInt32BE = function(e, t, n) {
                            return e = +e,
                                t |= 0,
                            n || I(this, e, t, 4, 2147483647, -2147483648),
                            e < 0 && (e = 4294967295 + e + 1),
                                l.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24,
                                    this[t + 1] = e >>> 16,
                                    this[t + 2] = e >>> 8,
                                    this[t + 3] = 255 & e) : j(this, e, t, !1),
                            t + 4
                        }
                        ,
                        l.prototype.writeFloatLE = function(e, t, n) {
                            return F(this, e, t, !0, n)
                        }
                        ,
                        l.prototype.writeFloatBE = function(e, t, n) {
                            return F(this, e, t, !1, n)
                        }
                        ,
                        l.prototype.writeDoubleLE = function(e, t, n) {
                            return L(this, e, t, !0, n)
                        }
                        ,
                        l.prototype.writeDoubleBE = function(e, t, n) {
                            return L(this, e, t, !1, n)
                        }
                        ,
                        l.prototype.copy = function(e, t, n, i) {
                            if (n || (n = 0),
                            i || 0 === i || (i = this.length),
                            t >= e.length && (t = e.length),
                            t || (t = 0),
                            i > 0 && i < n && (i = n),
                            i === n)
                                return 0;
                            if (0 === e.length || 0 === this.length)
                                return 0;
                            if (t < 0)
                                throw new RangeError("targetStart out of bounds");
                            if (n < 0 || n >= this.length)
                                throw new RangeError("sourceStart out of bounds");
                            if (i < 0)
                                throw new RangeError("sourceEnd out of bounds");
                            i > this.length && (i = this.length),
                            e.length - t < i - n && (i = e.length - t + n);
                            var r, o = i - n;
                            if (this === e && n < t && t < i)
                                for (r = o - 1; r >= 0; --r)
                                    e[r + t] = this[r + n];
                            else if (o < 1e3 || !l.TYPED_ARRAY_SUPPORT)
                                for (r = 0; r < o; ++r)
                                    e[r + t] = this[r + n];
                            else
                                Uint8Array.prototype.set.call(e, this.subarray(n, n + o), t);
                            return o
                        }
                        ,
                        l.prototype.fill = function(e, t, n, i) {
                            if ("string" == typeof e) {
                                if ("string" == typeof t ? (i = t,
                                    t = 0,
                                    n = this.length) : "string" == typeof n && (i = n,
                                    n = this.length),
                                1 === e.length) {
                                    var r = e.charCodeAt(0);
                                    r < 256 && (e = r)
                                }
                                if (void 0 !== i && "string" != typeof i)
                                    throw new TypeError("encoding must be a string");
                                if ("string" == typeof i && !l.isEncoding(i))
                                    throw new TypeError("Unknown encoding: " + i)
                            } else
                                "number" == typeof e && (e &= 255);
                            if (t < 0 || this.length < t || this.length < n)
                                throw new RangeError("Out of range index");
                            if (n <= t)
                                return this;
                            var o;
                            if (t >>>= 0,
                                n = void 0 === n ? this.length : n >>> 0,
                            e || (e = 0),
                            "number" == typeof e)
                                for (o = t; o < n; ++o)
                                    this[o] = e;
                            else {
                                var a = l.isBuffer(e) ? e : V(new l(e,i).toString())
                                    , s = a.length;
                                for (o = 0; o < n - t; ++o)
                                    this[o + t] = a[o % s]
                            }
                            return this
                        }
                    ;
                    var B = /[^+\/0-9A-Za-z-_]/g;
                    function R(e) {
                        return e < 16 ? "0" + e.toString(16) : e.toString(16)
                    }
                    function V(e, t) {
                        var n;
                        t = t || 1 / 0;
                        for (var i = e.length, r = null, o = [], a = 0; a < i; ++a) {
                            if ((n = e.charCodeAt(a)) > 55295 && n < 57344) {
                                if (!r) {
                                    if (n > 56319) {
                                        (t -= 3) > -1 && o.push(239, 191, 189);
                                        continue
                                    }
                                    if (a + 1 === i) {
                                        (t -= 3) > -1 && o.push(239, 191, 189);
                                        continue
                                    }
                                    r = n;
                                    continue
                                }
                                if (n < 56320) {
                                    (t -= 3) > -1 && o.push(239, 191, 189),
                                        r = n;
                                    continue
                                }
                                n = 65536 + (r - 55296 << 10 | n - 56320)
                            } else
                                r && (t -= 3) > -1 && o.push(239, 191, 189);
                            if (r = null,
                            n < 128) {
                                if ((t -= 1) < 0)
                                    break;
                                o.push(n)
                            } else if (n < 2048) {
                                if ((t -= 2) < 0)
                                    break;
                                o.push(n >> 6 | 192, 63 & n | 128)
                            } else if (n < 65536) {
                                if ((t -= 3) < 0)
                                    break;
                                o.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128)
                            } else {
                                if (!(n < 1114112))
                                    throw new Error("Invalid code point");
                                if ((t -= 4) < 0)
                                    break;
                                o.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128)
                            }
                        }
                        return o
                    }
                    function H(e) {
                        return i.toByteArray(function(e) {
                            if ((e = function(e) {
                                return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
                            }(e).replace(B, "")).length < 2)
                                return "";
                            for (; e.length % 4 != 0; )
                                e += "=";
                            return e
                        }(e))
                    }
                    function z(e, t, n, i) {
                        for (var r = 0; r < i && !(r + n >= t.length || r >= e.length); ++r)
                            t[r + n] = e[r];
                        return r
                    }
                }
            ).call(this, n("c8ba"))
        },
        "1fb5": function(e, t, n) {
            "use strict";
            t.byteLength = function(e) {
                var t = c(e)
                    , n = t[0]
                    , i = t[1];
                return 3 * (n + i) / 4 - i
            }
                ,
                t.toByteArray = function(e) {
                    var t, n, i = c(e), a = i[0], s = i[1], l = new o(function(e, t, n) {
                        return 3 * (t + n) / 4 - n
                    }(0, a, s)), u = 0, h = s > 0 ? a - 4 : a;
                    for (n = 0; n < h; n += 4)
                        t = r[e.charCodeAt(n)] << 18 | r[e.charCodeAt(n + 1)] << 12 | r[e.charCodeAt(n + 2)] << 6 | r[e.charCodeAt(n + 3)],
                            l[u++] = t >> 16 & 255,
                            l[u++] = t >> 8 & 255,
                            l[u++] = 255 & t;
                    return 2 === s && (t = r[e.charCodeAt(n)] << 2 | r[e.charCodeAt(n + 1)] >> 4,
                        l[u++] = 255 & t),
                    1 === s && (t = r[e.charCodeAt(n)] << 10 | r[e.charCodeAt(n + 1)] << 4 | r[e.charCodeAt(n + 2)] >> 2,
                        l[u++] = t >> 8 & 255,
                        l[u++] = 255 & t),
                        l
                }
                ,
                t.fromByteArray = function(e) {
                    for (var t, n = e.length, r = n % 3, o = [], a = 0, s = n - r; a < s; a += 16383)
                        o.push(u(e, a, a + 16383 > s ? s : a + 16383));
                    return 1 === r ? (t = e[n - 1],
                        o.push(i[t >> 2] + i[t << 4 & 63] + "==")) : 2 === r && (t = (e[n - 2] << 8) + e[n - 1],
                        o.push(i[t >> 10] + i[t >> 4 & 63] + i[t << 2 & 63] + "=")),
                        o.join("")
                }
            ;
            for (var i = [], r = [], o = "undefined" != typeof Uint8Array ? Uint8Array : Array, a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", s = 0, l = a.length; s < l; ++s)
                i[s] = a[s],
                    r[a.charCodeAt(s)] = s;
            function c(e) {
                var t = e.length;
                if (t % 4 > 0)
                    throw new Error("Invalid string. Length must be a multiple of 4");
                var n = e.indexOf("=");
                return -1 === n && (n = t),
                    [n, n === t ? 0 : 4 - n % 4]
            }
            function u(e, t, n) {
                for (var r, o, a = [], s = t; s < n; s += 3)
                    r = (e[s] << 16 & 16711680) + (e[s + 1] << 8 & 65280) + (255 & e[s + 2]),
                        a.push(i[(o = r) >> 18 & 63] + i[o >> 12 & 63] + i[o >> 6 & 63] + i[63 & o]);
                return a.join("")
            }
            r["-".charCodeAt(0)] = 62,
                r["_".charCodeAt(0)] = 63
        },
        9152: function(e, t) {
            t.read = function(e, t, n, i, r) {
                var o, a, s = 8 * r - i - 1, l = (1 << s) - 1, c = l >> 1, u = -7, h = n ? r - 1 : 0, d = n ? -1 : 1, f = e[t + h];
                for (h += d,
                         o = f & (1 << -u) - 1,
                         f >>= -u,
                         u += s; u > 0; o = 256 * o + e[t + h],
                         h += d,
                         u -= 8)
                    ;
                for (a = o & (1 << -u) - 1,
                         o >>= -u,
                         u += i; u > 0; a = 256 * a + e[t + h],
                         h += d,
                         u -= 8)
                    ;
                if (0 === o)
                    o = 1 - c;
                else {
                    if (o === l)
                        return a ? NaN : 1 / 0 * (f ? -1 : 1);
                    a += Math.pow(2, i),
                        o -= c
                }
                return (f ? -1 : 1) * a * Math.pow(2, o - i)
            }
                ,
                t.write = function(e, t, n, i, r, o) {
                    var a, s, l, c = 8 * o - r - 1, u = (1 << c) - 1, h = u >> 1, d = 23 === r ? Math.pow(2, -24) - Math.pow(2, -77) : 0, f = i ? 0 : o - 1, p = i ? 1 : -1, m = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
                    for (t = Math.abs(t),
                             isNaN(t) || t === 1 / 0 ? (s = isNaN(t) ? 1 : 0,
                                 a = u) : (a = Math.floor(Math.log(t) / Math.LN2),
                             t * (l = Math.pow(2, -a)) < 1 && (a--,
                                 l *= 2),
                             (t += a + h >= 1 ? d / l : d * Math.pow(2, 1 - h)) * l >= 2 && (a++,
                                 l /= 2),
                                 a + h >= u ? (s = 0,
                                     a = u) : a + h >= 1 ? (s = (t * l - 1) * Math.pow(2, r),
                                     a += h) : (s = t * Math.pow(2, h - 1) * Math.pow(2, r),
                                     a = 0)); r >= 8; e[n + f] = 255 & s,
                             f += p,
                             s /= 256,
                             r -= 8)
                        ;
                    for (a = a << r | s,
                             c += r; c > 0; e[n + f] = 255 & a,
                             f += p,
                             a /= 256,
                             c -= 8)
                        ;
                    e[n + f - p] |= 128 * m
                }
        },
        e3db: function(e, t) {
            var n = {}.toString;
            e.exports = Array.isArray || function(e) {
                return "[object Array]" == n.call(e)
            }
        },
        e04e: function(e, t, n) {
            "use strict";
            n.r(t),
                n.d(t, "encrypt", (function() {
                        return p
                    }
                )),
                n.d(t, "decrypt", (function() {
                        return m
                    }
                ));
            var i = 0
                , r = 32
                , o = 16
                , a = [214, 144, 233, 254, 204, 225, 61, 183, 22, 182, 20, 194, 40, 251, 44, 5, 43, 103, 154, 118, 42, 190, 4, 195, 170, 68, 19, 38, 73, 134, 6, 153, 156, 66, 80, 244, 145, 239, 152, 122, 51, 84, 11, 67, 237, 207, 172, 98, 228, 179, 28, 169, 201, 8, 232, 149, 128, 223, 148, 250, 117, 143, 63, 166, 71, 7, 167, 252, 243, 115, 23, 186, 131, 89, 60, 25, 230, 133, 79, 168, 104, 107, 129, 178, 113, 100, 218, 139, 248, 235, 15, 75, 112, 86, 157, 53, 30, 36, 14, 94, 99, 88, 209, 162, 37, 34, 124, 59, 1, 33, 120, 135, 212, 0, 70, 87, 159, 211, 39, 82, 76, 54, 2, 231, 160, 196, 200, 158, 234, 191, 138, 210, 64, 199, 56, 181, 163, 247, 242, 206, 249, 97, 21, 161, 224, 174, 93, 164, 155, 52, 26, 85, 173, 147, 50, 48, 245, 140, 177, 227, 29, 246, 226, 46, 130, 102, 202, 96, 192, 41, 35, 171, 13, 83, 78, 111, 213, 219, 55, 69, 222, 253, 142, 47, 3, 255, 106, 114, 109, 108, 91, 81, 141, 27, 175, 146, 187, 221, 188, 127, 17, 217, 92, 65, 31, 16, 90, 216, 10, 193, 49, 136, 165, 205, 123, 189, 45, 116, 208, 18, 184, 229, 180, 176, 137, 105, 151, 74, 12, 150, 119, 126, 101, 185, 241, 9, 197, 110, 198, 132, 24, 240, 125, 236, 58, 220, 77, 32, 121, 238, 95, 62, 215, 203, 57, 72]
                , s = [462357, 472066609, 943670861, 1415275113, 1886879365, 2358483617, 2830087869, 3301692121, 3773296373, 4228057617, 404694573, 876298825, 1347903077, 1819507329, 2291111581, 2762715833, 3234320085, 3705924337, 4177462797, 337322537, 808926789, 1280531041, 1752135293, 2223739545, 2695343797, 3166948049, 3638552301, 4110090761, 269950501, 741554753, 1213159005, 1684763257];
            function l(e, t) {
                return e << t | e >>> 32 - t
            }
            function c(e) {
                return (255 & a[e >>> 24 & 255]) << 24 | (255 & a[e >>> 16 & 255]) << 16 | (255 & a[e >>> 8 & 255]) << 8 | 255 & a[255 & e]
            }
            function u(e) {
                return e ^ l(e, 2) ^ l(e, 10) ^ l(e, 18) ^ l(e, 24)
            }
            function h(e) {
                return e ^ l(e, 13) ^ l(e, 23)
            }
            function d(e, t, n) {
                for (var i, r, o = new Array(4), a = new Array(4), s = 0; s < 4; s++)
                    a[0] = 255 & e[0 + 4 * s],
                        a[1] = 255 & e[1 + 4 * s],
                        a[2] = 255 & e[2 + 4 * s],
                        a[3] = 255 & e[3 + 4 * s],
                        o[s] = a[0] << 24 | a[1] << 16 | a[2] << 8 | a[3];
                for (i = 0; i < 32; i += 4)
                    r = c(r = o[1] ^ o[2] ^ o[3] ^ n[i + 0]),
                        o[0] ^= u(r),
                        r = c(r = o[2] ^ o[3] ^ o[0] ^ n[i + 1]),
                        o[1] ^= u(r),
                        r = c(r = o[3] ^ o[0] ^ o[1] ^ n[i + 2]),
                        o[2] ^= u(r),
                        r = c(r = o[0] ^ o[1] ^ o[2] ^ n[i + 3]),
                        o[3] ^= u(r);
                for (var l = 0; l < 16; l += 4)
                    t[l] = o[3 - l / 4] >>> 24 & 255,
                        t[l + 1] = o[3 - l / 4] >>> 16 & 255,
                        t[l + 2] = o[3 - l / 4] >>> 8 & 255,
                        t[l + 3] = 255 & o[3 - l / 4]
            }
            function f(e, t, n) {
                var a = []
                    , l = 0
                    , u = new Array(r);
                !function(e, t, n) {
                    for (var r, o, a = new Array(4), l = new Array(4), u = 0; u < 4; u++)
                        l[0] = 255 & e[0 + 4 * u],
                            l[1] = 255 & e[1 + 4 * u],
                            l[2] = 255 & e[2 + 4 * u],
                            l[3] = 255 & e[3 + 4 * u],
                            a[u] = l[0] << 24 | l[1] << 16 | l[2] << 8 | l[3];
                    for (a[0] ^= 2746333894,
                             a[1] ^= 1453994832,
                             a[2] ^= 1736282519,
                             a[3] ^= 2993693404,
                             r = 0; r < 32; r += 4)
                        o = c(o = a[1] ^ a[2] ^ a[3] ^ s[r + 0]),
                            t[r + 0] = a[0] ^= h(o),
                            o = c(o = a[2] ^ a[3] ^ a[0] ^ s[r + 1]),
                            t[r + 1] = a[1] ^= h(o),
                            o = c(o = a[3] ^ a[0] ^ a[1] ^ s[r + 2]),
                            t[r + 2] = a[2] ^= h(o),
                            o = c(o = a[0] ^ a[1] ^ a[2] ^ s[r + 3]),
                            t[r + 3] = a[3] ^= h(o);
                    if (n === i)
                        for (r = 0; r < 16; r++)
                            o = t[r],
                                t[r] = t[31 - r],
                                t[31 - r] = o
                }(t, u, n),
                    new Array(16);
                for (var f = new Array(16), p = e.length; p >= o; ) {
                    d(e.slice(l, l + 16), f, u);
                    for (var m = 0; m < o; m++)
                        a[l + m] = f[m];
                    p -= o,
                        l += o
                }
                return a
            }
            function p(e, t) {
                return f(e, t, 1)
            }
            function m(e, t) {
                return f(e, t, 0)
            }
            t.default = {
                encrypt: p,
                decrypt: m
            }
        },

    })
var l={
    "appCode": "T98HPCGN5ZVVQBS8LZQNOAEXVI9GYHKQ",
    "version": "1.0.0",
    "appSecret": "NMVFVILMKT13GEMD3BKPKCTBOQBPZR2P",
    "publicKey": "BEKaw3Qtc31LG/hTPHFPlriKuAn/nzTWl8LiRxLw4iQiSUIyuglptFxNkdCiNXcXvkqTH79Rh/A2sEFU6hjeK3k=",
    "privateKey": "AJxKNdmspMaPGj+onJNoQ0cgWk2E3CYFWKBJhpcJrAtC",
    "publicKeyType": "base64",
    "privateKeyType": "base64"
}
    , c = l.appCode
    , u = l.appSecret
    , h = l.publicKey
    , d = l.privateKey;
var r = fff("6c27").sha256
    , s = Math.ceil((new Date).getTime() / 1e3)
    , hh = pp()
    , f = s + hh + s;
var jjj={
    "code": 0,
    "data": {
        "signData": "050ocRW+kHrQqoNYO6jP6xQUkc9JBOJ6WDfMwxV9jt5/3ULG3mvBxEWa63HDTh2EutxCDOm/M1w3ceOSLpaF8Q==",
        "encType": "SM4",
        "data": {
            "encData": "BB10DD6EB3C3BB78A9232D1BE088763D11C222E098B460E84A0DA13AE1563BAC9E9E67C3BC57226C4CE605A405543A1E94E77742F4F1E4B3DA8360361DE462776A7D69806320A9A029F3B54577627C9E876BE02D2064B04ED9957F0AB605C752E18A23F1DACE59478E521E6B7DE9D865FA2DEDED64620759FFB1902AA3A961D60219A4A35330ED78A5C20B59384C689021658D08FE3323C9FD8F4D5C3F94FBCB10BF0C42B297EFCE2147B5549204D6232C590AE182FE5ACF23F55782D845E527F7BD908CC76907F2B21AA620C330299C03A0CCDAB74CC990B051CFB75AA49AA1EAE09C0F8E1B042562CB198EF3BA0AD209C3D24F735FD3441C3CC6C51BE8190CE53202CF8783CAEDE98D6B5A8368B781EC52411FEEE01EEECD2E16E844D69E3ED68EB065523EA6763743516A04B7871A6DE278D67EFE122886895A7B376C99B78343573EB5CC99C8C6614D123130042C0CBB9D2D1206F22ADCD6434B640F021B7172E3353CE29BF9DE43A45F2E01B8F38C061A83BE8A5BA89EEA3D2CB66EC40988E6F9E644FE8DA610BA10B43D5BCBF050F9753C57964965D3A6D1D636625D360219A4A35330ED78A5C20B59384C689021658D08FE3323C9FD8F4D5C3F94FBCB878F859940DE7A27A835494EF11EC9D75612416D0E2DC30810864C72F26F5EF255870FEE53DAD1CA1C87D1F2AA65BE1AAB157A31405DA6C817500CC6925C0251D9096C7C2120531BC96EECCFC7DE250BA451F96D39CC9BA63437460BBEA2A086B33C19386C5DD990105983655DA46B1650F9753C57964965D3A6D1D636625D3657EF5554E70DF20419FB905BF6F98DDA067D6C20CAFDE948DC3A103914B2F58A511D9E8CC91CFD01965F7C8D798F7BB4E13453881245615C917D409D2D01E95922098A0F945BE099F49C94AA07BAF142C5C24564F0FD52F312B33116606866E7F2F836EA57FAF8AB6ED7A386C306A53129FEFA444CE9CE6BAB23568D196EC2C4B238781CDF8B0027243EAD9C98D34FFCF6A2EAFB41F434378084CCC5B7639459C8E296AB88A5475854916763EFA1970DAC67FB3B38DC76925B4A1E72442195B365E8B109E69349ADD4E1CE13FB320BE6652B2A7544689F287CF29F5CEA3B349169E5C1DD5F1379AF28286F81DFDD3DE5A8C49874E30A556DE3EB37FB2DBF953586D71C87EDEABC65765B93FEA41A8EDC860A2AABFFF1379FA655D01CD02CB69F08AC4DEBD4435C8E908CCA28DA07B81B5FF11F919FAD49710A7CF8905B5C4B71BDDD31BCF33BAC2D8CEF92B89A2D724831EDE75FA2AD081A07DD2458FCAF627F6D205BEB128D8F19327280357BF88E59FA6056C226E7F1200B2195B169C8980D60BC0F26B9E27A89C77456C89C672DF6B1BFD8EEB67BD6C59C894ED9CAC8CCF45D78D7E59FAB9FC46CE2D477ACA8275F78F70EA446D1E769343CAE62E60F672BE0EA58114DBDF74572451C32796814059AC522D1802793A1BDFEBA7522341AB1BCFDCF8622ABD4CD5CC8BE9BBF5F5AA385F2C5F38DC511BD9193478FA91CA51FE313A3E214439E051C032F73B72DFED2316DF391FBBC8E034DA973E3DA899F91C7D91933D677A61B03FD8DAF50C2D9A95B39656B66C152FC8EEFBCB9CE1DFC4A3FA135CDC715A23E7E769610362823E7EB016F4E90641C16632D0FBC39399258C7D91933D677A61B03FD8DAF50C2D9A9DDA5AEB388235DBF15C4CE101C21B243BD1E189A108B46E7E68B1B124CA6BB67312B355E94DCD4CCA05BB0E3D677624355A6E7B705952DA0223414906F9224CEE0A45BEF903F211C10A1057DE75CAFDEE18A23F1DACE59478E521E6B7DE9D8650EA8537CBE959F8CBC889C4A4259F1AF6D21758DF098B1FDD2761DDAAC13BA4386A7A2855A90A6334A00B9AAE0172317AB2EF5E75964BB5EB38A00D4E165871B07A7BA5418EFA266D2DFFF0EBE2B8A41119C4118D72CA9BB7B0490110C83705CA04E0819963330EC5618F7848D693F21EAFF8B361C01D88C567D31F6F59D061F5D1CF942F8AC46C4EEABA9F750E3E51332FA8BA74E19C3B9F6996C3403C0ACC23FA135CDC715A23E7E769610362823E7EB016F4E90641C16632D0FBC39399258C7D91933D677A61B03FD8DAF50C2D9A918B66CD300057FDAA7F0B129FB27A0FCCE8F342E36BC3B8FB21618896E30B09603AB034699F1A3FE7087E1885D240E28FD87D0756091831F3FEC2793BB10CA167ABCD528C67104815E04D4D05DAA7E1D521CED5CE61818F88089CBAD04B1DD307EC47E1A303C9C8E1D645D2B113D609FECF077B5E2EE96D05FF77DF21330B8846BE1006101F82823FC2D95C4863E521641AA919A95D01310A9A1E541DF0200BE6AD1C987F152097417FDF36AE2542D8149E3ECF7F89C1E82533991F33726C9FAE5E234AF8F28010124E4C6F2E7D96188A6857200B5FD24C93A841F6A343420EB8E80DDE3016173828B351A8E09DC20548A86C3889F2B1EDDDDC9D032046F00DB5E4A4EB152907743EE47A7D669003FC1E249CC83B1E629F58BF3482794C59E7F748660E5421C1AECFB3E798298438AB80487FBE45705089FB315CE71A9238736CE8D1336F2FC89719533692F93B8A513FB80631F896DE2B108ED17843A3A37672021FEE6FAA310D325CEA67BEBB34A4C651F10776FC8E94EA86730CA8206CABD312B355E94DCD4CCA05BB0E3D67762430CFAF55E3BC28D92944E88128D6B86ACE0A45BEF903F211C10A1057DE75CAFDEE18A23F1DACE59478E521E6B7DE9D8657BEB16F625ADAF61A2D7452C4BAF453E33941A3FD3A4FF59429377CFDB57D7B386A7A2855A90A6334A00B9AAE0172317AB2EF5E75964BB5EB38A00D4E165871B26E794F9941FD017F0C3C4ED78573F18647E929EFDA71CFAC55AB34367237321D8EAFDF25D42E3ACF825EDD2B7C053DA17555AC8E3F727BE621039E22D3C808AF125DF07DBC6BF233FF8BA89B1F1E824566871C8CC9AD6F512DEBCD16E1624F4E1C641504A6547A561144DB37317DCC6B76F58D6399F528EBBE34D118F949A71969F3ABB11E8773827AD7FC2C75C4F1DE11BEA4AC04A6E7F1F04969E9496964F616EEF22BEE36B28B0A68B54381BA3271292D1F346B2B3CFE776DFA1C5C6D0B630AB5F51F24312684FFCF82106B8CF820DD323734B29304579900B7B3F68E777195AD07990CAE14A396C0EE97A7B9455A3FEDFCAFFAA96C5D47278756430CC08D51B686620B14A60A04C9F8B2820EF5F1158A345A24554C2024244C462AF71DF75DCBFDDB1C69B7EDE1B47173A03104B86E285FE5C0A8624A05FA4BEFA045DAA68E977ACD54FEC52CAD6EF24DB6E132999E56203789ACCEB55C17E9490DE2D3910AE189CA5BD229AA652F6AF81E2AE9AE05C78E6C16E273CCE0DD25169CBCAE710E505284B2B3D098D0AFBC38442B63F5EDBB758DE480A8F40118FC232C4A36743737541232F407554283630EFB120CFD988396BAFA749DEAB1E22D0AF4A75A4BF40B73A95B2AE81B40D54C72F27DD320410071936DE4D519094621EE3C620B6B246C2412B22F521E0926E3C0114585095543525D78286EE50E4104CDFE764E3BBBB57F889D11DEB79533F74569A27D9A587633CF2E83166BD6F68B50D0AA0C66F912E9D519C71BF4C3947D52473A8191D203F92ADE54B1A112A5C1053AF656923BFBA4088E5B429077154E60225B7DC8B64A62F323C51129CD67847C4310D7C55C5B33480ED7ABBB7E83059D2FC0C7EA626BA7E02C56C8337F691D93052527046754D6BC1D1FE94B48002DD796FDD9820F97EC7FC712764840CF7DC4BF4BF7BFFEE25DC2881A3C9BAF69C7E20D49FBAEAE09C0F8E1B042562CB198EF3BA0AD29FD0FE0B9B12637A79E42E4A870942065C0F6A2DED30474050E9034BC6C7D28F515A5D2ECF9D8D60DA33E4C0E8E2334F93A178569B4E39BB1110CDCD5D6CDA1F4C06B09E58FD287EBBFF09E141FB431261C3042E1225A6393F5BDF6FFB50A95E259000C942BE31501D4491C6C67D6AC012B281D4A304CF208DB1A0D76667B0943B5816241A8A1CFB718061230F7C1CF00DD323734B29304579900B7B3F68E7770EFCE4FCE183ED2B394C59A5E53416F02939C5A659B2C4DFA88FCE1652441E3DE413ECA217A051B44A8DD345D2A481E3C62D303D430B25D08FAD6A6B72E5FF0BEFA89425F56ADE51EFD9E4F0520D2407D2E2F51CF8860FDAF5A4174187BA13BA0A9A93128333D3F2841DA9A15915E46DFD99CA1F03C5A81ACEAA33A726DF4AE93B4D74BB86296F2DE63DAE4DD2B54D5E99525EE7B77CF1E63FB487A3C65AC27AD373B817E37D7D4EA6E633944C787B1E37F8FD78CB795E9A04144FF331950E06231895BB0C6C6C2E9DCC3B7F24B86939212BFF39A31D407E2F8E1352D46D51C13900DA3AA023EB7646ED1766D9FF0DB7904C8A56EE7EF82E176E857B08E310AD6D205BEB128D8F19327280357BF88E590B6A743006F65653EEFDC7BCDE07CA79530D5FB031DE2F905A2A4A6FB4F93A368510FB7D07053C10E2D62FE6DA5DEC856E45E26C8526E8D21B1AEE608790B4F7049AE742F362F699FEAFA34197076A548597DED8BE050938A49D777E6F1CC57D32F642FB06C03DDE7B3750F98B8315085D73B7F415111E52CC1888E11D34EDBF420998AEE656545E3750FEC388858405202048B962AE627DB74857C31A97D97C70402394B1BE3E4ED8BB313DAE0382FAA62B0714B35909F5038312267F665AACE5B0905E7BAFD0EE21D91A779A7C737C"
        },
        "signType": "SM2",
        "appCode": "T98HPCGN5ZVVQBS8LZQNOAEXVI9GYHKQ",
        "version": "1.0.0",
        "timestamp": "1645151468870"
    },
    "message": "成功",
    "timestamp": "1645151468",
    "type": "success"
}


function m(e) {
    var t = {}
        , n = ["signData", "encData", "extra"];
    for (var i in e)
        e.hasOwnProperty(i) && !n.includes(i) && null != e[i] && (t[i] = e[i]);
    return t
}
function p(e) {
    var t = new Array
        , n = 0;
    for (var i in e)
        t[n] = i,
            n++;
    var r = [].concat(t).sort()
        , o = {};
    for (var a in r)
        o[r[a]] = e[r[a]];
    return o
}
function v(e) {
    var t = [];
    for (var n in e)
        if (e.hasOwnProperty(n) && (e[n] || "".concat(e[n])))
            if ("data" === n) {
                var i = Object.assign({}, e[n]);
                for (var r in i) {
                    if ("number" != typeof i[r] && "boolean" != typeof i[r] || (i[r] = "" + i[r]),
                    Array.isArray(i[r]) && !i[r].length && delete i[r],
                    Array.isArray(i[r]) && i[r].length > 0)
                        for (var o = 0; o < i[r].length; o++)
                            i[r][o] = p(i[r][o]);
                    null != i[r] && i[r] || delete i[r]
                }
                var a = p(i);
                t.push("".concat(n, "=").concat(JSON.stringify(a)))
            } else
                t.push("".concat(n, "=").concat(e[n]));
    return t.push("key=".concat(u)),
        t.join("&")
}
function sign(t) {
    try {
        var n = m(t.data)
            , i = p(n);
        i.data = p(i.data);
        var r = v(i)
            ,d_ ="009c4a35d9aca4c68f1a3fa89c93684347205a4d84dc260558a049869709ac0b42"
            , a = SM2.doSignature(r, d_, {
            hash: !0
        });
        return e_.Buffer.from(a, "hex").toString("base64")
    } catch (e) {}
}
function A(e) {
    var t, n, i = new Array;
    t = e.length;
    for (var r = 0; r < t; r++)
        (n = e.charCodeAt(r)) >= 65536 && n <= 1114111 ? (i.push(n >> 18 & 7 | 240),
            i.push(n >> 12 & 63 | 128),
            i.push(n >> 6 & 63 | 128),
            i.push(63 & n | 128)) : n >= 2048 && n <= 65535 ? (i.push(n >> 12 & 15 | 224),
            i.push(n >> 6 & 63 | 128),
            i.push(63 & n | 128)) : n >= 128 && n <= 2047 ? (i.push(n >> 6 & 31 | 192),
            i.push(63 & n | 128)) : i.push(255 & n);
    return i
}
function getheader(){
    var headers={};
    return headers["x-tif-paasid"] = l.paasId,
        headers["x-tif-signature"] = r(f),
        headers["x-tif-timestamp"] = s.toString(),
        headers["x-tif-nonce"] = hh,
        headers["Accept"] = "application/json",
        headers["contentType"] = "application/x-www-form-urlencoded",
        headers

}
function pp() {
        var e, t, n, i = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", r = "0123456789";
        return e = o(6, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"),
            t = o(1, i),
            n = o(1, r),
        t + n + e;
        function o(e, t) {
            e = e || 32;
            for (var n = "", i = 0; i < e; i++)
                n += t.charAt(Math.ceil(1e3 * Math.random()) % t.length);
            return n
        }
    }
function y(t, n) {
    var i = 16 - parseInt(n.length % 16);
    n = n.concat(new Array(i).fill(i));
    var r = SM4.encrypt(n, t);
    return e_.Buffer.from(r).toString("hex")
}
function b(e, t) {
    return A(y(A(e.substr(0, 16)), A(t)).toUpperCase().substr(0, 16))
}
function getdata(data){
    var t={"data":data}
     return t.data = {
        data: t.data || {}
    },
        t.data.appCode = l.appCode,
        t.data.version = l.version,
        t.data.encType = "SM4",
        t.data.signType = "SM2",
        t.data.timestamp = s,
         t.data.signData=sign(t),
         t.data.data ={encData:endata("SM4",t)},
         t


}
function endata(e, t) {
    switch (e.toUpperCase()) {
        case "SM2":
            return function(e) {
                try {
                    var t = o.generateKeyPairHex()
                        , n = t.publicKey
                        , i = e;
                    o.doEncrypt(i, n, 1)
                } catch (e) {}
            }(t);
        case "SM3":
            return function(e) {
                try {
                    var t = a(e);
                    return t
                } catch (e) {}
            }(t);
        case "SM4":
            return function(e) {
                try {
                    var t = e.data.data && JSON.stringify(e.data.data)
                        , n = A(t);
                    e.data.appCode && e.data.appCode !== c && (c = e.data.appCode);
                    var i = b(c, u)
                        , r = y(i, n);
                    return r.toUpperCase()
                } catch (e) {}
            }(t)
    }
}
function jiemi(t) {
                if (!t)
                    return null;
                var n = e_.Buffer.from(t.data.data.encData, "hex")
                    , i = function(t, n) {
                    var i = SM4.decrypt(n, t)
                        , r = i[i.length - 1];
                    return i = i.slice(0, i.length - r),
                        e_.Buffer.from(i).toString("utf-8")
                }(b(c, u), n);
                return JSON.parse(i)
            }



var data_={"addr": "", "regnCode": "110000", "medinsName": "", "sprtEcFlag": "", "medinsLvCode": "", "medinsTypeCode": "", "pageNum": 4, "pageSize": 10}
// console.log(endata("SM4",aaa))
// console.log(getheader())
// console.log(getdata(data_))
// console.log(jiemi(jjj))
