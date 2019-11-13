import React, { Fragment, Component } from 'react';
import Spinner from '../layout/Spinner';
import  Repos  from '../Repos/Repos';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export class User extends Component {
    componentDidMount(){
        this.props.getUser(this.props.match.params.login)
        this.props.getUserRepos(this.props.match.params.login)
    }

    static propTypes ={
        loading: PropTypes.bool,
        user: PropTypes.object.isRequired,
        getUser: PropTypes.func.isRequired,
        getUserRepos: PropTypes.func.isRequired,
        repos: PropTypes.array.isRequired,
    }
    render() {
        const {
            name,
            avatar_url,
            location,
            bio,
            blog,
            login,
            html_url,
            company,
            followers,
            following,
            public_repos,
            public_gists,
            hireable
        } = this.props.user;

        const { loading, repos } = this.props;
        if(loading) return <Spinner />
        return <Fragment>
            <Link to='/' className='btn btn-light'>
                Back to search
            </Link>
            Hireable {' '}
            {hireable ? (
                <i className='fas fa-check text-success'/> 
              ):( 
                <i className='fas fa-times-circle text-danger'/> 
              )}
            <div className='card grid-2'>
                <div className='all-center'>
                    <img 
                      src={avatar_url} 
                      className='round-img' 
                      alt="" 
                      style={{width: '150px'}}
                    />
                    <h1>{name}</h1>
                    <p>Location: {location} </p>
                </div>
                <div>
                    {bio && (
                      <Fragment>
                       <h3>BIO</h3>
                       <p>{bio}</p>
                      </Fragment>
                    )}
                    <a href={html_url} className='btn btn-dark my-1'>
                        Visit Github Profile
                    </a>
                    <ul>
                        <li>
                            {login && <Fragment>
                              <strong>Username:</strong> {login}
                            </Fragment>}
                        </li>
                        <li>
                            {company && <Fragment>
                              <strong>Company:</strong> {company}
                            </Fragment>}
                        </li>
                        <li>
                            {blog && <Fragment>
                              <strong>Website:</strong> {blog}
                            </Fragment>}
                        </li>
                    </ul>
                </div>
            </div>
            <div className="card text-center">
                <div className='badge bedge-primary'>Followers: {followers}</div>
                <div className='badge bedge-success'>Following: {following}</div>
                <div className='badge bedge-light'>Public Repos: {public_repos}</div>
                <div className='badge bedge-dark'>Public Gists: {public_gists}</div>
            </div>

            <Repos repos={repos} />
        </Fragment>
        
    }
}

export default User
