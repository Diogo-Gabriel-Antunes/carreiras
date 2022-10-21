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
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  InputPadrao,
  PowerStatusInput,
} from "../../../../components/Administracao/FormHerois";
import NavBarAdministracao from "../../../../components/Administracao/Navbar";
import { HeroisContext } from "../../../../context/HeroisContext";
import { Appearance, IHeroi } from "../../../../interface/IHerois";
import { useForm, UseFormSetValue, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import esquemaDeValidacoes, { esquema } from "../../../../SchemaValidacao";

const atualizaHerois = (Lista: IHeroi[], idDoHeroi: string, heroi: IHeroi) => {
  Lista.reduce((listaAntiga: IHeroi[], heroiAtualizado: IHeroi) => {
    let obj = idDoHeroi.includes(
      heroiAtualizado.name ? heroiAtualizado.name : ""
    )
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

const reformaHeroi = (heroi: esquema): IHeroi => {
  return {
    name: heroi.name,

    biography: {
      "full-name": heroi["full-name"],
      "alter-egos": heroi["alter-egos"],
      aliases: [heroi.aliases],
      "place-of-birth": heroi["place-of-birth"],
      "first-appearance": heroi["first-appearance"],
      publisher: heroi.publisher,
      alignment: heroi.alignment,
    },

    appearance: {
      gender: heroi.gender,
      race: heroi.race,
      height: [heroi.height],
      weight: [heroi.weight],
      "eye-color": heroi["eye-color"],
      "hair-color": heroi["hair-color"],
    },

    work: {
      occupation: heroi.occupation,
      base: heroi.base,
    },

    connections: {
      "group-affiliation": heroi["group-affiliation"],
      relatives: heroi.relatives,
    },

    powerstats: {
      intelligence: heroi.intelligence,
      strength: heroi.strength,
      speed: heroi.speed,
      durability: heroi.durability,
      power: heroi.power,
      combat: heroi.combat,
    },
    image: {
      url: heroi.url,
    },
  };
};

const FormHeroi = () => {
  const navigate = useNavigate();
  const context = useContext(HeroisContext);
  const parametros = useParams();

  const [heroi, setHeroi] = useState<IHeroi>({
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
    const heroiReformado = reformaHeroi(heroi);
    console.log(heroi);
    if (parametros.id && context?.herois) {
      console.log(context.herois);
      atualizaHerois(context.herois, parametros.id, heroiReformado);
    } else {
      cadastraHeroi(context?.herois, heroiReformado);
      navigate("/herois");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(esquemaDeValidacoes),
  });

  const setaValores = (
    setValue: UseFormSetValue<FieldValues>,
    heroi: IHeroi
  ) => {
    setValue("name", heroi.name);
    setValue("full-name", heroi.biography["full-name"]);
    setValue("aliases", heroi.biography.aliases[1]);
    setValue("alignment", heroi.biography.alignment);
    setValue("alter-egos", heroi.biography["alter-egos"]);
    setValue("first-appearance", heroi.biography["first-appearance"]);
    setValue("place-of-birth", heroi.biography["place-of-birth"]);
    setValue("publisher", heroi.biography.publisher);
    setValue("eye-color", heroi.appearance["eye-color"]);
    setValue("gender", heroi.appearance.gender);
    setValue("hair-color", heroi.appearance["hair-color"]);
    setValue("height", heroi.appearance.height[1].substring(0, 3));
    setValue("race", heroi.appearance.race);
    setValue("weight", heroi.appearance.weight[1].substring(0, 3));
    setValue("base", heroi.work.base);
    setValue("occupation", heroi.work.occupation);
    setValue("group-affiliation", heroi.connections["group-affiliation"]);
    setValue("relatives", heroi.connections.relatives);
    setValue("combat", heroi.powerstats.combat);
    setValue("durability", heroi.powerstats.durability);
    setValue("intelligence", heroi.powerstats.intelligence);
    setValue("power", heroi.powerstats.power);
    setValue("speed", heroi.powerstats.speed);
    setValue("strength", heroi.powerstats.strength);
  };

  useLayoutEffect(() => {
    if (parametros.id) {
      const heroi = context?.herois?.filter(
        (herois) => herois.id === parametros.id
      )[0];
      heroi && setHeroi(heroi);
    }
  }, [context, parametros]);
  return (
    <Box display="flex">
      <Box>
        <NavBarAdministracao />
      </Box>
      <Box margin="0 auto">
        <Heading textAlign="center">
          {parametros.id ? "Atualize o herois" : "Cadastro de heroi"}
        </Heading>
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
                  type="text"
                  defaultValue={heroi.name}
                  {...register("name")}
                  value={heroi?.name}
                  name="name"
                  onChange={(e) => {
                    const novoEstado = Object.assign({}, heroi);
                    novoEstado.name = e.target.value;
                    setHeroi(novoEstado);
                  }}
                />
                <>{errors?.name?.message}</>
              </Box>
              <Box margin="0 auto">
                <FormLabel textAlign="center">Imagem(URL)</FormLabel>
                <Input
                  {...register("url")}
                  type="text"
                  defaultValue={heroi.image.url}
                  value={heroi?.image.url}
                  name="url"
                  onChange={(e) => {
                    const novoEstado = Object.assign({}, heroi);
                    novoEstado.image.url = e.target.value;
                    setHeroi(novoEstado);
                  }}
                />
                <>{errors?.url?.message}</>
              </Box>
            </Box>
            <hr />
            <Box display="flex">
              <Box margin="0px auto" padding="32px 0px">
                <Heading textAlign="center" margin="0px auto 32px auto ">
                  PowerStats
                </Heading>
                <SimpleGrid columns={3} spacing={10}>
                  <PowerStatusInput
                    heroi={heroi}
                    label={"Força"}
                    setHeroi={setHeroi}
                    value={heroi.powerstats.strength}
                    errors={errors.strength?.message?.toString()}
                    name={"strength"}
                    register={register}
                  />
                  <PowerStatusInput
                    heroi={heroi}
                    label={"Combate"}
                    setHeroi={setHeroi}
                    value={heroi.powerstats.combat}
                    errors={errors.combat?.message?.toString()}
                    name={"combat"}
                    register={register}
                  />
                  <PowerStatusInput
                    heroi={heroi}
                    label={"Durabilidade"}
                    setHeroi={setHeroi}
                    value={heroi.powerstats.durability}
                    errors={errors.durability?.message?.toString()}
                    name={"durability"}
                    register={register}
                  />
                  <PowerStatusInput
                    heroi={heroi}
                    label={"Inteligencia"}
                    setHeroi={setHeroi}
                    value={heroi.powerstats.intelligence}
                    errors={errors.intelligence?.message?.toString()}
                    name={"intelligence"}
                    register={register}
                  />
                  <PowerStatusInput
                    heroi={heroi}
                    label={"Poder"}
                    setHeroi={setHeroi}
                    value={heroi.powerstats.power}
                    errors={errors.power?.message?.toString()}
                    name={"power"}
                    register={register}
                  />
                  <PowerStatusInput
                    heroi={heroi}
                    label={"Velocidade"}
                    setHeroi={setHeroi}
                    value={heroi.powerstats.speed}
                    errors={errors.speed?.message?.toString()}
                    name={"speed"}
                    register={register}
                  />
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
                      <InputPadrao
                        heroi={heroi}
                        label={"Nome Completo"}
                        name="full-name"
                        register={register}
                        setHeroi={setHeroi}
                        value={heroi.biography["full-name"]}
                        errors={errors["full-name"]?.message?.toString()}
                      />
                      <InputPadrao
                        heroi={heroi}
                        label={"Herois/Vilão"}
                        name="alignment"
                        register={register}
                        setHeroi={setHeroi}
                        value={heroi.biography.alignment}
                        errors={errors.alignment?.message?.toString()}
                      />
                      <InputPadrao
                        heroi={heroi}
                        label={"Personalidades"}
                        name="alter-egos"
                        register={register}
                        setHeroi={setHeroi}
                        value={heroi.biography["alter-egos"]}
                        errors={errors["alter-egos"]?.message?.toString()}
                      />
                      <InputPadrao
                        heroi={heroi}
                        label={"Primeira Atuação"}
                        name="first-appearance"
                        register={register}
                        setHeroi={setHeroi}
                        value={heroi.biography["first-appearance"]}
                        errors={errors["first-appearance"]?.message?.toString()}
                      />
                      <InputPadrao
                        heroi={heroi}
                        label={"Cidade que nasceu"}
                        name="place-of-birth"
                        register={register}
                        setHeroi={setHeroi}
                        value={heroi.biography["place-of-birth"]}
                        errors={errors["place-of-birth"]?.message?.toString()}
                      />
                      <InputPadrao
                        heroi={heroi}
                        label={"Editora"}
                        name="publisher"
                        register={register}
                        setHeroi={setHeroi}
                        value={heroi.biography.publisher}
                        errors={errors.publisher?.message?.toString()}
                      />
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
                    <InputPadrao
                      heroi={heroi}
                      label={"Genero"}
                      name="gender"
                      register={register}
                      setHeroi={setHeroi}
                      value={heroi.appearance.gender}
                      errors={errors.gender?.message?.toString()}
                    />
                    <InputPadrao
                      heroi={heroi}
                      label={"Peso"}
                      name="weight"
                      register={register}
                      setHeroi={setHeroi}
                      value={heroi.appearance.weight[1]?.substring(0, 3)}
                      errors={errors.weight?.message?.toString()}
                    />
                    <InputPadrao
                      heroi={heroi}
                      label={"Raça"}
                      name="race"
                      register={register}
                      setHeroi={setHeroi}
                      value={heroi.appearance.race}
                      errors={errors.race?.message?.toString()}
                    />
                    <InputPadrao
                      heroi={heroi}
                      label={"Altura"}
                      name="height"
                      register={register}
                      setHeroi={setHeroi}
                      value={heroi.appearance.height[1]?.substring(0, 3)}
                      errors={errors.height?.message?.toString()}
                    />
                    <InputPadrao
                      heroi={heroi}
                      label={"Cor do Cabelo"}
                      name="hair-color"
                      register={register}
                      setHeroi={setHeroi}
                      value={heroi.appearance["hair-color"]}
                      errors={errors["hair-color"]?.message?.toString()}
                    />
                    <InputPadrao
                      heroi={heroi}
                      label={"Cor dos olhos"}
                      name="eye-color"
                      register={register}
                      setHeroi={setHeroi}
                      value={heroi.appearance["eye-color"]}
                      errors={errors["eye-color"]?.message?.toString()}
                    />
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
                        {...register("occupation")}
                        name="occupation"
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
                        {...register("relatives")}
                        name="relatives"
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
                        {...register("group-affiliation")}
                        name="group-affiliation"
                        placeholder="Familiares do heroi"
                        width="241px"
                        resize="none"
                        value={heroi?.connections["group-affiliation"]}
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
                  <Button
                    value="Atualizar"
                    type="submit"
                    bgColor="blue.500"
                    color="white"
                    cursor="pointer"
                    onClick={() => {
                      setaValores(setValue, heroi);
                    }}
                  >
                    Atualizar
                  </Button>
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
