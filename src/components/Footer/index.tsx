import { Box, Heading, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box width="100%" display="flex" bgColor="blackAlpha.900" marginTop="75px">
      <Box margin="32px auto" color="white" display="flex" alignItems="center">
        <Text fontSize="16px" paddingRight="4px">
          Desenvolvido por :
        </Text>

        <Heading fontSize="18px">{"  "} Diogo Gabriel Antunes</Heading>
      </Box>
    </Box>
  );
};

export default Footer;
