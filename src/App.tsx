import React from "react";
import "./App.css";

import * as data from "./data";
import Character from "./Charcter";
import Location from "./Location";
import Dungeon from "./Dungeon";
import PlayerInfo from "./PlayerInfo";
import Info from "./Info";

function App() {
  return (
    <div className="App">
      <PlayerInfo />

      {data.pages.map((page: any) => {
        if (page.crowd || page.crowd === "") {
          return <Location location={page} />;
        } else if (page.dialogue) {
          return <Character character={page} />;
        } else {
          return <Dungeon dungeon={page} />;
        }
      })}
    </div>
  );
}

export default App;
