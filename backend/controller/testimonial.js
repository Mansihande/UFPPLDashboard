const Testimonial = require('../model/testimonial');
const insertTestimonial = async (req, res) => {
    try {
        const {title, details, status} = req.body;
        const photo = req.files.map(file => file.filename);

        const testimonial = new Testimonial( {
            title,
            details,
            photo,
            status
        });

        await testimonial.save();
        return res.status(201).send({message: 'data send successfully', testimonial:testimonial});

    } catch (error) {
        console.error("Error inserting news:", error);
        res.status(400).send(error);
    }
}

const getTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find();
        res.status(200).send(testimonials);
    } catch (error) {
        console.error("Error retrieving testimonials:", error);
        res.status(400).send(error);
    }
};

const updateTestimonial = async (req, res) => {
    try {
        const { id } = req.query;
        const { title, details, status } = req.body;
        const photo = req.files ? req.files.map(file => file.filename) : [];

        const updateObj = {
            $set: {}
        };

        if (title) updateObj.$set.title = title;
        if (details) updateObj.$set.details = details;
        if (status) updateObj.$set.status = status;
        if (photo.length > 0) updateObj.$set.photo = photo;

        const testimonial = await Testimonial.findByIdAndUpdate(id, updateObj, { new: true });

        if (!testimonial) {
            return res.status(404).send({ message: 'Testimonial not found' });
        }

        res.status(200).send({ testimonial, message: "Update successful" });
    } catch (error) {
        console.error("Error updating testimonial:", error);
        res.status(400).send(error);
    }
};

const deleteTestimonial = async (req, res) => {
    try {
        const {id} = req.query;
        const testimonial = await Testimonial.findByIdAndDelete(id);

        if(!testimonial){
            return res.status(404).send({message: 'testimonials not found'});
        }
        res.send({ message: "News deleted successfully"}).status(200);
    } catch (error) {
        console.error(err);
        res.status(400).send(err);
    }
}

module.exports = {insertTestimonial , getTestimonials ,updateTestimonial , deleteTestimonial};