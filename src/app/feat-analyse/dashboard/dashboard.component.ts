import { Component, OnInit } from '@angular/core';
import { HeaderTitleService } from 'src/app/core/services/utils/header-title.service';
declare function initChartJS();

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private filterSectionToggle: boolean;
  private filterSectionMouseOver: boolean;

  constructor(private headerTitleService: HeaderTitleService) {
    headerTitleService.setTitle('Dashboard');
    this.filterSectionMouseOver = true;
    this.filterSectionMouseOver = false;
  }

  ngOnInit() {
    initChartJS();
  }

}
