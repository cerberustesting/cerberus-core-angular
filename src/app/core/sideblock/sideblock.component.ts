import { 
  Component, 
  NgModule,
  OnInit,
  ViewChild,
  ViewContainerRef,
  HostBinding
} from '@angular/core'
import { SidecontentService } from '../services/crud/sidecontent.service';


@Component({
  selector: 'app-sideblock',
  templateUrl: './sideblock.component.html',
  styleUrls: ['./sideblock.component.scss']
})
export class SideblockComponent implements OnInit {
  @HostBinding('class.is-open')
  isOpen = false;
  title: string = '';

  @ViewChild('dynamic', {read: ViewContainerRef, static: true}) viewContainerRef: ViewContainerRef;

  constructor(private sideContentService: SidecontentService) { }



  ngOnInit() {
    this.sideContentService.setRootViewContainerRef(this.viewContainerRef)
    this.sideContentService.change.subscribe(isOpen => {
      this.isOpen = true;
    });
  }
  close() {
    this.isOpen = false;
  }

}
