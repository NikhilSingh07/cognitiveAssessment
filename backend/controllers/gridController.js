const shapeGrid = require('../models/gameModel');
const patterns = require('../models/gamePattern');
const {getTotalPatterns, updateCurrentTrial, updateFruitCount, getCurrentTrial} = require('../utils/gameUtils')

// TC: O(n)
// SC: O(m)

const createPairs = (shapeGrid) => {
  
    if(patterns.length === 0) {
        console.log('createPairs called!');

        shuffleGrid(shapeGrid);
    
        const shapes = shapeGrid.filter(item => item.shapeTypeId !== 'null');
    
        const uniqueShapeTypes = new Set(shapes.map(item => item.shapeTypeId));
    
        console.log(uniqueShapeTypes);

        for (let i = 0; i < getTotalPatterns(); i++) {
            patterns.push({ pattern: `${i+1}`, firstElementID: Array.from(uniqueShapeTypes)[i * 2], secondElementID: Array.from(uniqueShapeTypes)[i * 2 + 1], fruitProducedByID: 'null'});
        }
        initializeItems();
        shuffleGrid(shapeGrid);
    } else {

        console.log('Items are already Initialized!.');
    }

};

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
  

const initializeItems = () => {
   // console.log("initialize Items called!.");

    if(patterns.length!=0) {
        
        updateCurrentTrial();

      //  console.log(getCurrentTrial());
        for(let i = 0; i<patterns.length; i++) {

            for(let j =0; j<shapeGrid.length; j++) {

                switch(patterns[i].pattern) {

                    case '1':

                        if(patterns[i].firstElementID === shapeGrid[j].shapeTypeId || patterns[i].secondElementID == shapeGrid[j].shapeTypeId) {
                             
                            shapeGrid[j].pattern = '1'
                            shapeGrid[j].producedFruit = false;

                        }
                        
                    break;
                    
                    case '2':

                        if(patterns[i].firstElementID === shapeGrid[j].shapeTypeId ) {
                             
                            shapeGrid[j].pattern = '2';
                            shapeGrid[j].producedFruit = true;
                            shapeGrid[j].fruit = 'Apple';
                            patterns[i].fruitProducedByID = patterns[i].firstElementID;
                        }

                        if(patterns[i].secondElementID === shapeGrid[j].shapeTypeId) {

                            shapeGrid[j].pattern = '2';
                        }

                    break;
                    
                    case '3':

                        if(patterns[i].firstElementID === shapeGrid[j].shapeTypeId ) {
                             
                            shapeGrid[j].pattern = '3';
                            shapeGrid[j].producedFruit = true;
                            shapeGrid[j].fruit = 'Pear';
                            patterns[i].fruitProducedByID = patterns[i].firstElementID;
                        }

                        if(patterns[i].secondElementID === shapeGrid[j].shapeTypeId) {

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


const updatePatterns = () =>{

    resetShapeGrid();

    if(patterns.length > 0 ){

        if(getCurrentTrial() % 2 !== 0) {

            console.log(patterns);   

            for (const pattern of patterns) {
                if (pattern.pattern === "3") {
                  //pattern.fruitProducedByID = pattern.secondElementID;
                   if(pattern.fruitProducedByID === pattern.firstElementID) {

                        pattern.fruitProducedByID = pattern.secondElementID;

                    } else if(pattern.fruitProducedByID === pattern.secondElementID) {

                        pattern.fruitProducedByID = pattern.firstElementID;
                    }

                  updateShapeGrid(pattern.fruitProducedByID, "Pear");
                }
    
                if(pattern.pattern === "2") {

                    if(pattern.fruitProducedByID === pattern.firstElementID) {

                        pattern.fruitProducedByID = pattern.secondElementID;

                    } else if(pattern.fruitProducedByID === pattern.secondElementID) {

                        pattern.fruitProducedByID = pattern.firstElementID;
                    }

                   updateShapeGrid(pattern.fruitProducedByID, "Apple")
                }
              }
        } else {

            console.log(patterns); 

            for(const pattern of patterns) {


                if (pattern.pattern === "3") {

                     if(pattern.fruitProducedByID === pattern.firstElementID) {
  
                          pattern.fruitProducedByID = pattern.firstElementID;
  
                      } else if(pattern.fruitProducedByID === pattern.secondElementID) {
  
                          pattern.fruitProducedByID = pattern.secondElementID;
                      }
  
                    updateShapeGrid(pattern.fruitProducedByID, "Pear");
                  }
    
                if(pattern.pattern === "2") {

                    if(pattern.fruitProducedByID === pattern.firstElementID) {

                        pattern.fruitProducedByID = pattern.secondElementID;

                    } else if(pattern.fruitProducedByID === pattern.secondElementID) {

                        pattern.fruitProducedByID = pattern.firstElementID;
                    }
                    updateShapeGrid(pattern.fruitProducedByID, "Apple");
                }

            }
        }

        shuffleGrid(shapeGrid);

    } else {

        console.log("Patterns are Empty!.")
    }

}

const resetShapeGrid = () => {

    shapeGrid.forEach(shape => {
        shape.producedFruit = false;
        shape.hasProducedFruit = false;
        shape.fruit = 'null';
      });
}

 
const updateShapeGrid = (fruitProducedByID, fruit) => {

    shapeGrid.forEach(shape => {

        if(shape.shapeTypeId === fruitProducedByID) {
            shape.producedFruit = true;
            shape.fruit = fruit;
        }
    })
}


const updateGrid = (shapeId) => {
       
    const clickedShape = shapeGrid.find(shape => shape.shapeId === shapeId);

   // console.log("Clicked Shape:", clickedShape, "Shape ID:", shapeId);
    if(clickedShape) {

             if(clickedShape.shapeTypeId !== 'null') {

                if (clickedShape.producedFruit && !clickedShape.hasProducedFruit) {

                    clickedShape.hasProducedFruit = true;
                    updateFruitCount();
                }
             }

             shuffleGrid(shapeGrid);

    } else {
        console.log("shape not found!");
    }
}



module.exports = {
   
shuffleGrid,
createPairs,
updateGrid,
updatePatterns

};