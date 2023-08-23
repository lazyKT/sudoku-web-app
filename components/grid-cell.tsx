'use client';

import { shouldHighlightCell } from "@/utils/grid-utils";
import { ICell, ISudokuValue } from "@/utils/type-def";
import { useCallback, useEffect, useRef } from "react";

interface IGridCellProps {
  position: ICell;
  active: ICell | null;
  invalidCells?: number[];
  handleClick: (cell: ICell) => void;
  handleOnChange: (val: string) => void;
  sudokuValue: ISudokuValue;
}

const GridCell = ({
  position,
  active,
  handleClick,
  handleOnChange,
  sudokuValue,
  invalidCells=[]
}: IGridCellProps) => {

  const cellRef = useRef<HTMLDivElement>(null);

  // pre-render grid cells base stylings
  const gridCellStyling = () => {
    const baseStyle = 'h-10 border border-slate-600 flex items-center justify-center w-cell outline-0 text-2xl';
    let additionalStyle = '';
    const { x, y } = position;
    if (x % 3 === 2) {
      additionalStyle += 'border-b-4 border-slate-600';
    }
    if (y % 3 === 2) {
      additionalStyle += ' border-r-4 border-slate-600';
    }
    return `${baseStyle} ${additionalStyle}`;
  }

  const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.code.startsWith('Digit') && e.code !== 'Digit0') {
      handleOnChange(e.key);
    }
  }

  const handleCellOnClick = () => {
    if (sudokuValue.mutable) {
      handleClick(position);
    }
  }

  /**
   * !!!!!!!!!!!!! IMPORTANT !!!!!!!!!!!!!!!!!
   * ==== MOVE UI UPDATES TO SERVER SIDE FROM THE BELOW CALLBACK ====
   * !!!!!!!!!!!!! IMPORTANT !!!!!!!!!!!!!!!!!
   */
  const updateCellStyles = useCallback(() => {
    // update cell styles based on position
    const { x, y } = position;
    if (cellRef.current != null) {
      const invalidCell = invalidCells.find(val => val === (9 * x) + y);
      const isActive = x === active?.x && y === active?.y;
      if (invalidCell) {
        cellRef.current.style.background = isActive ? '#FF0000aa' : '#FF0000';
      } else if (isActive) {
        cellRef.current.style.background = '#a0b9c3bf';
      } else {
        // highlight cell with bg color if it in the same group as selected cell or has same x or y axis as selected cell
        // this is to highlight affected sudoku cells for the user-selected cell
        cellRef.current.style.background = shouldHighlightCell(position, active) ? '#a0b9c355' : '';
      }
      cellRef.current.style.color = sudokuValue?.mutable ? 'dodgerblue' : 'black';
    }
  }, [active, position, invalidCells, sudokuValue]);

  useEffect(() => {
    updateCellStyles();
  }, [updateCellStyles]);


  return (
    <div
      ref={cellRef}
      className={gridCellStyling()}
      onClick={handleCellOnClick}
      tabIndex={0}
      onKeyUp={(e) => handleKeyUp(e)}
    >
      {sudokuValue.value}
    </div>
  )
}

export default GridCell;
