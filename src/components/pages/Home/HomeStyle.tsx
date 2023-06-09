import { css } from '@emotion/css';
import { mediaQuery } from '@constants/styles';

export default function getStyleRoot() {
  return css`
    .form {
      display: grid;
      gap: 12px;
    }

    section:not(:first-of-type) {
      margin-top: 48px;
    }

    .card-container {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 12px;
    }

    ${mediaQuery[0]} {
      .card-container {
        overflow-x: scroll;
        margin: -20px -20px;
        padding: 20px 20px;
        -ms-overflow-style: none;
        scrollbar-width: none;
      }

      .card-container::-webkit-scrollbar {
        display: none;
      }
    }
  `;
}
