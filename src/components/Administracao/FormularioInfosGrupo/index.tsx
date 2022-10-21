import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { IGrupo } from "../../../interface/IGrupos";

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
  return (
    <Box padding="100px">
      <Heading textAlign="center">{titulo}</Heading>
      <FormControl as="form" width="100%">
        <Box
          display="flex"
          alignItems="center"
          height="250px"
          flexDirection="column"
          margin="0 auto"
        >
          <Box margin="24px 0">
            <FormLabel>{label}</FormLabel>
            <Input
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
                  if (parametrosDaFuncao.length === 3) {
                    funcaoDoBotao(
                      parametrosDaFuncao[0],
                      parametrosDaFuncao[1],
                      parametrosDaFuncao[2]
                    );
                  } else {
                    funcaoDoBotao(parametrosDaFuncao[0], parametrosDaFuncao[1]);
                  }
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
