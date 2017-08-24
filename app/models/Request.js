var mongoose = require('mongoose');
var RequestSchema = new mongoose.Schema({
    emp_name: String,
    start: Date,
    end: Date,
    reason: String,
    email: {
        type: String,
        validate: function(email) {
            return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
        }
    },
    pending: {
        type: Boolean,
        default: true
    },
    approved: {
        type: Boolean,
        default: false
    },
    denied: {
        type: Boolean,
        default: false
    },
    updated_at: {type: Date, default: Date.now},
});
module.exports = mongoose.model('Request', RequestSchema);


