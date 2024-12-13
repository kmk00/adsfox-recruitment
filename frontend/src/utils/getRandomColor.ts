export const getRandomColor = (): string => {
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = Math.floor(Math.random() * 128);
    color += value.toString(16).padStart(2, "0");
  }
  return color;
};
