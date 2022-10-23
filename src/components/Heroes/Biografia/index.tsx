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
      width={"1115px"}
      minHeight="320px"
    >
      <GridItem display="flex" flexDirection="column" alignItems="center">
        <Heading fontSize="24px">Heroi/Vilão</Heading>
        <Text padding="24px 0" fontSize="20px">
          {biografia?.alignment === "good" ? "Heroi" : "Vilão"}
        </Text>
      </GridItem>
      <GridItem display="flex" flexDirection="column" alignItems="center">
        <Heading fontSize="24px">Nome Completo</Heading>
        <Text padding="24px 0" fontSize="20px">
          {biografia?.["full-name"]}
        </Text>
      </GridItem>
      <GridItem display="flex" flexDirection="column" alignItems="center">
        <Heading fontSize="24px">Personalidades</Heading>
        <Text padding="24px 0" fontSize="20px">
          {biografia?.["alter-egos"] === "No alter egos found."
            ? "Sem pernosalidades"
            : biografia?.["alter-egos"]}
        </Text>
      </GridItem>
      <GridItem
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
      >
        <Heading fontSize="20px">Primereira Aparição</Heading>
        <Text padding="24px 0" fontSize="20px">
          {biografia?.["first-appearance"]}
        </Text>
      </GridItem>
      <GridItem display="flex" flexDirection="column" alignItems="center">
        <Heading fontSize="24px"> Nacionalidade</Heading>
        <Text padding="24px 0" fontSize="20px">
          {biografia?.["place-of-birth"]}
        </Text>
      </GridItem>
      <GridItem display="flex" flexDirection="column" alignItems="center">
        <Heading fontSize="24px">Editora</Heading>
        <Text padding="24px 0" fontSize="20px">
          {biografia?.publisher}
        </Text>
      </GridItem>
    </Grid>
  );
};

export default Biografia;
