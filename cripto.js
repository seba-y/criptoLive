const ctypto = document.getElementById('crypto');
const bodyt = document.querySelector('.bodyt');
const money = document.getElementById('money');
const datee = document.querySelector('.datee')


function fecha(){
  let hoy = new Date();
  // const datehoy =  hoy.getFullYear();
  datee.textContent += `${hoy.getDate()}/${hoy.getMonth()+1}/${hoy.getFullYear()} | ${hoy.getHours()}:${hoy.getMinutes()}:${hoy.getSeconds()}`; 
}
fecha();

function myCryptos(done){
  const options = {method: 'GET', headers: {accept: 'application/json'}};
  const result = fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=20&locale=es', options);
  result
    .then(res => res.json())
    .then(data => {done(data)})
    .catch(err => console.log(err));
}


function find(str) {
  for (let i = 0; i < str.length; i++) {
    if (str[i] != '0' && str[i] != '.' && str[i] != '-' && str.includes('e') == false) {
      return ((str.substring(0, i + 2))).replace('.',',');
    }
  }
  return str.replace('.',','); // si no encuentra un número diferente de 0, devuelve la cadena completa
}

myCryptos(data =>{
  console.log(data);
  data.forEach((coin) => {
    const pr = coin.current_price.toLocaleString();
    const prC24 = coin.price_change_24h.toLocaleString();
    const mCap24 = (coin.market_cap_change_percentage_24h.toLocaleString()+'');

    bodyt.insertAdjacentHTML("beforeend",`
      <tr class='coin'>
          <td class="firstch">
                    <p>${coin.market_cap_rank}</p>
                    <img src='${coin.image}'> 
                    <p>${coin.symbol.toUpperCase()}</p>
                    <p class="name">${coin.name}</p>
          </td>
          <td> <p>$${pr == '0' ? find(''+coin.current_price) : pr}</p> </td> 
          <td> <p>$${prC24 == '-0' ? find(coin.price_change_24h+'')
                                   : prC24 == '0' ?  find(coin.price_change_24h+'')
                                   : prC24} 
                </p>
          </td>
          <td> <p ${mCap24.startsWith('-') ?`class='percent-n'` : `class='percentage'`}>
                   ${mCap24.startsWith('-') == true ? ('▼'+mCap24) : ('▲+'+mCap24)}%
                </p>
          </td>
      </tr>`
    )
  });
})
