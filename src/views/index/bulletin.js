require("./bulletin.scss")

module.exports = class {
	getContent(callback) {
		this.$html = $(`
			<iframe src="http://yosaku.info/turing/2008-7/IKOI/" height="100%" width="100%">
			 この部分は iframe 対応のブラウザで見てください。
			</iframe>
		`)
		callback(this.$html)
	}
}
