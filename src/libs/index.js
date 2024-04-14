export function getValueFromKey(key, list) {
  const dayOfWeek = list?.find((day) => day.key === key);
  return dayOfWeek ? dayOfWeek.value : null;
}

export function slideFromEnd(value, length) {
  return value.slice(0, length);
}

export function slideEndItem(value, length) {
  return value.slice(0, -length);
}
