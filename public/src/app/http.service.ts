import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  greeting = this._socket.fromEvent<string>('greeting');

  constructor(private _socket: Socket) { }
  
  sendMessage(msg:any){
    this._socket.emit('thankyou', msg); 
  };

  getMessage() {
    return this._socket
        .fromEvent("greeting");
}
           
}
