export class Kullanici {
  id?: string | null;
  ad: string;
  soyad: string;
  parola: string;

  constructor(ad: string, soyad: string, parola: string) {
    this.ad = ad;
    this.soyad = soyad;
    this.parola = parola;
  }
}