import './index.css'

import PhotoDetailsPage from 'modules/photo-details/page';
import PhotoGallery from 'modules/photo-grid/page';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { scan } from 'react-scan';
import ErrorBoundary from 'shared/components/error-boundary';
import ErrorPage from 'shared/components/error-page';

if (typeof window !== 'undefined' && !import.meta.env.PROD) {
  scan({
    enabled: true,
    log: true,
  });
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <PhotoGallery />,
  },
  {
    path: '/photos/:photoId',
    element: <PhotoDetailsPage />,
  },
  {
    path: '*',
    element: <ErrorPage />
  }
]);

function App() {
  return <main>
    <img alt='' className='background' src='/src/assets/background.svg' />

    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </main>;
}

export default App