import { BaseContentBlock } from "notion-types";

export interface CustomBaseContentBlock extends BaseContentBlock {
  specialObject: any;
  language?: string;
  hash?: string;
  has_children?: boolean;
  children?: CustomBaseContentBlock[];
  [type: string]: any;
}

export interface CustomImageBlock extends BaseContentBlock {
  type: "image";
  image: {
    caption: Array<{
      type: "text";
      text: {
        content: string;
        link: string | null;
      };
      plain_text: string;
      href: string | null;
    }>;
    type: "file" | "external";
    file?: {
      url: string;
      expiry_time: string;
    };
    external?: {
      url: string;
    };
  };
}
