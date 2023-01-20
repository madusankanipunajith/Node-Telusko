const express = require('express');
const Alien = require('../models/alien');
const router = express.Router();

router.get('/', async (req, res)=>{
   try {
        const aliens = await Alien.find();
        res.status(200).json(aliens);
   } catch (error) {
        console.log(error);
   }
})

router.post('/', async (req, res)=>{
    try {
        const {name, tech, sub} = req.body;
        const alien = new Alien({
            name,
            tech,
            sub
        })
        const result = await alien.save();
        res.status(201).json(result);
    } catch (error) {
        console.log(error);
    }
})

router.get('/:id', async (req, res)=>{
    try {
        const id = req.params.id;
        const alien = await Alien.findById({_id: id});
        if (alien) {
            return res.status(200).json(alien);    
        }

        return res.status(404).json({"msg": "User is not found"})
        
    } catch (error) {
        console.log(error);
    }
})

router.put('/:id', async (req, res)=>{
    try {
        const _id = req.params.id;
        const {name, tech, sub} = req.body;

        const alien = await Alien.findById({_id});
        if (alien) {
            alien.name = name;
            alien.tech = tech;
            alien.sub = sub;

            const result = await alien.save();
            return res.status(202).json(result);    
        }

        return res.status(404).json({"msg": "User is not found"});
        
    } catch (error) {
        console.log(error);
    }
})

router.delete('/:id', async (req, res)=>{
    try {
        const _id = req.params.id;
        const alien = await Alien.findByIdAndDelete({_id});
        if (alien) {
            return res.status(203).json(alien);
        }
        
        return res.status(404).json({"msg": "User is not found"});
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;