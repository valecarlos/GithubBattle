var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api')

function SelectLanguage (props){
  //this is a stateless functional component
  var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
  return(
    <ul className='languages'>
      {languages.map((lang) => (
        <li style={lang === props.selectedLanguage ? {color: '#d0021b'} : null} 
          onClick={props.onSelect.bind(null, lang)} key={lang}>
          {lang}
        </li>
      ))}
    </ul>
  )
}

function RepoGrid(props){
  return(
    <ul className='popular-list'>
      {props.repos.map((repo, index) => 
        <li key={repo.name} className='popular-item'>
          <div className="popular-rank">#{index + 1}</div>
          <ul className="space-list-items">
            <li>
              <img className="avatar" src={repo.owner.avatar_url} alt={'Avatar for ' + repo.owner.login}/>
            </li>
            <li><a href={repo.html_url}>{repo.name}</a></li>
            <li>@{repo.owner.login}</li>
            <li>{repo.stargazers_count} stars</li>
          </ul>
        </li>
      )}
    </ul>
  )
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired,
}
SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

class Popular extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedLanguage : 'All',
      repos: null
    }

    this.updateLanguage = this.updateLanguage.bind(this);
  }
  componentDidMount(){
    //invoked whenever the component is mount to the screen/shown to the view
    //AJAX
    this.updateLanguage(this.state.selectedLanguage)
  }
  updateLanguage(lang){

    this.setState(function(){
      return {
        selectedLanguage : lang,
        repos: null
      }
    });

    api.fetchPopularRepos(lang)
      .then(function(repos){
        this.setState(function(){
          return {
            repos
          }
        });
      }.bind(this));
      //bind it because the -this- inside would have another context otherwise
      //2 things to think about when developing react
      // 1st what does my specific state look like
      // 2nd what does my UI look likke
  }
  render(){  
    return(
      <div>
        <SelectLanguage 
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        />
        {!this.state.repos
          ? <p>LOADING</p>
          : <RepoGrid repos={this.state.repos}/>
        }
      </div>
    )
  }
}
//above,an easy fix to know whether the repos have been loaded or not is to add an if
//in the onClick method we can bind it to null because we have bound it already, and then we pass along the attributes
// map can receive as a second argument the specific context that you want the function to be invoked in - we can avoid this by using ES6 arrow functions
module.exports = Popular;