import { VStack, Button } from "@chakra-ui/react";
import { useMemo, useState } from "react";

import CitySearch from "@/shared/components/Sidebar/components/CitySearch";
import Datepicker from "@/shared/components/Datepicker";
import Slider from "@/shared/components/Slider";
import { putForecastToSheet } from "@/shared/serverRequests/weather";

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
  const [isGenerating, setIsGenerating] = useState(false);

  const isCurrentDateSelected =
    new Date().toDateString() === formData?.startDate?.toDateString();

  const maxDate = useMemo(() => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 14);
    return maxDate;
  }, []);

  const onChange = (key: string, value: string | number | Date | null) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onGenerateForecast = async () => {
    const { city, daysCount, startDate } = formData;

    if (!city || !startDate) {
      console.error("City and Start Date are required");
      return;
    }

    setIsGenerating(true);

    await putForecastToSheet({
      city,
      startDate: isCurrentDateSelected ? undefined : startDate.toDateString(),
      daysCount,
    });

    setIsGenerating(false);
  };

  return (
    <VStack p={4} gap={3}>
      <CitySearch
        value={formData.city ? [formData.city] : []}
        onChange={(value) => onChange("city", value[0])}
      />
      <Datepicker
        minDate={new Date()}
        maxDate={maxDate}
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
        label="Max days for forecast"
        value={[isCurrentDateSelected ? formData.daysCount : 1]}
        disabled={!isCurrentDateSelected}
        onValueChange={(value) => onChange("daysCount", value.value[0])}
      />
      <Button
        w="full"
        mt={3}
        disabled={!formData.city}
        onClick={onGenerateForecast}
        loading={isGenerating}
      >
        Generate Forecast To Sheet
      </Button>
    </VStack>
  );
};
