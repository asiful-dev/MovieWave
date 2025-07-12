const getCountdown = (releaseDate) => {
  const now = new Date();
  const target = new Date(releaseDate);
  const diff = Math.max(target - now, 0);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  return `${days} day${days !== 1 ? "s" : ""} left`;
};

export default getCountdown;