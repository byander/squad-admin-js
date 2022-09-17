import { sqlite3 } from 'sqlite3';

const db = new sqlite3.Database('database.db', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('db opened');
  }
});

// export const getRules = () => {
//   return new Promise((resolve, reject) => {
//     db.serialize(() => {
//       db.all('SELECT * from rules', [], (err, rows) => {
//         rows.forEach((row) => {
//           console.log(`${row.id} / ${row.rules}`);
//         });
//       });
//     });
//     db.close();
//   });
// };


export const getRules = () => {
  db.serialize(() => {
    db.all('SELECT * from rules', [], (err, rows) => {
      rows.forEach((row) => {
        console.log(`${row.id} / ${row.rules}`);
      });
    });
  });
  db.close();
};
