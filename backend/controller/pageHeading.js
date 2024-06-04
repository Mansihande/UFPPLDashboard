const PageHeadings = require('../model/pageHeading');

const getpageHeading = async (req, res) => {
  const pageType = req.query.pageType;
  console.log(pageType)
  try {
    const pageHeading = await PageHeadings.findOne({ pageType: pageType });
    if (!pageHeading) {
      return res.status(404).json({ message: `Page heading not found for ${pageType}` });
    }
    res.json({ heading: pageHeading.heading, subheading: pageHeading.subheading });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving page heading' });
  }
}

const updatePageHeading = async (req, res) => {
    const pageType = req.query.pageType;
    const {heading,subheading} = req.body;
  console.log(req.body);
  console.log(pageType)
  console.log("hello")
    try {
      const pageHeading = await PageHeadings.findOne({ pageType: pageType });
      if (!pageHeading) {
        return res.status(404).json({ message: `Page heading not found for ${pageType}` });
      }
  
      const updateObj = {};
  
      if (heading) updateObj.heading = heading;
      if (subheading) updateObj.subheading = subheading;
  
      Object.assign(pageHeading, updateObj);
  
      await pageHeading.save();
     console.log(pageHeading)
      res.json({ heading: pageHeading.heading, subheading: pageHeading.subheading });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error updating page heading' });
    }
  }


module.exports = { getpageHeading ,updatePageHeading};