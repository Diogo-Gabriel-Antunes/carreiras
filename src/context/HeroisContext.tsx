import { createContext, ReactNode, useEffect, useState } from "react";
import { httpClient } from "../ClienteDeRotas/HttpClient";
import { Context } from "../interface/Context";
import { IGrupo } from "../interface/IGrupos";
import { IHeroi } from "../interface/IHerois";

interface Props {
  children: ReactNode;
}

export const HeroisContext = createContext<Context | undefined>(undefined);

const HeroisProvider = ({ children }: Props) => {
  const rotas = [
    httpClient.get("search/a"),
    httpClient.get("search/e"),
    httpClient.get("search/i"),
    httpClient.get("search/o"),
    httpClient.get("search/u"),
  ];

  const listaDeGrupos: IGrupo[] = [];
  const [heroisDuplicados, setHeroisDuplicados] = useState<IHeroi[]>([]);
  const heroisFiltrados: IHeroi[] = [];

  useEffect(() => {
    Promise.all(rotas).then((resposta: any) => {
      for (const res of resposta) {
        for (const heroi of res.data.results) {
          setHeroisDuplicados((heroisDaLista) => [...heroisDaLista, heroi]);
        }
      }
    });
  }, []);
  heroisDuplicados.forEach((item, index, array) => {
    let heroiDupliacado =
      heroisFiltrados.findIndex((heroi) => {
        return item.id === heroi.id;
      }) > -1;

    if (!heroiDupliacado) {
      heroisFiltrados.push(item);
      if (listaDeGrupos.length < 20) {
        listaDeGrupos.push({
          id: `${index + 1}`,
          name: `${item.biography.publisher}`,
          integrantes: array.slice((1 + index) * 10, (3 + index) * 10),
        });
      }
    }
  });
  heroisFiltrados.sort(
    (heroiA, heroiB) => Number(heroiA.id) - Number(heroiB.id)
  );

  return (
    <HeroisContext.Provider
      value={{
        herois: heroisFiltrados,
        listaDeGrupos: listaDeGrupos,
      }}
    >
      {children}
    </HeroisContext.Provider>
  );
};

export default HeroisProvider;
