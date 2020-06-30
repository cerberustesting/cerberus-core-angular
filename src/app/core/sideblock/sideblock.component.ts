import { Component, OnInit, ViewChild, ViewContainerRef, HostBinding } from '@angular/core';
import { SidecontentService } from '../services/api/sidecontent.service';

@Component({
  selector: 'app-sideblock',
  templateUrl: './sideblock.component.html',
  styleUrls: ['./sideblock.component.scss']
})
export class SideblockComponent implements OnInit {

  @HostBinding('class.is-open') isOpen = false;

  @HostBinding('class.is-hidden') hidden = false;

  @ViewChild('dynamic', { read: ViewContainerRef, static: true }) viewContainerRef: ViewContainerRef;

  constructor(private sideContentService: SidecontentService) { }

  ngOnInit() {
    // set the root view container
    this.sideContentService.setRootViewContainerRef(this.viewContainerRef);

    // subscribe to the is open flag linked with CSS (see @HostBinding)
    this.sideContentService.change.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
  }

  /**
   * toggle the hidden attribute to update the view
   */
  toggleHidden(): void {
    this.hidden = !this.hidden;
  }

}
