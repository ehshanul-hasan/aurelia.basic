import {HttpClient, json} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';
import * as environment from '../../config/environment.json';

@inject(HttpClient)
export class ApplicantService{
    http = null;
    constructor(http){
        this.http = http;

        const baseUrl = environment.baseUrl;

        http.configure(config => {
            config.withBaseUrl(baseUrl);
        })
    }

    addApplicant(applicant){
        return this.http.fetch('applicant', {
            method: 'post',
            body: json(applicant)
            })
            .then(response => response.json())
            .then(createdApplicant => {
                return createdApplicant;
            })
               .catch(error => {
                   error.message = "Failed to connect API.";
                   return error;
            });
    }

    getApplicants(){
        return this.http.fetch('applicant')
                 .then(response => response.json())
                 .then(applicant => {
                    return applicant;
                 })
                .catch(error => {
                    error.message = "Failed to connect API";
                   return error;
                });
    }

}