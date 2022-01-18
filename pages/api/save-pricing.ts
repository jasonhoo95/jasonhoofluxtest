import * as Joi from '@hapi/joi'
import fs from "fs";



// This is the JOI validation schema, you define
// all the validation logic in here, then run
// the validation during the request lifecycle.
// If you prefer to use your own way of validating the 
// incoming data, you can use it.
const schema = Joi.object({
  lite36:Joi.number().required(),
  standard36:Joi.number().required(),
  unlimited36:Joi.number().required(),
  lite24:Joi.number().required(),
  standard24:Joi.number().required(),
  unlimited24:Joi.number().required(),
  lite12:Joi.number().required(),
  standard12:Joi.number().required(),
  unlimited12:Joi.number().required(),
  litemtm:Joi.number().required(),
  standardmtm:Joi.number().required(),
  unlimitedmtm:Joi.number().required(),
})

export default async (req: import('next').NextApiRequest, res: import('next').NextApiResponse) => {
  try {
    // This will throw when the validation fails
    const data = await schema.validateAsync(req.body, {
      abortEarly: false
    })
    console.log(data)
    // Write the new matrix to public/pricing.json

    res.statusCode = 200
    const newdata = {
      datanow:'successful'
    }

    fs.writeFile('./public/pricing.json', JSON.stringify(req.body), 'utf8', function (err) {
      if (err) {
          return console.log(err);
      }
  
      console.log("The file was saved!");
  }); 

    res.json(newdata);
  } catch(e) {
    console.error(e,"error details");
    if(e.isJoi) {
      console.log("error joi",e.details);
      // Handle the validation error and return a proper response
      res.statusCode = 422
      // res.json(e.details);
      res.json({error:'Error must be in number form'})
      return
    }
    
    res.statusCode = 500
    res.json({ error: 'Unknown Error' })
  }
}