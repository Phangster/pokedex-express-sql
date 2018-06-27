var React = require("react");

class Home extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h1>Welcome to Pokedex</h1>
          <div>{this.props.pokemon.name}</div>
          <img src={this.props.pokemon.img}/>
          <ul>
              <li>
                Number : {this.props.pokemon.num}
              </li>
              <li>
                Weight : {this.props.pokemon.weight}
              </li>
              <li>
                Height : {this.props.pokemon.height}
              </li>
          </ul>
        </body>
      </html>
    );
  }
}

module.exports = Home;
