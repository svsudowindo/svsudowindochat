import { CONFIRM_POPUP } from './confirm-dialog.enum';
import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-confirm-dialog",
  templateUrl: "./confirm-dialog.component.html",
  styleUrls: ["./confirm-dialog.component.scss"]
})
export class ConfirmDialogComponent implements OnInit {
  popupInfo: any;
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.popupInfo = data.info;
  }

  ngOnInit() {}

  cancel() {
    this.dialogRef.close(CONFIRM_POPUP.CANCEL);
  }

  ok() {
    this.dialogRef.close(CONFIRM_POPUP.OK);
  }
}
