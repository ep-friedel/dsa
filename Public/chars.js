let pc = [
  {
    id: 0,
    name: "Sanya Brachental",
    notes: '',
    luck: 5,
    sinn: 8,
    danger: 4,
    kl: 13,
    in: 14
  },{
    id: 1,
    name: "Aurasche ...",
    notes: '',
    luck: 5,
    sinn: 6,
    danger: 0,
    kl: 11,
    in: 14
  },{
    id: 2,
    name: "magister ibn ruban",
    notes: 'Zachaban ibn ruban abul ketab',
    luck: 5,
    sinn: 2,
    danger: 0,
    kl: 14,
    in: 13
  },{
    id: 3,
    name: "Daren Cricetus",
    notes: '',
    luck: 5,
    sinn: 2,
    danger: 0,
    kl: 14,
    in: 14
  },{
    id: 4,
    name: "Zahe",
    notes: '',
    luck: 7,
    sinn: 5,
    danger: 3,
    kl: 14,
    in: 14
  },{
    id: 5,
    name: "Jeto",
    notes: '',
    luck: 5,
    sinn: 5,
    danger: 3,
    kl: 12,
    in: 12
  }
],
npc = [
  {
    id: 0,
    name: "Adran Revennis",
    hp: 15,
    wounds: "arm",
    description: "sohn of haranni and Amir, noble, Part of House Revennis, slightly hurt",
    attack: 11,
    dmg: () => (0),
    parry: 12,
    ini: () => (w(6) + 8)
  },{
    id: 1,
    name: "Haldan Kevendoch",
    hp: 40,
    arm: 3,
    wounds: "",
    description: "Anführer der roten Faust",
    attack:14,
    dmg: () => (w(6) + 5),
    parry: 14,
    ini: () => (w(6) + 13)
  },{
    id: 2,
    name: "Yann Kvaic",
    hp: 32,
    arm: 4,
    wounds: "",
    description: "Axt + Schild",
    attack:14,
    dmg: () => (w(6) + 4),
    parry:14,
    ini: () => (w(6) + 11)
  },{
    id: 3,
    name: "Bogenschütze",
    hp: () => (20 + w(10)),
    arm: () => w(2),
    wounds: "",
    description: "bogen",
    attack: () => (10 + w(6)),
    dmg: () => (w(6) + w(5)),
    ini: () => (w(6) + 9)
  },{
    id: 4,
    name: "Schwertkämpfer",
    hp: () => (20 + w(12)),
    arm: () => w(3),
    wounds: "",
    description: "schwert",
    attack:() => (10 + w(5)),
    parry:() => (10 + w(5)),
    dmg: () => (w(6) + w(3)),
    ini: () => (w(6) + 9)
  },{
    id: 5,
    name: "Axtkämpfer",
    hp: () => (25 + w(10)),
    arm: () => w(3),
    wounds: "",
    description: "Axt",
    attack:() => (w(6) + 9),
    parry:() => (9 + w(3)),
    dmg: () => (w(6) + w(4) + 1),
    ini: () => (w(6) + 9)
  },{
    id: 6,
    name: "Harpie",
    hp: () => (w(6) + 5),
    wounds: "",
    description: "",
    attack: 14,
    parry: 7,
    arm: 1,
    dmg: () => (w(6) + 4),
    ini: () => (w(6) + 9)
  },{
    id: 7,
    name: "Höhlenbär",
    hp: () => (w(20) + 60),
    wounds: "",
    description: "doppelangriff, groß",
    attack: () => (10 + w(3)),
    parry: 6,
    arm: 3,
    dmg: () => (2*w(6) + 4),
    ini: () => (w(6) + 6)
  },{
    id: 8,
    name: "Grubenwurm",
    hp: () => (w(20) + 60),
    wounds: "",
    description: "Gestank, groß",
    attack: () => (9 + w(3)),
    parry: 8,
    arm: 4,
    dmg: () => (w(6) + 6),
    ini: () => (w(6) + 9)
  },{
    id: 9,
    name: "Khoramsbestie",
    hp: () => (w(14) + 20),
    wounds: "",
    description: "rudel",
    attack: () => (10 + w(3)),
    parry: 8,
    arm: 2,
    dmg: () => (w(6) + 4),
    ini: () => (w(6) + 9)
  }
];

