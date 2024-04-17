export function secondsToHMS(seconds) {
  if (seconds > 600) return "10m";
  var minutes = Math.floor((seconds % 3600) / 60);
  var remainingSeconds = seconds % 60;
  return minutes + "m " + remainingSeconds + "s";
}
