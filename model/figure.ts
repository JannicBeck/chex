import { Player } from './player';
import { FigureType } from './figure-type';
import { Position } from './position';

export interface Figure {
  type: FigureType;
  position: Position;
  player: Player;
}


