import * as yup from "yup";

const esquemaDeValidacoes = yup.object().shape({
  name: yup.string().min(3).required(),
  url: yup.string(),
  "full-name": yup.string().min(3).trim().required(),
  "alter-egos": yup.string(),
  aliases: yup.string(),
  "place-of-birth": yup.string().min(5).required(),
  "first-appearance": yup.string().trim().min(5).required(),
  publisher: yup.string().trim().min(3).required(),
  alignment: yup.string(),

  gender: yup.string(),
  race: yup.string().trim().min(2).required(),
  height: yup.number().positive().required(),
  weight: yup.number().positive(),
  "eye-color": yup.string().trim().min(5).required(),
  "hair-color": yup.string(),

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
