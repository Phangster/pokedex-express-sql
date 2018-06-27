var React = require("react");

class Home extends React.Component {
  render() {
    return (
      <html>
        <head />
        <link rel="stylesheet" type="text/css" href="./public/css/Home.css"/>
        <body>
          <h1>Welcome to Pokedex</h1>
          <ul>
            {this.props.pokemon.map(pokemon => (
              <li key={pokemon.id}>
                {pokemon.name}
              </li>
            ))}
          </ul>
        </body>
      </html>
    );
  }
}

module.exports = Home;
