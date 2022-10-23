import { Heading, Button, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NavBarAdministracao = () => {
  return (
    <Box bgColor={"blue.500"} height={"100%"} width="300px" color="blue.900">
      <Heading textAlign="center" padding="32px 0px">
        Heros
      </Heading>

      <Link to="/">
        <Button padding="12px" width="100%" borderRadius="0" colorScheme="blue">
          Herois
        </Button>
      </Link>
      <Link to="/grupos">
        <Button padding="12px" width="100%" borderRadius="0" colorScheme="blue">
          Grupo de herois
        </Button>
      </Link>
    </Box>
  );
};

export default NavBarAdministracao;
