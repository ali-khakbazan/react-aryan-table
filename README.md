# React Aryan Table

#### A full customizable table and easy to filter & sort data with only two provided custom hooks

you can fully customize the ui of your table and you can implement any arbitrary logic for filtering or sorting data (`useFilters` - `useSort `)

## Demo

https://codesandbox.io/s/react-aryan-table-t4lghw

## Usage

```javascript
import { useMemo } from "react";
import "./App.css";
import { FilterExample } from "./common/filter-example";
import { Table } from "./components/table/table";
import { TableColumns, TableData } from "./components/table/types";

function App() {
  const columns =
    useMemo <
    TableColumns >
    (() => [
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
    []);

  const data =
    useMemo <
    TableData >
    (() => [
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
    []);

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
```

### some types that is used in the API References

```typescript
type TableColumns = {
  title: string | ReactNode;
  key: string;
  responsive?: Array<"xs" | "sm" | "md" | "lg" | "xl">;
  sort?: boolean;
  width?: string;
  render?: (arg: any) => void;
}[];

type TableData =
  | {
      [objKey: string]: any;
      key: string;
    }[]
  | undefined;
```

## API Reference (`Table component`)

| Parameter          | Type                                       | Required | Description                                                                   |
| :----------------- | :----------------------------------------- | :------- | :---------------------------------------------------------------------------- |
| `rtl`              | `boolean`                                  | **NO**   | set direction to rtl                                                          |
| `columns`          | `TableColumns`                             | **YES**  | columns of the table                                                          |
| `data`             | `TableData`                                | **YES**  | body of the table                                                             |
| `paginationProps`  | `ReactPaginateProps`                       | **NO**   | a function that takes default styles and returns {...styles, your new styles} |
| `isLoading`        | `boolean`                                  | **NO**   | toggle between the table loading overlay and the main table ui                |
| `wrapperStyles`    | `(styles: CSSProperties) => CSSProperties` | **NO**   | a function that takes default styles and returns {...styles, your new styles} |
| `tableStyles`      | `(styles: CSSProperties) => CSSProperties` | **NO**   | a function that takes default styles and returns {...styles, your new styles} |
| `headerRowStyles`  | `(styles: CSSProperties) => CSSProperties` | **NO**   | a function that takes default styles and returns {...styles, your new styles} |
| `headerCellStyles` | `(styles: CSSProperties) => CSSProperties` | **NO**   | a function that takes default styles and returns {...styles, your new styles} |
| `bodyRowStyles`    | `(styles: CSSProperties) => CSSProperties` | **NO**   | a function that takes default styles and returns {...styles, your new styles} |
| `bodyCellStyles`   | `(styles: CSSProperties) => CSSProperties` | **NO**   | a function that takes default styles and returns {...styles, your new styles} |

## API Reference (`useFilters hook`)

| Parameter | Type    | Required | Description                     |
| :-------- | :------ | :------- | :------------------------------ |
| `items`   | `any[]` | **YES**  | for creating a filterable array |

## Installation

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
