import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LinkCard } from '../components/LinkCard';
import { Loader } from '../components/Loader';
import { AuthContext } from '../context/auth.context';
import { useHttp } from '../hooks/http.hook';

export const DetailPage = () => {
    const [ link, setLink ] = useState({});
    const linkId = useParams().id;
    const { request, loading } = useHttp();
    const { token } = useContext(AuthContext);

    useEffect(() => {
        const getLink = async () => {
            try {
                const fetch = await request(`/api/link/${linkId}`, 'GET', null, {
                    Authorization: `Bearer ${token}`
                });
                setLink(fetch);
            } catch (e) {}
        };
        getLink();
    }, [ token, linkId, request ]);

    if (loading) {
        return <Loader />
    }

    return(
        <>
            { !loading && link && <LinkCard link={link} /> }
        </>
    );
}