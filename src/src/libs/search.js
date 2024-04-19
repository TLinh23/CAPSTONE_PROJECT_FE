export function search(searchInput, list = []) {
  if (!searchInput) {
    return list;
  }
  return list.filter((item) =>
    item?.name.toLowerCase().includes(searchInput.toLowerCase())
  );
}
