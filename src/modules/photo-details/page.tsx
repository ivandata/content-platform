import { css } from '@emotion/react';
import { useParams } from 'react-router-dom';
import { usePhotoDetails } from 'shared/api/api.ts';

import { PhotoView } from './components/photo-view';

function PhotoDetailsPage () {
  const { photoId } = useParams<{ photoId: string }>();
  const { data: photo, error, isPending, isError, isSuccess } = usePhotoDetails(photoId!);


  const styles = getStyles();
  return <div css={styles.container}>
    {isPending && <div css={styles.loading}>Loading...</div>}

    {isError && <div css={styles.error}>
      Error:
      {error.message}
    </div>}

    {isSuccess && <PhotoView photo={photo} />}
  </div>;
}

const getStyles = () => ({
  container: css`
    width: 100%;
    height: 100vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  loading: css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    font-size: 1.2rem;
    color: #666;
  `,
  error: css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    color: #dc3545;
    font-size: 1.2rem;
  `,
});


export default PhotoDetailsPage
