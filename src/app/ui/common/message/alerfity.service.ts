/**
 * 
 * 
 * 
 * Try to use 
 */

// import { Injectable } from '@angular/core';

// declare var alertify: any;

// @Injectable({
//   providedIn: 'root'
// })
// export class AlertifyService {

//   constructor() { }

//   // message(message: string, messageType: MessageType, position: Position, dismissOthers: boolean
//   //   , delay: number = 50
//   // ) 
  
//   message(message: string, options: Partial<AlertifyOptions>)
//   {
//     alertify.set('notifier', 'delay', options.delay)
//     alertify.set('notifier', 'position', options.position);
//     const msg = alertify[options.messageType!](message);
//     if (options.dismissOthers) {
//       msg.dismissOthers();
//     }
//   }

//   static dismissOthers() { alertify.dismissAll(); }
// }

// export enum MessageType {
//   Error = "error",
//   Message = "message",
//   Notify = "notify",
//   Success = "suceess",
//   Warning= "warning"

// }

// export class AlertifyOptions {
//   messageType: MessageType = MessageType.Message;
//   position: Position =  Position.BottomRight;
//   delay: number = 3;
//   dismissOthers: boolean = true;
// }


// export enum Position {
//   TopLeft = "top-left",
//   TopRight = "top-right",
//   TopCenter = "top-center",
//   BottomLeft = "bottom-left",
//   BottomRight = "bottom-right",
//   TopBottom = "top-bottom"
// }
