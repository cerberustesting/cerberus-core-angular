import { Component, OnInit } from '@angular/core';
import { HeaderTitleService } from 'src/app/core/services/utils/header-title.service';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss']
})
export class LabelsComponent implements OnInit {

  constructor(private headerTitleService: HeaderTitleService) {
    headerTitleService.setTitle('Labels');
  }

  ngOnInit() {
  }

}
