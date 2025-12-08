
export const pretifyMeters = (meter: number)=>{
  if(!meter || meter == 0) return "0.000";
  return (meter / 1000).toFixed(3);
  }
  
  export const pretifySeconds = (millis: number) => {
    if(!millis || millis == 0) return '00:00:00'
    const totalSeconds = Math.round(millis / 1000); // Round once
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${('0' + hours).slice(-2)}:${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`;
};

export const pretifySecondsShort = (millis: number) => {
    if(!millis || millis == 0) return '00:00'
    const totalSeconds = Math.round(millis / 1000); // Round once
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds) / 60);
    const seconds = totalSeconds % 60;

    return `${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`;
};

export const convertKmHToPace = (speedKmH: number) => {
  if(!speedKmH || speedKmH == 0) return "0:00"
  if (speedKmH <= 0) return "∞"; // 
  
  const totalMinutes = 60 / speedKmH;
  const minutes = Math.floor(totalMinutes);
  const seconds = Math.round((totalMinutes - minutes) * 60);

  return `${minutes}:${('0' + seconds).slice(-2)}`;
};