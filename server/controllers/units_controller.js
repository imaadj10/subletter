const units_middleware = require('../middleware/units_middleware');

exports.get_all_units = async (req, res) => {
    try {
        const result = await units_middleware.get_all_units();
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send({ message: error });
    }
};