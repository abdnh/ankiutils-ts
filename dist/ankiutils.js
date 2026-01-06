function ou(e, n) {
  window.bridgeCommand(e, n);
}
function iu() {
  let e;
  return [new Promise((t) => e = t), e];
}
var y;
(function(e) {
  e[e.Canceled = 1] = "Canceled", e[e.Unknown = 2] = "Unknown", e[e.InvalidArgument = 3] = "InvalidArgument", e[e.DeadlineExceeded = 4] = "DeadlineExceeded", e[e.NotFound = 5] = "NotFound", e[e.AlreadyExists = 6] = "AlreadyExists", e[e.PermissionDenied = 7] = "PermissionDenied", e[e.ResourceExhausted = 8] = "ResourceExhausted", e[e.FailedPrecondition = 9] = "FailedPrecondition", e[e.Aborted = 10] = "Aborted", e[e.OutOfRange = 11] = "OutOfRange", e[e.Unimplemented = 12] = "Unimplemented", e[e.Internal = 13] = "Internal", e[e.Unavailable = 14] = "Unavailable", e[e.DataLoss = 15] = "DataLoss", e[e.Unauthenticated = 16] = "Unauthenticated";
})(y || (y = {}));
function Ln(e, n) {
  return e !== null && typeof e == "object" && "$typeName" in e && typeof e.$typeName == "string" ? n === void 0 ? !0 : n.typeName === e.$typeName : !1;
}
var l;
(function(e) {
  e[e.DOUBLE = 1] = "DOUBLE", e[e.FLOAT = 2] = "FLOAT", e[e.INT64 = 3] = "INT64", e[e.UINT64 = 4] = "UINT64", e[e.INT32 = 5] = "INT32", e[e.FIXED64 = 6] = "FIXED64", e[e.FIXED32 = 7] = "FIXED32", e[e.BOOL = 8] = "BOOL", e[e.STRING = 9] = "STRING", e[e.BYTES = 12] = "BYTES", e[e.UINT32 = 13] = "UINT32", e[e.SFIXED32 = 15] = "SFIXED32", e[e.SFIXED64 = 16] = "SFIXED64", e[e.SINT32 = 17] = "SINT32", e[e.SINT64 = 18] = "SINT64";
})(l || (l = {}));
function Va() {
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
function cn(e, n, t) {
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
const Be = 4294967296;
function ot(e) {
  const n = e[0] === "-";
  n && (e = e.slice(1));
  const t = 1e6;
  let r = 0, a = 0;
  function s(o, i) {
    const u = Number(e.slice(o, i));
    a *= t, r = r * t + u, r >= Be && (a = a + (r / Be | 0), r = r % Be);
  }
  return s(-24, -18), s(-18, -12), s(-12, -6), s(-6), n ? mr(r, a) : Rn(r, a);
}
function Ya(e, n) {
  let t = Rn(e, n);
  const r = t.hi & 2147483648;
  r && (t = mr(t.lo, t.hi));
  const a = fr(t.lo, t.hi);
  return r ? "-" + a : a;
}
function fr(e, n) {
  if ({ lo: e, hi: n } = Ma(e, n), n <= 2097151)
    return String(Be * n + e);
  const t = e & 16777215, r = (e >>> 24 | n << 8) & 16777215, a = n >> 16 & 65535;
  let s = t + r * 6777216 + a * 6710656, o = r + a * 8147497, i = a * 2;
  const u = 1e7;
  return s >= u && (o += Math.floor(s / u), s %= u), o >= u && (i += Math.floor(o / u), o %= u), i.toString() + it(o) + it(s);
}
function Ma(e, n) {
  return { lo: e >>> 0, hi: n >>> 0 };
}
function Rn(e, n) {
  return { lo: e | 0, hi: n | 0 };
}
function mr(e, n) {
  return n = ~n, e ? e = ~e + 1 : n += 1, Rn(e, n);
}
const it = (e) => {
  const n = String(e);
  return "0000000".slice(n.length) + n;
};
function En(e, n) {
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
function Ba() {
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
const E = /* @__PURE__ */ Ga();
function Ga() {
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
      return typeof t != "string" && (t = t.toString()), ut(t), t;
    },
    uParse(t) {
      return typeof t != "string" && (t = t.toString()), ct(t), t;
    },
    enc(t) {
      return typeof t != "string" && (t = t.toString()), ut(t), ot(t);
    },
    uEnc(t) {
      return typeof t != "string" && (t = t.toString()), ct(t), ot(t);
    },
    dec(t, r) {
      return Ya(t, r);
    },
    uDec(t, r) {
      return fr(t, r);
    }
  };
}
function ut(e) {
  if (!/^-?[0-9]+$/.test(e))
    throw new Error("invalid int64: " + e);
}
function ct(e) {
  if (!/^[0-9]+$/.test(e))
    throw new Error("invalid uint64: " + e);
}
function re(e, n) {
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
      return n ? "0" : E.zero;
    case l.BYTES:
      return new Uint8Array(0);
    default:
      return 0;
  }
}
function Ka(e, n) {
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
const dr = 2, J = /* @__PURE__ */ Symbol.for("reflect unsafe local");
function br(e, n) {
  const t = e[n.localName].case;
  return t === void 0 ? t : n.fields.find((r) => r.localName === t);
}
function Ca(e, n) {
  const t = n.localName;
  if (n.oneof)
    return e[n.oneof.localName].case === t;
  if (n.presence != dr)
    return e[t] !== void 0 && Object.prototype.hasOwnProperty.call(e, t);
  switch (n.fieldKind) {
    case "list":
      return e[t].length > 0;
    case "map":
      return Object.keys(e[t]).length > 0;
    case "scalar":
      return !Ka(n.scalar, e[t]);
    case "enum":
      return e[t] !== n.enum.values[0].number;
  }
  throw new Error("message field with implicit presence");
}
function he(e, n) {
  return Object.prototype.hasOwnProperty.call(e, n) && e[n] !== void 0;
}
function pr(e, n) {
  if (n.oneof) {
    const t = e[n.oneof.localName];
    return t.case === n.localName ? t.value : void 0;
  }
  return e[n.localName];
}
function hr(e, n, t) {
  n.oneof ? e[n.oneof.localName] = {
    case: n.localName,
    value: t
  } : e[n.localName] = t;
}
function Ja(e, n) {
  const t = n.localName;
  if (n.oneof) {
    const r = n.oneof.localName;
    e[r].case === t && (e[r] = { case: void 0 });
  } else if (n.presence != dr)
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
        e[t] = re(n.scalar, n.longAsString);
        break;
    }
}
function H(e) {
  return e !== null && typeof e == "object" && !Array.isArray(e);
}
function Un(e, n) {
  var t, r, a, s;
  if (H(e) && J in e && "add" in e && "field" in e && typeof e.field == "function") {
    if (n !== void 0) {
      const o = n, i = e.field();
      return o.listKind == i.listKind && o.scalar === i.scalar && ((t = o.message) === null || t === void 0 ? void 0 : t.typeName) === ((r = i.message) === null || r === void 0 ? void 0 : r.typeName) && ((a = o.enum) === null || a === void 0 ? void 0 : a.typeName) === ((s = i.enum) === null || s === void 0 ? void 0 : s.typeName);
    }
    return !0;
  }
  return !1;
}
function xn(e, n) {
  var t, r, a, s;
  if (H(e) && J in e && "has" in e && "field" in e && typeof e.field == "function") {
    if (n !== void 0) {
      const o = n, i = e.field();
      return o.mapKey === i.mapKey && o.mapKind == i.mapKind && o.scalar === i.scalar && ((t = o.message) === null || t === void 0 ? void 0 : t.typeName) === ((r = i.message) === null || r === void 0 ? void 0 : r.typeName) && ((a = o.enum) === null || a === void 0 ? void 0 : a.typeName) === ((s = i.enum) === null || s === void 0 ? void 0 : s.typeName);
    }
    return !0;
  }
  return !1;
}
function $n(e, n) {
  return H(e) && J in e && "desc" in e && H(e.desc) && e.desc.kind === "message" && (n === void 0 || e.desc.typeName == n.typeName);
}
function Xa(e) {
  return gr(e.$typeName);
}
function Se(e) {
  const n = e.fields[0];
  return gr(e.typeName) && n !== void 0 && n.fieldKind == "scalar" && n.name == "value" && n.number == 1;
}
function gr(e) {
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
const ja = 999, Wa = 998, Ge = 2;
function V(e, n) {
  if (Ln(n, e))
    return n;
  const t = Qa(e);
  return n !== void 0 && Za(e, t, n), t;
}
function Za(e, n, t) {
  for (const r of e.members) {
    let a = t[r.localName];
    if (a == null)
      continue;
    let s;
    if (r.kind == "oneof") {
      const o = br(t, r);
      if (!o)
        continue;
      s = o, a = pr(t, o);
    } else
      s = r;
    switch (s.fieldKind) {
      case "message":
        a = Fn(s, a);
        break;
      case "scalar":
        a = yr(s, a);
        break;
      case "list":
        a = za(s, a);
        break;
      case "map":
        a = Ha(s, a);
        break;
    }
    hr(n, s, a);
  }
  return n;
}
function yr(e, n) {
  return e.scalar == l.BYTES ? Pn(n) : n;
}
function Ha(e, n) {
  if (H(n)) {
    if (e.scalar == l.BYTES)
      return lt(n, Pn);
    if (e.mapKind == "message")
      return lt(n, (t) => Fn(e, t));
  }
  return n;
}
function za(e, n) {
  if (Array.isArray(n)) {
    if (e.scalar == l.BYTES)
      return n.map(Pn);
    if (e.listKind == "message")
      return n.map((t) => Fn(e, t));
  }
  return n;
}
function Fn(e, n) {
  if (e.fieldKind == "message" && !e.oneof && Se(e.message))
    return yr(e.message.fields[0], n);
  if (H(n)) {
    if (e.message.typeName == "google.protobuf.Struct" && e.parent.typeName !== "google.protobuf.Value")
      return n;
    if (!Ln(n, e.message))
      return V(e.message, n);
  }
  return n;
}
function Pn(e) {
  return Array.isArray(e) ? new Uint8Array(e) : e;
}
function lt(e, n) {
  const t = {};
  for (const r of Object.entries(e))
    t[r[0]] = n(r[1]);
  return t;
}
const qa = /* @__PURE__ */ Symbol(), ft = /* @__PURE__ */ new WeakMap();
function Qa(e) {
  let n;
  if (es(e)) {
    const t = ft.get(e);
    let r, a;
    if (t)
      ({ prototype: r, members: a } = t);
    else {
      r = {}, a = /* @__PURE__ */ new Set();
      for (const s of e.members)
        s.kind != "oneof" && (s.fieldKind != "scalar" && s.fieldKind != "enum" || s.presence != Ge && (a.add(s), r[s.localName] = ln(s)));
      ft.set(e, { prototype: r, members: a });
    }
    n = Object.create(r), n.$typeName = e.typeName;
    for (const s of e.members)
      a.has(s) || s.kind == "field" && (s.fieldKind == "message" || (s.fieldKind == "scalar" || s.fieldKind == "enum") && s.presence != Ge) || (n[s.localName] = ln(s));
  } else {
    n = {
      $typeName: e.typeName
    };
    for (const t of e.members)
      (t.kind == "oneof" || t.presence == Ge) && (n[t.localName] = ln(t));
  }
  return n;
}
function es(e) {
  switch (e.file.edition) {
    case ja:
      return !1;
    case Wa:
      return !0;
    default:
      return e.fields.some((n) => n.presence != Ge && n.fieldKind != "message" && !n.oneof);
  }
}
function ln(e) {
  if (e.kind == "oneof")
    return { case: void 0 };
  if (e.fieldKind == "list")
    return [];
  if (e.fieldKind == "map")
    return {};
  if (e.fieldKind == "message")
    return qa;
  const n = e.getDefaultValue();
  return n !== void 0 ? e.fieldKind == "scalar" && e.longAsString ? n.toString() : n : e.fieldKind == "scalar" ? re(e.scalar, e.longAsString) : e.enum.values[0].number;
}
const ns = [
  "FieldValueInvalidError",
  "FieldListRangeError",
  "ForeignFieldError"
];
class A extends Error {
  constructor(n, t, r = "FieldValueInvalidError") {
    super(t), this.name = r, this.field = () => n;
  }
}
function ts(e) {
  return e instanceof Error && ns.includes(e.name) && "field" in e && typeof e.field == "function";
}
const fn = /* @__PURE__ */ Symbol.for("@bufbuild/protobuf/text-encoding");
function Vn() {
  if (globalThis[fn] == null) {
    const e = new globalThis.TextEncoder(), n = new globalThis.TextDecoder();
    globalThis[fn] = {
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
  return globalThis[fn];
}
var N;
(function(e) {
  e[e.Varint = 0] = "Varint", e[e.Bit64 = 1] = "Bit64", e[e.LengthDelimited = 2] = "LengthDelimited", e[e.StartGroup = 3] = "StartGroup", e[e.EndGroup = 4] = "EndGroup", e[e.Bit32 = 5] = "Bit32";
})(N || (N = {}));
const Er = 34028234663852886e22, Nr = -34028234663852886e22, _r = 4294967295, Ir = 2147483647, wr = -2147483648;
class Tr {
  constructor(n = Vn().encodeUtf8) {
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
    for (mt(n); n > 127; )
      this.buf.push(n & 127 | 128), n = n >>> 7;
    return this.buf.push(n), this;
  }
  /**
   * Write a `int32` value, a signed 32 bit varint.
   */
  int32(n) {
    return mn(n), En(n, this.buf), this;
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
    rs(n);
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
    mt(n);
    let t = new Uint8Array(4);
    return new DataView(t.buffer).setUint32(0, n, !0), this.raw(t);
  }
  /**
   * Write a `sfixed32` value, a signed, fixed-length 32-bit integer.
   */
  sfixed32(n) {
    mn(n);
    let t = new Uint8Array(4);
    return new DataView(t.buffer).setInt32(0, n, !0), this.raw(t);
  }
  /**
   * Write a `sint32` value, a signed, zigzag-encoded 32-bit varint.
   */
  sint32(n) {
    return mn(n), n = (n << 1 ^ n >> 31) >>> 0, En(n, this.buf), this;
  }
  /**
   * Write a `fixed64` value, a signed, fixed-length 64-bit integer.
   */
  sfixed64(n) {
    let t = new Uint8Array(8), r = new DataView(t.buffer), a = E.enc(n);
    return r.setInt32(0, a.lo, !0), r.setInt32(4, a.hi, !0), this.raw(t);
  }
  /**
   * Write a `fixed64` value, an unsigned, fixed-length 64 bit integer.
   */
  fixed64(n) {
    let t = new Uint8Array(8), r = new DataView(t.buffer), a = E.uEnc(n);
    return r.setInt32(0, a.lo, !0), r.setInt32(4, a.hi, !0), this.raw(t);
  }
  /**
   * Write a `int64` value, a signed 64-bit varint.
   */
  int64(n) {
    let t = E.enc(n);
    return cn(t.lo, t.hi, this.buf), this;
  }
  /**
   * Write a `sint64` value, a signed, zig-zag-encoded 64-bit varint.
   */
  sint64(n) {
    const t = E.enc(n), r = t.hi >> 31, a = t.lo << 1 ^ r, s = (t.hi << 1 | t.lo >>> 31) ^ r;
    return cn(a, s, this.buf), this;
  }
  /**
   * Write a `uint64` value, an unsigned 64-bit varint.
   */
  uint64(n) {
    const t = E.uEnc(n);
    return cn(t.lo, t.hi, this.buf), this;
  }
}
class Yn {
  constructor(n, t = Vn().decodeUtf8) {
    this.decodeUtf8 = t, this.varint64 = Va, this.uint32 = Ba, this.buf = n, this.len = n.length, this.pos = 0, this.view = new DataView(n.buffer, n.byteOffset, n.byteLength);
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
      case N.Varint:
        for (; this.buf[this.pos++] & 128; )
          ;
        break;
      // @ts-ignore TS7029: Fallthrough case in switch -- ignore instead of expect-error for compiler settings without noFallthroughCasesInSwitch: true
      case N.Bit64:
        this.pos += 4;
      case N.Bit32:
        this.pos += 4;
        break;
      case N.LengthDelimited:
        let a = this.uint32();
        this.pos += a;
        break;
      case N.StartGroup:
        for (; ; ) {
          const [s, o] = this.tag();
          if (o === N.EndGroup) {
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
    return E.dec(...this.varint64());
  }
  /**
   * Read a `uint64` field, an unsigned 64-bit varint.
   */
  uint64() {
    return E.uDec(...this.varint64());
  }
  /**
   * Read a `sint64` field, a signed, zig-zag-encoded 64-bit varint.
   */
  sint64() {
    let [n, t] = this.varint64(), r = -(n & 1);
    return n = (n >>> 1 | (t & 1) << 31) ^ r, t = t >>> 1 ^ r, E.dec(n, t);
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
    return E.uDec(this.sfixed32(), this.sfixed32());
  }
  /**
   * Read a `fixed64` field, a signed, fixed-length 64-bit integer.
   */
  sfixed64() {
    return E.dec(this.sfixed32(), this.sfixed32());
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
function mn(e) {
  if (typeof e == "string")
    e = Number(e);
  else if (typeof e != "number")
    throw new Error("invalid int32: " + typeof e);
  if (!Number.isInteger(e) || e > Ir || e < wr)
    throw new Error("invalid int32: " + e);
}
function mt(e) {
  if (typeof e == "string")
    e = Number(e);
  else if (typeof e != "number")
    throw new Error("invalid uint32: " + typeof e);
  if (!Number.isInteger(e) || e > _r || e < 0)
    throw new Error("invalid uint32: " + e);
}
function rs(e) {
  if (typeof e == "string") {
    const n = e;
    if (e = Number(e), Number.isNaN(e) && n !== "NaN")
      throw new Error("invalid float32: " + n);
  } else if (typeof e != "number")
    throw new Error("invalid float32: " + typeof e);
  if (Number.isFinite(e) && (e > Er || e < Nr))
    throw new Error("invalid float32: " + e);
}
function z(e, n) {
  const t = e.fieldKind == "list" ? Un(n, e) : e.fieldKind == "map" ? xn(n, e) : Mn(e, n);
  if (t === !0)
    return;
  let r;
  switch (e.fieldKind) {
    case "list":
      r = `expected ${Or(e)}, got ${w(n)}`;
      break;
    case "map":
      r = `expected ${kr(e)}, got ${w(n)}`;
      break;
    default:
      r = Ce(e, n, t);
  }
  return new A(e, r);
}
function dt(e, n, t) {
  const r = Mn(e, t);
  if (r !== !0)
    return new A(e, `list item #${n + 1}: ${Ce(e, t, r)}`);
}
function as(e, n, t) {
  const r = vr(n, e.mapKey);
  if (r !== !0)
    return new A(e, `invalid map key: ${Ce({ scalar: e.mapKey }, n, r)}`);
  const a = Mn(e, t);
  if (a !== !0)
    return new A(e, `map entry ${w(n)}: ${Ce(e, t, a)}`);
}
function Mn(e, n) {
  return e.scalar !== void 0 ? vr(n, e.scalar) : e.enum !== void 0 ? e.enum.open ? Number.isInteger(n) : e.enum.values.some((t) => t.number === n) : $n(n, e.message);
}
function vr(e, n) {
  switch (n) {
    case l.DOUBLE:
      return typeof e == "number";
    case l.FLOAT:
      return typeof e != "number" ? !1 : Number.isNaN(e) || !Number.isFinite(e) ? !0 : e > Er || e < Nr ? `${e.toFixed()} out of range` : !0;
    case l.INT32:
    case l.SFIXED32:
    case l.SINT32:
      return typeof e != "number" || !Number.isInteger(e) ? !1 : e > Ir || e < wr ? `${e.toFixed()} out of range` : !0;
    case l.FIXED32:
    case l.UINT32:
      return typeof e != "number" || !Number.isInteger(e) ? !1 : e > _r || e < 0 ? `${e.toFixed()} out of range` : !0;
    case l.BOOL:
      return typeof e == "boolean";
    case l.STRING:
      return typeof e != "string" ? !1 : Vn().checkUtf8(e) || "invalid UTF8";
    case l.BYTES:
      return e instanceof Uint8Array;
    case l.INT64:
    case l.SFIXED64:
    case l.SINT64:
      if (typeof e == "bigint" || typeof e == "number" || typeof e == "string" && e.length > 0)
        try {
          return E.parse(e), !0;
        } catch {
          return `${e} out of range`;
        }
      return !1;
    case l.FIXED64:
    case l.UINT64:
      if (typeof e == "bigint" || typeof e == "number" || typeof e == "string" && e.length > 0)
        try {
          return E.uParse(e), !0;
        } catch {
          return `${e} out of range`;
        }
      return !1;
  }
}
function Ce(e, n, t) {
  return t = typeof t == "string" ? `: ${t}` : `, got ${w(n)}`, e.scalar !== void 0 ? `expected ${ss(e.scalar)}` + t : e.enum !== void 0 ? `expected ${e.enum.toString()}` + t : `expected ${Sr(e.message)}` + t;
}
function w(e) {
  switch (typeof e) {
    case "object":
      return e === null ? "null" : e instanceof Uint8Array ? `Uint8Array(${e.length})` : Array.isArray(e) ? `Array(${e.length})` : Un(e) ? Or(e.field()) : xn(e) ? kr(e.field()) : $n(e) ? Sr(e.desc) : Ln(e) ? `message ${e.$typeName}` : "object";
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
function Sr(e) {
  return `ReflectMessage (${e.typeName})`;
}
function Or(e) {
  switch (e.listKind) {
    case "message":
      return `ReflectList (${e.message.toString()})`;
    case "enum":
      return `ReflectList (${e.enum.toString()})`;
    case "scalar":
      return `ReflectList (${l[e.scalar]})`;
  }
}
function kr(e) {
  switch (e.mapKind) {
    case "message":
      return `ReflectMap (${l[e.mapKey]}, ${e.message.toString()})`;
    case "enum":
      return `ReflectMap (${l[e.mapKey]}, ${e.enum.toString()})`;
    case "scalar":
      return `ReflectMap (${l[e.mapKey]}, ${l[e.scalar]})`;
  }
}
function ss(e) {
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
function F(e, n, t = !0) {
  return new Ar(e, n, t);
}
const bt = /* @__PURE__ */ new WeakMap();
class Ar {
  get sortedFields() {
    const n = bt.get(this.desc);
    if (n)
      return n;
    const t = this.desc.fields.concat().sort((r, a) => r.number - a.number);
    return bt.set(this.desc, t), t;
  }
  constructor(n, t, r = !0) {
    this.lists = /* @__PURE__ */ new Map(), this.maps = /* @__PURE__ */ new Map(), this.check = r, this.desc = n, this.message = this[J] = t ?? V(n), this.fields = n.fields, this.oneofs = n.oneofs, this.members = n.members;
  }
  findNumber(n) {
    return this._fieldsByNumber || (this._fieldsByNumber = new Map(this.desc.fields.map((t) => [t.number, t]))), this._fieldsByNumber.get(n);
  }
  oneofCase(n) {
    return be(this.message, n), br(this.message, n);
  }
  isSet(n) {
    return be(this.message, n), Ca(this.message, n);
  }
  clear(n) {
    be(this.message, n), Ja(this.message, n);
  }
  get(n) {
    be(this.message, n);
    const t = pr(this.message, n);
    switch (n.fieldKind) {
      case "list":
        let r = this.lists.get(n);
        return (!r || r[J] !== t) && this.lists.set(
          n,
          // biome-ignore lint/suspicious/noAssignInExpressions: no
          r = new os(n, t, this.check)
        ), r;
      case "map":
        let a = this.maps.get(n);
        return (!a || a[J] !== t) && this.maps.set(
          n,
          // biome-ignore lint/suspicious/noAssignInExpressions: no
          a = new is(n, t, this.check)
        ), a;
      case "message":
        return Gn(n, t, this.check);
      case "scalar":
        return t === void 0 ? re(n.scalar, !1) : Kn(n, t);
      case "enum":
        return t ?? n.enum.values[0].number;
    }
  }
  set(n, t) {
    if (be(this.message, n), this.check) {
      const a = z(n, t);
      if (a)
        throw a;
    }
    let r;
    n.fieldKind == "message" ? r = Bn(n, t) : xn(t) || Un(t) ? r = t[J] : r = Cn(n, t), hr(this.message, n, r);
  }
  getUnknown() {
    return this.message.$unknown;
  }
  setUnknown(n) {
    this.message.$unknown = n;
  }
}
function be(e, n) {
  if (n.parent.typeName !== e.$typeName)
    throw new A(n, `cannot use ${n.toString()} with message ${e.$typeName}`, "ForeignFieldError");
}
class os {
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
    return t === void 0 ? void 0 : dn(this._field, t, this.check);
  }
  set(n, t) {
    if (n < 0 || n >= this._arr.length)
      throw new A(this._field, `list item #${n + 1}: out of range`);
    if (this.check) {
      const r = dt(this._field, n, t);
      if (r)
        throw r;
    }
    this._arr[n] = pt(this._field, t);
  }
  add(n) {
    if (this.check) {
      const t = dt(this._field, this._arr.length, n);
      if (t)
        throw t;
    }
    this._arr.push(pt(this._field, n));
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
      yield dn(this._field, n, this.check);
  }
  *entries() {
    for (let n = 0; n < this._arr.length; n++)
      yield [n, dn(this._field, this._arr[n], this.check)];
  }
}
class is {
  constructor(n, t, r = !0) {
    this.obj = this[J] = t ?? {}, this.check = r, this._field = n;
  }
  field() {
    return this._field;
  }
  set(n, t) {
    if (this.check) {
      const r = as(this._field, n, t);
      if (r)
        throw r;
    }
    return this.obj[Fe(n)] = us(this._field, t), this;
  }
  delete(n) {
    const t = Fe(n), r = Object.prototype.hasOwnProperty.call(this.obj, t);
    return r && delete this.obj[t], r;
  }
  clear() {
    for (const n of Object.keys(this.obj))
      delete this.obj[n];
  }
  get(n) {
    let t = this.obj[Fe(n)];
    return t !== void 0 && (t = bn(this._field, t, this.check)), t;
  }
  has(n) {
    return Object.prototype.hasOwnProperty.call(this.obj, Fe(n));
  }
  *keys() {
    for (const n of Object.keys(this.obj))
      yield ht(n, this._field.mapKey);
  }
  *entries() {
    for (const n of Object.entries(this.obj))
      yield [
        ht(n[0], this._field.mapKey),
        bn(this._field, n[1], this.check)
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
      yield bn(this._field, n, this.check);
  }
  forEach(n, t) {
    for (const r of this.entries())
      n.call(t, r[1], r[0], this);
  }
}
function Bn(e, n) {
  return $n(n) ? Xa(n.message) && !e.oneof && e.fieldKind == "message" ? n.message.value : n.desc.typeName == "google.protobuf.Struct" && e.parent.typeName != "google.protobuf.Value" ? Lr(n.message) : n.message : n;
}
function Gn(e, n, t) {
  return n !== void 0 && (Se(e.message) && !e.oneof && e.fieldKind == "message" ? n = {
    $typeName: e.message.typeName,
    value: Kn(e.message.fields[0], n)
  } : e.message.typeName == "google.protobuf.Struct" && e.parent.typeName != "google.protobuf.Value" && H(n) && (n = Dr(n))), new Ar(e.message, n, t);
}
function pt(e, n) {
  return e.listKind == "message" ? Bn(e, n) : Cn(e, n);
}
function dn(e, n, t) {
  return e.listKind == "message" ? Gn(e, n, t) : Kn(e, n);
}
function us(e, n) {
  return e.mapKind == "message" ? Bn(e, n) : Cn(e, n);
}
function bn(e, n, t) {
  return e.mapKind == "message" ? Gn(e, n, t) : n;
}
function Fe(e) {
  return typeof e == "string" || typeof e == "number" ? e : String(e);
}
function ht(e, n) {
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
        return E.uParse(e);
      } catch {
      }
      break;
    default:
      try {
        return E.parse(e);
      } catch {
      }
      break;
  }
  return e;
}
function Kn(e, n) {
  switch (e.scalar) {
    case l.INT64:
    case l.SFIXED64:
    case l.SINT64:
      "longAsString" in e && e.longAsString && typeof n == "string" && (n = E.parse(n));
      break;
    case l.FIXED64:
    case l.UINT64:
      "longAsString" in e && e.longAsString && typeof n == "string" && (n = E.uParse(n));
      break;
  }
  return n;
}
function Cn(e, n) {
  switch (e.scalar) {
    case l.INT64:
    case l.SFIXED64:
    case l.SINT64:
      "longAsString" in e && e.longAsString ? n = String(n) : (typeof n == "string" || typeof n == "number") && (n = E.parse(n));
      break;
    case l.FIXED64:
    case l.UINT64:
      "longAsString" in e && e.longAsString ? n = String(n) : (typeof n == "string" || typeof n == "number") && (n = E.uParse(n));
      break;
  }
  return n;
}
function Dr(e) {
  const n = {
    $typeName: "google.protobuf.Struct",
    fields: {}
  };
  if (H(e))
    for (const [t, r] of Object.entries(e))
      n.fields[t] = Ur(r);
  return n;
}
function Lr(e) {
  const n = {};
  for (const [t, r] of Object.entries(e.fields))
    n[t] = Rr(r);
  return n;
}
function Rr(e) {
  switch (e.kind.case) {
    case "structValue":
      return Lr(e.kind.value);
    case "listValue":
      return e.kind.value.values.map(Rr);
    case "nullValue":
    case void 0:
      return null;
    default:
      return e.kind.value;
  }
}
function Ur(e) {
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
            t.values.push(Ur(r));
        n.kind = {
          case: "listValue",
          value: t
        };
      } else
        n.kind = {
          case: "structValue",
          value: Dr(e)
        };
      break;
  }
  return n;
}
function Jn(e) {
  const n = cs();
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
function xr(e, n = "std") {
  const t = $r(n), r = n == "std";
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
let Pe, gt, se;
function $r(e) {
  return Pe || (Pe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""), gt = Pe.slice(0, -2).concat("-", "_")), e == "url" ? (
    // biome-ignore lint/style/noNonNullAssertion: TS fails to narrow down
    gt
  ) : Pe;
}
function cs() {
  if (!se) {
    se = [];
    const e = $r("std");
    for (let n = 0; n < e.length; n++)
      se[e[n].charCodeAt(0)] = n;
    se[45] = e.indexOf("+"), se[95] = e.indexOf("/");
  }
  return se;
}
function ge(e) {
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
const ls = /* @__PURE__ */ new Set([
  // names reserved by JavaScript
  "constructor",
  "toString",
  "toJSON",
  "valueOf"
]);
function ye(e) {
  return ls.has(e) ? e + "$" : e;
}
function Xn(e) {
  for (const n of e.field)
    he(n, "jsonName") || (n.jsonName = ge(n.name));
  e.nestedType.forEach(Xn);
}
function fs(e, n) {
  const t = e.values.find((r) => r.name === n);
  if (!t)
    throw new Error(`cannot parse ${e} default value: ${n}`);
  return t.number;
}
function ms(e, n) {
  switch (e) {
    case l.STRING:
      return n;
    case l.BYTES: {
      const t = ds(n);
      if (t === !1)
        throw new Error(`cannot parse ${l[e]} default value: ${n}`);
      return t;
    }
    case l.INT64:
    case l.SFIXED64:
    case l.SINT64:
      return E.parse(n);
    case l.UINT64:
    case l.FIXED64:
      return E.uParse(n);
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
function ds(e) {
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
              const s = E.uEnc(r + a), o = new Uint8Array(8), i = new DataView(o.buffer);
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
function* Nn(e) {
  switch (e.kind) {
    case "file":
      for (const n of e.messages)
        yield n, yield* Nn(n);
      yield* e.enums, yield* e.services, yield* e.extensions;
      break;
    case "message":
      for (const n of e.nestedMessages)
        yield n, yield* Nn(n);
      yield* e.nestedEnums, yield* e.nestedExtensions;
      break;
  }
}
function Fr(...e) {
  const n = bs();
  if (!e.length)
    return n;
  if ("$typeName" in e[0] && e[0].$typeName == "google.protobuf.FileDescriptorSet") {
    for (const t of e[0].file)
      _t(t, n);
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
      _t(o, n);
  } else
    for (const t of e)
      for (const r of t.files)
        n.addFile(r);
  return n;
}
function bs() {
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
        for (const o of Nn(r))
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
const ps = 998, hs = 999, gs = 9, Ee = 10, pe = 11, ys = 12, yt = 14, jn = 3, Es = 2, Et = 1, Ns = 0, pn = 1, Nt = 2, _s = 3, Is = 1, ws = 2, Ts = 1, Pr = {
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
function _t(e, n) {
  var t, r;
  const a = {
    kind: "file",
    proto: e,
    deprecated: (r = (t = e.options) === null || t === void 0 ? void 0 : t.deprecated) !== null && r !== void 0 ? r : !1,
    edition: ks(e),
    name: e.name.replace(/\.proto$/, ""),
    dependencies: As(e, n),
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
      P(((u = i.proto.options) === null || u === void 0 ? void 0 : u.mapEntry) === !0), s.set(i.typeName, i);
    }
  };
  for (const i of e.enumType)
    Vr(i, a, void 0, n);
  for (const i of e.messageType)
    Yr(i, a, void 0, n, o);
  for (const i of e.service)
    vs(i, a, n);
  _n(a, n);
  for (const i of s.values())
    In(i, n, o);
  for (const i of a.messages)
    In(i, n, o), _n(i, n);
  n.addFile(a, !0);
}
function _n(e, n) {
  switch (e.kind) {
    case "file":
      for (const t of e.proto.extension) {
        const r = wn(t, e, n);
        e.extensions.push(r), n.add(r);
      }
      break;
    case "message":
      for (const t of e.proto.extension) {
        const r = wn(t, e, n);
        e.nestedExtensions.push(r), n.add(r);
      }
      for (const t of e.nestedMessages)
        _n(t, n);
      break;
  }
}
function In(e, n, t) {
  const r = e.proto.oneofDecl.map((s) => Os(s, e)), a = /* @__PURE__ */ new Set();
  for (const s of e.proto.field) {
    const o = Rs(s, r), i = wn(s, e, n, o, t);
    e.fields.push(i), e.field[i.localName] = i, o === void 0 ? e.members.push(i) : (o.fields.push(i), a.has(o) || (a.add(o), e.members.push(o)));
  }
  for (const s of r.filter((o) => a.has(o)))
    e.oneofs.push(s);
  for (const s of e.nestedMessages)
    In(s, n, t);
}
function Vr(e, n, t, r) {
  var a, s, o, i, u;
  const c = Ds(e.name, e.value), m = {
    kind: "enum",
    proto: e,
    deprecated: (s = (a = e.options) === null || a === void 0 ? void 0 : a.deprecated) !== null && s !== void 0 ? s : !1,
    file: n,
    parent: t,
    open: !0,
    name: e.name,
    typeName: Qe(e, t, n),
    value: {},
    values: [],
    sharedPrefix: c,
    toString() {
      return `enum ${this.typeName}`;
    }
  };
  m.open = Fs(m), r.add(m);
  for (const d of e.value) {
    const b = d.name;
    m.values.push(
      // biome-ignore lint/suspicious/noAssignInExpressions: no
      m.value[d.number] = {
        kind: "enum_value",
        proto: d,
        deprecated: (i = (o = d.options) === null || o === void 0 ? void 0 : o.deprecated) !== null && i !== void 0 ? i : !1,
        parent: m,
        name: b,
        localName: ye(c == null ? b : b.substring(c.length)),
        number: d.number,
        toString() {
          return `enum value ${m.typeName}.${b}`;
        }
      }
    );
  }
  ((u = t?.nestedEnums) !== null && u !== void 0 ? u : n.enums).push(m);
}
function Yr(e, n, t, r, a) {
  var s, o, i, u;
  const c = {
    kind: "message",
    proto: e,
    deprecated: (o = (s = e.options) === null || s === void 0 ? void 0 : s.deprecated) !== null && o !== void 0 ? o : !1,
    file: n,
    parent: t,
    name: e.name,
    typeName: Qe(e, t, n),
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
  for (const m of e.enumType)
    Vr(m, n, c, r);
  for (const m of e.nestedType)
    Yr(m, n, c, r, a);
}
function vs(e, n, t) {
  var r, a;
  const s = {
    kind: "service",
    proto: e,
    deprecated: (a = (r = e.options) === null || r === void 0 ? void 0 : r.deprecated) !== null && a !== void 0 ? a : !1,
    file: n,
    name: e.name,
    typeName: Qe(e, void 0, n),
    methods: [],
    method: {},
    toString() {
      return `service ${this.typeName}`;
    }
  };
  n.services.push(s), t.add(s);
  for (const o of e.method) {
    const i = Ss(o, s, t);
    s.methods.push(i), s.method[i.localName] = i;
  }
}
function Ss(e, n, t) {
  var r, a, s, o;
  let i;
  e.clientStreaming && e.serverStreaming ? i = "bidi_streaming" : e.clientStreaming ? i = "client_streaming" : e.serverStreaming ? i = "server_streaming" : i = "unary";
  const u = t.getMessage(K(e.inputType)), c = t.getMessage(K(e.outputType));
  P(u, `invalid MethodDescriptorProto: input_type ${e.inputType} not found`), P(c, `invalid MethodDescriptorProto: output_type ${e.inputType} not found`);
  const m = e.name;
  return {
    kind: "rpc",
    proto: e,
    deprecated: (a = (r = e.options) === null || r === void 0 ? void 0 : r.deprecated) !== null && a !== void 0 ? a : !1,
    parent: n,
    name: m,
    localName: ye(m.length ? ye(m[0].toLowerCase() + m.substring(1)) : m),
    methodKind: i,
    input: u,
    output: c,
    idempotency: (o = (s = e.options) === null || s === void 0 ? void 0 : s.idempotencyLevel) !== null && o !== void 0 ? o : Ns,
    toString() {
      return `rpc ${n.typeName}.${m}`;
    }
  };
}
function Os(e, n) {
  return {
    kind: "oneof",
    proto: e,
    deprecated: !1,
    parent: n,
    fields: [],
    name: e.name,
    localName: ye(ge(e.name)),
    toString() {
      return `oneof ${n.typeName}.${this.name}`;
    }
  };
}
function wn(e, n, t, r, a) {
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
    presence: Us(e, r, u, n),
    listKind: void 0,
    mapKind: void 0,
    mapKey: void 0,
    delimitedEncoding: void 0,
    packed: void 0,
    longAsString: !1,
    getDefaultValue: void 0
  };
  if (u) {
    const f = n.kind == "file" ? n : n.file, p = n.kind == "file" ? void 0 : n, h = Qe(e, p, f);
    c.kind = "extension", c.file = f, c.parent = p, c.oneof = void 0, c.typeName = h, c.jsonName = `[${h}]`, c.toString = () => `extension ${h}`;
    const g = t.getMessage(K(e.extendee));
    P(g, `invalid FieldDescriptorProto: extendee ${e.extendee} not found`), c.extendee = g;
  } else {
    const f = n;
    P(f.kind == "message"), c.parent = f, c.oneof = r, c.localName = r ? ge(e.name) : ye(ge(e.name)), c.jsonName = e.jsonName, c.toString = () => `field ${f.typeName}.${e.name}`;
  }
  const m = e.label, d = e.type, b = (i = e.options) === null || i === void 0 ? void 0 : i.jstype;
  if (m === jn) {
    const f = d == pe ? a?.get(K(e.typeName)) : void 0;
    if (f) {
      c.fieldKind = "map";
      const { key: p, value: h } = $s(f);
      return c.mapKey = p.scalar, c.mapKind = h.fieldKind, c.message = h.message, c.delimitedEncoding = !1, c.enum = h.enum, c.scalar = h.scalar, c;
    }
    switch (c.fieldKind = "list", d) {
      case pe:
      case Ee:
        c.listKind = "message", c.message = t.getMessage(K(e.typeName)), P(c.message), c.delimitedEncoding = It(e, n);
        break;
      case yt:
        c.listKind = "enum", c.enum = t.getEnum(K(e.typeName)), P(c.enum);
        break;
      default:
        c.listKind = "scalar", c.scalar = d, c.longAsString = b == Et;
        break;
    }
    return c.packed = xs(e, n), c;
  }
  switch (d) {
    case pe:
    case Ee:
      c.fieldKind = "message", c.message = t.getMessage(K(e.typeName)), P(c.message, `invalid FieldDescriptorProto: type_name ${e.typeName} not found`), c.delimitedEncoding = It(e, n), c.getDefaultValue = () => {
      };
      break;
    case yt: {
      const f = t.getEnum(K(e.typeName));
      P(f !== void 0, `invalid FieldDescriptorProto: type_name ${e.typeName} not found`), c.fieldKind = "enum", c.enum = t.getEnum(K(e.typeName)), c.getDefaultValue = () => he(e, "defaultValue") ? fs(f, e.defaultValue) : void 0;
      break;
    }
    default: {
      c.fieldKind = "scalar", c.scalar = d, c.longAsString = b == Et, c.getDefaultValue = () => he(e, "defaultValue") ? ms(d, e.defaultValue) : void 0;
      break;
    }
  }
  return c;
}
function ks(e) {
  switch (e.syntax) {
    case "":
    case "proto2":
      return ps;
    case "proto3":
      return hs;
    case "editions":
      if (e.edition in Pr)
        return e.edition;
      throw new Error(`${e.name}: unsupported edition`);
    default:
      throw new Error(`${e.name}: unsupported syntax "${e.syntax}"`);
  }
}
function As(e, n) {
  return e.dependency.map((t) => {
    const r = n.getFile(t);
    if (!r)
      throw new Error(`Cannot find ${t}, imported by ${e.name}`);
    return r;
  });
}
function Ds(e, n) {
  const t = Ls(e) + "_";
  for (const r of n) {
    if (!r.name.toLowerCase().startsWith(t))
      return;
    const a = r.name.substring(t.length);
    if (a.length == 0 || /^\d/.test(a))
      return;
  }
  return t;
}
function Ls(e) {
  return (e.substring(0, 1) + e.substring(1).replace(/[A-Z]/g, (n) => "_" + n)).toLowerCase();
}
function Qe(e, n, t) {
  let r;
  return n ? r = `${n.typeName}.${e.name}` : t.proto.package.length > 0 ? r = `${t.proto.package}.${e.name}` : r = `${e.name}`, r;
}
function K(e) {
  return e.startsWith(".") ? e.substring(1) : e;
}
function Rs(e, n) {
  if (!he(e, "oneofIndex") || e.proto3Optional)
    return;
  const t = n[e.oneofIndex];
  return P(t, `invalid FieldDescriptorProto: oneof #${e.oneofIndex} for field #${e.number} not found`), t;
}
function Us(e, n, t, r) {
  if (e.label == Es)
    return _s;
  if (e.label == jn)
    return Nt;
  if (n || e.proto3Optional || t)
    return pn;
  const a = ue("fieldPresence", { proto: e, parent: r });
  return a == Nt && (e.type == pe || e.type == Ee) ? pn : a;
}
function xs(e, n) {
  if (e.label != jn)
    return !1;
  switch (e.type) {
    case gs:
    case ys:
    case Ee:
    case pe:
      return !1;
  }
  const t = e.options;
  return t && he(t, "packed") ? t.packed : Is == ue("repeatedFieldEncoding", {
    proto: e,
    parent: n
  });
}
function $s(e) {
  const n = e.fields.find((r) => r.number === 1), t = e.fields.find((r) => r.number === 2);
  return P(n && n.fieldKind == "scalar" && n.scalar != l.BYTES && n.scalar != l.FLOAT && n.scalar != l.DOUBLE && t && t.fieldKind != "list" && t.fieldKind != "map"), { key: n, value: t };
}
function Fs(e) {
  var n;
  return Ts == ue("enumType", {
    proto: e.proto,
    parent: (n = e.parent) !== null && n !== void 0 ? n : e.file
  });
}
function It(e, n) {
  return e.type == Ee ? !0 : ws == ue("messageEncoding", {
    proto: e,
    parent: n
  });
}
function ue(e, n) {
  var t, r;
  const a = (t = n.proto.options) === null || t === void 0 ? void 0 : t.features;
  if (a) {
    const s = a[e];
    if (s != 0)
      return s;
  }
  if ("kind" in n) {
    if (n.kind == "message")
      return ue(e, (r = n.parent) !== null && r !== void 0 ? r : n.file);
    const s = Pr[n.edition];
    if (!s)
      throw new Error(`feature default for edition ${n.edition} not found`);
    return s[e];
  }
  return ue(e, n.parent);
}
function P(e, n) {
  if (!e)
    throw new Error(n);
}
function Ps(e) {
  const n = Vs(e);
  return n.messageType.forEach(Xn), Fr(n, () => {
  }).getFile(n.name);
}
function Vs(e) {
  return Object.assign(/* @__PURE__ */ Object.create({
    syntax: "",
    edition: 0
  }), Object.assign(Object.assign({ $typeName: "google.protobuf.FileDescriptorProto", dependency: [], publicDependency: [], weakDependency: [], optionDependency: [], service: [], extension: [] }, e), { messageType: e.messageType.map(Mr), enumType: e.enumType.map(Br) }));
}
function Mr(e) {
  var n, t, r, a, s, o, i, u;
  return Object.assign(/* @__PURE__ */ Object.create({
    visibility: 0
  }), {
    $typeName: "google.protobuf.DescriptorProto",
    name: e.name,
    field: (t = (n = e.field) === null || n === void 0 ? void 0 : n.map(Ys)) !== null && t !== void 0 ? t : [],
    extension: [],
    nestedType: (a = (r = e.nestedType) === null || r === void 0 ? void 0 : r.map(Mr)) !== null && a !== void 0 ? a : [],
    enumType: (o = (s = e.enumType) === null || s === void 0 ? void 0 : s.map(Br)) !== null && o !== void 0 ? o : [],
    extensionRange: (u = (i = e.extensionRange) === null || i === void 0 ? void 0 : i.map((m) => Object.assign({ $typeName: "google.protobuf.DescriptorProto.ExtensionRange" }, m))) !== null && u !== void 0 ? u : [],
    oneofDecl: [],
    reservedRange: [],
    reservedName: []
  });
}
function Ys(e) {
  return Object.assign(/* @__PURE__ */ Object.create({
    label: 1,
    typeName: "",
    extendee: "",
    defaultValue: "",
    oneofIndex: 0,
    jsonName: "",
    proto3Optional: !1
  }), Object.assign(Object.assign({ $typeName: "google.protobuf.FieldDescriptorProto" }, e), { options: e.options ? Ms(e.options) : void 0 }));
}
function Ms(e) {
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
function Br(e) {
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
function Oe(e, n, ...t) {
  return t.reduce((r, a) => r.nestedMessages[a], e.messages[n]);
}
const Bs = /* @__PURE__ */ Ps({ name: "google/protobuf/descriptor.proto", package: "google.protobuf", messageType: [{ name: "FileDescriptorSet", field: [{ name: "file", number: 1, type: 11, label: 3, typeName: ".google.protobuf.FileDescriptorProto" }], extensionRange: [{ start: 536e6, end: 536000001 }] }, { name: "FileDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "package", number: 2, type: 9, label: 1 }, { name: "dependency", number: 3, type: 9, label: 3 }, { name: "public_dependency", number: 10, type: 5, label: 3 }, { name: "weak_dependency", number: 11, type: 5, label: 3 }, { name: "option_dependency", number: 15, type: 9, label: 3 }, { name: "message_type", number: 4, type: 11, label: 3, typeName: ".google.protobuf.DescriptorProto" }, { name: "enum_type", number: 5, type: 11, label: 3, typeName: ".google.protobuf.EnumDescriptorProto" }, { name: "service", number: 6, type: 11, label: 3, typeName: ".google.protobuf.ServiceDescriptorProto" }, { name: "extension", number: 7, type: 11, label: 3, typeName: ".google.protobuf.FieldDescriptorProto" }, { name: "options", number: 8, type: 11, label: 1, typeName: ".google.protobuf.FileOptions" }, { name: "source_code_info", number: 9, type: 11, label: 1, typeName: ".google.protobuf.SourceCodeInfo" }, { name: "syntax", number: 12, type: 9, label: 1 }, { name: "edition", number: 14, type: 14, label: 1, typeName: ".google.protobuf.Edition" }] }, { name: "DescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "field", number: 2, type: 11, label: 3, typeName: ".google.protobuf.FieldDescriptorProto" }, { name: "extension", number: 6, type: 11, label: 3, typeName: ".google.protobuf.FieldDescriptorProto" }, { name: "nested_type", number: 3, type: 11, label: 3, typeName: ".google.protobuf.DescriptorProto" }, { name: "enum_type", number: 4, type: 11, label: 3, typeName: ".google.protobuf.EnumDescriptorProto" }, { name: "extension_range", number: 5, type: 11, label: 3, typeName: ".google.protobuf.DescriptorProto.ExtensionRange" }, { name: "oneof_decl", number: 8, type: 11, label: 3, typeName: ".google.protobuf.OneofDescriptorProto" }, { name: "options", number: 7, type: 11, label: 1, typeName: ".google.protobuf.MessageOptions" }, { name: "reserved_range", number: 9, type: 11, label: 3, typeName: ".google.protobuf.DescriptorProto.ReservedRange" }, { name: "reserved_name", number: 10, type: 9, label: 3 }, { name: "visibility", number: 11, type: 14, label: 1, typeName: ".google.protobuf.SymbolVisibility" }], nestedType: [{ name: "ExtensionRange", field: [{ name: "start", number: 1, type: 5, label: 1 }, { name: "end", number: 2, type: 5, label: 1 }, { name: "options", number: 3, type: 11, label: 1, typeName: ".google.protobuf.ExtensionRangeOptions" }] }, { name: "ReservedRange", field: [{ name: "start", number: 1, type: 5, label: 1 }, { name: "end", number: 2, type: 5, label: 1 }] }] }, { name: "ExtensionRangeOptions", field: [{ name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }, { name: "declaration", number: 2, type: 11, label: 3, typeName: ".google.protobuf.ExtensionRangeOptions.Declaration", options: { retention: 2 } }, { name: "features", number: 50, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "verification", number: 3, type: 14, label: 1, typeName: ".google.protobuf.ExtensionRangeOptions.VerificationState", defaultValue: "UNVERIFIED", options: { retention: 2 } }], nestedType: [{ name: "Declaration", field: [{ name: "number", number: 1, type: 5, label: 1 }, { name: "full_name", number: 2, type: 9, label: 1 }, { name: "type", number: 3, type: 9, label: 1 }, { name: "reserved", number: 5, type: 8, label: 1 }, { name: "repeated", number: 6, type: 8, label: 1 }] }], enumType: [{ name: "VerificationState", value: [{ name: "DECLARATION", number: 0 }, { name: "UNVERIFIED", number: 1 }] }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "FieldDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "number", number: 3, type: 5, label: 1 }, { name: "label", number: 4, type: 14, label: 1, typeName: ".google.protobuf.FieldDescriptorProto.Label" }, { name: "type", number: 5, type: 14, label: 1, typeName: ".google.protobuf.FieldDescriptorProto.Type" }, { name: "type_name", number: 6, type: 9, label: 1 }, { name: "extendee", number: 2, type: 9, label: 1 }, { name: "default_value", number: 7, type: 9, label: 1 }, { name: "oneof_index", number: 9, type: 5, label: 1 }, { name: "json_name", number: 10, type: 9, label: 1 }, { name: "options", number: 8, type: 11, label: 1, typeName: ".google.protobuf.FieldOptions" }, { name: "proto3_optional", number: 17, type: 8, label: 1 }], enumType: [{ name: "Type", value: [{ name: "TYPE_DOUBLE", number: 1 }, { name: "TYPE_FLOAT", number: 2 }, { name: "TYPE_INT64", number: 3 }, { name: "TYPE_UINT64", number: 4 }, { name: "TYPE_INT32", number: 5 }, { name: "TYPE_FIXED64", number: 6 }, { name: "TYPE_FIXED32", number: 7 }, { name: "TYPE_BOOL", number: 8 }, { name: "TYPE_STRING", number: 9 }, { name: "TYPE_GROUP", number: 10 }, { name: "TYPE_MESSAGE", number: 11 }, { name: "TYPE_BYTES", number: 12 }, { name: "TYPE_UINT32", number: 13 }, { name: "TYPE_ENUM", number: 14 }, { name: "TYPE_SFIXED32", number: 15 }, { name: "TYPE_SFIXED64", number: 16 }, { name: "TYPE_SINT32", number: 17 }, { name: "TYPE_SINT64", number: 18 }] }, { name: "Label", value: [{ name: "LABEL_OPTIONAL", number: 1 }, { name: "LABEL_REPEATED", number: 3 }, { name: "LABEL_REQUIRED", number: 2 }] }] }, { name: "OneofDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "options", number: 2, type: 11, label: 1, typeName: ".google.protobuf.OneofOptions" }] }, { name: "EnumDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "value", number: 2, type: 11, label: 3, typeName: ".google.protobuf.EnumValueDescriptorProto" }, { name: "options", number: 3, type: 11, label: 1, typeName: ".google.protobuf.EnumOptions" }, { name: "reserved_range", number: 4, type: 11, label: 3, typeName: ".google.protobuf.EnumDescriptorProto.EnumReservedRange" }, { name: "reserved_name", number: 5, type: 9, label: 3 }, { name: "visibility", number: 6, type: 14, label: 1, typeName: ".google.protobuf.SymbolVisibility" }], nestedType: [{ name: "EnumReservedRange", field: [{ name: "start", number: 1, type: 5, label: 1 }, { name: "end", number: 2, type: 5, label: 1 }] }] }, { name: "EnumValueDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "number", number: 2, type: 5, label: 1 }, { name: "options", number: 3, type: 11, label: 1, typeName: ".google.protobuf.EnumValueOptions" }] }, { name: "ServiceDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "method", number: 2, type: 11, label: 3, typeName: ".google.protobuf.MethodDescriptorProto" }, { name: "options", number: 3, type: 11, label: 1, typeName: ".google.protobuf.ServiceOptions" }] }, { name: "MethodDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "input_type", number: 2, type: 9, label: 1 }, { name: "output_type", number: 3, type: 9, label: 1 }, { name: "options", number: 4, type: 11, label: 1, typeName: ".google.protobuf.MethodOptions" }, { name: "client_streaming", number: 5, type: 8, label: 1, defaultValue: "false" }, { name: "server_streaming", number: 6, type: 8, label: 1, defaultValue: "false" }] }, { name: "FileOptions", field: [{ name: "java_package", number: 1, type: 9, label: 1 }, { name: "java_outer_classname", number: 8, type: 9, label: 1 }, { name: "java_multiple_files", number: 10, type: 8, label: 1, defaultValue: "false" }, { name: "java_generate_equals_and_hash", number: 20, type: 8, label: 1, options: { deprecated: !0 } }, { name: "java_string_check_utf8", number: 27, type: 8, label: 1, defaultValue: "false" }, { name: "optimize_for", number: 9, type: 14, label: 1, typeName: ".google.protobuf.FileOptions.OptimizeMode", defaultValue: "SPEED" }, { name: "go_package", number: 11, type: 9, label: 1 }, { name: "cc_generic_services", number: 16, type: 8, label: 1, defaultValue: "false" }, { name: "java_generic_services", number: 17, type: 8, label: 1, defaultValue: "false" }, { name: "py_generic_services", number: 18, type: 8, label: 1, defaultValue: "false" }, { name: "deprecated", number: 23, type: 8, label: 1, defaultValue: "false" }, { name: "cc_enable_arenas", number: 31, type: 8, label: 1, defaultValue: "true" }, { name: "objc_class_prefix", number: 36, type: 9, label: 1 }, { name: "csharp_namespace", number: 37, type: 9, label: 1 }, { name: "swift_prefix", number: 39, type: 9, label: 1 }, { name: "php_class_prefix", number: 40, type: 9, label: 1 }, { name: "php_namespace", number: 41, type: 9, label: 1 }, { name: "php_metadata_namespace", number: 44, type: 9, label: 1 }, { name: "ruby_package", number: 45, type: 9, label: 1 }, { name: "features", number: 50, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], enumType: [{ name: "OptimizeMode", value: [{ name: "SPEED", number: 1 }, { name: "CODE_SIZE", number: 2 }, { name: "LITE_RUNTIME", number: 3 }] }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "MessageOptions", field: [{ name: "message_set_wire_format", number: 1, type: 8, label: 1, defaultValue: "false" }, { name: "no_standard_descriptor_accessor", number: 2, type: 8, label: 1, defaultValue: "false" }, { name: "deprecated", number: 3, type: 8, label: 1, defaultValue: "false" }, { name: "map_entry", number: 7, type: 8, label: 1 }, { name: "deprecated_legacy_json_field_conflicts", number: 11, type: 8, label: 1, options: { deprecated: !0 } }, { name: "features", number: 12, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "FieldOptions", field: [{ name: "ctype", number: 1, type: 14, label: 1, typeName: ".google.protobuf.FieldOptions.CType", defaultValue: "STRING" }, { name: "packed", number: 2, type: 8, label: 1 }, { name: "jstype", number: 6, type: 14, label: 1, typeName: ".google.protobuf.FieldOptions.JSType", defaultValue: "JS_NORMAL" }, { name: "lazy", number: 5, type: 8, label: 1, defaultValue: "false" }, { name: "unverified_lazy", number: 15, type: 8, label: 1, defaultValue: "false" }, { name: "deprecated", number: 3, type: 8, label: 1, defaultValue: "false" }, { name: "weak", number: 10, type: 8, label: 1, defaultValue: "false", options: { deprecated: !0 } }, { name: "debug_redact", number: 16, type: 8, label: 1, defaultValue: "false" }, { name: "retention", number: 17, type: 14, label: 1, typeName: ".google.protobuf.FieldOptions.OptionRetention" }, { name: "targets", number: 19, type: 14, label: 3, typeName: ".google.protobuf.FieldOptions.OptionTargetType" }, { name: "edition_defaults", number: 20, type: 11, label: 3, typeName: ".google.protobuf.FieldOptions.EditionDefault" }, { name: "features", number: 21, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "feature_support", number: 22, type: 11, label: 1, typeName: ".google.protobuf.FieldOptions.FeatureSupport" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], nestedType: [{ name: "EditionDefault", field: [{ name: "edition", number: 3, type: 14, label: 1, typeName: ".google.protobuf.Edition" }, { name: "value", number: 2, type: 9, label: 1 }] }, { name: "FeatureSupport", field: [{ name: "edition_introduced", number: 1, type: 14, label: 1, typeName: ".google.protobuf.Edition" }, { name: "edition_deprecated", number: 2, type: 14, label: 1, typeName: ".google.protobuf.Edition" }, { name: "deprecation_warning", number: 3, type: 9, label: 1 }, { name: "edition_removed", number: 4, type: 14, label: 1, typeName: ".google.protobuf.Edition" }] }], enumType: [{ name: "CType", value: [{ name: "STRING", number: 0 }, { name: "CORD", number: 1 }, { name: "STRING_PIECE", number: 2 }] }, { name: "JSType", value: [{ name: "JS_NORMAL", number: 0 }, { name: "JS_STRING", number: 1 }, { name: "JS_NUMBER", number: 2 }] }, { name: "OptionRetention", value: [{ name: "RETENTION_UNKNOWN", number: 0 }, { name: "RETENTION_RUNTIME", number: 1 }, { name: "RETENTION_SOURCE", number: 2 }] }, { name: "OptionTargetType", value: [{ name: "TARGET_TYPE_UNKNOWN", number: 0 }, { name: "TARGET_TYPE_FILE", number: 1 }, { name: "TARGET_TYPE_EXTENSION_RANGE", number: 2 }, { name: "TARGET_TYPE_MESSAGE", number: 3 }, { name: "TARGET_TYPE_FIELD", number: 4 }, { name: "TARGET_TYPE_ONEOF", number: 5 }, { name: "TARGET_TYPE_ENUM", number: 6 }, { name: "TARGET_TYPE_ENUM_ENTRY", number: 7 }, { name: "TARGET_TYPE_SERVICE", number: 8 }, { name: "TARGET_TYPE_METHOD", number: 9 }] }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "OneofOptions", field: [{ name: "features", number: 1, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "EnumOptions", field: [{ name: "allow_alias", number: 2, type: 8, label: 1 }, { name: "deprecated", number: 3, type: 8, label: 1, defaultValue: "false" }, { name: "deprecated_legacy_json_field_conflicts", number: 6, type: 8, label: 1, options: { deprecated: !0 } }, { name: "features", number: 7, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "EnumValueOptions", field: [{ name: "deprecated", number: 1, type: 8, label: 1, defaultValue: "false" }, { name: "features", number: 2, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "debug_redact", number: 3, type: 8, label: 1, defaultValue: "false" }, { name: "feature_support", number: 4, type: 11, label: 1, typeName: ".google.protobuf.FieldOptions.FeatureSupport" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "ServiceOptions", field: [{ name: "features", number: 34, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "deprecated", number: 33, type: 8, label: 1, defaultValue: "false" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "MethodOptions", field: [{ name: "deprecated", number: 33, type: 8, label: 1, defaultValue: "false" }, { name: "idempotency_level", number: 34, type: 14, label: 1, typeName: ".google.protobuf.MethodOptions.IdempotencyLevel", defaultValue: "IDEMPOTENCY_UNKNOWN" }, { name: "features", number: 35, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], enumType: [{ name: "IdempotencyLevel", value: [{ name: "IDEMPOTENCY_UNKNOWN", number: 0 }, { name: "NO_SIDE_EFFECTS", number: 1 }, { name: "IDEMPOTENT", number: 2 }] }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "UninterpretedOption", field: [{ name: "name", number: 2, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption.NamePart" }, { name: "identifier_value", number: 3, type: 9, label: 1 }, { name: "positive_int_value", number: 4, type: 4, label: 1 }, { name: "negative_int_value", number: 5, type: 3, label: 1 }, { name: "double_value", number: 6, type: 1, label: 1 }, { name: "string_value", number: 7, type: 12, label: 1 }, { name: "aggregate_value", number: 8, type: 9, label: 1 }], nestedType: [{ name: "NamePart", field: [{ name: "name_part", number: 1, type: 9, label: 2 }, { name: "is_extension", number: 2, type: 8, label: 2 }] }] }, { name: "FeatureSet", field: [{ name: "field_presence", number: 1, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.FieldPresence", options: { retention: 1, targets: [4, 1], editionDefaults: [{ value: "EXPLICIT", edition: 900 }, { value: "IMPLICIT", edition: 999 }, { value: "EXPLICIT", edition: 1e3 }] } }, { name: "enum_type", number: 2, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.EnumType", options: { retention: 1, targets: [6, 1], editionDefaults: [{ value: "CLOSED", edition: 900 }, { value: "OPEN", edition: 999 }] } }, { name: "repeated_field_encoding", number: 3, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.RepeatedFieldEncoding", options: { retention: 1, targets: [4, 1], editionDefaults: [{ value: "EXPANDED", edition: 900 }, { value: "PACKED", edition: 999 }] } }, { name: "utf8_validation", number: 4, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.Utf8Validation", options: { retention: 1, targets: [4, 1], editionDefaults: [{ value: "NONE", edition: 900 }, { value: "VERIFY", edition: 999 }] } }, { name: "message_encoding", number: 5, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.MessageEncoding", options: { retention: 1, targets: [4, 1], editionDefaults: [{ value: "LENGTH_PREFIXED", edition: 900 }] } }, { name: "json_format", number: 6, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.JsonFormat", options: { retention: 1, targets: [3, 6, 1], editionDefaults: [{ value: "LEGACY_BEST_EFFORT", edition: 900 }, { value: "ALLOW", edition: 999 }] } }, { name: "enforce_naming_style", number: 7, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.EnforceNamingStyle", options: { retention: 2, targets: [1, 2, 3, 4, 5, 6, 7, 8, 9], editionDefaults: [{ value: "STYLE_LEGACY", edition: 900 }, { value: "STYLE2024", edition: 1001 }] } }, { name: "default_symbol_visibility", number: 8, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.VisibilityFeature.DefaultSymbolVisibility", options: { retention: 2, targets: [1], editionDefaults: [{ value: "EXPORT_ALL", edition: 900 }, { value: "EXPORT_TOP_LEVEL", edition: 1001 }] } }], nestedType: [{ name: "VisibilityFeature", enumType: [{ name: "DefaultSymbolVisibility", value: [{ name: "DEFAULT_SYMBOL_VISIBILITY_UNKNOWN", number: 0 }, { name: "EXPORT_ALL", number: 1 }, { name: "EXPORT_TOP_LEVEL", number: 2 }, { name: "LOCAL_ALL", number: 3 }, { name: "STRICT", number: 4 }] }] }], enumType: [{ name: "FieldPresence", value: [{ name: "FIELD_PRESENCE_UNKNOWN", number: 0 }, { name: "EXPLICIT", number: 1 }, { name: "IMPLICIT", number: 2 }, { name: "LEGACY_REQUIRED", number: 3 }] }, { name: "EnumType", value: [{ name: "ENUM_TYPE_UNKNOWN", number: 0 }, { name: "OPEN", number: 1 }, { name: "CLOSED", number: 2 }] }, { name: "RepeatedFieldEncoding", value: [{ name: "REPEATED_FIELD_ENCODING_UNKNOWN", number: 0 }, { name: "PACKED", number: 1 }, { name: "EXPANDED", number: 2 }] }, { name: "Utf8Validation", value: [{ name: "UTF8_VALIDATION_UNKNOWN", number: 0 }, { name: "VERIFY", number: 2 }, { name: "NONE", number: 3 }] }, { name: "MessageEncoding", value: [{ name: "MESSAGE_ENCODING_UNKNOWN", number: 0 }, { name: "LENGTH_PREFIXED", number: 1 }, { name: "DELIMITED", number: 2 }] }, { name: "JsonFormat", value: [{ name: "JSON_FORMAT_UNKNOWN", number: 0 }, { name: "ALLOW", number: 1 }, { name: "LEGACY_BEST_EFFORT", number: 2 }] }, { name: "EnforceNamingStyle", value: [{ name: "ENFORCE_NAMING_STYLE_UNKNOWN", number: 0 }, { name: "STYLE2024", number: 1 }, { name: "STYLE_LEGACY", number: 2 }] }], extensionRange: [{ start: 1e3, end: 9995 }, { start: 9995, end: 1e4 }, { start: 1e4, end: 10001 }] }, { name: "FeatureSetDefaults", field: [{ name: "defaults", number: 1, type: 11, label: 3, typeName: ".google.protobuf.FeatureSetDefaults.FeatureSetEditionDefault" }, { name: "minimum_edition", number: 4, type: 14, label: 1, typeName: ".google.protobuf.Edition" }, { name: "maximum_edition", number: 5, type: 14, label: 1, typeName: ".google.protobuf.Edition" }], nestedType: [{ name: "FeatureSetEditionDefault", field: [{ name: "edition", number: 3, type: 14, label: 1, typeName: ".google.protobuf.Edition" }, { name: "overridable_features", number: 4, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "fixed_features", number: 5, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }] }] }, { name: "SourceCodeInfo", field: [{ name: "location", number: 1, type: 11, label: 3, typeName: ".google.protobuf.SourceCodeInfo.Location" }], nestedType: [{ name: "Location", field: [{ name: "path", number: 1, type: 5, label: 3, options: { packed: !0 } }, { name: "span", number: 2, type: 5, label: 3, options: { packed: !0 } }, { name: "leading_comments", number: 3, type: 9, label: 1 }, { name: "trailing_comments", number: 4, type: 9, label: 1 }, { name: "leading_detached_comments", number: 6, type: 9, label: 3 }] }], extensionRange: [{ start: 536e6, end: 536000001 }] }, { name: "GeneratedCodeInfo", field: [{ name: "annotation", number: 1, type: 11, label: 3, typeName: ".google.protobuf.GeneratedCodeInfo.Annotation" }], nestedType: [{ name: "Annotation", field: [{ name: "path", number: 1, type: 5, label: 3, options: { packed: !0 } }, { name: "source_file", number: 2, type: 9, label: 1 }, { name: "begin", number: 3, type: 5, label: 1 }, { name: "end", number: 4, type: 5, label: 1 }, { name: "semantic", number: 5, type: 14, label: 1, typeName: ".google.protobuf.GeneratedCodeInfo.Annotation.Semantic" }], enumType: [{ name: "Semantic", value: [{ name: "NONE", number: 0 }, { name: "SET", number: 1 }, { name: "ALIAS", number: 2 }] }] }] }], enumType: [{ name: "Edition", value: [{ name: "EDITION_UNKNOWN", number: 0 }, { name: "EDITION_LEGACY", number: 900 }, { name: "EDITION_PROTO2", number: 998 }, { name: "EDITION_PROTO3", number: 999 }, { name: "EDITION_2023", number: 1e3 }, { name: "EDITION_2024", number: 1001 }, { name: "EDITION_UNSTABLE", number: 9999 }, { name: "EDITION_1_TEST_ONLY", number: 1 }, { name: "EDITION_2_TEST_ONLY", number: 2 }, { name: "EDITION_99997_TEST_ONLY", number: 99997 }, { name: "EDITION_99998_TEST_ONLY", number: 99998 }, { name: "EDITION_99999_TEST_ONLY", number: 99999 }, { name: "EDITION_MAX", number: 2147483647 }] }, { name: "SymbolVisibility", value: [{ name: "VISIBILITY_UNSET", number: 0 }, { name: "VISIBILITY_LOCAL", number: 1 }, { name: "VISIBILITY_EXPORT", number: 2 }] }] }), Gs = /* @__PURE__ */ Oe(Bs, 1);
var wt;
(function(e) {
  e[e.DECLARATION = 0] = "DECLARATION", e[e.UNVERIFIED = 1] = "UNVERIFIED";
})(wt || (wt = {}));
var Tt;
(function(e) {
  e[e.DOUBLE = 1] = "DOUBLE", e[e.FLOAT = 2] = "FLOAT", e[e.INT64 = 3] = "INT64", e[e.UINT64 = 4] = "UINT64", e[e.INT32 = 5] = "INT32", e[e.FIXED64 = 6] = "FIXED64", e[e.FIXED32 = 7] = "FIXED32", e[e.BOOL = 8] = "BOOL", e[e.STRING = 9] = "STRING", e[e.GROUP = 10] = "GROUP", e[e.MESSAGE = 11] = "MESSAGE", e[e.BYTES = 12] = "BYTES", e[e.UINT32 = 13] = "UINT32", e[e.ENUM = 14] = "ENUM", e[e.SFIXED32 = 15] = "SFIXED32", e[e.SFIXED64 = 16] = "SFIXED64", e[e.SINT32 = 17] = "SINT32", e[e.SINT64 = 18] = "SINT64";
})(Tt || (Tt = {}));
var vt;
(function(e) {
  e[e.OPTIONAL = 1] = "OPTIONAL", e[e.REPEATED = 3] = "REPEATED", e[e.REQUIRED = 2] = "REQUIRED";
})(vt || (vt = {}));
var St;
(function(e) {
  e[e.SPEED = 1] = "SPEED", e[e.CODE_SIZE = 2] = "CODE_SIZE", e[e.LITE_RUNTIME = 3] = "LITE_RUNTIME";
})(St || (St = {}));
var Ot;
(function(e) {
  e[e.STRING = 0] = "STRING", e[e.CORD = 1] = "CORD", e[e.STRING_PIECE = 2] = "STRING_PIECE";
})(Ot || (Ot = {}));
var kt;
(function(e) {
  e[e.JS_NORMAL = 0] = "JS_NORMAL", e[e.JS_STRING = 1] = "JS_STRING", e[e.JS_NUMBER = 2] = "JS_NUMBER";
})(kt || (kt = {}));
var At;
(function(e) {
  e[e.RETENTION_UNKNOWN = 0] = "RETENTION_UNKNOWN", e[e.RETENTION_RUNTIME = 1] = "RETENTION_RUNTIME", e[e.RETENTION_SOURCE = 2] = "RETENTION_SOURCE";
})(At || (At = {}));
var Dt;
(function(e) {
  e[e.TARGET_TYPE_UNKNOWN = 0] = "TARGET_TYPE_UNKNOWN", e[e.TARGET_TYPE_FILE = 1] = "TARGET_TYPE_FILE", e[e.TARGET_TYPE_EXTENSION_RANGE = 2] = "TARGET_TYPE_EXTENSION_RANGE", e[e.TARGET_TYPE_MESSAGE = 3] = "TARGET_TYPE_MESSAGE", e[e.TARGET_TYPE_FIELD = 4] = "TARGET_TYPE_FIELD", e[e.TARGET_TYPE_ONEOF = 5] = "TARGET_TYPE_ONEOF", e[e.TARGET_TYPE_ENUM = 6] = "TARGET_TYPE_ENUM", e[e.TARGET_TYPE_ENUM_ENTRY = 7] = "TARGET_TYPE_ENUM_ENTRY", e[e.TARGET_TYPE_SERVICE = 8] = "TARGET_TYPE_SERVICE", e[e.TARGET_TYPE_METHOD = 9] = "TARGET_TYPE_METHOD";
})(Dt || (Dt = {}));
var Tn;
(function(e) {
  e[e.IDEMPOTENCY_UNKNOWN = 0] = "IDEMPOTENCY_UNKNOWN", e[e.NO_SIDE_EFFECTS = 1] = "NO_SIDE_EFFECTS", e[e.IDEMPOTENT = 2] = "IDEMPOTENT";
})(Tn || (Tn = {}));
var Lt;
(function(e) {
  e[e.DEFAULT_SYMBOL_VISIBILITY_UNKNOWN = 0] = "DEFAULT_SYMBOL_VISIBILITY_UNKNOWN", e[e.EXPORT_ALL = 1] = "EXPORT_ALL", e[e.EXPORT_TOP_LEVEL = 2] = "EXPORT_TOP_LEVEL", e[e.LOCAL_ALL = 3] = "LOCAL_ALL", e[e.STRICT = 4] = "STRICT";
})(Lt || (Lt = {}));
var Rt;
(function(e) {
  e[e.FIELD_PRESENCE_UNKNOWN = 0] = "FIELD_PRESENCE_UNKNOWN", e[e.EXPLICIT = 1] = "EXPLICIT", e[e.IMPLICIT = 2] = "IMPLICIT", e[e.LEGACY_REQUIRED = 3] = "LEGACY_REQUIRED";
})(Rt || (Rt = {}));
var Ut;
(function(e) {
  e[e.ENUM_TYPE_UNKNOWN = 0] = "ENUM_TYPE_UNKNOWN", e[e.OPEN = 1] = "OPEN", e[e.CLOSED = 2] = "CLOSED";
})(Ut || (Ut = {}));
var xt;
(function(e) {
  e[e.REPEATED_FIELD_ENCODING_UNKNOWN = 0] = "REPEATED_FIELD_ENCODING_UNKNOWN", e[e.PACKED = 1] = "PACKED", e[e.EXPANDED = 2] = "EXPANDED";
})(xt || (xt = {}));
var $t;
(function(e) {
  e[e.UTF8_VALIDATION_UNKNOWN = 0] = "UTF8_VALIDATION_UNKNOWN", e[e.VERIFY = 2] = "VERIFY", e[e.NONE = 3] = "NONE";
})($t || ($t = {}));
var Ft;
(function(e) {
  e[e.MESSAGE_ENCODING_UNKNOWN = 0] = "MESSAGE_ENCODING_UNKNOWN", e[e.LENGTH_PREFIXED = 1] = "LENGTH_PREFIXED", e[e.DELIMITED = 2] = "DELIMITED";
})(Ft || (Ft = {}));
var Pt;
(function(e) {
  e[e.JSON_FORMAT_UNKNOWN = 0] = "JSON_FORMAT_UNKNOWN", e[e.ALLOW = 1] = "ALLOW", e[e.LEGACY_BEST_EFFORT = 2] = "LEGACY_BEST_EFFORT";
})(Pt || (Pt = {}));
var Vt;
(function(e) {
  e[e.ENFORCE_NAMING_STYLE_UNKNOWN = 0] = "ENFORCE_NAMING_STYLE_UNKNOWN", e[e.STYLE2024 = 1] = "STYLE2024", e[e.STYLE_LEGACY = 2] = "STYLE_LEGACY";
})(Vt || (Vt = {}));
var Yt;
(function(e) {
  e[e.NONE = 0] = "NONE", e[e.SET = 1] = "SET", e[e.ALIAS = 2] = "ALIAS";
})(Yt || (Yt = {}));
var Mt;
(function(e) {
  e[e.EDITION_UNKNOWN = 0] = "EDITION_UNKNOWN", e[e.EDITION_LEGACY = 900] = "EDITION_LEGACY", e[e.EDITION_PROTO2 = 998] = "EDITION_PROTO2", e[e.EDITION_PROTO3 = 999] = "EDITION_PROTO3", e[e.EDITION_2023 = 1e3] = "EDITION_2023", e[e.EDITION_2024 = 1001] = "EDITION_2024", e[e.EDITION_UNSTABLE = 9999] = "EDITION_UNSTABLE", e[e.EDITION_1_TEST_ONLY = 1] = "EDITION_1_TEST_ONLY", e[e.EDITION_2_TEST_ONLY = 2] = "EDITION_2_TEST_ONLY", e[e.EDITION_99997_TEST_ONLY = 99997] = "EDITION_99997_TEST_ONLY", e[e.EDITION_99998_TEST_ONLY = 99998] = "EDITION_99998_TEST_ONLY", e[e.EDITION_99999_TEST_ONLY = 99999] = "EDITION_99999_TEST_ONLY", e[e.EDITION_MAX = 2147483647] = "EDITION_MAX";
})(Mt || (Mt = {}));
var Bt;
(function(e) {
  e[e.VISIBILITY_UNSET = 0] = "VISIBILITY_UNSET", e[e.VISIBILITY_LOCAL = 1] = "VISIBILITY_LOCAL", e[e.VISIBILITY_EXPORT = 2] = "VISIBILITY_EXPORT";
})(Bt || (Bt = {}));
const Gt = {
  readUnknownFields: !0
};
function Ks(e) {
  return e ? Object.assign(Object.assign({}, Gt), e) : Gt;
}
function en(e, n, t) {
  const r = F(e, void 0, !1);
  return Gr(r, new Yn(n), Ks(t), !1, n.byteLength), r.message;
}
function Gr(e, n, t, r, a) {
  var s;
  const o = r ? n.len : n.pos + a;
  let i, u;
  const c = (s = e.getUnknown()) !== null && s !== void 0 ? s : [];
  for (; n.pos < o && ([i, u] = n.tag(), !(r && u == N.EndGroup)); ) {
    const m = e.findNumber(i);
    if (!m) {
      const d = n.skip(u, i);
      t.readUnknownFields && c.push({ no: i, wireType: u, data: d });
      continue;
    }
    Kr(e, n, m, u, t);
  }
  if (r && (u != N.EndGroup || i !== a))
    throw new Error("invalid end group tag");
  c.length > 0 && e.setUnknown(c);
}
function Kr(e, n, t, r, a) {
  var s;
  switch (t.fieldKind) {
    case "scalar":
      e.set(t, ce(n, t.scalar));
      break;
    case "enum":
      const o = ce(n, l.INT32);
      if (t.enum.open)
        e.set(t, o);
      else if (t.enum.values.some((u) => u.number === o))
        e.set(t, o);
      else if (a.readUnknownFields) {
        const u = [];
        En(o, u);
        const c = (s = e.getUnknown()) !== null && s !== void 0 ? s : [];
        c.push({
          no: t.number,
          wireType: r,
          data: new Uint8Array(u)
        }), e.setUnknown(c);
      }
      break;
    case "message":
      e.set(t, Wn(n, a, t, e.get(t)));
      break;
    case "list":
      Js(n, r, e.get(t), a);
      break;
    case "map":
      Cs(n, e.get(t), a);
      break;
  }
}
function Cs(e, n, t) {
  const r = n.field();
  let a, s;
  const o = e.uint32(), i = e.pos + o;
  for (; e.pos < i; ) {
    const [u] = e.tag();
    switch (u) {
      case 1:
        a = ce(e, r.mapKey);
        break;
      case 2:
        switch (r.mapKind) {
          case "scalar":
            s = ce(e, r.scalar);
            break;
          case "enum":
            s = e.int32();
            break;
          case "message":
            s = Wn(e, t, r);
            break;
        }
        break;
    }
  }
  if (a === void 0 && (a = re(r.mapKey, !1)), s === void 0)
    switch (r.mapKind) {
      case "scalar":
        s = re(r.scalar, !1);
        break;
      case "enum":
        s = r.enum.values[0].number;
        break;
      case "message":
        s = F(r.message, void 0, !1);
        break;
    }
  n.set(a, s);
}
function Js(e, n, t, r) {
  var a;
  const s = t.field();
  if (s.listKind === "message") {
    t.add(Wn(e, r, s));
    return;
  }
  const o = (a = s.scalar) !== null && a !== void 0 ? a : l.INT32;
  if (!(n == N.LengthDelimited && o != l.STRING && o != l.BYTES)) {
    t.add(ce(e, o));
    return;
  }
  const u = e.uint32() + e.pos;
  for (; e.pos < u; )
    t.add(ce(e, o));
}
function Wn(e, n, t, r) {
  const a = t.delimitedEncoding, s = r ?? F(t.message, void 0, !1);
  return Gr(s, e, n, a, a ? t.number : e.uint32()), s;
}
function ce(e, n) {
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
function Cr(e, n) {
  var t;
  const r = en(Gs, Jn(e));
  return r.messageType.forEach(Xn), r.dependency = (t = void 0) !== null && t !== void 0 ? t : [], Fr(r, (s) => {
  }).getFile(r.name);
}
const Xs = /* @__PURE__ */ Cr("Chlnb29nbGUvcHJvdG9idWYvYW55LnByb3RvEg9nb29nbGUucHJvdG9idWYiJgoDQW55EhAKCHR5cGVfdXJsGAEgASgJEg0KBXZhbHVlGAIgASgMQnYKE2NvbS5nb29nbGUucHJvdG9idWZCCEFueVByb3RvUAFaLGdvb2dsZS5nb2xhbmcub3JnL3Byb3RvYnVmL3R5cGVzL2tub3duL2FueXBiogIDR1BCqgIeR29vZ2xlLlByb3RvYnVmLldlbGxLbm93blR5cGVzYgZwcm90bzM"), js = /* @__PURE__ */ Oe(Xs, 0), Ws = 3, Kt = {
  writeUnknownFields: !0
};
function Zs(e) {
  return e ? Object.assign(Object.assign({}, Kt), e) : Kt;
}
function Jr(e, n, t) {
  return Je(new Tr(), Zs(t), F(e, n)).finish();
}
function Je(e, n, t) {
  var r;
  for (const a of t.sortedFields) {
    if (!t.isSet(a)) {
      if (a.presence == Ws)
        throw new Error(`cannot encode ${a} to binary: required field not set`);
      continue;
    }
    Xr(e, n, t, a);
  }
  if (n.writeUnknownFields)
    for (const { no: a, wireType: s, data: o } of (r = t.getUnknown()) !== null && r !== void 0 ? r : [])
      e.tag(a, s).raw(o);
  return e;
}
function Xr(e, n, t, r) {
  var a;
  switch (r.fieldKind) {
    case "scalar":
    case "enum":
      Xe(e, t.desc.typeName, r.name, (a = r.scalar) !== null && a !== void 0 ? a : l.INT32, r.number, t.get(r));
      break;
    case "list":
      Hs(e, n, r, t.get(r));
      break;
    case "message":
      jr(e, n, r, t.get(r));
      break;
    case "map":
      for (const [s, o] of t.get(r))
        zs(e, n, r, s, o);
      break;
  }
}
function Xe(e, n, t, r, a, s) {
  Wr(e.tag(a, qs(r)), n, t, r, s);
}
function jr(e, n, t, r) {
  t.delimitedEncoding ? Je(e.tag(t.number, N.StartGroup), n, r).tag(t.number, N.EndGroup) : Je(e.tag(t.number, N.LengthDelimited).fork(), n, r).join();
}
function Hs(e, n, t, r) {
  var a;
  if (t.listKind == "message") {
    for (const o of r)
      jr(e, n, t, o);
    return;
  }
  const s = (a = t.scalar) !== null && a !== void 0 ? a : l.INT32;
  if (t.packed) {
    if (!r.size)
      return;
    e.tag(t.number, N.LengthDelimited).fork();
    for (const o of r)
      Wr(e, t.parent.typeName, t.name, s, o);
    e.join();
    return;
  }
  for (const o of r)
    Xe(e, t.parent.typeName, t.name, s, t.number, o);
}
function zs(e, n, t, r, a) {
  var s;
  switch (e.tag(t.number, N.LengthDelimited).fork(), Xe(e, t.parent.typeName, t.name, t.mapKey, 1, r), t.mapKind) {
    case "scalar":
    case "enum":
      Xe(e, t.parent.typeName, t.name, (s = t.scalar) !== null && s !== void 0 ? s : l.INT32, 2, a);
      break;
    case "message":
      Je(e.tag(2, N.LengthDelimited).fork(), n, a).join();
      break;
  }
  e.join();
}
function Wr(e, n, t, r, a) {
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
function qs(e) {
  switch (e) {
    case l.BYTES:
    case l.STRING:
      return N.LengthDelimited;
    case l.DOUBLE:
    case l.FIXED64:
    case l.SFIXED64:
      return N.Bit64;
    case l.FIXED32:
    case l.SFIXED32:
    case l.FLOAT:
      return N.Bit32;
    default:
      return N.Varint;
  }
}
function Qs(e, n, t) {
  let r = !1;
  return t || (t = V(js), r = !0), t.value = Jr(e, n), t.typeUrl = to(n.$typeName), r ? t : void 0;
}
function eo(e, n) {
  if (e.typeUrl === "")
    return !1;
  const t = typeof n == "string" ? n : n.typeName, r = Zr(e.typeUrl);
  return t === r;
}
function no(e, n) {
  if (e.typeUrl === "")
    return;
  const t = n.kind == "message" ? n : n.getMessage(Zr(e.typeUrl));
  if (!(!t || !eo(e, t)))
    return en(t, e.value);
}
function to(e) {
  return `type.googleapis.com/${e}`;
}
function Zr(e) {
  const n = e.lastIndexOf("/"), t = n >= 0 ? e.substring(n + 1) : e;
  if (!t.length)
    throw new Error(`invalid type url: ${e}`);
  return t;
}
const Zn = /* @__PURE__ */ Cr("Chxnb29nbGUvcHJvdG9idWYvc3RydWN0LnByb3RvEg9nb29nbGUucHJvdG9idWYihAEKBlN0cnVjdBIzCgZmaWVsZHMYASADKAsyIy5nb29nbGUucHJvdG9idWYuU3RydWN0LkZpZWxkc0VudHJ5GkUKC0ZpZWxkc0VudHJ5EgsKA2tleRgBIAEoCRIlCgV2YWx1ZRgCIAEoCzIWLmdvb2dsZS5wcm90b2J1Zi5WYWx1ZToCOAEi6gEKBVZhbHVlEjAKCm51bGxfdmFsdWUYASABKA4yGi5nb29nbGUucHJvdG9idWYuTnVsbFZhbHVlSAASFgoMbnVtYmVyX3ZhbHVlGAIgASgBSAASFgoMc3RyaW5nX3ZhbHVlGAMgASgJSAASFAoKYm9vbF92YWx1ZRgEIAEoCEgAEi8KDHN0cnVjdF92YWx1ZRgFIAEoCzIXLmdvb2dsZS5wcm90b2J1Zi5TdHJ1Y3RIABIwCgpsaXN0X3ZhbHVlGAYgASgLMhouZ29vZ2xlLnByb3RvYnVmLkxpc3RWYWx1ZUgAQgYKBGtpbmQiMwoJTGlzdFZhbHVlEiYKBnZhbHVlcxgBIAMoCzIWLmdvb2dsZS5wcm90b2J1Zi5WYWx1ZSobCglOdWxsVmFsdWUSDgoKTlVMTF9WQUxVRRAAQn8KE2NvbS5nb29nbGUucHJvdG9idWZCC1N0cnVjdFByb3RvUAFaL2dvb2dsZS5nb2xhbmcub3JnL3Byb3RvYnVmL3R5cGVzL2tub3duL3N0cnVjdHBi+AEBogIDR1BCqgIeR29vZ2xlLlByb3RvYnVmLldlbGxLbm93blR5cGVzYgZwcm90bzM"), ro = /* @__PURE__ */ Oe(Zn, 0), Hr = /* @__PURE__ */ Oe(Zn, 1), ao = /* @__PURE__ */ Oe(Zn, 2);
var vn;
(function(e) {
  e[e.NULL_VALUE = 0] = "NULL_VALUE";
})(vn || (vn = {}));
function so(e, n) {
  zr(n, e);
  const t = io(e.$unknown, n), [r, a, s] = nn(n);
  for (const o of t)
    Kr(r, new Yn(o.data), a, o.wireType, {
      readUnknownFields: !0
    });
  return s();
}
function oo(e, n, t) {
  var r;
  zr(n, e);
  const a = ((r = e.$unknown) !== null && r !== void 0 ? r : []).filter((c) => c.no !== n.number), [s, o] = nn(n, t), i = new Tr();
  Xr(i, { writeUnknownFields: !0 }, s, o);
  const u = new Yn(i.finish());
  for (; u.pos < u.len; ) {
    const [c, m] = u.tag(), d = u.skip(m, c);
    a.push({ no: c, wireType: m, data: d });
  }
  e.$unknown = a;
}
function io(e, n) {
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
function nn(e, n) {
  const t = e.typeName, r = Object.assign(Object.assign({}, e), { kind: "field", parent: e.extendee, localName: t }), a = Object.assign(Object.assign({}, e.extendee), { fields: [r], members: [r], oneofs: [] }), s = V(a, n !== void 0 ? { [t]: n } : void 0);
  return [
    F(a, s),
    r,
    () => {
      const o = s[t];
      if (o === void 0) {
        const i = e.message;
        return Se(i) ? re(i.fields[0].scalar, i.fields[0].longAsString) : V(i);
      }
      return o;
    }
  ];
}
function zr(e, n) {
  if (e.extendee.typeName != n.$typeName)
    throw new Error(`extension ${e.typeName} can only be applied to message ${e.extendee.typeName}`);
}
const uo = 3, co = 2, Ct = {
  alwaysEmitImplicit: !1,
  enumAsInteger: !1,
  useProtoFieldName: !1
};
function lo(e) {
  return e ? Object.assign(Object.assign({}, Ct), e) : Ct;
}
function fo(e, n, t) {
  return ke(F(e, n), lo(t));
}
function mo(e, n, t) {
  var r;
  const a = fo(e, n, t);
  return JSON.stringify(a, null, (r = t?.prettySpaces) !== null && r !== void 0 ? r : 0);
}
function ke(e, n) {
  var t;
  const r = go(e, n);
  if (r !== void 0)
    return r;
  const a = {};
  for (const s of e.sortedFields) {
    if (!e.isSet(s)) {
      if (s.presence == uo)
        throw new Error(`cannot encode ${s} to JSON: required field not set`);
      if (!n.alwaysEmitImplicit || s.presence !== co)
        continue;
    }
    const o = Jt(s, e.get(s), n);
    o !== void 0 && (a[ho(s, n)] = o);
  }
  if (n.registry) {
    const s = /* @__PURE__ */ new Set();
    for (const { no: o } of (t = e.getUnknown()) !== null && t !== void 0 ? t : [])
      if (!s.has(o)) {
        s.add(o);
        const i = n.registry.getExtensionFor(e.desc, o);
        if (!i)
          continue;
        const u = so(e.message, i), [c, m] = nn(i, u), d = Jt(m, c.get(m), n);
        d !== void 0 && (a[i.jsonName] = d);
      }
  }
  return a;
}
function Jt(e, n, t) {
  switch (e.fieldKind) {
    case "scalar":
      return tn(e, n);
    case "message":
      return ke(n, t);
    case "enum":
      return Hn(e.enum, n, t.enumAsInteger);
    case "list":
      return po(n, t);
    case "map":
      return bo(n, t);
  }
}
function bo(e, n) {
  const t = e.field(), r = {};
  switch (t.mapKind) {
    case "scalar":
      for (const [a, s] of e)
        r[a] = tn(t, s);
      break;
    case "message":
      for (const [a, s] of e)
        r[a] = ke(s, n);
      break;
    case "enum":
      for (const [a, s] of e)
        r[a] = Hn(t.enum, s, n.enumAsInteger);
      break;
  }
  return n.alwaysEmitImplicit || e.size > 0 ? r : void 0;
}
function po(e, n) {
  const t = e.field(), r = [];
  switch (t.listKind) {
    case "scalar":
      for (const a of e)
        r.push(tn(t, a));
      break;
    case "enum":
      for (const a of e)
        r.push(Hn(t.enum, a, n.enumAsInteger));
      break;
    case "message":
      for (const a of e)
        r.push(ke(a, n));
      break;
  }
  return n.alwaysEmitImplicit || r.length > 0 ? r : void 0;
}
function Hn(e, n, t) {
  var r;
  if (typeof n != "number")
    throw new Error(`cannot encode ${e} to JSON: expected number, got ${w(n)}`);
  if (e.typeName == "google.protobuf.NullValue")
    return null;
  if (t)
    return n;
  const a = e.value[n];
  return (r = a?.name) !== null && r !== void 0 ? r : n;
}
function tn(e, n) {
  var t, r, a, s, o, i;
  switch (e.scalar) {
    // int32, fixed32, uint32: JSON value will be a decimal number. Either numbers or strings are accepted.
    case l.INT32:
    case l.SFIXED32:
    case l.SINT32:
    case l.FIXED32:
    case l.UINT32:
      if (typeof n != "number")
        throw new Error(`cannot encode ${e} to JSON: ${(t = z(e, n)) === null || t === void 0 ? void 0 : t.message}`);
      return n;
    // float, double: JSON value will be a number or one of the special string values "NaN", "Infinity", and "-Infinity".
    // Either numbers or strings are accepted. Exponent notation is also accepted.
    case l.FLOAT:
    case l.DOUBLE:
      if (typeof n != "number")
        throw new Error(`cannot encode ${e} to JSON: ${(r = z(e, n)) === null || r === void 0 ? void 0 : r.message}`);
      return Number.isNaN(n) ? "NaN" : n === Number.POSITIVE_INFINITY ? "Infinity" : n === Number.NEGATIVE_INFINITY ? "-Infinity" : n;
    // string:
    case l.STRING:
      if (typeof n != "string")
        throw new Error(`cannot encode ${e} to JSON: ${(a = z(e, n)) === null || a === void 0 ? void 0 : a.message}`);
      return n;
    // bool:
    case l.BOOL:
      if (typeof n != "boolean")
        throw new Error(`cannot encode ${e} to JSON: ${(s = z(e, n)) === null || s === void 0 ? void 0 : s.message}`);
      return n;
    // JSON value will be a decimal string. Either numbers or strings are accepted.
    case l.UINT64:
    case l.FIXED64:
    case l.INT64:
    case l.SFIXED64:
    case l.SINT64:
      if (typeof n != "bigint" && typeof n != "string")
        throw new Error(`cannot encode ${e} to JSON: ${(o = z(e, n)) === null || o === void 0 ? void 0 : o.message}`);
      return n.toString();
    // bytes: JSON value will be the data encoded as a string using standard base64 encoding with paddings.
    // Either standard or URL-safe base64 encoding with/without paddings are accepted.
    case l.BYTES:
      if (n instanceof Uint8Array)
        return xr(n);
      throw new Error(`cannot encode ${e} to JSON: ${(i = z(e, n)) === null || i === void 0 ? void 0 : i.message}`);
  }
}
function ho(e, n) {
  return n.useProtoFieldName ? e.name : e.jsonName;
}
function go(e, n) {
  if (e.desc.typeName.startsWith("google.protobuf."))
    switch (e.desc.typeName) {
      case "google.protobuf.Any":
        return yo(e.message, n);
      case "google.protobuf.Timestamp":
        return _o(e.message);
      case "google.protobuf.Duration":
        return Eo(e.message);
      case "google.protobuf.FieldMask":
        return No(e.message);
      case "google.protobuf.Struct":
        return qr(e.message);
      case "google.protobuf.Value":
        return zn(e.message);
      case "google.protobuf.ListValue":
        return Qr(e.message);
      default:
        if (Se(e.desc)) {
          const t = e.desc.fields[0];
          return tn(t, e.get(t));
        }
        return;
    }
}
function yo(e, n) {
  if (e.typeUrl === "")
    return {};
  const { registry: t } = n;
  let r, a;
  if (t && (r = no(e, t), r && (a = t.getMessage(r.$typeName))), !a || !r)
    throw new Error(`cannot encode message ${e.$typeName} to JSON: "${e.typeUrl}" is not in the type registry`);
  let s = ke(F(a, r), n);
  return (a.typeName.startsWith("google.protobuf.") || s === null || Array.isArray(s) || typeof s != "object") && (s = { value: s }), s["@type"] = e.typeUrl, s;
}
function Eo(e) {
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
function No(e) {
  return e.paths.map((n) => {
    if (n.match(/_[0-9]?_/g) || n.match(/[A-Z]/g))
      throw new Error(`cannot encode message ${e.$typeName} to JSON: lowerCamelCase of path name "` + n + '" is irreversible');
    return ge(n);
  }).join(",");
}
function qr(e) {
  const n = {};
  for (const [t, r] of Object.entries(e.fields))
    n[t] = zn(r);
  return n;
}
function zn(e) {
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
      return qr(e.kind.value);
    case "listValue":
      return Qr(e.kind.value);
    default:
      throw new Error(`${e.$typeName} must have a value`);
  }
}
function Qr(e) {
  return e.values.map(zn);
}
function _o(e) {
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
const Xt = {
  ignoreUnknownFields: !1
};
function Io(e) {
  return e ? Object.assign(Object.assign({}, Xt), e) : Xt;
}
function wo(e, n, t) {
  return ea(e, Do(n, e.typeName), t);
}
function ea(e, n, t) {
  const r = F(e);
  try {
    le(r, n, Io(t));
  } catch (a) {
    throw ts(a) ? new Error(`cannot decode ${a.field()} from JSON: ${a.message}`, {
      cause: a
    }) : a;
  }
  return r.message;
}
function le(e, n, t) {
  var r;
  if (Lo(e, n, t))
    return;
  if (n == null || Array.isArray(n) || typeof n != "object")
    throw new Error(`cannot decode ${e.desc} from JSON: ${w(n)}`);
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
          throw new A(u.oneof, `oneof set multiple times by ${c.name} and ${u.name}`);
        a.set(u.oneof, u);
      }
      jt(e, u, i, t);
    } else {
      let c;
      if (o.startsWith("[") && o.endsWith("]") && // biome-ignore lint/suspicious/noAssignInExpressions: no
      (c = (r = t.registry) === null || r === void 0 ? void 0 : r.getExtension(o.substring(1, o.length - 1))) && c.extendee.typeName === e.desc.typeName) {
        const [m, d, b] = nn(c);
        jt(m, d, i, t), oo(e.message, c, b());
      }
      if (!c && !t.ignoreUnknownFields)
        throw new Error(`cannot decode ${e.desc} from JSON: key "${o}" is unknown`);
    }
  }
}
function jt(e, n, t, r) {
  switch (n.fieldKind) {
    case "scalar":
      ko(e, n, t);
      break;
    case "enum":
      Oo(e, n, t, r);
      break;
    case "message":
      So(e, n, t, r);
      break;
    case "list":
      vo(e.get(n), t, r);
      break;
    case "map":
      To(e.get(n), t, r);
      break;
  }
}
function To(e, n, t) {
  if (n === null)
    return;
  const r = e.field();
  if (typeof n != "object" || Array.isArray(n))
    throw new A(r, "expected object, got " + w(n));
  for (const [a, s] of Object.entries(n)) {
    if (s === null && !na(r))
      throw new A(r, "map value must not be null");
    let o;
    switch (r.mapKind) {
      case "message":
        const u = F(r.message);
        le(u, s, t), o = u;
        break;
      case "enum":
        if (o = qn(r.enum, s, t.ignoreUnknownFields, !0), o === rn)
          return;
        break;
      case "scalar":
        o = sn(r, s, !0);
        break;
    }
    const i = Ao(r.mapKey, a);
    e.set(i, o);
  }
}
function vo(e, n, t) {
  if (n === null)
    return;
  const r = e.field();
  if (!Array.isArray(n))
    throw new A(r, "expected Array, got " + w(n));
  for (const a of n) {
    if (a === null && !na(r))
      throw new A(r, "list item must not be null");
    switch (r.listKind) {
      case "message":
        const s = F(r.message);
        le(s, a, t), e.add(s);
        break;
      case "enum":
        const o = qn(r.enum, a, t.ignoreUnknownFields, !0);
        o !== rn && e.add(o);
        break;
      case "scalar":
        e.add(sn(r, a, !0));
        break;
    }
  }
}
function na(e) {
  var n, t;
  return ((n = e.message) === null || n === void 0 ? void 0 : n.typeName) == "google.protobuf.Value" || ((t = e.enum) === null || t === void 0 ? void 0 : t.typeName) == "google.protobuf.NullValue";
}
function So(e, n, t, r) {
  if (t === null && n.message.typeName != "google.protobuf.Value") {
    e.clear(n);
    return;
  }
  const a = e.isSet(n) ? e.get(n) : F(n.message);
  le(a, t, r), e.set(n, a);
}
function Oo(e, n, t, r) {
  const a = qn(n.enum, t, r.ignoreUnknownFields, !1);
  a === an ? e.clear(n) : a !== rn && e.set(n, a);
}
function ko(e, n, t) {
  const r = sn(n, t, !1);
  r === an ? e.clear(n) : e.set(n, r);
}
const rn = /* @__PURE__ */ Symbol();
function qn(e, n, t, r) {
  if (n === null)
    return e.typeName == "google.protobuf.NullValue" ? 0 : r ? e.values[0].number : an;
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
        return rn;
      break;
  }
  throw new Error(`cannot decode ${e} from JSON: ${w(n)}`);
}
const an = /* @__PURE__ */ Symbol();
function sn(e, n, t) {
  if (n === null)
    return t ? re(e.scalar, !1) : an;
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
          throw new A(e, "unexpected NaN number");
        if (!Number.isFinite(n))
          throw new A(e, "unexpected infinite number");
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
      return ta(n);
    // bytes: JSON value will be the data encoded as a string using standard base64 encoding with paddings.
    // Either standard or URL-safe base64 encoding with/without paddings are accepted.
    case l.BYTES:
      if (typeof n == "string") {
        if (n === "")
          return new Uint8Array(0);
        try {
          return Jn(n);
        } catch (r) {
          const a = r instanceof Error ? r.message : String(r);
          throw new A(e, a);
        }
      }
      break;
  }
  return n;
}
function Ao(e, n) {
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
      return ta(n);
    default:
      return n;
  }
}
function ta(e) {
  if (typeof e == "string") {
    if (e === "" || e.trim().length !== e.length)
      return e;
    const n = Number(e);
    return Number.isNaN(n) ? e : n;
  }
  return e;
}
function Do(e, n) {
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
function Lo(e, n, t) {
  if (!e.desc.typeName.startsWith("google.protobuf."))
    return !1;
  switch (e.desc.typeName) {
    case "google.protobuf.Any":
      return Ro(e.message, n, t), !0;
    case "google.protobuf.Timestamp":
      return Uo(e.message, n), !0;
    case "google.protobuf.Duration":
      return xo(e.message, n), !0;
    case "google.protobuf.FieldMask":
      return $o(e.message, n), !0;
    case "google.protobuf.Struct":
      return ra(e.message, n), !0;
    case "google.protobuf.Value":
      return Qn(e.message, n), !0;
    case "google.protobuf.ListValue":
      return aa(e.message, n), !0;
    default:
      if (Se(e.desc)) {
        const r = e.desc.fields[0];
        return n === null ? e.clear(r) : e.set(r, sn(r, n, !0)), !0;
      }
      return !1;
  }
}
function Ro(e, n, t) {
  var r;
  if (n === null || Array.isArray(n) || typeof n != "object")
    throw new Error(`cannot decode message ${e.$typeName} from JSON: expected object but got ${w(n)}`);
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
  const i = F(o);
  if (s.startsWith("google.protobuf.") && Object.prototype.hasOwnProperty.call(n, "value")) {
    const u = n.value;
    le(i, u, t);
  } else {
    const u = Object.assign({}, n);
    delete u["@type"], le(i, u, t);
  }
  Qs(i.desc, i.message, e);
}
function Uo(e, n) {
  if (typeof n != "string")
    throw new Error(`cannot decode message ${e.$typeName} from JSON: ${w(n)}`);
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
  e.seconds = E.parse(r / 1e3), e.nanos = 0, t[7] && (e.nanos = parseInt("1" + t[7] + "0".repeat(9 - t[7].length)) - 1e9);
}
function xo(e, n) {
  if (typeof n != "string")
    throw new Error(`cannot decode message ${e.$typeName} from JSON: ${w(n)}`);
  const t = n.match(/^(-?[0-9]+)(?:\.([0-9]+))?s/);
  if (t === null)
    throw new Error(`cannot decode message ${e.$typeName} from JSON: ${w(n)}`);
  const r = Number(t[1]);
  if (r > 315576e6 || r < -315576e6)
    throw new Error(`cannot decode message ${e.$typeName} from JSON: ${w(n)}`);
  if (e.seconds = E.parse(r), typeof t[2] != "string")
    return;
  const a = t[2] + "0".repeat(9 - t[2].length);
  e.nanos = parseInt(a), (r < 0 || Object.is(r, -0)) && (e.nanos = -e.nanos);
}
function $o(e, n) {
  if (typeof n != "string")
    throw new Error(`cannot decode message ${e.$typeName} from JSON: ${w(n)}`);
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
function ra(e, n) {
  if (typeof n != "object" || n == null || Array.isArray(n))
    throw new Error(`cannot decode message ${e.$typeName} from JSON ${w(n)}`);
  for (const [t, r] of Object.entries(n)) {
    const a = V(Hr);
    Qn(a, r), e.fields[t] = a;
  }
}
function Qn(e, n) {
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
        e.kind = { case: "nullValue", value: vn.NULL_VALUE };
      else if (Array.isArray(n)) {
        const t = V(ao);
        aa(t, n), e.kind = { case: "listValue", value: t };
      } else {
        const t = V(ro);
        ra(t, n), e.kind = { case: "structValue", value: t };
      }
      break;
    default:
      throw new Error(`cannot decode message ${e.$typeName} from JSON ${w(n)}`);
  }
  return e;
}
function aa(e, n) {
  if (!Array.isArray(n))
    throw new Error(`cannot decode message ${e.$typeName} from JSON ${w(n)}`);
  for (const t of n) {
    const r = V(Hr);
    Qn(r, t), e.values.push(r);
  }
}
function Sn(e) {
  const n = y[e];
  return typeof n != "string" ? e.toString() : n[0].toLowerCase() + n.substring(1).replace(/[A-Z]/g, (t) => "_" + t.toLowerCase());
}
let Ve;
function Fo(e) {
  if (!Ve) {
    Ve = {};
    for (const n of Object.values(y))
      typeof n != "string" && (Ve[Sn(n)] = n);
  }
  return Ve[e];
}
class _ extends Error {
  /**
   * Create a new ConnectError.
   * If no code is provided, code "unknown" is used.
   * Outgoing details are only relevant for the server side - a service may
   * raise an error with details, and it is up to the protocol implementation
   * to encode and send the details along with the error.
   */
  constructor(n, t = y.Unknown, r, a, s) {
    super(Po(n, t)), this.name = "ConnectError", Object.setPrototypeOf(this, new.target.prototype), this.rawMessage = n, this.code = t, this.metadata = new Headers(r ?? {}), this.details = a ?? [], this.cause = s;
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
    return n instanceof _ ? n : n instanceof Error ? n.name == "AbortError" || n.name == "TimeoutError" ? new _(n.message, y.Canceled) : new _(n.message, t, void 0, void 0, n) : new _(String(n), t, void 0, void 0, n);
  }
  static [Symbol.hasInstance](n) {
    return n instanceof Error ? Object.getPrototypeOf(n) === _.prototype ? !0 : n.name === "ConnectError" && "code" in n && typeof n.code == "number" && "metadata" in n && "details" in n && Array.isArray(n.details) && "rawMessage" in n && typeof n.rawMessage == "string" && "cause" in n : !1;
  }
  findDetails(n) {
    const t = n.kind === "message" ? {
      getMessage: (a) => a === n.typeName ? n : void 0
    } : n, r = [];
    for (const a of this.details) {
      if ("desc" in a) {
        t.getMessage(a.desc.typeName) && r.push(V(a.desc, a.value));
        continue;
      }
      const s = t.getMessage(a.type);
      if (s)
        try {
          r.push(en(s, a.value));
        } catch {
        }
    }
    return r;
  }
}
function Po(e, n) {
  return e.length ? `[${Sn(n)}] ${e}` : `[${Sn(n)}]`;
}
function Vo(...e) {
  const n = new Headers();
  for (const t of e)
    t.forEach((r, a) => {
      n.append(a, r);
    });
  return n;
}
function Yo(e, n) {
  const t = {};
  for (const r of e.methods) {
    const a = n(r);
    a != null && (t[r.localName] = a);
  }
  return t;
}
const Wt = 1;
function Mo(e, n, t = !1) {
  if (n > e) {
    let r = `message size is larger than configured readMaxBytes ${e}`;
    throw t && (r = `message size ${n} is larger than configured readMaxBytes ${e}`), new _(r, y.ResourceExhausted);
  }
}
function Bo(e) {
  return new Go(e);
}
class Go {
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
    return Mo(this.readMaxBytes, t, !0), {
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
function Ko(e) {
  let n;
  const t = Bo(4294967295);
  return new ReadableStream({
    start() {
      n = e.getReader();
    },
    async pull(r) {
      let a = !1;
      for (; !a; ) {
        const s = await n.read();
        if (s.done)
          t.byteLength > 0 && r.error(new _("protocol error: incomplete envelope", y.InvalidArgument)), r.close();
        else
          for (const o of t.decode(s.value))
            r.enqueue(o), a = !0;
      }
    }
  });
}
function Co(e, n) {
  const t = new Uint8Array(n.length + 5);
  t.set(n, 5);
  const r = new DataView(t.buffer, t.byteOffset, t.byteLength);
  return r.setUint8(0, e), r.setUint32(1, n.length), t;
}
var Jo = function(e) {
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
}, Ne = function(e) {
  return this instanceof Ne ? (this.v = e, this) : new Ne(e);
}, Xo = function(e, n, t) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var r = t.apply(e, n || []), a, s = [];
  return a = Object.create((typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype), i("next"), i("throw"), i("return", o), a[Symbol.asyncIterator] = function() {
    return this;
  }, a;
  function o(f) {
    return function(p) {
      return Promise.resolve(p).then(f, d);
    };
  }
  function i(f, p) {
    r[f] && (a[f] = function(h) {
      return new Promise(function(g, S) {
        s.push([f, h, g, S]) > 1 || u(f, h);
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
    f.value instanceof Ne ? Promise.resolve(f.value.v).then(m, d) : b(s[0][2], f);
  }
  function m(f) {
    u("next", f);
  }
  function d(f) {
    u("throw", f);
  }
  function b(f, p) {
    f(p), s.shift(), s.length && u(s[0][0], s[0][1]);
  }
}, jo = function(e) {
  var n, t;
  return n = {}, r("next"), r("throw", function(a) {
    throw a;
  }), r("return"), n[Symbol.iterator] = function() {
    return this;
  }, n;
  function r(a, s) {
    n[a] = e[a] ? function(o) {
      return (t = !t) ? { value: Ne(e[a](o)), done: !1 } : s ? s(o) : o;
    } : s;
  }
};
function Wo(e) {
  return Xo(this, arguments, function* () {
    yield Ne(yield* jo(Jo(e)));
  });
}
var sa = function(e) {
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
}, fe = function(e) {
  return this instanceof fe ? (this.v = e, this) : new fe(e);
}, Zo = function(e) {
  var n, t;
  return n = {}, r("next"), r("throw", function(a) {
    throw a;
  }), r("return"), n[Symbol.iterator] = function() {
    return this;
  }, n;
  function r(a, s) {
    n[a] = e[a] ? function(o) {
      return (t = !t) ? { value: fe(e[a](o)), done: !1 } : s ? s(o) : o;
    } : s;
  }
}, Ho = function(e, n, t) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var r = t.apply(e, n || []), a, s = [];
  return a = Object.create((typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype), i("next"), i("throw"), i("return", o), a[Symbol.asyncIterator] = function() {
    return this;
  }, a;
  function o(f) {
    return function(p) {
      return Promise.resolve(p).then(f, d);
    };
  }
  function i(f, p) {
    r[f] && (a[f] = function(h) {
      return new Promise(function(g, S) {
        s.push([f, h, g, S]) > 1 || u(f, h);
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
    f.value instanceof fe ? Promise.resolve(f.value.v).then(m, d) : b(s[0][2], f);
  }
  function m(f) {
    u("next", f);
  }
  function d(f) {
    u("throw", f);
  }
  function b(f, p) {
    f(p), s.shift(), s.length && u(s[0][0], s[0][1]);
  }
};
function zo(e, n) {
  return Yo(e, (t) => {
    switch (t.methodKind) {
      case "unary":
        return qo(n, t);
      case "server_streaming":
        return Qo(n, t);
      case "client_streaming":
        return ei(n, t);
      case "bidi_streaming":
        return ni(n, t);
      default:
        return null;
    }
  });
}
function qo(e, n) {
  return async (t, r) => {
    var a, s;
    const o = await e.unary(n, r?.signal, r?.timeoutMs, r?.headers, t, r?.contextValues);
    return (a = r?.onHeader) === null || a === void 0 || a.call(r, o.header), (s = r?.onTrailer) === null || s === void 0 || s.call(r, o.trailer), o.message;
  };
}
function Qo(e, n) {
  return (t, r) => oa(e.stream(n, r?.signal, r?.timeoutMs, r?.headers, Wo([t]), r?.contextValues), r);
}
function ei(e, n) {
  return async (t, r) => {
    var a, s, o, i, u, c;
    const m = await e.stream(n, r?.signal, r?.timeoutMs, r?.headers, t, r?.contextValues);
    (u = r?.onHeader) === null || u === void 0 || u.call(r, m.header);
    let d, b = 0;
    try {
      for (var f = !0, p = sa(m.message), h; h = await p.next(), a = h.done, !a; f = !0)
        i = h.value, f = !1, d = i, b++;
    } catch (g) {
      s = { error: g };
    } finally {
      try {
        !f && !a && (o = p.return) && await o.call(p);
      } finally {
        if (s) throw s.error;
      }
    }
    if (!d)
      throw new _("protocol error: missing response message", y.Unimplemented);
    if (b > 1)
      throw new _("protocol error: received extra messages for client streaming method", y.Unimplemented);
    return (c = r?.onTrailer) === null || c === void 0 || c.call(r, m.trailer), d;
  };
}
function ni(e, n) {
  return (t, r) => oa(e.stream(n, r?.signal, r?.timeoutMs, r?.headers, t, r?.contextValues), r);
}
function oa(e, n) {
  const t = (function() {
    return Ho(this, arguments, function* () {
      var r, a;
      const s = yield fe(e);
      (r = n?.onHeader) === null || r === void 0 || r.call(n, s.header), yield fe(yield* Zo(sa(s.message))), (a = n?.onTrailer) === null || a === void 0 || a.call(n, s.trailer);
    });
  })()[Symbol.asyncIterator]();
  return {
    [Symbol.asyncIterator]: () => ({
      next: () => t.next()
    })
  };
}
function ti(...e) {
  const n = new AbortController(), t = e.filter((a) => a !== void 0).concat(n.signal);
  for (const a of t) {
    if (a.aborted) {
      r.apply(a);
      break;
    }
    a.addEventListener("abort", r);
  }
  function r() {
    n.signal.aborted || n.abort(ia(this));
    for (const a of t)
      a.removeEventListener("abort", r);
  }
  return n;
}
function ri(e) {
  const n = new AbortController(), t = () => {
    n.abort(new _("the operation timed out", y.DeadlineExceeded));
  };
  let r;
  return e !== void 0 && (e <= 0 ? t() : r = setTimeout(t, e)), {
    signal: n.signal,
    cleanup: () => clearTimeout(r)
  };
}
function ia(e) {
  if (!e.aborted)
    return;
  if (e.reason !== void 0)
    return e.reason;
  const n = new Error("This operation was aborted");
  return n.name = "AbortError", n;
}
function Zt() {
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
function Ht(e, n) {
  return e.toString().replace(/\/?$/, `/${n.parent.typeName}/${n.name}`);
}
function ua(e, n) {
  return V(e, n);
}
function ai(e, n) {
  function t(r) {
    return r.done === !0 ? r : {
      done: r.done,
      value: ua(e, r.value)
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
function ca(e, n) {
  if (!n)
    return e;
  for (const t of n.concat().reverse())
    e = t(e);
  return e;
}
function la(e) {
  var n;
  const t = Object.assign({}, e);
  return (n = t.ignoreUnknownFields) !== null && n !== void 0 || (t.ignoreUnknownFields = !0), t;
}
function zt(e, n, t, r) {
  const a = n ? qt(e.input, r) : Qt(e.input, t);
  return { parse: (n ? qt(e.output, r) : Qt(e.output, t)).parse, serialize: a.serialize };
}
function qt(e, n) {
  return {
    parse(t) {
      try {
        return en(e, t, n);
      } catch (r) {
        const a = r instanceof Error ? r.message : String(r);
        throw new _(`parse binary: ${a}`, y.Internal);
      }
    },
    serialize(t) {
      try {
        return Jr(e, t, n);
      } catch (r) {
        const a = r instanceof Error ? r.message : String(r);
        throw new _(`serialize binary: ${a}`, y.Internal);
      }
    }
  };
}
function Qt(e, n) {
  var t, r;
  const a = (t = n?.textEncoder) !== null && t !== void 0 ? t : new TextEncoder(), s = (r = n?.textDecoder) !== null && r !== void 0 ? r : new TextDecoder(), o = la(n);
  return {
    parse(i) {
      try {
        const u = s.decode(i);
        return wo(e, u, o);
      } catch (u) {
        throw _.from(u, y.InvalidArgument);
      }
    },
    serialize(i) {
      try {
        const u = mo(e, i, o);
        return a.encode(u);
      } catch (u) {
        throw _.from(u, y.Internal);
      }
    }
  };
}
const si = /^application\/(connect\+)?(?:(json)(?:; ?charset=utf-?8)?|(proto))$/i, oi = "application/proto", ii = "application/json", ui = "application/connect+proto", ci = "application/connect+json";
function li(e) {
  const n = e?.match(si);
  if (!n)
    return;
  const t = !!n[1], r = !!n[3];
  return { stream: t, binary: r };
}
function fa(e, n, t) {
  var r;
  if (n && new Headers(n).forEach((i, u) => t.metadata.append(u, i)), typeof e != "object" || e == null || Array.isArray(e))
    throw t;
  let a = t.code;
  "code" in e && typeof e.code == "string" && (a = (r = Fo(e.code)) !== null && r !== void 0 ? r : a);
  const s = e.message;
  if (s != null && typeof s != "string")
    throw t;
  const o = new _(s ?? "", a, n);
  if ("details" in e && Array.isArray(e.details))
    for (const i of e.details) {
      if (i === null || typeof i != "object" || Array.isArray(i) || typeof i.type != "string" || typeof i.value != "string")
        throw t;
      try {
        o.details.push({
          type: i.type,
          value: Jn(i.value),
          debug: i.debug
        });
      } catch {
        throw t;
      }
    }
  return o;
}
const er = 2;
function fi(e) {
  const n = new _("invalid end stream", y.Unknown);
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
  const a = "error" in t && t.error != null ? fa(t.error, r, n) : void 0;
  return { metadata: r, error: a };
}
const je = "Content-Type", mi = "Content-Length", nr = "Content-Encoding", di = "Accept-Encoding", bi = "Connect-Timeout-Ms", ma = "Connect-Protocol-Version", pi = "User-Agent";
function hi(e) {
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
function tr(e) {
  const n = new Headers(), t = new Headers();
  return e.forEach((r, a) => {
    a.toLowerCase().startsWith("trailer-") ? t.append(a.substring(8), r) : n.append(a, r);
  }), [n, t];
}
const da = "1";
function rr(e, n, t, r, a) {
  const s = new Headers(r ?? {});
  return t !== void 0 && s.set(bi, `${t}`), s.set(je, e == "unary" ? n ? oi : ii : n ? ui : ci), s.set(ma, da), s.has(pi), s;
}
function ar(e, n, t, r) {
  const a = r.get(je), s = li(a);
  if (t !== 200) {
    const i = new _(`HTTP ${t}`, hi(t), r);
    if (e == "unary" && s && !s.binary)
      return { isUnaryError: !0, unaryError: i };
    throw i;
  }
  const o = {
    binary: n,
    stream: e !== "unary"
  };
  if (s?.binary !== o.binary || s.stream !== o.stream)
    throw new _(`unsupported content type ${a}`, s === void 0 ? y.Unknown : y.Internal, r);
  return { isUnaryError: !1 };
}
const sr = "application/";
function gi(e, n) {
  return n ? xr(e, "url") : encodeURIComponent(new TextDecoder().decode(e));
}
function yi(e, n, t) {
  let r = `?connect=v${da}`;
  const a = e.header.get(je);
  a?.indexOf(sr) === 0 && (r += "&encoding=" + encodeURIComponent(a.slice(sr.length)));
  const s = e.header.get(nr);
  s !== null && s !== "identity" && (r += "&compression=" + encodeURIComponent(s), t = !0), t && (r += "&base64=1"), r += "&message=" + gi(n, t);
  const o = e.url + r, i = new Headers(e.header);
  for (const u of [
    ma,
    je,
    mi,
    nr,
    di
  ])
    i.delete(u);
  return Object.assign(Object.assign({}, e), {
    requestMethod: "GET",
    url: o,
    header: i
  });
}
function Ei(e) {
  const n = ca(e.next, e.interceptors), [t, r, a] = ba(e), s = Object.assign(Object.assign({}, e.req), { message: ua(e.req.method.input, e.req.message), signal: t });
  return n(s).then((o) => (a(), o), r);
}
function Ni(e) {
  const n = ca(e.next, e.interceptors), [t, r, a] = ba(e), s = Object.assign(Object.assign({}, e.req), { message: ai(e.req.method.input, e.req.message), signal: t });
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
function ba(e) {
  const { signal: n, cleanup: t } = ri(e.timeoutMs), r = ti(e.signal, n);
  return [
    r.signal,
    function(s) {
      const o = _.from(n.aborted ? ia(n) : s);
      return r.abort(o), t(), Promise.reject(o);
    },
    function() {
      t(), r.abort();
    }
  ];
}
function _i() {
  try {
    new Headers();
  } catch {
    throw new Error("connect-web requires the fetch API. Are you running on an old version of Node.js? Node.js is not supported in Connect for Web - please stay tuned for Connect for Node.");
  }
}
var _e = function(e) {
  return this instanceof _e ? (this.v = e, this) : new _e(e);
}, Ii = function(e, n, t) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var r = t.apply(e, n || []), a, s = [];
  return a = Object.create((typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype), i("next"), i("throw"), i("return", o), a[Symbol.asyncIterator] = function() {
    return this;
  }, a;
  function o(f) {
    return function(p) {
      return Promise.resolve(p).then(f, d);
    };
  }
  function i(f, p) {
    r[f] && (a[f] = function(h) {
      return new Promise(function(g, S) {
        s.push([f, h, g, S]) > 1 || u(f, h);
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
    f.value instanceof _e ? Promise.resolve(f.value.v).then(m, d) : b(s[0][2], f);
  }
  function m(f) {
    u("next", f);
  }
  function d(f) {
    u("throw", f);
  }
  function b(f, p) {
    f(p), s.shift(), s.length && u(s[0][0], s[0][1]);
  }
};
const or = {
  redirect: "error"
};
function wi(e) {
  var n;
  _i();
  const t = (n = e.useBinaryFormat) !== null && n !== void 0 ? n : !1;
  return {
    async unary(r, a, s, o, i, u) {
      const { serialize: c, parse: m } = zt(r, t, e.jsonOptions, e.binaryOptions);
      return s = s === void 0 ? e.defaultTimeoutMs : s <= 0 ? void 0 : s, await Ei({
        interceptors: e.interceptors,
        signal: a,
        timeoutMs: s,
        req: {
          stream: !1,
          service: r.parent,
          method: r,
          requestMethod: "POST",
          url: Ht(e.baseUrl, r),
          header: rr(r.methodKind, t, s, o, !1),
          contextValues: u ?? Zt(),
          message: i
        },
        next: async (d) => {
          var b;
          const f = e.useHttpGet === !0 && r.idempotency === Tn.NO_SIDE_EFFECTS;
          let p = null;
          f ? d = yi(d, c(d.message), t) : p = c(d.message);
          const g = await ((b = e.fetch) !== null && b !== void 0 ? b : globalThis.fetch)(d.url, Object.assign(Object.assign({}, or), { method: d.requestMethod, headers: d.header, signal: d.signal, body: p })), { isUnaryError: S, unaryError: j } = ar(r.methodKind, t, g.status, g.headers);
          if (S)
            throw fa(await g.json(), Vo(...tr(g.headers)), j);
          const [Ue, xe] = tr(g.headers);
          return {
            stream: !1,
            service: r.parent,
            method: r,
            header: Ue,
            message: t ? m(new Uint8Array(await g.arrayBuffer())) : ea(r.output, await g.json(), la(e.jsonOptions)),
            trailer: xe
          };
        }
      });
    },
    async stream(r, a, s, o, i, u) {
      const { serialize: c, parse: m } = zt(r, t, e.jsonOptions, e.binaryOptions);
      function d(f, p, h, g) {
        return Ii(this, arguments, function* () {
          const j = Ko(f).getReader();
          let Ue = !1;
          for (; ; ) {
            const xe = yield _e(j.read());
            if (xe.done)
              break;
            const { flags: at, data: st } = xe.value;
            if ((at & Wt) === Wt)
              throw new _("protocol error: received unsupported compressed output", y.Internal);
            if ((at & er) === er) {
              Ue = !0;
              const on = fi(st);
              if (on.error) {
                const $e = on.error;
                throw h.forEach((un, Pa) => {
                  $e.metadata.append(Pa, un);
                }), $e;
              }
              on.metadata.forEach(($e, un) => p.set(un, $e));
              continue;
            }
            yield yield _e(m(st));
          }
          if ("throwIfAborted" in g && g.throwIfAborted(), !Ue)
            throw "missing EndStreamResponse";
        });
      }
      async function b(f) {
        if (r.methodKind != "server_streaming")
          throw "The fetch API does not support streaming request bodies";
        const p = await f[Symbol.asyncIterator]().next();
        if (p.done == !0)
          throw "missing request message";
        return Co(0, c(p.value));
      }
      return s = s === void 0 ? e.defaultTimeoutMs : s <= 0 ? void 0 : s, await Ni({
        interceptors: e.interceptors,
        timeoutMs: s,
        signal: a,
        req: {
          stream: !0,
          service: r.parent,
          method: r,
          requestMethod: "POST",
          url: Ht(e.baseUrl, r),
          header: rr(r.methodKind, t, s, o, !1),
          contextValues: u ?? Zt(),
          message: i
        },
        next: async (f) => {
          var p;
          const g = await ((p = e.fetch) !== null && p !== void 0 ? p : globalThis.fetch)(f.url, Object.assign(Object.assign({}, or), { method: f.requestMethod, headers: f.header, signal: f.signal, body: await b(f.message) }));
          if (ar(r.methodKind, t, g.status, g.headers), g.body === null)
            throw "missing response body";
          const S = new Headers();
          return Object.assign(Object.assign({}, f), { header: g.headers, trailer: S, message: d(g.body, S, g.headers, f.signal) });
        }
      });
    }
  };
}
const Ti = wi({
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
function uu(e) {
  return zo(e, Ti);
}
const O = /* @__PURE__ */ Symbol(), On = !1;
var vi = Array.isArray, Si = Array.prototype.indexOf, hn = Object.getOwnPropertyDescriptor, Oi = Object.prototype, ki = Array.prototype, Ai = Object.getPrototypeOf;
function Di(e) {
  for (var n = 0; n < e.length; n++)
    e[n]();
}
function Li() {
  var e, n, t = new Promise((r, a) => {
    e = r, n = a;
  });
  return { promise: t, resolve: e, reject: n };
}
const R = 2, Ri = 4, Ui = 1 << 24, de = 16, Ae = 32, De = 64, et = 128, B = 512, k = 1024, Y = 2048, G = 4096, Ke = 8192, ee = 16384, xi = 32768, ir = 1 << 17, pa = 1 << 18, ae = 32768, kn = 1 << 21, ha = 1 << 22, Ie = 1 << 23, gn = /* @__PURE__ */ Symbol("$state"), ga = new class extends Error {
  name = "StaleReactionError";
  message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}();
function $i() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Fi() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Pi() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function Vi() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Yi(e) {
  return e === this.v;
}
let Mi = !1;
function ya() {
  return !0;
}
let oe = [];
function Bi() {
  var e = oe;
  oe = [], Di(e);
}
function Gi(e) {
  if (oe.length === 0) {
    var n = oe;
    queueMicrotask(() => {
      n === oe && Bi();
    });
  }
  oe.push(e);
}
function Ki(e) {
  var n = D;
  if (n === null)
    return I.f |= Ie, e;
  if ((n.f & xi) === 0) {
    if ((n.f & et) === 0)
      throw e;
    n.b.error(e);
  } else
    Ea(e, n);
}
function Ea(e, n) {
  for (; n !== null; ) {
    if ((n.f & et) !== 0)
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
const Ye = /* @__PURE__ */ new Set();
let T = null, $ = null, M = [], nt = null, An = !1;
class we {
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
    M = [], this.apply();
    var t = {
      parent: null,
      effect: null,
      effects: [],
      render_effects: []
    };
    for (const r of n)
      this.#u(r, t);
    this.is_fork || this.#l(), this.is_deferred() ? (this.#t(t.effects), this.#t(t.render_effects)) : (T = null, ur(t.render_effects), ur(t.effects), this.#i?.resolve()), $ = null;
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
      var a = r.f, s = (a & (Ae | De)) !== 0, o = s && (a & k) !== 0, i = o || (a & Ke) !== 0 || this.skipped_effects.has(r);
      if ((r.f & et) !== 0 && r.b?.is_pending() && (t = {
        parent: t,
        effect: r,
        effects: [],
        render_effects: []
      }), !i && r.fn !== null) {
        s ? r.f ^= k : (a & Ri) !== 0 ? t.effects.push(r) : Re(r) && ((r.f & de) !== 0 && this.#s.add(r), qe(r));
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
      (t.f & Y) !== 0 ? this.#s.add(t) : (t.f & G) !== 0 && this.#o.add(t), this.#c(t.deps), L(t, k);
  }
  /**
   * @param {Value[] | null} deps
   */
  #c(n) {
    if (n !== null)
      for (const t of n)
        (t.f & R) === 0 || (t.f & ae) === 0 || (t.f ^= ae, this.#c(
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
    this.previous.has(n) || this.previous.set(n, t), (n.f & Ie) === 0 && (this.current.set(n, n.v), $?.set(n, n.v));
  }
  activate() {
    T = this, this.apply();
  }
  deactivate() {
    T === this && (T = null, $ = null);
  }
  flush() {
    if (this.activate(), M.length > 0) {
      if (Ci(), T !== null && T !== this)
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
    if (Ye.size > 1) {
      this.previous.clear();
      var n = $, t = !0, r = {
        parent: null,
        effect: null,
        effects: [],
        render_effects: []
      };
      for (const s of Ye) {
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
          var a = M;
          M = [];
          const u = /* @__PURE__ */ new Set(), c = /* @__PURE__ */ new Map();
          for (const m of o)
            Na(m, i, u, c);
          if (M.length > 0) {
            T = s, s.apply();
            for (const m of M)
              s.#u(m, r);
            s.deactivate();
          }
          M = a;
        }
      }
      T = null, $ = n;
    }
    this.committed = !0, Ye.delete(this);
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
      this.#o.delete(n), L(n, Y), Te(n);
    for (const n of this.#o)
      L(n, G), Te(n);
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
    return (this.#i ??= Li()).promise;
  }
  static ensure() {
    if (T === null) {
      const n = T = new we();
      Ye.add(T), we.enqueue(() => {
        T === n && n.flush();
      });
    }
    return T;
  }
  /** @param {() => void} task */
  static enqueue(n) {
    Gi(n);
  }
  apply() {
  }
}
function Ci() {
  var e = ne;
  An = !0;
  var n = null;
  try {
    var t = 0;
    for (Ze(!0); M.length > 0; ) {
      var r = we.ensure();
      if (t++ > 1e3) {
        var a, s;
        Ji();
      }
      r.process(M), Z.clear();
    }
  } finally {
    An = !1, Ze(e), nt = null;
  }
}
function Ji() {
  try {
    $i();
  } catch (e) {
    Ea(e, nt);
  }
}
let C = null;
function ur(e) {
  var n = e.length;
  if (n !== 0) {
    for (var t = 0; t < n; ) {
      var r = e[t++];
      if ((r.f & (ee | Ke)) === 0 && Re(r) && (C = /* @__PURE__ */ new Set(), qe(r), r.deps === null && r.first === null && r.nodes === null && (r.teardown === null && r.ac === null ? Aa(r) : r.fn = null), C?.size > 0)) {
        Z.clear();
        for (const a of C) {
          if ((a.f & (ee | Ke)) !== 0) continue;
          const s = [a];
          let o = a.parent;
          for (; o !== null; )
            C.has(o) && (C.delete(o), s.push(o)), o = o.parent;
          for (let i = s.length - 1; i >= 0; i--) {
            const u = s[i];
            (u.f & (ee | Ke)) === 0 && qe(u);
          }
        }
        C.clear();
      }
    }
    C = null;
  }
}
function Na(e, n, t, r) {
  if (!t.has(e) && (t.add(e), e.reactions !== null))
    for (const a of e.reactions) {
      const s = a.f;
      (s & R) !== 0 ? Na(
        /** @type {Derived} */
        a,
        n,
        t,
        r
      ) : (s & (ha | de)) !== 0 && (s & Y) === 0 && _a(a, n, r) && (L(a, Y), Te(
        /** @type {Effect} */
        a
      ));
    }
}
function _a(e, n, t) {
  const r = t.get(e);
  if (r !== void 0) return r;
  if (e.deps !== null)
    for (const a of e.deps) {
      if (n.includes(a))
        return !0;
      if ((a.f & R) !== 0 && _a(
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
function Te(e) {
  for (var n = nt = e; n.parent !== null; ) {
    n = n.parent;
    var t = n.f;
    if (An && n === D && (t & de) !== 0 && (t & pa) === 0)
      return;
    if ((t & (De | Ae)) !== 0) {
      if ((t & k) === 0) return;
      n.f ^= k;
    }
  }
  M.push(n);
}
function Ia(e) {
  var n = e.effects;
  if (n !== null) {
    e.effects = null;
    for (var t = 0; t < n.length; t += 1)
      rt(
        /** @type {Effect} */
        n[t]
      );
  }
}
function Xi(e) {
  for (var n = e.parent; n !== null; ) {
    if ((n.f & R) === 0)
      return (n.f & ee) === 0 ? (
        /** @type {Effect} */
        n
      ) : null;
    n = n.parent;
  }
  return null;
}
function tt(e) {
  var n, t = D;
  He(Xi(e));
  try {
    e.f &= ~ae, Ia(e), n = Ua(e);
  } finally {
    He(t);
  }
  return n;
}
function wa(e) {
  var n = tt(e);
  if (e.equals(n) || (T?.is_fork || (e.v = n), e.wv = La()), !Le)
    if ($ !== null)
      (We() || T?.is_fork) && $.set(e, n);
    else {
      var t = (e.f & B) === 0 ? G : k;
      L(e, t);
    }
}
let Dn = /* @__PURE__ */ new Set();
const Z = /* @__PURE__ */ new Map();
let Ta = !1;
function ji(e, n) {
  var t = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: Yi,
    rv: 0,
    wv: 0
  };
  return t;
}
// @__NO_SIDE_EFFECTS__
function W(e, n) {
  const t = ji(e);
  return eu(t), t;
}
function q(e, n, t = !1) {
  I !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!Q || (I.f & ir) !== 0) && ya() && (I.f & (R | de | ha | ir)) !== 0 && !X?.includes(e) && Vi();
  let r = t ? ie(n) : n;
  return Wi(e, r);
}
function Wi(e, n) {
  if (!e.equals(n)) {
    var t = e.v;
    Le ? Z.set(e, n) : Z.set(e, t), e.v = n;
    var r = we.ensure();
    r.capture(e, t), (e.f & R) !== 0 && ((e.f & Y) !== 0 && tt(
      /** @type {Derived} */
      e
    ), L(e, (e.f & B) !== 0 ? k : G)), e.wv = La(), va(e, Y), D !== null && (D.f & k) !== 0 && (D.f & (Ae | De)) === 0 && (x === null ? nu([e]) : x.push(e)), !r.is_fork && Dn.size > 0 && !Ta && Zi();
  }
  return n;
}
function Zi() {
  Ta = !1;
  var e = ne;
  Ze(!0);
  const n = Array.from(Dn);
  try {
    for (const t of n)
      (t.f & k) !== 0 && L(t, G), Re(t) && qe(t);
  } finally {
    Ze(e);
  }
  Dn.clear();
}
function yn(e) {
  q(e, e.v + 1);
}
function va(e, n) {
  var t = e.reactions;
  if (t !== null)
    for (var r = t.length, a = 0; a < r; a++) {
      var s = t[a], o = s.f, i = (o & Y) === 0;
      if (i && L(s, n), (o & R) !== 0) {
        var u = (
          /** @type {Derived} */
          s
        );
        $?.delete(u), (o & ae) === 0 && (o & B && (s.f |= ae), va(u, G));
      } else i && ((o & de) !== 0 && C !== null && C.add(
        /** @type {Effect} */
        s
      ), Te(
        /** @type {Effect} */
        s
      ));
    }
}
function ie(e) {
  if (typeof e != "object" || e === null || gn in e)
    return e;
  const n = Ai(e);
  if (n !== Oi && n !== ki)
    return e;
  var t = /* @__PURE__ */ new Map(), r = vi(e), a = /* @__PURE__ */ W(0), s = te, o = (i) => {
    if (te === s)
      return i();
    var u = I, c = te;
    me(null), lr(s);
    var m = i();
    return me(u), lr(c), m;
  };
  return r && t.set("length", /* @__PURE__ */ W(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(i, u, c) {
        (!("value" in c) || c.configurable === !1 || c.enumerable === !1 || c.writable === !1) && Fi();
        var m = t.get(u);
        return m === void 0 ? m = o(() => {
          var d = /* @__PURE__ */ W(c.value);
          return t.set(u, d), d;
        }) : q(m, c.value, !0), !0;
      },
      deleteProperty(i, u) {
        var c = t.get(u);
        if (c === void 0) {
          if (u in i) {
            const m = o(() => /* @__PURE__ */ W(O));
            t.set(u, m), yn(a);
          }
        } else
          q(c, O), yn(a);
        return !0;
      },
      get(i, u, c) {
        if (u === gn)
          return e;
        var m = t.get(u), d = u in i;
        if (m === void 0 && (!d || hn(i, u)?.writable) && (m = o(() => {
          var f = ie(d ? i[u] : O), p = /* @__PURE__ */ W(f);
          return p;
        }), t.set(u, m)), m !== void 0) {
          var b = Me(m);
          return b === O ? void 0 : b;
        }
        return Reflect.get(i, u, c);
      },
      getOwnPropertyDescriptor(i, u) {
        var c = Reflect.getOwnPropertyDescriptor(i, u);
        if (c && "value" in c) {
          var m = t.get(u);
          m && (c.value = Me(m));
        } else if (c === void 0) {
          var d = t.get(u), b = d?.v;
          if (d !== void 0 && b !== O)
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
        if (u === gn)
          return !0;
        var c = t.get(u), m = c !== void 0 && c.v !== O || Reflect.has(i, u);
        if (c !== void 0 || D !== null && (!m || hn(i, u)?.writable)) {
          c === void 0 && (c = o(() => {
            var b = m ? ie(i[u]) : O, f = /* @__PURE__ */ W(b);
            return f;
          }), t.set(u, c));
          var d = Me(c);
          if (d === O)
            return !1;
        }
        return m;
      },
      set(i, u, c, m) {
        var d = t.get(u), b = u in i;
        if (r && u === "length")
          for (var f = c; f < /** @type {Source<number>} */
          d.v; f += 1) {
            var p = t.get(f + "");
            p !== void 0 ? q(p, O) : f in i && (p = o(() => /* @__PURE__ */ W(O)), t.set(f + "", p));
          }
        if (d === void 0)
          (!b || hn(i, u)?.writable) && (d = o(() => /* @__PURE__ */ W(void 0)), q(d, ie(c)), t.set(u, d));
        else {
          b = d.v !== O;
          var h = o(() => ie(c));
          q(d, h);
        }
        var g = Reflect.getOwnPropertyDescriptor(i, u);
        if (g?.set && g.set.call(m, c), !b) {
          if (r && typeof u == "string") {
            var S = (
              /** @type {Source<number>} */
              t.get("length")
            ), j = Number(u);
            Number.isInteger(j) && j >= S.v && q(S, j + 1);
          }
          yn(a);
        }
        return !0;
      },
      ownKeys(i) {
        Me(a);
        var u = Reflect.ownKeys(i).filter((d) => {
          var b = t.get(d);
          return b === void 0 || b.v !== O;
        });
        for (var [c, m] of t)
          m.v !== O && !(c in i) && u.push(c);
        return u;
      },
      setPrototypeOf() {
        Pi();
      }
    }
  );
}
var Hi;
// @__NO_SIDE_EFFECTS__
function zi(e) {
  return (
    /** @type {TemplateNode | null} */
    Hi.call(e)
  );
}
function Sa(e) {
  var n = I, t = D;
  me(null), He(null);
  try {
    return e();
  } finally {
    me(n), He(t);
  }
}
function We() {
  return I !== null && !Q;
}
function Oa(e) {
  var n = e.teardown;
  if (n !== null) {
    const t = Le, r = I;
    cr(!0), me(null);
    try {
      n.call(null);
    } finally {
      cr(t), me(r);
    }
  }
}
function ka(e, n = !1) {
  var t = e.first;
  for (e.first = e.last = null; t !== null; ) {
    const a = t.ac;
    a !== null && Sa(() => {
      a.abort(ga);
    });
    var r = t.next;
    (t.f & De) !== 0 ? t.parent = null : rt(t, n), t = r;
  }
}
function qi(e) {
  for (var n = e.first; n !== null; ) {
    var t = n.next;
    (n.f & Ae) === 0 && rt(n), n = t;
  }
}
function rt(e, n = !0) {
  var t = !1;
  (n || (e.f & pa) !== 0) && e.nodes !== null && e.nodes.end !== null && (Qi(
    e.nodes.start,
    /** @type {TemplateNode} */
    e.nodes.end
  ), t = !0), ka(e, n && !t), ze(e, 0), L(e, ee);
  var r = e.nodes && e.nodes.t;
  if (r !== null)
    for (const s of r)
      s.stop();
  Oa(e);
  var a = e.parent;
  a !== null && a.first !== null && Aa(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = null;
}
function Qi(e, n) {
  for (; e !== null; ) {
    var t = e === n ? null : /* @__PURE__ */ zi(e);
    e.remove(), e = t;
  }
}
function Aa(e) {
  var n = e.parent, t = e.prev, r = e.next;
  t !== null && (t.next = r), r !== null && (r.prev = t), n !== null && (n.first === e && (n.first = r), n.last === e && (n.last = t));
}
let ne = !1;
function Ze(e) {
  ne = e;
}
let Le = !1;
function cr(e) {
  Le = e;
}
let I = null, Q = !1;
function me(e) {
  I = e;
}
let D = null;
function He(e) {
  D = e;
}
let X = null;
function eu(e) {
  I !== null && (X === null ? X = [e] : X.push(e));
}
let v = null, U = 0, x = null;
function nu(e) {
  x = e;
}
let Da = 1, ve = 0, te = ve;
function lr(e) {
  te = e;
}
function La() {
  return ++Da;
}
function Re(e) {
  var n = e.f;
  if ((n & Y) !== 0)
    return !0;
  if (n & R && (e.f &= ~ae), (n & G) !== 0) {
    var t = e.deps;
    if (t !== null)
      for (var r = t.length, a = 0; a < r; a++) {
        var s = t[a];
        if (Re(
          /** @type {Derived} */
          s
        ) && wa(
          /** @type {Derived} */
          s
        ), s.wv > e.wv)
          return !0;
      }
    (n & B) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    $ === null && L(e, k);
  }
  return !1;
}
function Ra(e, n, t = !0) {
  var r = e.reactions;
  if (r !== null && !X?.includes(e))
    for (var a = 0; a < r.length; a++) {
      var s = r[a];
      (s.f & R) !== 0 ? Ra(
        /** @type {Derived} */
        s,
        n,
        !1
      ) : n === s && (t ? L(s, Y) : (s.f & k) !== 0 && L(s, G), Te(
        /** @type {Effect} */
        s
      ));
    }
}
function Ua(e) {
  var n = v, t = U, r = x, a = I, s = X, o = Q, i = te, u = e.f;
  v = /** @type {null | Value[]} */
  null, U = 0, x = null, I = (u & (Ae | De)) === 0 ? e : null, X = null, e.ctx, Q = !1, te = ++ve, e.ac !== null && (Sa(() => {
    e.ac.abort(ga);
  }), e.ac = null);
  try {
    e.f |= kn;
    var c = (
      /** @type {Function} */
      e.fn
    ), m = c(), d = e.deps;
    if (v !== null) {
      var b;
      if (ze(e, U), d !== null && U > 0)
        for (d.length = U + v.length, b = 0; b < v.length; b++)
          d[U + b] = v[b];
      else
        e.deps = d = v;
      if (We() && (e.f & B) !== 0)
        for (b = U; b < d.length; b++)
          (d[b].reactions ??= []).push(e);
    } else d !== null && U < d.length && (ze(e, U), d.length = U);
    if (ya() && x !== null && !Q && d !== null && (e.f & (R | G | Y)) === 0)
      for (b = 0; b < /** @type {Source[]} */
      x.length; b++)
        Ra(
          x[b],
          /** @type {Effect} */
          e
        );
    return a !== null && a !== e && (ve++, x !== null && (r === null ? r = x : r.push(.../** @type {Source[]} */
    x))), (e.f & Ie) !== 0 && (e.f ^= Ie), m;
  } catch (f) {
    return Ki(f);
  } finally {
    e.f ^= kn, v = n, U = t, x = r, I = a, X = s, Q = o, te = i;
  }
}
function tu(e, n) {
  let t = n.reactions;
  if (t !== null) {
    var r = Si.call(t, e);
    if (r !== -1) {
      var a = t.length - 1;
      a === 0 ? t = n.reactions = null : (t[r] = t[a], t.pop());
    }
  }
  t === null && (n.f & R) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (v === null || !v.includes(n)) && (L(n, G), (n.f & B) !== 0 && (n.f ^= B, n.f &= ~ae), Ia(
    /** @type {Derived} **/
    n
  ), ze(
    /** @type {Derived} **/
    n,
    0
  ));
}
function ze(e, n) {
  var t = e.deps;
  if (t !== null)
    for (var r = n; r < t.length; r++)
      tu(e, t[r]);
}
function qe(e) {
  var n = e.f;
  if ((n & ee) === 0) {
    L(e, k);
    var t = D, r = ne;
    D = e, ne = !0;
    try {
      (n & (de | Ui)) !== 0 ? qi(e) : ka(e), Oa(e);
      var a = Ua(e);
      e.teardown = typeof a == "function" ? a : null, e.wv = Da;
      var s;
      On && Mi && (e.f & Y) !== 0 && e.deps;
    } finally {
      ne = r, D = t;
    }
  }
}
function Me(e) {
  var n = e.f, t = (n & R) !== 0;
  if (I !== null && !Q) {
    var r = D !== null && (D.f & ee) !== 0;
    if (!r && !X?.includes(e)) {
      var a = I.deps;
      if ((I.f & kn) !== 0)
        e.rv < ve && (e.rv = ve, v === null && a !== null && a[U] === e ? U++ : v === null ? v = [e] : v.includes(e) || v.push(e));
      else {
        (I.deps ??= []).push(e);
        var s = e.reactions;
        s === null ? e.reactions = [I] : s.includes(I) || s.push(I);
      }
    }
  }
  if (Le) {
    if (Z.has(e))
      return Z.get(e);
    if (t) {
      var o = (
        /** @type {Derived} */
        e
      ), i = o.v;
      return ((o.f & k) === 0 && o.reactions !== null || $a(o)) && (i = tt(o)), Z.set(o, i), i;
    }
  } else t && (!$?.has(e) || T?.is_fork && !We()) && (o = /** @type {Derived} */
  e, Re(o) && wa(o), ne && We() && (o.f & B) === 0 && xa(o));
  if ($?.has(e))
    return $.get(e);
  if ((e.f & Ie) !== 0)
    throw e.v;
  return e.v;
}
function xa(e) {
  if (e.deps !== null) {
    e.f ^= B;
    for (const n of e.deps)
      (n.reactions ??= []).push(e), (n.f & R) !== 0 && (n.f & B) === 0 && xa(
        /** @type {Derived} */
        n
      );
  }
}
function $a(e) {
  if (e.v === O) return !0;
  if (e.deps === null) return !1;
  for (const n of e.deps)
    if (Z.has(n) || (n.f & R) !== 0 && $a(
      /** @type {Derived} */
      n
    ))
      return !0;
  return !1;
}
const ru = -7169;
function L(e, n) {
  e.f = e.f & ru | n;
}
function lu() {
  const e = window.location.hash == "#night";
  return e && (document.documentElement.className = "night-mode", document.documentElement.dataset.bsTheme = "dark"), e;
}
function Fa() {
  return {
    isDark: document.documentElement.classList.contains("night-mode")
  };
}
const au = ie(Fa()), su = new MutationObserver((e, n) => {
  au.isDark = Fa().isDark;
});
su.observe(document.documentElement, { attributeFilter: ["class"] });
export {
  ou as bridgeCommand,
  lu as checkNightMode,
  uu as createProtoClient,
  au as pageTheme,
  iu as promiseWithResolver
};
