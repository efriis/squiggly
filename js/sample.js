var Squiggly = require('./squiggly');
var template = new Squiggly("This is a {adjective} module. It will be {adverb} useful!");
console.log(template.get({ adjective: "cool", adverb: "super" }));
