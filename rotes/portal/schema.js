const Joi = require('joi')

const portalSchema = (query) => {
    return Joi.object({
        user: Joi.string().required(),
        kirish: Joi.number().required(),
        portal_raqami: Joi.string().required(),
        kelib_tushgan_sana: Joi.string().required(),
        ijro_muddati: Joi.string().required(),
        fio: Joi.string().required(),
        tumanlar: Joi.string().required(),
        tizimlar: Joi.string().required(),
        ijro_etilgan_sana: Joi.string(),
        qanoatlantirilgan: Joi.boolean().default(false),
        tushuntirilgan: Joi.boolean().default(false),
        rad_etilgan: Joi.boolean().default(false),
        izoh: Joi.string()
    }).validate(query);
}

module.exports = { portalSchema: portalSchema };