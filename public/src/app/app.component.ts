import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from './http.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'public';
  greeting:any;

  constructor(private _httpservice: HttpService) { }

  ngOnInit() {
    this._httpservice.getMessage()
    .subscribe(data => {
      console.log(data);
      this.greeting=data['msg'];
      let msg={ msg: 'Thank you for connecting me! -Client' }
      this._httpservice.sendMessage(msg);
    });
  }

}
