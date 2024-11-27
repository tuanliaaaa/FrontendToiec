const template = `
  <div id="app">
    <h1>{{ title }}</h1>
    <p>Welcome to {{ title   }} demo!</p>
  </div>
`;

const data = {
  title: 'Hello from .tuan file!'
};

function renderTemplate(targetElement) {
  let compiledTemplate = template.replace(/{{\s*title\s*}}/g, data.title);

  document.querySelector(targetElement).innerHTML = compiledTemplate;
}

export { renderTemplate };
