import { atom } from "recoil";

const jwtDefault = {
    token: "",
}

const JWTatom = atom({
    key: 'JWTToken',
    default: jwtDefault,
  });

export default JWTatom;