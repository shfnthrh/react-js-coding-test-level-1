import "./App.css";
import { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import axios from "axios";
import Modal from "react-modal";
import MaterialTable from '@material-table/core'

function PokeDex() {
  const [pokemons, setPokemons] = useState([].slice(0,5));
  const [pokemonDetail, setPokemonDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {

    setIsLoading(true)

    async function fetchPokemons(){
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon')
        setTimeout(function() {
          setIsLoading(false)
        }, 3000)
        // console.log(response.data.results)
        setPokemons(response.data.results)
    }
    fetchPokemons()
  }, [])

  const columns = [
    {title: "Name", field: "name"},
    {title: "URL", field: "url"}
  ]
  

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: "black",
      color: "white",
    },
    overlay: { backgroundColor: "grey" },
  };

  if (!isLoading && pokemons.length === 0) {
    return (
      <div>
        <header className="App-header">
          <h1>Welcome to pokedex!</h1>
          <h2>Requirement:</h2>
          <ul>
            <li>
              Call this api:https://pokeapi.co/api/v2/pokemon to get pokedex, and show a list of pokemon name.
            </li>
            <li>Implement React Loading and show it during API call</li>
            <li>when hover on the list item , change the item color to yellow.</li>
            <li>when clicked the list item, show the modal below</li>
            <li>
              Add a search bar on top of the bar for searching, search will run
              on keyup event
            </li>
            <li>Implement sorting and pagination</li>
            <li>Commit your codes after done</li>
            <li>If you do more than expected (E.g redesign the page / create a chat feature at the bottom right). it would be good.</li>
          </ul>
        </header>
      </div>
    );
  }

  return (
    <div>
      <header className="App-header">
        {isLoading ? (
          <>
            <div className="App">
              <header className="App-header">
                {/* <b>Implement loader here</b> */}
                <ReactLoading type='balls' color='yellow' height={667} width={375} />
              </header>
            </div>
          </>
        ) : (
          <>
            <h1>Welcome to pokedex !</h1>
            {/* <b>Implement Pokedex list here </b> */}

            <MaterialTable 
              columns={columns} 
              data={pokemons}
              title="Pokemon List"
              options={{
                  sorting:true,
                  search:true, 
                  paging:true, 
                  pageSizeOptions:[5, 10, 20], 
                  pageSize:5,
                  headerStyle:{
                      zIndex:1,
                      fontWeight: 'bold',
                      backgroundColor: 'yellow',
                      position: 'sticky',
                      top: 0,
                  },
                  searchFieldStyle:{
                    color: 'white',
                  },
                  // tableLayout: 'fixed',

              }}
              style={{background: '#7c828f', color:'white'}}
          />

              {/* <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>URL</th>
                  </tr>
                </thead>
                <tbody>
                  {pokemons.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.url}</td>
                    </tr>
                  ))}
                </tbody>
              </table> */}
          </>
        )}
      </header>
      {pokemonDetail && (
        <Modal
          isOpen={pokemonDetail}
          contentLabel={pokemonDetail?.name || ""}
          onRequestClose={() => {
            setPokemonDetail(null);
          }}
          style={customStyles}
        >
          <div>
            Requirement:
            <ul>
              <li>show the sprites front_default as the pokemon image</li>
              <li>
                Show the stats details - only stat.name and base_stat is
                required in tabular format
              </li>
              <li>Create a bar chart based on the stats above</li>
              <li>Create a  buttton to download the information generated in this modal as pdf. (images and chart must be included)</li>
            </ul>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default PokeDex;
