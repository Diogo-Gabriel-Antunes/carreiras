import { Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { Connections } from "../../../interface/IHerois";

interface Props {
  conexao: Connections | undefined;
}

const Alicao = ({ conexao }: Props) => {
  return (
    <Grid
      gridTemplateColumns="repeat(2,1fr)"
      columnGap={64}
      rowGap={16}
      width="1567px"
      minHeight="320px"
      alignItems="center"
    >
      <GridItem display="flex" flexDirection="column" alignItems="center">
        <Heading>vínculos</Heading>
        <Text padding="24px 0" fontSize="24px">
          {conexao?.["group-affiliation"]}
        </Text>
      </GridItem>
      <GridItem display="flex" flexDirection="column" alignItems="center">
        <Heading>Familiares</Heading>
        <Text padding="24px 0" fontSize="24px">
          {conexao?.relatives}
        </Text>
      </GridItem>
    </Grid>
  );
};

export default Alicao;
