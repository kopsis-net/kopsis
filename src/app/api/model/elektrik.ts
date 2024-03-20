
export class Elektrik { 
  key?: string | null;
  active?: number; 
  reactive?: number;
  capacitive?: number;
  date?: string = new Date().toISOString();
  published?:boolean;
}