import { Box, Button, Td } from "@chakra-ui/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { HeroisContext } from "../../../../context/HeroisContext";
import { IGrupo } from "../../../../interface/IGrupos";
import { IHeroi } from "../../../../interface/IHerois";

interface Props {
  heroi?: IHeroi;
  grupo?: IGrupo;
  setRefresh: React.Dispatch<React.SetStateAction<number>>;
  refresh: number;
}

const BotoesTabela = ({ heroi, grupo, refresh, setRefresh }: Props) => {
  const context = useContext(HeroisContext);
  const excluirHeroi = (heroiAhSerExcluido: IHeroi) => {
    if (context?.herois) {
      context.herois = context?.herois.filter(
        (heroi: any) => heroi.id !== heroiAhSerExcluido?.id
      );
      setRefresh(refresh ? refresh + 1 : 2);
    }
  };
  const excluirGrupo = (grupoAhSerExcluido: IGrupo | undefined) => {
    if (context?.listaDeGrupos) {
      context.listaDeGrupos = context?.listaDeGrupos.filter(
        (grupo: any) => grupo.id !== grupoAhSerExcluido?.id
      );
      setRefresh(refresh + 1);
    }
  };

  return (
    <>
      {heroi ? (
        <>
          <Td isNumeric>
            <Box display="flex">
              <Box margin="0 auto">
                <Link to={`/infosheroi/${heroi.id}`}>
                  <Button colorScheme="blue">Infos</Button>
                </Link>
              </Box>
            </Box>
          </Td>
          <Td isNumeric>
            <Box display="flex">
              <Box margin="0 auto">
                <Link to={`/herois/${heroi.id}`}>
                  <Button colorScheme="blue">Editar</Button>
                </Link>
              </Box>
            </Box>
          </Td>
        </>
      ) : (
        <>
          <Td isNumeric>
            <Box display="flex">
              <Box margin="0 auto">
                <Link to={`/grupo/${grupo?.id}`}>
                  <Button colorScheme="blue">Infos Do Grupo</Button>
                </Link>
              </Box>
            </Box>
          </Td>
        </>
      )}

      <Td isNumeric>
        <Box display="flex">
          <Box margin="0 auto">
            <Button
              colorScheme="red"
              onClick={() =>
                heroi ? excluirHeroi(heroi) : excluirGrupo(grupo)
              }
            >
              Remover
            </Button>
          </Box>
        </Box>
      </Td>
    </>
  );
};

export default BotoesTabela;
