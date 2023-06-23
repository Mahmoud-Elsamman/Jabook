import { Fragment, useEffect } from "react";
import { useTypedSelector } from "../hooks/use-typed-selector";
import { useActions } from "../hooks/use-actions";
import AddCell from "./add-cell";
import CellListItem from "./cell-list-item";
import "./cell-list.css";

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) => {
    return order.map((id) => data[id]);
  });

  const { insertCellAfter, fetchCells, saveCells } = useActions();

  useEffect(() => {
    fetchCells();
  }, []);

  const renderdCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ));

  if (cells.length === 0) {
    return (
      <div
        className='box add-cell'
        style={{ opacity: 1.0, margin: "25vh 10vh" }}
      >
        <div style={{ textAlign: "center" }}>
          <h1 className='title is-1'>You don't have any cells</h1>
          <h1 className='subtitle is-3'>Start by adding your first cell.</h1>
        </div>
        <div className='add-buttons'>
          <button
            className='button is-rounded is-primary is-large'
            style={{ margin: "40px 20px" }}
            onClick={() => insertCellAfter(null, "code")}
          >
            <span className='icon is-small'>
              <i className='fas fa-plus' />
            </span>
            <span>Code</span>
          </button>
          <button
            className='button is-rounded is-primary is-large'
            style={{ margin: "40px 20px" }}
            onClick={() => insertCellAfter(null, "text")}
          >
            <span className='icon is-small'>
              <i className='fas fa-plus' />
            </span>
            <span>Text</span>
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className='cell-list'>
      <AddCell forceVisible={cells.length === 0} previousCellId={null} />
      {renderdCells}
    </div>
  );
};

export default CellList;
