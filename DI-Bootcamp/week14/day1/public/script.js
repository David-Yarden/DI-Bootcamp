async function getData(url){
    try{
        const res = await fetch (url);
        const data = await res.json();
        console.log(data);
        render(data);
    }catch(error){
        console.log('error', error);
    }
}

getData('http://localhost:5001/api/products');

const render = (arr) =>{
    const html = arr.map(item =>{
        return `<div>${item.name} - ${item.price}</div>`;
    })
    document.getElementById('root').innerHTML = html.join('');
};
getData("http://localhost:5001/api/products");