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

let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: "Toan lop 3",
    start: todayStr + "T12:00:00",
    end: todayStr + "T14:00:00",
    description: "Lecture",
  },
  {
    id: createEventId(),
    title: "Toan lop 5",
    start: todayStr + "T16:00:00",
    end: todayStr + "T18:00:00",
    description: "Attendant",
  },
];

export function createEventId() {
  return String(eventGuid++);
}

export function getValueFromId(key, list) {
  const dayOfWeek = list?.find((day) => day.id === key);
  return dayOfWeek ? dayOfWeek.value : null;
}
