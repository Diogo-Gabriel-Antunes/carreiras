import { Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { Appearance } from "../../../interface/IHerois";

interface Props {
  aparencia: Appearance | undefined;
}

const Aparencia = ({ aparencia }: Props) => {
  return (
    <Grid gridTemplateColumns="repeat(3,1fr)" columnGap={32} rowGap={16}>
      <GridItem display="flex" flexDirection="column" alignItems="center">
        <Heading fontSize="24px">Genero</Heading>
        <Text padding="24px 0" fontSize="20px">
          {aparencia?.gender === "Male" ? "Masculino" : "Feminino"}
        </Text>
      </GridItem>
      <GridItem display="flex" flexDirection="column" alignItems="center">
        <Heading fontSize="24px">Raça</Heading>
        <Text padding="24px 0" fontSize="20px">
          {aparencia?.race}
        </Text>
      </GridItem>
      <GridItem display="flex" flexDirection="column" alignItems="center">
        <Heading fontSize="24px">Altura</Heading>
        <Text padding="24px 0" fontSize="20px">
          {aparencia?.height[1]}
        </Text>
      </GridItem>
      <GridItem display="flex" flexDirection="column" alignItems="center">
        <Heading fontSize="24px">Peso</Heading>
        <Text padding="24px 0" fontSize="20px">
          {aparencia?.weight[1]}
        </Text>
      </GridItem>
      <GridItem display="flex" flexDirection="column" alignItems="center">
        <Heading fontSize="24px">Cor do olho</Heading>
        <Text padding="24px 0" fontSize="20px">
          {aparencia?.["eye-color"]}
        </Text>
      </GridItem>
      <GridItem display="flex" flexDirection="column" alignItems="center">
        <Heading fontSize="24px">Cor do cabelo</Heading>
        <Text padding="24px 0" fontSize="20px">
          {aparencia?.["hair-color"]}
        </Text>
      </GridItem>
    </Grid>
  );
};

export default Aparencia;
