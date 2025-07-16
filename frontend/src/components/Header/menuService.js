
const API_URL = process.env.REACT_APP_API_URL;

export const addFriend = async friendId => {
    const token = localStorage.getItem('token');

    try{
        const response = await fetch(`${API_URL}contact/add-friend`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ shortId: friendId})
        });

        const data = await response.json();

        if(response.ok){
            alert('Friend added successfully!');
        }
        else{
            alert(`Error: ${data.msg}`);
        }
    }
    catch(err){
        console.error("Add friend error:", err);
        alert("Something went wrong. Please try again.");
    }
    
}