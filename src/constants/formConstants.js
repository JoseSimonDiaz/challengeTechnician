export const FORM_FIELDS = {
  NAME: 'name',
  DAY: 'day',
  MONTH: 'month',
  OPTION: 'option',
};

export const VALIDATION_RULES = {
  NAME: [
    { required: true, message: 'El nombre es obligatorio' },
    { max: 80, message: 'Máximo 80 caracteres' }
  ],
  DAY: [
    { required: true, message: 'El día es obligatorio' },
    {
      validator: (_, value) =>
        !value || (value >= 0 && value <= 31)
          ? Promise.resolve()
          : Promise.reject('El día debe estar entre 0 y 31'),
    }
  ],
  MONTH: [
    { required: true, message: 'El mes es obligatorio' },
    { max: 15, message: 'Máximo 15 caracteres' }
  ]
};

export const OPTIONS_AREAS = {
  SCHOOL: 'school',
  LABS: 'labs',
  STUDIO: 'studio', 
};
