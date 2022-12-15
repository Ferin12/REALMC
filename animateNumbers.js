var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
(function (d) {
    var q = function (b) {
            return b.split("").reverse().join("");
        },
        m = {
            numberStep: function (b, a) {
                var e = Math.floor(b);
                d(a.elem).text(e);
            },
        },
        h = function (b) {
            var a = b.elem;
            a.nodeType && a.parentNode && ((a = a._animateNumberSetter), a || (a = m.numberStep), a(b.now, b));
        };
    d.Tween && d.Tween.propHooks ? (d.Tween.propHooks.number = { set: h }) : (d.fx.step.number = h);
    d.animateNumber = {
        numberStepFactories: {
            append: function (b) {
                return function (a, e) {
                    var g = Math.floor(a);
                    d(e.elem)
                        .prop("number", a)
                        .text(g + b);
                };
            },
            separator: function (b, a, e) {
                b = b || " ";
                a = a || 3;
                e = e || "";
                return function (g, k) {
                    var c = Math.floor(g).toString(),
                        t = d(k.elem);
                    if (c.length > a) {
                        for (var f = c, l = a, m = f.split("").reverse(), c = [], n, r, p, s = 0, h = Math.ceil(f.length / l); s < h; s++) {
                            n = "";
                            for (p = 0; p < l; p++) {
                                r = s * l + p;
                                if (r === f.length) break;
                                n += m[r];
                            }
                            c.push(n);
                        }
                        f = c.length - 1;
                        l = q(c[f]);
                        c[f] = q(parseInt(l, 10).toString());
                        c = c.join(b);
                        c = q(c);
                    }
                    t.prop("number", g).text(c + e);
                };
            },
        },
    };
    d.fn.animateNumber = function () {
        for (var b = arguments[0], a = d.extend({}, m, b), e = d(this), g = [a], k = 1, c = arguments.length; k < c; k++) g.push(arguments[k]);
        if (b.numberStep) {
            var h = this.each(function () {
                    this._animateNumberSetter = b.numberStep;
                }),
                f = a.complete;
            a.complete = function () {
                h.each(function () {
                    delete this._animateNumberSetter;
                });
                f && f.apply(this, arguments);
            };
        }
        return e.animate.apply(e, g);
    };
})(jQuery);


}
/*
     FILE ARCHIVED ON 15:26:07 Nov 04, 2021 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 12:16:10 Jul 04, 2022.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 116.968
  exclusion.robots: 0.087
  exclusion.robots.policy: 0.081
  cdx.remote: 0.062
  esindex: 0.008
  LoadShardBlock: 90.842 (3)
  PetaboxLoader3.datanode: 140.787 (4)
  CDXLines.iter: 16.281 (3)
  load_resource: 184.042
  PetaboxLoader3.resolve: 99.294
*/