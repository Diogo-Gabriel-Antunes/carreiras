import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

interface Props {
  status: string | number | undefined;
}
const CirculoProgressivo = ({ status }: Props) => {
  return (
    <CircularProgress value={Number(status)} color="green.400" size="50px">
      <CircularProgressLabel>{status}</CircularProgressLabel>
    </CircularProgress>
  );
};

export default CirculoProgressivo;
