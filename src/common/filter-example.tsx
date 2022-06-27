import { useCallback, useMemo, useState } from "react";
import { Table } from "../components/table/table";
import { TableColumns, TableData } from "../components/table/types";
import { useFilters } from "../hooks/useFilters";

export const FilterExample: React.FC = () => {
  const columns = useMemo<TableColumns>(
    () => [
      {
        key: "index",
        width: "60px",
        title: "",
      },
      {
        key: "title",
        title: "Title",
      },
      {
        key: "category",
        title: "Category",
      },
      {
        key: "Writer",
        title: "writer",
      },
      {
        key: "Producer",
        title: "producer",
      },
      {
        key: "duration",
        title: "Duration",
        responsive: ["lg"],
        sort: true,
      },
      {
        key: "price",
        title: "Price",
        sort: true,
        render: (price: number) => <p>{price} USD</p>,
      },
      {
        key: "actions",
        width: "100px",
        title: "",
        responsive: ["lg"],
        render: (href: string) => <button className="button">More</button>,
      },
    ],
    []
  );

  const data = useMemo<TableData>(
    () => [
      {
        key: "1",
        index: "1",
        title: "Game Of Thrones",
        category: "action",
        writer: "jack",
        producer: "nolan",
        duration: 90,
        price: 250,
        actions: "/",
      },
      {
        key: "2",
        index: "2",
        title: "Breaking Bad",
        category: "drama",
        writer: "sam",
        producer: "nolan",
        duration: 70,
        price: 335,
        actions: "/",
      },
      {
        key: "3",
        index: "3",
        title: "The Boys",
        category: "drama",
        writer: "mark",
        producer: "maxi",
        duration: 100,
        price: 200,
        actions: "/",
      },
      {
        key: "4",
        index: "4",
        title: "Dexter",
        category: "action",
        writer: "daniel",
        producer: "jack",
        duration: 150,
        price: 650,
        actions: "/",
      },
      {
        key: "5",
        index: "5",
        title: "Friends",
        category: "comedy",
        writer: "nolan",
        producer: "nolan",
        duration: 60,
        price: 50,
        actions: "/",
      },
    ],
    []
  );

  const categories = useMemo(
    () => [
      {
        label: "action",
        value: "action",
      },
      {
        label: "comedy",
        value: "comedy",
      },
      {
        label: "drama",
        value: "drama",
      },
      {
        label: "kids",
        value: "kids",
      },
    ],
    []
  );

  const writers = useMemo(
    () => [
      {
        label: "jack",
        value: "jack",
      },
      {
        label: "sam",
        value: "sam",
      },
      {
        label: "mark",
        value: "mark",
      },
      {
        label: "daniel",
        value: "daniel",
      },
      {
        label: "nolan",
        value: "nolan",
      },
    ],
    []
  );

  const producers = useMemo(
    () => [
      {
        label: "jack",
        value: "jack",
      },
      {
        label: "sam",
        value: "sam",
      },
      {
        label: "mark",
        value: "mark",
      },
      {
        label: "daniel",
        value: "daniel",
      },
      {
        label: "nolan",
        value: "nolan",
      },
    ],
    []
  );

  const {
    filterableData,
    activeFilters,
    toFilterList,
    showByValue,
    submitFilters,
    resetFilters,
  } = useFilters(data ?? []);

  const [selectedFilters, setSelectedFilters] = useState({
    category: undefined,
    writer: undefined,
    producer: undefined,
  });

  const handleAddFilter = useCallback(
    (item: [string, string | number]) => {
      toFilterList(() => showByValue(item));
      setSelectedFilters((prev) => ({ ...prev, [item[0]]: item[1] }));
    },
    [showByValue, toFilterList]
  );

  const handleResetFilters = useCallback(() => {
    resetFilters();
    setSelectedFilters({
      category: undefined,
      writer: undefined,
      producer: undefined,
    });
  }, [resetFilters]);

  return (
    <div>
      <h3>Filterable</h3>

      <div
        style={{
          display: "flex",
          alignItems: "end",
          columnGap: "2rem",
          marginBottom: "1rem",
        }}
      >
        <div>
          <select
            value={selectedFilters?.category ?? "category"}
            defaultValue="category"
            name="categories"
            onChange={(e) => handleAddFilter(["category", e.target.value])}
          >
            <option value="category" disabled>
              Category
            </option>

            {categories.map((item, idx) => (
              <option value={item.value} key={`categroy-${item.value}`}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={selectedFilters?.writer ?? "writer"}
            defaultValue="writer"
            name="writer"
            onChange={(e) => handleAddFilter(["writer", e.target.value])}
          >
            <option value="writer" disabled>
              Writer
            </option>

            {writers.map((item, idx) => (
              <option key={`writer-${item.value}`}>{item.label}</option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={selectedFilters?.producer ?? "producer"}
            defaultValue="producer"
            name="producer"
            onChange={(e) => handleAddFilter(["producer", e.target.value])}
          >
            <option value="producer" disabled>
              Producer
            </option>

            {producers.map((item, idx) => (
              <option key={`producer-${item.value}`}>{item.label}</option>
            ))}
          </select>
        </div>

        <button disabled={!activeFilters?.length} onClick={submitFilters}>
          Submit
        </button>
        <button disabled={!activeFilters?.length} onClick={handleResetFilters}>
          Reset
        </button>
      </div>

      <Table columns={columns} data={filterableData} />
    </div>
  );
};
