import { css } from '@emotion/css';
import { mediaQuery } from '@constants/styles';

export const styleRoot = css`
  padding: 16px;
  background-color: var(--gray-900);
  border-radius: 12px;
  color: var(--white);
  flex-grow: 1;
  width: 100%;
  display: flex;
  height: 200px;
  flex-direction: column;

  ${mediaQuery[0]} {
    min-width: 180px;
  }

  &:hover {
    cursor: pointer;
    transition: all 0.1s ease-in;
    background-color: var(--gray-800);
    box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.2);
    transform: scale(1.05);
  }

  .tag-container {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 8px;

    color: var(--gray-400);
    font-weight: 600;
    font-size: 13px;
    line-height: 16px;
    letter-spacing: 0.01em;
  }

  p.content {
    margin-bottom: 12px;
    height: 100%;
    font-weight: 400;
    font-size: 15px;
    line-height: 140%;
    color: var(--gray-200);
    display: -webkit-box;
    max-width: 200px;

    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  p.content.with-tagbox {
    -webkit-line-clamp: 4;
  }

  .icon-btn-container {
    margin: 0 0 0 auto;
  }
`;
