const divFlags =  document.getElementById("flags");
const divInformations = document.getElementById("informations");

async function getFlags() {
  const response = await fetch("https://mauriciodiias.github.io/estadosDoBrasil/data.json");
  const data = await response.json();
  return data.estados;
}

async function showFlags() {
  const estados = await getFlags();
  estados.map(state => {
    const div = document.createElement('div');

    const img = document.createElement('img');
    img.src = `${state.bandeira_url}`;
    img.className = 'flag';
    img.setAttribute('onclick', `showDescription("${state.nome}")`);

    const figcaption = document.createElement('figcaption');
    figcaption.textContent = `${state.nome}`;
    
    div.appendChild(img);
    div.appendChild(figcaption);
    divFlags.appendChild(div);
  });
}

async function showDescription(name) {
  divInformations.innerHTML = "";
  const estados = await getFlags();
  estados.map(state => {
    if(state.nome == name){
      const div = document.createElement('div');
      div.className = 'div-info';
      divInformations.appendChild(div);
      
      let h1 = document.createElement('h1');
      h1.textContent = state.nome;
      h1.className = 'name-info';
      div.appendChild(h1);
      
      let description = document.createElement("p");
      description.textContent = state.descricao;
      description.className = 'description-info'
      div.appendChild(description);
      
      let climate = document.createElement("p");
      climate.className = 'description-info'
      climate.innerHTML = `${state.clima}`;
      div.appendChild(climate);
    
      let divData = document.createElement('div');
      divData.className = 'data-info';
      div.appendChild(divData);

      let population = document.createElement("div");
      population.innerHTML = `<img class='img-icon population' src='https://www.pikpng.com/pngl/b/53-532523_white-person-icon-png-clipart.png' /><br/>${state.habitantes} <br/> HABITANTES`;
      population.className = 'data';
      divData.appendChild(population);
    
      let area = document.createElement("p");
      area.innerHTML = `<img class='img-icon area' src='https://static.thenounproject.com/png/1043924-200.png' /><br/>${state.area_km2} km²<br/>ÁREA`;
      area.className = 'data';            
      divData.appendChild(area);
    }
  });
}

window.onload = showFlags();
