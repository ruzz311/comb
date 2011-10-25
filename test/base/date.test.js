var vows = require('vows'),
        assert = require('assert'),
        comb = require("index"),
        define = comb.define,
        hitch = comb.hitch,
        Broadcaster = comb;

var ret = (module.exports = exports = new comb.Promise());
var suite = vows.describe("A date object");

// Create a fake Date object with toString and toLocaleString
// results manually set to simulate tests for multiple browsers
function FakeDate(str, strLocale, timzezoneOffset) {
    this.str = str || '';
    this.strLocale = strLocale || '';
    this.timezoneOffset = timzezoneOffset || 0;
    this.getFullYear = function() {
    };
    this.getMonth = function() {
    };
    this.getDate = function() {
    };
    this.getDay = function() {
    };
    this.getHours = function() {
    };
    this.getMinutes = function() {
    };
    this.getMilliseconds = function() {
    };
    this.getSeconds = function() {
    };
    this.getUTCFullYear = function() {
    };
    this.getUTCMonth = function() {
    };
    this.getUTCDate = function() {
    };
    this.getUTCDay = function() {
    };
    this.getUTCHours = function() {
    };
    this.getUTCMinutes = function() {
    };
    this.getUTCMilliseconds = function() {
    };
    this.getUTCSeconds = function() {
    };
    this.getTimezoneOffset = function() {
        return this.timezoneOffset;
    };
    this.toString = function() {
        return this.str;
    };
    this.toLocaleString = function() {
        return this.strLocale;
    };
}
var dt = new FakeDate();
//Super of other classes
suite.addBatch({
            "when testing if an object is a date" : {
                topic : function() {
                    return comb.isDate;
                },

                "it should test properly" : function(topic) {
                    var undef;
                    assert.isTrue(topic(new Date()));
                    assert.isFalse(topic(undef));
                    assert.isFalse(topic(undefined));
                    assert.isFalse(topic({}));
                    assert.isFalse(topic(new String("")));
                    assert.isFalse(topic(""));
                    assert.isFalse(topic(true));
                    assert.isFalse(topic(false));
                    assert.isFalse(topic(1));


                }
            },

            "when testing of a date is a weekend" : {
                topic : comb.date,

                "is should test properly" : function(topic) {
                    var thursday = new Date(2006, 8, 21);
                    var saturday = new Date(2006, 8, 23);
                    var sunday = new Date(2006, 8, 24);
                    var monday = new Date(2006, 8, 25);
                    assert.isFalse(topic.isWeekend(thursday));
                    assert.isTrue(topic.isWeekend(saturday));
                    assert.isTrue(topic.isWeekend(sunday));
                    assert.isFalse(topic.isWeekend(monday));
                }
            },

            "when formatting a date" : {
                topic : comb.date,

                "EEEE, MMMM dd, yyyy is formatted to Friday, August 11, 2006 " : function(topic) {
                    var date = new Date(2006, 7, 11, 0, 55, 12, 345);
                    assert.equal(topic.format(date, "EEEE, MMMM dd, yyyy"), "Friday, August 11, 2006");
                },

                "EEEE, MMMM dd, yyyy G is formatted to Friday, August 11, 2006 AD " : function(topic) {
                    var date = new Date(2006, 7, 11, 0, 55, 12, 345);
                    assert.equal(topic.format(date, "EEEE, MMMM dd, yyyy G"), "Friday, August 11, 2006 AD");
                },

                "EEEE, MMMM dd, yyyy GGGG is formatted to Friday, August 11, 2006 Anno Domini " : function(topic) {
                    var date = new Date(2006, 7, 11, 0, 55, 12, 345);
                    assert.equal(topic.format(date, "EEEE, MMMM dd, yyyy GGGG"), "Friday, August 11, 2006 Anno Domini");
                },

                "M/dd/yy is formatted to 8/11/06 " : function(topic) {
                    var date = new Date(2006, 7, 11, 0, 55, 12, 345);
                    assert.equal(topic.format(date, "M/dd/yy"), "8/11/06");
                },

                "E is formatted to 6 " : function(topic) {
                    var date = new Date(2006, 7, 11, 0, 55, 12, 345);
                    assert.equal(topic.format(date, "E"), "6");
                },

                "h:m a is formatted to 12:55 AM " : function(topic) {
                    var date = new Date(2006, 7, 11, 0, 55, 12, 345);
                    assert.equal(topic.format(date, "h:m a"), "12:55 AM");
                },

                "H:m:s is formatted to 12:55:12" : function(topic) {
                    var date = new Date(2006, 7, 11, 0, 55, 12, 345);
                    assert.equal(topic.format(date, 'h:m:s'), "12:55:12");
                },

                "h:m:s.SS is formatted to 12:55:12.35 " : function(topic) {
                    var date = new Date(2006, 7, 11, 0, 55, 12, 345);
                    assert.equal(topic.format(date, 'h:m:s.SS'), "12:55:12.35");
                },

                "k:m:s.SS is formatted to 24:55:12.35 " : function(topic) {
                    var date = new Date(2006, 7, 11, 0, 55, 12, 345);
                    assert.equal(topic.format(date, 'k:m:s.SS'), "24:55:12.35");
                },

                "K:m:s.SS is formatted to 0:55:12.35 " : function(topic) {
                    var date = new Date(2006, 7, 11, 0, 55, 12, 345);
                    assert.equal(topic.format(date, 'K:m:s.SS'), "0:55:12.35");
                },

                "H:m:s.SS is formatted to 0:55:12.35 " : function(topic) {
                    var date = new Date(2006, 7, 11, 0, 55, 12, 345);
                    assert.equal(topic.format(date, 'H:m:s.SS'), "0:55:12.35");
                },


                "ddMMyyyy is formatted to 11082006 " : function(topic) {
                    var date = new Date(2006, 7, 11, 0, 55, 12, 345);
                    assert.equal(topic.format(date, "ddMMyyyy"), "11082006");
                },

                "q is formatted to 6 " : function(topic) {
                    var date = new Date(2006, 7, 11, 0, 55, 12, 345);
                    assert.equal(topic.format(date, "q"), "3");
                },

                "w, q formatted to 32, 6 " : function(topic) {
                    var date = new Date(2006, 7, 11, 0, 55, 12, 345);
                    assert.equal(topic.format(date, "w, q"), "32, 3");
                },

                "D w, q is formatted to 223 32, 6 " : function(topic) {
                    var date = new Date(2006, 7, 11, 0, 55, 12, 345);
                    assert.equal(topic.format(date, "D w, q"), "223 32, 3");
                },

                "z is formatted to CDT " : function(topic) {
                    dt.str = 'Sun Sep 17 2006 22:25:51 GMT-0500 (CDT)';
                    dt.strLocale = 'Sun 17 Sep 2006 10:25:51 PM CDT';
                    assert.equal(topic.format(dt, "z"), "CDT");
                },

                "z is formatted to GMT-05:00" : function(topic) {
                    dt.str = 'Sun Sep 17 2006 22:25:51 GMT-0500';
                    dt.strLocale = 'Sun 17 Sep 2006 10:25:51 PM';
                    dt.timezoneOffset = 300;
                    assert.equal(topic.format(dt, "z"), "GMT-05:00");
                },

                "zY is formatted to GMT-05:00" : function(topic) {
                    dt.str = 'Sun Sep 17 2006 22:25:51 GMT-0500';
                    dt.strLocale = 'Sun 17 Sep 2006 10:25:51 PM';
                    dt.timezoneOffset = 300;
                    assert.equal(topic.format(dt, "zY"), "GMT-05:00Y");
                }
            },

            "when formatting a date to UTC" : {
                topic : comb.date,

                "EEEE, MMMM dd, yyyy is formatted to Friday, August 11, 2006 " : function(topic) {
                    var date = new Date(2006, 7, 11, 0, 55, 12, 345);
                    assert.equal(topic.format(date, "EEEE, MMMM dd, yyyy", true), "Friday, August 11, 2006");
                },

                "EEEE, MMMM dd, yyyy G is formatted to Friday, August 11, 2006 AD " : function(topic) {
                    var date = new Date(2006, 7, 11, 0, 55, 12, 345);
                    assert.equal(topic.format(date, "EEEE, MMMM dd, yyyy G", true), "Friday, August 11, 2006 AD");
                },

                "EEEE, MMMM dd, yyyy GGGG is formatted to Friday, August 11, 2006 Anno Domini " : function(topic) {
                    var date = new Date(2006, 7, 11, 0, 55, 12, 345);
                    assert.equal(topic.format(date, "EEEE, MMMM dd, yyyy GGGG", true), "Friday, August 11, 2006 Anno Domini");
                },

                "M/dd/yy is formatted to 8/11/06 " : function(topic) {
                    var date = new Date(2006, 7, 11, 0, 55, 12, 345);
                    assert.equal(topic.format(date, "M/dd/yy", true), "8/11/06");
                },

                "E is formatted to 6 " : function(topic) {
                    var date = new Date(2006, 7, 11, 0, 55, 12, 345);
                    assert.equal(topic.format(date, "E", true), "6");
                },

                "h:m a is formatted to 5:55 AM " : function(topic) {
                    var date = new Date(2006, 7, 11, 0, 55, 12, 345);
                    console.log(date.getTimezoneOffset());
                    assert.equal(topic.format(date, "h:m a", true), "5:55 AM");
                },

                "H:m:s is formatted to 6:55:12" : function(topic) {
                    var date = new Date(2006, 7, 11, 0, 55, 12, 345);
                    assert.equal(topic.format(date, 'h:m:s', true), "5:55:12");
                },

                "h:m:s.SS is formatted to 6:55:12.35 " : function(topic) {
                    var date = new Date(2006, 7, 11, 0, 55, 12, 345);
                    assert.equal(topic.format(date, 'h:m:s.SS', true), "5:55:12.35");
                },

                "k:m:s.SS is formatted to 6:55:12.35 " : function(topic) {
                    var date = new Date(2006, 7, 11, 0, 55, 12, 345);
                    assert.equal(topic.format(date, 'k:m:s.SS', true), "5:55:12.35");
                },

                "K:m:s.SS is formatted to 5:55:12.35 " : function(topic) {
                    var date = new Date(2006, 7, 11, 0, 55, 12, 345);
                    assert.equal(topic.format(date, 'K:m:s.SS', true), "5:55:12.35");
                },

                "H:m:s.SS is formatted to 5:55:12.35 " : function(topic) {
                    var date = new Date(2006, 7, 11, 0, 55, 12, 345);
                    assert.equal(topic.format(date, 'H:m:s.SS', true), "5:55:12.35");
                },


                "ddMMyyyy is formatted to 11082006 " : function(topic) {
                    var date = new Date(2006, 7, 11, 0, 55, 12, 345);
                    assert.equal(topic.format(date, "ddMMyyyy", true), "11082006");
                },

                "q is formatted to 6 " : function(topic) {
                    var date = new Date(2006, 7, 11, 0, 55, 12, 345);
                    assert.equal(topic.format(date, "q", true), "3");
                },

                "w, q formatted to 32, 6 " : function(topic) {
                    var date = new Date(2006, 7, 11, 0, 55, 12, 345);
                    assert.equal(topic.format(date, "w, q", true), "32, 3");
                },

                "D w, q is formatted to 223 32, 6 " : function(topic) {
                    var date = new Date(2006, 7, 11, 0, 55, 12, 345);
                    assert.equal(topic.format(date, "D w, q", true), "223 32, 3");
                },

                "z is formatted to CDT " : function(topic) {
                    dt.str = 'Sun Sep 17 2006 22:25:51 GMT-0500 (CDT)';
                    dt.strLocale = 'Sun 17 Sep 2006 10:25:51 PM CDT';
                    assert.equal(topic.format(dt, "z", true), "CDT");
                },

                "z is formatted to GMT-00:00" : function(topic) {
                    dt.str = 'Sun Sep 17 2006 22:25:51 GMT-0000';
                    dt.strLocale = 'Sun 17 Sep 2006 10:25:51 PM';
                    dt.timezoneOffset = 0;
                    assert.equal(topic.format(dt, "z", true), "GMT-00:00");
                },

                "zY is formatted to GMT-00:00" : function(topic) {
                    dt.str = 'Sun Sep 17 2006 22:25:51 GMT-0000';
                    dt.strLocale = 'Sun 17 Sep 2006 10:25:51 PM';
                    dt.timezoneOffset = 0;
                    assert.equal(topic.format(dt, "zY", true), "GMT-00:00Y");
                }
            },

            "when parsing a date" : {
                topic : comb.date,

                "is should not parse ''" : function(topic) {
                    assert.isNull(topic.parse("", "MM/dd/yy"));
                },

                "is should parse 08/11/06" : function(topic) {
                    var aug_11_2006 = new Date(2006, 7, 11, 0);
                    assert.deepEqual(topic.parse("08/11/06", "MM/dd/yy"), aug_11_2006);
                },

                "is should not parse 13/11/06" : function(topic) {
                    assert.isNull(topic.parse("13/11/06", "MM/dd/yy"));
                },

                "is should not parse 02/31/06" : function(topic) {
                    assert.isNull(topic.parse("02/31/06", "M/dd/yy"));
                },


                "is should parse 8/11/06" : function(topic) {
                    var aug_11_2006 = new Date(2006, 7, 11, 0);
                    assert.deepEqual(topic.parse("8/11/06", "M/dd/yy"), aug_11_2006);
                },

                "is should parse 8/11/2006" : function(topic) {
                    var aug_11_2006 = new Date(2006, 7, 11, 0);
                    assert.deepEqual(topic.parse("8/11/2006", "M/dd/yyyy"), aug_11_2006);
                },

                "is should parse 11Aug2006" : function(topic) {
                    var aug_11_2006 = new Date(2006, 7, 11, 0);
                    assert.deepEqual(topic.parse("11Aug2006", 'ddMMMyyyy'), aug_11_2006);
                },

                "is should not parse 11Ag2006" : function(topic) {
                    assert.isNull(topic.parse("11Ag2006", 'ddMMMyyyy'));
                },

                "is should parse Aug2006" : function(topic) {
                    var aug_11_2006 = new Date(2006, 7, 11, 0);
                    assert.deepEqual(topic.parse("Aug2006", 'MMMyyyy'), new Date(2006, 7, 1));
                },

                "is should parse Aug 11, 2006" : function(topic) {
                    var aug_11_2006 = new Date(2006, 7, 11, 0);
                    assert.deepEqual(topic.parse("Aug 11, 2006", "MMM dd, yyyy"), aug_11_2006);
                },

                "is should parse August 11, 06" : function(topic) {
                    var aug_11_2006 = new Date(2006, 7, 11, 0);
                    assert.deepEqual(topic.parse("August 11, 2006", "MMMM dd, yyyy"), aug_11_2006);
                },

                "is should parse Friday, August 11, 06" : function(topic) {
                    var aug_11_2006 = new Date(2006, 7, 11, 0);
                    assert.deepEqual(topic.parse("Friday, August 11, 2006", "EEEE, MMMM dd, yyyy"), aug_11_2006);
                },

                "it should parse format date : 6, August 11, 2006 with format : E, MMMM dd, yyyy" : function(topic) {
                    var aug_11_2006 = new Date(2006, 7, 11, 0);
                    assert.deepEqual(topic.parse("6, August 11, 2006", "E, MMMM dd, yyyy"), aug_11_2006);
                },


                "it should parse format date : Friday, August 11, 2006 AD with format : EEEE, MMMM dd, yyyy G" : function(topic) {
                    var date = new Date(2006, 7, 11, 0);
                    assert.deepEqual(topic.parse("Friday, August 11, 2006 AD", "EEEE, MMMM dd, yyyy G"), date);
                },

                "it should parse format date : Friday, August 11, 2006 Anno Domini with format : EEEE, MMMM dd, yyyy GGGG" : function(topic) {
                    var date = new Date(2006, 7, 11, 0);
                    assert.deepEqual(topic.parse("Friday, August 11, 2006 Anno Domini", "EEEE, MMMM dd, yyyy GGGG"), date);
                },

                "it should parse format date : Fri, August 11, 2006 Anno Domini with format : EEE, MMMM dd, yyyy GGGG" : function(topic) {
                    var date = new Date(2006, 7, 11, 0);
                    assert.deepEqual(topic.parse("Fri, August 11, 2006 Anno Domini", "EEE, MMMM dd, yyyy GGGG"), date);
                },

                "it should not parse format date : Fr, August 11, 2006 Anno Domini with format : EEE, MMMM dd, yyyy GGGG" : function(topic) {
                    var date = new Date(2006, 7, 11, 0);
                    assert.isNull(topic.parse("Fr, August 11, 2006 Anno Domini", "EEE, MMMM dd, yyyy GGGG"));
                },


                "it should parse format date : 12:55 AM with format : h:m: a" : function(topic) {
                    var date = new Date(1970, 0, 1, 0, 55);
                    assert.deepEqual(topic.parse("12:55 AM", "h:m a"), date);
                },

                "it should parse format date : 12:55 PM with format : h:m: a" : function(topic) {
                    var date = new Date(1970, 0, 1, 13, 55);
                    assert.deepEqual(topic.parse("1:55 PM", "h:m a"), date);
                },

                "it should not parse format date : 13:55 AM with format : h:m: a" : function(topic) {
                    assert.isNull(topic.parse("13:55 AM", "h:m a"));
                },

                "it should parse format date : 12:55:12 with format : h:m:s" : function(topic) {
                    var date = new Date(1970, 0, 1, 12, 55, 12);
                    assert.deepEqual(topic.parse("12:55:12", 'h:m:s'), date);
                },

                "it should parse format date : 12:55:12.35 with format : h:m:s.SS" : function(topic) {
                    var date = new Date(1970, 0, 1, 12, 55, 12, 35);
                    assert.deepEqual(topic.parse("12:55:12.35", 'h:m:s.SS'), date);
                },

                "it should parse format date : 24:55:12.35 with format : k:m:s.SS" : function(topic) {
                    var date = new Date(1970, 0, 1, 0, 55, 12, 35);
                    assert.deepEqual(topic.parse("24:55:12.35", 'k:m:s.SS'), date);
                },

                "it should parse format date :  0:55:12.35 with format : K:m:s.SS" : function(topic) {
                    var date = new Date(1970, 0, 1, 0, 55, 12, 35);
                    assert.deepEqual(topic.parse("0:55:12.35", 'K:m:s.SS'), date);
                },

                "it should not parse format date :  24:55:12.35 with format : K:m:s.SS" : function(topic) {
                    assert.isNull(topic.parse("24:55:12.35", 'K:m:s.SS'));
                },

                "it should parse format date : 0:55:12.35 with format : H:m:s.SS" : function(topic) {
                    var date = new Date(1970, 0, 1, 0, 55, 12, 35);
                    assert.deepEqual(topic.parse("0:55:12.35", 'H:m:s.SS'), date);
                },

                "it should parse format date : 223 32, 6 with format: D w, q" : function(topic) {
                    var date = new Date(1970, 7, 11);
                    assert.deepEqual(topic.parse("223 32, 3", "D w, q"), date);
                }
            },

            "when getting days in a month " : {

                topic : comb.date,

                "it should detrmine the number of days in january" : function(topic) {
                    assert.equal(topic.getDaysInMonth(new Date(2006, 0, 1)), 31);
                },

                "it should detrmine the number of days in february" : function(topic) {
                    assert.equal(topic.getDaysInMonth(new Date(2006, 1, 1)), 28);
                    assert.equal(topic.getDaysInMonth(new Date(2004, 1, 1)), 29);
                    assert.equal(topic.getDaysInMonth(new Date(2000, 1, 1)), 29);
                    assert.equal(topic.getDaysInMonth(new Date(1900, 1, 1)), 28);
                    assert.equal(topic.getDaysInMonth(new Date(1800, 1, 1)), 28);
                    assert.equal(topic.getDaysInMonth(new Date(1700, 1, 1)), 28);
                    assert.equal(topic.getDaysInMonth(new Date(1600, 1, 1)), 29);
                },

                "it should detrmine the number of days in march" : function(topic) {
                    assert.equal(topic.getDaysInMonth(new Date(2006, 2, 1)), 31);
                },

                "it should detrmine the number of days in april" : function(topic) {
                    assert.equal(topic.getDaysInMonth(new Date(2006, 3, 1)), 30);
                },

                "it should detrmine the number of days in may" : function(topic) {
                    assert.equal(topic.getDaysInMonth(new Date(2006, 4, 1)), 31);
                },

                "it should detrmine the number of days in june" : function(topic) {
                    assert.equal(topic.getDaysInMonth(new Date(2006, 5, 1)), 30);
                },

                "it should detrmine the number of days in july" : function(topic) {
                    assert.equal(topic.getDaysInMonth(new Date(2006, 6, 1)), 31);
                },

                "it should detrmine the number of days in august" : function(topic) {
                    assert.equal(topic.getDaysInMonth(new Date(2006, 7, 1)), 31);
                },

                "it should detrmine the number of days in september" : function(topic) {
                    assert.equal(topic.getDaysInMonth(new Date(2006, 8, 1)), 30);
                },

                "it should detrmine the number of days in october" : function(topic) {
                    assert.equal(topic.getDaysInMonth(new Date(2006, 9, 1)), 31);
                },

                "it should detrmine the number of days in november" : function(topic) {
                    assert.equal(topic.getDaysInMonth(new Date(2006, 10, 1)), 30);
                },

                "it should detrmine the number of days in december" : function(topic) {
                    assert.equal(topic.getDaysInMonth(new Date(2006, 11, 1)), 31);
                }
            },

            "when testing if a year is a leap year" : {
                topic : comb.date,

                "it should be true" : function(topic) {
                    assert.isTrue(topic.isLeapYear(new Date(1600, 0, 1)));
                    assert.isTrue(topic.isLeapYear(new Date(2004, 0, 1)));
                    assert.isTrue(topic.isLeapYear(new Date(2000, 0, 1)));
                },

                "it should be false" : function(topic) {
                    assert.isFalse(topic.isLeapYear(new Date(2006, 0, 1)));
                    assert.isFalse(topic.isLeapYear(new Date(1900, 0, 1)));
                    assert.isFalse(topic.isLeapYear(new Date(1800, 0, 1)));
                    assert.isFalse(topic.isLeapYear(new Date(1700, 0, 1)));
                }
            },

            "when getting a timezone name" : {
                topic : comb.date,

                "if should return CDT" : function(topic) {
                    dt.str = 'Sun Sep 17 2006 22:25:51 GMT-0500 (CDT)';
                    dt.strLocale = 'Sun 17 Sep 2006 10:25:51 PM CDT';
                    assert.equal(topic.getTimezoneName(dt), 'CDT');
                    dt.str = 'Sun Sep 17 2006 22:57:18 GMT-0500 (CDT)';
                    dt.strLocale = 'Sun Sep 17 22:57:18 2006';
                    assert.equal(topic.getTimezoneName(dt), 'CDT');
                }
            },

            "when comparing dates " : {
                topic : comb.date,

                "it should be 0 " : function(topic) {
                    var d1 = new Date();
                    d1.setHours(0);
                    assert.equal(topic.compare(d1, d1), 0);
                },

                "it should be 1" : function(topic) {
                    var d1 = new Date();
                    d1.setHours(0);
                    var d2 = new Date();
                    d2.setFullYear(2005);
                    d2.setHours(12);
                    assert.equal(topic.compare(d1, d2, "date"), 1);
                    assert.equal(topic.compare(d1, d2, "datetime"), 1);
                },

                "it should be -1 " : function(topic) {
                    var d1 = new Date();
                    d1.setHours(0);
                    var d2 = new Date();
                    d2.setFullYear(2005);
                    d2.setHours(12);
                    assert.equal(topic.compare(d2, d1, "date"), -1);
                    assert.equal(topic.compare(d1, d2, "time"), -1);
                }
            },

            "when adding years to a date":{
                topic : comb.date,

                "it should add 1 year":function(topic) {
                    var dtA = new Date(2005, 11, 27);
                    var dtB = new Date(2006, 11, 27);
                    assert.deepEqual(topic.add(dtA, "year", 1), dtB);
                    assert.deepEqual(topic.add(dtA, "years", 1), dtB);
                },

                "it should add -1 years" : function(topic) {
                    var dtA = new Date(2005, 11, 27);
                    var dtB = new Date(2004, 11, 27);
                    assert.deepEqual(topic.add(dtA, "year", -1), dtB);
                    assert.deepEqual(topic.add(dtA, "years", -1), dtB);
                },

                "it should add 5 years" : function(topic) {
                    var dtA = new Date(2000, 1, 29);
                    var dtB = new Date(2005, 1, 28);
                    assert.deepEqual(topic.add(dtA, "year", 5), dtB);
                    assert.deepEqual(topic.add(dtA, "years", 5), dtB);

                },

                "it should add 30 years" : function(topic) {
                    var dtA = new Date(1900, 11, 31);
                    var dtB = new Date(1930, 11, 31);
                    assert.deepEqual(topic.add(dtA, "year", 30), dtB);
                    assert.deepEqual(topic.add(dtA, "years", 30), dtB);
                },

                "it should add 35 years" : function(topic) {
                    var dtA = new Date(1995, 11, 31);
                    var dtB = new Date(2030, 11, 31);
                    assert.deepEqual(topic.add(dtA, "year", 35), dtB);
                    assert.deepEqual(topic.add(dtA, "years", 35), dtB);

                }
            },

            "when adding quarters to a date":{
                topic : comb.date,

                "it should add 1 quarter":function(topic) {
                    var dtA = new Date(2000, 0, 1);
                    var dtB = new Date(2000, 3, 1);
                    assert.deepEqual(topic.add(dtA, "quarter", 1), dtB);
                    assert.deepEqual(topic.add(dtA, "quarters", 1), dtB);
                },

                "it should add 3 quarters" : function(topic) {
                    var dtA = new Date(2000, 1, 29);
                    var dtB = new Date(2000, 7, 29);
                    assert.deepEqual(topic.add(dtA, "quarter", 2), dtB);
                    assert.deepEqual(topic.add(dtA, "quarters", 2), dtB);
                },

                "it should add 4 quarters" : function(topic) {
                    var dtA = new Date(2000, 1, 29);
                    var dtB = new Date(2001, 1, 28);
                    assert.deepEqual(topic.add(dtA, "quarter", 4), dtB);
                    assert.deepEqual(topic.add(dtA, "quarters", 4), dtB);

                }
            } ,

            "when adding months to a date":{
                topic : comb.date,

                "it should add 1 month":function(topic) {
                    var dtA = new Date(2000, 0, 1);
                    var dtB = new Date(2000, 1, 1);
                    assert.deepEqual(topic.add(dtA, "month", 1), dtB);
                    assert.deepEqual(topic.add(dtA, "months", 1), dtB);
                    dtA = new Date(2000, 0, 31);
                    dtB = new Date(2000, 1, 29);
                    assert.deepEqual(topic.add(dtA, "month", 1), dtB);
                    assert.deepEqual(topic.add(dtA, "months", 1), dtB);
                },

                "it should add 4 months" : function(topic) {
                    var dtA = new Date(2000, 1, 29);
                    var dtB = new Date(2001, 1, 28);
                    assert.deepEqual(topic.add(dtA, "month", 12), dtB);
                    assert.deepEqual(topic.add(dtA, "months", 12), dtB);

                }
            },

            "when adding weeks to a date":{
                topic : comb.date,

                "it should add 1 week":function(topic) {
                    var dtA = new Date(2000, 0, 1);
                    var dtB = new Date(2000, 0, 8);
                    assert.deepEqual(topic.add(dtA, "week", 1), dtB);
                    assert.deepEqual(topic.add(dtA, "weeks", 1), dtB);
                }
            },


            "when adding days to a date":{
                topic : comb.date,

                "it should add days":function(topic) {
                    var interv = "day";
                    var dtA = new Date(2000, 0, 1);
                    var dtB = new Date(2000, 0, 2);
                    assert.deepEqual(dtB, topic.add(dtA, interv, 1));

                    dtA = new Date(2001, 0, 1);
                    dtB = new Date(2002, 0, 1);
                    assert.deepEqual(dtB, topic.add(dtA, interv, 365));

                    dtA = new Date(2000, 0, 1);
                    dtB = new Date(2001, 0, 1);
                    assert.deepEqual(dtB, topic.add(dtA, interv, 366));

                    dtA = new Date(2000, 1, 28);
                    dtB = new Date(2000, 1, 29);
                    assert.deepEqual(dtB, topic.add(dtA, interv, 1));

                    dtA = new Date(2001, 1, 28);
                    dtB = new Date(2001, 2, 1);
                    assert.deepEqual(dtB, topic.add(dtA, interv, 1));

                    dtA = new Date(2000, 2, 1);
                    dtB = new Date(2000, 1, 29);
                    assert.deepEqual(dtB, topic.add(dtA, interv, -1));

                    dtA = new Date(2001, 2, 1);
                    dtB = new Date(2001, 1, 28);
                    assert.deepEqual(dtB, topic.add(dtA, interv, -1));

                    dtA = new Date(2000, 0, 1);
                    dtB = new Date(1999, 11, 31);
                    assert.deepEqual(dtB, topic.add(dtA, interv, -1));
                }
            },

            "when adding weekdays to a date":{
                topic : comb.date,

                "it should add weekdays":function(topic) {
                    var interv = "weekday";
                    // Sat, Jan 1
                    var dtA = new Date(2000, 0, 1);
                    // Should be Mon, Jan 3
                    var dtB = new Date(2000, 0, 3);
                    assert.deepEqual(dtB, topic.add(dtA, interv, 1));

                    // Sun, Jan 2
                    dtA = new Date(2000, 0, 2);
                    // Should be Mon, Jan 3
                    dtB = new Date(2000, 0, 3);
                    assert.deepEqual(dtB, topic.add(dtA, interv, 1));

                    // Sun, Jan 2
                    dtA = new Date(2000, 0, 2);
                    // Should be Fri, Jan 7
                    dtB = new Date(2000, 0, 7);
                    assert.deepEqual(dtB, topic.add(dtA, interv, 5));

                    // Sun, Jan 2
                    dtA = new Date(2000, 0, 2);
                    // Should be Mon, Jan 10
                    dtB = new Date(2000, 0, 10);
                    assert.deepEqual(dtB, topic.add(dtA, interv, 6));

                    // Mon, Jan 3
                    dtA = new Date(2000, 0, 3);
                    // Should be Mon, Jan 17
                    dtB = new Date(2000, 0, 17);
                    assert.deepEqual(dtB, topic.add(dtA, interv, 10));

                    // Sat, Jan 8
                    dtA = new Date(2000, 0, 8);
                    // Should be Mon, Jan 3
                    dtB = new Date(2000, 0, 3);
                    assert.deepEqual(dtB, topic.add(dtA, interv, -5));

                    // Sun, Jan 9
                    dtA = new Date(2000, 0, 9);
                    // Should be Wed, Jan 5
                    dtB = new Date(2000, 0, 5);
                    assert.deepEqual(dtB, topic.add(dtA, interv, -3));

                    // Sun, Jan 23
                    dtA = new Date(2000, 0, 23);
                    // Should be Fri, Jan 7
                    dtB = new Date(2000, 0, 7);
                    assert.deepEqual(dtB, topic.add(dtA, interv, -11));
                }
            },

            "when adding hours to a date":{
                topic : comb.date,

                "it should add hours":function(topic) {
                    var interv = "hour";
                    var dtA = new Date(2000, 0, 1, 11);
                    var dtB = new Date(2000, 0, 1, 12);
                    assert.deepEqual(dtB, topic.add(dtA, interv, 1));

                    dtA = new Date(2001, 9, 28, 0);
                    dtB = new Date(dtA.getTime() + (60 * 60 * 1000));
                    assert.deepEqual(dtB, topic.add(dtA, interv, 1));

                    dtA = new Date(2001, 9, 28, 23);
                    dtB = new Date(2001, 9, 29, 0);
                    assert.deepEqual(dtB, topic.add(dtA, interv, 1));

                    dtA = new Date(2001, 11, 31, 23);
                    dtB = new Date(2002, 0, 1, 0);
                    assert.deepEqual(dtB, topic.add(dtA, interv, 1));

                }
            },

            "when adding minutes to a date":{
                topic : comb.date,

                "it should add minutes":function(topic) {
                    var interv = "minute";
                    var dtA = new Date(2000, 11, 31, 23, 59);
                    var dtB = new Date(2001, 0, 1, 0, 0);
                    assert.deepEqual(dtB, topic.add(dtA, interv, 1));

                    dtA = new Date(2000, 11, 27, 12, 2);
                    dtB = new Date(2000, 11, 27, 13, 2);
                    assert.deepEqual(dtB, topic.add(dtA, interv, 60));

                }
            },

            "when adding seconds to a date":{
                topic : comb.date,

                "it should add seconds":function(topic) {
                    var interv = "second";
                    var dtA = new Date(2000, 11, 31, 23, 59, 59);
                    var dtB = new Date(2001, 0, 1, 0, 0, 0);
                    assert.deepEqual(dtB, topic.add(dtA, interv, 1));

                    dtA = new Date(2000, 11, 27, 8, 10, 59);
                    dtB = new Date(2000, 11, 27, 8, 11, 59);
                    assert.deepEqual(dtB, topic.add(dtA, interv, 60));

                }
            },

            "when adding milliseconds to a date":{
                topic : comb.date,

                "it should add milliseconds":function(topic) {
                    var interv = "millisecond";

                    var dtA = new Date(2000, 11, 31, 23, 59, 59, 999);
                    var dtB = new Date(2001, 0, 1, 0, 0, 0, 0);
                    assert.deepEqual(dtB, topic.add(dtA, interv, 1));

                    dtA = new Date(2000, 11, 27, 8, 10, 53, 2);
                    dtB = new Date(2000, 11, 27, 8, 10, 54, 2);
                    assert.deepEqual(dtB, topic.add(dtA, interv, 1000));

                }
            },

            "when finding the difference":{
                topic : comb.date,

                "it should find the difference":function(topic) {
                    var dtA = null; // First date to compare
                    var dtB = null; // Second date to compare
                    var interv = ''; // Interval to compare on (e.g., year, month)

                    interv = "year";
                    dtA = new Date(2005, 11, 27);
                    dtB = new Date(2006, 11, 27);
                    assert.deepEqual(1, topic.difference(dtA, dtB, interv));

                    dtA = new Date(2000, 11, 31);
                    dtB = new Date(2001, 0, 1);
                    assert.deepEqual(1, topic.difference(dtA, dtB, interv));

                    interv = "quarter";
                    dtA = new Date(2000, 1, 29);
                    dtB = new Date(2001, 2, 1);
                    assert.deepEqual(4, topic.difference(dtA, dtB, interv));

                    dtA = new Date(2000, 11, 1);
                    dtB = new Date(2001, 0, 1);
                    assert.deepEqual(1, topic.difference(dtA, dtB, interv));

                    interv = "month";
                    dtA = new Date(2000, 1, 29);
                    dtB = new Date(2001, 2, 1);
                    assert.deepEqual(13, topic.difference(dtA, dtB, interv));

                    dtA = new Date(2000, 11, 1);
                    dtB = new Date(2001, 0, 1);
                    assert.deepEqual(1, topic.difference(dtA, dtB, interv));

                    interv = "week";
                    dtA = new Date(2000, 1, 1);
                    dtB = new Date(2000, 1, 8);
                    assert.deepEqual(1, topic.difference(dtA, dtB, interv));

                    dtA = new Date(2000, 1, 28);
                    dtB = new Date(2000, 2, 6);
                    assert.deepEqual(1, topic.difference(dtA, dtB, interv));

                    dtA = new Date(2000, 2, 6);
                    dtB = new Date(2000, 1, 28);
                    assert.deepEqual(-1, topic.difference(dtA, dtB, interv));

                    interv = "day";
                    dtA = new Date(2000, 1, 29);
                    dtB = new Date(2000, 2, 1);
                    assert.deepEqual(1, topic.difference(dtA, dtB, interv));

                    dtA = new Date(2000, 11, 31);
                    dtB = new Date(2001, 0, 1);
                    assert.deepEqual(1, topic.difference(dtA, dtB, interv));

                    // DST leap -- check for rounding err
                    // This is dependent on US calendar, but
                    // shouldn't break in other locales
                    dtA = new Date(2005, 3, 3);
                    dtB = new Date(2005, 3, 4);
                    assert.deepEqual(1, topic.difference(dtA, dtB, interv));

                    interv = "weekday";
                    dtA = new Date(2006, 7, 3);
                    dtB = new Date(2006, 7, 11);
                    assert.deepEqual(6, topic.difference(dtA, dtB, interv));

                    // Positive diffs
                    dtA = new Date(2006, 7, 4);
                    dtB = new Date(2006, 7, 11);
                    assert.deepEqual(5, topic.difference(dtA, dtB, interv));

                    dtA = new Date(2006, 7, 5);
                    dtB = new Date(2006, 7, 11);
                    assert.deepEqual(5, topic.difference(dtA, dtB, interv));

                    dtA = new Date(2006, 7, 6);
                    dtB = new Date(2006, 7, 11);
                    assert.deepEqual(5, topic.difference(dtA, dtB, interv));

                    dtA = new Date(2006, 7, 7);
                    dtB = new Date(2006, 7, 11);
                    assert.deepEqual(4, topic.difference(dtA, dtB, interv));

                    dtA = new Date(2006, 7, 7);
                    dtB = new Date(2006, 7, 13);
                    assert.deepEqual(4, topic.difference(dtA, dtB, interv));

                    dtA = new Date(2006, 7, 7);
                    dtB = new Date(2006, 7, 14);
                    assert.deepEqual(5, topic.difference(dtA, dtB, interv));

                    dtA = new Date(2006, 7, 7);
                    dtB = new Date(2006, 7, 15);
                    assert.deepEqual(6, topic.difference(dtA, dtB, interv));

                    dtA = new Date(2006, 7, 7);
                    dtB = new Date(2006, 7, 28);
                    assert.deepEqual(15, topic.difference(dtA, dtB, interv));

                    dtA = new Date(2006, 2, 2);
                    dtB = new Date(2006, 2, 28);
                    assert.deepEqual(18, topic.difference(dtA, dtB, interv));

                    // Negative diffs
                    dtA = new Date(2006, 7, 11);
                    dtB = new Date(2006, 7, 4);
                    assert.deepEqual(-5, topic.difference(dtA, dtB, interv));

                    dtA = new Date(2006, 7, 11);
                    dtB = new Date(2006, 7, 5);
                    assert.deepEqual(-4, topic.difference(dtA, dtB, interv));

                    dtA = new Date(2006, 7, 11);
                    dtB = new Date(2006, 7, 6);
                    assert.deepEqual(-4, topic.difference(dtA, dtB, interv));

                    dtA = new Date(2006, 7, 11);
                    dtB = new Date(2006, 7, 7);
                    assert.deepEqual(-4, topic.difference(dtA, dtB, interv));

                    dtA = new Date(2006, 7, 13);
                    dtB = new Date(2006, 7, 7);
                    assert.deepEqual(-5, topic.difference(dtA, dtB, interv));

                    dtA = new Date(2006, 7, 14);
                    dtB = new Date(2006, 7, 7);
                    assert.deepEqual(-5, topic.difference(dtA, dtB, interv));

                    dtA = new Date(2006, 7, 15);
                    dtB = new Date(2006, 7, 7);
                    assert.deepEqual(-6, topic.difference(dtA, dtB, interv));

                    dtA = new Date(2006, 7, 28);
                    dtB = new Date(2006, 7, 7);
                    assert.deepEqual(-15, topic.difference(dtA, dtB, interv));

                    dtA = new Date(2006, 2, 28);
                    dtB = new Date(2006, 2, 2);
                    assert.deepEqual(-18, topic.difference(dtA, dtB, interv));

                    // Two days on the same weekend -- no weekday diff
                    dtA = new Date(2006, 7, 5);
                    dtB = new Date(2006, 7, 6);
                    assert.deepEqual(0, topic.difference(dtA, dtB, interv));

                    interv = "hour";
                    dtA = new Date(2000, 11, 31, 23);
                    dtB = new Date(2001, 0, 1, 0);
                    assert.deepEqual(1, topic.difference(dtA, dtB, interv));

                    dtA = new Date(2000, 11, 31, 12);
                    dtB = new Date(2001, 0, 1, 0);
                    assert.deepEqual(12, topic.difference(dtA, dtB, interv));

                    interv = "minute";
                    dtA = new Date(2000, 11, 31, 23, 59);
                    dtB = new Date(2001, 0, 1, 0, 0);
                    assert.deepEqual(1, topic.difference(dtA, dtB, interv));

                    dtA = new Date(2000, 1, 28, 23, 59);
                    dtB = new Date(2000, 1, 29, 0, 0);
                    assert.deepEqual(1, topic.difference(dtA, dtB, interv));

                    interv = "second";
                    dtA = new Date(2000, 11, 31, 23, 59, 59);
                    dtB = new Date(2001, 0, 1, 0, 0, 0);
                    assert.deepEqual(1, topic.difference(dtA, dtB, interv));

                    interv = "millisecond";
                    dtA = new Date(2000, 11, 31, 23, 59, 59, 999);
                    dtB = new Date(2001, 0, 1, 0, 0, 0, 0);
                    assert.deepEqual(1, topic.difference(dtA, dtB, interv));

                    dtA = new Date(2000, 11, 31, 23, 59, 59, 0);
                    dtB = new Date(2001, 0, 1, 0, 0, 0, 0);
                    assert.deepEqual(1000, topic.difference(dtA, dtB, interv));
                }
            },

            "when finding the diff/add":{
                topic : comb.date,

                "it should find the diff/add":function(topic) {
                    var dtA = null; // First date to compare
                    var dtB = null; // Second date to compare
                    var interv = ''; // Interval to compare on (e.g., year, month)
                    interv = "year";
                    dtA = new Date(2005, 11, 27);
                    dtB = topic.add(dtA, interv, 1);
                    assert.deepEqual(topic.difference(dtA, dtB, interv), 1);

                    dtA = new Date(2005, 11, 27);
                    dtB = topic.add(dtA, interv, -1);
                    assert.deepEqual(topic.difference(dtA, dtB, interv), -1);

                    dtA = new Date(2000, 1, 29);
                    dtB = topic.add(dtA, interv, 1);
                    assert.deepEqual(topic.difference(dtA, dtB, interv), 1);

                    dtA = new Date(2000, 1, 29);
                    dtB = topic.add(dtA, interv, 5);
                    assert.deepEqual(topic.difference(dtA, dtB, interv), 5);

                    dtA = new Date(1900, 11, 31);
                    dtB = topic.add(dtA, interv, 30);
                    assert.deepEqual(topic.difference(dtA, dtB, interv), 30);

                    dtA = new Date(1995, 11, 31);
                    dtB = topic.add(dtA, interv, 35);
                    assert.deepEqual(topic.difference(dtA, dtB, interv), 35);

                    interv = "quarter";
                    dtA = new Date(2000, 0, 1);
                    dtB = topic.add(dtA, interv, 1);
                    assert.deepEqual(topic.difference(dtA, dtB, interv), 1);

                    dtA = new Date(2000, 1, 29);
                    dtB = topic.add(dtA, interv, 2);
                    assert.deepEqual(topic.difference(dtA, dtB, interv), 2);

                    dtA = new Date(2000, 1, 29);
                    dtB = topic.add(dtA, interv, 4);
                    assert.deepEqual(topic.difference(dtA, dtB, interv), 4);

                    interv = "month";
                    dtA = new Date(2000, 0, 1);
                    dtB = topic.add(dtA, interv, 1);
                    assert.deepEqual(topic.difference(dtA, dtB, interv), 1);

                    dtA = new Date(2000, 0, 31);
                    dtB = topic.add(dtA, interv, 1);
                    assert.deepEqual(topic.difference(dtA, dtB, interv), 1);

                    dtA = new Date(2000, 1, 29);
                    dtB = topic.add(dtA, interv, 12);
                    assert.deepEqual(topic.difference(dtA, dtB, interv), 12);

                    interv = "week";
                    dtA = new Date(2000, 0, 1);
                    dtB = topic.add(dtA, interv, 1);
                    assert.deepEqual(topic.difference(dtA, dtB, interv), 1);

                    interv = "day";
                    dtA = new Date(2000, 0, 1);
                    dtB = topic.add(dtA, interv, 1);
                    assert.deepEqual(topic.difference(dtA, dtB, interv), 1);

                    dtA = new Date(2001, 0, 1);
                    dtB = topic.add(dtA, interv, 365);
                    assert.deepEqual(topic.difference(dtA, dtB, interv), 365);

                    dtA = new Date(2000, 0, 1);
                    dtB = topic.add(dtA, interv, 366);
                    assert.deepEqual(topic.difference(dtA, dtB, interv), 366);

                    dtA = new Date(2000, 1, 28);
                    dtB = topic.add(dtA, interv, 1);
                    assert.deepEqual(topic.difference(dtA, dtB, interv), 1);

                    dtA = new Date(2001, 1, 28);
                    dtB = topic.add(dtA, interv, 1);
                    assert.deepEqual(topic.difference(dtA, dtB, interv), 1);

                    dtA = new Date(2000, 2, 1);
                    dtB = topic.add(dtA, interv, -1);
                    assert.deepEqual(topic.difference(dtA, dtB, interv), -1);

                    dtA = new Date(2001, 2, 1);
                    dtB = topic.add(dtA, interv, -1);
                    assert.deepEqual(topic.difference(dtA, dtB, interv), -1);

                    dtA = new Date(2000, 0, 1);
                    dtB = topic.add(dtA, interv, -1);
                    assert.deepEqual(topic.difference(dtA, dtB, interv), -1);
                    interv = "weekday";
                    // Sat, Jan 1
                    dtA = new Date(2000, 0, 1);
                    // Should be Mon, Jan 3
                    dtB = topic.add(dtA, interv, 1);
                    assert.deepEqual(topic.difference(dtA, dtB, interv), 1);

                    // Sun, Jan 2
                    dtA = new Date(2000, 0, 2);
                    // Should be Mon, Jan 3
                    dtB = topic.add(dtA, interv, 1);
                    assert.deepEqual(topic.difference(dtA, dtB, interv), 1);

                    // Sun, Jan 2
                    dtA = new Date(2000, 0, 2);
                    // Should be Fri, Jan 7
                    dtB = topic.add(dtA, interv, 5);
                    assert.deepEqual(topic.difference(dtA, dtB, interv), 5);

                    // Sun, Jan 2
                    dtA = new Date(2000, 0, 2);
                    // Should be Mon, Jan 10
                    dtB = topic.add(dtA, interv, 6);
                    assert.deepEqual(topic.difference(dtA, dtB, interv), 6);

                    // Mon, Jan 3
                    dtA = new Date(2000, 0, 3);
                    // Should be Mon, Jan 17
                    dtB = topic.add(dtA, interv, 10);
                    assert.deepEqual(topic.difference(dtA, dtB, interv), 10);

                    // Sat, Jan 8
                    dtA = new Date(2000, 0, 8);
                    // Should be Mon, Jan 3
                    dtB = topic.add(dtA, interv, -5);
                    assert.deepEqual(topic.difference(dtA, dtB, interv), -5);

                    // Sun, Jan 9
                    dtA = new Date(2000, 0, 9);
                    // Should be Wed, Jan 5
                    dtB = topic.add(dtA, interv, -3);
                    assert.deepEqual(topic.difference(dtA, dtB, interv), -3);

                    // Sun, Jan 23
                    dtA = new Date(2000, 0, 23);
                    // Should be Fri, Jan 7
                    dtB = topic.add(dtA, interv, -11);
                    assert.deepEqual(topic.difference(dtA, dtB, interv), -11);

                    interv = "hour";
                    dtA = new Date(2000, 0, 1, 11);
                    dtB = topic.add(dtA, interv, 1);
                    assert.deepEqual(topic.difference(dtA, dtB, interv), 1);

                    dtA = new Date(2001, 9, 28, 0);
                    dtB = topic.add(dtA, interv, 1);
                    assert.deepEqual(topic.difference(dtA, dtB, interv), 1);

                    dtA = new Date(2001, 9, 28, 23);
                    dtB = topic.add(dtA, interv, 1);
                    assert.deepEqual(topic.difference(dtA, dtB, interv), 1);

                    dtA = new Date(2001, 11, 31, 23);
                    dtB = topic.add(dtA, interv, 1);
                    assert.deepEqual(topic.difference(dtA, dtB, interv), 1);

                    interv = "minute";
                    dtA = new Date(2000, 11, 31, 23, 59);
                    dtB = topic.add(dtA, interv, 1);
                    assert.deepEqual(topic.difference(dtA, dtB, interv), 1);

                    dtA = new Date(2000, 11, 27, 12, 2);
                    dtB = topic.add(dtA, interv, 60);
                    assert.deepEqual(topic.difference(dtA, dtB, interv), 60);

                    interv = "second";
                    dtA = new Date(2000, 11, 31, 23, 59, 59);
                    dtB = topic.add(dtA, interv, 1);
                    assert.deepEqual(topic.difference(dtA, dtB, interv), 1);

                    dtA = new Date(2000, 11, 27, 8, 10, 59);
                    dtB = topic.add(dtA, interv, 60);
                    assert.deepEqual(topic.difference(dtA, dtB, interv), 60);

                    interv = "millisecond";

                    dtA = new Date(2000, 11, 31, 23, 59, 59, 999);
                    dtB = topic.add(dtA, interv, 1);
                    assert.deepEqual(topic.difference(dtA, dtB, interv), 1);

                    dtA = new Date(2000, 11, 27, 8, 10, 53, 2);
                    dtB = topic.add(dtA, interv, 1000);
                    assert.deepEqual(topic.difference(dtA, dtB, interv), 1000);
                }
            }




        });

suite.run({reporter : vows.reporter.spec}, comb.hitch(ret, "callback"));