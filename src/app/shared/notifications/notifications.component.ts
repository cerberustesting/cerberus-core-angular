import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  constructor(
    public snackBar: MatSnackBar,
    public snackBarRef: MatSnackBarRef<NotificationsComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any, ) { }

  ngOnInit() { }

  public dismissSnackbar(): void {
    this.snackBar.dismiss();
  }

}
