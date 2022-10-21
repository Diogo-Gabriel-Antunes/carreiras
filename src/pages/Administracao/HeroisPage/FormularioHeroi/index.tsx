import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  SimpleGrid,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormHerois from "../../../../components/Administracao/FormHerois";
import NavBarAdministracao from "../../../../components/Administracao/Navbar";
import { HeroisContext } from "../../../../context/HeroisContext";
import { Appearance, IHeroi } from "../../../../interface/IHerois";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const atualizaHerois = (Lista: IHeroi[], idDoHeroi: string, heroi: IHeroi) => {
  Lista.reduce((listaAntiga: IHeroi[], heroiAtualizado: IHeroi) => {
    let obj = idDoHeroi.includes(heroiAtualizado.id)
      ? Object.assign(heroiAtualizado, heroi)
      : heroiAtualizado;
    listaAntiga.push(obj);

    return listaAntiga;
  }, []);
  alert("Heroi atualizado com sucesso");
};

const cadastraHeroi = (lista: IHeroi[] | undefined, heroi: IHeroi) => {
  const checaNomeExistente = lista?.findIndex(
    (heroisVerificado) =>
      heroi.name.toLowerCase() === heroisVerificado.name.toLowerCase()
  );
  heroi.id = `${Number(lista?.at(-1)?.id) + 1}`;

  if (checaNomeExistente) {
    if (checaNomeExistente <= 0) {
      lista?.push(heroi);

      alert("Heroi Cadastrado com sucesso");
    } else {
      alert("Heroi ja cadastrado");
    }
  }
};
// const save = (e: any) => {
//   e.preventDefault();
//   if (parametros.id) {
//     if (context?.herois) {
//       atualizaHerois(context?.herois, parametros.id, heroi);
//       navigate("/herois");
//     }
//   } else {
//     cadastraHeroi(context?.herois, heroi);
//     navigate("/herois");
//   }
// };

const esquemaDeValidacoes = yup.object().shape({
  nome: yup.string().min(3).required(),
  "Nome Completo": yup.string().min(3).trim().required(),
  "Altura em cm": yup.number().positive().required(),
  Apelidos: yup.string(),
  "Cor do olho": yup.string().trim().min(5).required(),
  Editora: yup.string().trim().min(3).required(),
  "Cor do cabelo": yup.string(),
  Nacionalidade: yup.string().min(5).required(),
  Personalidiades: yup.string(),
  "Peso por kg": yup.number().positive(),
  "Primeira Aparição": yup.string().trim().min(5).required(),
  Raça: yup.string().trim().min(2).required(),
});

const FormHeroi = () => {
  const navigate = useNavigate();
  const context = useContext(HeroisContext);
  const parametros = useParams();
  const arrayBiografia = [
    "Nome Completo",
    "Personalidades",
    "Apelidos",
    "Nacionalidade",
    "Primeira Aparição",
    "Editora",
    "Apelidos",
  ];

  const arrayPowerStats = [
    "Combate",
    "Inteligencia",
    "Força",
    "Velocidade",
    "Durabilidade",
    "Poder",
  ];

  const arrayAparencia = [
    "Genero",
    "Raça",
    "Altura em cm",
    "Peso por kg",
    "Cor do olho",
    "Cor do cabelo",
  ];

  const [heroi, setHeroi] = useState<IHeroi | undefined | any>({
    response: "",
    id: "",
    name: "",
    powerstats: {
      intelligence: "0",
      strength: "0",
      speed: "0",
      durability: "0",
      power: "0",
      combat: "0",
    },
    biography: {
      "full-name": "",
      "alter-egos": "",
      aliases: [],
      "place-of-birth": "",
      "first-appearance": "",
      publisher: "",
      alignment: "",
    },
    appearance: {
      gender: "",
      race: "",
      height: [],
      weight: [],
      "eye-color": "",
      "hair-color": "",
    },
    work: {
      occupation: "",
      base: "",
    },
    connections: {
      "group-affiliation": "",
      relatives: "",
    },
    image: {
      url: "",
    },
  });
  const submit = (heroi: any) => {
    console.log(heroi);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(esquemaDeValidacoes),
  });

  useEffect(() => {
    if (parametros.id) {
      const heroi = context?.herois?.filter(
        (herois) => herois.id === parametros.id
      )[0];
      setHeroi(heroi);
    }
  }, [context, parametros]);

  return (
    <Box display="flex">
      <Box>
        <NavBarAdministracao />
      </Box>
      <Box margin="0 auto">
        <Heading textAlign="center">Cadastro de heroi</Heading>
        <form onSubmit={handleSubmit(submit)}>
          <FormControl
            border="1px solid #CCC"
            width="1280px"
            margin="32px 0"
            borderRadius="12px"
          >
            <Box display="flex" padding="32px 0px">
              <Box margin="0 auto">
                <FormLabel textAlign="center">Nome</FormLabel>
                <Input
                  {...register("nome")}
                  type="text"
                  value={heroi?.name}
                  name="nome"
                  onChange={(e) => {
                    const novoEstado = Object.assign({}, heroi);
                    novoEstado.name = e.target.value;
                    setHeroi(novoEstado);
                  }}
                />
                <>{errors.nome ? errors.nome?.message : ""}</>
              </Box>
            </Box>
            <hr />
            <Box display="flex">
              <Box margin="0px auto" padding="32px 0px">
                <Heading textAlign="center" margin="0px auto 32px auto ">
                  PowerStats
                </Heading>
                <SimpleGrid columns={3} spacing={10}>
                  {Object.keys(heroi.powerstats).map((stats: any, index) => (
                    <Box margin="32px" key={index}>
                      <FormLabel textAlign="center">
                        {arrayPowerStats[index]}
                      </FormLabel>
                      <NumberInput
                        step={1}
                        defaultValue={0}
                        min={0}
                        max={100}
                        value={heroi.powerstats[stats]}
                        onChange={(e: any) => {
                          const novoEstado = Object.assign({}, heroi);
                          novoEstado.powerstats[stats] = e;
                          setHeroi(novoEstado);
                        }}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </Box>
                  ))}
                </SimpleGrid>
              </Box>
            </Box>
            <hr />
            <Box display="flex">
              <Box width="100%">
                <Box margin="0px auto" padding="32px 0px">
                  <Heading textAlign="center" margin="0px auto 32px auto ">
                    Biografia
                  </Heading>
                </Box>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Box display="flex">
                    <SimpleGrid columns={3} spacing={10}>
                      {Object.keys(heroi?.biography).map(
                        (biografia: any, index) => (
                          <Box margin="32px" key={index}>
                            {biografia === "alignment" ? (
                              <>
                                <FormLabel textAlign="center">
                                  Heroi/Vilão
                                </FormLabel>
                                <Select
                                  required
                                  placeholder="Heroi/Vilão"
                                  width="241px"
                                  name={"Heroi/Vilao"}
                                  value={heroi?.biography?.alignment}
                                  onChange={(e) => {
                                    const novoEstado = Object.assign({}, heroi);
                                    novoEstado.biography.alignment =
                                      e.target.value;
                                    setHeroi(novoEstado);
                                  }}
                                >
                                  <option value="Good">Heroi</option>
                                  <option value="Bad">Vilão</option>
                                </Select>
                              </>
                            ) : (
                              <>
                                <FormLabel textAlign="center" key={index}>
                                  {arrayBiografia[index]}
                                </FormLabel>

                                <Input
                                  {...register(arrayBiografia[index])}
                                  placeholder={`${arrayBiografia[index]} do heroi`}
                                  value={heroi?.biography[biografia]}
                                  name={arrayBiografia[index]}
                                  onChange={(e: any) => {
                                    const novoEstado = Object.assign({}, heroi);
                                    novoEstado.biography[biografia] =
                                      e.target.value;
                                    setHeroi(novoEstado);
                                  }}
                                />
                                {errors[arrayBiografia[index]]?.message}
                              </>
                            )}
                          </Box>
                        )
                      )}
                    </SimpleGrid>
                  </Box>
                </Box>
              </Box>
            </Box>

            <hr />
            <Box display="flex" flexDirection="column" alignItems="center">
              <Box margin="0px auto" padding="32px 0px">
                <Heading textAlign="center" margin="0px auto 32px auto ">
                  Aparencia
                </Heading>
              </Box>
              <Box display="flex" flexDirection="column">
                <Box display="flex">
                  <SimpleGrid columns={3} spacing={10}>
                    {Object.keys(heroi?.appearance).map((aparencia, index) => (
                      <Box margin="32px" key={index}>
                        {aparencia === "gender" ? (
                          <>
                            <FormLabel textAlign="center">
                              {arrayAparencia[index]}
                            </FormLabel>
                            <Select
                              placeholder="Genero"
                              width="207px"
                              name="genero"
                              value={heroi?.appearance?.gender}
                              onChange={(e) => {
                                const novoEstado = Object.assign({}, heroi);
                                novoEstado.appearance.gender = e.target.value;
                                setHeroi(novoEstado);
                              }}
                            >
                              <option value="Masculino">Masculino</option>
                              <option value="Feminino">Feminino</option>
                              <option value="-">Indefindo</option>
                            </Select>
                            <>{errors[aparencia]?.message}</>
                          </>
                        ) : (
                          <>
                            <FormLabel textAlign="center">
                              {arrayAparencia[index]}
                            </FormLabel>
                            {arrayAparencia[index] === "Altura em cm" ||
                            arrayAparencia[index] === "Peso por kg" ? (
                              <Input
                                {...register(arrayAparencia[index])}
                                type="number"
                                name={arrayAparencia[index]}
                                placeholder={`${arrayAparencia[index]} do heroi `}
                                value={heroi?.appearance[aparencia][0]}
                                onChange={(e) => {
                                  const novoEstado = Object.assign({}, heroi);
                                  novoEstado.appearance[aparencia] = Number(
                                    e.target.value
                                  );

                                  setHeroi(novoEstado);
                                }}
                              />
                            ) : (
                              <Input
                                {...register(arrayAparencia[index])}
                                name={arrayAparencia[index]}
                                placeholder={`${arrayAparencia[index]} do heroi `}
                                value={heroi?.appearance[aparencia]}
                                onChange={(e) => {
                                  const novoEstado = Object.assign({}, heroi);
                                  novoEstado.appearance[aparencia] =
                                    e.target.value;
                                  setHeroi(novoEstado);
                                }}
                              />
                            )}
                            <>{errors[aparencia]?.message}</>
                          </>
                        )}
                      </Box>
                    ))}
                  </SimpleGrid>
                </Box>
              </Box>
            </Box>
            <hr />
            <Box display="flex">
              <Box margin="0px auto" padding="32px 0px">
                <Heading textAlign="center" margin="0px auto 32px auto ">
                  Trabalho
                </Heading>
                <Box display="flex">
                  <Box display="flex">
                    <Box margin="32px" textAlign="center">
                      <FormLabel textAlign="center">Profissão</FormLabel>

                      <Input
                        {...register("Profissao")}
                        name="Profissao"
                        placeholder="Profissão do heroi"
                        value={heroi?.work?.occupation}
                        onChange={(e) => {
                          const novoEstado = Object.assign({}, heroi);
                          novoEstado.work.occupation = e.target.value;
                          setHeroi(novoEstado);
                        }}
                      />
                    </Box>
                  </Box>
                  <Box display="flex">
                    <Box margin="32px">
                      <FormLabel textAlign="center">Base de trabalho</FormLabel>
                      <Input
                        {...register("base")}
                        name="base"
                        placeholder="Base de trabalho do heroi"
                        value={heroi?.work?.base}
                        onChange={(e) => {
                          const novoEstado = Object.assign({}, heroi);
                          novoEstado.work.base = e.target.value;
                          setHeroi(novoEstado);
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <hr />
            <Box display="flex">
              <Box margin="0px auto" padding="32px 0px">
                <Heading textAlign="center" margin="0px auto 32px auto ">
                  Afiliação
                </Heading>
                <Box display="flex">
                  <Box display="flex">
                    <Box margin="32px" textAlign="center">
                      <FormLabel textAlign="center">Familiares</FormLabel>

                      <Input
                        {...register("vinculos")}
                        name="vinculos"
                        placeholder="Vinculos do heroi"
                        value={heroi?.connections?.relatives}
                        onChange={(e) => {
                          const novoEstado = Object.assign({}, heroi);
                          novoEstado.connections.relatives = e.target.value;
                          setHeroi(novoEstado);
                        }}
                      />
                    </Box>
                  </Box>
                  <Box display="flex">
                    <Box margin="32px">
                      <FormLabel textAlign="center">Vinculos</FormLabel>
                      <Textarea
                        {...register("familiares")}
                        name="familiares"
                        placeholder="Familiares do heroi"
                        width="241px"
                        resize="none"
                        value={
                          heroi?.connections
                            ? heroi?.connections["group-affiliation"]
                            : ""
                        }
                        onChange={(e) => {
                          const novoEstado = Object.assign({}, heroi);
                          novoEstado.connections["group-affiliation"] =
                            e.target.value;
                          setHeroi(novoEstado);
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box display="flex">
              {parametros.id ? (
                <Box margin="32px auto">
                  <Input
                    value="Atualizar"
                    type="submit"
                    bgColor="blue.500"
                    color="white"
                    cursor="pointer"
                  ></Input>
                </Box>
              ) : (
                <Box margin="32px auto">
                  <Button
                    type="submit"
                    bgColor="blue.500"
                    value="Cadastrar"
                    color="white"
                    cursor="pointer"
                  >
                    Cadastrar
                  </Button>
                </Box>
              )}
            </Box>
          </FormControl>
        </form>
      </Box>
    </Box>
  );
};

export default FormHeroi;
