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
import { SearchIcon, ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import Pagination from "../../../components/Administracao/Pagination";

const GruposPage = () => {
  const [refresh, setRefresh] = useState(0);
  const context = useContext(HeroisContext);
  const [pagina, setPagina] = useState(1);
  const [pesquisa, setPesquisa] = useState("");
  const [sliceStart, setSliceStart] = useState(0);
  const [sliceEnd, setSliceEnd] = useState(10);
  const gruposPesquisados = context?.listaDeGrupos?.filter((grupo, index) => {
    return grupo?.name?.toLowerCase().indexOf(pesquisa.toLowerCase()) > -1;
  });
  console.log(gruposPesquisados);
  return (
    <Box display="flex">
      <Box>
        <NavBarAdministracao />
      </Box>
      <Box display="flex" width="100%">
        <Box margin="12px auto">
          <TableContainer
            marginTop="30px"
            border="1px solid #ccc"
            padding="24px 50px"
            width="100%"
          >
            <Box>
              <Box display="flex" justifyContent="space-between" my="12px">
                <Box>
                  <Heading>Lista de grupos</Heading>
                </Box>
                <Box>
                  <Link to="/novogrupo">
                    <Button colorScheme="blue">Novo Grupo</Button>
                  </Link>
                </Box>
                <Box position="relative" paddingRight="20px">
                  <Input
                    placeholder="Pesquida de grupos"
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
                  <Th>
                    <Box display="flex">
                      <Box margin="0 auto">Id</Box>
                    </Box>
                  </Th>
                  <Th>
                    {" "}
                    <Box display="flex">
                      <Box margin="0 auto">Nome</Box>
                    </Box>
                  </Th>
                  <Th>
                    {" "}
                    <Box display="flex">
                      <Box margin="0 auto">Participantes</Box>
                    </Box>
                  </Th>
                  <Th>
                    {" "}
                    <Box display="flex">
                      <Box margin="0 auto">Editar</Box>
                    </Box>
                  </Th>
                  <Th>
                    {" "}
                    <Box display="flex">
                      <Box margin="0 auto">Excluir</Box>
                    </Box>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {gruposPesquisados?.slice(sliceStart, sliceEnd).map((grupo) => (
                  <TabelaDeHerois
                    refresh={refresh}
                    setRefresh={setRefresh}
                    grupo={grupo}
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
                    tamanhoMaximo={gruposPesquisados?.length}
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

export default GruposPage;
