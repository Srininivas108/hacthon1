const pokemons_number=50;

const pagination =document.querySelector("pagination");
const noPages=Math.ceil(pokemons_number/10);
for( let i=1;i<=noPages;i++){
     const page=document.createElement("button");
     page.innerText= i;
     document.querySelector(".pagination").append(page);
     page.onclick=()=>
     {
         document.querySelector(".poke-container").innerHTML="";
         fetchPokemons(page.innerText)
     }
}

async function fetchPokemons(x){
    for(let i=((parseInt(x)-1)*10+1);i<=(parseInt(x)*10);i++){
        await getPokemon(i);
    }
}
 async function getPokemon(id){
     try{

     const data=await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {method:"GET"})
     const pokemon=await data.json();
          const poke ={
              name: pokemon.name,
              id:pokemon.id,
              weight: pokemon.weight,
          }
          let abi=pokemon.abilities;
          const abilityArray =abi.map(e=>e.ability);
          let abilityList=abilityArray.map(e=>e.name).join(", ");

          let mov=pokemon.moves;
          const moveArray =mov.map(e=>e.move);
          let   moveList=moveArray.map(e=>e.name).join(",  ");
          createPokemon(poke,moveList,abilityList)
     }

     catch(err){
         console.log("error has occured",err);
     }
 }
 function createPokemon({name,weight,id},moveList,abilityList){
     const pokemonEl= document.createElement("div");
         pokemonEl.setAttribute("class","pokemon");
         pokemonEl.innerHTML =`
             <h1>Pokemon Name: ${name} </h1>
             <p><strong> Id:</strong> ${id} </p>
             <p><strong> Weight: </strong> ${weight} </p>
             <p><strong> AbilityNames:</strong> ${abilityList} <p>
             <p><Strong> MoveNames: </strong> ${moveList} <p>
         `;
         document.querySelector(".poke-container").append(pokemonEl);

 }