const renderToDOM = (divId, content) => {
  const selectedDiv = document.querySelector(divId);
  if (selectedDiv) {
    selectedDiv.innerHTML = content;
  } else {
    console.error(`Element with ID '${divId}' does not exist in DOM.`);
  }
};

export default renderToDOM;
