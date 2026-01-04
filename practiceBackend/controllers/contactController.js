import Contact from "../Model/Contact.js";

const contactHandler = async (req, res) => {
    try {
        // ❌ You used params.body, it should be req.body
        const { name, email, phone, message } = req.body;

        // Create new Contact instance
        const contact = new Contact({ name, email, phone, message });

        // Save to DB
        await contact.save();

        console.log(contact);

        return res.status(200).json({ message: "Contact created successfully" });
    } catch (error) {
        console.error(error); // log error for debugging
        return res.status(500).json({ message: "Internal server error" });
    }
};

export default contactHandler;
