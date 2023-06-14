/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = window,
  i =
    t.ShadowRoot &&
    (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) &&
    "adoptedStyleSheets" in Document.prototype &&
    "replace" in CSSStyleSheet.prototype,
  s = Symbol(),
  e = new WeakMap();
class n {
  constructor(t, i, e) {
    if (((this._$cssResult$ = !0), e !== s))
      throw Error(
        "CSSResult is not constructable. Use `unsafeCSS` or `css` instead."
      );
    (this.cssText = t), (this.t = i);
  }
  get styleSheet() {
    let t = this.i;
    const s = this.t;
    if (i && void 0 === t) {
      const i = void 0 !== s && 1 === s.length;
      i && (t = e.get(s)),
        void 0 === t &&
          ((this.i = t = new CSSStyleSheet()).replaceSync(this.cssText),
          i && e.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
}
const o = (t) => new n("string" == typeof t ? t : t + "", void 0, s),
  r = (t, ...i) => {
    const e =
      1 === t.length
        ? t[0]
        : i.reduce(
            (i, s, e) =>
              i +
              ((t) => {
                if (!0 === t._$cssResult$) return t.cssText;
                if ("number" == typeof t) return t;
                throw Error(
                  "Value passed to 'css' function must be a 'css' function result: " +
                    t +
                    ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security."
                );
              })(s) +
              t[e + 1],
            t[0]
          );
    return new n(e, t, s);
  },
  l = (s, e) => {
    i
      ? (s.adoptedStyleSheets = e.map((t) =>
          t instanceof CSSStyleSheet ? t : t.styleSheet
        ))
      : e.forEach((i) => {
          const e = document.createElement("style"),
            n = t.litNonce;
          void 0 !== n && e.setAttribute("nonce", n),
            (e.textContent = i.cssText),
            s.appendChild(e);
        });
  },
  h = i
    ? (t) => t
    : (t) =>
        t instanceof CSSStyleSheet
          ? ((t) => {
              let i = "";
              for (const s of t.cssRules) i += s.cssText;
              return o(i);
            })(t)
          : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var u;
const c = window,
  a = c.trustedTypes,
  d = a ? a.emptyScript : "",
  v = c.reactiveElementPolyfillSupport,
  f = {
    toAttribute(t, i) {
      switch (i) {
        case Boolean:
          t = t ? d : null;
          break;
        case Object:
        case Array:
          t = null == t ? t : JSON.stringify(t);
      }
      return t;
    },
    fromAttribute(t, i) {
      let s = t;
      switch (i) {
        case Boolean:
          s = null !== t;
          break;
        case Number:
          s = null === t ? null : Number(t);
          break;
        case Object:
        case Array:
          try {
            s = JSON.parse(t);
          } catch (t) {
            s = null;
          }
      }
      return s;
    },
  },
  p = (t, i) => i !== t && (i == i || t == t),
  y = { attribute: !0, type: String, converter: f, reflect: !1, hasChanged: p },
  b = "finalized";
class m extends HTMLElement {
  constructor() {
    super(),
      (this.o = new Map()),
      (this.isUpdatePending = !1),
      (this.hasUpdated = !1),
      (this.l = null),
      this.u();
  }
  static addInitializer(t) {
    var i;
    this.finalize(),
      (null !== (i = this.v) && void 0 !== i ? i : (this.v = [])).push(t);
  }
  static get observedAttributes() {
    this.finalize();
    const t = [];
    return (
      this.elementProperties.forEach((i, s) => {
        const e = this.p(s, i);
        void 0 !== e && (this.m.set(e, s), t.push(e));
      }),
      t
    );
  }
  static createProperty(t, i = y) {
    if (
      (i.state && (i.attribute = !1),
      this.finalize(),
      this.elementProperties.set(t, i),
      !i.noAccessor && !this.prototype.hasOwnProperty(t))
    ) {
      const s = "symbol" == typeof t ? Symbol() : "__" + t,
        e = this.getPropertyDescriptor(t, s, i);
      void 0 !== e && Object.defineProperty(this.prototype, t, e);
    }
  }
  static getPropertyDescriptor(t, i, s) {
    return {
      get() {
        return this[i];
      },
      set(e) {
        const n = this[t];
        (this[i] = e), this.requestUpdate(t, n, s);
      },
      configurable: !0,
      enumerable: !0,
    };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || y;
  }
  static finalize() {
    if (this.hasOwnProperty(b)) return !1;
    this[b] = !0;
    const t = Object.getPrototypeOf(this);
    if (
      (t.finalize(),
      void 0 !== t.v && (this.v = [...t.v]),
      (this.elementProperties = new Map(t.elementProperties)),
      (this.m = new Map()),
      this.hasOwnProperty("properties"))
    ) {
      const t = this.properties,
        i = [
          ...Object.getOwnPropertyNames(t),
          ...Object.getOwnPropertySymbols(t),
        ];
      for (const s of i) this.createProperty(s, t[s]);
    }
    return (this.elementStyles = this.finalizeStyles(this.styles)), !0;
  }
  static finalizeStyles(t) {
    const i = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const t of s) i.unshift(h(t));
    } else void 0 !== t && i.push(h(t));
    return i;
  }
  static p(t, i) {
    const s = i.attribute;
    return !1 === s
      ? void 0
      : "string" == typeof s
      ? s
      : "string" == typeof t
      ? t.toLowerCase()
      : void 0;
  }
  u() {
    var t;
    (this._ = new Promise((t) => (this.enableUpdating = t))),
      (this._$AL = new Map()),
      this.g(),
      this.requestUpdate(),
      null === (t = this.constructor.v) ||
        void 0 === t ||
        t.forEach((t) => t(this));
  }
  addController(t) {
    var i, s;
    (null !== (i = this.S) && void 0 !== i ? i : (this.S = [])).push(t),
      void 0 !== this.renderRoot &&
        this.isConnected &&
        (null === (s = t.hostConnected) || void 0 === s || s.call(t));
  }
  removeController(t) {
    var i;
    null === (i = this.S) ||
      void 0 === i ||
      i.splice(this.S.indexOf(t) >>> 0, 1);
  }
  g() {
    this.constructor.elementProperties.forEach((t, i) => {
      this.hasOwnProperty(i) && (this.o.set(i, this[i]), delete this[i]);
    });
  }
  createRenderRoot() {
    var t;
    const i =
      null !== (t = this.shadowRoot) && void 0 !== t
        ? t
        : this.attachShadow(this.constructor.shadowRootOptions);
    return l(i, this.constructor.elementStyles), i;
  }
  connectedCallback() {
    var t;
    void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()),
      this.enableUpdating(!0),
      null === (t = this.S) ||
        void 0 === t ||
        t.forEach((t) => {
          var i;
          return null === (i = t.hostConnected) || void 0 === i
            ? void 0
            : i.call(t);
        });
  }
  enableUpdating(t) {}
  disconnectedCallback() {
    var t;
    null === (t = this.S) ||
      void 0 === t ||
      t.forEach((t) => {
        var i;
        return null === (i = t.hostDisconnected) || void 0 === i
          ? void 0
          : i.call(t);
      });
  }
  attributeChangedCallback(t, i, s) {
    this._$AK(t, s);
  }
  $(t, i, s = y) {
    var e;
    const n = this.constructor.p(t, s);
    if (void 0 !== n && !0 === s.reflect) {
      const o = (
        void 0 !==
        (null === (e = s.converter) || void 0 === e ? void 0 : e.toAttribute)
          ? s.converter
          : f
      ).toAttribute(i, s.type);
      (this.l = t),
        null == o ? this.removeAttribute(n) : this.setAttribute(n, o),
        (this.l = null);
    }
  }
  _$AK(t, i) {
    var s;
    const e = this.constructor,
      n = e.m.get(t);
    if (void 0 !== n && this.l !== n) {
      const t = e.getPropertyOptions(n),
        o =
          "function" == typeof t.converter
            ? { fromAttribute: t.converter }
            : void 0 !==
              (null === (s = t.converter) || void 0 === s
                ? void 0
                : s.fromAttribute)
            ? t.converter
            : f;
      (this.l = n), (this[n] = o.fromAttribute(i, t.type)), (this.l = null);
    }
  }
  requestUpdate(t, i, s) {
    let e = !0;
    void 0 !== t &&
      (((s = s || this.constructor.getPropertyOptions(t)).hasChanged || p)(
        this[t],
        i
      )
        ? (this._$AL.has(t) || this._$AL.set(t, i),
          !0 === s.reflect &&
            this.l !== t &&
            (void 0 === this.C && (this.C = new Map()), this.C.set(t, s)))
        : (e = !1)),
      !this.isUpdatePending && e && (this._ = this.T());
  }
  async T() {
    this.isUpdatePending = !0;
    try {
      await this._;
    } catch (t) {
      Promise.reject(t);
    }
    const t = this.scheduleUpdate();
    return null != t && (await t), !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t;
    if (!this.isUpdatePending) return;
    this.hasUpdated,
      this.o && (this.o.forEach((t, i) => (this[i] = t)), (this.o = void 0));
    let i = !1;
    const s = this._$AL;
    try {
      (i = this.shouldUpdate(s)),
        i
          ? (this.willUpdate(s),
            null === (t = this.S) ||
              void 0 === t ||
              t.forEach((t) => {
                var i;
                return null === (i = t.hostUpdate) || void 0 === i
                  ? void 0
                  : i.call(t);
              }),
            this.update(s))
          : this.P();
    } catch (t) {
      throw ((i = !1), this.P(), t);
    }
    i && this._$AE(s);
  }
  willUpdate(t) {}
  _$AE(t) {
    var i;
    null === (i = this.S) ||
      void 0 === i ||
      i.forEach((t) => {
        var i;
        return null === (i = t.hostUpdated) || void 0 === i
          ? void 0
          : i.call(t);
      }),
      this.hasUpdated || ((this.hasUpdated = !0), this.firstUpdated(t)),
      this.updated(t);
  }
  P() {
    (this._$AL = new Map()), (this.isUpdatePending = !1);
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    void 0 !== this.C &&
      (this.C.forEach((t, i) => this.$(i, this[i], t)), (this.C = void 0)),
      this.P();
  }
  updated(t) {}
  firstUpdated(t) {}
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var g;
(m[b] = !0),
  (m.elementProperties = new Map()),
  (m.elementStyles = []),
  (m.shadowRootOptions = { mode: "open" }),
  null == v || v({ ReactiveElement: m }),
  (null !== (u = c.reactiveElementVersions) && void 0 !== u
    ? u
    : (c.reactiveElementVersions = [])
  ).push("1.6.2");
const w = window,
  _ = w.trustedTypes,
  $ = _ ? _.createPolicy("lit-html", { createHTML: (t) => t }) : void 0,
  S = "$lit$",
  T = `lit$${(Math.random() + "").slice(9)}$`,
  x = "?" + T,
  E = `<${x}>`,
  C = document,
  A = () => C.createComment(""),
  k = (t) => null === t || ("object" != typeof t && "function" != typeof t),
  M = Array.isArray,
  P = (t) =>
    M(t) || "function" == typeof (null == t ? void 0 : t[Symbol.iterator]),
  U = "[ \t\n\f\r]",
  V = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
  R = /-->/g,
  N = />/g,
  O = RegExp(
    `>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,
    "g"
  ),
  L = /'/g,
  j = /"/g,
  z = /^(?:script|style|textarea|title)$/i,
  H =
    (t) =>
    (i, ...s) => ({ _$litType$: t, strings: i, values: s }),
  I = H(1),
  B = H(2),
  D = Symbol.for("lit-noChange"),
  W = Symbol.for("lit-nothing"),
  Z = new WeakMap(),
  q = C.createTreeWalker(C, 129, null, !1),
  F = (t, i) => {
    const s = t.length - 1,
      e = [];
    let n,
      o = 2 === i ? "<svg>" : "",
      r = V;
    for (let i = 0; i < s; i++) {
      const s = t[i];
      let l,
        h,
        u = -1,
        c = 0;
      for (; c < s.length && ((r.lastIndex = c), (h = r.exec(s)), null !== h); )
        (c = r.lastIndex),
          r === V
            ? "!--" === h[1]
              ? (r = R)
              : void 0 !== h[1]
              ? (r = N)
              : void 0 !== h[2]
              ? (z.test(h[2]) && (n = RegExp("</" + h[2], "g")), (r = O))
              : void 0 !== h[3] && (r = O)
            : r === O
            ? ">" === h[0]
              ? ((r = null != n ? n : V), (u = -1))
              : void 0 === h[1]
              ? (u = -2)
              : ((u = r.lastIndex - h[2].length),
                (l = h[1]),
                (r = void 0 === h[3] ? O : '"' === h[3] ? j : L))
            : r === j || r === L
            ? (r = O)
            : r === R || r === N
            ? (r = V)
            : ((r = O), (n = void 0));
      const a = r === O && t[i + 1].startsWith("/>") ? " " : "";
      o +=
        r === V
          ? s + E
          : u >= 0
          ? (e.push(l), s.slice(0, u) + S + s.slice(u) + T + a)
          : s + T + (-2 === u ? (e.push(void 0), i) : a);
    }
    const l = o + (t[s] || "<?>") + (2 === i ? "</svg>" : "");
    if (!Array.isArray(t) || !t.hasOwnProperty("raw"))
      throw Error("invalid template strings array");
    return [void 0 !== $ ? $.createHTML(l) : l, e];
  };
class G {
  constructor({ strings: t, _$litType$: i }, s) {
    let e;
    this.parts = [];
    let n = 0,
      o = 0;
    const r = t.length - 1,
      l = this.parts,
      [h, u] = F(t, i);
    if (
      ((this.el = G.createElement(h, s)),
      (q.currentNode = this.el.content),
      2 === i)
    ) {
      const t = this.el.content,
        i = t.firstChild;
      i.remove(), t.append(...i.childNodes);
    }
    for (; null !== (e = q.nextNode()) && l.length < r; ) {
      if (1 === e.nodeType) {
        if (e.hasAttributes()) {
          const t = [];
          for (const i of e.getAttributeNames())
            if (i.endsWith(S) || i.startsWith(T)) {
              const s = u[o++];
              if ((t.push(i), void 0 !== s)) {
                const t = e.getAttribute(s.toLowerCase() + S).split(T),
                  i = /([.?@])?(.*)/.exec(s);
                l.push({
                  type: 1,
                  index: n,
                  name: i[2],
                  strings: t,
                  ctor:
                    "." === i[1]
                      ? X
                      : "?" === i[1]
                      ? it
                      : "@" === i[1]
                      ? st
                      : Q,
                });
              } else l.push({ type: 6, index: n });
            }
          for (const i of t) e.removeAttribute(i);
        }
        if (z.test(e.tagName)) {
          const t = e.textContent.split(T),
            i = t.length - 1;
          if (i > 0) {
            e.textContent = _ ? _.emptyScript : "";
            for (let s = 0; s < i; s++)
              e.append(t[s], A()),
                q.nextNode(),
                l.push({ type: 2, index: ++n });
            e.append(t[i], A());
          }
        }
      } else if (8 === e.nodeType)
        if (e.data === x) l.push({ type: 2, index: n });
        else {
          let t = -1;
          for (; -1 !== (t = e.data.indexOf(T, t + 1)); )
            l.push({ type: 7, index: n }), (t += T.length - 1);
        }
      n++;
    }
  }
  static createElement(t, i) {
    const s = C.createElement("template");
    return (s.innerHTML = t), s;
  }
}
function J(t, i, s = t, e) {
  var n, o, r, l;
  if (i === D) return i;
  let h =
    void 0 !== e ? (null === (n = s.A) || void 0 === n ? void 0 : n[e]) : s.k;
  const u = k(i) ? void 0 : i._$litDirective$;
  return (
    (null == h ? void 0 : h.constructor) !== u &&
      (null === (o = null == h ? void 0 : h._$AO) ||
        void 0 === o ||
        o.call(h, !1),
      void 0 === u ? (h = void 0) : ((h = new u(t)), h._$AT(t, s, e)),
      void 0 !== e
        ? ((null !== (r = (l = s).A) && void 0 !== r ? r : (l.A = []))[e] = h)
        : (s.k = h)),
    void 0 !== h && (i = J(t, h._$AS(t, i.values), h, e)),
    i
  );
}
class K {
  constructor(t, i) {
    (this._$AV = []), (this._$AN = void 0), (this._$AD = t), (this._$AM = i);
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  M(t) {
    var i;
    const {
        el: { content: s },
        parts: e,
      } = this._$AD,
      n = (
        null !== (i = null == t ? void 0 : t.creationScope) && void 0 !== i
          ? i
          : C
      ).importNode(s, !0);
    q.currentNode = n;
    let o = q.nextNode(),
      r = 0,
      l = 0,
      h = e[0];
    for (; void 0 !== h; ) {
      if (r === h.index) {
        let i;
        2 === h.type
          ? (i = new Y(o, o.nextSibling, this, t))
          : 1 === h.type
          ? (i = new h.ctor(o, h.name, h.strings, this, t))
          : 6 === h.type && (i = new et(o, this, t)),
          this._$AV.push(i),
          (h = e[++l]);
      }
      r !== (null == h ? void 0 : h.index) && ((o = q.nextNode()), r++);
    }
    return (q.currentNode = C), n;
  }
  U(t) {
    let i = 0;
    for (const s of this._$AV)
      void 0 !== s &&
        (void 0 !== s.strings
          ? (s._$AI(t, s, i), (i += s.strings.length - 2))
          : s._$AI(t[i])),
        i++;
  }
}
class Y {
  constructor(t, i, s, e) {
    var n;
    (this.type = 2),
      (this._$AH = W),
      (this._$AN = void 0),
      (this._$AA = t),
      (this._$AB = i),
      (this._$AM = s),
      (this.options = e),
      (this.N =
        null === (n = null == e ? void 0 : e.isConnected) || void 0 === n || n);
  }
  get _$AU() {
    var t, i;
    return null !==
      (i = null === (t = this._$AM) || void 0 === t ? void 0 : t._$AU) &&
      void 0 !== i
      ? i
      : this.N;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const i = this._$AM;
    return (
      void 0 !== i &&
        11 === (null == t ? void 0 : t.nodeType) &&
        (t = i.parentNode),
      t
    );
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, i = this) {
    (t = J(this, t, i)),
      k(t)
        ? t === W || null == t || "" === t
          ? (this._$AH !== W && this._$AR(), (this._$AH = W))
          : t !== this._$AH && t !== D && this.R(t)
        : void 0 !== t._$litType$
        ? this.O(t)
        : void 0 !== t.nodeType
        ? this.V(t)
        : P(t)
        ? this.j(t)
        : this.R(t);
  }
  L(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  V(t) {
    this._$AH !== t && (this._$AR(), (this._$AH = this.L(t)));
  }
  R(t) {
    this._$AH !== W && k(this._$AH)
      ? (this._$AA.nextSibling.data = t)
      : this.V(C.createTextNode(t)),
      (this._$AH = t);
  }
  O(t) {
    var i;
    const { values: s, _$litType$: e } = t,
      n =
        "number" == typeof e
          ? this._$AC(t)
          : (void 0 === e.el && (e.el = G.createElement(e.h, this.options)), e);
    if ((null === (i = this._$AH) || void 0 === i ? void 0 : i._$AD) === n)
      this._$AH.U(s);
    else {
      const t = new K(n, this),
        i = t.M(this.options);
      t.U(s), this.V(i), (this._$AH = t);
    }
  }
  _$AC(t) {
    let i = Z.get(t.strings);
    return void 0 === i && Z.set(t.strings, (i = new G(t))), i;
  }
  j(t) {
    M(this._$AH) || ((this._$AH = []), this._$AR());
    const i = this._$AH;
    let s,
      e = 0;
    for (const n of t)
      e === i.length
        ? i.push((s = new Y(this.L(A()), this.L(A()), this, this.options)))
        : (s = i[e]),
        s._$AI(n),
        e++;
    e < i.length && (this._$AR(s && s._$AB.nextSibling, e), (i.length = e));
  }
  _$AR(t = this._$AA.nextSibling, i) {
    var s;
    for (
      null === (s = this._$AP) || void 0 === s || s.call(this, !1, !0, i);
      t && t !== this._$AB;

    ) {
      const i = t.nextSibling;
      t.remove(), (t = i);
    }
  }
  setConnected(t) {
    var i;
    void 0 === this._$AM &&
      ((this.N = t),
      null === (i = this._$AP) || void 0 === i || i.call(this, t));
  }
}
class Q {
  constructor(t, i, s, e, n) {
    (this.type = 1),
      (this._$AH = W),
      (this._$AN = void 0),
      (this.element = t),
      (this.name = i),
      (this._$AM = e),
      (this.options = n),
      s.length > 2 || "" !== s[0] || "" !== s[1]
        ? ((this._$AH = Array(s.length - 1).fill(new String())),
          (this.strings = s))
        : (this._$AH = W);
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, i = this, s, e) {
    const n = this.strings;
    let o = !1;
    if (void 0 === n)
      (t = J(this, t, i, 0)),
        (o = !k(t) || (t !== this._$AH && t !== D)),
        o && (this._$AH = t);
    else {
      const e = t;
      let r, l;
      for (t = n[0], r = 0; r < n.length - 1; r++)
        (l = J(this, e[s + r], i, r)),
          l === D && (l = this._$AH[r]),
          o || (o = !k(l) || l !== this._$AH[r]),
          l === W ? (t = W) : t !== W && (t += (null != l ? l : "") + n[r + 1]),
          (this._$AH[r] = l);
    }
    o && !e && this.I(t);
  }
  I(t) {
    t === W
      ? this.element.removeAttribute(this.name)
      : this.element.setAttribute(this.name, null != t ? t : "");
  }
}
class X extends Q {
  constructor() {
    super(...arguments), (this.type = 3);
  }
  I(t) {
    this.element[this.name] = t === W ? void 0 : t;
  }
}
const tt = _ ? _.emptyScript : "";
class it extends Q {
  constructor() {
    super(...arguments), (this.type = 4);
  }
  I(t) {
    t && t !== W
      ? this.element.setAttribute(this.name, tt)
      : this.element.removeAttribute(this.name);
  }
}
class st extends Q {
  constructor(t, i, s, e, n) {
    super(t, i, s, e, n), (this.type = 5);
  }
  _$AI(t, i = this) {
    var s;
    if ((t = null !== (s = J(this, t, i, 0)) && void 0 !== s ? s : W) === D)
      return;
    const e = this._$AH,
      n =
        (t === W && e !== W) ||
        t.capture !== e.capture ||
        t.once !== e.once ||
        t.passive !== e.passive,
      o = t !== W && (e === W || n);
    n && this.element.removeEventListener(this.name, this, e),
      o && this.element.addEventListener(this.name, this, t),
      (this._$AH = t);
  }
  handleEvent(t) {
    var i, s;
    "function" == typeof this._$AH
      ? this._$AH.call(
          null !==
            (s =
              null === (i = this.options) || void 0 === i ? void 0 : i.host) &&
            void 0 !== s
            ? s
            : this.element,
          t
        )
      : this._$AH.handleEvent(t);
  }
}
class et {
  constructor(t, i, s) {
    (this.element = t),
      (this.type = 6),
      (this._$AN = void 0),
      (this._$AM = i),
      (this.options = s);
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    J(this, t);
  }
}
const nt = {
    H: S,
    B: T,
    D: x,
    q: 1,
    J: F,
    W: K,
    Z: P,
    F: J,
    G: Y,
    K: Q,
    X: it,
    Y: st,
    tt: X,
    it: et,
  },
  ot = w.litHtmlPolyfillSupport;
null == ot || ot(G, Y),
  (null !== (g = w.litHtmlVersions) && void 0 !== g
    ? g
    : (w.litHtmlVersions = [])
  ).push("2.7.4");
const rt = (t, i, s) => {
  var e, n;
  const o =
    null !== (e = null == s ? void 0 : s.renderBefore) && void 0 !== e ? e : i;
  let r = o._$litPart$;
  if (void 0 === r) {
    const t =
      null !== (n = null == s ? void 0 : s.renderBefore) && void 0 !== n
        ? n
        : null;
    o._$litPart$ = r = new Y(
      i.insertBefore(A(), t),
      t,
      void 0,
      null != s ? s : {}
    );
  }
  return r._$AI(t), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var lt, ht;
class ct extends m {
  constructor() {
    super(...arguments),
      (this.renderOptions = { host: this }),
      (this.st = void 0);
  }
  createRenderRoot() {
    var t, i;
    const s = super.createRenderRoot();
    return (
      (null !== (t = (i = this.renderOptions).renderBefore) && void 0 !== t) ||
        (i.renderBefore = s.firstChild),
      s
    );
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
      super.update(t),
      (this.st = rt(i, this.renderRoot, this.renderOptions));
  }
  connectedCallback() {
    var t;
    super.connectedCallback(),
      null === (t = this.st) || void 0 === t || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(),
      null === (t = this.st) || void 0 === t || t.setConnected(!1);
  }
  render() {
    return D;
  }
}
(ct.finalized = !0),
  (ct._$litElement$ = !0),
  null === (lt = globalThis.litElementHydrateSupport) ||
    void 0 === lt ||
    lt.call(globalThis, { LitElement: ct });
const at = globalThis.litElementPolyfillSupport;
null == at || at({ LitElement: ct });
const dt = {
  _$AK: (t, i, s) => {
    t._$AK(i, s);
  },
  _$AL: (t) => t._$AL,
};
(null !== (ht = globalThis.litElementVersions) && void 0 !== ht
  ? ht
  : (globalThis.litElementVersions = [])
).push("3.3.2");

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
export {
  ct as LitElement,
  r as css,
  I as html,
};

