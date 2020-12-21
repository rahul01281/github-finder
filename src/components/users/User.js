import React, { useEffect, Fragment } from 'react'
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import Repos from '../repos/Repos';

function User({ user, loading, getUser, match, getUserRepos, repos }) {

    useEffect(() => {
        getUser(match.params.login);
        getUserRepos(match.params.login);
        //eslint-disable-next-line
    }, []);

    if (loading){
        return <Spinner />
    }

    return (
        <Fragment>
            <Link to='/' className="btn btn-light">Go Back</Link>
            Hireable : {' '}
            { user.hireable ? <i className="fas fa-check text-success" /> : <i className="fas fa-times-circle text-danger" /> }

            <div className="card grid-2">
                <div className="all-center">
                    <img src={user.avatar_url} className="round-img" style={{width:'150px'}} />
                    <h1>{user.name}</h1>
                    <p>Location: {user.location}</p>
                </div>
                <div>
                    {user.bio && 
                    <Fragment>
                        <h3>Bio</h3>
                        <p>{user.bio}</p>
                    </Fragment>
                    }
                    <a href={user.html_url} className="btn btn-dark my-1">Visit Github Profile</a>

                    <ul>
                        <li>
                            {user.login && <Fragment>
                                <strong>Username: </strong>{user.login}
                                </Fragment>}
                        </li>
                        <li>
                            {user.company && <Fragment>
                                <strong>Company: </strong>{user.company}
                                </Fragment>}
                        </li>
                        <li>
                            {user.blog && <Fragment>
                                <strong>Website: </strong>{user.blog}
                                </Fragment>}
                        </li>
                    </ul>
                    
                </div>
            </div>

            <div className="card text-center">
                <div className="badge badge-primary">Followers: {user.followers}</div>
                <div className="badge badge-success">Following: {user.following}</div>
                <div className="badge badge-light">Public Reops: {user.public_repos}</div>
                <div className="badge badge-dark">Public Gists: {user.public_gists}</div>
            </div>

            <Repos repos={repos} />
        </Fragment>
    )
}

export default User
