import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Input,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBarAdministracao from "../../../../components/Administracao/Navbar";
import CardHero from "../../../../components/Heroes/CardHero";
import { HeroisContext } from "../../../../context/HeroisContext";
import { SearchIcon } from "@chakra-ui/icons";
import Pagination from "../../../../components/Administracao/Pagination";
import FormInfosGrupo from "../../../../components/Administracao/FormularioInfosGrupo";
import { IHeroi } from "../../../../interface/IHerois";
import { IGrupo } from "../../../../interface/IGrupos";
import TabelaDeHerois from "../../../../components/Administracao/TabelaDeHerois";

const atualizaGrupo = (
  lista: IGrupo[] | undefined,
  idDoGrupo: string | undefined,
  grupo: IGrupo | undefined
) => {
  lista?.reduce((listaAntiga: IGrupo[], heroiAtualizado: IGrupo) => {
    let obj = idDoGrupo?.includes(heroiAtualizado.id)
      ? Object.assign(heroiAtualizado, grupo)
      : heroiAtualizado;
    listaAntiga.push(obj);

    return listaAntiga;
  }, []);
  alert("Grupo atualizado com sucesso");
  console.log(lista);
};

const cadastraGrupo = (lista: IGrupo[] | undefined, grupo: IGrupo) => {
  console.log(grupo);
  const checaNome = lista?.findIndex(
    (grupoAhVerificar) =>
      grupoAhVerificar?.name?.toLowerCase() === grupo?.name?.toLowerCase()
  );
  grupo.id = `${Number(lista?.at(-1)?.id) + 1}`;
  console.log(checaNome);
  if (checaNome) {
    if (checaNome <= 0) {
      lista?.push(grupo);
      alert("Grupo Cadastrado com sucesso");
    } else {
      alert("Grupo ja cadastrado");
    }
  }
};
const GrupoInfos = () => {
  const context = useContext(HeroisContext);
  const parametros = useParams();
  const [pagina, setPagina] = useState(1);
  const [refresh, setRefresh] = useState(0);
  const [sliceStart, setSliceStart] = useState(0);
  const [pesquisa, setPesquisa] = useState("");
  const [sliceEnd, setSliceEnd] = useState(6);
  const [sliceStartHerois, setSliceStartHerois] = useState(0);
  const [paginaHerois, setPaginaHerois] = useState(1);
  const [sliceEndHerois, setSliceEndHerois] = useState(10);
  const [integrantes, setIntegrantes] = useState<IHeroi[]>([]);
  const tableHeads = [
    "Id",
    "Nome",
    "Inteligencia",
    "Força",
    "Velocidade",
    "Durabilidade",
    "Poder",
    "Combate",

    "Adicionar ao grupo",
  ];
  const [heroisDisponiveis, setHeroisDisponiveis] = useState<
    IHeroi[] | undefined
  >(context?.herois);
  const grupo = context?.listaDeGrupos?.filter(
    (grupos) => grupos.id === parametros.id
  )[0];
  const [novoNomeDoGrupo, setNovoNomeDoGrupo] = useState<string | undefined>(
    ""
  );

  const heroisPesquisados: IHeroi[] | undefined = heroisDisponiveis?.filter(
    (heroi: any) => {
      return heroi.name.toLowerCase().indexOf(pesquisa.toLowerCase()) > -1;
    }
  );
  // Funções de exclusão
  const excluirIntegrante = (integranteAhSerExcluido: IHeroi) => {
    if (grupo?.integrantes) {
      grupo.integrantes = grupo?.integrantes.filter(
        (integrante) => integrante.id !== integranteAhSerExcluido.id
      );

      setRefresh(refresh + 1);
    }
  };
  const excluirIntegranteArray = (integranteAhSerExcluido: IHeroi) => {
    const integrantesAtualizado = integrantes.filter(
      (integrante) => integrante.id !== integranteAhSerExcluido.id
    );

    setIntegrantes(integrantesAtualizado);
  };

  useEffect(() => {
    if (parametros.id) {
      let HeroisDisponiveisFiltrado: IHeroi[] = [];
      context?.herois?.forEach((item, index, array) => {
        if (grupo?.integrantes) {
          let heroiDuplicado =
            grupo?.integrantes?.findIndex((heroi: any) => {
              return item.id === heroi.id;
            }) > -1;

          if (!heroiDuplicado) {
            HeroisDisponiveisFiltrado.push(item);
          }
        }
      });
      setNovoNomeDoGrupo(grupo?.name);
      setHeroisDisponiveis(HeroisDisponiveisFiltrado);
    }
  }, [grupo?.integrantes, context?.herois, parametros.id]);

  return (
    <Box display="flex">
      <Box>
        <NavBarAdministracao />
      </Box>
      <Box width="100%">
        <Box margin="50px 0">
          <Box margin="20px auto">
            <Heading textAlign="center">
              {parametros.id ? `Grupo : ${grupo?.name}` : "Crie seu grupo"}
            </Heading>
          </Box>

          {parametros.id ? (
            <Box
              border="1px solid"
              borderColor="blue.300"
              margin="80px"
              padding="32px"
              borderRadius="12px"
            >
              <Box>
                <Heading textAlign="center" margin="32px 0">
                  Integrantes
                </Heading>
              </Box>
              <Box>
                <Grid
                  gridTemplateColumns={"repeat(3,1fr)"}
                  rowGap={8}
                  padding="32px"
                >
                  {grupo?.integrantes
                    ?.slice(sliceStart, sliceEnd)
                    .map((integrante) => (
                      <GridItem
                        width="100%"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        data-testid={`card${integrante.id}`}
                      >
                        <CardHero hero={integrante} />
                        <Box
                          display="flex"
                          marginY="12px"
                          justifyContent="space-between"
                        >
                          <Box>
                            <Button
                              colorScheme="red"
                              onClick={() => excluirIntegrante(integrante)}
                            >
                              Remover do grupo
                            </Button>
                          </Box>
                        </Box>
                      </GridItem>
                    ))}
                </Grid>
                <Box display="flex">
                  <Box margin="0px auto" padding="12px 0px">
                    <Pagination
                      numeroPorPagina={10}
                      pagina={pagina}
                      setPagina={setPagina}
                      setSliceEnd={setSliceEnd}
                      setSliceStart={setSliceStart}
                      sliceEnd={sliceEnd}
                      sliceStart={sliceStart}
                      tamanhoMaximo={grupo?.integrantes.length}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          ) : (
            ""
          )}

          <Box
            border="1px solid "
            borderColor="blue.300"
            margin="80px"
            padding="32px"
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
            <Box>
              <Box>
                <Table>
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
                    {heroisPesquisados
                      ?.slice(sliceStartHerois, sliceEndHerois)
                      .map((heroi: any) => (
                        <TabelaDeHerois
                          refresh={refresh}
                          setRefresh={setRefresh}
                          heroi={heroi}
                          criGrupo={true}
                          setIntegrantes={setIntegrantes}
                          setHeroisDisponiveis={setHeroisDisponiveis}
                          heroisDisponiveis={heroisDisponiveis}
                          poder
                        />
                      ))}
                  </Tbody>
                </Table>
              </Box>

              <Box display="flex">
                <Box margin="0px auto" padding="12px 0px">
                  <Pagination
                    numeroPorPagina={10}
                    pagina={paginaHerois}
                    setPagina={setPaginaHerois}
                    setSliceEnd={setSliceEndHerois}
                    setSliceStart={setSliceStartHerois}
                    sliceEnd={sliceEndHerois}
                    sliceStart={sliceStartHerois}
                    tamanhoMaximo={heroisDisponiveis?.length}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
          <Box display="flex" width="100%">
            <Box
              margin="0 auto"
              border="1px solid "
              borderColor="blue.300"
              width="90%"
              borderRadius="12px"
            >
              <Heading textAlign="center" marginY="32px">
                {parametros.id
                  ? "Novos Herois para Adicionar"
                  : "Adicione herois ao seu grupo"}
              </Heading>
              <hr />
              <Box>
                {integrantes?.length === 0 ? (
                  <Box marginY="24px">
                    <Text fontSize="20px" textAlign="center">
                      Adicione herois ao seu grupo
                    </Text>
                  </Box>
                ) : (
                  <Grid
                    gridTemplateColumns={"repeat(3,1fr)"}
                    rowGap={8}
                    padding="32px"
                  >
                    {integrantes
                      ?.slice(sliceStart, sliceEnd)
                      .map((integrante) => (
                        <GridItem
                          width="100%"
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                        >
                          <CardHero hero={integrante} />
                          <Box
                            display="flex"
                            marginY="12px"
                            justifyContent="space-between"
                          >
                            <Box>
                              <Button
                                colorScheme="red"
                                onClick={() =>
                                  excluirIntegranteArray(integrante)
                                }
                              >
                                Remover do grupo
                              </Button>
                            </Box>
                          </Box>
                        </GridItem>
                      ))}
                  </Grid>
                )}
              </Box>
            </Box>
          </Box>
          {parametros.id ? (
            <Box display="flex">
              <Box margin="20px auto">
                <Box>
                  <Box display="flex" width="100%">
                    <Box
                      border="1px solid "
                      borderColor="blue.300"
                      borderRadius="12px 0 0 12px"
                    >
                      <Box marginX="135px">
                        <FormInfosGrupo
                          label="Nome"
                          titulo="Editar Grupo"
                          valorBotao="Atualizar"
                          valorInput={novoNomeDoGrupo}
                          parametrosDaFuncao={[
                            context?.listaDeGrupos,
                            parametros.id,
                            {
                              id: parametros.id,
                              nome: novoNomeDoGrupo,
                              integrantes: integrantes,
                            },
                          ]}
                          funcaoDoBotao={atualizaGrupo}
                          onChangeDoInput={setNovoNomeDoGrupo}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box display="flex">
              <Box margin="20px auto">
                <Box>
                  <Box display="flex" width="100%">
                    <Box
                      border="1px solid "
                      borderColor="blue.300"
                      borderRadius="12px 0 0 12px"
                    >
                      <Box marginX="135px">
                        <FormInfosGrupo
                          label="Nome"
                          titulo="Nome do seu grupo"
                          valorBotao="Criar"
                          valorInput={novoNomeDoGrupo}
                          parametrosDaFuncao={[
                            context?.listaDeGrupos,
                            {
                              id: parametros.id,
                              name: novoNomeDoGrupo,
                              integrantes: integrantes,
                            },
                          ]}
                          funcaoDoBotao={cadastraGrupo}
                          onChangeDoInput={setNovoNomeDoGrupo}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default GrupoInfos;
