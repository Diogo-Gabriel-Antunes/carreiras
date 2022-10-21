import { Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { Appearance } from "../../../interface/IHerois";

interface Props {
  aparencia: Appearance | undefined;
}

const Aparencia = ({ aparencia }: Props) => {
  return (
    <Grid
      gridTemplateColumns="repeat(3,1fr)"
      columnGap={64}
      rowGap={16}
      minWidth="1567px"
      minHeight="320px"
    >
      <GridItem display="flex" flexDirection="column" alignItems="center">
        <Heading>Genero</Heading>
        <Text padding="24px 0" fontSize="24px">
          {aparencia?.gender === "Male" ? "Masculino" : "Feminino"}
        </Text>
      </GridItem>
      <GridItem display="flex" flexDirection="column" alignItems="center">
        <Heading>Raça</Heading>
        <Text padding="24px 0" fontSize="24px">
          {aparencia?.race}
        </Text>
      </GridItem>
      <GridItem display="flex" flexDirection="column" alignItems="center">
        <Heading>Altura</Heading>
        <Text padding="24px 0" fontSize="24px">
          {aparencia?.height[1]}
        </Text>
      </GridItem>
      <GridItem display="flex" flexDirection="column" alignItems="center">
        <Heading>Peso</Heading>
        <Text padding="24px 0" fontSize="24px">
          {aparencia?.weight[1]}
        </Text>
      </GridItem>
      <GridItem display="flex" flexDirection="column" alignItems="center">
        <Heading>Cor do olho</Heading>
        <Text padding="24px 0" fontSize="24px">
          {aparencia?.["eye-color"]}
        </Text>
      </GridItem>
      <GridItem display="flex" flexDirection="column" alignItems="center">
        <Heading>Cor do cabelo</Heading>
        <Text padding="24px 0" fontSize="24px">
          {aparencia?.["hair-color"]}
        </Text>
      </GridItem>
    </Grid>
  );
};

export default Aparencia;
