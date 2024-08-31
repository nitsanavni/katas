let _cursorPosition = 0;
let _listItems = [""];
let _selectedIndex = 0;
let _inEditMode = true;

export const state = {
  cursorPos: () => _cursorPosition,
  cursorRight: () => {
    _cursorPosition = Math.min(
      _listItems[_selectedIndex].length,
      _cursorPosition + 1,
    );
  },
  cursorLeft: () => {
    _cursorPosition = Math.max(0, _cursorPosition - 1);
  },
  deleteChar: () => {
    if (_cursorPosition > 0) {
      _listItems[_selectedIndex] =
        _listItems[_selectedIndex].slice(0, _cursorPosition - 1) +
        _listItems[_selectedIndex].slice(_cursorPosition);
      _cursorPosition--;
    }
  },
  addItem: () => {
    _listItems.push("");
    _selectedIndex = _listItems.length - 1;
    _cursorPosition = 0;
    _inEditMode = true;
  },
  addChar: (char: string) => {
    _listItems[_selectedIndex] =
      _listItems[_selectedIndex].slice(0, _cursorPosition) +
      char +
      _listItems[_selectedIndex].slice(_cursorPosition);
    _cursorPosition++;
  },
  toggleEditMode: () => {
    _inEditMode = !_inEditMode;
    if (_inEditMode) _cursorPosition = _listItems[_selectedIndex].length;
  },
  moveUp: () => {
    _selectedIndex = Math.max(0, _selectedIndex - 1);
  },
  moveDown: () => {
    _selectedIndex = Math.min(_listItems.length - 1, _selectedIndex + 1);
  },
  escape: () => {
    _selectedIndex = -1;
  },
  inEditMode: () => _inEditMode,
  selectedIndex: () => _selectedIndex,
  listItems: () => _listItems,
};
