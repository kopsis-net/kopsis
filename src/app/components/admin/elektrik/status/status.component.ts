import { Component, OnInit } from "@angular/core";
import { Elektrik } from "../../../../api/model/elektrik";
import { ElektrikService } from "../../../../api/elektrik.service";

@Component({
  selector: 'app-elektrik-status',
  templateUrl: './status.component.html'
})
export class EStatusComponent implements OnInit {
  rcezaOrani: number = 0;
  farkAktif: number = 0;
  farkEnduktif: number = 0;
  farkKapasitif: number = 0;
  kcezaOrani: number = 0;
  ceza: string = "";
  kceza: string = "";


  elektrikVerileri: Elektrik[] = [];
  constructor(private tutorialService: ElektrikService) { }

  ngOnInit(): void {
    this.tutorialService.getElektrikVerileri().subscribe(veriler => {
      this.elektrikVerileri = veriler;

      this.elektrikVerileri.sort((a: Elektrik, b: Elektrik) => (new Date(a.date as string)).getTime() - (new Date(b.date as string)).getTime());

      // Son kaydı al
      const sonKayit = veriler[veriler.length - 1];

      // 30 gün önceki tarihi hesapla
      const today = new Date();
      const thirtyDaysAgo = new Date(today);
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      // Son 30 gün içindeki kayıtları filtrele
      const sonOtuzGunVerileri = veriler.filter((veri: any) => {
        const veriTarihi = new Date(veri.date);
        return veriTarihi >= thirtyDaysAgo && veriTarihi <= today;
      });
      // Son 30 gün içindeki kayıtlardan son kaydı al
      const sonOtuzGununSonKaydi = sonOtuzGunVerileri[sonOtuzGunVerileri.length - 1];

      const sonEndeksAktif = sonOtuzGununSonKaydi.active || 0;
      const sonEndeksEnduktif = sonOtuzGununSonKaydi.reactive || 0;
      const sonEndeksKapasitif = sonOtuzGununSonKaydi.capacitive || 0;


      const ilkEndeksAktif = sonKayit.active || 0;
      const ilkEndeksEnduktif = sonKayit.reactive || 0;
      const ilkEndeksKapasitif = sonKayit.capacitive || 0;

      this.farkAktif = ilkEndeksAktif - sonEndeksAktif;
      this.farkEnduktif = ilkEndeksEnduktif - sonEndeksEnduktif;
      this.farkKapasitif = ilkEndeksKapasitif - sonEndeksKapasitif;

      this.rcezaOrani = (this.farkEnduktif / this.farkAktif) * 100;
      this.kcezaOrani = (this.farkKapasitif / this.farkAktif) * 100;

      if (this.rcezaOrani > 20) {
        this.ceza = "Cezalı";
      } else {
        this.ceza = "Cezasız";
      }
      if (this.kcezaOrani > 15) {
        this.kceza = "Cezalı";
      } else {
        this.kceza = "Cezasız";
      }

    });

  }
}
