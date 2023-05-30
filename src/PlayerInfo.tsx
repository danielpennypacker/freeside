import React from "react";
import "./Character.css";
import StatBlock from "./StatBlock";

import * as data from "./data";
import CombatActions from "./CombatActions";

function PlayerInfo() {
  return (
    <div className="handoutPage">
      {data.pages.map((page: any) => {
        let imgPath = process.env.PUBLIC_URL + `/img/`;

        if (page.crowd || page.crowd === "") {
          imgPath += "locations";
          // return <div>Location</div>;
        } else if (page.dialogue) {
          imgPath += "characters";
          // return <div>Character</div>;
        } else {
          imgPath += "dungeons";
          // return <div>Dungeon</div>;
        }

        imgPath += `/${page.code}.png`;

        return (
          <div className="handout">
            <h1>{page.name}</h1>
            <img src={imgPath} />
          </div>
        );
      })}
    </div>
  );
}

export default PlayerInfo;
