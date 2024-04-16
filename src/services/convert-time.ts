export const convertTime = (time: number): string => {
  if (time < 0) return '0h 0m';
  const hour = Math.floor(time / 60);
  const minutes = time % 60;
  return `${hour}h` + ' ' + `${minutes}m`;
};

export const convertTimePlayer = (seconds: number | undefined) => {
  if (seconds) {
    let hour: number | string = Math.abs(Math.trunc(seconds / 3600));
    let minutes: number | string = Math.abs(Math.trunc((seconds / 60) % 60));
    let sec: number | string = Math.abs(Math.trunc(seconds % 60));

    minutes = minutes < 10 ? '0' + minutes : minutes;
    sec = sec < 10 ? '0' + sec : sec;
    hour = hour < 10 ? '0' + hour : hour;

    if (Number(hour) > 0) {
      return seconds >= 0
        ? hour + ':' + minutes + ':' + sec
        : '-' + hour + ':' + minutes + ':' + sec;
    }
    return seconds >= 0 ? minutes + ':' + sec : '-' + minutes + ':' + sec;
  }
  return '00:00';
};
