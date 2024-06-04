const News = require("../model/news");

const insertNews = async (req, res) => {
    try {
                
        const { title, details, status, date } = req.body;
        const photo = req.files.map(file => file.filename);

        const news = new News({
            title,
            details,
            photo,
            status,
            date
        });

        await news.save();
        res.send(news);
    } catch (err) {
        console.error("Error inserting news:", err);
        res.status(400).send(err);
    }
}

const getNews = async (req, res) => {
    try {
      const { page = 1 } = req.query;
      const limit = 5; // Number of records per page
  
      const count = await News.countDocuments(); // Get total count first
      const news = await News.find()
        .skip((page - 1) * limit) // Skip records for previous pages
        .limit(limit);
  
      res.status(200).json({
        data: news,
        total: count,
        currentPage: page,
        hasNextPage: count > page * limit
      });
    } catch (error) {
      console.error(error);
      let errorMessage = 'Error fetching news';
      if (error.name === 'CastError') {
        errorMessage = 'Invalid query parameter format';
      }
      res.status(500).json({ message: errorMessage });
    }
  };

  const updateNews = async (req, res) => {
    try {
        const { id } = req.query;
        console.log(id);
        const { title, details, status, date } = req.body;
        const photo = req.files ? req.files.map(file => file.filename) : [];

        const updateObj = {
            $set: {}
        };

        if (title) updateObj.$set.title = title;
        if (details) updateObj.$set.details = details;
        if (status) updateObj.$set.status = status;
        if (date) updateObj.$set.date = date;
        if (photo.length > 0) updateObj.$set.photo = photo;

        const news = await News.findByIdAndUpdate(id, updateObj, { new: true });

        if (!news) {
            return res.status(404).send({ message: 'News not found' });
        }

        res.status(200).send({ news, message: "Update successful" });
    } catch (error) {
        console.error("Error updating news:", error);
        res.status(400).send(error);
    }
};

  const deleteNews = async (req , res) => {
    try {
      const {id} = req.query;

      const news = await News.findByIdAndDelete(id);

      if(!news) {
        return res.status(404).send({message: 'News not found'});
      }

      res.send({ message: "News deleted successfully"}).status(200);
    } catch (error) {
      console.error(err);
      res.status(400).send(err);
    }
  } 
module.exports = { insertNews , getNews,updateNews,deleteNews };
