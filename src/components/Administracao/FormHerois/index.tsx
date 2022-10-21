import {
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { IHeroi } from "../../../interface/IHerois";

interface Props {
  status: string;
  heroi: IHeroi;
  setHeroi: React.Dispatch<any>;
  label: string;
}

const FormHerois = ({ status, heroi, setHeroi, label }: Props) => {
  return (
    <>
      <FormLabel textAlign="center">{label}</FormLabel>
      <NumberInput
        step={1}
        defaultValue={0}
        min={0}
        max={100}
        value={heroi?.powerstats?.power}
        onChange={(e: any) => {
          const novoEstado = Object.assign({}, heroi);
          novoEstado.powerstats.power = e;
          setHeroi(novoEstado);
        }}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </>
  );
};

export default FormHerois;
