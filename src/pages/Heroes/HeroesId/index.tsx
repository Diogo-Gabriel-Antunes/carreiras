import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Container,
  Grid,
  GridItem,
  Heading,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../../components/Footer";
import Alicao from "../../../components/Heroes/Aliação";
import Aparencia from "../../../components/Heroes/Aparencia";
import Biografia from "../../../components/Heroes/Biografia";
import PowerStats from "../../../components/Heroes/PowerStats";
import Trabalho from "../../../components/Heroes/Trabalho";
import NavBar from "../../../components/NavBar";
import { HeroisContext } from "../../../context/HeroisContext";

const HeroesId = () => {
  const parametro = useParams();
  const context = useContext(HeroisContext);
  const herois = context?.herois?.filter(
    (herois) => herois.id === parametro.id
  )[0];
  console.log(herois);
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
              <Heading>{herois?.name}</Heading>
              <Text marginTop={"12px"}>
                <strong> Apelidos </strong>:{" "}
                {herois?.biography?.aliases?.map((apelido, index) => (
                  <>
                    {" "}
                    {apelido}
                    {herois?.biography?.aliases.length === index + 1
                      ? "."
                      : ","}
                  </>
                ))}
              </Text>

              <PowerStats status={herois?.powerstats} />
            </Box>
            <Box>
              <Image
                src={herois?.image?.url}
                width="396px"
                margin="0px 100px"
                borderRadius={"12px"}
              />
              <Text
                margin="15px 100px"
                fontSize={"15px"}
                textAlign="center"
              ></Text>
            </Box>
          </Box>
        </Box>
        <Box display="flex">
          <Box
            margin="32px auto"
            border="3px solid"
            borderColor="gray.500"
            borderRadius="24px"
            padding="32px"
          >
            <Tabs isFitted variant="enclosed">
              <TabList mb="1em">
                <Tab>Caracteristicas</Tab>
                <Tab>Biografia</Tab>
                <Tab>Trabalho</Tab>
                <Tab>Afiliacao</Tab>
              </TabList>
              <TabPanels minWidth="1280px">
                <TabPanel>
                  <Aparencia aparencia={herois?.appearance} />
                </TabPanel>
                <TabPanel>
                  <Biografia biografia={herois?.biography} />
                </TabPanel>
                <TabPanel>
                  <Trabalho trabalho={herois?.work} />
                </TabPanel>
                <TabPanel>
                  <Alicao conexao={herois?.connections} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default HeroesId;
