const defaultPricing = {
  "36months" : {
      "lite" : 0,
      "standard" : 0,
      "unlimited" : 0
  },
  "24months" : {
      "lite" : 0,
      "standard" : 0,
      "unlimited" : 0
  },
  "12months" : {
      "lite" : 0,
      "standard" : 0,
      "unlimited" : 0
  },
  "mtm" : {
      "lite" : 0,
      "standard" : 0,
      "unlimited" : 0
  }
}

export default (_: import('next').NextApiRequest, res: import('next').NextApiResponse) => {
  const pricing = require('../../public/pricing.json') || defaultPricing

  res.statusCode = 200
  res.json(pricing)
}
