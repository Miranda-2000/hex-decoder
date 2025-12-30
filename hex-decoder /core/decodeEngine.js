


export function validateHex(hex) {
  if (!hex) throw "EMPTY";
  if (!/^[0-9A-Fa-f]{4}$/.test(hex)) throw "FORMAT";
}

export function decode(hex, table) {
  validateHex(hex);
  const dec = parseInt(hex, 16);

  const rule = table.find(r => dec >= r.dec_min && dec <= r.dec_max);
  if (!rule) throw "NO_MATCH";

  return { hex, dec, hp: rule.hp };
}


