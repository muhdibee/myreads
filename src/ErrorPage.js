import React from 'react';

export default function ErrorPage({location}) {

    return (
        <div style={{marginTop: 20, marginBottom: 20, marginLeft: 20, alignItems:'center'}}>
            <h1 >Error 404: page not found</h1>
            <h5>No Page match for <code> https://myreadsapp.com{location.pathname}</code></h5>
        </div>
    )
}
