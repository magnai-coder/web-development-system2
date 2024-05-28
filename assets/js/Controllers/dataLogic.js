// Function to save code and redirect to the second page
async function handleSaveCode() {
    try {
        const mainCodeContainerRoute = window.parent.document.getElementById('render');
        if (!mainCodeContainerRoute) {
            throw new Error("Unable to find 'render' element in parent document");
        }
        
        const mainCodeContainer = mainCodeContainerRoute.contentWindow.document.getElementById('whitePage');
        if (!mainCodeContainer) {
            throw new Error("Unable to find 'whitePage' element in iframe document");
        }
        
        const test = mainCodeContainer.innerHTML;
       
        const response = await fetch("http://localhost:3030/save-code", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: test })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error Status: ${response.status}`);
        }
        
        const responseGet = await fetch("http://localhost:3030/save-code", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });
        if (!responseGet.ok) {
            throw new Error(`HTTP error Status: ${responseGet.status}`);
        }
        
        const fetchedData = await responseGet.json();
        console.log("Code saved successfully");
        const count = fetchedData.data.length;
        const pureData = fetchedData.data[count-1].text;
        // Store pureData in sessionStorage for retrieval on the next page
        sessionStorage.clear();
        sessionStorage.setItem('pureData', pureData);
        
        // Redirect to the second page
        window.location.href = "http://127.0.0.1:5500/client/pages/renderPage.html";
    } catch (error) {
        console.error("Fetch error:", error);
    }
}


async function handleSaveCode2() {
    try {
        
        const responseGet = await fetch("http://localhost:3030/save-code", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });
        if (!responseGet.ok) {
            throw new Error(`HTTP error Status: ${responseGet.status}`);
        }
        
        const fetchedData = await responseGet.json();
        console.log("Code saved successfully");
        const count = fetchedData.data.length;
        const pureData = fetchedData.data[count-1].text;
        // Store pureData in sessionStorage for retrieval on the next 
        sessionStorage.clear();
        sessionStorage.setItem('pureData', pureData);
        // Redirect to the second page
        window.location.href = "http://127.0.0.1:5500/client/pages/editorMainPage.html";
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

function updateSourceCode() {
    const sourceCode = document.querySelector(".addingSection");
    const pureData = sessionStorage.getItem('pureData');

    if (pureData) {
        sourceCode.insertAdjacentHTML('afterbegin', pureData);
    } else {
        console.error("No data found in sessionStorage.");
    }
}


document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector(".addingSection")) {
       
        updateSourceCode();
       
    }
});



const mainCodeContainerRoute = window.parent.document.getElementById('render');

async function backPage(){
    
    try {
        const pureData = sessionStorage.getItem('pureData');
        const mainCodeContainer = document.getElementById('whitePage');
        if(pureData){
                mainCodeContainer.insertAdjacentHTML('afterbegin', pureData)
                console.log(pureData)
        }
    }catch(error){
        console.error("No data found in sessionStorage.");
    }
}


document.addEventListener('DOMContentLoaded', () => {
    if (window.parent.document.getElementById('render')) {
        // This is the second page
        backPage();

    }
});
