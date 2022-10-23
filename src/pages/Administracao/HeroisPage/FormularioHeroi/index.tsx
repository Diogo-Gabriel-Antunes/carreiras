import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Select,
  SimpleGrid,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  InputPadrao,
  PowerStatusInput,
} from "../../../../components/Administracao/FormHerois";
import NavBarAdministracao from "../../../../components/Administracao/Navbar";
import { HeroisContext } from "../../../../context/HeroisContext";
import { IHeroi } from "../../../../interface/IHerois";
import { useForm, UseFormSetValue, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import esquemaDeValidacoes, { esquema } from "../../../../SchemaValidacao";

const atualizaHerois = (Lista: IHeroi[], idDoHeroi: string, heroi: IHeroi) => {
  Lista.reduce((listaAntiga: IHeroi[], heroiAtualizado: IHeroi) => {
    let obj = idDoHeroi.includes(heroiAtualizado.id ? heroiAtualizado.id : "")
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

const reformaHeroi = (heroi: esquema, id: string): IHeroi => {
  return {
    id: id,
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
    const id = parametros.id ? parametros.id : "";
    const heroiReformado = reformaHeroi(heroi, id);
    if (parametros.id && context?.herois) {
      atualizaHerois(context.herois, parametros.id, heroiReformado);
      navigate("/");
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

  useEffect(() => {
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
                <InputPadrao
                  heroi={heroi}
                  label={"Nome"}
                  setHeroi={setHeroi}
                  value={heroi?.name}
                  errors={errors?.name?.message?.toString()}
                  name={"name"}
                  register={register}
                />
              </Box>
              <Box margin="0 auto">
                <InputPadrao
                  heroi={heroi}
                  label={"Imagem(URL)"}
                  setHeroi={setHeroi}
                  value={heroi?.image.url}
                  errors={errors?.url?.message?.toString()}
                  name={"url"}
                  register={register}
                />
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
                        label={"Apelidos"}
                        name="aliases"
                        register={register}
                        setHeroi={setHeroi}
                        value={heroi.biography.aliases[0]}
                        errors={errors.aliases?.message?.toString()}
                      />
                      <Box
                        margin="24px"
                        border="2px solid"
                        borderColor="blue.700"
                        padding="20px 0"
                        borderRadius={12}
                      >
                        <FormLabel textAlign="center">Heroi/Vilão</FormLabel>
                        <Box margin="32px">
                          <Select
                            borderColor="blue.500"
                            variant="filled"
                            {...register("alignment")}
                            name="alignment"
                            placeholder="Heroi/Vilão"
                            width="241px"
                            value={heroi?.biography?.alignment}
                            onChange={(e) => {
                              const novoEstado = Object.assign({}, heroi);
                              novoEstado.biography.alignment = e.target.value;
                              setHeroi(novoEstado);
                            }}
                          >
                            <option value="good">Heroi</option>
                            <option value="bad">Vilão</option>
                            <option value="neutral">Neutro</option>
                          </Select>
                          <p className={`erroralignment`}>
                            {errors.alignment?.message?.toString()}
                          </p>
                        </Box>
                      </Box>
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
                    <Box
                      margin="24px"
                      border="2px solid"
                      borderColor="blue.700"
                      padding="20px 0"
                      borderRadius={12}
                    >
                      <FormLabel textAlign="center">Genero</FormLabel>
                      <Box margin="32px">
                        <Select
                          borderColor="blue.500"
                          variant="filled"
                          {...register("gender")}
                          placeholder="Genero"
                          width="207px"
                          name="gender"
                          value={heroi?.appearance?.gender}
                          onChange={(e) => {
                            const novoEstado = Object.assign({}, heroi);
                            novoEstado.appearance.gender = e.target.value;
                            setHeroi(novoEstado);
                          }}
                        >
                          <option value="Male">Masculino</option>
                          <option value="Female">Feminino</option>
                          <option value="-">Indefindo</option>
                        </Select>
                        <p className="errorgender">
                          {errors.gender?.message?.toString()}
                        </p>
                      </Box>
                    </Box>
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
                      <InputPadrao
                        heroi={heroi}
                        label={"Profissão"}
                        setHeroi={setHeroi}
                        value={heroi?.work?.occupation}
                        errors={errors?.occupation?.message?.toString()}
                        name={"occupation"}
                        register={register}
                      />
                    </Box>
                  </Box>
                  <Box display="flex">
                    <Box margin="32px">
                      <InputPadrao
                        heroi={heroi}
                        label={"Base de trabalho"}
                        setHeroi={setHeroi}
                        value={heroi?.work?.base}
                        errors={errors?.base?.message?.toString()}
                        name={"base"}
                        register={register}
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
                      <InputPadrao
                        heroi={heroi}
                        label={"Familiares"}
                        setHeroi={setHeroi}
                        value={heroi?.connections?.relatives}
                        errors={errors?.relatives?.message?.toString()}
                        name={"relatives"}
                        register={register}
                      />
                    </Box>
                  </Box>
                  <Box display="flex">
                    <Box margin="32px">
                      <InputPadrao
                        heroi={heroi}
                        label={"Vinculos"}
                        setHeroi={setHeroi}
                        value={heroi?.connections?.["group-affiliation"]}
                        errors={errors?.[
                          "group-affiliation"
                        ]?.message?.toString()}
                        name={"group-affiliation"}
                        register={register}
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
