const mailService = require("../service/mail-service");

async function testMail(req, res, next) {
  try {

    await mailService.sendActivationMail("ggvlasov@gmail.com", `activationLink`);

    return res.json({ok:"ok"});
  } catch (e) {
    next(e);
  }


}

module.exports = {testMail};
