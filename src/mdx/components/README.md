# mdBlock Components

These components render different types of Notion blocks as React components.

## Available Components

- MdBlockH1, MdBlockH2, MdBlockH3: Render heading blocks
- MdBlockParagraph: Renders paragraph blocks
- MdBlockImage: Renders image blocks
- MdBlockDivider: Renders divider blocks
- MdBlockQuote: Renders quote blocks
- MdBlockCode: Renders code blocks
- MdBlockBulletedListItem: Renders bulleted list items
- MdBlockNumberedListItem: Renders numbered list items
- MdBlockCallout: Renders callout blocks
- MdBlockTable: Renders table blocks
- MdBlockTableRow: Renders table row blocks
- MdBlockBookmark: Renders bookmark blocks
- MdBlockEquation: Renders equation blocks
- MdBlockEmbed: Renders embed blocks
- MdBlockToDo: Renders to-do blocks with checkboxes
- MdBlockToggle: Renders toggle blocks

## Table Component Usage

The table component renders Notion tables in a responsive layout with support for:
- Column headers
- Row headers
- Rich text formatting within cells
- Links within cells

### Structure

The Notion API represents tables with a structure like this:

```typescript
// Table block
{
  type: "table",
  table: {
    table_width: number,        // Number of columns
    has_column_header: boolean, // Whether the first row is a header
    has_row_header: boolean     // Whether the first column is a header
  },
  // Child blocks containing the rows
  children: [
    // Table row blocks
    {
      type: "table_row",
      table_row: {
        cells: [
          // Each cell is an array of rich text objects
          [
            {
              type: "text",
              text: { content: "Cell content", link: null },
              plain_text: "Cell content",
              annotations: { bold: false, italic: false, ... },
              href: null
            }
          ],
          // More cells...
        ]
      }
    },
    // More rows...
  ]
}
```

## Bookmark Component

Renders a link with preview information.

```typescript
// Bookmark block
{
  type: "bookmark",
  bookmark: {
    url: string,         // The URL of the bookmark
    caption: [           // Optional caption text
      {
        // Rich text content
      }
    ]
  }
}
```

## Equation Component

Renders mathematical equations using KaTeX (needs to be installed separately).

```typescript
// Equation block
{
  type: "equation",
  equation: {
    expression: string   // LaTeX formula
  }
}
```

## Embed Component

Embeds external content in an iframe.

```typescript
// Embed block
{
  type: "embed",
  embed: {
    url: string,         // The URL to embed
    caption: [           // Optional caption
      {
        // Rich text content
      }
    ]
  }
}
```

## To-Do Component

Renders checkable to-do items.

```typescript
// To-do block
{
  type: "to_do",
  to_do: {
    rich_text: [         // The text content
      {
        // Rich text content
      }
    ],
    checked: boolean,    // Whether the to-do is checked
    color: string,       // Text color
    children: []         // Optional child blocks
  }
}
```

## Toggle Component

Renders collapsible content.

```typescript
// Toggle block
{
  type: "toggle",
  toggle: {
    rich_text: [         // The text for the toggle header
      {
        // Rich text content
      }
    ],
    color: string,       // Text color
    children: []         // The content shown when expanded
  }
}
```

## Usage

When a block is encountered in the Notion content, the mdHandler component will:

1. Determine the appropriate component based on the block type
2. Pass the block data to the component
3. The component will render the content accordingly

All components support rich text formatting for text content, including:
- Bold, italic, strikethrough, underline, and code formatting
- Text colors
- Links
- Nested blocks where applicable 