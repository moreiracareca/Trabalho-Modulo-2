const fs = require("fs").promises;

console.log("START");

//ATIVIDADE 1
// unionUFCity();

//ATIVIDADE 2
// (async () => {
//   const retorno = await countCitiesInUF("RJ");
//   console.log(retorno);
// })();

//ATIVIDADE 3
// (async () => {
//   const retorno = await printToFiveUF();
//   console.log(retorno);
// })();

//ATIVIDADE 4
(async () => {
  const retorno = await printToFiveUFLessCity();
  console.log(retorno);
})();

//ATIVIDADE 5
// (async () => {
//   const retorno = await printCityBiggestNameToUF();
//   console.log(retorno);
// })();

//ATIVIDADE 6
// (async () => {
//   const retorno = await printCityLessNameToUF();
//   console.log(retorno);
// })();

//ATIVIDADE 7
// (async () => {
//   const retorno = await printCityBiggestNameToUF();

//   console.log(
//     retorno.sort(function (a, b) {
//       return a.total.localeCompare(b.total);
//     })
//   );

//   console.log(
//     retorno.sort((a, b) => b.total.length - a.total.length).slice(0, 1)[0]
//   );
// })();

//ATIVIDADE 8
// (async () => {
//   const retorno = await printCityLessNameToUF();

//   console.log(
//     retorno.sort(function (a, b) {
//       return a.total.localeCompare(b.total);
//     })
//   );

//   console.log(
//     retorno.sort((a, b) => a.total.length - b.total.length).slice(0, 1)[0]
//   );
// })();

//ATIVIDADE 01
async function unionUFCity() {
  try {
    const ufsBinario = await fs.readFile("./JSONs/Estados.json", "utf-8");
    const ufs = JSON.parse(ufsBinario);

    const citiesBinario = await fs.readFile("./JSONs/Cidades.json", "utf-8");
    const cities = JSON.parse(citiesBinario);

    ufs.forEach((uf) => {
      const newCities = cities.filter((city) => {
        return city.Estado == uf.ID;
      });

      fs.writeFile(`./filesUFs/${uf.Sigla}.json`, JSON.stringify(newCities));
    });
  } catch (error) {
    return console.log("Error:" + error);
  }
}

//ATIVIDADE 02
async function countCitiesInUF(uf) {
  try {
    const citiesBinario = await fs.readFile(`./filesUFs/${uf}.json`, "utf-8");
    const cities = JSON.parse(citiesBinario);
    return cities.length;
  } catch (error) {
    return console.log("Error:" + error);
  }
}

//ATIVIDADE 03
async function printToFiveUF() {
  try {
    const ufsBinario = await fs.readFile("./JSONs/Estados.json", "utf-8");
    const ufs = JSON.parse(ufsBinario);

    const totalCities = [];
    for (uf of ufs) {
      totalCity = { sigla: uf.Sigla, total: await countCitiesInUF(uf.Sigla) };
      totalCities.push(totalCity);
    }

    return totalCities.sort((a, b) => b.total - a.total).slice(0, 5);
  } catch (error) {
    return console.log("Error:" + error);
  }
}

//ATIVIDADE 04
async function printToFiveUFLessCity() {
  try {
    const ufsBinario = await fs.readFile("./JSONs/Estados.json", "utf-8");
    const ufs = JSON.parse(ufsBinario);

    const totalCities = [];
    for (uf of ufs) {
      totalCity = { sigla: uf.Sigla, total: await countCitiesInUF(uf.Sigla) };
      totalCities.push(totalCity);
    }

    return totalCities
      .sort((a, b) => b.total - a.total)
      .slice(totalCities.length - 5, totalCities.length);
  } catch (error) {
    return console.log("Error:" + error);
  }
}

//ATIVIDADE 05
async function printCityBiggestNameToUF() {
  try {
    const ufsBinario = await fs.readFile("./JSONs/Estados.json", "utf-8");
    const ufs = JSON.parse(ufsBinario);

    const totalCities = [];
    for (uf of ufs) {
      totalCity = {
        sigla: uf.Sigla,
        total: await getBiggestNameCity(uf.Sigla),
      };
      totalCities.push(totalCity);
    }

    return totalCities;
  } catch (error) {
    return console.log("Error:" + error);
  }
}

async function getBiggestNameCity(uf) {
  try {
    const citiesBinario = await fs.readFile(`./filesUFs/${uf}.json`, "utf-8");
    const cities = JSON.parse(citiesBinario);

    //MARANHÃO, SERGIPE E SÃO PAULO
    return cities.sort((a, b) => b.Nome.length - a.Nome.length).slice(0, 1)[0]
      .Nome;
  } catch (error) {
    return console.log("Error:" + error);
  }
}

//ATIVIDADE 06
async function printCityLessNameToUF() {
  try {
    const ufsBinario = await fs.readFile("./JSONs/Estados.json", "utf-8");
    const ufs = JSON.parse(ufsBinario);

    const totalCities = [];
    for (uf of ufs) {
      totalCity = {
        sigla: uf.Sigla,
        total: await getLessNameCity(uf.Sigla),
      };
      totalCities.push(totalCity);
    }

    return totalCities;
  } catch (error) {
    return console.log("Error:" + error);
  }
}

async function getLessNameCity(uf) {
  try {
    const citiesBinario = await fs.readFile(`./filesUFs/${uf}.json`, "utf-8");
    const cities = JSON.parse(citiesBinario);

    //MARANHÃO, SERGIPE E SÃO PAULO
    return cities.sort((a, b) => a.Nome.length - b.Nome.length).slice(0, 1)[0]
      .Nome;
  } catch (error) {
    return console.log("Error:" + error);
  }
}
