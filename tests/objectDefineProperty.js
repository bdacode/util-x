/*global require, describe, it */

(function () {
    'use strict';

    var required = require('../scripts/'),
        utilx = required.utilx,
        expect = required.expect;

    describe('objectDefineProperty', function () {
        it('should throw a TypeError in each case', function () {
            expect(function () {
                utilx.objectDefineProperty();
            }).to.throwException(function (e) {
                expect(e).to.be.a(TypeError);
            });

            expect(function () {
                utilx.objectDefineProperty(utilx.privateUndefined);
            }).to.throwException(function (e) {
                expect(e).to.be.a(TypeError);
            });

            expect(function () {
                utilx.objectDefineProperty(null);
            }).to.throwException(function (e) {
                expect(e).to.be.a(TypeError);
            });

            expect(function () {
                utilx.objectDefineProperty({}, 'foo');
            }).to.throwException(function (e) {
                expect(e).to.be.a(TypeError);
            });

            expect(function () {
                utilx.objectDefineProperty({}, 'foo', utilx.privateUndefined);
            }).to.throwException(function (e) {
                expect(e).to.be.a(TypeError);
            });

            expect(function () {
                utilx.objectDefineProperty({}, 'foo', null);
            }).to.throwException(function (e) {
                expect(e).to.be.a(TypeError);
            });

            expect(function () {
                utilx.objectDefineProperty({}, 'foo', true);
            }).to.throwException(function (e) {
                expect(e).to.be.a(TypeError);
            });

            expect(function () {
                utilx.objectDefineProperty({}, 'foo', 1);
            }).to.throwException(function (e) {
                expect(e).to.be.a(TypeError);
            });
        });

        it('should not throw an error deifnining properties on plain objects', function () {
            expect(function () {
                var obj = utilx.objectDefineProperty({}, 'foo', {
                    enumerable: true,
                    writable: true,
                    configurable: true
                });

                expect(utilx.objectHasOwnProperty(obj, 'foo')).to.be.ok();
                expect(obj.foo).to.be(utilx.privateUndefined);
            }).to.not.throwException();

            expect(function () {
                var obj = utilx.objectDefineProperty({}, 'foo', {
                    value: utilx.privateUndefined,
                    enumerable: true,
                    writable: true,
                    configurable: true
                });

                expect(utilx.objectHasOwnProperty(obj, 'foo')).to.be.ok();
                expect(obj.foo).to.be(utilx.privateUndefined);
            }).to.not.throwException();

            expect(function () {
                var obj = utilx.objectDefineProperty({}, 'foo', {
                    value: null,
                    enumerable: true,
                    writable: true,
                    configurable: true
                });

                expect(utilx.objectHasOwnProperty(obj, 'foo')).to.be.ok();
                expect(obj.foo).to.be(null);
            }).to.not.throwException();
        });

        it('under investigation in older versions of Chrome', function () {
            expect(function () {
                var obj = utilx.objectDefineProperty([10], '0', {
                    enumerable: true,
                    writable: true,
                    configurable: true
                });

                /*global console */
                console.log('# LENGTH: ' + obj.length);
                expect(obj.length).to.be(1);
                console.log('# INTEGER VALUE: ' + obj[0]);
                console.log('# STRING VALUE: ' + obj['0']);
                expect(obj[0]).to.be(10);
            }).to.not.throwException();
        });

        it('should not throw an error deifnining properties on arrays', function () {
            expect(function () {
                var obj = utilx.objectDefineProperty([], 'foo', {
                    value: null,
                    enumerable: true,
                    writable: true,
                    configurable: true
                });

                expect(utilx.objectHasOwnProperty(obj, 'foo')).to.be.ok();
                expect(obj.foo).to.be(null);
            }).to.not.throwException();

            expect(function () {
                var obj = utilx.objectDefineProperty([], '0', {
                    enumerable: true,
                    writable: true,
                    configurable: true
                });

                expect(obj.length).to.be(1);
                expect(obj[0]).to.be(utilx.privateUndefined);
            }).to.not.throwException();

            expect(function () {
                var obj = utilx.objectDefineProperty([], '0', {
                    value: utilx.privateUndefined,
                    enumerable: true,
                    writable: true,
                    configurable: true
                });

                expect(obj.length).to.be(1);
                expect(obj[0]).to.be(utilx.privateUndefined);
            }).to.not.throwException();

            expect(function () {
                var obj = utilx.objectDefineProperty([], '0', {
                    value: null,
                    enumerable: true,
                    writable: true,
                    configurable: true
                });

                expect(utilx.objectHasOwnProperty(obj, '0')).to.be.ok();
                expect(obj.length).to.be(1);
                expect(obj[0]).to.be(null);
            }).to.not.throwException();

            expect(function () {
                var obj = utilx.objectDefineProperty([], '0', {
                    enumerable: true,
                    writable: true,
                    configurable: true
                });

                expect(obj.length).to.be(1);
                expect(obj[0]).to.be(utilx.privateUndefined);
            }).to.not.throwException();

            expect(function () {
                var obj = utilx.objectDefineProperty([], '0', {
                    value: utilx.privateUndefined,
                    enumerable: true,
                    writable: true,
                    configurable: true
                });

                expect(obj.length).to.be(1);
                expect(obj[0]).to.be(utilx.privateUndefined);
            }).to.not.throwException();

            expect(function () {
                var obj = utilx.objectDefineProperty([], '0', {
                    value: null,
                    enumerable: true,
                    writable: true,
                    configurable: true
                });

                expect(utilx.objectHasOwnProperty(obj, '0')).to.be.ok();
                expect(obj.length).to.be(1);
                expect(obj[0]).to.be(null);
            }).to.not.throwException();

            expect(function () {
                var obj = utilx.objectDefineProperty([], 0, {
                    enumerable: true,
                    writable: true,
                    configurable: true
                });

                expect(obj.length).to.be(1);
                expect(obj[0]).to.be(utilx.privateUndefined);
            }).to.not.throwException();

            expect(function () {
                var obj = utilx.objectDefineProperty([], 0, {
                    value: utilx.privateUndefined,
                    enumerable: true,
                    writable: true,
                    configurable: true
                });

                expect(obj.length).to.be(1);
                expect(obj[0]).to.be(utilx.privateUndefined);
            }).to.not.throwException();

            expect(function () {
                var obj = utilx.objectDefineProperty([], 0, {
                    value: null,
                    enumerable: true,
                    writable: true,
                    configurable: true
                });

                expect(utilx.objectHasOwnProperty(obj, 0)).to.be.ok();
                expect(obj.length).to.be(1);
                expect(obj[0]).to.be(null);
            }).to.not.throwException();

            expect(function () {
                var obj = utilx.objectDefineProperty([], 1, {
                    enumerable: true,
                    writable: true,
                    configurable: true
                });

                expect(obj.length).to.be(2);
                expect(obj[1]).to.be(utilx.privateUndefined);
            }).to.not.throwException();

            expect(function () {
                var obj = utilx.objectDefineProperty([], 1, {
                    value: utilx.privateUndefined,
                    enumerable: true,
                    writable: true,
                    configurable: true
                });

                expect(obj.length).to.be(2);
                expect(obj[1]).to.be(utilx.privateUndefined);
            }).to.not.throwException();

            expect(function () {
                var obj = utilx.objectDefineProperty([], 1, {
                    value: null,
                    enumerable: true,
                    writable: true,
                    configurable: true
                });

                expect(utilx.objectHasOwnProperty(obj, 1)).to.be.ok();
                expect(obj.length).to.be(2);
                expect(obj[1]).to.be(null);
            }).to.not.throwException();

            expect(function () {
                var obj = utilx.objectDefineProperty([], 1.1, {
                    enumerable: true,
                    writable: true,
                    configurable: true
                });

                expect(utilx.objectHasOwnProperty(obj, 1.1)).to.be.ok();
                expect(obj.length).to.be(0);
                expect(obj[1.1]).to.be(utilx.privateUndefined);
            }).to.not.throwException();

            expect(function () {
                var obj = utilx.objectDefineProperty([], 1.1, {
                    value: utilx.privateUndefined,
                    enumerable: true,
                    writable: true,
                    configurable: true
                });

                expect(utilx.objectHasOwnProperty(obj, 1.1)).to.be.ok();
                expect(obj.length).to.be(0);
                expect(obj[1.1]).to.be(utilx.privateUndefined);
            }).to.not.throwException();

            expect(function () {
                var obj = utilx.objectDefineProperty([], 1.1, {
                    value: null,
                    enumerable: true,
                    writable: true,
                    configurable: true
                });

                expect(utilx.objectHasOwnProperty(obj, 1.1)).to.be.ok();
                expect(obj.length).to.be(0);
                expect(obj[1.1]).to.be(null);
            }).to.not.throwException();

            /*jshint -W047 */
            expect(function () {
                var obj = utilx.objectDefineProperty([], 1., {
                    enumerable: true,
                    writable: true,
                    configurable: true
                });

                expect(obj.length).to.be(2);
                expect(obj[1]).to.be(utilx.privateUndefined);
            }).to.not.throwException();

            expect(function () {
                var obj = utilx.objectDefineProperty([], 1., {
                    value: utilx.privateUndefined,
                    enumerable: true,
                    writable: true,
                    configurable: true
                });

                expect(obj.length).to.be(2);
                expect(obj[1]).to.be(utilx.privateUndefined);
            }).to.not.throwException();

            expect(function () {
                var obj = utilx.objectDefineProperty([], 1., {
                    value: null,
                    enumerable: true,
                    writable: true,
                    configurable: true
                });

                expect(obj.length).to.be(2);
                expect(obj[1]).to.be(null);
            }).to.not.throwException();

            expect(function () {
                var obj = utilx.objectDefineProperty([], '1.', {
                    enumerable: true,
                    writable: true,
                    configurable: true
                });

                expect(obj.length).to.be(2);
                expect(obj[1]).to.be(utilx.privateUndefined);
            }).to.not.throwException();

            expect(function () {
                var obj = utilx.objectDefineProperty([], '1.', {
                    value: utilx.privateUndefined,
                    enumerable: true,
                    writable: true,
                    configurable: true
                });

                expect(obj.length).to.be(2);
                expect(obj[1]).to.be(utilx.privateUndefined);
            }).to.not.throwException();

            expect(function () {
                var obj = utilx.objectDefineProperty([], '1.', {
                    value: null,
                    enumerable: true,
                    writable: true,
                    configurable: true
                });

                expect(obj.length).to.be(2);
                expect(obj[1]).to.be(null);
            }).to.not.throwException();

            expect(function () {
                var obj = utilx.objectDefineProperty([], '1.', {
                    value: true,
                    enumerable: true,
                    writable: true,
                    configurable: true
                });

                expect(obj.length).to.be(2);
                expect(obj[1]).to.be(true);
            }).to.not.throwException();
            /*jshint +W047 */
        });

        it('should not throw an error deifnining properties on functions', function () {
            expect(function () {
                var obj = utilx.objectDefineProperty(function () { return; }, 'foo', {
                    enumerable: true,
                    writable: true,
                    configurable: true
                });

                expect(utilx.objectHasOwnProperty(obj, 'foo')).to.be.ok();
                expect(obj.foo).to.be(utilx.privateUndefined);
            }).to.not.throwException();

            expect(function () {
                var obj = utilx.objectDefineProperty(function () { return; }, 'foo', {
                    value: utilx.privateUndefined,
                    enumerable: true,
                    writable: true,
                    configurable: true
                });

                expect(utilx.objectHasOwnProperty(obj, 'foo')).to.be.ok();
                expect(obj.foo).to.be(utilx.privateUndefined);
            }).to.not.throwException();

            expect(function () {
                var obj = utilx.objectDefineProperty(function () { return; }, 'foo', {
                    value: null,
                    enumerable: true,
                    writable: true,
                    configurable: true
                });

                expect(utilx.objectHasOwnProperty(obj, 'foo')).to.be.ok();
                expect(obj.foo).to.be(null);
            }).to.not.throwException();
        });
    });
}());
