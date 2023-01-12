import React from "react";
import "./Character.css";

import * as data from "./data";

type DungeonProps = {
  dungeon: data.Dungeon;
};

function Character(props: DungeonProps) {
  const { dungeon } = props;

  if (!dungeon.rooms) {
    console.log("=========");
    console.log(dungeon);
  }

  const noneRow = (
    <tr>
      <td colSpan={2}>None.</td>
    </tr>
  );

  let anyDungeon: any = dungeon;

  return (
    <>
      <div className="Dungeon" id={dungeon?.id?.toString() + "map"}>
        <div className="header">
          <div className="idContainer">
            <div className="id">D{dungeon.id}</div>
            <div className="pageNumber">p. {dungeon.page}</div>
          </div>
          <div className="name">{dungeon.title}</div>
          <div className="idContainer">
            <div className="pageNumber"></div>
            <div className="id"></div>
          </div>
        </div>
        <div className="notesCallout">{dungeon.dmNotes}</div>

        <img
          className="mapImage"
          src={process.env.PUBLIC_URL + `/img/dungeons/${dungeon.code}.png`}
        />
      </div>

      <div className="Dungeon" id={dungeon?.id?.toString()}>
        <div className="header">
          <div className="idContainer">
            <div className="id"></div>
            <div className="pageNumber"></div>
          </div>
          <div className="name">{dungeon.title}</div>
          <div className="idContainer">
            <div className="pageNumber">
              p. {dungeon.page ? dungeon.page + 1 : ""}
            </div>
            <div className="id">D{dungeon.id}</div>
          </div>
        </div>
        <div className="notesCallout">{dungeon.dmNotes}</div>

        {/* ==== Top of page ==== */}
      </div>
    </>
  );
}

export default Character;
