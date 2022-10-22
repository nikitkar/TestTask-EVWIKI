import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule }   from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './Router/app-routing.module';
import { AppComponent } from './AppComponent/app.component';
import { NavigatePathComponent } from './NavigatorPageProjectComponent/navigatorPageProject.component';
import { NotFoundComponent } from './NotFoundComponent/NotFound.component';

@NgModule({
    declarations: [AppComponent, NavigatePathComponent, NotFoundComponent],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
    providers: [],
    bootstrap: [NavigatePathComponent],
})
export class AppModule {}
