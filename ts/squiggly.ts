export = class Squiggly {
  template: string[];
  inserts:string[];
  constructor(template: string,openingCharacter:string="{",closingCharacter:string="}") {
    let curr = "";
    let prev:string = "";
    for(let i = 0; i<template.length; i++) {
      let c = template.charAt(i);

      if(c===openingCharacter && prev!=="\\") {
        if(this.template.length !== this.inserts.length) throw new RangeError("Squiggly brackets overlap");
        this.template.push(curr);
        curr = "";
      } else if(c===closingCharacter && prev!=="\\") {
        if(this.template.length - this.inserts.length !== 1) throw new RangeError("Squiggly brackets overlap");
        this.inserts.push(curr);
        curr = "";
      } else {
        curr += c;
      }

      prev = c;
    }
    if(this.template.length !== this.inserts.length) throw new RangeError("Number of opening and closing squiggly brackets do not match");
    this.template.push(curr);
  }
  get(content:Object,strict:boolean=false) {
    if(strict) {
      this.inserts.forEach(s => {
        if(typeof content[s] !== "string") {
          throw new ReferenceError(`Property ${s} of content is not a string (strict was set to true)`);
        }
      })
    }
    let rtn = "";
    let i;
    for(i = 0; i < this.inserts.length; i++) {
      rtn += this.template[i];
      rtn += content[this.inserts[i]];
    }
    rtn += this.template[i];
    return rtn;
  }
}
