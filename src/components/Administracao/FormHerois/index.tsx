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
