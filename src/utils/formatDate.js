import moment from "moment";
export function formatDefaultDate(date) {
  if (date) {
    const m = moment(date);
    return m.isValid() ? m.format("DD MMM YYYY") : "";
  }
  return "";
}

export const formatCustomDate = (dateString) => {
  const date = new Date(dateString);

  return (
    new Intl.DateTimeFormat("id-ID", {
      timeZone: "Asia/Jakarta",
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date) + " WIB"
  );
};
