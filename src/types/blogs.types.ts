export interface singleBlogType {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta: {
    footnotes: string;
  };
  categories: number[];
  tags: [];
  _links: links;
  _embedded: Embedded;
}

interface linkType {
  href: string;
}

interface authorType extends linkType {
  embeddable?: boolean;
  taxonomy?: string;
}

export interface BlogCategoryAndTag {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  parent: number;
  meta: [];
  _links: links;
}
interface links {
  self?: linkType[];
  collection?: linkType[];
  about?: linkType[];
  author?: authorType[];
  replies?: authorType[];
  "version-history"?: authorType[];
  "wp:attachment"?: linkType[];
  "wp:term"?: authorType[];
  curies?: [
    {
      name: string;
      href: string;
      templated: boolean;
    }
  ];
}

export interface BlogAuthor {
  id: number;
  name: string;
  url: string;
  description: string;
  link: string;
  slug: string;
  avatar_urls: {
    24: string;
    48: string;
    96: string;
  };
  meta: number[];
  _links: {
    self: [
      {
        href: string;
      }
    ];
    collection: [
      {
        href: string;
      }
    ];
  };
}

export interface BlogMedia {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  template: string;
  meta: string[];
  description: {
    rendered: string;
  };
  caption: {
    rendered: string;
  };
  alt_text: string;
  media_type: string;
  mime_type: string;
  media_details: {
    width: number;
    height: number;
    file: string;
    filesize: number;
    sizes: {
      medium: ImageInfo;
      large: ImageInfo;
      thumbnail: ImageInfo;
      medium_large: ImageInfo;
      "1536x1536": ImageInfo;
      "2048x2048": ImageInfo;
      full: ImageInfo;
    };
    image_meta: {
      aperture: 0;
      credit: string;
      camera: string;
      caption: string;
      created_timestamp: 0;
      copyright: string;
      focal_length: 0;
      iso: 0;
      shutter_speed: 0;
      title: string;
      orientation: 0;
      keywords: [];
    };
    original_image: string;
  };
  post: number;
  source_url: string;
  _links: links;
}

interface ImageInfo {
  file: string;
  width: number;
  height: number;
  filesize: number;
  mime_type: string;
  source_url: string;
}

export interface singleBlogPageData {
  blog: singleBlogType;
  category: BlogCategoryAndTag;
  author: BlogAuthor;
  media: BlogMedia;
}

interface Embedded {
  author: BlogAuthor[];
  "wp:featuredmedia": BlogMedia[];
  "wp:term": BlogCategoryAndTag[][];
}
