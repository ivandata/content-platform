import { css } from '@emotion/react';
import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom';

function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  const getErrorMessage = () => {
    if (isRouteErrorResponse(error)) {
      // Handle 404 and other HTTP errors
      if (error.status === 404) {
        return 'Page not found';
      }
      return `${error.status} ${error.statusText}`;
    }

    return 'Something went wrong';
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div css={styles.container}>
      <h2 css={styles.title}>{getErrorMessage()}</h2>

      <p css={styles.message}>
        {isRouteErrorResponse(error) && error.status === 404
          ? "We couldn't find the page you're looking for."
          : "We're having trouble loading this page."}
      </p>

      <div css={styles.actions}>
        <button css={styles.button} onClick={handleGoBack}>
          Go to Home Page
        </button>

        <button
          css={[styles.button, styles.retryButton]}
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    padding: 20px;
    text-align: center;
  `,
  title: css`
    color: rgb(255, 50, 0);
    margin-bottom: 16px;
    font-size: 32px;
  `,
  message: css`
    color: #000;
    margin-bottom: 32px;
    font-size: 18px;
  `,
  actions: css`
    display: flex;
    gap: 16px;
  `,
  button: css`
    padding: 12px 24px;
    background-color: #fff;
    border-radius: 4px;
    cursor: pointer;
    color: #000;
    font-size: 16px;
    transition: background-color 0.2s;
    border: 1px solid #000;
  `,
  retryButton: css`
    background-color: rgb(13, 81, 255);
    color: white;
    
    &:hover {
      background-color: rgb(0, 50, 255);
    }
  `,
};

export default ErrorPage;