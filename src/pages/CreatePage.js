import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { useHttp } from '../hooks/http.hook';

export const CreatePage = () => {
    const { request } = useHttp();
    const history = useHistory();
    const [ link, setLink ] = useState('');
    const auth = useContext(AuthContext);

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const pressHandler = async e => {
        e.preventDefault();
        if (e.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST', { from: link }, {
                    Authorization: `Bearer ${auth.token}`
                });
                history.push(`/detail/${data.link._id}`)
            } catch (e) {}
        }
    }

    return(
        <div className="row">
            <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
                <div className="input-field">
                    <input
                        placeholder="Enter link"
                        id="link"
                        type="text"
                        value={link}
                        onChange={e => setLink(e.target.value)}
                        onKeyPress={pressHandler}/>

                    <label htmlFor="link">Enter link</label>
                </div>
            </div>
        </div>
    );
}