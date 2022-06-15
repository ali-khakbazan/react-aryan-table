import { useCallback, useState } from "react";

export type UseFilterReturns = {
  filterableData: any[];
  activeFilters: Function[];
  submitFilters: () => void;
  resetFilters: () => void;
  toFilterList: (fn: () => void) => void;
  showByValue: (item: [string, number | string]) => void;
  showByStringArrayValue: (item: [string, number | string]) => void;
};

export function useFilters(items: any[]) {
  const [filterableData, setFilterableData] = useState<any[]>(items);
  const [activeFilters, setActiveFilters] = useState<Function[]>([]);

  const showByValue = useCallback(
    (item: [string, number | string]) => {
      const filtered = items.filter((data) => data[item[0]] === item[1]);

      setFilterableData(filtered);
    },
    [items]
  );

  const showByStringArrayValue = useCallback(
    (item: [string, string | number]) => {
      const filtered = items.filter((data) => data[item[0]].includes(item[1]));
      setFilterableData(filtered);
    },
    [items]
  );

  const toFilterList = useCallback((fn: () => void) => {
    setActiveFilters((prev) => [...prev, fn]);
  }, []);

  const submitFilters = useCallback(() => {
    activeFilters.forEach((fn) => {
      fn();
    });
  }, [activeFilters]);

  const resetFilters = useCallback(() => {
    setFilterableData(items);
    setActiveFilters([]);
  }, [items]);

  return {
    filterableData,
    activeFilters,
    submitFilters,
    resetFilters,
    toFilterList,
    showByValue,
    showByStringArrayValue,
  };
}
