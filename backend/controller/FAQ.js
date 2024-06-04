const FAQ = require("../model/fqa");

 const insertFAQ = async (req , res) => {
    try {
        const {question , answer , status} = req.body ; 
        const faq = new FAQ ({
            question, answer,status
        })
        await faq.save ;
        return res.status(201).send(
            {
                message:"your FAQ send successfully",
                faq:faq
            }
        )
    } catch (error) {
        console.error("Error inserting news:", error);
        res.status(400).send(error);
    }
 }

const getFAQ = async (req , res) => {
    try {
        const faq = await FAQ.find();
        res.status(200).send(faq);
    } catch (error) {
        console.error("Error retrieving testimonials:", error);
        res.status(400).send(error); 
    }
};

const updateFAQ = async (req,res) => {

    try {
        const {id } = req.query;
        const {question , answer , status} = req.body;
        const updateObj = {
            $set : {}
        };

        if(question) updateObj.$set.question = question;
        if(answer) updateObj.$set.answer = answer;
        if(status) updateFAQ.$set.status = status;

        const faq = await FAQ.findByIdAndUpdate(id, updateObj, { new:truw});

        if(!faq) {
            return res.status(404).send({
                message:"FAQ not found"
            })
        }

        res.status(200).send({ testimonial, message: "Update successful" });
    } catch (error) {
        console.error("Error updating testimonial:", error);
        res.status(400).send(error);
    }
}
 module.exports = {insertFAQ ,getFAQ}