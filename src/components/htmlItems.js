class HtmlItems {
	static get menuAbout() {
		return 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat eaque accusamus reiciendis nobis corrupti quidem dolorem, hic ducimus, minus, tenetur cupiditate tempore laudantium amet perspiciatis repellendus iusto vitae! Perferendis, harum. Quaerat, qui incidunt ex error deleniti repudiandae ducimus nulla perferendis libero laborum, consequuntur vitae doloribus eum veniam aperiam aut minima asperiores sunt.';
	}

	static get menuAccount() {
		return `
			<div id="menu-account">
				<h3>Log In / Sign Up to save the lists and maps you create!</h3>
				<form id="log-or-sign-in" action="">
					<div class="menu-inputs-row">
						<div class="col-33">
							<label for="username">Username</label>
						</div>
						<div class="col-48">
							<input type="text" id="username" name="username">
						</div>
					</div>
					<div class="menu-inputs-row">
						<div class="col-33">
							<label for="password">Password</label>
						</div>
						<div class="col-48">
							<input type="text" id="password" name="password">
						</div>
					</div>
					<div id="submit-row">
						<button type="button" id="login" class="menu-submit-btn green">Log In</button>
						<button type="button" id="signup" class="menu-submit-btn green">Sign Up</button>
					</div>
				</form>
			</div>`;
	}

	static get menuMyAccount() {
		return `
			<div id="menu-account">
				<div id="menu-lists"></div>
				<div id="submit-row">
					<button type="button" id="logout" class="menu-submit-btn green">Log Out</button>
				</div>
			</div>`;
	}

	static menuWelcome(username) {
		return `
			<h3>Welcome ${username}!</h3>
			<p>You can access your saved lists and maps from here after you save them.</p>`;
	}

	static get menuSaveForm() {
		return `
			<div id="menu-account">
				<h3>Provide a name for this map and list</h3>
				<form id="add-name" action="">
					<div class="menu-inputs-row">
						<div class="col-20">
							<label for="name">Name</label>
						</div>
						<div class="col-60">
							<input type="text" id="name" name="name">
						</div>
					</div>
					<div id="submit-row">
						<button type="button" id="save-with-name" class="menu-submit-btn green">Save</button>
					</div>
				</form>
			</div>`;
	}

	static get listNoMsas() {
		return `
			<div id="no-msas" class="list-msg">
				<h1>No Matches</h1>
				<h2>None of the 100 most populated metropolitan areas in the USA meet the criteria you selected.</h2>
			</div>`;
	}

	static msaDetails(msa) {
		return `
			<div id="msa-details">
				<h3>${msa.name}</h3>
				<h4>${msa.states}</h4>
				<p><b>Time Zone: </b>${msa.timeZone()}</p>
				<p><b>Population: </b>${msa.pop.toLocaleString('en', { useGrouping: true })}</p>
				<p><b>Median Hourly Wage: </b>$${msa.wage}</p>
				<p><b>Unemployment Rate: </b>${msa.unemp}%</p>
				<p><b>Highest Summer Heat Index: </b>${msa.heat}</p>
				<p><b>Coldest Winter Temperature: </b>${msa.cold}&deg; F</p>
				<p><b>Annual Precipitation: </b>${msa.precip} inches</p>
				<p><b>Annual Snowfall: </b>${msa.snow} inches</p>
				<p><b>Air Quality Index: </b>${msa.aqi}% Good Days</p>
				<h6>(Climate values represent what's normal for this metro area. Other values are the annual amounts from the latest available year as of Jan 2021.) </h6>
			</div>`;
	}
}
