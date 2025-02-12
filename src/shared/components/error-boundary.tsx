import type { ReactNode } from 'react';

import { css } from '@emotion/react';
import { useState, useEffect, Fragment } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

function ErrorBoundary({ children, fallback }: Props) {
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      event.preventDefault();
      setError(event.error);
      console.error('Error caught by boundary:', event.error);
    };

    const promiseHandler = (event: PromiseRejectionEvent) => {
      event.preventDefault();
      setError(event.reason);
      console.error('Promise rejection caught by boundary:', event.reason);
    };

    window.addEventListener('error', errorHandler);
    window.addEventListener('unhandledrejection', promiseHandler);

    return () => {
      window.removeEventListener('error', errorHandler);
      window.removeEventListener('unhandledrejection', promiseHandler);
    };
  }, []);

  if (error) {
    return fallback || (
      <div css={styles.errorContainer}>
        <h2 css={styles.errorTitle}>Something went wrong</h2>

        <p css={styles.errorMessage}>
          {error.message}
        </p>

        <button
          css={styles.retryButton}
          onClick={() => window.location.reload()}
          type="button"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <Fragment>
      {children}
    </Fragment>
  );
}

const styles = {
  errorContainer: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    padding: 20px;
    text-align: center;
  `,
  errorTitle: css`
    color: rgb(255, 50, 0);
    margin-bottom: 16px;
    font-size: 24px;
  `,
  errorMessage: css`
    color: #000;
    letter-spacing: .5px;
    margin-bottom: 24px;
    font-size: 16px;
  `,
  retryButton: css`
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    background-color: rgb(13, 81, 255);
    color: white;

    &:hover {
      background-color: rgb(0, 50, 255);
    }
  `
};

export default ErrorBoundary;