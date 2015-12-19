module.exports = class News {
	constructor() {
		this.$news_area = null
		this.setup()
		this.load()
	}
	getHTML() {
		return this.$news_area.getHTML()
	}
	setup() {
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
	load() {
		let rows = [
			1,2,3,4,5,6,7,8,9,10
		]
		rows.forEach( (data)=>{
			let $tr = getTr(data)
			this.$news_area.find(".news").append( $tr )
		} )
		
		function getTr(row) {
			let datetime = `2015-12-19 11:54`
			let text = `新規メンバーが加わりました`
			let $tr = $(`
				<tr>
					<td>${datetime}</td>
					<td>${text}</td>
				</tr>
			`)
			return $tr
		}
	}
}
