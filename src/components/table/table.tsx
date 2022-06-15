import { CSSProperties, useCallback, useMemo } from "react";
import { useSortData } from "../../hooks/useSortData";
import { Pagination } from "../pagination/pagination";
import { TableColumns, TableData } from "./types";
import "./table.css";
import { DownIcon, UpIcon } from "../../icons";
import { ReactPaginateProps } from "react-paginate";

type Props = {
  rtl?: boolean;
  columns: TableColumns;
  data: TableData;
  paginationProps?: ReactPaginateProps;
  onPageChange?: (arg: { selected: number }) => void;
  isLoading?: boolean;
  wrapperStyles?: (styles: CSSProperties) => CSSProperties;
  tableStyles?: (styles: CSSProperties) => CSSProperties;
  headerRowStyles?: (styles: CSSProperties) => CSSProperties;
  headerCellStyles?: (styles: CSSProperties) => CSSProperties;
  bodyRowStyles?: (styles: CSSProperties) => CSSProperties;
  bodyCellStyles?: (styles: CSSProperties) => CSSProperties;
};

export const Table: React.FC<Props> = ({
  rtl = false,
  columns,
  data,
  paginationProps,
  isLoading,
  wrapperStyles,
  tableStyles,
  headerRowStyles,
  headerCellStyles,
  bodyCellStyles,
  bodyRowStyles,
}) => {
  const { items, requestSort, sortConfig } = useSortData(data ?? []);
  const handleSort = useCallback(
    (shouldSort: boolean, key: string) => {
      if (shouldSort) {
        return requestSort(key);
      }
      return null;
    },
    [requestSort]
  );

  const wrapperStylesBox = useMemo(() => {
    const defaultStyles: CSSProperties = {
      direction: rtl ? "rtl" : "ltr",
      backgroundColor: "#ffffff",
      border: "1px solid rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
    };

    if (wrapperStyles) {
      return wrapperStyles(defaultStyles);
    }

    return defaultStyles;
  }, [wrapperStyles, rtl]);

  const tableStylesBox = useMemo(() => {
    const defaultStyles: CSSProperties = {
      width: "100%",
      tableLayout: "fixed",
      borderCollapse: "collapse",
    };

    if (tableStyles) {
      return tableStyles(defaultStyles);
    }

    return defaultStyles;
  }, [tableStyles]);

  const headerRowStylesBox = useMemo(() => {
    const defaultStyles: CSSProperties = {
      borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
    };

    if (headerRowStyles) {
      return headerRowStyles(defaultStyles);
    }

    return defaultStyles;
  }, [headerRowStyles]);

  const headerCellStylesBox = useMemo(() => {
    const defaultStyles: CSSProperties = {
      textAlign: rtl ? "right" : "left",
      fontSize: "15px",
      color: "#333333",
      padding: "12px 14px",
    };

    if (headerCellStyles) {
      return headerCellStyles(defaultStyles);
    }

    return defaultStyles;
  }, [headerCellStyles, rtl]);

  const bodyRowStylesBox = useMemo(() => {
    const defaultStyles: CSSProperties = {
      borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
    };

    if (bodyRowStyles) {
      return bodyRowStyles(defaultStyles);
    }

    return defaultStyles;
  }, [bodyRowStyles]);

  const bodyCellStylesBox = useMemo(() => {
    const defaultStyles: CSSProperties = {
      textAlign: rtl ? "right" : "left",
      fontSize: "14px",
      color: "#333333",
      padding: "12px 14px",
    };

    if (bodyCellStyles) {
      return bodyCellStyles(defaultStyles);
    }

    return defaultStyles;
  }, [bodyCellStyles, rtl]);

  if (!isLoading && !data?.length) {
    return (
      <div style={wrapperStylesBox}>
        <table style={tableStylesBox}>
          <thead>
            <tr style={headerRowStylesBox}>
              {columns?.map((col, idx) => {
                return (
                  <th
                    style={{ width: col.width, ...headerCellStylesBox }}
                    key={`cols-col-${idx}-key-${col?.key}`}
                  >
                    <div className="flex align-items-center">
                      <p>{col?.title}</p>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            <tr className="empty-data-wrapper">
              <div className="empty-data-box">
                <div className="flex flex-col items-center justify-center">
                  <img src="/no-data.svg" alt="no data" />

                  <p className="text-base">Nothing Found!</p>
                </div>
              </div>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div style={wrapperStylesBox}>
        <table style={tableStylesBox}>
          <thead>
            <tr style={headerRowStylesBox}>
              {columns?.map((col, idx) => {
                return (
                  <th
                    style={{ width: col.width, ...headerCellStylesBox }}
                    key={`cols-col-${idx}-key-${col?.key}`}
                  >
                    <div className="flex align-items-center">
                      <p>{col?.title}</p>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: 10 }, (row, idx) => (
              <tr
                style={bodyRowStylesBox}
                key={`loading-row-${idx}`}
                className="last-border-none"
              >
                {Array.from({ length: columns.length }, (cell, idx) => (
                  <td key={`loading-cell-${idx}`} className="skeleton-td">
                    <div className="skeleton"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div>
      <div style={wrapperStylesBox}>
        <table style={tableStylesBox}>
          <thead>
            <tr style={headerRowStylesBox}>
              {columns?.map((col, idx) => {
                return (
                  <th
                    style={{ width: col.width, ...headerCellStylesBox }}
                    onClick={() => handleSort(col.sort ?? false, col.key)}
                    key={`cols-col-${idx}-key-${col?.key}`}
                  >
                    <div className="flex align-items-center">
                      <p>{col?.title}</p>

                      {col.sort && (
                        <div className="relative">
                          <div className="sort-cell-box">
                            <div className="relative space-y-0.5">
                              <div
                                className={`up-icon ${
                                  sortConfig?.direction === "descending" &&
                                  sortConfig?.key === col?.key
                                    ? "active-icon"
                                    : "not-active-icon"
                                }`}
                              >
                                <UpIcon />
                              </div>

                              <div
                                className={`down-icon ${
                                  sortConfig?.direction === "ascending" &&
                                  sortConfig?.key === col?.key
                                    ? "active-icon"
                                    : "not-active-icon"
                                }`}
                              >
                                <DownIcon />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {items?.map((row, idx) => {
              return (
                <tr
                  style={bodyRowStylesBox}
                  key={`rows-row-${idx}-key-${row.key}`}
                  className="last-border-none fade"
                >
                  {Object.entries(row).map(([key, value], idx) => {
                    const withRender = columns
                      .find((el) => el.key === key)
                      ?.render?.(value);

                    if (key === "key") {
                      return null;
                    }

                    return (
                      <td
                        style={bodyCellStylesBox}
                        key={`cells-cell-${idx}-key-${key}`}
                      >
                        {withRender ? withRender : value}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {paginationProps && <Pagination {...paginationProps} />}
    </div>
  );
};
