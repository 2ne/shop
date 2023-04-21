export const calculateAge = (
  dob: Date | string,
  currentDate: Date = new Date()
): number => {
  const birthDate = new Date(dob);
  const yearsDifference = currentDate.getFullYear() - birthDate.getFullYear();
  const isBirthdayNotReached =
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() < birthDate.getDate());
  const age = isBirthdayNotReached ? yearsDifference - 1 : yearsDifference;
  return age;
};
