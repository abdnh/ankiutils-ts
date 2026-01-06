function qk(e, t) {
  window.bridgeCommand(e, t);
}
function Qk() {
  let e;
  return [new Promise((n) => e = n), e];
}
var T;
(function(e) {
  e[e.Canceled = 1] = "Canceled", e[e.Unknown = 2] = "Unknown", e[e.InvalidArgument = 3] = "InvalidArgument", e[e.DeadlineExceeded = 4] = "DeadlineExceeded", e[e.NotFound = 5] = "NotFound", e[e.AlreadyExists = 6] = "AlreadyExists", e[e.PermissionDenied = 7] = "PermissionDenied", e[e.ResourceExhausted = 8] = "ResourceExhausted", e[e.FailedPrecondition = 9] = "FailedPrecondition", e[e.Aborted = 10] = "Aborted", e[e.OutOfRange = 11] = "OutOfRange", e[e.Unimplemented = 12] = "Unimplemented", e[e.Internal = 13] = "Internal", e[e.Unavailable = 14] = "Unavailable", e[e.DataLoss = 15] = "DataLoss", e[e.Unauthenticated = 16] = "Unauthenticated";
})(T || (T = {}));
function Mi(e, t) {
  return e !== null && typeof e == "object" && "$typeName" in e && typeof e.$typeName == "string" ? t === void 0 ? !0 : t.typeName === e.$typeName : !1;
}
var p;
(function(e) {
  e[e.DOUBLE = 1] = "DOUBLE", e[e.FLOAT = 2] = "FLOAT", e[e.INT64 = 3] = "INT64", e[e.UINT64 = 4] = "UINT64", e[e.INT32 = 5] = "INT32", e[e.FIXED64 = 6] = "FIXED64", e[e.FIXED32 = 7] = "FIXED32", e[e.BOOL = 8] = "BOOL", e[e.STRING = 9] = "STRING", e[e.BYTES = 12] = "BYTES", e[e.UINT32 = 13] = "UINT32", e[e.SFIXED32 = 15] = "SFIXED32", e[e.SFIXED64 = 16] = "SFIXED64", e[e.SINT32 = 17] = "SINT32", e[e.SINT64 = 18] = "SINT64";
})(p || (p = {}));
function tN() {
  let e = 0, t = 0;
  for (let r = 0; r < 28; r += 7) {
    let a = this.buf[this.pos++];
    if (e |= (a & 127) << r, (a & 128) == 0)
      return this.assertBounds(), [e, t];
  }
  let n = this.buf[this.pos++];
  if (e |= (n & 15) << 28, t = (n & 112) >> 4, (n & 128) == 0)
    return this.assertBounds(), [e, t];
  for (let r = 3; r <= 31; r += 7) {
    let a = this.buf[this.pos++];
    if (t |= (a & 127) << r, (a & 128) == 0)
      return this.assertBounds(), [e, t];
  }
  throw new Error("invalid varint");
}
function ms(e, t, n) {
  for (let o = 0; o < 28; o = o + 7) {
    const s = e >>> o, i = !(!(s >>> 7) && t == 0), u = (i ? s | 128 : s) & 255;
    if (n.push(u), !i)
      return;
  }
  const r = e >>> 28 & 15 | (t & 7) << 4, a = t >> 3 != 0;
  if (n.push((a ? r | 128 : r) & 255), !!a) {
    for (let o = 3; o < 31; o = o + 7) {
      const s = t >>> o, i = !!(s >>> 7), u = (i ? s | 128 : s) & 255;
      if (n.push(u), !i)
        return;
    }
    n.push(t >>> 31 & 1);
  }
}
const Ka = 4294967296;
function Ml(e) {
  const t = e[0] === "-";
  t && (e = e.slice(1));
  const n = 1e6;
  let r = 0, a = 0;
  function o(s, i) {
    const u = Number(e.slice(s, i));
    a *= n, r = r * n + u, r >= Ka && (a = a + (r / Ka | 0), r = r % Ka);
  }
  return o(-24, -18), o(-18, -12), o(-12, -6), o(-6), t ? fp(r, a) : Bi(r, a);
}
function nN(e, t) {
  let n = Bi(e, t);
  const r = n.hi & 2147483648;
  r && (n = fp(n.lo, n.hi));
  const a = cp(n.lo, n.hi);
  return r ? "-" + a : a;
}
function cp(e, t) {
  if ({ lo: e, hi: t } = rN(e, t), t <= 2097151)
    return String(Ka * t + e);
  const n = e & 16777215, r = (e >>> 24 | t << 8) & 16777215, a = t >> 16 & 65535;
  let o = n + r * 6777216 + a * 6710656, s = r + a * 8147497, i = a * 2;
  const u = 1e7;
  return o >= u && (s += Math.floor(o / u), o %= u), s >= u && (i += Math.floor(s / u), s %= u), i.toString() + Bl(s) + Bl(o);
}
function rN(e, t) {
  return { lo: e >>> 0, hi: t >>> 0 };
}
function Bi(e, t) {
  return { lo: e | 0, hi: t | 0 };
}
function fp(e, t) {
  return t = ~t, e ? e = ~e + 1 : t += 1, Bi(e, t);
}
const Bl = (e) => {
  const t = String(e);
  return "0000000".slice(t.length) + t;
};
function Zs(e, t) {
  if (e >= 0) {
    for (; e > 127; )
      t.push(e & 127 | 128), e = e >>> 7;
    t.push(e);
  } else {
    for (let n = 0; n < 9; n++)
      t.push(e & 127 | 128), e = e >> 7;
    t.push(1);
  }
}
function aN() {
  let e = this.buf[this.pos++], t = e & 127;
  if ((e & 128) == 0)
    return this.assertBounds(), t;
  if (e = this.buf[this.pos++], t |= (e & 127) << 7, (e & 128) == 0)
    return this.assertBounds(), t;
  if (e = this.buf[this.pos++], t |= (e & 127) << 14, (e & 128) == 0)
    return this.assertBounds(), t;
  if (e = this.buf[this.pos++], t |= (e & 127) << 21, (e & 128) == 0)
    return this.assertBounds(), t;
  e = this.buf[this.pos++], t |= (e & 15) << 28;
  for (let n = 5; (e & 128) !== 0 && n < 10; n++)
    e = this.buf[this.pos++];
  if ((e & 128) != 0)
    throw new Error("invalid varint");
  return this.assertBounds(), t >>> 0;
}
const S = /* @__PURE__ */ oN();
function oN() {
  const e = new DataView(new ArrayBuffer(8));
  if (typeof BigInt == "function" && typeof e.getBigInt64 == "function" && typeof e.getBigUint64 == "function" && typeof e.setBigInt64 == "function" && typeof e.setBigUint64 == "function" && (!!globalThis.Deno || typeof process != "object" || typeof process.env != "object" || process.env.BUF_BIGINT_DISABLE !== "1")) {
    const n = BigInt("-9223372036854775808"), r = BigInt("9223372036854775807"), a = BigInt("0"), o = BigInt("18446744073709551615");
    return {
      zero: BigInt(0),
      supported: !0,
      parse(s) {
        const i = typeof s == "bigint" ? s : BigInt(s);
        if (i > r || i < n)
          throw new Error(`invalid int64: ${s}`);
        return i;
      },
      uParse(s) {
        const i = typeof s == "bigint" ? s : BigInt(s);
        if (i > o || i < a)
          throw new Error(`invalid uint64: ${s}`);
        return i;
      },
      enc(s) {
        return e.setBigInt64(0, this.parse(s), !0), {
          lo: e.getInt32(0, !0),
          hi: e.getInt32(4, !0)
        };
      },
      uEnc(s) {
        return e.setBigInt64(0, this.uParse(s), !0), {
          lo: e.getInt32(0, !0),
          hi: e.getInt32(4, !0)
        };
      },
      dec(s, i) {
        return e.setInt32(0, s, !0), e.setInt32(4, i, !0), e.getBigInt64(0, !0);
      },
      uDec(s, i) {
        return e.setInt32(0, s, !0), e.setInt32(4, i, !0), e.getBigUint64(0, !0);
      }
    };
  }
  return {
    zero: "0",
    supported: !1,
    parse(n) {
      return typeof n != "string" && (n = n.toString()), Gl(n), n;
    },
    uParse(n) {
      return typeof n != "string" && (n = n.toString()), Kl(n), n;
    },
    enc(n) {
      return typeof n != "string" && (n = n.toString()), Gl(n), Ml(n);
    },
    uEnc(n) {
      return typeof n != "string" && (n = n.toString()), Kl(n), Ml(n);
    },
    dec(n, r) {
      return nN(n, r);
    },
    uDec(n, r) {
      return cp(n, r);
    }
  };
}
function Gl(e) {
  if (!/^-?[0-9]+$/.test(e))
    throw new Error("invalid int64: " + e);
}
function Kl(e) {
  if (!/^[0-9]+$/.test(e))
    throw new Error("invalid uint64: " + e);
}
function hn(e, t) {
  switch (e) {
    case p.STRING:
      return "";
    case p.BOOL:
      return !1;
    case p.DOUBLE:
    case p.FLOAT:
      return 0;
    case p.INT64:
    case p.UINT64:
    case p.SFIXED64:
    case p.FIXED64:
    case p.SINT64:
      return t ? "0" : S.zero;
    case p.BYTES:
      return new Uint8Array(0);
    default:
      return 0;
  }
}
function sN(e, t) {
  switch (e) {
    case p.BOOL:
      return t === !1;
    case p.STRING:
      return t === "";
    case p.BYTES:
      return t instanceof Uint8Array && !t.byteLength;
    default:
      return t == 0;
  }
}
const mp = 2, Ot = /* @__PURE__ */ Symbol.for("reflect unsafe local");
function dp(e, t) {
  const n = e[t.localName].case;
  return n === void 0 ? n : t.fields.find((r) => r.localName === n);
}
function iN(e, t) {
  const n = t.localName;
  if (t.oneof)
    return e[t.oneof.localName].case === n;
  if (t.presence != mp)
    return e[n] !== void 0 && Object.prototype.hasOwnProperty.call(e, n);
  switch (t.fieldKind) {
    case "list":
      return e[n].length > 0;
    case "map":
      return Object.keys(e[n]).length > 0;
    case "scalar":
      return !sN(t.scalar, e[n]);
    case "enum":
      return e[n] !== t.enum.values[0].number;
  }
  throw new Error("message field with implicit presence");
}
function mr(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t) && e[t] !== void 0;
}
function pp(e, t) {
  if (t.oneof) {
    const n = e[t.oneof.localName];
    return n.case === t.localName ? n.value : void 0;
  }
  return e[t.localName];
}
function bp(e, t, n) {
  t.oneof ? e[t.oneof.localName] = {
    case: t.localName,
    value: n
  } : e[t.localName] = n;
}
function uN(e, t) {
  const n = t.localName;
  if (t.oneof) {
    const r = t.oneof.localName;
    e[r].case === n && (e[r] = { case: void 0 });
  } else if (t.presence != mp)
    delete e[n];
  else
    switch (t.fieldKind) {
      case "map":
        e[n] = {};
        break;
      case "list":
        e[n] = [];
        break;
      case "enum":
        e[n] = t.enum.values[0].number;
        break;
      case "scalar":
        e[n] = hn(t.scalar, t.longAsString);
        break;
    }
}
function Gt(e) {
  return e !== null && typeof e == "object" && !Array.isArray(e);
}
function Gi(e, t) {
  var n, r, a, o;
  if (Gt(e) && Ot in e && "add" in e && "field" in e && typeof e.field == "function") {
    if (t !== void 0) {
      const s = t, i = e.field();
      return s.listKind == i.listKind && s.scalar === i.scalar && ((n = s.message) === null || n === void 0 ? void 0 : n.typeName) === ((r = i.message) === null || r === void 0 ? void 0 : r.typeName) && ((a = s.enum) === null || a === void 0 ? void 0 : a.typeName) === ((o = i.enum) === null || o === void 0 ? void 0 : o.typeName);
    }
    return !0;
  }
  return !1;
}
function Ki(e, t) {
  var n, r, a, o;
  if (Gt(e) && Ot in e && "has" in e && "field" in e && typeof e.field == "function") {
    if (t !== void 0) {
      const s = t, i = e.field();
      return s.mapKey === i.mapKey && s.mapKind == i.mapKind && s.scalar === i.scalar && ((n = s.message) === null || n === void 0 ? void 0 : n.typeName) === ((r = i.message) === null || r === void 0 ? void 0 : r.typeName) && ((a = s.enum) === null || a === void 0 ? void 0 : a.typeName) === ((o = i.enum) === null || o === void 0 ? void 0 : o.typeName);
    }
    return !0;
  }
  return !1;
}
function Ci(e, t) {
  return Gt(e) && Ot in e && "desc" in e && Gt(e.desc) && e.desc.kind === "message" && (t === void 0 || e.desc.typeName == t.typeName);
}
function lN(e) {
  return gp(e.$typeName);
}
function Zr(e) {
  const t = e.fields[0];
  return gp(e.typeName) && t !== void 0 && t.fieldKind == "scalar" && t.name == "value" && t.number == 1;
}
function gp(e) {
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
const cN = 999, fN = 998, Ca = 2;
function ze(e, t) {
  if (Mi(t, e))
    return t;
  const n = gN(e);
  return t !== void 0 && mN(e, n, t), n;
}
function mN(e, t, n) {
  for (const r of e.members) {
    let a = n[r.localName];
    if (a == null)
      continue;
    let o;
    if (r.kind == "oneof") {
      const s = dp(n, r);
      if (!s)
        continue;
      o = s, a = pp(n, s);
    } else
      o = r;
    switch (o.fieldKind) {
      case "message":
        a = ji(o, a);
        break;
      case "scalar":
        a = hp(o, a);
        break;
      case "list":
        a = pN(o, a);
        break;
      case "map":
        a = dN(o, a);
        break;
    }
    bp(t, o, a);
  }
  return t;
}
function hp(e, t) {
  return e.scalar == p.BYTES ? Xi(t) : t;
}
function dN(e, t) {
  if (Gt(t)) {
    if (e.scalar == p.BYTES)
      return Cl(t, Xi);
    if (e.mapKind == "message")
      return Cl(t, (n) => ji(e, n));
  }
  return t;
}
function pN(e, t) {
  if (Array.isArray(t)) {
    if (e.scalar == p.BYTES)
      return t.map(Xi);
    if (e.listKind == "message")
      return t.map((n) => ji(e, n));
  }
  return t;
}
function ji(e, t) {
  if (e.fieldKind == "message" && !e.oneof && Zr(e.message))
    return hp(e.message.fields[0], t);
  if (Gt(t)) {
    if (e.message.typeName == "google.protobuf.Struct" && e.parent.typeName !== "google.protobuf.Value")
      return t;
    if (!Mi(t, e.message))
      return ze(e.message, t);
  }
  return t;
}
function Xi(e) {
  return Array.isArray(e) ? new Uint8Array(e) : e;
}
function Cl(e, t) {
  const n = {};
  for (const r of Object.entries(e))
    n[r[0]] = t(r[1]);
  return n;
}
const bN = /* @__PURE__ */ Symbol(), jl = /* @__PURE__ */ new WeakMap();
function gN(e) {
  let t;
  if (hN(e)) {
    const n = jl.get(e);
    let r, a;
    if (n)
      ({ prototype: r, members: a } = n);
    else {
      r = {}, a = /* @__PURE__ */ new Set();
      for (const o of e.members)
        o.kind != "oneof" && (o.fieldKind != "scalar" && o.fieldKind != "enum" || o.presence != Ca && (a.add(o), r[o.localName] = ds(o)));
      jl.set(e, { prototype: r, members: a });
    }
    t = Object.create(r), t.$typeName = e.typeName;
    for (const o of e.members)
      a.has(o) || o.kind == "field" && (o.fieldKind == "message" || (o.fieldKind == "scalar" || o.fieldKind == "enum") && o.presence != Ca) || (t[o.localName] = ds(o));
  } else {
    t = {
      $typeName: e.typeName
    };
    for (const n of e.members)
      (n.kind == "oneof" || n.presence == Ca) && (t[n.localName] = ds(n));
  }
  return t;
}
function hN(e) {
  switch (e.file.edition) {
    case cN:
      return !1;
    case fN:
      return !0;
    default:
      return e.fields.some((t) => t.presence != Ca && t.fieldKind != "message" && !t.oneof);
  }
}
function ds(e) {
  if (e.kind == "oneof")
    return { case: void 0 };
  if (e.fieldKind == "list")
    return [];
  if (e.fieldKind == "map")
    return {};
  if (e.fieldKind == "message")
    return bN;
  const t = e.getDefaultValue();
  return t !== void 0 ? e.fieldKind == "scalar" && e.longAsString ? t.toString() : t : e.fieldKind == "scalar" ? hn(e.scalar, e.longAsString) : e.enum.values[0].number;
}
const yN = [
  "FieldValueInvalidError",
  "FieldListRangeError",
  "ForeignFieldError"
];
class de extends Error {
  constructor(t, n, r = "FieldValueInvalidError") {
    super(n), this.name = r, this.field = () => t;
  }
}
function EN(e) {
  return e instanceof Error && yN.includes(e.name) && "field" in e && typeof e.field == "function";
}
const ps = /* @__PURE__ */ Symbol.for("@bufbuild/protobuf/text-encoding");
function Wi() {
  if (globalThis[ps] == null) {
    const e = new globalThis.TextEncoder(), t = new globalThis.TextDecoder();
    globalThis[ps] = {
      encodeUtf8(n) {
        return e.encode(n);
      },
      decodeUtf8(n) {
        return t.decode(n);
      },
      checkUtf8(n) {
        try {
          return encodeURIComponent(n), !0;
        } catch {
          return !1;
        }
      }
    };
  }
  return globalThis[ps];
}
var L;
(function(e) {
  e[e.Varint = 0] = "Varint", e[e.Bit64 = 1] = "Bit64", e[e.LengthDelimited = 2] = "LengthDelimited", e[e.StartGroup = 3] = "StartGroup", e[e.EndGroup = 4] = "EndGroup", e[e.Bit32 = 5] = "Bit32";
})(L || (L = {}));
const yp = 34028234663852886e22, Ep = -34028234663852886e22, Np = 4294967295, vp = 2147483647, Ip = -2147483648;
class Tp {
  constructor(t = Wi().encodeUtf8) {
    this.encodeUtf8 = t, this.stack = [], this.chunks = [], this.buf = [];
  }
  /**
   * Return all bytes written and reset this writer.
   */
  finish() {
    this.buf.length && (this.chunks.push(new Uint8Array(this.buf)), this.buf = []);
    let t = 0;
    for (let a = 0; a < this.chunks.length; a++)
      t += this.chunks[a].length;
    let n = new Uint8Array(t), r = 0;
    for (let a = 0; a < this.chunks.length; a++)
      n.set(this.chunks[a], r), r += this.chunks[a].length;
    return this.chunks = [], n;
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
    let t = this.finish(), n = this.stack.pop();
    if (!n)
      throw new Error("invalid state, fork stack empty");
    return this.chunks = n.chunks, this.buf = n.buf, this.uint32(t.byteLength), this.raw(t);
  }
  /**
   * Writes a tag (field number and wire type).
   *
   * Equivalent to `uint32( (fieldNo << 3 | type) >>> 0 )`.
   *
   * Generated code should compute the tag ahead of time and call `uint32()`.
   */
  tag(t, n) {
    return this.uint32((t << 3 | n) >>> 0);
  }
  /**
   * Write a chunk of raw bytes.
   */
  raw(t) {
    return this.buf.length && (this.chunks.push(new Uint8Array(this.buf)), this.buf = []), this.chunks.push(t), this;
  }
  /**
   * Write a `uint32` value, an unsigned 32 bit varint.
   */
  uint32(t) {
    for (Xl(t); t > 127; )
      this.buf.push(t & 127 | 128), t = t >>> 7;
    return this.buf.push(t), this;
  }
  /**
   * Write a `int32` value, a signed 32 bit varint.
   */
  int32(t) {
    return bs(t), Zs(t, this.buf), this;
  }
  /**
   * Write a `bool` value, a variant.
   */
  bool(t) {
    return this.buf.push(t ? 1 : 0), this;
  }
  /**
   * Write a `bytes` value, length-delimited arbitrary data.
   */
  bytes(t) {
    return this.uint32(t.byteLength), this.raw(t);
  }
  /**
   * Write a `string` value, length-delimited data converted to UTF-8 text.
   */
  string(t) {
    let n = this.encodeUtf8(t);
    return this.uint32(n.byteLength), this.raw(n);
  }
  /**
   * Write a `float` value, 32-bit floating point number.
   */
  float(t) {
    NN(t);
    let n = new Uint8Array(4);
    return new DataView(n.buffer).setFloat32(0, t, !0), this.raw(n);
  }
  /**
   * Write a `double` value, a 64-bit floating point number.
   */
  double(t) {
    let n = new Uint8Array(8);
    return new DataView(n.buffer).setFloat64(0, t, !0), this.raw(n);
  }
  /**
   * Write a `fixed32` value, an unsigned, fixed-length 32-bit integer.
   */
  fixed32(t) {
    Xl(t);
    let n = new Uint8Array(4);
    return new DataView(n.buffer).setUint32(0, t, !0), this.raw(n);
  }
  /**
   * Write a `sfixed32` value, a signed, fixed-length 32-bit integer.
   */
  sfixed32(t) {
    bs(t);
    let n = new Uint8Array(4);
    return new DataView(n.buffer).setInt32(0, t, !0), this.raw(n);
  }
  /**
   * Write a `sint32` value, a signed, zigzag-encoded 32-bit varint.
   */
  sint32(t) {
    return bs(t), t = (t << 1 ^ t >> 31) >>> 0, Zs(t, this.buf), this;
  }
  /**
   * Write a `fixed64` value, a signed, fixed-length 64-bit integer.
   */
  sfixed64(t) {
    let n = new Uint8Array(8), r = new DataView(n.buffer), a = S.enc(t);
    return r.setInt32(0, a.lo, !0), r.setInt32(4, a.hi, !0), this.raw(n);
  }
  /**
   * Write a `fixed64` value, an unsigned, fixed-length 64 bit integer.
   */
  fixed64(t) {
    let n = new Uint8Array(8), r = new DataView(n.buffer), a = S.uEnc(t);
    return r.setInt32(0, a.lo, !0), r.setInt32(4, a.hi, !0), this.raw(n);
  }
  /**
   * Write a `int64` value, a signed 64-bit varint.
   */
  int64(t) {
    let n = S.enc(t);
    return ms(n.lo, n.hi, this.buf), this;
  }
  /**
   * Write a `sint64` value, a signed, zig-zag-encoded 64-bit varint.
   */
  sint64(t) {
    const n = S.enc(t), r = n.hi >> 31, a = n.lo << 1 ^ r, o = (n.hi << 1 | n.lo >>> 31) ^ r;
    return ms(a, o, this.buf), this;
  }
  /**
   * Write a `uint64` value, an unsigned 64-bit varint.
   */
  uint64(t) {
    const n = S.uEnc(t);
    return ms(n.lo, n.hi, this.buf), this;
  }
}
class Ji {
  constructor(t, n = Wi().decodeUtf8) {
    this.decodeUtf8 = n, this.varint64 = tN, this.uint32 = aN, this.buf = t, this.len = t.length, this.pos = 0, this.view = new DataView(t.buffer, t.byteOffset, t.byteLength);
  }
  /**
   * Reads a tag - field number and wire type.
   */
  tag() {
    let t = this.uint32(), n = t >>> 3, r = t & 7;
    if (n <= 0 || r < 0 || r > 5)
      throw new Error("illegal tag: field no " + n + " wire type " + r);
    return [n, r];
  }
  /**
   * Skip one element and return the skipped data.
   *
   * When skipping StartGroup, provide the tags field number to check for
   * matching field number in the EndGroup tag.
   */
  skip(t, n) {
    let r = this.pos;
    switch (t) {
      case L.Varint:
        for (; this.buf[this.pos++] & 128; )
          ;
        break;
      // @ts-ignore TS7029: Fallthrough case in switch -- ignore instead of expect-error for compiler settings without noFallthroughCasesInSwitch: true
      case L.Bit64:
        this.pos += 4;
      case L.Bit32:
        this.pos += 4;
        break;
      case L.LengthDelimited:
        let a = this.uint32();
        this.pos += a;
        break;
      case L.StartGroup:
        for (; ; ) {
          const [o, s] = this.tag();
          if (s === L.EndGroup) {
            if (n !== void 0 && o !== n)
              throw new Error("invalid end group tag");
            break;
          }
          this.skip(s, o);
        }
        break;
      default:
        throw new Error("cant skip wire type " + t);
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
    let t = this.uint32();
    return t >>> 1 ^ -(t & 1);
  }
  /**
   * Read a `int64` field, a signed 64-bit varint.
   */
  int64() {
    return S.dec(...this.varint64());
  }
  /**
   * Read a `uint64` field, an unsigned 64-bit varint.
   */
  uint64() {
    return S.uDec(...this.varint64());
  }
  /**
   * Read a `sint64` field, a signed, zig-zag-encoded 64-bit varint.
   */
  sint64() {
    let [t, n] = this.varint64(), r = -(t & 1);
    return t = (t >>> 1 | (n & 1) << 31) ^ r, n = n >>> 1 ^ r, S.dec(t, n);
  }
  /**
   * Read a `bool` field, a variant.
   */
  bool() {
    let [t, n] = this.varint64();
    return t !== 0 || n !== 0;
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
    return S.uDec(this.sfixed32(), this.sfixed32());
  }
  /**
   * Read a `fixed64` field, a signed, fixed-length 64-bit integer.
   */
  sfixed64() {
    return S.dec(this.sfixed32(), this.sfixed32());
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
    let t = this.uint32(), n = this.pos;
    return this.pos += t, this.assertBounds(), this.buf.subarray(n, n + t);
  }
  /**
   * Read a `string` field, length-delimited data converted to UTF-8 text.
   */
  string() {
    return this.decodeUtf8(this.bytes());
  }
}
function bs(e) {
  if (typeof e == "string")
    e = Number(e);
  else if (typeof e != "number")
    throw new Error("invalid int32: " + typeof e);
  if (!Number.isInteger(e) || e > vp || e < Ip)
    throw new Error("invalid int32: " + e);
}
function Xl(e) {
  if (typeof e == "string")
    e = Number(e);
  else if (typeof e != "number")
    throw new Error("invalid uint32: " + typeof e);
  if (!Number.isInteger(e) || e > Np || e < 0)
    throw new Error("invalid uint32: " + e);
}
function NN(e) {
  if (typeof e == "string") {
    const t = e;
    if (e = Number(e), Number.isNaN(e) && t !== "NaN")
      throw new Error("invalid float32: " + t);
  } else if (typeof e != "number")
    throw new Error("invalid float32: " + typeof e);
  if (Number.isFinite(e) && (e > yp || e < Ep))
    throw new Error("invalid float32: " + e);
}
function Xt(e, t) {
  const n = e.fieldKind == "list" ? Gi(t, e) : e.fieldKind == "map" ? Ki(t, e) : Zi(e, t);
  if (n === !0)
    return;
  let r;
  switch (e.fieldKind) {
    case "list":
      r = `expected ${Op(e)}, got ${j(t)}`;
      break;
    case "map":
      r = `expected ${Sp(e)}, got ${j(t)}`;
      break;
    default:
      r = to(e, t, n);
  }
  return new de(e, r);
}
function Wl(e, t, n) {
  const r = Zi(e, n);
  if (r !== !0)
    return new de(e, `list item #${t + 1}: ${to(e, n, r)}`);
}
function vN(e, t, n) {
  const r = wp(t, e.mapKey);
  if (r !== !0)
    return new de(e, `invalid map key: ${to({ scalar: e.mapKey }, t, r)}`);
  const a = Zi(e, n);
  if (a !== !0)
    return new de(e, `map entry ${j(t)}: ${to(e, n, a)}`);
}
function Zi(e, t) {
  return e.scalar !== void 0 ? wp(t, e.scalar) : e.enum !== void 0 ? e.enum.open ? Number.isInteger(t) : e.enum.values.some((n) => n.number === t) : Ci(t, e.message);
}
function wp(e, t) {
  switch (t) {
    case p.DOUBLE:
      return typeof e == "number";
    case p.FLOAT:
      return typeof e != "number" ? !1 : Number.isNaN(e) || !Number.isFinite(e) ? !0 : e > yp || e < Ep ? `${e.toFixed()} out of range` : !0;
    case p.INT32:
    case p.SFIXED32:
    case p.SINT32:
      return typeof e != "number" || !Number.isInteger(e) ? !1 : e > vp || e < Ip ? `${e.toFixed()} out of range` : !0;
    case p.FIXED32:
    case p.UINT32:
      return typeof e != "number" || !Number.isInteger(e) ? !1 : e > Np || e < 0 ? `${e.toFixed()} out of range` : !0;
    case p.BOOL:
      return typeof e == "boolean";
    case p.STRING:
      return typeof e != "string" ? !1 : Wi().checkUtf8(e) || "invalid UTF8";
    case p.BYTES:
      return e instanceof Uint8Array;
    case p.INT64:
    case p.SFIXED64:
    case p.SINT64:
      if (typeof e == "bigint" || typeof e == "number" || typeof e == "string" && e.length > 0)
        try {
          return S.parse(e), !0;
        } catch {
          return `${e} out of range`;
        }
      return !1;
    case p.FIXED64:
    case p.UINT64:
      if (typeof e == "bigint" || typeof e == "number" || typeof e == "string" && e.length > 0)
        try {
          return S.uParse(e), !0;
        } catch {
          return `${e} out of range`;
        }
      return !1;
  }
}
function to(e, t, n) {
  return n = typeof n == "string" ? `: ${n}` : `, got ${j(t)}`, e.scalar !== void 0 ? `expected ${IN(e.scalar)}` + n : e.enum !== void 0 ? `expected ${e.enum.toString()}` + n : `expected ${_p(e.message)}` + n;
}
function j(e) {
  switch (typeof e) {
    case "object":
      return e === null ? "null" : e instanceof Uint8Array ? `Uint8Array(${e.length})` : Array.isArray(e) ? `Array(${e.length})` : Gi(e) ? Op(e.field()) : Ki(e) ? Sp(e.field()) : Ci(e) ? _p(e.desc) : Mi(e) ? `message ${e.$typeName}` : "object";
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
function _p(e) {
  return `ReflectMessage (${e.typeName})`;
}
function Op(e) {
  switch (e.listKind) {
    case "message":
      return `ReflectList (${e.message.toString()})`;
    case "enum":
      return `ReflectList (${e.enum.toString()})`;
    case "scalar":
      return `ReflectList (${p[e.scalar]})`;
  }
}
function Sp(e) {
  switch (e.mapKind) {
    case "message":
      return `ReflectMap (${p[e.mapKey]}, ${e.message.toString()})`;
    case "enum":
      return `ReflectMap (${p[e.mapKey]}, ${e.enum.toString()})`;
    case "scalar":
      return `ReflectMap (${p[e.mapKey]}, ${p[e.scalar]})`;
  }
}
function IN(e) {
  switch (e) {
    case p.STRING:
      return "string";
    case p.BOOL:
      return "boolean";
    case p.INT64:
    case p.SINT64:
    case p.SFIXED64:
      return "bigint (int64)";
    case p.UINT64:
    case p.FIXED64:
      return "bigint (uint64)";
    case p.BYTES:
      return "Uint8Array";
    case p.DOUBLE:
      return "number (float64)";
    case p.FLOAT:
      return "number (float32)";
    case p.FIXED32:
    case p.UINT32:
      return "number (uint32)";
    case p.INT32:
    case p.SFIXED32:
    case p.SINT32:
      return "number (int32)";
  }
}
function Ge(e, t, n = !0) {
  return new kp(e, t, n);
}
const Jl = /* @__PURE__ */ new WeakMap();
class kp {
  get sortedFields() {
    const t = Jl.get(this.desc);
    if (t)
      return t;
    const n = this.desc.fields.concat().sort((r, a) => r.number - a.number);
    return Jl.set(this.desc, n), n;
  }
  constructor(t, n, r = !0) {
    this.lists = /* @__PURE__ */ new Map(), this.maps = /* @__PURE__ */ new Map(), this.check = r, this.desc = t, this.message = this[Ot] = n ?? ze(t), this.fields = t.fields, this.oneofs = t.oneofs, this.members = t.members;
  }
  findNumber(t) {
    return this._fieldsByNumber || (this._fieldsByNumber = new Map(this.desc.fields.map((n) => [n.number, n]))), this._fieldsByNumber.get(t);
  }
  oneofCase(t) {
    return ar(this.message, t), dp(this.message, t);
  }
  isSet(t) {
    return ar(this.message, t), iN(this.message, t);
  }
  clear(t) {
    ar(this.message, t), uN(this.message, t);
  }
  get(t) {
    ar(this.message, t);
    const n = pp(this.message, t);
    switch (t.fieldKind) {
      case "list":
        let r = this.lists.get(t);
        return (!r || r[Ot] !== n) && this.lists.set(
          t,
          // biome-ignore lint/suspicious/noAssignInExpressions: no
          r = new TN(t, n, this.check)
        ), r;
      case "map":
        let a = this.maps.get(t);
        return (!a || a[Ot] !== n) && this.maps.set(
          t,
          // biome-ignore lint/suspicious/noAssignInExpressions: no
          a = new wN(t, n, this.check)
        ), a;
      case "message":
        return zi(t, n, this.check);
      case "scalar":
        return n === void 0 ? hn(t.scalar, !1) : qi(t, n);
      case "enum":
        return n ?? t.enum.values[0].number;
    }
  }
  set(t, n) {
    if (ar(this.message, t), this.check) {
      const a = Xt(t, n);
      if (a)
        throw a;
    }
    let r;
    t.fieldKind == "message" ? r = Hi(t, n) : Ki(n) || Gi(n) ? r = n[Ot] : r = Qi(t, n), bp(this.message, t, r);
  }
  getUnknown() {
    return this.message.$unknown;
  }
  setUnknown(t) {
    this.message.$unknown = t;
  }
}
function ar(e, t) {
  if (t.parent.typeName !== e.$typeName)
    throw new de(t, `cannot use ${t.toString()} with message ${e.$typeName}`, "ForeignFieldError");
}
class TN {
  field() {
    return this._field;
  }
  get size() {
    return this._arr.length;
  }
  constructor(t, n, r) {
    this._field = t, this._arr = this[Ot] = n, this.check = r;
  }
  get(t) {
    const n = this._arr[t];
    return n === void 0 ? void 0 : gs(this._field, n, this.check);
  }
  set(t, n) {
    if (t < 0 || t >= this._arr.length)
      throw new de(this._field, `list item #${t + 1}: out of range`);
    if (this.check) {
      const r = Wl(this._field, t, n);
      if (r)
        throw r;
    }
    this._arr[t] = Zl(this._field, n);
  }
  add(t) {
    if (this.check) {
      const n = Wl(this._field, this._arr.length, t);
      if (n)
        throw n;
    }
    this._arr.push(Zl(this._field, t));
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
    for (const t of this._arr)
      yield gs(this._field, t, this.check);
  }
  *entries() {
    for (let t = 0; t < this._arr.length; t++)
      yield [t, gs(this._field, this._arr[t], this.check)];
  }
}
class wN {
  constructor(t, n, r = !0) {
    this.obj = this[Ot] = n ?? {}, this.check = r, this._field = t;
  }
  field() {
    return this._field;
  }
  set(t, n) {
    if (this.check) {
      const r = vN(this._field, t, n);
      if (r)
        throw r;
    }
    return this.obj[Ta(t)] = _N(this._field, n), this;
  }
  delete(t) {
    const n = Ta(t), r = Object.prototype.hasOwnProperty.call(this.obj, n);
    return r && delete this.obj[n], r;
  }
  clear() {
    for (const t of Object.keys(this.obj))
      delete this.obj[t];
  }
  get(t) {
    let n = this.obj[Ta(t)];
    return n !== void 0 && (n = hs(this._field, n, this.check)), n;
  }
  has(t) {
    return Object.prototype.hasOwnProperty.call(this.obj, Ta(t));
  }
  *keys() {
    for (const t of Object.keys(this.obj))
      yield Hl(t, this._field.mapKey);
  }
  *entries() {
    for (const t of Object.entries(this.obj))
      yield [
        Hl(t[0], this._field.mapKey),
        hs(this._field, t[1], this.check)
      ];
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  get size() {
    return Object.keys(this.obj).length;
  }
  *values() {
    for (const t of Object.values(this.obj))
      yield hs(this._field, t, this.check);
  }
  forEach(t, n) {
    for (const r of this.entries())
      t.call(n, r[1], r[0], this);
  }
}
function Hi(e, t) {
  return Ci(t) ? lN(t.message) && !e.oneof && e.fieldKind == "message" ? t.message.value : t.desc.typeName == "google.protobuf.Struct" && e.parent.typeName != "google.protobuf.Value" ? Ap(t.message) : t.message : t;
}
function zi(e, t, n) {
  return t !== void 0 && (Zr(e.message) && !e.oneof && e.fieldKind == "message" ? t = {
    $typeName: e.message.typeName,
    value: qi(e.message.fields[0], t)
  } : e.message.typeName == "google.protobuf.Struct" && e.parent.typeName != "google.protobuf.Value" && Gt(t) && (t = Dp(t))), new kp(e.message, t, n);
}
function Zl(e, t) {
  return e.listKind == "message" ? Hi(e, t) : Qi(e, t);
}
function gs(e, t, n) {
  return e.listKind == "message" ? zi(e, t, n) : qi(e, t);
}
function _N(e, t) {
  return e.mapKind == "message" ? Hi(e, t) : Qi(e, t);
}
function hs(e, t, n) {
  return e.mapKind == "message" ? zi(e, t, n) : t;
}
function Ta(e) {
  return typeof e == "string" || typeof e == "number" ? e : String(e);
}
function Hl(e, t) {
  switch (t) {
    case p.STRING:
      return e;
    case p.INT32:
    case p.FIXED32:
    case p.UINT32:
    case p.SFIXED32:
    case p.SINT32: {
      const n = Number.parseInt(e);
      if (Number.isFinite(n))
        return n;
      break;
    }
    case p.BOOL:
      switch (e) {
        case "true":
          return !0;
        case "false":
          return !1;
      }
      break;
    case p.UINT64:
    case p.FIXED64:
      try {
        return S.uParse(e);
      } catch {
      }
      break;
    default:
      try {
        return S.parse(e);
      } catch {
      }
      break;
  }
  return e;
}
function qi(e, t) {
  switch (e.scalar) {
    case p.INT64:
    case p.SFIXED64:
    case p.SINT64:
      "longAsString" in e && e.longAsString && typeof t == "string" && (t = S.parse(t));
      break;
    case p.FIXED64:
    case p.UINT64:
      "longAsString" in e && e.longAsString && typeof t == "string" && (t = S.uParse(t));
      break;
  }
  return t;
}
function Qi(e, t) {
  switch (e.scalar) {
    case p.INT64:
    case p.SFIXED64:
    case p.SINT64:
      "longAsString" in e && e.longAsString ? t = String(t) : (typeof t == "string" || typeof t == "number") && (t = S.parse(t));
      break;
    case p.FIXED64:
    case p.UINT64:
      "longAsString" in e && e.longAsString ? t = String(t) : (typeof t == "string" || typeof t == "number") && (t = S.uParse(t));
      break;
  }
  return t;
}
function Dp(e) {
  const t = {
    $typeName: "google.protobuf.Struct",
    fields: {}
  };
  if (Gt(e))
    for (const [n, r] of Object.entries(e))
      t.fields[n] = Up(r);
  return t;
}
function Ap(e) {
  const t = {};
  for (const [n, r] of Object.entries(e.fields))
    t[n] = Lp(r);
  return t;
}
function Lp(e) {
  switch (e.kind.case) {
    case "structValue":
      return Ap(e.kind.value);
    case "listValue":
      return e.kind.value.values.map(Lp);
    case "nullValue":
    case void 0:
      return null;
    default:
      return e.kind.value;
  }
}
function Up(e) {
  const t = {
    $typeName: "google.protobuf.Value",
    kind: { case: void 0 }
  };
  switch (typeof e) {
    case "number":
      t.kind = { case: "numberValue", value: e };
      break;
    case "string":
      t.kind = { case: "stringValue", value: e };
      break;
    case "boolean":
      t.kind = { case: "boolValue", value: e };
      break;
    case "object":
      if (e === null)
        t.kind = { case: "nullValue", value: 0 };
      else if (Array.isArray(e)) {
        const n = {
          $typeName: "google.protobuf.ListValue",
          values: []
        };
        if (Array.isArray(e))
          for (const r of e)
            n.values.push(Up(r));
        t.kind = {
          case: "listValue",
          value: n
        };
      } else
        t.kind = {
          case: "structValue",
          value: Dp(e)
        };
      break;
  }
  return t;
}
function eu(e) {
  const t = ON();
  let n = e.length * 3 / 4;
  e[e.length - 2] == "=" ? n -= 2 : e[e.length - 1] == "=" && (n -= 1);
  let r = new Uint8Array(n), a = 0, o = 0, s, i = 0;
  for (let u = 0; u < e.length; u++) {
    if (s = t[e.charCodeAt(u)], s === void 0)
      switch (e[u]) {
        // @ts-ignore TS7029: Fallthrough case in switch -- ignore instead of expect-error for compiler settings without noFallthroughCasesInSwitch: true
        case "=":
          o = 0;
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
    switch (o) {
      case 0:
        i = s, o = 1;
        break;
      case 1:
        r[a++] = i << 2 | (s & 48) >> 4, i = s, o = 2;
        break;
      case 2:
        r[a++] = (i & 15) << 4 | (s & 60) >> 2, i = s, o = 3;
        break;
      case 3:
        r[a++] = (i & 3) << 6 | s, o = 0;
        break;
    }
  }
  if (o == 1)
    throw Error("invalid base64 string");
  return r.subarray(0, a);
}
function Fp(e, t = "std") {
  const n = Rp(t), r = t == "std";
  let a = "", o = 0, s, i = 0;
  for (let u = 0; u < e.length; u++)
    switch (s = e[u], o) {
      case 0:
        a += n[s >> 2], i = (s & 3) << 4, o = 1;
        break;
      case 1:
        a += n[i | s >> 4], i = (s & 15) << 2, o = 2;
        break;
      case 2:
        a += n[i | s >> 6], a += n[s & 63], o = 0;
        break;
    }
  return o && (a += n[i], r && (a += "=", o == 1 && (a += "="))), a;
}
let wa, zl, _n;
function Rp(e) {
  return wa || (wa = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""), zl = wa.slice(0, -2).concat("-", "_")), e == "url" ? (
    // biome-ignore lint/style/noNonNullAssertion: TS fails to narrow down
    zl
  ) : wa;
}
function ON() {
  if (!_n) {
    _n = [];
    const e = Rp("std");
    for (let t = 0; t < e.length; t++)
      _n[e[t].charCodeAt(0)] = t;
    _n[45] = e.indexOf("+"), _n[95] = e.indexOf("/");
  }
  return _n;
}
function dr(e) {
  let t = !1;
  const n = [];
  for (let r = 0; r < e.length; r++) {
    let a = e.charAt(r);
    switch (a) {
      case "_":
        t = !0;
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
        n.push(a), t = !1;
        break;
      default:
        t && (t = !1, a = a.toUpperCase()), n.push(a);
        break;
    }
  }
  return n.join("");
}
const SN = /* @__PURE__ */ new Set([
  // names reserved by JavaScript
  "constructor",
  "toString",
  "toJSON",
  "valueOf"
]);
function pr(e) {
  return SN.has(e) ? e + "$" : e;
}
function tu(e) {
  for (const t of e.field)
    mr(t, "jsonName") || (t.jsonName = dr(t.name));
  e.nestedType.forEach(tu);
}
function kN(e, t) {
  const n = e.values.find((r) => r.name === t);
  if (!n)
    throw new Error(`cannot parse ${e} default value: ${t}`);
  return n.number;
}
function DN(e, t) {
  switch (e) {
    case p.STRING:
      return t;
    case p.BYTES: {
      const n = AN(t);
      if (n === !1)
        throw new Error(`cannot parse ${p[e]} default value: ${t}`);
      return n;
    }
    case p.INT64:
    case p.SFIXED64:
    case p.SINT64:
      return S.parse(t);
    case p.UINT64:
    case p.FIXED64:
      return S.uParse(t);
    case p.DOUBLE:
    case p.FLOAT:
      switch (t) {
        case "inf":
          return Number.POSITIVE_INFINITY;
        case "-inf":
          return Number.NEGATIVE_INFINITY;
        case "nan":
          return Number.NaN;
        default:
          return parseFloat(t);
      }
    case p.BOOL:
      return t === "true";
    case p.INT32:
    case p.UINT32:
    case p.SINT32:
    case p.FIXED32:
    case p.SFIXED32:
      return parseInt(t, 10);
  }
}
function AN(e) {
  const t = [], n = {
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
  for (; n.next(); )
    switch (n.c) {
      case "\\":
        if (n.next())
          switch (n.c) {
            case "\\":
              t.push(n.c.charCodeAt(0));
              break;
            case "b":
              t.push(8);
              break;
            case "f":
              t.push(12);
              break;
            case "n":
              t.push(10);
              break;
            case "r":
              t.push(13);
              break;
            case "t":
              t.push(9);
              break;
            case "v":
              t.push(11);
              break;
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7": {
              const r = n.c, a = n.take(2);
              if (a === !1)
                return !1;
              const o = parseInt(r + a, 8);
              if (Number.isNaN(o))
                return !1;
              t.push(o);
              break;
            }
            case "x": {
              const r = n.c, a = n.take(2);
              if (a === !1)
                return !1;
              const o = parseInt(r + a, 16);
              if (Number.isNaN(o))
                return !1;
              t.push(o);
              break;
            }
            case "u": {
              const r = n.c, a = n.take(4);
              if (a === !1)
                return !1;
              const o = parseInt(r + a, 16);
              if (Number.isNaN(o))
                return !1;
              const s = new Uint8Array(4);
              new DataView(s.buffer).setInt32(0, o, !0), t.push(s[0], s[1], s[2], s[3]);
              break;
            }
            case "U": {
              const r = n.c, a = n.take(8);
              if (a === !1)
                return !1;
              const o = S.uEnc(r + a), s = new Uint8Array(8), i = new DataView(s.buffer);
              i.setInt32(0, o.lo, !0), i.setInt32(4, o.hi, !0), t.push(s[0], s[1], s[2], s[3], s[4], s[5], s[6], s[7]);
              break;
            }
          }
        break;
      default:
        t.push(n.c.charCodeAt(0));
    }
  return new Uint8Array(t);
}
function* Hs(e) {
  switch (e.kind) {
    case "file":
      for (const t of e.messages)
        yield t, yield* Hs(t);
      yield* e.enums, yield* e.services, yield* e.extensions;
      break;
    case "message":
      for (const t of e.nestedMessages)
        yield t, yield* Hs(t);
      yield* e.nestedEnums, yield* e.nestedExtensions;
      break;
  }
}
function $p(...e) {
  const t = LN();
  if (!e.length)
    return t;
  if ("$typeName" in e[0] && e[0].$typeName == "google.protobuf.FileDescriptorSet") {
    for (const n of e[0].file)
      tc(n, t);
    return t;
  }
  if ("$typeName" in e[0]) {
    let o = function(s) {
      const i = [];
      for (const u of s.dependency) {
        if (t.getFile(u) != null || a.has(u))
          continue;
        const l = r(u);
        if (!l)
          throw new Error(`Unable to resolve ${u}, imported by ${s.name}`);
        "kind" in l ? t.addFile(l, !1, !0) : (a.add(l.name), i.push(l));
      }
      return i.concat(...i.map(o));
    };
    const n = e[0], r = e[1], a = /* @__PURE__ */ new Set();
    for (const s of [n, ...o(n)].reverse())
      tc(s, t);
  } else
    for (const n of e)
      for (const r of n.files)
        t.addFile(r);
  return t;
}
function LN() {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
  return {
    kind: "registry",
    types: e,
    extendees: t,
    [Symbol.iterator]() {
      return e.values();
    },
    get files() {
      return n.values();
    },
    addFile(r, a, o) {
      if (n.set(r.proto.name, r), !a)
        for (const s of Hs(r))
          this.add(s);
      if (o)
        for (const s of r.dependencies)
          this.addFile(s, a, o);
    },
    add(r) {
      if (r.kind == "extension") {
        let a = t.get(r.extendee.typeName);
        a || t.set(
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
      return n.get(r);
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
      var o;
      return (o = t.get(r.typeName)) === null || o === void 0 ? void 0 : o.get(a);
    },
    getService(r) {
      const a = e.get(r);
      return a?.kind == "service" ? a : void 0;
    }
  };
}
const UN = 998, FN = 999, RN = 9, br = 10, ur = 11, $N = 12, ql = 14, nu = 3, PN = 2, Ql = 1, xN = 0, ys = 1, ec = 2, VN = 3, YN = 1, MN = 2, BN = 1, Pp = {
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
function tc(e, t) {
  var n, r;
  const a = {
    kind: "file",
    proto: e,
    deprecated: (r = (n = e.options) === null || n === void 0 ? void 0 : n.deprecated) !== null && r !== void 0 ? r : !1,
    edition: jN(e),
    name: e.name.replace(/\.proto$/, ""),
    dependencies: XN(e, t),
    enums: [],
    messages: [],
    extensions: [],
    services: [],
    toString() {
      return `file ${e.name}`;
    }
  }, o = /* @__PURE__ */ new Map(), s = {
    get(i) {
      return o.get(i);
    },
    add(i) {
      var u;
      We(((u = i.proto.options) === null || u === void 0 ? void 0 : u.mapEntry) === !0), o.set(i.typeName, i);
    }
  };
  for (const i of e.enumType)
    xp(i, a, void 0, t);
  for (const i of e.messageType)
    Vp(i, a, void 0, t, s);
  for (const i of e.service)
    GN(i, a, t);
  zs(a, t);
  for (const i of o.values())
    qs(i, t, s);
  for (const i of a.messages)
    qs(i, t, s), zs(i, t);
  t.addFile(a, !0);
}
function zs(e, t) {
  switch (e.kind) {
    case "file":
      for (const n of e.proto.extension) {
        const r = Qs(n, e, t);
        e.extensions.push(r), t.add(r);
      }
      break;
    case "message":
      for (const n of e.proto.extension) {
        const r = Qs(n, e, t);
        e.nestedExtensions.push(r), t.add(r);
      }
      for (const n of e.nestedMessages)
        zs(n, t);
      break;
  }
}
function qs(e, t, n) {
  const r = e.proto.oneofDecl.map((o) => CN(o, e)), a = /* @__PURE__ */ new Set();
  for (const o of e.proto.field) {
    const s = ZN(o, r), i = Qs(o, e, t, s, n);
    e.fields.push(i), e.field[i.localName] = i, s === void 0 ? e.members.push(i) : (s.fields.push(i), a.has(s) || (a.add(s), e.members.push(s)));
  }
  for (const o of r.filter((s) => a.has(s)))
    e.oneofs.push(o);
  for (const o of e.nestedMessages)
    qs(o, t, n);
}
function xp(e, t, n, r) {
  var a, o, s, i, u;
  const l = WN(e.name, e.value), c = {
    kind: "enum",
    proto: e,
    deprecated: (o = (a = e.options) === null || a === void 0 ? void 0 : a.deprecated) !== null && o !== void 0 ? o : !1,
    file: t,
    parent: n,
    open: !0,
    name: e.name,
    typeName: Vo(e, n, t),
    value: {},
    values: [],
    sharedPrefix: l,
    toString() {
      return `enum ${this.typeName}`;
    }
  };
  c.open = QN(c), r.add(c);
  for (const m of e.value) {
    const d = m.name;
    c.values.push(
      // biome-ignore lint/suspicious/noAssignInExpressions: no
      c.value[m.number] = {
        kind: "enum_value",
        proto: m,
        deprecated: (i = (s = m.options) === null || s === void 0 ? void 0 : s.deprecated) !== null && i !== void 0 ? i : !1,
        parent: c,
        name: d,
        localName: pr(l == null ? d : d.substring(l.length)),
        number: m.number,
        toString() {
          return `enum value ${c.typeName}.${d}`;
        }
      }
    );
  }
  ((u = n?.nestedEnums) !== null && u !== void 0 ? u : t.enums).push(c);
}
function Vp(e, t, n, r, a) {
  var o, s, i, u;
  const l = {
    kind: "message",
    proto: e,
    deprecated: (s = (o = e.options) === null || o === void 0 ? void 0 : o.deprecated) !== null && s !== void 0 ? s : !1,
    file: t,
    parent: n,
    name: e.name,
    typeName: Vo(e, n, t),
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
  ((i = e.options) === null || i === void 0 ? void 0 : i.mapEntry) === !0 ? a.add(l) : (((u = n?.nestedMessages) !== null && u !== void 0 ? u : t.messages).push(l), r.add(l));
  for (const c of e.enumType)
    xp(c, t, l, r);
  for (const c of e.nestedType)
    Vp(c, t, l, r, a);
}
function GN(e, t, n) {
  var r, a;
  const o = {
    kind: "service",
    proto: e,
    deprecated: (a = (r = e.options) === null || r === void 0 ? void 0 : r.deprecated) !== null && a !== void 0 ? a : !1,
    file: t,
    name: e.name,
    typeName: Vo(e, void 0, t),
    methods: [],
    method: {},
    toString() {
      return `service ${this.typeName}`;
    }
  };
  t.services.push(o), n.add(o);
  for (const s of e.method) {
    const i = KN(s, o, n);
    o.methods.push(i), o.method[i.localName] = i;
  }
}
function KN(e, t, n) {
  var r, a, o, s;
  let i;
  e.clientStreaming && e.serverStreaming ? i = "bidi_streaming" : e.clientStreaming ? i = "client_streaming" : e.serverStreaming ? i = "server_streaming" : i = "unary";
  const u = n.getMessage(yt(e.inputType)), l = n.getMessage(yt(e.outputType));
  We(u, `invalid MethodDescriptorProto: input_type ${e.inputType} not found`), We(l, `invalid MethodDescriptorProto: output_type ${e.inputType} not found`);
  const c = e.name;
  return {
    kind: "rpc",
    proto: e,
    deprecated: (a = (r = e.options) === null || r === void 0 ? void 0 : r.deprecated) !== null && a !== void 0 ? a : !1,
    parent: t,
    name: c,
    localName: pr(c.length ? pr(c[0].toLowerCase() + c.substring(1)) : c),
    methodKind: i,
    input: u,
    output: l,
    idempotency: (s = (o = e.options) === null || o === void 0 ? void 0 : o.idempotencyLevel) !== null && s !== void 0 ? s : xN,
    toString() {
      return `rpc ${t.typeName}.${c}`;
    }
  };
}
function CN(e, t) {
  return {
    kind: "oneof",
    proto: e,
    deprecated: !1,
    parent: t,
    fields: [],
    name: e.name,
    localName: pr(dr(e.name)),
    toString() {
      return `oneof ${t.typeName}.${this.name}`;
    }
  };
}
function Qs(e, t, n, r, a) {
  var o, s, i;
  const u = a === void 0, l = {
    kind: "field",
    proto: e,
    deprecated: (s = (o = e.options) === null || o === void 0 ? void 0 : o.deprecated) !== null && s !== void 0 ? s : !1,
    name: e.name,
    number: e.number,
    scalar: void 0,
    message: void 0,
    enum: void 0,
    presence: HN(e, r, u, t),
    listKind: void 0,
    mapKind: void 0,
    mapKey: void 0,
    delimitedEncoding: void 0,
    packed: void 0,
    longAsString: !1,
    getDefaultValue: void 0
  };
  if (u) {
    const f = t.kind == "file" ? t : t.file, y = t.kind == "file" ? void 0 : t, E = Vo(e, y, f);
    l.kind = "extension", l.file = f, l.parent = y, l.oneof = void 0, l.typeName = E, l.jsonName = `[${E}]`, l.toString = () => `extension ${E}`;
    const N = n.getMessage(yt(e.extendee));
    We(N, `invalid FieldDescriptorProto: extendee ${e.extendee} not found`), l.extendee = N;
  } else {
    const f = t;
    We(f.kind == "message"), l.parent = f, l.oneof = r, l.localName = r ? dr(e.name) : pr(dr(e.name)), l.jsonName = e.jsonName, l.toString = () => `field ${f.typeName}.${e.name}`;
  }
  const c = e.label, m = e.type, d = (i = e.options) === null || i === void 0 ? void 0 : i.jstype;
  if (c === nu) {
    const f = m == ur ? a?.get(yt(e.typeName)) : void 0;
    if (f) {
      l.fieldKind = "map";
      const { key: y, value: E } = qN(f);
      return l.mapKey = y.scalar, l.mapKind = E.fieldKind, l.message = E.message, l.delimitedEncoding = !1, l.enum = E.enum, l.scalar = E.scalar, l;
    }
    switch (l.fieldKind = "list", m) {
      case ur:
      case br:
        l.listKind = "message", l.message = n.getMessage(yt(e.typeName)), We(l.message), l.delimitedEncoding = nc(e, t);
        break;
      case ql:
        l.listKind = "enum", l.enum = n.getEnum(yt(e.typeName)), We(l.enum);
        break;
      default:
        l.listKind = "scalar", l.scalar = m, l.longAsString = d == Ql;
        break;
    }
    return l.packed = zN(e, t), l;
  }
  switch (m) {
    case ur:
    case br:
      l.fieldKind = "message", l.message = n.getMessage(yt(e.typeName)), We(l.message, `invalid FieldDescriptorProto: type_name ${e.typeName} not found`), l.delimitedEncoding = nc(e, t), l.getDefaultValue = () => {
      };
      break;
    case ql: {
      const f = n.getEnum(yt(e.typeName));
      We(f !== void 0, `invalid FieldDescriptorProto: type_name ${e.typeName} not found`), l.fieldKind = "enum", l.enum = n.getEnum(yt(e.typeName)), l.getDefaultValue = () => mr(e, "defaultValue") ? kN(f, e.defaultValue) : void 0;
      break;
    }
    default: {
      l.fieldKind = "scalar", l.scalar = m, l.longAsString = d == Ql, l.getDefaultValue = () => mr(e, "defaultValue") ? DN(m, e.defaultValue) : void 0;
      break;
    }
  }
  return l;
}
function jN(e) {
  switch (e.syntax) {
    case "":
    case "proto2":
      return UN;
    case "proto3":
      return FN;
    case "editions":
      if (e.edition in Pp)
        return e.edition;
      throw new Error(`${e.name}: unsupported edition`);
    default:
      throw new Error(`${e.name}: unsupported syntax "${e.syntax}"`);
  }
}
function XN(e, t) {
  return e.dependency.map((n) => {
    const r = t.getFile(n);
    if (!r)
      throw new Error(`Cannot find ${n}, imported by ${e.name}`);
    return r;
  });
}
function WN(e, t) {
  const n = JN(e) + "_";
  for (const r of t) {
    if (!r.name.toLowerCase().startsWith(n))
      return;
    const a = r.name.substring(n.length);
    if (a.length == 0 || /^\d/.test(a))
      return;
  }
  return n;
}
function JN(e) {
  return (e.substring(0, 1) + e.substring(1).replace(/[A-Z]/g, (t) => "_" + t)).toLowerCase();
}
function Vo(e, t, n) {
  let r;
  return t ? r = `${t.typeName}.${e.name}` : n.proto.package.length > 0 ? r = `${n.proto.package}.${e.name}` : r = `${e.name}`, r;
}
function yt(e) {
  return e.startsWith(".") ? e.substring(1) : e;
}
function ZN(e, t) {
  if (!mr(e, "oneofIndex") || e.proto3Optional)
    return;
  const n = t[e.oneofIndex];
  return We(n, `invalid FieldDescriptorProto: oneof #${e.oneofIndex} for field #${e.number} not found`), n;
}
function HN(e, t, n, r) {
  if (e.label == PN)
    return VN;
  if (e.label == nu)
    return ec;
  if (t || e.proto3Optional || n)
    return ys;
  const a = xn("fieldPresence", { proto: e, parent: r });
  return a == ec && (e.type == ur || e.type == br) ? ys : a;
}
function zN(e, t) {
  if (e.label != nu)
    return !1;
  switch (e.type) {
    case RN:
    case $N:
    case br:
    case ur:
      return !1;
  }
  const n = e.options;
  return n && mr(n, "packed") ? n.packed : YN == xn("repeatedFieldEncoding", {
    proto: e,
    parent: t
  });
}
function qN(e) {
  const t = e.fields.find((r) => r.number === 1), n = e.fields.find((r) => r.number === 2);
  return We(t && t.fieldKind == "scalar" && t.scalar != p.BYTES && t.scalar != p.FLOAT && t.scalar != p.DOUBLE && n && n.fieldKind != "list" && n.fieldKind != "map"), { key: t, value: n };
}
function QN(e) {
  var t;
  return BN == xn("enumType", {
    proto: e.proto,
    parent: (t = e.parent) !== null && t !== void 0 ? t : e.file
  });
}
function nc(e, t) {
  return e.type == br ? !0 : MN == xn("messageEncoding", {
    proto: e,
    parent: t
  });
}
function xn(e, t) {
  var n, r;
  const a = (n = t.proto.options) === null || n === void 0 ? void 0 : n.features;
  if (a) {
    const o = a[e];
    if (o != 0)
      return o;
  }
  if ("kind" in t) {
    if (t.kind == "message")
      return xn(e, (r = t.parent) !== null && r !== void 0 ? r : t.file);
    const o = Pp[t.edition];
    if (!o)
      throw new Error(`feature default for edition ${t.edition} not found`);
    return o[e];
  }
  return xn(e, t.parent);
}
function We(e, t) {
  if (!e)
    throw new Error(t);
}
function e0(e) {
  const t = t0(e);
  return t.messageType.forEach(tu), $p(t, () => {
  }).getFile(t.name);
}
function t0(e) {
  return Object.assign(/* @__PURE__ */ Object.create({
    syntax: "",
    edition: 0
  }), Object.assign(Object.assign({ $typeName: "google.protobuf.FileDescriptorProto", dependency: [], publicDependency: [], weakDependency: [], optionDependency: [], service: [], extension: [] }, e), { messageType: e.messageType.map(Yp), enumType: e.enumType.map(Mp) }));
}
function Yp(e) {
  var t, n, r, a, o, s, i, u;
  return Object.assign(/* @__PURE__ */ Object.create({
    visibility: 0
  }), {
    $typeName: "google.protobuf.DescriptorProto",
    name: e.name,
    field: (n = (t = e.field) === null || t === void 0 ? void 0 : t.map(n0)) !== null && n !== void 0 ? n : [],
    extension: [],
    nestedType: (a = (r = e.nestedType) === null || r === void 0 ? void 0 : r.map(Yp)) !== null && a !== void 0 ? a : [],
    enumType: (s = (o = e.enumType) === null || o === void 0 ? void 0 : o.map(Mp)) !== null && s !== void 0 ? s : [],
    extensionRange: (u = (i = e.extensionRange) === null || i === void 0 ? void 0 : i.map((c) => Object.assign({ $typeName: "google.protobuf.DescriptorProto.ExtensionRange" }, c))) !== null && u !== void 0 ? u : [],
    oneofDecl: [],
    reservedRange: [],
    reservedName: []
  });
}
function n0(e) {
  return Object.assign(/* @__PURE__ */ Object.create({
    label: 1,
    typeName: "",
    extendee: "",
    defaultValue: "",
    oneofIndex: 0,
    jsonName: "",
    proto3Optional: !1
  }), Object.assign(Object.assign({ $typeName: "google.protobuf.FieldDescriptorProto" }, e), { options: e.options ? r0(e.options) : void 0 }));
}
function r0(e) {
  var t, n, r;
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
  }), Object.assign(Object.assign({ $typeName: "google.protobuf.FieldOptions" }, e), { targets: (t = e.targets) !== null && t !== void 0 ? t : [], editionDefaults: (r = (n = e.editionDefaults) === null || n === void 0 ? void 0 : n.map((o) => Object.assign({ $typeName: "google.protobuf.FieldOptions.EditionDefault" }, o))) !== null && r !== void 0 ? r : [], uninterpretedOption: [] }));
}
function Mp(e) {
  return Object.assign(/* @__PURE__ */ Object.create({
    visibility: 0
  }), {
    $typeName: "google.protobuf.EnumDescriptorProto",
    name: e.name,
    reservedName: [],
    reservedRange: [],
    value: e.value.map((n) => Object.assign({ $typeName: "google.protobuf.EnumValueDescriptorProto" }, n))
  });
}
function Hr(e, t, ...n) {
  return n.reduce((r, a) => r.nestedMessages[a], e.messages[t]);
}
const a0 = /* @__PURE__ */ e0({ name: "google/protobuf/descriptor.proto", package: "google.protobuf", messageType: [{ name: "FileDescriptorSet", field: [{ name: "file", number: 1, type: 11, label: 3, typeName: ".google.protobuf.FileDescriptorProto" }], extensionRange: [{ start: 536e6, end: 536000001 }] }, { name: "FileDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "package", number: 2, type: 9, label: 1 }, { name: "dependency", number: 3, type: 9, label: 3 }, { name: "public_dependency", number: 10, type: 5, label: 3 }, { name: "weak_dependency", number: 11, type: 5, label: 3 }, { name: "option_dependency", number: 15, type: 9, label: 3 }, { name: "message_type", number: 4, type: 11, label: 3, typeName: ".google.protobuf.DescriptorProto" }, { name: "enum_type", number: 5, type: 11, label: 3, typeName: ".google.protobuf.EnumDescriptorProto" }, { name: "service", number: 6, type: 11, label: 3, typeName: ".google.protobuf.ServiceDescriptorProto" }, { name: "extension", number: 7, type: 11, label: 3, typeName: ".google.protobuf.FieldDescriptorProto" }, { name: "options", number: 8, type: 11, label: 1, typeName: ".google.protobuf.FileOptions" }, { name: "source_code_info", number: 9, type: 11, label: 1, typeName: ".google.protobuf.SourceCodeInfo" }, { name: "syntax", number: 12, type: 9, label: 1 }, { name: "edition", number: 14, type: 14, label: 1, typeName: ".google.protobuf.Edition" }] }, { name: "DescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "field", number: 2, type: 11, label: 3, typeName: ".google.protobuf.FieldDescriptorProto" }, { name: "extension", number: 6, type: 11, label: 3, typeName: ".google.protobuf.FieldDescriptorProto" }, { name: "nested_type", number: 3, type: 11, label: 3, typeName: ".google.protobuf.DescriptorProto" }, { name: "enum_type", number: 4, type: 11, label: 3, typeName: ".google.protobuf.EnumDescriptorProto" }, { name: "extension_range", number: 5, type: 11, label: 3, typeName: ".google.protobuf.DescriptorProto.ExtensionRange" }, { name: "oneof_decl", number: 8, type: 11, label: 3, typeName: ".google.protobuf.OneofDescriptorProto" }, { name: "options", number: 7, type: 11, label: 1, typeName: ".google.protobuf.MessageOptions" }, { name: "reserved_range", number: 9, type: 11, label: 3, typeName: ".google.protobuf.DescriptorProto.ReservedRange" }, { name: "reserved_name", number: 10, type: 9, label: 3 }, { name: "visibility", number: 11, type: 14, label: 1, typeName: ".google.protobuf.SymbolVisibility" }], nestedType: [{ name: "ExtensionRange", field: [{ name: "start", number: 1, type: 5, label: 1 }, { name: "end", number: 2, type: 5, label: 1 }, { name: "options", number: 3, type: 11, label: 1, typeName: ".google.protobuf.ExtensionRangeOptions" }] }, { name: "ReservedRange", field: [{ name: "start", number: 1, type: 5, label: 1 }, { name: "end", number: 2, type: 5, label: 1 }] }] }, { name: "ExtensionRangeOptions", field: [{ name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }, { name: "declaration", number: 2, type: 11, label: 3, typeName: ".google.protobuf.ExtensionRangeOptions.Declaration", options: { retention: 2 } }, { name: "features", number: 50, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "verification", number: 3, type: 14, label: 1, typeName: ".google.protobuf.ExtensionRangeOptions.VerificationState", defaultValue: "UNVERIFIED", options: { retention: 2 } }], nestedType: [{ name: "Declaration", field: [{ name: "number", number: 1, type: 5, label: 1 }, { name: "full_name", number: 2, type: 9, label: 1 }, { name: "type", number: 3, type: 9, label: 1 }, { name: "reserved", number: 5, type: 8, label: 1 }, { name: "repeated", number: 6, type: 8, label: 1 }] }], enumType: [{ name: "VerificationState", value: [{ name: "DECLARATION", number: 0 }, { name: "UNVERIFIED", number: 1 }] }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "FieldDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "number", number: 3, type: 5, label: 1 }, { name: "label", number: 4, type: 14, label: 1, typeName: ".google.protobuf.FieldDescriptorProto.Label" }, { name: "type", number: 5, type: 14, label: 1, typeName: ".google.protobuf.FieldDescriptorProto.Type" }, { name: "type_name", number: 6, type: 9, label: 1 }, { name: "extendee", number: 2, type: 9, label: 1 }, { name: "default_value", number: 7, type: 9, label: 1 }, { name: "oneof_index", number: 9, type: 5, label: 1 }, { name: "json_name", number: 10, type: 9, label: 1 }, { name: "options", number: 8, type: 11, label: 1, typeName: ".google.protobuf.FieldOptions" }, { name: "proto3_optional", number: 17, type: 8, label: 1 }], enumType: [{ name: "Type", value: [{ name: "TYPE_DOUBLE", number: 1 }, { name: "TYPE_FLOAT", number: 2 }, { name: "TYPE_INT64", number: 3 }, { name: "TYPE_UINT64", number: 4 }, { name: "TYPE_INT32", number: 5 }, { name: "TYPE_FIXED64", number: 6 }, { name: "TYPE_FIXED32", number: 7 }, { name: "TYPE_BOOL", number: 8 }, { name: "TYPE_STRING", number: 9 }, { name: "TYPE_GROUP", number: 10 }, { name: "TYPE_MESSAGE", number: 11 }, { name: "TYPE_BYTES", number: 12 }, { name: "TYPE_UINT32", number: 13 }, { name: "TYPE_ENUM", number: 14 }, { name: "TYPE_SFIXED32", number: 15 }, { name: "TYPE_SFIXED64", number: 16 }, { name: "TYPE_SINT32", number: 17 }, { name: "TYPE_SINT64", number: 18 }] }, { name: "Label", value: [{ name: "LABEL_OPTIONAL", number: 1 }, { name: "LABEL_REPEATED", number: 3 }, { name: "LABEL_REQUIRED", number: 2 }] }] }, { name: "OneofDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "options", number: 2, type: 11, label: 1, typeName: ".google.protobuf.OneofOptions" }] }, { name: "EnumDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "value", number: 2, type: 11, label: 3, typeName: ".google.protobuf.EnumValueDescriptorProto" }, { name: "options", number: 3, type: 11, label: 1, typeName: ".google.protobuf.EnumOptions" }, { name: "reserved_range", number: 4, type: 11, label: 3, typeName: ".google.protobuf.EnumDescriptorProto.EnumReservedRange" }, { name: "reserved_name", number: 5, type: 9, label: 3 }, { name: "visibility", number: 6, type: 14, label: 1, typeName: ".google.protobuf.SymbolVisibility" }], nestedType: [{ name: "EnumReservedRange", field: [{ name: "start", number: 1, type: 5, label: 1 }, { name: "end", number: 2, type: 5, label: 1 }] }] }, { name: "EnumValueDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "number", number: 2, type: 5, label: 1 }, { name: "options", number: 3, type: 11, label: 1, typeName: ".google.protobuf.EnumValueOptions" }] }, { name: "ServiceDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "method", number: 2, type: 11, label: 3, typeName: ".google.protobuf.MethodDescriptorProto" }, { name: "options", number: 3, type: 11, label: 1, typeName: ".google.protobuf.ServiceOptions" }] }, { name: "MethodDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "input_type", number: 2, type: 9, label: 1 }, { name: "output_type", number: 3, type: 9, label: 1 }, { name: "options", number: 4, type: 11, label: 1, typeName: ".google.protobuf.MethodOptions" }, { name: "client_streaming", number: 5, type: 8, label: 1, defaultValue: "false" }, { name: "server_streaming", number: 6, type: 8, label: 1, defaultValue: "false" }] }, { name: "FileOptions", field: [{ name: "java_package", number: 1, type: 9, label: 1 }, { name: "java_outer_classname", number: 8, type: 9, label: 1 }, { name: "java_multiple_files", number: 10, type: 8, label: 1, defaultValue: "false" }, { name: "java_generate_equals_and_hash", number: 20, type: 8, label: 1, options: { deprecated: !0 } }, { name: "java_string_check_utf8", number: 27, type: 8, label: 1, defaultValue: "false" }, { name: "optimize_for", number: 9, type: 14, label: 1, typeName: ".google.protobuf.FileOptions.OptimizeMode", defaultValue: "SPEED" }, { name: "go_package", number: 11, type: 9, label: 1 }, { name: "cc_generic_services", number: 16, type: 8, label: 1, defaultValue: "false" }, { name: "java_generic_services", number: 17, type: 8, label: 1, defaultValue: "false" }, { name: "py_generic_services", number: 18, type: 8, label: 1, defaultValue: "false" }, { name: "deprecated", number: 23, type: 8, label: 1, defaultValue: "false" }, { name: "cc_enable_arenas", number: 31, type: 8, label: 1, defaultValue: "true" }, { name: "objc_class_prefix", number: 36, type: 9, label: 1 }, { name: "csharp_namespace", number: 37, type: 9, label: 1 }, { name: "swift_prefix", number: 39, type: 9, label: 1 }, { name: "php_class_prefix", number: 40, type: 9, label: 1 }, { name: "php_namespace", number: 41, type: 9, label: 1 }, { name: "php_metadata_namespace", number: 44, type: 9, label: 1 }, { name: "ruby_package", number: 45, type: 9, label: 1 }, { name: "features", number: 50, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], enumType: [{ name: "OptimizeMode", value: [{ name: "SPEED", number: 1 }, { name: "CODE_SIZE", number: 2 }, { name: "LITE_RUNTIME", number: 3 }] }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "MessageOptions", field: [{ name: "message_set_wire_format", number: 1, type: 8, label: 1, defaultValue: "false" }, { name: "no_standard_descriptor_accessor", number: 2, type: 8, label: 1, defaultValue: "false" }, { name: "deprecated", number: 3, type: 8, label: 1, defaultValue: "false" }, { name: "map_entry", number: 7, type: 8, label: 1 }, { name: "deprecated_legacy_json_field_conflicts", number: 11, type: 8, label: 1, options: { deprecated: !0 } }, { name: "features", number: 12, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "FieldOptions", field: [{ name: "ctype", number: 1, type: 14, label: 1, typeName: ".google.protobuf.FieldOptions.CType", defaultValue: "STRING" }, { name: "packed", number: 2, type: 8, label: 1 }, { name: "jstype", number: 6, type: 14, label: 1, typeName: ".google.protobuf.FieldOptions.JSType", defaultValue: "JS_NORMAL" }, { name: "lazy", number: 5, type: 8, label: 1, defaultValue: "false" }, { name: "unverified_lazy", number: 15, type: 8, label: 1, defaultValue: "false" }, { name: "deprecated", number: 3, type: 8, label: 1, defaultValue: "false" }, { name: "weak", number: 10, type: 8, label: 1, defaultValue: "false", options: { deprecated: !0 } }, { name: "debug_redact", number: 16, type: 8, label: 1, defaultValue: "false" }, { name: "retention", number: 17, type: 14, label: 1, typeName: ".google.protobuf.FieldOptions.OptionRetention" }, { name: "targets", number: 19, type: 14, label: 3, typeName: ".google.protobuf.FieldOptions.OptionTargetType" }, { name: "edition_defaults", number: 20, type: 11, label: 3, typeName: ".google.protobuf.FieldOptions.EditionDefault" }, { name: "features", number: 21, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "feature_support", number: 22, type: 11, label: 1, typeName: ".google.protobuf.FieldOptions.FeatureSupport" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], nestedType: [{ name: "EditionDefault", field: [{ name: "edition", number: 3, type: 14, label: 1, typeName: ".google.protobuf.Edition" }, { name: "value", number: 2, type: 9, label: 1 }] }, { name: "FeatureSupport", field: [{ name: "edition_introduced", number: 1, type: 14, label: 1, typeName: ".google.protobuf.Edition" }, { name: "edition_deprecated", number: 2, type: 14, label: 1, typeName: ".google.protobuf.Edition" }, { name: "deprecation_warning", number: 3, type: 9, label: 1 }, { name: "edition_removed", number: 4, type: 14, label: 1, typeName: ".google.protobuf.Edition" }] }], enumType: [{ name: "CType", value: [{ name: "STRING", number: 0 }, { name: "CORD", number: 1 }, { name: "STRING_PIECE", number: 2 }] }, { name: "JSType", value: [{ name: "JS_NORMAL", number: 0 }, { name: "JS_STRING", number: 1 }, { name: "JS_NUMBER", number: 2 }] }, { name: "OptionRetention", value: [{ name: "RETENTION_UNKNOWN", number: 0 }, { name: "RETENTION_RUNTIME", number: 1 }, { name: "RETENTION_SOURCE", number: 2 }] }, { name: "OptionTargetType", value: [{ name: "TARGET_TYPE_UNKNOWN", number: 0 }, { name: "TARGET_TYPE_FILE", number: 1 }, { name: "TARGET_TYPE_EXTENSION_RANGE", number: 2 }, { name: "TARGET_TYPE_MESSAGE", number: 3 }, { name: "TARGET_TYPE_FIELD", number: 4 }, { name: "TARGET_TYPE_ONEOF", number: 5 }, { name: "TARGET_TYPE_ENUM", number: 6 }, { name: "TARGET_TYPE_ENUM_ENTRY", number: 7 }, { name: "TARGET_TYPE_SERVICE", number: 8 }, { name: "TARGET_TYPE_METHOD", number: 9 }] }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "OneofOptions", field: [{ name: "features", number: 1, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "EnumOptions", field: [{ name: "allow_alias", number: 2, type: 8, label: 1 }, { name: "deprecated", number: 3, type: 8, label: 1, defaultValue: "false" }, { name: "deprecated_legacy_json_field_conflicts", number: 6, type: 8, label: 1, options: { deprecated: !0 } }, { name: "features", number: 7, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "EnumValueOptions", field: [{ name: "deprecated", number: 1, type: 8, label: 1, defaultValue: "false" }, { name: "features", number: 2, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "debug_redact", number: 3, type: 8, label: 1, defaultValue: "false" }, { name: "feature_support", number: 4, type: 11, label: 1, typeName: ".google.protobuf.FieldOptions.FeatureSupport" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "ServiceOptions", field: [{ name: "features", number: 34, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "deprecated", number: 33, type: 8, label: 1, defaultValue: "false" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "MethodOptions", field: [{ name: "deprecated", number: 33, type: 8, label: 1, defaultValue: "false" }, { name: "idempotency_level", number: 34, type: 14, label: 1, typeName: ".google.protobuf.MethodOptions.IdempotencyLevel", defaultValue: "IDEMPOTENCY_UNKNOWN" }, { name: "features", number: 35, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], enumType: [{ name: "IdempotencyLevel", value: [{ name: "IDEMPOTENCY_UNKNOWN", number: 0 }, { name: "NO_SIDE_EFFECTS", number: 1 }, { name: "IDEMPOTENT", number: 2 }] }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "UninterpretedOption", field: [{ name: "name", number: 2, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption.NamePart" }, { name: "identifier_value", number: 3, type: 9, label: 1 }, { name: "positive_int_value", number: 4, type: 4, label: 1 }, { name: "negative_int_value", number: 5, type: 3, label: 1 }, { name: "double_value", number: 6, type: 1, label: 1 }, { name: "string_value", number: 7, type: 12, label: 1 }, { name: "aggregate_value", number: 8, type: 9, label: 1 }], nestedType: [{ name: "NamePart", field: [{ name: "name_part", number: 1, type: 9, label: 2 }, { name: "is_extension", number: 2, type: 8, label: 2 }] }] }, { name: "FeatureSet", field: [{ name: "field_presence", number: 1, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.FieldPresence", options: { retention: 1, targets: [4, 1], editionDefaults: [{ value: "EXPLICIT", edition: 900 }, { value: "IMPLICIT", edition: 999 }, { value: "EXPLICIT", edition: 1e3 }] } }, { name: "enum_type", number: 2, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.EnumType", options: { retention: 1, targets: [6, 1], editionDefaults: [{ value: "CLOSED", edition: 900 }, { value: "OPEN", edition: 999 }] } }, { name: "repeated_field_encoding", number: 3, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.RepeatedFieldEncoding", options: { retention: 1, targets: [4, 1], editionDefaults: [{ value: "EXPANDED", edition: 900 }, { value: "PACKED", edition: 999 }] } }, { name: "utf8_validation", number: 4, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.Utf8Validation", options: { retention: 1, targets: [4, 1], editionDefaults: [{ value: "NONE", edition: 900 }, { value: "VERIFY", edition: 999 }] } }, { name: "message_encoding", number: 5, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.MessageEncoding", options: { retention: 1, targets: [4, 1], editionDefaults: [{ value: "LENGTH_PREFIXED", edition: 900 }] } }, { name: "json_format", number: 6, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.JsonFormat", options: { retention: 1, targets: [3, 6, 1], editionDefaults: [{ value: "LEGACY_BEST_EFFORT", edition: 900 }, { value: "ALLOW", edition: 999 }] } }, { name: "enforce_naming_style", number: 7, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.EnforceNamingStyle", options: { retention: 2, targets: [1, 2, 3, 4, 5, 6, 7, 8, 9], editionDefaults: [{ value: "STYLE_LEGACY", edition: 900 }, { value: "STYLE2024", edition: 1001 }] } }, { name: "default_symbol_visibility", number: 8, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.VisibilityFeature.DefaultSymbolVisibility", options: { retention: 2, targets: [1], editionDefaults: [{ value: "EXPORT_ALL", edition: 900 }, { value: "EXPORT_TOP_LEVEL", edition: 1001 }] } }], nestedType: [{ name: "VisibilityFeature", enumType: [{ name: "DefaultSymbolVisibility", value: [{ name: "DEFAULT_SYMBOL_VISIBILITY_UNKNOWN", number: 0 }, { name: "EXPORT_ALL", number: 1 }, { name: "EXPORT_TOP_LEVEL", number: 2 }, { name: "LOCAL_ALL", number: 3 }, { name: "STRICT", number: 4 }] }] }], enumType: [{ name: "FieldPresence", value: [{ name: "FIELD_PRESENCE_UNKNOWN", number: 0 }, { name: "EXPLICIT", number: 1 }, { name: "IMPLICIT", number: 2 }, { name: "LEGACY_REQUIRED", number: 3 }] }, { name: "EnumType", value: [{ name: "ENUM_TYPE_UNKNOWN", number: 0 }, { name: "OPEN", number: 1 }, { name: "CLOSED", number: 2 }] }, { name: "RepeatedFieldEncoding", value: [{ name: "REPEATED_FIELD_ENCODING_UNKNOWN", number: 0 }, { name: "PACKED", number: 1 }, { name: "EXPANDED", number: 2 }] }, { name: "Utf8Validation", value: [{ name: "UTF8_VALIDATION_UNKNOWN", number: 0 }, { name: "VERIFY", number: 2 }, { name: "NONE", number: 3 }] }, { name: "MessageEncoding", value: [{ name: "MESSAGE_ENCODING_UNKNOWN", number: 0 }, { name: "LENGTH_PREFIXED", number: 1 }, { name: "DELIMITED", number: 2 }] }, { name: "JsonFormat", value: [{ name: "JSON_FORMAT_UNKNOWN", number: 0 }, { name: "ALLOW", number: 1 }, { name: "LEGACY_BEST_EFFORT", number: 2 }] }, { name: "EnforceNamingStyle", value: [{ name: "ENFORCE_NAMING_STYLE_UNKNOWN", number: 0 }, { name: "STYLE2024", number: 1 }, { name: "STYLE_LEGACY", number: 2 }] }], extensionRange: [{ start: 1e3, end: 9995 }, { start: 9995, end: 1e4 }, { start: 1e4, end: 10001 }] }, { name: "FeatureSetDefaults", field: [{ name: "defaults", number: 1, type: 11, label: 3, typeName: ".google.protobuf.FeatureSetDefaults.FeatureSetEditionDefault" }, { name: "minimum_edition", number: 4, type: 14, label: 1, typeName: ".google.protobuf.Edition" }, { name: "maximum_edition", number: 5, type: 14, label: 1, typeName: ".google.protobuf.Edition" }], nestedType: [{ name: "FeatureSetEditionDefault", field: [{ name: "edition", number: 3, type: 14, label: 1, typeName: ".google.protobuf.Edition" }, { name: "overridable_features", number: 4, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "fixed_features", number: 5, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }] }] }, { name: "SourceCodeInfo", field: [{ name: "location", number: 1, type: 11, label: 3, typeName: ".google.protobuf.SourceCodeInfo.Location" }], nestedType: [{ name: "Location", field: [{ name: "path", number: 1, type: 5, label: 3, options: { packed: !0 } }, { name: "span", number: 2, type: 5, label: 3, options: { packed: !0 } }, { name: "leading_comments", number: 3, type: 9, label: 1 }, { name: "trailing_comments", number: 4, type: 9, label: 1 }, { name: "leading_detached_comments", number: 6, type: 9, label: 3 }] }], extensionRange: [{ start: 536e6, end: 536000001 }] }, { name: "GeneratedCodeInfo", field: [{ name: "annotation", number: 1, type: 11, label: 3, typeName: ".google.protobuf.GeneratedCodeInfo.Annotation" }], nestedType: [{ name: "Annotation", field: [{ name: "path", number: 1, type: 5, label: 3, options: { packed: !0 } }, { name: "source_file", number: 2, type: 9, label: 1 }, { name: "begin", number: 3, type: 5, label: 1 }, { name: "end", number: 4, type: 5, label: 1 }, { name: "semantic", number: 5, type: 14, label: 1, typeName: ".google.protobuf.GeneratedCodeInfo.Annotation.Semantic" }], enumType: [{ name: "Semantic", value: [{ name: "NONE", number: 0 }, { name: "SET", number: 1 }, { name: "ALIAS", number: 2 }] }] }] }], enumType: [{ name: "Edition", value: [{ name: "EDITION_UNKNOWN", number: 0 }, { name: "EDITION_LEGACY", number: 900 }, { name: "EDITION_PROTO2", number: 998 }, { name: "EDITION_PROTO3", number: 999 }, { name: "EDITION_2023", number: 1e3 }, { name: "EDITION_2024", number: 1001 }, { name: "EDITION_UNSTABLE", number: 9999 }, { name: "EDITION_1_TEST_ONLY", number: 1 }, { name: "EDITION_2_TEST_ONLY", number: 2 }, { name: "EDITION_99997_TEST_ONLY", number: 99997 }, { name: "EDITION_99998_TEST_ONLY", number: 99998 }, { name: "EDITION_99999_TEST_ONLY", number: 99999 }, { name: "EDITION_MAX", number: 2147483647 }] }, { name: "SymbolVisibility", value: [{ name: "VISIBILITY_UNSET", number: 0 }, { name: "VISIBILITY_LOCAL", number: 1 }, { name: "VISIBILITY_EXPORT", number: 2 }] }] }), o0 = /* @__PURE__ */ Hr(a0, 1);
var rc;
(function(e) {
  e[e.DECLARATION = 0] = "DECLARATION", e[e.UNVERIFIED = 1] = "UNVERIFIED";
})(rc || (rc = {}));
var ac;
(function(e) {
  e[e.DOUBLE = 1] = "DOUBLE", e[e.FLOAT = 2] = "FLOAT", e[e.INT64 = 3] = "INT64", e[e.UINT64 = 4] = "UINT64", e[e.INT32 = 5] = "INT32", e[e.FIXED64 = 6] = "FIXED64", e[e.FIXED32 = 7] = "FIXED32", e[e.BOOL = 8] = "BOOL", e[e.STRING = 9] = "STRING", e[e.GROUP = 10] = "GROUP", e[e.MESSAGE = 11] = "MESSAGE", e[e.BYTES = 12] = "BYTES", e[e.UINT32 = 13] = "UINT32", e[e.ENUM = 14] = "ENUM", e[e.SFIXED32 = 15] = "SFIXED32", e[e.SFIXED64 = 16] = "SFIXED64", e[e.SINT32 = 17] = "SINT32", e[e.SINT64 = 18] = "SINT64";
})(ac || (ac = {}));
var oc;
(function(e) {
  e[e.OPTIONAL = 1] = "OPTIONAL", e[e.REPEATED = 3] = "REPEATED", e[e.REQUIRED = 2] = "REQUIRED";
})(oc || (oc = {}));
var sc;
(function(e) {
  e[e.SPEED = 1] = "SPEED", e[e.CODE_SIZE = 2] = "CODE_SIZE", e[e.LITE_RUNTIME = 3] = "LITE_RUNTIME";
})(sc || (sc = {}));
var ic;
(function(e) {
  e[e.STRING = 0] = "STRING", e[e.CORD = 1] = "CORD", e[e.STRING_PIECE = 2] = "STRING_PIECE";
})(ic || (ic = {}));
var uc;
(function(e) {
  e[e.JS_NORMAL = 0] = "JS_NORMAL", e[e.JS_STRING = 1] = "JS_STRING", e[e.JS_NUMBER = 2] = "JS_NUMBER";
})(uc || (uc = {}));
var lc;
(function(e) {
  e[e.RETENTION_UNKNOWN = 0] = "RETENTION_UNKNOWN", e[e.RETENTION_RUNTIME = 1] = "RETENTION_RUNTIME", e[e.RETENTION_SOURCE = 2] = "RETENTION_SOURCE";
})(lc || (lc = {}));
var cc;
(function(e) {
  e[e.TARGET_TYPE_UNKNOWN = 0] = "TARGET_TYPE_UNKNOWN", e[e.TARGET_TYPE_FILE = 1] = "TARGET_TYPE_FILE", e[e.TARGET_TYPE_EXTENSION_RANGE = 2] = "TARGET_TYPE_EXTENSION_RANGE", e[e.TARGET_TYPE_MESSAGE = 3] = "TARGET_TYPE_MESSAGE", e[e.TARGET_TYPE_FIELD = 4] = "TARGET_TYPE_FIELD", e[e.TARGET_TYPE_ONEOF = 5] = "TARGET_TYPE_ONEOF", e[e.TARGET_TYPE_ENUM = 6] = "TARGET_TYPE_ENUM", e[e.TARGET_TYPE_ENUM_ENTRY = 7] = "TARGET_TYPE_ENUM_ENTRY", e[e.TARGET_TYPE_SERVICE = 8] = "TARGET_TYPE_SERVICE", e[e.TARGET_TYPE_METHOD = 9] = "TARGET_TYPE_METHOD";
})(cc || (cc = {}));
var ei;
(function(e) {
  e[e.IDEMPOTENCY_UNKNOWN = 0] = "IDEMPOTENCY_UNKNOWN", e[e.NO_SIDE_EFFECTS = 1] = "NO_SIDE_EFFECTS", e[e.IDEMPOTENT = 2] = "IDEMPOTENT";
})(ei || (ei = {}));
var fc;
(function(e) {
  e[e.DEFAULT_SYMBOL_VISIBILITY_UNKNOWN = 0] = "DEFAULT_SYMBOL_VISIBILITY_UNKNOWN", e[e.EXPORT_ALL = 1] = "EXPORT_ALL", e[e.EXPORT_TOP_LEVEL = 2] = "EXPORT_TOP_LEVEL", e[e.LOCAL_ALL = 3] = "LOCAL_ALL", e[e.STRICT = 4] = "STRICT";
})(fc || (fc = {}));
var mc;
(function(e) {
  e[e.FIELD_PRESENCE_UNKNOWN = 0] = "FIELD_PRESENCE_UNKNOWN", e[e.EXPLICIT = 1] = "EXPLICIT", e[e.IMPLICIT = 2] = "IMPLICIT", e[e.LEGACY_REQUIRED = 3] = "LEGACY_REQUIRED";
})(mc || (mc = {}));
var dc;
(function(e) {
  e[e.ENUM_TYPE_UNKNOWN = 0] = "ENUM_TYPE_UNKNOWN", e[e.OPEN = 1] = "OPEN", e[e.CLOSED = 2] = "CLOSED";
})(dc || (dc = {}));
var pc;
(function(e) {
  e[e.REPEATED_FIELD_ENCODING_UNKNOWN = 0] = "REPEATED_FIELD_ENCODING_UNKNOWN", e[e.PACKED = 1] = "PACKED", e[e.EXPANDED = 2] = "EXPANDED";
})(pc || (pc = {}));
var bc;
(function(e) {
  e[e.UTF8_VALIDATION_UNKNOWN = 0] = "UTF8_VALIDATION_UNKNOWN", e[e.VERIFY = 2] = "VERIFY", e[e.NONE = 3] = "NONE";
})(bc || (bc = {}));
var gc;
(function(e) {
  e[e.MESSAGE_ENCODING_UNKNOWN = 0] = "MESSAGE_ENCODING_UNKNOWN", e[e.LENGTH_PREFIXED = 1] = "LENGTH_PREFIXED", e[e.DELIMITED = 2] = "DELIMITED";
})(gc || (gc = {}));
var hc;
(function(e) {
  e[e.JSON_FORMAT_UNKNOWN = 0] = "JSON_FORMAT_UNKNOWN", e[e.ALLOW = 1] = "ALLOW", e[e.LEGACY_BEST_EFFORT = 2] = "LEGACY_BEST_EFFORT";
})(hc || (hc = {}));
var yc;
(function(e) {
  e[e.ENFORCE_NAMING_STYLE_UNKNOWN = 0] = "ENFORCE_NAMING_STYLE_UNKNOWN", e[e.STYLE2024 = 1] = "STYLE2024", e[e.STYLE_LEGACY = 2] = "STYLE_LEGACY";
})(yc || (yc = {}));
var Ec;
(function(e) {
  e[e.NONE = 0] = "NONE", e[e.SET = 1] = "SET", e[e.ALIAS = 2] = "ALIAS";
})(Ec || (Ec = {}));
var Nc;
(function(e) {
  e[e.EDITION_UNKNOWN = 0] = "EDITION_UNKNOWN", e[e.EDITION_LEGACY = 900] = "EDITION_LEGACY", e[e.EDITION_PROTO2 = 998] = "EDITION_PROTO2", e[e.EDITION_PROTO3 = 999] = "EDITION_PROTO3", e[e.EDITION_2023 = 1e3] = "EDITION_2023", e[e.EDITION_2024 = 1001] = "EDITION_2024", e[e.EDITION_UNSTABLE = 9999] = "EDITION_UNSTABLE", e[e.EDITION_1_TEST_ONLY = 1] = "EDITION_1_TEST_ONLY", e[e.EDITION_2_TEST_ONLY = 2] = "EDITION_2_TEST_ONLY", e[e.EDITION_99997_TEST_ONLY = 99997] = "EDITION_99997_TEST_ONLY", e[e.EDITION_99998_TEST_ONLY = 99998] = "EDITION_99998_TEST_ONLY", e[e.EDITION_99999_TEST_ONLY = 99999] = "EDITION_99999_TEST_ONLY", e[e.EDITION_MAX = 2147483647] = "EDITION_MAX";
})(Nc || (Nc = {}));
var vc;
(function(e) {
  e[e.VISIBILITY_UNSET = 0] = "VISIBILITY_UNSET", e[e.VISIBILITY_LOCAL = 1] = "VISIBILITY_LOCAL", e[e.VISIBILITY_EXPORT = 2] = "VISIBILITY_EXPORT";
})(vc || (vc = {}));
const Ic = {
  readUnknownFields: !0
};
function s0(e) {
  return e ? Object.assign(Object.assign({}, Ic), e) : Ic;
}
function Yo(e, t, n) {
  const r = Ge(e, void 0, !1);
  return Bp(r, new Ji(t), s0(n), !1, t.byteLength), r.message;
}
function Bp(e, t, n, r, a) {
  var o;
  const s = r ? t.len : t.pos + a;
  let i, u;
  const l = (o = e.getUnknown()) !== null && o !== void 0 ? o : [];
  for (; t.pos < s && ([i, u] = t.tag(), !(r && u == L.EndGroup)); ) {
    const c = e.findNumber(i);
    if (!c) {
      const m = t.skip(u, i);
      n.readUnknownFields && l.push({ no: i, wireType: u, data: m });
      continue;
    }
    Gp(e, t, c, u, n);
  }
  if (r && (u != L.EndGroup || i !== a))
    throw new Error("invalid end group tag");
  l.length > 0 && e.setUnknown(l);
}
function Gp(e, t, n, r, a) {
  var o;
  switch (n.fieldKind) {
    case "scalar":
      e.set(n, Vn(t, n.scalar));
      break;
    case "enum":
      const s = Vn(t, p.INT32);
      if (n.enum.open)
        e.set(n, s);
      else if (n.enum.values.some((u) => u.number === s))
        e.set(n, s);
      else if (a.readUnknownFields) {
        const u = [];
        Zs(s, u);
        const l = (o = e.getUnknown()) !== null && o !== void 0 ? o : [];
        l.push({
          no: n.number,
          wireType: r,
          data: new Uint8Array(u)
        }), e.setUnknown(l);
      }
      break;
    case "message":
      e.set(n, ru(t, a, n, e.get(n)));
      break;
    case "list":
      u0(t, r, e.get(n), a);
      break;
    case "map":
      i0(t, e.get(n), a);
      break;
  }
}
function i0(e, t, n) {
  const r = t.field();
  let a, o;
  const s = e.uint32(), i = e.pos + s;
  for (; e.pos < i; ) {
    const [u] = e.tag();
    switch (u) {
      case 1:
        a = Vn(e, r.mapKey);
        break;
      case 2:
        switch (r.mapKind) {
          case "scalar":
            o = Vn(e, r.scalar);
            break;
          case "enum":
            o = e.int32();
            break;
          case "message":
            o = ru(e, n, r);
            break;
        }
        break;
    }
  }
  if (a === void 0 && (a = hn(r.mapKey, !1)), o === void 0)
    switch (r.mapKind) {
      case "scalar":
        o = hn(r.scalar, !1);
        break;
      case "enum":
        o = r.enum.values[0].number;
        break;
      case "message":
        o = Ge(r.message, void 0, !1);
        break;
    }
  t.set(a, o);
}
function u0(e, t, n, r) {
  var a;
  const o = n.field();
  if (o.listKind === "message") {
    n.add(ru(e, r, o));
    return;
  }
  const s = (a = o.scalar) !== null && a !== void 0 ? a : p.INT32;
  if (!(t == L.LengthDelimited && s != p.STRING && s != p.BYTES)) {
    n.add(Vn(e, s));
    return;
  }
  const u = e.uint32() + e.pos;
  for (; e.pos < u; )
    n.add(Vn(e, s));
}
function ru(e, t, n, r) {
  const a = n.delimitedEncoding, o = r ?? Ge(n.message, void 0, !1);
  return Bp(o, e, t, a, a ? n.number : e.uint32()), o;
}
function Vn(e, t) {
  switch (t) {
    case p.STRING:
      return e.string();
    case p.BOOL:
      return e.bool();
    case p.DOUBLE:
      return e.double();
    case p.FLOAT:
      return e.float();
    case p.INT32:
      return e.int32();
    case p.INT64:
      return e.int64();
    case p.UINT64:
      return e.uint64();
    case p.FIXED64:
      return e.fixed64();
    case p.BYTES:
      return e.bytes();
    case p.FIXED32:
      return e.fixed32();
    case p.SFIXED32:
      return e.sfixed32();
    case p.SFIXED64:
      return e.sfixed64();
    case p.SINT64:
      return e.sint64();
    case p.UINT32:
      return e.uint32();
    case p.SINT32:
      return e.sint32();
  }
}
function Kp(e, t) {
  var n;
  const r = Yo(o0, eu(e));
  return r.messageType.forEach(tu), r.dependency = (n = void 0) !== null && n !== void 0 ? n : [], $p(r, (o) => {
  }).getFile(r.name);
}
const l0 = /* @__PURE__ */ Kp("Chlnb29nbGUvcHJvdG9idWYvYW55LnByb3RvEg9nb29nbGUucHJvdG9idWYiJgoDQW55EhAKCHR5cGVfdXJsGAEgASgJEg0KBXZhbHVlGAIgASgMQnYKE2NvbS5nb29nbGUucHJvdG9idWZCCEFueVByb3RvUAFaLGdvb2dsZS5nb2xhbmcub3JnL3Byb3RvYnVmL3R5cGVzL2tub3duL2FueXBiogIDR1BCqgIeR29vZ2xlLlByb3RvYnVmLldlbGxLbm93blR5cGVzYgZwcm90bzM"), c0 = /* @__PURE__ */ Hr(l0, 0), f0 = 3, Tc = {
  writeUnknownFields: !0
};
function m0(e) {
  return e ? Object.assign(Object.assign({}, Tc), e) : Tc;
}
function Cp(e, t, n) {
  return no(new Tp(), m0(n), Ge(e, t)).finish();
}
function no(e, t, n) {
  var r;
  for (const a of n.sortedFields) {
    if (!n.isSet(a)) {
      if (a.presence == f0)
        throw new Error(`cannot encode ${a} to binary: required field not set`);
      continue;
    }
    jp(e, t, n, a);
  }
  if (t.writeUnknownFields)
    for (const { no: a, wireType: o, data: s } of (r = n.getUnknown()) !== null && r !== void 0 ? r : [])
      e.tag(a, o).raw(s);
  return e;
}
function jp(e, t, n, r) {
  var a;
  switch (r.fieldKind) {
    case "scalar":
    case "enum":
      ro(e, n.desc.typeName, r.name, (a = r.scalar) !== null && a !== void 0 ? a : p.INT32, r.number, n.get(r));
      break;
    case "list":
      d0(e, t, r, n.get(r));
      break;
    case "message":
      Xp(e, t, r, n.get(r));
      break;
    case "map":
      for (const [o, s] of n.get(r))
        p0(e, t, r, o, s);
      break;
  }
}
function ro(e, t, n, r, a, o) {
  Wp(e.tag(a, b0(r)), t, n, r, o);
}
function Xp(e, t, n, r) {
  n.delimitedEncoding ? no(e.tag(n.number, L.StartGroup), t, r).tag(n.number, L.EndGroup) : no(e.tag(n.number, L.LengthDelimited).fork(), t, r).join();
}
function d0(e, t, n, r) {
  var a;
  if (n.listKind == "message") {
    for (const s of r)
      Xp(e, t, n, s);
    return;
  }
  const o = (a = n.scalar) !== null && a !== void 0 ? a : p.INT32;
  if (n.packed) {
    if (!r.size)
      return;
    e.tag(n.number, L.LengthDelimited).fork();
    for (const s of r)
      Wp(e, n.parent.typeName, n.name, o, s);
    e.join();
    return;
  }
  for (const s of r)
    ro(e, n.parent.typeName, n.name, o, n.number, s);
}
function p0(e, t, n, r, a) {
  var o;
  switch (e.tag(n.number, L.LengthDelimited).fork(), ro(e, n.parent.typeName, n.name, n.mapKey, 1, r), n.mapKind) {
    case "scalar":
    case "enum":
      ro(e, n.parent.typeName, n.name, (o = n.scalar) !== null && o !== void 0 ? o : p.INT32, 2, a);
      break;
    case "message":
      no(e.tag(2, L.LengthDelimited).fork(), t, a).join();
      break;
  }
  e.join();
}
function Wp(e, t, n, r, a) {
  try {
    switch (r) {
      case p.STRING:
        e.string(a);
        break;
      case p.BOOL:
        e.bool(a);
        break;
      case p.DOUBLE:
        e.double(a);
        break;
      case p.FLOAT:
        e.float(a);
        break;
      case p.INT32:
        e.int32(a);
        break;
      case p.INT64:
        e.int64(a);
        break;
      case p.UINT64:
        e.uint64(a);
        break;
      case p.FIXED64:
        e.fixed64(a);
        break;
      case p.BYTES:
        e.bytes(a);
        break;
      case p.FIXED32:
        e.fixed32(a);
        break;
      case p.SFIXED32:
        e.sfixed32(a);
        break;
      case p.SFIXED64:
        e.sfixed64(a);
        break;
      case p.SINT64:
        e.sint64(a);
        break;
      case p.UINT32:
        e.uint32(a);
        break;
      case p.SINT32:
        e.sint32(a);
        break;
    }
  } catch (o) {
    throw o instanceof Error ? new Error(`cannot encode field ${t}.${n} to binary: ${o.message}`) : o;
  }
}
function b0(e) {
  switch (e) {
    case p.BYTES:
    case p.STRING:
      return L.LengthDelimited;
    case p.DOUBLE:
    case p.FIXED64:
    case p.SFIXED64:
      return L.Bit64;
    case p.FIXED32:
    case p.SFIXED32:
    case p.FLOAT:
      return L.Bit32;
    default:
      return L.Varint;
  }
}
function g0(e, t, n) {
  let r = !1;
  return n || (n = ze(c0), r = !0), n.value = Cp(e, t), n.typeUrl = E0(t.$typeName), r ? n : void 0;
}
function h0(e, t) {
  if (e.typeUrl === "")
    return !1;
  const n = typeof t == "string" ? t : t.typeName, r = Jp(e.typeUrl);
  return n === r;
}
function y0(e, t) {
  if (e.typeUrl === "")
    return;
  const n = t.kind == "message" ? t : t.getMessage(Jp(e.typeUrl));
  if (!(!n || !h0(e, n)))
    return Yo(n, e.value);
}
function E0(e) {
  return `type.googleapis.com/${e}`;
}
function Jp(e) {
  const t = e.lastIndexOf("/"), n = t >= 0 ? e.substring(t + 1) : e;
  if (!n.length)
    throw new Error(`invalid type url: ${e}`);
  return n;
}
const au = /* @__PURE__ */ Kp("Chxnb29nbGUvcHJvdG9idWYvc3RydWN0LnByb3RvEg9nb29nbGUucHJvdG9idWYihAEKBlN0cnVjdBIzCgZmaWVsZHMYASADKAsyIy5nb29nbGUucHJvdG9idWYuU3RydWN0LkZpZWxkc0VudHJ5GkUKC0ZpZWxkc0VudHJ5EgsKA2tleRgBIAEoCRIlCgV2YWx1ZRgCIAEoCzIWLmdvb2dsZS5wcm90b2J1Zi5WYWx1ZToCOAEi6gEKBVZhbHVlEjAKCm51bGxfdmFsdWUYASABKA4yGi5nb29nbGUucHJvdG9idWYuTnVsbFZhbHVlSAASFgoMbnVtYmVyX3ZhbHVlGAIgASgBSAASFgoMc3RyaW5nX3ZhbHVlGAMgASgJSAASFAoKYm9vbF92YWx1ZRgEIAEoCEgAEi8KDHN0cnVjdF92YWx1ZRgFIAEoCzIXLmdvb2dsZS5wcm90b2J1Zi5TdHJ1Y3RIABIwCgpsaXN0X3ZhbHVlGAYgASgLMhouZ29vZ2xlLnByb3RvYnVmLkxpc3RWYWx1ZUgAQgYKBGtpbmQiMwoJTGlzdFZhbHVlEiYKBnZhbHVlcxgBIAMoCzIWLmdvb2dsZS5wcm90b2J1Zi5WYWx1ZSobCglOdWxsVmFsdWUSDgoKTlVMTF9WQUxVRRAAQn8KE2NvbS5nb29nbGUucHJvdG9idWZCC1N0cnVjdFByb3RvUAFaL2dvb2dsZS5nb2xhbmcub3JnL3Byb3RvYnVmL3R5cGVzL2tub3duL3N0cnVjdHBi+AEBogIDR1BCqgIeR29vZ2xlLlByb3RvYnVmLldlbGxLbm93blR5cGVzYgZwcm90bzM"), N0 = /* @__PURE__ */ Hr(au, 0), Zp = /* @__PURE__ */ Hr(au, 1), v0 = /* @__PURE__ */ Hr(au, 2);
var ti;
(function(e) {
  e[e.NULL_VALUE = 0] = "NULL_VALUE";
})(ti || (ti = {}));
function I0(e, t) {
  Hp(t, e);
  const n = w0(e.$unknown, t), [r, a, o] = Mo(t);
  for (const s of n)
    Gp(r, new Ji(s.data), a, s.wireType, {
      readUnknownFields: !0
    });
  return o();
}
function T0(e, t, n) {
  var r;
  Hp(t, e);
  const a = ((r = e.$unknown) !== null && r !== void 0 ? r : []).filter((l) => l.no !== t.number), [o, s] = Mo(t, n), i = new Tp();
  jp(i, { writeUnknownFields: !0 }, o, s);
  const u = new Ji(i.finish());
  for (; u.pos < u.len; ) {
    const [l, c] = u.tag(), m = u.skip(c, l);
    a.push({ no: l, wireType: c, data: m });
  }
  e.$unknown = a;
}
function w0(e, t) {
  if (e === void 0)
    return [];
  if (t.fieldKind === "enum" || t.fieldKind === "scalar") {
    for (let n = e.length - 1; n >= 0; --n)
      if (e[n].no == t.number)
        return [e[n]];
    return [];
  }
  return e.filter((n) => n.no === t.number);
}
function Mo(e, t) {
  const n = e.typeName, r = Object.assign(Object.assign({}, e), { kind: "field", parent: e.extendee, localName: n }), a = Object.assign(Object.assign({}, e.extendee), { fields: [r], members: [r], oneofs: [] }), o = ze(a, t !== void 0 ? { [n]: t } : void 0);
  return [
    Ge(a, o),
    r,
    () => {
      const s = o[n];
      if (s === void 0) {
        const i = e.message;
        return Zr(i) ? hn(i.fields[0].scalar, i.fields[0].longAsString) : ze(i);
      }
      return s;
    }
  ];
}
function Hp(e, t) {
  if (e.extendee.typeName != t.$typeName)
    throw new Error(`extension ${e.typeName} can only be applied to message ${e.extendee.typeName}`);
}
const _0 = 3, O0 = 2, wc = {
  alwaysEmitImplicit: !1,
  enumAsInteger: !1,
  useProtoFieldName: !1
};
function S0(e) {
  return e ? Object.assign(Object.assign({}, wc), e) : wc;
}
function k0(e, t, n) {
  return zr(Ge(e, t), S0(n));
}
function D0(e, t, n) {
  var r;
  const a = k0(e, t, n);
  return JSON.stringify(a, null, (r = n?.prettySpaces) !== null && r !== void 0 ? r : 0);
}
function zr(e, t) {
  var n;
  const r = F0(e, t);
  if (r !== void 0)
    return r;
  const a = {};
  for (const o of e.sortedFields) {
    if (!e.isSet(o)) {
      if (o.presence == _0)
        throw new Error(`cannot encode ${o} to JSON: required field not set`);
      if (!t.alwaysEmitImplicit || o.presence !== O0)
        continue;
    }
    const s = _c(o, e.get(o), t);
    s !== void 0 && (a[U0(o, t)] = s);
  }
  if (t.registry) {
    const o = /* @__PURE__ */ new Set();
    for (const { no: s } of (n = e.getUnknown()) !== null && n !== void 0 ? n : [])
      if (!o.has(s)) {
        o.add(s);
        const i = t.registry.getExtensionFor(e.desc, s);
        if (!i)
          continue;
        const u = I0(e.message, i), [l, c] = Mo(i, u), m = _c(c, l.get(c), t);
        m !== void 0 && (a[i.jsonName] = m);
      }
  }
  return a;
}
function _c(e, t, n) {
  switch (e.fieldKind) {
    case "scalar":
      return Bo(e, t);
    case "message":
      return zr(t, n);
    case "enum":
      return ou(e.enum, t, n.enumAsInteger);
    case "list":
      return L0(t, n);
    case "map":
      return A0(t, n);
  }
}
function A0(e, t) {
  const n = e.field(), r = {};
  switch (n.mapKind) {
    case "scalar":
      for (const [a, o] of e)
        r[a] = Bo(n, o);
      break;
    case "message":
      for (const [a, o] of e)
        r[a] = zr(o, t);
      break;
    case "enum":
      for (const [a, o] of e)
        r[a] = ou(n.enum, o, t.enumAsInteger);
      break;
  }
  return t.alwaysEmitImplicit || e.size > 0 ? r : void 0;
}
function L0(e, t) {
  const n = e.field(), r = [];
  switch (n.listKind) {
    case "scalar":
      for (const a of e)
        r.push(Bo(n, a));
      break;
    case "enum":
      for (const a of e)
        r.push(ou(n.enum, a, t.enumAsInteger));
      break;
    case "message":
      for (const a of e)
        r.push(zr(a, t));
      break;
  }
  return t.alwaysEmitImplicit || r.length > 0 ? r : void 0;
}
function ou(e, t, n) {
  var r;
  if (typeof t != "number")
    throw new Error(`cannot encode ${e} to JSON: expected number, got ${j(t)}`);
  if (e.typeName == "google.protobuf.NullValue")
    return null;
  if (n)
    return t;
  const a = e.value[t];
  return (r = a?.name) !== null && r !== void 0 ? r : t;
}
function Bo(e, t) {
  var n, r, a, o, s, i;
  switch (e.scalar) {
    // int32, fixed32, uint32: JSON value will be a decimal number. Either numbers or strings are accepted.
    case p.INT32:
    case p.SFIXED32:
    case p.SINT32:
    case p.FIXED32:
    case p.UINT32:
      if (typeof t != "number")
        throw new Error(`cannot encode ${e} to JSON: ${(n = Xt(e, t)) === null || n === void 0 ? void 0 : n.message}`);
      return t;
    // float, double: JSON value will be a number or one of the special string values "NaN", "Infinity", and "-Infinity".
    // Either numbers or strings are accepted. Exponent notation is also accepted.
    case p.FLOAT:
    case p.DOUBLE:
      if (typeof t != "number")
        throw new Error(`cannot encode ${e} to JSON: ${(r = Xt(e, t)) === null || r === void 0 ? void 0 : r.message}`);
      return Number.isNaN(t) ? "NaN" : t === Number.POSITIVE_INFINITY ? "Infinity" : t === Number.NEGATIVE_INFINITY ? "-Infinity" : t;
    // string:
    case p.STRING:
      if (typeof t != "string")
        throw new Error(`cannot encode ${e} to JSON: ${(a = Xt(e, t)) === null || a === void 0 ? void 0 : a.message}`);
      return t;
    // bool:
    case p.BOOL:
      if (typeof t != "boolean")
        throw new Error(`cannot encode ${e} to JSON: ${(o = Xt(e, t)) === null || o === void 0 ? void 0 : o.message}`);
      return t;
    // JSON value will be a decimal string. Either numbers or strings are accepted.
    case p.UINT64:
    case p.FIXED64:
    case p.INT64:
    case p.SFIXED64:
    case p.SINT64:
      if (typeof t != "bigint" && typeof t != "string")
        throw new Error(`cannot encode ${e} to JSON: ${(s = Xt(e, t)) === null || s === void 0 ? void 0 : s.message}`);
      return t.toString();
    // bytes: JSON value will be the data encoded as a string using standard base64 encoding with paddings.
    // Either standard or URL-safe base64 encoding with/without paddings are accepted.
    case p.BYTES:
      if (t instanceof Uint8Array)
        return Fp(t);
      throw new Error(`cannot encode ${e} to JSON: ${(i = Xt(e, t)) === null || i === void 0 ? void 0 : i.message}`);
  }
}
function U0(e, t) {
  return t.useProtoFieldName ? e.name : e.jsonName;
}
function F0(e, t) {
  if (e.desc.typeName.startsWith("google.protobuf."))
    switch (e.desc.typeName) {
      case "google.protobuf.Any":
        return R0(e.message, t);
      case "google.protobuf.Timestamp":
        return x0(e.message);
      case "google.protobuf.Duration":
        return $0(e.message);
      case "google.protobuf.FieldMask":
        return P0(e.message);
      case "google.protobuf.Struct":
        return zp(e.message);
      case "google.protobuf.Value":
        return su(e.message);
      case "google.protobuf.ListValue":
        return qp(e.message);
      default:
        if (Zr(e.desc)) {
          const n = e.desc.fields[0];
          return Bo(n, e.get(n));
        }
        return;
    }
}
function R0(e, t) {
  if (e.typeUrl === "")
    return {};
  const { registry: n } = t;
  let r, a;
  if (n && (r = y0(e, n), r && (a = n.getMessage(r.$typeName))), !a || !r)
    throw new Error(`cannot encode message ${e.$typeName} to JSON: "${e.typeUrl}" is not in the type registry`);
  let o = zr(Ge(a, r), t);
  return (a.typeName.startsWith("google.protobuf.") || o === null || Array.isArray(o) || typeof o != "object") && (o = { value: o }), o["@type"] = e.typeUrl, o;
}
function $0(e) {
  const t = Number(e.seconds), n = e.nanos;
  if (t > 315576e6 || t < -315576e6)
    throw new Error(`cannot encode message ${e.$typeName} to JSON: value out of range`);
  if (t > 0 && n < 0 || t < 0 && n > 0)
    throw new Error(`cannot encode message ${e.$typeName} to JSON: nanos sign must match seconds sign`);
  let r = e.seconds.toString();
  if (n !== 0) {
    let a = Math.abs(n).toString();
    a = "0".repeat(9 - a.length) + a, a.substring(3) === "000000" ? a = a.substring(0, 3) : a.substring(6) === "000" && (a = a.substring(0, 6)), r += "." + a, n < 0 && t == 0 && (r = "-" + r);
  }
  return r + "s";
}
function P0(e) {
  return e.paths.map((t) => {
    if (t.match(/_[0-9]?_/g) || t.match(/[A-Z]/g))
      throw new Error(`cannot encode message ${e.$typeName} to JSON: lowerCamelCase of path name "` + t + '" is irreversible');
    return dr(t);
  }).join(",");
}
function zp(e) {
  const t = {};
  for (const [n, r] of Object.entries(e.fields))
    t[n] = su(r);
  return t;
}
function su(e) {
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
      return zp(e.kind.value);
    case "listValue":
      return qp(e.kind.value);
    default:
      throw new Error(`${e.$typeName} must have a value`);
  }
}
function qp(e) {
  return e.values.map(su);
}
function x0(e) {
  const t = Number(e.seconds) * 1e3;
  if (t < Date.parse("0001-01-01T00:00:00Z") || t > Date.parse("9999-12-31T23:59:59Z"))
    throw new Error(`cannot encode message ${e.$typeName} to JSON: must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive`);
  if (e.nanos < 0)
    throw new Error(`cannot encode message ${e.$typeName} to JSON: nanos must not be negative`);
  if (e.nanos > 999999999)
    throw new Error(`cannot encode message ${e.$typeName} to JSON: nanos must not be greater than 99999999`);
  let n = "Z";
  if (e.nanos > 0) {
    const r = (e.nanos + 1e9).toString().substring(1);
    r.substring(3) === "000000" ? n = "." + r.substring(0, 3) + "Z" : r.substring(6) === "000" ? n = "." + r.substring(0, 6) + "Z" : n = "." + r + "Z";
  }
  return new Date(t).toISOString().replace(".000Z", n);
}
const Oc = {
  ignoreUnknownFields: !1
};
function V0(e) {
  return e ? Object.assign(Object.assign({}, Oc), e) : Oc;
}
function Y0(e, t, n) {
  return Qp(e, X0(t, e.typeName), n);
}
function Qp(e, t, n) {
  const r = Ge(e);
  try {
    Yn(r, t, V0(n));
  } catch (a) {
    throw EN(a) ? new Error(`cannot decode ${a.field()} from JSON: ${a.message}`, {
      cause: a
    }) : a;
  }
  return r.message;
}
function Yn(e, t, n) {
  var r;
  if (W0(e, t, n))
    return;
  if (t == null || Array.isArray(t) || typeof t != "object")
    throw new Error(`cannot decode ${e.desc} from JSON: ${j(t)}`);
  const a = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
  for (const s of e.desc.fields)
    o.set(s.name, s).set(s.jsonName, s);
  for (const [s, i] of Object.entries(t)) {
    const u = o.get(s);
    if (u) {
      if (u.oneof) {
        if (i === null && u.fieldKind == "scalar")
          continue;
        const l = a.get(u.oneof);
        if (l !== void 0)
          throw new de(u.oneof, `oneof set multiple times by ${l.name} and ${u.name}`);
        a.set(u.oneof, u);
      }
      Sc(e, u, i, n);
    } else {
      let l;
      if (s.startsWith("[") && s.endsWith("]") && // biome-ignore lint/suspicious/noAssignInExpressions: no
      (l = (r = n.registry) === null || r === void 0 ? void 0 : r.getExtension(s.substring(1, s.length - 1))) && l.extendee.typeName === e.desc.typeName) {
        const [c, m, d] = Mo(l);
        Sc(c, m, i, n), T0(e.message, l, d());
      }
      if (!l && !n.ignoreUnknownFields)
        throw new Error(`cannot decode ${e.desc} from JSON: key "${s}" is unknown`);
    }
  }
}
function Sc(e, t, n, r) {
  switch (t.fieldKind) {
    case "scalar":
      C0(e, t, n);
      break;
    case "enum":
      K0(e, t, n, r);
      break;
    case "message":
      G0(e, t, n, r);
      break;
    case "list":
      B0(e.get(t), n, r);
      break;
    case "map":
      M0(e.get(t), n, r);
      break;
  }
}
function M0(e, t, n) {
  if (t === null)
    return;
  const r = e.field();
  if (typeof t != "object" || Array.isArray(t))
    throw new de(r, "expected object, got " + j(t));
  for (const [a, o] of Object.entries(t)) {
    if (o === null && !eb(r))
      throw new de(r, "map value must not be null");
    let s;
    switch (r.mapKind) {
      case "message":
        const u = Ge(r.message);
        Yn(u, o, n), s = u;
        break;
      case "enum":
        if (s = iu(r.enum, o, n.ignoreUnknownFields, !0), s === Go)
          return;
        break;
      case "scalar":
        s = Co(r, o, !0);
        break;
    }
    const i = j0(r.mapKey, a);
    e.set(i, s);
  }
}
function B0(e, t, n) {
  if (t === null)
    return;
  const r = e.field();
  if (!Array.isArray(t))
    throw new de(r, "expected Array, got " + j(t));
  for (const a of t) {
    if (a === null && !eb(r))
      throw new de(r, "list item must not be null");
    switch (r.listKind) {
      case "message":
        const o = Ge(r.message);
        Yn(o, a, n), e.add(o);
        break;
      case "enum":
        const s = iu(r.enum, a, n.ignoreUnknownFields, !0);
        s !== Go && e.add(s);
        break;
      case "scalar":
        e.add(Co(r, a, !0));
        break;
    }
  }
}
function eb(e) {
  var t, n;
  return ((t = e.message) === null || t === void 0 ? void 0 : t.typeName) == "google.protobuf.Value" || ((n = e.enum) === null || n === void 0 ? void 0 : n.typeName) == "google.protobuf.NullValue";
}
function G0(e, t, n, r) {
  if (n === null && t.message.typeName != "google.protobuf.Value") {
    e.clear(t);
    return;
  }
  const a = e.isSet(t) ? e.get(t) : Ge(t.message);
  Yn(a, n, r), e.set(t, a);
}
function K0(e, t, n, r) {
  const a = iu(t.enum, n, r.ignoreUnknownFields, !1);
  a === Ko ? e.clear(t) : a !== Go && e.set(t, a);
}
function C0(e, t, n) {
  const r = Co(t, n, !1);
  r === Ko ? e.clear(t) : e.set(t, r);
}
const Go = /* @__PURE__ */ Symbol();
function iu(e, t, n, r) {
  if (t === null)
    return e.typeName == "google.protobuf.NullValue" ? 0 : r ? e.values[0].number : Ko;
  switch (typeof t) {
    case "number":
      if (Number.isInteger(t))
        return t;
      break;
    case "string":
      const a = e.values.find((o) => o.name === t);
      if (a !== void 0)
        return a.number;
      if (n)
        return Go;
      break;
  }
  throw new Error(`cannot decode ${e} from JSON: ${j(t)}`);
}
const Ko = /* @__PURE__ */ Symbol();
function Co(e, t, n) {
  if (t === null)
    return n ? hn(e.scalar, !1) : Ko;
  switch (e.scalar) {
    // float, double: JSON value will be a number or one of the special string values "NaN", "Infinity", and "-Infinity".
    // Either numbers or strings are accepted. Exponent notation is also accepted.
    case p.DOUBLE:
    case p.FLOAT:
      if (t === "NaN")
        return NaN;
      if (t === "Infinity")
        return Number.POSITIVE_INFINITY;
      if (t === "-Infinity")
        return Number.NEGATIVE_INFINITY;
      if (typeof t == "number") {
        if (Number.isNaN(t))
          throw new de(e, "unexpected NaN number");
        if (!Number.isFinite(t))
          throw new de(e, "unexpected infinite number");
        break;
      }
      if (typeof t == "string") {
        if (t === "" || t.trim().length !== t.length)
          break;
        const r = Number(t);
        if (!Number.isFinite(r))
          break;
        return r;
      }
      break;
    // int32, fixed32, uint32: JSON value will be a decimal number. Either numbers or strings are accepted.
    case p.INT32:
    case p.FIXED32:
    case p.SFIXED32:
    case p.SINT32:
    case p.UINT32:
      return tb(t);
    // bytes: JSON value will be the data encoded as a string using standard base64 encoding with paddings.
    // Either standard or URL-safe base64 encoding with/without paddings are accepted.
    case p.BYTES:
      if (typeof t == "string") {
        if (t === "")
          return new Uint8Array(0);
        try {
          return eu(t);
        } catch (r) {
          const a = r instanceof Error ? r.message : String(r);
          throw new de(e, a);
        }
      }
      break;
  }
  return t;
}
function j0(e, t) {
  switch (e) {
    case p.BOOL:
      switch (t) {
        case "true":
          return !0;
        case "false":
          return !1;
      }
      return t;
    case p.INT32:
    case p.FIXED32:
    case p.UINT32:
    case p.SFIXED32:
    case p.SINT32:
      return tb(t);
    default:
      return t;
  }
}
function tb(e) {
  if (typeof e == "string") {
    if (e === "" || e.trim().length !== e.length)
      return e;
    const t = Number(e);
    return Number.isNaN(t) ? e : t;
  }
  return e;
}
function X0(e, t) {
  try {
    return JSON.parse(e);
  } catch (n) {
    const r = n instanceof Error ? n.message : String(n);
    throw new Error(
      `cannot decode message ${t} from JSON: ${r}`,
      // @ts-expect-error we use the ES2022 error CTOR option "cause" for better stack traces
      { cause: n }
    );
  }
}
function W0(e, t, n) {
  if (!e.desc.typeName.startsWith("google.protobuf."))
    return !1;
  switch (e.desc.typeName) {
    case "google.protobuf.Any":
      return J0(e.message, t, n), !0;
    case "google.protobuf.Timestamp":
      return Z0(e.message, t), !0;
    case "google.protobuf.Duration":
      return H0(e.message, t), !0;
    case "google.protobuf.FieldMask":
      return z0(e.message, t), !0;
    case "google.protobuf.Struct":
      return nb(e.message, t), !0;
    case "google.protobuf.Value":
      return uu(e.message, t), !0;
    case "google.protobuf.ListValue":
      return rb(e.message, t), !0;
    default:
      if (Zr(e.desc)) {
        const r = e.desc.fields[0];
        return t === null ? e.clear(r) : e.set(r, Co(r, t, !0)), !0;
      }
      return !1;
  }
}
function J0(e, t, n) {
  var r;
  if (t === null || Array.isArray(t) || typeof t != "object")
    throw new Error(`cannot decode message ${e.$typeName} from JSON: expected object but got ${j(t)}`);
  if (Object.keys(t).length == 0)
    return;
  const a = t["@type"];
  if (typeof a != "string" || a == "")
    throw new Error(`cannot decode message ${e.$typeName} from JSON: "@type" is empty`);
  const o = a.includes("/") ? a.substring(a.lastIndexOf("/") + 1) : a;
  if (!o.length)
    throw new Error(`cannot decode message ${e.$typeName} from JSON: "@type" is invalid`);
  const s = (r = n.registry) === null || r === void 0 ? void 0 : r.getMessage(o);
  if (!s)
    throw new Error(`cannot decode message ${e.$typeName} from JSON: ${a} is not in the type registry`);
  const i = Ge(s);
  if (o.startsWith("google.protobuf.") && Object.prototype.hasOwnProperty.call(t, "value")) {
    const u = t.value;
    Yn(i, u, n);
  } else {
    const u = Object.assign({}, t);
    delete u["@type"], Yn(i, u, n);
  }
  g0(i.desc, i.message, e);
}
function Z0(e, t) {
  if (typeof t != "string")
    throw new Error(`cannot decode message ${e.$typeName} from JSON: ${j(t)}`);
  const n = t.match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})(?:\.([0-9]{1,9}))?(?:Z|([+-][0-9][0-9]:[0-9][0-9]))$/);
  if (!n)
    throw new Error(`cannot decode message ${e.$typeName} from JSON: invalid RFC 3339 string`);
  const r = Date.parse(
    // biome-ignore format: want this to read well
    n[1] + "-" + n[2] + "-" + n[3] + "T" + n[4] + ":" + n[5] + ":" + n[6] + (n[8] ? n[8] : "Z")
  );
  if (Number.isNaN(r))
    throw new Error(`cannot decode message ${e.$typeName} from JSON: invalid RFC 3339 string`);
  if (r < Date.parse("0001-01-01T00:00:00Z") || r > Date.parse("9999-12-31T23:59:59Z"))
    throw new Error(`cannot decode message ${e.$typeName} from JSON: must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive`);
  e.seconds = S.parse(r / 1e3), e.nanos = 0, n[7] && (e.nanos = parseInt("1" + n[7] + "0".repeat(9 - n[7].length)) - 1e9);
}
function H0(e, t) {
  if (typeof t != "string")
    throw new Error(`cannot decode message ${e.$typeName} from JSON: ${j(t)}`);
  const n = t.match(/^(-?[0-9]+)(?:\.([0-9]+))?s/);
  if (n === null)
    throw new Error(`cannot decode message ${e.$typeName} from JSON: ${j(t)}`);
  const r = Number(n[1]);
  if (r > 315576e6 || r < -315576e6)
    throw new Error(`cannot decode message ${e.$typeName} from JSON: ${j(t)}`);
  if (e.seconds = S.parse(r), typeof n[2] != "string")
    return;
  const a = n[2] + "0".repeat(9 - n[2].length);
  e.nanos = parseInt(a), (r < 0 || Object.is(r, -0)) && (e.nanos = -e.nanos);
}
function z0(e, t) {
  if (typeof t != "string")
    throw new Error(`cannot decode message ${e.$typeName} from JSON: ${j(t)}`);
  if (t === "")
    return;
  function n(r) {
    if (r.includes("_"))
      throw new Error(`cannot decode message ${e.$typeName} from JSON: path names must be lowerCamelCase`);
    const a = r.replace(/[A-Z]/g, (o) => "_" + o.toLowerCase());
    return a[0] === "_" ? a.substring(1) : a;
  }
  e.paths = t.split(",").map(n);
}
function nb(e, t) {
  if (typeof t != "object" || t == null || Array.isArray(t))
    throw new Error(`cannot decode message ${e.$typeName} from JSON ${j(t)}`);
  for (const [n, r] of Object.entries(t)) {
    const a = ze(Zp);
    uu(a, r), e.fields[n] = a;
  }
}
function uu(e, t) {
  switch (typeof t) {
    case "number":
      e.kind = { case: "numberValue", value: t };
      break;
    case "string":
      e.kind = { case: "stringValue", value: t };
      break;
    case "boolean":
      e.kind = { case: "boolValue", value: t };
      break;
    case "object":
      if (t === null)
        e.kind = { case: "nullValue", value: ti.NULL_VALUE };
      else if (Array.isArray(t)) {
        const n = ze(v0);
        rb(n, t), e.kind = { case: "listValue", value: n };
      } else {
        const n = ze(N0);
        nb(n, t), e.kind = { case: "structValue", value: n };
      }
      break;
    default:
      throw new Error(`cannot decode message ${e.$typeName} from JSON ${j(t)}`);
  }
  return e;
}
function rb(e, t) {
  if (!Array.isArray(t))
    throw new Error(`cannot decode message ${e.$typeName} from JSON ${j(t)}`);
  for (const n of t) {
    const r = ze(Zp);
    uu(r, n), e.values.push(r);
  }
}
function ni(e) {
  const t = T[e];
  return typeof t != "string" ? e.toString() : t[0].toLowerCase() + t.substring(1).replace(/[A-Z]/g, (n) => "_" + n.toLowerCase());
}
let _a;
function q0(e) {
  if (!_a) {
    _a = {};
    for (const t of Object.values(T))
      typeof t != "string" && (_a[ni(t)] = t);
  }
  return _a[e];
}
class $ extends Error {
  /**
   * Create a new ConnectError.
   * If no code is provided, code "unknown" is used.
   * Outgoing details are only relevant for the server side - a service may
   * raise an error with details, and it is up to the protocol implementation
   * to encode and send the details along with the error.
   */
  constructor(t, n = T.Unknown, r, a, o) {
    super(Q0(t, n)), this.name = "ConnectError", Object.setPrototypeOf(this, new.target.prototype), this.rawMessage = t, this.code = n, this.metadata = new Headers(r ?? {}), this.details = a ?? [], this.cause = o;
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
  static from(t, n = T.Unknown) {
    return t instanceof $ ? t : t instanceof Error ? t.name == "AbortError" || t.name == "TimeoutError" ? new $(t.message, T.Canceled) : new $(t.message, n, void 0, void 0, t) : new $(String(t), n, void 0, void 0, t);
  }
  static [Symbol.hasInstance](t) {
    return t instanceof Error ? Object.getPrototypeOf(t) === $.prototype ? !0 : t.name === "ConnectError" && "code" in t && typeof t.code == "number" && "metadata" in t && "details" in t && Array.isArray(t.details) && "rawMessage" in t && typeof t.rawMessage == "string" && "cause" in t : !1;
  }
  findDetails(t) {
    const n = t.kind === "message" ? {
      getMessage: (a) => a === t.typeName ? t : void 0
    } : t, r = [];
    for (const a of this.details) {
      if ("desc" in a) {
        n.getMessage(a.desc.typeName) && r.push(ze(a.desc, a.value));
        continue;
      }
      const o = n.getMessage(a.type);
      if (o)
        try {
          r.push(Yo(o, a.value));
        } catch {
        }
    }
    return r;
  }
}
function Q0(e, t) {
  return e.length ? `[${ni(t)}] ${e}` : `[${ni(t)}]`;
}
function ev(...e) {
  const t = new Headers();
  for (const n of e)
    n.forEach((r, a) => {
      t.append(a, r);
    });
  return t;
}
function tv(e, t) {
  const n = {};
  for (const r of e.methods) {
    const a = t(r);
    a != null && (n[r.localName] = a);
  }
  return n;
}
const kc = 1;
function nv(e, t, n = !1) {
  if (t > e) {
    let r = `message size is larger than configured readMaxBytes ${e}`;
    throw n && (r = `message size ${t} is larger than configured readMaxBytes ${e}`), new $(r, T.ResourceExhausted);
  }
}
function rv(e) {
  return new av(e);
}
class av {
  constructor(t) {
    this.readMaxBytes = t, this.header = new Uint8Array(5), this.headerView = new DataView(this.header.buffer), this.buf = [];
  }
  get byteLength() {
    return this.buf.reduce((t, n) => t + n.byteLength, 0);
  }
  decode(t) {
    this.buf.push(t);
    const n = [];
    for (; ; ) {
      let r = this.pop();
      if (!r)
        break;
      n.push(r);
    }
    return n;
  }
  // consume an enveloped message
  pop() {
    if (!(!this.env && (this.env = this.head(), !this.env)) && this.cons(this.env.data)) {
      const t = this.env;
      return this.env = void 0, t;
    }
  }
  // consume header
  head() {
    if (!this.cons(this.header))
      return;
    const t = this.headerView.getUint8(0), n = this.headerView.getUint32(1);
    return nv(this.readMaxBytes, n, !0), {
      flags: t,
      data: new Uint8Array(n)
    };
  }
  // consume from buffer, fill target
  cons(t) {
    const n = t.byteLength;
    if (this.byteLength < n)
      return !1;
    let r = 0;
    for (; r < n; ) {
      const a = this.buf.shift();
      a.byteLength > n - r ? (t.set(a.subarray(0, n - r), r), this.buf.unshift(a.subarray(n - r)), r += n - r) : (t.set(a, r), r += a.byteLength);
    }
    return !0;
  }
}
function ov(e) {
  let t;
  const n = rv(4294967295);
  return new ReadableStream({
    start() {
      t = e.getReader();
    },
    async pull(r) {
      let a = !1;
      for (; !a; ) {
        const o = await t.read();
        if (o.done)
          n.byteLength > 0 && r.error(new $("protocol error: incomplete envelope", T.InvalidArgument)), r.close();
        else
          for (const s of n.decode(o.value))
            r.enqueue(s), a = !0;
      }
    }
  });
}
function sv(e, t) {
  const n = new Uint8Array(t.length + 5);
  n.set(t, 5);
  const r = new DataView(n.buffer, n.byteOffset, n.byteLength);
  return r.setUint8(0, e), r.setUint32(1, t.length), n;
}
var iv = function(e) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var t = e[Symbol.asyncIterator], n;
  return t ? t.call(e) : (e = typeof __values == "function" ? __values(e) : e[Symbol.iterator](), n = {}, r("next"), r("throw"), r("return"), n[Symbol.asyncIterator] = function() {
    return this;
  }, n);
  function r(o) {
    n[o] = e[o] && function(s) {
      return new Promise(function(i, u) {
        s = e[o](s), a(i, u, s.done, s.value);
      });
    };
  }
  function a(o, s, i, u) {
    Promise.resolve(u).then(function(l) {
      o({ value: l, done: i });
    }, s);
  }
}, gr = function(e) {
  return this instanceof gr ? (this.v = e, this) : new gr(e);
}, uv = function(e, t, n) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var r = n.apply(e, t || []), a, o = [];
  return a = Object.create((typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype), i("next"), i("throw"), i("return", s), a[Symbol.asyncIterator] = function() {
    return this;
  }, a;
  function s(f) {
    return function(y) {
      return Promise.resolve(y).then(f, m);
    };
  }
  function i(f, y) {
    r[f] && (a[f] = function(E) {
      return new Promise(function(N, v) {
        o.push([f, E, N, v]) > 1 || u(f, E);
      });
    }, y && (a[f] = y(a[f])));
  }
  function u(f, y) {
    try {
      l(r[f](y));
    } catch (E) {
      d(o[0][3], E);
    }
  }
  function l(f) {
    f.value instanceof gr ? Promise.resolve(f.value.v).then(c, m) : d(o[0][2], f);
  }
  function c(f) {
    u("next", f);
  }
  function m(f) {
    u("throw", f);
  }
  function d(f, y) {
    f(y), o.shift(), o.length && u(o[0][0], o[0][1]);
  }
}, lv = function(e) {
  var t, n;
  return t = {}, r("next"), r("throw", function(a) {
    throw a;
  }), r("return"), t[Symbol.iterator] = function() {
    return this;
  }, t;
  function r(a, o) {
    t[a] = e[a] ? function(s) {
      return (n = !n) ? { value: gr(e[a](s)), done: !1 } : o ? o(s) : s;
    } : o;
  }
};
function cv(e) {
  return uv(this, arguments, function* () {
    yield gr(yield* lv(iv(e)));
  });
}
var ab = function(e) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var t = e[Symbol.asyncIterator], n;
  return t ? t.call(e) : (e = typeof __values == "function" ? __values(e) : e[Symbol.iterator](), n = {}, r("next"), r("throw"), r("return"), n[Symbol.asyncIterator] = function() {
    return this;
  }, n);
  function r(o) {
    n[o] = e[o] && function(s) {
      return new Promise(function(i, u) {
        s = e[o](s), a(i, u, s.done, s.value);
      });
    };
  }
  function a(o, s, i, u) {
    Promise.resolve(u).then(function(l) {
      o({ value: l, done: i });
    }, s);
  }
}, Mn = function(e) {
  return this instanceof Mn ? (this.v = e, this) : new Mn(e);
}, fv = function(e) {
  var t, n;
  return t = {}, r("next"), r("throw", function(a) {
    throw a;
  }), r("return"), t[Symbol.iterator] = function() {
    return this;
  }, t;
  function r(a, o) {
    t[a] = e[a] ? function(s) {
      return (n = !n) ? { value: Mn(e[a](s)), done: !1 } : o ? o(s) : s;
    } : o;
  }
}, mv = function(e, t, n) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var r = n.apply(e, t || []), a, o = [];
  return a = Object.create((typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype), i("next"), i("throw"), i("return", s), a[Symbol.asyncIterator] = function() {
    return this;
  }, a;
  function s(f) {
    return function(y) {
      return Promise.resolve(y).then(f, m);
    };
  }
  function i(f, y) {
    r[f] && (a[f] = function(E) {
      return new Promise(function(N, v) {
        o.push([f, E, N, v]) > 1 || u(f, E);
      });
    }, y && (a[f] = y(a[f])));
  }
  function u(f, y) {
    try {
      l(r[f](y));
    } catch (E) {
      d(o[0][3], E);
    }
  }
  function l(f) {
    f.value instanceof Mn ? Promise.resolve(f.value.v).then(c, m) : d(o[0][2], f);
  }
  function c(f) {
    u("next", f);
  }
  function m(f) {
    u("throw", f);
  }
  function d(f, y) {
    f(y), o.shift(), o.length && u(o[0][0], o[0][1]);
  }
};
function dv(e, t) {
  return tv(e, (n) => {
    switch (n.methodKind) {
      case "unary":
        return pv(t, n);
      case "server_streaming":
        return bv(t, n);
      case "client_streaming":
        return gv(t, n);
      case "bidi_streaming":
        return hv(t, n);
      default:
        return null;
    }
  });
}
function pv(e, t) {
  return async (n, r) => {
    var a, o;
    const s = await e.unary(t, r?.signal, r?.timeoutMs, r?.headers, n, r?.contextValues);
    return (a = r?.onHeader) === null || a === void 0 || a.call(r, s.header), (o = r?.onTrailer) === null || o === void 0 || o.call(r, s.trailer), s.message;
  };
}
function bv(e, t) {
  return (n, r) => ob(e.stream(t, r?.signal, r?.timeoutMs, r?.headers, cv([n]), r?.contextValues), r);
}
function gv(e, t) {
  return async (n, r) => {
    var a, o, s, i, u, l;
    const c = await e.stream(t, r?.signal, r?.timeoutMs, r?.headers, n, r?.contextValues);
    (u = r?.onHeader) === null || u === void 0 || u.call(r, c.header);
    let m, d = 0;
    try {
      for (var f = !0, y = ab(c.message), E; E = await y.next(), a = E.done, !a; f = !0)
        i = E.value, f = !1, m = i, d++;
    } catch (N) {
      o = { error: N };
    } finally {
      try {
        !f && !a && (s = y.return) && await s.call(y);
      } finally {
        if (o) throw o.error;
      }
    }
    if (!m)
      throw new $("protocol error: missing response message", T.Unimplemented);
    if (d > 1)
      throw new $("protocol error: received extra messages for client streaming method", T.Unimplemented);
    return (l = r?.onTrailer) === null || l === void 0 || l.call(r, c.trailer), m;
  };
}
function hv(e, t) {
  return (n, r) => ob(e.stream(t, r?.signal, r?.timeoutMs, r?.headers, n, r?.contextValues), r);
}
function ob(e, t) {
  const n = (function() {
    return mv(this, arguments, function* () {
      var r, a;
      const o = yield Mn(e);
      (r = t?.onHeader) === null || r === void 0 || r.call(t, o.header), yield Mn(yield* fv(ab(o.message))), (a = t?.onTrailer) === null || a === void 0 || a.call(t, o.trailer);
    });
  })()[Symbol.asyncIterator]();
  return {
    [Symbol.asyncIterator]: () => ({
      next: () => n.next()
    })
  };
}
function yv(...e) {
  const t = new AbortController(), n = e.filter((a) => a !== void 0).concat(t.signal);
  for (const a of n) {
    if (a.aborted) {
      r.apply(a);
      break;
    }
    a.addEventListener("abort", r);
  }
  function r() {
    t.signal.aborted || t.abort(sb(this));
    for (const a of n)
      a.removeEventListener("abort", r);
  }
  return t;
}
function Ev(e) {
  const t = new AbortController(), n = () => {
    t.abort(new $("the operation timed out", T.DeadlineExceeded));
  };
  let r;
  return e !== void 0 && (e <= 0 ? n() : r = setTimeout(n, e)), {
    signal: t.signal,
    cleanup: () => clearTimeout(r)
  };
}
function sb(e) {
  if (!e.aborted)
    return;
  if (e.reason !== void 0)
    return e.reason;
  const t = new Error("This operation was aborted");
  return t.name = "AbortError", t;
}
function Dc() {
  return {
    get(e) {
      return e.id in this ? this[e.id] : e.defaultValue;
    },
    set(e, t) {
      return this[e.id] = t, this;
    },
    delete(e) {
      return delete this[e.id], this;
    }
  };
}
function Ac(e, t) {
  return e.toString().replace(/\/?$/, `/${t.parent.typeName}/${t.name}`);
}
function ib(e, t) {
  return ze(e, t);
}
function Nv(e, t) {
  function n(r) {
    return r.done === !0 ? r : {
      done: r.done,
      value: ib(e, r.value)
    };
  }
  return {
    [Symbol.asyncIterator]() {
      const r = t[Symbol.asyncIterator](), a = {
        next: () => r.next().then(n)
      };
      return r.throw !== void 0 && (a.throw = (o) => r.throw(o).then(n)), r.return !== void 0 && (a.return = (o) => r.return(o).then(n)), a;
    }
  };
}
function ub(e, t) {
  if (!t)
    return e;
  for (const n of t.concat().reverse())
    e = n(e);
  return e;
}
function lb(e) {
  var t;
  const n = Object.assign({}, e);
  return (t = n.ignoreUnknownFields) !== null && t !== void 0 || (n.ignoreUnknownFields = !0), n;
}
function Lc(e, t, n, r) {
  const a = t ? Uc(e.input, r) : Fc(e.input, n);
  return { parse: (t ? Uc(e.output, r) : Fc(e.output, n)).parse, serialize: a.serialize };
}
function Uc(e, t) {
  return {
    parse(n) {
      try {
        return Yo(e, n, t);
      } catch (r) {
        const a = r instanceof Error ? r.message : String(r);
        throw new $(`parse binary: ${a}`, T.Internal);
      }
    },
    serialize(n) {
      try {
        return Cp(e, n, t);
      } catch (r) {
        const a = r instanceof Error ? r.message : String(r);
        throw new $(`serialize binary: ${a}`, T.Internal);
      }
    }
  };
}
function Fc(e, t) {
  var n, r;
  const a = (n = t?.textEncoder) !== null && n !== void 0 ? n : new TextEncoder(), o = (r = t?.textDecoder) !== null && r !== void 0 ? r : new TextDecoder(), s = lb(t);
  return {
    parse(i) {
      try {
        const u = o.decode(i);
        return Y0(e, u, s);
      } catch (u) {
        throw $.from(u, T.InvalidArgument);
      }
    },
    serialize(i) {
      try {
        const u = D0(e, i, s);
        return a.encode(u);
      } catch (u) {
        throw $.from(u, T.Internal);
      }
    }
  };
}
const vv = /^application\/(connect\+)?(?:(json)(?:; ?charset=utf-?8)?|(proto))$/i, Iv = "application/proto", Tv = "application/json", wv = "application/connect+proto", _v = "application/connect+json";
function Ov(e) {
  const t = e?.match(vv);
  if (!t)
    return;
  const n = !!t[1], r = !!t[3];
  return { stream: n, binary: r };
}
function cb(e, t, n) {
  var r;
  if (t && new Headers(t).forEach((i, u) => n.metadata.append(u, i)), typeof e != "object" || e == null || Array.isArray(e))
    throw n;
  let a = n.code;
  "code" in e && typeof e.code == "string" && (a = (r = q0(e.code)) !== null && r !== void 0 ? r : a);
  const o = e.message;
  if (o != null && typeof o != "string")
    throw n;
  const s = new $(o ?? "", a, t);
  if ("details" in e && Array.isArray(e.details))
    for (const i of e.details) {
      if (i === null || typeof i != "object" || Array.isArray(i) || typeof i.type != "string" || typeof i.value != "string")
        throw n;
      try {
        s.details.push({
          type: i.type,
          value: eu(i.value),
          debug: i.debug
        });
      } catch {
        throw n;
      }
    }
  return s;
}
const Rc = 2;
function Sv(e) {
  const t = new $("invalid end stream", T.Unknown);
  let n;
  try {
    n = JSON.parse(typeof e == "string" ? e : new TextDecoder().decode(e));
  } catch {
    throw t;
  }
  if (typeof n != "object" || n == null || Array.isArray(n))
    throw t;
  const r = new Headers();
  if ("metadata" in n) {
    if (typeof n.metadata != "object" || n.metadata == null || Array.isArray(n.metadata))
      throw t;
    for (const [o, s] of Object.entries(n.metadata)) {
      if (!Array.isArray(s) || s.some((i) => typeof i != "string"))
        throw t;
      for (const i of s)
        r.append(o, i);
    }
  }
  const a = "error" in n && n.error != null ? cb(n.error, r, t) : void 0;
  return { metadata: r, error: a };
}
const ao = "Content-Type", kv = "Content-Length", $c = "Content-Encoding", Dv = "Accept-Encoding", Av = "Connect-Timeout-Ms", fb = "Connect-Protocol-Version", Lv = "User-Agent";
function Uv(e) {
  switch (e) {
    case 400:
      return T.Internal;
    case 401:
      return T.Unauthenticated;
    case 403:
      return T.PermissionDenied;
    case 404:
      return T.Unimplemented;
    case 429:
      return T.Unavailable;
    case 502:
      return T.Unavailable;
    case 503:
      return T.Unavailable;
    case 504:
      return T.Unavailable;
    default:
      return T.Unknown;
  }
}
function Pc(e) {
  const t = new Headers(), n = new Headers();
  return e.forEach((r, a) => {
    a.toLowerCase().startsWith("trailer-") ? n.append(a.substring(8), r) : t.append(a, r);
  }), [t, n];
}
const mb = "1";
function xc(e, t, n, r, a) {
  const o = new Headers(r ?? {});
  return n !== void 0 && o.set(Av, `${n}`), o.set(ao, e == "unary" ? t ? Iv : Tv : t ? wv : _v), o.set(fb, mb), o.has(Lv), o;
}
function Vc(e, t, n, r) {
  const a = r.get(ao), o = Ov(a);
  if (n !== 200) {
    const i = new $(`HTTP ${n}`, Uv(n), r);
    if (e == "unary" && o && !o.binary)
      return { isUnaryError: !0, unaryError: i };
    throw i;
  }
  const s = {
    binary: t,
    stream: e !== "unary"
  };
  if (o?.binary !== s.binary || o.stream !== s.stream)
    throw new $(`unsupported content type ${a}`, o === void 0 ? T.Unknown : T.Internal, r);
  return { isUnaryError: !1 };
}
const Yc = "application/";
function Fv(e, t) {
  return t ? Fp(e, "url") : encodeURIComponent(new TextDecoder().decode(e));
}
function Rv(e, t, n) {
  let r = `?connect=v${mb}`;
  const a = e.header.get(ao);
  a?.indexOf(Yc) === 0 && (r += "&encoding=" + encodeURIComponent(a.slice(Yc.length)));
  const o = e.header.get($c);
  o !== null && o !== "identity" && (r += "&compression=" + encodeURIComponent(o), n = !0), n && (r += "&base64=1"), r += "&message=" + Fv(t, n);
  const s = e.url + r, i = new Headers(e.header);
  for (const u of [
    fb,
    ao,
    kv,
    $c,
    Dv
  ])
    i.delete(u);
  return Object.assign(Object.assign({}, e), {
    requestMethod: "GET",
    url: s,
    header: i
  });
}
function $v(e) {
  const t = ub(e.next, e.interceptors), [n, r, a] = db(e), o = Object.assign(Object.assign({}, e.req), { message: ib(e.req.method.input, e.req.message), signal: n });
  return t(o).then((s) => (a(), s), r);
}
function Pv(e) {
  const t = ub(e.next, e.interceptors), [n, r, a] = db(e), o = Object.assign(Object.assign({}, e.req), { message: Nv(e.req.method.input, e.req.message), signal: n });
  let s = !1;
  return n.addEventListener("abort", function() {
    var i, u;
    const l = e.req.message[Symbol.asyncIterator]();
    s || (i = l.throw) === null || i === void 0 || i.call(l, this.reason).catch(() => {
    }), (u = l.return) === null || u === void 0 || u.call(l).catch(() => {
    });
  }), t(o).then((i) => Object.assign(Object.assign({}, i), { message: {
    [Symbol.asyncIterator]() {
      const u = i.message[Symbol.asyncIterator]();
      return {
        next() {
          return u.next().then((l) => (l.done == !0 && (s = !0, a()), l), r);
        }
        // We deliberately omit throw/return.
      };
    }
  } }), r);
}
function db(e) {
  const { signal: t, cleanup: n } = Ev(e.timeoutMs), r = yv(e.signal, t);
  return [
    r.signal,
    function(o) {
      const s = $.from(t.aborted ? sb(t) : o);
      return r.abort(s), n(), Promise.reject(s);
    },
    function() {
      n(), r.abort();
    }
  ];
}
function xv() {
  try {
    new Headers();
  } catch {
    throw new Error("connect-web requires the fetch API. Are you running on an old version of Node.js? Node.js is not supported in Connect for Web - please stay tuned for Connect for Node.");
  }
}
var hr = function(e) {
  return this instanceof hr ? (this.v = e, this) : new hr(e);
}, Vv = function(e, t, n) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var r = n.apply(e, t || []), a, o = [];
  return a = Object.create((typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype), i("next"), i("throw"), i("return", s), a[Symbol.asyncIterator] = function() {
    return this;
  }, a;
  function s(f) {
    return function(y) {
      return Promise.resolve(y).then(f, m);
    };
  }
  function i(f, y) {
    r[f] && (a[f] = function(E) {
      return new Promise(function(N, v) {
        o.push([f, E, N, v]) > 1 || u(f, E);
      });
    }, y && (a[f] = y(a[f])));
  }
  function u(f, y) {
    try {
      l(r[f](y));
    } catch (E) {
      d(o[0][3], E);
    }
  }
  function l(f) {
    f.value instanceof hr ? Promise.resolve(f.value.v).then(c, m) : d(o[0][2], f);
  }
  function c(f) {
    u("next", f);
  }
  function m(f) {
    u("throw", f);
  }
  function d(f, y) {
    f(y), o.shift(), o.length && u(o[0][0], o[0][1]);
  }
};
const Mc = {
  redirect: "error"
};
function Yv(e) {
  var t;
  xv();
  const n = (t = e.useBinaryFormat) !== null && t !== void 0 ? t : !1;
  return {
    async unary(r, a, o, s, i, u) {
      const { serialize: l, parse: c } = Lc(r, n, e.jsonOptions, e.binaryOptions);
      return o = o === void 0 ? e.defaultTimeoutMs : o <= 0 ? void 0 : o, await $v({
        interceptors: e.interceptors,
        signal: a,
        timeoutMs: o,
        req: {
          stream: !1,
          service: r.parent,
          method: r,
          requestMethod: "POST",
          url: Ac(e.baseUrl, r),
          header: xc(r.methodKind, n, o, s, !1),
          contextValues: u ?? Dc(),
          message: i
        },
        next: async (m) => {
          var d;
          const f = e.useHttpGet === !0 && r.idempotency === ei.NO_SIDE_EFFECTS;
          let y = null;
          f ? m = Rv(m, l(m.message), n) : y = l(m.message);
          const N = await ((d = e.fetch) !== null && d !== void 0 ? d : globalThis.fetch)(m.url, Object.assign(Object.assign({}, Mc), { method: m.requestMethod, headers: m.header, signal: m.signal, body: y })), { isUnaryError: v, unaryError: I } = Vc(r.methodKind, n, N.status, N.headers);
          if (v)
            throw cb(await N.json(), ev(...Pc(N.headers)), I);
          const [M, De] = Pc(N.headers);
          return {
            stream: !1,
            service: r.parent,
            method: r,
            header: M,
            message: n ? c(new Uint8Array(await N.arrayBuffer())) : Qp(r.output, await N.json(), lb(e.jsonOptions)),
            trailer: De
          };
        }
      });
    },
    async stream(r, a, o, s, i, u) {
      const { serialize: l, parse: c } = Lc(r, n, e.jsonOptions, e.binaryOptions);
      function m(f, y, E, N) {
        return Vv(this, arguments, function* () {
          const I = ov(f).getReader();
          let M = !1;
          for (; ; ) {
            const De = yield hr(I.read());
            if (De.done)
              break;
            const { flags: Xe, data: ae } = De.value;
            if ((Xe & kc) === kc)
              throw new $("protocol error: received unsupported compressed output", T.Internal);
            if ((Xe & Rc) === Rc) {
              M = !0;
              const C = Sv(ae);
              if (C.error) {
                const Z = C.error;
                throw E.forEach((ht, eN) => {
                  Z.metadata.append(eN, ht);
                }), Z;
              }
              C.metadata.forEach((Z, ht) => y.set(ht, Z));
              continue;
            }
            yield yield hr(c(ae));
          }
          if ("throwIfAborted" in N && N.throwIfAborted(), !M)
            throw "missing EndStreamResponse";
        });
      }
      async function d(f) {
        if (r.methodKind != "server_streaming")
          throw "The fetch API does not support streaming request bodies";
        const y = await f[Symbol.asyncIterator]().next();
        if (y.done == !0)
          throw "missing request message";
        return sv(0, l(y.value));
      }
      return o = o === void 0 ? e.defaultTimeoutMs : o <= 0 ? void 0 : o, await Pv({
        interceptors: e.interceptors,
        timeoutMs: o,
        signal: a,
        req: {
          stream: !0,
          service: r.parent,
          method: r,
          requestMethod: "POST",
          url: Ac(e.baseUrl, r),
          header: xc(r.methodKind, n, o, s, !1),
          contextValues: u ?? Dc(),
          message: i
        },
        next: async (f) => {
          var y;
          const N = await ((y = e.fetch) !== null && y !== void 0 ? y : globalThis.fetch)(f.url, Object.assign(Object.assign({}, Mc), { method: f.requestMethod, headers: f.header, signal: f.signal, body: await d(f.message) }));
          if (Vc(r.methodKind, n, N.status, N.headers), N.body === null)
            throw "missing response body";
          const v = new Headers();
          return Object.assign(Object.assign({}, f), { header: N.headers, trailer: v, message: m(N.body, v, N.headers, f.signal) });
        }
      });
    }
  };
}
const Mv = Yv({
  baseUrl: "/api",
  useBinaryFormat: !0,
  fetch: (e, t) => {
    const n = t?.headers ?? {};
    return fetch(e, {
      ...t,
      headers: {
        ...n,
        "qt-widget-id": window.qtWidgetId
      }
    });
  }
});
function eD(e) {
  return dv(e, Mv);
}
const oe = /* @__PURE__ */ Symbol(), ri = !1;
var Bv = Array.isArray, Gv = Array.prototype.indexOf, Es = Object.getOwnPropertyDescriptor, Kv = Object.prototype, Cv = Array.prototype, jv = Object.getPrototypeOf;
function Xv(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
function Wv() {
  var e, t, n = new Promise((r, a) => {
    e = r, t = a;
  });
  return { promise: n, resolve: e, reject: t };
}
const _e = 2, Jv = 4, Zv = 1 << 24, er = 16, qr = 32, Qr = 64, lu = 128, lt = 512, le = 1024, qe = 2048, ct = 4096, ja = 8192, an = 16384, Hv = 32768, Bc = 1 << 17, pb = 1 << 18, yn = 32768, ai = 1 << 21, bb = 1 << 22, yr = 1 << 23, Ns = /* @__PURE__ */ Symbol("$state"), gb = new class extends Error {
  name = "StaleReactionError";
  message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}();
function zv() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function qv() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Qv() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function e1() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function t1(e) {
  return e === this.v;
}
let n1 = !1;
function hb() {
  return !0;
}
let Dn = [];
function r1() {
  var e = Dn;
  Dn = [], Xv(e);
}
function a1(e) {
  if (Dn.length === 0) {
    var t = Dn;
    queueMicrotask(() => {
      t === Dn && r1();
    });
  }
  Dn.push(e);
}
function o1(e) {
  var t = pe;
  if (t === null)
    return P.f |= yr, e;
  if ((t.f & Hv) === 0) {
    if ((t.f & lu) === 0)
      throw e;
    t.b.error(e);
  } else
    yb(e, t);
}
function yb(e, t) {
  for (; t !== null; ) {
    if ((t.f & lu) !== 0)
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
const Oa = /* @__PURE__ */ new Set();
let H = null, Ve = null, ot = [], cu = null, oi = !1;
class Er {
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
  #t = 0;
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
  #o = /* @__PURE__ */ new Set();
  /**
   * Deferred effects that are MAYBE_DIRTY
   * @type {Set<Effect>}
   */
  #s = /* @__PURE__ */ new Set();
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
    ot = [], this.apply();
    var n = {
      parent: null,
      effect: null,
      effects: [],
      render_effects: []
    };
    for (const r of t)
      this.#u(r, n);
    this.is_fork || this.#c(), this.is_deferred() ? (this.#n(n.effects), this.#n(n.render_effects)) : (H = null, Gc(n.render_effects), Gc(n.effects), this.#i?.resolve()), Ve = null;
  }
  /**
   * Traverse the effect tree, executing effects or stashing
   * them for later execution as appropriate
   * @param {Effect} root
   * @param {EffectTarget} target
   */
  #u(t, n) {
    t.f ^= le;
    for (var r = t.first; r !== null; ) {
      var a = r.f, o = (a & (qr | Qr)) !== 0, s = o && (a & le) !== 0, i = s || (a & ja) !== 0 || this.skipped_effects.has(r);
      if ((r.f & lu) !== 0 && r.b?.is_pending() && (n = {
        parent: n,
        effect: r,
        effects: [],
        render_effects: []
      }), !i && r.fn !== null) {
        o ? r.f ^= le : (a & Jv) !== 0 ? n.effects.push(r) : ta(r) && ((r.f & er) !== 0 && this.#o.add(r), lo(r));
        var u = r.first;
        if (u !== null) {
          r = u;
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
      (n.f & qe) !== 0 ? this.#o.add(n) : (n.f & ct) !== 0 && this.#s.add(n), this.#l(n.deps), be(n, le);
  }
  /**
   * @param {Value[] | null} deps
   */
  #l(t) {
    if (t !== null)
      for (const n of t)
        (n.f & _e) === 0 || (n.f & yn) === 0 || (n.f ^= yn, this.#l(
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
    this.previous.has(t) || this.previous.set(t, n), (t.f & yr) === 0 && (this.current.set(t, t.v), Ve?.set(t, t.v));
  }
  activate() {
    H = this, this.apply();
  }
  deactivate() {
    H === this && (H = null, Ve = null);
  }
  flush() {
    if (this.activate(), ot.length > 0) {
      if (s1(), H !== null && H !== this)
        return;
    } else this.#e === 0 && this.process([]);
    this.deactivate();
  }
  discard() {
    for (const t of this.#a) t(this);
    this.#a.clear();
  }
  #c() {
    if (this.#t === 0) {
      for (const t of this.#r) t();
      this.#r.clear();
    }
    this.#e === 0 && this.#f();
  }
  #f() {
    if (Oa.size > 1) {
      this.previous.clear();
      var t = Ve, n = !0, r = {
        parent: null,
        effect: null,
        effects: [],
        render_effects: []
      };
      for (const o of Oa) {
        if (o === this) {
          n = !1;
          continue;
        }
        const s = [];
        for (const [u, l] of this.current) {
          if (o.current.has(u))
            if (n && l !== o.current.get(u))
              o.current.set(u, l);
            else
              continue;
          s.push(u);
        }
        if (s.length === 0)
          continue;
        const i = [...o.current.keys()].filter((u) => !this.current.has(u));
        if (i.length > 0) {
          var a = ot;
          ot = [];
          const u = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Map();
          for (const c of s)
            Eb(c, i, u, l);
          if (ot.length > 0) {
            H = o, o.apply();
            for (const c of ot)
              o.#u(c, r);
            o.deactivate();
          }
          ot = a;
        }
      }
      H = null, Ve = t;
    }
    this.committed = !0, Oa.delete(this);
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
    for (const t of this.#o)
      this.#s.delete(t), be(t, qe), Nr(t);
    for (const t of this.#s)
      be(t, ct), Nr(t);
    this.flush();
  }
  /** @param {() => void} fn */
  oncommit(t) {
    this.#r.add(t);
  }
  /** @param {(batch: Batch) => void} fn */
  ondiscard(t) {
    this.#a.add(t);
  }
  settled() {
    return (this.#i ??= Wv()).promise;
  }
  static ensure() {
    if (H === null) {
      const t = H = new Er();
      Oa.add(H), Er.enqueue(() => {
        H === t && t.flush();
      });
    }
    return H;
  }
  /** @param {() => void} task */
  static enqueue(t) {
    a1(t);
  }
  apply() {
  }
}
function s1() {
  var e = on;
  oi = !0;
  var t = null;
  try {
    var n = 0;
    for (so(!0); ot.length > 0; ) {
      var r = Er.ensure();
      if (n++ > 1e3) {
        var a, o;
        i1();
      }
      r.process(ot), Vt.clear();
    }
  } finally {
    oi = !1, so(e), cu = null;
  }
}
function i1() {
  try {
    zv();
  } catch (e) {
    yb(e, cu);
  }
}
let Et = null;
function Gc(e) {
  var t = e.length;
  if (t !== 0) {
    for (var n = 0; n < t; ) {
      var r = e[n++];
      if ((r.f & (an | ja)) === 0 && ta(r) && (Et = /* @__PURE__ */ new Set(), lo(r), r.deps === null && r.first === null && r.nodes === null && (r.teardown === null && r.ac === null ? kb(r) : r.fn = null), Et?.size > 0)) {
        Vt.clear();
        for (const a of Et) {
          if ((a.f & (an | ja)) !== 0) continue;
          const o = [a];
          let s = a.parent;
          for (; s !== null; )
            Et.has(s) && (Et.delete(s), o.push(s)), s = s.parent;
          for (let i = o.length - 1; i >= 0; i--) {
            const u = o[i];
            (u.f & (an | ja)) === 0 && lo(u);
          }
        }
        Et.clear();
      }
    }
    Et = null;
  }
}
function Eb(e, t, n, r) {
  if (!n.has(e) && (n.add(e), e.reactions !== null))
    for (const a of e.reactions) {
      const o = a.f;
      (o & _e) !== 0 ? Eb(
        /** @type {Derived} */
        a,
        t,
        n,
        r
      ) : (o & (bb | er)) !== 0 && (o & qe) === 0 && Nb(a, t, r) && (be(a, qe), Nr(
        /** @type {Effect} */
        a
      ));
    }
}
function Nb(e, t, n) {
  const r = n.get(e);
  if (r !== void 0) return r;
  if (e.deps !== null)
    for (const a of e.deps) {
      if (t.includes(a))
        return !0;
      if ((a.f & _e) !== 0 && Nb(
        /** @type {Derived} */
        a,
        t,
        n
      ))
        return n.set(
          /** @type {Derived} */
          a,
          !0
        ), !0;
    }
  return n.set(e, !1), !1;
}
function Nr(e) {
  for (var t = cu = e; t.parent !== null; ) {
    t = t.parent;
    var n = t.f;
    if (oi && t === pe && (n & er) !== 0 && (n & pb) === 0)
      return;
    if ((n & (Qr | qr)) !== 0) {
      if ((n & le) === 0) return;
      t.f ^= le;
    }
  }
  ot.push(t);
}
function vb(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var n = 0; n < t.length; n += 1)
      mu(
        /** @type {Effect} */
        t[n]
      );
  }
}
function u1(e) {
  for (var t = e.parent; t !== null; ) {
    if ((t.f & _e) === 0)
      return (t.f & an) === 0 ? (
        /** @type {Effect} */
        t
      ) : null;
    t = t.parent;
  }
  return null;
}
function fu(e) {
  var t, n = pe;
  io(u1(e));
  try {
    e.f &= ~yn, vb(e), t = Ub(e);
  } finally {
    io(n);
  }
  return t;
}
function Ib(e) {
  var t = fu(e);
  if (e.equals(t) || (H?.is_fork || (e.v = t), e.wv = Ab()), !ea)
    if (Ve !== null)
      (oo() || H?.is_fork) && Ve.set(e, t);
    else {
      var n = (e.f & lt) === 0 ? ct : le;
      be(e, n);
    }
}
let si = /* @__PURE__ */ new Set();
const Vt = /* @__PURE__ */ new Map();
let Tb = !1;
function l1(e, t) {
  var n = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: t1,
    rv: 0,
    wv: 0
  };
  return n;
}
// @__NO_SIDE_EFFECTS__
function Rt(e, t) {
  const n = l1(e);
  return g1(n), n;
}
function Wt(e, t, n = !1) {
  P !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!en || (P.f & Bc) !== 0) && hb() && (P.f & (_e | er | bb | Bc)) !== 0 && !At?.includes(e) && e1();
  let r = n ? An(t) : t;
  return c1(e, r);
}
function c1(e, t) {
  if (!e.equals(t)) {
    var n = e.v;
    ea ? Vt.set(e, t) : Vt.set(e, n), e.v = t;
    var r = Er.ensure();
    r.capture(e, n), (e.f & _e) !== 0 && ((e.f & qe) !== 0 && fu(
      /** @type {Derived} */
      e
    ), be(e, (e.f & lt) !== 0 ? le : ct)), e.wv = Ab(), wb(e, qe), pe !== null && (pe.f & le) !== 0 && (pe.f & (qr | Qr)) === 0 && (Re === null ? h1([e]) : Re.push(e)), !r.is_fork && si.size > 0 && !Tb && f1();
  }
  return t;
}
function f1() {
  Tb = !1;
  var e = on;
  so(!0);
  const t = Array.from(si);
  try {
    for (const n of t)
      (n.f & le) !== 0 && be(n, ct), ta(n) && lo(n);
  } finally {
    so(e);
  }
  si.clear();
}
function vs(e) {
  Wt(e, e.v + 1);
}
function wb(e, t) {
  var n = e.reactions;
  if (n !== null)
    for (var r = n.length, a = 0; a < r; a++) {
      var o = n[a], s = o.f, i = (s & qe) === 0;
      if (i && be(o, t), (s & _e) !== 0) {
        var u = (
          /** @type {Derived} */
          o
        );
        Ve?.delete(u), (s & yn) === 0 && (s & lt && (o.f |= yn), wb(u, ct));
      } else i && ((s & er) !== 0 && Et !== null && Et.add(
        /** @type {Effect} */
        o
      ), Nr(
        /** @type {Effect} */
        o
      ));
    }
}
function An(e) {
  if (typeof e != "object" || e === null || Ns in e)
    return e;
  const t = jv(e);
  if (t !== Kv && t !== Cv)
    return e;
  var n = /* @__PURE__ */ new Map(), r = Bv(e), a = /* @__PURE__ */ Rt(0), o = sn, s = (i) => {
    if (sn === o)
      return i();
    var u = P, l = sn;
    Bn(null), Cc(o);
    var c = i();
    return Bn(u), Cc(l), c;
  };
  return r && n.set("length", /* @__PURE__ */ Rt(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(i, u, l) {
        (!("value" in l) || l.configurable === !1 || l.enumerable === !1 || l.writable === !1) && qv();
        var c = n.get(u);
        return c === void 0 ? c = s(() => {
          var m = /* @__PURE__ */ Rt(l.value);
          return n.set(u, m), m;
        }) : Wt(c, l.value, !0), !0;
      },
      deleteProperty(i, u) {
        var l = n.get(u);
        if (l === void 0) {
          if (u in i) {
            const c = s(() => /* @__PURE__ */ Rt(oe));
            n.set(u, c), vs(a);
          }
        } else
          Wt(l, oe), vs(a);
        return !0;
      },
      get(i, u, l) {
        if (u === Ns)
          return e;
        var c = n.get(u), m = u in i;
        if (c === void 0 && (!m || Es(i, u)?.writable) && (c = s(() => {
          var f = An(m ? i[u] : oe), y = /* @__PURE__ */ Rt(f);
          return y;
        }), n.set(u, c)), c !== void 0) {
          var d = Sa(c);
          return d === oe ? void 0 : d;
        }
        return Reflect.get(i, u, l);
      },
      getOwnPropertyDescriptor(i, u) {
        var l = Reflect.getOwnPropertyDescriptor(i, u);
        if (l && "value" in l) {
          var c = n.get(u);
          c && (l.value = Sa(c));
        } else if (l === void 0) {
          var m = n.get(u), d = m?.v;
          if (m !== void 0 && d !== oe)
            return {
              enumerable: !0,
              configurable: !0,
              value: d,
              writable: !0
            };
        }
        return l;
      },
      has(i, u) {
        if (u === Ns)
          return !0;
        var l = n.get(u), c = l !== void 0 && l.v !== oe || Reflect.has(i, u);
        if (l !== void 0 || pe !== null && (!c || Es(i, u)?.writable)) {
          l === void 0 && (l = s(() => {
            var d = c ? An(i[u]) : oe, f = /* @__PURE__ */ Rt(d);
            return f;
          }), n.set(u, l));
          var m = Sa(l);
          if (m === oe)
            return !1;
        }
        return c;
      },
      set(i, u, l, c) {
        var m = n.get(u), d = u in i;
        if (r && u === "length")
          for (var f = l; f < /** @type {Source<number>} */
          m.v; f += 1) {
            var y = n.get(f + "");
            y !== void 0 ? Wt(y, oe) : f in i && (y = s(() => /* @__PURE__ */ Rt(oe)), n.set(f + "", y));
          }
        if (m === void 0)
          (!d || Es(i, u)?.writable) && (m = s(() => /* @__PURE__ */ Rt(void 0)), Wt(m, An(l)), n.set(u, m));
        else {
          d = m.v !== oe;
          var E = s(() => An(l));
          Wt(m, E);
        }
        var N = Reflect.getOwnPropertyDescriptor(i, u);
        if (N?.set && N.set.call(c, l), !d) {
          if (r && typeof u == "string") {
            var v = (
              /** @type {Source<number>} */
              n.get("length")
            ), I = Number(u);
            Number.isInteger(I) && I >= v.v && Wt(v, I + 1);
          }
          vs(a);
        }
        return !0;
      },
      ownKeys(i) {
        Sa(a);
        var u = Reflect.ownKeys(i).filter((m) => {
          var d = n.get(m);
          return d === void 0 || d.v !== oe;
        });
        for (var [l, c] of n)
          c.v !== oe && !(l in i) && u.push(l);
        return u;
      },
      setPrototypeOf() {
        Qv();
      }
    }
  );
}
var m1;
// @__NO_SIDE_EFFECTS__
function d1(e) {
  return (
    /** @type {TemplateNode | null} */
    m1.call(e)
  );
}
function _b(e) {
  var t = P, n = pe;
  Bn(null), io(null);
  try {
    return e();
  } finally {
    Bn(t), io(n);
  }
}
function oo() {
  return P !== null && !en;
}
function Ob(e) {
  var t = e.teardown;
  if (t !== null) {
    const n = ea, r = P;
    Kc(!0), Bn(null);
    try {
      t.call(null);
    } finally {
      Kc(n), Bn(r);
    }
  }
}
function Sb(e, t = !1) {
  var n = e.first;
  for (e.first = e.last = null; n !== null; ) {
    const a = n.ac;
    a !== null && _b(() => {
      a.abort(gb);
    });
    var r = n.next;
    (n.f & Qr) !== 0 ? n.parent = null : mu(n, t), n = r;
  }
}
function p1(e) {
  for (var t = e.first; t !== null; ) {
    var n = t.next;
    (t.f & qr) === 0 && mu(t), t = n;
  }
}
function mu(e, t = !0) {
  var n = !1;
  (t || (e.f & pb) !== 0) && e.nodes !== null && e.nodes.end !== null && (b1(
    e.nodes.start,
    /** @type {TemplateNode} */
    e.nodes.end
  ), n = !0), Sb(e, t && !n), uo(e, 0), be(e, an);
  var r = e.nodes && e.nodes.t;
  if (r !== null)
    for (const o of r)
      o.stop();
  Ob(e);
  var a = e.parent;
  a !== null && a.first !== null && kb(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = null;
}
function b1(e, t) {
  for (; e !== null; ) {
    var n = e === t ? null : /* @__PURE__ */ d1(e);
    e.remove(), e = n;
  }
}
function kb(e) {
  var t = e.parent, n = e.prev, r = e.next;
  n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
let on = !1;
function so(e) {
  on = e;
}
let ea = !1;
function Kc(e) {
  ea = e;
}
let P = null, en = !1;
function Bn(e) {
  P = e;
}
let pe = null;
function io(e) {
  pe = e;
}
let At = null;
function g1(e) {
  P !== null && (At === null ? At = [e] : At.push(e));
}
let ee = null, Ae = 0, Re = null;
function h1(e) {
  Re = e;
}
let Db = 1, vr = 0, sn = vr;
function Cc(e) {
  sn = e;
}
function Ab() {
  return ++Db;
}
function ta(e) {
  var t = e.f;
  if ((t & qe) !== 0)
    return !0;
  if (t & _e && (e.f &= ~yn), (t & ct) !== 0) {
    var n = e.deps;
    if (n !== null)
      for (var r = n.length, a = 0; a < r; a++) {
        var o = n[a];
        if (ta(
          /** @type {Derived} */
          o
        ) && Ib(
          /** @type {Derived} */
          o
        ), o.wv > e.wv)
          return !0;
      }
    (t & lt) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    Ve === null && be(e, le);
  }
  return !1;
}
function Lb(e, t, n = !0) {
  var r = e.reactions;
  if (r !== null && !At?.includes(e))
    for (var a = 0; a < r.length; a++) {
      var o = r[a];
      (o.f & _e) !== 0 ? Lb(
        /** @type {Derived} */
        o,
        t,
        !1
      ) : t === o && (n ? be(o, qe) : (o.f & le) !== 0 && be(o, ct), Nr(
        /** @type {Effect} */
        o
      ));
    }
}
function Ub(e) {
  var t = ee, n = Ae, r = Re, a = P, o = At, s = en, i = sn, u = e.f;
  ee = /** @type {null | Value[]} */
  null, Ae = 0, Re = null, P = (u & (qr | Qr)) === 0 ? e : null, At = null, e.ctx, en = !1, sn = ++vr, e.ac !== null && (_b(() => {
    e.ac.abort(gb);
  }), e.ac = null);
  try {
    e.f |= ai;
    var l = (
      /** @type {Function} */
      e.fn
    ), c = l(), m = e.deps;
    if (ee !== null) {
      var d;
      if (uo(e, Ae), m !== null && Ae > 0)
        for (m.length = Ae + ee.length, d = 0; d < ee.length; d++)
          m[Ae + d] = ee[d];
      else
        e.deps = m = ee;
      if (oo() && (e.f & lt) !== 0)
        for (d = Ae; d < m.length; d++)
          (m[d].reactions ??= []).push(e);
    } else m !== null && Ae < m.length && (uo(e, Ae), m.length = Ae);
    if (hb() && Re !== null && !en && m !== null && (e.f & (_e | ct | qe)) === 0)
      for (d = 0; d < /** @type {Source[]} */
      Re.length; d++)
        Lb(
          Re[d],
          /** @type {Effect} */
          e
        );
    return a !== null && a !== e && (vr++, Re !== null && (r === null ? r = Re : r.push(.../** @type {Source[]} */
    Re))), (e.f & yr) !== 0 && (e.f ^= yr), c;
  } catch (f) {
    return o1(f);
  } finally {
    e.f ^= ai, ee = t, Ae = n, Re = r, P = a, At = o, en = s, sn = i;
  }
}
function y1(e, t) {
  let n = t.reactions;
  if (n !== null) {
    var r = Gv.call(n, e);
    if (r !== -1) {
      var a = n.length - 1;
      a === 0 ? n = t.reactions = null : (n[r] = n[a], n.pop());
    }
  }
  n === null && (t.f & _e) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (ee === null || !ee.includes(t)) && (be(t, ct), (t.f & lt) !== 0 && (t.f ^= lt, t.f &= ~yn), vb(
    /** @type {Derived} **/
    t
  ), uo(
    /** @type {Derived} **/
    t,
    0
  ));
}
function uo(e, t) {
  var n = e.deps;
  if (n !== null)
    for (var r = t; r < n.length; r++)
      y1(e, n[r]);
}
function lo(e) {
  var t = e.f;
  if ((t & an) === 0) {
    be(e, le);
    var n = pe, r = on;
    pe = e, on = !0;
    try {
      (t & (er | Zv)) !== 0 ? p1(e) : Sb(e), Ob(e);
      var a = Ub(e);
      e.teardown = typeof a == "function" ? a : null, e.wv = Db;
      var o;
      ri && n1 && (e.f & qe) !== 0 && e.deps;
    } finally {
      on = r, pe = n;
    }
  }
}
function Sa(e) {
  var t = e.f, n = (t & _e) !== 0;
  if (P !== null && !en) {
    var r = pe !== null && (pe.f & an) !== 0;
    if (!r && !At?.includes(e)) {
      var a = P.deps;
      if ((P.f & ai) !== 0)
        e.rv < vr && (e.rv = vr, ee === null && a !== null && a[Ae] === e ? Ae++ : ee === null ? ee = [e] : ee.includes(e) || ee.push(e));
      else {
        (P.deps ??= []).push(e);
        var o = e.reactions;
        o === null ? e.reactions = [P] : o.includes(P) || o.push(P);
      }
    }
  }
  if (ea) {
    if (Vt.has(e))
      return Vt.get(e);
    if (n) {
      var s = (
        /** @type {Derived} */
        e
      ), i = s.v;
      return ((s.f & le) === 0 && s.reactions !== null || Rb(s)) && (i = fu(s)), Vt.set(s, i), i;
    }
  } else n && (!Ve?.has(e) || H?.is_fork && !oo()) && (s = /** @type {Derived} */
  e, ta(s) && Ib(s), on && oo() && (s.f & lt) === 0 && Fb(s));
  if (Ve?.has(e))
    return Ve.get(e);
  if ((e.f & yr) !== 0)
    throw e.v;
  return e.v;
}
function Fb(e) {
  if (e.deps !== null) {
    e.f ^= lt;
    for (const t of e.deps)
      (t.reactions ??= []).push(e), (t.f & _e) !== 0 && (t.f & lt) === 0 && Fb(
        /** @type {Derived} */
        t
      );
  }
}
function Rb(e) {
  if (e.v === oe) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps)
    if (Vt.has(t) || (t.f & _e) !== 0 && Rb(
      /** @type {Derived} */
      t
    ))
      return !0;
  return !1;
}
const E1 = -7169;
function be(e, t) {
  e.f = e.f & E1 | t;
}
function nD() {
  const e = window.location.hash == "#night";
  return e && (document.documentElement.className = "night-mode", document.documentElement.dataset.bsTheme = "dark"), e;
}
function $b() {
  return {
    isDark: document.documentElement.classList.contains("night-mode")
  };
}
const N1 = An($b()), v1 = new MutationObserver((e, t) => {
  N1.isDark = $b().isDark;
});
v1.observe(document.documentElement, { attributeFilter: ["class"] });
const I1 = "5";
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add(I1);
var w;
(function(e) {
  e[e.Canceled = 1] = "Canceled", e[e.Unknown = 2] = "Unknown", e[e.InvalidArgument = 3] = "InvalidArgument", e[e.DeadlineExceeded = 4] = "DeadlineExceeded", e[e.NotFound = 5] = "NotFound", e[e.AlreadyExists = 6] = "AlreadyExists", e[e.PermissionDenied = 7] = "PermissionDenied", e[e.ResourceExhausted = 8] = "ResourceExhausted", e[e.FailedPrecondition = 9] = "FailedPrecondition", e[e.Aborted = 10] = "Aborted", e[e.OutOfRange = 11] = "OutOfRange", e[e.Unimplemented = 12] = "Unimplemented", e[e.Internal = 13] = "Internal", e[e.Unavailable = 14] = "Unavailable", e[e.DataLoss = 15] = "DataLoss", e[e.Unauthenticated = 16] = "Unauthenticated";
})(w || (w = {}));
function du(e, t) {
  return e !== null && typeof e == "object" && "$typeName" in e && typeof e.$typeName == "string" ? t === void 0 ? !0 : t.typeName === e.$typeName : !1;
}
var b;
(function(e) {
  e[e.DOUBLE = 1] = "DOUBLE", e[e.FLOAT = 2] = "FLOAT", e[e.INT64 = 3] = "INT64", e[e.UINT64 = 4] = "UINT64", e[e.INT32 = 5] = "INT32", e[e.FIXED64 = 6] = "FIXED64", e[e.FIXED32 = 7] = "FIXED32", e[e.BOOL = 8] = "BOOL", e[e.STRING = 9] = "STRING", e[e.BYTES = 12] = "BYTES", e[e.UINT32 = 13] = "UINT32", e[e.SFIXED32 = 15] = "SFIXED32", e[e.SFIXED64 = 16] = "SFIXED64", e[e.SINT32 = 17] = "SINT32", e[e.SINT64 = 18] = "SINT64";
})(b || (b = {}));
function T1() {
  let e = 0, t = 0;
  for (let r = 0; r < 28; r += 7) {
    let a = this.buf[this.pos++];
    if (e |= (a & 127) << r, (a & 128) == 0)
      return this.assertBounds(), [e, t];
  }
  let n = this.buf[this.pos++];
  if (e |= (n & 15) << 28, t = (n & 112) >> 4, (n & 128) == 0)
    return this.assertBounds(), [e, t];
  for (let r = 3; r <= 31; r += 7) {
    let a = this.buf[this.pos++];
    if (t |= (a & 127) << r, (a & 128) == 0)
      return this.assertBounds(), [e, t];
  }
  throw new Error("invalid varint");
}
function Is(e, t, n) {
  for (let o = 0; o < 28; o = o + 7) {
    const s = e >>> o, i = !(!(s >>> 7) && t == 0), u = (i ? s | 128 : s) & 255;
    if (n.push(u), !i)
      return;
  }
  const r = e >>> 28 & 15 | (t & 7) << 4, a = t >> 3 != 0;
  if (n.push((a ? r | 128 : r) & 255), !!a) {
    for (let o = 3; o < 31; o = o + 7) {
      const s = t >>> o, i = !!(s >>> 7), u = (i ? s | 128 : s) & 255;
      if (n.push(u), !i)
        return;
    }
    n.push(t >>> 31 & 1);
  }
}
const Xa = 4294967296;
function jc(e) {
  const t = e[0] === "-";
  t && (e = e.slice(1));
  const n = 1e6;
  let r = 0, a = 0;
  function o(s, i) {
    const u = Number(e.slice(s, i));
    a *= n, r = r * n + u, r >= Xa && (a = a + (r / Xa | 0), r = r % Xa);
  }
  return o(-24, -18), o(-18, -12), o(-12, -6), o(-6), t ? xb(r, a) : pu(r, a);
}
function w1(e, t) {
  let n = pu(e, t);
  const r = n.hi & 2147483648;
  r && (n = xb(n.lo, n.hi));
  const a = Pb(n.lo, n.hi);
  return r ? "-" + a : a;
}
function Pb(e, t) {
  if ({ lo: e, hi: t } = _1(e, t), t <= 2097151)
    return String(Xa * t + e);
  const n = e & 16777215, r = (e >>> 24 | t << 8) & 16777215, a = t >> 16 & 65535;
  let o = n + r * 6777216 + a * 6710656, s = r + a * 8147497, i = a * 2;
  const u = 1e7;
  return o >= u && (s += Math.floor(o / u), o %= u), s >= u && (i += Math.floor(s / u), s %= u), i.toString() + Xc(s) + Xc(o);
}
function _1(e, t) {
  return { lo: e >>> 0, hi: t >>> 0 };
}
function pu(e, t) {
  return { lo: e | 0, hi: t | 0 };
}
function xb(e, t) {
  return t = ~t, e ? e = ~e + 1 : t += 1, pu(e, t);
}
const Xc = (e) => {
  const t = String(e);
  return "0000000".slice(t.length) + t;
};
function ii(e, t) {
  if (e >= 0) {
    for (; e > 127; )
      t.push(e & 127 | 128), e = e >>> 7;
    t.push(e);
  } else {
    for (let n = 0; n < 9; n++)
      t.push(e & 127 | 128), e = e >> 7;
    t.push(1);
  }
}
function O1() {
  let e = this.buf[this.pos++], t = e & 127;
  if ((e & 128) == 0)
    return this.assertBounds(), t;
  if (e = this.buf[this.pos++], t |= (e & 127) << 7, (e & 128) == 0)
    return this.assertBounds(), t;
  if (e = this.buf[this.pos++], t |= (e & 127) << 14, (e & 128) == 0)
    return this.assertBounds(), t;
  if (e = this.buf[this.pos++], t |= (e & 127) << 21, (e & 128) == 0)
    return this.assertBounds(), t;
  e = this.buf[this.pos++], t |= (e & 15) << 28;
  for (let n = 5; (e & 128) !== 0 && n < 10; n++)
    e = this.buf[this.pos++];
  if ((e & 128) != 0)
    throw new Error("invalid varint");
  return this.assertBounds(), t >>> 0;
}
const k = /* @__PURE__ */ S1();
function S1() {
  const e = new DataView(new ArrayBuffer(8));
  if (typeof BigInt == "function" && typeof e.getBigInt64 == "function" && typeof e.getBigUint64 == "function" && typeof e.setBigInt64 == "function" && typeof e.setBigUint64 == "function" && (globalThis.Deno || typeof process != "object" || typeof process.env != "object" || process.env.BUF_BIGINT_DISABLE !== "1")) {
    const t = BigInt("-9223372036854775808"), n = BigInt("9223372036854775807"), r = BigInt("0"), a = BigInt("18446744073709551615");
    return {
      zero: BigInt(0),
      supported: !0,
      parse(o) {
        const s = typeof o == "bigint" ? o : BigInt(o);
        if (s > n || s < t)
          throw new Error(`invalid int64: ${o}`);
        return s;
      },
      uParse(o) {
        const s = typeof o == "bigint" ? o : BigInt(o);
        if (s > a || s < r)
          throw new Error(`invalid uint64: ${o}`);
        return s;
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
      dec(o, s) {
        return e.setInt32(0, o, !0), e.setInt32(4, s, !0), e.getBigInt64(0, !0);
      },
      uDec(o, s) {
        return e.setInt32(0, o, !0), e.setInt32(4, s, !0), e.getBigUint64(0, !0);
      }
    };
  }
  return {
    zero: "0",
    supported: !1,
    parse(t) {
      return typeof t != "string" && (t = t.toString()), Wc(t), t;
    },
    uParse(t) {
      return typeof t != "string" && (t = t.toString()), Jc(t), t;
    },
    enc(t) {
      return typeof t != "string" && (t = t.toString()), Wc(t), jc(t);
    },
    uEnc(t) {
      return typeof t != "string" && (t = t.toString()), Jc(t), jc(t);
    },
    dec(t, n) {
      return w1(t, n);
    },
    uDec(t, n) {
      return Pb(t, n);
    }
  };
}
function Wc(e) {
  if (!/^-?[0-9]+$/.test(e))
    throw new Error("invalid int64: " + e);
}
function Jc(e) {
  if (!/^[0-9]+$/.test(e))
    throw new Error("invalid uint64: " + e);
}
function En(e, t) {
  switch (e) {
    case b.STRING:
      return "";
    case b.BOOL:
      return !1;
    case b.DOUBLE:
    case b.FLOAT:
      return 0;
    case b.INT64:
    case b.UINT64:
    case b.SFIXED64:
    case b.FIXED64:
    case b.SINT64:
      return t ? "0" : k.zero;
    case b.BYTES:
      return new Uint8Array(0);
    default:
      return 0;
  }
}
function k1(e, t) {
  switch (e) {
    case b.BOOL:
      return t === !1;
    case b.STRING:
      return t === "";
    case b.BYTES:
      return t instanceof Uint8Array && !t.byteLength;
    default:
      return t == 0;
  }
}
const Vb = 2, St = /* @__PURE__ */ Symbol.for("reflect unsafe local");
function Yb(e, t) {
  const n = e[t.localName].case;
  return n === void 0 ? n : t.fields.find((r) => r.localName === n);
}
function D1(e, t) {
  const n = t.localName;
  if (t.oneof)
    return e[t.oneof.localName].case === n;
  if (t.presence != Vb)
    return e[n] !== void 0 && Object.prototype.hasOwnProperty.call(e, n);
  switch (t.fieldKind) {
    case "list":
      return e[n].length > 0;
    case "map":
      return Object.keys(e[n]).length > 0;
    case "scalar":
      return !k1(t.scalar, e[n]);
    case "enum":
      return e[n] !== t.enum.values[0].number;
  }
  throw new Error("message field with implicit presence");
}
function Ir(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t) && e[t] !== void 0;
}
function Mb(e, t) {
  if (t.oneof) {
    const n = e[t.oneof.localName];
    return n.case === t.localName ? n.value : void 0;
  }
  return e[t.localName];
}
function Bb(e, t, n) {
  t.oneof ? e[t.oneof.localName] = {
    case: t.localName,
    value: n
  } : e[t.localName] = n;
}
function A1(e, t) {
  const n = t.localName;
  if (t.oneof) {
    const r = t.oneof.localName;
    e[r].case === n && (e[r] = { case: void 0 });
  } else if (t.presence != Vb)
    delete e[n];
  else
    switch (t.fieldKind) {
      case "map":
        e[n] = {};
        break;
      case "list":
        e[n] = [];
        break;
      case "enum":
        e[n] = t.enum.values[0].number;
        break;
      case "scalar":
        e[n] = En(t.scalar, t.longAsString);
        break;
    }
}
function Kt(e) {
  return e !== null && typeof e == "object" && !Array.isArray(e);
}
function bu(e, t) {
  var n, r, a, o;
  if (Kt(e) && St in e && "add" in e && "field" in e && typeof e.field == "function") {
    if (t !== void 0) {
      const s = t, i = e.field();
      return s.listKind == i.listKind && s.scalar === i.scalar && ((n = s.message) === null || n === void 0 ? void 0 : n.typeName) === ((r = i.message) === null || r === void 0 ? void 0 : r.typeName) && ((a = s.enum) === null || a === void 0 ? void 0 : a.typeName) === ((o = i.enum) === null || o === void 0 ? void 0 : o.typeName);
    }
    return !0;
  }
  return !1;
}
function gu(e, t) {
  var n, r, a, o;
  if (Kt(e) && St in e && "has" in e && "field" in e && typeof e.field == "function") {
    if (t !== void 0) {
      const s = t, i = e.field();
      return s.mapKey === i.mapKey && s.mapKind == i.mapKind && s.scalar === i.scalar && ((n = s.message) === null || n === void 0 ? void 0 : n.typeName) === ((r = i.message) === null || r === void 0 ? void 0 : r.typeName) && ((a = s.enum) === null || a === void 0 ? void 0 : a.typeName) === ((o = i.enum) === null || o === void 0 ? void 0 : o.typeName);
    }
    return !0;
  }
  return !1;
}
function hu(e, t) {
  return Kt(e) && St in e && "desc" in e && Kt(e.desc) && e.desc.kind === "message" && (t === void 0 || e.desc.typeName == t.typeName);
}
function L1(e) {
  return Gb(e.$typeName);
}
function na(e) {
  const t = e.fields[0];
  return Gb(e.typeName) && t !== void 0 && t.fieldKind == "scalar" && t.name == "value" && t.number == 1;
}
function Gb(e) {
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
const U1 = 999, F1 = 998, Wa = 2;
function Qe(e, t) {
  if (du(t, e))
    return t;
  const n = V1(e);
  return t !== void 0 && R1(e, n, t), n;
}
function R1(e, t, n) {
  for (const r of e.members) {
    let a = n[r.localName];
    if (a == null)
      continue;
    let o;
    if (r.kind == "oneof") {
      const s = Yb(n, r);
      if (!s)
        continue;
      o = s, a = Mb(n, s);
    } else
      o = r;
    switch (o.fieldKind) {
      case "message":
        a = yu(o, a);
        break;
      case "scalar":
        a = Kb(o, a);
        break;
      case "list":
        a = P1(o, a);
        break;
      case "map":
        a = $1(o, a);
        break;
    }
    Bb(t, o, a);
  }
  return t;
}
function Kb(e, t) {
  return e.scalar == b.BYTES ? Eu(t) : t;
}
function $1(e, t) {
  if (Kt(t)) {
    if (e.scalar == b.BYTES)
      return Zc(t, Eu);
    if (e.mapKind == "message")
      return Zc(t, (n) => yu(e, n));
  }
  return t;
}
function P1(e, t) {
  if (Array.isArray(t)) {
    if (e.scalar == b.BYTES)
      return t.map(Eu);
    if (e.listKind == "message")
      return t.map((n) => yu(e, n));
  }
  return t;
}
function yu(e, t) {
  if (e.fieldKind == "message" && !e.oneof && na(e.message))
    return Kb(e.message.fields[0], t);
  if (Kt(t)) {
    if (e.message.typeName == "google.protobuf.Struct" && e.parent.typeName !== "google.protobuf.Value")
      return t;
    if (!du(t, e.message))
      return Qe(e.message, t);
  }
  return t;
}
function Eu(e) {
  return Array.isArray(e) ? new Uint8Array(e) : e;
}
function Zc(e, t) {
  const n = {};
  for (const r of Object.entries(e))
    n[r[0]] = t(r[1]);
  return n;
}
const x1 = /* @__PURE__ */ Symbol(), Hc = /* @__PURE__ */ new WeakMap();
function V1(e) {
  let t;
  if (Y1(e)) {
    const n = Hc.get(e);
    let r, a;
    if (n)
      ({ prototype: r, members: a } = n);
    else {
      r = {}, a = /* @__PURE__ */ new Set();
      for (const o of e.members)
        o.kind != "oneof" && (o.fieldKind != "scalar" && o.fieldKind != "enum" || o.presence != Wa && (a.add(o), r[o.localName] = Ts(o)));
      Hc.set(e, { prototype: r, members: a });
    }
    t = Object.create(r), t.$typeName = e.typeName;
    for (const o of e.members)
      a.has(o) || o.kind == "field" && (o.fieldKind == "message" || (o.fieldKind == "scalar" || o.fieldKind == "enum") && o.presence != Wa) || (t[o.localName] = Ts(o));
  } else {
    t = {
      $typeName: e.typeName
    };
    for (const n of e.members)
      (n.kind == "oneof" || n.presence == Wa) && (t[n.localName] = Ts(n));
  }
  return t;
}
function Y1(e) {
  switch (e.file.edition) {
    case U1:
      return !1;
    case F1:
      return !0;
    default:
      return e.fields.some((t) => t.presence != Wa && t.fieldKind != "message" && !t.oneof);
  }
}
function Ts(e) {
  if (e.kind == "oneof")
    return { case: void 0 };
  if (e.fieldKind == "list")
    return [];
  if (e.fieldKind == "map")
    return {};
  if (e.fieldKind == "message")
    return x1;
  const t = e.getDefaultValue();
  return t !== void 0 ? e.fieldKind == "scalar" && e.longAsString ? t.toString() : t : e.fieldKind == "scalar" ? En(e.scalar, e.longAsString) : e.enum.values[0].number;
}
const M1 = [
  "FieldValueInvalidError",
  "FieldListRangeError",
  "ForeignFieldError"
];
class ge extends Error {
  constructor(t, n, r = "FieldValueInvalidError") {
    super(n), this.name = r, this.field = () => t;
  }
}
function B1(e) {
  return e instanceof Error && M1.includes(e.name) && "field" in e && typeof e.field == "function";
}
const ws = /* @__PURE__ */ Symbol.for("@bufbuild/protobuf/text-encoding");
function Nu() {
  if (globalThis[ws] == null) {
    const e = new globalThis.TextEncoder(), t = new globalThis.TextDecoder();
    globalThis[ws] = {
      encodeUtf8(n) {
        return e.encode(n);
      },
      decodeUtf8(n) {
        return t.decode(n);
      },
      checkUtf8(n) {
        try {
          return encodeURIComponent(n), !0;
        } catch {
          return !1;
        }
      }
    };
  }
  return globalThis[ws];
}
var U;
(function(e) {
  e[e.Varint = 0] = "Varint", e[e.Bit64 = 1] = "Bit64", e[e.LengthDelimited = 2] = "LengthDelimited", e[e.StartGroup = 3] = "StartGroup", e[e.EndGroup = 4] = "EndGroup", e[e.Bit32 = 5] = "Bit32";
})(U || (U = {}));
const Cb = 34028234663852886e22, jb = -34028234663852886e22, Xb = 4294967295, Wb = 2147483647, Jb = -2147483648;
class Zb {
  constructor(t = Nu().encodeUtf8) {
    this.encodeUtf8 = t, this.stack = [], this.chunks = [], this.buf = [];
  }
  /**
   * Return all bytes written and reset this writer.
   */
  finish() {
    this.buf.length && (this.chunks.push(new Uint8Array(this.buf)), this.buf = []);
    let t = 0;
    for (let a = 0; a < this.chunks.length; a++)
      t += this.chunks[a].length;
    let n = new Uint8Array(t), r = 0;
    for (let a = 0; a < this.chunks.length; a++)
      n.set(this.chunks[a], r), r += this.chunks[a].length;
    return this.chunks = [], n;
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
    let t = this.finish(), n = this.stack.pop();
    if (!n)
      throw new Error("invalid state, fork stack empty");
    return this.chunks = n.chunks, this.buf = n.buf, this.uint32(t.byteLength), this.raw(t);
  }
  /**
   * Writes a tag (field number and wire type).
   *
   * Equivalent to `uint32( (fieldNo << 3 | type) >>> 0 )`.
   *
   * Generated code should compute the tag ahead of time and call `uint32()`.
   */
  tag(t, n) {
    return this.uint32((t << 3 | n) >>> 0);
  }
  /**
   * Write a chunk of raw bytes.
   */
  raw(t) {
    return this.buf.length && (this.chunks.push(new Uint8Array(this.buf)), this.buf = []), this.chunks.push(t), this;
  }
  /**
   * Write a `uint32` value, an unsigned 32 bit varint.
   */
  uint32(t) {
    for (zc(t); t > 127; )
      this.buf.push(t & 127 | 128), t = t >>> 7;
    return this.buf.push(t), this;
  }
  /**
   * Write a `int32` value, a signed 32 bit varint.
   */
  int32(t) {
    return _s(t), ii(t, this.buf), this;
  }
  /**
   * Write a `bool` value, a variant.
   */
  bool(t) {
    return this.buf.push(t ? 1 : 0), this;
  }
  /**
   * Write a `bytes` value, length-delimited arbitrary data.
   */
  bytes(t) {
    return this.uint32(t.byteLength), this.raw(t);
  }
  /**
   * Write a `string` value, length-delimited data converted to UTF-8 text.
   */
  string(t) {
    let n = this.encodeUtf8(t);
    return this.uint32(n.byteLength), this.raw(n);
  }
  /**
   * Write a `float` value, 32-bit floating point number.
   */
  float(t) {
    G1(t);
    let n = new Uint8Array(4);
    return new DataView(n.buffer).setFloat32(0, t, !0), this.raw(n);
  }
  /**
   * Write a `double` value, a 64-bit floating point number.
   */
  double(t) {
    let n = new Uint8Array(8);
    return new DataView(n.buffer).setFloat64(0, t, !0), this.raw(n);
  }
  /**
   * Write a `fixed32` value, an unsigned, fixed-length 32-bit integer.
   */
  fixed32(t) {
    zc(t);
    let n = new Uint8Array(4);
    return new DataView(n.buffer).setUint32(0, t, !0), this.raw(n);
  }
  /**
   * Write a `sfixed32` value, a signed, fixed-length 32-bit integer.
   */
  sfixed32(t) {
    _s(t);
    let n = new Uint8Array(4);
    return new DataView(n.buffer).setInt32(0, t, !0), this.raw(n);
  }
  /**
   * Write a `sint32` value, a signed, zigzag-encoded 32-bit varint.
   */
  sint32(t) {
    return _s(t), t = (t << 1 ^ t >> 31) >>> 0, ii(t, this.buf), this;
  }
  /**
   * Write a `fixed64` value, a signed, fixed-length 64-bit integer.
   */
  sfixed64(t) {
    let n = new Uint8Array(8), r = new DataView(n.buffer), a = k.enc(t);
    return r.setInt32(0, a.lo, !0), r.setInt32(4, a.hi, !0), this.raw(n);
  }
  /**
   * Write a `fixed64` value, an unsigned, fixed-length 64 bit integer.
   */
  fixed64(t) {
    let n = new Uint8Array(8), r = new DataView(n.buffer), a = k.uEnc(t);
    return r.setInt32(0, a.lo, !0), r.setInt32(4, a.hi, !0), this.raw(n);
  }
  /**
   * Write a `int64` value, a signed 64-bit varint.
   */
  int64(t) {
    let n = k.enc(t);
    return Is(n.lo, n.hi, this.buf), this;
  }
  /**
   * Write a `sint64` value, a signed, zig-zag-encoded 64-bit varint.
   */
  sint64(t) {
    const n = k.enc(t), r = n.hi >> 31, a = n.lo << 1 ^ r, o = (n.hi << 1 | n.lo >>> 31) ^ r;
    return Is(a, o, this.buf), this;
  }
  /**
   * Write a `uint64` value, an unsigned 64-bit varint.
   */
  uint64(t) {
    const n = k.uEnc(t);
    return Is(n.lo, n.hi, this.buf), this;
  }
}
class vu {
  constructor(t, n = Nu().decodeUtf8) {
    this.decodeUtf8 = n, this.varint64 = T1, this.uint32 = O1, this.buf = t, this.len = t.length, this.pos = 0, this.view = new DataView(t.buffer, t.byteOffset, t.byteLength);
  }
  /**
   * Reads a tag - field number and wire type.
   */
  tag() {
    let t = this.uint32(), n = t >>> 3, r = t & 7;
    if (n <= 0 || r < 0 || r > 5)
      throw new Error("illegal tag: field no " + n + " wire type " + r);
    return [n, r];
  }
  /**
   * Skip one element and return the skipped data.
   *
   * When skipping StartGroup, provide the tags field number to check for
   * matching field number in the EndGroup tag.
   */
  skip(t, n) {
    let r = this.pos;
    switch (t) {
      case U.Varint:
        for (; this.buf[this.pos++] & 128; )
          ;
        break;
      // @ts-ignore TS7029: Fallthrough case in switch -- ignore instead of expect-error for compiler settings without noFallthroughCasesInSwitch: true
      case U.Bit64:
        this.pos += 4;
      case U.Bit32:
        this.pos += 4;
        break;
      case U.LengthDelimited:
        let a = this.uint32();
        this.pos += a;
        break;
      case U.StartGroup:
        for (; ; ) {
          const [o, s] = this.tag();
          if (s === U.EndGroup) {
            if (n !== void 0 && o !== n)
              throw new Error("invalid end group tag");
            break;
          }
          this.skip(s, o);
        }
        break;
      default:
        throw new Error("cant skip wire type " + t);
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
    let t = this.uint32();
    return t >>> 1 ^ -(t & 1);
  }
  /**
   * Read a `int64` field, a signed 64-bit varint.
   */
  int64() {
    return k.dec(...this.varint64());
  }
  /**
   * Read a `uint64` field, an unsigned 64-bit varint.
   */
  uint64() {
    return k.uDec(...this.varint64());
  }
  /**
   * Read a `sint64` field, a signed, zig-zag-encoded 64-bit varint.
   */
  sint64() {
    let [t, n] = this.varint64(), r = -(t & 1);
    return t = (t >>> 1 | (n & 1) << 31) ^ r, n = n >>> 1 ^ r, k.dec(t, n);
  }
  /**
   * Read a `bool` field, a variant.
   */
  bool() {
    let [t, n] = this.varint64();
    return t !== 0 || n !== 0;
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
    return k.uDec(this.sfixed32(), this.sfixed32());
  }
  /**
   * Read a `fixed64` field, a signed, fixed-length 64-bit integer.
   */
  sfixed64() {
    return k.dec(this.sfixed32(), this.sfixed32());
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
    let t = this.uint32(), n = this.pos;
    return this.pos += t, this.assertBounds(), this.buf.subarray(n, n + t);
  }
  /**
   * Read a `string` field, length-delimited data converted to UTF-8 text.
   */
  string() {
    return this.decodeUtf8(this.bytes());
  }
}
function _s(e) {
  if (typeof e == "string")
    e = Number(e);
  else if (typeof e != "number")
    throw new Error("invalid int32: " + typeof e);
  if (!Number.isInteger(e) || e > Wb || e < Jb)
    throw new Error("invalid int32: " + e);
}
function zc(e) {
  if (typeof e == "string")
    e = Number(e);
  else if (typeof e != "number")
    throw new Error("invalid uint32: " + typeof e);
  if (!Number.isInteger(e) || e > Xb || e < 0)
    throw new Error("invalid uint32: " + e);
}
function G1(e) {
  if (typeof e == "string") {
    const t = e;
    if (e = Number(e), Number.isNaN(e) && t !== "NaN")
      throw new Error("invalid float32: " + t);
  } else if (typeof e != "number")
    throw new Error("invalid float32: " + typeof e);
  if (Number.isFinite(e) && (e > Cb || e < jb))
    throw new Error("invalid float32: " + e);
}
function Jt(e, t) {
  const n = e.fieldKind == "list" ? bu(t, e) : e.fieldKind == "map" ? gu(t, e) : Iu(e, t);
  if (n === !0)
    return;
  let r;
  switch (e.fieldKind) {
    case "list":
      r = `expected ${qb(e)}, got ${X(t)}`;
      break;
    case "map":
      r = `expected ${Qb(e)}, got ${X(t)}`;
      break;
    default:
      r = co(e, t, n);
  }
  return new ge(e, r);
}
function qc(e, t, n) {
  const r = Iu(e, n);
  if (r !== !0)
    return new ge(e, `list item #${t + 1}: ${co(e, n, r)}`);
}
function K1(e, t, n) {
  const r = Hb(t, e.mapKey);
  if (r !== !0)
    return new ge(e, `invalid map key: ${co({ scalar: e.mapKey }, t, r)}`);
  const a = Iu(e, n);
  if (a !== !0)
    return new ge(e, `map entry ${X(t)}: ${co(e, n, a)}`);
}
function Iu(e, t) {
  return e.scalar !== void 0 ? Hb(t, e.scalar) : e.enum !== void 0 ? e.enum.open ? Number.isInteger(t) : e.enum.values.some((n) => n.number === t) : hu(t, e.message);
}
function Hb(e, t) {
  switch (t) {
    case b.DOUBLE:
      return typeof e == "number";
    case b.FLOAT:
      return typeof e != "number" ? !1 : Number.isNaN(e) || !Number.isFinite(e) ? !0 : e > Cb || e < jb ? `${e.toFixed()} out of range` : !0;
    case b.INT32:
    case b.SFIXED32:
    case b.SINT32:
      return typeof e != "number" || !Number.isInteger(e) ? !1 : e > Wb || e < Jb ? `${e.toFixed()} out of range` : !0;
    case b.FIXED32:
    case b.UINT32:
      return typeof e != "number" || !Number.isInteger(e) ? !1 : e > Xb || e < 0 ? `${e.toFixed()} out of range` : !0;
    case b.BOOL:
      return typeof e == "boolean";
    case b.STRING:
      return typeof e != "string" ? !1 : Nu().checkUtf8(e) || "invalid UTF8";
    case b.BYTES:
      return e instanceof Uint8Array;
    case b.INT64:
    case b.SFIXED64:
    case b.SINT64:
      if (typeof e == "bigint" || typeof e == "number" || typeof e == "string" && e.length > 0)
        try {
          return k.parse(e), !0;
        } catch {
          return `${e} out of range`;
        }
      return !1;
    case b.FIXED64:
    case b.UINT64:
      if (typeof e == "bigint" || typeof e == "number" || typeof e == "string" && e.length > 0)
        try {
          return k.uParse(e), !0;
        } catch {
          return `${e} out of range`;
        }
      return !1;
  }
}
function co(e, t, n) {
  return n = typeof n == "string" ? `: ${n}` : `, got ${X(t)}`, e.scalar !== void 0 ? `expected ${C1(e.scalar)}` + n : e.enum !== void 0 ? `expected ${e.enum.toString()}` + n : `expected ${zb(e.message)}` + n;
}
function X(e) {
  switch (typeof e) {
    case "object":
      return e === null ? "null" : e instanceof Uint8Array ? `Uint8Array(${e.length})` : Array.isArray(e) ? `Array(${e.length})` : bu(e) ? qb(e.field()) : gu(e) ? Qb(e.field()) : hu(e) ? zb(e.desc) : du(e) ? `message ${e.$typeName}` : "object";
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
function zb(e) {
  return `ReflectMessage (${e.typeName})`;
}
function qb(e) {
  switch (e.listKind) {
    case "message":
      return `ReflectList (${e.message.toString()})`;
    case "enum":
      return `ReflectList (${e.enum.toString()})`;
    case "scalar":
      return `ReflectList (${b[e.scalar]})`;
  }
}
function Qb(e) {
  switch (e.mapKind) {
    case "message":
      return `ReflectMap (${b[e.mapKey]}, ${e.message.toString()})`;
    case "enum":
      return `ReflectMap (${b[e.mapKey]}, ${e.enum.toString()})`;
    case "scalar":
      return `ReflectMap (${b[e.mapKey]}, ${b[e.scalar]})`;
  }
}
function C1(e) {
  switch (e) {
    case b.STRING:
      return "string";
    case b.BOOL:
      return "boolean";
    case b.INT64:
    case b.SINT64:
    case b.SFIXED64:
      return "bigint (int64)";
    case b.UINT64:
    case b.FIXED64:
      return "bigint (uint64)";
    case b.BYTES:
      return "Uint8Array";
    case b.DOUBLE:
      return "number (float64)";
    case b.FLOAT:
      return "number (float32)";
    case b.FIXED32:
    case b.UINT32:
      return "number (uint32)";
    case b.INT32:
    case b.SFIXED32:
    case b.SINT32:
      return "number (int32)";
  }
}
function Ke(e, t, n = !0) {
  return new eg(e, t, n);
}
const Qc = /* @__PURE__ */ new WeakMap();
class eg {
  get sortedFields() {
    const t = Qc.get(this.desc);
    if (t)
      return t;
    const n = this.desc.fields.concat().sort((r, a) => r.number - a.number);
    return Qc.set(this.desc, n), n;
  }
  constructor(t, n, r = !0) {
    this.lists = /* @__PURE__ */ new Map(), this.maps = /* @__PURE__ */ new Map(), this.check = r, this.desc = t, this.message = this[St] = n ?? Qe(t), this.fields = t.fields, this.oneofs = t.oneofs, this.members = t.members;
  }
  findNumber(t) {
    return this._fieldsByNumber || (this._fieldsByNumber = new Map(this.desc.fields.map((n) => [n.number, n]))), this._fieldsByNumber.get(t);
  }
  oneofCase(t) {
    return or(this.message, t), Yb(this.message, t);
  }
  isSet(t) {
    return or(this.message, t), D1(this.message, t);
  }
  clear(t) {
    or(this.message, t), A1(this.message, t);
  }
  get(t) {
    or(this.message, t);
    const n = Mb(this.message, t);
    switch (t.fieldKind) {
      case "list":
        let r = this.lists.get(t);
        return (!r || r[St] !== n) && this.lists.set(
          t,
          // biome-ignore lint/suspicious/noAssignInExpressions: no
          r = new j1(t, n, this.check)
        ), r;
      case "map":
        let a = this.maps.get(t);
        return (!a || a[St] !== n) && this.maps.set(
          t,
          // biome-ignore lint/suspicious/noAssignInExpressions: no
          a = new X1(t, n, this.check)
        ), a;
      case "message":
        return wu(t, n, this.check);
      case "scalar":
        return n === void 0 ? En(t.scalar, !1) : _u(t, n);
      case "enum":
        return n ?? t.enum.values[0].number;
    }
  }
  set(t, n) {
    if (or(this.message, t), this.check) {
      const a = Jt(t, n);
      if (a)
        throw a;
    }
    let r;
    t.fieldKind == "message" ? r = Tu(t, n) : gu(n) || bu(n) ? r = n[St] : r = Ou(t, n), Bb(this.message, t, r);
  }
  getUnknown() {
    return this.message.$unknown;
  }
  setUnknown(t) {
    this.message.$unknown = t;
  }
}
function or(e, t) {
  if (t.parent.typeName !== e.$typeName)
    throw new ge(t, `cannot use ${t.toString()} with message ${e.$typeName}`, "ForeignFieldError");
}
class j1 {
  field() {
    return this._field;
  }
  get size() {
    return this._arr.length;
  }
  constructor(t, n, r) {
    this._field = t, this._arr = this[St] = n, this.check = r;
  }
  get(t) {
    const n = this._arr[t];
    return n === void 0 ? void 0 : Os(this._field, n, this.check);
  }
  set(t, n) {
    if (t < 0 || t >= this._arr.length)
      throw new ge(this._field, `list item #${t + 1}: out of range`);
    if (this.check) {
      const r = qc(this._field, t, n);
      if (r)
        throw r;
    }
    this._arr[t] = ef(this._field, n);
  }
  add(t) {
    if (this.check) {
      const n = qc(this._field, this._arr.length, t);
      if (n)
        throw n;
    }
    this._arr.push(ef(this._field, t));
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
    for (const t of this._arr)
      yield Os(this._field, t, this.check);
  }
  *entries() {
    for (let t = 0; t < this._arr.length; t++)
      yield [t, Os(this._field, this._arr[t], this.check)];
  }
}
class X1 {
  constructor(t, n, r = !0) {
    this.obj = this[St] = n ?? {}, this.check = r, this._field = t;
  }
  field() {
    return this._field;
  }
  set(t, n) {
    if (this.check) {
      const r = K1(this._field, t, n);
      if (r)
        throw r;
    }
    return this.obj[ka(t)] = W1(this._field, n), this;
  }
  delete(t) {
    const n = ka(t), r = Object.prototype.hasOwnProperty.call(this.obj, n);
    return r && delete this.obj[n], r;
  }
  clear() {
    for (const t of Object.keys(this.obj))
      delete this.obj[t];
  }
  get(t) {
    let n = this.obj[ka(t)];
    return n !== void 0 && (n = Ss(this._field, n, this.check)), n;
  }
  has(t) {
    return Object.prototype.hasOwnProperty.call(this.obj, ka(t));
  }
  *keys() {
    for (const t of Object.keys(this.obj))
      yield tf(t, this._field.mapKey);
  }
  *entries() {
    for (const t of Object.entries(this.obj))
      yield [
        tf(t[0], this._field.mapKey),
        Ss(this._field, t[1], this.check)
      ];
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  get size() {
    return Object.keys(this.obj).length;
  }
  *values() {
    for (const t of Object.values(this.obj))
      yield Ss(this._field, t, this.check);
  }
  forEach(t, n) {
    for (const r of this.entries())
      t.call(n, r[1], r[0], this);
  }
}
function Tu(e, t) {
  return hu(t) ? L1(t.message) && !e.oneof && e.fieldKind == "message" ? t.message.value : t.desc.typeName == "google.protobuf.Struct" && e.parent.typeName != "google.protobuf.Value" ? ng(t.message) : t.message : t;
}
function wu(e, t, n) {
  return t !== void 0 && (na(e.message) && !e.oneof && e.fieldKind == "message" ? t = {
    $typeName: e.message.typeName,
    value: _u(e.message.fields[0], t)
  } : e.message.typeName == "google.protobuf.Struct" && e.parent.typeName != "google.protobuf.Value" && Kt(t) && (t = tg(t))), new eg(e.message, t, n);
}
function ef(e, t) {
  return e.listKind == "message" ? Tu(e, t) : Ou(e, t);
}
function Os(e, t, n) {
  return e.listKind == "message" ? wu(e, t, n) : _u(e, t);
}
function W1(e, t) {
  return e.mapKind == "message" ? Tu(e, t) : Ou(e, t);
}
function Ss(e, t, n) {
  return e.mapKind == "message" ? wu(e, t, n) : t;
}
function ka(e) {
  return typeof e == "string" || typeof e == "number" ? e : String(e);
}
function tf(e, t) {
  switch (t) {
    case b.STRING:
      return e;
    case b.INT32:
    case b.FIXED32:
    case b.UINT32:
    case b.SFIXED32:
    case b.SINT32: {
      const n = Number.parseInt(e);
      if (Number.isFinite(n))
        return n;
      break;
    }
    case b.BOOL:
      switch (e) {
        case "true":
          return !0;
        case "false":
          return !1;
      }
      break;
    case b.UINT64:
    case b.FIXED64:
      try {
        return k.uParse(e);
      } catch {
      }
      break;
    default:
      try {
        return k.parse(e);
      } catch {
      }
      break;
  }
  return e;
}
function _u(e, t) {
  switch (e.scalar) {
    case b.INT64:
    case b.SFIXED64:
    case b.SINT64:
      "longAsString" in e && e.longAsString && typeof t == "string" && (t = k.parse(t));
      break;
    case b.FIXED64:
    case b.UINT64:
      "longAsString" in e && e.longAsString && typeof t == "string" && (t = k.uParse(t));
      break;
  }
  return t;
}
function Ou(e, t) {
  switch (e.scalar) {
    case b.INT64:
    case b.SFIXED64:
    case b.SINT64:
      "longAsString" in e && e.longAsString ? t = String(t) : (typeof t == "string" || typeof t == "number") && (t = k.parse(t));
      break;
    case b.FIXED64:
    case b.UINT64:
      "longAsString" in e && e.longAsString ? t = String(t) : (typeof t == "string" || typeof t == "number") && (t = k.uParse(t));
      break;
  }
  return t;
}
function tg(e) {
  const t = {
    $typeName: "google.protobuf.Struct",
    fields: {}
  };
  if (Kt(e))
    for (const [n, r] of Object.entries(e))
      t.fields[n] = ag(r);
  return t;
}
function ng(e) {
  const t = {};
  for (const [n, r] of Object.entries(e.fields))
    t[n] = rg(r);
  return t;
}
function rg(e) {
  switch (e.kind.case) {
    case "structValue":
      return ng(e.kind.value);
    case "listValue":
      return e.kind.value.values.map(rg);
    case "nullValue":
    case void 0:
      return null;
    default:
      return e.kind.value;
  }
}
function ag(e) {
  const t = {
    $typeName: "google.protobuf.Value",
    kind: { case: void 0 }
  };
  switch (typeof e) {
    case "number":
      t.kind = { case: "numberValue", value: e };
      break;
    case "string":
      t.kind = { case: "stringValue", value: e };
      break;
    case "boolean":
      t.kind = { case: "boolValue", value: e };
      break;
    case "object":
      if (e === null)
        t.kind = { case: "nullValue", value: 0 };
      else if (Array.isArray(e)) {
        const n = {
          $typeName: "google.protobuf.ListValue",
          values: []
        };
        if (Array.isArray(e))
          for (const r of e)
            n.values.push(ag(r));
        t.kind = {
          case: "listValue",
          value: n
        };
      } else
        t.kind = {
          case: "structValue",
          value: tg(e)
        };
      break;
  }
  return t;
}
function Su(e) {
  const t = J1();
  let n = e.length * 3 / 4;
  e[e.length - 2] == "=" ? n -= 2 : e[e.length - 1] == "=" && (n -= 1);
  let r = new Uint8Array(n), a = 0, o = 0, s, i = 0;
  for (let u = 0; u < e.length; u++) {
    if (s = t[e.charCodeAt(u)], s === void 0)
      switch (e[u]) {
        // @ts-ignore TS7029: Fallthrough case in switch -- ignore instead of expect-error for compiler settings without noFallthroughCasesInSwitch: true
        case "=":
          o = 0;
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
    switch (o) {
      case 0:
        i = s, o = 1;
        break;
      case 1:
        r[a++] = i << 2 | (s & 48) >> 4, i = s, o = 2;
        break;
      case 2:
        r[a++] = (i & 15) << 4 | (s & 60) >> 2, i = s, o = 3;
        break;
      case 3:
        r[a++] = (i & 3) << 6 | s, o = 0;
        break;
    }
  }
  if (o == 1)
    throw Error("invalid base64 string");
  return r.subarray(0, a);
}
function og(e, t = "std") {
  const n = sg(t), r = t == "std";
  let a = "", o = 0, s, i = 0;
  for (let u = 0; u < e.length; u++)
    switch (s = e[u], o) {
      case 0:
        a += n[s >> 2], i = (s & 3) << 4, o = 1;
        break;
      case 1:
        a += n[i | s >> 4], i = (s & 15) << 2, o = 2;
        break;
      case 2:
        a += n[i | s >> 6], a += n[s & 63], o = 0;
        break;
    }
  return o && (a += n[i], r && (a += "=", o == 1 && (a += "="))), a;
}
let Da, nf, On;
function sg(e) {
  return Da || (Da = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""), nf = Da.slice(0, -2).concat("-", "_")), e == "url" ? (
    // biome-ignore lint/style/noNonNullAssertion: TS fails to narrow down
    nf
  ) : Da;
}
function J1() {
  if (!On) {
    On = [];
    const e = sg("std");
    for (let t = 0; t < e.length; t++)
      On[e[t].charCodeAt(0)] = t;
    On[45] = e.indexOf("+"), On[95] = e.indexOf("/");
  }
  return On;
}
function Tr(e) {
  let t = !1;
  const n = [];
  for (let r = 0; r < e.length; r++) {
    let a = e.charAt(r);
    switch (a) {
      case "_":
        t = !0;
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
        n.push(a), t = !1;
        break;
      default:
        t && (t = !1, a = a.toUpperCase()), n.push(a);
        break;
    }
  }
  return n.join("");
}
const Z1 = /* @__PURE__ */ new Set([
  // names reserved by JavaScript
  "constructor",
  "toString",
  "toJSON",
  "valueOf"
]);
function wr(e) {
  return Z1.has(e) ? e + "$" : e;
}
function ku(e) {
  for (const t of e.field)
    Ir(t, "jsonName") || (t.jsonName = Tr(t.name));
  e.nestedType.forEach(ku);
}
function H1(e, t) {
  const n = e.values.find((r) => r.name === t);
  if (!n)
    throw new Error(`cannot parse ${e} default value: ${t}`);
  return n.number;
}
function z1(e, t) {
  switch (e) {
    case b.STRING:
      return t;
    case b.BYTES: {
      const n = q1(t);
      if (n === !1)
        throw new Error(`cannot parse ${b[e]} default value: ${t}`);
      return n;
    }
    case b.INT64:
    case b.SFIXED64:
    case b.SINT64:
      return k.parse(t);
    case b.UINT64:
    case b.FIXED64:
      return k.uParse(t);
    case b.DOUBLE:
    case b.FLOAT:
      switch (t) {
        case "inf":
          return Number.POSITIVE_INFINITY;
        case "-inf":
          return Number.NEGATIVE_INFINITY;
        case "nan":
          return Number.NaN;
        default:
          return parseFloat(t);
      }
    case b.BOOL:
      return t === "true";
    case b.INT32:
    case b.UINT32:
    case b.SINT32:
    case b.FIXED32:
    case b.SFIXED32:
      return parseInt(t, 10);
  }
}
function q1(e) {
  const t = [], n = {
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
  for (; n.next(); )
    switch (n.c) {
      case "\\":
        if (n.next())
          switch (n.c) {
            case "\\":
              t.push(n.c.charCodeAt(0));
              break;
            case "b":
              t.push(8);
              break;
            case "f":
              t.push(12);
              break;
            case "n":
              t.push(10);
              break;
            case "r":
              t.push(13);
              break;
            case "t":
              t.push(9);
              break;
            case "v":
              t.push(11);
              break;
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7": {
              const r = n.c, a = n.take(2);
              if (a === !1)
                return !1;
              const o = parseInt(r + a, 8);
              if (Number.isNaN(o))
                return !1;
              t.push(o);
              break;
            }
            case "x": {
              const r = n.c, a = n.take(2);
              if (a === !1)
                return !1;
              const o = parseInt(r + a, 16);
              if (Number.isNaN(o))
                return !1;
              t.push(o);
              break;
            }
            case "u": {
              const r = n.c, a = n.take(4);
              if (a === !1)
                return !1;
              const o = parseInt(r + a, 16);
              if (Number.isNaN(o))
                return !1;
              const s = new Uint8Array(4);
              new DataView(s.buffer).setInt32(0, o, !0), t.push(s[0], s[1], s[2], s[3]);
              break;
            }
            case "U": {
              const r = n.c, a = n.take(8);
              if (a === !1)
                return !1;
              const o = k.uEnc(r + a), s = new Uint8Array(8), i = new DataView(s.buffer);
              i.setInt32(0, o.lo, !0), i.setInt32(4, o.hi, !0), t.push(s[0], s[1], s[2], s[3], s[4], s[5], s[6], s[7]);
              break;
            }
          }
        break;
      default:
        t.push(n.c.charCodeAt(0));
    }
  return new Uint8Array(t);
}
function* ui(e) {
  switch (e.kind) {
    case "file":
      for (const t of e.messages)
        yield t, yield* ui(t);
      yield* e.enums, yield* e.services, yield* e.extensions;
      break;
    case "message":
      for (const t of e.nestedMessages)
        yield t, yield* ui(t);
      yield* e.nestedEnums, yield* e.nestedExtensions;
      break;
  }
}
function ig(...e) {
  const t = Q1();
  if (!e.length)
    return t;
  if ("$typeName" in e[0] && e[0].$typeName == "google.protobuf.FileDescriptorSet") {
    for (const n of e[0].file)
      uf(n, t);
    return t;
  }
  if ("$typeName" in e[0]) {
    let n = function(s) {
      const i = [];
      for (const u of s.dependency) {
        if (t.getFile(u) != null || o.has(u))
          continue;
        const l = a(u);
        if (!l)
          throw new Error(`Unable to resolve ${u}, imported by ${s.name}`);
        "kind" in l ? t.addFile(l, !1, !0) : (o.add(l.name), i.push(l));
      }
      return i.concat(...i.map(n));
    };
    const r = e[0], a = e[1], o = /* @__PURE__ */ new Set();
    for (const s of [r, ...n(r)].reverse())
      uf(s, t);
  } else
    for (const n of e)
      for (const r of n.files)
        t.addFile(r);
  return t;
}
function Q1() {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
  return {
    kind: "registry",
    types: e,
    extendees: t,
    [Symbol.iterator]() {
      return e.values();
    },
    get files() {
      return n.values();
    },
    addFile(r, a, o) {
      if (n.set(r.proto.name, r), !a)
        for (const s of ui(r))
          this.add(s);
      if (o)
        for (const s of r.dependencies)
          this.addFile(s, a, o);
    },
    add(r) {
      if (r.kind == "extension") {
        let a = t.get(r.extendee.typeName);
        a || t.set(
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
      return n.get(r);
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
      var o;
      return (o = t.get(r.typeName)) === null || o === void 0 ? void 0 : o.get(a);
    },
    getService(r) {
      const a = e.get(r);
      return a?.kind == "service" ? a : void 0;
    }
  };
}
const eI = 998, tI = 999, nI = 9, _r = 10, lr = 11, rI = 12, rf = 14, Du = 3, aI = 2, af = 1, oI = 0, of = 1, sf = 2, sI = 3, iI = 1, uI = 2, lI = 1, ug = {
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
function uf(e, t) {
  var n, r;
  const a = {
    kind: "file",
    proto: e,
    deprecated: (r = (n = e.options) === null || n === void 0 ? void 0 : n.deprecated) !== null && r !== void 0 ? r : !1,
    edition: dI(e),
    name: e.name.replace(/\.proto$/, ""),
    dependencies: pI(e, t),
    enums: [],
    messages: [],
    extensions: [],
    services: [],
    toString() {
      return `file ${e.name}`;
    }
  }, o = /* @__PURE__ */ new Map(), s = {
    get(i) {
      return o.get(i);
    },
    add(i) {
      var u;
      Je(((u = i.proto.options) === null || u === void 0 ? void 0 : u.mapEntry) === !0), o.set(i.typeName, i);
    }
  };
  for (const i of e.enumType)
    lg(i, a, void 0, t);
  for (const i of e.messageType)
    cg(i, a, void 0, t, s);
  for (const i of e.service)
    cI(i, a, t);
  li(a, t);
  for (const i of o.values())
    ci(i, t, s);
  for (const i of a.messages)
    ci(i, t, s), li(i, t);
  t.addFile(a, !0);
}
function li(e, t) {
  switch (e.kind) {
    case "file":
      for (const n of e.proto.extension) {
        const r = fi(n, e, t);
        e.extensions.push(r), t.add(r);
      }
      break;
    case "message":
      for (const n of e.proto.extension) {
        const r = fi(n, e, t);
        e.nestedExtensions.push(r), t.add(r);
      }
      for (const n of e.nestedMessages)
        li(n, t);
      break;
  }
}
function ci(e, t, n) {
  const r = e.proto.oneofDecl.map((o) => mI(o, e)), a = /* @__PURE__ */ new Set();
  for (const o of e.proto.field) {
    const s = hI(o, r), i = fi(o, e, t, s, n);
    e.fields.push(i), e.field[i.localName] = i, s === void 0 ? e.members.push(i) : (s.fields.push(i), a.has(s) || (a.add(s), e.members.push(s)));
  }
  for (const o of r.filter((s) => a.has(s)))
    e.oneofs.push(o);
  for (const o of e.nestedMessages)
    ci(o, t, n);
}
function lg(e, t, n, r) {
  var a, o, s, i, u;
  const l = bI(e.name, e.value), c = {
    kind: "enum",
    proto: e,
    deprecated: (o = (a = e.options) === null || a === void 0 ? void 0 : a.deprecated) !== null && o !== void 0 ? o : !1,
    file: t,
    parent: n,
    open: !0,
    name: e.name,
    typeName: jo(e, n, t),
    value: {},
    values: [],
    sharedPrefix: l,
    toString() {
      return `enum ${this.typeName}`;
    }
  };
  c.open = vI(c), r.add(c);
  for (const m of e.value) {
    const d = m.name;
    c.values.push(
      // biome-ignore lint/suspicious/noAssignInExpressions: no
      c.value[m.number] = {
        kind: "enum_value",
        proto: m,
        deprecated: (i = (s = m.options) === null || s === void 0 ? void 0 : s.deprecated) !== null && i !== void 0 ? i : !1,
        parent: c,
        name: d,
        localName: wr(l == null ? d : d.substring(l.length)),
        number: m.number,
        toString() {
          return `enum value ${c.typeName}.${d}`;
        }
      }
    );
  }
  ((u = n?.nestedEnums) !== null && u !== void 0 ? u : t.enums).push(c);
}
function cg(e, t, n, r, a) {
  var o, s, i, u;
  const l = {
    kind: "message",
    proto: e,
    deprecated: (s = (o = e.options) === null || o === void 0 ? void 0 : o.deprecated) !== null && s !== void 0 ? s : !1,
    file: t,
    parent: n,
    name: e.name,
    typeName: jo(e, n, t),
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
  ((i = e.options) === null || i === void 0 ? void 0 : i.mapEntry) === !0 ? a.add(l) : (((u = n?.nestedMessages) !== null && u !== void 0 ? u : t.messages).push(l), r.add(l));
  for (const c of e.enumType)
    lg(c, t, l, r);
  for (const c of e.nestedType)
    cg(c, t, l, r, a);
}
function cI(e, t, n) {
  var r, a;
  const o = {
    kind: "service",
    proto: e,
    deprecated: (a = (r = e.options) === null || r === void 0 ? void 0 : r.deprecated) !== null && a !== void 0 ? a : !1,
    file: t,
    name: e.name,
    typeName: jo(e, void 0, t),
    methods: [],
    method: {},
    toString() {
      return `service ${this.typeName}`;
    }
  };
  t.services.push(o), n.add(o);
  for (const s of e.method) {
    const i = fI(s, o, n);
    o.methods.push(i), o.method[i.localName] = i;
  }
}
function fI(e, t, n) {
  var r, a, o, s;
  let i;
  e.clientStreaming && e.serverStreaming ? i = "bidi_streaming" : e.clientStreaming ? i = "client_streaming" : e.serverStreaming ? i = "server_streaming" : i = "unary";
  const u = n.getMessage(Nt(e.inputType)), l = n.getMessage(Nt(e.outputType));
  Je(u, `invalid MethodDescriptorProto: input_type ${e.inputType} not found`), Je(l, `invalid MethodDescriptorProto: output_type ${e.inputType} not found`);
  const c = e.name;
  return {
    kind: "rpc",
    proto: e,
    deprecated: (a = (r = e.options) === null || r === void 0 ? void 0 : r.deprecated) !== null && a !== void 0 ? a : !1,
    parent: t,
    name: c,
    localName: wr(c.length ? wr(c[0].toLowerCase() + c.substring(1)) : c),
    methodKind: i,
    input: u,
    output: l,
    idempotency: (s = (o = e.options) === null || o === void 0 ? void 0 : o.idempotencyLevel) !== null && s !== void 0 ? s : oI,
    toString() {
      return `rpc ${t.typeName}.${c}`;
    }
  };
}
function mI(e, t) {
  return {
    kind: "oneof",
    proto: e,
    deprecated: !1,
    parent: t,
    fields: [],
    name: e.name,
    localName: wr(Tr(e.name)),
    toString() {
      return `oneof ${t.typeName}.${this.name}`;
    }
  };
}
function fi(e, t, n, r, a) {
  var o, s, i;
  const u = a === void 0, l = {
    kind: "field",
    proto: e,
    deprecated: (s = (o = e.options) === null || o === void 0 ? void 0 : o.deprecated) !== null && s !== void 0 ? s : !1,
    name: e.name,
    number: e.number,
    scalar: void 0,
    message: void 0,
    enum: void 0,
    presence: yI(e, r, u, t),
    listKind: void 0,
    mapKind: void 0,
    mapKey: void 0,
    delimitedEncoding: void 0,
    packed: void 0,
    longAsString: !1,
    getDefaultValue: void 0
  };
  if (u) {
    const f = t.kind == "file" ? t : t.file, y = t.kind == "file" ? void 0 : t, E = jo(e, y, f);
    l.kind = "extension", l.file = f, l.parent = y, l.oneof = void 0, l.typeName = E, l.jsonName = `[${E}]`, l.toString = () => `extension ${E}`;
    const N = n.getMessage(Nt(e.extendee));
    Je(N, `invalid FieldDescriptorProto: extendee ${e.extendee} not found`), l.extendee = N;
  } else {
    const f = t;
    Je(f.kind == "message"), l.parent = f, l.oneof = r, l.localName = r ? Tr(e.name) : wr(Tr(e.name)), l.jsonName = e.jsonName, l.toString = () => `field ${f.typeName}.${e.name}`;
  }
  const c = e.label, m = e.type, d = (i = e.options) === null || i === void 0 ? void 0 : i.jstype;
  if (c === Du) {
    const f = m == lr ? a?.get(Nt(e.typeName)) : void 0;
    if (f) {
      l.fieldKind = "map";
      const { key: y, value: E } = NI(f);
      return l.mapKey = y.scalar, l.mapKind = E.fieldKind, l.message = E.message, l.delimitedEncoding = !1, l.enum = E.enum, l.scalar = E.scalar, l;
    }
    switch (l.fieldKind = "list", m) {
      case lr:
      case _r:
        l.listKind = "message", l.message = n.getMessage(Nt(e.typeName)), Je(l.message), l.delimitedEncoding = lf(e, t);
        break;
      case rf:
        l.listKind = "enum", l.enum = n.getEnum(Nt(e.typeName)), Je(l.enum);
        break;
      default:
        l.listKind = "scalar", l.scalar = m, l.longAsString = d == af;
        break;
    }
    return l.packed = EI(e, t), l;
  }
  switch (m) {
    case lr:
    case _r:
      l.fieldKind = "message", l.message = n.getMessage(Nt(e.typeName)), Je(l.message, `invalid FieldDescriptorProto: type_name ${e.typeName} not found`), l.delimitedEncoding = lf(e, t), l.getDefaultValue = () => {
      };
      break;
    case rf: {
      const f = n.getEnum(Nt(e.typeName));
      Je(f !== void 0, `invalid FieldDescriptorProto: type_name ${e.typeName} not found`), l.fieldKind = "enum", l.enum = n.getEnum(Nt(e.typeName)), l.getDefaultValue = () => Ir(e, "defaultValue") ? H1(f, e.defaultValue) : void 0;
      break;
    }
    default: {
      l.fieldKind = "scalar", l.scalar = m, l.longAsString = d == af, l.getDefaultValue = () => Ir(e, "defaultValue") ? z1(m, e.defaultValue) : void 0;
      break;
    }
  }
  return l;
}
function dI(e) {
  switch (e.syntax) {
    case "":
    case "proto2":
      return eI;
    case "proto3":
      return tI;
    case "editions":
      if (e.edition in ug)
        return e.edition;
      throw new Error(`${e.name}: unsupported edition`);
    default:
      throw new Error(`${e.name}: unsupported syntax "${e.syntax}"`);
  }
}
function pI(e, t) {
  return e.dependency.map((n) => {
    const r = t.getFile(n);
    if (!r)
      throw new Error(`Cannot find ${n}, imported by ${e.name}`);
    return r;
  });
}
function bI(e, t) {
  const n = gI(e) + "_";
  for (const r of t) {
    if (!r.name.toLowerCase().startsWith(n))
      return;
    const a = r.name.substring(n.length);
    if (a.length == 0 || /^\d/.test(a))
      return;
  }
  return n;
}
function gI(e) {
  return (e.substring(0, 1) + e.substring(1).replace(/[A-Z]/g, (t) => "_" + t)).toLowerCase();
}
function jo(e, t, n) {
  let r;
  return t ? r = `${t.typeName}.${e.name}` : n.proto.package.length > 0 ? r = `${n.proto.package}.${e.name}` : r = `${e.name}`, r;
}
function Nt(e) {
  return e.startsWith(".") ? e.substring(1) : e;
}
function hI(e, t) {
  if (!Ir(e, "oneofIndex") || e.proto3Optional)
    return;
  const n = t[e.oneofIndex];
  return Je(n, `invalid FieldDescriptorProto: oneof #${e.oneofIndex} for field #${e.number} not found`), n;
}
function yI(e, t, n, r) {
  if (e.label == aI)
    return sI;
  if (e.label == Du)
    return sf;
  if (t || e.proto3Optional || n)
    return of;
  const a = Gn("fieldPresence", { proto: e, parent: r });
  return a == sf && (e.type == lr || e.type == _r) ? of : a;
}
function EI(e, t) {
  if (e.label != Du)
    return !1;
  switch (e.type) {
    case nI:
    case rI:
    case _r:
    case lr:
      return !1;
  }
  const n = e.options;
  return n && Ir(n, "packed") ? n.packed : iI == Gn("repeatedFieldEncoding", {
    proto: e,
    parent: t
  });
}
function NI(e) {
  const t = e.fields.find((r) => r.number === 1), n = e.fields.find((r) => r.number === 2);
  return Je(t && t.fieldKind == "scalar" && t.scalar != b.BYTES && t.scalar != b.FLOAT && t.scalar != b.DOUBLE && n && n.fieldKind != "list" && n.fieldKind != "map"), { key: t, value: n };
}
function vI(e) {
  var t;
  return lI == Gn("enumType", {
    proto: e.proto,
    parent: (t = e.parent) !== null && t !== void 0 ? t : e.file
  });
}
function lf(e, t) {
  return e.type == _r ? !0 : uI == Gn("messageEncoding", {
    proto: e,
    parent: t
  });
}
function Gn(e, t) {
  var n, r;
  const a = (n = t.proto.options) === null || n === void 0 ? void 0 : n.features;
  if (a) {
    const o = a[e];
    if (o != 0)
      return o;
  }
  if ("kind" in t) {
    if (t.kind == "message")
      return Gn(e, (r = t.parent) !== null && r !== void 0 ? r : t.file);
    const o = ug[t.edition];
    if (!o)
      throw new Error(`feature default for edition ${t.edition} not found`);
    return o[e];
  }
  return Gn(e, t.parent);
}
function Je(e, t) {
  if (!e)
    throw new Error(t);
}
function II(e) {
  const t = TI(e);
  return t.messageType.forEach(ku), ig(t, () => {
  }).getFile(t.name);
}
function TI(e) {
  return Object.assign(/* @__PURE__ */ Object.create({
    syntax: "",
    edition: 0
  }), Object.assign(Object.assign({ $typeName: "google.protobuf.FileDescriptorProto", dependency: [], publicDependency: [], weakDependency: [], optionDependency: [], service: [], extension: [] }, e), { messageType: e.messageType.map(fg), enumType: e.enumType.map(mg) }));
}
function fg(e) {
  var t, n, r, a, o, s, i, u;
  return Object.assign(/* @__PURE__ */ Object.create({
    visibility: 0
  }), {
    $typeName: "google.protobuf.DescriptorProto",
    name: e.name,
    field: (n = (t = e.field) === null || t === void 0 ? void 0 : t.map(wI)) !== null && n !== void 0 ? n : [],
    extension: [],
    nestedType: (a = (r = e.nestedType) === null || r === void 0 ? void 0 : r.map(fg)) !== null && a !== void 0 ? a : [],
    enumType: (s = (o = e.enumType) === null || o === void 0 ? void 0 : o.map(mg)) !== null && s !== void 0 ? s : [],
    extensionRange: (u = (i = e.extensionRange) === null || i === void 0 ? void 0 : i.map((l) => Object.assign({ $typeName: "google.protobuf.DescriptorProto.ExtensionRange" }, l))) !== null && u !== void 0 ? u : [],
    oneofDecl: [],
    reservedRange: [],
    reservedName: []
  });
}
function wI(e) {
  return Object.assign(/* @__PURE__ */ Object.create({
    label: 1,
    typeName: "",
    extendee: "",
    defaultValue: "",
    oneofIndex: 0,
    jsonName: "",
    proto3Optional: !1
  }), Object.assign(Object.assign({ $typeName: "google.protobuf.FieldDescriptorProto" }, e), { options: e.options ? _I(e.options) : void 0 }));
}
function _I(e) {
  var t, n, r;
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
  }), Object.assign(Object.assign({ $typeName: "google.protobuf.FieldOptions" }, e), { targets: (t = e.targets) !== null && t !== void 0 ? t : [], editionDefaults: (r = (n = e.editionDefaults) === null || n === void 0 ? void 0 : n.map((a) => Object.assign({ $typeName: "google.protobuf.FieldOptions.EditionDefault" }, a))) !== null && r !== void 0 ? r : [], uninterpretedOption: [] }));
}
function mg(e) {
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
function ra(e, t, ...n) {
  return n.reduce((r, a) => r.nestedMessages[a], e.messages[t]);
}
const OI = /* @__PURE__ */ II({ name: "google/protobuf/descriptor.proto", package: "google.protobuf", messageType: [{ name: "FileDescriptorSet", field: [{ name: "file", number: 1, type: 11, label: 3, typeName: ".google.protobuf.FileDescriptorProto" }], extensionRange: [{ start: 536e6, end: 536000001 }] }, { name: "FileDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "package", number: 2, type: 9, label: 1 }, { name: "dependency", number: 3, type: 9, label: 3 }, { name: "public_dependency", number: 10, type: 5, label: 3 }, { name: "weak_dependency", number: 11, type: 5, label: 3 }, { name: "option_dependency", number: 15, type: 9, label: 3 }, { name: "message_type", number: 4, type: 11, label: 3, typeName: ".google.protobuf.DescriptorProto" }, { name: "enum_type", number: 5, type: 11, label: 3, typeName: ".google.protobuf.EnumDescriptorProto" }, { name: "service", number: 6, type: 11, label: 3, typeName: ".google.protobuf.ServiceDescriptorProto" }, { name: "extension", number: 7, type: 11, label: 3, typeName: ".google.protobuf.FieldDescriptorProto" }, { name: "options", number: 8, type: 11, label: 1, typeName: ".google.protobuf.FileOptions" }, { name: "source_code_info", number: 9, type: 11, label: 1, typeName: ".google.protobuf.SourceCodeInfo" }, { name: "syntax", number: 12, type: 9, label: 1 }, { name: "edition", number: 14, type: 14, label: 1, typeName: ".google.protobuf.Edition" }] }, { name: "DescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "field", number: 2, type: 11, label: 3, typeName: ".google.protobuf.FieldDescriptorProto" }, { name: "extension", number: 6, type: 11, label: 3, typeName: ".google.protobuf.FieldDescriptorProto" }, { name: "nested_type", number: 3, type: 11, label: 3, typeName: ".google.protobuf.DescriptorProto" }, { name: "enum_type", number: 4, type: 11, label: 3, typeName: ".google.protobuf.EnumDescriptorProto" }, { name: "extension_range", number: 5, type: 11, label: 3, typeName: ".google.protobuf.DescriptorProto.ExtensionRange" }, { name: "oneof_decl", number: 8, type: 11, label: 3, typeName: ".google.protobuf.OneofDescriptorProto" }, { name: "options", number: 7, type: 11, label: 1, typeName: ".google.protobuf.MessageOptions" }, { name: "reserved_range", number: 9, type: 11, label: 3, typeName: ".google.protobuf.DescriptorProto.ReservedRange" }, { name: "reserved_name", number: 10, type: 9, label: 3 }, { name: "visibility", number: 11, type: 14, label: 1, typeName: ".google.protobuf.SymbolVisibility" }], nestedType: [{ name: "ExtensionRange", field: [{ name: "start", number: 1, type: 5, label: 1 }, { name: "end", number: 2, type: 5, label: 1 }, { name: "options", number: 3, type: 11, label: 1, typeName: ".google.protobuf.ExtensionRangeOptions" }] }, { name: "ReservedRange", field: [{ name: "start", number: 1, type: 5, label: 1 }, { name: "end", number: 2, type: 5, label: 1 }] }] }, { name: "ExtensionRangeOptions", field: [{ name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }, { name: "declaration", number: 2, type: 11, label: 3, typeName: ".google.protobuf.ExtensionRangeOptions.Declaration", options: { retention: 2 } }, { name: "features", number: 50, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "verification", number: 3, type: 14, label: 1, typeName: ".google.protobuf.ExtensionRangeOptions.VerificationState", defaultValue: "UNVERIFIED", options: { retention: 2 } }], nestedType: [{ name: "Declaration", field: [{ name: "number", number: 1, type: 5, label: 1 }, { name: "full_name", number: 2, type: 9, label: 1 }, { name: "type", number: 3, type: 9, label: 1 }, { name: "reserved", number: 5, type: 8, label: 1 }, { name: "repeated", number: 6, type: 8, label: 1 }] }], enumType: [{ name: "VerificationState", value: [{ name: "DECLARATION", number: 0 }, { name: "UNVERIFIED", number: 1 }] }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "FieldDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "number", number: 3, type: 5, label: 1 }, { name: "label", number: 4, type: 14, label: 1, typeName: ".google.protobuf.FieldDescriptorProto.Label" }, { name: "type", number: 5, type: 14, label: 1, typeName: ".google.protobuf.FieldDescriptorProto.Type" }, { name: "type_name", number: 6, type: 9, label: 1 }, { name: "extendee", number: 2, type: 9, label: 1 }, { name: "default_value", number: 7, type: 9, label: 1 }, { name: "oneof_index", number: 9, type: 5, label: 1 }, { name: "json_name", number: 10, type: 9, label: 1 }, { name: "options", number: 8, type: 11, label: 1, typeName: ".google.protobuf.FieldOptions" }, { name: "proto3_optional", number: 17, type: 8, label: 1 }], enumType: [{ name: "Type", value: [{ name: "TYPE_DOUBLE", number: 1 }, { name: "TYPE_FLOAT", number: 2 }, { name: "TYPE_INT64", number: 3 }, { name: "TYPE_UINT64", number: 4 }, { name: "TYPE_INT32", number: 5 }, { name: "TYPE_FIXED64", number: 6 }, { name: "TYPE_FIXED32", number: 7 }, { name: "TYPE_BOOL", number: 8 }, { name: "TYPE_STRING", number: 9 }, { name: "TYPE_GROUP", number: 10 }, { name: "TYPE_MESSAGE", number: 11 }, { name: "TYPE_BYTES", number: 12 }, { name: "TYPE_UINT32", number: 13 }, { name: "TYPE_ENUM", number: 14 }, { name: "TYPE_SFIXED32", number: 15 }, { name: "TYPE_SFIXED64", number: 16 }, { name: "TYPE_SINT32", number: 17 }, { name: "TYPE_SINT64", number: 18 }] }, { name: "Label", value: [{ name: "LABEL_OPTIONAL", number: 1 }, { name: "LABEL_REPEATED", number: 3 }, { name: "LABEL_REQUIRED", number: 2 }] }] }, { name: "OneofDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "options", number: 2, type: 11, label: 1, typeName: ".google.protobuf.OneofOptions" }] }, { name: "EnumDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "value", number: 2, type: 11, label: 3, typeName: ".google.protobuf.EnumValueDescriptorProto" }, { name: "options", number: 3, type: 11, label: 1, typeName: ".google.protobuf.EnumOptions" }, { name: "reserved_range", number: 4, type: 11, label: 3, typeName: ".google.protobuf.EnumDescriptorProto.EnumReservedRange" }, { name: "reserved_name", number: 5, type: 9, label: 3 }, { name: "visibility", number: 6, type: 14, label: 1, typeName: ".google.protobuf.SymbolVisibility" }], nestedType: [{ name: "EnumReservedRange", field: [{ name: "start", number: 1, type: 5, label: 1 }, { name: "end", number: 2, type: 5, label: 1 }] }] }, { name: "EnumValueDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "number", number: 2, type: 5, label: 1 }, { name: "options", number: 3, type: 11, label: 1, typeName: ".google.protobuf.EnumValueOptions" }] }, { name: "ServiceDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "method", number: 2, type: 11, label: 3, typeName: ".google.protobuf.MethodDescriptorProto" }, { name: "options", number: 3, type: 11, label: 1, typeName: ".google.protobuf.ServiceOptions" }] }, { name: "MethodDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "input_type", number: 2, type: 9, label: 1 }, { name: "output_type", number: 3, type: 9, label: 1 }, { name: "options", number: 4, type: 11, label: 1, typeName: ".google.protobuf.MethodOptions" }, { name: "client_streaming", number: 5, type: 8, label: 1, defaultValue: "false" }, { name: "server_streaming", number: 6, type: 8, label: 1, defaultValue: "false" }] }, { name: "FileOptions", field: [{ name: "java_package", number: 1, type: 9, label: 1 }, { name: "java_outer_classname", number: 8, type: 9, label: 1 }, { name: "java_multiple_files", number: 10, type: 8, label: 1, defaultValue: "false" }, { name: "java_generate_equals_and_hash", number: 20, type: 8, label: 1, options: { deprecated: !0 } }, { name: "java_string_check_utf8", number: 27, type: 8, label: 1, defaultValue: "false" }, { name: "optimize_for", number: 9, type: 14, label: 1, typeName: ".google.protobuf.FileOptions.OptimizeMode", defaultValue: "SPEED" }, { name: "go_package", number: 11, type: 9, label: 1 }, { name: "cc_generic_services", number: 16, type: 8, label: 1, defaultValue: "false" }, { name: "java_generic_services", number: 17, type: 8, label: 1, defaultValue: "false" }, { name: "py_generic_services", number: 18, type: 8, label: 1, defaultValue: "false" }, { name: "deprecated", number: 23, type: 8, label: 1, defaultValue: "false" }, { name: "cc_enable_arenas", number: 31, type: 8, label: 1, defaultValue: "true" }, { name: "objc_class_prefix", number: 36, type: 9, label: 1 }, { name: "csharp_namespace", number: 37, type: 9, label: 1 }, { name: "swift_prefix", number: 39, type: 9, label: 1 }, { name: "php_class_prefix", number: 40, type: 9, label: 1 }, { name: "php_namespace", number: 41, type: 9, label: 1 }, { name: "php_metadata_namespace", number: 44, type: 9, label: 1 }, { name: "ruby_package", number: 45, type: 9, label: 1 }, { name: "features", number: 50, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], enumType: [{ name: "OptimizeMode", value: [{ name: "SPEED", number: 1 }, { name: "CODE_SIZE", number: 2 }, { name: "LITE_RUNTIME", number: 3 }] }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "MessageOptions", field: [{ name: "message_set_wire_format", number: 1, type: 8, label: 1, defaultValue: "false" }, { name: "no_standard_descriptor_accessor", number: 2, type: 8, label: 1, defaultValue: "false" }, { name: "deprecated", number: 3, type: 8, label: 1, defaultValue: "false" }, { name: "map_entry", number: 7, type: 8, label: 1 }, { name: "deprecated_legacy_json_field_conflicts", number: 11, type: 8, label: 1, options: { deprecated: !0 } }, { name: "features", number: 12, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "FieldOptions", field: [{ name: "ctype", number: 1, type: 14, label: 1, typeName: ".google.protobuf.FieldOptions.CType", defaultValue: "STRING" }, { name: "packed", number: 2, type: 8, label: 1 }, { name: "jstype", number: 6, type: 14, label: 1, typeName: ".google.protobuf.FieldOptions.JSType", defaultValue: "JS_NORMAL" }, { name: "lazy", number: 5, type: 8, label: 1, defaultValue: "false" }, { name: "unverified_lazy", number: 15, type: 8, label: 1, defaultValue: "false" }, { name: "deprecated", number: 3, type: 8, label: 1, defaultValue: "false" }, { name: "weak", number: 10, type: 8, label: 1, defaultValue: "false", options: { deprecated: !0 } }, { name: "debug_redact", number: 16, type: 8, label: 1, defaultValue: "false" }, { name: "retention", number: 17, type: 14, label: 1, typeName: ".google.protobuf.FieldOptions.OptionRetention" }, { name: "targets", number: 19, type: 14, label: 3, typeName: ".google.protobuf.FieldOptions.OptionTargetType" }, { name: "edition_defaults", number: 20, type: 11, label: 3, typeName: ".google.protobuf.FieldOptions.EditionDefault" }, { name: "features", number: 21, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "feature_support", number: 22, type: 11, label: 1, typeName: ".google.protobuf.FieldOptions.FeatureSupport" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], nestedType: [{ name: "EditionDefault", field: [{ name: "edition", number: 3, type: 14, label: 1, typeName: ".google.protobuf.Edition" }, { name: "value", number: 2, type: 9, label: 1 }] }, { name: "FeatureSupport", field: [{ name: "edition_introduced", number: 1, type: 14, label: 1, typeName: ".google.protobuf.Edition" }, { name: "edition_deprecated", number: 2, type: 14, label: 1, typeName: ".google.protobuf.Edition" }, { name: "deprecation_warning", number: 3, type: 9, label: 1 }, { name: "edition_removed", number: 4, type: 14, label: 1, typeName: ".google.protobuf.Edition" }] }], enumType: [{ name: "CType", value: [{ name: "STRING", number: 0 }, { name: "CORD", number: 1 }, { name: "STRING_PIECE", number: 2 }] }, { name: "JSType", value: [{ name: "JS_NORMAL", number: 0 }, { name: "JS_STRING", number: 1 }, { name: "JS_NUMBER", number: 2 }] }, { name: "OptionRetention", value: [{ name: "RETENTION_UNKNOWN", number: 0 }, { name: "RETENTION_RUNTIME", number: 1 }, { name: "RETENTION_SOURCE", number: 2 }] }, { name: "OptionTargetType", value: [{ name: "TARGET_TYPE_UNKNOWN", number: 0 }, { name: "TARGET_TYPE_FILE", number: 1 }, { name: "TARGET_TYPE_EXTENSION_RANGE", number: 2 }, { name: "TARGET_TYPE_MESSAGE", number: 3 }, { name: "TARGET_TYPE_FIELD", number: 4 }, { name: "TARGET_TYPE_ONEOF", number: 5 }, { name: "TARGET_TYPE_ENUM", number: 6 }, { name: "TARGET_TYPE_ENUM_ENTRY", number: 7 }, { name: "TARGET_TYPE_SERVICE", number: 8 }, { name: "TARGET_TYPE_METHOD", number: 9 }] }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "OneofOptions", field: [{ name: "features", number: 1, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "EnumOptions", field: [{ name: "allow_alias", number: 2, type: 8, label: 1 }, { name: "deprecated", number: 3, type: 8, label: 1, defaultValue: "false" }, { name: "deprecated_legacy_json_field_conflicts", number: 6, type: 8, label: 1, options: { deprecated: !0 } }, { name: "features", number: 7, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "EnumValueOptions", field: [{ name: "deprecated", number: 1, type: 8, label: 1, defaultValue: "false" }, { name: "features", number: 2, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "debug_redact", number: 3, type: 8, label: 1, defaultValue: "false" }, { name: "feature_support", number: 4, type: 11, label: 1, typeName: ".google.protobuf.FieldOptions.FeatureSupport" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "ServiceOptions", field: [{ name: "features", number: 34, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "deprecated", number: 33, type: 8, label: 1, defaultValue: "false" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "MethodOptions", field: [{ name: "deprecated", number: 33, type: 8, label: 1, defaultValue: "false" }, { name: "idempotency_level", number: 34, type: 14, label: 1, typeName: ".google.protobuf.MethodOptions.IdempotencyLevel", defaultValue: "IDEMPOTENCY_UNKNOWN" }, { name: "features", number: 35, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], enumType: [{ name: "IdempotencyLevel", value: [{ name: "IDEMPOTENCY_UNKNOWN", number: 0 }, { name: "NO_SIDE_EFFECTS", number: 1 }, { name: "IDEMPOTENT", number: 2 }] }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "UninterpretedOption", field: [{ name: "name", number: 2, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption.NamePart" }, { name: "identifier_value", number: 3, type: 9, label: 1 }, { name: "positive_int_value", number: 4, type: 4, label: 1 }, { name: "negative_int_value", number: 5, type: 3, label: 1 }, { name: "double_value", number: 6, type: 1, label: 1 }, { name: "string_value", number: 7, type: 12, label: 1 }, { name: "aggregate_value", number: 8, type: 9, label: 1 }], nestedType: [{ name: "NamePart", field: [{ name: "name_part", number: 1, type: 9, label: 2 }, { name: "is_extension", number: 2, type: 8, label: 2 }] }] }, { name: "FeatureSet", field: [{ name: "field_presence", number: 1, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.FieldPresence", options: { retention: 1, targets: [4, 1], editionDefaults: [{ value: "EXPLICIT", edition: 900 }, { value: "IMPLICIT", edition: 999 }, { value: "EXPLICIT", edition: 1e3 }] } }, { name: "enum_type", number: 2, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.EnumType", options: { retention: 1, targets: [6, 1], editionDefaults: [{ value: "CLOSED", edition: 900 }, { value: "OPEN", edition: 999 }] } }, { name: "repeated_field_encoding", number: 3, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.RepeatedFieldEncoding", options: { retention: 1, targets: [4, 1], editionDefaults: [{ value: "EXPANDED", edition: 900 }, { value: "PACKED", edition: 999 }] } }, { name: "utf8_validation", number: 4, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.Utf8Validation", options: { retention: 1, targets: [4, 1], editionDefaults: [{ value: "NONE", edition: 900 }, { value: "VERIFY", edition: 999 }] } }, { name: "message_encoding", number: 5, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.MessageEncoding", options: { retention: 1, targets: [4, 1], editionDefaults: [{ value: "LENGTH_PREFIXED", edition: 900 }] } }, { name: "json_format", number: 6, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.JsonFormat", options: { retention: 1, targets: [3, 6, 1], editionDefaults: [{ value: "LEGACY_BEST_EFFORT", edition: 900 }, { value: "ALLOW", edition: 999 }] } }, { name: "enforce_naming_style", number: 7, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.EnforceNamingStyle", options: { retention: 2, targets: [1, 2, 3, 4, 5, 6, 7, 8, 9], editionDefaults: [{ value: "STYLE_LEGACY", edition: 900 }, { value: "STYLE2024", edition: 1001 }] } }, { name: "default_symbol_visibility", number: 8, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.VisibilityFeature.DefaultSymbolVisibility", options: { retention: 2, targets: [1], editionDefaults: [{ value: "EXPORT_ALL", edition: 900 }, { value: "EXPORT_TOP_LEVEL", edition: 1001 }] } }], nestedType: [{ name: "VisibilityFeature", enumType: [{ name: "DefaultSymbolVisibility", value: [{ name: "DEFAULT_SYMBOL_VISIBILITY_UNKNOWN", number: 0 }, { name: "EXPORT_ALL", number: 1 }, { name: "EXPORT_TOP_LEVEL", number: 2 }, { name: "LOCAL_ALL", number: 3 }, { name: "STRICT", number: 4 }] }] }], enumType: [{ name: "FieldPresence", value: [{ name: "FIELD_PRESENCE_UNKNOWN", number: 0 }, { name: "EXPLICIT", number: 1 }, { name: "IMPLICIT", number: 2 }, { name: "LEGACY_REQUIRED", number: 3 }] }, { name: "EnumType", value: [{ name: "ENUM_TYPE_UNKNOWN", number: 0 }, { name: "OPEN", number: 1 }, { name: "CLOSED", number: 2 }] }, { name: "RepeatedFieldEncoding", value: [{ name: "REPEATED_FIELD_ENCODING_UNKNOWN", number: 0 }, { name: "PACKED", number: 1 }, { name: "EXPANDED", number: 2 }] }, { name: "Utf8Validation", value: [{ name: "UTF8_VALIDATION_UNKNOWN", number: 0 }, { name: "VERIFY", number: 2 }, { name: "NONE", number: 3 }] }, { name: "MessageEncoding", value: [{ name: "MESSAGE_ENCODING_UNKNOWN", number: 0 }, { name: "LENGTH_PREFIXED", number: 1 }, { name: "DELIMITED", number: 2 }] }, { name: "JsonFormat", value: [{ name: "JSON_FORMAT_UNKNOWN", number: 0 }, { name: "ALLOW", number: 1 }, { name: "LEGACY_BEST_EFFORT", number: 2 }] }, { name: "EnforceNamingStyle", value: [{ name: "ENFORCE_NAMING_STYLE_UNKNOWN", number: 0 }, { name: "STYLE2024", number: 1 }, { name: "STYLE_LEGACY", number: 2 }] }], extensionRange: [{ start: 1e3, end: 9995 }, { start: 9995, end: 1e4 }, { start: 1e4, end: 10001 }] }, { name: "FeatureSetDefaults", field: [{ name: "defaults", number: 1, type: 11, label: 3, typeName: ".google.protobuf.FeatureSetDefaults.FeatureSetEditionDefault" }, { name: "minimum_edition", number: 4, type: 14, label: 1, typeName: ".google.protobuf.Edition" }, { name: "maximum_edition", number: 5, type: 14, label: 1, typeName: ".google.protobuf.Edition" }], nestedType: [{ name: "FeatureSetEditionDefault", field: [{ name: "edition", number: 3, type: 14, label: 1, typeName: ".google.protobuf.Edition" }, { name: "overridable_features", number: 4, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "fixed_features", number: 5, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }] }] }, { name: "SourceCodeInfo", field: [{ name: "location", number: 1, type: 11, label: 3, typeName: ".google.protobuf.SourceCodeInfo.Location" }], nestedType: [{ name: "Location", field: [{ name: "path", number: 1, type: 5, label: 3, options: { packed: !0 } }, { name: "span", number: 2, type: 5, label: 3, options: { packed: !0 } }, { name: "leading_comments", number: 3, type: 9, label: 1 }, { name: "trailing_comments", number: 4, type: 9, label: 1 }, { name: "leading_detached_comments", number: 6, type: 9, label: 3 }] }], extensionRange: [{ start: 536e6, end: 536000001 }] }, { name: "GeneratedCodeInfo", field: [{ name: "annotation", number: 1, type: 11, label: 3, typeName: ".google.protobuf.GeneratedCodeInfo.Annotation" }], nestedType: [{ name: "Annotation", field: [{ name: "path", number: 1, type: 5, label: 3, options: { packed: !0 } }, { name: "source_file", number: 2, type: 9, label: 1 }, { name: "begin", number: 3, type: 5, label: 1 }, { name: "end", number: 4, type: 5, label: 1 }, { name: "semantic", number: 5, type: 14, label: 1, typeName: ".google.protobuf.GeneratedCodeInfo.Annotation.Semantic" }], enumType: [{ name: "Semantic", value: [{ name: "NONE", number: 0 }, { name: "SET", number: 1 }, { name: "ALIAS", number: 2 }] }] }] }], enumType: [{ name: "Edition", value: [{ name: "EDITION_UNKNOWN", number: 0 }, { name: "EDITION_LEGACY", number: 900 }, { name: "EDITION_PROTO2", number: 998 }, { name: "EDITION_PROTO3", number: 999 }, { name: "EDITION_2023", number: 1e3 }, { name: "EDITION_2024", number: 1001 }, { name: "EDITION_UNSTABLE", number: 9999 }, { name: "EDITION_1_TEST_ONLY", number: 1 }, { name: "EDITION_2_TEST_ONLY", number: 2 }, { name: "EDITION_99997_TEST_ONLY", number: 99997 }, { name: "EDITION_99998_TEST_ONLY", number: 99998 }, { name: "EDITION_99999_TEST_ONLY", number: 99999 }, { name: "EDITION_MAX", number: 2147483647 }] }, { name: "SymbolVisibility", value: [{ name: "VISIBILITY_UNSET", number: 0 }, { name: "VISIBILITY_LOCAL", number: 1 }, { name: "VISIBILITY_EXPORT", number: 2 }] }] }), SI = /* @__PURE__ */ ra(OI, 1);
var cf;
(function(e) {
  e[e.DECLARATION = 0] = "DECLARATION", e[e.UNVERIFIED = 1] = "UNVERIFIED";
})(cf || (cf = {}));
var ff;
(function(e) {
  e[e.DOUBLE = 1] = "DOUBLE", e[e.FLOAT = 2] = "FLOAT", e[e.INT64 = 3] = "INT64", e[e.UINT64 = 4] = "UINT64", e[e.INT32 = 5] = "INT32", e[e.FIXED64 = 6] = "FIXED64", e[e.FIXED32 = 7] = "FIXED32", e[e.BOOL = 8] = "BOOL", e[e.STRING = 9] = "STRING", e[e.GROUP = 10] = "GROUP", e[e.MESSAGE = 11] = "MESSAGE", e[e.BYTES = 12] = "BYTES", e[e.UINT32 = 13] = "UINT32", e[e.ENUM = 14] = "ENUM", e[e.SFIXED32 = 15] = "SFIXED32", e[e.SFIXED64 = 16] = "SFIXED64", e[e.SINT32 = 17] = "SINT32", e[e.SINT64 = 18] = "SINT64";
})(ff || (ff = {}));
var mf;
(function(e) {
  e[e.OPTIONAL = 1] = "OPTIONAL", e[e.REPEATED = 3] = "REPEATED", e[e.REQUIRED = 2] = "REQUIRED";
})(mf || (mf = {}));
var df;
(function(e) {
  e[e.SPEED = 1] = "SPEED", e[e.CODE_SIZE = 2] = "CODE_SIZE", e[e.LITE_RUNTIME = 3] = "LITE_RUNTIME";
})(df || (df = {}));
var pf;
(function(e) {
  e[e.STRING = 0] = "STRING", e[e.CORD = 1] = "CORD", e[e.STRING_PIECE = 2] = "STRING_PIECE";
})(pf || (pf = {}));
var bf;
(function(e) {
  e[e.JS_NORMAL = 0] = "JS_NORMAL", e[e.JS_STRING = 1] = "JS_STRING", e[e.JS_NUMBER = 2] = "JS_NUMBER";
})(bf || (bf = {}));
var gf;
(function(e) {
  e[e.RETENTION_UNKNOWN = 0] = "RETENTION_UNKNOWN", e[e.RETENTION_RUNTIME = 1] = "RETENTION_RUNTIME", e[e.RETENTION_SOURCE = 2] = "RETENTION_SOURCE";
})(gf || (gf = {}));
var hf;
(function(e) {
  e[e.TARGET_TYPE_UNKNOWN = 0] = "TARGET_TYPE_UNKNOWN", e[e.TARGET_TYPE_FILE = 1] = "TARGET_TYPE_FILE", e[e.TARGET_TYPE_EXTENSION_RANGE = 2] = "TARGET_TYPE_EXTENSION_RANGE", e[e.TARGET_TYPE_MESSAGE = 3] = "TARGET_TYPE_MESSAGE", e[e.TARGET_TYPE_FIELD = 4] = "TARGET_TYPE_FIELD", e[e.TARGET_TYPE_ONEOF = 5] = "TARGET_TYPE_ONEOF", e[e.TARGET_TYPE_ENUM = 6] = "TARGET_TYPE_ENUM", e[e.TARGET_TYPE_ENUM_ENTRY = 7] = "TARGET_TYPE_ENUM_ENTRY", e[e.TARGET_TYPE_SERVICE = 8] = "TARGET_TYPE_SERVICE", e[e.TARGET_TYPE_METHOD = 9] = "TARGET_TYPE_METHOD";
})(hf || (hf = {}));
var mi;
(function(e) {
  e[e.IDEMPOTENCY_UNKNOWN = 0] = "IDEMPOTENCY_UNKNOWN", e[e.NO_SIDE_EFFECTS = 1] = "NO_SIDE_EFFECTS", e[e.IDEMPOTENT = 2] = "IDEMPOTENT";
})(mi || (mi = {}));
var yf;
(function(e) {
  e[e.DEFAULT_SYMBOL_VISIBILITY_UNKNOWN = 0] = "DEFAULT_SYMBOL_VISIBILITY_UNKNOWN", e[e.EXPORT_ALL = 1] = "EXPORT_ALL", e[e.EXPORT_TOP_LEVEL = 2] = "EXPORT_TOP_LEVEL", e[e.LOCAL_ALL = 3] = "LOCAL_ALL", e[e.STRICT = 4] = "STRICT";
})(yf || (yf = {}));
var Ef;
(function(e) {
  e[e.FIELD_PRESENCE_UNKNOWN = 0] = "FIELD_PRESENCE_UNKNOWN", e[e.EXPLICIT = 1] = "EXPLICIT", e[e.IMPLICIT = 2] = "IMPLICIT", e[e.LEGACY_REQUIRED = 3] = "LEGACY_REQUIRED";
})(Ef || (Ef = {}));
var Nf;
(function(e) {
  e[e.ENUM_TYPE_UNKNOWN = 0] = "ENUM_TYPE_UNKNOWN", e[e.OPEN = 1] = "OPEN", e[e.CLOSED = 2] = "CLOSED";
})(Nf || (Nf = {}));
var vf;
(function(e) {
  e[e.REPEATED_FIELD_ENCODING_UNKNOWN = 0] = "REPEATED_FIELD_ENCODING_UNKNOWN", e[e.PACKED = 1] = "PACKED", e[e.EXPANDED = 2] = "EXPANDED";
})(vf || (vf = {}));
var If;
(function(e) {
  e[e.UTF8_VALIDATION_UNKNOWN = 0] = "UTF8_VALIDATION_UNKNOWN", e[e.VERIFY = 2] = "VERIFY", e[e.NONE = 3] = "NONE";
})(If || (If = {}));
var Tf;
(function(e) {
  e[e.MESSAGE_ENCODING_UNKNOWN = 0] = "MESSAGE_ENCODING_UNKNOWN", e[e.LENGTH_PREFIXED = 1] = "LENGTH_PREFIXED", e[e.DELIMITED = 2] = "DELIMITED";
})(Tf || (Tf = {}));
var wf;
(function(e) {
  e[e.JSON_FORMAT_UNKNOWN = 0] = "JSON_FORMAT_UNKNOWN", e[e.ALLOW = 1] = "ALLOW", e[e.LEGACY_BEST_EFFORT = 2] = "LEGACY_BEST_EFFORT";
})(wf || (wf = {}));
var _f;
(function(e) {
  e[e.ENFORCE_NAMING_STYLE_UNKNOWN = 0] = "ENFORCE_NAMING_STYLE_UNKNOWN", e[e.STYLE2024 = 1] = "STYLE2024", e[e.STYLE_LEGACY = 2] = "STYLE_LEGACY";
})(_f || (_f = {}));
var Of;
(function(e) {
  e[e.NONE = 0] = "NONE", e[e.SET = 1] = "SET", e[e.ALIAS = 2] = "ALIAS";
})(Of || (Of = {}));
var Sf;
(function(e) {
  e[e.EDITION_UNKNOWN = 0] = "EDITION_UNKNOWN", e[e.EDITION_LEGACY = 900] = "EDITION_LEGACY", e[e.EDITION_PROTO2 = 998] = "EDITION_PROTO2", e[e.EDITION_PROTO3 = 999] = "EDITION_PROTO3", e[e.EDITION_2023 = 1e3] = "EDITION_2023", e[e.EDITION_2024 = 1001] = "EDITION_2024", e[e.EDITION_UNSTABLE = 9999] = "EDITION_UNSTABLE", e[e.EDITION_1_TEST_ONLY = 1] = "EDITION_1_TEST_ONLY", e[e.EDITION_2_TEST_ONLY = 2] = "EDITION_2_TEST_ONLY", e[e.EDITION_99997_TEST_ONLY = 99997] = "EDITION_99997_TEST_ONLY", e[e.EDITION_99998_TEST_ONLY = 99998] = "EDITION_99998_TEST_ONLY", e[e.EDITION_99999_TEST_ONLY = 99999] = "EDITION_99999_TEST_ONLY", e[e.EDITION_MAX = 2147483647] = "EDITION_MAX";
})(Sf || (Sf = {}));
var kf;
(function(e) {
  e[e.VISIBILITY_UNSET = 0] = "VISIBILITY_UNSET", e[e.VISIBILITY_LOCAL = 1] = "VISIBILITY_LOCAL", e[e.VISIBILITY_EXPORT = 2] = "VISIBILITY_EXPORT";
})(kf || (kf = {}));
const Df = {
  readUnknownFields: !0
};
function kI(e) {
  return e ? Object.assign(Object.assign({}, Df), e) : Df;
}
function Xo(e, t, n) {
  const r = Ke(e, void 0, !1);
  return dg(r, new vu(t), kI(n), !1, t.byteLength), r.message;
}
function dg(e, t, n, r, a) {
  var o;
  const s = r ? t.len : t.pos + a;
  let i, u;
  const l = (o = e.getUnknown()) !== null && o !== void 0 ? o : [];
  for (; t.pos < s && ([i, u] = t.tag(), !(r && u == U.EndGroup)); ) {
    const c = e.findNumber(i);
    if (!c) {
      const m = t.skip(u, i);
      n.readUnknownFields && l.push({ no: i, wireType: u, data: m });
      continue;
    }
    pg(e, t, c, u, n);
  }
  if (r && (u != U.EndGroup || i !== a))
    throw new Error("invalid end group tag");
  l.length > 0 && e.setUnknown(l);
}
function pg(e, t, n, r, a) {
  var o;
  switch (n.fieldKind) {
    case "scalar":
      e.set(n, Kn(t, n.scalar));
      break;
    case "enum":
      const s = Kn(t, b.INT32);
      if (n.enum.open)
        e.set(n, s);
      else if (n.enum.values.some((i) => i.number === s))
        e.set(n, s);
      else if (a.readUnknownFields) {
        const i = [];
        ii(s, i);
        const u = (o = e.getUnknown()) !== null && o !== void 0 ? o : [];
        u.push({
          no: n.number,
          wireType: r,
          data: new Uint8Array(i)
        }), e.setUnknown(u);
      }
      break;
    case "message":
      e.set(n, Au(t, a, n, e.get(n)));
      break;
    case "list":
      AI(t, r, e.get(n), a);
      break;
    case "map":
      DI(t, e.get(n), a);
      break;
  }
}
function DI(e, t, n) {
  const r = t.field();
  let a, o;
  const s = e.uint32(), i = e.pos + s;
  for (; e.pos < i; ) {
    const [u] = e.tag();
    switch (u) {
      case 1:
        a = Kn(e, r.mapKey);
        break;
      case 2:
        switch (r.mapKind) {
          case "scalar":
            o = Kn(e, r.scalar);
            break;
          case "enum":
            o = e.int32();
            break;
          case "message":
            o = Au(e, n, r);
            break;
        }
        break;
    }
  }
  if (a === void 0 && (a = En(r.mapKey, !1)), o === void 0)
    switch (r.mapKind) {
      case "scalar":
        o = En(r.scalar, !1);
        break;
      case "enum":
        o = r.enum.values[0].number;
        break;
      case "message":
        o = Ke(r.message, void 0, !1);
        break;
    }
  t.set(a, o);
}
function AI(e, t, n, r) {
  var a;
  const o = n.field();
  if (o.listKind === "message") {
    n.add(Au(e, r, o));
    return;
  }
  const s = (a = o.scalar) !== null && a !== void 0 ? a : b.INT32;
  if (!(t == U.LengthDelimited && s != b.STRING && s != b.BYTES)) {
    n.add(Kn(e, s));
    return;
  }
  const i = e.uint32() + e.pos;
  for (; e.pos < i; )
    n.add(Kn(e, s));
}
function Au(e, t, n, r) {
  const a = n.delimitedEncoding, o = r ?? Ke(n.message, void 0, !1);
  return dg(o, e, t, a, a ? n.number : e.uint32()), o;
}
function Kn(e, t) {
  switch (t) {
    case b.STRING:
      return e.string();
    case b.BOOL:
      return e.bool();
    case b.DOUBLE:
      return e.double();
    case b.FLOAT:
      return e.float();
    case b.INT32:
      return e.int32();
    case b.INT64:
      return e.int64();
    case b.UINT64:
      return e.uint64();
    case b.FIXED64:
      return e.fixed64();
    case b.BYTES:
      return e.bytes();
    case b.FIXED32:
      return e.fixed32();
    case b.SFIXED32:
      return e.sfixed32();
    case b.SFIXED64:
      return e.sfixed64();
    case b.SINT64:
      return e.sint64();
    case b.UINT32:
      return e.uint32();
    case b.SINT32:
      return e.sint32();
  }
}
function bg(e, t) {
  var n;
  const r = Xo(SI, Su(e));
  return r.messageType.forEach(ku), r.dependency = (n = void 0) !== null && n !== void 0 ? n : [], ig(r, (a) => {
  }).getFile(r.name);
}
const LI = /* @__PURE__ */ bg("Chlnb29nbGUvcHJvdG9idWYvYW55LnByb3RvEg9nb29nbGUucHJvdG9idWYiJgoDQW55EhAKCHR5cGVfdXJsGAEgASgJEg0KBXZhbHVlGAIgASgMQnYKE2NvbS5nb29nbGUucHJvdG9idWZCCEFueVByb3RvUAFaLGdvb2dsZS5nb2xhbmcub3JnL3Byb3RvYnVmL3R5cGVzL2tub3duL2FueXBiogIDR1BCqgIeR29vZ2xlLlByb3RvYnVmLldlbGxLbm93blR5cGVzYgZwcm90bzM"), UI = /* @__PURE__ */ ra(LI, 0), FI = 3, Af = {
  writeUnknownFields: !0
};
function RI(e) {
  return e ? Object.assign(Object.assign({}, Af), e) : Af;
}
function gg(e, t, n) {
  return fo(new Zb(), RI(n), Ke(e, t)).finish();
}
function fo(e, t, n) {
  var r;
  for (const a of n.sortedFields) {
    if (!n.isSet(a)) {
      if (a.presence == FI)
        throw new Error(`cannot encode ${a} to binary: required field not set`);
      continue;
    }
    hg(e, t, n, a);
  }
  if (t.writeUnknownFields)
    for (const { no: a, wireType: o, data: s } of (r = n.getUnknown()) !== null && r !== void 0 ? r : [])
      e.tag(a, o).raw(s);
  return e;
}
function hg(e, t, n, r) {
  var a;
  switch (r.fieldKind) {
    case "scalar":
    case "enum":
      mo(e, n.desc.typeName, r.name, (a = r.scalar) !== null && a !== void 0 ? a : b.INT32, r.number, n.get(r));
      break;
    case "list":
      $I(e, t, r, n.get(r));
      break;
    case "message":
      yg(e, t, r, n.get(r));
      break;
    case "map":
      for (const [o, s] of n.get(r))
        PI(e, t, r, o, s);
      break;
  }
}
function mo(e, t, n, r, a, o) {
  Eg(e.tag(a, xI(r)), t, n, r, o);
}
function yg(e, t, n, r) {
  n.delimitedEncoding ? fo(e.tag(n.number, U.StartGroup), t, r).tag(n.number, U.EndGroup) : fo(e.tag(n.number, U.LengthDelimited).fork(), t, r).join();
}
function $I(e, t, n, r) {
  var a;
  if (n.listKind == "message") {
    for (const s of r)
      yg(e, t, n, s);
    return;
  }
  const o = (a = n.scalar) !== null && a !== void 0 ? a : b.INT32;
  if (n.packed) {
    if (!r.size)
      return;
    e.tag(n.number, U.LengthDelimited).fork();
    for (const s of r)
      Eg(e, n.parent.typeName, n.name, o, s);
    e.join();
    return;
  }
  for (const s of r)
    mo(e, n.parent.typeName, n.name, o, n.number, s);
}
function PI(e, t, n, r, a) {
  var o;
  switch (e.tag(n.number, U.LengthDelimited).fork(), mo(e, n.parent.typeName, n.name, n.mapKey, 1, r), n.mapKind) {
    case "scalar":
    case "enum":
      mo(e, n.parent.typeName, n.name, (o = n.scalar) !== null && o !== void 0 ? o : b.INT32, 2, a);
      break;
    case "message":
      fo(e.tag(2, U.LengthDelimited).fork(), t, a).join();
      break;
  }
  e.join();
}
function Eg(e, t, n, r, a) {
  try {
    switch (r) {
      case b.STRING:
        e.string(a);
        break;
      case b.BOOL:
        e.bool(a);
        break;
      case b.DOUBLE:
        e.double(a);
        break;
      case b.FLOAT:
        e.float(a);
        break;
      case b.INT32:
        e.int32(a);
        break;
      case b.INT64:
        e.int64(a);
        break;
      case b.UINT64:
        e.uint64(a);
        break;
      case b.FIXED64:
        e.fixed64(a);
        break;
      case b.BYTES:
        e.bytes(a);
        break;
      case b.FIXED32:
        e.fixed32(a);
        break;
      case b.SFIXED32:
        e.sfixed32(a);
        break;
      case b.SFIXED64:
        e.sfixed64(a);
        break;
      case b.SINT64:
        e.sint64(a);
        break;
      case b.UINT32:
        e.uint32(a);
        break;
      case b.SINT32:
        e.sint32(a);
        break;
    }
  } catch (o) {
    throw o instanceof Error ? new Error(`cannot encode field ${t}.${n} to binary: ${o.message}`) : o;
  }
}
function xI(e) {
  switch (e) {
    case b.BYTES:
    case b.STRING:
      return U.LengthDelimited;
    case b.DOUBLE:
    case b.FIXED64:
    case b.SFIXED64:
      return U.Bit64;
    case b.FIXED32:
    case b.SFIXED32:
    case b.FLOAT:
      return U.Bit32;
    default:
      return U.Varint;
  }
}
function VI(e, t, n) {
  let r = !1;
  return n || (n = Qe(UI), r = !0), n.value = gg(e, t), n.typeUrl = BI(t.$typeName), r ? n : void 0;
}
function YI(e, t) {
  if (e.typeUrl === "")
    return !1;
  const n = typeof t == "string" ? t : t.typeName, r = Ng(e.typeUrl);
  return n === r;
}
function MI(e, t) {
  if (e.typeUrl === "")
    return;
  const n = t.kind == "message" ? t : t.getMessage(Ng(e.typeUrl));
  if (!(!n || !YI(e, n)))
    return Xo(n, e.value);
}
function BI(e) {
  return `type.googleapis.com/${e}`;
}
function Ng(e) {
  const t = e.lastIndexOf("/"), n = t >= 0 ? e.substring(t + 1) : e;
  if (!n.length)
    throw new Error(`invalid type url: ${e}`);
  return n;
}
const Lu = /* @__PURE__ */ bg("Chxnb29nbGUvcHJvdG9idWYvc3RydWN0LnByb3RvEg9nb29nbGUucHJvdG9idWYihAEKBlN0cnVjdBIzCgZmaWVsZHMYASADKAsyIy5nb29nbGUucHJvdG9idWYuU3RydWN0LkZpZWxkc0VudHJ5GkUKC0ZpZWxkc0VudHJ5EgsKA2tleRgBIAEoCRIlCgV2YWx1ZRgCIAEoCzIWLmdvb2dsZS5wcm90b2J1Zi5WYWx1ZToCOAEi6gEKBVZhbHVlEjAKCm51bGxfdmFsdWUYASABKA4yGi5nb29nbGUucHJvdG9idWYuTnVsbFZhbHVlSAASFgoMbnVtYmVyX3ZhbHVlGAIgASgBSAASFgoMc3RyaW5nX3ZhbHVlGAMgASgJSAASFAoKYm9vbF92YWx1ZRgEIAEoCEgAEi8KDHN0cnVjdF92YWx1ZRgFIAEoCzIXLmdvb2dsZS5wcm90b2J1Zi5TdHJ1Y3RIABIwCgpsaXN0X3ZhbHVlGAYgASgLMhouZ29vZ2xlLnByb3RvYnVmLkxpc3RWYWx1ZUgAQgYKBGtpbmQiMwoJTGlzdFZhbHVlEiYKBnZhbHVlcxgBIAMoCzIWLmdvb2dsZS5wcm90b2J1Zi5WYWx1ZSobCglOdWxsVmFsdWUSDgoKTlVMTF9WQUxVRRAAQn8KE2NvbS5nb29nbGUucHJvdG9idWZCC1N0cnVjdFByb3RvUAFaL2dvb2dsZS5nb2xhbmcub3JnL3Byb3RvYnVmL3R5cGVzL2tub3duL3N0cnVjdHBi+AEBogIDR1BCqgIeR29vZ2xlLlByb3RvYnVmLldlbGxLbm93blR5cGVzYgZwcm90bzM"), GI = /* @__PURE__ */ ra(Lu, 0), vg = /* @__PURE__ */ ra(Lu, 1), KI = /* @__PURE__ */ ra(Lu, 2);
var di;
(function(e) {
  e[e.NULL_VALUE = 0] = "NULL_VALUE";
})(di || (di = {}));
function CI(e, t) {
  Ig(t, e);
  const n = XI(e.$unknown, t), [r, a, o] = Wo(t);
  for (const s of n)
    pg(r, new vu(s.data), a, s.wireType, {
      readUnknownFields: !0
    });
  return o();
}
function jI(e, t, n) {
  var r;
  Ig(t, e);
  const a = ((r = e.$unknown) !== null && r !== void 0 ? r : []).filter((l) => l.no !== t.number), [o, s] = Wo(t, n), i = new Zb();
  hg(i, { writeUnknownFields: !0 }, o, s);
  const u = new vu(i.finish());
  for (; u.pos < u.len; ) {
    const [l, c] = u.tag(), m = u.skip(c, l);
    a.push({ no: l, wireType: c, data: m });
  }
  e.$unknown = a;
}
function XI(e, t) {
  if (e === void 0)
    return [];
  if (t.fieldKind === "enum" || t.fieldKind === "scalar") {
    for (let n = e.length - 1; n >= 0; --n)
      if (e[n].no == t.number)
        return [e[n]];
    return [];
  }
  return e.filter((n) => n.no === t.number);
}
function Wo(e, t) {
  const n = e.typeName, r = Object.assign(Object.assign({}, e), { kind: "field", parent: e.extendee, localName: n }), a = Object.assign(Object.assign({}, e.extendee), { fields: [r], members: [r], oneofs: [] }), o = Qe(a, t !== void 0 ? { [n]: t } : void 0);
  return [
    Ke(a, o),
    r,
    () => {
      const s = o[n];
      if (s === void 0) {
        const i = e.message;
        return na(i) ? En(i.fields[0].scalar, i.fields[0].longAsString) : Qe(i);
      }
      return s;
    }
  ];
}
function Ig(e, t) {
  if (e.extendee.typeName != t.$typeName)
    throw new Error(`extension ${e.typeName} can only be applied to message ${e.extendee.typeName}`);
}
const WI = 3, JI = 2, Lf = {
  alwaysEmitImplicit: !1,
  enumAsInteger: !1,
  useProtoFieldName: !1
};
function ZI(e) {
  return e ? Object.assign(Object.assign({}, Lf), e) : Lf;
}
function HI(e, t, n) {
  return aa(Ke(e, t), ZI(n));
}
function zI(e, t, n) {
  var r;
  const a = HI(e, t, n);
  return JSON.stringify(a, null, (r = n?.prettySpaces) !== null && r !== void 0 ? r : 0);
}
function aa(e, t) {
  var n;
  const r = tT(e, t);
  if (r !== void 0)
    return r;
  const a = {};
  for (const o of e.sortedFields) {
    if (!e.isSet(o)) {
      if (o.presence == WI)
        throw new Error(`cannot encode ${o} to JSON: required field not set`);
      if (!t.alwaysEmitImplicit || o.presence !== JI)
        continue;
    }
    const s = Uf(o, e.get(o), t);
    s !== void 0 && (a[eT(o, t)] = s);
  }
  if (t.registry) {
    const o = /* @__PURE__ */ new Set();
    for (const { no: s } of (n = e.getUnknown()) !== null && n !== void 0 ? n : [])
      if (!o.has(s)) {
        o.add(s);
        const i = t.registry.getExtensionFor(e.desc, s);
        if (!i)
          continue;
        const u = CI(e.message, i), [l, c] = Wo(i, u), m = Uf(c, l.get(c), t);
        m !== void 0 && (a[i.jsonName] = m);
      }
  }
  return a;
}
function Uf(e, t, n) {
  switch (e.fieldKind) {
    case "scalar":
      return Jo(e, t);
    case "message":
      return aa(t, n);
    case "enum":
      return Uu(e.enum, t, n.enumAsInteger);
    case "list":
      return QI(t, n);
    case "map":
      return qI(t, n);
  }
}
function qI(e, t) {
  const n = e.field(), r = {};
  switch (n.mapKind) {
    case "scalar":
      for (const [a, o] of e)
        r[a] = Jo(n, o);
      break;
    case "message":
      for (const [a, o] of e)
        r[a] = aa(o, t);
      break;
    case "enum":
      for (const [a, o] of e)
        r[a] = Uu(n.enum, o, t.enumAsInteger);
      break;
  }
  return t.alwaysEmitImplicit || e.size > 0 ? r : void 0;
}
function QI(e, t) {
  const n = e.field(), r = [];
  switch (n.listKind) {
    case "scalar":
      for (const a of e)
        r.push(Jo(n, a));
      break;
    case "enum":
      for (const a of e)
        r.push(Uu(n.enum, a, t.enumAsInteger));
      break;
    case "message":
      for (const a of e)
        r.push(aa(a, t));
      break;
  }
  return t.alwaysEmitImplicit || r.length > 0 ? r : void 0;
}
function Uu(e, t, n) {
  var r;
  if (typeof t != "number")
    throw new Error(`cannot encode ${e} to JSON: expected number, got ${X(t)}`);
  return e.typeName == "google.protobuf.NullValue" ? null : n ? t : (r = e.value[t]?.name) !== null && r !== void 0 ? r : t;
}
function Jo(e, t) {
  var n, r, a, o, s, i;
  switch (e.scalar) {
    // int32, fixed32, uint32: JSON value will be a decimal number. Either numbers or strings are accepted.
    case b.INT32:
    case b.SFIXED32:
    case b.SINT32:
    case b.FIXED32:
    case b.UINT32:
      if (typeof t != "number")
        throw new Error(`cannot encode ${e} to JSON: ${(n = Jt(e, t)) === null || n === void 0 ? void 0 : n.message}`);
      return t;
    // float, double: JSON value will be a number or one of the special string values "NaN", "Infinity", and "-Infinity".
    // Either numbers or strings are accepted. Exponent notation is also accepted.
    case b.FLOAT:
    case b.DOUBLE:
      if (typeof t != "number")
        throw new Error(`cannot encode ${e} to JSON: ${(r = Jt(e, t)) === null || r === void 0 ? void 0 : r.message}`);
      return Number.isNaN(t) ? "NaN" : t === Number.POSITIVE_INFINITY ? "Infinity" : t === Number.NEGATIVE_INFINITY ? "-Infinity" : t;
    // string:
    case b.STRING:
      if (typeof t != "string")
        throw new Error(`cannot encode ${e} to JSON: ${(a = Jt(e, t)) === null || a === void 0 ? void 0 : a.message}`);
      return t;
    // bool:
    case b.BOOL:
      if (typeof t != "boolean")
        throw new Error(`cannot encode ${e} to JSON: ${(o = Jt(e, t)) === null || o === void 0 ? void 0 : o.message}`);
      return t;
    // JSON value will be a decimal string. Either numbers or strings are accepted.
    case b.UINT64:
    case b.FIXED64:
    case b.INT64:
    case b.SFIXED64:
    case b.SINT64:
      if (typeof t != "bigint" && typeof t != "string")
        throw new Error(`cannot encode ${e} to JSON: ${(s = Jt(e, t)) === null || s === void 0 ? void 0 : s.message}`);
      return t.toString();
    // bytes: JSON value will be the data encoded as a string using standard base64 encoding with paddings.
    // Either standard or URL-safe base64 encoding with/without paddings are accepted.
    case b.BYTES:
      if (t instanceof Uint8Array)
        return og(t);
      throw new Error(`cannot encode ${e} to JSON: ${(i = Jt(e, t)) === null || i === void 0 ? void 0 : i.message}`);
  }
}
function eT(e, t) {
  return t.useProtoFieldName ? e.name : e.jsonName;
}
function tT(e, t) {
  if (e.desc.typeName.startsWith("google.protobuf."))
    switch (e.desc.typeName) {
      case "google.protobuf.Any":
        return nT(e.message, t);
      case "google.protobuf.Timestamp":
        return oT(e.message);
      case "google.protobuf.Duration":
        return rT(e.message);
      case "google.protobuf.FieldMask":
        return aT(e.message);
      case "google.protobuf.Struct":
        return Tg(e.message);
      case "google.protobuf.Value":
        return Fu(e.message);
      case "google.protobuf.ListValue":
        return wg(e.message);
      default:
        if (na(e.desc)) {
          const n = e.desc.fields[0];
          return Jo(n, e.get(n));
        }
        return;
    }
}
function nT(e, t) {
  if (e.typeUrl === "")
    return {};
  const { registry: n } = t;
  let r, a;
  if (n && (r = MI(e, n), r && (a = n.getMessage(r.$typeName))), !a || !r)
    throw new Error(`cannot encode message ${e.$typeName} to JSON: "${e.typeUrl}" is not in the type registry`);
  let o = aa(Ke(a, r), t);
  return (a.typeName.startsWith("google.protobuf.") || o === null || Array.isArray(o) || typeof o != "object") && (o = { value: o }), o["@type"] = e.typeUrl, o;
}
function rT(e) {
  const t = Number(e.seconds), n = e.nanos;
  if (t > 315576e6 || t < -315576e6)
    throw new Error(`cannot encode message ${e.$typeName} to JSON: value out of range`);
  if (t > 0 && n < 0 || t < 0 && n > 0)
    throw new Error(`cannot encode message ${e.$typeName} to JSON: nanos sign must match seconds sign`);
  let r = e.seconds.toString();
  if (n !== 0) {
    let a = Math.abs(n).toString();
    a = "0".repeat(9 - a.length) + a, a.substring(3) === "000000" ? a = a.substring(0, 3) : a.substring(6) === "000" && (a = a.substring(0, 6)), r += "." + a, n < 0 && t == 0 && (r = "-" + r);
  }
  return r + "s";
}
function aT(e) {
  return e.paths.map((t) => {
    if (t.match(/_[0-9]?_/g) || t.match(/[A-Z]/g))
      throw new Error(`cannot encode message ${e.$typeName} to JSON: lowerCamelCase of path name "` + t + '" is irreversible');
    return Tr(t);
  }).join(",");
}
function Tg(e) {
  const t = {};
  for (const [n, r] of Object.entries(e.fields))
    t[n] = Fu(r);
  return t;
}
function Fu(e) {
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
      return Tg(e.kind.value);
    case "listValue":
      return wg(e.kind.value);
    default:
      throw new Error(`${e.$typeName} must have a value`);
  }
}
function wg(e) {
  return e.values.map(Fu);
}
function oT(e) {
  const t = Number(e.seconds) * 1e3;
  if (t < Date.parse("0001-01-01T00:00:00Z") || t > Date.parse("9999-12-31T23:59:59Z"))
    throw new Error(`cannot encode message ${e.$typeName} to JSON: must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive`);
  if (e.nanos < 0)
    throw new Error(`cannot encode message ${e.$typeName} to JSON: nanos must not be negative`);
  if (e.nanos > 999999999)
    throw new Error(`cannot encode message ${e.$typeName} to JSON: nanos must not be greater than 99999999`);
  let n = "Z";
  if (e.nanos > 0) {
    const r = (e.nanos + 1e9).toString().substring(1);
    r.substring(3) === "000000" ? n = "." + r.substring(0, 3) + "Z" : r.substring(6) === "000" ? n = "." + r.substring(0, 6) + "Z" : n = "." + r + "Z";
  }
  return new Date(t).toISOString().replace(".000Z", n);
}
const Ff = {
  ignoreUnknownFields: !1
};
function sT(e) {
  return e ? Object.assign(Object.assign({}, Ff), e) : Ff;
}
function iT(e, t, n) {
  return _g(e, pT(t, e.typeName), n);
}
function _g(e, t, n) {
  const r = Ke(e);
  try {
    Cn(r, t, sT(n));
  } catch (a) {
    throw B1(a) ? new Error(`cannot decode ${a.field()} from JSON: ${a.message}`, {
      cause: a
    }) : a;
  }
  return r.message;
}
function Cn(e, t, n) {
  var r;
  if (bT(e, t, n))
    return;
  if (t == null || Array.isArray(t) || typeof t != "object")
    throw new Error(`cannot decode ${e.desc} from JSON: ${X(t)}`);
  const a = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
  for (const s of e.desc.fields)
    o.set(s.name, s).set(s.jsonName, s);
  for (const [s, i] of Object.entries(t)) {
    const u = o.get(s);
    if (u) {
      if (u.oneof) {
        if (i === null && u.fieldKind == "scalar")
          continue;
        const l = a.get(u.oneof);
        if (l !== void 0)
          throw new ge(u.oneof, `oneof set multiple times by ${l.name} and ${u.name}`);
        a.set(u.oneof, u);
      }
      Rf(e, u, i, n);
    } else {
      let l;
      if (s.startsWith("[") && s.endsWith("]") && // biome-ignore lint/suspicious/noAssignInExpressions: no
      (l = (r = n.registry) === null || r === void 0 ? void 0 : r.getExtension(s.substring(1, s.length - 1))) && l.extendee.typeName === e.desc.typeName) {
        const [c, m, d] = Wo(l);
        Rf(c, m, i, n), jI(e.message, l, d());
      }
      if (!l && !n.ignoreUnknownFields)
        throw new Error(`cannot decode ${e.desc} from JSON: key "${s}" is unknown`);
    }
  }
}
function Rf(e, t, n, r) {
  switch (t.fieldKind) {
    case "scalar":
      mT(e, t, n);
      break;
    case "enum":
      fT(e, t, n, r);
      break;
    case "message":
      cT(e, t, n, r);
      break;
    case "list":
      lT(e.get(t), n, r);
      break;
    case "map":
      uT(e.get(t), n, r);
      break;
  }
}
function uT(e, t, n) {
  if (t === null)
    return;
  const r = e.field();
  if (typeof t != "object" || Array.isArray(t))
    throw new ge(r, "expected object, got " + X(t));
  for (const [a, o] of Object.entries(t)) {
    if (o === null && !Og(r))
      throw new ge(r, "map value must not be null");
    let s;
    switch (r.mapKind) {
      case "message":
        const u = Ke(r.message);
        Cn(u, o, n), s = u;
        break;
      case "enum":
        if (s = Ru(r.enum, o, n.ignoreUnknownFields, !0), s === Zo)
          return;
        break;
      case "scalar":
        s = zo(r, o, !0);
        break;
    }
    const i = dT(r.mapKey, a);
    e.set(i, s);
  }
}
function lT(e, t, n) {
  if (t === null)
    return;
  const r = e.field();
  if (!Array.isArray(t))
    throw new ge(r, "expected Array, got " + X(t));
  for (const a of t) {
    if (a === null && !Og(r))
      throw new ge(r, "list item must not be null");
    switch (r.listKind) {
      case "message":
        const o = Ke(r.message);
        Cn(o, a, n), e.add(o);
        break;
      case "enum":
        const s = Ru(r.enum, a, n.ignoreUnknownFields, !0);
        s !== Zo && e.add(s);
        break;
      case "scalar":
        e.add(zo(r, a, !0));
        break;
    }
  }
}
function Og(e) {
  var t, n;
  return ((t = e.message) === null || t === void 0 ? void 0 : t.typeName) == "google.protobuf.Value" || ((n = e.enum) === null || n === void 0 ? void 0 : n.typeName) == "google.protobuf.NullValue";
}
function cT(e, t, n, r) {
  if (n === null && t.message.typeName != "google.protobuf.Value") {
    e.clear(t);
    return;
  }
  const a = e.isSet(t) ? e.get(t) : Ke(t.message);
  Cn(a, n, r), e.set(t, a);
}
function fT(e, t, n, r) {
  const a = Ru(t.enum, n, r.ignoreUnknownFields, !1);
  a === Ho ? e.clear(t) : a !== Zo && e.set(t, a);
}
function mT(e, t, n) {
  const r = zo(t, n, !1);
  r === Ho ? e.clear(t) : e.set(t, r);
}
const Zo = /* @__PURE__ */ Symbol();
function Ru(e, t, n, r) {
  if (t === null)
    return e.typeName == "google.protobuf.NullValue" ? 0 : r ? e.values[0].number : Ho;
  switch (typeof t) {
    case "number":
      if (Number.isInteger(t))
        return t;
      break;
    case "string":
      const a = e.values.find((o) => o.name === t);
      if (a !== void 0)
        return a.number;
      if (n)
        return Zo;
      break;
  }
  throw new Error(`cannot decode ${e} from JSON: ${X(t)}`);
}
const Ho = /* @__PURE__ */ Symbol();
function zo(e, t, n) {
  if (t === null)
    return n ? En(e.scalar, !1) : Ho;
  switch (e.scalar) {
    // float, double: JSON value will be a number or one of the special string values "NaN", "Infinity", and "-Infinity".
    // Either numbers or strings are accepted. Exponent notation is also accepted.
    case b.DOUBLE:
    case b.FLOAT:
      if (t === "NaN")
        return NaN;
      if (t === "Infinity")
        return Number.POSITIVE_INFINITY;
      if (t === "-Infinity")
        return Number.NEGATIVE_INFINITY;
      if (typeof t == "number") {
        if (Number.isNaN(t))
          throw new ge(e, "unexpected NaN number");
        if (!Number.isFinite(t))
          throw new ge(e, "unexpected infinite number");
        break;
      }
      if (typeof t == "string") {
        if (t === "" || t.trim().length !== t.length)
          break;
        const r = Number(t);
        if (!Number.isFinite(r))
          break;
        return r;
      }
      break;
    // int32, fixed32, uint32: JSON value will be a decimal number. Either numbers or strings are accepted.
    case b.INT32:
    case b.FIXED32:
    case b.SFIXED32:
    case b.SINT32:
    case b.UINT32:
      return Sg(t);
    // bytes: JSON value will be the data encoded as a string using standard base64 encoding with paddings.
    // Either standard or URL-safe base64 encoding with/without paddings are accepted.
    case b.BYTES:
      if (typeof t == "string") {
        if (t === "")
          return new Uint8Array(0);
        try {
          return Su(t);
        } catch (r) {
          const a = r instanceof Error ? r.message : String(r);
          throw new ge(e, a);
        }
      }
      break;
  }
  return t;
}
function dT(e, t) {
  switch (e) {
    case b.BOOL:
      switch (t) {
        case "true":
          return !0;
        case "false":
          return !1;
      }
      return t;
    case b.INT32:
    case b.FIXED32:
    case b.UINT32:
    case b.SFIXED32:
    case b.SINT32:
      return Sg(t);
    default:
      return t;
  }
}
function Sg(e) {
  if (typeof e == "string") {
    if (e === "" || e.trim().length !== e.length)
      return e;
    const t = Number(e);
    return Number.isNaN(t) ? e : t;
  }
  return e;
}
function pT(e, t) {
  try {
    return JSON.parse(e);
  } catch (n) {
    const r = n instanceof Error ? n.message : String(n);
    throw new Error(
      `cannot decode message ${t} from JSON: ${r}`,
      // @ts-expect-error we use the ES2022 error CTOR option "cause" for better stack traces
      { cause: n }
    );
  }
}
function bT(e, t, n) {
  if (!e.desc.typeName.startsWith("google.protobuf."))
    return !1;
  switch (e.desc.typeName) {
    case "google.protobuf.Any":
      return gT(e.message, t, n), !0;
    case "google.protobuf.Timestamp":
      return hT(e.message, t), !0;
    case "google.protobuf.Duration":
      return yT(e.message, t), !0;
    case "google.protobuf.FieldMask":
      return ET(e.message, t), !0;
    case "google.protobuf.Struct":
      return kg(e.message, t), !0;
    case "google.protobuf.Value":
      return $u(e.message, t), !0;
    case "google.protobuf.ListValue":
      return Dg(e.message, t), !0;
    default:
      if (na(e.desc)) {
        const r = e.desc.fields[0];
        return t === null ? e.clear(r) : e.set(r, zo(r, t, !0)), !0;
      }
      return !1;
  }
}
function gT(e, t, n) {
  var r;
  if (t === null || Array.isArray(t) || typeof t != "object")
    throw new Error(`cannot decode message ${e.$typeName} from JSON: expected object but got ${X(t)}`);
  if (Object.keys(t).length == 0)
    return;
  const a = t["@type"];
  if (typeof a != "string" || a == "")
    throw new Error(`cannot decode message ${e.$typeName} from JSON: "@type" is empty`);
  const o = a.includes("/") ? a.substring(a.lastIndexOf("/") + 1) : a;
  if (!o.length)
    throw new Error(`cannot decode message ${e.$typeName} from JSON: "@type" is invalid`);
  const s = (r = n.registry) === null || r === void 0 ? void 0 : r.getMessage(o);
  if (!s)
    throw new Error(`cannot decode message ${e.$typeName} from JSON: ${a} is not in the type registry`);
  const i = Ke(s);
  if (o.startsWith("google.protobuf.") && Object.prototype.hasOwnProperty.call(t, "value")) {
    const u = t.value;
    Cn(i, u, n);
  } else {
    const u = Object.assign({}, t);
    delete u["@type"], Cn(i, u, n);
  }
  VI(i.desc, i.message, e);
}
function hT(e, t) {
  if (typeof t != "string")
    throw new Error(`cannot decode message ${e.$typeName} from JSON: ${X(t)}`);
  const n = t.match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})(?:\.([0-9]{1,9}))?(?:Z|([+-][0-9][0-9]:[0-9][0-9]))$/);
  if (!n)
    throw new Error(`cannot decode message ${e.$typeName} from JSON: invalid RFC 3339 string`);
  const r = Date.parse(
    // biome-ignore format: want this to read well
    n[1] + "-" + n[2] + "-" + n[3] + "T" + n[4] + ":" + n[5] + ":" + n[6] + (n[8] ? n[8] : "Z")
  );
  if (Number.isNaN(r))
    throw new Error(`cannot decode message ${e.$typeName} from JSON: invalid RFC 3339 string`);
  if (r < Date.parse("0001-01-01T00:00:00Z") || r > Date.parse("9999-12-31T23:59:59Z"))
    throw new Error(`cannot decode message ${e.$typeName} from JSON: must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive`);
  e.seconds = k.parse(r / 1e3), e.nanos = 0, n[7] && (e.nanos = parseInt("1" + n[7] + "0".repeat(9 - n[7].length)) - 1e9);
}
function yT(e, t) {
  if (typeof t != "string")
    throw new Error(`cannot decode message ${e.$typeName} from JSON: ${X(t)}`);
  const n = t.match(/^(-?[0-9]+)(?:\.([0-9]+))?s/);
  if (n === null)
    throw new Error(`cannot decode message ${e.$typeName} from JSON: ${X(t)}`);
  const r = Number(n[1]);
  if (r > 315576e6 || r < -315576e6)
    throw new Error(`cannot decode message ${e.$typeName} from JSON: ${X(t)}`);
  if (e.seconds = k.parse(r), typeof n[2] != "string")
    return;
  const a = n[2] + "0".repeat(9 - n[2].length);
  e.nanos = parseInt(a), (r < 0 || Object.is(r, -0)) && (e.nanos = -e.nanos);
}
function ET(e, t) {
  if (typeof t != "string")
    throw new Error(`cannot decode message ${e.$typeName} from JSON: ${X(t)}`);
  if (t === "")
    return;
  function n(r) {
    if (r.includes("_"))
      throw new Error(`cannot decode message ${e.$typeName} from JSON: path names must be lowerCamelCase`);
    const a = r.replace(/[A-Z]/g, (o) => "_" + o.toLowerCase());
    return a[0] === "_" ? a.substring(1) : a;
  }
  e.paths = t.split(",").map(n);
}
function kg(e, t) {
  if (typeof t != "object" || t == null || Array.isArray(t))
    throw new Error(`cannot decode message ${e.$typeName} from JSON ${X(t)}`);
  for (const [n, r] of Object.entries(t)) {
    const a = Qe(vg);
    $u(a, r), e.fields[n] = a;
  }
}
function $u(e, t) {
  switch (typeof t) {
    case "number":
      e.kind = { case: "numberValue", value: t };
      break;
    case "string":
      e.kind = { case: "stringValue", value: t };
      break;
    case "boolean":
      e.kind = { case: "boolValue", value: t };
      break;
    case "object":
      if (t === null)
        e.kind = { case: "nullValue", value: di.NULL_VALUE };
      else if (Array.isArray(t)) {
        const n = Qe(KI);
        Dg(n, t), e.kind = { case: "listValue", value: n };
      } else {
        const n = Qe(GI);
        kg(n, t), e.kind = { case: "structValue", value: n };
      }
      break;
    default:
      throw new Error(`cannot decode message ${e.$typeName} from JSON ${X(t)}`);
  }
  return e;
}
function Dg(e, t) {
  if (!Array.isArray(t))
    throw new Error(`cannot decode message ${e.$typeName} from JSON ${X(t)}`);
  for (const n of t) {
    const r = Qe(vg);
    $u(r, n), e.values.push(r);
  }
}
function pi(e) {
  const t = w[e];
  return typeof t != "string" ? e.toString() : t[0].toLowerCase() + t.substring(1).replace(/[A-Z]/g, (n) => "_" + n.toLowerCase());
}
let Aa;
function NT(e) {
  if (!Aa) {
    Aa = {};
    for (const t of Object.values(w))
      typeof t != "string" && (Aa[pi(t)] = t);
  }
  return Aa[e];
}
class B extends Error {
  /**
   * Create a new ConnectError.
   * If no code is provided, code "unknown" is used.
   * Outgoing details are only relevant for the server side - a service may
   * raise an error with details, and it is up to the protocol implementation
   * to encode and send the details along with the error.
   */
  constructor(t, n = w.Unknown, r, a, o) {
    super(vT(t, n)), this.name = "ConnectError", Object.setPrototypeOf(this, new.target.prototype), this.rawMessage = t, this.code = n, this.metadata = new Headers(r ?? {}), this.details = a ?? [], this.cause = o;
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
  static from(t, n = w.Unknown) {
    return t instanceof B ? t : t instanceof Error ? t.name == "AbortError" || t.name == "TimeoutError" ? new B(t.message, w.Canceled) : new B(t.message, n, void 0, void 0, t) : new B(String(t), n, void 0, void 0, t);
  }
  static [Symbol.hasInstance](t) {
    return t instanceof Error ? Object.getPrototypeOf(t) === B.prototype ? !0 : t.name === "ConnectError" && "code" in t && typeof t.code == "number" && "metadata" in t && "details" in t && Array.isArray(t.details) && "rawMessage" in t && typeof t.rawMessage == "string" && "cause" in t : !1;
  }
  findDetails(t) {
    const n = t.kind === "message" ? {
      getMessage: (a) => a === t.typeName ? t : void 0
    } : t, r = [];
    for (const a of this.details) {
      if ("desc" in a) {
        n.getMessage(a.desc.typeName) && r.push(Qe(a.desc, a.value));
        continue;
      }
      const o = n.getMessage(a.type);
      if (o)
        try {
          r.push(Xo(o, a.value));
        } catch {
        }
    }
    return r;
  }
}
function vT(e, t) {
  return e.length ? `[${pi(t)}] ${e}` : `[${pi(t)}]`;
}
function IT(...e) {
  const t = new Headers();
  for (const n of e)
    n.forEach((r, a) => {
      t.append(a, r);
    });
  return t;
}
const $f = 1;
function TT(e, t, n = !1) {
  if (t > e) {
    let r = `message size is larger than configured readMaxBytes ${e}`;
    throw n && (r = `message size ${t} is larger than configured readMaxBytes ${e}`), new B(r, w.ResourceExhausted);
  }
}
function wT(e) {
  return new _T(e);
}
class _T {
  constructor(t) {
    this.readMaxBytes = t, this.header = new Uint8Array(5), this.headerView = new DataView(this.header.buffer), this.buf = [];
  }
  get byteLength() {
    return this.buf.reduce((t, n) => t + n.byteLength, 0);
  }
  decode(t) {
    this.buf.push(t);
    const n = [];
    for (; ; ) {
      let r = this.pop();
      if (!r)
        break;
      n.push(r);
    }
    return n;
  }
  // consume an enveloped message
  pop() {
    if (!(!this.env && (this.env = this.head(), !this.env)) && this.cons(this.env.data)) {
      const t = this.env;
      return this.env = void 0, t;
    }
  }
  // consume header
  head() {
    if (!this.cons(this.header))
      return;
    const t = this.headerView.getUint8(0), n = this.headerView.getUint32(1);
    return TT(this.readMaxBytes, n, !0), {
      flags: t,
      data: new Uint8Array(n)
    };
  }
  // consume from buffer, fill target
  cons(t) {
    const n = t.byteLength;
    if (this.byteLength < n)
      return !1;
    let r = 0;
    for (; r < n; ) {
      const a = this.buf.shift();
      a.byteLength > n - r ? (t.set(a.subarray(0, n - r), r), this.buf.unshift(a.subarray(n - r)), r += n - r) : (t.set(a, r), r += a.byteLength);
    }
    return !0;
  }
}
function OT(e) {
  let t;
  const n = wT(4294967295);
  return new ReadableStream({
    start() {
      t = e.getReader();
    },
    async pull(r) {
      let a = !1;
      for (; !a; ) {
        const o = await t.read();
        if (o.done)
          n.byteLength > 0 && r.error(new B("protocol error: incomplete envelope", w.InvalidArgument)), r.close();
        else
          for (const s of n.decode(o.value))
            r.enqueue(s), a = !0;
      }
    }
  });
}
function ST(e, t) {
  const n = new Uint8Array(t.length + 5);
  n.set(t, 5);
  const r = new DataView(n.buffer, n.byteOffset, n.byteLength);
  return r.setUint8(0, e), r.setUint32(1, t.length), n;
}
function kT(...e) {
  const t = new AbortController(), n = e.filter((a) => a !== void 0).concat(t.signal);
  for (const a of n) {
    if (a.aborted) {
      r.apply(a);
      break;
    }
    a.addEventListener("abort", r);
  }
  function r() {
    t.signal.aborted || t.abort(Ag(this));
    for (const a of n)
      a.removeEventListener("abort", r);
  }
  return t;
}
function DT(e) {
  const t = new AbortController(), n = () => {
    t.abort(new B("the operation timed out", w.DeadlineExceeded));
  };
  let r;
  return e !== void 0 && (e <= 0 ? n() : r = setTimeout(n, e)), {
    signal: t.signal,
    cleanup: () => clearTimeout(r)
  };
}
function Ag(e) {
  if (!e.aborted)
    return;
  if (e.reason !== void 0)
    return e.reason;
  const t = new Error("This operation was aborted");
  return t.name = "AbortError", t;
}
function Pf() {
  return {
    get(e) {
      return e.id in this ? this[e.id] : e.defaultValue;
    },
    set(e, t) {
      return this[e.id] = t, this;
    },
    delete(e) {
      return delete this[e.id], this;
    }
  };
}
function xf(e, t) {
  return e.toString().replace(/\/?$/, `/${t.parent.typeName}/${t.name}`);
}
function Lg(e, t) {
  return Qe(e, t);
}
function AT(e, t) {
  function n(r) {
    return r.done === !0 ? r : {
      done: r.done,
      value: Lg(e, r.value)
    };
  }
  return {
    [Symbol.asyncIterator]() {
      const r = t[Symbol.asyncIterator](), a = {
        next: () => r.next().then(n)
      };
      return r.throw !== void 0 && (a.throw = (o) => r.throw(o).then(n)), r.return !== void 0 && (a.return = (o) => r.return(o).then(n)), a;
    }
  };
}
function Ug(e, t) {
  if (!t)
    return e;
  for (const n of t.concat().reverse())
    e = n(e);
  return e;
}
function Fg(e) {
  var t;
  const n = Object.assign({}, e);
  return (t = n.ignoreUnknownFields) !== null && t !== void 0 || (n.ignoreUnknownFields = !0), n;
}
function Vf(e, t, n, r) {
  const a = t ? Yf(e.input, r) : Mf(e.input, n);
  return { parse: (t ? Yf(e.output, r) : Mf(e.output, n)).parse, serialize: a.serialize };
}
function Yf(e, t) {
  return {
    parse(n) {
      try {
        return Xo(e, n, t);
      } catch (r) {
        const a = r instanceof Error ? r.message : String(r);
        throw new B(`parse binary: ${a}`, w.Internal);
      }
    },
    serialize(n) {
      try {
        return gg(e, n, t);
      } catch (r) {
        const a = r instanceof Error ? r.message : String(r);
        throw new B(`serialize binary: ${a}`, w.Internal);
      }
    }
  };
}
function Mf(e, t) {
  var n, r;
  const a = (n = t?.textEncoder) !== null && n !== void 0 ? n : new TextEncoder(), o = (r = t?.textDecoder) !== null && r !== void 0 ? r : new TextDecoder(), s = Fg(t);
  return {
    parse(i) {
      try {
        const u = o.decode(i);
        return iT(e, u, s);
      } catch (u) {
        throw B.from(u, w.InvalidArgument);
      }
    },
    serialize(i) {
      try {
        const u = zI(e, i, s);
        return a.encode(u);
      } catch (u) {
        throw B.from(u, w.Internal);
      }
    }
  };
}
const LT = /^application\/(connect\+)?(?:(json)(?:; ?charset=utf-?8)?|(proto))$/i, UT = "application/proto", FT = "application/json", RT = "application/connect+proto", $T = "application/connect+json";
function PT(e) {
  const t = e?.match(LT);
  if (!t)
    return;
  const n = !!t[1], r = !!t[3];
  return { stream: n, binary: r };
}
function Rg(e, t, n) {
  var r;
  if (t && new Headers(t).forEach((i, u) => n.metadata.append(u, i)), typeof e != "object" || e == null || Array.isArray(e))
    throw n;
  let a = n.code;
  "code" in e && typeof e.code == "string" && (a = (r = NT(e.code)) !== null && r !== void 0 ? r : a);
  const o = e.message;
  if (o != null && typeof o != "string")
    throw n;
  const s = new B(o ?? "", a, t);
  if ("details" in e && Array.isArray(e.details))
    for (const i of e.details) {
      if (i === null || typeof i != "object" || Array.isArray(i) || typeof i.type != "string" || typeof i.value != "string")
        throw n;
      try {
        s.details.push({
          type: i.type,
          value: Su(i.value),
          debug: i.debug
        });
      } catch {
        throw n;
      }
    }
  return s;
}
const Bf = 2;
function xT(e) {
  const t = new B("invalid end stream", w.Unknown);
  let n;
  try {
    n = JSON.parse(typeof e == "string" ? e : new TextDecoder().decode(e));
  } catch {
    throw t;
  }
  if (typeof n != "object" || n == null || Array.isArray(n))
    throw t;
  const r = new Headers();
  if ("metadata" in n) {
    if (typeof n.metadata != "object" || n.metadata == null || Array.isArray(n.metadata))
      throw t;
    for (const [o, s] of Object.entries(n.metadata)) {
      if (!Array.isArray(s) || s.some((i) => typeof i != "string"))
        throw t;
      for (const i of s)
        r.append(o, i);
    }
  }
  const a = "error" in n && n.error != null ? Rg(n.error, r, t) : void 0;
  return { metadata: r, error: a };
}
const po = "Content-Type", VT = "Content-Length", Gf = "Content-Encoding", YT = "Accept-Encoding", MT = "Connect-Timeout-Ms", $g = "Connect-Protocol-Version", BT = "User-Agent";
function GT(e) {
  switch (e) {
    case 400:
      return w.Internal;
    case 401:
      return w.Unauthenticated;
    case 403:
      return w.PermissionDenied;
    case 404:
      return w.Unimplemented;
    case 429:
      return w.Unavailable;
    case 502:
      return w.Unavailable;
    case 503:
      return w.Unavailable;
    case 504:
      return w.Unavailable;
    default:
      return w.Unknown;
  }
}
function Kf(e) {
  const t = new Headers(), n = new Headers();
  return e.forEach((r, a) => {
    a.toLowerCase().startsWith("trailer-") ? n.append(a.substring(8), r) : t.append(a, r);
  }), [t, n];
}
const Pg = "1";
function Cf(e, t, n, r, a) {
  const o = new Headers(r ?? {});
  return n !== void 0 && o.set(MT, `${n}`), o.set(po, e == "unary" ? t ? UT : FT : t ? RT : $T), o.set($g, Pg), o.has(BT), o;
}
function jf(e, t, n, r) {
  const a = r.get(po), o = PT(a);
  if (n !== 200) {
    const i = new B(`HTTP ${n}`, GT(n), r);
    if (e == "unary" && o && !o.binary)
      return { isUnaryError: !0, unaryError: i };
    throw i;
  }
  const s = {
    binary: t,
    stream: e !== "unary"
  };
  if (o?.binary !== s.binary || o.stream !== s.stream)
    throw new B(`unsupported content type ${a}`, o === void 0 ? w.Unknown : w.Internal, r);
  return { isUnaryError: !1 };
}
const Xf = "application/";
function KT(e, t) {
  return t ? og(e, "url") : encodeURIComponent(new TextDecoder().decode(e));
}
function CT(e, t, n) {
  let r = `?connect=v${Pg}`;
  const a = e.header.get(po);
  a?.indexOf(Xf) === 0 && (r += "&encoding=" + encodeURIComponent(a.slice(Xf.length)));
  const o = e.header.get(Gf);
  o !== null && o !== "identity" && (r += "&compression=" + encodeURIComponent(o), n = !0), n && (r += "&base64=1"), r += "&message=" + KT(t, n);
  const s = e.url + r, i = new Headers(e.header);
  for (const u of [
    $g,
    po,
    VT,
    Gf,
    YT
  ])
    i.delete(u);
  return Object.assign(Object.assign({}, e), {
    requestMethod: "GET",
    url: s,
    header: i
  });
}
function jT(e) {
  const t = Ug(e.next, e.interceptors), [n, r, a] = xg(e), o = Object.assign(Object.assign({}, e.req), { message: Lg(e.req.method.input, e.req.message), signal: n });
  return t(o).then((s) => (a(), s), r);
}
function XT(e) {
  const t = Ug(e.next, e.interceptors), [n, r, a] = xg(e), o = Object.assign(Object.assign({}, e.req), { message: AT(e.req.method.input, e.req.message), signal: n });
  let s = !1;
  return n.addEventListener("abort", function() {
    var i, u;
    const l = e.req.message[Symbol.asyncIterator]();
    s || (i = l.throw) === null || i === void 0 || i.call(l, this.reason).catch(() => {
    }), (u = l.return) === null || u === void 0 || u.call(l).catch(() => {
    });
  }), t(o).then((i) => Object.assign(Object.assign({}, i), { message: {
    [Symbol.asyncIterator]() {
      const u = i.message[Symbol.asyncIterator]();
      return {
        next() {
          return u.next().then((l) => (l.done == !0 && (s = !0, a()), l), r);
        }
        // We deliberately omit throw/return.
      };
    }
  } }), r);
}
function xg(e) {
  const { signal: t, cleanup: n } = DT(e.timeoutMs), r = kT(e.signal, t);
  return [
    r.signal,
    function(a) {
      const o = B.from(t.aborted ? Ag(t) : a);
      return r.abort(o), n(), Promise.reject(o);
    },
    function() {
      n(), r.abort();
    }
  ];
}
function WT() {
  try {
    new Headers();
  } catch {
    throw new Error("connect-web requires the fetch API. Are you running on an old version of Node.js? Node.js is not supported in Connect for Web - please stay tuned for Connect for Node.");
  }
}
var Or = function(e) {
  return this instanceof Or ? (this.v = e, this) : new Or(e);
}, JT = function(e, t, n) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var r = n.apply(e, t || []), a, o = [];
  return a = Object.create((typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype), i("next"), i("throw"), i("return", s), a[Symbol.asyncIterator] = function() {
    return this;
  }, a;
  function s(f) {
    return function(y) {
      return Promise.resolve(y).then(f, m);
    };
  }
  function i(f, y) {
    r[f] && (a[f] = function(E) {
      return new Promise(function(N, v) {
        o.push([f, E, N, v]) > 1 || u(f, E);
      });
    }, y && (a[f] = y(a[f])));
  }
  function u(f, y) {
    try {
      l(r[f](y));
    } catch (E) {
      d(o[0][3], E);
    }
  }
  function l(f) {
    f.value instanceof Or ? Promise.resolve(f.value.v).then(c, m) : d(o[0][2], f);
  }
  function c(f) {
    u("next", f);
  }
  function m(f) {
    u("throw", f);
  }
  function d(f, y) {
    f(y), o.shift(), o.length && u(o[0][0], o[0][1]);
  }
};
const Wf = {
  redirect: "error"
};
function ZT(e) {
  var t;
  WT();
  const n = (t = e.useBinaryFormat) !== null && t !== void 0 ? t : !1;
  return {
    async unary(r, a, o, s, i, u) {
      const { serialize: l, parse: c } = Vf(r, n, e.jsonOptions, e.binaryOptions);
      return o = o === void 0 ? e.defaultTimeoutMs : o <= 0 ? void 0 : o, await jT({
        interceptors: e.interceptors,
        signal: a,
        timeoutMs: o,
        req: {
          stream: !1,
          service: r.parent,
          method: r,
          requestMethod: "POST",
          url: xf(e.baseUrl, r),
          header: Cf(r.methodKind, n, o, s),
          contextValues: u ?? Pf(),
          message: i
        },
        next: async (m) => {
          var d;
          const f = e.useHttpGet === !0 && r.idempotency === mi.NO_SIDE_EFFECTS;
          let y = null;
          f ? m = CT(m, l(m.message), n) : y = l(m.message);
          const E = await ((d = e.fetch) !== null && d !== void 0 ? d : globalThis.fetch)(m.url, Object.assign(Object.assign({}, Wf), { method: m.requestMethod, headers: m.header, signal: m.signal, body: y })), { isUnaryError: N, unaryError: v } = jf(r.methodKind, n, E.status, E.headers);
          if (N)
            throw Rg(await E.json(), IT(...Kf(E.headers)), v);
          const [I, M] = Kf(E.headers);
          return {
            stream: !1,
            service: r.parent,
            method: r,
            header: I,
            message: n ? c(new Uint8Array(await E.arrayBuffer())) : _g(r.output, await E.json(), Fg(e.jsonOptions)),
            trailer: M
          };
        }
      });
    },
    async stream(r, a, o, s, i, u) {
      const { serialize: l, parse: c } = Vf(r, n, e.jsonOptions, e.binaryOptions);
      function m(f, y, E, N) {
        return JT(this, arguments, function* () {
          const v = OT(f).getReader();
          let I = !1;
          for (; ; ) {
            const M = yield Or(v.read());
            if (M.done)
              break;
            const { flags: De, data: Xe } = M.value;
            if ((De & $f) === $f)
              throw new B("protocol error: received unsupported compressed output", w.Internal);
            if ((De & Bf) === Bf) {
              I = !0;
              const ae = xT(Xe);
              if (ae.error) {
                const C = ae.error;
                throw E.forEach((Z, ht) => {
                  C.metadata.append(ht, Z);
                }), C;
              }
              ae.metadata.forEach((C, Z) => y.set(Z, C));
              continue;
            }
            yield yield Or(c(Xe));
          }
          if ("throwIfAborted" in N && N.throwIfAborted(), !I)
            throw "missing EndStreamResponse";
        });
      }
      async function d(f) {
        if (r.methodKind != "server_streaming")
          throw "The fetch API does not support streaming request bodies";
        const y = await f[Symbol.asyncIterator]().next();
        if (y.done == !0)
          throw "missing request message";
        return ST(0, l(y.value));
      }
      return o = o === void 0 ? e.defaultTimeoutMs : o <= 0 ? void 0 : o, await XT({
        interceptors: e.interceptors,
        timeoutMs: o,
        signal: a,
        req: {
          stream: !0,
          service: r.parent,
          method: r,
          requestMethod: "POST",
          url: xf(e.baseUrl, r),
          header: Cf(r.methodKind, n, o, s),
          contextValues: u ?? Pf(),
          message: i
        },
        next: async (f) => {
          var y;
          const E = await ((y = e.fetch) !== null && y !== void 0 ? y : globalThis.fetch)(f.url, Object.assign(Object.assign({}, Wf), { method: f.requestMethod, headers: f.header, signal: f.signal, body: await d(f.message) }));
          if (jf(r.methodKind, n, E.status, E.headers), E.body === null)
            throw "missing response body";
          const N = new Headers();
          return Object.assign(Object.assign({}, f), { header: E.headers, trailer: N, message: m(E.body, N, E.headers, f.signal) });
        }
      });
    }
  };
}
ZT({
  baseUrl: "/api",
  useBinaryFormat: !0,
  fetch: (e, t) => {
    const n = t?.headers ?? {};
    return fetch(e, {
      ...t,
      headers: {
        ...n,
        "qt-widget-id": window.qtWidgetId
      }
    });
  }
});
const se = /* @__PURE__ */ Symbol(), HT = !1;
var zT = Array.isArray, qT = Array.prototype.indexOf, ks = Object.getOwnPropertyDescriptor, QT = Object.prototype, ew = Array.prototype, tw = Object.getPrototypeOf;
function nw(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
function rw() {
  var e, t, n = new Promise((r, a) => {
    e = r, t = a;
  });
  return { promise: n, resolve: e, reject: t };
}
const Oe = 2, aw = 4, ow = 1 << 24, tr = 16, oa = 32, sa = 64, Pu = 128, ft = 512, ce = 1024, et = 2048, mt = 4096, Ja = 8192, un = 16384, sw = 32768, Jf = 1 << 17, Vg = 1 << 18, Nn = 32768, bi = 1 << 21, Yg = 1 << 22, Sr = 1 << 23, Ds = /* @__PURE__ */ Symbol("$state"), Mg = new class extends Error {
  name = "StaleReactionError";
  message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}();
function iw() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function uw() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function lw() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function cw() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function fw(e) {
  return e === this.v;
}
let mw = !1;
function Bg() {
  return !0;
}
let Ln = [];
function dw() {
  var e = Ln;
  Ln = [], nw(e);
}
function pw(e) {
  if (Ln.length === 0) {
    var t = Ln;
    queueMicrotask(() => {
      t === Ln && dw();
    });
  }
  Ln.push(e);
}
function bw(e) {
  var t = he;
  if (t === null)
    return x.f |= Sr, e;
  if ((t.f & sw) === 0) {
    if ((t.f & Pu) === 0)
      throw e;
    t.b.error(e);
  } else
    Gg(e, t);
}
function Gg(e, t) {
  for (; t !== null; ) {
    if ((t.f & Pu) !== 0)
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
const La = /* @__PURE__ */ new Set();
let z = null, Ye = null, st = [], xu = null, gi = !1;
class kr {
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
  #t = 0;
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
  #o = /* @__PURE__ */ new Set();
  /**
   * Deferred effects that are MAYBE_DIRTY
   * @type {Set<Effect>}
   */
  #s = /* @__PURE__ */ new Set();
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
    st = [], this.apply();
    var n = {
      parent: null,
      effect: null,
      effects: [],
      render_effects: []
    };
    for (const r of t)
      this.#u(r, n);
    this.is_fork || this.#c(), this.is_deferred() ? (this.#n(n.effects), this.#n(n.render_effects)) : (z = null, Zf(n.render_effects), Zf(n.effects), this.#i?.resolve()), Ye = null;
  }
  /**
   * Traverse the effect tree, executing effects or stashing
   * them for later execution as appropriate
   * @param {Effect} root
   * @param {EffectTarget} target
   */
  #u(t, n) {
    t.f ^= ce;
    for (var r = t.first; r !== null; ) {
      var a = r.f, o = (a & (oa | sa)) !== 0, s = o && (a & ce) !== 0, i = s || (a & Ja) !== 0 || this.skipped_effects.has(r);
      if ((r.f & Pu) !== 0 && r.b?.is_pending() && (n = {
        parent: n,
        effect: r,
        effects: [],
        render_effects: []
      }), !i && r.fn !== null) {
        o ? r.f ^= ce : (a & aw) !== 0 ? n.effects.push(r) : ua(r) && ((r.f & tr) !== 0 && this.#o.add(r), Eo(r));
        var u = r.first;
        if (u !== null) {
          r = u;
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
      (n.f & et) !== 0 ? this.#o.add(n) : (n.f & mt) !== 0 && this.#s.add(n), this.#l(n.deps), ye(n, ce);
  }
  /**
   * @param {Value[] | null} deps
   */
  #l(t) {
    if (t !== null)
      for (const n of t)
        (n.f & Oe) === 0 || (n.f & Nn) === 0 || (n.f ^= Nn, this.#l(
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
    this.previous.has(t) || this.previous.set(t, n), (t.f & Sr) === 0 && (this.current.set(t, t.v), Ye?.set(t, t.v));
  }
  activate() {
    z = this, this.apply();
  }
  deactivate() {
    z === this && (z = null, Ye = null);
  }
  flush() {
    if (this.activate(), st.length > 0) {
      if (gw(), z !== null && z !== this)
        return;
    } else this.#e === 0 && this.process([]);
    this.deactivate();
  }
  discard() {
    for (const t of this.#a) t(this);
    this.#a.clear();
  }
  #c() {
    if (this.#t === 0) {
      for (const t of this.#r) t();
      this.#r.clear();
    }
    this.#e === 0 && this.#f();
  }
  #f() {
    if (La.size > 1) {
      this.previous.clear();
      var t = Ye, n = !0, r = {
        parent: null,
        effect: null,
        effects: [],
        render_effects: []
      };
      for (const o of La) {
        if (o === this) {
          n = !1;
          continue;
        }
        const s = [];
        for (const [u, l] of this.current) {
          if (o.current.has(u))
            if (n && l !== o.current.get(u))
              o.current.set(u, l);
            else
              continue;
          s.push(u);
        }
        if (s.length === 0)
          continue;
        const i = [...o.current.keys()].filter((u) => !this.current.has(u));
        if (i.length > 0) {
          var a = st;
          st = [];
          const u = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Map();
          for (const c of s)
            Kg(c, i, u, l);
          if (st.length > 0) {
            z = o, o.apply();
            for (const c of st)
              o.#u(c, r);
            o.deactivate();
          }
          st = a;
        }
      }
      z = null, Ye = t;
    }
    this.committed = !0, La.delete(this);
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
    for (const t of this.#o)
      this.#s.delete(t), ye(t, et), Dr(t);
    for (const t of this.#s)
      ye(t, mt), Dr(t);
    this.flush();
  }
  /** @param {() => void} fn */
  oncommit(t) {
    this.#r.add(t);
  }
  /** @param {(batch: Batch) => void} fn */
  ondiscard(t) {
    this.#a.add(t);
  }
  settled() {
    return (this.#i ??= rw()).promise;
  }
  static ensure() {
    if (z === null) {
      const t = z = new kr();
      La.add(z), kr.enqueue(() => {
        z === t && t.flush();
      });
    }
    return z;
  }
  /** @param {() => void} task */
  static enqueue(t) {
    pw(t);
  }
  apply() {
  }
}
function gw() {
  var e = ln;
  gi = !0;
  try {
    var t = 0;
    for (go(!0); st.length > 0; ) {
      var n = kr.ensure();
      if (t++ > 1e3) {
        var r, a;
        hw();
      }
      n.process(st), Yt.clear();
    }
  } finally {
    gi = !1, go(e), xu = null;
  }
}
function hw() {
  try {
    iw();
  } catch (e) {
    Gg(e, xu);
  }
}
let vt = null;
function Zf(e) {
  var t = e.length;
  if (t !== 0) {
    for (var n = 0; n < t; ) {
      var r = e[n++];
      if ((r.f & (un | Ja)) === 0 && ua(r) && (vt = /* @__PURE__ */ new Set(), Eo(r), r.deps === null && r.first === null && r.nodes === null && (r.teardown === null && r.ac === null ? qg(r) : r.fn = null), vt?.size > 0)) {
        Yt.clear();
        for (const a of vt) {
          if ((a.f & (un | Ja)) !== 0) continue;
          const o = [a];
          let s = a.parent;
          for (; s !== null; )
            vt.has(s) && (vt.delete(s), o.push(s)), s = s.parent;
          for (let i = o.length - 1; i >= 0; i--) {
            const u = o[i];
            (u.f & (un | Ja)) === 0 && Eo(u);
          }
        }
        vt.clear();
      }
    }
    vt = null;
  }
}
function Kg(e, t, n, r) {
  if (!n.has(e) && (n.add(e), e.reactions !== null))
    for (const a of e.reactions) {
      const o = a.f;
      (o & Oe) !== 0 ? Kg(
        /** @type {Derived} */
        a,
        t,
        n,
        r
      ) : (o & (Yg | tr)) !== 0 && (o & et) === 0 && Cg(a, t, r) && (ye(a, et), Dr(
        /** @type {Effect} */
        a
      ));
    }
}
function Cg(e, t, n) {
  const r = n.get(e);
  if (r !== void 0) return r;
  if (e.deps !== null)
    for (const a of e.deps) {
      if (t.includes(a))
        return !0;
      if ((a.f & Oe) !== 0 && Cg(
        /** @type {Derived} */
        a,
        t,
        n
      ))
        return n.set(
          /** @type {Derived} */
          a,
          !0
        ), !0;
    }
  return n.set(e, !1), !1;
}
function Dr(e) {
  for (var t = xu = e; t.parent !== null; ) {
    t = t.parent;
    var n = t.f;
    if (gi && t === he && (n & tr) !== 0 && (n & Vg) === 0)
      return;
    if ((n & (sa | oa)) !== 0) {
      if ((n & ce) === 0) return;
      t.f ^= ce;
    }
  }
  st.push(t);
}
function jg(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var n = 0; n < t.length; n += 1)
      Yu(
        /** @type {Effect} */
        t[n]
      );
  }
}
function yw(e) {
  for (var t = e.parent; t !== null; ) {
    if ((t.f & Oe) === 0)
      return (t.f & un) === 0 ? (
        /** @type {Effect} */
        t
      ) : null;
    t = t.parent;
  }
  return null;
}
function Vu(e) {
  var t, n = he;
  ho(yw(e));
  try {
    e.f &= ~Nn, jg(e), t = nh(e);
  } finally {
    ho(n);
  }
  return t;
}
function Xg(e) {
  var t = Vu(e);
  if (e.equals(t) || (z?.is_fork || (e.v = t), e.wv = eh()), !ia)
    if (Ye !== null)
      (bo() || z?.is_fork) && Ye.set(e, t);
    else {
      var n = (e.f & ft) === 0 ? mt : ce;
      ye(e, n);
    }
}
let hi = /* @__PURE__ */ new Set();
const Yt = /* @__PURE__ */ new Map();
let Wg = !1;
function Ew(e, t) {
  var n = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: fw,
    rv: 0,
    wv: 0
  };
  return n;
}
// @__NO_SIDE_EFFECTS__
function $t(e, t) {
  const n = Ew(e);
  return Ow(n), n;
}
function Zt(e, t, n = !1) {
  x !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!tn || (x.f & Jf) !== 0) && Bg() && (x.f & (Oe | tr | Yg | Jf)) !== 0 && !Lt?.includes(e) && cw();
  let r = n ? Un(t) : t;
  return Nw(e, r);
}
function Nw(e, t) {
  if (!e.equals(t)) {
    var n = e.v;
    ia ? Yt.set(e, t) : Yt.set(e, n), e.v = t;
    var r = kr.ensure();
    r.capture(e, n), (e.f & Oe) !== 0 && ((e.f & et) !== 0 && Vu(
      /** @type {Derived} */
      e
    ), ye(e, (e.f & ft) !== 0 ? ce : mt)), e.wv = eh(), Jg(e, et), he !== null && (he.f & ce) !== 0 && (he.f & (oa | sa)) === 0 && ($e === null ? Sw([e]) : $e.push(e)), !r.is_fork && hi.size > 0 && !Wg && vw();
  }
  return t;
}
function vw() {
  Wg = !1;
  var e = ln;
  go(!0);
  const t = Array.from(hi);
  try {
    for (const n of t)
      (n.f & ce) !== 0 && ye(n, mt), ua(n) && Eo(n);
  } finally {
    go(e);
  }
  hi.clear();
}
function As(e) {
  Zt(e, e.v + 1);
}
function Jg(e, t) {
  var n = e.reactions;
  if (n !== null)
    for (var r = n.length, a = 0; a < r; a++) {
      var o = n[a], s = o.f, i = (s & et) === 0;
      if (i && ye(o, t), (s & Oe) !== 0) {
        var u = (
          /** @type {Derived} */
          o
        );
        Ye?.delete(u), (s & Nn) === 0 && (s & ft && (o.f |= Nn), Jg(u, mt));
      } else i && ((s & tr) !== 0 && vt !== null && vt.add(
        /** @type {Effect} */
        o
      ), Dr(
        /** @type {Effect} */
        o
      ));
    }
}
function Un(e) {
  if (typeof e != "object" || e === null || Ds in e)
    return e;
  const t = tw(e);
  if (t !== QT && t !== ew)
    return e;
  var n = /* @__PURE__ */ new Map(), r = zT(e), a = /* @__PURE__ */ $t(0), o = cn, s = (i) => {
    if (cn === o)
      return i();
    var u = x, l = cn;
    jn(null), zf(o);
    var c = i();
    return jn(u), zf(l), c;
  };
  return r && n.set("length", /* @__PURE__ */ $t(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(i, u, l) {
        (!("value" in l) || l.configurable === !1 || l.enumerable === !1 || l.writable === !1) && uw();
        var c = n.get(u);
        return c === void 0 ? c = s(() => {
          var m = /* @__PURE__ */ $t(l.value);
          return n.set(u, m), m;
        }) : Zt(c, l.value, !0), !0;
      },
      deleteProperty(i, u) {
        var l = n.get(u);
        if (l === void 0) {
          if (u in i) {
            const c = s(() => /* @__PURE__ */ $t(se));
            n.set(u, c), As(a);
          }
        } else
          Zt(l, se), As(a);
        return !0;
      },
      get(i, u, l) {
        if (u === Ds)
          return e;
        var c = n.get(u), m = u in i;
        if (c === void 0 && (!m || ks(i, u)?.writable) && (c = s(() => {
          var f = Un(m ? i[u] : se), y = /* @__PURE__ */ $t(f);
          return y;
        }), n.set(u, c)), c !== void 0) {
          var d = Ua(c);
          return d === se ? void 0 : d;
        }
        return Reflect.get(i, u, l);
      },
      getOwnPropertyDescriptor(i, u) {
        var l = Reflect.getOwnPropertyDescriptor(i, u);
        if (l && "value" in l) {
          var c = n.get(u);
          c && (l.value = Ua(c));
        } else if (l === void 0) {
          var m = n.get(u), d = m?.v;
          if (m !== void 0 && d !== se)
            return {
              enumerable: !0,
              configurable: !0,
              value: d,
              writable: !0
            };
        }
        return l;
      },
      has(i, u) {
        if (u === Ds)
          return !0;
        var l = n.get(u), c = l !== void 0 && l.v !== se || Reflect.has(i, u);
        if (l !== void 0 || he !== null && (!c || ks(i, u)?.writable)) {
          l === void 0 && (l = s(() => {
            var d = c ? Un(i[u]) : se, f = /* @__PURE__ */ $t(d);
            return f;
          }), n.set(u, l));
          var m = Ua(l);
          if (m === se)
            return !1;
        }
        return c;
      },
      set(i, u, l, c) {
        var m = n.get(u), d = u in i;
        if (r && u === "length")
          for (var f = l; f < /** @type {Source<number>} */
          m.v; f += 1) {
            var y = n.get(f + "");
            y !== void 0 ? Zt(y, se) : f in i && (y = s(() => /* @__PURE__ */ $t(se)), n.set(f + "", y));
          }
        if (m === void 0)
          (!d || ks(i, u)?.writable) && (m = s(() => /* @__PURE__ */ $t(void 0)), Zt(m, Un(l)), n.set(u, m));
        else {
          d = m.v !== se;
          var E = s(() => Un(l));
          Zt(m, E);
        }
        var N = Reflect.getOwnPropertyDescriptor(i, u);
        if (N?.set && N.set.call(c, l), !d) {
          if (r && typeof u == "string") {
            var v = (
              /** @type {Source<number>} */
              n.get("length")
            ), I = Number(u);
            Number.isInteger(I) && I >= v.v && Zt(v, I + 1);
          }
          As(a);
        }
        return !0;
      },
      ownKeys(i) {
        Ua(a);
        var u = Reflect.ownKeys(i).filter((m) => {
          var d = n.get(m);
          return d === void 0 || d.v !== se;
        });
        for (var [l, c] of n)
          c.v !== se && !(l in i) && u.push(l);
        return u;
      },
      setPrototypeOf() {
        lw();
      }
    }
  );
}
var Iw;
// @__NO_SIDE_EFFECTS__
function Tw(e) {
  return (
    /** @type {TemplateNode | null} */
    Iw.call(e)
  );
}
function Zg(e) {
  var t = x, n = he;
  jn(null), ho(null);
  try {
    return e();
  } finally {
    jn(t), ho(n);
  }
}
function bo() {
  return x !== null && !tn;
}
function Hg(e) {
  var t = e.teardown;
  if (t !== null) {
    const n = ia, r = x;
    Hf(!0), jn(null);
    try {
      t.call(null);
    } finally {
      Hf(n), jn(r);
    }
  }
}
function zg(e, t = !1) {
  var n = e.first;
  for (e.first = e.last = null; n !== null; ) {
    const a = n.ac;
    a !== null && Zg(() => {
      a.abort(Mg);
    });
    var r = n.next;
    (n.f & sa) !== 0 ? n.parent = null : Yu(n, t), n = r;
  }
}
function ww(e) {
  for (var t = e.first; t !== null; ) {
    var n = t.next;
    (t.f & oa) === 0 && Yu(t), t = n;
  }
}
function Yu(e, t = !0) {
  var n = !1;
  (t || (e.f & Vg) !== 0) && e.nodes !== null && e.nodes.end !== null && (_w(
    e.nodes.start,
    /** @type {TemplateNode} */
    e.nodes.end
  ), n = !0), zg(e, t && !n), yo(e, 0), ye(e, un);
  var r = e.nodes && e.nodes.t;
  if (r !== null)
    for (const o of r)
      o.stop();
  Hg(e);
  var a = e.parent;
  a !== null && a.first !== null && qg(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = null;
}
function _w(e, t) {
  for (; e !== null; ) {
    var n = e === t ? null : /* @__PURE__ */ Tw(e);
    e.remove(), e = n;
  }
}
function qg(e) {
  var t = e.parent, n = e.prev, r = e.next;
  n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
let ln = !1;
function go(e) {
  ln = e;
}
let ia = !1;
function Hf(e) {
  ia = e;
}
let x = null, tn = !1;
function jn(e) {
  x = e;
}
let he = null;
function ho(e) {
  he = e;
}
let Lt = null;
function Ow(e) {
  x !== null && (Lt === null ? Lt = [e] : Lt.push(e));
}
let te = null, Le = 0, $e = null;
function Sw(e) {
  $e = e;
}
let Qg = 1, Ar = 0, cn = Ar;
function zf(e) {
  cn = e;
}
function eh() {
  return ++Qg;
}
function ua(e) {
  var t = e.f;
  if ((t & et) !== 0)
    return !0;
  if (t & Oe && (e.f &= ~Nn), (t & mt) !== 0) {
    var n = e.deps;
    if (n !== null)
      for (var r = n.length, a = 0; a < r; a++) {
        var o = n[a];
        if (ua(
          /** @type {Derived} */
          o
        ) && Xg(
          /** @type {Derived} */
          o
        ), o.wv > e.wv)
          return !0;
      }
    (t & ft) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    Ye === null && ye(e, ce);
  }
  return !1;
}
function th(e, t, n = !0) {
  var r = e.reactions;
  if (r !== null && !Lt?.includes(e))
    for (var a = 0; a < r.length; a++) {
      var o = r[a];
      (o.f & Oe) !== 0 ? th(
        /** @type {Derived} */
        o,
        t,
        !1
      ) : t === o && (n ? ye(o, et) : (o.f & ce) !== 0 && ye(o, mt), Dr(
        /** @type {Effect} */
        o
      ));
    }
}
function nh(e) {
  var t = te, n = Le, r = $e, a = x, o = Lt, s = tn, i = cn, u = e.f;
  te = /** @type {null | Value[]} */
  null, Le = 0, $e = null, x = (u & (oa | sa)) === 0 ? e : null, Lt = null, e.ctx, tn = !1, cn = ++Ar, e.ac !== null && (Zg(() => {
    e.ac.abort(Mg);
  }), e.ac = null);
  try {
    e.f |= bi;
    var l = (
      /** @type {Function} */
      e.fn
    ), c = l(), m = e.deps;
    if (te !== null) {
      var d;
      if (yo(e, Le), m !== null && Le > 0)
        for (m.length = Le + te.length, d = 0; d < te.length; d++)
          m[Le + d] = te[d];
      else
        e.deps = m = te;
      if (bo() && (e.f & ft) !== 0)
        for (d = Le; d < m.length; d++)
          (m[d].reactions ??= []).push(e);
    } else m !== null && Le < m.length && (yo(e, Le), m.length = Le);
    if (Bg() && $e !== null && !tn && m !== null && (e.f & (Oe | mt | et)) === 0)
      for (d = 0; d < /** @type {Source[]} */
      $e.length; d++)
        th(
          $e[d],
          /** @type {Effect} */
          e
        );
    return a !== null && a !== e && (Ar++, $e !== null && (r === null ? r = $e : r.push(.../** @type {Source[]} */
    $e))), (e.f & Sr) !== 0 && (e.f ^= Sr), c;
  } catch (f) {
    return bw(f);
  } finally {
    e.f ^= bi, te = t, Le = n, $e = r, x = a, Lt = o, tn = s, cn = i;
  }
}
function kw(e, t) {
  let n = t.reactions;
  if (n !== null) {
    var r = qT.call(n, e);
    if (r !== -1) {
      var a = n.length - 1;
      a === 0 ? n = t.reactions = null : (n[r] = n[a], n.pop());
    }
  }
  n === null && (t.f & Oe) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (te === null || !te.includes(t)) && (ye(t, mt), (t.f & ft) !== 0 && (t.f ^= ft, t.f &= ~Nn), jg(
    /** @type {Derived} **/
    t
  ), yo(
    /** @type {Derived} **/
    t,
    0
  ));
}
function yo(e, t) {
  var n = e.deps;
  if (n !== null)
    for (var r = t; r < n.length; r++)
      kw(e, n[r]);
}
function Eo(e) {
  var t = e.f;
  if ((t & un) === 0) {
    ye(e, ce);
    var n = he, r = ln;
    he = e, ln = !0;
    try {
      (t & (tr | ow)) !== 0 ? ww(e) : zg(e), Hg(e);
      var a = nh(e);
      e.teardown = typeof a == "function" ? a : null, e.wv = Qg;
      var o;
      HT && mw && (e.f & et) !== 0 && e.deps;
    } finally {
      ln = r, he = n;
    }
  }
}
function Ua(e) {
  var t = e.f, n = (t & Oe) !== 0;
  if (x !== null && !tn) {
    var r = he !== null && (he.f & un) !== 0;
    if (!r && !Lt?.includes(e)) {
      var a = x.deps;
      if ((x.f & bi) !== 0)
        e.rv < Ar && (e.rv = Ar, te === null && a !== null && a[Le] === e ? Le++ : te === null ? te = [e] : te.includes(e) || te.push(e));
      else {
        (x.deps ??= []).push(e);
        var o = e.reactions;
        o === null ? e.reactions = [x] : o.includes(x) || o.push(x);
      }
    }
  }
  if (ia) {
    if (Yt.has(e))
      return Yt.get(e);
    if (n) {
      var s = (
        /** @type {Derived} */
        e
      ), i = s.v;
      return ((s.f & ce) === 0 && s.reactions !== null || ah(s)) && (i = Vu(s)), Yt.set(s, i), i;
    }
  } else n && (!Ye?.has(e) || z?.is_fork && !bo()) && (s = /** @type {Derived} */
  e, ua(s) && Xg(s), ln && bo() && (s.f & ft) === 0 && rh(s));
  if (Ye?.has(e))
    return Ye.get(e);
  if ((e.f & Sr) !== 0)
    throw e.v;
  return e.v;
}
function rh(e) {
  if (e.deps !== null) {
    e.f ^= ft;
    for (const t of e.deps)
      (t.reactions ??= []).push(e), (t.f & Oe) !== 0 && (t.f & ft) === 0 && rh(
        /** @type {Derived} */
        t
      );
  }
}
function ah(e) {
  if (e.v === se) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps)
    if (Yt.has(t) || (t.f & Oe) !== 0 && ah(
      /** @type {Derived} */
      t
    ))
      return !0;
  return !1;
}
const Dw = -7169;
function ye(e, t) {
  e.f = e.f & Dw | t;
}
function oh() {
  return {
    isDark: document.documentElement.classList.contains("night-mode")
  };
}
const Aw = Un(oh()), Lw = new MutationObserver((e, t) => {
  Aw.isDark = oh().isDark;
});
Lw.observe(document.documentElement, { attributeFilter: ["class"] });
const Uw = "5";
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add(Uw);
var _;
(function(e) {
  e[e.Canceled = 1] = "Canceled", e[e.Unknown = 2] = "Unknown", e[e.InvalidArgument = 3] = "InvalidArgument", e[e.DeadlineExceeded = 4] = "DeadlineExceeded", e[e.NotFound = 5] = "NotFound", e[e.AlreadyExists = 6] = "AlreadyExists", e[e.PermissionDenied = 7] = "PermissionDenied", e[e.ResourceExhausted = 8] = "ResourceExhausted", e[e.FailedPrecondition = 9] = "FailedPrecondition", e[e.Aborted = 10] = "Aborted", e[e.OutOfRange = 11] = "OutOfRange", e[e.Unimplemented = 12] = "Unimplemented", e[e.Internal = 13] = "Internal", e[e.Unavailable = 14] = "Unavailable", e[e.DataLoss = 15] = "DataLoss", e[e.Unauthenticated = 16] = "Unauthenticated";
})(_ || (_ = {}));
function Mu(e, t) {
  return e !== null && typeof e == "object" && "$typeName" in e && typeof e.$typeName == "string" ? t === void 0 ? !0 : t.typeName === e.$typeName : !1;
}
var g;
(function(e) {
  e[e.DOUBLE = 1] = "DOUBLE", e[e.FLOAT = 2] = "FLOAT", e[e.INT64 = 3] = "INT64", e[e.UINT64 = 4] = "UINT64", e[e.INT32 = 5] = "INT32", e[e.FIXED64 = 6] = "FIXED64", e[e.FIXED32 = 7] = "FIXED32", e[e.BOOL = 8] = "BOOL", e[e.STRING = 9] = "STRING", e[e.BYTES = 12] = "BYTES", e[e.UINT32 = 13] = "UINT32", e[e.SFIXED32 = 15] = "SFIXED32", e[e.SFIXED64 = 16] = "SFIXED64", e[e.SINT32 = 17] = "SINT32", e[e.SINT64 = 18] = "SINT64";
})(g || (g = {}));
function Fw() {
  let e = 0, t = 0;
  for (let r = 0; r < 28; r += 7) {
    let a = this.buf[this.pos++];
    if (e |= (a & 127) << r, (a & 128) == 0)
      return this.assertBounds(), [e, t];
  }
  let n = this.buf[this.pos++];
  if (e |= (n & 15) << 28, t = (n & 112) >> 4, (n & 128) == 0)
    return this.assertBounds(), [e, t];
  for (let r = 3; r <= 31; r += 7) {
    let a = this.buf[this.pos++];
    if (t |= (a & 127) << r, (a & 128) == 0)
      return this.assertBounds(), [e, t];
  }
  throw new Error("invalid varint");
}
function Ls(e, t, n) {
  for (let o = 0; o < 28; o = o + 7) {
    const s = e >>> o, i = !(!(s >>> 7) && t == 0), u = (i ? s | 128 : s) & 255;
    if (n.push(u), !i)
      return;
  }
  const r = e >>> 28 & 15 | (t & 7) << 4, a = t >> 3 != 0;
  if (n.push((a ? r | 128 : r) & 255), !!a) {
    for (let o = 3; o < 31; o = o + 7) {
      const s = t >>> o, i = !!(s >>> 7), u = (i ? s | 128 : s) & 255;
      if (n.push(u), !i)
        return;
    }
    n.push(t >>> 31 & 1);
  }
}
const Za = 4294967296;
function qf(e) {
  const t = e[0] === "-";
  t && (e = e.slice(1));
  const n = 1e6;
  let r = 0, a = 0;
  function o(s, i) {
    const u = Number(e.slice(s, i));
    a *= n, r = r * n + u, r >= Za && (a = a + (r / Za | 0), r = r % Za);
  }
  return o(-24, -18), o(-18, -12), o(-12, -6), o(-6), t ? ih(r, a) : Bu(r, a);
}
function Rw(e, t) {
  let n = Bu(e, t);
  const r = n.hi & 2147483648;
  r && (n = ih(n.lo, n.hi));
  const a = sh(n.lo, n.hi);
  return r ? "-" + a : a;
}
function sh(e, t) {
  if ({ lo: e, hi: t } = $w(e, t), t <= 2097151)
    return String(Za * t + e);
  const n = e & 16777215, r = (e >>> 24 | t << 8) & 16777215, a = t >> 16 & 65535;
  let o = n + r * 6777216 + a * 6710656, s = r + a * 8147497, i = a * 2;
  const u = 1e7;
  return o >= u && (s += Math.floor(o / u), o %= u), s >= u && (i += Math.floor(s / u), s %= u), i.toString() + Qf(s) + Qf(o);
}
function $w(e, t) {
  return { lo: e >>> 0, hi: t >>> 0 };
}
function Bu(e, t) {
  return { lo: e | 0, hi: t | 0 };
}
function ih(e, t) {
  return t = ~t, e ? e = ~e + 1 : t += 1, Bu(e, t);
}
const Qf = (e) => {
  const t = String(e);
  return "0000000".slice(t.length) + t;
};
function yi(e, t) {
  if (e >= 0) {
    for (; e > 127; )
      t.push(e & 127 | 128), e = e >>> 7;
    t.push(e);
  } else {
    for (let n = 0; n < 9; n++)
      t.push(e & 127 | 128), e = e >> 7;
    t.push(1);
  }
}
function Pw() {
  let e = this.buf[this.pos++], t = e & 127;
  if ((e & 128) == 0)
    return this.assertBounds(), t;
  if (e = this.buf[this.pos++], t |= (e & 127) << 7, (e & 128) == 0)
    return this.assertBounds(), t;
  if (e = this.buf[this.pos++], t |= (e & 127) << 14, (e & 128) == 0)
    return this.assertBounds(), t;
  if (e = this.buf[this.pos++], t |= (e & 127) << 21, (e & 128) == 0)
    return this.assertBounds(), t;
  e = this.buf[this.pos++], t |= (e & 15) << 28;
  for (let n = 5; (e & 128) !== 0 && n < 10; n++)
    e = this.buf[this.pos++];
  if ((e & 128) != 0)
    throw new Error("invalid varint");
  return this.assertBounds(), t >>> 0;
}
const D = /* @__PURE__ */ xw();
function xw() {
  const e = new DataView(new ArrayBuffer(8));
  if (typeof BigInt == "function" && typeof e.getBigInt64 == "function" && typeof e.getBigUint64 == "function" && typeof e.setBigInt64 == "function" && typeof e.setBigUint64 == "function" && (globalThis.Deno || typeof process != "object" || typeof process.env != "object" || process.env.BUF_BIGINT_DISABLE !== "1")) {
    const t = BigInt("-9223372036854775808"), n = BigInt("9223372036854775807"), r = BigInt("0"), a = BigInt("18446744073709551615");
    return {
      zero: BigInt(0),
      supported: !0,
      parse(o) {
        const s = typeof o == "bigint" ? o : BigInt(o);
        if (s > n || s < t)
          throw new Error(`invalid int64: ${o}`);
        return s;
      },
      uParse(o) {
        const s = typeof o == "bigint" ? o : BigInt(o);
        if (s > a || s < r)
          throw new Error(`invalid uint64: ${o}`);
        return s;
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
      dec(o, s) {
        return e.setInt32(0, o, !0), e.setInt32(4, s, !0), e.getBigInt64(0, !0);
      },
      uDec(o, s) {
        return e.setInt32(0, o, !0), e.setInt32(4, s, !0), e.getBigUint64(0, !0);
      }
    };
  }
  return {
    zero: "0",
    supported: !1,
    parse(t) {
      return typeof t != "string" && (t = t.toString()), em(t), t;
    },
    uParse(t) {
      return typeof t != "string" && (t = t.toString()), tm(t), t;
    },
    enc(t) {
      return typeof t != "string" && (t = t.toString()), em(t), qf(t);
    },
    uEnc(t) {
      return typeof t != "string" && (t = t.toString()), tm(t), qf(t);
    },
    dec(t, n) {
      return Rw(t, n);
    },
    uDec(t, n) {
      return sh(t, n);
    }
  };
}
function em(e) {
  if (!/^-?[0-9]+$/.test(e))
    throw new Error("invalid int64: " + e);
}
function tm(e) {
  if (!/^[0-9]+$/.test(e))
    throw new Error("invalid uint64: " + e);
}
function vn(e, t) {
  switch (e) {
    case g.STRING:
      return "";
    case g.BOOL:
      return !1;
    case g.DOUBLE:
    case g.FLOAT:
      return 0;
    case g.INT64:
    case g.UINT64:
    case g.SFIXED64:
    case g.FIXED64:
    case g.SINT64:
      return t ? "0" : D.zero;
    case g.BYTES:
      return new Uint8Array(0);
    default:
      return 0;
  }
}
function Vw(e, t) {
  switch (e) {
    case g.BOOL:
      return t === !1;
    case g.STRING:
      return t === "";
    case g.BYTES:
      return t instanceof Uint8Array && !t.byteLength;
    default:
      return t == 0;
  }
}
const uh = 2, kt = /* @__PURE__ */ Symbol.for("reflect unsafe local");
function lh(e, t) {
  const n = e[t.localName].case;
  return n === void 0 ? n : t.fields.find((r) => r.localName === n);
}
function Yw(e, t) {
  const n = t.localName;
  if (t.oneof)
    return e[t.oneof.localName].case === n;
  if (t.presence != uh)
    return e[n] !== void 0 && Object.prototype.hasOwnProperty.call(e, n);
  switch (t.fieldKind) {
    case "list":
      return e[n].length > 0;
    case "map":
      return Object.keys(e[n]).length > 0;
    case "scalar":
      return !Vw(t.scalar, e[n]);
    case "enum":
      return e[n] !== t.enum.values[0].number;
  }
  throw new Error("message field with implicit presence");
}
function Lr(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t) && e[t] !== void 0;
}
function ch(e, t) {
  if (t.oneof) {
    const n = e[t.oneof.localName];
    return n.case === t.localName ? n.value : void 0;
  }
  return e[t.localName];
}
function fh(e, t, n) {
  t.oneof ? e[t.oneof.localName] = {
    case: t.localName,
    value: n
  } : e[t.localName] = n;
}
function Mw(e, t) {
  const n = t.localName;
  if (t.oneof) {
    const r = t.oneof.localName;
    e[r].case === n && (e[r] = { case: void 0 });
  } else if (t.presence != uh)
    delete e[n];
  else
    switch (t.fieldKind) {
      case "map":
        e[n] = {};
        break;
      case "list":
        e[n] = [];
        break;
      case "enum":
        e[n] = t.enum.values[0].number;
        break;
      case "scalar":
        e[n] = vn(t.scalar, t.longAsString);
        break;
    }
}
function Ct(e) {
  return e !== null && typeof e == "object" && !Array.isArray(e);
}
function Gu(e, t) {
  var n, r, a, o;
  if (Ct(e) && kt in e && "add" in e && "field" in e && typeof e.field == "function") {
    if (t !== void 0) {
      const s = t, i = e.field();
      return s.listKind == i.listKind && s.scalar === i.scalar && ((n = s.message) === null || n === void 0 ? void 0 : n.typeName) === ((r = i.message) === null || r === void 0 ? void 0 : r.typeName) && ((a = s.enum) === null || a === void 0 ? void 0 : a.typeName) === ((o = i.enum) === null || o === void 0 ? void 0 : o.typeName);
    }
    return !0;
  }
  return !1;
}
function Ku(e, t) {
  var n, r, a, o;
  if (Ct(e) && kt in e && "has" in e && "field" in e && typeof e.field == "function") {
    if (t !== void 0) {
      const s = t, i = e.field();
      return s.mapKey === i.mapKey && s.mapKind == i.mapKind && s.scalar === i.scalar && ((n = s.message) === null || n === void 0 ? void 0 : n.typeName) === ((r = i.message) === null || r === void 0 ? void 0 : r.typeName) && ((a = s.enum) === null || a === void 0 ? void 0 : a.typeName) === ((o = i.enum) === null || o === void 0 ? void 0 : o.typeName);
    }
    return !0;
  }
  return !1;
}
function Cu(e, t) {
  return Ct(e) && kt in e && "desc" in e && Ct(e.desc) && e.desc.kind === "message" && (t === void 0 || e.desc.typeName == t.typeName);
}
function Bw(e) {
  return mh(e.$typeName);
}
function la(e) {
  const t = e.fields[0];
  return mh(e.typeName) && t !== void 0 && t.fieldKind == "scalar" && t.name == "value" && t.number == 1;
}
function mh(e) {
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
const Gw = 999, Kw = 998, Ha = 2;
function tt(e, t) {
  if (Mu(t, e))
    return t;
  const n = Jw(e);
  return t !== void 0 && Cw(e, n, t), n;
}
function Cw(e, t, n) {
  for (const r of e.members) {
    let a = n[r.localName];
    if (a == null)
      continue;
    let o;
    if (r.kind == "oneof") {
      const s = lh(n, r);
      if (!s)
        continue;
      o = s, a = ch(n, s);
    } else
      o = r;
    switch (o.fieldKind) {
      case "message":
        a = ju(o, a);
        break;
      case "scalar":
        a = dh(o, a);
        break;
      case "list":
        a = Xw(o, a);
        break;
      case "map":
        a = jw(o, a);
        break;
    }
    fh(t, o, a);
  }
  return t;
}
function dh(e, t) {
  return e.scalar == g.BYTES ? Xu(t) : t;
}
function jw(e, t) {
  if (Ct(t)) {
    if (e.scalar == g.BYTES)
      return nm(t, Xu);
    if (e.mapKind == "message")
      return nm(t, (n) => ju(e, n));
  }
  return t;
}
function Xw(e, t) {
  if (Array.isArray(t)) {
    if (e.scalar == g.BYTES)
      return t.map(Xu);
    if (e.listKind == "message")
      return t.map((n) => ju(e, n));
  }
  return t;
}
function ju(e, t) {
  if (e.fieldKind == "message" && !e.oneof && la(e.message))
    return dh(e.message.fields[0], t);
  if (Ct(t)) {
    if (e.message.typeName == "google.protobuf.Struct" && e.parent.typeName !== "google.protobuf.Value")
      return t;
    if (!Mu(t, e.message))
      return tt(e.message, t);
  }
  return t;
}
function Xu(e) {
  return Array.isArray(e) ? new Uint8Array(e) : e;
}
function nm(e, t) {
  const n = {};
  for (const r of Object.entries(e))
    n[r[0]] = t(r[1]);
  return n;
}
const Ww = /* @__PURE__ */ Symbol(), rm = /* @__PURE__ */ new WeakMap();
function Jw(e) {
  let t;
  if (Zw(e)) {
    const n = rm.get(e);
    let r, a;
    if (n)
      ({ prototype: r, members: a } = n);
    else {
      r = {}, a = /* @__PURE__ */ new Set();
      for (const o of e.members)
        o.kind != "oneof" && (o.fieldKind != "scalar" && o.fieldKind != "enum" || o.presence != Ha && (a.add(o), r[o.localName] = Us(o)));
      rm.set(e, { prototype: r, members: a });
    }
    t = Object.create(r), t.$typeName = e.typeName;
    for (const o of e.members)
      a.has(o) || o.kind == "field" && (o.fieldKind == "message" || (o.fieldKind == "scalar" || o.fieldKind == "enum") && o.presence != Ha) || (t[o.localName] = Us(o));
  } else {
    t = {
      $typeName: e.typeName
    };
    for (const n of e.members)
      (n.kind == "oneof" || n.presence == Ha) && (t[n.localName] = Us(n));
  }
  return t;
}
function Zw(e) {
  switch (e.file.edition) {
    case Gw:
      return !1;
    case Kw:
      return !0;
    default:
      return e.fields.some((t) => t.presence != Ha && t.fieldKind != "message" && !t.oneof);
  }
}
function Us(e) {
  if (e.kind == "oneof")
    return { case: void 0 };
  if (e.fieldKind == "list")
    return [];
  if (e.fieldKind == "map")
    return {};
  if (e.fieldKind == "message")
    return Ww;
  const t = e.getDefaultValue();
  return t !== void 0 ? e.fieldKind == "scalar" && e.longAsString ? t.toString() : t : e.fieldKind == "scalar" ? vn(e.scalar, e.longAsString) : e.enum.values[0].number;
}
const Hw = [
  "FieldValueInvalidError",
  "FieldListRangeError",
  "ForeignFieldError"
];
class Ee extends Error {
  constructor(t, n, r = "FieldValueInvalidError") {
    super(n), this.name = r, this.field = () => t;
  }
}
function zw(e) {
  return e instanceof Error && Hw.includes(e.name) && "field" in e && typeof e.field == "function";
}
const Fs = /* @__PURE__ */ Symbol.for("@bufbuild/protobuf/text-encoding");
function Wu() {
  if (globalThis[Fs] == null) {
    const e = new globalThis.TextEncoder(), t = new globalThis.TextDecoder();
    globalThis[Fs] = {
      encodeUtf8(n) {
        return e.encode(n);
      },
      decodeUtf8(n) {
        return t.decode(n);
      },
      checkUtf8(n) {
        try {
          return encodeURIComponent(n), !0;
        } catch {
          return !1;
        }
      }
    };
  }
  return globalThis[Fs];
}
var F;
(function(e) {
  e[e.Varint = 0] = "Varint", e[e.Bit64 = 1] = "Bit64", e[e.LengthDelimited = 2] = "LengthDelimited", e[e.StartGroup = 3] = "StartGroup", e[e.EndGroup = 4] = "EndGroup", e[e.Bit32 = 5] = "Bit32";
})(F || (F = {}));
const ph = 34028234663852886e22, bh = -34028234663852886e22, gh = 4294967295, hh = 2147483647, yh = -2147483648;
class Eh {
  constructor(t = Wu().encodeUtf8) {
    this.encodeUtf8 = t, this.stack = [], this.chunks = [], this.buf = [];
  }
  /**
   * Return all bytes written and reset this writer.
   */
  finish() {
    this.buf.length && (this.chunks.push(new Uint8Array(this.buf)), this.buf = []);
    let t = 0;
    for (let a = 0; a < this.chunks.length; a++)
      t += this.chunks[a].length;
    let n = new Uint8Array(t), r = 0;
    for (let a = 0; a < this.chunks.length; a++)
      n.set(this.chunks[a], r), r += this.chunks[a].length;
    return this.chunks = [], n;
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
    let t = this.finish(), n = this.stack.pop();
    if (!n)
      throw new Error("invalid state, fork stack empty");
    return this.chunks = n.chunks, this.buf = n.buf, this.uint32(t.byteLength), this.raw(t);
  }
  /**
   * Writes a tag (field number and wire type).
   *
   * Equivalent to `uint32( (fieldNo << 3 | type) >>> 0 )`.
   *
   * Generated code should compute the tag ahead of time and call `uint32()`.
   */
  tag(t, n) {
    return this.uint32((t << 3 | n) >>> 0);
  }
  /**
   * Write a chunk of raw bytes.
   */
  raw(t) {
    return this.buf.length && (this.chunks.push(new Uint8Array(this.buf)), this.buf = []), this.chunks.push(t), this;
  }
  /**
   * Write a `uint32` value, an unsigned 32 bit varint.
   */
  uint32(t) {
    for (am(t); t > 127; )
      this.buf.push(t & 127 | 128), t = t >>> 7;
    return this.buf.push(t), this;
  }
  /**
   * Write a `int32` value, a signed 32 bit varint.
   */
  int32(t) {
    return Rs(t), yi(t, this.buf), this;
  }
  /**
   * Write a `bool` value, a variant.
   */
  bool(t) {
    return this.buf.push(t ? 1 : 0), this;
  }
  /**
   * Write a `bytes` value, length-delimited arbitrary data.
   */
  bytes(t) {
    return this.uint32(t.byteLength), this.raw(t);
  }
  /**
   * Write a `string` value, length-delimited data converted to UTF-8 text.
   */
  string(t) {
    let n = this.encodeUtf8(t);
    return this.uint32(n.byteLength), this.raw(n);
  }
  /**
   * Write a `float` value, 32-bit floating point number.
   */
  float(t) {
    qw(t);
    let n = new Uint8Array(4);
    return new DataView(n.buffer).setFloat32(0, t, !0), this.raw(n);
  }
  /**
   * Write a `double` value, a 64-bit floating point number.
   */
  double(t) {
    let n = new Uint8Array(8);
    return new DataView(n.buffer).setFloat64(0, t, !0), this.raw(n);
  }
  /**
   * Write a `fixed32` value, an unsigned, fixed-length 32-bit integer.
   */
  fixed32(t) {
    am(t);
    let n = new Uint8Array(4);
    return new DataView(n.buffer).setUint32(0, t, !0), this.raw(n);
  }
  /**
   * Write a `sfixed32` value, a signed, fixed-length 32-bit integer.
   */
  sfixed32(t) {
    Rs(t);
    let n = new Uint8Array(4);
    return new DataView(n.buffer).setInt32(0, t, !0), this.raw(n);
  }
  /**
   * Write a `sint32` value, a signed, zigzag-encoded 32-bit varint.
   */
  sint32(t) {
    return Rs(t), t = (t << 1 ^ t >> 31) >>> 0, yi(t, this.buf), this;
  }
  /**
   * Write a `fixed64` value, a signed, fixed-length 64-bit integer.
   */
  sfixed64(t) {
    let n = new Uint8Array(8), r = new DataView(n.buffer), a = D.enc(t);
    return r.setInt32(0, a.lo, !0), r.setInt32(4, a.hi, !0), this.raw(n);
  }
  /**
   * Write a `fixed64` value, an unsigned, fixed-length 64 bit integer.
   */
  fixed64(t) {
    let n = new Uint8Array(8), r = new DataView(n.buffer), a = D.uEnc(t);
    return r.setInt32(0, a.lo, !0), r.setInt32(4, a.hi, !0), this.raw(n);
  }
  /**
   * Write a `int64` value, a signed 64-bit varint.
   */
  int64(t) {
    let n = D.enc(t);
    return Ls(n.lo, n.hi, this.buf), this;
  }
  /**
   * Write a `sint64` value, a signed, zig-zag-encoded 64-bit varint.
   */
  sint64(t) {
    const n = D.enc(t), r = n.hi >> 31, a = n.lo << 1 ^ r, o = (n.hi << 1 | n.lo >>> 31) ^ r;
    return Ls(a, o, this.buf), this;
  }
  /**
   * Write a `uint64` value, an unsigned 64-bit varint.
   */
  uint64(t) {
    const n = D.uEnc(t);
    return Ls(n.lo, n.hi, this.buf), this;
  }
}
class Ju {
  constructor(t, n = Wu().decodeUtf8) {
    this.decodeUtf8 = n, this.varint64 = Fw, this.uint32 = Pw, this.buf = t, this.len = t.length, this.pos = 0, this.view = new DataView(t.buffer, t.byteOffset, t.byteLength);
  }
  /**
   * Reads a tag - field number and wire type.
   */
  tag() {
    let t = this.uint32(), n = t >>> 3, r = t & 7;
    if (n <= 0 || r < 0 || r > 5)
      throw new Error("illegal tag: field no " + n + " wire type " + r);
    return [n, r];
  }
  /**
   * Skip one element and return the skipped data.
   *
   * When skipping StartGroup, provide the tags field number to check for
   * matching field number in the EndGroup tag.
   */
  skip(t, n) {
    let r = this.pos;
    switch (t) {
      case F.Varint:
        for (; this.buf[this.pos++] & 128; )
          ;
        break;
      // @ts-ignore TS7029: Fallthrough case in switch -- ignore instead of expect-error for compiler settings without noFallthroughCasesInSwitch: true
      case F.Bit64:
        this.pos += 4;
      case F.Bit32:
        this.pos += 4;
        break;
      case F.LengthDelimited:
        let a = this.uint32();
        this.pos += a;
        break;
      case F.StartGroup:
        for (; ; ) {
          const [o, s] = this.tag();
          if (s === F.EndGroup) {
            if (n !== void 0 && o !== n)
              throw new Error("invalid end group tag");
            break;
          }
          this.skip(s, o);
        }
        break;
      default:
        throw new Error("cant skip wire type " + t);
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
    let t = this.uint32();
    return t >>> 1 ^ -(t & 1);
  }
  /**
   * Read a `int64` field, a signed 64-bit varint.
   */
  int64() {
    return D.dec(...this.varint64());
  }
  /**
   * Read a `uint64` field, an unsigned 64-bit varint.
   */
  uint64() {
    return D.uDec(...this.varint64());
  }
  /**
   * Read a `sint64` field, a signed, zig-zag-encoded 64-bit varint.
   */
  sint64() {
    let [t, n] = this.varint64(), r = -(t & 1);
    return t = (t >>> 1 | (n & 1) << 31) ^ r, n = n >>> 1 ^ r, D.dec(t, n);
  }
  /**
   * Read a `bool` field, a variant.
   */
  bool() {
    let [t, n] = this.varint64();
    return t !== 0 || n !== 0;
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
    return D.uDec(this.sfixed32(), this.sfixed32());
  }
  /**
   * Read a `fixed64` field, a signed, fixed-length 64-bit integer.
   */
  sfixed64() {
    return D.dec(this.sfixed32(), this.sfixed32());
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
    let t = this.uint32(), n = this.pos;
    return this.pos += t, this.assertBounds(), this.buf.subarray(n, n + t);
  }
  /**
   * Read a `string` field, length-delimited data converted to UTF-8 text.
   */
  string() {
    return this.decodeUtf8(this.bytes());
  }
}
function Rs(e) {
  if (typeof e == "string")
    e = Number(e);
  else if (typeof e != "number")
    throw new Error("invalid int32: " + typeof e);
  if (!Number.isInteger(e) || e > hh || e < yh)
    throw new Error("invalid int32: " + e);
}
function am(e) {
  if (typeof e == "string")
    e = Number(e);
  else if (typeof e != "number")
    throw new Error("invalid uint32: " + typeof e);
  if (!Number.isInteger(e) || e > gh || e < 0)
    throw new Error("invalid uint32: " + e);
}
function qw(e) {
  if (typeof e == "string") {
    const t = e;
    if (e = Number(e), Number.isNaN(e) && t !== "NaN")
      throw new Error("invalid float32: " + t);
  } else if (typeof e != "number")
    throw new Error("invalid float32: " + typeof e);
  if (Number.isFinite(e) && (e > ph || e < bh))
    throw new Error("invalid float32: " + e);
}
function Ht(e, t) {
  const n = e.fieldKind == "list" ? Gu(t, e) : e.fieldKind == "map" ? Ku(t, e) : Zu(e, t);
  if (n === !0)
    return;
  let r;
  switch (e.fieldKind) {
    case "list":
      r = `expected ${Ih(e)}, got ${W(t)}`;
      break;
    case "map":
      r = `expected ${Th(e)}, got ${W(t)}`;
      break;
    default:
      r = No(e, t, n);
  }
  return new Ee(e, r);
}
function om(e, t, n) {
  const r = Zu(e, n);
  if (r !== !0)
    return new Ee(e, `list item #${t + 1}: ${No(e, n, r)}`);
}
function Qw(e, t, n) {
  const r = Nh(t, e.mapKey);
  if (r !== !0)
    return new Ee(e, `invalid map key: ${No({ scalar: e.mapKey }, t, r)}`);
  const a = Zu(e, n);
  if (a !== !0)
    return new Ee(e, `map entry ${W(t)}: ${No(e, n, a)}`);
}
function Zu(e, t) {
  return e.scalar !== void 0 ? Nh(t, e.scalar) : e.enum !== void 0 ? e.enum.open ? Number.isInteger(t) : e.enum.values.some((n) => n.number === t) : Cu(t, e.message);
}
function Nh(e, t) {
  switch (t) {
    case g.DOUBLE:
      return typeof e == "number";
    case g.FLOAT:
      return typeof e != "number" ? !1 : Number.isNaN(e) || !Number.isFinite(e) ? !0 : e > ph || e < bh ? `${e.toFixed()} out of range` : !0;
    case g.INT32:
    case g.SFIXED32:
    case g.SINT32:
      return typeof e != "number" || !Number.isInteger(e) ? !1 : e > hh || e < yh ? `${e.toFixed()} out of range` : !0;
    case g.FIXED32:
    case g.UINT32:
      return typeof e != "number" || !Number.isInteger(e) ? !1 : e > gh || e < 0 ? `${e.toFixed()} out of range` : !0;
    case g.BOOL:
      return typeof e == "boolean";
    case g.STRING:
      return typeof e != "string" ? !1 : Wu().checkUtf8(e) || "invalid UTF8";
    case g.BYTES:
      return e instanceof Uint8Array;
    case g.INT64:
    case g.SFIXED64:
    case g.SINT64:
      if (typeof e == "bigint" || typeof e == "number" || typeof e == "string" && e.length > 0)
        try {
          return D.parse(e), !0;
        } catch {
          return `${e} out of range`;
        }
      return !1;
    case g.FIXED64:
    case g.UINT64:
      if (typeof e == "bigint" || typeof e == "number" || typeof e == "string" && e.length > 0)
        try {
          return D.uParse(e), !0;
        } catch {
          return `${e} out of range`;
        }
      return !1;
  }
}
function No(e, t, n) {
  return n = typeof n == "string" ? `: ${n}` : `, got ${W(t)}`, e.scalar !== void 0 ? `expected ${e_(e.scalar)}` + n : e.enum !== void 0 ? `expected ${e.enum.toString()}` + n : `expected ${vh(e.message)}` + n;
}
function W(e) {
  switch (typeof e) {
    case "object":
      return e === null ? "null" : e instanceof Uint8Array ? `Uint8Array(${e.length})` : Array.isArray(e) ? `Array(${e.length})` : Gu(e) ? Ih(e.field()) : Ku(e) ? Th(e.field()) : Cu(e) ? vh(e.desc) : Mu(e) ? `message ${e.$typeName}` : "object";
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
function vh(e) {
  return `ReflectMessage (${e.typeName})`;
}
function Ih(e) {
  switch (e.listKind) {
    case "message":
      return `ReflectList (${e.message.toString()})`;
    case "enum":
      return `ReflectList (${e.enum.toString()})`;
    case "scalar":
      return `ReflectList (${g[e.scalar]})`;
  }
}
function Th(e) {
  switch (e.mapKind) {
    case "message":
      return `ReflectMap (${g[e.mapKey]}, ${e.message.toString()})`;
    case "enum":
      return `ReflectMap (${g[e.mapKey]}, ${e.enum.toString()})`;
    case "scalar":
      return `ReflectMap (${g[e.mapKey]}, ${g[e.scalar]})`;
  }
}
function e_(e) {
  switch (e) {
    case g.STRING:
      return "string";
    case g.BOOL:
      return "boolean";
    case g.INT64:
    case g.SINT64:
    case g.SFIXED64:
      return "bigint (int64)";
    case g.UINT64:
    case g.FIXED64:
      return "bigint (uint64)";
    case g.BYTES:
      return "Uint8Array";
    case g.DOUBLE:
      return "number (float64)";
    case g.FLOAT:
      return "number (float32)";
    case g.FIXED32:
    case g.UINT32:
      return "number (uint32)";
    case g.INT32:
    case g.SFIXED32:
    case g.SINT32:
      return "number (int32)";
  }
}
function Ce(e, t, n = !0) {
  return new wh(e, t, n);
}
const sm = /* @__PURE__ */ new WeakMap();
class wh {
  get sortedFields() {
    const t = sm.get(this.desc);
    if (t)
      return t;
    const n = this.desc.fields.concat().sort((r, a) => r.number - a.number);
    return sm.set(this.desc, n), n;
  }
  constructor(t, n, r = !0) {
    this.lists = /* @__PURE__ */ new Map(), this.maps = /* @__PURE__ */ new Map(), this.check = r, this.desc = t, this.message = this[kt] = n ?? tt(t), this.fields = t.fields, this.oneofs = t.oneofs, this.members = t.members;
  }
  findNumber(t) {
    return this._fieldsByNumber || (this._fieldsByNumber = new Map(this.desc.fields.map((n) => [n.number, n]))), this._fieldsByNumber.get(t);
  }
  oneofCase(t) {
    return sr(this.message, t), lh(this.message, t);
  }
  isSet(t) {
    return sr(this.message, t), Yw(this.message, t);
  }
  clear(t) {
    sr(this.message, t), Mw(this.message, t);
  }
  get(t) {
    sr(this.message, t);
    const n = ch(this.message, t);
    switch (t.fieldKind) {
      case "list":
        let r = this.lists.get(t);
        return (!r || r[kt] !== n) && this.lists.set(
          t,
          // biome-ignore lint/suspicious/noAssignInExpressions: no
          r = new t_(t, n, this.check)
        ), r;
      case "map":
        let a = this.maps.get(t);
        return (!a || a[kt] !== n) && this.maps.set(
          t,
          // biome-ignore lint/suspicious/noAssignInExpressions: no
          a = new n_(t, n, this.check)
        ), a;
      case "message":
        return zu(t, n, this.check);
      case "scalar":
        return n === void 0 ? vn(t.scalar, !1) : qu(t, n);
      case "enum":
        return n ?? t.enum.values[0].number;
    }
  }
  set(t, n) {
    if (sr(this.message, t), this.check) {
      const a = Ht(t, n);
      if (a)
        throw a;
    }
    let r;
    t.fieldKind == "message" ? r = Hu(t, n) : Ku(n) || Gu(n) ? r = n[kt] : r = Qu(t, n), fh(this.message, t, r);
  }
  getUnknown() {
    return this.message.$unknown;
  }
  setUnknown(t) {
    this.message.$unknown = t;
  }
}
function sr(e, t) {
  if (t.parent.typeName !== e.$typeName)
    throw new Ee(t, `cannot use ${t.toString()} with message ${e.$typeName}`, "ForeignFieldError");
}
class t_ {
  field() {
    return this._field;
  }
  get size() {
    return this._arr.length;
  }
  constructor(t, n, r) {
    this._field = t, this._arr = this[kt] = n, this.check = r;
  }
  get(t) {
    const n = this._arr[t];
    return n === void 0 ? void 0 : $s(this._field, n, this.check);
  }
  set(t, n) {
    if (t < 0 || t >= this._arr.length)
      throw new Ee(this._field, `list item #${t + 1}: out of range`);
    if (this.check) {
      const r = om(this._field, t, n);
      if (r)
        throw r;
    }
    this._arr[t] = im(this._field, n);
  }
  add(t) {
    if (this.check) {
      const n = om(this._field, this._arr.length, t);
      if (n)
        throw n;
    }
    this._arr.push(im(this._field, t));
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
    for (const t of this._arr)
      yield $s(this._field, t, this.check);
  }
  *entries() {
    for (let t = 0; t < this._arr.length; t++)
      yield [t, $s(this._field, this._arr[t], this.check)];
  }
}
class n_ {
  constructor(t, n, r = !0) {
    this.obj = this[kt] = n ?? {}, this.check = r, this._field = t;
  }
  field() {
    return this._field;
  }
  set(t, n) {
    if (this.check) {
      const r = Qw(this._field, t, n);
      if (r)
        throw r;
    }
    return this.obj[Fa(t)] = r_(this._field, n), this;
  }
  delete(t) {
    const n = Fa(t), r = Object.prototype.hasOwnProperty.call(this.obj, n);
    return r && delete this.obj[n], r;
  }
  clear() {
    for (const t of Object.keys(this.obj))
      delete this.obj[t];
  }
  get(t) {
    let n = this.obj[Fa(t)];
    return n !== void 0 && (n = Ps(this._field, n, this.check)), n;
  }
  has(t) {
    return Object.prototype.hasOwnProperty.call(this.obj, Fa(t));
  }
  *keys() {
    for (const t of Object.keys(this.obj))
      yield um(t, this._field.mapKey);
  }
  *entries() {
    for (const t of Object.entries(this.obj))
      yield [
        um(t[0], this._field.mapKey),
        Ps(this._field, t[1], this.check)
      ];
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  get size() {
    return Object.keys(this.obj).length;
  }
  *values() {
    for (const t of Object.values(this.obj))
      yield Ps(this._field, t, this.check);
  }
  forEach(t, n) {
    for (const r of this.entries())
      t.call(n, r[1], r[0], this);
  }
}
function Hu(e, t) {
  return Cu(t) ? Bw(t.message) && !e.oneof && e.fieldKind == "message" ? t.message.value : t.desc.typeName == "google.protobuf.Struct" && e.parent.typeName != "google.protobuf.Value" ? Oh(t.message) : t.message : t;
}
function zu(e, t, n) {
  return t !== void 0 && (la(e.message) && !e.oneof && e.fieldKind == "message" ? t = {
    $typeName: e.message.typeName,
    value: qu(e.message.fields[0], t)
  } : e.message.typeName == "google.protobuf.Struct" && e.parent.typeName != "google.protobuf.Value" && Ct(t) && (t = _h(t))), new wh(e.message, t, n);
}
function im(e, t) {
  return e.listKind == "message" ? Hu(e, t) : Qu(e, t);
}
function $s(e, t, n) {
  return e.listKind == "message" ? zu(e, t, n) : qu(e, t);
}
function r_(e, t) {
  return e.mapKind == "message" ? Hu(e, t) : Qu(e, t);
}
function Ps(e, t, n) {
  return e.mapKind == "message" ? zu(e, t, n) : t;
}
function Fa(e) {
  return typeof e == "string" || typeof e == "number" ? e : String(e);
}
function um(e, t) {
  switch (t) {
    case g.STRING:
      return e;
    case g.INT32:
    case g.FIXED32:
    case g.UINT32:
    case g.SFIXED32:
    case g.SINT32: {
      const n = Number.parseInt(e);
      if (Number.isFinite(n))
        return n;
      break;
    }
    case g.BOOL:
      switch (e) {
        case "true":
          return !0;
        case "false":
          return !1;
      }
      break;
    case g.UINT64:
    case g.FIXED64:
      try {
        return D.uParse(e);
      } catch {
      }
      break;
    default:
      try {
        return D.parse(e);
      } catch {
      }
      break;
  }
  return e;
}
function qu(e, t) {
  switch (e.scalar) {
    case g.INT64:
    case g.SFIXED64:
    case g.SINT64:
      "longAsString" in e && e.longAsString && typeof t == "string" && (t = D.parse(t));
      break;
    case g.FIXED64:
    case g.UINT64:
      "longAsString" in e && e.longAsString && typeof t == "string" && (t = D.uParse(t));
      break;
  }
  return t;
}
function Qu(e, t) {
  switch (e.scalar) {
    case g.INT64:
    case g.SFIXED64:
    case g.SINT64:
      "longAsString" in e && e.longAsString ? t = String(t) : (typeof t == "string" || typeof t == "number") && (t = D.parse(t));
      break;
    case g.FIXED64:
    case g.UINT64:
      "longAsString" in e && e.longAsString ? t = String(t) : (typeof t == "string" || typeof t == "number") && (t = D.uParse(t));
      break;
  }
  return t;
}
function _h(e) {
  const t = {
    $typeName: "google.protobuf.Struct",
    fields: {}
  };
  if (Ct(e))
    for (const [n, r] of Object.entries(e))
      t.fields[n] = kh(r);
  return t;
}
function Oh(e) {
  const t = {};
  for (const [n, r] of Object.entries(e.fields))
    t[n] = Sh(r);
  return t;
}
function Sh(e) {
  switch (e.kind.case) {
    case "structValue":
      return Oh(e.kind.value);
    case "listValue":
      return e.kind.value.values.map(Sh);
    case "nullValue":
    case void 0:
      return null;
    default:
      return e.kind.value;
  }
}
function kh(e) {
  const t = {
    $typeName: "google.protobuf.Value",
    kind: { case: void 0 }
  };
  switch (typeof e) {
    case "number":
      t.kind = { case: "numberValue", value: e };
      break;
    case "string":
      t.kind = { case: "stringValue", value: e };
      break;
    case "boolean":
      t.kind = { case: "boolValue", value: e };
      break;
    case "object":
      if (e === null)
        t.kind = { case: "nullValue", value: 0 };
      else if (Array.isArray(e)) {
        const n = {
          $typeName: "google.protobuf.ListValue",
          values: []
        };
        if (Array.isArray(e))
          for (const r of e)
            n.values.push(kh(r));
        t.kind = {
          case: "listValue",
          value: n
        };
      } else
        t.kind = {
          case: "structValue",
          value: _h(e)
        };
      break;
  }
  return t;
}
function el(e) {
  const t = a_();
  let n = e.length * 3 / 4;
  e[e.length - 2] == "=" ? n -= 2 : e[e.length - 1] == "=" && (n -= 1);
  let r = new Uint8Array(n), a = 0, o = 0, s, i = 0;
  for (let u = 0; u < e.length; u++) {
    if (s = t[e.charCodeAt(u)], s === void 0)
      switch (e[u]) {
        // @ts-ignore TS7029: Fallthrough case in switch -- ignore instead of expect-error for compiler settings without noFallthroughCasesInSwitch: true
        case "=":
          o = 0;
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
    switch (o) {
      case 0:
        i = s, o = 1;
        break;
      case 1:
        r[a++] = i << 2 | (s & 48) >> 4, i = s, o = 2;
        break;
      case 2:
        r[a++] = (i & 15) << 4 | (s & 60) >> 2, i = s, o = 3;
        break;
      case 3:
        r[a++] = (i & 3) << 6 | s, o = 0;
        break;
    }
  }
  if (o == 1)
    throw Error("invalid base64 string");
  return r.subarray(0, a);
}
function Dh(e, t = "std") {
  const n = Ah(t), r = t == "std";
  let a = "", o = 0, s, i = 0;
  for (let u = 0; u < e.length; u++)
    switch (s = e[u], o) {
      case 0:
        a += n[s >> 2], i = (s & 3) << 4, o = 1;
        break;
      case 1:
        a += n[i | s >> 4], i = (s & 15) << 2, o = 2;
        break;
      case 2:
        a += n[i | s >> 6], a += n[s & 63], o = 0;
        break;
    }
  return o && (a += n[i], r && (a += "=", o == 1 && (a += "="))), a;
}
let Ra, lm, Sn;
function Ah(e) {
  return Ra || (Ra = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""), lm = Ra.slice(0, -2).concat("-", "_")), e == "url" ? (
    // biome-ignore lint/style/noNonNullAssertion: TS fails to narrow down
    lm
  ) : Ra;
}
function a_() {
  if (!Sn) {
    Sn = [];
    const e = Ah("std");
    for (let t = 0; t < e.length; t++)
      Sn[e[t].charCodeAt(0)] = t;
    Sn[45] = e.indexOf("+"), Sn[95] = e.indexOf("/");
  }
  return Sn;
}
function Ur(e) {
  let t = !1;
  const n = [];
  for (let r = 0; r < e.length; r++) {
    let a = e.charAt(r);
    switch (a) {
      case "_":
        t = !0;
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
        n.push(a), t = !1;
        break;
      default:
        t && (t = !1, a = a.toUpperCase()), n.push(a);
        break;
    }
  }
  return n.join("");
}
const o_ = /* @__PURE__ */ new Set([
  // names reserved by JavaScript
  "constructor",
  "toString",
  "toJSON",
  "valueOf"
]);
function Fr(e) {
  return o_.has(e) ? e + "$" : e;
}
function tl(e) {
  for (const t of e.field)
    Lr(t, "jsonName") || (t.jsonName = Ur(t.name));
  e.nestedType.forEach(tl);
}
function s_(e, t) {
  const n = e.values.find((r) => r.name === t);
  if (!n)
    throw new Error(`cannot parse ${e} default value: ${t}`);
  return n.number;
}
function i_(e, t) {
  switch (e) {
    case g.STRING:
      return t;
    case g.BYTES: {
      const n = u_(t);
      if (n === !1)
        throw new Error(`cannot parse ${g[e]} default value: ${t}`);
      return n;
    }
    case g.INT64:
    case g.SFIXED64:
    case g.SINT64:
      return D.parse(t);
    case g.UINT64:
    case g.FIXED64:
      return D.uParse(t);
    case g.DOUBLE:
    case g.FLOAT:
      switch (t) {
        case "inf":
          return Number.POSITIVE_INFINITY;
        case "-inf":
          return Number.NEGATIVE_INFINITY;
        case "nan":
          return Number.NaN;
        default:
          return parseFloat(t);
      }
    case g.BOOL:
      return t === "true";
    case g.INT32:
    case g.UINT32:
    case g.SINT32:
    case g.FIXED32:
    case g.SFIXED32:
      return parseInt(t, 10);
  }
}
function u_(e) {
  const t = [], n = {
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
  for (; n.next(); )
    switch (n.c) {
      case "\\":
        if (n.next())
          switch (n.c) {
            case "\\":
              t.push(n.c.charCodeAt(0));
              break;
            case "b":
              t.push(8);
              break;
            case "f":
              t.push(12);
              break;
            case "n":
              t.push(10);
              break;
            case "r":
              t.push(13);
              break;
            case "t":
              t.push(9);
              break;
            case "v":
              t.push(11);
              break;
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7": {
              const r = n.c, a = n.take(2);
              if (a === !1)
                return !1;
              const o = parseInt(r + a, 8);
              if (Number.isNaN(o))
                return !1;
              t.push(o);
              break;
            }
            case "x": {
              const r = n.c, a = n.take(2);
              if (a === !1)
                return !1;
              const o = parseInt(r + a, 16);
              if (Number.isNaN(o))
                return !1;
              t.push(o);
              break;
            }
            case "u": {
              const r = n.c, a = n.take(4);
              if (a === !1)
                return !1;
              const o = parseInt(r + a, 16);
              if (Number.isNaN(o))
                return !1;
              const s = new Uint8Array(4);
              new DataView(s.buffer).setInt32(0, o, !0), t.push(s[0], s[1], s[2], s[3]);
              break;
            }
            case "U": {
              const r = n.c, a = n.take(8);
              if (a === !1)
                return !1;
              const o = D.uEnc(r + a), s = new Uint8Array(8), i = new DataView(s.buffer);
              i.setInt32(0, o.lo, !0), i.setInt32(4, o.hi, !0), t.push(s[0], s[1], s[2], s[3], s[4], s[5], s[6], s[7]);
              break;
            }
          }
        break;
      default:
        t.push(n.c.charCodeAt(0));
    }
  return new Uint8Array(t);
}
function* Ei(e) {
  switch (e.kind) {
    case "file":
      for (const t of e.messages)
        yield t, yield* Ei(t);
      yield* e.enums, yield* e.services, yield* e.extensions;
      break;
    case "message":
      for (const t of e.nestedMessages)
        yield t, yield* Ei(t);
      yield* e.nestedEnums, yield* e.nestedExtensions;
      break;
  }
}
function Lh(...e) {
  const t = l_();
  if (!e.length)
    return t;
  if ("$typeName" in e[0] && e[0].$typeName == "google.protobuf.FileDescriptorSet") {
    for (const n of e[0].file)
      pm(n, t);
    return t;
  }
  if ("$typeName" in e[0]) {
    let n = function(s) {
      const i = [];
      for (const u of s.dependency) {
        if (t.getFile(u) != null || o.has(u))
          continue;
        const l = a(u);
        if (!l)
          throw new Error(`Unable to resolve ${u}, imported by ${s.name}`);
        "kind" in l ? t.addFile(l, !1, !0) : (o.add(l.name), i.push(l));
      }
      return i.concat(...i.map(n));
    };
    const r = e[0], a = e[1], o = /* @__PURE__ */ new Set();
    for (const s of [r, ...n(r)].reverse())
      pm(s, t);
  } else
    for (const n of e)
      for (const r of n.files)
        t.addFile(r);
  return t;
}
function l_() {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
  return {
    kind: "registry",
    types: e,
    extendees: t,
    [Symbol.iterator]() {
      return e.values();
    },
    get files() {
      return n.values();
    },
    addFile(r, a, o) {
      if (n.set(r.proto.name, r), !a)
        for (const s of Ei(r))
          this.add(s);
      if (o)
        for (const s of r.dependencies)
          this.addFile(s, a, o);
    },
    add(r) {
      if (r.kind == "extension") {
        let a = t.get(r.extendee.typeName);
        a || t.set(
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
      return n.get(r);
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
      var o;
      return (o = t.get(r.typeName)) === null || o === void 0 ? void 0 : o.get(a);
    },
    getService(r) {
      const a = e.get(r);
      return a?.kind == "service" ? a : void 0;
    }
  };
}
const c_ = 998, f_ = 999, m_ = 9, Rr = 10, cr = 11, d_ = 12, cm = 14, nl = 3, p_ = 2, fm = 1, b_ = 0, mm = 1, dm = 2, g_ = 3, h_ = 1, y_ = 2, E_ = 1, Uh = {
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
function pm(e, t) {
  var n, r;
  const a = {
    kind: "file",
    proto: e,
    deprecated: (r = (n = e.options) === null || n === void 0 ? void 0 : n.deprecated) !== null && r !== void 0 ? r : !1,
    edition: T_(e),
    name: e.name.replace(/\.proto$/, ""),
    dependencies: w_(e, t),
    enums: [],
    messages: [],
    extensions: [],
    services: [],
    toString() {
      return `file ${e.name}`;
    }
  }, o = /* @__PURE__ */ new Map(), s = {
    get(i) {
      return o.get(i);
    },
    add(i) {
      var u;
      Ze(((u = i.proto.options) === null || u === void 0 ? void 0 : u.mapEntry) === !0), o.set(i.typeName, i);
    }
  };
  for (const i of e.enumType)
    Fh(i, a, void 0, t);
  for (const i of e.messageType)
    Rh(i, a, void 0, t, s);
  for (const i of e.service)
    N_(i, a, t);
  Ni(a, t);
  for (const i of o.values())
    vi(i, t, s);
  for (const i of a.messages)
    vi(i, t, s), Ni(i, t);
  t.addFile(a, !0);
}
function Ni(e, t) {
  switch (e.kind) {
    case "file":
      for (const n of e.proto.extension) {
        const r = Ii(n, e, t);
        e.extensions.push(r), t.add(r);
      }
      break;
    case "message":
      for (const n of e.proto.extension) {
        const r = Ii(n, e, t);
        e.nestedExtensions.push(r), t.add(r);
      }
      for (const n of e.nestedMessages)
        Ni(n, t);
      break;
  }
}
function vi(e, t, n) {
  const r = e.proto.oneofDecl.map((o) => I_(o, e)), a = /* @__PURE__ */ new Set();
  for (const o of e.proto.field) {
    const s = S_(o, r), i = Ii(o, e, t, s, n);
    e.fields.push(i), e.field[i.localName] = i, s === void 0 ? e.members.push(i) : (s.fields.push(i), a.has(s) || (a.add(s), e.members.push(s)));
  }
  for (const o of r.filter((s) => a.has(s)))
    e.oneofs.push(o);
  for (const o of e.nestedMessages)
    vi(o, t, n);
}
function Fh(e, t, n, r) {
  var a, o, s, i, u;
  const l = __(e.name, e.value), c = {
    kind: "enum",
    proto: e,
    deprecated: (o = (a = e.options) === null || a === void 0 ? void 0 : a.deprecated) !== null && o !== void 0 ? o : !1,
    file: t,
    parent: n,
    open: !0,
    name: e.name,
    typeName: qo(e, n, t),
    value: {},
    values: [],
    sharedPrefix: l,
    toString() {
      return `enum ${this.typeName}`;
    }
  };
  c.open = L_(c), r.add(c);
  for (const m of e.value) {
    const d = m.name;
    c.values.push(
      // biome-ignore lint/suspicious/noAssignInExpressions: no
      c.value[m.number] = {
        kind: "enum_value",
        proto: m,
        deprecated: (i = (s = m.options) === null || s === void 0 ? void 0 : s.deprecated) !== null && i !== void 0 ? i : !1,
        parent: c,
        name: d,
        localName: Fr(l == null ? d : d.substring(l.length)),
        number: m.number,
        toString() {
          return `enum value ${c.typeName}.${d}`;
        }
      }
    );
  }
  ((u = n?.nestedEnums) !== null && u !== void 0 ? u : t.enums).push(c);
}
function Rh(e, t, n, r, a) {
  var o, s, i, u;
  const l = {
    kind: "message",
    proto: e,
    deprecated: (s = (o = e.options) === null || o === void 0 ? void 0 : o.deprecated) !== null && s !== void 0 ? s : !1,
    file: t,
    parent: n,
    name: e.name,
    typeName: qo(e, n, t),
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
  ((i = e.options) === null || i === void 0 ? void 0 : i.mapEntry) === !0 ? a.add(l) : (((u = n?.nestedMessages) !== null && u !== void 0 ? u : t.messages).push(l), r.add(l));
  for (const c of e.enumType)
    Fh(c, t, l, r);
  for (const c of e.nestedType)
    Rh(c, t, l, r, a);
}
function N_(e, t, n) {
  var r, a;
  const o = {
    kind: "service",
    proto: e,
    deprecated: (a = (r = e.options) === null || r === void 0 ? void 0 : r.deprecated) !== null && a !== void 0 ? a : !1,
    file: t,
    name: e.name,
    typeName: qo(e, void 0, t),
    methods: [],
    method: {},
    toString() {
      return `service ${this.typeName}`;
    }
  };
  t.services.push(o), n.add(o);
  for (const s of e.method) {
    const i = v_(s, o, n);
    o.methods.push(i), o.method[i.localName] = i;
  }
}
function v_(e, t, n) {
  var r, a, o, s;
  let i;
  e.clientStreaming && e.serverStreaming ? i = "bidi_streaming" : e.clientStreaming ? i = "client_streaming" : e.serverStreaming ? i = "server_streaming" : i = "unary";
  const u = n.getMessage(It(e.inputType)), l = n.getMessage(It(e.outputType));
  Ze(u, `invalid MethodDescriptorProto: input_type ${e.inputType} not found`), Ze(l, `invalid MethodDescriptorProto: output_type ${e.inputType} not found`);
  const c = e.name;
  return {
    kind: "rpc",
    proto: e,
    deprecated: (a = (r = e.options) === null || r === void 0 ? void 0 : r.deprecated) !== null && a !== void 0 ? a : !1,
    parent: t,
    name: c,
    localName: Fr(c.length ? Fr(c[0].toLowerCase() + c.substring(1)) : c),
    methodKind: i,
    input: u,
    output: l,
    idempotency: (s = (o = e.options) === null || o === void 0 ? void 0 : o.idempotencyLevel) !== null && s !== void 0 ? s : b_,
    toString() {
      return `rpc ${t.typeName}.${c}`;
    }
  };
}
function I_(e, t) {
  return {
    kind: "oneof",
    proto: e,
    deprecated: !1,
    parent: t,
    fields: [],
    name: e.name,
    localName: Fr(Ur(e.name)),
    toString() {
      return `oneof ${t.typeName}.${this.name}`;
    }
  };
}
function Ii(e, t, n, r, a) {
  var o, s, i;
  const u = a === void 0, l = {
    kind: "field",
    proto: e,
    deprecated: (s = (o = e.options) === null || o === void 0 ? void 0 : o.deprecated) !== null && s !== void 0 ? s : !1,
    name: e.name,
    number: e.number,
    scalar: void 0,
    message: void 0,
    enum: void 0,
    presence: k_(e, r, u, t),
    listKind: void 0,
    mapKind: void 0,
    mapKey: void 0,
    delimitedEncoding: void 0,
    packed: void 0,
    longAsString: !1,
    getDefaultValue: void 0
  };
  if (u) {
    const f = t.kind == "file" ? t : t.file, y = t.kind == "file" ? void 0 : t, E = qo(e, y, f);
    l.kind = "extension", l.file = f, l.parent = y, l.oneof = void 0, l.typeName = E, l.jsonName = `[${E}]`, l.toString = () => `extension ${E}`;
    const N = n.getMessage(It(e.extendee));
    Ze(N, `invalid FieldDescriptorProto: extendee ${e.extendee} not found`), l.extendee = N;
  } else {
    const f = t;
    Ze(f.kind == "message"), l.parent = f, l.oneof = r, l.localName = r ? Ur(e.name) : Fr(Ur(e.name)), l.jsonName = e.jsonName, l.toString = () => `field ${f.typeName}.${e.name}`;
  }
  const c = e.label, m = e.type, d = (i = e.options) === null || i === void 0 ? void 0 : i.jstype;
  if (c === nl) {
    const f = m == cr ? a?.get(It(e.typeName)) : void 0;
    if (f) {
      l.fieldKind = "map";
      const { key: y, value: E } = A_(f);
      return l.mapKey = y.scalar, l.mapKind = E.fieldKind, l.message = E.message, l.delimitedEncoding = !1, l.enum = E.enum, l.scalar = E.scalar, l;
    }
    switch (l.fieldKind = "list", m) {
      case cr:
      case Rr:
        l.listKind = "message", l.message = n.getMessage(It(e.typeName)), Ze(l.message), l.delimitedEncoding = bm(e, t);
        break;
      case cm:
        l.listKind = "enum", l.enum = n.getEnum(It(e.typeName)), Ze(l.enum);
        break;
      default:
        l.listKind = "scalar", l.scalar = m, l.longAsString = d == fm;
        break;
    }
    return l.packed = D_(e, t), l;
  }
  switch (m) {
    case cr:
    case Rr:
      l.fieldKind = "message", l.message = n.getMessage(It(e.typeName)), Ze(l.message, `invalid FieldDescriptorProto: type_name ${e.typeName} not found`), l.delimitedEncoding = bm(e, t), l.getDefaultValue = () => {
      };
      break;
    case cm: {
      const f = n.getEnum(It(e.typeName));
      Ze(f !== void 0, `invalid FieldDescriptorProto: type_name ${e.typeName} not found`), l.fieldKind = "enum", l.enum = n.getEnum(It(e.typeName)), l.getDefaultValue = () => Lr(e, "defaultValue") ? s_(f, e.defaultValue) : void 0;
      break;
    }
    default: {
      l.fieldKind = "scalar", l.scalar = m, l.longAsString = d == fm, l.getDefaultValue = () => Lr(e, "defaultValue") ? i_(m, e.defaultValue) : void 0;
      break;
    }
  }
  return l;
}
function T_(e) {
  switch (e.syntax) {
    case "":
    case "proto2":
      return c_;
    case "proto3":
      return f_;
    case "editions":
      if (e.edition in Uh)
        return e.edition;
      throw new Error(`${e.name}: unsupported edition`);
    default:
      throw new Error(`${e.name}: unsupported syntax "${e.syntax}"`);
  }
}
function w_(e, t) {
  return e.dependency.map((n) => {
    const r = t.getFile(n);
    if (!r)
      throw new Error(`Cannot find ${n}, imported by ${e.name}`);
    return r;
  });
}
function __(e, t) {
  const n = O_(e) + "_";
  for (const r of t) {
    if (!r.name.toLowerCase().startsWith(n))
      return;
    const a = r.name.substring(n.length);
    if (a.length == 0 || /^\d/.test(a))
      return;
  }
  return n;
}
function O_(e) {
  return (e.substring(0, 1) + e.substring(1).replace(/[A-Z]/g, (t) => "_" + t)).toLowerCase();
}
function qo(e, t, n) {
  let r;
  return t ? r = `${t.typeName}.${e.name}` : n.proto.package.length > 0 ? r = `${n.proto.package}.${e.name}` : r = `${e.name}`, r;
}
function It(e) {
  return e.startsWith(".") ? e.substring(1) : e;
}
function S_(e, t) {
  if (!Lr(e, "oneofIndex") || e.proto3Optional)
    return;
  const n = t[e.oneofIndex];
  return Ze(n, `invalid FieldDescriptorProto: oneof #${e.oneofIndex} for field #${e.number} not found`), n;
}
function k_(e, t, n, r) {
  if (e.label == p_)
    return g_;
  if (e.label == nl)
    return dm;
  if (t || e.proto3Optional || n)
    return mm;
  const a = Xn("fieldPresence", { proto: e, parent: r });
  return a == dm && (e.type == cr || e.type == Rr) ? mm : a;
}
function D_(e, t) {
  if (e.label != nl)
    return !1;
  switch (e.type) {
    case m_:
    case d_:
    case Rr:
    case cr:
      return !1;
  }
  const n = e.options;
  return n && Lr(n, "packed") ? n.packed : h_ == Xn("repeatedFieldEncoding", {
    proto: e,
    parent: t
  });
}
function A_(e) {
  const t = e.fields.find((r) => r.number === 1), n = e.fields.find((r) => r.number === 2);
  return Ze(t && t.fieldKind == "scalar" && t.scalar != g.BYTES && t.scalar != g.FLOAT && t.scalar != g.DOUBLE && n && n.fieldKind != "list" && n.fieldKind != "map"), { key: t, value: n };
}
function L_(e) {
  var t;
  return E_ == Xn("enumType", {
    proto: e.proto,
    parent: (t = e.parent) !== null && t !== void 0 ? t : e.file
  });
}
function bm(e, t) {
  return e.type == Rr ? !0 : y_ == Xn("messageEncoding", {
    proto: e,
    parent: t
  });
}
function Xn(e, t) {
  var n, r;
  const a = (n = t.proto.options) === null || n === void 0 ? void 0 : n.features;
  if (a) {
    const o = a[e];
    if (o != 0)
      return o;
  }
  if ("kind" in t) {
    if (t.kind == "message")
      return Xn(e, (r = t.parent) !== null && r !== void 0 ? r : t.file);
    const o = Uh[t.edition];
    if (!o)
      throw new Error(`feature default for edition ${t.edition} not found`);
    return o[e];
  }
  return Xn(e, t.parent);
}
function Ze(e, t) {
  if (!e)
    throw new Error(t);
}
function U_(e) {
  const t = F_(e);
  return t.messageType.forEach(tl), Lh(t, () => {
  }).getFile(t.name);
}
function F_(e) {
  return Object.assign(/* @__PURE__ */ Object.create({
    syntax: "",
    edition: 0
  }), Object.assign(Object.assign({ $typeName: "google.protobuf.FileDescriptorProto", dependency: [], publicDependency: [], weakDependency: [], optionDependency: [], service: [], extension: [] }, e), { messageType: e.messageType.map($h), enumType: e.enumType.map(Ph) }));
}
function $h(e) {
  var t, n, r, a, o, s, i, u;
  return Object.assign(/* @__PURE__ */ Object.create({
    visibility: 0
  }), {
    $typeName: "google.protobuf.DescriptorProto",
    name: e.name,
    field: (n = (t = e.field) === null || t === void 0 ? void 0 : t.map(R_)) !== null && n !== void 0 ? n : [],
    extension: [],
    nestedType: (a = (r = e.nestedType) === null || r === void 0 ? void 0 : r.map($h)) !== null && a !== void 0 ? a : [],
    enumType: (s = (o = e.enumType) === null || o === void 0 ? void 0 : o.map(Ph)) !== null && s !== void 0 ? s : [],
    extensionRange: (u = (i = e.extensionRange) === null || i === void 0 ? void 0 : i.map((l) => Object.assign({ $typeName: "google.protobuf.DescriptorProto.ExtensionRange" }, l))) !== null && u !== void 0 ? u : [],
    oneofDecl: [],
    reservedRange: [],
    reservedName: []
  });
}
function R_(e) {
  return Object.assign(/* @__PURE__ */ Object.create({
    label: 1,
    typeName: "",
    extendee: "",
    defaultValue: "",
    oneofIndex: 0,
    jsonName: "",
    proto3Optional: !1
  }), Object.assign(Object.assign({ $typeName: "google.protobuf.FieldDescriptorProto" }, e), { options: e.options ? $_(e.options) : void 0 }));
}
function $_(e) {
  var t, n, r;
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
  }), Object.assign(Object.assign({ $typeName: "google.protobuf.FieldOptions" }, e), { targets: (t = e.targets) !== null && t !== void 0 ? t : [], editionDefaults: (r = (n = e.editionDefaults) === null || n === void 0 ? void 0 : n.map((a) => Object.assign({ $typeName: "google.protobuf.FieldOptions.EditionDefault" }, a))) !== null && r !== void 0 ? r : [], uninterpretedOption: [] }));
}
function Ph(e) {
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
function ca(e, t, ...n) {
  return n.reduce((r, a) => r.nestedMessages[a], e.messages[t]);
}
const P_ = /* @__PURE__ */ U_({ name: "google/protobuf/descriptor.proto", package: "google.protobuf", messageType: [{ name: "FileDescriptorSet", field: [{ name: "file", number: 1, type: 11, label: 3, typeName: ".google.protobuf.FileDescriptorProto" }], extensionRange: [{ start: 536e6, end: 536000001 }] }, { name: "FileDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "package", number: 2, type: 9, label: 1 }, { name: "dependency", number: 3, type: 9, label: 3 }, { name: "public_dependency", number: 10, type: 5, label: 3 }, { name: "weak_dependency", number: 11, type: 5, label: 3 }, { name: "option_dependency", number: 15, type: 9, label: 3 }, { name: "message_type", number: 4, type: 11, label: 3, typeName: ".google.protobuf.DescriptorProto" }, { name: "enum_type", number: 5, type: 11, label: 3, typeName: ".google.protobuf.EnumDescriptorProto" }, { name: "service", number: 6, type: 11, label: 3, typeName: ".google.protobuf.ServiceDescriptorProto" }, { name: "extension", number: 7, type: 11, label: 3, typeName: ".google.protobuf.FieldDescriptorProto" }, { name: "options", number: 8, type: 11, label: 1, typeName: ".google.protobuf.FileOptions" }, { name: "source_code_info", number: 9, type: 11, label: 1, typeName: ".google.protobuf.SourceCodeInfo" }, { name: "syntax", number: 12, type: 9, label: 1 }, { name: "edition", number: 14, type: 14, label: 1, typeName: ".google.protobuf.Edition" }] }, { name: "DescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "field", number: 2, type: 11, label: 3, typeName: ".google.protobuf.FieldDescriptorProto" }, { name: "extension", number: 6, type: 11, label: 3, typeName: ".google.protobuf.FieldDescriptorProto" }, { name: "nested_type", number: 3, type: 11, label: 3, typeName: ".google.protobuf.DescriptorProto" }, { name: "enum_type", number: 4, type: 11, label: 3, typeName: ".google.protobuf.EnumDescriptorProto" }, { name: "extension_range", number: 5, type: 11, label: 3, typeName: ".google.protobuf.DescriptorProto.ExtensionRange" }, { name: "oneof_decl", number: 8, type: 11, label: 3, typeName: ".google.protobuf.OneofDescriptorProto" }, { name: "options", number: 7, type: 11, label: 1, typeName: ".google.protobuf.MessageOptions" }, { name: "reserved_range", number: 9, type: 11, label: 3, typeName: ".google.protobuf.DescriptorProto.ReservedRange" }, { name: "reserved_name", number: 10, type: 9, label: 3 }, { name: "visibility", number: 11, type: 14, label: 1, typeName: ".google.protobuf.SymbolVisibility" }], nestedType: [{ name: "ExtensionRange", field: [{ name: "start", number: 1, type: 5, label: 1 }, { name: "end", number: 2, type: 5, label: 1 }, { name: "options", number: 3, type: 11, label: 1, typeName: ".google.protobuf.ExtensionRangeOptions" }] }, { name: "ReservedRange", field: [{ name: "start", number: 1, type: 5, label: 1 }, { name: "end", number: 2, type: 5, label: 1 }] }] }, { name: "ExtensionRangeOptions", field: [{ name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }, { name: "declaration", number: 2, type: 11, label: 3, typeName: ".google.protobuf.ExtensionRangeOptions.Declaration", options: { retention: 2 } }, { name: "features", number: 50, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "verification", number: 3, type: 14, label: 1, typeName: ".google.protobuf.ExtensionRangeOptions.VerificationState", defaultValue: "UNVERIFIED", options: { retention: 2 } }], nestedType: [{ name: "Declaration", field: [{ name: "number", number: 1, type: 5, label: 1 }, { name: "full_name", number: 2, type: 9, label: 1 }, { name: "type", number: 3, type: 9, label: 1 }, { name: "reserved", number: 5, type: 8, label: 1 }, { name: "repeated", number: 6, type: 8, label: 1 }] }], enumType: [{ name: "VerificationState", value: [{ name: "DECLARATION", number: 0 }, { name: "UNVERIFIED", number: 1 }] }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "FieldDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "number", number: 3, type: 5, label: 1 }, { name: "label", number: 4, type: 14, label: 1, typeName: ".google.protobuf.FieldDescriptorProto.Label" }, { name: "type", number: 5, type: 14, label: 1, typeName: ".google.protobuf.FieldDescriptorProto.Type" }, { name: "type_name", number: 6, type: 9, label: 1 }, { name: "extendee", number: 2, type: 9, label: 1 }, { name: "default_value", number: 7, type: 9, label: 1 }, { name: "oneof_index", number: 9, type: 5, label: 1 }, { name: "json_name", number: 10, type: 9, label: 1 }, { name: "options", number: 8, type: 11, label: 1, typeName: ".google.protobuf.FieldOptions" }, { name: "proto3_optional", number: 17, type: 8, label: 1 }], enumType: [{ name: "Type", value: [{ name: "TYPE_DOUBLE", number: 1 }, { name: "TYPE_FLOAT", number: 2 }, { name: "TYPE_INT64", number: 3 }, { name: "TYPE_UINT64", number: 4 }, { name: "TYPE_INT32", number: 5 }, { name: "TYPE_FIXED64", number: 6 }, { name: "TYPE_FIXED32", number: 7 }, { name: "TYPE_BOOL", number: 8 }, { name: "TYPE_STRING", number: 9 }, { name: "TYPE_GROUP", number: 10 }, { name: "TYPE_MESSAGE", number: 11 }, { name: "TYPE_BYTES", number: 12 }, { name: "TYPE_UINT32", number: 13 }, { name: "TYPE_ENUM", number: 14 }, { name: "TYPE_SFIXED32", number: 15 }, { name: "TYPE_SFIXED64", number: 16 }, { name: "TYPE_SINT32", number: 17 }, { name: "TYPE_SINT64", number: 18 }] }, { name: "Label", value: [{ name: "LABEL_OPTIONAL", number: 1 }, { name: "LABEL_REPEATED", number: 3 }, { name: "LABEL_REQUIRED", number: 2 }] }] }, { name: "OneofDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "options", number: 2, type: 11, label: 1, typeName: ".google.protobuf.OneofOptions" }] }, { name: "EnumDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "value", number: 2, type: 11, label: 3, typeName: ".google.protobuf.EnumValueDescriptorProto" }, { name: "options", number: 3, type: 11, label: 1, typeName: ".google.protobuf.EnumOptions" }, { name: "reserved_range", number: 4, type: 11, label: 3, typeName: ".google.protobuf.EnumDescriptorProto.EnumReservedRange" }, { name: "reserved_name", number: 5, type: 9, label: 3 }, { name: "visibility", number: 6, type: 14, label: 1, typeName: ".google.protobuf.SymbolVisibility" }], nestedType: [{ name: "EnumReservedRange", field: [{ name: "start", number: 1, type: 5, label: 1 }, { name: "end", number: 2, type: 5, label: 1 }] }] }, { name: "EnumValueDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "number", number: 2, type: 5, label: 1 }, { name: "options", number: 3, type: 11, label: 1, typeName: ".google.protobuf.EnumValueOptions" }] }, { name: "ServiceDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "method", number: 2, type: 11, label: 3, typeName: ".google.protobuf.MethodDescriptorProto" }, { name: "options", number: 3, type: 11, label: 1, typeName: ".google.protobuf.ServiceOptions" }] }, { name: "MethodDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "input_type", number: 2, type: 9, label: 1 }, { name: "output_type", number: 3, type: 9, label: 1 }, { name: "options", number: 4, type: 11, label: 1, typeName: ".google.protobuf.MethodOptions" }, { name: "client_streaming", number: 5, type: 8, label: 1, defaultValue: "false" }, { name: "server_streaming", number: 6, type: 8, label: 1, defaultValue: "false" }] }, { name: "FileOptions", field: [{ name: "java_package", number: 1, type: 9, label: 1 }, { name: "java_outer_classname", number: 8, type: 9, label: 1 }, { name: "java_multiple_files", number: 10, type: 8, label: 1, defaultValue: "false" }, { name: "java_generate_equals_and_hash", number: 20, type: 8, label: 1, options: { deprecated: !0 } }, { name: "java_string_check_utf8", number: 27, type: 8, label: 1, defaultValue: "false" }, { name: "optimize_for", number: 9, type: 14, label: 1, typeName: ".google.protobuf.FileOptions.OptimizeMode", defaultValue: "SPEED" }, { name: "go_package", number: 11, type: 9, label: 1 }, { name: "cc_generic_services", number: 16, type: 8, label: 1, defaultValue: "false" }, { name: "java_generic_services", number: 17, type: 8, label: 1, defaultValue: "false" }, { name: "py_generic_services", number: 18, type: 8, label: 1, defaultValue: "false" }, { name: "deprecated", number: 23, type: 8, label: 1, defaultValue: "false" }, { name: "cc_enable_arenas", number: 31, type: 8, label: 1, defaultValue: "true" }, { name: "objc_class_prefix", number: 36, type: 9, label: 1 }, { name: "csharp_namespace", number: 37, type: 9, label: 1 }, { name: "swift_prefix", number: 39, type: 9, label: 1 }, { name: "php_class_prefix", number: 40, type: 9, label: 1 }, { name: "php_namespace", number: 41, type: 9, label: 1 }, { name: "php_metadata_namespace", number: 44, type: 9, label: 1 }, { name: "ruby_package", number: 45, type: 9, label: 1 }, { name: "features", number: 50, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], enumType: [{ name: "OptimizeMode", value: [{ name: "SPEED", number: 1 }, { name: "CODE_SIZE", number: 2 }, { name: "LITE_RUNTIME", number: 3 }] }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "MessageOptions", field: [{ name: "message_set_wire_format", number: 1, type: 8, label: 1, defaultValue: "false" }, { name: "no_standard_descriptor_accessor", number: 2, type: 8, label: 1, defaultValue: "false" }, { name: "deprecated", number: 3, type: 8, label: 1, defaultValue: "false" }, { name: "map_entry", number: 7, type: 8, label: 1 }, { name: "deprecated_legacy_json_field_conflicts", number: 11, type: 8, label: 1, options: { deprecated: !0 } }, { name: "features", number: 12, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "FieldOptions", field: [{ name: "ctype", number: 1, type: 14, label: 1, typeName: ".google.protobuf.FieldOptions.CType", defaultValue: "STRING" }, { name: "packed", number: 2, type: 8, label: 1 }, { name: "jstype", number: 6, type: 14, label: 1, typeName: ".google.protobuf.FieldOptions.JSType", defaultValue: "JS_NORMAL" }, { name: "lazy", number: 5, type: 8, label: 1, defaultValue: "false" }, { name: "unverified_lazy", number: 15, type: 8, label: 1, defaultValue: "false" }, { name: "deprecated", number: 3, type: 8, label: 1, defaultValue: "false" }, { name: "weak", number: 10, type: 8, label: 1, defaultValue: "false", options: { deprecated: !0 } }, { name: "debug_redact", number: 16, type: 8, label: 1, defaultValue: "false" }, { name: "retention", number: 17, type: 14, label: 1, typeName: ".google.protobuf.FieldOptions.OptionRetention" }, { name: "targets", number: 19, type: 14, label: 3, typeName: ".google.protobuf.FieldOptions.OptionTargetType" }, { name: "edition_defaults", number: 20, type: 11, label: 3, typeName: ".google.protobuf.FieldOptions.EditionDefault" }, { name: "features", number: 21, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "feature_support", number: 22, type: 11, label: 1, typeName: ".google.protobuf.FieldOptions.FeatureSupport" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], nestedType: [{ name: "EditionDefault", field: [{ name: "edition", number: 3, type: 14, label: 1, typeName: ".google.protobuf.Edition" }, { name: "value", number: 2, type: 9, label: 1 }] }, { name: "FeatureSupport", field: [{ name: "edition_introduced", number: 1, type: 14, label: 1, typeName: ".google.protobuf.Edition" }, { name: "edition_deprecated", number: 2, type: 14, label: 1, typeName: ".google.protobuf.Edition" }, { name: "deprecation_warning", number: 3, type: 9, label: 1 }, { name: "edition_removed", number: 4, type: 14, label: 1, typeName: ".google.protobuf.Edition" }] }], enumType: [{ name: "CType", value: [{ name: "STRING", number: 0 }, { name: "CORD", number: 1 }, { name: "STRING_PIECE", number: 2 }] }, { name: "JSType", value: [{ name: "JS_NORMAL", number: 0 }, { name: "JS_STRING", number: 1 }, { name: "JS_NUMBER", number: 2 }] }, { name: "OptionRetention", value: [{ name: "RETENTION_UNKNOWN", number: 0 }, { name: "RETENTION_RUNTIME", number: 1 }, { name: "RETENTION_SOURCE", number: 2 }] }, { name: "OptionTargetType", value: [{ name: "TARGET_TYPE_UNKNOWN", number: 0 }, { name: "TARGET_TYPE_FILE", number: 1 }, { name: "TARGET_TYPE_EXTENSION_RANGE", number: 2 }, { name: "TARGET_TYPE_MESSAGE", number: 3 }, { name: "TARGET_TYPE_FIELD", number: 4 }, { name: "TARGET_TYPE_ONEOF", number: 5 }, { name: "TARGET_TYPE_ENUM", number: 6 }, { name: "TARGET_TYPE_ENUM_ENTRY", number: 7 }, { name: "TARGET_TYPE_SERVICE", number: 8 }, { name: "TARGET_TYPE_METHOD", number: 9 }] }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "OneofOptions", field: [{ name: "features", number: 1, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "EnumOptions", field: [{ name: "allow_alias", number: 2, type: 8, label: 1 }, { name: "deprecated", number: 3, type: 8, label: 1, defaultValue: "false" }, { name: "deprecated_legacy_json_field_conflicts", number: 6, type: 8, label: 1, options: { deprecated: !0 } }, { name: "features", number: 7, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "EnumValueOptions", field: [{ name: "deprecated", number: 1, type: 8, label: 1, defaultValue: "false" }, { name: "features", number: 2, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "debug_redact", number: 3, type: 8, label: 1, defaultValue: "false" }, { name: "feature_support", number: 4, type: 11, label: 1, typeName: ".google.protobuf.FieldOptions.FeatureSupport" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "ServiceOptions", field: [{ name: "features", number: 34, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "deprecated", number: 33, type: 8, label: 1, defaultValue: "false" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "MethodOptions", field: [{ name: "deprecated", number: 33, type: 8, label: 1, defaultValue: "false" }, { name: "idempotency_level", number: 34, type: 14, label: 1, typeName: ".google.protobuf.MethodOptions.IdempotencyLevel", defaultValue: "IDEMPOTENCY_UNKNOWN" }, { name: "features", number: 35, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], enumType: [{ name: "IdempotencyLevel", value: [{ name: "IDEMPOTENCY_UNKNOWN", number: 0 }, { name: "NO_SIDE_EFFECTS", number: 1 }, { name: "IDEMPOTENT", number: 2 }] }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "UninterpretedOption", field: [{ name: "name", number: 2, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption.NamePart" }, { name: "identifier_value", number: 3, type: 9, label: 1 }, { name: "positive_int_value", number: 4, type: 4, label: 1 }, { name: "negative_int_value", number: 5, type: 3, label: 1 }, { name: "double_value", number: 6, type: 1, label: 1 }, { name: "string_value", number: 7, type: 12, label: 1 }, { name: "aggregate_value", number: 8, type: 9, label: 1 }], nestedType: [{ name: "NamePart", field: [{ name: "name_part", number: 1, type: 9, label: 2 }, { name: "is_extension", number: 2, type: 8, label: 2 }] }] }, { name: "FeatureSet", field: [{ name: "field_presence", number: 1, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.FieldPresence", options: { retention: 1, targets: [4, 1], editionDefaults: [{ value: "EXPLICIT", edition: 900 }, { value: "IMPLICIT", edition: 999 }, { value: "EXPLICIT", edition: 1e3 }] } }, { name: "enum_type", number: 2, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.EnumType", options: { retention: 1, targets: [6, 1], editionDefaults: [{ value: "CLOSED", edition: 900 }, { value: "OPEN", edition: 999 }] } }, { name: "repeated_field_encoding", number: 3, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.RepeatedFieldEncoding", options: { retention: 1, targets: [4, 1], editionDefaults: [{ value: "EXPANDED", edition: 900 }, { value: "PACKED", edition: 999 }] } }, { name: "utf8_validation", number: 4, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.Utf8Validation", options: { retention: 1, targets: [4, 1], editionDefaults: [{ value: "NONE", edition: 900 }, { value: "VERIFY", edition: 999 }] } }, { name: "message_encoding", number: 5, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.MessageEncoding", options: { retention: 1, targets: [4, 1], editionDefaults: [{ value: "LENGTH_PREFIXED", edition: 900 }] } }, { name: "json_format", number: 6, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.JsonFormat", options: { retention: 1, targets: [3, 6, 1], editionDefaults: [{ value: "LEGACY_BEST_EFFORT", edition: 900 }, { value: "ALLOW", edition: 999 }] } }, { name: "enforce_naming_style", number: 7, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.EnforceNamingStyle", options: { retention: 2, targets: [1, 2, 3, 4, 5, 6, 7, 8, 9], editionDefaults: [{ value: "STYLE_LEGACY", edition: 900 }, { value: "STYLE2024", edition: 1001 }] } }, { name: "default_symbol_visibility", number: 8, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.VisibilityFeature.DefaultSymbolVisibility", options: { retention: 2, targets: [1], editionDefaults: [{ value: "EXPORT_ALL", edition: 900 }, { value: "EXPORT_TOP_LEVEL", edition: 1001 }] } }], nestedType: [{ name: "VisibilityFeature", enumType: [{ name: "DefaultSymbolVisibility", value: [{ name: "DEFAULT_SYMBOL_VISIBILITY_UNKNOWN", number: 0 }, { name: "EXPORT_ALL", number: 1 }, { name: "EXPORT_TOP_LEVEL", number: 2 }, { name: "LOCAL_ALL", number: 3 }, { name: "STRICT", number: 4 }] }] }], enumType: [{ name: "FieldPresence", value: [{ name: "FIELD_PRESENCE_UNKNOWN", number: 0 }, { name: "EXPLICIT", number: 1 }, { name: "IMPLICIT", number: 2 }, { name: "LEGACY_REQUIRED", number: 3 }] }, { name: "EnumType", value: [{ name: "ENUM_TYPE_UNKNOWN", number: 0 }, { name: "OPEN", number: 1 }, { name: "CLOSED", number: 2 }] }, { name: "RepeatedFieldEncoding", value: [{ name: "REPEATED_FIELD_ENCODING_UNKNOWN", number: 0 }, { name: "PACKED", number: 1 }, { name: "EXPANDED", number: 2 }] }, { name: "Utf8Validation", value: [{ name: "UTF8_VALIDATION_UNKNOWN", number: 0 }, { name: "VERIFY", number: 2 }, { name: "NONE", number: 3 }] }, { name: "MessageEncoding", value: [{ name: "MESSAGE_ENCODING_UNKNOWN", number: 0 }, { name: "LENGTH_PREFIXED", number: 1 }, { name: "DELIMITED", number: 2 }] }, { name: "JsonFormat", value: [{ name: "JSON_FORMAT_UNKNOWN", number: 0 }, { name: "ALLOW", number: 1 }, { name: "LEGACY_BEST_EFFORT", number: 2 }] }, { name: "EnforceNamingStyle", value: [{ name: "ENFORCE_NAMING_STYLE_UNKNOWN", number: 0 }, { name: "STYLE2024", number: 1 }, { name: "STYLE_LEGACY", number: 2 }] }], extensionRange: [{ start: 1e3, end: 9995 }, { start: 9995, end: 1e4 }, { start: 1e4, end: 10001 }] }, { name: "FeatureSetDefaults", field: [{ name: "defaults", number: 1, type: 11, label: 3, typeName: ".google.protobuf.FeatureSetDefaults.FeatureSetEditionDefault" }, { name: "minimum_edition", number: 4, type: 14, label: 1, typeName: ".google.protobuf.Edition" }, { name: "maximum_edition", number: 5, type: 14, label: 1, typeName: ".google.protobuf.Edition" }], nestedType: [{ name: "FeatureSetEditionDefault", field: [{ name: "edition", number: 3, type: 14, label: 1, typeName: ".google.protobuf.Edition" }, { name: "overridable_features", number: 4, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "fixed_features", number: 5, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }] }] }, { name: "SourceCodeInfo", field: [{ name: "location", number: 1, type: 11, label: 3, typeName: ".google.protobuf.SourceCodeInfo.Location" }], nestedType: [{ name: "Location", field: [{ name: "path", number: 1, type: 5, label: 3, options: { packed: !0 } }, { name: "span", number: 2, type: 5, label: 3, options: { packed: !0 } }, { name: "leading_comments", number: 3, type: 9, label: 1 }, { name: "trailing_comments", number: 4, type: 9, label: 1 }, { name: "leading_detached_comments", number: 6, type: 9, label: 3 }] }], extensionRange: [{ start: 536e6, end: 536000001 }] }, { name: "GeneratedCodeInfo", field: [{ name: "annotation", number: 1, type: 11, label: 3, typeName: ".google.protobuf.GeneratedCodeInfo.Annotation" }], nestedType: [{ name: "Annotation", field: [{ name: "path", number: 1, type: 5, label: 3, options: { packed: !0 } }, { name: "source_file", number: 2, type: 9, label: 1 }, { name: "begin", number: 3, type: 5, label: 1 }, { name: "end", number: 4, type: 5, label: 1 }, { name: "semantic", number: 5, type: 14, label: 1, typeName: ".google.protobuf.GeneratedCodeInfo.Annotation.Semantic" }], enumType: [{ name: "Semantic", value: [{ name: "NONE", number: 0 }, { name: "SET", number: 1 }, { name: "ALIAS", number: 2 }] }] }] }], enumType: [{ name: "Edition", value: [{ name: "EDITION_UNKNOWN", number: 0 }, { name: "EDITION_LEGACY", number: 900 }, { name: "EDITION_PROTO2", number: 998 }, { name: "EDITION_PROTO3", number: 999 }, { name: "EDITION_2023", number: 1e3 }, { name: "EDITION_2024", number: 1001 }, { name: "EDITION_UNSTABLE", number: 9999 }, { name: "EDITION_1_TEST_ONLY", number: 1 }, { name: "EDITION_2_TEST_ONLY", number: 2 }, { name: "EDITION_99997_TEST_ONLY", number: 99997 }, { name: "EDITION_99998_TEST_ONLY", number: 99998 }, { name: "EDITION_99999_TEST_ONLY", number: 99999 }, { name: "EDITION_MAX", number: 2147483647 }] }, { name: "SymbolVisibility", value: [{ name: "VISIBILITY_UNSET", number: 0 }, { name: "VISIBILITY_LOCAL", number: 1 }, { name: "VISIBILITY_EXPORT", number: 2 }] }] }), x_ = /* @__PURE__ */ ca(P_, 1);
var gm;
(function(e) {
  e[e.DECLARATION = 0] = "DECLARATION", e[e.UNVERIFIED = 1] = "UNVERIFIED";
})(gm || (gm = {}));
var hm;
(function(e) {
  e[e.DOUBLE = 1] = "DOUBLE", e[e.FLOAT = 2] = "FLOAT", e[e.INT64 = 3] = "INT64", e[e.UINT64 = 4] = "UINT64", e[e.INT32 = 5] = "INT32", e[e.FIXED64 = 6] = "FIXED64", e[e.FIXED32 = 7] = "FIXED32", e[e.BOOL = 8] = "BOOL", e[e.STRING = 9] = "STRING", e[e.GROUP = 10] = "GROUP", e[e.MESSAGE = 11] = "MESSAGE", e[e.BYTES = 12] = "BYTES", e[e.UINT32 = 13] = "UINT32", e[e.ENUM = 14] = "ENUM", e[e.SFIXED32 = 15] = "SFIXED32", e[e.SFIXED64 = 16] = "SFIXED64", e[e.SINT32 = 17] = "SINT32", e[e.SINT64 = 18] = "SINT64";
})(hm || (hm = {}));
var ym;
(function(e) {
  e[e.OPTIONAL = 1] = "OPTIONAL", e[e.REPEATED = 3] = "REPEATED", e[e.REQUIRED = 2] = "REQUIRED";
})(ym || (ym = {}));
var Em;
(function(e) {
  e[e.SPEED = 1] = "SPEED", e[e.CODE_SIZE = 2] = "CODE_SIZE", e[e.LITE_RUNTIME = 3] = "LITE_RUNTIME";
})(Em || (Em = {}));
var Nm;
(function(e) {
  e[e.STRING = 0] = "STRING", e[e.CORD = 1] = "CORD", e[e.STRING_PIECE = 2] = "STRING_PIECE";
})(Nm || (Nm = {}));
var vm;
(function(e) {
  e[e.JS_NORMAL = 0] = "JS_NORMAL", e[e.JS_STRING = 1] = "JS_STRING", e[e.JS_NUMBER = 2] = "JS_NUMBER";
})(vm || (vm = {}));
var Im;
(function(e) {
  e[e.RETENTION_UNKNOWN = 0] = "RETENTION_UNKNOWN", e[e.RETENTION_RUNTIME = 1] = "RETENTION_RUNTIME", e[e.RETENTION_SOURCE = 2] = "RETENTION_SOURCE";
})(Im || (Im = {}));
var Tm;
(function(e) {
  e[e.TARGET_TYPE_UNKNOWN = 0] = "TARGET_TYPE_UNKNOWN", e[e.TARGET_TYPE_FILE = 1] = "TARGET_TYPE_FILE", e[e.TARGET_TYPE_EXTENSION_RANGE = 2] = "TARGET_TYPE_EXTENSION_RANGE", e[e.TARGET_TYPE_MESSAGE = 3] = "TARGET_TYPE_MESSAGE", e[e.TARGET_TYPE_FIELD = 4] = "TARGET_TYPE_FIELD", e[e.TARGET_TYPE_ONEOF = 5] = "TARGET_TYPE_ONEOF", e[e.TARGET_TYPE_ENUM = 6] = "TARGET_TYPE_ENUM", e[e.TARGET_TYPE_ENUM_ENTRY = 7] = "TARGET_TYPE_ENUM_ENTRY", e[e.TARGET_TYPE_SERVICE = 8] = "TARGET_TYPE_SERVICE", e[e.TARGET_TYPE_METHOD = 9] = "TARGET_TYPE_METHOD";
})(Tm || (Tm = {}));
var Ti;
(function(e) {
  e[e.IDEMPOTENCY_UNKNOWN = 0] = "IDEMPOTENCY_UNKNOWN", e[e.NO_SIDE_EFFECTS = 1] = "NO_SIDE_EFFECTS", e[e.IDEMPOTENT = 2] = "IDEMPOTENT";
})(Ti || (Ti = {}));
var wm;
(function(e) {
  e[e.DEFAULT_SYMBOL_VISIBILITY_UNKNOWN = 0] = "DEFAULT_SYMBOL_VISIBILITY_UNKNOWN", e[e.EXPORT_ALL = 1] = "EXPORT_ALL", e[e.EXPORT_TOP_LEVEL = 2] = "EXPORT_TOP_LEVEL", e[e.LOCAL_ALL = 3] = "LOCAL_ALL", e[e.STRICT = 4] = "STRICT";
})(wm || (wm = {}));
var _m;
(function(e) {
  e[e.FIELD_PRESENCE_UNKNOWN = 0] = "FIELD_PRESENCE_UNKNOWN", e[e.EXPLICIT = 1] = "EXPLICIT", e[e.IMPLICIT = 2] = "IMPLICIT", e[e.LEGACY_REQUIRED = 3] = "LEGACY_REQUIRED";
})(_m || (_m = {}));
var Om;
(function(e) {
  e[e.ENUM_TYPE_UNKNOWN = 0] = "ENUM_TYPE_UNKNOWN", e[e.OPEN = 1] = "OPEN", e[e.CLOSED = 2] = "CLOSED";
})(Om || (Om = {}));
var Sm;
(function(e) {
  e[e.REPEATED_FIELD_ENCODING_UNKNOWN = 0] = "REPEATED_FIELD_ENCODING_UNKNOWN", e[e.PACKED = 1] = "PACKED", e[e.EXPANDED = 2] = "EXPANDED";
})(Sm || (Sm = {}));
var km;
(function(e) {
  e[e.UTF8_VALIDATION_UNKNOWN = 0] = "UTF8_VALIDATION_UNKNOWN", e[e.VERIFY = 2] = "VERIFY", e[e.NONE = 3] = "NONE";
})(km || (km = {}));
var Dm;
(function(e) {
  e[e.MESSAGE_ENCODING_UNKNOWN = 0] = "MESSAGE_ENCODING_UNKNOWN", e[e.LENGTH_PREFIXED = 1] = "LENGTH_PREFIXED", e[e.DELIMITED = 2] = "DELIMITED";
})(Dm || (Dm = {}));
var Am;
(function(e) {
  e[e.JSON_FORMAT_UNKNOWN = 0] = "JSON_FORMAT_UNKNOWN", e[e.ALLOW = 1] = "ALLOW", e[e.LEGACY_BEST_EFFORT = 2] = "LEGACY_BEST_EFFORT";
})(Am || (Am = {}));
var Lm;
(function(e) {
  e[e.ENFORCE_NAMING_STYLE_UNKNOWN = 0] = "ENFORCE_NAMING_STYLE_UNKNOWN", e[e.STYLE2024 = 1] = "STYLE2024", e[e.STYLE_LEGACY = 2] = "STYLE_LEGACY";
})(Lm || (Lm = {}));
var Um;
(function(e) {
  e[e.NONE = 0] = "NONE", e[e.SET = 1] = "SET", e[e.ALIAS = 2] = "ALIAS";
})(Um || (Um = {}));
var Fm;
(function(e) {
  e[e.EDITION_UNKNOWN = 0] = "EDITION_UNKNOWN", e[e.EDITION_LEGACY = 900] = "EDITION_LEGACY", e[e.EDITION_PROTO2 = 998] = "EDITION_PROTO2", e[e.EDITION_PROTO3 = 999] = "EDITION_PROTO3", e[e.EDITION_2023 = 1e3] = "EDITION_2023", e[e.EDITION_2024 = 1001] = "EDITION_2024", e[e.EDITION_UNSTABLE = 9999] = "EDITION_UNSTABLE", e[e.EDITION_1_TEST_ONLY = 1] = "EDITION_1_TEST_ONLY", e[e.EDITION_2_TEST_ONLY = 2] = "EDITION_2_TEST_ONLY", e[e.EDITION_99997_TEST_ONLY = 99997] = "EDITION_99997_TEST_ONLY", e[e.EDITION_99998_TEST_ONLY = 99998] = "EDITION_99998_TEST_ONLY", e[e.EDITION_99999_TEST_ONLY = 99999] = "EDITION_99999_TEST_ONLY", e[e.EDITION_MAX = 2147483647] = "EDITION_MAX";
})(Fm || (Fm = {}));
var Rm;
(function(e) {
  e[e.VISIBILITY_UNSET = 0] = "VISIBILITY_UNSET", e[e.VISIBILITY_LOCAL = 1] = "VISIBILITY_LOCAL", e[e.VISIBILITY_EXPORT = 2] = "VISIBILITY_EXPORT";
})(Rm || (Rm = {}));
const $m = {
  readUnknownFields: !0
};
function V_(e) {
  return e ? Object.assign(Object.assign({}, $m), e) : $m;
}
function Qo(e, t, n) {
  const r = Ce(e, void 0, !1);
  return xh(r, new Ju(t), V_(n), !1, t.byteLength), r.message;
}
function xh(e, t, n, r, a) {
  var o;
  const s = r ? t.len : t.pos + a;
  let i, u;
  const l = (o = e.getUnknown()) !== null && o !== void 0 ? o : [];
  for (; t.pos < s && ([i, u] = t.tag(), !(r && u == F.EndGroup)); ) {
    const c = e.findNumber(i);
    if (!c) {
      const m = t.skip(u, i);
      n.readUnknownFields && l.push({ no: i, wireType: u, data: m });
      continue;
    }
    Vh(e, t, c, u, n);
  }
  if (r && (u != F.EndGroup || i !== a))
    throw new Error("invalid end group tag");
  l.length > 0 && e.setUnknown(l);
}
function Vh(e, t, n, r, a) {
  var o;
  switch (n.fieldKind) {
    case "scalar":
      e.set(n, Wn(t, n.scalar));
      break;
    case "enum":
      const s = Wn(t, g.INT32);
      if (n.enum.open)
        e.set(n, s);
      else if (n.enum.values.some((i) => i.number === s))
        e.set(n, s);
      else if (a.readUnknownFields) {
        const i = [];
        yi(s, i);
        const u = (o = e.getUnknown()) !== null && o !== void 0 ? o : [];
        u.push({
          no: n.number,
          wireType: r,
          data: new Uint8Array(i)
        }), e.setUnknown(u);
      }
      break;
    case "message":
      e.set(n, rl(t, a, n, e.get(n)));
      break;
    case "list":
      M_(t, r, e.get(n), a);
      break;
    case "map":
      Y_(t, e.get(n), a);
      break;
  }
}
function Y_(e, t, n) {
  const r = t.field();
  let a, o;
  const s = e.uint32(), i = e.pos + s;
  for (; e.pos < i; ) {
    const [u] = e.tag();
    switch (u) {
      case 1:
        a = Wn(e, r.mapKey);
        break;
      case 2:
        switch (r.mapKind) {
          case "scalar":
            o = Wn(e, r.scalar);
            break;
          case "enum":
            o = e.int32();
            break;
          case "message":
            o = rl(e, n, r);
            break;
        }
        break;
    }
  }
  if (a === void 0 && (a = vn(r.mapKey, !1)), o === void 0)
    switch (r.mapKind) {
      case "scalar":
        o = vn(r.scalar, !1);
        break;
      case "enum":
        o = r.enum.values[0].number;
        break;
      case "message":
        o = Ce(r.message, void 0, !1);
        break;
    }
  t.set(a, o);
}
function M_(e, t, n, r) {
  var a;
  const o = n.field();
  if (o.listKind === "message") {
    n.add(rl(e, r, o));
    return;
  }
  const s = (a = o.scalar) !== null && a !== void 0 ? a : g.INT32;
  if (!(t == F.LengthDelimited && s != g.STRING && s != g.BYTES)) {
    n.add(Wn(e, s));
    return;
  }
  const i = e.uint32() + e.pos;
  for (; e.pos < i; )
    n.add(Wn(e, s));
}
function rl(e, t, n, r) {
  const a = n.delimitedEncoding, o = r ?? Ce(n.message, void 0, !1);
  return xh(o, e, t, a, a ? n.number : e.uint32()), o;
}
function Wn(e, t) {
  switch (t) {
    case g.STRING:
      return e.string();
    case g.BOOL:
      return e.bool();
    case g.DOUBLE:
      return e.double();
    case g.FLOAT:
      return e.float();
    case g.INT32:
      return e.int32();
    case g.INT64:
      return e.int64();
    case g.UINT64:
      return e.uint64();
    case g.FIXED64:
      return e.fixed64();
    case g.BYTES:
      return e.bytes();
    case g.FIXED32:
      return e.fixed32();
    case g.SFIXED32:
      return e.sfixed32();
    case g.SFIXED64:
      return e.sfixed64();
    case g.SINT64:
      return e.sint64();
    case g.UINT32:
      return e.uint32();
    case g.SINT32:
      return e.sint32();
  }
}
function Yh(e, t) {
  var n;
  const r = Qo(x_, el(e));
  return r.messageType.forEach(tl), r.dependency = (n = void 0) !== null && n !== void 0 ? n : [], Lh(r, (a) => {
  }).getFile(r.name);
}
const B_ = /* @__PURE__ */ Yh("Chlnb29nbGUvcHJvdG9idWYvYW55LnByb3RvEg9nb29nbGUucHJvdG9idWYiJgoDQW55EhAKCHR5cGVfdXJsGAEgASgJEg0KBXZhbHVlGAIgASgMQnYKE2NvbS5nb29nbGUucHJvdG9idWZCCEFueVByb3RvUAFaLGdvb2dsZS5nb2xhbmcub3JnL3Byb3RvYnVmL3R5cGVzL2tub3duL2FueXBiogIDR1BCqgIeR29vZ2xlLlByb3RvYnVmLldlbGxLbm93blR5cGVzYgZwcm90bzM"), G_ = /* @__PURE__ */ ca(B_, 0), K_ = 3, Pm = {
  writeUnknownFields: !0
};
function C_(e) {
  return e ? Object.assign(Object.assign({}, Pm), e) : Pm;
}
function Mh(e, t, n) {
  return vo(new Eh(), C_(n), Ce(e, t)).finish();
}
function vo(e, t, n) {
  var r;
  for (const a of n.sortedFields) {
    if (!n.isSet(a)) {
      if (a.presence == K_)
        throw new Error(`cannot encode ${a} to binary: required field not set`);
      continue;
    }
    Bh(e, t, n, a);
  }
  if (t.writeUnknownFields)
    for (const { no: a, wireType: o, data: s } of (r = n.getUnknown()) !== null && r !== void 0 ? r : [])
      e.tag(a, o).raw(s);
  return e;
}
function Bh(e, t, n, r) {
  var a;
  switch (r.fieldKind) {
    case "scalar":
    case "enum":
      Io(e, n.desc.typeName, r.name, (a = r.scalar) !== null && a !== void 0 ? a : g.INT32, r.number, n.get(r));
      break;
    case "list":
      j_(e, t, r, n.get(r));
      break;
    case "message":
      Gh(e, t, r, n.get(r));
      break;
    case "map":
      for (const [o, s] of n.get(r))
        X_(e, t, r, o, s);
      break;
  }
}
function Io(e, t, n, r, a, o) {
  Kh(e.tag(a, W_(r)), t, n, r, o);
}
function Gh(e, t, n, r) {
  n.delimitedEncoding ? vo(e.tag(n.number, F.StartGroup), t, r).tag(n.number, F.EndGroup) : vo(e.tag(n.number, F.LengthDelimited).fork(), t, r).join();
}
function j_(e, t, n, r) {
  var a;
  if (n.listKind == "message") {
    for (const s of r)
      Gh(e, t, n, s);
    return;
  }
  const o = (a = n.scalar) !== null && a !== void 0 ? a : g.INT32;
  if (n.packed) {
    if (!r.size)
      return;
    e.tag(n.number, F.LengthDelimited).fork();
    for (const s of r)
      Kh(e, n.parent.typeName, n.name, o, s);
    e.join();
    return;
  }
  for (const s of r)
    Io(e, n.parent.typeName, n.name, o, n.number, s);
}
function X_(e, t, n, r, a) {
  var o;
  switch (e.tag(n.number, F.LengthDelimited).fork(), Io(e, n.parent.typeName, n.name, n.mapKey, 1, r), n.mapKind) {
    case "scalar":
    case "enum":
      Io(e, n.parent.typeName, n.name, (o = n.scalar) !== null && o !== void 0 ? o : g.INT32, 2, a);
      break;
    case "message":
      vo(e.tag(2, F.LengthDelimited).fork(), t, a).join();
      break;
  }
  e.join();
}
function Kh(e, t, n, r, a) {
  try {
    switch (r) {
      case g.STRING:
        e.string(a);
        break;
      case g.BOOL:
        e.bool(a);
        break;
      case g.DOUBLE:
        e.double(a);
        break;
      case g.FLOAT:
        e.float(a);
        break;
      case g.INT32:
        e.int32(a);
        break;
      case g.INT64:
        e.int64(a);
        break;
      case g.UINT64:
        e.uint64(a);
        break;
      case g.FIXED64:
        e.fixed64(a);
        break;
      case g.BYTES:
        e.bytes(a);
        break;
      case g.FIXED32:
        e.fixed32(a);
        break;
      case g.SFIXED32:
        e.sfixed32(a);
        break;
      case g.SFIXED64:
        e.sfixed64(a);
        break;
      case g.SINT64:
        e.sint64(a);
        break;
      case g.UINT32:
        e.uint32(a);
        break;
      case g.SINT32:
        e.sint32(a);
        break;
    }
  } catch (o) {
    throw o instanceof Error ? new Error(`cannot encode field ${t}.${n} to binary: ${o.message}`) : o;
  }
}
function W_(e) {
  switch (e) {
    case g.BYTES:
    case g.STRING:
      return F.LengthDelimited;
    case g.DOUBLE:
    case g.FIXED64:
    case g.SFIXED64:
      return F.Bit64;
    case g.FIXED32:
    case g.SFIXED32:
    case g.FLOAT:
      return F.Bit32;
    default:
      return F.Varint;
  }
}
function J_(e, t, n) {
  let r = !1;
  return n || (n = tt(G_), r = !0), n.value = Mh(e, t), n.typeUrl = z_(t.$typeName), r ? n : void 0;
}
function Z_(e, t) {
  if (e.typeUrl === "")
    return !1;
  const n = typeof t == "string" ? t : t.typeName, r = Ch(e.typeUrl);
  return n === r;
}
function H_(e, t) {
  if (e.typeUrl === "")
    return;
  const n = t.kind == "message" ? t : t.getMessage(Ch(e.typeUrl));
  if (!(!n || !Z_(e, n)))
    return Qo(n, e.value);
}
function z_(e) {
  return `type.googleapis.com/${e}`;
}
function Ch(e) {
  const t = e.lastIndexOf("/"), n = t >= 0 ? e.substring(t + 1) : e;
  if (!n.length)
    throw new Error(`invalid type url: ${e}`);
  return n;
}
const al = /* @__PURE__ */ Yh("Chxnb29nbGUvcHJvdG9idWYvc3RydWN0LnByb3RvEg9nb29nbGUucHJvdG9idWYihAEKBlN0cnVjdBIzCgZmaWVsZHMYASADKAsyIy5nb29nbGUucHJvdG9idWYuU3RydWN0LkZpZWxkc0VudHJ5GkUKC0ZpZWxkc0VudHJ5EgsKA2tleRgBIAEoCRIlCgV2YWx1ZRgCIAEoCzIWLmdvb2dsZS5wcm90b2J1Zi5WYWx1ZToCOAEi6gEKBVZhbHVlEjAKCm51bGxfdmFsdWUYASABKA4yGi5nb29nbGUucHJvdG9idWYuTnVsbFZhbHVlSAASFgoMbnVtYmVyX3ZhbHVlGAIgASgBSAASFgoMc3RyaW5nX3ZhbHVlGAMgASgJSAASFAoKYm9vbF92YWx1ZRgEIAEoCEgAEi8KDHN0cnVjdF92YWx1ZRgFIAEoCzIXLmdvb2dsZS5wcm90b2J1Zi5TdHJ1Y3RIABIwCgpsaXN0X3ZhbHVlGAYgASgLMhouZ29vZ2xlLnByb3RvYnVmLkxpc3RWYWx1ZUgAQgYKBGtpbmQiMwoJTGlzdFZhbHVlEiYKBnZhbHVlcxgBIAMoCzIWLmdvb2dsZS5wcm90b2J1Zi5WYWx1ZSobCglOdWxsVmFsdWUSDgoKTlVMTF9WQUxVRRAAQn8KE2NvbS5nb29nbGUucHJvdG9idWZCC1N0cnVjdFByb3RvUAFaL2dvb2dsZS5nb2xhbmcub3JnL3Byb3RvYnVmL3R5cGVzL2tub3duL3N0cnVjdHBi+AEBogIDR1BCqgIeR29vZ2xlLlByb3RvYnVmLldlbGxLbm93blR5cGVzYgZwcm90bzM"), q_ = /* @__PURE__ */ ca(al, 0), jh = /* @__PURE__ */ ca(al, 1), Q_ = /* @__PURE__ */ ca(al, 2);
var wi;
(function(e) {
  e[e.NULL_VALUE = 0] = "NULL_VALUE";
})(wi || (wi = {}));
function eO(e, t) {
  Xh(t, e);
  const n = nO(e.$unknown, t), [r, a, o] = es(t);
  for (const s of n)
    Vh(r, new Ju(s.data), a, s.wireType, {
      readUnknownFields: !0
    });
  return o();
}
function tO(e, t, n) {
  var r;
  Xh(t, e);
  const a = ((r = e.$unknown) !== null && r !== void 0 ? r : []).filter((l) => l.no !== t.number), [o, s] = es(t, n), i = new Eh();
  Bh(i, { writeUnknownFields: !0 }, o, s);
  const u = new Ju(i.finish());
  for (; u.pos < u.len; ) {
    const [l, c] = u.tag(), m = u.skip(c, l);
    a.push({ no: l, wireType: c, data: m });
  }
  e.$unknown = a;
}
function nO(e, t) {
  if (e === void 0)
    return [];
  if (t.fieldKind === "enum" || t.fieldKind === "scalar") {
    for (let n = e.length - 1; n >= 0; --n)
      if (e[n].no == t.number)
        return [e[n]];
    return [];
  }
  return e.filter((n) => n.no === t.number);
}
function es(e, t) {
  const n = e.typeName, r = Object.assign(Object.assign({}, e), { kind: "field", parent: e.extendee, localName: n }), a = Object.assign(Object.assign({}, e.extendee), { fields: [r], members: [r], oneofs: [] }), o = tt(a, t !== void 0 ? { [n]: t } : void 0);
  return [
    Ce(a, o),
    r,
    () => {
      const s = o[n];
      if (s === void 0) {
        const i = e.message;
        return la(i) ? vn(i.fields[0].scalar, i.fields[0].longAsString) : tt(i);
      }
      return s;
    }
  ];
}
function Xh(e, t) {
  if (e.extendee.typeName != t.$typeName)
    throw new Error(`extension ${e.typeName} can only be applied to message ${e.extendee.typeName}`);
}
const rO = 3, aO = 2, xm = {
  alwaysEmitImplicit: !1,
  enumAsInteger: !1,
  useProtoFieldName: !1
};
function oO(e) {
  return e ? Object.assign(Object.assign({}, xm), e) : xm;
}
function sO(e, t, n) {
  return fa(Ce(e, t), oO(n));
}
function iO(e, t, n) {
  var r;
  const a = sO(e, t, n);
  return JSON.stringify(a, null, (r = n?.prettySpaces) !== null && r !== void 0 ? r : 0);
}
function fa(e, t) {
  var n;
  const r = fO(e, t);
  if (r !== void 0)
    return r;
  const a = {};
  for (const o of e.sortedFields) {
    if (!e.isSet(o)) {
      if (o.presence == rO)
        throw new Error(`cannot encode ${o} to JSON: required field not set`);
      if (!t.alwaysEmitImplicit || o.presence !== aO)
        continue;
    }
    const s = Vm(o, e.get(o), t);
    s !== void 0 && (a[cO(o, t)] = s);
  }
  if (t.registry) {
    const o = /* @__PURE__ */ new Set();
    for (const { no: s } of (n = e.getUnknown()) !== null && n !== void 0 ? n : [])
      if (!o.has(s)) {
        o.add(s);
        const i = t.registry.getExtensionFor(e.desc, s);
        if (!i)
          continue;
        const u = eO(e.message, i), [l, c] = es(i, u), m = Vm(c, l.get(c), t);
        m !== void 0 && (a[i.jsonName] = m);
      }
  }
  return a;
}
function Vm(e, t, n) {
  switch (e.fieldKind) {
    case "scalar":
      return ts(e, t);
    case "message":
      return fa(t, n);
    case "enum":
      return ol(e.enum, t, n.enumAsInteger);
    case "list":
      return lO(t, n);
    case "map":
      return uO(t, n);
  }
}
function uO(e, t) {
  const n = e.field(), r = {};
  switch (n.mapKind) {
    case "scalar":
      for (const [a, o] of e)
        r[a] = ts(n, o);
      break;
    case "message":
      for (const [a, o] of e)
        r[a] = fa(o, t);
      break;
    case "enum":
      for (const [a, o] of e)
        r[a] = ol(n.enum, o, t.enumAsInteger);
      break;
  }
  return t.alwaysEmitImplicit || e.size > 0 ? r : void 0;
}
function lO(e, t) {
  const n = e.field(), r = [];
  switch (n.listKind) {
    case "scalar":
      for (const a of e)
        r.push(ts(n, a));
      break;
    case "enum":
      for (const a of e)
        r.push(ol(n.enum, a, t.enumAsInteger));
      break;
    case "message":
      for (const a of e)
        r.push(fa(a, t));
      break;
  }
  return t.alwaysEmitImplicit || r.length > 0 ? r : void 0;
}
function ol(e, t, n) {
  var r;
  if (typeof t != "number")
    throw new Error(`cannot encode ${e} to JSON: expected number, got ${W(t)}`);
  return e.typeName == "google.protobuf.NullValue" ? null : n ? t : (r = e.value[t]?.name) !== null && r !== void 0 ? r : t;
}
function ts(e, t) {
  var n, r, a, o, s, i;
  switch (e.scalar) {
    // int32, fixed32, uint32: JSON value will be a decimal number. Either numbers or strings are accepted.
    case g.INT32:
    case g.SFIXED32:
    case g.SINT32:
    case g.FIXED32:
    case g.UINT32:
      if (typeof t != "number")
        throw new Error(`cannot encode ${e} to JSON: ${(n = Ht(e, t)) === null || n === void 0 ? void 0 : n.message}`);
      return t;
    // float, double: JSON value will be a number or one of the special string values "NaN", "Infinity", and "-Infinity".
    // Either numbers or strings are accepted. Exponent notation is also accepted.
    case g.FLOAT:
    case g.DOUBLE:
      if (typeof t != "number")
        throw new Error(`cannot encode ${e} to JSON: ${(r = Ht(e, t)) === null || r === void 0 ? void 0 : r.message}`);
      return Number.isNaN(t) ? "NaN" : t === Number.POSITIVE_INFINITY ? "Infinity" : t === Number.NEGATIVE_INFINITY ? "-Infinity" : t;
    // string:
    case g.STRING:
      if (typeof t != "string")
        throw new Error(`cannot encode ${e} to JSON: ${(a = Ht(e, t)) === null || a === void 0 ? void 0 : a.message}`);
      return t;
    // bool:
    case g.BOOL:
      if (typeof t != "boolean")
        throw new Error(`cannot encode ${e} to JSON: ${(o = Ht(e, t)) === null || o === void 0 ? void 0 : o.message}`);
      return t;
    // JSON value will be a decimal string. Either numbers or strings are accepted.
    case g.UINT64:
    case g.FIXED64:
    case g.INT64:
    case g.SFIXED64:
    case g.SINT64:
      if (typeof t != "bigint" && typeof t != "string")
        throw new Error(`cannot encode ${e} to JSON: ${(s = Ht(e, t)) === null || s === void 0 ? void 0 : s.message}`);
      return t.toString();
    // bytes: JSON value will be the data encoded as a string using standard base64 encoding with paddings.
    // Either standard or URL-safe base64 encoding with/without paddings are accepted.
    case g.BYTES:
      if (t instanceof Uint8Array)
        return Dh(t);
      throw new Error(`cannot encode ${e} to JSON: ${(i = Ht(e, t)) === null || i === void 0 ? void 0 : i.message}`);
  }
}
function cO(e, t) {
  return t.useProtoFieldName ? e.name : e.jsonName;
}
function fO(e, t) {
  if (e.desc.typeName.startsWith("google.protobuf."))
    switch (e.desc.typeName) {
      case "google.protobuf.Any":
        return mO(e.message, t);
      case "google.protobuf.Timestamp":
        return bO(e.message);
      case "google.protobuf.Duration":
        return dO(e.message);
      case "google.protobuf.FieldMask":
        return pO(e.message);
      case "google.protobuf.Struct":
        return Wh(e.message);
      case "google.protobuf.Value":
        return sl(e.message);
      case "google.protobuf.ListValue":
        return Jh(e.message);
      default:
        if (la(e.desc)) {
          const n = e.desc.fields[0];
          return ts(n, e.get(n));
        }
        return;
    }
}
function mO(e, t) {
  if (e.typeUrl === "")
    return {};
  const { registry: n } = t;
  let r, a;
  if (n && (r = H_(e, n), r && (a = n.getMessage(r.$typeName))), !a || !r)
    throw new Error(`cannot encode message ${e.$typeName} to JSON: "${e.typeUrl}" is not in the type registry`);
  let o = fa(Ce(a, r), t);
  return (a.typeName.startsWith("google.protobuf.") || o === null || Array.isArray(o) || typeof o != "object") && (o = { value: o }), o["@type"] = e.typeUrl, o;
}
function dO(e) {
  const t = Number(e.seconds), n = e.nanos;
  if (t > 315576e6 || t < -315576e6)
    throw new Error(`cannot encode message ${e.$typeName} to JSON: value out of range`);
  if (t > 0 && n < 0 || t < 0 && n > 0)
    throw new Error(`cannot encode message ${e.$typeName} to JSON: nanos sign must match seconds sign`);
  let r = e.seconds.toString();
  if (n !== 0) {
    let a = Math.abs(n).toString();
    a = "0".repeat(9 - a.length) + a, a.substring(3) === "000000" ? a = a.substring(0, 3) : a.substring(6) === "000" && (a = a.substring(0, 6)), r += "." + a, n < 0 && t == 0 && (r = "-" + r);
  }
  return r + "s";
}
function pO(e) {
  return e.paths.map((t) => {
    if (t.match(/_[0-9]?_/g) || t.match(/[A-Z]/g))
      throw new Error(`cannot encode message ${e.$typeName} to JSON: lowerCamelCase of path name "` + t + '" is irreversible');
    return Ur(t);
  }).join(",");
}
function Wh(e) {
  const t = {};
  for (const [n, r] of Object.entries(e.fields))
    t[n] = sl(r);
  return t;
}
function sl(e) {
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
      return Wh(e.kind.value);
    case "listValue":
      return Jh(e.kind.value);
    default:
      throw new Error(`${e.$typeName} must have a value`);
  }
}
function Jh(e) {
  return e.values.map(sl);
}
function bO(e) {
  const t = Number(e.seconds) * 1e3;
  if (t < Date.parse("0001-01-01T00:00:00Z") || t > Date.parse("9999-12-31T23:59:59Z"))
    throw new Error(`cannot encode message ${e.$typeName} to JSON: must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive`);
  if (e.nanos < 0)
    throw new Error(`cannot encode message ${e.$typeName} to JSON: nanos must not be negative`);
  if (e.nanos > 999999999)
    throw new Error(`cannot encode message ${e.$typeName} to JSON: nanos must not be greater than 99999999`);
  let n = "Z";
  if (e.nanos > 0) {
    const r = (e.nanos + 1e9).toString().substring(1);
    r.substring(3) === "000000" ? n = "." + r.substring(0, 3) + "Z" : r.substring(6) === "000" ? n = "." + r.substring(0, 6) + "Z" : n = "." + r + "Z";
  }
  return new Date(t).toISOString().replace(".000Z", n);
}
const Ym = {
  ignoreUnknownFields: !1
};
function gO(e) {
  return e ? Object.assign(Object.assign({}, Ym), e) : Ym;
}
function hO(e, t, n) {
  return Zh(e, wO(t, e.typeName), n);
}
function Zh(e, t, n) {
  const r = Ce(e);
  try {
    Jn(r, t, gO(n));
  } catch (a) {
    throw zw(a) ? new Error(`cannot decode ${a.field()} from JSON: ${a.message}`, {
      cause: a
    }) : a;
  }
  return r.message;
}
function Jn(e, t, n) {
  var r;
  if (_O(e, t, n))
    return;
  if (t == null || Array.isArray(t) || typeof t != "object")
    throw new Error(`cannot decode ${e.desc} from JSON: ${W(t)}`);
  const a = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
  for (const s of e.desc.fields)
    o.set(s.name, s).set(s.jsonName, s);
  for (const [s, i] of Object.entries(t)) {
    const u = o.get(s);
    if (u) {
      if (u.oneof) {
        if (i === null && u.fieldKind == "scalar")
          continue;
        const l = a.get(u.oneof);
        if (l !== void 0)
          throw new Ee(u.oneof, `oneof set multiple times by ${l.name} and ${u.name}`);
        a.set(u.oneof, u);
      }
      Mm(e, u, i, n);
    } else {
      let l;
      if (s.startsWith("[") && s.endsWith("]") && // biome-ignore lint/suspicious/noAssignInExpressions: no
      (l = (r = n.registry) === null || r === void 0 ? void 0 : r.getExtension(s.substring(1, s.length - 1))) && l.extendee.typeName === e.desc.typeName) {
        const [c, m, d] = es(l);
        Mm(c, m, i, n), tO(e.message, l, d());
      }
      if (!l && !n.ignoreUnknownFields)
        throw new Error(`cannot decode ${e.desc} from JSON: key "${s}" is unknown`);
    }
  }
}
function Mm(e, t, n, r) {
  switch (t.fieldKind) {
    case "scalar":
      IO(e, t, n);
      break;
    case "enum":
      vO(e, t, n, r);
      break;
    case "message":
      NO(e, t, n, r);
      break;
    case "list":
      EO(e.get(t), n, r);
      break;
    case "map":
      yO(e.get(t), n, r);
      break;
  }
}
function yO(e, t, n) {
  if (t === null)
    return;
  const r = e.field();
  if (typeof t != "object" || Array.isArray(t))
    throw new Ee(r, "expected object, got " + W(t));
  for (const [a, o] of Object.entries(t)) {
    if (o === null && !Hh(r))
      throw new Ee(r, "map value must not be null");
    let s;
    switch (r.mapKind) {
      case "message":
        const u = Ce(r.message);
        Jn(u, o, n), s = u;
        break;
      case "enum":
        if (s = il(r.enum, o, n.ignoreUnknownFields, !0), s === ns)
          return;
        break;
      case "scalar":
        s = as(r, o, !0);
        break;
    }
    const i = TO(r.mapKey, a);
    e.set(i, s);
  }
}
function EO(e, t, n) {
  if (t === null)
    return;
  const r = e.field();
  if (!Array.isArray(t))
    throw new Ee(r, "expected Array, got " + W(t));
  for (const a of t) {
    if (a === null && !Hh(r))
      throw new Ee(r, "list item must not be null");
    switch (r.listKind) {
      case "message":
        const o = Ce(r.message);
        Jn(o, a, n), e.add(o);
        break;
      case "enum":
        const s = il(r.enum, a, n.ignoreUnknownFields, !0);
        s !== ns && e.add(s);
        break;
      case "scalar":
        e.add(as(r, a, !0));
        break;
    }
  }
}
function Hh(e) {
  var t, n;
  return ((t = e.message) === null || t === void 0 ? void 0 : t.typeName) == "google.protobuf.Value" || ((n = e.enum) === null || n === void 0 ? void 0 : n.typeName) == "google.protobuf.NullValue";
}
function NO(e, t, n, r) {
  if (n === null && t.message.typeName != "google.protobuf.Value") {
    e.clear(t);
    return;
  }
  const a = e.isSet(t) ? e.get(t) : Ce(t.message);
  Jn(a, n, r), e.set(t, a);
}
function vO(e, t, n, r) {
  const a = il(t.enum, n, r.ignoreUnknownFields, !1);
  a === rs ? e.clear(t) : a !== ns && e.set(t, a);
}
function IO(e, t, n) {
  const r = as(t, n, !1);
  r === rs ? e.clear(t) : e.set(t, r);
}
const ns = /* @__PURE__ */ Symbol();
function il(e, t, n, r) {
  if (t === null)
    return e.typeName == "google.protobuf.NullValue" ? 0 : r ? e.values[0].number : rs;
  switch (typeof t) {
    case "number":
      if (Number.isInteger(t))
        return t;
      break;
    case "string":
      const a = e.values.find((o) => o.name === t);
      if (a !== void 0)
        return a.number;
      if (n)
        return ns;
      break;
  }
  throw new Error(`cannot decode ${e} from JSON: ${W(t)}`);
}
const rs = /* @__PURE__ */ Symbol();
function as(e, t, n) {
  if (t === null)
    return n ? vn(e.scalar, !1) : rs;
  switch (e.scalar) {
    // float, double: JSON value will be a number or one of the special string values "NaN", "Infinity", and "-Infinity".
    // Either numbers or strings are accepted. Exponent notation is also accepted.
    case g.DOUBLE:
    case g.FLOAT:
      if (t === "NaN")
        return NaN;
      if (t === "Infinity")
        return Number.POSITIVE_INFINITY;
      if (t === "-Infinity")
        return Number.NEGATIVE_INFINITY;
      if (typeof t == "number") {
        if (Number.isNaN(t))
          throw new Ee(e, "unexpected NaN number");
        if (!Number.isFinite(t))
          throw new Ee(e, "unexpected infinite number");
        break;
      }
      if (typeof t == "string") {
        if (t === "" || t.trim().length !== t.length)
          break;
        const r = Number(t);
        if (!Number.isFinite(r))
          break;
        return r;
      }
      break;
    // int32, fixed32, uint32: JSON value will be a decimal number. Either numbers or strings are accepted.
    case g.INT32:
    case g.FIXED32:
    case g.SFIXED32:
    case g.SINT32:
    case g.UINT32:
      return zh(t);
    // bytes: JSON value will be the data encoded as a string using standard base64 encoding with paddings.
    // Either standard or URL-safe base64 encoding with/without paddings are accepted.
    case g.BYTES:
      if (typeof t == "string") {
        if (t === "")
          return new Uint8Array(0);
        try {
          return el(t);
        } catch (r) {
          const a = r instanceof Error ? r.message : String(r);
          throw new Ee(e, a);
        }
      }
      break;
  }
  return t;
}
function TO(e, t) {
  switch (e) {
    case g.BOOL:
      switch (t) {
        case "true":
          return !0;
        case "false":
          return !1;
      }
      return t;
    case g.INT32:
    case g.FIXED32:
    case g.UINT32:
    case g.SFIXED32:
    case g.SINT32:
      return zh(t);
    default:
      return t;
  }
}
function zh(e) {
  if (typeof e == "string") {
    if (e === "" || e.trim().length !== e.length)
      return e;
    const t = Number(e);
    return Number.isNaN(t) ? e : t;
  }
  return e;
}
function wO(e, t) {
  try {
    return JSON.parse(e);
  } catch (n) {
    const r = n instanceof Error ? n.message : String(n);
    throw new Error(
      `cannot decode message ${t} from JSON: ${r}`,
      // @ts-expect-error we use the ES2022 error CTOR option "cause" for better stack traces
      { cause: n }
    );
  }
}
function _O(e, t, n) {
  if (!e.desc.typeName.startsWith("google.protobuf."))
    return !1;
  switch (e.desc.typeName) {
    case "google.protobuf.Any":
      return OO(e.message, t, n), !0;
    case "google.protobuf.Timestamp":
      return SO(e.message, t), !0;
    case "google.protobuf.Duration":
      return kO(e.message, t), !0;
    case "google.protobuf.FieldMask":
      return DO(e.message, t), !0;
    case "google.protobuf.Struct":
      return qh(e.message, t), !0;
    case "google.protobuf.Value":
      return ul(e.message, t), !0;
    case "google.protobuf.ListValue":
      return Qh(e.message, t), !0;
    default:
      if (la(e.desc)) {
        const r = e.desc.fields[0];
        return t === null ? e.clear(r) : e.set(r, as(r, t, !0)), !0;
      }
      return !1;
  }
}
function OO(e, t, n) {
  var r;
  if (t === null || Array.isArray(t) || typeof t != "object")
    throw new Error(`cannot decode message ${e.$typeName} from JSON: expected object but got ${W(t)}`);
  if (Object.keys(t).length == 0)
    return;
  const a = t["@type"];
  if (typeof a != "string" || a == "")
    throw new Error(`cannot decode message ${e.$typeName} from JSON: "@type" is empty`);
  const o = a.includes("/") ? a.substring(a.lastIndexOf("/") + 1) : a;
  if (!o.length)
    throw new Error(`cannot decode message ${e.$typeName} from JSON: "@type" is invalid`);
  const s = (r = n.registry) === null || r === void 0 ? void 0 : r.getMessage(o);
  if (!s)
    throw new Error(`cannot decode message ${e.$typeName} from JSON: ${a} is not in the type registry`);
  const i = Ce(s);
  if (o.startsWith("google.protobuf.") && Object.prototype.hasOwnProperty.call(t, "value")) {
    const u = t.value;
    Jn(i, u, n);
  } else {
    const u = Object.assign({}, t);
    delete u["@type"], Jn(i, u, n);
  }
  J_(i.desc, i.message, e);
}
function SO(e, t) {
  if (typeof t != "string")
    throw new Error(`cannot decode message ${e.$typeName} from JSON: ${W(t)}`);
  const n = t.match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})(?:\.([0-9]{1,9}))?(?:Z|([+-][0-9][0-9]:[0-9][0-9]))$/);
  if (!n)
    throw new Error(`cannot decode message ${e.$typeName} from JSON: invalid RFC 3339 string`);
  const r = Date.parse(
    // biome-ignore format: want this to read well
    n[1] + "-" + n[2] + "-" + n[3] + "T" + n[4] + ":" + n[5] + ":" + n[6] + (n[8] ? n[8] : "Z")
  );
  if (Number.isNaN(r))
    throw new Error(`cannot decode message ${e.$typeName} from JSON: invalid RFC 3339 string`);
  if (r < Date.parse("0001-01-01T00:00:00Z") || r > Date.parse("9999-12-31T23:59:59Z"))
    throw new Error(`cannot decode message ${e.$typeName} from JSON: must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive`);
  e.seconds = D.parse(r / 1e3), e.nanos = 0, n[7] && (e.nanos = parseInt("1" + n[7] + "0".repeat(9 - n[7].length)) - 1e9);
}
function kO(e, t) {
  if (typeof t != "string")
    throw new Error(`cannot decode message ${e.$typeName} from JSON: ${W(t)}`);
  const n = t.match(/^(-?[0-9]+)(?:\.([0-9]+))?s/);
  if (n === null)
    throw new Error(`cannot decode message ${e.$typeName} from JSON: ${W(t)}`);
  const r = Number(n[1]);
  if (r > 315576e6 || r < -315576e6)
    throw new Error(`cannot decode message ${e.$typeName} from JSON: ${W(t)}`);
  if (e.seconds = D.parse(r), typeof n[2] != "string")
    return;
  const a = n[2] + "0".repeat(9 - n[2].length);
  e.nanos = parseInt(a), (r < 0 || Object.is(r, -0)) && (e.nanos = -e.nanos);
}
function DO(e, t) {
  if (typeof t != "string")
    throw new Error(`cannot decode message ${e.$typeName} from JSON: ${W(t)}`);
  if (t === "")
    return;
  function n(r) {
    if (r.includes("_"))
      throw new Error(`cannot decode message ${e.$typeName} from JSON: path names must be lowerCamelCase`);
    const a = r.replace(/[A-Z]/g, (o) => "_" + o.toLowerCase());
    return a[0] === "_" ? a.substring(1) : a;
  }
  e.paths = t.split(",").map(n);
}
function qh(e, t) {
  if (typeof t != "object" || t == null || Array.isArray(t))
    throw new Error(`cannot decode message ${e.$typeName} from JSON ${W(t)}`);
  for (const [n, r] of Object.entries(t)) {
    const a = tt(jh);
    ul(a, r), e.fields[n] = a;
  }
}
function ul(e, t) {
  switch (typeof t) {
    case "number":
      e.kind = { case: "numberValue", value: t };
      break;
    case "string":
      e.kind = { case: "stringValue", value: t };
      break;
    case "boolean":
      e.kind = { case: "boolValue", value: t };
      break;
    case "object":
      if (t === null)
        e.kind = { case: "nullValue", value: wi.NULL_VALUE };
      else if (Array.isArray(t)) {
        const n = tt(Q_);
        Qh(n, t), e.kind = { case: "listValue", value: n };
      } else {
        const n = tt(q_);
        qh(n, t), e.kind = { case: "structValue", value: n };
      }
      break;
    default:
      throw new Error(`cannot decode message ${e.$typeName} from JSON ${W(t)}`);
  }
  return e;
}
function Qh(e, t) {
  if (!Array.isArray(t))
    throw new Error(`cannot decode message ${e.$typeName} from JSON ${W(t)}`);
  for (const n of t) {
    const r = tt(jh);
    ul(r, n), e.values.push(r);
  }
}
function _i(e) {
  const t = _[e];
  return typeof t != "string" ? e.toString() : t[0].toLowerCase() + t.substring(1).replace(/[A-Z]/g, (n) => "_" + n.toLowerCase());
}
let $a;
function AO(e) {
  if (!$a) {
    $a = {};
    for (const t of Object.values(_))
      typeof t != "string" && ($a[_i(t)] = t);
  }
  return $a[e];
}
class G extends Error {
  /**
   * Create a new ConnectError.
   * If no code is provided, code "unknown" is used.
   * Outgoing details are only relevant for the server side - a service may
   * raise an error with details, and it is up to the protocol implementation
   * to encode and send the details along with the error.
   */
  constructor(t, n = _.Unknown, r, a, o) {
    super(LO(t, n)), this.name = "ConnectError", Object.setPrototypeOf(this, new.target.prototype), this.rawMessage = t, this.code = n, this.metadata = new Headers(r ?? {}), this.details = a ?? [], this.cause = o;
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
  static from(t, n = _.Unknown) {
    return t instanceof G ? t : t instanceof Error ? t.name == "AbortError" || t.name == "TimeoutError" ? new G(t.message, _.Canceled) : new G(t.message, n, void 0, void 0, t) : new G(String(t), n, void 0, void 0, t);
  }
  static [Symbol.hasInstance](t) {
    return t instanceof Error ? Object.getPrototypeOf(t) === G.prototype ? !0 : t.name === "ConnectError" && "code" in t && typeof t.code == "number" && "metadata" in t && "details" in t && Array.isArray(t.details) && "rawMessage" in t && typeof t.rawMessage == "string" && "cause" in t : !1;
  }
  findDetails(t) {
    const n = t.kind === "message" ? {
      getMessage: (a) => a === t.typeName ? t : void 0
    } : t, r = [];
    for (const a of this.details) {
      if ("desc" in a) {
        n.getMessage(a.desc.typeName) && r.push(tt(a.desc, a.value));
        continue;
      }
      const o = n.getMessage(a.type);
      if (o)
        try {
          r.push(Qo(o, a.value));
        } catch {
        }
    }
    return r;
  }
}
function LO(e, t) {
  return e.length ? `[${_i(t)}] ${e}` : `[${_i(t)}]`;
}
function UO(...e) {
  const t = new Headers();
  for (const n of e)
    n.forEach((r, a) => {
      t.append(a, r);
    });
  return t;
}
const Bm = 1;
function FO(e, t, n = !1) {
  if (t > e) {
    let r = `message size is larger than configured readMaxBytes ${e}`;
    throw n && (r = `message size ${t} is larger than configured readMaxBytes ${e}`), new G(r, _.ResourceExhausted);
  }
}
function RO(e) {
  return new $O(e);
}
class $O {
  constructor(t) {
    this.readMaxBytes = t, this.header = new Uint8Array(5), this.headerView = new DataView(this.header.buffer), this.buf = [];
  }
  get byteLength() {
    return this.buf.reduce((t, n) => t + n.byteLength, 0);
  }
  decode(t) {
    this.buf.push(t);
    const n = [];
    for (; ; ) {
      let r = this.pop();
      if (!r)
        break;
      n.push(r);
    }
    return n;
  }
  // consume an enveloped message
  pop() {
    if (!(!this.env && (this.env = this.head(), !this.env)) && this.cons(this.env.data)) {
      const t = this.env;
      return this.env = void 0, t;
    }
  }
  // consume header
  head() {
    if (!this.cons(this.header))
      return;
    const t = this.headerView.getUint8(0), n = this.headerView.getUint32(1);
    return FO(this.readMaxBytes, n, !0), {
      flags: t,
      data: new Uint8Array(n)
    };
  }
  // consume from buffer, fill target
  cons(t) {
    const n = t.byteLength;
    if (this.byteLength < n)
      return !1;
    let r = 0;
    for (; r < n; ) {
      const a = this.buf.shift();
      a.byteLength > n - r ? (t.set(a.subarray(0, n - r), r), this.buf.unshift(a.subarray(n - r)), r += n - r) : (t.set(a, r), r += a.byteLength);
    }
    return !0;
  }
}
function PO(e) {
  let t;
  const n = RO(4294967295);
  return new ReadableStream({
    start() {
      t = e.getReader();
    },
    async pull(r) {
      let a = !1;
      for (; !a; ) {
        const o = await t.read();
        if (o.done)
          n.byteLength > 0 && r.error(new G("protocol error: incomplete envelope", _.InvalidArgument)), r.close();
        else
          for (const s of n.decode(o.value))
            r.enqueue(s), a = !0;
      }
    }
  });
}
function xO(e, t) {
  const n = new Uint8Array(t.length + 5);
  n.set(t, 5);
  const r = new DataView(n.buffer, n.byteOffset, n.byteLength);
  return r.setUint8(0, e), r.setUint32(1, t.length), n;
}
function VO(...e) {
  const t = new AbortController(), n = e.filter((a) => a !== void 0).concat(t.signal);
  for (const a of n) {
    if (a.aborted) {
      r.apply(a);
      break;
    }
    a.addEventListener("abort", r);
  }
  function r() {
    t.signal.aborted || t.abort(ey(this));
    for (const a of n)
      a.removeEventListener("abort", r);
  }
  return t;
}
function YO(e) {
  const t = new AbortController(), n = () => {
    t.abort(new G("the operation timed out", _.DeadlineExceeded));
  };
  let r;
  return e !== void 0 && (e <= 0 ? n() : r = setTimeout(n, e)), {
    signal: t.signal,
    cleanup: () => clearTimeout(r)
  };
}
function ey(e) {
  if (!e.aborted)
    return;
  if (e.reason !== void 0)
    return e.reason;
  const t = new Error("This operation was aborted");
  return t.name = "AbortError", t;
}
function Gm() {
  return {
    get(e) {
      return e.id in this ? this[e.id] : e.defaultValue;
    },
    set(e, t) {
      return this[e.id] = t, this;
    },
    delete(e) {
      return delete this[e.id], this;
    }
  };
}
function Km(e, t) {
  return e.toString().replace(/\/?$/, `/${t.parent.typeName}/${t.name}`);
}
function ty(e, t) {
  return tt(e, t);
}
function MO(e, t) {
  function n(r) {
    return r.done === !0 ? r : {
      done: r.done,
      value: ty(e, r.value)
    };
  }
  return {
    [Symbol.asyncIterator]() {
      const r = t[Symbol.asyncIterator](), a = {
        next: () => r.next().then(n)
      };
      return r.throw !== void 0 && (a.throw = (o) => r.throw(o).then(n)), r.return !== void 0 && (a.return = (o) => r.return(o).then(n)), a;
    }
  };
}
function ny(e, t) {
  if (!t)
    return e;
  for (const n of t.concat().reverse())
    e = n(e);
  return e;
}
function ry(e) {
  var t;
  const n = Object.assign({}, e);
  return (t = n.ignoreUnknownFields) !== null && t !== void 0 || (n.ignoreUnknownFields = !0), n;
}
function Cm(e, t, n, r) {
  const a = t ? jm(e.input, r) : Xm(e.input, n);
  return { parse: (t ? jm(e.output, r) : Xm(e.output, n)).parse, serialize: a.serialize };
}
function jm(e, t) {
  return {
    parse(n) {
      try {
        return Qo(e, n, t);
      } catch (r) {
        const a = r instanceof Error ? r.message : String(r);
        throw new G(`parse binary: ${a}`, _.Internal);
      }
    },
    serialize(n) {
      try {
        return Mh(e, n, t);
      } catch (r) {
        const a = r instanceof Error ? r.message : String(r);
        throw new G(`serialize binary: ${a}`, _.Internal);
      }
    }
  };
}
function Xm(e, t) {
  var n, r;
  const a = (n = t?.textEncoder) !== null && n !== void 0 ? n : new TextEncoder(), o = (r = t?.textDecoder) !== null && r !== void 0 ? r : new TextDecoder(), s = ry(t);
  return {
    parse(i) {
      try {
        const u = o.decode(i);
        return hO(e, u, s);
      } catch (u) {
        throw G.from(u, _.InvalidArgument);
      }
    },
    serialize(i) {
      try {
        const u = iO(e, i, s);
        return a.encode(u);
      } catch (u) {
        throw G.from(u, _.Internal);
      }
    }
  };
}
const BO = /^application\/(connect\+)?(?:(json)(?:; ?charset=utf-?8)?|(proto))$/i, GO = "application/proto", KO = "application/json", CO = "application/connect+proto", jO = "application/connect+json";
function XO(e) {
  const t = e?.match(BO);
  if (!t)
    return;
  const n = !!t[1], r = !!t[3];
  return { stream: n, binary: r };
}
function ay(e, t, n) {
  var r;
  if (t && new Headers(t).forEach((i, u) => n.metadata.append(u, i)), typeof e != "object" || e == null || Array.isArray(e))
    throw n;
  let a = n.code;
  "code" in e && typeof e.code == "string" && (a = (r = AO(e.code)) !== null && r !== void 0 ? r : a);
  const o = e.message;
  if (o != null && typeof o != "string")
    throw n;
  const s = new G(o ?? "", a, t);
  if ("details" in e && Array.isArray(e.details))
    for (const i of e.details) {
      if (i === null || typeof i != "object" || Array.isArray(i) || typeof i.type != "string" || typeof i.value != "string")
        throw n;
      try {
        s.details.push({
          type: i.type,
          value: el(i.value),
          debug: i.debug
        });
      } catch {
        throw n;
      }
    }
  return s;
}
const Wm = 2;
function WO(e) {
  const t = new G("invalid end stream", _.Unknown);
  let n;
  try {
    n = JSON.parse(typeof e == "string" ? e : new TextDecoder().decode(e));
  } catch {
    throw t;
  }
  if (typeof n != "object" || n == null || Array.isArray(n))
    throw t;
  const r = new Headers();
  if ("metadata" in n) {
    if (typeof n.metadata != "object" || n.metadata == null || Array.isArray(n.metadata))
      throw t;
    for (const [o, s] of Object.entries(n.metadata)) {
      if (!Array.isArray(s) || s.some((i) => typeof i != "string"))
        throw t;
      for (const i of s)
        r.append(o, i);
    }
  }
  const a = "error" in n && n.error != null ? ay(n.error, r, t) : void 0;
  return { metadata: r, error: a };
}
const To = "Content-Type", JO = "Content-Length", Jm = "Content-Encoding", ZO = "Accept-Encoding", HO = "Connect-Timeout-Ms", oy = "Connect-Protocol-Version", zO = "User-Agent";
function qO(e) {
  switch (e) {
    case 400:
      return _.Internal;
    case 401:
      return _.Unauthenticated;
    case 403:
      return _.PermissionDenied;
    case 404:
      return _.Unimplemented;
    case 429:
      return _.Unavailable;
    case 502:
      return _.Unavailable;
    case 503:
      return _.Unavailable;
    case 504:
      return _.Unavailable;
    default:
      return _.Unknown;
  }
}
function Zm(e) {
  const t = new Headers(), n = new Headers();
  return e.forEach((r, a) => {
    a.toLowerCase().startsWith("trailer-") ? n.append(a.substring(8), r) : t.append(a, r);
  }), [t, n];
}
const sy = "1";
function Hm(e, t, n, r, a) {
  const o = new Headers(r ?? {});
  return n !== void 0 && o.set(HO, `${n}`), o.set(To, e == "unary" ? t ? GO : KO : t ? CO : jO), o.set(oy, sy), o.has(zO), o;
}
function zm(e, t, n, r) {
  const a = r.get(To), o = XO(a);
  if (n !== 200) {
    const i = new G(`HTTP ${n}`, qO(n), r);
    if (e == "unary" && o && !o.binary)
      return { isUnaryError: !0, unaryError: i };
    throw i;
  }
  const s = {
    binary: t,
    stream: e !== "unary"
  };
  if (o?.binary !== s.binary || o.stream !== s.stream)
    throw new G(`unsupported content type ${a}`, o === void 0 ? _.Unknown : _.Internal, r);
  return { isUnaryError: !1 };
}
const qm = "application/";
function QO(e, t) {
  return t ? Dh(e, "url") : encodeURIComponent(new TextDecoder().decode(e));
}
function eS(e, t, n) {
  let r = `?connect=v${sy}`;
  const a = e.header.get(To);
  a?.indexOf(qm) === 0 && (r += "&encoding=" + encodeURIComponent(a.slice(qm.length)));
  const o = e.header.get(Jm);
  o !== null && o !== "identity" && (r += "&compression=" + encodeURIComponent(o), n = !0), n && (r += "&base64=1"), r += "&message=" + QO(t, n);
  const s = e.url + r, i = new Headers(e.header);
  for (const u of [
    oy,
    To,
    JO,
    Jm,
    ZO
  ])
    i.delete(u);
  return Object.assign(Object.assign({}, e), {
    requestMethod: "GET",
    url: s,
    header: i
  });
}
function tS(e) {
  const t = ny(e.next, e.interceptors), [n, r, a] = iy(e), o = Object.assign(Object.assign({}, e.req), { message: ty(e.req.method.input, e.req.message), signal: n });
  return t(o).then((s) => (a(), s), r);
}
function nS(e) {
  const t = ny(e.next, e.interceptors), [n, r, a] = iy(e), o = Object.assign(Object.assign({}, e.req), { message: MO(e.req.method.input, e.req.message), signal: n });
  let s = !1;
  return n.addEventListener("abort", function() {
    var i, u;
    const l = e.req.message[Symbol.asyncIterator]();
    s || (i = l.throw) === null || i === void 0 || i.call(l, this.reason).catch(() => {
    }), (u = l.return) === null || u === void 0 || u.call(l).catch(() => {
    });
  }), t(o).then((i) => Object.assign(Object.assign({}, i), { message: {
    [Symbol.asyncIterator]() {
      const u = i.message[Symbol.asyncIterator]();
      return {
        next() {
          return u.next().then((l) => (l.done == !0 && (s = !0, a()), l), r);
        }
        // We deliberately omit throw/return.
      };
    }
  } }), r);
}
function iy(e) {
  const { signal: t, cleanup: n } = YO(e.timeoutMs), r = VO(e.signal, t);
  return [
    r.signal,
    function(a) {
      const o = G.from(t.aborted ? ey(t) : a);
      return r.abort(o), n(), Promise.reject(o);
    },
    function() {
      n(), r.abort();
    }
  ];
}
function rS() {
  try {
    new Headers();
  } catch {
    throw new Error("connect-web requires the fetch API. Are you running on an old version of Node.js? Node.js is not supported in Connect for Web - please stay tuned for Connect for Node.");
  }
}
var $r = function(e) {
  return this instanceof $r ? (this.v = e, this) : new $r(e);
}, aS = function(e, t, n) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var r = n.apply(e, t || []), a, o = [];
  return a = Object.create((typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype), i("next"), i("throw"), i("return", s), a[Symbol.asyncIterator] = function() {
    return this;
  }, a;
  function s(f) {
    return function(y) {
      return Promise.resolve(y).then(f, m);
    };
  }
  function i(f, y) {
    r[f] && (a[f] = function(E) {
      return new Promise(function(N, v) {
        o.push([f, E, N, v]) > 1 || u(f, E);
      });
    }, y && (a[f] = y(a[f])));
  }
  function u(f, y) {
    try {
      l(r[f](y));
    } catch (E) {
      d(o[0][3], E);
    }
  }
  function l(f) {
    f.value instanceof $r ? Promise.resolve(f.value.v).then(c, m) : d(o[0][2], f);
  }
  function c(f) {
    u("next", f);
  }
  function m(f) {
    u("throw", f);
  }
  function d(f, y) {
    f(y), o.shift(), o.length && u(o[0][0], o[0][1]);
  }
};
const Qm = {
  redirect: "error"
};
function oS(e) {
  var t;
  rS();
  const n = (t = e.useBinaryFormat) !== null && t !== void 0 ? t : !1;
  return {
    async unary(r, a, o, s, i, u) {
      const { serialize: l, parse: c } = Cm(r, n, e.jsonOptions, e.binaryOptions);
      return o = o === void 0 ? e.defaultTimeoutMs : o <= 0 ? void 0 : o, await tS({
        interceptors: e.interceptors,
        signal: a,
        timeoutMs: o,
        req: {
          stream: !1,
          service: r.parent,
          method: r,
          requestMethod: "POST",
          url: Km(e.baseUrl, r),
          header: Hm(r.methodKind, n, o, s),
          contextValues: u ?? Gm(),
          message: i
        },
        next: async (m) => {
          var d;
          const f = e.useHttpGet === !0 && r.idempotency === Ti.NO_SIDE_EFFECTS;
          let y = null;
          f ? m = eS(m, l(m.message), n) : y = l(m.message);
          const E = await ((d = e.fetch) !== null && d !== void 0 ? d : globalThis.fetch)(m.url, Object.assign(Object.assign({}, Qm), { method: m.requestMethod, headers: m.header, signal: m.signal, body: y })), { isUnaryError: N, unaryError: v } = zm(r.methodKind, n, E.status, E.headers);
          if (N)
            throw ay(await E.json(), UO(...Zm(E.headers)), v);
          const [I, M] = Zm(E.headers);
          return {
            stream: !1,
            service: r.parent,
            method: r,
            header: I,
            message: n ? c(new Uint8Array(await E.arrayBuffer())) : Zh(r.output, await E.json(), ry(e.jsonOptions)),
            trailer: M
          };
        }
      });
    },
    async stream(r, a, o, s, i, u) {
      const { serialize: l, parse: c } = Cm(r, n, e.jsonOptions, e.binaryOptions);
      function m(f, y, E, N) {
        return aS(this, arguments, function* () {
          const v = PO(f).getReader();
          let I = !1;
          for (; ; ) {
            const M = yield $r(v.read());
            if (M.done)
              break;
            const { flags: De, data: Xe } = M.value;
            if ((De & Bm) === Bm)
              throw new G("protocol error: received unsupported compressed output", _.Internal);
            if ((De & Wm) === Wm) {
              I = !0;
              const ae = WO(Xe);
              if (ae.error) {
                const C = ae.error;
                throw E.forEach((Z, ht) => {
                  C.metadata.append(ht, Z);
                }), C;
              }
              ae.metadata.forEach((C, Z) => y.set(Z, C));
              continue;
            }
            yield yield $r(c(Xe));
          }
          if ("throwIfAborted" in N && N.throwIfAborted(), !I)
            throw "missing EndStreamResponse";
        });
      }
      async function d(f) {
        if (r.methodKind != "server_streaming")
          throw "The fetch API does not support streaming request bodies";
        const y = await f[Symbol.asyncIterator]().next();
        if (y.done == !0)
          throw "missing request message";
        return xO(0, l(y.value));
      }
      return o = o === void 0 ? e.defaultTimeoutMs : o <= 0 ? void 0 : o, await nS({
        interceptors: e.interceptors,
        timeoutMs: o,
        signal: a,
        req: {
          stream: !0,
          service: r.parent,
          method: r,
          requestMethod: "POST",
          url: Km(e.baseUrl, r),
          header: Hm(r.methodKind, n, o, s),
          contextValues: u ?? Gm(),
          message: i
        },
        next: async (f) => {
          var y;
          const E = await ((y = e.fetch) !== null && y !== void 0 ? y : globalThis.fetch)(f.url, Object.assign(Object.assign({}, Qm), { method: f.requestMethod, headers: f.header, signal: f.signal, body: await d(f.message) }));
          if (zm(r.methodKind, n, E.status, E.headers), E.body === null)
            throw "missing response body";
          const N = new Headers();
          return Object.assign(Object.assign({}, f), { header: E.headers, trailer: N, message: m(E.body, N, E.headers, f.signal) });
        }
      });
    }
  };
}
oS({
  baseUrl: "/api",
  useBinaryFormat: !0,
  fetch: (e, t) => {
    const n = t?.headers ?? {};
    return fetch(e, {
      ...t,
      headers: {
        ...n,
        "qt-widget-id": window.qtWidgetId
      }
    });
  }
});
const ie = /* @__PURE__ */ Symbol(), sS = !1;
var iS = Array.isArray, uS = Array.prototype.indexOf, xs = Object.getOwnPropertyDescriptor, lS = Object.prototype, cS = Array.prototype, fS = Object.getPrototypeOf;
function mS(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
function dS() {
  var e, t, n = new Promise((r, a) => {
    e = r, t = a;
  });
  return { promise: n, resolve: e, reject: t };
}
const Se = 2, pS = 4, bS = 1 << 24, nr = 16, ma = 32, da = 64, ll = 128, dt = 512, fe = 1024, nt = 2048, pt = 4096, za = 8192, fn = 16384, gS = 32768, ed = 1 << 17, uy = 1 << 18, In = 32768, Oi = 1 << 21, ly = 1 << 22, Pr = 1 << 23, Vs = /* @__PURE__ */ Symbol("$state"), cy = new class extends Error {
  name = "StaleReactionError";
  message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}();
function hS() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function yS() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function ES() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function NS() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function vS(e) {
  return e === this.v;
}
let IS = !1;
function fy() {
  return !0;
}
let Fn = [];
function TS() {
  var e = Fn;
  Fn = [], mS(e);
}
function wS(e) {
  if (Fn.length === 0) {
    var t = Fn;
    queueMicrotask(() => {
      t === Fn && TS();
    });
  }
  Fn.push(e);
}
function _S(e) {
  var t = Ne;
  if (t === null)
    return V.f |= Pr, e;
  if ((t.f & gS) === 0) {
    if ((t.f & ll) === 0)
      throw e;
    t.b.error(e);
  } else
    my(e, t);
}
function my(e, t) {
  for (; t !== null; ) {
    if ((t.f & ll) !== 0)
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
const Pa = /* @__PURE__ */ new Set();
let q = null, Me = null, it = [], cl = null, Si = !1;
class xr {
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
  #t = 0;
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
  #o = /* @__PURE__ */ new Set();
  /**
   * Deferred effects that are MAYBE_DIRTY
   * @type {Set<Effect>}
   */
  #s = /* @__PURE__ */ new Set();
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
    it = [], this.apply();
    var n = {
      parent: null,
      effect: null,
      effects: [],
      render_effects: []
    };
    for (const r of t)
      this.#u(r, n);
    this.is_fork || this.#c(), this.is_deferred() ? (this.#n(n.effects), this.#n(n.render_effects)) : (q = null, td(n.render_effects), td(n.effects), this.#i?.resolve()), Me = null;
  }
  /**
   * Traverse the effect tree, executing effects or stashing
   * them for later execution as appropriate
   * @param {Effect} root
   * @param {EffectTarget} target
   */
  #u(t, n) {
    t.f ^= fe;
    for (var r = t.first; r !== null; ) {
      var a = r.f, o = (a & (ma | da)) !== 0, s = o && (a & fe) !== 0, i = s || (a & za) !== 0 || this.skipped_effects.has(r);
      if ((r.f & ll) !== 0 && r.b?.is_pending() && (n = {
        parent: n,
        effect: r,
        effects: [],
        render_effects: []
      }), !i && r.fn !== null) {
        o ? r.f ^= fe : (a & pS) !== 0 ? n.effects.push(r) : ba(r) && ((r.f & nr) !== 0 && this.#o.add(r), ko(r));
        var u = r.first;
        if (u !== null) {
          r = u;
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
      (n.f & nt) !== 0 ? this.#o.add(n) : (n.f & pt) !== 0 && this.#s.add(n), this.#l(n.deps), ve(n, fe);
  }
  /**
   * @param {Value[] | null} deps
   */
  #l(t) {
    if (t !== null)
      for (const n of t)
        (n.f & Se) === 0 || (n.f & In) === 0 || (n.f ^= In, this.#l(
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
    this.previous.has(t) || this.previous.set(t, n), (t.f & Pr) === 0 && (this.current.set(t, t.v), Me?.set(t, t.v));
  }
  activate() {
    q = this, this.apply();
  }
  deactivate() {
    q === this && (q = null, Me = null);
  }
  flush() {
    if (this.activate(), it.length > 0) {
      if (OS(), q !== null && q !== this)
        return;
    } else this.#e === 0 && this.process([]);
    this.deactivate();
  }
  discard() {
    for (const t of this.#a) t(this);
    this.#a.clear();
  }
  #c() {
    if (this.#t === 0) {
      for (const t of this.#r) t();
      this.#r.clear();
    }
    this.#e === 0 && this.#f();
  }
  #f() {
    if (Pa.size > 1) {
      this.previous.clear();
      var t = Me, n = !0, r = {
        parent: null,
        effect: null,
        effects: [],
        render_effects: []
      };
      for (const o of Pa) {
        if (o === this) {
          n = !1;
          continue;
        }
        const s = [];
        for (const [u, l] of this.current) {
          if (o.current.has(u))
            if (n && l !== o.current.get(u))
              o.current.set(u, l);
            else
              continue;
          s.push(u);
        }
        if (s.length === 0)
          continue;
        const i = [...o.current.keys()].filter((u) => !this.current.has(u));
        if (i.length > 0) {
          var a = it;
          it = [];
          const u = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Map();
          for (const c of s)
            dy(c, i, u, l);
          if (it.length > 0) {
            q = o, o.apply();
            for (const c of it)
              o.#u(c, r);
            o.deactivate();
          }
          it = a;
        }
      }
      q = null, Me = t;
    }
    this.committed = !0, Pa.delete(this);
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
    for (const t of this.#o)
      this.#s.delete(t), ve(t, nt), Vr(t);
    for (const t of this.#s)
      ve(t, pt), Vr(t);
    this.flush();
  }
  /** @param {() => void} fn */
  oncommit(t) {
    this.#r.add(t);
  }
  /** @param {(batch: Batch) => void} fn */
  ondiscard(t) {
    this.#a.add(t);
  }
  settled() {
    return (this.#i ??= dS()).promise;
  }
  static ensure() {
    if (q === null) {
      const t = q = new xr();
      Pa.add(q), xr.enqueue(() => {
        q === t && t.flush();
      });
    }
    return q;
  }
  /** @param {() => void} task */
  static enqueue(t) {
    wS(t);
  }
  apply() {
  }
}
function OS() {
  var e = mn;
  Si = !0;
  try {
    var t = 0;
    for (_o(!0); it.length > 0; ) {
      var n = xr.ensure();
      if (t++ > 1e3) {
        var r, a;
        SS();
      }
      n.process(it), Mt.clear();
    }
  } finally {
    Si = !1, _o(e), cl = null;
  }
}
function SS() {
  try {
    hS();
  } catch (e) {
    my(e, cl);
  }
}
let Tt = null;
function td(e) {
  var t = e.length;
  if (t !== 0) {
    for (var n = 0; n < t; ) {
      var r = e[n++];
      if ((r.f & (fn | za)) === 0 && ba(r) && (Tt = /* @__PURE__ */ new Set(), ko(r), r.deps === null && r.first === null && r.nodes === null && (r.teardown === null && r.ac === null ? Iy(r) : r.fn = null), Tt?.size > 0)) {
        Mt.clear();
        for (const a of Tt) {
          if ((a.f & (fn | za)) !== 0) continue;
          const o = [a];
          let s = a.parent;
          for (; s !== null; )
            Tt.has(s) && (Tt.delete(s), o.push(s)), s = s.parent;
          for (let i = o.length - 1; i >= 0; i--) {
            const u = o[i];
            (u.f & (fn | za)) === 0 && ko(u);
          }
        }
        Tt.clear();
      }
    }
    Tt = null;
  }
}
function dy(e, t, n, r) {
  if (!n.has(e) && (n.add(e), e.reactions !== null))
    for (const a of e.reactions) {
      const o = a.f;
      (o & Se) !== 0 ? dy(
        /** @type {Derived} */
        a,
        t,
        n,
        r
      ) : (o & (ly | nr)) !== 0 && (o & nt) === 0 && py(a, t, r) && (ve(a, nt), Vr(
        /** @type {Effect} */
        a
      ));
    }
}
function py(e, t, n) {
  const r = n.get(e);
  if (r !== void 0) return r;
  if (e.deps !== null)
    for (const a of e.deps) {
      if (t.includes(a))
        return !0;
      if ((a.f & Se) !== 0 && py(
        /** @type {Derived} */
        a,
        t,
        n
      ))
        return n.set(
          /** @type {Derived} */
          a,
          !0
        ), !0;
    }
  return n.set(e, !1), !1;
}
function Vr(e) {
  for (var t = cl = e; t.parent !== null; ) {
    t = t.parent;
    var n = t.f;
    if (Si && t === Ne && (n & nr) !== 0 && (n & uy) === 0)
      return;
    if ((n & (da | ma)) !== 0) {
      if ((n & fe) === 0) return;
      t.f ^= fe;
    }
  }
  it.push(t);
}
function by(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var n = 0; n < t.length; n += 1)
      ml(
        /** @type {Effect} */
        t[n]
      );
  }
}
function kS(e) {
  for (var t = e.parent; t !== null; ) {
    if ((t.f & Se) === 0)
      return (t.f & fn) === 0 ? (
        /** @type {Effect} */
        t
      ) : null;
    t = t.parent;
  }
  return null;
}
function fl(e) {
  var t, n = Ne;
  Oo(kS(e));
  try {
    e.f &= ~In, by(e), t = Oy(e);
  } finally {
    Oo(n);
  }
  return t;
}
function gy(e) {
  var t = fl(e);
  if (e.equals(t) || (q?.is_fork || (e.v = t), e.wv = wy()), !pa)
    if (Me !== null)
      (wo() || q?.is_fork) && Me.set(e, t);
    else {
      var n = (e.f & dt) === 0 ? pt : fe;
      ve(e, n);
    }
}
let ki = /* @__PURE__ */ new Set();
const Mt = /* @__PURE__ */ new Map();
let hy = !1;
function DS(e, t) {
  var n = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: vS,
    rv: 0,
    wv: 0
  };
  return n;
}
// @__NO_SIDE_EFFECTS__
function Pt(e, t) {
  const n = DS(e);
  return PS(n), n;
}
function zt(e, t, n = !1) {
  V !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!nn || (V.f & ed) !== 0) && fy() && (V.f & (Se | nr | ly | ed)) !== 0 && !Ut?.includes(e) && NS();
  let r = n ? Rn(t) : t;
  return AS(e, r);
}
function AS(e, t) {
  if (!e.equals(t)) {
    var n = e.v;
    pa ? Mt.set(e, t) : Mt.set(e, n), e.v = t;
    var r = xr.ensure();
    r.capture(e, n), (e.f & Se) !== 0 && ((e.f & nt) !== 0 && fl(
      /** @type {Derived} */
      e
    ), ve(e, (e.f & dt) !== 0 ? fe : pt)), e.wv = wy(), yy(e, nt), Ne !== null && (Ne.f & fe) !== 0 && (Ne.f & (ma | da)) === 0 && (Pe === null ? xS([e]) : Pe.push(e)), !r.is_fork && ki.size > 0 && !hy && LS();
  }
  return t;
}
function LS() {
  hy = !1;
  var e = mn;
  _o(!0);
  const t = Array.from(ki);
  try {
    for (const n of t)
      (n.f & fe) !== 0 && ve(n, pt), ba(n) && ko(n);
  } finally {
    _o(e);
  }
  ki.clear();
}
function Ys(e) {
  zt(e, e.v + 1);
}
function yy(e, t) {
  var n = e.reactions;
  if (n !== null)
    for (var r = n.length, a = 0; a < r; a++) {
      var o = n[a], s = o.f, i = (s & nt) === 0;
      if (i && ve(o, t), (s & Se) !== 0) {
        var u = (
          /** @type {Derived} */
          o
        );
        Me?.delete(u), (s & In) === 0 && (s & dt && (o.f |= In), yy(u, pt));
      } else i && ((s & nr) !== 0 && Tt !== null && Tt.add(
        /** @type {Effect} */
        o
      ), Vr(
        /** @type {Effect} */
        o
      ));
    }
}
function Rn(e) {
  if (typeof e != "object" || e === null || Vs in e)
    return e;
  const t = fS(e);
  if (t !== lS && t !== cS)
    return e;
  var n = /* @__PURE__ */ new Map(), r = iS(e), a = /* @__PURE__ */ Pt(0), o = dn, s = (i) => {
    if (dn === o)
      return i();
    var u = V, l = dn;
    Zn(null), rd(o);
    var c = i();
    return Zn(u), rd(l), c;
  };
  return r && n.set("length", /* @__PURE__ */ Pt(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(i, u, l) {
        (!("value" in l) || l.configurable === !1 || l.enumerable === !1 || l.writable === !1) && yS();
        var c = n.get(u);
        return c === void 0 ? c = s(() => {
          var m = /* @__PURE__ */ Pt(l.value);
          return n.set(u, m), m;
        }) : zt(c, l.value, !0), !0;
      },
      deleteProperty(i, u) {
        var l = n.get(u);
        if (l === void 0) {
          if (u in i) {
            const c = s(() => /* @__PURE__ */ Pt(ie));
            n.set(u, c), Ys(a);
          }
        } else
          zt(l, ie), Ys(a);
        return !0;
      },
      get(i, u, l) {
        if (u === Vs)
          return e;
        var c = n.get(u), m = u in i;
        if (c === void 0 && (!m || xs(i, u)?.writable) && (c = s(() => {
          var f = Rn(m ? i[u] : ie), y = /* @__PURE__ */ Pt(f);
          return y;
        }), n.set(u, c)), c !== void 0) {
          var d = xa(c);
          return d === ie ? void 0 : d;
        }
        return Reflect.get(i, u, l);
      },
      getOwnPropertyDescriptor(i, u) {
        var l = Reflect.getOwnPropertyDescriptor(i, u);
        if (l && "value" in l) {
          var c = n.get(u);
          c && (l.value = xa(c));
        } else if (l === void 0) {
          var m = n.get(u), d = m?.v;
          if (m !== void 0 && d !== ie)
            return {
              enumerable: !0,
              configurable: !0,
              value: d,
              writable: !0
            };
        }
        return l;
      },
      has(i, u) {
        if (u === Vs)
          return !0;
        var l = n.get(u), c = l !== void 0 && l.v !== ie || Reflect.has(i, u);
        if (l !== void 0 || Ne !== null && (!c || xs(i, u)?.writable)) {
          l === void 0 && (l = s(() => {
            var d = c ? Rn(i[u]) : ie, f = /* @__PURE__ */ Pt(d);
            return f;
          }), n.set(u, l));
          var m = xa(l);
          if (m === ie)
            return !1;
        }
        return c;
      },
      set(i, u, l, c) {
        var m = n.get(u), d = u in i;
        if (r && u === "length")
          for (var f = l; f < /** @type {Source<number>} */
          m.v; f += 1) {
            var y = n.get(f + "");
            y !== void 0 ? zt(y, ie) : f in i && (y = s(() => /* @__PURE__ */ Pt(ie)), n.set(f + "", y));
          }
        if (m === void 0)
          (!d || xs(i, u)?.writable) && (m = s(() => /* @__PURE__ */ Pt(void 0)), zt(m, Rn(l)), n.set(u, m));
        else {
          d = m.v !== ie;
          var E = s(() => Rn(l));
          zt(m, E);
        }
        var N = Reflect.getOwnPropertyDescriptor(i, u);
        if (N?.set && N.set.call(c, l), !d) {
          if (r && typeof u == "string") {
            var v = (
              /** @type {Source<number>} */
              n.get("length")
            ), I = Number(u);
            Number.isInteger(I) && I >= v.v && zt(v, I + 1);
          }
          Ys(a);
        }
        return !0;
      },
      ownKeys(i) {
        xa(a);
        var u = Reflect.ownKeys(i).filter((m) => {
          var d = n.get(m);
          return d === void 0 || d.v !== ie;
        });
        for (var [l, c] of n)
          c.v !== ie && !(l in i) && u.push(l);
        return u;
      },
      setPrototypeOf() {
        ES();
      }
    }
  );
}
var US;
// @__NO_SIDE_EFFECTS__
function FS(e) {
  return (
    /** @type {TemplateNode | null} */
    US.call(e)
  );
}
function Ey(e) {
  var t = V, n = Ne;
  Zn(null), Oo(null);
  try {
    return e();
  } finally {
    Zn(t), Oo(n);
  }
}
function wo() {
  return V !== null && !nn;
}
function Ny(e) {
  var t = e.teardown;
  if (t !== null) {
    const n = pa, r = V;
    nd(!0), Zn(null);
    try {
      t.call(null);
    } finally {
      nd(n), Zn(r);
    }
  }
}
function vy(e, t = !1) {
  var n = e.first;
  for (e.first = e.last = null; n !== null; ) {
    const a = n.ac;
    a !== null && Ey(() => {
      a.abort(cy);
    });
    var r = n.next;
    (n.f & da) !== 0 ? n.parent = null : ml(n, t), n = r;
  }
}
function RS(e) {
  for (var t = e.first; t !== null; ) {
    var n = t.next;
    (t.f & ma) === 0 && ml(t), t = n;
  }
}
function ml(e, t = !0) {
  var n = !1;
  (t || (e.f & uy) !== 0) && e.nodes !== null && e.nodes.end !== null && ($S(
    e.nodes.start,
    /** @type {TemplateNode} */
    e.nodes.end
  ), n = !0), vy(e, t && !n), So(e, 0), ve(e, fn);
  var r = e.nodes && e.nodes.t;
  if (r !== null)
    for (const o of r)
      o.stop();
  Ny(e);
  var a = e.parent;
  a !== null && a.first !== null && Iy(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = null;
}
function $S(e, t) {
  for (; e !== null; ) {
    var n = e === t ? null : /* @__PURE__ */ FS(e);
    e.remove(), e = n;
  }
}
function Iy(e) {
  var t = e.parent, n = e.prev, r = e.next;
  n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
let mn = !1;
function _o(e) {
  mn = e;
}
let pa = !1;
function nd(e) {
  pa = e;
}
let V = null, nn = !1;
function Zn(e) {
  V = e;
}
let Ne = null;
function Oo(e) {
  Ne = e;
}
let Ut = null;
function PS(e) {
  V !== null && (Ut === null ? Ut = [e] : Ut.push(e));
}
let ne = null, Ue = 0, Pe = null;
function xS(e) {
  Pe = e;
}
let Ty = 1, Yr = 0, dn = Yr;
function rd(e) {
  dn = e;
}
function wy() {
  return ++Ty;
}
function ba(e) {
  var t = e.f;
  if ((t & nt) !== 0)
    return !0;
  if (t & Se && (e.f &= ~In), (t & pt) !== 0) {
    var n = e.deps;
    if (n !== null)
      for (var r = n.length, a = 0; a < r; a++) {
        var o = n[a];
        if (ba(
          /** @type {Derived} */
          o
        ) && gy(
          /** @type {Derived} */
          o
        ), o.wv > e.wv)
          return !0;
      }
    (t & dt) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    Me === null && ve(e, fe);
  }
  return !1;
}
function _y(e, t, n = !0) {
  var r = e.reactions;
  if (r !== null && !Ut?.includes(e))
    for (var a = 0; a < r.length; a++) {
      var o = r[a];
      (o.f & Se) !== 0 ? _y(
        /** @type {Derived} */
        o,
        t,
        !1
      ) : t === o && (n ? ve(o, nt) : (o.f & fe) !== 0 && ve(o, pt), Vr(
        /** @type {Effect} */
        o
      ));
    }
}
function Oy(e) {
  var t = ne, n = Ue, r = Pe, a = V, o = Ut, s = nn, i = dn, u = e.f;
  ne = /** @type {null | Value[]} */
  null, Ue = 0, Pe = null, V = (u & (ma | da)) === 0 ? e : null, Ut = null, e.ctx, nn = !1, dn = ++Yr, e.ac !== null && (Ey(() => {
    e.ac.abort(cy);
  }), e.ac = null);
  try {
    e.f |= Oi;
    var l = (
      /** @type {Function} */
      e.fn
    ), c = l(), m = e.deps;
    if (ne !== null) {
      var d;
      if (So(e, Ue), m !== null && Ue > 0)
        for (m.length = Ue + ne.length, d = 0; d < ne.length; d++)
          m[Ue + d] = ne[d];
      else
        e.deps = m = ne;
      if (wo() && (e.f & dt) !== 0)
        for (d = Ue; d < m.length; d++)
          (m[d].reactions ??= []).push(e);
    } else m !== null && Ue < m.length && (So(e, Ue), m.length = Ue);
    if (fy() && Pe !== null && !nn && m !== null && (e.f & (Se | pt | nt)) === 0)
      for (d = 0; d < /** @type {Source[]} */
      Pe.length; d++)
        _y(
          Pe[d],
          /** @type {Effect} */
          e
        );
    return a !== null && a !== e && (Yr++, Pe !== null && (r === null ? r = Pe : r.push(.../** @type {Source[]} */
    Pe))), (e.f & Pr) !== 0 && (e.f ^= Pr), c;
  } catch (f) {
    return _S(f);
  } finally {
    e.f ^= Oi, ne = t, Ue = n, Pe = r, V = a, Ut = o, nn = s, dn = i;
  }
}
function VS(e, t) {
  let n = t.reactions;
  if (n !== null) {
    var r = uS.call(n, e);
    if (r !== -1) {
      var a = n.length - 1;
      a === 0 ? n = t.reactions = null : (n[r] = n[a], n.pop());
    }
  }
  n === null && (t.f & Se) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (ne === null || !ne.includes(t)) && (ve(t, pt), (t.f & dt) !== 0 && (t.f ^= dt, t.f &= ~In), by(
    /** @type {Derived} **/
    t
  ), So(
    /** @type {Derived} **/
    t,
    0
  ));
}
function So(e, t) {
  var n = e.deps;
  if (n !== null)
    for (var r = t; r < n.length; r++)
      VS(e, n[r]);
}
function ko(e) {
  var t = e.f;
  if ((t & fn) === 0) {
    ve(e, fe);
    var n = Ne, r = mn;
    Ne = e, mn = !0;
    try {
      (t & (nr | bS)) !== 0 ? RS(e) : vy(e), Ny(e);
      var a = Oy(e);
      e.teardown = typeof a == "function" ? a : null, e.wv = Ty;
      var o;
      sS && IS && (e.f & nt) !== 0 && e.deps;
    } finally {
      mn = r, Ne = n;
    }
  }
}
function xa(e) {
  var t = e.f, n = (t & Se) !== 0;
  if (V !== null && !nn) {
    var r = Ne !== null && (Ne.f & fn) !== 0;
    if (!r && !Ut?.includes(e)) {
      var a = V.deps;
      if ((V.f & Oi) !== 0)
        e.rv < Yr && (e.rv = Yr, ne === null && a !== null && a[Ue] === e ? Ue++ : ne === null ? ne = [e] : ne.includes(e) || ne.push(e));
      else {
        (V.deps ??= []).push(e);
        var o = e.reactions;
        o === null ? e.reactions = [V] : o.includes(V) || o.push(V);
      }
    }
  }
  if (pa) {
    if (Mt.has(e))
      return Mt.get(e);
    if (n) {
      var s = (
        /** @type {Derived} */
        e
      ), i = s.v;
      return ((s.f & fe) === 0 && s.reactions !== null || ky(s)) && (i = fl(s)), Mt.set(s, i), i;
    }
  } else n && (!Me?.has(e) || q?.is_fork && !wo()) && (s = /** @type {Derived} */
  e, ba(s) && gy(s), mn && wo() && (s.f & dt) === 0 && Sy(s));
  if (Me?.has(e))
    return Me.get(e);
  if ((e.f & Pr) !== 0)
    throw e.v;
  return e.v;
}
function Sy(e) {
  if (e.deps !== null) {
    e.f ^= dt;
    for (const t of e.deps)
      (t.reactions ??= []).push(e), (t.f & Se) !== 0 && (t.f & dt) === 0 && Sy(
        /** @type {Derived} */
        t
      );
  }
}
function ky(e) {
  if (e.v === ie) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps)
    if (Mt.has(t) || (t.f & Se) !== 0 && ky(
      /** @type {Derived} */
      t
    ))
      return !0;
  return !1;
}
const YS = -7169;
function ve(e, t) {
  e.f = e.f & YS | t;
}
function Dy() {
  return {
    isDark: document.documentElement.classList.contains("night-mode")
  };
}
const MS = Rn(Dy()), BS = new MutationObserver((e, t) => {
  MS.isDark = Dy().isDark;
});
BS.observe(document.documentElement, { attributeFilter: ["class"] });
const GS = "5";
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add(GS);
var O;
(function(e) {
  e[e.Canceled = 1] = "Canceled", e[e.Unknown = 2] = "Unknown", e[e.InvalidArgument = 3] = "InvalidArgument", e[e.DeadlineExceeded = 4] = "DeadlineExceeded", e[e.NotFound = 5] = "NotFound", e[e.AlreadyExists = 6] = "AlreadyExists", e[e.PermissionDenied = 7] = "PermissionDenied", e[e.ResourceExhausted = 8] = "ResourceExhausted", e[e.FailedPrecondition = 9] = "FailedPrecondition", e[e.Aborted = 10] = "Aborted", e[e.OutOfRange = 11] = "OutOfRange", e[e.Unimplemented = 12] = "Unimplemented", e[e.Internal = 13] = "Internal", e[e.Unavailable = 14] = "Unavailable", e[e.DataLoss = 15] = "DataLoss", e[e.Unauthenticated = 16] = "Unauthenticated";
})(O || (O = {}));
function dl(e, t) {
  return e !== null && typeof e == "object" && "$typeName" in e && typeof e.$typeName == "string" ? t === void 0 ? !0 : t.typeName === e.$typeName : !1;
}
var h;
(function(e) {
  e[e.DOUBLE = 1] = "DOUBLE", e[e.FLOAT = 2] = "FLOAT", e[e.INT64 = 3] = "INT64", e[e.UINT64 = 4] = "UINT64", e[e.INT32 = 5] = "INT32", e[e.FIXED64 = 6] = "FIXED64", e[e.FIXED32 = 7] = "FIXED32", e[e.BOOL = 8] = "BOOL", e[e.STRING = 9] = "STRING", e[e.BYTES = 12] = "BYTES", e[e.UINT32 = 13] = "UINT32", e[e.SFIXED32 = 15] = "SFIXED32", e[e.SFIXED64 = 16] = "SFIXED64", e[e.SINT32 = 17] = "SINT32", e[e.SINT64 = 18] = "SINT64";
})(h || (h = {}));
function KS() {
  let e = 0, t = 0;
  for (let r = 0; r < 28; r += 7) {
    let a = this.buf[this.pos++];
    if (e |= (a & 127) << r, (a & 128) == 0)
      return this.assertBounds(), [e, t];
  }
  let n = this.buf[this.pos++];
  if (e |= (n & 15) << 28, t = (n & 112) >> 4, (n & 128) == 0)
    return this.assertBounds(), [e, t];
  for (let r = 3; r <= 31; r += 7) {
    let a = this.buf[this.pos++];
    if (t |= (a & 127) << r, (a & 128) == 0)
      return this.assertBounds(), [e, t];
  }
  throw new Error("invalid varint");
}
function Ms(e, t, n) {
  for (let o = 0; o < 28; o = o + 7) {
    const s = e >>> o, i = !(!(s >>> 7) && t == 0), u = (i ? s | 128 : s) & 255;
    if (n.push(u), !i)
      return;
  }
  const r = e >>> 28 & 15 | (t & 7) << 4, a = t >> 3 != 0;
  if (n.push((a ? r | 128 : r) & 255), !!a) {
    for (let o = 3; o < 31; o = o + 7) {
      const s = t >>> o, i = !!(s >>> 7), u = (i ? s | 128 : s) & 255;
      if (n.push(u), !i)
        return;
    }
    n.push(t >>> 31 & 1);
  }
}
const qa = 4294967296;
function ad(e) {
  const t = e[0] === "-";
  t && (e = e.slice(1));
  const n = 1e6;
  let r = 0, a = 0;
  function o(s, i) {
    const u = Number(e.slice(s, i));
    a *= n, r = r * n + u, r >= qa && (a = a + (r / qa | 0), r = r % qa);
  }
  return o(-24, -18), o(-18, -12), o(-12, -6), o(-6), t ? Ly(r, a) : pl(r, a);
}
function CS(e, t) {
  let n = pl(e, t);
  const r = n.hi & 2147483648;
  r && (n = Ly(n.lo, n.hi));
  const a = Ay(n.lo, n.hi);
  return r ? "-" + a : a;
}
function Ay(e, t) {
  if ({ lo: e, hi: t } = jS(e, t), t <= 2097151)
    return String(qa * t + e);
  const n = e & 16777215, r = (e >>> 24 | t << 8) & 16777215, a = t >> 16 & 65535;
  let o = n + r * 6777216 + a * 6710656, s = r + a * 8147497, i = a * 2;
  const u = 1e7;
  return o >= u && (s += Math.floor(o / u), o %= u), s >= u && (i += Math.floor(s / u), s %= u), i.toString() + od(s) + od(o);
}
function jS(e, t) {
  return { lo: e >>> 0, hi: t >>> 0 };
}
function pl(e, t) {
  return { lo: e | 0, hi: t | 0 };
}
function Ly(e, t) {
  return t = ~t, e ? e = ~e + 1 : t += 1, pl(e, t);
}
const od = (e) => {
  const t = String(e);
  return "0000000".slice(t.length) + t;
};
function Di(e, t) {
  if (e >= 0) {
    for (; e > 127; )
      t.push(e & 127 | 128), e = e >>> 7;
    t.push(e);
  } else {
    for (let n = 0; n < 9; n++)
      t.push(e & 127 | 128), e = e >> 7;
    t.push(1);
  }
}
function XS() {
  let e = this.buf[this.pos++], t = e & 127;
  if ((e & 128) == 0)
    return this.assertBounds(), t;
  if (e = this.buf[this.pos++], t |= (e & 127) << 7, (e & 128) == 0)
    return this.assertBounds(), t;
  if (e = this.buf[this.pos++], t |= (e & 127) << 14, (e & 128) == 0)
    return this.assertBounds(), t;
  if (e = this.buf[this.pos++], t |= (e & 127) << 21, (e & 128) == 0)
    return this.assertBounds(), t;
  e = this.buf[this.pos++], t |= (e & 15) << 28;
  for (let n = 5; (e & 128) !== 0 && n < 10; n++)
    e = this.buf[this.pos++];
  if ((e & 128) != 0)
    throw new Error("invalid varint");
  return this.assertBounds(), t >>> 0;
}
const A = /* @__PURE__ */ WS();
function WS() {
  const e = new DataView(new ArrayBuffer(8));
  if (typeof BigInt == "function" && typeof e.getBigInt64 == "function" && typeof e.getBigUint64 == "function" && typeof e.setBigInt64 == "function" && typeof e.setBigUint64 == "function" && (globalThis.Deno || typeof process != "object" || typeof process.env != "object" || process.env.BUF_BIGINT_DISABLE !== "1")) {
    const t = BigInt("-9223372036854775808"), n = BigInt("9223372036854775807"), r = BigInt("0"), a = BigInt("18446744073709551615");
    return {
      zero: BigInt(0),
      supported: !0,
      parse(o) {
        const s = typeof o == "bigint" ? o : BigInt(o);
        if (s > n || s < t)
          throw new Error(`invalid int64: ${o}`);
        return s;
      },
      uParse(o) {
        const s = typeof o == "bigint" ? o : BigInt(o);
        if (s > a || s < r)
          throw new Error(`invalid uint64: ${o}`);
        return s;
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
      dec(o, s) {
        return e.setInt32(0, o, !0), e.setInt32(4, s, !0), e.getBigInt64(0, !0);
      },
      uDec(o, s) {
        return e.setInt32(0, o, !0), e.setInt32(4, s, !0), e.getBigUint64(0, !0);
      }
    };
  }
  return {
    zero: "0",
    supported: !1,
    parse(t) {
      return typeof t != "string" && (t = t.toString()), sd(t), t;
    },
    uParse(t) {
      return typeof t != "string" && (t = t.toString()), id(t), t;
    },
    enc(t) {
      return typeof t != "string" && (t = t.toString()), sd(t), ad(t);
    },
    uEnc(t) {
      return typeof t != "string" && (t = t.toString()), id(t), ad(t);
    },
    dec(t, n) {
      return CS(t, n);
    },
    uDec(t, n) {
      return Ay(t, n);
    }
  };
}
function sd(e) {
  if (!/^-?[0-9]+$/.test(e))
    throw new Error("invalid int64: " + e);
}
function id(e) {
  if (!/^[0-9]+$/.test(e))
    throw new Error("invalid uint64: " + e);
}
function Tn(e, t) {
  switch (e) {
    case h.STRING:
      return "";
    case h.BOOL:
      return !1;
    case h.DOUBLE:
    case h.FLOAT:
      return 0;
    case h.INT64:
    case h.UINT64:
    case h.SFIXED64:
    case h.FIXED64:
    case h.SINT64:
      return t ? "0" : A.zero;
    case h.BYTES:
      return new Uint8Array(0);
    default:
      return 0;
  }
}
function JS(e, t) {
  switch (e) {
    case h.BOOL:
      return t === !1;
    case h.STRING:
      return t === "";
    case h.BYTES:
      return t instanceof Uint8Array && !t.byteLength;
    default:
      return t == 0;
  }
}
const Uy = 2, Dt = /* @__PURE__ */ Symbol.for("reflect unsafe local");
function Fy(e, t) {
  const n = e[t.localName].case;
  return n === void 0 ? n : t.fields.find((r) => r.localName === n);
}
function ZS(e, t) {
  const n = t.localName;
  if (t.oneof)
    return e[t.oneof.localName].case === n;
  if (t.presence != Uy)
    return e[n] !== void 0 && Object.prototype.hasOwnProperty.call(e, n);
  switch (t.fieldKind) {
    case "list":
      return e[n].length > 0;
    case "map":
      return Object.keys(e[n]).length > 0;
    case "scalar":
      return !JS(t.scalar, e[n]);
    case "enum":
      return e[n] !== t.enum.values[0].number;
  }
  throw new Error("message field with implicit presence");
}
function Mr(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t) && e[t] !== void 0;
}
function Ry(e, t) {
  if (t.oneof) {
    const n = e[t.oneof.localName];
    return n.case === t.localName ? n.value : void 0;
  }
  return e[t.localName];
}
function $y(e, t, n) {
  t.oneof ? e[t.oneof.localName] = {
    case: t.localName,
    value: n
  } : e[t.localName] = n;
}
function HS(e, t) {
  const n = t.localName;
  if (t.oneof) {
    const r = t.oneof.localName;
    e[r].case === n && (e[r] = { case: void 0 });
  } else if (t.presence != Uy)
    delete e[n];
  else
    switch (t.fieldKind) {
      case "map":
        e[n] = {};
        break;
      case "list":
        e[n] = [];
        break;
      case "enum":
        e[n] = t.enum.values[0].number;
        break;
      case "scalar":
        e[n] = Tn(t.scalar, t.longAsString);
        break;
    }
}
function jt(e) {
  return e !== null && typeof e == "object" && !Array.isArray(e);
}
function bl(e, t) {
  var n, r, a, o;
  if (jt(e) && Dt in e && "add" in e && "field" in e && typeof e.field == "function") {
    if (t !== void 0) {
      const s = t, i = e.field();
      return s.listKind == i.listKind && s.scalar === i.scalar && ((n = s.message) === null || n === void 0 ? void 0 : n.typeName) === ((r = i.message) === null || r === void 0 ? void 0 : r.typeName) && ((a = s.enum) === null || a === void 0 ? void 0 : a.typeName) === ((o = i.enum) === null || o === void 0 ? void 0 : o.typeName);
    }
    return !0;
  }
  return !1;
}
function gl(e, t) {
  var n, r, a, o;
  if (jt(e) && Dt in e && "has" in e && "field" in e && typeof e.field == "function") {
    if (t !== void 0) {
      const s = t, i = e.field();
      return s.mapKey === i.mapKey && s.mapKind == i.mapKind && s.scalar === i.scalar && ((n = s.message) === null || n === void 0 ? void 0 : n.typeName) === ((r = i.message) === null || r === void 0 ? void 0 : r.typeName) && ((a = s.enum) === null || a === void 0 ? void 0 : a.typeName) === ((o = i.enum) === null || o === void 0 ? void 0 : o.typeName);
    }
    return !0;
  }
  return !1;
}
function hl(e, t) {
  return jt(e) && Dt in e && "desc" in e && jt(e.desc) && e.desc.kind === "message" && (t === void 0 || e.desc.typeName == t.typeName);
}
function zS(e) {
  return Py(e.$typeName);
}
function ga(e) {
  const t = e.fields[0];
  return Py(e.typeName) && t !== void 0 && t.fieldKind == "scalar" && t.name == "value" && t.number == 1;
}
function Py(e) {
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
const qS = 999, QS = 998, Qa = 2;
function rt(e, t) {
  if (dl(t, e))
    return t;
  const n = a2(e);
  return t !== void 0 && e2(e, n, t), n;
}
function e2(e, t, n) {
  for (const r of e.members) {
    let a = n[r.localName];
    if (a == null)
      continue;
    let o;
    if (r.kind == "oneof") {
      const s = Fy(n, r);
      if (!s)
        continue;
      o = s, a = Ry(n, s);
    } else
      o = r;
    switch (o.fieldKind) {
      case "message":
        a = yl(o, a);
        break;
      case "scalar":
        a = xy(o, a);
        break;
      case "list":
        a = n2(o, a);
        break;
      case "map":
        a = t2(o, a);
        break;
    }
    $y(t, o, a);
  }
  return t;
}
function xy(e, t) {
  return e.scalar == h.BYTES ? El(t) : t;
}
function t2(e, t) {
  if (jt(t)) {
    if (e.scalar == h.BYTES)
      return ud(t, El);
    if (e.mapKind == "message")
      return ud(t, (n) => yl(e, n));
  }
  return t;
}
function n2(e, t) {
  if (Array.isArray(t)) {
    if (e.scalar == h.BYTES)
      return t.map(El);
    if (e.listKind == "message")
      return t.map((n) => yl(e, n));
  }
  return t;
}
function yl(e, t) {
  if (e.fieldKind == "message" && !e.oneof && ga(e.message))
    return xy(e.message.fields[0], t);
  if (jt(t)) {
    if (e.message.typeName == "google.protobuf.Struct" && e.parent.typeName !== "google.protobuf.Value")
      return t;
    if (!dl(t, e.message))
      return rt(e.message, t);
  }
  return t;
}
function El(e) {
  return Array.isArray(e) ? new Uint8Array(e) : e;
}
function ud(e, t) {
  const n = {};
  for (const r of Object.entries(e))
    n[r[0]] = t(r[1]);
  return n;
}
const r2 = /* @__PURE__ */ Symbol(), ld = /* @__PURE__ */ new WeakMap();
function a2(e) {
  let t;
  if (o2(e)) {
    const n = ld.get(e);
    let r, a;
    if (n)
      ({ prototype: r, members: a } = n);
    else {
      r = {}, a = /* @__PURE__ */ new Set();
      for (const o of e.members)
        o.kind != "oneof" && (o.fieldKind != "scalar" && o.fieldKind != "enum" || o.presence != Qa && (a.add(o), r[o.localName] = Bs(o)));
      ld.set(e, { prototype: r, members: a });
    }
    t = Object.create(r), t.$typeName = e.typeName;
    for (const o of e.members)
      a.has(o) || o.kind == "field" && (o.fieldKind == "message" || (o.fieldKind == "scalar" || o.fieldKind == "enum") && o.presence != Qa) || (t[o.localName] = Bs(o));
  } else {
    t = {
      $typeName: e.typeName
    };
    for (const n of e.members)
      (n.kind == "oneof" || n.presence == Qa) && (t[n.localName] = Bs(n));
  }
  return t;
}
function o2(e) {
  switch (e.file.edition) {
    case qS:
      return !1;
    case QS:
      return !0;
    default:
      return e.fields.some((t) => t.presence != Qa && t.fieldKind != "message" && !t.oneof);
  }
}
function Bs(e) {
  if (e.kind == "oneof")
    return { case: void 0 };
  if (e.fieldKind == "list")
    return [];
  if (e.fieldKind == "map")
    return {};
  if (e.fieldKind == "message")
    return r2;
  const t = e.getDefaultValue();
  return t !== void 0 ? e.fieldKind == "scalar" && e.longAsString ? t.toString() : t : e.fieldKind == "scalar" ? Tn(e.scalar, e.longAsString) : e.enum.values[0].number;
}
const s2 = [
  "FieldValueInvalidError",
  "FieldListRangeError",
  "ForeignFieldError"
];
class Ie extends Error {
  constructor(t, n, r = "FieldValueInvalidError") {
    super(n), this.name = r, this.field = () => t;
  }
}
function i2(e) {
  return e instanceof Error && s2.includes(e.name) && "field" in e && typeof e.field == "function";
}
const Gs = /* @__PURE__ */ Symbol.for("@bufbuild/protobuf/text-encoding");
function Nl() {
  if (globalThis[Gs] == null) {
    const e = new globalThis.TextEncoder(), t = new globalThis.TextDecoder();
    globalThis[Gs] = {
      encodeUtf8(n) {
        return e.encode(n);
      },
      decodeUtf8(n) {
        return t.decode(n);
      },
      checkUtf8(n) {
        try {
          return encodeURIComponent(n), !0;
        } catch {
          return !1;
        }
      }
    };
  }
  return globalThis[Gs];
}
var R;
(function(e) {
  e[e.Varint = 0] = "Varint", e[e.Bit64 = 1] = "Bit64", e[e.LengthDelimited = 2] = "LengthDelimited", e[e.StartGroup = 3] = "StartGroup", e[e.EndGroup = 4] = "EndGroup", e[e.Bit32 = 5] = "Bit32";
})(R || (R = {}));
const Vy = 34028234663852886e22, Yy = -34028234663852886e22, My = 4294967295, By = 2147483647, Gy = -2147483648;
class Ky {
  constructor(t = Nl().encodeUtf8) {
    this.encodeUtf8 = t, this.stack = [], this.chunks = [], this.buf = [];
  }
  /**
   * Return all bytes written and reset this writer.
   */
  finish() {
    this.buf.length && (this.chunks.push(new Uint8Array(this.buf)), this.buf = []);
    let t = 0;
    for (let a = 0; a < this.chunks.length; a++)
      t += this.chunks[a].length;
    let n = new Uint8Array(t), r = 0;
    for (let a = 0; a < this.chunks.length; a++)
      n.set(this.chunks[a], r), r += this.chunks[a].length;
    return this.chunks = [], n;
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
    let t = this.finish(), n = this.stack.pop();
    if (!n)
      throw new Error("invalid state, fork stack empty");
    return this.chunks = n.chunks, this.buf = n.buf, this.uint32(t.byteLength), this.raw(t);
  }
  /**
   * Writes a tag (field number and wire type).
   *
   * Equivalent to `uint32( (fieldNo << 3 | type) >>> 0 )`.
   *
   * Generated code should compute the tag ahead of time and call `uint32()`.
   */
  tag(t, n) {
    return this.uint32((t << 3 | n) >>> 0);
  }
  /**
   * Write a chunk of raw bytes.
   */
  raw(t) {
    return this.buf.length && (this.chunks.push(new Uint8Array(this.buf)), this.buf = []), this.chunks.push(t), this;
  }
  /**
   * Write a `uint32` value, an unsigned 32 bit varint.
   */
  uint32(t) {
    for (cd(t); t > 127; )
      this.buf.push(t & 127 | 128), t = t >>> 7;
    return this.buf.push(t), this;
  }
  /**
   * Write a `int32` value, a signed 32 bit varint.
   */
  int32(t) {
    return Ks(t), Di(t, this.buf), this;
  }
  /**
   * Write a `bool` value, a variant.
   */
  bool(t) {
    return this.buf.push(t ? 1 : 0), this;
  }
  /**
   * Write a `bytes` value, length-delimited arbitrary data.
   */
  bytes(t) {
    return this.uint32(t.byteLength), this.raw(t);
  }
  /**
   * Write a `string` value, length-delimited data converted to UTF-8 text.
   */
  string(t) {
    let n = this.encodeUtf8(t);
    return this.uint32(n.byteLength), this.raw(n);
  }
  /**
   * Write a `float` value, 32-bit floating point number.
   */
  float(t) {
    u2(t);
    let n = new Uint8Array(4);
    return new DataView(n.buffer).setFloat32(0, t, !0), this.raw(n);
  }
  /**
   * Write a `double` value, a 64-bit floating point number.
   */
  double(t) {
    let n = new Uint8Array(8);
    return new DataView(n.buffer).setFloat64(0, t, !0), this.raw(n);
  }
  /**
   * Write a `fixed32` value, an unsigned, fixed-length 32-bit integer.
   */
  fixed32(t) {
    cd(t);
    let n = new Uint8Array(4);
    return new DataView(n.buffer).setUint32(0, t, !0), this.raw(n);
  }
  /**
   * Write a `sfixed32` value, a signed, fixed-length 32-bit integer.
   */
  sfixed32(t) {
    Ks(t);
    let n = new Uint8Array(4);
    return new DataView(n.buffer).setInt32(0, t, !0), this.raw(n);
  }
  /**
   * Write a `sint32` value, a signed, zigzag-encoded 32-bit varint.
   */
  sint32(t) {
    return Ks(t), t = (t << 1 ^ t >> 31) >>> 0, Di(t, this.buf), this;
  }
  /**
   * Write a `fixed64` value, a signed, fixed-length 64-bit integer.
   */
  sfixed64(t) {
    let n = new Uint8Array(8), r = new DataView(n.buffer), a = A.enc(t);
    return r.setInt32(0, a.lo, !0), r.setInt32(4, a.hi, !0), this.raw(n);
  }
  /**
   * Write a `fixed64` value, an unsigned, fixed-length 64 bit integer.
   */
  fixed64(t) {
    let n = new Uint8Array(8), r = new DataView(n.buffer), a = A.uEnc(t);
    return r.setInt32(0, a.lo, !0), r.setInt32(4, a.hi, !0), this.raw(n);
  }
  /**
   * Write a `int64` value, a signed 64-bit varint.
   */
  int64(t) {
    let n = A.enc(t);
    return Ms(n.lo, n.hi, this.buf), this;
  }
  /**
   * Write a `sint64` value, a signed, zig-zag-encoded 64-bit varint.
   */
  sint64(t) {
    const n = A.enc(t), r = n.hi >> 31, a = n.lo << 1 ^ r, o = (n.hi << 1 | n.lo >>> 31) ^ r;
    return Ms(a, o, this.buf), this;
  }
  /**
   * Write a `uint64` value, an unsigned 64-bit varint.
   */
  uint64(t) {
    const n = A.uEnc(t);
    return Ms(n.lo, n.hi, this.buf), this;
  }
}
class vl {
  constructor(t, n = Nl().decodeUtf8) {
    this.decodeUtf8 = n, this.varint64 = KS, this.uint32 = XS, this.buf = t, this.len = t.length, this.pos = 0, this.view = new DataView(t.buffer, t.byteOffset, t.byteLength);
  }
  /**
   * Reads a tag - field number and wire type.
   */
  tag() {
    let t = this.uint32(), n = t >>> 3, r = t & 7;
    if (n <= 0 || r < 0 || r > 5)
      throw new Error("illegal tag: field no " + n + " wire type " + r);
    return [n, r];
  }
  /**
   * Skip one element and return the skipped data.
   *
   * When skipping StartGroup, provide the tags field number to check for
   * matching field number in the EndGroup tag.
   */
  skip(t, n) {
    let r = this.pos;
    switch (t) {
      case R.Varint:
        for (; this.buf[this.pos++] & 128; )
          ;
        break;
      // @ts-ignore TS7029: Fallthrough case in switch -- ignore instead of expect-error for compiler settings without noFallthroughCasesInSwitch: true
      case R.Bit64:
        this.pos += 4;
      case R.Bit32:
        this.pos += 4;
        break;
      case R.LengthDelimited:
        let a = this.uint32();
        this.pos += a;
        break;
      case R.StartGroup:
        for (; ; ) {
          const [o, s] = this.tag();
          if (s === R.EndGroup) {
            if (n !== void 0 && o !== n)
              throw new Error("invalid end group tag");
            break;
          }
          this.skip(s, o);
        }
        break;
      default:
        throw new Error("cant skip wire type " + t);
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
    let t = this.uint32();
    return t >>> 1 ^ -(t & 1);
  }
  /**
   * Read a `int64` field, a signed 64-bit varint.
   */
  int64() {
    return A.dec(...this.varint64());
  }
  /**
   * Read a `uint64` field, an unsigned 64-bit varint.
   */
  uint64() {
    return A.uDec(...this.varint64());
  }
  /**
   * Read a `sint64` field, a signed, zig-zag-encoded 64-bit varint.
   */
  sint64() {
    let [t, n] = this.varint64(), r = -(t & 1);
    return t = (t >>> 1 | (n & 1) << 31) ^ r, n = n >>> 1 ^ r, A.dec(t, n);
  }
  /**
   * Read a `bool` field, a variant.
   */
  bool() {
    let [t, n] = this.varint64();
    return t !== 0 || n !== 0;
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
    return A.uDec(this.sfixed32(), this.sfixed32());
  }
  /**
   * Read a `fixed64` field, a signed, fixed-length 64-bit integer.
   */
  sfixed64() {
    return A.dec(this.sfixed32(), this.sfixed32());
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
    let t = this.uint32(), n = this.pos;
    return this.pos += t, this.assertBounds(), this.buf.subarray(n, n + t);
  }
  /**
   * Read a `string` field, length-delimited data converted to UTF-8 text.
   */
  string() {
    return this.decodeUtf8(this.bytes());
  }
}
function Ks(e) {
  if (typeof e == "string")
    e = Number(e);
  else if (typeof e != "number")
    throw new Error("invalid int32: " + typeof e);
  if (!Number.isInteger(e) || e > By || e < Gy)
    throw new Error("invalid int32: " + e);
}
function cd(e) {
  if (typeof e == "string")
    e = Number(e);
  else if (typeof e != "number")
    throw new Error("invalid uint32: " + typeof e);
  if (!Number.isInteger(e) || e > My || e < 0)
    throw new Error("invalid uint32: " + e);
}
function u2(e) {
  if (typeof e == "string") {
    const t = e;
    if (e = Number(e), Number.isNaN(e) && t !== "NaN")
      throw new Error("invalid float32: " + t);
  } else if (typeof e != "number")
    throw new Error("invalid float32: " + typeof e);
  if (Number.isFinite(e) && (e > Vy || e < Yy))
    throw new Error("invalid float32: " + e);
}
function qt(e, t) {
  const n = e.fieldKind == "list" ? bl(t, e) : e.fieldKind == "map" ? gl(t, e) : Il(e, t);
  if (n === !0)
    return;
  let r;
  switch (e.fieldKind) {
    case "list":
      r = `expected ${Xy(e)}, got ${J(t)}`;
      break;
    case "map":
      r = `expected ${Wy(e)}, got ${J(t)}`;
      break;
    default:
      r = Do(e, t, n);
  }
  return new Ie(e, r);
}
function fd(e, t, n) {
  const r = Il(e, n);
  if (r !== !0)
    return new Ie(e, `list item #${t + 1}: ${Do(e, n, r)}`);
}
function l2(e, t, n) {
  const r = Cy(t, e.mapKey);
  if (r !== !0)
    return new Ie(e, `invalid map key: ${Do({ scalar: e.mapKey }, t, r)}`);
  const a = Il(e, n);
  if (a !== !0)
    return new Ie(e, `map entry ${J(t)}: ${Do(e, n, a)}`);
}
function Il(e, t) {
  return e.scalar !== void 0 ? Cy(t, e.scalar) : e.enum !== void 0 ? e.enum.open ? Number.isInteger(t) : e.enum.values.some((n) => n.number === t) : hl(t, e.message);
}
function Cy(e, t) {
  switch (t) {
    case h.DOUBLE:
      return typeof e == "number";
    case h.FLOAT:
      return typeof e != "number" ? !1 : Number.isNaN(e) || !Number.isFinite(e) ? !0 : e > Vy || e < Yy ? `${e.toFixed()} out of range` : !0;
    case h.INT32:
    case h.SFIXED32:
    case h.SINT32:
      return typeof e != "number" || !Number.isInteger(e) ? !1 : e > By || e < Gy ? `${e.toFixed()} out of range` : !0;
    case h.FIXED32:
    case h.UINT32:
      return typeof e != "number" || !Number.isInteger(e) ? !1 : e > My || e < 0 ? `${e.toFixed()} out of range` : !0;
    case h.BOOL:
      return typeof e == "boolean";
    case h.STRING:
      return typeof e != "string" ? !1 : Nl().checkUtf8(e) || "invalid UTF8";
    case h.BYTES:
      return e instanceof Uint8Array;
    case h.INT64:
    case h.SFIXED64:
    case h.SINT64:
      if (typeof e == "bigint" || typeof e == "number" || typeof e == "string" && e.length > 0)
        try {
          return A.parse(e), !0;
        } catch {
          return `${e} out of range`;
        }
      return !1;
    case h.FIXED64:
    case h.UINT64:
      if (typeof e == "bigint" || typeof e == "number" || typeof e == "string" && e.length > 0)
        try {
          return A.uParse(e), !0;
        } catch {
          return `${e} out of range`;
        }
      return !1;
  }
}
function Do(e, t, n) {
  return n = typeof n == "string" ? `: ${n}` : `, got ${J(t)}`, e.scalar !== void 0 ? `expected ${c2(e.scalar)}` + n : e.enum !== void 0 ? `expected ${e.enum.toString()}` + n : `expected ${jy(e.message)}` + n;
}
function J(e) {
  switch (typeof e) {
    case "object":
      return e === null ? "null" : e instanceof Uint8Array ? `Uint8Array(${e.length})` : Array.isArray(e) ? `Array(${e.length})` : bl(e) ? Xy(e.field()) : gl(e) ? Wy(e.field()) : hl(e) ? jy(e.desc) : dl(e) ? `message ${e.$typeName}` : "object";
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
function jy(e) {
  return `ReflectMessage (${e.typeName})`;
}
function Xy(e) {
  switch (e.listKind) {
    case "message":
      return `ReflectList (${e.message.toString()})`;
    case "enum":
      return `ReflectList (${e.enum.toString()})`;
    case "scalar":
      return `ReflectList (${h[e.scalar]})`;
  }
}
function Wy(e) {
  switch (e.mapKind) {
    case "message":
      return `ReflectMap (${h[e.mapKey]}, ${e.message.toString()})`;
    case "enum":
      return `ReflectMap (${h[e.mapKey]}, ${e.enum.toString()})`;
    case "scalar":
      return `ReflectMap (${h[e.mapKey]}, ${h[e.scalar]})`;
  }
}
function c2(e) {
  switch (e) {
    case h.STRING:
      return "string";
    case h.BOOL:
      return "boolean";
    case h.INT64:
    case h.SINT64:
    case h.SFIXED64:
      return "bigint (int64)";
    case h.UINT64:
    case h.FIXED64:
      return "bigint (uint64)";
    case h.BYTES:
      return "Uint8Array";
    case h.DOUBLE:
      return "number (float64)";
    case h.FLOAT:
      return "number (float32)";
    case h.FIXED32:
    case h.UINT32:
      return "number (uint32)";
    case h.INT32:
    case h.SFIXED32:
    case h.SINT32:
      return "number (int32)";
  }
}
function je(e, t, n = !0) {
  return new Jy(e, t, n);
}
const md = /* @__PURE__ */ new WeakMap();
class Jy {
  get sortedFields() {
    const t = md.get(this.desc);
    if (t)
      return t;
    const n = this.desc.fields.concat().sort((r, a) => r.number - a.number);
    return md.set(this.desc, n), n;
  }
  constructor(t, n, r = !0) {
    this.lists = /* @__PURE__ */ new Map(), this.maps = /* @__PURE__ */ new Map(), this.check = r, this.desc = t, this.message = this[Dt] = n ?? rt(t), this.fields = t.fields, this.oneofs = t.oneofs, this.members = t.members;
  }
  findNumber(t) {
    return this._fieldsByNumber || (this._fieldsByNumber = new Map(this.desc.fields.map((n) => [n.number, n]))), this._fieldsByNumber.get(t);
  }
  oneofCase(t) {
    return ir(this.message, t), Fy(this.message, t);
  }
  isSet(t) {
    return ir(this.message, t), ZS(this.message, t);
  }
  clear(t) {
    ir(this.message, t), HS(this.message, t);
  }
  get(t) {
    ir(this.message, t);
    const n = Ry(this.message, t);
    switch (t.fieldKind) {
      case "list":
        let r = this.lists.get(t);
        return (!r || r[Dt] !== n) && this.lists.set(
          t,
          // biome-ignore lint/suspicious/noAssignInExpressions: no
          r = new f2(t, n, this.check)
        ), r;
      case "map":
        let a = this.maps.get(t);
        return (!a || a[Dt] !== n) && this.maps.set(
          t,
          // biome-ignore lint/suspicious/noAssignInExpressions: no
          a = new m2(t, n, this.check)
        ), a;
      case "message":
        return wl(t, n, this.check);
      case "scalar":
        return n === void 0 ? Tn(t.scalar, !1) : _l(t, n);
      case "enum":
        return n ?? t.enum.values[0].number;
    }
  }
  set(t, n) {
    if (ir(this.message, t), this.check) {
      const a = qt(t, n);
      if (a)
        throw a;
    }
    let r;
    t.fieldKind == "message" ? r = Tl(t, n) : gl(n) || bl(n) ? r = n[Dt] : r = Ol(t, n), $y(this.message, t, r);
  }
  getUnknown() {
    return this.message.$unknown;
  }
  setUnknown(t) {
    this.message.$unknown = t;
  }
}
function ir(e, t) {
  if (t.parent.typeName !== e.$typeName)
    throw new Ie(t, `cannot use ${t.toString()} with message ${e.$typeName}`, "ForeignFieldError");
}
class f2 {
  field() {
    return this._field;
  }
  get size() {
    return this._arr.length;
  }
  constructor(t, n, r) {
    this._field = t, this._arr = this[Dt] = n, this.check = r;
  }
  get(t) {
    const n = this._arr[t];
    return n === void 0 ? void 0 : Cs(this._field, n, this.check);
  }
  set(t, n) {
    if (t < 0 || t >= this._arr.length)
      throw new Ie(this._field, `list item #${t + 1}: out of range`);
    if (this.check) {
      const r = fd(this._field, t, n);
      if (r)
        throw r;
    }
    this._arr[t] = dd(this._field, n);
  }
  add(t) {
    if (this.check) {
      const n = fd(this._field, this._arr.length, t);
      if (n)
        throw n;
    }
    this._arr.push(dd(this._field, t));
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
    for (const t of this._arr)
      yield Cs(this._field, t, this.check);
  }
  *entries() {
    for (let t = 0; t < this._arr.length; t++)
      yield [t, Cs(this._field, this._arr[t], this.check)];
  }
}
class m2 {
  constructor(t, n, r = !0) {
    this.obj = this[Dt] = n ?? {}, this.check = r, this._field = t;
  }
  field() {
    return this._field;
  }
  set(t, n) {
    if (this.check) {
      const r = l2(this._field, t, n);
      if (r)
        throw r;
    }
    return this.obj[Va(t)] = d2(this._field, n), this;
  }
  delete(t) {
    const n = Va(t), r = Object.prototype.hasOwnProperty.call(this.obj, n);
    return r && delete this.obj[n], r;
  }
  clear() {
    for (const t of Object.keys(this.obj))
      delete this.obj[t];
  }
  get(t) {
    let n = this.obj[Va(t)];
    return n !== void 0 && (n = js(this._field, n, this.check)), n;
  }
  has(t) {
    return Object.prototype.hasOwnProperty.call(this.obj, Va(t));
  }
  *keys() {
    for (const t of Object.keys(this.obj))
      yield pd(t, this._field.mapKey);
  }
  *entries() {
    for (const t of Object.entries(this.obj))
      yield [
        pd(t[0], this._field.mapKey),
        js(this._field, t[1], this.check)
      ];
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  get size() {
    return Object.keys(this.obj).length;
  }
  *values() {
    for (const t of Object.values(this.obj))
      yield js(this._field, t, this.check);
  }
  forEach(t, n) {
    for (const r of this.entries())
      t.call(n, r[1], r[0], this);
  }
}
function Tl(e, t) {
  return hl(t) ? zS(t.message) && !e.oneof && e.fieldKind == "message" ? t.message.value : t.desc.typeName == "google.protobuf.Struct" && e.parent.typeName != "google.protobuf.Value" ? Hy(t.message) : t.message : t;
}
function wl(e, t, n) {
  return t !== void 0 && (ga(e.message) && !e.oneof && e.fieldKind == "message" ? t = {
    $typeName: e.message.typeName,
    value: _l(e.message.fields[0], t)
  } : e.message.typeName == "google.protobuf.Struct" && e.parent.typeName != "google.protobuf.Value" && jt(t) && (t = Zy(t))), new Jy(e.message, t, n);
}
function dd(e, t) {
  return e.listKind == "message" ? Tl(e, t) : Ol(e, t);
}
function Cs(e, t, n) {
  return e.listKind == "message" ? wl(e, t, n) : _l(e, t);
}
function d2(e, t) {
  return e.mapKind == "message" ? Tl(e, t) : Ol(e, t);
}
function js(e, t, n) {
  return e.mapKind == "message" ? wl(e, t, n) : t;
}
function Va(e) {
  return typeof e == "string" || typeof e == "number" ? e : String(e);
}
function pd(e, t) {
  switch (t) {
    case h.STRING:
      return e;
    case h.INT32:
    case h.FIXED32:
    case h.UINT32:
    case h.SFIXED32:
    case h.SINT32: {
      const n = Number.parseInt(e);
      if (Number.isFinite(n))
        return n;
      break;
    }
    case h.BOOL:
      switch (e) {
        case "true":
          return !0;
        case "false":
          return !1;
      }
      break;
    case h.UINT64:
    case h.FIXED64:
      try {
        return A.uParse(e);
      } catch {
      }
      break;
    default:
      try {
        return A.parse(e);
      } catch {
      }
      break;
  }
  return e;
}
function _l(e, t) {
  switch (e.scalar) {
    case h.INT64:
    case h.SFIXED64:
    case h.SINT64:
      "longAsString" in e && e.longAsString && typeof t == "string" && (t = A.parse(t));
      break;
    case h.FIXED64:
    case h.UINT64:
      "longAsString" in e && e.longAsString && typeof t == "string" && (t = A.uParse(t));
      break;
  }
  return t;
}
function Ol(e, t) {
  switch (e.scalar) {
    case h.INT64:
    case h.SFIXED64:
    case h.SINT64:
      "longAsString" in e && e.longAsString ? t = String(t) : (typeof t == "string" || typeof t == "number") && (t = A.parse(t));
      break;
    case h.FIXED64:
    case h.UINT64:
      "longAsString" in e && e.longAsString ? t = String(t) : (typeof t == "string" || typeof t == "number") && (t = A.uParse(t));
      break;
  }
  return t;
}
function Zy(e) {
  const t = {
    $typeName: "google.protobuf.Struct",
    fields: {}
  };
  if (jt(e))
    for (const [n, r] of Object.entries(e))
      t.fields[n] = qy(r);
  return t;
}
function Hy(e) {
  const t = {};
  for (const [n, r] of Object.entries(e.fields))
    t[n] = zy(r);
  return t;
}
function zy(e) {
  switch (e.kind.case) {
    case "structValue":
      return Hy(e.kind.value);
    case "listValue":
      return e.kind.value.values.map(zy);
    case "nullValue":
    case void 0:
      return null;
    default:
      return e.kind.value;
  }
}
function qy(e) {
  const t = {
    $typeName: "google.protobuf.Value",
    kind: { case: void 0 }
  };
  switch (typeof e) {
    case "number":
      t.kind = { case: "numberValue", value: e };
      break;
    case "string":
      t.kind = { case: "stringValue", value: e };
      break;
    case "boolean":
      t.kind = { case: "boolValue", value: e };
      break;
    case "object":
      if (e === null)
        t.kind = { case: "nullValue", value: 0 };
      else if (Array.isArray(e)) {
        const n = {
          $typeName: "google.protobuf.ListValue",
          values: []
        };
        if (Array.isArray(e))
          for (const r of e)
            n.values.push(qy(r));
        t.kind = {
          case: "listValue",
          value: n
        };
      } else
        t.kind = {
          case: "structValue",
          value: Zy(e)
        };
      break;
  }
  return t;
}
function Sl(e) {
  const t = p2();
  let n = e.length * 3 / 4;
  e[e.length - 2] == "=" ? n -= 2 : e[e.length - 1] == "=" && (n -= 1);
  let r = new Uint8Array(n), a = 0, o = 0, s, i = 0;
  for (let u = 0; u < e.length; u++) {
    if (s = t[e.charCodeAt(u)], s === void 0)
      switch (e[u]) {
        // @ts-ignore TS7029: Fallthrough case in switch -- ignore instead of expect-error for compiler settings without noFallthroughCasesInSwitch: true
        case "=":
          o = 0;
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
    switch (o) {
      case 0:
        i = s, o = 1;
        break;
      case 1:
        r[a++] = i << 2 | (s & 48) >> 4, i = s, o = 2;
        break;
      case 2:
        r[a++] = (i & 15) << 4 | (s & 60) >> 2, i = s, o = 3;
        break;
      case 3:
        r[a++] = (i & 3) << 6 | s, o = 0;
        break;
    }
  }
  if (o == 1)
    throw Error("invalid base64 string");
  return r.subarray(0, a);
}
function Qy(e, t = "std") {
  const n = eE(t), r = t == "std";
  let a = "", o = 0, s, i = 0;
  for (let u = 0; u < e.length; u++)
    switch (s = e[u], o) {
      case 0:
        a += n[s >> 2], i = (s & 3) << 4, o = 1;
        break;
      case 1:
        a += n[i | s >> 4], i = (s & 15) << 2, o = 2;
        break;
      case 2:
        a += n[i | s >> 6], a += n[s & 63], o = 0;
        break;
    }
  return o && (a += n[i], r && (a += "=", o == 1 && (a += "="))), a;
}
let Ya, bd, kn;
function eE(e) {
  return Ya || (Ya = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""), bd = Ya.slice(0, -2).concat("-", "_")), e == "url" ? (
    // biome-ignore lint/style/noNonNullAssertion: TS fails to narrow down
    bd
  ) : Ya;
}
function p2() {
  if (!kn) {
    kn = [];
    const e = eE("std");
    for (let t = 0; t < e.length; t++)
      kn[e[t].charCodeAt(0)] = t;
    kn[45] = e.indexOf("+"), kn[95] = e.indexOf("/");
  }
  return kn;
}
function Br(e) {
  let t = !1;
  const n = [];
  for (let r = 0; r < e.length; r++) {
    let a = e.charAt(r);
    switch (a) {
      case "_":
        t = !0;
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
        n.push(a), t = !1;
        break;
      default:
        t && (t = !1, a = a.toUpperCase()), n.push(a);
        break;
    }
  }
  return n.join("");
}
const b2 = /* @__PURE__ */ new Set([
  // names reserved by JavaScript
  "constructor",
  "toString",
  "toJSON",
  "valueOf"
]);
function Gr(e) {
  return b2.has(e) ? e + "$" : e;
}
function kl(e) {
  for (const t of e.field)
    Mr(t, "jsonName") || (t.jsonName = Br(t.name));
  e.nestedType.forEach(kl);
}
function g2(e, t) {
  const n = e.values.find((r) => r.name === t);
  if (!n)
    throw new Error(`cannot parse ${e} default value: ${t}`);
  return n.number;
}
function h2(e, t) {
  switch (e) {
    case h.STRING:
      return t;
    case h.BYTES: {
      const n = y2(t);
      if (n === !1)
        throw new Error(`cannot parse ${h[e]} default value: ${t}`);
      return n;
    }
    case h.INT64:
    case h.SFIXED64:
    case h.SINT64:
      return A.parse(t);
    case h.UINT64:
    case h.FIXED64:
      return A.uParse(t);
    case h.DOUBLE:
    case h.FLOAT:
      switch (t) {
        case "inf":
          return Number.POSITIVE_INFINITY;
        case "-inf":
          return Number.NEGATIVE_INFINITY;
        case "nan":
          return Number.NaN;
        default:
          return parseFloat(t);
      }
    case h.BOOL:
      return t === "true";
    case h.INT32:
    case h.UINT32:
    case h.SINT32:
    case h.FIXED32:
    case h.SFIXED32:
      return parseInt(t, 10);
  }
}
function y2(e) {
  const t = [], n = {
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
  for (; n.next(); )
    switch (n.c) {
      case "\\":
        if (n.next())
          switch (n.c) {
            case "\\":
              t.push(n.c.charCodeAt(0));
              break;
            case "b":
              t.push(8);
              break;
            case "f":
              t.push(12);
              break;
            case "n":
              t.push(10);
              break;
            case "r":
              t.push(13);
              break;
            case "t":
              t.push(9);
              break;
            case "v":
              t.push(11);
              break;
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7": {
              const r = n.c, a = n.take(2);
              if (a === !1)
                return !1;
              const o = parseInt(r + a, 8);
              if (Number.isNaN(o))
                return !1;
              t.push(o);
              break;
            }
            case "x": {
              const r = n.c, a = n.take(2);
              if (a === !1)
                return !1;
              const o = parseInt(r + a, 16);
              if (Number.isNaN(o))
                return !1;
              t.push(o);
              break;
            }
            case "u": {
              const r = n.c, a = n.take(4);
              if (a === !1)
                return !1;
              const o = parseInt(r + a, 16);
              if (Number.isNaN(o))
                return !1;
              const s = new Uint8Array(4);
              new DataView(s.buffer).setInt32(0, o, !0), t.push(s[0], s[1], s[2], s[3]);
              break;
            }
            case "U": {
              const r = n.c, a = n.take(8);
              if (a === !1)
                return !1;
              const o = A.uEnc(r + a), s = new Uint8Array(8), i = new DataView(s.buffer);
              i.setInt32(0, o.lo, !0), i.setInt32(4, o.hi, !0), t.push(s[0], s[1], s[2], s[3], s[4], s[5], s[6], s[7]);
              break;
            }
          }
        break;
      default:
        t.push(n.c.charCodeAt(0));
    }
  return new Uint8Array(t);
}
function* Ai(e) {
  switch (e.kind) {
    case "file":
      for (const t of e.messages)
        yield t, yield* Ai(t);
      yield* e.enums, yield* e.services, yield* e.extensions;
      break;
    case "message":
      for (const t of e.nestedMessages)
        yield t, yield* Ai(t);
      yield* e.nestedEnums, yield* e.nestedExtensions;
      break;
  }
}
function tE(...e) {
  const t = E2();
  if (!e.length)
    return t;
  if ("$typeName" in e[0] && e[0].$typeName == "google.protobuf.FileDescriptorSet") {
    for (const n of e[0].file)
      Nd(n, t);
    return t;
  }
  if ("$typeName" in e[0]) {
    let n = function(s) {
      const i = [];
      for (const u of s.dependency) {
        if (t.getFile(u) != null || o.has(u))
          continue;
        const l = a(u);
        if (!l)
          throw new Error(`Unable to resolve ${u}, imported by ${s.name}`);
        "kind" in l ? t.addFile(l, !1, !0) : (o.add(l.name), i.push(l));
      }
      return i.concat(...i.map(n));
    };
    const r = e[0], a = e[1], o = /* @__PURE__ */ new Set();
    for (const s of [r, ...n(r)].reverse())
      Nd(s, t);
  } else
    for (const n of e)
      for (const r of n.files)
        t.addFile(r);
  return t;
}
function E2() {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
  return {
    kind: "registry",
    types: e,
    extendees: t,
    [Symbol.iterator]() {
      return e.values();
    },
    get files() {
      return n.values();
    },
    addFile(r, a, o) {
      if (n.set(r.proto.name, r), !a)
        for (const s of Ai(r))
          this.add(s);
      if (o)
        for (const s of r.dependencies)
          this.addFile(s, a, o);
    },
    add(r) {
      if (r.kind == "extension") {
        let a = t.get(r.extendee.typeName);
        a || t.set(
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
      return n.get(r);
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
      var o;
      return (o = t.get(r.typeName)) === null || o === void 0 ? void 0 : o.get(a);
    },
    getService(r) {
      const a = e.get(r);
      return a?.kind == "service" ? a : void 0;
    }
  };
}
const N2 = 998, v2 = 999, I2 = 9, Kr = 10, fr = 11, T2 = 12, gd = 14, Dl = 3, w2 = 2, hd = 1, _2 = 0, yd = 1, Ed = 2, O2 = 3, S2 = 1, k2 = 2, D2 = 1, nE = {
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
function Nd(e, t) {
  var n, r;
  const a = {
    kind: "file",
    proto: e,
    deprecated: (r = (n = e.options) === null || n === void 0 ? void 0 : n.deprecated) !== null && r !== void 0 ? r : !1,
    edition: F2(e),
    name: e.name.replace(/\.proto$/, ""),
    dependencies: R2(e, t),
    enums: [],
    messages: [],
    extensions: [],
    services: [],
    toString() {
      return `file ${e.name}`;
    }
  }, o = /* @__PURE__ */ new Map(), s = {
    get(i) {
      return o.get(i);
    },
    add(i) {
      var u;
      He(((u = i.proto.options) === null || u === void 0 ? void 0 : u.mapEntry) === !0), o.set(i.typeName, i);
    }
  };
  for (const i of e.enumType)
    rE(i, a, void 0, t);
  for (const i of e.messageType)
    aE(i, a, void 0, t, s);
  for (const i of e.service)
    A2(i, a, t);
  Li(a, t);
  for (const i of o.values())
    Ui(i, t, s);
  for (const i of a.messages)
    Ui(i, t, s), Li(i, t);
  t.addFile(a, !0);
}
function Li(e, t) {
  switch (e.kind) {
    case "file":
      for (const n of e.proto.extension) {
        const r = Fi(n, e, t);
        e.extensions.push(r), t.add(r);
      }
      break;
    case "message":
      for (const n of e.proto.extension) {
        const r = Fi(n, e, t);
        e.nestedExtensions.push(r), t.add(r);
      }
      for (const n of e.nestedMessages)
        Li(n, t);
      break;
  }
}
function Ui(e, t, n) {
  const r = e.proto.oneofDecl.map((o) => U2(o, e)), a = /* @__PURE__ */ new Set();
  for (const o of e.proto.field) {
    const s = x2(o, r), i = Fi(o, e, t, s, n);
    e.fields.push(i), e.field[i.localName] = i, s === void 0 ? e.members.push(i) : (s.fields.push(i), a.has(s) || (a.add(s), e.members.push(s)));
  }
  for (const o of r.filter((s) => a.has(s)))
    e.oneofs.push(o);
  for (const o of e.nestedMessages)
    Ui(o, t, n);
}
function rE(e, t, n, r) {
  var a, o, s, i, u;
  const l = $2(e.name, e.value), c = {
    kind: "enum",
    proto: e,
    deprecated: (o = (a = e.options) === null || a === void 0 ? void 0 : a.deprecated) !== null && o !== void 0 ? o : !1,
    file: t,
    parent: n,
    open: !0,
    name: e.name,
    typeName: os(e, n, t),
    value: {},
    values: [],
    sharedPrefix: l,
    toString() {
      return `enum ${this.typeName}`;
    }
  };
  c.open = B2(c), r.add(c);
  for (const m of e.value) {
    const d = m.name;
    c.values.push(
      // biome-ignore lint/suspicious/noAssignInExpressions: no
      c.value[m.number] = {
        kind: "enum_value",
        proto: m,
        deprecated: (i = (s = m.options) === null || s === void 0 ? void 0 : s.deprecated) !== null && i !== void 0 ? i : !1,
        parent: c,
        name: d,
        localName: Gr(l == null ? d : d.substring(l.length)),
        number: m.number,
        toString() {
          return `enum value ${c.typeName}.${d}`;
        }
      }
    );
  }
  ((u = n?.nestedEnums) !== null && u !== void 0 ? u : t.enums).push(c);
}
function aE(e, t, n, r, a) {
  var o, s, i, u;
  const l = {
    kind: "message",
    proto: e,
    deprecated: (s = (o = e.options) === null || o === void 0 ? void 0 : o.deprecated) !== null && s !== void 0 ? s : !1,
    file: t,
    parent: n,
    name: e.name,
    typeName: os(e, n, t),
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
  ((i = e.options) === null || i === void 0 ? void 0 : i.mapEntry) === !0 ? a.add(l) : (((u = n?.nestedMessages) !== null && u !== void 0 ? u : t.messages).push(l), r.add(l));
  for (const c of e.enumType)
    rE(c, t, l, r);
  for (const c of e.nestedType)
    aE(c, t, l, r, a);
}
function A2(e, t, n) {
  var r, a;
  const o = {
    kind: "service",
    proto: e,
    deprecated: (a = (r = e.options) === null || r === void 0 ? void 0 : r.deprecated) !== null && a !== void 0 ? a : !1,
    file: t,
    name: e.name,
    typeName: os(e, void 0, t),
    methods: [],
    method: {},
    toString() {
      return `service ${this.typeName}`;
    }
  };
  t.services.push(o), n.add(o);
  for (const s of e.method) {
    const i = L2(s, o, n);
    o.methods.push(i), o.method[i.localName] = i;
  }
}
function L2(e, t, n) {
  var r, a, o, s;
  let i;
  e.clientStreaming && e.serverStreaming ? i = "bidi_streaming" : e.clientStreaming ? i = "client_streaming" : e.serverStreaming ? i = "server_streaming" : i = "unary";
  const u = n.getMessage(wt(e.inputType)), l = n.getMessage(wt(e.outputType));
  He(u, `invalid MethodDescriptorProto: input_type ${e.inputType} not found`), He(l, `invalid MethodDescriptorProto: output_type ${e.inputType} not found`);
  const c = e.name;
  return {
    kind: "rpc",
    proto: e,
    deprecated: (a = (r = e.options) === null || r === void 0 ? void 0 : r.deprecated) !== null && a !== void 0 ? a : !1,
    parent: t,
    name: c,
    localName: Gr(c.length ? Gr(c[0].toLowerCase() + c.substring(1)) : c),
    methodKind: i,
    input: u,
    output: l,
    idempotency: (s = (o = e.options) === null || o === void 0 ? void 0 : o.idempotencyLevel) !== null && s !== void 0 ? s : _2,
    toString() {
      return `rpc ${t.typeName}.${c}`;
    }
  };
}
function U2(e, t) {
  return {
    kind: "oneof",
    proto: e,
    deprecated: !1,
    parent: t,
    fields: [],
    name: e.name,
    localName: Gr(Br(e.name)),
    toString() {
      return `oneof ${t.typeName}.${this.name}`;
    }
  };
}
function Fi(e, t, n, r, a) {
  var o, s, i;
  const u = a === void 0, l = {
    kind: "field",
    proto: e,
    deprecated: (s = (o = e.options) === null || o === void 0 ? void 0 : o.deprecated) !== null && s !== void 0 ? s : !1,
    name: e.name,
    number: e.number,
    scalar: void 0,
    message: void 0,
    enum: void 0,
    presence: V2(e, r, u, t),
    listKind: void 0,
    mapKind: void 0,
    mapKey: void 0,
    delimitedEncoding: void 0,
    packed: void 0,
    longAsString: !1,
    getDefaultValue: void 0
  };
  if (u) {
    const f = t.kind == "file" ? t : t.file, y = t.kind == "file" ? void 0 : t, E = os(e, y, f);
    l.kind = "extension", l.file = f, l.parent = y, l.oneof = void 0, l.typeName = E, l.jsonName = `[${E}]`, l.toString = () => `extension ${E}`;
    const N = n.getMessage(wt(e.extendee));
    He(N, `invalid FieldDescriptorProto: extendee ${e.extendee} not found`), l.extendee = N;
  } else {
    const f = t;
    He(f.kind == "message"), l.parent = f, l.oneof = r, l.localName = r ? Br(e.name) : Gr(Br(e.name)), l.jsonName = e.jsonName, l.toString = () => `field ${f.typeName}.${e.name}`;
  }
  const c = e.label, m = e.type, d = (i = e.options) === null || i === void 0 ? void 0 : i.jstype;
  if (c === Dl) {
    const f = m == fr ? a?.get(wt(e.typeName)) : void 0;
    if (f) {
      l.fieldKind = "map";
      const { key: y, value: E } = M2(f);
      return l.mapKey = y.scalar, l.mapKind = E.fieldKind, l.message = E.message, l.delimitedEncoding = !1, l.enum = E.enum, l.scalar = E.scalar, l;
    }
    switch (l.fieldKind = "list", m) {
      case fr:
      case Kr:
        l.listKind = "message", l.message = n.getMessage(wt(e.typeName)), He(l.message), l.delimitedEncoding = vd(e, t);
        break;
      case gd:
        l.listKind = "enum", l.enum = n.getEnum(wt(e.typeName)), He(l.enum);
        break;
      default:
        l.listKind = "scalar", l.scalar = m, l.longAsString = d == hd;
        break;
    }
    return l.packed = Y2(e, t), l;
  }
  switch (m) {
    case fr:
    case Kr:
      l.fieldKind = "message", l.message = n.getMessage(wt(e.typeName)), He(l.message, `invalid FieldDescriptorProto: type_name ${e.typeName} not found`), l.delimitedEncoding = vd(e, t), l.getDefaultValue = () => {
      };
      break;
    case gd: {
      const f = n.getEnum(wt(e.typeName));
      He(f !== void 0, `invalid FieldDescriptorProto: type_name ${e.typeName} not found`), l.fieldKind = "enum", l.enum = n.getEnum(wt(e.typeName)), l.getDefaultValue = () => Mr(e, "defaultValue") ? g2(f, e.defaultValue) : void 0;
      break;
    }
    default: {
      l.fieldKind = "scalar", l.scalar = m, l.longAsString = d == hd, l.getDefaultValue = () => Mr(e, "defaultValue") ? h2(m, e.defaultValue) : void 0;
      break;
    }
  }
  return l;
}
function F2(e) {
  switch (e.syntax) {
    case "":
    case "proto2":
      return N2;
    case "proto3":
      return v2;
    case "editions":
      if (e.edition in nE)
        return e.edition;
      throw new Error(`${e.name}: unsupported edition`);
    default:
      throw new Error(`${e.name}: unsupported syntax "${e.syntax}"`);
  }
}
function R2(e, t) {
  return e.dependency.map((n) => {
    const r = t.getFile(n);
    if (!r)
      throw new Error(`Cannot find ${n}, imported by ${e.name}`);
    return r;
  });
}
function $2(e, t) {
  const n = P2(e) + "_";
  for (const r of t) {
    if (!r.name.toLowerCase().startsWith(n))
      return;
    const a = r.name.substring(n.length);
    if (a.length == 0 || /^\d/.test(a))
      return;
  }
  return n;
}
function P2(e) {
  return (e.substring(0, 1) + e.substring(1).replace(/[A-Z]/g, (t) => "_" + t)).toLowerCase();
}
function os(e, t, n) {
  let r;
  return t ? r = `${t.typeName}.${e.name}` : n.proto.package.length > 0 ? r = `${n.proto.package}.${e.name}` : r = `${e.name}`, r;
}
function wt(e) {
  return e.startsWith(".") ? e.substring(1) : e;
}
function x2(e, t) {
  if (!Mr(e, "oneofIndex") || e.proto3Optional)
    return;
  const n = t[e.oneofIndex];
  return He(n, `invalid FieldDescriptorProto: oneof #${e.oneofIndex} for field #${e.number} not found`), n;
}
function V2(e, t, n, r) {
  if (e.label == w2)
    return O2;
  if (e.label == Dl)
    return Ed;
  if (t || e.proto3Optional || n)
    return yd;
  const a = Hn("fieldPresence", { proto: e, parent: r });
  return a == Ed && (e.type == fr || e.type == Kr) ? yd : a;
}
function Y2(e, t) {
  if (e.label != Dl)
    return !1;
  switch (e.type) {
    case I2:
    case T2:
    case Kr:
    case fr:
      return !1;
  }
  const n = e.options;
  return n && Mr(n, "packed") ? n.packed : S2 == Hn("repeatedFieldEncoding", {
    proto: e,
    parent: t
  });
}
function M2(e) {
  const t = e.fields.find((r) => r.number === 1), n = e.fields.find((r) => r.number === 2);
  return He(t && t.fieldKind == "scalar" && t.scalar != h.BYTES && t.scalar != h.FLOAT && t.scalar != h.DOUBLE && n && n.fieldKind != "list" && n.fieldKind != "map"), { key: t, value: n };
}
function B2(e) {
  var t;
  return D2 == Hn("enumType", {
    proto: e.proto,
    parent: (t = e.parent) !== null && t !== void 0 ? t : e.file
  });
}
function vd(e, t) {
  return e.type == Kr ? !0 : k2 == Hn("messageEncoding", {
    proto: e,
    parent: t
  });
}
function Hn(e, t) {
  var n, r;
  const a = (n = t.proto.options) === null || n === void 0 ? void 0 : n.features;
  if (a) {
    const o = a[e];
    if (o != 0)
      return o;
  }
  if ("kind" in t) {
    if (t.kind == "message")
      return Hn(e, (r = t.parent) !== null && r !== void 0 ? r : t.file);
    const o = nE[t.edition];
    if (!o)
      throw new Error(`feature default for edition ${t.edition} not found`);
    return o[e];
  }
  return Hn(e, t.parent);
}
function He(e, t) {
  if (!e)
    throw new Error(t);
}
function G2(e) {
  const t = K2(e);
  return t.messageType.forEach(kl), tE(t, () => {
  }).getFile(t.name);
}
function K2(e) {
  return Object.assign(/* @__PURE__ */ Object.create({
    syntax: "",
    edition: 0
  }), Object.assign(Object.assign({ $typeName: "google.protobuf.FileDescriptorProto", dependency: [], publicDependency: [], weakDependency: [], optionDependency: [], service: [], extension: [] }, e), { messageType: e.messageType.map(oE), enumType: e.enumType.map(sE) }));
}
function oE(e) {
  var t, n, r, a, o, s, i, u;
  return Object.assign(/* @__PURE__ */ Object.create({
    visibility: 0
  }), {
    $typeName: "google.protobuf.DescriptorProto",
    name: e.name,
    field: (n = (t = e.field) === null || t === void 0 ? void 0 : t.map(C2)) !== null && n !== void 0 ? n : [],
    extension: [],
    nestedType: (a = (r = e.nestedType) === null || r === void 0 ? void 0 : r.map(oE)) !== null && a !== void 0 ? a : [],
    enumType: (s = (o = e.enumType) === null || o === void 0 ? void 0 : o.map(sE)) !== null && s !== void 0 ? s : [],
    extensionRange: (u = (i = e.extensionRange) === null || i === void 0 ? void 0 : i.map((l) => Object.assign({ $typeName: "google.protobuf.DescriptorProto.ExtensionRange" }, l))) !== null && u !== void 0 ? u : [],
    oneofDecl: [],
    reservedRange: [],
    reservedName: []
  });
}
function C2(e) {
  return Object.assign(/* @__PURE__ */ Object.create({
    label: 1,
    typeName: "",
    extendee: "",
    defaultValue: "",
    oneofIndex: 0,
    jsonName: "",
    proto3Optional: !1
  }), Object.assign(Object.assign({ $typeName: "google.protobuf.FieldDescriptorProto" }, e), { options: e.options ? j2(e.options) : void 0 }));
}
function j2(e) {
  var t, n, r;
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
  }), Object.assign(Object.assign({ $typeName: "google.protobuf.FieldOptions" }, e), { targets: (t = e.targets) !== null && t !== void 0 ? t : [], editionDefaults: (r = (n = e.editionDefaults) === null || n === void 0 ? void 0 : n.map((a) => Object.assign({ $typeName: "google.protobuf.FieldOptions.EditionDefault" }, a))) !== null && r !== void 0 ? r : [], uninterpretedOption: [] }));
}
function sE(e) {
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
function ha(e, t, ...n) {
  return n.reduce((r, a) => r.nestedMessages[a], e.messages[t]);
}
const X2 = /* @__PURE__ */ G2({ name: "google/protobuf/descriptor.proto", package: "google.protobuf", messageType: [{ name: "FileDescriptorSet", field: [{ name: "file", number: 1, type: 11, label: 3, typeName: ".google.protobuf.FileDescriptorProto" }], extensionRange: [{ start: 536e6, end: 536000001 }] }, { name: "FileDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "package", number: 2, type: 9, label: 1 }, { name: "dependency", number: 3, type: 9, label: 3 }, { name: "public_dependency", number: 10, type: 5, label: 3 }, { name: "weak_dependency", number: 11, type: 5, label: 3 }, { name: "option_dependency", number: 15, type: 9, label: 3 }, { name: "message_type", number: 4, type: 11, label: 3, typeName: ".google.protobuf.DescriptorProto" }, { name: "enum_type", number: 5, type: 11, label: 3, typeName: ".google.protobuf.EnumDescriptorProto" }, { name: "service", number: 6, type: 11, label: 3, typeName: ".google.protobuf.ServiceDescriptorProto" }, { name: "extension", number: 7, type: 11, label: 3, typeName: ".google.protobuf.FieldDescriptorProto" }, { name: "options", number: 8, type: 11, label: 1, typeName: ".google.protobuf.FileOptions" }, { name: "source_code_info", number: 9, type: 11, label: 1, typeName: ".google.protobuf.SourceCodeInfo" }, { name: "syntax", number: 12, type: 9, label: 1 }, { name: "edition", number: 14, type: 14, label: 1, typeName: ".google.protobuf.Edition" }] }, { name: "DescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "field", number: 2, type: 11, label: 3, typeName: ".google.protobuf.FieldDescriptorProto" }, { name: "extension", number: 6, type: 11, label: 3, typeName: ".google.protobuf.FieldDescriptorProto" }, { name: "nested_type", number: 3, type: 11, label: 3, typeName: ".google.protobuf.DescriptorProto" }, { name: "enum_type", number: 4, type: 11, label: 3, typeName: ".google.protobuf.EnumDescriptorProto" }, { name: "extension_range", number: 5, type: 11, label: 3, typeName: ".google.protobuf.DescriptorProto.ExtensionRange" }, { name: "oneof_decl", number: 8, type: 11, label: 3, typeName: ".google.protobuf.OneofDescriptorProto" }, { name: "options", number: 7, type: 11, label: 1, typeName: ".google.protobuf.MessageOptions" }, { name: "reserved_range", number: 9, type: 11, label: 3, typeName: ".google.protobuf.DescriptorProto.ReservedRange" }, { name: "reserved_name", number: 10, type: 9, label: 3 }, { name: "visibility", number: 11, type: 14, label: 1, typeName: ".google.protobuf.SymbolVisibility" }], nestedType: [{ name: "ExtensionRange", field: [{ name: "start", number: 1, type: 5, label: 1 }, { name: "end", number: 2, type: 5, label: 1 }, { name: "options", number: 3, type: 11, label: 1, typeName: ".google.protobuf.ExtensionRangeOptions" }] }, { name: "ReservedRange", field: [{ name: "start", number: 1, type: 5, label: 1 }, { name: "end", number: 2, type: 5, label: 1 }] }] }, { name: "ExtensionRangeOptions", field: [{ name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }, { name: "declaration", number: 2, type: 11, label: 3, typeName: ".google.protobuf.ExtensionRangeOptions.Declaration", options: { retention: 2 } }, { name: "features", number: 50, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "verification", number: 3, type: 14, label: 1, typeName: ".google.protobuf.ExtensionRangeOptions.VerificationState", defaultValue: "UNVERIFIED", options: { retention: 2 } }], nestedType: [{ name: "Declaration", field: [{ name: "number", number: 1, type: 5, label: 1 }, { name: "full_name", number: 2, type: 9, label: 1 }, { name: "type", number: 3, type: 9, label: 1 }, { name: "reserved", number: 5, type: 8, label: 1 }, { name: "repeated", number: 6, type: 8, label: 1 }] }], enumType: [{ name: "VerificationState", value: [{ name: "DECLARATION", number: 0 }, { name: "UNVERIFIED", number: 1 }] }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "FieldDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "number", number: 3, type: 5, label: 1 }, { name: "label", number: 4, type: 14, label: 1, typeName: ".google.protobuf.FieldDescriptorProto.Label" }, { name: "type", number: 5, type: 14, label: 1, typeName: ".google.protobuf.FieldDescriptorProto.Type" }, { name: "type_name", number: 6, type: 9, label: 1 }, { name: "extendee", number: 2, type: 9, label: 1 }, { name: "default_value", number: 7, type: 9, label: 1 }, { name: "oneof_index", number: 9, type: 5, label: 1 }, { name: "json_name", number: 10, type: 9, label: 1 }, { name: "options", number: 8, type: 11, label: 1, typeName: ".google.protobuf.FieldOptions" }, { name: "proto3_optional", number: 17, type: 8, label: 1 }], enumType: [{ name: "Type", value: [{ name: "TYPE_DOUBLE", number: 1 }, { name: "TYPE_FLOAT", number: 2 }, { name: "TYPE_INT64", number: 3 }, { name: "TYPE_UINT64", number: 4 }, { name: "TYPE_INT32", number: 5 }, { name: "TYPE_FIXED64", number: 6 }, { name: "TYPE_FIXED32", number: 7 }, { name: "TYPE_BOOL", number: 8 }, { name: "TYPE_STRING", number: 9 }, { name: "TYPE_GROUP", number: 10 }, { name: "TYPE_MESSAGE", number: 11 }, { name: "TYPE_BYTES", number: 12 }, { name: "TYPE_UINT32", number: 13 }, { name: "TYPE_ENUM", number: 14 }, { name: "TYPE_SFIXED32", number: 15 }, { name: "TYPE_SFIXED64", number: 16 }, { name: "TYPE_SINT32", number: 17 }, { name: "TYPE_SINT64", number: 18 }] }, { name: "Label", value: [{ name: "LABEL_OPTIONAL", number: 1 }, { name: "LABEL_REPEATED", number: 3 }, { name: "LABEL_REQUIRED", number: 2 }] }] }, { name: "OneofDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "options", number: 2, type: 11, label: 1, typeName: ".google.protobuf.OneofOptions" }] }, { name: "EnumDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "value", number: 2, type: 11, label: 3, typeName: ".google.protobuf.EnumValueDescriptorProto" }, { name: "options", number: 3, type: 11, label: 1, typeName: ".google.protobuf.EnumOptions" }, { name: "reserved_range", number: 4, type: 11, label: 3, typeName: ".google.protobuf.EnumDescriptorProto.EnumReservedRange" }, { name: "reserved_name", number: 5, type: 9, label: 3 }, { name: "visibility", number: 6, type: 14, label: 1, typeName: ".google.protobuf.SymbolVisibility" }], nestedType: [{ name: "EnumReservedRange", field: [{ name: "start", number: 1, type: 5, label: 1 }, { name: "end", number: 2, type: 5, label: 1 }] }] }, { name: "EnumValueDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "number", number: 2, type: 5, label: 1 }, { name: "options", number: 3, type: 11, label: 1, typeName: ".google.protobuf.EnumValueOptions" }] }, { name: "ServiceDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "method", number: 2, type: 11, label: 3, typeName: ".google.protobuf.MethodDescriptorProto" }, { name: "options", number: 3, type: 11, label: 1, typeName: ".google.protobuf.ServiceOptions" }] }, { name: "MethodDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "input_type", number: 2, type: 9, label: 1 }, { name: "output_type", number: 3, type: 9, label: 1 }, { name: "options", number: 4, type: 11, label: 1, typeName: ".google.protobuf.MethodOptions" }, { name: "client_streaming", number: 5, type: 8, label: 1, defaultValue: "false" }, { name: "server_streaming", number: 6, type: 8, label: 1, defaultValue: "false" }] }, { name: "FileOptions", field: [{ name: "java_package", number: 1, type: 9, label: 1 }, { name: "java_outer_classname", number: 8, type: 9, label: 1 }, { name: "java_multiple_files", number: 10, type: 8, label: 1, defaultValue: "false" }, { name: "java_generate_equals_and_hash", number: 20, type: 8, label: 1, options: { deprecated: !0 } }, { name: "java_string_check_utf8", number: 27, type: 8, label: 1, defaultValue: "false" }, { name: "optimize_for", number: 9, type: 14, label: 1, typeName: ".google.protobuf.FileOptions.OptimizeMode", defaultValue: "SPEED" }, { name: "go_package", number: 11, type: 9, label: 1 }, { name: "cc_generic_services", number: 16, type: 8, label: 1, defaultValue: "false" }, { name: "java_generic_services", number: 17, type: 8, label: 1, defaultValue: "false" }, { name: "py_generic_services", number: 18, type: 8, label: 1, defaultValue: "false" }, { name: "deprecated", number: 23, type: 8, label: 1, defaultValue: "false" }, { name: "cc_enable_arenas", number: 31, type: 8, label: 1, defaultValue: "true" }, { name: "objc_class_prefix", number: 36, type: 9, label: 1 }, { name: "csharp_namespace", number: 37, type: 9, label: 1 }, { name: "swift_prefix", number: 39, type: 9, label: 1 }, { name: "php_class_prefix", number: 40, type: 9, label: 1 }, { name: "php_namespace", number: 41, type: 9, label: 1 }, { name: "php_metadata_namespace", number: 44, type: 9, label: 1 }, { name: "ruby_package", number: 45, type: 9, label: 1 }, { name: "features", number: 50, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], enumType: [{ name: "OptimizeMode", value: [{ name: "SPEED", number: 1 }, { name: "CODE_SIZE", number: 2 }, { name: "LITE_RUNTIME", number: 3 }] }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "MessageOptions", field: [{ name: "message_set_wire_format", number: 1, type: 8, label: 1, defaultValue: "false" }, { name: "no_standard_descriptor_accessor", number: 2, type: 8, label: 1, defaultValue: "false" }, { name: "deprecated", number: 3, type: 8, label: 1, defaultValue: "false" }, { name: "map_entry", number: 7, type: 8, label: 1 }, { name: "deprecated_legacy_json_field_conflicts", number: 11, type: 8, label: 1, options: { deprecated: !0 } }, { name: "features", number: 12, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "FieldOptions", field: [{ name: "ctype", number: 1, type: 14, label: 1, typeName: ".google.protobuf.FieldOptions.CType", defaultValue: "STRING" }, { name: "packed", number: 2, type: 8, label: 1 }, { name: "jstype", number: 6, type: 14, label: 1, typeName: ".google.protobuf.FieldOptions.JSType", defaultValue: "JS_NORMAL" }, { name: "lazy", number: 5, type: 8, label: 1, defaultValue: "false" }, { name: "unverified_lazy", number: 15, type: 8, label: 1, defaultValue: "false" }, { name: "deprecated", number: 3, type: 8, label: 1, defaultValue: "false" }, { name: "weak", number: 10, type: 8, label: 1, defaultValue: "false", options: { deprecated: !0 } }, { name: "debug_redact", number: 16, type: 8, label: 1, defaultValue: "false" }, { name: "retention", number: 17, type: 14, label: 1, typeName: ".google.protobuf.FieldOptions.OptionRetention" }, { name: "targets", number: 19, type: 14, label: 3, typeName: ".google.protobuf.FieldOptions.OptionTargetType" }, { name: "edition_defaults", number: 20, type: 11, label: 3, typeName: ".google.protobuf.FieldOptions.EditionDefault" }, { name: "features", number: 21, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "feature_support", number: 22, type: 11, label: 1, typeName: ".google.protobuf.FieldOptions.FeatureSupport" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], nestedType: [{ name: "EditionDefault", field: [{ name: "edition", number: 3, type: 14, label: 1, typeName: ".google.protobuf.Edition" }, { name: "value", number: 2, type: 9, label: 1 }] }, { name: "FeatureSupport", field: [{ name: "edition_introduced", number: 1, type: 14, label: 1, typeName: ".google.protobuf.Edition" }, { name: "edition_deprecated", number: 2, type: 14, label: 1, typeName: ".google.protobuf.Edition" }, { name: "deprecation_warning", number: 3, type: 9, label: 1 }, { name: "edition_removed", number: 4, type: 14, label: 1, typeName: ".google.protobuf.Edition" }] }], enumType: [{ name: "CType", value: [{ name: "STRING", number: 0 }, { name: "CORD", number: 1 }, { name: "STRING_PIECE", number: 2 }] }, { name: "JSType", value: [{ name: "JS_NORMAL", number: 0 }, { name: "JS_STRING", number: 1 }, { name: "JS_NUMBER", number: 2 }] }, { name: "OptionRetention", value: [{ name: "RETENTION_UNKNOWN", number: 0 }, { name: "RETENTION_RUNTIME", number: 1 }, { name: "RETENTION_SOURCE", number: 2 }] }, { name: "OptionTargetType", value: [{ name: "TARGET_TYPE_UNKNOWN", number: 0 }, { name: "TARGET_TYPE_FILE", number: 1 }, { name: "TARGET_TYPE_EXTENSION_RANGE", number: 2 }, { name: "TARGET_TYPE_MESSAGE", number: 3 }, { name: "TARGET_TYPE_FIELD", number: 4 }, { name: "TARGET_TYPE_ONEOF", number: 5 }, { name: "TARGET_TYPE_ENUM", number: 6 }, { name: "TARGET_TYPE_ENUM_ENTRY", number: 7 }, { name: "TARGET_TYPE_SERVICE", number: 8 }, { name: "TARGET_TYPE_METHOD", number: 9 }] }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "OneofOptions", field: [{ name: "features", number: 1, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "EnumOptions", field: [{ name: "allow_alias", number: 2, type: 8, label: 1 }, { name: "deprecated", number: 3, type: 8, label: 1, defaultValue: "false" }, { name: "deprecated_legacy_json_field_conflicts", number: 6, type: 8, label: 1, options: { deprecated: !0 } }, { name: "features", number: 7, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "EnumValueOptions", field: [{ name: "deprecated", number: 1, type: 8, label: 1, defaultValue: "false" }, { name: "features", number: 2, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "debug_redact", number: 3, type: 8, label: 1, defaultValue: "false" }, { name: "feature_support", number: 4, type: 11, label: 1, typeName: ".google.protobuf.FieldOptions.FeatureSupport" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "ServiceOptions", field: [{ name: "features", number: 34, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "deprecated", number: 33, type: 8, label: 1, defaultValue: "false" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "MethodOptions", field: [{ name: "deprecated", number: 33, type: 8, label: 1, defaultValue: "false" }, { name: "idempotency_level", number: 34, type: 14, label: 1, typeName: ".google.protobuf.MethodOptions.IdempotencyLevel", defaultValue: "IDEMPOTENCY_UNKNOWN" }, { name: "features", number: 35, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], enumType: [{ name: "IdempotencyLevel", value: [{ name: "IDEMPOTENCY_UNKNOWN", number: 0 }, { name: "NO_SIDE_EFFECTS", number: 1 }, { name: "IDEMPOTENT", number: 2 }] }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "UninterpretedOption", field: [{ name: "name", number: 2, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption.NamePart" }, { name: "identifier_value", number: 3, type: 9, label: 1 }, { name: "positive_int_value", number: 4, type: 4, label: 1 }, { name: "negative_int_value", number: 5, type: 3, label: 1 }, { name: "double_value", number: 6, type: 1, label: 1 }, { name: "string_value", number: 7, type: 12, label: 1 }, { name: "aggregate_value", number: 8, type: 9, label: 1 }], nestedType: [{ name: "NamePart", field: [{ name: "name_part", number: 1, type: 9, label: 2 }, { name: "is_extension", number: 2, type: 8, label: 2 }] }] }, { name: "FeatureSet", field: [{ name: "field_presence", number: 1, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.FieldPresence", options: { retention: 1, targets: [4, 1], editionDefaults: [{ value: "EXPLICIT", edition: 900 }, { value: "IMPLICIT", edition: 999 }, { value: "EXPLICIT", edition: 1e3 }] } }, { name: "enum_type", number: 2, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.EnumType", options: { retention: 1, targets: [6, 1], editionDefaults: [{ value: "CLOSED", edition: 900 }, { value: "OPEN", edition: 999 }] } }, { name: "repeated_field_encoding", number: 3, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.RepeatedFieldEncoding", options: { retention: 1, targets: [4, 1], editionDefaults: [{ value: "EXPANDED", edition: 900 }, { value: "PACKED", edition: 999 }] } }, { name: "utf8_validation", number: 4, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.Utf8Validation", options: { retention: 1, targets: [4, 1], editionDefaults: [{ value: "NONE", edition: 900 }, { value: "VERIFY", edition: 999 }] } }, { name: "message_encoding", number: 5, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.MessageEncoding", options: { retention: 1, targets: [4, 1], editionDefaults: [{ value: "LENGTH_PREFIXED", edition: 900 }] } }, { name: "json_format", number: 6, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.JsonFormat", options: { retention: 1, targets: [3, 6, 1], editionDefaults: [{ value: "LEGACY_BEST_EFFORT", edition: 900 }, { value: "ALLOW", edition: 999 }] } }, { name: "enforce_naming_style", number: 7, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.EnforceNamingStyle", options: { retention: 2, targets: [1, 2, 3, 4, 5, 6, 7, 8, 9], editionDefaults: [{ value: "STYLE_LEGACY", edition: 900 }, { value: "STYLE2024", edition: 1001 }] } }, { name: "default_symbol_visibility", number: 8, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.VisibilityFeature.DefaultSymbolVisibility", options: { retention: 2, targets: [1], editionDefaults: [{ value: "EXPORT_ALL", edition: 900 }, { value: "EXPORT_TOP_LEVEL", edition: 1001 }] } }], nestedType: [{ name: "VisibilityFeature", enumType: [{ name: "DefaultSymbolVisibility", value: [{ name: "DEFAULT_SYMBOL_VISIBILITY_UNKNOWN", number: 0 }, { name: "EXPORT_ALL", number: 1 }, { name: "EXPORT_TOP_LEVEL", number: 2 }, { name: "LOCAL_ALL", number: 3 }, { name: "STRICT", number: 4 }] }] }], enumType: [{ name: "FieldPresence", value: [{ name: "FIELD_PRESENCE_UNKNOWN", number: 0 }, { name: "EXPLICIT", number: 1 }, { name: "IMPLICIT", number: 2 }, { name: "LEGACY_REQUIRED", number: 3 }] }, { name: "EnumType", value: [{ name: "ENUM_TYPE_UNKNOWN", number: 0 }, { name: "OPEN", number: 1 }, { name: "CLOSED", number: 2 }] }, { name: "RepeatedFieldEncoding", value: [{ name: "REPEATED_FIELD_ENCODING_UNKNOWN", number: 0 }, { name: "PACKED", number: 1 }, { name: "EXPANDED", number: 2 }] }, { name: "Utf8Validation", value: [{ name: "UTF8_VALIDATION_UNKNOWN", number: 0 }, { name: "VERIFY", number: 2 }, { name: "NONE", number: 3 }] }, { name: "MessageEncoding", value: [{ name: "MESSAGE_ENCODING_UNKNOWN", number: 0 }, { name: "LENGTH_PREFIXED", number: 1 }, { name: "DELIMITED", number: 2 }] }, { name: "JsonFormat", value: [{ name: "JSON_FORMAT_UNKNOWN", number: 0 }, { name: "ALLOW", number: 1 }, { name: "LEGACY_BEST_EFFORT", number: 2 }] }, { name: "EnforceNamingStyle", value: [{ name: "ENFORCE_NAMING_STYLE_UNKNOWN", number: 0 }, { name: "STYLE2024", number: 1 }, { name: "STYLE_LEGACY", number: 2 }] }], extensionRange: [{ start: 1e3, end: 9995 }, { start: 9995, end: 1e4 }, { start: 1e4, end: 10001 }] }, { name: "FeatureSetDefaults", field: [{ name: "defaults", number: 1, type: 11, label: 3, typeName: ".google.protobuf.FeatureSetDefaults.FeatureSetEditionDefault" }, { name: "minimum_edition", number: 4, type: 14, label: 1, typeName: ".google.protobuf.Edition" }, { name: "maximum_edition", number: 5, type: 14, label: 1, typeName: ".google.protobuf.Edition" }], nestedType: [{ name: "FeatureSetEditionDefault", field: [{ name: "edition", number: 3, type: 14, label: 1, typeName: ".google.protobuf.Edition" }, { name: "overridable_features", number: 4, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "fixed_features", number: 5, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }] }] }, { name: "SourceCodeInfo", field: [{ name: "location", number: 1, type: 11, label: 3, typeName: ".google.protobuf.SourceCodeInfo.Location" }], nestedType: [{ name: "Location", field: [{ name: "path", number: 1, type: 5, label: 3, options: { packed: !0 } }, { name: "span", number: 2, type: 5, label: 3, options: { packed: !0 } }, { name: "leading_comments", number: 3, type: 9, label: 1 }, { name: "trailing_comments", number: 4, type: 9, label: 1 }, { name: "leading_detached_comments", number: 6, type: 9, label: 3 }] }], extensionRange: [{ start: 536e6, end: 536000001 }] }, { name: "GeneratedCodeInfo", field: [{ name: "annotation", number: 1, type: 11, label: 3, typeName: ".google.protobuf.GeneratedCodeInfo.Annotation" }], nestedType: [{ name: "Annotation", field: [{ name: "path", number: 1, type: 5, label: 3, options: { packed: !0 } }, { name: "source_file", number: 2, type: 9, label: 1 }, { name: "begin", number: 3, type: 5, label: 1 }, { name: "end", number: 4, type: 5, label: 1 }, { name: "semantic", number: 5, type: 14, label: 1, typeName: ".google.protobuf.GeneratedCodeInfo.Annotation.Semantic" }], enumType: [{ name: "Semantic", value: [{ name: "NONE", number: 0 }, { name: "SET", number: 1 }, { name: "ALIAS", number: 2 }] }] }] }], enumType: [{ name: "Edition", value: [{ name: "EDITION_UNKNOWN", number: 0 }, { name: "EDITION_LEGACY", number: 900 }, { name: "EDITION_PROTO2", number: 998 }, { name: "EDITION_PROTO3", number: 999 }, { name: "EDITION_2023", number: 1e3 }, { name: "EDITION_2024", number: 1001 }, { name: "EDITION_UNSTABLE", number: 9999 }, { name: "EDITION_1_TEST_ONLY", number: 1 }, { name: "EDITION_2_TEST_ONLY", number: 2 }, { name: "EDITION_99997_TEST_ONLY", number: 99997 }, { name: "EDITION_99998_TEST_ONLY", number: 99998 }, { name: "EDITION_99999_TEST_ONLY", number: 99999 }, { name: "EDITION_MAX", number: 2147483647 }] }, { name: "SymbolVisibility", value: [{ name: "VISIBILITY_UNSET", number: 0 }, { name: "VISIBILITY_LOCAL", number: 1 }, { name: "VISIBILITY_EXPORT", number: 2 }] }] }), W2 = /* @__PURE__ */ ha(X2, 1);
var Id;
(function(e) {
  e[e.DECLARATION = 0] = "DECLARATION", e[e.UNVERIFIED = 1] = "UNVERIFIED";
})(Id || (Id = {}));
var Td;
(function(e) {
  e[e.DOUBLE = 1] = "DOUBLE", e[e.FLOAT = 2] = "FLOAT", e[e.INT64 = 3] = "INT64", e[e.UINT64 = 4] = "UINT64", e[e.INT32 = 5] = "INT32", e[e.FIXED64 = 6] = "FIXED64", e[e.FIXED32 = 7] = "FIXED32", e[e.BOOL = 8] = "BOOL", e[e.STRING = 9] = "STRING", e[e.GROUP = 10] = "GROUP", e[e.MESSAGE = 11] = "MESSAGE", e[e.BYTES = 12] = "BYTES", e[e.UINT32 = 13] = "UINT32", e[e.ENUM = 14] = "ENUM", e[e.SFIXED32 = 15] = "SFIXED32", e[e.SFIXED64 = 16] = "SFIXED64", e[e.SINT32 = 17] = "SINT32", e[e.SINT64 = 18] = "SINT64";
})(Td || (Td = {}));
var wd;
(function(e) {
  e[e.OPTIONAL = 1] = "OPTIONAL", e[e.REPEATED = 3] = "REPEATED", e[e.REQUIRED = 2] = "REQUIRED";
})(wd || (wd = {}));
var _d;
(function(e) {
  e[e.SPEED = 1] = "SPEED", e[e.CODE_SIZE = 2] = "CODE_SIZE", e[e.LITE_RUNTIME = 3] = "LITE_RUNTIME";
})(_d || (_d = {}));
var Od;
(function(e) {
  e[e.STRING = 0] = "STRING", e[e.CORD = 1] = "CORD", e[e.STRING_PIECE = 2] = "STRING_PIECE";
})(Od || (Od = {}));
var Sd;
(function(e) {
  e[e.JS_NORMAL = 0] = "JS_NORMAL", e[e.JS_STRING = 1] = "JS_STRING", e[e.JS_NUMBER = 2] = "JS_NUMBER";
})(Sd || (Sd = {}));
var kd;
(function(e) {
  e[e.RETENTION_UNKNOWN = 0] = "RETENTION_UNKNOWN", e[e.RETENTION_RUNTIME = 1] = "RETENTION_RUNTIME", e[e.RETENTION_SOURCE = 2] = "RETENTION_SOURCE";
})(kd || (kd = {}));
var Dd;
(function(e) {
  e[e.TARGET_TYPE_UNKNOWN = 0] = "TARGET_TYPE_UNKNOWN", e[e.TARGET_TYPE_FILE = 1] = "TARGET_TYPE_FILE", e[e.TARGET_TYPE_EXTENSION_RANGE = 2] = "TARGET_TYPE_EXTENSION_RANGE", e[e.TARGET_TYPE_MESSAGE = 3] = "TARGET_TYPE_MESSAGE", e[e.TARGET_TYPE_FIELD = 4] = "TARGET_TYPE_FIELD", e[e.TARGET_TYPE_ONEOF = 5] = "TARGET_TYPE_ONEOF", e[e.TARGET_TYPE_ENUM = 6] = "TARGET_TYPE_ENUM", e[e.TARGET_TYPE_ENUM_ENTRY = 7] = "TARGET_TYPE_ENUM_ENTRY", e[e.TARGET_TYPE_SERVICE = 8] = "TARGET_TYPE_SERVICE", e[e.TARGET_TYPE_METHOD = 9] = "TARGET_TYPE_METHOD";
})(Dd || (Dd = {}));
var Ri;
(function(e) {
  e[e.IDEMPOTENCY_UNKNOWN = 0] = "IDEMPOTENCY_UNKNOWN", e[e.NO_SIDE_EFFECTS = 1] = "NO_SIDE_EFFECTS", e[e.IDEMPOTENT = 2] = "IDEMPOTENT";
})(Ri || (Ri = {}));
var Ad;
(function(e) {
  e[e.DEFAULT_SYMBOL_VISIBILITY_UNKNOWN = 0] = "DEFAULT_SYMBOL_VISIBILITY_UNKNOWN", e[e.EXPORT_ALL = 1] = "EXPORT_ALL", e[e.EXPORT_TOP_LEVEL = 2] = "EXPORT_TOP_LEVEL", e[e.LOCAL_ALL = 3] = "LOCAL_ALL", e[e.STRICT = 4] = "STRICT";
})(Ad || (Ad = {}));
var Ld;
(function(e) {
  e[e.FIELD_PRESENCE_UNKNOWN = 0] = "FIELD_PRESENCE_UNKNOWN", e[e.EXPLICIT = 1] = "EXPLICIT", e[e.IMPLICIT = 2] = "IMPLICIT", e[e.LEGACY_REQUIRED = 3] = "LEGACY_REQUIRED";
})(Ld || (Ld = {}));
var Ud;
(function(e) {
  e[e.ENUM_TYPE_UNKNOWN = 0] = "ENUM_TYPE_UNKNOWN", e[e.OPEN = 1] = "OPEN", e[e.CLOSED = 2] = "CLOSED";
})(Ud || (Ud = {}));
var Fd;
(function(e) {
  e[e.REPEATED_FIELD_ENCODING_UNKNOWN = 0] = "REPEATED_FIELD_ENCODING_UNKNOWN", e[e.PACKED = 1] = "PACKED", e[e.EXPANDED = 2] = "EXPANDED";
})(Fd || (Fd = {}));
var Rd;
(function(e) {
  e[e.UTF8_VALIDATION_UNKNOWN = 0] = "UTF8_VALIDATION_UNKNOWN", e[e.VERIFY = 2] = "VERIFY", e[e.NONE = 3] = "NONE";
})(Rd || (Rd = {}));
var $d;
(function(e) {
  e[e.MESSAGE_ENCODING_UNKNOWN = 0] = "MESSAGE_ENCODING_UNKNOWN", e[e.LENGTH_PREFIXED = 1] = "LENGTH_PREFIXED", e[e.DELIMITED = 2] = "DELIMITED";
})($d || ($d = {}));
var Pd;
(function(e) {
  e[e.JSON_FORMAT_UNKNOWN = 0] = "JSON_FORMAT_UNKNOWN", e[e.ALLOW = 1] = "ALLOW", e[e.LEGACY_BEST_EFFORT = 2] = "LEGACY_BEST_EFFORT";
})(Pd || (Pd = {}));
var xd;
(function(e) {
  e[e.ENFORCE_NAMING_STYLE_UNKNOWN = 0] = "ENFORCE_NAMING_STYLE_UNKNOWN", e[e.STYLE2024 = 1] = "STYLE2024", e[e.STYLE_LEGACY = 2] = "STYLE_LEGACY";
})(xd || (xd = {}));
var Vd;
(function(e) {
  e[e.NONE = 0] = "NONE", e[e.SET = 1] = "SET", e[e.ALIAS = 2] = "ALIAS";
})(Vd || (Vd = {}));
var Yd;
(function(e) {
  e[e.EDITION_UNKNOWN = 0] = "EDITION_UNKNOWN", e[e.EDITION_LEGACY = 900] = "EDITION_LEGACY", e[e.EDITION_PROTO2 = 998] = "EDITION_PROTO2", e[e.EDITION_PROTO3 = 999] = "EDITION_PROTO3", e[e.EDITION_2023 = 1e3] = "EDITION_2023", e[e.EDITION_2024 = 1001] = "EDITION_2024", e[e.EDITION_UNSTABLE = 9999] = "EDITION_UNSTABLE", e[e.EDITION_1_TEST_ONLY = 1] = "EDITION_1_TEST_ONLY", e[e.EDITION_2_TEST_ONLY = 2] = "EDITION_2_TEST_ONLY", e[e.EDITION_99997_TEST_ONLY = 99997] = "EDITION_99997_TEST_ONLY", e[e.EDITION_99998_TEST_ONLY = 99998] = "EDITION_99998_TEST_ONLY", e[e.EDITION_99999_TEST_ONLY = 99999] = "EDITION_99999_TEST_ONLY", e[e.EDITION_MAX = 2147483647] = "EDITION_MAX";
})(Yd || (Yd = {}));
var Md;
(function(e) {
  e[e.VISIBILITY_UNSET = 0] = "VISIBILITY_UNSET", e[e.VISIBILITY_LOCAL = 1] = "VISIBILITY_LOCAL", e[e.VISIBILITY_EXPORT = 2] = "VISIBILITY_EXPORT";
})(Md || (Md = {}));
const Bd = {
  readUnknownFields: !0
};
function J2(e) {
  return e ? Object.assign(Object.assign({}, Bd), e) : Bd;
}
function ss(e, t, n) {
  const r = je(e, void 0, !1);
  return iE(r, new vl(t), J2(n), !1, t.byteLength), r.message;
}
function iE(e, t, n, r, a) {
  var o;
  const s = r ? t.len : t.pos + a;
  let i, u;
  const l = (o = e.getUnknown()) !== null && o !== void 0 ? o : [];
  for (; t.pos < s && ([i, u] = t.tag(), !(r && u == R.EndGroup)); ) {
    const c = e.findNumber(i);
    if (!c) {
      const m = t.skip(u, i);
      n.readUnknownFields && l.push({ no: i, wireType: u, data: m });
      continue;
    }
    uE(e, t, c, u, n);
  }
  if (r && (u != R.EndGroup || i !== a))
    throw new Error("invalid end group tag");
  l.length > 0 && e.setUnknown(l);
}
function uE(e, t, n, r, a) {
  var o;
  switch (n.fieldKind) {
    case "scalar":
      e.set(n, zn(t, n.scalar));
      break;
    case "enum":
      const s = zn(t, h.INT32);
      if (n.enum.open)
        e.set(n, s);
      else if (n.enum.values.some((i) => i.number === s))
        e.set(n, s);
      else if (a.readUnknownFields) {
        const i = [];
        Di(s, i);
        const u = (o = e.getUnknown()) !== null && o !== void 0 ? o : [];
        u.push({
          no: n.number,
          wireType: r,
          data: new Uint8Array(i)
        }), e.setUnknown(u);
      }
      break;
    case "message":
      e.set(n, Al(t, a, n, e.get(n)));
      break;
    case "list":
      H2(t, r, e.get(n), a);
      break;
    case "map":
      Z2(t, e.get(n), a);
      break;
  }
}
function Z2(e, t, n) {
  const r = t.field();
  let a, o;
  const s = e.uint32(), i = e.pos + s;
  for (; e.pos < i; ) {
    const [u] = e.tag();
    switch (u) {
      case 1:
        a = zn(e, r.mapKey);
        break;
      case 2:
        switch (r.mapKind) {
          case "scalar":
            o = zn(e, r.scalar);
            break;
          case "enum":
            o = e.int32();
            break;
          case "message":
            o = Al(e, n, r);
            break;
        }
        break;
    }
  }
  if (a === void 0 && (a = Tn(r.mapKey, !1)), o === void 0)
    switch (r.mapKind) {
      case "scalar":
        o = Tn(r.scalar, !1);
        break;
      case "enum":
        o = r.enum.values[0].number;
        break;
      case "message":
        o = je(r.message, void 0, !1);
        break;
    }
  t.set(a, o);
}
function H2(e, t, n, r) {
  var a;
  const o = n.field();
  if (o.listKind === "message") {
    n.add(Al(e, r, o));
    return;
  }
  const s = (a = o.scalar) !== null && a !== void 0 ? a : h.INT32;
  if (!(t == R.LengthDelimited && s != h.STRING && s != h.BYTES)) {
    n.add(zn(e, s));
    return;
  }
  const i = e.uint32() + e.pos;
  for (; e.pos < i; )
    n.add(zn(e, s));
}
function Al(e, t, n, r) {
  const a = n.delimitedEncoding, o = r ?? je(n.message, void 0, !1);
  return iE(o, e, t, a, a ? n.number : e.uint32()), o;
}
function zn(e, t) {
  switch (t) {
    case h.STRING:
      return e.string();
    case h.BOOL:
      return e.bool();
    case h.DOUBLE:
      return e.double();
    case h.FLOAT:
      return e.float();
    case h.INT32:
      return e.int32();
    case h.INT64:
      return e.int64();
    case h.UINT64:
      return e.uint64();
    case h.FIXED64:
      return e.fixed64();
    case h.BYTES:
      return e.bytes();
    case h.FIXED32:
      return e.fixed32();
    case h.SFIXED32:
      return e.sfixed32();
    case h.SFIXED64:
      return e.sfixed64();
    case h.SINT64:
      return e.sint64();
    case h.UINT32:
      return e.uint32();
    case h.SINT32:
      return e.sint32();
  }
}
function lE(e, t) {
  var n;
  const r = ss(W2, Sl(e));
  return r.messageType.forEach(kl), r.dependency = (n = void 0) !== null && n !== void 0 ? n : [], tE(r, (a) => {
  }).getFile(r.name);
}
const z2 = /* @__PURE__ */ lE("Chlnb29nbGUvcHJvdG9idWYvYW55LnByb3RvEg9nb29nbGUucHJvdG9idWYiJgoDQW55EhAKCHR5cGVfdXJsGAEgASgJEg0KBXZhbHVlGAIgASgMQnYKE2NvbS5nb29nbGUucHJvdG9idWZCCEFueVByb3RvUAFaLGdvb2dsZS5nb2xhbmcub3JnL3Byb3RvYnVmL3R5cGVzL2tub3duL2FueXBiogIDR1BCqgIeR29vZ2xlLlByb3RvYnVmLldlbGxLbm93blR5cGVzYgZwcm90bzM"), q2 = /* @__PURE__ */ ha(z2, 0), Q2 = 3, Gd = {
  writeUnknownFields: !0
};
function e3(e) {
  return e ? Object.assign(Object.assign({}, Gd), e) : Gd;
}
function cE(e, t, n) {
  return Ao(new Ky(), e3(n), je(e, t)).finish();
}
function Ao(e, t, n) {
  var r;
  for (const a of n.sortedFields) {
    if (!n.isSet(a)) {
      if (a.presence == Q2)
        throw new Error(`cannot encode ${a} to binary: required field not set`);
      continue;
    }
    fE(e, t, n, a);
  }
  if (t.writeUnknownFields)
    for (const { no: a, wireType: o, data: s } of (r = n.getUnknown()) !== null && r !== void 0 ? r : [])
      e.tag(a, o).raw(s);
  return e;
}
function fE(e, t, n, r) {
  var a;
  switch (r.fieldKind) {
    case "scalar":
    case "enum":
      Lo(e, n.desc.typeName, r.name, (a = r.scalar) !== null && a !== void 0 ? a : h.INT32, r.number, n.get(r));
      break;
    case "list":
      t3(e, t, r, n.get(r));
      break;
    case "message":
      mE(e, t, r, n.get(r));
      break;
    case "map":
      for (const [o, s] of n.get(r))
        n3(e, t, r, o, s);
      break;
  }
}
function Lo(e, t, n, r, a, o) {
  dE(e.tag(a, r3(r)), t, n, r, o);
}
function mE(e, t, n, r) {
  n.delimitedEncoding ? Ao(e.tag(n.number, R.StartGroup), t, r).tag(n.number, R.EndGroup) : Ao(e.tag(n.number, R.LengthDelimited).fork(), t, r).join();
}
function t3(e, t, n, r) {
  var a;
  if (n.listKind == "message") {
    for (const s of r)
      mE(e, t, n, s);
    return;
  }
  const o = (a = n.scalar) !== null && a !== void 0 ? a : h.INT32;
  if (n.packed) {
    if (!r.size)
      return;
    e.tag(n.number, R.LengthDelimited).fork();
    for (const s of r)
      dE(e, n.parent.typeName, n.name, o, s);
    e.join();
    return;
  }
  for (const s of r)
    Lo(e, n.parent.typeName, n.name, o, n.number, s);
}
function n3(e, t, n, r, a) {
  var o;
  switch (e.tag(n.number, R.LengthDelimited).fork(), Lo(e, n.parent.typeName, n.name, n.mapKey, 1, r), n.mapKind) {
    case "scalar":
    case "enum":
      Lo(e, n.parent.typeName, n.name, (o = n.scalar) !== null && o !== void 0 ? o : h.INT32, 2, a);
      break;
    case "message":
      Ao(e.tag(2, R.LengthDelimited).fork(), t, a).join();
      break;
  }
  e.join();
}
function dE(e, t, n, r, a) {
  try {
    switch (r) {
      case h.STRING:
        e.string(a);
        break;
      case h.BOOL:
        e.bool(a);
        break;
      case h.DOUBLE:
        e.double(a);
        break;
      case h.FLOAT:
        e.float(a);
        break;
      case h.INT32:
        e.int32(a);
        break;
      case h.INT64:
        e.int64(a);
        break;
      case h.UINT64:
        e.uint64(a);
        break;
      case h.FIXED64:
        e.fixed64(a);
        break;
      case h.BYTES:
        e.bytes(a);
        break;
      case h.FIXED32:
        e.fixed32(a);
        break;
      case h.SFIXED32:
        e.sfixed32(a);
        break;
      case h.SFIXED64:
        e.sfixed64(a);
        break;
      case h.SINT64:
        e.sint64(a);
        break;
      case h.UINT32:
        e.uint32(a);
        break;
      case h.SINT32:
        e.sint32(a);
        break;
    }
  } catch (o) {
    throw o instanceof Error ? new Error(`cannot encode field ${t}.${n} to binary: ${o.message}`) : o;
  }
}
function r3(e) {
  switch (e) {
    case h.BYTES:
    case h.STRING:
      return R.LengthDelimited;
    case h.DOUBLE:
    case h.FIXED64:
    case h.SFIXED64:
      return R.Bit64;
    case h.FIXED32:
    case h.SFIXED32:
    case h.FLOAT:
      return R.Bit32;
    default:
      return R.Varint;
  }
}
function a3(e, t, n) {
  let r = !1;
  return n || (n = rt(q2), r = !0), n.value = cE(e, t), n.typeUrl = i3(t.$typeName), r ? n : void 0;
}
function o3(e, t) {
  if (e.typeUrl === "")
    return !1;
  const n = typeof t == "string" ? t : t.typeName, r = pE(e.typeUrl);
  return n === r;
}
function s3(e, t) {
  if (e.typeUrl === "")
    return;
  const n = t.kind == "message" ? t : t.getMessage(pE(e.typeUrl));
  if (!(!n || !o3(e, n)))
    return ss(n, e.value);
}
function i3(e) {
  return `type.googleapis.com/${e}`;
}
function pE(e) {
  const t = e.lastIndexOf("/"), n = t >= 0 ? e.substring(t + 1) : e;
  if (!n.length)
    throw new Error(`invalid type url: ${e}`);
  return n;
}
const Ll = /* @__PURE__ */ lE("Chxnb29nbGUvcHJvdG9idWYvc3RydWN0LnByb3RvEg9nb29nbGUucHJvdG9idWYihAEKBlN0cnVjdBIzCgZmaWVsZHMYASADKAsyIy5nb29nbGUucHJvdG9idWYuU3RydWN0LkZpZWxkc0VudHJ5GkUKC0ZpZWxkc0VudHJ5EgsKA2tleRgBIAEoCRIlCgV2YWx1ZRgCIAEoCzIWLmdvb2dsZS5wcm90b2J1Zi5WYWx1ZToCOAEi6gEKBVZhbHVlEjAKCm51bGxfdmFsdWUYASABKA4yGi5nb29nbGUucHJvdG9idWYuTnVsbFZhbHVlSAASFgoMbnVtYmVyX3ZhbHVlGAIgASgBSAASFgoMc3RyaW5nX3ZhbHVlGAMgASgJSAASFAoKYm9vbF92YWx1ZRgEIAEoCEgAEi8KDHN0cnVjdF92YWx1ZRgFIAEoCzIXLmdvb2dsZS5wcm90b2J1Zi5TdHJ1Y3RIABIwCgpsaXN0X3ZhbHVlGAYgASgLMhouZ29vZ2xlLnByb3RvYnVmLkxpc3RWYWx1ZUgAQgYKBGtpbmQiMwoJTGlzdFZhbHVlEiYKBnZhbHVlcxgBIAMoCzIWLmdvb2dsZS5wcm90b2J1Zi5WYWx1ZSobCglOdWxsVmFsdWUSDgoKTlVMTF9WQUxVRRAAQn8KE2NvbS5nb29nbGUucHJvdG9idWZCC1N0cnVjdFByb3RvUAFaL2dvb2dsZS5nb2xhbmcub3JnL3Byb3RvYnVmL3R5cGVzL2tub3duL3N0cnVjdHBi+AEBogIDR1BCqgIeR29vZ2xlLlByb3RvYnVmLldlbGxLbm93blR5cGVzYgZwcm90bzM"), u3 = /* @__PURE__ */ ha(Ll, 0), bE = /* @__PURE__ */ ha(Ll, 1), l3 = /* @__PURE__ */ ha(Ll, 2);
var $i;
(function(e) {
  e[e.NULL_VALUE = 0] = "NULL_VALUE";
})($i || ($i = {}));
function c3(e, t) {
  gE(t, e);
  const n = m3(e.$unknown, t), [r, a, o] = is(t);
  for (const s of n)
    uE(r, new vl(s.data), a, s.wireType, {
      readUnknownFields: !0
    });
  return o();
}
function f3(e, t, n) {
  var r;
  gE(t, e);
  const a = ((r = e.$unknown) !== null && r !== void 0 ? r : []).filter((l) => l.no !== t.number), [o, s] = is(t, n), i = new Ky();
  fE(i, { writeUnknownFields: !0 }, o, s);
  const u = new vl(i.finish());
  for (; u.pos < u.len; ) {
    const [l, c] = u.tag(), m = u.skip(c, l);
    a.push({ no: l, wireType: c, data: m });
  }
  e.$unknown = a;
}
function m3(e, t) {
  if (e === void 0)
    return [];
  if (t.fieldKind === "enum" || t.fieldKind === "scalar") {
    for (let n = e.length - 1; n >= 0; --n)
      if (e[n].no == t.number)
        return [e[n]];
    return [];
  }
  return e.filter((n) => n.no === t.number);
}
function is(e, t) {
  const n = e.typeName, r = Object.assign(Object.assign({}, e), { kind: "field", parent: e.extendee, localName: n }), a = Object.assign(Object.assign({}, e.extendee), { fields: [r], members: [r], oneofs: [] }), o = rt(a, t !== void 0 ? { [n]: t } : void 0);
  return [
    je(a, o),
    r,
    () => {
      const s = o[n];
      if (s === void 0) {
        const i = e.message;
        return ga(i) ? Tn(i.fields[0].scalar, i.fields[0].longAsString) : rt(i);
      }
      return s;
    }
  ];
}
function gE(e, t) {
  if (e.extendee.typeName != t.$typeName)
    throw new Error(`extension ${e.typeName} can only be applied to message ${e.extendee.typeName}`);
}
const d3 = 3, p3 = 2, Kd = {
  alwaysEmitImplicit: !1,
  enumAsInteger: !1,
  useProtoFieldName: !1
};
function b3(e) {
  return e ? Object.assign(Object.assign({}, Kd), e) : Kd;
}
function g3(e, t, n) {
  return ya(je(e, t), b3(n));
}
function h3(e, t, n) {
  var r;
  const a = g3(e, t, n);
  return JSON.stringify(a, null, (r = n?.prettySpaces) !== null && r !== void 0 ? r : 0);
}
function ya(e, t) {
  var n;
  const r = v3(e, t);
  if (r !== void 0)
    return r;
  const a = {};
  for (const o of e.sortedFields) {
    if (!e.isSet(o)) {
      if (o.presence == d3)
        throw new Error(`cannot encode ${o} to JSON: required field not set`);
      if (!t.alwaysEmitImplicit || o.presence !== p3)
        continue;
    }
    const s = Cd(o, e.get(o), t);
    s !== void 0 && (a[N3(o, t)] = s);
  }
  if (t.registry) {
    const o = /* @__PURE__ */ new Set();
    for (const { no: s } of (n = e.getUnknown()) !== null && n !== void 0 ? n : [])
      if (!o.has(s)) {
        o.add(s);
        const i = t.registry.getExtensionFor(e.desc, s);
        if (!i)
          continue;
        const u = c3(e.message, i), [l, c] = is(i, u), m = Cd(c, l.get(c), t);
        m !== void 0 && (a[i.jsonName] = m);
      }
  }
  return a;
}
function Cd(e, t, n) {
  switch (e.fieldKind) {
    case "scalar":
      return us(e, t);
    case "message":
      return ya(t, n);
    case "enum":
      return Ul(e.enum, t, n.enumAsInteger);
    case "list":
      return E3(t, n);
    case "map":
      return y3(t, n);
  }
}
function y3(e, t) {
  const n = e.field(), r = {};
  switch (n.mapKind) {
    case "scalar":
      for (const [a, o] of e)
        r[a] = us(n, o);
      break;
    case "message":
      for (const [a, o] of e)
        r[a] = ya(o, t);
      break;
    case "enum":
      for (const [a, o] of e)
        r[a] = Ul(n.enum, o, t.enumAsInteger);
      break;
  }
  return t.alwaysEmitImplicit || e.size > 0 ? r : void 0;
}
function E3(e, t) {
  const n = e.field(), r = [];
  switch (n.listKind) {
    case "scalar":
      for (const a of e)
        r.push(us(n, a));
      break;
    case "enum":
      for (const a of e)
        r.push(Ul(n.enum, a, t.enumAsInteger));
      break;
    case "message":
      for (const a of e)
        r.push(ya(a, t));
      break;
  }
  return t.alwaysEmitImplicit || r.length > 0 ? r : void 0;
}
function Ul(e, t, n) {
  var r;
  if (typeof t != "number")
    throw new Error(`cannot encode ${e} to JSON: expected number, got ${J(t)}`);
  return e.typeName == "google.protobuf.NullValue" ? null : n ? t : (r = e.value[t]?.name) !== null && r !== void 0 ? r : t;
}
function us(e, t) {
  var n, r, a, o, s, i;
  switch (e.scalar) {
    // int32, fixed32, uint32: JSON value will be a decimal number. Either numbers or strings are accepted.
    case h.INT32:
    case h.SFIXED32:
    case h.SINT32:
    case h.FIXED32:
    case h.UINT32:
      if (typeof t != "number")
        throw new Error(`cannot encode ${e} to JSON: ${(n = qt(e, t)) === null || n === void 0 ? void 0 : n.message}`);
      return t;
    // float, double: JSON value will be a number or one of the special string values "NaN", "Infinity", and "-Infinity".
    // Either numbers or strings are accepted. Exponent notation is also accepted.
    case h.FLOAT:
    case h.DOUBLE:
      if (typeof t != "number")
        throw new Error(`cannot encode ${e} to JSON: ${(r = qt(e, t)) === null || r === void 0 ? void 0 : r.message}`);
      return Number.isNaN(t) ? "NaN" : t === Number.POSITIVE_INFINITY ? "Infinity" : t === Number.NEGATIVE_INFINITY ? "-Infinity" : t;
    // string:
    case h.STRING:
      if (typeof t != "string")
        throw new Error(`cannot encode ${e} to JSON: ${(a = qt(e, t)) === null || a === void 0 ? void 0 : a.message}`);
      return t;
    // bool:
    case h.BOOL:
      if (typeof t != "boolean")
        throw new Error(`cannot encode ${e} to JSON: ${(o = qt(e, t)) === null || o === void 0 ? void 0 : o.message}`);
      return t;
    // JSON value will be a decimal string. Either numbers or strings are accepted.
    case h.UINT64:
    case h.FIXED64:
    case h.INT64:
    case h.SFIXED64:
    case h.SINT64:
      if (typeof t != "bigint" && typeof t != "string")
        throw new Error(`cannot encode ${e} to JSON: ${(s = qt(e, t)) === null || s === void 0 ? void 0 : s.message}`);
      return t.toString();
    // bytes: JSON value will be the data encoded as a string using standard base64 encoding with paddings.
    // Either standard or URL-safe base64 encoding with/without paddings are accepted.
    case h.BYTES:
      if (t instanceof Uint8Array)
        return Qy(t);
      throw new Error(`cannot encode ${e} to JSON: ${(i = qt(e, t)) === null || i === void 0 ? void 0 : i.message}`);
  }
}
function N3(e, t) {
  return t.useProtoFieldName ? e.name : e.jsonName;
}
function v3(e, t) {
  if (e.desc.typeName.startsWith("google.protobuf."))
    switch (e.desc.typeName) {
      case "google.protobuf.Any":
        return I3(e.message, t);
      case "google.protobuf.Timestamp":
        return _3(e.message);
      case "google.protobuf.Duration":
        return T3(e.message);
      case "google.protobuf.FieldMask":
        return w3(e.message);
      case "google.protobuf.Struct":
        return hE(e.message);
      case "google.protobuf.Value":
        return Fl(e.message);
      case "google.protobuf.ListValue":
        return yE(e.message);
      default:
        if (ga(e.desc)) {
          const n = e.desc.fields[0];
          return us(n, e.get(n));
        }
        return;
    }
}
function I3(e, t) {
  if (e.typeUrl === "")
    return {};
  const { registry: n } = t;
  let r, a;
  if (n && (r = s3(e, n), r && (a = n.getMessage(r.$typeName))), !a || !r)
    throw new Error(`cannot encode message ${e.$typeName} to JSON: "${e.typeUrl}" is not in the type registry`);
  let o = ya(je(a, r), t);
  return (a.typeName.startsWith("google.protobuf.") || o === null || Array.isArray(o) || typeof o != "object") && (o = { value: o }), o["@type"] = e.typeUrl, o;
}
function T3(e) {
  const t = Number(e.seconds), n = e.nanos;
  if (t > 315576e6 || t < -315576e6)
    throw new Error(`cannot encode message ${e.$typeName} to JSON: value out of range`);
  if (t > 0 && n < 0 || t < 0 && n > 0)
    throw new Error(`cannot encode message ${e.$typeName} to JSON: nanos sign must match seconds sign`);
  let r = e.seconds.toString();
  if (n !== 0) {
    let a = Math.abs(n).toString();
    a = "0".repeat(9 - a.length) + a, a.substring(3) === "000000" ? a = a.substring(0, 3) : a.substring(6) === "000" && (a = a.substring(0, 6)), r += "." + a, n < 0 && t == 0 && (r = "-" + r);
  }
  return r + "s";
}
function w3(e) {
  return e.paths.map((t) => {
    if (t.match(/_[0-9]?_/g) || t.match(/[A-Z]/g))
      throw new Error(`cannot encode message ${e.$typeName} to JSON: lowerCamelCase of path name "` + t + '" is irreversible');
    return Br(t);
  }).join(",");
}
function hE(e) {
  const t = {};
  for (const [n, r] of Object.entries(e.fields))
    t[n] = Fl(r);
  return t;
}
function Fl(e) {
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
      return hE(e.kind.value);
    case "listValue":
      return yE(e.kind.value);
    default:
      throw new Error(`${e.$typeName} must have a value`);
  }
}
function yE(e) {
  return e.values.map(Fl);
}
function _3(e) {
  const t = Number(e.seconds) * 1e3;
  if (t < Date.parse("0001-01-01T00:00:00Z") || t > Date.parse("9999-12-31T23:59:59Z"))
    throw new Error(`cannot encode message ${e.$typeName} to JSON: must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive`);
  if (e.nanos < 0)
    throw new Error(`cannot encode message ${e.$typeName} to JSON: nanos must not be negative`);
  if (e.nanos > 999999999)
    throw new Error(`cannot encode message ${e.$typeName} to JSON: nanos must not be greater than 99999999`);
  let n = "Z";
  if (e.nanos > 0) {
    const r = (e.nanos + 1e9).toString().substring(1);
    r.substring(3) === "000000" ? n = "." + r.substring(0, 3) + "Z" : r.substring(6) === "000" ? n = "." + r.substring(0, 6) + "Z" : n = "." + r + "Z";
  }
  return new Date(t).toISOString().replace(".000Z", n);
}
const jd = {
  ignoreUnknownFields: !1
};
function O3(e) {
  return e ? Object.assign(Object.assign({}, jd), e) : jd;
}
function S3(e, t, n) {
  return EE(e, R3(t, e.typeName), n);
}
function EE(e, t, n) {
  const r = je(e);
  try {
    qn(r, t, O3(n));
  } catch (a) {
    throw i2(a) ? new Error(`cannot decode ${a.field()} from JSON: ${a.message}`, {
      cause: a
    }) : a;
  }
  return r.message;
}
function qn(e, t, n) {
  var r;
  if ($3(e, t, n))
    return;
  if (t == null || Array.isArray(t) || typeof t != "object")
    throw new Error(`cannot decode ${e.desc} from JSON: ${J(t)}`);
  const a = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
  for (const s of e.desc.fields)
    o.set(s.name, s).set(s.jsonName, s);
  for (const [s, i] of Object.entries(t)) {
    const u = o.get(s);
    if (u) {
      if (u.oneof) {
        if (i === null && u.fieldKind == "scalar")
          continue;
        const l = a.get(u.oneof);
        if (l !== void 0)
          throw new Ie(u.oneof, `oneof set multiple times by ${l.name} and ${u.name}`);
        a.set(u.oneof, u);
      }
      Xd(e, u, i, n);
    } else {
      let l;
      if (s.startsWith("[") && s.endsWith("]") && // biome-ignore lint/suspicious/noAssignInExpressions: no
      (l = (r = n.registry) === null || r === void 0 ? void 0 : r.getExtension(s.substring(1, s.length - 1))) && l.extendee.typeName === e.desc.typeName) {
        const [c, m, d] = is(l);
        Xd(c, m, i, n), f3(e.message, l, d());
      }
      if (!l && !n.ignoreUnknownFields)
        throw new Error(`cannot decode ${e.desc} from JSON: key "${s}" is unknown`);
    }
  }
}
function Xd(e, t, n, r) {
  switch (t.fieldKind) {
    case "scalar":
      U3(e, t, n);
      break;
    case "enum":
      L3(e, t, n, r);
      break;
    case "message":
      A3(e, t, n, r);
      break;
    case "list":
      D3(e.get(t), n, r);
      break;
    case "map":
      k3(e.get(t), n, r);
      break;
  }
}
function k3(e, t, n) {
  if (t === null)
    return;
  const r = e.field();
  if (typeof t != "object" || Array.isArray(t))
    throw new Ie(r, "expected object, got " + J(t));
  for (const [a, o] of Object.entries(t)) {
    if (o === null && !NE(r))
      throw new Ie(r, "map value must not be null");
    let s;
    switch (r.mapKind) {
      case "message":
        const u = je(r.message);
        qn(u, o, n), s = u;
        break;
      case "enum":
        if (s = Rl(r.enum, o, n.ignoreUnknownFields, !0), s === ls)
          return;
        break;
      case "scalar":
        s = fs(r, o, !0);
        break;
    }
    const i = F3(r.mapKey, a);
    e.set(i, s);
  }
}
function D3(e, t, n) {
  if (t === null)
    return;
  const r = e.field();
  if (!Array.isArray(t))
    throw new Ie(r, "expected Array, got " + J(t));
  for (const a of t) {
    if (a === null && !NE(r))
      throw new Ie(r, "list item must not be null");
    switch (r.listKind) {
      case "message":
        const o = je(r.message);
        qn(o, a, n), e.add(o);
        break;
      case "enum":
        const s = Rl(r.enum, a, n.ignoreUnknownFields, !0);
        s !== ls && e.add(s);
        break;
      case "scalar":
        e.add(fs(r, a, !0));
        break;
    }
  }
}
function NE(e) {
  var t, n;
  return ((t = e.message) === null || t === void 0 ? void 0 : t.typeName) == "google.protobuf.Value" || ((n = e.enum) === null || n === void 0 ? void 0 : n.typeName) == "google.protobuf.NullValue";
}
function A3(e, t, n, r) {
  if (n === null && t.message.typeName != "google.protobuf.Value") {
    e.clear(t);
    return;
  }
  const a = e.isSet(t) ? e.get(t) : je(t.message);
  qn(a, n, r), e.set(t, a);
}
function L3(e, t, n, r) {
  const a = Rl(t.enum, n, r.ignoreUnknownFields, !1);
  a === cs ? e.clear(t) : a !== ls && e.set(t, a);
}
function U3(e, t, n) {
  const r = fs(t, n, !1);
  r === cs ? e.clear(t) : e.set(t, r);
}
const ls = /* @__PURE__ */ Symbol();
function Rl(e, t, n, r) {
  if (t === null)
    return e.typeName == "google.protobuf.NullValue" ? 0 : r ? e.values[0].number : cs;
  switch (typeof t) {
    case "number":
      if (Number.isInteger(t))
        return t;
      break;
    case "string":
      const a = e.values.find((o) => o.name === t);
      if (a !== void 0)
        return a.number;
      if (n)
        return ls;
      break;
  }
  throw new Error(`cannot decode ${e} from JSON: ${J(t)}`);
}
const cs = /* @__PURE__ */ Symbol();
function fs(e, t, n) {
  if (t === null)
    return n ? Tn(e.scalar, !1) : cs;
  switch (e.scalar) {
    // float, double: JSON value will be a number or one of the special string values "NaN", "Infinity", and "-Infinity".
    // Either numbers or strings are accepted. Exponent notation is also accepted.
    case h.DOUBLE:
    case h.FLOAT:
      if (t === "NaN")
        return NaN;
      if (t === "Infinity")
        return Number.POSITIVE_INFINITY;
      if (t === "-Infinity")
        return Number.NEGATIVE_INFINITY;
      if (typeof t == "number") {
        if (Number.isNaN(t))
          throw new Ie(e, "unexpected NaN number");
        if (!Number.isFinite(t))
          throw new Ie(e, "unexpected infinite number");
        break;
      }
      if (typeof t == "string") {
        if (t === "" || t.trim().length !== t.length)
          break;
        const r = Number(t);
        if (!Number.isFinite(r))
          break;
        return r;
      }
      break;
    // int32, fixed32, uint32: JSON value will be a decimal number. Either numbers or strings are accepted.
    case h.INT32:
    case h.FIXED32:
    case h.SFIXED32:
    case h.SINT32:
    case h.UINT32:
      return vE(t);
    // bytes: JSON value will be the data encoded as a string using standard base64 encoding with paddings.
    // Either standard or URL-safe base64 encoding with/without paddings are accepted.
    case h.BYTES:
      if (typeof t == "string") {
        if (t === "")
          return new Uint8Array(0);
        try {
          return Sl(t);
        } catch (r) {
          const a = r instanceof Error ? r.message : String(r);
          throw new Ie(e, a);
        }
      }
      break;
  }
  return t;
}
function F3(e, t) {
  switch (e) {
    case h.BOOL:
      switch (t) {
        case "true":
          return !0;
        case "false":
          return !1;
      }
      return t;
    case h.INT32:
    case h.FIXED32:
    case h.UINT32:
    case h.SFIXED32:
    case h.SINT32:
      return vE(t);
    default:
      return t;
  }
}
function vE(e) {
  if (typeof e == "string") {
    if (e === "" || e.trim().length !== e.length)
      return e;
    const t = Number(e);
    return Number.isNaN(t) ? e : t;
  }
  return e;
}
function R3(e, t) {
  try {
    return JSON.parse(e);
  } catch (n) {
    const r = n instanceof Error ? n.message : String(n);
    throw new Error(
      `cannot decode message ${t} from JSON: ${r}`,
      // @ts-expect-error we use the ES2022 error CTOR option "cause" for better stack traces
      { cause: n }
    );
  }
}
function $3(e, t, n) {
  if (!e.desc.typeName.startsWith("google.protobuf."))
    return !1;
  switch (e.desc.typeName) {
    case "google.protobuf.Any":
      return P3(e.message, t, n), !0;
    case "google.protobuf.Timestamp":
      return x3(e.message, t), !0;
    case "google.protobuf.Duration":
      return V3(e.message, t), !0;
    case "google.protobuf.FieldMask":
      return Y3(e.message, t), !0;
    case "google.protobuf.Struct":
      return IE(e.message, t), !0;
    case "google.protobuf.Value":
      return $l(e.message, t), !0;
    case "google.protobuf.ListValue":
      return TE(e.message, t), !0;
    default:
      if (ga(e.desc)) {
        const r = e.desc.fields[0];
        return t === null ? e.clear(r) : e.set(r, fs(r, t, !0)), !0;
      }
      return !1;
  }
}
function P3(e, t, n) {
  var r;
  if (t === null || Array.isArray(t) || typeof t != "object")
    throw new Error(`cannot decode message ${e.$typeName} from JSON: expected object but got ${J(t)}`);
  if (Object.keys(t).length == 0)
    return;
  const a = t["@type"];
  if (typeof a != "string" || a == "")
    throw new Error(`cannot decode message ${e.$typeName} from JSON: "@type" is empty`);
  const o = a.includes("/") ? a.substring(a.lastIndexOf("/") + 1) : a;
  if (!o.length)
    throw new Error(`cannot decode message ${e.$typeName} from JSON: "@type" is invalid`);
  const s = (r = n.registry) === null || r === void 0 ? void 0 : r.getMessage(o);
  if (!s)
    throw new Error(`cannot decode message ${e.$typeName} from JSON: ${a} is not in the type registry`);
  const i = je(s);
  if (o.startsWith("google.protobuf.") && Object.prototype.hasOwnProperty.call(t, "value")) {
    const u = t.value;
    qn(i, u, n);
  } else {
    const u = Object.assign({}, t);
    delete u["@type"], qn(i, u, n);
  }
  a3(i.desc, i.message, e);
}
function x3(e, t) {
  if (typeof t != "string")
    throw new Error(`cannot decode message ${e.$typeName} from JSON: ${J(t)}`);
  const n = t.match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})(?:\.([0-9]{1,9}))?(?:Z|([+-][0-9][0-9]:[0-9][0-9]))$/);
  if (!n)
    throw new Error(`cannot decode message ${e.$typeName} from JSON: invalid RFC 3339 string`);
  const r = Date.parse(
    // biome-ignore format: want this to read well
    n[1] + "-" + n[2] + "-" + n[3] + "T" + n[4] + ":" + n[5] + ":" + n[6] + (n[8] ? n[8] : "Z")
  );
  if (Number.isNaN(r))
    throw new Error(`cannot decode message ${e.$typeName} from JSON: invalid RFC 3339 string`);
  if (r < Date.parse("0001-01-01T00:00:00Z") || r > Date.parse("9999-12-31T23:59:59Z"))
    throw new Error(`cannot decode message ${e.$typeName} from JSON: must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive`);
  e.seconds = A.parse(r / 1e3), e.nanos = 0, n[7] && (e.nanos = parseInt("1" + n[7] + "0".repeat(9 - n[7].length)) - 1e9);
}
function V3(e, t) {
  if (typeof t != "string")
    throw new Error(`cannot decode message ${e.$typeName} from JSON: ${J(t)}`);
  const n = t.match(/^(-?[0-9]+)(?:\.([0-9]+))?s/);
  if (n === null)
    throw new Error(`cannot decode message ${e.$typeName} from JSON: ${J(t)}`);
  const r = Number(n[1]);
  if (r > 315576e6 || r < -315576e6)
    throw new Error(`cannot decode message ${e.$typeName} from JSON: ${J(t)}`);
  if (e.seconds = A.parse(r), typeof n[2] != "string")
    return;
  const a = n[2] + "0".repeat(9 - n[2].length);
  e.nanos = parseInt(a), (r < 0 || Object.is(r, -0)) && (e.nanos = -e.nanos);
}
function Y3(e, t) {
  if (typeof t != "string")
    throw new Error(`cannot decode message ${e.$typeName} from JSON: ${J(t)}`);
  if (t === "")
    return;
  function n(r) {
    if (r.includes("_"))
      throw new Error(`cannot decode message ${e.$typeName} from JSON: path names must be lowerCamelCase`);
    const a = r.replace(/[A-Z]/g, (o) => "_" + o.toLowerCase());
    return a[0] === "_" ? a.substring(1) : a;
  }
  e.paths = t.split(",").map(n);
}
function IE(e, t) {
  if (typeof t != "object" || t == null || Array.isArray(t))
    throw new Error(`cannot decode message ${e.$typeName} from JSON ${J(t)}`);
  for (const [n, r] of Object.entries(t)) {
    const a = rt(bE);
    $l(a, r), e.fields[n] = a;
  }
}
function $l(e, t) {
  switch (typeof t) {
    case "number":
      e.kind = { case: "numberValue", value: t };
      break;
    case "string":
      e.kind = { case: "stringValue", value: t };
      break;
    case "boolean":
      e.kind = { case: "boolValue", value: t };
      break;
    case "object":
      if (t === null)
        e.kind = { case: "nullValue", value: $i.NULL_VALUE };
      else if (Array.isArray(t)) {
        const n = rt(l3);
        TE(n, t), e.kind = { case: "listValue", value: n };
      } else {
        const n = rt(u3);
        IE(n, t), e.kind = { case: "structValue", value: n };
      }
      break;
    default:
      throw new Error(`cannot decode message ${e.$typeName} from JSON ${J(t)}`);
  }
  return e;
}
function TE(e, t) {
  if (!Array.isArray(t))
    throw new Error(`cannot decode message ${e.$typeName} from JSON ${J(t)}`);
  for (const n of t) {
    const r = rt(bE);
    $l(r, n), e.values.push(r);
  }
}
function Pi(e) {
  const t = O[e];
  return typeof t != "string" ? e.toString() : t[0].toLowerCase() + t.substring(1).replace(/[A-Z]/g, (n) => "_" + n.toLowerCase());
}
let Ma;
function M3(e) {
  if (!Ma) {
    Ma = {};
    for (const t of Object.values(O))
      typeof t != "string" && (Ma[Pi(t)] = t);
  }
  return Ma[e];
}
class K extends Error {
  /**
   * Create a new ConnectError.
   * If no code is provided, code "unknown" is used.
   * Outgoing details are only relevant for the server side - a service may
   * raise an error with details, and it is up to the protocol implementation
   * to encode and send the details along with the error.
   */
  constructor(t, n = O.Unknown, r, a, o) {
    super(B3(t, n)), this.name = "ConnectError", Object.setPrototypeOf(this, new.target.prototype), this.rawMessage = t, this.code = n, this.metadata = new Headers(r ?? {}), this.details = a ?? [], this.cause = o;
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
  static from(t, n = O.Unknown) {
    return t instanceof K ? t : t instanceof Error ? t.name == "AbortError" || t.name == "TimeoutError" ? new K(t.message, O.Canceled) : new K(t.message, n, void 0, void 0, t) : new K(String(t), n, void 0, void 0, t);
  }
  static [Symbol.hasInstance](t) {
    return t instanceof Error ? Object.getPrototypeOf(t) === K.prototype ? !0 : t.name === "ConnectError" && "code" in t && typeof t.code == "number" && "metadata" in t && "details" in t && Array.isArray(t.details) && "rawMessage" in t && typeof t.rawMessage == "string" && "cause" in t : !1;
  }
  findDetails(t) {
    const n = t.kind === "message" ? {
      getMessage: (a) => a === t.typeName ? t : void 0
    } : t, r = [];
    for (const a of this.details) {
      if ("desc" in a) {
        n.getMessage(a.desc.typeName) && r.push(rt(a.desc, a.value));
        continue;
      }
      const o = n.getMessage(a.type);
      if (o)
        try {
          r.push(ss(o, a.value));
        } catch {
        }
    }
    return r;
  }
}
function B3(e, t) {
  return e.length ? `[${Pi(t)}] ${e}` : `[${Pi(t)}]`;
}
function G3(...e) {
  const t = new Headers();
  for (const n of e)
    n.forEach((r, a) => {
      t.append(a, r);
    });
  return t;
}
const Wd = 1;
function K3(e, t, n = !1) {
  if (t > e) {
    let r = `message size is larger than configured readMaxBytes ${e}`;
    throw n && (r = `message size ${t} is larger than configured readMaxBytes ${e}`), new K(r, O.ResourceExhausted);
  }
}
function C3(e) {
  return new j3(e);
}
class j3 {
  constructor(t) {
    this.readMaxBytes = t, this.header = new Uint8Array(5), this.headerView = new DataView(this.header.buffer), this.buf = [];
  }
  get byteLength() {
    return this.buf.reduce((t, n) => t + n.byteLength, 0);
  }
  decode(t) {
    this.buf.push(t);
    const n = [];
    for (; ; ) {
      let r = this.pop();
      if (!r)
        break;
      n.push(r);
    }
    return n;
  }
  // consume an enveloped message
  pop() {
    if (!(!this.env && (this.env = this.head(), !this.env)) && this.cons(this.env.data)) {
      const t = this.env;
      return this.env = void 0, t;
    }
  }
  // consume header
  head() {
    if (!this.cons(this.header))
      return;
    const t = this.headerView.getUint8(0), n = this.headerView.getUint32(1);
    return K3(this.readMaxBytes, n, !0), {
      flags: t,
      data: new Uint8Array(n)
    };
  }
  // consume from buffer, fill target
  cons(t) {
    const n = t.byteLength;
    if (this.byteLength < n)
      return !1;
    let r = 0;
    for (; r < n; ) {
      const a = this.buf.shift();
      a.byteLength > n - r ? (t.set(a.subarray(0, n - r), r), this.buf.unshift(a.subarray(n - r)), r += n - r) : (t.set(a, r), r += a.byteLength);
    }
    return !0;
  }
}
function X3(e) {
  let t;
  const n = C3(4294967295);
  return new ReadableStream({
    start() {
      t = e.getReader();
    },
    async pull(r) {
      let a = !1;
      for (; !a; ) {
        const o = await t.read();
        if (o.done)
          n.byteLength > 0 && r.error(new K("protocol error: incomplete envelope", O.InvalidArgument)), r.close();
        else
          for (const s of n.decode(o.value))
            r.enqueue(s), a = !0;
      }
    }
  });
}
function W3(e, t) {
  const n = new Uint8Array(t.length + 5);
  n.set(t, 5);
  const r = new DataView(n.buffer, n.byteOffset, n.byteLength);
  return r.setUint8(0, e), r.setUint32(1, t.length), n;
}
function J3(...e) {
  const t = new AbortController(), n = e.filter((a) => a !== void 0).concat(t.signal);
  for (const a of n) {
    if (a.aborted) {
      r.apply(a);
      break;
    }
    a.addEventListener("abort", r);
  }
  function r() {
    t.signal.aborted || t.abort(wE(this));
    for (const a of n)
      a.removeEventListener("abort", r);
  }
  return t;
}
function Z3(e) {
  const t = new AbortController(), n = () => {
    t.abort(new K("the operation timed out", O.DeadlineExceeded));
  };
  let r;
  return e !== void 0 && (e <= 0 ? n() : r = setTimeout(n, e)), {
    signal: t.signal,
    cleanup: () => clearTimeout(r)
  };
}
function wE(e) {
  if (!e.aborted)
    return;
  if (e.reason !== void 0)
    return e.reason;
  const t = new Error("This operation was aborted");
  return t.name = "AbortError", t;
}
function Jd() {
  return {
    get(e) {
      return e.id in this ? this[e.id] : e.defaultValue;
    },
    set(e, t) {
      return this[e.id] = t, this;
    },
    delete(e) {
      return delete this[e.id], this;
    }
  };
}
function Zd(e, t) {
  return e.toString().replace(/\/?$/, `/${t.parent.typeName}/${t.name}`);
}
function _E(e, t) {
  return rt(e, t);
}
function H3(e, t) {
  function n(r) {
    return r.done === !0 ? r : {
      done: r.done,
      value: _E(e, r.value)
    };
  }
  return {
    [Symbol.asyncIterator]() {
      const r = t[Symbol.asyncIterator](), a = {
        next: () => r.next().then(n)
      };
      return r.throw !== void 0 && (a.throw = (o) => r.throw(o).then(n)), r.return !== void 0 && (a.return = (o) => r.return(o).then(n)), a;
    }
  };
}
function OE(e, t) {
  if (!t)
    return e;
  for (const n of t.concat().reverse())
    e = n(e);
  return e;
}
function SE(e) {
  var t;
  const n = Object.assign({}, e);
  return (t = n.ignoreUnknownFields) !== null && t !== void 0 || (n.ignoreUnknownFields = !0), n;
}
function Hd(e, t, n, r) {
  const a = t ? zd(e.input, r) : qd(e.input, n);
  return { parse: (t ? zd(e.output, r) : qd(e.output, n)).parse, serialize: a.serialize };
}
function zd(e, t) {
  return {
    parse(n) {
      try {
        return ss(e, n, t);
      } catch (r) {
        const a = r instanceof Error ? r.message : String(r);
        throw new K(`parse binary: ${a}`, O.Internal);
      }
    },
    serialize(n) {
      try {
        return cE(e, n, t);
      } catch (r) {
        const a = r instanceof Error ? r.message : String(r);
        throw new K(`serialize binary: ${a}`, O.Internal);
      }
    }
  };
}
function qd(e, t) {
  var n, r;
  const a = (n = t?.textEncoder) !== null && n !== void 0 ? n : new TextEncoder(), o = (r = t?.textDecoder) !== null && r !== void 0 ? r : new TextDecoder(), s = SE(t);
  return {
    parse(i) {
      try {
        const u = o.decode(i);
        return S3(e, u, s);
      } catch (u) {
        throw K.from(u, O.InvalidArgument);
      }
    },
    serialize(i) {
      try {
        const u = h3(e, i, s);
        return a.encode(u);
      } catch (u) {
        throw K.from(u, O.Internal);
      }
    }
  };
}
const z3 = /^application\/(connect\+)?(?:(json)(?:; ?charset=utf-?8)?|(proto))$/i, q3 = "application/proto", Q3 = "application/json", ek = "application/connect+proto", tk = "application/connect+json";
function nk(e) {
  const t = e?.match(z3);
  if (!t)
    return;
  const n = !!t[1], r = !!t[3];
  return { stream: n, binary: r };
}
function kE(e, t, n) {
  var r;
  if (t && new Headers(t).forEach((i, u) => n.metadata.append(u, i)), typeof e != "object" || e == null || Array.isArray(e))
    throw n;
  let a = n.code;
  "code" in e && typeof e.code == "string" && (a = (r = M3(e.code)) !== null && r !== void 0 ? r : a);
  const o = e.message;
  if (o != null && typeof o != "string")
    throw n;
  const s = new K(o ?? "", a, t);
  if ("details" in e && Array.isArray(e.details))
    for (const i of e.details) {
      if (i === null || typeof i != "object" || Array.isArray(i) || typeof i.type != "string" || typeof i.value != "string")
        throw n;
      try {
        s.details.push({
          type: i.type,
          value: Sl(i.value),
          debug: i.debug
        });
      } catch {
        throw n;
      }
    }
  return s;
}
const Qd = 2;
function rk(e) {
  const t = new K("invalid end stream", O.Unknown);
  let n;
  try {
    n = JSON.parse(typeof e == "string" ? e : new TextDecoder().decode(e));
  } catch {
    throw t;
  }
  if (typeof n != "object" || n == null || Array.isArray(n))
    throw t;
  const r = new Headers();
  if ("metadata" in n) {
    if (typeof n.metadata != "object" || n.metadata == null || Array.isArray(n.metadata))
      throw t;
    for (const [o, s] of Object.entries(n.metadata)) {
      if (!Array.isArray(s) || s.some((i) => typeof i != "string"))
        throw t;
      for (const i of s)
        r.append(o, i);
    }
  }
  const a = "error" in n && n.error != null ? kE(n.error, r, t) : void 0;
  return { metadata: r, error: a };
}
const Uo = "Content-Type", ak = "Content-Length", ep = "Content-Encoding", ok = "Accept-Encoding", sk = "Connect-Timeout-Ms", DE = "Connect-Protocol-Version", ik = "User-Agent";
function uk(e) {
  switch (e) {
    case 400:
      return O.Internal;
    case 401:
      return O.Unauthenticated;
    case 403:
      return O.PermissionDenied;
    case 404:
      return O.Unimplemented;
    case 429:
      return O.Unavailable;
    case 502:
      return O.Unavailable;
    case 503:
      return O.Unavailable;
    case 504:
      return O.Unavailable;
    default:
      return O.Unknown;
  }
}
function tp(e) {
  const t = new Headers(), n = new Headers();
  return e.forEach((r, a) => {
    a.toLowerCase().startsWith("trailer-") ? n.append(a.substring(8), r) : t.append(a, r);
  }), [t, n];
}
const AE = "1";
function np(e, t, n, r, a) {
  const o = new Headers(r ?? {});
  return n !== void 0 && o.set(sk, `${n}`), o.set(Uo, e == "unary" ? t ? q3 : Q3 : t ? ek : tk), o.set(DE, AE), o.has(ik), o;
}
function rp(e, t, n, r) {
  const a = r.get(Uo), o = nk(a);
  if (n !== 200) {
    const i = new K(`HTTP ${n}`, uk(n), r);
    if (e == "unary" && o && !o.binary)
      return { isUnaryError: !0, unaryError: i };
    throw i;
  }
  const s = {
    binary: t,
    stream: e !== "unary"
  };
  if (o?.binary !== s.binary || o.stream !== s.stream)
    throw new K(`unsupported content type ${a}`, o === void 0 ? O.Unknown : O.Internal, r);
  return { isUnaryError: !1 };
}
const ap = "application/";
function lk(e, t) {
  return t ? Qy(e, "url") : encodeURIComponent(new TextDecoder().decode(e));
}
function ck(e, t, n) {
  let r = `?connect=v${AE}`;
  const a = e.header.get(Uo);
  a?.indexOf(ap) === 0 && (r += "&encoding=" + encodeURIComponent(a.slice(ap.length)));
  const o = e.header.get(ep);
  o !== null && o !== "identity" && (r += "&compression=" + encodeURIComponent(o), n = !0), n && (r += "&base64=1"), r += "&message=" + lk(t, n);
  const s = e.url + r, i = new Headers(e.header);
  for (const u of [
    DE,
    Uo,
    ak,
    ep,
    ok
  ])
    i.delete(u);
  return Object.assign(Object.assign({}, e), {
    requestMethod: "GET",
    url: s,
    header: i
  });
}
function fk(e) {
  const t = OE(e.next, e.interceptors), [n, r, a] = LE(e), o = Object.assign(Object.assign({}, e.req), { message: _E(e.req.method.input, e.req.message), signal: n });
  return t(o).then((s) => (a(), s), r);
}
function mk(e) {
  const t = OE(e.next, e.interceptors), [n, r, a] = LE(e), o = Object.assign(Object.assign({}, e.req), { message: H3(e.req.method.input, e.req.message), signal: n });
  let s = !1;
  return n.addEventListener("abort", function() {
    var i, u;
    const l = e.req.message[Symbol.asyncIterator]();
    s || (i = l.throw) === null || i === void 0 || i.call(l, this.reason).catch(() => {
    }), (u = l.return) === null || u === void 0 || u.call(l).catch(() => {
    });
  }), t(o).then((i) => Object.assign(Object.assign({}, i), { message: {
    [Symbol.asyncIterator]() {
      const u = i.message[Symbol.asyncIterator]();
      return {
        next() {
          return u.next().then((l) => (l.done == !0 && (s = !0, a()), l), r);
        }
        // We deliberately omit throw/return.
      };
    }
  } }), r);
}
function LE(e) {
  const { signal: t, cleanup: n } = Z3(e.timeoutMs), r = J3(e.signal, t);
  return [
    r.signal,
    function(a) {
      const o = K.from(t.aborted ? wE(t) : a);
      return r.abort(o), n(), Promise.reject(o);
    },
    function() {
      n(), r.abort();
    }
  ];
}
function dk() {
  try {
    new Headers();
  } catch {
    throw new Error("connect-web requires the fetch API. Are you running on an old version of Node.js? Node.js is not supported in Connect for Web - please stay tuned for Connect for Node.");
  }
}
var Cr = function(e) {
  return this instanceof Cr ? (this.v = e, this) : new Cr(e);
}, pk = function(e, t, n) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var r = n.apply(e, t || []), a, o = [];
  return a = Object.create((typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype), i("next"), i("throw"), i("return", s), a[Symbol.asyncIterator] = function() {
    return this;
  }, a;
  function s(f) {
    return function(y) {
      return Promise.resolve(y).then(f, m);
    };
  }
  function i(f, y) {
    r[f] && (a[f] = function(E) {
      return new Promise(function(N, v) {
        o.push([f, E, N, v]) > 1 || u(f, E);
      });
    }, y && (a[f] = y(a[f])));
  }
  function u(f, y) {
    try {
      l(r[f](y));
    } catch (E) {
      d(o[0][3], E);
    }
  }
  function l(f) {
    f.value instanceof Cr ? Promise.resolve(f.value.v).then(c, m) : d(o[0][2], f);
  }
  function c(f) {
    u("next", f);
  }
  function m(f) {
    u("throw", f);
  }
  function d(f, y) {
    f(y), o.shift(), o.length && u(o[0][0], o[0][1]);
  }
};
const op = {
  redirect: "error"
};
function bk(e) {
  var t;
  dk();
  const n = (t = e.useBinaryFormat) !== null && t !== void 0 ? t : !1;
  return {
    async unary(r, a, o, s, i, u) {
      const { serialize: l, parse: c } = Hd(r, n, e.jsonOptions, e.binaryOptions);
      return o = o === void 0 ? e.defaultTimeoutMs : o <= 0 ? void 0 : o, await fk({
        interceptors: e.interceptors,
        signal: a,
        timeoutMs: o,
        req: {
          stream: !1,
          service: r.parent,
          method: r,
          requestMethod: "POST",
          url: Zd(e.baseUrl, r),
          header: np(r.methodKind, n, o, s),
          contextValues: u ?? Jd(),
          message: i
        },
        next: async (m) => {
          var d;
          const f = e.useHttpGet === !0 && r.idempotency === Ri.NO_SIDE_EFFECTS;
          let y = null;
          f ? m = ck(m, l(m.message), n) : y = l(m.message);
          const E = await ((d = e.fetch) !== null && d !== void 0 ? d : globalThis.fetch)(m.url, Object.assign(Object.assign({}, op), { method: m.requestMethod, headers: m.header, signal: m.signal, body: y })), { isUnaryError: N, unaryError: v } = rp(r.methodKind, n, E.status, E.headers);
          if (N)
            throw kE(await E.json(), G3(...tp(E.headers)), v);
          const [I, M] = tp(E.headers);
          return {
            stream: !1,
            service: r.parent,
            method: r,
            header: I,
            message: n ? c(new Uint8Array(await E.arrayBuffer())) : EE(r.output, await E.json(), SE(e.jsonOptions)),
            trailer: M
          };
        }
      });
    },
    async stream(r, a, o, s, i, u) {
      const { serialize: l, parse: c } = Hd(r, n, e.jsonOptions, e.binaryOptions);
      function m(f, y, E, N) {
        return pk(this, arguments, function* () {
          const v = X3(f).getReader();
          let I = !1;
          for (; ; ) {
            const M = yield Cr(v.read());
            if (M.done)
              break;
            const { flags: De, data: Xe } = M.value;
            if ((De & Wd) === Wd)
              throw new K("protocol error: received unsupported compressed output", O.Internal);
            if ((De & Qd) === Qd) {
              I = !0;
              const ae = rk(Xe);
              if (ae.error) {
                const C = ae.error;
                throw E.forEach((Z, ht) => {
                  C.metadata.append(ht, Z);
                }), C;
              }
              ae.metadata.forEach((C, Z) => y.set(Z, C));
              continue;
            }
            yield yield Cr(c(Xe));
          }
          if ("throwIfAborted" in N && N.throwIfAborted(), !I)
            throw "missing EndStreamResponse";
        });
      }
      async function d(f) {
        if (r.methodKind != "server_streaming")
          throw "The fetch API does not support streaming request bodies";
        const y = await f[Symbol.asyncIterator]().next();
        if (y.done == !0)
          throw "missing request message";
        return W3(0, l(y.value));
      }
      return o = o === void 0 ? e.defaultTimeoutMs : o <= 0 ? void 0 : o, await mk({
        interceptors: e.interceptors,
        timeoutMs: o,
        signal: a,
        req: {
          stream: !0,
          service: r.parent,
          method: r,
          requestMethod: "POST",
          url: Zd(e.baseUrl, r),
          header: np(r.methodKind, n, o, s),
          contextValues: u ?? Jd(),
          message: i
        },
        next: async (f) => {
          var y;
          const E = await ((y = e.fetch) !== null && y !== void 0 ? y : globalThis.fetch)(f.url, Object.assign(Object.assign({}, op), { method: f.requestMethod, headers: f.header, signal: f.signal, body: await d(f.message) }));
          if (rp(r.methodKind, n, E.status, E.headers), E.body === null)
            throw "missing response body";
          const N = new Headers();
          return Object.assign(Object.assign({}, f), { header: E.headers, trailer: N, message: m(E.body, N, E.headers, f.signal) });
        }
      });
    }
  };
}
bk({
  baseUrl: "/api",
  useBinaryFormat: !0,
  fetch: (e, t) => {
    const n = t?.headers ?? {};
    return fetch(e, {
      ...t,
      headers: {
        ...n,
        "qt-widget-id": window.qtWidgetId
      }
    });
  }
});
const ue = /* @__PURE__ */ Symbol(), gk = !1;
var hk = Array.isArray, yk = Array.prototype.indexOf, Xs = Object.getOwnPropertyDescriptor, Ek = Object.prototype, Nk = Array.prototype, vk = Object.getPrototypeOf;
function Ik(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
function Tk() {
  var e, t, n = new Promise((r, a) => {
    e = r, t = a;
  });
  return { promise: n, resolve: e, reject: t };
}
const ke = 2, wk = 4, _k = 1 << 24, rr = 16, Ea = 32, Na = 64, Pl = 128, bt = 512, me = 1024, at = 2048, gt = 4096, eo = 8192, pn = 16384, Ok = 32768, sp = 1 << 17, UE = 1 << 18, wn = 32768, xi = 1 << 21, FE = 1 << 22, jr = 1 << 23, Ws = /* @__PURE__ */ Symbol("$state"), RE = new class extends Error {
  name = "StaleReactionError";
  message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}();
function Sk() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function kk() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Dk() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function Ak() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Lk(e) {
  return e === this.v;
}
let Uk = !1;
function $E() {
  return !0;
}
let $n = [];
function Fk() {
  var e = $n;
  $n = [], Ik(e);
}
function Rk(e) {
  if ($n.length === 0) {
    var t = $n;
    queueMicrotask(() => {
      t === $n && Fk();
    });
  }
  $n.push(e);
}
function $k(e) {
  var t = Te;
  if (t === null)
    return Y.f |= jr, e;
  if ((t.f & Ok) === 0) {
    if ((t.f & Pl) === 0)
      throw e;
    t.b.error(e);
  } else
    PE(e, t);
}
function PE(e, t) {
  for (; t !== null; ) {
    if ((t.f & Pl) !== 0)
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
const Ba = /* @__PURE__ */ new Set();
let Q = null, Be = null, ut = [], xl = null, Vi = !1;
class Xr {
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
  #t = 0;
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
  #o = /* @__PURE__ */ new Set();
  /**
   * Deferred effects that are MAYBE_DIRTY
   * @type {Set<Effect>}
   */
  #s = /* @__PURE__ */ new Set();
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
    ut = [], this.apply();
    var n = {
      parent: null,
      effect: null,
      effects: [],
      render_effects: []
    };
    for (const r of t)
      this.#u(r, n);
    this.is_fork || this.#c(), this.is_deferred() ? (this.#n(n.effects), this.#n(n.render_effects)) : (Q = null, ip(n.render_effects), ip(n.effects), this.#i?.resolve()), Be = null;
  }
  /**
   * Traverse the effect tree, executing effects or stashing
   * them for later execution as appropriate
   * @param {Effect} root
   * @param {EffectTarget} target
   */
  #u(t, n) {
    t.f ^= me;
    for (var r = t.first; r !== null; ) {
      var a = r.f, o = (a & (Ea | Na)) !== 0, s = o && (a & me) !== 0, i = s || (a & eo) !== 0 || this.skipped_effects.has(r);
      if ((r.f & Pl) !== 0 && r.b?.is_pending() && (n = {
        parent: n,
        effect: r,
        effects: [],
        render_effects: []
      }), !i && r.fn !== null) {
        o ? r.f ^= me : (a & wk) !== 0 ? n.effects.push(r) : Ia(r) && ((r.f & rr) !== 0 && this.#o.add(r), xo(r));
        var u = r.first;
        if (u !== null) {
          r = u;
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
      (n.f & at) !== 0 ? this.#o.add(n) : (n.f & gt) !== 0 && this.#s.add(n), this.#l(n.deps), we(n, me);
  }
  /**
   * @param {Value[] | null} deps
   */
  #l(t) {
    if (t !== null)
      for (const n of t)
        (n.f & ke) === 0 || (n.f & wn) === 0 || (n.f ^= wn, this.#l(
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
    this.previous.has(t) || this.previous.set(t, n), (t.f & jr) === 0 && (this.current.set(t, t.v), Be?.set(t, t.v));
  }
  activate() {
    Q = this, this.apply();
  }
  deactivate() {
    Q === this && (Q = null, Be = null);
  }
  flush() {
    if (this.activate(), ut.length > 0) {
      if (Pk(), Q !== null && Q !== this)
        return;
    } else this.#e === 0 && this.process([]);
    this.deactivate();
  }
  discard() {
    for (const t of this.#a) t(this);
    this.#a.clear();
  }
  #c() {
    if (this.#t === 0) {
      for (const t of this.#r) t();
      this.#r.clear();
    }
    this.#e === 0 && this.#f();
  }
  #f() {
    if (Ba.size > 1) {
      this.previous.clear();
      var t = Be, n = !0, r = {
        parent: null,
        effect: null,
        effects: [],
        render_effects: []
      };
      for (const o of Ba) {
        if (o === this) {
          n = !1;
          continue;
        }
        const s = [];
        for (const [u, l] of this.current) {
          if (o.current.has(u))
            if (n && l !== o.current.get(u))
              o.current.set(u, l);
            else
              continue;
          s.push(u);
        }
        if (s.length === 0)
          continue;
        const i = [...o.current.keys()].filter((u) => !this.current.has(u));
        if (i.length > 0) {
          var a = ut;
          ut = [];
          const u = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Map();
          for (const c of s)
            xE(c, i, u, l);
          if (ut.length > 0) {
            Q = o, o.apply();
            for (const c of ut)
              o.#u(c, r);
            o.deactivate();
          }
          ut = a;
        }
      }
      Q = null, Be = t;
    }
    this.committed = !0, Ba.delete(this);
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
    for (const t of this.#o)
      this.#s.delete(t), we(t, at), Wr(t);
    for (const t of this.#s)
      we(t, gt), Wr(t);
    this.flush();
  }
  /** @param {() => void} fn */
  oncommit(t) {
    this.#r.add(t);
  }
  /** @param {(batch: Batch) => void} fn */
  ondiscard(t) {
    this.#a.add(t);
  }
  settled() {
    return (this.#i ??= Tk()).promise;
  }
  static ensure() {
    if (Q === null) {
      const t = Q = new Xr();
      Ba.add(Q), Xr.enqueue(() => {
        Q === t && t.flush();
      });
    }
    return Q;
  }
  /** @param {() => void} task */
  static enqueue(t) {
    Rk(t);
  }
  apply() {
  }
}
function Pk() {
  var e = bn;
  Vi = !0;
  try {
    var t = 0;
    for (Ro(!0); ut.length > 0; ) {
      var n = Xr.ensure();
      if (t++ > 1e3) {
        var r, a;
        xk();
      }
      n.process(ut), Bt.clear();
    }
  } finally {
    Vi = !1, Ro(e), xl = null;
  }
}
function xk() {
  try {
    Sk();
  } catch (e) {
    PE(e, xl);
  }
}
let _t = null;
function ip(e) {
  var t = e.length;
  if (t !== 0) {
    for (var n = 0; n < t; ) {
      var r = e[n++];
      if ((r.f & (pn | eo)) === 0 && Ia(r) && (_t = /* @__PURE__ */ new Set(), xo(r), r.deps === null && r.first === null && r.nodes === null && (r.teardown === null && r.ac === null ? XE(r) : r.fn = null), _t?.size > 0)) {
        Bt.clear();
        for (const a of _t) {
          if ((a.f & (pn | eo)) !== 0) continue;
          const o = [a];
          let s = a.parent;
          for (; s !== null; )
            _t.has(s) && (_t.delete(s), o.push(s)), s = s.parent;
          for (let i = o.length - 1; i >= 0; i--) {
            const u = o[i];
            (u.f & (pn | eo)) === 0 && xo(u);
          }
        }
        _t.clear();
      }
    }
    _t = null;
  }
}
function xE(e, t, n, r) {
  if (!n.has(e) && (n.add(e), e.reactions !== null))
    for (const a of e.reactions) {
      const o = a.f;
      (o & ke) !== 0 ? xE(
        /** @type {Derived} */
        a,
        t,
        n,
        r
      ) : (o & (FE | rr)) !== 0 && (o & at) === 0 && VE(a, t, r) && (we(a, at), Wr(
        /** @type {Effect} */
        a
      ));
    }
}
function VE(e, t, n) {
  const r = n.get(e);
  if (r !== void 0) return r;
  if (e.deps !== null)
    for (const a of e.deps) {
      if (t.includes(a))
        return !0;
      if ((a.f & ke) !== 0 && VE(
        /** @type {Derived} */
        a,
        t,
        n
      ))
        return n.set(
          /** @type {Derived} */
          a,
          !0
        ), !0;
    }
  return n.set(e, !1), !1;
}
function Wr(e) {
  for (var t = xl = e; t.parent !== null; ) {
    t = t.parent;
    var n = t.f;
    if (Vi && t === Te && (n & rr) !== 0 && (n & UE) === 0)
      return;
    if ((n & (Na | Ea)) !== 0) {
      if ((n & me) === 0) return;
      t.f ^= me;
    }
  }
  ut.push(t);
}
function YE(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var n = 0; n < t.length; n += 1)
      Yl(
        /** @type {Effect} */
        t[n]
      );
  }
}
function Vk(e) {
  for (var t = e.parent; t !== null; ) {
    if ((t.f & ke) === 0)
      return (t.f & pn) === 0 ? (
        /** @type {Effect} */
        t
      ) : null;
    t = t.parent;
  }
  return null;
}
function Vl(e) {
  var t, n = Te;
  $o(Vk(e));
  try {
    e.f &= ~wn, YE(e), t = HE(e);
  } finally {
    $o(n);
  }
  return t;
}
function ME(e) {
  var t = Vl(e);
  if (e.equals(t) || (Q?.is_fork || (e.v = t), e.wv = JE()), !va)
    if (Be !== null)
      (Fo() || Q?.is_fork) && Be.set(e, t);
    else {
      var n = (e.f & bt) === 0 ? gt : me;
      we(e, n);
    }
}
let Yi = /* @__PURE__ */ new Set();
const Bt = /* @__PURE__ */ new Map();
let BE = !1;
function Yk(e, t) {
  var n = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: Lk,
    rv: 0,
    wv: 0
  };
  return n;
}
// @__NO_SIDE_EFFECTS__
function xt(e, t) {
  const n = Yk(e);
  return Xk(n), n;
}
function Qt(e, t, n = !1) {
  Y !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!rn || (Y.f & sp) !== 0) && $E() && (Y.f & (ke | rr | FE | sp)) !== 0 && !Ft?.includes(e) && Ak();
  let r = n ? Pn(t) : t;
  return Mk(e, r);
}
function Mk(e, t) {
  if (!e.equals(t)) {
    var n = e.v;
    va ? Bt.set(e, t) : Bt.set(e, n), e.v = t;
    var r = Xr.ensure();
    r.capture(e, n), (e.f & ke) !== 0 && ((e.f & at) !== 0 && Vl(
      /** @type {Derived} */
      e
    ), we(e, (e.f & bt) !== 0 ? me : gt)), e.wv = JE(), GE(e, at), Te !== null && (Te.f & me) !== 0 && (Te.f & (Ea | Na)) === 0 && (xe === null ? Wk([e]) : xe.push(e)), !r.is_fork && Yi.size > 0 && !BE && Bk();
  }
  return t;
}
function Bk() {
  BE = !1;
  var e = bn;
  Ro(!0);
  const t = Array.from(Yi);
  try {
    for (const n of t)
      (n.f & me) !== 0 && we(n, gt), Ia(n) && xo(n);
  } finally {
    Ro(e);
  }
  Yi.clear();
}
function Js(e) {
  Qt(e, e.v + 1);
}
function GE(e, t) {
  var n = e.reactions;
  if (n !== null)
    for (var r = n.length, a = 0; a < r; a++) {
      var o = n[a], s = o.f, i = (s & at) === 0;
      if (i && we(o, t), (s & ke) !== 0) {
        var u = (
          /** @type {Derived} */
          o
        );
        Be?.delete(u), (s & wn) === 0 && (s & bt && (o.f |= wn), GE(u, gt));
      } else i && ((s & rr) !== 0 && _t !== null && _t.add(
        /** @type {Effect} */
        o
      ), Wr(
        /** @type {Effect} */
        o
      ));
    }
}
function Pn(e) {
  if (typeof e != "object" || e === null || Ws in e)
    return e;
  const t = vk(e);
  if (t !== Ek && t !== Nk)
    return e;
  var n = /* @__PURE__ */ new Map(), r = hk(e), a = /* @__PURE__ */ xt(0), o = gn, s = (i) => {
    if (gn === o)
      return i();
    var u = Y, l = gn;
    Qn(null), lp(o);
    var c = i();
    return Qn(u), lp(l), c;
  };
  return r && n.set("length", /* @__PURE__ */ xt(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(i, u, l) {
        (!("value" in l) || l.configurable === !1 || l.enumerable === !1 || l.writable === !1) && kk();
        var c = n.get(u);
        return c === void 0 ? c = s(() => {
          var m = /* @__PURE__ */ xt(l.value);
          return n.set(u, m), m;
        }) : Qt(c, l.value, !0), !0;
      },
      deleteProperty(i, u) {
        var l = n.get(u);
        if (l === void 0) {
          if (u in i) {
            const c = s(() => /* @__PURE__ */ xt(ue));
            n.set(u, c), Js(a);
          }
        } else
          Qt(l, ue), Js(a);
        return !0;
      },
      get(i, u, l) {
        if (u === Ws)
          return e;
        var c = n.get(u), m = u in i;
        if (c === void 0 && (!m || Xs(i, u)?.writable) && (c = s(() => {
          var f = Pn(m ? i[u] : ue), y = /* @__PURE__ */ xt(f);
          return y;
        }), n.set(u, c)), c !== void 0) {
          var d = Ga(c);
          return d === ue ? void 0 : d;
        }
        return Reflect.get(i, u, l);
      },
      getOwnPropertyDescriptor(i, u) {
        var l = Reflect.getOwnPropertyDescriptor(i, u);
        if (l && "value" in l) {
          var c = n.get(u);
          c && (l.value = Ga(c));
        } else if (l === void 0) {
          var m = n.get(u), d = m?.v;
          if (m !== void 0 && d !== ue)
            return {
              enumerable: !0,
              configurable: !0,
              value: d,
              writable: !0
            };
        }
        return l;
      },
      has(i, u) {
        if (u === Ws)
          return !0;
        var l = n.get(u), c = l !== void 0 && l.v !== ue || Reflect.has(i, u);
        if (l !== void 0 || Te !== null && (!c || Xs(i, u)?.writable)) {
          l === void 0 && (l = s(() => {
            var d = c ? Pn(i[u]) : ue, f = /* @__PURE__ */ xt(d);
            return f;
          }), n.set(u, l));
          var m = Ga(l);
          if (m === ue)
            return !1;
        }
        return c;
      },
      set(i, u, l, c) {
        var m = n.get(u), d = u in i;
        if (r && u === "length")
          for (var f = l; f < /** @type {Source<number>} */
          m.v; f += 1) {
            var y = n.get(f + "");
            y !== void 0 ? Qt(y, ue) : f in i && (y = s(() => /* @__PURE__ */ xt(ue)), n.set(f + "", y));
          }
        if (m === void 0)
          (!d || Xs(i, u)?.writable) && (m = s(() => /* @__PURE__ */ xt(void 0)), Qt(m, Pn(l)), n.set(u, m));
        else {
          d = m.v !== ue;
          var E = s(() => Pn(l));
          Qt(m, E);
        }
        var N = Reflect.getOwnPropertyDescriptor(i, u);
        if (N?.set && N.set.call(c, l), !d) {
          if (r && typeof u == "string") {
            var v = (
              /** @type {Source<number>} */
              n.get("length")
            ), I = Number(u);
            Number.isInteger(I) && I >= v.v && Qt(v, I + 1);
          }
          Js(a);
        }
        return !0;
      },
      ownKeys(i) {
        Ga(a);
        var u = Reflect.ownKeys(i).filter((m) => {
          var d = n.get(m);
          return d === void 0 || d.v !== ue;
        });
        for (var [l, c] of n)
          c.v !== ue && !(l in i) && u.push(l);
        return u;
      },
      setPrototypeOf() {
        Dk();
      }
    }
  );
}
var Gk;
// @__NO_SIDE_EFFECTS__
function Kk(e) {
  return (
    /** @type {TemplateNode | null} */
    Gk.call(e)
  );
}
function KE(e) {
  var t = Y, n = Te;
  Qn(null), $o(null);
  try {
    return e();
  } finally {
    Qn(t), $o(n);
  }
}
function Fo() {
  return Y !== null && !rn;
}
function CE(e) {
  var t = e.teardown;
  if (t !== null) {
    const n = va, r = Y;
    up(!0), Qn(null);
    try {
      t.call(null);
    } finally {
      up(n), Qn(r);
    }
  }
}
function jE(e, t = !1) {
  var n = e.first;
  for (e.first = e.last = null; n !== null; ) {
    const a = n.ac;
    a !== null && KE(() => {
      a.abort(RE);
    });
    var r = n.next;
    (n.f & Na) !== 0 ? n.parent = null : Yl(n, t), n = r;
  }
}
function Ck(e) {
  for (var t = e.first; t !== null; ) {
    var n = t.next;
    (t.f & Ea) === 0 && Yl(t), t = n;
  }
}
function Yl(e, t = !0) {
  var n = !1;
  (t || (e.f & UE) !== 0) && e.nodes !== null && e.nodes.end !== null && (jk(
    e.nodes.start,
    /** @type {TemplateNode} */
    e.nodes.end
  ), n = !0), jE(e, t && !n), Po(e, 0), we(e, pn);
  var r = e.nodes && e.nodes.t;
  if (r !== null)
    for (const o of r)
      o.stop();
  CE(e);
  var a = e.parent;
  a !== null && a.first !== null && XE(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = null;
}
function jk(e, t) {
  for (; e !== null; ) {
    var n = e === t ? null : /* @__PURE__ */ Kk(e);
    e.remove(), e = n;
  }
}
function XE(e) {
  var t = e.parent, n = e.prev, r = e.next;
  n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
let bn = !1;
function Ro(e) {
  bn = e;
}
let va = !1;
function up(e) {
  va = e;
}
let Y = null, rn = !1;
function Qn(e) {
  Y = e;
}
let Te = null;
function $o(e) {
  Te = e;
}
let Ft = null;
function Xk(e) {
  Y !== null && (Ft === null ? Ft = [e] : Ft.push(e));
}
let re = null, Fe = 0, xe = null;
function Wk(e) {
  xe = e;
}
let WE = 1, Jr = 0, gn = Jr;
function lp(e) {
  gn = e;
}
function JE() {
  return ++WE;
}
function Ia(e) {
  var t = e.f;
  if ((t & at) !== 0)
    return !0;
  if (t & ke && (e.f &= ~wn), (t & gt) !== 0) {
    var n = e.deps;
    if (n !== null)
      for (var r = n.length, a = 0; a < r; a++) {
        var o = n[a];
        if (Ia(
          /** @type {Derived} */
          o
        ) && ME(
          /** @type {Derived} */
          o
        ), o.wv > e.wv)
          return !0;
      }
    (t & bt) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    Be === null && we(e, me);
  }
  return !1;
}
function ZE(e, t, n = !0) {
  var r = e.reactions;
  if (r !== null && !Ft?.includes(e))
    for (var a = 0; a < r.length; a++) {
      var o = r[a];
      (o.f & ke) !== 0 ? ZE(
        /** @type {Derived} */
        o,
        t,
        !1
      ) : t === o && (n ? we(o, at) : (o.f & me) !== 0 && we(o, gt), Wr(
        /** @type {Effect} */
        o
      ));
    }
}
function HE(e) {
  var t = re, n = Fe, r = xe, a = Y, o = Ft, s = rn, i = gn, u = e.f;
  re = /** @type {null | Value[]} */
  null, Fe = 0, xe = null, Y = (u & (Ea | Na)) === 0 ? e : null, Ft = null, e.ctx, rn = !1, gn = ++Jr, e.ac !== null && (KE(() => {
    e.ac.abort(RE);
  }), e.ac = null);
  try {
    e.f |= xi;
    var l = (
      /** @type {Function} */
      e.fn
    ), c = l(), m = e.deps;
    if (re !== null) {
      var d;
      if (Po(e, Fe), m !== null && Fe > 0)
        for (m.length = Fe + re.length, d = 0; d < re.length; d++)
          m[Fe + d] = re[d];
      else
        e.deps = m = re;
      if (Fo() && (e.f & bt) !== 0)
        for (d = Fe; d < m.length; d++)
          (m[d].reactions ??= []).push(e);
    } else m !== null && Fe < m.length && (Po(e, Fe), m.length = Fe);
    if ($E() && xe !== null && !rn && m !== null && (e.f & (ke | gt | at)) === 0)
      for (d = 0; d < /** @type {Source[]} */
      xe.length; d++)
        ZE(
          xe[d],
          /** @type {Effect} */
          e
        );
    return a !== null && a !== e && (Jr++, xe !== null && (r === null ? r = xe : r.push(.../** @type {Source[]} */
    xe))), (e.f & jr) !== 0 && (e.f ^= jr), c;
  } catch (f) {
    return $k(f);
  } finally {
    e.f ^= xi, re = t, Fe = n, xe = r, Y = a, Ft = o, rn = s, gn = i;
  }
}
function Jk(e, t) {
  let n = t.reactions;
  if (n !== null) {
    var r = yk.call(n, e);
    if (r !== -1) {
      var a = n.length - 1;
      a === 0 ? n = t.reactions = null : (n[r] = n[a], n.pop());
    }
  }
  n === null && (t.f & ke) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (re === null || !re.includes(t)) && (we(t, gt), (t.f & bt) !== 0 && (t.f ^= bt, t.f &= ~wn), YE(
    /** @type {Derived} **/
    t
  ), Po(
    /** @type {Derived} **/
    t,
    0
  ));
}
function Po(e, t) {
  var n = e.deps;
  if (n !== null)
    for (var r = t; r < n.length; r++)
      Jk(e, n[r]);
}
function xo(e) {
  var t = e.f;
  if ((t & pn) === 0) {
    we(e, me);
    var n = Te, r = bn;
    Te = e, bn = !0;
    try {
      (t & (rr | _k)) !== 0 ? Ck(e) : jE(e), CE(e);
      var a = HE(e);
      e.teardown = typeof a == "function" ? a : null, e.wv = WE;
      var o;
      gk && Uk && (e.f & at) !== 0 && e.deps;
    } finally {
      bn = r, Te = n;
    }
  }
}
function Ga(e) {
  var t = e.f, n = (t & ke) !== 0;
  if (Y !== null && !rn) {
    var r = Te !== null && (Te.f & pn) !== 0;
    if (!r && !Ft?.includes(e)) {
      var a = Y.deps;
      if ((Y.f & xi) !== 0)
        e.rv < Jr && (e.rv = Jr, re === null && a !== null && a[Fe] === e ? Fe++ : re === null ? re = [e] : re.includes(e) || re.push(e));
      else {
        (Y.deps ??= []).push(e);
        var o = e.reactions;
        o === null ? e.reactions = [Y] : o.includes(Y) || o.push(Y);
      }
    }
  }
  if (va) {
    if (Bt.has(e))
      return Bt.get(e);
    if (n) {
      var s = (
        /** @type {Derived} */
        e
      ), i = s.v;
      return ((s.f & me) === 0 && s.reactions !== null || qE(s)) && (i = Vl(s)), Bt.set(s, i), i;
    }
  } else n && (!Be?.has(e) || Q?.is_fork && !Fo()) && (s = /** @type {Derived} */
  e, Ia(s) && ME(s), bn && Fo() && (s.f & bt) === 0 && zE(s));
  if (Be?.has(e))
    return Be.get(e);
  if ((e.f & jr) !== 0)
    throw e.v;
  return e.v;
}
function zE(e) {
  if (e.deps !== null) {
    e.f ^= bt;
    for (const t of e.deps)
      (t.reactions ??= []).push(e), (t.f & ke) !== 0 && (t.f & bt) === 0 && zE(
        /** @type {Derived} */
        t
      );
  }
}
function qE(e) {
  if (e.v === ue) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps)
    if (Bt.has(t) || (t.f & ke) !== 0 && qE(
      /** @type {Derived} */
      t
    ))
      return !0;
  return !1;
}
const Zk = -7169;
function we(e, t) {
  e.f = e.f & Zk | t;
}
function QE() {
  return {
    isDark: document.documentElement.classList.contains("night-mode")
  };
}
const Hk = Pn(QE()), zk = new MutationObserver((e, t) => {
  Hk.isDark = QE().isDark;
});
zk.observe(document.documentElement, { attributeFilter: ["class"] });
export {
  qk as bridgeCommand,
  nD as checkNightMode,
  eD as createProtoClient,
  N1 as pageTheme,
  Qk as promiseWithResolver
};
