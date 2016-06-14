"use strict";
module.exports = (function () {
    function Squiggly(template) {
        var curr = "";
        var prev = "";
        for (var i = 0; i < template.length; i++) {
            var c = template.charAt(i);
            if (c === "{" && prev !== "\\") {
                if (this.template.length !== this.inserts.length)
                    throw new RangeError("Squiggly brackets overlap");
                this.template.push(curr);
                curr = "";
            }
            else if (c === "}" && prev !== "\\") {
                if (this.template.length - this.inserts.length !== 1)
                    throw new RangeError("Squiggly brackets overlap");
                this.inserts.push(curr);
                curr = "";
            }
            else {
                curr += c;
            }
            prev = c;
        }
        if (this.template.length !== this.inserts.length)
            throw new RangeError("Number of opening and closing squiggly brackets do not match");
        this.template.push(curr);
    }
    Squiggly.prototype.get = function (content, strict) {
        if (strict === void 0) { strict = false; }
        if (strict) {
            this.inserts.forEach(function (s) {
                if (typeof content[s] !== "string") {
                    throw new ReferenceError("Property " + s + " of content is not a string (strict was set to true)");
                }
            });
        }
        var rtn = "";
        var i;
        for (i = 0; i < this.inserts.length; i++) {
            rtn += this.template[i];
            rtn += content[this.inserts[i]];
        }
        rtn += this.template[i];
        return rtn;
    };
    return Squiggly;
}());
