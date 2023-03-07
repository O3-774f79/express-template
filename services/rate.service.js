const axios = require('axios')

const methods = {
    async callToSuperichForRate(req, res) {
        const new_instance = axios.create({
            baseURL: 'https://www.superrichthailand.com/web/api/v1',
            timeout: 60000,
            headers: {
              'Accept': 'application/json',
              'Authorization': 'Basic c3VwZXJyaWNoVGg6aFRoY2lycmVwdXM='
            }
          })
      try {
       const resp = await new_instance({
            method: 'get',
            url: '/rates'
          })
        return resp.data.data.exchangeRate
      } catch (error) {
       throw error
      }
    },
    async mappingDataRate(req, res) {
      try {
       const resp = await methods.callToSuperichForRate(req,res)
       let dataArr = []
        await resp.map(i=>{
        return i.rate.map(k=>{
            dataArr.push({...k,"countryName":i.countryName,"xml_currency":i.cUnit,"xml_c_date":k.dateTime,"xml_c_buying":k.cBuying,"xml_c_selling":k.cSelling})
        })
       })
       return [dataArr]
      } catch (error) {
       throw error
      }
    }
  }

module.exports = { ...methods }