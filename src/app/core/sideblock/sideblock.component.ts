import {
  Component,
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

  // TODO : comment these Decorators
  @HostBinding('class.is-open')
  isOpen = false;
  title = '';

  @HostBinding('class.is-hidden') hidden = false;

  @ViewChild('dynamic', { read: ViewContainerRef, static: true }) viewContainerRef: ViewContainerRef;

  constructor(private sideContentService: SidecontentService) { }

  ngOnInit() {
    this.sideContentService.setRootViewContainerRef(this.viewContainerRef);
    this.sideContentService.change.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
  }
  hide() {
    this.hidden = !this.hidden;
  }
}
