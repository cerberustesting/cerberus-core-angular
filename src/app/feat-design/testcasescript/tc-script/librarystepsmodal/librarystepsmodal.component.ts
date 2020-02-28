import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TestcaseService } from 'src/app/core/services/api/testcase/testcase.service';
import { Step } from 'src/app/shared/model/testcase.model';
import { UserService } from 'src/app/core/services/api/user.service';
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
    private testService: TestcaseService,
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
