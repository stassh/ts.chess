export class Feed {
  path: string[] = [];
  id: string[] = [];
  contents: string[] = [];

  //
  links: Link[] = [];
  titles: string[] = [];
  icons: string[] = [];

  entries: Entry[] = [];

  constructor(rawObject: any, basePath: string) {
    const rawFeed = rawObject.feed;
    console.log(JSON.stringify(rawFeed));

    this.id.push(...rawFeed.id);

    this.contents.push(...rawFeed.content);

    // if (rawFeed.link !== undefined && rawFeed.link.length > 0) {
    //   this.path = rawFeed.link[0].$.href;
    // } else {
    //   this.path = rawFeed.link.$.href;
    // }

    this.titles.push(...rawFeed.title);
    const iconArray = [];
    iconArray.push(...rawFeed.icon);
    this.icons.push(...iconArray.map(href => `${basePath}${href}`));

    Utils.addLinks(rawFeed, this.links, basePath);

    if (rawFeed.entry !== undefined) {
      if (rawFeed.entry.length > 0) {
        this.entries.push(
          ...rawFeed.entry.map(link => new Entry(link, basePath))
        );
      }
    }
  }
}

export class Entry {
  titles: string[] = [];
  contents: string[] = [];
  id: string[] = [];
  links: Link[] = [];

  picture: Link;
  downloadLinks: Link[];

  constructor(rawEntry: any, basePath: string) {
    this.titles.push(...rawEntry.title);

    const contents = [];
    contents.push(...rawEntry.content);
    this.contents.push(...contents.map(content => content._));

    Utils.addLinks(rawEntry, this.links, basePath);

    this.picture = this.links.find(item => item.rel === LinkTypes.IMAGE);
    if (this.picture !== undefined) {
      this.picture.href = `${basePath}${this.picture.href}`;
      console.log(`${JSON.stringify(this.picture)}`);
    }

    this.downloadLinks = this.links.filter(item => item.rel === LinkTypes.DOWNLOAD_LINK).map(item => { return { rel: item.rel, href: `${basePath}${item.href}` } });
    console.log(`links ${JSON.stringify(this.downloadLinks)}`);
  }
}

export class Link {
  rel: string;
  href: string;
  constructor(rawLink: any, basePath: string) {
    this.href = rawLink.$.href;
    this.rel = rawLink.$.rel;
  }
}

enum LinkTypes {
  IMAGE = "x-stanza-cover-image",
  DOWNLOAD_LINK = "http://opds-spec.org/acquisition/open-access"
}

export class Utils {
  static addLinks(rawFeed: any, links: any, basePath: string) {
    if (rawFeed.link !== undefined) {
      if (rawFeed.link.length > 0) {
        links.push(...rawFeed.link.map(link => new Link(link, basePath)));
      }
    }
  }
}
