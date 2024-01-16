const whoiser = require("whoiser");
const fs = require("fs");
const csvWriter = require("csv-writer").createObjectCsvWriter;

(async () => {
  //  functions csv writer
  const domainCsv = csvWriter({
    path: "./result1.csv",
    header: [{ id: "domains", title: "++++++ List Domain Expaired +++++++" }],
  });

  // function get domain
  function getDomain() {
    var domains = fs.readFileSync("domains.txt", "utf-8");
    const re = /\s*(?:;|$)\s*/;
    var domain = domains.split(re);
    return domain;
  }
  const domains = getDomain();
  domains.pop();
  for (var i = 0; i <= domains.length; i++) {
    if (domains[i] !== undefined) {
      console.log("======================");
      console.log("Checking domain ===>> " + domains[i]);

      let domaininfo = await whoiser(domains[i]);
      let domainResult = JSON.stringify(domaininfo);

      let check = domainResult.search("No match for");
      let check2 = domainResult.search("DOMAIN NOT FOUND");
      let check3 = domainResult.search("Domain not found");
      let item = [];
      if (check > 0 || check2 > 0 || check3 > 0) {
        item.push({
          domains: domains[i],
        });

        console.log("Domain Expaired");

        await domainCsv.writeRecords(item).then(() => console.log(domains[i] + " Has been saved"));
      } else {
        console.log("Domain Was Registered");
      }

      console.log("done");
    }
  }
  console.log("=======================");
  console.log("Finish Checking " + domains.length + " Domains");
})();
