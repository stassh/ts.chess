export class OpdsLink {
  name: string;
  path: string;
  id: string;

  constructor ( rawObject: any ) {
    console.log(JSON.stringify(rawObject));

    if (rawObject.id.length > 0) {
      this.id = rawObject.id[0];
    } else {
      this.id = rawObject.id;
    }

    if (rawObject.title.length > 0) {
      this.name = rawObject.title[0];
    } else {
      this.name = rawObject.title;
    }
    if (rawObject.link.length > 0) {
      this.path = rawObject.link[0].$.href;
    } else {
      this.name = rawObject.link.$.href;
    }
  }
}