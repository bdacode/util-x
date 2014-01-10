/**
 * @file {@link @@HOMEPAGE @@MODULE}. @@DESCRIPTION.
 * @version @@VERSION
 * @author @@AUTHORNAME <@@AUTHOREMAIL>
 * @copyright @@COPYRIGHT @@AUTHORNAME
 * @license {@link <@@LICLINK> @@LICENSE}
 * @module @@MODULE
 * @requires stacktrace-js
 */

/*
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

(function (globalThis) {
    /* jshint -W034 */
    'use strict';

    function factory(printStackTrace) {
        /**
         * @namespace utilx
         */

        var utilx = {},
            WORD8 = 128,
            UWORD8 = 256,
            WORD16 = 32768,
            UWORD16 = 65536,
            WORD32 = 2147483648,
            UWORD32 = 4294967296,
            MAX_UINT32 = 4294967295,
            MAX_INT32 = 2147483647,
            MIN_INT32 = -2147483648,
            MAX_UINT16 = 65535,
            MAX_INT16 = 32767,
            MIN_INT16 = -32768,
            MAX_UINT8 = 255,
            MAX_INT8 = 127,
            MIN_INT8 = -128,
            UNSAFE_INTEGER = 9007199254740992,
            MAX_INTEGER = 9007199254740991,
            MIN_INTEGER = -9007199254740991,
            POSITIVE_INFINITY = Number.POSITIVE_INFINITY,
            NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY,
            MAX_VALUE = 1.7976931348623157e+308,
            MIN_VALUE = 5e-324,
            NAN = NaN,
            EPSILON = 2.220446049250313e-16,
            baseObject = {},
            baseArray = [],
            baseString = '',
            baseNumber = 0,
            baseBoolean = true,
            CtrObject = baseObject.constructor,
            noNewCtrObject = CtrObject,
            CtrBoolean = baseBoolean.constructor,
            CtrNumber = baseNumber.constructor,
            CtrString = baseString.constructor,
            protoName = '__proto__',
            rxSplitNewLine = new RegExp('\\r\\n|\\n'),

            /**
             * For hasOwnProperty bug.
             * @ignore
             * @type {array.<string>}
             */
            defaultProperties = [
                'toString',
                'toLocaleString',
                'valueOf',
                'hasOwnProperty',
                'isPrototypeOf',
                'propertyIsEnumerable',
                'constructor'
            ],

            objectGetOwnPropertyDescriptor,

            // Safari 2.x NFE bug fix
            // http://kangax.github.io/nfe/
            tempSafariNFE;

        /**
         * 128
         * @memberOf utilx
         * @type {number}
         */
        utilx.WORD8 = WORD8;

        /**
         * 256
         * @memberOf utilx
         * @type {number}
         */
        utilx.UWORD8 = UWORD8;

        /**
         * 65536
         * @memberOf utilx
         * @type {number}
         */
        utilx.WORD16 = WORD16;

        /**
         * 32768
         * @memberOf utilx
         * @type {number}
         */
        utilx.UWORD16 = UWORD16;

        /**
         * 2147483648
         * @memberOf utilx
         * @type {number}
         */
        utilx.WORD32 = WORD32;

        /**
         * 4294967296
         * @memberOf utilx
         * @type {number}
         */
        utilx.UWORD32 = UWORD32;

        /**
         * 4294967295
         * @memberOf utilx
         * @type {number}
         */
        utilx.MAX_UINT32 = MAX_UINT32;

        /**
         * 214783647
         * @memberOf utilx
         * @type {number}
         */
        utilx.MAX_INT32 = MAX_INT32;

        /**
         * -214783648
         * @memberOf utilx
         * @type {number}
         */
        utilx.MIN_INT32 = MIN_INT32;

        /**
         * 65535
         * @memberOf utilx
         * @type {number}
         */
        utilx.MAX_UINT16 = MAX_UINT16;

        /**
         * 32767
         * @memberOf utilx
         * @type {number}
         */
        utilx.MAX_INT16 = MAX_INT16;

        /**
         * -32768
         * @memberOf utilx
         * @type {number}
         */
        utilx.MIN_INT16 = MIN_INT16;

        /**
         * 255
         * @memberOf utilx
         * @type {number}
         */
        utilx.MAX_UINT8 = MAX_UINT8;

        /**
         * 127
         * @memberOf utilx
         * @type {number}
         */
        utilx.MAX_INT8 = MAX_INT8;

        /**
         * -128
         * @memberOf utilx
         * @type {number}
         */
        utilx.MIN_INT8 = MIN_INT8;

        /**
         * 9007199254740991
         * @memberOf utilx
         * @type {number}
         */
        utilx.MAX_INTEGER = MAX_INTEGER;

        /**
         * -9007199254740991
         * @memberOf utilx
         * @type {number}
         */
        utilx.MIN_INTEGER = MIN_INTEGER;

        /**
         * Infinity
         * @memberOf utilx
         * @type {number}
         */
        utilx.POSITIVE_INFINITY = POSITIVE_INFINITY;

        /**
         * -Infinity
         * @memberOf utilx
         * @type {number}
         */
        utilx.NEGATIVE_INFINITY = NEGATIVE_INFINITY;

        /**
         * 1.7976931348623157e+308
         * @memberOf utilx
         * @type {number}
         */
        utilx.MAX_VALUE = MAX_VALUE;

        /**
         * 5e-324
         * @memberOf utilx
         * @type {number}
         */
        utilx.MIN_VALUE = MIN_VALUE;

        /**
         * NaN
         * @memberOf utilx
         * @type {number}
         */
        utilx.NAN = NAN;

        /**
         * 2.220446049250313e-16
         * @memberOf utilx
         * @type {number}
         */
        utilx.EPSILON = EPSILON;

        /**
         * Returns the primitive value undefined.
         * @memberOf utilx
         * @function
         * @return {undefined}
         */
        utilx.noop = function () {
            return;
        };

        /**
         * undefined
         * @memberOf utilx
         * @type {undefined}
         */
        utilx.privateUndefined = (function () {
            return utilx.noop();
        }());

        /**
         * Returns an arguments object of the srguments supplied.
         * @memberOf utilx
         * @function
         * @argument {...*} var_args
         * @return {undefined}
         */
        utilx.returnArgs = function () {
            return arguments;
        };

        /**
         * Coerces an input to a number.
         * @memberOf utilx
         * @function
         * @param {*} inputArg
         * @return {number}
         */
        utilx.toNumber = function (inputArg) {
            return +inputArg;
        };

        /**
         * Returns true if the operands are loosely equal.
         * @memberOf utilx
         * @function
         * @param {*} a
         * @param {*} b
         * @return {boolean}
         */
        utilx.equal = function (a, b) {
            /*jslint eqeq: true */
            return a == b;
        };

        /**
         * Returns true if the operands are not loosely equal.
         * @memberOf utilx
         * @function
         * @param {*} a
         * @param {*} b
         * @return {boolean}
         */
        utilx.notEqual = function (a, b) {
            /*jslint eqeq: true */
            return a != b;
        };

        /**
         * Returns true if the operands are strictly equal with no type conversion.
         * @memberOf utilx
         * @function
         * @param {*} a
         * @param {*} b
         * @return {boolean}
         */
        utilx.strictEqual = function (a, b) {
            return a === b;
        };

        /**
         * Returns true if the operands are not strictly equal with no type conversion.
         * @memberOf utilx
         * @function
         * @param {*} a
         * @param {*} b
         * @return {boolean}
         */
        utilx.notStrictEqual = function (a, b) {
            return a !== b;
        };

        /**
         * Returns true if the operand number is less than limit.
         * @param {number} number
         * @param {number} limit
         * @return {boolean}
         */
        utilx.lt = function (number, limit) {
            return number < limit;
        };

        /**
         * Returns true if the operand number is less than or equal to limit.
         * @memberOf utilx
         * @function
         * @param {number} number
         * @param {number} limit
         * @return {boolean}
         */
        utilx.lte = function (number, limit) {
            return number <= limit;
        };

        /**
         * Returns true if the operand number is greater than limit.
         * @memberOf utilx
         * @function
         * @param {number} number
         * @param {number} limit
         * @return {boolean}
         */
        utilx.gt = function (number, limit) {
            return number > limit;
        };

        /**
         * Returns true if the operand number is greater than or equal to limit.
         * @memberOf utilx
         * @function
         * @param {number} number
         * @param {number} limit
         * @return {boolean}
         */
        utilx.gte = function (number, limit) {
            return number >= limit;
        };

        /**
         * The mod/remainder operator returns the first operand modulo of the second operand, that is,
         * number1 modulo number2, in the preceding statement, where number1 and number2 are numbers.
         * The modulo function is the integer remainder of dividing number1 by number2.
         * For example, 12 % 5 returns 2. The result will have the same sign as number1; that is, -1 % 2 returns -1.
         * Truncating division
         * @see {@link http://www.ecma-international.org/ecma-262/5.1/#sec-11.5.3 Applying the % Operator}
         * @memberOf utilx
         * @function
         * @param {number} number1
         * @param {number} number2
         * @return {number}
         */
        utilx.mod = function (number1, number2) {
            return number1 % number2;
        };

        /**
         * Returns a number clamped to the range set by min and max.
         * @memberOf utilx
         * @function
         * @param {number} number
         * @param {number} min
         * @param {number} max
         * @return {number}
         */
        utilx.clamp = function (number, min, max) {
            return Math.min(Math.max(number, min), max);
        };

        /**
         * Returns true if the operand number is greater than or equal to min or if number is less than or equal to max.
         * @memberOf utilx
         * @function
         * @param {number} number
         * @param {number} min
         * @param {number} max
         * @return {boolean}
         */
        utilx.inRange = function (number, min, max) {
            return utilx.gte(number, min) && utilx.lte(number, max);
        };

        /**
         * Returns true if the operand inputArg is undefined.
         * @memberOf utilx
         * @function
         * @param {*} inputArg
         * @return {boolean}
         */
        utilx.isUndefined = function (inputArg) {
            return utilx.strictEqual(typeof inputArg, 'undefined');
        };

        /**
         * Returns true if the operand inputArg is null.
         * @memberOf utilx
         * @function
         * @param {*} inputArg
         * @return {boolean}
         */
        utilx.isNull = function (inputArg) {
            return utilx.strictEqual(inputArg, null);
        };

        /**
         * Returns true if the operand inputArg is undefined or null.
         * @memberOf utilx
         * @function
         * @param {*} inputArg
         * @return {boolean}
         */
        utilx.isUndefinedOrNull = function (value) {
            return utilx.isUndefined(value) || utilx.isNull(value);
        };

        /**
         * Returns true if the operand inputArg is a true.
         * @memberOf utilx
         * @function
         * @param {*} inputArg
         * @return {boolean}
         */
        utilx.isTrue = function (inputArg) {
            return utilx.strictEqual(inputArg, true);
        };

        /**
         * Returns true if the operand inputArg is a false.
         * @memberOf utilx
         * @function
         * @param {*} inputArg
         * @return {boolean}
         */
        utilx.isFalse = function (inputArg) {
            return utilx.strictEqual(inputArg, false);
        };

        /**
         * Returns true if the operand inputArg is a boolean.
         * @memberOf utilx
         * @function
         * @param {*} inputArg
         * @return {boolean}
         */
        utilx.isBoolean = function (inputArg) {
            return utilx.isTrue(inputArg) || utilx.isFalse(inputArg);
        };

        /**
         * Converts any truthy or falsy expression into a boolean true or false.
         * @memberOf utilx
         * @function
         * @param {*} inputArg
         * @return {boolean}
         */
        utilx.toBoolean = function (inputArg) {
            return !!inputArg;
        };

        /**
         * Returns true if the operand inputArg is a number.
         * @memberOf utilx
         * @function
         * @param {*} inputArg
         * @return {boolean}
         */
        utilx.isNumber = function (inputArg) {
            return utilx.strictEqual(typeof inputArg, 'number');
        };

        /**
         * Returns true if the operand inputArg is the number 0.
         * @memberOf utilx
         * @function
         * @param {*} inputArg
         * @return {boolean}
         */
        utilx.isZero = function (inputArg) {
            return utilx.strictEqual(inputArg, 0);
        };

        /**
         * Returns true if the operand inputArg is the number 0 or +0.
         * @memberOf utilx
         * @function
         * @param {*} inputArg
         * @return {boolean}
         */
        utilx.isPositiveZero = function (inputArg) {
            return utilx.isZero(inputArg) && utilx.strictEqual(1 / inputArg, Infinity);
        };

        /**
         * Returns true if the operand inputArg is the number -0.
         * @memberOf utilx
         * @function
         * @param {*} inputArg
         * @return {boolean}
         */
        utilx.isNegativeZero = function (inputArg) {
            return utilx.isZero(inputArg) && utilx.strictEqual(1 / inputArg, -Infinity);
        };

        /**
         * Returns true if the operand inputArg is a string.
         * @memberOf utilx
         * @function
         * @param {*} inputArg
         * @return {boolean}
         */
        utilx.isString = function (inputArg) {
            return utilx.strictEqual(typeof inputArg, 'string');
        };

        /**
         * Returns true if the operand inputArg is a primitive object.
         * @memberOf utilx
         * @function
         * @param {*} inputArg
         * @return {boolean}
         */
        utilx.isPrimitive = function (object) {
            return utilx.isUndefinedOrNull(object) ||
                utilx.isString(object) ||
                utilx.isNumber(object) ||
                utilx.isBoolean(object);
        };

        /**
         * Returns true if the operand inputArg is typeof Object.
         * @memberOf utilx
         * @function
         * @param {*} inputArg
         * @return {boolean}
         */
        utilx.isTypeOfObject = (function () {
            // Unused variable for JScript NFE bug
            // http://kangax.github.io/nfe/
            var testRx = new RegExp('test'),
                objectString = 'object',
                isRxObject = utilx.strictEqual(typeof testRx, objectString),
                nfeIsTypeOfObject;

            if (utilx.isTrue(isRxObject)) {
                tempSafariNFE = function nfeIsTypeOfObject(inputArg) {
                    return utilx.strictEqual(typeof inputArg, objectString);
                };
            } else {
                tempSafariNFE = function nfeIsTypeOfObject(inputArg) {
                    return utilx.strictEqual(typeof inputArg, objectString) || utilx.isRegExp(inputArg);
                };
            }

            nfeIsTypeOfObject = null;

            return tempSafariNFE;
        }());

        /**
         * Returns true if the operand inputArg is of type Object but not if null.
         * @memberOf utilx
         * @function
         * @param {*} inputArg
         * @return {boolean}
         */
        utilx.isTypeObject = function (inputArg) {
            return !utilx.isNull(inputArg) && utilx.isTypeOfObject(inputArg);
        };

        /**
         * Returns true if the operand inputArg is an empty string.
         * @memberOf utilx
         * @function
         * @param {*} inputArg
         * @return {boolean}
         */
        utilx.isEmptyString = function (inputArg) {
            return utilx.strictEqual(inputArg, '');
        };

        /**
         * Returns true if the operand inputArg is deemed numeric.
         * @memberOf utilx
         * @function
         * @param {*} inputArg
         * @return {boolean}
         */
        utilx.isNumeric = (function () {
            var rxPlusMinus = new RegExp('^[+\\-]?');

            return function (inputArg) {
                var val = false,
                    string;

                if (utilx.isNumber(inputArg) || utilx.isString(inputArg)) {
                    string = inputArg.toString().replace(rxPlusMinus, '');
                    if (!isNaN(parseFloat(string)) && isFinite(string)) {
                        val = true;
                    }
                }

                return val;
            };
        }());

        /**
         * The abstract operation throws an error if its argument is a value that cannot be
         * converted to an Object using utilx.argToObject, otherwise returns the argument.
         * @memberOf utilx
         * @function
         * @param {*} inputArg
         * @param {string} [msg]
         * @return {boolean}
         */
        utilx.checkObjectCoercible = function (inputArg) {
            if (utilx.isUndefinedOrNull(inputArg)) {
                throw new TypeError('Cannot convert "' + inputArg + '" to object');
            }

            return inputArg;
        };

        /**
         * The abstract operation converts its argument to a value of type Object
         * @memberOf utilx
         * @function
         * @param {*} inputArg
         * @return {object}
         */
        utilx.argToObject = function (inputArg) {
            var object = utilx.checkObjectCoercible(inputArg);

            if (utilx.isBoolean(object)) {
                object = new CtrBoolean(object);
            } else if (utilx.isNumber(object)) {
                object = new CtrNumber(object);
            } else if (utilx.isString(object)) {
                object = new CtrString(object);
            }

            return object;
        };

        /**
         * The abstract operation converts its argument to a value of type String
         * @memberOf utilx
         * @function
         * @param {*} inputArg
         * @return {string}
         */
        // named utilx.anyToString instead of toString because of SpiderMonkey and Blackberry bug
        utilx.anyToString = function (inputArg) {
            var val;

            if (utilx.isString(inputArg)) {
                val = inputArg;
            } else if (utilx.isUndefined(inputArg)) {
                val = 'undefined';
            } else {
                val = String(inputArg);
            }

            return val;
        };

        /**
         * Returns true if the specified property is in the specified object.
         * @memberOf utilx
         * @function
         * @param {object} object
         * @param {string} property
         * @return {boolean}
         */
        utilx.hasProperty = function (object, property) {
            return property in object;
        };

        /**
         * Returns true if the operand inputArg is an argumenta object.
         * @memberOf utilx
         * @function
         * @param {*} inputArg
         * @return {boolean}
         */
        utilx.isArguments = (function () {
            // Unused variable for JScript NFE bug
            // http://kangax.github.io/nfe/
            var toStringFN = baseObject.toString,
                hasOwnPropertyFN = baseObject.hasOwnProperty,
                propertyIsEnumerableFN = baseObject.propertyIsEnumerable,
                argumentsString = '[object Arguments]',
                functionString = '[object Function]',
                objectString = '[object Object]',
                calleeString = 'callee',
                lengthString = 'length',
                firstCheck,
                nfeIsArguments;

            tempSafariNFE = null;
            if (utilx.strictEqual(toStringFN.call(utilx.returnArgs()), argumentsString)) {
                tempSafariNFE = function nfeIsArguments(inputArg) {
                    return utilx.strictEqual(toStringFN.call(inputArg), argumentsString);
                };
            } else if (utilx.strictEqual(toStringFN.call(hasOwnPropertyFN), functionString)) {
                firstCheck = function (inputArg) {
                    return utilx.isTypeObject(inputArg) &&
                        utilx.strictEqual(toStringFN.call(inputArg), objectString) &&
                        hasOwnPropertyFN.call(inputArg, calleeString) &&
                        hasOwnPropertyFN.call(inputArg, lengthString) &&
                        utilx.isNumber(inputArg.length);
                };

                if (utilx.strictEqual(toStringFN.call(propertyIsEnumerableFN), functionString)) {
                    tempSafariNFE = function nfeIsArguments(inputArg) {
                        return firstCheck(inputArg) &&
                            !propertyIsEnumerableFN.call(inputArg, calleeString) &&
                            !propertyIsEnumerableFN.call(inputArg, lengthString);
                    };
                } else {
                    tempSafariNFE = firstCheck;
                }
            }

            if (utilx.isNull(tempSafariNFE)) {
                tempSafariNFE = function nfeIsArguments(inputArg) {
                    return utilx.isTypeObject(inputArg) &&
                        utilx.strictEqual(toStringFN.call(inputArg), objectString) &&
                        utilx.hasProperty(inputArg, calleeString) &&
                        utilx.hasProperty(inputArg, lengthString) &&
                        utilx.isNumber(inputArg.length);
                };
            }

            nfeIsArguments = null;

            return tempSafariNFE;
        }());

        /**
         * Return the String value that is the result of concatenating the three Strings "[object ", class, and "]".
         * @memberOf utilx
         * @function
         * @param {*} object
         * @return {string}
         */
        utilx.toObjectString = (function () {
            // Unused variable for JScript NFE bug
            // http://kangax.github.io/nfe/
            var toStringFN = baseObject.toString,
                undefinedString = '[object Undefined]',
                nullString = '[object Null]',
                argumentsString = '[object Arguments]',
                nfeToObjectString;

            try {
                tempSafariNFE = null;
                if (utilx.strictEqual(toStringFN.call(), undefinedString) &&
                        utilx.strictEqual(toStringFN.call(null), nullString) &&
                        utilx.strictEqual(toStringFN.call(utilx.returnArgs()), argumentsString)) {

                    tempSafariNFE = function nfeToObjectString(object) {
                        return toStringFN.call(object);
                    };
                }
            } catch (exception) {
                tempSafariNFE = null;
            }

            if (utilx.isNull(tempSafariNFE)) {
                tempSafariNFE = function nfeToObjectString(object) {
                    var val;

                    if (utilx.isUndefined(object)) {
                        val = undefinedString;
                    } else if (utilx.isNull(object)) {
                        val = nullString;
                    } else if (utilx.isArguments(object)) {
                        val = argumentsString;
                    } else {
                        val = toStringFN.call(object);
                    }

                    return val;
                };
            }

            nfeToObjectString = null;

            return tempSafariNFE;
        }());

        /**
         * Returns true if the operand inputArg is an error.
         * @memberOf utilx
         * @function
         * @param {*} inputArg
         * @return {boolean}
         */
        utilx.isError = function (inputArg) {
            return utilx.strictEqual(utilx.toObjectString(inputArg), '[object Error]') ||
                (utilx.isTypeObject(inputArg) && utilx.objectInstanceOf(inputArg, Error));
        };

        /**
         * Returns true if the operand inputArg is a RegExp.
         * @memberOf utilx
         * @function
         * @param {*} inputArg
         * @return {boolean}
         */
        utilx.isRegExp = function (inputArg) {
            return utilx.strictEqual(utilx.toObjectString(inputArg), '[object RegExp]') &&
                utilx.isString(inputArg.source) && utilx.isBoolean(inputArg.global);
        };

        /**
         * Returns true if the operand inputArg is an Object.
         * @memberOf utilx
         * @function
         * @param {*} inputArg
         * @return {boolean}
         */
        utilx.isObject = function (inputArg) {
            return utilx.strictEqual(utilx.toObjectString(inputArg), '[object Object]');
        };

        /**
         * Returns true if the operand inputArg is a Function.
         * @memberOf utilx
         * @function
         * @param {*} inputArg
         * @return {boolean}
         */
        utilx.isFunction = function (inputArg) {
            return utilx.strictEqual(utilx.toObjectString(inputArg), '[object Function]') ||
                (utilx.strictEqual(typeof inputArg, 'function') &&
                 utilx.strictEqual(typeof inputArg.call, 'function') &&
                 utilx.strictEqual(typeof inputArg.apply, 'function'));
        };

        /**
         * Returns true if the operand inputArg is an object or function but not null.
         * @private
         * @function
         * @param {*} inputArg
         * @return {boolean}
         */
        function isTypeObjectOrIsFunction(inputArg) {
            return utilx.isTypeObject(inputArg) || utilx.isFunction(inputArg);
        }

        /**
         * Throws a TypeError if the operand inputArg is not an object or not a function,
         * otherise returns the object.
         * @private
         * @function
         * @param {*} inputArg
         * @return {object}
         */
        function throwIfIsNotTypeObjectOrIsNotFunction(inputArg) {
            if (!isTypeObjectOrIsFunction(inputArg)) {
                throw new TypeError('called on non-object');
            }

            return inputArg;
        }

        /**
         *
         * The function takes one argument inputArg, and returns the Boolean value true if the argument is an object
         * whose class internal property is "Array"; otherwise it returns false.
         * @memberOf utilx
         * @function
         * @param {*} inputArg
         * @return {boolean}
         */
        // named utilx.arrayIsArray instead of isArray because of SpiderMonkey and Blackberry bug
        utilx.arrayIsArray = (function () {
            // Unused variable for JScript NFE bug
            // http://kangax.github.io/nfe/
            var isArrayFN = baseArray.isArray,
                nfeIsArray;

            if (utilx.isFunction(isArrayFN)) {
                tempSafariNFE = isArrayFN;
            } else {
                tempSafariNFE = function nfeIsArray(inputArg) {
                    return utilx.strictEqual(utilx.toObjectString(inputArg), '[object Array]') &&
                        utilx.isNumber(inputArg.length);
                };
            }

            nfeIsArray = null;

            return tempSafariNFE;
        }());

        /**
         * The arrayJoin() method joins all elements of an array into a string.
         * The separator is converted to a string if necessary.
         * If omitted, the array elements are separated with a comma.
         * @memberOf utilx
         * @function
         * @param {array} inputArg
         * @param {string} [separator]
         * @return {*}
         */
        utilx.arrayJoin = function (inputArg, separator) {
            utilx.checkObjectCoercible(inputArg);
            if (utilx.isUndefined(separator)) {
                separator = ',';
            }

            return baseArray.join.call(inputArg, separator);
        };

        /**
         * Returns true if the operand inputArg is a Date object.
         * @memberOf utilx
         * @function
         * @param {*} inputArg
         * @return {boolean}
         */
        utilx.isDate = function (inputArg) {
            return utilx.strictEqual(utilx.toObjectString(inputArg), '[object Date]');
        };

        /**
         * Determines whether two values are the same value.
         * @memberOf utilx
         * @function
         * @param {*} x
         * @param {*} y
         * @return {boolean}
         */
        // named utilx.objectIs instead of utilx.objectIs because of SpiderMonkey and Blackberry bug
        utilx.objectIs = (function () {
            // Unused variable for JScript NFE bug
            // http://kangax.github.io/nfe/
            var isIsFn = CtrObject.is,
                nfeIs;

            if (utilx.isFunction(isIsFn)) {
                tempSafariNFE = isIsFn;
            } else {
                tempSafariNFE = function nfeIs(x, y) {
                    var val;

                    if (utilx.strictEqual(x, y)) {
                        if (utilx.isZero(x)) {
                            val = utilx.strictEqual(1 / x, 1 / y);
                        } else {
                            val = true;
                        }
                    } else {
                        val = utilx.notStrictEqual(x, x) && utilx.notStrictEqual(y, y);
                    }

                    return val;
                };
            }

            nfeIs = null;

            return tempSafariNFE;
        }());

        /**
         * The function determines whether the passed value is NaN. More robust version of the original global isNaN.
         * @memberOf utilx
         * @function
         * @param {*} number
         * @return {boolean}
         */
        // named utilx.numberIsNaN instead of isNaN because of SpiderMonkey and Blackberry bug
        utilx.numberIsNaN = (function () {
            // Unused variable for JScript NFE bug
            // http://kangax.github.io/nfe/
            var isNaNFN = CtrNumber.isNaN,
                nfeIsNaN;

            if (utilx.isFunction(isNaNFN)) {
                tempSafariNFE = isNaNFN;
            } else {
                tempSafariNFE = function nfeIsNaN(number) {
                    return utilx.objectIs(number, NaN);
                };
            }

            nfeIsNaN = null;

            return tempSafariNFE;
        }());

        /**
         * The function determines whether the passed value is finite.
         * More robust version of the original global isFinite.
         * @memberOf utilx
         * @function
         * @param {*} number
         * @return {boolean}
         */
        // named utilx.numberIsFinite instead of isFinite because of SpiderMonkey and Blackberry bug
        utilx.numberIsFinite = (function () {
            // Unused variable for JScript NFE bug
            // http://kangax.github.io/nfe/
            var isFiniteFN = CtrNumber.isFinite,
                nfeIsFinite;

            if (utilx.isFunction(isFiniteFN)) {
                tempSafariNFE = isFiniteFN;
            } else {
                tempSafariNFE = function nfeIsFinite(number) {
                    return utilx.isNumber(number) && isFinite(number);
                };
            }

            nfeIsFinite = null;

            return tempSafariNFE;
        }());

        /**
         * The function returns the sign of a number, indicating whether the number is positive, negative or zero.
         * This function has 5 kinds of return values, 1, -1, 0, -0, NaN, which represent "positive number",
         * "negative number", "positive zero",  "negative zero" and NaN respectively
         * @memberOf utilx
         * @function
         * @param {*} value
         * @return {number}
         */
        // named mathSign instead of sign because of SpiderMonkey and Blackberry bug
        utilx.mathSign = (function () {
            // Unused variable for JScript NFE bug
            // http://kangax.github.io/nfe/
            var signFN = Math.sign,
                nfeSign;

            if (utilx.isFunction(signFN)) {
                tempSafariNFE = signFN;
            } else {
                tempSafariNFE = function nfeSign(value) {
                    var number = utilx.toNumber(value),
                        val;

                    if (utilx.isZero(number) || utilx.numberIsNaN(number)) {
                        val = number;
                    } else if (utilx.lt(number, 0)) {
                        val = -1;
                    } else {
                        val = 1;
                    }

                    return val;
                };
            }

            nfeSign = null;

            return tempSafariNFE;
        }());

        /**
         * Returns true if the argument is zero or not finite.
         * @private
         * @function
         * @param {*} inputArg
         * @return {boolean}
         */
        function isZeroOrNotFinite(inputArg) {
            return utilx.isZero(inputArg) || !utilx.numberIsFinite(inputArg);
        }

        /**
         * The function evaluates the passed value and converts it to an integer.
         * @memberOf utilx
         * @function
         * @param {*} inputArg
         * @return {number}
         */
        // named utilx.numberToInteger instead of toInteger because of SpiderMonkey and Blackberry bug
        utilx.numberToInteger = (function () {
            // Unused variable for JScript NFE bug
            // http://kangax.github.io/nfe/
            var toIntegerFN = CtrNumber.toInteger,
                nfeToInteger;

            if (utilx.isFunction(toIntegerFN)) {
                tempSafariNFE = toIntegerFN;
            } else {
                tempSafariNFE = function nfeToInteger(inputArg) {
                    var number = utilx.toNumber(inputArg),
                        val;

                    if (utilx.numberIsNaN(number)) {
                        val = +0;
                    } else if (isZeroOrNotFinite(number)) {
                        val = number;
                    } else {
                        val = utilx.mathSign(number) * Math.floor(Math.abs(number));
                    }

                    return val;
                };
            }

            nfeToInteger = null;

            return tempSafariNFE;
        }());

        /**
         * The utilx.numberIsInteger() method determines whether the passed value is an integer.
         * If the target value is an integer, return true, otherwise return false.
         * If the value is NaN or infinite, return false.
         * @memberOf utilx
         * @function
         * @param {*} inputArg
         * @return {boolean}
         */
        // named utilx.numberToInteger instead of toInteger because of SpiderMonkey and Blackberry bug
        utilx.numberIsInteger = (function () {
            // Unused variable for JScript NFE bug
            // http://kangax.github.io/nfe/
            var isIntegerFN = CtrNumber.isInteger,
                nfeIsInteger;

            try {
                if (isIntegerFN(UNSAFE_INTEGER) || isIntegerFN(-UNSAFE_INTEGER)) {
                    throw new Error('Failed unsafe integer check');
                }

                tempSafariNFE = isIntegerFN;
            } catch (e) {
                tempSafariNFE = function nfeIsInteger(inputArg) {
                    return !utilx.numberIsNaN(inputArg) && utilx.numberIsFinite(inputArg) &&
                        utilx.inRange(inputArg, MIN_INTEGER, MAX_INTEGER) &&
                        utilx.strictEqual(utilx.numberToInteger(inputArg), inputArg);
                };
            }

            nfeIsInteger = null;

            return tempSafariNFE;
        }());

        /**
         * The abstract operation converts its argument to one of 2^32 integer values in
         * the range -2^31 through 2^31-1, inclusive.
         * @memberOf utilx
         * @function
         * @param {*} inputArg
         * @return {number}
         */
        utilx.toInt32 = function (inputArg) {
            var number = utilx.toNumber(inputArg),
                val;

            if (isZeroOrNotFinite(number)) {
                val = +0;
            } else {
                val = utilx.mod(utilx.mathSign(number) * Math.floor(Math.abs(number)), UWORD32);
                if (utilx.gt(val, MAX_INT32)) {
                    val -= UWORD32;
                } else if (utilx.lt(val, MIN_INT32)) {
                    val += UWORD32;
                }
            }

            return val;
        };

        /**
         * The utilx.isInt32() method determines whether the passed value is an integer.
         * If the target value is an integer in the range -2^31 through 2^31-1, inclusive,
         * return true, otherwise return false.
         * If the value is NaN or infinite, return false.
         * @memberOf utilx
         * @function
         * @param {*} inputArg
         * @return {boolean}
         */
        utilx.isInt32 = function (inputArg) {
            return utilx.numberIsInteger(inputArg) &&
                utilx.inRange(inputArg, MIN_INT32, MAX_INT32);
        };

        /**
         * The modulo function is a modified implementation of the `%` operator. This algorithm uses the
         * formula `remainder = dividend - divisor * quotient`; the `%` operator uses a truncating division.
         * Rounding division
         * @see {@link http://www.ecma-international.org/ecma-262/5.1/#sec-11.5.3 Applying the % Operator}
         * @memberOf utilx
         * @function
         * @param {number} dividend
         * @param {number} divisor
         * @return {number}
         */
        utilx.modulo = function (dividend, divisor) {
            return dividend - divisor * Math.floor(dividend / divisor);
        };

        /**
         * The abstract operation converts its argument to one of 2^32 integer values in
         * the range 0 through 2^32-1,inclusive.
         * @memberOf utilx
         * @function
         * @param {*} inputArg
         * @return {number}
         */
        utilx.toUint32 = function (inputArg) {
            var number = utilx.toNumber(inputArg),
                val;

            if (isZeroOrNotFinite(number)) {
                val = +0;
            } else {
                val = utilx.modulo(utilx.numberToInteger(number), UWORD32);
            }

            return val;
        };

        /**
         * The utilx.isUint32() method determines whether the passed value is an integer.
         * If the target value is an integer in the  range 0 through 2^32-1, inclusive,
         * return true, otherwise return false.
         * If the value is NaN or infinite, return false.
         * @memberOf utilx
         * @function
         * @param {*} inputArg
         * @return {boolean}
         */
        utilx.isUint32 = function (inputArg) {
            return utilx.numberIsInteger(inputArg) &&
                utilx.inRange(inputArg, 0, MAX_UINT32);
        };

        /**
         * The abstract operation converts its argument to one of 2^16 integer values in
         * the range -2^15 through 2^15-1, inclusive.
         * @memberOf utilx
         * @function
         * @param {*} inputArg
         * @return {number}
         */
        utilx.toInt16 = function (inputArg) {
            var number = utilx.toNumber(inputArg),
                val;

            if (isZeroOrNotFinite(number)) {
                val = +0;
            } else {
                val = utilx.mod(utilx.mathSign(number) * Math.floor(Math.abs(number)), UWORD16);
                if (utilx.gt(val, MAX_INT16)) {
                    val -= UWORD16;
                } else if (utilx.lt(val, MIN_INT16)) {
                    val += UWORD16;
                }
            }

            return val;
        };

        /**
         * The utilx.isInt16() method determines whether the passed value is an integer.
         * If the target value is an integer in the range -2^15 through 2^15-1, inclusive,
         * return true, otherwise return false.
         * If the value is NaN or infinite, return false.
         * @memberOf utilx
         * @function
         * @param {*} inputArg
         * @return {boolean}
         */
        utilx.isInt16 = function (inputArg) {
            return utilx.numberIsInteger(inputArg) &&
                utilx.inRange(inputArg, MIN_INT16, MAX_INT16);
        };

        /**
         * The abstract operation converts its argument to one of 2^16 integer values in
         * the range 0 through 2^16-1,inclusive.
         * @memberOf utilx
         * @function
         * @param {*} inputArg
         * @return {number}
         */
        utilx.toUint16 = function (inputArg) {
            var number = utilx.toNumber(inputArg),
                val;

            if (isZeroOrNotFinite(number)) {
                val = +0;
            } else {
                val = utilx.modulo(utilx.numberToInteger(number), UWORD16);
            }

            return val;
        };

        /**
         * The utilx.isUint16() method determines whether the passed value is an integer.
         * If the target value is an integer in the  range 0 through 2^16-1, inclusive,
         * return true, otherwise return false.
         * If the value is NaN or infinite, return false.
         * @memberOf utilx
         * @function
         * @param {*} inputArg
         * @return {boolean}
         */
        utilx.isUint16 = function (inputArg) {
            return utilx.numberIsInteger(inputArg) &&
                utilx.inRange(inputArg, 0, MAX_UINT16);
        };

        /**
         * The abstract operation converts its argument to one of 2^8 integer values in
         * the range -2^7 through 2^7-1, inclusive.
         * @memberOf utilx
         * @function
         * @param {*} inputArg
         * @return {number}
         */
        utilx.toInt8 = function (inputArg) {
            var number = utilx.toNumber(inputArg),
                val;

            if (isZeroOrNotFinite(number)) {
                val = +0;
            } else {
                val  = utilx.mod(utilx.mathSign(number) * Math.floor(Math.abs(number)), UWORD8);
                if (utilx.gt(val, MAX_INT8)) {
                    val -= UWORD8;
                } else if (utilx.lt(val, MIN_INT8)) {
                    val += UWORD8;
                }
            }

            return val;
        };

        /**
         * The utilx.isInt8() method determines whether the passed value is an integer.
         * If the target value is an integer in the range -2^7 through 2^7-1, inclusive,
         * return true, otherwise return false.
         * If the value is NaN or infinite, return false.
         * @memberOf utilx
         * @function
         * @param {*} inputArg
         * @return {boolean}
         */
        utilx.isInt8 = function (inputArg) {
            return utilx.numberIsInteger(inputArg) &&
                utilx.inRange(inputArg, MIN_INT8, MAX_INT8);
        };

        /**
         * The abstract operation converts its argument to one of 2^8 integer values in
         * the range 0 through 2^8-1,inclusive.
         * @memberOf utilx
         * @function
         * @param {*} inputArg
         * @return {number}
         */
        utilx.toUint8 = function (inputArg) {
            var number = utilx.toNumber(inputArg),
                val;

            if (isZeroOrNotFinite(number)) {
                val = +0;
            } else {
                val = utilx.modulo(utilx.numberToInteger(number), UWORD8);
            }

            return val;
        };

        /**
         * The utilx.isUint8() method determines whether the passed value is an integer.
         * If the target value is an integer in the  range 0 through 2^8-1, inclusive,
         * return true, otherwise return false.
         * If the value is NaN or infinite, return false.
         * @memberOf utilx
         * @function
         * @param {*} inputArg
         * @return {boolean}
         */
        utilx.isUint8 = function (inputArg) {
            return utilx.numberIsInteger(inputArg) &&
                utilx.inRange(inputArg, 0, MAX_UINT8);
        };

        /**
         * The arrayPush() method adds one or more elements to the end of an array and
         * returns the new length of the array.
         * @memberOf utilx
         * @function
         * @param {array} array
         * @param {...*} var_args
         * @return {number}
         */
        // named utilx.arrayPush instead of push because of SpiderMonkey and Blackberry bug
        utilx.arrayPush = function (array) {
            utilx.arrayForEach(utilx.arraySlice(arguments, 1), function (argument) {
                baseArray.push.call(array, argument);
            });

            return array.length;
        };

        /**
         * The arrayUnshift() method adds one or more elements to the beginning of an array and
         * returns the new length of the array.
         * @memberOf utilx
         * @function
         * @param {array} array
         * @param {...*} var_args
         * @return {number}
         */
        // named utilx.arrayUnshift instead of unshift because of SpiderMonkey and Blackberry bug
        utilx.arrayUnshift = function (array) {
            utilx.arrayForEach(utilx.arraySlice(arguments, 1), function (argument) {
                baseArray.unshift.call(array, argument);
            });

            return array.length;
        };

        /**
         * @memberOf utilx
         * @function
         * @param {regexp} separator
         * @param {array} match
         * @param {arguments} args
         */
        function stringSplitReplacer(separator, match, args) {
            var length = args.length - 2,
                index;

            utilx.arrayFirst(match).replace(separator, function () {
                for (index = 1; utilx.lt(index, length); index += 1) {
                    if (utilx.isUndefined(arguments[index])) {
                        utilx.arrayAssign(match, index, utilx.privateUndefined);
                    }
                }
            });
        }

        /**
         * Returns a string only if the arguments is coercible otherwise throws an error.
         * @private
         * @function
         * @param {*} inputArg
         * @return {string}
         */
        function onlyCoercibleToString(inputArg) {
            return utilx.anyToString(utilx.checkObjectCoercible(inputArg));
        }

        /**
         * Returns an integer clamped to the range set by min and max.
         * @private
         * @function
         * @param {*} inputArg
         * @return {string}
         */
        function clampInteger(number, min, max) {
            return utilx.clamp(utilx.numberToInteger(number), utilx.numberToInteger(min), utilx.numberToInteger(max));
        }

        /**
         * Splits a String object into an array of strings by separating the string into substrings.
         * @memberOf utilx
         * @function
         * @param {string} str
         * @param {string} [separator]
         * @param {number} [limit]
         * @return {array.<string>}
         */
        // named utilx.stringSplit instead of split because of SpiderMonkey and Blackberry bug
        utilx.stringSplit = (function () {
            var splitFN = baseString.split,
                compliantExecNpcg = utilx.isUndefined(new RegExp('()??').exec('')[1]);

            return function (str, separator, limit) {
                var string = onlyCoercibleToString(str),
                    output,
                    flags,
                    lastLastIndex,
                    separator2,
                    match,
                    lastIndex,
                    lastLength,
                    val;

                if (utilx.isRegExp(separator)) {
                    flags = 'g';
                    if (separator.ignoreCase) {
                        flags += 'i';
                    }

                    if (separator.multiline) {
                        flags += 'm';
                    }

                    if (separator.extended) {
                        flags += 'x';
                    }

                    if (separator.sticky) {
                        flags += 'y';
                    }

                    separator = new RegExp(separator.source, flags);
                    if (utilx.isFalse(compliantExecNpcg)) {
                        separator2 = new RegExp('^' + separator.source + '$(?!\\s)', flags);
                    }

                    if (utilx.isUndefined(limit)) {
                        limit = MAX_UINT32;
                    } else {
                        limit = clampInteger(limit, 0, MAX_UINT32);
                    }

                    output = [];
                    flags = 'g';
                    lastLastIndex = 0;
                    match = separator.exec(string);
                    while (match) {
                        lastIndex = match.index + utilx.arrayFirst(match).length;
                        if (utilx.gt(lastIndex, lastLastIndex)) {
                            utilx.arrayPush(output, string.slice(lastLastIndex, match.index));
                            if (utilx.isFalse(compliantExecNpcg) && utilx.gt(match.length, 1)) {
                                stringSplitReplacer(separator2, match, arguments);
                            }

                            if (utilx.gt(match.length, 1) && utilx.lt(match.index, string.length)) {
                                output = output.concat(match.slice(1));
                            }

                            lastLength = utilx.arrayFirst(match).length;
                            lastLastIndex = lastIndex;
                            if (utilx.gte(output.length, limit)) {
                                break;
                            }
                        }

                        if (utilx.strictEqual(separator.lastIndex, match.index)) {
                            separator.lastIndex += 1;
                        }

                        match = separator.exec(string);
                    }

                    if (utilx.strictEqual(lastLastIndex, string.length)) {
                        if (lastLength || !separator.test('')) {
                            utilx.arrayPush(output, '');
                        }
                    } else {
                        utilx.arrayPush(output, string.slice(lastLastIndex));
                    }

                    if (utilx.gt(output.length, limit)) {
                        return output.slice(0, limit);
                    }

                    val = output;
                } else {
                    val = splitFN.call(str, separator, limit);
                }

                return val;
            };
        }());

        /**
         * Coerces its argument to a string and returns the first character of that string.
         * If the argument is an empty string, returns an empty string.
         * Throws an error if the argument can not be coerced, i.e. null or undefined.
         * @memberOf utilx
         * @function
         * @param {string} inputArg
         * @return {string}
         */
        utilx.firstChar = function (inputArg) {
            return onlyCoercibleToString(inputArg).charAt(0);
        };

        /**
         * Coerces inputArg to a string and compares the first character to the argument character.
         * Throws an error if the arguments can not be coerced, i.e. null or undefined.
         * @memberOf utilx
         * @function
         * @param {string} inputArg
         * @param {string} character
         * @return {boolean}
         */
        utilx.firstCharIs = function (inputArg, character) {
            return utilx.strictEqual(utilx.firstChar(inputArg), utilx.firstChar(character));
        };

        /**
         * Coerces its argument to a string and returns the last character of that string.
         * If the argument is an empty string, returns an empty string.
         * Throws an error if the argument can not be coerced, i.e. null or undefined.
         * @memberOf utilx
         * @function
         * @param {string} inputArg
         * @return {string}
         */
        utilx.lastChar = function (inputArg) {
            var thisStr = onlyCoercibleToString(inputArg);

            return thisStr.charAt(thisStr.length - 1);
        };

        /**
         * Coerces inputArg to a string and compares the last character to the argument character.
         * Throws an error if the arguments can not be coerced, i.e. null or undefined.
         * @memberOf utilx
         * @function
         * @param {string} inputArg
         * @param {string} character
         * @return {boolean}
         */
        utilx.lastCharIs = function (inputArg, character) {
            return utilx.strictEqual(utilx.lastChar(inputArg), utilx.firstChar(character));
        };

        /**
         * Coerces inputArg to a string and counts the occurences of the argument character.
         * Throws an error if the arguments can not be coerced, i.e. null or undefined.
         * @memberOf utilx
         * @function
         * @param {string} inputArg
         * @param {string} character
         * @return {number}
         */
        utilx.countCharacter = function (inputArg, character) {
            var firstChar = utilx.firstChar(character),
                val;

            if (utilx.isEmptyString(firstChar)) {
                val = Infinity;
            } else {
                val = clampInteger(utilx.stringSplit(inputArg,
                                                 utilx.firstChar(character)).length - 1, 0, Infinity);
            }

            return val;
        };

        /**
         * Returns true if arguments is less than zero or is equal to positive infinity
         * @private
         * @function
         * @param {*} inputArg
         * @return {boolean}
         */
        function isLtZeroOrPositiveInfinity(inputArg) {
            return utilx.lt(inputArg, 0) || utilx.strictEqual(inputArg, Infinity);
        }

        /**
         * Coerces inputArg to a string and repeatedly adds the argument character to the beginning until
         * the string is greater than or equal to the specified length.
         * Throws an error if the arguments can not be coerced, i.e. null or undefined.
         * @memberOf utilx
         * @function
         * @param {string} inputArg
         * @param {string} character
         * @param {number} size
         * @return {string}
         */
        utilx.padLeadingChar = function (inputArg, character, size) {
            var string = onlyCoercibleToString(inputArg),
                singleChar = utilx.firstChar(character),
                count = utilx.numberToInteger(size) - string.length;

            if (isLtZeroOrPositiveInfinity(count)) {
                count = 0;
            }

            return utilx.stringRepeat(singleChar, count) + string;
        };

        /**
         * Repeat the current string several times, return the new string.
         * @memberOf utilx
         * @function
         * @param {string} string
         * @param {number} times
         * @return {string}
         */
        // named utilx.stringRepeat instead of repeat because of SpiderMonkey and Blackberry bug
        utilx.stringRepeat = (function () {
            // Unused variable for JScript NFE bug
            // http://kangax.github.io/nfe
            var repeatFN = CtrString.repeat,
                nfeRepeat;

            function rep(s, times) {
                var half,
                    val;

                if (utilx.lt(times, 1)) {
                    val = '';
                } else if (utilx.mod(times, 2)) {
                    val = rep(s, times - 1) + s;
                } else {
                    half = rep(s, times / 2);
                    val = half + half;
                }

                return val;
            }

            if (utilx.isFunction(repeatFN)) {
                tempSafariNFE = function nfeRepeat(string, times) {
                    return repeatFN.call(string, times);
                };
            } else {
                tempSafariNFE = function nfeRepeat(string, count) {
                    var thisString = onlyCoercibleToString(string),
                        times = utilx.numberToInteger(count);

                    if (isLtZeroOrPositiveInfinity(times)) {
                        throw new RangeError();
                    }

                    return rep(thisString, times);
                };
            }

            nfeRepeat = null;

            return tempSafariNFE;
        }());

        /**
         * Determines whether a string begins with the characters of another string,
         * returning true or false as appropriate.
         * @memberOf utilx
         * @function
         * @param {string} string
         * @param {string} searchString
         * @param {number} [position]
         * @return {boolean}
         */
        // named stringStartsWith instead of startsWith because of SpiderMonkey and Blackberry bug
        utilx.stringStartsWith = (function () {
            // Unused variable for JScript NFE bug
            // http://kangax.github.io/nfe
            var startsWithFN = baseString.startsWith,
                nfeStartsWith;

            if (utilx.isFunction(startsWithFN)) {
                tempSafariNFE = function nfeStartsWith(string, searchString, position) {
                    return startsWithFN.call(string, searchString, position);
                };
            } else {
                tempSafariNFE = function nfeStartsWith(string, searchString, position) {
                    var thisStr = onlyCoercibleToString(string),
                        searchStr = utilx.anyToString(searchString),
                        start = clampInteger(position, 0, thisStr.length);

                    return utilx.strictEqual(thisStr.slice(start, start + searchStr.length), searchStr);
                };
            }

            nfeStartsWith = null;

            return tempSafariNFE;
        }());

        /**
         * Determines whether a string ends with the characters of another string,
         * returning true or false as appropriate.
         * @memberOf utilx
         * @function
         * @param {string} string
         * @param {string} searchString
         * @param {number} [position]
         * @return {boolean}
         */
        // named stringEndsWith instead of endsWith because of SpiderMonkey and Blackberry bug
        utilx.stringEndsWith = (function () {
            // Unused variable for JScript NFE bug
            // http://kangax.github.io/nfe
            var endsWithFN = baseString.endsWith,
                nfeEndsWith;

            if (utilx.isFunction(endsWithFN)) {
                tempSafariNFE = function nfeEndsWith(string, searchString, position) {
                    return endsWithFN.call(string, searchString, position);
                };
            } else {
                tempSafariNFE = function nfeEndsWith(string, searchString, position) {
                    var thisStr = onlyCoercibleToString(string),
                        searchStr = utilx.anyToString(searchString),
                        thisLen = thisStr.length,
                        end,
                        start;

                    if (utilx.isUndefined(position)) {
                        position = thisLen;
                    } else {
                        position = utilx.numberToInteger(position);
                    }

                    end = utilx.clamp(position, 0, thisLen);
                    start = end - searchStr.length;

                    return utilx.gte(start, 0) && utilx.strictEqual(thisStr.slice(start, end), searchStr);
                };
            }

            nfeEndsWith = null;

            return tempSafariNFE;
        }());

        /**
         * Determines whether a string contains the characters of another string, returning true or
         * false as appropriate.
         * @memberOf utilx
         * @function
         * @param {string} string
         * @param {string} searchString
         * @param {number} [position]
         * @return {boolean}
         */
        // named utilx.stringContains instead of contains because of SpiderMonkey and Blackberry bug
        utilx.stringContains = (function () {
            // Unused variable for JScript NFE bug
            // http://kangax.github.io/nfe
            var containsFN = baseString.contains,
                nfeContains;

            if (utilx.isFunction(containsFN)) {
                tempSafariNFE = function nfeContains(string, searchString, position) {
                    return containsFN.call(string, searchString, position);
                };
            } else {
                tempSafariNFE = function nfeContains(string, searchString, position) {
                    var thisStr = onlyCoercibleToString(string),
                        searchStr = utilx.anyToString(searchString),
                        thisLen = thisStr.length;

                    if (utilx.isUndefined(position)) {
                        position = 0;
                    } else {
                        position = utilx.numberToInteger(position);
                    }

                    return utilx.notStrictEqual(baseString.indexOf.call(thisStr, searchStr,
                                                                        utilx.clamp(position, 0, thisLen)), -1);
                };
            }

            nfeContains = null;

            return tempSafariNFE;
        }());

        /**
         * Return the value of the [[Prototype]] internal property of object.
         * @memberOf utilx
         * @function
         * @param {object} object
         * @return {Prototype}
         */
        // named utilx.objectGetPrototypeOf instead of getPrototypeOf because of SpiderMonkey and Blackberry bug
        utilx.objectGetPrototypeOf = (function () {
            // Unused variable for JScript NFE bug
            // http://kangax.github.io/nfe
            var getPrototypeOfFN = CtrObject.getPrototypeOf,
                baseObjectPrototype,
                fixOpera10,
                nfeGetPrototypeOf;

            if (utilx.isFunction(getPrototypeOfFN)) {
                tempSafariNFE = function nfeGetPrototypeOf(object) {
                    throwIfIsNotTypeObjectOrIsNotFunction(object);

                    return getPrototypeOfFN(object);
                };
            } else if (utilx.isNull(CtrObject.prototype[protoName])) {
                tempSafariNFE = function nfeGetPrototypeOf(object) {
                    throwIfIsNotTypeObjectOrIsNotFunction(object);

                    return object[protoName];
                };
            } else {
                baseObjectPrototype = CtrObject.prototype;
                if (utilx.notStrictEqual(utilx.returnArgs().constructor.prototype, baseObjectPrototype)) {
                    fixOpera10 = true;
                }

                tempSafariNFE = function nfeGetPrototypeOf(object) {
                    throwIfIsNotTypeObjectOrIsNotFunction(object);
                    if (utilx.strictEqual(object, baseObjectPrototype)) {
                        return null;
                    }

                    var ctrProto;

                    if (utilx.isFunction(object.constructor)) {
                        if (fixOpera10 && utilx.isArguments(object)) {
                            ctrProto = baseObjectPrototype;
                        } else {
                            ctrProto = object.constructor.prototype;
                        }
                    } else if (utilx.isObject(object[protoName])) {
                        ctrProto = object[protoName];
                    } else {
                        ctrProto = baseObjectPrototype;
                    }

                    if (utilx.strictEqual(object, ctrProto)) {
                        return baseObjectPrototype;
                    }

                    return ctrProto;
                };
            }

            nfeGetPrototypeOf = null;

            return tempSafariNFE;
        }());

        /**
         * Returns true if the specified searchElement is in the specified array.
         * Using strict equality (the same method used by the === comparison operator).
         * @memberOf utilx
         * @function
         * @param {array} array
         * @param {*} searchElement
         * @return {boolean}
         */
        utilx.arrayContains = function (array, searchElement) {
            return utilx.notStrictEqual(utilx.arrayIndexOf(array, searchElement), -1);
        };

        /**
         * Returns a boolean indicating whether the object has the specified property.
         * This function can be used to determine whether an object has the specified property as a direct property of
         * that object; unlike the utilx.hasProperty function, this method does not check down the object's prototype
         * chain.
         * @memberOf utilx
         * @function
         * @param {object} object
         * @param {string} property
         * @return {boolean}
         */
        // http://ecma-international.org/ecma-262/5.1/#sec-15.2.4.5
        // Create our own local "hasOwnProperty" function: native -> shim -> sham
        // named utilx.objectHasOwnProperty instead of hasOwnProperty because of SpiderMonkey and Blackberry bug
        utilx.objectHasOwnProperty = (function () {
            // Unused variable for JScript NFE bug
            // http://kangax.github.io/nfe
            var hasOwnPropertyFN = baseObject.hasOwnProperty, // to combat old IE8- issues, min support IE6
                propertyIsEnumerableFN = baseObject.propertyIsEnumerable,
                hasDontEnumBug = true,
                testObject = {
                    toString: null
                },
                nfeHasOwnProperty;

            // use nfeHasOwnProperty to save a var
            for (nfeHasOwnProperty in testObject) {
                if (utilx.strictEqual(nfeHasOwnProperty, 'toString') && utilx.isNull(testObject[nfeHasOwnProperty])) {
                    hasDontEnumBug = false;
                }
            }

            function checkDontEnums(object, property) {
                return hasDontEnumBug && utilx.arrayContains(defaultProperties, property) &&
                    utilx.hasProperty(object, property) &&
                    utilx.notStrictEqual(object[property], utilx.objectGetPrototypeOf(object)[property]);
            }

            if (utilx.isFunction(hasOwnPropertyFN)) {
                tempSafariNFE = function nfeHasOwnProperty(object, property) {
                    return hasOwnPropertyFN.call(object, property) || checkDontEnums(object, property);
                };
            } else if (utilx.isFunction(propertyIsEnumerableFN)) {
                tempSafariNFE = function nfeHasOwnProperty(object, property) {
                    return propertyIsEnumerableFN.call(object, property) || checkDontEnums(object, property);
                };
            } else {
                tempSafariNFE = function nfeHasOwnProperty(object, property) {
                    return utilx.hasProperty(object, property) &&
                        utilx.isUndefined(utilx.objectGetPrototypeOf(object)[property]);
                };
            }

            nfeHasOwnProperty = null;

            return tempSafariNFE;
        }());

        /**
         * Returns true if argument is null, not an object or is a function.
         * @private
         * @function
         * @param {*} inputArg
         * @return {boolean}
         */
        function isNotTypeObjectOrIsFunction(inputArg) {
            return !utilx.isTypeObject(inputArg) || utilx.isFunction(inputArg);
        }

        /**
         * Returns true if argument is an object that has own property of length which is a number of uint32
         * but is not a function.
         * @private
         * @function
         * @param {*} inputArg
         * @return {boolean}
         */
        function hasValidLength(inputArg) {
            return utilx.isTypeObject(inputArg) && utilx.objectHasOwnProperty(inputArg, 'length') &&
                utilx.isNumber(inputArg.length) && utilx.isUint32(inputArg.length);
        }

        /**
         * Throws TypeError if argument is null, not an object or is a function otherwise return the object.
         * @private
         * @function
         * @param {*} inputArg
         * @return {object}
         */
        function throwIfIsNotTypeObjectOrIsFunction(inputArg) {
            if (isNotTypeObjectOrIsFunction(inputArg)) {
                throw new TypeError('called on a invalid object');
            }

            return inputArg;
        }

        /**
         * Throws TypeError if argument has not got a valid length otherwise return the object.
         * @private
         * @function
         * @param {*} inputArg
         * @return {object}
         */
        function throwIfIsNotHasValidLength(inputArg) {
            if (!hasValidLength(inputArg)) {
                throw new TypeError('invalid length property');
            }

            return inputArg;
        }

        /**
         * Returns true if arguments is an array or an arguments object.
         * @private
         * @function
         * @param {*} inputArg
         * @return {boolean}
         */
        function isArrayOrArguments(inputArg) {
            return utilx.arrayIsArray(inputArg) || utilx.isArguments(inputArg);
        }

        /**
         * The function takes one argument inputArg, if the argument is an object whose class internal
         * property is "Array" or is an Object whose class internal property is "Arguments";
         * returns true if length is zero otherwise it returns false.
         * Otherwise returns null if the argument does not match the rquirements.
         * @memberOf utilx
         * @function
         * @param {array} inputArg
         * @return {(boolean|null)}
         */
        utilx.isEmptyArray = function (inputArg) {
            if (!isArrayOrArguments(inputArg)) {
                throwIfIsNotTypeObjectOrIsFunction(inputArg);
                throwIfIsNotHasValidLength(inputArg);
            }

            return utilx.isZero(inputArg.length);
        };


        /**
         * Returns the first element of an array; otherwise returns undefined.
         * @memberOf utilx
         * @function
         * @param {array|arguments} inputArg
         * @return {*}
         */
        utilx.arrayFirst = function (inputArg) {
            if (!isArrayOrArguments(inputArg)) {
                throwIfIsNotTypeObjectOrIsFunction(inputArg);
                throwIfIsNotHasValidLength(inputArg);
            }

            return inputArg[0];
        };

        /**
         * Returns the last element of an array; otherwise returns undefined.
         * @memberOf utilx
         * @function
         * @param {array|arguments} inputArg
         * @return {*}
         */
        utilx.arrayLast = function (inputArg) {
            if (!isArrayOrArguments(inputArg)) {
                throwIfIsNotTypeObjectOrIsFunction(inputArg);
                throwIfIsNotHasValidLength(inputArg);
            }

            return inputArg[inputArg.length - 1];
        };

        /**
         * The arrayAssign() method assigns a value to a specific element of an array and
         * returns the new length of the array.
         * @memberOf utilx
         * @function
         * @param {array} array
         * @param {number|string} index
         * @param {*} value
         * @return {number}
         */
        utilx.arrayAssign = function (array, index, value) {
            if (!isArrayOrArguments(array)) {
                throwIfIsNotTypeObjectOrIsFunction(array);
                throwIfIsNotHasValidLength(array);
            }

            var numIndex;

            if (utilx.gte(arguments.length, 3)) {
                numIndex = utilx.numberToInteger(index);
                if (utilx.inRange(numIndex, 0, MAX_UINT32 - 1)) {
                    array[numIndex] = value;
                    numIndex += 1;
                    if (utilx.gt(numIndex, array.length)) {
                        array.length = numIndex;
                    }
                } else {
                    array[utilx.anyToString(index)] = value;
                }
            }

            return array.length;
        };

        /**
         * The abstract operation converts its argument to a value of type Object but fixes some environment bugs.
         * @memberOf utilx
         * @function
         * @param {*} inputArg
         * @return {object}
         */
        utilx.toObjectFixIndexedAccess = (function () {
            // Unused variable for JScript NFE bug
            // http://kangax.github.io/nfe
            var boxedString = noNewCtrObject('a'),
                splitString = utilx.notStrictEqual(boxedString[0], 'a') || !utilx.hasProperty(boxedString, 0),
                nfeToObjectFixIndexedAccess;

            tempSafariNFE = function nfeToObjectFixIndexedAccess(inputArg) {
                var object;

                if (splitString && utilx.isString(inputArg)) {
                    object = utilx.stringSplit(inputArg, '');
                } else {
                    object = utilx.argToObject(inputArg);
                }

                return object;
            };

            nfeToObjectFixIndexedAccess = null;

            return tempSafariNFE;
        }());

        /**
         * Throws a TypeError if arguments is not a function otherwise returns the function.
         * @memberOf utilx
         * @function
         * @param {*} inputArg
         * @return {function}
         */
        function throwIfNotAFunction(inputArg) {
            if (!utilx.isFunction(inputArg)) {
                throw new TypeError(inputArg + ' is not a function');
            }

            return inputArg;
        }

        /**
         * Executes a provided function once per array element.
         * @memberOf utilx
         * @function
         * @param {array} array
         * @param {function} fn
         * @param {object} [thisArg]
         */
        // named utilx.arrayForEach instead of forEach because of SpiderMonkey and Blackberry bug
        utilx.arrayForEach = (function () {
            // Unused variable for JScript NFE bug
            // http://kangax.github.io/nfe
            var forEachFN = baseArray.forEach,
                nfeForEach;

            if (utilx.isFunction(forEachFN)) {
                tempSafariNFE = function nfeForEach(array, fn, thisArg) {
                    return forEachFN.call(array, fn, thisArg);
                };
            } else {
                tempSafariNFE = function nfeForEach(array, fn, thisArg) {
                    var object = utilx.toObjectFixIndexedAccess(array),
                        length,
                        index;

                    throwIfNotAFunction(fn);
                    length = clampInteger(object.length, 0, MAX_UINT32);
                    for (index = 0; utilx.lt(index, length); index += 1) {
                        if (utilx.hasProperty(object, index)) {
                            fn.call(thisArg, object[index], index, object);
                        }
                    }
                };
            }

            nfeForEach = null;

            return tempSafariNFE;
        }());

        /**
         * Tests whether some element in the array passes the test implemented by the provided function.
         * @memberOf utilx
         * @function
         * @param {array} array
         * @param {function} fn
         * @param {object} [thisArg]
         * @return {boolean}
         */
        // named utilx.arraySome instead of some because of SpiderMonkey and Blackberry bug
        utilx.arraySome = (function () {
            // Unused variable for JScript NFE bug
            // http://kangax.github.io/nfe
            var someFN = baseArray.some,
                nfeSome;

            if (utilx.isFunction(someFN)) {
                tempSafariNFE = function nfeSome(array, fn, thisArg) {
                    return someFN.call(array, fn, thisArg);
                };
            } else {
                tempSafariNFE = function nfeSome(array, fn, thisArg) {
                    var object = utilx.toObjectFixIndexedAccess(array),
                        length,
                        index,
                        val;

                    throwIfNotAFunction(fn);
                    length = clampInteger(object.length, 0, MAX_UINT32);
                    val = false;
                    for (index = 0; utilx.lt(index, length); index += 1) {
                        if (utilx.hasProperty(object, index) && fn.call(thisArg, object[index], index, object)) {
                            val = true;
                            break;
                        }
                    }

                    return val;
                };
            }

            nfeSome = null;

            return tempSafariNFE;
        }());

        /**
         * Creates a new array with the results of calling a provided function on every element in this array.
         * @memberOf utilx
         * @function
         * @param {array} array
         * @param {function} fn
         * @param {object} [thisArg]
         * @return {array}
         */
        // named utilx.arrayMap instead of map because of SpiderMonkey and Blackberry bug
        utilx.arrayMap = (function () {
            // Unused variable for JScript NFE bug
            // http://kangax.github.io/nfe
            var mapFN = baseArray.map,
                nfeMap;

            if (utilx.isFunction(mapFN)) {
                tempSafariNFE = function nfeMap(array, fn, thisArg) {
                    return mapFN.call(array, fn, thisArg);
                };
            } else {
                tempSafariNFE = function nfeMap(array, fn, thisArg) {
                    var object = utilx.toObjectFixIndexedAccess(array),
                        length,
                        index,
                        arr;

                    throwIfNotAFunction(fn);
                    length = clampInteger(object.length, 0, MAX_UINT32);
                    arr = [];
                    for (index = 0; utilx.lt(index, length); index += 1) {
                        utilx.arrayAssign(arr, index, fn.call(thisArg, object[index], index, object));
                    }

                    return arr;
                };
            }

            nfeMap = null;

            return tempSafariNFE;
        }());

        /**
         * Creates a new array from arguments, starting at start and ending at end.
         * @memberOf utilx
         * @function
         * @param {array} array
         * @param {number|string} [start]
         * @param {number|string} [end]
         * @return {array}
         */
        utilx.arraySlice = (function () {
            // Unused variable for JScript NFE bug
            // http://kangax.github.io/nfe
            var sliceFN = baseArray.slice,
                nfeSlice;

            function someArgs() {
                return utilx.returnArgs(utilx.privateUndefined, null, 1, 'a', 2, 'b', null, utilx.privateUndefined);
            }

            try {
                if (!utilx.strictEqual(sliceFN.call(someArgs()).toString(), ',,1,a,2,b,,') ||
                        !utilx.strictEqual(sliceFN.call(someArgs(),
                                        utilx.privateUndefined, utilx.privateUndefined).toString(), ',,1,a,2,b,,') ||
                        !utilx.strictEqual(sliceFN.call(someArgs(), -1).length, 1) ||
                        !utilx.strictEqual(sliceFN.call(someArgs(), 0).toString(), ',,1,a,2,b,,') ||
                        !utilx.strictEqual(sliceFN.call(someArgs(), 3).toString(), 'a,2,b,,') ||
                        !utilx.strictEqual(sliceFN.call(someArgs(), -1, 4).length, 0) ||
                        !utilx.strictEqual(sliceFN.call(someArgs(), 0, 4).toString(), ',,1,a') ||
                        !utilx.strictEqual(sliceFN.call(someArgs(), 3, 6).toString(), 'a,2,b')) {

                    sliceFN = utilx.privateUndefined;
                }
            } catch (e) {
                sliceFN = utilx.privateUndefined;
            }

            if (utilx.isFunction(sliceFN)) {
                tempSafariNFE = function nfeSlice(array, start, end) {
                    return sliceFN.call(array, start, end);
                };
            } else {
                tempSafariNFE = function nfeSlice(array, start, end) {
                    var object = utilx.toObjectFixIndexedAccess(array),
                        relativeStart = utilx.numberToInteger(start),
                        length = clampInteger(object.length, 0, MAX_UINT32),
                        val = [],
                        next = 0,
                        relativeEnd,
                        final,
                        k;

                    if (utilx.lt(utilx.mathSign(relativeStart), 0)) {
                        k = Math.max(length + relativeStart, 0);
                    } else {
                        k = Math.min(relativeStart, length);
                    }

                    if (utilx.isUndefined(end)) {
                        relativeEnd = length;
                    } else {
                        relativeEnd = utilx.numberToInteger(end);
                    }

                    if (utilx.lt(utilx.mathSign(relativeEnd), 0)) {
                        final = Math.max(length + relativeEnd, 0);
                    } else {
                        final = Math.min(relativeEnd, length);
                    }

                    val.length = Math.max(final - k, 0);
                    while (utilx.lt(k, final)) {
                        utilx.arrayAssign(val, next, object[k]);
                        next += 1;
                        k += 1;
                    }

                    return val;
                };
            }

            nfeSlice = null;

            return tempSafariNFE;
        }());

        /**
         * Creates a new array with all elements that pass the test implemented by the provided function.
         * @memberOf utilx
         * @function
         * @param {array} array
         * @param {function} fn
         * @param {object} [thisArg]
         * @return {array}
         */
        // named utilx.arrayFilter instead of filter because of SpiderMonkey and Blackberry bug
        utilx.arrayFilter = (function () {
            // Unused variable for JScript NFE bug
            // http://kangax.github.io/nfe
            var filterFN = baseArray.filter,
                nfeFilter;

            if (utilx.isFunction(filterFN)) {
                tempSafariNFE = function nfeFilter(array, fn, thisArg) {
                    return filterFN.call(array, fn, thisArg);
                };
            } else {
                tempSafariNFE = function nfeFilter(array, fn, thisArg) {
                    var object = utilx.toObjectFixIndexedAccess(array),
                        next = 0,
                        length,
                        arr,
                        index,
                        element;

                    throwIfNotAFunction(fn);
                    length = clampInteger(object.length, 0, MAX_UINT32);
                    arr = [];
                    for (index = 0; utilx.lt(index, length); index += 1) {
                        element = object[index];
                        if (fn.call(thisArg, element, index, object)) {
                            utilx.arrayAssign(arr, next, element);
                            next += 1;
                        }
                    }

                    return arr;
                };
            }

            nfeFilter = null;

            return tempSafariNFE;
        }());

        /**
         * Apply a function against an accumulator and each value of the array (from left-to-right)
         * as to reduce it to a single value.
         * @memberOf utilx
         * @function
         * @param {array} array
         * @param {function} fn
         * @param {*} [initialValue]
         * @return {*}
         */
        // named utilx.arrayReduce instead of reduce because of SpiderMonkey and Blackberry bug
        utilx.arrayReduce = (function () {
            // Unused variable for JScript NFE bug
            // http://kangax.github.io/nfe
            var reduceFN = baseArray.reduce,
                nfeReduce;

            if (utilx.isFunction(reduceFN)) {
                tempSafariNFE = function nfeReduce(array, fn, initialValue) {
                    return reduceFN.call(array, fn, initialValue);
                };
            } else {
                tempSafariNFE = function nfeReduce(array, fn, initialValue) {
                    var object = utilx.toObjectFixIndexedAccess(array),
                        isValueSet = false,
                        value,
                        length,
                        index;

                    throwIfNotAFunction(fn);
                    if (utilx.gt(arguments.length, 2)) {
                        value = initialValue;
                        isValueSet = true;
                    }

                    length = clampInteger(object.length, 0, MAX_UINT32);
                    for (index = 0; utilx.lt(index, length); index += 1) {
                        if (utilx.objectHasOwnProperty(object, index)) {
                            value = fn(value, object[index], index, object);
                            if (utilx.isFalse(isValueSet)) {
                                isValueSet = true;
                            }
                        }
                    }

                    if (utilx.isFalse(isValueSet)) {
                        throw new TypeError('Reduce of empty array with no initial value');
                    }

                    return value;
                };
            }

            nfeReduce = null;

            return tempSafariNFE;
        }());

        /**
         * Builds the test string used to determine if native trim is ES5.
         * @private
         * @function
         * @param {string} previous
         * @param {string} element
         * @return {string}
         */
        function buildTestString(previous, element) {
            return previous + String.fromCharCode(element);
        }

        /**
         * Removes whitespace from both ends of the string.
         * @memberOf utilx
         * @function
         * @param {string} inputArg
         * @return {string}
         */
        // named utilx.stringTrim instead of trim because of SpiderMonkey and Blackberry bug
        utilx.stringTrim = (function () {
            // Unused variable for JScript NFE bug
            // http://kangax.github.io/nfe/
            var trimFN = baseString.trim,
                whiteSpacesList = [
                    0x0009, // Tab
                    0x000a, // Line Feed
                    0x000b, // Vertical Tab
                    0x000c, // Form Feed
                    0x000d, // Carriage Return
                    0x0020, // Space
                    0x0085, // Next line
                    0x00a0, // No-break space
                    0x1680, // Ogham space mark
                    0x180e, // Mongolian vowel separator
                    0x2000, // En quad
                    0x2001, // Em quad
                    0x2002, // En space
                    0x2003, // Em space
                    0x2004, // Three-per-em space
                    0x2005, // Four-per-em space
                    0x2006, // Six-per-em space
                    0x2007, // Figure space
                    0x2008, // Punctuation space
                    0x2009, // Thin space
                    0x200a, // Hair space
                    0x200b, // Zero width space
                    0x2028, // Line separator
                    0x2029, // Paragraph separator
                    0x202f, // Narrow no-break space
                    0x205f, // Medium mathematical space
                    0x3000, // Ideographic space
                    0xfeff // Byte Order Mark
                ],
                testString,
                whiteSpacesString,
                wsTrimRX,
                nfeTrim;

            testString = utilx.arrayReduce(whiteSpacesList, buildTestString, '');
            if (utilx.isFunction(trimFN) && utilx.isZero(trimFN.call(testString).length)) {
                tempSafariNFE = function nfeTrim(inputArg) {
                    return trimFN.call(inputArg);
                };
            } else {
                whiteSpacesString = utilx.arrayReduce(whiteSpacesList, function (previous, element) {
                    return previous + '\\u' + utilx.padLeadingChar(element.toString(16), '0', 4);
                }, '');

                wsTrimRX = new RegExp('^[' + whiteSpacesString + ']+|[' + whiteSpacesString + ']+$', 'g');
                tempSafariNFE = function nfeTrim(inputArg) {
                    return onlyCoercibleToString(inputArg).replace(wsTrimRX, '');
                };
            }

            nfeTrim = null;

            return tempSafariNFE;
        }());

        /**
         * Returns the first index at which a given element can be found in the array, or -1 if it is not present.
         * @memberOf utilx
         * @function
         * @param {array} array
         * @param {object} searchElement
         * @param {number} [fromIndex]
         * @return {number}
         */
        // http://ecma-international.org/ecma-262/5.1/#sec-15.4.4.14
        // Create our own local "indexOf" function: native -> polyfill
        // named utilx.arrayIndexOf instead of indexOf because of SpiderMonkey and Blackberry bug
        utilx.arrayIndexOf = (function () {
            // Unused variable for JScript NFE bug
            // http://kangax.github.io/nfe
            var indexOfFN = baseArray.indexOf,
                nfeIndexOf;

            if (utilx.isFunction(indexOfFN) && utilx.strictEqual(indexOfFN.call([0, 1], 1, 2), 1)) {
                tempSafariNFE = function nfeIndexOf(array, searchElement, fromIndex) {
                    return indexOfFN.call(array, searchElement, fromIndex);
                };
            } else {
                tempSafariNFE = function nfeIndexOf(array, searchElement, fromIndex) {
                    var object = utilx.toObjectFixIndexedAccess(array),
                        length = clampInteger(object.length, 0, MAX_UINT32),
                        index,
                        start,
                        val;

                    if (utilx.isZero(length)) {
                        val = -1;
                    } else {
                        if (utilx.gt(arguments.length, 2)) {
                            fromIndex = utilx.numberToInteger(fromIndex);
                        } else {
                            fromIndex = 0;
                        }

                        if (utilx.gte(fromIndex, length)) {
                            val = -1;
                        } else {
                            if (utilx.gte(fromIndex, 0)) {
                                start = fromIndex;
                            } else {
                                start = length - Math.abs(fromIndex);
                            }

                            if (utilx.lt(start, 0)) {
                                start = 0;
                            }

                            for (index = start, val = -1; utilx.lt(index, length); index += 1) {
                                if (utilx.hasProperty(object, index) && utilx.strictEqual(searchElement,
                                                                                          object[index])) {
                                    val = index;
                                    break;
                                }
                            }
                        }
                    }

                    return val;
                };
            }

            nfeIndexOf = null;

            return tempSafariNFE;
        }());

        /**
         * Returns an array of a given object's own enumerable properties, in the same order as that provided by a
         * for-in loop (the difference being that a for-in loop enumerates properties in the prototype chain as well).
         * @memberOf utilx
         * @function
         * @param {object} object
         * @return {array}
         */
        // named utilx.objectKeys instead of keys because of SpiderMonkey and Blackberry bug
        utilx.objectKeys = (function () {
            // Unused variable for JScript NFE bug
            // http://kangax.github.io/nfe
            var keysFN = CtrObject.keys,
                supported = false,
                hasDontEnumBug = true,
                testObject,
                nfeKeys;

            /*jshint -W001 */
            testObject = {
                'toString': null,
                'toLocaleString': null,
                'valueOf': null,
                'hasOwnProperty': null,
                'isPrototypeOf': null,
                'propertyIsEnumerable': null,
                'constructor': null
            };
            /*jshint +W001 */

            if (utilx.isFunction(keysFN)) {
                try {
                    supported = utilx.strictEqual(keysFN(testObject).length, 7);
                } catch (e) {
                    supported = false;
                }
            }

            if (utilx.isTrue(supported)) {
                tempSafariNFE = keysFN;
            } else {
                // reuse to save a var
                for (nfeKeys in testObject) {
                    if (utilx.strictEqual(nfeKeys, 'toString') && utilx.isNull(testObject[nfeKeys])) {
                        hasDontEnumBug = false;
                    }
                }

                tempSafariNFE = function nfeKeys(object) {
                    throwIfIsNotTypeObjectOrIsNotFunction(object);

                    var props = [],
                        prop;

                    for (prop in object) {
                        if (utilx.objectHasOwnProperty(object, prop)) {
                            utilx.arrayPush(props, prop);
                        }
                    }

                    if (utilx.isTrue(hasDontEnumBug)) {
                        utilx.arrayForEach(defaultProperties, function (property) {
                            if (utilx.objectHasOwnProperty(object, property)) {
                                utilx.arrayPush(props, property);
                            }
                        });
                    }

                    return props;
                };
            }

            nfeKeys = null;

            return tempSafariNFE;
        }());

        /**
         * Returns true if the operand inputArg is a String and only contains numerical digits.
         * @memberOf utilx
         * @function
         * @param {*} string
         * @return {boolean}
         */
        utilx.isDigits = (function () {
            var rxNotDigits = new RegExp('^\\d+$');

            return function (string) {
                return utilx.isString(string) && rxNotDigits.test(string);
            };
        }());

        /**
         * Defines a new property directly on an object, or modifies an existing property on an object,
         * and returns the object.
         * @memberOf utilx
         * @function
         * @param {object} object
         * @param {string} property
         * @param {object} descriptor
         * @return {object}
         */
        // http://ecma-international.org/ecma-262/5.1/#sec-15.2.3.6
        // Create our own local "defineProperty" function: native -> sham
        // named utilx.objectDefineProperty instead of defineProperty because of SpiderMonkey and Blackberry bug
        utilx.objectDefineProperty = (function () {
            // Unused variable for JScript NFE bug
            // http://kangax.github.io/nfe
            var nativeFN = CtrObject.defineProperty,
                defineGetter = '__defineGetter__',
                defineSetter = '__defineSetter__',
                defineGetterFN,
                defineSetterFN,
                testObject,
                previousFN1,
                previousFN2,
                definePropertyFN,
                nfeDefineProperty,
                nfeDefineProperty1,
                nfeDefineProperty2;

            if (utilx.isFunction(nativeFN)) {
                try {
                    testObject = nativeFN({}, 'sentinel', {
                        value: null
                    });

                    if (!utilx.isNull(testObject.sentinel)) {
                        throw new Error('Fails sentinel check');
                    }

                    // Test string integer
                    try {
                        tempSafariNFE = nativeFN([], '1.', {
                            value: null
                        });

                        if (!utilx.isNull(tempSafariNFE[1])) {
                            throw new Error('Fails integer check');
                        }

                        definePropertyFN = nativeFN;
                    } catch (e) {
                        definePropertyFN = function nfeDefineProperty(object, property, descriptor) {
                            if (isArrayOrArguments(object) &&
                                    utilx.isString(property) && !utilx.isEmptyString(property) &&
                                    !utilx.isDigits(property) &&
                                    utilx.numberIsInteger(utilx.toNumber(property))) {

                                property = utilx.toNumber(property).toString();
                            }

                            return nativeFN(object, property, descriptor);
                        };
                    }

                    // Test assign to array
                    try {
                        tempSafariNFE = definePropertyFN([], '0', {
                            value: null
                        });

                        if (!utilx.isNull(tempSafariNFE[0])) {
                            throw new Error('Fails array check');
                        }
                    } catch (e) {
                        previousFN1 = definePropertyFN;
                        definePropertyFN = function nfeDefineProperty1(object, property, descriptor) {
                            if (isArrayOrArguments(object) &&
                                    ((utilx.isNumber(property) && utilx.numberIsInteger(property)) ||
                                     (utilx.isString(property) && utilx.isDigits(property)) ||
                                     (utilx.isString(property) && !utilx.isEmptyString(property) &&
                                        utilx.numberIsInteger(utilx.toNumber(property))))) {

                                if (utilx.objectHasOwnProperty(descriptor, 'value') ||
                                        !utilx.objectHasOwnProperty(object, property)) {

                                    utilx.arrayAssign(object, property, descriptor.value);
                                }
                            }

                            return previousFN1(object, property, descriptor);
                        };
                    }

                    // Test overwrite array property when no value defined
                    try {
                        tempSafariNFE = definePropertyFN([10], '0', {});
                        if (utilx.notStrictEqual(tempSafariNFE[0], 10)) {
                            throw new Error('Fails overwrite check');
                        }
                    } catch (e) {
                        previousFN2 = definePropertyFN;
                        definePropertyFN = function nfeDefineProperty2(object, property, descriptor) {
                            if (!utilx.objectHasOwnProperty(descriptor, 'value')) {
                                descriptor.value = object[property];
                            }

                            return previousFN2(object, property, descriptor);
                        };
                    }
                } catch (ignore) {}
            }

            /*global console */
            if (utilx.isFunction(definePropertyFN)) {
                tempSafariNFE = definePropertyFN;
            } else {
                defineGetterFN = baseObject[defineGetter];
                defineSetterFN = baseObject[defineSetter];
                tempSafariNFE = function nfeDefineProperty(object, property, descriptor) {
                    throwIfIsNotTypeObjectOrIsNotFunction(object);
                    if (!isTypeObjectOrIsFunction(descriptor)) {
                        throw new TypeError('Property description must be an object: ' + utilx.anyToString(descriptor));
                    }

                    if (utilx.objectHasOwnProperty(descriptor, 'value') &&
                            (utilx.objectHasOwnProperty(descriptor, 'get') ||
                                utilx.objectHasOwnProperty(descriptor, 'set'))) {

                        throw new TypeError('Invalid property. A property cannot have accessors and a value');
                    }

                    var prototype;

                    if (!utilx.objectHasOwnProperty(descriptor, 'get') &&
                            !utilx.objectHasOwnProperty(descriptor, 'set')) {

                        if (utilx.objectHasOwnProperty(descriptor, 'value') ||
                                !utilx.objectHasOwnProperty(object, property)) {

                            if (utilx.isNull(utilx.objectGetPrototypeOf(baseObject)[protoName])) {
                                prototype = object[protoName];
                                object[protoName] = utilx.objectGetPrototypeOf(baseObject);
                                console.log('# OBJECT: ' + object);
                                console.log('# ISARRAY1: ' + utilx.arrayIsArray(object));
                                console.log('# ISARRAY2: ' + isArrayOrArguments(object));
                                console.log('# ISSTRINGINT: ' + utilx.isString(property) &&
                                            !utilx.isEmptyString(property) &&
                                            utilx.numberIsInteger(utilx.toNumber(property)));
                                if (isArrayOrArguments(object) &&
                                        ((utilx.isNumber(property) && utilx.numberIsInteger(property)) ||
                                         (utilx.isString(property) && utilx.isDigits(property)) ||
                                         (utilx.isString(property) && !utilx.isEmptyString(property) &&
                                            utilx.numberIsInteger(utilx.toNumber(property))))) {

                                    console.log('# ARRAY');
                                    utilx.arrayAssign(object, property, descriptor.value);
                                } else {
                                    delete object[property];
                                    object[property] = descriptor.value;
                                }

                                object[protoName] = prototype;
                            } else {
                                if (isArrayOrArguments(object) &&
                                        ((utilx.isNumber(property) && utilx.numberIsInteger(property)) ||
                                         (utilx.isString(property) && utilx.isDigits(property)) ||
                                         (utilx.isString(property) && !utilx.isEmptyString(property) &&
                                            utilx.numberIsInteger(utilx.toNumber(property))))) {

                                    utilx.arrayAssign(object, property, descriptor.value);
                                } else {
                                    object[property] = descriptor.value;
                                }
                            }
                        }
                    } else {
                        if (!utilx.isFunction(defineGetterFN) || !utilx.isFunction(defineSetterFN)) {
                            throw new TypeError('getters & setters can not be defined on this javascript engine');
                        }

                        if (utilx.isFunction(descriptor.get)) {
                            defineGetterFN.call(object, property, descriptor.get);
                        }

                        if (utilx.isFunction(descriptor.set)) {
                            defineSetterFN.call(object, property, descriptor.set);
                        }
                    }

                    return object;
                };
            }

            nfeDefineProperty = null;
            nfeDefineProperty1 = null;
            nfeDefineProperty2 = null;

            return tempSafariNFE;
        }());

        /**
         * Defines new or modifies existing properties directly on an object, returning the object.
         * @memberOf utilx
         * @function
         * @param {object} object
         * @param {string} props
         * @return {object}
         */
        // Create our own local "defineProperties" function: native -> sham
        // we don't use the native otherwise we need all the same patches applied to objectDefineProperty
        // named utilx.objectDefineProperties instead of defineProperties because of SpiderMonkey and Blackberry bug
        utilx.objectDefineProperties = function (object, props) {
            throwIfIsNotTypeObjectOrIsNotFunction(object);
            if (!isTypeObjectOrIsFunction(props)) {
                throw new TypeError('Property description must be an object');
            }

            utilx.arrayForEach(utilx.objectKeys(props), function (key) {
                utilx.objectDefineProperty(object, key, props[key]);
            });

            return object;
        };

        /**
         * Returns a property descriptor for an own property (that is, one directly present on an object,
         * not present by dint of being along an object's prototype chain) of a given object.
         * @private
         * @function
         * @param {object} object
         * @param {string} property
         * @return {object}
         */
        // Create our own local "getOwnPropertyDescriptor" function: native -> sham
        // named objectGetOwnPropertyDescriptor instead of getOwnPropertyDescriptor because of SpiderMonkey
        // and Blackberry bug
        objectGetOwnPropertyDescriptor = (function () {
            // Unused variable for JScript NFE bug
            // http://kangax.github.io/nfe
            var getOwnPropertyDescriptorFN = CtrObject.getOwnPropertyDescriptor,
                lookupGetter = '__lookupGetter__',
                lookupSetter = '__lookupSetter__',
                lookupGetterFN,
                lookupSetterFN,
                testObject,
                nfeGetOwnPropertyDescriptor;

            if (utilx.isFunction(getOwnPropertyDescriptorFN)) {
                try {
                    testObject = {
                        sentinel: null
                    };

                    if (!utilx.isNull(getOwnPropertyDescriptorFN(testObject, 'sentinel').value)) {
                        getOwnPropertyDescriptorFN = null;
                    }
                } catch (exception) {
                    getOwnPropertyDescriptorFN = null;
                }
            }

            if (utilx.isFunction(getOwnPropertyDescriptorFN)) {
                try {
                    if (utilx.isTrue(getOwnPropertyDescriptorFN(function (a) {
                            return a;
                        }, 'length').writable)) {

                        throw new Error();
                    }

                    tempSafariNFE = getOwnPropertyDescriptorFN;
                } catch (e) {
                    tempSafariNFE = function nfeGetOwnPropertyDescriptor(object, property) {
                        var descriptor = getOwnPropertyDescriptorFN(object, property);

                        if (utilx.isFunction(object) && utilx.strictEqual(property, 'length') &&
                                utilx.isTrue(descriptor.writable)) {

                            descriptor.writable = false;
                        }

                        return descriptor;
                    };
                }
            } else {
                lookupGetterFN = baseObject[lookupGetter];
                lookupSetterFN = baseObject[lookupSetter];
                tempSafariNFE = function nfeGetOwnPropertyDescriptor(object, property) {
                    var descriptor,
                        prototype,
                        getter,
                        setter;

                    throwIfIsNotTypeObjectOrIsNotFunction(object);
                    if (utilx.objectHasOwnProperty(object, property)) {
                        descriptor = {};
                        descriptor.configurable = true;
                        try {
                            descriptor.enumerable = CtrObject.propertyIsEnumerable.call(object, property);
                        } catch (e) {
                            descriptor.enumerable = true;
                        }

                        if (utilx.isFunction(lookupGetterFN) && utilx.isFunction(lookupSetterFN)) {
                            prototype = object[protoName];
                            object[protoName] = utilx.objectGetPrototypeOf(baseObject);
                            getter = lookupGetterFN.call(object, property);
                            setter = lookupSetterFN.call(object, property);
                            object[protoName] = prototype;
                            if (utilx.isFunction(getter) || utilx.isFunction(setter)) {
                                if (utilx.isFunction(getter)) {
                                    descriptor.get = getter;
                                }

                                if (utilx.isFunction(setter)) {
                                    descriptor.set = setter;
                                }
                            }
                        }

                        descriptor.value = object[property];
                        if (utilx.strictEqual(property, 'length')) {
                            if (utilx.isFunction(object)) {
                                descriptor.writable = false;
                                descriptor.configurable = false;
                            } else if (isArrayOrArguments(object)) {
                                descriptor.writable = true;
                                descriptor.configurable = false;
                            }
                        } else if (utilx.strictEqual(property, 'prototype')) {
                            switch (object) {
                            case Object:
                                /* falls through */
                            case Array:
                                /* falls through */
                            case Function:
                                /* falls through */
                            case Boolean:
                                /* falls through */
                            case String:
                                /* falls through */
                            case Date:
                                /* falls through */
                            case RegExp:
                                /* falls through */
                            case Error:
                                /* falls through */
                            case TypeError:
                                /* falls through */
                            case SyntaxError:
                                /* falls through */
                            case RangeError:
                                /* falls through */
                            case EvalError:
                                /* falls through */
                            case ReferenceError:
                                /* falls through */
                            case URIError:
                                descriptor.writable = false;
                                descriptor.configurable = false;
                                break;
                            default:
                                descriptor.writable = true;
                                descriptor.configurable = false;
                            }
                        } else {
                            descriptor.writable = true;
                        }
                    }

                    return descriptor;
                };
            }

            nfeGetOwnPropertyDescriptor = null;

            return tempSafariNFE;
        }());

        /**
         * Freezes an object: that is, prevents new properties from being added to it; prevents existing properties
         * from being removed; and prevents existing properties, or their enumerability, configurability, or
         * writability, from being changed.
         * In essence the object is made effectively immutable. Returns the object being frozen.
         * @memberOf utilx
         * @function
         * @param {object} object
         * @return {object}
         */
        // Create our own local "freeze" function: native -> sham
        // named utilx.objectFreeze instead of freeze because of SpiderMonkey and Blackberry bug
        utilx.objectFreeze = (function () {
            // Unused variable for JScript NFE bug
            // http://kangax.github.io/nfe
            var freezeFN = CtrObject.freeze,
                nfeFreeze;

            if (utilx.isFunction(freezeFN)) {
                tempSafariNFE = freezeFN;
            } else {
                tempSafariNFE = function nfeFreeze(object) {
                    throwIfIsNotTypeObjectOrIsNotFunction(object);

                    return object;
                };
            }

            nfeFreeze = null;

            return tempSafariNFE;
        }());

        // detect a Rhino bug and patch it
        try {
            utilx.objectFreeze(utilx.noop);
        } catch (exception) {
            utilx.objectFreeze = (function (freezeObject) {
                // Unused variable for JScript NFE bug
                // http://kangax.github.io/nfe
                var nfeFreezeR;

                tempSafariNFE = function nfeFreezeR(object) {
                    var val;

                    if (utilx.isFunction(object)) {
                        val = object;
                    } else {
                        val = freezeObject(object);
                    }

                    return val;
                };

                nfeFreezeR = null;

                return tempSafariNFE;
            }(utilx.objectFreeze));
        }

        /**
         * Determine if an object is frozen.
         * @memberOf utilx
         * @function
         * @param {object} object
         * @return {boolean}
         */
        // Create our own local "isFrozen" function: native -> sham
        // named utilx.objectIsFrozen instead of isFrozen because of SpiderMonkey and Blackberry bug
        utilx.objectIsFrozen = (function () {
            // Unused variable for JScript NFE bug
            // http://kangax.github.io/nfe
            var isFrozenFN = CtrObject.isFrozen,
                nfeIsFrozen;

            if (utilx.isFunction(isFrozenFN)) {
                tempSafariNFE = isFrozenFN;
            } else {
                tempSafariNFE = function nfeIsFrozen(object) {
                    throwIfIsNotTypeObjectOrIsNotFunction(object);

                    return false;
                };
            }

            nfeIsFrozen = null;

            return tempSafariNFE;
        }());

        /**
         * To make object fully immutable, freeze each object in object.
         * @memberOf utilx
         * @function
         * @param {object} object
         * @return {object}
         */
        utilx.deepFreeze = function (object) {
            utilx.objectFreeze(object);
            utilx.arrayForEach(utilx.objectKeys(object), function (propKey) {
                var prop = object[propKey];

                if (isTypeObjectOrIsFunction(prop) && !utilx.objectIsFrozen(prop)) {
                    utilx.deepFreeze(prop);
                }
            });

            return object;
        };

        /**
         * The function tests whether an object has in its prototype chain the prototype property of a constructor.
         * @memberOf utilx
         * @function
         * @param {object} object
         * @param {function} ctr
         * @return {boolean}
         */
        // named utilx.objectInstanceOf instead of instanceOf because of SpiderMonkey and Blackberry bug
        utilx.objectInstanceOf = (function () {
            // Unused variable for JScript NFE bug
            // http://kangax.github.io/nfe
            var isPrototypeOfFN = CtrObject.prototype.isPrototypeOf,
                nfeInstanceOf;

            if (utilx.isFunction(isPrototypeOfFN)) {
                tempSafariNFE = function nfeInstanceOf(object, ctr) {
                    throwIfNotAFunction(ctr);

                    return !utilx.isPrimitive(object) && isPrototypeOfFN.call(ctr.prototype, object);
                };
            } else if (utilx.isFunction(utilx.objectGetPrototypeOf)) {
                tempSafariNFE = function nfeInstanceOf(object, ctr) {
                    throwIfNotAFunction(ctr);

                    var val = false;

                    if (!utilx.isPrimitive(object)) {
                        while (utilx.toBoolean(object)) {
                            if (utilx.strictEqual(object, ctr.prototype)) {
                                val = true;
                                break;
                            }

                            object = utilx.objectGetPrototypeOf(object);
                        }
                    }

                    return val;
                };
            }

            nfeInstanceOf = null;

            return tempSafariNFE;
        }());

        /**
         * The constructor used by utilx.objectCreate if shimmed.
         * @private
         * @constructor
         * @return {object}
         */
        function ObjectCreateFunc() {
            return;
        }

        /**
         * The utilx.objectCreate method creates a new object with the specified prototype object and properties.
         * @memberOf utilx
         * @function
         * @param {object} prototype
         * @return {object}
         */
        // named utilx.objectCreate instead of create because of SpiderMonkey and Blackberry bug
        utilx.objectCreate = (function () {
            // Unused variable for JScript NFE bug
            // http://kangax.github.io/nfe
            var createdOk,
                objectCreateFN,
                nfeObjectCreate,
                testObject;

            try {
                objectCreateFN = CtrObject.create;
                testObject = objectCreateFN(ObjectCreateFunc.prototype, {
                    constructor: {
                        value: ObjectCreateFunc,
                        enumerable: false,
                        writable: true,
                        configurable: true
                    },

                    foo: {
                        value: 'test',
                        enumerable: false,
                        writable: true,
                        configurable: true
                    }
                });

                if (utilx.strictEqual(testObject.foo, 'test')) {
                    tempSafariNFE = objectCreateFN;
                    createdOk = true;
                } else {
                    createdOk = false;
                }
            } catch (e) {
                createdOk = false;
            }

            if (utilx.isFalse(createdOk)) {
                tempSafariNFE = function nfeObjectCreate(prototype, propertiesObject) {
                    throwIfIsNotTypeObjectOrIsNotFunction(prototype);

                    var newObject;

                    ObjectCreateFunc.prototype = prototype;
                    newObject = new ObjectCreateFunc();
                    utilx.objectDefineProperty(newObject, protoName, {
                        value: prototype,
                        enumerable: false,
                        writable: true,
                        configurable: true
                    });

                    if (utilx.isPlainObject(propertiesObject)) {
                        utilx.objectDefineProperties(newObject, propertiesObject);
                    }

                    return newObject;
                };
            }

            nfeObjectCreate = null;

            return tempSafariNFE;
        }());

        /**
         * Check to see if an object is a plain object (created using "{}" or "new Object").
         * @memberOf utilx
         * @function
         * @param {object} object
         * @return {boolean}
         */
        utilx.isPlainObject = (function () {
            var baseObjectPrototype = utilx.objectGetPrototypeOf(baseObject);

            return function (object) {
                return utilx.isTypeObject(object) && utilx.isObject(object) &&
                    utilx.strictEqual(utilx.objectGetPrototypeOf(object), baseObjectPrototype);
            };
        }());

        /**
         * "shallow" extend the properties from the source objects over to the target object,
         * and return the target object. It's in-order, so the last source will override properties of
         * the same name in previous arguments.
         * @memberOf utilx
         * @function
         * @param {object} target
         * @param {...object} [source]
         * @return {object}
         */
        utilx.extend = function (target) {
            throwIfIsNotTypeObjectOrIsNotFunction(target);
            utilx.arrayForEach(utilx.arraySlice(arguments, 1), function (source) {
                if (isTypeObjectOrIsFunction(source)) {
                    utilx.arrayForEach(utilx.objectKeys(source), function (key) {
                        utilx.objectDefineProperty(target, key, objectGetOwnPropertyDescriptor(source, key));
                    });
                }
            });

            return target;
        };

        /**
         * Returns true if the operand inputArg is a Date object and is valid.
         * @memberOf utilx
         * @function
         * @param {*} dateObject
         * @return {boolean}
         */
        utilx.isDateValid = function (dateObject) {
            return utilx.isDate(dateObject) && !utilx.numberIsNaN(dateObject.getTime());
        };

        /**
         * Takes string and puts a backslash in front of every character that is part of the regular expression syntax.
         * This is useful if you have a run-time string that you need to match in some text and the string may contain
         * special regex characters.
         * @memberOf utilx
         * @function
         * @param {string} string
         * @return {string}
         */
        utilx.escapeRegex = (function () {
            var rxEscapeThese = new RegExp('[\\[\\](){}?*+\\^$\\\\.|]', 'g');

            return function (string) {
                return string.replace(rxEscapeThese, '\\$&');
            };
        }());

        /**
         * Wraps a string within the string character.
         * @memberOf utilx
         * @function
         * @param {string} string
         * @param {string} character
         * @return {string}
         */
        utilx.wrapInChar = function (string, character) {
            return character + string + character;
        };

        /**
         * Replace all occurences of a string pattern within a string with the string characters.
         * @memberOf utilx
         * @function
         * @param {string} string
         * @param {string} pattern
         * @param {string} characters
         * @return {string}
         */
        utilx.replaceAll = function (string, pattern, characters) {
            return string.replace(new RegExp(utilx.escapeRegex(pattern), 'g'), characters);
        };

        /**
         * Returns a random integer between the supplied min and max arguments.
         * @memberOf utilx
         * @function
         * @param {number} min
         * @param {number} max
         * @return {number}
         */
        utilx.getRandomInt = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        };

        /**
         * Tests a deep equality relation.. set opts {strict: true} for deepStrictEqual
         * @memberOf utilx
         * @function
         * @param {*} a
         * @param {*} b
         * @param {object} opts
         * @return {boolean}
         */
        utilx.deepEqual = function (a, b, opts) {
            if (!utilx.isPlainObject(opts)) {
                opts = {};
            }

            if (utilx.objectIs(a, b)) {
                return true;
            }

            if (utilx.isDate(a) && utilx.isDate(b)) {
                return utilx.objectIs(a.getTime(), b.getTime());
            }

            if (utilx.isRegExp(a) && utilx.isRegExp(b)) {
                return utilx.objectIs(a.source, b.source) &&
                    utilx.objectIs(a.global, b.global) &&
                    utilx.objectIs(a.multiline, b.multiline) &&
                    utilx.objectIs(a.lastIndex, b.lastIndex) &&
                    utilx.objectIs(a.ignoreCase, b.ignoreCase) &&
                    utilx.objectIs(a.sticky, b.sticky);
            }

            if (!utilx.isTypeObject(a) && !utilx.isTypeObject(b)) {
                return utilx.isTrue(opts.strict) ? utilx.objectIs(a, b) : utilx.equal(a, b);
            }

            if (utilx.isTrue(opts.strict)) {
                if (!utilx.objectIs(utilx.objectGetPrototypeOf(utilx.toObjectFixIndexedAccess(a)),
                                    utilx.objectGetPrototypeOf(utilx.toObjectFixIndexedAccess(b)))) {

                    return false;
                }
            } else {
                if (!utilx.objectIs(a.prototype, b.prototype)) {
                    return false;
                }
            }

            if (utilx.isArguments(a)) {
                if (!utilx.isArguments(b)) {
                    return false;
                }

                return utilx.deepEqual(utilx.arraySlice(a), utilx.arraySlice(b), opts);
            }

            var ka,
                kb,
                status;

            try {
                ka = utilx.objectKeys(a);
                kb = utilx.objectKeys(b);
            } catch (e) {
                return false;
            }

            if (!utilx.objectIs(ka.length, kb.length)) {
                if (utilx.arrayIsArray(a) && utilx.arrayIsArray(b)) {
                    if (!utilx.objectIs(a.length, b.length)) {
                        return false;
                    }
                } else {
                    return false;
                }
            } else {
                ka.sort();
                kb.sort();
                status = utilx.arraySome(ka, function (aKey, index) {
                    return !utilx.objectIs(aKey, kb[index]);
                });

                if (utilx.isTrue(status)) {
                    return false;
                }
            }

            status = utilx.arraySome(ka, function (aKey) {
                return !utilx.deepEqual(a[aKey], b[aKey], opts);
            });

            if (utilx.isTrue(status)) {
                return false;
            }

            return true;
        };

        /**
         * Shortcut for utilx.deepEqual(a, b, {strict: true})
         * @memberOf utilx
         * @function
         * @param {*} a
         * @param {*} b
         * @return {boolean}
         */
        utilx.deepStrictEqual = function (a, b) {
            return utilx.deepEqual(a, b, {
                strict: true
            });
        };

        /**
         * Return a JSON string corresponding to the specified value, optionally including only certain properties
         * or replacing property values in a user-defined manner.
         * @memberOf utilx
         * @function
         * @param {*} value
         * @param {function|array} replacer
         * @param {number} space
         * @return {string}
         */
        utilx.jsonStringify = (function () {
            // Unused variable for JScript NFE bug
            // http://kangax.github.io/nfe
            var supported = false,
                stringifiedValue,
                escapableStr,
                escapable,
                gap,
                indent,
                meta,
                rep,
                quote,
                str,
                nfeJSONStringify;

            if (typeof JSON === 'object' && !utilx.isNull(JSON)) {
                if (utilx.isFunction(JSON.stringify)) {
                    // A test function object with a custom `toJSON` method.
                    (function () {
                        stringifiedValue = function () {
                            return 1;
                        };
                    }());

                    stringifiedValue.toJSON = stringifiedValue;

                    try {
                        supported =
                            // Firefox 3.1b1 and b2 serialize string, number, and boolean
                            // primitives as object literals.
                            utilx.strictEqual(JSON.stringify(0), '0') &&
                            // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
                            // literals.
                            utilx.strictEqual(JSON.stringify(new CtrNumber()), '0') &&
                            utilx.strictEqual(JSON.stringify(new CtrString()), '""') &&
                            // FF 3.1b1, 2 throw an error if the stringifiedValue is `null`, `undefined`, or
                            // does not define a canonical JSON representation (this applies to
                            // objects with `toJSON` properties as well, *unless* they are nested
                            // within an object or array).
                            utilx.strictEqual(JSON.stringify(isNaN), utilx.privateUndefined) &&
                            // IE 8 serializes `undefined` as `"undefined"`. Safari 5.1.7 and FF
                            // 3.1b3 pass this test.
                            utilx.strictEqual(JSON.stringify(utilx.privateUndefined), utilx.privateUndefined) &&
                            // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
                            // respectively, if the stringifiedValue is omitted entirely.
                            utilx.strictEqual(JSON.stringify(), utilx.privateUndefined) &&
                            // FF 3.1b1, 2 throw an error if the given stringifiedValue is not a number,
                            // string, array, object, Boolean, or `null` literal. This applies to
                            // objects with custom `toJSON` methods as well, unless they are nested
                            // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
                            // methods entirely.
                            utilx.strictEqual(JSON.stringify(stringifiedValue), '1') &&
                            utilx.strictEqual(JSON.stringify([stringifiedValue]), '[1]') &&
                            // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
                            // `"[null]"`.
                            utilx.strictEqual(JSON.stringify([utilx.privateUndefined]), '[null]') &&
                            // YUI 3.0.0b1 fails to serialize `null` literals.
                            utilx.strictEqual(JSON.stringify(null), 'null') &&
                            // FF 3.1b1, 2 halts serialization if an array contains a function:
                            // `[1, true, isNaN, 1]` serializes as "[1,true,],". These versions
                            // of Firefox also allow trailing commas in JSON objects and arrays.
                            // FF 3.1b3 elides non-JSON values from objects and arrays, unless they
                            // define custom `toJSON` methods.
                            utilx.strictEqual(JSON.stringify([utilx.privateUndefined, isNaN, null]),
                                              '[null,null,null]') &&
                            // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
                            // where character escape codes are expected (e.g., `\b` => `\u0008`).
                            // Removed test for '\0' => '\\'u0000'as Chrome 10 fails in 'use strict' mode with
                            // Error: Uncaught SyntaxError: Octal literals are not allowed in strict mode.
                            utilx.strictEqual(JSON.stringify({
                                'A': [stringifiedValue, true, false, null, '\b\n\f\r\t']
                            }), '{"A":[1,true,false,null,"\\b\\n\\f\\r\\t"]}') &&
                            // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
                            //utilx.strictEqual(JSON.stringify(null, stringifiedValue), '"1"') &&
                            utilx.strictEqual(JSON.stringify([1, 2], null, 1), '[\n 1,\n 2\n]') &&
                            // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
                            // serialize extended years.
                            utilx.strictEqual(JSON.stringify(new Date(-8.64e15)), '"-271821-04-20T00:00:00.000Z"') &&
                            // The milliseconds are optional in ES 5, but required in 5.1.
                            utilx.strictEqual(JSON.stringify(new Date(8.64e15)), '"+275760-09-13T00:00:00.000Z"') &&
                            // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
                            // four-digit years instead of six-digit years. Credits: @Yaffle.
                            utilx.strictEqual(JSON.stringify(new Date(-621987552e5)),
                                              '"-000001-01-01T00:00:00.000Z"') &&
                            // Safari <= 5.1.7 and Opera >= 10.53 incorrectly serialize millisecond
                            // values less than 1000. Credits: @Yaffle.
                            utilx.strictEqual(JSON.stringify(new Date(-1)), '"1969-12-31T23:59:59.999Z"');
                    } catch (e) {
                        supported = false;
                    }
                }
            }

            if (utilx.isTrue(supported)) {
                tempSafariNFE = JSON.stringify;
            } else {
                escapableStr = '[\\\\\\"\\x00-\\x1f\\x7f-\\x9f\\u00ad\\u0600-\\u0604\\u070f\\u17b4\\u17b5';
                escapableStr += '\\u200c-\\u200f\\u2028-\\u202f\\u2060-\\u206f\\ufeff\\ufff0-\\uffff]';
                escapable = new RegExp(escapableStr, 'g');
                meta = {
                    '\b': '\\b',
                    '\t': '\\t',
                    '\n': '\\n',
                    '\f': '\\f',
                    '\r': '\\r',
                    '"': '\\"',
                    '\\': '\\\\'
                };

                quote = function (string) {
                    var result = '"';

                    escapable.lastIndex = 0;
                    if (escapable.test(string)) {
                        result += string.replace(escapable, function (a) {
                            var c = meta[a],
                                r;

                            if (utilx.isString(c)) {
                                r = c;
                            } else {
                                r = '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                            }

                            return r;
                        });
                    } else {
                        result += string;
                    }

                    return result + '"';
                };

                str = function (key, holder) {
                    var index,
                        member,
                        length,
                        mind = gap,
                        partial,
                        value = holder[key];

                    if (isTypeObjectOrIsFunction(value) && utilx.isFunction(value.toJSON)) {
                        value = value.toJSON(key);
                    }

                    if (utilx.isFunction(rep)) {
                        value = rep.call(holder, key, value);
                    }

                    switch (typeof value) {
                    case 'string':
                        return quote(value);
                    case 'number':
                        if (utilx.numberIsFinite(value)) {
                            return utilx.anyToString(value);
                        }

                        return 'null';
                    case 'boolean':
                    case 'null':
                        return utilx.anyToString(value);
                    case 'object':
                        if (utilx.isNull(value)) {
                            return utilx.anyToString(value);
                        }

                        gap += indent;
                        partial = [];
                        if (utilx.arrayIsArray(value)) {
                            length = value.length;
                            for (index = 0; index < length; index += 1) {
                                utilx.arrayAssign(partial, index, str(index, value) || 'null');
                            }

                            if (utilx.isZero(partial.length)) {
                                member = '[]';
                            } else if (utilx.isString(gap) && !utilx.isEmptyString(gap)) {
                                member = '[\n' + gap + utilx.arrayJoin(partial, ',\n' + gap) + '\n' + mind + ']';
                            } else {
                                member = '[' + utilx.arrayJoin(partial) + ']';
                            }

                            gap = mind;

                            return member;
                        }

                        if (utilx.arrayIsArray(rep)) {
                            utilx.arrayForEach(rep, function (element) {
                                var v;

                                if (utilx.isString(element)) {
                                    v = str(element, value);
                                    if (!utilx.isUndefined(v)) {
                                        utilx.arrayPush(partial, quote(element) +
                                                        (utilx.isString(gap) && !utilx.isEmptyString(gap) ?
                                                         ': ' :
                                                         ':') + v);
                                    }
                                }
                            });
                        } else {
                            utilx.arrayForEach(utilx.objectKeys(value), function (k) {
                                var v = str(k, value);

                                if (!utilx.isUndefined(v)) {
                                    utilx.arrayPush(partial, quote(k) +
                                                    (utilx.isString(gap) && !utilx.isEmptyString(gap) ?
                                                     ': ' :
                                                     ':') + v);
                                }
                            });
                        }

                        if (utilx.isZero(partial.length)) {
                            member = '{}';
                        } else if (utilx.isString(gap) && !utilx.isEmptyString(gap)) {
                            member = '{\n' + gap + utilx.arrayJoin(partial, ',\n' + gap) + '\n' + mind + '}';
                        } else {
                            member = '{' + utilx.arrayJoin(partial) + '}';
                        }

                        gap = mind;

                        return member;
                    }

                    return utilx.privateUndefined;
                };

                tempSafariNFE = function nfeJSONStringify(value, replacer, space) {
                    gap = '';
                    if (utilx.isNumber(space)) {
                        indent = utilx.stringRepeat(' ', space);
                    } else if (utilx.isString(space)) {
                        indent = space;
                    } else {
                        indent = '';
                    }

                    rep = replacer;
                    if (!utilx.isUndefinedOrNull(replacer) && !utilx.isFunction(replacer) &&
                            !utilx.arrayIsArray(replacer)) {

                        throw new Error('JSON.stringify');
                    }

                    return str('', {
                        '': value
                    });
                };
            }

            nfeJSONStringify = null;

            return tempSafariNFE;
        }());

        /**
         * Parse a string as JSON, optionally transform the produced value and its properties, and return the value.
         * @memberOf utilx
         * @function
         * @param {string} text
         * @param {function|array} reviver
         * @return {object}
         */
        utilx.jsonParse = (function () {
            // Unused variable for JScript NFE bug
            // http://kangax.github.io/nfe
            var supported = false,
                parsedValue,
                throwsSyntaxError,
                rx1,
                rx2,
                rx3,
                rx4,
                cxStr,
                cx,
                nfeJSONParse;

            // Determines whether the (possibly native) `JSON.stringify` and `parse`
            // implementations are spec-compliant. Based on work by Ken Snyder.
            if (typeof JSON === 'object' && !utilx.isNull(JSON)) {
                if (utilx.isFunction(JSON.parse)) {
                    try {
                        // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
                        // Conforming implementations should also coerce the initial argument to
                        // a string prior to parsing.
                        if (utilx.isZero(JSON.parse('0')) && utilx.isFalse(JSON.parse(false))) {
                            // Simple parsing test.
                            parsedValue = JSON.parse('{\"A\":[1,true,false,null,\"\\u0000\\b\\n\\f\\r\\t\"]}');
                            supported = utilx.strictEqual(parsedValue.A.length, 5);
                            supported = supported && utilx.strictEqual(parsedValue.A[0], 1);
                            if (supported) {
                                try {
                                    // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
                                    supported = utilx.isString(JSON.parse('"\t"'));
                                } catch (ignore) {}

                                if (supported) {
                                    try {
                                        // FF 4.0 and 4.0.1 allow leading `+` signs, and leading and
                                        // trailing decimal points. FF 4.0, 4.0.1, and IE 9-10 also
                                        // allow certain octal literals.
                                        supported = utilx.notStrictEqual(JSON.parse('01'), 1);
                                    } catch (ignore) {}
                                }
                            }
                        }
                    } catch (e) {
                        supported = false;
                    }
                }
            }

            if (utilx.isTrue(supported)) {
                try {
                    JSON.parse();
                } catch (e) {
                    throwsSyntaxError = utilx.objectInstanceOf(e, SyntaxError);
                }

                if (throwsSyntaxError) {
                    tempSafariNFE = JSON.parse;
                } else {
                    tempSafariNFE = function nfeJSONParse(text, reviver) {
                        if (utilx.isUndefined(text)) {
                            throw new SyntaxError('JSON.parse');
                        }

                        return JSON.parse(text, reviver);
                    };
                }
            } else {
                rx1 = new RegExp('^[\\],:{}\\s]*$');
                rx2 = new RegExp('\\\\(?:["\\\\\\/bfnrt]|u[0-9a-fA-F]{4})', 'g');
                rx3 = new RegExp('"[^"\\\\\\n\\r]*"|true|false|null|-?\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d+)?', 'g');
                rx4 = new RegExp('(?:^|:|,)(?:\\s*\\[)+', 'g');
                cxStr = '[\\u0000\\u00ad\\u0600-\\u0604\\u070f\\u17b4\\u17b5\\u200c-\\u200f';
                cxStr += '\\u2028-\\u202f\\u2060-\\u206f\\ufeff\\ufff0-\\uffff]';
                cx = new RegExp(cxStr, 'g');
                tempSafariNFE = function nfeJSONParse(text, reviver) {
                    var j;

                    function walk(holder, key) {
                        var value = holder[key];

                        if (utilx.isTypeObject(value)) {
                            utilx.arrayForEach(utilx.objectKeys(value), function (k) {
                                var v = walk(value, k);

                                if (!utilx.isUndefined(v)) {
                                    value[k] = v;
                                } else {
                                    delete value[k];
                                }
                            });
                        }

                        return reviver.call(holder, key, value);
                    }

                    text = utilx.anyToString(text);
                    cx.lastIndex = 0;
                    if (cx.test(text)) {
                        text = text.replace(cx, function (a) {
                            return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                        });
                    }

                    if (rx1.test(text.replace(rx2, '@').replace(rx3, ']').replace(rx4, ''))) {
                        /*jslint evil: true */
                        j = eval('(' + text + ')');
                        /*jslint evil: false */

                        if (utilx.isFunction(reviver)) {
                            return walk({
                                '': j
                            }, '');
                        }

                        return j;
                    }

                    throw new SyntaxError('JSON.parse');
                };
            }

            nfeJSONParse = null;

            return tempSafariNFE;
        }());

        /**
         * Truncates a long string to the length specified by n; used by AssertionError.toString
         * @memberOf utilx
         * @function
         * @param {string} s
         * @param {number|string} n
         * @return {string}
         */
        utilx.stringTruncate = function (s, n) {
            if (!utilx.isString(s)) {
                s = utilx.anyToString(s);
            }

            n = utilx.toNumber(n);
            if (!utilx.numberIsNaN(n) && utilx.gte(n, 0)) {
                if (utilx.gt(s.length, n)) {
                    s = s.slice(0, n);
                }
            }

            return s;
        };

        /**
         * Inherit the prototype methods from one constructor into another.
         * @memberOf utilx
         * @function
         * @param {function} ctor
         * @param {function} superCtor
         * @return {undefined}
         */
        utilx.inherits = function (ctor, superCtor) {
            throwIfNotAFunction(ctor);
            throwIfNotAFunction(superCtor);
            /*jslint nomen: true */
            ctor.super_ = superCtor;
            /*jslint nomen: false */
            ctor.prototype = utilx.objectCreate(superCtor.prototype);
            utilx.objectDefineProperty(ctor.prototype, 'constructor', {
                value: ctor,
                enumerable: false,
                writable: true,
                configurable: true
            });
        };

        /**
         * Tests to see if the argument is one of the seven standard Error type constructors.
         * @memberOf utilx
         * @function
         * @param {*} inputArg
         * @return {boolean}
         */
        utilx.isErrorTypeConstructor = function (inputArg) {
            var result;

            switch (inputArg) {
            case Error:
                /* falls through */
            case TypeError:
                /* falls through */
            case SyntaxError:
                /* falls through */
            case RangeError:
                /* falls through */
            case EvalError:
                /* falls through */
            case ReferenceError:
                /* falls through */
            case URIError:
                result = true;
                break;
            default:
                result = false;
            }

            return result;
        };

        /**
         * Custom replacer used to help stringify error messages.
         * @private
         * @function
         * @param {string} key Unused
         * @param {*} value
         * @return {string}
         */
        utilx.customErrorReplacer = function (key, value) {
            /*jslint unparam: true */
            /*jshint unused: true */
            var result;

            if (utilx.isString(value)) {
                result = value;
            } else if (utilx.isUndefined(value) || utilx.isFunction(value) || utilx.isRegExp(value) ||
                    (utilx.isNumber(value) && !utilx.numberIsFinite(value))) {

                result = utilx.anyToString(value);
            } else {
                result = value;
            }

            return result;
        };

        /**
         * Pathces IE6 & 7 Error.prototype.toString to make it function as expected in all other browsers.
         * This is an obtrusive fix.
         * @memberOf utilx
         * @namespace
         */
        // I am unable to make this fix for IE6&7 unobtrusive
        utilx.normaliseErrorIEToString = (function () {
            var patched = false,
                previous;

            return utilx.objectDefineProperties({}, {
                /**
                 * Pathces IE6 & 7 Error.prototype.toString to make it function as expected in all other browsers.
                 * This is an obtrusive fix.
                 * @memberOf utilx.normaliseErrorIEToString
                 * @function
                 * @return {boolean}
                 */
                on: {
                    value: function () {
                        var message = 'Should we patch IE6&7?';

                        try {
                            throw new Error(message);
                        } catch (e) {
                            if (utilx.strictEqual(e.message, message) &&
                                    utilx.strictEqual(e.toString(), '[object Error]')) {

                                previous = Error.prototype.toString;
                                utilx.objectDefineProperties(Error.prototype, {
                                    toString: {
                                        value: function () {
                                            return this.name + ': ' + this.message;
                                        },
                                        enumerable: false,
                                        writable: true,
                                        configurable: true
                                    }
                                });

                                patched = true;
                            }
                        }

                        return patched;
                    },
                    enumerable: false,
                    writable: true,
                    configurable: true
                },

                /**
                 * Pathces IE6 & 7 Error.prototype.toString to make it function as expected in all other browsers.
                 * This is an obtrusive fix.
                 * @memberOf utilx.normaliseErrorIEToString
                 * @function
                 * @return {boolean}
                 */
                off: {
                    value: function () {
                        if (utilx.isTrue(patched)) {
                            utilx.objectDefineProperties(Error.prototype, {
                                toString: {
                                    value: previous,
                                    enumerable: false,
                                    writable: true,
                                    configurable: true
                                }
                            });

                            patched = false;
                        }

                        return patched;
                    },
                    enumerable: false,
                    writable: true,
                    configurable: true
                },

                /**
                 * Pathces IE6 & 7 Error.prototype.toString to make it function as expected in all other browsers.
                 * This is an obtrusive fix.
                 * @memberOf utilx.normaliseErrorIEToString
                 * @function
                 * @return {boolean}
                 */
                state: {
                    value: function () {
                        return patched;
                    },
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
        }());

        /**
         * Creates a custom Error. If and invalid ErrorConstructor is provided it will default to Error.
         * If a valid native Error type constructor is provided but not supporte by the browesr the it will
         * also default to Error. (Looking at you IE < 9)
         * @memberOf utilx
         * @function
         * @param {string} name
         * @param {constructor} [ErrorConstructor] Does not work with IE < 9, only Error can be used (defult: Error)
         * @param {number|string} [maxMessageLength] Range 64 to Infinity (128 default)
         * @return {constructor}
         */
        utilx.customError = (function () {
            var isOkToUseOtherErrors,
                CustomSyntaxError;

            /**
             * Creates a custom Error constructor.
             * @private
             * @function
             * @param {string} name
             * @param {constructor} ErrorConstructor Does not work with IE < 9, only Error can be used
             * @param {number|string} [maxMessageLength] Range 64 to Infinity (128 default)
             * @return {constructor}
             */
            function makeCustomError(name, ErrorConstructor, maxMessageLength) {
                if (!utilx.isString(name) || utilx.isEmptyString(name)) {
                    throw new TypeError('"name" was not a valid string');
                }

                if (!utilx.isErrorTypeConstructor(ErrorConstructor)) {
                    throw new TypeError('"ErrorConstructor" was not an Error type');
                }

                maxMessageLength = utilx.toNumber(maxMessageLength);
                if (utilx.numberIsNaN(maxMessageLength) || utilx.lt(maxMessageLength, 64)) {
                    maxMessageLength = 128;
                }

                function CustomError(message, stackStartFunction) {
                    var err;

                    if (!utilx.isString(message)) {
                        message = utilx.stringTruncate(utilx.jsonStringify(message, utilx.customErrorReplacer),
                                                       maxMessageLength);
                    }

                    this.message = message;
                    if (!utilx.isFunction(stackStartFunction)) {
                        stackStartFunction = CustomError;
                    }

                    this.stackStartFunction = stackStartFunction;
                    if (utilx.isFunction(ErrorConstructor.captureStackTrace)) {
                        ErrorConstructor.captureStackTrace(this, this.stackStartFunction);
                    } else {
                        err = ErrorConstructor.call(this);
                        if (utilx.isString(err.stack)) {
                            this.stack = err.stack;
                        } else if (utilx.isString(err.stacktrace)) {
                            this.stack = err.stacktrace;
                        } else if (utilx.isFunction(printStackTrace)) {
                            this.stack = utilx.arrayJoin(printStackTrace(), '\n');
                        }
                    }
                }

                utilx.inherits(CustomError, ErrorConstructor);

                utilx.objectDefineProperties(CustomError.prototype, {
                    name: {
                        value: name,
                        enumerable: false,
                        writable: true,
                        configurable: true
                    },

                    toString: {
                        value: function () {
                            var arr = utilx.stringSplit(this.message, rxSplitNewLine),
                                str = this.name + ': ';

                            if (utilx.gt(arr.length, 1)) {
                                arr = utilx.arrayFilter(arr, function (element) {
                                    var val;

                                    if (!utilx.stringContains(element,
                                                             'opera:config#UserPrefs|Exceptions Have Stacktrace')) {

                                        val = element;
                                    }

                                    return val;
                                });

                                str += utilx.arrayJoin(arr, '\n');
                            } else {
                                str += this.message;
                            }

                            return str;
                        },
                        enumerable: false,
                        writable: true,
                        configurable: true
                    }
                });

                return CustomError;
            }

            try {
                CustomSyntaxError = makeCustomError('CustomSyntaxError', SyntaxError);
                isOkToUseOtherErrors = utilx.objectInstanceOf(new CustomSyntaxError('test'), SyntaxError);
            } catch (e) {
                // IE < 9
                isOkToUseOtherErrors = false;
            }

            return function (name, ErrorConstructor, maxMessageLength) {
                if (!utilx.isString(name)) {
                    throw new TypeError('"name" was not a string');
                }

                if (utilx.isEmptyString(name)) {
                    throw new SyntaxError('"name" was an empty string');
                }

                if (utilx.isUndefined(maxMessageLength) &&
                        (utilx.isNumber(ErrorConstructor) || utilx.isString(ErrorConstructor))) {
                    maxMessageLength = ErrorConstructor;
                    ErrorConstructor = Error;
                }

                if (!isOkToUseOtherErrors || !utilx.isErrorTypeConstructor(ErrorConstructor)) {
                    ErrorConstructor = Error;
                }

                return makeCustomError(name, ErrorConstructor, maxMessageLength);
            };
        }());

        // set the properties of stacktrace to not enumerable
        utilx.arrayForEach(utilx.objectKeys(printStackTrace), function (key) {
            utilx.objectDefineProperty(printStackTrace, key, {
                enumerable: false,
                writable: true,
                configurable: true
            });
        });

        // set the properties of stacktrace.prototype to not enumerable
        utilx.arrayForEach(utilx.objectKeys(printStackTrace.prototype), function (key) {
            utilx.objectDefineProperty(printStackTrace, key, {
                enumerable: false,
                writable: true,
                configurable: true
            });
        });

        /**
         * Framework-agnostic, micro-library for getting stack traces in all web browsers
         * @see {@link https://github.com/stacktracejs/stacktrace.js stacktrace.js} for further information.
         * @memberOf utilx
         * @function
         */
        utilx.printStackTrace = printStackTrace;

        // set the properties of utilx to not enumerable
        utilx.arrayForEach(utilx.objectKeys(utilx), function (key) {
            utilx.objectDefineProperty(utilx, key, {
                enumerable: false,
                writable: true,
                configurable: true
            });
        });

        // set the properties of the constants
        utilx.objectDefineProperties(utilx, {
            privateUndefined: {
                enumerable: false,
                writable: false,
                configurable: false
            },

            WORD8: {
                enumerable: false,
                writable: false,
                configurable: false
            },

            UWORD8: {
                enumerable: false,
                writable: false,
                configurable: false
            },

            WORD16: {
                enumerable: false,
                writable: false,
                configurable: false
            },

            UWORD16: {
                enumerable: false,
                writable: false,
                configurable: false
            },

            WORD32: {
                enumerable: false,
                writable: false,
                configurable: false
            },

            UWORD32: {
                enumerable: false,
                writable: false,
                configurable: false
            },

            MAX_UINT32: {
                enumerable: false,
                writable: false,
                configurable: false
            },

            MAX_INT32: {
                enumerable: false,
                writable: false,
                configurable: false
            },

            MIN_INT32: {
                enumerable: false,
                writable: false,
                configurable: false
            },

            MAX_UINT16: {
                enumerable: false,
                writable: false,
                configurable: false
            },

            MAX_INT16: {
                enumerable: false,
                writable: false,
                configurable: false
            },

            MIN_INT16: {
                enumerable: false,
                writable: false,
                configurable: false
            },

            MAX_UINT8: {
                enumerable: false,
                writable: false,
                configurable: false
            },

            MAX_INT8: {
                enumerable: false,
                writable: false,
                configurable: false
            },

            MIN_INT8: {
                enumerable: false,
                writable: false,
                configurable: false
            },

            MAX_INTEGER: {
                enumerable: false,
                writable: false,
                configurable: false
            },

            MIN_INTEGER: {
                enumerable: false,
                writable: false,
                configurable: false
            },

            POSITIVE_INFINITY: {
                enumerable: false,
                writable: false,
                configurable: false
            },

            NEGATIVE_INFINITY: {
                enumerable: false,
                writable: false,
                configurable: false
            },

            MAX_VALUE: {
                enumerable: false,
                writable: false,
                configurable: false
            },

            MIN_VALUE: {
                enumerable: false,
                writable: false,
                configurable: false
            },

            NAN: {
                enumerable: false,
                writable: false,
                configurable: false
            },

            EPSILON: {
                enumerable: false,
                writable: false,
                configurable: false
            }
        });

        tempSafariNFE = null;

        return utilx;
    }

    /*
     *
     * UMD
     *
     */

    if (typeof globalThis !== 'object' || null === globalThis) {
        throw new TypeError('Invalid global context');
    }

    var publicUtil;

    /*global require, module, define */
    if (typeof module === 'object' && null !== module &&
            typeof module.exports === 'object' && null !== module.exports) {

        publicUtil = factory(require('stacktrace-js'));
        publicUtil.objectDefineProperty(publicUtil, 'factory', {
            value: function () {
                var pu = factory(require('stacktrace-js'));

                publicUtil.objectDefineProperty(pu, 'factory', {
                    value: publicUtil.factory,
                    enumerable: false,
                    writable: true,
                    configurable: true
                });

                return pu;
            },
            enumerable: false,
            writable: true,
            configurable: true
        });

        publicUtil.objectDefineProperty(module, 'exports', {
            value: publicUtil,
            enumerable: false,
            writable: true,
            configurable: true
        });
    } else if (typeof define === 'function' && typeof define.amd === 'object' && null !== define.amd) {
        require.config({
            paths: {
                'stacktrace': '//raw.github.com/stacktracejs/stacktrace.js/master/stacktrace'
            }
        });

        define(['stacktrace'], function (stackstrace) {
            publicUtil = factory(stackstrace);
            publicUtil.objectDefineProperty(publicUtil, 'factory', {
                value: function () {
                    var pu = factory(stackstrace);

                    publicUtil.objectDefineProperty(pu, 'factory', {
                        value: publicUtil.factory,
                        enumerable: false,
                        writable: true,
                        configurable: true
                    });

                    return pu;
                },
                enumerable: false,
                writable: true,
                configurable: true
            });

            return publicUtil;
        });
    } else {
        publicUtil = factory(globalThis.printStackTrace);
        publicUtil.objectDefineProperty(publicUtil, 'factory', {
            value: function () {
                var pu = factory(globalThis.printStackTrace);

                publicUtil.objectDefineProperty(pu, 'factory', {
                    value: publicUtil.factory,
                    enumerable: false,
                    writable: true,
                    configurable: true
                });

                return pu;
            },
            enumerable: false,
            writable: true,
            configurable: true
        });

        publicUtil.objectDefineProperty(globalThis, 'utilx', {
            value: publicUtil,
            enumerable: false,
            writable: true,
            configurable: true
        });
    }
}(this));
