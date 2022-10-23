import { Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { Work } from "../../../interface/IHerois";

interface Props {
  trabalho: Work | undefined;
}
const Trabalho = ({ trabalho }: Props) => {
  return (
    <Grid
      gridTemplateColumns="repeat(2,1fr)"
      columnGap={64}
      rowGap={16}
      width={"1115px"}
      minHeight="320px"
      alignItems="center"
    >
      <GridItem display="flex" flexDirection="column" alignItems="center">
        <Heading fontSize="24px">Base de trabalho</Heading>
        <Text padding="24px 0" fontSize="20px">
          {trabalho?.base}
        </Text>
      </GridItem>
      <GridItem display="flex" flexDirection="column" alignItems="center">
        <Heading fontSize="24px">Profissão</Heading>
        <Text padding="24px 0" fontSize="20px">
          {trabalho?.occupation}
        </Text>
      </GridItem>
    </Grid>
  );
};

export default Trabalho;
