exports.successResponse = (res, data, message = 'Success') => {
    return res.status(200).json({ message, data });
};

exports.errorResponse = (res, error, message = 'Error') => {
    return res.status(500).json({ message, error });
};