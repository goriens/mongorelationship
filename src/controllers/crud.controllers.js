const post = (model) => async (req, res) => {
    try {
        const item = await model.create(req.body);
        return res.status(200).send(item);
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
};

//module.exports = (model) => {
//    return {
//        post: post(model),
//    };
//};

//-----------
const deleteOne = (model) => async (req, res) => {
    try {
        const item = await model.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(200).send(item);
    }
    catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

module.exports = (model) => {
    return {
        post: post(model),
        deleteOne: deleteOne(model),
    };
};