export function binaryToHex(str: string) {
  if (typeof str !== 'string') {
    str = String(str);
  }

  return Buffer.from(str, 'binary').toString('hex');
}

export function hexToBinary(str: string) {
  if (typeof str !== 'string') {
    str = String(str);
  }
  return Buffer.from(str, 'hex').toString('binary');
}
