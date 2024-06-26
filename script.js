const divBandeiras =  document.getElementById("bandeiras");
const divInformacao = document.getElementById("informacoes");

async function getBandeiras() {
  const response = await fetch("https://mauriciodiias.github.io/estadosDoBrasil/data.json");
  const data = await response.json();
  return data.estados;
}

async function showBandeiras() {
  const estados = await getBandeiras();
  estados.map(estado => {
    const div = document.createElement('div');

    const img = document.createElement('img');
    img.src = `${estado.bandeira_url}`;
    img.className = 'bandeira';
    img.setAttribute('onclick', `showDescricao("${estado.nome}")`);

    const figcaption = document.createElement('figcaption');
    figcaption.textContent = `${estado.nome}`;
    
    div.appendChild(img);
    div.appendChild(figcaption);
    divBandeiras.appendChild(div);
  });
}

async function showDescricao(nome) {
  divInformacao.innerHTML = ""
  const estados = await getBandeiras();
  estados.map(estado => {
    console.log(nome)
    if(estado.nome == nome){
      const ul = document.createElement('ul');
      let li = document.createElement("li");
      
      let h3 = document.createElement("p");
      h3.textContent = estado.descricao;
    
      let clima = document.createElement("p");
      clima.innerHTML = `Clima: ${estado.clima}`;
    
      let habitantes = document.createElement("p");
      habitantes.innerHTML = `Habitantes: ${estado.habitantes}`;
    
      let area= document.createElement("p");
      area.innerHTML = `Área: ${estado.area_km2} km²`;
      
      let mapa = document.createElement("img");
      mapa.setAttribute("src", estado.mapa_url);
      mapa.setAttribute("width", "100px");
  
      li.appendChild(h3);
      li.appendChild(clima);
      li.appendChild(habitantes);
      li.appendChild(area);
      li.appendChild(mapa);
      ul.appendChild(li);
      divInformacao.appendChild(ul);
    }
  });
}

showBandeiras();

