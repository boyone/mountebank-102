const buf = Buffer.from([0, 0, 1, 5, 2, 4]);

console.log(buf);
console.log(buf.readInt32BE(0));
console.log(buf);