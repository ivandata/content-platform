import { css } from '@emotion/react';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { usePhotoDetails, generateEmptyPhotoResource } from 'shared/api';

import { PhotoView } from './components/photo-view';

function PhotoDetailsPage () {
  const { photoId } = useParams<{ photoId: string }>();
  const { data: photoDetails, isPending } = usePhotoDetails(photoId!);

  const styles = useMemo(() => getStyles(), []);
  const photo = useMemo(() => {
    return isPending ? generateEmptyPhotoResource() : photoDetails
  }, [photoDetails, isPending])

  if (!photo) return null

  return <div css={styles.container}>
    <PhotoView isLoading={isPending} photo={photo} />
  </div>;
}

const getStyles = () => ({
  container: css`
    width: 100%;
    max-height: 100%;
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
