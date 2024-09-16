function idMaker() {
  const length = 12;
  let id = "";
  for (let i = 0; i < length; i++) {
    const randomDigit = Math.floor(Math.random() * 10); // Génère un chiffre entre 0 et 9
    id += randomDigit;
  }
  return id;
}
