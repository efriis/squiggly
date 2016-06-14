# squiggly
Simple dynamic string templates for JavaScript (written in TypeScript)

```js
const Squiggly = require('squiggly-template');

let template = new Squiggly("This is a {adjective} module. It will be {adverb} useful!");
console.log(template.get({adjective:"cool",adverb:"super"}));
```

## Installation

```bash
$ npm install squiggly-template --save
```
