async function getQuote() {
    const mood = document.getElementById('moodInput').value;
  
    // Send POST request to the backend
    const res = await fetch('/api/quote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mood }),
    });
  
    // Wait for the response and parse it
    const data = await res.json();
  
    // Display the quote or an error message
    document.getElementById('quoteDisplay').textContent = data.quote || 'Oops—try again!';
  }
  