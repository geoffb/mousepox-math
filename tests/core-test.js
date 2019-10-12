const tape = require("tape");
const { wrapRadians } = require("../dist");

tape("wrapRadians", (t) => {
  t.equal(wrapRadians(20.420352248333657), 1.5707963267948983);
  t.equal(wrapRadians(-20.420352248333657), 4.712388980384688);
  t.end();
});
