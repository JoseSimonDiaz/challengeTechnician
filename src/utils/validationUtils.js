export const validateName = (name) => {
  if (!name) return "El nombre es obligatorio";
  if (name.length > 80) return "Máximo 80 caracteres";
  return null;
};

export const validateDay = (day) => {
  if (!day && day !== 0) return "El día es obligatorio";
  const dayNum = Number(day);
  if (isNaN(dayNum) || dayNum < 0 || dayNum > 31) {
    return "El día debe estar entre 0 y 31";
  }
  return null;
};

export const validateMonth = (month) => {
  if (!month) return "El mes es obligatorio";
  if (month.length > 15) return "Máximo 15 caracteres";
  return null;
};
