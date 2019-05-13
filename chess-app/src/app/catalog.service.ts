import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { parseString } from 'xml2js';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(private messageService: MessageService) {

  }


  getCatalog(): any {
    return this.parseXml('<test>texts</test>');
  }
  private parseXml(xmlStr) {

    parseString(xmlStr, (error, result) => {
      if (error) {
        throw error;
      } else {
        console.log(result);
      }
    });
  }
}
