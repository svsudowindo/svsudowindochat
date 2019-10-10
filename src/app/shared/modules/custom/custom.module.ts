import { NgModule } from '@angular/core';

// Custom Directives
import { TrimOnBlurDirective } from '../../directives/ng-trim.directive';
import { ResponseMessageComponent } from '../../components/response-message/response-message.component';
import { CommonModule } from '@angular/common';
import { PopupModule } from '../../components/componentsAsService/popup/popup.module';
import { LoaderModule } from '../../components/componentsAsService/loader/loader.module';
import { UnderscoreRemovalPipe } from '../../directives/underscore-removal.pipe';
import { NumberOnlyDirective } from '../../directives/number-only.directive';

@NgModule({
    declarations: [
        TrimOnBlurDirective,
        ResponseMessageComponent,
        UnderscoreRemovalPipe,
        NumberOnlyDirective
    ],
    imports: [
        CommonModule,
        PopupModule,
        LoaderModule
    ],
    exports: [
        TrimOnBlurDirective,
        PopupModule,
        ResponseMessageComponent,
        UnderscoreRemovalPipe,
        NumberOnlyDirective
    ]
})
export class CustomModule { }
