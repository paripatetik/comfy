export async function fetchData(url){
    let response = await fetch(url);
    let data = await response.json();
    return data; 
}