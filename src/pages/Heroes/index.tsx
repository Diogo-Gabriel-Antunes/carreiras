import { Box, Button, Grid, IconButton } from "@chakra-ui/react";
import { useContext, useState } from "react";
import CardHero from "../../components/Heroes/CardHero";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { HeroisContext } from "../../context/HeroisContext";
import { SearchIcon, ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
const Heroes = () => {
  const contexto = useContext(HeroisContext);
  const [pagina, setPagina] = useState(1);
  const [sliceStart, setSliceStart] = useState(0);
  const [sliceEnd, setSliceEnd] = useState(10);
  return (
    <Box>
      <Box>
        <NavBar />
      </Box>
      <Box marginY="64px">
        <Grid templateColumns="repeat(5, 1fr)" gap={8}>
          {contexto?.herois?.slice(sliceStart, sliceEnd).map((heroi) => (
            <CardHero hero={heroi} infos={true} />
          ))}
        </Grid>
      </Box>
      <Box display="flex">
        <Box margin="0 auto">
          <IconButton
            colorScheme="blue"
            aria-label="Search database"
            icon={<ArrowBackIcon />}
            margin="0px 12px"
            onClick={() => {
              setSliceStart(sliceStart - 10);
              setSliceEnd(sliceEnd - 10);
              setPagina(pagina - 1);
            }}
          />
          {pagina}
          <IconButton
            colorScheme="blue"
            aria-label="Search database"
            icon={<ArrowForwardIcon />}
            margin="0px 12px"
            onClick={() => {
              setSliceStart(sliceStart + 10);
              setSliceEnd(sliceEnd + 10);
              setPagina(pagina + 1);
            }}
          />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Heroes;
