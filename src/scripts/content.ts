// Copyright 2022 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
const values = new Map();
const axios = require('axios');
const LAMBDA_URL = ''

const handleButtonClick = () => {
  const codeEditorElement = document.querySelector('[data-track-load="code_editor"]');
  if (codeEditorElement) {
    const linesContentElement = codeEditorElement!.querySelector('.lines-content') as HTMLElement;
    values.set("submit", linesContentElement.innerText)

    setTimeout(() => {
      const submissionResult = document.querySelector('[data-e2e-locator="submission-result"]') as HTMLElement;
      if (submissionResult.innerText === "Accepted") {
        const req = {
          "title": values.get('title'),
          "code_answer": linesContentElement.innerText,
          "readme": values.get('readme'),
          "difficulty": values.get('difficulty'),
        }
        try {
          axios.post(LAMBDA_URL, req)
        } catch (e) {
          console.log(e)
        }
      }

    }, 5000)
  }
}

setTimeout(() => {
  const submitButton = document.querySelector('[data-e2e-locator="console-submit-button"]') as HTMLElement;
  const problemDescription = document.querySelector('[data-track-load="description_content"]') as HTMLElement;
  const codeEditorElement = document.querySelector('[data-track-load="code_editor"]')as HTMLElement ;
  const elementsWithClass = document.querySelectorAll('div.flex.space-x-4');
  const difficulty = document.querySelector('.text-yellow, .text-pink, .text-olive') as HTMLElement;
  const problemTitle = elementsWithClass[1] as HTMLElement;
  const currentUrl = window.location.href;
  const formattedTitle = problemTitle.innerText.replace(/\./g, "").replace(/ /g, "-");

  const descriptionFormatted = problemDescription.innerHTML.replace(/<p>&nbsp;<\/p>/g, "")
  values.set( 'difficulty', difficulty.innerText)
  values.set( 'title', formattedTitle)
  values.set('readme', '## [' + problemTitle.innerText + '](' + currentUrl + ')\n' + '## ' + difficulty.innerText + '\n' + descriptionFormatted)


  if (codeEditorElement) {
    const linesContentElement = codeEditorElement!.querySelector('.lines-content') as HTMLElement;
  }
  
  if (submitButton) {
    submitButton.addEventListener('click', handleButtonClick)
  }
}, 2000)

// `document.querySelector` may return null if the selector doesn't match anything.
// if (article) {
//   const text = article.textContent;
//   /**
//    * Regular expression to find all "words" in a string.
//    *
//    * Here, a "word" is a sequence of one or more non-whitespace characters in a row. We don't use the
//    * regular expression character class "\w" to match against "word characters" because it only
//    * matches against the Latin alphabet. Instead, we match against any sequence of characters that
//    * *are not* a whitespace characters. See the below link for more information.
//    *
//    * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
//    */
//   const wordMatchRegExp = /[^\s]+/g;
//   const words = text!.matchAll(wordMatchRegExp);
//   // matchAll returns an iterator, convert to array to get word count
//   const wordCount = [...words].length;
//   const readingTime = Math.round(wordCount / 200);
//   const badge = document.createElement('p');
//   // Use the same styling as the publish information in an article's header
//   badge.classList.add('color-secondary-text', 'type--caption');
//   badge.textContent = `⏱️ ${readingTime} min read`;

//   // Support for API reference docs
//   const heading = article.querySelector('h1');
//   // Support for article docs with date
//   const date = article.querySelector('time')?.parentNode as HTMLHeadingElement;

//   // https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement
//   (date ?? heading)!.insertAdjacentElement('afterend', badge);
// }