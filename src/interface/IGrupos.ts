import { IHeroi } from "./IHerois";

export interface IGrupo {
  id: string;
  name: string;
  integrantes: IHeroi[];
}
