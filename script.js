async function buscarPersona() {
    const query = document.getElementById('search').value;
    const response = await fetch(`https://api-de-washington-dc-rp-spanish.onrender.com/search?id=${query}&nombre=${query}`);
    const personas = await response.json();

    const lista = document.getElementById('resultados');
    lista.innerHTML = '';

    personas.forEach(persona => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${persona.id}</td>
        <td>${persona.nombre}</td>
        <td>${persona.apellido}</td>
        <td>${persona.nacionalidad}</td>
        <td>${persona.fecha_nacimiento}</td>
        <td>${persona.estatura} cm</td>
        <td>${persona.genero}</td>
        <td>${persona.edad}</td>
        <td>${persona.grupo_sanguineo}</td>
        <td>${persona.user_discord}</td>
        <td>${persona.user_roblox}</td>
      `;
      lista.appendChild(tr);
    });
  }