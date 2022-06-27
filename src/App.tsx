import { useMemo } from "react";
import "./App.css";
import { FilterExample } from "./common/filter-example";
import { Table } from "./components/table/table";
import { TableColumns, TableData } from "./components/table/types";

function App() {
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
        category: "Action",
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
        category: "Action",
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
        category: "Action",
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
        category: "Action",
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
        category: "Comedy",
        writer: "nolan",
        producer: "nolan",
        duration: 60,
        price: 50,
        actions: "/",
      },
    ],
    []
  );

  return (
    <div className="App">
      <div>
        <FilterExample />
      </div>

      <div>
        <h3>Basic</h3>
        <Table columns={columns} data={data} />
      </div>

      <div style={{ margin: "4rem 0" }}>
        <h3>Loading</h3>
        <Table isLoading columns={columns} data={data} />
      </div>

      <div>
        <h3>Empty</h3>
        <Table columns={columns} data={data?.slice(0, 0)} />
      </div>
    </div>
  );
}

export default App;
