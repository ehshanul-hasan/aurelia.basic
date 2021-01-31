import { DialogService } from 'aurelia-dialog';
import {inject} from 'aurelia-framework';
import { validateTrigger, ValidationControllerFactory, ValidationRules, Validator } from 'aurelia-validation';
import { SSL_OP_CISCO_ANYCONNECT } from 'constants';
import { Prompt } from 'utilities/confirmation.dialog';
import { BootstrapFormRenderer } from '../../assets/ui.loaders/bootstrap-form-renderer';
import { Applicant } from '../../models/applicant';
import {ApplicantService} from '../../services/applicant.service';

@inject(DialogService, ApplicantService)

export class Index{
  applicants : [] | any;
  controller = null;
  validator = null;
  dialogService;
  sendActive: boolean = false;
  isFormDirty: boolean = false; 


  constructor(dialogService: DialogService, private applicantService: ApplicantService){
    this.dialogService = dialogService;
    this.getApplicant();
  }

  attached() {
  }
    
  getApplicant(){
    this.applicantService.getApplicants()
      .then(result=> {
          debugger
        this.applicants=result.data;
      });
  }

}