import { Injectable } from "@angular/core";
import { MessageService } from "./message.service";
import { parseString } from "xml2js";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Feed } from "./Feed";

@Injectable({
  providedIn: "root"
})
export class CatalogService {
  static remoteServer = "http://flibusta.is/";
  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  async getCatalog(href: string): Promise<Feed> {
    try {
      console.log(`href: ${href}`);

      const value = await this.getOpds(href);
      const catalog = await this.parseXml(value);

      const feed = new Feed(catalog, CatalogService.remoteServer);
      console.log(`${JSON.stringify(feed)}`);
      return feed;
    } catch (error) {
      console.log(`${error.message}`);
    }
  }

  private parseXml(xmlStr: string): Promise<any> {
    return new Promise((resolve, reject) => {
      parseString(xmlStr, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  private async getOpds(href: string): Promise<string> {
    const headers = new HttpHeaders();
    const path = `${CatalogService.remoteServer}${href}`;
    this.messageService.add(`CatalogService: fetched catalog ${path}`);
    return this.http
      .get(path, {
        headers,
        responseType: "text"
      })
      .toPromise();
  }
}
