var React = require('react');
var PropTypes = require('prop-types');

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



SelectLanguage.prototypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

class Popular extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedLanguage : 'All'
    }

    this.updateLanguage = this.updateLanguage.bind(this);
  }
  updateLanguage(lang){
    console.log(lang);
    this.setState(function(){
      return {selectedLanguage : lang}
    })
  }
  render(){  
    return(
      <div>
        <SelectLanguage 
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}/>
      </div>
    )
  }
}
//in the onClick method we can bind it to null because we have bound it already, and then we pass along the attributes
// map can receive as a second argument the specific context that you want the function to be invoked in - we can avoid this by using ES6 arrow functions
module.exports = Popular;