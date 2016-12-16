var express = require('express');
var router = express.Router();
var company_dal = require('../model/company_dal');

//View All companies
router.get('/all', function(req, res){
    company_dal.getAll(function(err, result){
        if(err){
            res.send(err);
        }
        else{
            res.render('company/companyViewAll', {'result':result});
        }
    });
});

//View the company  for a given Id
router.get('/', function(req, res){
    if(req.query.company_id == null){
        res.send('company_id is null');
    }
    else{
        company_dal.getById(req.query.company_id, function(err, result){
            if(err){
                res.send(err);
            }
            else{
                res.render('company/companyViewById', {'result': result});
            }
        });
    }
});

router.get('/add', function(req, res){
    company_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else{
            res.render('company/companyAdd', {'result':result});
        }
    });
});

router.get('/insert', function(req, res){
    if(req.query.company_name == null){
        res.send('company_name was not provided');
    }
    else{
        company_dal.insert(req.query, function(err, result){
            if(err){
                res.send(err);
            }
            else{
                res.redirect(302, '/company/all');
            }
        });
    }
});

router.get('/delete', function(req, res){
    if(req.query.company_id == null){
        res.send('company_id cannot be null');
    }
    else{
        company_dal.delete(req.query.company_id, function(err, result){
            if(err){
                res.send(err);
            }
            else{
                res.redirect(302, '/company/all');
            }
        });
    }
});


module.exports = router;