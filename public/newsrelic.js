window.NREUM || (NREUM = {})
NREUM.init = {
  distributed_tracing: { enabled: true },
  privacy: { cookies_enabled: true },
  ajax: { deny_list: ['bam.eu01.nr-data.net'] }
}

NREUM.loader_config = {
  accountID: '3798620',
  trustKey: '3798620',
  agentID: '535906489',
  licenseKey: 'NRJS-9b316a85c8dbfe78224',
  applicationID: '535906489'
}
NREUM.info = {
  beacon: 'bam.eu01.nr-data.net',
  errorBeacon: 'bam.eu01.nr-data.net',
  licenseKey: 'NRJS-9b316a85c8dbfe78224',
  applicationID: '535906489',
  sa: 1
}
;(() => {
  var __webpack_modules__ = {
      507: (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        'use strict'
        function detectPolyfillFeatures() {
          const featureStatus = {}
          return (
            checkAndAddFeature('Promise', 'PROMISE'),
            checkAndAddFeature('Array.prototype.includes', 'ARRAY_INCLUDES'),
            checkAndAddFeature('Object.assign', 'OBJECT_ASSIGN'),
            checkAndAddFeature('Object.entries', 'OBJECT_ENTRIES'),
            featureStatus
          )
          function checkAndAddFeature(funcString, featName) {
            try {
              let func = eval('self.' + funcString)
              ;-1 !== func.toString().indexOf('[native code]')
                ? (featureStatus[featName] = Status.NATIVE)
                : (featureStatus[featName] = Status.CHANGED)
            } catch {
              featureStatus[featName] = Status.UNAVAIL
            }
          }
        }
        __webpack_require__.d(__webpack_exports__, {
          n: () => detectPolyfillFeatures
        })
        const Status = {
          UNAVAIL: 'NotSupported',
          NATIVE: 'Detected',
          CHANGED: 'Modified'
        }
      },
      2687: (e, t, r) => {
        'use strict'
        r.d(t, { Z: () => n })
        const n = (0, r(2141).ky)(16)
      },
      1719: (e, t, r) => {
        'use strict'
        r.d(t, { I: () => n })
        var n = 0,
          i = navigator.userAgent.match(/Firefox[\/\s](\d+\.\d+)/)
        i && (n = +i[1])
      },
      3524: (e, t, r) => {
        'use strict'
        let n
        if ((r.d(t, { H: () => i }), r(8438).il)) {
          const e = document.createElement('div')
          ;(e.innerHTML =
            '\x3c!--[if lte IE 6]><div></div><![endif]--\x3e\x3c!--[if lte IE 7]><div></div><![endif]--\x3e\x3c!--[if lte IE 8]><div></div><![endif]--\x3e\x3c!--[if lte IE 9]><div></div><![endif]--\x3e'),
            (n = e.getElementsByTagName('div').length)
        }
        var i
        i = 4 === n ? 6 : 3 === n ? 7 : 2 === n ? 8 : 1 === n ? 9 : 0
      },
      5970: (e, t, r) => {
        'use strict'
        r.d(t, {
          P_: () => l,
          Mt: () => h,
          C5: () => c,
          DL: () => b,
          OP: () => R,
          Yu: () => m,
          Dg: () => p,
          CX: () => u,
          GE: () => g,
          sU: () => N
        })
        var n = {}
        r.r(n), r.d(n, { agent: () => x, match: () => E, version: () => P })
        var i = r(4580)
        class o {
          constructor(e, t) {
            return e && 'object' == typeof e
              ? t && 'object' == typeof t
                ? (Object.assign(this, t),
                  void Object.entries(e).forEach((e) => {
                    let [t, r] = e
                    this[t] = r
                  }))
                : console.error(
                    'setting a Configurable requires a model to set its initial properties'
                  )
              : console.error(
                  'setting a Configurable requires an object as input'
                )
          }
        }
        const a = {
            beacon: i.ce.beacon,
            errorBeacon: i.ce.errorBeacon,
            licenseKey: void 0,
            applicationID: void 0,
            sa: void 0,
            queueTime: void 0,
            applicationTime: void 0,
            ttGuid: void 0,
            user: void 0,
            account: void 0,
            product: void 0,
            extra: void 0,
            jsAttributes: {},
            userAttributes: void 0,
            atts: void 0,
            transactionName: void 0,
            tNamePlain: void 0
          },
          s = {}
        function c(e) {
          if (!e)
            throw new Error('All info objects require an agent identifier!')
          if (!s[e]) throw new Error(`Info for ${e} was never set`)
          return s[e]
        }
        function u(e, t) {
          if (!e)
            throw new Error('All info objects require an agent identifier!')
          ;(s[e] = new o(t, a)), (0, i.Qy)(e, s[e], 'info')
        }
        const d = {
            allow_bfcache: !1,
            privacy: { cookies_enabled: !0 },
            ajax: { deny_list: void 0, enabled: !0 },
            distributed_tracing: {
              enabled: void 0,
              exclude_newrelic_header: void 0,
              cors_use_newrelic_header: void 0,
              cors_use_tracecontext_headers: void 0,
              allowed_origins: void 0
            },
            ssl: void 0,
            obfuscate: void 0,
            jserrors: { enabled: !0 },
            metrics: { enabled: !0 },
            page_action: { enabled: !0 },
            page_view_event: { enabled: !0 },
            page_view_timing: { enabled: !0 },
            session_trace: { enabled: !0 },
            spa: { enabled: !0 }
          },
          f = {}
        function l(e) {
          if (!e)
            throw new Error(
              'All configuration objects require an agent identifier!'
            )
          if (!f[e]) throw new Error(`Configuration for ${e} was never set`)
          return f[e]
        }
        function p(e, t) {
          if (!e)
            throw new Error(
              'All configuration objects require an agent identifier!'
            )
          ;(f[e] = new o(t, d)), (0, i.Qy)(e, f[e], 'config')
        }
        function h(e, t) {
          if (!e)
            throw new Error(
              'All configuration objects require an agent identifier!'
            )
          var r = l(e)
          if (r) {
            for (var n = t.split('.'), i = 0; i < n.length - 1; i++)
              if ('object' != typeof (r = r[n[i]])) return
            r = r[n[n.length - 1]]
          }
          return r
        }
        const v = {
            accountID: void 0,
            trustKey: void 0,
            agentID: void 0,
            licenseKey: void 0,
            applicationID: void 0,
            xpid: void 0
          },
          _ = {}
        function b(e) {
          if (!e)
            throw new Error(
              'All loader-config objects require an agent identifier!'
            )
          if (!_[e]) throw new Error(`LoaderConfig for ${e} was never set`)
          return _[e]
        }
        function g(e, t) {
          if (!e)
            throw new Error(
              'All loader-config objects require an agent identifier!'
            )
          ;(_[e] = new o(t, v)), (0, i.Qy)(e, _[e], 'loader_config')
        }
        const m = (0, i.mF)().o
        var w = r(3524),
          y = r(9206),
          x = null,
          P = null
        if (navigator.userAgent) {
          var O = navigator.userAgent,
            k = O.match(/Version\/(\S+)\s+Safari/)
          k &&
            -1 === O.indexOf('Chrome') &&
            -1 === O.indexOf('Chromium') &&
            ((x = 'Safari'), (P = k[1]))
        }
        function E(e, t) {
          if (!x) return !1
          if (e !== x) return !1
          if (!t) return !0
          if (!P) return !1
          for (var r = P.split('.'), n = t.split('.'), i = 0; i < n.length; i++)
            if (n[i] !== r[i]) return !1
          return !0
        }
        var S = r(2141),
          C = r(8438)
        const T = 'NRBA_SESSION_ID'
        function A() {
          if (!C.il) return null
          try {
            let e
            return (
              null === (e = window.sessionStorage.getItem(T)) &&
                ((e = (0, S.ky)(16)), window.sessionStorage.setItem(T, e)),
              e
            )
          } catch (e) {
            return null
          }
        }
        var q = C.ZP?.XMLHttpRequest,
          I = q && q.prototype
        const j = {}
        function R(e) {
          if (!e)
            throw new Error('All runtime objects require an agent identifier!')
          if (!j[e]) throw new Error(`Runtime for ${e} was never set`)
          return j[e]
        }
        function N(e, t) {
          if (!e)
            throw new Error('All runtime objects require an agent identifier!')
          var r
          ;(j[e] = new o(
            t,
            ((r = e),
            {
              customTransaction: void 0,
              disabled: !1,
              features: {},
              loaderType: void 0,
              maxBytes: 6 === w.H ? 2e3 : 3e4,
              offset: (0, y.yf)(),
              onerror: void 0,
              origin: '' + C.ZP?.location,
              ptid: void 0,
              releaseIds: {},
              sessionId: 1 == h(r, 'privacy.cookies_enabled') ? A() : null,
              xhrWrappable:
                q &&
                I &&
                I.addEventListener &&
                !/CriOS/.test(navigator.userAgent),
              userAgent: n
            })
          )),
            (0, i.Qy)(e, j[e], 'runtime')
        }
      },
      8873: (e, t, r) => {
        'use strict'
        r.d(t, { q: () => n })
        const n = ['1222', 'PROD'].filter((e) => e).join('.')
      },
      1925: (e, t, r) => {
        'use strict'
        r.d(t, { w: () => i })
        const n = { agentIdentifier: '' }
        class i {
          constructor(e) {
            if ('object' != typeof e)
              return console.error('shared context requires an object as input')
            ;(this.sharedContext = {}),
              Object.assign(this.sharedContext, n),
              Object.entries(e).forEach((e) => {
                let [t, r] = e
                Object.keys(n).includes(t) && (this.sharedContext[t] = r)
              })
          }
        }
      },
      2071: (e, t, r) => {
        'use strict'
        r.d(t, { c: () => d, ee: () => c })
        var n = r(4580),
          i = r(9010),
          o = r(9599),
          a = 'nr@context'
        let s = (0, n.fP)()
        var c
        function u() {}
        function d(e) {
          return (0, i.X)(e, a, f)
        }
        function f() {
          return new u()
        }
        function l() {
          ;(c.backlog.api || c.backlog.feature) &&
            ((c.aborted = !0), (c.backlog = {}))
        }
        s.ee
          ? (c = s.ee)
          : ((c = (function e(t, r) {
              var n = {},
                s = {},
                d = {},
                p = {
                  on: _,
                  addEventListener: _,
                  removeEventListener: b,
                  emit: v,
                  get: m,
                  listeners: g,
                  context: h,
                  buffer: w,
                  abort: l,
                  aborted: !1,
                  isBuffering: y,
                  debugId: r,
                  backlog: t && t.backlog ? t.backlog : {}
                }
              return p
              function h(e) {
                return e && e instanceof u ? e : e ? (0, i.X)(e, a, f) : f()
              }
              function v(e, r, n, i, o) {
                if ((!1 !== o && (o = !0), !c.aborted || i)) {
                  t && o && t.emit(e, r, n)
                  for (var a = h(n), u = g(e), d = u.length, f = 0; f < d; f++)
                    u[f].apply(a, r)
                  var l = x()[s[e]]
                  return l && l.push([p, e, r, a]), a
                }
              }
              function _(e, t) {
                n[e] = g(e).concat(t)
              }
              function b(e, t) {
                var r = n[e]
                if (r)
                  for (var i = 0; i < r.length; i++)
                    r[i] === t && r.splice(i, 1)
              }
              function g(e) {
                return n[e] || []
              }
              function m(t) {
                return (d[t] = d[t] || e(p, t))
              }
              function w(e, t) {
                var r = x()
                p.aborted ||
                  (0, o.D)(e, function (e, n) {
                    ;(t = t || 'feature'), (s[n] = t), t in r || (r[t] = [])
                  })
              }
              function y(e) {
                return !!x()[s[e]]
              }
              function x() {
                return p.backlog
              }
            })(void 0, 'globalEE')),
            (s.ee = c))
      },
      3195: (e, t, r) => {
        'use strict'
        r.d(t, { E: () => n, p: () => i })
        var n = r(2071).ee.get('handle')
        function i(e, t, r, i, o) {
          o
            ? (o.buffer([e], i), o.emit(e, t, r))
            : (n.buffer([e], i), n.emit(e, t, r))
        }
      },
      4539: (e, t, r) => {
        'use strict'
        r.d(t, { X: () => o })
        var n = r(3195)
        o.on = a
        var i = (o.handlers = {})
        function o(e, t, r, o) {
          a(o || n.E, i, e, t, r)
        }
        function a(e, t, r, i, o) {
          o || (o = 'feature'), e || (e = n.E)
          var a = (t[o] = t[o] || {})
          ;(a[r] = a[r] || []).push([e, i])
        }
      },
      3585: (e, t, r) => {
        'use strict'
        r.d(t, { bP: () => s, iz: () => c, m$: () => a })
        var n = r(8438),
          i = !1
        try {
          var o = Object.defineProperty({}, 'passive', {
            get: function () {
              i = !0
            }
          })
          n.ZP?.addEventListener('testPassive', null, o),
            n.ZP?.removeEventListener('testPassive', null, o)
        } catch (e) {}
        function a(e) {
          return i ? { passive: !0, capture: !!e } : !!e
        }
        function s(e, t) {
          let r =
            arguments.length > 2 && void 0 !== arguments[2] && arguments[2]
          window.addEventListener(e, t, a(r))
        }
        function c(e, t) {
          let r =
            arguments.length > 2 && void 0 !== arguments[2] && arguments[2]
          document.addEventListener(e, t, a(r))
        }
      },
      2141: (e, t, r) => {
        'use strict'
        r.d(t, { Ht: () => a, M: () => o, Rl: () => i, ky: () => s })
        var n = r(8438)
        function i() {
          var e = null,
            t = 0,
            r = n.ZP?.crypto || n.ZP?.msCrypto
          function i() {
            return e ? 15 & e[t++] : (16 * Math.random()) | 0
          }
          r && r.getRandomValues && (e = r.getRandomValues(new Uint8Array(31)))
          for (
            var o, a = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx', s = '', c = 0;
            c < a.length;
            c++
          )
            s +=
              'x' === (o = a[c])
                ? i().toString(16)
                : 'y' === o
                ? (o = (3 & i()) | 8).toString(16)
                : o
          return s
        }
        function o() {
          return s(16)
        }
        function a() {
          return s(32)
        }
        function s(e) {
          var t = null,
            r = 0,
            n = self.crypto || self.msCrypto
          n &&
            n.getRandomValues &&
            Uint8Array &&
            (t = n.getRandomValues(new Uint8Array(31)))
          for (var i = [], o = 0; o < e; o++) i.push(a().toString(16))
          return i.join('')
          function a() {
            return t ? 15 & t[r++] : (16 * Math.random()) | 0
          }
        }
      },
      9206: (e, t, r) => {
        'use strict'
        r.d(t, { nb: () => c, os: () => u, yf: () => s, zO: () => a })
        var n = r(1209),
          i = new Date().getTime(),
          o = i
        function a() {
          return n.G && performance.now
            ? Math.round(performance.now())
            : (i = Math.max(new Date().getTime(), i)) - o
        }
        function s() {
          return i
        }
        function c(e) {
          o = e
        }
        function u() {
          return o
        }
      },
      1209: (e, t, r) => {
        'use strict'
        r.d(t, { G: () => n })
        const n = void 0 !== r(8438).ZP?.performance?.timing?.navigationStart
      },
      745: (e, t, r) => {
        'use strict'
        r.d(t, { s: () => c, v: () => u })
        var n = r(7036),
          i = r(1719),
          o = r(9206),
          a = r(1209),
          s = r(8438)
        let c = !0
        function u(e) {
          var t = (function () {
            if (i.I && i.I < 9) return
            if (a.G) return (c = !1), s.ZP?.performance?.timing?.navigationStart
          })()
          t && ((0, n.B)(e, 'starttime', t), (0, o.nb)(t))
        }
      },
      7036: (e, t, r) => {
        'use strict'
        r.d(t, { B: () => o, L: () => a })
        var n = r(9206),
          i = {}
        function o(e, t, r) {
          void 0 === r && (r = (0, n.zO)() + (0, n.os)()),
            (i[e] = i[e] || {}),
            (i[e][t] = r)
        }
        function a(e, t, r, n) {
          const o = e.sharedContext.agentIdentifier
          var a = i[o]?.[r],
            s = i[o]?.[n]
          void 0 !== a &&
            void 0 !== s &&
            e.store('measures', t, { value: s - a })
        }
      },
      7233: (e, t, r) => {
        'use strict'
        r.d(t, { e: () => o })
        var n = r(8438),
          i = {}
        function o(e) {
          if (e in i) return i[e]
          if (0 === (e || '').indexOf('data:')) return { protocol: 'data' }
          let t
          var r = n.ZP?.location,
            o = {}
          if (n.il) (t = document.createElement('a')), (t.href = e)
          else
            try {
              t = new URL(e, r.href)
            } catch {
              return o
            }
          o.port = t.port
          var a = t.href.split('://')
          !o.port &&
            a[1] &&
            (o.port = a[1].split('/')[0].split('@').pop().split(':')[1]),
            (o.port && '0' !== o.port) ||
              (o.port = 'https' === a[0] ? '443' : '80'),
            (o.hostname = t.hostname || r.hostname),
            (o.pathname = t.pathname),
            (o.protocol = a[0]),
            '/' !== o.pathname.charAt(0) && (o.pathname = '/' + o.pathname)
          var s =
              !t.protocol || ':' === t.protocol || t.protocol === r.protocol,
            c = t.hostname === r.hostname && t.port === r.port
          return (
            (o.sameOrigin = s && (!t.hostname || c)),
            '/' === o.pathname && (i[e] = o),
            o
          )
        }
      },
      8547: (e, t, r) => {
        'use strict'
        r.d(t, { T: () => i })
        var n = r(8438)
        const i = {
          isFileProtocol: function () {
            let e = Boolean('file:' === (0, n.lW)()?.location?.protocol)
            e && (i.supportabilityMetricSent = !0)
            return e
          },
          supportabilityMetricSent: !1
        }
      },
      9011: (e, t, r) => {
        'use strict'
        r.d(t, { K: () => o })
        var n = r(5970)
        const i = [
          'ajax',
          'jserrors',
          'metrics',
          'page_action',
          'page_view_event',
          'page_view_timing',
          'session_trace',
          'spa'
        ]
        function o(e) {
          const t = {}
          return (
            i.forEach((r) => {
              t[r] = (function (e, t) {
                return (
                  !0 !== (0, n.OP)(t).disabled &&
                  !1 !== (0, n.Mt)(t, `${e}.enabled`)
                )
              })(r, e)
            }),
            t
          )
        }
      },
      8025: (e, t, r) => {
        'use strict'
        r.d(t, { W: () => i })
        var n = r(2071)
        class i {
          constructor(e, t) {
            let r =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : []
            ;(this.agentIdentifier = e),
              (this.aggregator = t),
              (this.ee = n.ee.get(e)),
              (this.externalFeatures = r),
              (this.blocked = !1)
          }
        }
      },
      9010: (e, t, r) => {
        'use strict'
        r.d(t, { X: () => i })
        var n = Object.prototype.hasOwnProperty
        function i(e, t, r) {
          if (n.call(e, t)) return e[t]
          var i = r()
          if (Object.defineProperty && Object.keys)
            try {
              return (
                Object.defineProperty(e, t, {
                  value: i,
                  writable: !0,
                  enumerable: !1
                }),
                i
              )
            } catch (e) {}
          return (e[t] = i), i
        }
      },
      8438: (e, t, r) => {
        'use strict'
        r.d(t, { ZP: () => a, il: () => n, lW: () => s, v6: () => i })
        const n = Boolean('undefined' != typeof window && window.document),
          i = Boolean(
            'undefined' != typeof WorkerGlobalScope &&
              self.navigator instanceof WorkerNavigator
          )
        let o = (() => {
          if (n) return window
          if (i) {
            if (
              'undefined' != typeof globalThis &&
              globalThis instanceof WorkerGlobalScope
            )
              return globalThis
            if (self instanceof WorkerGlobalScope) return self
          }
          throw new Error(
            'New Relic browser agent shutting down due to error: Unable to locate global scope. This is possibly due to code redefining browser global variables like `self` and `window`.'
          )
        })()
        const a = o
        function s() {
          return o
        }
      },
      9599: (e, t, r) => {
        'use strict'
        r.d(t, { D: () => i })
        var n = Object.prototype.hasOwnProperty
        function i(e, t) {
          var r = [],
            i = '',
            o = 0
          for (i in e) n.call(e, i) && ((r[o] = t(i, e[i])), (o += 1))
          return r
        }
      },
      248: (e, t, r) => {
        'use strict'
        r.d(t, { $c: () => c, Ng: () => u, RR: () => s })
        var n = r(5970),
          i = r(1925),
          o = r(8547),
          a = { regex: /^file:\/\/(.*)/, replacement: 'file://OBFUSCATED' }
        class s extends i.w {
          constructor(e) {
            super(e)
          }
          shouldObfuscate() {
            return c(this.sharedContext.agentIdentifier).length > 0
          }
          obfuscateString(e) {
            if (!e || 'string' != typeof e) return e
            for (
              var t = c(this.sharedContext.agentIdentifier), r = e, n = 0;
              n < t.length;
              n++
            ) {
              var i = t[n].regex,
                o = t[n].replacement || '*'
              r = r.replace(i, o)
            }
            return r
          }
        }
        function c(e) {
          var t = [],
            r = (0, n.Mt)(e, 'obfuscate') || []
          return (t = t.concat(r)), o.T.isFileProtocol() && t.push(a), t
        }
        function u(e) {
          for (var t = !1, r = !1, n = 0; n < e.length; n++) {
            'regex' in e[n]
              ? 'string' != typeof e[n].regex &&
                e[n].regex.constructor !== RegExp &&
                (console &&
                  console.warn &&
                  console.warn(
                    'An obfuscation replacement rule contains a "regex" value with an invalid type (must be a string or RegExp)'
                  ),
                (r = !0))
              : (console &&
                  console.warn &&
                  console.warn(
                    'An obfuscation replacement rule was detected missing a "regex" value.'
                  ),
                (r = !0))
            var i = e[n].replacement
            i &&
              'string' != typeof i &&
              (console &&
                console.warn &&
                console.warn(
                  'An obfuscation replacement rule contains a "replacement" value with an invalid type (must be a string)'
                ),
              (t = !0))
          }
          return !t && !r
        }
      },
      4580: (e, t, r) => {
        'use strict'
        r.d(t, {
          EZ: () => u,
          Qy: () => c,
          ce: () => o,
          fP: () => a,
          gG: () => d,
          mF: () => s
        })
        var n = r(9206),
          i = r(8438)
        const o = { beacon: 'bam.nr-data.net', errorBeacon: 'bam.nr-data.net' }
        function a() {
          return (
            i.ZP?.NREUM || (i.ZP.NREUM = {}),
            void 0 === i.ZP?.newrelic && (i.ZP.newrelic = i.ZP.NREUM),
            i.ZP.NREUM
          )
        }
        function s() {
          let e = a()
          if (!e.o) {
            var t = self,
              r = t.XMLHttpRequest
            e.o = {
              ST: setTimeout,
              SI: t.setImmediate,
              CT: clearTimeout,
              XHR: r,
              REQ: t.Request,
              EV: t.Event,
              PR: t.Promise,
              MO: t.MutationObserver,
              FETCH: t.fetch
            }
          }
          return e
        }
        function c(e, t, r) {
          let i = a()
          const o = i.initializedAgents || {},
            s = o[e] || {}
          return (
            Object.keys(s).length ||
              (s.initializedAt = { ms: (0, n.zO)(), date: new Date() }),
            (i.initializedAgents = { ...o, [e]: { ...s, [r]: t } }),
            i
          )
        }
        function u(e, t) {
          a()[e] = t
        }
        function d() {
          return (
            (function () {
              let e = a()
              const t = e.info || {}
              e.info = { beacon: o.beacon, errorBeacon: o.errorBeacon, ...t }
            })(),
            (function () {
              let e = a()
              const t = e.init || {}
              e.init = { ...t }
            })(),
            s(),
            (function () {
              let e = a()
              const t = e.loader_config || {}
              e.loader_config = { ...t }
            })(),
            a()
          )
        }
      },
      584: (e, t, r) => {
        'use strict'
        r.d(t, { N: () => i, e: () => o })
        var n = r(3585)
        function i(e) {
          let t =
            arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
          return void (0, n.iz)('visibilitychange', r)
          function r() {
            if (t) {
              if ('hidden' != document.visibilityState) return
              e()
            }
            e(document.visibilityState)
          }
        }
        function o() {
          return 'hidden' === document.visibilityState ? -1 : 1 / 0
        }
      },
      6023: (e, t, r) => {
        'use strict'
        r.d(t, { W: () => i })
        var n = r(8438)
        function i() {
          return 'function' == typeof n.ZP?.PerformanceObserver
        }
      },
      8539: (e) => {
        e.exports = function (e, t, r) {
          t || (t = 0), void 0 === r && (r = e ? e.length : 0)
          for (var n = -1, i = r - t || 0, o = Array(i < 0 ? 0 : i); ++n < i; )
            o[n] = e[t + n]
          return o
        }
      }
    },
    __webpack_module_cache__ = {},
    inProgress,
    dataWebpackPrefix
  function __webpack_require__(e) {
    var t = __webpack_module_cache__[e]
    if (void 0 !== t) return t.exports
    var r = (__webpack_module_cache__[e] = { exports: {} })
    return __webpack_modules__[e](r, r.exports, __webpack_require__), r.exports
  }
  ;(__webpack_require__.m = __webpack_modules__),
    (__webpack_require__.n = (e) => {
      var t = e && e.__esModule ? () => e.default : () => e
      return __webpack_require__.d(t, { a: t }), t
    }),
    (__webpack_require__.d = (e, t) => {
      for (var r in t)
        __webpack_require__.o(t, r) &&
          !__webpack_require__.o(e, r) &&
          Object.defineProperty(e, r, { enumerable: !0, get: t[r] })
    }),
    (__webpack_require__.f = {}),
    (__webpack_require__.e = (e) =>
      Promise.all(
        Object.keys(__webpack_require__.f).reduce(
          (t, r) => (__webpack_require__.f[r](e, t), t),
          []
        )
      )),
    (__webpack_require__.u = (e) =>
      e + '.' + __webpack_require__.h().slice(0, 8) + '-1222.js'),
    (__webpack_require__.h = () => '95d4308d836c4fa71ea6'),
    (__webpack_require__.o = (e, t) =>
      Object.prototype.hasOwnProperty.call(e, t)),
    (inProgress = {}),
    (dataWebpackPrefix = 'NRBA:'),
    (__webpack_require__.l = (e, t, r, n) => {
      if (inProgress[e]) inProgress[e].push(t)
      else {
        var i, o
        if (void 0 !== r)
          for (
            var a = document.getElementsByTagName('script'), s = 0;
            s < a.length;
            s++
          ) {
            var c = a[s]
            if (
              c.getAttribute('src') == e ||
              c.getAttribute('data-webpack') == dataWebpackPrefix + r
            ) {
              i = c
              break
            }
          }
        i ||
          ((o = !0),
          ((i = document.createElement('script')).charset = 'utf-8'),
          (i.timeout = 120),
          __webpack_require__.nc &&
            i.setAttribute('nonce', __webpack_require__.nc),
          i.setAttribute('data-webpack', dataWebpackPrefix + r),
          (i.src = e)),
          (inProgress[e] = [t])
        var u = (t, r) => {
            ;(i.onerror = i.onload = null), clearTimeout(d)
            var n = inProgress[e]
            if (
              (delete inProgress[e],
              i.parentNode && i.parentNode.removeChild(i),
              n && n.forEach((e) => e(r)),
              t)
            )
              return t(r)
          },
          d = setTimeout(
            u.bind(null, void 0, { type: 'timeout', target: i }),
            12e4
          )
        ;(i.onerror = u.bind(null, i.onerror)),
          (i.onload = u.bind(null, i.onload)),
          o && document.head.appendChild(i)
      }
    }),
    (__webpack_require__.r = (e) => {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 })
    }),
    (__webpack_require__.p = 'https://js-agent.newrelic.com/'),
    (() => {
      var e = { 450: 0, 566: 0 }
      __webpack_require__.f.j = (t, r) => {
        var n = __webpack_require__.o(e, t) ? e[t] : void 0
        if (0 !== n)
          if (n) r.push(n[2])
          else {
            var i = new Promise((r, i) => (n = e[t] = [r, i]))
            r.push((n[2] = i))
            var o = __webpack_require__.p + __webpack_require__.u(t),
              a = new Error()
            __webpack_require__.l(
              o,
              (r) => {
                if (
                  __webpack_require__.o(e, t) &&
                  (0 !== (n = e[t]) && (e[t] = void 0), n)
                ) {
                  var i = r && ('load' === r.type ? 'missing' : r.type),
                    o = r && r.target && r.target.src
                  ;(a.message =
                    'Loading chunk ' + t + ' failed.\n(' + i + ': ' + o + ')'),
                    (a.name = 'ChunkLoadError'),
                    (a.type = i),
                    (a.request = o),
                    n[1](a)
                }
              },
              'chunk-' + t,
              t
            )
          }
      }
      var t = (t, r) => {
          var n,
            i,
            [o, a, s] = r,
            c = 0
          if (o.some((t) => 0 !== e[t])) {
            for (n in a)
              __webpack_require__.o(a, n) && (__webpack_require__.m[n] = a[n])
            if (s) s(__webpack_require__)
          }
          for (t && t(r); c < o.length; c++)
            (i = o[c]),
              __webpack_require__.o(e, i) && e[i] && e[i][0](),
              (e[i] = 0)
        },
        r = (window.webpackChunkNRBA = window.webpackChunkNRBA || [])
      r.forEach(t.bind(null, 0)), (r.push = t.bind(null, r.push.bind(r)))
    })()
  var __webpack_exports__ = {}
  ;(() => {
    'use strict'
    __webpack_require__.r(__webpack_exports__)
    var e = __webpack_require__(507),
      t = __webpack_require__(3585)
    function r(e) {
      if (!document || 'complete' === document.readyState) return e() || !0
    }
    function n(e) {
      r(e) || (0, t.bP)('load', e)
    }
    function i(e) {
      r(e) || (0, t.iz)('DOMContentLoaded', e)
    }
    var o = __webpack_require__(8438),
      a = __webpack_require__(2071)
    let s = 0
    function c(e) {
      ;(async () => {
        if (!s++)
          try {
            const { aggregator: t } = await __webpack_require__
              .e(859)
              .then(__webpack_require__.bind(__webpack_require__, 7859))
            await t(e)
          } catch (e) {
            console.error(
              'Failed to successfully load all aggregators. Aborting...\n',
              e
            ),
              a.ee.abort()
          }
      })()
    }
    var u = __webpack_require__(2687),
      d = __webpack_require__(3195),
      f = __webpack_require__(9206),
      l = __webpack_require__(7036),
      p = __webpack_require__(745),
      h = __webpack_require__(8025)
    class v extends h.W {
      constructor(e) {
        super(e),
          o.il &&
            ((0, p.v)(e),
            (0, l.B)(e, 'firstbyte', (0, f.yf)()),
            n(() => this.measureWindowLoaded()),
            i(() => this.measureDomContentLoaded()))
      }
      measureWindowLoaded() {
        var e = (0, f.zO)()
        ;(0, l.B)(this.agentIdentifier, 'onload', e + (0, f.os)()),
          (0, d.p)('timing', ['load', e], void 0, void 0, this.ee)
      }
      measureDomContentLoaded() {
        ;(0, l.B)(this.agentIdentifier, 'domContent', (0, f.zO)() + (0, f.os)())
      }
    }
    var _ = __webpack_require__(584),
      b = __webpack_require__(5970)
    class g extends h.W {
      constructor(e) {
        var r
        if ((super(e), (r = this), this.isEnabled() && o.il)) {
          if (
            ((this.pageHiddenTime = (0, _.e)()),
            this.performanceObserver,
            this.lcpPerformanceObserver,
            this.clsPerformanceObserver,
            (this.fiRecorded = !1),
            'PerformanceObserver' in window &&
              'function' == typeof window.PerformanceObserver)
          ) {
            this.performanceObserver = new PerformanceObserver(function () {
              return r.perfObserver(...arguments)
            })
            try {
              this.performanceObserver.observe({ entryTypes: ['paint'] })
            } catch (e) {}
            this.lcpPerformanceObserver = new PerformanceObserver(function () {
              return r.lcpObserver(...arguments)
            })
            try {
              this.lcpPerformanceObserver.observe({
                entryTypes: ['largest-contentful-paint']
              })
            } catch (e) {}
            this.clsPerformanceObserver = new PerformanceObserver(function () {
              return r.clsObserver(...arguments)
            })
            try {
              this.clsPerformanceObserver.observe({
                type: 'layout-shift',
                buffered: !0
              })
            } catch (e) {}
          }
          this.fiRecorded = !1
          ;[
            'click',
            'keydown',
            'mousedown',
            'pointerdown',
            'touchstart'
          ].forEach((e) => {
            ;(0, t.iz)(e, function () {
              return r.captureInteraction(...arguments)
            })
          }),
            (0, _.N)(() => {
              ;(this.pageHiddenTime = (0, f.zO)()),
                (0, d.p)(
                  'docHidden',
                  [this.pageHiddenTime],
                  void 0,
                  void 0,
                  this.ee
                )
            }, !0),
            (0, t.bP)('pagehide', () =>
              (0, d.p)('winPagehide', [(0, f.zO)()], void 0, void 0, this.ee)
            )
        }
      }
      isEnabled() {
        return (
          !1 !== (0, b.Mt)(this.agentIdentifier, 'page_view_timing.enabled')
        )
      }
      perfObserver(e, t) {
        e.getEntries().forEach((e) => {
          'first-paint' === e.name
            ? (0, d.p)(
                'timing',
                ['fp', Math.floor(e.startTime)],
                void 0,
                void 0,
                this.ee
              )
            : 'first-contentful-paint' === e.name &&
              (0, d.p)(
                'timing',
                ['fcp', Math.floor(e.startTime)],
                void 0,
                void 0,
                this.ee
              )
        })
      }
      lcpObserver(e, t) {
        var r = e.getEntries()
        if (r.length > 0) {
          var n = r[r.length - 1]
          if (this.pageHiddenTime < n.startTime) return
          var i = [n],
            o = this.addConnectionAttributes({})
          o && i.push(o), (0, d.p)('lcp', i, void 0, void 0, this.ee)
        }
      }
      clsObserver(e) {
        e.getEntries().forEach((e) => {
          e.hadRecentInput || (0, d.p)('cls', [e], void 0, void 0, this.ee)
        })
      }
      addConnectionAttributes(e) {
        var t =
          navigator.connection ||
          navigator.mozConnection ||
          navigator.webkitConnection
        if (t)
          return (
            t.type && (e['net-type'] = t.type),
            t.effectiveType && (e['net-etype'] = t.effectiveType),
            t.rtt && (e['net-rtt'] = t.rtt),
            t.downlink && (e['net-dlink'] = t.downlink),
            e
          )
      }
      captureInteraction(e) {
        if (e instanceof b.Yu.EV && !this.fiRecorded) {
          var t = Math.round(e.timeStamp),
            r = { type: e.type }
          this.addConnectionAttributes(r),
            t <= (0, f.zO)()
              ? (r.fid = (0, f.zO)() - t)
              : t > (0, f.os)() && t <= Date.now()
              ? ((t -= (0, f.os)()), (r.fid = (0, f.zO)() - t))
              : (t = (0, f.zO)()),
            (this.fiRecorded = !0),
            (0, d.p)('timing', ['fi', t, r], void 0, void 0, this.ee)
        }
      }
    }
    var m = __webpack_require__(4539),
      w = 'React',
      y = 'Angular',
      x = 'AngularJS',
      P = 'Backbone',
      O = 'Ember',
      k = 'Vue',
      E = 'Meteor',
      S = 'Zepto',
      C = 'Jquery'
    function T() {
      if (!o.il) return []
      var e = []
      try {
        ;(function () {
          try {
            if (window.React || window.ReactDOM || window.ReactRedux) return !0
            if (document.querySelector('[data-reactroot], [data-reactid]'))
              return !0
            for (
              var e = document.querySelectorAll('body > div'), t = 0;
              t < e.length;
              t++
            )
              if (Object.keys(e[t]).indexOf('_reactRootContainer') >= 0)
                return !0
            return !1
          } catch (e) {
            return !1
          }
        })() && e.push(w),
          (function () {
            try {
              return (
                !!window.angular ||
                !!document.querySelector(
                  '.ng-binding, [ng-app], [data-ng-app], [ng-controller], [data-ng-controller], [ng-repeat], [data-ng-repeat]'
                ) ||
                !!document.querySelector(
                  'script[src*="angular.js"], script[src*="angular.min.js"]'
                )
              )
            } catch (e) {
              return !1
            }
          })() && e.push(x),
          (function () {
            try {
              return (
                !!(
                  window.hasOwnProperty('ng') &&
                  window.ng.hasOwnProperty('coreTokens') &&
                  window.ng.coreTokens.hasOwnProperty('NgZone')
                ) || !!document.querySelectorAll('[ng-version]').length
              )
            } catch (e) {
              return !1
            }
          })() && e.push(y),
          window.Backbone && e.push(P),
          window.Ember && e.push(O),
          window.Vue && e.push(k),
          window.Meteor && e.push(E),
          window.Zepto && e.push(S),
          window.jQuery && e.push(C)
      } catch (e) {}
      return e
    }
    var A = __webpack_require__(8547),
      q = __webpack_require__(248),
      I = __webpack_require__(8873)
    const j = Boolean(o.ZP?.Worker),
      R = Boolean(o.ZP?.SharedWorker),
      N = Boolean(o.ZP?.navigator?.serviceWorker)
    let L, Z, H
    class z extends h.W {
      constructor(e) {
        var t
        let r =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
        super(e),
          (t = this),
          (this.PfFeatStatusEnum = r),
          this.singleChecks(),
          this.eachSessionChecks(),
          (0, m.X)(
            'record-supportability',
            function () {
              return t.recordSupportability(...arguments)
            },
            void 0,
            this.ee
          ),
          (0, m.X)(
            'record-custom',
            function () {
              return t.recordCustom(...arguments)
            },
            void 0,
            this.ee
          )
      }
      recordSupportability(e, t) {
        var r = ['sm', e, { name: e }, t]
        return (0, d.p)('storeMetric', r, null, void 0, this.ee), r
      }
      recordCustom(e, t) {
        var r = ['cm', e, { name: e }, t]
        return (0, d.p)('storeEventMetrics', r, null, void 0, this.ee), r
      }
      singleChecks() {
        this.recordSupportability(`Generic/Version/${I.q}/Detected`)
        const { loaderType: e } = (0, b.OP)(this.agentIdentifier)
        e && this.recordSupportability(`Generic/LoaderType/${e}/Detected`),
          o.il &&
            i(() => {
              T().forEach((e) => {
                this.recordSupportability('Framework/' + e + '/Detected')
              })
            }),
          A.T.isFileProtocol() &&
            (this.recordSupportability('Generic/FileProtocol/Detected'),
            (A.T.supportabilityMetricSent = !0))
        const t = (0, q.$c)(this.agentIdentifier)
        t.length > 0 && this.recordSupportability('Generic/Obfuscate/Detected'),
          t.length > 0 &&
            !(0, q.Ng)(t) &&
            this.recordSupportability('Generic/Obfuscate/Invalid'),
          o.il && this.reportPolyfillsNeeded(),
          (function (e) {
            if (!L) {
              if (j) {
                L = Worker
                try {
                  o.ZP.Worker = r(L, 'Dedicated')
                } catch (e) {
                  a(e, 'Dedicated')
                }
                if (R) {
                  Z = SharedWorker
                  try {
                    o.ZP.SharedWorker = r(Z, 'Shared')
                  } catch (e) {
                    a(e, 'Shared')
                  }
                } else n('Shared')
                if (N) {
                  H = navigator.serviceWorker.register
                  try {
                    o.ZP.navigator.serviceWorker.register =
                      ((t = H),
                      function () {
                        for (
                          var e = arguments.length, r = new Array(e), n = 0;
                          n < e;
                          n++
                        )
                          r[n] = arguments[n]
                        return (
                          i('Service', r[1]?.type),
                          t.apply(navigator.serviceWorker, r)
                        )
                      })
                  } catch (e) {
                    a(e, 'Service')
                  }
                } else n('Service')
                var t
                return
              }
              n('All')
            }
            function r(e, t) {
              return new Proxy(e, {
                construct: (e, r) => (i(t, r[1]?.type), new e(...r))
              })
            }
            function n(t) {
              o.v6 || e(`Workers/${t}/Unavailable`)
            }
            function i(t, r) {
              e('module' === r ? `Workers/${t}/Module` : `Workers/${t}/Classic`)
            }
            function a(t, r) {
              e(`Workers/${r}/SM/Unsupported`),
                console.warn(`NR Agent: Unable to capture ${r} workers.`, t)
            }
          })(this.recordSupportability.bind(this))
      }
      reportPolyfillsNeeded() {
        this.recordSupportability(
          `Generic/Polyfill/Promise/${this.PfFeatStatusEnum.PROMISE}`
        ),
          this.recordSupportability(
            `Generic/Polyfill/ArrayIncludes/${this.PfFeatStatusEnum.ARRAY_INCLUDES}`
          ),
          this.recordSupportability(
            `Generic/Polyfill/ObjectAssign/${this.PfFeatStatusEnum.OBJECT_ASSIGN}`
          ),
          this.recordSupportability(
            `Generic/Polyfill/ObjectEntries/${this.PfFeatStatusEnum.OBJECT_ENTRIES}`
          )
      }
      eachSessionChecks() {
        o.il &&
          (0, t.bP)('pageshow', (e) => {
            e.persisted && this.recordCustom('Custom/BFCache/PageRestored')
          })
      }
    }
    var M = __webpack_require__(9010),
      D = __webpack_require__(8539),
      W = __webpack_require__.n(D),
      B = __webpack_require__(9599),
      $ = o.ZP,
      G = 'fetch-',
      F = G + 'body-',
      U = ['arrayBuffer', 'blob', 'json', 'text', 'formData'],
      X = $.Request,
      V = $.Response,
      Y = 'prototype',
      J = 'nr@context'
    const Q = {}
    function K(e) {
      const t = (function (e) {
        return (e || a.ee).get('fetch')
      })(e)
      if (!(X && V && $.fetch)) return t
      if (Q[t.debugId]) return t
      function r(e, r, n) {
        var i = e[r]
        'function' == typeof i &&
          (e[r] = function () {
            var e,
              r = W()(arguments),
              o = {}
            t.emit(n + 'before-start', [r], o), o[J] && o[J].dt && (e = o[J].dt)
            var a = i.apply(this, r)
            return (
              t.emit(n + 'start', [r, e], a),
              a.then(
                function (e) {
                  return t.emit(n + 'end', [null, e], a), e
                },
                function (e) {
                  throw (t.emit(n + 'end', [e], a), e)
                }
              )
            )
          })
      }
      return (
        (Q[t.debugId] = !0),
        (0, B.D)(U, function (e, t) {
          r(X[Y], t, F), r(V[Y], t, F)
        }),
        r($, 'fetch', G),
        t.on(G + 'end', function (e, r) {
          var n = this
          if (r) {
            var i = r.headers.get('content-length')
            null !== i && (n.rxSize = i), t.emit(G + 'done', [null, r], n)
          } else t.emit(G + 'done', [e], n)
        }),
        t
      )
    }
    var ee = 'nr@original',
      te = Object.prototype.hasOwnProperty,
      re = !1
    function ne(e, t) {
      return (
        e || (e = a.ee),
        (r.inPlace = function (e, t, n, i, o) {
          n || (n = '')
          var a,
            s,
            c,
            u = '-' === n.charAt(0)
          for (c = 0; c < t.length; c++)
            ae((a = e[(s = t[c])])) || (e[s] = r(a, u ? s + n : n, i, s, o))
        }),
        (r.flag = ee),
        r
      )
      function r(t, r, i, o, a) {
        return ae(t)
          ? t
          : (r || (r = ''), (nrWrapper[ee] = t), oe(t, nrWrapper, e), nrWrapper)
        function nrWrapper() {
          var s, c, u, d
          try {
            ;(c = this),
              (s = W()(arguments)),
              (u = 'function' == typeof i ? i(s, c) : i || {})
          } catch (t) {
            ie([t, '', [s, c, o], u], e)
          }
          n(r + 'start', [s, c, o], u, a)
          try {
            return (d = t.apply(c, s))
          } catch (e) {
            throw (n(r + 'err', [s, c, e], u, a), e)
          } finally {
            n(r + 'end', [s, c, d], u, a)
          }
        }
      }
      function n(r, n, i, o) {
        if (!re || t) {
          var a = re
          re = !0
          try {
            e.emit(r, n, i, t, o)
          } catch (t) {
            ie([t, r, n, i], e)
          }
          re = a
        }
      }
    }
    function ie(e, t) {
      t || (t = a.ee)
      try {
        t.emit('internal-error', e)
      } catch (e) {}
    }
    function oe(e, t, r) {
      if (Object.defineProperty && Object.keys)
        try {
          return (
            Object.keys(e).forEach(function (r) {
              Object.defineProperty(t, r, {
                get: function () {
                  return e[r]
                },
                set: function (t) {
                  return (e[r] = t), t
                }
              })
            }),
            t
          )
        } catch (e) {
          ie([e], r)
        }
      for (var n in e) te.call(e, n) && (t[n] = e[n])
      return t
    }
    function ae(e) {
      return !(e && e instanceof Function && e.apply && !e[ee])
    }
    function se(e, t, r) {
      var n = e[t]
      e[t] = (function (e, t) {
        var r = t(e)
        return (r[ee] = e), oe(e, r, a.ee), r
      })(n, r)
    }
    function ce() {
      for (var e = arguments.length, t = new Array(e), r = 0; r < e; ++r)
        t[r] = arguments[r]
      return t
    }
    const ue = {}
    function de(e) {
      const t = (function (e) {
        return (e || a.ee).get('timer')
      })(e)
      if (ue[t.debugId]) return t
      ue[t.debugId] = !0
      var r = ne(t),
        n = 'setTimeout',
        i = 'setInterval',
        s = 'clearTimeout',
        c = '-start'
      return (
        r.inPlace(o.ZP, [n, 'setImmediate'], n + '-'),
        r.inPlace(o.ZP, [i], i + '-'),
        r.inPlace(o.ZP, [s, 'clearImmediate'], s + '-'),
        t.on(i + c, function (e, t, n) {
          e[0] = r(e[0], 'fn-', null, n)
        }),
        t.on(n + c, function (e, t, n) {
          ;(this.method = n),
            (this.timerDuration = isNaN(e[1]) ? 0 : +e[1]),
            (e[0] = r(e[0], 'fn-', this, n))
        }),
        t
      )
    }
    const fe = {}
    function le(e) {
      const t = (function (e) {
        return (e || a.ee).get('raf')
      })(e)
      if (fe[t.debugId] || !o.il) return t
      fe[t.debugId] = !0
      var r = ne(t),
        n = 'equestAnimationFrame'
      return (
        r.inPlace(
          window,
          ['r' + n, 'mozR' + n, 'webkitR' + n, 'msR' + n],
          'raf-'
        ),
        t.on('raf-start', function (e) {
          e[0] = r(e[0], 'fn-')
        }),
        t
      )
    }
    const pe = {}
    function he(e) {
      const t = (function (e) {
        return (e || a.ee).get('history')
      })(e)
      if (pe[t.debugId] || !o.il) return t
      pe[t.debugId] = !0
      var r = ne(t),
        n =
          window.history &&
          window.history.constructor &&
          window.history.constructor.prototype,
        i = window.history
      return (
        n && n.pushState && n.replaceState && (i = n),
        r.inPlace(i, ['pushState', 'replaceState'], '-'),
        t
      )
    }
    const ve = {}
    function _e(e) {
      const r = (function (e) {
        return (e || a.ee).get('jsonp')
      })(e)
      if (ve[r.debugId] || !o.il) return r
      ve[r.debugId] = !0
      var n = ne(r),
        i = /[?&](?:callback|cb)=([^&#]+)/,
        s = /(.*)\.([^.]+)/,
        c = /^(\w+)(\.|$)(.*)$/,
        u = ['appendChild', 'insertBefore', 'replaceChild']
      function d(e, t) {
        var r = e.match(c),
          n = r[1],
          i = r[3]
        return i ? d(i, t[n]) : t[n]
      }
      return (
        'addEventListener' in window &&
          (Node && Node.prototype && Node.prototype.appendChild
            ? n.inPlace(Node.prototype, u, 'dom-')
            : (n.inPlace(HTMLElement.prototype, u, 'dom-'),
              n.inPlace(HTMLHeadElement.prototype, u, 'dom-'),
              n.inPlace(HTMLBodyElement.prototype, u, 'dom-'))),
        r.on('dom-start', function (e) {
          !(function (e) {
            if (
              !e ||
              'string' != typeof e.nodeName ||
              'script' !== e.nodeName.toLowerCase()
            )
              return
            if ('function' != typeof e.addEventListener) return
            var o = ((a = e.src), (c = a.match(i)), c ? c[1] : null)
            var a, c
            if (!o) return
            var u = (function (e) {
              var t = e.match(s)
              if (t && t.length >= 3)
                return { key: t[2], parent: d(t[1], window) }
              return { key: e, parent: window }
            })(o)
            if ('function' != typeof u.parent[u.key]) return
            var f = {}
            function l() {
              r.emit('jsonp-end', [], f),
                e.removeEventListener('load', l, (0, t.m$)(!1)),
                e.removeEventListener('error', p, (0, t.m$)(!1))
            }
            function p() {
              r.emit('jsonp-error', [], f),
                r.emit('jsonp-end', [], f),
                e.removeEventListener('load', l, (0, t.m$)(!1)),
                e.removeEventListener('error', p, (0, t.m$)(!1))
            }
            n.inPlace(u.parent, [u.key], 'cb-', f),
              e.addEventListener('load', l, (0, t.m$)(!1)),
              e.addEventListener('error', p, (0, t.m$)(!1)),
              r.emit('new-jsonp', [e.src], f)
          })(e[0])
        }),
        r
      )
    }
    const be = {}
    function ge(e) {
      const t = (function (e) {
        return (e || a.ee).get('mutation')
      })(e)
      if (be[t.debugId] || !o.il) return t
      be[t.debugId] = !0
      var r = ne(t),
        n = b.Yu.MO
      return (
        n &&
          ((window.MutationObserver = function (e) {
            return this instanceof n
              ? new n(r(e, 'fn-'))
              : n.apply(this, arguments)
          }),
          (MutationObserver.prototype = n.prototype)),
        t
      )
    }
    const me = {}
    function we(e) {
      const t = (function (e) {
        return (e || a.ee).get('promise')
      })(e)
      if (me[t.debugId]) return t
      me[t.debugId] = !0
      var r = a.c,
        n = ne(t),
        i = b.Yu.PR
      return (
        i &&
          (function () {
            function e(e) {
              var r = t.context(),
                o = n(e, 'executor-', r, null, !1),
                a = new i(o)
              return (
                (t.context(a).getCtx = function () {
                  return r
                }),
                a
              )
            }
            ;(o.ZP.Promise = e),
              Object.defineProperty(o.ZP.Promise, 'name', { value: 'Promise' }),
              ['all', 'race'].forEach(function (e) {
                var r = i[e]
                i[e] = function (n) {
                  var o = !1
                  ;(0, B.D)(n, function (t, r) {
                    Promise.resolve(r).then(s('all' === e), s(!1))
                  })
                  var a = r.apply(i, arguments)
                  return i.resolve(a)
                  function s(e) {
                    return function () {
                      t.emit('propagate', [null, !o], a, !1, !1), (o = o || !e)
                    }
                  }
                }
              }),
              ['resolve', 'reject'].forEach(function (e) {
                var r = i[e]
                i[e] = function (e) {
                  var n = r.apply(i, arguments)
                  return e !== n && t.emit('propagate', [e, !0], n, !1, !1), n
                }
              }),
              (i.prototype.catch = function (e) {
                return this.then(null, e)
              }),
              Object.assign(i.prototype, { constructor: { value: e } }),
              (0, B.D)(Object.getOwnPropertyNames(i), function (t, r) {
                try {
                  e[r] = i[r]
                } catch (e) {}
              }),
              se(i.prototype, 'then', function (e) {
                return function () {
                  var i = this,
                    o = ce.apply(this, arguments),
                    a = r(i)
                  ;(a.promise = i),
                    (o[0] = n(o[0], 'cb-', a, null, !1)),
                    (o[1] = n(o[1], 'cb-', a, null, !1))
                  var s = e.apply(this, o)
                  return (
                    (a.nextPromise = s),
                    t.emit('propagate', [i, !0], s, !1, !1),
                    s
                  )
                }
              }),
              t.on('executor-start', function (e) {
                ;(e[0] = n(e[0], 'resolve-', this, null, !1)),
                  (e[1] = n(e[1], 'resolve-', this, null, !1))
              }),
              t.on('executor-err', function (e, t, r) {
                e[1](r)
              }),
              t.on('cb-end', function (e, r, n) {
                t.emit('propagate', [n, !0], this.nextPromise, !1, !1)
              }),
              t.on('propagate', function (e, r, n) {
                ;(this.getCtx && !r) ||
                  (this.getCtx = function () {
                    if (e instanceof Promise) var r = t.context(e)
                    return r && r.getCtx ? r.getCtx() : this
                  })
              }),
              (e.toString = function () {
                return '' + i
              })
          })(),
        t
      )
    }
    const ye = {}
    function xe(e) {
      var t = (function (e) {
        return (e || a.ee).get('events')
      })(e)
      if (ye[t.debugId]) return t
      ye[t.debugId] = !0
      var r = ne(t, !0),
        n = XMLHttpRequest,
        i = 'addEventListener',
        s = 'removeEventListener'
      function c(e) {
        for (var t = e; t && !t.hasOwnProperty(i); )
          t = Object.getPrototypeOf(t)
        t && u(t)
      }
      function u(e) {
        r.inPlace(e, [i, s], '-', d)
      }
      function d(e, t) {
        return e[1]
      }
      return (
        'getPrototypeOf' in Object
          ? (o.il && c(document), c(o.ZP), c(n.prototype))
          : n.prototype.hasOwnProperty(i) && (u(o.ZP), u(n.prototype)),
        t.on(i + '-start', function (e, t) {
          var n = e[1]
          if (null !== n && ('function' == typeof n || 'object' == typeof n)) {
            var i = (0, M.X)(n, 'nr@wrapped', function () {
              var e = {
                object: function () {
                  if ('function' != typeof n.handleEvent) return
                  return n.handleEvent.apply(n, arguments)
                },
                function: n
              }[typeof n]
              return e ? r(e, 'fn-', null, e.name || 'anonymous') : n
            })
            this.wrapped = e[1] = i
          }
        }),
        t.on(s + '-start', function (e) {
          e[1] = this.wrapped || e[1]
        }),
        t
      )
    }
    const Pe = {}
    function Oe(e) {
      var r = e || a.ee
      const n = (function (e) {
        return (e || a.ee).get('xhr')
      })(r)
      if (Pe[n.debugId]) return n
      ;(Pe[n.debugId] = !0), xe(r)
      var i = ne(n),
        s = b.Yu.XHR,
        c = b.Yu.MO,
        u = b.Yu.PR,
        d = b.Yu.SI,
        f = 'readystatechange',
        l = [
          'onload',
          'onerror',
          'onabort',
          'onloadstart',
          'onloadend',
          'onprogress',
          'ontimeout'
        ],
        p = [],
        h = o.ZP.XMLHttpRequest.listeners,
        v = (o.ZP.XMLHttpRequest = function (e) {
          var r = new s(e)
          function i() {
            try {
              n.emit('new-xhr', [r], r), r.addEventListener(f, g, (0, t.m$)(!1))
            } catch (e) {
              console.error(e)
              try {
                n.emit('internal-error', [e])
              } catch (e) {}
            }
          }
          return (
            (this.listeners = h ? [...h, i] : [i]),
            this.listeners.forEach((e) => e()),
            r
          )
        })
      function _(e, t) {
        i.inPlace(t, ['onreadystatechange'], 'fn-', P)
      }
      function g() {
        var e = this,
          t = n.context(e)
        e.readyState > 3 &&
          !t.resolved &&
          ((t.resolved = !0), n.emit('xhr-resolved', [], e)),
          i.inPlace(e, l, 'fn-', P)
      }
      if (
        ((function (e, t) {
          for (var r in e) t[r] = e[r]
        })(s, v),
        (v.prototype = s.prototype),
        i.inPlace(v.prototype, ['open', 'send'], '-xhr-', P),
        n.on('send-xhr-start', function (e, t) {
          _(e, t),
            (function (e) {
              p.push(e),
                c && (m ? m.then(x) : d ? d(x) : ((w = -w), (y.data = w)))
            })(t)
        }),
        n.on('open-xhr-start', _),
        c)
      ) {
        var m = u && u.resolve()
        if (!d && !u) {
          var w = 1,
            y = document.createTextNode(w)
          new c(x).observe(y, { characterData: !0 })
        }
      } else
        r.on('fn-end', function (e) {
          ;(e[0] && e[0].type === f) || x()
        })
      function x() {
        for (var e = 0; e < p.length; e++) _(0, p[e])
        p.length && (p = [])
      }
      function P(e, t) {
        return t
      }
      return n
    }
    function ke(e) {
      return xe(e)
    }
    function Ee(e) {
      return K(e)
    }
    function Se(e) {
      return he(e)
    }
    function Ce(e) {
      return le(e)
    }
    function Te(e) {
      return de(e)
    }
    function Ae(e) {
      return Oe(e)
    }
    var qe,
      Ie = {}
    try {
      ;(qe = localStorage.getItem('__nr_flags').split(',')),
        console &&
          'function' == typeof console.log &&
          ((Ie.console = !0),
          -1 !== qe.indexOf('dev') && (Ie.dev = !0),
          -1 !== qe.indexOf('nr_dev') && (Ie.nrDev = !0))
    } catch (e) {}
    function je(e) {
      try {
        Ie.console && je(e)
      } catch (e) {}
    }
    Ie.nrDev &&
      a.ee.on('internal-error', function (e) {
        je(e.stack)
      }),
      Ie.dev &&
        a.ee.on('fn-err', function (e, t, r) {
          je(r.stack)
        }),
      Ie.dev &&
        (je('NR AGENT IN DEVELOPMENT MODE'),
        je(
          'flags: ' +
            (0, B.D)(Ie, function (e, t) {
              return e
            }).join(', ')
        ))
    var Re = 'nr@seenError'
    class Ne extends h.W {
      constructor(e) {
        var t
        super(e),
          (t = this),
          (this.skipNext = 0),
          (this.handleErrors = !1),
          (this.origOnerror = o.ZP?.onerror)
        const r = this,
          n = (0, b.OP)(this.agentIdentifier)
        ;(n.features.err = !0),
          r.ee.on('fn-start', function (e, t, n) {
            r.handleErrors && (r.skipNext += 1)
          }),
          r.ee.on('fn-err', function (e, t, n) {
            r.handleErrors &&
              !n[Re] &&
              ((0, M.X)(n, Re, function () {
                return !0
              }),
              (this.thrown = !0),
              Ze(n, void 0, r.ee))
          }),
          r.ee.on('fn-end', function () {
            r.handleErrors &&
              !this.thrown &&
              r.skipNext > 0 &&
              (r.skipNext -= 1)
          }),
          r.ee.on('internal-error', (e) => {
            ;(0, d.p)('ierr', [e, (0, f.zO)(), !0], void 0, void 0, r.ee)
          })
        const i = o.ZP?.onerror
        o.ZP.onerror = function () {
          return i && i(...arguments), t.onerrorHandler(...arguments), !1
        }
        try {
          o.ZP?.addEventListener('unhandledrejection', (e) => {
            const t = new Error(`${e.reason}`)
            ;(0, d.p)(
              'err',
              [t, (0, f.zO)(), !1, { unhandledPromiseRejection: 1 }],
              void 0,
              void 0,
              this.ee
            )
          })
        } catch (e) {}
        try {
          throw new Error()
        } catch (e) {
          'stack' in e &&
            (Te(this.ee),
            Ce(this.ee),
            'addEventListener' in o.ZP && ke(this.ee),
            n.xhrWrappable && Ae(this.ee),
            (r.handleErrors = !0))
        }
      }
      onerrorHandler(e, t, r, n, i) {
        try {
          this.skipNext
            ? (this.skipNext -= 1)
            : Ze(i || new Le(e, t, r), !0, this.ee)
        } catch (e) {
          try {
            ;(0, d.p)('ierr', [e, (0, f.zO)(), !0], void 0, void 0, this.ee)
          } catch (e) {}
        }
        return (
          'function' == typeof this.origOnerror &&
          this.origOnerror.apply(this, W()(arguments))
        )
      }
    }
    function Le(e, t, r) {
      ;(this.message = e || 'Uncaught error with no additional information'),
        (this.sourceURL = t),
        (this.line = r)
    }
    function Ze(e, t, r) {
      var n = t ? null : (0, f.zO)()
      ;(0, d.p)('err', [e, n], void 0, void 0, r)
    }
    var He = 1
    function ze(e) {
      var t = typeof e
      return !e || ('object' !== t && 'function' !== t)
        ? -1
        : e === o.ZP
        ? 0
        : (0, M.X)(e, 'nr@id', function () {
            return He++
          })
    }
    var Me = __webpack_require__(1719)
    function De(e) {
      if ('string' == typeof e && e.length) return e.length
      if ('object' == typeof e) {
        if (
          'undefined' != typeof ArrayBuffer &&
          e instanceof ArrayBuffer &&
          e.byteLength
        )
          return e.byteLength
        if ('undefined' != typeof Blob && e instanceof Blob && e.size)
          return e.size
        if (!('undefined' != typeof FormData && e instanceof FormData))
          try {
            return JSON.stringify(e).length
          } catch (e) {
            return
          }
      }
    }
    var We = __webpack_require__(7233),
      Be = __webpack_require__(2141)
    class $e {
      constructor(e) {
        ;(this.agentIdentifier = e),
          (this.generateTracePayload = this.generateTracePayload.bind(this)),
          (this.shouldGenerateTrace = this.shouldGenerateTrace.bind(this))
      }
      generateTracePayload(e) {
        if (!this.shouldGenerateTrace(e)) return null
        var t = (0, b.DL)(this.agentIdentifier)
        if (!t) return null
        var r = (t.accountID || '').toString() || null,
          n = (t.agentID || '').toString() || null,
          i = (t.trustKey || '').toString() || null
        if (!r || !n) return null
        var o = (0, Be.M)(),
          a = (0, Be.Ht)(),
          s = Date.now(),
          c = { spanId: o, traceId: a, timestamp: s }
        return (
          (e.sameOrigin ||
            (this.isAllowedOrigin(e) &&
              this.useTraceContextHeadersForCors())) &&
            ((c.traceContextParentHeader =
              this.generateTraceContextParentHeader(o, a)),
            (c.traceContextStateHeader = this.generateTraceContextStateHeader(
              o,
              s,
              r,
              n,
              i
            ))),
          ((e.sameOrigin && !this.excludeNewrelicHeader()) ||
            (!e.sameOrigin &&
              this.isAllowedOrigin(e) &&
              this.useNewrelicHeaderForCors())) &&
            (c.newrelicHeader = this.generateTraceHeader(o, a, s, r, n, i)),
          c
        )
      }
      generateTraceContextParentHeader(e, t) {
        return '00-' + t + '-' + e + '-01'
      }
      generateTraceContextStateHeader(e, t, r, n, i) {
        return i + '@nr=0-1-' + r + '-' + n + '-' + e + '----' + t
      }
      generateTraceHeader(e, t, r, n, i, a) {
        if (!('function' == typeof o.ZP?.btoa)) return null
        var s = {
          v: [0, 1],
          d: { ty: 'Browser', ac: n, ap: i, id: e, tr: t, ti: r }
        }
        return a && n !== a && (s.d.tk = a), btoa(JSON.stringify(s))
      }
      shouldGenerateTrace(e) {
        return this.isDtEnabled() && this.isAllowedOrigin(e)
      }
      isAllowedOrigin(e) {
        var t = !1,
          r = {}
        if (
          ((0, b.Mt)(this.agentIdentifier, 'distributed_tracing') &&
            (r = (0, b.P_)(this.agentIdentifier).distributed_tracing),
          e.sameOrigin)
        )
          t = !0
        else if (r.allowed_origins instanceof Array)
          for (var n = 0; n < r.allowed_origins.length; n++) {
            var i = (0, We.e)(r.allowed_origins[n])
            if (
              e.hostname === i.hostname &&
              e.protocol === i.protocol &&
              e.port === i.port
            ) {
              t = !0
              break
            }
          }
        return t
      }
      isDtEnabled() {
        var e = (0, b.Mt)(this.agentIdentifier, 'distributed_tracing')
        return !!e && !!e.enabled
      }
      excludeNewrelicHeader() {
        var e = (0, b.Mt)(this.agentIdentifier, 'distributed_tracing')
        return !!e && !!e.exclude_newrelic_header
      }
      useNewrelicHeaderForCors() {
        var e = (0, b.Mt)(this.agentIdentifier, 'distributed_tracing')
        return !!e && !1 !== e.cors_use_newrelic_header
      }
      useTraceContextHeadersForCors() {
        var e = (0, b.Mt)(this.agentIdentifier, 'distributed_tracing')
        return !!e && !!e.cors_use_tracecontext_headers
      }
    }
    var Ge = ['load', 'error', 'abort', 'timeout'],
      Fe = Ge.length,
      Ue = b.Yu.REQ,
      Xe = o.ZP?.XMLHttpRequest
    class Ve extends h.W {
      constructor(e) {
        super(e)
        const r = (0, b.OP)(this.agentIdentifier)
        r.xhrWrappable &&
          !r.disabled &&
          ((r.features.xhr = !0),
          (this.dt = new $e(this.agentIdentifier)),
          (this.handler = (e, t, r, n) => (0, d.p)(e, t, r, n, this.ee)),
          (this.wrappedFetch = Ee(this.ee)),
          Ae(this.ee),
          (function (e, r, n, i) {
            function a(e) {
              var r = this
              ;(r.totalCbs = 0),
                (r.called = 0),
                (r.cbTime = 0),
                (r.end = P),
                (r.ended = !1),
                (r.xhrGuids = {}),
                (r.lastSize = null),
                (r.loadCaptureCalled = !1),
                (r.params = this.params || {}),
                (r.metrics = this.metrics || {}),
                e.addEventListener(
                  'load',
                  function (t) {
                    k(r, e)
                  },
                  (0, t.m$)(!1)
                ),
                (Me.I && (Me.I > 34 || Me.I < 10)) ||
                  e.addEventListener(
                    'progress',
                    function (e) {
                      r.lastSize = e.loaded
                    },
                    (0, t.m$)(!1)
                  )
            }
            function s(e) {
              ;(this.params = { method: e[0] }),
                O(this, e[1]),
                (this.metrics = {})
            }
            function c(t, r) {
              var n = (0, b.DL)(e)
              'xpid' in n &&
                this.sameOrigin &&
                r.setRequestHeader('X-NewRelic-ID', n.xpid)
              var o = i.generateTracePayload(this.parsedOrigin)
              if (o) {
                var a = !1
                o.newrelicHeader &&
                  (r.setRequestHeader('newrelic', o.newrelicHeader), (a = !0)),
                  o.traceContextParentHeader &&
                    (r.setRequestHeader(
                      'traceparent',
                      o.traceContextParentHeader
                    ),
                    o.traceContextStateHeader &&
                      r.setRequestHeader(
                        'tracestate',
                        o.traceContextStateHeader
                      ),
                    (a = !0)),
                  a && (this.dt = o)
              }
            }
            function u(e, n) {
              var i = this.metrics,
                o = e[0],
                a = this
              if (i && o) {
                var s = De(o)
                s && (i.txSize = s)
              }
              ;(this.startTime = (0, f.zO)()),
                (this.listener = function (e) {
                  try {
                    'abort' !== e.type ||
                      a.loadCaptureCalled ||
                      (a.params.aborted = !0),
                      ('load' !== e.type ||
                        (a.called === a.totalCbs &&
                          (a.onloadCalled || 'function' != typeof n.onload))) &&
                        a.end(n)
                  } catch (e) {
                    try {
                      r.emit('internal-error', [e])
                    } catch (e) {}
                  }
                })
              for (var c = 0; c < Fe; c++)
                n.addEventListener(Ge[c], this.listener, (0, t.m$)(!1))
            }
            function d(e, t, r) {
              ;(this.cbTime += e),
                t ? (this.onloadCalled = !0) : (this.called += 1),
                this.called !== this.totalCbs ||
                  (!this.onloadCalled && 'function' == typeof r.onload) ||
                  this.end(r)
            }
            function l(e, t) {
              var r = '' + ze(e) + !!t
              this.xhrGuids &&
                !this.xhrGuids[r] &&
                ((this.xhrGuids[r] = !0), (this.totalCbs += 1))
            }
            function p(e, t) {
              var r = '' + ze(e) + !!t
              this.xhrGuids &&
                this.xhrGuids[r] &&
                (delete this.xhrGuids[r], (this.totalCbs -= 1))
            }
            function h() {
              this.endTime = (0, f.zO)()
            }
            function v(e, t) {
              t instanceof Xe &&
                'load' === e[0] &&
                r.emit('xhr-load-added', [e[1], e[2]], t)
            }
            function _(e, t) {
              t instanceof Xe &&
                'load' === e[0] &&
                r.emit('xhr-load-removed', [e[1], e[2]], t)
            }
            function g(e, t, r) {
              t instanceof Xe &&
                ('onload' === r && (this.onload = !0),
                ('load' === (e[0] && e[0].type) || this.onload) &&
                  (this.xhrCbStart = (0, f.zO)()))
            }
            function m(e, t) {
              this.xhrCbStart &&
                r.emit(
                  'xhr-cb-time',
                  [(0, f.zO)() - this.xhrCbStart, this.onload, t],
                  t
                )
            }
            function w(e) {
              var t,
                r = e[1] || {}
              'string' == typeof e[0]
                ? (t = e[0])
                : e[0] && e[0].url
                ? (t = e[0].url)
                : o.ZP?.URL && e[0] && e[0] instanceof URL && (t = e[0].href),
                t &&
                  ((this.parsedOrigin = (0, We.e)(t)),
                  (this.sameOrigin = this.parsedOrigin.sameOrigin))
              var n = i.generateTracePayload(this.parsedOrigin)
              if (n && (n.newrelicHeader || n.traceContextParentHeader))
                if (
                  'string' == typeof e[0] ||
                  (o.ZP?.URL && e[0] && e[0] instanceof URL)
                ) {
                  var a = {}
                  for (var s in r) a[s] = r[s]
                  ;(a.headers = new Headers(r.headers || {})),
                    c(a.headers, n) && (this.dt = n),
                    e.length > 1 ? (e[1] = a) : e.push(a)
                } else
                  e[0] && e[0].headers && c(e[0].headers, n) && (this.dt = n)
              function c(e, t) {
                var r = !1
                return (
                  t.newrelicHeader &&
                    (e.set('newrelic', t.newrelicHeader), (r = !0)),
                  t.traceContextParentHeader &&
                    (e.set('traceparent', t.traceContextParentHeader),
                    t.traceContextStateHeader &&
                      e.set('tracestate', t.traceContextStateHeader),
                    (r = !0)),
                  r
                )
              }
            }
            function y(e, t) {
              ;(this.params = {}),
                (this.metrics = {}),
                (this.startTime = (0, f.zO)()),
                (this.dt = t),
                e.length >= 1 && (this.target = e[0]),
                e.length >= 2 && (this.opts = e[1])
              var r,
                n = this.opts || {},
                i = this.target
              'string' == typeof i
                ? (r = i)
                : 'object' == typeof i && i instanceof Ue
                ? (r = i.url)
                : o.ZP?.URL &&
                  'object' == typeof i &&
                  i instanceof URL &&
                  (r = i.href),
                O(this, r)
              var a = (
                '' + ((i && i instanceof Ue && i.method) || n.method || 'GET')
              ).toUpperCase()
              ;(this.params.method = a), (this.txSize = De(n.body) || 0)
            }
            function x(e, t) {
              var r
              ;(this.endTime = (0, f.zO)()),
                this.params || (this.params = {}),
                (this.params.status = t ? t.status : 0),
                'string' == typeof this.rxSize &&
                  this.rxSize.length > 0 &&
                  (r = +this.rxSize)
              var i = {
                txSize: this.txSize,
                rxSize: r,
                duration: (0, f.zO)() - this.startTime
              }
              n(
                'xhr',
                [this.params, i, this.startTime, this.endTime, 'fetch'],
                this
              )
            }
            function P(e) {
              var t = this.params,
                r = this.metrics
              if (!this.ended) {
                this.ended = !0
                for (var i = 0; i < Fe; i++)
                  e.removeEventListener(Ge[i], this.listener, !1)
                t.aborted ||
                  ((r.duration = (0, f.zO)() - this.startTime),
                  this.loadCaptureCalled || 4 !== e.readyState
                    ? null == t.status && (t.status = 0)
                    : k(this, e),
                  (r.cbTime = this.cbTime),
                  n('xhr', [t, r, this.startTime, this.endTime, 'xhr'], this))
              }
            }
            function O(e, t) {
              var r = (0, We.e)(t),
                n = e.params
              ;(n.hostname = r.hostname),
                (n.port = r.port),
                (n.protocol = r.protocol),
                (n.host = r.hostname + ':' + r.port),
                (n.pathname = r.pathname),
                (e.parsedOrigin = r),
                (e.sameOrigin = r.sameOrigin)
            }
            function k(e, t) {
              e.params.status = t.status
              var r = (function (e, t) {
                var r = e.responseType
                return 'json' === r && null !== t
                  ? t
                  : 'arraybuffer' === r || 'blob' === r || 'json' === r
                  ? De(e.response)
                  : 'text' === r || '' === r || void 0 === r
                  ? De(e.responseText)
                  : void 0
              })(t, e.lastSize)
              if ((r && (e.metrics.rxSize = r), e.sameOrigin)) {
                var n = t.getResponseHeader('X-NewRelic-App-Data')
                n && (e.params.cat = n.split(', ').pop())
              }
              e.loadCaptureCalled = !0
            }
            r.on('new-xhr', a),
              r.on('open-xhr-start', s),
              r.on('open-xhr-end', c),
              r.on('send-xhr-start', u),
              r.on('xhr-cb-time', d),
              r.on('xhr-load-added', l),
              r.on('xhr-load-removed', p),
              r.on('xhr-resolved', h),
              r.on('addEventListener-end', v),
              r.on('removeEventListener-end', _),
              r.on('fn-end', m),
              r.on('fetch-before-start', w),
              r.on('fetch-start', y),
              r.on('fn-start', g),
              r.on('fetch-done', x)
          })(this.agentIdentifier, this.ee, this.handler, this.dt))
      }
    }
    var Ye = __webpack_require__(6023),
      Je = 'learResourceTimings',
      Qe = 'addEventListener',
      Ke = 'removeEventListener',
      et = 'resourcetimingbufferfull',
      tt = 'bstResource',
      rt = '-start',
      nt = '-end',
      it = 'fn' + rt,
      ot = 'fn' + nt,
      at = 'bstTimer',
      st = 'pushState',
      ct = b.Yu.EV
    class ut extends h.W {
      constructor(e) {
        if ((super(e), !o.il)) return
        if (
          !(
            window.performance &&
            window.performance.timing &&
            window.performance.getEntriesByType
          )
        )
          return
        ;(0, b.OP)(this.agentIdentifier).features.stn = !0
        const r = this.ee
        function n(e) {
          if (
            ((0, d.p)(
              tt,
              [window.performance.getEntriesByType('resource')],
              void 0,
              void 0,
              r
            ),
            window.performance['c' + Je])
          )
            try {
              window.performance[Ke](et, n, !1)
            } catch (e) {}
          else
            try {
              window.performance[Ke]('webkit' + et, n, !1)
            } catch (e) {}
        }
        ;(this.timerEE = Te(this.ee)),
          (this.rafEE = Ce(this.ee)),
          Se(this.ee),
          ke(this.ee),
          this.ee.on(it, function (e, t) {
            e[0] instanceof ct && (this.bstStart = (0, f.zO)())
          }),
          this.ee.on(ot, function (e, t) {
            var n = e[0]
            n instanceof ct &&
              (0, d.p)(
                'bst',
                [n, t, this.bstStart, (0, f.zO)()],
                void 0,
                void 0,
                r
              )
          }),
          this.timerEE.on(it, function (e, t, r) {
            ;(this.bstStart = (0, f.zO)()), (this.bstType = r)
          }),
          this.timerEE.on(ot, function (e, t) {
            ;(0,
            d.p)(at, [t, this.bstStart, (0, f.zO)(), this.bstType], void 0, void 0, r)
          }),
          this.rafEE.on(it, function () {
            this.bstStart = (0, f.zO)()
          }),
          this.rafEE.on(ot, function (e, t) {
            ;(0,
            d.p)(at, [t, this.bstStart, (0, f.zO)(), 'requestAnimationFrame'], void 0, void 0, r)
          }),
          this.ee.on(st + rt, function (e) {
            ;(this.time = (0, f.zO)()),
              (this.startPath = location.pathname + location.hash)
          }),
          this.ee.on(st + nt, function (e) {
            ;(0,
            d.p)('bstHist', [location.pathname + location.hash, this.startPath, this.time], void 0, void 0, r)
          }),
          (0, Ye.W)()
            ? ((0, d.p)(
                tt,
                [window.performance.getEntriesByType('resource')],
                void 0,
                void 0,
                r
              ),
              (function () {
                var e = new PerformanceObserver((e, t) => {
                  var n = e.getEntries()
                  ;(0, d.p)(tt, [n], void 0, void 0, r)
                })
                try {
                  e.observe({ entryTypes: ['resource'] })
                } catch (e) {}
              })())
            : Qe in window.performance &&
              (window.performance['c' + Je]
                ? window.performance[Qe](et, n, (0, t.m$)(!1))
                : window.performance[Qe]('webkit' + et, n, (0, t.m$)(!1))),
          document[Qe]('scroll', this.noOp, (0, t.m$)(!1)),
          document[Qe]('keypress', this.noOp, (0, t.m$)(!1)),
          document[Qe]('click', this.noOp, (0, t.m$)(!1))
      }
      noOp(e) {}
    }
    class dt extends h.W {
      constructor(e) {
        super(e)
        ;(0, b.OP)(this.agentIdentifier).features.ins = !0
      }
    }
    var ft = '-start',
      lt = '-end',
      pt = '-body',
      ht = 'fn' + ft,
      vt = 'fn' + lt,
      _t = 'cb' + ft,
      bt = 'cb' + lt,
      gt = 'jsTime',
      mt = 'fetch',
      wt = 'addEventListener',
      yt = o.ZP,
      xt = yt.location
    class Pt extends h.W {
      constructor(e) {
        if ((super(e), !o.il)) return
        const r = (0, b.OP)(this.agentIdentifier)
        if (!yt[wt] || !r.xhrWrappable || r.disabled) return
        r.features.spa = !0
        let n,
          i = 0
        const a = this.ee.get('tracer'),
          s = _e(this.ee)
        const c = (function (e) {
            return we(e)
          })(this.ee),
          u = ke(this.ee),
          d = Te(this.ee),
          l = Ae(this.ee),
          p = Ee(this.ee),
          h = Se(this.ee),
          v = (function (e) {
            return ge(e)
          })(this.ee)
        function _(e, t) {
          h.emit('newURL', ['' + xt, t])
        }
        function g() {
          i++, (n = xt.hash), (this[ht] = (0, f.zO)())
        }
        function m() {
          i--, xt.hash !== n && _(0, !0)
          var e = (0, f.zO)()
          ;(this[gt] = ~~this[gt] + e - this[ht]), (this[vt] = e)
        }
        function w(e, t) {
          e.on(t, function () {
            this[t] = (0, f.zO)()
          })
        }
        this.ee.on(ht, g),
          c.on(_t, g),
          s.on(_t, g),
          this.ee.on(vt, m),
          c.on(bt, m),
          s.on(bt, m),
          this.ee.buffer([ht, vt, 'xhr-resolved']),
          u.buffer([ht]),
          d.buffer(['setTimeout' + lt, 'clearTimeout' + ft, ht]),
          l.buffer([ht, 'new-xhr', 'send-xhr' + ft]),
          p.buffer([mt + ft, mt + '-done', mt + pt + ft, mt + pt + lt]),
          h.buffer(['newURL']),
          v.buffer([ht]),
          c.buffer(['propagate', _t, bt, 'executor-err', 'resolve' + ft]),
          a.buffer([ht, 'no-' + ht]),
          s.buffer(['new-jsonp', 'cb-start', 'jsonp-error', 'jsonp-end']),
          w(p, mt + ft),
          w(p, mt + '-done'),
          w(s, 'new-jsonp'),
          w(s, 'jsonp-end'),
          w(s, 'cb-start'),
          h.on('pushState-end', _),
          h.on('replaceState-end', _),
          yt[wt]('hashchange', _, (0, t.m$)(!0)),
          yt[wt]('load', _, (0, t.m$)(!0)),
          yt[wt](
            'popstate',
            function () {
              _(0, i > 1)
            },
            (0, t.m$)(!0)
          )
      }
    }
    var Ot = __webpack_require__(9011),
      kt = __webpack_require__(4580)
    let Et = !1
    const St = (0, e.n)()
    try {
      !(function (e) {
        if (Et) return
        const t = (0, kt.gG)()
        o.v6 && (t.info.jsAttributes = { ...t.info.jsAttributes, isWorker: !0 })
        try {
          ;(0, b.CX)(u.Z, t.info),
            (0, b.Dg)(u.Z, t.init),
            (0, b.GE)(u.Z, t.loader_config),
            (0, b.sU)(u.Z, { loaderType: e }),
            (function (e) {
              var t = (0, kt.fP)(),
                r = a.ee.get(e),
                n = r.get('tracer'),
                i = 'api-',
                o = i + 'ixn-'
              function s() {}
              ;(0, B.D)(
                [
                  'setErrorHandler',
                  'finished',
                  'addToTrace',
                  'inlineHit',
                  'addRelease'
                ],
                function (e, r) {
                  t[r] = u(i, r, !0, 'api')
                }
              ),
                (t.addPageAction = u(i, 'addPageAction', !0)),
                (t.setCurrentRouteName = u(i, 'routeName', !0)),
                (t.setPageViewName = function (t, r) {
                  if ('string' == typeof t)
                    return (
                      '/' !== t.charAt(0) && (t = '/' + t),
                      ((0, b.OP)(e).customTransaction =
                        (r || 'http://custom.transaction') + t),
                      u(i, 'setPageViewName', !0, 'api')()
                    )
                }),
                (t.setCustomAttribute = function (t, r) {
                  const n = (0, b.C5)(e)
                  return (
                    (0, b.CX)(e, {
                      ...n,
                      jsAttributes: { ...n.jsAttributes, [t]: r }
                    }),
                    u(i, 'setCustomAttribute', !0, 'api')()
                  )
                }),
                (t.interaction = function () {
                  return new s().get()
                })
              var c = (s.prototype = {
                createTracer: function (e, t) {
                  var i = {},
                    a = this,
                    s = 'function' == typeof t
                  return (
                    (0, d.p)(o + 'tracer', [(0, f.zO)(), e, i], a, void 0, r),
                    function () {
                      if (
                        (n.emit(
                          (s ? '' : 'no-') + 'fn-start',
                          [(0, f.zO)(), a, s],
                          i
                        ),
                        s)
                      )
                        try {
                          return t.apply(this, arguments)
                        } catch (e) {
                          throw (
                            (n.emit(
                              'fn-err',
                              [
                                arguments,
                                this,
                                'string' == typeof e ? new Error(e) : e
                              ],
                              i
                            ),
                            e)
                          )
                        } finally {
                          n.emit('fn-end', [(0, f.zO)()], i)
                        }
                    }
                  )
                }
              })
              function u(e, t, n, i) {
                return function () {
                  return (
                    (0, d.p)(
                      'record-supportability',
                      ['API/' + t + '/called'],
                      void 0,
                      void 0,
                      r
                    ),
                    (0, d.p)(
                      e + t,
                      [(0, f.zO)()].concat(W()(arguments)),
                      n ? null : this,
                      i,
                      r
                    ),
                    n ? void 0 : this
                  )
                }
              }
              ;(0, B.D)(
                'actionText,setName,setAttribute,save,ignore,onEnd,getContext,end,get'.split(
                  ','
                ),
                function (e, t) {
                  c[t] = u(o, t)
                }
              ),
                (t.noticeError = function (e, t) {
                  'string' == typeof e && (e = new Error(e)),
                    (0, d.p)(
                      'record-supportability',
                      ['API/noticeError/called'],
                      void 0,
                      void 0,
                      r
                    ),
                    (0, d.p)('err', [e, (0, f.zO)(), !1, t], void 0, void 0, r)
                })
            })(u.Z),
            (Et = !0)
        } catch (e) {}
      })('spa')
      const e = (0, Ot.K)(u.Z)
      e.page_view_event && new v(u.Z),
        e.page_view_timing && new g(u.Z),
        e.metrics && new z(u.Z, St),
        e.jserrors && new Ne(u.Z),
        e.ajax && new Ve(u.Z),
        e.session_trace && new ut(u.Z),
        e.page_action && new dt(u.Z),
        e.spa && new Pt(u.Z),
        (function (e, t) {
          let r =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1e3
          t ? setTimeout(() => c(e), r) : o.il ? n(() => c(e)) : c(e)
        })('spa')
    } catch (e) {
      o.ZP?.newrelic?.ee?.abort && o.ZP.newrelic.ee.abort()
    }
  })(),
    (window.NRBA = __webpack_exports__)
})()
