function St(e, t) {
  window.bridgeCommand(e, t);
}
function Dt() {
  let e;
  return [new Promise((n) => e = n), e];
}
const p = /* @__PURE__ */ Symbol(), ae = !1;
var He = Array.isArray, We = Array.prototype.indexOf, le = Object.getOwnPropertyDescriptor, Ze = Object.prototype, $e = Array.prototype, Je = Object.getPrototypeOf;
function Qe(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
function Xe() {
  var e, t, n = new Promise((r, f) => {
    e = r, t = f;
  });
  return { promise: n, resolve: e, reject: t };
}
const g = 2, et = 4, tt = 1 << 24, B = 16, W = 32, Z = 64, he = 128, R = 512, w = 1024, T = 2048, S = 4096, ee = 8192, I = 16384, nt = 32768, ge = 1 << 17, xe = 1 << 18, L = 32768, ce = 1 << 21, Te = 1 << 22, z = 1 << 23, ue = /* @__PURE__ */ Symbol("$state"), Ae = new class extends Error {
  name = "StaleReactionError";
  message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}();
function rt() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function ft() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function st() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function it() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function lt(e) {
  return e === this.v;
}
let ut = !1;
function Re() {
  return !0;
}
let Y = [];
function ot() {
  var e = Y;
  Y = [], Qe(e);
}
function at(e) {
  if (Y.length === 0) {
    var t = Y;
    queueMicrotask(() => {
      t === Y && ot();
    });
  }
  Y.push(e);
}
function ct(e) {
  var t = m;
  if (t === null)
    return _.f |= z, e;
  if ((t.f & nt) === 0) {
    if ((t.f & he) === 0)
      throw e;
    t.b.error(e);
  } else
    Se(e, t);
}
function Se(e, t) {
  for (; t !== null; ) {
    if ((t.f & he) !== 0)
      try {
        t.b.error(e);
        return;
      } catch (n) {
        e = n;
      }
    t = t.parent;
  }
  throw e;
}
const Q = /* @__PURE__ */ new Set();
let h = null, k = null, A = [], de = null, ve = !1;
class G {
  committed = !1;
  /**
   * The current values of any sources that are updated in this batch
   * They keys of this map are identical to `this.#previous`
   * @type {Map<Source, any>}
   */
  current = /* @__PURE__ */ new Map();
  /**
   * The values of any sources that are updated in this batch _before_ those updates took place.
   * They keys of this map are identical to `this.#current`
   * @type {Map<Source, any>}
   */
  previous = /* @__PURE__ */ new Map();
  /**
   * When the batch is committed (and the DOM is updated), we need to remove old branches
   * and append new ones by calling the functions added inside (if/each/key/etc) blocks
   * @type {Set<() => void>}
   */
  #r = /* @__PURE__ */ new Set();
  /**
   * If a fork is discarded, we need to destroy any effects that are no longer needed
   * @type {Set<(batch: Batch) => void>}
   */
  #f = /* @__PURE__ */ new Set();
  /**
   * The number of async effects that are currently in flight
   */
  #e = 0;
  /**
   * The number of async effects that are currently in flight, _not_ inside a pending boundary
   */
  #t = 0;
  /**
   * A deferred that resolves when the batch is committed, used with `settled()`
   * TODO replace with Promise.withResolvers once supported widely enough
   * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
   */
  #l = null;
  /**
   * Deferred effects (which run after async work has completed) that are DIRTY
   * @type {Set<Effect>}
   */
  #s = /* @__PURE__ */ new Set();
  /**
   * Deferred effects that are MAYBE_DIRTY
   * @type {Set<Effect>}
   */
  #i = /* @__PURE__ */ new Set();
  /**
   * A set of branches that still exist, but will be destroyed when this batch
   * is committed — we skip over these during `process`
   * @type {Set<Effect>}
   */
  skipped_effects = /* @__PURE__ */ new Set();
  is_fork = !1;
  is_deferred() {
    return this.is_fork || this.#t > 0;
  }
  /**
   *
   * @param {Effect[]} root_effects
   */
  process(t) {
    A = [], this.apply();
    var n = {
      parent: null,
      effect: null,
      effects: [],
      render_effects: []
    };
    for (const r of t)
      this.#u(r, n);
    this.is_fork || this.#a(), this.is_deferred() ? (this.#n(n.effects), this.#n(n.render_effects)) : (h = null, Ee(n.render_effects), Ee(n.effects), this.#l?.resolve()), k = null;
  }
  /**
   * Traverse the effect tree, executing effects or stashing
   * them for later execution as appropriate
   * @param {Effect} root
   * @param {EffectTarget} target
   */
  #u(t, n) {
    t.f ^= w;
    for (var r = t.first; r !== null; ) {
      var f = r.f, i = (f & (W | Z)) !== 0, o = i && (f & w) !== 0, u = o || (f & ee) !== 0 || this.skipped_effects.has(r);
      if ((r.f & he) !== 0 && r.b?.is_pending() && (n = {
        parent: n,
        effect: r,
        effects: [],
        render_effects: []
      }), !u && r.fn !== null) {
        i ? r.f ^= w : (f & et) !== 0 ? n.effects.push(r) : J(r) && ((r.f & B) !== 0 && this.#s.add(r), se(r));
        var s = r.first;
        if (s !== null) {
          r = s;
          continue;
        }
      }
      var l = r.parent;
      for (r = r.next; r === null && l !== null; )
        l === n.effect && (this.#n(n.effects), this.#n(n.render_effects), n = /** @type {EffectTarget} */
        n.parent), r = l.next, l = l.parent;
    }
  }
  /**
   * @param {Effect[]} effects
   */
  #n(t) {
    for (const n of t)
      (n.f & T) !== 0 ? this.#s.add(n) : (n.f & S) !== 0 && this.#i.add(n), this.#o(n.deps), y(n, w);
  }
  /**
   * @param {Value[] | null} deps
   */
  #o(t) {
    if (t !== null)
      for (const n of t)
        (n.f & g) === 0 || (n.f & L) === 0 || (n.f ^= L, this.#o(
          /** @type {Derived} */
          n.deps
        ));
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Source} source
   * @param {any} value
   */
  capture(t, n) {
    this.previous.has(t) || this.previous.set(t, n), (t.f & z) === 0 && (this.current.set(t, t.v), k?.set(t, t.v));
  }
  activate() {
    h = this, this.apply();
  }
  deactivate() {
    h === this && (h = null, k = null);
  }
  flush() {
    if (this.activate(), A.length > 0) {
      if (vt(), h !== null && h !== this)
        return;
    } else this.#e === 0 && this.process([]);
    this.deactivate();
  }
  discard() {
    for (const t of this.#f) t(this);
    this.#f.clear();
  }
  #a() {
    if (this.#t === 0) {
      for (const t of this.#r) t();
      this.#r.clear();
    }
    this.#e === 0 && this.#c();
  }
  #c() {
    if (Q.size > 1) {
      this.previous.clear();
      var t = k, n = !0, r = {
        parent: null,
        effect: null,
        effects: [],
        render_effects: []
      };
      for (const i of Q) {
        if (i === this) {
          n = !1;
          continue;
        }
        const o = [];
        for (const [s, l] of this.current) {
          if (i.current.has(s))
            if (n && l !== i.current.get(s))
              i.current.set(s, l);
            else
              continue;
          o.push(s);
        }
        if (o.length === 0)
          continue;
        const u = [...i.current.keys()].filter((s) => !this.current.has(s));
        if (u.length > 0) {
          var f = A;
          A = [];
          const s = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Map();
          for (const c of o)
            De(c, u, s, l);
          if (A.length > 0) {
            h = i, i.apply();
            for (const c of A)
              i.#u(c, r);
            i.deactivate();
          }
          A = f;
        }
      }
      h = null, k = t;
    }
    this.committed = !0, Q.delete(this);
  }
  /**
   *
   * @param {boolean} blocking
   */
  increment(t) {
    this.#e += 1, t && (this.#t += 1);
  }
  /**
   *
   * @param {boolean} blocking
   */
  decrement(t) {
    this.#e -= 1, t && (this.#t -= 1), this.revive();
  }
  revive() {
    for (const t of this.#s)
      this.#i.delete(t), y(t, T), V(t);
    for (const t of this.#i)
      y(t, S), V(t);
    this.flush();
  }
  /** @param {() => void} fn */
  oncommit(t) {
    this.#r.add(t);
  }
  /** @param {(batch: Batch) => void} fn */
  ondiscard(t) {
    this.#f.add(t);
  }
  settled() {
    return (this.#l ??= Xe()).promise;
  }
  static ensure() {
    if (h === null) {
      const t = h = new G();
      Q.add(h), G.enqueue(() => {
        h === t && t.flush();
      });
    }
    return h;
  }
  /** @param {() => void} task */
  static enqueue(t) {
    at(t);
  }
  apply() {
  }
}
function vt() {
  var e = P;
  ve = !0;
  var t = null;
  try {
    var n = 0;
    for (ne(!0); A.length > 0; ) {
      var r = G.ensure();
      if (n++ > 1e3) {
        var f, i;
        _t();
      }
      r.process(A), C.clear();
    }
  } finally {
    ve = !1, ne(e), de = null;
  }
}
function _t() {
  try {
    rt();
  } catch (e) {
    Se(e, de);
  }
}
let D = null;
function Ee(e) {
  var t = e.length;
  if (t !== 0) {
    for (var n = 0; n < t; ) {
      var r = e[n++];
      if ((r.f & (I | ee)) === 0 && J(r) && (D = /* @__PURE__ */ new Set(), se(r), r.deps === null && r.first === null && r.nodes === null && (r.teardown === null && r.ac === null ? Le(r) : r.fn = null), D?.size > 0)) {
        C.clear();
        for (const f of D) {
          if ((f.f & (I | ee)) !== 0) continue;
          const i = [f];
          let o = f.parent;
          for (; o !== null; )
            D.has(o) && (D.delete(o), i.push(o)), o = o.parent;
          for (let u = i.length - 1; u >= 0; u--) {
            const s = i[u];
            (s.f & (I | ee)) === 0 && se(s);
          }
        }
        D.clear();
      }
    }
    D = null;
  }
}
function De(e, t, n, r) {
  if (!n.has(e) && (n.add(e), e.reactions !== null))
    for (const f of e.reactions) {
      const i = f.f;
      (i & g) !== 0 ? De(
        /** @type {Derived} */
        f,
        t,
        n,
        r
      ) : (i & (Te | B)) !== 0 && (i & T) === 0 && Oe(f, t, r) && (y(f, T), V(
        /** @type {Effect} */
        f
      ));
    }
}
function Oe(e, t, n) {
  const r = n.get(e);
  if (r !== void 0) return r;
  if (e.deps !== null)
    for (const f of e.deps) {
      if (t.includes(f))
        return !0;
      if ((f.f & g) !== 0 && Oe(
        /** @type {Derived} */
        f,
        t,
        n
      ))
        return n.set(
          /** @type {Derived} */
          f,
          !0
        ), !0;
    }
  return n.set(e, !1), !1;
}
function V(e) {
  for (var t = de = e; t.parent !== null; ) {
    t = t.parent;
    var n = t.f;
    if (ve && t === m && (n & B) !== 0 && (n & xe) === 0)
      return;
    if ((n & (Z | W)) !== 0) {
      if ((n & w) === 0) return;
      t.f ^= w;
    }
  }
  A.push(t);
}
function Fe(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var n = 0; n < t.length; n += 1)
      we(
        /** @type {Effect} */
        t[n]
      );
  }
}
function ht(e) {
  for (var t = e.parent; t !== null; ) {
    if ((t.f & g) === 0)
      return (t.f & I) === 0 ? (
        /** @type {Effect} */
        t
      ) : null;
    t = t.parent;
  }
  return null;
}
function pe(e) {
  var t, n = m;
  re(ht(e));
  try {
    e.f &= ~L, Fe(e), t = Ue(e);
  } finally {
    re(n);
  }
  return t;
}
function Ce(e) {
  var t = pe(e);
  if (e.equals(t) || (h?.is_fork || (e.v = t), e.wv = Ye()), !$)
    if (k !== null)
      (te() || h?.is_fork) && k.set(e, t);
    else {
      var n = (e.f & R) === 0 ? S : w;
      y(e, n);
    }
}
let _e = /* @__PURE__ */ new Set();
const C = /* @__PURE__ */ new Map();
let Ne = !1;
function dt(e, t) {
  var n = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: lt,
    rv: 0,
    wv: 0
  };
  return n;
}
// @__NO_SIDE_EFFECTS__
function F(e, t) {
  const n = dt(e);
  return bt(n), n;
}
function N(e, t, n = !1) {
  _ !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!M || (_.f & ge) !== 0) && Re() && (_.f & (g | B | Te | ge)) !== 0 && !O?.includes(e) && it();
  let r = n ? K(t) : t;
  return pt(e, r);
}
function pt(e, t) {
  if (!e.equals(t)) {
    var n = e.v;
    $ ? C.set(e, t) : C.set(e, n), e.v = t;
    var r = G.ensure();
    r.capture(e, n), (e.f & g) !== 0 && ((e.f & T) !== 0 && pe(
      /** @type {Derived} */
      e
    ), y(e, (e.f & R) !== 0 ? w : S)), e.wv = Ye(), Me(e, T), m !== null && (m.f & w) !== 0 && (m.f & (W | Z)) === 0 && (b === null ? kt([e]) : b.push(e)), !r.is_fork && _e.size > 0 && !Ne && wt();
  }
  return t;
}
function wt() {
  Ne = !1;
  var e = P;
  ne(!0);
  const t = Array.from(_e);
  try {
    for (const n of t)
      (n.f & w) !== 0 && y(n, S), J(n) && se(n);
  } finally {
    ne(e);
  }
  _e.clear();
}
function oe(e) {
  N(e, e.v + 1);
}
function Me(e, t) {
  var n = e.reactions;
  if (n !== null)
    for (var r = n.length, f = 0; f < r; f++) {
      var i = n[f], o = i.f, u = (o & T) === 0;
      if (u && y(i, t), (o & g) !== 0) {
        var s = (
          /** @type {Derived} */
          i
        );
        k?.delete(s), (o & L) === 0 && (o & R && (i.f |= L), Me(s, S));
      } else u && ((o & B) !== 0 && D !== null && D.add(
        /** @type {Effect} */
        i
      ), V(
        /** @type {Effect} */
        i
      ));
    }
}
function K(e) {
  if (typeof e != "object" || e === null || ue in e)
    return e;
  const t = Je(e);
  if (t !== Ze && t !== $e)
    return e;
  var n = /* @__PURE__ */ new Map(), r = He(e), f = /* @__PURE__ */ F(0), i = q, o = (u) => {
    if (q === i)
      return u();
    var s = _, l = q;
    U(null), ke(i);
    var c = u();
    return U(s), ke(l), c;
  };
  return r && n.set("length", /* @__PURE__ */ F(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(u, s, l) {
        (!("value" in l) || l.configurable === !1 || l.enumerable === !1 || l.writable === !1) && ft();
        var c = n.get(s);
        return c === void 0 ? c = o(() => {
          var a = /* @__PURE__ */ F(l.value);
          return n.set(s, a), a;
        }) : N(c, l.value, !0), !0;
      },
      deleteProperty(u, s) {
        var l = n.get(s);
        if (l === void 0) {
          if (s in u) {
            const c = o(() => /* @__PURE__ */ F(p));
            n.set(s, c), oe(f);
          }
        } else
          N(l, p), oe(f);
        return !0;
      },
      get(u, s, l) {
        if (s === ue)
          return e;
        var c = n.get(s), a = s in u;
        if (c === void 0 && (!a || le(u, s)?.writable) && (c = o(() => {
          var x = K(a ? u[s] : p), j = /* @__PURE__ */ F(x);
          return j;
        }), n.set(s, c)), c !== void 0) {
          var v = X(c);
          return v === p ? void 0 : v;
        }
        return Reflect.get(u, s, l);
      },
      getOwnPropertyDescriptor(u, s) {
        var l = Reflect.getOwnPropertyDescriptor(u, s);
        if (l && "value" in l) {
          var c = n.get(s);
          c && (l.value = X(c));
        } else if (l === void 0) {
          var a = n.get(s), v = a?.v;
          if (a !== void 0 && v !== p)
            return {
              enumerable: !0,
              configurable: !0,
              value: v,
              writable: !0
            };
        }
        return l;
      },
      has(u, s) {
        if (s === ue)
          return !0;
        var l = n.get(s), c = l !== void 0 && l.v !== p || Reflect.has(u, s);
        if (l !== void 0 || m !== null && (!c || le(u, s)?.writable)) {
          l === void 0 && (l = o(() => {
            var v = c ? K(u[s]) : p, x = /* @__PURE__ */ F(v);
            return x;
          }), n.set(s, l));
          var a = X(l);
          if (a === p)
            return !1;
        }
        return c;
      },
      set(u, s, l, c) {
        var a = n.get(s), v = s in u;
        if (r && s === "length")
          for (var x = l; x < /** @type {Source<number>} */
          a.v; x += 1) {
            var j = n.get(x + "");
            j !== void 0 ? N(j, p) : x in u && (j = o(() => /* @__PURE__ */ F(p)), n.set(x + "", j));
          }
        if (a === void 0)
          (!v || le(u, s)?.writable) && (a = o(() => /* @__PURE__ */ F(void 0)), N(a, K(l)), n.set(s, a));
        else {
          v = a.v !== p;
          var Ve = o(() => K(l));
          N(a, Ve);
        }
        var me = Reflect.getOwnPropertyDescriptor(u, s);
        if (me?.set && me.set.call(c, l), !v) {
          if (r && typeof s == "string") {
            var ye = (
              /** @type {Source<number>} */
              n.get("length")
            ), ie = Number(s);
            Number.isInteger(ie) && ie >= ye.v && N(ye, ie + 1);
          }
          oe(f);
        }
        return !0;
      },
      ownKeys(u) {
        X(f);
        var s = Reflect.ownKeys(u).filter((a) => {
          var v = n.get(a);
          return v === void 0 || v.v !== p;
        });
        for (var [l, c] of n)
          c.v !== p && !(l in u) && s.push(l);
        return s;
      },
      setPrototypeOf() {
        st();
      }
    }
  );
}
var mt;
// @__NO_SIDE_EFFECTS__
function yt(e) {
  return (
    /** @type {TemplateNode | null} */
    mt.call(e)
  );
}
function Ie(e) {
  var t = _, n = m;
  U(null), re(null);
  try {
    return e();
  } finally {
    U(t), re(n);
  }
}
function te() {
  return _ !== null && !M;
}
function Pe(e) {
  var t = e.teardown;
  if (t !== null) {
    const n = $, r = _;
    be(!0), U(null);
    try {
      t.call(null);
    } finally {
      be(n), U(r);
    }
  }
}
function qe(e, t = !1) {
  var n = e.first;
  for (e.first = e.last = null; n !== null; ) {
    const f = n.ac;
    f !== null && Ie(() => {
      f.abort(Ae);
    });
    var r = n.next;
    (n.f & Z) !== 0 ? n.parent = null : we(n, t), n = r;
  }
}
function gt(e) {
  for (var t = e.first; t !== null; ) {
    var n = t.next;
    (t.f & W) === 0 && we(t), t = n;
  }
}
function we(e, t = !0) {
  var n = !1;
  (t || (e.f & xe) !== 0) && e.nodes !== null && e.nodes.end !== null && (Et(
    e.nodes.start,
    /** @type {TemplateNode} */
    e.nodes.end
  ), n = !0), qe(e, t && !n), fe(e, 0), y(e, I);
  var r = e.nodes && e.nodes.t;
  if (r !== null)
    for (const i of r)
      i.stop();
  Pe(e);
  var f = e.parent;
  f !== null && f.first !== null && Le(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = null;
}
function Et(e, t) {
  for (; e !== null; ) {
    var n = e === t ? null : /* @__PURE__ */ yt(e);
    e.remove(), e = n;
  }
}
function Le(e) {
  var t = e.parent, n = e.prev, r = e.next;
  n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
let P = !1;
function ne(e) {
  P = e;
}
let $ = !1;
function be(e) {
  $ = e;
}
let _ = null, M = !1;
function U(e) {
  _ = e;
}
let m = null;
function re(e) {
  m = e;
}
let O = null;
function bt(e) {
  _ !== null && (O === null ? O = [e] : O.push(e));
}
let d = null, E = 0, b = null;
function kt(e) {
  b = e;
}
let je = 1, H = 0, q = H;
function ke(e) {
  q = e;
}
function Ye() {
  return ++je;
}
function J(e) {
  var t = e.f;
  if ((t & T) !== 0)
    return !0;
  if (t & g && (e.f &= ~L), (t & S) !== 0) {
    var n = e.deps;
    if (n !== null)
      for (var r = n.length, f = 0; f < r; f++) {
        var i = n[f];
        if (J(
          /** @type {Derived} */
          i
        ) && Ce(
          /** @type {Derived} */
          i
        ), i.wv > e.wv)
          return !0;
      }
    (t & R) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    k === null && y(e, w);
  }
  return !1;
}
function Ke(e, t, n = !0) {
  var r = e.reactions;
  if (r !== null && !O?.includes(e))
    for (var f = 0; f < r.length; f++) {
      var i = r[f];
      (i.f & g) !== 0 ? Ke(
        /** @type {Derived} */
        i,
        t,
        !1
      ) : t === i && (n ? y(i, T) : (i.f & w) !== 0 && y(i, S), V(
        /** @type {Effect} */
        i
      ));
    }
}
function Ue(e) {
  var t = d, n = E, r = b, f = _, i = O, o = M, u = q, s = e.f;
  d = /** @type {null | Value[]} */
  null, E = 0, b = null, _ = (s & (W | Z)) === 0 ? e : null, O = null, e.ctx, M = !1, q = ++H, e.ac !== null && (Ie(() => {
    e.ac.abort(Ae);
  }), e.ac = null);
  try {
    e.f |= ce;
    var l = (
      /** @type {Function} */
      e.fn
    ), c = l(), a = e.deps;
    if (d !== null) {
      var v;
      if (fe(e, E), a !== null && E > 0)
        for (a.length = E + d.length, v = 0; v < d.length; v++)
          a[E + v] = d[v];
      else
        e.deps = a = d;
      if (te() && (e.f & R) !== 0)
        for (v = E; v < a.length; v++)
          (a[v].reactions ??= []).push(e);
    } else a !== null && E < a.length && (fe(e, E), a.length = E);
    if (Re() && b !== null && !M && a !== null && (e.f & (g | S | T)) === 0)
      for (v = 0; v < /** @type {Source[]} */
      b.length; v++)
        Ke(
          b[v],
          /** @type {Effect} */
          e
        );
    return f !== null && f !== e && (H++, b !== null && (r === null ? r = b : r.push(.../** @type {Source[]} */
    b))), (e.f & z) !== 0 && (e.f ^= z), c;
  } catch (x) {
    return ct(x);
  } finally {
    e.f ^= ce, d = t, E = n, b = r, _ = f, O = i, M = o, q = u;
  }
}
function xt(e, t) {
  let n = t.reactions;
  if (n !== null) {
    var r = We.call(n, e);
    if (r !== -1) {
      var f = n.length - 1;
      f === 0 ? n = t.reactions = null : (n[r] = n[f], n.pop());
    }
  }
  n === null && (t.f & g) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (d === null || !d.includes(t)) && (y(t, S), (t.f & R) !== 0 && (t.f ^= R, t.f &= ~L), Fe(
    /** @type {Derived} **/
    t
  ), fe(
    /** @type {Derived} **/
    t,
    0
  ));
}
function fe(e, t) {
  var n = e.deps;
  if (n !== null)
    for (var r = t; r < n.length; r++)
      xt(e, n[r]);
}
function se(e) {
  var t = e.f;
  if ((t & I) === 0) {
    y(e, w);
    var n = m, r = P;
    m = e, P = !0;
    try {
      (t & (B | tt)) !== 0 ? gt(e) : qe(e), Pe(e);
      var f = Ue(e);
      e.teardown = typeof f == "function" ? f : null, e.wv = je;
      var i;
      ae && ut && (e.f & T) !== 0 && e.deps;
    } finally {
      P = r, m = n;
    }
  }
}
function X(e) {
  var t = e.f, n = (t & g) !== 0;
  if (_ !== null && !M) {
    var r = m !== null && (m.f & I) !== 0;
    if (!r && !O?.includes(e)) {
      var f = _.deps;
      if ((_.f & ce) !== 0)
        e.rv < H && (e.rv = H, d === null && f !== null && f[E] === e ? E++ : d === null ? d = [e] : d.includes(e) || d.push(e));
      else {
        (_.deps ??= []).push(e);
        var i = e.reactions;
        i === null ? e.reactions = [_] : i.includes(_) || i.push(_);
      }
    }
  }
  if ($) {
    if (C.has(e))
      return C.get(e);
    if (n) {
      var o = (
        /** @type {Derived} */
        e
      ), u = o.v;
      return ((o.f & w) === 0 && o.reactions !== null || ze(o)) && (u = pe(o)), C.set(o, u), u;
    }
  } else n && (!k?.has(e) || h?.is_fork && !te()) && (o = /** @type {Derived} */
  e, J(o) && Ce(o), P && te() && (o.f & R) === 0 && Be(o));
  if (k?.has(e))
    return k.get(e);
  if ((e.f & z) !== 0)
    throw e.v;
  return e.v;
}
function Be(e) {
  if (e.deps !== null) {
    e.f ^= R;
    for (const t of e.deps)
      (t.reactions ??= []).push(e), (t.f & g) !== 0 && (t.f & R) === 0 && Be(
        /** @type {Derived} */
        t
      );
  }
}
function ze(e) {
  if (e.v === p) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps)
    if (C.has(t) || (t.f & g) !== 0 && ze(
      /** @type {Derived} */
      t
    ))
      return !0;
  return !1;
}
const Tt = -7169;
function y(e, t) {
  e.f = e.f & Tt | t;
}
function Ft() {
  const e = window.location.hash == "#night";
  return e && (document.documentElement.className = "night-mode", document.documentElement.dataset.bsTheme = "dark"), e;
}
function Ge() {
  return {
    isDark: document.documentElement.classList.contains("night-mode")
  };
}
const At = K(Ge()), Rt = new MutationObserver((e, t) => {
  At.isDark = Ge().isDark;
});
Rt.observe(document.documentElement, { attributeFilter: ["class"] });
export {
  St as bridgeCommand,
  Ft as checkNightMode,
  At as pageTheme,
  Dt as promiseWithResolver
};
