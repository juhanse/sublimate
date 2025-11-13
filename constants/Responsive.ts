import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const BASE_WIDTH = 393;
const BASE_HEIGHT = 852;

export const PosX = (x: number) => (x / BASE_WIDTH) * width;
export const PosY = (y: number) => (y / BASE_HEIGHT) * height;
