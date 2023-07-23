import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { loadPosts, changeSearch, moveToPage, sort } from "@store/posts";
import { Column, PageLayout, Loading, Search, Pagination, PostsTable } from "@components";
import { getURLWithParams } from '@utils';

function Posts() {
  const select = useSelector(state => state.posts);
  const dispatch = useDispatch();

  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState(select.params.search);

  useEffect(() => {
    dispatch(loadPosts());
  }, [dispatch]);

  useEffect(() => {
    const url = getURLWithParams(select.params);
    window.history.pushState({}, '', url);
  }, [select.params]);

  useEffect(() => {
    if (!select.data) return;

    const sortByNumber = (a, b) => select.sortParams.isAscending
      ? a[select.sortParams.prop] - b[select.sortParams.prop]
      : b[select.sortParams.prop] - a[select.sortParams.prop];

    const sortByString = (a, b) => select.sortParams.isAscending
      ? a[select.sortParams.prop].localeCompare(b[select.sortParams.prop])
      : b[select.sortParams.prop].localeCompare(a[select.sortParams.prop]);

    const search = select.params.search.toLowerCase();
    const posts = select.data
      .filter(post =>
        `${post.id}`.toLowerCase().includes(search) ||
        post.title.toLowerCase().includes(search) ||
        post.body.toLowerCase().includes(search)
      )
      .sort((a, b) => select.sortParams.prop === 'id'
        ? sortByNumber(a, b)
        : sortByString(a, b)
      )

    setPosts(posts)
  }, [select.data, select.params, select.sortParams]);

  const callbacks = {
    onSort: useCallback((prop) => {
      dispatch(sort({ prop }))
    }, [dispatch]),

    onMoveToPage: useCallback(page => {
      dispatch(moveToPage({ page }));
    }, [dispatch]),

    onSearchTextChange: useCallback(e => {
      dispatch(changeSearch({ search: e.target.value }));
      setSearchText(e.target.value)
    }, [dispatch]),
  }

  return (
    <PageLayout>
      <Loading loading={select.loading}>
        {select.data &&
          <Column gap={'1rem'}>
            <Search value={searchText} onChange={callbacks.onSearchTextChange} />
            <PostsTable
              items={posts.slice((+select.params.page - 1) * +select.params.limit, +select.params.page * +select.params.limit)}
              onSort={callbacks.onSort}
              sortParams={select.sortParams} />
            <Pagination
              page={+select.params.page}
              quantity={Math.ceil(posts.length / +select.params.limit)}
              onMove={callbacks.onMoveToPage} />
          </Column>}
      </Loading>
    </PageLayout>
  );
}

export default Posts;