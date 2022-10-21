import {
  Heading,
  Input,
  Button,
  Box,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { SearchIcon } from "@chakra-ui/icons";

const NavBar = () => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      padding="0 32px"
      bgColor="blackAlpha.900"
      alignItems="center"
    >
      <Heading color="whiteAlpha.900">
        <Link to="/">Heroes</Link>
      </Heading>
      <Box display="flex" alignItems="center" paddingLeft="65px">
        <Text color="whiteAlpha.900" textTransform="uppercase" fontWeight="700">
          <Link to="/heroes">Heroes</Link>
        </Text>
        <Box
          display="flex"
          alignItems="center"
          margin="12px 32px"
          position="relative"
        >
          <Input
            placeholder="Pesquise Seu Heroi Favorito"
            bgColor="whiteAlpha.900"
            minWidth="300px"
          />
          <Button
            position="absolute"
            left="85%"
            bgColor="gray.600"
            borderRadius="0px 8px 8px 0px"
            width="50px"
          >
            <IconButton
              aria-label="Search database"
              icon={<SearchIcon />}
              bgColor="gray.600"
              color="whiteAlpha.900"
            />
          </Button>
        </Box>
      </Box>
      <Box>
        <Link to="/herois">
          <Button
            bgColor="gray.600"
            borderRadius="8px "
            color="whiteAlpha.900"
            minWidth="100px"
            height="30px"
          >
            Admininstração
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default NavBar;
