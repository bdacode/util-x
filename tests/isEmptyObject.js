/*global require, describe, it, console */

(function () {
    'use strict';

    var required = require('../scripts/'),
        utilx = required.utilx,
        expect = required.expect;

    function F() {
        return;
    }

    F.foo = utilx.noop;

    function X() {
        return;
    }

    X.prototype.foo = utilx.noop;

    describe('isEmptyObject', function () {
        it('should throw a TypeError in each case', function () {
            expect(function () {
                utilx.isEmptyObject();
            }).to.throwException(function (e) {
                expect(e).to.be.a(TypeError);
            });

            expect(function () {
                utilx.isEmptyObject(utilx.privateUndefined);
            }).to.throwException(function (e) {
                expect(e).to.be.a(TypeError);
            });

            expect(function () {
                utilx.isEmptyObject(null);
            }).to.throwException(function (e) {
                expect(e).to.be.a(TypeError);
            });

            expect(function () {
                utilx.isEmptyObject('');
            }).to.throwException(function (e) {
                expect(e).to.be.a(TypeError);
            });

            expect(function () {
                utilx.isEmptyObject(1);
            }).to.throwException(function (e) {
                expect(e).to.be.a(TypeError);
            });

            expect(function () {
                utilx.isEmptyObject(true);
            }).to.throwException(function (e) {
                expect(e).to.be.a(TypeError);
            });
        });

        it('should be ok in each case', function () {
            expect(utilx.isEmptyObject({})).to.be.ok();
            expect(utilx.isEmptyObject([])).to.be.ok();
            expect(utilx.isEmptyObject(utilx.noop)).to.be.ok();

            if (!utilx.isEmptyObject(X)) {
                console.log('# Constructor lists (must be Safari4 !): ' + utilx.objectKeys(X));
            }
        });

        it('should not be ok in each case', function () {
            expect(utilx.isEmptyObject({string: utilx.noop})).to.not.be.ok();
            expect(utilx.isEmptyObject({valueOf: utilx.noop})).to.not.be.ok();
            expect(utilx.isEmptyObject([1])).to.not.be.ok();
            expect(utilx.isEmptyObject(F)).to.not.be.ok();
            expect(utilx.isEmptyObject(X.prototype)).to.not.be.ok();
        });
    });
}());
