import {
  Combobox,
  HStack,
  Portal,
  Span,
  useListCollection,
  Spinner,
} from "@chakra-ui/react";
import debounce from "lodash.debounce";
import { useState, useEffect, useMemo, type FC } from "react";

import { type CityResponse } from "@/shared/types";
import { searchCities } from "@/shared/serverRequests";

interface CitySearchProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const CitySearchInput: FC<CitySearchProps> = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState("");
  const [collectionLoading, setCollectionLoading] = useState(false);

  const { collection, set } = useListCollection<CityResponse>({
    initialItems: [],
    itemToString: (item) => item.name,
    itemToValue: (item) => `${item.id}`,
  });

  const onChangeInputDebounce = useMemo(
    () => debounce((inputValue: string) => setInputValue(inputValue), 400),
    [setInputValue],
  );

  const fetchCities = async () => {
    setCollectionLoading(true);
    const response = await searchCities(inputValue);

    set(response);
    setCollectionLoading(false);
  };

  useEffect(() => {
    if (!inputValue.length) {
      return;
    }

    fetchCities();
  }, [inputValue]);

  return (
    <Combobox.Root
      collection={collection}
      placeholder="City name"
      onInputValueChange={(e) => onChangeInputDebounce(e.inputValue)}
      onSelect={(data) => onChange(data.value)}
      value={value}
      positioning={{ sameWidth: false, placement: "bottom-start" }}
      gap={0}
    >
      <Combobox.Label>Find City</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="City" />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>

      <Portal>
        <Combobox.Positioner>
          <Combobox.Content w={"100%"}>
            {collectionLoading ? (
              <HStack p="2">
                <Spinner size="xs" borderWidth="1px" />
                <Span>Loading...</Span>
              </HStack>
            ) : (
              collection.items?.map((city) => (
                <Combobox.Item key={city.id} item={city}>
                  <HStack justify="space-between" textStyle="sm">
                    <Span fontWeight="medium" truncate>
                      {city.name}
                    </Span>
                  </HStack>
                  <Combobox.ItemIndicator />
                </Combobox.Item>
              ))
            )}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  );
};

export default CitySearchInput;
