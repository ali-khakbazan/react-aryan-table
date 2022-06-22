import { ReactNode } from "react";

export type TableColumns = {
  title: string | ReactNode;
  key: string;
  responsive?: Array<"xs" | "sm" | "md" | "lg" | "xl">;
  sort?: boolean;
  width?: string;
  render?: (arg: any) => void;
}[];

export type TableData =
  | {
      [objKey: string]: any;
      key: string;
    }[]
  | undefined;

export type TableMoreItemProps = {
  title: string;
  link?: string;
  onClick?: () => void;
  type: "view" | "edit" | "delete";
};
