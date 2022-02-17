import { useState, useEffect } from 'react';

export const useTwitterLink = ({
  title,
  hashtags,
  fallbackURL = 'https://twitter.com',
}) => {
  const [twitterLink, setTwitterLink] = useState(fallbackURL);

  useEffect(() => {
    const getUrlForSharing = () => {
      let baseUrl = 'https://twitter.com/intent/tweet';
      let content = `Lee este interesante post sobre: %0A${title} %0A`;
      let postURLEncoded = window.encodeURIComponent(window.location.href);
      let parseTags = hashtags?.join(',');
      let url =
        baseUrl +
        `?url=${postURLEncoded}&text=${content}&hashtags=${parseTags}`;
      return url;
    };
    setTwitterLink(getUrlForSharing());
  }, [hashtags, title]);
  return twitterLink;
};
