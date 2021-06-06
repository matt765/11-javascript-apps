
getUsers.addEventListener('click', getUsersData);

function getUsersData() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status code:' + response.status);
                    return;
                }

                response.json().then(function (data) {
                    displayUsers(data);
                    
                });
               
            }
        )
        .catch(function (err) {
            console.log('Fetch Error', err);
        });
        setTimeout(() => dragAndDrop(), 500 );
}





function displayUsers(data) {

    document.getElementById('usersTable').innerHTML = "";
    let table = document.getElementById("usersTable");

    let row = table.insertRow(0);
    row.id = "firstRow";
    let id = row.insertCell(0);
    let name = row.insertCell(1);
    let username = row.insertCell(2);
    let email = row.insertCell(3);
    let company = row.insertCell(4);

    id.innerHTML = "Number";
    name.innerHTML = "Name";
    username.innerHTML = "Username";
    email.innerHTML = "E-mail";
    company.innerHTML = "Company name";

    id.addEventListener('click', () => sortTable(0));
    name.addEventListener('click', () => sortTable(1));
    username.addEventListener('click', () => sortTable(2));
    email.addEventListener('click', () => sortTable(3));
    company.addEventListener('click', () => sortTable(4));


    for (let i = 0; i < 10; i++) {
        let usersArray = data;
        let row = table.insertRow(-1);

        let id = row.insertCell(0);
        let name = row.insertCell(1);
        let username = row.insertCell(2);
        let email = row.insertCell(3);
        let company = row.insertCell(4);

        id.innerHTML = usersArray[i].id;
        name.innerHTML = usersArray[i].name;
        username.innerHTML = usersArray[i].username;
        email.innerHTML = usersArray[i].email;
        company.innerHTML = usersArray[i].company.name;
    }



}




function sortTable(n) {
    let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("usersTable");
    switching = true;

    dir = "asc";

    while (switching) {

        switching = false;
        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++) {

            shouldSwitch = false;

            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];

            if (n == 0) {
                if (dir == "asc") {
                    if (parseInt(x.innerHTML) > parseInt(y.innerHTML)) {

                        shouldSwitch = true;
                        break;
                    }
                } else if (dir == "desc") {
                    if (parseInt(x.innerHTML) < parseInt(y.innerHTML)) {

                        shouldSwitch = true;
                        break;
                    }
                }
            }
            else if (dir == "asc") {
                if (x.innerHTML.toUpperCase() > y.innerHTML.toUpperCase()) {

                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toUpperCase() < y.innerHTML.toUpperCase()) {

                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {

            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;

            switchcount++;
        } else {

            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}



function dragAndDrop() {
    console.log("wejszlo");
    const table = document.getElementById('usersTable');

    let draggingEle;
    let draggingRowIndex;
    let placeholder;
    let list;
    let isDraggingStarted = false;

    // The current position of mouse relative to the dragging element
    let x = 0;
    let y = 0;

    // Swap two nodes
    const swap = function (nodeA, nodeB) {
        const parentA = nodeA.parentNode;
        const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;

        // Move `nodeA` to before the `nodeB`
        nodeB.parentNode.insertBefore(nodeA, nodeB);

        // Move `nodeB` to before the sibling of `nodeA`
        parentA.insertBefore(nodeB, siblingA);
    };

    // Check if `nodeA` is above `nodeB`
    const isAbove = function (nodeA, nodeB) {
        // Get the bounding rectangle of nodes
        const rectA = nodeA.getBoundingClientRect();
        const rectB = nodeB.getBoundingClientRect();

        return (rectA.top + rectA.height / 2 < rectB.top + rectB.height / 2);
    };

    const cloneTable = function () {
        const rect = table.getBoundingClientRect();
        const width = parseInt(window.getComputedStyle(table).width);

        list = document.createElement('div');
        list.classList.add('clone-list');
        list.style.width = `${width}px`;
       
        table.parentNode.insertBefore(list, table);

        // Hide the original table
        table.style.visibility = 'hidden';
        table.style.position = 'absolute';

        table.querySelectorAll('tr').forEach(function (row) {
            // Create a new table from given row
            const item = document.createElement('div');
            item.classList.add('draggable');

            const newTable = document.createElement('table');
            newTable.setAttribute('class', 'clone-table');
            newTable.style.width = `${width + 2}px`;

            const newRow = document.createElement('tr');
            const cells = [].slice.call(row.children);
            cells.forEach(function (cell) {
                const newCell = cell.cloneNode(true);
                newCell.style.width = `${parseInt(window.getComputedStyle(cell).width)}px`;
                newRow.appendChild(newCell);
            });

            newTable.appendChild(newRow);
            item.appendChild(newTable);
            list.appendChild(item);
        });
    };

    const mouseDownHandler = function (e) {
        // Get the original row
        const originalRow = e.target.parentNode;
        draggingRowIndex = [].slice.call(table.querySelectorAll('tr')).indexOf(originalRow);

        // Determine the mouse position
        x = e.clientX;
        y = e.clientY;

        // Attach the listeners to `document`
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    };

    const mouseMoveHandler = function (e) {
        if (!isDraggingStarted) {
            isDraggingStarted = true;

            cloneTable();

            draggingEle = [].slice.call(list.children)[draggingRowIndex];
            draggingEle.classList.add('dragging');

            // Let the placeholder take the height of dragging element
            // So the next element won't move up
            placeholder = document.createElement('div');
            placeholder.classList.add('placeholder');
            draggingEle.parentNode.insertBefore(placeholder, draggingEle.nextSibling);
            placeholder.style.height = `${draggingEle.offsetHeight}px`;
        }

        // Set position for dragging element
        draggingEle.style.position = 'absolute';
        draggingEle.style.top = `${draggingEle.offsetTop + e.clientY - y}px`;
        draggingEle.style.left = `${draggingEle.offsetLeft + e.clientX - x}px`;

        // Reassign the position of mouse
        x = e.clientX;
        y = e.clientY;

        // The current order
        // prevEle
        // draggingEle
        // placeholder
        // nextEle
        const prevEle = draggingEle.previousElementSibling;
        const nextEle = placeholder.nextElementSibling;

        // The dragging element is above the previous element
        // User moves the dragging element to the top
        // We don't allow to drop above the header 
        // (which doesn't have `previousElementSibling`)
        if (prevEle && prevEle.previousElementSibling && isAbove(draggingEle, prevEle)) {
            // The current order    -> The new order
            // prevEle              -> placeholder
            // draggingEle          -> draggingEle
            // placeholder          -> prevEle
            swap(placeholder, draggingEle);
            swap(placeholder, prevEle);
            return;
        }

        // The dragging element is below the next element
        // User moves the dragging element to the bottom
        if (nextEle && isAbove(nextEle, draggingEle)) {
            // The current order    -> The new order
            // draggingEle          -> nextEle
            // placeholder          -> placeholder
            // nextEle              -> draggingEle
            swap(nextEle, placeholder);
            swap(nextEle, draggingEle);
        }
    };

    const mouseUpHandler = function () {
        // Remove the placeholder
        placeholder && placeholder.parentNode.removeChild(placeholder);

        draggingEle.classList.remove('dragging');
        draggingEle.style.removeProperty('top');
        draggingEle.style.removeProperty('left');
        draggingEle.style.removeProperty('position');

        // Get the end index
        const endRowIndex = [].slice.call(list.children).indexOf(draggingEle);

        isDraggingStarted = false;

        // Remove the `list` element
         list.parentNode.removeChild(list);

        // Move the dragged row to `endRowIndex`
        let rows = [].slice.call(table.querySelectorAll('tr'));
        draggingRowIndex > endRowIndex
            ? rows[endRowIndex].parentNode.insertBefore(rows[draggingRowIndex], rows[endRowIndex])
            : rows[endRowIndex].parentNode.insertBefore(rows[draggingRowIndex], rows[endRowIndex].nextSibling);

        // Bring back the table
        table.style.removeProperty('visibility');
        table.style.removeProperty('position');
        // Remove the handlers of `mousemove` and `mouseup`
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    };

    table.querySelectorAll('tr').forEach(function (row, index) {
        // Ignore the header
        // We don't want user to change the order of header
        if (index === 0) {
            return;
        }

        const firstCell = row;
        firstCell.classList.add('draggable');
        firstCell.addEventListener('mousedown', mouseDownHandler);
    });
}