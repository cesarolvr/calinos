import frida1 from "../assets/mock/1-frida/1.png";
import frida2 from "../assets/mock/1-frida/2.png";

import fred1 from "../assets/mock/2-fred/1.png";
import fred2 from "../assets/mock/2-fred/2.png";

import otavio1 from "../assets/mock/3-otavio/1.png";
import otavio2 from "../assets/mock/3-otavio/2.png";
import otavio3 from "../assets/mock/3-otavio/3.png";

import luna1 from "../assets/mock/4-luna/1.png";
import luna2 from "../assets/mock/4-luna/2.png";

import nina1 from "../assets/mock/5-nina/1.png";
import nina2 from "../assets/mock/5-nina/2.png";

import thor1 from "../assets/mock/6-thor/1.png";
import thor2 from "../assets/mock/6-thor/2.png";

import lulinha1 from "../assets/mock/7-lulinha/1.png";
import lulinha2 from "../assets/mock/7-lulinha/2.png";

import maya1 from "../assets/mock/8-maya/1.png";

import lua1 from "../assets/mock/9-lua/1.png";

import bob1 from "../assets/mock/10-bob/1.png";
import bob2 from "../assets/mock/10-bob/2.png";

import brunoImg from "../assets/users/bruno.jpg";
import larissaImg from "../assets/users/larissa.jpg";
import lauraImg from "../assets/users/laura.jpg";
import gustavoImg from "../assets/users/gustavo.jpg";
import luisaImg from "../assets/users/luisa.jpg";
import marianaImg from "../assets/users/mariana.jpg";
import miguelImg from "../assets/users/miguel.jpg";
import pauloImg from "../assets/users/paulo.jpg";
import luanaImg from "../assets/users/luana.jpg";
import pedroImg from "../assets/users/pedro.png";

export const favorites = [
  {
    animal: {
      breed: "SRD",
      color: "Amarelo",
      gender: "F",
      name: "Frida",
      size: "Pequeno",
      type: "dog"
    },
    local: {
      comment:
        "Frida é uma cadelinha muito dócil e assustada. Fugiu de casa quando deixamos o portão aberto por muito tempo.",
      contactPhone: "(11)99345662",
      pin: {
        lat: -23.5979,
        lng: -46.68374
      },
      reference: "Próximo à rua Tibiriçá",
      street: "Rua Joaquim Nabuco"
    },
    ownerPhoto: larissaImg,
    ownerName: "Larissa Alves",
    photos: [frida1, frida2],
    postType: "lost",
    lastActivity: {
      type: 'environment',
      title: 'Foi as 14h passear no parque'
    }
  },
  {
    animal: {
      name: "Fred",
      type: "dog",
      gender: "M",
      breed: "Border Collie",
      color: "Preto e branco",
      size: "Médio"
    },
    local: {
      pin: {
        lat: -23.5979,
        lng: -46.68374
      },
      comment:
        "Fred é um dog muito ativo de 3 anos. Fugiu da guia quando encontrou outro cachorros.",
      contactPhone: "(11)99345663",
      street: "Rua Gaivota",
      reference: "Próximo a academia Smart Fit"
    },
    ownerPhoto: pedroImg,
    ownerName: "Pedro Nunes",
    photos: [fred1, fred2],
    postType: "lost",
    lastActivity: {
      type: 'like',
      title: 'Foi no veterinário ontem'
    }
  },
  {
    animal: {
      name: "Otávio",
      type: "cat",
      gender: "M",
      breed: "Siamês",
      color: "Marrom e bege",
      size: "Pequeno"
    },
    local: {
      pin: {
        lat: -23.5979,
        lng: -46.68374
      },
      comment:
        "Otávio é um cat muito curioso. Ele sai de casa toda noite e volta pela manhã, porém dessa vez ainda não voltou.",
      contactPhone: "(11)99345664",
      street: "Av. dos Eucaliptos",
      reference: "Próximo à estação de metrô Eucaliptos"
    },
    ownerPhoto: gustavoImg,
    ownerName: "Gustavo Peixoto",
    photos: [otavio1, otavio2, otavio3],
    postType: "lost",
    lastActivity: {
      type: 'gift',
      title: 'Ganhou um ossinho de um amigo'
    }
  },
  {
    animal: {
      name: "Luna",
      type: "dog",
      gender: "F",
      breed: "Labrador",
      color: "Marrom",
      size: "Grande"
    },
    local: {
      pin: {
        lat: -23.5979,
        lng: -46.68374
      },
      comment:
        "Luna adora brincar e fazer amizades. Ela fugiu de casa durante o dia, estava usando uma coleira vermelha.",
      contactPhone: "(11)99345665",
      street: "Al. Franca",
      reference: "Chegando na Av. 9 de Julho"
    },
    ownerPhoto: lauraImg,
    ownerName: "Laura Dias",
    photos: [luna1, luna2],
    postType: "lost",
    lastActivity: {
      type: 'star',
      title: 'Tava na tosa hoje cedo'
    }
  },
  {
    animal: {
      name: "Nina",
      type: "cat",
      gender: "F",
      breed: "Persa",
      color: "Cinza",
      size: "Pequeno"
    },
    local: {
      pin: {
        lat: -23.5979,
        lng: -46.68374
      },
      comment:
        "Nina fugiu. É uma gata marrom e bege com coleira rosa. Ela é bastante assustada e não gosta muito de pessoas.",
      contactPhone: "(11)99345666",
      street: "Rua Caiubí",
      reference: "Na quadra do Mito Burger"
    },
    ownerPhoto: pauloImg,
    ownerName: "Paulo Souza",
    photos: [nina1, nina2],
    postType: "lost",
    lastActivity: {
      type: 'shopping',
      title: 'Foi no Pet Shop com Paulo'
    }
  }
];

export const adoption = [
  {
    animal: {
      name: "Thor",
      type: "dog",
      gender: "M",
      breed: "Golden Retriever",
      color: "Bege",
      size: "Grande"
    },
    local: {
      pin: {
        lat: -23.5979,
        lng: -46.68374
      },
      comment:
        "Thor fugiu durante uma ida ao parque. Estava com coleira preta e guia azul. É muito brincalhão e curioso.",
      contactPhone: "(11)99345667",
      street: "Rua Ariquemi",
      reference: "Na região do Parque Villa-Lobos"
    },
    ownerPhoto: luisaImg,
    ownerName: "Luiza Torres",
    photos: [thor1, thor2],
    postType: "lost",
    lastActivity: {
      type: 'tag',
      title: 'Trocou de coleira'
    }
  },
  {
    animal: {
      name: "Lulinha",
      type: "cat",
      gender: "M",
      breed: "SRD",
      color: "Preto",
      size: "Pequeno"
    },
    local: {
      pin: {
        lat: -23.5979,
        lng: -46.68374
      },
      comment:
        "Lulinha é um cat de 13 anos que adora socializar. Ele usa uma coleira vermelha e possuiu o rabo curto.",
      contactPhone: "(11)99345668",
      street: "R. Dr. Felix",
      reference: "Próximo à estação de metrô Vergueiros"
    },
    ownerPhoto: luanaImg,
    ownerName: "Luana Britto",
    photos: [lulinha1, lulinha2],
    postType: "lost",
    lastActivity: {
      type: 'woman',
      title: 'Foi castrada semana passada'
    }
  },
  {
    animal: {
      name: "Maya",
      type: "dog",
      gender: "F",
      breed: "SRD",
      color: "Preto",
      size: "Médio"
    },
    local: {
      pin: {
        lat: -23.5979,
        lng: -46.68374
      },
      comment:
        "Maya é uma vira-lata muito ativa. Ela estranha bastante outras pessoas, mas se dá bem com animal. Maya não usava coleira no momento da fuga.",
      contactPhone: "(11)99345669",
      street: "R. Daniel Rossi",
      reference: "Nas redondezas do Metrô Santana"
    },
    ownerPhoto: marianaImg,
    ownerName: "Mariana Tavares",
    photos: [maya1],
    postType: "lost",
    lastActivity: {
      type: 'environment',
      title: 'Foi passear de noite com Mariana'
    }
  },
  {
    animal: {
      name: "Lua",
      type: "cat",
      gender: "F",
      breed: "SRD",
      color: "Malhado",
      size: "Pequeno"
    },
    local: {
      pin: {
        lat: -23.5979,
        lng: -46.68374
      },
      comment:
        "Lua é uma gata curiosa. Fugiu durante uma de suas saídas. Ela usa coleira verde e rosa.",
      contactPhone: "(11)99345670",
      street: "Rua dos Ingleses",
      reference: "Próximo ao teatro Ruth Escobar"
    },
    ownerPhoto: miguelImg,
    ownerName: "Miguel Montes",
    photos: [lua1],
    postType: "lost",
    lastActivity: {
      type: 'poweroff',
      title: 'Dormiu por toda tarde'
    }
  },
  {
    animal: {
      name: "Bob",
      type: "dog",
      gender: "M",
      breed: "Bulldog francês",
      color: "Preto e branco",
      size: "Pequeno"
    },
    local: {
      pin: {
        lat: -23.5979,
        lng: -46.68374
      },
      comment:
        "Bob se assustou com o barulho da rua e fugiu. Ele usava um peitoral preto no momento da futa. Ele não se dá muito bem com outros animais, mas adora pessoas.",
      contactPhone: "(11)99345671",
      street: "R. Pedroso Alvarenga",
      reference: "Na região da FMU Itaim"
    },
    ownerPhoto: brunoImg,
    ownerName: "Bruno Costa",
    photos: [bob1, bob2],
    postType: "lost",
    lastActivity: {
      type: 'car',
      title: 'Passeou de carro agora pouco'
    }
  }
];
