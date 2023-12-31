'use client'

import { useEffect, useState } from 'react';
import styles from './AllBlog.module.css';
import Card from '@/components/card/Card';
import Pagination from '@/components/pagination/Pagination';
import { Loading } from '@/components/Loading/LoadingSpinner';
import Menu from '@/components/Menu/Menu';
import Category from '@/components/Category/Category';

const Allblog = async ({ page, searchQuery }) => {
    const [post, setPosts] = useState([]);
    const [count, setCount] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            console.log("page", page)
            try {
                const { posts, count } = await getData(page);
                setPosts(posts);
                setCount(count);
            } catch (error) {
                console.error('Error fetching user posts:', error);
            }
        };

        fetchData();
    }, [page, searchQuery]);

    const getData = async (page) => {
        try {
            setLoading(true);
            const response = await fetch(`/api/allblog?page=${page}&&search=${searchQuery}`);
            const { posts, count } = await response.json();
            return { posts, count };
        } catch (error) {
            console.error('Error fetching user posts:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loading />;

    const POST_PER_PAGE = 4;
    const hasPrev = POST_PER_PAGE * (page - 1) > 0;
    const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

    return (
        <div className={styles.container}>
            <Category />
            {searchQuery && (
                <h3 className={styles.search_result}>
                    <span>' {count} ' </span>search result found for '<span> {searchQuery} </span>'
                </h3>
            )}
            <div className={styles.content}>
                <div className={styles.post_side}>
                    <div className={styles.posts}>
                        {post?.map((item) => (
                            <Card key={item._id} item={item} />
                        ))}
                    </div>
                </div>
                <div className={styles.menu_side}>
                    <Menu />
                </div>
            </div>
            <Pagination page={page} searchQuery={searchQuery} hasNext={hasNext} hasPrev={hasPrev} />
        </div>
    )
}

export default Allblog;
