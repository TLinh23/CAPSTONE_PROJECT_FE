export const getWeeksInYear = (year) => {
  const weeks = [];
  let startDate = new Date(year, 0, 1);
  let endDate = new Date(year, 11, 31);

  while (startDate <= endDate) {
    const weekStartDate = new Date(startDate);
    const weekEndDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() + 6
    );

    const formattedStartDate = `${weekStartDate.getDate()}/${
      weekStartDate.getMonth() + 1
    }`;
    const formattedEndDate = `${weekEndDate.getDate()}/${
      weekEndDate.getMonth() + 1
    }`;

    weeks.push(`${formattedStartDate} To ${formattedEndDate}`);

    startDate.setDate(startDate.getDate() + 7);
  }

  return weeks;
};

export const getYearsRange = () => {
  const currentYear = new Date().getFullYear();
  const years = [];

  for (let i = currentYear - 3; i <= currentYear + 3; i++) {
    years.push(i);
  }

  return years;
};
