module.exports = new class {
	constructor() {
		this.$html = $(`
			<select name="notification_setting_interval">
				<option value="1min">1分以内</option>
				<option value="15min">15分以内</option>
				<option value="1hour">1時間以内</option>
				<option value="6hour">6時間以内</option>
				<option value="24hour">24時間以内</option>
			</select>
		`)
		if ( ! global.Me.id ) {
			this.$html = $(`<div class="color-orange">※メンバーのみが設定できる項目です</div>`)
			return false
		}
		let sec = global.Me.setting.notification.interval
		// this.$html.find("[value="+sec+"]").attr("selected", true)
		this.$html.val(sec)
	}
	getContent() {
		return this.$html
	}
}
