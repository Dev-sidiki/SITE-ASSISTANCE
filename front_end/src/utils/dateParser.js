export const timestampParser = (num) => {
  let options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  // on formate la date a quelque chose de plus presentable
  let date = new Date(num).toLocaleDateString("fr-FR", options);
  // on retourne la date
  return date.toString();
};
