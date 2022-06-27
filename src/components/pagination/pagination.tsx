import ReactPaginate, { ReactPaginateProps } from "react-paginate";

type Props = ReactPaginateProps;

export const Pagination: React.FC<Props> = ({ ...props }) => {
  return (
    <div>
      <ReactPaginate {...props} />
    </div>
  );
};
