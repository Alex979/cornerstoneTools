import { state } from './index.js';

export { setSVGCursor, resetCursor, hideCursor };

/**
 * Creates an SVG Cursor for the target element
 *
 * @param {Object} tool The tool to fetch the cursor from.
 */
function setSVGCursor(tool) {
  console.log('attempting to set cursor...');
  // TODO: (state vs options) Exit if cursors wasn't updated
  // TODO: Exit if invalid options to create cursor

  // Note: Max size of an SVG cursor is 128x128, default is 32x32.
  const cursorBlob = tool.configuration.svgCursor.blob;
  const mousePoint = tool.configuration.svgCursor.mousePoint;

  const element = tool.element;

  console.log(cursorBlob);

  const svgCursorUrl = window.URL.createObjectURL(cursorBlob);

  console.log(svgCursorUrl);

  console.log(element.style.cursor);
  element.style.cursor = `url('${svgCursorUrl}') ${mousePoint}, auto`;

  state.svgCursorUrl = svgCursorUrl;

  console.log('cursor set?');
  console.log(element.style.cursor);
}

function resetCursor(element) {
  _clearStateAndSetCursor(element, 'initial');
}

function hideCursor(element) {
  _clearStateAndSetCursor(element, 'none');
}

function _clearStateAndSetCursor(element, cursorSeting) {
  if (state.svgCursorUrl) {
    window.URL.revokeObjectURL(state.svgCursorUrl);
  }

  state.svgCursorUrl = null;
  element.style.cursor = cursorSeting;
}
