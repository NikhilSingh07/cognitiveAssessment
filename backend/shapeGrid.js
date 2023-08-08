
const totalPatterns = 3;
const patterns = [ 

];
const shapeGrid  = [
    {shapeId: '101', shapeTypeId: '1', pattern: 'null', shapeType: 'Circle', shapeSize: 'small', producedFruit: false, hasProducedFruit: false, fruit: 'null'},
    {shapeId: '102', shapeTypeId: '1', pattern: 'null', shapeType: 'Circle', shapeSize: 'medium', producedFruit: false, hasProducedFruit: false, fruit: 'null'},
    {shapeId: '103', shapeTypeId: '1', pattern: 'null', shapeType: 'Circle', shapeSize: 'large', producedFruit: false, hasProducedFruit: false, fruit: 'null'},
    {shapeId: '104', shapeTypeId: '2', pattern: 'null', shapeType: 'Square', shapeSize: 'small', producedFruit: false, hasProducedFruit: false, fruit: 'null'},
    {shapeId: '105', shapeTypeId: '2', pattern: 'null', shapeType: 'Square', shapeSize: 'medium', producedFruit: false, hasProducedFruit: false, fruit: 'null'},
    {shapeId: '106', shapeTypeId: '2', pattern: 'null', shapeType: 'Square', shapeSize: 'large', producedFruit: false, hasProducedFruit: false, fruit: 'null'},
    {shapeId: '107', shapeTypeId: '3', pattern: 'null', shapeType: 'Triangle', shapeSize: 'small', producedFruit: false, hasProducedFruit: false, fruit: 'null'},
    {shapeId: '108', shapeTypeId: '3', pattern: 'null', shapeType: 'Triangle', shapeSize: 'medium', producedFruit: false, hasProducedFruit: false, fruit: 'null'},
    {shapeId: '109', shapeTypeId: '3', pattern: 'null', shapeType: 'Triangle', shapeSize: 'large', producedFruit: false, hasProducedFruit: false, fruit: 'null'},
    {shapeId: '110', shapeTypeId: '4', pattern: 'null', shapeType: 'Star', shapeSize: 'small', producedFruit: false, hasProducedFruit: false, fruit: 'null'},
    {shapeId: '111', shapeTypeId: '4', pattern: 'null', shapeType: 'Star', shapeSize: 'medium', producedFruit: false, hasProducedFruit: false, fruit: 'null'},
    {shapeId: '112', shapeTypeId: '4', pattern: 'null', shapeType: 'Star', shapeSize: 'large', producedFruit: false, hasProducedFruit: false, fruit: 'null'},
    {shapeId: '113', shapeTypeId: '5', pattern: 'null', shapeType: 'Hexagon', shapeSize: 'small', producedFruit: false, hasProducedFruit: false, fruit: 'null'},
    {shapeId: '114', shapeTypeId: '5', pattern: 'null', shapeType: 'Hexagon', shapeSize: 'medium', producedFruit: false, hasProducedFruit: false, fruit: 'null'},
    {shapeId: '115', shapeTypeId: '5', pattern: 'null', shapeType: 'Hexagon', shapeSize: 'large', producedFruit: false, hasProducedFruit: false, fruit: 'null'},
    {shapeId: '116', shapeTypeId: '6', pattern: 'null', shapeType: 'Diamond', shapeSize: 'small', producedFruit: false, hasProducedFruit: false, fruit: 'null'},
    {shapeId: '117', shapeTypeId: '6', pattern: 'null', shapeType: 'Diamond', shapeSize: 'medium', producedFruit: false, hasProducedFruit: false, fruit: 'null'},
    {shapeId: '118', shapeTypeId: '6', pattern: 'null', shapeType: 'Diamond', shapeSize: 'large', producedFruit: false, hasProducedFruit: false, fruit: 'null'},
    {shapeId: '119', shapeTypeId: 'null', pattern: 'null', shapeType: 'null', shapeSize: 'null', producedFruit: 'null', hasProducedFruit: false, fruit: 'null'},
    {shapeId: '120', shapeTypeId: 'null', pattern: 'null', shapeType: 'null', shapeSize: 'null', producedFruit: 'null', hasProducedFruit: false, fruit: 'null'},
    {shapeId: '121', shapeTypeId: 'null', pattern: 'null', shapeType: 'null', shapeSize: 'null', producedFruit: 'null', hasProducedFruit: false, fruit: 'null'},
    {shapeId: '122', shapeTypeId: 'null', pattern: 'null', shapeType: 'null', shapeSize: 'null', producedFruit: 'null', hasProducedFruit: false, fruit: 'null'},
    {shapeId: '123', shapeTypeId: 'null', pattern: 'null', shapeType: 'null', shapeSize: 'null', producedFruit: 'null', hasProducedFruit: false, fruit: 'null'},
    {shapeId: '124', shapeTypeId: 'null', pattern: 'null', shapeType: 'null', shapeSize: 'null', producedFruit: 'null', hasProducedFruit: false, fruit: 'null'},
    {shapeId: '125', shapeTypeId: 'null', pattern: 'null', shapeType: 'null', shapeSize: 'null', producedFruit: 'null', hasProducedFruit: false, fruit: 'null'}
];



const getPatterns = () => {

    return patterns;
} 

const getShapeGrid = () => {
    return shapeGrid;
}



const updateGrid = (shapeId) => {
       
    const clickedShape = shapeGrid.find(shape => shape.shapeId === shapeId);

    console.log("Clicked Shape:", clickedShape, "Shape ID:", shapeId);
    if(clickedShape) {

             if(clickedShape.shapeTypeId !== 'null') {

                if (clickedShape.producedFruit && !clickedShape.hasProducedFruit) {

                    clickedShape.hasProducedFruit = true;
                }
             }

    } else {
        console.log("shape not found!");
    }
}
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

        initializeItems();
    }

    //console.log(patterns);

};
  

const initializeItems = () => {

    if(patterns.length!=0) {

        for(let i = 0; i<patterns.length; i++) {

            for(let j =0; j<shapeGrid.length; j++) {

                switch(patterns[i].pattern) {

                    case '1':

                        if(patterns[i].firstElementID == shapeGrid[j].shapeTypeId || patterns[i].secondElementID == shapeGrid[j].shapeTypeId) {
                             
                            shapeGrid[j].pattern = '1'
                            shapeGrid[j].producedFruit = false;

                        }
                        
                    break;
                    
                    case '2':

                        if(patterns[i].firstElementID == shapeGrid[j].shapeTypeId ) {
                             
                            shapeGrid[j].pattern = '2';
                            shapeGrid[j].producedFruit = true;
                            shapeGrid[j].fruit = 'Apple';
                        }

                        if(patterns[i].secondElementID == shapeGrid[j].shapeTypeId) {

                            shapeGrid[j].pattern = '2';
                        }

                    break;
                    
                    case '3':

                        if(patterns[i].firstElementID == shapeGrid[j].shapeTypeId ) {
                             
                            shapeGrid[j].pattern = '3';
                            shapeGrid[j].producedFruit = true;
                            shapeGrid[j].fruit = 'Pear';
                        }

                        if(patterns[i].secondElementID == shapeGrid[j].shapeTypeId) {

                            shapeGrid[j].pattern = '3';
                        }

                    break;    

                }
            }

        }    
        

    } else {
        console.log('patterns not created yet!.');
    }
}
 

module.exports = {
shapeGrid,    
shuffleGrid,
createPairs,
getPatterns,
getShapeGrid,
updateGrid
};