# Checking memory
For tracking purposes, the memory we are intested in is at location $7EF000 and spans 0x500 (1280) bytes long. It is an SRAM mirror, what is written there gets copied to SRAM when saving the game.

The layout for the base game can be seen here: http://alttp.run/hacking/index.php?title=SRAM_Map. The randomizer seems to move some things around.

## SRAM layout
### Checks
#### Light World

<table>
    <thead>
        <tr>
            <th>Offset</th>
            <th>Bit</th>
            <th>Description
        </tr>
    </thead>
    <tbody>
        <tr>
            <th rowspan="3">$022</th>
            <th>4</th>
            <th>Sewers - Secret Room - Left</th>
        </tr>
        <tr>
            <th>5</th>
            <th>Sewers - Secret Room - Middle</th>
        </tr>
        <tr>
            <th>6</th>
            <th>Sewers - Secret Room - Right</th>
        </tr>
        <tr>
            <th>$024</th>
            <th>4</th>
            <th>Sanctuary</th>
        </tr>
        <tr>
            <th rowspan="4">$05E</th>
            <th>4</th>
            <th>Kakariko Well - Bomb Wall</th>
        </tr>
        <tr>
            <th>5</th>
            <th>Kakariko Well - Top Left</th>
        </tr>
        <tr>
            <th>6</th>
            <th>Kakariko Well - Top Middle</th>
        </tr>
        <tr>
            <th>7</th>
            <th>Kakariko Well - Top Right</th>
        </tr>
        <tr>
            <th>$05F</th>
            <th>1</th>
            <th>Kakariko Well - Bottom</th>
        </tr>
        <tr>
            <th>$206</th>
            <th>4</th>
            <th>Kakariko Tavern</th>
        </tr>
        <tr>
            <th rowspan="3">$20A</th>
            <th>4</th>
            <th>Sahasrahla's Hut - Left</th>
        </tr>
        <tr>
            <th>5</th>
            <th>Sahasrahla's Hut - Middle</th>
        </tr>
        <tr>
            <th>6</th>
            <th>Sahasrahla's Hut - Right</th>
        </tr>
        <tr>
            <th>$210</th>
            <th>4</th>
            <th>Chicken House</th>
        </tr>
        <tr>
            <th>$214</th>
            <th>4</th>
            <th>Aginah's Cave</th>
        </tr>
        <tr>
            <th rowspan="2">$228</th>
            <th>4</th>
            <th>Waterfall Fairy Left</th>
        </tr>
        <tr>
            <th>5</th>
            <th>Waterfall Fairy Right</th>
        </tr>
        <tr>
            <th rowspan="4">$23A</th>
            <th>4</th>
            <th>Blind's Hideout - Bomb Wall</th>
        </tr>
        <tr>
            <th>5</th>
            <th>Blind's Hideout - Left</th>
        </tr>
        <tr>
            <th>6</th>
            <th>Blind's Hideout - Right</th>
        </tr>
        <tr>
            <th>7</th>
            <th>Blind's Hideout - Far Left</th>
        </tr>
        <tr>
            <th>$23B</th>
            <th>1</th>
            <th>Blind's Hideout - Far Right</th>
        </tr>
        <tr>
            <th>$240</th>
            <th>4</th>
            <th>Ice Rod Cave</th>
        </tr>
        <tr>
            <th rowspan="4">$246</th>
            <th>4</th>
            <th>Mini Moldorm Cave - Far Left</th>
        </tr>
        <tr>
            <th>5</th>
            <th>Mini Moldorm Cave - Left</th>
        </tr>
        <tr>
            <th>6</th>
            <th>Mini Moldorm Cave - Right</th>
        </tr>
        <tr>
            <th>7</th>
            <th>Mini Moldorm Cave - Far Right</th>
        </tr>
        <tr>
            <th>$248</th>
            <th>4</th>
            <th>Bonk Rock Cave</th>
        </tr>
        <tr>
            <th>$2A8</th>
            <th>6</th>
            <th>Running Game</th>
        </tr>
        <tr>
            <th>$2AA</th>
            <th>6</th>
            <th>Flute Spot</th>
        </tr>
        <tr>
            <th>$301</th>
            <th>6</th>
            <th>Zora Ledge</th>
        </tr>
        <tr>
            <th>$395</th>
            <th>1</th>
            <th>Mini Moldorm Cave - Generous Guy</th>
        </tr>
        <tr>
            <th rowspan="2">$3C9</th>
            <th>0</th>
            <th>Hobo</th>
        </tr>
        <tr>
            <th>1</th>
            <th>Bottle Merchant</th>
        </tr>
    </tbody>
</table>
