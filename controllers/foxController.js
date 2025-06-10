const Fox = require('../models/Fox');
const axios = require("axios");

exports.getIndex = (req, res) => {
  res.render('index', { title: 'Welcome' });
};

exports.getVotePage = async (req, res) => {
  try {
    let fox1, fox2;
    do {  //henter 2 bilder av rever fra API-en
      fox1 = await axios.get("https://randomfox.ca/floof/");
      fox2 = await axios.get("https://randomfox.ca/floof/");
    } while (fox1.data.image === fox2.data.image); //henter nye hvis de er helt like
    res.render("voting", { title: "Voting", foxes: [fox1.data.image, fox2.data.image], error: null });
  } catch (err) {
    res.render('voting', { title: 'Voting', foxes: [], error: "Could not fetch fox images!" });
  }
};

exports.submitVote = async (req, res) => {
  const votedFoxImage = req.body.foxImage;
  if (!votedFoxImage) {
    return res.redirect("/vote");
  }

  try {
    let fox = await Fox.findOne({ imageUrl: votedFoxImage });

    if (!fox) {
      // Find the current highest foxNumber
      const lastFox = await Fox.findOne().sort({ foxNumber: -1 });
      const nextFoxNumber = lastFox && lastFox.foxNumber ? lastFox.foxNumber + 1 : 1;

      fox = new Fox({
        imageUrl: votedFoxImage,
        votes: 1,
        foxNumber: nextFoxNumber
      });
      await fox.save();
    } else {
      fox.votes += 1;
      await fox.save();
    }

    res.redirect("/vote");
  } catch (err) {
    res.redirect("/vote");
  }
};

exports.getStatistics = async (req, res) => {
  // Her skal jeg hente ut statistikken til FOX stemmene på top3 og totalen stemmer
  const topFoxes = await Fox.find().sort({ votes: -1 }).limit(3);
  const top10Foxes = await Fox.find().sort({ votes: -1 }).limit(10);
  const cutestFox = await Fox.findOne().sort({ votes: -1 }); //finner reven med flest stemmer
  res.render('statistics', { title: 'Statistics', topFoxes, top10Foxes, cutestFox });
};

exports.getAllFoxes = async (req, res) => {
  try {
    const allFoxes = await Fox.find().sort({ votes: -1 });
    res.render("all-foxes", { title: "Alle Rever Rangsjert", allFoxes, error: null });
  } catch (err) {
    res.render("all-foxes", { title: "Alle Rever Rangsjert", allFoxes: [], error: "Kunne ikke hente rever."})
  }
}
