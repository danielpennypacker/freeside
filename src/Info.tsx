import React from "react";
import "./Location.css";

import * as data from "./data";

function Info() {
  return (
    <>
      <div className="TextPage">
        <div className="infoHeader">How to run this adventure.</div>
        <p className="infoPara">
          This adventure is design to take little to no prep. An generous amount
          of content is provided for each NPC and Location so that the DM can
          run the game from moment to moment without having to track the broader
          narrative. It can be thought of having a similar layout to a choose
          your own adventure book, where the nodes and connections have been
          laid out already.
        </p>
        <p className="infoPara">
          However, there’s no need to be so rigid with how players move around.
          The point of all this extra content is to make life easier for the DM.
          If any remixing of the adventure is desired, the connective tissue of
          NPCs and Locations to the plot should still function no matter the
          order of NPC apprences. Also any NPC should be able to appear at any
          of the locations, so feel free to make NPC's show up to meet the
          requirements of game momemtum.
        </p>

        <div className="infoHeader">Player setup and motivation</div>
        <p className="infoPara">
          The players are all coming to Freeside to earn money. This is a bit of
          a side quest that can run the entire game. In additioan to possible
          heroics, all of the heros will have some tension involved with simply
          wanting to earn money. Is it worth helping the Convoy if it means they
          can make thousands of gold? Enough to save their villiage ?
        </p>
        <div className="infoHeader">Player Experience</div>
        <p className="infoPara">
          Depending on the experience level of the PC's, the immediacy and
          villainy of Lapish or The Convoy can be increased. If there players
          need a more straight foward villain, either of these entities can be
          played up as "The Bad Guys". However, by default there is a bit of
          ambiguity. The intention being that the players should be able to
          shape the narrative and outcome, and use politics and role-plying to
          shape the game world.
        </p>
      </div>

      <div className="TextPage">
        <div className="infoHeader">Design Philosophy</div>
        <p className="infoPara">
          - Sandboxes are very fun. Howver, they can hard on a DM since players
          can move all over. This is covered by provideing lots of well
          organized content for the DM that can used in the midst of running the
          game. Many adventures fail at laying things out for easy access while
          the DM is running the game.{" "}
        </p>

        <p className="infoPara">
          - Players can't get stuck. There 2 major plots, and plenty of other
          trouble PC's can get into. The plots can be entered from many
          different places, so if they players do manage to get stuck, they can
          always get unstuck by exploring more.
        </p>

        <p className="infoPara">
          - Player determined conculsion. Thep players can pick if they want to
          help the convoy or not. They can also choose what to do with the
          immortality flower.{" "}
        </p>
        <p className="infoPara">
          - Players don't need to see all the content. After visiting a couple
          locations, players should be hooked into the plot one way or another.
        </p>
        <p className="infoPara">
          - Easy to re-run with different groups. Randomization comes from which
          Locations the players visit and should make it fun for the DM to run
          the adventure multiple times with differnt groups. Each play through
          should come out different just based on the path players take.{" "}
        </p>
        <p className="infoPara">
          - Game length of 2-3 Sessions. Even though there are many locations,
          there is only enough plot for a couple sessions. This is meant to
          maximize player freedom and choice, but also keep tings contained and
          not dragging.
        </p>
        <p className="infoPara">
          - Easy to remix. If your game is dragging, there are many NPC's that
          can show up to move the plot along.{" "}
        </p>
        <p className="infoPara">
          - Activities that hit the high points of DnD. This adventure should be
          good for new PC's and new DM's sicne it's got a smattering of typical
          DnD activities.{" "}
        </p>
        <p className="infoPara"></p>

        <div className="infoHeader"></div>
      </div>

      <div className="TextPage">
        <div className="infoHeader">Optimized for game flow and PC freedom</div>

        <p className="infoPara">
          - You may notice there are a large number of locations, but a small
          number of plots. The adventure is structued so that no matter what the
          players do, it will generally connect back to the 2 major plots. This
          will prevent railroading, but also maintains a sense of progression
          and narrative for the players. The main thing that changes is what the
          players entry point into the plot it.{" "}
        </p>

        <div className="infoHeader">Gameplay Flow</div>
        <p className="infoPara">
          Playing out any given location will follow out a similar pattern,
          generally going from top to bottom on the location page :
          <br />
          1. Read the Exterior description of the location.
          <br />
          2. If the players enter, or have already entered, read the interior
          description.
          <br />
          3. If the players look around, read any additional details.
          <br />
          4. Play out any events that happen when the players enter the
          location. Not every location will have events.
          <br />
          5. Players talk with NPCs, or NPC's will approach the players. In some
          locations the players will only get a chance to talk to one of severla
          NPC's before the others leave the area.
          <br />
          6. Flip to the NPC page (which always follows the location page) and
          go though any dialogue the NPC has.
          <br />
          7. Check the Quests/Rewards for the NPC to see if the player has
          earned a reward or can be given a quest. Some NPC's can be used as a
          gameplay utility for the players to interact with.
          <br />
          8. Reference the NPC's plot information to see if any other details
          can be included.
          <br />
          9. If the players want to look around the location more, you can use
          some of the Random NPC's to provide more content and activities.
          <br />
          10. Describe the other connected locations so that the players can
          keep exploring.
          <br />
          11. Repeat step 1. for the new location. Of course this order can
          changed around however the DM pleases, but it will always be there as
          a fallback if you're feeling unprepaird
        </p>
      </div>

      <div className="TextPage">
        <div className="infoHeader">Plot Convoy</div>
        <p className="infoPara">
          This is the most up front plot in the adventue. THe Convoy, a trading
          organiztation that has been growing the last several decades seeks to
          set up a base in Freeside. However, this base will invetibly be a foot
          hold into the city, and threatens to take over more and more of the
          territory. The Orcs and Pirates specifictly are threatned.{" "}
        </p>
        <p className="infoPara">
          It's up to the players to come up with a solution, or ignore it all
          together.{" "}
        </p>
        <p className="infoPara">
          Whenever the DM is ready for a story beat to happen, 10 Convoy ships
          appear and setup, and a hidden pier they were building underwater
          floats up to the surface so the ships can dock. This also happens in
          the Theives Port, which is the unregulated region of Freeside.
        </p>
        <p className="infoPara">
          Once this happens, there will be a battle of about 200 Convoy soldiers
          with about 100 Pirates and Orcs. The Convoy wil will this fight if the
          players do nothing, and will be able to set up a permanent base. While
          the rest of Freeside doesn't really agree with this, they won't be
          will to risk their own lives to stop this from happening.{" "}
        </p>
        <div className="infoHeader">Plot Immortality Flower</div>
        <p className="infoPara">
          This is a slightly hidden, but easy to discover plot. Hidden away in
          the hinterlands is a single magic flower. When eating it's petals, the
          eater will heal, and de-age by roughly 1 year. The flower grows about
          5 petals a year, and the petals cannot be stored in anyway. So it's
          only enough for about 5 people to live forever from it's petals.{" "}
        </p>
        <p className="infoPara">
          It was originaly discovered by a cult 1000 years ago, but was then
          forgotten as the Cult died out, taking their secret with them. Hoever,
          about 300 years ago, the flower rediscovered by a group of 5 friends.
          Only one of them now remains, Lapish. She is mostly mad, but is
          obsessed with living forever and keeping the secret to herself.
          Hoever, she still needs money, and gets lonely, so she keeps an inner
          circle of 3-4 people alive at a time, however she'll kill them without
          hesitation if they become troublesome.
        </p>
        <p className="infoPara">
          Lapish has no interest in politics, or society, other than maintaining
          her hold on the flower, and she is also quite mad anyways.{" "}
        </p>
        <p className="infoPara">
          It shouldn't be too difucult for the players to discover these
          secrets, and like the Convoy, it will be up to them to decide what to
          do with the flower, and Lapish. Lapish wis a somewhat fearsome fough,
          but is a bit of a glass cannon.{" "}
        </p>
        <p className="infoPara">
          The initial clue to the existance of the flower, is someone being
          distenigrated just around the corner from the players. This is Lapish
          killing someone they've deemed troublesome, and can serve as an intial
          mystery for them to solve.
        </p>
        <p className="infoPara">
          If they players defeat Lapish, it will then be left up to them to
          decide{" "}
        </p>
      </div>

      <div className="TextPage">
        <div className="infoHeader">Sub Plot Kaiju</div>
        <p className="infoPara">
          Originally captured or created by the original flower cult, under
          Freeside lies a sleeping monster. The monster can be awakened and
          controlled by opening the book in the square dungeon. Once awakained,
          it can be controlled by the PC or NPC who got trapped inside the the
          book. The book can be dispelled, in which case the person inside it is
          freed, the book destroyed, and the Kaiju freed. It will then simply
          wander off into the ocean.{" "}
        </p>
        <p className="infoPara">
          If the book is destroyed, anyone inside it will be killed and the
          monster will also be freed as if the book had been dispelled. If the
          book is handed over to the dog library, the person inside is freed,
          and the PC's recieve a scroll of a wish spell.
        </p>
        <p className="infoPara">
          This isn't nessecerly a complete plot onto itself, but the Kaiju can
          be a story beat, and can used as a tool to affect the world of
          Freeside.{" "}
        </p>

        <div className="infoHeader">Sub Plot Party Planning</div>
        <p className="infoPara">
          This is for players are more ceatively inclined. They can work with
          Palnithir to plan a hot new party on Freeside. They can do this any
          way, and can convince the inhabitants of Freeside to help.
        </p>
        <div className="infoHeader">Sub Plot Gladiator Areana</div>
        <p className="infoPara">
          This is a realtively linear narrtive, as it just involves the players
          fighting in the areana and gaining fame and wealth that way. If the
          players enjoy the areana, theit increasing fame will attracte the
          influence of powerful people, and try to use them as spokes people for
          their agenda.
        </p>
      </div>
    </>
  );
}

export default Info;
