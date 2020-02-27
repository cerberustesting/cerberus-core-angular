import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TestService } from 'src/app/core/services/crud/test.service';
import { Step } from 'src/app/shared/model/testcase.model';
import { UserService } from 'src/app/core/services/crud/user.service';
import { IUser } from 'src/app/shared/model/user.model';

@Component({
  selector: 'app-librarystepsmodal',
  templateUrl: './librarystepsmodal.component.html',
  styleUrls: ['./librarystepsmodal.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class LibraryStepsModalComponent implements OnInit {

  librarySteps: Step[];
  user: IUser;
  userSystem: string[];

  constructor(
    config: NgbModalConfig,
    public activeModal: NgbActiveModal,
    private testService: TestService,
    private userService: UserService) {

    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.userService.observableUser.subscribe(response => {
      this.user = response;
    });
    this.userService.getUser();

    this.testService.observableLibraryStepList.subscribe(response => {
       this.librarySteps = response;
      });
    this.testService.getLibraryStepList(this.user.defaultSystem);

  }
}
