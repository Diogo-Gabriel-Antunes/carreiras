import { IGrupo } from "./IGrupos";
import { IHeroi } from "./IHerois";

export interface Context {
  herois: IHeroi[] | undefined;
  listaDeGrupos: IGrupo[] | undefined;
}
