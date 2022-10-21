import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Grid,
  GridItem,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Powerstats } from "../../../interface/IHerois";

interface Props {
  status: Powerstats | undefined;
}

const PowerStats = ({ status }: Props) => {
  return (
    <Box
      bgColor="white"
      color="gray.700"
      padding="24px"
      marginTop="45px"
      borderRadius="12px"
      border="3px solid"
      borderColor="gray.500"
    >
      <Heading textAlign="center" marginBottom="24px">
        PowerStats
      </Heading>
      <Grid gridTemplateColumns={"repeat(3,1fr)"} gap={8} padding="12px">
        <GridItem display="flex" alignItems="center" flexDirection="column">
          <Text>
            <strong>Combate</strong>{" "}
          </Text>
          <CircularProgress
            value={Number(status?.combat)}
            color="green.400"
            size="75px"
          >
            <CircularProgressLabel>{status?.combat}</CircularProgressLabel>
          </CircularProgress>
        </GridItem>
        <GridItem display="flex" alignItems="center" flexDirection="column">
          <Text>
            <strong>Força</strong>{" "}
          </Text>
          <CircularProgress
            value={Number(status?.strength)}
            color="green.400"
            size="75px"
          >
            <CircularProgressLabel>{status?.strength}</CircularProgressLabel>
          </CircularProgress>
        </GridItem>
        <GridItem display="flex" alignItems="center" flexDirection="column">
          <Text>
            <strong>inteligencia</strong>{" "}
          </Text>
          <CircularProgress
            value={Number(status?.intelligence)}
            color="green.400"
            size="75px"
          >
            <CircularProgressLabel>
              {status?.intelligence}
            </CircularProgressLabel>
          </CircularProgress>
        </GridItem>
        <GridItem display="flex" alignItems="center" flexDirection="column">
          <Text>
            <strong>Poder</strong>{" "}
          </Text>
          <CircularProgress
            value={Number(status?.power)}
            color="green.400"
            size="75px"
          >
            <CircularProgressLabel>{status?.power}</CircularProgressLabel>
          </CircularProgress>
        </GridItem>
        <GridItem display="flex" alignItems="center" flexDirection="column">
          <Text>
            <strong>Durabilidade</strong>{" "}
          </Text>
          <CircularProgress
            value={Number(status?.durability)}
            color="green.400"
            size="75px"
          >
            <CircularProgressLabel>{status?.durability}</CircularProgressLabel>
          </CircularProgress>
        </GridItem>
        <GridItem display="flex" alignItems="center" flexDirection="column">
          <Text>
            <strong>Velocidade</strong>{" "}
          </Text>
          <CircularProgress
            value={Number(status?.speed)}
            color="green.400"
            size="75px"
          >
            <CircularProgressLabel>{status?.speed}</CircularProgressLabel>
          </CircularProgress>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default PowerStats;
