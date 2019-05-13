import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { parseString } from 'xml2js';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { OpdsLink } from './OpdsLinks';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  static remoteServer = "http://flibusta.is/opds";
  constructor(private messageService: MessageService, private http: HttpClient) {

  }


  async getCatalog(): Promise<OpdsLink[]> {
    try {
      const links: OpdsLink[] = [];
      const value = await this.getOpds();
      const catalog = await this.parseXml(value);

      // console.log(JSON.stringify(catalog));

      catalog.feed.entry.forEach(entry => {
        links.push( { name: entry.title[0], path: entry.link[0].$.href } );
      });

      return links;
    } catch (error) {
      console.log(`${error}`);
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
    // parseString(xmlStr, (error, result) => {
    //   if (error) {
    //     throw error;
    //   } else {
    //     console.log(result);
    //     return result;
    //   }
    // });
  }

  private async getOpds(): Promise<string> {
    const headers = new HttpHeaders();
    this.messageService.add('CatalogService: fetched catalog');
    return this.http.get(CatalogService.remoteServer + '', { headers, responseType: "text" }).toPromise();
  }
}
