export const FORM_FIELDS = {
  NAME: "name",
  DAY: "day",
  MONTH: "month",
  OPTION: "option",
};
export const OPTIONS_AREAS = {
  SCHOOL: "school",
  LABS: "labs",
  STUDIO: "studio",
};
export const FILTER_STYLES = {
  [OPTIONS_AREAS.SCHOOL]: "hue-rotate(0deg) brightness(100%)", 
  [OPTIONS_AREAS.LABS]:
    "hue-rotate(260deg) saturate(1.5) brightness(0.85)",
  [OPTIONS_AREAS.STUDIO]:
    "hue-rotate(55deg) saturate(3) brightness(1.1)",
  DEFAULT: "",
};
export const OPTION_IMAGES = {
  [OPTIONS_AREAS.SCHOOL]: "/images/RCS.png",
  [OPTIONS_AREAS.LABS]: "/images/RCLabs.png",
  [OPTIONS_AREAS.STUDIO]: "/images/studio.png",
};
export const VALIDATION_MESSAGES = {
  NAME_REQUIRED: "El nombre es obligatorio",
  NAME_MAX_LENGTH: "Máximo 80 caracteres",
  DAY_REQUIRED: "El día es obligatorio",
  DAY_RANGE: "El día debe estar entre 0 y 31",
  MONTH_REQUIRED: "El mes es obligatorio",
  MONTH_MAX_LENGTH: "Máximo 15 caracteres",
};
export const VALIDATION_RULES = {
  [FORM_FIELDS.NAME]: [
    {
      required: true,
      message: VALIDATION_MESSAGES.NAME_REQUIRED,
    },
    {
      max: 80,
      message: VALIDATION_MESSAGES.NAME_MAX_LENGTH,
    },
  ],
  [FORM_FIELDS.DAY]: [
    {
      required: true,
      message: VALIDATION_MESSAGES.DAY_REQUIRED,
    },
    {
      validator: (_, value) =>
        !value || (value >= 0 && value <= 31)
          ? Promise.resolve()
          : Promise.reject(new Error(VALIDATION_MESSAGES.DAY_RANGE)),
    },
  ],
  [FORM_FIELDS.MONTH]: [
    {
      required: true,
      message: VALIDATION_MESSAGES.MONTH_REQUIRED,
    },
    {
      max: 15,
      message: VALIDATION_MESSAGES.MONTH_MAX_LENGTH,
    },
  ],
};
export const VALIDATION_LIMITS = {
  NAME_MAX: 80,
  MONTH_MAX: 15,
  DAY_MIN: 0,
  DAY_MAX: 31,
};
