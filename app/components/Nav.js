var React = require('react');
// var Link = require('react-router-dom').Link; // the fundamentals
var NavLink = require('react-router-dom').NavLink; //sometimes we want to dynamically change the style based on if that Route is active

function Nav(){
  return(
    <ul className='nav'>
      <li>
        <NavLink exact activeClassName='active' to='/'>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/battle'>
          Battle
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/popular'>
          Popular
        </NavLink>
      </li>
    </ul>
  )
}
//the react attribute says - only apply the active class when the route that we are on is exactly the one we specified
module.exports = Nav;