const mongoose = require('mongoose');

const portalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    kirish: {
      type: Number,
      required: true,
    },
    portal_raqami: {
      type: String,
      required: true,
      unique: true
    },
    kelib_tushgan_sana: {
      type: String,
      required: true,
    },
    ijro_muddati: {
      type: String,
      required: true,
    },
    fio: {
      type: String,
      required: true,
    },
    tumanlar: {
      type: String,
      required: true
    },
    tizimlar: {
      type: String,
      required: true
    },
    ijro_etilgan_sana: {
      type: String,
    },
    qanoatlantirilgan: {
      type: Boolean
    },
    tushuntirilgan: {
      type: Boolean
    },
    rad_etilgan: {
      type: Boolean
    },
    izoh: {
      type: String
    },
  },
  {
    timestamps: true,
  }
)

const Portal = mongoose.model('Portal', portalSchema)

module.exports = Portal;