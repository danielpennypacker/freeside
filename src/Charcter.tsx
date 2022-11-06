import React from "react";
import "./Character.css";

import * as data from "./data";

type CharacterProps = {
  character: data.Character;
};

function Character(props: CharacterProps) {
  const { character } = props;

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
        <div className="id">C{character.id}</div>
        <div className="name">
          {character.name}, {character.title}
        </div>
        <div className="id">C{character.id}</div>
      </div>

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
              ] as data.Attributes[]
            ).map((attr) => {
              const typedAttr = attr;
              return (
                <tr>
                  <td className={`attrTitle attrTitle-${attr}`}>{attr}</td>
                  <td className="attrValue right">{character[attr]}</td>
                  <td className="attrBonus right">
                    {getAttrBonus(character[typedAttr])}
                  </td>
                  <td className="attrSave right">
                    {getAttrBonus(
                      character[typedAttr] + character.proficiencyBonus
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

      {/* ==== Bottom Page ==== */}

      {/* ==== Roleplaying Information ==== */}
      <table className="brownBlock">
        <thead>
          <th colSpan={2}>Roleplaying Inspiration</th>
        </thead>
        <tbody>
          <tr>
            <td>Similar Characters</td>
            <td className="boldText bigText">
              {character.roleplayInspiration.split(".")[0]}.
            </td>
          </tr>

          <tr>
            <td>{data.toTitle("visualDescription")}</td>
            <td>{character.visualDescription}</td>
          </tr>

          <tr>
            <td>
              <span>{data.toTitle("introduction")}</span>
            </td>
            <td>
              <span className="bigText boldText">
                "{character.introduction}"
              </span>
            </td>
          </tr>
          {["background", "question", "ideal", "bond", "flaw"].map((stat) => {
            return (
              <tr>
                <td>{data.toTitle(stat)}</td>
                <td>"{anyCharacter[stat]}"</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* ==== Plot Information ==== */}
      <table className="blueBlock">
        <thead>
          <th colSpan={2}>Plot Information</th>
        </thead>
        <tbody>
          <tr>
            <td>
              <span>{data.toTitle("goal")}</span>
            </td>
            <td>
              <span className="bigText boldText">{character.motivation}</span>
            </td>
          </tr>
          {[
            "notoriety",
            "plotFlower",
            "plotConvoy",
            "plotParty",
            "plotGladiator",
            "plotKaiju",
            "dmNotes",
          ].map((stat) => {
            if (!anyCharacter[stat]) {
              return null;
            }

            return (
              <tr>
                <td>
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

      {/* ==== Miscelanios ==== */}
      <table className="greyBlock">
        <thead>
          <th colSpan={2}>Miscelanios</th>
        </thead>
        <tbody>
          <tr>
            <td>
              <span>{data.toTitle("rewards")}</span>
            </td>
            <td>
              <span>{character.rewards}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Character;
