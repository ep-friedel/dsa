//helper
let w = function (x) {
    return Math.floor((Math.random()*x)+1);
  },
  escape = function (str) {
    return str
      .replace(/[\\]/g, '\\\\')
      .replace(/[\"]/g, '\\\"')
      .replace(/[\/]/g, '\\/')
      .replace(/[\b]/g, '\\b')
      .replace(/[\f]/g, '\\f')
      .replace(/[\n]/g, '\\n')
      .replace(/[\r]/g, '\\r')
      .replace(/[\t]/g, '\\t');
  };

document.addEventListener('DOMContentLoaded', () => {
  let left = document.getElementById('tablesLeft'),
    right = document.getElementById('tablesRight');

  function initTables(tablesData) {
    tablesData.forEach((tableData, tableIndex) => {
      let table = document.createElement('table'),
        tbody = document.createElement('tbody'),
        thead = document.createElement('thead'),
        tr = document.createElement('tr'),
        td = document.createElement('td'),
        th = document.createElement('th');

      table.appendChild(thead);
      table.appendChild(tbody);

      tableData.rows[0].forEach((cell, cellIndex) => {
        th.innerHTML = cell;
        th.colSpan = tableData.cols[0][cellIndex];
        tr.appendChild(th.cloneNode(true));
      });

      thead.appendChild(tr.cloneNode(true));

      tableData.rows.slice(1).forEach((row, rowIndex) => {
        tr.innerHTML = "";

        row.forEach((cell, cellIndex) => {
          td.innerHTML = cell;
          td.colSpan = tableData.cols[rowIndex+1][cellIndex];
          tr.appendChild(td.cloneNode(true));
        });

        tbody.appendChild(tr.cloneNode(true));
      });

      if (tableIndex % 2 === 0) {
        left.appendChild(table);
      } else {
        right.appendChild(table);
      }
    });
  };

  //pcgen
  function initPC() {
    let chars = pc,

      talentTest = function(attr, talent) {
        attr.forEach(val => {
          let rnd = w(20)
          talent = (val > rnd) ? talent : talent - (rnd - val)
        });
        return talent;
      },
      skilltestgen = function(type, attr) {
        return function(char) {
          if (!char || char.id === undefined) {
            let curchar = this.parentElement.parentElement.parentElement;
            if (!curchar.dataset || curchar.dataset.id === undefined) return;
            mychar = chars[curchar.dataset.id];
          } else {
            mychar = char;
          }

          document.querySelector('#char' + mychar.id).querySelector('.output').value = type + ': ' + talentTest([mychar[attr[0]], mychar[attr[1]], mychar[attr[2]]], mychar[type]);
        }
      },
      testLuck = function(char) {
        if (!char || char.id === undefined) {
          let charFrame = this.parentElement.parentElement.parentElement;
          if (!charFrame.dataset || charFrame.dataset.id === undefined) return;
          mychar = chars[charFrame.dataset.id];
        } else {
          mychar = char;
        }

        document.querySelector('#char' + mychar.id).querySelector('.output').value = 'luck: ' + calcLuck(char);
      },
      calcLuck = function(char) {
        let val = (w(20) + w(20)) / 2;

        if (val < 2) {
          return 'perfect';
        } else if (val <= char.luck) {
          return 'good'
        } else if (val <= char.luck * 2) {
          return 'normal'
        } else {
          return 'bad';
        }
      },

      testSinn = skilltestgen('sinn', ['kl', 'in', 'in']),
      testDanger = skilltestgen('danger', ['kl', 'in', 'in']),
      list = document.getElementById('pclist');

    chars.forEach(char => {
      let li = document.createElement('li'),
          template =
            `<div class="fullWidthEl">
              <label for="">Name</label>
              <input type="text" class="name" value="${char.name}">
            </div>
            <div class="fullWidthEl">
              <label for="">Notes</label>
              <textarea name="" class="notes" cols="20" rows="2">${char.notes}</textarea>
            </div>
            <div class="fullWidthEl">
              <div class="halfWidthEl">
                <label for="">Sinnesschärfe</label>
                <input type="number" class="sinn" value="${(typeof char.sinn === 'function') ? char.sinn() : char.sinn}">
              </div>
              <div class="halfWidthEl">
                <button class="sinn">Roll</button>
              </div>
            </div>
            <div class="fullWidthEl">
              <div class="halfWidthEl">
                <label for="">Gefahreninstinkt</label>
                <input type="number" class="danger" value="${(typeof char.danger === 'function') ? char.danger() : char.danger}">
              </div>
              <div class="halfWidthEl">
                <button class="danger">Roll</button>
              </div>
            </div>
            <div class="fullWidthEl">
              <div class="halfWidthEl">
                <label for="">Glück</label>
                <input type="luck" class="luck" value="${(typeof char.luck === 'function') ? char.luck() : char.luck}">
              </div>
              <div class="halfWidthEl">
                <button class="luck">Roll</button>
              </div>
            </div>
            <div class="fullWidthEl">
              <label for="">Output</label>
              <input type="text" class="output">
            </div>`;

      li.innerHTML = template;

      li.id = 'char' + char.id;
      li.dataset.id = char.id;
      li.classList.add('char');
      list.appendChild(li);

      li.querySelector('button.sinn').addEventListener('click', testSinn);
      li.querySelector('button.danger').addEventListener('click', testDanger);
      li.querySelector('button.luck').addEventListener('click', testLuck);
    });

    document.querySelector('#sinnAll').addEventListener('click', () => chars.forEach(testSinn));
    document.querySelector('#dangerAll').addEventListener('click', () => chars.forEach(testDanger));
    document.querySelector('#luckAll').addEventListener('click', () => chars.forEach(testLuck));
  };

  //npcgen
  function initNPC() {
    let chars = npc,
      frame = document.getElementById('frame'),
      base = document.getElementById('newchar'),
      charslist = document.getElementById('charslist'),

      close = function (evt) {
        this.parentElement.remove();
      }
      doDmg = function(evt) {
        let self = evt.target,
          charinfo = self.parentElement.parentElement,
          hpInput = charinfo.querySelector('.hp'),
          armInput = charinfo.querySelector('.arm'),
          dmg = self.dataset.dmg,
          dmgval = (parseInt(dmg) - parseInt(armInput.value));

        if (dmgval > 0) {
          hpInput.value = parseInt(hpInput.value) - (dmgval);
        }
      },
      atpgen = function(type) {
        return function (evt) {
          let char = chars[this.parentElement.dataset.id],
            charFrame = this.parentElement,
            output = charFrame.querySelector('.output'),
            value = charFrame.querySelector('.'+type).value
            atroll = w(20);

          if (atroll === 20 && w(20) > value) {
            output.value = type + ' crit fail';
            return;
          }
          if (atroll === 1 && w(20) <= value) {
            output.value = type + ' crit: ' + (char.dmg() * 2);
            return;
          }

          if (atroll <= value) {
            output.value = type + ' ' + char.dmg();
          } else {
            output.value = type + ' missed';
          }
        }
      },
      generateChar = function(evt) {
        let char = chars[this.dataset.id],
          key,
          newChar = document.createElement('div'),
          armor = (typeof char.arm === 'function') ? char.arm() : char.arm,
          _armor = armor,
          dmgTemplate = Array(10).fill(0).map((i) => _armor++ +1).map(dmgval => `<li class="dmg" data-dmg="${dmgval}">${dmgval}</li>`).join(''),
          template =`
            <span class="close">x</span>
            <div class="fullWidthEl">
              <label for="">Name</label>
              <input type="text" class="name" value="${char.name}">
            </div>
            <div class="fullWidthEl">
              <label for="">Description</label>
              <textarea name="" class="description" cols="20" rows="2">${char.description}</textarea>
            </div>
            <div class="fullWidthEl">
              <label for="">Wounds</label>
              <input type="text" class="wounds" value="${char.wounds}">
            </div>
            <div class="halfWidthEl">
              <label for="">Health</label>
              <input type="number" class="hp" value="${(typeof char.hp === 'function') ? char.hp() : char.hp}">
            </div>
            <div class="halfWidthEl">
              <label for="">Armor</label>
              <input type="number" class="arm" value="${armor}">
            </div>
            <div class="halfWidthEl">
              <label for="">Attack</label>
              <input type="number" class="attack" value="${(typeof char.attack === 'function') ? char.attack() : char.attack}">
            </div>
            <div class="halfWidthEl">
              <label for="">Parry</label>
              <input type="number" class="parry" value="${(typeof char.parry === 'function') ? char.parry() : char.parry}">
            </div>
            <div class="halfWidthEl">
              <label for="">INI</label>
              <input type="number" class="ini" value="${(typeof char.ini === 'function') ? char.ini() : char.ini}">
            </div>
            <div class="fullWidthEl">
              <label for="">Output</label>
              <input type="text" class="output">
            </div>

            <button id="atk">Attack</button>
            <button id="pry">Parry</button>
            <ul class="dmgbar">
              ${dmgTemplate}
            </ul>`;


        newChar.classList.add('char', 'char' + char.id);
        newChar.dataset.id = this.dataset.id;
        frame.appendChild(newChar);
        newChar.innerHTML = template;

        Array.from(newChar.querySelector('.dmgbar').children).forEach((el) => {
            el.addEventListener('click', doDmg);
        });

        newChar.querySelector('.close').addEventListener('click', close);
        newChar.querySelector('#atk').addEventListener('click', attack);
        newChar.querySelector('#pry').addEventListener('click', parry);
      },
      attack = atpgen('attack'),
      parry = atpgen('parry');

    chars.forEach((char, index) => {
      let li = document.createElement('li');

      li.classList.add('chargen');
      li.innerHTML = char.name;
      li.dataset.id = index;
      charslist.appendChild(li);
      li.addEventListener('click', generateChar)
    });
  };

  //storyframe
  function initStory(nr) {
    let storyinput = document.getElementById('story' + nr),
        timeout;
    fetch('/api/stories')
      .then(json => json.json())
      .then(data => storyinput.value = data['dsastory' + nr]);

    storyinput.addEventListener('keyup', function() {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        fetch('/api/stories', {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: '{"' + 'dsastory' + nr + '": "' + escape(this.value) + '"}'
        })
      }, 500);
    });
  };

  // tabbar
  function initTabBar() {
    let framelist = document.getElementById('framelist'),
      children = Array.from(framelist.children)
      setActiveTab = function(evt) {
        let target = document.getElementById(this.dataset.target);

        document.querySelectorAll('.selected').forEach(e => e.classList.remove('selected'));
        document.querySelectorAll('.active').forEach(e => e.classList.remove('active'));

        target.classList.add('active');
        this.classList.add('selected');
      };

    children.forEach(e => e.addEventListener('click', setActiveTab))
  };

  initPC();
  initNPC();
  initStory('3');
  initStory('');
  initStory('2');
  initTabBar();
  initTables(tableArray);
})