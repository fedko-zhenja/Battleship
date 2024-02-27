// import { type ShipsData } from '../types.ts';
// import { allShipPositionsData } from '../database/database.ts';

// export function findAllShipPositions(roomIndex: number, userIndex?: number, shipsData?: ShipsData): void {
//     // console.log('findAllShipPositions', idRoom, userIndex, shipsData);

//     const shipsDataCopy = JSON.parse(JSON.stringify(shipsData));

//     // console.log('shipsDataCopy', shipsDataCopy);

//     const allCoordinatesArr = [];

//     for (let i = 0; i < shipsDataCopy.length; i++) {
//         // const resObj = { x: 0, y: 0 };
//         const resArr = [];

//         if (shipsDataCopy[i].direction === true) {
//             for (let j = 0; j < shipsDataCopy[i].length; j++) {
//                 const resObj = { x: 0, y: 0 };
//                 // console.log('shipsDataCopy[i].length', shipsDataCopy[i].length);
//                 resObj.x = shipsDataCopy[i].position.x;
//                 // console.log('shipsDataCopy[i].position.x', shipsDataCopy[i].position.x);
//                 resObj.y = shipsDataCopy[i].position.y + j;
//                 // console.log('shipsDataCopy[i].position.y + (j + 1)', shipsDataCopy[i].position.y + (j + 1));

//                 resArr.push(resObj);

//                 // console.log('resArr', resArr);
//                 // console.log('resObj', resObj);
//             }
//             // allCoordinates.push(resArr);
//         }

//         if (shipsDataCopy[i].direction === false) {
//             for (let j = 0; j < shipsDataCopy[i].length; j++) {
//                 const resObj = { x: 0, y: 0 };
//                 resObj.x = shipsDataCopy[i].position.x + j;
//                 resObj.y = shipsDataCopy[i].position.y;

//                 resArr.push(resObj);
//             }
//             // allCoordinatesArr.push(resArr);
//         }

//         allCoordinatesArr.push(resArr);
//     }

//     const resaltData = {
//         idRoom: roomIndex,
//         idUser: userIndex,
//         allCoordinates: allCoordinatesArr,
//     };

//     allShipPositionsData.push(resaltData);

//     console.log('allShipPositionsData');

//     // console.log('allShipPositionsData', allShipPositionsData[0].allCoordinates);
//     // // console.log('allShipPositionsData', allShipPositionsData[1].allCoordinates);
//     // if (allShipPositionsData[1]) {
//     //     console.log('allShipPositionsData', allShipPositionsData[1].allCoordinates);
//     // }
// }
