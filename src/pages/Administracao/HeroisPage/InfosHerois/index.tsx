import {
  Box,
  Heading,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBarAdministracao from "../../../../components/Administracao/Navbar";
import Alicao from "../../../../components/Heroes/Aliação";
import Aparencia from "../../../../components/Heroes/Aparencia";
import Biografia from "../../../../components/Heroes/Biografia";
import PowerStats from "../../../../components/Heroes/PowerStats";
import Trabalho from "../../../../components/Heroes/Trabalho";
import { HeroisContext } from "../../../../context/HeroisContext";
import { IHeroi } from "../../../../interface/IHerois";

const InfosHerois = () => {
  const context = useContext(HeroisContext);
  const parametros = useParams();
  const [heroi, setHeroi] = useState<IHeroi>();

  useEffect(() => {
    const heroi = context?.herois?.filter(
      (herois) => herois.id === parametros.id
    )[0];
    heroi && setHeroi(heroi);
  }, [context]);
  return (
    <Box display="flex">
      <Box minHeight="100vh">
        <NavBarAdministracao />
      </Box>
      <Box margin="0 auto">
        <Box
          backgroundColor={"blue.300"}
          backgroundSize={"1920px"}
          display="flex"
          width="100%"
        >
          <Box margin="50px auto" display="flex" color={"white"}>
            <Box width={"829px"} margin="0px 100px">
              <Heading>{heroi?.name}</Heading>
              <Text marginTop={"12px"}>
                <strong> Apelidos </strong>:{" "}
                {heroi?.biography?.aliases?.map((apelido, index) => (
                  <>
                    {" "}
                    {apelido}
                    {heroi?.biography?.aliases.length === index + 1 ? "." : ","}
                  </>
                ))}
              </Text>

              <PowerStats status={heroi?.powerstats} />
            </Box>
            <Box>
              <Image
                src={heroi?.image?.url}
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
            borderColor="blue.300"
            borderRadius="24px"
            padding="32px"
            width="1240px"
          >
            <Tabs isFitted variant="enclosed">
              <TabList mb="1em">
                <Tab>Caracteristicas</Tab>
                <Tab>Biografia</Tab>
                <Tab>Trabalho</Tab>
                <Tab>Afiliacao</Tab>
              </TabList>
              <TabPanels width={"1115px"}>
                <TabPanel>
                  <Aparencia aparencia={heroi?.appearance} />
                </TabPanel>
                <TabPanel>
                  <Biografia biografia={heroi?.biography} />
                </TabPanel>
                <TabPanel>
                  <Trabalho trabalho={heroi?.work} />
                </TabPanel>
                <TabPanel>
                  <Alicao conexao={heroi?.connections} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default InfosHerois;
