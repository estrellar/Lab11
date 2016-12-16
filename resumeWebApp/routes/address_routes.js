var express = require('express');
var router = express.Router();
var address_dal = require ('../model/address_dal');

router.get('/all', function(req, res){
    address_dal.getAll(function(err, result){
        if(err){
            res.send(err);
        }
        else{
            res.render('address/addressViewAll', {'result':result});
        }
    });
});


router.get('/', function(req, res){
    if(req.query.address_id == null){
        res.send('address_id is null');
    }
    else{
        address_dal.getById(req.query.address_id, function(err, result){
            if(err){
                res.send(err);
            }
            else{
                res.render('address/addressViewById', {'result':result});
            }
        });
    }
});

router.get('/add', function(req, res){
    address_dal.getAll(function(err, result){
        if(err){
            res.send(err);
        }
        else{
            res.render('address/addressAdd', {'result':result});
        }
    });
});

router.get('/insert', function(req, res){
    if(req.query.street == null){
        res.send('street must be provided');
    }
    else if(req.query.zip_code == null){
        res.send('zip_code must be provided');
    }
    else{
        address_dal.insert(req.query, function(err, result){
            if(err){
                res.send(err);
            }
            else{
                res.redirect(302, '/address/all');
            }
        });
    }
});

router.get('/delete', function(req, res){
    if(req.query.address_id == null){
        res.send('address_id is null');
    }
    else {
        address_dal.delete(req.query.address_id, function (err, result) {
            if (err) {
                res.send(err);
            }
            else {
                res.redirect(302, '/address/all');
            }
        });
    }
});


module.exports = router;