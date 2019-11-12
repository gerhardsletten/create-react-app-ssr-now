const bodyStyles = `
  * {
    margin: 0;
    padding: 0;
    color: inherit;
    font-size: inherit;
    line-height: inherit;
    word-break: break-word;
  }
  html {
    font-size: 1rem;
    font-weight: 300;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  }
  body {
    margin: 0;
    padding: 0;
    font-size: 1rem;
    line-height: 1.4;
    font-stretch: normal;
  }
  button, input, select {
    font-family: inherit;
    font-weight: 300;
    color: inherit;
    font-size: inherit;
  }
  strong {
    font-weight: 700;
  }
  a, abbr, address, article, aside, audio, b, blockquote, body, caption, cite, code, dd, del, dfn, dialog, div, dl, dt, em, fieldset, figure, footer, form, h1, h2, h3, h4, h5, h6, header, hgroup, hr, html, i, iframe, img, ins, kbd, label, legend, li, mark, menu, nav, object, ol, p, pre, q, samp, section, small, span, strong, sub, sup, table, tbody, td, tfoot, th, thead, time, tr, ul, var, video {
    padding: 0;
    margin: 0;
    border: 0;
    outline: 0;
  }
  *, *:before, *:after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  a {
    text-decoration: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    color: inherit;
  }
  h1, h2, h3, h4, h5, h6, label, p, button, abbr, a, span, small {
    -webkit-font-smoothing: antialiased;
    text-size-adjust: 100%;
    font-weight: inherit;
    background: none;
  }
  input:not([type="checkbox"]):not([type="radio"]), button {
    outline: none;
    appearance: none;
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  }
  img {
    max-width: 100%;
    height: auto;
  }
  input[required]:-moz-ui-invalid {
    box-shadow: none;
  }
`
export default bodyStyles
