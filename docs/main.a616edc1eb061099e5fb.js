(self.webpackChunkng_x_rocket = self.webpackChunkng_x_rocket || []).push([
  [179],
  {
    255: (t) => {
      function e(t) {
        return Promise.resolve().then(() => {
          var e = new Error("Cannot find module '" + t + "'");
          throw ((e.code = 'MODULE_NOT_FOUND'), e);
        });
      }
      (e.keys = () => []), (e.resolve = e), (e.id = 255), (t.exports = e);
    },
    544: (t, e, n) => {
      'use strict';
      function r(t) {
        return 'function' == typeof t;
      }
      let s = !1;
      const i = {
        Promise: void 0,
        set useDeprecatedSynchronousErrorHandling(t) {
          if (t) {
            const t = new Error();
            console.warn(
              'DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n' + t.stack
            );
          } else s && console.log('RxJS: Back to a better error behavior. Thank you. <3');
          s = t;
        },
        get useDeprecatedSynchronousErrorHandling() {
          return s;
        },
      };
      function o(t) {
        setTimeout(() => {
          throw t;
        }, 0);
      }
      const a = {
          closed: !0,
          next(t) {},
          error(t) {
            if (i.useDeprecatedSynchronousErrorHandling) throw t;
            o(t);
          },
          complete() {},
        },
        l = Array.isArray || ((t) => t && 'number' == typeof t.length);
      function c(t) {
        return null !== t && 'object' == typeof t;
      }
      const u = (() => {
        function t(t) {
          return (
            Error.call(this),
            (this.message = t
              ? `${t.length} errors occurred during unsubscription:\n${t
                  .map((t, e) => `${e + 1}) ${t.toString()}`)
                  .join('\n  ')}`
              : ''),
            (this.name = 'UnsubscriptionError'),
            (this.errors = t),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
      class h {
        constructor(t) {
          (this.closed = !1),
            (this._parentOrParents = null),
            (this._subscriptions = null),
            t && ((this._ctorUnsubscribe = !0), (this._unsubscribe = t));
        }
        unsubscribe() {
          let t;
          if (this.closed) return;
          let { _parentOrParents: e, _ctorUnsubscribe: n, _unsubscribe: s, _subscriptions: i } = this;
          if (((this.closed = !0), (this._parentOrParents = null), (this._subscriptions = null), e instanceof h))
            e.remove(this);
          else if (null !== e) for (let r = 0; r < e.length; ++r) e[r].remove(this);
          if (r(s)) {
            n && (this._unsubscribe = void 0);
            try {
              s.call(this);
            } catch (o) {
              t = o instanceof u ? d(o.errors) : [o];
            }
          }
          if (l(i)) {
            let e = -1,
              n = i.length;
            for (; ++e < n; ) {
              const n = i[e];
              if (c(n))
                try {
                  n.unsubscribe();
                } catch (o) {
                  (t = t || []), o instanceof u ? (t = t.concat(d(o.errors))) : t.push(o);
                }
            }
          }
          if (t) throw new u(t);
        }
        add(t) {
          let e = t;
          if (!t) return h.EMPTY;
          switch (typeof t) {
            case 'function':
              e = new h(t);
            case 'object':
              if (e === this || e.closed || 'function' != typeof e.unsubscribe) return e;
              if (this.closed) return e.unsubscribe(), e;
              if (!(e instanceof h)) {
                const t = e;
                (e = new h()), (e._subscriptions = [t]);
              }
              break;
            default:
              throw new Error('unrecognized teardown ' + t + ' added to Subscription.');
          }
          let { _parentOrParents: n } = e;
          if (null === n) e._parentOrParents = this;
          else if (n instanceof h) {
            if (n === this) return e;
            e._parentOrParents = [n, this];
          } else {
            if (-1 !== n.indexOf(this)) return e;
            n.push(this);
          }
          const r = this._subscriptions;
          return null === r ? (this._subscriptions = [e]) : r.push(e), e;
        }
        remove(t) {
          const e = this._subscriptions;
          if (e) {
            const n = e.indexOf(t);
            -1 !== n && e.splice(n, 1);
          }
        }
      }
      function d(t) {
        return t.reduce((t, e) => t.concat(e instanceof u ? e.errors : e), []);
      }
      h.EMPTY = (function (t) {
        return (t.closed = !0), t;
      })(new h());
      const p = 'function' == typeof Symbol ? Symbol('rxSubscriber') : '@@rxSubscriber_' + Math.random();
      class f extends h {
        constructor(t, e, n) {
          switch (
            (super(),
            (this.syncErrorValue = null),
            (this.syncErrorThrown = !1),
            (this.syncErrorThrowable = !1),
            (this.isStopped = !1),
            arguments.length)
          ) {
            case 0:
              this.destination = a;
              break;
            case 1:
              if (!t) {
                this.destination = a;
                break;
              }
              if ('object' == typeof t) {
                t instanceof f
                  ? ((this.syncErrorThrowable = t.syncErrorThrowable), (this.destination = t), t.add(this))
                  : ((this.syncErrorThrowable = !0), (this.destination = new g(this, t)));
                break;
              }
            default:
              (this.syncErrorThrowable = !0), (this.destination = new g(this, t, e, n));
          }
        }
        [p]() {
          return this;
        }
        static create(t, e, n) {
          const r = new f(t, e, n);
          return (r.syncErrorThrowable = !1), r;
        }
        next(t) {
          this.isStopped || this._next(t);
        }
        error(t) {
          this.isStopped || ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped || ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed || ((this.isStopped = !0), super.unsubscribe());
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          this.destination.error(t), this.unsubscribe();
        }
        _complete() {
          this.destination.complete(), this.unsubscribe();
        }
        _unsubscribeAndRecycle() {
          const { _parentOrParents: t } = this;
          return (
            (this._parentOrParents = null),
            this.unsubscribe(),
            (this.closed = !1),
            (this.isStopped = !1),
            (this._parentOrParents = t),
            this
          );
        }
      }
      class g extends f {
        constructor(t, e, n, s) {
          let i;
          super(), (this._parentSubscriber = t);
          let o = this;
          r(e)
            ? (i = e)
            : e &&
              ((i = e.next),
              (n = e.error),
              (s = e.complete),
              e !== a &&
                ((o = Object.create(e)),
                r(o.unsubscribe) && this.add(o.unsubscribe.bind(o)),
                (o.unsubscribe = this.unsubscribe.bind(this)))),
            (this._context = o),
            (this._next = i),
            (this._error = n),
            (this._complete = s);
        }
        next(t) {
          if (!this.isStopped && this._next) {
            const { _parentSubscriber: e } = this;
            i.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable
              ? this.__tryOrSetError(e, this._next, t) && this.unsubscribe()
              : this.__tryOrUnsub(this._next, t);
          }
        }
        error(t) {
          if (!this.isStopped) {
            const { _parentSubscriber: e } = this,
              { useDeprecatedSynchronousErrorHandling: n } = i;
            if (this._error)
              n && e.syncErrorThrowable
                ? (this.__tryOrSetError(e, this._error, t), this.unsubscribe())
                : (this.__tryOrUnsub(this._error, t), this.unsubscribe());
            else if (e.syncErrorThrowable)
              n ? ((e.syncErrorValue = t), (e.syncErrorThrown = !0)) : o(t), this.unsubscribe();
            else {
              if ((this.unsubscribe(), n)) throw t;
              o(t);
            }
          }
        }
        complete() {
          if (!this.isStopped) {
            const { _parentSubscriber: t } = this;
            if (this._complete) {
              const e = () => this._complete.call(this._context);
              i.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable
                ? (this.__tryOrSetError(t, e), this.unsubscribe())
                : (this.__tryOrUnsub(e), this.unsubscribe());
            } else this.unsubscribe();
          }
        }
        __tryOrUnsub(t, e) {
          try {
            t.call(this._context, e);
          } catch (n) {
            if ((this.unsubscribe(), i.useDeprecatedSynchronousErrorHandling)) throw n;
            o(n);
          }
        }
        __tryOrSetError(t, e, n) {
          if (!i.useDeprecatedSynchronousErrorHandling) throw new Error('bad call');
          try {
            e.call(this._context, n);
          } catch (r) {
            return i.useDeprecatedSynchronousErrorHandling
              ? ((t.syncErrorValue = r), (t.syncErrorThrown = !0), !0)
              : (o(r), !0);
          }
          return !1;
        }
        _unsubscribe() {
          const { _parentSubscriber: t } = this;
          (this._context = null), (this._parentSubscriber = null), t.unsubscribe();
        }
      }
      const m = ('function' == typeof Symbol && Symbol.observable) || '@@observable';
      function _(t) {
        return t;
      }
      let y = (() => {
        class t {
          constructor(t) {
            (this._isScalar = !1), t && (this._subscribe = t);
          }
          lift(e) {
            const n = new t();
            return (n.source = this), (n.operator = e), n;
          }
          subscribe(t, e, n) {
            const { operator: r } = this,
              s = (function (t, e, n) {
                if (t) {
                  if (t instanceof f) return t;
                  if (t[p]) return t[p]();
                }
                return t || e || n ? new f(t, e, n) : new f(a);
              })(t, e, n);
            if (
              (s.add(
                r
                  ? r.call(s, this.source)
                  : this.source || (i.useDeprecatedSynchronousErrorHandling && !s.syncErrorThrowable)
                  ? this._subscribe(s)
                  : this._trySubscribe(s)
              ),
              i.useDeprecatedSynchronousErrorHandling &&
                s.syncErrorThrowable &&
                ((s.syncErrorThrowable = !1), s.syncErrorThrown))
            )
              throw s.syncErrorValue;
            return s;
          }
          _trySubscribe(t) {
            try {
              return this._subscribe(t);
            } catch (e) {
              i.useDeprecatedSynchronousErrorHandling && ((t.syncErrorThrown = !0), (t.syncErrorValue = e)),
                (function (t) {
                  for (; t; ) {
                    const { closed: e, destination: n, isStopped: r } = t;
                    if (e || r) return !1;
                    t = n && n instanceof f ? n : null;
                  }
                  return !0;
                })(t)
                  ? t.error(e)
                  : console.warn(e);
            }
          }
          forEach(t, e) {
            return new (e = v(e))((e, n) => {
              let r;
              r = this.subscribe(
                (e) => {
                  try {
                    t(e);
                  } catch (s) {
                    n(s), r && r.unsubscribe();
                  }
                },
                n,
                e
              );
            });
          }
          _subscribe(t) {
            const { source: e } = this;
            return e && e.subscribe(t);
          }
          [m]() {
            return this;
          }
          pipe(...t) {
            return 0 === t.length
              ? this
              : (0 === (e = t).length
                  ? _
                  : 1 === e.length
                  ? e[0]
                  : function (t) {
                      return e.reduce((t, e) => e(t), t);
                    })(this);
            var e;
          }
          toPromise(t) {
            return new (t = v(t))((t, e) => {
              let n;
              this.subscribe(
                (t) => (n = t),
                (t) => e(t),
                () => t(n)
              );
            });
          }
        }
        return (t.create = (e) => new t(e)), t;
      })();
      function v(t) {
        if ((t || (t = i.Promise || Promise), !t)) throw new Error('no Promise impl found');
        return t;
      }
      const b = (() => {
        function t() {
          return (
            Error.call(this), (this.message = 'object unsubscribed'), (this.name = 'ObjectUnsubscribedError'), this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
      class w extends h {
        constructor(t, e) {
          super(), (this.subject = t), (this.subscriber = e), (this.closed = !1);
        }
        unsubscribe() {
          if (this.closed) return;
          this.closed = !0;
          const t = this.subject,
            e = t.observers;
          if (((this.subject = null), !e || 0 === e.length || t.isStopped || t.closed)) return;
          const n = e.indexOf(this.subscriber);
          -1 !== n && e.splice(n, 1);
        }
      }
      class C extends f {
        constructor(t) {
          super(t), (this.destination = t);
        }
      }
      let x = (() => {
        class t extends y {
          constructor() {
            super(),
              (this.observers = []),
              (this.closed = !1),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          [p]() {
            return new C(this);
          }
          lift(t) {
            const e = new S(this, this);
            return (e.operator = t), e;
          }
          next(t) {
            if (this.closed) throw new b();
            if (!this.isStopped) {
              const { observers: e } = this,
                n = e.length,
                r = e.slice();
              for (let s = 0; s < n; s++) r[s].next(t);
            }
          }
          error(t) {
            if (this.closed) throw new b();
            (this.hasError = !0), (this.thrownError = t), (this.isStopped = !0);
            const { observers: e } = this,
              n = e.length,
              r = e.slice();
            for (let s = 0; s < n; s++) r[s].error(t);
            this.observers.length = 0;
          }
          complete() {
            if (this.closed) throw new b();
            this.isStopped = !0;
            const { observers: t } = this,
              e = t.length,
              n = t.slice();
            for (let r = 0; r < e; r++) n[r].complete();
            this.observers.length = 0;
          }
          unsubscribe() {
            (this.isStopped = !0), (this.closed = !0), (this.observers = null);
          }
          _trySubscribe(t) {
            if (this.closed) throw new b();
            return super._trySubscribe(t);
          }
          _subscribe(t) {
            if (this.closed) throw new b();
            return this.hasError
              ? (t.error(this.thrownError), h.EMPTY)
              : this.isStopped
              ? (t.complete(), h.EMPTY)
              : (this.observers.push(t), new w(this, t));
          }
          asObservable() {
            const t = new y();
            return (t.source = this), t;
          }
        }
        return (t.create = (t, e) => new S(t, e)), t;
      })();
      class S extends x {
        constructor(t, e) {
          super(), (this.destination = t), (this.source = e);
        }
        next(t) {
          const { destination: e } = this;
          e && e.next && e.next(t);
        }
        error(t) {
          const { destination: e } = this;
          e && e.error && this.destination.error(t);
        }
        complete() {
          const { destination: t } = this;
          t && t.complete && this.destination.complete();
        }
        _subscribe(t) {
          const { source: e } = this;
          return e ? this.source.subscribe(t) : h.EMPTY;
        }
      }
      function E(t) {
        return t && 'function' == typeof t.schedule;
      }
      function k(t, e) {
        return function (n) {
          if ('function' != typeof t) throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
          return n.lift(new T(t, e));
        };
      }
      class T {
        constructor(t, e) {
          (this.project = t), (this.thisArg = e);
        }
        call(t, e) {
          return e.subscribe(new A(t, this.project, this.thisArg));
        }
      }
      class A extends f {
        constructor(t, e, n) {
          super(t), (this.project = e), (this.count = 0), (this.thisArg = n || this);
        }
        _next(t) {
          let e;
          try {
            e = this.project.call(this.thisArg, t, this.count++);
          } catch (n) {
            return void this.destination.error(n);
          }
          this.destination.next(e);
        }
      }
      const O = (t) => (e) => {
          for (let n = 0, r = t.length; n < r && !e.closed; n++) e.next(t[n]);
          e.complete();
        },
        I = 'function' == typeof Symbol && Symbol.iterator ? Symbol.iterator : '@@iterator',
        R = (t) => t && 'number' == typeof t.length && 'function' != typeof t;
      function P(t) {
        return !!t && 'function' != typeof t.subscribe && 'function' == typeof t.then;
      }
      const D = (t) => {
        if (t && 'function' == typeof t[m])
          return (
            (n = t),
            (t) => {
              const e = n[m]();
              if ('function' != typeof e.subscribe)
                throw new TypeError('Provided object does not correctly implement Symbol.observable');
              return e.subscribe(t);
            }
          );
        if (R(t)) return O(t);
        if (P(t))
          return (
            (t) => (e) =>
              t
                .then(
                  (t) => {
                    e.closed || (e.next(t), e.complete());
                  },
                  (t) => e.error(t)
                )
                .then(null, o),
              e
          )(t);
        if (t && 'function' == typeof t[I])
          return (
            (e = t),
            (t) => {
              const n = e[I]();
              for (;;) {
                let e;
                try {
                  e = n.next();
                } catch (r) {
                  return t.error(r), t;
                }
                if (e.done) {
                  t.complete();
                  break;
                }
                if ((t.next(e.value), t.closed)) break;
              }
              return (
                'function' == typeof n.return &&
                  t.add(() => {
                    n.return && n.return();
                  }),
                t
              );
            }
          );
        {
          const e = c(t) ? 'an invalid object' : `'${t}'`;
          throw new TypeError(
            `You provided ${e} where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.`
          );
        }
        var e, n;
      };
      function L(t, e) {
        return new y((n) => {
          const r = new h();
          let s = 0;
          return (
            r.add(
              e.schedule(function () {
                s !== t.length ? (n.next(t[s++]), n.closed || r.add(this.schedule())) : n.complete();
              })
            ),
            r
          );
        });
      }
      function M(t, e) {
        return e
          ? (function (t, e) {
              if (null != t) {
                if (
                  (function (t) {
                    return t && 'function' == typeof t[m];
                  })(t)
                )
                  return (function (t, e) {
                    return new y((n) => {
                      const r = new h();
                      return (
                        r.add(
                          e.schedule(() => {
                            const s = t[m]();
                            r.add(
                              s.subscribe({
                                next(t) {
                                  r.add(e.schedule(() => n.next(t)));
                                },
                                error(t) {
                                  r.add(e.schedule(() => n.error(t)));
                                },
                                complete() {
                                  r.add(e.schedule(() => n.complete()));
                                },
                              })
                            );
                          })
                        ),
                        r
                      );
                    });
                  })(t, e);
                if (P(t))
                  return (function (t, e) {
                    return new y((n) => {
                      const r = new h();
                      return (
                        r.add(
                          e.schedule(() =>
                            t.then(
                              (t) => {
                                r.add(
                                  e.schedule(() => {
                                    n.next(t), r.add(e.schedule(() => n.complete()));
                                  })
                                );
                              },
                              (t) => {
                                r.add(e.schedule(() => n.error(t)));
                              }
                            )
                          )
                        ),
                        r
                      );
                    });
                  })(t, e);
                if (R(t)) return L(t, e);
                if (
                  (function (t) {
                    return t && 'function' == typeof t[I];
                  })(t) ||
                  'string' == typeof t
                )
                  return (function (t, e) {
                    if (!t) throw new Error('Iterable cannot be null');
                    return new y((n) => {
                      const r = new h();
                      let s;
                      return (
                        r.add(() => {
                          s && 'function' == typeof s.return && s.return();
                        }),
                        r.add(
                          e.schedule(() => {
                            (s = t[I]()),
                              r.add(
                                e.schedule(function () {
                                  if (n.closed) return;
                                  let t, e;
                                  try {
                                    const n = s.next();
                                    (t = n.value), (e = n.done);
                                  } catch (r) {
                                    return void n.error(r);
                                  }
                                  e ? n.complete() : (n.next(t), this.schedule());
                                })
                              );
                          })
                        ),
                        r
                      );
                    });
                  })(t, e);
              }
              throw new TypeError(((null !== t && typeof t) || t) + ' is not observable');
            })(t, e)
          : t instanceof y
          ? t
          : new y(D(t));
      }
      class N extends f {
        constructor(t) {
          super(), (this.parent = t);
        }
        _next(t) {
          this.parent.notifyNext(t);
        }
        _error(t) {
          this.parent.notifyError(t), this.unsubscribe();
        }
        _complete() {
          this.parent.notifyComplete(), this.unsubscribe();
        }
      }
      class V extends f {
        notifyNext(t) {
          this.destination.next(t);
        }
        notifyError(t) {
          this.destination.error(t);
        }
        notifyComplete() {
          this.destination.complete();
        }
      }
      function j(t, e) {
        if (e.closed) return;
        if (t instanceof y) return t.subscribe(e);
        let n;
        try {
          n = D(t)(e);
        } catch (r) {
          e.error(r);
        }
        return n;
      }
      function F(t, e, n = Number.POSITIVE_INFINITY) {
        return 'function' == typeof e
          ? (r) => r.pipe(F((n, r) => M(t(n, r)).pipe(k((t, s) => e(n, t, r, s))), n))
          : ('number' == typeof e && (n = e), (e) => e.lift(new U(t, n)));
      }
      class U {
        constructor(t, e = Number.POSITIVE_INFINITY) {
          (this.project = t), (this.concurrent = e);
        }
        call(t, e) {
          return e.subscribe(new H(t, this.project, this.concurrent));
        }
      }
      class H extends V {
        constructor(t, e, n = Number.POSITIVE_INFINITY) {
          super(t),
            (this.project = e),
            (this.concurrent = n),
            (this.hasCompleted = !1),
            (this.buffer = []),
            (this.active = 0),
            (this.index = 0);
        }
        _next(t) {
          this.active < this.concurrent ? this._tryNext(t) : this.buffer.push(t);
        }
        _tryNext(t) {
          let e;
          const n = this.index++;
          try {
            e = this.project(t, n);
          } catch (r) {
            return void this.destination.error(r);
          }
          this.active++, this._innerSub(e);
        }
        _innerSub(t) {
          const e = new N(this),
            n = this.destination;
          n.add(e);
          const r = j(t, e);
          r !== e && n.add(r);
        }
        _complete() {
          (this.hasCompleted = !0),
            0 === this.active && 0 === this.buffer.length && this.destination.complete(),
            this.unsubscribe();
        }
        notifyNext(t) {
          this.destination.next(t);
        }
        notifyComplete() {
          const t = this.buffer;
          this.active--,
            t.length > 0
              ? this._next(t.shift())
              : 0 === this.active && this.hasCompleted && this.destination.complete();
        }
      }
      function z(t = Number.POSITIVE_INFINITY) {
        return F(_, t);
      }
      function B(t, e) {
        return e ? L(t, e) : new y(O(t));
      }
      function $(...t) {
        let e = Number.POSITIVE_INFINITY,
          n = null,
          r = t[t.length - 1];
        return (
          E(r)
            ? ((n = t.pop()), t.length > 1 && 'number' == typeof t[t.length - 1] && (e = t.pop()))
            : 'number' == typeof r && (e = t.pop()),
          null === n && 1 === t.length && t[0] instanceof y ? t[0] : z(e)(B(t, n))
        );
      }
      function q() {
        return function (t) {
          return t.lift(new W(t));
        };
      }
      class W {
        constructor(t) {
          this.connectable = t;
        }
        call(t, e) {
          const { connectable: n } = this;
          n._refCount++;
          const r = new G(t, n),
            s = e.subscribe(r);
          return r.closed || (r.connection = n.connect()), s;
        }
      }
      class G extends f {
        constructor(t, e) {
          super(t), (this.connectable = e);
        }
        _unsubscribe() {
          const { connectable: t } = this;
          if (!t) return void (this.connection = null);
          this.connectable = null;
          const e = t._refCount;
          if (e <= 0) return void (this.connection = null);
          if (((t._refCount = e - 1), e > 1)) return void (this.connection = null);
          const { connection: n } = this,
            r = t._connection;
          (this.connection = null), !r || (n && r !== n) || r.unsubscribe();
        }
      }
      class Z extends y {
        constructor(t, e) {
          super(), (this.source = t), (this.subjectFactory = e), (this._refCount = 0), (this._isComplete = !1);
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t);
        }
        getSubject() {
          const t = this._subject;
          return (t && !t.isStopped) || (this._subject = this.subjectFactory()), this._subject;
        }
        connect() {
          let t = this._connection;
          return (
            t ||
              ((this._isComplete = !1),
              (t = this._connection = new h()),
              t.add(this.source.subscribe(new Q(this.getSubject(), this))),
              t.closed && ((this._connection = null), (t = h.EMPTY))),
            t
          );
        }
        refCount() {
          return q()(this);
        }
      }
      const K = (() => {
        const t = Z.prototype;
        return {
          operator: { value: null },
          _refCount: { value: 0, writable: !0 },
          _subject: { value: null, writable: !0 },
          _connection: { value: null, writable: !0 },
          _subscribe: { value: t._subscribe },
          _isComplete: { value: t._isComplete, writable: !0 },
          getSubject: { value: t.getSubject },
          connect: { value: t.connect },
          refCount: { value: t.refCount },
        };
      })();
      class Q extends C {
        constructor(t, e) {
          super(t), (this.connectable = e);
        }
        _error(t) {
          this._unsubscribe(), super._error(t);
        }
        _complete() {
          (this.connectable._isComplete = !0), this._unsubscribe(), super._complete();
        }
        _unsubscribe() {
          const t = this.connectable;
          if (t) {
            this.connectable = null;
            const e = t._connection;
            (t._refCount = 0), (t._subject = null), (t._connection = null), e && e.unsubscribe();
          }
        }
      }
      function Y(t, e) {
        return function (n) {
          let r;
          if (
            ((r =
              'function' == typeof t
                ? t
                : function () {
                    return t;
                  }),
            'function' == typeof e)
          )
            return n.lift(new J(r, e));
          const s = Object.create(n, K);
          return (s.source = n), (s.subjectFactory = r), s;
        };
      }
      class J {
        constructor(t, e) {
          (this.subjectFactory = t), (this.selector = e);
        }
        call(t, e) {
          const { selector: n } = this,
            r = this.subjectFactory(),
            s = n(r).subscribe(t);
          return s.add(e.subscribe(r)), s;
        }
      }
      function X() {
        return new x();
      }
      function tt() {
        return (t) => q()(Y(X)(t));
      }
      function et(t) {
        for (let e in t) if (t[e] === et) return e;
        throw Error('Could not find renamed property on target object.');
      }
      function nt(t, e) {
        for (const n in e) e.hasOwnProperty(n) && !t.hasOwnProperty(n) && (t[n] = e[n]);
      }
      function rt(t) {
        if ('string' == typeof t) return t;
        if (Array.isArray(t)) return '[' + t.map(rt).join(', ') + ']';
        if (null == t) return '' + t;
        if (t.overriddenName) return `${t.overriddenName}`;
        if (t.name) return `${t.name}`;
        const e = t.toString();
        if (null == e) return '' + e;
        const n = e.indexOf('\n');
        return -1 === n ? e : e.substring(0, n);
      }
      function st(t, e) {
        return null == t || '' === t ? (null === e ? '' : e) : null == e || '' === e ? t : t + ' ' + e;
      }
      const it = et({ __forward_ref__: et });
      function ot(t) {
        return (
          (t.__forward_ref__ = ot),
          (t.toString = function () {
            return rt(this());
          }),
          t
        );
      }
      function at(t) {
        return lt(t) ? t() : t;
      }
      function lt(t) {
        return 'function' == typeof t && t.hasOwnProperty(it) && t.__forward_ref__ === ot;
      }
      class ct extends Error {
        constructor(t, e) {
          super(
            (function (t, e) {
              return `${t ? `NG0${t}: ` : ''}${e}`;
            })(t, e)
          ),
            (this.code = t);
        }
      }
      function ut(t) {
        return 'string' == typeof t ? t : null == t ? '' : String(t);
      }
      function ht(t) {
        return 'function' == typeof t
          ? t.name || t.toString()
          : 'object' == typeof t && null != t && 'function' == typeof t.type
          ? t.type.name || t.type.toString()
          : ut(t);
      }
      function dt(t, e) {
        const n = e ? ` in ${e}` : '';
        throw new ct('201', `No provider for ${ht(t)} found${n}`);
      }
      function pt(t) {
        return { token: t.token, providedIn: t.providedIn || null, factory: t.factory, value: void 0 };
      }
      function ft(t) {
        return { providers: t.providers || [], imports: t.imports || [] };
      }
      function gt(t) {
        return mt(t, yt) || mt(t, bt);
      }
      function mt(t, e) {
        return t.hasOwnProperty(e) ? t[e] : null;
      }
      function _t(t) {
        return t && (t.hasOwnProperty(vt) || t.hasOwnProperty(wt)) ? t[vt] : null;
      }
      const yt = et({ '\u0275prov': et }),
        vt = et({ '\u0275inj': et }),
        bt = et({ ngInjectableDef: et }),
        wt = et({ ngInjectorDef: et });
      var Ct = (() => (
        ((Ct = Ct || {})[(Ct.Default = 0)] = 'Default'),
        (Ct[(Ct.Host = 1)] = 'Host'),
        (Ct[(Ct.Self = 2)] = 'Self'),
        (Ct[(Ct.SkipSelf = 4)] = 'SkipSelf'),
        (Ct[(Ct.Optional = 8)] = 'Optional'),
        Ct
      ))();
      let xt;
      function St(t) {
        const e = xt;
        return (xt = t), e;
      }
      function Et(t, e, n) {
        const r = gt(t);
        return r && 'root' == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & Ct.Optional
          ? null
          : void 0 !== e
          ? e
          : void dt(rt(t), 'Injector');
      }
      function kt(t) {
        return { toString: t }.toString();
      }
      var Tt = (() => (((Tt = Tt || {})[(Tt.OnPush = 0)] = 'OnPush'), (Tt[(Tt.Default = 1)] = 'Default'), Tt))(),
        At = (() => (
          ((At = At || {})[(At.Emulated = 0)] = 'Emulated'),
          (At[(At.None = 2)] = 'None'),
          (At[(At.ShadowDom = 3)] = 'ShadowDom'),
          At
        ))();
      const Ot = 'undefined' != typeof globalThis && globalThis,
        It = 'undefined' != typeof window && window,
        Rt =
          'undefined' != typeof self &&
          'undefined' != typeof WorkerGlobalScope &&
          self instanceof WorkerGlobalScope &&
          self,
        Pt = 'undefined' != typeof global && global,
        Dt = Ot || Pt || It || Rt,
        Lt = {},
        Mt = [],
        Nt = et({ '\u0275cmp': et }),
        Vt = et({ '\u0275dir': et }),
        jt = et({ '\u0275pipe': et }),
        Ft = et({ '\u0275mod': et }),
        Ut = et({ '\u0275loc': et }),
        Ht = et({ '\u0275fac': et }),
        zt = et({ __NG_ELEMENT_ID__: et });
      let Bt = 0;
      function $t(t) {
        return kt(() => {
          const e = {},
            n = {
              type: t.type,
              providersResolver: null,
              decls: t.decls,
              vars: t.vars,
              factory: null,
              template: t.template || null,
              consts: t.consts || null,
              ngContentSelectors: t.ngContentSelectors,
              hostBindings: t.hostBindings || null,
              hostVars: t.hostVars || 0,
              hostAttrs: t.hostAttrs || null,
              contentQueries: t.contentQueries || null,
              declaredInputs: e,
              inputs: null,
              outputs: null,
              exportAs: t.exportAs || null,
              onPush: t.changeDetection === Tt.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              selectors: t.selectors || Mt,
              viewQuery: t.viewQuery || null,
              features: t.features || null,
              data: t.data || {},
              encapsulation: t.encapsulation || At.Emulated,
              id: 'c',
              styles: t.styles || Mt,
              _: null,
              setInput: null,
              schemas: t.schemas || null,
              tView: null,
            },
            r = t.directives,
            s = t.features,
            i = t.pipes;
          return (
            (n.id += Bt++),
            (n.inputs = Kt(t.inputs, e)),
            (n.outputs = Kt(t.outputs)),
            s && s.forEach((t) => t(n)),
            (n.directiveDefs = r ? () => ('function' == typeof r ? r() : r).map(qt) : null),
            (n.pipeDefs = i ? () => ('function' == typeof i ? i() : i).map(Wt) : null),
            n
          );
        });
      }
      function qt(t) {
        return (
          Jt(t) ||
          (function (t) {
            return t[Vt] || null;
          })(t)
        );
      }
      function Wt(t) {
        return (function (t) {
          return t[jt] || null;
        })(t);
      }
      const Gt = {};
      function Zt(t) {
        return kt(() => {
          const e = {
            type: t.type,
            bootstrap: t.bootstrap || Mt,
            declarations: t.declarations || Mt,
            imports: t.imports || Mt,
            exports: t.exports || Mt,
            transitiveCompileScopes: null,
            schemas: t.schemas || null,
            id: t.id || null,
          };
          return null != t.id && (Gt[t.id] = t.type), e;
        });
      }
      function Kt(t, e) {
        if (null == t) return Lt;
        const n = {};
        for (const r in t)
          if (t.hasOwnProperty(r)) {
            let s = t[r],
              i = s;
            Array.isArray(s) && ((i = s[1]), (s = s[0])), (n[s] = r), e && (e[s] = i);
          }
        return n;
      }
      const Qt = $t;
      function Yt(t) {
        return {
          type: t.type,
          name: t.name,
          factory: null,
          pure: !1 !== t.pure,
          onDestroy: t.type.prototype.ngOnDestroy || null,
        };
      }
      function Jt(t) {
        return t[Nt] || null;
      }
      function Xt(t, e) {
        const n = t[Ft] || null;
        if (!n && !0 === e) throw new Error(`Type ${rt(t)} does not have '\u0275mod' property.`);
        return n;
      }
      const te = 20,
        ee = 10;
      function ne(t) {
        return Array.isArray(t) && 'object' == typeof t[1];
      }
      function re(t) {
        return Array.isArray(t) && !0 === t[1];
      }
      function se(t) {
        return 0 != (8 & t.flags);
      }
      function ie(t) {
        return 2 == (2 & t.flags);
      }
      function oe(t) {
        return 1 == (1 & t.flags);
      }
      function ae(t) {
        return null !== t.template;
      }
      function le(t, e) {
        return t.hasOwnProperty(Ht) ? t[Ht] : null;
      }
      class ce {
        constructor(t, e, n) {
          (this.previousValue = t), (this.currentValue = e), (this.firstChange = n);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function ue() {
        return he;
      }
      function he(t) {
        return t.type.prototype.ngOnChanges && (t.setInput = pe), de;
      }
      function de() {
        const t = fe(this),
          e = null == t ? void 0 : t.current;
        if (e) {
          const n = t.previous;
          if (n === Lt) t.previous = e;
          else for (let t in e) n[t] = e[t];
          (t.current = null), this.ngOnChanges(e);
        }
      }
      function pe(t, e, n, r) {
        const s =
            fe(t) ||
            (function (t, e) {
              return (t.__ngSimpleChanges__ = e);
            })(t, { previous: Lt, current: null }),
          i = s.current || (s.current = {}),
          o = s.previous,
          a = this.declaredInputs[n],
          l = o[a];
        (i[a] = new ce(l && l.currentValue, e, o === Lt)), (t[r] = e);
      }
      function fe(t) {
        return t.__ngSimpleChanges__ || null;
      }
      let ge;
      function me(t) {
        return !!t.listen;
      }
      ue.ngInherit = !0;
      const _e = {
        createRenderer: (t, e) => (void 0 !== ge ? ge : 'undefined' != typeof document ? document : void 0),
      };
      function ye(t) {
        for (; Array.isArray(t); ) t = t[0];
        return t;
      }
      function ve(t, e) {
        return ye(e[t]);
      }
      function be(t, e) {
        return ye(e[t.index]);
      }
      function we(t, e) {
        return t.data[e];
      }
      function Ce(t, e) {
        return t[e];
      }
      function xe(t, e) {
        const n = e[t];
        return ne(n) ? n : n[0];
      }
      function Se(t) {
        return 4 == (4 & t[2]);
      }
      function Ee(t) {
        return 128 == (128 & t[2]);
      }
      function ke(t, e) {
        return null == e ? null : t[e];
      }
      function Te(t) {
        t[18] = 0;
      }
      function Ae(t, e) {
        t[5] += e;
        let n = t,
          r = t[3];
        for (; null !== r && ((1 === e && 1 === n[5]) || (-1 === e && 0 === n[5])); ) (r[5] += e), (n = r), (r = r[3]);
      }
      const Oe = { lFrame: Ye(null), bindingsEnabled: !0, isInCheckNoChangesMode: !1 };
      function Ie() {
        return Oe.bindingsEnabled;
      }
      function Re() {
        return Oe.lFrame.lView;
      }
      function Pe() {
        return Oe.lFrame.tView;
      }
      function De() {
        let t = Le();
        for (; null !== t && 64 === t.type; ) t = t.parent;
        return t;
      }
      function Le() {
        return Oe.lFrame.currentTNode;
      }
      function Me(t, e) {
        const n = Oe.lFrame;
        (n.currentTNode = t), (n.isParent = e);
      }
      function Ne() {
        return Oe.lFrame.isParent;
      }
      function Ve() {
        Oe.lFrame.isParent = !1;
      }
      function je() {
        return Oe.isInCheckNoChangesMode;
      }
      function Fe(t) {
        Oe.isInCheckNoChangesMode = t;
      }
      function Ue() {
        const t = Oe.lFrame;
        let e = t.bindingRootIndex;
        return -1 === e && (e = t.bindingRootIndex = t.tView.bindingStartIndex), e;
      }
      function He() {
        return Oe.lFrame.bindingIndex++;
      }
      function ze(t) {
        const e = Oe.lFrame,
          n = e.bindingIndex;
        return (e.bindingIndex = e.bindingIndex + t), n;
      }
      function Be(t, e) {
        const n = Oe.lFrame;
        (n.bindingIndex = n.bindingRootIndex = t), $e(e);
      }
      function $e(t) {
        Oe.lFrame.currentDirectiveIndex = t;
      }
      function qe() {
        return Oe.lFrame.currentQueryIndex;
      }
      function We(t) {
        Oe.lFrame.currentQueryIndex = t;
      }
      function Ge(t) {
        const e = t[1];
        return 2 === e.type ? e.declTNode : 1 === e.type ? t[6] : null;
      }
      function Ze(t, e, n) {
        if (n & Ct.SkipSelf) {
          let r = e,
            s = t;
          for (
            ;
            (r = r.parent), !(null !== r || n & Ct.Host || ((r = Ge(s)), null === r) || ((s = s[15]), 10 & r.type));

          );
          if (null === r) return !1;
          (e = r), (t = s);
        }
        const r = (Oe.lFrame = Qe());
        return (r.currentTNode = e), (r.lView = t), !0;
      }
      function Ke(t) {
        const e = Qe(),
          n = t[1];
        (Oe.lFrame = e),
          (e.currentTNode = n.firstChild),
          (e.lView = t),
          (e.tView = n),
          (e.contextLView = t),
          (e.bindingIndex = n.bindingStartIndex),
          (e.inI18n = !1);
      }
      function Qe() {
        const t = Oe.lFrame,
          e = null === t ? null : t.child;
        return null === e ? Ye(t) : e;
      }
      function Ye(t) {
        const e = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: t,
          child: null,
          inI18n: !1,
        };
        return null !== t && (t.child = e), e;
      }
      function Je() {
        const t = Oe.lFrame;
        return (Oe.lFrame = t.parent), (t.currentTNode = null), (t.lView = null), t;
      }
      const Xe = Je;
      function tn() {
        const t = Je();
        (t.isParent = !0),
          (t.tView = null),
          (t.selectedIndex = -1),
          (t.contextLView = null),
          (t.elementDepthCount = 0),
          (t.currentDirectiveIndex = -1),
          (t.currentNamespace = null),
          (t.bindingRootIndex = -1),
          (t.bindingIndex = -1),
          (t.currentQueryIndex = 0);
      }
      function en() {
        return Oe.lFrame.selectedIndex;
      }
      function nn(t) {
        Oe.lFrame.selectedIndex = t;
      }
      function rn() {
        const t = Oe.lFrame;
        return we(t.tView, t.selectedIndex);
      }
      function sn(t, e) {
        for (let n = e.directiveStart, r = e.directiveEnd; n < r; n++) {
          const e = t.data[n].type.prototype,
            {
              ngAfterContentInit: r,
              ngAfterContentChecked: s,
              ngAfterViewInit: i,
              ngAfterViewChecked: o,
              ngOnDestroy: a,
            } = e;
          r && (t.contentHooks || (t.contentHooks = [])).push(-n, r),
            s &&
              ((t.contentHooks || (t.contentHooks = [])).push(n, s),
              (t.contentCheckHooks || (t.contentCheckHooks = [])).push(n, s)),
            i && (t.viewHooks || (t.viewHooks = [])).push(-n, i),
            o &&
              ((t.viewHooks || (t.viewHooks = [])).push(n, o),
              (t.viewCheckHooks || (t.viewCheckHooks = [])).push(n, o)),
            null != a && (t.destroyHooks || (t.destroyHooks = [])).push(n, a);
        }
      }
      function on(t, e, n) {
        cn(t, e, 3, n);
      }
      function an(t, e, n, r) {
        (3 & t[2]) === n && cn(t, e, n, r);
      }
      function ln(t, e) {
        let n = t[2];
        (3 & n) === e && ((n &= 2047), (n += 1), (t[2] = n));
      }
      function cn(t, e, n, r) {
        const s = null != r ? r : -1,
          i = e.length - 1;
        let o = 0;
        for (let a = void 0 !== r ? 65535 & t[18] : 0; a < i; a++)
          if ('number' == typeof e[a + 1]) {
            if (((o = e[a]), null != r && o >= r)) break;
          } else
            e[a] < 0 && (t[18] += 65536),
              (o < s || -1 == s) && (un(t, n, e, a), (t[18] = (4294901760 & t[18]) + a + 2)),
              a++;
      }
      function un(t, e, n, r) {
        const s = n[r] < 0,
          i = n[r + 1],
          o = t[s ? -n[r] : n[r]];
        if (s) {
          if (t[2] >> 11 < t[18] >> 16 && (3 & t[2]) === e) {
            t[2] += 2048;
            try {
              i.call(o);
            } finally {
            }
          }
        } else
          try {
            i.call(o);
          } finally {
          }
      }
      const hn = -1;
      class dn {
        constructor(t, e, n) {
          (this.factory = t), (this.resolving = !1), (this.canSeeViewProviders = e), (this.injectImpl = n);
        }
      }
      function pn(t, e, n) {
        const r = me(t);
        let s = 0;
        for (; s < n.length; ) {
          const i = n[s];
          if ('number' == typeof i) {
            if (0 !== i) break;
            s++;
            const o = n[s++],
              a = n[s++],
              l = n[s++];
            r ? t.setAttribute(e, a, l, o) : e.setAttributeNS(o, a, l);
          } else {
            const o = i,
              a = n[++s];
            gn(o) ? r && t.setProperty(e, o, a) : r ? t.setAttribute(e, o, a) : e.setAttribute(o, a), s++;
          }
        }
        return s;
      }
      function fn(t) {
        return 3 === t || 4 === t || 6 === t;
      }
      function gn(t) {
        return 64 === t.charCodeAt(0);
      }
      function mn(t, e) {
        if (null === e || 0 === e.length);
        else if (null === t || 0 === t.length) t = e.slice();
        else {
          let n = -1;
          for (let r = 0; r < e.length; r++) {
            const s = e[r];
            'number' == typeof s ? (n = s) : 0 === n || _n(t, n, s, null, -1 === n || 2 === n ? e[++r] : null);
          }
        }
        return t;
      }
      function _n(t, e, n, r, s) {
        let i = 0,
          o = t.length;
        if (-1 === e) o = -1;
        else
          for (; i < t.length; ) {
            const n = t[i++];
            if ('number' == typeof n) {
              if (n === e) {
                o = -1;
                break;
              }
              if (n > e) {
                o = i - 1;
                break;
              }
            }
          }
        for (; i < t.length; ) {
          const e = t[i];
          if ('number' == typeof e) break;
          if (e === n) {
            if (null === r) return void (null !== s && (t[i + 1] = s));
            if (r === t[i + 1]) return void (t[i + 2] = s);
          }
          i++, null !== r && i++, null !== s && i++;
        }
        -1 !== o && (t.splice(o, 0, e), (i = o + 1)),
          t.splice(i++, 0, n),
          null !== r && t.splice(i++, 0, r),
          null !== s && t.splice(i++, 0, s);
      }
      function yn(t) {
        return t !== hn;
      }
      function vn(t) {
        return 32767 & t;
      }
      function bn(t, e) {
        let n = t >> 16,
          r = e;
        for (; n > 0; ) (r = r[15]), n--;
        return r;
      }
      let wn = !0;
      function Cn(t) {
        const e = wn;
        return (wn = t), e;
      }
      let xn = 0;
      function Sn(t, e) {
        const n = kn(t, e);
        if (-1 !== n) return n;
        const r = e[1];
        r.firstCreatePass && ((t.injectorIndex = e.length), En(r.data, t), En(e, null), En(r.blueprint, null));
        const s = Tn(t, e),
          i = t.injectorIndex;
        if (yn(s)) {
          const t = vn(s),
            n = bn(s, e),
            r = n[1].data;
          for (let s = 0; s < 8; s++) e[i + s] = n[t + s] | r[t + s];
        }
        return (e[i + 8] = s), i;
      }
      function En(t, e) {
        t.push(0, 0, 0, 0, 0, 0, 0, 0, e);
      }
      function kn(t, e) {
        return -1 === t.injectorIndex ||
          (t.parent && t.parent.injectorIndex === t.injectorIndex) ||
          null === e[t.injectorIndex + 8]
          ? -1
          : t.injectorIndex;
      }
      function Tn(t, e) {
        if (t.parent && -1 !== t.parent.injectorIndex) return t.parent.injectorIndex;
        let n = 0,
          r = null,
          s = e;
        for (; null !== s; ) {
          const t = s[1],
            e = t.type;
          if (((r = 2 === e ? t.declTNode : 1 === e ? s[6] : null), null === r)) return hn;
          if ((n++, (s = s[15]), -1 !== r.injectorIndex)) return r.injectorIndex | (n << 16);
        }
        return hn;
      }
      function An(t, e, n) {
        !(function (t, e, n) {
          let r;
          'string' == typeof n ? (r = n.charCodeAt(0) || 0) : n.hasOwnProperty(zt) && (r = n[zt]),
            null == r && (r = n[zt] = xn++);
          const s = 255 & r;
          e.data[t + (s >> 5)] |= 1 << s;
        })(t, e, n);
      }
      function On(t, e, n) {
        if (n & Ct.Optional) return t;
        dt(e, 'NodeInjector');
      }
      function In(t, e, n, r) {
        if ((n & Ct.Optional && void 0 === r && (r = null), 0 == (n & (Ct.Self | Ct.Host)))) {
          const s = t[9],
            i = St(void 0);
          try {
            return s ? s.get(e, r, n & Ct.Optional) : Et(e, r, n & Ct.Optional);
          } finally {
            St(i);
          }
        }
        return On(r, e, n);
      }
      function Rn(t, e, n, r = Ct.Default, s) {
        if (null !== t) {
          const i = (function (t) {
            if ('string' == typeof t) return t.charCodeAt(0) || 0;
            const e = t.hasOwnProperty(zt) ? t[zt] : void 0;
            return 'number' == typeof e ? (e >= 0 ? 255 & e : Dn) : e;
          })(n);
          if ('function' == typeof i) {
            if (!Ze(e, t, r)) return r & Ct.Host ? On(s, n, r) : In(e, n, r, s);
            try {
              const t = i(r);
              if (null != t || r & Ct.Optional) return t;
              dt(n);
            } finally {
              Xe();
            }
          } else if ('number' == typeof i) {
            let s = null,
              o = kn(t, e),
              a = hn,
              l = r & Ct.Host ? e[16][6] : null;
            for (
              (-1 === o || r & Ct.SkipSelf) &&
              ((a = -1 === o ? Tn(t, e) : e[o + 8]),
              a !== hn && jn(r, !1) ? ((s = e[1]), (o = vn(a)), (e = bn(a, e))) : (o = -1));
              -1 !== o;

            ) {
              const t = e[1];
              if (Vn(i, o, t.data)) {
                const t = Ln(o, e, n, s, r, l);
                if (t !== Pn) return t;
              }
              (a = e[o + 8]),
                a !== hn && jn(r, e[1].data[o + 8] === l) && Vn(i, o, e)
                  ? ((s = t), (o = vn(a)), (e = bn(a, e)))
                  : (o = -1);
            }
          }
        }
        return In(e, n, r, s);
      }
      const Pn = {};
      function Dn() {
        return new Fn(De(), Re());
      }
      function Ln(t, e, n, r, s, i) {
        const o = e[1],
          a = o.data[t + 8],
          l = Mn(a, o, n, null == r ? ie(a) && wn : r != o && 0 != (3 & a.type), s & Ct.Host && i === a);
        return null !== l ? Nn(e, o, l, a) : Pn;
      }
      function Mn(t, e, n, r, s) {
        const i = t.providerIndexes,
          o = e.data,
          a = 1048575 & i,
          l = t.directiveStart,
          c = i >> 20,
          u = s ? a + c : t.directiveEnd;
        for (let h = r ? a : a + c; h < u; h++) {
          const t = o[h];
          if ((h < l && n === t) || (h >= l && t.type === n)) return h;
        }
        if (s) {
          const t = o[l];
          if (t && ae(t) && t.type === n) return l;
        }
        return null;
      }
      function Nn(t, e, n, r) {
        let s = t[n];
        const i = e.data;
        if (s instanceof dn) {
          const o = s;
          o.resolving &&
            (function (t, e) {
              throw new ct('200', `Circular dependency in DI detected for ${t}`);
            })(ht(i[n]));
          const a = Cn(o.canSeeViewProviders);
          o.resolving = !0;
          const l = o.injectImpl ? St(o.injectImpl) : null;
          Ze(t, r, Ct.Default);
          try {
            (s = t[n] = o.factory(void 0, i, t, r)),
              e.firstCreatePass &&
                n >= r.directiveStart &&
                (function (t, e, n) {
                  const { ngOnChanges: r, ngOnInit: s, ngDoCheck: i } = e.type.prototype;
                  if (r) {
                    const r = he(e);
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(t, r),
                      (n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(t, r);
                  }
                  s && (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - t, s),
                    i &&
                      ((n.preOrderHooks || (n.preOrderHooks = [])).push(t, i),
                      (n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(t, i));
                })(n, i[n], e);
          } finally {
            null !== l && St(l), Cn(a), (o.resolving = !1), Xe();
          }
        }
        return s;
      }
      function Vn(t, e, n) {
        return !!(n[e + (t >> 5)] & (1 << t));
      }
      function jn(t, e) {
        return !(t & Ct.Self || (t & Ct.Host && e));
      }
      class Fn {
        constructor(t, e) {
          (this._tNode = t), (this._lView = e);
        }
        get(t, e) {
          return Rn(this._tNode, this._lView, t, void 0, e);
        }
      }
      function Un(t) {
        return kt(() => {
          const e = t.prototype.constructor,
            n = e[Ht] || Hn(e),
            r = Object.prototype;
          let s = Object.getPrototypeOf(t.prototype).constructor;
          for (; s && s !== r; ) {
            const t = s[Ht] || Hn(s);
            if (t && t !== n) return t;
            s = Object.getPrototypeOf(s);
          }
          return (t) => new t();
        });
      }
      function Hn(t) {
        return lt(t)
          ? () => {
              const e = Hn(at(t));
              return e && e();
            }
          : le(t);
      }
      function zn(t) {
        return (function (t, e) {
          if ('class' === e) return t.classes;
          if ('style' === e) return t.styles;
          const n = t.attrs;
          if (n) {
            const t = n.length;
            let r = 0;
            for (; r < t; ) {
              const s = n[r];
              if (fn(s)) break;
              if (0 === s) r += 2;
              else if ('number' == typeof s) for (r++; r < t && 'string' == typeof n[r]; ) r++;
              else {
                if (s === e) return n[r + 1];
                r += 2;
              }
            }
          }
          return null;
        })(De(), t);
      }
      const Bn = '__parameters__';
      function $n(t, e, n) {
        return kt(() => {
          const r = (function (t) {
            return function (...e) {
              if (t) {
                const n = t(...e);
                for (const t in n) this[t] = n[t];
              }
            };
          })(e);
          function s(...t) {
            if (this instanceof s) return r.apply(this, t), this;
            const e = new s(...t);
            return (n.annotation = e), n;
            function n(t, n, r) {
              const s = t.hasOwnProperty(Bn) ? t[Bn] : Object.defineProperty(t, Bn, { value: [] })[Bn];
              for (; s.length <= r; ) s.push(null);
              return (s[r] = s[r] || []).push(e), t;
            }
          }
          return (
            n && (s.prototype = Object.create(n.prototype)), (s.prototype.ngMetadataName = t), (s.annotationCls = s), s
          );
        });
      }
      class qn {
        constructor(t, e) {
          (this._desc = t),
            (this.ngMetadataName = 'InjectionToken'),
            (this.??prov = void 0),
            'number' == typeof e
              ? (this.__NG_ELEMENT_ID__ = e)
              : void 0 !== e &&
                (this.??prov = pt({ token: this, providedIn: e.providedIn || 'root', factory: e.factory }));
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      const Wn = new qn('AnalyzeForEntryComponents'),
        Gn = Function;
      function Zn(t, e) {
        void 0 === e && (e = t);
        for (let n = 0; n < t.length; n++) {
          let r = t[n];
          Array.isArray(r) ? (e === t && (e = t.slice(0, n)), Zn(r, e)) : e !== t && e.push(r);
        }
        return e;
      }
      function Kn(t, e) {
        t.forEach((t) => (Array.isArray(t) ? Kn(t, e) : e(t)));
      }
      function Qn(t, e, n) {
        e >= t.length ? t.push(n) : t.splice(e, 0, n);
      }
      function Yn(t, e) {
        return e >= t.length - 1 ? t.pop() : t.splice(e, 1)[0];
      }
      function Jn(t, e) {
        const n = [];
        for (let r = 0; r < t; r++) n.push(e);
        return n;
      }
      function Xn(t, e, n) {
        let r = er(t, e);
        return (
          r >= 0
            ? (t[1 | r] = n)
            : ((r = ~r),
              (function (t, e, n, r) {
                let s = t.length;
                if (s == e) t.push(n, r);
                else if (1 === s) t.push(r, t[0]), (t[0] = n);
                else {
                  for (s--, t.push(t[s - 1], t[s]); s > e; ) (t[s] = t[s - 2]), s--;
                  (t[e] = n), (t[e + 1] = r);
                }
              })(t, r, e, n)),
          r
        );
      }
      function tr(t, e) {
        const n = er(t, e);
        if (n >= 0) return t[1 | n];
      }
      function er(t, e) {
        return (function (t, e, n) {
          let r = 0,
            s = t.length >> 1;
          for (; s !== r; ) {
            const n = r + ((s - r) >> 1),
              i = t[n << 1];
            if (e === i) return n << 1;
            i > e ? (s = n) : (r = n + 1);
          }
          return ~(s << 1);
        })(t, e);
      }
      const nr = {},
        rr = /\n/gm,
        sr = '__source',
        ir = et({ provide: String, useValue: et });
      let or;
      function ar(t) {
        const e = or;
        return (or = t), e;
      }
      function lr(t, e = Ct.Default) {
        if (void 0 === or) throw new Error('inject() must be called from an injection context');
        return null === or ? Et(t, void 0, e) : or.get(t, e & Ct.Optional ? null : void 0, e);
      }
      function cr(t, e = Ct.Default) {
        return (xt || lr)(at(t), e);
      }
      const ur = cr;
      function hr(t) {
        const e = [];
        for (let n = 0; n < t.length; n++) {
          const r = at(t[n]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new Error('Arguments array must have arguments.');
            let t,
              n = Ct.Default;
            for (let e = 0; e < r.length; e++) {
              const s = r[e],
                i = s.__NG_DI_FLAG__;
              'number' == typeof i ? (-1 === i ? (t = s.token) : (n |= i)) : (t = s);
            }
            e.push(cr(t, n));
          } else e.push(cr(r));
        }
        return e;
      }
      function dr(t, e) {
        return (t.__NG_DI_FLAG__ = e), (t.prototype.__NG_DI_FLAG__ = e), t;
      }
      const pr = dr(
          $n('Inject', (t) => ({ token: t })),
          -1
        ),
        fr = dr($n('Optional'), 8),
        gr = dr($n('SkipSelf'), 4);
      let mr;
      function _r(t) {
        var e;
        return (
          (null ===
            (e = (function () {
              if (void 0 === mr && ((mr = null), Dt.trustedTypes))
                try {
                  mr = Dt.trustedTypes.createPolicy('angular', {
                    createHTML: (t) => t,
                    createScript: (t) => t,
                    createScriptURL: (t) => t,
                  });
                } catch (e) {}
              return mr;
            })()) || void 0 === e
            ? void 0
            : e.createHTML(t)) || t
        );
      }
      class yr {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`;
        }
      }
      class vr extends yr {
        getTypeName() {
          return 'HTML';
        }
      }
      class br extends yr {
        getTypeName() {
          return 'Style';
        }
      }
      class wr extends yr {
        getTypeName() {
          return 'Script';
        }
      }
      class Cr extends yr {
        getTypeName() {
          return 'URL';
        }
      }
      class xr extends yr {
        getTypeName() {
          return 'ResourceURL';
        }
      }
      function Sr(t) {
        return t instanceof yr ? t.changingThisBreaksApplicationSecurity : t;
      }
      function Er(t, e) {
        const n = kr(t);
        if (null != n && n !== e) {
          if ('ResourceURL' === n && 'URL' === e) return !0;
          throw new Error(`Required a safe ${e}, got a ${n} (see https://g.co/ng/security#xss)`);
        }
        return n === e;
      }
      function kr(t) {
        return (t instanceof yr && t.getTypeName()) || null;
      }
      class Tr {
        constructor(t) {
          this.inertDocumentHelper = t;
        }
        getInertBodyElement(t) {
          t = '<body><remove></remove>' + t;
          try {
            const e = new window.DOMParser().parseFromString(_r(t), 'text/html').body;
            return null === e ? this.inertDocumentHelper.getInertBodyElement(t) : (e.removeChild(e.firstChild), e);
          } catch (e) {
            return null;
          }
        }
      }
      class Ar {
        constructor(t) {
          if (
            ((this.defaultDoc = t),
            (this.inertDocument = this.defaultDoc.implementation.createHTMLDocument('sanitization-inert')),
            null == this.inertDocument.body)
          ) {
            const t = this.inertDocument.createElement('html');
            this.inertDocument.appendChild(t);
            const e = this.inertDocument.createElement('body');
            t.appendChild(e);
          }
        }
        getInertBodyElement(t) {
          const e = this.inertDocument.createElement('template');
          if ('content' in e) return (e.innerHTML = _r(t)), e;
          const n = this.inertDocument.createElement('body');
          return (n.innerHTML = _r(t)), this.defaultDoc.documentMode && this.stripCustomNsAttrs(n), n;
        }
        stripCustomNsAttrs(t) {
          const e = t.attributes;
          for (let r = e.length - 1; 0 < r; r--) {
            const n = e.item(r).name;
            ('xmlns:ns1' !== n && 0 !== n.indexOf('ns1:')) || t.removeAttribute(n);
          }
          let n = t.firstChild;
          for (; n; ) n.nodeType === Node.ELEMENT_NODE && this.stripCustomNsAttrs(n), (n = n.nextSibling);
        }
      }
      const Or = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi,
        Ir =
          /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
      function Rr(t) {
        return (t = String(t)).match(Or) || t.match(Ir) ? t : 'unsafe:' + t;
      }
      function Pr(t) {
        const e = {};
        for (const n of t.split(',')) e[n] = !0;
        return e;
      }
      function Dr(...t) {
        const e = {};
        for (const n of t) for (const t in n) n.hasOwnProperty(t) && (e[t] = !0);
        return e;
      }
      const Lr = Pr('area,br,col,hr,img,wbr'),
        Mr = Pr('colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr'),
        Nr = Pr('rp,rt'),
        Vr = Dr(Nr, Mr),
        jr = Dr(
          Lr,
          Dr(
            Mr,
            Pr(
              'address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul'
            )
          ),
          Dr(
            Nr,
            Pr(
              'a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video'
            )
          ),
          Vr
        ),
        Fr = Pr('background,cite,href,itemtype,longdesc,poster,src,xlink:href'),
        Ur = Pr('srcset'),
        Hr = Dr(
          Fr,
          Ur,
          Pr(
            'abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width'
          ),
          Pr(
            'aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext'
          )
        ),
        zr = Pr('script,style,template');
      class Br {
        constructor() {
          (this.sanitizedSomething = !1), (this.buf = []);
        }
        sanitizeChildren(t) {
          let e = t.firstChild,
            n = !0;
          for (; e; )
            if (
              (e.nodeType === Node.ELEMENT_NODE
                ? (n = this.startElement(e))
                : e.nodeType === Node.TEXT_NODE
                ? this.chars(e.nodeValue)
                : (this.sanitizedSomething = !0),
              n && e.firstChild)
            )
              e = e.firstChild;
            else
              for (; e; ) {
                e.nodeType === Node.ELEMENT_NODE && this.endElement(e);
                let t = this.checkClobberedElement(e, e.nextSibling);
                if (t) {
                  e = t;
                  break;
                }
                e = this.checkClobberedElement(e, e.parentNode);
              }
          return this.buf.join('');
        }
        startElement(t) {
          const e = t.nodeName.toLowerCase();
          if (!jr.hasOwnProperty(e)) return (this.sanitizedSomething = !0), !zr.hasOwnProperty(e);
          this.buf.push('<'), this.buf.push(e);
          const n = t.attributes;
          for (let s = 0; s < n.length; s++) {
            const t = n.item(s),
              e = t.name,
              i = e.toLowerCase();
            if (!Hr.hasOwnProperty(i)) {
              this.sanitizedSomething = !0;
              continue;
            }
            let o = t.value;
            Fr[i] && (o = Rr(o)),
              Ur[i] &&
                ((r = o),
                (o = (r = String(r))
                  .split(',')
                  .map((t) => Rr(t.trim()))
                  .join(', '))),
              this.buf.push(' ', e, '="', Wr(o), '"');
          }
          var r;
          return this.buf.push('>'), !0;
        }
        endElement(t) {
          const e = t.nodeName.toLowerCase();
          jr.hasOwnProperty(e) && !Lr.hasOwnProperty(e) && (this.buf.push('</'), this.buf.push(e), this.buf.push('>'));
        }
        chars(t) {
          this.buf.push(Wr(t));
        }
        checkClobberedElement(t, e) {
          if (
            e &&
            (t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_CONTAINED_BY) === Node.DOCUMENT_POSITION_CONTAINED_BY
          )
            throw new Error(`Failed to sanitize html because the element is clobbered: ${t.outerHTML}`);
          return e;
        }
      }
      const $r = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
        qr = /([^\#-~ |!])/g;
      function Wr(t) {
        return t
          .replace(/&/g, '&amp;')
          .replace($r, function (t) {
            return '&#' + (1024 * (t.charCodeAt(0) - 55296) + (t.charCodeAt(1) - 56320) + 65536) + ';';
          })
          .replace(qr, function (t) {
            return '&#' + t.charCodeAt(0) + ';';
          })
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
      }
      let Gr;
      function Zr(t) {
        return 'content' in t &&
          (function (t) {
            return t.nodeType === Node.ELEMENT_NODE && 'TEMPLATE' === t.nodeName;
          })(t)
          ? t.content
          : null;
      }
      var Kr = (() => (
        ((Kr = Kr || {})[(Kr.NONE = 0)] = 'NONE'),
        (Kr[(Kr.HTML = 1)] = 'HTML'),
        (Kr[(Kr.STYLE = 2)] = 'STYLE'),
        (Kr[(Kr.SCRIPT = 3)] = 'SCRIPT'),
        (Kr[(Kr.URL = 4)] = 'URL'),
        (Kr[(Kr.RESOURCE_URL = 5)] = 'RESOURCE_URL'),
        Kr
      ))();
      function Qr(t) {
        const e = (function () {
          const t = Re();
          return t && t[12];
        })();
        return e ? e.sanitize(Kr.URL, t) || '' : Er(t, 'URL') ? Sr(t) : Rr(ut(t));
      }
      function Yr(t, e) {
        t.__ngContext__ = e;
      }
      function Jr(t) {
        const e = (function (t) {
          return t.__ngContext__ || null;
        })(t);
        return e ? (Array.isArray(e) ? e : e.lView) : null;
      }
      function Xr(t) {
        return t.ngOriginalError;
      }
      function ts(t, ...e) {
        t.error(...e);
      }
      class es {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const e = this._findOriginalError(t),
            n = this._findContext(t),
            r = (function (t) {
              return (t && t.ngErrorLogger) || ts;
            })(t);
          r(this._console, 'ERROR', t),
            e && r(this._console, 'ORIGINAL ERROR', e),
            n && r(this._console, 'ERROR CONTEXT', n);
        }
        _findContext(t) {
          return t
            ? (function (t) {
                return t.ngDebugContext;
              })(t) || this._findContext(Xr(t))
            : null;
        }
        _findOriginalError(t) {
          let e = t && Xr(t);
          for (; e && Xr(e); ) e = Xr(e);
          return e || null;
        }
      }
      const ns = (() =>
        (('undefined' != typeof requestAnimationFrame && requestAnimationFrame) || setTimeout).bind(Dt))();
      function rs(t) {
        return t instanceof Function ? t() : t;
      }
      var ss = (() => (
        ((ss = ss || {})[(ss.Important = 1)] = 'Important'), (ss[(ss.DashCase = 2)] = 'DashCase'), ss
      ))();
      function is(t, e) {
        return (void 0)(t, e);
      }
      function os(t) {
        const e = t[3];
        return re(e) ? e[3] : e;
      }
      function as(t) {
        return cs(t[13]);
      }
      function ls(t) {
        return cs(t[4]);
      }
      function cs(t) {
        for (; null !== t && !re(t); ) t = t[4];
        return t;
      }
      function us(t, e, n, r, s) {
        if (null != r) {
          let i,
            o = !1;
          re(r) ? (i = r) : ne(r) && ((o = !0), (r = r[0]));
          const a = ye(r);
          0 === t && null !== n
            ? null == s
              ? ys(e, n, a)
              : _s(e, n, a, s || null, !0)
            : 1 === t && null !== n
            ? _s(e, n, a, s || null, !0)
            : 2 === t
            ? (function (t, e, n) {
                const r = bs(t, e);
                r &&
                  (function (t, e, n, r) {
                    me(t) ? t.removeChild(e, n, r) : e.removeChild(n);
                  })(t, r, e, n);
              })(e, a, o)
            : 3 === t && e.destroyNode(a),
            null != i &&
              (function (t, e, n, r, s) {
                const i = n[7];
                i !== ye(n) && us(e, t, r, i, s);
                for (let o = ee; o < n.length; o++) {
                  const s = n[o];
                  As(s[1], s, t, e, r, i);
                }
              })(e, t, i, n, s);
        }
      }
      function hs(t, e, n) {
        return me(t) ? t.createElement(e, n) : null === n ? t.createElement(e) : t.createElementNS(n, e);
      }
      function ds(t, e) {
        const n = t[9],
          r = n.indexOf(e),
          s = e[3];
        1024 & e[2] && ((e[2] &= -1025), Ae(s, -1)), n.splice(r, 1);
      }
      function ps(t, e) {
        if (t.length <= ee) return;
        const n = ee + e,
          r = t[n];
        if (r) {
          const i = r[17];
          null !== i && i !== t && ds(i, r), e > 0 && (t[n - 1][4] = r[4]);
          const o = Yn(t, ee + e);
          As(r[1], (s = r), s[11], 2, null, null), (s[0] = null), (s[6] = null);
          const a = o[19];
          null !== a && a.detachView(o[1]), (r[3] = null), (r[4] = null), (r[2] &= -129);
        }
        var s;
        return r;
      }
      function fs(t, e) {
        if (!(256 & e[2])) {
          const n = e[11];
          me(n) && n.destroyNode && As(t, e, n, 3, null, null),
            (function (t) {
              let e = t[13];
              if (!e) return gs(t[1], t);
              for (; e; ) {
                let n = null;
                if (ne(e)) n = e[13];
                else {
                  const t = e[10];
                  t && (n = t);
                }
                if (!n) {
                  for (; e && !e[4] && e !== t; ) ne(e) && gs(e[1], e), (e = e[3]);
                  null === e && (e = t), ne(e) && gs(e[1], e), (n = e && e[4]);
                }
                e = n;
              }
            })(e);
        }
      }
      function gs(t, e) {
        if (!(256 & e[2])) {
          (e[2] &= -129),
            (e[2] |= 256),
            (function (t, e) {
              let n;
              if (null != t && null != (n = t.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const t = e[n[r]];
                  if (!(t instanceof dn)) {
                    const e = n[r + 1];
                    if (Array.isArray(e))
                      for (let n = 0; n < e.length; n += 2) {
                        const r = t[e[n]],
                          s = e[n + 1];
                        try {
                          s.call(r);
                        } finally {
                        }
                      }
                    else
                      try {
                        e.call(t);
                      } finally {
                      }
                  }
                }
            })(t, e),
            (function (t, e) {
              const n = t.cleanup,
                r = e[7];
              let s = -1;
              if (null !== n)
                for (let i = 0; i < n.length - 1; i += 2)
                  if ('string' == typeof n[i]) {
                    const t = n[i + 1],
                      o = 'function' == typeof t ? t(e) : ye(e[t]),
                      a = r[(s = n[i + 2])],
                      l = n[i + 3];
                    'boolean' == typeof l
                      ? o.removeEventListener(n[i], a, l)
                      : l >= 0
                      ? r[(s = l)]()
                      : r[(s = -l)].unsubscribe(),
                      (i += 2);
                  } else {
                    const t = r[(s = n[i + 1])];
                    n[i].call(t);
                  }
              if (null !== r) {
                for (let t = s + 1; t < r.length; t++) (0, r[t])();
                e[7] = null;
              }
            })(t, e),
            1 === e[1].type && me(e[11]) && e[11].destroy();
          const n = e[17];
          if (null !== n && re(e[3])) {
            n !== e[3] && ds(n, e);
            const r = e[19];
            null !== r && r.detachView(t);
          }
        }
      }
      function ms(t, e, n) {
        return (function (t, e, n) {
          let r = e;
          for (; null !== r && 40 & r.type; ) r = (e = r).parent;
          if (null === r) return n[0];
          if (2 & r.flags) {
            const e = t.data[r.directiveStart].encapsulation;
            if (e === At.None || e === At.Emulated) return null;
          }
          return be(r, n);
        })(t, e.parent, n);
      }
      function _s(t, e, n, r, s) {
        me(t) ? t.insertBefore(e, n, r, s) : e.insertBefore(n, r, s);
      }
      function ys(t, e, n) {
        me(t) ? t.appendChild(e, n) : e.appendChild(n);
      }
      function vs(t, e, n, r, s) {
        null !== r ? _s(t, e, n, r, s) : ys(t, e, n);
      }
      function bs(t, e) {
        return me(t) ? t.parentNode(e) : e.parentNode;
      }
      function ws(t, e, n) {
        return Cs(t, e, n);
      }
      let Cs = function (t, e, n) {
        return 40 & t.type ? be(t, n) : null;
      };
      function xs(t, e, n, r) {
        const s = ms(t, r, e),
          i = e[11],
          o = ws(r.parent || e[6], r, e);
        if (null != s)
          if (Array.isArray(n)) for (let a = 0; a < n.length; a++) vs(i, s, n[a], o, !1);
          else vs(i, s, n, o, !1);
      }
      function Ss(t, e) {
        if (null !== e) {
          const n = e.type;
          if (3 & n) return be(e, t);
          if (4 & n) return ks(-1, t[e.index]);
          if (8 & n) {
            const n = e.child;
            if (null !== n) return Ss(t, n);
            {
              const n = t[e.index];
              return re(n) ? ks(-1, n) : ye(n);
            }
          }
          if (32 & n) return is(e, t)() || ye(t[e.index]);
          {
            const n = Es(t, e);
            return null !== n ? (Array.isArray(n) ? n[0] : Ss(os(t[16]), n)) : Ss(t, e.next);
          }
        }
        return null;
      }
      function Es(t, e) {
        return null !== e ? t[16][6].projection[e.projection] : null;
      }
      function ks(t, e) {
        const n = ee + t + 1;
        if (n < e.length) {
          const t = e[n],
            r = t[1].firstChild;
          if (null !== r) return Ss(t, r);
        }
        return e[7];
      }
      function Ts(t, e, n, r, s, i, o) {
        for (; null != n; ) {
          const a = r[n.index],
            l = n.type;
          if ((o && 0 === e && (a && Yr(ye(a), r), (n.flags |= 4)), 64 != (64 & n.flags)))
            if (8 & l) Ts(t, e, n.child, r, s, i, !1), us(e, t, s, a, i);
            else if (32 & l) {
              const o = is(n, r);
              let l;
              for (; (l = o()); ) us(e, t, s, l, i);
              us(e, t, s, a, i);
            } else 16 & l ? Os(t, e, r, n, s, i) : us(e, t, s, a, i);
          n = o ? n.projectionNext : n.next;
        }
      }
      function As(t, e, n, r, s, i) {
        Ts(n, r, t.firstChild, e, s, i, !1);
      }
      function Os(t, e, n, r, s, i) {
        const o = n[16],
          a = o[6].projection[r.projection];
        if (Array.isArray(a)) for (let l = 0; l < a.length; l++) us(e, t, s, a[l], i);
        else Ts(t, e, a, o[3], s, i, !0);
      }
      function Is(t, e, n) {
        me(t) ? t.setAttribute(e, 'style', n) : (e.style.cssText = n);
      }
      function Rs(t, e, n) {
        me(t) ? ('' === n ? t.removeAttribute(e, 'class') : t.setAttribute(e, 'class', n)) : (e.className = n);
      }
      function Ps(t, e, n) {
        let r = t.length;
        for (;;) {
          const s = t.indexOf(e, n);
          if (-1 === s) return s;
          if (0 === s || t.charCodeAt(s - 1) <= 32) {
            const n = e.length;
            if (s + n === r || t.charCodeAt(s + n) <= 32) return s;
          }
          n = s + 1;
        }
      }
      const Ds = 'ng-template';
      function Ls(t, e, n) {
        let r = 0;
        for (; r < t.length; ) {
          let s = t[r++];
          if (n && 'class' === s) {
            if (((s = t[r]), -1 !== Ps(s.toLowerCase(), e, 0))) return !0;
          } else if (1 === s) {
            for (; r < t.length && 'string' == typeof (s = t[r++]); ) if (s.toLowerCase() === e) return !0;
            return !1;
          }
        }
        return !1;
      }
      function Ms(t) {
        return 4 === t.type && t.value !== Ds;
      }
      function Ns(t, e, n) {
        return e === (4 !== t.type || n ? t.value : Ds);
      }
      function Vs(t, e, n) {
        let r = 4;
        const s = t.attrs || [],
          i = (function (t) {
            for (let e = 0; e < t.length; e++) if (fn(t[e])) return e;
            return t.length;
          })(s);
        let o = !1;
        for (let a = 0; a < e.length; a++) {
          const l = e[a];
          if ('number' != typeof l) {
            if (!o)
              if (4 & r) {
                if (((r = 2 | (1 & r)), ('' !== l && !Ns(t, l, n)) || ('' === l && 1 === e.length))) {
                  if (js(r)) return !1;
                  o = !0;
                }
              } else {
                const c = 8 & r ? l : e[++a];
                if (8 & r && null !== t.attrs) {
                  if (!Ls(t.attrs, c, n)) {
                    if (js(r)) return !1;
                    o = !0;
                  }
                  continue;
                }
                const u = Fs(8 & r ? 'class' : l, s, Ms(t), n);
                if (-1 === u) {
                  if (js(r)) return !1;
                  o = !0;
                  continue;
                }
                if ('' !== c) {
                  let t;
                  t = u > i ? '' : s[u + 1].toLowerCase();
                  const e = 8 & r ? t : null;
                  if ((e && -1 !== Ps(e, c, 0)) || (2 & r && c !== t)) {
                    if (js(r)) return !1;
                    o = !0;
                  }
                }
              }
          } else {
            if (!o && !js(r) && !js(l)) return !1;
            if (o && js(l)) continue;
            (o = !1), (r = l | (1 & r));
          }
        }
        return js(r) || o;
      }
      function js(t) {
        return 0 == (1 & t);
      }
      function Fs(t, e, n, r) {
        if (null === e) return -1;
        let s = 0;
        if (r || !n) {
          let n = !1;
          for (; s < e.length; ) {
            const r = e[s];
            if (r === t) return s;
            if (3 === r || 6 === r) n = !0;
            else {
              if (1 === r || 2 === r) {
                let t = e[++s];
                for (; 'string' == typeof t; ) t = e[++s];
                continue;
              }
              if (4 === r) break;
              if (0 === r) {
                s += 4;
                continue;
              }
            }
            s += n ? 1 : 2;
          }
          return -1;
        }
        return (function (t, e) {
          let n = t.indexOf(4);
          if (n > -1)
            for (n++; n < t.length; ) {
              const r = t[n];
              if ('number' == typeof r) return -1;
              if (r === e) return n;
              n++;
            }
          return -1;
        })(e, t);
      }
      function Us(t, e, n = !1) {
        for (let r = 0; r < e.length; r++) if (Vs(t, e[r], n)) return !0;
        return !1;
      }
      function Hs(t, e) {
        t: for (let n = 0; n < e.length; n++) {
          const r = e[n];
          if (t.length === r.length) {
            for (let e = 0; e < t.length; e++) if (t[e] !== r[e]) continue t;
            return !0;
          }
        }
        return !1;
      }
      function zs(t, e) {
        return t ? ':not(' + e.trim() + ')' : e;
      }
      function Bs(t) {
        let e = t[0],
          n = 1,
          r = 2,
          s = '',
          i = !1;
        for (; n < t.length; ) {
          let o = t[n];
          if ('string' == typeof o)
            if (2 & r) {
              const e = t[++n];
              s += '[' + o + (e.length > 0 ? '="' + e + '"' : '') + ']';
            } else 8 & r ? (s += '.' + o) : 4 & r && (s += ' ' + o);
          else '' === s || js(o) || ((e += zs(i, s)), (s = '')), (r = o), (i = i || !js(r));
          n++;
        }
        return '' !== s && (e += zs(i, s)), e;
      }
      const $s = {};
      function qs(t) {
        Ws(Pe(), Re(), en() + t, je());
      }
      function Ws(t, e, n, r) {
        if (!r)
          if (3 == (3 & e[2])) {
            const r = t.preOrderCheckHooks;
            null !== r && on(e, r, n);
          } else {
            const r = t.preOrderHooks;
            null !== r && an(e, r, 0, n);
          }
        nn(n);
      }
      function Gs(t, e) {
        return (t << 17) | (e << 2);
      }
      function Zs(t) {
        return (t >> 17) & 32767;
      }
      function Ks(t) {
        return 2 | t;
      }
      function Qs(t) {
        return (131068 & t) >> 2;
      }
      function Ys(t, e) {
        return (-131069 & t) | (e << 2);
      }
      function Js(t) {
        return 1 | t;
      }
      function Xs(t, e) {
        const n = t.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const s = n[r],
              i = n[r + 1];
            if (-1 !== i) {
              const n = t.data[i];
              We(s), n.contentQueries(2, e[i], i);
            }
          }
      }
      function ti(t, e, n, r, s, i, o, a, l, c) {
        const u = e.blueprint.slice();
        return (
          (u[0] = s),
          (u[2] = 140 | r),
          Te(u),
          (u[3] = u[15] = t),
          (u[8] = n),
          (u[10] = o || (t && t[10])),
          (u[11] = a || (t && t[11])),
          (u[12] = l || (t && t[12]) || null),
          (u[9] = c || (t && t[9]) || null),
          (u[6] = i),
          (u[16] = 2 == e.type ? t[16] : u),
          u
        );
      }
      function ei(t, e, n, r, s) {
        let i = t.data[e];
        if (null === i)
          (i = (function (t, e, n, r, s) {
            const i = Le(),
              o = Ne(),
              a = (t.data[e] = (function (t, e, n, r, s, i) {
                return {
                  type: n,
                  index: r,
                  insertBeforeIndex: null,
                  injectorIndex: e ? e.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: s,
                  attrs: i,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tViews: null,
                  next: null,
                  projectionNext: null,
                  child: null,
                  parent: e,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                };
              })(0, o ? i : i && i.parent, n, e, r, s));
            return (
              null === t.firstChild && (t.firstChild = a),
              null !== i &&
                (o ? null == i.child && null !== a.parent && (i.child = a) : null === i.next && (i.next = a)),
              a
            );
          })(t, e, n, r, s)),
            Oe.lFrame.inI18n && (i.flags |= 64);
        else if (64 & i.type) {
          (i.type = n), (i.value = r), (i.attrs = s);
          const t = (function () {
            const t = Oe.lFrame,
              e = t.currentTNode;
            return t.isParent ? e : e.parent;
          })();
          i.injectorIndex = null === t ? -1 : t.injectorIndex;
        }
        return Me(i, !0), i;
      }
      function ni(t, e, n, r) {
        if (0 === n) return -1;
        const s = e.length;
        for (let i = 0; i < n; i++) e.push(r), t.blueprint.push(r), t.data.push(null);
        return s;
      }
      function ri(t, e, n) {
        Ke(e);
        try {
          const r = t.viewQuery;
          null !== r && Di(1, r, n);
          const s = t.template;
          null !== s && oi(t, e, s, 1, n),
            t.firstCreatePass && (t.firstCreatePass = !1),
            t.staticContentQueries && Xs(t, e),
            t.staticViewQueries && Di(2, t.viewQuery, n);
          const i = t.components;
          null !== i &&
            (function (t, e) {
              for (let n = 0; n < e.length; n++) Ai(t, e[n]);
            })(e, i);
        } catch (r) {
          throw (t.firstCreatePass && ((t.incompleteFirstPass = !0), (t.firstCreatePass = !1)), r);
        } finally {
          (e[2] &= -5), tn();
        }
      }
      function si(t, e, n, r) {
        const s = e[2];
        if (256 == (256 & s)) return;
        Ke(e);
        const i = je();
        try {
          Te(e), (Oe.lFrame.bindingIndex = t.bindingStartIndex), null !== n && oi(t, e, n, 2, r);
          const o = 3 == (3 & s);
          if (!i)
            if (o) {
              const n = t.preOrderCheckHooks;
              null !== n && on(e, n, null);
            } else {
              const n = t.preOrderHooks;
              null !== n && an(e, n, 0, null), ln(e, 0);
            }
          if (
            ((function (t) {
              for (let e = as(t); null !== e; e = ls(e)) {
                if (!e[2]) continue;
                const t = e[9];
                for (let e = 0; e < t.length; e++) {
                  const n = t[e],
                    r = n[3];
                  0 == (1024 & n[2]) && Ae(r, 1), (n[2] |= 1024);
                }
              }
            })(e),
            (function (t) {
              for (let e = as(t); null !== e; e = ls(e))
                for (let t = ee; t < e.length; t++) {
                  const n = e[t],
                    r = n[1];
                  Ee(n) && si(r, n, r.template, n[8]);
                }
            })(e),
            null !== t.contentQueries && Xs(t, e),
            !i)
          )
            if (o) {
              const n = t.contentCheckHooks;
              null !== n && on(e, n);
            } else {
              const n = t.contentHooks;
              null !== n && an(e, n, 1), ln(e, 1);
            }
          !(function (t, e) {
            const n = t.hostBindingOpCodes;
            if (null !== n)
              try {
                for (let t = 0; t < n.length; t++) {
                  const r = n[t];
                  if (r < 0) nn(~r);
                  else {
                    const s = r,
                      i = n[++t],
                      o = n[++t];
                    Be(i, s), o(2, e[s]);
                  }
                }
              } finally {
                nn(-1);
              }
          })(t, e);
          const a = t.components;
          null !== a &&
            (function (t, e) {
              for (let n = 0; n < e.length; n++) ki(t, e[n]);
            })(e, a);
          const l = t.viewQuery;
          if ((null !== l && Di(2, l, r), !i))
            if (o) {
              const n = t.viewCheckHooks;
              null !== n && on(e, n);
            } else {
              const n = t.viewHooks;
              null !== n && an(e, n, 2), ln(e, 2);
            }
          !0 === t.firstUpdatePass && (t.firstUpdatePass = !1),
            i || (e[2] &= -73),
            1024 & e[2] && ((e[2] &= -1025), Ae(e[3], -1));
        } finally {
          tn();
        }
      }
      function ii(t, e, n, r) {
        const s = e[10],
          i = !je(),
          o = Se(e);
        try {
          i && !o && s.begin && s.begin(), o && ri(t, e, r), si(t, e, n, r);
        } finally {
          i && !o && s.end && s.end();
        }
      }
      function oi(t, e, n, r, s) {
        const i = en(),
          o = 2 & r;
        try {
          nn(-1), o && e.length > te && Ws(t, e, te, je()), n(r, s);
        } finally {
          nn(i);
        }
      }
      function ai(t, e, n) {
        if (se(e)) {
          const r = e.directiveEnd;
          for (let s = e.directiveStart; s < r; s++) {
            const e = t.data[s];
            e.contentQueries && e.contentQueries(1, n[s], s);
          }
        }
      }
      function li(t, e, n) {
        Ie() &&
          ((function (t, e, n, r) {
            const s = n.directiveStart,
              i = n.directiveEnd;
            t.firstCreatePass || Sn(n, e), Yr(r, e);
            const o = n.initialInputs;
            for (let a = s; a < i; a++) {
              const r = t.data[a],
                i = ae(r);
              i && Ci(e, n, r);
              const l = Nn(e, t, a, n);
              Yr(l, e), null !== o && xi(0, a - s, l, r, 0, o), i && (xe(n.index, e)[8] = l);
            }
          })(t, e, n, be(n, e)),
          128 == (128 & n.flags) &&
            (function (t, e, n) {
              const r = n.directiveStart,
                s = n.directiveEnd,
                i = n.index,
                o = Oe.lFrame.currentDirectiveIndex;
              try {
                nn(i);
                for (let n = r; n < s; n++) {
                  const r = t.data[n],
                    s = e[n];
                  $e(n), (null === r.hostBindings && 0 === r.hostVars && null === r.hostAttrs) || _i(r, s);
                }
              } finally {
                nn(-1), $e(o);
              }
            })(t, e, n));
      }
      function ci(t, e, n = be) {
        const r = e.localNames;
        if (null !== r) {
          let s = e.index + 1;
          for (let i = 0; i < r.length; i += 2) {
            const o = r[i + 1],
              a = -1 === o ? n(e, t) : t[o];
            t[s++] = a;
          }
        }
      }
      function ui(t) {
        const e = t.tView;
        return null === e || e.incompleteFirstPass
          ? (t.tView = hi(
              1,
              null,
              t.template,
              t.decls,
              t.vars,
              t.directiveDefs,
              t.pipeDefs,
              t.viewQuery,
              t.schemas,
              t.consts
            ))
          : e;
      }
      function hi(t, e, n, r, s, i, o, a, l, c) {
        const u = te + r,
          h = u + s,
          d = (function (t, e) {
            const n = [];
            for (let r = 0; r < e; r++) n.push(r < t ? null : $s);
            return n;
          })(u, h),
          p = 'function' == typeof c ? c() : c;
        return (d[1] = {
          type: t,
          blueprint: d,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: e,
          data: d.slice().fill(null, u),
          bindingStartIndex: u,
          expandoStartIndex: h,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: 'function' == typeof i ? i() : i,
          pipeRegistry: 'function' == typeof o ? o() : o,
          firstChild: null,
          schemas: l,
          consts: p,
          incompleteFirstPass: !1,
        });
      }
      function di(t, e, n, r) {
        const s = Mi(e);
        null === n ? s.push(r) : (s.push(n), t.firstCreatePass && Ni(t).push(r, s.length - 1));
      }
      function pi(t, e, n) {
        for (let r in t)
          if (t.hasOwnProperty(r)) {
            const s = t[r];
            (n = null === n ? {} : n).hasOwnProperty(r) ? n[r].push(e, s) : (n[r] = [e, s]);
          }
        return n;
      }
      function fi(t, e, n, r, s, i, o, a) {
        const l = be(e, n);
        let c,
          u = e.inputs;
        var h;
        !a && null != u && (c = u[r])
          ? (ji(t, n, c, r, s),
            ie(e) &&
              (function (t, e) {
                const n = xe(e, t);
                16 & n[2] || (n[2] |= 64);
              })(n, e.index))
          : 3 & e.type &&
            ((r =
              'class' === (h = r)
                ? 'className'
                : 'for' === h
                ? 'htmlFor'
                : 'formaction' === h
                ? 'formAction'
                : 'innerHtml' === h
                ? 'innerHTML'
                : 'readonly' === h
                ? 'readOnly'
                : 'tabindex' === h
                ? 'tabIndex'
                : h),
            (s = null != o ? o(s, e.value || '', r) : s),
            me(i) ? i.setProperty(l, r, s) : gn(r) || (l.setProperty ? l.setProperty(r, s) : (l[r] = s)));
      }
      function gi(t, e, n, r) {
        let s = !1;
        if (Ie()) {
          const i = (function (t, e, n) {
              const r = t.directiveRegistry;
              let s = null;
              if (r)
                for (let i = 0; i < r.length; i++) {
                  const o = r[i];
                  Us(n, o.selectors, !1) &&
                    (s || (s = []), An(Sn(n, e), t, o.type), ae(o) ? (yi(t, n), s.unshift(o)) : s.push(o));
                }
              return s;
            })(t, e, n),
            o = null === r ? null : { '': -1 };
          if (null !== i) {
            (s = !0), bi(n, t.data.length, i.length);
            for (let t = 0; t < i.length; t++) {
              const e = i[t];
              e.providersResolver && e.providersResolver(e);
            }
            let r = !1,
              a = !1,
              l = ni(t, e, i.length, null);
            for (let s = 0; s < i.length; s++) {
              const c = i[s];
              (n.mergedAttrs = mn(n.mergedAttrs, c.hostAttrs)),
                wi(t, n, e, l, c),
                vi(l, c, o),
                null !== c.contentQueries && (n.flags |= 8),
                (null === c.hostBindings && null === c.hostAttrs && 0 === c.hostVars) || (n.flags |= 128);
              const u = c.type.prototype;
              !r &&
                (u.ngOnChanges || u.ngOnInit || u.ngDoCheck) &&
                ((t.preOrderHooks || (t.preOrderHooks = [])).push(n.index), (r = !0)),
                a ||
                  (!u.ngOnChanges && !u.ngDoCheck) ||
                  ((t.preOrderCheckHooks || (t.preOrderCheckHooks = [])).push(n.index), (a = !0)),
                l++;
            }
            !(function (t, e) {
              const n = e.directiveEnd,
                r = t.data,
                s = e.attrs,
                i = [];
              let o = null,
                a = null;
              for (let l = e.directiveStart; l < n; l++) {
                const t = r[l],
                  n = t.inputs,
                  c = null === s || Ms(e) ? null : Si(n, s);
                i.push(c), (o = pi(n, l, o)), (a = pi(t.outputs, l, a));
              }
              null !== o &&
                (o.hasOwnProperty('class') && (e.flags |= 16), o.hasOwnProperty('style') && (e.flags |= 32)),
                (e.initialInputs = i),
                (e.inputs = o),
                (e.outputs = a);
            })(t, n);
          }
          o &&
            (function (t, e, n) {
              if (e) {
                const r = (t.localNames = []);
                for (let t = 0; t < e.length; t += 2) {
                  const s = n[e[t + 1]];
                  if (null == s) throw new ct('301', `Export of name '${e[t + 1]}' not found!`);
                  r.push(e[t], s);
                }
              }
            })(n, r, o);
        }
        return (n.mergedAttrs = mn(n.mergedAttrs, n.attrs)), s;
      }
      function mi(t, e, n, r, s, i) {
        const o = i.hostBindings;
        if (o) {
          let n = t.hostBindingOpCodes;
          null === n && (n = t.hostBindingOpCodes = []);
          const i = ~e.index;
          (function (t) {
            let e = t.length;
            for (; e > 0; ) {
              const n = t[--e];
              if ('number' == typeof n && n < 0) return n;
            }
            return 0;
          })(n) != i && n.push(i),
            n.push(r, s, o);
        }
      }
      function _i(t, e) {
        null !== t.hostBindings && t.hostBindings(1, e);
      }
      function yi(t, e) {
        (e.flags |= 2), (t.components || (t.components = [])).push(e.index);
      }
      function vi(t, e, n) {
        if (n) {
          if (e.exportAs) for (let r = 0; r < e.exportAs.length; r++) n[e.exportAs[r]] = t;
          ae(e) && (n[''] = t);
        }
      }
      function bi(t, e, n) {
        (t.flags |= 1), (t.directiveStart = e), (t.directiveEnd = e + n), (t.providerIndexes = e);
      }
      function wi(t, e, n, r, s) {
        t.data[r] = s;
        const i = s.factory || (s.factory = le(s.type)),
          o = new dn(i, ae(s), null);
        (t.blueprint[r] = o), (n[r] = o), mi(t, e, 0, r, ni(t, n, s.hostVars, $s), s);
      }
      function Ci(t, e, n) {
        const r = be(e, t),
          s = ui(n),
          i = t[10],
          o = Oi(t, ti(t, s, null, n.onPush ? 64 : 16, r, e, i, i.createRenderer(r, n), null, null));
        t[e.index] = o;
      }
      function xi(t, e, n, r, s, i) {
        const o = i[e];
        if (null !== o) {
          const t = r.setInput;
          for (let e = 0; e < o.length; ) {
            const s = o[e++],
              i = o[e++],
              a = o[e++];
            null !== t ? r.setInput(n, a, s, i) : (n[i] = a);
          }
        }
      }
      function Si(t, e) {
        let n = null,
          r = 0;
        for (; r < e.length; ) {
          const s = e[r];
          if (0 !== s)
            if (5 !== s) {
              if ('number' == typeof s) break;
              t.hasOwnProperty(s) && (null === n && (n = []), n.push(s, t[s], e[r + 1])), (r += 2);
            } else r += 2;
          else r += 4;
        }
        return n;
      }
      function Ei(t, e, n, r) {
        return new Array(t, !0, !1, e, null, 0, r, n, null, null);
      }
      function ki(t, e) {
        const n = xe(e, t);
        if (Ee(n)) {
          const t = n[1];
          80 & n[2] ? si(t, n, t.template, n[8]) : n[5] > 0 && Ti(n);
        }
      }
      function Ti(t) {
        for (let n = as(t); null !== n; n = ls(n))
          for (let t = ee; t < n.length; t++) {
            const e = n[t];
            if (1024 & e[2]) {
              const t = e[1];
              si(t, e, t.template, e[8]);
            } else e[5] > 0 && Ti(e);
          }
        const e = t[1].components;
        if (null !== e)
          for (let n = 0; n < e.length; n++) {
            const r = xe(e[n], t);
            Ee(r) && r[5] > 0 && Ti(r);
          }
      }
      function Ai(t, e) {
        const n = xe(e, t),
          r = n[1];
        !(function (t, e) {
          for (let n = e.length; n < t.blueprint.length; n++) e.push(t.blueprint[n]);
        })(r, n),
          ri(r, n, n[8]);
      }
      function Oi(t, e) {
        return t[13] ? (t[14][4] = e) : (t[13] = e), (t[14] = e), e;
      }
      function Ii(t) {
        for (; t; ) {
          t[2] |= 64;
          const e = os(t);
          if (0 != (512 & t[2]) && !e) return t;
          t = e;
        }
        return null;
      }
      function Ri(t, e, n) {
        const r = e[10];
        r.begin && r.begin();
        try {
          si(t, e, t.template, n);
        } catch (s) {
          throw (Vi(e, s), s);
        } finally {
          r.end && r.end();
        }
      }
      function Pi(t) {
        !(function (t) {
          for (let e = 0; e < t.components.length; e++) {
            const n = t.components[e],
              r = Jr(n),
              s = r[1];
            ii(s, r, s.template, n);
          }
        })(t[8]);
      }
      function Di(t, e, n) {
        We(0), e(t, n);
      }
      const Li = (() => Promise.resolve(null))();
      function Mi(t) {
        return t[7] || (t[7] = []);
      }
      function Ni(t) {
        return t.cleanup || (t.cleanup = []);
      }
      function Vi(t, e) {
        const n = t[9],
          r = n ? n.get(es, null) : null;
        r && r.handleError(e);
      }
      function ji(t, e, n, r, s) {
        for (let i = 0; i < n.length; ) {
          const o = n[i++],
            a = n[i++],
            l = e[o],
            c = t.data[o];
          null !== c.setInput ? c.setInput(l, s, r, a) : (l[a] = s);
        }
      }
      function Fi(t, e, n) {
        let r = n ? t.styles : null,
          s = n ? t.classes : null,
          i = 0;
        if (null !== e)
          for (let o = 0; o < e.length; o++) {
            const t = e[o];
            'number' == typeof t ? (i = t) : 1 == i ? (s = st(s, t)) : 2 == i && (r = st(r, t + ': ' + e[++o] + ';'));
          }
        n ? (t.styles = r) : (t.stylesWithoutHost = r), n ? (t.classes = s) : (t.classesWithoutHost = s);
      }
      const Ui = new qn('INJECTOR', -1);
      class Hi {
        get(t, e = nr) {
          if (e === nr) {
            const e = new Error(`NullInjectorError: No provider for ${rt(t)}!`);
            throw ((e.name = 'NullInjectorError'), e);
          }
          return e;
        }
      }
      const zi = new qn('Set Injector scope.'),
        Bi = {},
        $i = {};
      let qi;
      function Wi() {
        return void 0 === qi && (qi = new Hi()), qi;
      }
      function Gi(t, e = null, n = null, r) {
        return new Zi(t, n, e || Wi(), r);
      }
      class Zi {
        constructor(t, e, n, r = null) {
          (this.parent = n),
            (this.records = new Map()),
            (this.injectorDefTypes = new Set()),
            (this.onDestroy = new Set()),
            (this._destroyed = !1);
          const s = [];
          e && Kn(e, (n) => this.processProvider(n, t, e)),
            Kn([t], (t) => this.processInjectorType(t, [], s)),
            this.records.set(Ui, Yi(void 0, this));
          const i = this.records.get(zi);
          (this.scope = null != i ? i.value : null), (this.source = r || ('object' == typeof t ? null : rt(t)));
        }
        get destroyed() {
          return this._destroyed;
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            this.onDestroy.forEach((t) => t.ngOnDestroy());
          } finally {
            this.records.clear(), this.onDestroy.clear(), this.injectorDefTypes.clear();
          }
        }
        get(t, e = nr, n = Ct.Default) {
          this.assertNotDestroyed();
          const r = ar(this),
            s = St(void 0);
          try {
            if (!(n & Ct.SkipSelf)) {
              let e = this.records.get(t);
              if (void 0 === e) {
                const n = ('function' == typeof (i = t) || ('object' == typeof i && i instanceof qn)) && gt(t);
                (e = n && this.injectableDefInScope(n) ? Yi(Ki(t), Bi) : null), this.records.set(t, e);
              }
              if (null != e) return this.hydrate(t, e);
            }
            return (n & Ct.Self ? Wi() : this.parent).get(t, (e = n & Ct.Optional && e === nr ? null : e));
          } catch (o) {
            if ('NullInjectorError' === o.name) {
              if (((o.ngTempTokenPath = o.ngTempTokenPath || []).unshift(rt(t)), r)) throw o;
              return (function (t, e, n, r) {
                const s = t.ngTempTokenPath;
                throw (
                  (e[sr] && s.unshift(e[sr]),
                  (t.message = (function (t, e, n, r = null) {
                    t = t && '\n' === t.charAt(0) && '\u0275' == t.charAt(1) ? t.substr(2) : t;
                    let s = rt(e);
                    if (Array.isArray(e)) s = e.map(rt).join(' -> ');
                    else if ('object' == typeof e) {
                      let t = [];
                      for (let n in e)
                        if (e.hasOwnProperty(n)) {
                          let r = e[n];
                          t.push(n + ':' + ('string' == typeof r ? JSON.stringify(r) : rt(r)));
                        }
                      s = `{${t.join(', ')}}`;
                    }
                    return `${n}${r ? '(' + r + ')' : ''}[${s}]: ${t.replace(rr, '\n  ')}`;
                  })('\n' + t.message, s, n, r)),
                  (t.ngTokenPath = s),
                  (t.ngTempTokenPath = null),
                  t)
                );
              })(o, t, 'R3InjectorError', this.source);
            }
            throw o;
          } finally {
            St(s), ar(r);
          }
          var i;
        }
        _resolveInjectorDefTypes() {
          this.injectorDefTypes.forEach((t) => this.get(t));
        }
        toString() {
          const t = [];
          return this.records.forEach((e, n) => t.push(rt(n))), `R3Injector[${t.join(', ')}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new Error('Injector has already been destroyed.');
        }
        processInjectorType(t, e, n) {
          if (!(t = at(t))) return !1;
          let r = _t(t);
          const s = (null == r && t.ngModule) || void 0,
            i = void 0 === s ? t : s,
            o = -1 !== n.indexOf(i);
          if ((void 0 !== s && (r = _t(s)), null == r)) return !1;
          if (null != r.imports && !o) {
            let t;
            n.push(i);
            try {
              Kn(r.imports, (r) => {
                this.processInjectorType(r, e, n) && (void 0 === t && (t = []), t.push(r));
              });
            } finally {
            }
            if (void 0 !== t)
              for (let e = 0; e < t.length; e++) {
                const { ngModule: n, providers: r } = t[e];
                Kn(r, (t) => this.processProvider(t, n, r || Mt));
              }
          }
          this.injectorDefTypes.add(i);
          const a = le(i) || (() => new i());
          this.records.set(i, Yi(a, Bi));
          const l = r.providers;
          if (null != l && !o) {
            const e = t;
            Kn(l, (t) => this.processProvider(t, e, l));
          }
          return void 0 !== s && void 0 !== t.providers;
        }
        processProvider(t, e, n) {
          let r = Xi((t = at(t))) ? t : at(t && t.provide);
          const s = (function (t, e, n) {
            return Ji(t) ? Yi(void 0, t.useValue) : Yi(Qi(t), Bi);
          })(t);
          if (Xi(t) || !0 !== t.multi) this.records.get(r);
          else {
            let e = this.records.get(r);
            e || ((e = Yi(void 0, Bi, !0)), (e.factory = () => hr(e.multi)), this.records.set(r, e)),
              (r = t),
              e.multi.push(t);
          }
          this.records.set(r, s);
        }
        hydrate(t, e) {
          var n;
          return (
            e.value === Bi && ((e.value = $i), (e.value = e.factory())),
            'object' == typeof e.value &&
              e.value &&
              null !== (n = e.value) &&
              'object' == typeof n &&
              'function' == typeof n.ngOnDestroy &&
              this.onDestroy.add(e.value),
            e.value
          );
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1;
          const e = at(t.providedIn);
          return 'string' == typeof e ? 'any' === e || e === this.scope : this.injectorDefTypes.has(e);
        }
      }
      function Ki(t) {
        const e = gt(t),
          n = null !== e ? e.factory : le(t);
        if (null !== n) return n;
        if (t instanceof qn) throw new Error(`Token ${rt(t)} is missing a \u0275prov definition.`);
        if (t instanceof Function)
          return (function (t) {
            const e = t.length;
            if (e > 0) {
              const n = Jn(e, '?');
              throw new Error(`Can't resolve all parameters for ${rt(t)}: (${n.join(', ')}).`);
            }
            const n = (function (t) {
              const e = t && (t[yt] || t[bt]);
              if (e) {
                const n = (function (t) {
                  if (t.hasOwnProperty('name')) return t.name;
                  const e = ('' + t).match(/^function\s*([^\s(]+)/);
                  return null === e ? '' : e[1];
                })(t);
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`
                  ),
                  e
                );
              }
              return null;
            })(t);
            return null !== n ? () => n.factory(t) : () => new t();
          })(t);
        throw new Error('unreachable');
      }
      function Qi(t, e, n) {
        let r;
        if (Xi(t)) {
          const e = at(t);
          return le(e) || Ki(e);
        }
        if (Ji(t)) r = () => at(t.useValue);
        else if ((s = t) && s.useFactory) r = () => t.useFactory(...hr(t.deps || []));
        else if (
          (function (t) {
            return !(!t || !t.useExisting);
          })(t)
        )
          r = () => cr(at(t.useExisting));
        else {
          const e = at(t && (t.useClass || t.provide));
          if (
            !(function (t) {
              return !!t.deps;
            })(t)
          )
            return le(e) || Ki(e);
          r = () => new e(...hr(t.deps));
        }
        var s;
        return r;
      }
      function Yi(t, e, n = !1) {
        return { factory: t, value: e, multi: n ? [] : void 0 };
      }
      function Ji(t) {
        return null !== t && 'object' == typeof t && ir in t;
      }
      function Xi(t) {
        return 'function' == typeof t;
      }
      const to = function (t, e, n) {
        return (function (t, e = null, n = null, r) {
          const s = Gi(t, e, n, r);
          return s._resolveInjectorDefTypes(), s;
        })({ name: n }, e, t, n);
      };
      class eo {
        static create(t, e) {
          return Array.isArray(t) ? to(t, e, '') : to(t.providers, t.parent, t.name || '');
        }
      }
      function no(t, e) {
        sn(Jr(t)[1], De());
      }
      function ro(t) {
        let e = Object.getPrototypeOf(t.type.prototype).constructor,
          n = !0;
        const r = [t];
        for (; e; ) {
          let s;
          if (ae(t)) s = e.??cmp || e.??dir;
          else {
            if (e.??cmp) throw new Error('Directives cannot inherit Components');
            s = e.??dir;
          }
          if (s) {
            if (n) {
              r.push(s);
              const e = t;
              (e.inputs = so(t.inputs)), (e.declaredInputs = so(t.declaredInputs)), (e.outputs = so(t.outputs));
              const n = s.hostBindings;
              n && ao(t, n);
              const i = s.viewQuery,
                o = s.contentQueries;
              if (
                (i && io(t, i),
                o && oo(t, o),
                nt(t.inputs, s.inputs),
                nt(t.declaredInputs, s.declaredInputs),
                nt(t.outputs, s.outputs),
                ae(s) && s.data.animation)
              ) {
                const e = t.data;
                e.animation = (e.animation || []).concat(s.data.animation);
              }
            }
            const e = s.features;
            if (e)
              for (let r = 0; r < e.length; r++) {
                const s = e[r];
                s && s.ngInherit && s(t), s === ro && (n = !1);
              }
          }
          e = Object.getPrototypeOf(e);
        }
        !(function (t) {
          let e = 0,
            n = null;
          for (let r = t.length - 1; r >= 0; r--) {
            const s = t[r];
            (s.hostVars = e += s.hostVars), (s.hostAttrs = mn(s.hostAttrs, (n = mn(n, s.hostAttrs))));
          }
        })(r);
      }
      function so(t) {
        return t === Lt ? {} : t === Mt ? [] : t;
      }
      function io(t, e) {
        const n = t.viewQuery;
        t.viewQuery = n
          ? (t, r) => {
              e(t, r), n(t, r);
            }
          : e;
      }
      function oo(t, e) {
        const n = t.contentQueries;
        t.contentQueries = n
          ? (t, r, s) => {
              e(t, r, s), n(t, r, s);
            }
          : e;
      }
      function ao(t, e) {
        const n = t.hostBindings;
        t.hostBindings = n
          ? (t, r) => {
              e(t, r), n(t, r);
            }
          : e;
      }
      (eo.THROW_IF_NOT_FOUND = nr),
        (eo.NULL = new Hi()),
        (eo.??prov = pt({ token: eo, providedIn: 'any', factory: () => cr(Ui) })),
        (eo.__NG_ELEMENT_ID__ = -1);
      let lo = null;
      function co() {
        if (!lo) {
          const t = Dt.Symbol;
          if (t && t.iterator) lo = t.iterator;
          else {
            const t = Object.getOwnPropertyNames(Map.prototype);
            for (let e = 0; e < t.length; ++e) {
              const n = t[e];
              'entries' !== n && 'size' !== n && Map.prototype[n] === Map.prototype.entries && (lo = n);
            }
          }
        }
        return lo;
      }
      class uo {
        constructor(t) {
          this.wrapped = t;
        }
        static wrap(t) {
          return new uo(t);
        }
        static unwrap(t) {
          return uo.isWrapped(t) ? t.wrapped : t;
        }
        static isWrapped(t) {
          return t instanceof uo;
        }
      }
      function ho(t) {
        return !!po(t) && (Array.isArray(t) || (!(t instanceof Map) && co() in t));
      }
      function po(t) {
        return null !== t && ('function' == typeof t || 'object' == typeof t);
      }
      function fo(t, e, n) {
        return !Object.is(t[e], n) && ((t[e] = n), !0);
      }
      function go(t, e, n, r) {
        const s = Re();
        return (
          fo(s, He(), e) &&
            (Pe(),
            (function (t, e, n, r, s, i) {
              const o = be(t, e);
              !(function (t, e, n, r, s, i, o) {
                if (null == i) me(t) ? t.removeAttribute(e, s, n) : e.removeAttribute(s);
                else {
                  const a = null == o ? ut(i) : o(i, r || '', s);
                  me(t) ? t.setAttribute(e, s, a, n) : n ? e.setAttributeNS(n, s, a) : e.setAttribute(s, a);
                }
              })(e[11], o, i, t.value, n, r, s);
            })(rn(), s, t, e, n, r)),
          go
        );
      }
      function mo(t, e, n, r, s, i, o, a) {
        const l = Re(),
          c = Pe(),
          u = t + te,
          h = c.firstCreatePass
            ? (function (t, e, n, r, s, i, o, a, l) {
                const c = e.consts,
                  u = ei(e, t, 4, o || null, ke(c, a));
                gi(e, n, u, ke(c, l)), sn(e, u);
                const h = (u.tViews = hi(2, u, r, s, i, e.directiveRegistry, e.pipeRegistry, null, e.schemas, c));
                return null !== e.queries && (e.queries.template(e, u), (h.queries = e.queries.embeddedTView(u))), u;
              })(u, c, l, e, n, r, s, i, o)
            : c.data[u];
        Me(h, !1);
        const d = l[11].createComment('');
        xs(c, l, d, h), Yr(d, l), Oi(l, (l[u] = Ei(d, l, d, h))), oe(h) && li(c, l, h), null != o && ci(l, h, a);
      }
      function _o(t, e = Ct.Default) {
        const n = Re();
        return null === n ? cr(t, e) : Rn(De(), n, at(t), e);
      }
      function yo(t, e, n) {
        const r = Re();
        return fo(r, He(), e) && fi(Pe(), rn(), r, t, e, r[11], n, !1), yo;
      }
      function vo(t, e, n, r, s) {
        const i = s ? 'class' : 'style';
        ji(t, n, e.inputs[i], i, r);
      }
      function bo(t, e, n, r) {
        const s = Re(),
          i = Pe(),
          o = te + t,
          a = s[11],
          l = (s[o] = hs(a, e, Oe.lFrame.currentNamespace)),
          c = i.firstCreatePass
            ? (function (t, e, n, r, s, i, o) {
                const a = e.consts,
                  l = ei(e, t, 2, s, ke(a, i));
                return (
                  gi(e, n, l, ke(a, o)),
                  null !== l.attrs && Fi(l, l.attrs, !1),
                  null !== l.mergedAttrs && Fi(l, l.mergedAttrs, !0),
                  null !== e.queries && e.queries.elementStart(e, l),
                  l
                );
              })(o, i, s, 0, e, n, r)
            : i.data[o];
        Me(c, !0);
        const u = c.mergedAttrs;
        null !== u && pn(a, l, u);
        const h = c.classes;
        null !== h && Rs(a, l, h);
        const d = c.styles;
        null !== d && Is(a, l, d),
          64 != (64 & c.flags) && xs(i, s, l, c),
          0 === Oe.lFrame.elementDepthCount && Yr(l, s),
          Oe.lFrame.elementDepthCount++,
          oe(c) && (li(i, s, c), ai(i, c, s)),
          null !== r && ci(s, c);
      }
      function wo() {
        let t = De();
        Ne() ? Ve() : ((t = t.parent), Me(t, !1));
        const e = t;
        Oe.lFrame.elementDepthCount--;
        const n = Pe();
        n.firstCreatePass && (sn(n, t), se(t) && n.queries.elementEnd(t)),
          null != e.classesWithoutHost &&
            (function (t) {
              return 0 != (16 & t.flags);
            })(e) &&
            vo(n, e, Re(), e.classesWithoutHost, !0),
          null != e.stylesWithoutHost &&
            (function (t) {
              return 0 != (32 & t.flags);
            })(e) &&
            vo(n, e, Re(), e.stylesWithoutHost, !1);
      }
      function Co(t, e, n, r) {
        bo(t, e, n, r), wo();
      }
      function xo(t, e, n) {
        const r = Re(),
          s = Pe(),
          i = t + te,
          o = s.firstCreatePass
            ? (function (t, e, n, r, s) {
                const i = e.consts,
                  o = ke(i, r),
                  a = ei(e, t, 8, 'ng-container', o);
                return (
                  null !== o && Fi(a, o, !0),
                  gi(e, n, a, ke(i, s)),
                  null !== e.queries && e.queries.elementStart(e, a),
                  a
                );
              })(i, s, r, e, n)
            : s.data[i];
        Me(o, !0);
        const a = (r[i] = r[11].createComment(''));
        xs(s, r, a, o), Yr(a, r), oe(o) && (li(s, r, o), ai(s, o, r)), null != n && ci(r, o);
      }
      function So() {
        let t = De();
        const e = Pe();
        Ne() ? Ve() : ((t = t.parent), Me(t, !1)), e.firstCreatePass && (sn(e, t), se(t) && e.queries.elementEnd(t));
      }
      function Eo(t) {
        return !!t && 'function' == typeof t.then;
      }
      const ko = function (t) {
        return !!t && 'function' == typeof t.subscribe;
      };
      function To(t, e, n, r) {
        const s = Re(),
          i = Pe(),
          o = De();
        return (
          (function (t, e, n, r, s, i, o, a) {
            const l = oe(r),
              c = t.firstCreatePass && Ni(t),
              u = Mi(e);
            let h = !0;
            if (3 & r.type || a) {
              const d = be(r, e),
                p = a ? a(d) : d,
                f = u.length,
                g = a ? (t) => a(ye(t[r.index])) : r.index;
              if (me(n)) {
                let o = null;
                if (
                  (!a &&
                    l &&
                    (o = (function (t, e, n, r) {
                      const s = t.cleanup;
                      if (null != s)
                        for (let i = 0; i < s.length - 1; i += 2) {
                          const t = s[i];
                          if (t === n && s[i + 1] === r) {
                            const t = e[7],
                              n = s[i + 2];
                            return t.length > n ? t[n] : null;
                          }
                          'string' == typeof t && (i += 2);
                        }
                      return null;
                    })(t, e, s, r.index)),
                  null !== o)
                )
                  ((o.__ngLastListenerFn__ || o).__ngNextListenerFn__ = i), (o.__ngLastListenerFn__ = i), (h = !1);
                else {
                  i = Oo(r, e, 0, i, !1);
                  const t = n.listen(p, s, i);
                  u.push(i, t), c && c.push(s, g, f, f + 1);
                }
              } else (i = Oo(r, e, 0, i, !0)), p.addEventListener(s, i, o), u.push(i), c && c.push(s, g, f, o);
            } else i = Oo(r, e, 0, i, !1);
            const d = r.outputs;
            let p;
            if (h && null !== d && (p = d[s])) {
              const t = p.length;
              if (t)
                for (let n = 0; n < t; n += 2) {
                  const t = e[p[n]][p[n + 1]].subscribe(i),
                    o = u.length;
                  u.push(i, t), c && c.push(s, r.index, o, -(o + 1));
                }
            }
          })(i, s, s[11], o, t, e, !!n, r),
          To
        );
      }
      function Ao(t, e, n, r) {
        try {
          return !1 !== n(r);
        } catch (s) {
          return Vi(t, s), !1;
        }
      }
      function Oo(t, e, n, r, s) {
        return function n(i) {
          if (i === Function) return r;
          const o = 2 & t.flags ? xe(t.index, e) : e;
          0 == (32 & e[2]) && Ii(o);
          let a = Ao(e, 0, r, i),
            l = n.__ngNextListenerFn__;
          for (; l; ) (a = Ao(e, 0, l, i) && a), (l = l.__ngNextListenerFn__);
          return s && !1 === a && (i.preventDefault(), (i.returnValue = !1)), a;
        };
      }
      function Io(t = 1) {
        return (function (t) {
          return (Oe.lFrame.contextLView = (function (t, e) {
            for (; t > 0; ) (e = e[15]), t--;
            return e;
          })(t, Oe.lFrame.contextLView))[8];
        })(t);
      }
      function Ro(t, e) {
        let n = null;
        const r = (function (t) {
          const e = t.attrs;
          if (null != e) {
            const t = e.indexOf(5);
            if (0 == (1 & t)) return e[t + 1];
          }
          return null;
        })(t);
        for (let s = 0; s < e.length; s++) {
          const i = e[s];
          if ('*' !== i) {
            if (null === r ? Us(t, i, !0) : Hs(r, i)) return s;
          } else n = s;
        }
        return n;
      }
      function Po(t) {
        const e = Re()[16][6];
        if (!e.projection) {
          const n = (e.projection = Jn(t ? t.length : 1, null)),
            r = n.slice();
          let s = e.child;
          for (; null !== s; ) {
            const e = t ? Ro(s, t) : 0;
            null !== e && (r[e] ? (r[e].projectionNext = s) : (n[e] = s), (r[e] = s)), (s = s.next);
          }
        }
      }
      function Do(t, e = 0, n) {
        const r = Re(),
          s = Pe(),
          i = ei(s, te + t, 16, null, n || null);
        null === i.projection && (i.projection = e),
          Ve(),
          64 != (64 & i.flags) &&
            (function (t, e, n) {
              Os(e[11], 0, e, n, ms(t, n, e), ws(n.parent || e[6], n, e));
            })(s, r, i);
      }
      function Lo(t, e, n, r, s) {
        const i = t[n + 1],
          o = null === e;
        let a = r ? Zs(i) : Qs(i),
          l = !1;
        for (; 0 !== a && (!1 === l || o); ) {
          const n = t[a + 1];
          Mo(t[a], e) && ((l = !0), (t[a + 1] = r ? Js(n) : Ks(n))), (a = r ? Zs(n) : Qs(n));
        }
        l && (t[n + 1] = r ? Ks(i) : Js(i));
      }
      function Mo(t, e) {
        return (
          null === t ||
          null == e ||
          (Array.isArray(t) ? t[1] : t) === e ||
          (!(!Array.isArray(t) || 'string' != typeof e) && er(t, e) >= 0)
        );
      }
      const No = { textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0 };
      function Vo(t) {
        return t.substring(No.key, No.keyEnd);
      }
      function jo(t, e) {
        const n = No.textEnd;
        return n === e
          ? -1
          : ((e = No.keyEnd =
              (function (t, e, n) {
                for (; e < n && t.charCodeAt(e) > 32; ) e++;
                return e;
              })(t, (No.key = e), n)),
            Fo(t, e, n));
      }
      function Fo(t, e, n) {
        for (; e < n && t.charCodeAt(e) <= 32; ) e++;
        return e;
      }
      function Uo(t, e) {
        return (
          (function (t, e, n, r) {
            const s = Re(),
              i = Pe(),
              o = ze(2);
            i.firstUpdatePass && $o(i, t, o, true),
              e !== $s &&
                fo(s, o, e) &&
                Go(
                  i,
                  i.data[en()],
                  s,
                  s[11],
                  t,
                  (s[o + 1] = (function (t, e) {
                    return null == t || ('object' == typeof t && (t = rt(Sr(t)))), t;
                  })(e)),
                  true,
                  o
                );
          })(t, e),
          Uo
        );
      }
      function Ho(t) {
        !(function (t, e, n, r) {
          const s = Pe(),
            i = ze(2);
          s.firstUpdatePass && $o(s, null, i, r);
          const o = Re();
          if (n !== $s && fo(o, i, n)) {
            const a = s.data[en()];
            if (Qo(a, r) && !Bo(s, i)) {
              let t = a.classesWithoutHost;
              null !== t && (n = st(t, n || '')), vo(s, a, o, n, r);
            } else
              !(function (t, e, n, r, s, i, o, a) {
                s === $s && (s = Mt);
                let l = 0,
                  c = 0,
                  u = 0 < s.length ? s[0] : null,
                  h = 0 < i.length ? i[0] : null;
                for (; null !== u || null !== h; ) {
                  const o = l < s.length ? s[l + 1] : void 0,
                    d = c < i.length ? i[c + 1] : void 0;
                  let p,
                    f = null;
                  u === h
                    ? ((l += 2), (c += 2), o !== d && ((f = h), (p = d)))
                    : null === h || (null !== u && u < h)
                    ? ((l += 2), (f = u))
                    : ((c += 2), (f = h), (p = d)),
                    null !== f && Go(t, e, n, r, f, p, true, a),
                    (u = l < s.length ? s[l] : null),
                    (h = c < i.length ? i[c] : null);
                }
              })(
                s,
                a,
                o,
                o[11],
                o[i + 1],
                (o[i + 1] = (function (t, e, n) {
                  if (null == n || '' === n) return Mt;
                  const r = [],
                    s = Sr(n);
                  if (Array.isArray(s)) for (let i = 0; i < s.length; i++) t(r, s[i], !0);
                  else if ('object' == typeof s) for (const i in s) s.hasOwnProperty(i) && t(r, i, s[i]);
                  else 'string' == typeof s && e(r, s);
                  return r;
                })(t, e, n)),
                0,
                i
              );
          }
        })(Xn, zo, t, !0);
      }
      function zo(t, e) {
        for (
          let n = (function (t) {
            return (
              (function (t) {
                (No.key = 0), (No.keyEnd = 0), (No.value = 0), (No.valueEnd = 0), (No.textEnd = t.length);
              })(t),
              jo(t, Fo(t, 0, No.textEnd))
            );
          })(e);
          n >= 0;
          n = jo(e, n)
        )
          Xn(t, Vo(e), !0);
      }
      function Bo(t, e) {
        return e >= t.expandoStartIndex;
      }
      function $o(t, e, n, r) {
        const s = t.data;
        if (null === s[n + 1]) {
          const i = s[en()],
            o = Bo(t, n);
          Qo(i, r) && null === e && !o && (e = !1),
            (e = (function (t, e, n, r) {
              const s = (function (t) {
                const e = Oe.lFrame.currentDirectiveIndex;
                return -1 === e ? null : t[e];
              })(t);
              let i = r ? e.residualClasses : e.residualStyles;
              if (null === s)
                0 === (r ? e.classBindings : e.styleBindings) &&
                  ((n = Wo((n = qo(null, t, e, n, r)), e.attrs, r)), (i = null));
              else {
                const o = e.directiveStylingLast;
                if (-1 === o || t[o] !== s)
                  if (((n = qo(s, t, e, n, r)), null === i)) {
                    let n = (function (t, e, n) {
                      const r = n ? e.classBindings : e.styleBindings;
                      if (0 !== Qs(r)) return t[Zs(r)];
                    })(t, e, r);
                    void 0 !== n &&
                      Array.isArray(n) &&
                      ((n = qo(null, t, e, n[1], r)),
                      (n = Wo(n, e.attrs, r)),
                      (function (t, e, n, r) {
                        t[Zs(n ? e.classBindings : e.styleBindings)] = r;
                      })(t, e, r, n));
                  } else
                    i = (function (t, e, n) {
                      let r;
                      const s = e.directiveEnd;
                      for (let i = 1 + e.directiveStylingLast; i < s; i++) r = Wo(r, t[i].hostAttrs, n);
                      return Wo(r, e.attrs, n);
                    })(t, e, r);
              }
              return void 0 !== i && (r ? (e.residualClasses = i) : (e.residualStyles = i)), n;
            })(s, i, e, r)),
            (function (t, e, n, r, s, i) {
              let o = i ? e.classBindings : e.styleBindings,
                a = Zs(o),
                l = Qs(o);
              t[r] = n;
              let c,
                u = !1;
              if (Array.isArray(n)) {
                const t = n;
                (c = t[1]), (null === c || er(t, c) > 0) && (u = !0);
              } else c = n;
              if (s)
                if (0 !== l) {
                  const e = Zs(t[a + 1]);
                  (t[r + 1] = Gs(e, a)),
                    0 !== e && (t[e + 1] = Ys(t[e + 1], r)),
                    (t[a + 1] = (131071 & t[a + 1]) | (r << 17));
                } else (t[r + 1] = Gs(a, 0)), 0 !== a && (t[a + 1] = Ys(t[a + 1], r)), (a = r);
              else (t[r + 1] = Gs(l, 0)), 0 === a ? (a = r) : (t[l + 1] = Ys(t[l + 1], r)), (l = r);
              u && (t[r + 1] = Ks(t[r + 1])),
                Lo(t, c, r, !0),
                Lo(t, c, r, !1),
                (function (t, e, n, r, s) {
                  const i = s ? t.residualClasses : t.residualStyles;
                  null != i && 'string' == typeof e && er(i, e) >= 0 && (n[r + 1] = Js(n[r + 1]));
                })(e, c, t, r, i),
                (o = Gs(a, l)),
                i ? (e.classBindings = o) : (e.styleBindings = o);
            })(s, i, e, n, o, r);
        }
      }
      function qo(t, e, n, r, s) {
        let i = null;
        const o = n.directiveEnd;
        let a = n.directiveStylingLast;
        for (-1 === a ? (a = n.directiveStart) : a++; a < o && ((i = e[a]), (r = Wo(r, i.hostAttrs, s)), i !== t); )
          a++;
        return null !== t && (n.directiveStylingLast = a), r;
      }
      function Wo(t, e, n) {
        const r = n ? 1 : 2;
        let s = -1;
        if (null !== e)
          for (let i = 0; i < e.length; i++) {
            const o = e[i];
            'number' == typeof o
              ? (s = o)
              : s === r && (Array.isArray(t) || (t = void 0 === t ? [] : ['', t]), Xn(t, o, !!n || e[++i]));
          }
        return void 0 === t ? null : t;
      }
      function Go(t, e, n, r, s, i, o, a) {
        if (!(3 & e.type)) return;
        const l = t.data,
          c = l[a + 1];
        Ko(1 == (1 & c) ? Zo(l, e, n, s, Qs(c), o) : void 0) ||
          (Ko(i) || (2 == (2 & c) && (i = Zo(l, null, n, s, a, o))),
          (function (t, e, n, r, s) {
            const i = me(t);
            if (e) s ? (i ? t.addClass(n, r) : n.classList.add(r)) : i ? t.removeClass(n, r) : n.classList.remove(r);
            else {
              let e = -1 === r.indexOf('-') ? void 0 : ss.DashCase;
              if (null == s) i ? t.removeStyle(n, r, e) : n.style.removeProperty(r);
              else {
                const o = 'string' == typeof s && s.endsWith('!important');
                o && ((s = s.slice(0, -10)), (e |= ss.Important)),
                  i ? t.setStyle(n, r, s, e) : n.style.setProperty(r, s, o ? 'important' : '');
              }
            }
          })(r, o, ve(en(), n), s, i));
      }
      function Zo(t, e, n, r, s, i) {
        const o = null === e;
        let a;
        for (; s > 0; ) {
          const e = t[s],
            i = Array.isArray(e),
            l = i ? e[1] : e,
            c = null === l;
          let u = n[s + 1];
          u === $s && (u = c ? Mt : void 0);
          let h = c ? tr(u, r) : l === r ? u : void 0;
          if ((i && !Ko(h) && (h = tr(e, r)), Ko(h) && ((a = h), o))) return a;
          const d = t[s + 1];
          s = o ? Zs(d) : Qs(d);
        }
        if (null !== e) {
          let t = i ? e.residualClasses : e.residualStyles;
          null != t && (a = tr(t, r));
        }
        return a;
      }
      function Ko(t) {
        return void 0 !== t;
      }
      function Qo(t, e) {
        return 0 != (t.flags & (e ? 16 : 32));
      }
      function Yo(t, e = '') {
        const n = Re(),
          r = Pe(),
          s = t + te,
          i = r.firstCreatePass ? ei(r, s, 1, e, null) : r.data[s],
          o = (n[s] = (function (t, e) {
            return me(t) ? t.createText(e) : t.createTextNode(e);
          })(n[11], e));
        xs(r, n, o, i), Me(i, !1);
      }
      function Jo(t) {
        return Xo('', t, ''), Jo;
      }
      function Xo(t, e, n) {
        const r = Re(),
          s = (function (t, e, n, r) {
            return fo(t, He(), n) ? e + ut(n) + r : $s;
          })(r, t, e, n);
        return (
          s !== $s &&
            (function (t, e, n) {
              const r = ve(e, t);
              !(function (t, e, n) {
                me(t) ? t.setValue(e, n) : (e.textContent = n);
              })(t[11], r, n);
            })(r, en(), s),
          Xo
        );
      }
      function ta(t, e, n) {
        const r = Re();
        return fo(r, He(), e) && fi(Pe(), rn(), r, t, e, r[11], n, !0), ta;
      }
      const ea = void 0;
      var na = [
        'en',
        [['a', 'p'], ['AM', 'PM'], ea],
        [['AM', 'PM'], ea, ea],
        [
          ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
          ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        ],
        ea,
        [
          ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
          ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ],
        ],
        ea,
        [
          ['B', 'A'],
          ['BC', 'AD'],
          ['Before Christ', 'Anno Domini'],
        ],
        0,
        [6, 0],
        ['M/d/yy', 'MMM d, y', 'MMMM d, y', 'EEEE, MMMM d, y'],
        ['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
        ['{1}, {0}', ea, "{1} 'at' {0}", ea],
        ['.', ',', ';', '%', '+', '-', 'E', '\xd7', '\u2030', '\u221e', 'NaN', ':'],
        ['#,##0.###', '#,##0%', '\xa4#,##0.00', '#E0'],
        'USD',
        '$',
        'US Dollar',
        {},
        'ltr',
        function (t) {
          const e = Math.floor(Math.abs(t)),
            n = t.toString().replace(/^[^.]*\.?/, '').length;
          return 1 === e && 0 === n ? 1 : 5;
        },
      ];
      let ra = {};
      function sa(t) {
        return t in ra || (ra[t] = Dt.ng && Dt.ng.common && Dt.ng.common.locales && Dt.ng.common.locales[t]), ra[t];
      }
      var ia = (() => (
        ((ia = ia || {})[(ia.LocaleId = 0)] = 'LocaleId'),
        (ia[(ia.DayPeriodsFormat = 1)] = 'DayPeriodsFormat'),
        (ia[(ia.DayPeriodsStandalone = 2)] = 'DayPeriodsStandalone'),
        (ia[(ia.DaysFormat = 3)] = 'DaysFormat'),
        (ia[(ia.DaysStandalone = 4)] = 'DaysStandalone'),
        (ia[(ia.MonthsFormat = 5)] = 'MonthsFormat'),
        (ia[(ia.MonthsStandalone = 6)] = 'MonthsStandalone'),
        (ia[(ia.Eras = 7)] = 'Eras'),
        (ia[(ia.FirstDayOfWeek = 8)] = 'FirstDayOfWeek'),
        (ia[(ia.WeekendRange = 9)] = 'WeekendRange'),
        (ia[(ia.DateFormat = 10)] = 'DateFormat'),
        (ia[(ia.TimeFormat = 11)] = 'TimeFormat'),
        (ia[(ia.DateTimeFormat = 12)] = 'DateTimeFormat'),
        (ia[(ia.NumberSymbols = 13)] = 'NumberSymbols'),
        (ia[(ia.NumberFormats = 14)] = 'NumberFormats'),
        (ia[(ia.CurrencyCode = 15)] = 'CurrencyCode'),
        (ia[(ia.CurrencySymbol = 16)] = 'CurrencySymbol'),
        (ia[(ia.CurrencyName = 17)] = 'CurrencyName'),
        (ia[(ia.Currencies = 18)] = 'Currencies'),
        (ia[(ia.Directionality = 19)] = 'Directionality'),
        (ia[(ia.PluralCase = 20)] = 'PluralCase'),
        (ia[(ia.ExtraData = 21)] = 'ExtraData'),
        ia
      ))();
      const oa = 'en-US';
      let aa = oa;
      function la(t) {
        var e, n;
        (n = 'Expected localeId to be defined'),
          null == (e = t) &&
            (function (t, e, n, r) {
              throw new Error(`ASSERTION ERROR: ${t} [Expected=> null != ${e} <=Actual]`);
            })(n, e),
          'string' == typeof t && (aa = t.toLowerCase().replace(/_/g, '-'));
      }
      function ca(t, e, n, r, s) {
        if (((t = at(t)), Array.isArray(t))) for (let i = 0; i < t.length; i++) ca(t[i], e, n, r, s);
        else {
          const i = Pe(),
            o = Re();
          let a = Xi(t) ? t : at(t.provide),
            l = Qi(t);
          const c = De(),
            u = 1048575 & c.providerIndexes,
            h = c.directiveStart,
            d = c.providerIndexes >> 20;
          if (Xi(t) || !t.multi) {
            const r = new dn(l, s, _o),
              p = da(a, e, s ? u : u + d, h);
            -1 === p
              ? (An(Sn(c, o), i, a),
                ua(i, t, e.length),
                e.push(a),
                c.directiveStart++,
                c.directiveEnd++,
                s && (c.providerIndexes += 1048576),
                n.push(r),
                o.push(r))
              : ((n[p] = r), (o[p] = r));
          } else {
            const p = da(a, e, u + d, h),
              f = da(a, e, u, u + d),
              g = p >= 0 && n[p],
              m = f >= 0 && n[f];
            if ((s && !m) || (!s && !g)) {
              An(Sn(c, o), i, a);
              const u = (function (t, e, n, r, s) {
                const i = new dn(t, n, _o);
                return (i.multi = []), (i.index = e), (i.componentProviders = 0), ha(i, s, r && !n), i;
              })(s ? fa : pa, n.length, s, r, l);
              !s && m && (n[f].providerFactory = u),
                ua(i, t, e.length, 0),
                e.push(a),
                c.directiveStart++,
                c.directiveEnd++,
                s && (c.providerIndexes += 1048576),
                n.push(u),
                o.push(u);
            } else ua(i, t, p > -1 ? p : f, ha(n[s ? f : p], l, !s && r));
            !s && r && m && n[f].componentProviders++;
          }
        }
      }
      function ua(t, e, n, r) {
        const s = Xi(e);
        if (s || e.useClass) {
          const i = (e.useClass || e).prototype.ngOnDestroy;
          if (i) {
            const o = t.destroyHooks || (t.destroyHooks = []);
            if (!s && e.multi) {
              const t = o.indexOf(n);
              -1 === t ? o.push(n, [r, i]) : o[t + 1].push(r, i);
            } else o.push(n, i);
          }
        }
      }
      function ha(t, e, n) {
        return n && t.componentProviders++, t.multi.push(e) - 1;
      }
      function da(t, e, n, r) {
        for (let s = n; s < r; s++) if (e[s] === t) return s;
        return -1;
      }
      function pa(t, e, n, r) {
        return ga(this.multi, []);
      }
      function fa(t, e, n, r) {
        const s = this.multi;
        let i;
        if (this.providerFactory) {
          const t = this.providerFactory.componentProviders,
            e = Nn(n, n[1], this.providerFactory.index, r);
          (i = e.slice(0, t)), ga(s, i);
          for (let n = t; n < e.length; n++) i.push(e[n]);
        } else (i = []), ga(s, i);
        return i;
      }
      function ga(t, e) {
        for (let n = 0; n < t.length; n++) e.push((0, t[n])());
        return e;
      }
      function ma(t, e = []) {
        return (n) => {
          n.providersResolver = (n, r) =>
            (function (t, e, n) {
              const r = Pe();
              if (r.firstCreatePass) {
                const s = ae(t);
                ca(n, r.data, r.blueprint, s, !0), ca(e, r.data, r.blueprint, s, !1);
              }
            })(n, r ? r(t) : t, e);
        };
      }
      class _a {}
      class ya {
        resolveComponentFactory(t) {
          throw (function (t) {
            const e = Error(`No component factory found for ${rt(t)}. Did you add it to @NgModule.entryComponents?`);
            return (e.ngComponent = t), e;
          })(t);
        }
      }
      class va {}
      function ba(...t) {}
      function wa(t, e) {
        return new xa(be(t, e));
      }
      va.NULL = new ya();
      const Ca = function () {
        return wa(De(), Re());
      };
      let xa = (() => {
        class t {
          constructor(t) {
            this.nativeElement = t;
          }
        }
        return (t.__NG_ELEMENT_ID__ = Ca), t;
      })();
      function Sa(t) {
        return t instanceof xa ? t.nativeElement : t;
      }
      class Ea {}
      let ka = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = () => Ta()), t;
      })();
      const Ta = function () {
        const t = Re(),
          e = xe(De().index, t);
        return (function (t) {
          return t[11];
        })(ne(e) ? e : t);
      };
      let Aa = (() => {
        class t {}
        return (t.??prov = pt({ token: t, providedIn: 'root', factory: () => null })), t;
      })();
      class Oa {
        constructor(t) {
          (this.full = t),
            (this.major = t.split('.')[0]),
            (this.minor = t.split('.')[1]),
            (this.patch = t.split('.').slice(2).join('.'));
        }
      }
      const Ia = new Oa('12.2.12');
      class Ra {
        constructor() {}
        supports(t) {
          return ho(t);
        }
        create(t) {
          return new Da(t);
        }
      }
      const Pa = (t, e) => e;
      class Da {
        constructor(t) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || Pa);
        }
        forEachItem(t) {
          let e;
          for (e = this._itHead; null !== e; e = e._next) t(e);
        }
        forEachOperation(t) {
          let e = this._itHead,
            n = this._removalsHead,
            r = 0,
            s = null;
          for (; e || n; ) {
            const i = !n || (e && e.currentIndex < Va(n, r, s)) ? e : n,
              o = Va(i, r, s),
              a = i.currentIndex;
            if (i === n) r--, (n = n._nextRemoved);
            else if (((e = e._next), null == i.previousIndex)) r++;
            else {
              s || (s = []);
              const t = o - r,
                e = a - r;
              if (t != e) {
                for (let n = 0; n < t; n++) {
                  const r = n < s.length ? s[n] : (s[n] = 0),
                    i = r + n;
                  e <= i && i < t && (s[n] = r + 1);
                }
                s[i.previousIndex] = e - t;
              }
            }
            o !== a && t(i, o, a);
          }
        }
        forEachPreviousItem(t) {
          let e;
          for (e = this._previousItHead; null !== e; e = e._nextPrevious) t(e);
        }
        forEachAddedItem(t) {
          let e;
          for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e);
        }
        forEachMovedItem(t) {
          let e;
          for (e = this._movesHead; null !== e; e = e._nextMoved) t(e);
        }
        forEachRemovedItem(t) {
          let e;
          for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e);
        }
        forEachIdentityChange(t) {
          let e;
          for (e = this._identityChangesHead; null !== e; e = e._nextIdentityChange) t(e);
        }
        diff(t) {
          if ((null == t && (t = []), !ho(t)))
            throw new Error(`Error trying to diff '${rt(t)}'. Only arrays and iterables are allowed`);
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let e,
            n,
            r,
            s = this._itHead,
            i = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let e = 0; e < this.length; e++)
              (n = t[e]),
                (r = this._trackByFn(e, n)),
                null !== s && Object.is(s.trackById, r)
                  ? (i && (s = this._verifyReinsertion(s, n, r, e)),
                    Object.is(s.item, n) || this._addIdentityChange(s, n))
                  : ((s = this._mismatch(s, n, r, e)), (i = !0)),
                (s = s._next);
          } else
            (e = 0),
              (function (t, e) {
                if (Array.isArray(t)) for (let n = 0; n < t.length; n++) e(t[n]);
                else {
                  const n = t[co()]();
                  let r;
                  for (; !(r = n.next()).done; ) e(r.value);
                }
              })(t, (t) => {
                (r = this._trackByFn(e, t)),
                  null !== s && Object.is(s.trackById, r)
                    ? (i && (s = this._verifyReinsertion(s, t, r, e)),
                      Object.is(s.item, t) || this._addIdentityChange(s, t))
                    : ((s = this._mismatch(s, t, r, e)), (i = !0)),
                  (s = s._next),
                  e++;
              }),
              (this.length = e);
          return this._truncate(s), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (t = this._previousItHead = this._itHead; null !== t; t = t._next) t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded) t.previousIndex = t.currentIndex;
            for (this._additionsHead = this._additionsTail = null, t = this._movesHead; null !== t; t = t._nextMoved)
              t.previousIndex = t.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, e, n, r) {
          let s;
          return (
            null === t ? (s = this._itTail) : ((s = t._prev), this._remove(t)),
            null !== (t = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(n, null))
              ? (Object.is(t.item, e) || this._addIdentityChange(t, e), this._reinsertAfter(t, s, r))
              : null !== (t = null === this._linkedRecords ? null : this._linkedRecords.get(n, r))
              ? (Object.is(t.item, e) || this._addIdentityChange(t, e), this._moveAfter(t, s, r))
              : (t = this._addAfter(new La(e, n), s, r)),
            t
          );
        }
        _verifyReinsertion(t, e, n, r) {
          let s = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(n, null);
          return (
            null !== s
              ? (t = this._reinsertAfter(s, t._prev, r))
              : t.currentIndex != r && ((t.currentIndex = r), this._addToMoves(t, r)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const e = t._next;
            this._addToRemovals(this._unlink(t)), (t = e);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail && (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail && (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail && (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, e, n) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const r = t._prevRemoved,
            s = t._nextRemoved;
          return (
            null === r ? (this._removalsHead = s) : (r._nextRemoved = s),
            null === s ? (this._removalsTail = r) : (s._prevRemoved = r),
            this._insertAfter(t, e, n),
            this._addToMoves(t, n),
            t
          );
        }
        _moveAfter(t, e, n) {
          return this._unlink(t), this._insertAfter(t, e, n), this._addToMoves(t, n), t;
        }
        _addAfter(t, e, n) {
          return (
            this._insertAfter(t, e, n),
            (this._additionsTail =
              null === this._additionsTail ? (this._additionsHead = t) : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, e, n) {
          const r = null === e ? this._itHead : e._next;
          return (
            (t._next = r),
            (t._prev = e),
            null === r ? (this._itTail = t) : (r._prev = t),
            null === e ? (this._itHead = t) : (e._next = t),
            null === this._linkedRecords && (this._linkedRecords = new Na()),
            this._linkedRecords.put(t),
            (t.currentIndex = n),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const e = t._prev,
            n = t._next;
          return null === e ? (this._itHead = n) : (e._next = n), null === n ? (this._itTail = e) : (n._prev = e), t;
        }
        _addToMoves(t, e) {
          return (
            t.previousIndex === e ||
              (this._movesTail = null === this._movesTail ? (this._movesHead = t) : (this._movesTail._nextMoved = t)),
            t
          );
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords && (this._unlinkedRecords = new Na()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t), (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail), (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, e) {
          return (
            (t.item = e),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class La {
        constructor(t, e) {
          (this.item = t),
            (this.trackById = e),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class Ma {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t), (t._nextDup = null), (t._prevDup = null))
            : ((this._tail._nextDup = t), (t._prevDup = this._tail), (t._nextDup = null), (this._tail = t));
        }
        get(t, e) {
          let n;
          for (n = this._head; null !== n; n = n._nextDup)
            if ((null === e || e <= n.currentIndex) && Object.is(n.trackById, t)) return n;
          return null;
        }
        remove(t) {
          const e = t._prevDup,
            n = t._nextDup;
          return (
            null === e ? (this._head = n) : (e._nextDup = n),
            null === n ? (this._tail = e) : (n._prevDup = e),
            null === this._head
          );
        }
      }
      class Na {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const e = t.trackById;
          let n = this.map.get(e);
          n || ((n = new Ma()), this.map.set(e, n)), n.add(t);
        }
        get(t, e) {
          const n = this.map.get(t);
          return n ? n.get(t, e) : null;
        }
        remove(t) {
          const e = t.trackById;
          return this.map.get(e).remove(t) && this.map.delete(e), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function Va(t, e, n) {
        const r = t.previousIndex;
        if (null === r) return r;
        let s = 0;
        return n && r < n.length && (s = n[r]), r + e + s;
      }
      class ja {
        constructor() {}
        supports(t) {
          return t instanceof Map || po(t);
        }
        create() {
          return new Fa();
        }
      }
      class Fa {
        constructor() {
          (this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null);
        }
        get isDirty() {
          return null !== this._additionsHead || null !== this._changesHead || null !== this._removalsHead;
        }
        forEachItem(t) {
          let e;
          for (e = this._mapHead; null !== e; e = e._next) t(e);
        }
        forEachPreviousItem(t) {
          let e;
          for (e = this._previousMapHead; null !== e; e = e._nextPrevious) t(e);
        }
        forEachChangedItem(t) {
          let e;
          for (e = this._changesHead; null !== e; e = e._nextChanged) t(e);
        }
        forEachAddedItem(t) {
          let e;
          for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e);
        }
        forEachRemovedItem(t) {
          let e;
          for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e);
        }
        diff(t) {
          if (t) {
            if (!(t instanceof Map || po(t)))
              throw new Error(`Error trying to diff '${rt(t)}'. Only maps and objects are allowed`);
          } else t = new Map();
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let e = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(t, (t, n) => {
              if (e && e.key === n) this._maybeAddToChanges(e, t), (this._appendAfter = e), (e = e._next);
              else {
                const r = this._getOrCreateRecordForKey(n, t);
                e = this._insertBeforeOrAppend(e, r);
              }
            }),
            e)
          ) {
            e._prev && (e._prev._next = null), (this._removalsHead = e);
            for (let t = e; null !== t; t = t._nextRemoved)
              t === this._mapHead && (this._mapHead = null),
                this._records.delete(t.key),
                (t._nextRemoved = t._next),
                (t.previousValue = t.currentValue),
                (t.currentValue = null),
                (t._prev = null),
                (t._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(t, e) {
          if (t) {
            const n = t._prev;
            return (
              (e._next = t),
              (e._prev = n),
              (t._prev = e),
              n && (n._next = e),
              t === this._mapHead && (this._mapHead = e),
              (this._appendAfter = t),
              t
            );
          }
          return (
            this._appendAfter ? ((this._appendAfter._next = e), (e._prev = this._appendAfter)) : (this._mapHead = e),
            (this._appendAfter = e),
            null
          );
        }
        _getOrCreateRecordForKey(t, e) {
          if (this._records.has(t)) {
            const n = this._records.get(t);
            this._maybeAddToChanges(n, e);
            const r = n._prev,
              s = n._next;
            return r && (r._next = s), s && (s._prev = r), (n._next = null), (n._prev = null), n;
          }
          const n = new Ua(t);
          return this._records.set(t, n), (n.currentValue = e), this._addToAdditions(n), n;
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (this._previousMapHead = this._mapHead, t = this._previousMapHead; null !== t; t = t._next)
              t._nextPrevious = t._next;
            for (t = this._changesHead; null !== t; t = t._nextChanged) t.previousValue = t.currentValue;
            for (t = this._additionsHead; null != t; t = t._nextAdded) t.previousValue = t.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(t, e) {
          Object.is(e, t.currentValue) ||
            ((t.previousValue = t.currentValue), (t.currentValue = e), this._addToChanges(t));
        }
        _addToAdditions(t) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = t)
            : ((this._additionsTail._nextAdded = t), (this._additionsTail = t));
        }
        _addToChanges(t) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = t)
            : ((this._changesTail._nextChanged = t), (this._changesTail = t));
        }
        _forEach(t, e) {
          t instanceof Map ? t.forEach(e) : Object.keys(t).forEach((n) => e(t[n], n));
        }
      }
      class Ua {
        constructor(t) {
          (this.key = t),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      function Ha() {
        return new za([new Ra()]);
      }
      let za = (() => {
        class t {
          constructor(t) {
            this.factories = t;
          }
          static create(e, n) {
            if (null != n) {
              const t = n.factories.slice();
              e = e.concat(t);
            }
            return new t(e);
          }
          static extend(e) {
            return { provide: t, useFactory: (n) => t.create(e, n || Ha()), deps: [[t, new gr(), new fr()]] };
          }
          find(t) {
            const e = this.factories.find((e) => e.supports(t));
            if (null != e) return e;
            throw new Error(`Cannot find a differ supporting object '${t}' of type '${((n = t), n.name || typeof n)}'`);
            var n;
          }
        }
        return (t.??prov = pt({ token: t, providedIn: 'root', factory: Ha })), t;
      })();
      function Ba() {
        return new $a([new ja()]);
      }
      let $a = (() => {
        class t {
          constructor(t) {
            this.factories = t;
          }
          static create(e, n) {
            if (n) {
              const t = n.factories.slice();
              e = e.concat(t);
            }
            return new t(e);
          }
          static extend(e) {
            return { provide: t, useFactory: (n) => t.create(e, n || Ba()), deps: [[t, new gr(), new fr()]] };
          }
          find(t) {
            const e = this.factories.find((e) => e.supports(t));
            if (e) return e;
            throw new Error(`Cannot find a differ supporting object '${t}'`);
          }
        }
        return (t.??prov = pt({ token: t, providedIn: 'root', factory: Ba })), t;
      })();
      function qa(t, e, n, r, s = !1) {
        for (; null !== n; ) {
          const i = e[n.index];
          if ((null !== i && r.push(ye(i)), re(i)))
            for (let t = ee; t < i.length; t++) {
              const e = i[t],
                n = e[1].firstChild;
              null !== n && qa(e[1], e, n, r);
            }
          const o = n.type;
          if (8 & o) qa(t, e, n.child, r);
          else if (32 & o) {
            const t = is(n, e);
            let s;
            for (; (s = t()); ) r.push(s);
          } else if (16 & o) {
            const t = Es(e, n);
            if (Array.isArray(t)) r.push(...t);
            else {
              const n = os(e[16]);
              qa(n[1], n, t, r, !0);
            }
          }
          n = s ? n.projectionNext : n.next;
        }
        return r;
      }
      class Wa {
        constructor(t, e) {
          (this._lView = t),
            (this._cdRefInjectingView = e),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get rootNodes() {
          const t = this._lView,
            e = t[1];
          return qa(e, t, e.firstChild, []);
        }
        get context() {
          return this._lView[8];
        }
        set context(t) {
          this._lView[8] = t;
        }
        get destroyed() {
          return 256 == (256 & this._lView[2]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[3];
            if (re(t)) {
              const e = t[8],
                n = e ? e.indexOf(this) : -1;
              n > -1 && (ps(t, n), Yn(e, n));
            }
            this._attachedToViewContainer = !1;
          }
          fs(this._lView[1], this._lView);
        }
        onDestroy(t) {
          di(this._lView[1], this._lView, null, t);
        }
        markForCheck() {
          Ii(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[2] &= -129;
        }
        reattach() {
          this._lView[2] |= 128;
        }
        detectChanges() {
          Ri(this._lView[1], this._lView, this.context);
        }
        checkNoChanges() {
          !(function (t, e, n) {
            Fe(!0);
            try {
              Ri(t, e, n);
            } finally {
              Fe(!1);
            }
          })(this._lView[1], this._lView, this.context);
        }
        attachToViewContainerRef() {
          if (this._appRef) throw new Error('This view is already attached directly to the ApplicationRef!');
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          var t;
          (this._appRef = null), As(this._lView[1], (t = this._lView), t[11], 2, null, null);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new Error('This view is already attached to a ViewContainer!');
          this._appRef = t;
        }
      }
      class Ga extends Wa {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          Pi(this._view);
        }
        checkNoChanges() {
          !(function (t) {
            Fe(!0);
            try {
              Pi(t);
            } finally {
              Fe(!1);
            }
          })(this._view);
        }
        get context() {
          return null;
        }
      }
      const Za = function (t) {
        return (function (t, e, n) {
          if (ie(t) && !n) {
            const n = xe(t.index, e);
            return new Wa(n, n);
          }
          return 47 & t.type ? new Wa(e[16], e) : null;
        })(De(), Re(), 16 == (16 & t));
      };
      let Ka = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = Za), t;
      })();
      const Qa = [new ja()],
        Ya = new za([new Ra()]),
        Ja = new $a(Qa),
        Xa = function () {
          return rl(De(), Re());
        };
      let tl = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = Xa), t;
      })();
      const el = tl,
        nl = class extends el {
          constructor(t, e, n) {
            super(), (this._declarationLView = t), (this._declarationTContainer = e), (this.elementRef = n);
          }
          createEmbeddedView(t) {
            const e = this._declarationTContainer.tViews,
              n = ti(this._declarationLView, e, t, 16, null, e.declTNode, null, null, null, null);
            n[17] = this._declarationLView[this._declarationTContainer.index];
            const r = this._declarationLView[19];
            return null !== r && (n[19] = r.createEmbeddedView(e)), ri(e, n, t), new Wa(n);
          }
        };
      function rl(t, e) {
        return 4 & t.type ? new nl(e, t, wa(t, e)) : null;
      }
      class sl {}
      class il {}
      const ol = function () {
        return dl(De(), Re());
      };
      let al = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = ol), t;
      })();
      const ll = al,
        cl = class extends ll {
          constructor(t, e, n) {
            super(), (this._lContainer = t), (this._hostTNode = e), (this._hostLView = n);
          }
          get element() {
            return wa(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new Fn(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = Tn(this._hostTNode, this._hostLView);
            if (yn(t)) {
              const e = bn(t, this._hostLView),
                n = vn(t);
              return new Fn(e[1].data[n + 8], e);
            }
            return new Fn(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const e = ul(this._lContainer);
            return (null !== e && e[t]) || null;
          }
          get length() {
            return this._lContainer.length - ee;
          }
          createEmbeddedView(t, e, n) {
            const r = t.createEmbeddedView(e || {});
            return this.insert(r, n), r;
          }
          createComponent(t, e, n, r, s) {
            const i = n || this.parentInjector;
            if (!s && null == t.ngModule && i) {
              const t = i.get(sl, null);
              t && (s = t);
            }
            const o = t.create(i, r, void 0, s);
            return this.insert(o.hostView, e), o;
          }
          insert(t, e) {
            const n = t._lView,
              r = n[1];
            if (re(n[3])) {
              const e = this.indexOf(t);
              if (-1 !== e) this.detach(e);
              else {
                const e = n[3],
                  r = new cl(e, e[6], e[3]);
                r.detach(r.indexOf(t));
              }
            }
            const s = this._adjustIndex(e),
              i = this._lContainer;
            !(function (t, e, n, r) {
              const s = ee + r,
                i = n.length;
              r > 0 && (n[s - 1][4] = e),
                r < i - ee ? ((e[4] = n[s]), Qn(n, ee + r, e)) : (n.push(e), (e[4] = null)),
                (e[3] = n);
              const o = e[17];
              null !== o &&
                n !== o &&
                (function (t, e) {
                  const n = t[9];
                  e[16] !== e[3][3][16] && (t[2] = !0), null === n ? (t[9] = [e]) : n.push(e);
                })(o, e);
              const a = e[19];
              null !== a && a.insertView(t), (e[2] |= 128);
            })(r, n, i, s);
            const o = ks(s, i),
              a = n[11],
              l = bs(a, i[7]);
            return (
              null !== l &&
                (function (t, e, n, r, s, i) {
                  (r[0] = s), (r[6] = e), As(t, r, n, 1, s, i);
                })(r, i[6], a, n, l, o),
              t.attachToViewContainerRef(),
              Qn(hl(i), s, t),
              t
            );
          }
          move(t, e) {
            return this.insert(t, e);
          }
          indexOf(t) {
            const e = ul(this._lContainer);
            return null !== e ? e.indexOf(t) : -1;
          }
          remove(t) {
            const e = this._adjustIndex(t, -1),
              n = ps(this._lContainer, e);
            n && (Yn(hl(this._lContainer), e), fs(n[1], n));
          }
          detach(t) {
            const e = this._adjustIndex(t, -1),
              n = ps(this._lContainer, e);
            return n && null != Yn(hl(this._lContainer), e) ? new Wa(n) : null;
          }
          _adjustIndex(t, e = 0) {
            return null == t ? this.length + e : t;
          }
        };
      function ul(t) {
        return t[8];
      }
      function hl(t) {
        return t[8] || (t[8] = []);
      }
      function dl(t, e) {
        let n;
        const r = e[t.index];
        if (re(r)) n = r;
        else {
          let s;
          if (8 & t.type) s = ye(r);
          else {
            const n = e[11];
            s = n.createComment('');
            const r = be(t, e);
            _s(
              n,
              bs(n, r),
              s,
              (function (t, e) {
                return me(t) ? t.nextSibling(e) : e.nextSibling;
              })(n, r),
              !1
            );
          }
          (e[t.index] = n = Ei(r, e, s, t)), Oi(e, n);
        }
        return new cl(n, t, e);
      }
      const pl = {};
      class fl extends va {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const e = Jt(t);
          return new _l(e, this.ngModule);
        }
      }
      function gl(t) {
        const e = [];
        for (let n in t) t.hasOwnProperty(n) && e.push({ propName: t[n], templateName: n });
        return e;
      }
      const ml = new qn('SCHEDULER_TOKEN', { providedIn: 'root', factory: () => ns });
      class _l extends _a {
        constructor(t, e) {
          super(),
            (this.componentDef = t),
            (this.ngModule = e),
            (this.componentType = t.type),
            (this.selector = t.selectors.map(Bs).join(',')),
            (this.ngContentSelectors = t.ngContentSelectors ? t.ngContentSelectors : []),
            (this.isBoundToModule = !!e);
        }
        get inputs() {
          return gl(this.componentDef.inputs);
        }
        get outputs() {
          return gl(this.componentDef.outputs);
        }
        create(t, e, n, r) {
          const s = (r = r || this.ngModule)
              ? (function (t, e) {
                  return {
                    get: (n, r, s) => {
                      const i = t.get(n, pl, s);
                      return i !== pl || r === pl ? i : e.get(n, r, s);
                    },
                  };
                })(t, r.injector)
              : t,
            i = s.get(Ea, _e),
            o = s.get(Aa, null),
            a = i.createRenderer(null, this.componentDef),
            l = this.componentDef.selectors[0][0] || 'div',
            c = n
              ? (function (t, e, n) {
                  if (me(t)) return t.selectRootElement(e, n === At.ShadowDom);
                  let r = 'string' == typeof e ? t.querySelector(e) : e;
                  return (r.textContent = ''), r;
                })(a, n, this.componentDef.encapsulation)
              : hs(
                  i.createRenderer(null, this.componentDef),
                  l,
                  (function (t) {
                    const e = t.toLowerCase();
                    return 'svg' === e
                      ? 'http://www.w3.org/2000/svg'
                      : 'math' === e
                      ? 'http://www.w3.org/1998/MathML/'
                      : null;
                  })(l)
                ),
            u = this.componentDef.onPush ? 576 : 528,
            h = { components: [], scheduler: ns, clean: Li, playerHandler: null, flags: 0 },
            d = hi(0, null, null, 1, 0, null, null, null, null, null),
            p = ti(null, d, h, u, null, null, i, a, o, s);
          let f, g;
          Ke(p);
          try {
            const t = (function (t, e, n, r, s, i) {
              const o = n[1];
              n[20] = t;
              const a = ei(o, 20, 2, '#host', null),
                l = (a.mergedAttrs = e.hostAttrs);
              null !== l &&
                (Fi(a, l, !0),
                null !== t &&
                  (pn(s, t, l), null !== a.classes && Rs(s, t, a.classes), null !== a.styles && Is(s, t, a.styles)));
              const c = r.createRenderer(t, e),
                u = ti(n, ui(e), null, e.onPush ? 64 : 16, n[20], a, r, c, null, null);
              return (
                o.firstCreatePass && (An(Sn(a, n), o, e.type), yi(o, a), bi(a, n.length, 1)), Oi(n, u), (n[20] = u)
              );
            })(c, this.componentDef, p, i, a);
            if (c)
              if (n) pn(a, c, ['ng-version', Ia.full]);
              else {
                const { attrs: t, classes: e } = (function (t) {
                  const e = [],
                    n = [];
                  let r = 1,
                    s = 2;
                  for (; r < t.length; ) {
                    let i = t[r];
                    if ('string' == typeof i) 2 === s ? '' !== i && e.push(i, t[++r]) : 8 === s && n.push(i);
                    else {
                      if (!js(s)) break;
                      s = i;
                    }
                    r++;
                  }
                  return { attrs: e, classes: n };
                })(this.componentDef.selectors[0]);
                t && pn(a, c, t), e && e.length > 0 && Rs(a, c, e.join(' '));
              }
            if (((g = we(d, te)), void 0 !== e)) {
              const t = (g.projection = []);
              for (let n = 0; n < this.ngContentSelectors.length; n++) {
                const r = e[n];
                t.push(null != r ? Array.from(r) : null);
              }
            }
            (f = (function (t, e, n, r, s) {
              const i = n[1],
                o = (function (t, e, n) {
                  const r = De();
                  t.firstCreatePass &&
                    (n.providersResolver && n.providersResolver(n), wi(t, r, e, ni(t, e, 1, null), n));
                  const s = Nn(e, t, r.directiveStart, r);
                  Yr(s, e);
                  const i = be(r, e);
                  return i && Yr(i, e), s;
                })(i, n, e);
              if ((r.components.push(o), (t[8] = o), s && s.forEach((t) => t(o, e)), e.contentQueries)) {
                const t = De();
                e.contentQueries(1, o, t.directiveStart);
              }
              const a = De();
              return (
                !i.firstCreatePass ||
                  (null === e.hostBindings && null === e.hostAttrs) ||
                  (nn(a.index), mi(n[1], a, 0, a.directiveStart, a.directiveEnd, e), _i(e, o)),
                o
              );
            })(t, this.componentDef, p, h, [no])),
              ri(d, p, null);
          } finally {
            tn();
          }
          return new yl(this.componentType, f, wa(g, p), p, g);
        }
      }
      class yl extends class {} {
        constructor(t, e, n, r, s) {
          super(),
            (this.location = n),
            (this._rootLView = r),
            (this._tNode = s),
            (this.instance = e),
            (this.hostView = this.changeDetectorRef = new Ga(r)),
            (this.componentType = t);
        }
        get injector() {
          return new Fn(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      const vl = new Map();
      class bl extends sl {
        constructor(t, e) {
          super(),
            (this._parent = e),
            (this._bootstrapComponents = []),
            (this.injector = this),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new fl(this));
          const n = Xt(t),
            r = t[Ut] || null;
          r && la(r),
            (this._bootstrapComponents = rs(n.bootstrap)),
            (this._r3Injector = Gi(
              t,
              e,
              [
                { provide: sl, useValue: this },
                { provide: va, useValue: this.componentFactoryResolver },
              ],
              rt(t)
            )),
            this._r3Injector._resolveInjectorDefTypes(),
            (this.instance = this.get(t));
        }
        get(t, e = eo.THROW_IF_NOT_FOUND, n = Ct.Default) {
          return t === eo || t === sl || t === Ui ? this : this._r3Injector.get(t, e, n);
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(), this.destroyCbs.forEach((t) => t()), (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class wl extends il {
        constructor(t) {
          super(),
            (this.moduleType = t),
            null !== Xt(t) &&
              (function (t) {
                const e = new Set();
                !(function t(n) {
                  const r = Xt(n, !0),
                    s = r.id;
                  null !== s &&
                    ((function (t, e, n) {
                      if (e && e !== n)
                        throw new Error(`Duplicate module registered for ${t} - ${rt(e)} vs ${rt(e.name)}`);
                    })(s, vl.get(s), n),
                    vl.set(s, n));
                  const i = rs(r.imports);
                  for (const o of i) e.has(o) || (e.add(o), t(o));
                })(t);
              })(t);
        }
        create(t) {
          return new bl(this.moduleType, t);
        }
      }
      function Cl(t, e, n, r, s, i) {
        const o = e + n;
        return fo(t, o, s)
          ? (function (t, e, n) {
              return (t[e] = n);
            })(t, o + 1, i ? r.call(i, s) : r(s))
          : (function (t, e) {
              const n = t[e];
              return n === $s ? void 0 : n;
            })(t, o + 1);
      }
      function xl(t, e) {
        const n = Pe();
        let r;
        const s = t + te;
        n.firstCreatePass
          ? ((r = (function (t, e) {
              if (e)
                for (let n = e.length - 1; n >= 0; n--) {
                  const r = e[n];
                  if (t === r.name) return r;
                }
              throw new ct('302', `The pipe '${t}' could not be found!`);
            })(e, n.pipeRegistry)),
            (n.data[s] = r),
            r.onDestroy && (n.destroyHooks || (n.destroyHooks = [])).push(s, r.onDestroy))
          : (r = n.data[s]);
        const i = r.factory || (r.factory = le(r.type)),
          o = St(_o);
        try {
          const t = Cn(!1),
            e = i();
          return (
            Cn(t),
            (function (t, e, n, r) {
              n >= t.data.length && ((t.data[n] = null), (t.blueprint[n] = null)), (e[n] = r);
            })(n, Re(), s, e),
            e
          );
        } finally {
          St(o);
        }
      }
      function Sl(t, e, n) {
        const r = t + te,
          s = Re(),
          i = Ce(s, r);
        return (function (t, e) {
          return uo.isWrapped(e) && ((e = uo.unwrap(e)), (t[Oe.lFrame.bindingIndex] = $s)), e;
        })(
          s,
          (function (t, e) {
            return t[1].data[e].pure;
          })(s, r)
            ? Cl(s, Ue(), e, i.transform, n, i)
            : i.transform(n)
        );
      }
      function El(t) {
        return (e) => {
          setTimeout(t, void 0, e);
        };
      }
      const kl = class extends x {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, e, n) {
          var r, s, i;
          let o = t,
            a = e || (() => null),
            l = n;
          if (t && 'object' == typeof t) {
            const e = t;
            (o = null === (r = e.next) || void 0 === r ? void 0 : r.bind(e)),
              (a = null === (s = e.error) || void 0 === s ? void 0 : s.bind(e)),
              (l = null === (i = e.complete) || void 0 === i ? void 0 : i.bind(e));
          }
          this.__isAsync && ((a = El(a)), o && (o = El(o)), l && (l = El(l)));
          const c = super.subscribe({ next: o, error: a, complete: l });
          return t instanceof h && t.add(c), c;
        }
      };
      function Tl() {
        return this._results[co()]();
      }
      class Al {
        constructor(t = !1) {
          (this._emitDistinctChangesOnly = t),
            (this.dirty = !0),
            (this._results = []),
            (this._changesDetected = !1),
            (this._changes = null),
            (this.length = 0),
            (this.first = void 0),
            (this.last = void 0);
          const e = co(),
            n = Al.prototype;
          n[e] || (n[e] = Tl);
        }
        get changes() {
          return this._changes || (this._changes = new kl());
        }
        get(t) {
          return this._results[t];
        }
        map(t) {
          return this._results.map(t);
        }
        filter(t) {
          return this._results.filter(t);
        }
        find(t) {
          return this._results.find(t);
        }
        reduce(t, e) {
          return this._results.reduce(t, e);
        }
        forEach(t) {
          this._results.forEach(t);
        }
        some(t) {
          return this._results.some(t);
        }
        toArray() {
          return this._results.slice();
        }
        toString() {
          return this._results.toString();
        }
        reset(t, e) {
          const n = this;
          n.dirty = !1;
          const r = Zn(t);
          (this._changesDetected = !(function (t, e, n) {
            if (t.length !== e.length) return !1;
            for (let r = 0; r < t.length; r++) {
              let s = t[r],
                i = e[r];
              if ((n && ((s = n(s)), (i = n(i))), i !== s)) return !1;
            }
            return !0;
          })(n._results, r, e)) &&
            ((n._results = r), (n.length = r.length), (n.last = r[this.length - 1]), (n.first = r[0]));
        }
        notifyOnChanges() {
          !this._changes || (!this._changesDetected && this._emitDistinctChangesOnly) || this._changes.emit(this);
        }
        setDirty() {
          this.dirty = !0;
        }
        destroy() {
          this.changes.complete(), this.changes.unsubscribe();
        }
      }
      Symbol;
      class Ol {
        constructor(t) {
          (this.queryList = t), (this.matches = null);
        }
        clone() {
          return new Ol(this.queryList);
        }
        setDirty() {
          this.queryList.setDirty();
        }
      }
      class Il {
        constructor(t = []) {
          this.queries = t;
        }
        createEmbeddedView(t) {
          const e = t.queries;
          if (null !== e) {
            const n = null !== t.contentQueries ? t.contentQueries[0] : e.length,
              r = [];
            for (let t = 0; t < n; t++) {
              const n = e.getByIndex(t);
              r.push(this.queries[n.indexInDeclarationView].clone());
            }
            return new Il(r);
          }
          return null;
        }
        insertView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        detachView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        dirtyQueriesWithMatches(t) {
          for (let e = 0; e < this.queries.length; e++) null !== $l(t, e).matches && this.queries[e].setDirty();
        }
      }
      class Rl {
        constructor(t, e, n = null) {
          (this.predicate = t), (this.flags = e), (this.read = n);
        }
      }
      class Pl {
        constructor(t = []) {
          this.queries = t;
        }
        elementStart(t, e) {
          for (let n = 0; n < this.queries.length; n++) this.queries[n].elementStart(t, e);
        }
        elementEnd(t) {
          for (let e = 0; e < this.queries.length; e++) this.queries[e].elementEnd(t);
        }
        embeddedTView(t) {
          let e = null;
          for (let n = 0; n < this.length; n++) {
            const r = null !== e ? e.length : 0,
              s = this.getByIndex(n).embeddedTView(t, r);
            s && ((s.indexInDeclarationView = n), null !== e ? e.push(s) : (e = [s]));
          }
          return null !== e ? new Pl(e) : null;
        }
        template(t, e) {
          for (let n = 0; n < this.queries.length; n++) this.queries[n].template(t, e);
        }
        getByIndex(t) {
          return this.queries[t];
        }
        get length() {
          return this.queries.length;
        }
        track(t) {
          this.queries.push(t);
        }
      }
      class Dl {
        constructor(t, e = -1) {
          (this.metadata = t),
            (this.matches = null),
            (this.indexInDeclarationView = -1),
            (this.crossesNgTemplate = !1),
            (this._appliesToNextNode = !0),
            (this._declarationNodeIndex = e);
        }
        elementStart(t, e) {
          this.isApplyingToNode(e) && this.matchTNode(t, e);
        }
        elementEnd(t) {
          this._declarationNodeIndex === t.index && (this._appliesToNextNode = !1);
        }
        template(t, e) {
          this.elementStart(t, e);
        }
        embeddedTView(t, e) {
          return this.isApplyingToNode(t)
            ? ((this.crossesNgTemplate = !0), this.addMatch(-t.index, e), new Dl(this.metadata))
            : null;
        }
        isApplyingToNode(t) {
          if (this._appliesToNextNode && 1 != (1 & this.metadata.flags)) {
            const e = this._declarationNodeIndex;
            let n = t.parent;
            for (; null !== n && 8 & n.type && n.index !== e; ) n = n.parent;
            return e === (null !== n ? n.index : -1);
          }
          return this._appliesToNextNode;
        }
        matchTNode(t, e) {
          const n = this.metadata.predicate;
          if (Array.isArray(n))
            for (let r = 0; r < n.length; r++) {
              const s = n[r];
              this.matchTNodeWithReadOption(t, e, Ll(e, s)), this.matchTNodeWithReadOption(t, e, Mn(e, t, s, !1, !1));
            }
          else
            n === tl
              ? 4 & e.type && this.matchTNodeWithReadOption(t, e, -1)
              : this.matchTNodeWithReadOption(t, e, Mn(e, t, n, !1, !1));
        }
        matchTNodeWithReadOption(t, e, n) {
          if (null !== n) {
            const r = this.metadata.read;
            if (null !== r)
              if (r === xa || r === al || (r === tl && 4 & e.type)) this.addMatch(e.index, -2);
              else {
                const n = Mn(e, t, r, !1, !1);
                null !== n && this.addMatch(e.index, n);
              }
            else this.addMatch(e.index, n);
          }
        }
        addMatch(t, e) {
          null === this.matches ? (this.matches = [t, e]) : this.matches.push(t, e);
        }
      }
      function Ll(t, e) {
        const n = t.localNames;
        if (null !== n) for (let r = 0; r < n.length; r += 2) if (n[r] === e) return n[r + 1];
        return null;
      }
      function Ml(t, e, n, r) {
        return -1 === n
          ? (function (t, e) {
              return 11 & t.type ? wa(t, e) : 4 & t.type ? rl(t, e) : null;
            })(e, t)
          : -2 === n
          ? (function (t, e, n) {
              return n === xa ? wa(e, t) : n === tl ? rl(e, t) : n === al ? dl(e, t) : void 0;
            })(t, e, r)
          : Nn(t, t[1], n, e);
      }
      function Nl(t, e, n, r) {
        const s = e[19].queries[r];
        if (null === s.matches) {
          const r = t.data,
            i = n.matches,
            o = [];
          for (let t = 0; t < i.length; t += 2) {
            const s = i[t];
            o.push(s < 0 ? null : Ml(e, r[s], i[t + 1], n.metadata.read));
          }
          s.matches = o;
        }
        return s.matches;
      }
      function Vl(t, e, n, r) {
        const s = t.queries.getByIndex(n),
          i = s.matches;
        if (null !== i) {
          const o = Nl(t, e, s, n);
          for (let t = 0; t < i.length; t += 2) {
            const n = i[t];
            if (n > 0) r.push(o[t / 2]);
            else {
              const s = i[t + 1],
                o = e[-n];
              for (let t = ee; t < o.length; t++) {
                const e = o[t];
                e[17] === e[3] && Vl(e[1], e, s, r);
              }
              if (null !== o[9]) {
                const t = o[9];
                for (let e = 0; e < t.length; e++) {
                  const n = t[e];
                  Vl(n[1], n, s, r);
                }
              }
            }
          }
        }
        return r;
      }
      function jl(t) {
        const e = Re(),
          n = Pe(),
          r = qe();
        We(r + 1);
        const s = $l(n, r);
        if (t.dirty && Se(e) === (2 == (2 & s.metadata.flags))) {
          if (null === s.matches) t.reset([]);
          else {
            const i = s.crossesNgTemplate ? Vl(n, e, r, []) : Nl(n, e, s, r);
            t.reset(i, Sa), t.notifyOnChanges();
          }
          return !0;
        }
        return !1;
      }
      function Fl(t, e, n) {
        const r = Pe();
        r.firstCreatePass && (Bl(r, new Rl(t, e, n), -1), 2 == (2 & e) && (r.staticViewQueries = !0)), zl(r, Re(), e);
      }
      function Ul(t, e, n, r) {
        const s = Pe();
        if (s.firstCreatePass) {
          const i = De();
          Bl(s, new Rl(e, n, r), i.index),
            (function (t, e) {
              const n = t.contentQueries || (t.contentQueries = []);
              e !== (n.length ? n[n.length - 1] : -1) && n.push(t.queries.length - 1, e);
            })(s, t),
            2 == (2 & n) && (s.staticContentQueries = !0);
        }
        zl(s, Re(), n);
      }
      function Hl() {
        return (t = Re()), (e = qe()), t[19].queries[e].queryList;
        var t, e;
      }
      function zl(t, e, n) {
        const r = new Al(4 == (4 & n));
        di(t, e, r, r.destroy), null === e[19] && (e[19] = new Il()), e[19].queries.push(new Ol(r));
      }
      function Bl(t, e, n) {
        null === t.queries && (t.queries = new Pl()), t.queries.track(new Dl(e, n));
      }
      function $l(t, e) {
        return t.queries.getByIndex(e);
      }
      function ql(t, e) {
        return rl(t, e);
      }
      const Wl = new qn('Application Initializer');
      let Gl = (() => {
        class t {
          constructor(t) {
            (this.appInits = t),
              (this.resolve = ba),
              (this.reject = ba),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((t, e) => {
                (this.resolve = t), (this.reject = e);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const t = [],
              e = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let n = 0; n < this.appInits.length; n++) {
                const e = this.appInits[n]();
                if (Eo(e)) t.push(e);
                else if (ko(e)) {
                  const n = new Promise((t, n) => {
                    e.subscribe({ complete: t, error: n });
                  });
                  t.push(n);
                }
              }
            Promise.all(t)
              .then(() => {
                e();
              })
              .catch((t) => {
                this.reject(t);
              }),
              0 === t.length && e(),
              (this.initialized = !0);
          }
        }
        return (
          (t.??fac = function (e) {
            return new (e || t)(cr(Wl, 8));
          }),
          (t.??prov = pt({ token: t, factory: t.??fac })),
          t
        );
      })();
      const Zl = new qn('AppId'),
        Kl = {
          provide: Zl,
          useFactory: function () {
            return `${Ql()}${Ql()}${Ql()}`;
          },
          deps: [],
        };
      function Ql() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const Yl = new qn('Platform Initializer'),
        Jl = new qn('Platform ID'),
        Xl = new qn('appBootstrapListener');
      let tc = (() => {
        class t {
          log(t) {
            console.log(t);
          }
          warn(t) {
            console.warn(t);
          }
        }
        return (
          (t.??fac = function (e) {
            return new (e || t)();
          }),
          (t.??prov = pt({ token: t, factory: t.??fac })),
          t
        );
      })();
      const ec = new qn('LocaleId'),
        nc = new qn('DefaultCurrencyCode');
      class rc {
        constructor(t, e) {
          (this.ngModuleFactory = t), (this.componentFactories = e);
        }
      }
      const sc = function (t) {
          return new wl(t);
        },
        ic = sc,
        oc = function (t) {
          return Promise.resolve(sc(t));
        },
        ac = function (t) {
          const e = sc(t),
            n = rs(Xt(t).declarations).reduce((t, e) => {
              const n = Jt(e);
              return n && t.push(new _l(n)), t;
            }, []);
          return new rc(e, n);
        },
        lc = ac,
        cc = function (t) {
          return Promise.resolve(ac(t));
        };
      let uc = (() => {
        class t {
          constructor() {
            (this.compileModuleSync = ic),
              (this.compileModuleAsync = oc),
              (this.compileModuleAndAllComponentsSync = lc),
              (this.compileModuleAndAllComponentsAsync = cc);
          }
          clearCache() {}
          clearCacheFor(t) {}
          getModuleId(t) {}
        }
        return (
          (t.??fac = function (e) {
            return new (e || t)();
          }),
          (t.??prov = pt({ token: t, factory: t.??fac })),
          t
        );
      })();
      const hc = (() => Promise.resolve(0))();
      function dc(t) {
        'undefined' == typeof Zone
          ? hc.then(() => {
              t && t.apply(null, null);
            })
          : Zone.current.scheduleMicroTask('scheduleMicrotask', t);
      }
      class pc {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: e = !1,
          shouldCoalesceRunChangeDetection: n = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new kl(!1)),
            (this.onMicrotaskEmpty = new kl(!1)),
            (this.onStable = new kl(!1)),
            (this.onError = new kl(!1)),
            'undefined' == typeof Zone)
          )
            throw new Error('In this configuration Angular requires Zone.js');
          Zone.assertZonePatched();
          const r = this;
          (r._nesting = 0),
            (r._outer = r._inner = Zone.current),
            Zone.TaskTrackingZoneSpec && (r._inner = r._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t && Zone.longStackTraceZoneSpec && (r._inner = r._inner.fork(Zone.longStackTraceZoneSpec)),
            (r.shouldCoalesceEventChangeDetection = !n && e),
            (r.shouldCoalesceRunChangeDetection = n),
            (r.lastRequestAnimationFrameId = -1),
            (r.nativeRequestAnimationFrame = (function () {
              let t = Dt.requestAnimationFrame,
                e = Dt.cancelAnimationFrame;
              if ('undefined' != typeof Zone && t && e) {
                const n = t[Zone.__symbol__('OriginalDelegate')];
                n && (t = n);
                const r = e[Zone.__symbol__('OriginalDelegate')];
                r && (e = r);
              }
              return { nativeRequestAnimationFrame: t, nativeCancelAnimationFrame: e };
            })().nativeRequestAnimationFrame),
            (function (t) {
              const e = () => {
                !(function (t) {
                  t.isCheckStableRunning ||
                    -1 !== t.lastRequestAnimationFrameId ||
                    ((t.lastRequestAnimationFrameId = t.nativeRequestAnimationFrame.call(Dt, () => {
                      t.fakeTopEventTask ||
                        (t.fakeTopEventTask = Zone.root.scheduleEventTask(
                          'fakeTopEventTask',
                          () => {
                            (t.lastRequestAnimationFrameId = -1),
                              mc(t),
                              (t.isCheckStableRunning = !0),
                              gc(t),
                              (t.isCheckStableRunning = !1);
                          },
                          void 0,
                          () => {},
                          () => {}
                        )),
                        t.fakeTopEventTask.invoke();
                    })),
                    mc(t));
                })(t);
              };
              t._inner = t._inner.fork({
                name: 'angular',
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, s, i, o, a) => {
                  try {
                    return _c(t), n.invokeTask(s, i, o, a);
                  } finally {
                    ((t.shouldCoalesceEventChangeDetection && 'eventTask' === i.type) ||
                      t.shouldCoalesceRunChangeDetection) &&
                      e(),
                      yc(t);
                  }
                },
                onInvoke: (n, r, s, i, o, a, l) => {
                  try {
                    return _c(t), n.invoke(s, i, o, a, l);
                  } finally {
                    t.shouldCoalesceRunChangeDetection && e(), yc(t);
                  }
                },
                onHasTask: (e, n, r, s) => {
                  e.hasTask(r, s),
                    n === r &&
                      ('microTask' == s.change
                        ? ((t._hasPendingMicrotasks = s.microTask), mc(t), gc(t))
                        : 'macroTask' == s.change && (t.hasPendingMacrotasks = s.macroTask));
                },
                onHandleError: (e, n, r, s) => (e.handleError(r, s), t.runOutsideAngular(() => t.onError.emit(s)), !1),
              });
            })(r);
        }
        static isInAngularZone() {
          return !0 === Zone.current.get('isAngularZone');
        }
        static assertInAngularZone() {
          if (!pc.isInAngularZone()) throw new Error('Expected to be in Angular Zone, but it is not!');
        }
        static assertNotInAngularZone() {
          if (pc.isInAngularZone()) throw new Error('Expected to not be in Angular Zone, but it is!');
        }
        run(t, e, n) {
          return this._inner.run(t, e, n);
        }
        runTask(t, e, n, r) {
          const s = this._inner,
            i = s.scheduleEventTask('NgZoneEvent: ' + r, t, fc, ba, ba);
          try {
            return s.runTask(i, e, n);
          } finally {
            s.cancelTask(i);
          }
        }
        runGuarded(t, e, n) {
          return this._inner.runGuarded(t, e, n);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const fc = {};
      function gc(t) {
        if (0 == t._nesting && !t.hasPendingMicrotasks && !t.isStable)
          try {
            t._nesting++, t.onMicrotaskEmpty.emit(null);
          } finally {
            if ((t._nesting--, !t.hasPendingMicrotasks))
              try {
                t.runOutsideAngular(() => t.onStable.emit(null));
              } finally {
                t.isStable = !0;
              }
          }
      }
      function mc(t) {
        t.hasPendingMicrotasks = !!(
          t._hasPendingMicrotasks ||
          ((t.shouldCoalesceEventChangeDetection || t.shouldCoalesceRunChangeDetection) &&
            -1 !== t.lastRequestAnimationFrameId)
        );
      }
      function _c(t) {
        t._nesting++, t.isStable && ((t.isStable = !1), t.onUnstable.emit(null));
      }
      function yc(t) {
        t._nesting--, gc(t);
      }
      class vc {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new kl()),
            (this.onMicrotaskEmpty = new kl()),
            (this.onStable = new kl()),
            (this.onError = new kl());
        }
        run(t, e, n) {
          return t.apply(e, n);
        }
        runGuarded(t, e, n) {
          return t.apply(e, n);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, e, n, r) {
          return t.apply(e, n);
        }
      }
      let bc = (() => {
          class t {
            constructor(t) {
              (this._ngZone = t),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                this._watchAngularEvents(),
                t.run(() => {
                  this.taskTrackingZone = 'undefined' == typeof Zone ? null : Zone.current.get('TaskTrackingZone');
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      pc.assertNotInAngularZone(),
                        dc(() => {
                          (this._isZoneStable = !0), this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (this._pendingCount += 1), (this._didWork = !0), this._pendingCount;
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error('pending async requests below zero');
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return this._isZoneStable && 0 === this._pendingCount && !this._ngZone.hasPendingMacrotasks;
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                dc(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let t = this._callbacks.pop();
                    clearTimeout(t.timeoutId), t.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let t = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (e) => !e.updateCb || !e.updateCb(t) || (clearTimeout(e.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((t) => ({
                    source: t.source,
                    creationLocation: t.creationLocation,
                    data: t.data,
                  }))
                : [];
            }
            addCallback(t, e, n) {
              let r = -1;
              e &&
                e > 0 &&
                (r = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter((t) => t.timeoutId !== r)),
                    t(this._didWork, this.getPendingTasks());
                }, e)),
                this._callbacks.push({ doneCb: t, timeoutId: r, updateCb: n });
            }
            whenStable(t, e, n) {
              if (n && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(t, e, n), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            findProviders(t, e, n) {
              return [];
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)(cr(pc));
            }),
            (t.??prov = pt({ token: t, factory: t.??fac })),
            t
          );
        })(),
        wc = (() => {
          class t {
            constructor() {
              (this._applications = new Map()), Sc.addToWindow(this);
            }
            registerApplication(t, e) {
              this._applications.set(t, e);
            }
            unregisterApplication(t) {
              this._applications.delete(t);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(t) {
              return this._applications.get(t) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(t, e = !0) {
              return Sc.findTestabilityInTree(this, t, e);
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??prov = pt({ token: t, factory: t.??fac })),
            t
          );
        })();
      class Cc {
        addToWindow(t) {}
        findTestabilityInTree(t, e, n) {
          return null;
        }
      }
      let xc,
        Sc = new Cc(),
        Ec = !0,
        kc = !1;
      function Tc() {
        return (kc = !0), Ec;
      }
      const Ac = new qn('AllowMultipleToken');
      class Oc {
        constructor(t, e) {
          (this.name = t), (this.token = e);
        }
      }
      function Ic(t, e, n = []) {
        const r = `Platform: ${e}`,
          s = new qn(r);
        return (e = []) => {
          let i = Rc();
          if (!i || i.injector.get(Ac, !1))
            if (t) t(n.concat(e).concat({ provide: s, useValue: !0 }));
            else {
              const t = n.concat(e).concat({ provide: s, useValue: !0 }, { provide: zi, useValue: 'platform' });
              !(function (t) {
                if (xc && !xc.destroyed && !xc.injector.get(Ac, !1))
                  throw new Error('There can be only one platform. Destroy the previous one to create a new one.');
                xc = t.get(Pc);
                const e = t.get(Yl, null);
                e && e.forEach((t) => t());
              })(eo.create({ providers: t, name: r }));
            }
          return (function (t) {
            const e = Rc();
            if (!e) throw new Error('No platform exists!');
            if (!e.injector.get(t, null))
              throw new Error('A platform with a different configuration has been created. Please destroy it first.');
            return e;
          })(s);
        };
      }
      function Rc() {
        return xc && !xc.destroyed ? xc : null;
      }
      let Pc = (() => {
        class t {
          constructor(t) {
            (this._injector = t), (this._modules = []), (this._destroyListeners = []), (this._destroyed = !1);
          }
          bootstrapModuleFactory(t, e) {
            const n = (function (t, e) {
                let n;
                return (
                  (n =
                    'noop' === t
                      ? new vc()
                      : ('zone.js' === t ? void 0 : t) ||
                        new pc({
                          enableLongStackTrace: Tc(),
                          shouldCoalesceEventChangeDetection: !!(null == e ? void 0 : e.ngZoneEventCoalescing),
                          shouldCoalesceRunChangeDetection: !!(null == e ? void 0 : e.ngZoneRunCoalescing),
                        })),
                  n
                );
              })(e ? e.ngZone : void 0, {
                ngZoneEventCoalescing: (e && e.ngZoneEventCoalescing) || !1,
                ngZoneRunCoalescing: (e && e.ngZoneRunCoalescing) || !1,
              }),
              r = [{ provide: pc, useValue: n }];
            return n.run(() => {
              const e = eo.create({ providers: r, parent: this.injector, name: t.moduleType.name }),
                s = t.create(e),
                i = s.injector.get(es, null);
              if (!i) throw new Error('No ErrorHandler. Is platform module (BrowserModule) included?');
              return (
                n.runOutsideAngular(() => {
                  const t = n.onError.subscribe({
                    next: (t) => {
                      i.handleError(t);
                    },
                  });
                  s.onDestroy(() => {
                    Mc(this._modules, s), t.unsubscribe();
                  });
                }),
                (function (t, e, n) {
                  try {
                    const r = n();
                    return Eo(r)
                      ? r.catch((n) => {
                          throw (e.runOutsideAngular(() => t.handleError(n)), n);
                        })
                      : r;
                  } catch (r) {
                    throw (e.runOutsideAngular(() => t.handleError(r)), r);
                  }
                })(i, n, () => {
                  const t = s.injector.get(Gl);
                  return (
                    t.runInitializers(),
                    t.donePromise.then(() => (la(s.injector.get(ec, oa) || oa), this._moduleDoBootstrap(s), s))
                  );
                })
              );
            });
          }
          bootstrapModule(t, e = []) {
            const n = Dc({}, e);
            return (function (t, e, n) {
              const r = new wl(n);
              return Promise.resolve(r);
            })(0, 0, t).then((t) => this.bootstrapModuleFactory(t, n));
          }
          _moduleDoBootstrap(t) {
            const e = t.injector.get(Lc);
            if (t._bootstrapComponents.length > 0) t._bootstrapComponents.forEach((t) => e.bootstrap(t));
            else {
              if (!t.instance.ngDoBootstrap)
                throw new Error(
                  `The module ${rt(
                    t.instance.constructor
                  )} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. Please define one of these.`
                );
              t.instance.ngDoBootstrap(e);
            }
            this._modules.push(t);
          }
          onDestroy(t) {
            this._destroyListeners.push(t);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new Error('The platform has already been destroyed!');
            this._modules.slice().forEach((t) => t.destroy()),
              this._destroyListeners.forEach((t) => t()),
              (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (t.??fac = function (e) {
            return new (e || t)(cr(eo));
          }),
          (t.??prov = pt({ token: t, factory: t.??fac })),
          t
        );
      })();
      function Dc(t, e) {
        return Array.isArray(e) ? e.reduce(Dc, t) : Object.assign(Object.assign({}, t), e);
      }
      let Lc = (() => {
        class t {
          constructor(t, e, n, r, s) {
            (this._zone = t),
              (this._injector = e),
              (this._exceptionHandler = n),
              (this._componentFactoryResolver = r),
              (this._initStatus = s),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription = this._zone.onMicrotaskEmpty.subscribe({
                next: () => {
                  this._zone.run(() => {
                    this.tick();
                  });
                },
              }));
            const i = new y((t) => {
                (this._stable =
                  this._zone.isStable && !this._zone.hasPendingMacrotasks && !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    t.next(this._stable), t.complete();
                  });
              }),
              o = new y((t) => {
                let e;
                this._zone.runOutsideAngular(() => {
                  e = this._zone.onStable.subscribe(() => {
                    pc.assertNotInAngularZone(),
                      dc(() => {
                        this._stable ||
                          this._zone.hasPendingMacrotasks ||
                          this._zone.hasPendingMicrotasks ||
                          ((this._stable = !0), t.next(!0));
                      });
                  });
                });
                const n = this._zone.onUnstable.subscribe(() => {
                  pc.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        t.next(!1);
                      }));
                });
                return () => {
                  e.unsubscribe(), n.unsubscribe();
                };
              });
            this.isStable = $(i, o.pipe(tt()));
          }
          bootstrap(t, e) {
            if (!this._initStatus.done)
              throw new Error(
                'Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module.'
              );
            let n;
            (n = t instanceof _a ? t : this._componentFactoryResolver.resolveComponentFactory(t)),
              this.componentTypes.push(n.componentType);
            const r = n.isBoundToModule ? void 0 : this._injector.get(sl),
              s = n.create(eo.NULL, [], e || n.selector, r),
              i = s.location.nativeElement,
              o = s.injector.get(bc, null),
              a = o && s.injector.get(wc);
            return (
              o && a && a.registerApplication(i, o),
              s.onDestroy(() => {
                this.detachView(s.hostView), Mc(this.components, s), a && a.unregisterApplication(i);
              }),
              this._loadComponent(s),
              s
            );
          }
          tick() {
            if (this._runningTick) throw new Error('ApplicationRef.tick is called recursively');
            try {
              this._runningTick = !0;
              for (let t of this._views) t.detectChanges();
            } catch (t) {
              this._zone.runOutsideAngular(() => this._exceptionHandler.handleError(t));
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(t) {
            const e = t;
            this._views.push(e), e.attachToAppRef(this);
          }
          detachView(t) {
            const e = t;
            Mc(this._views, e), e.detachFromAppRef();
          }
          _loadComponent(t) {
            this.attachView(t.hostView),
              this.tick(),
              this.components.push(t),
              this._injector
                .get(Xl, [])
                .concat(this._bootstrapListeners)
                .forEach((e) => e(t));
          }
          ngOnDestroy() {
            this._views.slice().forEach((t) => t.destroy()), this._onMicrotaskEmptySubscription.unsubscribe();
          }
          get viewCount() {
            return this._views.length;
          }
        }
        return (
          (t.??fac = function (e) {
            return new (e || t)(cr(pc), cr(eo), cr(es), cr(va), cr(Gl));
          }),
          (t.??prov = pt({ token: t, factory: t.??fac })),
          t
        );
      })();
      function Mc(t, e) {
        const n = t.indexOf(e);
        n > -1 && t.splice(n, 1);
      }
      class Nc {}
      class Vc {}
      const jc = { factoryPathPrefix: '', factoryPathSuffix: '.ngfactory' };
      let Fc = (() => {
        class t {
          constructor(t, e) {
            (this._compiler = t), (this._config = e || jc);
          }
          load(t) {
            return this.loadAndCompile(t);
          }
          loadAndCompile(t) {
            let [e, r] = t.split('#');
            return (
              void 0 === r && (r = 'default'),
              n(255)(e)
                .then((t) => t[r])
                .then((t) => Uc(t, e, r))
                .then((t) => this._compiler.compileModuleAsync(t))
            );
          }
          loadFactory(t) {
            let [e, r] = t.split('#'),
              s = 'NgFactory';
            return (
              void 0 === r && ((r = 'default'), (s = '')),
              n(255)(this._config.factoryPathPrefix + e + this._config.factoryPathSuffix)
                .then((t) => t[r + s])
                .then((t) => Uc(t, e, r))
            );
          }
        }
        return (
          (t.??fac = function (e) {
            return new (e || t)(cr(uc), cr(Vc, 8));
          }),
          (t.??prov = pt({ token: t, factory: t.??fac })),
          t
        );
      })();
      function Uc(t, e, n) {
        if (!t) throw new Error(`Cannot find '${n}' in '${e}'`);
        return t;
      }
      const Hc = Ic(null, 'core', [
          { provide: Jl, useValue: 'unknown' },
          { provide: Pc, deps: [eo] },
          { provide: wc, deps: [] },
          { provide: tc, deps: [] },
        ]),
        zc = [
          { provide: Lc, useClass: Lc, deps: [pc, eo, es, va, Gl] },
          {
            provide: ml,
            deps: [pc],
            useFactory: function (t) {
              let e = [];
              return (
                t.onStable.subscribe(() => {
                  for (; e.length; ) e.pop()();
                }),
                function (t) {
                  e.push(t);
                }
              );
            },
          },
          { provide: Gl, useClass: Gl, deps: [[new fr(), Wl]] },
          { provide: uc, useClass: uc, deps: [] },
          Kl,
          {
            provide: za,
            useFactory: function () {
              return Ya;
            },
            deps: [],
          },
          {
            provide: $a,
            useFactory: function () {
              return Ja;
            },
            deps: [],
          },
          {
            provide: ec,
            useFactory: function (t) {
              return la((t = t || ('undefined' != typeof $localize && $localize.locale) || oa)), t;
            },
            deps: [[new pr(ec), new fr(), new gr()]],
          },
          { provide: nc, useValue: 'USD' },
        ];
      let Bc = (() => {
          class t {
            constructor(t) {}
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)(cr(Lc));
            }),
            (t.??mod = Zt({ type: t })),
            (t.??inj = ft({ providers: zc })),
            t
          );
        })(),
        $c = null;
      function qc() {
        return $c;
      }
      const Wc = new qn('DocumentToken');
      let Gc = (() => {
        class t {
          historyGo(t) {
            throw new Error('Not implemented');
          }
        }
        return (
          (t.??fac = function (e) {
            return new (e || t)();
          }),
          (t.??prov = pt({ factory: Zc, token: t, providedIn: 'platform' })),
          t
        );
      })();
      function Zc() {
        return cr(Qc);
      }
      const Kc = new qn('Location Initialized');
      let Qc = (() => {
        class t extends Gc {
          constructor(t) {
            super(), (this._doc = t), this._init();
          }
          _init() {
            (this.location = window.location), (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return qc().getBaseHref(this._doc);
          }
          onPopState(t) {
            const e = qc().getGlobalEventTarget(this._doc, 'window');
            return e.addEventListener('popstate', t, !1), () => e.removeEventListener('popstate', t);
          }
          onHashChange(t) {
            const e = qc().getGlobalEventTarget(this._doc, 'window');
            return e.addEventListener('hashchange', t, !1), () => e.removeEventListener('hashchange', t);
          }
          get href() {
            return this.location.href;
          }
          get protocol() {
            return this.location.protocol;
          }
          get hostname() {
            return this.location.hostname;
          }
          get port() {
            return this.location.port;
          }
          get pathname() {
            return this.location.pathname;
          }
          get search() {
            return this.location.search;
          }
          get hash() {
            return this.location.hash;
          }
          set pathname(t) {
            this.location.pathname = t;
          }
          pushState(t, e, n) {
            Yc() ? this._history.pushState(t, e, n) : (this.location.hash = n);
          }
          replaceState(t, e, n) {
            Yc() ? this._history.replaceState(t, e, n) : (this.location.hash = n);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          historyGo(t = 0) {
            this._history.go(t);
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          (t.??fac = function (e) {
            return new (e || t)(cr(Wc));
          }),
          (t.??prov = pt({ factory: Jc, token: t, providedIn: 'platform' })),
          t
        );
      })();
      function Yc() {
        return !!window.history.pushState;
      }
      function Jc() {
        return new Qc(cr(Wc));
      }
      function Xc(t, e) {
        if (0 == t.length) return e;
        if (0 == e.length) return t;
        let n = 0;
        return (
          t.endsWith('/') && n++, e.startsWith('/') && n++, 2 == n ? t + e.substring(1) : 1 == n ? t + e : t + '/' + e
        );
      }
      function tu(t) {
        const e = t.match(/#|\?|$/),
          n = (e && e.index) || t.length;
        return t.slice(0, n - ('/' === t[n - 1] ? 1 : 0)) + t.slice(n);
      }
      function eu(t) {
        return t && '?' !== t[0] ? '?' + t : t;
      }
      let nu = (() => {
        class t {
          historyGo(t) {
            throw new Error('Not implemented');
          }
        }
        return (
          (t.??fac = function (e) {
            return new (e || t)();
          }),
          (t.??prov = pt({ factory: ru, token: t, providedIn: 'root' })),
          t
        );
      })();
      function ru(t) {
        const e = cr(Wc).location;
        return new iu(cr(Gc), (e && e.origin) || '');
      }
      const su = new qn('appBaseHref');
      let iu = (() => {
          class t extends nu {
            constructor(t, e) {
              if (
                (super(),
                (this._platformLocation = t),
                (this._removeListenerFns = []),
                null == e && (e = this._platformLocation.getBaseHrefFromDOM()),
                null == e)
              )
                throw new Error(
                  'No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document.'
                );
              this._baseHref = e;
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; ) this._removeListenerFns.pop()();
            }
            onPopState(t) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(t),
                this._platformLocation.onHashChange(t)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(t) {
              return Xc(this._baseHref, t);
            }
            path(t = !1) {
              const e = this._platformLocation.pathname + eu(this._platformLocation.search),
                n = this._platformLocation.hash;
              return n && t ? `${e}${n}` : e;
            }
            pushState(t, e, n, r) {
              const s = this.prepareExternalUrl(n + eu(r));
              this._platformLocation.pushState(t, e, s);
            }
            replaceState(t, e, n, r) {
              const s = this.prepareExternalUrl(n + eu(r));
              this._platformLocation.replaceState(t, e, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            historyGo(t = 0) {
              var e, n;
              null === (n = (e = this._platformLocation).historyGo) || void 0 === n || n.call(e, t);
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)(cr(Gc), cr(su, 8));
            }),
            (t.??prov = pt({ token: t, factory: t.??fac })),
            t
          );
        })(),
        ou = (() => {
          class t extends nu {
            constructor(t, e) {
              super(),
                (this._platformLocation = t),
                (this._baseHref = ''),
                (this._removeListenerFns = []),
                null != e && (this._baseHref = e);
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; ) this._removeListenerFns.pop()();
            }
            onPopState(t) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(t),
                this._platformLocation.onHashChange(t)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(t = !1) {
              let e = this._platformLocation.hash;
              return null == e && (e = '#'), e.length > 0 ? e.substring(1) : e;
            }
            prepareExternalUrl(t) {
              const e = Xc(this._baseHref, t);
              return e.length > 0 ? '#' + e : e;
            }
            pushState(t, e, n, r) {
              let s = this.prepareExternalUrl(n + eu(r));
              0 == s.length && (s = this._platformLocation.pathname), this._platformLocation.pushState(t, e, s);
            }
            replaceState(t, e, n, r) {
              let s = this.prepareExternalUrl(n + eu(r));
              0 == s.length && (s = this._platformLocation.pathname), this._platformLocation.replaceState(t, e, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            historyGo(t = 0) {
              var e, n;
              null === (n = (e = this._platformLocation).historyGo) || void 0 === n || n.call(e, t);
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)(cr(Gc), cr(su, 8));
            }),
            (t.??prov = pt({ token: t, factory: t.??fac })),
            t
          );
        })(),
        au = (() => {
          class t {
            constructor(t, e) {
              (this._subject = new kl()), (this._urlChangeListeners = []), (this._platformStrategy = t);
              const n = this._platformStrategy.getBaseHref();
              (this._platformLocation = e),
                (this._baseHref = tu(cu(n))),
                this._platformStrategy.onPopState((t) => {
                  this._subject.emit({ url: this.path(!0), pop: !0, state: t.state, type: t.type });
                });
            }
            path(t = !1) {
              return this.normalize(this._platformStrategy.path(t));
            }
            getState() {
              return this._platformLocation.getState();
            }
            isCurrentPathEqualTo(t, e = '') {
              return this.path() == this.normalize(t + eu(e));
            }
            normalize(e) {
              return t.stripTrailingSlash(
                (function (t, e) {
                  return t && e.startsWith(t) ? e.substring(t.length) : e;
                })(this._baseHref, cu(e))
              );
            }
            prepareExternalUrl(t) {
              return t && '/' !== t[0] && (t = '/' + t), this._platformStrategy.prepareExternalUrl(t);
            }
            go(t, e = '', n = null) {
              this._platformStrategy.pushState(n, '', t, e),
                this._notifyUrlChangeListeners(this.prepareExternalUrl(t + eu(e)), n);
            }
            replaceState(t, e = '', n = null) {
              this._platformStrategy.replaceState(n, '', t, e),
                this._notifyUrlChangeListeners(this.prepareExternalUrl(t + eu(e)), n);
            }
            forward() {
              this._platformStrategy.forward();
            }
            back() {
              this._platformStrategy.back();
            }
            historyGo(t = 0) {
              var e, n;
              null === (n = (e = this._platformStrategy).historyGo) || void 0 === n || n.call(e, t);
            }
            onUrlChange(t) {
              this._urlChangeListeners.push(t),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((t) => {
                    this._notifyUrlChangeListeners(t.url, t.state);
                  }));
            }
            _notifyUrlChangeListeners(t = '', e) {
              this._urlChangeListeners.forEach((n) => n(t, e));
            }
            subscribe(t, e, n) {
              return this._subject.subscribe({ next: t, error: e, complete: n });
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)(cr(nu), cr(Gc));
            }),
            (t.normalizeQueryParams = eu),
            (t.joinWithSlash = Xc),
            (t.stripTrailingSlash = tu),
            (t.??prov = pt({ factory: lu, token: t, providedIn: 'root' })),
            t
          );
        })();
      function lu() {
        return new au(cr(nu), cr(Gc));
      }
      function cu(t) {
        return t.replace(/\/index.html$/, '');
      }
      var uu = (() => (
        ((uu = uu || {})[(uu.Zero = 0)] = 'Zero'),
        (uu[(uu.One = 1)] = 'One'),
        (uu[(uu.Two = 2)] = 'Two'),
        (uu[(uu.Few = 3)] = 'Few'),
        (uu[(uu.Many = 4)] = 'Many'),
        (uu[(uu.Other = 5)] = 'Other'),
        uu
      ))();
      class hu {}
      let du = (() => {
        class t extends hu {
          constructor(t) {
            super(), (this.locale = t);
          }
          getPluralCategory(t, e) {
            switch (
              (function (t) {
                return (function (t) {
                  const e = (function (t) {
                    return t.toLowerCase().replace(/_/g, '-');
                  })(t);
                  let n = sa(e);
                  if (n) return n;
                  const r = e.split('-')[0];
                  if (((n = sa(r)), n)) return n;
                  if ('en' === r) return na;
                  throw new Error(`Missing locale data for the locale "${t}".`);
                })(t)[ia.PluralCase];
              })(e || this.locale)(t)
            ) {
              case uu.Zero:
                return 'zero';
              case uu.One:
                return 'one';
              case uu.Two:
                return 'two';
              case uu.Few:
                return 'few';
              case uu.Many:
                return 'many';
              default:
                return 'other';
            }
          }
        }
        return (
          (t.??fac = function (e) {
            return new (e || t)(cr(ec));
          }),
          (t.??prov = pt({ token: t, factory: t.??fac })),
          t
        );
      })();
      function pu(t, e) {
        e = encodeURIComponent(e);
        for (const n of t.split(';')) {
          const t = n.indexOf('='),
            [r, s] = -1 == t ? [n, ''] : [n.slice(0, t), n.slice(t + 1)];
          if (r.trim() === e) return decodeURIComponent(s);
        }
        return null;
      }
      let fu = (() => {
        class t {
          constructor(t, e, n, r) {
            (this._iterableDiffers = t),
              (this._keyValueDiffers = e),
              (this._ngEl = n),
              (this._renderer = r),
              (this._iterableDiffer = null),
              (this._keyValueDiffer = null),
              (this._initialClasses = []),
              (this._rawClass = null);
          }
          set klass(t) {
            this._removeClasses(this._initialClasses),
              (this._initialClasses = 'string' == typeof t ? t.split(/\s+/) : []),
              this._applyClasses(this._initialClasses),
              this._applyClasses(this._rawClass);
          }
          set ngClass(t) {
            this._removeClasses(this._rawClass),
              this._applyClasses(this._initialClasses),
              (this._iterableDiffer = null),
              (this._keyValueDiffer = null),
              (this._rawClass = 'string' == typeof t ? t.split(/\s+/) : t),
              this._rawClass &&
                (ho(this._rawClass)
                  ? (this._iterableDiffer = this._iterableDiffers.find(this._rawClass).create())
                  : (this._keyValueDiffer = this._keyValueDiffers.find(this._rawClass).create()));
          }
          ngDoCheck() {
            if (this._iterableDiffer) {
              const t = this._iterableDiffer.diff(this._rawClass);
              t && this._applyIterableChanges(t);
            } else if (this._keyValueDiffer) {
              const t = this._keyValueDiffer.diff(this._rawClass);
              t && this._applyKeyValueChanges(t);
            }
          }
          _applyKeyValueChanges(t) {
            t.forEachAddedItem((t) => this._toggleClass(t.key, t.currentValue)),
              t.forEachChangedItem((t) => this._toggleClass(t.key, t.currentValue)),
              t.forEachRemovedItem((t) => {
                t.previousValue && this._toggleClass(t.key, !1);
              });
          }
          _applyIterableChanges(t) {
            t.forEachAddedItem((t) => {
              if ('string' != typeof t.item)
                throw new Error(`NgClass can only toggle CSS classes expressed as strings, got ${rt(t.item)}`);
              this._toggleClass(t.item, !0);
            }),
              t.forEachRemovedItem((t) => this._toggleClass(t.item, !1));
          }
          _applyClasses(t) {
            t &&
              (Array.isArray(t) || t instanceof Set
                ? t.forEach((t) => this._toggleClass(t, !0))
                : Object.keys(t).forEach((e) => this._toggleClass(e, !!t[e])));
          }
          _removeClasses(t) {
            t &&
              (Array.isArray(t) || t instanceof Set
                ? t.forEach((t) => this._toggleClass(t, !1))
                : Object.keys(t).forEach((t) => this._toggleClass(t, !1)));
          }
          _toggleClass(t, e) {
            (t = t.trim()) &&
              t.split(/\s+/g).forEach((t) => {
                e
                  ? this._renderer.addClass(this._ngEl.nativeElement, t)
                  : this._renderer.removeClass(this._ngEl.nativeElement, t);
              });
          }
        }
        return (
          (t.??fac = function (e) {
            return new (e || t)(_o(za), _o($a), _o(xa), _o(ka));
          }),
          (t.??dir = Qt({
            type: t,
            selectors: [['', 'ngClass', '']],
            inputs: { klass: ['class', 'klass'], ngClass: 'ngClass' },
          })),
          t
        );
      })();
      class gu {
        constructor(t, e, n, r) {
          (this.$implicit = t), (this.ngForOf = e), (this.index = n), (this.count = r);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let mu = (() => {
        class t {
          constructor(t, e, n) {
            (this._viewContainer = t),
              (this._template = e),
              (this._differs = n),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForOf(t) {
            (this._ngForOf = t), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(t) {
            this._trackByFn = t;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          set ngForTemplate(t) {
            t && (this._template = t);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const n = this._ngForOf;
              if (!this._differ && n)
                try {
                  this._differ = this._differs.find(n).create(this.ngForTrackBy);
                } catch (e) {
                  throw new Error(
                    `Cannot find a differ supporting object '${n}' of type '${
                      ((t = n), t.name || typeof t)
                    }'. NgFor only supports binding to Iterables such as Arrays.`
                  );
                }
            }
            var t;
            if (this._differ) {
              const t = this._differ.diff(this._ngForOf);
              t && this._applyChanges(t);
            }
          }
          _applyChanges(t) {
            const e = [];
            t.forEachOperation((t, n, r) => {
              if (null == t.previousIndex) {
                const n = this._viewContainer.createEmbeddedView(
                    this._template,
                    new gu(null, this._ngForOf, -1, -1),
                    null === r ? void 0 : r
                  ),
                  s = new _u(t, n);
                e.push(s);
              } else if (null == r) this._viewContainer.remove(null === n ? void 0 : n);
              else if (null !== n) {
                const s = this._viewContainer.get(n);
                this._viewContainer.move(s, r);
                const i = new _u(t, s);
                e.push(i);
              }
            });
            for (let n = 0; n < e.length; n++) this._perViewChange(e[n].view, e[n].record);
            for (let n = 0, r = this._viewContainer.length; n < r; n++) {
              const t = this._viewContainer.get(n);
              (t.context.index = n), (t.context.count = r), (t.context.ngForOf = this._ngForOf);
            }
            t.forEachIdentityChange((t) => {
              this._viewContainer.get(t.currentIndex).context.$implicit = t.item;
            });
          }
          _perViewChange(t, e) {
            t.context.$implicit = e.item;
          }
          static ngTemplateContextGuard(t, e) {
            return !0;
          }
        }
        return (
          (t.??fac = function (e) {
            return new (e || t)(_o(al), _o(tl), _o(za));
          }),
          (t.??dir = Qt({
            type: t,
            selectors: [['', 'ngFor', '', 'ngForOf', '']],
            inputs: { ngForOf: 'ngForOf', ngForTrackBy: 'ngForTrackBy', ngForTemplate: 'ngForTemplate' },
          })),
          t
        );
      })();
      class _u {
        constructor(t, e) {
          (this.record = t), (this.view = e);
        }
      }
      let yu = (() => {
        class t {
          constructor(t, e) {
            (this._viewContainer = t),
              (this._context = new vu()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = e);
          }
          set ngIf(t) {
            (this._context.$implicit = this._context.ngIf = t), this._updateView();
          }
          set ngIfThen(t) {
            bu('ngIfThen', t), (this._thenTemplateRef = t), (this._thenViewRef = null), this._updateView();
          }
          set ngIfElse(t) {
            bu('ngIfElse', t), (this._elseTemplateRef = t), (this._elseViewRef = null), this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(this._thenTemplateRef, this._context)))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(this._elseTemplateRef, this._context)));
          }
          static ngTemplateContextGuard(t, e) {
            return !0;
          }
        }
        return (
          (t.??fac = function (e) {
            return new (e || t)(_o(al), _o(tl));
          }),
          (t.??dir = Qt({
            type: t,
            selectors: [['', 'ngIf', '']],
            inputs: { ngIf: 'ngIf', ngIfThen: 'ngIfThen', ngIfElse: 'ngIfElse' },
          })),
          t
        );
      })();
      class vu {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function bu(t, e) {
        if (e && !e.createEmbeddedView) throw new Error(`${t} must be a TemplateRef, but received '${rt(e)}'.`);
      }
      let wu = (() => {
        class t {}
        return (
          (t.??fac = function (e) {
            return new (e || t)();
          }),
          (t.??mod = Zt({ type: t })),
          (t.??inj = ft({ providers: [{ provide: hu, useClass: du }] })),
          t
        );
      })();
      function Cu(t) {
        return 'browser' === t;
      }
      let xu = (() => {
        class t {}
        return (t.??prov = pt({ token: t, providedIn: 'root', factory: () => new Su(cr(Wc), window) })), t;
      })();
      class Su {
        constructor(t, e) {
          (this.document = t), (this.window = e), (this.offset = () => [0, 0]);
        }
        setOffset(t) {
          this.offset = Array.isArray(t) ? () => t : t;
        }
        getScrollPosition() {
          return this.supportsScrolling() ? [this.window.pageXOffset, this.window.pageYOffset] : [0, 0];
        }
        scrollToPosition(t) {
          this.supportsScrolling() && this.window.scrollTo(t[0], t[1]);
        }
        scrollToAnchor(t) {
          if (!this.supportsScrolling()) return;
          const e = (function (t, e) {
            const n = t.getElementById(e) || t.getElementsByName(e)[0];
            if (n) return n;
            if ('function' == typeof t.createTreeWalker && t.body && (t.body.createShadowRoot || t.body.attachShadow)) {
              const n = t.createTreeWalker(t.body, NodeFilter.SHOW_ELEMENT);
              let r = n.currentNode;
              for (; r; ) {
                const t = r.shadowRoot;
                if (t) {
                  const n = t.getElementById(e) || t.querySelector(`[name="${e}"]`);
                  if (n) return n;
                }
                r = n.nextNode();
              }
            }
            return null;
          })(this.document, t);
          e && (this.scrollToElement(e), this.attemptFocus(e));
        }
        setHistoryScrollRestoration(t) {
          if (this.supportScrollRestoration()) {
            const e = this.window.history;
            e && e.scrollRestoration && (e.scrollRestoration = t);
          }
        }
        scrollToElement(t) {
          const e = t.getBoundingClientRect(),
            n = e.left + this.window.pageXOffset,
            r = e.top + this.window.pageYOffset,
            s = this.offset();
          this.window.scrollTo(n - s[0], r - s[1]);
        }
        attemptFocus(t) {
          return t.focus(), this.document.activeElement === t;
        }
        supportScrollRestoration() {
          try {
            if (!this.supportsScrolling()) return !1;
            const t = Eu(this.window.history) || Eu(Object.getPrototypeOf(this.window.history));
            return !(!t || (!t.writable && !t.set));
          } catch (t) {
            return !1;
          }
        }
        supportsScrolling() {
          try {
            return !!this.window && !!this.window.scrollTo && 'pageXOffset' in this.window;
          } catch (t) {
            return !1;
          }
        }
      }
      function Eu(t) {
        return Object.getOwnPropertyDescriptor(t, 'scrollRestoration');
      }
      class ku {}
      class Tu extends class extends class {} {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      } {
        static makeCurrent() {
          var t;
          (t = new Tu()), $c || ($c = t);
        }
        onAndCancel(t, e, n) {
          return (
            t.addEventListener(e, n, !1),
            () => {
              t.removeEventListener(e, n, !1);
            }
          );
        }
        dispatchEvent(t, e) {
          t.dispatchEvent(e);
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t);
        }
        createElement(t, e) {
          return (e = e || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument('fakeTitle');
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, e) {
          return 'window' === e ? window : 'document' === e ? t : 'body' === e ? t.body : null;
        }
        getBaseHref(t) {
          const e = ((Ou = Ou || document.querySelector('base')), Ou ? Ou.getAttribute('href') : null);
          return null == e
            ? null
            : (function (t) {
                (Au = Au || document.createElement('a')), Au.setAttribute('href', t);
                const e = Au.pathname;
                return '/' === e.charAt(0) ? e : `/${e}`;
              })(e);
        }
        resetBaseElement() {
          Ou = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return pu(document.cookie, t);
        }
      }
      let Au,
        Ou = null;
      const Iu = new qn('TRANSITION_ID'),
        Ru = [
          {
            provide: Wl,
            useFactory: function (t, e, n) {
              return () => {
                n.get(Gl).donePromise.then(() => {
                  const n = qc(),
                    r = e.querySelectorAll(`style[ng-transition="${t}"]`);
                  for (let t = 0; t < r.length; t++) n.remove(r[t]);
                });
              };
            },
            deps: [Iu, Wc, eo],
            multi: !0,
          },
        ];
      class Pu {
        static init() {
          var t;
          (t = new Pu()), (Sc = t);
        }
        addToWindow(t) {
          (Dt.getAngularTestability = (e, n = !0) => {
            const r = t.findTestabilityInTree(e, n);
            if (null == r) throw new Error('Could not find testability for element.');
            return r;
          }),
            (Dt.getAllAngularTestabilities = () => t.getAllTestabilities()),
            (Dt.getAllAngularRootElements = () => t.getAllRootElements()),
            Dt.frameworkStabilizers || (Dt.frameworkStabilizers = []),
            Dt.frameworkStabilizers.push((t) => {
              const e = Dt.getAllAngularTestabilities();
              let n = e.length,
                r = !1;
              const s = function (e) {
                (r = r || e), n--, 0 == n && t(r);
              };
              e.forEach(function (t) {
                t.whenStable(s);
              });
            });
        }
        findTestabilityInTree(t, e, n) {
          if (null == e) return null;
          const r = t.getTestability(e);
          return null != r
            ? r
            : n
            ? qc().isShadowRoot(e)
              ? this.findTestabilityInTree(t, e.host, !0)
              : this.findTestabilityInTree(t, e.parentElement, !0)
            : null;
        }
      }
      let Du = (() => {
        class t {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (t.??fac = function (e) {
            return new (e || t)();
          }),
          (t.??prov = pt({ token: t, factory: t.??fac })),
          t
        );
      })();
      const Lu = new qn('EventManagerPlugins');
      let Mu = (() => {
        class t {
          constructor(t, e) {
            (this._zone = e),
              (this._eventNameToPlugin = new Map()),
              t.forEach((t) => (t.manager = this)),
              (this._plugins = t.slice().reverse());
          }
          addEventListener(t, e, n) {
            return this._findPluginFor(e).addEventListener(t, e, n);
          }
          addGlobalEventListener(t, e, n) {
            return this._findPluginFor(e).addGlobalEventListener(t, e, n);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(t) {
            const e = this._eventNameToPlugin.get(t);
            if (e) return e;
            const n = this._plugins;
            for (let r = 0; r < n.length; r++) {
              const e = n[r];
              if (e.supports(t)) return this._eventNameToPlugin.set(t, e), e;
            }
            throw new Error(`No event manager plugin found for event ${t}`);
          }
        }
        return (
          (t.??fac = function (e) {
            return new (e || t)(cr(Lu), cr(pc));
          }),
          (t.??prov = pt({ token: t, factory: t.??fac })),
          t
        );
      })();
      class Nu {
        constructor(t) {
          this._doc = t;
        }
        addGlobalEventListener(t, e, n) {
          const r = qc().getGlobalEventTarget(this._doc, t);
          if (!r) throw new Error(`Unsupported event target ${r} for event ${e}`);
          return this.addEventListener(r, e, n);
        }
      }
      let Vu = (() => {
          class t {
            constructor() {
              this._stylesSet = new Set();
            }
            addStyles(t) {
              const e = new Set();
              t.forEach((t) => {
                this._stylesSet.has(t) || (this._stylesSet.add(t), e.add(t));
              }),
                this.onStylesAdded(e);
            }
            onStylesAdded(t) {}
            getAllStyles() {
              return Array.from(this._stylesSet);
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??prov = pt({ token: t, factory: t.??fac })),
            t
          );
        })(),
        ju = (() => {
          class t extends Vu {
            constructor(t) {
              super(), (this._doc = t), (this._hostNodes = new Map()), this._hostNodes.set(t.head, []);
            }
            _addStylesToHost(t, e, n) {
              t.forEach((t) => {
                const r = this._doc.createElement('style');
                (r.textContent = t), n.push(e.appendChild(r));
              });
            }
            addHost(t) {
              const e = [];
              this._addStylesToHost(this._stylesSet, t, e), this._hostNodes.set(t, e);
            }
            removeHost(t) {
              const e = this._hostNodes.get(t);
              e && e.forEach(Fu), this._hostNodes.delete(t);
            }
            onStylesAdded(t) {
              this._hostNodes.forEach((e, n) => {
                this._addStylesToHost(t, n, e);
              });
            }
            ngOnDestroy() {
              this._hostNodes.forEach((t) => t.forEach(Fu));
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)(cr(Wc));
            }),
            (t.??prov = pt({ token: t, factory: t.??fac })),
            t
          );
        })();
      function Fu(t) {
        qc().remove(t);
      }
      const Uu = {
          svg: 'http://www.w3.org/2000/svg',
          xhtml: 'http://www.w3.org/1999/xhtml',
          xlink: 'http://www.w3.org/1999/xlink',
          xml: 'http://www.w3.org/XML/1998/namespace',
          xmlns: 'http://www.w3.org/2000/xmlns/',
        },
        Hu = /%COMP%/g;
      function zu(t, e, n) {
        for (let r = 0; r < e.length; r++) {
          let s = e[r];
          Array.isArray(s) ? zu(t, s, n) : ((s = s.replace(Hu, t)), n.push(s));
        }
        return n;
      }
      function Bu(t) {
        return (e) => {
          if ('__ngUnwrap__' === e) return t;
          !1 === t(e) && (e.preventDefault(), (e.returnValue = !1));
        };
      }
      let $u = (() => {
        class t {
          constructor(t, e, n) {
            (this.eventManager = t),
              (this.sharedStylesHost = e),
              (this.appId = n),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new qu(t));
          }
          createRenderer(t, e) {
            if (!t || !e) return this.defaultRenderer;
            switch (e.encapsulation) {
              case At.Emulated: {
                let n = this.rendererByCompId.get(e.id);
                return (
                  n ||
                    ((n = new Wu(this.eventManager, this.sharedStylesHost, e, this.appId)),
                    this.rendererByCompId.set(e.id, n)),
                  n.applyToHost(t),
                  n
                );
              }
              case 1:
              case At.ShadowDom:
                return new Gu(this.eventManager, this.sharedStylesHost, t, e);
              default:
                if (!this.rendererByCompId.has(e.id)) {
                  const t = zu(e.id, e.styles, []);
                  this.sharedStylesHost.addStyles(t), this.rendererByCompId.set(e.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
          }
          begin() {}
          end() {}
        }
        return (
          (t.??fac = function (e) {
            return new (e || t)(cr(Mu), cr(ju), cr(Zl));
          }),
          (t.??prov = pt({ token: t, factory: t.??fac })),
          t
        );
      })();
      class qu {
        constructor(t) {
          (this.eventManager = t), (this.data = Object.create(null));
        }
        destroy() {}
        createElement(t, e) {
          return e ? document.createElementNS(Uu[e] || e, t) : document.createElement(t);
        }
        createComment(t) {
          return document.createComment(t);
        }
        createText(t) {
          return document.createTextNode(t);
        }
        appendChild(t, e) {
          t.appendChild(e);
        }
        insertBefore(t, e, n) {
          t && t.insertBefore(e, n);
        }
        removeChild(t, e) {
          t && t.removeChild(e);
        }
        selectRootElement(t, e) {
          let n = 'string' == typeof t ? document.querySelector(t) : t;
          if (!n) throw new Error(`The selector "${t}" did not match any elements`);
          return e || (n.textContent = ''), n;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, e, n, r) {
          if (r) {
            e = r + ':' + e;
            const s = Uu[r];
            s ? t.setAttributeNS(s, e, n) : t.setAttribute(e, n);
          } else t.setAttribute(e, n);
        }
        removeAttribute(t, e, n) {
          if (n) {
            const r = Uu[n];
            r ? t.removeAttributeNS(r, e) : t.removeAttribute(`${n}:${e}`);
          } else t.removeAttribute(e);
        }
        addClass(t, e) {
          t.classList.add(e);
        }
        removeClass(t, e) {
          t.classList.remove(e);
        }
        setStyle(t, e, n, r) {
          r & (ss.DashCase | ss.Important)
            ? t.style.setProperty(e, n, r & ss.Important ? 'important' : '')
            : (t.style[e] = n);
        }
        removeStyle(t, e, n) {
          n & ss.DashCase ? t.style.removeProperty(e) : (t.style[e] = '');
        }
        setProperty(t, e, n) {
          t[e] = n;
        }
        setValue(t, e) {
          t.nodeValue = e;
        }
        listen(t, e, n) {
          return 'string' == typeof t
            ? this.eventManager.addGlobalEventListener(t, e, Bu(n))
            : this.eventManager.addEventListener(t, e, Bu(n));
        }
      }
      class Wu extends qu {
        constructor(t, e, n, r) {
          super(t), (this.component = n);
          const s = zu(r + '-' + n.id, n.styles, []);
          e.addStyles(s),
            (this.contentAttr = '_ngcontent-%COMP%'.replace(Hu, r + '-' + n.id)),
            (this.hostAttr = '_nghost-%COMP%'.replace(Hu, r + '-' + n.id));
        }
        applyToHost(t) {
          super.setAttribute(t, this.hostAttr, '');
        }
        createElement(t, e) {
          const n = super.createElement(t, e);
          return super.setAttribute(n, this.contentAttr, ''), n;
        }
      }
      class Gu extends qu {
        constructor(t, e, n, r) {
          super(t),
            (this.sharedStylesHost = e),
            (this.hostEl = n),
            (this.shadowRoot = n.attachShadow({ mode: 'open' })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const s = zu(r.id, r.styles, []);
          for (let i = 0; i < s.length; i++) {
            const t = document.createElement('style');
            (t.textContent = s[i]), this.shadowRoot.appendChild(t);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(t, e) {
          return super.appendChild(this.nodeOrShadowRoot(t), e);
        }
        insertBefore(t, e, n) {
          return super.insertBefore(this.nodeOrShadowRoot(t), e, n);
        }
        removeChild(t, e) {
          return super.removeChild(this.nodeOrShadowRoot(t), e);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(t)));
        }
      }
      let Zu = (() => {
        class t extends Nu {
          constructor(t) {
            super(t);
          }
          supports(t) {
            return !0;
          }
          addEventListener(t, e, n) {
            return t.addEventListener(e, n, !1), () => this.removeEventListener(t, e, n);
          }
          removeEventListener(t, e, n) {
            return t.removeEventListener(e, n);
          }
        }
        return (
          (t.??fac = function (e) {
            return new (e || t)(cr(Wc));
          }),
          (t.??prov = pt({ token: t, factory: t.??fac })),
          t
        );
      })();
      const Ku = ['alt', 'control', 'meta', 'shift'],
        Qu = {
          '\b': 'Backspace',
          '\t': 'Tab',
          '\x7f': 'Delete',
          '\x1b': 'Escape',
          Del: 'Delete',
          Esc: 'Escape',
          Left: 'ArrowLeft',
          Right: 'ArrowRight',
          Up: 'ArrowUp',
          Down: 'ArrowDown',
          Menu: 'ContextMenu',
          Scroll: 'ScrollLock',
          Win: 'OS',
        },
        Yu = {
          A: '1',
          B: '2',
          C: '3',
          D: '4',
          E: '5',
          F: '6',
          G: '7',
          H: '8',
          I: '9',
          J: '*',
          K: '+',
          M: '-',
          N: '.',
          O: '/',
          '`': '0',
          '\x90': 'NumLock',
        },
        Ju = { alt: (t) => t.altKey, control: (t) => t.ctrlKey, meta: (t) => t.metaKey, shift: (t) => t.shiftKey };
      let Xu = (() => {
          class t extends Nu {
            constructor(t) {
              super(t);
            }
            supports(e) {
              return null != t.parseEventName(e);
            }
            addEventListener(e, n, r) {
              const s = t.parseEventName(n),
                i = t.eventCallback(s.fullKey, r, this.manager.getZone());
              return this.manager.getZone().runOutsideAngular(() => qc().onAndCancel(e, s.domEventName, i));
            }
            static parseEventName(e) {
              const n = e.toLowerCase().split('.'),
                r = n.shift();
              if (0 === n.length || ('keydown' !== r && 'keyup' !== r)) return null;
              const s = t._normalizeKey(n.pop());
              let i = '';
              if (
                (Ku.forEach((t) => {
                  const e = n.indexOf(t);
                  e > -1 && (n.splice(e, 1), (i += t + '.'));
                }),
                (i += s),
                0 != n.length || 0 === s.length)
              )
                return null;
              const o = {};
              return (o.domEventName = r), (o.fullKey = i), o;
            }
            static getEventFullKey(t) {
              let e = '',
                n = (function (t) {
                  let e = t.key;
                  if (null == e) {
                    if (((e = t.keyIdentifier), null == e)) return 'Unidentified';
                    e.startsWith('U+') &&
                      ((e = String.fromCharCode(parseInt(e.substring(2), 16))),
                      3 === t.location && Yu.hasOwnProperty(e) && (e = Yu[e]));
                  }
                  return Qu[e] || e;
                })(t);
              return (
                (n = n.toLowerCase()),
                ' ' === n ? (n = 'space') : '.' === n && (n = 'dot'),
                Ku.forEach((r) => {
                  r != n && (0, Ju[r])(t) && (e += r + '.');
                }),
                (e += n),
                e
              );
            }
            static eventCallback(e, n, r) {
              return (s) => {
                t.getEventFullKey(s) === e && r.runGuarded(() => n(s));
              };
            }
            static _normalizeKey(t) {
              switch (t) {
                case 'esc':
                  return 'escape';
                default:
                  return t;
              }
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)(cr(Wc));
            }),
            (t.??prov = pt({ token: t, factory: t.??fac })),
            t
          );
        })(),
        th = (() => {
          class t {}
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??prov = pt({
              factory: function () {
                return cr(nh);
              },
              token: t,
              providedIn: 'root',
            })),
            t
          );
        })();
      function eh(t) {
        return new nh(t.get(Wc));
      }
      let nh = (() => {
        class t extends th {
          constructor(t) {
            super(), (this._doc = t);
          }
          sanitize(t, e) {
            if (null == e) return null;
            switch (t) {
              case Kr.NONE:
                return e;
              case Kr.HTML:
                return Er(e, 'HTML')
                  ? Sr(e)
                  : (function (t, e) {
                      let n = null;
                      try {
                        Gr =
                          Gr ||
                          (function (t) {
                            const e = new Ar(t);
                            return (function () {
                              try {
                                return !!new window.DOMParser().parseFromString(_r(''), 'text/html');
                              } catch (t) {
                                return !1;
                              }
                            })()
                              ? new Tr(e)
                              : e;
                          })(t);
                        let r = e ? String(e) : '';
                        n = Gr.getInertBodyElement(r);
                        let s = 5,
                          i = r;
                        do {
                          if (0 === s) throw new Error('Failed to sanitize html because the input is unstable');
                          s--, (r = i), (i = n.innerHTML), (n = Gr.getInertBodyElement(r));
                        } while (r !== i);
                        return _r(new Br().sanitizeChildren(Zr(n) || n));
                      } finally {
                        if (n) {
                          const t = Zr(n) || n;
                          for (; t.firstChild; ) t.removeChild(t.firstChild);
                        }
                      }
                    })(this._doc, String(e)).toString();
              case Kr.STYLE:
                return Er(e, 'Style') ? Sr(e) : e;
              case Kr.SCRIPT:
                if (Er(e, 'Script')) return Sr(e);
                throw new Error('unsafe value used in a script context');
              case Kr.URL:
                return kr(e), Er(e, 'URL') ? Sr(e) : Rr(String(e));
              case Kr.RESOURCE_URL:
                if (Er(e, 'ResourceURL')) return Sr(e);
                throw new Error('unsafe value used in a resource URL context (see https://g.co/ng/security#xss)');
              default:
                throw new Error(`Unexpected SecurityContext ${t} (see https://g.co/ng/security#xss)`);
            }
          }
          bypassSecurityTrustHtml(t) {
            return new vr(t);
          }
          bypassSecurityTrustStyle(t) {
            return new br(t);
          }
          bypassSecurityTrustScript(t) {
            return new wr(t);
          }
          bypassSecurityTrustUrl(t) {
            return new Cr(t);
          }
          bypassSecurityTrustResourceUrl(t) {
            return new xr(t);
          }
        }
        return (
          (t.??fac = function (e) {
            return new (e || t)(cr(Wc));
          }),
          (t.??prov = pt({
            factory: function () {
              return eh(cr(Ui));
            },
            token: t,
            providedIn: 'root',
          })),
          t
        );
      })();
      const rh = Ic(Hc, 'browser', [
          { provide: Jl, useValue: 'browser' },
          {
            provide: Yl,
            useValue: function () {
              Tu.makeCurrent(), Pu.init();
            },
            multi: !0,
          },
          {
            provide: Wc,
            useFactory: function () {
              return (
                (function (t) {
                  ge = t;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        sh = [
          [],
          { provide: zi, useValue: 'root' },
          {
            provide: es,
            useFactory: function () {
              return new es();
            },
            deps: [],
          },
          { provide: Lu, useClass: Zu, multi: !0, deps: [Wc, pc, Jl] },
          { provide: Lu, useClass: Xu, multi: !0, deps: [Wc] },
          [],
          { provide: $u, useClass: $u, deps: [Mu, ju, Zl] },
          { provide: Ea, useExisting: $u },
          { provide: Vu, useExisting: ju },
          { provide: ju, useClass: ju, deps: [Wc] },
          { provide: bc, useClass: bc, deps: [pc] },
          { provide: Mu, useClass: Mu, deps: [Lu, pc] },
          { provide: ku, useClass: Du, deps: [] },
          [],
        ];
      let ih = (() => {
        class t {
          constructor(t) {
            if (t)
              throw new Error(
                'BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.'
              );
          }
          static withServerTransition(e) {
            return {
              ngModule: t,
              providers: [{ provide: Zl, useValue: e.appId }, { provide: Iu, useExisting: Zl }, Ru],
            };
          }
        }
        return (
          (t.??fac = function (e) {
            return new (e || t)(cr(t, 12));
          }),
          (t.??mod = Zt({ type: t })),
          (t.??inj = ft({ providers: sh, imports: [wu, Bc] })),
          t
        );
      })();
      function oh() {
        return new ah(cr(Wc));
      }
      let ah = (() => {
        class t {
          constructor(t) {
            this._doc = t;
          }
          getTitle() {
            return this._doc.title;
          }
          setTitle(t) {
            this._doc.title = t || '';
          }
        }
        return (
          (t.??fac = function (e) {
            return new (e || t)(cr(Wc));
          }),
          (t.??prov = pt({ factory: oh, token: t, providedIn: 'root' })),
          t
        );
      })();
      function lh(...t) {
        if (1 === t.length) {
          const e = t[0];
          if (l(e)) return ch(e, null);
          if (c(e) && Object.getPrototypeOf(e) === Object.prototype) {
            const t = Object.keys(e);
            return ch(
              t.map((t) => e[t]),
              t
            );
          }
        }
        if ('function' == typeof t[t.length - 1]) {
          const e = t.pop();
          return ch((t = 1 === t.length && l(t[0]) ? t[0] : t), null).pipe(k((t) => e(...t)));
        }
        return ch(t, null);
      }
      function ch(t, e) {
        return new y((n) => {
          const r = t.length;
          if (0 === r) return void n.complete();
          const s = new Array(r);
          let i = 0,
            o = 0;
          for (let a = 0; a < r; a++) {
            const l = M(t[a]);
            let c = !1;
            n.add(
              l.subscribe({
                next: (t) => {
                  c || ((c = !0), o++), (s[a] = t);
                },
                error: (t) => n.error(t),
                complete: () => {
                  i++,
                    (i !== r && c) ||
                      (o === r && n.next(e ? e.reduce((t, e, n) => ((t[e] = s[n]), t), {}) : s), n.complete());
                },
              })
            );
          }
        });
      }
      'undefined' != typeof window && window;
      let uh = (() => {
          class t {
            constructor(t, e) {
              (this._renderer = t), (this._elementRef = e), (this.onChange = (t) => {}), (this.onTouched = () => {});
            }
            setProperty(t, e) {
              this._renderer.setProperty(this._elementRef.nativeElement, t, e);
            }
            registerOnTouched(t) {
              this.onTouched = t;
            }
            registerOnChange(t) {
              this.onChange = t;
            }
            setDisabledState(t) {
              this.setProperty('disabled', t);
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)(_o(ka), _o(xa));
            }),
            (t.??dir = Qt({ type: t })),
            t
          );
        })(),
        hh = (() => {
          class t extends uh {}
          return (
            (t.??fac = (function () {
              let e;
              return function (n) {
                return (e || (e = Un(t)))(n || t);
              };
            })()),
            (t.??dir = Qt({ type: t, features: [ro] })),
            t
          );
        })();
      const dh = new qn('NgValueAccessor'),
        ph = { provide: dh, useExisting: ot(() => fh), multi: !0 };
      let fh = (() => {
        class t extends hh {
          writeValue(t) {
            this.setProperty('checked', t);
          }
        }
        return (
          (t.??fac = (function () {
            let e;
            return function (n) {
              return (e || (e = Un(t)))(n || t);
            };
          })()),
          (t.??dir = Qt({
            type: t,
            selectors: [
              ['input', 'type', 'checkbox', 'formControlName', ''],
              ['input', 'type', 'checkbox', 'formControl', ''],
              ['input', 'type', 'checkbox', 'ngModel', ''],
            ],
            hostBindings: function (t, e) {
              1 & t &&
                To('change', function (t) {
                  return e.onChange(t.target.checked);
                })('blur', function () {
                  return e.onTouched();
                });
            },
            features: [ma([ph]), ro],
          })),
          t
        );
      })();
      const gh = { provide: dh, useExisting: ot(() => _h), multi: !0 },
        mh = new qn('CompositionEventMode');
      let _h = (() => {
        class t extends uh {
          constructor(t, e, n) {
            super(t, e),
              (this._compositionMode = n),
              (this._composing = !1),
              null == this._compositionMode &&
                (this._compositionMode = !(function () {
                  const t = qc() ? qc().getUserAgent() : '';
                  return /android (\d+)/.test(t.toLowerCase());
                })());
          }
          writeValue(t) {
            this.setProperty('value', null == t ? '' : t);
          }
          _handleInput(t) {
            (!this._compositionMode || (this._compositionMode && !this._composing)) && this.onChange(t);
          }
          _compositionStart() {
            this._composing = !0;
          }
          _compositionEnd(t) {
            (this._composing = !1), this._compositionMode && this.onChange(t);
          }
        }
        return (
          (t.??fac = function (e) {
            return new (e || t)(_o(ka), _o(xa), _o(mh, 8));
          }),
          (t.??dir = Qt({
            type: t,
            selectors: [
              ['input', 'formControlName', '', 3, 'type', 'checkbox'],
              ['textarea', 'formControlName', ''],
              ['input', 'formControl', '', 3, 'type', 'checkbox'],
              ['textarea', 'formControl', ''],
              ['input', 'ngModel', '', 3, 'type', 'checkbox'],
              ['textarea', 'ngModel', ''],
              ['', 'ngDefaultControl', ''],
            ],
            hostBindings: function (t, e) {
              1 & t &&
                To('input', function (t) {
                  return e._handleInput(t.target.value);
                })('blur', function () {
                  return e.onTouched();
                })('compositionstart', function () {
                  return e._compositionStart();
                })('compositionend', function (t) {
                  return e._compositionEnd(t.target.value);
                });
            },
            features: [ma([gh]), ro],
          })),
          t
        );
      })();
      function yh(t) {
        return null == t || 0 === t.length;
      }
      function vh(t) {
        return null != t && 'number' == typeof t.length;
      }
      const bh = new qn('NgValidators'),
        wh = new qn('NgAsyncValidators'),
        Ch =
          /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      class xh {
        static min(t) {
          return (function (t) {
            return (e) => {
              if (yh(e.value) || yh(t)) return null;
              const n = parseFloat(e.value);
              return !isNaN(n) && n < t ? { min: { min: t, actual: e.value } } : null;
            };
          })(t);
        }
        static max(t) {
          return (function (t) {
            return (e) => {
              if (yh(e.value) || yh(t)) return null;
              const n = parseFloat(e.value);
              return !isNaN(n) && n > t ? { max: { max: t, actual: e.value } } : null;
            };
          })(t);
        }
        static required(t) {
          return Sh(t);
        }
        static requiredTrue(t) {
          return (function (t) {
            return !0 === t.value ? null : { required: !0 };
          })(t);
        }
        static email(t) {
          return (function (t) {
            return yh(t.value) || Ch.test(t.value) ? null : { email: !0 };
          })(t);
        }
        static minLength(t) {
          return (function (t) {
            return (e) =>
              yh(e.value) || !vh(e.value)
                ? null
                : e.value.length < t
                ? { minlength: { requiredLength: t, actualLength: e.value.length } }
                : null;
          })(t);
        }
        static maxLength(t) {
          return (function (t) {
            return (e) =>
              vh(e.value) && e.value.length > t
                ? { maxlength: { requiredLength: t, actualLength: e.value.length } }
                : null;
          })(t);
        }
        static pattern(t) {
          return (function (t) {
            if (!t) return Eh;
            let e, n;
            return (
              'string' == typeof t
                ? ((n = ''),
                  '^' !== t.charAt(0) && (n += '^'),
                  (n += t),
                  '$' !== t.charAt(t.length - 1) && (n += '$'),
                  (e = new RegExp(n)))
                : ((n = t.toString()), (e = t)),
              (t) => {
                if (yh(t.value)) return null;
                const r = t.value;
                return e.test(r) ? null : { pattern: { requiredPattern: n, actualValue: r } };
              }
            );
          })(t);
        }
        static nullValidator(t) {
          return null;
        }
        static compose(t) {
          return Rh(t);
        }
        static composeAsync(t) {
          return Dh(t);
        }
      }
      function Sh(t) {
        return yh(t.value) ? { required: !0 } : null;
      }
      function Eh(t) {
        return null;
      }
      function kh(t) {
        return null != t;
      }
      function Th(t) {
        const e = Eo(t) ? M(t) : t;
        return ko(e), e;
      }
      function Ah(t) {
        let e = {};
        return (
          t.forEach((t) => {
            e = null != t ? Object.assign(Object.assign({}, e), t) : e;
          }),
          0 === Object.keys(e).length ? null : e
        );
      }
      function Oh(t, e) {
        return e.map((e) => e(t));
      }
      function Ih(t) {
        return t.map((t) =>
          (function (t) {
            return !t.validate;
          })(t)
            ? t
            : (e) => t.validate(e)
        );
      }
      function Rh(t) {
        if (!t) return null;
        const e = t.filter(kh);
        return 0 == e.length
          ? null
          : function (t) {
              return Ah(Oh(t, e));
            };
      }
      function Ph(t) {
        return null != t ? Rh(Ih(t)) : null;
      }
      function Dh(t) {
        if (!t) return null;
        const e = t.filter(kh);
        return 0 == e.length
          ? null
          : function (t) {
              return lh(Oh(t, e).map(Th)).pipe(k(Ah));
            };
      }
      function Lh(t) {
        return null != t ? Dh(Ih(t)) : null;
      }
      function Mh(t, e) {
        return null === t ? [e] : Array.isArray(t) ? [...t, e] : [t, e];
      }
      function Nh(t) {
        return t._rawValidators;
      }
      function Vh(t) {
        return t._rawAsyncValidators;
      }
      function jh(t) {
        return t ? (Array.isArray(t) ? t : [t]) : [];
      }
      function Fh(t, e) {
        return Array.isArray(t) ? t.includes(e) : t === e;
      }
      function Uh(t, e) {
        const n = jh(e);
        return (
          jh(t).forEach((t) => {
            Fh(n, t) || n.push(t);
          }),
          n
        );
      }
      function Hh(t, e) {
        return jh(e).filter((e) => !Fh(t, e));
      }
      let zh = (() => {
          class t {
            constructor() {
              (this._rawValidators = []), (this._rawAsyncValidators = []), (this._onDestroyCallbacks = []);
            }
            get value() {
              return this.control ? this.control.value : null;
            }
            get valid() {
              return this.control ? this.control.valid : null;
            }
            get invalid() {
              return this.control ? this.control.invalid : null;
            }
            get pending() {
              return this.control ? this.control.pending : null;
            }
            get disabled() {
              return this.control ? this.control.disabled : null;
            }
            get enabled() {
              return this.control ? this.control.enabled : null;
            }
            get errors() {
              return this.control ? this.control.errors : null;
            }
            get pristine() {
              return this.control ? this.control.pristine : null;
            }
            get dirty() {
              return this.control ? this.control.dirty : null;
            }
            get touched() {
              return this.control ? this.control.touched : null;
            }
            get status() {
              return this.control ? this.control.status : null;
            }
            get untouched() {
              return this.control ? this.control.untouched : null;
            }
            get statusChanges() {
              return this.control ? this.control.statusChanges : null;
            }
            get valueChanges() {
              return this.control ? this.control.valueChanges : null;
            }
            get path() {
              return null;
            }
            _setValidators(t) {
              (this._rawValidators = t || []), (this._composedValidatorFn = Ph(this._rawValidators));
            }
            _setAsyncValidators(t) {
              (this._rawAsyncValidators = t || []), (this._composedAsyncValidatorFn = Lh(this._rawAsyncValidators));
            }
            get validator() {
              return this._composedValidatorFn || null;
            }
            get asyncValidator() {
              return this._composedAsyncValidatorFn || null;
            }
            _registerOnDestroy(t) {
              this._onDestroyCallbacks.push(t);
            }
            _invokeOnDestroyCallbacks() {
              this._onDestroyCallbacks.forEach((t) => t()), (this._onDestroyCallbacks = []);
            }
            reset(t) {
              this.control && this.control.reset(t);
            }
            hasError(t, e) {
              return !!this.control && this.control.hasError(t, e);
            }
            getError(t, e) {
              return this.control ? this.control.getError(t, e) : null;
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??dir = Qt({ type: t })),
            t
          );
        })(),
        Bh = (() => {
          class t extends zh {
            get formDirective() {
              return null;
            }
            get path() {
              return null;
            }
          }
          return (
            (t.??fac = (function () {
              let e;
              return function (n) {
                return (e || (e = Un(t)))(n || t);
              };
            })()),
            (t.??dir = Qt({ type: t, features: [ro] })),
            t
          );
        })();
      class $h extends zh {
        constructor() {
          super(...arguments), (this._parent = null), (this.name = null), (this.valueAccessor = null);
        }
      }
      class qh {
        constructor(t) {
          this._cd = t;
        }
        is(t) {
          var e, n, r;
          return 'submitted' === t
            ? !!(null === (e = this._cd) || void 0 === e ? void 0 : e.submitted)
            : !!(null === (r = null === (n = this._cd) || void 0 === n ? void 0 : n.control) || void 0 === r
                ? void 0
                : r[t]);
        }
      }
      let Wh = (() => {
          class t extends qh {
            constructor(t) {
              super(t);
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)(_o($h, 2));
            }),
            (t.??dir = Qt({
              type: t,
              selectors: [
                ['', 'formControlName', ''],
                ['', 'ngModel', ''],
                ['', 'formControl', ''],
              ],
              hostVars: 14,
              hostBindings: function (t, e) {
                2 & t &&
                  Uo('ng-untouched', e.is('untouched'))('ng-touched', e.is('touched'))('ng-pristine', e.is('pristine'))(
                    'ng-dirty',
                    e.is('dirty')
                  )('ng-valid', e.is('valid'))('ng-invalid', e.is('invalid'))('ng-pending', e.is('pending'));
              },
              features: [ro],
            })),
            t
          );
        })(),
        Gh = (() => {
          class t extends qh {
            constructor(t) {
              super(t);
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)(_o(Bh, 10));
            }),
            (t.??dir = Qt({
              type: t,
              selectors: [
                ['', 'formGroupName', ''],
                ['', 'formArrayName', ''],
                ['', 'ngModelGroup', ''],
                ['', 'formGroup', ''],
                ['form', 3, 'ngNoForm', ''],
                ['', 'ngForm', ''],
              ],
              hostVars: 16,
              hostBindings: function (t, e) {
                2 & t &&
                  Uo('ng-untouched', e.is('untouched'))('ng-touched', e.is('touched'))('ng-pristine', e.is('pristine'))(
                    'ng-dirty',
                    e.is('dirty')
                  )('ng-valid', e.is('valid'))('ng-invalid', e.is('invalid'))('ng-pending', e.is('pending'))(
                    'ng-submitted',
                    e.is('submitted')
                  );
              },
              features: [ro],
            })),
            t
          );
        })();
      function Zh(t, e) {
        Yh(t, e),
          e.valueAccessor.writeValue(t.value),
          (function (t, e) {
            e.valueAccessor.registerOnChange((n) => {
              (t._pendingValue = n),
                (t._pendingChange = !0),
                (t._pendingDirty = !0),
                'change' === t.updateOn && Xh(t, e);
            });
          })(t, e),
          (function (t, e) {
            const n = (t, n) => {
              e.valueAccessor.writeValue(t), n && e.viewToModelUpdate(t);
            };
            t.registerOnChange(n),
              e._registerOnDestroy(() => {
                t._unregisterOnChange(n);
              });
          })(t, e),
          (function (t, e) {
            e.valueAccessor.registerOnTouched(() => {
              (t._pendingTouched = !0),
                'blur' === t.updateOn && t._pendingChange && Xh(t, e),
                'submit' !== t.updateOn && t.markAsTouched();
            });
          })(t, e),
          (function (t, e) {
            if (e.valueAccessor.setDisabledState) {
              const n = (t) => {
                e.valueAccessor.setDisabledState(t);
              };
              t.registerOnDisabledChange(n),
                e._registerOnDestroy(() => {
                  t._unregisterOnDisabledChange(n);
                });
            }
          })(t, e);
      }
      function Kh(t, e, n = !0) {
        const r = () => {};
        e.valueAccessor && (e.valueAccessor.registerOnChange(r), e.valueAccessor.registerOnTouched(r)),
          Jh(t, e),
          t && (e._invokeOnDestroyCallbacks(), t._registerOnCollectionChange(() => {}));
      }
      function Qh(t, e) {
        t.forEach((t) => {
          t.registerOnValidatorChange && t.registerOnValidatorChange(e);
        });
      }
      function Yh(t, e) {
        const n = Nh(t);
        null !== e.validator ? t.setValidators(Mh(n, e.validator)) : 'function' == typeof n && t.setValidators([n]);
        const r = Vh(t);
        null !== e.asyncValidator
          ? t.setAsyncValidators(Mh(r, e.asyncValidator))
          : 'function' == typeof r && t.setAsyncValidators([r]);
        const s = () => t.updateValueAndValidity();
        Qh(e._rawValidators, s), Qh(e._rawAsyncValidators, s);
      }
      function Jh(t, e) {
        let n = !1;
        if (null !== t) {
          if (null !== e.validator) {
            const r = Nh(t);
            if (Array.isArray(r) && r.length > 0) {
              const s = r.filter((t) => t !== e.validator);
              s.length !== r.length && ((n = !0), t.setValidators(s));
            }
          }
          if (null !== e.asyncValidator) {
            const r = Vh(t);
            if (Array.isArray(r) && r.length > 0) {
              const s = r.filter((t) => t !== e.asyncValidator);
              s.length !== r.length && ((n = !0), t.setAsyncValidators(s));
            }
          }
        }
        const r = () => {};
        return Qh(e._rawValidators, r), Qh(e._rawAsyncValidators, r), n;
      }
      function Xh(t, e) {
        t._pendingDirty && t.markAsDirty(),
          t.setValue(t._pendingValue, { emitModelToViewChange: !1 }),
          e.viewToModelUpdate(t._pendingValue),
          (t._pendingChange = !1);
      }
      function td(t, e) {
        const n = t.indexOf(e);
        n > -1 && t.splice(n, 1);
      }
      const ed = 'VALID',
        nd = 'INVALID',
        rd = 'PENDING',
        sd = 'DISABLED';
      function id(t) {
        return (cd(t) ? t.validators : t) || null;
      }
      function od(t) {
        return Array.isArray(t) ? Ph(t) : t || null;
      }
      function ad(t, e) {
        return (cd(e) ? e.asyncValidators : t) || null;
      }
      function ld(t) {
        return Array.isArray(t) ? Lh(t) : t || null;
      }
      function cd(t) {
        return null != t && !Array.isArray(t) && 'object' == typeof t;
      }
      class ud {
        constructor(t, e) {
          (this._hasOwnPendingAsyncValidator = !1),
            (this._onCollectionChange = () => {}),
            (this._parent = null),
            (this.pristine = !0),
            (this.touched = !1),
            (this._onDisabledChange = []),
            (this._rawValidators = t),
            (this._rawAsyncValidators = e),
            (this._composedValidatorFn = od(this._rawValidators)),
            (this._composedAsyncValidatorFn = ld(this._rawAsyncValidators));
        }
        get validator() {
          return this._composedValidatorFn;
        }
        set validator(t) {
          this._rawValidators = this._composedValidatorFn = t;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn;
        }
        set asyncValidator(t) {
          this._rawAsyncValidators = this._composedAsyncValidatorFn = t;
        }
        get parent() {
          return this._parent;
        }
        get valid() {
          return this.status === ed;
        }
        get invalid() {
          return this.status === nd;
        }
        get pending() {
          return this.status == rd;
        }
        get disabled() {
          return this.status === sd;
        }
        get enabled() {
          return this.status !== sd;
        }
        get dirty() {
          return !this.pristine;
        }
        get untouched() {
          return !this.touched;
        }
        get updateOn() {
          return this._updateOn ? this._updateOn : this.parent ? this.parent.updateOn : 'change';
        }
        setValidators(t) {
          (this._rawValidators = t), (this._composedValidatorFn = od(t));
        }
        setAsyncValidators(t) {
          (this._rawAsyncValidators = t), (this._composedAsyncValidatorFn = ld(t));
        }
        addValidators(t) {
          this.setValidators(Uh(t, this._rawValidators));
        }
        addAsyncValidators(t) {
          this.setAsyncValidators(Uh(t, this._rawAsyncValidators));
        }
        removeValidators(t) {
          this.setValidators(Hh(t, this._rawValidators));
        }
        removeAsyncValidators(t) {
          this.setAsyncValidators(Hh(t, this._rawAsyncValidators));
        }
        hasValidator(t) {
          return Fh(this._rawValidators, t);
        }
        hasAsyncValidator(t) {
          return Fh(this._rawAsyncValidators, t);
        }
        clearValidators() {
          this.validator = null;
        }
        clearAsyncValidators() {
          this.asyncValidator = null;
        }
        markAsTouched(t = {}) {
          (this.touched = !0), this._parent && !t.onlySelf && this._parent.markAsTouched(t);
        }
        markAllAsTouched() {
          this.markAsTouched({ onlySelf: !0 }), this._forEachChild((t) => t.markAllAsTouched());
        }
        markAsUntouched(t = {}) {
          (this.touched = !1),
            (this._pendingTouched = !1),
            this._forEachChild((t) => {
              t.markAsUntouched({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        markAsDirty(t = {}) {
          (this.pristine = !1), this._parent && !t.onlySelf && this._parent.markAsDirty(t);
        }
        markAsPristine(t = {}) {
          (this.pristine = !0),
            (this._pendingDirty = !1),
            this._forEachChild((t) => {
              t.markAsPristine({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        markAsPending(t = {}) {
          (this.status = rd),
            !1 !== t.emitEvent && this.statusChanges.emit(this.status),
            this._parent && !t.onlySelf && this._parent.markAsPending(t);
        }
        disable(t = {}) {
          const e = this._parentMarkedDirty(t.onlySelf);
          (this.status = sd),
            (this.errors = null),
            this._forEachChild((e) => {
              e.disable(Object.assign(Object.assign({}, t), { onlySelf: !0 }));
            }),
            this._updateValue(),
            !1 !== t.emitEvent && (this.valueChanges.emit(this.value), this.statusChanges.emit(this.status)),
            this._updateAncestors(Object.assign(Object.assign({}, t), { skipPristineCheck: e })),
            this._onDisabledChange.forEach((t) => t(!0));
        }
        enable(t = {}) {
          const e = this._parentMarkedDirty(t.onlySelf);
          (this.status = ed),
            this._forEachChild((e) => {
              e.enable(Object.assign(Object.assign({}, t), { onlySelf: !0 }));
            }),
            this.updateValueAndValidity({ onlySelf: !0, emitEvent: t.emitEvent }),
            this._updateAncestors(Object.assign(Object.assign({}, t), { skipPristineCheck: e })),
            this._onDisabledChange.forEach((t) => t(!1));
        }
        _updateAncestors(t) {
          this._parent &&
            !t.onlySelf &&
            (this._parent.updateValueAndValidity(t),
            t.skipPristineCheck || this._parent._updatePristine(),
            this._parent._updateTouched());
        }
        setParent(t) {
          this._parent = t;
        }
        updateValueAndValidity(t = {}) {
          this._setInitialStatus(),
            this._updateValue(),
            this.enabled &&
              (this._cancelExistingSubscription(),
              (this.errors = this._runValidator()),
              (this.status = this._calculateStatus()),
              (this.status !== ed && this.status !== rd) || this._runAsyncValidator(t.emitEvent)),
            !1 !== t.emitEvent && (this.valueChanges.emit(this.value), this.statusChanges.emit(this.status)),
            this._parent && !t.onlySelf && this._parent.updateValueAndValidity(t);
        }
        _updateTreeValidity(t = { emitEvent: !0 }) {
          this._forEachChild((e) => e._updateTreeValidity(t)),
            this.updateValueAndValidity({ onlySelf: !0, emitEvent: t.emitEvent });
        }
        _setInitialStatus() {
          this.status = this._allControlsDisabled() ? sd : ed;
        }
        _runValidator() {
          return this.validator ? this.validator(this) : null;
        }
        _runAsyncValidator(t) {
          if (this.asyncValidator) {
            (this.status = rd), (this._hasOwnPendingAsyncValidator = !0);
            const e = Th(this.asyncValidator(this));
            this._asyncValidationSubscription = e.subscribe((e) => {
              (this._hasOwnPendingAsyncValidator = !1), this.setErrors(e, { emitEvent: t });
            });
          }
        }
        _cancelExistingSubscription() {
          this._asyncValidationSubscription &&
            (this._asyncValidationSubscription.unsubscribe(), (this._hasOwnPendingAsyncValidator = !1));
        }
        setErrors(t, e = {}) {
          (this.errors = t), this._updateControlsErrors(!1 !== e.emitEvent);
        }
        get(t) {
          return (function (t, e, n) {
            if (null == e) return null;
            if ((Array.isArray(e) || (e = e.split('.')), Array.isArray(e) && 0 === e.length)) return null;
            let r = t;
            return (
              e.forEach((t) => {
                r =
                  r instanceof dd
                    ? r.controls.hasOwnProperty(t)
                      ? r.controls[t]
                      : null
                    : (r instanceof pd && r.at(t)) || null;
              }),
              r
            );
          })(this, t);
        }
        getError(t, e) {
          const n = e ? this.get(e) : this;
          return n && n.errors ? n.errors[t] : null;
        }
        hasError(t, e) {
          return !!this.getError(t, e);
        }
        get root() {
          let t = this;
          for (; t._parent; ) t = t._parent;
          return t;
        }
        _updateControlsErrors(t) {
          (this.status = this._calculateStatus()),
            t && this.statusChanges.emit(this.status),
            this._parent && this._parent._updateControlsErrors(t);
        }
        _initObservables() {
          (this.valueChanges = new kl()), (this.statusChanges = new kl());
        }
        _calculateStatus() {
          return this._allControlsDisabled()
            ? sd
            : this.errors
            ? nd
            : this._hasOwnPendingAsyncValidator || this._anyControlsHaveStatus(rd)
            ? rd
            : this._anyControlsHaveStatus(nd)
            ? nd
            : ed;
        }
        _anyControlsHaveStatus(t) {
          return this._anyControls((e) => e.status === t);
        }
        _anyControlsDirty() {
          return this._anyControls((t) => t.dirty);
        }
        _anyControlsTouched() {
          return this._anyControls((t) => t.touched);
        }
        _updatePristine(t = {}) {
          (this.pristine = !this._anyControlsDirty()), this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        _updateTouched(t = {}) {
          (this.touched = this._anyControlsTouched()), this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        _isBoxedValue(t) {
          return 'object' == typeof t && null !== t && 2 === Object.keys(t).length && 'value' in t && 'disabled' in t;
        }
        _registerOnCollectionChange(t) {
          this._onCollectionChange = t;
        }
        _setUpdateStrategy(t) {
          cd(t) && null != t.updateOn && (this._updateOn = t.updateOn);
        }
        _parentMarkedDirty(t) {
          return !t && !(!this._parent || !this._parent.dirty) && !this._parent._anyControlsDirty();
        }
      }
      class hd extends ud {
        constructor(t = null, e, n) {
          super(id(e), ad(n, e)),
            (this._onChange = []),
            this._applyFormState(t),
            this._setUpdateStrategy(e),
            this._initObservables(),
            this.updateValueAndValidity({ onlySelf: !0, emitEvent: !!this.asyncValidator });
        }
        setValue(t, e = {}) {
          (this.value = this._pendingValue = t),
            this._onChange.length &&
              !1 !== e.emitModelToViewChange &&
              this._onChange.forEach((t) => t(this.value, !1 !== e.emitViewToModelChange)),
            this.updateValueAndValidity(e);
        }
        patchValue(t, e = {}) {
          this.setValue(t, e);
        }
        reset(t = null, e = {}) {
          this._applyFormState(t),
            this.markAsPristine(e),
            this.markAsUntouched(e),
            this.setValue(this.value, e),
            (this._pendingChange = !1);
        }
        _updateValue() {}
        _anyControls(t) {
          return !1;
        }
        _allControlsDisabled() {
          return this.disabled;
        }
        registerOnChange(t) {
          this._onChange.push(t);
        }
        _unregisterOnChange(t) {
          td(this._onChange, t);
        }
        registerOnDisabledChange(t) {
          this._onDisabledChange.push(t);
        }
        _unregisterOnDisabledChange(t) {
          td(this._onDisabledChange, t);
        }
        _forEachChild(t) {}
        _syncPendingControls() {
          return !(
            'submit' !== this.updateOn ||
            (this._pendingDirty && this.markAsDirty(),
            this._pendingTouched && this.markAsTouched(),
            !this._pendingChange) ||
            (this.setValue(this._pendingValue, { onlySelf: !0, emitModelToViewChange: !1 }), 0)
          );
        }
        _applyFormState(t) {
          this._isBoxedValue(t)
            ? ((this.value = this._pendingValue = t.value),
              t.disabled ? this.disable({ onlySelf: !0, emitEvent: !1 }) : this.enable({ onlySelf: !0, emitEvent: !1 }))
            : (this.value = this._pendingValue = t);
        }
      }
      class dd extends ud {
        constructor(t, e, n) {
          super(id(e), ad(n, e)),
            (this.controls = t),
            this._initObservables(),
            this._setUpdateStrategy(e),
            this._setUpControls(),
            this.updateValueAndValidity({ onlySelf: !0, emitEvent: !!this.asyncValidator });
        }
        registerControl(t, e) {
          return this.controls[t]
            ? this.controls[t]
            : ((this.controls[t] = e), e.setParent(this), e._registerOnCollectionChange(this._onCollectionChange), e);
        }
        addControl(t, e, n = {}) {
          this.registerControl(t, e),
            this.updateValueAndValidity({ emitEvent: n.emitEvent }),
            this._onCollectionChange();
        }
        removeControl(t, e = {}) {
          this.controls[t] && this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            this.updateValueAndValidity({ emitEvent: e.emitEvent }),
            this._onCollectionChange();
        }
        setControl(t, e, n = {}) {
          this.controls[t] && this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            e && this.registerControl(t, e),
            this.updateValueAndValidity({ emitEvent: n.emitEvent }),
            this._onCollectionChange();
        }
        contains(t) {
          return this.controls.hasOwnProperty(t) && this.controls[t].enabled;
        }
        setValue(t, e = {}) {
          this._checkAllValuesPresent(t),
            Object.keys(t).forEach((n) => {
              this._throwIfControlMissing(n), this.controls[n].setValue(t[n], { onlySelf: !0, emitEvent: e.emitEvent });
            }),
            this.updateValueAndValidity(e);
        }
        patchValue(t, e = {}) {
          null != t &&
            (Object.keys(t).forEach((n) => {
              this.controls[n] && this.controls[n].patchValue(t[n], { onlySelf: !0, emitEvent: e.emitEvent });
            }),
            this.updateValueAndValidity(e));
        }
        reset(t = {}, e = {}) {
          this._forEachChild((n, r) => {
            n.reset(t[r], { onlySelf: !0, emitEvent: e.emitEvent });
          }),
            this._updatePristine(e),
            this._updateTouched(e),
            this.updateValueAndValidity(e);
        }
        getRawValue() {
          return this._reduceChildren({}, (t, e, n) => ((t[n] = e instanceof hd ? e.value : e.getRawValue()), t));
        }
        _syncPendingControls() {
          let t = this._reduceChildren(!1, (t, e) => !!e._syncPendingControls() || t);
          return t && this.updateValueAndValidity({ onlySelf: !0 }), t;
        }
        _throwIfControlMissing(t) {
          if (!Object.keys(this.controls).length)
            throw new Error(
              "\n        There are no form controls registered with this group yet. If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      "
            );
          if (!this.controls[t]) throw new Error(`Cannot find form control with name: ${t}.`);
        }
        _forEachChild(t) {
          Object.keys(this.controls).forEach((e) => {
            const n = this.controls[e];
            n && t(n, e);
          });
        }
        _setUpControls() {
          this._forEachChild((t) => {
            t.setParent(this), t._registerOnCollectionChange(this._onCollectionChange);
          });
        }
        _updateValue() {
          this.value = this._reduceValue();
        }
        _anyControls(t) {
          for (const e of Object.keys(this.controls)) {
            const n = this.controls[e];
            if (this.contains(e) && t(n)) return !0;
          }
          return !1;
        }
        _reduceValue() {
          return this._reduceChildren({}, (t, e, n) => ((e.enabled || this.disabled) && (t[n] = e.value), t));
        }
        _reduceChildren(t, e) {
          let n = t;
          return (
            this._forEachChild((t, r) => {
              n = e(n, t, r);
            }),
            n
          );
        }
        _allControlsDisabled() {
          for (const t of Object.keys(this.controls)) if (this.controls[t].enabled) return !1;
          return Object.keys(this.controls).length > 0 || this.disabled;
        }
        _checkAllValuesPresent(t) {
          this._forEachChild((e, n) => {
            if (void 0 === t[n]) throw new Error(`Must supply a value for form control with name: '${n}'.`);
          });
        }
      }
      class pd extends ud {
        constructor(t, e, n) {
          super(id(e), ad(n, e)),
            (this.controls = t),
            this._initObservables(),
            this._setUpdateStrategy(e),
            this._setUpControls(),
            this.updateValueAndValidity({ onlySelf: !0, emitEvent: !!this.asyncValidator });
        }
        at(t) {
          return this.controls[t];
        }
        push(t, e = {}) {
          this.controls.push(t),
            this._registerControl(t),
            this.updateValueAndValidity({ emitEvent: e.emitEvent }),
            this._onCollectionChange();
        }
        insert(t, e, n = {}) {
          this.controls.splice(t, 0, e),
            this._registerControl(e),
            this.updateValueAndValidity({ emitEvent: n.emitEvent });
        }
        removeAt(t, e = {}) {
          this.controls[t] && this.controls[t]._registerOnCollectionChange(() => {}),
            this.controls.splice(t, 1),
            this.updateValueAndValidity({ emitEvent: e.emitEvent });
        }
        setControl(t, e, n = {}) {
          this.controls[t] && this.controls[t]._registerOnCollectionChange(() => {}),
            this.controls.splice(t, 1),
            e && (this.controls.splice(t, 0, e), this._registerControl(e)),
            this.updateValueAndValidity({ emitEvent: n.emitEvent }),
            this._onCollectionChange();
        }
        get length() {
          return this.controls.length;
        }
        setValue(t, e = {}) {
          this._checkAllValuesPresent(t),
            t.forEach((t, n) => {
              this._throwIfControlMissing(n), this.at(n).setValue(t, { onlySelf: !0, emitEvent: e.emitEvent });
            }),
            this.updateValueAndValidity(e);
        }
        patchValue(t, e = {}) {
          null != t &&
            (t.forEach((t, n) => {
              this.at(n) && this.at(n).patchValue(t, { onlySelf: !0, emitEvent: e.emitEvent });
            }),
            this.updateValueAndValidity(e));
        }
        reset(t = [], e = {}) {
          this._forEachChild((n, r) => {
            n.reset(t[r], { onlySelf: !0, emitEvent: e.emitEvent });
          }),
            this._updatePristine(e),
            this._updateTouched(e),
            this.updateValueAndValidity(e);
        }
        getRawValue() {
          return this.controls.map((t) => (t instanceof hd ? t.value : t.getRawValue()));
        }
        clear(t = {}) {
          this.controls.length < 1 ||
            (this._forEachChild((t) => t._registerOnCollectionChange(() => {})),
            this.controls.splice(0),
            this.updateValueAndValidity({ emitEvent: t.emitEvent }));
        }
        _syncPendingControls() {
          let t = this.controls.reduce((t, e) => !!e._syncPendingControls() || t, !1);
          return t && this.updateValueAndValidity({ onlySelf: !0 }), t;
        }
        _throwIfControlMissing(t) {
          if (!this.controls.length)
            throw new Error(
              "\n        There are no form controls registered with this array yet. If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      "
            );
          if (!this.at(t)) throw new Error(`Cannot find form control at index ${t}`);
        }
        _forEachChild(t) {
          this.controls.forEach((e, n) => {
            t(e, n);
          });
        }
        _updateValue() {
          this.value = this.controls.filter((t) => t.enabled || this.disabled).map((t) => t.value);
        }
        _anyControls(t) {
          return this.controls.some((e) => e.enabled && t(e));
        }
        _setUpControls() {
          this._forEachChild((t) => this._registerControl(t));
        }
        _checkAllValuesPresent(t) {
          this._forEachChild((e, n) => {
            if (void 0 === t[n]) throw new Error(`Must supply a value for form control at index: ${n}.`);
          });
        }
        _allControlsDisabled() {
          for (const t of this.controls) if (t.enabled) return !1;
          return this.controls.length > 0 || this.disabled;
        }
        _registerControl(t) {
          t.setParent(this), t._registerOnCollectionChange(this._onCollectionChange);
        }
      }
      let fd = (() => {
          class t {}
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??dir = Qt({
              type: t,
              selectors: [['form', 3, 'ngNoForm', '', 3, 'ngNativeValidate', '']],
              hostAttrs: ['novalidate', ''],
            })),
            t
          );
        })(),
        gd = (() => {
          class t {}
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??mod = Zt({ type: t })),
            (t.??inj = ft({})),
            t
          );
        })();
      const md = new qn('NgModelWithFormControlWarning'),
        _d = { provide: Bh, useExisting: ot(() => yd) };
      let yd = (() => {
        class t extends Bh {
          constructor(t, e) {
            super(),
              (this.validators = t),
              (this.asyncValidators = e),
              (this.submitted = !1),
              (this._onCollectionChange = () => this._updateDomValue()),
              (this.directives = []),
              (this.form = null),
              (this.ngSubmit = new kl()),
              this._setValidators(t),
              this._setAsyncValidators(e);
          }
          ngOnChanges(t) {
            this._checkFormPresent(),
              t.hasOwnProperty('form') &&
                (this._updateValidators(),
                this._updateDomValue(),
                this._updateRegistrations(),
                (this._oldForm = this.form));
          }
          ngOnDestroy() {
            this.form &&
              (Jh(this.form, this),
              this.form._onCollectionChange === this._onCollectionChange &&
                this.form._registerOnCollectionChange(() => {}));
          }
          get formDirective() {
            return this;
          }
          get control() {
            return this.form;
          }
          get path() {
            return [];
          }
          addControl(t) {
            const e = this.form.get(t.path);
            return Zh(e, t), e.updateValueAndValidity({ emitEvent: !1 }), this.directives.push(t), e;
          }
          getControl(t) {
            return this.form.get(t.path);
          }
          removeControl(t) {
            Kh(t.control || null, t, !1), td(this.directives, t);
          }
          addFormGroup(t) {
            this._setUpFormContainer(t);
          }
          removeFormGroup(t) {
            this._cleanUpFormContainer(t);
          }
          getFormGroup(t) {
            return this.form.get(t.path);
          }
          addFormArray(t) {
            this._setUpFormContainer(t);
          }
          removeFormArray(t) {
            this._cleanUpFormContainer(t);
          }
          getFormArray(t) {
            return this.form.get(t.path);
          }
          updateModel(t, e) {
            this.form.get(t.path).setValue(e);
          }
          onSubmit(t) {
            return (
              (this.submitted = !0),
              (e = this.directives),
              this.form._syncPendingControls(),
              e.forEach((t) => {
                const e = t.control;
                'submit' === e.updateOn &&
                  e._pendingChange &&
                  (t.viewToModelUpdate(e._pendingValue), (e._pendingChange = !1));
              }),
              this.ngSubmit.emit(t),
              !1
            );
            var e;
          }
          onReset() {
            this.resetForm();
          }
          resetForm(t) {
            this.form.reset(t), (this.submitted = !1);
          }
          _updateDomValue() {
            this.directives.forEach((t) => {
              const e = t.control,
                n = this.form.get(t.path);
              e !== n && (Kh(e || null, t), n instanceof hd && (Zh(n, t), (t.control = n)));
            }),
              this.form._updateTreeValidity({ emitEvent: !1 });
          }
          _setUpFormContainer(t) {
            const e = this.form.get(t.path);
            (function (t, e) {
              Yh(t, e);
            })(e, t),
              e.updateValueAndValidity({ emitEvent: !1 });
          }
          _cleanUpFormContainer(t) {
            if (this.form) {
              const e = this.form.get(t.path);
              e &&
                (function (t, e) {
                  return Jh(t, e);
                })(e, t) &&
                e.updateValueAndValidity({ emitEvent: !1 });
            }
          }
          _updateRegistrations() {
            this.form._registerOnCollectionChange(this._onCollectionChange),
              this._oldForm && this._oldForm._registerOnCollectionChange(() => {});
          }
          _updateValidators() {
            Yh(this.form, this), this._oldForm && Jh(this._oldForm, this);
          }
          _checkFormPresent() {}
        }
        return (
          (t.??fac = function (e) {
            return new (e || t)(_o(bh, 10), _o(wh, 10));
          }),
          (t.??dir = Qt({
            type: t,
            selectors: [['', 'formGroup', '']],
            hostBindings: function (t, e) {
              1 & t &&
                To('submit', function (t) {
                  return e.onSubmit(t);
                })('reset', function () {
                  return e.onReset();
                });
            },
            inputs: { form: ['formGroup', 'form'] },
            outputs: { ngSubmit: 'ngSubmit' },
            exportAs: ['ngForm'],
            features: [ma([_d]), ro, ue],
          })),
          t
        );
      })();
      const vd = { provide: $h, useExisting: ot(() => bd) };
      let bd = (() => {
        class t extends $h {
          constructor(t, e, n, r, s) {
            super(),
              (this._ngModelWarningConfig = s),
              (this._added = !1),
              (this.update = new kl()),
              (this._ngModelWarningSent = !1),
              (this._parent = t),
              this._setValidators(e),
              this._setAsyncValidators(n),
              (this.valueAccessor = (function (t, e) {
                if (!e) return null;
                let n, r, s;
                return (
                  Array.isArray(e),
                  e.forEach((t) => {
                    t.constructor === _h ? (n = t) : Object.getPrototypeOf(t.constructor) === hh ? (r = t) : (s = t);
                  }),
                  s || r || n || null
                );
              })(0, r));
          }
          set isDisabled(t) {}
          ngOnChanges(t) {
            this._added || this._setUpControl(),
              (function (t, e) {
                if (!t.hasOwnProperty('model')) return !1;
                const n = t.model;
                return !!n.isFirstChange() || !Object.is(e, n.currentValue);
              })(t, this.viewModel) &&
                ((this.viewModel = this.model), this.formDirective.updateModel(this, this.model));
          }
          ngOnDestroy() {
            this.formDirective && this.formDirective.removeControl(this);
          }
          viewToModelUpdate(t) {
            (this.viewModel = t), this.update.emit(t);
          }
          get path() {
            return (t = null == this.name ? this.name : this.name.toString()), [...this._parent.path, t];
            var t;
          }
          get formDirective() {
            return this._parent ? this._parent.formDirective : null;
          }
          _checkParentType() {}
          _setUpControl() {
            this._checkParentType(),
              (this.control = this.formDirective.addControl(this)),
              this.control.disabled && this.valueAccessor.setDisabledState && this.valueAccessor.setDisabledState(!0),
              (this._added = !0);
          }
        }
        return (
          (t.??fac = function (e) {
            return new (e || t)(_o(Bh, 13), _o(bh, 10), _o(wh, 10), _o(dh, 10), _o(md, 8));
          }),
          (t.??dir = Qt({
            type: t,
            selectors: [['', 'formControlName', '']],
            inputs: {
              isDisabled: ['disabled', 'isDisabled'],
              name: ['formControlName', 'name'],
              model: ['ngModel', 'model'],
            },
            outputs: { update: 'ngModelChange' },
            features: [ma([vd]), ro, ue],
          })),
          (t._ngModelWarningSentOnce = !1),
          t
        );
      })();
      const wd = { provide: bh, useExisting: ot(() => Cd), multi: !0 };
      let Cd = (() => {
          class t {
            constructor() {
              this._required = !1;
            }
            get required() {
              return this._required;
            }
            set required(t) {
              (this._required = null != t && !1 !== t && 'false' != `${t}`), this._onChange && this._onChange();
            }
            validate(t) {
              return this.required ? Sh(t) : null;
            }
            registerOnValidatorChange(t) {
              this._onChange = t;
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??dir = Qt({
              type: t,
              selectors: [
                ['', 'required', '', 'formControlName', '', 3, 'type', 'checkbox'],
                ['', 'required', '', 'formControl', '', 3, 'type', 'checkbox'],
                ['', 'required', '', 'ngModel', '', 3, 'type', 'checkbox'],
              ],
              hostVars: 1,
              hostBindings: function (t, e) {
                2 & t && go('required', e.required ? '' : null);
              },
              inputs: { required: 'required' },
              features: [ma([wd])],
            })),
            t
          );
        })(),
        xd = (() => {
          class t {}
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??mod = Zt({ type: t })),
            (t.??inj = ft({ imports: [[gd]] })),
            t
          );
        })(),
        Sd = (() => {
          class t {}
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??mod = Zt({ type: t })),
            (t.??inj = ft({ imports: [xd] })),
            t
          );
        })(),
        Ed = (() => {
          class t {
            static withConfig(e) {
              return { ngModule: t, providers: [{ provide: md, useValue: e.warnOnNgModelWithFormControl }] };
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??mod = Zt({ type: t })),
            (t.??inj = ft({ imports: [xd] })),
            t
          );
        })(),
        kd = (() => {
          class t {
            group(t, e = null) {
              const n = this._reduceControls(t);
              let r,
                s = null,
                i = null;
              return (
                null != e &&
                  ((function (t) {
                    return void 0 !== t.asyncValidators || void 0 !== t.validators || void 0 !== t.updateOn;
                  })(e)
                    ? ((s = null != e.validators ? e.validators : null),
                      (i = null != e.asyncValidators ? e.asyncValidators : null),
                      (r = null != e.updateOn ? e.updateOn : void 0))
                    : ((s = null != e.validator ? e.validator : null),
                      (i = null != e.asyncValidator ? e.asyncValidator : null))),
                new dd(n, { asyncValidators: i, updateOn: r, validators: s })
              );
            }
            control(t, e, n) {
              return new hd(t, e, n);
            }
            array(t, e, n) {
              const r = t.map((t) => this._createControl(t));
              return new pd(r, e, n);
            }
            _reduceControls(t) {
              const e = {};
              return (
                Object.keys(t).forEach((n) => {
                  e[n] = this._createControl(t[n]);
                }),
                e
              );
            }
            _createControl(t) {
              return t instanceof hd || t instanceof dd || t instanceof pd
                ? t
                : Array.isArray(t)
                ? this.control(t[0], t.length > 1 ? t[1] : null, t.length > 2 ? t[2] : null)
                : this.control(t);
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??prov = pt({
              factory: function () {
                return new t();
              },
              token: t,
              providedIn: Ed,
            })),
            t
          );
        })();
      function Td(...t) {
        let e = t[t.length - 1];
        return E(e) ? (t.pop(), L(t, e)) : B(t);
      }
      class Ad extends x {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const e = super._subscribe(t);
          return e && !e.closed && t.next(this._value), e;
        }
        getValue() {
          if (this.hasError) throw this.thrownError;
          if (this.closed) throw new b();
          return this._value;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      class Od extends f {
        notifyNext(t, e, n, r, s) {
          this.destination.next(e);
        }
        notifyError(t, e) {
          this.destination.error(t);
        }
        notifyComplete(t) {
          this.destination.complete();
        }
      }
      class Id extends f {
        constructor(t, e, n) {
          super(), (this.parent = t), (this.outerValue = e), (this.outerIndex = n), (this.index = 0);
        }
        _next(t) {
          this.parent.notifyNext(this.outerValue, t, this.outerIndex, this.index++, this);
        }
        _error(t) {
          this.parent.notifyError(t, this), this.unsubscribe();
        }
        _complete() {
          this.parent.notifyComplete(this), this.unsubscribe();
        }
      }
      function Rd(t, e, n, r, s = new Id(t, n, r)) {
        if (!s.closed) return e instanceof y ? e.subscribe(s) : D(e)(s);
      }
      const Pd = {};
      class Dd {
        constructor(t) {
          this.resultSelector = t;
        }
        call(t, e) {
          return e.subscribe(new Ld(t, this.resultSelector));
        }
      }
      class Ld extends Od {
        constructor(t, e) {
          super(t), (this.resultSelector = e), (this.active = 0), (this.values = []), (this.observables = []);
        }
        _next(t) {
          this.values.push(Pd), this.observables.push(t);
        }
        _complete() {
          const t = this.observables,
            e = t.length;
          if (0 === e) this.destination.complete();
          else {
            (this.active = e), (this.toRespond = e);
            for (let n = 0; n < e; n++) this.add(Rd(this, t[n], void 0, n));
          }
        }
        notifyComplete(t) {
          0 == (this.active -= 1) && this.destination.complete();
        }
        notifyNext(t, e, n) {
          const r = this.values,
            s = this.toRespond ? (r[n] === Pd ? --this.toRespond : this.toRespond) : 0;
          (r[n] = e), 0 === s && (this.resultSelector ? this._tryResultSelector(r) : this.destination.next(r.slice()));
        }
        _tryResultSelector(t) {
          let e;
          try {
            e = this.resultSelector.apply(this, t);
          } catch (n) {
            return void this.destination.error(n);
          }
          this.destination.next(e);
        }
      }
      const Md = (() => {
        function t() {
          return Error.call(this), (this.message = 'no elements in sequence'), (this.name = 'EmptyError'), this;
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
      function Nd(...t) {
        return z(1)(Td(...t));
      }
      const Vd = new y((t) => t.complete());
      function jd(t) {
        return t
          ? (function (t) {
              return new y((e) => t.schedule(() => e.complete()));
            })(t)
          : Vd;
      }
      function Fd(t) {
        return new y((e) => {
          let n;
          try {
            n = t();
          } catch (r) {
            return void e.error(r);
          }
          return (n ? M(n) : jd()).subscribe(e);
        });
      }
      function Ud(t, e) {
        return 'function' == typeof e
          ? (n) => n.pipe(Ud((n, r) => M(t(n, r)).pipe(k((t, s) => e(n, t, r, s)))))
          : (e) => e.lift(new Hd(t));
      }
      class Hd {
        constructor(t) {
          this.project = t;
        }
        call(t, e) {
          return e.subscribe(new zd(t, this.project));
        }
      }
      class zd extends V {
        constructor(t, e) {
          super(t), (this.project = e), (this.index = 0);
        }
        _next(t) {
          let e;
          const n = this.index++;
          try {
            e = this.project(t, n);
          } catch (r) {
            return void this.destination.error(r);
          }
          this._innerSub(e);
        }
        _innerSub(t) {
          const e = this.innerSubscription;
          e && e.unsubscribe();
          const n = new N(this),
            r = this.destination;
          r.add(n), (this.innerSubscription = j(t, n)), this.innerSubscription !== n && r.add(this.innerSubscription);
        }
        _complete() {
          const { innerSubscription: t } = this;
          (t && !t.closed) || super._complete(), this.unsubscribe();
        }
        _unsubscribe() {
          this.innerSubscription = void 0;
        }
        notifyComplete() {
          (this.innerSubscription = void 0), this.isStopped && super._complete();
        }
        notifyNext(t) {
          this.destination.next(t);
        }
      }
      const Bd = (() => {
        function t() {
          return (
            Error.call(this), (this.message = 'argument out of range'), (this.name = 'ArgumentOutOfRangeError'), this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
      function $d(t) {
        return (e) => (0 === t ? jd() : e.lift(new qd(t)));
      }
      class qd {
        constructor(t) {
          if (((this.total = t), this.total < 0)) throw new Bd();
        }
        call(t, e) {
          return e.subscribe(new Wd(t, this.total));
        }
      }
      class Wd extends f {
        constructor(t, e) {
          super(t), (this.total = e), (this.count = 0);
        }
        _next(t) {
          const e = this.total,
            n = ++this.count;
          n <= e && (this.destination.next(t), n === e && (this.destination.complete(), this.unsubscribe()));
        }
      }
      function Gd(t, e) {
        let n = !1;
        return (
          arguments.length >= 2 && (n = !0),
          function (r) {
            return r.lift(new Zd(t, e, n));
          }
        );
      }
      class Zd {
        constructor(t, e, n = !1) {
          (this.accumulator = t), (this.seed = e), (this.hasSeed = n);
        }
        call(t, e) {
          return e.subscribe(new Kd(t, this.accumulator, this.seed, this.hasSeed));
        }
      }
      class Kd extends f {
        constructor(t, e, n, r) {
          super(t), (this.accumulator = e), (this._seed = n), (this.hasSeed = r), (this.index = 0);
        }
        get seed() {
          return this._seed;
        }
        set seed(t) {
          (this.hasSeed = !0), (this._seed = t);
        }
        _next(t) {
          if (this.hasSeed) return this._tryNext(t);
          (this.seed = t), this.destination.next(t);
        }
        _tryNext(t) {
          const e = this.index++;
          let n;
          try {
            n = this.accumulator(this.seed, t, e);
          } catch (r) {
            this.destination.error(r);
          }
          (this.seed = n), this.destination.next(n);
        }
      }
      function Qd(t, e) {
        return function (n) {
          return n.lift(new Yd(t, e));
        };
      }
      class Yd {
        constructor(t, e) {
          (this.predicate = t), (this.thisArg = e);
        }
        call(t, e) {
          return e.subscribe(new Jd(t, this.predicate, this.thisArg));
        }
      }
      class Jd extends f {
        constructor(t, e, n) {
          super(t), (this.predicate = e), (this.thisArg = n), (this.count = 0);
        }
        _next(t) {
          let e;
          try {
            e = this.predicate.call(this.thisArg, t, this.count++);
          } catch (n) {
            return void this.destination.error(n);
          }
          e && this.destination.next(t);
        }
      }
      function Xd(t) {
        return function (e) {
          const n = new tp(t),
            r = e.lift(n);
          return (n.caught = r);
        };
      }
      class tp {
        constructor(t) {
          this.selector = t;
        }
        call(t, e) {
          return e.subscribe(new ep(t, this.selector, this.caught));
        }
      }
      class ep extends V {
        constructor(t, e, n) {
          super(t), (this.selector = e), (this.caught = n);
        }
        error(t) {
          if (!this.isStopped) {
            let n;
            try {
              n = this.selector(t, this.caught);
            } catch (e) {
              return void super.error(e);
            }
            this._unsubscribeAndRecycle();
            const r = new N(this);
            this.add(r);
            const s = j(n, r);
            s !== r && this.add(s);
          }
        }
      }
      function np(t, e) {
        return F(t, e, 1);
      }
      function rp(t) {
        return function (e) {
          return 0 === t ? jd() : e.lift(new sp(t));
        };
      }
      class sp {
        constructor(t) {
          if (((this.total = t), this.total < 0)) throw new Bd();
        }
        call(t, e) {
          return e.subscribe(new ip(t, this.total));
        }
      }
      class ip extends f {
        constructor(t, e) {
          super(t), (this.total = e), (this.ring = new Array()), (this.count = 0);
        }
        _next(t) {
          const e = this.ring,
            n = this.total,
            r = this.count++;
          e.length < n ? e.push(t) : (e[r % n] = t);
        }
        _complete() {
          const t = this.destination;
          let e = this.count;
          if (e > 0) {
            const n = this.count >= this.total ? this.total : this.count,
              r = this.ring;
            for (let s = 0; s < n; s++) {
              const s = e++ % n;
              t.next(r[s]);
            }
          }
          t.complete();
        }
      }
      function op(t = cp) {
        return (e) => e.lift(new ap(t));
      }
      class ap {
        constructor(t) {
          this.errorFactory = t;
        }
        call(t, e) {
          return e.subscribe(new lp(t, this.errorFactory));
        }
      }
      class lp extends f {
        constructor(t, e) {
          super(t), (this.errorFactory = e), (this.hasValue = !1);
        }
        _next(t) {
          (this.hasValue = !0), this.destination.next(t);
        }
        _complete() {
          if (this.hasValue) return this.destination.complete();
          {
            let e;
            try {
              e = this.errorFactory();
            } catch (t) {
              e = t;
            }
            this.destination.error(e);
          }
        }
      }
      function cp() {
        return new Md();
      }
      function up(t = null) {
        return (e) => e.lift(new hp(t));
      }
      class hp {
        constructor(t) {
          this.defaultValue = t;
        }
        call(t, e) {
          return e.subscribe(new dp(t, this.defaultValue));
        }
      }
      class dp extends f {
        constructor(t, e) {
          super(t), (this.defaultValue = e), (this.isEmpty = !0);
        }
        _next(t) {
          (this.isEmpty = !1), this.destination.next(t);
        }
        _complete() {
          this.isEmpty && this.destination.next(this.defaultValue), this.destination.complete();
        }
      }
      function pp(t, e) {
        const n = arguments.length >= 2;
        return (r) => r.pipe(t ? Qd((e, n) => t(e, n, r)) : _, $d(1), n ? up(e) : op(() => new Md()));
      }
      function fp() {}
      function gp(t, e, n) {
        return function (r) {
          return r.lift(new mp(t, e, n));
        };
      }
      class mp {
        constructor(t, e, n) {
          (this.nextOrObserver = t), (this.error = e), (this.complete = n);
        }
        call(t, e) {
          return e.subscribe(new _p(t, this.nextOrObserver, this.error, this.complete));
        }
      }
      class _p extends f {
        constructor(t, e, n, s) {
          super(t),
            (this._tapNext = fp),
            (this._tapError = fp),
            (this._tapComplete = fp),
            (this._tapError = n || fp),
            (this._tapComplete = s || fp),
            r(e)
              ? ((this._context = this), (this._tapNext = e))
              : e &&
                ((this._context = e),
                (this._tapNext = e.next || fp),
                (this._tapError = e.error || fp),
                (this._tapComplete = e.complete || fp));
        }
        _next(t) {
          try {
            this._tapNext.call(this._context, t);
          } catch (e) {
            return void this.destination.error(e);
          }
          this.destination.next(t);
        }
        _error(t) {
          try {
            this._tapError.call(this._context, t);
          } catch (t) {
            return void this.destination.error(t);
          }
          this.destination.error(t);
        }
        _complete() {
          try {
            this._tapComplete.call(this._context);
          } catch (t) {
            return void this.destination.error(t);
          }
          return this.destination.complete();
        }
      }
      function yp(t) {
        return (e) => e.lift(new vp(t));
      }
      class vp {
        constructor(t) {
          this.callback = t;
        }
        call(t, e) {
          return e.subscribe(new bp(t, this.callback));
        }
      }
      class bp extends f {
        constructor(t, e) {
          super(t), this.add(new h(e));
        }
      }
      class wp {
        constructor(t, e) {
          (this.id = t), (this.url = e);
        }
      }
      class Cp extends wp {
        constructor(t, e, n = 'imperative', r = null) {
          super(t, e), (this.navigationTrigger = n), (this.restoredState = r);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class xp extends wp {
        constructor(t, e, n) {
          super(t, e), (this.urlAfterRedirects = n);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class Sp extends wp {
        constructor(t, e, n) {
          super(t, e), (this.reason = n);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class Ep extends wp {
        constructor(t, e, n) {
          super(t, e), (this.error = n);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class kp extends wp {
        constructor(t, e, n, r) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = r);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Tp extends wp {
        constructor(t, e, n, r) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = r);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Ap extends wp {
        constructor(t, e, n, r, s) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = r), (this.shouldActivate = s);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class Op extends wp {
        constructor(t, e, n, r) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = r);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Ip extends wp {
        constructor(t, e, n, r) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = r);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Rp {
        constructor(t) {
          this.route = t;
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class Pp {
        constructor(t) {
          this.route = t;
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class Dp {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ChildActivationStart(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''}')`;
        }
      }
      class Lp {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ChildActivationEnd(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''}')`;
        }
      }
      class Mp {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ActivationStart(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''}')`;
        }
      }
      class Np {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ActivationEnd(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''}')`;
        }
      }
      class Vp {
        constructor(t, e, n) {
          (this.routerEvent = t), (this.position = e), (this.anchor = n);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      const jp = 'primary';
      class Fp {
        constructor(t) {
          this.params = t || {};
        }
        has(t) {
          return Object.prototype.hasOwnProperty.call(this.params, t);
        }
        get(t) {
          if (this.has(t)) {
            const e = this.params[t];
            return Array.isArray(e) ? e[0] : e;
          }
          return null;
        }
        getAll(t) {
          if (this.has(t)) {
            const e = this.params[t];
            return Array.isArray(e) ? e : [e];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function Up(t) {
        return new Fp(t);
      }
      function Hp(t) {
        const e = Error('NavigationCancelingError: ' + t);
        return (e.ngNavigationCancelingError = !0), e;
      }
      function zp(t, e, n) {
        const r = n.path.split('/');
        if (r.length > t.length) return null;
        if ('full' === n.pathMatch && (e.hasChildren() || r.length < t.length)) return null;
        const s = {};
        for (let i = 0; i < r.length; i++) {
          const e = r[i],
            n = t[i];
          if (e.startsWith(':')) s[e.substring(1)] = n;
          else if (e !== n.path) return null;
        }
        return { consumed: t.slice(0, r.length), posParams: s };
      }
      function Bp(t, e) {
        const n = t ? Object.keys(t) : void 0,
          r = e ? Object.keys(e) : void 0;
        if (!n || !r || n.length != r.length) return !1;
        let s;
        for (let i = 0; i < n.length; i++) if (((s = n[i]), !$p(t[s], e[s]))) return !1;
        return !0;
      }
      function $p(t, e) {
        if (Array.isArray(t) && Array.isArray(e)) {
          if (t.length !== e.length) return !1;
          const n = [...t].sort(),
            r = [...e].sort();
          return n.every((t, e) => r[e] === t);
        }
        return t === e;
      }
      function qp(t) {
        return Array.prototype.concat.apply([], t);
      }
      function Wp(t) {
        return t.length > 0 ? t[t.length - 1] : null;
      }
      function Gp(t, e) {
        for (const n in t) t.hasOwnProperty(n) && e(t[n], n);
      }
      function Zp(t) {
        return ko(t) ? t : Eo(t) ? M(Promise.resolve(t)) : Td(t);
      }
      const Kp = {
          exact: function t(e, n, r) {
            if (!sf(e.segments, n.segments)) return !1;
            if (!tf(e.segments, n.segments, r)) return !1;
            if (e.numberOfChildren !== n.numberOfChildren) return !1;
            for (const s in n.children) {
              if (!e.children[s]) return !1;
              if (!t(e.children[s], n.children[s], r)) return !1;
            }
            return !0;
          },
          subset: Jp,
        },
        Qp = {
          exact: function (t, e) {
            return Bp(t, e);
          },
          subset: function (t, e) {
            return Object.keys(e).length <= Object.keys(t).length && Object.keys(e).every((n) => $p(t[n], e[n]));
          },
          ignored: () => !0,
        };
      function Yp(t, e, n) {
        return (
          Kp[n.paths](t.root, e.root, n.matrixParams) &&
          Qp[n.queryParams](t.queryParams, e.queryParams) &&
          !('exact' === n.fragment && t.fragment !== e.fragment)
        );
      }
      function Jp(t, e, n) {
        return Xp(t, e, e.segments, n);
      }
      function Xp(t, e, n, r) {
        if (t.segments.length > n.length) {
          const s = t.segments.slice(0, n.length);
          return !!sf(s, n) && !e.hasChildren() && !!tf(s, n, r);
        }
        if (t.segments.length === n.length) {
          if (!sf(t.segments, n)) return !1;
          if (!tf(t.segments, n, r)) return !1;
          for (const n in e.children) {
            if (!t.children[n]) return !1;
            if (!Jp(t.children[n], e.children[n], r)) return !1;
          }
          return !0;
        }
        {
          const s = n.slice(0, t.segments.length),
            i = n.slice(t.segments.length);
          return (
            !!sf(t.segments, s) && !!tf(t.segments, s, r) && !!t.children.primary && Xp(t.children.primary, e, i, r)
          );
        }
      }
      function tf(t, e, n) {
        return e.every((e, r) => Qp[n](t[r].parameters, e.parameters));
      }
      class ef {
        constructor(t, e, n) {
          (this.root = t), (this.queryParams = e), (this.fragment = n);
        }
        get queryParamMap() {
          return this._queryParamMap || (this._queryParamMap = Up(this.queryParams)), this._queryParamMap;
        }
        toString() {
          return lf.serialize(this);
        }
      }
      class nf {
        constructor(t, e) {
          (this.segments = t), (this.children = e), (this.parent = null), Gp(e, (t, e) => (t.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return cf(this);
        }
      }
      class rf {
        constructor(t, e) {
          (this.path = t), (this.parameters = e);
        }
        get parameterMap() {
          return this._parameterMap || (this._parameterMap = Up(this.parameters)), this._parameterMap;
        }
        toString() {
          return mf(this);
        }
      }
      function sf(t, e) {
        return t.length === e.length && t.every((t, n) => t.path === e[n].path);
      }
      class of {}
      class af {
        parse(t) {
          const e = new wf(t);
          return new ef(e.parseRootSegment(), e.parseQueryParams(), e.parseFragment());
        }
        serialize(t) {
          var e;
          return `/${uf(t.root, !0)}${(function (t) {
            const e = Object.keys(t)
              .map((e) => {
                const n = t[e];
                return Array.isArray(n) ? n.map((t) => `${df(e)}=${df(t)}`).join('&') : `${df(e)}=${df(n)}`;
              })
              .filter((t) => !!t);
            return e.length ? `?${e.join('&')}` : '';
          })(t.queryParams)}${'string' == typeof t.fragment ? `#${((e = t.fragment), encodeURI(e))}` : ''}`;
        }
      }
      const lf = new af();
      function cf(t) {
        return t.segments.map((t) => mf(t)).join('/');
      }
      function uf(t, e) {
        if (!t.hasChildren()) return cf(t);
        if (e) {
          const e = t.children.primary ? uf(t.children.primary, !1) : '',
            n = [];
          return (
            Gp(t.children, (t, e) => {
              e !== jp && n.push(`${e}:${uf(t, !1)}`);
            }),
            n.length > 0 ? `${e}(${n.join('//')})` : e
          );
        }
        {
          const e = (function (t, e) {
            let n = [];
            return (
              Gp(t.children, (t, r) => {
                r === jp && (n = n.concat(e(t, r)));
              }),
              Gp(t.children, (t, r) => {
                r !== jp && (n = n.concat(e(t, r)));
              }),
              n
            );
          })(t, (e, n) => (n === jp ? [uf(t.children.primary, !1)] : [`${n}:${uf(e, !1)}`]));
          return 1 === Object.keys(t.children).length && null != t.children.primary
            ? `${cf(t)}/${e[0]}`
            : `${cf(t)}/(${e.join('//')})`;
        }
      }
      function hf(t) {
        return encodeURIComponent(t)
          .replace(/%40/g, '@')
          .replace(/%3A/gi, ':')
          .replace(/%24/g, '$')
          .replace(/%2C/gi, ',');
      }
      function df(t) {
        return hf(t).replace(/%3B/gi, ';');
      }
      function pf(t) {
        return hf(t).replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/%26/gi, '&');
      }
      function ff(t) {
        return decodeURIComponent(t);
      }
      function gf(t) {
        return ff(t.replace(/\+/g, '%20'));
      }
      function mf(t) {
        return `${pf(t.path)}${
          ((e = t.parameters),
          Object.keys(e)
            .map((t) => `;${pf(t)}=${pf(e[t])}`)
            .join(''))
        }`;
        var e;
      }
      const _f = /^[^\/()?;=#]+/;
      function yf(t) {
        const e = t.match(_f);
        return e ? e[0] : '';
      }
      const vf = /^[^=?&#]+/,
        bf = /^[^?&#]+/;
      class wf {
        constructor(t) {
          (this.url = t), (this.remaining = t);
        }
        parseRootSegment() {
          return (
            this.consumeOptional('/'),
            '' === this.remaining || this.peekStartsWith('?') || this.peekStartsWith('#')
              ? new nf([], {})
              : new nf([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const t = {};
          if (this.consumeOptional('?'))
            do {
              this.parseQueryParam(t);
            } while (this.consumeOptional('&'));
          return t;
        }
        parseFragment() {
          return this.consumeOptional('#') ? decodeURIComponent(this.remaining) : null;
        }
        parseChildren() {
          if ('' === this.remaining) return {};
          this.consumeOptional('/');
          const t = [];
          for (
            this.peekStartsWith('(') || t.push(this.parseSegment());
            this.peekStartsWith('/') && !this.peekStartsWith('//') && !this.peekStartsWith('/(');

          )
            this.capture('/'), t.push(this.parseSegment());
          let e = {};
          this.peekStartsWith('/(') && (this.capture('/'), (e = this.parseParens(!0)));
          let n = {};
          return (
            this.peekStartsWith('(') && (n = this.parseParens(!1)),
            (t.length > 0 || Object.keys(e).length > 0) && (n.primary = new nf(t, e)),
            n
          );
        }
        parseSegment() {
          const t = yf(this.remaining);
          if ('' === t && this.peekStartsWith(';'))
            throw new Error(`Empty path url segment cannot have parameters: '${this.remaining}'.`);
          return this.capture(t), new rf(ff(t), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const t = {};
          for (; this.consumeOptional(';'); ) this.parseParam(t);
          return t;
        }
        parseParam(t) {
          const e = yf(this.remaining);
          if (!e) return;
          this.capture(e);
          let n = '';
          if (this.consumeOptional('=')) {
            const t = yf(this.remaining);
            t && ((n = t), this.capture(n));
          }
          t[ff(e)] = ff(n);
        }
        parseQueryParam(t) {
          const e = (function (t) {
            const e = t.match(vf);
            return e ? e[0] : '';
          })(this.remaining);
          if (!e) return;
          this.capture(e);
          let n = '';
          if (this.consumeOptional('=')) {
            const t = (function (t) {
              const e = t.match(bf);
              return e ? e[0] : '';
            })(this.remaining);
            t && ((n = t), this.capture(n));
          }
          const r = gf(e),
            s = gf(n);
          if (t.hasOwnProperty(r)) {
            let e = t[r];
            Array.isArray(e) || ((e = [e]), (t[r] = e)), e.push(s);
          } else t[r] = s;
        }
        parseParens(t) {
          const e = {};
          for (this.capture('('); !this.consumeOptional(')') && this.remaining.length > 0; ) {
            const n = yf(this.remaining),
              r = this.remaining[n.length];
            if ('/' !== r && ')' !== r && ';' !== r) throw new Error(`Cannot parse url '${this.url}'`);
            let s;
            n.indexOf(':') > -1
              ? ((s = n.substr(0, n.indexOf(':'))), this.capture(s), this.capture(':'))
              : t && (s = jp);
            const i = this.parseChildren();
            (e[s] = 1 === Object.keys(i).length ? i.primary : new nf([], i)), this.consumeOptional('//');
          }
          return e;
        }
        peekStartsWith(t) {
          return this.remaining.startsWith(t);
        }
        consumeOptional(t) {
          return !!this.peekStartsWith(t) && ((this.remaining = this.remaining.substring(t.length)), !0);
        }
        capture(t) {
          if (!this.consumeOptional(t)) throw new Error(`Expected "${t}".`);
        }
      }
      class Cf {
        constructor(t) {
          this._root = t;
        }
        get root() {
          return this._root.value;
        }
        parent(t) {
          const e = this.pathFromRoot(t);
          return e.length > 1 ? e[e.length - 2] : null;
        }
        children(t) {
          const e = xf(t, this._root);
          return e ? e.children.map((t) => t.value) : [];
        }
        firstChild(t) {
          const e = xf(t, this._root);
          return e && e.children.length > 0 ? e.children[0].value : null;
        }
        siblings(t) {
          const e = Sf(t, this._root);
          return e.length < 2 ? [] : e[e.length - 2].children.map((t) => t.value).filter((e) => e !== t);
        }
        pathFromRoot(t) {
          return Sf(t, this._root).map((t) => t.value);
        }
      }
      function xf(t, e) {
        if (t === e.value) return e;
        for (const n of e.children) {
          const e = xf(t, n);
          if (e) return e;
        }
        return null;
      }
      function Sf(t, e) {
        if (t === e.value) return [e];
        for (const n of e.children) {
          const r = Sf(t, n);
          if (r.length) return r.unshift(e), r;
        }
        return [];
      }
      class Ef {
        constructor(t, e) {
          (this.value = t), (this.children = e);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function kf(t) {
        const e = {};
        return t && t.children.forEach((t) => (e[t.value.outlet] = t)), e;
      }
      class Tf extends Cf {
        constructor(t, e) {
          super(t), (this.snapshot = e), Df(this, t);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function Af(t, e) {
        const n = (function (t, e) {
            const n = new Rf([], {}, {}, '', {}, jp, e, null, t.root, -1, {});
            return new Pf('', new Ef(n, []));
          })(t, e),
          r = new Ad([new rf('', {})]),
          s = new Ad({}),
          i = new Ad({}),
          o = new Ad({}),
          a = new Ad(''),
          l = new Of(r, s, o, a, i, jp, e, n.root);
        return (l.snapshot = n.root), new Tf(new Ef(l, []), n);
      }
      class Of {
        constructor(t, e, n, r, s, i, o, a) {
          (this.url = t),
            (this.params = e),
            (this.queryParams = n),
            (this.fragment = r),
            (this.data = s),
            (this.outlet = i),
            (this.component = o),
            (this._futureSnapshot = a);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return this._paramMap || (this._paramMap = this.params.pipe(k((t) => Up(t)))), this._paramMap;
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = this.queryParams.pipe(k((t) => Up(t)))), this._queryParamMap
          );
        }
        toString() {
          return this.snapshot ? this.snapshot.toString() : `Future(${this._futureSnapshot})`;
        }
      }
      function If(t, e = 'emptyOnly') {
        const n = t.pathFromRoot;
        let r = 0;
        if ('always' !== e)
          for (r = n.length - 1; r >= 1; ) {
            const t = n[r],
              e = n[r - 1];
            if (t.routeConfig && '' === t.routeConfig.path) r--;
            else {
              if (e.component) break;
              r--;
            }
          }
        return (function (t) {
          return t.reduce(
            (t, e) => ({
              params: Object.assign(Object.assign({}, t.params), e.params),
              data: Object.assign(Object.assign({}, t.data), e.data),
              resolve: Object.assign(Object.assign({}, t.resolve), e._resolvedData),
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(n.slice(r));
      }
      class Rf {
        constructor(t, e, n, r, s, i, o, a, l, c, u) {
          (this.url = t),
            (this.params = e),
            (this.queryParams = n),
            (this.fragment = r),
            (this.data = s),
            (this.outlet = i),
            (this.component = o),
            (this.routeConfig = a),
            (this._urlSegment = l),
            (this._lastPathIndex = c),
            (this._resolve = u);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return this._paramMap || (this._paramMap = Up(this.params)), this._paramMap;
        }
        get queryParamMap() {
          return this._queryParamMap || (this._queryParamMap = Up(this.queryParams)), this._queryParamMap;
        }
        toString() {
          return `Route(url:'${this.url.map((t) => t.toString()).join('/')}', path:'${
            this.routeConfig ? this.routeConfig.path : ''
          }')`;
        }
      }
      class Pf extends Cf {
        constructor(t, e) {
          super(e), (this.url = t), Df(this, e);
        }
        toString() {
          return Lf(this._root);
        }
      }
      function Df(t, e) {
        (e.value._routerState = t), e.children.forEach((e) => Df(t, e));
      }
      function Lf(t) {
        const e = t.children.length > 0 ? ` { ${t.children.map(Lf).join(', ')} } ` : '';
        return `${t.value}${e}`;
      }
      function Mf(t) {
        if (t.snapshot) {
          const e = t.snapshot,
            n = t._futureSnapshot;
          (t.snapshot = n),
            Bp(e.queryParams, n.queryParams) || t.queryParams.next(n.queryParams),
            e.fragment !== n.fragment && t.fragment.next(n.fragment),
            Bp(e.params, n.params) || t.params.next(n.params),
            (function (t, e) {
              if (t.length !== e.length) return !1;
              for (let n = 0; n < t.length; ++n) if (!Bp(t[n], e[n])) return !1;
              return !0;
            })(e.url, n.url) || t.url.next(n.url),
            Bp(e.data, n.data) || t.data.next(n.data);
        } else (t.snapshot = t._futureSnapshot), t.data.next(t._futureSnapshot.data);
      }
      function Nf(t, e) {
        var n, r;
        return (
          Bp(t.params, e.params) &&
          sf((n = t.url), (r = e.url)) &&
          n.every((t, e) => Bp(t.parameters, r[e].parameters)) &&
          !(!t.parent != !e.parent) &&
          (!t.parent || Nf(t.parent, e.parent))
        );
      }
      function Vf(t, e, n) {
        if (n && t.shouldReuseRoute(e.value, n.value.snapshot)) {
          const r = n.value;
          r._futureSnapshot = e.value;
          const s = (function (t, e, n) {
            return e.children.map((e) => {
              for (const r of n.children) if (t.shouldReuseRoute(e.value, r.value.snapshot)) return Vf(t, e, r);
              return Vf(t, e);
            });
          })(t, e, n);
          return new Ef(r, s);
        }
        {
          if (t.shouldAttach(e.value)) {
            const n = t.retrieve(e.value);
            if (null !== n) {
              const t = n.route;
              return jf(e, t), t;
            }
          }
          const n = new Of(
              new Ad((r = e.value).url),
              new Ad(r.params),
              new Ad(r.queryParams),
              new Ad(r.fragment),
              new Ad(r.data),
              r.outlet,
              r.component,
              r
            ),
            s = e.children.map((e) => Vf(t, e));
          return new Ef(n, s);
        }
        var r;
      }
      function jf(t, e) {
        if (t.value.routeConfig !== e.value.routeConfig)
          throw new Error('Cannot reattach ActivatedRouteSnapshot created from a different route');
        if (t.children.length !== e.children.length)
          throw new Error('Cannot reattach ActivatedRouteSnapshot with a different number of children');
        e.value._futureSnapshot = t.value;
        for (let n = 0; n < t.children.length; ++n) jf(t.children[n], e.children[n]);
      }
      function Ff(t) {
        return 'object' == typeof t && null != t && !t.outlets && !t.segmentPath;
      }
      function Uf(t) {
        return 'object' == typeof t && null != t && t.outlets;
      }
      function Hf(t, e, n, r, s) {
        let i = {};
        return (
          r &&
            Gp(r, (t, e) => {
              i[e] = Array.isArray(t) ? t.map((t) => `${t}`) : `${t}`;
            }),
          new ef(n.root === t ? e : zf(n.root, t, e), i, s)
        );
      }
      function zf(t, e, n) {
        const r = {};
        return (
          Gp(t.children, (t, s) => {
            r[s] = t === e ? n : zf(t, e, n);
          }),
          new nf(t.segments, r)
        );
      }
      class Bf {
        constructor(t, e, n) {
          if (
            ((this.isAbsolute = t), (this.numberOfDoubleDots = e), (this.commands = n), t && n.length > 0 && Ff(n[0]))
          )
            throw new Error('Root segment cannot have matrix parameters');
          const r = n.find(Uf);
          if (r && r !== Wp(n)) throw new Error('{outlets:{}} has to be the last command');
        }
        toRoot() {
          return this.isAbsolute && 1 === this.commands.length && '/' == this.commands[0];
        }
      }
      class $f {
        constructor(t, e, n) {
          (this.segmentGroup = t), (this.processChildren = e), (this.index = n);
        }
      }
      function qf(t, e, n) {
        if ((t || (t = new nf([], {})), 0 === t.segments.length && t.hasChildren())) return Wf(t, e, n);
        const r = (function (t, e, n) {
            let r = 0,
              s = e;
            const i = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; s < t.segments.length; ) {
              if (r >= n.length) return i;
              const e = t.segments[s],
                o = n[r];
              if (Uf(o)) break;
              const a = `${o}`,
                l = r < n.length - 1 ? n[r + 1] : null;
              if (s > 0 && void 0 === a) break;
              if (a && l && 'object' == typeof l && void 0 === l.outlets) {
                if (!Qf(a, l, e)) return i;
                r += 2;
              } else {
                if (!Qf(a, {}, e)) return i;
                r++;
              }
              s++;
            }
            return { match: !0, pathIndex: s, commandIndex: r };
          })(t, e, n),
          s = n.slice(r.commandIndex);
        if (r.match && r.pathIndex < t.segments.length) {
          const e = new nf(t.segments.slice(0, r.pathIndex), {});
          return (e.children.primary = new nf(t.segments.slice(r.pathIndex), t.children)), Wf(e, 0, s);
        }
        return r.match && 0 === s.length
          ? new nf(t.segments, {})
          : r.match && !t.hasChildren()
          ? Gf(t, e, n)
          : r.match
          ? Wf(t, 0, s)
          : Gf(t, e, n);
      }
      function Wf(t, e, n) {
        if (0 === n.length) return new nf(t.segments, {});
        {
          const r = (function (t) {
              return Uf(t[0]) ? t[0].outlets : { [jp]: t };
            })(n),
            s = {};
          return (
            Gp(r, (n, r) => {
              'string' == typeof n && (n = [n]), null !== n && (s[r] = qf(t.children[r], e, n));
            }),
            Gp(t.children, (t, e) => {
              void 0 === r[e] && (s[e] = t);
            }),
            new nf(t.segments, s)
          );
        }
      }
      function Gf(t, e, n) {
        const r = t.segments.slice(0, e);
        let s = 0;
        for (; s < n.length; ) {
          const i = n[s];
          if (Uf(i)) {
            const t = Zf(i.outlets);
            return new nf(r, t);
          }
          if (0 === s && Ff(n[0])) {
            r.push(new rf(t.segments[e].path, Kf(n[0]))), s++;
            continue;
          }
          const o = Uf(i) ? i.outlets.primary : `${i}`,
            a = s < n.length - 1 ? n[s + 1] : null;
          o && a && Ff(a) ? (r.push(new rf(o, Kf(a))), (s += 2)) : (r.push(new rf(o, {})), s++);
        }
        return new nf(r, {});
      }
      function Zf(t) {
        const e = {};
        return (
          Gp(t, (t, n) => {
            'string' == typeof t && (t = [t]), null !== t && (e[n] = Gf(new nf([], {}), 0, t));
          }),
          e
        );
      }
      function Kf(t) {
        const e = {};
        return Gp(t, (t, n) => (e[n] = `${t}`)), e;
      }
      function Qf(t, e, n) {
        return t == n.path && Bp(e, n.parameters);
      }
      class Yf {
        constructor(t, e, n, r) {
          (this.routeReuseStrategy = t), (this.futureState = e), (this.currState = n), (this.forwardEvent = r);
        }
        activate(t) {
          const e = this.futureState._root,
            n = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(e, n, t), Mf(this.futureState.root), this.activateChildRoutes(e, n, t);
        }
        deactivateChildRoutes(t, e, n) {
          const r = kf(e);
          t.children.forEach((t) => {
            const e = t.value.outlet;
            this.deactivateRoutes(t, r[e], n), delete r[e];
          }),
            Gp(r, (t, e) => {
              this.deactivateRouteAndItsChildren(t, n);
            });
        }
        deactivateRoutes(t, e, n) {
          const r = t.value,
            s = e ? e.value : null;
          if (r === s)
            if (r.component) {
              const s = n.getContext(r.outlet);
              s && this.deactivateChildRoutes(t, e, s.children);
            } else this.deactivateChildRoutes(t, e, n);
          else s && this.deactivateRouteAndItsChildren(e, n);
        }
        deactivateRouteAndItsChildren(t, e) {
          this.routeReuseStrategy.shouldDetach(t.value.snapshot)
            ? this.detachAndStoreRouteSubtree(t, e)
            : this.deactivateRouteAndOutlet(t, e);
        }
        detachAndStoreRouteSubtree(t, e) {
          const n = e.getContext(t.value.outlet);
          if (n && n.outlet) {
            const e = n.outlet.detach(),
              r = n.children.onOutletDeactivated();
            this.routeReuseStrategy.store(t.value.snapshot, { componentRef: e, route: t, contexts: r });
          }
        }
        deactivateRouteAndOutlet(t, e) {
          const n = e.getContext(t.value.outlet),
            r = n && t.value.component ? n.children : e,
            s = kf(t);
          for (const i of Object.keys(s)) this.deactivateRouteAndItsChildren(s[i], r);
          n &&
            n.outlet &&
            (n.outlet.deactivate(),
            n.children.onOutletDeactivated(),
            (n.attachRef = null),
            (n.resolver = null),
            (n.route = null));
        }
        activateChildRoutes(t, e, n) {
          const r = kf(e);
          t.children.forEach((t) => {
            this.activateRoutes(t, r[t.value.outlet], n), this.forwardEvent(new Np(t.value.snapshot));
          }),
            t.children.length && this.forwardEvent(new Lp(t.value.snapshot));
        }
        activateRoutes(t, e, n) {
          const r = t.value,
            s = e ? e.value : null;
          if ((Mf(r), r === s))
            if (r.component) {
              const s = n.getOrCreateContext(r.outlet);
              this.activateChildRoutes(t, e, s.children);
            } else this.activateChildRoutes(t, e, n);
          else if (r.component) {
            const e = n.getOrCreateContext(r.outlet);
            if (this.routeReuseStrategy.shouldAttach(r.snapshot)) {
              const t = this.routeReuseStrategy.retrieve(r.snapshot);
              this.routeReuseStrategy.store(r.snapshot, null),
                e.children.onOutletReAttached(t.contexts),
                (e.attachRef = t.componentRef),
                (e.route = t.route.value),
                e.outlet && e.outlet.attach(t.componentRef, t.route.value),
                Jf(t.route);
            } else {
              const n = (function (t) {
                  for (let e = t.parent; e; e = e.parent) {
                    const t = e.routeConfig;
                    if (t && t._loadedConfig) return t._loadedConfig;
                    if (t && t.component) return null;
                  }
                  return null;
                })(r.snapshot),
                s = n ? n.module.componentFactoryResolver : null;
              (e.attachRef = null),
                (e.route = r),
                (e.resolver = s),
                e.outlet && e.outlet.activateWith(r, s),
                this.activateChildRoutes(t, null, e.children);
            }
          } else this.activateChildRoutes(t, null, n);
        }
      }
      function Jf(t) {
        Mf(t.value), t.children.forEach(Jf);
      }
      class Xf {
        constructor(t, e) {
          (this.routes = t), (this.module = e);
        }
      }
      function tg(t) {
        return 'function' == typeof t;
      }
      function eg(t) {
        return t instanceof ef;
      }
      const ng = Symbol('INITIAL_VALUE');
      function rg() {
        return Ud((t) =>
          (function (...t) {
            let e, n;
            return (
              E(t[t.length - 1]) && (n = t.pop()),
              'function' == typeof t[t.length - 1] && (e = t.pop()),
              1 === t.length && l(t[0]) && (t = t[0]),
              B(t, n).lift(new Dd(e))
            );
          })(
            t.map((t) =>
              t.pipe(
                $d(1),
                (function (...t) {
                  const e = t[t.length - 1];
                  return E(e) ? (t.pop(), (n) => Nd(t, n, e)) : (e) => Nd(t, e);
                })(ng)
              )
            )
          ).pipe(
            Gd((t, e) => {
              let n = !1;
              return e.reduce((t, r, s) => {
                if (t !== ng) return t;
                if ((r === ng && (n = !0), !n)) {
                  if (!1 === r) return r;
                  if (s === e.length - 1 || eg(r)) return r;
                }
                return t;
              }, t);
            }, ng),
            Qd((t) => t !== ng),
            k((t) => (eg(t) ? t : !0 === t)),
            $d(1)
          )
        );
      }
      let sg = (() => {
        class t {}
        return (
          (t.??fac = function (e) {
            return new (e || t)();
          }),
          (t.??cmp = $t({
            type: t,
            selectors: [['ng-component']],
            decls: 1,
            vars: 0,
            template: function (t, e) {
              1 & t && Co(0, 'router-outlet');
            },
            directives: function () {
              return [sm];
            },
            encapsulation: 2,
          })),
          t
        );
      })();
      function ig(t, e = '') {
        for (let n = 0; n < t.length; n++) {
          const r = t[n];
          og(r, ag(e, r));
        }
      }
      function og(t, e) {
        t.children && ig(t.children, e);
      }
      function ag(t, e) {
        return e ? (t || e.path ? (t && !e.path ? `${t}/` : !t && e.path ? e.path : `${t}/${e.path}`) : '') : t;
      }
      function lg(t) {
        const e = t.children && t.children.map(lg),
          n = e ? Object.assign(Object.assign({}, t), { children: e }) : Object.assign({}, t);
        return !n.component && (e || n.loadChildren) && n.outlet && n.outlet !== jp && (n.component = sg), n;
      }
      function cg(t) {
        return t.outlet || jp;
      }
      function ug(t, e) {
        const n = t.filter((t) => cg(t) === e);
        return n.push(...t.filter((t) => cg(t) !== e)), n;
      }
      const hg = { matched: !1, consumedSegments: [], lastChild: 0, parameters: {}, positionalParamSegments: {} };
      function dg(t, e, n) {
        var r;
        if ('' === e.path)
          return 'full' === e.pathMatch && (t.hasChildren() || n.length > 0)
            ? Object.assign({}, hg)
            : { matched: !0, consumedSegments: [], lastChild: 0, parameters: {}, positionalParamSegments: {} };
        const s = (e.matcher || zp)(n, t, e);
        if (!s) return Object.assign({}, hg);
        const i = {};
        Gp(s.posParams, (t, e) => {
          i[e] = t.path;
        });
        const o =
          s.consumed.length > 0 ? Object.assign(Object.assign({}, i), s.consumed[s.consumed.length - 1].parameters) : i;
        return {
          matched: !0,
          consumedSegments: s.consumed,
          lastChild: s.consumed.length,
          parameters: o,
          positionalParamSegments: null !== (r = s.posParams) && void 0 !== r ? r : {},
        };
      }
      function pg(t, e, n, r, s = 'corrected') {
        if (
          n.length > 0 &&
          (function (t, e, n) {
            return n.some((n) => fg(t, e, n) && cg(n) !== jp);
          })(t, n, r)
        ) {
          const s = new nf(
            e,
            (function (t, e, n, r) {
              const s = {};
              (s.primary = r), (r._sourceSegment = t), (r._segmentIndexShift = e.length);
              for (const i of n)
                if ('' === i.path && cg(i) !== jp) {
                  const n = new nf([], {});
                  (n._sourceSegment = t), (n._segmentIndexShift = e.length), (s[cg(i)] = n);
                }
              return s;
            })(t, e, r, new nf(n, t.children))
          );
          return (s._sourceSegment = t), (s._segmentIndexShift = e.length), { segmentGroup: s, slicedSegments: [] };
        }
        if (
          0 === n.length &&
          (function (t, e, n) {
            return n.some((n) => fg(t, e, n));
          })(t, n, r)
        ) {
          const i = new nf(
            t.segments,
            (function (t, e, n, r, s, i) {
              const o = {};
              for (const a of r)
                if (fg(t, n, a) && !s[cg(a)]) {
                  const n = new nf([], {});
                  (n._sourceSegment = t),
                    (n._segmentIndexShift = 'legacy' === i ? t.segments.length : e.length),
                    (o[cg(a)] = n);
                }
              return Object.assign(Object.assign({}, s), o);
            })(t, e, n, r, t.children, s)
          );
          return (i._sourceSegment = t), (i._segmentIndexShift = e.length), { segmentGroup: i, slicedSegments: n };
        }
        const i = new nf(t.segments, t.children);
        return (i._sourceSegment = t), (i._segmentIndexShift = e.length), { segmentGroup: i, slicedSegments: n };
      }
      function fg(t, e, n) {
        return (!(t.hasChildren() || e.length > 0) || 'full' !== n.pathMatch) && '' === n.path;
      }
      function gg(t, e, n, r) {
        return !!(cg(t) === r || (r !== jp && fg(e, n, t))) && ('**' === t.path || dg(e, t, n).matched);
      }
      function mg(t, e, n) {
        return 0 === e.length && !t.children[n];
      }
      class _g {
        constructor(t) {
          this.segmentGroup = t || null;
        }
      }
      class yg {
        constructor(t) {
          this.urlTree = t;
        }
      }
      function vg(t) {
        return new y((e) => e.error(new _g(t)));
      }
      function bg(t) {
        return new y((e) => e.error(new yg(t)));
      }
      function wg(t) {
        return new y((e) => e.error(new Error(`Only absolute redirects can have named outlets. redirectTo: '${t}'`)));
      }
      class Cg {
        constructor(t, e, n, r, s) {
          (this.configLoader = e),
            (this.urlSerializer = n),
            (this.urlTree = r),
            (this.config = s),
            (this.allowRedirects = !0),
            (this.ngModule = t.get(sl));
        }
        apply() {
          const t = pg(this.urlTree.root, [], [], this.config).segmentGroup,
            e = new nf(t.segments, t.children);
          return this.expandSegmentGroup(this.ngModule, this.config, e, jp)
            .pipe(k((t) => this.createUrlTree(xg(t), this.urlTree.queryParams, this.urlTree.fragment)))
            .pipe(
              Xd((t) => {
                if (t instanceof yg) return (this.allowRedirects = !1), this.match(t.urlTree);
                if (t instanceof _g) throw this.noMatchError(t);
                throw t;
              })
            );
        }
        match(t) {
          return this.expandSegmentGroup(this.ngModule, this.config, t.root, jp)
            .pipe(k((e) => this.createUrlTree(xg(e), t.queryParams, t.fragment)))
            .pipe(
              Xd((t) => {
                if (t instanceof _g) throw this.noMatchError(t);
                throw t;
              })
            );
        }
        noMatchError(t) {
          return new Error(`Cannot match any routes. URL Segment: '${t.segmentGroup}'`);
        }
        createUrlTree(t, e, n) {
          const r = t.segments.length > 0 ? new nf([], { [jp]: t }) : t;
          return new ef(r, e, n);
        }
        expandSegmentGroup(t, e, n, r) {
          return 0 === n.segments.length && n.hasChildren()
            ? this.expandChildren(t, e, n).pipe(k((t) => new nf([], t)))
            : this.expandSegment(t, n, e, n.segments, r, !0);
        }
        expandChildren(t, e, n) {
          const r = [];
          for (const s of Object.keys(n.children)) 'primary' === s ? r.unshift(s) : r.push(s);
          return M(r).pipe(
            np((r) => {
              const s = n.children[r],
                i = ug(e, r);
              return this.expandSegmentGroup(t, i, s, r).pipe(k((t) => ({ segment: t, outlet: r })));
            }),
            Gd((t, e) => ((t[e.outlet] = e.segment), t), {}),
            (function (t, e) {
              const n = arguments.length >= 2;
              return (r) => r.pipe(t ? Qd((e, n) => t(e, n, r)) : _, rp(1), n ? up(e) : op(() => new Md()));
            })()
          );
        }
        expandSegment(t, e, n, r, s, i) {
          return M(n).pipe(
            np((o) =>
              this.expandSegmentAgainstRoute(t, e, n, o, r, s, i).pipe(
                Xd((t) => {
                  if (t instanceof _g) return Td(null);
                  throw t;
                })
              )
            ),
            pp((t) => !!t),
            Xd((t, n) => {
              if (t instanceof Md || 'EmptyError' === t.name) {
                if (mg(e, r, s)) return Td(new nf([], {}));
                throw new _g(e);
              }
              throw t;
            })
          );
        }
        expandSegmentAgainstRoute(t, e, n, r, s, i, o) {
          return gg(r, e, s, i)
            ? void 0 === r.redirectTo
              ? this.matchSegmentAgainstRoute(t, e, r, s, i)
              : o && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(t, e, n, r, s, i)
              : vg(e)
            : vg(e);
        }
        expandSegmentAgainstRouteUsingRedirect(t, e, n, r, s, i) {
          return '**' === r.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, r, i)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(t, e, n, r, s, i);
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(t, e, n, r) {
          const s = this.applyRedirectCommands([], n.redirectTo, {});
          return n.redirectTo.startsWith('/')
            ? bg(s)
            : this.lineralizeSegments(n, s).pipe(
                F((n) => {
                  const s = new nf(n, {});
                  return this.expandSegment(t, s, e, n, r, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(t, e, n, r, s, i) {
          const { matched: o, consumedSegments: a, lastChild: l, positionalParamSegments: c } = dg(e, r, s);
          if (!o) return vg(e);
          const u = this.applyRedirectCommands(a, r.redirectTo, c);
          return r.redirectTo.startsWith('/')
            ? bg(u)
            : this.lineralizeSegments(r, u).pipe(F((r) => this.expandSegment(t, e, n, r.concat(s.slice(l)), i, !1)));
        }
        matchSegmentAgainstRoute(t, e, n, r, s) {
          if ('**' === n.path)
            return n.loadChildren
              ? (n._loadedConfig ? Td(n._loadedConfig) : this.configLoader.load(t.injector, n)).pipe(
                  k((t) => ((n._loadedConfig = t), new nf(r, {})))
                )
              : Td(new nf(r, {}));
          const { matched: i, consumedSegments: o, lastChild: a } = dg(e, n, r);
          if (!i) return vg(e);
          const l = r.slice(a);
          return this.getChildConfig(t, n, r).pipe(
            F((t) => {
              const r = t.module,
                i = t.routes,
                { segmentGroup: a, slicedSegments: c } = pg(e, o, l, i),
                u = new nf(a.segments, a.children);
              if (0 === c.length && u.hasChildren()) return this.expandChildren(r, i, u).pipe(k((t) => new nf(o, t)));
              if (0 === i.length && 0 === c.length) return Td(new nf(o, {}));
              const h = cg(n) === s;
              return this.expandSegment(r, u, i, c, h ? jp : s, !0).pipe(
                k((t) => new nf(o.concat(t.segments), t.children))
              );
            })
          );
        }
        getChildConfig(t, e, n) {
          return e.children
            ? Td(new Xf(e.children, t))
            : e.loadChildren
            ? void 0 !== e._loadedConfig
              ? Td(e._loadedConfig)
              : this.runCanLoadGuards(t.injector, e, n).pipe(
                  F((n) =>
                    n
                      ? this.configLoader.load(t.injector, e).pipe(k((t) => ((e._loadedConfig = t), t)))
                      : (function (t) {
                          return new y((e) =>
                            e.error(
                              Hp(
                                `Cannot load children because the guard of the route "path: '${t.path}'" returned false`
                              )
                            )
                          );
                        })(e)
                  )
                )
            : Td(new Xf([], t));
        }
        runCanLoadGuards(t, e, n) {
          const r = e.canLoad;
          return r && 0 !== r.length
            ? Td(
                r.map((r) => {
                  const s = t.get(r);
                  let i;
                  if (
                    (function (t) {
                      return t && tg(t.canLoad);
                    })(s)
                  )
                    i = s.canLoad(e, n);
                  else {
                    if (!tg(s)) throw new Error('Invalid CanLoad guard');
                    i = s(e, n);
                  }
                  return Zp(i);
                })
              ).pipe(
                rg(),
                gp((t) => {
                  if (!eg(t)) return;
                  const e = Hp(`Redirecting to "${this.urlSerializer.serialize(t)}"`);
                  throw ((e.url = t), e);
                }),
                k((t) => !0 === t)
              )
            : Td(!0);
        }
        lineralizeSegments(t, e) {
          let n = [],
            r = e.root;
          for (;;) {
            if (((n = n.concat(r.segments)), 0 === r.numberOfChildren)) return Td(n);
            if (r.numberOfChildren > 1 || !r.children.primary) return wg(t.redirectTo);
            r = r.children.primary;
          }
        }
        applyRedirectCommands(t, e, n) {
          return this.applyRedirectCreatreUrlTree(e, this.urlSerializer.parse(e), t, n);
        }
        applyRedirectCreatreUrlTree(t, e, n, r) {
          const s = this.createSegmentGroup(t, e.root, n, r);
          return new ef(s, this.createQueryParams(e.queryParams, this.urlTree.queryParams), e.fragment);
        }
        createQueryParams(t, e) {
          const n = {};
          return (
            Gp(t, (t, r) => {
              if ('string' == typeof t && t.startsWith(':')) {
                const s = t.substring(1);
                n[r] = e[s];
              } else n[r] = t;
            }),
            n
          );
        }
        createSegmentGroup(t, e, n, r) {
          const s = this.createSegments(t, e.segments, n, r);
          let i = {};
          return (
            Gp(e.children, (e, s) => {
              i[s] = this.createSegmentGroup(t, e, n, r);
            }),
            new nf(s, i)
          );
        }
        createSegments(t, e, n, r) {
          return e.map((e) => (e.path.startsWith(':') ? this.findPosParam(t, e, r) : this.findOrReturn(e, n)));
        }
        findPosParam(t, e, n) {
          const r = n[e.path.substring(1)];
          if (!r) throw new Error(`Cannot redirect to '${t}'. Cannot find '${e.path}'.`);
          return r;
        }
        findOrReturn(t, e) {
          let n = 0;
          for (const r of e) {
            if (r.path === t.path) return e.splice(n), r;
            n++;
          }
          return t;
        }
      }
      function xg(t) {
        const e = {};
        for (const n of Object.keys(t.children)) {
          const r = xg(t.children[n]);
          (r.segments.length > 0 || r.hasChildren()) && (e[n] = r);
        }
        return (function (t) {
          if (1 === t.numberOfChildren && t.children.primary) {
            const e = t.children.primary;
            return new nf(t.segments.concat(e.segments), e.children);
          }
          return t;
        })(new nf(t.segments, e));
      }
      class Sg {
        constructor(t) {
          (this.path = t), (this.route = this.path[this.path.length - 1]);
        }
      }
      class Eg {
        constructor(t, e) {
          (this.component = t), (this.route = e);
        }
      }
      function kg(t, e, n) {
        const r = t._root;
        return Ag(r, e ? e._root : null, n, [r.value]);
      }
      function Tg(t, e, n) {
        const r = (function (t) {
          if (!t) return null;
          for (let e = t.parent; e; e = e.parent) {
            const t = e.routeConfig;
            if (t && t._loadedConfig) return t._loadedConfig;
          }
          return null;
        })(e);
        return (r ? r.module.injector : n).get(t);
      }
      function Ag(t, e, n, r, s = { canDeactivateChecks: [], canActivateChecks: [] }) {
        const i = kf(e);
        return (
          t.children.forEach((t) => {
            !(function (t, e, n, r, s = { canDeactivateChecks: [], canActivateChecks: [] }) {
              const i = t.value,
                o = e ? e.value : null,
                a = n ? n.getContext(t.value.outlet) : null;
              if (o && i.routeConfig === o.routeConfig) {
                const l = (function (t, e, n) {
                  if ('function' == typeof n) return n(t, e);
                  switch (n) {
                    case 'pathParamsChange':
                      return !sf(t.url, e.url);
                    case 'pathParamsOrQueryParamsChange':
                      return !sf(t.url, e.url) || !Bp(t.queryParams, e.queryParams);
                    case 'always':
                      return !0;
                    case 'paramsOrQueryParamsChange':
                      return !Nf(t, e) || !Bp(t.queryParams, e.queryParams);
                    case 'paramsChange':
                    default:
                      return !Nf(t, e);
                  }
                })(o, i, i.routeConfig.runGuardsAndResolvers);
                l ? s.canActivateChecks.push(new Sg(r)) : ((i.data = o.data), (i._resolvedData = o._resolvedData)),
                  Ag(t, e, i.component ? (a ? a.children : null) : n, r, s),
                  l &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    s.canDeactivateChecks.push(new Eg(a.outlet.component, o));
              } else
                o && Og(e, a, s),
                  s.canActivateChecks.push(new Sg(r)),
                  Ag(t, null, i.component ? (a ? a.children : null) : n, r, s);
            })(t, i[t.value.outlet], n, r.concat([t.value]), s),
              delete i[t.value.outlet];
          }),
          Gp(i, (t, e) => Og(t, n.getContext(e), s)),
          s
        );
      }
      function Og(t, e, n) {
        const r = kf(t),
          s = t.value;
        Gp(r, (t, r) => {
          Og(t, s.component ? (e ? e.children.getContext(r) : null) : e, n);
        }),
          n.canDeactivateChecks.push(
            new Eg(s.component && e && e.outlet && e.outlet.isActivated ? e.outlet.component : null, s)
          );
      }
      class Ig {}
      function Rg(t) {
        return new y((e) => e.error(t));
      }
      class Pg {
        constructor(t, e, n, r, s, i) {
          (this.rootComponentType = t),
            (this.config = e),
            (this.urlTree = n),
            (this.url = r),
            (this.paramsInheritanceStrategy = s),
            (this.relativeLinkResolution = i);
        }
        recognize() {
          const t = pg(
              this.urlTree.root,
              [],
              [],
              this.config.filter((t) => void 0 === t.redirectTo),
              this.relativeLinkResolution
            ).segmentGroup,
            e = this.processSegmentGroup(this.config, t, jp);
          if (null === e) return null;
          const n = new Rf(
              [],
              Object.freeze({}),
              Object.freeze(Object.assign({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              {},
              jp,
              this.rootComponentType,
              null,
              this.urlTree.root,
              -1,
              {}
            ),
            r = new Ef(n, e),
            s = new Pf(this.url, r);
          return this.inheritParamsAndData(s._root), s;
        }
        inheritParamsAndData(t) {
          const e = t.value,
            n = If(e, this.paramsInheritanceStrategy);
          (e.params = Object.freeze(n.params)),
            (e.data = Object.freeze(n.data)),
            t.children.forEach((t) => this.inheritParamsAndData(t));
        }
        processSegmentGroup(t, e, n) {
          return 0 === e.segments.length && e.hasChildren()
            ? this.processChildren(t, e)
            : this.processSegment(t, e, e.segments, n);
        }
        processChildren(t, e) {
          const n = [];
          for (const s of Object.keys(e.children)) {
            const r = e.children[s],
              i = ug(t, s),
              o = this.processSegmentGroup(i, r, s);
            if (null === o) return null;
            n.push(...o);
          }
          const r = Lg(n);
          return (
            r.sort((t, e) =>
              t.value.outlet === jp ? -1 : e.value.outlet === jp ? 1 : t.value.outlet.localeCompare(e.value.outlet)
            ),
            r
          );
        }
        processSegment(t, e, n, r) {
          for (const s of t) {
            const t = this.processSegmentAgainstRoute(s, e, n, r);
            if (null !== t) return t;
          }
          return mg(e, n, r) ? [] : null;
        }
        processSegmentAgainstRoute(t, e, n, r) {
          if (t.redirectTo || !gg(t, e, n, r)) return null;
          let s,
            i = [],
            o = [];
          if ('**' === t.path) {
            const r = n.length > 0 ? Wp(n).parameters : {};
            s = new Rf(
              n,
              r,
              Object.freeze(Object.assign({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              Vg(t),
              cg(t),
              t.component,
              t,
              Mg(e),
              Ng(e) + n.length,
              jg(t)
            );
          } else {
            const r = dg(e, t, n);
            if (!r.matched) return null;
            (i = r.consumedSegments),
              (o = n.slice(r.lastChild)),
              (s = new Rf(
                i,
                r.parameters,
                Object.freeze(Object.assign({}, this.urlTree.queryParams)),
                this.urlTree.fragment,
                Vg(t),
                cg(t),
                t.component,
                t,
                Mg(e),
                Ng(e) + i.length,
                jg(t)
              ));
          }
          const a = (function (t) {
              return t.children ? t.children : t.loadChildren ? t._loadedConfig.routes : [];
            })(t),
            { segmentGroup: l, slicedSegments: c } = pg(
              e,
              i,
              o,
              a.filter((t) => void 0 === t.redirectTo),
              this.relativeLinkResolution
            );
          if (0 === c.length && l.hasChildren()) {
            const t = this.processChildren(a, l);
            return null === t ? null : [new Ef(s, t)];
          }
          if (0 === a.length && 0 === c.length) return [new Ef(s, [])];
          const u = cg(t) === r,
            h = this.processSegment(a, l, c, u ? jp : r);
          return null === h ? null : [new Ef(s, h)];
        }
      }
      function Dg(t) {
        const e = t.value.routeConfig;
        return e && '' === e.path && void 0 === e.redirectTo;
      }
      function Lg(t) {
        const e = [],
          n = new Set();
        for (const r of t) {
          if (!Dg(r)) {
            e.push(r);
            continue;
          }
          const t = e.find((t) => r.value.routeConfig === t.value.routeConfig);
          void 0 !== t ? (t.children.push(...r.children), n.add(t)) : e.push(r);
        }
        for (const r of n) {
          const t = Lg(r.children);
          e.push(new Ef(r.value, t));
        }
        return e.filter((t) => !n.has(t));
      }
      function Mg(t) {
        let e = t;
        for (; e._sourceSegment; ) e = e._sourceSegment;
        return e;
      }
      function Ng(t) {
        let e = t,
          n = e._segmentIndexShift ? e._segmentIndexShift : 0;
        for (; e._sourceSegment; ) (e = e._sourceSegment), (n += e._segmentIndexShift ? e._segmentIndexShift : 0);
        return n - 1;
      }
      function Vg(t) {
        return t.data || {};
      }
      function jg(t) {
        return t.resolve || {};
      }
      function Fg(t) {
        return Ud((e) => {
          const n = t(e);
          return n ? M(n).pipe(k(() => e)) : Td(e);
        });
      }
      class Ug {}
      class Hg extends class {
        shouldDetach(t) {
          return !1;
        }
        store(t, e) {}
        shouldAttach(t) {
          return !1;
        }
        retrieve(t) {
          return null;
        }
        shouldReuseRoute(t, e) {
          return t.routeConfig === e.routeConfig;
        }
      } {}
      const zg = new qn('ROUTES');
      class Bg {
        constructor(t, e, n, r) {
          (this.loader = t), (this.compiler = e), (this.onLoadStartListener = n), (this.onLoadEndListener = r);
        }
        load(t, e) {
          if (e._loader$) return e._loader$;
          this.onLoadStartListener && this.onLoadStartListener(e);
          const n = this.loadModuleFactory(e.loadChildren).pipe(
            k((n) => {
              this.onLoadEndListener && this.onLoadEndListener(e);
              const r = n.create(t);
              return new Xf(qp(r.injector.get(zg, void 0, Ct.Self | Ct.Optional)).map(lg), r);
            }),
            Xd((t) => {
              throw ((e._loader$ = void 0), t);
            })
          );
          return (e._loader$ = new Z(n, () => new x()).pipe(q())), e._loader$;
        }
        loadModuleFactory(t) {
          return 'string' == typeof t
            ? M(this.loader.load(t))
            : Zp(t()).pipe(F((t) => (t instanceof il ? Td(t) : M(this.compiler.compileModuleAsync(t)))));
        }
      }
      class $g {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.children = new qg()),
            (this.attachRef = null);
        }
      }
      class qg {
        constructor() {
          this.contexts = new Map();
        }
        onChildOutletCreated(t, e) {
          const n = this.getOrCreateContext(t);
          (n.outlet = e), this.contexts.set(t, n);
        }
        onChildOutletDestroyed(t) {
          const e = this.getContext(t);
          e && ((e.outlet = null), (e.attachRef = null));
        }
        onOutletDeactivated() {
          const t = this.contexts;
          return (this.contexts = new Map()), t;
        }
        onOutletReAttached(t) {
          this.contexts = t;
        }
        getOrCreateContext(t) {
          let e = this.getContext(t);
          return e || ((e = new $g()), this.contexts.set(t, e)), e;
        }
        getContext(t) {
          return this.contexts.get(t) || null;
        }
      }
      class Wg {
        shouldProcessUrl(t) {
          return !0;
        }
        extract(t) {
          return t;
        }
        merge(t, e) {
          return t;
        }
      }
      function Gg(t) {
        throw t;
      }
      function Zg(t, e, n) {
        return e.parse('/');
      }
      function Kg(t, e) {
        return Td(null);
      }
      const Qg = { paths: 'exact', fragment: 'ignored', matrixParams: 'ignored', queryParams: 'exact' },
        Yg = { paths: 'subset', fragment: 'ignored', matrixParams: 'ignored', queryParams: 'subset' };
      let Jg = (() => {
        class t {
          constructor(t, e, n, r, s, i, o, a) {
            (this.rootComponentType = t),
              (this.urlSerializer = e),
              (this.rootContexts = n),
              (this.location = r),
              (this.config = a),
              (this.lastSuccessfulNavigation = null),
              (this.currentNavigation = null),
              (this.disposed = !1),
              (this.lastLocationChangeInfo = null),
              (this.navigationId = 0),
              (this.currentPageId = 0),
              (this.isNgZoneEnabled = !1),
              (this.events = new x()),
              (this.errorHandler = Gg),
              (this.malformedUriErrorHandler = Zg),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1),
              (this.hooks = { beforePreactivation: Kg, afterPreactivation: Kg }),
              (this.urlHandlingStrategy = new Wg()),
              (this.routeReuseStrategy = new Hg()),
              (this.onSameUrlNavigation = 'ignore'),
              (this.paramsInheritanceStrategy = 'emptyOnly'),
              (this.urlUpdateStrategy = 'deferred'),
              (this.relativeLinkResolution = 'corrected'),
              (this.canceledNavigationResolution = 'replace'),
              (this.ngModule = s.get(sl)),
              (this.console = s.get(tc));
            const l = s.get(pc);
            (this.isNgZoneEnabled = l instanceof pc && pc.isInAngularZone()),
              this.resetConfig(a),
              (this.currentUrlTree = new ef(new nf([], {}), {}, null)),
              (this.rawUrlTree = this.currentUrlTree),
              (this.browserUrlTree = this.currentUrlTree),
              (this.configLoader = new Bg(
                i,
                o,
                (t) => this.triggerEvent(new Rp(t)),
                (t) => this.triggerEvent(new Pp(t))
              )),
              (this.routerState = Af(this.currentUrlTree, this.rootComponentType)),
              (this.transitions = new Ad({
                id: 0,
                targetPageId: 0,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.currentUrlTree,
                extractedUrl: this.urlHandlingStrategy.extract(this.currentUrlTree),
                urlAfterRedirects: this.urlHandlingStrategy.extract(this.currentUrlTree),
                rawUrl: this.currentUrlTree,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: 'imperative',
                restoredState: null,
                currentSnapshot: this.routerState.snapshot,
                targetSnapshot: null,
                currentRouterState: this.routerState,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
              })),
              (this.navigations = this.setupNavigations(this.transitions)),
              this.processNavigations();
          }
          get browserPageId() {
            var t;
            return null === (t = this.location.getState()) || void 0 === t ? void 0 : t.??routerPageId;
          }
          setupNavigations(t) {
            const e = this.events;
            return t.pipe(
              Qd((t) => 0 !== t.id),
              k((t) =>
                Object.assign(Object.assign({}, t), { extractedUrl: this.urlHandlingStrategy.extract(t.rawUrl) })
              ),
              Ud((t) => {
                let n = !1,
                  r = !1;
                return Td(t).pipe(
                  gp((t) => {
                    this.currentNavigation = {
                      id: t.id,
                      initialUrl: t.currentRawUrl,
                      extractedUrl: t.extractedUrl,
                      trigger: t.source,
                      extras: t.extras,
                      previousNavigation: this.lastSuccessfulNavigation
                        ? Object.assign(Object.assign({}, this.lastSuccessfulNavigation), { previousNavigation: null })
                        : null,
                    };
                  }),
                  Ud((t) => {
                    const n = this.browserUrlTree.toString(),
                      r = !this.navigated || t.extractedUrl.toString() !== n || n !== this.currentUrlTree.toString();
                    if (
                      ('reload' === this.onSameUrlNavigation || r) &&
                      this.urlHandlingStrategy.shouldProcessUrl(t.rawUrl)
                    )
                      return (
                        Xg(t.source) && (this.browserUrlTree = t.extractedUrl),
                        Td(t).pipe(
                          Ud((t) => {
                            const n = this.transitions.getValue();
                            return (
                              e.next(new Cp(t.id, this.serializeUrl(t.extractedUrl), t.source, t.restoredState)),
                              n !== this.transitions.getValue() ? Vd : Promise.resolve(t)
                            );
                          }),
                          (function (t, e, n, r) {
                            return Ud((s) =>
                              (function (t, e, n, r, s) {
                                return new Cg(t, e, n, r, s).apply();
                              })(t, e, n, s.extractedUrl, r).pipe(
                                k((t) => Object.assign(Object.assign({}, s), { urlAfterRedirects: t }))
                              )
                            );
                          })(this.ngModule.injector, this.configLoader, this.urlSerializer, this.config),
                          gp((t) => {
                            this.currentNavigation = Object.assign(Object.assign({}, this.currentNavigation), {
                              finalUrl: t.urlAfterRedirects,
                            });
                          }),
                          (function (t, e, n, r, s) {
                            return F((i) =>
                              (function (t, e, n, r, s = 'emptyOnly', i = 'legacy') {
                                try {
                                  const o = new Pg(t, e, n, r, s, i).recognize();
                                  return null === o ? Rg(new Ig()) : Td(o);
                                } catch (o) {
                                  return Rg(o);
                                }
                              })(t, e, i.urlAfterRedirects, n(i.urlAfterRedirects), r, s).pipe(
                                k((t) => Object.assign(Object.assign({}, i), { targetSnapshot: t }))
                              )
                            );
                          })(
                            this.rootComponentType,
                            this.config,
                            (t) => this.serializeUrl(t),
                            this.paramsInheritanceStrategy,
                            this.relativeLinkResolution
                          ),
                          gp((t) => {
                            'eager' === this.urlUpdateStrategy &&
                              (t.extras.skipLocationChange || this.setBrowserUrl(t.urlAfterRedirects, t),
                              (this.browserUrlTree = t.urlAfterRedirects));
                            const n = new kp(
                              t.id,
                              this.serializeUrl(t.extractedUrl),
                              this.serializeUrl(t.urlAfterRedirects),
                              t.targetSnapshot
                            );
                            e.next(n);
                          })
                        )
                      );
                    if (r && this.rawUrlTree && this.urlHandlingStrategy.shouldProcessUrl(this.rawUrlTree)) {
                      const { id: n, extractedUrl: r, source: s, restoredState: i, extras: o } = t,
                        a = new Cp(n, this.serializeUrl(r), s, i);
                      e.next(a);
                      const l = Af(r, this.rootComponentType).snapshot;
                      return Td(
                        Object.assign(Object.assign({}, t), {
                          targetSnapshot: l,
                          urlAfterRedirects: r,
                          extras: Object.assign(Object.assign({}, o), { skipLocationChange: !1, replaceUrl: !1 }),
                        })
                      );
                    }
                    return (
                      (this.rawUrlTree = t.rawUrl), (this.browserUrlTree = t.urlAfterRedirects), t.resolve(null), Vd
                    );
                  }),
                  Fg((t) => {
                    const {
                      targetSnapshot: e,
                      id: n,
                      extractedUrl: r,
                      rawUrl: s,
                      extras: { skipLocationChange: i, replaceUrl: o },
                    } = t;
                    return this.hooks.beforePreactivation(e, {
                      navigationId: n,
                      appliedUrlTree: r,
                      rawUrlTree: s,
                      skipLocationChange: !!i,
                      replaceUrl: !!o,
                    });
                  }),
                  gp((t) => {
                    const e = new Tp(
                      t.id,
                      this.serializeUrl(t.extractedUrl),
                      this.serializeUrl(t.urlAfterRedirects),
                      t.targetSnapshot
                    );
                    this.triggerEvent(e);
                  }),
                  k((t) =>
                    Object.assign(Object.assign({}, t), {
                      guards: kg(t.targetSnapshot, t.currentSnapshot, this.rootContexts),
                    })
                  ),
                  (function (t, e) {
                    return F((n) => {
                      const {
                        targetSnapshot: r,
                        currentSnapshot: s,
                        guards: { canActivateChecks: i, canDeactivateChecks: o },
                      } = n;
                      return 0 === o.length && 0 === i.length
                        ? Td(Object.assign(Object.assign({}, n), { guardsResult: !0 }))
                        : (function (t, e, n, r) {
                            return M(t).pipe(
                              F((t) =>
                                (function (t, e, n, r, s) {
                                  const i = e && e.routeConfig ? e.routeConfig.canDeactivate : null;
                                  return i && 0 !== i.length
                                    ? Td(
                                        i.map((i) => {
                                          const o = Tg(i, e, s);
                                          let a;
                                          if (
                                            (function (t) {
                                              return t && tg(t.canDeactivate);
                                            })(o)
                                          )
                                            a = Zp(o.canDeactivate(t, e, n, r));
                                          else {
                                            if (!tg(o)) throw new Error('Invalid CanDeactivate guard');
                                            a = Zp(o(t, e, n, r));
                                          }
                                          return a.pipe(pp());
                                        })
                                      ).pipe(rg())
                                    : Td(!0);
                                })(t.component, t.route, n, e, r)
                              ),
                              pp((t) => !0 !== t, !0)
                            );
                          })(o, r, s, t).pipe(
                            F((n) =>
                              n && 'boolean' == typeof n
                                ? (function (t, e, n, r) {
                                    return M(e).pipe(
                                      np((e) =>
                                        Nd(
                                          (function (t, e) {
                                            return null !== t && e && e(new Dp(t)), Td(!0);
                                          })(e.route.parent, r),
                                          (function (t, e) {
                                            return null !== t && e && e(new Mp(t)), Td(!0);
                                          })(e.route, r),
                                          (function (t, e, n) {
                                            const r = e[e.length - 1],
                                              s = e
                                                .slice(0, e.length - 1)
                                                .reverse()
                                                .map((t) =>
                                                  (function (t) {
                                                    const e = t.routeConfig ? t.routeConfig.canActivateChild : null;
                                                    return e && 0 !== e.length ? { node: t, guards: e } : null;
                                                  })(t)
                                                )
                                                .filter((t) => null !== t)
                                                .map((e) =>
                                                  Fd(() =>
                                                    Td(
                                                      e.guards.map((s) => {
                                                        const i = Tg(s, e.node, n);
                                                        let o;
                                                        if (
                                                          (function (t) {
                                                            return t && tg(t.canActivateChild);
                                                          })(i)
                                                        )
                                                          o = Zp(i.canActivateChild(r, t));
                                                        else {
                                                          if (!tg(i)) throw new Error('Invalid CanActivateChild guard');
                                                          o = Zp(i(r, t));
                                                        }
                                                        return o.pipe(pp());
                                                      })
                                                    ).pipe(rg())
                                                  )
                                                );
                                            return Td(s).pipe(rg());
                                          })(t, e.path, n),
                                          (function (t, e, n) {
                                            const r = e.routeConfig ? e.routeConfig.canActivate : null;
                                            return r && 0 !== r.length
                                              ? Td(
                                                  r.map((r) =>
                                                    Fd(() => {
                                                      const s = Tg(r, e, n);
                                                      let i;
                                                      if (
                                                        (function (t) {
                                                          return t && tg(t.canActivate);
                                                        })(s)
                                                      )
                                                        i = Zp(s.canActivate(e, t));
                                                      else {
                                                        if (!tg(s)) throw new Error('Invalid CanActivate guard');
                                                        i = Zp(s(e, t));
                                                      }
                                                      return i.pipe(pp());
                                                    })
                                                  )
                                                ).pipe(rg())
                                              : Td(!0);
                                          })(t, e.route, n)
                                        )
                                      ),
                                      pp((t) => !0 !== t, !0)
                                    );
                                  })(r, i, t, e)
                                : Td(n)
                            ),
                            k((t) => Object.assign(Object.assign({}, n), { guardsResult: t }))
                          );
                    });
                  })(this.ngModule.injector, (t) => this.triggerEvent(t)),
                  gp((t) => {
                    if (eg(t.guardsResult)) {
                      const e = Hp(`Redirecting to "${this.serializeUrl(t.guardsResult)}"`);
                      throw ((e.url = t.guardsResult), e);
                    }
                    const e = new Ap(
                      t.id,
                      this.serializeUrl(t.extractedUrl),
                      this.serializeUrl(t.urlAfterRedirects),
                      t.targetSnapshot,
                      !!t.guardsResult
                    );
                    this.triggerEvent(e);
                  }),
                  Qd((t) => !!t.guardsResult || (this.restoreHistory(t), this.cancelNavigationTransition(t, ''), !1)),
                  Fg((t) => {
                    if (t.guards.canActivateChecks.length)
                      return Td(t).pipe(
                        gp((t) => {
                          const e = new Op(
                            t.id,
                            this.serializeUrl(t.extractedUrl),
                            this.serializeUrl(t.urlAfterRedirects),
                            t.targetSnapshot
                          );
                          this.triggerEvent(e);
                        }),
                        Ud((t) => {
                          let e = !1;
                          return Td(t).pipe(
                            ((n = this.paramsInheritanceStrategy),
                            (r = this.ngModule.injector),
                            F((t) => {
                              const {
                                targetSnapshot: e,
                                guards: { canActivateChecks: s },
                              } = t;
                              if (!s.length) return Td(t);
                              let i = 0;
                              return M(s).pipe(
                                np((t) =>
                                  (function (t, e, n, r) {
                                    return (function (t, e, n, r) {
                                      const s = Object.keys(t);
                                      if (0 === s.length) return Td({});
                                      const i = {};
                                      return M(s).pipe(
                                        F((s) =>
                                          (function (t, e, n, r) {
                                            const s = Tg(t, e, r);
                                            return Zp(s.resolve ? s.resolve(e, n) : s(e, n));
                                          })(t[s], e, n, r).pipe(
                                            gp((t) => {
                                              i[s] = t;
                                            })
                                          )
                                        ),
                                        rp(1),
                                        F(() => (Object.keys(i).length === s.length ? Td(i) : Vd))
                                      );
                                    })(t._resolve, t, e, r).pipe(
                                      k(
                                        (e) => (
                                          (t._resolvedData = e),
                                          (t.data = Object.assign(Object.assign({}, t.data), If(t, n).resolve)),
                                          null
                                        )
                                      )
                                    );
                                  })(t.route, e, n, r)
                                ),
                                gp(() => i++),
                                rp(1),
                                F((e) => (i === s.length ? Td(t) : Vd))
                              );
                            })),
                            gp({
                              next: () => (e = !0),
                              complete: () => {
                                e ||
                                  (this.restoreHistory(t),
                                  this.cancelNavigationTransition(
                                    t,
                                    "At least one route resolver didn't emit any value."
                                  ));
                              },
                            })
                          );
                          var n, r;
                        }),
                        gp((t) => {
                          const e = new Ip(
                            t.id,
                            this.serializeUrl(t.extractedUrl),
                            this.serializeUrl(t.urlAfterRedirects),
                            t.targetSnapshot
                          );
                          this.triggerEvent(e);
                        })
                      );
                  }),
                  Fg((t) => {
                    const {
                      targetSnapshot: e,
                      id: n,
                      extractedUrl: r,
                      rawUrl: s,
                      extras: { skipLocationChange: i, replaceUrl: o },
                    } = t;
                    return this.hooks.afterPreactivation(e, {
                      navigationId: n,
                      appliedUrlTree: r,
                      rawUrlTree: s,
                      skipLocationChange: !!i,
                      replaceUrl: !!o,
                    });
                  }),
                  k((t) => {
                    const e = (function (t, e, n) {
                      const r = Vf(t, e._root, n ? n._root : void 0);
                      return new Tf(r, e);
                    })(this.routeReuseStrategy, t.targetSnapshot, t.currentRouterState);
                    return Object.assign(Object.assign({}, t), { targetRouterState: e });
                  }),
                  gp((t) => {
                    (this.currentUrlTree = t.urlAfterRedirects),
                      (this.rawUrlTree = this.urlHandlingStrategy.merge(t.urlAfterRedirects, t.rawUrl)),
                      (this.routerState = t.targetRouterState),
                      'deferred' === this.urlUpdateStrategy &&
                        (t.extras.skipLocationChange || this.setBrowserUrl(this.rawUrlTree, t),
                        (this.browserUrlTree = t.urlAfterRedirects));
                  }),
                  ((s = this.rootContexts),
                  (i = this.routeReuseStrategy),
                  (o = (t) => this.triggerEvent(t)),
                  k((t) => (new Yf(i, t.targetRouterState, t.currentRouterState, o).activate(s), t))),
                  gp({
                    next() {
                      n = !0;
                    },
                    complete() {
                      n = !0;
                    },
                  }),
                  yp(() => {
                    var e;
                    if (!n && !r) {
                      const e = `Navigation ID ${t.id} is not equal to the current navigation id ${this.navigationId}`;
                      'replace' === this.canceledNavigationResolution
                        ? (this.restoreHistory(t), this.cancelNavigationTransition(t, e))
                        : this.cancelNavigationTransition(t, e);
                    }
                    (null === (e = this.currentNavigation) || void 0 === e ? void 0 : e.id) === t.id &&
                      (this.currentNavigation = null);
                  }),
                  Xd((n) => {
                    if (((r = !0), (s = n) && s.ngNavigationCancelingError)) {
                      const r = eg(n.url);
                      r || ((this.navigated = !0), this.restoreHistory(t, !0));
                      const s = new Sp(t.id, this.serializeUrl(t.extractedUrl), n.message);
                      e.next(s),
                        r
                          ? setTimeout(() => {
                              const e = this.urlHandlingStrategy.merge(n.url, this.rawUrlTree),
                                r = {
                                  skipLocationChange: t.extras.skipLocationChange,
                                  replaceUrl: 'eager' === this.urlUpdateStrategy || Xg(t.source),
                                };
                              this.scheduleNavigation(e, 'imperative', null, r, {
                                resolve: t.resolve,
                                reject: t.reject,
                                promise: t.promise,
                              });
                            }, 0)
                          : t.resolve(!1);
                    } else {
                      this.restoreHistory(t, !0);
                      const r = new Ep(t.id, this.serializeUrl(t.extractedUrl), n);
                      e.next(r);
                      try {
                        t.resolve(this.errorHandler(n));
                      } catch (i) {
                        t.reject(i);
                      }
                    }
                    var s;
                    return Vd;
                  })
                );
                var s, i, o;
              })
            );
          }
          resetRootComponentType(t) {
            (this.rootComponentType = t), (this.routerState.root.component = this.rootComponentType);
          }
          getTransition() {
            const t = this.transitions.value;
            return (t.urlAfterRedirects = this.browserUrlTree), t;
          }
          setTransition(t) {
            this.transitions.next(Object.assign(Object.assign({}, this.getTransition()), t));
          }
          initialNavigation() {
            this.setUpLocationChangeListener(),
              0 === this.navigationId && this.navigateByUrl(this.location.path(!0), { replaceUrl: !0 });
          }
          setUpLocationChangeListener() {
            this.locationSubscription ||
              (this.locationSubscription = this.location.subscribe((t) => {
                const e = this.extractLocationChangeInfoFromEvent(t);
                this.shouldScheduleNavigation(this.lastLocationChangeInfo, e) &&
                  setTimeout(() => {
                    const { source: t, state: n, urlTree: r } = e,
                      s = { replaceUrl: !0 };
                    if (n) {
                      const t = Object.assign({}, n);
                      delete t.navigationId, delete t.??routerPageId, 0 !== Object.keys(t).length && (s.state = t);
                    }
                    this.scheduleNavigation(r, t, n, s);
                  }, 0),
                  (this.lastLocationChangeInfo = e);
              }));
          }
          extractLocationChangeInfoFromEvent(t) {
            var e;
            return {
              source: 'popstate' === t.type ? 'popstate' : 'hashchange',
              urlTree: this.parseUrl(t.url),
              state: (null === (e = t.state) || void 0 === e ? void 0 : e.navigationId) ? t.state : null,
              transitionId: this.getTransition().id,
            };
          }
          shouldScheduleNavigation(t, e) {
            if (!t) return !0;
            const n = e.urlTree.toString() === t.urlTree.toString();
            return !(
              e.transitionId === t.transitionId &&
              n &&
              (('hashchange' === e.source && 'popstate' === t.source) ||
                ('popstate' === e.source && 'hashchange' === t.source))
            );
          }
          get url() {
            return this.serializeUrl(this.currentUrlTree);
          }
          getCurrentNavigation() {
            return this.currentNavigation;
          }
          triggerEvent(t) {
            this.events.next(t);
          }
          resetConfig(t) {
            ig(t), (this.config = t.map(lg)), (this.navigated = !1), (this.lastSuccessfulId = -1);
          }
          ngOnDestroy() {
            this.dispose();
          }
          dispose() {
            this.transitions.complete(),
              this.locationSubscription &&
                (this.locationSubscription.unsubscribe(), (this.locationSubscription = void 0)),
              (this.disposed = !0);
          }
          createUrlTree(t, e = {}) {
            const { relativeTo: n, queryParams: r, fragment: s, queryParamsHandling: i, preserveFragment: o } = e,
              a = n || this.routerState.root,
              l = o ? this.currentUrlTree.fragment : s;
            let c = null;
            switch (i) {
              case 'merge':
                c = Object.assign(Object.assign({}, this.currentUrlTree.queryParams), r);
                break;
              case 'preserve':
                c = this.currentUrlTree.queryParams;
                break;
              default:
                c = r || null;
            }
            return (
              null !== c && (c = this.removeEmptyProps(c)),
              (function (t, e, n, r, s) {
                if (0 === n.length) return Hf(e.root, e.root, e, r, s);
                const i = (function (t) {
                  if ('string' == typeof t[0] && 1 === t.length && '/' === t[0]) return new Bf(!0, 0, t);
                  let e = 0,
                    n = !1;
                  const r = t.reduce((t, r, s) => {
                    if ('object' == typeof r && null != r) {
                      if (r.outlets) {
                        const e = {};
                        return (
                          Gp(r.outlets, (t, n) => {
                            e[n] = 'string' == typeof t ? t.split('/') : t;
                          }),
                          [...t, { outlets: e }]
                        );
                      }
                      if (r.segmentPath) return [...t, r.segmentPath];
                    }
                    return 'string' != typeof r
                      ? [...t, r]
                      : 0 === s
                      ? (r.split('/').forEach((r, s) => {
                          (0 == s && '.' === r) ||
                            (0 == s && '' === r ? (n = !0) : '..' === r ? e++ : '' != r && t.push(r));
                        }),
                        t)
                      : [...t, r];
                  }, []);
                  return new Bf(n, e, r);
                })(n);
                if (i.toRoot()) return Hf(e.root, new nf([], {}), e, r, s);
                const o = (function (t, e, n) {
                    if (t.isAbsolute) return new $f(e.root, !0, 0);
                    if (-1 === n.snapshot._lastPathIndex) {
                      const t = n.snapshot._urlSegment;
                      return new $f(t, t === e.root, 0);
                    }
                    const r = Ff(t.commands[0]) ? 0 : 1;
                    return (function (t, e, n) {
                      let r = t,
                        s = e,
                        i = n;
                      for (; i > s; ) {
                        if (((i -= s), (r = r.parent), !r)) throw new Error("Invalid number of '../'");
                        s = r.segments.length;
                      }
                      return new $f(r, !1, s - i);
                    })(n.snapshot._urlSegment, n.snapshot._lastPathIndex + r, t.numberOfDoubleDots);
                  })(i, e, t),
                  a = o.processChildren
                    ? Wf(o.segmentGroup, o.index, i.commands)
                    : qf(o.segmentGroup, o.index, i.commands);
                return Hf(o.segmentGroup, a, e, r, s);
              })(a, this.currentUrlTree, t, c, null != l ? l : null)
            );
          }
          navigateByUrl(t, e = { skipLocationChange: !1 }) {
            const n = eg(t) ? t : this.parseUrl(t),
              r = this.urlHandlingStrategy.merge(n, this.rawUrlTree);
            return this.scheduleNavigation(r, 'imperative', null, e);
          }
          navigate(t, e = { skipLocationChange: !1 }) {
            return (
              (function (t) {
                for (let e = 0; e < t.length; e++) {
                  const n = t[e];
                  if (null == n) throw new Error(`The requested path contains ${n} segment at index ${e}`);
                }
              })(t),
              this.navigateByUrl(this.createUrlTree(t, e), e)
            );
          }
          serializeUrl(t) {
            return this.urlSerializer.serialize(t);
          }
          parseUrl(t) {
            let e;
            try {
              e = this.urlSerializer.parse(t);
            } catch (n) {
              e = this.malformedUriErrorHandler(n, this.urlSerializer, t);
            }
            return e;
          }
          isActive(t, e) {
            let n;
            if (((n = !0 === e ? Object.assign({}, Qg) : !1 === e ? Object.assign({}, Yg) : e), eg(t)))
              return Yp(this.currentUrlTree, t, n);
            const r = this.parseUrl(t);
            return Yp(this.currentUrlTree, r, n);
          }
          removeEmptyProps(t) {
            return Object.keys(t).reduce((e, n) => {
              const r = t[n];
              return null != r && (e[n] = r), e;
            }, {});
          }
          processNavigations() {
            this.navigations.subscribe(
              (t) => {
                (this.navigated = !0),
                  (this.lastSuccessfulId = t.id),
                  (this.currentPageId = t.targetPageId),
                  this.events.next(
                    new xp(t.id, this.serializeUrl(t.extractedUrl), this.serializeUrl(this.currentUrlTree))
                  ),
                  (this.lastSuccessfulNavigation = this.currentNavigation),
                  t.resolve(!0);
              },
              (t) => {
                this.console.warn(`Unhandled Navigation Error: ${t}`);
              }
            );
          }
          scheduleNavigation(t, e, n, r, s) {
            var i, o;
            if (this.disposed) return Promise.resolve(!1);
            const a = this.getTransition(),
              l = Xg(e) && a && !Xg(a.source),
              c =
                (this.lastSuccessfulId === a.id || this.currentNavigation
                  ? a.rawUrl
                  : a.urlAfterRedirects
                ).toString() === t.toString();
            if (l && c) return Promise.resolve(!0);
            let u, h, d;
            s
              ? ((u = s.resolve), (h = s.reject), (d = s.promise))
              : (d = new Promise((t, e) => {
                  (u = t), (h = e);
                }));
            const p = ++this.navigationId;
            let f;
            return (
              'computed' === this.canceledNavigationResolution
                ? (0 === this.currentPageId && (n = this.location.getState()),
                  (f =
                    n && n.??routerPageId
                      ? n.??routerPageId
                      : r.replaceUrl || r.skipLocationChange
                      ? null !== (i = this.browserPageId) && void 0 !== i
                        ? i
                        : 0
                      : (null !== (o = this.browserPageId) && void 0 !== o ? o : 0) + 1))
                : (f = 0),
              this.setTransition({
                id: p,
                targetPageId: f,
                source: e,
                restoredState: n,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.rawUrlTree,
                rawUrl: t,
                extras: r,
                resolve: u,
                reject: h,
                promise: d,
                currentSnapshot: this.routerState.snapshot,
                currentRouterState: this.routerState,
              }),
              d.catch((t) => Promise.reject(t))
            );
          }
          setBrowserUrl(t, e) {
            const n = this.urlSerializer.serialize(t),
              r = Object.assign(Object.assign({}, e.extras.state), this.generateNgRouterState(e.id, e.targetPageId));
            this.location.isCurrentPathEqualTo(n) || e.extras.replaceUrl
              ? this.location.replaceState(n, '', r)
              : this.location.go(n, '', r);
          }
          restoreHistory(t, e = !1) {
            var n, r;
            if ('computed' === this.canceledNavigationResolution) {
              const e = this.currentPageId - t.targetPageId;
              ('popstate' !== t.source &&
                'eager' !== this.urlUpdateStrategy &&
                this.currentUrlTree !==
                  (null === (n = this.currentNavigation) || void 0 === n ? void 0 : n.finalUrl)) ||
              0 === e
                ? this.currentUrlTree ===
                    (null === (r = this.currentNavigation) || void 0 === r ? void 0 : r.finalUrl) &&
                  0 === e &&
                  (this.resetState(t), (this.browserUrlTree = t.currentUrlTree), this.resetUrlToCurrentUrlTree())
                : this.location.historyGo(e);
            } else
              'replace' === this.canceledNavigationResolution &&
                (e && this.resetState(t), this.resetUrlToCurrentUrlTree());
          }
          resetState(t) {
            (this.routerState = t.currentRouterState),
              (this.currentUrlTree = t.currentUrlTree),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, t.rawUrl));
          }
          resetUrlToCurrentUrlTree() {
            this.location.replaceState(
              this.urlSerializer.serialize(this.rawUrlTree),
              '',
              this.generateNgRouterState(this.lastSuccessfulId, this.currentPageId)
            );
          }
          cancelNavigationTransition(t, e) {
            const n = new Sp(t.id, this.serializeUrl(t.extractedUrl), e);
            this.triggerEvent(n), t.resolve(!1);
          }
          generateNgRouterState(t, e) {
            return 'computed' === this.canceledNavigationResolution
              ? { navigationId: t, '\u0275routerPageId': e }
              : { navigationId: t };
          }
        }
        return (
          (t.??fac = function (e) {
            return new (e || t)(cr(Gn), cr(of), cr(qg), cr(au), cr(eo), cr(Nc), cr(uc), cr(void 0));
          }),
          (t.??prov = pt({ token: t, factory: t.??fac })),
          t
        );
      })();
      function Xg(t) {
        return 'imperative' !== t;
      }
      let tm = (() => {
          class t {
            constructor(t, e, n, r, s) {
              (this.router = t),
                (this.route = e),
                (this.commands = []),
                (this.onChanges = new x()),
                null == n && r.setAttribute(s.nativeElement, 'tabindex', '0');
            }
            ngOnChanges(t) {
              this.onChanges.next(this);
            }
            set routerLink(t) {
              this.commands = null != t ? (Array.isArray(t) ? t : [t]) : [];
            }
            onClick() {
              const t = {
                skipLocationChange: nm(this.skipLocationChange),
                replaceUrl: nm(this.replaceUrl),
                state: this.state,
              };
              return this.router.navigateByUrl(this.urlTree, t), !0;
            }
            get urlTree() {
              return this.router.createUrlTree(this.commands, {
                relativeTo: void 0 !== this.relativeTo ? this.relativeTo : this.route,
                queryParams: this.queryParams,
                fragment: this.fragment,
                queryParamsHandling: this.queryParamsHandling,
                preserveFragment: nm(this.preserveFragment),
              });
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)(_o(Jg), _o(Of), zn('tabindex'), _o(ka), _o(xa));
            }),
            (t.??dir = Qt({
              type: t,
              selectors: [['', 'routerLink', '', 5, 'a', 5, 'area']],
              hostBindings: function (t, e) {
                1 & t &&
                  To('click', function () {
                    return e.onClick();
                  });
              },
              inputs: {
                routerLink: 'routerLink',
                queryParams: 'queryParams',
                fragment: 'fragment',
                queryParamsHandling: 'queryParamsHandling',
                preserveFragment: 'preserveFragment',
                skipLocationChange: 'skipLocationChange',
                replaceUrl: 'replaceUrl',
                state: 'state',
                relativeTo: 'relativeTo',
              },
              features: [ue],
            })),
            t
          );
        })(),
        em = (() => {
          class t {
            constructor(t, e, n) {
              (this.router = t),
                (this.route = e),
                (this.locationStrategy = n),
                (this.commands = []),
                (this.onChanges = new x()),
                (this.subscription = t.events.subscribe((t) => {
                  t instanceof xp && this.updateTargetUrlAndHref();
                }));
            }
            set routerLink(t) {
              this.commands = null != t ? (Array.isArray(t) ? t : [t]) : [];
            }
            ngOnChanges(t) {
              this.updateTargetUrlAndHref(), this.onChanges.next(this);
            }
            ngOnDestroy() {
              this.subscription.unsubscribe();
            }
            onClick(t, e, n, r, s) {
              if (0 !== t || e || n || r || s) return !0;
              if ('string' == typeof this.target && '_self' != this.target) return !0;
              const i = {
                skipLocationChange: nm(this.skipLocationChange),
                replaceUrl: nm(this.replaceUrl),
                state: this.state,
              };
              return this.router.navigateByUrl(this.urlTree, i), !1;
            }
            updateTargetUrlAndHref() {
              this.href = this.locationStrategy.prepareExternalUrl(this.router.serializeUrl(this.urlTree));
            }
            get urlTree() {
              return this.router.createUrlTree(this.commands, {
                relativeTo: void 0 !== this.relativeTo ? this.relativeTo : this.route,
                queryParams: this.queryParams,
                fragment: this.fragment,
                queryParamsHandling: this.queryParamsHandling,
                preserveFragment: nm(this.preserveFragment),
              });
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)(_o(Jg), _o(Of), _o(nu));
            }),
            (t.??dir = Qt({
              type: t,
              selectors: [
                ['a', 'routerLink', ''],
                ['area', 'routerLink', ''],
              ],
              hostVars: 2,
              hostBindings: function (t, e) {
                1 & t &&
                  To('click', function (t) {
                    return e.onClick(t.button, t.ctrlKey, t.shiftKey, t.altKey, t.metaKey);
                  }),
                  2 & t && (ta('href', e.href, Qr), go('target', e.target));
              },
              inputs: {
                routerLink: 'routerLink',
                target: 'target',
                queryParams: 'queryParams',
                fragment: 'fragment',
                queryParamsHandling: 'queryParamsHandling',
                preserveFragment: 'preserveFragment',
                skipLocationChange: 'skipLocationChange',
                replaceUrl: 'replaceUrl',
                state: 'state',
                relativeTo: 'relativeTo',
              },
              features: [ue],
            })),
            t
          );
        })();
      function nm(t) {
        return '' === t || !!t;
      }
      let rm = (() => {
          class t {
            constructor(t, e, n, r, s, i) {
              (this.router = t),
                (this.element = e),
                (this.renderer = n),
                (this.cdr = r),
                (this.link = s),
                (this.linkWithHref = i),
                (this.classes = []),
                (this.isActive = !1),
                (this.routerLinkActiveOptions = { exact: !1 }),
                (this.routerEventsSubscription = t.events.subscribe((t) => {
                  t instanceof xp && this.update();
                }));
            }
            ngAfterContentInit() {
              Td(this.links.changes, this.linksWithHrefs.changes, Td(null))
                .pipe(z())
                .subscribe((t) => {
                  this.update(), this.subscribeToEachLinkOnChanges();
                });
            }
            subscribeToEachLinkOnChanges() {
              var t;
              null === (t = this.linkInputChangesSubscription) || void 0 === t || t.unsubscribe();
              const e = [...this.links.toArray(), ...this.linksWithHrefs.toArray(), this.link, this.linkWithHref]
                .filter((t) => !!t)
                .map((t) => t.onChanges);
              this.linkInputChangesSubscription = M(e)
                .pipe(z())
                .subscribe((t) => {
                  this.isActive !== this.isLinkActive(this.router)(t) && this.update();
                });
            }
            set routerLinkActive(t) {
              const e = Array.isArray(t) ? t : t.split(' ');
              this.classes = e.filter((t) => !!t);
            }
            ngOnChanges(t) {
              this.update();
            }
            ngOnDestroy() {
              var t;
              this.routerEventsSubscription.unsubscribe(),
                null === (t = this.linkInputChangesSubscription) || void 0 === t || t.unsubscribe();
            }
            update() {
              this.links &&
                this.linksWithHrefs &&
                this.router.navigated &&
                Promise.resolve().then(() => {
                  const t = this.hasActiveLinks();
                  this.isActive !== t &&
                    ((this.isActive = t),
                    this.cdr.markForCheck(),
                    this.classes.forEach((e) => {
                      t
                        ? this.renderer.addClass(this.element.nativeElement, e)
                        : this.renderer.removeClass(this.element.nativeElement, e);
                    }));
                });
            }
            isLinkActive(t) {
              const e = (function (t) {
                return !!t.paths;
              })(this.routerLinkActiveOptions)
                ? this.routerLinkActiveOptions
                : this.routerLinkActiveOptions.exact || !1;
              return (n) => t.isActive(n.urlTree, e);
            }
            hasActiveLinks() {
              const t = this.isLinkActive(this.router);
              return (
                (this.link && t(this.link)) ||
                (this.linkWithHref && t(this.linkWithHref)) ||
                this.links.some(t) ||
                this.linksWithHrefs.some(t)
              );
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)(_o(Jg), _o(xa), _o(ka), _o(Ka), _o(tm, 8), _o(em, 8));
            }),
            (t.??dir = Qt({
              type: t,
              selectors: [['', 'routerLinkActive', '']],
              contentQueries: function (t, e, n) {
                if ((1 & t && (Ul(n, tm, 5), Ul(n, em, 5)), 2 & t)) {
                  let t;
                  jl((t = Hl())) && (e.links = t), jl((t = Hl())) && (e.linksWithHrefs = t);
                }
              },
              inputs: { routerLinkActiveOptions: 'routerLinkActiveOptions', routerLinkActive: 'routerLinkActive' },
              exportAs: ['routerLinkActive'],
              features: [ue],
            })),
            t
          );
        })(),
        sm = (() => {
          class t {
            constructor(t, e, n, r, s) {
              (this.parentContexts = t),
                (this.location = e),
                (this.resolver = n),
                (this.changeDetector = s),
                (this.activated = null),
                (this._activatedRoute = null),
                (this.activateEvents = new kl()),
                (this.deactivateEvents = new kl()),
                (this.name = r || jp),
                t.onChildOutletCreated(this.name, this);
            }
            ngOnDestroy() {
              this.parentContexts.onChildOutletDestroyed(this.name);
            }
            ngOnInit() {
              if (!this.activated) {
                const t = this.parentContexts.getContext(this.name);
                t &&
                  t.route &&
                  (t.attachRef ? this.attach(t.attachRef, t.route) : this.activateWith(t.route, t.resolver || null));
              }
            }
            get isActivated() {
              return !!this.activated;
            }
            get component() {
              if (!this.activated) throw new Error('Outlet is not activated');
              return this.activated.instance;
            }
            get activatedRoute() {
              if (!this.activated) throw new Error('Outlet is not activated');
              return this._activatedRoute;
            }
            get activatedRouteData() {
              return this._activatedRoute ? this._activatedRoute.snapshot.data : {};
            }
            detach() {
              if (!this.activated) throw new Error('Outlet is not activated');
              this.location.detach();
              const t = this.activated;
              return (this.activated = null), (this._activatedRoute = null), t;
            }
            attach(t, e) {
              (this.activated = t), (this._activatedRoute = e), this.location.insert(t.hostView);
            }
            deactivate() {
              if (this.activated) {
                const t = this.component;
                this.activated.destroy(),
                  (this.activated = null),
                  (this._activatedRoute = null),
                  this.deactivateEvents.emit(t);
              }
            }
            activateWith(t, e) {
              if (this.isActivated) throw new Error('Cannot activate an already activated outlet');
              this._activatedRoute = t;
              const n = (e = e || this.resolver).resolveComponentFactory(t._futureSnapshot.routeConfig.component),
                r = this.parentContexts.getOrCreateContext(this.name).children,
                s = new im(t, r, this.location.injector);
              (this.activated = this.location.createComponent(n, this.location.length, s)),
                this.changeDetector.markForCheck(),
                this.activateEvents.emit(this.activated.instance);
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)(_o(qg), _o(al), _o(va), zn('name'), _o(Ka));
            }),
            (t.??dir = Qt({
              type: t,
              selectors: [['router-outlet']],
              outputs: { activateEvents: 'activate', deactivateEvents: 'deactivate' },
              exportAs: ['outlet'],
            })),
            t
          );
        })();
      class im {
        constructor(t, e, n) {
          (this.route = t), (this.childContexts = e), (this.parent = n);
        }
        get(t, e) {
          return t === Of ? this.route : t === qg ? this.childContexts : this.parent.get(t, e);
        }
      }
      class om {}
      class am {
        preload(t, e) {
          return Td(null);
        }
      }
      let lm = (() => {
          class t {
            constructor(t, e, n, r, s) {
              (this.router = t),
                (this.injector = r),
                (this.preloadingStrategy = s),
                (this.loader = new Bg(
                  e,
                  n,
                  (e) => t.triggerEvent(new Rp(e)),
                  (e) => t.triggerEvent(new Pp(e))
                ));
            }
            setUpPreloading() {
              this.subscription = this.router.events
                .pipe(
                  Qd((t) => t instanceof xp),
                  np(() => this.preload())
                )
                .subscribe(() => {});
            }
            preload() {
              const t = this.injector.get(sl);
              return this.processRoutes(t, this.router.config);
            }
            ngOnDestroy() {
              this.subscription && this.subscription.unsubscribe();
            }
            processRoutes(t, e) {
              const n = [];
              for (const r of e)
                if (r.loadChildren && !r.canLoad && r._loadedConfig) {
                  const t = r._loadedConfig;
                  n.push(this.processRoutes(t.module, t.routes));
                } else
                  r.loadChildren && !r.canLoad
                    ? n.push(this.preloadConfig(t, r))
                    : r.children && n.push(this.processRoutes(t, r.children));
              return M(n).pipe(
                z(),
                k((t) => {})
              );
            }
            preloadConfig(t, e) {
              return this.preloadingStrategy.preload(e, () =>
                (e._loadedConfig ? Td(e._loadedConfig) : this.loader.load(t.injector, e)).pipe(
                  F((t) => ((e._loadedConfig = t), this.processRoutes(t.module, t.routes)))
                )
              );
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)(cr(Jg), cr(Nc), cr(uc), cr(eo), cr(om));
            }),
            (t.??prov = pt({ token: t, factory: t.??fac })),
            t
          );
        })(),
        cm = (() => {
          class t {
            constructor(t, e, n = {}) {
              (this.router = t),
                (this.viewportScroller = e),
                (this.options = n),
                (this.lastId = 0),
                (this.lastSource = 'imperative'),
                (this.restoredId = 0),
                (this.store = {}),
                (n.scrollPositionRestoration = n.scrollPositionRestoration || 'disabled'),
                (n.anchorScrolling = n.anchorScrolling || 'disabled');
            }
            init() {
              'disabled' !== this.options.scrollPositionRestoration &&
                this.viewportScroller.setHistoryScrollRestoration('manual'),
                (this.routerEventsSubscription = this.createScrollEvents()),
                (this.scrollEventsSubscription = this.consumeScrollEvents());
            }
            createScrollEvents() {
              return this.router.events.subscribe((t) => {
                t instanceof Cp
                  ? ((this.store[this.lastId] = this.viewportScroller.getScrollPosition()),
                    (this.lastSource = t.navigationTrigger),
                    (this.restoredId = t.restoredState ? t.restoredState.navigationId : 0))
                  : t instanceof xp &&
                    ((this.lastId = t.id),
                    this.scheduleScrollEvent(t, this.router.parseUrl(t.urlAfterRedirects).fragment));
              });
            }
            consumeScrollEvents() {
              return this.router.events.subscribe((t) => {
                t instanceof Vp &&
                  (t.position
                    ? 'top' === this.options.scrollPositionRestoration
                      ? this.viewportScroller.scrollToPosition([0, 0])
                      : 'enabled' === this.options.scrollPositionRestoration &&
                        this.viewportScroller.scrollToPosition(t.position)
                    : t.anchor && 'enabled' === this.options.anchorScrolling
                    ? this.viewportScroller.scrollToAnchor(t.anchor)
                    : 'disabled' !== this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition([0, 0]));
              });
            }
            scheduleScrollEvent(t, e) {
              this.router.triggerEvent(
                new Vp(t, 'popstate' === this.lastSource ? this.store[this.restoredId] : null, e)
              );
            }
            ngOnDestroy() {
              this.routerEventsSubscription && this.routerEventsSubscription.unsubscribe(),
                this.scrollEventsSubscription && this.scrollEventsSubscription.unsubscribe();
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)(cr(Jg), cr(xu), cr(void 0));
            }),
            (t.??prov = pt({ token: t, factory: t.??fac })),
            t
          );
        })();
      const um = new qn('ROUTER_CONFIGURATION'),
        hm = new qn('ROUTER_FORROOT_GUARD'),
        dm = [
          au,
          { provide: of, useClass: af },
          {
            provide: Jg,
            useFactory: function (t, e, n, r, s, i, o, a = {}, l, c) {
              const u = new Jg(null, t, e, n, r, s, i, qp(o));
              return (
                l && (u.urlHandlingStrategy = l),
                c && (u.routeReuseStrategy = c),
                (function (t, e) {
                  t.errorHandler && (e.errorHandler = t.errorHandler),
                    t.malformedUriErrorHandler && (e.malformedUriErrorHandler = t.malformedUriErrorHandler),
                    t.onSameUrlNavigation && (e.onSameUrlNavigation = t.onSameUrlNavigation),
                    t.paramsInheritanceStrategy && (e.paramsInheritanceStrategy = t.paramsInheritanceStrategy),
                    t.relativeLinkResolution && (e.relativeLinkResolution = t.relativeLinkResolution),
                    t.urlUpdateStrategy && (e.urlUpdateStrategy = t.urlUpdateStrategy);
                })(a, u),
                a.enableTracing &&
                  u.events.subscribe((t) => {
                    var e, n;
                    null === (e = console.group) ||
                      void 0 === e ||
                      e.call(console, `Router Event: ${t.constructor.name}`),
                      console.log(t.toString()),
                      console.log(t),
                      null === (n = console.groupEnd) || void 0 === n || n.call(console);
                  }),
                u
              );
            },
            deps: [of, qg, au, eo, Nc, uc, zg, um, [class {}, new fr()], [Ug, new fr()]],
          },
          qg,
          {
            provide: Of,
            useFactory: function (t) {
              return t.routerState.root;
            },
            deps: [Jg],
          },
          { provide: Nc, useClass: Fc },
          lm,
          am,
          class {
            preload(t, e) {
              return e().pipe(Xd(() => Td(null)));
            }
          },
          { provide: um, useValue: { enableTracing: !1 } },
        ];
      function pm() {
        return new Oc('Router', Jg);
      }
      let fm = (() => {
        class t {
          constructor(t, e) {}
          static forRoot(e, n) {
            return {
              ngModule: t,
              providers: [
                dm,
                ym(e),
                { provide: hm, useFactory: _m, deps: [[Jg, new fr(), new gr()]] },
                { provide: um, useValue: n || {} },
                { provide: nu, useFactory: mm, deps: [Gc, [new pr(su), new fr()], um] },
                { provide: cm, useFactory: gm, deps: [Jg, xu, um] },
                { provide: om, useExisting: n && n.preloadingStrategy ? n.preloadingStrategy : am },
                { provide: Oc, multi: !0, useFactory: pm },
                [
                  vm,
                  { provide: Wl, multi: !0, useFactory: bm, deps: [vm] },
                  { provide: Cm, useFactory: wm, deps: [vm] },
                  { provide: Xl, multi: !0, useExisting: Cm },
                ],
              ],
            };
          }
          static forChild(e) {
            return { ngModule: t, providers: [ym(e)] };
          }
        }
        return (
          (t.??fac = function (e) {
            return new (e || t)(cr(hm, 8), cr(Jg, 8));
          }),
          (t.??mod = Zt({ type: t })),
          (t.??inj = ft({})),
          t
        );
      })();
      function gm(t, e, n) {
        return n.scrollOffset && e.setOffset(n.scrollOffset), new cm(t, e, n);
      }
      function mm(t, e, n = {}) {
        return n.useHash ? new ou(t, e) : new iu(t, e);
      }
      function _m(t) {
        return 'guarded';
      }
      function ym(t) {
        return [
          { provide: Wn, multi: !0, useValue: t },
          { provide: zg, multi: !0, useValue: t },
        ];
      }
      let vm = (() => {
        class t {
          constructor(t) {
            (this.injector = t),
              (this.initNavigation = !1),
              (this.destroyed = !1),
              (this.resultOfPreactivationDone = new x());
          }
          appInitializer() {
            return this.injector.get(Kc, Promise.resolve(null)).then(() => {
              if (this.destroyed) return Promise.resolve(!0);
              let t = null;
              const e = new Promise((e) => (t = e)),
                n = this.injector.get(Jg),
                r = this.injector.get(um);
              return (
                'disabled' === r.initialNavigation
                  ? (n.setUpLocationChangeListener(), t(!0))
                  : 'enabled' === r.initialNavigation || 'enabledBlocking' === r.initialNavigation
                  ? ((n.hooks.afterPreactivation = () =>
                      this.initNavigation
                        ? Td(null)
                        : ((this.initNavigation = !0), t(!0), this.resultOfPreactivationDone)),
                    n.initialNavigation())
                  : t(!0),
                e
              );
            });
          }
          bootstrapListener(t) {
            const e = this.injector.get(um),
              n = this.injector.get(lm),
              r = this.injector.get(cm),
              s = this.injector.get(Jg),
              i = this.injector.get(Lc);
            t === i.components[0] &&
              (('enabledNonBlocking' !== e.initialNavigation && void 0 !== e.initialNavigation) ||
                s.initialNavigation(),
              n.setUpPreloading(),
              r.init(),
              s.resetRootComponentType(i.componentTypes[0]),
              this.resultOfPreactivationDone.next(null),
              this.resultOfPreactivationDone.complete());
          }
          ngOnDestroy() {
            this.destroyed = !0;
          }
        }
        return (
          (t.??fac = function (e) {
            return new (e || t)(cr(eo));
          }),
          (t.??prov = pt({ token: t, factory: t.??fac })),
          t
        );
      })();
      function bm(t) {
        return t.appInitializer.bind(t);
      }
      function wm(t) {
        return t.bootstrapListener.bind(t);
      }
      const Cm = new qn('Router Initializer');
      class xm {}
      class Sm {}
      class Em {
        constructor(t) {
          (this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            t
              ? (this.lazyInit =
                  'string' == typeof t
                    ? () => {
                        (this.headers = new Map()),
                          t.split('\n').forEach((t) => {
                            const e = t.indexOf(':');
                            if (e > 0) {
                              const n = t.slice(0, e),
                                r = n.toLowerCase(),
                                s = t.slice(e + 1).trim();
                              this.maybeSetNormalizedName(n, r),
                                this.headers.has(r) ? this.headers.get(r).push(s) : this.headers.set(r, [s]);
                            }
                          });
                      }
                    : () => {
                        (this.headers = new Map()),
                          Object.keys(t).forEach((e) => {
                            let n = t[e];
                            const r = e.toLowerCase();
                            'string' == typeof n && (n = [n]),
                              n.length > 0 && (this.headers.set(r, n), this.maybeSetNormalizedName(e, r));
                          });
                      })
              : (this.headers = new Map());
        }
        has(t) {
          return this.init(), this.headers.has(t.toLowerCase());
        }
        get(t) {
          this.init();
          const e = this.headers.get(t.toLowerCase());
          return e && e.length > 0 ? e[0] : null;
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values());
        }
        getAll(t) {
          return this.init(), this.headers.get(t.toLowerCase()) || null;
        }
        append(t, e) {
          return this.clone({ name: t, value: e, op: 'a' });
        }
        set(t, e) {
          return this.clone({ name: t, value: e, op: 's' });
        }
        delete(t, e) {
          return this.clone({ name: t, value: e, op: 'd' });
        }
        maybeSetNormalizedName(t, e) {
          this.normalizedNames.has(e) || this.normalizedNames.set(e, t);
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof Em ? this.copyFrom(this.lazyInit) : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate && (this.lazyUpdate.forEach((t) => this.applyUpdate(t)), (this.lazyUpdate = null)));
        }
        copyFrom(t) {
          t.init(),
            Array.from(t.headers.keys()).forEach((e) => {
              this.headers.set(e, t.headers.get(e)), this.normalizedNames.set(e, t.normalizedNames.get(e));
            });
        }
        clone(t) {
          const e = new Em();
          return (
            (e.lazyInit = this.lazyInit && this.lazyInit instanceof Em ? this.lazyInit : this),
            (e.lazyUpdate = (this.lazyUpdate || []).concat([t])),
            e
          );
        }
        applyUpdate(t) {
          const e = t.name.toLowerCase();
          switch (t.op) {
            case 'a':
            case 's':
              let n = t.value;
              if (('string' == typeof n && (n = [n]), 0 === n.length)) return;
              this.maybeSetNormalizedName(t.name, e);
              const r = ('a' === t.op ? this.headers.get(e) : void 0) || [];
              r.push(...n), this.headers.set(e, r);
              break;
            case 'd':
              const s = t.value;
              if (s) {
                let t = this.headers.get(e);
                if (!t) return;
                (t = t.filter((t) => -1 === s.indexOf(t))),
                  0 === t.length ? (this.headers.delete(e), this.normalizedNames.delete(e)) : this.headers.set(e, t);
              } else this.headers.delete(e), this.normalizedNames.delete(e);
          }
        }
        forEach(t) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach((e) => t(this.normalizedNames.get(e), this.headers.get(e)));
        }
      }
      class km {
        encodeKey(t) {
          return Om(t);
        }
        encodeValue(t) {
          return Om(t);
        }
        decodeKey(t) {
          return decodeURIComponent(t);
        }
        decodeValue(t) {
          return decodeURIComponent(t);
        }
      }
      const Tm = /%(\d[a-f0-9])/gi,
        Am = { 40: '@', '3A': ':', 24: '$', '2C': ',', '3B': ';', '2B': '+', '3D': '=', '3F': '?', '2F': '/' };
      function Om(t) {
        return encodeURIComponent(t).replace(Tm, (t, e) => {
          var n;
          return null !== (n = Am[e]) && void 0 !== n ? n : t;
        });
      }
      function Im(t) {
        return `${t}`;
      }
      class Rm {
        constructor(t = {}) {
          if (((this.updates = null), (this.cloneFrom = null), (this.encoder = t.encoder || new km()), t.fromString)) {
            if (t.fromObject) throw new Error('Cannot specify both fromString and fromObject.');
            this.map = (function (t, e) {
              const n = new Map();
              return (
                t.length > 0 &&
                  t
                    .replace(/^\?/, '')
                    .split('&')
                    .forEach((t) => {
                      const r = t.indexOf('='),
                        [s, i] =
                          -1 == r ? [e.decodeKey(t), ''] : [e.decodeKey(t.slice(0, r)), e.decodeValue(t.slice(r + 1))],
                        o = n.get(s) || [];
                      o.push(i), n.set(s, o);
                    }),
                n
              );
            })(t.fromString, this.encoder);
          } else
            t.fromObject
              ? ((this.map = new Map()),
                Object.keys(t.fromObject).forEach((e) => {
                  const n = t.fromObject[e];
                  this.map.set(e, Array.isArray(n) ? n : [n]);
                }))
              : (this.map = null);
        }
        has(t) {
          return this.init(), this.map.has(t);
        }
        get(t) {
          this.init();
          const e = this.map.get(t);
          return e ? e[0] : null;
        }
        getAll(t) {
          return this.init(), this.map.get(t) || null;
        }
        keys() {
          return this.init(), Array.from(this.map.keys());
        }
        append(t, e) {
          return this.clone({ param: t, value: e, op: 'a' });
        }
        appendAll(t) {
          const e = [];
          return (
            Object.keys(t).forEach((n) => {
              const r = t[n];
              Array.isArray(r)
                ? r.forEach((t) => {
                    e.push({ param: n, value: t, op: 'a' });
                  })
                : e.push({ param: n, value: r, op: 'a' });
            }),
            this.clone(e)
          );
        }
        set(t, e) {
          return this.clone({ param: t, value: e, op: 's' });
        }
        delete(t, e) {
          return this.clone({ param: t, value: e, op: 'd' });
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map((t) => {
                const e = this.encoder.encodeKey(t);
                return this.map
                  .get(t)
                  .map((t) => e + '=' + this.encoder.encodeValue(t))
                  .join('&');
              })
              .filter((t) => '' !== t)
              .join('&')
          );
        }
        clone(t) {
          const e = new Rm({ encoder: this.encoder });
          return (e.cloneFrom = this.cloneFrom || this), (e.updates = (this.updates || []).concat(t)), e;
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom.keys().forEach((t) => this.map.set(t, this.cloneFrom.map.get(t))),
              this.updates.forEach((t) => {
                switch (t.op) {
                  case 'a':
                  case 's':
                    const e = ('a' === t.op ? this.map.get(t.param) : void 0) || [];
                    e.push(Im(t.value)), this.map.set(t.param, e);
                    break;
                  case 'd':
                    if (void 0 === t.value) {
                      this.map.delete(t.param);
                      break;
                    }
                    {
                      let e = this.map.get(t.param) || [];
                      const n = e.indexOf(Im(t.value));
                      -1 !== n && e.splice(n, 1), e.length > 0 ? this.map.set(t.param, e) : this.map.delete(t.param);
                    }
                }
              }),
              (this.cloneFrom = this.updates = null));
        }
      }
      class Pm {
        constructor() {
          this.map = new Map();
        }
        set(t, e) {
          return this.map.set(t, e), this;
        }
        get(t) {
          return this.map.has(t) || this.map.set(t, t.defaultValue()), this.map.get(t);
        }
        delete(t) {
          return this.map.delete(t), this;
        }
        keys() {
          return this.map.keys();
        }
      }
      function Dm(t) {
        return 'undefined' != typeof ArrayBuffer && t instanceof ArrayBuffer;
      }
      function Lm(t) {
        return 'undefined' != typeof Blob && t instanceof Blob;
      }
      function Mm(t) {
        return 'undefined' != typeof FormData && t instanceof FormData;
      }
      class Nm {
        constructor(t, e, n, r) {
          let s;
          if (
            ((this.url = e),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = 'json'),
            (this.method = t.toUpperCase()),
            (function (t) {
              switch (t) {
                case 'DELETE':
                case 'GET':
                case 'HEAD':
                case 'OPTIONS':
                case 'JSONP':
                  return !1;
                default:
                  return !0;
              }
            })(this.method) || r
              ? ((this.body = void 0 !== n ? n : null), (s = r))
              : (s = n),
            s &&
              ((this.reportProgress = !!s.reportProgress),
              (this.withCredentials = !!s.withCredentials),
              s.responseType && (this.responseType = s.responseType),
              s.headers && (this.headers = s.headers),
              s.context && (this.context = s.context),
              s.params && (this.params = s.params)),
            this.headers || (this.headers = new Em()),
            this.context || (this.context = new Pm()),
            this.params)
          ) {
            const t = this.params.toString();
            if (0 === t.length) this.urlWithParams = e;
            else {
              const n = e.indexOf('?');
              this.urlWithParams = e + (-1 === n ? '?' : n < e.length - 1 ? '&' : '') + t;
            }
          } else (this.params = new Rm()), (this.urlWithParams = e);
        }
        serializeBody() {
          return null === this.body
            ? null
            : Dm(this.body) ||
              Lm(this.body) ||
              Mm(this.body) ||
              ('undefined' != typeof URLSearchParams && this.body instanceof URLSearchParams) ||
              'string' == typeof this.body
            ? this.body
            : this.body instanceof Rm
            ? this.body.toString()
            : 'object' == typeof this.body || 'boolean' == typeof this.body || Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString();
        }
        detectContentTypeHeader() {
          return null === this.body || Mm(this.body)
            ? null
            : Lm(this.body)
            ? this.body.type || null
            : Dm(this.body)
            ? null
            : 'string' == typeof this.body
            ? 'text/plain'
            : this.body instanceof Rm
            ? 'application/x-www-form-urlencoded;charset=UTF-8'
            : 'object' == typeof this.body || 'number' == typeof this.body || 'boolean' == typeof this.body
            ? 'application/json'
            : null;
        }
        clone(t = {}) {
          var e;
          const n = t.method || this.method,
            r = t.url || this.url,
            s = t.responseType || this.responseType,
            i = void 0 !== t.body ? t.body : this.body,
            o = void 0 !== t.withCredentials ? t.withCredentials : this.withCredentials,
            a = void 0 !== t.reportProgress ? t.reportProgress : this.reportProgress;
          let l = t.headers || this.headers,
            c = t.params || this.params;
          const u = null !== (e = t.context) && void 0 !== e ? e : this.context;
          return (
            void 0 !== t.setHeaders && (l = Object.keys(t.setHeaders).reduce((e, n) => e.set(n, t.setHeaders[n]), l)),
            t.setParams && (c = Object.keys(t.setParams).reduce((e, n) => e.set(n, t.setParams[n]), c)),
            new Nm(n, r, i, {
              params: c,
              headers: l,
              context: u,
              reportProgress: a,
              responseType: s,
              withCredentials: o,
            })
          );
        }
      }
      var Vm = (() => (
        ((Vm = Vm || {})[(Vm.Sent = 0)] = 'Sent'),
        (Vm[(Vm.UploadProgress = 1)] = 'UploadProgress'),
        (Vm[(Vm.ResponseHeader = 2)] = 'ResponseHeader'),
        (Vm[(Vm.DownloadProgress = 3)] = 'DownloadProgress'),
        (Vm[(Vm.Response = 4)] = 'Response'),
        (Vm[(Vm.User = 5)] = 'User'),
        Vm
      ))();
      class jm {
        constructor(t, e = 200, n = 'OK') {
          (this.headers = t.headers || new Em()),
            (this.status = void 0 !== t.status ? t.status : e),
            (this.statusText = t.statusText || n),
            (this.url = t.url || null),
            (this.ok = this.status >= 200 && this.status < 300);
        }
      }
      class Fm extends jm {
        constructor(t = {}) {
          super(t), (this.type = Vm.ResponseHeader);
        }
        clone(t = {}) {
          return new Fm({
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class Um extends jm {
        constructor(t = {}) {
          super(t), (this.type = Vm.Response), (this.body = void 0 !== t.body ? t.body : null);
        }
        clone(t = {}) {
          return new Um({
            body: void 0 !== t.body ? t.body : this.body,
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class Hm extends jm {
        constructor(t) {
          super(t, 0, 'Unknown Error'),
            (this.name = 'HttpErrorResponse'),
            (this.ok = !1),
            (this.message =
              this.status >= 200 && this.status < 300
                ? `Http failure during parsing for ${t.url || '(unknown url)'}`
                : `Http failure response for ${t.url || '(unknown url)'}: ${t.status} ${t.statusText}`),
            (this.error = t.error || null);
        }
      }
      function zm(t, e) {
        return {
          body: e,
          headers: t.headers,
          context: t.context,
          observe: t.observe,
          params: t.params,
          reportProgress: t.reportProgress,
          responseType: t.responseType,
          withCredentials: t.withCredentials,
        };
      }
      let Bm = (() => {
        class t {
          constructor(t) {
            this.handler = t;
          }
          request(t, e, n = {}) {
            let r;
            if (t instanceof Nm) r = t;
            else {
              let s, i;
              (s = n.headers instanceof Em ? n.headers : new Em(n.headers)),
                n.params && (i = n.params instanceof Rm ? n.params : new Rm({ fromObject: n.params })),
                (r = new Nm(t, e, void 0 !== n.body ? n.body : null, {
                  headers: s,
                  context: n.context,
                  params: i,
                  reportProgress: n.reportProgress,
                  responseType: n.responseType || 'json',
                  withCredentials: n.withCredentials,
                }));
            }
            const s = Td(r).pipe(np((t) => this.handler.handle(t)));
            if (t instanceof Nm || 'events' === n.observe) return s;
            const i = s.pipe(Qd((t) => t instanceof Um));
            switch (n.observe || 'body') {
              case 'body':
                switch (r.responseType) {
                  case 'arraybuffer':
                    return i.pipe(
                      k((t) => {
                        if (null !== t.body && !(t.body instanceof ArrayBuffer))
                          throw new Error('Response is not an ArrayBuffer.');
                        return t.body;
                      })
                    );
                  case 'blob':
                    return i.pipe(
                      k((t) => {
                        if (null !== t.body && !(t.body instanceof Blob)) throw new Error('Response is not a Blob.');
                        return t.body;
                      })
                    );
                  case 'text':
                    return i.pipe(
                      k((t) => {
                        if (null !== t.body && 'string' != typeof t.body) throw new Error('Response is not a string.');
                        return t.body;
                      })
                    );
                  case 'json':
                  default:
                    return i.pipe(k((t) => t.body));
                }
              case 'response':
                return i;
              default:
                throw new Error(`Unreachable: unhandled observe type ${n.observe}}`);
            }
          }
          delete(t, e = {}) {
            return this.request('DELETE', t, e);
          }
          get(t, e = {}) {
            return this.request('GET', t, e);
          }
          head(t, e = {}) {
            return this.request('HEAD', t, e);
          }
          jsonp(t, e) {
            return this.request('JSONP', t, {
              params: new Rm().append(e, 'JSONP_CALLBACK'),
              observe: 'body',
              responseType: 'json',
            });
          }
          options(t, e = {}) {
            return this.request('OPTIONS', t, e);
          }
          patch(t, e, n = {}) {
            return this.request('PATCH', t, zm(n, e));
          }
          post(t, e, n = {}) {
            return this.request('POST', t, zm(n, e));
          }
          put(t, e, n = {}) {
            return this.request('PUT', t, zm(n, e));
          }
        }
        return (
          (t.??fac = function (e) {
            return new (e || t)(cr(xm));
          }),
          (t.??prov = pt({ token: t, factory: t.??fac })),
          t
        );
      })();
      class $m {
        constructor(t, e) {
          (this.next = t), (this.interceptor = e);
        }
        handle(t) {
          return this.interceptor.intercept(t, this.next);
        }
      }
      const qm = new qn('HTTP_INTERCEPTORS');
      let Wm = (() => {
        class t {
          intercept(t, e) {
            return e.handle(t);
          }
        }
        return (
          (t.??fac = function (e) {
            return new (e || t)();
          }),
          (t.??prov = pt({ token: t, factory: t.??fac })),
          t
        );
      })();
      const Gm = /^\)\]\}',?\n/;
      let Zm = (() => {
        class t {
          constructor(t) {
            this.xhrFactory = t;
          }
          handle(t) {
            if ('JSONP' === t.method)
              throw new Error('Attempted to construct Jsonp request without HttpClientJsonpModule installed.');
            return new y((e) => {
              const n = this.xhrFactory.build();
              if (
                (n.open(t.method, t.urlWithParams),
                t.withCredentials && (n.withCredentials = !0),
                t.headers.forEach((t, e) => n.setRequestHeader(t, e.join(','))),
                t.headers.has('Accept') || n.setRequestHeader('Accept', 'application/json, text/plain, */*'),
                !t.headers.has('Content-Type'))
              ) {
                const e = t.detectContentTypeHeader();
                null !== e && n.setRequestHeader('Content-Type', e);
              }
              if (t.responseType) {
                const e = t.responseType.toLowerCase();
                n.responseType = 'json' !== e ? e : 'text';
              }
              const r = t.serializeBody();
              let s = null;
              const i = () => {
                  if (null !== s) return s;
                  const e = 1223 === n.status ? 204 : n.status,
                    r = n.statusText || 'OK',
                    i = new Em(n.getAllResponseHeaders()),
                    o =
                      (function (t) {
                        return 'responseURL' in t && t.responseURL
                          ? t.responseURL
                          : /^X-Request-URL:/m.test(t.getAllResponseHeaders())
                          ? t.getResponseHeader('X-Request-URL')
                          : null;
                      })(n) || t.url;
                  return (s = new Fm({ headers: i, status: e, statusText: r, url: o })), s;
                },
                o = () => {
                  let { headers: r, status: s, statusText: o, url: a } = i(),
                    l = null;
                  204 !== s && (l = void 0 === n.response ? n.responseText : n.response), 0 === s && (s = l ? 200 : 0);
                  let c = s >= 200 && s < 300;
                  if ('json' === t.responseType && 'string' == typeof l) {
                    const t = l;
                    l = l.replace(Gm, '');
                    try {
                      l = '' !== l ? JSON.parse(l) : null;
                    } catch (u) {
                      (l = t), c && ((c = !1), (l = { error: u, text: l }));
                    }
                  }
                  c
                    ? (e.next(new Um({ body: l, headers: r, status: s, statusText: o, url: a || void 0 })),
                      e.complete())
                    : e.error(new Hm({ error: l, headers: r, status: s, statusText: o, url: a || void 0 }));
                },
                a = (t) => {
                  const { url: r } = i(),
                    s = new Hm({
                      error: t,
                      status: n.status || 0,
                      statusText: n.statusText || 'Unknown Error',
                      url: r || void 0,
                    });
                  e.error(s);
                };
              let l = !1;
              const c = (r) => {
                  l || (e.next(i()), (l = !0));
                  let s = { type: Vm.DownloadProgress, loaded: r.loaded };
                  r.lengthComputable && (s.total = r.total),
                    'text' === t.responseType && n.responseText && (s.partialText = n.responseText),
                    e.next(s);
                },
                u = (t) => {
                  let n = { type: Vm.UploadProgress, loaded: t.loaded };
                  t.lengthComputable && (n.total = t.total), e.next(n);
                };
              return (
                n.addEventListener('load', o),
                n.addEventListener('error', a),
                n.addEventListener('timeout', a),
                n.addEventListener('abort', a),
                t.reportProgress &&
                  (n.addEventListener('progress', c),
                  null !== r && n.upload && n.upload.addEventListener('progress', u)),
                n.send(r),
                e.next({ type: Vm.Sent }),
                () => {
                  n.removeEventListener('error', a),
                    n.removeEventListener('abort', a),
                    n.removeEventListener('load', o),
                    n.removeEventListener('timeout', a),
                    t.reportProgress &&
                      (n.removeEventListener('progress', c),
                      null !== r && n.upload && n.upload.removeEventListener('progress', u)),
                    n.readyState !== n.DONE && n.abort();
                }
              );
            });
          }
        }
        return (
          (t.??fac = function (e) {
            return new (e || t)(cr(ku));
          }),
          (t.??prov = pt({ token: t, factory: t.??fac })),
          t
        );
      })();
      const Km = new qn('XSRF_COOKIE_NAME'),
        Qm = new qn('XSRF_HEADER_NAME');
      class Ym {}
      let Jm = (() => {
          class t {
            constructor(t, e, n) {
              (this.doc = t),
                (this.platform = e),
                (this.cookieName = n),
                (this.lastCookieString = ''),
                (this.lastToken = null),
                (this.parseCount = 0);
            }
            getToken() {
              if ('server' === this.platform) return null;
              const t = this.doc.cookie || '';
              return (
                t !== this.lastCookieString &&
                  (this.parseCount++, (this.lastToken = pu(t, this.cookieName)), (this.lastCookieString = t)),
                this.lastToken
              );
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)(cr(Wc), cr(Jl), cr(Km));
            }),
            (t.??prov = pt({ token: t, factory: t.??fac })),
            t
          );
        })(),
        Xm = (() => {
          class t {
            constructor(t, e) {
              (this.tokenService = t), (this.headerName = e);
            }
            intercept(t, e) {
              const n = t.url.toLowerCase();
              if ('GET' === t.method || 'HEAD' === t.method || n.startsWith('http://') || n.startsWith('https://'))
                return e.handle(t);
              const r = this.tokenService.getToken();
              return (
                null === r ||
                  t.headers.has(this.headerName) ||
                  (t = t.clone({ headers: t.headers.set(this.headerName, r) })),
                e.handle(t)
              );
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)(cr(Ym), cr(Qm));
            }),
            (t.??prov = pt({ token: t, factory: t.??fac })),
            t
          );
        })(),
        t_ = (() => {
          class t {
            constructor(t, e) {
              (this.backend = t), (this.injector = e), (this.chain = null);
            }
            handle(t) {
              if (null === this.chain) {
                const t = this.injector.get(qm, []);
                this.chain = t.reduceRight((t, e) => new $m(t, e), this.backend);
              }
              return this.chain.handle(t);
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)(cr(Sm), cr(eo));
            }),
            (t.??prov = pt({ token: t, factory: t.??fac })),
            t
          );
        })(),
        e_ = (() => {
          class t {
            static disable() {
              return { ngModule: t, providers: [{ provide: Xm, useClass: Wm }] };
            }
            static withOptions(e = {}) {
              return {
                ngModule: t,
                providers: [
                  e.cookieName ? { provide: Km, useValue: e.cookieName } : [],
                  e.headerName ? { provide: Qm, useValue: e.headerName } : [],
                ],
              };
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??mod = Zt({ type: t })),
            (t.??inj = ft({
              providers: [
                Xm,
                { provide: qm, useExisting: Xm, multi: !0 },
                { provide: Ym, useClass: Jm },
                { provide: Km, useValue: 'XSRF-TOKEN' },
                { provide: Qm, useValue: 'X-XSRF-TOKEN' },
              ],
            })),
            t
          );
        })(),
        n_ = (() => {
          class t {}
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??mod = Zt({ type: t })),
            (t.??inj = ft({
              providers: [Bm, { provide: xm, useClass: t_ }, Zm, { provide: Sm, useExisting: Zm }],
              imports: [[e_.withOptions({ cookieName: 'XSRF-TOKEN', headerName: 'X-XSRF-TOKEN' })]],
            })),
            t
          );
        })();
      function r_(t, e) {
        return new y(e ? (n) => e.schedule(s_, 0, { error: t, subscriber: n }) : (e) => e.error(t));
      }
      function s_({ error: t, subscriber: e }) {
        e.error(t);
      }
      function i_(t, e, n, s) {
        return (
          r(n) && ((s = n), (n = void 0)),
          s
            ? i_(t, e, n).pipe(k((t) => (l(t) ? s(...t) : s(t))))
            : new y((r) => {
                o_(
                  t,
                  e,
                  function (t) {
                    r.next(arguments.length > 1 ? Array.prototype.slice.call(arguments) : t);
                  },
                  r,
                  n
                );
              })
        );
      }
      function o_(t, e, n, r, s) {
        let i;
        if (
          (function (t) {
            return t && 'function' == typeof t.addEventListener && 'function' == typeof t.removeEventListener;
          })(t)
        ) {
          const r = t;
          t.addEventListener(e, n, s), (i = () => r.removeEventListener(e, n, s));
        } else if (
          (function (t) {
            return t && 'function' == typeof t.on && 'function' == typeof t.off;
          })(t)
        ) {
          const r = t;
          t.on(e, n), (i = () => r.off(e, n));
        } else if (
          (function (t) {
            return t && 'function' == typeof t.addListener && 'function' == typeof t.removeListener;
          })(t)
        ) {
          const r = t;
          t.addListener(e, n), (i = () => r.removeListener(e, n));
        } else {
          if (!t || !t.length) throw new TypeError('Invalid event target');
          for (let i = 0, o = t.length; i < o; i++) o_(t[i], e, n, r, s);
        }
        r.add(i);
      }
      const a_ = new y(fp);
      class l_ extends h {
        constructor(t, e) {
          super();
        }
        schedule(t, e = 0) {
          return this;
        }
      }
      class c_ extends l_ {
        constructor(t, e) {
          super(t, e), (this.scheduler = t), (this.work = e), (this.pending = !1);
        }
        schedule(t, e = 0) {
          if (this.closed) return this;
          this.state = t;
          const n = this.id,
            r = this.scheduler;
          return (
            null != n && (this.id = this.recycleAsyncId(r, n, e)),
            (this.pending = !0),
            (this.delay = e),
            (this.id = this.id || this.requestAsyncId(r, this.id, e)),
            this
          );
        }
        requestAsyncId(t, e, n = 0) {
          return setInterval(t.flush.bind(t, this), n);
        }
        recycleAsyncId(t, e, n = 0) {
          if (null !== n && this.delay === n && !1 === this.pending) return e;
          clearInterval(e);
        }
        execute(t, e) {
          if (this.closed) return new Error('executing a cancelled action');
          this.pending = !1;
          const n = this._execute(t, e);
          if (n) return n;
          !1 === this.pending && null != this.id && (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
        }
        _execute(t, e) {
          let n,
            r = !1;
          try {
            this.work(t);
          } catch (s) {
            (r = !0), (n = (!!s && s) || new Error(s));
          }
          if (r) return this.unsubscribe(), n;
        }
        _unsubscribe() {
          const t = this.id,
            e = this.scheduler,
            n = e.actions,
            r = n.indexOf(this);
          (this.work = null),
            (this.state = null),
            (this.pending = !1),
            (this.scheduler = null),
            -1 !== r && n.splice(r, 1),
            null != t && (this.id = this.recycleAsyncId(e, t, null)),
            (this.delay = null);
        }
      }
      let u_ = (() => {
        class t {
          constructor(e, n = t.now) {
            (this.SchedulerAction = e), (this.now = n);
          }
          schedule(t, e = 0, n) {
            return new this.SchedulerAction(this, t).schedule(n, e);
          }
        }
        return (t.now = () => Date.now()), t;
      })();
      class h_ extends u_ {
        constructor(t, e = u_.now) {
          super(t, () => (h_.delegate && h_.delegate !== this ? h_.delegate.now() : e())),
            (this.actions = []),
            (this.active = !1),
            (this.scheduled = void 0);
        }
        schedule(t, e = 0, n) {
          return h_.delegate && h_.delegate !== this ? h_.delegate.schedule(t, e, n) : super.schedule(t, e, n);
        }
        flush(t) {
          const { actions: e } = this;
          if (this.active) return void e.push(t);
          let n;
          this.active = !0;
          do {
            if ((n = t.execute(t.state, t.delay))) break;
          } while ((t = e.shift()));
          if (((this.active = !1), n)) {
            for (; (t = e.shift()); ) t.unsubscribe();
            throw n;
          }
        }
      }
      const d_ = new h_(c_);
      class p_ {
        constructor(t, e, n) {
          (this.kind = t), (this.value = e), (this.error = n), (this.hasValue = 'N' === t);
        }
        observe(t) {
          switch (this.kind) {
            case 'N':
              return t.next && t.next(this.value);
            case 'E':
              return t.error && t.error(this.error);
            case 'C':
              return t.complete && t.complete();
          }
        }
        do(t, e, n) {
          switch (this.kind) {
            case 'N':
              return t && t(this.value);
            case 'E':
              return e && e(this.error);
            case 'C':
              return n && n();
          }
        }
        accept(t, e, n) {
          return t && 'function' == typeof t.next ? this.observe(t) : this.do(t, e, n);
        }
        toObservable() {
          switch (this.kind) {
            case 'N':
              return Td(this.value);
            case 'E':
              return r_(this.error);
            case 'C':
              return jd();
          }
          throw new Error('unexpected notification kind value');
        }
        static createNext(t) {
          return void 0 !== t ? new p_('N', t) : p_.undefinedValueNotification;
        }
        static createError(t) {
          return new p_('E', void 0, t);
        }
        static createComplete() {
          return p_.completeNotification;
        }
      }
      function f_(t, e = d_) {
        var n;
        const r = (n = t) instanceof Date && !isNaN(+n) ? +t - e.now() : Math.abs(t);
        return (t) => t.lift(new g_(r, e));
      }
      (p_.completeNotification = new p_('C')), (p_.undefinedValueNotification = new p_('N', void 0));
      class g_ {
        constructor(t, e) {
          (this.delay = t), (this.scheduler = e);
        }
        call(t, e) {
          return e.subscribe(new m_(t, this.delay, this.scheduler));
        }
      }
      class m_ extends f {
        constructor(t, e, n) {
          super(t), (this.delay = e), (this.scheduler = n), (this.queue = []), (this.active = !1), (this.errored = !1);
        }
        static dispatch(t) {
          const e = t.source,
            n = e.queue,
            r = t.scheduler,
            s = t.destination;
          for (; n.length > 0 && n[0].time - r.now() <= 0; ) n.shift().notification.observe(s);
          if (n.length > 0) {
            const e = Math.max(0, n[0].time - r.now());
            this.schedule(t, e);
          } else this.unsubscribe(), (e.active = !1);
        }
        _schedule(t) {
          (this.active = !0),
            this.destination.add(
              t.schedule(m_.dispatch, this.delay, { source: this, destination: this.destination, scheduler: t })
            );
        }
        scheduleNotification(t) {
          if (!0 === this.errored) return;
          const e = this.scheduler,
            n = new __(e.now() + this.delay, t);
          this.queue.push(n), !1 === this.active && this._schedule(e);
        }
        _next(t) {
          this.scheduleNotification(p_.createNext(t));
        }
        _error(t) {
          (this.errored = !0), (this.queue = []), this.destination.error(t), this.unsubscribe();
        }
        _complete() {
          this.scheduleNotification(p_.createComplete()), this.unsubscribe();
        }
      }
      class __ {
        constructor(t, e) {
          (this.time = t), (this.notification = e);
        }
      }
      const y_ = 'Service workers are disabled or not supported by this browser';
      class v_ {
        constructor(t) {
          if (((this.serviceWorker = t), t)) {
            const e = i_(t, 'controllerchange').pipe(k(() => t.controller)),
              n = Nd(
                Fd(() => Td(t.controller)),
                e
              );
            (this.worker = n.pipe(Qd((t) => !!t))),
              (this.registration = this.worker.pipe(Ud(() => t.getRegistration())));
            const r = i_(t, 'message')
              .pipe(k((t) => t.data))
              .pipe(Qd((t) => t && t.type))
              .pipe(Y(new x()));
            r.connect(), (this.events = r);
          } else
            this.worker =
              this.events =
              this.registration =
                Fd(() => r_(new Error('Service workers are disabled or not supported by this browser')));
        }
        postMessage(t, e) {
          return this.worker
            .pipe(
              $d(1),
              gp((n) => {
                n.postMessage(Object.assign({ action: t }, e));
              })
            )
            .toPromise()
            .then(() => {});
        }
        postMessageWithStatus(t, e, n) {
          const r = this.waitForStatus(n),
            s = this.postMessage(t, e);
          return Promise.all([r, s]).then(() => {});
        }
        generateNonce() {
          return Math.round(1e7 * Math.random());
        }
        eventsOfType(t) {
          return this.events.pipe(Qd((e) => e.type === t));
        }
        nextEventOfType(t) {
          return this.eventsOfType(t).pipe($d(1));
        }
        waitForStatus(t) {
          return this.eventsOfType('STATUS')
            .pipe(
              Qd((e) => e.nonce === t),
              $d(1),
              k((t) => {
                if (!t.status) throw new Error(t.error);
              })
            )
            .toPromise();
        }
        get isEnabled() {
          return !!this.serviceWorker;
        }
      }
      let b_ = (() => {
          class t {
            constructor(t) {
              if (((this.sw = t), (this.subscriptionChanges = new x()), !t.isEnabled))
                return (this.messages = a_), (this.notificationClicks = a_), void (this.subscription = a_);
              (this.messages = this.sw.eventsOfType('PUSH').pipe(k((t) => t.data))),
                (this.notificationClicks = this.sw.eventsOfType('NOTIFICATION_CLICK').pipe(k((t) => t.data))),
                (this.pushManager = this.sw.registration.pipe(k((t) => t.pushManager)));
              const e = this.pushManager.pipe(Ud((t) => t.getSubscription()));
              this.subscription = $(e, this.subscriptionChanges);
            }
            get isEnabled() {
              return this.sw.isEnabled;
            }
            requestSubscription(t) {
              if (!this.sw.isEnabled) return Promise.reject(new Error(y_));
              const e = { userVisibleOnly: !0 };
              let n = this.decodeBase64(t.serverPublicKey.replace(/_/g, '/').replace(/-/g, '+')),
                r = new Uint8Array(new ArrayBuffer(n.length));
              for (let s = 0; s < n.length; s++) r[s] = n.charCodeAt(s);
              return (
                (e.applicationServerKey = r),
                this.pushManager
                  .pipe(
                    Ud((t) => t.subscribe(e)),
                    $d(1)
                  )
                  .toPromise()
                  .then((t) => (this.subscriptionChanges.next(t), t))
              );
            }
            unsubscribe() {
              return this.sw.isEnabled
                ? this.subscription
                    .pipe(
                      $d(1),
                      Ud((t) => {
                        if (null === t) throw new Error('Not subscribed to push notifications.');
                        return t.unsubscribe().then((t) => {
                          if (!t) throw new Error('Unsubscribe failed!');
                          this.subscriptionChanges.next(null);
                        });
                      })
                    )
                    .toPromise()
                : Promise.reject(new Error(y_));
            }
            decodeBase64(t) {
              return atob(t);
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)(cr(v_));
            }),
            (t.??prov = pt({ token: t, factory: t.??fac })),
            t
          );
        })(),
        w_ = (() => {
          class t {
            constructor(t) {
              if (((this.sw = t), !t.isEnabled))
                return (this.available = a_), (this.activated = a_), void (this.unrecoverable = a_);
              (this.available = this.sw.eventsOfType('UPDATE_AVAILABLE')),
                (this.activated = this.sw.eventsOfType('UPDATE_ACTIVATED')),
                (this.unrecoverable = this.sw.eventsOfType('UNRECOVERABLE_STATE'));
            }
            get isEnabled() {
              return this.sw.isEnabled;
            }
            checkForUpdate() {
              if (!this.sw.isEnabled) return Promise.reject(new Error(y_));
              const t = this.sw.generateNonce();
              return this.sw.postMessageWithStatus('CHECK_FOR_UPDATES', { statusNonce: t }, t);
            }
            activateUpdate() {
              if (!this.sw.isEnabled) return Promise.reject(new Error(y_));
              const t = this.sw.generateNonce();
              return this.sw.postMessageWithStatus('ACTIVATE_UPDATE', { statusNonce: t }, t);
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)(cr(v_));
            }),
            (t.??prov = pt({ token: t, factory: t.??fac })),
            t
          );
        })();
      class C_ {}
      const x_ = new qn('NGSW_REGISTER_SCRIPT');
      function S_(t, e, n, r) {
        return () => {
          if (!Cu(r) || !('serviceWorker' in navigator) || !1 === n.enabled) return;
          let s;
          if (
            (navigator.serviceWorker.addEventListener('controllerchange', () => {
              null !== navigator.serviceWorker.controller &&
                navigator.serviceWorker.controller.postMessage({ action: 'INITIALIZE' });
            }),
            'function' == typeof n.registrationStrategy)
          )
            s = n.registrationStrategy();
          else {
            const [e, ...r] = (n.registrationStrategy || 'registerWhenStable:30000').split(':');
            switch (e) {
              case 'registerImmediately':
                s = Td(null);
                break;
              case 'registerWithDelay':
                s = E_(+r[0] || 0);
                break;
              case 'registerWhenStable':
                s = r[0] ? $(k_(t), E_(+r[0])) : k_(t);
                break;
              default:
                throw new Error(`Unknown ServiceWorker registration strategy: ${n.registrationStrategy}`);
            }
          }
          t.get(pc).runOutsideAngular(() =>
            s
              .pipe($d(1))
              .subscribe(() =>
                navigator.serviceWorker
                  .register(e, { scope: n.scope })
                  .catch((t) => console.error('Service worker registration failed with:', t))
              )
          );
        };
      }
      function E_(t) {
        return Td(null).pipe(f_(t));
      }
      function k_(t) {
        return t.get(Lc).isStable.pipe(Qd((t) => t));
      }
      function T_(t, e) {
        return new v_(Cu(e) && !1 !== t.enabled ? navigator.serviceWorker : void 0);
      }
      let A_ = (() => {
        class t {
          static register(e, n = {}) {
            return {
              ngModule: t,
              providers: [
                { provide: x_, useValue: e },
                { provide: C_, useValue: n },
                { provide: v_, useFactory: T_, deps: [C_, Jl] },
                { provide: Wl, useFactory: S_, deps: [eo, x_, C_, Jl], multi: !0 },
              ],
            };
          }
        }
        return (
          (t.??fac = function (e) {
            return new (e || t)();
          }),
          (t.??mod = Zt({ type: t })),
          (t.??inj = ft({ providers: [b_, w_] })),
          t
        );
      })();
      function O_(t) {
        return !!t && (t instanceof y || ('function' == typeof t.lift && 'function' == typeof t.subscribe));
      }
      const I_ = new (class extends h_ {})(
        class extends c_ {
          constructor(t, e) {
            super(t, e), (this.scheduler = t), (this.work = e);
          }
          schedule(t, e = 0) {
            return e > 0
              ? super.schedule(t, e)
              : ((this.delay = e), (this.state = t), this.scheduler.flush(this), this);
          }
          execute(t, e) {
            return e > 0 || this.closed ? super.execute(t, e) : this._execute(t, e);
          }
          requestAsyncId(t, e, n = 0) {
            return (null !== n && n > 0) || (null === n && this.delay > 0)
              ? super.requestAsyncId(t, e, n)
              : t.flush(this);
          }
        }
      );
      class R_ extends f {
        constructor(t, e, n = 0) {
          super(t), (this.scheduler = e), (this.delay = n);
        }
        static dispatch(t) {
          const { notification: e, destination: n } = t;
          e.observe(n), this.unsubscribe();
        }
        scheduleMessage(t) {
          this.destination.add(this.scheduler.schedule(R_.dispatch, this.delay, new P_(t, this.destination)));
        }
        _next(t) {
          this.scheduleMessage(p_.createNext(t));
        }
        _error(t) {
          this.scheduleMessage(p_.createError(t)), this.unsubscribe();
        }
        _complete() {
          this.scheduleMessage(p_.createComplete()), this.unsubscribe();
        }
      }
      class P_ {
        constructor(t, e) {
          (this.notification = t), (this.destination = e);
        }
      }
      class D_ extends x {
        constructor(t = Number.POSITIVE_INFINITY, e = Number.POSITIVE_INFINITY, n) {
          super(),
            (this.scheduler = n),
            (this._events = []),
            (this._infiniteTimeWindow = !1),
            (this._bufferSize = t < 1 ? 1 : t),
            (this._windowTime = e < 1 ? 1 : e),
            e === Number.POSITIVE_INFINITY
              ? ((this._infiniteTimeWindow = !0), (this.next = this.nextInfiniteTimeWindow))
              : (this.next = this.nextTimeWindow);
        }
        nextInfiniteTimeWindow(t) {
          if (!this.isStopped) {
            const e = this._events;
            e.push(t), e.length > this._bufferSize && e.shift();
          }
          super.next(t);
        }
        nextTimeWindow(t) {
          this.isStopped || (this._events.push(new L_(this._getNow(), t)), this._trimBufferThenGetEvents()),
            super.next(t);
        }
        _subscribe(t) {
          const e = this._infiniteTimeWindow,
            n = e ? this._events : this._trimBufferThenGetEvents(),
            r = this.scheduler,
            s = n.length;
          let i;
          if (this.closed) throw new b();
          if (
            (this.isStopped || this.hasError ? (i = h.EMPTY) : (this.observers.push(t), (i = new w(this, t))),
            r && t.add((t = new R_(t, r))),
            e)
          )
            for (let o = 0; o < s && !t.closed; o++) t.next(n[o]);
          else for (let o = 0; o < s && !t.closed; o++) t.next(n[o].value);
          return this.hasError ? t.error(this.thrownError) : this.isStopped && t.complete(), i;
        }
        _getNow() {
          return (this.scheduler || I_).now();
        }
        _trimBufferThenGetEvents() {
          const t = this._getNow(),
            e = this._bufferSize,
            n = this._windowTime,
            r = this._events,
            s = r.length;
          let i = 0;
          for (; i < s && !(t - r[i].time < n); ) i++;
          return s > e && (i = Math.max(i, s - e)), i > 0 && r.splice(0, i), r;
        }
      }
      class L_ {
        constructor(t, e) {
          (this.time = t), (this.value = e);
        }
      }
      function M_(t, e, n) {
        let r;
        return (
          (r = t && 'object' == typeof t ? t : { bufferSize: t, windowTime: e, refCount: !1, scheduler: n }),
          (t) =>
            t.lift(
              (function ({
                bufferSize: t = Number.POSITIVE_INFINITY,
                windowTime: e = Number.POSITIVE_INFINITY,
                refCount: n,
                scheduler: r,
              }) {
                let s,
                  i,
                  o = 0,
                  a = !1,
                  l = !1;
                return function (c) {
                  let u;
                  o++,
                    !s || a
                      ? ((a = !1),
                        (s = new D_(t, e, r)),
                        (u = s.subscribe(this)),
                        (i = c.subscribe({
                          next(t) {
                            s.next(t);
                          },
                          error(t) {
                            (a = !0), s.error(t);
                          },
                          complete() {
                            (l = !0), (i = void 0), s.complete();
                          },
                        })),
                        l && (i = void 0))
                      : (u = s.subscribe(this)),
                    this.add(() => {
                      o--,
                        u.unsubscribe(),
                        (u = void 0),
                        i && !l && n && 0 === o && (i.unsubscribe(), (i = void 0), (s = void 0));
                    });
                };
              })(r)
            )
        );
      }
      class N_ {}
      let V_ = (() => {
        class t extends N_ {
          getTranslation(t) {
            return Td({});
          }
        }
        return (
          (t.??fac = (function () {
            let e;
            return function (n) {
              return (e || (e = Un(t)))(n || t);
            };
          })()),
          (t.??prov = pt({ token: t, factory: t.??fac })),
          t
        );
      })();
      class j_ {}
      let F_ = (() => {
        class t {
          handle(t) {
            return t.key;
          }
        }
        return (
          (t.??fac = function (e) {
            return new (e || t)();
          }),
          (t.??prov = pt({ token: t, factory: t.??fac })),
          t
        );
      })();
      function U_(t, e) {
        if (t === e) return !0;
        if (null === t || null === e) return !1;
        if (t != t && e != e) return !0;
        let n,
          r,
          s,
          i = typeof t;
        if (i == typeof e && 'object' == i) {
          if (!Array.isArray(t)) {
            if (Array.isArray(e)) return !1;
            for (r in ((s = Object.create(null)), t)) {
              if (!U_(t[r], e[r])) return !1;
              s[r] = !0;
            }
            for (r in e) if (!(r in s) && void 0 !== e[r]) return !1;
            return !0;
          }
          if (!Array.isArray(e)) return !1;
          if ((n = t.length) == e.length) {
            for (r = 0; r < n; r++) if (!U_(t[r], e[r])) return !1;
            return !0;
          }
        }
        return !1;
      }
      function H_(t) {
        return null != t;
      }
      function z_(t) {
        return t && 'object' == typeof t && !Array.isArray(t);
      }
      function B_(t, e) {
        let n = Object.assign({}, t);
        return (
          z_(t) &&
            z_(e) &&
            Object.keys(e).forEach((r) => {
              z_(e[r])
                ? r in t
                  ? (n[r] = B_(t[r], e[r]))
                  : Object.assign(n, { [r]: e[r] })
                : Object.assign(n, { [r]: e[r] });
            }),
          n
        );
      }
      class $_ {}
      let q_ = (() => {
        class t extends $_ {
          constructor() {
            super(...arguments), (this.templateMatcher = /{{\s?([^{}\s]*)\s?}}/g);
          }
          interpolate(t, e) {
            let n;
            return (
              (n =
                'string' == typeof t
                  ? this.interpolateString(t, e)
                  : 'function' == typeof t
                  ? this.interpolateFunction(t, e)
                  : t),
              n
            );
          }
          getValue(t, e) {
            let n = 'string' == typeof e ? e.split('.') : [e];
            e = '';
            do {
              (e += n.shift()),
                !H_(t) || !H_(t[e]) || ('object' != typeof t[e] && n.length)
                  ? n.length
                    ? (e += '.')
                    : (t = void 0)
                  : ((t = t[e]), (e = ''));
            } while (n.length);
            return t;
          }
          interpolateFunction(t, e) {
            return t(e);
          }
          interpolateString(t, e) {
            return e
              ? t.replace(this.templateMatcher, (t, n) => {
                  let r = this.getValue(e, n);
                  return H_(r) ? r : t;
                })
              : t;
          }
        }
        return (
          (t.??fac = (function () {
            let e;
            return function (n) {
              return (e || (e = Un(t)))(n || t);
            };
          })()),
          (t.??prov = pt({ token: t, factory: t.??fac })),
          t
        );
      })();
      class W_ {}
      let G_ = (() => {
        class t extends W_ {
          compile(t, e) {
            return t;
          }
          compileTranslations(t, e) {
            return t;
          }
        }
        return (
          (t.??fac = (function () {
            let e;
            return function (n) {
              return (e || (e = Un(t)))(n || t);
            };
          })()),
          (t.??prov = pt({ token: t, factory: t.??fac })),
          t
        );
      })();
      class Z_ {
        constructor() {
          (this.currentLang = this.defaultLang),
            (this.translations = {}),
            (this.langs = []),
            (this.onTranslationChange = new kl()),
            (this.onLangChange = new kl()),
            (this.onDefaultLangChange = new kl());
        }
      }
      const K_ = new qn('USE_STORE'),
        Q_ = new qn('USE_DEFAULT_LANG'),
        Y_ = new qn('DEFAULT_LANGUAGE'),
        J_ = new qn('USE_EXTEND');
      let X_ = (() => {
          class t {
            constructor(t, e, n, r, s, i = !0, o = !1, a = !1, l) {
              (this.store = t),
                (this.currentLoader = e),
                (this.compiler = n),
                (this.parser = r),
                (this.missingTranslationHandler = s),
                (this.useDefaultLang = i),
                (this.isolate = o),
                (this.extend = a),
                (this.pending = !1),
                (this._onTranslationChange = new kl()),
                (this._onLangChange = new kl()),
                (this._onDefaultLangChange = new kl()),
                (this._langs = []),
                (this._translations = {}),
                (this._translationRequests = {}),
                l && this.setDefaultLang(l);
            }
            get onTranslationChange() {
              return this.isolate ? this._onTranslationChange : this.store.onTranslationChange;
            }
            get onLangChange() {
              return this.isolate ? this._onLangChange : this.store.onLangChange;
            }
            get onDefaultLangChange() {
              return this.isolate ? this._onDefaultLangChange : this.store.onDefaultLangChange;
            }
            get defaultLang() {
              return this.isolate ? this._defaultLang : this.store.defaultLang;
            }
            set defaultLang(t) {
              this.isolate ? (this._defaultLang = t) : (this.store.defaultLang = t);
            }
            get currentLang() {
              return this.isolate ? this._currentLang : this.store.currentLang;
            }
            set currentLang(t) {
              this.isolate ? (this._currentLang = t) : (this.store.currentLang = t);
            }
            get langs() {
              return this.isolate ? this._langs : this.store.langs;
            }
            set langs(t) {
              this.isolate ? (this._langs = t) : (this.store.langs = t);
            }
            get translations() {
              return this.isolate ? this._translations : this.store.translations;
            }
            set translations(t) {
              this.isolate ? (this._translations = t) : (this.store.translations = t);
            }
            setDefaultLang(t) {
              if (t === this.defaultLang) return;
              let e = this.retrieveTranslations(t);
              void 0 !== e
                ? (null == this.defaultLang && (this.defaultLang = t),
                  e.pipe($d(1)).subscribe((e) => {
                    this.changeDefaultLang(t);
                  }))
                : this.changeDefaultLang(t);
            }
            getDefaultLang() {
              return this.defaultLang;
            }
            use(t) {
              if (t === this.currentLang) return Td(this.translations[t]);
              let e = this.retrieveTranslations(t);
              return void 0 !== e
                ? (this.currentLang || (this.currentLang = t),
                  e.pipe($d(1)).subscribe((e) => {
                    this.changeLang(t);
                  }),
                  e)
                : (this.changeLang(t), Td(this.translations[t]));
            }
            retrieveTranslations(t) {
              let e;
              return (
                (void 0 === this.translations[t] || this.extend) &&
                  ((this._translationRequests[t] = this._translationRequests[t] || this.getTranslation(t)),
                  (e = this._translationRequests[t])),
                e
              );
            }
            getTranslation(t) {
              this.pending = !0;
              const e = this.currentLoader.getTranslation(t).pipe(M_(1), $d(1));
              return (
                (this.loadingTranslations = e.pipe(
                  k((e) => this.compiler.compileTranslations(e, t)),
                  M_(1),
                  $d(1)
                )),
                this.loadingTranslations.subscribe({
                  next: (e) => {
                    (this.translations[t] =
                      this.extend && this.translations[t]
                        ? Object.assign(Object.assign({}, e), this.translations[t])
                        : e),
                      this.updateLangs(),
                      (this.pending = !1);
                  },
                  error: (t) => {
                    this.pending = !1;
                  },
                }),
                e
              );
            }
            setTranslation(t, e, n = !1) {
              (e = this.compiler.compileTranslations(e, t)),
                (this.translations[t] = (n || this.extend) && this.translations[t] ? B_(this.translations[t], e) : e),
                this.updateLangs(),
                this.onTranslationChange.emit({ lang: t, translations: this.translations[t] });
            }
            getLangs() {
              return this.langs;
            }
            addLangs(t) {
              t.forEach((t) => {
                -1 === this.langs.indexOf(t) && this.langs.push(t);
              });
            }
            updateLangs() {
              this.addLangs(Object.keys(this.translations));
            }
            getParsedResult(t, e, n) {
              let r;
              if (e instanceof Array) {
                let r = {},
                  s = !1;
                for (let i of e) (r[i] = this.getParsedResult(t, i, n)), O_(r[i]) && (s = !0);
                return s
                  ? lh(e.map((t) => (O_(r[t]) ? r[t] : Td(r[t])))).pipe(
                      k((t) => {
                        let n = {};
                        return (
                          t.forEach((t, r) => {
                            n[e[r]] = t;
                          }),
                          n
                        );
                      })
                    )
                  : r;
              }
              if (
                (t && (r = this.parser.interpolate(this.parser.getValue(t, e), n)),
                void 0 === r &&
                  null != this.defaultLang &&
                  this.defaultLang !== this.currentLang &&
                  this.useDefaultLang &&
                  (r = this.parser.interpolate(this.parser.getValue(this.translations[this.defaultLang], e), n)),
                void 0 === r)
              ) {
                let t = { key: e, translateService: this };
                void 0 !== n && (t.interpolateParams = n), (r = this.missingTranslationHandler.handle(t));
              }
              return void 0 !== r ? r : e;
            }
            get(t, e) {
              if (!H_(t) || !t.length) throw new Error('Parameter "key" required');
              if (this.pending)
                return this.loadingTranslations.pipe(np((n) => (O_((n = this.getParsedResult(n, t, e))) ? n : Td(n))));
              {
                let n = this.getParsedResult(this.translations[this.currentLang], t, e);
                return O_(n) ? n : Td(n);
              }
            }
            getStreamOnTranslationChange(t, e) {
              if (!H_(t) || !t.length) throw new Error('Parameter "key" required');
              return Nd(
                Fd(() => this.get(t, e)),
                this.onTranslationChange.pipe(
                  Ud((n) => {
                    const r = this.getParsedResult(n.translations, t, e);
                    return 'function' == typeof r.subscribe ? r : Td(r);
                  })
                )
              );
            }
            stream(t, e) {
              if (!H_(t) || !t.length) throw new Error('Parameter "key" required');
              return Nd(
                Fd(() => this.get(t, e)),
                this.onLangChange.pipe(
                  Ud((n) => {
                    const r = this.getParsedResult(n.translations, t, e);
                    return O_(r) ? r : Td(r);
                  })
                )
              );
            }
            instant(t, e) {
              if (!H_(t) || !t.length) throw new Error('Parameter "key" required');
              let n = this.getParsedResult(this.translations[this.currentLang], t, e);
              if (O_(n)) {
                if (t instanceof Array) {
                  let e = {};
                  return (
                    t.forEach((n, r) => {
                      e[t[r]] = t[r];
                    }),
                    e
                  );
                }
                return t;
              }
              return n;
            }
            set(t, e, n = this.currentLang) {
              (this.translations[n][t] = this.compiler.compile(e, n)),
                this.updateLangs(),
                this.onTranslationChange.emit({ lang: n, translations: this.translations[n] });
            }
            changeLang(t) {
              (this.currentLang = t),
                this.onLangChange.emit({ lang: t, translations: this.translations[t] }),
                null == this.defaultLang && this.changeDefaultLang(t);
            }
            changeDefaultLang(t) {
              (this.defaultLang = t), this.onDefaultLangChange.emit({ lang: t, translations: this.translations[t] });
            }
            reloadLang(t) {
              return this.resetLang(t), this.getTranslation(t);
            }
            resetLang(t) {
              (this._translationRequests[t] = void 0), (this.translations[t] = void 0);
            }
            getBrowserLang() {
              if ('undefined' == typeof window || void 0 === window.navigator) return;
              let t = window.navigator.languages ? window.navigator.languages[0] : null;
              return (
                (t =
                  t || window.navigator.language || window.navigator.browserLanguage || window.navigator.userLanguage),
                void 0 !== t
                  ? (-1 !== t.indexOf('-') && (t = t.split('-')[0]), -1 !== t.indexOf('_') && (t = t.split('_')[0]), t)
                  : void 0
              );
            }
            getBrowserCultureLang() {
              if ('undefined' == typeof window || void 0 === window.navigator) return;
              let t = window.navigator.languages ? window.navigator.languages[0] : null;
              return (
                (t =
                  t || window.navigator.language || window.navigator.browserLanguage || window.navigator.userLanguage),
                t
              );
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)(cr(Z_), cr(N_), cr(W_), cr($_), cr(j_), cr(Q_), cr(K_), cr(J_), cr(Y_));
            }),
            (t.??prov = pt({ token: t, factory: t.??fac })),
            t
          );
        })(),
        ty = (() => {
          class t {
            constructor(t, e, n) {
              (this.translateService = t),
                (this.element = e),
                (this._ref = n),
                this.onTranslationChangeSub ||
                  (this.onTranslationChangeSub = this.translateService.onTranslationChange.subscribe((t) => {
                    t.lang === this.translateService.currentLang && this.checkNodes(!0, t.translations);
                  })),
                this.onLangChangeSub ||
                  (this.onLangChangeSub = this.translateService.onLangChange.subscribe((t) => {
                    this.checkNodes(!0, t.translations);
                  })),
                this.onDefaultLangChangeSub ||
                  (this.onDefaultLangChangeSub = this.translateService.onDefaultLangChange.subscribe((t) => {
                    this.checkNodes(!0);
                  }));
            }
            set translate(t) {
              t && ((this.key = t), this.checkNodes());
            }
            set translateParams(t) {
              U_(this.currentParams, t) || ((this.currentParams = t), this.checkNodes(!0));
            }
            ngAfterViewChecked() {
              this.checkNodes();
            }
            checkNodes(t = !1, e) {
              let n = this.element.nativeElement.childNodes;
              n.length ||
                (this.setContent(this.element.nativeElement, this.key), (n = this.element.nativeElement.childNodes));
              for (let r = 0; r < n.length; ++r) {
                let s = n[r];
                if (3 === s.nodeType) {
                  let n;
                  if ((t && (s.lastKey = null), H_(s.lookupKey))) n = s.lookupKey;
                  else if (this.key) n = this.key;
                  else {
                    let t = this.getContent(s),
                      e = t.trim();
                    e.length &&
                      ((s.lookupKey = e),
                      t !== s.currentValue
                        ? ((n = e), (s.originalContent = t || s.originalContent))
                        : s.originalContent
                        ? (n = s.originalContent.trim())
                        : t !== s.currentValue && ((n = e), (s.originalContent = t || s.originalContent)));
                  }
                  this.updateValue(n, s, e);
                }
              }
            }
            updateValue(t, e, n) {
              if (t) {
                if (e.lastKey === t && this.lastParams === this.currentParams) return;
                this.lastParams = this.currentParams;
                let r = (n) => {
                  n !== t && (e.lastKey = t),
                    e.originalContent || (e.originalContent = this.getContent(e)),
                    (e.currentValue = H_(n) ? n : e.originalContent || t),
                    this.setContent(e, this.key ? e.currentValue : e.originalContent.replace(t, e.currentValue)),
                    this._ref.markForCheck();
                };
                if (H_(n)) {
                  let e = this.translateService.getParsedResult(n, t, this.currentParams);
                  O_(e) ? e.subscribe(r) : r(e);
                } else this.translateService.get(t, this.currentParams).subscribe(r);
              }
            }
            getContent(t) {
              return H_(t.textContent) ? t.textContent : t.data;
            }
            setContent(t, e) {
              H_(t.textContent) ? (t.textContent = e) : (t.data = e);
            }
            ngOnDestroy() {
              this.onLangChangeSub && this.onLangChangeSub.unsubscribe(),
                this.onDefaultLangChangeSub && this.onDefaultLangChangeSub.unsubscribe(),
                this.onTranslationChangeSub && this.onTranslationChangeSub.unsubscribe();
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)(_o(X_), _o(xa), _o(Ka));
            }),
            (t.??dir = Qt({
              type: t,
              selectors: [
                ['', 'translate', ''],
                ['', 'ngx-translate', ''],
              ],
              inputs: { translate: 'translate', translateParams: 'translateParams' },
            })),
            t
          );
        })(),
        ey = (() => {
          class t {
            constructor(t, e) {
              (this.translate = t), (this._ref = e), (this.value = '');
            }
            updateValue(t, e, n) {
              let r = (e) => {
                (this.value = void 0 !== e ? e : t), (this.lastKey = t), this._ref.markForCheck();
              };
              if (n) {
                let s = this.translate.getParsedResult(n, t, e);
                O_(s.subscribe) ? s.subscribe(r) : r(s);
              }
              this.translate.get(t, e).subscribe(r);
            }
            transform(t, ...e) {
              if (!t || !t.length) return t;
              if (U_(t, this.lastKey) && U_(e, this.lastParams)) return this.value;
              let n;
              if (H_(e[0]) && e.length)
                if ('string' == typeof e[0] && e[0].length) {
                  let t = e[0]
                    .replace(/(\')?([a-zA-Z0-9_]+)(\')?(\s)?:/g, '"$2":')
                    .replace(/:(\s)?(\')(.*?)(\')/g, ':"$3"');
                  try {
                    n = JSON.parse(t);
                  } catch (r) {
                    throw new SyntaxError(
                      `Wrong parameter in TranslatePipe. Expected a valid Object, received: ${e[0]}`
                    );
                  }
                } else 'object' != typeof e[0] || Array.isArray(e[0]) || (n = e[0]);
              return (
                (this.lastKey = t),
                (this.lastParams = e),
                this.updateValue(t, n),
                this._dispose(),
                this.onTranslationChange ||
                  (this.onTranslationChange = this.translate.onTranslationChange.subscribe((e) => {
                    this.lastKey &&
                      e.lang === this.translate.currentLang &&
                      ((this.lastKey = null), this.updateValue(t, n, e.translations));
                  })),
                this.onLangChange ||
                  (this.onLangChange = this.translate.onLangChange.subscribe((e) => {
                    this.lastKey && ((this.lastKey = null), this.updateValue(t, n, e.translations));
                  })),
                this.onDefaultLangChange ||
                  (this.onDefaultLangChange = this.translate.onDefaultLangChange.subscribe(() => {
                    this.lastKey && ((this.lastKey = null), this.updateValue(t, n));
                  })),
                this.value
              );
            }
            _dispose() {
              void 0 !== this.onTranslationChange &&
                (this.onTranslationChange.unsubscribe(), (this.onTranslationChange = void 0)),
                void 0 !== this.onLangChange && (this.onLangChange.unsubscribe(), (this.onLangChange = void 0)),
                void 0 !== this.onDefaultLangChange &&
                  (this.onDefaultLangChange.unsubscribe(), (this.onDefaultLangChange = void 0));
            }
            ngOnDestroy() {
              this._dispose();
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)(_o(X_, 16), _o(Ka, 16));
            }),
            (t.??pipe = Yt({ name: 'translate', type: t, pure: !1 })),
            (t.??prov = pt({ token: t, factory: t.??fac })),
            t
          );
        })(),
        ny = (() => {
          class t {
            static forRoot(e = {}) {
              return {
                ngModule: t,
                providers: [
                  e.loader || { provide: N_, useClass: V_ },
                  e.compiler || { provide: W_, useClass: G_ },
                  e.parser || { provide: $_, useClass: q_ },
                  e.missingTranslationHandler || { provide: j_, useClass: F_ },
                  Z_,
                  { provide: K_, useValue: e.isolate },
                  { provide: Q_, useValue: e.useDefaultLang },
                  { provide: J_, useValue: e.extend },
                  { provide: Y_, useValue: e.defaultLanguage },
                  X_,
                ],
              };
            }
            static forChild(e = {}) {
              return {
                ngModule: t,
                providers: [
                  e.loader || { provide: N_, useClass: V_ },
                  e.compiler || { provide: W_, useClass: G_ },
                  e.parser || { provide: $_, useClass: q_ },
                  e.missingTranslationHandler || { provide: j_, useClass: F_ },
                  { provide: K_, useValue: e.isolate },
                  { provide: Q_, useValue: e.useDefaultLang },
                  { provide: J_, useValue: e.extend },
                  { provide: Y_, useValue: e.defaultLanguage },
                  X_,
                ],
              };
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??mod = Zt({ type: t })),
            (t.??inj = ft({})),
            t
          );
        })();
      function ry(t) {
        return !l(t) && t - parseFloat(t) + 1 >= 0;
      }
      function sy(t) {
        const { index: e, period: n, subscriber: r } = t;
        if ((r.next(e), !r.closed)) {
          if (-1 === n) return r.complete();
          (t.index = e + 1), this.schedule(t, n);
        }
      }
      function iy(...t) {
        if (1 === t.length) {
          if (!l(t[0])) return t[0];
          t = t[0];
        }
        return B(t, void 0).lift(new oy());
      }
      class oy {
        call(t, e) {
          return e.subscribe(new ay(t));
        }
      }
      class ay extends Od {
        constructor(t) {
          super(t), (this.hasFirst = !1), (this.observables = []), (this.subscriptions = []);
        }
        _next(t) {
          this.observables.push(t);
        }
        _complete() {
          const t = this.observables,
            e = t.length;
          if (0 === e) this.destination.complete();
          else {
            for (let n = 0; n < e && !this.hasFirst; n++) {
              const e = Rd(this, t[n], void 0, n);
              this.subscriptions && this.subscriptions.push(e), this.add(e);
            }
            this.observables = null;
          }
        }
        notifyNext(t, e, n) {
          if (!this.hasFirst) {
            this.hasFirst = !0;
            for (let t = 0; t < this.subscriptions.length; t++)
              if (t !== n) {
                let e = this.subscriptions[t];
                e.unsubscribe(), this.remove(e);
              }
            this.subscriptions = null;
          }
          this.destination.next(e);
        }
      }
      function ly(...t) {
        const e = t[t.length - 1];
        return 'function' == typeof e && t.pop(), B(t, void 0).lift(new cy(e));
      }
      class cy {
        constructor(t) {
          this.resultSelector = t;
        }
        call(t, e) {
          return e.subscribe(new uy(t, this.resultSelector));
        }
      }
      class uy extends f {
        constructor(t, e, n = Object.create(null)) {
          super(t),
            (this.resultSelector = e),
            (this.iterators = []),
            (this.active = 0),
            (this.resultSelector = 'function' == typeof e ? e : void 0);
        }
        _next(t) {
          const e = this.iterators;
          l(t)
            ? e.push(new dy(t))
            : e.push('function' == typeof t[I] ? new hy(t[I]()) : new py(this.destination, this, t));
        }
        _complete() {
          const t = this.iterators,
            e = t.length;
          if ((this.unsubscribe(), 0 !== e)) {
            this.active = e;
            for (let n = 0; n < e; n++) {
              let e = t[n];
              e.stillUnsubscribed ? this.destination.add(e.subscribe()) : this.active--;
            }
          } else this.destination.complete();
        }
        notifyInactive() {
          this.active--, 0 === this.active && this.destination.complete();
        }
        checkIterators() {
          const t = this.iterators,
            e = t.length,
            n = this.destination;
          for (let i = 0; i < e; i++) {
            let e = t[i];
            if ('function' == typeof e.hasValue && !e.hasValue()) return;
          }
          let r = !1;
          const s = [];
          for (let i = 0; i < e; i++) {
            let e = t[i],
              o = e.next();
            if ((e.hasCompleted() && (r = !0), o.done)) return void n.complete();
            s.push(o.value);
          }
          this.resultSelector ? this._tryresultSelector(s) : n.next(s), r && n.complete();
        }
        _tryresultSelector(t) {
          let e;
          try {
            e = this.resultSelector.apply(this, t);
          } catch (n) {
            return void this.destination.error(n);
          }
          this.destination.next(e);
        }
      }
      class hy {
        constructor(t) {
          (this.iterator = t), (this.nextResult = t.next());
        }
        hasValue() {
          return !0;
        }
        next() {
          const t = this.nextResult;
          return (this.nextResult = this.iterator.next()), t;
        }
        hasCompleted() {
          const t = this.nextResult;
          return Boolean(t && t.done);
        }
      }
      class dy {
        constructor(t) {
          (this.array = t), (this.index = 0), (this.length = 0), (this.length = t.length);
        }
        [I]() {
          return this;
        }
        next(t) {
          const e = this.index++;
          return e < this.length ? { value: this.array[e], done: !1 } : { value: null, done: !0 };
        }
        hasValue() {
          return this.array.length > this.index;
        }
        hasCompleted() {
          return this.array.length === this.index;
        }
      }
      class py extends V {
        constructor(t, e, n) {
          super(t),
            (this.parent = e),
            (this.observable = n),
            (this.stillUnsubscribed = !0),
            (this.buffer = []),
            (this.isComplete = !1);
        }
        [I]() {
          return this;
        }
        next() {
          const t = this.buffer;
          return 0 === t.length && this.isComplete ? { value: null, done: !0 } : { value: t.shift(), done: !1 };
        }
        hasValue() {
          return this.buffer.length > 0;
        }
        hasCompleted() {
          return 0 === this.buffer.length && this.isComplete;
        }
        notifyComplete() {
          this.buffer.length > 0 ? ((this.isComplete = !0), this.parent.notifyInactive()) : this.destination.complete();
        }
        notifyNext(t) {
          this.buffer.push(t), this.parent.checkIterators();
        }
        subscribe() {
          return j(this.observable, new N(this));
        }
      }
      function fy(t) {
        return (e) => e.lift(new gy(t));
      }
      class gy {
        constructor(t) {
          this.notifier = t;
        }
        call(t, e) {
          const n = new my(t),
            r = j(this.notifier, new N(n));
          return r && !n.seenValue ? (n.add(r), e.subscribe(n)) : n;
        }
      }
      class my extends V {
        constructor(t) {
          super(t), (this.seenValue = !1);
        }
        notifyNext() {
          (this.seenValue = !0), this.complete();
        }
        notifyComplete() {}
      }
      class _y {
        constructor(t, e) {
          (this.compare = t), (this.keySelector = e);
        }
        call(t, e) {
          return e.subscribe(new yy(t, this.compare, this.keySelector));
        }
      }
      class yy extends f {
        constructor(t, e, n) {
          super(t), (this.keySelector = n), (this.hasKey = !1), 'function' == typeof e && (this.compare = e);
        }
        compare(t, e) {
          return t === e;
        }
        _next(t) {
          let e;
          try {
            const { keySelector: n } = this;
            e = n ? n(t) : t;
          } catch (r) {
            return this.destination.error(r);
          }
          let n = !1;
          if (this.hasKey)
            try {
              const { compare: t } = this;
              n = t(this.key, e);
            } catch (r) {
              return this.destination.error(r);
            }
          else this.hasKey = !0;
          n || ((this.key = e), this.destination.next(t));
        }
      }
      function vy(...t) {
        return (e) => {
          let n;
          return 'function' == typeof t[t.length - 1] && (n = t.pop()), e.lift(new by(t, n));
        };
      }
      class by {
        constructor(t, e) {
          (this.observables = t), (this.project = e);
        }
        call(t, e) {
          return e.subscribe(new wy(t, this.observables, this.project));
        }
      }
      class wy extends Od {
        constructor(t, e, n) {
          super(t), (this.observables = e), (this.project = n), (this.toRespond = []);
          const r = e.length;
          this.values = new Array(r);
          for (let s = 0; s < r; s++) this.toRespond.push(s);
          for (let s = 0; s < r; s++) this.add(Rd(this, e[s], void 0, s));
        }
        notifyNext(t, e, n) {
          this.values[n] = e;
          const r = this.toRespond;
          if (r.length > 0) {
            const t = r.indexOf(n);
            -1 !== t && r.splice(t, 1);
          }
        }
        notifyComplete() {}
        _next(t) {
          if (0 === this.toRespond.length) {
            const e = [t, ...this.values];
            this.project ? this._tryProject(e) : this.destination.next(e);
          }
        }
        _tryProject(t) {
          let e;
          try {
            e = this.project.apply(this, t);
          } catch (n) {
            return void this.destination.error(n);
          }
          this.destination.next(e);
        }
      }
      class Cy {
        constructor(t) {
          this.total = t;
        }
        call(t, e) {
          return e.subscribe(new xy(t, this.total));
        }
      }
      class xy extends f {
        constructor(t, e) {
          super(t), (this.total = e), (this.count = 0);
        }
        _next(t) {
          ++this.count > this.total && this.destination.next(t);
        }
      }
      const Sy = ['*'],
        Ey = ['dialog'];
      function ky(t) {
        return null != t;
      }
      function Ty(t) {
        return (t || document.body).getBoundingClientRect();
      }
      'undefined' == typeof Element ||
        Element.prototype.closest ||
        (Element.prototype.matches ||
          (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector),
        (Element.prototype.closest = function (t) {
          let e = this;
          if (!document.documentElement.contains(e)) return null;
          do {
            if (e.matches(t)) return e;
            e = e.parentElement || e.parentNode;
          } while (null !== e && 1 === e.nodeType);
          return null;
        }));
      const Ay = { animation: !0, transitionTimerDelayMs: 5 };
      let Oy = (() => {
        class t {
          constructor() {
            this.animation = Ay.animation;
          }
        }
        return (
          (t.??fac = function (e) {
            return new (e || t)();
          }),
          (t.??prov = pt({
            factory: function () {
              return new t();
            },
            token: t,
            providedIn: 'root',
          })),
          t
        );
      })();
      const Iy = () => {},
        { transitionTimerDelayMs: Ry } = Ay,
        Py = new Map(),
        Dy = (t, e, n, r) => {
          let s = r.context || {};
          const i = Py.get(e);
          if (i)
            switch (r.runningTransition) {
              case 'continue':
                return Vd;
              case 'stop':
                t.run(() => i.transition$.complete()), (s = Object.assign(i.context, s)), Py.delete(e);
            }
          const o = n(e, r.animation, s) || Iy;
          if (!r.animation || 'none' === window.getComputedStyle(e).transitionProperty)
            return (
              t.run(() => o()),
              Td(void 0).pipe(
                (function (t) {
                  return (e) =>
                    new y((n) =>
                      e.subscribe(
                        (e) => t.run(() => n.next(e)),
                        (e) => t.run(() => n.error(e)),
                        () => t.run(() => n.complete())
                      )
                    );
                })(t)
              )
            );
          const a = new x(),
            l = new x(),
            c = a.pipe(
              (function (...t) {
                return (e) => Nd(e, Td(...t));
              })(!0)
            );
          Py.set(e, {
            transition$: a,
            complete: () => {
              l.next(), l.complete();
            },
            context: s,
          });
          const u = (function (t) {
            const { transitionDelay: e, transitionDuration: n } = window.getComputedStyle(t);
            return 1e3 * (parseFloat(e) + parseFloat(n));
          })(e);
          return (
            t.runOutsideAngular(() => {
              const n = i_(e, 'transitionend').pipe(
                fy(c),
                Qd(({ target: t }) => t === e)
              );
              iy(
                (function (t = 0, e, n) {
                  let r = -1;
                  return (
                    ry(e) ? (r = Number(e) < 1 ? 1 : Number(e)) : E(e) && (n = e),
                    E(n) || (n = d_),
                    new y((e) => {
                      const s = ry(t) ? t : +t - n.now();
                      return n.schedule(sy, s, { index: 0, period: r, subscriber: e });
                    })
                  );
                })(u + Ry).pipe(fy(c)),
                n,
                l
              )
                .pipe(fy(c))
                .subscribe(() => {
                  Py.delete(e),
                    t.run(() => {
                      o(), a.next(), a.complete();
                    });
                });
            }),
            a.asObservable()
          );
        },
        Ly = (t, e, n) => {
          let { direction: r, maxHeight: s } = n;
          const { classList: i } = t;
          function o() {
            i.add('collapse'), 'show' === r ? i.add('show') : i.remove('show');
          }
          if (e)
            return (
              s ||
                ((s = (function (t) {
                  if ('undefined' == typeof navigator) return '0px';
                  const { classList: e } = t,
                    n = e.contains('show');
                  n || e.add('show'), (t.style.height = '');
                  const r = t.getBoundingClientRect().height + 'px';
                  return n || e.remove('show'), r;
                })(t)),
                (n.maxHeight = s),
                (t.style.height = 'show' !== r ? s : '0px'),
                i.remove('collapse'),
                i.remove('collapsing'),
                i.remove('show'),
                Ty(t),
                i.add('collapsing')),
              (t.style.height = 'show' === r ? s : '0px'),
              () => {
                o(), i.remove('collapsing'), (t.style.height = '');
              }
            );
          o();
        };
      let My = (() => {
          class t {}
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??mod = Zt({ type: t })),
            (t.??inj = ft({ imports: [[wu]] })),
            t
          );
        })(),
        Ny = (() => {
          class t {}
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??mod = Zt({ type: t })),
            (t.??inj = ft({ imports: [[wu]] })),
            t
          );
        })(),
        Vy = (() => {
          class t {}
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??mod = Zt({ type: t })),
            (t.??inj = ft({})),
            t
          );
        })(),
        jy = (() => {
          class t {}
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??mod = Zt({ type: t })),
            (t.??inj = ft({ imports: [[wu]] })),
            t
          );
        })(),
        Fy = (() => {
          class t {
            constructor(t) {
              this._ngbConfig = t;
            }
            get animation() {
              return void 0 === this._animation ? this._ngbConfig.animation : this._animation;
            }
            set animation(t) {
              this._animation = t;
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)(cr(Oy));
            }),
            (t.??prov = pt({
              factory: function () {
                return new t(cr(Oy));
              },
              token: t,
              providedIn: 'root',
            })),
            t
          );
        })(),
        Uy = (() => {
          class t {
            constructor(t, e, n) {
              (this._element = t),
                (this._zone = n),
                (this.collapsed = !1),
                (this.ngbCollapseChange = new kl()),
                (this.shown = new kl()),
                (this.hidden = new kl()),
                (this.animation = e.animation);
            }
            ngOnInit() {
              this._runTransition(this.collapsed, !1);
            }
            ngOnChanges({ collapsed: t }) {
              t.firstChange || this._runTransitionWithEvents(this.collapsed, this.animation);
            }
            toggle(t = this.collapsed) {
              (this.collapsed = !t),
                this.ngbCollapseChange.next(this.collapsed),
                this._runTransitionWithEvents(this.collapsed, this.animation);
            }
            _runTransition(t, e) {
              return Dy(this._zone, this._element.nativeElement, Ly, {
                animation: e,
                runningTransition: 'stop',
                context: { direction: t ? 'hide' : 'show' },
              });
            }
            _runTransitionWithEvents(t, e) {
              this._runTransition(t, e).subscribe(() => {
                t ? this.hidden.emit() : this.shown.emit();
              });
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)(_o(xa), _o(Fy), _o(pc));
            }),
            (t.??dir = Qt({
              type: t,
              selectors: [['', 'ngbCollapse', '']],
              inputs: { collapsed: ['ngbCollapse', 'collapsed'], animation: 'animation' },
              outputs: { ngbCollapseChange: 'ngbCollapseChange', shown: 'shown', hidden: 'hidden' },
              exportAs: ['ngbCollapse'],
              features: [ue],
            })),
            t
          );
        })(),
        Hy = (() => {
          class t {}
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??mod = Zt({ type: t })),
            (t.??inj = ft({})),
            t
          );
        })();
      var zy = (() => (
        (function (t) {
          (t[(t.Tab = 9)] = 'Tab'),
            (t[(t.Enter = 13)] = 'Enter'),
            (t[(t.Escape = 27)] = 'Escape'),
            (t[(t.Space = 32)] = 'Space'),
            (t[(t.PageUp = 33)] = 'PageUp'),
            (t[(t.PageDown = 34)] = 'PageDown'),
            (t[(t.End = 35)] = 'End'),
            (t[(t.Home = 36)] = 'Home'),
            (t[(t.ArrowLeft = 37)] = 'ArrowLeft'),
            (t[(t.ArrowUp = 38)] = 'ArrowUp'),
            (t[(t.ArrowRight = 39)] = 'ArrowRight'),
            (t[(t.ArrowDown = 40)] = 'ArrowDown');
        })(zy || (zy = {})),
        zy
      ))();
      const By = (t, e) => !!e && e.some((e) => e.contains(t)),
        $y = (t, e) =>
          !e ||
          null !=
            (function (t, e) {
              return e ? (void 0 === t.closest ? null : t.closest(e)) : null;
            })(t, e),
        qy =
          'undefined' != typeof navigator &&
          !!navigator.userAgent &&
          (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
            (/Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2) ||
            /Android/.test(navigator.userAgent));
      const Wy = [
        'a[href]',
        'button:not([disabled])',
        'input:not([disabled]):not([type="hidden"])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[contenteditable]',
        '[tabindex]:not([tabindex="-1"])',
      ].join(', ');
      function Gy(t) {
        const e = Array.from(t.querySelectorAll(Wy)).filter((t) => -1 !== t.tabIndex);
        return [e[0], e[e.length - 1]];
      }
      const Zy = /\s+/,
        Ky = new (class {
          getAllStyles(t) {
            return window.getComputedStyle(t);
          }
          getStyle(t, e) {
            return this.getAllStyles(t)[e];
          }
          isStaticPositioned(t) {
            return 'static' === (this.getStyle(t, 'position') || 'static');
          }
          offsetParent(t) {
            let e = t.offsetParent || document.documentElement;
            for (; e && e !== document.documentElement && this.isStaticPositioned(e); ) e = e.offsetParent;
            return e || document.documentElement;
          }
          position(t, e = !0) {
            let n,
              r = { width: 0, height: 0, top: 0, bottom: 0, left: 0, right: 0 };
            if ('fixed' === this.getStyle(t, 'position'))
              (n = t.getBoundingClientRect()),
                (n = { top: n.top, bottom: n.bottom, left: n.left, right: n.right, height: n.height, width: n.width });
            else {
              const e = this.offsetParent(t);
              (n = this.offset(t, !1)),
                e !== document.documentElement && (r = this.offset(e, !1)),
                (r.top += e.clientTop),
                (r.left += e.clientLeft);
            }
            return (
              (n.top -= r.top),
              (n.bottom -= r.top),
              (n.left -= r.left),
              (n.right -= r.left),
              e &&
                ((n.top = Math.round(n.top)),
                (n.bottom = Math.round(n.bottom)),
                (n.left = Math.round(n.left)),
                (n.right = Math.round(n.right))),
              n
            );
          }
          offset(t, e = !0) {
            const n = t.getBoundingClientRect(),
              r = window.pageYOffset - document.documentElement.clientTop,
              s = window.pageXOffset - document.documentElement.clientLeft;
            let i = {
              height: n.height || t.offsetHeight,
              width: n.width || t.offsetWidth,
              top: n.top + r,
              bottom: n.bottom + r,
              left: n.left + s,
              right: n.right + s,
            };
            return (
              e &&
                ((i.height = Math.round(i.height)),
                (i.width = Math.round(i.width)),
                (i.top = Math.round(i.top)),
                (i.bottom = Math.round(i.bottom)),
                (i.left = Math.round(i.left)),
                (i.right = Math.round(i.right))),
              i
            );
          }
          positionElements(t, e, n, r) {
            const [s = 'top', i = 'center'] = n.split('-'),
              o = r ? this.offset(t, !1) : this.position(t, !1),
              a = this.getAllStyles(e),
              l = parseFloat(a.marginTop),
              c = parseFloat(a.marginBottom),
              u = parseFloat(a.marginLeft),
              h = parseFloat(a.marginRight);
            let d = 0,
              p = 0;
            switch (s) {
              case 'top':
                d = o.top - (e.offsetHeight + l + c);
                break;
              case 'bottom':
                d = o.top + o.height;
                break;
              case 'start':
                p = o.left - (e.offsetWidth + u + h);
                break;
              case 'end':
                p = o.left + o.width;
            }
            switch (i) {
              case 'top':
                d = o.top;
                break;
              case 'bottom':
                d = o.top + o.height - e.offsetHeight;
                break;
              case 'start':
                p = o.left;
                break;
              case 'end':
                p = o.left + o.width - e.offsetWidth;
                break;
              case 'center':
                'top' === s || 'bottom' === s
                  ? (p = o.left + o.width / 2 - e.offsetWidth / 2)
                  : (d = o.top + o.height / 2 - e.offsetHeight / 2);
            }
            e.style.transform = `translate(${Math.round(p)}px, ${Math.round(d)}px)`;
            const f = e.getBoundingClientRect(),
              g = document.documentElement,
              m = window.innerHeight || g.clientHeight,
              _ = window.innerWidth || g.clientWidth;
            return f.left >= 0 && f.top >= 0 && f.right <= _ && f.bottom <= m;
          }
        })();
      new Date(1882, 10, 12), new Date(2174, 10, 25);
      let Qy = (() => {
          class t {}
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??mod = Zt({ type: t })),
            (t.??inj = ft({ imports: [[wu, Sd]] })),
            t
          );
        })(),
        Yy = (() => {
          class t {
            constructor() {
              (this.autoClose = !0), (this.placement = ['bottom-start', 'bottom-end', 'top-start', 'top-end']);
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??prov = pt({
              factory: function () {
                return new t();
              },
              token: t,
              providedIn: 'root',
            })),
            t
          );
        })(),
        Jy = (() => {
          class t {}
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??dir = Qt({ type: t, selectors: [['', 8, 'navbar']] })),
            t
          );
        })(),
        Xy = (() => {
          class t {
            constructor(t) {
              (this.elementRef = t), (this._disabled = !1);
            }
            set disabled(t) {
              this._disabled = '' === t || !0 === t;
            }
            get disabled() {
              return this._disabled;
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)(_o(xa));
            }),
            (t.??dir = Qt({
              type: t,
              selectors: [['', 'ngbDropdownItem', '']],
              hostAttrs: [1, 'dropdown-item'],
              hostVars: 2,
              hostBindings: function (t, e) {
                2 & t && Uo('disabled', e.disabled);
              },
              inputs: { disabled: 'disabled' },
            })),
            t
          );
        })(),
        tv = (() => {
          class t {
            constructor(t, e) {
              (this.dropdown = t),
                (this.placement = 'bottom'),
                (this.isOpen = !1),
                (this.nativeElement = e.nativeElement);
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)(_o(ot(() => rv)), _o(xa));
            }),
            (t.??dir = Qt({
              type: t,
              selectors: [['', 'ngbDropdownMenu', '']],
              contentQueries: function (t, e, n) {
                if ((1 & t && Ul(n, Xy, 4), 2 & t)) {
                  let t;
                  jl((t = Hl())) && (e.menuItems = t);
                }
              },
              hostVars: 5,
              hostBindings: function (t, e) {
                1 & t &&
                  To('keydown.ArrowUp', function (t) {
                    return e.dropdown.onKeyDown(t);
                  })('keydown.ArrowDown', function (t) {
                    return e.dropdown.onKeyDown(t);
                  })('keydown.Home', function (t) {
                    return e.dropdown.onKeyDown(t);
                  })('keydown.End', function (t) {
                    return e.dropdown.onKeyDown(t);
                  })('keydown.Enter', function (t) {
                    return e.dropdown.onKeyDown(t);
                  })('keydown.Space', function (t) {
                    return e.dropdown.onKeyDown(t);
                  })('keydown.Tab', function (t) {
                    return e.dropdown.onKeyDown(t);
                  })('keydown.Shift.Tab', function (t) {
                    return e.dropdown.onKeyDown(t);
                  }),
                  2 & t && (go('x-placement', e.placement), Uo('dropdown-menu', !0)('show', e.dropdown.isOpen()));
              },
            })),
            t
          );
        })(),
        ev = (() => {
          class t {
            constructor(t, e) {
              (this.dropdown = t), (this.nativeElement = e.nativeElement);
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)(_o(ot(() => rv)), _o(xa));
            }),
            (t.??dir = Qt({
              type: t,
              selectors: [['', 'ngbDropdownAnchor', '']],
              hostAttrs: [1, 'dropdown-toggle'],
              hostVars: 1,
              hostBindings: function (t, e) {
                2 & t && go('aria-expanded', e.dropdown.isOpen());
              },
            })),
            t
          );
        })(),
        nv = (() => {
          class t extends ev {
            constructor(t, e) {
              super(t, e);
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)(_o(ot(() => rv)), _o(xa));
            }),
            (t.??dir = Qt({
              type: t,
              selectors: [['', 'ngbDropdownToggle', '']],
              hostAttrs: [1, 'dropdown-toggle'],
              hostVars: 1,
              hostBindings: function (t, e) {
                1 & t &&
                  To('click', function () {
                    return e.dropdown.toggle();
                  })('keydown.ArrowUp', function (t) {
                    return e.dropdown.onKeyDown(t);
                  })('keydown.ArrowDown', function (t) {
                    return e.dropdown.onKeyDown(t);
                  })('keydown.Home', function (t) {
                    return e.dropdown.onKeyDown(t);
                  })('keydown.End', function (t) {
                    return e.dropdown.onKeyDown(t);
                  })('keydown.Tab', function (t) {
                    return e.dropdown.onKeyDown(t);
                  })('keydown.Shift.Tab', function (t) {
                    return e.dropdown.onKeyDown(t);
                  }),
                  2 & t && go('aria-expanded', e.dropdown.isOpen());
              },
              features: [ma([{ provide: ev, useExisting: ot(() => t) }]), ro],
            })),
            t
          );
        })(),
        rv = (() => {
          class t {
            constructor(t, e, n, r, s, i, o) {
              (this._changeDetector = t),
                (this._document = n),
                (this._ngZone = r),
                (this._elementRef = s),
                (this._renderer = i),
                (this._closed$ = new x()),
                (this._bodyContainer = null),
                (this._open = !1),
                (this.openChange = new kl()),
                (this.placement = e.placement),
                (this.container = e.container),
                (this.autoClose = e.autoClose),
                (this.display = o ? 'static' : 'dynamic'),
                (this._zoneSubscription = r.onStable.subscribe(() => {
                  this._positionMenu();
                }));
            }
            ngAfterContentInit() {
              this._ngZone.onStable.pipe($d(1)).subscribe(() => {
                this._applyPlacementClasses(), this._open && this._setCloseHandlers();
              });
            }
            ngOnChanges(t) {
              if (
                (t.container && this._open && this._applyContainer(this.container),
                t.placement && !t.placement.isFirstChange && this._applyPlacementClasses(),
                t.dropdownClass)
              ) {
                const { currentValue: e, previousValue: n } = t.dropdownClass;
                this._applyCustomDropdownClass(e, n);
              }
            }
            isOpen() {
              return this._open;
            }
            open() {
              this._open ||
                ((this._open = !0),
                this._applyContainer(this.container),
                this.openChange.emit(!0),
                this._setCloseHandlers(),
                this._anchor && this._anchor.nativeElement.focus());
            }
            _setCloseHandlers() {
              !(function (t, e, n, r, s, i, o, a) {
                var l;
                n &&
                  t.runOutsideAngular(
                    ((l = () => {
                      const l = i_(e, 'keydown').pipe(
                          fy(s),
                          Qd((t) => t.which === zy.Escape),
                          gp((t) => t.preventDefault())
                        ),
                        c = i_(e, 'mousedown').pipe(
                          k((t) => {
                            const e = t.target;
                            return (
                              2 !== t.button &&
                              !By(e, o) &&
                              ('inside' === n
                                ? By(e, i) && $y(e, a)
                                : 'outside' === n
                                ? !By(e, i)
                                : $y(e, a) || !By(e, i))
                            );
                          }),
                          fy(s)
                        ),
                        u = i_(e, 'mouseup').pipe(
                          vy(c),
                          Qd(([t, e]) => e),
                          f_(0),
                          fy(s)
                        );
                      iy([l.pipe(k((t) => 0)), u.pipe(k((t) => 1))]).subscribe((e) => t.run(() => r(e)));
                    }),
                    qy ? () => setTimeout(() => l(), 100) : l)
                  );
              })(
                this._ngZone,
                this._document,
                this.autoClose,
                (t) => {
                  this.close(), 0 === t && this._anchor.nativeElement.focus();
                },
                this._closed$,
                this._menu ? [this._menu.nativeElement] : [],
                this._anchor ? [this._anchor.nativeElement] : [],
                '.dropdown-item,.dropdown-divider'
              );
            }
            close() {
              this._open &&
                ((this._open = !1),
                this._resetContainer(),
                this._closed$.next(),
                this.openChange.emit(!1),
                this._changeDetector.markForCheck());
            }
            toggle() {
              this.isOpen() ? this.close() : this.open();
            }
            ngOnDestroy() {
              this._resetContainer(), this._closed$.next(), this._zoneSubscription.unsubscribe();
            }
            onKeyDown(t) {
              const e = t.which,
                n = this._getMenuElements();
              let r = -1,
                s = null;
              const i = this._isEventFromToggle(t);
              if (
                (!i &&
                  n.length &&
                  n.forEach((e, n) => {
                    e.contains(t.target) && (s = e), e === this._document.activeElement && (r = n);
                  }),
                e !== zy.Space && e !== zy.Enter)
              ) {
                if (e !== zy.Tab) {
                  if (i || s) {
                    if ((this.open(), n.length)) {
                      switch (e) {
                        case zy.ArrowDown:
                          r = Math.min(r + 1, n.length - 1);
                          break;
                        case zy.ArrowUp:
                          if (this._isDropup() && -1 === r) {
                            r = n.length - 1;
                            break;
                          }
                          r = Math.max(r - 1, 0);
                          break;
                        case zy.Home:
                          r = 0;
                          break;
                        case zy.End:
                          r = n.length - 1;
                      }
                      n[r].focus();
                    }
                    t.preventDefault();
                  }
                } else if (t.target && this.isOpen() && this.autoClose) {
                  if (this._anchor.nativeElement === t.target)
                    return void ('body' !== this.container || t.shiftKey
                      ? t.shiftKey && this.close()
                      : (this._renderer.setAttribute(this._menu.nativeElement, 'tabindex', '0'),
                        this._menu.nativeElement.focus(),
                        this._renderer.removeAttribute(this._menu.nativeElement, 'tabindex')));
                  if ('body' === this.container) {
                    const e = this._menu.nativeElement.querySelectorAll(Wy);
                    t.shiftKey && t.target === e[0]
                      ? (this._anchor.nativeElement.focus(), t.preventDefault())
                      : t.shiftKey ||
                        t.target !== e[e.length - 1] ||
                        (this._anchor.nativeElement.focus(), this.close());
                  } else
                    i_(t.target, 'focusout')
                      .pipe($d(1))
                      .subscribe(({ relatedTarget: t }) => {
                        this._elementRef.nativeElement.contains(t) || this.close();
                      });
                }
              } else
                !s ||
                  (!0 !== this.autoClose && 'inside' !== this.autoClose) ||
                  i_(s, 'click')
                    .pipe($d(1))
                    .subscribe(() => this.close());
            }
            _isDropup() {
              return this._elementRef.nativeElement.classList.contains('dropup');
            }
            _isEventFromToggle(t) {
              return this._anchor.nativeElement.contains(t.target);
            }
            _getMenuElements() {
              const t = this._menu;
              return null == t ? [] : t.menuItems.filter((t) => !t.disabled).map((t) => t.elementRef.nativeElement);
            }
            _positionMenu() {
              const t = this._menu;
              this.isOpen() &&
                t &&
                this._applyPlacementClasses(
                  'dynamic' === this.display
                    ? (function (t, e, n, r, s) {
                        let i = Array.isArray(n) ? n : n.split(Zy);
                        const o = [
                            'top',
                            'bottom',
                            'start',
                            'end',
                            'top-start',
                            'top-end',
                            'bottom-start',
                            'bottom-end',
                            'start-top',
                            'start-bottom',
                            'end-top',
                            'end-bottom',
                          ],
                          a = (t) => {
                            const [e, n] = t.split('-'),
                              r = [];
                            return r;
                          };
                        let l = i.findIndex((t) => 'auto' === t);
                        l >= 0 &&
                          o.forEach(function (t) {
                            null == i.find((e) => -1 !== e.search('^' + t)) && i.splice(l++, 1, t);
                          });
                        const c = e.style;
                        (c.position = 'absolute'), (c.top = '0'), (c.left = '0'), (c['will-change'] = 'transform');
                        let u = null,
                          h = !1;
                        for (u of i) {
                          a(u);
                          if (Ky.positionElements(t, e, u, r)) {
                            h = !0;
                            break;
                          }
                        }
                        return h || ((u = i[0]), a(u), Ky.positionElements(t, e, u, r)), u;
                      })(
                        this._anchor.nativeElement,
                        this._bodyContainer || this._menu.nativeElement,
                        this.placement,
                        'body' === this.container
                      )
                    : this._getFirstPlacement(this.placement)
                );
            }
            _getFirstPlacement(t) {
              return Array.isArray(t) ? t[0] : t.split(' ')[0];
            }
            _resetContainer() {
              const t = this._renderer;
              if (this._menu) {
                const e = this._menu.nativeElement;
                t.appendChild(this._elementRef.nativeElement, e),
                  t.removeStyle(e, 'position'),
                  t.removeStyle(e, 'transform');
              }
              this._bodyContainer &&
                (t.removeChild(this._document.body, this._bodyContainer), (this._bodyContainer = null));
            }
            _applyContainer(t = null) {
              if ((this._resetContainer(), 'body' === t)) {
                const t = this._renderer,
                  e = this._menu.nativeElement,
                  n = (this._bodyContainer = this._bodyContainer || t.createElement('div'));
                t.setStyle(n, 'position', 'absolute'),
                  t.setStyle(e, 'position', 'static'),
                  t.setStyle(n, 'z-index', '1050'),
                  t.appendChild(n, e),
                  t.appendChild(this._document.body, n);
              }
              this._applyCustomDropdownClass(this.dropdownClass);
            }
            _applyCustomDropdownClass(t, e) {
              const n = 'body' === this.container ? this._bodyContainer : this._elementRef.nativeElement;
              n && (e && this._renderer.removeClass(n, e), t && this._renderer.addClass(n, t));
            }
            _applyPlacementClasses(t) {
              const e = this._menu;
              if (e) {
                t || (t = this._getFirstPlacement(this.placement));
                const n = this._renderer,
                  r = this._elementRef.nativeElement;
                n.removeClass(r, 'dropup'),
                  n.removeClass(r, 'dropdown'),
                  (e.placement = 'static' === this.display ? null : t);
                const s = -1 !== t.search('^top') ? 'dropup' : 'dropdown';
                n.addClass(r, s);
                const i = this._bodyContainer;
                i && (n.removeClass(i, 'dropup'), n.removeClass(i, 'dropdown'), n.addClass(i, s));
              }
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)(_o(Ka), _o(Yy), _o(Wc), _o(pc), _o(xa), _o(ka), _o(Jy, 8));
            }),
            (t.??dir = Qt({
              type: t,
              selectors: [['', 'ngbDropdown', '']],
              contentQueries: function (t, e, n) {
                if ((1 & t && (Ul(n, tv, 5), Ul(n, ev, 5)), 2 & t)) {
                  let t;
                  jl((t = Hl())) && (e._menu = t.first), jl((t = Hl())) && (e._anchor = t.first);
                }
              },
              hostVars: 2,
              hostBindings: function (t, e) {
                2 & t && Uo('show', e.isOpen());
              },
              inputs: {
                _open: ['open', '_open'],
                placement: 'placement',
                container: 'container',
                autoClose: 'autoClose',
                display: 'display',
                dropdownClass: 'dropdownClass',
              },
              outputs: { openChange: 'openChange' },
              exportAs: ['ngbDropdown'],
              features: [ue],
            })),
            t
          );
        })(),
        sv = (() => {
          class t {}
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??mod = Zt({ type: t })),
            (t.??inj = ft({})),
            t
          );
        })(),
        iv = (() => {
          class t {
            constructor(t) {
              (this._ngbConfig = t), (this.backdrop = !0), (this.keyboard = !0);
            }
            get animation() {
              return void 0 === this._animation ? this._ngbConfig.animation : this._animation;
            }
            set animation(t) {
              this._animation = t;
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)(cr(Oy));
            }),
            (t.??prov = pt({
              factory: function () {
                return new t(cr(Oy));
              },
              token: t,
              providedIn: 'root',
            })),
            t
          );
        })();
      class ov {
        constructor(t, e, n) {
          (this.nodes = t), (this.viewRef = e), (this.componentRef = n);
        }
      }
      const av = () => {};
      let lv = (() => {
          class t {
            constructor(t) {
              this._document = t;
            }
            compensate() {
              const t = this._getWidth();
              return this._isPresent(t) ? this._adjustBody(t) : av;
            }
            _adjustBody(t) {
              const e = this._document.body,
                n = e.style.paddingRight,
                r = parseFloat(window.getComputedStyle(e)['padding-right']);
              return (e.style['padding-right'] = `${r + t}px`), () => (e.style['padding-right'] = n);
            }
            _isPresent(t) {
              const e = this._document.body.getBoundingClientRect();
              return window.innerWidth - (e.left + e.right) >= t - 0.1 * t;
            }
            _getWidth() {
              const t = this._document.createElement('div');
              t.className = 'modal-scrollbar-measure';
              const e = this._document.body;
              e.appendChild(t);
              const n = t.getBoundingClientRect().width - t.clientWidth;
              return e.removeChild(t), n;
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)(cr(Wc));
            }),
            (t.??prov = pt({
              factory: function () {
                return new t(cr(Wc));
              },
              token: t,
              providedIn: 'root',
            })),
            t
          );
        })(),
        cv = (() => {
          class t {
            constructor(t, e) {
              (this._el = t), (this._zone = e);
            }
            ngOnInit() {
              this._zone.onStable
                .asObservable()
                .pipe($d(1))
                .subscribe(() => {
                  Dy(
                    this._zone,
                    this._el.nativeElement,
                    (t, e) => {
                      e && Ty(t), t.classList.add('show');
                    },
                    { animation: this.animation, runningTransition: 'continue' }
                  );
                });
            }
            hide() {
              return Dy(this._zone, this._el.nativeElement, ({ classList: t }) => t.remove('show'), {
                animation: this.animation,
                runningTransition: 'stop',
              });
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)(_o(xa), _o(pc));
            }),
            (t.??cmp = $t({
              type: t,
              selectors: [['ngb-modal-backdrop']],
              hostAttrs: [2, 'z-index', '1050'],
              hostVars: 6,
              hostBindings: function (t, e) {
                2 & t &&
                  (Ho('modal-backdrop' + (e.backdropClass ? ' ' + e.backdropClass : '')),
                  Uo('show', !e.animation)('fade', e.animation));
              },
              inputs: { animation: 'animation', backdropClass: 'backdropClass' },
              decls: 0,
              vars: 0,
              template: function (t, e) {},
              encapsulation: 2,
            })),
            t
          );
        })();
      class uv {
        close(t) {}
        dismiss(t) {}
      }
      class hv {
        constructor(t, e, n, r) {
          (this._windowCmptRef = t),
            (this._contentRef = e),
            (this._backdropCmptRef = n),
            (this._beforeDismiss = r),
            (this._closed = new x()),
            (this._dismissed = new x()),
            (this._hidden = new x()),
            t.instance.dismissEvent.subscribe((t) => {
              this.dismiss(t);
            }),
            (this.result = new Promise((t, e) => {
              (this._resolve = t), (this._reject = e);
            })),
            this.result.then(null, () => {});
        }
        get componentInstance() {
          if (this._contentRef && this._contentRef.componentRef) return this._contentRef.componentRef.instance;
        }
        get closed() {
          return this._closed.asObservable().pipe(fy(this._hidden));
        }
        get dismissed() {
          return this._dismissed.asObservable().pipe(fy(this._hidden));
        }
        get hidden() {
          return this._hidden.asObservable();
        }
        get shown() {
          return this._windowCmptRef.instance.shown.asObservable();
        }
        close(t) {
          this._windowCmptRef && (this._closed.next(t), this._resolve(t), this._removeModalElements());
        }
        _dismiss(t) {
          this._dismissed.next(t), this._reject(t), this._removeModalElements();
        }
        dismiss(t) {
          if (this._windowCmptRef)
            if (this._beforeDismiss) {
              const e = this._beforeDismiss();
              e && e.then
                ? e.then(
                    (e) => {
                      !1 !== e && this._dismiss(t);
                    },
                    () => {}
                  )
                : !1 !== e && this._dismiss(t);
            } else this._dismiss(t);
        }
        _removeModalElements() {
          const t = this._windowCmptRef.instance.hide(),
            e = this._backdropCmptRef ? this._backdropCmptRef.instance.hide() : Td(void 0);
          t.subscribe(() => {
            const { nativeElement: t } = this._windowCmptRef.location;
            t.parentNode.removeChild(t),
              this._windowCmptRef.destroy(),
              this._contentRef && this._contentRef.viewRef && this._contentRef.viewRef.destroy(),
              (this._windowCmptRef = null),
              (this._contentRef = null);
          }),
            e.subscribe(() => {
              if (this._backdropCmptRef) {
                const { nativeElement: t } = this._backdropCmptRef.location;
                t.parentNode.removeChild(t), this._backdropCmptRef.destroy(), (this._backdropCmptRef = null);
              }
            }),
            ly(t, e).subscribe(() => {
              this._hidden.next(), this._hidden.complete();
            });
        }
      }
      var dv = (() => (
        (function (t) {
          (t[(t.BACKDROP_CLICK = 0)] = 'BACKDROP_CLICK'), (t[(t.ESC = 1)] = 'ESC');
        })(dv || (dv = {})),
        dv
      ))();
      let pv = (() => {
          class t {
            constructor(t, e, n) {
              (this._document = t),
                (this._elRef = e),
                (this._zone = n),
                (this._closed$ = new x()),
                (this._elWithFocus = null),
                (this.backdrop = !0),
                (this.keyboard = !0),
                (this.dismissEvent = new kl()),
                (this.shown = new x()),
                (this.hidden = new x());
            }
            dismiss(t) {
              this.dismissEvent.emit(t);
            }
            ngOnInit() {
              (this._elWithFocus = this._document.activeElement),
                this._zone.onStable
                  .asObservable()
                  .pipe($d(1))
                  .subscribe(() => {
                    this._show();
                  });
            }
            ngOnDestroy() {
              this._disableEventHandling();
            }
            hide() {
              const { nativeElement: t } = this._elRef,
                e = { animation: this.animation, runningTransition: 'stop' },
                n = ly(
                  Dy(this._zone, t, () => t.classList.remove('show'), e),
                  Dy(this._zone, this._dialogEl.nativeElement, () => {}, e)
                );
              return (
                n.subscribe(() => {
                  this.hidden.next(), this.hidden.complete();
                }),
                this._disableEventHandling(),
                this._restoreFocus(),
                n
              );
            }
            _show() {
              const t = { animation: this.animation, runningTransition: 'continue' };
              ly(
                Dy(
                  this._zone,
                  this._elRef.nativeElement,
                  (t, e) => {
                    e && Ty(t), t.classList.add('show');
                  },
                  t
                ),
                Dy(this._zone, this._dialogEl.nativeElement, () => {}, t)
              ).subscribe(() => {
                this.shown.next(), this.shown.complete();
              }),
                this._enableEventHandling(),
                this._setFocus();
            }
            _enableEventHandling() {
              const { nativeElement: t } = this._elRef;
              this._zone.runOutsideAngular(() => {
                i_(t, 'keydown')
                  .pipe(
                    fy(this._closed$),
                    Qd((t) => t.which === zy.Escape)
                  )
                  .subscribe((t) => {
                    this.keyboard
                      ? requestAnimationFrame(() => {
                          t.defaultPrevented || this._zone.run(() => this.dismiss(dv.ESC));
                        })
                      : 'static' === this.backdrop && this._bumpBackdrop();
                  });
                let e = !1;
                i_(this._dialogEl.nativeElement, 'mousedown')
                  .pipe(
                    fy(this._closed$),
                    gp(() => (e = !1)),
                    Ud(() => i_(t, 'mouseup').pipe(fy(this._closed$), $d(1))),
                    Qd(({ target: e }) => t === e)
                  )
                  .subscribe(() => {
                    e = !0;
                  }),
                  i_(t, 'click')
                    .pipe(fy(this._closed$))
                    .subscribe(({ target: n }) => {
                      t === n &&
                        ('static' === this.backdrop
                          ? this._bumpBackdrop()
                          : !0 !== this.backdrop || e || this._zone.run(() => this.dismiss(dv.BACKDROP_CLICK))),
                        (e = !1);
                    });
              });
            }
            _disableEventHandling() {
              this._closed$.next();
            }
            _setFocus() {
              const { nativeElement: t } = this._elRef;
              if (!t.contains(document.activeElement)) {
                const e = t.querySelector('[ngbAutofocus]'),
                  n = Gy(t)[0];
                (e || n || t).focus();
              }
            }
            _restoreFocus() {
              const t = this._document.body,
                e = this._elWithFocus;
              let n;
              (n = e && e.focus && t.contains(e) ? e : t),
                this._zone.runOutsideAngular(() => {
                  setTimeout(() => n.focus()), (this._elWithFocus = null);
                });
            }
            _bumpBackdrop() {
              'static' === this.backdrop &&
                Dy(
                  this._zone,
                  this._elRef.nativeElement,
                  ({ classList: t }) => (t.add('modal-static'), () => t.remove('modal-static')),
                  { animation: this.animation, runningTransition: 'continue' }
                );
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)(_o(Wc), _o(xa), _o(pc));
            }),
            (t.??cmp = $t({
              type: t,
              selectors: [['ngb-modal-window']],
              viewQuery: function (t, e) {
                if ((1 & t && Fl(Ey, 7), 2 & t)) {
                  let t;
                  jl((t = Hl())) && (e._dialogEl = t.first);
                }
              },
              hostAttrs: ['role', 'dialog', 'tabindex', '-1'],
              hostVars: 7,
              hostBindings: function (t, e) {
                2 & t &&
                  (go('aria-modal', !0)('aria-labelledby', e.ariaLabelledBy)('aria-describedby', e.ariaDescribedBy),
                  Ho('modal d-block' + (e.windowClass ? ' ' + e.windowClass : '')),
                  Uo('fade', e.animation));
              },
              inputs: {
                backdrop: 'backdrop',
                keyboard: 'keyboard',
                animation: 'animation',
                ariaLabelledBy: 'ariaLabelledBy',
                ariaDescribedBy: 'ariaDescribedBy',
                centered: 'centered',
                scrollable: 'scrollable',
                size: 'size',
                windowClass: 'windowClass',
                modalDialogClass: 'modalDialogClass',
              },
              outputs: { dismissEvent: 'dismiss' },
              ngContentSelectors: Sy,
              decls: 8,
              vars: 2,
              consts: [
                ['role', 'document'],
                ['dialog', ''],
                [1, 'modal-content'],
              ],
              template: function (t, e) {
                1 & t &&
                  (Po(),
                  Yo(0, '\n    '),
                  bo(1, 'div', 0, 1),
                  Yo(3, '\n        '),
                  bo(4, 'div', 2),
                  Do(5),
                  wo(),
                  Yo(6, '\n    '),
                  wo(),
                  Yo(7, '\n    ')),
                  2 & t &&
                    (qs(1),
                    Ho(
                      'modal-dialog' +
                        (e.size ? ' modal-' + e.size : '') +
                        (e.centered ? ' modal-dialog-centered' : '') +
                        (e.scrollable ? ' modal-dialog-scrollable' : '') +
                        (e.modalDialogClass ? ' ' + e.modalDialogClass : '')
                    ));
              },
              styles: [
                'ngb-modal-window .component-host-scrollable{display:flex;flex-direction:column;overflow:hidden}',
              ],
              encapsulation: 2,
            })),
            t
          );
        })(),
        fv = (() => {
          class t {
            constructor(t, e, n, r, s, i) {
              (this._applicationRef = t),
                (this._injector = e),
                (this._document = n),
                (this._scrollBar = r),
                (this._rendererFactory = s),
                (this._ngZone = i),
                (this._activeWindowCmptHasChanged = new x()),
                (this._ariaHiddenValues = new Map()),
                (this._backdropAttributes = ['animation', 'backdropClass']),
                (this._modalRefs = []),
                (this._windowAttributes = [
                  'animation',
                  'ariaLabelledBy',
                  'ariaDescribedBy',
                  'backdrop',
                  'centered',
                  'keyboard',
                  'scrollable',
                  'size',
                  'windowClass',
                  'modalDialogClass',
                ]),
                (this._windowCmpts = []),
                (this._activeInstances = new kl()),
                this._activeWindowCmptHasChanged.subscribe(() => {
                  if (this._windowCmpts.length) {
                    const t = this._windowCmpts[this._windowCmpts.length - 1];
                    ((t, e, n, r = !1) => {
                      this._ngZone.runOutsideAngular(() => {
                        const t = i_(e, 'focusin').pipe(
                          fy(n),
                          k((t) => t.target)
                        );
                        i_(e, 'keydown')
                          .pipe(
                            fy(n),
                            Qd((t) => t.which === zy.Tab),
                            vy(t)
                          )
                          .subscribe(([t, n]) => {
                            const [r, s] = Gy(e);
                            (n !== r && n !== e) || !t.shiftKey || (s.focus(), t.preventDefault()),
                              n !== s || t.shiftKey || (r.focus(), t.preventDefault());
                          }),
                          r &&
                            i_(e, 'click')
                              .pipe(
                                fy(n),
                                vy(t),
                                k((t) => t[1])
                              )
                              .subscribe((t) => t.focus());
                      });
                    })(0, t.location.nativeElement, this._activeWindowCmptHasChanged),
                      this._revertAriaHidden(),
                      this._setAriaHidden(t.location.nativeElement);
                  }
                });
            }
            open(t, e, n, r) {
              const s =
                  r.container instanceof HTMLElement
                    ? r.container
                    : ky(r.container)
                    ? this._document.querySelector(r.container)
                    : this._document.body,
                i = this._rendererFactory.createRenderer(null, null),
                o = this._scrollBar.compensate(),
                a = () => {
                  this._modalRefs.length ||
                    (i.removeClass(this._document.body, 'modal-open'), this._revertAriaHidden());
                };
              if (!s)
                throw new Error(`The specified modal container "${r.container || 'body'}" was not found in the DOM.`);
              const l = new uv(),
                c = this._getContentRef(t, r.injector || e, n, l, r);
              let u = !1 !== r.backdrop ? this._attachBackdrop(t, s) : void 0,
                h = this._attachWindowComponent(t, s, c),
                d = new hv(h, c, u, r.beforeDismiss);
              return (
                this._registerModalRef(d),
                this._registerWindowCmpt(h),
                d.result.then(o, o),
                d.result.then(a, a),
                (l.close = (t) => {
                  d.close(t);
                }),
                (l.dismiss = (t) => {
                  d.dismiss(t);
                }),
                this._applyWindowOptions(h.instance, r),
                1 === this._modalRefs.length && i.addClass(this._document.body, 'modal-open'),
                u && u.instance && (this._applyBackdropOptions(u.instance, r), u.changeDetectorRef.detectChanges()),
                h.changeDetectorRef.detectChanges(),
                d
              );
            }
            get activeInstances() {
              return this._activeInstances;
            }
            dismissAll(t) {
              this._modalRefs.forEach((e) => e.dismiss(t));
            }
            hasOpenModals() {
              return this._modalRefs.length > 0;
            }
            _attachBackdrop(t, e) {
              let n = t.resolveComponentFactory(cv).create(this._injector);
              return this._applicationRef.attachView(n.hostView), e.appendChild(n.location.nativeElement), n;
            }
            _attachWindowComponent(t, e, n) {
              let r = t.resolveComponentFactory(pv).create(this._injector, n.nodes);
              return this._applicationRef.attachView(r.hostView), e.appendChild(r.location.nativeElement), r;
            }
            _applyWindowOptions(t, e) {
              this._windowAttributes.forEach((n) => {
                ky(e[n]) && (t[n] = e[n]);
              });
            }
            _applyBackdropOptions(t, e) {
              this._backdropAttributes.forEach((n) => {
                ky(e[n]) && (t[n] = e[n]);
              });
            }
            _getContentRef(t, e, n, r, s) {
              return n
                ? n instanceof tl
                  ? this._createFromTemplateRef(n, r)
                  : 'string' == typeof n
                  ? this._createFromString(n)
                  : this._createFromComponent(t, e, n, r, s)
                : new ov([]);
            }
            _createFromTemplateRef(t, e) {
              const n = t.createEmbeddedView({
                $implicit: e,
                close(t) {
                  e.close(t);
                },
                dismiss(t) {
                  e.dismiss(t);
                },
              });
              return this._applicationRef.attachView(n), new ov([n.rootNodes], n);
            }
            _createFromString(t) {
              const e = this._document.createTextNode(`${t}`);
              return new ov([[e]]);
            }
            _createFromComponent(t, e, n, r, s) {
              const i = t.resolveComponentFactory(n),
                o = eo.create({ providers: [{ provide: uv, useValue: r }], parent: e }),
                a = i.create(o),
                l = a.location.nativeElement;
              return (
                s.scrollable && l.classList.add('component-host-scrollable'),
                this._applicationRef.attachView(a.hostView),
                new ov([[l]], a.hostView, a)
              );
            }
            _setAriaHidden(t) {
              const e = t.parentElement;
              e &&
                t !== this._document.body &&
                (Array.from(e.children).forEach((e) => {
                  e !== t &&
                    'SCRIPT' !== e.nodeName &&
                    (this._ariaHiddenValues.set(e, e.getAttribute('aria-hidden')),
                    e.setAttribute('aria-hidden', 'true'));
                }),
                this._setAriaHidden(e));
            }
            _revertAriaHidden() {
              this._ariaHiddenValues.forEach((t, e) => {
                t ? e.setAttribute('aria-hidden', t) : e.removeAttribute('aria-hidden');
              }),
                this._ariaHiddenValues.clear();
            }
            _registerModalRef(t) {
              const e = () => {
                const e = this._modalRefs.indexOf(t);
                e > -1 && (this._modalRefs.splice(e, 1), this._activeInstances.emit(this._modalRefs));
              };
              this._modalRefs.push(t), this._activeInstances.emit(this._modalRefs), t.result.then(e, e);
            }
            _registerWindowCmpt(t) {
              this._windowCmpts.push(t),
                this._activeWindowCmptHasChanged.next(),
                t.onDestroy(() => {
                  const e = this._windowCmpts.indexOf(t);
                  e > -1 && (this._windowCmpts.splice(e, 1), this._activeWindowCmptHasChanged.next());
                });
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)(cr(Lc), cr(eo), cr(Wc), cr(lv), cr(Ea), cr(pc));
            }),
            (t.??prov = pt({
              factory: function () {
                return new t(cr(Lc), cr(Ui), cr(Wc), cr(lv), cr(Ea), cr(pc));
              },
              token: t,
              providedIn: 'root',
            })),
            t
          );
        })(),
        gv = (() => {
          class t {
            constructor(t, e, n, r) {
              (this._moduleCFR = t), (this._injector = e), (this._modalStack = n), (this._config = r);
            }
            open(t, e = {}) {
              const n = Object.assign(
                Object.assign(Object.assign({}, this._config), { animation: this._config.animation }),
                e
              );
              return this._modalStack.open(this._moduleCFR, this._injector, t, n);
            }
            get activeInstances() {
              return this._modalStack.activeInstances;
            }
            dismissAll(t) {
              this._modalStack.dismissAll(t);
            }
            hasOpenModals() {
              return this._modalStack.hasOpenModals();
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)(cr(va), cr(eo), cr(fv), cr(iv));
            }),
            (t.??prov = pt({
              factory: function () {
                return new t(cr(va), cr(Ui), cr(fv), cr(iv));
              },
              token: t,
              providedIn: 'root',
            })),
            t
          );
        })(),
        mv = (() => {
          class t {}
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??mod = Zt({ type: t })),
            (t.??inj = ft({ providers: [gv] })),
            t
          );
        })(),
        _v = (() => {
          class t {}
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??mod = Zt({ type: t })),
            (t.??inj = ft({ imports: [[wu]] })),
            t
          );
        })(),
        yv = (() => {
          class t {}
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??mod = Zt({ type: t })),
            (t.??inj = ft({ imports: [[wu]] })),
            t
          );
        })(),
        vv = (() => {
          class t {}
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??mod = Zt({ type: t })),
            (t.??inj = ft({ imports: [[wu]] })),
            t
          );
        })(),
        bv = (() => {
          class t {}
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??mod = Zt({ type: t })),
            (t.??inj = ft({ imports: [[wu]] })),
            t
          );
        })(),
        wv = (() => {
          class t {}
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??mod = Zt({ type: t })),
            (t.??inj = ft({ imports: [[wu]] })),
            t
          );
        })(),
        Cv = (() => {
          class t {}
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??mod = Zt({ type: t })),
            (t.??inj = ft({ imports: [[wu]] })),
            t
          );
        })(),
        xv = (() => {
          class t {}
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??mod = Zt({ type: t })),
            (t.??inj = ft({ imports: [[wu]] })),
            t
          );
        })(),
        Sv = (() => {
          class t {}
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??mod = Zt({ type: t })),
            (t.??inj = ft({})),
            t
          );
        })();
      new qn('live announcer delay', {
        providedIn: 'root',
        factory: function () {
          return 100;
        },
      });
      let Ev = (() => {
        class t {}
        return (
          (t.??fac = function (e) {
            return new (e || t)();
          }),
          (t.??mod = Zt({ type: t })),
          (t.??inj = ft({ imports: [[wu]] })),
          t
        );
      })();
      const kv = [My, Ny, Vy, jy, Hy, Qy, sv, mv, _v, yv, vv, bv, wv, Cv, xv, Sv, Ev];
      let Tv = (() => {
        class t {}
        return (
          (t.??fac = function (e) {
            return new (e || t)();
          }),
          (t.??mod = Zt({ type: t })),
          (t.??inj = ft({ imports: [kv, My, Ny, Vy, jy, Hy, Qy, sv, mv, _v, yv, vv, bv, wv, Cv, xv, Sv, Ev] })),
          t
        );
      })();
      const Av = !0,
        Ov = '1.0.0',
        Iv = ['en-US', 'fr-FR'];
      let Rv = (() => {
          class t {}
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??mod = Zt({ type: t })),
            (t.??inj = ft({ imports: [[ny, wu]] })),
            t
          );
        })(),
        Pv = (() => {
          class t {
            intercept(t, e) {
              return (
                /^(http|https):/i.test(t.url) || (t = t.clone({ url: 'https://api.chucknorris.io' + t.url })),
                e.handle(t)
              );
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??prov = pt({ token: t, factory: t.??fac, providedIn: 'root' })),
            t
          );
        })();
      var Dv = (() => (
        (function (t) {
          (t[(t.Off = 0)] = 'Off'),
            (t[(t.Error = 1)] = 'Error'),
            (t[(t.Warning = 2)] = 'Warning'),
            (t[(t.Info = 3)] = 'Info'),
            (t[(t.Debug = 4)] = 'Debug');
        })(Dv || (Dv = {})),
        Dv
      ))();
      class Lv {
        constructor(t) {
          this.source = t;
        }
        static enableProductionMode() {
          Lv.level = Dv.Warning;
        }
        debug(...t) {
          this.log(console.log, Dv.Debug, t);
        }
        info(...t) {
          this.log(console.info, Dv.Info, t);
        }
        warn(...t) {
          this.log(console.warn, Dv.Warning, t);
        }
        error(...t) {
          this.log(console.error, Dv.Error, t);
        }
        log(t, e, n) {
          if (e <= Lv.level) {
            const r = this.source ? ['[' + this.source + ']'].concat(n) : n;
            t.apply(console, r), Lv.outputs.forEach((t) => t.apply(t, [this.source, e, ...n]));
          }
        }
      }
      (Lv.level = Dv.Debug), (Lv.outputs = []);
      new Lv('ErrorHandlerInterceptor');
      let Mv = (() => {
          class t {
            intercept(t, e) {
              return e.handle(t).pipe(Xd((t) => this.errorHandler(t)));
            }
            errorHandler(t) {
              throw t;
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??prov = pt({ token: t, factory: t.??fac, providedIn: 'root' })),
            t
          );
        })(),
        Nv = (() => {
          class t extends Ug {
            shouldDetach(t) {
              return !1;
            }
            store(t, e) {}
            shouldAttach(t) {
              return !1;
            }
            retrieve(t) {
              return null;
            }
            shouldReuseRoute(t, e) {
              var n, r, s;
              return (
                t.routeConfig === e.routeConfig ||
                Boolean(
                  (null === (n = t.routeConfig) || void 0 === n ? void 0 : n.component) &&
                    (null === (r = t.routeConfig) || void 0 === r ? void 0 : r.component) ===
                      (null === (s = e.routeConfig) || void 0 === s ? void 0 : s.component)
                )
              );
            }
          }
          return (
            (t.??fac = (function () {
              let e;
              return function (n) {
                return (e || (e = Un(t)))(n || t);
              };
            })()),
            (t.??prov = pt({ token: t, factory: t.??fac })),
            t
          );
        })();
      const Vv = jt,
        jv = Symbol('__destroy'),
        Fv = Symbol('__decoratorApplied');
      function Uv(t) {
        return 'string' == typeof t ? Symbol(`__destroy__${t}`) : jv;
      }
      function Hv(t, e) {
        t[e] || (t[e] = new x());
      }
      function zv(t, e) {
        t[e] && (t[e].next(), t[e].complete(), (t[e] = null));
      }
      function Bv(t) {
        t instanceof h && t.unsubscribe();
      }
      function $v(t, e) {
        return function () {
          var n, r;
          if ((t && t.call(this), zv(this, Uv()), e.arrayName))
            return (r = this[e.arrayName]), void (Array.isArray(r) && r.forEach(Bv));
          if (e.checkProperties)
            for (const t in this) (null === (n = e.blackList) || void 0 === n ? void 0 : n.includes(t)) || Bv(this[t]);
        };
      }
      function qv(t = {}) {
        return (e) => {
          e[Vv]
            ? (function (t, e) {
                const n = t.??pipe;
                n.onDestroy = $v(n.onDestroy, e);
              })(e, t)
            : (function (t, e) {
                t.prototype.ngOnDestroy = $v(t.prototype.ngOnDestroy, e);
              })(e, t),
            (function (t) {
              t.prototype[Fv] = !0;
            })(e);
        };
      }
      function Wv(t, e) {
        return (n) => {
          const r = Uv(e);
          return (
            'string' == typeof e
              ? (function (t, e, n) {
                  const r = t[e];
                  Hv(t, n),
                    (t[e] = function () {
                      r.apply(this, arguments), zv(this, n), (t[e] = r);
                    });
                })(t, e, r)
              : Hv(t, r),
            n.pipe(fy(t[r]))
          );
        };
      }
      let Gv = (() => {
        class t {}
        return (
          (t.??fac = function (e) {
            return new (e || t)();
          }),
          (t.??mod = Zt({ type: t })),
          (t.??inj = ft({ imports: [[wu, ny, Tv]] })),
          t
        );
      })();
      const Zv = JSON.parse(
          '{"APP_NAME":"du-app","About":"About","Hello world !":"Hello world !","Home":"Home","Logged in as":"Logged in as","Login":"Login","Logout":"Logout","Password":"Password","Password is required":"Password is required","Username":"Username","Username is required":"Username is required","Username or password incorrect.":"Username or password incorrect.","Remember me":"Remember me","Version":"Version"}'
        ),
        Kv = JSON.parse(
          '{"APP_NAME":"ngX-Rocket","About":"A propos","Hello world !":"Bonjour le monde !","Home":"Accueil","Logged in as":"Connect\xe9 en tant que","Login":"Connexion","Logout":"D\xe9connexion","Password":"Mot de passe","Password is required":"Mot de passe requis","Username":"Identifiant","Username is required":"Identifiant requis","Username or password incorrect.":"Identifiant ou mot de passe incorrect.","Remember me":"Rester connect\xe9","Version":"Version"}'
        ),
        Qv = new Lv('I18nService'),
        Yv = 'language';
      let Jv = (() => {
        class t {
          constructor(t) {
            (this.translateService = t), t.setTranslation('en-US', Zv), t.setTranslation('fr-FR', Kv);
          }
          init(t, e) {
            (this.defaultLanguage = t),
              (this.supportedLanguages = e),
              (this.language = ''),
              (this.langChangeSubscription = this.translateService.onLangChange.subscribe((t) => {
                localStorage.setItem(Yv, t.lang);
              }));
          }
          destroy() {
            this.langChangeSubscription && this.langChangeSubscription.unsubscribe();
          }
          set language(t) {
            t = t || localStorage.getItem(Yv) || this.translateService.getBrowserCultureLang();
            let e = this.supportedLanguages.includes(t);
            t &&
              !e &&
              ((t = t.split('-')[0]),
              (t = this.supportedLanguages.find((e) => e.startsWith(t)) || ''),
              (e = Boolean(t))),
              e || (t = this.defaultLanguage),
              Qv.debug(`Language set to ${t}`),
              this.translateService.use(t);
          }
          get language() {
            return this.translateService.currentLang;
          }
        }
        return (
          (t.??fac = function (e) {
            return new (e || t)(cr(X_));
          }),
          (t.??prov = pt({ token: t, factory: t.??fac, providedIn: 'root' })),
          t
        );
      })();
      function Xv(t, e) {
        if ((1 & t && (bo(0, 'a', 5), Yo(1), xl(2, 'translate'), wo()), 2 & t)) {
          const t = Io();
          qs(1), Xo('\n    ', Sl(2, 1, t.currentLanguage), '\n  ');
        }
      }
      function tb(t, e) {
        if ((1 & t && (Yo(0, '\n    '), bo(1, 'button', 6), Yo(2), wo(), Yo(3, '\n  ')), 2 & t)) {
          const t = Io();
          qs(2), Xo('\n      ', t.currentLanguage, '\n    ');
        }
      }
      function eb(t, e) {
        if (1 & t) {
          const t = Re();
          bo(0, 'button', 7),
            To('click', function () {
              const e = ((n = t), (Oe.lFrame.contextLView = n), n[8]).$implicit;
              var n;
              return Io().setLanguage(e);
            }),
            Yo(1),
            xl(2, 'translate'),
            wo();
        }
        if (2 & t) {
          const t = e.$implicit;
          qs(1), Xo('\n      ', Sl(2, 1, t), '\n    ');
        }
      }
      const nb = function (t) {
        return { 'nav-item': t };
      };
      let rb = (() => {
        class t {
          constructor(t) {
            (this.i18nService = t), (this.inNavbar = !1), (this.menuClass = '');
          }
          ngOnInit() {}
          setLanguage(t) {
            this.i18nService.language = t;
          }
          get currentLanguage() {
            return this.i18nService.language;
          }
          get languages() {
            return this.i18nService.supportedLanguages;
          }
        }
        return (
          (t.??fac = function (e) {
            return new (e || t)(_o(Jv));
          }),
          (t.??cmp = $t({
            type: t,
            selectors: [['app-language-selector']],
            inputs: { inNavbar: 'inNavbar', menuClass: 'menuClass' },
            decls: 13,
            vars: 7,
            consts: [
              ['ngbDropdown', '', 3, 'ngClass'],
              ['id', 'language-dropdown', 'class', 'nav-link', 'ngbDropdownToggle', '', 4, 'ngIf', 'ngIfElse'],
              ['button', ''],
              ['ngbDropdownMenu', '', 'aria-labelledby', 'language-dropdown', 3, 'ngClass'],
              ['class', 'dropdown-item', 3, 'click', 4, 'ngFor', 'ngForOf'],
              ['id', 'language-dropdown', 'ngbDropdownToggle', '', 1, 'nav-link'],
              ['id', 'language-dropdown', 'ngbDropdownToggle', '', 1, 'btn', 'btn-sm', 'btn-light'],
              [1, 'dropdown-item', 3, 'click'],
            ],
            template: function (t, e) {
              if (
                (1 & t &&
                  (bo(0, 'div', 0),
                  Yo(1, '\n  '),
                  mo(2, Xv, 3, 3, 'a', 1),
                  Yo(3, '\n  '),
                  mo(4, tb, 4, 1, 'ng-template', null, 2, ql),
                  Yo(6, '\n  '),
                  bo(7, 'div', 3),
                  Yo(8, '\n    '),
                  mo(9, eb, 3, 3, 'button', 4),
                  Yo(10, '\n  '),
                  wo(),
                  Yo(11, '\n'),
                  wo(),
                  Yo(12, '\n')),
                2 & t)
              ) {
                const t = Ce(Oe.lFrame.contextLView, 25);
                yo('ngClass', (5, (n = nb), (r = e.inNavbar), Cl(Re(), Ue(), 5, n, r, undefined))),
                  qs(2),
                  yo('ngIf', e.inNavbar)('ngIfElse', t),
                  qs(5),
                  yo('ngClass', e.menuClass),
                  qs(2),
                  yo('ngForOf', e.languages);
              }
              var n, r;
            },
            directives: [rv, fu, yu, tv, mu, nv],
            pipes: [ey],
            styles: ['.nav-link.dropdown-toggle[_ngcontent-%COMP%]{cursor:pointer}'],
          })),
          t
        );
      })();
      function sb(t, e, n, r) {
        var s,
          i = arguments.length,
          o = i < 3 ? e : null === r ? (r = Object.getOwnPropertyDescriptor(e, n)) : r;
        if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate) o = Reflect.decorate(t, e, n, r);
        else
          for (var a = t.length - 1; a >= 0; a--)
            (s = t[a]) && (o = (i < 3 ? s(o) : i > 3 ? s(e, n, o) : s(e, n)) || o);
        return i > 3 && o && Object.defineProperty(e, n, o), o;
      }
      const ib = 'credentials';
      let ob = (() => {
          class t {
            constructor() {
              this._credentials = null;
              const t = sessionStorage.getItem(ib) || localStorage.getItem(ib);
              t && (this._credentials = JSON.parse(t));
            }
            isAuthenticated() {
              return !!this.credentials;
            }
            get credentials() {
              return this._credentials;
            }
            setCredentials(t, e) {
              (this._credentials = t || null),
                t
                  ? (e ? localStorage : sessionStorage).setItem(ib, JSON.stringify(t))
                  : (sessionStorage.removeItem(ib), localStorage.removeItem(ib));
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??prov = pt({ token: t, factory: t.??fac, providedIn: 'root' })),
            t
          );
        })(),
        ab = (() => {
          class t {
            constructor(t) {
              this.credentialsService = t;
            }
            login(t) {
              const e = { username: t.username, token: '123456' };
              return this.credentialsService.setCredentials(e, t.remember), Td(e);
            }
            logout() {
              return this.credentialsService.setCredentials(), Td(!0);
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)(cr(ob));
            }),
            (t.??prov = pt({ token: t, factory: t.??fac, providedIn: 'root' })),
            t
          );
        })();
      const lb = new Lv('Login');
      let cb = class {
        constructor(t, e, n, r) {
          (this.router = t),
            (this.route = e),
            (this.formBuilder = n),
            (this.authenticationService = r),
            (this.version = Ov),
            (this.isLoading = !1),
            this.createForm();
        }
        ngOnInit() {}
        login() {
          (this.isLoading = !0),
            this.authenticationService
              .login(this.loginForm.value)
              .pipe(
                yp(() => {
                  this.loginForm.markAsPristine(), (this.isLoading = !1);
                }),
                Wv(this)
              )
              .subscribe(
                (t) => {
                  lb.debug(`${t.username} successfully logged in`),
                    this.router.navigate([this.route.snapshot.queryParams.redirect || '/'], { replaceUrl: !0 });
                },
                (t) => {
                  lb.debug(`Login error: ${t}`), (this.error = t);
                }
              );
        }
        createForm() {
          this.loginForm = this.formBuilder.group({
            username: ['', xh.required],
            password: ['', xh.required],
            remember: !0,
          });
        }
      };
      (cb.??fac = function (t) {
        return new (t || cb)(_o(Jg), _o(Of), _o(kd), _o(ab));
      }),
        (cb.??cmp = $t({
          type: cb,
          selectors: [['app-login']],
          decls: 89,
          vars: 13,
          consts: [
            [1, 'login-container', 'bg-light'],
            [1, 'login-box'],
            ['translate', ''],
            [1, 'd-inline-block'],
            [1, 'd-inline-block', 'ml-3'],
            [1, 'container'],
            [1, 'card', 'col-md-6', 'mt-3', 'mx-auto'],
            [1, 'card-body'],
            [1, 'card-title', 'text-center'],
            [1, 'far', 'fa-3x', 'fa-user-circle', 'text-muted'],
            ['novalidate', '', 3, 'formGroup', 'ngSubmit'],
            ['translate', '', 1, 'alert', 'alert-danger', 3, 'hidden'],
            [1, 'm-3'],
            [1, 'd-block', 'my-3'],
            [
              'type',
              'text',
              'formControlName',
              'username',
              'autocomplete',
              'username',
              1,
              'form-control',
              3,
              'placeholder',
            ],
            ['hidden', '', 'translate', ''],
            ['translate', '', 1, 'text-danger', 3, 'hidden'],
            [1, 'd-block', 'mb-3'],
            [
              'type',
              'password',
              'formControlName',
              'password',
              'autocomplete',
              'current-password',
              'required',
              '',
              1,
              'form-control',
              3,
              'placeholder',
            ],
            [1, 'form-check'],
            [1, 'form-check-label'],
            ['type', 'checkbox', 'formControlName', 'remember', 1, 'form-check-input'],
            ['type', 'submit', 1, 'btn', 'btn-primary', 'w-100', 3, 'disabled'],
            [1, 'fas', 'fa-cog', 'fa-spin', 3, 'hidden'],
          ],
          template: function (t, e) {
            1 & t &&
              (bo(0, 'div', 0),
              Yo(1, '\n  '),
              bo(2, 'div', 1),
              Yo(3, '\n    '),
              bo(4, 'h1', 2),
              Yo(5, 'APP_NAME'),
              wo(),
              Yo(6, '\n    '),
              bo(7, 'div'),
              Yo(8, '\n      '),
              bo(9, 'h6', 3),
              Yo(10),
              wo(),
              Yo(11, '\n      '),
              bo(12, 'div', 4),
              Yo(13, '\n        '),
              Co(14, 'app-language-selector'),
              Yo(15, '\n      '),
              wo(),
              Yo(16, '\n    '),
              wo(),
              Yo(17, '\n    '),
              bo(18, 'div', 5),
              Yo(19, '\n      '),
              bo(20, 'div', 6),
              Yo(21, '\n        '),
              bo(22, 'div', 7),
              Yo(23, '\n          '),
              bo(24, 'h4', 8),
              Yo(25, '\n            '),
              Co(26, 'i', 9),
              Yo(27, '\n          '),
              wo(),
              Yo(28, '\n          '),
              bo(29, 'form', 10),
              To('ngSubmit', function () {
                return e.login();
              }),
              Yo(30, '\n            '),
              bo(31, 'div', 11),
              Yo(32, '\n              Username or password incorrect.\n            '),
              wo(),
              Yo(33, '\n            '),
              bo(34, 'div', 12),
              Yo(35, '\n              '),
              bo(36, 'label', 13),
              Yo(37, '\n                '),
              Co(38, 'input', 14),
              xl(39, 'translate'),
              Yo(40, '\n                '),
              bo(41, 'span', 15),
              Yo(42, 'Username'),
              wo(),
              Yo(43, '\n                '),
              bo(44, 'small', 16),
              Yo(45, '\n                  Username is required\n                '),
              wo(),
              Yo(46, '\n              '),
              wo(),
              Yo(47, '\n              '),
              bo(48, 'label', 17),
              Yo(49, '\n                '),
              Co(50, 'input', 18),
              xl(51, 'translate'),
              Yo(52, '\n                '),
              bo(53, 'span', 15),
              Yo(54, 'Password'),
              wo(),
              Yo(55, '\n                '),
              bo(56, 'small', 16),
              Yo(57, '\n                  Password is required\n                '),
              wo(),
              Yo(58, '\n              '),
              wo(),
              Yo(59, '\n              '),
              bo(60, 'div', 19),
              Yo(61, '\n                '),
              bo(62, 'label', 20),
              Yo(63, '\n                  '),
              Co(64, 'input', 21),
              Yo(65, '\n                  '),
              bo(66, 'span', 2),
              Yo(67, 'Remember me'),
              wo(),
              Yo(68, '\n                '),
              wo(),
              Yo(69, '\n              '),
              wo(),
              Yo(70, '\n            '),
              wo(),
              Yo(71, '\n            '),
              bo(72, 'div', 12),
              Yo(73, '\n              '),
              bo(74, 'button', 22),
              Yo(75, '\n                '),
              Co(76, 'i', 23),
              Yo(77, '\n                '),
              bo(78, 'span', 2),
              Yo(79, 'Login'),
              wo(),
              Yo(80, '\n              '),
              wo(),
              Yo(81, '\n            '),
              wo(),
              Yo(82, '\n          '),
              wo(),
              Yo(83, '\n        '),
              wo(),
              Yo(84, '\n      '),
              wo(),
              Yo(85, '\n    '),
              wo(),
              Yo(86, '\n  '),
              wo(),
              Yo(87, '\n'),
              wo(),
              Yo(88, '\n')),
              2 & t &&
                (qs(10),
                Xo('v', e.version, ''),
                qs(19),
                yo('formGroup', e.loginForm),
                qs(2),
                yo('hidden', !e.error || e.isLoading),
                qs(7),
                yo('placeholder', Sl(39, 9, 'Username')),
                qs(6),
                yo('hidden', e.loginForm.controls.username.valid || e.loginForm.controls.username.untouched),
                qs(6),
                yo('placeholder', Sl(51, 11, 'Password')),
                qs(6),
                yo('hidden', e.loginForm.controls.password.valid || e.loginForm.controls.password.untouched),
                qs(18),
                yo('disabled', e.loginForm.invalid || e.isLoading),
                qs(2),
                yo('hidden', !e.isLoading));
          },
          directives: [ty, rb, fd, Gh, yd, _h, Wh, bd, Cd, fh],
          pipes: [ey],
          styles: [
            '.login-container[_ngcontent-%COMP%]{position:absolute;top:0;bottom:0;left:0;right:0}.login-box[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center;width:100%;min-height:100%}.ng-invalid.ng-touched[_ngcontent-%COMP%]:not(form){border-left:4px solid theme-color("danger")}.container[_ngcontent-%COMP%]{width:100%}',
          ],
        })),
        (cb = sb([qv()], cb));
      const ub = [{ path: 'login', component: cb, data: { title: 'Login' } }];
      let hb = (() => {
          class t {}
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??mod = Zt({ type: t })),
            (t.??inj = ft({ providers: [], imports: [[fm.forChild(ub)], fm] })),
            t
          );
        })(),
        db = (() => {
          class t {}
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??mod = Zt({ type: t })),
            (t.??inj = ft({ imports: [[wu, Ed, ny, Tv, Gv, hb]] })),
            t
          );
        })();
      const pb = new Lv('AuthenticationGuard');
      let fb = (() => {
          class t {
            constructor(t, e) {
              (this.router = t), (this.credentialsService = e);
            }
            canActivate(t, e) {
              return (
                !!this.credentialsService.isAuthenticated() ||
                (pb.debug('Not authenticated, redirecting and adding redirect url...'),
                this.router.navigate(['/login'], { queryParams: { redirect: e.url }, replaceUrl: !0 }),
                !1)
              );
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)(cr(Jg), cr(ob));
            }),
            (t.??prov = pt({ token: t, factory: t.??fac, providedIn: 'root' })),
            t
          );
        })(),
        gb = (() => {
          class t {
            constructor(t) {
              this.httpClient = t;
            }
            getRandomQuote(t) {
              return this.httpClient.get(((e = t), `/jokes/random?category=${e.category}`)).pipe(
                k((t) => t.value),
                Xd(() => Td('Error, could not load joke :-('))
              );
              var e;
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)(cr(Bm));
            }),
            (t.??prov = pt({ token: t, factory: t.??fac, providedIn: 'root' })),
            t
          );
        })(),
        mb = (() => {
          class t {
            constructor() {
              this.isLoading = !1;
            }
            ngOnInit() {}
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??cmp = $t({
              type: t,
              selectors: [['app-loader']],
              inputs: { isLoading: 'isLoading', message: 'message' },
              decls: 8,
              vars: 2,
              consts: [
                [1, 'text-xs-center', 3, 'hidden'],
                [1, 'fas', 'fa-cog', 'fa-spin', 'fa-3x'],
              ],
              template: function (t, e) {
                1 & t &&
                  (bo(0, 'div', 0),
                  Yo(1, '\n  '),
                  Co(2, 'i', 1),
                  Yo(3, ' '),
                  bo(4, 'span'),
                  Yo(5),
                  wo(),
                  Yo(6, '\n'),
                  wo(),
                  Yo(7, '\n')),
                  2 & t && (yo('hidden', !e.isLoading), qs(5), Jo(e.message));
              },
              styles: ['.fa[_ngcontent-%COMP%]{vertical-align:middle}'],
            })),
            t
          );
        })(),
        _b = (() => {
          class t {
            constructor(t) {
              (this.quoteService = t), (this.isLoading = !1);
            }
            ngOnInit() {
              (this.isLoading = !0),
                this.quoteService
                  .getRandomQuote({ category: 'dev' })
                  .pipe(
                    yp(() => {
                      this.isLoading = !1;
                    })
                  )
                  .subscribe((t) => {
                    this.quote = t;
                  });
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)(_o(gb));
            }),
            (t.??cmp = $t({
              type: t,
              selectors: [['app-home']],
              decls: 19,
              vars: 3,
              consts: [
                [1, 'container-fluid'],
                [1, 'jumbotron', 'text-center'],
                ['src', 'assets/ngx-rocket-logo.png', 'alt', 'angular logo', 1, 'logo'],
                ['translate', ''],
                [3, 'isLoading'],
                [3, 'hidden'],
              ],
              template: function (t, e) {
                1 & t &&
                  (bo(0, 'div', 0),
                  Yo(1, '\n  '),
                  bo(2, 'div', 1),
                  Yo(3, '\n    '),
                  bo(4, 'h1'),
                  Yo(5, '\n      '),
                  Co(6, 'img', 2),
                  Yo(7, '\n      '),
                  bo(8, 'span', 3),
                  Yo(9, 'Hello world !'),
                  wo(),
                  Yo(10, '\n    '),
                  wo(),
                  Yo(11, '\n    '),
                  Co(12, 'app-loader', 4),
                  Yo(13, '\n    '),
                  bo(14, 'q', 5),
                  Yo(15),
                  wo(),
                  Yo(16, '\n  '),
                  wo(),
                  Yo(17, '\n'),
                  wo(),
                  Yo(18, '\n')),
                  2 & t && (qs(12), yo('isLoading', e.isLoading), qs(2), yo('hidden', e.isLoading), qs(1), Jo(e.quote));
              },
              directives: [ty, mb],
              styles: [
                '@charset "UTF-8";.logo[_ngcontent-%COMP%]{width:100px}q[_ngcontent-%COMP%]{font-style:italic;font-size:1.2rem;quotes:"\xab " " \xbb"}',
              ],
            })),
            t
          );
        })(),
        yb = (() => {
          class t {
            constructor(t, e, n) {
              (this.router = t),
                (this.authenticationService = e),
                (this.credentialsService = n),
                (this.menuHidden = !0);
            }
            ngOnInit() {}
            toggleMenu() {
              this.menuHidden = !this.menuHidden;
            }
            logout() {
              this.authenticationService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: !0 }));
            }
            get username() {
              const t = this.credentialsService.credentials;
              return t ? t.username : null;
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)(_o(Jg), _o(ab), _o(ob));
            }),
            (t.??cmp = $t({
              type: t,
              selectors: [['app-header']],
              decls: 69,
              vars: 4,
              consts: [
                [1, 'navbar', 'navbar-expand-lg', 'navbar-dark', 'bg-dark'],
                [1, 'container-fluid'],
                ['href', 'https://github.com/ngx-rocket', 'translate', '', 1, 'navbar-brand'],
                [
                  'type',
                  'button',
                  'aria-controls',
                  'navbar-menu',
                  'aria-label',
                  'Toggle navigation',
                  1,
                  'navbar-toggler',
                  3,
                  'click',
                ],
                [1, 'navbar-toggler-icon'],
                ['id', 'navbar-menu', 1, 'collapse', 'navbar-collapse', 'float-xs-none', 3, 'ngbCollapse'],
                [1, 'navbar-nav', 'me-auto', 'mb-2', 'mb-lg-0'],
                ['routerLink', '/home', 'routerLinkActive', 'active', 1, 'nav-item', 'nav-link', 'text-uppercase'],
                [1, 'fas', 'fa-home'],
                ['translate', ''],
                ['routerLink', '/about', 'routerLinkActive', 'active', 1, 'nav-item', 'nav-link', 'text-uppercase'],
                [1, 'fas', 'fa-question-circle'],
                [1, 'navbar-nav', 'ml-auto'],
                ['menuClass', 'dropdown-menu dropdown-menu-right', 3, 'inNavbar'],
                ['ngbDropdown', '', 1, 'nav-item'],
                ['id', 'user-dropdown', 'ngbDropdownToggle', '', 1, 'nav-link'],
                [1, 'fas', 'fa-user-circle'],
                ['ngbDropdownMenu', '', 'aria-labelledby', 'user-dropdown', 1, 'dropdown-menu', 'dropdown-menu-right'],
                [1, 'dropdown-header'],
                [1, 'dropdown-divider'],
                ['translate', '', 1, 'dropdown-item', 3, 'click'],
              ],
              template: function (t, e) {
                1 & t &&
                  (bo(0, 'header'),
                  Yo(1, '\n  '),
                  bo(2, 'nav', 0),
                  Yo(3, '\n    '),
                  bo(4, 'div', 1),
                  Yo(5, '\n      '),
                  bo(6, 'a', 2),
                  Yo(7, 'APP_NAME'),
                  wo(),
                  Yo(8, '\n      '),
                  bo(9, 'button', 3),
                  To('click', function () {
                    return e.toggleMenu();
                  }),
                  Yo(10, '\n        '),
                  Co(11, 'span', 4),
                  Yo(12, '\n      '),
                  wo(),
                  Yo(13, '\n      '),
                  bo(14, 'div', 5),
                  Yo(15, '\n        '),
                  bo(16, 'div', 6),
                  Yo(17, '\n          '),
                  bo(18, 'a', 7),
                  Yo(19, '\n            '),
                  Co(20, 'i', 8),
                  Yo(21, '\n            '),
                  bo(22, 'span', 9),
                  Yo(23, 'Home'),
                  wo(),
                  Yo(24, '\n          '),
                  wo(),
                  Yo(25, '\n          '),
                  bo(26, 'a', 10),
                  Yo(27, '\n            '),
                  Co(28, 'i', 11),
                  Yo(29, '\n            '),
                  bo(30, 'span', 9),
                  Yo(31, 'About'),
                  wo(),
                  Yo(32, '\n          '),
                  wo(),
                  Yo(33, '\n        '),
                  wo(),
                  Yo(34, '\n        '),
                  bo(35, 'div', 12),
                  Yo(36, '\n          '),
                  Co(37, 'app-language-selector', 13),
                  Yo(38, '\n          '),
                  bo(39, 'div', 14),
                  Yo(40, '\n            '),
                  bo(41, 'a', 15),
                  Yo(42, '\n              '),
                  Co(43, 'i', 16),
                  Yo(44, '\n            '),
                  wo(),
                  Yo(45, '\n            '),
                  bo(46, 'div', 17),
                  Yo(47, '\n              '),
                  bo(48, 'h6', 18),
                  Yo(49, '\n                '),
                  bo(50, 'span', 9),
                  Yo(51, 'Logged in as'),
                  wo(),
                  Yo(52, ' '),
                  bo(53, 'b'),
                  Yo(54),
                  wo(),
                  Yo(55, '\n              '),
                  wo(),
                  Yo(56, '\n              '),
                  Co(57, 'div', 19),
                  Yo(58, '\n              '),
                  bo(59, 'button', 20),
                  To('click', function () {
                    return e.logout();
                  }),
                  Yo(60, 'Logout'),
                  wo(),
                  Yo(61, '\n            '),
                  wo(),
                  Yo(62, '\n          '),
                  wo(),
                  Yo(63, '\n        '),
                  wo(),
                  Yo(64, '\n      '),
                  wo(),
                  Yo(65, '\n    '),
                  wo(),
                  Yo(66, '\n  '),
                  wo(),
                  Yo(67, '\n'),
                  wo(),
                  Yo(68, '\n')),
                  2 & t &&
                    (qs(9),
                    go('aria-expanded', !e.menuHidden),
                    qs(5),
                    yo('ngbCollapse', e.menuHidden),
                    qs(23),
                    yo('inNavbar', !0),
                    qs(17),
                    Jo(e.username));
              },
              directives: [Jy, ty, Uy, em, rm, rb, rv, nv, tv],
              styles: [
                '.navbar[_ngcontent-%COMP%]{margin-bottom:1rem}.nav-link.dropdown-toggle[_ngcontent-%COMP%]{cursor:pointer}',
              ],
            })),
            t
          );
        })(),
        vb = (() => {
          class t {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??cmp = $t({
              type: t,
              selectors: [['app-shell']],
              decls: 4,
              vars: 0,
              template: function (t, e) {
                1 & t && (Co(0, 'app-header'), Yo(1, '\n'), Co(2, 'router-outlet'), Yo(3, '\n'));
              },
              directives: [yb, sm],
              styles: [''],
            })),
            t
          );
        })();
      class bb {
        static childRoutes(t) {
          return { path: '', component: vb, children: t, canActivate: [fb] };
        }
      }
      const wb = [
        bb.childRoutes([
          { path: '', redirectTo: '/home', pathMatch: 'full' },
          { path: 'home', component: _b, data: { title: 'Home' } },
        ]),
      ];
      let Cb = (() => {
          class t {}
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??mod = Zt({ type: t })),
            (t.??inj = ft({ providers: [], imports: [[fm.forChild(wb)], fm] })),
            t
          );
        })(),
        xb = (() => {
          class t {}
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??mod = Zt({ type: t })),
            (t.??inj = ft({ imports: [[wu, ny, Rv, Cb]] })),
            t
          );
        })(),
        Sb = (() => {
          class t {}
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??mod = Zt({ type: t })),
            (t.??inj = ft({ imports: [[wu, ny, Tv, db, Gv, fm]] })),
            t
          );
        })();
      const Eb = [
        bb.childRoutes([
          {
            path: 'about',
            component: (() => {
              class t {
                constructor() {
                  this.version = Ov;
                }
                ngOnInit() {}
              }
              return (
                (t.??fac = function (e) {
                  return new (e || t)();
                }),
                (t.??cmp = $t({
                  type: t,
                  selectors: [['app-about']],
                  decls: 19,
                  vars: 1,
                  consts: [
                    [1, 'container-fluid'],
                    [1, 'jumbotron', 'text-center'],
                    ['translate', ''],
                    [1, 'far', 'fa-bookmark'],
                  ],
                  template: function (t, e) {
                    1 & t &&
                      (bo(0, 'div', 0),
                      Yo(1, '\n  '),
                      bo(2, 'div', 1),
                      Yo(3, '\n    '),
                      bo(4, 'h1'),
                      Yo(5, '\n      '),
                      bo(6, 'span', 2),
                      Yo(7, 'APP_NAME'),
                      wo(),
                      Yo(8, '\n    '),
                      wo(),
                      Yo(9, '\n    '),
                      bo(10, 'p'),
                      Co(11, 'i', 3),
                      Yo(12, ' '),
                      bo(13, 'span', 2),
                      Yo(14, 'Version'),
                      wo(),
                      Yo(15),
                      wo(),
                      Yo(16, '\n  '),
                      wo(),
                      Yo(17, '\n'),
                      wo(),
                      Yo(18, '\n')),
                      2 & t && (qs(15), Xo(' ', e.version, ''));
                  },
                  directives: [ty],
                  styles: [''],
                })),
                t
              );
            })(),
            data: { title: 'About' },
          },
        ]),
      ];
      let kb = (() => {
          class t {}
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??mod = Zt({ type: t })),
            (t.??inj = ft({ providers: [], imports: [[fm.forChild(Eb)], fm] })),
            t
          );
        })(),
        Tb = (() => {
          class t {}
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??mod = Zt({ type: t })),
            (t.??inj = ft({ imports: [[wu, ny, kb]] })),
            t
          );
        })();
      const Ab = new Lv('App');
      let Ob,
        Ib = class {
          constructor(t, e, n, r, s) {
            (this.router = t),
              (this.activatedRoute = e),
              (this.titleService = n),
              (this.translateService = r),
              (this.i18nService = s);
          }
          ngOnInit() {
            Lv.enableProductionMode(), Ab.debug('init'), this.i18nService.init('en-US', Iv);
            const t = this.router.events.pipe(Qd((t) => t instanceof xp));
            this.router.navigateByUrl('/du'),
              $(this.translateService.onLangChange, t)
                .pipe(
                  k(() => {
                    let t = this.activatedRoute;
                    for (; t.firstChild; ) t = t.firstChild;
                    return t;
                  }),
                  Qd((t) => 'primary' === t.outlet),
                  Ud((t) => t.data),
                  Wv(this)
                )
                .subscribe((t) => {
                  const e = t.title;
                  e && this.titleService.setTitle(this.translateService.instant(e));
                });
          }
          ngOnDestroy() {
            this.i18nService.destroy();
          }
        };
      function Rb(t) {
        return null != t && 'false' != `${t}`;
      }
      function Pb(t) {
        return t instanceof xa ? t.nativeElement : t;
      }
      (Ib.??fac = function (t) {
        return new (t || Ib)(_o(Jg), _o(Of), _o(ah), _o(X_), _o(Jv));
      }),
        (Ib.??cmp = $t({
          type: Ib,
          selectors: [['app-root']],
          decls: 2,
          vars: 0,
          template: function (t, e) {
            1 & t && (Co(0, 'router-outlet'), Yo(1, '\n'));
          },
          directives: [sm],
          styles: [''],
        })),
        (Ib = sb([qv()], Ib));
      try {
        Ob = 'undefined' != typeof Intl && Intl.v8BreakIterator;
      } catch (CC) {
        Ob = !1;
      }
      let Db,
        Lb,
        Mb,
        Nb = (() => {
          class t {
            constructor(t) {
              (this._platformId = t),
                (this.isBrowser = this._platformId ? Cu(this._platformId) : 'object' == typeof document && !!document),
                (this.EDGE = this.isBrowser && /(edge)/i.test(navigator.userAgent)),
                (this.TRIDENT = this.isBrowser && /(msie|trident)/i.test(navigator.userAgent)),
                (this.BLINK =
                  this.isBrowser &&
                  !(!window.chrome && !Ob) &&
                  'undefined' != typeof CSS &&
                  !this.EDGE &&
                  !this.TRIDENT),
                (this.WEBKIT =
                  this.isBrowser &&
                  /AppleWebKit/i.test(navigator.userAgent) &&
                  !this.BLINK &&
                  !this.EDGE &&
                  !this.TRIDENT),
                (this.IOS = this.isBrowser && /iPad|iPhone|iPod/.test(navigator.userAgent) && !('MSStream' in window)),
                (this.FIREFOX = this.isBrowser && /(firefox|minefield)/i.test(navigator.userAgent)),
                (this.ANDROID = this.isBrowser && /android/i.test(navigator.userAgent) && !this.TRIDENT),
                (this.SAFARI = this.isBrowser && /safari/i.test(navigator.userAgent) && this.WEBKIT);
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)(cr(Jl));
            }),
            (t.??prov = pt({
              factory: function () {
                return new t(cr(Jl));
              },
              token: t,
              providedIn: 'root',
            })),
            t
          );
        })(),
        Vb = (() => {
          class t {}
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??mod = Zt({ type: t })),
            (t.??inj = ft({})),
            t
          );
        })();
      function jb(t) {
        return (function () {
          if (null == Db && 'undefined' != typeof window)
            try {
              window.addEventListener('test', null, Object.defineProperty({}, 'passive', { get: () => (Db = !0) }));
            } finally {
              Db = Db || !1;
            }
          return Db;
        })()
          ? t
          : !!t.capture;
      }
      function Fb(t) {
        return t.composedPath ? t.composedPath()[0] : t.target;
      }
      function Ub(t) {
        return 0 === t.offsetX && 0 === t.offsetY;
      }
      function Hb(t) {
        const e = (t.touches && t.touches[0]) || (t.changedTouches && t.changedTouches[0]);
        return !(
          !e ||
          -1 !== e.identifier ||
          (null != e.radiusX && 1 !== e.radiusX) ||
          (null != e.radiusY && 1 !== e.radiusY)
        );
      }
      (Mb = 'undefined' != typeof global ? global : 'undefined' != typeof window ? window : {}),
        'undefined' != typeof Element && Element;
      const zb = new qn('cdk-input-modality-detector-options'),
        Bb = { ignoreKeys: [18, 17, 224, 91, 16] },
        $b = jb({ passive: !0, capture: !0 });
      let qb = (() => {
        class t {
          constructor(t, e, n, r) {
            (this._platform = t),
              (this._mostRecentTarget = null),
              (this._modality = new Ad(null)),
              (this._lastTouchMs = 0),
              (this._onKeydown = (t) => {
                var e, n;
                (null === (n = null === (e = this._options) || void 0 === e ? void 0 : e.ignoreKeys) || void 0 === n
                  ? void 0
                  : n.some((e) => e === t.keyCode)) ||
                  (this._modality.next('keyboard'), (this._mostRecentTarget = Fb(t)));
              }),
              (this._onMousedown = (t) => {
                Date.now() - this._lastTouchMs < 650 ||
                  (this._modality.next(Ub(t) ? 'keyboard' : 'mouse'), (this._mostRecentTarget = Fb(t)));
              }),
              (this._onTouchstart = (t) => {
                Hb(t)
                  ? this._modality.next('keyboard')
                  : ((this._lastTouchMs = Date.now()), this._modality.next('touch'), (this._mostRecentTarget = Fb(t)));
              }),
              (this._options = Object.assign(Object.assign({}, Bb), r)),
              (this.modalityDetected = this._modality.pipe((1, (t) => t.lift(new Cy(1))))),
              (this.modalityChanged = this.modalityDetected.pipe((t) => t.lift(new _y(void 0, void 0)))),
              t.isBrowser &&
                e.runOutsideAngular(() => {
                  n.addEventListener('keydown', this._onKeydown, $b),
                    n.addEventListener('mousedown', this._onMousedown, $b),
                    n.addEventListener('touchstart', this._onTouchstart, $b);
                });
          }
          get mostRecentModality() {
            return this._modality.value;
          }
          ngOnDestroy() {
            this._modality.complete(),
              this._platform.isBrowser &&
                (document.removeEventListener('keydown', this._onKeydown, $b),
                document.removeEventListener('mousedown', this._onMousedown, $b),
                document.removeEventListener('touchstart', this._onTouchstart, $b));
          }
        }
        return (
          (t.??fac = function (e) {
            return new (e || t)(cr(Nb), cr(pc), cr(Wc), cr(zb, 8));
          }),
          (t.??prov = pt({
            factory: function () {
              return new t(cr(Nb), cr(pc), cr(Wc), cr(zb, 8));
            },
            token: t,
            providedIn: 'root',
          })),
          t
        );
      })();
      const Wb = new qn('cdk-focus-monitor-default-options'),
        Gb = jb({ passive: !0, capture: !0 });
      let Zb = (() => {
        class t {
          constructor(t, e, n, r, s) {
            (this._ngZone = t),
              (this._platform = e),
              (this._inputModalityDetector = n),
              (this._origin = null),
              (this._windowFocused = !1),
              (this._originFromTouchInteraction = !1),
              (this._elementInfo = new Map()),
              (this._monitoredElementCount = 0),
              (this._rootNodeFocusListenerCount = new Map()),
              (this._windowFocusListener = () => {
                (this._windowFocused = !0), (this._windowFocusTimeoutId = setTimeout(() => (this._windowFocused = !1)));
              }),
              (this._stopInputModalityDetector = new x()),
              (this._rootNodeFocusAndBlurListener = (t) => {
                const e = Fb(t),
                  n = 'focus' === t.type ? this._onFocus : this._onBlur;
                for (let r = e; r; r = r.parentElement) n.call(this, t, r);
              }),
              (this._document = r),
              (this._detectionMode = (null == s ? void 0 : s.detectionMode) || 0);
          }
          monitor(t, e = !1) {
            const n = Pb(t);
            if (!this._platform.isBrowser || 1 !== n.nodeType) return Td(null);
            const r =
                (function (t) {
                  if (
                    (function () {
                      if (null == Lb) {
                        const t = 'undefined' != typeof document ? document.head : null;
                        Lb = !(!t || (!t.createShadowRoot && !t.attachShadow));
                      }
                      return Lb;
                    })()
                  ) {
                    const e = t.getRootNode ? t.getRootNode() : null;
                    if ('undefined' != typeof ShadowRoot && ShadowRoot && e instanceof ShadowRoot) return e;
                  }
                  return null;
                })(n) || this._getDocument(),
              s = this._elementInfo.get(n);
            if (s) return e && (s.checkChildren = !0), s.subject;
            const i = { checkChildren: e, subject: new x(), rootNode: r };
            return this._elementInfo.set(n, i), this._registerGlobalListeners(i), i.subject;
          }
          stopMonitoring(t) {
            const e = Pb(t),
              n = this._elementInfo.get(e);
            n &&
              (n.subject.complete(), this._setClasses(e), this._elementInfo.delete(e), this._removeGlobalListeners(n));
          }
          focusVia(t, e, n) {
            const r = Pb(t);
            r === this._getDocument().activeElement
              ? this._getClosestElementsInfo(r).forEach(([t, n]) => this._originChanged(t, e, n))
              : (this._setOrigin(e), 'function' == typeof r.focus && r.focus(n));
          }
          ngOnDestroy() {
            this._elementInfo.forEach((t, e) => this.stopMonitoring(e));
          }
          _getDocument() {
            return this._document || document;
          }
          _getWindow() {
            return this._getDocument().defaultView || window;
          }
          _toggleClass(t, e, n) {
            n ? t.classList.add(e) : t.classList.remove(e);
          }
          _getFocusOrigin(t) {
            return this._origin
              ? this._originFromTouchInteraction
                ? this._shouldBeAttributedToTouch(t)
                  ? 'touch'
                  : 'program'
                : this._origin
              : this._windowFocused && this._lastFocusOrigin
              ? this._lastFocusOrigin
              : 'program';
          }
          _shouldBeAttributedToTouch(t) {
            return (
              1 === this._detectionMode ||
              !!(null == t ? void 0 : t.contains(this._inputModalityDetector._mostRecentTarget))
            );
          }
          _setClasses(t, e) {
            this._toggleClass(t, 'cdk-focused', !!e),
              this._toggleClass(t, 'cdk-touch-focused', 'touch' === e),
              this._toggleClass(t, 'cdk-keyboard-focused', 'keyboard' === e),
              this._toggleClass(t, 'cdk-mouse-focused', 'mouse' === e),
              this._toggleClass(t, 'cdk-program-focused', 'program' === e);
          }
          _setOrigin(t, e = !1) {
            this._ngZone.runOutsideAngular(() => {
              (this._origin = t),
                (this._originFromTouchInteraction = 'touch' === t && e),
                0 === this._detectionMode &&
                  (clearTimeout(this._originTimeoutId),
                  (this._originTimeoutId = setTimeout(
                    () => (this._origin = null),
                    this._originFromTouchInteraction ? 650 : 1
                  )));
            });
          }
          _onFocus(t, e) {
            const n = this._elementInfo.get(e),
              r = Fb(t);
            n && (n.checkChildren || e === r) && this._originChanged(e, this._getFocusOrigin(r), n);
          }
          _onBlur(t, e) {
            const n = this._elementInfo.get(e);
            !n ||
              (n.checkChildren && t.relatedTarget instanceof Node && e.contains(t.relatedTarget)) ||
              (this._setClasses(e), this._emitOrigin(n.subject, null));
          }
          _emitOrigin(t, e) {
            this._ngZone.run(() => t.next(e));
          }
          _registerGlobalListeners(t) {
            if (!this._platform.isBrowser) return;
            const e = t.rootNode,
              n = this._rootNodeFocusListenerCount.get(e) || 0;
            n ||
              this._ngZone.runOutsideAngular(() => {
                e.addEventListener('focus', this._rootNodeFocusAndBlurListener, Gb),
                  e.addEventListener('blur', this._rootNodeFocusAndBlurListener, Gb);
              }),
              this._rootNodeFocusListenerCount.set(e, n + 1),
              1 == ++this._monitoredElementCount &&
                (this._ngZone.runOutsideAngular(() => {
                  this._getWindow().addEventListener('focus', this._windowFocusListener);
                }),
                this._inputModalityDetector.modalityDetected
                  .pipe(fy(this._stopInputModalityDetector))
                  .subscribe((t) => {
                    this._setOrigin(t, !0);
                  }));
          }
          _removeGlobalListeners(t) {
            const e = t.rootNode;
            if (this._rootNodeFocusListenerCount.has(e)) {
              const t = this._rootNodeFocusListenerCount.get(e);
              t > 1
                ? this._rootNodeFocusListenerCount.set(e, t - 1)
                : (e.removeEventListener('focus', this._rootNodeFocusAndBlurListener, Gb),
                  e.removeEventListener('blur', this._rootNodeFocusAndBlurListener, Gb),
                  this._rootNodeFocusListenerCount.delete(e));
            }
            --this._monitoredElementCount ||
              (this._getWindow().removeEventListener('focus', this._windowFocusListener),
              this._stopInputModalityDetector.next(),
              clearTimeout(this._windowFocusTimeoutId),
              clearTimeout(this._originTimeoutId));
          }
          _originChanged(t, e, n) {
            this._setClasses(t, e), this._emitOrigin(n.subject, e), (this._lastFocusOrigin = e);
          }
          _getClosestElementsInfo(t) {
            const e = [];
            return (
              this._elementInfo.forEach((n, r) => {
                (r === t || (n.checkChildren && r.contains(t))) && e.push([r, n]);
              }),
              e
            );
          }
        }
        return (
          (t.??fac = function (e) {
            return new (e || t)(cr(pc), cr(Nb), cr(qb), cr(Wc, 8), cr(Wb, 8));
          }),
          (t.??prov = pt({
            factory: function () {
              return new t(cr(pc), cr(Nb), cr(qb), cr(Wc, 8), cr(Wb, 8));
            },
            token: t,
            providedIn: 'root',
          })),
          t
        );
      })();
      const Kb = 'cdk-high-contrast-black-on-white',
        Qb = 'cdk-high-contrast-white-on-black',
        Yb = 'cdk-high-contrast-active';
      let Jb = (() => {
          class t {
            constructor(t, e) {
              (this._platform = t), (this._document = e);
            }
            getHighContrastMode() {
              if (!this._platform.isBrowser) return 0;
              const t = this._document.createElement('div');
              (t.style.backgroundColor = 'rgb(1,2,3)'),
                (t.style.position = 'absolute'),
                this._document.body.appendChild(t);
              const e = this._document.defaultView || window,
                n = e && e.getComputedStyle ? e.getComputedStyle(t) : null,
                r = ((n && n.backgroundColor) || '').replace(/ /g, '');
              switch ((this._document.body.removeChild(t), r)) {
                case 'rgb(0,0,0)':
                  return 2;
                case 'rgb(255,255,255)':
                  return 1;
              }
              return 0;
            }
            _applyBodyHighContrastModeCssClasses() {
              if (!this._hasCheckedHighContrastMode && this._platform.isBrowser && this._document.body) {
                const t = this._document.body.classList;
                t.remove(Yb), t.remove(Kb), t.remove(Qb), (this._hasCheckedHighContrastMode = !0);
                const e = this.getHighContrastMode();
                1 === e ? (t.add(Yb), t.add(Kb)) : 2 === e && (t.add(Yb), t.add(Qb));
              }
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)(cr(Nb), cr(Wc));
            }),
            (t.??prov = pt({
              factory: function () {
                return new t(cr(Nb), cr(Wc));
              },
              token: t,
              providedIn: 'root',
            })),
            t
          );
        })(),
        Xb = (() => {
          class t {}
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??mod = Zt({ type: t })),
            (t.??inj = ft({})),
            t
          );
        })();
      const tw = new Oa('12.2.12');
      function ew() {
        return 'undefined' != typeof window && void 0 !== window.document;
      }
      function nw() {
        return 'undefined' != typeof process && '[object process]' === {}.toString.call(process);
      }
      let rw = (t, e) => !1,
        sw = (t, e) => !1,
        iw = (t, e, n) => [];
      const ow = nw();
      (ow || 'undefined' != typeof Element) &&
        ((rw = ew()
          ? (t, e) => {
              for (; e && e !== document.documentElement; ) {
                if (e === t) return !0;
                e = e.parentNode || e.host;
              }
              return !1;
            }
          : (t, e) => t.contains(e)),
        (sw = (() => {
          if (ow || Element.prototype.matches) return (t, e) => t.matches(e);
          {
            const t = Element.prototype,
              e =
                t.matchesSelector ||
                t.mozMatchesSelector ||
                t.msMatchesSelector ||
                t.oMatchesSelector ||
                t.webkitMatchesSelector;
            return e ? (t, n) => e.apply(t, [n]) : sw;
          }
        })()),
        (iw = (t, e, n) => {
          let r = [];
          if (n) {
            const n = t.querySelectorAll(e);
            for (let t = 0; t < n.length; t++) r.push(n[t]);
          } else {
            const n = t.querySelector(e);
            n && r.push(n);
          }
          return r;
        }));
      function aw(t, e, n) {
        return n ? e + ':' + n + ';' : '';
      }
      function lw(t) {
        let e = '';
        for (let n = 0; n < t.style.length; n++) {
          const r = t.style.item(n);
          e += aw(0, r, t.style.getPropertyValue(r));
        }
        for (const n in t.style)
          t.style.hasOwnProperty(n) &&
            !n.startsWith('_') &&
            (e += aw(0, n.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(), t.style[n]));
        t.setAttribute('style', e);
      }
      function cw(t, e, n) {
        t.style &&
          (Object.keys(e).forEach((r) => {
            const s = dw(r);
            n && !n.hasOwnProperty(r) && (n[r] = t.style[s]), (t.style[s] = e[r]);
          }),
          nw() && lw(t));
      }
      function uw(t, e) {
        t.style &&
          (Object.keys(e).forEach((e) => {
            const n = dw(e);
            t.style[n] = '';
          }),
          nw() && lw(t));
      }
      const hw = /-+([a-z0-9])/g;
      function dw(t) {
        return t.replace(hw, (...t) => t[1].toUpperCase());
      }
      class pw {
        constructor(t, e, n) {
          (this._element = t), (this._startStyles = e), (this._endStyles = n), (this._state = 0);
          let r = pw.initialStylesByElement.get(t);
          r || pw.initialStylesByElement.set(t, (r = {})), (this._initialStyles = r);
        }
        start() {
          this._state < 1 &&
            (this._startStyles && cw(this._element, this._startStyles, this._initialStyles), (this._state = 1));
        }
        finish() {
          this.start(),
            this._state < 2 &&
              (cw(this._element, this._initialStyles),
              this._endStyles && (cw(this._element, this._endStyles), (this._endStyles = null)),
              (this._state = 1));
        }
        destroy() {
          this.finish(),
            this._state < 3 &&
              (pw.initialStylesByElement.delete(this._element),
              this._startStyles && (uw(this._element, this._startStyles), (this._endStyles = null)),
              this._endStyles && (uw(this._element, this._endStyles), (this._endStyles = null)),
              cw(this._element, this._initialStyles),
              (this._state = 3));
        }
      }
      pw.initialStylesByElement = new WeakMap();
      const fw = new qn('AnimationModuleType'),
        gw = new Oa('12.2.12'),
        mw = new qn('mat-sanity-checks', {
          providedIn: 'root',
          factory: function () {
            return !0;
          },
        });
      let _w,
        yw = (() => {
          class t {
            constructor(t, e, n) {
              (this._hasDoneGlobalChecks = !1),
                (this._document = n),
                t._applyBodyHighContrastModeCssClasses(),
                (this._sanityChecks = e),
                this._hasDoneGlobalChecks ||
                  (this._checkDoctypeIsDefined(),
                  this._checkThemeIsPresent(),
                  this._checkCdkVersionMatch(),
                  (this._hasDoneGlobalChecks = !0));
            }
            _checkIsEnabled(t) {
              return (
                !(
                  !Tc() ||
                  (void 0 !== Mb.__karma__ && Mb.__karma__) ||
                  (void 0 !== Mb.jasmine && Mb.jasmine) ||
                  (void 0 !== Mb.jest && Mb.jest) ||
                  (void 0 !== Mb.Mocha && Mb.Mocha)
                ) && ('boolean' == typeof this._sanityChecks ? this._sanityChecks : !!this._sanityChecks[t])
              );
            }
            _checkDoctypeIsDefined() {
              this._checkIsEnabled('doctype') &&
                !this._document.doctype &&
                console.warn(
                  'Current document does not have a doctype. This may cause some Angular Material components not to behave as expected.'
                );
            }
            _checkThemeIsPresent() {
              if (!this._checkIsEnabled('theme') || !this._document.body || 'function' != typeof getComputedStyle)
                return;
              const t = this._document.createElement('div');
              t.classList.add('mat-theme-loaded-marker'), this._document.body.appendChild(t);
              const e = getComputedStyle(t);
              e &&
                'none' !== e.display &&
                console.warn(
                  'Could not find Angular Material core theme. Most Material components may not work as expected. For more info refer to the theming guide: https://material.angular.io/guide/theming'
                ),
                this._document.body.removeChild(t);
            }
            _checkCdkVersionMatch() {
              this._checkIsEnabled('version') &&
                gw.full !== tw.full &&
                console.warn(
                  'The Angular Material version (' +
                    gw.full +
                    ') does not match the Angular CDK version (' +
                    tw.full +
                    ').\nPlease ensure the versions of these two packages exactly match.'
                );
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)(cr(Jb), cr(mw, 8), cr(Wc));
            }),
            (t.??mod = Zt({ type: t })),
            (t.??inj = ft({ imports: [[Xb], Xb] })),
            t
          );
        })();
      function vw(t) {
        return class extends t {
          constructor(...t) {
            super(...t), (this._disabled = !1);
          }
          get disabled() {
            return this._disabled;
          }
          set disabled(t) {
            this._disabled = Rb(t);
          }
        };
      }
      function bw(t, e) {
        return class extends t {
          constructor(...t) {
            super(...t), (this.defaultColor = e), (this.color = e);
          }
          get color() {
            return this._color;
          }
          set color(t) {
            const e = t || this.defaultColor;
            e !== this._color &&
              (this._color && this._elementRef.nativeElement.classList.remove(`mat-${this._color}`),
              e && this._elementRef.nativeElement.classList.add(`mat-${e}`),
              (this._color = e));
          }
        };
      }
      function ww(t) {
        return class extends t {
          constructor(...t) {
            super(...t), (this._disableRipple = !1);
          }
          get disableRipple() {
            return this._disableRipple;
          }
          set disableRipple(t) {
            this._disableRipple = Rb(t);
          }
        };
      }
      try {
        _w = 'undefined' != typeof Intl;
      } catch (CC) {
        _w = !1;
      }
      class Cw {
        constructor(t, e, n) {
          (this._renderer = t), (this.element = e), (this.config = n), (this.state = 3);
        }
        fadeOut() {
          this._renderer.fadeOutRipple(this);
        }
      }
      const xw = { enterDuration: 225, exitDuration: 150 },
        Sw = jb({ passive: !0 }),
        Ew = ['mousedown', 'touchstart'],
        kw = ['mouseup', 'mouseleave', 'touchend', 'touchcancel'];
      class Tw {
        constructor(t, e, n, r) {
          (this._target = t),
            (this._ngZone = e),
            (this._isPointerDown = !1),
            (this._activeRipples = new Set()),
            (this._pointerUpEventsRegistered = !1),
            r.isBrowser && (this._containerElement = Pb(n));
        }
        fadeInRipple(t, e, n = {}) {
          const r = (this._containerRect = this._containerRect || this._containerElement.getBoundingClientRect()),
            s = Object.assign(Object.assign({}, xw), n.animation);
          n.centered && ((t = r.left + r.width / 2), (e = r.top + r.height / 2));
          const i =
              n.radius ||
              (function (t, e, n) {
                const r = Math.max(Math.abs(t - n.left), Math.abs(t - n.right)),
                  s = Math.max(Math.abs(e - n.top), Math.abs(e - n.bottom));
                return Math.sqrt(r * r + s * s);
              })(t, e, r),
            o = t - r.left,
            a = e - r.top,
            l = s.enterDuration,
            c = document.createElement('div');
          c.classList.add('mat-ripple-element'),
            (c.style.left = o - i + 'px'),
            (c.style.top = a - i + 'px'),
            (c.style.height = 2 * i + 'px'),
            (c.style.width = 2 * i + 'px'),
            null != n.color && (c.style.backgroundColor = n.color),
            (c.style.transitionDuration = `${l}ms`),
            this._containerElement.appendChild(c),
            window.getComputedStyle(c).getPropertyValue('opacity'),
            (c.style.transform = 'scale(1)');
          const u = new Cw(this, c, n);
          return (
            (u.state = 0),
            this._activeRipples.add(u),
            n.persistent || (this._mostRecentTransientRipple = u),
            this._runTimeoutOutsideZone(() => {
              const t = u === this._mostRecentTransientRipple;
              (u.state = 1), n.persistent || (t && this._isPointerDown) || u.fadeOut();
            }, l),
            u
          );
        }
        fadeOutRipple(t) {
          const e = this._activeRipples.delete(t);
          if (
            (t === this._mostRecentTransientRipple && (this._mostRecentTransientRipple = null),
            this._activeRipples.size || (this._containerRect = null),
            !e)
          )
            return;
          const n = t.element,
            r = Object.assign(Object.assign({}, xw), t.config.animation);
          (n.style.transitionDuration = `${r.exitDuration}ms`),
            (n.style.opacity = '0'),
            (t.state = 2),
            this._runTimeoutOutsideZone(() => {
              (t.state = 3), n.parentNode.removeChild(n);
            }, r.exitDuration);
        }
        fadeOutAll() {
          this._activeRipples.forEach((t) => t.fadeOut());
        }
        fadeOutAllNonPersistent() {
          this._activeRipples.forEach((t) => {
            t.config.persistent || t.fadeOut();
          });
        }
        setupTriggerEvents(t) {
          const e = Pb(t);
          e &&
            e !== this._triggerElement &&
            (this._removeTriggerEvents(), (this._triggerElement = e), this._registerEvents(Ew));
        }
        handleEvent(t) {
          'mousedown' === t.type
            ? this._onMousedown(t)
            : 'touchstart' === t.type
            ? this._onTouchStart(t)
            : this._onPointerUp(),
            this._pointerUpEventsRegistered || (this._registerEvents(kw), (this._pointerUpEventsRegistered = !0));
        }
        _onMousedown(t) {
          const e = Ub(t),
            n = this._lastTouchStartEvent && Date.now() < this._lastTouchStartEvent + 800;
          this._target.rippleDisabled ||
            e ||
            n ||
            ((this._isPointerDown = !0), this.fadeInRipple(t.clientX, t.clientY, this._target.rippleConfig));
        }
        _onTouchStart(t) {
          if (!this._target.rippleDisabled && !Hb(t)) {
            (this._lastTouchStartEvent = Date.now()), (this._isPointerDown = !0);
            const e = t.changedTouches;
            for (let t = 0; t < e.length; t++) this.fadeInRipple(e[t].clientX, e[t].clientY, this._target.rippleConfig);
          }
        }
        _onPointerUp() {
          this._isPointerDown &&
            ((this._isPointerDown = !1),
            this._activeRipples.forEach((t) => {
              !t.config.persistent &&
                (1 === t.state || (t.config.terminateOnPointerUp && 0 === t.state)) &&
                t.fadeOut();
            }));
        }
        _runTimeoutOutsideZone(t, e = 0) {
          this._ngZone.runOutsideAngular(() => setTimeout(t, e));
        }
        _registerEvents(t) {
          this._ngZone.runOutsideAngular(() => {
            t.forEach((t) => {
              this._triggerElement.addEventListener(t, this, Sw);
            });
          });
        }
        _removeTriggerEvents() {
          this._triggerElement &&
            (Ew.forEach((t) => {
              this._triggerElement.removeEventListener(t, this, Sw);
            }),
            this._pointerUpEventsRegistered &&
              kw.forEach((t) => {
                this._triggerElement.removeEventListener(t, this, Sw);
              }));
        }
      }
      const Aw = new qn('mat-ripple-global-options');
      let Ow = (() => {
          class t {
            constructor(t, e, n, r, s) {
              (this._elementRef = t),
                (this._animationMode = s),
                (this.radius = 0),
                (this._disabled = !1),
                (this._isInitialized = !1),
                (this._globalOptions = r || {}),
                (this._rippleRenderer = new Tw(this, e, t, n));
            }
            get disabled() {
              return this._disabled;
            }
            set disabled(t) {
              t && this.fadeOutAllNonPersistent(), (this._disabled = t), this._setupTriggerEventsIfEnabled();
            }
            get trigger() {
              return this._trigger || this._elementRef.nativeElement;
            }
            set trigger(t) {
              (this._trigger = t), this._setupTriggerEventsIfEnabled();
            }
            ngOnInit() {
              (this._isInitialized = !0), this._setupTriggerEventsIfEnabled();
            }
            ngOnDestroy() {
              this._rippleRenderer._removeTriggerEvents();
            }
            fadeOutAll() {
              this._rippleRenderer.fadeOutAll();
            }
            fadeOutAllNonPersistent() {
              this._rippleRenderer.fadeOutAllNonPersistent();
            }
            get rippleConfig() {
              return {
                centered: this.centered,
                radius: this.radius,
                color: this.color,
                animation: Object.assign(
                  Object.assign(
                    Object.assign({}, this._globalOptions.animation),
                    'NoopAnimations' === this._animationMode ? { enterDuration: 0, exitDuration: 0 } : {}
                  ),
                  this.animation
                ),
                terminateOnPointerUp: this._globalOptions.terminateOnPointerUp,
              };
            }
            get rippleDisabled() {
              return this.disabled || !!this._globalOptions.disabled;
            }
            _setupTriggerEventsIfEnabled() {
              !this.disabled && this._isInitialized && this._rippleRenderer.setupTriggerEvents(this.trigger);
            }
            launch(t, e = 0, n) {
              return 'number' == typeof t
                ? this._rippleRenderer.fadeInRipple(t, e, Object.assign(Object.assign({}, this.rippleConfig), n))
                : this._rippleRenderer.fadeInRipple(0, 0, Object.assign(Object.assign({}, this.rippleConfig), t));
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)(_o(xa), _o(pc), _o(Nb), _o(Aw, 8), _o(fw, 8));
            }),
            (t.??dir = Qt({
              type: t,
              selectors: [
                ['', 'mat-ripple', ''],
                ['', 'matRipple', ''],
              ],
              hostAttrs: [1, 'mat-ripple'],
              hostVars: 2,
              hostBindings: function (t, e) {
                2 & t && Uo('mat-ripple-unbounded', e.unbounded);
              },
              inputs: {
                radius: ['matRippleRadius', 'radius'],
                disabled: ['matRippleDisabled', 'disabled'],
                trigger: ['matRippleTrigger', 'trigger'],
                color: ['matRippleColor', 'color'],
                unbounded: ['matRippleUnbounded', 'unbounded'],
                centered: ['matRippleCentered', 'centered'],
                animation: ['matRippleAnimation', 'animation'],
              },
              exportAs: ['matRipple'],
            })),
            t
          );
        })(),
        Iw = (() => {
          class t {}
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??mod = Zt({ type: t })),
            (t.??inj = ft({ imports: [[yw, Vb], yw] })),
            t
          );
        })();
      const Rw = ['*', [['mat-toolbar-row']]],
        Pw = ['*', 'mat-toolbar-row'],
        Dw = bw(
          class {
            constructor(t) {
              this._elementRef = t;
            }
          }
        );
      let Lw = (() => {
          class t {}
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??dir = Qt({
              type: t,
              selectors: [['mat-toolbar-row']],
              hostAttrs: [1, 'mat-toolbar-row'],
              exportAs: ['matToolbarRow'],
            })),
            t
          );
        })(),
        Mw = (() => {
          class t extends Dw {
            constructor(t, e, n) {
              super(t), (this._platform = e), (this._document = n);
            }
            ngAfterViewInit() {
              this._platform.isBrowser &&
                (this._checkToolbarMixedModes(),
                this._toolbarRows.changes.subscribe(() => this._checkToolbarMixedModes()));
            }
            _checkToolbarMixedModes() {}
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)(_o(xa), _o(Nb), _o(Wc));
            }),
            (t.??cmp = $t({
              type: t,
              selectors: [['mat-toolbar']],
              contentQueries: function (t, e, n) {
                if ((1 & t && Ul(n, Lw, 5), 2 & t)) {
                  let t;
                  jl((t = Hl())) && (e._toolbarRows = t);
                }
              },
              hostAttrs: [1, 'mat-toolbar'],
              hostVars: 4,
              hostBindings: function (t, e) {
                2 & t &&
                  Uo('mat-toolbar-multiple-rows', e._toolbarRows.length > 0)(
                    'mat-toolbar-single-row',
                    0 === e._toolbarRows.length
                  );
              },
              inputs: { color: 'color' },
              exportAs: ['matToolbar'],
              features: [ro],
              ngContentSelectors: Pw,
              decls: 4,
              vars: 0,
              template: function (t, e) {
                1 & t && (Po(Rw), Do(0), Yo(1, '\n'), Do(2, 1), Yo(3, '\n'));
              },
              styles: [
                '.cdk-high-contrast-active .mat-toolbar{outline:solid 1px}.mat-toolbar-row,.mat-toolbar-single-row{display:flex;box-sizing:border-box;padding:0 16px;width:100%;flex-direction:row;align-items:center;white-space:nowrap}.mat-toolbar-multiple-rows{display:flex;box-sizing:border-box;flex-direction:column;width:100%}\n',
              ],
              encapsulation: 2,
              changeDetection: 0,
            })),
            t
          );
        })(),
        Nw = (() => {
          class t {}
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??mod = Zt({ type: t })),
            (t.??inj = ft({ imports: [[yw], yw] })),
            t
          );
        })();
      const Vw = ['*', [['mat-card-footer']]],
        jw = ['*', 'mat-card-footer'];
      let Fw = (() => {
          class t {
            constructor(t) {
              this._animationMode = t;
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)(_o(fw, 8));
            }),
            (t.??cmp = $t({
              type: t,
              selectors: [['mat-card']],
              hostAttrs: [1, 'mat-card', 'mat-focus-indicator'],
              hostVars: 2,
              hostBindings: function (t, e) {
                2 & t && Uo('_mat-animation-noopable', 'NoopAnimations' === e._animationMode);
              },
              exportAs: ['matCard'],
              ngContentSelectors: jw,
              decls: 4,
              vars: 0,
              template: function (t, e) {
                1 & t && (Po(Vw), Do(0), Yo(1, '\n'), Do(2, 1), Yo(3, '\n'));
              },
              styles: [
                '.mat-card{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);display:block;position:relative;padding:16px;border-radius:4px}._mat-animation-noopable.mat-card{transition:none;animation:none}.mat-card .mat-divider-horizontal{position:absolute;left:0;width:100%}[dir=rtl] .mat-card .mat-divider-horizontal{left:auto;right:0}.mat-card .mat-divider-horizontal.mat-divider-inset{position:static;margin:0}[dir=rtl] .mat-card .mat-divider-horizontal.mat-divider-inset{margin-right:0}.cdk-high-contrast-active .mat-card{outline:solid 1px}.mat-card-actions,.mat-card-subtitle,.mat-card-content{display:block;margin-bottom:16px}.mat-card-title{display:block;margin-bottom:8px}.mat-card-actions{margin-left:-8px;margin-right:-8px;padding:8px 0}.mat-card-actions-align-end{display:flex;justify-content:flex-end}.mat-card-image{width:calc(100% + 32px);margin:0 -16px 16px -16px}.mat-card-footer{display:block;margin:0 -16px -16px -16px}.mat-card-actions .mat-button,.mat-card-actions .mat-raised-button,.mat-card-actions .mat-stroked-button{margin:0 8px}.mat-card-header{display:flex;flex-direction:row}.mat-card-header .mat-card-title{margin-bottom:12px}.mat-card-header-text{margin:0 16px}.mat-card-avatar{height:40px;width:40px;border-radius:50%;flex-shrink:0;object-fit:cover}.mat-card-title-group{display:flex;justify-content:space-between}.mat-card-sm-image{width:80px;height:80px}.mat-card-md-image{width:112px;height:112px}.mat-card-lg-image{width:152px;height:152px}.mat-card-xl-image{width:240px;height:240px;margin:-8px}.mat-card-title-group>.mat-card-xl-image{margin:-8px 0 8px}@media(max-width: 599px){.mat-card-title-group{margin:0}.mat-card-xl-image{margin-left:0;margin-right:0}}.mat-card>:first-child,.mat-card-content>:first-child{margin-top:0}.mat-card>:last-child:not(.mat-card-footer),.mat-card-content>:last-child:not(.mat-card-footer){margin-bottom:0}.mat-card-image:first-child{margin-top:-16px;border-top-left-radius:inherit;border-top-right-radius:inherit}.mat-card>.mat-card-actions:last-child{margin-bottom:-8px;padding-bottom:0}.mat-card-actions:not(.mat-card-actions-align-end) .mat-button:first-child,.mat-card-actions:not(.mat-card-actions-align-end) .mat-raised-button:first-child,.mat-card-actions:not(.mat-card-actions-align-end) .mat-stroked-button:first-child{margin-left:0;margin-right:0}.mat-card-actions-align-end .mat-button:last-child,.mat-card-actions-align-end .mat-raised-button:last-child,.mat-card-actions-align-end .mat-stroked-button:last-child{margin-left:0;margin-right:0}.mat-card-title:not(:first-child),.mat-card-subtitle:not(:first-child){margin-top:-4px}.mat-card-header .mat-card-subtitle:not(:first-child){margin-top:-8px}.mat-card>.mat-card-xl-image:first-child{margin-top:-8px}.mat-card>.mat-card-xl-image:last-child{margin-bottom:-8px}\n',
              ],
              encapsulation: 2,
              changeDetection: 0,
            })),
            t
          );
        })(),
        Uw = (() => {
          class t {}
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??mod = Zt({ type: t })),
            (t.??inj = ft({ imports: [[yw], yw] })),
            t
          );
        })(),
        Hw = (() => {
          class t {
            constructor() {
              (this._vertical = !1), (this._inset = !1);
            }
            get vertical() {
              return this._vertical;
            }
            set vertical(t) {
              this._vertical = Rb(t);
            }
            get inset() {
              return this._inset;
            }
            set inset(t) {
              this._inset = Rb(t);
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??cmp = $t({
              type: t,
              selectors: [['mat-divider']],
              hostAttrs: ['role', 'separator', 1, 'mat-divider'],
              hostVars: 7,
              hostBindings: function (t, e) {
                2 & t &&
                  (go('aria-orientation', e.vertical ? 'vertical' : 'horizontal'),
                  Uo('mat-divider-vertical', e.vertical)('mat-divider-horizontal', !e.vertical)(
                    'mat-divider-inset',
                    e.inset
                  ));
              },
              inputs: { vertical: 'vertical', inset: 'inset' },
              decls: 0,
              vars: 0,
              template: function (t, e) {},
              styles: [
                '.mat-divider{display:block;margin:0;border-top-width:1px;border-top-style:solid}.mat-divider.mat-divider-vertical{border-top:0;border-right-width:1px;border-right-style:solid}.mat-divider.mat-divider-inset{margin-left:80px}[dir=rtl] .mat-divider.mat-divider-inset{margin-left:auto;margin-right:80px}\n',
              ],
              encapsulation: 2,
              changeDetection: 0,
            })),
            t
          );
        })(),
        zw = (() => {
          class t {}
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??mod = Zt({ type: t })),
            (t.??inj = ft({ imports: [[yw], yw] })),
            t
          );
        })();
      const Bw = ['mat-button', ''],
        $w = ['*'],
        qw = [
          'mat-button',
          'mat-flat-button',
          'mat-icon-button',
          'mat-raised-button',
          'mat-stroked-button',
          'mat-mini-fab',
          'mat-fab',
        ],
        Ww = bw(
          vw(
            ww(
              class {
                constructor(t) {
                  this._elementRef = t;
                }
              }
            )
          )
        );
      let Gw = (() => {
          class t extends Ww {
            constructor(t, e, n) {
              super(t),
                (this._focusMonitor = e),
                (this._animationMode = n),
                (this.isRoundButton = this._hasHostAttributes('mat-fab', 'mat-mini-fab')),
                (this.isIconButton = this._hasHostAttributes('mat-icon-button'));
              for (const r of qw) this._hasHostAttributes(r) && this._getHostElement().classList.add(r);
              t.nativeElement.classList.add('mat-button-base'), this.isRoundButton && (this.color = 'accent');
            }
            ngAfterViewInit() {
              this._focusMonitor.monitor(this._elementRef, !0);
            }
            ngOnDestroy() {
              this._focusMonitor.stopMonitoring(this._elementRef);
            }
            focus(t, e) {
              t ? this._focusMonitor.focusVia(this._getHostElement(), t, e) : this._getHostElement().focus(e);
            }
            _getHostElement() {
              return this._elementRef.nativeElement;
            }
            _isRippleDisabled() {
              return this.disableRipple || this.disabled;
            }
            _hasHostAttributes(...t) {
              return t.some((t) => this._getHostElement().hasAttribute(t));
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)(_o(xa), _o(Zb), _o(fw, 8));
            }),
            (t.??cmp = $t({
              type: t,
              selectors: [
                ['button', 'mat-button', ''],
                ['button', 'mat-raised-button', ''],
                ['button', 'mat-icon-button', ''],
                ['button', 'mat-fab', ''],
                ['button', 'mat-mini-fab', ''],
                ['button', 'mat-stroked-button', ''],
                ['button', 'mat-flat-button', ''],
              ],
              viewQuery: function (t, e) {
                if ((1 & t && Fl(Ow, 5), 2 & t)) {
                  let t;
                  jl((t = Hl())) && (e.ripple = t.first);
                }
              },
              hostAttrs: [1, 'mat-focus-indicator'],
              hostVars: 5,
              hostBindings: function (t, e) {
                2 & t &&
                  (go('disabled', e.disabled || null),
                  Uo('_mat-animation-noopable', 'NoopAnimations' === e._animationMode)(
                    'mat-button-disabled',
                    e.disabled
                  ));
              },
              inputs: { disabled: 'disabled', disableRipple: 'disableRipple', color: 'color' },
              exportAs: ['matButton'],
              features: [ro],
              attrs: Bw,
              ngContentSelectors: $w,
              decls: 7,
              vars: 5,
              consts: [
                [1, 'mat-button-wrapper'],
                [
                  'matRipple',
                  '',
                  1,
                  'mat-button-ripple',
                  3,
                  'matRippleDisabled',
                  'matRippleCentered',
                  'matRippleTrigger',
                ],
                [1, 'mat-button-focus-overlay'],
              ],
              template: function (t, e) {
                1 & t &&
                  (Po(),
                  bo(0, 'span', 0),
                  Do(1),
                  wo(),
                  Yo(2, '\n'),
                  Co(3, 'span', 1),
                  Yo(4, '\n'),
                  Co(5, 'span', 2),
                  Yo(6, '\n')),
                  2 & t &&
                    (qs(3),
                    Uo('mat-button-ripple-round', e.isRoundButton || e.isIconButton),
                    yo('matRippleDisabled', e._isRippleDisabled())('matRippleCentered', e.isIconButton)(
                      'matRippleTrigger',
                      e._getHostElement()
                    ));
              },
              directives: [Ow],
              styles: [
                '.mat-button .mat-button-focus-overlay,.mat-icon-button .mat-button-focus-overlay{opacity:0}.mat-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay,.mat-stroked-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay{opacity:.04}@media(hover: none){.mat-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay,.mat-stroked-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay{opacity:0}}.mat-button,.mat-icon-button,.mat-stroked-button,.mat-flat-button{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible}.mat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner{border:0}.mat-button.mat-button-disabled,.mat-icon-button.mat-button-disabled,.mat-stroked-button.mat-button-disabled,.mat-flat-button.mat-button-disabled{cursor:default}.mat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-button.cdk-program-focused .mat-button-focus-overlay,.mat-icon-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-icon-button.cdk-program-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-program-focused .mat-button-focus-overlay,.mat-flat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-flat-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner{border:0}.mat-raised-button{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-raised-button::-moz-focus-inner{border:0}.mat-raised-button.mat-button-disabled{cursor:default}.mat-raised-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-raised-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-raised-button::-moz-focus-inner{border:0}._mat-animation-noopable.mat-raised-button{transition:none;animation:none}.mat-stroked-button{border:1px solid currentColor;padding:0 15px;line-height:34px}.mat-stroked-button .mat-button-ripple.mat-ripple,.mat-stroked-button .mat-button-focus-overlay{top:-1px;left:-1px;right:-1px;bottom:-1px}.mat-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:56px;height:56px;padding:0;flex-shrink:0}.mat-fab::-moz-focus-inner{border:0}.mat-fab.mat-button-disabled{cursor:default}.mat-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-fab::-moz-focus-inner{border:0}._mat-animation-noopable.mat-fab{transition:none;animation:none}.mat-fab .mat-button-wrapper{padding:16px 0;display:inline-block;line-height:24px}.mat-mini-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:40px;height:40px;padding:0;flex-shrink:0}.mat-mini-fab::-moz-focus-inner{border:0}.mat-mini-fab.mat-button-disabled{cursor:default}.mat-mini-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-mini-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-mini-fab::-moz-focus-inner{border:0}._mat-animation-noopable.mat-mini-fab{transition:none;animation:none}.mat-mini-fab .mat-button-wrapper{padding:8px 0;display:inline-block;line-height:24px}.mat-icon-button{padding:0;min-width:0;width:40px;height:40px;flex-shrink:0;line-height:40px;border-radius:50%}.mat-icon-button i,.mat-icon-button .mat-icon{line-height:24px}.mat-button-ripple.mat-ripple,.mat-button-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-button-ripple.mat-ripple:not(:empty){transform:translateZ(0)}.mat-button-focus-overlay{opacity:0;transition:opacity 200ms cubic-bezier(0.35, 0, 0.25, 1),background-color 200ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable .mat-button-focus-overlay{transition:none}.mat-button-ripple-round{border-radius:50%;z-index:1}.mat-button .mat-button-wrapper>*,.mat-flat-button .mat-button-wrapper>*,.mat-stroked-button .mat-button-wrapper>*,.mat-raised-button .mat-button-wrapper>*,.mat-icon-button .mat-button-wrapper>*,.mat-fab .mat-button-wrapper>*,.mat-mini-fab .mat-button-wrapper>*{vertical-align:middle}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button{display:inline-flex;justify-content:center;align-items:center;font-size:inherit;width:2.5em;height:2.5em}.cdk-high-contrast-active .mat-button,.cdk-high-contrast-active .mat-flat-button,.cdk-high-contrast-active .mat-raised-button,.cdk-high-contrast-active .mat-icon-button,.cdk-high-contrast-active .mat-fab,.cdk-high-contrast-active .mat-mini-fab{outline:solid 1px}.cdk-high-contrast-active .mat-button-base.cdk-keyboard-focused,.cdk-high-contrast-active .mat-button-base.cdk-program-focused{outline:solid 3px}\n',
              ],
              encapsulation: 2,
              changeDetection: 0,
            })),
            t
          );
        })(),
        Zw = (() => {
          class t {}
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??mod = Zt({ type: t })),
            (t.??inj = ft({ imports: [[Iw, yw], yw] })),
            t
          );
        })();
      const Kw = ['*'];
      function Qw(t) {
        return Error(`Unable to find icon with the name "${t}"`);
      }
      function Yw(t) {
        return Error(
          `The URL provided to MatIconRegistry was not trusted as a resource URL via Angular's DomSanitizer. Attempted URL was "${t}".`
        );
      }
      function Jw(t) {
        return Error(
          `The literal provided to MatIconRegistry was not trusted as safe HTML by Angular's DomSanitizer. Attempted literal was "${t}".`
        );
      }
      class Xw {
        constructor(t, e, n) {
          (this.url = t), (this.svgText = e), (this.options = n);
        }
      }
      let tC = (() => {
        class t {
          constructor(t, e, n, r) {
            (this._httpClient = t),
              (this._sanitizer = e),
              (this._errorHandler = r),
              (this._svgIconConfigs = new Map()),
              (this._iconSetConfigs = new Map()),
              (this._cachedIconsByUrl = new Map()),
              (this._inProgressUrlFetches = new Map()),
              (this._fontCssClassesByAlias = new Map()),
              (this._resolvers = []),
              (this._defaultFontSetClass = 'material-icons'),
              (this._document = n);
          }
          addSvgIcon(t, e, n) {
            return this.addSvgIconInNamespace('', t, e, n);
          }
          addSvgIconLiteral(t, e, n) {
            return this.addSvgIconLiteralInNamespace('', t, e, n);
          }
          addSvgIconInNamespace(t, e, n, r) {
            return this._addSvgIconConfig(t, e, new Xw(n, null, r));
          }
          addSvgIconResolver(t) {
            return this._resolvers.push(t), this;
          }
          addSvgIconLiteralInNamespace(t, e, n, r) {
            const s = this._sanitizer.sanitize(Kr.HTML, n);
            if (!s) throw Jw(n);
            return this._addSvgIconConfig(t, e, new Xw('', s, r));
          }
          addSvgIconSet(t, e) {
            return this.addSvgIconSetInNamespace('', t, e);
          }
          addSvgIconSetLiteral(t, e) {
            return this.addSvgIconSetLiteralInNamespace('', t, e);
          }
          addSvgIconSetInNamespace(t, e, n) {
            return this._addSvgIconSetConfig(t, new Xw(e, null, n));
          }
          addSvgIconSetLiteralInNamespace(t, e, n) {
            const r = this._sanitizer.sanitize(Kr.HTML, e);
            if (!r) throw Jw(e);
            return this._addSvgIconSetConfig(t, new Xw('', r, n));
          }
          registerFontClassAlias(t, e = t) {
            return this._fontCssClassesByAlias.set(t, e), this;
          }
          classNameForFontAlias(t) {
            return this._fontCssClassesByAlias.get(t) || t;
          }
          setDefaultFontSetClass(t) {
            return (this._defaultFontSetClass = t), this;
          }
          getDefaultFontSetClass() {
            return this._defaultFontSetClass;
          }
          getSvgIconFromUrl(t) {
            const e = this._sanitizer.sanitize(Kr.RESOURCE_URL, t);
            if (!e) throw Yw(t);
            const n = this._cachedIconsByUrl.get(e);
            return n
              ? Td(eC(n))
              : this._loadSvgIconFromConfig(new Xw(t, null)).pipe(
                  gp((t) => this._cachedIconsByUrl.set(e, t)),
                  k((t) => eC(t))
                );
          }
          getNamedSvgIcon(t, e = '') {
            const n = nC(e, t);
            let r = this._svgIconConfigs.get(n);
            if (r) return this._getSvgFromConfig(r);
            if (((r = this._getIconConfigFromResolvers(e, t)), r))
              return this._svgIconConfigs.set(n, r), this._getSvgFromConfig(r);
            const s = this._iconSetConfigs.get(e);
            return s ? this._getSvgFromIconSetConfigs(t, s) : r_(Qw(n));
          }
          ngOnDestroy() {
            (this._resolvers = []),
              this._svgIconConfigs.clear(),
              this._iconSetConfigs.clear(),
              this._cachedIconsByUrl.clear();
          }
          _getSvgFromConfig(t) {
            return t.svgText
              ? Td(eC(this._svgElementFromConfig(t)))
              : this._loadSvgIconFromConfig(t).pipe(k((t) => eC(t)));
          }
          _getSvgFromIconSetConfigs(t, e) {
            const n = this._extractIconWithNameFromAnySet(t, e);
            return n
              ? Td(n)
              : lh(
                  e
                    .filter((t) => !t.svgText)
                    .map((t) =>
                      this._loadSvgIconSetFromConfig(t).pipe(
                        Xd((e) => {
                          const n = this._sanitizer.sanitize(Kr.RESOURCE_URL, t.url);
                          return (
                            this._errorHandler.handleError(
                              new Error(`Loading icon set URL: ${n} failed: ${e.message}`)
                            ),
                            Td(null)
                          );
                        })
                      )
                    )
                ).pipe(
                  k(() => {
                    const n = this._extractIconWithNameFromAnySet(t, e);
                    if (!n) throw Qw(t);
                    return n;
                  })
                );
          }
          _extractIconWithNameFromAnySet(t, e) {
            for (let n = e.length - 1; n >= 0; n--) {
              const r = e[n];
              if (r.svgText && r.svgText.indexOf(t) > -1) {
                const e = this._svgElementFromConfig(r),
                  n = this._extractSvgIconFromSet(e, t, r.options);
                if (n) return n;
              }
            }
            return null;
          }
          _loadSvgIconFromConfig(t) {
            return this._fetchIcon(t).pipe(
              gp((e) => (t.svgText = e)),
              k(() => this._svgElementFromConfig(t))
            );
          }
          _loadSvgIconSetFromConfig(t) {
            return t.svgText ? Td(null) : this._fetchIcon(t).pipe(gp((e) => (t.svgText = e)));
          }
          _extractSvgIconFromSet(t, e, n) {
            const r = t.querySelector(`[id="${e}"]`);
            if (!r) return null;
            const s = r.cloneNode(!0);
            if ((s.removeAttribute('id'), 'svg' === s.nodeName.toLowerCase())) return this._setSvgAttributes(s, n);
            if ('symbol' === s.nodeName.toLowerCase()) return this._setSvgAttributes(this._toSvgElement(s), n);
            const i = this._svgElementFromString('<svg></svg>');
            return i.appendChild(s), this._setSvgAttributes(i, n);
          }
          _svgElementFromString(t) {
            const e = this._document.createElement('DIV');
            e.innerHTML = t;
            const n = e.querySelector('svg');
            if (!n) throw Error('<svg> tag not found');
            return n;
          }
          _toSvgElement(t) {
            const e = this._svgElementFromString('<svg></svg>'),
              n = t.attributes;
            for (let r = 0; r < n.length; r++) {
              const { name: t, value: s } = n[r];
              'id' !== t && e.setAttribute(t, s);
            }
            for (let r = 0; r < t.childNodes.length; r++)
              t.childNodes[r].nodeType === this._document.ELEMENT_NODE && e.appendChild(t.childNodes[r].cloneNode(!0));
            return e;
          }
          _setSvgAttributes(t, e) {
            return (
              t.setAttribute('fit', ''),
              t.setAttribute('height', '100%'),
              t.setAttribute('width', '100%'),
              t.setAttribute('preserveAspectRatio', 'xMidYMid meet'),
              t.setAttribute('focusable', 'false'),
              e && e.viewBox && t.setAttribute('viewBox', e.viewBox),
              t
            );
          }
          _fetchIcon(t) {
            var e;
            const { url: n, options: r } = t,
              s = null !== (e = null == r ? void 0 : r.withCredentials) && void 0 !== e && e;
            if (!this._httpClient)
              throw Error(
                'Could not find HttpClient provider for use with Angular Material icons. Please include the HttpClientModule from @angular/common/http in your app imports.'
              );
            if (null == n) throw Error(`Cannot fetch icon from URL "${n}".`);
            const i = this._sanitizer.sanitize(Kr.RESOURCE_URL, n);
            if (!i) throw Yw(n);
            const o = this._inProgressUrlFetches.get(i);
            if (o) return o;
            const a = this._httpClient.get(i, { responseType: 'text', withCredentials: s }).pipe(
              yp(() => this._inProgressUrlFetches.delete(i)),
              tt()
            );
            return this._inProgressUrlFetches.set(i, a), a;
          }
          _addSvgIconConfig(t, e, n) {
            return this._svgIconConfigs.set(nC(t, e), n), this;
          }
          _addSvgIconSetConfig(t, e) {
            const n = this._iconSetConfigs.get(t);
            return n ? n.push(e) : this._iconSetConfigs.set(t, [e]), this;
          }
          _svgElementFromConfig(t) {
            if (!t.svgElement) {
              const e = this._svgElementFromString(t.svgText);
              this._setSvgAttributes(e, t.options), (t.svgElement = e);
            }
            return t.svgElement;
          }
          _getIconConfigFromResolvers(t, e) {
            for (let r = 0; r < this._resolvers.length; r++) {
              const s = this._resolvers[r](e, t);
              if (s) return (n = s).url && n.options ? new Xw(s.url, null, s.options) : new Xw(s, null);
            }
            var n;
          }
        }
        return (
          (t.??fac = function (e) {
            return new (e || t)(cr(Bm, 8), cr(th), cr(Wc, 8), cr(es));
          }),
          (t.??prov = pt({
            factory: function () {
              return new t(cr(Bm, 8), cr(th), cr(Wc, 8), cr(es));
            },
            token: t,
            providedIn: 'root',
          })),
          t
        );
      })();
      function eC(t) {
        return t.cloneNode(!0);
      }
      function nC(t, e) {
        return t + ':' + e;
      }
      const rC = bw(
          class {
            constructor(t) {
              this._elementRef = t;
            }
          }
        ),
        sC = new qn('mat-icon-location', {
          providedIn: 'root',
          factory: function () {
            const t = ur(Wc),
              e = t ? t.location : null;
            return { getPathname: () => (e ? e.pathname + e.search : '') };
          },
        }),
        iC = [
          'clip-path',
          'color-profile',
          'src',
          'cursor',
          'fill',
          'filter',
          'marker',
          'marker-start',
          'marker-mid',
          'marker-end',
          'mask',
          'stroke',
        ],
        oC = iC.map((t) => `[${t}]`).join(', '),
        aC = /^url\(['"]?#(.*?)['"]?\)$/;
      let lC = (() => {
          class t extends rC {
            constructor(t, e, n, r, s) {
              super(t),
                (this._iconRegistry = e),
                (this._location = r),
                (this._errorHandler = s),
                (this._inline = !1),
                (this._currentIconFetch = h.EMPTY),
                n || t.nativeElement.setAttribute('aria-hidden', 'true');
            }
            get inline() {
              return this._inline;
            }
            set inline(t) {
              this._inline = Rb(t);
            }
            get svgIcon() {
              return this._svgIcon;
            }
            set svgIcon(t) {
              t !== this._svgIcon &&
                (t ? this._updateSvgIcon(t) : this._svgIcon && this._clearSvgElement(), (this._svgIcon = t));
            }
            get fontSet() {
              return this._fontSet;
            }
            set fontSet(t) {
              const e = this._cleanupFontValue(t);
              e !== this._fontSet && ((this._fontSet = e), this._updateFontIconClasses());
            }
            get fontIcon() {
              return this._fontIcon;
            }
            set fontIcon(t) {
              const e = this._cleanupFontValue(t);
              e !== this._fontIcon && ((this._fontIcon = e), this._updateFontIconClasses());
            }
            _splitIconName(t) {
              if (!t) return ['', ''];
              const e = t.split(':');
              switch (e.length) {
                case 1:
                  return ['', e[0]];
                case 2:
                  return e;
                default:
                  throw Error(`Invalid icon name: "${t}"`);
              }
            }
            ngOnInit() {
              this._updateFontIconClasses();
            }
            ngAfterViewChecked() {
              const t = this._elementsWithExternalReferences;
              if (t && t.size) {
                const t = this._location.getPathname();
                t !== this._previousPath && ((this._previousPath = t), this._prependPathToReferences(t));
              }
            }
            ngOnDestroy() {
              this._currentIconFetch.unsubscribe(),
                this._elementsWithExternalReferences && this._elementsWithExternalReferences.clear();
            }
            _usingFontIcon() {
              return !this.svgIcon;
            }
            _setSvgElement(t) {
              this._clearSvgElement();
              const e = t.querySelectorAll('style');
              for (let r = 0; r < e.length; r++) e[r].textContent += ' ';
              const n = this._location.getPathname();
              (this._previousPath = n),
                this._cacheChildrenWithExternalReferences(t),
                this._prependPathToReferences(n),
                this._elementRef.nativeElement.appendChild(t);
            }
            _clearSvgElement() {
              const t = this._elementRef.nativeElement;
              let e = t.childNodes.length;
              for (this._elementsWithExternalReferences && this._elementsWithExternalReferences.clear(); e--; ) {
                const n = t.childNodes[e];
                (1 === n.nodeType && 'svg' !== n.nodeName.toLowerCase()) || t.removeChild(n);
              }
            }
            _updateFontIconClasses() {
              if (!this._usingFontIcon()) return;
              const t = this._elementRef.nativeElement,
                e = this.fontSet
                  ? this._iconRegistry.classNameForFontAlias(this.fontSet)
                  : this._iconRegistry.getDefaultFontSetClass();
              e != this._previousFontSetClass &&
                (this._previousFontSetClass && t.classList.remove(this._previousFontSetClass),
                e && t.classList.add(e),
                (this._previousFontSetClass = e)),
                this.fontIcon != this._previousFontIconClass &&
                  (this._previousFontIconClass && t.classList.remove(this._previousFontIconClass),
                  this.fontIcon && t.classList.add(this.fontIcon),
                  (this._previousFontIconClass = this.fontIcon));
            }
            _cleanupFontValue(t) {
              return 'string' == typeof t ? t.trim().split(' ')[0] : t;
            }
            _prependPathToReferences(t) {
              const e = this._elementsWithExternalReferences;
              e &&
                e.forEach((e, n) => {
                  e.forEach((e) => {
                    n.setAttribute(e.name, `url('${t}#${e.value}')`);
                  });
                });
            }
            _cacheChildrenWithExternalReferences(t) {
              const e = t.querySelectorAll(oC),
                n = (this._elementsWithExternalReferences = this._elementsWithExternalReferences || new Map());
              for (let r = 0; r < e.length; r++)
                iC.forEach((t) => {
                  const s = e[r],
                    i = s.getAttribute(t),
                    o = i ? i.match(aC) : null;
                  if (o) {
                    let e = n.get(s);
                    e || ((e = []), n.set(s, e)), e.push({ name: t, value: o[1] });
                  }
                });
            }
            _updateSvgIcon(t) {
              if (((this._svgNamespace = null), (this._svgName = null), this._currentIconFetch.unsubscribe(), t)) {
                const [e, n] = this._splitIconName(t);
                e && (this._svgNamespace = e),
                  n && (this._svgName = n),
                  (this._currentIconFetch = this._iconRegistry
                    .getNamedSvgIcon(n, e)
                    .pipe($d(1))
                    .subscribe(
                      (t) => this._setSvgElement(t),
                      (t) => {
                        this._errorHandler.handleError(new Error(`Error retrieving icon ${e}:${n}! ${t.message}`));
                      }
                    ));
              }
            }
          }
          return (
            (t.??fac = function (e) {
              return new (e || t)(_o(xa), _o(tC), zn('aria-hidden'), _o(sC), _o(es));
            }),
            (t.??cmp = $t({
              type: t,
              selectors: [['mat-icon']],
              hostAttrs: ['role', 'img', 1, 'mat-icon', 'notranslate'],
              hostVars: 7,
              hostBindings: function (t, e) {
                2 & t &&
                  (go('data-mat-icon-type', e._usingFontIcon() ? 'font' : 'svg')(
                    'data-mat-icon-name',
                    e._svgName || e.fontIcon
                  )('data-mat-icon-namespace', e._svgNamespace || e.fontSet),
                  Uo('mat-icon-inline', e.inline)(
                    'mat-icon-no-color',
                    'primary' !== e.color && 'accent' !== e.color && 'warn' !== e.color
                  ));
              },
              inputs: {
                color: 'color',
                inline: 'inline',
                svgIcon: 'svgIcon',
                fontSet: 'fontSet',
                fontIcon: 'fontIcon',
              },
              exportAs: ['matIcon'],
              features: [ro],
              ngContentSelectors: Kw,
              decls: 1,
              vars: 0,
              template: function (t, e) {
                1 & t && (Po(), Do(0));
              },
              styles: [
                '.mat-icon{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-repeat:no-repeat;display:inline-block;fill:currentColor;height:24px;width:24px}.mat-icon.mat-icon-inline{font-size:inherit;height:inherit;line-height:inherit;width:inherit}[dir=rtl] .mat-icon-rtl-mirror{transform:scale(-1, 1)}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon{display:block}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button .mat-icon{margin:auto}\n',
              ],
              encapsulation: 2,
              changeDetection: 0,
            })),
            t
          );
        })(),
        cC = (() => {
          class t {}
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??mod = Zt({ type: t })),
            (t.??inj = ft({ imports: [[yw], yw] })),
            t
          );
        })();
      function uC(t, e) {
        1 & t && (bo(0, 'p', 21), Yo(1, 'Most popular'), wo());
      }
      function hC(t, e) {
        if ((1 & t && (bo(0, 'span', 22), Yo(1), wo()), 2 & t)) {
          const t = Io();
          qs(1), Jo(t.plan.prevData);
        }
      }
      function dC(t, e) {
        1 & t && (xo(0), Yo(1, 'Double national data'), So());
      }
      function pC(t, e) {
        1 & t && (xo(0), Yo(1, 'National data'), So());
      }
      function fC(t, e) {
        if ((1 & t && (bo(0, 'span', 22), Yo(1), wo()), 2 & t)) {
          const t = Io();
          qs(1), Jo(t.plan.prevFlexMin);
        }
      }
      function gC(t, e) {
        if (
          (1 & t &&
            (xo(0),
            Yo(1, '\n          '),
            bo(2, 'p', 23),
            Yo(3, '\n            '),
            bo(4, 'mat-icon'),
            Yo(5, 'check'),
            wo(),
            Yo(6, ' '),
            bo(7, 'span'),
            Yo(8),
            wo(),
            Yo(9, '\n          '),
            wo(),
            Yo(10, '\n        '),
            So()),
          2 & t)
        ) {
          const t = e.$implicit;
          qs(8), Jo(t);
        }
      }
      function mC(t, e) {
        1 & t &&
          (xo(0),
          Yo(1, '\n          '),
          Co(2, 'mat-divider'),
          Yo(3, '\n          '),
          bo(4, 'p', 24),
          Yo(5, 'Limited time offer'),
          wo(),
          Yo(6, '\n          '),
          bo(7, 'p', 13),
          bo(8, 'strong'),
          Yo(9, 'The Entertainer'),
          wo(),
          Yo(10, ' on us for 12 months'),
          wo(),
          Yo(11, '\n        '),
          So());
      }
      let _C = (() => {
        class t {
          constructor() {}
          ngOnInit() {}
        }
        return (
          (t.??fac = function (e) {
            return new (e || t)();
          }),
          (t.??cmp = $t({
            type: t,
            selectors: [['app-card']],
            inputs: { plan: 'plan' },
            decls: 79,
            vars: 13,
            consts: [
              [1, 'card-wrapper'],
              ['class', 'popular-badge small bold', 4, 'ngIf'],
              [1, 'left-border'],
              [1, 'container'],
              [1, 'pink', 'small'],
              [1, 'pink', 'large', 'bolder'],
              [1, 'normal', 'small'],
              [1, 'black', 'smaller'],
              [1, 'blue', 'small'],
              [1, 'blue', 'large', 'bolder'],
              [1, 'black', 'large', 'price-description'],
              ['class', 'light-grey lt', 4, 'ngIf'],
              [1, 'bolder'],
              [1, 'small'],
              [4, 'ngIf'],
              [1, 'check-list'],
              [4, 'ngFor', 'ngForOf'],
              [1, 'footer'],
              [1, 'actions'],
              [1, 'small', 'underline'],
              ['mat-stroked-button', '', 1, 'bold', 'medium'],
              [1, 'popular-badge', 'small', 'bold'],
              [1, 'light-grey', 'lt'],
              [1, 'small', 'check'],
              [1, 'chip'],
            ],
            template: function (t, e) {
              1 & t &&
                (bo(0, 'div', 0),
                Yo(1, '\n  '),
                mo(2, uC, 2, 0, 'p', 1),
                Yo(3, '\n  '),
                bo(4, 'mat-card'),
                Yo(5, '\n    '),
                Co(6, 'div', 2),
                Yo(7, '\n    '),
                bo(8, 'div', 3),
                Yo(9, '\n      '),
                bo(10, 'p', 4),
                Yo(11, 'You Pay'),
                wo(),
                Yo(12, '\n      '),
                bo(13, 'p', 5),
                Yo(14),
                bo(15, 'span', 6),
                Yo(16, '/month'),
                wo(),
                wo(),
                Yo(17, '\n      '),
                bo(18, 'p', 7),
                Yo(19, 'For 12 months + 5% VAT'),
                wo(),
                Yo(20, '\n      '),
                Co(21, 'mat-divider'),
                Yo(22, '\n      '),
                bo(23, 'p', 8),
                Yo(24, 'You Get'),
                wo(),
                Yo(25, '\n      '),
                bo(26, 'p', 9),
                Yo(27),
                wo(),
                Yo(28, '\n      '),
                Co(29, 'mat-divider'),
                Yo(30, '\n      '),
                bo(31, 'p', 10),
                Yo(32, '\n        '),
                mo(33, hC, 2, 1, 'span', 11),
                bo(34, 'span', 12),
                Yo(35),
                wo(),
                bo(36, 'span', 13),
                Yo(37, '\n          '),
                mo(38, dC, 2, 0, 'ng-container', 14),
                Yo(39, '\n          '),
                mo(40, pC, 2, 0, 'ng-container', 14),
                Yo(41, '\n        '),
                wo(),
                Yo(42, '\n      '),
                wo(),
                Yo(43, '\n      '),
                bo(44, 'p', 10),
                Yo(45, '\n        '),
                mo(46, fC, 2, 1, 'span', 11),
                bo(47, 'span', 12),
                Yo(48),
                wo(),
                bo(49, 'span', 13),
                Yo(50, 'Flexi minutes'),
                wo(),
                Yo(51, '\n      '),
                wo(),
                Yo(52, '\n      '),
                Co(53, 'mat-divider'),
                Yo(54, '\n      '),
                bo(55, 'div', 15),
                Yo(56, '\n        '),
                mo(57, gC, 11, 1, 'ng-container', 16),
                Yo(58, '\n      '),
                wo(),
                Yo(59, '\n\n      '),
                bo(60, 'div', 17),
                Yo(61, '\n        '),
                mo(62, mC, 12, 0, 'ng-container', 14),
                Yo(63, '\n        '),
                Co(64, 'mat-divider'),
                Yo(65, '\n        '),
                bo(66, 'div', 18),
                Yo(67, '\n          '),
                bo(68, 'p', 19),
                Yo(69, 'What you get'),
                wo(),
                Yo(70, '\n          '),
                bo(71, 'button', 20),
                Yo(72, 'Select'),
                wo(),
                Yo(73, '\n        '),
                wo(),
                Yo(74, '\n      '),
                wo(),
                Yo(75, '\n    '),
                wo(),
                Yo(76, '\n  '),
                wo(),
                Yo(77, '\n'),
                wo(),
                Yo(78, '\n')),
                2 & t &&
                  (Uo('not-popular', !e.plan.popular),
                  qs(2),
                  yo('ngIf', e.plan.popular),
                  qs(12),
                  Xo('AED ', e.plan.price, ' '),
                  qs(13),
                  Xo('Power Plan ', e.plan.price, ''),
                  qs(6),
                  yo('ngIf', e.plan.prevData),
                  qs(2),
                  Jo(e.plan.data),
                  qs(3),
                  yo('ngIf', e.plan.prevData),
                  qs(2),
                  yo('ngIf', !e.plan.prevData),
                  qs(6),
                  yo('ngIf', e.plan.prevFlexMin),
                  qs(2),
                  Jo(e.plan.flexMin),
                  qs(9),
                  yo('ngForOf', e.plan.list),
                  qs(5),
                  yo('ngIf', e.plan.limitedOffer));
            },
            directives: [yu, Fw, Hw, mu, Gw, lC],
            styles: [
              '@import url("https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap");.black[_ngcontent-%COMP%]{color:#333}.white[_ngcontent-%COMP%]{color:#fff}.grey[_ngcontent-%COMP%], .light-grey[_ngcontent-%COMP%]{color:#ddd}.pink[_ngcontent-%COMP%]{color:#c724b1}.purple[_ngcontent-%COMP%]{color:#5734a3}.blue[_ngcontent-%COMP%]{color:#00a9ce}.dark-blue[_ngcontent-%COMP%]{color:#00205c}.smaller[_ngcontent-%COMP%]{font-size:12px}.small[_ngcontent-%COMP%]{font-size:14px}.medium[_ngcontent-%COMP%]{font-size:16px}.large[_ngcontent-%COMP%]{font-size:19.5px}.light[_ngcontent-%COMP%]{font-weight:300}.normal[_ngcontent-%COMP%]{font-weight:400}.bold[_ngcontent-%COMP%]{font-weight:600}.bolder[_ngcontent-%COMP%]{font-weight:900}.lt[_ngcontent-%COMP%]{text-decoration:line-through}.underline[_ngcontent-%COMP%]{text-decoration:underline}p[_ngcontent-%COMP%]{margin:0}.lt[_ngcontent-%COMP%]{margin-inline-end:6px}.card-wrapper[_ngcontent-%COMP%]{display:flex;flex-direction:column;margin:10px}.card-wrapper.not-popular[_ngcontent-%COMP%]{padding-top:25px}.card-wrapper[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]{width:320px;border:1px solid #ddd;border-left:0;box-shadow:none;border-radius:10px;padding:0;overflow:hidden;display:flex;height:595px}.card-wrapper[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]:hover{box-shadow:0 4px 8px 0 #0003;transition:.3s;overflow:hidden}.card-wrapper[_ngcontent-%COMP%]   mat-divider[_ngcontent-%COMP%]{position:unset;margin:13px 0 10px;border-color:#ddd}.card-wrapper[_ngcontent-%COMP%]   .left-border[_ngcontent-%COMP%]{width:8px;height:100%;background:linear-gradient(180deg,#c724b1,#00a9ce 60%)}.card-wrapper[_ngcontent-%COMP%]   .popular-badge[_ngcontent-%COMP%]{color:#fff;background-color:#00205c;width:-moz-fit-content;width:fit-content;padding:2px 20px;margin-inline-start:8px;border-top-left-radius:8px;border-top-right-radius:8px}.card-wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]{padding-top:15px;padding-bottom:15px;padding-inline-start:15px;padding-inline-end:15px;width:100%}.card-wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .large[_ngcontent-%COMP%]{margin-top:-5px}.card-wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .price-description[_ngcontent-%COMP%]{display:flex;align-items:center;margin-top:5px}.card-wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .price-description[_ngcontent-%COMP%]   .small[_ngcontent-%COMP%]{margin-inline-start:12px}.card-wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .check-list[_ngcontent-%COMP%]{color:#333}.card-wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .check-list[_ngcontent-%COMP%]   .check[_ngcontent-%COMP%]{display:flex;align-items:center}.card-wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .check-list[_ngcontent-%COMP%]   .check[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{padding-top:10px}.card-wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .check-list[_ngcontent-%COMP%]   .check[_ngcontent-%COMP%]:first-of-type   span[_ngcontent-%COMP%]{padding-top:0}.card-wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .check-list[_ngcontent-%COMP%]   .check[_ngcontent-%COMP%]:first-of-type   mat-icon[_ngcontent-%COMP%]{height:10px}.card-wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:13px;margin-inline-end:-7px;height:0}.card-wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .footer[_ngcontent-%COMP%]{display:flex;flex-direction:column;position:absolute;bottom:0;width:87%;padding-bottom:15px}.card-wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .footer[_ngcontent-%COMP%]   .chip[_ngcontent-%COMP%]{margin-top:5px;margin-bottom:5px;width:-moz-fit-content;width:fit-content;color:#fff;padding:0 8px;font-size:12px;font-weight:500;border-radius:20px;background:linear-gradient(90deg,#5734a3 6%,#c724b1 53%)}.card-wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .footer[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]{margin-top:7px;display:flex;justify-content:space-between;align-items:center}.card-wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .footer[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:hover{color:#00a9ce;cursor:pointer;text-decoration:none}.card-wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .footer[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{color:#c724b1;padding:1px 50px}',
            ],
          })),
          t
        );
      })();
      function yC(t, e) {
        if ((1 & t && (xo(0), Yo(1, '\n    '), Co(2, 'app-card', 2), Yo(3, '\n  '), So()), 2 & t)) {
          const t = e.$implicit;
          qs(2), yo('plan', t);
        }
      }
      const vC = [
        {
          path: 'du',
          component: (() => {
            class t {
              constructor() {
                this.plans = [
                  {
                    popular: !1,
                    price: '125',
                    data: '4 GB',
                    flexMin: '100',
                    list: ['No activation fee. Save AED 125', '4 GB free data on WiFi UAE'],
                    limitedOffer: !1,
                  },
                  {
                    popular: !0,
                    price: '200',
                    prevData: '13',
                    data: '26 GB',
                    flexMin: '400',
                    list: [
                      'No activation fee. Save AED 125',
                      '15 GB free data on WiFi UAE',
                      'Carry over data to next month',
                    ],
                    limitedOffer: !0,
                  },
                  {
                    popular: !1,
                    price: '300',
                    prevData: '25',
                    data: '50 GB',
                    flexMin: '1020',
                    list: [
                      'No activation fee. Save AED 125',
                      '25 GB free data on WiFi UAE',
                      'Carry over data to next month',
                      'Amazon Prime on us',
                      'Free Internet Calling Pack',
                    ],
                    limitedOffer: !0,
                  },
                  {
                    popular: !1,
                    price: '500',
                    prevData: '50',
                    data: '100 GB',
                    flexMin: '1500',
                    list: [
                      'No activation fee. Save AED 125',
                      '100 GB free data on WiFi UAE',
                      'Carry over data to next month',
                      'Amazon Prime on us',
                      'Free Internet Calling Pack',
                      'Roaming 2 GB',
                    ],
                    limitedOffer: !0,
                  },
                  {
                    popular: !1,
                    price: '1000',
                    prevData: '120',
                    data: 'Unlimited',
                    prevFlexMin: '2500',
                    flexMin: 'Unlimited',
                    list: [
                      'No activation fee. Save AED 125',
                      '120 GB free data on WiFi UAE',
                      'Carry over data to next month',
                      'Amazon Prime on us',
                      'Free Internet Calling Pack',
                      'Roaming 5 GB',
                    ],
                    limitedOffer: !0,
                  },
                ];
              }
              ngOnInit() {}
            }
            return (
              (t.??fac = function (e) {
                return new (e || t)();
              }),
              (t.??cmp = $t({
                type: t,
                selectors: [['app-du']],
                decls: 11,
                vars: 1,
                consts: [
                  [1, 'cards'],
                  [4, 'ngFor', 'ngForOf'],
                  [3, 'plan'],
                ],
                template: function (t, e) {
                  1 & t &&
                    (bo(0, 'mat-toolbar'),
                    Yo(1, '\n  '),
                    bo(2, 'span'),
                    Yo(3, 'Postpaid Plans'),
                    wo(),
                    Yo(4, '\n'),
                    wo(),
                    Yo(5, '\n\n'),
                    bo(6, 'section', 0),
                    Yo(7, '\n  '),
                    mo(8, yC, 4, 1, 'ng-container', 1),
                    Yo(9, '\n'),
                    wo(),
                    Yo(10, '\n')),
                    2 & t && (qs(8), yo('ngForOf', e.plans));
                },
                directives: [Mw, mu, _C],
                styles: [
                  '@import url("https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap");.black[_ngcontent-%COMP%]{color:#333}.white[_ngcontent-%COMP%]{color:#fff}.grey[_ngcontent-%COMP%], .light-grey[_ngcontent-%COMP%]{color:#ddd}.pink[_ngcontent-%COMP%]{color:#c724b1}.purple[_ngcontent-%COMP%]{color:#5734a3}.blue[_ngcontent-%COMP%]{color:#00a9ce}.dark-blue[_ngcontent-%COMP%]{color:#00205c}.smaller[_ngcontent-%COMP%]{font-size:12px}.small[_ngcontent-%COMP%]{font-size:14px}.medium[_ngcontent-%COMP%]{font-size:16px}.large[_ngcontent-%COMP%]{font-size:19.5px}.light[_ngcontent-%COMP%]{font-weight:300}.normal[_ngcontent-%COMP%]{font-weight:400}.bold[_ngcontent-%COMP%]{font-weight:600}.bolder[_ngcontent-%COMP%]{font-weight:900}.lt[_ngcontent-%COMP%]{text-decoration:line-through}.underline[_ngcontent-%COMP%]{text-decoration:underline}mat-toolbar[_ngcontent-%COMP%]{color:#fff;background-color:#5173c2}.cards[_ngcontent-%COMP%]{padding:20px;display:flex;width:100%;flex-wrap:wrap}',
                ],
              })),
              t
            );
          })(),
        },
        { path: '**', redirectTo: '', pathMatch: 'full' },
      ];
      let bC = (() => {
          class t {}
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??mod = Zt({ type: t })),
            (t.??inj = ft({ providers: [], imports: [[fm.forRoot(vC)], fm] })),
            t
          );
        })(),
        wC = (() => {
          class t {}
          return (
            (t.??fac = function (e) {
              return new (e || t)();
            }),
            (t.??mod = Zt({ type: t, bootstrap: [Ib] })),
            (t.??inj = ft({
              providers: [
                { provide: qm, useClass: Pv, multi: !0 },
                { provide: qm, useClass: Mv, multi: !0 },
                { provide: Ug, useClass: Nv },
              ],
              imports: [
                [
                  ih,
                  A_.register('./ngsw-worker.js', { enabled: Av }),
                  Sd,
                  n_,
                  fm,
                  ny.forRoot(),
                  Tv,
                  Rv,
                  Sb,
                  xb,
                  Tb,
                  db,
                  Uw,
                  Nw,
                  zw,
                  cC,
                  Zw,
                  bC,
                ],
              ],
            })),
            t
          );
        })();
      (function () {
        if (kc) throw new Error('Cannot enable prod mode after platform setup.');
        Ec = !1;
      })(),
        rh()
          .bootstrapModule(wC)
          .catch((t) => console.error(t));
    },
  },
  (t) => {
    'use strict';
    t((t.s = 544));
  },
]);
