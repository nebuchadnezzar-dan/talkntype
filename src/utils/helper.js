export const ROW = 10;
export const COLUMN = 19;
const CELL_COLOR = 16;

export function generateMatrix() {
  const rowDiv = new Array(ROW).fill(new Array(COLUMN).fill({}));

  const matrix = rowDiv.map((row, i, rowArr) => {
    const rowInd = i;
    const rowArrL = rowArr.length - 1;
    return row.map((_, i, arr) => {
      const ilength = arr.length - 1;
      const num = Math.floor(Math.random() * CELL_COLOR + 1);
      if (rowInd === 0 && i === 0) {
        return {
          className: `cell active rand-${num} upper-left-edge x${rowInd}y${i}`,
          key: rowInd + i,
        };
      } else if (rowInd === rowArrL && i === 0) {
        return {
          className: `cell rand-${num} lower-left-edge x${rowInd}y${i}`,
          key: rowInd + i,
        };
      } else if (rowInd === 0 && i === ilength) {
        return {
          className: `cell rand-${num} upper-right-edge x${rowInd}y${i}`,
          key: rowInd + i,
        };
      } else if (rowInd === rowArrL && i === ilength) {
        return {
          className: `cell rand-${num} lower-right-edge x${rowInd}y${i}`,
          key: rowInd + i,
        };
      } else {
        return {
          className: `cell rand-${num} x${rowInd}y${i}`,
          key: rowInd + i,
        };
      }
    });
  });
  return matrix;
}
