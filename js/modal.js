
/**
 * Register a modal
 * @param {string} modalId id of modal
 * @param {string} closeClass e.g. class name of Close "X" button, etc.
 * @param {string} openClass  e.g. class name of image that launches the modal.
 * @callback ((modal, clickedEle) => void) onClickOpen function called when openClass element is clicked
 * @callback ((modal, clickedEle?) => void) onClickClose function called when closeClass element is clicked or ESC pressed
 */
function registerModal(modalId, openClass, closeClass, onClickOpen, onClickClose) {
  var modal = document.getElementById("painting-modal");

  // Open the modal on clicking openModal element
  Array.from(document.getElementsByClassName(openClass)).forEach(element => {
    element.onclick = () => onClickOpen(modal, element)
  });

  // Close the modal on clicking closeClass element
  Array.from(document.getElementsByClassName(closeClass)).forEach(element => {
      element.onclick = () => onClickClose(modal, element)
  });

  // Close the modal on clicking closeClass element
  window.onclick = function(event) {
    console.log('CLOSE outside', event.target)
    if (event.target == modal) {
      // Clicked on outer modal (i.e. grey area)
      onClickClose(modal)
    }
  }
  window.onkeydown = event => {
    const evt = event || window.event;
    if (evt.key === "Escape" || evt.key === "Esc") {
      onClickClose(modal)
    }
  }
}
