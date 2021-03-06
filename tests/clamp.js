/*global require, describe, it */

(function () {
    'use strict';

    var required = require('../scripts/'),
        utilx = required.utilx,
        expect = required.expect;

    describe('clamp', function () {
        it('should not throw an error in each case', function () {
            expect(utilx.clamp(-10, -5, 5)).to.be(-5);
            expect(utilx.clamp(10, -5, 5)).to.be(5);
            expect(utilx.clamp(-5, -5, 5)).to.be(-5);
            expect(utilx.clamp(5, -5, 5)).to.be(5);
        });
    });
}());
