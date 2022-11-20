import { useCallback, useEffect, useState } from 'react';

import { User } from '../model';
export function useGetTalentsHook() {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    if (!data[0]) {
      loadMoreData();
    }
  });

  const loadMoreData = useCallback(() => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(`${process.env['NX_API_URL']}/jobs`)
      .then(res => res.json())
      .then(body => {
        setData([...data, ...body.results]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [data, loading]);

  return { loadMoreData, data: data };
}
