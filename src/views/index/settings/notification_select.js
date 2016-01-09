module.exports = new class {
	constructor() {
		this.$html = $(`
			<select name="notification_setting_interval_sec">
				<option value="60">1分以内</option>
				<option value="180">15分以内</option>
				<option value="3600">1時間以内</option>
				<option value="10800">3時間以内</option>
				<option value="21600">6時間以内</option>
				<option value="43200">12時間以内</option>
				<option value="86400">24時間以内</option>
			</select>
		`)
		if ( ! global.Me.id ) {
			this.$html = $(`<div class="color-orange">※メンバーのみが設定できる項目です</div>`)
			return false
		}
		let sec = global.Me.setting.notification.interval_sec
		// this.$html.find("[value="+sec+"]").attr("selected", true)
		this.$html.val(sec)
	}
	getContent() {
		return this.$html
	}
}
