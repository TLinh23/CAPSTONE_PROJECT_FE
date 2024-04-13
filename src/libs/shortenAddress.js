export function shortenValue(address = "", length = 4) {
  return (
    address &&
    (address.length > length ? `${address.substring(0, length)}...` : address)
  );
}
