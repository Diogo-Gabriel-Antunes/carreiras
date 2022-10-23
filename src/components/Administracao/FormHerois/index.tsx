import {
  Box,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { IHeroi } from "../../../interface/IHerois";
import { UseFormRegister, FieldValues } from "react-hook-form";

interface Props {
  heroi: IHeroi;
  setHeroi: React.Dispatch<any>;
  label: string;
  register: UseFormRegister<FieldValues>;
  value: string;
  name: string;
  errors: string | undefined;
}

export const PowerStatusInput = ({
  heroi,
  setHeroi,
  label,
  value,
  name,
  errors,
  register,
}: Props) => {
  return (
    <>
      <Box
        margin="24px"
        border="2px solid"
        borderColor="blue.700"
        padding="20px 0"
        borderRadius={12}
      >
        <FormLabel textAlign="center">{label}</FormLabel>
        <Box margin="32px">
          <NumberInput
            borderColor="blue.500"
            variant="filled"
            {...register(name)}
            name={name}
            step={1}
            defaultValue={0}
            min={0}
            max={100}
            value={value}
            onChange={(e) => {
              const novoEstado: any = Object.assign({}, heroi);
              novoEstado.powerstats[name] = e;
              setHeroi(novoEstado);
            }}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <p className={`error${name}`}>{errors}</p>
        </Box>
      </Box>
    </>
  );
};

export const InputPadrao = ({
  heroi,
  register,
  setHeroi,
  errors,
  name,
  label,
  value,
}: Props) => {
  return (
    <>
      <Box
        margin="32px"
        border="2px solid"
        borderColor="blue.700"
        padding="20px 0"
        borderRadius={12}
      >
        <FormLabel textAlign="center" fontSize="18px" data-testid="label">
          {label}
        </FormLabel>
        <Box margin="32px">
          <>
            <Input
              data-testid="input"
              borderColor="blue.500"
              variant="filled"
              {...register(name)}
              placeholder={`${label} do heroi`}
              defaultValue={value}
              name={name}
              onChange={(e) => {
                const novoEstado: any = Object.assign({}, heroi);
                novoEstado.biography[name] = e.target.value;
                setHeroi(novoEstado);
              }}
            />
            <p className={`error${name}`}>{errors}</p>
          </>
        </Box>
      </Box>
    </>
  );
};
