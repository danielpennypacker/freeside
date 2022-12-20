import React from "react";
import "./Character.css";

import * as data from "./data";

type CharacterProps = {
  character: data.Character;
};

function Character(props: CharacterProps) {
  const { character } = props;

  if (!character.skills) {
    console.log("=========");
    console.log(character);
  }

  const getAttrBonus = (value: number) => {
    const bonus = Math.floor((value - 10) / 2);
    if (bonus > 0) {
      return `+${bonus}`;
    }
    return bonus;
  };

  let anyCharacter: any = character;

  return (
    <div className="Character" id={character?.id?.toString()}>
      <div className="header">
        <div className="idContainer">
          <div className="id">C{character.id}</div>
          <div className="pageNumber">p. {character.page}</div>
        </div>
        <div className="name">
          {character.name}, {character.title}
        </div>
        <div className="idContainer">
          <div className="pageNumber">p. {character.page}</div>
          <div className="id">C{character.id}</div>
        </div>
      </div>
      <div className="notesCallout">{character.dmNotes}</div>

      {/* ==== Top of page ==== */}

      <div className="pageTop">
        {/* ==== Basic attributes ==== */}
        <table className="basicStats">
          <thead>
            <tr>
              <th>Stat</th>
              <th className="right">Score</th>
              <th className="right">Bonus</th>
              <th className="right">Save</th>
            </tr>
          </thead>
          <tbody>
            {(
              [
                "strength",
                "dexterity",
                "constitution",
                "intelligence",
                "wisdom",
                "charisma",
              ] as string[]
            ).map((attr) => {
              const typedAttr = attr;
              return (
                <tr>
                  <td className={`attrTitle attrTitle-${attr}`}>{attr}</td>
                  <td className="attrValue right">{anyCharacter[attr]}</td>
                  <td className="attrBonus right">
                    {getAttrBonus(anyCharacter[typedAttr])}
                  </td>
                  <td className="attrSave right">
                    {getAttrBonus(
                      anyCharacter[typedAttr] + character.proficiencyBonus
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div>
          <img
            className="portrait portraitSmall"
            src={
              process.env.PUBLIC_URL + `/img/characters/${character.code}.png`
            }
          />
        </div>
        <table className="combatStatstats combatStatstats1">
          <thead>
            <tr>
              <th colSpan={2}>Combat</th>
            </tr>
          </thead>
          <tbody>
            {["armorClass", "hitPoints", "speed"].map((stat) => {
              return (
                <tr>
                  <td className={`combatStatTitle combatStatTitle-${stat}`}>
                    {data.toTitle(stat)}
                  </td>
                  <td
                    className={`combatStatValue right combatStatValue-${stat}`}
                  >
                    {anyCharacter[stat]}
                  </td>
                </tr>
              );
            })}
            <tr>
              <td
                className={`combatStatTitle combatStatTitle-${"passivePerception"}`}
              >
                Pass. Pers.
              </td>
              <td
                className={`combatStatValue right combatStatValue-${"passivePerception"}`}
              >
                {character.passivePerception}
              </td>
            </tr>
            <tr></tr>
          </tbody>
        </table>

        {/* ==== Skills ==== */}
        <table className="skills skills1">
          <thead>
            <tr>
              <th>Skill</th>
              <th className="right">Bonus</th>
            </tr>
          </thead>

          <tbody>
            {/* ==== Skills ==== */}
            <tr>
              <td className="skillTitle">Profecency Bonus</td>
              <td className="attrBonus right">+{character.proficiencyBonus}</td>
            </tr>
            {character.skills.sort().map((skill) => {
              return (
                <tr>
                  <td className="skillTitle">{skill}</td>
                  <td className="attrBonus right">+6</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* ==== Basic Stats ==== */}
        <table className="basicInfo">
          <thead>
            <tr>
              <th colSpan={2}>Basic Info</th>
            </tr>
          </thead>
          <tbody>
            {["age", "race", "alignment"].map((stat) => {
              return (
                <tr>
                  <td className="basicStatTitle">{data.toTitle(stat)}</td>
                  <td className="basicStatTitle">{anyCharacter[stat]}</td>
                </tr>
              );
            })}

            <td>Chal. Rating</td>
            <td>{character.challengeRating}</td>
          </tbody>
        </table>

        {/* ==== Attack Stats ==== */}
        <table className="combatStatstats combatStatstats2">
          <thead>
            <tr>
              <th colSpan={2}>Attack</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={`combatStatTitle combatStatTitle-${"bonus"}`}>
                {data.toTitle("bonus")}
              </td>
              <td
                className={`combatStatValue right combatStatValue-${"bonus"}`}
              >
                +{anyCharacter.attack["bonus"]}
              </td>
            </tr>
            {["damage", "range"].map((stat) => {
              return (
                <tr>
                  <td className={`combatStatTitle combatStatTitle-${stat}`}>
                    {data.toTitle(stat)}
                  </td>
                  <td
                    className={`combatStatValue right combatStatValue-${stat}`}
                  >
                    {anyCharacter.attack[stat]}
                  </td>
                </tr>
              );
            })}
            <tr>
              <td className={`combatStatTitle combatStatTitle-${"multi"}`}>
                Num. Atk.
              </td>
              <td
                className={`combatStatValue right combatStatValue-${"multi"}`}
              >
                {character.attack?.multi}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ==== Roleplaying Information ==== */}
      <table className="brownBlock">
        <thead>
          <th colSpan={2}>Background</th>
        </thead>
        <tbody>
          <tr>
            <td>Inspiration</td>
            <td className="boldText bigText flexEven">
              {character.roleplayInspiration.split(",").map((name) => {
                return <div>{name}</div>;
              })}
            </td>
          </tr>

          <tr>
            <td>Description</td>
            <td>{character.visualDescription}</td>
          </tr>

          <tr>
            <td>Detail</td>
            <td>{character.notoriety}</td>
          </tr>
        </tbody>
      </table>

      {/* === Dialogue === */}
      <table className="greyBlock">
        <thead>
          <th colSpan={2}>Dialogue</th>
        </thead>
        <tbody>
          {character.dialogue.map((line, i) => {
            return (
              <tr>
                <td>{i + 1}.</td>
                <td>{data.toTitle(line[0])}</td>
                <td>"{line[1]}"</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* === Quests === */}
      <table className="greyBlock">
        <thead>
          <th colSpan={2}>Quests</th>
        </thead>
        <tbody>
          <tr>
            <td>1.</td>
            <td>He'll try to recruit you to fight the Convoy.</td>
          </tr>
        </tbody>
      </table>

      {/* === Rewards === */}
      <table className="greyBlock">
        <thead>
          <th colSpan={2}>Rewards</th>
        </thead>
        <tbody>
          <tr>
            <td>1.</td>
            <td>
              <span>
                He'll offer you a share of the bounty from the incoming Convoy
                Fleet.
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      {/* ==== Plot Information ==== */}
      <table className="blueBlock">
        <thead>
          <th colSpan={2}>Plot Connections</th>
        </thead>
        <tbody>
          {["plotFlower", "plotConvoy", "plotParty"].map((stat) => {
            if (!anyCharacter[stat]) {
              return null;
            }

            return (
              <tr>
                <td className="plotInfoTitle">
                  <span>{data.toTitle(stat)}</span>
                </td>
                <td>
                  <span>{anyCharacter[stat]}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Character;
