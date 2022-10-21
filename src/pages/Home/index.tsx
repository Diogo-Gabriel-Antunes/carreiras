import { Box, Grid, Heading, Image, Text } from "@chakra-ui/react";
import { useContext } from "react";
import CardHero from "../../components/Heroes/CardHero";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { HeroisContext } from "../../context/HeroisContext";
import { IHeroi } from "../../interface/IHerois";

const Home = () => {
  const context = useContext(HeroisContext);
  return (
    <Box>
      <Box>
        <NavBar />
      </Box>
      <Box>
        <Box
          backgroundColor={"blackAlpha.700"}
          backgroundSize={"1920px"}
          display="flex"
        >
          <Box margin="50px auto" display="flex" color={"white"}>
            <Box width={"400px"} margin="0px 100px">
              <Heading>
                Aqui voce encontra tudo sobre seus herois e vilões favoritos
              </Heading>
              <Text marginTop={"24px"}>
                Bem vindo a wikipedia dos super herois/viloões, embarque com a
                gente nessa aventura
              </Text>
              <Text fontWeight="bold" marginTop={"24px"}>
                Aqui voce pode ficar por dentro dos PowerStats dos seu herois
              </Text>
            </Box>
            <Box>
              <Image
                src={context?.herois ? context?.herois[0]?.image?.url : ""}
                width="250px"
                margin="0px 100px"
                borderRadius={"12px"}
              />
              <Text margin="15px 100px" fontSize={"15px"} textAlign="center">
                {context?.herois ? context?.herois[0]?.name : ""}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box width="100%">
        <Box margin={"50px 0px"}>
          <Heading textAlign="center">
            Alguns dos nossos herois e vilões
          </Heading>
        </Box>
        <Box>
          <Grid templateColumns="repeat(4, 1fr)" gap={12}>
            {context?.herois?.slice(1, 9).map((hero: IHeroi, index: any) => (
              <CardHero hero={hero} key={hero.name} />
            ))}
          </Grid>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;
