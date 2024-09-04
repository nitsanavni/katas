let _cursorPosition = 0;
let _listItems = [{ text: "", indent: 0 }];
let _selectedIndex = 0;
let _inEditMode = true;

export const state = {
  cursorPos: () => _cursorPosition,
  cursorRight: () => {
    _cursorPosition = Math.min(
      _listItems[_selectedIndex].text.length,
      _cursorPosition + 1
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
  addChild: () => {
    const parentIndent = _listItems[_selectedIndex]?.indent || 0;
    // Find the position to insert after all descendants
    let insertIndex = _selectedIndex + 1;
    while (insertIndex < _listItems.length && _listItems[insertIndex].indent > parentIndent) {
      insertIndex++;
    }
    _listItems.splice(insertIndex, 0, { text: "", indent: parentIndent + 1 });
    _selectedIndex = insertIndex;
    _cursorPosition = 0;
    _inEditMode = true;
  },
  addSibling: () => { // Add sibling item
    const currentIndent = _listItems[_selectedIndex]?.indent || 0;
    _listItems.splice(_selectedIndex + 1, 0, { text: "", indent: currentIndent });
    _selectedIndex++;
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
  moveToParent: () => {
    if (_selectedIndex > 0) {
      const parentIndent = _listItems[_selectedIndex].indent - 1;
      for (let i = _selectedIndex - 1; i >= 0; i--) {
        if (_listItems[i].indent === parentIndent) {
          _selectedIndex = i;
          _cursorPosition = 0;
          break;
        }
      }
    }
  },
  moveToFirstChild: () => {
    if (_selectedIndex < _listItems.length - 1) {
      const currentIndent = _listItems[_selectedIndex].indent;
      for (let i = _selectedIndex + 1; i < _listItems.length; i++) {
        if (_listItems[i].indent === currentIndent + 1) {
          _selectedIndex = i;
          _cursorPosition = 0;
          break;
        }
      }
    }
  },
  indentItem: () => {
    if (_selectedIndex <= 0) return;

    const currentItem = _listItems[_selectedIndex];
    const parentItem = _listItems[_selectedIndex - 1];
    const maxIndent = parentItem.indent + 1;

    if (maxIndent <= currentItem.indent) {
      return;
    }

    currentItem.indent++;

    for (let i = _selectedIndex + 1; i < _listItems.length; i++) {
      if (_listItems[i].indent > (currentItem.indent - 1)) {
        _listItems[i].indent++;
      } else {
        break;
      }
    }
  },
  dedentItem: () => {
    const currentItem = _listItems[_selectedIndex];
    if (currentItem.indent > 0) {
      const oldIndent = currentItem.indent;

      currentItem.indent--;

      for (let i = _selectedIndex + 1; i < _listItems.length; i++) {
        if (_listItems[i].indent > oldIndent) {
          _listItems[i].indent--;
        } else {
          break;
        }
      }
    }
  },
  inEditMode: () => _inEditMode,
  selectedIndex: () => _selectedIndex,
  listItems: () => _listItems,
  saveOutlineToFile: async (filePath: string) => {
    const outline = _listItems.map(item => '  '.repeat(item.indent) + item.text).join('\n');
    await Bun.write(filePath, outline);
  },
  loadOutlineFromFile: async (filePath: string) => {
    try {
      const file = Bun.file(filePath);
      const content = await file.text();
      _listItems = content.split('\n').map((line) => {
        const indent = line.search(/\S|$/);
        return {
          text: line.trim(),
          indent: indent / 2 // assuming two spaces for each indentation level
        };
      });
      _selectedIndex = 0; 
      _cursorPosition = 0; 
      _inEditMode = true; 
    } catch {
      _listItems = [{ text: "", indent: 0 }];
      _selectedIndex = 0;
      _cursorPosition = 0;
      _inEditMode = true;
      await Bun.write(filePath, ""); 
    }
  },
};
