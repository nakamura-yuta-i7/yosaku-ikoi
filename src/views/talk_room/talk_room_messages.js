module.exports = class TalkRoomMessages {
	constructor() {
		
	}
	getTotal(talk_id, callback) {
		$.ajax({
			url: "/api/messages/total",
			data: {
				talk_id
			},
			dataType: "json",
			success: (data) => {
				if (data.error) return alert(data.error)
				callback(null, data.total)
			}
		})
	}
	getContent(limit, offset, callback) {
		this.messages = []
		this.$messages = []
		
		$.ajax({
			url: "/api/messages",
			data: {
				talk_id: global.talk_id,
				limit: limit,
				offset: offset,
			},
			method: "get",
			dataType: "json",
			success: (data) => {
				if ( data.error ) {
					return alert(data.error)
				}
				let TalkRoomMessage = require("./talk_room_message")
				data.messages.forEach( (m) => {
					let message = new TalkRoomMessage(m)
					this.messages.push( message )
					this.$messages.push( message.getContent() )
				})
				callback(null, this.$messages )
			}
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
