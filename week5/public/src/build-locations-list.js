

// This is an IIFE (Immediately Invoked Function Expression)
(async() => {
    const locations = await getLocations();
    console.log(locations);

    if (locations.length) {
        const div = document.getElementById('locations');
        const loadingDiv = div.childNodes[1];

        const ul = document.createElement('ul');

        // replace 'loading...' with list
        div.replaceChild(ul, loadingDiv); // order is important here

        // create the list
        locations.map((location) => {
            // building blocks
            const li = document.createElement('li');
            li.className = `location-item`;
            const block = document.createElement('div');
            block.className = 'location-item-block';

            // content
            const checkboxSpan = document.createElement('span');
            const checkbox = document.createElement('input');
            checkbox.setAttribute('type', 'checkbox');
            //checkboxSpan.className('location-checkbox');
            checkboxSpan.appendChild(checkbox);

            const nameSpan = document.createElement('span');
            //nameSpan.className = 'location-name';
            nameSpan.innerText = location.name;

            const dateSpan = document.createElement('span');
            dateSpan.className = 'location-date';
            dateSpan.innerText = location.createdAt;

            block.appendChild(checkboxSpan);
            block.appendChild(nameSpan);
            block.appendChild(dateSpan);

            li.appendChild(block);
            ul.appendChild(li);
        });
    }
})();