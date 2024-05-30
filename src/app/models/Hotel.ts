import { CategoryHotel } from "./CategoryHotel";

export interface Hotel {
    id: number; 
    name: string;
    description: string;
    image: string;
    contact_email: string;
    city: string;
    contact_phone: string;
    promotion: string;
    price: number;
    review: number;
    starnumber :string;
    category_hotel_id: number;
    region_id:number;
    categoryHotel: CategoryHotel;
   
  }
  
