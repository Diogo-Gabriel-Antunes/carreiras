import { Box, Button, Td } from "@chakra-ui/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { HeroisContext } from "../../../../context/HeroisContext";
import { IGrupo } from "../../../../interface/IGrupos";
import { IHeroi } from "../../../../interface/IHerois";

interface Props {
  setRefresh: React.Dispatch<React.SetStateAction<number>>;
  refresh: number;
  heroi: IHeroi | undefined | any;
  setIntegrantes: React.Dispatch<React.SetStateAction<IHeroi[]>> | undefined;
  setHeroisDisponiveis:
    | React.Dispatch<React.SetStateAction<IHeroi[] | undefined>>
    | undefined;
  heroisDisponiveis: IHeroi[] | undefined;
}

const BotoesAdicionarGrupo = ({
  heroi,
  refresh,
  setRefresh,
  setHeroisDisponiveis,
  setIntegrantes,
  heroisDisponiveis,
}: Props) => {
  const removerIntegranteSelecionado = (
    heroiAhSerExcluido: IHeroi | undefined
  ) => {
    const novosHeroisDisponiveis = heroisDisponiveis?.filter(
      (herois: any) => herois.id !== heroiAhSerExcluido?.id
    );
    if (setHeroisDisponiveis) setHeroisDisponiveis(novosHeroisDisponiveis);
  };

  return (
    <>
      <Td>
        <Box display="flex">
          <Box margin="0 auto">
            <Button
              colorScheme="blue"
              onClick={() => {
                if (setIntegrantes)
                  setIntegrantes((integrantes) => [...integrantes, heroi]);
                removerIntegranteSelecionado(heroi);
              }}
            >
              Adicionar ao grupo
            </Button>
          </Box>
        </Box>
      </Td>
    </>
  );
};

export default BotoesAdicionarGrupo;
