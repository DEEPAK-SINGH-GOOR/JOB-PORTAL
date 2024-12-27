const mongoose = require('mongoose');

const companyschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    phonenumber: {
        type: String,
        required: true,
        minlength: 10 
    },
    website: {
        type: String,
        required: true
    },
    industry: {
        type: String,
        required: true
    },
    recruiterid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jobportalsupport',
        required: true
    },
    jobpostings: [{
        type: String,
        required: true
    }],
    activestatus: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    }
}, {
    timestamps: true
});

const company = mongoose.model('company', companyschema);

module.exports = company;
