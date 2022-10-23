import * as yup from "yup";

const esquemaDeValidacoes = yup.object().shape({
  name: yup.string().min(3, "Deve conter ao menos 3 caracteres").required(),
  url: yup.string(),

  "full-name": yup
    .string()
    .min(3, "Deve conter ao menos 3 caracteres")
    .required(),
  "alter-egos": yup.string(),
  aliases: yup.string(),
  "place-of-birth": yup
    .string()
    .min(5, "Deve conter ao menos 5 caracteres")
    .required(),
  "first-appearance": yup
    .string()
    .min(5, "Deve conter ao menos 5 caracteres")
    .required(),
  publisher: yup
    .string()
    .min(3, "Deve conter ao menos 3 caracteres")
    .required(),
  alignment: yup.string().required("Este campo é obrigatorio"),

  gender: yup.string().required("Este campo é obrigatorio"),
  race: yup.string().min(2, "Deve conter ao menos 2 caracteres").required(),
  height: yup
    .string()
    .max(3, "Deve ter no maximo 3 digitos")
    .required("Deve ser um numero"),
  weight: yup
    .string()
    .max(3, "Deve ter no maximo 3 digitos")
    .required("Deve ser um numero"),
  "eye-color": yup
    .string()
    .trim()
    .min(5, "Deve conter ao menos 5 caracteres")
    .required("Este campo é obrigatorio"),
  "hair-color": yup.string().required("Este campo é obrigatorio"),

  occupation: yup.string(),
  base: yup.string(),

  "group-affiliation": yup.string(),
  relatives: yup.string(),

  intelligence: yup.string(),
  strength: yup.string(),
  speed: yup.string(),
  durability: yup.string(),
  power: yup.string(),
  combat: yup.string(),
});

export interface esquema {
  id?: string;
  name: string;

  "full-name": string;
  "alter-egos": string;
  aliases: string;
  "place-of-birth": string;
  "first-appearance": string;
  publisher: string;
  alignment: string;

  gender: string;
  race: string;
  height: string;
  weight: string;
  "eye-color": string;
  "hair-color": string;

  occupation: string;
  base: string;

  "group-affiliation": string;
  relatives: string;
  intelligence: string;
  strength: string;
  speed: string;
  durability: string;
  power: string;
  combat: string;

  url: string;
}

export default esquemaDeValidacoes;
