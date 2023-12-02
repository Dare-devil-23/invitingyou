const mongoose = require('mongoose');

const rsvpInvitationSchema = new mongoose.Schema({
  hostName: {
    type: String,
    required: true
  },
  eventDate: {
    type: Date,
    required: true
  },
  eventType: {
    type: String,
    required: true
  },
  eventLocation: {
    type: String,
    required: true
  },
  invitedGuests: [{
    guestName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    isAttending: {
      type: Boolean,
      default: false
    }
  }]
});

const RsvpInvitation = mongoose.model('RsvpInvitation', rsvpInvitationSchema);

module.exports = RsvpInvitation;
