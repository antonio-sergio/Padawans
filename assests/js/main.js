
//Função para estabelecer conecção com a api
async function getContent(page){
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/${page}`)
        return response.json()
        
    } catch (error) {
        console.log(error)
    }
    
}


//Capturar posts usando .map
const getPost = async () => {
    const posts = await getContent("posts");
    const postTemplate = posts.map(({ title, body }) => `
        <div class="post">
            <div class="postItem">
                <h3 class="post-title">${title}</h3>
                <p class="post-body">${body}</p>
            </div>
        </div>

    `).join(" ");
    
    const postsItems = document.querySelector(".allPosts");

    postsItems.innerHTML = postTemplate;
}

const getPost2 = async () => {
    const posts = await getContent("posts");
    const postTemplate = posts.map(({id, title, body }) => `
    
    <tr>
        <td>${id}</td>
        <td>${title}</td>
        <td>${body}</td>
    </tr>
  

    `).join(" ");
    
    const postsItems = document.querySelector("#table");

    postsItems.innerHTML += postTemplate;
}


getPost2();

//Capturar fotos da api utilizando .map
const getPhotos = async (id) => {
    const photos = await getContent(`albums/${id}/photos`);
    const photosTemplate = photos.map(({title, url, thumbnailUrl}) => 
    
    `
        <div >
            
            <a href="${url}" data-lightbox="mygallery" data-title="${title}" ><img src="${thumbnailUrl}"></a>
        </div>
    `).join(" ");

    let aux = document.createElement("div");
    aux.id = `album${id}`;
    aux.classList.add("photos")
    aux.innerHTML = photosTemplate;
    
    const listPhotos = document.querySelector(".listPhotos")
    listPhotos.appendChild(aux)
}

//Capturar albums da api
const getAlbum = async () => {
    const albums = await getContent("albums");
    const albumsTemplate = albums.map(({id, title}) => `

        <tr>
            <td>${id}</td>
            <td>${title}</td>
            <td><a  onclick="showAlbum(${id})" id="${id}" href="#album${id}">Click 2x</a> </td>
        </tr>
    `).join(" ");

    
    const listAlbuns = document.querySelector("#table-albums")
    listAlbuns.innerHTML += albumsTemplate;
    
}

getAlbum()

const getTodos = async () => {
    const todos = await getContent("todos");
    const todosTemplate = todos.map(({id, title, completed}) => `

        <tr>
            <td>${id}</td>
            <td>${title}</td>
            <td>${completed}</td>
        </tr>
    `).join(" ");

    
    const listTodos = document.querySelector("#table-todos")
    listTodos.innerHTML += todosTemplate;
    
}

getTodos()

//limpar tela e mostrar galeria
const showAlbum = (id) => {
    let listPhotos = document.querySelector(".listPhotos");
    let albums = document.querySelector(".albums");
    let menuh3 = document.querySelector("#menu-h3");
    let listAlbuns = document.querySelector("#table-albums");
    albums.innerHTML = "";
    listPhotos.innerHTML = "";
    menuh3.innerHTML = "";
    listAlbuns.innerHTML = "";
    let header = document.createElement("div");
    header.classList.add("header")
    let text = `<a  href="albums.html">Voltar ao menu Albums</a> `;
    header.innerHTML = text;
    let body = document.querySelector("body")
    body.appendChild(header)
    getPhotos(id)
}

//limpar tela e aplicar outro modo de visualização
const altView = () => {
    let table = document.querySelector("#table");
    table.innerHTML = "";
    getPost()
}
