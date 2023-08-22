const patterns = require("../models/gamePattern");
const shapeGrid = require('../models/gameModel')

const totalTrials = 6;
const totalPatterns = 3;
let fruitsCounter = 0;
let currentTrial = 0;
const totalFruits = 6;

const getTotalTrials =() => {

    return totalTrials;
}

const getFruitCount = () => {

    return fruitsCounter;
}

const updateFruitCount = () => {

   fruitsCounter += 1;
}

const initializeFruitCount = () =>{
    fruitsCounter = 0;
}

const getTotalFruits = () => {

    return totalFruits;
}

const updateTotalFruits = (updatedFruitsCount) => {

    totalFruits = updateFruitCount;
}

const getPatterns = () => {

    return patterns;
} 

const getTotalPatterns = () => {
    return totalPatterns;
}

const getCurrentTrial = () => {
    return currentTrial;
}

const updateCurrentTrial = () => {
    currentTrial += 1;
}

const getShapeGrid = () => {
    return shapeGrid;
}


module.exports = {getTotalTrials, getFruitCount, initializeFruitCount, getTotalFruits,
                  getPatterns, getCurrentTrial, updateTotalFruits, updateCurrentTrial, getShapeGrid, getTotalPatterns, updateFruitCount
                };