import { NgModule } from "@angular/core";

// Custom Directives
import { TrimOnBlurDirective } from "../../directives/ng-trim.directive";
import { ResponseMessageComponent } from "../../components/response-message/response-message.component";
import { CommonModule } from "@angular/common";
import { PopupModule } from "../../components/componentsAsService/popup/popup.module";
import { LoaderModule } from "../../components/componentsAsService/loader/loader.module";
import { UnderscoreRemovalPipe } from "../../directives/underscore-removal.pipe";
import { NumberOnlyDirective } from "../../directives/number-only.directive";
import { AuthHeaderComponent } from "../../components/auth-header/auth-header.component";
import { SnackbarMessengerModule } from "../../components/componentsAsService/snackbar-messenger/snackbar-messenger.module";
import { NoRecordsFoundModule } from "../../components/no-records-found/no-records-found.module";
import { ConfirmDialogModule } from "../../components/componentsAsService/confirm-dialog/confirm-dialog.module";

@NgModule({
  declarations: [
    TrimOnBlurDirective,
    ResponseMessageComponent,
    UnderscoreRemovalPipe,
    NumberOnlyDirective,
    AuthHeaderComponent
  ],
  imports: [
    CommonModule,
    PopupModule,
    LoaderModule,
    SnackbarMessengerModule,
    NoRecordsFoundModule,
    ConfirmDialogModule
  ],
  exports: [
    TrimOnBlurDirective,
    PopupModule,
    ResponseMessageComponent,
    UnderscoreRemovalPipe,
    NumberOnlyDirective,
    AuthHeaderComponent,
    NoRecordsFoundModule,
    ConfirmDialogModule
  ]
})
export class CustomModule {}
