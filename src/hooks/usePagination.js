import { useEffect, useState } from 'react';

export const usePagination = (initState = [], maxElements) => {
  const [pageState, setPageState] = useState({
    curIndex: 0,
    nxtIndex: maxElements,
    pageNumber: 1,
  });
  const [filtered, setFiltered] = useState(initState);
  const { curIndex, nxtIndex, pageNumber } = pageState;
  const isPaginationNeeded = initState.length > maxElements;

  const amountOfPages = Math.ceil(initState.length / maxElements);
  const amountOfElements =
    pageNumber * maxElements > initState.length
      ? initState.length
      : pageNumber * maxElements;

  useEffect(() => {
    setPageState({
      curIndex: 0,
      nxtIndex: maxElements,
      pageNumber: 1,
    });
  }, [initState, maxElements]);

  useEffect(() => {
    const filtered = initState.slice(curIndex, nxtIndex);
    setFiltered(filtered);
  }, [initState, pageNumber, curIndex, nxtIndex, maxElements]);

  const goNextPage = () => {
    if (curIndex + maxElements < initState.length) {
      setPageState({
        curIndex: curIndex + maxElements,
        nxtIndex: nxtIndex + maxElements,
        pageNumber: pageNumber + 1,
      });
      window.scroll(0, 0);
    }
  };

  const goPrevPage = () => {
    if (curIndex > 0) {
      setPageState({
        curIndex: curIndex - maxElements,
        nxtIndex: nxtIndex - maxElements,
        pageNumber: pageNumber - 1,
      });
      window.scroll(0, 0);
    }
  };

  return {
    filtered,
    amountOfElements,
    pageNumber,
    goNextPage,
    goPrevPage,
    amountOfPages,
    isPaginationNeeded,
  };
};
