import React from "react";
import "./App.css";

import * as data from "./data";
import Character from "./Charcter";
import Location from "./Location";
import Info from "./Info";

function App() {
  return (
    <div className="App">
      <Info />

      {data.pages.map((page: any) => {
        if (page.crowd || page.crowd === "") {
          return <Location location={page} />;
        } else {
          return <Character character={page} />;
        }
      })}
    </div>
  );
}

export default App;
