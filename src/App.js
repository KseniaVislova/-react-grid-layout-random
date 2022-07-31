import styles from './App.module.css';
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';

function App() {
  // const layoutXL = [
  //   { i: '1', x: 0, y: 0, w: 2, h: 1 },
  //   { i: '2', x: 2, y: 0, w: 1, h: 1 },
  //   { i: '3', x: 3, y: 0, w: 2, h: 2 },
  //   { i: '4', x: 3, y: 0, w: 1, h: 1 },
  //   { i: '5', x: 4, y: 0, w: 1, h: 1 },
  //   { i: '6', x: 5, y: 0, w: 1, h: 1 },
  //   { i: '7', x: 6, y: 0, w: 1, h: 1 },
  //   { i: '8', x: 0, y: 1, w: 1, h: 1 },
  //   { i: '9', x: 1, y: 1, w: 1, h: 1 },
  //   { i: '10', x: 2, y: 1, w: 1, h: 1 },
  //   { i: '11', x: 5, y: 1, w: 2, h: 1 },
  //   { i: '12', x: 0, y: 2, w: 1, h: 1 },
  //   { i: '13', x: 1, y: 2, w: 2, h: 1 },
  //   { i: '14', x: 5, y: 2, w: 1, h: 1 },
  //   { i: '15', x: 6, y: 2, w: 1, h: 1 },
  //   { i: '16', x: 5, y: 1, w: 2, h: 1 },
  //   { i: '17', x: 0, y: 2, w: 1, h: 1 },
  //   { i: '18', x: 1, y: 2, w: 2, h: 1 },
  //   { i: '19', x: 5, y: 2, w: 1, h: 1 },
  //   { i: '20', x: 6, y: 2, w: 1, h: 1 },
  // ];
  const getRandomTEST = (cols, rows, count) => {
    const size = cols * rows;
    const diff = size - count + rows;
    let countRectangle = Math.ceil(diff / 2);
    console.log('Start countRectangle', countRectangle);
    let countSquare = 0;

    const getCountOfShapes = () => {
      for (let i = 0; i < countRectangle; i += 2) {
        if (countRectangle >= 2) {
          const random = Math.random();
          console.log(random);
          if (random > 0.3) {
            countSquare += 1;
            countRectangle -= 2;
          }
        }
      }
    };

    getCountOfShapes();

    console.log('countRectangle ', countRectangle);
    console.log('countSquare ', countSquare);
    console.log('Sum ', countSquare * 2 + countRectangle);

    const templateLayout = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let i = 0; i < cols; i++) {
        row.push(true);
      }
      templateLayout.push(row);
    }

    console.log(templateLayout);

    const layout = [];
    const getRandom = (min, max) => {
      const rand = Math.random() * (max - min) + min;
      return Math.round(rand);
    };

    const getXY = (type, valueX, valueY) => {
      const x = getRandom(0, cols - valueX);
      const y = getRandom(0, rows - valueY);
      console.log('rows', rows - valueY);
      console.log('Y', y);
      console.log('cols', cols - valueX);
      console.log('X', x);

      if (
        type === 'square' &&
        templateLayout[y][x] &&
        templateLayout[y + 1][x] &&
        templateLayout[y][x + 1] &&
        templateLayout[y + 1][x + 1]
      ) {
        console.log(type);
        console.log(x, y);
        templateLayout[y][x] = false;
        templateLayout[y + 1][x] = false;
        templateLayout[y][x + 1] = false;
        templateLayout[y + 1][x + 1] = false;
        console.log(
          templateLayout[y][x],
          templateLayout[y][x + 1],
          templateLayout[y + 1][x],
          templateLayout[y + 1][x + 1]
        );
      } else if (
        type === 'rectangle' &&
        templateLayout[y][x] &&
        templateLayout[y][x + 1]
      ) {
        console.log(type);
        console.log(x, y);
        templateLayout[y][x] = false;
        templateLayout[y][x + 1] = false;
        console.log(templateLayout[y][x], templateLayout[y][x + 1]);
      } else {
        getXY(type, valueX, valueY);
      }

      return { x, y };
    };

    const getCoordinateForSquares = (count) => {
      for (let i = 0; i < count; i++) {
        const coordinate = getXY('square', 2, 2);
        console.log(coordinate);
        const { x, y } = coordinate;
        console.log(x, y);
        layout.push({
          x,
          y,
          w: 2,
          h: 2,
        });
      }
    };

    const getCoordinateForRectangle = (count) => {
      for (let i = 0; i < count; i++) {
        const coordinate = getXY('rectangle', 2, 1);
        console.log(coordinate);
        const { x, y } = coordinate;
        console.log(x, y);
        layout.push({
          x,
          y,
          w: 2,
          h: 1,
        });
      }
    };

    getCoordinateForSquares(countSquare);
    getCoordinateForRectangle(countRectangle);

    for (let i = layout.length; i < count; i++) {
      layout.push({ w: 1, h: 1 });
    }

    console.log(layout);
    let k = 0;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols - 1; j++) {
        console.log(layout[k]);
        console.log(layout[k].x);
        if (layout[k].x) {
          k++;
          continue;
        }
        layout[k].y = i;
        k++;
      }
    }
    console.log(templateLayout);
    console.log(layout);
  };

  getRandomTEST(7, 4, 20);
  getRandomTEST(7, 3, 15);
  getRandomTEST(5, 3, 10);

  const getRandomLayout = () => {
    const layout = [];
    const getRandom = (min, max) => {
      const rand = Math.random() * (max - min) + min;
      return Math.round(rand);
    };

    for (let i = 1; i <= 20; i++) {
      layout.push({
        i: String(i),
        x: getRandom(0, 7),
        y: getRandom(0, 3),
        w: getRandom(1, 2),
        h: 1,
      });
    }
    return layout;
  };

  const layouts = {
    lg: getRandomLayout('lg'),
    md: getRandomLayout('md'),
    sm: getRandomLayout('sm'),
    xs: getRandomLayout('xs'),
    xxs: getRandomLayout('xxs'),
  };
  console.log(layouts);
  return (
    <div className={styles.wrapper}>
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 2560, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 7, md: 10, sm: 6, xs: 4, xxs: 2 }}
        margin={[8, 8]}
        rowHeight={320}
        width={2560}
      >
        <div key="1" className={styles.item}>
          1
        </div>
        <div key="2" className={styles.item}>
          2
        </div>
        <div key="3" className={styles.item}>
          3
        </div>
        <div key="4" className={styles.item}>
          4
        </div>
        <div key="5" className={styles.item}>
          5
        </div>
        <div key="6" className={styles.item}>
          6
        </div>
        <div key="7" className={styles.item}>
          7
        </div>
        <div key="8" className={styles.item}>
          8
        </div>
        <div key="9" className={styles.item}>
          9
        </div>
        <div key="10" className={styles.item}>
          10
        </div>
        <div key="11" className={styles.item}>
          11
        </div>
        <div key="12" className={styles.item}>
          12
        </div>
        <div key="13" className={styles.item}>
          3
        </div>
        <div key="14" className={styles.item}>
          14
        </div>
        <div key="15" className={styles.item}>
          15
        </div>
        <div key="16" className={styles.item}>
          16
        </div>
        <div key="17" className={styles.item}>
          17
        </div>
        <div key="18" className={styles.item}>
          18
        </div>
        <div key="19" className={styles.item}>
          19
        </div>
        <div key="20" className={styles.item}>
          20
        </div>
      </ResponsiveGridLayout>
    </div>
  );
}

export default App;
