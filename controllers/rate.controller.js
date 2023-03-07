const Service = require('../services/rate.service')

const methods = {
  async onGetAll(req, res) {
    try {
      let result = await Service.mappingDataRate(req)
      res.success(result)
    } catch (error) {
      res.error(error)
    }
  }
}
module.exports = { ...methods }