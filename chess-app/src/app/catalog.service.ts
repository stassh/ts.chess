import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { parseString } from 'xml2js';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { OpdsLink } from './OpdsLinks';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  static remoteServer = "http://flibusta.is/";
  constructor(private messageService: MessageService, private http: HttpClient) {

  }


  async getCatalog(href: string): Promise<OpdsLink[]> {
    try {
      const links: OpdsLink[] = [];
      console.log(href);
      const value = await this.getOpds(href);
      console.log(value);

      const catalog = await this.parseXml(value);

      // console.log(JSON.stringify(catalog));

      catalog.feed.entry.forEach(entry => {
        links.push( new OpdsLink(entry) );
      });

      return links;
    } catch (error) {
      console.log(`${error.message}`);
    }
  }


  private parseXml(xmlStr: string): Promise<any> {
    return new Promise(function(resolve, reject)
    {
        parseString(xmlStr, function(err, result){
             if(err){
                 reject(err);
             }
             else {
                 resolve(result);
             }
        });
    });
  }

  private async getOpds(href: string): Promise<string> {
    const headers = new HttpHeaders();
    this.messageService.add('CatalogService: fetched catalog');
    return this.http.get(`${CatalogService.remoteServer}${href}`, { headers, responseType: "text" }).toPromise();
  }
}
