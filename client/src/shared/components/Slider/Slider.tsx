import {
  Slider as ChakraSlider,
  type SliderRootProps,
  Field,
  FieldLabel,
} from "@chakra-ui/react";
import { type FC } from "react";

type SliderProps = SliderRootProps & {
  marks?: number[];
  label?: string;
};

const Slider: FC<SliderProps> = ({ marks, label, ...sliderProps }) => {
  return (
    <Field.Root gap="0" w={"full"}>
      {label && <FieldLabel>{label}</FieldLabel>}
      <ChakraSlider.Root w={"full"} {...sliderProps}>
        <ChakraSlider.Control>
          <ChakraSlider.Track>
            <ChakraSlider.Range />
          </ChakraSlider.Track>
          <ChakraSlider.Thumbs />
          {marks && <ChakraSlider.Marks marks={marks} />}
        </ChakraSlider.Control>
      </ChakraSlider.Root>
    </Field.Root>
  );
};

export default Slider;
