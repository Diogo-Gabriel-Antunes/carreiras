import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

interface Props {
  titulo: string;
  label: string;
  valorInput: string | undefined;
  valorBotao?: string;
  onChangeDoInput: Dispatch<SetStateAction<string | undefined>> | any;
  funcaoDoBotao: any;
  parametrosDaFuncao?: any[];
}

const FormInfosGrupo = ({
  titulo,
  label,
  valorInput,
  valorBotao,
  onChangeDoInput,
  funcaoDoBotao,
  parametrosDaFuncao,
}: Props) => {
  console.log(parametrosDaFuncao);
  return (
    <Box padding="100px">
      <Heading textAlign="center">{titulo}</Heading>
      <FormControl as="form" width="100%">
        <Box
          display="flex"
          alignItems="center"
          height="250px"
          flexDirection="column"
          margin="24px auto"
          border="2px solid"
          borderColor="blue.700"
          padding="20px 0"
          borderRadius={12}
        >
          <Box margin="32px">
            <FormLabel textAlign="center">{label}</FormLabel>
            <Input
              borderColor="blue.500"
              variant="filled"
              required
              defaultValue={valorInput}
              onChange={(e) => onChangeDoInput(e.target.value)}
            />
          </Box>
          <Box>
            <Button
              colorScheme="blue"
              onClick={() => {
                if (parametrosDaFuncao) {
                  parametrosDaFuncao.length === 3
                    ? funcaoDoBotao(
                        parametrosDaFuncao[0],
                        parametrosDaFuncao[1],
                        parametrosDaFuncao[2]
                      )
                    : funcaoDoBotao(
                        parametrosDaFuncao[0],
                        parametrosDaFuncao[1]
                      );
                }
              }}
            >
              {valorBotao}
            </Button>
          </Box>
        </Box>
      </FormControl>
    </Box>
  );
};

export default FormInfosGrupo;
