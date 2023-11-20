const fs = require("fs");
const csv = require("fast-csv");

const { insertHandler } = require("../models/handlerManager");

const { insertOperator } = require("../models/operatorManager");
const { insertBrand } = require("../models/brandManager");
const { insertStation } = require("../models/stationManager");
const { insertChargePoint } = require("../models/chargePointManager");

const { truncateTables } = require("../models/truncateManager");

const readCsv = (uriFile) => {
  const stream = fs.createReadStream(uriFile);
  const csvDataColl = [];
  const fileStream = csv
    .parse()
    .on("data", (data) => {
      csvDataColl.push(data);
    })
    .on("end", async () => {
      //  verifier le formateage du csv

      // vider les tables
      csvDataColl.shift();

      await truncateTables();

      // inserer les valeurs par defaut
      await insertHandler([["NC", 0, "NC"]]);
      await insertOperator([["NC", "NC"]]);
      await insertBrand([["NC"]]);

      const handler = [];
      const operator = [];
      const brand = [];
      const station = [];
      const chargePoint = [];

      // rendre unique les entrees du fichier

      csvDataColl.forEach((data) => {
        if (data[0].length) {
          if (
            !handler.filter(
              (elem) =>
                elem[0] ===
                data[0]
                  .toUpperCase()
                  .trim()
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
            ).length
          ) {
            handler.push([
              data[0]
                .toUpperCase()
                .trim()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, ""),
              data[1],
              data[2],
            ]);
          }
        }

        if (data[3].length) {
          if (
            !operator.filter(
              (elem) =>
                elem[0] ===
                data[3]
                  .toUpperCase()
                  .trim()
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
            ).length
          ) {
            operator.push([
              data[3]
                .toUpperCase()
                .trim()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, ""),
              data[4],
            ]);
          }
        }

        if (data[6].length) {
          if (
            !brand.filter(
              (elem) =>
                elem[0] ===
                data[6]
                  .toUpperCase()
                  .trim()
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
            ).length
          ) {
            brand.push([
              data[6]
                .toUpperCase()
                .trim()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, ""),
            ]);
          }
        }

        if (
          !station.filter((elem) => elem[3] === data[7].toUpperCase().trim())
            .length
        ) {
          station.push([
            data[0]
              .toUpperCase()
              .trim()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, ""),
            data[3]
              .toUpperCase()
              .trim()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, ""),
            data[6]
              .toUpperCase()
              .trim()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, ""),
            data[7].toUpperCase().trim(),
            data[9],
            data[11],
            /* data[13]
              .replace(/[\[\]']/g, "")
              .split(",")
              .reverse()
              .toString(), */
            data[14],
            data[17],
            data[18],
            data[19],
            data[20],
            data[21],
            data[22],
            data[23],
            data[24],
            data[25],
            data[26],
            data[28],
            data[29],
            data[30],
            data[36],
            data[38],
            data[45],
            data[46],
          ]);
        }

        if (!chargePoint.filter((elem) => elem[1] === data[15]).length) {
          chargePoint.push([data[7], data[15]]);
        }
      });
      // inserer  en bdd
      await insertHandler(handler);
      await insertOperator(operator);
      await insertBrand(brand);

      await Promise.all(
        station.map(async (line) => {
          let handlers = "NC";

          const [ammenageur, operateur, enseigne] = line;
          if (ammenageur.length) {
            handlers = ammenageur;
          }

          let operators = "NC";
          if (operateur.length) {
            operators = operateur;
          }
          let brands = "NC";
          if (enseigne.length) {
            brands = enseigne;
          }
          line.splice(0, 3);

          for (let i = 0; i < line.length; i += 1) {
            const index = line[i]?.toLowerCase();
            if (index === "false" || index === "faux") {
              // eslint-disable-next-line no-param-reassign
              line[i] = 0;
            }
            if (index === "true" || index === "vrai") {
              // eslint-disable-next-line no-param-reassign
              line[i] = 1;
            }
            if (index === "") {
              // eslint-disable-next-line no-param-reassign
              line[i] = 0;
            }
          }

          await insertStation(handlers, operators, brands, line);
        })
      );

      await Promise.all(
        chargePoint.map(async (line) => {
          await insertChargePoint(line[0], line[1]);
        })
      );
      console.info("INSERTION FINIT");
    });
  console.info("DEBUT DU TRAITEMENT");

  stream.pipe(fileStream);
};

const importCsv = (req, res) => {
  readCsv(`${__dirname}/../uploads/${req.file.filename}`);
  return res.sendStatus(201);
};

module.exports = importCsv;
