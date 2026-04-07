import {landingSections} from './landing-sections.js';

const sectionsRoot = document.getElementById('landing-sections');

if (sectionsRoot instanceof HTMLDivElement) {
  const linkPrefix = document.body.dataset.linkPrefix ?? '/dev/';

  sectionsRoot.replaceChildren(
    ...landingSections.map((section) => {
      const sectionElement = document.createElement('section');
      const titleElement = document.createElement('h2');
      const listElement = document.createElement('ul');

      titleElement.textContent = section.title;

      listElement.replaceChildren(
        ...section.items.map((item) => {
          const listItemElement = document.createElement('li');
          const linkElement = document.createElement('a');

          linkElement.href = `${linkPrefix}${item.file}`;
          linkElement.textContent = item.label;
          listItemElement.append(linkElement);

          return listItemElement;
        })
      );

      sectionElement.append(titleElement, listElement);
      return sectionElement;
    })
  );
}
