
export class Elektrik { 
  key?: string | null;
  aktif?: string;
  reaktif?: string;
  kapasitif?: string;
  date?: string = new Date().toISOString();
  published?:boolean;
}