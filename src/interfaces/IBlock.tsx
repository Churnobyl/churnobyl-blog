import { BaseContentBlock } from "notion-types";

export interface CustomBaseContentBlock extends BaseContentBlock {
  specialObject: any;
  language?: string;
  hash?: string;
  has_children?: boolean;
  children?: CustomBaseContentBlock[];
  [type: string]: any;
  parentId?: string;
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

export interface CustomTableBlock extends BaseContentBlock {
  type: "table";
  table: {
    table_width: number;
    has_column_header: boolean;
    has_row_header: boolean;
  };
  children: CustomTableRowBlock[];
}

export interface CustomTableRowBlock extends BaseContentBlock {
  type: "table_row";
  table_row: {
    cells: Array<
      Array<{
        type: string;
        text?: {
          content: string;
          link: string | null;
        };
        annotations?: {
          bold: boolean;
          italic: boolean;
          strikethrough: boolean;
          underline: boolean;
          code: boolean;
          color: string;
        };
        plain_text: string;
        href?: string | null;
      }>
    >;
  };
}

export interface CustomBookmarkBlock extends BaseContentBlock {
  type: "bookmark";
  bookmark: {
    caption: Array<{
      type: "text";
      text: {
        content: string;
        link: string | null;
      };
      plain_text: string;
      href: string | null;
    }>;
    url: string;
  };
}

export interface CustomEquationBlock extends BaseContentBlock {
  type: "equation";
  equation: {
    expression: string;
  };
}

export interface CustomEmbedBlock extends BaseContentBlock {
  type: "embed";
  embed: {
    caption: Array<{
      type: "text";
      text: {
        content: string;
        link: string | null;
      };
      plain_text: string;
      href: string | null;
    }>;
    url: string;
  };
}

export interface CustomToDoBlock extends BaseContentBlock {
  type: "to_do";
  to_do: {
    rich_text: Array<{
      type: "text";
      text: {
        content: string;
        link: string | null;
      };
      annotations: {
        bold: boolean;
        italic: boolean;
        strikethrough: boolean;
        underline: boolean;
        code: boolean;
        color: string;
      };
      plain_text: string;
      href: string | null;
    }>;
    checked: boolean;
    color: string;
    children?: CustomBaseContentBlock[];
  };
}

export interface CustomToggleBlock extends BaseContentBlock {
  type: "toggle";
  toggle: {
    rich_text: Array<{
      type: "text";
      text: {
        content: string;
        link: string | null;
      };
      annotations: {
        bold: boolean;
        italic: boolean;
        strikethrough: boolean;
        underline: boolean;
        code: boolean;
        color: string;
      };
      plain_text: string;
      href: string | null;
    }>;
    color: string;
    children?: CustomBaseContentBlock[];
  };
}
