module.exports = class TalkRoomMessages {
	constructor() {
		
	}
	loadMessages(callback) {
		$.ajax({
			url: "/api/messages",
			data: {
				talk_id: global.talk_id,
			},
			method: "get",
			dataType: "json",
			success: function(data) {
				if ( data.error ) {
					return alert(data.error)
				}
				callback(data.err, data.messages)
			}
		})
	}
	getContent(callback) {
		this.messages = []
		this.$messages = []
		
		this.loadMessages( (err, messages) => {
			
			let TalkRoomMessage = require("./talk_room_message")
			messages.forEach( (m) => {
				let message = new TalkRoomMessage(m)
				this.messages.push( message )
				this.$messages.push( message.getContent() )
			})
			callback(null, this.$messages )
		})
	}
	poolingNewMessage() {
		let talk_id = global.talk_id
		let datetime = moment().format("YYYY-MM-DD HH:mm:ss")
		
		setInterval(function() {
			$.ajax({
				url: "/api/messages/search",
				data: {
					talk_id,
					datetime,
				},
				dataType: "json",
				success: function(data) {
					if (data.error) return console.log( data.error );
					
					if ( data.messages.length == 0 ) return false;
					
					let TalkRoomMessage = require("./talk_room_message")
					data.messages.forEach( (m) => {
						let message = new TalkRoomMessage(m)
						global.TalkRoom.layout.addMessage( message.getContent() )
					})
					datetime = moment().format("YYYY-MM-DD HH:mm:ss")
				},
			})
		}, global.POOLING_INTERVAL )
	}
}
