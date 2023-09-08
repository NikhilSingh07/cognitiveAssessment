import { atom } from "recoil";

const atomDefault = {
    currentTrial: 0,
    patterns: [],
    fruitCount: 0,
    shapeGrid: [],
    clickNumber: 0,
    trialId: 0 
}

const ClickData = atom({
    key: 'ClickData',
    default: atomDefault,
  });

export default ClickData;