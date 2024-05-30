// region.interface.ts

import { Hotel } from '../models/Hotel'; // Import the Hotel interface

export interface Region {
  id: number;
  name: string;
  image: string;
  description: string;
  score : number;
  hotels: Hotel[]; 
}
