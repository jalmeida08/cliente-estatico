import { NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./login.component";

@NgModule({
    declarations: [ LoginComponent ],
    imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class LoginModule { }