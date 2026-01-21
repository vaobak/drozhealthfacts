import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

/**
 * Redirect component for legacy /article/:slug URLs
 * Redirects to flat /:slug structure
 */
export const ArticleRedirect: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      navigate(`/${slug}`, { replace: true });
    }
  }, [slug, navigate]);

  return null;
};
