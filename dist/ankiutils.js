function Ju(e, n) {
  window.bridgeCommand(e, n);
}
function Xu() {
  let e;
  return [new Promise((t) => e = t), e];
}
var y;
(function(e) {
  e[e.Canceled = 1] = "Canceled", e[e.Unknown = 2] = "Unknown", e[e.InvalidArgument = 3] = "InvalidArgument", e[e.DeadlineExceeded = 4] = "DeadlineExceeded", e[e.NotFound = 5] = "NotFound", e[e.AlreadyExists = 6] = "AlreadyExists", e[e.PermissionDenied = 7] = "PermissionDenied", e[e.ResourceExhausted = 8] = "ResourceExhausted", e[e.FailedPrecondition = 9] = "FailedPrecondition", e[e.Aborted = 10] = "Aborted", e[e.OutOfRange = 11] = "OutOfRange", e[e.Unimplemented = 12] = "Unimplemented", e[e.Internal = 13] = "Internal", e[e.Unavailable = 14] = "Unavailable", e[e.DataLoss = 15] = "DataLoss", e[e.Unauthenticated = 16] = "Unauthenticated";
})(y || (y = {}));
function Mn(e, n) {
  return e !== null && typeof e == "object" && "$typeName" in e && typeof e.$typeName == "string" ? n === void 0 ? !0 : n.typeName === e.$typeName : !1;
}
var l;
(function(e) {
  e[e.DOUBLE = 1] = "DOUBLE", e[e.FLOAT = 2] = "FLOAT", e[e.INT64 = 3] = "INT64", e[e.UINT64 = 4] = "UINT64", e[e.INT32 = 5] = "INT32", e[e.FIXED64 = 6] = "FIXED64", e[e.FIXED32 = 7] = "FIXED32", e[e.BOOL = 8] = "BOOL", e[e.STRING = 9] = "STRING", e[e.BYTES = 12] = "BYTES", e[e.UINT32 = 13] = "UINT32", e[e.SFIXED32 = 15] = "SFIXED32", e[e.SFIXED64 = 16] = "SFIXED64", e[e.SINT32 = 17] = "SINT32", e[e.SINT64 = 18] = "SINT64";
})(l || (l = {}));
function as() {
  let e = 0, n = 0;
  for (let r = 0; r < 28; r += 7) {
    let a = this.buf[this.pos++];
    if (e |= (a & 127) << r, (a & 128) == 0)
      return this.assertBounds(), [e, n];
  }
  let t = this.buf[this.pos++];
  if (e |= (t & 15) << 28, n = (t & 112) >> 4, (t & 128) == 0)
    return this.assertBounds(), [e, n];
  for (let r = 3; r <= 31; r += 7) {
    let a = this.buf[this.pos++];
    if (n |= (a & 127) << r, (a & 128) == 0)
      return this.assertBounds(), [e, n];
  }
  throw new Error("invalid varint");
}
function hn(e, n, t) {
  for (let s = 0; s < 28; s = s + 7) {
    const o = e >>> s, i = !(!(o >>> 7) && n == 0), u = (i ? o | 128 : o) & 255;
    if (t.push(u), !i)
      return;
  }
  const r = e >>> 28 & 15 | (n & 7) << 4, a = n >> 3 != 0;
  if (t.push((a ? r | 128 : r) & 255), !!a) {
    for (let s = 3; s < 31; s = s + 7) {
      const o = n >>> s, i = !!(o >>> 7), u = (i ? o | 128 : o) & 255;
      if (t.push(u), !i)
        return;
    }
    t.push(n >>> 31 & 1);
  }
}
const Xe = 4294967296;
function ht(e) {
  const n = e[0] === "-";
  n && (e = e.slice(1));
  const t = 1e6;
  let r = 0, a = 0;
  function s(o, i) {
    const u = Number(e.slice(o, i));
    a *= t, r = r * t + u, r >= Xe && (a = a + (r / Xe | 0), r = r % Xe);
  }
  return s(-24, -18), s(-18, -12), s(-12, -6), s(-6), n ? Sr(r, a) : Bn(r, a);
}
function ss(e, n) {
  let t = Bn(e, n);
  const r = t.hi & 2147483648;
  r && (t = Sr(t.lo, t.hi));
  const a = Tr(t.lo, t.hi);
  return r ? "-" + a : a;
}
function Tr(e, n) {
  if ({ lo: e, hi: n } = os(e, n), n <= 2097151)
    return String(Xe * n + e);
  const t = e & 16777215, r = (e >>> 24 | n << 8) & 16777215, a = n >> 16 & 65535;
  let s = t + r * 6777216 + a * 6710656, o = r + a * 8147497, i = a * 2;
  const u = 1e7;
  return s >= u && (o += Math.floor(s / u), s %= u), o >= u && (i += Math.floor(o / u), o %= u), i.toString() + gt(o) + gt(s);
}
function os(e, n) {
  return { lo: e >>> 0, hi: n >>> 0 };
}
function Bn(e, n) {
  return { lo: e | 0, hi: n | 0 };
}
function Sr(e, n) {
  return n = ~n, e ? e = ~e + 1 : n += 1, Bn(e, n);
}
const gt = (e) => {
  const n = String(e);
  return "0000000".slice(n.length) + n;
};
function On(e, n) {
  if (e >= 0) {
    for (; e > 127; )
      n.push(e & 127 | 128), e = e >>> 7;
    n.push(e);
  } else {
    for (let t = 0; t < 9; t++)
      n.push(e & 127 | 128), e = e >> 7;
    n.push(1);
  }
}
function is() {
  let e = this.buf[this.pos++], n = e & 127;
  if ((e & 128) == 0)
    return this.assertBounds(), n;
  if (e = this.buf[this.pos++], n |= (e & 127) << 7, (e & 128) == 0)
    return this.assertBounds(), n;
  if (e = this.buf[this.pos++], n |= (e & 127) << 14, (e & 128) == 0)
    return this.assertBounds(), n;
  if (e = this.buf[this.pos++], n |= (e & 127) << 21, (e & 128) == 0)
    return this.assertBounds(), n;
  e = this.buf[this.pos++], n |= (e & 15) << 28;
  for (let t = 5; (e & 128) !== 0 && t < 10; t++)
    e = this.buf[this.pos++];
  if ((e & 128) != 0)
    throw new Error("invalid varint");
  return this.assertBounds(), n >>> 0;
}
const N = /* @__PURE__ */ us();
function us() {
  const e = new DataView(new ArrayBuffer(8));
  if (typeof BigInt == "function" && typeof e.getBigInt64 == "function" && typeof e.getBigUint64 == "function" && typeof e.setBigInt64 == "function" && typeof e.setBigUint64 == "function" && (!!globalThis.Deno || typeof process != "object" || typeof process.env != "object" || process.env.BUF_BIGINT_DISABLE !== "1")) {
    const t = BigInt("-9223372036854775808"), r = BigInt("9223372036854775807"), a = BigInt("0"), s = BigInt("18446744073709551615");
    return {
      zero: BigInt(0),
      supported: !0,
      parse(o) {
        const i = typeof o == "bigint" ? o : BigInt(o);
        if (i > r || i < t)
          throw new Error(`invalid int64: ${o}`);
        return i;
      },
      uParse(o) {
        const i = typeof o == "bigint" ? o : BigInt(o);
        if (i > s || i < a)
          throw new Error(`invalid uint64: ${o}`);
        return i;
      },
      enc(o) {
        return e.setBigInt64(0, this.parse(o), !0), {
          lo: e.getInt32(0, !0),
          hi: e.getInt32(4, !0)
        };
      },
      uEnc(o) {
        return e.setBigInt64(0, this.uParse(o), !0), {
          lo: e.getInt32(0, !0),
          hi: e.getInt32(4, !0)
        };
      },
      dec(o, i) {
        return e.setInt32(0, o, !0), e.setInt32(4, i, !0), e.getBigInt64(0, !0);
      },
      uDec(o, i) {
        return e.setInt32(0, o, !0), e.setInt32(4, i, !0), e.getBigUint64(0, !0);
      }
    };
  }
  return {
    zero: "0",
    supported: !1,
    parse(t) {
      return typeof t != "string" && (t = t.toString()), yt(t), t;
    },
    uParse(t) {
      return typeof t != "string" && (t = t.toString()), Et(t), t;
    },
    enc(t) {
      return typeof t != "string" && (t = t.toString()), yt(t), ht(t);
    },
    uEnc(t) {
      return typeof t != "string" && (t = t.toString()), Et(t), ht(t);
    },
    dec(t, r) {
      return ss(t, r);
    },
    uDec(t, r) {
      return Tr(t, r);
    }
  };
}
function yt(e) {
  if (!/^-?[0-9]+$/.test(e))
    throw new Error("invalid int64: " + e);
}
function Et(e) {
  if (!/^[0-9]+$/.test(e))
    throw new Error("invalid uint64: " + e);
}
function oe(e, n) {
  switch (e) {
    case l.STRING:
      return "";
    case l.BOOL:
      return !1;
    case l.DOUBLE:
    case l.FLOAT:
      return 0;
    case l.INT64:
    case l.UINT64:
    case l.SFIXED64:
    case l.FIXED64:
    case l.SINT64:
      return n ? "0" : N.zero;
    case l.BYTES:
      return new Uint8Array(0);
    default:
      return 0;
  }
}
function cs(e, n) {
  switch (e) {
    case l.BOOL:
      return n === !1;
    case l.STRING:
      return n === "";
    case l.BYTES:
      return n instanceof Uint8Array && !n.byteLength;
    default:
      return n == 0;
  }
}
const Or = 2, J = /* @__PURE__ */ Symbol.for("reflect unsafe local");
function Ar(e, n) {
  const t = e[n.localName].case;
  return t === void 0 ? t : n.fields.find((r) => r.localName === t);
}
function ls(e, n) {
  const t = n.localName;
  if (n.oneof)
    return e[n.oneof.localName].case === t;
  if (n.presence != Or)
    return e[t] !== void 0 && Object.prototype.hasOwnProperty.call(e, t);
  switch (n.fieldKind) {
    case "list":
      return e[t].length > 0;
    case "map":
      return Object.keys(e[t]).length > 0;
    case "scalar":
      return !cs(n.scalar, e[t]);
    case "enum":
      return e[t] !== n.enum.values[0].number;
  }
  throw new Error("message field with implicit presence");
}
function we(e, n) {
  return Object.prototype.hasOwnProperty.call(e, n) && e[n] !== void 0;
}
function kr(e, n) {
  if (n.oneof) {
    const t = e[n.oneof.localName];
    return t.case === n.localName ? t.value : void 0;
  }
  return e[n.localName];
}
function Dr(e, n, t) {
  n.oneof ? e[n.oneof.localName] = {
    case: n.localName,
    value: t
  } : e[n.localName] = t;
}
function fs(e, n) {
  const t = n.localName;
  if (n.oneof) {
    const r = n.oneof.localName;
    e[r].case === t && (e[r] = { case: void 0 });
  } else if (n.presence != Or)
    delete e[t];
  else
    switch (n.fieldKind) {
      case "map":
        e[t] = {};
        break;
      case "list":
        e[t] = [];
        break;
      case "enum":
        e[t] = n.enum.values[0].number;
        break;
      case "scalar":
        e[t] = oe(n.scalar, n.longAsString);
        break;
    }
}
function Q(e) {
  return e !== null && typeof e == "object" && !Array.isArray(e);
}
function Gn(e, n) {
  var t, r, a, s;
  if (Q(e) && J in e && "add" in e && "field" in e && typeof e.field == "function") {
    if (n !== void 0) {
      const o = n, i = e.field();
      return o.listKind == i.listKind && o.scalar === i.scalar && ((t = o.message) === null || t === void 0 ? void 0 : t.typeName) === ((r = i.message) === null || r === void 0 ? void 0 : r.typeName) && ((a = o.enum) === null || a === void 0 ? void 0 : a.typeName) === ((s = i.enum) === null || s === void 0 ? void 0 : s.typeName);
    }
    return !0;
  }
  return !1;
}
function Cn(e, n) {
  var t, r, a, s;
  if (Q(e) && J in e && "has" in e && "field" in e && typeof e.field == "function") {
    if (n !== void 0) {
      const o = n, i = e.field();
      return o.mapKey === i.mapKey && o.mapKind == i.mapKind && o.scalar === i.scalar && ((t = o.message) === null || t === void 0 ? void 0 : t.typeName) === ((r = i.message) === null || r === void 0 ? void 0 : r.typeName) && ((a = o.enum) === null || a === void 0 ? void 0 : a.typeName) === ((s = i.enum) === null || s === void 0 ? void 0 : s.typeName);
    }
    return !0;
  }
  return !1;
}
function Kn(e, n) {
  return Q(e) && J in e && "desc" in e && Q(e.desc) && e.desc.kind === "message" && (n === void 0 || e.desc.typeName == n.typeName);
}
function ds(e) {
  return Lr(e.$typeName);
}
function Ue(e) {
  const n = e.fields[0];
  return Lr(e.typeName) && n !== void 0 && n.fieldKind == "scalar" && n.name == "value" && n.number == 1;
}
function Lr(e) {
  return e.startsWith("google.protobuf.") && [
    "DoubleValue",
    "FloatValue",
    "Int64Value",
    "UInt64Value",
    "Int32Value",
    "UInt32Value",
    "BoolValue",
    "StringValue",
    "BytesValue"
  ].includes(e.substring(16));
}
const ms = 999, bs = 998, je = 2;
function Y(e, n) {
  if (Mn(n, e))
    return n;
  const t = Es(e);
  return n !== void 0 && ps(e, t, n), t;
}
function ps(e, n, t) {
  for (const r of e.members) {
    let a = t[r.localName];
    if (a == null)
      continue;
    let s;
    if (r.kind == "oneof") {
      const o = Ar(t, r);
      if (!o)
        continue;
      s = o, a = kr(t, o);
    } else
      s = r;
    switch (s.fieldKind) {
      case "message":
        a = Jn(s, a);
        break;
      case "scalar":
        a = Rr(s, a);
        break;
      case "list":
        a = gs(s, a);
        break;
      case "map":
        a = hs(s, a);
        break;
    }
    Dr(n, s, a);
  }
  return n;
}
function Rr(e, n) {
  return e.scalar == l.BYTES ? Xn(n) : n;
}
function hs(e, n) {
  if (Q(n)) {
    if (e.scalar == l.BYTES)
      return Nt(n, Xn);
    if (e.mapKind == "message")
      return Nt(n, (t) => Jn(e, t));
  }
  return n;
}
function gs(e, n) {
  if (Array.isArray(n)) {
    if (e.scalar == l.BYTES)
      return n.map(Xn);
    if (e.listKind == "message")
      return n.map((t) => Jn(e, t));
  }
  return n;
}
function Jn(e, n) {
  if (e.fieldKind == "message" && !e.oneof && Ue(e.message))
    return Rr(e.message.fields[0], n);
  if (Q(n)) {
    if (e.message.typeName == "google.protobuf.Struct" && e.parent.typeName !== "google.protobuf.Value")
      return n;
    if (!Mn(n, e.message))
      return Y(e.message, n);
  }
  return n;
}
function Xn(e) {
  return Array.isArray(e) ? new Uint8Array(e) : e;
}
function Nt(e, n) {
  const t = {};
  for (const r of Object.entries(e))
    t[r[0]] = n(r[1]);
  return t;
}
const ys = /* @__PURE__ */ Symbol(), _t = /* @__PURE__ */ new WeakMap();
function Es(e) {
  let n;
  if (Ns(e)) {
    const t = _t.get(e);
    let r, a;
    if (t)
      ({ prototype: r, members: a } = t);
    else {
      r = {}, a = /* @__PURE__ */ new Set();
      for (const s of e.members)
        s.kind != "oneof" && (s.fieldKind != "scalar" && s.fieldKind != "enum" || s.presence != je && (a.add(s), r[s.localName] = gn(s)));
      _t.set(e, { prototype: r, members: a });
    }
    n = Object.create(r), n.$typeName = e.typeName;
    for (const s of e.members)
      a.has(s) || s.kind == "field" && (s.fieldKind == "message" || (s.fieldKind == "scalar" || s.fieldKind == "enum") && s.presence != je) || (n[s.localName] = gn(s));
  } else {
    n = {
      $typeName: e.typeName
    };
    for (const t of e.members)
      (t.kind == "oneof" || t.presence == je) && (n[t.localName] = gn(t));
  }
  return n;
}
function Ns(e) {
  switch (e.file.edition) {
    case ms:
      return !1;
    case bs:
      return !0;
    default:
      return e.fields.some((n) => n.presence != je && n.fieldKind != "message" && !n.oneof);
  }
}
function gn(e) {
  if (e.kind == "oneof")
    return { case: void 0 };
  if (e.fieldKind == "list")
    return [];
  if (e.fieldKind == "map")
    return {};
  if (e.fieldKind == "message")
    return ys;
  const n = e.getDefaultValue();
  return n !== void 0 ? e.fieldKind == "scalar" && e.longAsString ? n.toString() : n : e.fieldKind == "scalar" ? oe(e.scalar, e.longAsString) : e.enum.values[0].number;
}
const _s = [
  "FieldValueInvalidError",
  "FieldListRangeError",
  "ForeignFieldError"
];
class R extends Error {
  constructor(n, t, r = "FieldValueInvalidError") {
    super(t), this.name = r, this.field = () => n;
  }
}
function vs(e) {
  return e instanceof Error && _s.includes(e.name) && "field" in e && typeof e.field == "function";
}
const yn = /* @__PURE__ */ Symbol.for("@bufbuild/protobuf/text-encoding");
function jn() {
  if (globalThis[yn] == null) {
    const e = new globalThis.TextEncoder(), n = new globalThis.TextDecoder();
    globalThis[yn] = {
      encodeUtf8(t) {
        return e.encode(t);
      },
      decodeUtf8(t) {
        return n.decode(t);
      },
      checkUtf8(t) {
        try {
          return encodeURIComponent(t), !0;
        } catch {
          return !1;
        }
      }
    };
  }
  return globalThis[yn];
}
var v;
(function(e) {
  e[e.Varint = 0] = "Varint", e[e.Bit64 = 1] = "Bit64", e[e.LengthDelimited = 2] = "LengthDelimited", e[e.StartGroup = 3] = "StartGroup", e[e.EndGroup = 4] = "EndGroup", e[e.Bit32 = 5] = "Bit32";
})(v || (v = {}));
const Ur = 34028234663852886e22, xr = -34028234663852886e22, Fr = 4294967295, Pr = 2147483647, $r = -2147483648;
class Vr {
  constructor(n = jn().encodeUtf8) {
    this.encodeUtf8 = n, this.stack = [], this.chunks = [], this.buf = [];
  }
  /**
   * Return all bytes written and reset this writer.
   */
  finish() {
    this.buf.length && (this.chunks.push(new Uint8Array(this.buf)), this.buf = []);
    let n = 0;
    for (let a = 0; a < this.chunks.length; a++)
      n += this.chunks[a].length;
    let t = new Uint8Array(n), r = 0;
    for (let a = 0; a < this.chunks.length; a++)
      t.set(this.chunks[a], r), r += this.chunks[a].length;
    return this.chunks = [], t;
  }
  /**
   * Start a new fork for length-delimited data like a message
   * or a packed repeated field.
   *
   * Must be joined later with `join()`.
   */
  fork() {
    return this.stack.push({ chunks: this.chunks, buf: this.buf }), this.chunks = [], this.buf = [], this;
  }
  /**
   * Join the last fork. Write its length and bytes, then
   * return to the previous state.
   */
  join() {
    let n = this.finish(), t = this.stack.pop();
    if (!t)
      throw new Error("invalid state, fork stack empty");
    return this.chunks = t.chunks, this.buf = t.buf, this.uint32(n.byteLength), this.raw(n);
  }
  /**
   * Writes a tag (field number and wire type).
   *
   * Equivalent to `uint32( (fieldNo << 3 | type) >>> 0 )`.
   *
   * Generated code should compute the tag ahead of time and call `uint32()`.
   */
  tag(n, t) {
    return this.uint32((n << 3 | t) >>> 0);
  }
  /**
   * Write a chunk of raw bytes.
   */
  raw(n) {
    return this.buf.length && (this.chunks.push(new Uint8Array(this.buf)), this.buf = []), this.chunks.push(n), this;
  }
  /**
   * Write a `uint32` value, an unsigned 32 bit varint.
   */
  uint32(n) {
    for (vt(n); n > 127; )
      this.buf.push(n & 127 | 128), n = n >>> 7;
    return this.buf.push(n), this;
  }
  /**
   * Write a `int32` value, a signed 32 bit varint.
   */
  int32(n) {
    return En(n), On(n, this.buf), this;
  }
  /**
   * Write a `bool` value, a variant.
   */
  bool(n) {
    return this.buf.push(n ? 1 : 0), this;
  }
  /**
   * Write a `bytes` value, length-delimited arbitrary data.
   */
  bytes(n) {
    return this.uint32(n.byteLength), this.raw(n);
  }
  /**
   * Write a `string` value, length-delimited data converted to UTF-8 text.
   */
  string(n) {
    let t = this.encodeUtf8(n);
    return this.uint32(t.byteLength), this.raw(t);
  }
  /**
   * Write a `float` value, 32-bit floating point number.
   */
  float(n) {
    Is(n);
    let t = new Uint8Array(4);
    return new DataView(t.buffer).setFloat32(0, n, !0), this.raw(t);
  }
  /**
   * Write a `double` value, a 64-bit floating point number.
   */
  double(n) {
    let t = new Uint8Array(8);
    return new DataView(t.buffer).setFloat64(0, n, !0), this.raw(t);
  }
  /**
   * Write a `fixed32` value, an unsigned, fixed-length 32-bit integer.
   */
  fixed32(n) {
    vt(n);
    let t = new Uint8Array(4);
    return new DataView(t.buffer).setUint32(0, n, !0), this.raw(t);
  }
  /**
   * Write a `sfixed32` value, a signed, fixed-length 32-bit integer.
   */
  sfixed32(n) {
    En(n);
    let t = new Uint8Array(4);
    return new DataView(t.buffer).setInt32(0, n, !0), this.raw(t);
  }
  /**
   * Write a `sint32` value, a signed, zigzag-encoded 32-bit varint.
   */
  sint32(n) {
    return En(n), n = (n << 1 ^ n >> 31) >>> 0, On(n, this.buf), this;
  }
  /**
   * Write a `fixed64` value, a signed, fixed-length 64-bit integer.
   */
  sfixed64(n) {
    let t = new Uint8Array(8), r = new DataView(t.buffer), a = N.enc(n);
    return r.setInt32(0, a.lo, !0), r.setInt32(4, a.hi, !0), this.raw(t);
  }
  /**
   * Write a `fixed64` value, an unsigned, fixed-length 64 bit integer.
   */
  fixed64(n) {
    let t = new Uint8Array(8), r = new DataView(t.buffer), a = N.uEnc(n);
    return r.setInt32(0, a.lo, !0), r.setInt32(4, a.hi, !0), this.raw(t);
  }
  /**
   * Write a `int64` value, a signed 64-bit varint.
   */
  int64(n) {
    let t = N.enc(n);
    return hn(t.lo, t.hi, this.buf), this;
  }
  /**
   * Write a `sint64` value, a signed, zig-zag-encoded 64-bit varint.
   */
  sint64(n) {
    const t = N.enc(n), r = t.hi >> 31, a = t.lo << 1 ^ r, s = (t.hi << 1 | t.lo >>> 31) ^ r;
    return hn(a, s, this.buf), this;
  }
  /**
   * Write a `uint64` value, an unsigned 64-bit varint.
   */
  uint64(n) {
    const t = N.uEnc(n);
    return hn(t.lo, t.hi, this.buf), this;
  }
}
class Wn {
  constructor(n, t = jn().decodeUtf8) {
    this.decodeUtf8 = t, this.varint64 = as, this.uint32 = is, this.buf = n, this.len = n.length, this.pos = 0, this.view = new DataView(n.buffer, n.byteOffset, n.byteLength);
  }
  /**
   * Reads a tag - field number and wire type.
   */
  tag() {
    let n = this.uint32(), t = n >>> 3, r = n & 7;
    if (t <= 0 || r < 0 || r > 5)
      throw new Error("illegal tag: field no " + t + " wire type " + r);
    return [t, r];
  }
  /**
   * Skip one element and return the skipped data.
   *
   * When skipping StartGroup, provide the tags field number to check for
   * matching field number in the EndGroup tag.
   */
  skip(n, t) {
    let r = this.pos;
    switch (n) {
      case v.Varint:
        for (; this.buf[this.pos++] & 128; )
          ;
        break;
      // @ts-ignore TS7029: Fallthrough case in switch -- ignore instead of expect-error for compiler settings without noFallthroughCasesInSwitch: true
      case v.Bit64:
        this.pos += 4;
      case v.Bit32:
        this.pos += 4;
        break;
      case v.LengthDelimited:
        let a = this.uint32();
        this.pos += a;
        break;
      case v.StartGroup:
        for (; ; ) {
          const [s, o] = this.tag();
          if (o === v.EndGroup) {
            if (t !== void 0 && s !== t)
              throw new Error("invalid end group tag");
            break;
          }
          this.skip(o, s);
        }
        break;
      default:
        throw new Error("cant skip wire type " + n);
    }
    return this.assertBounds(), this.buf.subarray(r, this.pos);
  }
  /**
   * Throws error if position in byte array is out of range.
   */
  assertBounds() {
    if (this.pos > this.len)
      throw new RangeError("premature EOF");
  }
  /**
   * Read a `int32` field, a signed 32 bit varint.
   */
  int32() {
    return this.uint32() | 0;
  }
  /**
   * Read a `sint32` field, a signed, zigzag-encoded 32-bit varint.
   */
  sint32() {
    let n = this.uint32();
    return n >>> 1 ^ -(n & 1);
  }
  /**
   * Read a `int64` field, a signed 64-bit varint.
   */
  int64() {
    return N.dec(...this.varint64());
  }
  /**
   * Read a `uint64` field, an unsigned 64-bit varint.
   */
  uint64() {
    return N.uDec(...this.varint64());
  }
  /**
   * Read a `sint64` field, a signed, zig-zag-encoded 64-bit varint.
   */
  sint64() {
    let [n, t] = this.varint64(), r = -(n & 1);
    return n = (n >>> 1 | (t & 1) << 31) ^ r, t = t >>> 1 ^ r, N.dec(n, t);
  }
  /**
   * Read a `bool` field, a variant.
   */
  bool() {
    let [n, t] = this.varint64();
    return n !== 0 || t !== 0;
  }
  /**
   * Read a `fixed32` field, an unsigned, fixed-length 32-bit integer.
   */
  fixed32() {
    return this.view.getUint32((this.pos += 4) - 4, !0);
  }
  /**
   * Read a `sfixed32` field, a signed, fixed-length 32-bit integer.
   */
  sfixed32() {
    return this.view.getInt32((this.pos += 4) - 4, !0);
  }
  /**
   * Read a `fixed64` field, an unsigned, fixed-length 64 bit integer.
   */
  fixed64() {
    return N.uDec(this.sfixed32(), this.sfixed32());
  }
  /**
   * Read a `fixed64` field, a signed, fixed-length 64-bit integer.
   */
  sfixed64() {
    return N.dec(this.sfixed32(), this.sfixed32());
  }
  /**
   * Read a `float` field, 32-bit floating point number.
   */
  float() {
    return this.view.getFloat32((this.pos += 4) - 4, !0);
  }
  /**
   * Read a `double` field, a 64-bit floating point number.
   */
  double() {
    return this.view.getFloat64((this.pos += 8) - 8, !0);
  }
  /**
   * Read a `bytes` field, length-delimited arbitrary data.
   */
  bytes() {
    let n = this.uint32(), t = this.pos;
    return this.pos += n, this.assertBounds(), this.buf.subarray(t, t + n);
  }
  /**
   * Read a `string` field, length-delimited data converted to UTF-8 text.
   */
  string() {
    return this.decodeUtf8(this.bytes());
  }
}
function En(e) {
  if (typeof e == "string")
    e = Number(e);
  else if (typeof e != "number")
    throw new Error("invalid int32: " + typeof e);
  if (!Number.isInteger(e) || e > Pr || e < $r)
    throw new Error("invalid int32: " + e);
}
function vt(e) {
  if (typeof e == "string")
    e = Number(e);
  else if (typeof e != "number")
    throw new Error("invalid uint32: " + typeof e);
  if (!Number.isInteger(e) || e > Fr || e < 0)
    throw new Error("invalid uint32: " + e);
}
function Is(e) {
  if (typeof e == "string") {
    const n = e;
    if (e = Number(e), Number.isNaN(e) && n !== "NaN")
      throw new Error("invalid float32: " + n);
  } else if (typeof e != "number")
    throw new Error("invalid float32: " + typeof e);
  if (Number.isFinite(e) && (e > Ur || e < xr))
    throw new Error("invalid float32: " + e);
}
function ne(e, n) {
  const t = e.fieldKind == "list" ? Gn(n, e) : e.fieldKind == "map" ? Cn(n, e) : Zn(e, n);
  if (t === !0)
    return;
  let r;
  switch (e.fieldKind) {
    case "list":
      r = `expected ${Br(e)}, got ${T(n)}`;
      break;
    case "map":
      r = `expected ${Gr(e)}, got ${T(n)}`;
      break;
    default:
      r = We(e, n, t);
  }
  return new R(e, r);
}
function It(e, n, t) {
  const r = Zn(e, t);
  if (r !== !0)
    return new R(e, `list item #${n + 1}: ${We(e, t, r)}`);
}
function ws(e, n, t) {
  const r = Yr(n, e.mapKey);
  if (r !== !0)
    return new R(e, `invalid map key: ${We({ scalar: e.mapKey }, n, r)}`);
  const a = Zn(e, t);
  if (a !== !0)
    return new R(e, `map entry ${T(n)}: ${We(e, t, a)}`);
}
function Zn(e, n) {
  return e.scalar !== void 0 ? Yr(n, e.scalar) : e.enum !== void 0 ? e.enum.open ? Number.isInteger(n) : e.enum.values.some((t) => t.number === n) : Kn(n, e.message);
}
function Yr(e, n) {
  switch (n) {
    case l.DOUBLE:
      return typeof e == "number";
    case l.FLOAT:
      return typeof e != "number" ? !1 : Number.isNaN(e) || !Number.isFinite(e) ? !0 : e > Ur || e < xr ? `${e.toFixed()} out of range` : !0;
    case l.INT32:
    case l.SFIXED32:
    case l.SINT32:
      return typeof e != "number" || !Number.isInteger(e) ? !1 : e > Pr || e < $r ? `${e.toFixed()} out of range` : !0;
    case l.FIXED32:
    case l.UINT32:
      return typeof e != "number" || !Number.isInteger(e) ? !1 : e > Fr || e < 0 ? `${e.toFixed()} out of range` : !0;
    case l.BOOL:
      return typeof e == "boolean";
    case l.STRING:
      return typeof e != "string" ? !1 : jn().checkUtf8(e) || "invalid UTF8";
    case l.BYTES:
      return e instanceof Uint8Array;
    case l.INT64:
    case l.SFIXED64:
    case l.SINT64:
      if (typeof e == "bigint" || typeof e == "number" || typeof e == "string" && e.length > 0)
        try {
          return N.parse(e), !0;
        } catch {
          return `${e} out of range`;
        }
      return !1;
    case l.FIXED64:
    case l.UINT64:
      if (typeof e == "bigint" || typeof e == "number" || typeof e == "string" && e.length > 0)
        try {
          return N.uParse(e), !0;
        } catch {
          return `${e} out of range`;
        }
      return !1;
  }
}
function We(e, n, t) {
  return t = typeof t == "string" ? `: ${t}` : `, got ${T(n)}`, e.scalar !== void 0 ? `expected ${Ts(e.scalar)}` + t : e.enum !== void 0 ? `expected ${e.enum.toString()}` + t : `expected ${Mr(e.message)}` + t;
}
function T(e) {
  switch (typeof e) {
    case "object":
      return e === null ? "null" : e instanceof Uint8Array ? `Uint8Array(${e.length})` : Array.isArray(e) ? `Array(${e.length})` : Gn(e) ? Br(e.field()) : Cn(e) ? Gr(e.field()) : Kn(e) ? Mr(e.desc) : Mn(e) ? `message ${e.$typeName}` : "object";
    case "string":
      return e.length > 30 ? "string" : `"${e.split('"').join('\\"')}"`;
    case "boolean":
      return String(e);
    case "number":
      return String(e);
    case "bigint":
      return String(e) + "n";
    default:
      return typeof e;
  }
}
function Mr(e) {
  return `ReflectMessage (${e.typeName})`;
}
function Br(e) {
  switch (e.listKind) {
    case "message":
      return `ReflectList (${e.message.toString()})`;
    case "enum":
      return `ReflectList (${e.enum.toString()})`;
    case "scalar":
      return `ReflectList (${l[e.scalar]})`;
  }
}
function Gr(e) {
  switch (e.mapKind) {
    case "message":
      return `ReflectMap (${l[e.mapKey]}, ${e.message.toString()})`;
    case "enum":
      return `ReflectMap (${l[e.mapKey]}, ${e.enum.toString()})`;
    case "scalar":
      return `ReflectMap (${l[e.mapKey]}, ${l[e.scalar]})`;
  }
}
function Ts(e) {
  switch (e) {
    case l.STRING:
      return "string";
    case l.BOOL:
      return "boolean";
    case l.INT64:
    case l.SINT64:
    case l.SFIXED64:
      return "bigint (int64)";
    case l.UINT64:
    case l.FIXED64:
      return "bigint (uint64)";
    case l.BYTES:
      return "Uint8Array";
    case l.DOUBLE:
      return "number (float64)";
    case l.FLOAT:
      return "number (float32)";
    case l.FIXED32:
    case l.UINT32:
      return "number (uint32)";
    case l.INT32:
    case l.SFIXED32:
    case l.SINT32:
      return "number (int32)";
  }
}
function $(e, n, t = !0) {
  return new Cr(e, n, t);
}
const wt = /* @__PURE__ */ new WeakMap();
class Cr {
  get sortedFields() {
    const n = wt.get(this.desc);
    if (n)
      return n;
    const t = this.desc.fields.concat().sort((r, a) => r.number - a.number);
    return wt.set(this.desc, t), t;
  }
  constructor(n, t, r = !0) {
    this.lists = /* @__PURE__ */ new Map(), this.maps = /* @__PURE__ */ new Map(), this.check = r, this.desc = n, this.message = this[J] = t ?? Y(n), this.fields = n.fields, this.oneofs = n.oneofs, this.members = n.members;
  }
  findNumber(n) {
    return this._fieldsByNumber || (this._fieldsByNumber = new Map(this.desc.fields.map((t) => [t.number, t]))), this._fieldsByNumber.get(n);
  }
  oneofCase(n) {
    return _e(this.message, n), Ar(this.message, n);
  }
  isSet(n) {
    return _e(this.message, n), ls(this.message, n);
  }
  clear(n) {
    _e(this.message, n), fs(this.message, n);
  }
  get(n) {
    _e(this.message, n);
    const t = kr(this.message, n);
    switch (n.fieldKind) {
      case "list":
        let r = this.lists.get(n);
        return (!r || r[J] !== t) && this.lists.set(
          n,
          // biome-ignore lint/suspicious/noAssignInExpressions: no
          r = new Ss(n, t, this.check)
        ), r;
      case "map":
        let a = this.maps.get(n);
        return (!a || a[J] !== t) && this.maps.set(
          n,
          // biome-ignore lint/suspicious/noAssignInExpressions: no
          a = new Os(n, t, this.check)
        ), a;
      case "message":
        return zn(n, t, this.check);
      case "scalar":
        return t === void 0 ? oe(n.scalar, !1) : qn(n, t);
      case "enum":
        return t ?? n.enum.values[0].number;
    }
  }
  set(n, t) {
    if (_e(this.message, n), this.check) {
      const a = ne(n, t);
      if (a)
        throw a;
    }
    let r;
    n.fieldKind == "message" ? r = Hn(n, t) : Cn(t) || Gn(t) ? r = t[J] : r = Qn(n, t), Dr(this.message, n, r);
  }
  getUnknown() {
    return this.message.$unknown;
  }
  setUnknown(n) {
    this.message.$unknown = n;
  }
}
function _e(e, n) {
  if (n.parent.typeName !== e.$typeName)
    throw new R(n, `cannot use ${n.toString()} with message ${e.$typeName}`, "ForeignFieldError");
}
class Ss {
  field() {
    return this._field;
  }
  get size() {
    return this._arr.length;
  }
  constructor(n, t, r) {
    this._field = n, this._arr = this[J] = t, this.check = r;
  }
  get(n) {
    const t = this._arr[n];
    return t === void 0 ? void 0 : Nn(this._field, t, this.check);
  }
  set(n, t) {
    if (n < 0 || n >= this._arr.length)
      throw new R(this._field, `list item #${n + 1}: out of range`);
    if (this.check) {
      const r = It(this._field, n, t);
      if (r)
        throw r;
    }
    this._arr[n] = Tt(this._field, t);
  }
  add(n) {
    if (this.check) {
      const t = It(this._field, this._arr.length, n);
      if (t)
        throw t;
    }
    this._arr.push(Tt(this._field, n));
  }
  clear() {
    this._arr.splice(0, this._arr.length);
  }
  [Symbol.iterator]() {
    return this.values();
  }
  keys() {
    return this._arr.keys();
  }
  *values() {
    for (const n of this._arr)
      yield Nn(this._field, n, this.check);
  }
  *entries() {
    for (let n = 0; n < this._arr.length; n++)
      yield [n, Nn(this._field, this._arr[n], this.check)];
  }
}
class Os {
  constructor(n, t, r = !0) {
    this.obj = this[J] = t ?? {}, this.check = r, this._field = n;
  }
  field() {
    return this._field;
  }
  set(n, t) {
    if (this.check) {
      const r = ws(this._field, n, t);
      if (r)
        throw r;
    }
    return this.obj[Ge(n)] = As(this._field, t), this;
  }
  delete(n) {
    const t = Ge(n), r = Object.prototype.hasOwnProperty.call(this.obj, t);
    return r && delete this.obj[t], r;
  }
  clear() {
    for (const n of Object.keys(this.obj))
      delete this.obj[n];
  }
  get(n) {
    let t = this.obj[Ge(n)];
    return t !== void 0 && (t = _n(this._field, t, this.check)), t;
  }
  has(n) {
    return Object.prototype.hasOwnProperty.call(this.obj, Ge(n));
  }
  *keys() {
    for (const n of Object.keys(this.obj))
      yield St(n, this._field.mapKey);
  }
  *entries() {
    for (const n of Object.entries(this.obj))
      yield [
        St(n[0], this._field.mapKey),
        _n(this._field, n[1], this.check)
      ];
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  get size() {
    return Object.keys(this.obj).length;
  }
  *values() {
    for (const n of Object.values(this.obj))
      yield _n(this._field, n, this.check);
  }
  forEach(n, t) {
    for (const r of this.entries())
      n.call(t, r[1], r[0], this);
  }
}
function Hn(e, n) {
  return Kn(n) ? ds(n.message) && !e.oneof && e.fieldKind == "message" ? n.message.value : n.desc.typeName == "google.protobuf.Struct" && e.parent.typeName != "google.protobuf.Value" ? Jr(n.message) : n.message : n;
}
function zn(e, n, t) {
  return n !== void 0 && (Ue(e.message) && !e.oneof && e.fieldKind == "message" ? n = {
    $typeName: e.message.typeName,
    value: qn(e.message.fields[0], n)
  } : e.message.typeName == "google.protobuf.Struct" && e.parent.typeName != "google.protobuf.Value" && Q(n) && (n = Kr(n))), new Cr(e.message, n, t);
}
function Tt(e, n) {
  return e.listKind == "message" ? Hn(e, n) : Qn(e, n);
}
function Nn(e, n, t) {
  return e.listKind == "message" ? zn(e, n, t) : qn(e, n);
}
function As(e, n) {
  return e.mapKind == "message" ? Hn(e, n) : Qn(e, n);
}
function _n(e, n, t) {
  return e.mapKind == "message" ? zn(e, n, t) : n;
}
function Ge(e) {
  return typeof e == "string" || typeof e == "number" ? e : String(e);
}
function St(e, n) {
  switch (n) {
    case l.STRING:
      return e;
    case l.INT32:
    case l.FIXED32:
    case l.UINT32:
    case l.SFIXED32:
    case l.SINT32: {
      const t = Number.parseInt(e);
      if (Number.isFinite(t))
        return t;
      break;
    }
    case l.BOOL:
      switch (e) {
        case "true":
          return !0;
        case "false":
          return !1;
      }
      break;
    case l.UINT64:
    case l.FIXED64:
      try {
        return N.uParse(e);
      } catch {
      }
      break;
    default:
      try {
        return N.parse(e);
      } catch {
      }
      break;
  }
  return e;
}
function qn(e, n) {
  switch (e.scalar) {
    case l.INT64:
    case l.SFIXED64:
    case l.SINT64:
      "longAsString" in e && e.longAsString && typeof n == "string" && (n = N.parse(n));
      break;
    case l.FIXED64:
    case l.UINT64:
      "longAsString" in e && e.longAsString && typeof n == "string" && (n = N.uParse(n));
      break;
  }
  return n;
}
function Qn(e, n) {
  switch (e.scalar) {
    case l.INT64:
    case l.SFIXED64:
    case l.SINT64:
      "longAsString" in e && e.longAsString ? n = String(n) : (typeof n == "string" || typeof n == "number") && (n = N.parse(n));
      break;
    case l.FIXED64:
    case l.UINT64:
      "longAsString" in e && e.longAsString ? n = String(n) : (typeof n == "string" || typeof n == "number") && (n = N.uParse(n));
      break;
  }
  return n;
}
function Kr(e) {
  const n = {
    $typeName: "google.protobuf.Struct",
    fields: {}
  };
  if (Q(e))
    for (const [t, r] of Object.entries(e))
      n.fields[t] = jr(r);
  return n;
}
function Jr(e) {
  const n = {};
  for (const [t, r] of Object.entries(e.fields))
    n[t] = Xr(r);
  return n;
}
function Xr(e) {
  switch (e.kind.case) {
    case "structValue":
      return Jr(e.kind.value);
    case "listValue":
      return e.kind.value.values.map(Xr);
    case "nullValue":
    case void 0:
      return null;
    default:
      return e.kind.value;
  }
}
function jr(e) {
  const n = {
    $typeName: "google.protobuf.Value",
    kind: { case: void 0 }
  };
  switch (typeof e) {
    case "number":
      n.kind = { case: "numberValue", value: e };
      break;
    case "string":
      n.kind = { case: "stringValue", value: e };
      break;
    case "boolean":
      n.kind = { case: "boolValue", value: e };
      break;
    case "object":
      if (e === null)
        n.kind = { case: "nullValue", value: 0 };
      else if (Array.isArray(e)) {
        const t = {
          $typeName: "google.protobuf.ListValue",
          values: []
        };
        if (Array.isArray(e))
          for (const r of e)
            t.values.push(jr(r));
        n.kind = {
          case: "listValue",
          value: t
        };
      } else
        n.kind = {
          case: "structValue",
          value: Kr(e)
        };
      break;
  }
  return n;
}
function et(e) {
  const n = ks();
  let t = e.length * 3 / 4;
  e[e.length - 2] == "=" ? t -= 2 : e[e.length - 1] == "=" && (t -= 1);
  let r = new Uint8Array(t), a = 0, s = 0, o, i = 0;
  for (let u = 0; u < e.length; u++) {
    if (o = n[e.charCodeAt(u)], o === void 0)
      switch (e[u]) {
        // @ts-ignore TS7029: Fallthrough case in switch -- ignore instead of expect-error for compiler settings without noFallthroughCasesInSwitch: true
        case "=":
          s = 0;
        // reset state when padding found
        case `
`:
        case "\r":
        case "	":
        case " ":
          continue;
        // skip white-space, and padding
        default:
          throw Error("invalid base64 string");
      }
    switch (s) {
      case 0:
        i = o, s = 1;
        break;
      case 1:
        r[a++] = i << 2 | (o & 48) >> 4, i = o, s = 2;
        break;
      case 2:
        r[a++] = (i & 15) << 4 | (o & 60) >> 2, i = o, s = 3;
        break;
      case 3:
        r[a++] = (i & 3) << 6 | o, s = 0;
        break;
    }
  }
  if (s == 1)
    throw Error("invalid base64 string");
  return r.subarray(0, a);
}
function Wr(e, n = "std") {
  const t = Zr(n), r = n == "std";
  let a = "", s = 0, o, i = 0;
  for (let u = 0; u < e.length; u++)
    switch (o = e[u], s) {
      case 0:
        a += t[o >> 2], i = (o & 3) << 4, s = 1;
        break;
      case 1:
        a += t[i | o >> 4], i = (o & 15) << 2, s = 2;
        break;
      case 2:
        a += t[i | o >> 6], a += t[o & 63], s = 0;
        break;
    }
  return s && (a += t[i], r && (a += "=", s == 1 && (a += "="))), a;
}
let Ce, Ot, ce;
function Zr(e) {
  return Ce || (Ce = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""), Ot = Ce.slice(0, -2).concat("-", "_")), e == "url" ? (
    // biome-ignore lint/style/noNonNullAssertion: TS fails to narrow down
    Ot
  ) : Ce;
}
function ks() {
  if (!ce) {
    ce = [];
    const e = Zr("std");
    for (let n = 0; n < e.length; n++)
      ce[e[n].charCodeAt(0)] = n;
    ce[45] = e.indexOf("+"), ce[95] = e.indexOf("/");
  }
  return ce;
}
function Te(e) {
  let n = !1;
  const t = [];
  for (let r = 0; r < e.length; r++) {
    let a = e.charAt(r);
    switch (a) {
      case "_":
        n = !0;
        break;
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        t.push(a), n = !1;
        break;
      default:
        n && (n = !1, a = a.toUpperCase()), t.push(a);
        break;
    }
  }
  return t.join("");
}
const Ds = /* @__PURE__ */ new Set([
  // names reserved by JavaScript
  "constructor",
  "toString",
  "toJSON",
  "valueOf"
]);
function Se(e) {
  return Ds.has(e) ? e + "$" : e;
}
function nt(e) {
  for (const n of e.field)
    we(n, "jsonName") || (n.jsonName = Te(n.name));
  e.nestedType.forEach(nt);
}
function Ls(e, n) {
  const t = e.values.find((r) => r.name === n);
  if (!t)
    throw new Error(`cannot parse ${e} default value: ${n}`);
  return t.number;
}
function Rs(e, n) {
  switch (e) {
    case l.STRING:
      return n;
    case l.BYTES: {
      const t = Us(n);
      if (t === !1)
        throw new Error(`cannot parse ${l[e]} default value: ${n}`);
      return t;
    }
    case l.INT64:
    case l.SFIXED64:
    case l.SINT64:
      return N.parse(n);
    case l.UINT64:
    case l.FIXED64:
      return N.uParse(n);
    case l.DOUBLE:
    case l.FLOAT:
      switch (n) {
        case "inf":
          return Number.POSITIVE_INFINITY;
        case "-inf":
          return Number.NEGATIVE_INFINITY;
        case "nan":
          return Number.NaN;
        default:
          return parseFloat(n);
      }
    case l.BOOL:
      return n === "true";
    case l.INT32:
    case l.UINT32:
    case l.SINT32:
    case l.FIXED32:
    case l.SFIXED32:
      return parseInt(n, 10);
  }
}
function Us(e) {
  const n = [], t = {
    tail: e,
    c: "",
    next() {
      return this.tail.length == 0 ? !1 : (this.c = this.tail[0], this.tail = this.tail.substring(1), !0);
    },
    take(r) {
      if (this.tail.length >= r) {
        const a = this.tail.substring(0, r);
        return this.tail = this.tail.substring(r), a;
      }
      return !1;
    }
  };
  for (; t.next(); )
    switch (t.c) {
      case "\\":
        if (t.next())
          switch (t.c) {
            case "\\":
              n.push(t.c.charCodeAt(0));
              break;
            case "b":
              n.push(8);
              break;
            case "f":
              n.push(12);
              break;
            case "n":
              n.push(10);
              break;
            case "r":
              n.push(13);
              break;
            case "t":
              n.push(9);
              break;
            case "v":
              n.push(11);
              break;
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7": {
              const r = t.c, a = t.take(2);
              if (a === !1)
                return !1;
              const s = parseInt(r + a, 8);
              if (Number.isNaN(s))
                return !1;
              n.push(s);
              break;
            }
            case "x": {
              const r = t.c, a = t.take(2);
              if (a === !1)
                return !1;
              const s = parseInt(r + a, 16);
              if (Number.isNaN(s))
                return !1;
              n.push(s);
              break;
            }
            case "u": {
              const r = t.c, a = t.take(4);
              if (a === !1)
                return !1;
              const s = parseInt(r + a, 16);
              if (Number.isNaN(s))
                return !1;
              const o = new Uint8Array(4);
              new DataView(o.buffer).setInt32(0, s, !0), n.push(o[0], o[1], o[2], o[3]);
              break;
            }
            case "U": {
              const r = t.c, a = t.take(8);
              if (a === !1)
                return !1;
              const s = N.uEnc(r + a), o = new Uint8Array(8), i = new DataView(o.buffer);
              i.setInt32(0, s.lo, !0), i.setInt32(4, s.hi, !0), n.push(o[0], o[1], o[2], o[3], o[4], o[5], o[6], o[7]);
              break;
            }
          }
        break;
      default:
        n.push(t.c.charCodeAt(0));
    }
  return new Uint8Array(n);
}
function* An(e) {
  switch (e.kind) {
    case "file":
      for (const n of e.messages)
        yield n, yield* An(n);
      yield* e.enums, yield* e.services, yield* e.extensions;
      break;
    case "message":
      for (const n of e.nestedMessages)
        yield n, yield* An(n);
      yield* e.nestedEnums, yield* e.nestedExtensions;
      break;
  }
}
function Hr(...e) {
  const n = xs();
  if (!e.length)
    return n;
  if ("$typeName" in e[0] && e[0].$typeName == "google.protobuf.FileDescriptorSet") {
    for (const t of e[0].file)
      Lt(t, n);
    return n;
  }
  if ("$typeName" in e[0]) {
    let s = function(o) {
      const i = [];
      for (const u of o.dependency) {
        if (n.getFile(u) != null || a.has(u))
          continue;
        const c = r(u);
        if (!c)
          throw new Error(`Unable to resolve ${u}, imported by ${o.name}`);
        "kind" in c ? n.addFile(c, !1, !0) : (a.add(c.name), i.push(c));
      }
      return i.concat(...i.map(s));
    };
    const t = e[0], r = e[1], a = /* @__PURE__ */ new Set();
    for (const o of [t, ...s(t)].reverse())
      Lt(o, n);
  } else
    for (const t of e)
      for (const r of t.files)
        n.addFile(r);
  return n;
}
function xs() {
  const e = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map();
  return {
    kind: "registry",
    types: e,
    extendees: n,
    [Symbol.iterator]() {
      return e.values();
    },
    get files() {
      return t.values();
    },
    addFile(r, a, s) {
      if (t.set(r.proto.name, r), !a)
        for (const o of An(r))
          this.add(o);
      if (s)
        for (const o of r.dependencies)
          this.addFile(o, a, s);
    },
    add(r) {
      if (r.kind == "extension") {
        let a = n.get(r.extendee.typeName);
        a || n.set(
          r.extendee.typeName,
          // biome-ignore lint/suspicious/noAssignInExpressions: no
          a = /* @__PURE__ */ new Map()
        ), a.set(r.number, r);
      }
      e.set(r.typeName, r);
    },
    get(r) {
      return e.get(r);
    },
    getFile(r) {
      return t.get(r);
    },
    getMessage(r) {
      const a = e.get(r);
      return a?.kind == "message" ? a : void 0;
    },
    getEnum(r) {
      const a = e.get(r);
      return a?.kind == "enum" ? a : void 0;
    },
    getExtension(r) {
      const a = e.get(r);
      return a?.kind == "extension" ? a : void 0;
    },
    getExtensionFor(r, a) {
      var s;
      return (s = n.get(r.typeName)) === null || s === void 0 ? void 0 : s.get(a);
    },
    getService(r) {
      const a = e.get(r);
      return a?.kind == "service" ? a : void 0;
    }
  };
}
const Fs = 998, Ps = 999, $s = 9, Oe = 10, Ie = 11, Vs = 12, At = 14, tt = 3, Ys = 2, kt = 1, Ms = 0, vn = 1, Dt = 2, Bs = 3, Gs = 1, Cs = 2, Ks = 1, zr = {
  // EDITION_PROTO2
  998: {
    fieldPresence: 1,
    // EXPLICIT,
    enumType: 2,
    // CLOSED,
    repeatedFieldEncoding: 2,
    // EXPANDED,
    utf8Validation: 3,
    // NONE,
    messageEncoding: 1,
    // LENGTH_PREFIXED,
    jsonFormat: 2,
    // LEGACY_BEST_EFFORT,
    enforceNamingStyle: 2,
    // STYLE_LEGACY,
    defaultSymbolVisibility: 1
    // EXPORT_ALL,
  },
  // EDITION_PROTO3
  999: {
    fieldPresence: 2,
    // IMPLICIT,
    enumType: 1,
    // OPEN,
    repeatedFieldEncoding: 1,
    // PACKED,
    utf8Validation: 2,
    // VERIFY,
    messageEncoding: 1,
    // LENGTH_PREFIXED,
    jsonFormat: 1,
    // ALLOW,
    enforceNamingStyle: 2,
    // STYLE_LEGACY,
    defaultSymbolVisibility: 1
    // EXPORT_ALL,
  },
  // EDITION_2023
  1e3: {
    fieldPresence: 1,
    // EXPLICIT,
    enumType: 1,
    // OPEN,
    repeatedFieldEncoding: 1,
    // PACKED,
    utf8Validation: 2,
    // VERIFY,
    messageEncoding: 1,
    // LENGTH_PREFIXED,
    jsonFormat: 1,
    // ALLOW,
    enforceNamingStyle: 2,
    // STYLE_LEGACY,
    defaultSymbolVisibility: 1
    // EXPORT_ALL,
  },
  // EDITION_2024
  1001: {
    fieldPresence: 1,
    // EXPLICIT,
    enumType: 1,
    // OPEN,
    repeatedFieldEncoding: 1,
    // PACKED,
    utf8Validation: 2,
    // VERIFY,
    messageEncoding: 1,
    // LENGTH_PREFIXED,
    jsonFormat: 1,
    // ALLOW,
    enforceNamingStyle: 1,
    // STYLE2024,
    defaultSymbolVisibility: 2
    // EXPORT_TOP_LEVEL,
  }
};
function Lt(e, n) {
  var t, r;
  const a = {
    kind: "file",
    proto: e,
    deprecated: (r = (t = e.options) === null || t === void 0 ? void 0 : t.deprecated) !== null && r !== void 0 ? r : !1,
    edition: Ws(e),
    name: e.name.replace(/\.proto$/, ""),
    dependencies: Zs(e, n),
    enums: [],
    messages: [],
    extensions: [],
    services: [],
    toString() {
      return `file ${e.name}`;
    }
  }, s = /* @__PURE__ */ new Map(), o = {
    get(i) {
      return s.get(i);
    },
    add(i) {
      var u;
      V(((u = i.proto.options) === null || u === void 0 ? void 0 : u.mapEntry) === !0), s.set(i.typeName, i);
    }
  };
  for (const i of e.enumType)
    qr(i, a, void 0, n);
  for (const i of e.messageType)
    Qr(i, a, void 0, n, o);
  for (const i of e.service)
    Js(i, a, n);
  kn(a, n);
  for (const i of s.values())
    Dn(i, n, o);
  for (const i of a.messages)
    Dn(i, n, o), kn(i, n);
  n.addFile(a, !0);
}
function kn(e, n) {
  switch (e.kind) {
    case "file":
      for (const t of e.proto.extension) {
        const r = Ln(t, e, n);
        e.extensions.push(r), n.add(r);
      }
      break;
    case "message":
      for (const t of e.proto.extension) {
        const r = Ln(t, e, n);
        e.nestedExtensions.push(r), n.add(r);
      }
      for (const t of e.nestedMessages)
        kn(t, n);
      break;
  }
}
function Dn(e, n, t) {
  const r = e.proto.oneofDecl.map((s) => js(s, e)), a = /* @__PURE__ */ new Set();
  for (const s of e.proto.field) {
    const o = qs(s, r), i = Ln(s, e, n, o, t);
    e.fields.push(i), e.field[i.localName] = i, o === void 0 ? e.members.push(i) : (o.fields.push(i), a.has(o) || (a.add(o), e.members.push(o)));
  }
  for (const s of r.filter((o) => a.has(o)))
    e.oneofs.push(s);
  for (const s of e.nestedMessages)
    Dn(s, n, t);
}
function qr(e, n, t, r) {
  var a, s, o, i, u;
  const c = Hs(e.name, e.value), d = {
    kind: "enum",
    proto: e,
    deprecated: (s = (a = e.options) === null || a === void 0 ? void 0 : a.deprecated) !== null && s !== void 0 ? s : !1,
    file: n,
    parent: t,
    open: !0,
    name: e.name,
    typeName: an(e, t, n),
    value: {},
    values: [],
    sharedPrefix: c,
    toString() {
      return `enum ${this.typeName}`;
    }
  };
  d.open = to(d), r.add(d);
  for (const m of e.value) {
    const b = m.name;
    d.values.push(
      // biome-ignore lint/suspicious/noAssignInExpressions: no
      d.value[m.number] = {
        kind: "enum_value",
        proto: m,
        deprecated: (i = (o = m.options) === null || o === void 0 ? void 0 : o.deprecated) !== null && i !== void 0 ? i : !1,
        parent: d,
        name: b,
        localName: Se(c == null ? b : b.substring(c.length)),
        number: m.number,
        toString() {
          return `enum value ${d.typeName}.${b}`;
        }
      }
    );
  }
  ((u = t?.nestedEnums) !== null && u !== void 0 ? u : n.enums).push(d);
}
function Qr(e, n, t, r, a) {
  var s, o, i, u;
  const c = {
    kind: "message",
    proto: e,
    deprecated: (o = (s = e.options) === null || s === void 0 ? void 0 : s.deprecated) !== null && o !== void 0 ? o : !1,
    file: n,
    parent: t,
    name: e.name,
    typeName: an(e, t, n),
    fields: [],
    field: {},
    oneofs: [],
    members: [],
    nestedEnums: [],
    nestedMessages: [],
    nestedExtensions: [],
    toString() {
      return `message ${this.typeName}`;
    }
  };
  ((i = e.options) === null || i === void 0 ? void 0 : i.mapEntry) === !0 ? a.add(c) : (((u = t?.nestedMessages) !== null && u !== void 0 ? u : n.messages).push(c), r.add(c));
  for (const d of e.enumType)
    qr(d, n, c, r);
  for (const d of e.nestedType)
    Qr(d, n, c, r, a);
}
function Js(e, n, t) {
  var r, a;
  const s = {
    kind: "service",
    proto: e,
    deprecated: (a = (r = e.options) === null || r === void 0 ? void 0 : r.deprecated) !== null && a !== void 0 ? a : !1,
    file: n,
    name: e.name,
    typeName: an(e, void 0, n),
    methods: [],
    method: {},
    toString() {
      return `service ${this.typeName}`;
    }
  };
  n.services.push(s), t.add(s);
  for (const o of e.method) {
    const i = Xs(o, s, t);
    s.methods.push(i), s.method[i.localName] = i;
  }
}
function Xs(e, n, t) {
  var r, a, s, o;
  let i;
  e.clientStreaming && e.serverStreaming ? i = "bidi_streaming" : e.clientStreaming ? i = "client_streaming" : e.serverStreaming ? i = "server_streaming" : i = "unary";
  const u = t.getMessage(C(e.inputType)), c = t.getMessage(C(e.outputType));
  V(u, `invalid MethodDescriptorProto: input_type ${e.inputType} not found`), V(c, `invalid MethodDescriptorProto: output_type ${e.inputType} not found`);
  const d = e.name;
  return {
    kind: "rpc",
    proto: e,
    deprecated: (a = (r = e.options) === null || r === void 0 ? void 0 : r.deprecated) !== null && a !== void 0 ? a : !1,
    parent: n,
    name: d,
    localName: Se(d.length ? Se(d[0].toLowerCase() + d.substring(1)) : d),
    methodKind: i,
    input: u,
    output: c,
    idempotency: (o = (s = e.options) === null || s === void 0 ? void 0 : s.idempotencyLevel) !== null && o !== void 0 ? o : Ms,
    toString() {
      return `rpc ${n.typeName}.${d}`;
    }
  };
}
function js(e, n) {
  return {
    kind: "oneof",
    proto: e,
    deprecated: !1,
    parent: n,
    fields: [],
    name: e.name,
    localName: Se(Te(e.name)),
    toString() {
      return `oneof ${n.typeName}.${this.name}`;
    }
  };
}
function Ln(e, n, t, r, a) {
  var s, o, i;
  const u = a === void 0, c = {
    kind: "field",
    proto: e,
    deprecated: (o = (s = e.options) === null || s === void 0 ? void 0 : s.deprecated) !== null && o !== void 0 ? o : !1,
    name: e.name,
    number: e.number,
    scalar: void 0,
    message: void 0,
    enum: void 0,
    presence: Qs(e, r, u, n),
    listKind: void 0,
    mapKind: void 0,
    mapKey: void 0,
    delimitedEncoding: void 0,
    packed: void 0,
    longAsString: !1,
    getDefaultValue: void 0
  };
  if (u) {
    const f = n.kind == "file" ? n : n.file, p = n.kind == "file" ? void 0 : n, h = an(e, p, f);
    c.kind = "extension", c.file = f, c.parent = p, c.oneof = void 0, c.typeName = h, c.jsonName = `[${h}]`, c.toString = () => `extension ${h}`;
    const g = t.getMessage(C(e.extendee));
    V(g, `invalid FieldDescriptorProto: extendee ${e.extendee} not found`), c.extendee = g;
  } else {
    const f = n;
    V(f.kind == "message"), c.parent = f, c.oneof = r, c.localName = r ? Te(e.name) : Se(Te(e.name)), c.jsonName = e.jsonName, c.toString = () => `field ${f.typeName}.${e.name}`;
  }
  const d = e.label, m = e.type, b = (i = e.options) === null || i === void 0 ? void 0 : i.jstype;
  if (d === tt) {
    const f = m == Ie ? a?.get(C(e.typeName)) : void 0;
    if (f) {
      c.fieldKind = "map";
      const { key: p, value: h } = no(f);
      return c.mapKey = p.scalar, c.mapKind = h.fieldKind, c.message = h.message, c.delimitedEncoding = !1, c.enum = h.enum, c.scalar = h.scalar, c;
    }
    switch (c.fieldKind = "list", m) {
      case Ie:
      case Oe:
        c.listKind = "message", c.message = t.getMessage(C(e.typeName)), V(c.message), c.delimitedEncoding = Rt(e, n);
        break;
      case At:
        c.listKind = "enum", c.enum = t.getEnum(C(e.typeName)), V(c.enum);
        break;
      default:
        c.listKind = "scalar", c.scalar = m, c.longAsString = b == kt;
        break;
    }
    return c.packed = eo(e, n), c;
  }
  switch (m) {
    case Ie:
    case Oe:
      c.fieldKind = "message", c.message = t.getMessage(C(e.typeName)), V(c.message, `invalid FieldDescriptorProto: type_name ${e.typeName} not found`), c.delimitedEncoding = Rt(e, n), c.getDefaultValue = () => {
      };
      break;
    case At: {
      const f = t.getEnum(C(e.typeName));
      V(f !== void 0, `invalid FieldDescriptorProto: type_name ${e.typeName} not found`), c.fieldKind = "enum", c.enum = t.getEnum(C(e.typeName)), c.getDefaultValue = () => we(e, "defaultValue") ? Ls(f, e.defaultValue) : void 0;
      break;
    }
    default: {
      c.fieldKind = "scalar", c.scalar = m, c.longAsString = b == kt, c.getDefaultValue = () => we(e, "defaultValue") ? Rs(m, e.defaultValue) : void 0;
      break;
    }
  }
  return c;
}
function Ws(e) {
  switch (e.syntax) {
    case "":
    case "proto2":
      return Fs;
    case "proto3":
      return Ps;
    case "editions":
      if (e.edition in zr)
        return e.edition;
      throw new Error(`${e.name}: unsupported edition`);
    default:
      throw new Error(`${e.name}: unsupported syntax "${e.syntax}"`);
  }
}
function Zs(e, n) {
  return e.dependency.map((t) => {
    const r = n.getFile(t);
    if (!r)
      throw new Error(`Cannot find ${t}, imported by ${e.name}`);
    return r;
  });
}
function Hs(e, n) {
  const t = zs(e) + "_";
  for (const r of n) {
    if (!r.name.toLowerCase().startsWith(t))
      return;
    const a = r.name.substring(t.length);
    if (a.length == 0 || /^\d/.test(a))
      return;
  }
  return t;
}
function zs(e) {
  return (e.substring(0, 1) + e.substring(1).replace(/[A-Z]/g, (n) => "_" + n)).toLowerCase();
}
function an(e, n, t) {
  let r;
  return n ? r = `${n.typeName}.${e.name}` : t.proto.package.length > 0 ? r = `${t.proto.package}.${e.name}` : r = `${e.name}`, r;
}
function C(e) {
  return e.startsWith(".") ? e.substring(1) : e;
}
function qs(e, n) {
  if (!we(e, "oneofIndex") || e.proto3Optional)
    return;
  const t = n[e.oneofIndex];
  return V(t, `invalid FieldDescriptorProto: oneof #${e.oneofIndex} for field #${e.number} not found`), t;
}
function Qs(e, n, t, r) {
  if (e.label == Ys)
    return Bs;
  if (e.label == tt)
    return Dt;
  if (n || e.proto3Optional || t)
    return vn;
  const a = be("fieldPresence", { proto: e, parent: r });
  return a == Dt && (e.type == Ie || e.type == Oe) ? vn : a;
}
function eo(e, n) {
  if (e.label != tt)
    return !1;
  switch (e.type) {
    case $s:
    case Vs:
    case Oe:
    case Ie:
      return !1;
  }
  const t = e.options;
  return t && we(t, "packed") ? t.packed : Gs == be("repeatedFieldEncoding", {
    proto: e,
    parent: n
  });
}
function no(e) {
  const n = e.fields.find((r) => r.number === 1), t = e.fields.find((r) => r.number === 2);
  return V(n && n.fieldKind == "scalar" && n.scalar != l.BYTES && n.scalar != l.FLOAT && n.scalar != l.DOUBLE && t && t.fieldKind != "list" && t.fieldKind != "map"), { key: n, value: t };
}
function to(e) {
  var n;
  return Ks == be("enumType", {
    proto: e.proto,
    parent: (n = e.parent) !== null && n !== void 0 ? n : e.file
  });
}
function Rt(e, n) {
  return e.type == Oe ? !0 : Cs == be("messageEncoding", {
    proto: e,
    parent: n
  });
}
function be(e, n) {
  var t, r;
  const a = (t = n.proto.options) === null || t === void 0 ? void 0 : t.features;
  if (a) {
    const s = a[e];
    if (s != 0)
      return s;
  }
  if ("kind" in n) {
    if (n.kind == "message")
      return be(e, (r = n.parent) !== null && r !== void 0 ? r : n.file);
    const s = zr[n.edition];
    if (!s)
      throw new Error(`feature default for edition ${n.edition} not found`);
    return s[e];
  }
  return be(e, n.parent);
}
function V(e, n) {
  if (!e)
    throw new Error(n);
}
function ro(e) {
  const n = ao(e);
  return n.messageType.forEach(nt), Hr(n, () => {
  }).getFile(n.name);
}
function ao(e) {
  return Object.assign(/* @__PURE__ */ Object.create({
    syntax: "",
    edition: 0
  }), Object.assign(Object.assign({ $typeName: "google.protobuf.FileDescriptorProto", dependency: [], publicDependency: [], weakDependency: [], optionDependency: [], service: [], extension: [] }, e), { messageType: e.messageType.map(ea), enumType: e.enumType.map(na) }));
}
function ea(e) {
  var n, t, r, a, s, o, i, u;
  return Object.assign(/* @__PURE__ */ Object.create({
    visibility: 0
  }), {
    $typeName: "google.protobuf.DescriptorProto",
    name: e.name,
    field: (t = (n = e.field) === null || n === void 0 ? void 0 : n.map(so)) !== null && t !== void 0 ? t : [],
    extension: [],
    nestedType: (a = (r = e.nestedType) === null || r === void 0 ? void 0 : r.map(ea)) !== null && a !== void 0 ? a : [],
    enumType: (o = (s = e.enumType) === null || s === void 0 ? void 0 : s.map(na)) !== null && o !== void 0 ? o : [],
    extensionRange: (u = (i = e.extensionRange) === null || i === void 0 ? void 0 : i.map((d) => Object.assign({ $typeName: "google.protobuf.DescriptorProto.ExtensionRange" }, d))) !== null && u !== void 0 ? u : [],
    oneofDecl: [],
    reservedRange: [],
    reservedName: []
  });
}
function so(e) {
  return Object.assign(/* @__PURE__ */ Object.create({
    label: 1,
    typeName: "",
    extendee: "",
    defaultValue: "",
    oneofIndex: 0,
    jsonName: "",
    proto3Optional: !1
  }), Object.assign(Object.assign({ $typeName: "google.protobuf.FieldDescriptorProto" }, e), { options: e.options ? oo(e.options) : void 0 }));
}
function oo(e) {
  var n, t, r;
  return Object.assign(/* @__PURE__ */ Object.create({
    ctype: 0,
    packed: !1,
    jstype: 0,
    lazy: !1,
    unverifiedLazy: !1,
    deprecated: !1,
    weak: !1,
    debugRedact: !1,
    retention: 0
  }), Object.assign(Object.assign({ $typeName: "google.protobuf.FieldOptions" }, e), { targets: (n = e.targets) !== null && n !== void 0 ? n : [], editionDefaults: (r = (t = e.editionDefaults) === null || t === void 0 ? void 0 : t.map((s) => Object.assign({ $typeName: "google.protobuf.FieldOptions.EditionDefault" }, s))) !== null && r !== void 0 ? r : [], uninterpretedOption: [] }));
}
function na(e) {
  return Object.assign(/* @__PURE__ */ Object.create({
    visibility: 0
  }), {
    $typeName: "google.protobuf.EnumDescriptorProto",
    name: e.name,
    reservedName: [],
    reservedRange: [],
    value: e.value.map((t) => Object.assign({ $typeName: "google.protobuf.EnumValueDescriptorProto" }, t))
  });
}
function xe(e, n, ...t) {
  return t.reduce((r, a) => r.nestedMessages[a], e.messages[n]);
}
const io = /* @__PURE__ */ ro({ name: "google/protobuf/descriptor.proto", package: "google.protobuf", messageType: [{ name: "FileDescriptorSet", field: [{ name: "file", number: 1, type: 11, label: 3, typeName: ".google.protobuf.FileDescriptorProto" }], extensionRange: [{ start: 536e6, end: 536000001 }] }, { name: "FileDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "package", number: 2, type: 9, label: 1 }, { name: "dependency", number: 3, type: 9, label: 3 }, { name: "public_dependency", number: 10, type: 5, label: 3 }, { name: "weak_dependency", number: 11, type: 5, label: 3 }, { name: "option_dependency", number: 15, type: 9, label: 3 }, { name: "message_type", number: 4, type: 11, label: 3, typeName: ".google.protobuf.DescriptorProto" }, { name: "enum_type", number: 5, type: 11, label: 3, typeName: ".google.protobuf.EnumDescriptorProto" }, { name: "service", number: 6, type: 11, label: 3, typeName: ".google.protobuf.ServiceDescriptorProto" }, { name: "extension", number: 7, type: 11, label: 3, typeName: ".google.protobuf.FieldDescriptorProto" }, { name: "options", number: 8, type: 11, label: 1, typeName: ".google.protobuf.FileOptions" }, { name: "source_code_info", number: 9, type: 11, label: 1, typeName: ".google.protobuf.SourceCodeInfo" }, { name: "syntax", number: 12, type: 9, label: 1 }, { name: "edition", number: 14, type: 14, label: 1, typeName: ".google.protobuf.Edition" }] }, { name: "DescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "field", number: 2, type: 11, label: 3, typeName: ".google.protobuf.FieldDescriptorProto" }, { name: "extension", number: 6, type: 11, label: 3, typeName: ".google.protobuf.FieldDescriptorProto" }, { name: "nested_type", number: 3, type: 11, label: 3, typeName: ".google.protobuf.DescriptorProto" }, { name: "enum_type", number: 4, type: 11, label: 3, typeName: ".google.protobuf.EnumDescriptorProto" }, { name: "extension_range", number: 5, type: 11, label: 3, typeName: ".google.protobuf.DescriptorProto.ExtensionRange" }, { name: "oneof_decl", number: 8, type: 11, label: 3, typeName: ".google.protobuf.OneofDescriptorProto" }, { name: "options", number: 7, type: 11, label: 1, typeName: ".google.protobuf.MessageOptions" }, { name: "reserved_range", number: 9, type: 11, label: 3, typeName: ".google.protobuf.DescriptorProto.ReservedRange" }, { name: "reserved_name", number: 10, type: 9, label: 3 }, { name: "visibility", number: 11, type: 14, label: 1, typeName: ".google.protobuf.SymbolVisibility" }], nestedType: [{ name: "ExtensionRange", field: [{ name: "start", number: 1, type: 5, label: 1 }, { name: "end", number: 2, type: 5, label: 1 }, { name: "options", number: 3, type: 11, label: 1, typeName: ".google.protobuf.ExtensionRangeOptions" }] }, { name: "ReservedRange", field: [{ name: "start", number: 1, type: 5, label: 1 }, { name: "end", number: 2, type: 5, label: 1 }] }] }, { name: "ExtensionRangeOptions", field: [{ name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }, { name: "declaration", number: 2, type: 11, label: 3, typeName: ".google.protobuf.ExtensionRangeOptions.Declaration", options: { retention: 2 } }, { name: "features", number: 50, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "verification", number: 3, type: 14, label: 1, typeName: ".google.protobuf.ExtensionRangeOptions.VerificationState", defaultValue: "UNVERIFIED", options: { retention: 2 } }], nestedType: [{ name: "Declaration", field: [{ name: "number", number: 1, type: 5, label: 1 }, { name: "full_name", number: 2, type: 9, label: 1 }, { name: "type", number: 3, type: 9, label: 1 }, { name: "reserved", number: 5, type: 8, label: 1 }, { name: "repeated", number: 6, type: 8, label: 1 }] }], enumType: [{ name: "VerificationState", value: [{ name: "DECLARATION", number: 0 }, { name: "UNVERIFIED", number: 1 }] }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "FieldDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "number", number: 3, type: 5, label: 1 }, { name: "label", number: 4, type: 14, label: 1, typeName: ".google.protobuf.FieldDescriptorProto.Label" }, { name: "type", number: 5, type: 14, label: 1, typeName: ".google.protobuf.FieldDescriptorProto.Type" }, { name: "type_name", number: 6, type: 9, label: 1 }, { name: "extendee", number: 2, type: 9, label: 1 }, { name: "default_value", number: 7, type: 9, label: 1 }, { name: "oneof_index", number: 9, type: 5, label: 1 }, { name: "json_name", number: 10, type: 9, label: 1 }, { name: "options", number: 8, type: 11, label: 1, typeName: ".google.protobuf.FieldOptions" }, { name: "proto3_optional", number: 17, type: 8, label: 1 }], enumType: [{ name: "Type", value: [{ name: "TYPE_DOUBLE", number: 1 }, { name: "TYPE_FLOAT", number: 2 }, { name: "TYPE_INT64", number: 3 }, { name: "TYPE_UINT64", number: 4 }, { name: "TYPE_INT32", number: 5 }, { name: "TYPE_FIXED64", number: 6 }, { name: "TYPE_FIXED32", number: 7 }, { name: "TYPE_BOOL", number: 8 }, { name: "TYPE_STRING", number: 9 }, { name: "TYPE_GROUP", number: 10 }, { name: "TYPE_MESSAGE", number: 11 }, { name: "TYPE_BYTES", number: 12 }, { name: "TYPE_UINT32", number: 13 }, { name: "TYPE_ENUM", number: 14 }, { name: "TYPE_SFIXED32", number: 15 }, { name: "TYPE_SFIXED64", number: 16 }, { name: "TYPE_SINT32", number: 17 }, { name: "TYPE_SINT64", number: 18 }] }, { name: "Label", value: [{ name: "LABEL_OPTIONAL", number: 1 }, { name: "LABEL_REPEATED", number: 3 }, { name: "LABEL_REQUIRED", number: 2 }] }] }, { name: "OneofDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "options", number: 2, type: 11, label: 1, typeName: ".google.protobuf.OneofOptions" }] }, { name: "EnumDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "value", number: 2, type: 11, label: 3, typeName: ".google.protobuf.EnumValueDescriptorProto" }, { name: "options", number: 3, type: 11, label: 1, typeName: ".google.protobuf.EnumOptions" }, { name: "reserved_range", number: 4, type: 11, label: 3, typeName: ".google.protobuf.EnumDescriptorProto.EnumReservedRange" }, { name: "reserved_name", number: 5, type: 9, label: 3 }, { name: "visibility", number: 6, type: 14, label: 1, typeName: ".google.protobuf.SymbolVisibility" }], nestedType: [{ name: "EnumReservedRange", field: [{ name: "start", number: 1, type: 5, label: 1 }, { name: "end", number: 2, type: 5, label: 1 }] }] }, { name: "EnumValueDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "number", number: 2, type: 5, label: 1 }, { name: "options", number: 3, type: 11, label: 1, typeName: ".google.protobuf.EnumValueOptions" }] }, { name: "ServiceDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "method", number: 2, type: 11, label: 3, typeName: ".google.protobuf.MethodDescriptorProto" }, { name: "options", number: 3, type: 11, label: 1, typeName: ".google.protobuf.ServiceOptions" }] }, { name: "MethodDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "input_type", number: 2, type: 9, label: 1 }, { name: "output_type", number: 3, type: 9, label: 1 }, { name: "options", number: 4, type: 11, label: 1, typeName: ".google.protobuf.MethodOptions" }, { name: "client_streaming", number: 5, type: 8, label: 1, defaultValue: "false" }, { name: "server_streaming", number: 6, type: 8, label: 1, defaultValue: "false" }] }, { name: "FileOptions", field: [{ name: "java_package", number: 1, type: 9, label: 1 }, { name: "java_outer_classname", number: 8, type: 9, label: 1 }, { name: "java_multiple_files", number: 10, type: 8, label: 1, defaultValue: "false" }, { name: "java_generate_equals_and_hash", number: 20, type: 8, label: 1, options: { deprecated: !0 } }, { name: "java_string_check_utf8", number: 27, type: 8, label: 1, defaultValue: "false" }, { name: "optimize_for", number: 9, type: 14, label: 1, typeName: ".google.protobuf.FileOptions.OptimizeMode", defaultValue: "SPEED" }, { name: "go_package", number: 11, type: 9, label: 1 }, { name: "cc_generic_services", number: 16, type: 8, label: 1, defaultValue: "false" }, { name: "java_generic_services", number: 17, type: 8, label: 1, defaultValue: "false" }, { name: "py_generic_services", number: 18, type: 8, label: 1, defaultValue: "false" }, { name: "deprecated", number: 23, type: 8, label: 1, defaultValue: "false" }, { name: "cc_enable_arenas", number: 31, type: 8, label: 1, defaultValue: "true" }, { name: "objc_class_prefix", number: 36, type: 9, label: 1 }, { name: "csharp_namespace", number: 37, type: 9, label: 1 }, { name: "swift_prefix", number: 39, type: 9, label: 1 }, { name: "php_class_prefix", number: 40, type: 9, label: 1 }, { name: "php_namespace", number: 41, type: 9, label: 1 }, { name: "php_metadata_namespace", number: 44, type: 9, label: 1 }, { name: "ruby_package", number: 45, type: 9, label: 1 }, { name: "features", number: 50, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], enumType: [{ name: "OptimizeMode", value: [{ name: "SPEED", number: 1 }, { name: "CODE_SIZE", number: 2 }, { name: "LITE_RUNTIME", number: 3 }] }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "MessageOptions", field: [{ name: "message_set_wire_format", number: 1, type: 8, label: 1, defaultValue: "false" }, { name: "no_standard_descriptor_accessor", number: 2, type: 8, label: 1, defaultValue: "false" }, { name: "deprecated", number: 3, type: 8, label: 1, defaultValue: "false" }, { name: "map_entry", number: 7, type: 8, label: 1 }, { name: "deprecated_legacy_json_field_conflicts", number: 11, type: 8, label: 1, options: { deprecated: !0 } }, { name: "features", number: 12, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "FieldOptions", field: [{ name: "ctype", number: 1, type: 14, label: 1, typeName: ".google.protobuf.FieldOptions.CType", defaultValue: "STRING" }, { name: "packed", number: 2, type: 8, label: 1 }, { name: "jstype", number: 6, type: 14, label: 1, typeName: ".google.protobuf.FieldOptions.JSType", defaultValue: "JS_NORMAL" }, { name: "lazy", number: 5, type: 8, label: 1, defaultValue: "false" }, { name: "unverified_lazy", number: 15, type: 8, label: 1, defaultValue: "false" }, { name: "deprecated", number: 3, type: 8, label: 1, defaultValue: "false" }, { name: "weak", number: 10, type: 8, label: 1, defaultValue: "false", options: { deprecated: !0 } }, { name: "debug_redact", number: 16, type: 8, label: 1, defaultValue: "false" }, { name: "retention", number: 17, type: 14, label: 1, typeName: ".google.protobuf.FieldOptions.OptionRetention" }, { name: "targets", number: 19, type: 14, label: 3, typeName: ".google.protobuf.FieldOptions.OptionTargetType" }, { name: "edition_defaults", number: 20, type: 11, label: 3, typeName: ".google.protobuf.FieldOptions.EditionDefault" }, { name: "features", number: 21, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "feature_support", number: 22, type: 11, label: 1, typeName: ".google.protobuf.FieldOptions.FeatureSupport" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], nestedType: [{ name: "EditionDefault", field: [{ name: "edition", number: 3, type: 14, label: 1, typeName: ".google.protobuf.Edition" }, { name: "value", number: 2, type: 9, label: 1 }] }, { name: "FeatureSupport", field: [{ name: "edition_introduced", number: 1, type: 14, label: 1, typeName: ".google.protobuf.Edition" }, { name: "edition_deprecated", number: 2, type: 14, label: 1, typeName: ".google.protobuf.Edition" }, { name: "deprecation_warning", number: 3, type: 9, label: 1 }, { name: "edition_removed", number: 4, type: 14, label: 1, typeName: ".google.protobuf.Edition" }] }], enumType: [{ name: "CType", value: [{ name: "STRING", number: 0 }, { name: "CORD", number: 1 }, { name: "STRING_PIECE", number: 2 }] }, { name: "JSType", value: [{ name: "JS_NORMAL", number: 0 }, { name: "JS_STRING", number: 1 }, { name: "JS_NUMBER", number: 2 }] }, { name: "OptionRetention", value: [{ name: "RETENTION_UNKNOWN", number: 0 }, { name: "RETENTION_RUNTIME", number: 1 }, { name: "RETENTION_SOURCE", number: 2 }] }, { name: "OptionTargetType", value: [{ name: "TARGET_TYPE_UNKNOWN", number: 0 }, { name: "TARGET_TYPE_FILE", number: 1 }, { name: "TARGET_TYPE_EXTENSION_RANGE", number: 2 }, { name: "TARGET_TYPE_MESSAGE", number: 3 }, { name: "TARGET_TYPE_FIELD", number: 4 }, { name: "TARGET_TYPE_ONEOF", number: 5 }, { name: "TARGET_TYPE_ENUM", number: 6 }, { name: "TARGET_TYPE_ENUM_ENTRY", number: 7 }, { name: "TARGET_TYPE_SERVICE", number: 8 }, { name: "TARGET_TYPE_METHOD", number: 9 }] }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "OneofOptions", field: [{ name: "features", number: 1, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "EnumOptions", field: [{ name: "allow_alias", number: 2, type: 8, label: 1 }, { name: "deprecated", number: 3, type: 8, label: 1, defaultValue: "false" }, { name: "deprecated_legacy_json_field_conflicts", number: 6, type: 8, label: 1, options: { deprecated: !0 } }, { name: "features", number: 7, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "EnumValueOptions", field: [{ name: "deprecated", number: 1, type: 8, label: 1, defaultValue: "false" }, { name: "features", number: 2, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "debug_redact", number: 3, type: 8, label: 1, defaultValue: "false" }, { name: "feature_support", number: 4, type: 11, label: 1, typeName: ".google.protobuf.FieldOptions.FeatureSupport" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "ServiceOptions", field: [{ name: "features", number: 34, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "deprecated", number: 33, type: 8, label: 1, defaultValue: "false" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "MethodOptions", field: [{ name: "deprecated", number: 33, type: 8, label: 1, defaultValue: "false" }, { name: "idempotency_level", number: 34, type: 14, label: 1, typeName: ".google.protobuf.MethodOptions.IdempotencyLevel", defaultValue: "IDEMPOTENCY_UNKNOWN" }, { name: "features", number: 35, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], enumType: [{ name: "IdempotencyLevel", value: [{ name: "IDEMPOTENCY_UNKNOWN", number: 0 }, { name: "NO_SIDE_EFFECTS", number: 1 }, { name: "IDEMPOTENT", number: 2 }] }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "UninterpretedOption", field: [{ name: "name", number: 2, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption.NamePart" }, { name: "identifier_value", number: 3, type: 9, label: 1 }, { name: "positive_int_value", number: 4, type: 4, label: 1 }, { name: "negative_int_value", number: 5, type: 3, label: 1 }, { name: "double_value", number: 6, type: 1, label: 1 }, { name: "string_value", number: 7, type: 12, label: 1 }, { name: "aggregate_value", number: 8, type: 9, label: 1 }], nestedType: [{ name: "NamePart", field: [{ name: "name_part", number: 1, type: 9, label: 2 }, { name: "is_extension", number: 2, type: 8, label: 2 }] }] }, { name: "FeatureSet", field: [{ name: "field_presence", number: 1, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.FieldPresence", options: { retention: 1, targets: [4, 1], editionDefaults: [{ value: "EXPLICIT", edition: 900 }, { value: "IMPLICIT", edition: 999 }, { value: "EXPLICIT", edition: 1e3 }] } }, { name: "enum_type", number: 2, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.EnumType", options: { retention: 1, targets: [6, 1], editionDefaults: [{ value: "CLOSED", edition: 900 }, { value: "OPEN", edition: 999 }] } }, { name: "repeated_field_encoding", number: 3, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.RepeatedFieldEncoding", options: { retention: 1, targets: [4, 1], editionDefaults: [{ value: "EXPANDED", edition: 900 }, { value: "PACKED", edition: 999 }] } }, { name: "utf8_validation", number: 4, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.Utf8Validation", options: { retention: 1, targets: [4, 1], editionDefaults: [{ value: "NONE", edition: 900 }, { value: "VERIFY", edition: 999 }] } }, { name: "message_encoding", number: 5, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.MessageEncoding", options: { retention: 1, targets: [4, 1], editionDefaults: [{ value: "LENGTH_PREFIXED", edition: 900 }] } }, { name: "json_format", number: 6, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.JsonFormat", options: { retention: 1, targets: [3, 6, 1], editionDefaults: [{ value: "LEGACY_BEST_EFFORT", edition: 900 }, { value: "ALLOW", edition: 999 }] } }, { name: "enforce_naming_style", number: 7, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.EnforceNamingStyle", options: { retention: 2, targets: [1, 2, 3, 4, 5, 6, 7, 8, 9], editionDefaults: [{ value: "STYLE_LEGACY", edition: 900 }, { value: "STYLE2024", edition: 1001 }] } }, { name: "default_symbol_visibility", number: 8, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.VisibilityFeature.DefaultSymbolVisibility", options: { retention: 2, targets: [1], editionDefaults: [{ value: "EXPORT_ALL", edition: 900 }, { value: "EXPORT_TOP_LEVEL", edition: 1001 }] } }], nestedType: [{ name: "VisibilityFeature", enumType: [{ name: "DefaultSymbolVisibility", value: [{ name: "DEFAULT_SYMBOL_VISIBILITY_UNKNOWN", number: 0 }, { name: "EXPORT_ALL", number: 1 }, { name: "EXPORT_TOP_LEVEL", number: 2 }, { name: "LOCAL_ALL", number: 3 }, { name: "STRICT", number: 4 }] }] }], enumType: [{ name: "FieldPresence", value: [{ name: "FIELD_PRESENCE_UNKNOWN", number: 0 }, { name: "EXPLICIT", number: 1 }, { name: "IMPLICIT", number: 2 }, { name: "LEGACY_REQUIRED", number: 3 }] }, { name: "EnumType", value: [{ name: "ENUM_TYPE_UNKNOWN", number: 0 }, { name: "OPEN", number: 1 }, { name: "CLOSED", number: 2 }] }, { name: "RepeatedFieldEncoding", value: [{ name: "REPEATED_FIELD_ENCODING_UNKNOWN", number: 0 }, { name: "PACKED", number: 1 }, { name: "EXPANDED", number: 2 }] }, { name: "Utf8Validation", value: [{ name: "UTF8_VALIDATION_UNKNOWN", number: 0 }, { name: "VERIFY", number: 2 }, { name: "NONE", number: 3 }] }, { name: "MessageEncoding", value: [{ name: "MESSAGE_ENCODING_UNKNOWN", number: 0 }, { name: "LENGTH_PREFIXED", number: 1 }, { name: "DELIMITED", number: 2 }] }, { name: "JsonFormat", value: [{ name: "JSON_FORMAT_UNKNOWN", number: 0 }, { name: "ALLOW", number: 1 }, { name: "LEGACY_BEST_EFFORT", number: 2 }] }, { name: "EnforceNamingStyle", value: [{ name: "ENFORCE_NAMING_STYLE_UNKNOWN", number: 0 }, { name: "STYLE2024", number: 1 }, { name: "STYLE_LEGACY", number: 2 }] }], extensionRange: [{ start: 1e3, end: 9995 }, { start: 9995, end: 1e4 }, { start: 1e4, end: 10001 }] }, { name: "FeatureSetDefaults", field: [{ name: "defaults", number: 1, type: 11, label: 3, typeName: ".google.protobuf.FeatureSetDefaults.FeatureSetEditionDefault" }, { name: "minimum_edition", number: 4, type: 14, label: 1, typeName: ".google.protobuf.Edition" }, { name: "maximum_edition", number: 5, type: 14, label: 1, typeName: ".google.protobuf.Edition" }], nestedType: [{ name: "FeatureSetEditionDefault", field: [{ name: "edition", number: 3, type: 14, label: 1, typeName: ".google.protobuf.Edition" }, { name: "overridable_features", number: 4, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "fixed_features", number: 5, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }] }] }, { name: "SourceCodeInfo", field: [{ name: "location", number: 1, type: 11, label: 3, typeName: ".google.protobuf.SourceCodeInfo.Location" }], nestedType: [{ name: "Location", field: [{ name: "path", number: 1, type: 5, label: 3, options: { packed: !0 } }, { name: "span", number: 2, type: 5, label: 3, options: { packed: !0 } }, { name: "leading_comments", number: 3, type: 9, label: 1 }, { name: "trailing_comments", number: 4, type: 9, label: 1 }, { name: "leading_detached_comments", number: 6, type: 9, label: 3 }] }], extensionRange: [{ start: 536e6, end: 536000001 }] }, { name: "GeneratedCodeInfo", field: [{ name: "annotation", number: 1, type: 11, label: 3, typeName: ".google.protobuf.GeneratedCodeInfo.Annotation" }], nestedType: [{ name: "Annotation", field: [{ name: "path", number: 1, type: 5, label: 3, options: { packed: !0 } }, { name: "source_file", number: 2, type: 9, label: 1 }, { name: "begin", number: 3, type: 5, label: 1 }, { name: "end", number: 4, type: 5, label: 1 }, { name: "semantic", number: 5, type: 14, label: 1, typeName: ".google.protobuf.GeneratedCodeInfo.Annotation.Semantic" }], enumType: [{ name: "Semantic", value: [{ name: "NONE", number: 0 }, { name: "SET", number: 1 }, { name: "ALIAS", number: 2 }] }] }] }], enumType: [{ name: "Edition", value: [{ name: "EDITION_UNKNOWN", number: 0 }, { name: "EDITION_LEGACY", number: 900 }, { name: "EDITION_PROTO2", number: 998 }, { name: "EDITION_PROTO3", number: 999 }, { name: "EDITION_2023", number: 1e3 }, { name: "EDITION_2024", number: 1001 }, { name: "EDITION_UNSTABLE", number: 9999 }, { name: "EDITION_1_TEST_ONLY", number: 1 }, { name: "EDITION_2_TEST_ONLY", number: 2 }, { name: "EDITION_99997_TEST_ONLY", number: 99997 }, { name: "EDITION_99998_TEST_ONLY", number: 99998 }, { name: "EDITION_99999_TEST_ONLY", number: 99999 }, { name: "EDITION_MAX", number: 2147483647 }] }, { name: "SymbolVisibility", value: [{ name: "VISIBILITY_UNSET", number: 0 }, { name: "VISIBILITY_LOCAL", number: 1 }, { name: "VISIBILITY_EXPORT", number: 2 }] }] }), uo = /* @__PURE__ */ xe(io, 1);
var Ut;
(function(e) {
  e[e.DECLARATION = 0] = "DECLARATION", e[e.UNVERIFIED = 1] = "UNVERIFIED";
})(Ut || (Ut = {}));
var xt;
(function(e) {
  e[e.DOUBLE = 1] = "DOUBLE", e[e.FLOAT = 2] = "FLOAT", e[e.INT64 = 3] = "INT64", e[e.UINT64 = 4] = "UINT64", e[e.INT32 = 5] = "INT32", e[e.FIXED64 = 6] = "FIXED64", e[e.FIXED32 = 7] = "FIXED32", e[e.BOOL = 8] = "BOOL", e[e.STRING = 9] = "STRING", e[e.GROUP = 10] = "GROUP", e[e.MESSAGE = 11] = "MESSAGE", e[e.BYTES = 12] = "BYTES", e[e.UINT32 = 13] = "UINT32", e[e.ENUM = 14] = "ENUM", e[e.SFIXED32 = 15] = "SFIXED32", e[e.SFIXED64 = 16] = "SFIXED64", e[e.SINT32 = 17] = "SINT32", e[e.SINT64 = 18] = "SINT64";
})(xt || (xt = {}));
var Ft;
(function(e) {
  e[e.OPTIONAL = 1] = "OPTIONAL", e[e.REPEATED = 3] = "REPEATED", e[e.REQUIRED = 2] = "REQUIRED";
})(Ft || (Ft = {}));
var Pt;
(function(e) {
  e[e.SPEED = 1] = "SPEED", e[e.CODE_SIZE = 2] = "CODE_SIZE", e[e.LITE_RUNTIME = 3] = "LITE_RUNTIME";
})(Pt || (Pt = {}));
var $t;
(function(e) {
  e[e.STRING = 0] = "STRING", e[e.CORD = 1] = "CORD", e[e.STRING_PIECE = 2] = "STRING_PIECE";
})($t || ($t = {}));
var Vt;
(function(e) {
  e[e.JS_NORMAL = 0] = "JS_NORMAL", e[e.JS_STRING = 1] = "JS_STRING", e[e.JS_NUMBER = 2] = "JS_NUMBER";
})(Vt || (Vt = {}));
var Yt;
(function(e) {
  e[e.RETENTION_UNKNOWN = 0] = "RETENTION_UNKNOWN", e[e.RETENTION_RUNTIME = 1] = "RETENTION_RUNTIME", e[e.RETENTION_SOURCE = 2] = "RETENTION_SOURCE";
})(Yt || (Yt = {}));
var Mt;
(function(e) {
  e[e.TARGET_TYPE_UNKNOWN = 0] = "TARGET_TYPE_UNKNOWN", e[e.TARGET_TYPE_FILE = 1] = "TARGET_TYPE_FILE", e[e.TARGET_TYPE_EXTENSION_RANGE = 2] = "TARGET_TYPE_EXTENSION_RANGE", e[e.TARGET_TYPE_MESSAGE = 3] = "TARGET_TYPE_MESSAGE", e[e.TARGET_TYPE_FIELD = 4] = "TARGET_TYPE_FIELD", e[e.TARGET_TYPE_ONEOF = 5] = "TARGET_TYPE_ONEOF", e[e.TARGET_TYPE_ENUM = 6] = "TARGET_TYPE_ENUM", e[e.TARGET_TYPE_ENUM_ENTRY = 7] = "TARGET_TYPE_ENUM_ENTRY", e[e.TARGET_TYPE_SERVICE = 8] = "TARGET_TYPE_SERVICE", e[e.TARGET_TYPE_METHOD = 9] = "TARGET_TYPE_METHOD";
})(Mt || (Mt = {}));
var Rn;
(function(e) {
  e[e.IDEMPOTENCY_UNKNOWN = 0] = "IDEMPOTENCY_UNKNOWN", e[e.NO_SIDE_EFFECTS = 1] = "NO_SIDE_EFFECTS", e[e.IDEMPOTENT = 2] = "IDEMPOTENT";
})(Rn || (Rn = {}));
var Bt;
(function(e) {
  e[e.DEFAULT_SYMBOL_VISIBILITY_UNKNOWN = 0] = "DEFAULT_SYMBOL_VISIBILITY_UNKNOWN", e[e.EXPORT_ALL = 1] = "EXPORT_ALL", e[e.EXPORT_TOP_LEVEL = 2] = "EXPORT_TOP_LEVEL", e[e.LOCAL_ALL = 3] = "LOCAL_ALL", e[e.STRICT = 4] = "STRICT";
})(Bt || (Bt = {}));
var Gt;
(function(e) {
  e[e.FIELD_PRESENCE_UNKNOWN = 0] = "FIELD_PRESENCE_UNKNOWN", e[e.EXPLICIT = 1] = "EXPLICIT", e[e.IMPLICIT = 2] = "IMPLICIT", e[e.LEGACY_REQUIRED = 3] = "LEGACY_REQUIRED";
})(Gt || (Gt = {}));
var Ct;
(function(e) {
  e[e.ENUM_TYPE_UNKNOWN = 0] = "ENUM_TYPE_UNKNOWN", e[e.OPEN = 1] = "OPEN", e[e.CLOSED = 2] = "CLOSED";
})(Ct || (Ct = {}));
var Kt;
(function(e) {
  e[e.REPEATED_FIELD_ENCODING_UNKNOWN = 0] = "REPEATED_FIELD_ENCODING_UNKNOWN", e[e.PACKED = 1] = "PACKED", e[e.EXPANDED = 2] = "EXPANDED";
})(Kt || (Kt = {}));
var Jt;
(function(e) {
  e[e.UTF8_VALIDATION_UNKNOWN = 0] = "UTF8_VALIDATION_UNKNOWN", e[e.VERIFY = 2] = "VERIFY", e[e.NONE = 3] = "NONE";
})(Jt || (Jt = {}));
var Xt;
(function(e) {
  e[e.MESSAGE_ENCODING_UNKNOWN = 0] = "MESSAGE_ENCODING_UNKNOWN", e[e.LENGTH_PREFIXED = 1] = "LENGTH_PREFIXED", e[e.DELIMITED = 2] = "DELIMITED";
})(Xt || (Xt = {}));
var jt;
(function(e) {
  e[e.JSON_FORMAT_UNKNOWN = 0] = "JSON_FORMAT_UNKNOWN", e[e.ALLOW = 1] = "ALLOW", e[e.LEGACY_BEST_EFFORT = 2] = "LEGACY_BEST_EFFORT";
})(jt || (jt = {}));
var Wt;
(function(e) {
  e[e.ENFORCE_NAMING_STYLE_UNKNOWN = 0] = "ENFORCE_NAMING_STYLE_UNKNOWN", e[e.STYLE2024 = 1] = "STYLE2024", e[e.STYLE_LEGACY = 2] = "STYLE_LEGACY";
})(Wt || (Wt = {}));
var Zt;
(function(e) {
  e[e.NONE = 0] = "NONE", e[e.SET = 1] = "SET", e[e.ALIAS = 2] = "ALIAS";
})(Zt || (Zt = {}));
var Ht;
(function(e) {
  e[e.EDITION_UNKNOWN = 0] = "EDITION_UNKNOWN", e[e.EDITION_LEGACY = 900] = "EDITION_LEGACY", e[e.EDITION_PROTO2 = 998] = "EDITION_PROTO2", e[e.EDITION_PROTO3 = 999] = "EDITION_PROTO3", e[e.EDITION_2023 = 1e3] = "EDITION_2023", e[e.EDITION_2024 = 1001] = "EDITION_2024", e[e.EDITION_UNSTABLE = 9999] = "EDITION_UNSTABLE", e[e.EDITION_1_TEST_ONLY = 1] = "EDITION_1_TEST_ONLY", e[e.EDITION_2_TEST_ONLY = 2] = "EDITION_2_TEST_ONLY", e[e.EDITION_99997_TEST_ONLY = 99997] = "EDITION_99997_TEST_ONLY", e[e.EDITION_99998_TEST_ONLY = 99998] = "EDITION_99998_TEST_ONLY", e[e.EDITION_99999_TEST_ONLY = 99999] = "EDITION_99999_TEST_ONLY", e[e.EDITION_MAX = 2147483647] = "EDITION_MAX";
})(Ht || (Ht = {}));
var zt;
(function(e) {
  e[e.VISIBILITY_UNSET = 0] = "VISIBILITY_UNSET", e[e.VISIBILITY_LOCAL = 1] = "VISIBILITY_LOCAL", e[e.VISIBILITY_EXPORT = 2] = "VISIBILITY_EXPORT";
})(zt || (zt = {}));
const qt = {
  readUnknownFields: !0
};
function co(e) {
  return e ? Object.assign(Object.assign({}, qt), e) : qt;
}
function sn(e, n, t) {
  const r = $(e, void 0, !1);
  return ta(r, new Wn(n), co(t), !1, n.byteLength), r.message;
}
function ta(e, n, t, r, a) {
  var s;
  const o = r ? n.len : n.pos + a;
  let i, u;
  const c = (s = e.getUnknown()) !== null && s !== void 0 ? s : [];
  for (; n.pos < o && ([i, u] = n.tag(), !(r && u == v.EndGroup)); ) {
    const d = e.findNumber(i);
    if (!d) {
      const m = n.skip(u, i);
      t.readUnknownFields && c.push({ no: i, wireType: u, data: m });
      continue;
    }
    ra(e, n, d, u, t);
  }
  if (r && (u != v.EndGroup || i !== a))
    throw new Error("invalid end group tag");
  c.length > 0 && e.setUnknown(c);
}
function ra(e, n, t, r, a) {
  var s;
  switch (t.fieldKind) {
    case "scalar":
      e.set(t, pe(n, t.scalar));
      break;
    case "enum":
      const o = pe(n, l.INT32);
      if (t.enum.open)
        e.set(t, o);
      else if (t.enum.values.some((u) => u.number === o))
        e.set(t, o);
      else if (a.readUnknownFields) {
        const u = [];
        On(o, u);
        const c = (s = e.getUnknown()) !== null && s !== void 0 ? s : [];
        c.push({
          no: t.number,
          wireType: r,
          data: new Uint8Array(u)
        }), e.setUnknown(c);
      }
      break;
    case "message":
      e.set(t, rt(n, a, t, e.get(t)));
      break;
    case "list":
      fo(n, r, e.get(t), a);
      break;
    case "map":
      lo(n, e.get(t), a);
      break;
  }
}
function lo(e, n, t) {
  const r = n.field();
  let a, s;
  const o = e.uint32(), i = e.pos + o;
  for (; e.pos < i; ) {
    const [u] = e.tag();
    switch (u) {
      case 1:
        a = pe(e, r.mapKey);
        break;
      case 2:
        switch (r.mapKind) {
          case "scalar":
            s = pe(e, r.scalar);
            break;
          case "enum":
            s = e.int32();
            break;
          case "message":
            s = rt(e, t, r);
            break;
        }
        break;
    }
  }
  if (a === void 0 && (a = oe(r.mapKey, !1)), s === void 0)
    switch (r.mapKind) {
      case "scalar":
        s = oe(r.scalar, !1);
        break;
      case "enum":
        s = r.enum.values[0].number;
        break;
      case "message":
        s = $(r.message, void 0, !1);
        break;
    }
  n.set(a, s);
}
function fo(e, n, t, r) {
  var a;
  const s = t.field();
  if (s.listKind === "message") {
    t.add(rt(e, r, s));
    return;
  }
  const o = (a = s.scalar) !== null && a !== void 0 ? a : l.INT32;
  if (!(n == v.LengthDelimited && o != l.STRING && o != l.BYTES)) {
    t.add(pe(e, o));
    return;
  }
  const u = e.uint32() + e.pos;
  for (; e.pos < u; )
    t.add(pe(e, o));
}
function rt(e, n, t, r) {
  const a = t.delimitedEncoding, s = r ?? $(t.message, void 0, !1);
  return ta(s, e, n, a, a ? t.number : e.uint32()), s;
}
function pe(e, n) {
  switch (n) {
    case l.STRING:
      return e.string();
    case l.BOOL:
      return e.bool();
    case l.DOUBLE:
      return e.double();
    case l.FLOAT:
      return e.float();
    case l.INT32:
      return e.int32();
    case l.INT64:
      return e.int64();
    case l.UINT64:
      return e.uint64();
    case l.FIXED64:
      return e.fixed64();
    case l.BYTES:
      return e.bytes();
    case l.FIXED32:
      return e.fixed32();
    case l.SFIXED32:
      return e.sfixed32();
    case l.SFIXED64:
      return e.sfixed64();
    case l.SINT64:
      return e.sint64();
    case l.UINT32:
      return e.uint32();
    case l.SINT32:
      return e.sint32();
  }
}
function aa(e, n) {
  var t;
  const r = sn(uo, et(e));
  return r.messageType.forEach(nt), r.dependency = (t = void 0) !== null && t !== void 0 ? t : [], Hr(r, (s) => {
  }).getFile(r.name);
}
const mo = /* @__PURE__ */ aa("Chlnb29nbGUvcHJvdG9idWYvYW55LnByb3RvEg9nb29nbGUucHJvdG9idWYiJgoDQW55EhAKCHR5cGVfdXJsGAEgASgJEg0KBXZhbHVlGAIgASgMQnYKE2NvbS5nb29nbGUucHJvdG9idWZCCEFueVByb3RvUAFaLGdvb2dsZS5nb2xhbmcub3JnL3Byb3RvYnVmL3R5cGVzL2tub3duL2FueXBiogIDR1BCqgIeR29vZ2xlLlByb3RvYnVmLldlbGxLbm93blR5cGVzYgZwcm90bzM"), bo = /* @__PURE__ */ xe(mo, 0), po = 3, Qt = {
  writeUnknownFields: !0
};
function ho(e) {
  return e ? Object.assign(Object.assign({}, Qt), e) : Qt;
}
function sa(e, n, t) {
  return Ze(new Vr(), ho(t), $(e, n)).finish();
}
function Ze(e, n, t) {
  var r;
  for (const a of t.sortedFields) {
    if (!t.isSet(a)) {
      if (a.presence == po)
        throw new Error(`cannot encode ${a} to binary: required field not set`);
      continue;
    }
    oa(e, n, t, a);
  }
  if (n.writeUnknownFields)
    for (const { no: a, wireType: s, data: o } of (r = t.getUnknown()) !== null && r !== void 0 ? r : [])
      e.tag(a, s).raw(o);
  return e;
}
function oa(e, n, t, r) {
  var a;
  switch (r.fieldKind) {
    case "scalar":
    case "enum":
      He(e, t.desc.typeName, r.name, (a = r.scalar) !== null && a !== void 0 ? a : l.INT32, r.number, t.get(r));
      break;
    case "list":
      go(e, n, r, t.get(r));
      break;
    case "message":
      ia(e, n, r, t.get(r));
      break;
    case "map":
      for (const [s, o] of t.get(r))
        yo(e, n, r, s, o);
      break;
  }
}
function He(e, n, t, r, a, s) {
  ua(e.tag(a, Eo(r)), n, t, r, s);
}
function ia(e, n, t, r) {
  t.delimitedEncoding ? Ze(e.tag(t.number, v.StartGroup), n, r).tag(t.number, v.EndGroup) : Ze(e.tag(t.number, v.LengthDelimited).fork(), n, r).join();
}
function go(e, n, t, r) {
  var a;
  if (t.listKind == "message") {
    for (const o of r)
      ia(e, n, t, o);
    return;
  }
  const s = (a = t.scalar) !== null && a !== void 0 ? a : l.INT32;
  if (t.packed) {
    if (!r.size)
      return;
    e.tag(t.number, v.LengthDelimited).fork();
    for (const o of r)
      ua(e, t.parent.typeName, t.name, s, o);
    e.join();
    return;
  }
  for (const o of r)
    He(e, t.parent.typeName, t.name, s, t.number, o);
}
function yo(e, n, t, r, a) {
  var s;
  switch (e.tag(t.number, v.LengthDelimited).fork(), He(e, t.parent.typeName, t.name, t.mapKey, 1, r), t.mapKind) {
    case "scalar":
    case "enum":
      He(e, t.parent.typeName, t.name, (s = t.scalar) !== null && s !== void 0 ? s : l.INT32, 2, a);
      break;
    case "message":
      Ze(e.tag(2, v.LengthDelimited).fork(), n, a).join();
      break;
  }
  e.join();
}
function ua(e, n, t, r, a) {
  try {
    switch (r) {
      case l.STRING:
        e.string(a);
        break;
      case l.BOOL:
        e.bool(a);
        break;
      case l.DOUBLE:
        e.double(a);
        break;
      case l.FLOAT:
        e.float(a);
        break;
      case l.INT32:
        e.int32(a);
        break;
      case l.INT64:
        e.int64(a);
        break;
      case l.UINT64:
        e.uint64(a);
        break;
      case l.FIXED64:
        e.fixed64(a);
        break;
      case l.BYTES:
        e.bytes(a);
        break;
      case l.FIXED32:
        e.fixed32(a);
        break;
      case l.SFIXED32:
        e.sfixed32(a);
        break;
      case l.SFIXED64:
        e.sfixed64(a);
        break;
      case l.SINT64:
        e.sint64(a);
        break;
      case l.UINT32:
        e.uint32(a);
        break;
      case l.SINT32:
        e.sint32(a);
        break;
    }
  } catch (s) {
    throw s instanceof Error ? new Error(`cannot encode field ${n}.${t} to binary: ${s.message}`) : s;
  }
}
function Eo(e) {
  switch (e) {
    case l.BYTES:
    case l.STRING:
      return v.LengthDelimited;
    case l.DOUBLE:
    case l.FIXED64:
    case l.SFIXED64:
      return v.Bit64;
    case l.FIXED32:
    case l.SFIXED32:
    case l.FLOAT:
      return v.Bit32;
    default:
      return v.Varint;
  }
}
function No(e, n, t) {
  let r = !1;
  return t || (t = Y(bo), r = !0), t.value = sa(e, n), t.typeUrl = Io(n.$typeName), r ? t : void 0;
}
function _o(e, n) {
  if (e.typeUrl === "")
    return !1;
  const t = typeof n == "string" ? n : n.typeName, r = ca(e.typeUrl);
  return t === r;
}
function vo(e, n) {
  if (e.typeUrl === "")
    return;
  const t = n.kind == "message" ? n : n.getMessage(ca(e.typeUrl));
  if (!(!t || !_o(e, t)))
    return sn(t, e.value);
}
function Io(e) {
  return `type.googleapis.com/${e}`;
}
function ca(e) {
  const n = e.lastIndexOf("/"), t = n >= 0 ? e.substring(n + 1) : e;
  if (!t.length)
    throw new Error(`invalid type url: ${e}`);
  return t;
}
const at = /* @__PURE__ */ aa("Chxnb29nbGUvcHJvdG9idWYvc3RydWN0LnByb3RvEg9nb29nbGUucHJvdG9idWYihAEKBlN0cnVjdBIzCgZmaWVsZHMYASADKAsyIy5nb29nbGUucHJvdG9idWYuU3RydWN0LkZpZWxkc0VudHJ5GkUKC0ZpZWxkc0VudHJ5EgsKA2tleRgBIAEoCRIlCgV2YWx1ZRgCIAEoCzIWLmdvb2dsZS5wcm90b2J1Zi5WYWx1ZToCOAEi6gEKBVZhbHVlEjAKCm51bGxfdmFsdWUYASABKA4yGi5nb29nbGUucHJvdG9idWYuTnVsbFZhbHVlSAASFgoMbnVtYmVyX3ZhbHVlGAIgASgBSAASFgoMc3RyaW5nX3ZhbHVlGAMgASgJSAASFAoKYm9vbF92YWx1ZRgEIAEoCEgAEi8KDHN0cnVjdF92YWx1ZRgFIAEoCzIXLmdvb2dsZS5wcm90b2J1Zi5TdHJ1Y3RIABIwCgpsaXN0X3ZhbHVlGAYgASgLMhouZ29vZ2xlLnByb3RvYnVmLkxpc3RWYWx1ZUgAQgYKBGtpbmQiMwoJTGlzdFZhbHVlEiYKBnZhbHVlcxgBIAMoCzIWLmdvb2dsZS5wcm90b2J1Zi5WYWx1ZSobCglOdWxsVmFsdWUSDgoKTlVMTF9WQUxVRRAAQn8KE2NvbS5nb29nbGUucHJvdG9idWZCC1N0cnVjdFByb3RvUAFaL2dvb2dsZS5nb2xhbmcub3JnL3Byb3RvYnVmL3R5cGVzL2tub3duL3N0cnVjdHBi+AEBogIDR1BCqgIeR29vZ2xlLlByb3RvYnVmLldlbGxLbm93blR5cGVzYgZwcm90bzM"), wo = /* @__PURE__ */ xe(at, 0), la = /* @__PURE__ */ xe(at, 1), To = /* @__PURE__ */ xe(at, 2);
var Un;
(function(e) {
  e[e.NULL_VALUE = 0] = "NULL_VALUE";
})(Un || (Un = {}));
function So(e, n) {
  fa(n, e);
  const t = Ao(e.$unknown, n), [r, a, s] = on(n);
  for (const o of t)
    ra(r, new Wn(o.data), a, o.wireType, {
      readUnknownFields: !0
    });
  return s();
}
function Oo(e, n, t) {
  var r;
  fa(n, e);
  const a = ((r = e.$unknown) !== null && r !== void 0 ? r : []).filter((c) => c.no !== n.number), [s, o] = on(n, t), i = new Vr();
  oa(i, { writeUnknownFields: !0 }, s, o);
  const u = new Wn(i.finish());
  for (; u.pos < u.len; ) {
    const [c, d] = u.tag(), m = u.skip(d, c);
    a.push({ no: c, wireType: d, data: m });
  }
  e.$unknown = a;
}
function Ao(e, n) {
  if (e === void 0)
    return [];
  if (n.fieldKind === "enum" || n.fieldKind === "scalar") {
    for (let t = e.length - 1; t >= 0; --t)
      if (e[t].no == n.number)
        return [e[t]];
    return [];
  }
  return e.filter((t) => t.no === n.number);
}
function on(e, n) {
  const t = e.typeName, r = Object.assign(Object.assign({}, e), { kind: "field", parent: e.extendee, localName: t }), a = Object.assign(Object.assign({}, e.extendee), { fields: [r], members: [r], oneofs: [] }), s = Y(a, n !== void 0 ? { [t]: n } : void 0);
  return [
    $(a, s),
    r,
    () => {
      const o = s[t];
      if (o === void 0) {
        const i = e.message;
        return Ue(i) ? oe(i.fields[0].scalar, i.fields[0].longAsString) : Y(i);
      }
      return o;
    }
  ];
}
function fa(e, n) {
  if (e.extendee.typeName != n.$typeName)
    throw new Error(`extension ${e.typeName} can only be applied to message ${e.extendee.typeName}`);
}
const ko = 3, Do = 2, er = {
  alwaysEmitImplicit: !1,
  enumAsInteger: !1,
  useProtoFieldName: !1
};
function Lo(e) {
  return e ? Object.assign(Object.assign({}, er), e) : er;
}
function Ro(e, n, t) {
  return Fe($(e, n), Lo(t));
}
function Uo(e, n, t) {
  var r;
  const a = Ro(e, n, t);
  return JSON.stringify(a, null, (r = t?.prettySpaces) !== null && r !== void 0 ? r : 0);
}
function Fe(e, n) {
  var t;
  const r = $o(e, n);
  if (r !== void 0)
    return r;
  const a = {};
  for (const s of e.sortedFields) {
    if (!e.isSet(s)) {
      if (s.presence == ko)
        throw new Error(`cannot encode ${s} to JSON: required field not set`);
      if (!n.alwaysEmitImplicit || s.presence !== Do)
        continue;
    }
    const o = nr(s, e.get(s), n);
    o !== void 0 && (a[Po(s, n)] = o);
  }
  if (n.registry) {
    const s = /* @__PURE__ */ new Set();
    for (const { no: o } of (t = e.getUnknown()) !== null && t !== void 0 ? t : [])
      if (!s.has(o)) {
        s.add(o);
        const i = n.registry.getExtensionFor(e.desc, o);
        if (!i)
          continue;
        const u = So(e.message, i), [c, d] = on(i, u), m = nr(d, c.get(d), n);
        m !== void 0 && (a[i.jsonName] = m);
      }
  }
  return a;
}
function nr(e, n, t) {
  switch (e.fieldKind) {
    case "scalar":
      return un(e, n);
    case "message":
      return Fe(n, t);
    case "enum":
      return st(e.enum, n, t.enumAsInteger);
    case "list":
      return Fo(n, t);
    case "map":
      return xo(n, t);
  }
}
function xo(e, n) {
  const t = e.field(), r = {};
  switch (t.mapKind) {
    case "scalar":
      for (const [a, s] of e)
        r[a] = un(t, s);
      break;
    case "message":
      for (const [a, s] of e)
        r[a] = Fe(s, n);
      break;
    case "enum":
      for (const [a, s] of e)
        r[a] = st(t.enum, s, n.enumAsInteger);
      break;
  }
  return n.alwaysEmitImplicit || e.size > 0 ? r : void 0;
}
function Fo(e, n) {
  const t = e.field(), r = [];
  switch (t.listKind) {
    case "scalar":
      for (const a of e)
        r.push(un(t, a));
      break;
    case "enum":
      for (const a of e)
        r.push(st(t.enum, a, n.enumAsInteger));
      break;
    case "message":
      for (const a of e)
        r.push(Fe(a, n));
      break;
  }
  return n.alwaysEmitImplicit || r.length > 0 ? r : void 0;
}
function st(e, n, t) {
  var r;
  if (typeof n != "number")
    throw new Error(`cannot encode ${e} to JSON: expected number, got ${T(n)}`);
  if (e.typeName == "google.protobuf.NullValue")
    return null;
  if (t)
    return n;
  const a = e.value[n];
  return (r = a?.name) !== null && r !== void 0 ? r : n;
}
function un(e, n) {
  var t, r, a, s, o, i;
  switch (e.scalar) {
    // int32, fixed32, uint32: JSON value will be a decimal number. Either numbers or strings are accepted.
    case l.INT32:
    case l.SFIXED32:
    case l.SINT32:
    case l.FIXED32:
    case l.UINT32:
      if (typeof n != "number")
        throw new Error(`cannot encode ${e} to JSON: ${(t = ne(e, n)) === null || t === void 0 ? void 0 : t.message}`);
      return n;
    // float, double: JSON value will be a number or one of the special string values "NaN", "Infinity", and "-Infinity".
    // Either numbers or strings are accepted. Exponent notation is also accepted.
    case l.FLOAT:
    case l.DOUBLE:
      if (typeof n != "number")
        throw new Error(`cannot encode ${e} to JSON: ${(r = ne(e, n)) === null || r === void 0 ? void 0 : r.message}`);
      return Number.isNaN(n) ? "NaN" : n === Number.POSITIVE_INFINITY ? "Infinity" : n === Number.NEGATIVE_INFINITY ? "-Infinity" : n;
    // string:
    case l.STRING:
      if (typeof n != "string")
        throw new Error(`cannot encode ${e} to JSON: ${(a = ne(e, n)) === null || a === void 0 ? void 0 : a.message}`);
      return n;
    // bool:
    case l.BOOL:
      if (typeof n != "boolean")
        throw new Error(`cannot encode ${e} to JSON: ${(s = ne(e, n)) === null || s === void 0 ? void 0 : s.message}`);
      return n;
    // JSON value will be a decimal string. Either numbers or strings are accepted.
    case l.UINT64:
    case l.FIXED64:
    case l.INT64:
    case l.SFIXED64:
    case l.SINT64:
      if (typeof n != "bigint" && typeof n != "string")
        throw new Error(`cannot encode ${e} to JSON: ${(o = ne(e, n)) === null || o === void 0 ? void 0 : o.message}`);
      return n.toString();
    // bytes: JSON value will be the data encoded as a string using standard base64 encoding with paddings.
    // Either standard or URL-safe base64 encoding with/without paddings are accepted.
    case l.BYTES:
      if (n instanceof Uint8Array)
        return Wr(n);
      throw new Error(`cannot encode ${e} to JSON: ${(i = ne(e, n)) === null || i === void 0 ? void 0 : i.message}`);
  }
}
function Po(e, n) {
  return n.useProtoFieldName ? e.name : e.jsonName;
}
function $o(e, n) {
  if (e.desc.typeName.startsWith("google.protobuf."))
    switch (e.desc.typeName) {
      case "google.protobuf.Any":
        return Vo(e.message, n);
      case "google.protobuf.Timestamp":
        return Bo(e.message);
      case "google.protobuf.Duration":
        return Yo(e.message);
      case "google.protobuf.FieldMask":
        return Mo(e.message);
      case "google.protobuf.Struct":
        return da(e.message);
      case "google.protobuf.Value":
        return ot(e.message);
      case "google.protobuf.ListValue":
        return ma(e.message);
      default:
        if (Ue(e.desc)) {
          const t = e.desc.fields[0];
          return un(t, e.get(t));
        }
        return;
    }
}
function Vo(e, n) {
  if (e.typeUrl === "")
    return {};
  const { registry: t } = n;
  let r, a;
  if (t && (r = vo(e, t), r && (a = t.getMessage(r.$typeName))), !a || !r)
    throw new Error(`cannot encode message ${e.$typeName} to JSON: "${e.typeUrl}" is not in the type registry`);
  let s = Fe($(a, r), n);
  return (a.typeName.startsWith("google.protobuf.") || s === null || Array.isArray(s) || typeof s != "object") && (s = { value: s }), s["@type"] = e.typeUrl, s;
}
function Yo(e) {
  const n = Number(e.seconds), t = e.nanos;
  if (n > 315576e6 || n < -315576e6)
    throw new Error(`cannot encode message ${e.$typeName} to JSON: value out of range`);
  if (n > 0 && t < 0 || n < 0 && t > 0)
    throw new Error(`cannot encode message ${e.$typeName} to JSON: nanos sign must match seconds sign`);
  let r = e.seconds.toString();
  if (t !== 0) {
    let a = Math.abs(t).toString();
    a = "0".repeat(9 - a.length) + a, a.substring(3) === "000000" ? a = a.substring(0, 3) : a.substring(6) === "000" && (a = a.substring(0, 6)), r += "." + a, t < 0 && n == 0 && (r = "-" + r);
  }
  return r + "s";
}
function Mo(e) {
  return e.paths.map((n) => {
    if (n.match(/_[0-9]?_/g) || n.match(/[A-Z]/g))
      throw new Error(`cannot encode message ${e.$typeName} to JSON: lowerCamelCase of path name "` + n + '" is irreversible');
    return Te(n);
  }).join(",");
}
function da(e) {
  const n = {};
  for (const [t, r] of Object.entries(e.fields))
    n[t] = ot(r);
  return n;
}
function ot(e) {
  switch (e.kind.case) {
    case "nullValue":
      return null;
    case "numberValue":
      if (!Number.isFinite(e.kind.value))
        throw new Error(`${e.$typeName} cannot be NaN or Infinity`);
      return e.kind.value;
    case "boolValue":
      return e.kind.value;
    case "stringValue":
      return e.kind.value;
    case "structValue":
      return da(e.kind.value);
    case "listValue":
      return ma(e.kind.value);
    default:
      throw new Error(`${e.$typeName} must have a value`);
  }
}
function ma(e) {
  return e.values.map(ot);
}
function Bo(e) {
  const n = Number(e.seconds) * 1e3;
  if (n < Date.parse("0001-01-01T00:00:00Z") || n > Date.parse("9999-12-31T23:59:59Z"))
    throw new Error(`cannot encode message ${e.$typeName} to JSON: must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive`);
  if (e.nanos < 0)
    throw new Error(`cannot encode message ${e.$typeName} to JSON: nanos must not be negative`);
  if (e.nanos > 999999999)
    throw new Error(`cannot encode message ${e.$typeName} to JSON: nanos must not be greater than 99999999`);
  let t = "Z";
  if (e.nanos > 0) {
    const r = (e.nanos + 1e9).toString().substring(1);
    r.substring(3) === "000000" ? t = "." + r.substring(0, 3) + "Z" : r.substring(6) === "000" ? t = "." + r.substring(0, 6) + "Z" : t = "." + r + "Z";
  }
  return new Date(n).toISOString().replace(".000Z", t);
}
const tr = {
  ignoreUnknownFields: !1
};
function Go(e) {
  return e ? Object.assign(Object.assign({}, tr), e) : tr;
}
function Co(e, n, t) {
  return ba(e, Ho(n, e.typeName), t);
}
function ba(e, n, t) {
  const r = $(e);
  try {
    he(r, n, Go(t));
  } catch (a) {
    throw vs(a) ? new Error(`cannot decode ${a.field()} from JSON: ${a.message}`, {
      cause: a
    }) : a;
  }
  return r.message;
}
function he(e, n, t) {
  var r;
  if (zo(e, n, t))
    return;
  if (n == null || Array.isArray(n) || typeof n != "object")
    throw new Error(`cannot decode ${e.desc} from JSON: ${T(n)}`);
  const a = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map();
  for (const o of e.desc.fields)
    s.set(o.name, o).set(o.jsonName, o);
  for (const [o, i] of Object.entries(n)) {
    const u = s.get(o);
    if (u) {
      if (u.oneof) {
        if (i === null && u.fieldKind == "scalar")
          continue;
        const c = a.get(u.oneof);
        if (c !== void 0)
          throw new R(u.oneof, `oneof set multiple times by ${c.name} and ${u.name}`);
        a.set(u.oneof, u);
      }
      rr(e, u, i, t);
    } else {
      let c;
      if (o.startsWith("[") && o.endsWith("]") && // biome-ignore lint/suspicious/noAssignInExpressions: no
      (c = (r = t.registry) === null || r === void 0 ? void 0 : r.getExtension(o.substring(1, o.length - 1))) && c.extendee.typeName === e.desc.typeName) {
        const [d, m, b] = on(c);
        rr(d, m, i, t), Oo(e.message, c, b());
      }
      if (!c && !t.ignoreUnknownFields)
        throw new Error(`cannot decode ${e.desc} from JSON: key "${o}" is unknown`);
    }
  }
}
function rr(e, n, t, r) {
  switch (n.fieldKind) {
    case "scalar":
      Wo(e, n, t);
      break;
    case "enum":
      jo(e, n, t, r);
      break;
    case "message":
      Xo(e, n, t, r);
      break;
    case "list":
      Jo(e.get(n), t, r);
      break;
    case "map":
      Ko(e.get(n), t, r);
      break;
  }
}
function Ko(e, n, t) {
  if (n === null)
    return;
  const r = e.field();
  if (typeof n != "object" || Array.isArray(n))
    throw new R(r, "expected object, got " + T(n));
  for (const [a, s] of Object.entries(n)) {
    if (s === null && !pa(r))
      throw new R(r, "map value must not be null");
    let o;
    switch (r.mapKind) {
      case "message":
        const u = $(r.message);
        he(u, s, t), o = u;
        break;
      case "enum":
        if (o = it(r.enum, s, t.ignoreUnknownFields, !0), o === cn)
          return;
        break;
      case "scalar":
        o = fn(r, s, !0);
        break;
    }
    const i = Zo(r.mapKey, a);
    e.set(i, o);
  }
}
function Jo(e, n, t) {
  if (n === null)
    return;
  const r = e.field();
  if (!Array.isArray(n))
    throw new R(r, "expected Array, got " + T(n));
  for (const a of n) {
    if (a === null && !pa(r))
      throw new R(r, "list item must not be null");
    switch (r.listKind) {
      case "message":
        const s = $(r.message);
        he(s, a, t), e.add(s);
        break;
      case "enum":
        const o = it(r.enum, a, t.ignoreUnknownFields, !0);
        o !== cn && e.add(o);
        break;
      case "scalar":
        e.add(fn(r, a, !0));
        break;
    }
  }
}
function pa(e) {
  var n, t;
  return ((n = e.message) === null || n === void 0 ? void 0 : n.typeName) == "google.protobuf.Value" || ((t = e.enum) === null || t === void 0 ? void 0 : t.typeName) == "google.protobuf.NullValue";
}
function Xo(e, n, t, r) {
  if (t === null && n.message.typeName != "google.protobuf.Value") {
    e.clear(n);
    return;
  }
  const a = e.isSet(n) ? e.get(n) : $(n.message);
  he(a, t, r), e.set(n, a);
}
function jo(e, n, t, r) {
  const a = it(n.enum, t, r.ignoreUnknownFields, !1);
  a === ln ? e.clear(n) : a !== cn && e.set(n, a);
}
function Wo(e, n, t) {
  const r = fn(n, t, !1);
  r === ln ? e.clear(n) : e.set(n, r);
}
const cn = /* @__PURE__ */ Symbol();
function it(e, n, t, r) {
  if (n === null)
    return e.typeName == "google.protobuf.NullValue" ? 0 : r ? e.values[0].number : ln;
  switch (typeof n) {
    case "number":
      if (Number.isInteger(n))
        return n;
      break;
    case "string":
      const a = e.values.find((s) => s.name === n);
      if (a !== void 0)
        return a.number;
      if (t)
        return cn;
      break;
  }
  throw new Error(`cannot decode ${e} from JSON: ${T(n)}`);
}
const ln = /* @__PURE__ */ Symbol();
function fn(e, n, t) {
  if (n === null)
    return t ? oe(e.scalar, !1) : ln;
  switch (e.scalar) {
    // float, double: JSON value will be a number or one of the special string values "NaN", "Infinity", and "-Infinity".
    // Either numbers or strings are accepted. Exponent notation is also accepted.
    case l.DOUBLE:
    case l.FLOAT:
      if (n === "NaN")
        return NaN;
      if (n === "Infinity")
        return Number.POSITIVE_INFINITY;
      if (n === "-Infinity")
        return Number.NEGATIVE_INFINITY;
      if (typeof n == "number") {
        if (Number.isNaN(n))
          throw new R(e, "unexpected NaN number");
        if (!Number.isFinite(n))
          throw new R(e, "unexpected infinite number");
        break;
      }
      if (typeof n == "string") {
        if (n === "" || n.trim().length !== n.length)
          break;
        const r = Number(n);
        if (!Number.isFinite(r))
          break;
        return r;
      }
      break;
    // int32, fixed32, uint32: JSON value will be a decimal number. Either numbers or strings are accepted.
    case l.INT32:
    case l.FIXED32:
    case l.SFIXED32:
    case l.SINT32:
    case l.UINT32:
      return ha(n);
    // bytes: JSON value will be the data encoded as a string using standard base64 encoding with paddings.
    // Either standard or URL-safe base64 encoding with/without paddings are accepted.
    case l.BYTES:
      if (typeof n == "string") {
        if (n === "")
          return new Uint8Array(0);
        try {
          return et(n);
        } catch (r) {
          const a = r instanceof Error ? r.message : String(r);
          throw new R(e, a);
        }
      }
      break;
  }
  return n;
}
function Zo(e, n) {
  switch (e) {
    case l.BOOL:
      switch (n) {
        case "true":
          return !0;
        case "false":
          return !1;
      }
      return n;
    case l.INT32:
    case l.FIXED32:
    case l.UINT32:
    case l.SFIXED32:
    case l.SINT32:
      return ha(n);
    default:
      return n;
  }
}
function ha(e) {
  if (typeof e == "string") {
    if (e === "" || e.trim().length !== e.length)
      return e;
    const n = Number(e);
    return Number.isNaN(n) ? e : n;
  }
  return e;
}
function Ho(e, n) {
  try {
    return JSON.parse(e);
  } catch (t) {
    const r = t instanceof Error ? t.message : String(t);
    throw new Error(
      `cannot decode message ${n} from JSON: ${r}`,
      // @ts-expect-error we use the ES2022 error CTOR option "cause" for better stack traces
      { cause: t }
    );
  }
}
function zo(e, n, t) {
  if (!e.desc.typeName.startsWith("google.protobuf."))
    return !1;
  switch (e.desc.typeName) {
    case "google.protobuf.Any":
      return qo(e.message, n, t), !0;
    case "google.protobuf.Timestamp":
      return Qo(e.message, n), !0;
    case "google.protobuf.Duration":
      return ei(e.message, n), !0;
    case "google.protobuf.FieldMask":
      return ni(e.message, n), !0;
    case "google.protobuf.Struct":
      return ga(e.message, n), !0;
    case "google.protobuf.Value":
      return ut(e.message, n), !0;
    case "google.protobuf.ListValue":
      return ya(e.message, n), !0;
    default:
      if (Ue(e.desc)) {
        const r = e.desc.fields[0];
        return n === null ? e.clear(r) : e.set(r, fn(r, n, !0)), !0;
      }
      return !1;
  }
}
function qo(e, n, t) {
  var r;
  if (n === null || Array.isArray(n) || typeof n != "object")
    throw new Error(`cannot decode message ${e.$typeName} from JSON: expected object but got ${T(n)}`);
  if (Object.keys(n).length == 0)
    return;
  const a = n["@type"];
  if (typeof a != "string" || a == "")
    throw new Error(`cannot decode message ${e.$typeName} from JSON: "@type" is empty`);
  const s = a.includes("/") ? a.substring(a.lastIndexOf("/") + 1) : a;
  if (!s.length)
    throw new Error(`cannot decode message ${e.$typeName} from JSON: "@type" is invalid`);
  const o = (r = t.registry) === null || r === void 0 ? void 0 : r.getMessage(s);
  if (!o)
    throw new Error(`cannot decode message ${e.$typeName} from JSON: ${a} is not in the type registry`);
  const i = $(o);
  if (s.startsWith("google.protobuf.") && Object.prototype.hasOwnProperty.call(n, "value")) {
    const u = n.value;
    he(i, u, t);
  } else {
    const u = Object.assign({}, n);
    delete u["@type"], he(i, u, t);
  }
  No(i.desc, i.message, e);
}
function Qo(e, n) {
  if (typeof n != "string")
    throw new Error(`cannot decode message ${e.$typeName} from JSON: ${T(n)}`);
  const t = n.match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})(?:\.([0-9]{1,9}))?(?:Z|([+-][0-9][0-9]:[0-9][0-9]))$/);
  if (!t)
    throw new Error(`cannot decode message ${e.$typeName} from JSON: invalid RFC 3339 string`);
  const r = Date.parse(
    // biome-ignore format: want this to read well
    t[1] + "-" + t[2] + "-" + t[3] + "T" + t[4] + ":" + t[5] + ":" + t[6] + (t[8] ? t[8] : "Z")
  );
  if (Number.isNaN(r))
    throw new Error(`cannot decode message ${e.$typeName} from JSON: invalid RFC 3339 string`);
  if (r < Date.parse("0001-01-01T00:00:00Z") || r > Date.parse("9999-12-31T23:59:59Z"))
    throw new Error(`cannot decode message ${e.$typeName} from JSON: must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive`);
  e.seconds = N.parse(r / 1e3), e.nanos = 0, t[7] && (e.nanos = parseInt("1" + t[7] + "0".repeat(9 - t[7].length)) - 1e9);
}
function ei(e, n) {
  if (typeof n != "string")
    throw new Error(`cannot decode message ${e.$typeName} from JSON: ${T(n)}`);
  const t = n.match(/^(-?[0-9]+)(?:\.([0-9]+))?s/);
  if (t === null)
    throw new Error(`cannot decode message ${e.$typeName} from JSON: ${T(n)}`);
  const r = Number(t[1]);
  if (r > 315576e6 || r < -315576e6)
    throw new Error(`cannot decode message ${e.$typeName} from JSON: ${T(n)}`);
  if (e.seconds = N.parse(r), typeof t[2] != "string")
    return;
  const a = t[2] + "0".repeat(9 - t[2].length);
  e.nanos = parseInt(a), (r < 0 || Object.is(r, -0)) && (e.nanos = -e.nanos);
}
function ni(e, n) {
  if (typeof n != "string")
    throw new Error(`cannot decode message ${e.$typeName} from JSON: ${T(n)}`);
  if (n === "")
    return;
  function t(r) {
    if (r.includes("_"))
      throw new Error(`cannot decode message ${e.$typeName} from JSON: path names must be lowerCamelCase`);
    const a = r.replace(/[A-Z]/g, (s) => "_" + s.toLowerCase());
    return a[0] === "_" ? a.substring(1) : a;
  }
  e.paths = n.split(",").map(t);
}
function ga(e, n) {
  if (typeof n != "object" || n == null || Array.isArray(n))
    throw new Error(`cannot decode message ${e.$typeName} from JSON ${T(n)}`);
  for (const [t, r] of Object.entries(n)) {
    const a = Y(la);
    ut(a, r), e.fields[t] = a;
  }
}
function ut(e, n) {
  switch (typeof n) {
    case "number":
      e.kind = { case: "numberValue", value: n };
      break;
    case "string":
      e.kind = { case: "stringValue", value: n };
      break;
    case "boolean":
      e.kind = { case: "boolValue", value: n };
      break;
    case "object":
      if (n === null)
        e.kind = { case: "nullValue", value: Un.NULL_VALUE };
      else if (Array.isArray(n)) {
        const t = Y(To);
        ya(t, n), e.kind = { case: "listValue", value: t };
      } else {
        const t = Y(wo);
        ga(t, n), e.kind = { case: "structValue", value: t };
      }
      break;
    default:
      throw new Error(`cannot decode message ${e.$typeName} from JSON ${T(n)}`);
  }
  return e;
}
function ya(e, n) {
  if (!Array.isArray(n))
    throw new Error(`cannot decode message ${e.$typeName} from JSON ${T(n)}`);
  for (const t of n) {
    const r = Y(la);
    ut(r, t), e.values.push(r);
  }
}
function xn(e) {
  const n = y[e];
  return typeof n != "string" ? e.toString() : n[0].toLowerCase() + n.substring(1).replace(/[A-Z]/g, (t) => "_" + t.toLowerCase());
}
let Ke;
function ti(e) {
  if (!Ke) {
    Ke = {};
    for (const n of Object.values(y))
      typeof n != "string" && (Ke[xn(n)] = n);
  }
  return Ke[e];
}
class I extends Error {
  /**
   * Create a new ConnectError.
   * If no code is provided, code "unknown" is used.
   * Outgoing details are only relevant for the server side - a service may
   * raise an error with details, and it is up to the protocol implementation
   * to encode and send the details along with the error.
   */
  constructor(n, t = y.Unknown, r, a, s) {
    super(ri(n, t)), this.name = "ConnectError", Object.setPrototypeOf(this, new.target.prototype), this.rawMessage = n, this.code = t, this.metadata = new Headers(r ?? {}), this.details = a ?? [], this.cause = s;
  }
  /**
   * Convert any value - typically a caught error into a ConnectError,
   * following these rules:
   * - If the value is already a ConnectError, return it as is.
   * - If the value is an AbortError or TimeoutError from the fetch API, return
   *   the message of the error with code Canceled.
   * - For other Errors, return the error message with code Unknown by default.
   * - For other values, return the values String representation as a message,
   *   with the code Unknown by default.
   * The original value will be used for the "cause" property for the new
   * ConnectError.
   */
  static from(n, t = y.Unknown) {
    return n instanceof I ? n : n instanceof Error ? n.name == "AbortError" || n.name == "TimeoutError" ? new I(n.message, y.Canceled) : new I(n.message, t, void 0, void 0, n) : new I(String(n), t, void 0, void 0, n);
  }
  static [Symbol.hasInstance](n) {
    return n instanceof Error ? Object.getPrototypeOf(n) === I.prototype ? !0 : n.name === "ConnectError" && "code" in n && typeof n.code == "number" && "metadata" in n && "details" in n && Array.isArray(n.details) && "rawMessage" in n && typeof n.rawMessage == "string" && "cause" in n : !1;
  }
  findDetails(n) {
    const t = n.kind === "message" ? {
      getMessage: (a) => a === n.typeName ? n : void 0
    } : n, r = [];
    for (const a of this.details) {
      if ("desc" in a) {
        t.getMessage(a.desc.typeName) && r.push(Y(a.desc, a.value));
        continue;
      }
      const s = t.getMessage(a.type);
      if (s)
        try {
          r.push(sn(s, a.value));
        } catch {
        }
    }
    return r;
  }
}
function ri(e, n) {
  return e.length ? `[${xn(n)}] ${e}` : `[${xn(n)}]`;
}
function ai(...e) {
  const n = new Headers();
  for (const t of e)
    t.forEach((r, a) => {
      n.append(a, r);
    });
  return n;
}
function si(e, n) {
  const t = {};
  for (const r of e.methods) {
    const a = n(r);
    a != null && (t[r.localName] = a);
  }
  return t;
}
const ar = 1;
function oi(e, n, t = !1) {
  if (n > e) {
    let r = `message size is larger than configured readMaxBytes ${e}`;
    throw t && (r = `message size ${n} is larger than configured readMaxBytes ${e}`), new I(r, y.ResourceExhausted);
  }
}
function ii(e) {
  return new ui(e);
}
class ui {
  constructor(n) {
    this.readMaxBytes = n, this.header = new Uint8Array(5), this.headerView = new DataView(this.header.buffer), this.buf = [];
  }
  get byteLength() {
    return this.buf.reduce((n, t) => n + t.byteLength, 0);
  }
  decode(n) {
    this.buf.push(n);
    const t = [];
    for (; ; ) {
      let r = this.pop();
      if (!r)
        break;
      t.push(r);
    }
    return t;
  }
  // consume an enveloped message
  pop() {
    if (!(!this.env && (this.env = this.head(), !this.env)) && this.cons(this.env.data)) {
      const n = this.env;
      return this.env = void 0, n;
    }
  }
  // consume header
  head() {
    if (!this.cons(this.header))
      return;
    const n = this.headerView.getUint8(0), t = this.headerView.getUint32(1);
    return oi(this.readMaxBytes, t, !0), {
      flags: n,
      data: new Uint8Array(t)
    };
  }
  // consume from buffer, fill target
  cons(n) {
    const t = n.byteLength;
    if (this.byteLength < t)
      return !1;
    let r = 0;
    for (; r < t; ) {
      const a = this.buf.shift();
      a.byteLength > t - r ? (n.set(a.subarray(0, t - r), r), this.buf.unshift(a.subarray(t - r)), r += t - r) : (n.set(a, r), r += a.byteLength);
    }
    return !0;
  }
}
function ci(e) {
  let n;
  const t = ii(4294967295);
  return new ReadableStream({
    start() {
      n = e.getReader();
    },
    async pull(r) {
      let a = !1;
      for (; !a; ) {
        const s = await n.read();
        if (s.done)
          t.byteLength > 0 && r.error(new I("protocol error: incomplete envelope", y.InvalidArgument)), r.close();
        else
          for (const o of t.decode(s.value))
            r.enqueue(o), a = !0;
      }
    }
  });
}
function li(e, n) {
  const t = new Uint8Array(n.length + 5);
  t.set(n, 5);
  const r = new DataView(t.buffer, t.byteOffset, t.byteLength);
  return r.setUint8(0, e), r.setUint32(1, n.length), t;
}
var fi = function(e) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var n = e[Symbol.asyncIterator], t;
  return n ? n.call(e) : (e = typeof __values == "function" ? __values(e) : e[Symbol.iterator](), t = {}, r("next"), r("throw"), r("return"), t[Symbol.asyncIterator] = function() {
    return this;
  }, t);
  function r(s) {
    t[s] = e[s] && function(o) {
      return new Promise(function(i, u) {
        o = e[s](o), a(i, u, o.done, o.value);
      });
    };
  }
  function a(s, o, i, u) {
    Promise.resolve(u).then(function(c) {
      s({ value: c, done: i });
    }, o);
  }
}, Ae = function(e) {
  return this instanceof Ae ? (this.v = e, this) : new Ae(e);
}, di = function(e, n, t) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var r = t.apply(e, n || []), a, s = [];
  return a = Object.create((typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype), i("next"), i("throw"), i("return", o), a[Symbol.asyncIterator] = function() {
    return this;
  }, a;
  function o(f) {
    return function(p) {
      return Promise.resolve(p).then(f, m);
    };
  }
  function i(f, p) {
    r[f] && (a[f] = function(h) {
      return new Promise(function(g, L) {
        s.push([f, h, g, L]) > 1 || u(f, h);
      });
    }, p && (a[f] = p(a[f])));
  }
  function u(f, p) {
    try {
      c(r[f](p));
    } catch (h) {
      b(s[0][3], h);
    }
  }
  function c(f) {
    f.value instanceof Ae ? Promise.resolve(f.value.v).then(d, m) : b(s[0][2], f);
  }
  function d(f) {
    u("next", f);
  }
  function m(f) {
    u("throw", f);
  }
  function b(f, p) {
    f(p), s.shift(), s.length && u(s[0][0], s[0][1]);
  }
}, mi = function(e) {
  var n, t;
  return n = {}, r("next"), r("throw", function(a) {
    throw a;
  }), r("return"), n[Symbol.iterator] = function() {
    return this;
  }, n;
  function r(a, s) {
    n[a] = e[a] ? function(o) {
      return (t = !t) ? { value: Ae(e[a](o)), done: !1 } : s ? s(o) : o;
    } : s;
  }
};
function bi(e) {
  return di(this, arguments, function* () {
    yield Ae(yield* mi(fi(e)));
  });
}
var Ea = function(e) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var n = e[Symbol.asyncIterator], t;
  return n ? n.call(e) : (e = typeof __values == "function" ? __values(e) : e[Symbol.iterator](), t = {}, r("next"), r("throw"), r("return"), t[Symbol.asyncIterator] = function() {
    return this;
  }, t);
  function r(s) {
    t[s] = e[s] && function(o) {
      return new Promise(function(i, u) {
        o = e[s](o), a(i, u, o.done, o.value);
      });
    };
  }
  function a(s, o, i, u) {
    Promise.resolve(u).then(function(c) {
      s({ value: c, done: i });
    }, o);
  }
}, ge = function(e) {
  return this instanceof ge ? (this.v = e, this) : new ge(e);
}, pi = function(e) {
  var n, t;
  return n = {}, r("next"), r("throw", function(a) {
    throw a;
  }), r("return"), n[Symbol.iterator] = function() {
    return this;
  }, n;
  function r(a, s) {
    n[a] = e[a] ? function(o) {
      return (t = !t) ? { value: ge(e[a](o)), done: !1 } : s ? s(o) : o;
    } : s;
  }
}, hi = function(e, n, t) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var r = t.apply(e, n || []), a, s = [];
  return a = Object.create((typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype), i("next"), i("throw"), i("return", o), a[Symbol.asyncIterator] = function() {
    return this;
  }, a;
  function o(f) {
    return function(p) {
      return Promise.resolve(p).then(f, m);
    };
  }
  function i(f, p) {
    r[f] && (a[f] = function(h) {
      return new Promise(function(g, L) {
        s.push([f, h, g, L]) > 1 || u(f, h);
      });
    }, p && (a[f] = p(a[f])));
  }
  function u(f, p) {
    try {
      c(r[f](p));
    } catch (h) {
      b(s[0][3], h);
    }
  }
  function c(f) {
    f.value instanceof ge ? Promise.resolve(f.value.v).then(d, m) : b(s[0][2], f);
  }
  function d(f) {
    u("next", f);
  }
  function m(f) {
    u("throw", f);
  }
  function b(f, p) {
    f(p), s.shift(), s.length && u(s[0][0], s[0][1]);
  }
};
function gi(e, n) {
  return si(e, (t) => {
    switch (t.methodKind) {
      case "unary":
        return yi(n, t);
      case "server_streaming":
        return Ei(n, t);
      case "client_streaming":
        return Ni(n, t);
      case "bidi_streaming":
        return _i(n, t);
      default:
        return null;
    }
  });
}
function yi(e, n) {
  return async (t, r) => {
    var a, s;
    const o = await e.unary(n, r?.signal, r?.timeoutMs, r?.headers, t, r?.contextValues);
    return (a = r?.onHeader) === null || a === void 0 || a.call(r, o.header), (s = r?.onTrailer) === null || s === void 0 || s.call(r, o.trailer), o.message;
  };
}
function Ei(e, n) {
  return (t, r) => Na(e.stream(n, r?.signal, r?.timeoutMs, r?.headers, bi([t]), r?.contextValues), r);
}
function Ni(e, n) {
  return async (t, r) => {
    var a, s, o, i, u, c;
    const d = await e.stream(n, r?.signal, r?.timeoutMs, r?.headers, t, r?.contextValues);
    (u = r?.onHeader) === null || u === void 0 || u.call(r, d.header);
    let m, b = 0;
    try {
      for (var f = !0, p = Ea(d.message), h; h = await p.next(), a = h.done, !a; f = !0)
        i = h.value, f = !1, m = i, b++;
    } catch (g) {
      s = { error: g };
    } finally {
      try {
        !f && !a && (o = p.return) && await o.call(p);
      } finally {
        if (s) throw s.error;
      }
    }
    if (!m)
      throw new I("protocol error: missing response message", y.Unimplemented);
    if (b > 1)
      throw new I("protocol error: received extra messages for client streaming method", y.Unimplemented);
    return (c = r?.onTrailer) === null || c === void 0 || c.call(r, d.trailer), m;
  };
}
function _i(e, n) {
  return (t, r) => Na(e.stream(n, r?.signal, r?.timeoutMs, r?.headers, t, r?.contextValues), r);
}
function Na(e, n) {
  const t = (function() {
    return hi(this, arguments, function* () {
      var r, a;
      const s = yield ge(e);
      (r = n?.onHeader) === null || r === void 0 || r.call(n, s.header), yield ge(yield* pi(Ea(s.message))), (a = n?.onTrailer) === null || a === void 0 || a.call(n, s.trailer);
    });
  })()[Symbol.asyncIterator]();
  return {
    [Symbol.asyncIterator]: () => ({
      next: () => t.next()
    })
  };
}
function vi(...e) {
  const n = new AbortController(), t = e.filter((a) => a !== void 0).concat(n.signal);
  for (const a of t) {
    if (a.aborted) {
      r.apply(a);
      break;
    }
    a.addEventListener("abort", r);
  }
  function r() {
    n.signal.aborted || n.abort(_a(this));
    for (const a of t)
      a.removeEventListener("abort", r);
  }
  return n;
}
function Ii(e) {
  const n = new AbortController(), t = () => {
    n.abort(new I("the operation timed out", y.DeadlineExceeded));
  };
  let r;
  return e !== void 0 && (e <= 0 ? t() : r = setTimeout(t, e)), {
    signal: n.signal,
    cleanup: () => clearTimeout(r)
  };
}
function _a(e) {
  if (!e.aborted)
    return;
  if (e.reason !== void 0)
    return e.reason;
  const n = new Error("This operation was aborted");
  return n.name = "AbortError", n;
}
function sr() {
  return {
    get(e) {
      return e.id in this ? this[e.id] : e.defaultValue;
    },
    set(e, n) {
      return this[e.id] = n, this;
    },
    delete(e) {
      return delete this[e.id], this;
    }
  };
}
function or(e, n) {
  return e.toString().replace(/\/?$/, `/${n.parent.typeName}/${n.name}`);
}
function va(e, n) {
  return Y(e, n);
}
function wi(e, n) {
  function t(r) {
    return r.done === !0 ? r : {
      done: r.done,
      value: va(e, r.value)
    };
  }
  return {
    [Symbol.asyncIterator]() {
      const r = n[Symbol.asyncIterator](), a = {
        next: () => r.next().then(t)
      };
      return r.throw !== void 0 && (a.throw = (s) => r.throw(s).then(t)), r.return !== void 0 && (a.return = (s) => r.return(s).then(t)), a;
    }
  };
}
function Ia(e, n) {
  if (!n)
    return e;
  for (const t of n.concat().reverse())
    e = t(e);
  return e;
}
function wa(e) {
  var n;
  const t = Object.assign({}, e);
  return (n = t.ignoreUnknownFields) !== null && n !== void 0 || (t.ignoreUnknownFields = !0), t;
}
function ir(e, n, t, r) {
  const a = n ? ur(e.input, r) : cr(e.input, t);
  return { parse: (n ? ur(e.output, r) : cr(e.output, t)).parse, serialize: a.serialize };
}
function ur(e, n) {
  return {
    parse(t) {
      try {
        return sn(e, t, n);
      } catch (r) {
        const a = r instanceof Error ? r.message : String(r);
        throw new I(`parse binary: ${a}`, y.Internal);
      }
    },
    serialize(t) {
      try {
        return sa(e, t, n);
      } catch (r) {
        const a = r instanceof Error ? r.message : String(r);
        throw new I(`serialize binary: ${a}`, y.Internal);
      }
    }
  };
}
function cr(e, n) {
  var t, r;
  const a = (t = n?.textEncoder) !== null && t !== void 0 ? t : new TextEncoder(), s = (r = n?.textDecoder) !== null && r !== void 0 ? r : new TextDecoder(), o = wa(n);
  return {
    parse(i) {
      try {
        const u = s.decode(i);
        return Co(e, u, o);
      } catch (u) {
        throw I.from(u, y.InvalidArgument);
      }
    },
    serialize(i) {
      try {
        const u = Uo(e, i, o);
        return a.encode(u);
      } catch (u) {
        throw I.from(u, y.Internal);
      }
    }
  };
}
const Ti = /^application\/(connect\+)?(?:(json)(?:; ?charset=utf-?8)?|(proto))$/i, Si = "application/proto", Oi = "application/json", Ai = "application/connect+proto", ki = "application/connect+json";
function Di(e) {
  const n = e?.match(Ti);
  if (!n)
    return;
  const t = !!n[1], r = !!n[3];
  return { stream: t, binary: r };
}
function Ta(e, n, t) {
  var r;
  if (n && new Headers(n).forEach((i, u) => t.metadata.append(u, i)), typeof e != "object" || e == null || Array.isArray(e))
    throw t;
  let a = t.code;
  "code" in e && typeof e.code == "string" && (a = (r = ti(e.code)) !== null && r !== void 0 ? r : a);
  const s = e.message;
  if (s != null && typeof s != "string")
    throw t;
  const o = new I(s ?? "", a, n);
  if ("details" in e && Array.isArray(e.details))
    for (const i of e.details) {
      if (i === null || typeof i != "object" || Array.isArray(i) || typeof i.type != "string" || typeof i.value != "string")
        throw t;
      try {
        o.details.push({
          type: i.type,
          value: et(i.value),
          debug: i.debug
        });
      } catch {
        throw t;
      }
    }
  return o;
}
const lr = 2;
function Li(e) {
  const n = new I("invalid end stream", y.Unknown);
  let t;
  try {
    t = JSON.parse(typeof e == "string" ? e : new TextDecoder().decode(e));
  } catch {
    throw n;
  }
  if (typeof t != "object" || t == null || Array.isArray(t))
    throw n;
  const r = new Headers();
  if ("metadata" in t) {
    if (typeof t.metadata != "object" || t.metadata == null || Array.isArray(t.metadata))
      throw n;
    for (const [s, o] of Object.entries(t.metadata)) {
      if (!Array.isArray(o) || o.some((i) => typeof i != "string"))
        throw n;
      for (const i of o)
        r.append(s, i);
    }
  }
  const a = "error" in t && t.error != null ? Ta(t.error, r, n) : void 0;
  return { metadata: r, error: a };
}
const ze = "Content-Type", Ri = "Content-Length", fr = "Content-Encoding", Ui = "Accept-Encoding", xi = "Connect-Timeout-Ms", Sa = "Connect-Protocol-Version", Fi = "User-Agent";
function Pi(e) {
  switch (e) {
    case 400:
      return y.Internal;
    case 401:
      return y.Unauthenticated;
    case 403:
      return y.PermissionDenied;
    case 404:
      return y.Unimplemented;
    case 429:
      return y.Unavailable;
    case 502:
      return y.Unavailable;
    case 503:
      return y.Unavailable;
    case 504:
      return y.Unavailable;
    default:
      return y.Unknown;
  }
}
function dr(e) {
  const n = new Headers(), t = new Headers();
  return e.forEach((r, a) => {
    a.toLowerCase().startsWith("trailer-") ? t.append(a.substring(8), r) : n.append(a, r);
  }), [n, t];
}
const Oa = "1";
function mr(e, n, t, r, a) {
  const s = new Headers(r ?? {});
  return t !== void 0 && s.set(xi, `${t}`), s.set(ze, e == "unary" ? n ? Si : Oi : n ? Ai : ki), s.set(Sa, Oa), s.has(Fi), s;
}
function br(e, n, t, r) {
  const a = r.get(ze), s = Di(a);
  if (t !== 200) {
    const i = new I(`HTTP ${t}`, Pi(t), r);
    if (e == "unary" && s && !s.binary)
      return { isUnaryError: !0, unaryError: i };
    throw i;
  }
  const o = {
    binary: n,
    stream: e !== "unary"
  };
  if (s?.binary !== o.binary || s.stream !== o.stream)
    throw new I(`unsupported content type ${a}`, s === void 0 ? y.Unknown : y.Internal, r);
  return { isUnaryError: !1 };
}
const pr = "application/";
function $i(e, n) {
  return n ? Wr(e, "url") : encodeURIComponent(new TextDecoder().decode(e));
}
function Vi(e, n, t) {
  let r = `?connect=v${Oa}`;
  const a = e.header.get(ze);
  a?.indexOf(pr) === 0 && (r += "&encoding=" + encodeURIComponent(a.slice(pr.length)));
  const s = e.header.get(fr);
  s !== null && s !== "identity" && (r += "&compression=" + encodeURIComponent(s), t = !0), t && (r += "&base64=1"), r += "&message=" + $i(n, t);
  const o = e.url + r, i = new Headers(e.header);
  for (const u of [
    Sa,
    ze,
    Ri,
    fr,
    Ui
  ])
    i.delete(u);
  return Object.assign(Object.assign({}, e), {
    requestMethod: "GET",
    url: o,
    header: i
  });
}
function Yi(e) {
  const n = Ia(e.next, e.interceptors), [t, r, a] = Aa(e), s = Object.assign(Object.assign({}, e.req), { message: va(e.req.method.input, e.req.message), signal: t });
  return n(s).then((o) => (a(), o), r);
}
function Mi(e) {
  const n = Ia(e.next, e.interceptors), [t, r, a] = Aa(e), s = Object.assign(Object.assign({}, e.req), { message: wi(e.req.method.input, e.req.message), signal: t });
  let o = !1;
  return t.addEventListener("abort", function() {
    var i, u;
    const c = e.req.message[Symbol.asyncIterator]();
    o || (i = c.throw) === null || i === void 0 || i.call(c, this.reason).catch(() => {
    }), (u = c.return) === null || u === void 0 || u.call(c).catch(() => {
    });
  }), n(s).then((i) => Object.assign(Object.assign({}, i), { message: {
    [Symbol.asyncIterator]() {
      const u = i.message[Symbol.asyncIterator]();
      return {
        next() {
          return u.next().then((c) => (c.done == !0 && (o = !0, a()), c), r);
        }
        // We deliberately omit throw/return.
      };
    }
  } }), r);
}
function Aa(e) {
  const { signal: n, cleanup: t } = Ii(e.timeoutMs), r = vi(e.signal, n);
  return [
    r.signal,
    function(s) {
      const o = I.from(n.aborted ? _a(n) : s);
      return r.abort(o), t(), Promise.reject(o);
    },
    function() {
      t(), r.abort();
    }
  ];
}
function Bi() {
  try {
    new Headers();
  } catch {
    throw new Error("connect-web requires the fetch API. Are you running on an old version of Node.js? Node.js is not supported in Connect for Web - please stay tuned for Connect for Node.");
  }
}
var ke = function(e) {
  return this instanceof ke ? (this.v = e, this) : new ke(e);
}, Gi = function(e, n, t) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var r = t.apply(e, n || []), a, s = [];
  return a = Object.create((typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype), i("next"), i("throw"), i("return", o), a[Symbol.asyncIterator] = function() {
    return this;
  }, a;
  function o(f) {
    return function(p) {
      return Promise.resolve(p).then(f, m);
    };
  }
  function i(f, p) {
    r[f] && (a[f] = function(h) {
      return new Promise(function(g, L) {
        s.push([f, h, g, L]) > 1 || u(f, h);
      });
    }, p && (a[f] = p(a[f])));
  }
  function u(f, p) {
    try {
      c(r[f](p));
    } catch (h) {
      b(s[0][3], h);
    }
  }
  function c(f) {
    f.value instanceof ke ? Promise.resolve(f.value.v).then(d, m) : b(s[0][2], f);
  }
  function d(f) {
    u("next", f);
  }
  function m(f) {
    u("throw", f);
  }
  function b(f, p) {
    f(p), s.shift(), s.length && u(s[0][0], s[0][1]);
  }
};
const hr = {
  redirect: "error"
};
function Ci(e) {
  var n;
  Bi();
  const t = (n = e.useBinaryFormat) !== null && n !== void 0 ? n : !1;
  return {
    async unary(r, a, s, o, i, u) {
      const { serialize: c, parse: d } = ir(r, t, e.jsonOptions, e.binaryOptions);
      return s = s === void 0 ? e.defaultTimeoutMs : s <= 0 ? void 0 : s, await Yi({
        interceptors: e.interceptors,
        signal: a,
        timeoutMs: s,
        req: {
          stream: !1,
          service: r.parent,
          method: r,
          requestMethod: "POST",
          url: or(e.baseUrl, r),
          header: mr(r.methodKind, t, s, o, !1),
          contextValues: u ?? sr(),
          message: i
        },
        next: async (m) => {
          var b;
          const f = e.useHttpGet === !0 && r.idempotency === Rn.NO_SIDE_EFFECTS;
          let p = null;
          f ? m = Vi(m, c(m.message), t) : p = c(m.message);
          const g = await ((b = e.fetch) !== null && b !== void 0 ? b : globalThis.fetch)(m.url, Object.assign(Object.assign({}, hr), { method: m.requestMethod, headers: m.header, signal: m.signal, body: p })), { isUnaryError: L, unaryError: W } = br(r.methodKind, t, g.status, g.headers);
          if (L)
            throw Ta(await g.json(), ai(...dr(g.headers)), W);
          const [Ye, Me] = dr(g.headers);
          return {
            stream: !1,
            service: r.parent,
            method: r,
            header: Ye,
            message: t ? d(new Uint8Array(await g.arrayBuffer())) : ba(r.output, await g.json(), wa(e.jsonOptions)),
            trailer: Me
          };
        }
      });
    },
    async stream(r, a, s, o, i, u) {
      const { serialize: c, parse: d } = ir(r, t, e.jsonOptions, e.binaryOptions);
      function m(f, p, h, g) {
        return Gi(this, arguments, function* () {
          const W = ci(f).getReader();
          let Ye = !1;
          for (; ; ) {
            const Me = yield ke(W.read());
            if (Me.done)
              break;
            const { flags: bt, data: pt } = Me.value;
            if ((bt & ar) === ar)
              throw new I("protocol error: received unsupported compressed output", y.Internal);
            if ((bt & lr) === lr) {
              Ye = !0;
              const bn = Li(pt);
              if (bn.error) {
                const Be = bn.error;
                throw h.forEach((pn, rs) => {
                  Be.metadata.append(rs, pn);
                }), Be;
              }
              bn.metadata.forEach((Be, pn) => p.set(pn, Be));
              continue;
            }
            yield yield ke(d(pt));
          }
          if ("throwIfAborted" in g && g.throwIfAborted(), !Ye)
            throw "missing EndStreamResponse";
        });
      }
      async function b(f) {
        if (r.methodKind != "server_streaming")
          throw "The fetch API does not support streaming request bodies";
        const p = await f[Symbol.asyncIterator]().next();
        if (p.done == !0)
          throw "missing request message";
        return li(0, c(p.value));
      }
      return s = s === void 0 ? e.defaultTimeoutMs : s <= 0 ? void 0 : s, await Mi({
        interceptors: e.interceptors,
        timeoutMs: s,
        signal: a,
        req: {
          stream: !0,
          service: r.parent,
          method: r,
          requestMethod: "POST",
          url: or(e.baseUrl, r),
          header: mr(r.methodKind, t, s, o, !1),
          contextValues: u ?? sr(),
          message: i
        },
        next: async (f) => {
          var p;
          const g = await ((p = e.fetch) !== null && p !== void 0 ? p : globalThis.fetch)(f.url, Object.assign(Object.assign({}, hr), { method: f.requestMethod, headers: f.header, signal: f.signal, body: await b(f.message) }));
          if (br(r.methodKind, t, g.status, g.headers), g.body === null)
            throw "missing response body";
          const L = new Headers();
          return Object.assign(Object.assign({}, f), { header: g.headers, trailer: L, message: m(g.body, L, g.headers, f.signal) });
        }
      });
    }
  };
}
const Ki = Ci({
  baseUrl: "/api",
  useBinaryFormat: !0,
  fetch: (e, n) => {
    const t = n?.headers ?? {};
    return fetch(e, {
      ...n,
      headers: {
        ...t,
        "qt-widget-id": window.qtWidgetId
      }
    });
  }
});
function ju(e) {
  return gi(e, Ki);
}
const Ji = 2, O = /* @__PURE__ */ Symbol(), Fn = !1;
var Xi = Array.isArray, ji = Array.prototype.indexOf, In = Object.getOwnPropertyDescriptor, Wi = Object.prototype, Zi = Array.prototype, Hi = Object.getPrototypeOf;
function zi(e) {
  for (var n = 0; n < e.length; n++)
    e[n]();
}
function ka() {
  var e, n, t = new Promise((r, a) => {
    e = r, n = a;
  });
  return { promise: t, resolve: e, reject: n };
}
const S = 2, Da = 4, La = 8, qi = 1 << 24, ue = 16, Pe = 32, Ne = 64, ct = 128, M = 512, k = 1024, x = 2048, G = 4096, me = 8192, H = 16384, Ra = 32768, gr = 65536, yr = 1 << 17, Ua = 1 << 18, lt = 1 << 19, Qi = 1 << 20, ie = 32768, Pn = 1 << 21, ft = 1 << 22, z = 1 << 23, wn = /* @__PURE__ */ Symbol("$state"), le = new class extends Error {
  name = "StaleReactionError";
  message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}();
function eu() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function nu() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function tu() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function ru() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function au() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function xa(e) {
  return e === this.v;
}
let su = !1, j = null;
function qe(e) {
  j = e;
}
function ou(e, n = !1, t) {
  j = {
    p: j,
    i: !1,
    c: null,
    e: null,
    s: e,
    x: null,
    l: null
  };
}
function iu(e) {
  var n = (
    /** @type {ComponentContext} */
    j
  ), t = n.e;
  if (t !== null) {
    n.e = null;
    for (var r of t)
      Tu(r);
  }
  return n.i = !0, j = n.p, /** @type {T} */
  {};
}
function Fa() {
  return !0;
}
let fe = [];
function uu() {
  var e = fe;
  fe = [], zi(e);
}
function cu(e) {
  if (fe.length === 0) {
    var n = fe;
    queueMicrotask(() => {
      n === fe && uu();
    });
  }
  fe.push(e);
}
function lu(e) {
  var n = _;
  if (n === null)
    return E.f |= z, e;
  if ((n.f & Ra) === 0) {
    if ((n.f & ct) === 0)
      throw e;
    n.b.error(e);
  } else
    Qe(e, n);
}
function Qe(e, n) {
  for (; n !== null; ) {
    if ((n.f & ct) !== 0)
      try {
        n.b.error(e);
        return;
      } catch (t) {
        e = t;
      }
    n = n.parent;
  }
  throw e;
}
const Je = /* @__PURE__ */ new Set();
let w = null, P = null, B = [], dt = null, $n = !1;
class De {
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
  #a = /* @__PURE__ */ new Set();
  /**
   * The number of async effects that are currently in flight
   */
  #e = 0;
  /**
   * The number of async effects that are currently in flight, _not_ inside a pending boundary
   */
  #n = 0;
  /**
   * A deferred that resolves when the batch is committed, used with `settled()`
   * TODO replace with Promise.withResolvers once supported widely enough
   * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
   */
  #i = null;
  /**
   * Deferred effects (which run after async work has completed) that are DIRTY
   * @type {Set<Effect>}
   */
  #s = /* @__PURE__ */ new Set();
  /**
   * Deferred effects that are MAYBE_DIRTY
   * @type {Set<Effect>}
   */
  #o = /* @__PURE__ */ new Set();
  /**
   * A set of branches that still exist, but will be destroyed when this batch
   * is committed — we skip over these during `process`
   * @type {Set<Effect>}
   */
  skipped_effects = /* @__PURE__ */ new Set();
  is_fork = !1;
  is_deferred() {
    return this.is_fork || this.#n > 0;
  }
  /**
   *
   * @param {Effect[]} root_effects
   */
  process(n) {
    B = [], this.apply();
    var t = {
      parent: null,
      effect: null,
      effects: [],
      render_effects: []
    };
    for (const r of n)
      this.#u(r, t);
    this.is_fork || this.#l(), this.is_deferred() ? (this.#t(t.effects), this.#t(t.render_effects)) : (w = null, Er(t.render_effects), Er(t.effects), this.#i?.resolve()), P = null;
  }
  /**
   * Traverse the effect tree, executing effects or stashing
   * them for later execution as appropriate
   * @param {Effect} root
   * @param {EffectTarget} target
   */
  #u(n, t) {
    n.f ^= k;
    for (var r = n.first; r !== null; ) {
      var a = r.f, s = (a & (Pe | Ne)) !== 0, o = s && (a & k) !== 0, i = o || (a & me) !== 0 || this.skipped_effects.has(r);
      if ((r.f & ct) !== 0 && r.b?.is_pending() && (t = {
        parent: t,
        effect: r,
        effects: [],
        render_effects: []
      }), !i && r.fn !== null) {
        s ? r.f ^= k : (a & Da) !== 0 ? t.effects.push(r) : Ve(r) && ((r.f & ue) !== 0 && this.#s.add(r), Re(r));
        var u = r.first;
        if (u !== null) {
          r = u;
          continue;
        }
      }
      var c = r.parent;
      for (r = r.next; r === null && c !== null; )
        c === t.effect && (this.#t(t.effects), this.#t(t.render_effects), t = /** @type {EffectTarget} */
        t.parent), r = c.next, c = c.parent;
    }
  }
  /**
   * @param {Effect[]} effects
   */
  #t(n) {
    for (const t of n)
      (t.f & x) !== 0 ? this.#s.add(t) : (t.f & G) !== 0 && this.#o.add(t), this.#c(t.deps), D(t, k);
  }
  /**
   * @param {Value[] | null} deps
   */
  #c(n) {
    if (n !== null)
      for (const t of n)
        (t.f & S) === 0 || (t.f & ie) === 0 || (t.f ^= ie, this.#c(
          /** @type {Derived} */
          t.deps
        ));
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Source} source
   * @param {any} value
   */
  capture(n, t) {
    this.previous.has(n) || this.previous.set(n, t), (n.f & z) === 0 && (this.current.set(n, n.v), P?.set(n, n.v));
  }
  activate() {
    w = this, this.apply();
  }
  deactivate() {
    w === this && (w = null, P = null);
  }
  flush() {
    if (this.activate(), B.length > 0) {
      if (fu(), w !== null && w !== this)
        return;
    } else this.#e === 0 && this.process([]);
    this.deactivate();
  }
  discard() {
    for (const n of this.#a) n(this);
    this.#a.clear();
  }
  #l() {
    if (this.#n === 0) {
      for (const n of this.#r) n();
      this.#r.clear();
    }
    this.#e === 0 && this.#f();
  }
  #f() {
    if (Je.size > 1) {
      this.previous.clear();
      var n = P, t = !0, r = {
        parent: null,
        effect: null,
        effects: [],
        render_effects: []
      };
      for (const s of Je) {
        if (s === this) {
          t = !1;
          continue;
        }
        const o = [];
        for (const [u, c] of this.current) {
          if (s.current.has(u))
            if (t && c !== s.current.get(u))
              s.current.set(u, c);
            else
              continue;
          o.push(u);
        }
        if (o.length === 0)
          continue;
        const i = [...s.current.keys()].filter((u) => !this.current.has(u));
        if (i.length > 0) {
          var a = B;
          B = [];
          const u = /* @__PURE__ */ new Set(), c = /* @__PURE__ */ new Map();
          for (const d of o)
            Pa(d, i, u, c);
          if (B.length > 0) {
            w = s, s.apply();
            for (const d of B)
              s.#u(d, r);
            s.deactivate();
          }
          B = a;
        }
      }
      w = null, P = n;
    }
    this.committed = !0, Je.delete(this);
  }
  /**
   *
   * @param {boolean} blocking
   */
  increment(n) {
    this.#e += 1, n && (this.#n += 1);
  }
  /**
   *
   * @param {boolean} blocking
   */
  decrement(n) {
    this.#e -= 1, n && (this.#n -= 1), this.revive();
  }
  revive() {
    for (const n of this.#s)
      this.#o.delete(n), D(n, x), ye(n);
    for (const n of this.#o)
      D(n, G), ye(n);
    this.flush();
  }
  /** @param {() => void} fn */
  oncommit(n) {
    this.#r.add(n);
  }
  /** @param {(batch: Batch) => void} fn */
  ondiscard(n) {
    this.#a.add(n);
  }
  settled() {
    return (this.#i ??= ka()).promise;
  }
  static ensure() {
    if (w === null) {
      const n = w = new De();
      Je.add(w), De.enqueue(() => {
        w === n && n.flush();
      });
    }
    return w;
  }
  /** @param {() => void} task */
  static enqueue(n) {
    cu(n);
  }
  apply() {
  }
}
function fu() {
  var e = ae;
  $n = !0;
  var n = null;
  try {
    var t = 0;
    for (tn(!0); B.length > 0; ) {
      var r = De.ensure();
      if (t++ > 1e3) {
        var a, s;
        du();
      }
      r.process(B), q.clear();
    }
  } finally {
    $n = !1, tn(e), dt = null;
  }
}
function du() {
  try {
    nu();
  } catch (e) {
    Qe(e, dt);
  }
}
let K = null;
function Er(e) {
  var n = e.length;
  if (n !== 0) {
    for (var t = 0; t < n; ) {
      var r = e[t++];
      if ((r.f & (H | me)) === 0 && Ve(r) && (K = /* @__PURE__ */ new Set(), Re(r), r.deps === null && r.first === null && r.nodes === null && (r.teardown === null && r.ac === null ? Wa(r) : r.fn = null), K?.size > 0)) {
        q.clear();
        for (const a of K) {
          if ((a.f & (H | me)) !== 0) continue;
          const s = [a];
          let o = a.parent;
          for (; o !== null; )
            K.has(o) && (K.delete(o), s.push(o)), o = o.parent;
          for (let i = s.length - 1; i >= 0; i--) {
            const u = s[i];
            (u.f & (H | me)) === 0 && Re(u);
          }
        }
        K.clear();
      }
    }
    K = null;
  }
}
function Pa(e, n, t, r) {
  if (!t.has(e) && (t.add(e), e.reactions !== null))
    for (const a of e.reactions) {
      const s = a.f;
      (s & S) !== 0 ? Pa(
        /** @type {Derived} */
        a,
        n,
        t,
        r
      ) : (s & (ft | ue)) !== 0 && (s & x) === 0 && $a(a, n, r) && (D(a, x), ye(
        /** @type {Effect} */
        a
      ));
    }
}
function $a(e, n, t) {
  const r = t.get(e);
  if (r !== void 0) return r;
  if (e.deps !== null)
    for (const a of e.deps) {
      if (n.includes(a))
        return !0;
      if ((a.f & S) !== 0 && $a(
        /** @type {Derived} */
        a,
        n,
        t
      ))
        return t.set(
          /** @type {Derived} */
          a,
          !0
        ), !0;
    }
  return t.set(e, !1), !1;
}
function ye(e) {
  for (var n = dt = e; n.parent !== null; ) {
    n = n.parent;
    var t = n.f;
    if ($n && n === _ && (t & ue) !== 0 && (t & Ua) === 0)
      return;
    if ((t & (Ne | Pe)) !== 0) {
      if ((t & k) === 0) return;
      n.f ^= k;
    }
  }
  B.push(n);
}
function mu(e, n, t, r) {
  const a = pu;
  if (t.length === 0 && e.length === 0) {
    r(n.map(a));
    return;
  }
  var s = w, o = (
    /** @type {Effect} */
    _
  ), i = bu();
  function u() {
    Promise.all(t.map((c) => /* @__PURE__ */ hu(c))).then((c) => {
      i();
      try {
        r([...n.map(a), ...c]);
      } catch (d) {
        (o.f & H) === 0 && Qe(d, o);
      }
      s?.deactivate(), en();
    }).catch((c) => {
      Qe(c, o);
    });
  }
  e.length > 0 ? Promise.all(e).then(() => {
    i();
    try {
      return u();
    } finally {
      s?.deactivate(), en();
    }
  }) : u();
}
function bu() {
  var e = _, n = E, t = j, r = w;
  return function(s = !0) {
    Ee(e), ee(n), qe(t), s && r?.activate();
  };
}
function en() {
  Ee(null), ee(null), qe(null);
}
// @__NO_SIDE_EFFECTS__
function pu(e) {
  var n = S | x, t = E !== null && (E.f & S) !== 0 ? (
    /** @type {Derived} */
    E
  ) : null;
  return _ !== null && (_.f |= lt), {
    ctx: j,
    deps: null,
    effects: null,
    equals: xa,
    f: n,
    fn: e,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      O
    ),
    wv: 0,
    parent: t ?? _,
    ac: null
  };
}
// @__NO_SIDE_EFFECTS__
function hu(e, n) {
  let t = (
    /** @type {Effect | null} */
    _
  );
  t === null && eu();
  var r = (
    /** @type {Boundary} */
    t.b
  ), a = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), s = Ba(
    /** @type {V} */
    O
  ), o = !E, i = /* @__PURE__ */ new Map();
  return Su(() => {
    var u = ka();
    a = u.promise;
    try {
      Promise.resolve(e()).then(u.resolve, u.reject).then(() => {
        c === w && c.committed && c.deactivate(), en();
      });
    } catch (b) {
      u.reject(b), en();
    }
    var c = (
      /** @type {Batch} */
      w
    );
    if (o) {
      var d = !r.is_pending();
      r.update_pending_count(1), c.increment(d), i.get(c)?.reject(le), i.delete(c), i.set(c, u);
    }
    const m = (b, f = void 0) => {
      if (c.activate(), f)
        f !== le && (s.f |= z, Yn(s, f));
      else {
        (s.f & z) !== 0 && (s.f ^= z), Yn(s, b);
        for (const [p, h] of i) {
          if (i.delete(p), p === c) break;
          h.reject(le);
        }
      }
      o && (r.update_pending_count(-1), c.decrement(d));
    };
    u.promise.then(m, (b) => m(null, b || "unknown"));
  }), wu(() => {
    for (const u of i.values())
      u.reject(le);
  }), new Promise((u) => {
    function c(d) {
      function m() {
        d === a ? u(s) : c(a);
      }
      d.then(m, m);
    }
    c(a);
  });
}
function Va(e) {
  var n = e.effects;
  if (n !== null) {
    e.effects = null;
    for (var t = 0; t < n.length; t += 1)
      mn(
        /** @type {Effect} */
        n[t]
      );
  }
}
function gu(e) {
  for (var n = e.parent; n !== null; ) {
    if ((n.f & S) === 0)
      return (n.f & H) === 0 ? (
        /** @type {Effect} */
        n
      ) : null;
    n = n.parent;
  }
  return null;
}
function mt(e) {
  var n, t = _;
  Ee(gu(e));
  try {
    e.f &= ~ie, Va(e), n = qa(e);
  } finally {
    Ee(t);
  }
  return n;
}
function Ya(e) {
  var n = mt(e);
  if (e.equals(n) || (w?.is_fork || (e.v = n), e.wv = Ha()), !$e)
    if (P !== null)
      (nn() || w?.is_fork) && P.set(e, n);
    else {
      var t = (e.f & M) === 0 ? G : k;
      D(e, t);
    }
}
let Vn = /* @__PURE__ */ new Set();
const q = /* @__PURE__ */ new Map();
let Ma = !1;
function Ba(e, n) {
  var t = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: xa,
    rv: 0,
    wv: 0
  };
  return t;
}
// @__NO_SIDE_EFFECTS__
function Z(e, n) {
  const t = Ba(e);
  return Du(t), t;
}
function te(e, n, t = !1) {
  E !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!re || (E.f & yr) !== 0) && Fa() && (E.f & (S | ue | ft | yr)) !== 0 && !X?.includes(e) && au();
  let r = t ? de(n) : n;
  return Yn(e, r);
}
function Yn(e, n) {
  if (!e.equals(n)) {
    var t = e.v;
    $e ? q.set(e, n) : q.set(e, t), e.v = n;
    var r = De.ensure();
    r.capture(e, t), (e.f & S) !== 0 && ((e.f & x) !== 0 && mt(
      /** @type {Derived} */
      e
    ), D(e, (e.f & M) !== 0 ? k : G)), e.wv = Ha(), Ga(e, x), _ !== null && (_.f & k) !== 0 && (_.f & (Pe | Ne)) === 0 && (F === null ? Lu([e]) : F.push(e)), !r.is_fork && Vn.size > 0 && !Ma && yu();
  }
  return n;
}
function yu() {
  Ma = !1;
  var e = ae;
  tn(!0);
  const n = Array.from(Vn);
  try {
    for (const t of n)
      (t.f & k) !== 0 && D(t, G), Ve(t) && Re(t);
  } finally {
    tn(e);
  }
  Vn.clear();
}
function Tn(e) {
  te(e, e.v + 1);
}
function Ga(e, n) {
  var t = e.reactions;
  if (t !== null)
    for (var r = t.length, a = 0; a < r; a++) {
      var s = t[a], o = s.f, i = (o & x) === 0;
      if (i && D(s, n), (o & S) !== 0) {
        var u = (
          /** @type {Derived} */
          s
        );
        P?.delete(u), (o & ie) === 0 && (o & M && (s.f |= ie), Ga(u, G));
      } else i && ((o & ue) !== 0 && K !== null && K.add(
        /** @type {Effect} */
        s
      ), ye(
        /** @type {Effect} */
        s
      ));
    }
}
function de(e) {
  if (typeof e != "object" || e === null || wn in e)
    return e;
  const n = Hi(e);
  if (n !== Wi && n !== Zi)
    return e;
  var t = /* @__PURE__ */ new Map(), r = Xi(e), a = /* @__PURE__ */ Z(0), s = se, o = (i) => {
    if (se === s)
      return i();
    var u = E, c = se;
    ee(null), vr(s);
    var d = i();
    return ee(u), vr(c), d;
  };
  return r && t.set("length", /* @__PURE__ */ Z(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(i, u, c) {
        (!("value" in c) || c.configurable === !1 || c.enumerable === !1 || c.writable === !1) && tu();
        var d = t.get(u);
        return d === void 0 ? d = o(() => {
          var m = /* @__PURE__ */ Z(c.value);
          return t.set(u, m), m;
        }) : te(d, c.value, !0), !0;
      },
      deleteProperty(i, u) {
        var c = t.get(u);
        if (c === void 0) {
          if (u in i) {
            const d = o(() => /* @__PURE__ */ Z(O));
            t.set(u, d), Tn(a);
          }
        } else
          te(c, O), Tn(a);
        return !0;
      },
      get(i, u, c) {
        if (u === wn)
          return e;
        var d = t.get(u), m = u in i;
        if (d === void 0 && (!m || In(i, u)?.writable) && (d = o(() => {
          var f = de(m ? i[u] : O), p = /* @__PURE__ */ Z(f);
          return p;
        }), t.set(u, d)), d !== void 0) {
          var b = ve(d);
          return b === O ? void 0 : b;
        }
        return Reflect.get(i, u, c);
      },
      getOwnPropertyDescriptor(i, u) {
        var c = Reflect.getOwnPropertyDescriptor(i, u);
        if (c && "value" in c) {
          var d = t.get(u);
          d && (c.value = ve(d));
        } else if (c === void 0) {
          var m = t.get(u), b = m?.v;
          if (m !== void 0 && b !== O)
            return {
              enumerable: !0,
              configurable: !0,
              value: b,
              writable: !0
            };
        }
        return c;
      },
      has(i, u) {
        if (u === wn)
          return !0;
        var c = t.get(u), d = c !== void 0 && c.v !== O || Reflect.has(i, u);
        if (c !== void 0 || _ !== null && (!d || In(i, u)?.writable)) {
          c === void 0 && (c = o(() => {
            var b = d ? de(i[u]) : O, f = /* @__PURE__ */ Z(b);
            return f;
          }), t.set(u, c));
          var m = ve(c);
          if (m === O)
            return !1;
        }
        return d;
      },
      set(i, u, c, d) {
        var m = t.get(u), b = u in i;
        if (r && u === "length")
          for (var f = c; f < /** @type {Source<number>} */
          m.v; f += 1) {
            var p = t.get(f + "");
            p !== void 0 ? te(p, O) : f in i && (p = o(() => /* @__PURE__ */ Z(O)), t.set(f + "", p));
          }
        if (m === void 0)
          (!b || In(i, u)?.writable) && (m = o(() => /* @__PURE__ */ Z(void 0)), te(m, de(c)), t.set(u, m));
        else {
          b = m.v !== O;
          var h = o(() => de(c));
          te(m, h);
        }
        var g = Reflect.getOwnPropertyDescriptor(i, u);
        if (g?.set && g.set.call(d, c), !b) {
          if (r && typeof u == "string") {
            var L = (
              /** @type {Source<number>} */
              t.get("length")
            ), W = Number(u);
            Number.isInteger(W) && W >= L.v && te(L, W + 1);
          }
          Tn(a);
        }
        return !0;
      },
      ownKeys(i) {
        ve(a);
        var u = Reflect.ownKeys(i).filter((m) => {
          var b = t.get(m);
          return b === void 0 || b.v !== O;
        });
        for (var [c, d] of t)
          d.v !== O && !(c in i) && u.push(c);
        return u;
      },
      setPrototypeOf() {
        ru();
      }
    }
  );
}
var Eu, Nu, _u;
// @__NO_SIDE_EFFECTS__
function Ca(e) {
  return (
    /** @type {TemplateNode | null} */
    Nu.call(e)
  );
}
// @__NO_SIDE_EFFECTS__
function Ka(e) {
  return (
    /** @type {TemplateNode | null} */
    _u.call(e)
  );
}
function Nr(e, n) {
  return /* @__PURE__ */ Ca(e);
}
function vu(e, n = 1, t = !1) {
  let r = e;
  for (; n--; )
    r = /** @type {TemplateNode} */
    /* @__PURE__ */ Ka(r);
  return r;
}
function Ja(e) {
  var n = E, t = _;
  ee(null), Ee(null);
  try {
    return e();
  } finally {
    ee(n), Ee(t);
  }
}
function Iu(e, n) {
  var t = n.last;
  t === null ? n.last = n.first = e : (t.next = e, e.prev = t, n.last = e);
}
function dn(e, n, t) {
  var r = _;
  r !== null && (r.f & me) !== 0 && (e |= me);
  var a = {
    ctx: j,
    deps: null,
    nodes: null,
    f: e | x | M,
    first: null,
    fn: n,
    last: null,
    next: null,
    parent: r,
    b: r && r.b,
    prev: null,
    teardown: null,
    wv: 0,
    ac: null
  };
  if (t)
    try {
      Re(a), a.f |= Ra;
    } catch (i) {
      throw mn(a), i;
    }
  else n !== null && ye(a);
  var s = a;
  if (t && s.deps === null && s.teardown === null && s.nodes === null && s.first === s.last && // either `null`, or a singular child
  (s.f & lt) === 0 && (s = s.first, (e & ue) !== 0 && (e & gr) !== 0 && s !== null && (s.f |= gr)), s !== null && (s.parent = r, r !== null && Iu(s, r), E !== null && (E.f & S) !== 0 && (e & Ne) === 0)) {
    var o = (
      /** @type {Derived} */
      E
    );
    (o.effects ??= []).push(s);
  }
  return a;
}
function nn() {
  return E !== null && !re;
}
function wu(e) {
  const n = dn(La, null, !1);
  return D(n, k), n.teardown = e, n;
}
function Tu(e) {
  return dn(Da | Qi, e, !1);
}
function Su(e) {
  return dn(ft | lt, e, !0);
}
function Ou(e, n = [], t = [], r = []) {
  mu(r, n, t, (a) => {
    dn(La, () => e(...a.map(ve)), !0);
  });
}
function Xa(e) {
  var n = e.teardown;
  if (n !== null) {
    const t = $e, r = E;
    _r(!0), ee(null);
    try {
      n.call(null);
    } finally {
      _r(t), ee(r);
    }
  }
}
function ja(e, n = !1) {
  var t = e.first;
  for (e.first = e.last = null; t !== null; ) {
    const a = t.ac;
    a !== null && Ja(() => {
      a.abort(le);
    });
    var r = t.next;
    (t.f & Ne) !== 0 ? t.parent = null : mn(t, n), t = r;
  }
}
function Au(e) {
  for (var n = e.first; n !== null; ) {
    var t = n.next;
    (n.f & Pe) === 0 && mn(n), n = t;
  }
}
function mn(e, n = !0) {
  var t = !1;
  (n || (e.f & Ua) !== 0) && e.nodes !== null && e.nodes.end !== null && (ku(
    e.nodes.start,
    /** @type {TemplateNode} */
    e.nodes.end
  ), t = !0), ja(e, n && !t), rn(e, 0), D(e, H);
  var r = e.nodes && e.nodes.t;
  if (r !== null)
    for (const s of r)
      s.stop();
  Xa(e);
  var a = e.parent;
  a !== null && a.first !== null && Wa(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = null;
}
function ku(e, n) {
  for (; e !== null; ) {
    var t = e === n ? null : /* @__PURE__ */ Ka(e);
    e.remove(), e = t;
  }
}
function Wa(e) {
  var n = e.parent, t = e.prev, r = e.next;
  t !== null && (t.next = r), r !== null && (r.prev = t), n !== null && (n.first === e && (n.first = r), n.last === e && (n.last = t));
}
let ae = !1;
function tn(e) {
  ae = e;
}
let $e = !1;
function _r(e) {
  $e = e;
}
let E = null, re = !1;
function ee(e) {
  E = e;
}
let _ = null;
function Ee(e) {
  _ = e;
}
let X = null;
function Du(e) {
  E !== null && (X === null ? X = [e] : X.push(e));
}
let A = null, U = 0, F = null;
function Lu(e) {
  F = e;
}
let Za = 1, Le = 0, se = Le;
function vr(e) {
  se = e;
}
function Ha() {
  return ++Za;
}
function Ve(e) {
  var n = e.f;
  if ((n & x) !== 0)
    return !0;
  if (n & S && (e.f &= ~ie), (n & G) !== 0) {
    var t = e.deps;
    if (t !== null)
      for (var r = t.length, a = 0; a < r; a++) {
        var s = t[a];
        if (Ve(
          /** @type {Derived} */
          s
        ) && Ya(
          /** @type {Derived} */
          s
        ), s.wv > e.wv)
          return !0;
      }
    (n & M) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    P === null && D(e, k);
  }
  return !1;
}
function za(e, n, t = !0) {
  var r = e.reactions;
  if (r !== null && !X?.includes(e))
    for (var a = 0; a < r.length; a++) {
      var s = r[a];
      (s.f & S) !== 0 ? za(
        /** @type {Derived} */
        s,
        n,
        !1
      ) : n === s && (t ? D(s, x) : (s.f & k) !== 0 && D(s, G), ye(
        /** @type {Effect} */
        s
      ));
    }
}
function qa(e) {
  var n = A, t = U, r = F, a = E, s = X, o = j, i = re, u = se, c = e.f;
  A = /** @type {null | Value[]} */
  null, U = 0, F = null, E = (c & (Pe | Ne)) === 0 ? e : null, X = null, qe(e.ctx), re = !1, se = ++Le, e.ac !== null && (Ja(() => {
    e.ac.abort(le);
  }), e.ac = null);
  try {
    e.f |= Pn;
    var d = (
      /** @type {Function} */
      e.fn
    ), m = d(), b = e.deps;
    if (A !== null) {
      var f;
      if (rn(e, U), b !== null && U > 0)
        for (b.length = U + A.length, f = 0; f < A.length; f++)
          b[U + f] = A[f];
      else
        e.deps = b = A;
      if (nn() && (e.f & M) !== 0)
        for (f = U; f < b.length; f++)
          (b[f].reactions ??= []).push(e);
    } else b !== null && U < b.length && (rn(e, U), b.length = U);
    if (Fa() && F !== null && !re && b !== null && (e.f & (S | G | x)) === 0)
      for (f = 0; f < /** @type {Source[]} */
      F.length; f++)
        za(
          F[f],
          /** @type {Effect} */
          e
        );
    return a !== null && a !== e && (Le++, F !== null && (r === null ? r = F : r.push(.../** @type {Source[]} */
    F))), (e.f & z) !== 0 && (e.f ^= z), m;
  } catch (p) {
    return lu(p);
  } finally {
    e.f ^= Pn, A = n, U = t, F = r, E = a, X = s, qe(o), re = i, se = u;
  }
}
function Ru(e, n) {
  let t = n.reactions;
  if (t !== null) {
    var r = ji.call(t, e);
    if (r !== -1) {
      var a = t.length - 1;
      a === 0 ? t = n.reactions = null : (t[r] = t[a], t.pop());
    }
  }
  t === null && (n.f & S) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (A === null || !A.includes(n)) && (D(n, G), (n.f & M) !== 0 && (n.f ^= M, n.f &= ~ie), Va(
    /** @type {Derived} **/
    n
  ), rn(
    /** @type {Derived} **/
    n,
    0
  ));
}
function rn(e, n) {
  var t = e.deps;
  if (t !== null)
    for (var r = n; r < t.length; r++)
      Ru(e, t[r]);
}
function Re(e) {
  var n = e.f;
  if ((n & H) === 0) {
    D(e, k);
    var t = _, r = ae;
    _ = e, ae = !0;
    try {
      (n & (ue | qi)) !== 0 ? Au(e) : ja(e), Xa(e);
      var a = qa(e);
      e.teardown = typeof a == "function" ? a : null, e.wv = Za;
      var s;
      Fn && su && (e.f & x) !== 0 && e.deps;
    } finally {
      ae = r, _ = t;
    }
  }
}
function ve(e) {
  var n = e.f, t = (n & S) !== 0;
  if (E !== null && !re) {
    var r = _ !== null && (_.f & H) !== 0;
    if (!r && !X?.includes(e)) {
      var a = E.deps;
      if ((E.f & Pn) !== 0)
        e.rv < Le && (e.rv = Le, A === null && a !== null && a[U] === e ? U++ : A === null ? A = [e] : A.includes(e) || A.push(e));
      else {
        (E.deps ??= []).push(e);
        var s = e.reactions;
        s === null ? e.reactions = [E] : s.includes(E) || s.push(E);
      }
    }
  }
  if ($e) {
    if (q.has(e))
      return q.get(e);
    if (t) {
      var o = (
        /** @type {Derived} */
        e
      ), i = o.v;
      return ((o.f & k) === 0 && o.reactions !== null || es(o)) && (i = mt(o)), q.set(o, i), i;
    }
  } else t && (!P?.has(e) || w?.is_fork && !nn()) && (o = /** @type {Derived} */
  e, Ve(o) && Ya(o), ae && nn() && (o.f & M) === 0 && Qa(o));
  if (P?.has(e))
    return P.get(e);
  if ((e.f & z) !== 0)
    throw e.v;
  return e.v;
}
function Qa(e) {
  if (e.deps !== null) {
    e.f ^= M;
    for (const n of e.deps)
      (n.reactions ??= []).push(e), (n.f & S) !== 0 && (n.f & M) === 0 && Qa(
        /** @type {Derived} */
        n
      );
  }
}
function es(e) {
  if (e.v === O) return !0;
  if (e.deps === null) return !1;
  for (const n of e.deps)
    if (q.has(n) || (n.f & S) !== 0 && es(
      /** @type {Derived} */
      n
    ))
      return !0;
  return !1;
}
const Uu = -7169;
function D(e, n) {
  e.f = e.f & Uu | n;
}
function xu(e) {
  var n = document.createElement("template");
  return n.innerHTML = e.replaceAll("<!>", "<!---->"), n.content;
}
function Fu(e, n) {
  var t = (
    /** @type {Effect} */
    _
  );
  t.nodes === null && (t.nodes = { start: e, end: n, a: null, t: null });
}
// @__NO_SIDE_EFFECTS__
function Pu(e, n) {
  var t = (n & Ji) !== 0, r, a = !e.startsWith("<!>");
  return () => {
    r === void 0 && (r = xu(a ? e : "<!>" + e), r = /** @type {TemplateNode} */
    /* @__PURE__ */ Ca(r));
    var s = (
      /** @type {TemplateNode} */
      t || Eu ? document.importNode(r, !0) : r.cloneNode(!0)
    );
    return Fu(s, s), s;
  };
}
function $u(e, n) {
  e !== null && e.before(
    /** @type {Node} */
    n
  );
}
function Vu(e, n) {
  var t = n == null ? "" : typeof n == "object" ? n + "" : n;
  t !== (e.__t ??= e.nodeValue) && (e.__t = t, e.nodeValue = t + "");
}
const Ir = [...` 	
\r\f \v\uFEFF`];
function Yu(e, n, t) {
  var r = e == null ? "" : "" + e;
  if (t) {
    for (var a in t)
      if (t[a])
        r = r ? r + " " + a : a;
      else if (r.length)
        for (var s = a.length, o = 0; (o = r.indexOf(a, o)) >= 0; ) {
          var i = o + s;
          (o === 0 || Ir.includes(r[o - 1])) && (i === r.length || Ir.includes(r[i])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(i + 1) : o = i;
        }
  }
  return r === "" ? null : r;
}
function Mu(e, n) {
  return e == null ? null : String(e);
}
function wr(e, n, t, r, a, s) {
  var o = e.__className;
  if (o !== t || o === void 0) {
    var i = Yu(t, r, s);
    i == null ? e.removeAttribute("class") : e.className = i, e.__className = t;
  } else if (s && a !== s)
    for (var u in s) {
      var c = !!s[u];
      (a == null || c !== !!a[u]) && e.classList.toggle(u, c);
    }
  return s;
}
function Bu(e, n, t, r) {
  var a = e.__style;
  if (a !== n) {
    var s = Mu(n);
    s == null ? e.removeAttribute("style") : e.style.cssText = s, e.__style = n;
  }
  return r;
}
function Sn(e, n, t, r) {
  var a = (
    /** @type {V} */
    r
  ), s = !0, o = () => (s && (s = !1, a = /** @type {V} */
  r), a), i;
  i = /** @type {V} */
  e[n], i === void 0 && r !== void 0 && (i = o());
  var u;
  return u = () => {
    var c = (
      /** @type {V} */
      e[n]
    );
    return c === void 0 ? o() : (s = !0, c);
  }, u;
}
function Zu() {
  const e = window.location.hash == "#night";
  return e && (document.documentElement.className = "night-mode", document.documentElement.dataset.bsTheme = "dark"), e;
}
function ns() {
  return {
    isDark: document.documentElement.classList.contains("night-mode")
  };
}
const ts = de(ns()), Gu = new MutationObserver((e, n) => {
  ts.isDark = ns().isDark;
});
Gu.observe(document.documentElement, { attributeFilter: ["class"] });
const Cu = "5";
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add(Cu);
var Ku = /* @__PURE__ */ Pu('<div><div><div class="svelte-15g82xt"></div> <div class="svelte-15g82xt"></div> <div class="svelte-15g82xt"></div> <div class="svelte-15g82xt"></div></div> <div class="progress-label svelte-15g82xt"> </div></div>');
function Hu(e, n) {
  ou(n, !0);
  let t = Sn(n, "label", 3, "Loading..."), r = Sn(n, "size", 3, 80), a = Sn(n, "center", 3, !0);
  var s = Ku();
  let o;
  var i = Nr(s);
  let u;
  var c = vu(i, 2), d = Nr(c);
  Ou(() => {
    o = wr(s, 1, "progress-container svelte-15g82xt", null, o, { centered: a() }), Bu(s, `--size: ${r() ?? ""}px`), u = wr(i, 1, "spinner svelte-15g82xt", null, u, { nightMode: ts.isDark }), Vu(d, t());
  }), $u(e, s), iu();
}
export {
  Hu as Spinner,
  Ju as bridgeCommand,
  Zu as checkNightMode,
  ju as createProtoClient,
  ts as pageTheme,
  Xu as promiseWithResolver
};
