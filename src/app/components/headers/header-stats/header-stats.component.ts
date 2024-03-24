import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";

@Component({
  selector: "app-header-stats",
  templateUrl: "./header-stats.component.html",
})
export class HeaderStatsComponent implements OnInit {

  linkim: string = "";
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Router durumu burada kontrol edilir ve linkim değişkeni güncellenir
        if (this.router.url.includes('elektrik')) {
          this.linkim = 'elektrik';
        } else {
          this.linkim = ''; // Diğer durumlar için gerekirse
        }
      }
    });
  };

}

