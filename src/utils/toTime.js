function getNoun(number, one, two, five) {
  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return five;
  }
  n %= 10;
  if (n === 1) {
    return one;
  }
  if (n >= 2 && n <= 4) {
    return two;
  }
  return five;
}

function toTime(totalMinutes) {
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  if (hours > 0) {
    return `${hours} ${getNoun(hours, 'час', 'часа', 'часов')} ${minutes} ${getNoun(minutes, 'минута', 'минуты', 'минут')}`;
  } else return `${minutes} ${getNoun(minutes, 'минута', 'минуты', 'минут')}`;
}

export default toTime
