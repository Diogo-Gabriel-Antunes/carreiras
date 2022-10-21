import { SearchIcon, ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";

interface Props {
  sliceStart: number;
  sliceEnd: number;
  pagina: number;
  setSliceStart: React.Dispatch<React.SetStateAction<number>>;
  setSliceEnd: React.Dispatch<React.SetStateAction<number>>;
  setPagina: React.Dispatch<React.SetStateAction<number>>;
  numeroPorPagina: number;
  tamanhoMaximo: number | undefined;
}

const Pagination = ({
  sliceStart,
  sliceEnd,
  pagina,
  setPagina,
  setSliceEnd,
  setSliceStart,
  numeroPorPagina,
  tamanhoMaximo,
}: Props) => {
  return (
    <>
      <IconButton
        colorScheme="blue"
        aria-label="Search database"
        icon={<ArrowBackIcon />}
        margin="0px 12px"
        onClick={() => {
          if (sliceStart - numeroPorPagina > 0) {
            setSliceStart(sliceStart - numeroPorPagina);
            setSliceEnd(sliceEnd - numeroPorPagina);
            setPagina(pagina - 1);
          } else {
            setSliceStart(0);
            setSliceEnd(numeroPorPagina);
            setPagina(1);
          }
        }}
      />
      {pagina}
      <IconButton
        colorScheme="blue"
        aria-label="Search database"
        icon={<ArrowForwardIcon />}
        margin="0px 12px"
        onClick={() => {
          if (tamanhoMaximo) {
            if (sliceEnd + 6 >= tamanhoMaximo) {
              setSliceStart(tamanhoMaximo - 6);
              setSliceEnd(tamanhoMaximo);
              setPagina(pagina);
            } else {
              if (tamanhoMaximo) {
                setSliceStart(sliceStart + 6);
                setSliceEnd(sliceEnd + 6);
                setPagina(pagina + 1);
              }
            }
          }
        }}
      />
    </>
  );
};

export default Pagination;
