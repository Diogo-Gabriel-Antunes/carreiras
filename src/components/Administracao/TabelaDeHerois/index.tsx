import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Box,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { HeroisContext } from "../../../context/HeroisContext";
import { IGrupo } from "../../../interface/IGrupos";
import { IHeroi } from "../../../interface/IHerois";
import CriacaoGrupo from "../../../pages/Administracao/GruposPage/CriacaoGrupo";
import CirculoProgressivo from "../CirculoProgressivo";
import BotoesAdicionarGrupo from "./BotaoAdicionarGrupo";
import BotoesTabela from "./BotoesTabela";

interface Props {
  heroi?: IHeroi;
  grupo?: IGrupo;
  setRefresh: React.Dispatch<React.SetStateAction<number>>;
  refresh: number;
  criGrupo?: boolean;
  poder?: boolean;
  setIntegrantes?:
    | React.Dispatch<React.SetStateAction<IHeroi[] | undefined>>
    | undefined
    | any;
  setHeroisDisponiveis?:
    | React.Dispatch<React.SetStateAction<IHeroi[] | undefined>>
    | undefined;
  heroisDisponiveis?: IHeroi[] | undefined;
}
const TabelaDeHerois = ({
  heroi,
  grupo,
  refresh,
  setRefresh,
  criGrupo = false,
  poder = false,
  setIntegrantes,
  heroisDisponiveis,
  setHeroisDisponiveis,
}: Props) => {
  return (
    <Tr>
      <Td>
        <Box display="flex">
          <Box margin="0 auto">{heroi ? heroi.id : grupo?.id}</Box>
        </Box>
      </Td>

      <Td>
        <Box display="flex">
          <Box margin="0 auto">{heroi ? heroi.name : grupo?.name}</Box>
        </Box>
      </Td>
      {poder ? (
        <>
          {heroi?.powerstats
            ? Object.values(heroi?.powerstats).map((stats) => (
                <Td>
                  <Box display="flex">
                    <Box margin="0 auto">
                      <CirculoProgressivo
                        status={stats === "null" ? 0 : stats}
                      />
                    </Box>
                  </Box>
                </Td>
              ))
            : ""}
        </>
      ) : (
        <Td isNumeric>
          {" "}
          <Box display="flex">
            <Box margin="0 auto">
              {grupo?.integrantes ? grupo.integrantes.length : 0}
            </Box>
          </Box>
        </Td>
      )}

      {criGrupo ? (
        <BotoesAdicionarGrupo
          heroi={heroi}
          refresh={refresh}
          setRefresh={setRefresh}
          setIntegrantes={setIntegrantes}
          heroisDisponiveis={heroisDisponiveis}
          setHeroisDisponiveis={setHeroisDisponiveis}
        />
      ) : grupo ? (
        <BotoesTabela refresh={refresh} setRefresh={setRefresh} grupo={grupo} />
      ) : (
        <BotoesTabela refresh={refresh} setRefresh={setRefresh} heroi={heroi} />
      )}
    </Tr>
  );
};

export default TabelaDeHerois;
