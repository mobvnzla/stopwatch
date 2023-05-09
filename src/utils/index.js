function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

export function convertMsToTime(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000) % 60;
  const minutes = Math.floor(milliseconds / 60000) % 60;
  const hours = Math.floor(milliseconds / 3600000);

  return `${padTo2Digits(hours)} : ${padTo2Digits(minutes)} : ${padTo2Digits(seconds)}.${milliseconds
    .toString()
    .slice(-3)}`;
}
