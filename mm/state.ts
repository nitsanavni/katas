let _cursorPosition = 0;
let _listItems = [{ text: "", indent: 0 }]; // Now each item is an object with text and indent
let _selectedIndex = 0;
let _inEditMode = true;

export const state = {
  cursorPos: () => _cursorPosition,
  cursorRight: () => {
    _cursorPosition = Math.min(
      _listItems[_selectedIndex].text.length,
      _cursorPosition + 1,
    );
  },
  cursorLeft: () => {
    _cursorPosition = Math.max(0, _cursorPosition - 1);
  },
  deleteChar: () => {
    if (_cursorPosition > 0) {
      _listItems[_selectedIndex].text =
        _listItems[_selectedIndex].text.slice(0, _cursorPosition - 1) +
        _listItems[_selectedIndex].text.slice(_cursorPosition);
      _cursorPosition--;
    }
  },
  addItem: () => {
    const currentIndent = _listItems[_selectedIndex]?.indent || 0;
    _listItems.push({ text: "", indent: currentIndent });
    _selectedIndex = _listItems.length - 1;
    _cursorPosition = 0;
    _inEditMode = true;
  },
  addChar: (char: string) => {
    _listItems[_selectedIndex].text =
      _listItems[_selectedIndex].text.slice(0, _cursorPosition) +
      char +
      _listItems[_selectedIndex].text.slice(_cursorPosition);
    _cursorPosition++;
  },
  toggleEditMode: () => {
    _inEditMode = !_inEditMode;
    if (_inEditMode) _cursorPosition = _listItems[_selectedIndex].text.length;
  },
  moveUp: () => {
    _selectedIndex = Math.max(0, _selectedIndex - 1);
  },
  moveDown: () => {
    _selectedIndex = Math.min(_listItems.length - 1, _selectedIndex + 1);
  },
  indentItem: () => {
    if (_selectedIndex > 0) {
      const prevItem = _listItems[_selectedIndex - 1];
      const currentItem = _listItems[_selectedIndex];
      if (currentItem.indent <= prevItem.indent) {
        currentItem.indent++;
      }
    }
  },
  dedentItem: () => {
    const currentItem = _listItems[_selectedIndex];
    if (currentItem.indent > 0) {
      currentItem.indent--;
    }
  },
  inEditMode: () => _inEditMode,
  selectedIndex: () => _selectedIndex,
  listItems: () => _listItems,
};
