const Service = require("../model/service")

 const insertService = async (req,res) => {
    try {
        const { title, details, status, icons } = req.body;
        const photo = req.files.map(file => file.filename); // Extract the filenames from the array of files
        // const icons = req.files.icons.map(file => file.filename);
       console.log(photo)
        const service = new Service({
          title,
          details,
          photo,
          status,
          icons,
        
        });
  
        await service.save();
        res.send({service,message:"success"});
      } catch (err) {
        console.error(err);
        res.status(400).send(err);
      } 
}

const getService = async(req,res)=>{
    try {
        const { page = 1 } = req.query;
        const limit = 5; // Number of records per page
    
        const count = await Service.countDocuments(); // Get total count first
        const service = await Service.find()
          .skip((page - 1) * limit) // Skip records for previous pages
          .limit(limit);
         console.log(service)
        res.status(200).json({
          data: service,
          total: count,
          currentPage: page,
          hasNextPage: count > page * limit
        });
      } catch (error) {
        console.error(error);
        let errorMessage = 'Error fetching categories';
        if (error.name === 'CastError') {
          errorMessage = 'Invalid query parameter format';
        }
        res.status(500).json({ message: errorMessage });
      }
}

const updateService = async (req, res) => {
    try {
      const { id } = req.query;
      console.log(id)
      const { title, details, status, heading } = req.body;
      const photo = req.files ? req.files.map(file => file.filename) : [];
  
      const updateObj = {
        $set: {}
      };
  
      if (title) updateObj.$set.title = title;
      if (details) updateObj.$set.details = details;
      if (status) updateObj.$set.status = status;
      if (heading) updateObj.$set.heading = heading;
      if (photo.length > 0) updateObj.$set.photo = photo;
  
      const service = await Service.findByIdAndUpdate(id, updateObj, { new: true });
  
      if (!service) {
        return res.status(404).send({ message: 'Service not found' });
      }
  
      res.send({ service, message: "success" }).status(200);
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  }


  const deleteService = async (req, res) => {
    try {
      const { id } = req.query;
  
      const service = await Service.findByIdAndDelete(id);
  
      if (!service) {
        return res.status(404).send({ message: 'Service not found' });
      }
  
      res.send({ message: 'Service deleted successfully' }).status(200);
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  }

  const getServiceById = async (req, res) => {
    try {
      const { id } = req.query;
      const service = await Service.findById(id);
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }
      res.status(200).json({ data: service });
    } catch (error) {
      console.error(error);
      let errorMessage = 'Error fetching service';
      if (error.name === 'CastError') {
        errorMessage = 'Invalid ID format';
      }
      res.status(500).json({ message: errorMessage });
    }
  }


module.exports = {insertService,getService,updateService,deleteService,getServiceById};