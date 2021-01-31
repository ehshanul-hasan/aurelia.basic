import { DialogService } from 'aurelia-dialog';
import {inject} from 'aurelia-framework';
import { validateTrigger, ValidationControllerFactory, ValidationRules, Validator } from 'aurelia-validation';
import { Prompt } from 'utilities/confirmation.dialog';
import { BootstrapFormRenderer } from '../../assets/ui.loaders/bootstrap-form-renderer';
import { Applicant } from '../../models/applicant';
import {ApplicantService} from '../../services/applicant.service';
import {Router} from 'aurelia-router';
import { I18N } from 'aurelia-i18n';

@inject(ValidationControllerFactory, DialogService, ApplicantService, Validator, Router, I18N)

export class Index{
  applicant: Applicant = new Applicant();
  controller = null;
  validator = null;
  router = null
  dialogService;
  sendActive: boolean = false;
  isFormDirty: boolean = false;
  public i18n;


  constructor(controllerFactory, dialogService: DialogService, private applicantService: ApplicantService, validator, router: Router, I18N){
    this.i18n = I18N;
    this.validator = validator;
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());
    this.controller.validateTrigger = validateTrigger.change;
    this.controller.subscribe(event => this.validateTotal());
    this.configureValidationRules();
    this.dialogService = dialogService;
    this.router = router;
    
  }
    
  configureValidationRules(){
      ValidationRules
        .ensure('name').required().withMessage(this.i18n.tr("this_field_is_required")).minLength(5).withMessage(this.i18n.tr("this_field_must_be_minimum_5_charecter"))
        .ensure('familyName').required().withMessage(this.i18n.tr("this_field_is_required")).minLength(5).withMessage(this.i18n.tr("this_field_must_be_minimum_5_charecter"))
        .ensure('address').required().withMessage(this.i18n.tr("this_field_is_required")).minLength(10).withMessage(this.i18n.tr("this_field_must_be_minimum_10_charecter"))
        .ensure('countryOfOrigin').required().withMessage(this.i18n.tr("this_field_is_required"))
        .ensure('emailAddress').required().withMessage(this.i18n.tr("this_field_is_required")).matches(/^[-a-zA-Z0-9_.]+@[-a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/).withMessage(this.i18n.tr("invalid_email"))
        .ensure('age').required().withMessage(this.i18n.tr("this_field_is_required")).matches(/^[0-9]*$/).withMessage(this.i18n.tr("age_is_not_correctly_formatted")).range(20,60).withMessage(this.i18n.tr("age_must_be_beyween_20_60"))
        .ensure('hired').required()
        .on(this.applicant);
  }

  attached() {
    this.validate();
  }

  isEqual(){
    // this seems an issue - the form is binding empty string in number field 
    return JSON.stringify(this.applicant) === JSON.stringify(new Applicant());
  }

  validate() {
    this.validator.validateObject(this.applicant).then(results => {
        let valid = true;
        for (let result of results) {
            valid = valid && result.valid;
        }
        this.sendActive = valid;
    });
  }

  

  validateTotal() {
    this.validator.validateObject(this.applicant)
        .then(results => {
          this.sendActive = results.every(result => result.valid);
          this.isFormDirty = !this.isEqual()
        });
  }
    
  addApplicant(){
    this.controller.validate();
    this.applicantService.addApplicant(this.applicant)
      .then(result=> {
        debugger;
        if(result.status == 201 ){
          this.router.navigateToRoute('applicants');
          this.dialogService.open( {viewModel: Prompt, model: { message : result.message, isConfirm: false} });
        } else{
          if(result.status == 400)
            this.dialogService.open( {viewModel: Prompt, model: { message : this.getErrorMessage(result), isConfirm: false} });
          else
            this.dialogService.open( {viewModel: Prompt, model: { message : result.message, isConfirm: false} });
        }
      });
  }
    
  reset() {
    // Allowing reset even if input fields are filled with empty string
    let applicant = this.applicant;
    let controller = this.controller;
    this.dialogService.open( {viewModel: Prompt, model: { message : 'are_you_sure' , isConfirm: true} }).whenClosed().then(response => {
      if (!response.wasCancelled) {
        Object.keys(this.applicant).forEach(function(key,index) {
          applicant[key]= "";
        });
        applicant.hired = false;
        controller.reset();
      }
    })
  }

  getErrorMessage(result){
    let message : string = result.message + "(";
    for (var i = 0; i < result.data.length; i++) {
      message = message + "[" + result.data[i].message + "]";
    }
    return message + ")";
  }

}