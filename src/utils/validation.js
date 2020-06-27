export function isEmpty(value) {
  return typeof value === "undefined" || value === null || value.length === 0;
}

export function validateAddress(address, characterlimit) {
  return address.length < characterlimit;
}
