require("./news.scss")
module.exports = new class News {
	constructor() {
		this.$news_area = $(`
			<div class="news-area">
				<h2>ニュース</h2>
				<div class="pad5-side">
					<table class="news mdl-data-table mdl-shadow--2dp">
					</table>
				</div>
			</div>
		`)
	}
	getContent(callback) {
		
		$.ajax({
			url: "/api/news",
			dataType: "json",
			success: (rows) => {
				
				this.$news_area.find(".news").html(null)
				
				rows.forEach( (data)=>{
					let $tr = getTr(data)
					this.$news_area.find(".news").append( $tr )
				} )
				
				return callback( this.$news_area )
				
				function getTr(row) {
					let datetime = row.created
					let text = row.message
					let $tr = $(`
						<tr>
							<td class="datetime">${datetime}</td>
							<td class="text">${text}</td>
						</tr>
					`)
					return $tr
				}
			}
		})
		
	}
}
