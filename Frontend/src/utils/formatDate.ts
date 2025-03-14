const formatDate = (dataString: string) => {
  return new Date(dataString).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};

export default formatDate;
