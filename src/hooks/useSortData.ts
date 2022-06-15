import { useMemo, useState } from "react";

type SortVals = "ascending" | "descending";

type Config = {
  direction: SortVals;
  key: string;
} | null;

export function useSortData<T>(items: T[], config: Config = null) {
  const [sortConfig, setSortConfig] = useState<Config>(config);

  const sortedItems: T[] = useMemo(() => {
    let sortableItems = [...items];

    if (sortConfig !== null) {
      sortableItems.sort((a: any, b: any) => {
        const firstValue = /,/g.test(a[sortConfig.key])
          ? a[sortConfig.key]?.split(",")?.join("")
          : a[sortConfig.key];

        const secondValue = /,/g.test(b[sortConfig.key])
          ? b[sortConfig.key]?.split(",")?.join("")
          : b[sortConfig.key];

        if (firstValue < secondValue) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (firstValue > secondValue) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key: any) => {
    let direction: SortVals = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }

    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
}
