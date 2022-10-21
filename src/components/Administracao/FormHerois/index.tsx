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
      <Box margin="32px">
        <FormLabel textAlign="center">{label}</FormLabel>
        <NumberInput
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
        {errors}
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
      <Box margin="32px">
        <FormLabel textAlign="center">{label}</FormLabel>
        <Box margin="32px">
          <>
            <Input
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
            {errors}
          </>
        </Box>
      </Box>
    </>
  );
};
export const AparenciaInput = ({
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
      <Box margin="32px">
        <FormLabel textAlign="center">height</FormLabel>

        <Input
          {...register("height")}
          type="number"
          name={"height"}
          placeholder={`height do heroi `}
          value={heroi?.appearance?.height[1]?.substring(0, 3)}
          onChange={(e) => {
            const novoEstado = Object.assign({}, heroi);
            novoEstado.appearance.height = [
              `${Number(e.target.value) * 1.5}`,
              `${Number(e.target.value)}`,
            ];

            setHeroi(novoEstado);
          }}
        />
      </Box>
    </>
  );
};
