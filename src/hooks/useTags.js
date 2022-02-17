import React, { useState } from 'react';

export const useTags = (init = []) => {
  const [curTags, setTags] = useState(init);

  const addTag = (tag) => {
    if (!tag || curTags.length > 8 || curTags.includes(tag)) return;

    setTags((prv) => prv.concat(tag));
  };

  const deleteTag = (target) =>
    setTags((prv) => prv.filter((tag) => tag !== target));

  const resetTags = () => setTags(init);

  return { curTags, addTag, deleteTag, resetTags };
};
