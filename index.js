// Client-side code
async function prediction() {
    const options = [];
    const radioInputs = document.querySelectorAll('input[type="radio"]:checked');
    radioInputs.forEach(input => {
        options.push(input.value);
    });
    const age = document.getElementById("ageid").value;
    options.splice(1, 0, age);
    console.log(options);
    try {
        const response = await fetch('/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ options: options }) // Sending options as a JSON object
        });

        if (!response.ok) {
            throw new Error('Failed to submit data');
        }

        const result = await response.json();
        console.log('Result:', result);
        console.log(result);
		if(result.result[0] == 1){
            alert("Ooops!!!\nLung cancer is detected")
        }
        else{
            alert("Hurray!!!!\nLung cancer is not detected")
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}
document.getElementById("predictid").addEventListener("click", prediction);

