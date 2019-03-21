import { Component, OnInit, Input } from '@angular/core';
import { IProperty } from 'src/app/model/property.model';
import { InvariantsService } from 'src/app/services/crud/invariants.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {

  @Input('property') property: IProperty;

  constructor(private InvariantsService: InvariantsService) { }

  ngOnInit() {
  }

}
