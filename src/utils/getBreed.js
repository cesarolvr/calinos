const getBreed = type => {
  if (type === "dog") {
    return [
      { name: "Outra" },
      { name: "Afghan Hound" },
      { name: "Airedale Terrier" },
      { name: "Akita" },
      { name: "Akita Americano" },
      { name: "American Pit Bull Terrier" },
      { name: "American Staffordshire Terrier" },
      { name: "Australian Shepherd" },
      { name: "Basenji" },
      { name: "Basset Fulvo da Bretanha" },
      { name: "Basset Hound" },
      { name: "Beagle" },
      { name: "Beagle-Harrier" },
      { name: "Bearded Collie" },
      { name: "Bedlington Terrier" },
      { name: "Bernese Mountain Dog" },
      { name: "Bichon Bolonhês" },
      { name: "Bichon Frisé" },
      { name: "Bichon Havanês" },
      { name: "Boerboel" },
      { name: "Boiadeiro de Entlebuch" },
      { name: "Border Collie" },
      { name: "Border Terrier" },
      { name: "Borzoi" },
      { name: "Boston Terrier" },
      { name: "Bouvier de Flandres" },
      { name: "Boxer" },
      { name: "Braco Alemão Pelo Curto" },
      { name: "Braco Alemão Pelo Duro" },
      { name: "Braco Italiano" },
      { name: "Buldogue Americano" },
      { name: "Buldogue Francês" },
      { name: "Buldogue Inglês" },
      { name: "Bull Terrier" },
      { name: "Bullmastiff" },
      { name: "Cairn Terrier" },
      { name: "Cane Corso" },
      { name: "Cão de Crista Chinês" },
      { name: "Cão de Santo Humberto" },
      { name: "Cão D'água Espanhol" },
      { name: "Cão D'água Português" },
      { name: "Cão Lobo Checoslovaco" },
      { name: "Cão Pelado Mexicano" },
      { name: "Cão Pelado Peruano" },
      { name: "Cavalier King Charles Spaniel" },
      { name: "Cesky Terrier" },
      { name: "Chesapeake Bay Retriever" },
      { name: "Chihuahua" },
      { name: "Chin" },
      { name: "Chow-chow Pelo Curto" },
      { name: "Chow-chow Pelo Longo" },
      { name: "Cirneco do Etna" },
      { name: "Clumber Spaniel" },
      { name: "Cocker Spaniel Americano" },
      { name: "Cocker Spaniel Inglês" },
      { name: "Collie pelo longo" },
      { name: "Coton de Tulear" },
      { name: "Dachshund Teckel - Pelo Curto" },
      { name: "Dálmata" },
      { name: "Dandie Dinmont Terrier" },
      { name: "Dobermann" },
      { name: "Dogo Argentino" },
      { name: "Dogo Canário" },
      { name: "Dogue Alemão" },
      { name: "Dogue de Bordeaux" },
      { name: "Elkhound Norueguês Cinza" },
      { name: "Fila Brasileiro" },
      { name: "Flat-Coated Retriever" },
      { name: "Fox Terrier Pelo Duro" },
      { name: "Fox Terrier Pelo Liso" },
      { name: "Foxhound Inglês" },
      { name: "Galgo Espanhol" },
      { name: "Golden Retriever" },
      { name: "Grande Munsterlander" },
      { name: "Greyhound" },
      { name: "Griffon Belga" },
      { name: "Griffon de Bruxelas" },
      { name: "Husky Siberiano" },
      { name: "Ibizan Hound" },
      { name: "Irish Soft Coated Wheaten Terrier" },
      { name: "Irish Wolfhound" },
      { name: "Jack Russell Terrier" },
      { name: "Kerry Blue Terrier" },
      { name: "Komondor" },
      { name: "Kuvasz" },
      { name: "Labrador Retriever" },
      { name: "Lagotto Romagnolo" },
      { name: "Lakeland Terrier" },
      { name: "Leonberger" },
      { name: "Lhasa Apso" },
      { name: "Malamute do Alasca" },
      { name: "Maltês" },
      { name: "Mastiff" },
      { name: "Mastim Espanhol" },
      { name: "Mastino Napoletano" },
      { name: "Mudi" },
      { name: "Nordic Spitz" },
      { name: "Norfolk Terrier" },
      { name: "Norwich Terrier" },
      { name: "Old English Sheepdog" },
      { name: "Papillon" },
      { name: "Parson Russell Terrier" },
      { name: "Pastor Alemão" },
      { name: "Pastor Beauceron" },
      { name: "Pastor Belga" },
      { name: "Pastor Bergamasco" },
      { name: "Pastor Branco Suíço" },
      { name: "Pastor Briard" },
      { name: "Pastor da Ásia Central" },
      { name: "Pastor de Shetland" },
      { name: "Pastor dos Pirineus" },
      { name: "Pastor Maremano Abruzês" },
      { name: "Pastor Polonês" },
      { name: "Pastor Polonês da Planície" },
      { name: "Pequeno Basset Griffon da Vendéia" },
      { name: "Pequeno Cão Leão" },
      { name: "Pequeno Lebrel Italiano" },
      { name: "Pequinês" },
      { name: "Perdigueiro Português" },
      { name: "Petit Brabançon" },
      { name: "Pharaoh Hound" },
      { name: "Pinscher Miniatura" },
      { name: "Podengo Canário" },
      { name: "Podengo Português" },
      { name: "Pointer Inglês" },
      { name: "Poodle Anão" },
      { name: "Poodle Médio" },
      { name: "Poodle Standard" },
      { name: "Poodle Toy" },
      { name: "Pug" },
      { name: "Puli" },
      { name: "Pumi" },
      { name: "Rhodesian Ridgeback" },
      { name: "Rottweiler" },
      { name: "Saluki" },
      { name: "Samoieda" },
      { name: "São Bernardo" },
      { name: "Schipperke" },
      { name: "Schnauzer" },
      { name: "Schnauzer Gigante" },
      { name: "Schnauzer Miniatura" },
      { name: "Scottish Terrier" },
      { name: "Sealyham Terrier" },
      { name: "Setter Gordon" },
      { name: "Setter Inglês" },
      { name: "Setter Irlandês Vermelho" },
      { name: "Setter Irlandês Vermelho e Branco" },
      { name: "Shar-pei" },
      { name: "Shiba" },
      { name: "Shih-Tzu" },
      { name: "Silky Terrier Australiano" },
      { name: "Skye Terrier" },
      { name: "Smoushond Holandês" },
      { name: "Spaniel Bretão" },
      { name: "Spinone Italiano" },
      { name: "Spitz Alemão Anão" },
      { name: "Spitz Finlandês" },
      { name: "Spitz Japonês Anão" },
      { name: "Springer Spaniel Inglês" },
      { name: "SRD (sem raça definida)" },
      { name: "Stabyhoun" },
      { name: "Staffordshire Bull Terrier" },
      { name: "Terra Nova" },
      { name: "Terrier Alemão de caça Jagd" },
      { name: "Terrier Brasileiro" },
      { name: "Terrier Irlandês de Glen do Imaal" },
      { name: "Terrier Preto da Rússia" },
      { name: "Tibetan Terrier" },
      { name: "Tosa Inu" },
      { name: "Vizsla" },
      { name: "Volpino Italiano" },
      { name: "Weimaraner" },
      { name: "Welsh Corgi Cardigan" },
      { name: "Welsh Corgi Pembroke" },
      { name: "Welsh Springer Spaniel" },
      { name: "Welsh Terrier" },
      { name: "West Highland White Terrier" },
      { name: "Whippet" },
      { name: "Yorkshire Terrier" },
    ];
  }
  return [
    { name: "Outra" },
    { name: "American Bobtail pelo longo" },
    { name: "American Bobtail pelo curto" },
    { name: "American pelo curto" },
    { name: "American Wirehair" },
    { name: "Arabian Mau" },
    { name: "Asian pelo semi-longo" },
    { name: "Australian Mist" },
    { name: "Bengal" },
    { name: "Bobtail Japonês" },
    { name: "Bombaim" },
    { name: "British pelo longo" },
    { name: "Burmês" },
    { name: "California Spangled Cat" },
    { name: "Chausie" },
    { name: "Cornish Rex" },
    { name: "Curl Americano Pelo Curto" },
    { name: "Curl Americano Pelo Longo" },
    { name: "Cymric" },
    { name: "Devon Rex" },
    { name: "Domestic Long-Haired" },
    { name: "Domestic Short-Haired" },
    { name: "Don Sphynx" },
    { name: "Egyptian Mau" },
    { name: "European" },
    { name: "Exotic pelo curto" },
    { name: "German Rex" },
    { name: "Havana" },
    { name: "Himalaio" },
    { name: "Khao Manee" },
    { name: "Korat" },
    { name: "Kurilian Bobtail pelo longo" },
    { name: "Kurilian Bobtail pelo curto" },
    { name: "LaPerm pelo longo" },
    { name: "LaPerm pelo curto" },
    { name: "Maine Coon" },
    { name: "Manx" },
    { name: "Mekong Bobtail" },
    { name: "Munchkin pelo longo" },
    { name: "Munchkin pelo curto" },
    { name: "Nebelung" },
    { name: "Norwegian Forest Cat" },
    { name: "Ocicat" },
    { name: "Ojos Azules pelo curto" },
    { name: "Oriental pelo longo" },
    { name: "Oriental pelo curto" },
    { name: "Pelo curto brasileiro" },
    { name: "Persa" },
    { name: "Peterbald" },
    { name: "Pixiebob pelo longo" },
    { name: "Pixiebob pelo curto" },
    { name: "Ragamuffin" },
    { name: "Ragdoll" },
    { name: "Russo Azul" },
    { name: "Sagrado da Birmânia" },
    { name: "Savannah Cat" },
    { name: "Scottish Fold" },
    { name: "Selkirk Rex pelo longo" },
    { name: "Selkirk Rex pelo curto" },
    { name: "Serengeti" },
    { name: "Siamês" },
    { name: "Siberian" },
    { name: "Singapura" },
    { name: "Snowshoe" },
    { name: "Sokoke" },
    { name: "Somali" },
    { name: "Sphynx" },
    { name: "SRD (sem raça definida)" },
    { name: "Thai" },
    { name: "Tonkinese pelo curto" },
    { name: "Toyger" },
    { name: "Turkish Angorá" },
    { name: "Turkish Van" },
    { name: "York Chocolate" },
    
  ];
};

export default getBreed;
