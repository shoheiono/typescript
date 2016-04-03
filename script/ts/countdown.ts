/**
 * countdown
 */
class CountDown {
	static baseDate:Date = new Date();
	static floor:(value:number) => number = Math.floor;
	static PERMIL:number = 1000;
	static SIXTY:number = 60;

	/**
	 * convert to a two-digit
	 */
	static convertToDoubleString = (value:number):string => {
		let doubleString = `${value}`;
		if(doubleString.length < 2) {
			doubleString = `0${doubleString}`;
		}
		return doubleString;
	}

	/**
	 * get milliseconds
	 */
	static getMilliseconds = (milliSecond:number):number => {
		return milliSecond % CountDown.PERMIL;
	}

	/**
	 * get seconds
	 */
	static getSeconds = (milliSecond:number):number => {
		return CountDown.floor(milliSecond / CountDown.PERMIL) % CountDown.SIXTY;
	}

	/**
	 * get minutes
	 */
	static getMinutes = (milliSecond:number):number => {
		return CountDown.floor(milliSecond / (CountDown.PERMIL * CountDown.SIXTY)) % CountDown.SIXTY;
	}

	/**
	 * get hours
	 */
	static getHours = (milliSecond:number):number => {
		return CountDown.floor(milliSecond / (CountDown.PERMIL * CountDown.SIXTY * CountDown.SIXTY)) % CountDown.SIXTY;
	}
	
	private _diffMillisecond:number;
	private _setting: CountDown.ISetting;
	private _option: CountDown.IOption = <CountDown.IOption>{};
	private _intervalId:number = 0;
	private _updateCallback: (remainMillisecond:number) => void;
	private _endCallback: () => void;

	constructor(setting:CountDown.ISetting, option?:CountDown.IOption) {
		this._setting = setting;
		this._diffMillisecond = this._setting.startDate.getTime() - CountDown.baseDate.getTime();
		this._option.isAutoStart = option.isAutoStart || true;
		this._option.updateMillisecond = option.updateMillisecond || 1;
		if(this._option.isAutoStart) {
			this.start();
		}
	}

	/**
	 * start countdown
	 */
	public start() {
		this.update();
		this._intervalId = setInterval(() => {
			this.update();
		}, this._option.updateMillisecond);
	}

	/**
	 * stop countdown
	 */
	public stop() {
		clearInterval(this._intervalId);
	}

	/**
	 * set update calback
	 */
	public setUpdateCallback(updateCallback:(remainMillisecond:number) => void) {
		this._updateCallback = updateCallback;
	}

	/**
	 * set end calback
	 */
	public setEndCallback(endCallback:() => void) {
		this._endCallback = endCallback;
	}

	/**
	 * update timer
	 */
	private update(){
		const remainMillisecond = this._setting.endDate.getTime() - (new Date().getTime() + this._diffMillisecond);
		if(remainMillisecond > 0) {
			if(this._updateCallback) {
				this._updateCallback(remainMillisecond);
			}
		} else {
			this.stop();
			if(this._endCallback) {
				this._endCallback();
			}
		}
	}
}

module CountDown {
	/**
	 * setting
	 */
	export interface ISetting {
		startDate:Date;
		endDate:Date;
	}
	/**
	 * option
	 */
	export interface IOption {
		isAutoStart: boolean;
		updateMillisecond: number;
	}
}
