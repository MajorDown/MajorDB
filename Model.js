const fs = require("fs");
const path = require("path");
import idMaker from "./idMaker.js";

class Model {
  /**
   * Crée une nouvelle instance de modèle.
   * @param {Object} schema - Le schéma qui définit la structure et les types des données.
   * @param {string} collectionName - Le nom de la collection ou du fichier JSON où les données seront stockées.
   */
  constructor(schema, collectionName) {
    this.schema = schema;
    this.collectionName = collectionName;
    this.filePath = path.join(__dirname, "db", `${collectionName}.json`);
  }

  /**
   * Valide un document en fonction du schéma fourni.
   * @param {Object} doc - Le document à valider.
   * @param {Object} [schema=this.schema] - Le schéma utilisé pour la validation (par défaut, utilise le schéma du modèle).
   * @throws {Error} - Si le document ne correspond pas au schéma attendu.
   */
  validateDocument(doc, schema = this.schema) {
    for (const key in schema) {
      const fieldType = schema[key];
      const value = doc[key];

      // Gérer les objets imbriqués automatiquement
      if (
        typeof fieldType === "object" &&
        !Array.isArray(fieldType) &&
        fieldType !== null
      ) {
        if (typeof value !== "object" || Array.isArray(value)) {
          throw new Error(`Invalid type for ${key}. Expected Object.`);
        }
        this.validateDocument(value, fieldType); // Validation récursive
      }
      // Gérer les tableaux d'objets
      else if (Array.isArray(fieldType) && typeof fieldType[0] === "object") {
        if (!Array.isArray(value)) {
          throw new Error(`Invalid type for ${key}. Expected Array.`);
        }
        value.forEach((item) => this.validateDocument(item, fieldType[0])); // Valider chaque objet dans le tableau
      }
      // Validation pour les tableaux simples
      else if (fieldType === Array && !Array.isArray(value)) {
        throw new Error(`Invalid type for ${key}. Expected Array.`);
      }
      // Validation des types primitifs
      else if (
        typeof fieldType !== "object" &&
        typeof value !== fieldType.name.toLowerCase()
      ) {
        throw new Error(
          `Invalid type for ${key}. Expected ${
            fieldType.name
          }, got ${typeof value}`
        );
      }
    }
  }

  /**
   * Lit les données à partir du fichier JSON associé à la collection.
   * @returns {Array} - Le tableau des documents stockés.
   */
  _readData() {
    if (!fs.existsSync(this.filePath)) {
      return [];
    }
    const data = fs.readFileSync(this.filePath, "utf-8");
    return JSON.parse(data);
  }

  /**
   * Sauvegarde les données dans le fichier JSON associé à la collection.
   * @param {Array} data - Le tableau des documents à sauvegarder.
   */
  _writeData(data) {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
  }

  /**
   * Crée un nouveau document dans la collection.
   * @param {Object} doc - Le document à créer.
   * @returns {Object} - Le document créé avec un identifiant unique (UUID).
   * @throws {Error} - Si le document ne respecte pas le schéma.
   */
  create(doc) {
    this.validateDocument(doc);
    const data = this._readData();
    doc.id = idMaker(); // Génère un UUID unique pour l'identifiant
    data.push(doc);
    this._writeData(data);
    return doc;
  }

  /**
   * Lit un document à partir de la collection en fonction de son identifiant.
   * @param {string} id - L'identifiant du document à lire.
   * @returns {Object|undefined} - Le document correspondant à l'identifiant, ou undefined s'il n'existe pas.
   */
  read(id) {
    const data = this._readData();
    return data.find((doc) => doc.id === id);
  }

  /**
   * Met à jour un document dans la collection.
   * @param {string} id - L'identifiant du document à mettre à jour.
   * @param {Object} updates - Les modifications à apporter au document.
   * @returns {Object} - Le document mis à jour.
   * @throws {Error} - Si le document ne respecte pas le schéma ou si l'identifiant est introuvable.
   */
  update(id, updates) {
    const data = this._readData();
    const index = data.findIndex((doc) => doc.id === id);
    if (index === -1) {
      throw new Error(`Document with id ${id} not found`);
    }

    const updatedDoc = { ...data[index], ...updates };
    this.validateDocument(updatedDoc);
    data[index] = updatedDoc;
    this._writeData(data);
    return updatedDoc;
  }

  /**
   * Supprime un document de la collection en fonction de son identifiant.
   * @param {string} id - L'identifiant du document à supprimer.
   */
  delete(id) {
    let data = this._readData();
    data = data.filter((doc) => doc.id !== id);
    this._writeData(data);
  }
}

module.exports = Model;
