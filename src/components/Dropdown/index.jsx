import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './index.scss';

const dropDown = ({ user, handleDropDown }) => {
  const username = user && user.username;
  return (
    <div className="dropdown absolute min-w-48 flex flex-col">
      <div className="w-full py-2 bg-gray-30 text-center">
        <p className="username text-gray-550 py-2">{`@${username}`}</p>
        <p className="fullname py-2 text-gray-550 font-semibold">{`${user.firstName} ${user.lastName}`}</p>
      </div>
      <ul className="">
        <Link onClick={handleDropDown} to="/article/create">
          <li className="text-xs-2 border-b-2 border-gray-40 py-3 px-8 bg-white cursor-pointer text-center text-gray-550">
              Write a Story
          </li>
        </Link>
        <Link onClick={handleDropDown} to={`/profile/${username}/followers`}>
          <li className="text-xs-2 border-b-2 border-gray-40 py-3 px-8 bg-white cursor-pointer text-center text-gray-550">
            Followers
          </li>
        </Link>
        <Link onClick={handleDropDown} to={`/profile/${username}/articles`}>
          <li className="text-xs-2 border-b-2 border-gray-40 py-3 px-8 bg-white cursor-pointer text-center text-gray-550">
            Articles
          </li>
        </Link>
        <Link onClick={handleDropDown} to={`/profile/${username}/editprofile`}>
          <li className="text-xs-2 border-b-2 border-gray-40 py-3 px-8 bg-white cursor-pointer text-center text-gray-550">
            Profile
          </li>
        </Link>
        <Link onClick={handleDropDown} to={`/profile/${username}/stat`}>
          <li className="text-xs-2 border-b-2 border-gray-40 py-3 px-8 bg-white cursor-pointer text-center text-gray-550">
            Article Stats
          </li>
        </Link>
        <Link onClick={handleDropDown} to="/signup">
          <li className="text-xs-2 border-b-2 border-gray-40 py-3 px-8 bg-white cursor-pointer text-center text-gray-550">
            Sign out
          </li>
        </Link>
      </ul>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(dropDown);