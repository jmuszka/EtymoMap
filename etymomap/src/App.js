// Serve application

import GlobeBackground from './GlobeBackground.js'
import {GlobeBackgroundProvider} from './GlobeBackgroundProvider.js'
import UserInput from './UserInput.js';
import SearchMenu from './SearchMenu.js';

function App() {

  let g = <GlobeBackgroundProvider>
    <GlobeBackground>
      <div id="bg-tint">
        {/* <UserInput/> */}
        <SearchMenu/>
      </div>
    </GlobeBackground>
  </GlobeBackgroundProvider>
  
  return g;
}

export default App;
