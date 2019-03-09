Contact = require('./contactModel');

exports.index = function(req,res) {
    Contact.get(function(err,contacts){
        if(err){
            res.json({
                status:'err',
                message:'err'
            });
        }else{
            res.json({
                status: "Sucess",
                message: 'Contacts retreived sucessfully',
                data: contacts
            })
        }
    })
}

exports.new = function(req,res){
    var contact = new Contact();
    contact.name = req.body.name ? req.body.name : contact.name;
    contact.gender = req.body.gender;
    contact.email = req.body.email;
    contact.phone = req.body.phone;

    contact.save(function(err) {
        res.json({
            message: 'new contact created',
            data: contact
        })
    });
}

exports.view = function(req,res){
    Contact.findById(req.params.contact_id, function(err,contact){
        if(err)
            res.send(err);
        res.json({
            message: 'Contact details loading....',
            data: contact
        });
    });
}

exports.update = function(req,res){
    Contact.findById(req.params.contact_id,function(err,contact){
        if(err)
            res.send(err);
        
        contact.name = req.body.name ? req.body.name : contact.name;
        contact.gender = req.body.gender ? req.body.gender: contact.gender;
        contact.email = req.body.email ? req.body.email : contact.email;
        contact.phone = req.body.phone ? req.body.phone : contact.phone;

        contact.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Contact Info updated',
                data: contact
            });
        });
    })
}

exports.delete = function (req, res) {
    Contact.remove({
        _id: req.params.contact_id
    }, function (err, contact) {
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'Contact deleted'
        });
    });
};