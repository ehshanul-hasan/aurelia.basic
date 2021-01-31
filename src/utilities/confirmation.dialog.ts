import {autoinject} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';

@autoinject
export class Prompt {
   message: string = '';
   isConfirm: boolean = false;

   constructor(public controller: DialogController) {
   }
   activate(model) {
      this.message = model.message;
      this.isConfirm = model.isConfirm;
   }
}