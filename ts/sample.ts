declare function require(name:string);

const Squiggly = require('./squiggly');

let template = new Squiggly("This is a {adjective} module. It will be {adverb} useful!");
console.log(template.get({adjective:"cool",adverb:"super"}));
