export function isEmpty(value: string): boolean {
  return typeof value === "undefined" || value === null || value.length === 0;
}

export function isValidAddress(
  address: string,
  characterlimit: number
): boolean {
  return address.length < characterlimit;
}
