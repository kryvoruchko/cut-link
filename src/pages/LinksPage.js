import React, { useContext, useEffect, useState } from 'react';
import { LinksList } from '../components/LinksList';
import { Loader } from '../components/Loader';
import { AuthContext } from '../context/auth.context';
import { useHttp } from '../hooks/http.hook';

export const LinksPage = () => {
    const [ links, setLinks ] = useState([]);
    const { request, loading } = useHttp();
    const { token } = useContext(AuthContext);

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const fetch = await request(`/api/link`, 'GET', null, {
                    Authorization: `Bearer ${token}`
                });
    
                setLinks(fetch);
            } catch (e) {}
        };
        fetchLinks();
    }, [ token, request ]);

    if (loading) {
        return <Loader />;
    }

    return(
        <>
            { !loading && <LinksList links={links}/>}
        </>
    );
}