const express=require('express');
const router=express.Router();
const Person=require('./../models/Person')
//POST to route to add person
router.post('/',async (req,res)=>
{
   try
   {
    const data=req.body;

    const newPerson=new Person(data);

    const response=await newPerson.save();
    console.log('data saved');
    res.status(200).json(response)
   }
   catch(err)
   {
    console.log(err);
    res.status(500).json({error:'Internal Server fail'});
   }
})

//get method for person
router.get('/',async(req,res)=>
{
    try
    {
        const data=await Person.find();
        console.log('Data fethced');
        res.status(200).json(data);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error:'internal server error'});
    }
})

//get method for specific worktype
router.get('/:workType',async(req,res)=>
{
    try
    {
        const workType=req.params.workType;

    if(workType=='chef' || workType=='waiter' || workType=='manager')
    {
        const response=await Person.find({work:workType});
        console.log('Data Fetched');
        res.status(200).json(response);
    }
    else
    {
        res.status(404).json({Error:'Invalid work Type'})
    }
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
    
})

router.put('/:id',async(req,res)=>
{
    try{
        const personId=req.params.id;//extract id from url
        const updatedPersonData=req.body;

        const response=await Person.findByIdAndUpdate(personId,updatedPersonData
            ,{
                new:true,
                runValidators:true,
            })

            if(!response)
            {
                return res.status(404).json({error:'Person not found'})
            }
            console.log("Data updated");
            res.status(200).json(response);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({Error:'Internal server error'})
    }
})
router.delete('/:id',async(req,res)=>
{
    try
    {
        const personId=req.params.id;

        const response=await Person.findByIdAndDelete(personId);

        if(!response)
        {
            return res.status(404).json({error:'Person not found'});

        }

        console.log('Person Deleted');
        res.status(200).json(response);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error:'person not found'})
    }
})

module.exports=router;