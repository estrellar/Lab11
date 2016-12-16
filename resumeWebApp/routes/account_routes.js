  var express = require ('express');
var router = express.Router();
var account_dal = require('../model/account_dal');

//View all accounts
router.get('/all', function(req,res){
    account_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else{
            res.render('account/accountViewAll', {'result':result});
        }
    });
});


//View the account for the given id
router.get('/', function(req, res){
    if(req.query.account_id == null) {
        res.send('account_id is null bruh');
    }
    else{
        account_dal.getById(req.query.account_id,function(err, result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('account/accountViewById', {'result': result});
            }
        });
    }
});

router.get('/add', function(req, res){
    account_dal.getAll(function(err, result){
        if(err){
            res.send(err);
        }
        else{
            res.render('account/accountAdd', {'result':result});
        }
    });
});

router.get('/insert', function(req, res){
    if(req.query.email == null){
        res.send('emil was not provided');
    }
    else if(req.query.first_name == null){
        res.send('first_name was not provided');
    }
    else if(req.query.last_name == null){
        res.send('last_name was not provided');
    }
    else{
        account_dal.insert(req.query, function(err, result){
            if(err){
                res.send(err);
            }
            else{
                res.redirect(302, '/account/all');
            }
        });
    }
});

router.get('/delete', function(req, res){
    if(req.query.account_id == null){
        res.send('account_id was null');
    }
    else{
        account_dal.delete(req.query.account_id, function(err, result){
            if(err){
                res.send(err);
            }
            else{
                res.redirect(302, '/account/all');
            }
        });
    }
});

module.exports = router;