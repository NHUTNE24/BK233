function getGMT7Date() {
  const now = new Date();
  const offset = now.getTimezoneOffset(); // Minutes
  const gmt7Offset = 7 * 60; // Minutes for GMT+07:00

  // Calculate the total offset in milliseconds
  const totalOffset = (offset + gmt7Offset) * 60 * 1000;

  // Create a new Date object adjusted for GMT+07:00
  const gmt7Date = new Date(now.getTime() + totalOffset);
  return gmt7Date;
}

export default getGMT7Date;
