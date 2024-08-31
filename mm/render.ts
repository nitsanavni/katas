import logUpdate from "log-update";

let cursorPosition: number;
let listItems: string[];
let selectedIndex: number;
let inEditMode: boolean;

export function render(
  items: string[],
  selectedIndex: number,
  cursorPosition: number,
  inEditMode: boolean,
) {
  listItems = items;
  let output = listItems
    .map((item, index) => {
      if (index === selectedIndex) {
        if (inEditMode) {
          const beforeCursor = item.slice(0, cursorPosition);
          const cursorChar = item[cursorPosition] || " "; // If no char, use space
          const afterCursor = item.slice(cursorPosition + 1);

          // Set background color to blue for the character under the cursor
          const coloredCursorChar = `\x1b[47m\x1b[30m${cursorChar}\x1b[0m`; // White background with black text

          return `${beforeCursor}${coloredCursorChar}${afterCursor}`;
        } else {
          // Highlight selected item in navigation mode
          return `\x1b[47m\x1b[30m${item}\x1b[0m`;
        }
      }
      return item;
    })
    .join("\n");

  logUpdate(output);
}
