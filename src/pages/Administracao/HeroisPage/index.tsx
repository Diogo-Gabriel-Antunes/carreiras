import {
  Box,
  Heading,
  IconButton,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import NavBarAdministracao from "../../../components/Administracao/Navbar";
import TabelaDeHerois from "../../../components/Administracao/TabelaDeHerois";
import { HeroisContext } from "../../../context/HeroisContext";
import { SearchIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import Pagination from "../../../components/Administracao/Pagination";

const HeroisPage = () => {
  const [refresh, setRefresh] = useState(0);
  const tableHeads = [
    "Id",
    "Nome",
    "Inteligencia",
    "Força",
    "Velocidade",
    "Durabilidade",
    "Poder",
    "Combate",
    "Infos",
  ];
  const [pagina, setPagina] = useState(1);
  const [sliceStart, setSliceStart] = useState(0);
  const [sliceEnd, setSliceEnd] = useState(10);
  const context = useContext(HeroisContext);
  const [pesquisa, setPesquisa] = useState("");
  const heroisPesquisados = context?.herois?.filter((heroi) => {
    return heroi.name.toLowerCase().indexOf(pesquisa.toLowerCase()) > -1;
  });
  return (
    <Box display="flex">
      <Box minHeight="100vh">
        <NavBarAdministracao />
      </Box>
      <Box display="flex" width="100%">
        <Box margin="12px auto">
          <TableContainer
            marginTop="30px"
            border="1px solid "
            borderColor="blue.300"
            padding="24px 50px"
            width="100%"
            borderRadius="12px"
          >
            <Box>
              <Box display="flex" justifyContent="space-between" my="12px">
                <Box>
                  <Heading>Lista de herois</Heading>
                </Box>

                <Box position="relative" paddingRight="20px">
                  <Input
                    placeholder="Pesquida de herois"
                    value={pesquisa}
                    onChange={(e) => setPesquisa(e.target.value)}
                  />
                  <IconButton
                    colorScheme="blue"
                    aria-label="Search database"
                    position="absolute"
                    icon={<SearchIcon />}
                    left="90%"
                    borderRadius="0px 8px 8px 0px"
                  />
                </Box>
              </Box>
            </Box>
            <Table variant="simple" width="967px">
              <Thead>
                <Tr>
                  {tableHeads.map((campo) => (
                    <Th>
                      <Box display="flex">
                        <Box margin="0 auto">{campo}</Box>
                      </Box>
                    </Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {heroisPesquisados?.slice(sliceStart, sliceEnd).map((heroi) => (
                  <TabelaDeHerois
                    refresh={refresh}
                    setRefresh={setRefresh}
                    heroi={heroi}
                    poder
                  />
                ))}
              </Tbody>
            </Table>
            <Box width="100%" display="flex">
              <Box margin="0px auto" padding="12px 0px">
                <Box>
                  <Pagination
                    numeroPorPagina={10}
                    pagina={pagina}
                    setPagina={setPagina}
                    setSliceEnd={setSliceEnd}
                    setSliceStart={setSliceStart}
                    sliceEnd={sliceEnd}
                    sliceStart={sliceStart}
                    tamanhoMaximo={heroisPesquisados?.length}
                  />
                </Box>
              </Box>
            </Box>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default HeroisPage;
