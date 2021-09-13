/* global MsaMgr, MenuItem */

const highlighted = document.getElementById('highlighted-msa');
const map = document.getElementById('map');

class Msa {
	constructor(json) {
		this.id = json.id;
		this.code = json.code;
		this.name = json.name;
		this.states = json.states;
		this.zone = json.zone;
		this.pop = json.pop;
		this.wage = json.wage;
		this.unemp = json.unemp;
		this.heat = json.heat;
		this.cold = json.cold;
		this.precip = json.precip;
		this.snow = json.snow;
		this.aqi = json.aqi;
		this.initBindingsAndEventListeners();
	}

	initBindingsAndEventListeners() {
		this.mapLoc = Msa.map.getElementById(this.code);
	}

	msaUseFilter(fItem) {
		if (fItem.hiLoVals.length === 0) {
			return true;
		}
		if (fItem.hiLoVals.length > 1) {
			return (this[fItem.msaAttr] >= fItem.hiLoVals[0]) && (this[fItem.msaAttr] <= fItem.hiLoVals[1]);
		}
		return this.snow === fItem.hiLoVals[0];
	}

	createLi() {
		const li = document.createElement('li');
		const btn = document.createElement('button');
		btn.classList.add('msa-btn', 'blue');
		btn.id = `msa-${this.code}`;
		btn.innerHTML = `<b>${this.name}</b> (${this.states})`;
		li.appendChild(btn);
		this.btnMouseover(btn);
		btn.addEventListener('click', () => MenuItem.all[0].show(this));
		return li;
	}

	btnMouseover(msaBtn) {
		msaBtn.addEventListener('mouseover', () => {
			Msa.highlighted.appendChild(this.mapLoc);
		});
		msaBtn.addEventListener('mouseout', () => {
			MsaMgr.chosen.appendChild(this.mapLoc);
		});
	}

	addToMap() {
		if (this.mapLoc) {
			MsaMgr.chosen.appendChild(this.mapLoc);
		} else {
			console.log(`Incorrect MSA code ${this.code} for ${this.name}`);
		}
		this.mapLocMouseover();
	}

	mapLocMouseover() {
		const id = `msa-${this.code}`;
		const msaBtn = document.getElementById(id);
		this.mapLoc.addEventListener('mouseover', () => {
			msaBtn.classList.add('highlighted');
		});
		this.mapLoc.addEventListener('mouseout', () => {
			msaBtn.classList.remove('highlighted');
		});
	}

	timeZone() {
		const { zone } = this;
		switch (zone) {
			case 'EST':
				return 'Eastern Standard Time';
			case 'CST':
				return 'Central Standard Time';
			case 'MST':
				return 'Mountain Standard Time';
			case 'PST':
				return 'Pacific Standard Time';
			case 'AST':
				return 'Alaska Standard Time';
			case 'HAT':
				return 'Hawaii-Aleutian Time';
			default:
				break;
		}
	}
}
