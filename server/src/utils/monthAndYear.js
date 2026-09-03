export const getCurrentMonthAndYear = () => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  return { month, year };
};
