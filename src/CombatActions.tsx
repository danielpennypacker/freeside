import React from "react";

import * as data from "./data";

type CombatActionsProps = {
  item: data.Monster | data.Character;
};

function CombatActions(props: CombatActionsProps) {
  const { item } = props;

  const anyItem: any = item;

  return (
    <table>
      <thead>
        <th colSpan={3}>Combat Actions + Abilities</th>
      </thead>
      <tbody>
        <tr>
          <td>Sword</td>
          <td>
            Melee Weapn Attack, <strong>+{item.attack?.bonus} to hit</strong>,{" "}
            {item.attack?.range}ft reach, {item.attack?.damage} damage
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default CombatActions;
