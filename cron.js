async function checkIfGoogleWorks() {
	const url = "https://www.google.com";
	const placeholderApiRes = await rp(url);
}

setInterval(checkIfGoogleWorks, 300000);