export const calculateAge = (dob: Date, currentDate: Date = new Date()) => {
  const birthDate = new Date(dob);
  let age = currentDate.getFullYear() - birthDate.getFullYear();
  const monthDifference = currentDate.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

export const isAgeWithinRange = (
  dob: Date,
  ageCriteria: { min?: number; max?: number }
) => {
  const participantAge = calculateAge(dob);
  const isAboveMinAge =
    ageCriteria.min === undefined || participantAge >= ageCriteria.min;
  const isBelowMaxAge =
    ageCriteria.max === undefined || participantAge <= ageCriteria.max;
  return isAboveMinAge && isBelowMaxAge;
};
