

/**
 * Determines if obj is a boolean
 *
 * @param {Anything} obj the thing to test if it is a boolean
 *
 * @returns {Boolean} true if it is a boolean false otherwise
 */
exports.isBoolean = function(obj) {
    return typeof obj == "boolean";
};

/**
 * Determines if obj is undefined
 *
 * @param {Anything} obj the thing to test if it is undefined
 * @returns {Boolean} true if it is undefined false otherwise
 */
exports.isUndefined = function(obj) {
    return obj !== null && obj === undefined;
};

/**
 * Determines if obj is null
 *
 * @param {Anything} obj the thing to test if it is null
 *
 * @returns {Boolean} true if it is null false otherwise
 */
exports.isNull = function(obj) {
    return obj !== undefined && obj == null;
};

/**
 * Determines if obj is an instance of a particular class
 *
 * @param {Anything} obj the thing to test if it and instnace of a class
 * @param {Object} Clazz used to determine if the object is an instance of
 *
 * @returns {Boolean} true if it is an instance of the clazz false otherwise
 */
exports.isInstanceOf = function(obj, clazz) {
    if (typeof clazz == "function") {
        return obj instanceof clazz;
    }else{
        false;
    }
};