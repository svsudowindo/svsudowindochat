import { IConfirmPopup } from "./confirm-dialog.model";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ConfirmDialogComponent } from "./confirm-dialog.component";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ConfirmDialogService {
  constructor(private dialog: MatDialog) {}

  openConfirmDialog(
    dataInput: IConfirmPopup,
    hasBackdropInput = true,
    disableCloseInput = true
  ): Observable<any> {
    return this.dialog
      .open(ConfirmDialogComponent, {
        width: "350px",
        height: "auto",
        minHeight: "300px",
        hasBackdrop: hasBackdropInput,
        disableClose: disableCloseInput,
        data: {
          info: dataInput
        }
      })
      .afterClosed();
  }
}
