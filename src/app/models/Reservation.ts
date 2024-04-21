export interface Reservation {
    id?: number; 
    client_id?: number;
    hotel_id: number;
    status: string;
    check_in_date: string; 
    check_out_date: string;
  }
  