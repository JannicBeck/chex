import { Figure } from './figure';

// key should be of type Position, but not possible atm
export interface Board {
  [key: string]: Figure;
}
