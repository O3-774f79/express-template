const axios = require('axios')
const sql = require("mssql")
const mariadb = require("mariadb")
const methods = {
    async callToSuperichForRate(req, res) {

      // const pool = mariadb.createPool({
      //   host:"10.138.1.219",
      //   user:"SRTFX",
      //   password:"SRTFX@2020",
      //   connectionLimit:5
      // })
      // pool.getConnection()
      // .then(conn =>{
      //   conn.query("SELECT * FROM SRTFX.SRTFX_CONFIG")
      // }).then(row=>{
      //   console.log(row)
      // }).catch(e=>{
      //   console.log(e)
      // })
      // sql.connect({
      //   user:"minna",
      //   password:"Minna@srtDB01",
      //   server:"10.254.45.25",
      //   database: "SRTHPRD"
      // },err=>{
      //   if(err) console.log(err)
      // })
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
      function converBranchNoToBranchRate(bn){
        let idBno = bn.id
        //switch rate
        if(idBno == "H01"){
          return 5
        }else if(idBno == "B02"){
          return 2
        }else if(idBno=="K13"||idBno== "K12"||idBno=="K08" ||idBno== "K06"||idBno=="K122"||idBno=="K03"||idBno=="K11"){
          return 3
        }else if(idBno == "K14"||idBno == "K10"|| idBno =="K15"){
          return 99
        }
      }
      try {
       const resp = await methods.callToSuperichForRate(req,res)
       let dataArr = []
       let rate = converBranchNoToBranchRate(req.params)
        await resp.map(i=>{
        return i.rate.map(k=>{
          if(rate == 99){
            dataArr.push({...k,"countryName":i.countryName,"xml_currency":i.cUnit,"xml_c_date":k.dateTime,"xml_c_buying":"0.00","xml_c_selling":"0.00"})
          }else{
            let buyRate = "cBuy"+(rate-1).toString()
            let sellRate = "cSell"+(rate-1).toString()
            dataArr.push({...k,"countryName":i.countryName,"xml_currency":i.cUnit,"xml_c_date":k.dateTime,"xml_c_buying":k[buyRate],"xml_c_selling":k[sellRate]})
          }        
        })
       })
       return [dataArr]
      } catch (error) {
       throw error
      }
    }
  }

module.exports = { ...methods }