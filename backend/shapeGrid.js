
const totalPatterns = 3;
const patterns = [ 

];
const shapeGrid  = [
    {shapeId: '101', shapeTypeId: '1', shapeType: 'Circle', shapeSize: 'small', producedFruit: false},
    {shapeId: '102', shapeTypeId: '1', shapeType: 'Circle', shapeSize: 'medium', producedFruit: false},
    {shapeId: '103', shapeTypeId: '1', shapeType: 'Circle', shapeSize: 'large', producedFruit: false},
    {shapeId: '104', shapeTypeId: '2', shapeType: 'Square', shapeSize: 'small', producedFruit: false},
    {shapeId: '105', shapeTypeId: '2', shapeType: 'Square', shapeSize: 'medium', producedFruit: false},
    {shapeId: '106', shapeTypeId: '2', shapeType: 'Square', shapeSize: 'large', producedFruit: false},
    {shapeId: '107', shapeTypeId: '3', shapeType: 'Triangle', shapeSize: 'small', producedFruit: false},
    {shapeId: '108', shapeTypeId: '3', shapeType: 'Triangle', shapeSize: 'medium', producedFruit: false},
    {shapeId: '109', shapeTypeId: '3', shapeType: 'Triangle', shapeSize: 'large', producedFruit: false},
    {shapeId: '110', shapeTypeId: '4', shapeType: 'Star', shapeSize: 'small', producedFruit: false},
    {shapeId: '111', shapeTypeId: '4', shapeType: 'Star', shapeSize: 'medium', producedFruit: false},
    {shapeId: '112', shapeTypeId: '4', shapeType: 'Star', shapeSize: 'large', producedFruit: false},
    {shapeId: '113', shapeTypeId: '5', shapeType: 'Hexagon', shapeSize: 'small', producedFruit: false},
    {shapeId: '114', shapeTypeId: '5', shapeType: 'Hexagon', shapeSize: 'medium', producedFruit: false},
    {shapeId: '115', shapeTypeId: '5', shapeType: 'Hexagon', shapeSize: 'large', producedFruit: false},
    {shapeId: '116', shapeTypeId: '6', shapeType: 'Diamond', shapeSize: 'small', producedFruit: false},
    {shapeId: '117', shapeTypeId: '6', shapeType: 'Diamond', shapeSize: 'medium', producedFruit: false},
    {shapeId: '118', shapeTypeId: '6', shapeType: 'Diamond', shapeSize: 'large', producedFruit: false},
    {shapeId: '119', shapeTypeId: 'null', shapeType: 'null', shapeSize: 'null', producedFruit: 'null'},
    {shapeId: '120', shapeTypeId: 'null', shapeType: 'null', shapeSize: 'null', producedFruit: 'null'},
    {shapeId: '121', shapeTypeId: 'null', shapeType: 'null', shapeSize: 'null', producedFruit: 'null'},
    {shapeId: '122', shapeTypeId: 'null', shapeType: 'null', shapeSize: 'null', producedFruit: 'null'},
    {shapeId: '123', shapeTypeId: 'null', shapeType: 'null', shapeSize: 'null', producedFruit: 'null'},
    {shapeId: '124', shapeTypeId: 'null', shapeType: 'null', shapeSize: 'null', producedFruit: 'null'},
    {shapeId: '125', shapeTypeId: 'null', shapeType: 'null', shapeSize: 'null', producedFruit: 'null'}
];

//Time complexity: O(n), assuming Math.random() takes a constant time.
//Space complexity: O(1), no extra memeory is used.
// Fisher Yates algorithm

const shuffleGrid = (shapeGrid) => {

    for (var i = shapeGrid.length-1; i>0; i--) {       

                // Pick a random index from 0 to i inclusive
                let j = Math.floor(Math.random() * (i + 1));
 
                // Swap arr[i] with the element
                // at random index
                [shapeGrid[i], shapeGrid[j]] = [shapeGrid[j], shapeGrid[i]];
    }
}


// TC: O(n)
// SC: O(m)
const createPairs = (shapeGrid) => {
    console.log('createPairs called!');

    shuffleGrid(shapeGrid);

    const shapes = shapeGrid.filter(item => item.shapeTypeId !== 'null');

    const uniqueShapeTypes = new Set(shapes.map(item => item.shapeTypeId));

    console.log(uniqueShapeTypes);

    if(patterns.length === 0) {
        for (let i = 0; i < totalPatterns; i++) {
            patterns.push({ pattern: `${i+1}`, firstElementID: Array.from(uniqueShapeTypes)[i * 2], secondElementID: Array.from(uniqueShapeTypes)[i * 2 + 1] });
        }
    }

    console.log(patterns);

};
  
 

module.exports = {
shapeGrid,    
shuffleGrid,
createPairs
};