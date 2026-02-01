import { Field, Input, FieldLabel } from "@chakra-ui/react";
import type { FC } from "react";
import { DatePicker as ReactDatePicker } from "react-datepicker";
import type { DatePickerProps as ReactDatePickerProps } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./index.css";

type DatepickerProps = ReactDatePickerProps & {
  label?: string;
};

const Datepicker: FC<DatepickerProps> = ({ label, ...datepickerProps }) => {
  return (
    <Field.Root gap="0" w={"full"}>
      {label && <FieldLabel>{label}</FieldLabel>}
      <ReactDatePicker
        customInput={<Input w={"full"} />}
        {...datepickerProps}
      />
    </Field.Root>
  );
};

export default Datepicker;
