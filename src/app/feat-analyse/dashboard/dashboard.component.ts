import { Component, OnInit } from '@angular/core';
import { HeaderTitleService } from 'src/app/core/services/crud/header-title.service';
declare function initChartJS();

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private filterSectionToggle: boolean = true;
  private filterSectionMouseOver: boolean = false;
  private test: Array<string> = ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'];

  constructor(private headerTitleService: HeaderTitleService) {
    headerTitleService.setTitle("Dashboard");
  }

  ngOnInit() {
    initChartJS();
  }

}
