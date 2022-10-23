import {
  GridItem,
  Heading,
  Grid,
  Text,
  Image,
  Box,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IHeroi } from "../../../interface/IHerois";

interface Props {
  hero: IHeroi;
  infos?: boolean;
}
const CardHero = ({ hero, infos = false }: Props) => {
  return (
    <GridItem display="flex">
      <Box
        border="1px solid #ccc"
        width="300px"
        margin="0 auto"
        borderRadius={"12px 12px 12px 12px"}
        height={infos ? "789px" : "679px"}
      >
        <Box width="300px">
          <Image
            src={hero?.image?.url}
            width="300px"
            height="400px"
            borderRadius={"12px 12px 0px 0px"}
          />
        </Box>
        <Box padding="12px 0px 0px 0px">
          <Box minHeight="50px" display="flex">
            <Heading as="h4" fontSize="24px" textAlign="center" margin="auto">
              {hero?.name}
            </Heading>
          </Box>
          <Box
            display="flex"
            borderTop="1px solid #ccc"
            marginY="12px"
            padding="0 12px"
            height="100%"
          >
            <Box margin="14px auto">
              <Heading fontSize="18px" textAlign="center">
                Estreiou em:
              </Heading>
              <Box paddingY="8px">
                <Text fontSize="14px">
                  {hero.biography["first-appearance"].substring(0, 50)}
                  {hero.biography["first-appearance"].length > 50 ? "..." : ""}
                </Text>
              </Box>
            </Box>
          </Box>
          <Grid
            templateColumns="repeat(2,1fr)"
            padding="16px"
            fontSize="15px"
            borderTop="1px solid #ccc"
            margin="12px 0px 0px 0px"
          >
            <GridItem>
              <Text>
                <strong>Combate</strong> :{" "}
                {hero.powerstats.combat === "null"
                  ? "0"
                  : hero.powerstats.combat}
              </Text>
            </GridItem>
            <GridItem>
              <Text>
                <strong>Força</strong> :{" "}
                {hero.powerstats.strength === "null"
                  ? "0"
                  : hero.powerstats.strength}
              </Text>
            </GridItem>
            <GridItem>
              <Text>
                <strong>inteligencia</strong> :{" "}
                {hero.powerstats.intelligence === "null"
                  ? "0"
                  : hero.powerstats.intelligence}
              </Text>
            </GridItem>
            <GridItem>
              <Text>
                <strong>Poder</strong> :{" "}
                {hero.powerstats.power === "null" ? "0" : hero.powerstats.power}
              </Text>
            </GridItem>
            <GridItem>
              <Text>
                <strong>Durabilidade</strong> :{" "}
                {hero.powerstats.durability === "null"
                  ? "0"
                  : hero.powerstats.durability}
              </Text>
            </GridItem>
            <GridItem>
              <Text>
                <strong>Velocidade</strong> :{" "}
                {hero.powerstats.speed === "null" ? "0" : hero.powerstats.speed}
              </Text>
            </GridItem>
          </Grid>
        </Box>
        {infos ? (
          <Box display="flex" borderTop="1px solid #ccc" height="100px">
            <Box margin="auto">
              <Link to={`/heroes/${hero.id}`}>
                <Button
                  bgColor="green.400"
                  color="white"
                  _hover={{ bg: "green.300" }}
                >
                  Mais infos
                </Button>
              </Link>
            </Box>
          </Box>
        ) : (
          ""
        )}
      </Box>
    </GridItem>
  );
};

export default CardHero;
