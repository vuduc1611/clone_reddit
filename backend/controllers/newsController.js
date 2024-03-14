const axios = require("axios");
const url = "https://newsapi.org/v2"
const newController = {
    getHotNews: async (req,res) => {
        try{ 
        const news = await axios.get(`${baseUrl}/top-headlines?country=us&apiKey=${process.env.API_KEY}`);
        res.status(200).json(news.data.articles);
    }catch(err) {
            res.status(500).json(err);
        }
    }
};

module.exports = newController;