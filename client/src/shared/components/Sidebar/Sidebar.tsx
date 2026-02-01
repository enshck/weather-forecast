import { VStack, Button } from "@chakra-ui/react";
import { useState } from "react";

import CitySearch from "@/shared/components/Sidebar/components/CitySearch";
import Datepicker from "@/shared/components/Datepicker";
import Slider from "@/shared/components/Slider";

interface FormData {
  city: string | null;
  startDate: Date | null;
  daysCount: number;
}

export const Sidebar = () => {
  const [formData, setFormData] = useState<FormData>({
    city: null,
    startDate: new Date(),
    daysCount: 3,
  });

  const onChange = (key: string, value: string | number | Date | null) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <VStack p={2} gap={3}>
      <CitySearch
        value={formData.city ? [formData.city] : []}
        onChange={(value) => onChange("city", value[0])}
      />
      <Datepicker
        minDate={new Date()}
        label="Start date"
        placeholderText="Start date"
        selected={formData.startDate}
        dateFormat={"yyyy-MM-dd"}
        onChange={(date: Date | null) => onChange("startDate", date)}
      />
      <Slider
        step={1}
        min={1}
        max={3}
        marks={[1, 2, 3]}
        label="Max days"
        value={[formData.daysCount]}
        onValueChange={(value) => onChange("daysCount", value.value[0])}
      />
      <Button w="full" mt={3} disabled={!formData.city}>
        Generate Forecast To Sheet
      </Button>
    </VStack>
  );
};
