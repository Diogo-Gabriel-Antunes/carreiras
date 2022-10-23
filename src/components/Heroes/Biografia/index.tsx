import { Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { Biography } from "../../../interface/IHerois";

interface Props {
  biografia: Biography | undefined;
}

const Biografia = ({ biografia }: Props) => {
  return (
    <Grid
      gridTemplateColumns="repeat(3,1fr)"
      columnGap={64}
      rowGap={16}
      minWidth="1567px"
      minHeight="320px"
    >
      <GridItem display="flex" flexDirection="column" alignItems="center">
        <Heading>Heroi/Vilão</Heading>
        <Text padding="24px 0" fontSize="24px">
          {biografia?.alignment === "good" ? "Heroi" : "Vilão"}
        </Text>
      </GridItem>
      <GridItem display="flex" flexDirection="column" alignItems="center">
        <Heading>Nome Completo</Heading>
        <Text padding="24px 0" fontSize="24px">
          {biografia?.["full-name"]}
        </Text>
      </GridItem>
      <GridItem display="flex" flexDirection="column" alignItems="center">
        <Heading>Personalidades</Heading>
        <Text padding="24px 0" fontSize="24px">
          {biografia?.["alter-egos"] === "No alter egos found."
            ? "Sem pernosalidades"
            : biografia?.["alter-egos"]}
        </Text>
      </GridItem>
      <GridItem display="flex" flexDirection="column" alignItems="center">
        <Heading>Primereira Aparição</Heading>
        <Text padding="24px 0" fontSize="24px">
          {biografia?.["first-appearance"]}
        </Text>
      </GridItem>
      <GridItem display="flex" flexDirection="column" alignItems="center">
        <Heading>Nacionalidade</Heading>
        <Text padding="24px 0" fontSize="24px">
          {biografia?.["place-of-birth"]}
        </Text>
      </GridItem>
      <GridItem display="flex" flexDirection="column" alignItems="center">
        <Heading>Editora</Heading>
        <Text padding="24px 0" fontSize="24px">
          {biografia?.publisher}
        </Text>
      </GridItem>
    </Grid>
  );
};

export default Biografia;
